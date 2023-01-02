var e,t,i=window,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,o=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}},l=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1]),e[0]);return new o(i,e,n)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,h=window,d=h.trustedTypes,c=d?d.emptyScript:"",u=h.reactiveElementPolyfillSupport,p={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),v={attribute:!0,type:String,converter:p,reflect:!1,hasChanged:m},f=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))})),e}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const n=this[e];this[t]=s,this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||v}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{s?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const s=document.createElement("style"),n=i.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=t.cssText,e.appendChild(s)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=v){var s;const n=this.constructor._$Ep(e,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:p).toAttribute(t,i.type);this._$El=e,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,n=s._$Ev.get(e);if(void 0!==n&&this._$El!==n){const e=s.getPropertyOptions(n),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:p;this._$El=n,this[n]=r.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};f.finalized=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==u||u({ReactiveElement:f}),(null!==(e=h.reactiveElementVersions)&&void 0!==e?e:h.reactiveElementVersions=[]).push("1.4.2");var g=window,b=g.trustedTypes,y=b?b.createPolicy("lit-html",{createHTML:e=>e}):void 0,_=`lit$${(Math.random()+"").slice(9)}$`,w="?"+_,x=`<${w}>`,$=document,k=(e="")=>$.createComment(e),A=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,E=e=>C(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,z=/-->/g,I=/>/g,T=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),L=/'/g,U=/"/g,M=/^(?:script|style|textarea|title)$/i,P=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),O=P(1),B=(P(2),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),R=new WeakMap,N=$.createTreeWalker($,129,null,!1),H=(e,t)=>{const i=e.length-1,s=[];let n,r=2===t?"<svg>":"",o=S;for(let t=0;t<i;t++){const i=e[t];let l,a,h=-1,d=0;for(;d<i.length&&(o.lastIndex=d,a=o.exec(i),null!==a);)d=o.lastIndex,o===S?"!--"===a[1]?o=z:void 0!==a[1]?o=I:void 0!==a[2]?(M.test(a[2])&&(n=RegExp("</"+a[2],"g")),o=T):void 0!==a[3]&&(o=T):o===T?">"===a[0]?(o=null!=n?n:S,h=-1):void 0===a[1]?h=-2:(h=o.lastIndex-a[2].length,l=a[1],o=void 0===a[3]?T:'"'===a[3]?U:L):o===U||o===L?o=T:o===z||o===I?o=S:(o=T,n=void 0);const c=o===T&&e[t+1].startsWith("/>")?" ":"";r+=o===S?i+x:h>=0?(s.push(l),i.slice(0,h)+"$lit$"+i.slice(h)+_+c):i+_+(-2===h?(s.push(void 0),t):c)}const l=r+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,s]},V=class{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let n=0,r=0;const o=e.length-1,l=this.parts,[a,h]=H(e,t);if(this.el=V.createElement(a,i),N.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=N.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(_)){const i=h[r++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+"$lit$").split(_),t=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?Z:"@"===t[1]?J:W})}else l.push({type:6,index:n})}for(const t of e)s.removeAttribute(t)}if(M.test(s.tagName)){const e=s.textContent.split(_),t=e.length-1;if(t>0){s.textContent=b?b.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],k()),N.nextNode(),l.push({type:2,index:++n});s.append(e[t],k())}}}else if(8===s.nodeType)if(s.data===w)l.push({type:2,index:n});else{let e=-1;for(;-1!==(e=s.data.indexOf(_,e+1));)l.push({type:7,index:n}),e+=_.length-1}n++}}static createElement(e,t){const i=$.createElement("template");return i.innerHTML=e,i}};function D(e,t,i=e,s){var n,r,o,l;if(t===B)return t;let a=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const h=A(t)?void 0:t._$litDirective$;return(null==a?void 0:a.constructor)!==h&&(null===(r=null==a?void 0:a._$AO)||void 0===r||r.call(a,!1),void 0===h?a=void 0:(a=new h(e),a._$AT(e,i,s)),void 0!==s?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[s]=a:i._$Cl=a),void 0!==a&&(t=D(e,a._$AS(e,t.values),a,s)),t}var j=class{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:i},parts:s}=this._$AD,n=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:$).importNode(i,!0);N.currentNode=n;let r=N.nextNode(),o=0,l=0,a=s[0];for(;void 0!==a;){if(o===a.index){let t;2===a.type?t=new q(r,r.nextSibling,this,e):1===a.type?t=new a.ctor(r,a.name,a.strings,this,e):6===a.type&&(t=new G(r,this,e)),this.u.push(t),a=s[++l]}o!==(null==a?void 0:a.index)&&(r=N.nextNode(),o++)}return n}p(e){let t=0;for(const i of this.u)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},q=class{constructor(e,t,i,s){var n;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cm=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),A(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==B&&this.g(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):E(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==F&&A(this._$AH)?this._$AA.nextSibling.data=e:this.T($.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,n="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=V.createElement(s.h,this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===n)this._$AH.p(i);else{const e=new j(n,this),t=e.v(this.options);e.p(i),this.T(t),this._$AH=e}}_$AC(e){let t=R.get(e.strings);return void 0===t&&R.set(e.strings,t=new V(e)),t}k(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const n of e)s===t.length?t.push(i=new q(this.O(k()),this.O(k()),this,this.options)):i=t[s],i._$AI(n),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cm=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}},W=class{constructor(e,t,i,s,n){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const n=this.strings;let r=!1;if(void 0===n)e=D(this,e,t,0),r=!A(e)||e!==this._$AH&&e!==B,r&&(this._$AH=e);else{const s=e;let o,l;for(e=n[0],o=0;o<n.length-1;o++)l=D(this,s[i+o],t,o),l===B&&(l=this._$AH[o]),r||(r=!A(l)||l!==this._$AH[o]),l===F?e=F:e!==F&&(e+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!s&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}},K=class extends W{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},Y=b?b.emptyScript:"",Z=class extends W{constructor(){super(...arguments),this.type=4}j(e){e&&e!==F?this.element.setAttribute(this.name,Y):this.element.removeAttribute(this.name)}},J=class extends W{constructor(e,t,i,s,n){super(e,t,i,s,n),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=D(this,e,t,0))&&void 0!==i?i:F)===B)return;const s=this._$AH,n=e===F&&s!==F||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==F&&(s===F||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}},G=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}},Q={P:"$lit$",A:_,M:w,C:1,L:H,R:j,D:E,V:D,I:q,H:W,N:Z,U:J,B:K,F:G},X=g.litHtmlPolyfillSupport;null==X||X(V,q),(null!==(t=g.litHtmlVersions)&&void 0!==t?t:g.litHtmlVersions=[]).push("2.4.0");var ee,te,ie=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let o=r._$litPart$;if(void 0===o){const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new q(t.insertBefore(k(),e),e,void 0,null!=i?i:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return B}};ie.finalized=!0,ie._$litElement$=!0,null===(ee=globalThis.litElementHydrateSupport)||void 0===ee||ee.call(globalThis,{LitElement:ie});var se=globalThis.litElementPolyfillSupport;null==se||se({LitElement:ie}),(null!==(te=globalThis.litElementVersions)&&void 0!==te?te:globalThis.litElementVersions=[]).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ne=l`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`,re=l`
  ${ne}

  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--sl-color-neutral-200);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--sl-spacing-large);

    display: block;
    isolation: isolate;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`,oe=l`
  ${ne}

  :host {
    display: block;
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(sl-icon) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    color: var(--sl-color-neutral-700);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }

  .tree-item__checkbox {
    pointer-events: none;
  }

  .tree-item__expand-button,
  .tree-item__checkbox,
  .tree-item__label {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
  }

  .tree-item__checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .tree-item__indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .tree-item__expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-x-small);
    width: 1rem;
    height: 1rem;
    cursor: pointer;
  }

  .tree-item__expand-button {
    transition: var(--sl-transition-medium) rotate ease;
  }

  .tree-item--expanded .tree-item__expand-button {
    rotate: 90deg;
  }

  .tree-item--expanded.tree-item--rtl .tree-item__expand-button {
    rotate: -90deg;
  }

  .tree-item--expanded slot[name='expand-icon'],
  .tree-item:not(.tree-item--expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item--has-expand-button) .tree-item__expand-icon-slot {
    display: none;
  }

  .tree-item__expand-button--visible {
    cursor: pointer;
  }

  .tree-item__item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  .tree-item--disabled .tree-item__item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .tree-item__item {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
    background-color: var(--sl-color-neutral-100);
    border-inline-start-color: var(--sl-color-primary-600);
  }

  :host(:not([aria-disabled='true'])) .tree-item__expand-button {
    color: var(--sl-color-neutral-600);
  }

  .tree-item__label {
    display: flex;
    align-items: center;
    transition: var(--sl-transition-fast) color;
  }

  .tree-item__children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--sl-spacing-medium)));
  }

  /* Indentation lines */
  .tree-item__children {
    position: relative;
  }

  .tree-item__children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    left: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  .tree-item--rtl .tree-item__children::before {
    left: auto;
    right: 1em;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item--selected .tree-item__item {
      outline: dashed 1px SelectedItem;
    }
  }
`,le={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ae=e=>(...t)=>({_$litDirective$:e,values:t}),he=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:de}=Q,ce={},ue=ae(class extends he{constructor(e){if(super(e),e.type!==le.PROPERTY&&e.type!==le.ATTRIBUTE&&e.type!==le.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===B||t===F)return t;const i=e.element,s=e.name;if(e.type===le.PROPERTY){if(t===i[s])return B}else if(e.type===le.BOOLEAN_ATTRIBUTE){if(!!t===i.hasAttribute(s))return B}else if(e.type===le.ATTRIBUTE&&i.getAttribute(s)===t+"")return B;return((e,t=ce)=>{e._$AH=t})(e),t}}),pe=Object.defineProperty,me=Object.defineProperties,ve=Object.getOwnPropertyDescriptor,fe=Object.getOwnPropertyDescriptors,ge=Object.getOwnPropertySymbols,be=Object.prototype.hasOwnProperty,ye=Object.prototype.propertyIsEnumerable,_e=(e,t,i)=>t in e?pe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,we=(e,t)=>{for(var i in t||(t={}))be.call(t,i)&&_e(e,i,t[i]);if(ge)for(var i of ge(t))ye.call(t,i)&&_e(e,i,t[i]);return e},xe=(e,t)=>me(e,fe(t)),$e=(e,t,i,s)=>{for(var n,r=s>1?void 0:s?ve(t,i):t,o=e.length-1;o>=0;o--)(n=e[o])&&(r=(s?n(t,i,r):n(r))||r);return s&&r&&pe(t,i,r),r};function ke(e,t,i){return new Promise((s=>{if((null==i?void 0:i.duration)===1/0)throw new Error("Promise-based animations must be finite.");const n=e.animate(t,xe(we({},i),{duration:Ae()?0:i.duration}));n.addEventListener("cancel",s,{once:!0}),n.addEventListener("finish",s,{once:!0})}))}function Ae(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function Ce(e){return Promise.all(e.getAnimations().map((e=>new Promise((t=>{const i=requestAnimationFrame(t);e.addEventListener("cancel",(()=>i),{once:!0}),e.addEventListener("finish",(()=>i),{once:!0}),e.cancel()})))))}function Ee(e,t){return e.map((e=>xe(we({},e),{height:"auto"===e.height?`${t}px`:e.height})))}var Se=new Map,ze=new WeakMap;function Ie(e){return null!=e?e:{keyframes:[],options:{duration:0}}}function Te(e,t){return"rtl"===t.toLowerCase()?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function Le(e,t){Se.set(e,Ie(t))}function Ue(e,t,i){const s=ze.get(e);if(null==s?void 0:s[t])return Te(s[t],i.dir);const n=Se.get(t);return n?Te(n,i.dir):{keyframes:[],options:{duration:0}}}var Me,Pe=new Set,Oe=new MutationObserver(Ne),Be=new Map,Fe=document.documentElement.dir||"ltr",Re=document.documentElement.lang||navigator.language;function Ne(){Fe=document.documentElement.dir||"ltr",Re=document.documentElement.lang||navigator.language,[...Pe.keys()].map((e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()}))}Oe.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});var He=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Pe.add(this.host)}hostDisconnected(){Pe.delete(this.host)}dir(){return`${this.host.dir||Fe}`.toLowerCase()}lang(){return`${this.host.lang||Re}`.toLowerCase()}term(e,...t){var i,s;const n=new Intl.Locale(this.lang()),r=null==n?void 0:n.language.toLowerCase(),o=null!==(s=null===(i=null==n?void 0:n.region)||void 0===i?void 0:i.toLowerCase())&&void 0!==s?s:"",l=Be.get(`${r}-${o}`),a=Be.get(r);let h;if(l&&l[e])h=l[e];else if(a&&a[e])h=a[e];else{if(!Me||!Me[e])return console.error(`No translation found for: ${String(e)}`),e;h=Me[e]}return"function"==typeof h?h(...t):h}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}},Ve=class extends He{},De={$code:"en",$name:"English",$dir:"ltr",clearEntry:"Clear entry",close:"Close",copy:"Copy",currentValue:"Current value",hidePassword:"Hide password",loading:"Loading",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",toggleColorFormat:"Toggle color format"};!function(...e){e.map((e=>{const t=e.$code.toLowerCase();Be.has(t)?Be.set(t,Object.assign(Object.assign({},Be.get(t)),e)):Be.set(t,e),Me||(Me=e)})),Ne()}(De);var je=ae(class extends he{constructor(e){var t;if(super(e),e.type!==le.ATTRIBUTE||"class"!==e.name||(null===(t=e.strings)||void 0===t?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter((t=>e[t])).join(" ")+" "}update(e,[t]){var i,s;if(void 0===this.nt){this.nt=new Set,void 0!==e.strings&&(this.st=new Set(e.strings.join(" ").split(/\s/).filter((e=>""!==e))));for(const e in t)t[e]&&!(null===(i=this.st)||void 0===i?void 0:i.has(e))&&this.nt.add(e);return this.render(t)}const n=e.element.classList;this.nt.forEach((e=>{e in t||(n.remove(e),this.nt.delete(e))}));for(const e in t){const i=!!t[e];i===this.nt.has(e)||(null===(s=this.st)||void 0===s?void 0:s.has(e))||(i?(n.add(e),this.nt.add(e)):(n.remove(e),this.nt.delete(e)))}return B}});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function qe(e,t){const i=we({waitUntilFirstUpdate:!1},t);return(t,s)=>{const{update:n}=t;if(e in t){const r=e;t.update=function(e){if(e.has(r)){const t=e.get(r),n=this[r];t!==n&&(i.waitUntilFirstUpdate&&!this.hasUpdated||this[s](t,n))}n.call(this,e)}}}}var We=e=>t=>{return"function"==typeof t?(i=e,s=t,customElements.define(i,s),s):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t);var i,s},Ke=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?xe(we({},t),{finisher(i){i.createProperty(t.key,e)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Ye(e){return(t,i)=>{return void 0!==i?(s=e,n=i,void t.constructor.createProperty(n,s)):Ke(e,t);var s,n}}function Ze(e){return Ye(xe(we({},e),{state:!0}))}var Je,Ge=({finisher:e,descriptor:t})=>(i,s)=>{var n;if(void 0===s){const s=null!==(n=i.originalKey)&&void 0!==n?n:i.key,r=null!=t?{kind:"method",placement:"prototype",key:s,descriptor:t(i.key)}:xe(we({},i),{key:s});return null!=e&&(r.finisher=function(t){e(t,s)}),r}{const n=i.constructor;void 0!==t&&Object.defineProperty(i,s,t(s)),null==e||e(n,s)}};function Qe(e,t){return Ge({descriptor:i=>{const s={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;s.get=function(){var i,s;return void 0===this[t]&&(this[t]=null!==(s=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==s?s:null),this[t]}}return s}})}null===(Je=window.HTMLSlotElement)||void 0===Je||Je.prototype.assignedElements;var Xe=class extends ie{emit(e,t){const i=new CustomEvent(e,we({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(i),i}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function et(e,t,i){return e?t():null==i?void 0:i()}$e([Ye()],Xe.prototype,"dir",2),$e([Ye()],Xe.prototype,"lang",2);var tt=class extends Xe{constructor(){super(...arguments),this.localize=new Ve(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&"treeitem"===e.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}async animateExpand(){this.emit("sl-expand"),await Ce(this.childrenContainer),this.childrenContainer.hidden=!1;const{keyframes:e,options:t}=Ue(this,"tree-item.expand",{dir:this.localize.dir()});await ke(this.childrenContainer,Ee(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}async animateCollapse(){this.emit("sl-collapse"),await Ce(this.childrenContainer);const{keyframes:e,options:t}=Ue(this,"tree-item.collapse",{dir:this.localize.dir()});await ke(this.childrenContainer,Ee(e,this.childrenContainer.scrollHeight),t),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter((t=>tt.isTreeItem(t)&&(e||!t.disabled))):[]}isNestedItem(){const e=this.parentElement;return!!e&&tt.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}render(){const e="rtl"===this.localize.dir(),t=!this.loading&&(!this.isLeaf||this.lazy);return O`
      <div
        part="base"
        class="${je({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":t,"tree-item--rtl":"rtl"===this.localize.dir()})}"
      >
        <div
          class="tree-item__item"
          part="
            item
            ${this.disabled?"item--disabled":""}
            ${this.expanded?"item--expanded":""}
            ${this.indeterminate?"item--indeterminate":""}
            ${this.selected?"item--selected":""}
          "
        >
          <div class="tree-item__indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${je({"tree-item__expand-button":!0,"tree-item__expand-button--visible":t})}
            aria-hidden="true"
          >
            ${et(this.loading,(()=>O` <sl-spinner></sl-spinner> `))}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${e?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${et(this.selectable,(()=>O`
                <sl-checkbox
                  tabindex="-1"
                  class="tree-item__checkbox"
                  ?disabled="${this.disabled}"
                  ?checked="${ue(this.selected)}"
                  ?indeterminate="${this.indeterminate}"
                >
                  <slot class="tree-item__label" part="label"></slot>
                </sl-checkbox>
              `),(()=>O` <slot class="tree-item__label" part="label"></slot> `))}
        </div>

        <slot
          name="children"
          class="tree-item__children"
          part="children"
          role="group"
          @slotchange="${this.handleChildrenSlotChange}"
        ></slot>
      </div>
    `}};tt.styles=oe,$e([Ze()],tt.prototype,"indeterminate",2),$e([Ze()],tt.prototype,"isLeaf",2),$e([Ze()],tt.prototype,"loading",2),$e([Ze()],tt.prototype,"selectable",2),$e([Ye({type:Boolean,reflect:!0})],tt.prototype,"expanded",2),$e([Ye({type:Boolean,reflect:!0})],tt.prototype,"selected",2),$e([Ye({type:Boolean,reflect:!0})],tt.prototype,"disabled",2),$e([Ye({type:Boolean,reflect:!0})],tt.prototype,"lazy",2),$e([Qe("slot:not([name])")],tt.prototype,"defaultSlot",2),$e([Qe("slot[name=children]")],tt.prototype,"childrenSlot",2),$e([Qe(".tree-item__item")],tt.prototype,"itemElement",2),$e([Qe(".tree-item__children")],tt.prototype,"childrenContainer",2),$e([Qe(".tree-item__expand-button slot")],tt.prototype,"expandButtonSlot",2),$e([qe("loading",{waitUntilFirstUpdate:!0})],tt.prototype,"handleLoadingChange",1),$e([qe("disabled")],tt.prototype,"handleDisabledChange",1),$e([qe("selected")],tt.prototype,"handleSelectedChange",1),$e([qe("expanded",{waitUntilFirstUpdate:!0})],tt.prototype,"handleExpandedChange",1),$e([qe("expanded",{waitUntilFirstUpdate:!0})],tt.prototype,"handleExpandAnimation",1),$e([qe("lazy",{waitUntilFirstUpdate:!0})],tt.prototype,"handleLazyChange",1),tt=$e([We("sl-tree-item")],tt),Le("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),Le("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var it=class extends Xe{constructor(){super(...arguments),this.selection="single",this.localize=new Ve(this),this.initTreeItem=e=>{e.selectable="multiple"===this.selection,["expand","collapse"].filter((e=>!!this.querySelector(`[slot="${e}-icon"]`))).forEach((t=>{const i=e.querySelector(`[slot="${t}-icon"]`);null===i?e.append(this.getExpandButtonIcon(t)):i.hasAttribute("data-default")&&i.replaceWith(this.getExpandButtonIcon(t))}))},this.handleTreeChanged=e=>{for(const t of e){const e=[...t.addedNodes].filter(tt.isTreeItem),i=[...t.removedNodes].filter(tt.isTreeItem);e.forEach(this.initTreeItem),i.includes(this.lastFocusedItem)&&this.focusItem(this.getFocusableItems()[0])}},this.handleFocusOut=e=>{const t=e.relatedTarget;t&&this.contains(t)||(this.tabIndex=0)},this.handleFocusIn=e=>{const t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),tt.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)}}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver.disconnect(),this.removeEventListener("focusin",this.handleFocusIn),this.removeEventListener("focusout",this.handleFocusOut),this.removeEventListener("sl-lazy-change",this.handleSlotChange)}getExpandButtonIcon(e){const t=("expand"===e?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){const i=t.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach((e=>e.removeAttribute("id"))),i.setAttribute("data-default",""),i.slot=`${e}-icon`,i}return null}handleSelectionChange(){const e=this.getAllTreeItems();this.setAttribute("aria-multiselectable","multiple"===this.selection?"true":"false");for(const t of e)t.selectable="multiple"===this.selection}syncTreeItems(e){const t=this.getAllTreeItems();if("multiple"===this.selection)(function e(t){const i=t.parentElement;if(tt.isTreeItem(i)){const t=i.getChildrenItems({includeDisabled:!1}),s=!!t.length&&t.every((e=>e.selected)),n=t.every((e=>!e.selected&&!e.indeterminate));i.selected=s,i.indeterminate=!s&&!n,e(i)}})(i=e),function e(t){for(const i of t.getChildrenItems())i.selected=!i.disabled&&t.selected,e(i)}(i);else for(const i of t)i!==e&&(i.selected=!1);var i}selectItem(e){const t=[...this.selectedItems];"multiple"===this.selection?(e.selected=!e.selected,e.lazy&&(e.expanded=!0),this.syncTreeItems(e)):"single"===this.selection||e.isLeaf?(e.expanded=!e.expanded,e.selected=!0,this.syncTreeItems(e)):"leaf"===this.selection&&(e.expanded=!e.expanded);const i=this.selectedItems;(t.length!==i.length||i.some((e=>!t.includes(e))))&&this.emit("sl-selection-change",{detail:{selection:i}})}get selectedItems(){return this.getAllTreeItems().filter((e=>e.selected))}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}getFocusableItems(){const e=this.getAllTreeItems(),t=new Set;return e.filter((e=>{var i;if(e.disabled)return!1;const s=null==(i=e.parentElement)?void 0:i.closest("[role=treeitem]");return s&&(!s.expanded||s.loading||t.has(s))&&t.add(e),!t.has(e)}))}focusItem(e){null==e||e.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key))return;const t=this.getFocusableItems(),i="ltr"===this.localize.dir(),s="rtl"===this.localize.dir();if(t.length>0){e.preventDefault();const n=t.findIndex((e=>e.matches(":focus"))),r=t[n],o=e=>{const i=t[(s=e,n=0,r=t.length-1,s<n?n:s>r?r:s)];
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s,n,r;this.focusItem(i)},l=e=>{r.expanded=e};"ArrowDown"===e.key?o(n+1):"ArrowUp"===e.key?o(n-1):i&&"ArrowRight"===e.key||s&&"ArrowLeft"===e.key?!r||r.disabled||r.expanded||r.isLeaf&&!r.lazy?o(n+1):l(!0):i&&"ArrowLeft"===e.key||s&&"ArrowRight"===e.key?!r||r.disabled||r.isLeaf||!r.expanded?o(n-1):l(!1):"Home"===e.key?o(0):"End"===e.key?o(t.length-1):"Enter"!==e.key&&" "!==e.key||r.disabled||this.selectItem(r)}}handleClick(e){const t=e.target.closest("sl-tree-item"),i=e.composedPath().some((e=>{var t;return null==(t=null==e?void 0:e.classList)?void 0:t.contains("tree-item__expand-button")}));t&&!t.disabled&&("multiple"===this.selection&&i?t.expanded=!t.expanded:this.selectItem(t))}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}render(){return O`
      <div part="base" class="tree" @click=${this.handleClick} @keydown=${this.handleKeyDown}>
        <slot @slotchange=${this.handleSlotChange}></slot>
        <slot name="expand-icon" hidden aria-hidden="true"> </slot>
        <slot name="collapse-icon" hidden aria-hidden="true"> </slot>
      </div>
    `}};it.styles=re,$e([Qe("slot:not([name])")],it.prototype,"defaultSlot",2),$e([Qe("slot[name=expand-icon]")],it.prototype,"expandedIconSlot",2),$e([Qe("slot[name=collapse-icon]")],it.prototype,"collapsedIconSlot",2),$e([Ye()],it.prototype,"selection",2),$e([qe("selection")],it.prototype,"handleSelectionChange",1),it=$e([We("sl-tree")],it);var st=l`
  ${ne}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      rotate: 450deg;
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      rotate: 1080deg;
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,nt=class extends Xe{constructor(){super(...arguments),this.localize=new Ve(this)}render(){return O`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};nt.styles=st,nt=$e([We("sl-spinner")],nt);var rt=new WeakMap,ot=new WeakMap,lt=new WeakMap,at=class{constructor(e,t){(this.host=e).addController(this),this.options=we({form:e=>e.closest("form"),name:e=>e.name,value:e=>e.value,defaultValue:e=>e.defaultValue,disabled:e=>{var t;return null!=(t=e.disabled)&&t},reportValidity:e=>"function"!=typeof e.reportValidity||e.reportValidity(),setValue:(e,t)=>e.value=t},t),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this),this.handleFormReset=this.handleFormReset.bind(this),this.reportFormValidity=this.reportFormValidity.bind(this),this.handleUserInput=this.handleUserInput.bind(this)}hostConnected(){this.form=this.options.form(this.host),this.form&&(rt.has(this.form)?rt.get(this.form).add(this.host):rt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),lt.has(this.form)||(lt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity())),this.host.addEventListener("sl-input",this.handleUserInput)}hostDisconnected(){var e;this.form&&(null==(e=rt.get(this.form))||e.delete(this.host),this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),lt.has(this.form)&&(this.form.reportValidity=lt.get(this.form),lt.delete(this.form)),this.form=void 0),this.host.removeEventListener("sl-input",this.handleUserInput)}hostUpdated(){var e;const t=this.host,i=Boolean(ot.get(t)),s=Boolean(t.invalid),n=Boolean(t.required);(null==(e=this.form)?void 0:e.noValidate)?(t.removeAttribute("data-required"),t.removeAttribute("data-optional"),t.removeAttribute("data-invalid"),t.removeAttribute("data-valid"),t.removeAttribute("data-user-invalid"),t.removeAttribute("data-user-valid")):(t.toggleAttribute("data-required",n),t.toggleAttribute("data-optional",!n),t.toggleAttribute("data-invalid",s),t.toggleAttribute("data-valid",!s),t.toggleAttribute("data-user-invalid",s&&i),t.toggleAttribute("data-user-valid",!s&&i))}handleFormData(e){const t=this.options.disabled(this.host),i=this.options.name(this.host),s=this.options.value(this.host),n="sl-button"===this.host.tagName.toLowerCase();t||n||"string"!=typeof i||void 0===s||(Array.isArray(s)?s.forEach((t=>{e.formData.append(i,t.toString())})):e.formData.append(i,s.toString()))}handleFormSubmit(e){var t;const i=this.options.disabled(this.host),s=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(t=rt.get(this.form))||t.forEach((e=>{this.setUserInteracted(e,!0)}))),!this.form||this.form.noValidate||i||s(this.host)||(e.preventDefault(),e.stopImmediatePropagation())}handleFormReset(){this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1)}async handleUserInput(){await this.host.updateComplete,this.setUserInteracted(this.host,!0)}reportFormValidity(){if(this.form&&!this.form.noValidate){const e=this.form.querySelectorAll("*");for(const t of e)if("function"==typeof t.reportValidity&&!t.reportValidity())return!1}return!0}setUserInteracted(e,t){ot.set(e,t),e.requestUpdate()}doAction(e,t){if(this.form){const i=document.createElement("button");i.type=e,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",t&&(i.name=t.name,i.value=t.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach((e=>{t.hasAttribute(e)&&i.setAttribute(e,t.getAttribute(e))}))),this.form.append(i),i.click(),i.remove()}}reset(e){this.doAction("reset",e)}submit(e){this.doAction("submit",e)}},ht=l`
  ${ne}

  :host {
    display: inline-block;
  }

  .checkbox {
    display: inline-flex;
    align-items: top;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--small {
    --toggle-size: var(--sl-toggle-size-small);
    font-size: var(--sl-input-font-size-small);
  }

  .checkbox--medium {
    --toggle-size: var(--sl-toggle-size-medium);
    font-size: var(--sl-input-font-size-medium);
  }

  .checkbox--large {
    --toggle-size: var(--sl-toggle-size-large);
    font-size: var(--sl-input-font-size-large);
  }

  .checkbox__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--toggle-size);
    height: var(--toggle-size);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
    border-radius: 2px;
    background-color: var(--sl-input-background-color);
    color: var(--sl-color-neutral-0);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color, var(--sl-transition-fast) box-shadow;
  }

  .checkbox__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  .checkbox__checked-icon,
  .checkbox__indeterminate-icon {
    display: inline-flex;
    width: var(--toggle-size);
    height: var(--toggle-size);
  }

  /* Hover */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-input-border-color-hover);
    background-color: var(--sl-input-background-color-hover);
  }

  /* Focus */
  .checkbox:not(.checkbox--checked):not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked/indeterminate */
  .checkbox--checked .checkbox__control,
  .checkbox--indeterminate .checkbox__control {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
  }

  /* Checked/indeterminate + hover */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__control:hover,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__control:hover {
    border-color: var(--sl-color-primary-500);
    background-color: var(--sl-color-primary-500);
  }

  /* Checked/indeterminate + focus */
  .checkbox.checkbox--checked:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control,
  .checkbox.checkbox--indeterminate:not(.checkbox--disabled) .checkbox__input:focus-visible ~ .checkbox__control {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkbox__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    line-height: var(--toggle-size);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,dt=class extends Xe{constructor(){super(...arguments),this.formSubmitController=new at(this,{value:e=>e.checked?e.value||"on":void 0,defaultValue:e=>e.defaultChecked,setValue:(e,t)=>e.checked=t}),this.hasFocus=!1,this.invalid=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.required=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}reportValidity(){return this.input.reportValidity()}setCustomValidity(e){this.input.setCustomValidity(e),this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.invalid=!this.input.checkValidity()}render(){return O`
      <label
        part="base"
        class=${je({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":"small"===this.size,"checkbox--medium":"medium"===this.size,"checkbox--large":"large"===this.size})}
      >
        <input
          class="checkbox__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${e=this.value,null!=e?e:F}
          .indeterminate=${ue(this.indeterminate)}
          .checked=${ue(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          aria-checked=${this.checked?"true":"false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        />

        <span part="control" class="checkbox__control">
          ${this.checked?O`
                <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
              `:""}
          ${!this.checked&&this.indeterminate?O`
                <sl-icon
                  part="indeterminate-icon"
                  class="checkbox__indeterminate-icon"
                  library="system"
                  name="indeterminate"
                ></sl-icon>
              `:""}
        </span>

        <slot part="label" class="checkbox__label"></slot>
      </label>
    `;var e;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}};dt.styles=ht,$e([Qe('input[type="checkbox"]')],dt.prototype,"input",2),$e([Ze()],dt.prototype,"hasFocus",2),$e([Ze()],dt.prototype,"invalid",2),$e([Ye()],dt.prototype,"title",2),$e([Ye()],dt.prototype,"name",2),$e([Ye()],dt.prototype,"value",2),$e([Ye({reflect:!0})],dt.prototype,"size",2),$e([Ye({type:Boolean,reflect:!0})],dt.prototype,"disabled",2),$e([Ye({type:Boolean,reflect:!0})],dt.prototype,"required",2),$e([Ye({type:Boolean,reflect:!0})],dt.prototype,"checked",2),$e([Ye({type:Boolean,reflect:!0})],dt.prototype,"indeterminate",2),$e([((e="value")=>(t,i)=>{const s=t.constructor,n=s.prototype.attributeChangedCallback;s.prototype.attributeChangedCallback=function(t,r,o){var l;const a=s.getPropertyOptions(e);if(t===("string"==typeof a.attribute?a.attribute:e)){const t=a.converter||p,s=("function"==typeof t?t:null!=(l=null==t?void 0:t.fromAttribute)?l:p.fromAttribute)(o,a.type);this[e]!==s&&(this[i]=s)}n.call(this,t,r,o)}})("checked")],dt.prototype,"defaultChecked",2),$e([qe("disabled",{waitUntilFirstUpdate:!0})],dt.prototype,"handleDisabledChange",1),$e([qe("checked",{waitUntilFirstUpdate:!0}),qe("indeterminate",{waitUntilFirstUpdate:!0})],dt.prototype,"handleStateChange",1),dt=$e([We("sl-checkbox")],dt);var ct="";function ut(e){ct=e}function pt(){if(!ct){const e=[...document.getElementsByTagName("script")],t=e.find((e=>e.hasAttribute("data-shoelace")));if(t)ut(t.getAttribute("data-shoelace"));else{const t=e.find((e=>/shoelace(\.min)?\.js($|\?)/.test(e.src)));let i="";t&&(i=t.getAttribute("src")),ut(i.split("/").slice(0,-1).join("/"))}}return ct.replace(/\/$/,"")}var mt={caret:'\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n      <polyline points="6 9 12 15 18 9"></polyline>\n    </svg>\n  ',check:'\n    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(3.428571, 3.428571)">\n            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>\n            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>\n    </svg>\n  ',indeterminate:'\n    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">\n        <g stroke="currentColor" stroke-width="2">\n          <g transform="translate(2.285714, 6.857143)">\n            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>\n          </g>\n        </g>\n      </g>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',radio:'\n    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g fill="currentColor">\n          <circle cx="8" cy="8" r="3.42857143"></circle>\n        </g>\n      </g>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',"x-lg":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">\n      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},vt=[{name:"default",resolver:e=>`${pt()}/assets/icons/${e}.svg`},{name:"system",resolver:e=>e in mt?`data:image/svg+xml,${encodeURIComponent(mt[e])}`:""}],ft=[];function gt(e){return vt.find((t=>t.name===e))}var bt=new Map;function yt(e,t="cors"){if(bt.has(e))return bt.get(e);const i=fetch(e,{mode:t}).then((async e=>({ok:e.ok,status:e.status,html:await e.text()})));return bt.set(e,i),i}var _t=new Map;async function wt(e){if(_t.has(e))return _t.get(e);const t=await yt(e),i={ok:t.ok,status:t.status,svg:null};if(t.ok){const e=document.createElement("div");e.innerHTML=t.html;const s=e.firstElementChild;i.svg="svg"===(null==s?void 0:s.tagName.toLowerCase())?s.outerHTML:""}return _t.set(e,i),i}var xt=l`
  ${ne}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,$t=class extends he{constructor(e){if(super(e),this.it=F,e.type!==le.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===F||null==e)return this._t=void 0,this.it=e;if(e===B)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};$t.directiveName="unsafeHTML",$t.resultType=1;ae($t);var kt=class extends $t{};kt.directiveName="unsafeSVG",kt.resultType=2;var At,Ct=ae(kt),Et=class extends Xe{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){var e;super.connectedCallback(),e=this,ft.push(e)}firstUpdated(){this.setIcon()}disconnectedCallback(){var e;super.disconnectedCallback(),e=this,ft=ft.filter((t=>t!==e))}getUrl(){const e=gt(this.library);return this.name&&e?e.resolver(this.name):this.src}redraw(){this.setIcon()}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var e;const t=gt(this.library),i=this.getUrl();if(At||(At=new DOMParser),i)try{const s=await wt(i);if(i!==this.getUrl())return;if(s.ok){const i=At.parseFromString(s.svg,"text/html").body.querySelector("svg");null!==i?(null==(e=null==t?void 0:t.mutator)||e.call(t,i),this.svg=i.outerHTML,this.emit("sl-load")):(this.svg="",this.emit("sl-error"))}else this.svg="",this.emit("sl-error")}catch(e){this.emit("sl-error")}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){return O` ${Ct(this.svg)} `}};Et.styles=xt,$e([Ze()],Et.prototype,"svg",2),$e([Ye({reflect:!0})],Et.prototype,"name",2),$e([Ye()],Et.prototype,"src",2),$e([Ye()],Et.prototype,"label",2),$e([Ye({reflect:!0})],Et.prototype,"library",2),$e([qe("label")],Et.prototype,"handleLabelChange",1),$e([qe("name"),qe("src"),qe("library")],Et.prototype,"setIcon",1),Et=$e([We("sl-icon")],Et),
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
document.querySelectorAll("sl-tree-item").forEach((e=>{const t=e.firstElementChild;t&&"A"===t.nodeName&&t.addEventListener("click",(e=>{e.stopImmediatePropagation()}))}));