(function(){'use strict';/*! Reef v11.0.1 | (c) 2021 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/reef */
let e=!1;function t(t){e&&console.warn("[Reef] "+t);}function n(e,t={},n=document){let r=new CustomEvent("reef:"+e,{bubbles:!0,cancelable:!0,detail:t});return n.dispatchEvent(r)}function r(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function o(e){let t=r(e);return "object"===t?function(){let t={};for(let n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=o(e[n]));return t}():"array"===t?e.map((function(e){return o(e)})):e}function i(e){e._debounce&&window.cancelAnimationFrame(e.debounce),e._debounce=window.requestAnimationFrame((function(){e.render();}));}function l(e){let t=e.elem,n=o(e._store?Object.assign(e._store.data,e.data||{}):e.data);return {elem:t,data:n,template:e._template(n,t)}}function u(e){return ["false","null","undefined","0","-0","NaN","0n","-0n"].includes(e)}function c(e,t){return e?new Proxy(e,function e(t){return {get:function(n,o){return "_isProxy"===o||(["object","array"].includes(r(n[o]))&&!n[o]._isProxy&&(n[o]=new Proxy(n[o],e(t))),n[o])},set:function(e,n,r){return e[n]===r||(e[n]=r,i(t)),!0},deleteProperty:function(e,n){return delete e[n],i(t),!0}}}(t)):null}let a={};var s=function(e){if(a[e.type])for(let t of a[e.type]){let{elem:n,callback:r}=t;(n===e.target||n.contains(e.target))&&r.call(t.instance,e);}};function d(e){a[e]&&(delete a[e],document.removeEventListener(e,s,!0));}function f(e,t,n,r){if(!r._listeners)return;let o=t.slice(2),i=r._listeners[n.slice(0,-2)];i&&(!function(e){a[e]||(a[e]=[],document.addEventListener(e,s,!0));}(o),function(e,t,n){return a[e].find((function(e){return t===e.elem&&n===e.callback}))}(o,e,i)||a[o].push({elem:e,callback:i,instance:r}));}function h(e,t){if(t._listeners)for(let t of e)for(let e in a)a[e]=a[e].filter((function(e){return e.elem!==t})),a[e].length||d(e);}let m=["input","option","textarea"],p=["value","checked","selected"],b=["checked","selected"];function v(e,t){let n=t.replace(/\s+/g,"").toLowerCase();return !(!["src","href","xlink:href"].includes(e)||!n.includes("javascript:")&&!n.includes("data:text/html"))||(!!e.startsWith("on")||void 0)}function g(e,t,n){v(t,n)||(p.includes(t)&&(e[t]="value"===t?n:" "),e.setAttribute(t,n));}function y(e,t){p.includes(t)&&(e[t]=""),e.removeAttribute(t);}function N(e,t){if(1===e.nodeType){for(let{name:n,value:r}of e.attributes){if(n.startsWith("on")&&f(e,n,r,t),v(n,r)){y(e,n);continue}if(!n.startsWith("@")&&!n.startsWith("#"))continue;let o=n.slice(1);y(e,n),b.includes(o)&&u(r)||g(e,o,r);}if(e.childNodes)for(let n of e.childNodes)N(n,t);}}function _(e){return e.childNodes&&e.childNodes.length?null:e.textContent}function w(e,t){return e.nodeType!==t.nodeType||e.tagName!==t.tagName||e.id!==t.id||e.src!==t.src}function x(e,t,n){let r=e.childNodes,o=t.childNodes;(function(e){let t=e.querySelectorAll("script");for(let e of t)e.remove();})(e)||(r.forEach((function(e,r){if(!o[r]){let r=e.cloneNode(!0);return N(r,n),void t.append(r)}if(w(e,o[r])){let t=function(e,t,n){return Array.from(t).slice(n+1).find((function(t){return !w(e,t)}))}(e,o,r);if(!t){let t=e.cloneNode(!0);return N(t,n),void o[r].before(t)}o[r].before(t);}let i=_(e);if(i&&i!==_(o[r])&&(o[r].textContent=i),function(e,t,n){if(1!==e.nodeType)return;let r=e.attributes,o=t.attributes;for(let{name:o,value:i}of r){if(o.startsWith("#"))continue;if(p.includes(o)&&m.includes(e.tagName.toLowerCase()))continue;let r=o.startsWith("@")?o.slice(1):o;b.includes(r)&&u(i)?y(t,r):o.startsWith("on")?f(t,o,i,n):g(t,r,i);}for(let{name:e,value:n}of o)r[e]||p.includes(e)&&m.includes(t.tagName.toLowerCase())||y(t,e);}(e,o[r],n),!e.childNodes.length&&o[r].childNodes.length)return h(e.children,n),void(o[r].innerHTML="");if(!o[r].childNodes.length&&e.childNodes.length){let t=document.createDocumentFragment();return x(e,t,n),void o[r].appendChild(t)}e.childNodes.length&&x(e,o[r],n);})),function(e,t,n){let r=e.length-t.length;if(!(r<1))for(;r>0;r--)h([e[e.length-1]],n),e[e.length-1].remove();}(o,r,n));}function C(e,r={}){let{data:l,store:u,template:a,isStore:s,setters:d,listeners:f,after:h}=r;if(!e&&!s)return t("Element not found.");if(!a&&!s)return t("Please provide a template function.");let m=d?o(l):c(l,this);Object.defineProperties(this,{_store:{value:u},_template:{value:a},_debounce:{value:!1,writable:!0},_isStore:{value:s},_components:s?{value:[],writable:!0}:{value:null},_listeners:{value:Object.freeze(f)},elem:{get:function(){return "string"==typeof e?document.querySelector(e):e}},data:{get:function(){return d?o(m):m},set:function(e){return d||(m=c(e,this),i(this)),!0},configurable:!0},dataCopy:{get:function(){return o(m)}},do:{value:function(e,...n){return d?d[e]?(d[e].apply(this,[m,...n]),m=o(m),void i(this)):t(`No setter named "${e}".`):t("No setters for this component.")}}}),u&&u._components.push(this),n("initialize",this);}C.prototype.html=function(){return l(this).template},C.prototype.render=function(){if(this._isStore){for(let e of this._components)"render"in e&&"function"==typeof e.render&&e.render();return}let e=l(this);return e.elem?n("before-render",{data:e.data,component:this},e.elem)?(x(function(e){let t=(new DOMParser).parseFromString(e,"text/html");return t.head&&t.head.childNodes&&t.head.childNodes.length>0&&Array.from(t.head.childNodes).reverse().forEach((function(e){t.body.insertBefore(e,t.body.firstChild);})),t.body||document.createElement("body")}(e.template),e.elem,this),n("render",{data:e.data,component:this},e.elem),e.elem):void 0:t("Render target not found.")},C.Store=function(e){return e.isStore=!0,new C(null,e)},C.debug=function(t){e=!!t;},n("ready");/* Beastiary of creatures to select from */
const Beastiary = [
  /*STR DEX CON INT WIS CHA  Name                        CR */
  [ 10, 14, 10, 11, 12, 11, 'Aarkocra',                 '1/4' ],
  [ 21,  9, 15, 18, 15, 18, 'Aboleth',                  '10' ],
  [ 18, 18, 18, 17, 20, 20, 'Deva',                     '10' ],
  [ 24, 20, 24, 19, 22, 25, 'Planetar',                 '16' ],
  [ 26, 24, 26, 25, 25, 30, 'Solar',                    '21' ],
  [ 14, 11, 13,  1,  3,  1, 'Animated Armor',           '1'  ],
  [ 12, 15, 11,  1,  5,  1, 'Flying Sword',             '1/4'],
  [ 17, 14, 10,  1,  3,  1, 'Rug of Smothering',        '2'  ],
  [ 17, 11, 13,  1, 13,  6, 'Ankheg',                   '2'  ],
  [ 17, 12, 15, 12, 13, 10, 'Azer',                     '2'  ],
  [  1, 14, 10, 12, 11, 17, 'Banshee',                  '4'  ],
  [ 16,  8, 15,  2,  8,  7, 'Basilisk',                 '3'  ],
  [ 23, 16, 18,  7, 14, 12, 'Behir',                    '11'  ],
  [ 10, 14, 18, 17, 15, 17, 'Beholder',                 '13'  ],
  [ 10, 14, 14, 19, 15, 19, 'Death Tyrant',             '14'  ],
  [  8, 14, 14, 13, 14, 11, 'Spectator',                '3'  ],
  [ 12, 12, 13,  4,  8,  3, 'Needle Blight',            '1/4'  ],
  [  6, 13, 12,  4,  8,  3, 'Twig Blight',              '1/8'  ],
  [ 15,  8, 14,  5, 10,  3, 'Vine Blight',              '1/2'  ],
  [ 15, 14, 13,  8, 11,  9, 'Bugbear',                  '1'  ],
  [ 17, 14, 14, 11, 12, 11, 'Bugbear Chief',            '3'  ],
  [ 19, 11, 21,  2, 10,  5, 'Bulette',                  '5' ],
  [ 12, 12, 13,  7, 10,  7, 'Bullywug',                 '1/4' ],
  [ 18, 18, 16, 14, 12, 16, 'Cambion',                  '5' ],
  [ 14, 13, 16,  1, 12,  5, 'Carrion Crawler',          '2' ],
  [ 18, 14, 14,  9, 13, 11, 'Centaur',                  '2' ],
  [ 19, 11, 19,  3, 14, 10, 'Chimera',                  '6' ],
  [ 19, 10, 16,  5, 11,  5, 'Chuul',                    '4' ],
  [ 17, 15, 12, 13, 12, 14, 'Cloaker',                  '8' ],
  [  6, 12, 12,  2, 13,  5, 'Cockatrice',               '1/2' ],
  [ 16, 20, 17, 18, 20, 18, 'Couatl',                   '4' ],
  [ 13, 14, 11,  5, 10,  4, 'Crawling Claw',            '0' ],
  [ 22, 11, 20,  8,  6, 10, 'Cyclops',                  '6' ],
  [ 16, 12, 13,  2, 10,  5, 'Darkmantle',               '1/2' ],
  [ 20, 11, 20, 12, 16, 18, 'Death Knight',             '17' ],
  [  1, 20, 10, 20, 17, 20, 'Demilich',                 '18' ],
  [ 26, 15, 22, 20, 16, 22, 'Balor',                    '19' ],
  [ 18, 15, 16,  7, 14,  9, 'Barlgura',                 '5' ],
  [ 15, 15, 12, 11, 14, 10, 'Chasme',                   '6' ],
  [ 11, 11, 12,  5,  8,  2, 'Dretch',                   '1/4' ],
  [ 20, 15, 21, 19, 17, 16, 'Glabrezu',                 '9' ],
  [ 25, 11, 25,  6, 13, 14, 'Goristro',                 '17' ],
  [ 19, 17, 20,  5, 12, 13, 'Hezrou',                   '8' ],
  [ 10,  9, 13,  3,  8,  4, 'Manes',                    '1/8' ],
  [ 18, 20, 20, 18, 16, 20, 'Marilith',                 '16' ],
  [ 21, 10, 22, 19, 12, 15, 'Nalfshnee',                '13' ],
  [  5, 17, 10,  7, 10, 10, 'Quasit',                   '1' ],
  [  1, 17, 12, 14, 13, 14, 'Shadow Demon',             '4' ],
  [ 17, 15, 18,  8, 13,  8, 'Vrock',                    '6' ],
  [ 15, 14, 18, 13, 15, 15, 'Yochlol',                  '10' ],
  [ 16, 17, 18, 12, 14, 14, 'Barbed Devil',             '5' ],
  [ 16, 15, 15,  9, 11, 11, 'Bearded Devil',            '3' ],
  [ 18, 16, 18, 13, 14, 16, 'Bone Devil',               '9' ],
  [ 18, 15, 18, 11, 12, 14, 'Chain Devil',              '8' ],
  [ 18, 16, 18, 14, 14, 18, 'Erinyes',                  '12' ],
  [ 22, 17, 21, 12, 16, 17, 'Horned Devil',             '11' ],
  [ 21, 14, 18, 18, 15, 18, 'Ice Devil',                '14' ],
  [  6, 17, 13, 11, 12, 14, 'Imp',                      '1' ],
  [ 10,  5, 11,  1, 11,  3, 'Lemure',                   '0' ],
  [ 26, 14, 24, 22, 18, 24, 'Pit Field',                '20' ],
  [ 10, 15, 12, 11, 14,  8, 'Spined Devil',             '2' ],
  [ 19, 13, 17,  2, 12,  5, 'Allosaurus',               '2' ],
  [ 19, 11, 15,  2, 12,  5, 'Ankylosaurus',             '3' ],
  [ 18, 15, 16,  2, 12,  5, 'Plesiosaurus',             '2' ],
  [ 12, 15, 10,  2,  9,  5, 'Pteranodon',               '1/4' ],
  [ 22,  9, 17,  2, 11,  5, 'Triceratops',              '5' ],
  [ 25, 10, 19,  2, 12,  9, 'Tyrannosaurus Rex',        '8' ],
  [ 18, 15, 16,  6, 12,  8, 'Displacer Beast',          '3' ],
  [ 11, 18, 14, 11, 12, 14, 'Doppeganger',              '3' ],
  [ 25, 10, 23, 16, 15, 19, 'Adult Blue Dracolich',     '17' ],
  [ 23, 10, 21, 14, 11, 19, 'Young Red Shadow Dragon',  '13' ],
  [ 27, 14, 25, 16, 13, 19, 'Ancient Black Dragon',     '21' ],
  [ 23, 14, 21, 14, 13, 17, 'Adult Black Dragon',       '14' ],
  [ 19, 14, 17, 12, 11, 15, 'Young Black Dragon',       '7' ],
  [ 15, 14, 13, 13, 11, 13, 'Black Dragon Wyrmling',    '2' ],
  [ 29, 10, 27, 18, 17, 21, 'Ancient Blue Dragon',      '23' ],
  // [ 25, 10, 23, 16, 15, 19, 'Adult Blue Dragon',        '16' ], // (same as Adult Blue Dracolich)
  [ 21, 10, 19, 14, 13, 17, 'Young Blue Dragon',        '9' ],
  [ 17, 10, 15, 12, 11, 15, 'Blue Dragon Wyrmling',     '3' ],
  // [ 27, 12, 25, 20, 17, 19, 'Ancient Green Dragon',     '22' ], // (same as Ancient Copper Dragon)
  // [ 23, 12, 21, 18, 15, 17, 'Adult Green Dragon',       '15' ], // (same as Adult Copper Dragon)
  // [ 19, 12, 17, 16, 13, 15, 'Young Green Dragon',       '8' ], // (same as Young Copper Dragon)
  // [ 15, 12, 13, 14, 11, 13, 'Green Dragon Wyrmling',    '2' ], // (same as Copper Dragon Wyrmling)
  [ 30, 10, 29, 18, 15, 23, 'Ancient Red Dragon',       '24' ],
  [ 27, 10, 25, 16, 13, 21, 'Adult Red Dragon',         '17' ],
  // [ 23, 10, 21, 14, 11, 19, 'Young Red Dragon',         '10' ], // (same as Young Red Shadow Dragon)
  [ 19, 10, 17, 12, 11, 15, 'Red Dragon Wyrmling',      '4' ],
  [ 26, 10, 26, 10, 13, 14, 'Ancient White Dragon',     '20' ],
  [ 22, 10, 22,  8, 12, 12, 'Adult White Dragon',       '13' ],
  [ 18, 10, 18,  6, 11, 12, 'Young White Dragon',       '6' ],
  [ 14, 10, 14,  5, 10, 11, 'White Dragon Wyrmling',    '2' ],
  [ 27, 10, 25, 16, 15, 19, 'Ancient Brass Dragon',     '20' ],
  [ 23, 10, 21, 14, 13, 17, 'Adult Brass Dragon',       '13' ],
  // [ 19, 10, 17, 12, 11, 15, 'Young Brass Dragon',       '6' ], // (same as Red Dragon Wyrmling)
  [ 15, 10, 13, 10, 11, 13, 'Brass Dragon Wyrmling',    '1' ],
  // [ 29, 10, 27, 18, 17, 21, 'Ancient Bronze Dragon',    '22' ], // (same as Ancient Blue Dragon)
  // [ 25, 10, 23, 16, 15, 19, 'Adult Bronze Dragon',      '15' ], // (same as Adult Blue Dracolich)
  // [ 21, 10, 19, 14, 13, 17, 'Young Bronze Dragon',      '8' ], // (same as Young Blue Dragon)
  // [ 17, 10, 15, 12, 11, 15, 'Bronze Dragon Wyrmling',   '2' ], // (same as Blue Dragon Wyrmling)
  [ 27, 12, 25, 20, 17, 19, 'Ancient Copper Dragon',    '21' ],
  [ 23, 12, 21, 18, 15, 17, 'Adult Copper Dragon',      '14' ],
  [ 19, 12, 17, 16, 13, 15, 'Young Copper Dragon',      '7' ],
  [ 15, 12, 13, 14, 11, 13, 'Copper Dragon Wyrmling',   '1' ],
  [ 30, 14, 29, 18, 17, 28, 'Ancient Gold Dragon',      '24' ],
  [ 27, 14, 25, 16, 15, 24, 'Adult Gold Dragon',        '17' ],
  [ 23, 14, 21, 16, 13, 20, 'Young Gold Dragon',        '10' ],
  [ 19, 14, 17, 14, 11, 16, 'Gold Dragon Wyrmling',     '3' ],
  // [ 30, 10, 29, 18, 15, 23, 'Ancient Silver Dragon',    '23' ], // (same as Ancient Red Dragon)
  // [ 27, 10, 25, 16, 13, 21, 'Adult Silver Dragon',      '16' ], // (same as Adult Red Dragon)
  // [ 23, 10, 21, 14, 11, 19, 'Young Silver Dragon',      '9' ], // (same as Young Red Shadow Dragon)
  // [ 19, 10, 17, 12, 11, 15, 'Silver Dragon Wyrmling',   '2' ], // (same as Red Dragon Wyrmling)
  [ 25, 10, 20, 10, 12, 12, 'Dragon Turtle',            '17' ],
  [ 16, 16, 18, 13, 14, 12, 'Drider',                   '6' ],
  [ 10, 12, 11, 14, 15, 18, 'Dryad',                    '1' ],
  [ 14, 11, 14, 11, 10,  9, 'Duergar',                  '1' ],
  [ 14, 20, 14,  6, 10,  6, 'Air Elemental',            '5' ],
  [ 20,  8, 20,  5, 10,  5, 'Earth Elemental',          '5' ],
  [ 10, 17, 16,  6, 10,  7, 'Fire Elemental',           '5' ],
  [ 18, 14, 18,  5, 10,  8, 'Water Elemental',          '5' ],
  [ 10, 14, 10, 11, 11, 12, 'Drow',                     '1/4' ],
  [ 13, 18, 14, 11, 13, 12, 'Drow Elite Warrior',       '5' ],
  [  9, 14, 10, 17, 13, 12, 'Drow Mage',                '7' ],
  [ 10, 14, 12, 13, 17, 18, 'Drow Priestess of Lolth',  '8' ],
  [ 30, 21, 30, 21, 22, 27, 'Empyrean',                 '23' ],
  [ 14, 15, 13,  7, 12,  8, 'Ettercap',                 '2' ],
  [ 21,  8, 17,  6, 10,  8, 'Ettin',                    '4' ],
  [  3, 20, 13, 14, 12, 16, 'Faerie Dragon',            '1-2' ],
  [  1, 17, 14, 16, 10, 11, 'Flameskull',               '4' ],
  [  6, 15, 10, 14, 14, 11, 'Flumpth',                  '1/8' ],
  [ 23, 10, 23,  9, 14,  6, 'Fomorian',                 '8' ],
  [  5,  1,  3,  1,  1,  1, 'Gas Spore',                '1/2' ],
  [  1,  1, 10,  1,  3,  1, 'Shrieker',                 '0' ],
  [  3,  1, 10,  1,  3,  1, 'Violet Fungus',            '1/4' ],
  [ 20, 14, 20, 11, 12, 11, 'Galeb Duhr',               '6' ],
  [ 15, 11, 16,  6, 11,  7, 'Gargoyle',                 '2' ],
  [ 23, 12, 24, 12, 13, 14, 'Dao',                      '11' ],
  [ 21, 15, 22, 15, 16, 21, 'Djinni',                   '11' ],
  [ 22, 12, 24, 16, 15, 16, 'Efreeti',                  '11' ],
  [ 22, 12, 26, 18, 17, 18, 'Marid',                    '11' ],
  [  7, 13, 10, 10, 12, 17, 'Ghost',                    '4' ],
  [ 16, 17, 10, 11, 10,  8, 'Ghast',                    '2' ],
  [ 13, 15, 10,  7, 10,  6, 'Ghoul',                    '1' ],
  [ 27, 10, 22, 12, 16, 16, 'Cloud Giant',              '9' ],
  [ 25,  9, 23, 10, 14, 13, 'Fire Giant',               '9' ],
  [ 23,  9, 21,  9, 10, 12, 'Frost Gian',               '8' ],
  [ 21,  8, 19,  5,  9,  6, 'Hill Giant',               '5' ],
  [ 23, 15, 20, 10, 12,  9, 'Stone Giant',              '7' ],
  [ 29, 14, 20, 16, 18, 18, 'Storm Giant',              '13' ],
  [ 10,  8, 16,  9, 10,  6, 'Gibbering Mouther',        '2' ],
  [ 15, 14, 12, 13, 13, 10, 'Githyanki Warrior',        '3' ],
  [ 16, 14, 15, 14, 14, 15, 'Githyanki Knight',         '8' ],
  [ 12, 15, 12, 13, 14, 10, 'Githzerai Monk',           '2' ],
  [ 13, 18, 15, 16, 17, 12, 'Githzerai Zerth',          '6' ],
  [ 14, 12, 11,  6, 10,  7, 'Gnoll',                    '1/2' ],
  [ 16, 14, 13,  8, 11,  9, 'Gnoll Pack Lord',          '2' ],
  [ 17, 15, 15, 10, 11, 13, 'Gnoll Fang of Yeenoghu',   '4' ],
  [ 15, 14, 14, 12, 10,  9, 'Deep Gnome (Svirfneblin)', '1/2' ],
  [  8, 14, 10, 10,  8,  8, 'Goblin',                   '1/4' ],
  [ 10, 14, 10, 10,  8, 10, 'Goblin Boss',              '1' ],
  [ 20,  9, 18,  3,  8,  1, 'Clay Golem',               '9' ],
  [ 19,  9, 18,  6, 10,  5, 'Flesh Golem',              '5' ],
  [ 24,  9, 20,  3, 11,  1, 'Iron Golem',               '16' ],
  [ 22,  9, 20,  3, 11,  1, 'Stone Golem',              '10' ],
  [ 20, 11, 18,  2, 12,  7, 'Gorgon',                   '5' ],
  [ 15, 14, 13, 12, 11,  9, 'Grell',                    '3' ],
  [ 14, 14, 11,  3, 14,  5, 'Grick',                    '2' ],
  [ 18, 16, 15,  4, 14,  9, 'Grick Alpha',              '7' ],
  [ 18, 15, 16,  2, 13,  8, 'Griffon',                  '2' ],
  [ 16, 12, 12,  9,  8,  6, 'Grimlock',                 '1/4' ],
  [ 18, 12, 16, 13, 14, 14, 'Green Hag',                '3' ],
  [ 18, 15, 16, 16, 14, 16, 'Night Hag',                '5' ],
  [ 16, 13, 16, 12, 12, 13, 'Sea Hag',                  '2' ],
  [ 16, 13, 14, 10, 11, 10, 'Half-Red Dragon Veteran',  '5' ],
  [ 12, 13, 12,  7, 10, 13, 'Harpy',                    '1' ],
  [ 17, 12, 14,  6, 13,  6, 'Hell Hound',               '3' ],
  [ 18, 13, 16, 10, 10, 10, 'Helmed Horror',            '4' ],
  [ 17, 13, 13,  2, 12,  8, 'Hippogriff',               '1' ],
  [ 13, 12, 12, 10, 10,  9, 'Hobgoblin',                '1/2' ],
  [ 15, 14, 14, 12, 10, 13, 'Hobgoblin Captain',        '3' ],
  [ 16, 14, 16, 14, 11, 15, 'Hobgoblin Warlord',        '6' ],
  [  4, 15, 11, 10, 10,  7, 'Homunculus',               '0' ],
  [ 18, 10, 15,  6, 12,  7, 'Hook Horror',              '3' ],
  [ 20, 12, 20,  2, 10,  7, 'Hydra',                    '8' ],
  [  6, 14, 13, 12, 11, 10, 'Intellect Devourer',       '2' ],
  [ 16, 19, 14, 10, 15, 11, 'Invisible Stalker',        '6' ],
  [ 11, 15, 11, 13, 11, 10, 'Jackalwere',               '1/2' ],
  [ 10, 16, 10, 11, 10, 10, 'Kenku',                    '1/4' ],
  [  7, 15,  9,  8,  7,  8, 'Kobold',                   '1/8' ],
  [  7, 16,  9,  8,  7,  8, 'Winged Kobold',            '1/4' ],
  [ 30, 11, 25, 22, 18, 20, 'Kraken',                   '23' ],
  [ 13, 10, 11, 11, 10,  8, 'Kuo-toa',                  '1/4' ],
  [ 16, 14, 16, 13, 16, 14, 'Kuo-toa Archpriest',       '6' ],
  [ 14, 10, 14, 12, 14, 11, 'Kuo-toa Whip',             '1' ],
  [ 16, 13, 15, 14, 15, 16, 'Lamia',                    '4' ],
  [ 11, 16, 16, 20, 14, 16, 'Lich',                     '21' ],
  [ 15, 10, 13,  7, 12,  7, 'Lizardfolk',               '1/2' ],
  [ 15, 10, 13, 10, 15,  8, 'Lizardfolk Shaman',        '2' ],
  [ 17, 12, 15, 11, 11, 15, 'Lizard King/Queen',        '4' ],
  [ 19, 10, 17, 11, 12, 12, 'Werebear',                 '5' ],
  [ 17, 10, 15, 10, 11,  8, 'Wereboar',                 '4' ],
  [ 10, 15, 12, 11, 10,  8, 'Wererat',                  '2' ],
  [ 17, 15, 16, 10, 13, 11, 'Weretiger',                '4' ],
  [ 15, 13, 14, 10, 11, 10, 'Werewolf',                 '3' ],
  [  7, 15, 12,  8, 11, 10, 'Magmin',                   '1/2' ],
  [ 17, 16, 17,  7, 12,  8, 'Manticore',                '3' ],
  [ 10, 15, 16, 12, 13, 15, 'Medusa',                   '6' ],
  [  5, 14, 10,  9, 11, 10, 'Dust Mephit',              '1/2' ],
  [  7, 13, 10,  9, 11, 12, 'Ice Mephit',               '1/2' ],
  [  8, 12, 12,  7, 10, 10, 'Magma Mephit',             '1/2' ],
  [  8, 12, 12,  9, 11,  7, 'Mud Mephit',               '1/4' ],
  [  6, 14, 12, 10, 10, 11, 'Smoke Mephit',             '1/4' ],
  [  5, 11, 10, 11, 10, 12, 'Steam Mephit',             '1/4' ],
  [ 10, 13, 12, 11, 11, 12, 'Merfolk',                  '1/8' ],
  [ 18, 10, 15,  8, 10,  9, 'Merrow',                   '2' ],
  [ 17, 12, 15,  5, 13,  8, 'Mimic',                    '2' ],
  [ 11, 12, 12, 19, 17, 17, 'Mind Flayer',              '7' ],
  [ 18, 11, 16,  6, 16,  9, 'Minotaur',                 '3' ],
  [ 10, 13, 12,  4, 10,  5, 'Monodrone',                '1/8' ],
  [ 11, 13, 12,  6, 10,  7, 'Duodrone',                 '1/4' ],
  [ 12, 13, 12,  9, 10,  9, 'Tridrone',                 '1/2' ],
  [ 12, 14, 12, 10, 10, 11, 'Quadrone',                 '1' ],
  [ 15, 14, 12, 10, 10, 13, 'Pentadrone',               '2' ],
  [ 16,  8, 15,  6, 10, 12, 'Mummy',                    '3' ],
  [ 18, 10, 17, 11, 18, 16, 'Mummy Lord',               '15' ],
  [  8, 10, 10,  8, 11,  5, 'Myconid Sprout',           '0' ],
  [ 17, 12, 16,  2,  6,  1, 'Quaggoth Spore Servant',   '1' ],
  [ 10, 10, 12, 10, 13,  7, 'Myconid Adult',            '1/2' ],
  [ 12, 10, 14, 13, 15, 10, 'Myconid Sovereign',        '2' ],
  [ 15, 16, 12, 15, 15, 16, 'Bone Naga',                '4' ],
  [ 18, 17, 14, 16, 15, 16, 'Spirit Naga',              '8' ],
  [ 19, 18, 16, 16, 19, 18, 'Guardian Naga',            '10' ],
  [ 18, 15, 16, 10, 13, 15, 'Nightmare',                '3' ],
  [ 14, 16, 16, 13, 10,  8, 'Nothic',                   '2' ],
  [ 19,  8, 16,  5,  7,  7, 'Ogre',                     '2' ],
  [ 17, 10, 14,  7,  9, 10, 'Half-Ogre',                '1' ],
  [ 19, 11, 16, 14, 12, 15, 'Oni',                      '7' ],
  [ 16,  5, 16,  1,  6,  1, 'Black Pudding',            '4' ],
  [ 14,  3, 20,  1,  6,  1, 'Gelatinous Cube',          '2' ],
  [ 12,  6, 16,  1,  6,  2, 'Gray Ooze',                '1/2' ],
  [ 15,  6, 14,  2,  6,  1, 'Ochre Jelly',              '2' ],
  [ 16, 12, 16,  7, 11, 10, 'Orc',                      '1/2' ],
  [ 18, 12, 18, 11, 11, 16, 'Orc War Chief',            '4' ],
  [ 16, 12, 16,  9, 13, 12, 'Orc Eye of Gruumsh',       '2' ],
  [ 18, 12, 18, 12, 11, 12, 'Orog',                     '2' ],
  [ 16, 11, 19,  6, 13,  6, 'Otyugh',                   '5' ],
  [ 20, 12, 17,  3, 12,  7, 'Owlbear',                  '3' ],
  [ 18, 15, 16, 10, 15, 13, 'Pegasus',                  '2' ],
  [ 16, 12, 13,  9, 12, 10, 'Peryton',                  '2' ],
  [ 10, 13, 16,  1,  7,  3, 'Piercer',                  '1/2' ],
  [  2, 20,  8, 10, 14, 15, 'Pixie',                    '1/4' ],
  [  6, 15, 13, 10, 12, 10, 'Pseudodragon',             '1/4' ],
  [ 28,  7, 22,  1,  8,  4, 'Purple Worm',              '15' ],
  [ 17, 12, 16,  6, 12,  7, 'Quaggoth',                 '2' ],
  [ 14, 17, 18, 13, 16, 20, 'Rakshasa',                 '13' ],
  [ 24, 13, 21,  4, 10,  5, 'Remorhaz',                 '11' ],
  [ 18, 13, 17,  3, 10,  4, 'Young Remorhaz',           '5' ],
  [ 18, 14, 18, 13, 16, 18, 'Revenant',                 '5' ],
  [ 28, 10, 20,  3, 10,  9, 'Roc',                      '11' ],
  [ 18,  8, 17,  7, 16,  6, 'Roper',                    '5' ],
  [ 13, 12, 13,  2, 13,  6, 'Rust Monster',             '1/2' ],
  [ 13, 11, 12, 12, 13,  9, 'Sahuagin',                 '1/2' ],
  [ 13, 11, 12, 12, 14, 13, 'Sahuagin Priestess',       '2' ],
  [ 19, 15, 16, 14, 13, 17, 'Sahuagin Baron',           '5' ],
  [ 12, 14, 11,  7, 10,  8, 'Fire Snake',               '1' ],
  [ 18, 14, 15, 11, 10, 12, 'Salamander',               '5' ],
  [ 12, 16, 11, 12, 10, 14, 'Satyr',                    '1/2' ],
  [ 11, 13, 11, 10, 10, 13, 'Scarecrow',                '1' ],
  [  6, 14, 13,  6, 10,  8, 'Shadow',                   '1/2' ],
  [ 18,  8, 16,  5, 10,  5, 'Shambling Mound',          '5' ],
  [ 18,  8, 18,  7, 10,  3, 'Shield Guardian',          '7' ],
  [ 10, 14, 15,  6,  8,  5, 'Skeleton',                 '1/4' ],
  [ 18, 11, 15,  6,  8,  5, 'Minotaur Skeleton',        '2' ],
  [ 18, 12, 15,  2,  8,  5, 'Warhorse Skeleton',        '1/2' ],
  [  7, 15, 10,  3,  5,  3, 'Slaad Tadpole',            '1/8' ],
  [ 16, 12, 16,  6,  6,  7, 'Red Slaad',                '5' ],
  [ 20, 15, 18,  7,  7,  9, 'Blue Slaad',               '7' ],
  [ 18, 15, 16, 11,  8, 12, 'Green Slaad',              '8' ],
  [ 17, 17, 16, 13,  8, 14, 'Gray Slaad',               '9' ],
  [ 20, 15, 19, 15, 10, 16, 'Death Slaad',              '10' ],
  [  1, 14, 11, 10, 10, 11, 'Specter',                  '1' ],
  [ 22, 10, 20, 16, 18, 23, 'Androsphinx',              '17' ],
  [ 18, 15, 16, 18, 18, 18, 'Gynosphinx',               '11' ],
  [  3, 18, 10, 14, 13, 11, 'Sprite',                   '1/4' ],
  [  4, 16, 11,  2,  8,  6, 'Stirge',                   '1/8' ],
  [  8, 17, 13, 15, 12, 20, 'Succubus/Incubus',         '4' ],
  [ 30, 11, 30,  3, 11, 11, 'Tarrasque',                '30' ],
  [ 12, 15, 13,  8, 12,  7, 'Thri-kreen',               '1' ],
  [ 23,  8, 21, 12, 16, 12, 'Treant',                   '9' ],
  [ 14, 10, 14,  6, 10,  6, 'Troglodyte',               '1/4' ],
  [ 18, 13, 20,  7,  9,  7, 'Troll',                    '5' ],
  [ 20, 13, 16,  9, 10, 10, 'Umber Hulk',               '5' ],
  [ 18, 14, 15, 11, 17, 16, 'Unicorn',                  '5' ],
  [ 18, 18, 18, 17, 15, 18, 'Vampire',                  '13' ],
  [ 16, 16, 16, 11, 10, 12, 'Vampire Spawn',            '5' ],
  [ 17, 16, 13, 11, 10, 10, 'Water Weird',              '3' ],
  [ 15, 14, 16, 10, 13, 15, 'Wight',                    '3' ],
  [  1, 28, 10, 13, 14, 11, 'Will-o\'-Wisp',            '2' ],
  [  6, 16, 16, 12, 14, 15, 'Wraith',                   '5' ],
  [ 19, 10, 16,  5, 12,  6, 'Wyvery',                   '6' ],
  [ 17, 10, 22, 11, 10, 11, 'Xorn',                     '5' ],
  [ 18, 13, 16,  8, 12,  7, 'Yeti',                     '3' ],
  [ 24, 10, 22,  9, 13,  9, 'Abominable Yeti',          '9' ],
  [ 19, 16, 17, 17, 15, 18, 'Yuan-ti Abomination',      '7' ],
  [ 16, 14, 13, 14, 12, 16, 'Yuan-ti Malison',          '3' ],
  [ 11, 12, 11, 13, 12, 14, 'Yuan-ti Pureblood',        '1' ],
  [ 17, 12, 14, 20, 16, 17, 'Arcanaloth',               '12' ],
  [ 18, 11, 16,  7, 10, 11, 'Mezzoloth',                '5' ],
  [ 20, 11, 19, 12, 10, 15, 'Nycaloth',                 '9' ],
  [ 16, 16, 18, 18, 15, 19, 'Ultroloth',                '13' ],
  [ 13,  6, 16,  3,  6,  5, 'Zombie',                   '1/4' ],
  [ 19,  6, 18,  3,  6,  5, 'Ogre Zombie',              '2' ],
  [ 10,  8, 16,  3,  8,  5, 'Beholder Zombie',          '5' ],
  [ 16, 14, 14,  6, 12,  7, 'Ape',                      '1/2' ],
  [  3,  8, 11, 10, 10,  6, 'Awakened Shrub',           '0' ],
  [ 19,  6, 15, 10, 10,  7, 'Awakened Tree',            '2' ],
  [ 14, 12, 12,  2, 10,  5, 'Axe Beak',                 '1/4' ],
  [  8, 14, 11,  4, 12,  6, 'Baboon',                   '0' ],
  [  4, 11, 12,  2, 12,  5, 'Badger',                   '0' ],
  [  2, 15,  8,  2, 12,  4, 'Bat',                      '0' ],
  [ 15, 10, 14,  2, 12,  7, 'Black Bear',               '1/2' ],
  [ 12, 17, 12, 10, 13, 11, 'Blink Dog',                '1/4' ],
  [  6, 14, 10,  3, 14,  5, 'Blood Hawk',               '1/8' ],
  [ 13, 11, 12,  2,  9,  5, 'Boar',                     '1/4' ],
  [ 19, 10, 16,  2, 13,  7, 'Brown Bear',               '1' ],
  [ 16,  8, 14,  2,  8,  5, 'Camel',                    '1/8' ],
  [  3, 15, 10,  3, 12,  7, 'Cat',                      '0' ],
  [ 15, 14, 12,  1, 10,  3, 'Constrictor Snake',        '1/4' ],
  [  2, 11, 10,  1,  8,  2, 'Crab',                     '0' ],
  [ 15, 10, 13,  2, 10,  5, 'Crocodile',                '1/2' ],
  [ 15, 14, 14,  3, 13,  6, 'Death Dog',                '1' ],
  [ 11, 16, 11,  2, 14,  5, 'Deer',                     '0' ],
  [ 17, 15, 15,  3, 12,  7, 'Dire Wolf',                '1' ],
  [ 18, 10, 12,  2, 11,  7, 'Draft Horse',              '1/4' ],
  [  6, 15, 10,  2, 14,  7, 'Eagle',                    '0' ],
  [ 22,  9, 17,  3, 11,  6, 'Elephant',                 '4' ],
  [ 16, 10, 12,  2, 10,  6, 'Elk',                      '1/4' ],
  [  4, 18, 11,  2, 12,  5, 'Flying Snake',             '1/8' ],
  [  1, 13,  8,  1,  8,  3, 'Frog',                     '0' ],
  [ 23, 14, 18,  7, 12,  7, 'Giant Ape',                '7' ],
  [ 13, 10, 15,  2, 12,  5, 'Giant Badger',             '1/4' ],
  [ 15, 16, 11,  2, 12,  6, 'Giant Bat',                '1/4' ],
  [ 17, 10, 16,  2,  7,  5, 'Giant Boar',               '2' ],
  [  5, 14, 12,  1,  7,  3, 'Giant Centipede',          '1/4' ],
  [ 19, 14, 12,  1, 10,  3, 'Giant Constrictor Snake',  '2' ],
  [ 13, 15, 11,  1,  9,  3, 'Giant Crab',               '1/8' ],
  [ 21,  9, 17,  2, 10,  7, 'Giant Crocodile',          '5' ],
  [ 16, 17, 13,  8, 14, 10, 'Giant Eagle',              '1' ],
  [ 19, 16, 14,  7, 14, 10, 'Giant Elk',                '2' ],
  [  8, 10, 12,  1,  7,  3, 'Giant Fire Beetle',        '0' ],
  [ 12, 13, 11,  2, 10,  3, 'Giant Frog',               '1/4' ],
  [ 17, 11, 12,  3, 12,  6, 'Giant Goat',               '1/2' ],
  [ 16, 14, 14,  2, 12,  7, 'Giant Hyena',              '1' ],
  [ 15, 12, 13,  2, 10,  5, 'Giant Lizard',             '1/4' ],
  [ 17, 13, 13,  4, 10,  4, 'Giant Octopus',            '1' ],
  [ 13, 15, 12,  8, 13, 10, 'Giant Owl',                '1/4' ],
  [ 10, 18, 13,  2, 10,  3, 'Giant Poisonous Snake',    '1/4' ],
  [  7, 15, 11,  2, 10,  4, 'Giant Rat',                '1/8' ],
  [ 15, 13, 15,  1,  9,  3, 'Giant Scorpion',           '3' ],
  [ 12, 15, 11,  2, 15,  5, 'Giant Sea Horse',          '1/2' ],
  [ 23, 11, 21,  1, 10,  5, 'Giant Shark',              '5' ],
  [ 14, 16, 12,  2, 11,  4, 'Giant Spider',             '1' ],
  [ 15, 13, 13,  2, 10,  3, 'Giant Toad',               '1' ],
  [ 15, 10, 15,  6, 12,  7, 'Giant Vulture',            '1' ],
  [ 10, 14, 10,  1, 10,  3, 'Giant Wasp',               '1/2' ],
  [  1, 16, 10,  4, 12,  5, 'Giant Weasel',             '1/8' ],
  [ 12, 16, 13,  3, 12,  4, 'Giant Wolf Spider',        '1/4' ],
  [ 12, 10, 11,  2, 10,  5, 'Goat',                     '0' ],
  [  5, 16,  8,  2, 14,  6, 'Hawk',                     '0' ],
  [ 18, 13, 15,  1, 10,  4, 'Hunter Shark',             '2' ],
  [ 11, 13, 12,  2, 12,  5, 'Hyena',                    '0' ],
  [  8, 15, 11,  3, 12,  6, 'Jackal',                   '0' ],
  [ 19, 10, 13,  3, 12,  7, 'Killer Whale',             '3' ],
  [ 17, 15, 13,  3, 12,  8, 'Lion',                     '1' ],
  [  2, 11, 10,  1,  8,  3, 'Lizard',                   '0' ],
  [ 24,  9, 21,  3, 11,  6, 'Mammoth',                  '6' ],
  [ 13, 14, 12,  3, 12,  7, 'Mastiff',                  '1/8' ],
  [ 14, 10, 13,  2, 10,  5, 'Mule',                     '1/8' ],
  [  4, 15, 11,  3, 10,  4, 'Octopus',                  '0' ],
  [  3, 13,  8,  2, 12,  7, 'Owl',                      '0' ],
  [ 14, 15, 10,  3, 14,  7, 'Panther',                  '1/4' ],
  [ 15, 15, 12,  6, 10,  6, 'Phase Spider',             '3' ],
  [  2, 16, 11,  1, 10,  3, 'Poisonous Snake',          '1/8' ],
  [ 20, 10, 16,  2, 13,  7, 'Polar Bear',               '2' ],
  [ 15, 10, 13,  2, 11,  7, 'Pony',                     '1/8' ],
  [  2, 16,  9,  1,  7,  2, 'Quipper',                  '0' ],
  [  2, 11,  9,  2, 10,  4, 'Rat',                      '0' ],
  [  2, 14,  8,  2, 12,  6, 'Raven',                    '0' ],
  [ 14, 13, 13,  1, 10,  4, 'Reef Shark',               '1/2' ],
  [ 21,  8, 15,  2, 12,  6, 'Rhinoceros',               '2' ],
  [ 16, 10, 12,  2, 10,  7, 'Riding Horse',             '1/4' ],
  [ 18, 14, 15,  3, 12,  8, 'Saber-Toothed Tiger',      '2' ],
  [  2, 11,  8,  1,  8,  2, 'Scorpion',                 '0' ],
  [  1, 12,  8,  1, 10,  2, 'Sea Hose',                 '0' ],
  [  2, 14,  8,  1, 10,  2, 'Spider',                   '0' ],
  [  5, 15, 10,  2, 12,  4, 'Swarm of Bats',            '1/4' ],
  [  3, 13, 10,  1,  7,  1, 'Swarm of Insects',         '1/2' ],
  [  8, 18, 11,  1, 10,  3, 'Swarm of Poisonous Snakes','2' ],
  [ 13, 16,  9,  1,  7,  2, 'Swarm of Quippers',        '1' ],
  [  9, 11,  9,  2, 10,  3, 'Swarm of Rats',            '1/4' ],
  [  6, 14,  8,  3, 12,  6, 'Swarm of Ravens',          '1/4' ],
  [ 17, 15, 14,  3, 12,  8, 'Tiger',                    '1' ],
  [  7, 10, 13,  2, 12,  4, 'Vulture',                  '0' ],
  [ 18, 12, 13,  2, 12,  7, 'Warhorse',                 '1/2' ],
  [  3, 16,  8,  2, 12,  3, 'Weasel',                   '0' ],
  [ 18, 13, 14,  7, 12,  8, 'Winter Wolf',              '3' ],
  [ 12, 15, 12,  3, 12,  6, 'Wolf',                     '1/4' ],
  [ 16, 13, 13,  7, 11,  8, 'Worg',                     '1/2' ],
 ];// A randomised list of numbers: this is the order in which we'll pluck from the Beastiary
var Shuffle = [332, 339, 202, 230, 254, 178, 146, 57, 199, 302, 251, 139, 216, 313, 184, 219, 125, 345, 19, 173, 245, 227, 300, 340, 299, 31, 389, 291, 271, 330, 168, 100, 127, 234, 324, 308, 123, 370, 232, 8, 164, 92, 315, 58, 366, 289, 344, 195, 134, 281, 278, 301, 78, 33, 2, 55, 371, 4, 128, 236, 77, 47, 167, 95, 49, 288, 27, 111, 240, 335, 109, 215, 1, 5, 15, 359, 132, 22, 106, 266, 9, 131, 153, 137, 74, 39, 220, 241, 280, 89, 323, 65, 209, 387, 207, 42, 38, 97, 17, 322, 257, 103, 144, 372, 185, 239, 79, 223, 85, 285, 380, 60, 87, 172, 358, 353, 118, 166, 320, 101, 197, 43, 221, 3, 21, 214, 279, 226, 318, 99, 270, 155, 121, 37, 71, 350, 120, 11, 20, 93, 165, 342, 327, 204, 142, 102, 170, 253, 368, 124, 385, 16, 363, 296, 50, 295, 198, 341, 243, 80, 54, 35, 96, 105, 64, 337, 364, 107, 391, 225, 316, 247, 61, 282, 378, 390, 176, 362, 381, 88, 293, 108, 191, 183, 69, 116, 361, 18, 287, 331, 6, 377, 114, 0, 36, 29, 283, 374, 147, 149, 150, 110, 67, 188, 190, 34, 145, 217, 218, 161, 192, 383, 376, 148, 305, 284, 248, 122, 193, 355, 384, 275, 154, 90, 351, 356, 14, 235, 213, 75, 273, 228, 94, 174, 268, 256, 317, 163, 66, 367, 25, 211, 133, 112, 379, 264, 83, 347, 237, 52, 189, 222, 72, 272, 126, 349, 180, 365, 329, 130, 260, 7, 382, 12, 343, 307, 28, 44, 208, 62, 319, 309, 334, 333, 354, 91, 177, 312, 252, 238, 156, 360, 304, 30, 255, 242, 129, 141, 348, 200, 23, 352, 140, 10, 179, 26, 297, 294, 231, 203, 373, 328, 388, 311, 158, 346, 250, 160, 314, 169, 175, 210, 182, 41, 357, 201, 162, 45, 104, 386, 205, 138, 212, 48, 119, 276, 40, 70, 265, 261, 263, 187, 186, 258, 321, 59, 369, 325, 196, 244, 224, 249, 51, 113, 46, 306, 181, 246, 375, 338, 151, 143, 135, 53, 274, 336, 86, 298, 32, 68, 84, 292, 303, 82, 267, 310, 13, 152, 262, 269, 277, 290, 136, 24, 326, 206, 159, 157, 76, 259, 73, 171, 194, 81, 117, 115, 233, 229, 56, 63, 286, 98];const Epoch = new Date("2022-02-16T10:00:00.000+00:00");
const DayNumber = Math.ceil((new Date() - Epoch) / 86400000);
const Target = Beastiary[Shuffle[DayNumber % Shuffle.length]];
const HighestStat = Math.max(...Beastiary.map(b=>Math.max(...b.slice(0,6))));
const Characteristics = [
  [ 'STR', 'Strength' ],
  [ 'DEX', 'Dexterity' ],
  [ 'CON', 'Constitution' ],
  [ 'INT', 'Intelligence' ],
  [ 'WIS', 'Wisdom' ],
  [ 'CHA', 'Charisma' ],
];
const MaxGuesses = 8;
const GameLaunched = DayNumber > 0;
let firstRun = true;
let toastHider;
let SortedBeastiary = [...Beastiary];
let app;
SortedBeastiary.sort((a,b)=>a[6]>b[6]);

// Set up state storage
const State = new C.Store({
  data: {
    dayNumber: -1,
    hardMode: false,
    stats: {
      playedDays: [],
      winDays: [],
      streak: 0,
      maxStreak: 0,
      guesses: new Array(MaxGuesses).fill(0),
    },
  }
});
const loadedStorage = localStorage.getItem('dndle');
if(loadedStorage){
  State.data = JSON.parse(loadedStorage);
  firstRun = false;
}

// Save State to localStorage
function saveState(){
  localStorage.setItem('dndle', JSON.stringify(State.dataCopy));
}

// If it's a new day, reset board
if(State.data.dayNumber < DayNumber){
  State.data.dayNumber = DayNumber;
  State.data.guess = [];
  State.data.guessQuality = [];
  State.data.keyQuality = [];
  State.data.guessesMade = 0;
  State.data.entryColumn = 0;
  State.data.lastAction = '';
  State.data.gameOver = false;
  State.data.gameWon = false;
  saveState();
}

const board = new C('#board', {
  store: State,
  template: props=>{
    let boardRows = [];
    for(let i = 0; i < MaxGuesses; i++){
      let rowTiles = [];
      let monster = '';
      if(i < State.data.guessesMade) monster = ((Beastiary.find(b=>b.slice(0,6).join(',') == props.guess[i].join(','))) || [])[6] || '';
      for(let j = 0; j < Characteristics.length; j++) {
        const tileValue = (props.guess[i] || [])[j] || '';
        const tileState = (tileValue == '') ? 'tile-empty' : 'tile-filled';
        let tileAnim = '';
        if ((props.lastAction == 'key-number') && (i == props.guessesMade) && j == (props.entryColumn - 1)) tileAnim = 'anim-blip';
        if ((props.lastAction == 'key-enter') && (i == props.guessesMade - 1) && (props.entryColumn == 0)) tileAnim = 'anim-flip';

        const guessQualityIndicator = (props.guessQuality[i] || [])[j] || 'untested';
        rowTiles.push(`<div class="tile ${tileAnim} ${tileState} guess-${guessQualityIndicator}">${tileValue}</div>`);
      }
      boardRows.push(`
        ${rowTiles.join('')}
        <div class="monster"><p>${monster}</p></div>
      `);
    }
    return `
      ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
      <div><!-- monster --></div>
      ${boardRows.join('')}
    `
  }
});

const keyboard = new C('#keyboard', {
  store: State,
  template: props=>{
    if(State.data.hardMode) return '';
    let keys = [];
    for(let i = 1; i <= HighestStat; i++) {
      const keyQualityIndicator = props.keyQuality[i] || 'untested';
      keys.push(`<button data-key="${i}" class="key key-${keyQualityIndicator}">${i}</button>`);
    }
    return `
      ${keys.join('')}
      <button class="key key-special" data-key="backspace" aria-label="Backspace">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path fill="var(--color-tone-1)" d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
        </svg>
      </button>
      <button class="key key-special" data-key="enter" aria-label="Enter">
        Enter
      </button>
    `;
  }
});

const monsterChooser = new C('#monster-chooser', {
  template: props=>{
    const monsterOptions = SortedBeastiary.map(b=>`<option value="${b.slice(0,6).join(',')}">${b[6]} (CR ${b[7]})</option>`);
    return `<select id="monster"><option value="">&hellip;or select a monster&hellip;</option>${monsterOptions.join('')}</select>`;
  }
});

const countdownTimer = new C('#monster-countdown-timer', {
  data: { timeToNext: '23:59:59' },
  template: props=>`
    ${props.timeToNext}
  `
});
// Update countdown timer now and every second
function updateCountdownTimer(){
  const nextMonsterAt = new Date(Epoch.valueOf() + (86400000 * DayNumber));
  const timeToNext = (nextMonsterAt - new Date()) / 1000;
  if(timeToNext < 0){
    countdownTimer.data.timeToNext = '<strong class="anim-vibrate">On the way!</strong>';
    State.data.gameOver = true;
    if(app){
      app.data.dialogStats = true;
      app.data.toast = '<strong style="font-size: 200%">A new monster is coming!</strong>';
    }
    setTimeout(()=>window.location.reload(), 4000);
    return;
  }
  const hours = Math.floor(timeToNext / 3600);
  const mins = Math.floor((timeToNext - (hours * 3600)) / 60);
  const secs = Math.floor(timeToNext % 60);
  countdownTimer.data.timeToNext = `${("0" + hours).substr(-2, 2)}:${("0" + mins).substr(-2, 2)}:${("0" + secs).substr(-2, 2)}`;
}
updateCountdownTimer();
setInterval(updateCountdownTimer, 1000);

app = new C('main', {
  data: {
    dialogHelp: false,
    dialogStats: false,
    dialogSettings: false,
    toast: null,
  },
  store: State,
  template: props=>{
    if(!GameLaunched) return('<p>Coming soon...</p>');
    const solutionState = State.data.gameWon ? `won in ${State.data.guessesMade}/${MaxGuesses} guesses` : 'lost';
    return `
      <div id="board">${board.html()}</div>
      <div id="keyboard">${keyboard.html()}</div>
      <div id="monster-chooser">${monsterChooser.html()}</div>
      <div id="solution" class="${props.gameOver ? 'shown' : 'hidden'}">
        <p id="solution-score">DNDle ${DayNumber} (${solutionState})</p>
        <p id="solution-name">${Target[6]} (<abbr title="Challenge Rating">CR</abbr> ${Target[7]})</p>
        <div class="example">
          ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
          <div class="tile tile-filled">${Target[0]}</div>
          <div class="tile tile-filled">${Target[1]}</div>
          <div class="tile tile-filled">${Target[2]}</div>
          <div class="tile tile-filled">${Target[3]}</div>
          <div class="tile tile-filled">${Target[4]}</div>
          <div class="tile tile-filled">${Target[5]}</div>
        </div>
      </div>
      <div id="overlay" class="${props.dialogHelp || props.dialogStats || props.dialogSettings ? 'shown' : 'hidden'}">
        <div role="dialog" class="dialog ${props.dialogHelp ? 'shown' : 'hidden'}" data-dialog="Help">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Help</h2>
          <p>Guess the D&amp;D (5e) monster in ${MaxGuesses} tries.</p>
          <p>
            Either enter a set of attributes
            (${Characteristics.map(c=>`<abbr title="${c[1]}">${c[0]}</abbr>`).join(', ')})
            <em>or</em> select a monster from the drop-down.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how close your guess was to the monster's characteristics.
          </p>
          <div class="examples">
            <h3>Example</h3>
            <div class="example">
              ${Characteristics.map(c=>`<abbr title="${c[1]}" class="char">${c[0]}</abbr>`).join('')}
              <div class="tile guess-correct">15</div>
              <div class="tile guess-absent">10</div>
              <div class="tile guess-present">12</div>
              <div class="tile guess-absent">12</div>
              <div class="tile guess-absent">14</div>
              <div class="tile guess-absent">15</div>
            </div>
            <ul>
              <li>This monster <abbr title="Strength">STR</abbr> <strong>15</strong>.</li>
              <li>This monster has a <strong>12</strong> but it's <em>not</em> <abbr title="Constitution">CON</abbr> nor <abbr title="Intelligence">INT</abbr>.</li>
              <li>This monster has no <strong>10</strong>, <strong>14</strong>, nor <strong>15</strong>.</li>
            </ul>
          </div>
          <p>
            <strong>A new monster will be available each day!</strong>
          </p>
        </div>

        <div role="dialog" class="dialog ${(props.dialogStats && !props.dialogHelp) ? 'shown' : 'hidden'}" data-dialog="Stats">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Statistics</h2>
          <div id="stats-content">
            <dl>
              <dt>Played</dt>
              <dd>${props.stats.playedDays.length}</dd>
              <dt>Win %</dt>
              <dd>${Math.round((props.stats.winDays.length / props.stats.playedDays.length || 0) * 100)}</dd>
              <dt>Current Streak</dt>
              <dd>${props.stats.streak}</dd>
              <dt>Max Streak</dt>
              <dd>${props.stats.maxStreak}</dd>
            </dl>
            <div id="monster-countdown">
              <h2>Next Monster</h2>
              <p id="monster-countdown-timer">
                ${countdownTimer.html()}
              </p>
            </div>
            <div id="share-wrapper" class="${props.gameOver ? 'shown' : 'hidden'}">
              <button id="share">
                Share
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#ffffff" d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <div role="dialog" class="dialog ${(props.dialogSettings && !props.dialogStats && !props.dialogHelp) ? 'shown' : 'hidden'}" data-dialog="Settings">
          <button class="close" aria-label="Close dialog">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="#000000" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
          </button>
          <h2>Settings</h2>
          <div class="setting">
            <div class="setting-description">
              <label for="setting-hard-mode">Hard mode</label>
              <p>No keyboard: you have to select a monster!</p>
            </div>
            <input type="checkbox" id="setting-hard-mode" data-setting="hardMode" @checked="${props.hardMode}">
          </div>
          <div class="setting">
            <div class="setting-description">
              <label>Why is this a thing?</label>
              <p>Read more about the history of DNDle.</p>
            </div>
            <a href="https://danq.me/dndle">Blog</a>
          </div>
          <div class="setting">
            <div class="setting-description">
              <label>Open source</label>
              <p>Make your own version about... I don't know: <em>Pokemon</em> or something.</p>
            </div>
            <a href="https://github.com/Dan-Q/dndle">GitHub</a>
          </div>
        </div>
      </div>
      <div id="toast" class="${props.toast ? 'shown' : 'hidden'}">${props.toast}</div>
    `
  }
});

document.getElementById('no-js-warning').remove();
app.render();

function handleGuess(currentState){
  const currentGuess = currentState.guess[currentState.guessesMade].map(i=>parseInt(i));
  const targetGuess = Target.slice(0, 6);
  let guessQuality = Array(Characteristics.length).fill('absent');
  // determine quality of guess - multi-pass to prevent e.g. marking something as "present" when it's also (later) "correct"
  // get "correct" answers
  for(let i = 0; i < Characteristics.length; i++){
    if(currentGuess[i] != targetGuess[i]) continue;
    guessQuality[i] = 'correct';
    currentState.keyQuality[currentGuess[i]] = 'correct';
    targetGuess[i] = null; // prevent it from showing up as a subsequent "present"
  }
  // get "present" answers
  for(let i = 0; i < Characteristics.length; i++){
    if(guessQuality[i] == 'correct') continue;
    const answerFoundAtPosition = targetGuess.indexOf(currentGuess[i]);
    if(answerFoundAtPosition == -1) continue;
    targetGuess[answerFoundAtPosition] = null; // prevent it from showing up as a subsequent "present"
    guessQuality[i] = 'present';
    if(currentState.keyQuality[currentGuess[i]] != 'correct') currentState.keyQuality[currentGuess[i]] = 'present';
  }
  // everything else is absent - mark the keyboard!
  for(let i = 0; i < Characteristics.length; i++){
    if(guessQuality[i] != 'absent') continue;
    if(!currentState.keyQuality[currentGuess[i]]) currentState.keyQuality[currentGuess[i]] = 'absent';
  }

  // update guess quality indicator
  currentState.guessQuality[currentState.guessesMade] = guessQuality;

  // count today as a "played" day
  if(!currentState.stats.playedDays.includes(DayNumber)) currentState.stats.playedDays.push(DayNumber);

  // if we've guessed correctly (or run out of guesses), update state and stats
  const guessedCorrectly = !(guessQuality.find(tile=>tile!='correct'));
  const outOfGuesses = (currentState.guessesMade + 1) >= MaxGuesses;
  if(guessedCorrectly || outOfGuesses) {
    currentState.gameOver = true;
    if(guessedCorrectly) {
      currentState.gameWon = true;
      currentState.stats.winDays.push(DayNumber);
      currentState.stats.streak += 1;
      currentState.stats.maxStreak = currentState.stats.streak;
    } else {
      currentState.stats.streak = 0;
    }
    setTimeout(()=>app.data.dialogStats=true, 800);
  }

  // move to next guess
  currentState.guessesMade += 1;
  currentState.entryColumn = 0;
}

function keyPressed(key){
  const currentState = State.dataCopy;
  if(currentState.guessesMade >= MaxGuesses) return;
  if(key == 'enter'){
    if(currentState.entryColumn < Characteristics.length) return;
    currentState.lastAction = 'key-enter';
    handleGuess(currentState);
  } else if(key == 'backspace') {
    if(currentState.entryColumn <= 0) return;
    currentState.lastAction = 'key-backspace';
    currentState.entryColumn -= 1;
    currentState.guess[currentState.guessesMade][currentState.entryColumn] = undefined;
  } else if(currentState.entryColumn < Characteristics.length) {
    currentState.lastAction = 'key-number';
    currentState.guess[currentState.guessesMade] = currentState.guess[currentState.guessesMade] || [];
    currentState.guess[currentState.guessesMade][currentState.entryColumn] = key;
    currentState.entryColumn += 1;
  }
  State.data = currentState;

  // save state
  saveState();
}

// Event handling:
// "key" pressed
document.getElementById('keyboard').addEventListener('click', e=>{
  if(State.data.gameOver) return;
  const button = e.target.closest('[data-key]');
  if(!button) return;
  const key = button.dataset.key;
  if(key) keyPressed(key);
}, { capture: true });

// Monster selected
document.getElementById('monster').addEventListener('change', e=>{
  const value = e.target.value.split(',');
  e.target.value = '';
  if(State.data.gameOver || (value == '')) return;
  State.data.guess[State.data.guessesMade] = value;
  State.data.entryColumn = Characteristics.length;
  // force-submit at this point to reduce the risk of somebody enumerating permutations
  keyPressed('enter');
});

// Header dialog button clicked
document.querySelector('header').addEventListener('click', e=>{
  const dialogButton = e.target.closest('[data-dialog]');
  if(!dialogButton) return;
  e.preventDefault();
  const dialogName = dialogButton.dataset.dialog;
  app.data[`dialog${dialogName}`] = true;
}, { capture: true });

// Dialogs and their buttons
document.querySelector('#overlay').addEventListener('click', e=>{
  // we have to hit a .close button or the overlay backdrop to close the dialog(s)
  const closeButton = e.target.closest('.close');
  if((e.target.id != 'overlay') && !closeButton) return;
  e.preventDefault();
  app.data.dialogHelp = app.data.dialogStats = app.data.dialogSettings = false;
  saveState();
}, { capture: true });

// Settings
document.querySelector('#overlay [data-dialog="Settings"]').addEventListener('click', e=>{
  if(!e.target.dataset.setting) return;
  e.preventDefault();
  State.data[e.target.dataset.setting] = !State.data[e.target.dataset.setting];
  saveState();
});

// Share button
document.querySelector('#share').addEventListener('click', e=>{
  const solutionState = State.data.gameWon ? `✨ ${State.data.guessesMade}/${MaxGuesses}` : '💀';
  const shareTitle = `DNDle ${DayNumber} ${solutionState}`;
  let shareBody = '';
  for(let i = 0; i < State.data.guessesMade; i++){
    shareBody += "\n";
    for(let j = 0; j < Characteristics.length; j++){
      if(State.data.guessQuality[i][j] == 'correct') {
        shareBody += "🟩";
      } else if(State.data.guessQuality[i][j] == 'present') {
        shareBody += "🟨";
      } else {
        shareBody += "⬜";
      }
    }
  }
  const shareFull = `${shareTitle}\n${shareBody}`;
  navigator.clipboard.writeText(shareFull);
  app.data.toast = 'Copied results to clipboard';
  clearTimeout(toastHider);
  toastHider = setTimeout(()=>app.data.toast=null, 3000);
});

// If today's over, show statistics
if(State.data.gameOver) setTimeout(()=>app.data.dialogStats=true, 800);

// If this is the first time visiting the site, show the help
if(firstRun) app.data.dialogHelp = true;

// Try to install the service worker
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}})();