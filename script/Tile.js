import TileState from './TileState';

export default class {

    constructor(tileType, x, y, tileGridX, tileGridY, isBlocked, onTileSelect)
    {
        this.tileType = tileType;
        this.x = x;
        this.y = y;
        this.tileGridX = tileGridX;
        this.tileGridY = tileGridY;
        this.onTileSelect = onTileSelect;
        this.image = null;
        this.state = TileState.Active;

        this.isActivated = false;
        this.isDestroying = false;
        this.isBlocked = isBlocked;
    }

    create(context)
    {
        this.image = context.add.image(this.x, this.y, this.tileType.imageKey);
        this.image.setInteractive();
        this.image.on('pointerdown', () => { this.onTileSelect(context, this); });

        if(this.isBlocked)
        {
            this.image.setAlpha(0.5);
        }
    }

    activate()
    {
        this.isActivated = true;
        this.image.setTintFill(0xffffff);
    }

    deactivate()
    {
        this.isActivated = false;
        this.image.clearTint();
    }

    updatePosition(context, x, y, tileGridX, tileGridY, isDrop)
    {
        const self = this;
        const yDiff = Math.abs(self.y - y);

        return new Promise((resolve, reject) => {

            self.x = x;
            self.y = y;
            self.tileGridX = tileGridX;
            self.tileGridY = tileGridY;

            context.tweens.add({
                targets: self.image,
                x: x,
                y: y,
                ease: isDrop ? 'Linear': 'Power1',
                duration: isDrop ? Math.max(yDiff, 150) : 500,
                onComplete: () => { resolve() }
            });

        });
    }

    destroy(context, container)
    {
        let self = this;
        
        if(self.isDestroying)
        {
            return;
        }

        self.isDestroying = true;

        // Create cover for fading the shape to white
        const fadeOutCover = context.add.image(self.x, self.y, self.tileType.imageKey);
        fadeOutCover.setTintFill(0xffffff);
        fadeOutCover.alpha = 0;

        // Create particles for "explosion" effect
        const particleGraphics = [];
        for(let i=0; i<8; i++)
        {
            const explodeParticleGraphics = context.add.graphics({ fillStyle: { color: 0xffffff }, alpha: 0 });
            const explodeParticle = new Phaser.Geom.Circle(this.x, this.y, Phaser.Math.Between(0, 10));
            explodeParticleGraphics.fillCircleShape(explodeParticle);
            particleGraphics.push(explodeParticleGraphics);
        }

        return new Promise((resolve, reject) => {

            // Remove the tile image
            container.remove(self.image);
            self.image.destroy();

            fadeOutCover.setAlpha(1);
           context.tweens.add({
               targets: fadeOutCover,
               alpha: 0,
               duration: 250,
               ease: 'Cubic.easeOut',
               onComplete: () => {

                    // Remove the tile image
                    self.state = TileState.Destroyed;

                    // Remove the fade out cover
                    container.remove(fadeOutCover);
                    fadeOutCover.destroy();

                    // Remove the particles
                    particleGraphics.forEach((graphics) => {
                        container.remove(graphics);
                        graphics.destroy();
                    });

                    resolve();
               }
           });

           particleGraphics.forEach((graphics, index) => {

                graphics.setAlpha(1);
                let xSign = null;
                let ySign = null;
               
                switch(index)
                {
                    case 0:
                        ySign = '-';

                    case 1:
                        xSign = '+';
                        ySign = '-';
                        break;

                    case 2:
                        xSign = '+';
                        break;

                    case 3:
                        xSign = '+';
                        ySign = '+';
                        break;

                    case 4:
                        ySign = '+';
                        break;

                    case 5:
                        ySign = '+';
                        xSign = '-'

                    case 6:
                        xSign = '-';
                        break;

                    case 7:
                        ySign = '-';
                        xSign = '-';
                        break;
                }

                const tween = {
                    targets: graphics,
                    alpha: 0,
                    duration: 250,
                    ease: 'Cubic.easeOut'
                };

                if(xSign != null)
                {
                    tween.x = (xSign + '=45');
                }

                if(ySign != null)
                {
                    tween.y = (ySign + '=45');
                }

                context.tweens.add(tween);
           });

        });
    }

    block(context)
    {
        this.isBlocked = true;

        context.tweens.add({
            targets: this.image,
            alpha: 0.5,
            duration: 100
        });
    }

    unblock(context)
    {
        this.isBlocked = false;

        context.tweens.add({
            targets: this.image,
            alpha: 1,
            duration: 100
        });
    }
}