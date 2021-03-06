import EventEmitter from './EventEmitter';
import { getRandomItem } from './Utility';
import Tile from './Tile';
import TileGenerationBehavior from './TileGenerationBehavior';
import TileState from './TileState';
import TileType from './TileType';

export default class extends EventEmitter {

    constructor(tileGridWidth, tileGridHeight, tileSize, offsetX, offsetY, onTileSelect, onTileMatch, tileGenerationBehavior, queue)
    {
        super();

        this.isInitialized = false;
        this.isBlocked = true;

        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.tileSize = tileSize;
        this.tileGridHeight = tileGridHeight;
        this.tileGridWidth = tileGridWidth;
        this.tileGrid = [];
        this.tileImageContainer = null;
        this.playAreaOffset = (this.tileGridHeight * this.tileSize);

        this.gridBackground = null;

        this.onTileSelect = onTileSelect;
        this.onTileMatch = onTileMatch;

        this.tileGenerationBehavior = tileGenerationBehavior;

        this.matchSound = null;
        this.swapSound = null;

        this.queue = queue;

        this.matches = 0;

        this.preSetTileGrid = [
            [ 0, 0, 2, 3, 0, 0 ],
            [ 3, 2, 2, 3, 3, 2 ],
            [ 3, 2, 1, 0, 3, 2 ],
            [ 1, 1, 0, 1, 0, 0 ],
            [ 3, 2, 1, 0, 3, 2 ],
            [ 3, 2, 2, 3, 3, 2 ]
        ]

        // We're going to generate a grid that's twice the height of
        // the desired tile grid height since we'll use the hidden, upper
        // region to stage the bricks that will fall into the play area
        for(let y = 0; y < tileGridHeight * 2; y++)
        {
            this.tileGrid[y] = [];
            for(let x = 0; x < tileGridWidth; x++)
            {
                this.tileGrid[y][x] = null;
            }
        }
    }

    create(context)
    {
        this.tileImageContainer = context.add.container();
        this.tileImageContainer.setDepth(1);

        // Create a mask to only show the play area
        const maskShape = context.make.graphics();
        maskShape.fillStyle(0xffffff, 1);
        maskShape.fillRect(this.offsetX - (this.tileSize/2), this.offsetY + (this.tileGridHeight * this.tileSize) - (this.tileSize/2), this.tileGridWidth * this.tileSize, this.tileGridHeight * this.tileSize);
    
        this.tileImageContainer.mask = new Phaser.Display.Masks.GeometryMask(context, maskShape);

        // Tile grid background
        this.gridBackground = context.add.graphics({ fillStyle: { color: 0x012400 } }).setAlpha(0.4);
        this.gridBackground.fillRoundedRect(this.offsetX - (this.tileSize/2) - 5, this.offsetY + (this.tileGridHeight * this.tileSize) - (this.tileSize/2) - 5, this.tileGridWidth * this.tileSize + 10, this.tileGridHeight * this.tileSize + 10, 6);
        this.gridBackground.setAlpha(0);
        this.gridBackground.setDepth(0);

        this.matchSounds = [
            context.sound.add('match'),
            context.sound.add('match_combo_01'),
            context.sound.add('match_combo_02'),
            context.sound.add('match_combo_03'),
            context.sound.add('match_combo_04'),
            context.sound.add('match_combo_05'),
        ];
        this.matchSound = this.matchSounds[0];

        this.swapSound = context.sound.add('swap');
    }

    update(context)
    {
        const self = this;

        if(!self.isInitialized)
        {
            return;
        }

        // Detect and destroy any matches
        const matchedTiles = self.getMatches();

        if(matchedTiles.length > 0)
        {
            self.matches++;
            self.onTileMatch(context, matchedTiles);
            matchedTiles.forEach(t => { t.hasMatched = true });
            self.emit('match');
        }

        let destroys = [];
        matchedTiles.forEach(t => { destroys.push(t.destroy(context, this.tileImageContainer)); });

        if(destroys.length > 0)
        {
            self.matchSound.play();
            self.queue.push(() => { return Promise.all(destroys); });
        }

        // Remove any destroyed tiles
        self.forEachTile((tile, x, y) => {

            if(tile === null)
            {
                return;
            }

            if(tile.state === TileState.Destroyed)
            {
                self.tileGrid[y][x] = null;
            }

        });

        // If we destroyed tiles, return early to allow the destroyed tiles and their associated
        // animations clear before figuring out the drop animations
        if(destroys.length > 0)
        {
            return;
        }

        // Shift all of the tiles downward to fill empty spots
        let drops = [];
        for(let x = 0; x < this.tileGridWidth; x++)
        {
            let y = (this.tileGridHeight * 2) - 1;
            while(y >= 0)
            {
                // If the tile is null...
                if(self.tileGrid[y][x] === null)
                {
                    // ...find the closest tile that's not null...
                    let closestY = y - 1;
                    while(closestY >= 0)
                    {
                        let closestTile = self.tileGrid[closestY][x];
                        if(closestTile !== null)
                        {
                            // ...and shift it downward
                            self.tileGrid[y][x] = closestTile;
                            self.tileGrid[closestY][x] = null;
                            drops.push(this.getTileDrop(context, closestTile, x, y));
                            y--;
                        }
                        closestY--;
                    }
                }

                y--;
            }
        }

        // Fill in all of the empty tiles
        self.forEachPlayableTile((tile, x, y) => {
            if(tile === null)
            {
                const adjustedY = y - self.tileGridHeight;

                const tile = self.createTile(self.getTileType(x, y, self.tileGenerationBehavior), x, adjustedY, false);
                self.tileGrid[adjustedY][x] = tile;
                tile.create(context);
                self.tileImageContainer.add(tile.image);
            }
        });

        if(drops.length > 0)
        {
            self.queue.push(() => { return Promise.all(drops); });
        }
    }

    swapTiles(context, firstTile, secondTile)
    {
        let self = this;
        self.swapSound.play();

        self.queue.push(() => {

            let firstTileX = firstTile.x;
            let firstTileY = firstTile.y;
            let firstTileGridX = firstTile.tileGridX;
            let firstTileGridY = firstTile.tileGridY;
    
            let secondTileX = secondTile.x;
            let secondTileY = secondTile.y;
            let secondTileGridX = secondTile.tileGridX;
            let secondTileGridY = secondTile.tileGridY;
    
            let firstSwap = secondTile.updatePosition(context, firstTileX, firstTileY, firstTileGridX, firstTileGridY);
            self.tileGrid[firstTileGridY][firstTileGridX] = secondTile;
    
            let secondSwap = firstTile.updatePosition(context, secondTileX, secondTileY, secondTileGridX, secondTileGridY);
            self.tileGrid[secondTileGridY][secondTileGridX] = firstTile;

            return Promise.all([firstSwap, secondSwap]);

        });
    }

    hasMatches(targetGridX, targetGridY)
    {
        return this.getMatches(targetGridX, targetGridY).length > 0;
    }

    getMatches(targetGridX, targetGridY)
    {
        const self = this;
        const matchedTiles = [];

        self.forEachTile((tile, x, y) => {

            if(
                (typeof targetGridX !== 'undefined' && x !== targetGridX) &&
                (typeof targetGridY !== 'undefined' && y !== targetGridY)
              )
            {
                return;
            }

            if(!this.isPlayable(tile))
            {
                return;
            }

            if(tile.hasMatched)
            {
                return;
            }

            const targetTileType = tile.tileType;
            const matchedXTiles = [];
            const matchedYTiles = [];

            // Check for matches to the right
            let currX = (x + 1);
            while(currX < self.tileGridWidth)
            {
                const currTile = self.tileGrid[y][currX];

                if(currTile != null && targetTileType.name === currTile.tileType.name)
                {
                    matchedXTiles.push(currTile);
                }
                else
                {
                    break;
                }

                currX++;
            }

            // Check for matches to the left
            currX = (x - 1);
            while(currX > 0)
            {
                const currTile = self.tileGrid[y][currX];

                if(currTile != null && targetTileType.name === currTile.tileType.name)
                {
                    matchedXTiles.push(currTile);
                }
                else
                {
                    break;
                }

                currX--;
            }

            // Check matches downwards
            let currY = (y + 1);
            while(currY < self.tileGridHeight)
            {
                const currTile = self.tileGrid[currY][x];

                if(currTile != null && targetTileType.name === currTile.tileType.name)
                {
                    matchedYTiles.push(currTile);
                }
                else
                {
                    break;
                }

                currY++;
            }

            // Check matches upwards
            currY = (y - 1);
            while(currY > 0)
            {
                const currTile = self.tileGrid[currY][x];

                if(currTile != null && targetTileType.name === currTile.tileType.name)
                {
                    matchedYTiles.push(currTile);
                }
                else
                {
                    break;
                }

                currY--;
            }
            
            if(matchedYTiles.length > 1)
            {
                matchedTiles.push(...matchedYTiles);
            }
            
            if(matchedXTiles.length > 1)
            {
                matchedTiles.push(...matchedXTiles);
            }

            if(matchedYTiles.length > 1 || matchedXTiles.length > 1)
            {
                matchedTiles.push(tile);
            }
        });

        const uniqueMatchedTiles = [];
        matchedTiles.forEach(tile => {
            if(!uniqueMatchedTiles.some(t => t.x === tile.x && t.y === tile.y))
            {
                uniqueMatchedTiles.push(tile);
            }
        });
        
        return uniqueMatchedTiles;
    }

    forEachTile(callback)
    {
        for(let y = 0; y < this.tileGridHeight * 2; y++)
        {
            for(let x = 0; x < this.tileGridWidth; x++)
            {
                callback(this.tileGrid[y][x], x, y);
            }
        }
    }

    forEachPlayableTile(callback)
    {
        for(let y = this.tileGridHeight; y < this.tileGridHeight * 2; y++)
        {
            for(let x = 0; x < this.tileGridWidth; x++)
            {
                callback(this.tileGrid[y][x], x, y);
            }
        }
    }

    createTile(tileType, x, y, isBlocked, initialDrag)
    {
        return new Tile(tileType, this.getTileX(x), this.getTileY(y), x, y, initialDrag, isBlocked, this.onTileSelect);
    }

    getTileDrop(context, tile, x, y)
    {
        return tile.updatePosition(context, this.getTileX(x), this.getTileY(y), x, y, true);
    }

    getTileX(x)
    {
        return this.offsetX + (this.tileSize * x);
    }

    getTileY(y)
    {
        return this.offsetY + (this.tileSize * y);
    }

    canSelect(tile)
    {
        return this.isPlayable(tile);
    }

    isPlayable(tile)
    {
        return (tile != null) && !tile.isBlocked && (tile.tileGridY > (this.tileGridHeight - 1));
    }

    getTileType(x, y, behavior)
    {
        const aboveTile = (y < 1) ? null : this.tileGrid[y - 1][x];
        const belowTile = (y >= this.tileGridHeight - 1 || !this.tileGrid[y + 1]) ? null : this.tileGrid[y + 1][x];

        const leftTile = (x < 1) ? null : this.tileGrid[y][x - 1];
        const rightTile = (x >= this.tileGridWidth - 1 || !this.tileGrid[y]) ? null : this.tileGrid[y][x + 1];

        if(behavior === TileGenerationBehavior.EasyWin && (aboveTile != null || belowTile != null || leftTile != null || rightTile != null))
        {
            return getRandomItem([aboveTile, belowTile, leftTile, rightTile].filter(t => t != null).map(t => t.tileType));
        }
        
        if(behavior === TileGenerationBehavior.Hard)
        {
            return getRandomItem(TileType.filter(t =>
                (belowTile === null || t.name !== belowTile.tileType.name) &&
                (rightTile === null || t.name !== rightTile.tileType.name) &&
                (leftTile === null || t.name !== leftTile.tileType.name)
            ));
        }

        return getRandomItem(TileType.filter(t =>
            (aboveTile === null || t.name !== aboveTile.tileType.name) &&
            (leftTile === null || t.name !== leftTile.tileType.name)
        ));
    }

    block(context, exceptions)
    {
        this.isBlocked = true;
        this.forEachTile((tile, x, y) => tile
                && (typeof exceptions === 'undefined' || !exceptions.some(exception => exception[1] === x && exception[0] === y))
                && tile.block(context)
        );

    }

    unblock(context)
    {
        this.isBlocked = false;
        this.forEachTile(tile => tile && tile.unblock(context));
    }

    fill(context)
    {
        for(let y = 0; y < this.tileGridHeight; y++)
        {
            for(let x = 0; x < this.tileGridWidth; x++)
            {
                const tileType = this.tileGenerationBehavior === TileGenerationBehavior.PreSet
                    ? this.getPreSetTileType(x, y)
                    : this.getTileType(x, y, TileGenerationBehavior.None);

                const tile = this.createTile(tileType, x, y, true, ((this.tileGridWidth - x) / this.tileGridWidth));
                tile.create(context);
                
                this.tileGrid[y][x] = tile;
            }
        }

        this.isBlocked = true;
        this.isInitialized = true;

        context.tweens.add({
            targets: this.gridBackground,
            alpha: 0.5,
            duration: 200
        });
    }

    updateTileGenerationBehavior(behavior)
    {
        this.tileGenerationBehavior = behavior;
    }

    getPreSetTileType(x, y)
    {
        return TileType[this.preSetTileGrid[y][x]];
    }

    updateMatchSound(intensity)
    {
        const index = (intensity >= this.matchSounds.length) ? (this.matchSounds.length - 1) : intensity;
        this.matchSound = this.matchSounds[index];
    }
}