!function(e){var t={};function i(s){if(t[s])return t[s].exports;var l=t[s]={i:s,l:!1,exports:{}};return e[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)i.d(s,l,function(t){return e[t]}.bind(null,l));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var s=class extends Phaser.Scene{constructor(){super("TitleScene")}create(){const e=this;this.add.text(50,50,"Match Three!");const t=this.add.text(50,70,"Start Game");t.setInteractive(),t.on("pointerdown",()=>{e.scene.start("RoundScene",{level:0})})}};const l=e=>e[Math.floor(Math.random()*e.length)];var r=0,n=1,a=0,o=1,h=[{name:"Blue",imageKey:"tile_01"},{name:"Green",imageKey:"tile_02"},{name:"Red",imageKey:"tile_03"},{name:"Yellow",imageKey:"tile_04"}],c=class extends Phaser.Scene{constructor(){super("RoundScene"),this.score=null,this.queue=null,this.selectedTiles=null,this.tileGrid=null,this.scoreDisplay=null,this.timer=null,this.comboCount=null,this.guide=null,this.level=null}preload(){this.load.image("tile_01","assets/tile_01.png"),this.load.image("tile_02","assets/tile_02.png"),this.load.image("tile_03","assets/tile_03.png"),this.load.image("tile_04","assets/tile_04.png")}init(e){this.level=e.level}create(){this.score=0,this.comboCount=0,this.queue=new class{constructor(){this.queuedActions=[],this.currentAction=null}isActionRunning(){return null!=this.currentAction}hasActions(){return this.queuedActions.length>0}next(){this.currentAction=this.queuedActions.shift(),this.currentAction()}push(e){var t=this;t.queuedActions.push(()=>{e().then(()=>{t.currentAction=null})})}},this.selectedTiles=[],this.tileGrid=new class{constructor(e,t,i,s,l,r,n,o){this.offsetX=s,this.offsetY=l,this.tileSize=i,this.tileGridHeight=t,this.tileGridWidth=e,this.tileGrid=[],this.tileImageContainer=null,this.playAreaOffset=this.tileGridHeight*this.tileSize,this.onTileSelect=r,this.onTileMatch=n,this.tileGenerationBehavior=a,this.queue=o;for(let i=0;i<2*t;i++){this.tileGrid[i]=[];for(let s=0;s<e;s++)this.tileGrid[i][s]=i<t?null:this.createTile(this.getTileType(s,i,this.tileGenerationBehavior),s,i)}}create(e){this.tileImageContainer=e.add.container(),this.forEachTile(t=>{null!==t&&(t.create(e),this.tileImageContainer.add(t.image))});const t=e.make.graphics();t.fillStyle(16777215,1),t.fillRect(this.offsetX/2,this.offsetY/2+this.tileGridHeight*this.tileSize,this.tileGridWidth*this.tileSize,this.tileGridHeight*this.tileSize),this.tileImageContainer.mask=new Phaser.Display.Masks.GeometryMask(e,t)}update(e){const t=this;if(t.queue.length>0)return;const i=t.getMatches();i.length>0&&t.onTileMatch(e,i);let s=[];i.forEach(t=>{s.push(t.destroy(e,this.tileImageContainer))}),s.length>0&&t.queue.push(()=>Promise.all(s)),t.forEachTile((e,i,s)=>{null!==e&&e.state===n&&(t.tileGrid[s][i]=null)});let l=[];for(let i=0;i<this.tileGridWidth;i++){let s=2*this.tileGridHeight-1;for(;s>=0;){if(null===t.tileGrid[s][i]){let r=s-1;for(;r>=0;){let n=t.tileGrid[r][i];null!==n&&(t.tileGrid[s][i]=n,t.tileGrid[r][i]=null,l.push(this.getTileDrop(e,n,i,s)),s--),r--}}s--}}t.forEachPlayableTile((i,s,l)=>{if(null===i){const i=l-t.tileGridHeight,r=t.createTile(t.getTileType(s,l,t.tileGenerationBehavior),s,i);t.tileGrid[i][s]=r,r.create(e),t.tileImageContainer.add(r.image)}}),l.length>0&&t.queue.push(()=>Promise.all(l))}swapTiles(e,t,i){let s=this;s.queue.push(()=>{let l=t.x,r=t.y,n=t.tileGridX,a=t.tileGridY,o=i.x,h=i.y,c=i.tileGridX,u=i.tileGridY,d=i.updatePosition(e,l,r,n,a);s.tileGrid[a][n]=i;let g=t.updatePosition(e,o,h,c,u);return s.tileGrid[u][c]=t,Promise.all([d,g])})}hasMatches(e,t){return this.getMatches(e,t).length>0}getMatches(e,t){const i=this,s=[];return i.forEachTile((l,r,n)=>{if(void 0!==e&&r!==e&&void 0!==t&&n!==t)return;if(!this.isPlayable(l))return;const a=l.tileType,o=[],h=[];let c=r+1;for(;c<i.tileGridWidth;){const e=i.tileGrid[n][c];if(null==e||a.name!==e.tileType.name)break;o.push(e),c++}for(c=r-1;c>0;){const e=i.tileGrid[n][c];if(null==e||a.name!==e.tileType.name)break;o.push(e),c--}let u=n+1;for(;u<i.tileGridHeight;){const e=i.tileGrid[u][r];if(null==e||a.name!==e.tileType.name)break;h.push(e),u++}for(u=n-1;u>0;){const e=i.tileGrid[u][r];if(null==e||a!==e.tileType)break;h.push(e),u--}h.length>1&&s.push(...h),o.length>1&&s.push(...o),(h.length>1||o.length>1)&&s.push(l)}),s}forEachTile(e){for(let t=0;t<2*this.tileGridHeight;t++)for(let i=0;i<this.tileGridWidth;i++)e(this.tileGrid[t][i],i,t)}forEachPlayableTile(e){for(let t=this.tileGridHeight;t<2*this.tileGridHeight;t++)for(let i=0;i<this.tileGridWidth;i++)e(this.tileGrid[t][i],i,t)}createTile(e,t,i){return new class{constructor(e,t,i,s,l,n){this.tileType=e,this.x=t,this.y=i,this.tileGridX=s,this.tileGridY=l,this.onTileSelect=n,this.image=null,this.state=r,this.isActivated=!1}create(e){this.image=e.add.image(this.x,this.y,this.tileType.imageKey),this.image.setInteractive(),this.image.on("pointerdown",()=>{this.onTileSelect(e,this)})}activate(){this.isActivated=!0,this.image.setTintFill(16777215)}deactivate(){this.isActivated=!1,this.image.clearTint()}updatePosition(e,t,i,s,l){let r=this;return new Promise((n,a)=>{r.x=t,r.y=i,r.tileGridX=s,r.tileGridY=l,e.tweens.add({targets:r.image,x:t,y:i,ease:"Power1",duration:500,onComplete:()=>{n()}})})}destroy(e,t){let i=this;return new Promise((s,l)=>{e.tweens.add({targets:i.image,alpha:0,ease:"Power1",duration:500,onComplete:()=>{t.remove(i.image),i.image.destroy(),i.state=n,s()}})})}}(e,this.getTileX(t),this.getTileY(i),t,i,this.onTileSelect)}getTileDrop(e,t,i,s){return t.updatePosition(e,this.getTileX(i),this.getTileY(s),i,s)}getTileX(e){return this.offsetX+this.tileSize*e}getTileY(e){return this.offsetY+this.tileSize*e}canSelect(e){return this.isPlayable(e)}isPlayable(e){return null!=e&&e.tileGridY>this.tileGridHeight-1}getTileType(e,t,i){const s=t<1?null:this.tileGrid[t-1][e],r=t>self.tileGridHeight-1||!this.tileGrid[t+1]?null:this.tileGrid[t+1][e],n=e<1?null:this.tileGrid[t][e-1],a=e>self.tileGridWidth-1?null:this.tileGrid[t][e+1];return l(i!=o||null==s&&null==r&&null==n&&null==a?h.filter(e=>!(null!==s&&e.name===s.tileType.name||null!==n&&e.name===n.tileType.name)):[s,r,n,a].filter(e=>null!=e).map(e=>e.tileType))}}(6,6,50,50,50,this.onTileSelect,this.onTileMatch,this.queue),this.scoreDisplay=new class{constructor(e,t){this.x=e,this.y=t,this.scoreText=null,this.comboText=null,this.score=0}create(e){this.scoreText=e.add.text(this.x,this.y,this.score),this.comboText=e.add.text(this.x,this.y+20,"")}updateScore(e){this.score=e,this.scoreText.setText(e)}updateCombo(e){this.comboText.setText(e)}}(5,5),this.timer=new class{constructor(e,t,i){this.x=e,this.y=t,this.text=null,this.seconds=i}create(e){this.text=e.add.text(this.x,this.y,this.score),this.tick(),e.time.addEvent({delay:1e3,callback:this.tick,callbackScope:this,loop:!0})}tick(){if(this.seconds<=0)return;this.seconds--;const e=Math.floor(this.seconds/60);let t=this.seconds%60;t<10&&(t="0"+t),this.text.setText(`${e}:${t}`)}}(500,5,300),this.guide=new class{constructor(e,t){this.x=e,this.y=t,this.messageTimer=null,this.currMessageIndex=0,this.queuedMessages=null}create(e){const t=this,i=e.add.graphics({fillStyle:{color:16777215}}),s=new Phaser.Geom.Rectangle(this.x,this.y,500,100);i.fillRectShape(s),e.input.on("pointerdown",e=>{s.contains(e.x,e.y)&&(t.messageTimer.paused=!1)}),this.speechBubbleText=e.add.text(this.x+5,this.y+5,"",{color:"#000"});const l=e.add.graphics({fillStyle:{color:16711680}}),r=new Phaser.Geom.Rectangle(this.x+500-100,this.y+100+20,100,500);l.fillRectShape(r)}queueMessages(e,t){const i=this;return null!=i.messageTimer?new Promise((e,t)=>{e()}):(this.queuedMessages=t,new Promise((t,s)=>{i.messageTimer=e.time.addEvent({delay:50,callback:()=>{if(0===i.queuedMessages.length)return i.messageTimer.remove(),i.messageTimer=null,void t();i.currMessageIndex++;const e=i.queuedMessages[0];if(i.currMessageIndex>e.length)return i.currMessageIndex=0,i.queuedMessages.shift(),void(i.messageTimer.paused=!0);const s=e.slice(0,i.currMessageIndex);i.speechBubbleText.setText(s)},callbackScope:this,loop:!0})}))}updateMessage(e){this.speechBubbleText.setText(e)}}(100,100,this.level),this.tileGrid.create(this),this.scoreDisplay.create(this),this.timer.create(this),this.guide.create(this),0===this.level&&this.guide.queueMessages(this,["Oh, doozle, you made it! You're here!","We need your help collecting dew drops!","If you match three or more dew drops of the same color, we can collect them!","To make a match, click on one or more dew drops to swap their places!"])}update(){this.timer.seconds<=0?this.scene.start("GameOverScene",{score:this.score}):this.queue.isActionRunning()||(this.queue.hasActions()?this.queue.next():this.tileGrid.update(this))}onTileSelect(e,t){if(!e.queue.isActionRunning()&&e.tileGrid.canSelect(t)){if(t.isActivated)return e.selectedTiles=[],void t.deactivate();if(0===e.selectedTiles.length)return e.selectedTiles.push(t),void t.activate();if(1===e.selectedTiles.length){const i=e.selectedTiles[0],s=Math.abs(i.tileGridX-t.tileGridX),l=Math.abs(i.tileGridY-t.tileGridY);if(1===s&&0===l||0===s&&1===l){e.selectedTiles.push(t);let i=e.selectedTiles[0],s=e.selectedTiles[1];e.tileGrid.swapTiles(e,i,s),e.queue.push(()=>(e.tileGrid.hasMatches(i.tileGridX,i.tileGridY)||e.tileGrid.hasMatches(s.tileGridX,s.tileGridY)||e.tileGrid.swapTiles(e,i,s),Promise.resolve())),e.selectedTiles.forEach(e=>{e.deactivate()}),e.selectedTiles=[],e.comboCount=0}}}}onTileMatch(e,t){e.comboCount++,e.score+=10*e.comboCount,e.scoreDisplay.updateScore(e.score),e.comboCount>1?(e.guide.updateMessage(`That's ${e.comboCount} combos!`),e.scoreDisplay.updateCombo(`${e.comboCount}x multiplier!`)):(e.guide.updateMessage("You got a match!"),e.scoreDisplay.updateCombo(""))}},u=class extends Phaser.Scene{constructor(){super("GameOverScene"),this.finalScore=0}init(e){this.finalScore=e.score}create(){const e=this;this.add.text(50,50,"Game Over!"),this.add.text(50,100,`Final Score: ${this.finalScore}`);const t=this.add.text(50,150,"Return to Main Menu");t.setInteractive(),t.on("pointerdown",()=>{e.scene.start("TitleScene")})}};const d={type:Phaser.AUTO,width:800,height:1200,scene:[s,c,u]};new Phaser.Game(d)}]);
//# sourceMappingURL=bundle.js.map