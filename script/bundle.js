!function(e){var t={};function i(n){if(t[n])return t[n].exports;var l=t[n]={i:n,l:!1,exports:{}};return e[n].call(l.exports,l,l.exports,i),l.l=!0,l.exports}i.m=e,i.c=t,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)i.d(n,l,function(t){return e[t]}.bind(null,l));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);const n=e=>e[Math.floor(Math.random()*e.length)];var l=0,s=1,r=class{constructor(e,t,i,n,s,r){this.tileType=e,this.x=t,this.y=i,this.tileGridX=n,this.tileGridY=s,this.onTileSelect=r,this.image=null,this.state=l}create(e){this.image=e.add.image(this.x,this.y,this.tileType.imageKey),this.image.setInteractive(),this.image.on("pointerdown",()=>{this.onTileSelect(e,this)})}activate(){this.image.setTintFill(16777215)}deactivate(){this.image.clearTint()}updatePosition(e,t,i,n,l){let s=this;return new Promise((r,o)=>{s.x=t,s.y=i,s.tileGridX=n,s.tileGridY=l,e.tweens.add({targets:s.image,x:t,y:i,ease:"Power1",duration:500,onComplete:()=>{r()}})})}destroy(){this.image.destroy(),this.state=s}},o=[{name:"Blue",imageKey:"tile_01"},{name:"Green",imageKey:"tile_02"},{name:"Red",imageKey:"tile_03"},{name:"Yellow",imageKey:"tile_04"}];const a={type:Phaser.AUTO,width:800,height:600,scene:{preload:function(){this.load.image("tile_01","assets/tile_01.png"),this.load.image("tile_02","assets/tile_02.png"),this.load.image("tile_03","assets/tile_03.png"),this.load.image("tile_04","assets/tile_04.png")},create:function(){c.create(this)},update:function(){if(h.isActionRunning())return;if(h.hasActions())return void h.next();c.update(this)}}},h=(new Phaser.Game(a),new class{constructor(){this.queuedActions=[],this.currentAction=null}isActionRunning(){return null!=this.currentAction}hasActions(){return this.queuedActions.length>0}next(){this.currentAction=this.queuedActions.shift(),this.currentAction()}push(e){var t=this;t.queuedActions.push(()=>{e().then(()=>{t.currentAction=null})})}});let u=[];const c=new class{constructor(e,t,i,l,s,a){this.offsetX=i,this.offsetY=l,this.tileHeight=t,this.tileWidth=e,this.tileGrid=[],this.onTileSelect=s,this.queue=a;for(let i=0;i<t;i++){this.tileGrid[i]=[];for(let t=0;t<e;t++){const e=i<1?null:this.tileGrid[i-1][t],l=t<1?null:this.tileGrid[i][t-1],s=n(o.filter(t=>!(null!==e&&t.name===e.tileType.name||null!==l&&t.name===l.tileType.name)));this.tileGrid[i][t]=new r(s,this.offsetX+50*t,this.offsetY+50*i,t,i,this.onTileSelect)}}}create(e){this.forEachTile(t=>t.create(e))}update(e){const t=this;t.getMatches().forEach(e=>e.destroy()),t.forEachTile((e,i,n)=>{t.tileGrid[n][i].state===s&&(t.tileGrid[n][i]=null)});let i=[];t.forEachTile((n,l,s)=>{s<t.tileHeight-1&&null===t.tileGrid[s+1][l]&&null!=t.tileGrid[s][l]&&(t.tileGrid[s+1][l]=n,i.push(n.updatePosition(e,t.offsetX+50*l,t.offsetY+50*(s+1),l,s+1)),t.tileGrid[s][l]=null)}),i.length>0&&t.queue.push(()=>Promise.all(i))}swapTiles(e,t,i){let n=this;n.queue.push(()=>{let l=t.x,s=t.y,r=t.tileGridX,o=t.tileGridY,a=i.x,h=i.y,u=i.tileGridX,c=i.tileGridY,d=i.updatePosition(e,l,s,r,o);n.tileGrid[o][r]=i;let f=t.updatePosition(e,a,h,u,c);return n.tileGrid[c][u]=t,Promise.all([d,f])})}hasMatches(e,t){return this.getMatches(e,t).length>0}getMatches(e,t){const i=this,n=[];return i.forEachTile((l,s,r)=>{if(void 0!==e&&s!==e&&void 0!==t&&r!==t)return;const o=l.tileType,a=[],h=[];let u=s+1;for(;u<i.tileWidth;){const e=i.tileGrid[r][u];if(null==e||o.name!==e.tileType.name)break;a.push(e),u++}for(u=s-1;u>0;){const e=i.tileGrid[r][u];if(null==e||o.name!==e.tileType.name)break;a.push(e),u--}let c=r+1;for(;c<i.tileHeight;){const e=i.tileGrid[c][s];if(null==e||o.name!==e.tileType.name)break;h.push(e),c++}for(c=r-1;c>0;){const e=i.tileGrid[c][s];if(null==e||o!==e.tileType)break;h.push(e),c--}h.length>1&&n.push(...h),a.length>1&&n.push(...a),(h.length>1||a.length>1)&&n.push(l)}),n}forEachTile(e){for(let t=0;t<this.tileHeight;t++)for(let i=0;i<this.tileWidth;i++)null!=this.tileGrid[t][i]&&e(this.tileGrid[t][i],i,t)}}(10,10,50,50,function(e,t){if(0===u.length)return u.push(t),void t.activate();if(1===u.length){const i=u[0],n=Math.abs(i.tileGridX-t.tileGridX),l=Math.abs(i.tileGridY-t.tileGridY);if(1===n&&0===l||0===n&&1===l){u.push(t);let i=u[0],n=u[1];c.swapTiles(e,i,n),u.forEach(e=>{e.deactivate()}),u=[]}}},h)}]);
//# sourceMappingURL=bundle.js.map