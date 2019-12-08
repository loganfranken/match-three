!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=4)}([function(e,t,i){(function(e){var r=Object.getOwnPropertyDescriptors||function(e){for(var t=Object.keys(e),i={},r=0;r<t.length;r++)i[t[r]]=Object.getOwnPropertyDescriptor(e,t[r]);return i},n=/%[sdj%]/g;t.format=function(e){if(!m(e)){for(var t=[],i=0;i<arguments.length;i++)t.push(l(arguments[i]));return t.join(" ")}i=1;for(var r=arguments,s=r.length,o=String(e).replace(n,function(e){if("%%"===e)return"%";if(i>=s)return e;switch(e){case"%s":return String(r[i++]);case"%d":return Number(r[i++]);case"%j":try{return JSON.stringify(r[i++])}catch(e){return"[Circular]"}default:return e}}),c=r[i];i<s;c=r[++i])y(c)||!v(c)?o+=" "+c:o+=" "+l(c);return o},t.deprecate=function(i,r){if(void 0!==e&&!0===e.noDeprecation)return i;if(void 0===e)return function(){return t.deprecate(i,r).apply(this,arguments)};var n=!1;return function(){if(!n){if(e.throwDeprecation)throw new Error(r);e.traceDeprecation?console.trace(r):console.error(r),n=!0}return i.apply(this,arguments)}};var s,o={};function l(e,i){var r={seen:[],stylize:u};return arguments.length>=3&&(r.depth=arguments[2]),arguments.length>=4&&(r.colors=arguments[3]),d(i)?r.showHidden=i:i&&t._extend(r,i),b(r.showHidden)&&(r.showHidden=!1),b(r.depth)&&(r.depth=2),b(r.colors)&&(r.colors=!1),b(r.customInspect)&&(r.customInspect=!0),r.colors&&(r.stylize=c),a(r,e,r.depth)}function c(e,t){var i=l.styles[t];return i?"["+l.colors[i][0]+"m"+e+"["+l.colors[i][1]+"m":e}function u(e,t){return e}function a(e,i,r){if(e.customInspect&&i&&S(i.inspect)&&i.inspect!==t.inspect&&(!i.constructor||i.constructor.prototype!==i)){var n=i.inspect(r,e);return m(n)||(n=a(e,n,r)),n}var s=function(e,t){if(b(t))return e.stylize("undefined","undefined");if(m(t)){var i="'"+JSON.stringify(t).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return e.stylize(i,"string")}if(g(t))return e.stylize(""+t,"number");if(d(t))return e.stylize(""+t,"boolean");if(y(t))return e.stylize("null","null")}(e,i);if(s)return s;var o=Object.keys(i),l=function(e){var t={};return e.forEach(function(e,i){t[e]=!0}),t}(o);if(e.showHidden&&(o=Object.getOwnPropertyNames(i)),G(i)&&(o.indexOf("message")>=0||o.indexOf("description")>=0))return h(i);if(0===o.length){if(S(i)){var c=i.name?": "+i.name:"";return e.stylize("[Function"+c+"]","special")}if(T(i))return e.stylize(RegExp.prototype.toString.call(i),"regexp");if(w(i))return e.stylize(Date.prototype.toString.call(i),"date");if(G(i))return h(i)}var u,v="",x=!1,O=["{","}"];(p(i)&&(x=!0,O=["[","]"]),S(i))&&(v=" [Function"+(i.name?": "+i.name:"")+"]");return T(i)&&(v=" "+RegExp.prototype.toString.call(i)),w(i)&&(v=" "+Date.prototype.toUTCString.call(i)),G(i)&&(v=" "+h(i)),0!==o.length||x&&0!=i.length?r<0?T(i)?e.stylize(RegExp.prototype.toString.call(i),"regexp"):e.stylize("[Object]","special"):(e.seen.push(i),u=x?function(e,t,i,r,n){for(var s=[],o=0,l=t.length;o<l;++o)P(t,String(o))?s.push(f(e,t,i,r,String(o),!0)):s.push("");return n.forEach(function(n){n.match(/^\d+$/)||s.push(f(e,t,i,r,n,!0))}),s}(e,i,r,l,o):o.map(function(t){return f(e,i,r,l,t,x)}),e.seen.pop(),function(e,t,i){if(e.reduce(function(e,t){return 0,t.indexOf("\n")>=0&&0,e+t.replace(/\u001b\[\d\d?m/g,"").length+1},0)>60)return i[0]+(""===t?"":t+"\n ")+" "+e.join(",\n  ")+" "+i[1];return i[0]+t+" "+e.join(", ")+" "+i[1]}(u,v,O)):O[0]+v+O[1]}function h(e){return"["+Error.prototype.toString.call(e)+"]"}function f(e,t,i,r,n,s){var o,l,c;if((c=Object.getOwnPropertyDescriptor(t,n)||{value:t[n]}).get?l=c.set?e.stylize("[Getter/Setter]","special"):e.stylize("[Getter]","special"):c.set&&(l=e.stylize("[Setter]","special")),P(r,n)||(o="["+n+"]"),l||(e.seen.indexOf(c.value)<0?(l=y(i)?a(e,c.value,null):a(e,c.value,i-1)).indexOf("\n")>-1&&(l=s?l.split("\n").map(function(e){return"  "+e}).join("\n").substr(2):"\n"+l.split("\n").map(function(e){return"   "+e}).join("\n")):l=e.stylize("[Circular]","special")),b(o)){if(s&&n.match(/^\d+$/))return l;(o=JSON.stringify(""+n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(o=o.substr(1,o.length-2),o=e.stylize(o,"name")):(o=o.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),o=e.stylize(o,"string"))}return o+": "+l}function p(e){return Array.isArray(e)}function d(e){return"boolean"==typeof e}function y(e){return null===e}function g(e){return"number"==typeof e}function m(e){return"string"==typeof e}function b(e){return void 0===e}function T(e){return v(e)&&"[object RegExp]"===x(e)}function v(e){return"object"==typeof e&&null!==e}function w(e){return v(e)&&"[object Date]"===x(e)}function G(e){return v(e)&&("[object Error]"===x(e)||e instanceof Error)}function S(e){return"function"==typeof e}function x(e){return Object.prototype.toString.call(e)}function O(e){return e<10?"0"+e.toString(10):e.toString(10)}t.debuglog=function(i){if(b(s)&&(s=e.env.NODE_DEBUG||""),i=i.toUpperCase(),!o[i])if(new RegExp("\\b"+i+"\\b","i").test(s)){var r=e.pid;o[i]=function(){var e=t.format.apply(t,arguments);console.error("%s %d: %s",i,r,e)}}else o[i]=function(){};return o[i]},t.inspect=l,l.colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},t.isArray=p,t.isBoolean=d,t.isNull=y,t.isNullOrUndefined=function(e){return null==e},t.isNumber=g,t.isString=m,t.isSymbol=function(e){return"symbol"==typeof e},t.isUndefined=b,t.isRegExp=T,t.isObject=v,t.isDate=w,t.isError=G,t.isFunction=S,t.isPrimitive=function(e){return null===e||"boolean"==typeof e||"number"==typeof e||"string"==typeof e||"symbol"==typeof e||void 0===e},t.isBuffer=i(2);var j=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function P(e,t){return Object.prototype.hasOwnProperty.call(e,t)}t.log=function(){var e,i;console.log("%s - %s",(e=new Date,i=[O(e.getHours()),O(e.getMinutes()),O(e.getSeconds())].join(":"),[e.getDate(),j[e.getMonth()],i].join(" ")),t.format.apply(t,arguments))},t.inherits=i(3),t._extend=function(e,t){if(!t||!v(t))return e;for(var i=Object.keys(t),r=i.length;r--;)e[i[r]]=t[i[r]];return e};var E="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function z(e,t){if(!e){var i=new Error("Promise was rejected with a falsy value");i.reason=e,e=i}return t(e)}t.promisify=function(e){if("function"!=typeof e)throw new TypeError('The "original" argument must be of type Function');if(E&&e[E]){var t;if("function"!=typeof(t=e[E]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,E,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var t,i,r=new Promise(function(e,r){t=e,i=r}),n=[],s=0;s<arguments.length;s++)n.push(arguments[s]);n.push(function(e,r){e?i(e):t(r)});try{e.apply(this,n)}catch(e){i(e)}return r}return Object.setPrototypeOf(t,Object.getPrototypeOf(e)),E&&Object.defineProperty(t,E,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,r(e))},t.promisify.custom=E,t.callbackify=function(t){if("function"!=typeof t)throw new TypeError('The "original" argument must be of type Function');function i(){for(var i=[],r=0;r<arguments.length;r++)i.push(arguments[r]);var n=i.pop();if("function"!=typeof n)throw new TypeError("The last argument must be of type Function");var s=this,o=function(){return n.apply(s,arguments)};t.apply(this,i).then(function(t){e.nextTick(o,null,t)},function(t){e.nextTick(z,t,o)})}return Object.setPrototypeOf(i,Object.getPrototypeOf(t)),Object.defineProperties(i,r(t)),i}}).call(this,i(1))},function(e,t){var i,r,n=e.exports={};function s(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function l(e){if(i===setTimeout)return setTimeout(e,0);if((i===s||!i)&&setTimeout)return i=setTimeout,setTimeout(e,0);try{return i(e,0)}catch(t){try{return i.call(null,e,0)}catch(t){return i.call(this,e,0)}}}!function(){try{i="function"==typeof setTimeout?setTimeout:s}catch(e){i=s}try{r="function"==typeof clearTimeout?clearTimeout:o}catch(e){r=o}}();var c,u=[],a=!1,h=-1;function f(){a&&c&&(a=!1,c.length?u=c.concat(u):h=-1,u.length&&p())}function p(){if(!a){var e=l(f);a=!0;for(var t=u.length;t;){for(c=u,u=[];++h<t;)c&&c[h].run();h=-1,t=u.length}c=null,a=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===o||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function d(e,t){this.fun=e,this.array=t}function y(){}n.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];u.push(new d(e,t)),1!==u.length||a||l(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=y,n.addListener=y,n.once=y,n.off=y,n.removeListener=y,n.removeAllListeners=y,n.emit=y,n.prependListener=y,n.prependOnceListener=y,n.listeners=function(e){return[]},n.binding=function(e){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(e){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},function(e,t){e.exports=function(e){return e&&"object"==typeof e&&"function"==typeof e.copy&&"function"==typeof e.fill&&"function"==typeof e.readUInt8}},function(e,t){"function"==typeof Object.create?e.exports=function(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}:e.exports=function(e,t){e.super_=t;var i=function(){};i.prototype=t.prototype,e.prototype=new i,e.prototype.constructor=e}},function(e,t,i){"use strict";i.r(t);var r=0,n=1,s=[{name:"Blue",imageKey:"tile_01"},{name:"Green",imageKey:"tile_02"},{name:"Red",imageKey:"tile_03"},{name:"Yellow",imageKey:"tile_04"}];i(0);const o={type:Phaser.AUTO,width:800,height:1200,scene:[class extends Phaser.Scene{constructor(){super("TitleScene")}create(){this.add.text(50,50,"Match Three!"),this.time.addEvent({delay:1e3,callback:function(){this.scene.start("RoundScene")},callbackScope:this})}},class extends Phaser.Scene{constructor(){super("RoundScene"),this.score=0,this.queue=null,this.selectedTiles=null,this.tileGrid=null,this.scoreDisplay=null,this.timer=null}preload(){this.load.image("tile_01","assets/tile_01.png"),this.load.image("tile_02","assets/tile_02.png"),this.load.image("tile_03","assets/tile_03.png"),this.load.image("tile_04","assets/tile_04.png")}create(){this.score=0,this.queue=new class{constructor(){this.queuedActions=[],this.currentAction=null}isActionRunning(){return null!=this.currentAction}hasActions(){return this.queuedActions.length>0}next(){this.currentAction=this.queuedActions.shift(),this.currentAction()}push(e){var t=this;t.queuedActions.push(()=>{e().then(()=>{t.currentAction=null})})}},this.selectedTiles=[],this.tileGrid=new class{constructor(e,t,i,r,n,s,o,l){this.offsetX=r,this.offsetY=n,this.tileSize=i,this.tileGridHeight=t,this.tileGridWidth=e,this.tileGrid=[],this.tileImageContainer=null,this.playAreaOffset=this.tileGridHeight*this.tileSize,this.onTileSelect=s,this.onTileMatch=o,this.queue=l;for(let i=0;i<2*t;i++){this.tileGrid[i]=[];for(let t=0;t<e;t++)this.tileGrid[i][t]=this.createTile(this.getTileType(t,i),t,i)}}create(e){this.tileImageContainer=e.add.container(),this.forEachTile(t=>{t.create(e),this.tileImageContainer.add(t.image)});const t=e.make.graphics();t.fillStyle(16777215,1),t.fillRect(this.offsetX/2,this.offsetY/2,this.tileGridWidth*this.tileSize,this.tileGridHeight*this.tileSize)}update(e){const t=this,i=t.getMatches();i.length>0&&t.onTileMatch(e,i);let r=[];i.forEach(t=>{r.push(t.destroy(e,this.tileImageContainer))}),r.length>0&&t.queue.push(()=>Promise.all(r)),t.forEachTile((e,i,r)=>{e.state===n&&(t.tileGrid[r][i]=null)});let s=[];for(let i=0;i<this.tileGridWidth;i++){let r=2*this.tileGridHeight-1;for(;r>=0;){if(null===t.tileGrid[r][i]){let n=r-1;for(;n>=0;){let o=t.tileGrid[n][i];null!==o&&(t.tileGrid[r][i]=o,t.tileGrid[n][i]=null,s.push(this.getTileDrop(e,o,i,r)),r--),n--}}r--}}t.forEachTile((i,r,n)=>{if(null===i){const i=t.createTile(t.getTileType(r,n),r,n);console.log(i),t.tileGrid[n][r]=i,i.create(e),t.tileImageContainer.add(i.image)}}),s.length>0&&t.queue.push(()=>Promise.all(s))}swapTiles(e,t,i){let r=this;r.queue.push(()=>{let n=t.x,s=t.y,o=t.tileGridX,l=t.tileGridY,c=i.x,u=i.y,a=i.tileGridX,h=i.tileGridY,f=i.updatePosition(e,n,s,o,l);r.tileGrid[l][o]=i;let p=t.updatePosition(e,c,u,a,h);return r.tileGrid[h][a]=t,Promise.all([f,p])})}hasMatches(e,t){return this.getMatches(e,t).length>0}getMatches(e,t){const i=this,r=[];return i.forEachTile((n,s,o)=>{if(void 0!==e&&s!==e&&void 0!==t&&o!==t)return;if(!this.isPlayable(n))return;const l=n.tileType,c=[],u=[];let a=s+1;for(;a<i.tileGridWidth;){const e=i.tileGrid[o][a];if(null==e||l.name!==e.tileType.name)break;c.push(e),a++}for(a=s-1;a>0;){const e=i.tileGrid[o][a];if(null==e||l.name!==e.tileType.name)break;c.push(e),a--}let h=o+1;for(;h<i.tileGridHeight;){const e=i.tileGrid[h][s];if(null==e||l.name!==e.tileType.name)break;u.push(e),h++}for(h=o-1;h>0;){const e=i.tileGrid[h][s];if(null==e||l!==e.tileType)break;u.push(e),h--}u.length>1&&r.push(...u),c.length>1&&r.push(...c),(u.length>1||c.length>1)&&r.push(n)}),r}forEachTile(e){for(let t=0;t<2*this.tileGridHeight;t++)for(let i=0;i<this.tileGridWidth;i++)this.tileGrid[t][i],e(this.tileGrid[t][i],i,t)}createTile(e,t,i){return new class{constructor(e,t,i,n,s,o){this.tileType=e,this.x=t,this.y=i,this.tileGridX=n,this.tileGridY=s,this.onTileSelect=o,this.image=null,this.state=r}create(e){this.image=e.add.image(this.x,this.y,this.tileType.imageKey),this.image.setInteractive(),this.image.on("pointerdown",()=>{this.onTileSelect(e,this)})}activate(){this.image.setTintFill(16777215)}deactivate(){this.image.clearTint()}updatePosition(e,t,i,r,n){let s=this;return new Promise((o,l)=>{s.x=t,s.y=i,s.tileGridX=r,s.tileGridY=n,e.tweens.add({targets:s.image,x:t,y:i,ease:"Power1",duration:500,onComplete:()=>{o()}})})}destroy(e,t){let i=this;return new Promise((r,s)=>{e.tweens.add({targets:i.image,alpha:0,ease:"Power1",duration:500,onComplete:()=>{t.remove(i.image),i.image.destroy(),i.state=n,r()}})})}}(e,this.getTileX(t),this.getTileY(i),t,i,this.onTileSelect)}getTileDrop(e,t,i,r){return t.updatePosition(e,this.getTileX(i),this.getTileY(r),i,r)}getTileX(e){return this.offsetX+this.tileSize*e}getTileY(e){return this.offsetY+this.tileSize*e}canSelect(e){return this.isPlayable(e)}isPlayable(e){return e.tileGridY>this.tileGridHeight-1}getTileType(e,t){const i=t<1?null:this.tileGrid[t-1][e],r=e<1?null:this.tileGrid[t][e-1];return(e=>e[Math.floor(Math.random()*e.length)])(s.filter(e=>!(null!==i&&e.name===i.tileType.name||null!==r&&e.name===r.tileType.name)))}}(10,10,50,50,50,this.onTileSelect,this.onTileMatch,this.queue),this.scoreDisplay=new class{constructor(e,t){this.x=e,this.y=t,this.text=null,this.score=0}create(e){this.text=e.add.text(this.x,this.y,this.score)}updateScore(e){this.score=e,this.text.setText(e)}}(5,5),this.timer=new class{constructor(e,t,i){this.x=e,this.y=t,this.text=null,this.seconds=i}create(e){this.text=e.add.text(this.x,this.y,this.score),this.tick(),e.time.addEvent({delay:1e3,callback:this.tick,callbackScope:this,loop:!0})}tick(){if(this.seconds<=0)return;this.seconds--;const e=Math.floor(this.seconds/60);let t=this.seconds%60;t<10&&(t="0"+t),this.text.setText(`${e}:${t}`)}}(500,5,30),this.tileGrid.create(this),this.scoreDisplay.create(this),this.timer.create(this)}update(){this.timer.seconds<=0?this.scene.start("GameOverScene",{score:this.score}):this.queue.isActionRunning()||(this.queue.hasActions()?this.queue.next():this.tileGrid.update(this))}onTileSelect(e,t){if(!e.queue.isActionRunning()&&e.tileGrid.canSelect(t)){if(0===e.selectedTiles.length)return e.selectedTiles.push(t),void t.activate();if(1===e.selectedTiles.length){const i=e.selectedTiles[0],r=Math.abs(i.tileGridX-t.tileGridX),n=Math.abs(i.tileGridY-t.tileGridY);if(1===r&&0===n||0===r&&1===n){e.selectedTiles.push(t);let i=e.selectedTiles[0],r=e.selectedTiles[1];e.tileGrid.swapTiles(e,i,r),e.queue.push(()=>(e.tileGrid.hasMatches(i.tileGridX,i.tileGridY)||e.tileGrid.hasMatches(r.tileGridX,r.tileGridY)||e.tileGrid.swapTiles(e,i,r),Promise.resolve())),e.selectedTiles.forEach(e=>{e.deactivate()}),e.selectedTiles=[]}}}}onTileMatch(e,t){e.score+=10,e.scoreDisplay.updateScore(e.score)}},class extends Phaser.Scene{constructor(){super("GameOverScene"),this.finalScore=0}init(e){this.finalScore=e.score}create(){this.add.text(50,50,"Game Over!"),this.add.text(50,100,`Final Score: ${this.finalScore}`),this.time.addEvent({delay:1e3,callback:function(){this.scene.start("TitleScene")},callbackScope:this})}}]};new Phaser.Game(o)}]);
//# sourceMappingURL=bundle.js.map