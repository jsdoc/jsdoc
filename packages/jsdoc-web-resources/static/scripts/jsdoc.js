let t;var e,i,o=class extends Event{constructor(t){super("wa-copy",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};let r=globalThis,n=r.ShadowRoot&&(void 0===r.ShadyCSS||r.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,a=Symbol(),s=new WeakMap;class l{constructor(t,e,i){if(this._$cssResult$=!0,i!==a)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(n&&void 0===t){let i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}let c=(t,...e)=>new l(1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]),t,a),h=n?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e,i="";for(let e of t.cssRules)i+=e.cssText;return new l("string"==typeof(e=i)?e:e+"",void 0,a)})(t):t,{is:d,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:f,getPrototypeOf:g}=Object,y=globalThis,w=y.trustedTypes,b=w?w.emptyScript:"",v=y.reactiveElementPolyfillSupport,C={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!d(t,e),L={attribute:!0,type:String,converter:C,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),y.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=L){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&p(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){let{get:o,set:r}=u(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){let n=o?.call(this);r?.call(this,e),this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??L}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=g(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let e of[...m(t),...f(t)])this.createProperty(e,t[e])}let t=this[Symbol.metadata];if(null!==t){let e=litPropertyMetadata.get(t);if(void 0!==e)for(let[t,i]of e)this.elementProperties.set(t,i)}for(let[t,e]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t))for(let i of new Set(t.flat(1/0).reverse()))e.unshift(h(i));else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){let i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let e of this.constructor.elementProperties.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(n)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let i of e){let e=document.createElement("style"),o=r.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){let r=(void 0!==i.converter?.toAttribute?i.converter:C).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){let t=i.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:C;this._$Em=o;let n=r.fromAttribute(e,t.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(t,e,i,o=!1,r){if(void 0!==t){let n=this.constructor;if(!1===o&&(r=this[t]),!(((i??=n.getPropertyOptions(t)).hasChanged??x)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:r},n){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),!0!==r||void 0!==n)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[e,i]of t){let{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1,e=this._$AL;try{(t=this.shouldUpdate(e))?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A.elementProperties=new Map,A.finalized=new Map,v?.({ReactiveElement:A}),(y.reactiveElementVersions??=[]).push("2.1.2");let k=globalThis,$=t=>t,E=k.trustedTypes,S=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,_="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,F="?"+z,P=`<${F}>`,M=document,I=()=>M.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,R=t=>O(t)||"function"==typeof t?.[Symbol.iterator],B="[ 	\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,N=/>/g,V=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),q=/'/g,j=/"/g,H=/^(?:script|style|textarea|title)$/i,W=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),K=W(1),Y=(W(2),W(3),Symbol.for("lit-noChange")),X=Symbol.for("lit-nothing"),Z=new WeakMap,G=M.createTreeWalker(M,129);function J(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}let Q=(t,e)=>{let i=t.length-1,o=[],r,n=2===e?"<svg>":3===e?"<math>":"",a=D;for(let e=0;e<i;e++){let i=t[e],s,l,c=-1,h=0;for(;h<i.length&&(a.lastIndex=h,null!==(l=a.exec(i)));)h=a.lastIndex,a===D?"!--"===l[1]?a=U:void 0!==l[1]?a=N:void 0!==l[2]?(H.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=V):void 0!==l[3]&&(a=V):a===V?">"===l[0]?(a=r??D,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,s=l[1],a=void 0===l[3]?V:'"'===l[3]?j:q):a===j||a===q?a=V:a===U||a===N?a=D:(a=V,r=void 0);let d=a===V&&t[e+1].startsWith("/>")?" ":"";n+=a===D?i+P:c>=0?(o.push(s),i.slice(0,c)+_+i.slice(c)+z+d):i+z+(-2===c?e:d)}return[J(t,n+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class tt{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let r=0,n=0,a=t.length-1,s=this.parts,[l,c]=Q(t,e);if(this.el=tt.createElement(l,i),G.currentNode=this.el.content,2===e||3===e){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=G.nextNode())&&s.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let t of o.getAttributeNames())if(t.endsWith(_)){let e=c[n++],i=o.getAttribute(t).split(z),a=/([.?@])?(.*)/.exec(e);s.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?tn:"?"===a[1]?ta:"@"===a[1]?ts:tr}),o.removeAttribute(t)}else t.startsWith(z)&&(s.push({type:6,index:r}),o.removeAttribute(t));if(H.test(o.tagName)){let t=o.textContent.split(z),e=t.length-1;if(e>0){o.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],I()),G.nextNode(),s.push({type:2,index:++r});o.append(t[e],I())}}}else if(8===o.nodeType)if(o.data===F)s.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(z,t+1));)s.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){let i=M.createElement("template");return i.innerHTML=t,i}}function te(t,e,i=t,o){if(e===Y)return e;let r=void 0!==o?i._$Co?.[o]:i._$Cl,n=T(e)?void 0:e._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(t))._$AT(t,i,o),void 0!==o?(i._$Co??=[])[o]=r:i._$Cl=r),void 0!==r&&(e=te(t,r._$AS(t,e.values),r,o)),e}class ti{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);G.currentNode=o;let r=G.nextNode(),n=0,a=0,s=i[0];for(;void 0!==s;){if(n===s.index){let e;2===s.type?e=new to(r,r.nextSibling,this,t):1===s.type?e=new s.ctor(r,s.name,s.strings,this,t):6===s.type&&(e=new tl(r,this,t)),this._$AV.push(e),s=i[++a]}n!==s?.index&&(r=G.nextNode(),n++)}return G.currentNode=M,o}p(t){let e=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class to{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=X,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){T(t=te(this,t,e))?t===X||null==t||""===t?(this._$AH!==X&&this._$AR(),this._$AH=X):t!==this._$AH&&t!==Y&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):R(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==X&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=tt.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{let t=new ti(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new tt(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,o=0;for(let r of t)o===e.length?e.push(i=new to(this.O(I()),this.O(I()),this,this.options)):i=e[o],i._$AI(r),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,r){this.type=1,this._$AH=X,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=X}_$AI(t,e=this,i,o){let r=this.strings,n=!1;if(void 0===r)(n=!T(t=te(this,t,e,0))||t!==this._$AH&&t!==Y)&&(this._$AH=t);else{let o,a,s=t;for(t=r[0],o=0;o<r.length-1;o++)(a=te(this,s[i+o],e,o))===Y&&(a=this._$AH[o]),n||=!T(a)||a!==this._$AH[o],a===X?t=X:t!==X&&(t+=(a??"")+r[o+1]),this._$AH[o]=a}n&&!o&&this.j(t)}j(t){t===X?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tn extends tr{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===X?void 0:t}}class ta extends tr{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==X)}}class ts extends tr{constructor(t,e,i,o,r){super(t,e,i,o,r),this.type=5}_$AI(t,e=this){if((t=te(this,t,e,0)??X)===Y)return;let i=this._$AH,o=t===X&&i!==X||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==X&&(i===X||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class tl{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){te(this,t)}}let tc=k.litHtmlPolyfillSupport;tc?.(tt,to),(k.litHtmlVersions??=[]).push("3.3.2");let th=globalThis;class td extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{let o=i?.renderBefore??e,r=o._$litPart$;if(void 0===r){let t=i?.renderBefore??null;o._$litPart$=r=new to(e.insertBefore(I(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}}td._$litElement$=!0,td.finalized=!0,th.litElementHydrateSupport?.({LitElement:td});let tp=th.litElementPolyfillSupport;tp?.({LitElement:td}),(th.litElementVersions??=[]).push("4.2.2");var tu=c`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label),
  .wa-visually-hidden-label::part(form-control-label) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`,tm=c`
  :host {
    display: inline-block;
    color: var(--wa-color-neutral-on-quiet);
  }

  .button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    border-radius: var(--wa-form-control-border-radius);
    color: inherit;
    font-size: inherit;
    padding: 0.5em;
    cursor: pointer;
    transition: color var(--wa-transition-fast) var(--wa-transition-easing);
  }

  @media (hover: hover) {
    .button:hover:not([disabled]) {
      background-color: var(--wa-color-neutral-fill-quiet);
      color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
    }
  }

  .button:focus-visible:not([disabled]) {
    background-color: var(--wa-color-neutral-fill-quiet);
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-hover));
  }

  .button:active:not([disabled]) {
    color: color-mix(in oklab, currentColor, var(--wa-color-mix-active));
  }

  slot[name='success-icon'] {
    color: var(--wa-color-success-on-quiet);
  }

  slot[name='error-icon'] {
    color: var(--wa-color-danger-on-quiet);
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  .button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }

  .show {
    animation: show 100ms ease;
  }

  .hide {
    animation: show 100ms ease reverse;
  }

  @keyframes show {
    from {
      scale: 0.25;
      opacity: 0.25;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`;async function tf(t,e,i){return t.animate(e,i).finished.catch(()=>{})}function tg(t,e){return new Promise(i=>{let o=new AbortController,{signal:r}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let n=()=>{t.classList.remove(e),i(),o.abort()};t.addEventListener("animationend",n,{once:!0,signal:r}),t.addEventListener("animationcancel",n,{once:!0,signal:r})})}function ty(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?1e3*(parseFloat(t)||0):parseFloat(t)||0}var tw=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};let tb=new Set,tv=new Map,tC="ltr",tx="en",tL="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(tL){let t=new MutationObserver(tk);tC=document.documentElement.dir||"ltr",tx=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function tA(...e){e.map(e=>{let i=e.$code.toLowerCase();tv.has(i)?tv.set(i,Object.assign(Object.assign({},tv.get(i)),e)):tv.set(i,e),t||(t=e)}),tk()}function tk(){tL&&(tC=document.documentElement.dir||"ltr",tx=document.documentElement.lang||navigator.language),[...tb.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}class t${constructor(t){this.host=t,this.host.addController(this)}hostConnected(){tb.add(this.host)}hostDisconnected(){tb.delete(this.host)}dir(){return`${this.host.dir||tC}`.toLowerCase()}lang(){return`${this.host.lang||tx}`.toLowerCase()}getTranslationData(t){var e,i;let o=new Intl.Locale(t.replace(/_/g,"-")),r=null==o?void 0:o.language.toLowerCase(),n=null!=(i=null==(e=null==o?void 0:o.region)?void 0:e.toLowerCase())?i:"",a=tv.get(`${r}-${n}`),s=tv.get(r);return{locale:o,language:r,region:n,primary:a,secondary:s}}exists(e,i){var o;let{primary:r,secondary:n}=this.getTranslationData(null!=(o=i.lang)?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!r&&!!r[e]||!!n&&!!n[e]||!!i.includeFallback&&!!t&&!!t[e]}term(e,...i){let o,{primary:r,secondary:n}=this.getTranslationData(this.lang());if(r&&r[e])o=r[e];else if(n&&n[e])o=n[e];else{if(!t||!t[e])return console.error(`No translation found for: ${String(e)}`),String(e);o=t[e]}return"function"==typeof o?o(...i):o}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}}var tE={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};tA(tE);var tS=class extends t${};tA(tE);var t_=Object.defineProperty,tz=Object.getOwnPropertyDescriptor,tF=t=>{throw TypeError(t)},tP=(t,e,i,o)=>{for(var r,n=o>1?void 0:o?tz(e,i):e,a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o?r(e,i,n):r(n))||n);return o&&n&&t_(e,i,n),n},tM=(t,e,i)=>e.has(t)||tF("Cannot "+i);let tI=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},tT={attribute:!0,type:String,converter:C,reflect:!1,hasChanged:x};function tO(t){return(e,i)=>{let o;return"object"==typeof i?((t=tT,e,i)=>{let{kind:o,metadata:r}=i,n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),"accessor"===o){let{name:o}=i;return{set(i){let r=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,r,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){let{name:o}=i;return function(i){let r=this[o];e.call(this,i),this.requestUpdate(o,r,t,!0,i)}}throw Error("Unsupported decorator location: "+o)})(t,e,i):(o=e.hasOwnProperty(i),e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0)}}function tR(t){return tO({...t,state:!0,attribute:!1})}let tB=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function tD(t,e){return(i,o,r)=>{let n=e=>e.renderRoot?.querySelector(t)??null;if(e){let t,{get:e,set:a}="object"==typeof o?i:r??(t=Symbol(),{get(){return this[t]},set(e){this[t]=e}});return tB(i,o,{get(){let t=e.call(this);return void 0===t&&(null!==(t=n(this))||this.hasUpdated)&&a.call(this,t),t}})}return tB(i,o,{get(){return n(this)}})}}var tU=c`
  :host {
    box-sizing: border-box !important;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit !important;
  }

  [hidden] {
    display: none !important;
  }
`,tN=class extends td{constructor(){let t;super(),(t=e).has(this)?tF("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,e)=>{if(this.internals?.states)try{e?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(String(t).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw t}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}for(let[t,e]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===e.default&&void 0!==e.initial&&"string"==typeof t&&this.customStates.set(`initial-${t}-${e.initial}`,!0)}static get styles(){return[tU,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}attributeChangedCallback(t,i,o){let r,n;if(tM(this,r=e,"read from private field"),n?!n.call(this):!r.get(this)){let t,i;this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),tM(this,t=e,"write to private field"),i?i.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,i,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&null==this[i]&&(this[i]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){let e=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});e.error=t,this.dispatchEvent(e)}throw t}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};e=new WeakMap,tP([tO()],tN.prototype,"dir",2),tP([tO()],tN.prototype,"lang",2),tP([tO({type:Boolean,reflect:!0,attribute:"did-ssr"})],tN.prototype,"didSSR",2);let tV=t=>(...e)=>({_$litDirective$:t,values:e});class tq{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}let tj=tV(class extends tq{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let i=t.element.classList;for(let t of this.st)t in e||(i.remove(t),this.st.delete(t));for(let t in e){let o=!!e[t];o===this.st.has(t)||this.nt?.has(t)||(o?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return Y}});var tH=class extends tN{constructor(){super(...arguments),this.localize=new tS(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top"}get currentLabel(){return"success"===this.status?this.successLabel||this.localize.term("copied"):"error"===this.status?this.errorLabel||this.localize.term("error"):this.copyLabel||this.localize.term("copy")}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){let e=this.getRootNode(),i=this.from.includes("."),o=this.from.includes("[")&&this.from.includes("]"),r=this.from,n="";i?[r,n]=this.from.trim().split("."):o&&([r,n]=this.from.trim().replace(/\]$/,"").split("["));let a="getElementById"in e?e.getElementById(r):null;a?t=o?a.getAttribute(n)||"":i?a[n]||"":a.textContent||"":(this.showStatus("error"),this.dispatchEvent(new tw))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.dispatchEvent(new o({value:t}))}catch(t){this.showStatus("error"),this.dispatchEvent(new tw)}else this.showStatus("error"),this.dispatchEvent(new tw)}async showStatus(t){let e="success"===t?this.successIcon:this.errorIcon;await tg(this.copyIcon,"hide"),this.copyIcon.hidden=!0,this.status=t,e.hidden=!1,await tg(e,"show"),setTimeout(async()=>{await tg(e,"hide"),e.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await tg(this.copyIcon,"show"),this.isCopying=!1},this.feedbackDuration)}render(){return K`
      <button
        class="button"
        part="button"
        type="button"
        id="copy-button"
        ?disabled=${this.disabled}
        @click=${this.handleCopy}
      >
        <!-- Render a visually hidden label to appease the accessibility checking gods -->
        <span class="wa-visually-hidden">${this.currentLabel}</span>
        <slot part="copy-icon" name="copy-icon">
          <wa-icon library="system" name="copy" variant="regular"></wa-icon>
        </slot>
        <slot part="success-icon" name="success-icon" variant="solid" hidden>
          <wa-icon library="system" name="check"></wa-icon>
        </slot>
        <slot part="error-icon" name="error-icon" variant="solid" hidden>
          <wa-icon library="system" name="xmark"></wa-icon>
        </slot>
        <wa-tooltip
          class=${tj({"copy-button":!0,"copy-button-success":"success"===this.status,"copy-button-error":"error"===this.status})}
          for="copy-button"
          placement=${this.tooltipPlacement}
          ?disabled=${this.disabled}
          exportparts="
            base:tooltip__base,
            base__popup:tooltip__base__popup,
            base__arrow:tooltip__base__arrow,
            body:tooltip__body
          "
          >${this.currentLabel}</wa-tooltip
        >
      </button>
    `}};tH.css=[tu,tm],tP([tD('slot[name="copy-icon"]')],tH.prototype,"copyIcon",2),tP([tD('slot[name="success-icon"]')],tH.prototype,"successIcon",2),tP([tD('slot[name="error-icon"]')],tH.prototype,"errorIcon",2),tP([tD("wa-tooltip")],tH.prototype,"tooltip",2),tP([tR()],tH.prototype,"isCopying",2),tP([tR()],tH.prototype,"status",2),tP([tO()],tH.prototype,"value",2),tP([tO()],tH.prototype,"from",2),tP([tO({type:Boolean,reflect:!0})],tH.prototype,"disabled",2),tP([tO({attribute:"copy-label"})],tH.prototype,"copyLabel",2),tP([tO({attribute:"success-label"})],tH.prototype,"successLabel",2),tP([tO({attribute:"error-label"})],tH.prototype,"errorLabel",2),tP([tO({attribute:"feedback-duration",type:Number})],tH.prototype,"feedbackDuration",2),tP([tO({attribute:"tooltip-placement"})],tH.prototype,"tooltipPlacement",2),tH=tP([tI("wa-copy-button")],tH);var tW=c`
  :host {
    --max-width: 30ch;

    /** These styles are added so we don't interfere in the DOM. */
    display: inline-block;
    position: absolute;

    /** Defaults for inherited CSS properties */
    color: var(--wa-tooltip-content-color);
    font-size: var(--wa-tooltip-font-size);
    line-height: var(--wa-tooltip-line-height);
    text-align: start;
    white-space: normal;
  }

  .tooltip {
    --arrow-size: var(--wa-tooltip-arrow-size);
    --arrow-color: var(--wa-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: 1000;
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--wa-tooltip-border-radius);
    background-color: var(--wa-tooltip-background-color);
    border: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    padding: 0.25em 0.5em;
    user-select: none;
    -webkit-user-select: none;
  }

  .tooltip::part(arrow) {
    border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
  }
`,tK=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},tY=c`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: 3;
  }

  :host([data-current-placement~='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement~='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement~='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`;let tX=Math.min,tZ=Math.max,tG=Math.round,tJ=Math.floor,tQ=t=>({x:t,y:t}),t2={left:"right",right:"left",bottom:"top",top:"bottom"},t0={start:"end",end:"start"};function t1(t,e){return"function"==typeof t?t(e):t}function t4(t){return t.split("-")[0]}function t3(t){return t.split("-")[1]}function t5(t){return"x"===t?"y":"x"}function t6(t){return"y"===t?"height":"width"}let t8=new Set(["top","bottom"]);function t7(t){return t8.has(t4(t))?"y":"x"}function t9(t){return t.replace(/start|end/g,t=>t0[t])}let et=["left","right"],ee=["right","left"],ei=["top","bottom"],eo=["bottom","top"];function er(t){return t.replace(/left|right|bottom|top/g,t=>t2[t])}function en(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function ea(t){let{x:e,y:i,width:o,height:r}=t;return{width:o,height:r,top:i,left:e,right:e+o,bottom:i+r,x:e,y:i}}function es(t,e,i){let o,{reference:r,floating:n}=t,a=t7(e),s=t5(t7(e)),l=t6(s),c=t4(e),h="y"===a,d=r.x+r.width/2-n.width/2,p=r.y+r.height/2-n.height/2,u=r[l]/2-n[l]/2;switch(c){case"top":o={x:d,y:r.y-n.height};break;case"bottom":o={x:d,y:r.y+r.height};break;case"right":o={x:r.x+r.width,y:p};break;case"left":o={x:r.x-n.width,y:p};break;default:o={x:r.x,y:r.y}}switch(t3(e)){case"start":o[s]-=u*(i&&h?-1:1);break;case"end":o[s]+=u*(i&&h?-1:1)}return o}let el=async(t,e,i)=>{let{placement:o="bottom",strategy:r="absolute",middleware:n=[],platform:a}=i,s=n.filter(Boolean),l=await (null==a.isRTL?void 0:a.isRTL(e)),c=await a.getElementRects({reference:t,floating:e,strategy:r}),{x:h,y:d}=es(c,o,l),p=o,u={},m=0;for(let i=0;i<s.length;i++){let{name:n,fn:f}=s[i],{x:g,y:y,data:w,reset:b}=await f({x:h,y:d,initialPlacement:o,placement:p,strategy:r,middlewareData:u,rects:c,platform:a,elements:{reference:t,floating:e}});h=null!=g?g:h,d=null!=y?y:d,u={...u,[n]:{...u[n],...w}},b&&m<=50&&(m++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(c=!0===b.rects?await a.getElementRects({reference:t,floating:e,strategy:r}):b.rects),{x:h,y:d}=es(c,p,l)),i=-1)}return{x:h,y:d,placement:p,strategy:r,middlewareData:u}};async function ec(t,e){var i;void 0===e&&(e={});let{x:o,y:r,platform:n,rects:a,elements:s,strategy:l}=t,{boundary:c="clippingAncestors",rootBoundary:h="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=t1(e,t),m=en(u),f=s[p?"floating"===d?"reference":"floating":d],g=ea(await n.getClippingRect({element:null==(i=await (null==n.isElement?void 0:n.isElement(f)))||i?f:f.contextElement||await (null==n.getDocumentElement?void 0:n.getDocumentElement(s.floating)),boundary:c,rootBoundary:h,strategy:l})),y="floating"===d?{x:o,y:r,width:a.floating.width,height:a.floating.height}:a.reference,w=await (null==n.getOffsetParent?void 0:n.getOffsetParent(s.floating)),b=await (null==n.isElement?void 0:n.isElement(w))&&await (null==n.getScale?void 0:n.getScale(w))||{x:1,y:1},v=ea(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:y,offsetParent:w,strategy:l}):y);return{top:(g.top-v.top+m.top)/b.y,bottom:(v.bottom-g.bottom+m.bottom)/b.y,left:(g.left-v.left+m.left)/b.x,right:(v.right-g.right+m.right)/b.x}}let eh=new Set(["left","top"]);async function ed(t,e){let{placement:i,platform:o,elements:r}=t,n=await (null==o.isRTL?void 0:o.isRTL(r.floating)),a=t4(i),s=t3(i),l="y"===t7(i),c=eh.has(a)?-1:1,h=n&&l?-1:1,d=t1(e,t),{mainAxis:p,crossAxis:u,alignmentAxis:m}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&"number"==typeof m&&(u="end"===s?-1*m:m),l?{x:u*h,y:p*c}:{x:p*c,y:u*h}}function ep(){return"u">typeof window}function eu(t){return eg(t)?(t.nodeName||"").toLowerCase():"#document"}function em(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function ef(t){var e;return null==(e=(eg(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function eg(t){return!!ep()&&(t instanceof Node||t instanceof em(t).Node)}function ey(t){return!!ep()&&(t instanceof Element||t instanceof em(t).Element)}function ew(t){return!!ep()&&(t instanceof HTMLElement||t instanceof em(t).HTMLElement)}function eb(t){return!(!ep()||"u"<typeof ShadowRoot)&&(t instanceof ShadowRoot||t instanceof em(t).ShadowRoot)}let ev=new Set(["inline","contents"]);function eC(t){let{overflow:e,overflowX:i,overflowY:o,display:r}=eP(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!ev.has(r)}let ex=new Set(["table","td","th"]),eL=[":popover-open",":modal"];function eA(t){return eL.some(e=>{try{return t.matches(e)}catch(t){return!1}})}let ek=["transform","translate","scale","rotate","perspective"],e$=["transform","translate","scale","rotate","perspective","filter"],eE=["paint","layout","strict","content"];function eS(t){let e=e_(),i=ey(t)?eP(t):t;return ek.some(t=>!!i[t]&&"none"!==i[t])||!!i.containerType&&"normal"!==i.containerType||!e&&!!i.backdropFilter&&"none"!==i.backdropFilter||!e&&!!i.filter&&"none"!==i.filter||e$.some(t=>(i.willChange||"").includes(t))||eE.some(t=>(i.contain||"").includes(t))}function e_(){return!("u"<typeof CSS)&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}let ez=new Set(["html","body","#document"]);function eF(t){return ez.has(eu(t))}function eP(t){return em(t).getComputedStyle(t)}function eM(t){return ey(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function eI(t){if("html"===eu(t))return t;let e=t.assignedSlot||t.parentNode||eb(t)&&t.host||ef(t);return eb(e)?e.host:e}function eT(t,e,i){var o;void 0===e&&(e=[]),void 0===i&&(i=!0);let r=function t(e){let i=eI(e);return eF(i)?e.ownerDocument?e.ownerDocument.body:e.body:ew(i)&&eC(i)?i:t(i)}(t),n=r===(null==(o=t.ownerDocument)?void 0:o.body),a=em(r);if(n){let t=eO(a);return e.concat(a,a.visualViewport||[],eC(r)?r:[],t&&i?eT(t):[])}return e.concat(r,eT(r,[],i))}function eO(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function eR(t){let e=eP(t),i=parseFloat(e.width)||0,o=parseFloat(e.height)||0,r=ew(t),n=r?t.offsetWidth:i,a=r?t.offsetHeight:o,s=tG(i)!==n||tG(o)!==a;return s&&(i=n,o=a),{width:i,height:o,$:s}}function eB(t){return ey(t)?t:t.contextElement}function eD(t){let e=eB(t);if(!ew(e))return tQ(1);let i=e.getBoundingClientRect(),{width:o,height:r,$:n}=eR(e),a=(n?tG(i.width):i.width)/o,s=(n?tG(i.height):i.height)/r;return a&&Number.isFinite(a)||(a=1),s&&Number.isFinite(s)||(s=1),{x:a,y:s}}let eU=tQ(0);function eN(t){let e=em(t);return e_()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:eU}function eV(t,e,i,o){var r;void 0===e&&(e=!1),void 0===i&&(i=!1);let n=t.getBoundingClientRect(),a=eB(t),s=tQ(1);e&&(o?ey(o)&&(s=eD(o)):s=eD(t));let l=(void 0===(r=i)&&(r=!1),o&&(!r||o===em(a))&&r)?eN(a):tQ(0),c=(n.left+l.x)/s.x,h=(n.top+l.y)/s.y,d=n.width/s.x,p=n.height/s.y;if(a){let t=em(a),e=o&&ey(o)?em(o):o,i=t,r=eO(i);for(;r&&o&&e!==i;){let t=eD(r),e=r.getBoundingClientRect(),o=eP(r),n=e.left+(r.clientLeft+parseFloat(o.paddingLeft))*t.x,a=e.top+(r.clientTop+parseFloat(o.paddingTop))*t.y;c*=t.x,h*=t.y,d*=t.x,p*=t.y,c+=n,h+=a,r=eO(i=em(r))}}return ea({width:d,height:p,x:c,y:h})}function eq(t,e){let i=eM(t).scrollLeft;return e?e.left+i:eV(ef(t)).left+i}function ej(t,e){let i=t.getBoundingClientRect();return{x:i.left+e.scrollLeft-eq(t,i),y:i.top+e.scrollTop}}let eH=new Set(["absolute","fixed"]);function eW(t,e,i){var o;let r;if("viewport"===e)r=function(t,e){let i=em(t),o=ef(t),r=i.visualViewport,n=o.clientWidth,a=o.clientHeight,s=0,l=0;if(r){n=r.width,a=r.height;let t=e_();(!t||t&&"fixed"===e)&&(s=r.offsetLeft,l=r.offsetTop)}let c=eq(o);if(c<=0){let t=o.ownerDocument,e=t.body,i=getComputedStyle(e),r="CSS1Compat"===t.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,a=Math.abs(o.clientWidth-e.clientWidth-r);a<=25&&(n-=a)}else c<=25&&(n+=c);return{width:n,height:a,x:s,y:l}}(t,i);else if("document"===e){let e,i,n,a,s,l,c;o=ef(t),e=ef(o),i=eM(o),n=o.ownerDocument.body,a=tZ(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),s=tZ(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),l=-i.scrollLeft+eq(o),c=-i.scrollTop,"rtl"===eP(n).direction&&(l+=tZ(e.clientWidth,n.clientWidth)-a),r={width:a,height:s,x:l,y:c}}else if(ey(e)){let t,o,n,a,s,l;o=(t=eV(e,!0,"fixed"===i)).top+e.clientTop,n=t.left+e.clientLeft,a=ew(e)?eD(e):tQ(1),s=e.clientWidth*a.x,l=e.clientHeight*a.y,r={width:s,height:l,x:n*a.x,y:o*a.y}}else{let i=eN(t);r={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return ea(r)}function eK(t){return"static"===eP(t).position}function eY(t,e){if(!ew(t)||"fixed"===eP(t).position)return null;if(e)return e(t);let i=t.offsetParent;return ef(t)===i&&(i=i.ownerDocument.body),i}function eX(t,e){var i;let o=em(t);if(eA(t))return o;if(!ew(t)){let e=eI(t);for(;e&&!eF(e);){if(ey(e)&&!eK(e))return e;e=eI(e)}return o}let r=eY(t,e);for(;r&&(i=r,ex.has(eu(i)))&&eK(r);)r=eY(r,e);return r&&eF(r)&&eK(r)&&!eS(r)?o:r||function(t){let e=eI(t);for(;ew(e)&&!eF(e);){if(eS(e))return e;if(eA(e))break;e=eI(e)}return null}(t)||o}let eZ=async function(t){let e=this.getOffsetParent||eX,i=this.getDimensions,o=await i(t.floating);return{reference:function(t,e,i){let o=ew(e),r=ef(e),n="fixed"===i,a=eV(t,!0,n,e),s={scrollLeft:0,scrollTop:0},l=tQ(0);if(o||!o&&!n)if(("body"!==eu(e)||eC(r))&&(s=eM(e)),o){let t=eV(e,!0,n,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else r&&(l.x=eq(r));n&&!o&&r&&(l.x=eq(r));let c=!r||o||n?tQ(0):ej(r,s);return{x:a.left+s.scrollLeft-l.x-c.x,y:a.top+s.scrollTop-l.y-c.y,width:a.width,height:a.height}}(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},eG={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:i,offsetParent:o,strategy:r}=t,n="fixed"===r,a=ef(o),s=!!e&&eA(e.floating);if(o===a||s&&n)return i;let l={scrollLeft:0,scrollTop:0},c=tQ(1),h=tQ(0),d=ew(o);if((d||!d&&!n)&&(("body"!==eu(o)||eC(a))&&(l=eM(o)),ew(o))){let t=eV(o);c=eD(o),h.x=t.x+o.clientLeft,h.y=t.y+o.clientTop}let p=!a||d||n?tQ(0):ej(a,l);return{width:i.width*c.x,height:i.height*c.y,x:i.x*c.x-l.scrollLeft*c.x+h.x+p.x,y:i.y*c.y-l.scrollTop*c.y+h.y+p.y}},getDocumentElement:ef,getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:o,strategy:r}=t,n=[..."clippingAncestors"===i?eA(e)?[]:function(t,e){let i=e.get(t);if(i)return i;let o=eT(t,[],!1).filter(t=>ey(t)&&"body"!==eu(t)),r=null,n="fixed"===eP(t).position,a=n?eI(t):t;for(;ey(a)&&!eF(a);){let e=eP(a),i=eS(a);i||"fixed"!==e.position||(r=null),(n?!i&&!r:!i&&"static"===e.position&&!!r&&eH.has(r.position)||eC(a)&&!i&&function t(e,i){let o=eI(e);return!(o===i||!ey(o)||eF(o))&&("fixed"===eP(o).position||t(o,i))}(t,a))?o=o.filter(t=>t!==a):r=e,a=eI(a)}return e.set(t,o),o}(e,this._c):[].concat(i),o],a=n[0],s=n.reduce((t,i)=>{let o=eW(e,i,r);return t.top=tZ(o.top,t.top),t.right=tX(o.right,t.right),t.bottom=tX(o.bottom,t.bottom),t.left=tZ(o.left,t.left),t},eW(e,a,r));return{width:s.right-s.left,height:s.bottom-s.top,x:s.left,y:s.top}},getOffsetParent:eX,getElementRects:eZ,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:e,height:i}=eR(t);return{width:e,height:i}},getScale:eD,isElement:ey,isRTL:function(t){return"rtl"===eP(t).direction}};function eJ(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}let eQ=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var i,o;let r,n,{placement:a,rects:s,platform:l,elements:c}=e,{apply:h=()=>{},...d}=t1(t,e),p=await ec(e,d),u=t4(a),m=t3(a),f="y"===t7(a),{width:g,height:y}=s.floating;"top"===u||"bottom"===u?(r=u,n=m===(await (null==l.isRTL?void 0:l.isRTL(c.floating))?"start":"end")?"left":"right"):(n=u,r="end"===m?"top":"bottom");let w=y-p.top-p.bottom,b=g-p.left-p.right,v=tX(y-p[r],w),C=tX(g-p[n],b),x=!e.middlewareData.shift,L=v,A=C;if(null!=(i=e.middlewareData.shift)&&i.enabled.x&&(A=b),null!=(o=e.middlewareData.shift)&&o.enabled.y&&(L=w),x&&!m){let t=tZ(p.left,0),e=tZ(p.right,0),i=tZ(p.top,0),o=tZ(p.bottom,0);f?A=g-2*(0!==t||0!==e?t+e:tZ(p.left,p.right)):L=y-2*(0!==i||0!==o?i+o:tZ(p.top,p.bottom))}await h({...e,availableWidth:A,availableHeight:L});let k=await l.getDimensions(c.floating);return g!==k.width||y!==k.height?{reset:{rects:!0}}:{}}}};function e2(t){var e=t;for(let t=e;t;t=e0(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=e0(e);t;t=e0(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if("contents"!==e.display&&("static"!==e.position||eS(e)||"BODY"===t.tagName))return t}return null}function e0(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function e1(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var e4=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),e3=class extends tN{constructor(){super(...arguments),this.localize=new tS(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,r=0,n=0,a=0,s=0,l=0,c=0,h=0;i?t.top<e.top?(o=t.left,r=t.bottom,n=t.right,a=t.bottom,s=e.left,l=e.top,c=e.right,h=e.top):(o=e.left,r=e.bottom,n=e.right,a=e.bottom,s=t.left,l=t.top,c=t.right,h=t.top):t.left<e.left?(o=t.right,r=t.top,n=e.left,a=e.top,s=t.right,l=t.bottom,c=e.left,h=e.bottom):(o=e.right,r=e.top,n=t.left,a=t.top,s=e.right,l=e.bottom,c=t.left,h=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${r}px`),this.style.setProperty("--hover-bridge-top-right-x",`${n}px`),this.style.setProperty("--hover-bridge-top-right-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${c}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${h}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||e1(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&this.isConnected&&(this.popup?.showPopover?.(),this.cleanup=function(t,e,i,o){let r;void 0===o&&(o={});let{ancestorScroll:n=!0,ancestorResize:a=!0,elementResize:s="function"==typeof ResizeObserver,layoutShift:l="function"==typeof IntersectionObserver,animationFrame:c=!1}=o,h=eB(t),d=n||a?[...h?eT(h):[],...eT(e)]:[];d.forEach(t=>{n&&t.addEventListener("scroll",i,{passive:!0}),a&&t.addEventListener("resize",i)});let p=h&&l?function(t,e){let i,o=null,r=ef(t);function n(){var t;clearTimeout(i),null==(t=o)||t.disconnect(),o=null}return!function a(s,l){void 0===s&&(s=!1),void 0===l&&(l=1),n();let c=t.getBoundingClientRect(),{left:h,top:d,width:p,height:u}=c;if(s||e(),!p||!u)return;let m={rootMargin:-tJ(d)+"px "+-tJ(r.clientWidth-(h+p))+"px "+-tJ(r.clientHeight-(d+u))+"px "+-tJ(h)+"px",threshold:tZ(0,tX(1,l))||1},f=!0;function g(e){let o=e[0].intersectionRatio;if(o!==l){if(!f)return a();o?a(!1,o):i=setTimeout(()=>{a(!1,1e-7)},1e3)}1!==o||eJ(c,t.getBoundingClientRect())||a(),f=!1}try{o=new IntersectionObserver(g,{...m,root:r.ownerDocument})}catch(t){o=new IntersectionObserver(g,m)}o.observe(t)}(!0),n}(h,i):null,u=-1,m=null;s&&(m=new ResizeObserver(t=>{let[o]=t;o&&o.target===h&&m&&(m.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var t;null==(t=m)||t.observe(e)})),i()}),h&&!c&&m.observe(h),m.observe(e));let f=c?eV(t):null;return c&&function e(){let o=eV(t);f&&!eJ(f,o)&&i(),f=o,r=requestAnimationFrame(e)}(),i(),()=>{var t;d.forEach(t=>{n&&t.removeEventListener("scroll",i),a&&t.removeEventListener("resize",i)}),null==p||p(),null==(t=m)||t.disconnect(),m=null,c&&cancelAnimationFrame(r)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,e,i,o,r,n;let a,s,l,c,h;if(!this.active||!this.anchorEl||!this.popup)return;let d=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(e){var i,o;let{x:r,y:n,placement:a,middlewareData:s}=e,l=await ed(e,t);return a===(null==(i=s.offset)?void 0:i.placement)&&null!=(o=s.arrow)&&o.alignmentOffset?{}:{x:r+l.x,y:n+l.y,data:{...l,placement:a}}}}];this.sync?d.push(eQ({apply:({rects:t})=>{let e="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),e4&&!e1(this.anchor)&&"scroll"===this.boundary&&(a=eT(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&d.push({name:"flip",options:e={boundary:this.flipBoundary||a,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var i,o,r,n,a,s,l,c;let h,d,p,{placement:u,middlewareData:m,rects:f,initialPlacement:g,platform:y,elements:w}=t,{mainAxis:b=!0,crossAxis:v=!0,fallbackPlacements:C,fallbackStrategy:x="bestFit",fallbackAxisSideDirection:L="none",flipAlignment:A=!0,...k}=t1(e,t);if(null!=(i=m.arrow)&&i.alignmentOffset)return{};let $=t4(u),E=t7(g),S=t4(g)===g,_=await (null==y.isRTL?void 0:y.isRTL(w.floating)),z=C||(S||!A?[er(g)]:(h=er(g),[t9(g),h,t9(h)])),F="none"!==L;!C&&F&&z.push(...(d=t3(g),p=function(t,e,i){switch(t){case"top":case"bottom":if(i)return e?ee:et;return e?et:ee;case"left":case"right":return e?ei:eo;default:return[]}}(t4(g),"start"===L,_),d&&(p=p.map(t=>t+"-"+d),A&&(p=p.concat(p.map(t9)))),p));let P=[g,...z],M=await ec(t,k),I=[],T=(null==(o=m.flip)?void 0:o.overflows)||[];if(b&&I.push(M[$]),v){let t,e,i,o,r=(s=u,l=f,void 0===(c=_)&&(c=!1),t=t3(s),i=t6(e=t5(t7(s))),o="x"===e?t===(c?"end":"start")?"right":"left":"start"===t?"bottom":"top",l.reference[i]>l.floating[i]&&(o=er(o)),[o,er(o)]);I.push(M[r[0]],M[r[1]])}if(T=[...T,{placement:u,overflows:I}],!I.every(t=>t<=0)){let t=((null==(r=m.flip)?void 0:r.index)||0)+1,e=P[t];if(e&&("alignment"!==v||E===t7(e)||T.every(t=>t7(t.placement)!==E||t.overflows[0]>0)))return{data:{index:t,overflows:T},reset:{placement:e}};let i=null==(n=T.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:n.placement;if(!i)switch(x){case"bestFit":{let t=null==(a=T.filter(t=>{if(F){let e=t7(t.placement);return e===E||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:a[0];t&&(i=t);break}case"initialPlacement":i=g}if(u!==i)return{reset:{placement:i}}}return{}}}),this.shift&&d.push({name:"shift",options:i={boundary:this.shiftBoundary||a,padding:this.shiftPadding},async fn(t){let{x:e,y:o,placement:r}=t,{mainAxis:n=!0,crossAxis:a=!1,limiter:s={fn:t=>{let{x:e,y:i}=t;return{x:e,y:i}}},...l}=t1(i,t),c={x:e,y:o},h=await ec(t,l),d=t7(t4(r)),p=t5(d),u=c[p],m=c[d];if(n){let t="y"===p?"top":"left",e="y"===p?"bottom":"right",i=u+h[t],o=u-h[e];u=tZ(i,tX(u,o))}if(a){let t="y"===d?"top":"left",e="y"===d?"bottom":"right",i=m+h[t],o=m-h[e];m=tZ(i,tX(m,o))}let f=s.fn({...t,[p]:u,[d]:m});return{...f,data:{x:f.x-e,y:f.y-o,enabled:{[p]:n,[d]:a}}}}}),this.autoSize?d.push(eQ({boundary:this.autoSizeBoundary||a,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&d.push({name:"arrow",options:s={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:e,y:i,placement:o,rects:r,platform:n,elements:a,middlewareData:l}=t,{element:c,padding:h=0}=t1(s,t)||{};if(null==c)return{};let d=en(h),p={x:e,y:i},u=t5(t7(o)),m=t6(u),f=await n.getDimensions(c),g="y"===u,y=g?"clientHeight":"clientWidth",w=r.reference[m]+r.reference[u]-p[u]-r.floating[m],b=p[u]-r.reference[u],v=await (null==n.getOffsetParent?void 0:n.getOffsetParent(c)),C=v?v[y]:0;C&&await (null==n.isElement?void 0:n.isElement(v))||(C=a.floating[y]||r.floating[m]);let x=C/2-f[m]/2-1,L=tX(d[g?"top":"left"],x),A=tX(d[g?"bottom":"right"],x),k=C-f[m]-A,$=C/2-f[m]/2+(w/2-b/2),E=tZ(L,tX($,k)),S=!l.arrow&&null!=t3(o)&&$!==E&&r.reference[m]/2-($<L?L:A)-f[m]/2<0,_=S?$<L?$-L:$-k:0;return{[u]:p[u]+_,data:{[u]:E,centerOffset:$-E-_,...S&&{alignmentOffset:_}},reset:S}}});let p=e4?t=>eG.getOffsetParent(t,e2):eG.getOffsetParent;(o=this.anchorEl,r=this.popup,n={placement:this.placement,middleware:d,strategy:e4?"absolute":"fixed",platform:{...eG,getOffsetParent:p}},l=new Map,h={...(c={platform:eG,...n}).platform,_c:l},el(o,r,{...c,platform:h})).then(({x:t,y:e,middlewareData:i,placement:o})=>{let r="rtl"===this.localize.dir(),n={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){let t=i.arrow.x,e=i.arrow.y,o="",a="",s="",l="";if("start"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",a=r?i:"",l=r?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";a=r?"":i,l=r?i:"",s="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",o="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:o,right:a,bottom:s,left:l,[n]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new tK)}render(){return K`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${tj({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${tj({popup:!0,"popup-active":this.active,"popup-fixed":!e4,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?K`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};e3.css=tY,tP([tD(".popup")],e3.prototype,"popup",2),tP([tD(".arrow")],e3.prototype,"arrowEl",2),tP([tO()],e3.prototype,"anchor",2),tP([tO({type:Boolean,reflect:!0})],e3.prototype,"active",2),tP([tO({reflect:!0})],e3.prototype,"placement",2),tP([tO()],e3.prototype,"boundary",2),tP([tO({type:Number})],e3.prototype,"distance",2),tP([tO({type:Number})],e3.prototype,"skidding",2),tP([tO({type:Boolean})],e3.prototype,"arrow",2),tP([tO({attribute:"arrow-placement"})],e3.prototype,"arrowPlacement",2),tP([tO({attribute:"arrow-padding",type:Number})],e3.prototype,"arrowPadding",2),tP([tO({type:Boolean})],e3.prototype,"flip",2),tP([tO({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],e3.prototype,"flipFallbackPlacements",2),tP([tO({attribute:"flip-fallback-strategy"})],e3.prototype,"flipFallbackStrategy",2),tP([tO({type:Object})],e3.prototype,"flipBoundary",2),tP([tO({attribute:"flip-padding",type:Number})],e3.prototype,"flipPadding",2),tP([tO({type:Boolean})],e3.prototype,"shift",2),tP([tO({type:Object})],e3.prototype,"shiftBoundary",2),tP([tO({attribute:"shift-padding",type:Number})],e3.prototype,"shiftPadding",2),tP([tO({attribute:"auto-size"})],e3.prototype,"autoSize",2),tP([tO()],e3.prototype,"sync",2),tP([tO({type:Object})],e3.prototype,"autoSizeBoundary",2),tP([tO({attribute:"auto-size-padding",type:Number})],e3.prototype,"autoSizePadding",2),tP([tO({attribute:"hover-bridge",type:Boolean})],e3.prototype,"hoverBridge",2),e3=tP([tI("wa-popup")],e3);var e5=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}},e6=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},e8=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},e7=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};function e9(t,e){return new Promise(i=>{t.addEventListener(e,function o(r){r.target===t&&(t.removeEventListener(e,o),i())})})}function it(t,e){let i={waitUntilFirstUpdate:!1,...e};return(e,o)=>{let{update:r}=e,n=Array.isArray(t)?t:[t];e.update=function(t){n.forEach(e=>{if(t.has(e)){let r=t.get(e),n=this[e];r!==n&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](r,n)}}),r.call(this,t)}}}var ie=class extends tN{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=!!this.anchor?.matches(":hover"),e=this.matches(":hover");!t&&!e&&(clearTimeout(this.hoverTimeout),t||e||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay)))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=function(t=""){return`${t}${((t=21)=>{let e="",i=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&i[t]];return e})()}`}("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(e)||(i.push(e),t.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(t=>t!==e);i.length>0?t.setAttribute("aria-labelledby",i.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new e5;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await tg(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new e7)}else{let t=new e6;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await tg(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new e8)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,i=this.anchor;if(e===i)return;let{signal:o}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:o}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:o}),e.addEventListener("click",this.handleClick,{signal:o}),e.addEventListener("mouseover",this.handleMouseOver,{signal:o}),e.addEventListener("mouseout",this.handleMouseOut,{signal:o})),i&&(this.removeFromAriaLabelledBy(i,this.id),i.removeEventListener("blur",this.handleBlur,{capture:!0}),i.removeEventListener("focus",this.handleFocus,{capture:!0}),i.removeEventListener("click",this.handleClick),i.removeEventListener("mouseover",this.handleMouseOver),i.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,e9(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,e9(this,"wa-after-hide")}render(){return K`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${tj({tooltip:!0,"tooltip-open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        flip
        shift
        ?arrow=${!this.withoutArrow}
        hover-bridge
        .anchor=${this.anchor}
      >
        <div part="body" class="body">
          <slot></slot>
        </div>
      </wa-popup>
    `}};ie.css=tW,ie.dependencies={"wa-popup":e3},tP([tD("slot:not([name])")],ie.prototype,"defaultSlot",2),tP([tD(".body")],ie.prototype,"body",2),tP([tD("wa-popup")],ie.prototype,"popup",2),tP([tO()],ie.prototype,"placement",2),tP([tO({type:Boolean,reflect:!0})],ie.prototype,"disabled",2),tP([tO({type:Number})],ie.prototype,"distance",2),tP([tO({type:Boolean,reflect:!0})],ie.prototype,"open",2),tP([tO({type:Number})],ie.prototype,"skidding",2),tP([tO({attribute:"show-delay",type:Number})],ie.prototype,"showDelay",2),tP([tO({attribute:"hide-delay",type:Number})],ie.prototype,"hideDelay",2),tP([tO()],ie.prototype,"trigger",2),tP([tO({attribute:"without-arrow",type:Boolean,reflect:!0})],ie.prototype,"withoutArrow",2),tP([tO()],ie.prototype,"for",2),tP([tR()],ie.prototype,"anchor",2),tP([it("open",{waitUntilFirstUpdate:!0})],ie.prototype,"handleOpenChange",1),tP([it("for")],ie.prototype,"handleForChange",1),tP([it(["distance","placement","skidding"])],ie.prototype,"handleOptionsChange",1),tP([it("disabled")],ie.prototype,"handleDisabledChange",1),ie=tP([tI("wa-tooltip")],ie);var ii=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},io=c`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* Standard */
  :host(:not([auto-width])) {
    width: 1.25em;
    height: 1em;
  }

  /* Auto-width */
  :host([auto-width]) {
    width: auto;
    height: 1em;
  }

  svg {
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* Animations */
  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin-pulse;
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  /* Keyframes */
  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']) {
      animation: none !important;
      transition: none !important;
    }
  }
  @keyframes beat {
    0%,
    90% {
      transform: scale(1);
    }
    45% {
      transform: scale(var(--beat-scale, 1.25));
    }
  }

  @keyframes fade {
    50% {
      opacity: var(--fade-opacity, 0.4);
    }
  }

  @keyframes beat-fade {
    0%,
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
    50% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.125));
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
    }
    10% {
      transform: scale(var(--bounce-start-scale-x, 1.1), var(--bounce-start-scale-y, 0.9)) translateY(0);
    }
    30% {
      transform: scale(var(--bounce-jump-scale-x, 0.9), var(--bounce-jump-scale-y, 1.1))
        translateY(var(--bounce-height, -0.5em));
    }
    50% {
      transform: scale(var(--bounce-land-scale-x, 1.05), var(--bounce-land-scale-y, 0.95)) translateY(0);
    }
    57% {
      transform: scale(1, 1) translateY(var(--bounce-rebound, -0.125em));
    }
    64% {
      transform: scale(1, 1) translateY(0);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes flip {
    50% {
      transform: rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -180deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    4% {
      transform: rotate(15deg);
    }
    8%,
    24% {
      transform: rotate(-18deg);
    }
    12%,
    28% {
      transform: rotate(18deg);
    }
    16% {
      transform: rotate(-22deg);
    }
    20% {
      transform: rotate(22deg);
    }
    32% {
      transform: rotate(-12deg);
    }
    36% {
      transform: rotate(12deg);
    }
    40%,
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-pulse {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`,ir={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},ia="",is="7.1.0",il=[{name:"default",resolver:(t,e="classic",i="solid")=>{let o,r,n;return r=(o=function(){if(!ia){let t=document.querySelector("[data-fa-kit-code]");t&&(ia=t.getAttribute("data-fa-kit-code")||"")}return ia}()).length>0,n="solid","notdog"===e&&("solid"===i&&(n="notdog-solid"),"duo-solid"===i&&(n="notdog-duo-solid")),"notdog-duo"===e&&(n="notdog-duo-solid"),"chisel"===e&&(n="chisel-regular"),"etch"===e&&(n="etch-solid"),"jelly"===e&&(n="jelly-regular","duo-regular"===i&&(n="jelly-duo-regular"),"fill-regular"===i&&(n="jelly-fill-regular")),"jelly-duo"===e&&(n="jelly-duo-regular"),"jelly-fill"===e&&(n="jelly-fill-regular"),"slab"===e&&(("solid"===i||"regular"===i)&&(n="slab-regular"),"press-regular"===i&&(n="slab-press-regular")),"slab-press"===e&&(n="slab-press-regular"),"thumbprint"===e&&(n="thumbprint-light"),"whiteboard"===e&&(n="whiteboard-semibold"),"utility"===e&&(n="utility-semibold"),"utility-duo"===e&&(n="utility-duo-semibold"),"utility-fill"===e&&(n="utility-fill-semibold"),"classic"===e&&("thin"===i&&(n="thin"),"light"===i&&(n="light"),"regular"===i&&(n="regular"),"solid"===i&&(n="solid")),"sharp"===e&&("thin"===i&&(n="sharp-thin"),"light"===i&&(n="sharp-light"),"regular"===i&&(n="sharp-regular"),"solid"===i&&(n="sharp-solid")),"duotone"===e&&("thin"===i&&(n="duotone-thin"),"light"===i&&(n="duotone-light"),"regular"===i&&(n="duotone-regular"),"solid"===i&&(n="duotone")),"sharp-duotone"===e&&("thin"===i&&(n="sharp-duotone-thin"),"light"===i&&(n="sharp-duotone-light"),"regular"===i&&(n="sharp-duotone-regular"),"solid"===i&&(n="sharp-duotone-solid")),"brands"===e&&(n="brands"),r?`https://ka-p.fontawesome.com/releases/v${is}/svgs/${n}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${is}/svgs/${n}/${t}.svg`},mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:i,variant:o}=e;if("duotone"===i||"sharp-duotone"===i||"notdog-duo"===i||"notdog"===i&&"duo-solid"===o||"jelly-duo"===i||"jelly"===i&&"duo-regular"===o||"utility-duo"===i||"thumbprint"===i){let i=[...t.querySelectorAll("path")],o=i.find(t=>!t.hasAttribute("opacity")),r=i.find(t=>t.hasAttribute("opacity"));if(!o||!r)return;if(o.setAttribute("data-duotone-primary",""),r.setAttribute("data-duotone-secondary",""),e.swapOpacity&&o&&r){let t=r.getAttribute("opacity")||"0.4";o.style.setProperty("--path-opacity",t),r.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},{name:"system",resolver:(t,e="classic",i="solid")=>{let o=ir[i][t]??ir.regular[t]??ir.regular["circle-question"];if(o)return`data:image/svg+xml,${encodeURIComponent(o)}`;return""}}],ic=[];function ih(t){return il.find(e=>e.name===t)}let{I:id}={M:_,P:z,A:F,C:1,L:Q,R:ti,D:R,V:te,I:to,H:tr,N:ta,U:ts,B:tn,F:tl},ip={};var iu=Symbol(),im=Symbol(),ig=new Map,iy=class extends tN{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=K`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof e.mutator&&e.mutator(i,this),this.svg}try{if(!(o=await fetch(t,{mode:"cors"})).ok)return 410===o.status?iu:im}catch{return im}try{let t=document.createElement("div");t.innerHTML=await o.text();let e=t.firstElementChild;if(e?.tagName?.toLowerCase()!=="svg")return iu;i||(i=new DOMParser);let r=i.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");if(!r)return iu;return r.part.add("svg"),document.adoptNode(r)}catch{return iu}}}connectedCallback(){super.connectedCallback(),ic.push(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,ic=ic.filter(e=>e!==t)}getIconSource(){let t=ih(this.library),e=this.family||"classic";return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=this.getIconSource(),i=e?ih(this.library):void 0;if(!t){this.svg=null;return}let o=ig.get(t);o||(o=this.resolveIcon(t,i),ig.set(t,o));let r=await o;if(r===im&&ig.delete(t),t===this.getIconSource().url){let t;if(void 0===t?void 0!==r?._$litType$:r?._$litType$===t){this.svg=r;return}switch(r){case im:case iu:this.svg=null,this.dispatchEvent(new tw);break;default:this.svg=r.cloneNode(!0),i?.mutator?.(this.svg,this),this.dispatchEvent(new ii)}}}updated(t){super.updated(t);let e=ih(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let i=this.shadowRoot?.querySelector("svg");i&&e?.mutator?.(i,this)}render(){return this.hasUpdated?this.svg:K`<svg part="svg" width="16" height="16"></svg>`}};iy.css=io,tP([tR()],iy.prototype,"svg",2),tP([tO({reflect:!0})],iy.prototype,"name",2),tP([tO({reflect:!0})],iy.prototype,"family",2),tP([tO({reflect:!0})],iy.prototype,"variant",2),tP([tO({attribute:"auto-width",type:Boolean,reflect:!0})],iy.prototype,"autoWidth",2),tP([tO({attribute:"swap-opacity",type:Boolean,reflect:!0})],iy.prototype,"swapOpacity",2),tP([tO()],iy.prototype,"src",2),tP([tO()],iy.prototype,"label",2),tP([tO({reflect:!0})],iy.prototype,"library",2),tP([tO({type:Number,reflect:!0})],iy.prototype,"rotate",2),tP([tO({type:String,reflect:!0})],iy.prototype,"flip",2),tP([tO({type:String,reflect:!0})],iy.prototype,"animation",2),tP([it("label")],iy.prototype,"handleLabelChange",1),tP([it(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],iy.prototype,"setIcon",1),iy=tP([tI("wa-icon")],iy);let iw=[["path",{d:"m9 18 6-6-6-6"}]],ib={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},iv=([t,e,i])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{o.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{let e=iv(t);o.appendChild(e)}),o},iC=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",ix=(t,{nameAttr:e,icons:i,attrs:o})=>{let r=t.getAttribute(e);if(null==r)return;let n=i[r.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!n)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let a=Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),s={...ib,"data-lucide":r,...o,...a},l=["lucide",`lucide-${r}`,a,o].flatMap(iC).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");l&&Object.assign(s,{class:l});let c=((t,e={})=>iv(["svg",{...ib,...e},t]))(n,s);return t.parentNode?.replaceChild(c,t)},iL=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]],iA=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]],ik=({icons:t={},nameAttr:e="data-lucide",attrs:i={},root:o=document,inTemplates:r}={})=>{if(!Object.values(t).length)throw Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if(void 0===o)throw Error("`createIcons()` only works in a browser environment.");if(Array.from(o.querySelectorAll(`[${e}]`)).forEach(o=>ix(o,{nameAttr:e,icons:t,attrs:i})),r&&Array.from(o.querySelectorAll("template")).forEach(o=>ik({icons:t,nameAttr:e,attrs:i,root:o.content,inTemplates:r})),"data-lucide"===e){let e=o.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>ix(e,{nameAttr:"icon-name",icons:t,attrs:i})))}},i$="data-icon";function iE([t,e]){let i=document.createElement("span");return i.setAttribute(i$,e),i.setAttribute("slot",t),i}function iS(){ik({icons:{ChevronRight:iw,Link:iL,Unlink:iA},nameAttr:i$})}let i_={"copy-icon":"link","success-icon":"link","error-icon":"unlink"};class iz extends tH{static styles=[c`
      :host {
        --wa-tooltip-arrow-size: 0.5rem;
        --wa-tooltip-background-color: oklch(0.442 0.017 285.786); /* $zinc-600 */
      }

      :host wa-tooltip::part(base__arrow) {
        --arrow-size-diagonal: calc(var(--arrow-size) * 0.6);
        z-index: -1;
      }

      :host wa-tooltip::part(body) {
        --wa-tooltip-border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
      }
    `,super.styles];constructor(){super()}connectedCallback(){super.connectedCallback(),this.copyLabel="Copy link",this.successLabel="Copied",this.errorLabel="Can't copy link",this.closest("h1, h2, h3, h4, h5, h6")&&Object.entries(i_).forEach(t=>{this.appendChild(iE(t))}),iS()}async handleCopy(){let t=this.from,e=new URL(window.location.href),i=document.createElement("span"),o=t.replace(/\./g,"_").replace(/\[/g,"_");e.hash=t,i.id=`FAKE_TARGET_${o}`,i.textContent=e.href,i.style.display="none",this.appendChild(i),this.from=i.id,await super.handleCopy(),this.from=t,this.removeChild(i)}}customElements.define("copy-url",iz);let iF=["copy-url","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let t=iF.filter(t=>document.querySelector(t));for(let e of(await Promise.allSettled(t.map(t=>customElements.whenDefined(t))),t))for(let t of document.querySelectorAll(e))t.classList.add("ready")})();var iP={},iM="u">typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(t){setTimeout(t,16)};iP=function(t){var e="startValue"in t?t.startValue:0,i="endValue"in t?t.endValue:1,o="durationMs"in t?t.durationMs:200,r=t.onComplete||function(){},n=o/16,a=(i-e)/n,s=Math.PI/n,l=e,c=0;iM(function e(){c+=s,l+=a*Math.pow(Math.sin(c),2)*2,c<Math.PI?(t.onStep(l),iM(e)):(t.onStep(i),r())})},(()=>{let t="PageUp",e="--navbar-scroll-margin";function i(t,i){var o;let r,n=getComputedStyle(document.body);return t&&(r=getComputedStyle(t).getPropertyValue(e)),r||(r=n.getPropertyValue(e)),i-(r=5*Math.ceil((r=(o=Number(r.replace("rem","")))*parseFloat(n.fontSize))/5))}function o(t){var e;((e=iP)&&e.__esModule?e.default:e)({durationMs:200,startValue:window.scrollY,endValue:t,onStep:t=>window.scroll({behavior:"instant",top:t})})}function r(t,e,r){let n;e&&(n=document.getElementById(e))&&(t.preventDefault(),o(i(n,n.offsetTop)),window.history.pushState(null,null,r))}function n(t){return t.substring(1)}window.addEventListener("load",t=>{r(t,n(document.location.hash),document.location.href)}),window.addEventListener("hashchange",t=>{let e=new URL(t.newURL);r(t,n(e.hash),e.hash)}),document.addEventListener("keydown",e=>{let r,n=e.code;("Space"===n||"PageDown"===n||n===t)&&(e.preventDefault(),e.stopImmediatePropagation(),r=i(null,window.innerHeight),n===t?o(window.scrollY-r):o(window.scrollY+r))})})();var iI=c`
  :host {
    --spacing: var(--wa-space-m);
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
  }

  details {
    display: block;
    overflow-anchor: none;
    border: var(--wa-panel-border-width) var(--wa-color-surface-border) var(--wa-panel-border-style);
    background-color: var(--wa-color-surface-default);
    border-radius: var(--wa-panel-border-radius);
    color: var(--wa-color-text-normal);

    /* Print styles */
    @media print {
      background: none;
      border: solid var(--wa-border-width-s) var(--wa-color-surface-border);

      summary {
        list-style: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) details {
    background-color: transparent;
    border-color: transparent;
    border-radius: 0;
  }

  :host([appearance='outlined']) details {
    background-color: var(--wa-color-surface-default);
    border-color: var(--wa-color-surface-border);
  }

  :host([appearance='filled']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: transparent;
  }

  :host([appearance='filled-outlined']) details {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-color: var(--wa-color-neutral-border-quiet);
  }

  :host([disabled]) details {
    opacity: 0.5;
    cursor: not-allowed;
  }

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing);
    padding: var(--spacing); /* Add padding here */
    border-radius: calc(var(--wa-panel-border-radius) - var(--wa-panel-border-width));
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;

    &::marker,
    &::-webkit-details-marker {
      display: none;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: calc(var(--wa-panel-border-width) + var(--wa-focus-ring-offset));
    }
  }

  :host([open]) summary {
    border-end-start-radius: 0;
    border-end-end-radius: 0;
  }

  /* 'Start' icon placement */
  :host([icon-placement='start']) summary {
    flex-direction: row-reverse;
    justify-content: start;
  }

  [part~='icon'] {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    color: var(--wa-color-text-quiet);
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  :host([open]) [part~='icon'] {
    rotate: 90deg;
  }

  :host([open]:dir(rtl)) [part~='icon'] {
    rotate: -90deg;
  }

  :host([open]) slot[name='expand-icon'],
  :host(:not([open])) slot[name='collapse-icon'] {
    display: none;
  }

  .body.animating {
    overflow: hidden;
  }

  .content {
    display: block;
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`,iT=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},iO=class extends tN{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new iT))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let i of e.observedAttributes)t.add(i);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){let t=this.value;if(Array.isArray(t)){if(this.name){let e=new FormData;for(let i of t)e.append(this.name,i);this.setValue(e,e)}}else this.setValue(t,t)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],i=t[1],o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,i,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&i),this.customStates.set("user-valid",e&&i)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,"restore"===e&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,i]=t;this.internals.setFormValue(e,i)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},i=this.validationTarget||this.input||void 0,o="";for(let i of t){let{isValid:t,message:r,invalidKeys:n}=i.checkValidity(this);!t&&(o||(o=r),n?.length>=0&&n.forEach(t=>e[t]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,i)}};iO.formAssociated=!0,tP([tO({reflect:!0})],iO.prototype,"name",2),tP([tO({type:Boolean})],iO.prototype,"disabled",2),tP([tO({state:!0,attribute:!1})],iO.prototype,"valueHasChanged",2),tP([tO({state:!0,attribute:!1})],iO.prototype,"hasInteracted",2),tP([tO({attribute:"custom-error",reflect:!0})],iO.prototype,"customError",2),tP([tO({attribute:!1,state:!0,type:Object})],iO.prototype,"validity",1);var iR=class extends tN{constructor(){super(...arguments),this.localize=new tS(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)"attributes"===e.type&&"open"===e.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){!t.composedPath().some(t=>t instanceof HTMLElement&&(!!["a","button","input","textarea","select"].includes(t.tagName?.toLowerCase())||t instanceof iO&&(!("disabled"in t)||!t.disabled)))&&(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.open?this.hide():this.show()),("ArrowUp"===t.key||"ArrowLeft"===t.key)&&(t.preventDefault(),this.hide()),("ArrowDown"===t.key||"ArrowRight"===t.key)&&(t.preventDefault(),this.show())}closeOthersWithSameName(){this.name&&this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(t=>{t!==this&&t.open&&(t.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let t=new e5;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let e=ty(getComputedStyle(this.body).getPropertyValue("--show-duration"));await tf(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new e7)}else{let t=new e6;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let e=ty(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await tf(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new e8)}}async show(){if(!this.open&&!this.disabled)return this.open=!0,e9(this,"wa-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,e9(this,"wa-after-hide")}render(){let t=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir;return K`
      <details part="base">
        <summary
          part="header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary">${this.summary}</slot>

          <span part="icon">
            <slot name="expand-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${t?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${tj({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};iR.css=iI,tP([tD("details")],iR.prototype,"details",2),tP([tD("summary")],iR.prototype,"header",2),tP([tD(".body")],iR.prototype,"body",2),tP([tD(".expand-icon-slot")],iR.prototype,"expandIconSlot",2),tP([tR()],iR.prototype,"isAnimating",2),tP([tO({type:Boolean,reflect:!0})],iR.prototype,"open",2),tP([tO()],iR.prototype,"summary",2),tP([tO({reflect:!0})],iR.prototype,"name",2),tP([tO({type:Boolean,reflect:!0})],iR.prototype,"disabled",2),tP([tO({reflect:!0})],iR.prototype,"appearance",2),tP([tO({attribute:"icon-placement",reflect:!0})],iR.prototype,"iconPlacement",2),tP([it("open",{waitUntilFirstUpdate:!0})],iR.prototype,"handleOpenChange",1),iR=tP([tI("wa-details")],iR);var iB=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},iD=c`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--wa-color-surface-border);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: var(--wa-space-l);

    display: block;

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`,iU=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}},iN=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}},iV=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}},iq=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}},ij=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},iH=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},iW=c`
  :host {
    --show-duration: 200ms;
    --hide-duration: 200ms;

    display: block;
    color: var(--wa-color-text-normal);
    outline: 0;
    z-index: 0;
  }

  :host(:focus) {
    outline: none;
  }

  slot:not([name])::slotted(wa-icon) {
    margin-inline-end: var(--wa-space-xs);
  }

  .tree-item {
    position: relative;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
  }

  .checkbox {
    line-height: var(--wa-form-control-value-line-height);
    pointer-events: none;
  }

  .expand-button,
  .checkbox,
  .label {
    font-family: inherit;
    font-size: var(--wa-font-size-m);
    font-weight: inherit;
  }

  .checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .indentation {
    display: block;
    width: 1em;
    flex-shrink: 0;
  }

  .expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--wa-color-text-quiet);
    width: 2em;
    height: 2em;
    flex-shrink: 0;
    cursor: pointer;
  }

  .expand-button {
    transition: rotate var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .tree-item-expanded .expand-button {
    rotate: 90deg;
  }

  .tree-item-expanded:dir(rtl) .expand-button {
    rotate: -90deg;
  }

  .tree-item-expanded:not(.tree-item-loading) slot[name='expand-icon'],
  .tree-item:not(.tree-item-expanded) slot[name='collapse-icon'] {
    display: none;
  }

  .tree-item:not(.tree-item-has-expand-button):not(.tree-item-loading) .expand-icon-slot {
    display: none;
  }

  .tree-item:not(.tree-item-has-expand-button):not(.tree-item-loading) .expand-button {
    cursor: default;
  }

  .tree-item-loading .expand-icon-slot wa-icon {
    display: none;
  }

  .expand-button-visible {
    cursor: pointer;
  }

  .item {
    display: flex;
    align-items: center;
    border-inline-start: solid 3px transparent;
  }

  :host([disabled]) .item {
    opacity: 0.5;
    outline: none;
    cursor: not-allowed;
  }

  :host(:focus-visible) .item {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
    z-index: 2;
  }

  :host(:not([aria-disabled='true'])) .tree-item-selected .item {
    background-color: var(--wa-color-neutral-fill-quiet);
    border-inline-start-color: var(--wa-color-brand-fill-loud);
  }

  :host(:not([aria-disabled='true'])) .expand-button {
    color: var(--wa-color-text-quiet);
  }

  .label {
    display: flex;
    align-items: center;
    transition: color var(--wa-transition-normal) var(--wa-transition-easing);
  }

  .children {
    display: block;
    font-size: calc(1em + var(--indent-size, var(--wa-space-m)));
  }

  /* Indentation lines */
  .children {
    position: relative;
  }

  .children::before {
    content: '';
    position: absolute;
    top: var(--indent-guide-offset);
    bottom: var(--indent-guide-offset);
    inset-inline-start: calc(1em - (var(--indent-guide-width) / 2) - 1px);
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item-selected .item {
      outline: dashed 1px SelectedItem;
    }
  }
`;let iK=tV(class extends tq{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Y||e===X)return e;let i=t.element,o=t.name;if(3===t.type){if(e===i[o])return Y}else if(4===t.type){if(!!e===i.hasAttribute(o))return Y}else if(1===t.type&&i.getAttribute(o)===e+"")return Y;return((t,e=ip)=>t._$AH=e)(t),e}});var iY=class extends tN{constructor(){super(...arguments),this.localize=new tS(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&"treeitem"===t.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new ij);let t=ty(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await tf(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new iH)}isNestedItem(){let t=this.parentElement;return!!t&&iY.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new iV),this.childrenContainer.hidden=!1;let t=ty(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await tf(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new iq)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new iN)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new iU)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>iY.isTreeItem(e)&&(t||!e.disabled)):[]}render(){var t,e,i,o,r;let n="rtl"===this.localize.dir(),a=!this.loading&&(!this.isLeaf||this.lazy);return K`
      <div
        part="base"
        class="${tj({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":a})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${tj({"expand-button":!0,"expand-button-visible":a})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${t=this.loading,e=()=>K` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,i=()=>K`
                  <wa-icon name=${n?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `,t?e(t):i?.(t)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${n?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${o=this.selectable,r=()=>K`
              <wa-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="checkbox"
                ?disabled="${this.disabled}"
                ?checked="${iK(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `,o?r(o):void 0}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};function iX(t,e=!1){function i(t){let e=t.getChildrenItems({includeDisabled:!1});if(e.length){let i=e.every(t=>t.selected),o=e.every(t=>!t.selected&&!t.indeterminate);t.selected=i,t.indeterminate=!i&&!o}}!function t(o){for(let i of o.getChildrenItems())i.selected=e?o.selected||i.selected:!i.disabled&&o.selected,t(i);e&&i(o)}(t),function t(e){let o=e.parentElement;iY.isTreeItem(o)&&(i(o),t(o))}(t)}iY.css=iW,tP([tR()],iY.prototype,"indeterminate",2),tP([tR()],iY.prototype,"isLeaf",2),tP([tR()],iY.prototype,"loading",2),tP([tR()],iY.prototype,"selectable",2),tP([tO({type:Boolean,reflect:!0})],iY.prototype,"expanded",2),tP([tO({type:Boolean,reflect:!0})],iY.prototype,"selected",2),tP([tO({type:Boolean,reflect:!0})],iY.prototype,"disabled",2),tP([tO({type:Boolean,reflect:!0})],iY.prototype,"lazy",2),tP([tD("slot:not([name])")],iY.prototype,"defaultSlot",2),tP([tD("slot[name=children]")],iY.prototype,"childrenSlot",2),tP([tD(".item")],iY.prototype,"itemElement",2),tP([tD(".children")],iY.prototype,"childrenContainer",2),tP([tD(".expand-button slot")],iY.prototype,"expandButtonSlot",2),tP([it("loading",{waitUntilFirstUpdate:!0})],iY.prototype,"handleLoadingChange",1),tP([it("disabled")],iY.prototype,"handleDisabledChange",1),tP([it("expanded")],iY.prototype,"handleExpandedState",1),tP([it("indeterminate")],iY.prototype,"handleIndeterminateStateChange",1),tP([it("selected")],iY.prototype,"handleSelectedChange",1),tP([it("expanded",{waitUntilFirstUpdate:!0})],iY.prototype,"handleExpandedChange",1),tP([it("expanded",{waitUntilFirstUpdate:!0})],iY.prototype,"handleExpandAnimation",1),tP([it("lazy",{waitUntilFirstUpdate:!0})],iY.prototype,"handleLazyChange",1),iY=tP([tI("wa-tree-item")],iY);var iZ=class extends tN{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new tS(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable="multiple"===this.selection,["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(e=>{let i=t.querySelector(`[slot="${e}-icon"]`),o=this.getExpandButtonIcon(e);o&&(null===i?t.append(o):i.hasAttribute("data-default")&&i.replaceWith(o))})})},this.handleTreeChanged=t=>{for(let e of t){let t=[...e.addedNodes].filter(iY.isTreeItem),i=[...e.removedNodes].filter(iY.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;e&&this.contains(e)||(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),iY.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){let e=("expand"===t?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(e){let i=e.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(t=>t.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${t}-icon`,i}return null}selectItem(t){let e=[...this.selectedItems];if("multiple"===this.selection)t.selected=!t.selected,t.lazy&&(t.expanded=!0),iX(t);else if("single"===this.selection||t.isLeaf)for(let e of this.getAllTreeItems())e.selected=e===t;else"leaf"===this.selection&&(t.expanded=!t.expanded);let i=this.selectedItems;(e.length!==i.length||i.some(t=>!e.includes(t)))&&Promise.all(i.map(t=>t.updateComplete)).then(()=>{this.dispatchEvent(new iB({selection:i}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(t=>["input","textarea"].includes(t?.tagName?.toLowerCase())))return;let e=this.getFocusableItems(),i=this.matches(":dir(ltr)"),o="rtl"===this.localize.dir();if(e.length>0){t.preventDefault();let r=e.findIndex(t=>t.matches(":focus")),n=e[r],a=t=>{var i;let o=e[i=e.length-1,(t=>Object.is(t,-0)?0:t)(t<0?0:t>i?i:t)];this.focusItem(o)},s=t=>{n.expanded=t};"ArrowDown"===t.key?a(r+1):"ArrowUp"===t.key?a(r-1):i&&"ArrowRight"===t.key||o&&"ArrowLeft"===t.key?!n||n.disabled||n.expanded||n.isLeaf&&!n.lazy?a(r+1):s(!0):i&&"ArrowLeft"===t.key||o&&"ArrowRight"===t.key?!n||n.disabled||n.isLeaf||!n.expanded?a(r-1):s(!1):"Home"===t.key?a(0):"End"===t.key?a(e.length-1):"Enter"!==t.key&&" "!==t.key||n.disabled||this.selectItem(n)}}handleClick(t){let e=t.target,i=e.closest("wa-tree-item"),o=t.composedPath().some(t=>t?.classList?.contains("expand-button"));i&&!i.disabled&&e===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t="multiple"===this.selection,e=this.getAllTreeItems();for(let i of(this.setAttribute("aria-multiselectable",t?"true":"false"),e))i.updateComplete.then(()=>{i.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(t=>{t.updateComplete.then(()=>{iX(t,!0)})}))}get selectedItems(){return this.getAllTreeItems().filter(t=>t.selected)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(t=>{if(t.disabled)return!1;let i=t.parentElement?.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||e.has(i))&&e.add(t),!e.has(t)})}render(){return K`
      <div
        part="base"
        class="tree"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
        <span hidden aria-hidden="true"><slot name="expand-icon"></slot></span>
        <span hidden aria-hidden="true"><slot name="collapse-icon"></slot></span>
      </div>
    `}};iZ.css=iD,tP([tD("slot:not([name])")],iZ.prototype,"defaultSlot",2),tP([tD("slot[name=expand-icon]")],iZ.prototype,"expandedIconSlot",2),tP([tD("slot[name=collapse-icon]")],iZ.prototype,"collapsedIconSlot",2),tP([tO()],iZ.prototype,"selection",2),tP([it("selection")],iZ.prototype,"handleSelectionChange",1),iZ=tP([tI("wa-tree")],iZ);var iG=c`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Treat wrapped labels, inputs, and hints as direct children of the host element */
  [part~='form-control'] {
    display: contents;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)),
  :is([part~='form-control-label'], [part~='label']).has-label {
    display: inline-flex;
    color: var(--wa-form-control-label-color);
    font-weight: var(--wa-form-control-label-font-weight);
    line-height: var(--wa-form-control-label-line-height);
    margin-block-end: 0.5em;
  }

  :host([required]) :is([part~='form-control-label'], [part~='label'])::after {
    content: var(--wa-form-control-required-content);
    margin-inline-start: var(--wa-form-control-required-content-offset);
    color: var(--wa-form-control-required-content-color);
  }

  /* Help text */
  [part~='hint'] {
    display: block;
    color: var(--wa-form-control-hint-color);
    font-weight: var(--wa-form-control-hint-font-weight);
    line-height: var(--wa-form-control-hint-line-height);
    margin-block-start: 0.5em;
    font-size: var(--wa-font-size-smaller);

    &:not(.has-slotted, .has-hint) {
      display: none;
    }
  }
`,iJ=c`
  :host {
    --checked-icon-color: var(--wa-color-brand-on-loud);
    --checked-icon-scale: 0.8;

    display: inline-flex;
    color: var(--wa-form-control-value-color);
    font-family: inherit;
    font-weight: var(--wa-form-control-value-font-weight);
    line-height: var(--wa-form-control-value-line-height);
    user-select: none;
    -webkit-user-select: none;
  }

  [part~='control'] {
    display: inline-flex;
    flex: 0 0 auto;
    position: relative;
    align-items: center;
    justify-content: center;
    width: var(--wa-form-control-toggle-size);
    height: var(--wa-form-control-toggle-size);
    border-color: var(--wa-form-control-border-color);
    border-radius: min(
      calc(var(--wa-form-control-toggle-size) * 0.375),
      var(--wa-border-radius-s)
    ); /* min prevents entirely circular checkbox */
    border-style: var(--wa-border-style);
    border-width: var(--wa-form-control-border-width);
    background-color: var(--wa-form-control-background-color);
    transition:
      background var(--wa-transition-normal),
      border-color var(--wa-transition-fast),
      box-shadow var(--wa-transition-fast),
      color var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);

    margin-inline-end: 0.5em;
  }

  [part~='base'] {
    display: flex;
    align-items: flex-start;
    position: relative;
    color: currentColor;
    vertical-align: middle;
    cursor: pointer;
  }

  [part~='label'] {
    display: inline;
  }

  /* Checked */
  [part~='control']:has(:checked, :indeterminate) {
    color: var(--checked-icon-color);
    border-color: var(--wa-form-control-activated-color);
    background-color: var(--wa-form-control-activated-color);
  }

  /* Focus */
  [part~='control']:has(> input:focus-visible:not(:disabled)) {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled */
  :host [part~='base']:has(input:disabled) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input {
    position: absolute;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    pointer-events: none;
  }

  [part~='icon'] {
    display: flex;
    scale: var(--checked-icon-scale);

    /* Without this, Safari renders the icon slightly to the left */
    &::part(svg) {
      translate: 0.0009765625em;
    }

    input:not(:checked, :indeterminate) + & {
      visibility: hidden;
    }
  }

  :host([required]) [part~='label']::after {
    content: var(--wa-form-control-required-content);
    color: var(--wa-form-control-required-content-color);
    margin-inline-start: var(--wa-form-control-required-content-offset);
  }
`,iQ=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{let e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===Node.ELEMENT_NODE){if("wa-visually-hidden"===t.tagName.toLowerCase())return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},i2=c`
  :host([size='small']),
  .wa-size-s {
    font-size: var(--wa-font-size-s);
  }

  :host([size='medium']),
  .wa-size-m {
    font-size: var(--wa-font-size-m);
  }

  :host([size='large']),
  .wa-size-l {
    font-size: var(--wa-font-size-l);
  }
`,i0=class extends iO{constructor(){super(...arguments),this.hasSlotController=new iQ(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[((t={})=>{let{validationElement:e,validationProperty:i}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),i||(i="value");let o={observedAttributes:["required"],message:e.validationMessage,checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.required??t.hasAttribute("required")?(t[i]||(e.message="function"==typeof o.message?o.message(t):o.message||"",e.isValid=!1,e.invalidKeys.push("valueMissing")),e):e}};return o})({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){let t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){this.hasInteracted||this.checked===this.defaultChecked||(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&!this.hasInteracted&&(this.checked=this.defaultChecked),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=!!this.hint||!!t,i=!this.checked&&this.indeterminate;return K`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${this._value??X}
            .indeterminate=${iK(this.indeterminate)}
            .checked=${iK(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${i?"indeterminate":"check"}-icon icon" library="system" name=${i?"indeterminate":"check"}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${tj({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};i0.css=[iG,i2,iJ],i0.shadowRootOptions={...iO.shadowRootOptions,delegatesFocus:!0},tP([tD('input[type="checkbox"]')],i0.prototype,"input",2),tP([tO()],i0.prototype,"title",2),tP([tO({reflect:!0})],i0.prototype,"name",2),tP([tO({reflect:!0})],i0.prototype,"value",1),tP([tO({reflect:!0})],i0.prototype,"size",2),tP([tO({type:Boolean})],i0.prototype,"disabled",2),tP([tO({type:Boolean,reflect:!0})],i0.prototype,"indeterminate",2),tP([tO({type:Boolean,attribute:!1})],i0.prototype,"checked",2),tP([tO({type:Boolean,reflect:!0,attribute:"checked"})],i0.prototype,"defaultChecked",2),tP([tO({type:Boolean,reflect:!0})],i0.prototype,"required",2),tP([tO()],i0.prototype,"hint",2),tP([it("defaultChecked")],i0.prototype,"handleDefaultCheckedChange",1),tP([it(["checked","indeterminate"])],i0.prototype,"handleStateChange",1),tP([it("disabled")],i0.prototype,"handleDisabledChange",1),i0=tP([tI("wa-checkbox")],i0);var i1=c`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-dasharray: 75, 100;
    stroke-dashoffset: -5;
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`,i4=class extends tN{constructor(){super(...arguments),this.localize=new tS(this)}render(){return K`
      <svg
        part="base"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
        <circle class="indicator" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    `}};i4.css=i1,i4=tP([tI("wa-spinner")],i4);let i3={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function i5(t){t.preventDefault()}function i6(t){t.stopImmediatePropagation()}customElements.define("jsdoc-tree",class extends iZ{handleClick(t){let e=t.target,i=e.closest("jsdoc-tree-item"),o=t.composedPath().some(t=>t?.classList?.contains("expand-button"));i&&!i.disabled&&e===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}}),customElements.define("jsdoc-tree-item",class extends iY{connectedCallback(){super.connectedCallback(),Object.entries(i3).forEach(([t,e])=>{let i=iE([t,e]);this.prepend(i)}),iS()}firstUpdated(){for(let t of(super.firstUpdated(),this.shadowRoot.querySelectorAll("wa-icon")))t.remove()}}),document.querySelectorAll("wa-details").forEach(t=>{t.addEventListener("wa-hide",i5),t.addEventListener("wa-show",i5)}),document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(t=>{let e=t.firstElementChild;e?.localName==="a"&&e.addEventListener("click",i6)});