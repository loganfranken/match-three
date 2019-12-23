!function(e){var t={};function i(s){if(t[s])return t[s].exports;var l=t[s]={i:s,l:!1,exports:{}};return e[s].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=e,i.c=t,i.d=function(e,t,s){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)i.d(s,l,function(t){return e[t]}.bind(null,l));return s},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var s=class extends Phaser.Scene{constructor(){super("TitleScene")}create(){const e=this;this.add.text(50,50,"Match Three!");const t=this.add.text(50,70,"Start Game");t.setInteractive(),t.on("pointerdown",()=>{e.scene.start("RoundScene")})}};const l=e=>e[Math.floor(Math.random()*e.length)];var r=0,n=1,h=0,a=1,o=[{name:"Blue",imageKey:"tile_01"},{name:"Green",imageKey:"tile_02"},{name:"Red",imageKey:"tile_03"},{name:"Yellow",imageKey:"tile_04"}],c=class extends Phaser.Scene{constructor(){super("RoundScene"),this.score=null,this.queue=null,this.selectedTiles=null,this.tileGrid=null,this.scoreDisplay=null,this.timer=null,this.comboCount=null}preload(){this.load.image("tile_01","assets/tile_01.png"),this.load.image("tile_02","assets/tile_02.png"),this.load.image("tile_03","assets/tile_03.png"),this.load.image("tile_04","assets/tile_04.png")}create(){this.score=0,this.comboCount=0,this.queue=new class{constructor(){this.queuedActions=[],this.currentAction=null}isActionRunning(){return null!=this.currentAction}hasActions(){return this.queuedActions.length>0}next(){this.currentAction=this.queuedActions.shift(),this.currentAction()}push(e){var t=this;t.queuedActions.push(()=>{e().then(()=>{t.currentAction=null})})}},this.selectedTiles=[],this.tileGrid=new class{constructor(e,t,i,s,l,r,n,a){this.offsetX=s,this.offsetY=l,this.tileSize=i,this.tileGridHeight=t,this.tileGridWidth=e,this.tileGrid=[],this.tileImageContainer=null,this.playAreaOffset=this.tileGridHeight*this.tileSize,this.onTileSelect=r,this.onTileMatch=n,this.queue=a;for(let i=0;i<2*t;i++){this.tileGrid[i]=[];for(let s=0;s<e;s++)this.tileGrid[i][s]=i<t?null:this.createTile(this.getTileType(s,i,h),s,i)}}create(e){this.tileImageContainer=e.add.container(),this.forEachTile(t=>{null!==t&&(t.create(e),this.tileImageContainer.add(t.image))})}update(e){const t=this,i=t.getMatches();i.length>0&&t.onTileMatch(e,i);let s=[];i.forEach(t=>{s.push(t.destroy(e,this.tileImageContainer))}),s.length>0&&t.queue.push(()=>Promise.all(s)),t.forEachTile((e,i,s)=>{null!==e&&e.state===n&&(t.tileGrid[s][i]=null)});let l=[];for(let i=0;i<this.tileGridWidth;i++){let s=2*this.tileGridHeight-1;for(;s>=0;){if(null===t.tileGrid[s][i]){let r=s-1;for(;r>=0;){let n=t.tileGrid[r][i];null!==n&&(t.tileGrid[s][i]=n,t.tileGrid[r][i]=null,l.push(this.getTileDrop(e,n,i,s)),s--),r--}}s--}}t.forEachPlayableTile((i,s,l)=>{if(null===i){const i=l-t.tileGridHeight,r=t.createTile(t.getTileType(s,l,a),s,i);t.tileGrid[i][s]=r,r.create(e),t.tileImageContainer.add(r.image)}}),l.length>0&&t.queue.push(()=>Promise.all(l))}swapTiles(e,t,i){let s=this;s.queue.push(()=>{let l=t.x,r=t.y,n=t.tileGridX,h=t.tileGridY,a=i.x,o=i.y,c=i.tileGridX,u=i.tileGridY,d=i.updatePosition(e,l,r,n,h);s.tileGrid[h][n]=i;let p=t.updatePosition(e,a,o,c,u);return s.tileGrid[u][c]=t,Promise.all([d,p])})}hasMatches(e,t){return this.getMatches(e,t).length>0}getMatches(e,t){const i=this,s=[];return i.forEachTile((l,r,n)=>{if(void 0!==e&&r!==e&&void 0!==t&&n!==t)return;if(!this.isPlayable(l))return;const h=l.tileType,a=[],o=[];let c=r+1;for(;c<i.tileGridWidth;){const e=i.tileGrid[n][c];if(null==e||h.name!==e.tileType.name)break;a.push(e),c++}for(c=r-1;c>0;){const e=i.tileGrid[n][c];if(null==e||h.name!==e.tileType.name)break;a.push(e),c--}let u=n+1;for(;u<i.tileGridHeight;){const e=i.tileGrid[u][r];if(null==e||h.name!==e.tileType.name)break;o.push(e),u++}for(u=n-1;u>0;){const e=i.tileGrid[u][r];if(null==e||h!==e.tileType)break;o.push(e),u--}o.length>1&&s.push(...o),a.length>1&&s.push(...a),(o.length>1||a.length>1)&&s.push(l)}),s}forEachTile(e){for(let t=0;t<2*this.tileGridHeight;t++)for(let i=0;i<this.tileGridWidth;i++)e(this.tileGrid[t][i],i,t)}forEachPlayableTile(e){for(let t=this.tileGridHeight;t<2*this.tileGridHeight;t++)for(let i=0;i<this.tileGridWidth;i++)e(this.tileGrid[t][i],i,t)}createTile(e,t,i){return new class{constructor(e,t,i,s,l,n){this.tileType=e,this.x=t,this.y=i,this.tileGridX=s,this.tileGridY=l,this.onTileSelect=n,this.image=null,this.state=r}create(e){this.image=e.add.image(this.x,this.y,this.tileType.imageKey),this.image.setInteractive(),this.image.on("pointerdown",()=>{this.onTileSelect(e,this)})}activate(){this.image.setTintFill(16777215)}deactivate(){this.image.clearTint()}updatePosition(e,t,i,s,l){let r=this;return new Promise((n,h)=>{r.x=t,r.y=i,r.tileGridX=s,r.tileGridY=l,e.tweens.add({targets:r.image,x:t,y:i,ease:"Power1",duration:500,onComplete:()=>{n()}})})}destroy(e,t){let i=this;return new Promise((s,l)=>{e.tweens.add({targets:i.image,alpha:0,ease:"Power1",duration:500,onComplete:()=>{t.remove(i.image),i.image.destroy(),i.state=n,s()}})})}}(e,this.getTileX(t),this.getTileY(i),t,i,this.onTileSelect)}getTileDrop(e,t,i,s){return t.updatePosition(e,this.getTileX(i),this.getTileY(s),i,s)}getTileX(e){return this.offsetX+this.tileSize*e}getTileY(e){return this.offsetY+this.tileSize*e}canSelect(e){return this.isPlayable(e)}isPlayable(e){return null!=e&&e.tileGridY>this.tileGridHeight-1}getTileType(e,t,i){const s=t<1?null:this.tileGrid[t-1][e],r=t>self.tileGridHeight-1||!this.tileGrid[t+1]?null:this.tileGrid[t+1][e],n=e<1?null:this.tileGrid[t][e-1],h=e>self.tileGridWidth-1?null:this.tileGrid[t][e+1];return l(i!=a||null==s&&null==r&&null==n&&null==h?o.filter(e=>!(null!==s&&e.name===s.tileType.name||null!==n&&e.name===n.tileType.name)):[s,r,n,h].filter(e=>null!=e).map(e=>e.tileType))}}(6,6,50,50,50,this.onTileSelect,this.onTileMatch,this.queue),this.scoreDisplay=new class{constructor(e,t){this.x=e,this.y=t,this.text=null,this.score=0}create(e){this.text=e.add.text(this.x,this.y,this.score)}updateScore(e){this.score=e,this.text.setText(e)}}(5,5),this.timer=new class{constructor(e,t,i){this.x=e,this.y=t,this.text=null,this.seconds=i}create(e){this.text=e.add.text(this.x,this.y,this.score),this.tick(),e.time.addEvent({delay:1e3,callback:this.tick,callbackScope:this,loop:!0})}tick(){if(this.seconds<=0)return;this.seconds--;const e=Math.floor(this.seconds/60);let t=this.seconds%60;t<10&&(t="0"+t),this.text.setText(`${e}:${t}`)}}(500,5,30),this.tileGrid.create(this),this.scoreDisplay.create(this),this.timer.create(this)}update(){this.timer.seconds<=0?this.scene.start("GameOverScene",{score:this.score}):this.queue.isActionRunning()||(this.queue.hasActions()?this.queue.next():this.tileGrid.update(this))}onTileSelect(e,t){if(!e.queue.isActionRunning()&&e.tileGrid.canSelect(t)){if(0===e.selectedTiles.length)return e.selectedTiles.push(t),void t.activate();if(1===e.selectedTiles.length){const i=e.selectedTiles[0],s=Math.abs(i.tileGridX-t.tileGridX),l=Math.abs(i.tileGridY-t.tileGridY);if(1===s&&0===l||0===s&&1===l){e.selectedTiles.push(t);let i=e.selectedTiles[0],s=e.selectedTiles[1];e.tileGrid.swapTiles(e,i,s),e.queue.push(()=>(e.tileGrid.hasMatches(i.tileGridX,i.tileGridY)||e.tileGrid.hasMatches(s.tileGridX,s.tileGridY)||e.tileGrid.swapTiles(e,i,s),Promise.resolve())),e.selectedTiles.forEach(e=>{e.deactivate()}),e.selectedTiles=[],e.comboCount=0}}}}onTileMatch(e,t){e.comboCount++,e.score+=10*e.comboCount,e.scoreDisplay.updateScore(e.score)}},u=class extends Phaser.Scene{constructor(){super("GameOverScene"),this.finalScore=0}init(e){this.finalScore=e.score}create(){const e=this;this.add.text(50,50,"Game Over!"),this.add.text(50,100,`Final Score: ${this.finalScore}`);const t=this.add.text(50,150,"Return to Main Menu");t.setInteractive(),t.on("pointerdown",()=>{e.scene.start("TitleScene")})}};const d={type:Phaser.AUTO,width:800,height:1200,scene:[s,c,u]};new Phaser.Game(d)}]);
//# sourceMappingURL=bundle.js.map