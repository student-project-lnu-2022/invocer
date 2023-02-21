/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$9=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$6=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$8(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$6(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$3(t){return e$8({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$5=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$5(i,n){return o$5({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$7(e){return o$5({descriptor:r=>({async get(){var r;return await this.updateComplete,null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e)},enumerable:!0,configurable:!0})})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$6;const e$6=null!=(null===(n$6=window.HTMLSlotElement)||void 0===n$6?void 0:n$6.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));function l$6(n){const{slot:l,selector:t}=null!=n?n:{};return o$5({descriptor:o=>({get(){var o;const r="slot"+(l?`[name=${l}]`:":not([name])"),i=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(r),s=null!=i?e$6(i,n):[];return t?s.filter((o=>o.matches(t))):s},enumerable:!0,configurable:!0})})}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=window,e$5=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$5=Symbol(),n$5=new WeakMap;let o$4 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$5)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$5.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$5.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$4("string"==typeof t?t:t+"",void 0,s$5),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$4(n,t,s$5)},S$1=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$2.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$4;const e$4=window,r$1=e$4.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$3=e$4.reactiveElementPolyfillSupport,n$4={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$5={attribute:!0,type:String,converter:n$4,reflect:!1,hasChanged:a$2};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$5){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$5}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$5){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$4).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$4;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$3||o$3({ReactiveElement:d$1}),(null!==(s$4=e$4.reactiveElementVersions)&&void 0!==s$4?s$4:e$4.reactiveElementVersions=[]).push("1.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;const i$3=window,s$3=i$3.trustedTypes,e$3=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$3="?"+o$2,l$4=`<${n$3}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a$1=/-->/g,f$1=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a$1:void 0!==u[1]?d=f$1:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a$1||d===f$1?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$4:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$2+y):s+o$2+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$3?e$3.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$3)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)c.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$3?s$3.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i$3.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$1=i$3.litHtmlVersions)&&void 0!==t$1?t$1:i$3.litHtmlVersions=[]).push("2.6.1");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$3,o$1;let s$2 = class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}};s$2.finalized=!0,s$2._$litElement$=!0,null===(l$3=globalThis.litElementHydrateSupport)||void 0===l$3||l$3.call(globalThis,{LitElement:s$2});const n$2=globalThis.litElementPolyfillSupport;null==n$2||n$2({LitElement:s$2});(null!==(o$1=globalThis.litElementVersions)&&void 0!==o$1?o$1:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A component for elevation.
 */
class Elevation extends s$2 {
    constructor() {
        super(...arguments);
        /**
         * Whether or not the elevation level should display a shadow.
         */
        this.shadow = false;
        /**
         * Whether or not the elevation level should display a surface tint color.
         */
        this.surface = false;
    }
    render() {
        return y `
       <span class="surface"></span>
       <span class="shadow"></span>
     `;
    }
}
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Elevation.prototype, "shadow", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Elevation.prototype, "surface", void 0);

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$g = i$4 `:host{--_duration: var(--md-elevation-duration, 0s);--_easing: var(--md-elevation-easing, cubic-bezier(0.2, 0, 0, 1));--_level: var(--md-elevation-level, 0);--_shadow-color: var(--md-elevation-shadow-color, var(--md-sys-color-shadow, #000));--_surface-tint-color: var(--md-elevation-surface-tint-color, var(--md-sys-color-primary, #6750a4));border-radius:inherit;display:flex;position:relative}:host(:not([surface])) .surface,:host(:not([shadow])) .shadow{display:none}.surface,.shadow,.shadow::before,.shadow::after{border-radius:inherit;content:"";inset:0;position:absolute;transition-property:box-shadow,opacity;transition-duration:var(--_duration);transition-timing-function:var(--_easing)}.shadow::before{box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 3,1) + 2*clamp(0,var(--_level) - 4,1))) calc(1px*(2*clamp(0,var(--_level),1) + clamp(0,var(--_level) - 2,1) + clamp(0,var(--_level) - 4,1))) 0px var(--_shadow-color);opacity:.3}.shadow::after{opacity:.15;box-shadow:0px calc(1px*(clamp(0,var(--_level),1) + clamp(0,var(--_level) - 1,1) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(3*clamp(0,var(--_level),2) + 2*clamp(0,var(--_level) - 2,3))) calc(1px*(clamp(0,var(--_level),4) + 2*clamp(0,var(--_level) - 4,1))) var(--_shadow-color)}.surface{background:var(--_surface-tint-color);opacity:calc(clamp(0,var(--_level),.05) + clamp(0,var(--_level) - 1,.03) + clamp(0,var(--_level) - 2,.03) + clamp(0,var(--_level) - 3,.01) + clamp(0,var(--_level) - 4,.02))}/*# sourceMappingURL=elevation-styles.css.map */
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * The `<md-elevation>` custom element with default styles.
 *
 * Elevation is the relative distance between two surfaces along the z-axis.
 */
let MdElevation = class MdElevation extends Elevation {
};
MdElevation.styles = [styles$g];
MdElevation = __decorate([
    e$9('md-elevation')
], MdElevation);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$2=t=>(...e)=>({_$litDirective$:t,values:e});let i$2 = class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=e$2(class extends i$2{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.nt){this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.nt.add(t);return this.render(s)}const e=i.element.classList;this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t));}));for(const t in s){const i=!!s[t];i===this.nt.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.nt.add(t)):(e.remove(t),this.nt.delete(t)));}return x}});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary An accessible, themable ring designed to be shown on
 * `:focus-visible`.
 *
 * @description
 * An accessible, themable ring designed to be shown on focus-visible.
 * Focus ring is designed to be controlled by the `strong-focus` module in the
 * same package.
 *
 * In most cases, `visible` should be set to
 * `shouldShowStrongFocus()` on `focus` and `pointerdown` (see `pointerPress()`
 * documentation in the `strong-focus` module), and `false` on `blur`.
 */
class FocusRing extends s$2 {
    constructor() {
        super(...arguments);
        /**
         * Makes the focus ring visible.
         */
        this.visible = false;
    }
    render() {
        return y `<span class="md3-focus-ring ${o(this.getRenderClasses())}"></span>`;
    }
    getRenderClasses() {
        return {
            'md3-focus-ring--visible': this.visible,
        };
    }
}
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], FocusRing.prototype, "visible", void 0);

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$f = i$4 `:host{--_shape-start-start: var(--md-focus-ring-shape-start-start, 9999px);--_shape-start-end: var(--md-focus-ring-shape-start-end, 9999px);--_shape-end-end: var(--md-focus-ring-shape-end-end, 9999px);--_shape-end-start: var(--md-focus-ring-shape-end-start, 9999px);--_offset-vertical: var(--md-focus-ring-offset-vertical, 2px);--_offset-horizontal: var(--md-focus-ring-offset-horizontal, 2px);--_width: var(--md-focus-ring-width, 3px);--_color: var(--md-focus-ring-color, var(--md-sys-color-secondary, #625b71));pointer-events:none}.md3-focus-ring{display:none;position:absolute;box-sizing:border-box;border:var(--_width) solid var(--_color);border-start-start-radius:var(--_shape-start-start);border-start-end-radius:var(--_shape-start-end);border-end-start-radius:var(--_shape-end-start);border-end-end-radius:var(--_shape-end-end);inset:calc(-1*(var(--_offset-vertical) + var(--_width))) calc(-1*(var(--_offset-horizontal) + var(--_width)))}.md3-focus-ring--visible{display:block}/*# sourceMappingURL=focus-ring-styles.css.map */
`;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdFocusRing = class MdFocusRing extends FocusRing {
};
MdFocusRing.styles = [styles$f];
MdFocusRing = __decorate([
    e$9('md-focus-ring')
], MdFocusRing);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Easing functions to use for web animations.
 *
 * TODO(b/241113345): replace with tokens
 */
var Easing;
(function (Easing) {
    Easing["STANDARD"] = "cubic-bezier(0.2, 0, 0, 1)";
})(Easing || (Easing = {}));
/**
 * Creates an `AnimationSignal` that can be used to cancel a previous task.
 *
 * @example
 * class MyClass {
 *   private labelAnimationSignal = createAnimationSignal();
 *
 *   private async animateLabel() {
 *     // Start of the task. Previous tasks will be canceled.
 *     const signal = this.labelAnimationSignal.start();
 *
 *     // Do async work...
 *     if (signal.aborted) {
 *       // Use AbortSignal to check if a request was made to abort after some
 *       // asynchronous work.
 *       return;
 *     }
 *
 *     const animation = this.animate(...);
 *     // Add event listeners to be notified when the task should be canceled.
 *     signal.addEventListener('abort', () => {
 *       animation.cancel();
 *     });
 *
 *     animation.addEventListener('finish', () => {
 *       // Tell the signal that the current task is finished.
 *       this.labelAnimationSignal.finish();
 *     });
 *   }
 * }
 *
 * @return An `AnimationSignal`.
 */
function createAnimationSignal() {
    // The current animation's AbortController
    let animationAbortController = null;
    return {
        start() {
            // Tell the previous animation to cancel.
            animationAbortController?.abort();
            // Set up a new AbortController for the current animation.
            animationAbortController = new AbortController();
            // Provide the AbortSignal so that the caller can check aborted status
            // and add listeners.
            return animationAbortController.signal;
        },
        finish() {
            animationAbortController = null;
        },
    };
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const PRESS_GROW_MS = 450;
const MINIMUM_PRESS_MS = 225;
const INITIAL_ORIGIN_SCALE = 0.2;
const PADDING = 10;
const SOFT_EDGE_MINIMUM_SIZE = 75;
const SOFT_EDGE_CONTAINER_RATIO = 0.35;
const PRESS_PSEUDO = '::after';
const ANIMATION_FILL = 'forwards';
/** @soyCompatible */
class Ripple extends s$2 {
    constructor() {
        super(...arguments);
        // TODO(https://bugs.webkit.org/show_bug.cgi?id=247546)
        // Remove Safari workaround that requires reflecting `unbounded` so
        // it can be styled against.
        this.unbounded = false;
        this.disabled = false;
        this.hovered = false;
        this.focused = false;
        this.pressed = false;
        this.rippleSize = '';
        this.rippleScale = '';
        this.initialSize = 0;
        this.pressAnimationSignal = createAnimationSignal();
        this.growAnimation = null;
        this.delayedEndPressHandle = null;
    }
    /** @soyTemplate */
    render() {
        return y `<div class="md3-ripple-surface ${o(this.getRenderRippleClasses())}"></div>`;
    }
    /** @soyTemplate */
    getRenderRippleClasses() {
        return {
            'md3-ripple--hovered': this.hovered,
            'md3-ripple--focused': this.focused,
            'md3-ripple--pressed': this.pressed,
            'md3-ripple--unbounded': this.unbounded,
        };
    }
    update(changedProps) {
        if (changedProps.has('disabled') && this.disabled) {
            this.endHover();
            this.endFocus();
            this.endPress();
        }
        super.update(changedProps);
    }
    getDimensions() {
        return (this.parentElement ?? this).getBoundingClientRect();
    }
    determineRippleSize() {
        const { height, width } = this.getDimensions();
        const maxDim = Math.max(height, width);
        const softEdgeSize = Math.max(SOFT_EDGE_CONTAINER_RATIO * maxDim, SOFT_EDGE_MINIMUM_SIZE);
        let maxRadius = maxDim;
        let initialSize = Math.floor(maxDim * INITIAL_ORIGIN_SCALE);
        const hypotenuse = Math.sqrt(width ** 2 + height ** 2);
        maxRadius = hypotenuse + PADDING;
        // ensure `initialSize` is even for unbounded
        if (this.unbounded) {
            initialSize = initialSize - (initialSize % 2);
        }
        this.initialSize = initialSize;
        this.rippleScale = `${(maxRadius + softEdgeSize) / initialSize}`;
        this.rippleSize = `${this.initialSize}px`;
    }
    getNormalizedPointerEventCoords(pointerEvent) {
        const { scrollX, scrollY } = window;
        const { left, top } = this.getDimensions();
        const documentX = scrollX + left;
        const documentY = scrollY + top;
        const { pageX, pageY } = pointerEvent;
        return { x: pageX - documentX, y: pageY - documentY };
    }
    getTranslationCoordinates(positionEvent) {
        const { height, width } = this.getDimensions();
        // end in the center
        const endPoint = {
            x: (width - this.initialSize) / 2,
            y: (height - this.initialSize) / 2,
        };
        let startPoint;
        if (positionEvent instanceof PointerEvent) {
            startPoint = this.getNormalizedPointerEventCoords(positionEvent);
        }
        else {
            startPoint = {
                x: width / 2,
                y: height / 2,
            };
        }
        // center around start point
        startPoint = {
            x: startPoint.x - (this.initialSize / 2),
            y: startPoint.y - (this.initialSize / 2),
        };
        return { startPoint, endPoint };
    }
    startPressAnimation(positionEvent) {
        this.determineRippleSize();
        const { startPoint, endPoint } = this.getTranslationCoordinates(positionEvent);
        const translateStart = `${startPoint.x}px, ${startPoint.y}px`;
        const translateEnd = `${endPoint.x}px, ${endPoint.y}px`;
        const signal = this.pressAnimationSignal.start();
        const growAnimation = this.mdRoot.animate({
            top: [0, 0],
            left: [0, 0],
            height: [this.rippleSize, this.rippleSize],
            width: [this.rippleSize, this.rippleSize],
            transform: [
                `translate(${translateStart}) scale(1)`,
                `translate(${translateEnd}) scale(${this.rippleScale})`
            ],
        }, {
            pseudoElement: PRESS_PSEUDO,
            duration: PRESS_GROW_MS,
            easing: Easing.STANDARD,
            fill: ANIMATION_FILL
        });
        growAnimation.addEventListener('finish', () => {
            this.pressAnimationSignal.finish();
            this.growAnimation = null;
        });
        signal.addEventListener('abort', () => {
            growAnimation.cancel();
            this.growAnimation = null;
        });
        this.growAnimation = growAnimation;
    }
    /**
     * @deprecated Use beginHover
     */
    startHover(hoverEvent) {
        this.beginHover(hoverEvent);
    }
    beginHover(hoverEvent) {
        if (hoverEvent?.pointerType !== 'touch') {
            this.hovered = true;
        }
    }
    endHover() {
        this.hovered = false;
    }
    /**
     * @deprecated Use beginFocus
     */
    startFocus() {
        this.beginFocus();
    }
    beginFocus() {
        this.focused = true;
    }
    endFocus() {
        this.focused = false;
    }
    /**
     * @deprecated Use beginPress
     */
    startPress(positionEvent) {
        this.beginPress(positionEvent);
    }
    beginPress(positionEvent) {
        this.pressed = true;
        if (this.delayedEndPressHandle !== null) {
            clearTimeout(this.delayedEndPressHandle);
            this.delayedEndPressHandle = null;
        }
        this.startPressAnimation(positionEvent);
    }
    endPress() {
        const pressAnimationPlayState = this.growAnimation?.currentTime ?? Infinity;
        if (pressAnimationPlayState >= MINIMUM_PRESS_MS) {
            this.pressed = false;
        }
        else {
            this.delayedEndPressHandle = setTimeout(() => {
                this.pressed = false;
                this.delayedEndPressHandle = null;
            }, MINIMUM_PRESS_MS - pressAnimationPlayState);
        }
    }
}
__decorate([
    i$5('.md3-ripple-surface'),
    __metadata("design:type", HTMLElement)
], Ripple.prototype, "mdRoot", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Ripple.prototype, "unbounded", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Ripple.prototype, "disabled", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Ripple.prototype, "hovered", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Ripple.prototype, "focused", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Ripple.prototype, "pressed", void 0);

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$e = i$4 `:host{--_dragged-state-layer-opacity: var(--md-ripple-dragged-state-layer-opacity, 0.16);--_focus-state-layer-opacity: var(--md-ripple-focus-state-layer-opacity, 0.12);--_hover-state-layer-opacity: var(--md-ripple-hover-state-layer-opacity, 0.08);--_pressed-state-layer-opacity: var(--md-ripple-pressed-state-layer-opacity, 0.12);--_state-layer-shape: var(--md-ripple-state-layer-shape, 0px);--_focus-state-layer-color: var(--md-ripple-focus-state-layer-color, black);--_hover-state-layer-color: var(--md-ripple-hover-state-layer-color, black);--_pressed-state-layer-color: var(--md-ripple-pressed-state-layer-color, black);--_dragged-state-layer-color: var(--md-ripple-dragged-state-layer-color, black)}:host{display:flex}:host([disabled]){opacity:0}:host,.md3-ripple-surface{position:absolute;inset:0;pointer-events:none;overflow:hidden}.md3-ripple-surface{border-radius:var(--_state-layer-shape);outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.md3-ripple-surface::before,.md3-ripple-surface::after{position:absolute;opacity:0;pointer-events:none;content:""}.md3-ripple-surface::before{background-color:var(--_hover-state-layer-color);transition:opacity 15ms linear,background-color 15ms linear;inset:0}.md3-ripple-surface::after{background:radial-gradient(closest-side, var(--_pressed-state-layer-color) max(100% - 70px, 65%), transparent 100%);transition:opacity 375ms linear;transform-origin:center center}.md3-ripple--hovered::before{background-color:var(--_hover-state-layer-color);opacity:var(--_hover-state-layer-opacity)}.md3-ripple--focused::before{background-color:var(--_focus-state-layer-color);opacity:var(--_focus-state-layer-opacity);transition-duration:75ms}.md3-ripple--pressed::after{opacity:var(--_pressed-state-layer-opacity);transition-duration:105ms}.md3-ripple--unbounded,:host([unbounded]){--_state-layer-shape: var(--md-ripple-state-layer-shape, 9999px)}:host([unbounded]){border-radius:var(--_state-layer-shape)}.md3-ripple--unbounded{transform:scale(1)}@media screen and (forced-colors: active){:host{display:none}}/*# sourceMappingURL=ripple-styles.css.map */
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdRipple = class MdRipple extends Ripple {
};
MdRipple.styles = [styles$e];
MdRipple = __decorate([
    e$9('md-ripple')
], MdRipple);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function n$1(n,o,r){return n?o():null==r?void 0:r()}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Re-dispatches an event from the provided element.
 *
 * This function is useful for forwarding non-composed events, such as `change`
 * events.
 *
 * @example
 * class MyInput extends LitElement {
 *   render() {
 *     return html`<input @change=${this.redispatchEvent}>`;
 *   }
 *
 *   protected redispatchEvent(event: Event) {
 *     redispatchEvent(this, event);
 *   }
 * }
 *
 * @param element The element to dispatch the event from.
 * @param event The event to re-dispatch.
 * @return Whether or not the event was dispatched (if cancelable).
 */
function redispatchEvent(element, event) {
    // For bubbling events in SSR light DOM (or composed), stop their propagation
    // and dispatch the copy.
    if (event.bubbles && (!element.shadowRoot || event.composed)) {
        event.stopPropagation();
    }
    const copy = Reflect.construct(event.constructor, [event.type, event]);
    const dispatched = element.dispatchEvent(copy);
    if (!dispatched) {
        event.preventDefault();
    }
    return dispatched;
}
/**
 * Dispatches a click event to the given element that triggers a native action,
 * but is not composed and therefore is not seen outside the element.
 *
 * This is useful for responding to an external click event on the host element
 * that should trigger an internal action like a button click.
 *
 * Note, a helper is provided because setting this up correctly is a bit tricky.
 * In particular, calling `click` on an element creates a composed event, which
 * is not desirable, and a manually dispatched event must specifically be a
 * `MouseEvent` to trigger a native action.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
function dispatchActivationClick(element) {
    const event = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(event);
    return event;
}
/**
 * Returns true if the click event should trigger an activation behavior. The
 * behavior is defined by the element and is whatever it should do when
 * clicked.
 *
 * Typically when an element needs to handle a click, the click is generated
 * from within the element and an event listener within the element implements
 * the needed behavior; however, it's possible to fire a click directly
 * at the element that the element should handle. This method helps
 * distinguish these "external" clicks.
 *
 * An "external" click can be triggered in a number of ways: via a click
 * on an associated label for a form  associated element, calling
 * `element.click()`, or calling
 * `element.dispatchEvent(new MouseEvent('click', ...))`.
 *
 * Also works around Firefox issue
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1804576 by squelching
 * events for a microtask after called.
 *
 * @example
 * hostClickListener = (event: MouseEvent) {
 *   if (isActivationClick(event)) {
 *     this.dispatchActivationClick(this.buttonElement);
 *   }
 * }
 *
 */
function isActivationClick(event) {
    // Event must start at the event target.
    if (event.composedPath()[0] !== event.target) {
        return false;
    }
    // Target must not be disabled; this should only occur for a synthetically
    // dispatched click.
    if (event.target.disabled) {
        return false;
    }
    // This is an activation if the event should not be squelched.
    return !squelchEvent(event);
}
// TODO(https://bugzilla.mozilla.org/show_bug.cgi?id=1804576)
//  Remove when Firefox bug is addressed.
function squelchEvent(event) {
    const squelched = isSquelchingEvents;
    if (squelched) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
    squelchEventsForMicrotask();
    return squelched;
}
// Ignore events for one microtask only.
let isSquelchingEvents = false;
async function squelchEventsForMicrotask() {
    isSquelchingEvents = true;
    // Need to pause for just one microtask.
    // tslint:disable-next-line
    await null;
    isSquelchingEvents = false;
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A property decorator that helps proxy an aria attribute to an internal node.
 *
 * This decorator is only intended for use with ARIAMixin properties,
 * such as `ariaLabel`, to help with screen readers.
 *
 * This decorator will remove the host `aria-*` attribute at runtime and add it
 * to a `data-aria-*` attribute to avoid screenreader conflicts between the
 * host and internal node.
 *
 * `@ariaProperty` decorated properties should sync with LitElement to the
 * `data-aria-*` attribute, not the native `aria-*` attribute.
 *
 * @example
 * ```ts
 * class MyElement extends LitElement {
 *   \@ariaProperty
 *   // TODO(b/210730484): replace with @soyParam annotation
 *   \@property({ type: String, attribute: 'data-aria-label', noAccessor: true})
 *   ariaLabel!: string;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function ariaProperty(prototype, property) {
    // Replace the ARIAMixin property with data-* attribute syncing instead of
    // using the native aria-* attribute reflection. This preserves the attribute
    // for SSR and avoids screenreader conflicts after delegating the attribute
    // to a child node.
    Object.defineProperty(prototype, property, {
        configurable: true,
        enumerable: true,
        get() {
            return this.dataset[property] ?? '';
        },
        set(value) {
            // Coerce non-string values to a string
            const strValue = String(value ?? '');
            if (strValue) {
                this.dataset[property] = strValue;
            }
            else {
                delete this.dataset[property];
            }
            // lit will call this setter whenever the data-* attribute changes.
            // However, this.dataset[property] will automatically be updated to the
            // current value. To avoid bugs, always request an update regardless of
            // the old value.
            this.requestUpdate();
        }
    });
    // Define an internal property that syncs from the `aria-*` attribute with lit
    // and delegates to the real ARIAMixin property, which renders an update.
    // This property will immediately remove the `aria-*` attribute, which doesn't
    // work well with SSR (which is why there's a separate synced property).
    const internalAriaProperty = Symbol(property);
    // "ariaLabel" -> "aria-label" / "ariaLabelledBy" -> "aria-labelledby"
    const ariaAttribute = property.replace('aria', 'aria-').toLowerCase();
    const constructor = prototype.constructor;
    let removingAttribute = false;
    Object.defineProperty(prototype, internalAriaProperty, {
        get() {
            // tslint is failing here, but the types are correct (ARIAMixin
            // properties do not obfuscate with closure)
            // tslint:disable-next-line:no-dict-access-on-struct-type
            return this[property];
        },
        set(value) {
            if (removingAttribute) {
                // Ignore this update, which is triggered below
                return;
            }
            // Set the ARIAMixin property, which will sync the `data-*` attribute
            // and trigger rendering if the value changed.
            // tslint is failing here, but the types are correct (ARIAMixin
            // properties do not obfuscate with closure)
            // tslint:disable-next-line:no-dict-access-on-struct-type
            this[property] = value;
            // Remove the `aria-*` attribute, which will call this setter again with
            // the incorrect value. Ignore these updates.
            removingAttribute = true;
            this.removeAttribute(ariaAttribute);
            removingAttribute = false;
        }
    });
    // Tell lit to observe the `aria-*` attribute and set the internal property,
    // which acts as a "aria-* attribute changed" observer.
    constructor.createProperty(internalAriaProperty, {
        attribute: ariaAttribute,
        noAccessor: true,
    });
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class FocusGlobal {
    constructor() {
        this.visible = false;
    }
    setVisible(visible) {
        this.visible = visible;
    }
}
/**
 * This object can be overwritten by the `setup()` function to use a different
 * focus coordination object.
 */
let focusObject = new FocusGlobal();
/**
 * Set of keyboard event codes that correspond to keyboard navigation
 */
const KEYBOARD_NAVIGATION_KEYS = new Set(['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']);
function keydownHandler(e) {
    if (KEYBOARD_NAVIGATION_KEYS.has(e.key)) {
        focusObject.setVisible(true);
    }
}
/**
 * Set up integration with alternate global focus tracking object
 *
 * @param focusGlobal A global focus object to coordinate between multiple
 *     systems
 * @param enableKeydownHandler Set to true to let StrongFocusService listen for
 *     keyboard navigation
 */
function setup(focusGlobal, enableKeydownHandler = false) {
    focusObject = focusGlobal;
    if (enableKeydownHandler) {
        window.addEventListener('keydown', keydownHandler);
    }
    else {
        window.removeEventListener('keydown', keydownHandler);
    }
}
/**
 * Returns `true` if the component should show strong focus.
 *
 * By default, strong focus is shown only on keyboard navigation, and not on
 * pointer interaction.
 */
function shouldShowStrongFocus() {
    return focusObject.visible;
}
/**
 * Components should call this when a user interacts with a component with a
 * pointing device.
 *
 * By default, this will prevent the strong focus from being shown.
 */
function pointerPress() {
    focusObject.setVisible(false);
}
setup(focusObject, true);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Delay reacting to touch so that we do not show the ripple for a swipe or
 * scroll interaction.
 */
const TOUCH_DELAY_MS$1 = 150;
/**
 * Interaction states for the ripple.
 *
 * On Touch:
 *  - `INACTIVE -> TOUCH_DELAY -> WAITING_FOR_CLICK -> INACTIVE`
 *  - `INACTIVE -> TOUCH_DELAY -> HOLDING -> WAITING_FOR_CLICK -> INACTIVE`
 *
 * On Mouse or Pen:
 *   - `INACTIVE -> WAITING_FOR_CLICK -> INACTIVE`
 */
var State;
(function (State) {
    /**
     * Initial state of the control, no touch in progress.
     *
     * Transitions:
     *   - on touch down: transition to `TOUCH_DELAY`.
     *   - on mouse down: transition to `WAITING_FOR_CLICK`.
     */
    State[State["INACTIVE"] = 0] = "INACTIVE";
    /**
     * Touch down has been received, waiting to determine if it's a swipe or
     * scroll.
     *
     * Transitions:
     *   - on touch up: beginPress(); transition to `WAITING_FOR_CLICK`.
     *   - on cancel: transition to `INACTIVE`.
     *   - after `TOUCH_DELAY_MS`: beginPress(); transition to `HOLDING`.
     */
    State[State["TOUCH_DELAY"] = 1] = "TOUCH_DELAY";
    /**
     * A touch has been deemed to be a press
     *
     * Transitions:
     *  - on up: transition to `WAITING_FOR_CLICK`.
     */
    State[State["HOLDING"] = 2] = "HOLDING";
    /**
     * The user touch has finished, transition into rest state.
     *
     * Transitions:
     *   - on click endPress(); transition to `INACTIVE`.
     */
    State[State["WAITING_FOR_CLICK"] = 3] = "WAITING_FOR_CLICK";
})(State || (State = {}));
class RippleDirective extends i$2 {
    constructor(partInfo) {
        super(partInfo);
        this.rippleGetter = async () => null;
        this.state = State.INACTIVE;
        this.checkBoundsAfterContextMenu = false;
        this.rippleStartEvent = null;
        this.touchTimer = null;
        this.clickTimer = null;
        if (partInfo.type !== t.ELEMENT) {
            throw new Error('The `ripple` directive must be used on an element');
        }
    }
    render(ripple) {
        return x;
    }
    // Use EventListenerObject::handleEvent interface to handle events without
    // generating bound event handlers
    async handleEvent(event) {
        const ripple = await this.rippleGetter();
        if (!ripple) {
            return;
        }
        switch (event.type) {
            case 'click':
                this.click(ripple);
                break;
            case 'contextmenu':
                this.contextMenu(ripple);
                break;
            case 'pointercancel':
                this.pointerCancel(ripple, event);
                break;
            case 'pointerdown':
                this.pointerDown(ripple, event);
                break;
            case 'pointerenter':
                this.pointerEnter(ripple, event);
                break;
            case 'pointerleave':
                this.pointerLeave(ripple, event);
                break;
            case 'pointerup':
                this.pointerUp(ripple, event);
                break;
        }
    }
    update(part, [ripple]) {
        if (!this.element) {
            // NOTE: addEventListener typing needs to be used with HTMLElements or a
            // subclass
            this.element = part.element;
            this.element.addEventListener('click', this);
            this.element.addEventListener('contextmenu', this);
            this.element.addEventListener('pointercancel', this);
            this.element.addEventListener('pointerdown', this);
            this.element.addEventListener('pointerenter', this);
            this.element.addEventListener('pointerleave', this);
            this.element.addEventListener('pointerup', this);
        }
        // Normalize given ripple accessor
        this.rippleGetter = typeof ripple === 'function' ? ripple : () => ripple;
        return x;
    }
    /**
     * Returns `true` if
     *  - the ripple element is enabled
     *  - the pointer is primary for the input type
     *  - the pointer is the pointer that started the interaction, or will start
     * the interaction
     *  - the pointer is a touch, or the pointer state has the primary button
     * held, or the pointer is hovering
     */
    shouldReactToEvent(ripple, ev, hovering = false) {
        const enabled = !ripple.disabled;
        const isPrimaryPointer = ev.isPrimary;
        const isInteractionPointer = this.rippleStartEvent === null ||
            this.rippleStartEvent.pointerId === ev.pointerId;
        const isPrimaryButton = ev.buttons === 1;
        return enabled && isPrimaryPointer && isInteractionPointer &&
            (this.isTouch(ev) || isPrimaryButton || hovering);
    }
    isTouch({ pointerType }) {
        return pointerType === 'touch';
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds({ x, y }) {
        const { top, left, bottom, right } = this.element.getBoundingClientRect();
        return x >= left && x <= right && y >= top && y <= bottom;
    }
    beginPress(ripple) {
        ripple.beginPress(this.rippleStartEvent);
    }
    endPress(ripple) {
        ripple.endPress();
        this.state = State.INACTIVE;
        this.rippleStartEvent = null;
        if (this.touchTimer) {
            clearTimeout(this.touchTimer);
            this.touchTimer = null;
        }
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
            this.clickTimer = null;
        }
    }
    waitForTouchHold() {
        if (this.touchTimer !== null) {
            clearTimeout(this.touchTimer);
        }
        this.state = State.TOUCH_DELAY;
        this.touchTimer = setTimeout(async () => {
            const ripple = await this.rippleGetter();
            if (ripple === null || this.state !== State.TOUCH_DELAY) {
                return;
            }
            this.state = State.HOLDING;
            this.beginPress(ripple);
        }, TOUCH_DELAY_MS$1);
    }
    click(ripple) {
        // Click is a MouseEvent in Firefox and Safari, so we cannot use
        // `shouldReactToEvent`
        if (ripple.disabled) {
            return;
        }
        if (this.state === State.WAITING_FOR_CLICK) {
            this.endPress(ripple);
        }
        else if (this.state === State.INACTIVE) {
            // keyboard synthesized click event
            this.beginPress(ripple);
            this.endPress(ripple);
        }
    }
    contextMenu(ripple) {
        if (!ripple.disabled) {
            this.checkBoundsAfterContextMenu = true;
            this.endPress(ripple);
        }
    }
    pointerDown(ripple, ev) {
        if (!this.shouldReactToEvent(ripple, ev)) {
            return;
        }
        this.rippleStartEvent = ev;
        if (this.isTouch(ev)) {
            // after a longpress contextmenu event, an extra `pointerdown` can be
            // dispatched to the pressed element. Check that the down is within
            // bounds of the element in this case.
            if (this.checkBoundsAfterContextMenu && !this.inBounds(ev)) {
                return;
            }
            this.checkBoundsAfterContextMenu = false;
            this.waitForTouchHold();
        }
        else {
            this.state = State.WAITING_FOR_CLICK;
            this.beginPress(ripple);
        }
    }
    pointerUp(ripple, ev) {
        if (!this.isTouch(ev) || !this.shouldReactToEvent(ripple, ev)) {
            return;
        }
        if (this.state === State.HOLDING) {
            this.state = State.WAITING_FOR_CLICK;
        }
        else if (this.state === State.TOUCH_DELAY) {
            this.state = State.WAITING_FOR_CLICK;
            this.beginPress(ripple);
        }
    }
    pointerCancel(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev)) {
            this.endPress(ripple);
        }
    }
    pointerEnter(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev, true)) {
            ripple.beginHover(ev);
        }
    }
    pointerLeave(ripple, ev) {
        if (this.shouldReactToEvent(ripple, ev, true)) {
            ripple.endHover();
            // release a held mouse or pen press that moves outside the element
            if (!this.isTouch(ev) && this.state !== State.INACTIVE) {
                this.endPress(ripple);
            }
        }
    }
}
/**
 * Connects a Ripple element to a node that drives the interaction
 *
 * @param rippleGetter A function that returns an `md-ripple` element
 * @param simulateKeyboardClick For elements that do not issue a click on
 *     keyboard interaction, pass `true` to enable press animations on Enter or
 *     Spacebar
 */
const ripple = e$2(RippleDirective);

/**
 * @requirecss {button.lib.shared_styles}
 *
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// tslint:disable-next-line:enforce-comments-on-exported-symbols
class Button extends s$2 {
    constructor() {
        super();
        /**
         * Whether or not the button is disabled.
         */
        this.disabled = false;
        /**
         * Whether to render the icon at the inline end of the label rather than the
         * inline start.
         *
         * _Note:_ Link buttons cannot have trailing icons.
         */
        this.trailingIcon = false;
        /**
         * The button's visible label.
         */
        this.label = '';
        /**
         * Whether to display the icon or not.
         */
        this.hasIcon = false;
        /**
         * Whether `preventDefault()` should be called on the underlying button.
         * Useful for preventing certain native functionalities like preventing form
         * submissions.
         */
        this.preventClickDefault = false;
        this.showFocusRing = false;
        this.showRipple = false;
        this.handleActivationClick = (event) => {
            if (!isActivationClick((event))) {
                return;
            }
            this.focus();
            dispatchActivationClick(this.buttonElement);
        };
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderRipple = () => {
            return y `<md-ripple class="md3-button__ripple" ?disabled="${this.disabled}"></md-ripple>`;
        };
        this.addEventListener('click', this.handleActivationClick);
    }
    focus() {
        this.buttonElement.focus();
    }
    blur() {
        this.buttonElement.blur();
    }
    render() {
        // TODO(b/237283903): Replace ifDefined(... || undefined) with ifTruthy(...)
        return y `
      <button
          class="md3-button ${o(this.getRenderClasses())}"
          ?disabled="${this.disabled}"
          aria-label="${this.ariaLabel || b}"
          aria-haspopup="${this.ariaHasPopup || b}"
          @pointerdown="${this.handlePointerDown}"
          @focus="${this.handleFocus}"
          @blur="${this.handleBlur}"
          @click="${this.handleClick}"
          ${ripple(this.getRipple)}>
        ${this.renderFocusRing()}
        ${this.renderElevation()}
        ${n$1(this.showRipple, this.renderRipple)}
        ${this.renderOutline()}
        ${this.renderTouchTarget()}
        ${this.renderLeadingIcon()}
        ${this.renderLabel()}
        ${this.renderTrailingIcon()}
      </button>`;
    }
    getRenderClasses() {
        return {
            'md3-button--icon-leading': !this.trailingIcon && this.hasIcon,
            'md3-button--icon-trailing': this.trailingIcon && this.hasIcon,
        };
    }
    getIconContainerClasses() {
        return {
            'md3-button__icon--leading': !this.trailingIcon,
            'md3-button__icon--trailing': this.trailingIcon,
        };
    }
    renderTouchTarget() {
        return y `
      <span class="md3-button__touch"></span>
    `;
    }
    renderElevation() {
        return y ``;
    }
    renderOutline() {
        return y ``;
    }
    renderFocusRing() {
        return y `<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    renderLabel() {
        return y `<span class="md3-button__label">${this.label}</span>`;
    }
    renderLeadingIcon() {
        return this.trailingIcon ? '' : this.renderIcon();
    }
    renderTrailingIcon() {
        return this.trailingIcon ? this.renderIcon() : '';
    }
    renderIcon() {
        return y `<span class="md3-button__icon-slot-container ${o(this.getIconContainerClasses())}">
                  <slot name="icon" @slotchange="${this.handleSlotChange}">
                  </slot>
                </span>`;
    }
    handlePointerDown(e) {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleClick(e) {
        if (this.preventClickDefault) {
            e.preventDefault();
        }
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    handleSlotChange() {
        this.hasIcon = this.assignedIcons.length > 0;
    }
}
Button.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    e$8({ type: String, attribute: 'data-aria-has-popup', noAccessor: true }),
    ariaProperty,
    __metadata("design:type", String)
], Button.prototype, "ariaHasPopup", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    ariaProperty,
    __metadata("design:type", String)
], Button.prototype, "ariaLabel", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Button.prototype, "disabled", void 0);
__decorate([
    e$8({ type: Boolean, attribute: 'trailingicon' }),
    __metadata("design:type", Object)
], Button.prototype, "trailingIcon", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], Button.prototype, "label", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Button.prototype, "hasIcon", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Button.prototype, "preventClickDefault", void 0);
__decorate([
    i$5('.md3-button'),
    __metadata("design:type", HTMLElement)
], Button.prototype, "buttonElement", void 0);
__decorate([
    e$7('md-ripple'),
    __metadata("design:type", Promise)
], Button.prototype, "ripple", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Button.prototype, "showFocusRing", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Button.prototype, "showRipple", void 0);
__decorate([
    l$6({ slot: 'icon', flatten: true }),
    __metadata("design:type", Array)
], Button.prototype, "assignedIcons", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// tslint:disable-next-line:enforce-comments-on-exported-symbols
class FilledButton extends Button {
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-button--filled': true,
        };
    }
    /** @soyTemplate */
    renderElevation() {
        return y `<md-elevation shadow surface></md-elevation>`;
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$d = i$4 `:host{--_container-shape-start-start: var(--md-filled-button-container-shape-start-start, 9999px);--_container-shape-start-end: var(--md-filled-button-container-shape-start-end, 9999px);--_container-shape-end-end: var(--md-filled-button-container-shape-end-end, 9999px);--_container-shape-end-start: var(--md-filled-button-container-shape-end-start, 9999px);--_container-color: var(--md-filled-button-container-color, var(--md-sys-color-primary, #6750a4));--_container-elevation: var(--md-filled-button-container-elevation, 0);--_container-height: var(--md-filled-button-container-height, 40px);--_container-shadow-color: var(--md-filled-button-container-shadow-color, var(--md-sys-color-shadow, #000));--_disabled-container-color: var(--md-filled-button-disabled-container-color, rgb(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.12));--_disabled-container-elevation: var(--md-filled-button-disabled-container-elevation, 0);--_disabled-label-text-color: var(--md-filled-button-disabled-label-text-color, rgb(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38));--_dragged-container-elevation: var(--md-filled-button-dragged-container-elevation, 6);--_dragged-label-text-color: var(--md-filled-button-dragged-label-text-color, var(--md-sys-color-on-primary, #fff));--_dragged-state-layer-color: var(--md-filled-button-dragged-state-layer-color, var(--md-sys-color-on-primary, #fff));--_dragged-state-layer-opacity: var(--md-filled-button-dragged-state-layer-opacity, 0.16);--_focus-container-elevation: var(--md-filled-button-focus-container-elevation, 0);--_focus-label-text-color: var(--md-filled-button-focus-label-text-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-color: var(--md-filled-button-focus-state-layer-color, var(--md-sys-color-on-primary, #fff));--_focus-state-layer-opacity: var(--md-filled-button-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-filled-button-hover-container-elevation, 1);--_hover-label-text-color: var(--md-filled-button-hover-label-text-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-color: var(--md-filled-button-hover-state-layer-color, var(--md-sys-color-on-primary, #fff));--_hover-state-layer-opacity: var(--md-filled-button-hover-state-layer-opacity, 0.08);--_label-text-color: var(--md-filled-button-label-text-color, var(--md-sys-color-on-primary, #fff));--_label-text-font: var(--md-filled-button-label-text-font, Roboto);--_label-text-line-height: var(--md-filled-button-label-text-line-height, 1.25rem);--_label-text-size: var(--md-filled-button-label-text-size, 0.875rem);--_label-text-tracking: var(--md-filled-button-label-text-tracking, 0.006rem);--_label-text-type: var(--md-filled-button-label-text-type, 500 0.875rem / 1.25rem Roboto);--_label-text-weight: var(--md-filled-button-label-text-weight, 500);--_pressed-container-elevation: var(--md-filled-button-pressed-container-elevation, 0);--_pressed-label-text-color: var(--md-filled-button-pressed-label-text-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-color: var(--md-filled-button-pressed-state-layer-color, var(--md-sys-color-on-primary, #fff));--_pressed-state-layer-opacity: var(--md-filled-button-pressed-state-layer-opacity, 0.12);--_with-icon-disabled-icon-color: var(--md-filled-button-with-icon-disabled-icon-color, rgb(var(--md-sys-color-on-surface-rgb, 28, 27, 31), 0.38));--_with-icon-dragged-icon-color: var(--md-filled-button-with-icon-dragged-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-focus-icon-color: var(--md-filled-button-with-icon-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-hover-icon-color: var(--md-filled-button-with-icon-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-icon-color: var(--md-filled-button-with-icon-icon-color, var(--md-sys-color-on-primary, #fff));--_with-icon-icon-size: var(--md-filled-button-with-icon-icon-size, 18px);--_with-icon-pressed-icon-color: var(--md-filled-button-with-icon-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_spacing-leading: var(--md-filled-button-spacing-leading, 24px);--_spacing-trailing: var(--md-filled-button-spacing-trailing, 24px);--_with-icon-spacing-leading: var(--md-filled-button-with-icon-spacing-leading, 16px);--_with-icon-spacing-trailing: var(--md-filled-button-with-icon-spacing-trailing, 24px);--_with-trailing-icon-spacing-leading: var(--md-filled-button-with-trailing-icon-spacing-leading, 24px);--_with-trailing-icon-spacing-trailing: var(--md-filled-button-with-trailing-icon-spacing-trailing, 16px)}/*# sourceMappingURL=filled-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$c = i$4 `md-elevation{inset:0;position:absolute}.md3-button{--md-elevation-duration:280ms;--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color);--md-elevation-surface-tint-color:var(--_container-surface-tint-layer-color)}.md3-button:focus{--md-elevation-level:var(--_focus-container-elevation)}.md3-button:hover{--md-elevation-level:var(--_hover-container-elevation)}.md3-button:active{--md-elevation-level:var(--_pressed-container-elevation)}.md3-button:disabled{--md-elevation-level:var(--_disabled-container-elevation)}/*# sourceMappingURL=shared-elevation-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$b = i$4 `:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top;--md-ripple-hover-state-layer-color:var(--_hover-state-layer-color);--md-ripple-focus-state-layer-color:var(--_focus-state-layer-color);--md-ripple-pressed-state-layer-color:var(--_pressed-state-layer-color);--md-ripple-hover-state-layer-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-state-layer-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-state-layer-opacity:var(--_pressed-state-layer-opacity);--md-focus-ring-shape-start-start:var(--_container-shape-start-start);--md-focus-ring-shape-start-end:var(--_container-shape-start-end);--md-focus-ring-shape-end-end:var(--_container-shape-end-end);--md-focus-ring-shape-end-start:var(--_container-shape-end-start)}:host([disabled]){cursor:default;pointer-events:none}.md3-button{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-inline-size:64px;border:none;outline:none;line-height:inherit;user-select:none;-webkit-appearance:none;vertical-align:middle;background:rgba(0,0,0,0);text-decoration:none;inline-size:100%;position:relative;z-index:0;block-size:var(--_container-height);font-family:var(--_label-text-font);font-size:var(--_label-text-size);letter-spacing:var(--_label-text-tracking);font-weight:var(--_label-text-weight);background-color:var(--_container-color);color:var(--_label-text-color);padding-inline-start:var(--_spacing-leading);padding-inline-end:var(--_spacing-trailing)}.md3-button::-moz-focus-inner{padding:0;border:0}.md3-button:hover{color:var(--_hover-label-text-color);cursor:pointer}.md3-button:focus{color:var(--_focus-label-text-color)}.md3-button:active{color:var(--_pressed-label-text-color);outline:none}.md3-button:disabled{background-color:var(--_disabled-container-color);color:var(--_disabled-label-text-color)}@media(forced-colors: active){.md3-button::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}}.md3-button,.md3-button__ripple{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-start-radius:var(--_container-shape-end-start);border-end-end-radius:var(--_container-shape-end-end)}md-elevation,.md3-button__ripple{z-index:-1}.md3-button--icon-leading{padding-inline-start:var(--_with-icon-spacing-leading);padding-inline-end:var(--_with-icon-spacing-trailing)}.md3-button--icon-trailing{padding-inline-start:var(--_with-trailing-icon-spacing-leading);padding-inline-end:var(--_with-trailing-icon-spacing-trailing)}.md3-link-button-wrapper{inline-size:100%}.md3-button__icon-slot-container{display:inline-flex}.md3-button__icon-slot-container ::slotted([slot=icon]){display:inline-flex;position:relative;writing-mode:horizontal-tb;color:var(--_with-icon-icon-color);font-size:var(--_with-icon-icon-size);inline-size:var(--_with-icon-icon-size);block-size:var(--_with-icon-icon-size)}.md3-button:hover .md3-button__icon-slot-container ::slotted([slot=icon]){color:var(--_with-icon-hover-icon-color)}.md3-button:focus .md3-button__icon-slot-container ::slotted([slot=icon]){color:var(--_with-icon-focus-icon-color)}.md3-button:active .md3-button__icon-slot-container ::slotted([slot=icon]){color:var(--_with-icon-pressed-icon-color)}.md3-button:disabled .md3-button__icon-slot-container ::slotted([slot=icon]){color:var(--_with-icon-disabled-icon-color)}.md3-button__icon--leading ::slotted([slot=icon]){margin-inline-end:8px}.md3-button__icon--trailing ::slotted([slot=icon]){margin-inline-start:8px}.md3-button__touch{position:absolute;top:50%;height:48px;left:0;right:0;transform:translateY(-50%)}/*# sourceMappingURL=shared-styles.css.map */
`;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @summary Buttons help people take action, such as sending an email, sharing a
 * document, or liking a comment.
 *
 * @description
 * __Emphasis:__ High emphasis – For the primary, most important, or most common
 * action on a screen
 *
 * __Rationale:__ The filled button’s contrasting surface color makes it the
 * most prominent button after the FAB. It’s used for final or unblocking
 * actions in a flow.
 *
 * __Example usages:__
 * - Save
 * - Confirm
 * - Done
 *
 * @final
 * @suppress {visibility}
 */
let MdFilledButton = class MdFilledButton extends FilledButton {
};
MdFilledButton.styles = [styles$b, styles$c, styles$d];
MdFilledButton = __decorate([
    e$9('md-filled-button')
], MdFilledButton);

/**
 * @requirecss {field.lib.shared_styles}
 *
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class Field extends s$2 {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.error = false;
        this.focused = false;
        this.populated = false;
        this.required = false;
        /**
         * Whether or not the field has leading content.
         */
        this.hasStart = false;
        /**
         * Whether or not the field has trailing content.
         */
        this.hasEnd = false;
        this.isAnimating = false;
        this.labelAnimationSignal = createAnimationSignal();
    }
    /** @soyTemplate */
    render() {
        return y `
      <span class="md3-field ${o(this.getRenderClasses())}">
        ${this.renderContainer()}
        ${this.renderSupportingText()}
      </span>
    `;
    }
    /** @soyTemplate */
    renderContainer() {
        return y `
      <span class="md3-field__container">
        ${this.renderContainerContents()}
      </span>
    `;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            'md3-field--disabled': this.disabled,
            'md3-field--error': this.error,
            'md3-field--focused': this.focused,
            'md3-field--with-start': this.hasStart,
            'md3-field--with-end': this.hasEnd,
            'md3-field--populated': this.populated,
            'md3-field--required': this.required,
            'md3-field--no-label': !this.label,
        };
    }
    /** @soyTemplate */
    renderContainerContents() {
        return y `
      <span class="md3-field__start">
        <slot name="start"></slot>
      </span>
      <span class="md3-field__middle">${this.renderMiddleContents()}</span>
      <span class="md3-field__end">
        <slot name="end"></slot>
      </span>
    `;
    }
    /** @soyTemplate */
    renderMiddleContents() {
        return y `
      <span class="md3-field__content"><slot></slot></span>
    `;
    }
    /** @soyTemplate */
    renderFloatingLabel() {
        const visible = (this.focused || this.populated) && !this.isAnimating;
        /** @classMap */
        const classes = { 'md3-field__label--hidden': !visible };
        return y `
      <span class="md3-field__label md3-field__label--floating ${o(classes)}"
        aria-hidden=${!visible}
      >${this.renderLabelText()}</span>
    `;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderLabel(LabelType.FLOATING);
    }
    /** @soyTemplate */
    renderRestingLabel() {
        const visible = !(this.focused || this.populated) || this.isAnimating;
        /** @classMap */
        const classes = { 'md3-field__label--hidden': !visible };
        return y `
      <span class="md3-field__label md3-field__label--resting ${o(classes)}"
        aria-hidden=${!visible}
      >${this.renderLabelText()}</span>
    `;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderLabel(LabelType.RESTING);
    }
    /** @soyTemplate */
    renderLabelText() {
        const labelText = this.label ?? '';
        const optionalAsterisk = this.required && labelText ? '*' : '';
        return labelText + optionalAsterisk;
    }
    /** @soyTemplate */
    renderSupportingText() {
        return y `
      <span class="md3-field__supporting-text">
        <span class="md3-field__supporting-text-start">
          <slot name="supporting-text"></slot>
        </span>
        <span class="md3-field__supporting-text-end">
          <slot name="supporting-text-end"></slot>
        </span>
      </span>
    `;
    }
    update(props) {
        // Client-side property updates
        // When disabling, remove focus styles if focused.
        if (this.disabled && this.focused) {
            props.set('focused', true);
            this.focused = false;
        }
        // Animate if focused or populated change.
        this.animateLabelIfNeeded({
            wasFocused: props.get('focused'),
            wasPopulated: props.get('populated')
        });
        super.update(props);
    }
    async animateLabelIfNeeded({ wasFocused, wasPopulated }) {
        if (!this.label) {
            return;
        }
        wasFocused ?? (wasFocused = this.focused);
        wasPopulated ?? (wasPopulated = this.populated);
        const wasFloating = wasFocused || wasPopulated;
        const shouldBeFloating = this.focused || this.populated;
        if (wasFloating === shouldBeFloating) {
            return;
        }
        this.isAnimating = true;
        const signal = this.labelAnimationSignal.start();
        // Only one label is visible at a time for clearer text rendering.
        // The resting label is visible and used during animation. At the end of the
        // animation, it will either remain visible (if resting) or hide and the
        // floating label will be shown.
        const labelEl = await this.restingLabelEl;
        const keyframes = await this.getLabelKeyframes();
        if (signal.aborted) {
            // Don't animate if this animation was requested to stop while getting
            // the label element or calculating keyframes
            return;
        }
        // We don't use forward filling because if the dimensions of the text field
        // change (leading icon removed, density changes, etc), then the animation
        // will be inaccurate.
        //
        // Re-calculating the animation each time will prevent any visual glitches
        // from appearing.
        // TODO(b/241113345): use animation tokens
        const animation = labelEl.animate(keyframes, { duration: 150, easing: Easing.STANDARD });
        signal.addEventListener('abort', () => {
            // Cancel if requested (another animation starts playing).
            animation.cancel();
        });
        animation.addEventListener('finish', () => {
            // At the end of the animation, update the visible label.
            this.isAnimating = false;
            this.labelAnimationSignal.finish();
        });
    }
    async getLabelKeyframes() {
        const floatingLabelEl = await this.floatingLabelEl;
        const restingLabelEl = await this.restingLabelEl;
        const { x: floatingX, y: floatingY, width: floatingWidth, height: floatingHeight } = floatingLabelEl.getBoundingClientRect();
        const { x: restingX, y: restingY, width: restingWidth, height: restingHeight } = restingLabelEl.getBoundingClientRect();
        // Scale by width ratio instead of font size since letter-spacing will scale
        // incorrectly. Using the width we can better approximate the adjusted
        // scale and compensate for tracking.
        const scale = floatingWidth / restingWidth;
        const xDelta = floatingX - restingX;
        // The line-height of the resting and floating label are different. When
        // we move the resting label up to the floating label's position, it won't
        // exactly match because of this. We need to adjust by half of what the
        // final scaled resting label's height will be.
        const yDelta = floatingY - restingY +
            Math.round((floatingHeight - restingHeight * scale) / 2);
        // Create the two transforms: resting to floating (using the calculations
        // above), and floating to resting (re-setting the transform to initial
        // values).
        const floatTransform = `translateX(${xDelta}px) translateY(calc(-50% + ${yDelta}px)) scale(${scale})`;
        const restTransform = `translateX(0) translateY(-50%) scale(1)`;
        if (this.focused || this.populated) {
            return [{ transform: restTransform }, { transform: floatTransform }];
        }
        return [{ transform: floatTransform }, { transform: restTransform }];
    }
}
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "disabled", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "error", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "focused", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", String)
], Field.prototype, "label", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "populated", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "required", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "hasStart", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], Field.prototype, "hasEnd", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Field.prototype, "isAnimating", void 0);
__decorate([
    e$7('.md3-field__label--floating'),
    __metadata("design:type", Promise)
], Field.prototype, "floatingLabelEl", void 0);
__decorate([
    e$7('.md3-field__label--resting'),
    __metadata("design:type", Promise)
], Field.prototype, "restingLabelEl", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class OutlinedField extends Field {
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-field--outlined': true,
        };
    }
    /** @soyTemplate */
    renderContainerContents() {
        return y `
      ${this.renderOutline()}
      ${super.renderContainerContents()}
    `;
    }
    /** @soyTemplate */
    renderOutline() {
        return y `
      <span class="md3-field__outline">
        <span class="md3-field__outline-start"></span>
        <span class="md3-field__outline-notch">
          <span class="md3-field__outline-panel-inactive"></span>
          <span class="md3-field__outline-panel-active"></span>
          ${this.renderFloatingLabel()}
        </span>
        <span class="md3-field__outline-end"></span>
      </span>
    `;
    }
    /** @soyTemplate */
    renderMiddleContents() {
        return y `
      ${this.renderRestingLabel()}
      ${super.renderMiddleContents()}
    `;
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$a = i$4 `:host{--_container-shape-start-start: var(--md-outlined-field-container-shape-start-start, 4px);--_container-shape-start-end: var(--md-outlined-field-container-shape-start-end, 4px);--_container-shape-end-end: var(--md-outlined-field-container-shape-end-end, 4px);--_container-shape-end-start: var(--md-outlined-field-container-shape-end-start, 4px);--_container-height: var(--md-outlined-field-container-height, 56px);--_disabled-label-text-color: var(--md-outlined-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-label-text-opacity: var(--md-outlined-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-leading-icon-opacity: var(--md-outlined-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-field-disabled-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-outline-opacity: var(--md-outlined-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-supporting-text-opacity: var(--md-outlined-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-trailing-icon-opacity: var(--md-outlined-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-label-text-color: var(--md-outlined-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-label-text-color: var(--md-outlined-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-label-text-color: var(--md-outlined-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-label-text-color: var(--md-outlined-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-field-focus-outline-width, 2px);--_focus-supporting-text-color: var(--md-outlined-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-label-text-color: var(--md-outlined-field-hover-label-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-leading-icon-color: var(--md-outlined-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-field-hover-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-outline-width: var(--md-outlined-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-color: var(--md-outlined-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-field-label-text-font, Roboto);--_label-text-line-height: var(--md-outlined-field-label-text-line-height, 1.5rem);--_label-text-populated-line-height: var(--md-outlined-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-outlined-field-label-text-populated-size, 0.75rem);--_label-text-size: var(--md-outlined-field-label-text-size, 1rem);--_label-text-tracking: var(--md-outlined-field-label-text-tracking, 0.031rem);--_label-text-weight: var(--md-outlined-field-label-text-weight, 400);--_leading-icon-color: var(--md-outlined-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-field-supporting-text-font, Roboto);--_supporting-text-line-height: var(--md-outlined-field-supporting-text-line-height, 1rem);--_supporting-text-size: var(--md-outlined-field-supporting-text-size, 0.75rem);--_supporting-text-tracking: var(--md-outlined-field-supporting-text-tracking, 0.025rem);--_supporting-text-weight: var(--md-outlined-field-supporting-text-weight, 400);--_trailing-icon-color: var(--md-outlined-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-field-trailing-icon-size, 24px);--_container-padding-horizontal: var(--md-outlined-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-outlined-field-container-padding-vertical, 8px);--_content-color: var(--md-outlined-field-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-content-color: var(--md-outlined-field-disabled-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-content-opacity: var(--md-outlined-field-disabled-content-opacity, 0.38);--_error-content-color: var(--md-outlined-field-error-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_error-focus-content-color: var(--md-outlined-field-error-focus-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_error-hover-content-color: var(--md-outlined-field-error-hover-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_focus-content-color: var(--md-outlined-field-focus-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-content-color: var(--md-outlined-field-hover-content-color, var(--md-sys-color-on-surface, #1c1b1f));--_label-text-padding-bottom: var(--md-outlined-field-label-text-padding-bottom, 8px);--_outline-label-padding: var(--md-outlined-field-outline-label-padding, 4px);--_supporting-text-padding: var(--md-outlined-field-supporting-text-padding, 16px);--_supporting-text-padding-top: var(--md-outlined-field-supporting-text-padding-top, 4px);--_label-text-populated-font: ;--_label-text-populated-tracking: ;--_label-text-populated-weight: }.md3-field__outline{border-start-start-radius:var(--_container-shape-start-start);border-start-end-radius:var(--_container-shape-start-end);border-end-end-radius:var(--_container-shape-end-end);border-end-start-radius:var(--_container-shape-end-start);border-color:var(--_outline-color);color:var(--_outline-color);display:flex;pointer-events:none;height:100%;position:absolute;width:100%}.md3-field__outline-start::before,.md3-field__outline-start::after,.md3-field__outline-panel-inactive::before,.md3-field__outline-panel-inactive::after,.md3-field__outline-panel-active::before,.md3-field__outline-panel-active::after,.md3-field__outline-end::before,.md3-field__outline-end::after{border:inherit;content:"";inset:0;position:absolute}.md3-field__outline-start,.md3-field__outline-end{border:inherit;border-radius:inherit;box-sizing:border-box;position:relative}.md3-field__outline-start::before,.md3-field__outline-start::after,.md3-field__outline-end::before,.md3-field__outline-end::after{border-bottom-style:solid;border-top-style:solid}.md3-field__outline-start::after,.md3-field__outline-end::after{opacity:0;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.md3-field--focused .md3-field__outline-start::after,.md3-field--focused .md3-field__outline-end::after{opacity:1}.md3-field__outline-start::before,.md3-field__outline-start::after{border-inline-start-style:solid;border-inline-end-style:none;border-start-start-radius:inherit;border-start-end-radius:0;border-end-start-radius:inherit;border-end-end-radius:0;margin-inline-end:var(--_outline-label-padding)}.md3-field__outline-end{flex-grow:1;margin-inline-start:calc(-1*var(--_outline-label-padding))}.md3-field__outline-end::before,.md3-field__outline-end::after{border-inline-start-style:none;border-inline-end-style:solid;border-start-start-radius:0;border-start-end-radius:inherit;border-end-start-radius:0;border-end-end-radius:inherit}.md3-field__outline-notch{align-items:flex-start;border:inherit;display:flex;margin-inline-start:calc(-1*var(--_outline-label-padding));margin-inline-end:var(--_outline-label-padding);max-width:calc(100% - 2*var(--_container-padding-horizontal));padding:0 var(--_outline-label-padding);position:relative}.md3-field--no-label .md3-field__outline-notch{display:none}.md3-field__outline-panel-inactive,.md3-field__outline-panel-active{border:inherit;border-bottom-style:solid;inset:0;position:absolute}.md3-field__outline-panel-inactive::before,.md3-field__outline-panel-inactive::after,.md3-field__outline-panel-active::before,.md3-field__outline-panel-active::after{border-top-style:solid;border-bottom:none;bottom:auto;transform:scaleX(1);transition:transform 150ms cubic-bezier(0.4, 0, 0.2, 1)}.md3-field__outline-panel-inactive::before,.md3-field__outline-panel-active::before{right:50%;transform-origin:top left}.md3-field__outline-panel-inactive::after,.md3-field__outline-panel-active::after{left:50%;transform-origin:top right}.md3-field--populated .md3-field__outline-panel-inactive::before,.md3-field--populated .md3-field__outline-panel-inactive::after,.md3-field--focused .md3-field__outline-panel-inactive::before,.md3-field--focused .md3-field__outline-panel-inactive::after,.md3-field--populated .md3-field__outline-panel-active::before,.md3-field--populated .md3-field__outline-panel-active::after,.md3-field--focused .md3-field__outline-panel-active::before,.md3-field--focused .md3-field__outline-panel-active::after{transform:scaleX(0)}.md3-field__outline-panel-active{opacity:0;transition:opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)}.md3-field--focused .md3-field__outline-panel-active{opacity:1}.md3-field__label--floating{transform:translateY(calc(-100% + var(--_label-text-padding-bottom)))}.md3-field__outline-start,.md3-field:not(.md3-field--with-start) .md3-field__start{padding-inline-start:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-start),var(--_container-shape-end-start)) + var(--_outline-label-padding))}.md3-field:not(.md3-field--with-end) .md3-field__end{padding-inline-end:max(var(--_container-padding-horizontal),max(var(--_container-shape-start-end),var(--_container-shape-end-end)))}.md3-field__outline-start::before,.md3-field__outline-end::before,.md3-field__outline-panel-inactive,.md3-field__outline-panel-inactive::before,.md3-field__outline-panel-inactive::after{border-width:var(--_outline-width)}:hover .md3-field__outline{border-color:var(--_hover-outline-color);color:var(--_hover-outline-color)}:hover .md3-field__outline-start::before,:hover .md3-field__outline-end::before,:hover .md3-field__outline-panel-inactive,:hover .md3-field__outline-panel-inactive::before,:hover .md3-field__outline-panel-inactive::after{border-width:var(--_hover-outline-width)}.md3-field--focused .md3-field__outline{border-color:var(--_focus-outline-color);color:var(--_focus-outline-color)}.md3-field__outline-start::after,.md3-field__outline-end::after,.md3-field__outline-panel-active,.md3-field__outline-panel-active::before,.md3-field__outline-panel-active::after{border-width:var(--_focus-outline-width)}.md3-field--disabled .md3-field__outline{border-color:var(--_disabled-outline-color);color:var(--_disabled-outline-color)}.md3-field--disabled .md3-field__outline-start,.md3-field--disabled .md3-field__outline-end,.md3-field--disabled .md3-field__outline-panel-inactive{opacity:var(--_disabled-outline-opacity)}.md3-field--disabled .md3-field__outline-start::before,.md3-field--disabled .md3-field__outline-end::before,.md3-field--disabled .md3-field__outline-panel-inactive,.md3-field--disabled .md3-field__outline-panel-inactive::before,.md3-field--disabled .md3-field__outline-panel-inactive::after{border-width:var(--_disabled-outline-width)}.md3-field--error:not(.md3-field--disabled) .md3-field__outline{border-color:var(--_error-outline-color);color:var(--_error-outline-color)}.md3-field--error:not(.md3-field--disabled):hover .md3-field__outline{border-color:var(--_error-hover-outline-color);color:var(--_error-hover-outline-color)}.md3-field--error:not(.md3-field--disabled).md3-field--focused .md3-field__outline{border-color:var(--_error-focus-outline-color);color:var(--_error-focus-outline-color)}/*# sourceMappingURL=outlined-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$9 = i$4 `:host{display:inline-flex}.md3-field{display:inline-flex;flex:1;flex-direction:column;writing-mode:horizontal-tb}.md3-field__container{align-items:center;box-sizing:border-box;display:flex;flex:1;flex-basis:var(--_container-height);position:relative}.md3-field--disabled{pointer-events:none}.md3-field--with-start .md3-field__start,.md3-field--with-end .md3-field__end{min-width:48px}.md3-field--with-start .md3-field__start{margin-inline-end:4px}.md3-field--with-end .md3-field__end{margin-inline-start:4px}.md3-field__start,.md3-field__middle,.md3-field__end{display:flex;align-items:center;box-sizing:border-box;height:100%;position:relative}.md3-field__start,.md3-field__end{justify-content:center}.md3-field__middle{align-self:baseline;flex:1}.md3-field__content{display:flex;flex:1;opacity:0;transition:opacity 83ms cubic-bezier(0.4, 0, 0.2, 1);color:var(--_content-color)}.md3-field--no-label .md3-field__content,.md3-field--focused .md3-field__content,.md3-field--populated .md3-field__content{opacity:1;transition-delay:67ms}.md3-field--disabled.md3-field--no-label .md3-field__content,.md3-field--disabled.md3-field--focused .md3-field__content,.md3-field--disabled.md3-field--populated .md3-field__content{opacity:var(--_disabled-content-opacity)}:hover .md3-field__content{color:var(--_hover-content-color)}.md3-field--focused .md3-field__content{color:var(--_focus-content-color)}.md3-field--disabled .md3-field__content{color:var(--_disabled-content-color)}.md3-field--error:not(.md3-field--disabled) .md3-field__content{color:var(--_error-content-color)}.md3-field--error:not(.md3-field--disabled):hover .md3-field__content{color:var(--_error-hover-content-color)}.md3-field--error:not(.md3-field--disabled).md3-field--focused .md3-field__content{color:var(--_error-focus-content-color)}.md3-field__label{color:var(--_label-text-color);overflow:hidden;max-width:100%;pointer-events:none;text-overflow:ellipsis;white-space:nowrap;z-index:1;font-family:var(--_label-text-font);font-weight:var(--_label-text-weight);letter-spacing:var(--_label-text-tracking)}.md3-field__label--resting{position:absolute;top:50%;transform:translateY(-50%);transform-origin:top left;font-size:var(--_label-text-size);line-height:var(--_label-text-line-height)}.md3-field__label--floating{font-size:var(--_label-text-populated-size);line-height:var(--_label-text-populated-line-height)}.md3-field__label--hidden{opacity:0}.md3-field--no-label .md3-field__label{display:none}:hover .md3-field__label{color:var(--_hover-label-text-color)}.md3-field--focused .md3-field__label{color:var(--_focus-label-text-color)}.md3-field--disabled .md3-field__label{color:var(--_disabled-label-text-color)}.md3-field--disabled .md3-field__label:not(.md3-field__label--hidden){opacity:var(--_disabled-label-text-opacity)}.md3-field--error:not(.md3-field--disabled) .md3-field__label{color:var(--_error-label-text-color)}.md3-field--error:not(.md3-field--disabled):hover .md3-field__label{color:var(--_error-hover-label-text-color)}.md3-field--error:not(.md3-field--disabled).md3-field--focused .md3-field__label{color:var(--_error-focus-label-text-color)}.md3-field__supporting-text{color:var(--_supporting-text-color);display:flex;justify-content:space-between;padding:0 var(--_supporting-text-padding);font-family:var(--_supporting-text-font);font-size:var(--_supporting-text-size);font-weight:var(--_supporting-text-weight);letter-spacing:var(--_supporting-text-tracking);line-height:var(--_supporting-text-line-height)}.md3-field__supporting-text-start,.md3-field__supporting-text-end{display:flex}.md3-field__supporting-text-start ::slotted(:not(:empty)),.md3-field__supporting-text-end ::slotted(:not(:empty)){padding-top:var(--_supporting-text-padding-top)}.md3-field__supporting-text-end ::slotted(:not(:empty)){padding-inline-start:var(--_supporting-text-padding)}:hover .md3-field__supporting-text{color:var(--_hover-supporting-text-color)}.md3-field--focus .md3-field__supporting-text{color:var(--_focus-supporting-text-color)}.md3-field--disabled .md3-field__supporting-text{color:var(--_disabled-supporting-text-color);opacity:var(--_disabled-supporting-text-opacity)}.md3-field--error:not(.md3-field--disabled) .md3-field__supporting-text{color:var(--_error-supporting-text-color)}.md3-field--error:not(.md3-field--disabled):hover .md3-field__supporting-text{color:var(--_error-hover-supporting-text-color)}.md3-field--error:not(.md3-field--disabled).md3-field--focus .md3-field__supporting-text{color:var(--_error-focus-supporting-text-color)}/*# sourceMappingURL=shared-styles.css.map */
`;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdOutlinedField = class MdOutlinedField extends OutlinedField {
};
MdOutlinedField.styles = [styles$9, styles$a];
MdOutlinedField = __decorate([
    e$9('md-outlined-field')
], MdOutlinedField);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=Symbol.for(""),l$2=t=>{if((null==t?void 0:t.r)===e$1)return null==t?void 0:t._$litStatic$},i$1=(t,...r)=>({_$litStatic$:r.reduce(((r,e,l)=>r+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(e)+t[l+1]),t[0]),r:e$1}),s$1=new Map,a=t=>(r,...e)=>{const o=e.length;let i,a;const n=[],u=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l$2(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++;}if($===o&&n.push(r[o]),f){const t=n.join("$$lit$$");void 0===(r=s$1.get(t))&&(n.raw=n,s$1.set(t,r=n)),e=u;}return t(r,...e)},n=a(y);

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$8 = i$4 `@media(forced-colors: active){:host{--md-outlined-text-field-disabled-input-text-color:GrayText;--md-outlined-text-field-disabled-input-text-opacity:1;--md-outlined-text-field-disabled-label-text-color:GrayText;--md-outlined-text-field-disabled-label-text-opacity:1;--md-outlined-text-field-disabled-leading-icon-color:GrayText;--md-outlined-text-field-disabled-leading-icon-opacity:1;--md-outlined-text-field-disabled-outline-color:GrayText;--md-outlined-text-field-disabled-outline-opacity:1;--md-outlined-text-field-disabled-supporting-text-color:GrayText;--md-outlined-text-field-disabled-supporting-text-opacity:1;--md-outlined-text-field-disabled-trailing-icon-color:GrayText;--md-outlined-text-field-disabled-trailing-icon-opacity:1}}/*# sourceMappingURL=outlined-forced-colors-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$7 = i$4 `:host{--_container-shape-start-start: var(--md-outlined-text-field-container-shape-start-start, 4px);--_container-shape-start-end: var(--md-outlined-text-field-container-shape-start-end, 4px);--_container-shape-end-end: var(--md-outlined-text-field-container-shape-end-end, 4px);--_container-shape-end-start: var(--md-outlined-text-field-container-shape-end-start, 4px);--_container-padding-horizontal: var(--md-outlined-text-field-container-padding-horizontal, 16px);--_container-padding-vertical: var(--md-outlined-text-field-container-padding-vertical, 8px);--_input-text-prefix-padding: var(--md-outlined-text-field-input-text-prefix-padding, 2px);--_input-text-suffix-padding: var(--md-outlined-text-field-input-text-suffix-padding, 2px);--_outline-label-padding: var(--md-outlined-text-field-outline-label-padding, 4px);--_caret-color: var(--md-outlined-text-field-caret-color, var(--md-sys-color-primary, #6750a4));--_container-height: var(--md-outlined-text-field-container-height, 56px);--_disabled-input-text-color: var(--md-outlined-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-input-text-opacity: var(--md-outlined-text-field-disabled-input-text-opacity, 0.38);--_disabled-label-text-color: var(--md-outlined-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-label-text-opacity: var(--md-outlined-text-field-disabled-label-text-opacity, 0.38);--_disabled-leading-icon-color: var(--md-outlined-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-leading-icon-opacity: var(--md-outlined-text-field-disabled-leading-icon-opacity, 0.38);--_disabled-outline-color: var(--md-outlined-text-field-disabled-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-outline-opacity: var(--md-outlined-text-field-disabled-outline-opacity, 0.12);--_disabled-outline-width: var(--md-outlined-text-field-disabled-outline-width, 1px);--_disabled-supporting-text-color: var(--md-outlined-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-supporting-text-opacity: var(--md-outlined-text-field-disabled-supporting-text-opacity, 0.38);--_disabled-trailing-icon-color: var(--md-outlined-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1c1b1f));--_disabled-trailing-icon-opacity: var(--md-outlined-text-field-disabled-trailing-icon-opacity, 0.38);--_error-focus-caret-color: var(--md-outlined-text-field-error-focus-caret-color, var(--md-sys-color-error, #b3261e));--_error-focus-input-text-color: var(--md-outlined-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_error-focus-label-text-color: var(--md-outlined-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-leading-icon-color: var(--md-outlined-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-focus-outline-color: var(--md-outlined-text-field-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_error-focus-supporting-text-color: var(--md-outlined-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-focus-trailing-icon-color: var(--md-outlined-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_error-hover-input-text-color: var(--md-outlined-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_error-hover-label-text-color: var(--md-outlined-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-leading-icon-color: var(--md-outlined-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-hover-outline-color: var(--md-outlined-text-field-error-hover-outline-color, var(--md-sys-color-on-error-container, #410e0b));--_error-hover-supporting-text-color: var(--md-outlined-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-hover-trailing-icon-color: var(--md-outlined-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_error-input-text-color: var(--md-outlined-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_error-label-text-color: var(--md-outlined-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_error-leading-icon-color: var(--md-outlined-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_error-outline-color: var(--md-outlined-text-field-error-outline-color, var(--md-sys-color-error, #b3261e));--_error-supporting-text-color: var(--md-outlined-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_error-trailing-icon-color: var(--md-outlined-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_focus-input-text-color: var(--md-outlined-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_focus-label-text-color: var(--md-outlined-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-leading-icon-color: var(--md-outlined-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-outline-color: var(--md-outlined-text-field-focus-outline-color, var(--md-sys-color-primary, #6750a4));--_focus-outline-width: var(--md-outlined-text-field-focus-outline-width, 2px);--_focus-supporting-text-color: var(--md-outlined-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_focus-trailing-icon-color: var(--md-outlined-text-field-focus-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-input-text-color: var(--md-outlined-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-label-text-color: var(--md-outlined-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-leading-icon-color: var(--md-outlined-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-outline-color: var(--md-outlined-text-field-hover-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_hover-outline-width: var(--md-outlined-text-field-hover-outline-width, 1px);--_hover-supporting-text-color: var(--md-outlined-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_hover-trailing-icon-color: var(--md-outlined-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-color: var(--md-outlined-text-field-input-text-color, var(--md-sys-color-on-surface, #1c1b1f));--_input-text-font: var(--md-outlined-text-field-input-text-font, Roboto);--_input-text-line-height: var(--md-outlined-text-field-input-text-line-height, 1.5rem);--_input-text-placeholder-color: var(--md-outlined-text-field-input-text-placeholder-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-prefix-color: var(--md-outlined-text-field-input-text-prefix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-size: var(--md-outlined-text-field-input-text-size, 1rem);--_input-text-suffix-color: var(--md-outlined-text-field-input-text-suffix-color, var(--md-sys-color-on-surface-variant, #49454f));--_input-text-tracking: var(--md-outlined-text-field-input-text-tracking, 0.031rem);--_input-text-type: var(--md-outlined-text-field-input-text-type, 400 1rem / 1.5rem Roboto);--_input-text-weight: var(--md-outlined-text-field-input-text-weight, 400);--_label-text-color: var(--md-outlined-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_label-text-font: var(--md-outlined-text-field-label-text-font, Roboto);--_label-text-line-height: var(--md-outlined-text-field-label-text-line-height, 1.5rem);--_label-text-populated-line-height: var(--md-outlined-text-field-label-text-populated-line-height, 1rem);--_label-text-populated-size: var(--md-outlined-text-field-label-text-populated-size, 0.75rem);--_label-text-size: var(--md-outlined-text-field-label-text-size, 1rem);--_label-text-tracking: var(--md-outlined-text-field-label-text-tracking, 0.031rem);--_label-text-type: var(--md-outlined-text-field-label-text-type, 400 1rem / 1.5rem Roboto);--_label-text-weight: var(--md-outlined-text-field-label-text-weight, 400);--_leading-icon-color: var(--md-outlined-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_leading-icon-size: var(--md-outlined-text-field-leading-icon-size, 24px);--_outline-color: var(--md-outlined-text-field-outline-color, var(--md-sys-color-outline, #79747e));--_outline-width: var(--md-outlined-text-field-outline-width, 1px);--_supporting-text-color: var(--md-outlined-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_supporting-text-font: var(--md-outlined-text-field-supporting-text-font, Roboto);--_supporting-text-line-height: var(--md-outlined-text-field-supporting-text-line-height, 1rem);--_supporting-text-size: var(--md-outlined-text-field-supporting-text-size, 0.75rem);--_supporting-text-tracking: var(--md-outlined-text-field-supporting-text-tracking, 0.025rem);--_supporting-text-type: var(--md-outlined-text-field-supporting-text-type, 400 0.75rem / 1rem Roboto);--_supporting-text-weight: var(--md-outlined-text-field-supporting-text-weight, 400);--_trailing-icon-color: var(--md-outlined-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_trailing-icon-size: var(--md-outlined-text-field-trailing-icon-size, 24px);--md-outlined-field-container-shape-start-start:var(--_container-shape-start-start);--md-outlined-field-container-shape-start-end:var(--_container-shape-start-end);--md-outlined-field-container-shape-end-end:var(--_container-shape-end-end);--md-outlined-field-container-shape-end-start:var(--_container-shape-end-start);--md-outlined-field-container-height:var(--_container-height);--md-outlined-field-disabled-content-color:var(--_disabled-input-text-color);--md-outlined-field-disabled-content-opacity:var(--_disabled-input-text-opacity);--md-outlined-field-disabled-label-text-color:var(--_disabled-label-text-color);--md-outlined-field-disabled-label-text-opacity:var(--_disabled-label-text-opacity);--md-outlined-field-disabled-leading-icon-color:var(--_disabled-leading-icon-color);--md-outlined-field-disabled-leading-icon-opacity:var(--_disabled-leading-icon-opacity);--md-outlined-field-disabled-outline-color:var(--_disabled-outline-color);--md-outlined-field-disabled-outline-opacity:var(--_disabled-outline-opacity);--md-outlined-field-disabled-outline-width:var(--_disabled-outline-width);--md-outlined-field-disabled-supporting-text-color:var(--_disabled-supporting-text-color);--md-outlined-field-disabled-supporting-text-opacity:var(--_disabled-supporting-text-opacity);--md-outlined-field-disabled-trailing-icon-color:var(--_disabled-trailing-icon-color);--md-outlined-field-disabled-trailing-icon-opacity:var(--_disabled-trailing-icon-opacity);--md-outlined-field-error-focus-content-color:var(--_error-focus-input-text-color);--md-outlined-field-error-focus-label-text-color:var(--_error-focus-label-text-color);--md-outlined-field-error-focus-leading-icon-color:var(--_error-focus-leading-icon-color);--md-outlined-field-error-focus-outline-color:var(--_error-focus-outline-color);--md-outlined-field-error-focus-supporting-text-color:var(--_error-focus-supporting-text-color);--md-outlined-field-error-focus-trailing-icon-color:var(--_error-focus-trailing-icon-color);--md-outlined-field-error-hover-content-color:var(--_error-hover-input-text-color);--md-outlined-field-error-hover-label-text-color:var(--_error-hover-label-text-color);--md-outlined-field-error-hover-leading-icon-color:var(--_error-hover-leading-icon-color);--md-outlined-field-error-hover-outline-color:var(--_error-hover-outline-color);--md-outlined-field-error-hover-supporting-text-color:var(--_error-hover-supporting-text-color);--md-outlined-field-error-hover-trailing-icon-color:var(--_error-hover-trailing-icon-color);--md-outlined-field-error-content-color:var(--_error-input-text-color);--md-outlined-field-error-label-text-color:var(--_error-label-text-color);--md-outlined-field-error-leading-icon-color:var(--_error-leading-icon-color);--md-outlined-field-error-outline-color:var(--_error-outline-color);--md-outlined-field-error-supporting-text-color:var(--_error-supporting-text-color);--md-outlined-field-error-trailing-icon-color:var(--_error-trailing-icon-color);--md-outlined-field-focus-content-color:var(--_focus-input-text-color);--md-outlined-field-focus-label-text-color:var(--_focus-label-text-color);--md-outlined-field-focus-leading-icon-color:var(--_focus-leading-icon-color);--md-outlined-field-focus-outline-color:var(--_focus-outline-color);--md-outlined-field-focus-outline-width:var(--_focus-outline-width);--md-outlined-field-focus-supporting-text-color:var(--_focus-supporting-text-color);--md-outlined-field-focus-trailing-icon-color:var(--_focus-trailing-icon-color);--md-outlined-field-hover-content-color:var(--_hover-input-text-color);--md-outlined-field-hover-label-text-color:var(--_hover-label-text-color);--md-outlined-field-hover-leading-icon-color:var(--_hover-leading-icon-color);--md-outlined-field-hover-outline-color:var(--_hover-outline-color);--md-outlined-field-hover-outline-width:var(--_hover-outline-width);--md-outlined-field-hover-supporting-text-color:var(--_hover-supporting-text-color);--md-outlined-field-hover-trailing-icon-color:var(--_hover-trailing-icon-color);--md-outlined-field-content-color:var(--_input-text-color);--md-outlined-field-label-text-color:var(--_label-text-color);--md-outlined-field-label-text-font:var(--_label-text-font);--md-outlined-field-label-text-line-height:var(--_label-text-line-height);--md-outlined-field-label-text-padding-bottom:var(--_label-text-padding-bottom);--md-outlined-field-label-text-populated-line-height:var(--_label-text-populated-line-height);--md-outlined-field-label-text-populated-size:var(--_label-text-populated-size);--md-outlined-field-label-text-size:var(--_label-text-size);--md-outlined-field-label-text-tracking:var(--_label-text-tracking);--md-outlined-field-label-text-weight:var(--_label-text-weight);--md-outlined-field-leading-icon-color:var(--_leading-icon-color);--md-outlined-field-leading-icon-size:var(--_leading-icon-size);--md-outlined-field-outline-color:var(--_outline-color);--md-outlined-field-outline-width:var(--_outline-width);--md-outlined-field-supporting-text-color:var(--_supporting-text-color);--md-outlined-field-supporting-text-font:var(--_supporting-text-font);--md-outlined-field-supporting-text-line-height:var(--_supporting-text-line-height);--md-outlined-field-supporting-text-size:var(--_supporting-text-size);--md-outlined-field-supporting-text-tracking:var(--_supporting-text-tracking);--md-outlined-field-supporting-text-weight:var(--_supporting-text-weight);--md-outlined-field-trailing-icon-color:var(--_trailing-icon-color);--md-outlined-field-trailing-icon-size:var(--_trailing-icon-size)}/*# sourceMappingURL=outlined-styles.css.map */
`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$1=l=>null!=l?l:b;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=o=>void 0===o.strings,f={},s=(o,l=f)=>o._$AH=l;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=e$2(class extends i$2{constructor(r){if(super(r),r.type!==t.PROPERTY&&r.type!==t.ATTRIBUTE&&r.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!e(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t$1]){if(t$1===x||t$1===b)return t$1;const o=i.element,l=i.name;if(i.type===t.PROPERTY){if(t$1===o[l])return x}else if(i.type===t.BOOLEAN_ATTRIBUTE){if(!!t$1===o.hasAttribute(l))return x}else if(i.type===t.ATTRIBUTE&&o.getAttribute(l)===t$1+"")return x;return s(i),t$1}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i=e$2(class extends i$2{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.vt){this.vt=new Set;for(const t in r)this.vt.add(t);return this.render(r)}this.vt.forEach((t=>{null==r[t]&&(this.vt.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];null!=e&&(this.vt.add(t),t.includes("-")?s.setProperty(t,e):s[t]=e);}return x}});

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function bound(target, propertyKey, methodDescriptor) {
    const descriptor = methodDescriptor || {
        configurable: true,
        enumerable: true,
        writable: true,
    };
    const memoizedBoundValues = new WeakMap();
    let get;
    let set;
    if (descriptor.get || descriptor.writable) {
        get = function () {
            const self = this; // Needed for closure conformance
            if (descriptor.get) {
                // Separate variables needed for closure conformance
                const getter = descriptor.get;
                const value = getter.call(self);
                return value.bind(self);
            }
            if (!memoizedBoundValues.has(self)) {
                const bound = (descriptor.value || self[propertyKey])?.bind(self);
                memoizedBoundValues.set(self, bound);
                return bound;
            }
            return memoizedBoundValues.get(self);
        };
    }
    if (descriptor.set || descriptor.writable) {
        set = function (value) {
            const self = this; // Needed for closure conformance
            value = value.bind(self);
            if (descriptor.set) {
                descriptor.set.call(self, value);
            }
            memoizedBoundValues.set(self, value);
        };
    }
    return {
        get,
        set,
        configurable: descriptor.configurable,
        enumerable: descriptor.enumerable,
    };
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Returns true if the element is a form associated custom element (FACE).
 */
function isFormAssociated(element) {
    return element.constructor.formAssociated;
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
// TODO Label activation shim is currently only needed for Safari. Remove it
// when no longer needed, see b/261871554.
/**
 * Returns true if labeling is supported for form associated custom elemeents.
 * Chrome and Firefox currently do and Safari support appears to be in progress,
 * see https://bugs.webkit.org/show_bug.cgi?id=197960.
 */
const SUPPORTS_FACE_LABEL = 'labels' in (globalThis?.ElementInternals?.prototype ?? {});
function isCustomElement(element) {
    return element.localName.match('-');
}
// Elements that can be associated with a <label> element include <button>,
// <input> (except for type="hidden"), <meter>, <output>, <progress>, <select>
// and <textarea>.
const implicitLabelReactive = new Set(['button', 'input', 'meter', 'progress', 'output', 'select', 'textarea']);
function isLabelReactive(element) {
    return implicitLabelReactive.has(element.localName) ||
        isFormAssociated(element);
}
/**
 * Provides a shim for labeling form associated custom elements via clicks
 * on label elements. Note, this is currently needed only in Safari and
 * support appears to be in progress, see
 * https://bugs.webkit.org/show_bug.cgi?id=197960.
 */
function shimLabelSupport(root) {
    // Listen for clicks on root to find clicks on label elements
    root.addEventListener('click', labelActivationListener);
}
function labelActivationListener(event) {
    // Find label on which user clicked.
    const path = event.composedPath();
    const root = event.currentTarget;
    let label = undefined;
    for (let i = 0; i < path.length; i++) {
        const target = path[i];
        // Not element or not in scope.
        if (target.nodeType !== Node.ELEMENT_NODE ||
            target.getRootNode() !== root) {
            continue;
        }
        // If the click is on a label reactive element, this is not a label click.
        if (isLabelReactive(target)) {
            return;
        }
        if (target.localName === 'label') {
            label = target;
        }
    }
    if (label === undefined) {
        return;
    }
    // Find associated element to activate.
    const forId = label.getAttribute('for');
    const target = forId ?
        root.getElementById(forId) :
        Array.from(label.querySelectorAll('*'))
            .find((el) => isCustomElement(el) && isFormAssociated(el));
    if (target == null) {
        return;
    }
    // Simulate FACE by issuing a click on the associated element.
    const simulatedClick = new PointerEvent('click', { composed: true, bubbles: true });
    target.dispatchEvent(simulatedClick);
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A unique symbol key for `FormController` elements to implement their
 * `getFormValue()` function.
 */
const getFormValue = Symbol('getFormValue');
/**
 * A `ReactiveController` that adds `<form>` support to an element.
 *
 * Elements should also set `static formAssociated = true` which
 * provides platform support for forms. When an element is form associated,
 * it can be activated via clicks on associated label elements. It is the
 * responsibility of the element to process this click and perform any necessary
 * activation tasks, for example focusing and clicking on an internal element.
 *
 */
class FormController {
    /**
     * Creates a new `FormController` for the given element.
     *
     * @param element The element to add `<form>` support to.
     */
    constructor(element) {
        this.element = element;
    }
    hostConnected() {
        // If the component internals are not in Shadow DOM, subscribing to form
        // data events could lead to duplicated data, which may not work correctly
        // on the server side.
        if (!this.element.shadowRoot || window.ShadyDOM?.inUse) {
            return;
        }
        // Preserve a reference to the form, since on hostDisconnected it may be
        // null if the child was removed.
        this.form = this.element.form;
        this.form?.addEventListener('formdata', this.formDataListener);
        // TODO(b/261871554) Label activation shim is currently only needed for
        // Safari. Remove it when no longer needed.
        if (isFormAssociated(this.element) && !SUPPORTS_FACE_LABEL) {
            shimLabelSupport(this.element.getRootNode());
        }
    }
    hostDisconnected() {
        this.form?.removeEventListener('formdata', this.formDataListener);
    }
    formDataListener(event) {
        if (this.element.disabled) {
            // Check for truthiness since some elements may not support disabling.
            return;
        }
        const value = this.element[getFormValue]();
        // If given a `FormData` instance, append all values to the form. This
        // allows elements to customize what is added beyond a single name/value
        // pair.
        if (value instanceof FormData) {
            for (const [key, dataValue] of value) {
                event.formData.append(key, dataValue);
            }
            return;
        }
        // Do not associate the value with the form if there is no value or no name.
        if (value === null || !this.element.name) {
            return;
        }
        event.formData.append(this.element.name, value);
    }
}
__decorate([
    bound,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [FormDataEvent]),
    __metadata("design:returntype", void 0)
], FormController.prototype, "formDataListener", null);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const stringConverter = {
    fromAttribute(value) {
        return value ?? '';
    },
    toAttribute(value) {
        return value || null;
    }
};

/**
 * @requirecss {textfield.lib.shared_styles}
 *
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class TextField extends s$2 {
    constructor() {
        super();
        this.disabled = false;
        /**
         * Gets or sets whether or not the text field is in a visually invalid state.
         *
         * Calling `reportValidity()` will automatically update `error`.
         */
        this.error = false;
        /**
         * The error message that replaces supporting text when `error` is true. If
         * `errorText` is an empty string, then the supporting text will continue to
         * show.
         *
         * Calling `reportValidity()` will automatically update `errorText` to the
         * native `validationMessage`.
         */
        this.errorText = '';
        this.required = false;
        /**
         * The current value of the text field. It is always a string.
         *
         * This is equal to `defaultValue` before user input.
         */
        this.value = '';
        /**
         * The default value of the text field. Before user input, changing the
         * default value will update `value` as well.
         *
         * When the text field is reset, its `value` will be set to this default
         * value.
         */
        this.defaultValue = '';
        /**
         * An optional prefix to display before the input value.
         */
        this.prefixText = '';
        /**
         * An optional suffix to display after the input value.
         */
        this.suffixText = '';
        /**
         * Whether or not the text field has a leading icon. Used for SSR.
         */
        this.hasLeadingIcon = false;
        /**
         * Whether or not the text field has a trailing icon. Used for SSR.
         */
        this.hasTrailingIcon = false;
        /**
         * Conveys additional information below the text field, such as how it should
         * be used.
         */
        this.supportingText = '';
        /**
         * Override the input text CSS `direction`. Useful for RTL languages that use
         * LTR notation for fractions.
         */
        this.textDirection = '';
        // ARIA
        // TODO(b/210730484): replace with @soyParam annotation
        this.ariaAutoComplete = null;
        this.ariaControls = null;
        this.ariaActiveDescendant = null;
        this.ariaExpanded = null;
        // tslint:disable:decorator-placement
        // @ts-ignore(b/264292293): Use `override` with TS 4.9+
        this.role = null;
        this.name = '';
        // <input> properties
        /**
         * Defines the greatest value in the range of permitted values.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#max
         */
        this.max = '';
        /**
         * The maximum number of characters a user can enter into the text field. Set
         * to -1 for none.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#maxlength
         */
        this.maxLength = -1;
        /**
         * Defines the most negative value in the range of permitted values.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#min
         */
        this.min = '';
        /**
         * The minimum number of characters a user can enter into the text field. Set
         * to -1 for none.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#minlength
         */
        this.minLength = -1;
        /**
         * A regular expression that the text field's value must match to pass
         * constraint validation.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern
         */
        this.pattern = '';
        this.placeholder = '';
        /**
         * Indicates whether or not a user should be able to edit the text field's
         * value.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#readonly
         */
        this.readOnly = false;
        /**
         * Returns or sets the element's step attribute, which works with min and max
         * to limit the increments at which a numeric or date-time value can be set.
         *
         * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#step
         */
        this.step = '';
        // TODO(b/237284412): replace with exported types
        this.type = 'text';
        /**
         * Returns true when the text field has been interacted with. Native
         * validation errors only display in response to user interactions.
         */
        this.dirty = false;
        this.focused = false;
        /**
         * When set to true, the error text's `role="alert"` will be removed, then
         * re-added after an animation frame. This will re-announce an error message
         * to screen readers.
         */
        this.refreshErrorAlert = false;
        /**
         * Returns true when the text field's `value` property has been changed from
         * it's initial value.
         *
         * Setting `value` should always overwrite `defaultValue`, even when `value`
         * is an empty string. This flag ensures that behavior.
         */
        this.valueHasChanged = false;
        /**
         * Whether or not to ignore the next `value` change when computing
         * `valueHasChanged`.
         */
        this.ignoreNextValueChange = false;
        /**
         * Whether or not a native error has been reported via `reportValidity()`.
         */
        this.nativeError = false;
        /**
         * The validation message displayed from a native error via
         * `reportValidity()`.
         */
        this.nativeErrorText = '';
        /** @soyUniqueAttribute */
        this.counterId = 'counter';
        /** @soyUniqueAttribute */
        this.supportingTextId = 'support';
        this.addController(new FormController(this));
        // TODO(b/244574653): replace this.handleClick with this.focus
        this.addEventListener('click', this.handleClick);
        this.addEventListener('focusin', this.handleFocusin);
        this.addEventListener('focusout', this.handleFocusout);
    }
    // tslint:enable:decorator-placement
    // FormElement
    get form() {
        return this.closest('form');
    }
    [getFormValue]() {
        return this.value;
    }
    /**
     * Gets or sets the direction in which selection occurred.
     */
    get selectionDirection() {
        return this.getInput().selectionDirection;
    }
    set selectionDirection(value) {
        this.getInput().selectionDirection = value;
    }
    /**
     * Gets or sets the end position or offset of a text selection.
     */
    get selectionEnd() {
        return this.getInput().selectionEnd;
    }
    set selectionEnd(value) {
        this.getInput().selectionEnd = value;
    }
    /**
     * Gets or sets the starting position or offset of a text selection.
     */
    get selectionStart() {
        return this.getInput().selectionStart;
    }
    set selectionStart(value) {
        this.getInput().selectionStart = value;
    }
    /**
     * Returns the native validation error message that would be displayed upon
     * calling `reportValidity()`.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validationMessage
     */
    get validationMessage() {
        return this.getInput().validationMessage;
    }
    /**
     * Returns a ValidityState object that represents the validity states of the
     * text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/validity
     */
    get validity() {
        return this.getInput().validity;
    }
    /**
     * The text field's value as a number.
     */
    get valueAsNumber() {
        return this.getInput().valueAsNumber;
    }
    set valueAsNumber(value) {
        this.getInput().valueAsNumber = value;
        this.value = this.getInput().value;
    }
    /**
     * The text field's value as a Date.
     */
    get valueAsDate() {
        return this.getInput().valueAsDate;
    }
    set valueAsDate(value) {
        this.getInput().valueAsDate = value;
        this.value = this.getInput().value;
    }
    /**
     * Returns whether an element will successfully validate based on forms
     * validation rules and constraints.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLObjectElement/willValidate
     */
    get willValidate() {
        return this.getInput().willValidate;
    }
    /**
     * Checks the text field's native validation and returns whether or not the
     * element is valid.
     *
     * If invalid, this method will dispatch the `invalid` event.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
     *
     * @return true if the text field is valid, or false if not.
     */
    checkValidity() {
        const { valid } = this.checkValidityAndDispatch();
        return valid;
    }
    /**
     * Focuses the text field's input text.
     */
    focus() {
        if (this.disabled || this.matches(':focus-within')) {
            // Don't shift focus from an element within the text field, like an icon
            // button, to the input when focus is requested.
            return;
        }
        // TODO(b/210731759): replace with super.focus() once SSR supports
        // delegating focus
        this.getInput().focus();
    }
    /**
     * Unfocuses the text field.
     */
    blur() {
        this.getInput().blur();
    }
    /**
     * Checks the text field's native validation and returns whether or not the
     * element is valid.
     *
     * If invalid, this method will dispatch the `invalid` event.
     *
     * This method will display or clear an error text message equal to the text
     * field's `validationMessage`, unless the invalid event is canceled.
     *
     * Use `setCustomValidity()` to customize the `validationMessage`.
     *
     * This method can also be used to re-announce error messages to screen
     * readers.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
     *
     * @return true if the text field is valid, or false if not.
     */
    reportValidity() {
        const { valid, canceled } = this.checkValidityAndDispatch();
        if (!canceled) {
            const prevMessage = this.getErrorText();
            this.nativeError = !valid;
            this.nativeErrorText = this.validationMessage;
            const needsRefresh = this.shouldErrorAnnounce() && prevMessage === this.getErrorText();
            if (needsRefresh) {
                this.refreshErrorAlert = true;
            }
        }
        return valid;
    }
    /**
     * Selects all the text in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select
     */
    select() {
        this.getInput().select();
    }
    /**
     * Sets the text field's native validation error message. This is used to
     * customize `validationMessage`.
     *
     * When the error is not an empty string, the text field is considered invalid
     * and `validity.customError` will be true.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
     *
     * @param error The error message to display.
     */
    setCustomValidity(error) {
        this.getInput().setCustomValidity(error);
    }
    setRangeText(...args) {
        // Calling setRangeText with 1 vs 3-4 arguments has different behavior.
        // Use spread syntax and type casting to ensure correct usage.
        this.getInput().setRangeText(...args);
        this.value = this.getInput().value;
    }
    /**
     * Sets the start and end positions of a selection in the text field.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange
     *
     * @param start The offset into the text field for the start of the selection.
     * @param end The offset into the text field for the end of the selection.
     * @param direction The direction in which the selection is performed.
     */
    setSelectionRange(start, end, direction) {
        this.getInput().setSelectionRange(start, end, direction);
    }
    /**
     * Decrements the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepDown
     *
     * @param stepDecrement The number of steps to decrement, defaults to 1.
     */
    stepDown(stepDecrement) {
        const input = this.getInput();
        input.stepDown(stepDecrement);
        this.value = input.value;
    }
    /**
     * Increments the value of a numeric type text field by `step` or `n` `step`
     * number of times.
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/stepUp
     *
     * @param stepIncrement The number of steps to increment, defaults to 1.
     */
    stepUp(stepIncrement) {
        const input = this.getInput();
        input.stepUp(stepIncrement);
        this.value = input.value;
    }
    /**
     * Reset the text field to its default value.
     */
    reset() {
        this.dirty = false;
        this.valueHasChanged = false;
        this.ignoreNextValueChange = true;
        this.value = this.defaultValue;
        this.nativeError = false;
        this.nativeErrorText = '';
    }
    /** @soyTemplate */
    render() {
        return y `
       <span class="md3-text-field ${o(this.getRenderClasses())}">
         ${this.renderField()}
       </span>
     `;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return {
            'md3-text-field--disabled': this.disabled,
            'md3-text-field--error': this.getError(),
        };
    }
    /** @soyTemplate */
    getError() {
        return this.error || this.nativeError;
    }
    /** @soyTemplate */
    renderField() {
        const prefix = this.renderPrefix();
        const suffix = this.renderSuffix();
        const input = this.renderInput();
        const inputValue = this.getInputValue();
        return n `<${this.fieldTag}
      class="md3-text-field__field"
      ?disabled=${this.disabled}
      ?error=${this.getError()}
      ?focused=${this.focused}
      ?hasEnd=${this.hasTrailingIcon}
      ?hasStart=${this.hasLeadingIcon}
      .label=${this.label}
      ?populated=${!!inputValue}
      ?required=${this.required}
    >
      ${this.renderLeadingIcon()}
      ${prefix}${input}${suffix}
      ${this.renderTrailingIcon()}
      ${this.renderSupportingText()}
      ${this.renderCounter()}
    </${this.fieldTag}>`;
    }
    /**
     * @soyTemplate
     * @slotName start
     */
    renderLeadingIcon() {
        return y `
       <span class="md3-text-field__icon md3-text-field__icon--leading"
           slot="start">
         <slot name="leadingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
    }
    /**
     * @soyTemplate
     * @slotName end
     */
    renderTrailingIcon() {
        return y `
       <span class="md3-text-field__icon md3-text-field__icon--trailing"
           slot="end">
         <slot name="trailingicon" @slotchange=${this.handleIconChange}></slot>
       </span>
     `;
    }
    /** @soyTemplate */
    renderInput() {
        // TODO(b/237283903): remove when custom isTruthy directive is supported
        const placeholderValue = this.placeholder || undefined;
        const ariaActiveDescendantValue = this.ariaActiveDescendant || undefined;
        const ariaAutoCompleteValue = this.ariaAutoComplete || undefined;
        const ariaControlsValue = this.ariaControls || undefined;
        const ariaDescribedByValue = this.getAriaDescribedBy() || undefined;
        const ariaExpandedValue = this.ariaExpanded || undefined;
        const ariaLabelValue = this.ariaLabel || this.label || undefined;
        const ariaLabelledByValue = this.ariaLabelledBy || undefined;
        const maxValue = this.max || undefined;
        const maxLengthValue = this.maxLength > -1 ? this.maxLength : undefined;
        const minValue = this.min || undefined;
        const minLengthValue = this.minLength > -1 ? this.minLength : undefined;
        const patternValue = this.pattern || undefined;
        const roleValue = this.role || undefined;
        const stepValue = this.step || undefined;
        /** @styleMap */
        const style = { direction: this.textDirection };
        // TODO(b/243805848): remove `as unknown as number` once lit analyzer is
        // fixed
        return y `<input
       class="md3-text-field__input"
       style=${i(style)}
       aria-activedescendant=${l$1(ariaActiveDescendantValue)}
       aria-autocomplete=${l$1(ariaAutoCompleteValue)}
       aria-controls=${l$1(ariaControlsValue)}
       aria-describedby=${l$1(ariaDescribedByValue)}
       aria-expanded=${l$1(ariaExpandedValue)}
       aria-invalid=${this.getError()}
       aria-label=${l$1(ariaLabelValue)}
       aria-labelledby=${l$1(ariaLabelledByValue)}
       ?disabled=${this.disabled}
       max=${l$1(maxValue)}
       maxlength=${l$1(maxLengthValue)}
       min=${l$1(minValue)}
       minlength=${l$1(minLengthValue)}
       pattern=${l$1(patternValue)}
       placeholder=${l$1(placeholderValue)}
       role=${l$1(roleValue)}
       ?readonly=${this.readOnly}
       ?required=${this.required}
       step=${l$1(stepValue)}
       type=${this.type}
       .value=${l(this.getInputValue())}
       @change=${this.redispatchEvent}
       @input=${this.handleInput}
       @select=${this.redispatchEvent}
     >`;
    }
    /** @soyTemplate */
    getInputValue() {
        const alwaysShowValue = this.dirty || this.valueHasChanged;
        return alwaysShowValue ? this.value : this.defaultValue || this.value;
    }
    /** @soyTemplate */
    getAriaDescribedBy() {
        const hasSupport = !!this.getSupportingText();
        const hasCounter = this.hasCounter();
        // TODO(b/244609052): remove parens
        return (hasSupport || hasCounter) ?
            `${hasSupport ? this.supportingTextId : ''} ${hasCounter ? this.counterId : ''}` :
            '';
    }
    /** @soyTemplate */
    renderPrefix() {
        return this.prefixText ?
            y `<span class="md3-text-field__prefix">${this.prefixText}</span>` :
            y ``;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderAffix(/* isSuffix */ false);
    }
    /** @soyTemplate */
    renderSuffix() {
        return this.suffixText ?
            y `<span class="md3-text-field__suffix">${this.suffixText}</span>` :
            y ``;
        // TODO(b/217441842): Create shared function once argument bug is fixed
        // return this.renderAffix(/* isSuffix */ true);
    }
    /**
     * @soyTemplate
     * @slotName supporting-text
     */
    renderSupportingText() {
        const shouldAlert = this.shouldErrorAnnounce();
        const text = this.getSupportingText();
        const template = y `<span id=${this.supportingTextId} 
      slot="supporting-text" 
      role=${l$1(shouldAlert ? 'alert' : undefined)}>${text}</span>`;
        return text ? template : y ``;
    }
    /** @soyTemplate */
    getSupportingText() {
        const errorText = this.getErrorText();
        return this.getError() && errorText ? errorText : this.supportingText;
    }
    /** @soyTemplate */
    getErrorText() {
        return this.error ? this.errorText : this.nativeErrorText;
    }
    /** @soyTemplate */
    shouldErrorAnnounce() {
        // Announce if there is an error and error text visible.
        // If refreshErrorAlert is true, do not announce. This will remove the
        // role="alert" attribute. Another render cycle will happen after an
        // animation frame to re-add the role.
        return this.getError() && !!this.getErrorText() && !this.refreshErrorAlert;
    }
    /**
     * @soyTemplate
     * @slotName supporting-text-end
     */
    renderCounter() {
        const counter = y `<span id=${this.counterId}
       class="md3-text-field__counter"
       slot="supporting-text-end">${this.getCounterText()}</span>`;
        // TODO(b/244473435): add aria-label and announcements
        return this.hasCounter() ? counter : y ``;
    }
    // TODO(b/244197198): replace with !!this.getCounterText()
    /** @soyTemplate */
    hasCounter() {
        return this.maxLength > -1;
    }
    /** @soyTemplate */
    getCounterText() {
        // TODO(b/244197198): replace with string return
        const length = this.value.length;
        return this.hasCounter() ? y `${length} / ${this.maxLength}` : y ``;
    }
    update(changedProperties) {
        // Consider a value change anything that is not the initial empty string
        // value.
        const valueHasChanged = changedProperties.has('value') &&
            changedProperties.get('value') !== undefined;
        if (valueHasChanged && !this.ignoreNextValueChange) {
            this.valueHasChanged = true;
        }
        if (this.ignoreNextValueChange) {
            this.ignoreNextValueChange = false;
        }
        super.update(changedProperties);
    }
    updated(changedProperties) {
        // If a property such as `type` changes and causes the internal <input>
        // value to change without dispatching an event, re-sync it.
        const value = this.getInput().value;
        if (this.value !== value) {
            // Don't consider these updates (such as setting `defaultValue`) as
            // the developer directly changing the `value`.
            this.ignoreNextValueChange = true;
            // Note this is typically inefficient in updated() since it schedules
            // another update. However, it is needed for the <input> to fully render
            // before checking its value.
            this.value = value;
        }
        if (this.refreshErrorAlert) {
            // The past render cycle removed the role="alert" from the error message.
            // Re-add it after an animation frame to re-announce the error.
            requestAnimationFrame(() => {
                this.refreshErrorAlert = false;
            });
        }
    }
    /** @bubbleWizEvent */
    handleClick() {
        this.focus();
    }
    /** @bubbleWizEvent */
    handleFocusin(event) {
        this.focused = true;
    }
    /** @bubbleWizEvent */
    handleFocusout(event) {
        if (this.matches(':focus-within')) {
            // Changing focus to another child within the text field, like a button
            return;
        }
        this.focused = false;
    }
    handleInput(event) {
        this.dirty = true;
        this.value = event.target.value;
        this.redispatchEvent(event);
    }
    redispatchEvent(event) {
        redispatchEvent(this, event);
    }
    getInput() {
        if (!this.input) {
            // If the input is not yet defined, synchronously render.
            // e.g.
            // const textField = document.createElement('md-outlined-text-field');
            // document.body.appendChild(textField);
            // textField.focus(); // synchronously render
            this.connectedCallback();
            this.scheduleUpdate();
        }
        if (this.isUpdatePending) {
            // If there are pending updates, synchronously perform them. This ensures
            // that constraint validation properties (like `required`) are synced
            // before interacting with input APIs that depend on them.
            this.scheduleUpdate();
        }
        return this.input;
    }
    checkValidityAndDispatch() {
        const valid = this.getInput().checkValidity();
        let canceled = false;
        if (!valid) {
            canceled = !this.dispatchEvent(new Event('invalid', { cancelable: true }));
        }
        return { valid, canceled };
    }
    handleIconChange() {
        this.hasLeadingIcon = this.leadingIcons.length > 0;
        this.hasTrailingIcon = this.trailingIcons.length > 0;
    }
}
TextField.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "disabled", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "error", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "errorText", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", String)
], TextField.prototype, "label", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "required", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "value", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "defaultValue", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "prefixText", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "suffixText", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], TextField.prototype, "hasLeadingIcon", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], TextField.prototype, "hasTrailingIcon", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "supportingText", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "textDirection", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-autocomplete', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaAutoComplete", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-controls', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaControls", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-activedescendant', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaActiveDescendant", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-expanded', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaExpanded", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaLabel", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-aria-labelledby', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "ariaLabelledBy", void 0);
__decorate([
    e$8({ type: String, attribute: 'data-role', noAccessor: true }),
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    __metadata("design:type", String)
], TextField.prototype, "role", void 0);
__decorate([
    e$8({ type: String, reflect: true, converter: stringConverter }),
    __metadata("design:type", Object)
], TextField.prototype, "name", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "max", void 0);
__decorate([
    e$8({ type: Number }),
    __metadata("design:type", Object)
], TextField.prototype, "maxLength", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "min", void 0);
__decorate([
    e$8({ type: Number }),
    __metadata("design:type", Object)
], TextField.prototype, "minLength", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "pattern", void 0);
__decorate([
    e$8({ type: String, reflect: true, converter: stringConverter }),
    __metadata("design:type", Object)
], TextField.prototype, "placeholder", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], TextField.prototype, "readOnly", void 0);
__decorate([
    e$8({ type: String }),
    __metadata("design:type", Object)
], TextField.prototype, "step", void 0);
__decorate([
    e$8({ type: String, reflect: true }),
    __metadata("design:type", String)
], TextField.prototype, "type", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "dirty", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "focused", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "refreshErrorAlert", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "valueHasChanged", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "nativeError", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], TextField.prototype, "nativeErrorText", void 0);
__decorate([
    i$5('.md3-text-field__input'),
    __metadata("design:type", HTMLInputElement)
], TextField.prototype, "input", void 0);
__decorate([
    l$6({ slot: 'leadingicon' }),
    __metadata("design:type", Array)
], TextField.prototype, "leadingIcons", void 0);
__decorate([
    l$6({ slot: 'trailingicon' }),
    __metadata("design:type", Array)
], TextField.prototype, "trailingIcons", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class OutlinedTextField extends TextField {
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-text-field--outlined': true,
        };
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$6 = i$4 `:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.md3-text-field{display:inline-flex;flex:1}.md3-text-field__field{cursor:text;flex:1}.md3-text-field--disabled .md3-text-field__field{cursor:default}.md3-text-field__counter{white-space:nowrap}.md3-text-field__icon{display:flex}.md3-text-field__icon ::slotted(*){display:flex}.md3-text-field__icon--leading{color:var(--_leading-icon-color)}.md3-text-field__icon--trailing{color:var(--_trailing-icon-color)}:hover .md3-text-field__icon--leading{color:var(--_hover-leading-icon-color)}:hover .md3-text-field__icon--trailing{color:var(--_hover-trailing-icon-color)}:focus-within .md3-text-field__icon--leading{color:var(--_focus-leading-icon-color)}:focus-within .md3-text-field__icon--trailing{color:var(--_focus-trailing-icon-color)}.md3-text-field--disabled .md3-text-field__icon--leading{color:var(--_disabled-leading-icon-color);opacity:var(--_disabled-leading-icon-opacity)}.md3-text-field--disabled .md3-text-field__icon--trailing{color:var(--_disabled-trailing-icon-color);opacity:var(--_disabled-trailing-icon-opacity)}.md3-text-field--error:not(.md3-text-field--disabled) .md3-text-field__icon--leading{color:var(--_error-leading-icon-color)}.md3-text-field--error:not(.md3-text-field--disabled) .md3-text-field__icon--trailing{color:var(--_error-trailing-icon-color)}.md3-text-field--error:not(.md3-text-field--disabled):hover .md3-text-field__icon--leading{color:var(--_error-hover-leading-icon-color)}.md3-text-field--error:not(.md3-text-field--disabled):hover .md3-text-field__icon--trailing{color:var(--_error-hover-trailing-icon-color)}.md3-text-field--error:not(.md3-text-field--disabled):focus-within .md3-text-field__icon--leading{color:var(--_error-focus-leading-icon-color)}.md3-text-field--error:not(.md3-text-field--disabled):focus-within .md3-text-field__icon--trailing{color:var(--_error-focus-trailing-icon-color)}.md3-text-field__input{appearance:none;background:none;border:none;caret-color:var(--_caret-color);color:currentColor;outline:none;padding:0;text-align:inherit;width:100%}.md3-text-field__input::placeholder{color:currentColor;opacity:1}.md3-text-field__input::-webkit-calendar-picker-indicator{display:none}@media(forced-colors: active){.md3-text-field__input{background-color:Field}}:focus-within .md3-text-field__input{caret-color:var(--_focus-caret-color)}.md3-text-field--error:focus-within .md3-text-field__input{caret-color:var(--_error-focus-caret-color)}.md3-text-field__input,.md3-text-field__prefix,.md3-text-field__suffix{font-family:var(--_input-text-font);font-size:var(--_input-text-size);font-weight:var(--_input-text-weight);letter-spacing:var(--_input-text-tracking);line-height:var(--_input-text-line-height)}.md3-text-field:not(.md3-text-field--disabled) .md3-text-field__prefix,.md3-text-field:not(.md3-text-field--disabled) .md3-text-field__suffix{color:var(--_input-text-prefix-color)}.md3-text-field:not(.md3-text-field--disabled) .md3-text-field__input::placeholder{color:var(--_input-text-placeholder-color)}.md3-text-field__prefix{padding-inline-end:var(--_input-text-prefix-padding)}.md3-text-field__suffix{padding-inline-start:var(--_input-text-suffix-padding)}/*# sourceMappingURL=shared-styles.css.map */
`;

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdOutlinedTextField = class MdOutlinedTextField extends OutlinedTextField {
    constructor() {
        super(...arguments);
        this.fieldTag = i$1 `md-outlined-field`;
    }
};
MdOutlinedTextField.styles = [styles$6, styles$7, styles$8];
MdOutlinedTextField = __decorate([
    e$9('md-outlined-text-field')
], MdOutlinedTextField);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class Icon extends s$2 {
    /** @soyTemplate */
    render() {
        return y `<span><slot></slot></span>`;
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$5 = i$4 `:host{--_color: var(--md-icon-color, inherit);--_font: var(--md-icon-font, "Material Icons");--_font-variation-settings: var(--md-icon-font-variation-settings, inherit);--_size: var(--md-icon-size, 24px);--_weight: var(--md-icon-weight, 400);display:inline-flex;color:var(--_color);font-family:var(--_font);font-weight:var(--_weight);font-style:normal;font-size:var(--_size);font-variation-settings:var(--_font-varation-settings);line-height:1;letter-spacing:normal;text-transform:none;white-space:nowrap;word-wrap:normal;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale}span ::slotted(svg){fill:currentColor}span ::slotted(*){height:var(--_size);width:var(--_size)}/*# sourceMappingURL=icon-styles.css.map */
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdIcon = class MdIcon extends Icon {
};
MdIcon.styles = [styles$5];
MdIcon = __decorate([
    e$9('md-icon')
], MdIcon);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Enumeration to keep track of the lifecycle of a touch event.
 */
// State transition diagram:
//     +-----------------------------+
//     |                             v
//     |    +------+------ WAITING_FOR_MOUSE_CLICK<----+
//     |    |      |                ^                  |
//     |    V      |                |                  |
// => INACTIVE -> TOUCH_DELAY -> RELEASING          HOLDING
//                 |                                   ^
//                 |                                   |
//                 +-----------------------------------+
var Phase;
(function (Phase) {
    // Initial state of the control, no touch in progress.
    // Transitions:
    //     on touch down: transition to TOUCH_DELAY.
    //     on mouse down: transition to WAITING_FOR_MOUSE_CLICK.
    Phase["INACTIVE"] = "INACTIVE";
    // Touch down has been received, waiting to determine if it's a swipe.
    // Transitions:
    //     on touch up: beginPress(); transition to RELEASING.
    //     on cancel: transition to INACTIVE.
    //     after TOUCH_DELAY_MS: beginPress(); transition to HOLDING.
    Phase["TOUCH_DELAY"] = "TOUCH_DELAY";
    // A touch has been deemed to be a press
    // Transitions:
    //     on pointerup: endPress(); transition to WAITING_FOR_MOUSE_CLICK.
    Phase["HOLDING"] = "HOLDING";
    // The user has released the mouse / touch, but we want to delay calling
    // endPress for a little bit to avoid double clicks.
    // Transitions:
    //    mouse sequence after debounceDelay: endPress(); transition to INACTIVE
    //    when in touch sequence: transitions directly to WAITING_FOR_MOUSE_CLICK
    Phase["RELEASING"] = "RELEASING";
    // The user has touched, but we want to delay endPress until synthetic mouse
    // click event occurs. Stay in this state for a fixed amount of time before
    // giving up and transitioning into rest state.
    // Transitions:
    //     on click: endPress(); transition to INACTIVE.
    //     after WAIT_FOR_MOUSE_CLICK_MS: transition to INACTIVE.
    Phase["WAITING_FOR_MOUSE_CLICK"] = "WAITING_FOR_MOUSE_CLICK";
})(Phase || (Phase = {}));
/**
 * Delay time from touchstart to when element#beginPress is invoked.
 */
const TOUCH_DELAY_MS = 150;
/**
 * Delay time from beginning to wait for synthetic mouse events till giving up.
 */
const WAIT_FOR_MOUSE_CLICK_MS = 500;
/**
 * ActionController normalizes user interaction on components and distills it
 * into calling `beginPress` and `endPress` on the component.
 *
 * `beginPress` is a good hook to affect visuals for pressed state, including
 * ripple.
 *
 * `endPress` is a good hook for firing events based on user interaction, and
 * cleaning up the pressed visual state.
 *
 * A component using an ActionController need only implement the ActionElement
 * interface and add the ActionController's event listeners to understand user
 * interaction.
 */
class ActionController {
    constructor(element) {
        this.element = element;
        this.phase = Phase.INACTIVE;
        this.touchTimer = null;
        this.clickTimer = null;
        this.lastPositionEvent = null;
        this.pressed = false;
        this.checkBoundsAfterContextMenu = false;
        // event listeners
        /**
         * Pointer down event handler.
         */
        this.pointerDown = (e) => {
            if (!this.shouldRespondToEvent(e) || this.phase !== Phase.INACTIVE) {
                return;
            }
            if (this.isTouch(e)) {
                // after a longpress contextmenu event, an extra `pointerdown` can be
                // dispatched to the pressed element. Check that the down is within
                // bounds of the element in this case.
                if (this.checkBoundsAfterContextMenu && !this.inBounds(e)) {
                    return;
                }
                this.checkBoundsAfterContextMenu = false;
                this.lastPositionEvent = e;
                this.setPhase(Phase.TOUCH_DELAY);
                this.touchTimer = setTimeout(() => {
                    this.touchDelayFinished();
                }, TOUCH_DELAY_MS);
            }
            else {
                const leftButtonPressed = e.button === 0;
                if (!leftButtonPressed ||
                    (this.ignoreClicksWithModifiers && this.eventHasModifiers(e))) {
                    return;
                }
                this.setPhase(Phase.WAITING_FOR_MOUSE_CLICK);
                this.beginPress(e);
            }
        };
        /**
         * Pointer up event handler.
         */
        this.pointerUp = (e) => {
            if (!this.isTouch(e) || !this.shouldRespondToEvent(e)) {
                return;
            }
            if (this.phase === Phase.HOLDING) {
                this.waitForClick();
            }
            else if (this.phase === Phase.TOUCH_DELAY) {
                this.setPhase(Phase.RELEASING);
                this.beginPress();
                this.waitForClick();
            }
        };
        /**
         * Click event handler.
         */
        this.click = (e) => {
            if (this.disabled ||
                (this.ignoreClicksWithModifiers && this.eventHasModifiers(e))) {
                return;
            }
            if (this.phase === Phase.WAITING_FOR_MOUSE_CLICK) {
                this.endPress();
                this.setPhase(Phase.INACTIVE);
                return;
            }
            // keyboard synthesized click event
            if (this.phase === Phase.INACTIVE && !this.pressed) {
                this.press();
            }
        };
        /**
         * Pointer leave event handler.
         */
        this.pointerLeave = (e) => {
            // cancel a held press that moves outside the element
            if (this.shouldRespondToEvent(e) && !this.isTouch(e) && this.pressed) {
                this.cancelPress();
            }
        };
        /**
         * Pointer cancel event handler.
         */
        this.pointerCancel = (e) => {
            if (this.shouldRespondToEvent(e)) {
                this.cancelPress();
            }
        };
        /**
         * Contextmenu event handler.
         */
        this.contextMenu = () => {
            if (!this.disabled) {
                this.checkBoundsAfterContextMenu = true;
                this.cancelPress();
            }
        };
        this.element.addController(this);
    }
    get disabled() {
        return this.element.disabled;
    }
    get ignoreClicksWithModifiers() {
        return this.element.ignoreClicksWithModifiers ?? false;
    }
    setPhase(newPhase) {
        this.phase = newPhase;
    }
    /**
     * Calls beginPress and then endPress. Allows us to programmatically click
     * on the element.
     */
    press() {
        this.beginPress(/* positionEvent= */ null);
        this.setPhase(Phase.INACTIVE);
        this.endPress();
    }
    /**
     * Call `beginPress` on element with triggering event, if applicable.
     */
    beginPress(positionEvent = this.lastPositionEvent) {
        this.pressed = true;
        this.element.beginPress({ positionEvent });
    }
    /**
     * Call `endPress` on element, and clean up timers.
     */
    endPress() {
        this.pressed = false;
        this.element.endPress({ cancelled: false });
        this.cleanup();
    }
    cleanup() {
        if (this.touchTimer) {
            clearTimeout(this.touchTimer);
        }
        this.touchTimer = null;
        if (this.clickTimer) {
            clearTimeout(this.clickTimer);
        }
        this.clickTimer = null;
        this.lastPositionEvent = null;
    }
    /**
     * Call `endPress` with cancelled state on element, and cleanup timers.
     */
    cancelPress() {
        this.pressed = false;
        this.cleanup();
        if (this.phase === Phase.TOUCH_DELAY) {
            this.setPhase(Phase.INACTIVE);
        }
        else if (this.phase !== Phase.INACTIVE) {
            this.setPhase(Phase.INACTIVE);
            this.element.endPress({ cancelled: true });
        }
    }
    isTouch(e) {
        return e.pointerType === 'touch';
    }
    touchDelayFinished() {
        if (this.phase !== Phase.TOUCH_DELAY) {
            return;
        }
        this.setPhase(Phase.HOLDING);
        this.beginPress();
    }
    waitForClick() {
        this.setPhase(Phase.WAITING_FOR_MOUSE_CLICK);
        this.clickTimer = setTimeout(() => {
            // If a click event does not occur, clean up the interaction state.
            if (this.phase === Phase.WAITING_FOR_MOUSE_CLICK) {
                this.cancelPress();
            }
        }, WAIT_FOR_MOUSE_CLICK_MS);
    }
    /**
     * Check if event should trigger actions on the element.
     */
    shouldRespondToEvent(e) {
        return !this.disabled && e.isPrimary;
    }
    /**
     * Check if the event is within the bounds of the element.
     *
     * This is only needed for the "stuck" contextmenu longpress on Chrome.
     */
    inBounds(ev) {
        const { top, left, bottom, right } = this.element.getBoundingClientRect();
        const { x, y } = ev;
        return x >= left && x <= right && y >= top && y <= bottom;
    }
    eventHasModifiers(e) {
        return e.altKey || e.ctrlKey || e.shiftKey || e.metaKey;
    }
    /**
     * Cancel interactions if the element is removed from the DOM.
     */
    hostDisconnected() {
        this.cancelPress();
    }
    /**
     * If the element becomes disabled, cancel interactions.
     */
    hostUpdated() {
        if (this.disabled) {
            this.cancelPress();
        }
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 *
 * ActionElement is a base class that provides a handy starting point for using
 * ActionController. Subclasses should add the event handlers on the interactive
 * node in the template, and override `beginPress` and `endPress` to handle
 * pressed state, ripple interaction, and any other "press" interaction.
 */
class ActionElement extends s$2 {
    constructor() {
        super(...arguments);
        this.actionController = new ActionController(this);
    }
    /**
     * Hook method called when we've confirmed that the gesture is intended to be
     * a press. Subclasses should change the visual state of the control to
     * 'active' at this point, and possibly fire an event. Subclasses should
     * override this method if more needs to be done.
     *
     * @param options `positionEvent` is the Event that is considered the
     * beginning of the press. Null if this was a keyboard interaction.
     */
    beginPress(options) { }
    /**
     * Hook method called when the control goes from a pressed to unpressed
     * state.
     *
     * @param options If `cancelled` is true, means the user canceled the action.
     *    Subclasses which trigger events on endPress() should check the value
     *    of this flag, and modify their behavior accordingly.
     */
    endPress({ cancelled, actionData }) {
        if (!cancelled) {
            this.dispatchEvent(new CustomEvent('action', {
                detail: actionData,
                bubbles: true,
                composed: true,
            }));
        }
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@pointerdown="${this.handlePointerDown}"`
     */
    handlePointerDown(e) {
        this.actionController.pointerDown(e);
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@pointerup="${this.handlePointerUp}"`
     */
    handlePointerUp(e) {
        this.actionController.pointerUp(e);
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@pointercancel="${this.handlePointerCancel}"`
     */
    handlePointerCancel(e) {
        this.actionController.pointerCancel(e);
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@pointerleave="${this.handlePointerleave}"`
     */
    handlePointerLeave(e) {
        this.actionController.pointerLeave(e);
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@click="${this.handleClick}"`
     */
    handleClick(e) {
        this.actionController.click(e);
    }
    /**
     * Hook method for the ActionController.
     * Subclasses should add this method as an event handler on the interactive
     * template element with `@contextmenu="${this.handleContextMenu}"`
     */
    handleContextMenu() {
        this.actionController.contextMenu();
    }
}

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 */
class FabShared extends ActionElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.icon = '';
        this.label = '';
        this.lowered = false;
        this.reducedTouchTarget = false;
        this.showFocusRing = false;
    }
    /**
     * @soyTemplate
     * @soyClasses fabClasses: .md3-fab
     */
    render() {
        const ariaLabel = this.label ? this.label : this.icon;
        return y `
      <button
        class="md3-fab md3-surface ${o(this.getRenderClasses())}"
        ?disabled="${this.disabled}"
        aria-label="${ariaLabel}"
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
        @pointerup="${this.handlePointerUp}"
        @pointercancel="${this.handlePointerCancel}"
        @pointerleave="${this.handlePointerLeave}"
        @pointerenter="${this.handlePointerEnter}"
        @click="${this.handleClick}"
        @contextmenu="${this.handleContextMenu}">
        ${this.renderElevation()}
        ${this.renderFocusRing()}
        ${this.renderRipple()}
        <span class="md3-fab__icon">
          <slot name="icon">${this.renderIcon(this.icon)}</slot>
        </span>
        ${this.renderLabel()}
        ${this.renderTouchTarget()}
      </button>`;
    }
    /** @soyTemplate */
    getRenderClasses() {
        return { 'md3-fab--lowered': this.lowered };
    }
    /** @soyTemplate */
    renderTouchTarget() {
        return this.reducedTouchTarget ? y `` :
            y `<div class="md3-fab__touch"></div>`;
    }
    /** @soyTemplate */
    renderLabel() {
        return '';
    }
    /** @soyTemplate */
    renderElevation() {
        return y `<md-elevation shadow surface></md-elevation>`;
    }
    /** @soyTemplate */
    renderRipple() {
        return y `<md-ripple class="md3-fab__ripple" ?disabled="${this.disabled}"></md-ripple>`;
    }
    /** @soyTemplate */
    renderFocusRing() {
        return y `<md-focus-ring .visible="${this.showFocusRing}"></md-focus-ring>`;
    }
    beginPress({ positionEvent }) {
        this.ripple.beginPress(positionEvent);
    }
    endPress(options) {
        this.ripple.endPress();
        super.endPress(options);
    }
    handlePointerDown(e) {
        super.handlePointerDown(e);
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
    handlePointerEnter(e) {
        this.ripple.beginHover(e);
    }
    handlePointerLeave(e) {
        super.handlePointerLeave(e);
        this.ripple.endHover();
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handleBlur() {
        this.showFocusRing = false;
    }
}
FabShared.shadowRootOptions = { mode: 'open', delegatesFocus: true };
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "disabled", void 0);
__decorate([
    e$8(),
    __metadata("design:type", Object)
], FabShared.prototype, "icon", void 0);
__decorate([
    e$8(),
    __metadata("design:type", Object)
], FabShared.prototype, "label", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "lowered", void 0);
__decorate([
    e$8({ type: Boolean }),
    __metadata("design:type", Object)
], FabShared.prototype, "reducedTouchTarget", void 0);
__decorate([
    i$5('md-ripple'),
    __metadata("design:type", MdRipple)
], FabShared.prototype, "ripple", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], FabShared.prototype, "showFocusRing", void 0);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 */
class Fab extends FabShared {
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-fab--regular': true,
        };
    }
    /** @soyTemplate */
    renderIcon(icon) {
        return '';
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$4 = i$4 `:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:top}:host([disabled]){cursor:default;pointer-events:none}.md3-fab{display:inline-flex;border:none;outline:none;user-select:none;-webkit-appearance:none;vertical-align:middle;text-decoration:none;align-items:center;justify-content:center;position:relative;z-index:0;background-color:var(--_container-color);--md-focus-ring-shape-start-start:var(--_container-shape);--md-focus-ring-shape-start-end:var(--_container-shape);--md-focus-ring-shape-end-end:var(--_container-shape);--md-focus-ring-shape-end-start:var(--_container-shape);--md-ripple-hover-state-layer-color:var(--_hover-state-layer-color);--md-ripple-focus-state-layer-color:var(--_focus-state-layer-color);--md-ripple-pressed-state-layer-color:var(--_pressed-state-layer-color);--md-ripple-hover-state-layer-opacity:var(--_hover-state-layer-opacity);--md-ripple-focus-state-layer-opacity:var(--_focus-state-layer-opacity);--md-ripple-pressed-state-layer-opacity:var(--_pressed-state-layer-opacity);--md-elevation-duration:280ms;--md-elevation-level:var(--_container-elevation);--md-elevation-shadow-color:var(--_container-shadow-color);--md-elevation-surface-tint-color:var(--_container-surface-tint-layer-color)}.md3-fab.md3-fab--lowered{--md-elevation-level:var(--_lowered-container-elevation)}.md3-fab:focus{--md-elevation-level:var(--_focus-container-elevation)}.md3-fab:focus.md3-fab--lowered{--md-elevation-level:var(--_lowered-focus-container-elevation)}.md3-fab:hover{cursor:pointer;--md-elevation-level:var(--_hover-container-elevation)}.md3-fab:hover.md3-fab--lowered{--md-elevation-level:var(--_lowered-hover-container-elevation)}.md3-fab:active{outline:none;--md-elevation-level:var(--_pressed-container-elevation)}.md3-fab:active.md3-fab--lowered{--md-elevation-level:var(--_lowered-pressed-container-elevation)}md-elevation{inset:0;position:absolute;z-index:-1}.md3-fab__ripple{overflow:hidden;z-index:-1}.md3-fab,.md3-fab__ripple{border-radius:var(--_container-shape)}.md3-fab__icon{display:inline-flex}.md3-fab__touch{position:absolute;top:50%;height:48px;left:50%;width:48px;transform:translate(-50%, -50%)}.md3-fab__icon ::slotted(*),.md3-fab__icon{color:var(--_icon-color);font-size:var(--_icon-size);height:var(--_icon-size);width:var(--_icon-size)}.md3-fab:hover .md3-fab__icon ::slotted(*),.md3-fab:hover .md3-fab__icon{color:var(--_hover-icon-color)}.md3-fab:focus .md3-fab__icon ::slotted(*),.md3-fab:focus .md3-fab__icon{color:var(--_focus-icon-color)}.md3-fab:active .md3-fab__icon ::slotted(*),.md3-fab:active .md3-fab__icon{color:var(--_pressed-icon-color)}@media(forced-colors: active){.md3-fab{--md-focus-ring-offset-vertical:3px;--md-focus-ring-offset-horizontal:3px;border:1px solid ButtonText}}/*# sourceMappingURL=fab-shared-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$3 = i$4 `:host{--_container-color: var(--md-fab-container-color, var(--md-sys-color-surface, #fffbfe));--_container-elevation: var(--md-fab-container-elevation, 3);--_container-height: var(--md-fab-container-height, 56px);--_container-shadow-color: var(--md-fab-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-fab-container-shape, 16px);--_container-surface-tint-layer-color: var(--md-fab-container-surface-tint-layer-color, var(--md-sys-color-primary, #6750a4));--_container-width: var(--md-fab-container-width, 56px);--_focus-container-elevation: var(--md-fab-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-fab-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-fab-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-fab-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-icon-size, 24px);--_lowered-container-elevation: var(--md-fab-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-pressed-state-layer-opacity, 0.12)}.md3-fab{width:var(--_container-width);height:var(--_container-height)}.md3-fab--regular{padding:0}/*# sourceMappingURL=fab-styles.css.map */
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdFab = class MdFab extends Fab {
    /** @soyTemplate */
    renderIcon(icon) {
        return icon ? y `<md-icon class="md3-fab__icon">${icon}</md-icon>` : '';
    }
};
MdFab.styles = [styles$4, styles$3];
MdFab = __decorate([
    e$9('md-fab')
], MdFab);

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 */
class FabExtended extends FabShared {
    /** @soyTemplate */
    getRenderClasses() {
        return {
            ...super.getRenderClasses(),
            'md3-fab--extended': true,
        };
    }
    /** @soyTemplate */
    renderIcon(icon) {
        return '';
    }
    /** @soyTemplate */
    renderLabel() {
        return y `<span class="md3-fab__label">${this.label}</span>`;
    }
}

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$2 = i$4 `:host{--_container-color: var(--md-fab-extended-container-color, var(--md-sys-color-surface, #fffbfe));--_container-elevation: var(--md-fab-extended-container-elevation, 3);--_container-height: var(--md-fab-extended-container-height, 56px);--_container-shadow-color: var(--md-fab-extended-container-shadow-color, var(--md-sys-color-shadow, #000));--_container-shape: var(--md-fab-extended-container-shape, 16px);--_container-surface-tint-layer-color: var(--md-fab-extended-container-surface-tint-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-container-elevation: var(--md-fab-extended-focus-container-elevation, 3);--_focus-icon-color: var(--md-fab-extended-focus-icon-color, var(--md-sys-color-primary, #6750a4));--_focus-label-text-color: var(--md-fab-extended-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-color: var(--md-fab-extended-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_focus-state-layer-opacity: var(--md-fab-extended-focus-state-layer-opacity, 0.12);--_hover-container-elevation: var(--md-fab-extended-hover-container-elevation, 4);--_hover-icon-color: var(--md-fab-extended-hover-icon-color, var(--md-sys-color-primary, #6750a4));--_hover-label-text-color: var(--md-fab-extended-hover-label-text-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-color: var(--md-fab-extended-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_hover-state-layer-opacity: var(--md-fab-extended-hover-state-layer-opacity, 0.08);--_icon-color: var(--md-fab-extended-icon-color, var(--md-sys-color-primary, #6750a4));--_icon-size: var(--md-fab-extended-icon-size, 24px);--_label-text-color: var(--md-fab-extended-label-text-color, var(--md-sys-color-primary, #6750a4));--_label-text-font: var(--md-fab-extended-label-text-font, Roboto);--_label-text-line-height: var(--md-fab-extended-label-text-line-height, 1.25rem);--_label-text-size: var(--md-fab-extended-label-text-size, 0.875rem);--_label-text-tracking: var(--md-fab-extended-label-text-tracking, 0.006rem);--_label-text-type: var(--md-fab-extended-label-text-type, 500 0.875rem / 1.25rem Roboto);--_label-text-weight: var(--md-fab-extended-label-text-weight, 500);--_lowered-container-elevation: var(--md-fab-extended-lowered-container-elevation, 1);--_lowered-focus-container-elevation: var(--md-fab-extended-lowered-focus-container-elevation, 1);--_lowered-hover-container-elevation: var(--md-fab-extended-lowered-hover-container-elevation, 2);--_lowered-pressed-container-elevation: var(--md-fab-extended-lowered-pressed-container-elevation, 1);--_pressed-container-elevation: var(--md-fab-extended-pressed-container-elevation, 3);--_pressed-icon-color: var(--md-fab-extended-pressed-icon-color, var(--md-sys-color-primary, #6750a4));--_pressed-label-text-color: var(--md-fab-extended-pressed-label-text-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-color: var(--md-fab-extended-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_pressed-state-layer-opacity: var(--md-fab-extended-pressed-state-layer-opacity, 0.12)}.md3-fab--extended{box-sizing:border-box;padding-inline-start:16px;padding-inline-end:20px;height:var(--_container-height);font-family:var(--_label-text-font);line-height:var(--_label-text-line-height);font-size:var(--_label-text-size);font-weight:var(--_label-text-weight);letter-spacing:var(--_label-text-tracking)}.md3-fab__label{padding-inline-start:12px;color:var(--_label-text-color)}.md3-fab:hover .md3-fab__label{color:var(--_hover-label-text-color)}.md3-fab:focus .md3-fab__label{color:var(--_focus-label-text-color)}.md3-fab:active .md3-fab__label{color:var(--_pressed-label-text-color)}@media(forced-colors: active){.md3-fab--extended{padding-inline-start:15px;padding-inline-end:19px}}/*# sourceMappingURL=fab-extended-styles.css.map */
`;

/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
let MdFabExtended = class MdFabExtended extends FabExtended {
    /** @soyTemplate */
    renderIcon(icon) {
        return icon ? y `<md-icon class="md3-fab__icon">${icon}</md-icon>` : '';
    }
};
MdFabExtended.styles = [styles$4, styles$2];
MdFabExtended = __decorate([
    e$9('md-fab-extended')
], MdFabExtended);

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * A checkbox component.
 */
class Checkbox extends s$2 {
    constructor() {
        super();
        this.checked = false;
        this.disabled = false;
        this.error = false;
        this.indeterminate = false;
        this.value = 'on';
        this.name = '';
        this.prevChecked = false;
        this.prevDisabled = false;
        this.prevIndeterminate = false;
        this.showFocusRing = false;
        this.showRipple = false;
        this.getRipple = () => {
            this.showRipple = true;
            return this.ripple;
        };
        this.renderRipple = () => {
            return y `<md-ripple ?disabled=${this.disabled} unbounded></md-ripple>`;
        };
        this.addController(new FormController(this));
        this.addEventListener('click', (event) => {
            if (!isActivationClick(event)) {
                return;
            }
            this.focus();
            dispatchActivationClick(this.input);
        });
    }
    get form() {
        return this.closest('form');
    }
    focus() {
        this.input?.focus();
    }
    [getFormValue]() {
        return this.checked ? this.value : null;
    }
    update(changed) {
        if (changed.has('checked') || changed.has('disabled') ||
            changed.has('indeterminate')) {
            this.prevChecked = changed.get('checked') ?? this.checked;
            this.prevDisabled = changed.get('disabled') ?? this.disabled;
            this.prevIndeterminate =
                changed.get('indeterminate') ?? this.indeterminate;
        }
        super.update(changed);
    }
    render() {
        const prevNone = !this.prevChecked && !this.prevIndeterminate;
        const prevChecked = this.prevChecked && !this.prevIndeterminate;
        const prevIndeterminate = this.prevIndeterminate;
        const isChecked = this.checked && !this.indeterminate;
        const isIndeterminate = this.indeterminate;
        const containerClasses = o({
            'selected': isChecked || isIndeterminate,
            'unselected': !isChecked && !isIndeterminate,
            'checked': isChecked,
            'indeterminate': isIndeterminate,
            'error': this.error && !this.disabled,
            'prev-unselected': prevNone,
            'prev-checked': prevChecked,
            'prev-indeterminate': prevIndeterminate,
            'prev-disabled': this.prevDisabled,
        });
        return y `
      <div class="container ${containerClasses}">
        <div class="outline"></div>
        <div class="background"></div>
        <md-focus-ring .visible=${this.showFocusRing}></md-focus-ring>
        ${n$1(this.showRipple, this.renderRipple)}
        <svg class="icon" viewBox="0 0 18 18">
          <rect class="mark short" />
          <rect class="mark long" />
        </svg>
      </div>
      <input type="checkbox"
        aria-checked=${isIndeterminate ? 'mixed' : b}
        aria-label=${this.ariaLabel || b}
        ?disabled=${this.disabled}
        .indeterminate=${this.indeterminate}
        .checked=${this.checked}
        @blur=${this.handleBlur}
        @change=${this.handleChange}
        @focus=${this.handleFocus}
        @pointerdown=${this.handlePointerDown}
        ${ripple(this.getRipple)}
      >
     `;
    }
    handleBlur() {
        this.showFocusRing = false;
    }
    handleChange(event) {
        const target = event.target;
        this.checked = target.checked;
        this.indeterminate = target.indeterminate;
        redispatchEvent(this, event);
    }
    handleFocus() {
        this.showFocusRing = shouldShowStrongFocus();
    }
    handlePointerDown() {
        pointerPress();
        this.showFocusRing = shouldShowStrongFocus();
    }
}
Checkbox.formAssociated = true;
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Checkbox.prototype, "checked", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Checkbox.prototype, "disabled", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Checkbox.prototype, "error", void 0);
__decorate([
    e$8({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], Checkbox.prototype, "indeterminate", void 0);
__decorate([
    e$8(),
    __metadata("design:type", Object)
], Checkbox.prototype, "value", void 0);
__decorate([
    e$8(),
    __metadata("design:type", Object)
], Checkbox.prototype, "name", void 0);
__decorate([
    ariaProperty // tslint:disable-line:no-new-decorators
    ,
    e$8({ type: String, attribute: 'data-aria-label', noAccessor: true }),
    __metadata("design:type", String)
], Checkbox.prototype, "ariaLabel", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Checkbox.prototype, "prevChecked", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Checkbox.prototype, "prevDisabled", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Checkbox.prototype, "prevIndeterminate", void 0);
__decorate([
    e$7('md-ripple'),
    __metadata("design:type", Promise)
], Checkbox.prototype, "ripple", void 0);
__decorate([
    i$5('input'),
    __metadata("design:type", HTMLInputElement)
], Checkbox.prototype, "input", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Checkbox.prototype, "showFocusRing", void 0);
__decorate([
    t$3(),
    __metadata("design:type", Object)
], Checkbox.prototype, "showRipple", void 0);

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles$1 = i$4 `:host{--_container-height: var(--md-checkbox-container-height, 18px);--_container-shape: var(--md-checkbox-container-shape, 2px);--_container-width: var(--md-checkbox-container-width, 18px);--_error-focus-state-layer-color: var(--md-checkbox-error-focus-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-hover-state-layer-color: var(--md-checkbox-error-hover-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-hover-state-layer-opacity: var(--md-checkbox-error-hover-state-layer-opacity, 0.08);--_error-pressed-state-layer-color: var(--md-checkbox-error-pressed-state-layer-color, var(--md-sys-color-error, #b3261e));--_error-pressed-state-layer-opacity: var(--md-checkbox-error-pressed-state-layer-opacity, 0.12);--_icon-size: var(--md-checkbox-icon-size, 18px);--_selected-container-color: var(--md-checkbox-selected-container-color, var(--md-sys-color-primary, #6750a4));--_selected-disabled-container-color: var(--md-checkbox-selected-disabled-container-color, var(--md-sys-color-on-surface, #1c1b1f));--_selected-disabled-container-opacity: var(--md-checkbox-selected-disabled-container-opacity, 0.38);--_selected-disabled-icon-color: var(--md-checkbox-selected-disabled-icon-color, var(--md-sys-color-surface, #fffbfe));--_selected-error-container-color: var(--md-checkbox-selected-error-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-focus-container-color: var(--md-checkbox-selected-error-focus-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-focus-icon-color: var(--md-checkbox-selected-error-focus-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-hover-container-color: var(--md-checkbox-selected-error-hover-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-hover-icon-color: var(--md-checkbox-selected-error-hover-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-icon-color: var(--md-checkbox-selected-error-icon-color, var(--md-sys-color-on-error, #fff));--_selected-error-pressed-container-color: var(--md-checkbox-selected-error-pressed-container-color, var(--md-sys-color-error, #b3261e));--_selected-error-pressed-icon-color: var(--md-checkbox-selected-error-pressed-icon-color, var(--md-sys-color-on-error, #fff));--_selected-focus-container-color: var(--md-checkbox-selected-focus-container-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-icon-color: var(--md-checkbox-selected-focus-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-focus-state-layer-color: var(--md-checkbox-selected-focus-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-focus-state-layer-opacity: var(--md-checkbox-selected-focus-state-layer-opacity, 0.12);--_selected-hover-container-color: var(--md-checkbox-selected-hover-container-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-icon-color: var(--md-checkbox-selected-hover-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-hover-state-layer-color: var(--md-checkbox-selected-hover-state-layer-color, var(--md-sys-color-primary, #6750a4));--_selected-hover-state-layer-opacity: var(--md-checkbox-selected-hover-state-layer-opacity, 0.08);--_selected-icon-color: var(--md-checkbox-selected-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-pressed-container-color: var(--md-checkbox-selected-pressed-container-color, var(--md-sys-color-primary, #6750a4));--_selected-pressed-icon-color: var(--md-checkbox-selected-pressed-icon-color, var(--md-sys-color-on-primary, #fff));--_selected-pressed-state-layer-color: var(--md-checkbox-selected-pressed-state-layer-color, var(--md-sys-color-on-surface, #1c1b1f));--_selected-pressed-state-layer-opacity: var(--md-checkbox-selected-pressed-state-layer-opacity, 0.12);--_state-layer-shape: var(--md-checkbox-state-layer-shape, 9999px);--_state-layer-size: var(--md-checkbox-state-layer-size, 40px);--_unselected-disabled-container-opacity: var(--md-checkbox-unselected-disabled-container-opacity, 0.38);--_unselected-disabled-outline-color: var(--md-checkbox-unselected-disabled-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-disabled-outline-width: var(--md-checkbox-unselected-disabled-outline-width, 2px);--_unselected-error-focus-outline-color: var(--md-checkbox-unselected-error-focus-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-focus-outline-width: var(--md-checkbox-unselected-error-focus-outline-width, 2px);--_unselected-error-hover-outline-color: var(--md-checkbox-unselected-error-hover-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-hover-outline-width: var(--md-checkbox-unselected-error-hover-outline-width, 2px);--_unselected-error-outline-color: var(--md-checkbox-unselected-error-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-pressed-outline-color: var(--md-checkbox-unselected-error-pressed-outline-color, var(--md-sys-color-error, #b3261e));--_unselected-error-pressed-outline-width: var(--md-checkbox-unselected-error-pressed-outline-width, 2px);--_unselected-focus-outline-color: var(--md-checkbox-unselected-focus-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-focus-outline-width: var(--md-checkbox-unselected-focus-outline-width, 2px);--_unselected-focus-state-layer-color: var(--md-checkbox-unselected-focus-state-layer-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-focus-state-layer-opacity: var(--md-checkbox-unselected-focus-state-layer-opacity, 0.12);--_unselected-hover-outline-color: var(--md-checkbox-unselected-hover-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-hover-outline-width: var(--md-checkbox-unselected-hover-outline-width, 2px);--_unselected-hover-state-layer-color: var(--md-checkbox-unselected-hover-state-layer-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-hover-state-layer-opacity: var(--md-checkbox-unselected-hover-state-layer-opacity, 0.08);--_unselected-outline-color: var(--md-checkbox-unselected-outline-color, var(--md-sys-color-on-surface-variant, #49454f));--_unselected-outline-width: var(--md-checkbox-unselected-outline-width, 2px);--_unselected-pressed-outline-color: var(--md-checkbox-unselected-pressed-outline-color, var(--md-sys-color-on-surface, #1c1b1f));--_unselected-pressed-outline-width: var(--md-checkbox-unselected-pressed-outline-width, 2px);--_unselected-pressed-state-layer-color: var(--md-checkbox-unselected-pressed-state-layer-color, var(--md-sys-color-primary, #6750a4));--_unselected-pressed-state-layer-opacity: var(--md-checkbox-unselected-pressed-state-layer-opacity, 0.12);border-radius:var(--_container-shape);display:inline-flex;height:48px;position:relative;vertical-align:top;width:48px;-webkit-tap-highlight-color:rgba(0,0,0,0)}input{appearance:none;inset:0;margin:0;outline:none;position:absolute;opacity:0;block-size:100%;inline-size:100%}.container{border-radius:inherit;height:100%;position:relative;width:100%}.outline,.background,md-ripple,.icon{inset:0;margin:auto;position:absolute}.outline,.background{border-radius:inherit;height:var(--_container-height);width:var(--_container-width)}.outline{border-color:var(--_unselected-outline-color);border-style:solid;border-width:var(--_unselected-outline-width);box-sizing:border-box}.background{background-color:var(--_selected-container-color)}.background,.icon{opacity:0;transition-duration:150ms,50ms;transition-property:transform,opacity;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15),linear;transform:scale(0.6)}.selected .background,.selected .icon{opacity:1;transition-duration:350ms,50ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1),linear;transform:scale(1)}md-focus-ring{--md-focus-ring-shape-start-start:9999px;--md-focus-ring-shape-start-end:9999px;--md-focus-ring-shape-end-end:9999px;--md-focus-ring-shape-end-start:9999px;--md-focus-ring-offset-vertical:-2px;--md-focus-ring-offset-horizontal:-2px}md-ripple{height:var(--_state-layer-size);width:var(--_state-layer-size);--md-ripple-focus-state-layer-color:var(--_unselected-focus-state-layer-color);--md-ripple-focus-state-layer-opacity:var(--_unselected-focus-state-layer-opacity);--md-ripple-hover-state-layer-color:var(--_unselected-hover-state-layer-color);--md-ripple-hover-state-layer-opacity:var(--_unselected-hover-state-layer-opacity);--md-ripple-pressed-state-layer-color:var(--_unselected-pressed-state-layer-color);--md-ripple-pressed-state-layer-opacity:var(--_unselected-pressed-state-layer-opacity);--md-ripple-state-layer-shape:var(--_state-layer-shape)}.selected md-ripple{--md-ripple-focus-state-layer-color:var(--_selected-focus-state-layer-color);--md-ripple-focus-state-layer-opacity:var(--_selected-focus-state-layer-opacity);--md-ripple-hover-state-layer-color:var(--_selected-hover-state-layer-color);--md-ripple-hover-state-layer-opacity:var(--_selected-hover-state-layer-opacity);--md-ripple-pressed-state-layer-color:var(--_selected-pressed-state-layer-color);--md-ripple-pressed-state-layer-opacity:var(--_selected-pressed-state-layer-opacity)}.error md-ripple{--md-ripple-focus-state-layer-color:var(--_error-focus-state-layer-color);--md-ripple-hover-state-layer-color:var(--_error-hover-state-layer-color);--md-ripple-hover-state-layer-opacity:var(--_error-hover-state-layer-opacity);--md-ripple-pressed-state-layer-color:var(--_error-pressed-state-layer-color);--md-ripple-pressed-state-layer-opacity:var(--_error-pressed-state-layer-opacity)}.icon{fill:var(--_selected-icon-color);height:var(--_icon-size);width:var(--_icon-size)}.mark.short{height:2px;transition-property:transform,height;width:2px}.mark.long{height:2px;transition-property:transform,width;width:10px}.mark{animation-duration:150ms;animation-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15);transition-duration:150ms;transition-timing-function:cubic-bezier(0.3, 0, 0.8, 0.15)}.selected .mark{animation-duration:350ms;animation-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1);transition-duration:350ms;transition-timing-function:cubic-bezier(0.05, 0.7, 0.1, 1)}.checked .mark,.prev-checked.unselected .mark{transform:scaleY(-1) translate(7px, -14px) rotate(45deg)}.checked .mark.short,.prev-checked.unselected .mark.short{height:5.6568542495px}.checked .mark.long,.prev-checked.unselected .mark.long{width:11.313708499px}.indeterminate .mark,.prev-indeterminate.unselected .mark{transform:scaleY(-1) translate(4px, -10px) rotate(0deg)}.prev-unselected .mark{transition-property:none}.prev-unselected.checked .mark.long{animation-name:prev-unselected-to-checked}@keyframes prev-unselected-to-checked{from{width:0}}.error .outline{border-color:var(--_unselected-error-outline-color)}.error .background{background:var(--_selected-error-container-color)}.error .icon{fill:var(--_selected-error-icon-color)}:host(:hover) .outline{border-color:var(--_unselected-hover-outline-color);border-width:var(--_unselected-hover-outline-width)}:host(:hover) .background{background:var(--_selected-hover-container-color)}:host(:hover) .icon{fill:var(--_selected-hover-icon-color)}:host(:hover) .error .outline{border-color:var(--_unselected-error-hover-outline-color);border-width:var(--_unselected-error-hover-outline-width)}:host(:hover) .error .background{background:var(--_selected-error-hover-container-color)}:host(:hover) .error .icon{fill:var(--_selected-error-hover-icon-color)}:host(:focus-within) .outline{border-color:var(--_unselected-focus-outline-color);border-width:var(--_unselected-focus-outline-width)}:host(:focus-within) .background{background:var(--_selected-focus-container-color)}:host(:focus-within) .icon{fill:var(--_selected-focus-icon-color)}:host(:focus-within) .error .outline{border-color:var(--_unselected-error-focus-outline-color);border-width:var(--_unselected-error-focus-outline-width)}:host(:focus-within) .error .background{background:var(--_selected-error-focus-container-color)}:host(:focus-within) .error .icon{fill:var(--_selected-error-focus-icon-color)}:host(:active) .outline{border-color:var(--_unselected-pressed-outline-color);border-width:var(--_unselected-pressed-outline-width)}:host(:active) .background{background:var(--_selected-pressed-container-color)}:host(:active) .icon{fill:var(--_selected-pressed-icon-color)}:host(:active) .error .outline{border-color:var(--_unselected-error-pressed-outline-color);border-width:var(--_unselected-error-pressed-outline-width)}:host(:active) .error .background{background:var(--_selected-error-pressed-container-color)}:host(:active) .error .icon{fill:var(--_selected-error-pressed-icon-color)}:host([disabled]) .background,:host([disabled]) .icon,:host([disabled]) .mark,.prev-disabled .background,.prev-disabled .icon,.prev-disabled .mark{animation-duration:0s;transition-duration:0s}:host([disabled]) .outline{border-color:var(--_unselected-disabled-outline-color);border-width:var(--_unselected-disabled-outline-width);opacity:var(--_unselected-disabled-container-opacity)}:host([disabled]) .selected .outline{visibility:hidden}:host([disabled]) .selected .background{background:var(--_selected-disabled-container-color);opacity:var(--_selected-disabled-container-opacity)}:host([disabled]) .icon{fill:var(--_selected-disabled-icon-color)}/*# sourceMappingURL=checkbox-styles.css.map */
`;

/**
  * @license
  * Copyright 2022 Google LLC
  * SPDX-License-Identifier: Apache-2.0
  */
const styles = i$4 `@media(forced-colors: active){:host{--md-checkbox-selected-container-color:CanvasText;--md-checkbox-selected-disabled-container-color:GrayText;--md-checkbox-selected-disabled-container-opacity:1;--md-checkbox-selected-disabled-icon-color:Canvas;--md-checkbox-selected-error-container-color:CanvasText;--md-checkbox-selected-error-focus-container-color:CanvasText;--md-checkbox-selected-error-focus-icon-color:Canvas;--md-checkbox-selected-error-hover-container-color:CanvasText;--md-checkbox-selected-error-hover-icon-color:Canvas;--md-checkbox-selected-error-icon-color:Canvas;--md-checkbox-selected-error-pressed-container-color:CanvasText;--md-checkbox-selected-error-pressed-icon-color:Canvas;--md-checkbox-selected-focus-container-color:CanvasText;--md-checkbox-selected-focus-icon-color:Canvas;--md-checkbox-selected-hover-container-color:CanvasText;--md-checkbox-selected-hover-icon-color:Canvas;--md-checkbox-selected-icon-color:Canvas;--md-checkbox-selected-pressed-container-color:CanvasText;--md-checkbox-selected-pressed-icon-color:Canvas;--md-checkbox-unselected-disabled-container-opacity:1;--md-checkbox-unselected-disabled-outline-color:GrayText;--md-checkbox-unselected-error-focus-outline-color:CanvasText;--md-checkbox-unselected-error-hover-outline-color:CanvasText;--md-checkbox-unselected-error-outline-color:CanvasText;--md-checkbox-unselected-error-pressed-outline-color:CanvasText;--md-checkbox-unselected-focus-outline-color:CanvasText;--md-checkbox-unselected-hover-outline-color:CanvasText;--md-checkbox-unselected-outline-color:CanvasText;--md-checkbox-unselected-pressed-outline-color:CanvasText}}/*# sourceMappingURL=forced-colors-styles.css.map */
`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Checkboxes allow users to select one or more items from a set. Checkboxes can
 * turn an option on or off.
 */
let MdCheckbox = class MdCheckbox extends Checkbox {
};
MdCheckbox.styles = [styles$1, styles];
MdCheckbox = __decorate([
    e$9('md-checkbox')
], MdCheckbox);
