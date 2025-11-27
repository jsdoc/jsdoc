let t,e,i;let o=globalThis,s=o.ShadowRoot&&(void 0===o.ShadyCSS||o.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),n=new WeakMap;class l{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(s&&void 0===t){let i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}}let a=(t,...e)=>new l(1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]),t,r),h=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e,i="";for(let e of t.cssRules)i+=e.cssText;return new l("string"==typeof(e=i)?e:e+"",void 0,r)})(t):t,{is:c,defineProperty:d,getOwnPropertyDescriptor:p,getOwnPropertyNames:u,getOwnPropertySymbols:m,getPrototypeOf:f}=Object,g=globalThis,y=g.trustedTypes,b=y?y.emptyScript:"",v=g.reactiveElementPolyfillSupport,w={toAttribute(t,e){switch(e){case Boolean:t=t?b:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},x=(t,e)=>!c(t,e),_={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:x};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;class k extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=_){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&d(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){let{get:o,set:s}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){let r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??_}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=f(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let e of[...u(t),...m(t)])this.createProperty(e,t[e])}let t=this[Symbol.metadata];if(null!==t){let e=litPropertyMetadata.get(t);if(void 0!==e)for(let[t,i]of e)this.elementProperties.set(t,i)}for(let[t,e]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t))for(let i of new Set(t.flat(1/0).reverse()))e.unshift(h(i));else void 0!==t&&e.push(h(t));return e}static _$Eu(t,e){let i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let e of this.constructor.elementProperties.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let i of e){let e=document.createElement("style"),s=o.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){let s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){let i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){let t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=o;let r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){let o=this.constructor,s=this[t];if(!(((i??=o.getPropertyOptions(t)).hasChanged??x)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[e,i]of t){let{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1,e=this._$AL;try{(t=this.shouldUpdate(e))?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k.elementProperties=new Map,k.finalized=new Map,v?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.1");let $=globalThis,C=$.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,z="?"+S,L=`<${z}>`,P=document,T=()=>P.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,I=Array.isArray,M=t=>I(t)||"function"==typeof t?.[Symbol.iterator],D="[ 	\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,F=/>/g,B=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,V=/"/g,H=/^(?:script|style|textarea|title)$/i,j=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),q=j(1),W=(j(2),j(3),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),Y=new WeakMap,Z=P.createTreeWalker(P,129);function X(t,e){if(!I(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}let G=(t,e)=>{let i=t.length-1,o=[],s,r=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){let i=t[e],l,a,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,null!==(a=n.exec(i)));)c=n.lastIndex,n===R?"!--"===a[1]?n=U:void 0!==a[1]?n=F:void 0!==a[2]?(H.test(a[2])&&(s=RegExp("</"+a[2],"g")),n=B):void 0!==a[3]&&(n=B):n===B?">"===a[0]?(n=s??R,h=-1):void 0===a[1]?h=-2:(h=n.lastIndex-a[2].length,l=a[1],n=void 0===a[3]?B:'"'===a[3]?V:N):n===V||n===N?n=B:n===U||n===F?n=R:(n=B,s=void 0);let d=n===B&&t[e+1].startsWith("/>")?" ":"";r+=n===R?i+L:h>=0?(o.push(l),i.slice(0,h)+E+i.slice(h)+S+d):i+S+(-2===h?e:d)}return[X(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class J{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0,n=t.length-1,l=this.parts,[a,h]=G(t,e);if(this.el=J.createElement(a,i),Z.currentNode=this.el.content,2===e||3===e){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Z.nextNode())&&l.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(let t of o.getAttributeNames())if(t.endsWith(E)){let e=h[r++],i=o.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);l.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?to:"?"===n[1]?ts:"@"===n[1]?tr:ti}),o.removeAttribute(t)}else t.startsWith(S)&&(l.push({type:6,index:s}),o.removeAttribute(t));if(H.test(o.tagName)){let t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],T()),Z.nextNode(),l.push({type:2,index:++s});o.append(t[e],T())}}}else if(8===o.nodeType)if(o.data===z)l.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)l.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){let i=P.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,o){if(e===W)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl,r=O(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t))._$AT(t,i,o),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=Q(t,s._$AS(t,e.values),s,o)),e}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??P).importNode(e,!0);Z.currentNode=o;let s=Z.nextNode(),r=0,n=0,l=i[0];for(;void 0!==l;){if(r===l.index){let e;2===l.type?e=new te(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new tn(s,this,t)),this._$AV.push(e),l=i[++n]}r!==l?.index&&(s=Z.nextNode(),r++)}return Z.currentNode=P,o}p(t){let e=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class te{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){O(t=Q(this,t,e))?t===K||null==t||""===t?(this._$AH!==K&&this._$AR(),this._$AH=K):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):M(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==K&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(X(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{let t=new tt(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Y.get(t.strings);return void 0===e&&Y.set(t.strings,e=new J(t)),e}k(t){I(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,o=0;for(let s of t)o===e.length?e.push(i=new te(this.O(T()),this.O(T()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class ti{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=K,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(t,e=this,i,o){let s=this.strings,r=!1;if(void 0===s)(r=!O(t=Q(this,t,e,0))||t!==this._$AH&&t!==W)&&(this._$AH=t);else{let o,n,l=t;for(t=s[0],o=0;o<s.length-1;o++)(n=Q(this,l[i+o],e,o))===W&&(n=this._$AH[o]),r||=!O(n)||n!==this._$AH[o],n===K?t=K:t!==K&&(t+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!o&&this.j(t)}j(t){t===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class to extends ti{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===K?void 0:t}}class ts extends ti{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==K)}}class tr extends ti{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??K)===W)return;let i=this._$AH,o=t===K&&i!==K||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==K&&(i===K||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class tn{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}let tl=$.litHtmlPolyfillSupport;tl?.(J,te),($.litHtmlVersions??=[]).push("3.2.1");class ta extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{let o=i?.renderBefore??e,s=o._$litPart$;if(void 0===s){let t=i?.renderBefore??null;o._$litPart$=s=new te(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}}ta._$litElement$=!0,ta.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:ta});let th=globalThis.litElementPolyfillSupport;th?.({LitElement:ta}),(globalThis.litElementVersions??=[]).push("4.1.1");var tc,td,tp=a`
  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    z-index: var(--sl-z-index-tooltip);
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

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    text-align: start;
    white-space: normal;
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
    user-select: none;
    -webkit-user-select: none;
  }
`,tu=a`
  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

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
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge--visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: calc(var(--sl-z-index-dropdown) - 1);
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
`;let tm=new Set,tf=new Map,tg="ltr",ty="en",tb="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(tb){let t=new MutationObserver(tw);tg=document.documentElement.dir||"ltr",ty=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function tv(...e){e.map(e=>{let i=e.$code.toLowerCase();tf.has(i)?tf.set(i,Object.assign(Object.assign({},tf.get(i)),e)):tf.set(i,e),t||(t=e)}),tw()}function tw(){tb&&(tg=document.documentElement.dir||"ltr",ty=document.documentElement.lang||navigator.language),[...tm.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}class tx{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){tm.add(this.host)}hostDisconnected(){tm.delete(this.host)}dir(){return`${this.host.dir||tg}`.toLowerCase()}lang(){return`${this.host.lang||ty}`.toLowerCase()}getTranslationData(t){var e,i;let o=new Intl.Locale(t.replace(/_/g,"-")),s=null==o?void 0:o.language.toLowerCase(),r=null!=(i=null==(e=null==o?void 0:o.region)?void 0:e.toLowerCase())?i:"",n=tf.get(`${s}-${r}`),l=tf.get(s);return{locale:o,language:s,region:r,primary:n,secondary:l}}exists(e,i){var o;let{primary:s,secondary:r}=this.getTranslationData(null!=(o=i.lang)?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!s&&!!s[e]||!!r&&!!r[e]||!!i.includeFallback&&!!t&&!!t[e]}term(e,...i){let o,{primary:s,secondary:r}=this.getTranslationData(this.lang());if(s&&s[e])o=s[e];else if(r&&r[e])o=r[e];else{if(!t||!t[e])return console.error(`No translation found for: ${String(e)}`),String(e);o=t[e]}return"function"==typeof o?o(...i):o}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}}var t_={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format"};tv(t_);var tk=class extends tx{};tv(t_);var t$=a`
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
`,tC=Object.defineProperty,tA=Object.defineProperties,tE=Object.getOwnPropertyDescriptor,tS=Object.getOwnPropertyDescriptors,tz=Object.getOwnPropertySymbols,tL=Object.prototype.hasOwnProperty,tP=Object.prototype.propertyIsEnumerable,tT=t=>{throw TypeError(t)},tO=(t,e,i)=>e in t?tC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,tI=(t,e)=>{for(var i in e||(e={}))tL.call(e,i)&&tO(t,i,e[i]);if(tz)for(var i of tz(e))tP.call(e,i)&&tO(t,i,e[i]);return t},tM=(t,e,i,o)=>{for(var s,r=o>1?void 0:o?tE(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(o?s(e,i,r):s(r))||r);return o&&r&&tC(e,i,r),r},tD=(t,e,i)=>e.has(t)||tT("Cannot "+i);let tR={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:x};function tU(t){return(e,i)=>{let o;return"object"==typeof i?((t=tR,e,i)=>{let{kind:o,metadata:s}=i,r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){let{name:o}=i;return{set(i){let s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){let{name:o}=i;return function(i){let s=this[o];e.call(this,i),this.requestUpdate(o,s,t)}}throw Error("Unsupported decorator location: "+o)})(t,e,i):(o=e.hasOwnProperty(i),e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0)}}function tF(t){return tU({...t,state:!0,attribute:!1})}let tB=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function tN(t,e){return(i,o,s)=>{let r=e=>e.renderRoot?.querySelector(t)??null;if(e){let t,{get:e,set:n}="object"==typeof o?i:s??(t=Symbol(),{get(){return this[t]},set(e){this[t]=e}});return tB(i,o,{get(){let t=e.call(this);return void 0===t&&(null!==(t=r(this))||this.hasUpdated)&&n.call(this,t),t}})}return tB(i,o,{get(){return r(this)}})}}var tV=class extends ta{constructor(){let t;super(),(t=tc).has(this)?tT("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,Object.entries(this.constructor.dependencies).forEach(([t,e])=>{this.constructor.define(t,e)})}emit(t,e){let i=new CustomEvent(t,tI({bubbles:!0,cancelable:!1,composed:!0,detail:{}},e));return this.dispatchEvent(i),i}static define(t,e=this,i={}){let o=customElements.get(t);if(!o){try{customElements.define(t,e,i)}catch(o){customElements.define(t,class extends e{},i)}return}let s=" (unknown version)",r=s;"version"in e&&e.version&&(s=" v"+e.version),"version"in o&&o.version&&(r=" v"+o.version),s&&r&&s===r||console.warn(`Attempted to register <${t}>${s}, but <${t}>${r} has already been registered.`)}attributeChangedCallback(t,e,i){let o,s;if(tD(this,o=tc,"read from private field"),s?!s.call(this):!o.get(this)){let t,e;this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),tD(this,t=tc,"write to private field"),e?e.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&null==this[i]&&(this[i]=e)})}};tc=new WeakMap,tV.version="2.20.1",tV.dependencies={},tM([tU()],tV.prototype,"dir",2),tM([tU()],tV.prototype,"lang",2);let tH=Math.min,tj=Math.max,tq=Math.round,tW=Math.floor,tK=t=>({x:t,y:t}),tY={left:"right",right:"left",bottom:"top",top:"bottom"},tZ={start:"end",end:"start"};function tX(t,e){return"function"==typeof t?t(e):t}function tG(t){return t.split("-")[0]}function tJ(t){return t.split("-")[1]}function tQ(t){return"x"===t?"y":"x"}function t0(t){return"y"===t?"height":"width"}function t1(t){return["top","bottom"].includes(tG(t))?"y":"x"}function t2(t){return t.replace(/start|end/g,t=>tZ[t])}function t5(t){return t.replace(/left|right|bottom|top/g,t=>tY[t])}function t8(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function t3(t){let{x:e,y:i,width:o,height:s}=t;return{width:o,height:s,top:i,left:e,right:e+o,bottom:i+s,x:e,y:i}}function t6(t,e,i){let o,{reference:s,floating:r}=t,n=t1(e),l=tQ(t1(e)),a=t0(l),h=tG(e),c="y"===n,d=s.x+s.width/2-r.width/2,p=s.y+s.height/2-r.height/2,u=s[a]/2-r[a]/2;switch(h){case"top":o={x:d,y:s.y-r.height};break;case"bottom":o={x:d,y:s.y+s.height};break;case"right":o={x:s.x+s.width,y:p};break;case"left":o={x:s.x-r.width,y:p};break;default:o={x:s.x,y:s.y}}switch(tJ(e)){case"start":o[l]-=u*(i&&c?-1:1);break;case"end":o[l]+=u*(i&&c?-1:1)}return o}let t7=async(t,e,i)=>{let{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:n}=i,l=r.filter(Boolean),a=await (null==n.isRTL?void 0:n.isRTL(e)),h=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:c,y:d}=t6(h,o,a),p=o,u={},m=0;for(let i=0;i<l.length;i++){let{name:r,fn:f}=l[i],{x:g,y:y,data:b,reset:v}=await f({x:c,y:d,initialPlacement:o,placement:p,strategy:s,middlewareData:u,rects:h,platform:n,elements:{reference:t,floating:e}});c=null!=g?g:c,d=null!=y?y:d,u={...u,[r]:{...u[r],...b}},v&&m<=50&&(m++,"object"==typeof v&&(v.placement&&(p=v.placement),v.rects&&(h=!0===v.rects?await n.getElementRects({reference:t,floating:e,strategy:s}):v.rects),{x:c,y:d}=t6(h,p,a)),i=-1)}return{x:c,y:d,placement:p,strategy:s,middlewareData:u}};async function t4(t,e){var i;void 0===e&&(e={});let{x:o,y:s,platform:r,rects:n,elements:l,strategy:a}=t,{boundary:h="clippingAncestors",rootBoundary:c="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=tX(e,t),m=t8(u),f=l[p?"floating"===d?"reference":"floating":d],g=t3(await r.getClippingRect({element:null==(i=await (null==r.isElement?void 0:r.isElement(f)))||i?f:f.contextElement||await (null==r.getDocumentElement?void 0:r.getDocumentElement(l.floating)),boundary:h,rootBoundary:c,strategy:a})),y="floating"===d?{x:o,y:s,width:n.floating.width,height:n.floating.height}:n.reference,b=await (null==r.getOffsetParent?void 0:r.getOffsetParent(l.floating)),v=await (null==r.isElement?void 0:r.isElement(b))&&await (null==r.getScale?void 0:r.getScale(b))||{x:1,y:1},w=t3(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:l,rect:y,offsetParent:b,strategy:a}):y);return{top:(g.top-w.top+m.top)/v.y,bottom:(w.bottom-g.bottom+m.bottom)/v.y,left:(g.left-w.left+m.left)/v.x,right:(w.right-g.right+m.right)/v.x}}async function t9(t,e){let{placement:i,platform:o,elements:s}=t,r=await (null==o.isRTL?void 0:o.isRTL(s.floating)),n=tG(i),l=tJ(i),a="y"===t1(i),h=["left","top"].includes(n)?-1:1,c=r&&a?-1:1,d=tX(e,t),{mainAxis:p,crossAxis:u,alignmentAxis:m}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return l&&"number"==typeof m&&(u="end"===l?-1*m:m),a?{x:u*c,y:p*h}:{x:p*h,y:u*c}}function et(){return"undefined"!=typeof window}function ee(t){return es(t)?(t.nodeName||"").toLowerCase():"#document"}function ei(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function eo(t){var e;return null==(e=(es(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function es(t){return!!et()&&(t instanceof Node||t instanceof ei(t).Node)}function er(t){return!!et()&&(t instanceof Element||t instanceof ei(t).Element)}function en(t){return!!et()&&(t instanceof HTMLElement||t instanceof ei(t).HTMLElement)}function el(t){return!!et()&&"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof ei(t).ShadowRoot)}function ea(t){let{overflow:e,overflowX:i,overflowY:o,display:s}=eu(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!["inline","contents"].includes(s)}function eh(t){return[":popover-open",":modal"].some(e=>{try{return t.matches(e)}catch(t){return!1}})}function ec(t){let e=ed(),i=er(t)?eu(t):t;return"none"!==i.transform||"none"!==i.perspective||!!i.containerType&&"normal"!==i.containerType||!e&&!!i.backdropFilter&&"none"!==i.backdropFilter||!e&&!!i.filter&&"none"!==i.filter||["transform","perspective","filter"].some(t=>(i.willChange||"").includes(t))||["paint","layout","strict","content"].some(t=>(i.contain||"").includes(t))}function ed(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function ep(t){return["html","body","#document"].includes(ee(t))}function eu(t){return ei(t).getComputedStyle(t)}function em(t){return er(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function ef(t){if("html"===ee(t))return t;let e=t.assignedSlot||t.parentNode||el(t)&&t.host||eo(t);return el(e)?e.host:e}function eg(t,e,i){var o;void 0===e&&(e=[]),void 0===i&&(i=!0);let s=function t(e){let i=ef(e);return ep(i)?e.ownerDocument?e.ownerDocument.body:e.body:en(i)&&ea(i)?i:t(i)}(t),r=s===(null==(o=t.ownerDocument)?void 0:o.body),n=ei(s);if(r){let t=ey(n);return e.concat(n,n.visualViewport||[],ea(s)?s:[],t&&i?eg(t):[])}return e.concat(s,eg(s,[],i))}function ey(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function eb(t){let e=eu(t),i=parseFloat(e.width)||0,o=parseFloat(e.height)||0,s=en(t),r=s?t.offsetWidth:i,n=s?t.offsetHeight:o,l=tq(i)!==r||tq(o)!==n;return l&&(i=r,o=n),{width:i,height:o,$:l}}function ev(t){return er(t)?t:t.contextElement}function ew(t){let e=ev(t);if(!en(e))return tK(1);let i=e.getBoundingClientRect(),{width:o,height:s,$:r}=eb(e),n=(r?tq(i.width):i.width)/o,l=(r?tq(i.height):i.height)/s;return n&&Number.isFinite(n)||(n=1),l&&Number.isFinite(l)||(l=1),{x:n,y:l}}let ex=tK(0);function e_(t){let e=ei(t);return ed()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:ex}function ek(t,e,i,o){var s;void 0===e&&(e=!1),void 0===i&&(i=!1);let r=t.getBoundingClientRect(),n=ev(t),l=tK(1);e&&(o?er(o)&&(l=ew(o)):l=ew(t));let a=(void 0===(s=i)&&(s=!1),o&&(!s||o===ei(n))&&s)?e_(n):tK(0),h=(r.left+a.x)/l.x,c=(r.top+a.y)/l.y,d=r.width/l.x,p=r.height/l.y;if(n){let t=ei(n),e=o&&er(o)?ei(o):o,i=t,s=ey(i);for(;s&&o&&e!==i;){let t=ew(s),e=s.getBoundingClientRect(),o=eu(s),r=e.left+(s.clientLeft+parseFloat(o.paddingLeft))*t.x,n=e.top+(s.clientTop+parseFloat(o.paddingTop))*t.y;h*=t.x,c*=t.y,d*=t.x,p*=t.y,h+=r,c+=n,s=ey(i=ei(s))}}return t3({width:d,height:p,x:h,y:c})}function e$(t,e){let i=em(t).scrollLeft;return e?e.left+i:ek(eo(t)).left+i}function eC(t,e,i){void 0===i&&(i=!1);let o=t.getBoundingClientRect();return{x:o.left+e.scrollLeft-(i?0:e$(t,o)),y:o.top+e.scrollTop}}function eA(t,e,i){var o;let s;if("viewport"===e)s=function(t,e){let i=ei(t),o=eo(t),s=i.visualViewport,r=o.clientWidth,n=o.clientHeight,l=0,a=0;if(s){r=s.width,n=s.height;let t=ed();(!t||t&&"fixed"===e)&&(l=s.offsetLeft,a=s.offsetTop)}return{width:r,height:n,x:l,y:a}}(t,i);else if("document"===e){let e,i,r,n,l,a,h;o=eo(t),e=eo(o),i=em(o),r=o.ownerDocument.body,n=tj(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),l=tj(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),a=-i.scrollLeft+e$(o),h=-i.scrollTop,"rtl"===eu(r).direction&&(a+=tj(e.clientWidth,r.clientWidth)-n),s={width:n,height:l,x:a,y:h}}else if(er(e)){let t,o,r,n,l,a;o=(t=ek(e,!0,"fixed"===i)).top+e.clientTop,r=t.left+e.clientLeft,n=en(e)?ew(e):tK(1),l=e.clientWidth*n.x,a=e.clientHeight*n.y,s={width:l,height:a,x:r*n.x,y:o*n.y}}else{let i=e_(t);s={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return t3(s)}function eE(t){return"static"===eu(t).position}function eS(t,e){if(!en(t)||"fixed"===eu(t).position)return null;if(e)return e(t);let i=t.offsetParent;return eo(t)===i&&(i=i.ownerDocument.body),i}function ez(t,e){let i=ei(t);if(eh(t))return i;if(!en(t)){let e=ef(t);for(;e&&!ep(e);){if(er(e)&&!eE(e))return e;e=ef(e)}return i}let o=eS(t,e);for(;o&&["table","td","th"].includes(ee(o))&&eE(o);)o=eS(o,e);return o&&ep(o)&&eE(o)&&!ec(o)?i:o||function(t){let e=ef(t);for(;en(e)&&!ep(e);){if(ec(e))return e;if(eh(e))break;e=ef(e)}return null}(t)||i}let eL=async function(t){let e=this.getOffsetParent||ez,i=this.getDimensions,o=await i(t.floating);return{reference:function(t,e,i){let o=en(e),s=eo(e),r="fixed"===i,n=ek(t,!0,r,e),l={scrollLeft:0,scrollTop:0},a=tK(0);if(o||!o&&!r)if(("body"!==ee(e)||ea(s))&&(l=em(e)),o){let t=ek(e,!0,r,e);a.x=t.x+e.clientLeft,a.y=t.y+e.clientTop}else s&&(a.x=e$(s));let h=!s||o||r?tK(0):eC(s,l);return{x:n.left+l.scrollLeft-a.x-h.x,y:n.top+l.scrollTop-a.y-h.y,width:n.width,height:n.height}}(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},eP={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:i,offsetParent:o,strategy:s}=t,r="fixed"===s,n=eo(o),l=!!e&&eh(e.floating);if(o===n||l&&r)return i;let a={scrollLeft:0,scrollTop:0},h=tK(1),c=tK(0),d=en(o);if((d||!d&&!r)&&(("body"!==ee(o)||ea(n))&&(a=em(o)),en(o))){let t=ek(o);h=ew(o),c.x=t.x+o.clientLeft,c.y=t.y+o.clientTop}let p=!n||d||r?tK(0):eC(n,a,!0);return{width:i.width*h.x,height:i.height*h.y,x:i.x*h.x-a.scrollLeft*h.x+c.x+p.x,y:i.y*h.y-a.scrollTop*h.y+c.y+p.y}},getDocumentElement:eo,getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:o,strategy:s}=t,r=[..."clippingAncestors"===i?eh(e)?[]:function(t,e){let i=e.get(t);if(i)return i;let o=eg(t,[],!1).filter(t=>er(t)&&"body"!==ee(t)),s=null,r="fixed"===eu(t).position,n=r?ef(t):t;for(;er(n)&&!ep(n);){let e=eu(n),i=ec(n);i||"fixed"!==e.position||(s=null),(r?!i&&!s:!i&&"static"===e.position&&!!s&&["absolute","fixed"].includes(s.position)||ea(n)&&!i&&function t(e,i){let o=ef(e);return!(o===i||!er(o)||ep(o))&&("fixed"===eu(o).position||t(o,i))}(t,n))?o=o.filter(t=>t!==n):s=e,n=ef(n)}return e.set(t,o),o}(e,this._c):[].concat(i),o],n=r[0],l=r.reduce((t,i)=>{let o=eA(e,i,s);return t.top=tj(o.top,t.top),t.right=tH(o.right,t.right),t.bottom=tH(o.bottom,t.bottom),t.left=tj(o.left,t.left),t},eA(e,n,s));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}},getOffsetParent:ez,getElementRects:eL,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:e,height:i}=eb(t);return{width:e,height:i}},getScale:ew,isElement:er,isRTL:function(t){return"rtl"===eu(t).direction}},eT=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var i,o;let s,r,{placement:n,rects:l,platform:a,elements:h}=e,{apply:c=()=>{},...d}=tX(t,e),p=await t4(e,d),u=tG(n),m=tJ(n),f="y"===t1(n),{width:g,height:y}=l.floating;"top"===u||"bottom"===u?(s=u,r=m===(await (null==a.isRTL?void 0:a.isRTL(h.floating))?"start":"end")?"left":"right"):(r=u,s="end"===m?"top":"bottom");let b=y-p.top-p.bottom,v=g-p.left-p.right,w=tH(y-p[s],b),x=tH(g-p[r],v),_=!e.middlewareData.shift,k=w,$=x;if(null!=(i=e.middlewareData.shift)&&i.enabled.x&&($=v),null!=(o=e.middlewareData.shift)&&o.enabled.y&&(k=b),_&&!m){let t=tj(p.left,0),e=tj(p.right,0),i=tj(p.top,0),o=tj(p.bottom,0);f?$=g-2*(0!==t||0!==e?t+e:tj(p.left,p.right)):k=y-2*(0!==i||0!==o?i+o:tj(p.top,p.bottom))}await c({...e,availableWidth:$,availableHeight:k});let C=await a.getDimensions(h.floating);return g!==C.width||y!==C.height?{reset:{rects:!0}}:{}}}},eO=t=>(...e)=>({_$litDirective$:t,values:e});class eI{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}let eM=eO(class extends eI{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let i=t.element.classList;for(let t of this.st)t in e||(i.remove(t),this.st.delete(t));for(let t in e){let o=!!e[t];o===this.st.has(t)||this.nt?.has(t)||(o?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return W}});function eD(t){var e=t;for(let t=e;t;t=eR(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=eR(e);t;t=eR(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if("contents"!==e.display&&("static"!==e.position||ec(e)||"BODY"===t.tagName))return t}return null}function eR(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}var eU=class extends tV{constructor(){super(...arguments),this.localize=new tk(this),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,s=0,r=0,n=0,l=0,a=0,h=0,c=0;i?t.top<e.top?(o=t.left,s=t.bottom,r=t.right,n=t.bottom,l=e.left,a=e.top,h=e.right,c=e.top):(o=e.left,s=e.bottom,r=e.right,n=e.bottom,l=t.left,a=t.top,h=t.right,c=t.top):t.left<e.left?(o=t.right,s=t.top,r=e.left,n=e.top,l=t.right,a=t.bottom,h=e.left,c=e.bottom):(o=e.right,s=e.top,r=t.left,n=t.top,l=e.right,a=e.bottom,h=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${l}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${a}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else{var t;this.anchor instanceof Element||null!==(t=this.anchor)&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t.contextElement instanceof Element)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]')}this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.active&&this.start()}start(){this.anchorEl&&this.active&&(this.cleanup=function(t,e,i,o){let s;void 0===o&&(o={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:l="function"==typeof ResizeObserver,layoutShift:a="function"==typeof IntersectionObserver,animationFrame:h=!1}=o,c=ev(t),d=r||n?[...c?eg(c):[],...eg(e)]:[];d.forEach(t=>{r&&t.addEventListener("scroll",i,{passive:!0}),n&&t.addEventListener("resize",i)});let p=c&&a?function(t,e){let i,o=null,s=eo(t);function r(){var t;clearTimeout(i),null==(t=o)||t.disconnect(),o=null}return!function n(l,a){void 0===l&&(l=!1),void 0===a&&(a=1),r();let{left:h,top:c,width:d,height:p}=t.getBoundingClientRect();if(l||e(),!d||!p)return;let u={rootMargin:-tW(c)+"px "+-tW(s.clientWidth-(h+d))+"px "+-tW(s.clientHeight-(c+p))+"px "+-tW(h)+"px",threshold:tj(0,tH(1,a))||1},m=!0;function f(t){let e=t[0].intersectionRatio;if(e!==a){if(!m)return n();e?n(!1,e):i=setTimeout(()=>{n(!1,1e-7)},1e3)}m=!1}try{o=new IntersectionObserver(f,{...u,root:s.ownerDocument})}catch(t){o=new IntersectionObserver(f,u)}o.observe(t)}(!0),r}(c,i):null,u=-1,m=null;l&&(m=new ResizeObserver(t=>{let[o]=t;o&&o.target===c&&m&&(m.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var t;null==(t=m)||t.observe(e)})),i()}),c&&!h&&m.observe(c),m.observe(e));let f=h?ek(t):null;return h&&function e(){let o=ek(t);f&&(o.x!==f.x||o.y!==f.y||o.width!==f.width||o.height!==f.height)&&i(),f=o,s=requestAnimationFrame(e)}(),i(),()=>{var t;d.forEach(t=>{r&&t.removeEventListener("scroll",i),n&&t.removeEventListener("resize",i)}),null==p||p(),null==(t=m)||t.disconnect(),m=null,h&&cancelAnimationFrame(s)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,e,i,o,s,r;let n,l,a,h;if(!this.active||!this.anchorEl)return;let c=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(e){var i,o;let{x:s,y:r,placement:n,middlewareData:l}=e,a=await t9(e,t);return n===(null==(i=l.offset)?void 0:i.placement)&&null!=(o=l.arrow)&&o.alignmentOffset?{}:{x:s+a.x,y:r+a.y,data:{...a,placement:n}}}}];this.sync?c.push(eT({apply:({rects:t})=>{let e="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&c.push({name:"flip",options:e={boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var i,o,s,r,n,l,a,h;let c,d,p,{placement:u,middlewareData:m,rects:f,initialPlacement:g,platform:y,elements:b}=t,{mainAxis:v=!0,crossAxis:w=!0,fallbackPlacements:x,fallbackStrategy:_="bestFit",fallbackAxisSideDirection:k="none",flipAlignment:$=!0,...C}=tX(e,t);if(null!=(i=m.arrow)&&i.alignmentOffset)return{};let A=tG(u),E=t1(g),S=tG(g)===g,z=await (null==y.isRTL?void 0:y.isRTL(b.floating)),L=x||(S||!$?[t5(g)]:(c=t5(g),[t2(g),c,t2(c)])),P="none"!==k;!x&&P&&L.push(...(d=tJ(g),p=function(t,e,i){let o=["left","right"],s=["right","left"];switch(t){case"top":case"bottom":if(i)return e?s:o;return e?o:s;case"left":case"right":return e?["top","bottom"]:["bottom","top"];default:return[]}}(tG(g),"start"===k,z),d&&(p=p.map(t=>t+"-"+d),$&&(p=p.concat(p.map(t2)))),p));let T=[g,...L],O=await t4(t,C),I=[],M=(null==(o=m.flip)?void 0:o.overflows)||[];if(v&&I.push(O[A]),w){let t,e,i,o,s=(l=u,a=f,void 0===(h=z)&&(h=!1),t=tJ(l),i=t0(e=tQ(t1(l))),o="x"===e?t===(h?"end":"start")?"right":"left":"start"===t?"bottom":"top",a.reference[i]>a.floating[i]&&(o=t5(o)),[o,t5(o)]);I.push(O[s[0]],O[s[1]])}if(M=[...M,{placement:u,overflows:I}],!I.every(t=>t<=0)){let t=((null==(s=m.flip)?void 0:s.index)||0)+1,e=T[t];if(e)return{data:{index:t,overflows:M},reset:{placement:e}};let i=null==(r=M.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:r.placement;if(!i)switch(_){case"bestFit":{let t=null==(n=M.filter(t=>{if(P){let e=t1(t.placement);return e===E||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:n[0];t&&(i=t);break}case"initialPlacement":i=g}if(u!==i)return{reset:{placement:i}}}return{}}}),this.shift&&c.push({name:"shift",options:i={boundary:this.shiftBoundary,padding:this.shiftPadding},async fn(t){let{x:e,y:o,placement:s}=t,{mainAxis:r=!0,crossAxis:n=!1,limiter:l={fn:t=>{let{x:e,y:i}=t;return{x:e,y:i}}},...a}=tX(i,t),h={x:e,y:o},c=await t4(t,a),d=t1(tG(s)),p=tQ(d),u=h[p],m=h[d];if(r){let t="y"===p?"top":"left",e="y"===p?"bottom":"right",i=u+c[t],o=u-c[e];u=tj(i,tH(u,o))}if(n){let t="y"===d?"top":"left",e="y"===d?"bottom":"right",i=m+c[t],o=m-c[e];m=tj(i,tH(m,o))}let f=l.fn({...t,[p]:u,[d]:m});return{...f,data:{x:f.x-e,y:f.y-o,enabled:{[p]:r,[d]:n}}}}}),this.autoSize?c.push(eT({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&c.push({name:"arrow",options:n={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:e,y:i,placement:o,rects:s,platform:r,elements:l,middlewareData:a}=t,{element:h,padding:c=0}=tX(n,t)||{};if(null==h)return{};let d=t8(c),p={x:e,y:i},u=tQ(t1(o)),m=t0(u),f=await r.getDimensions(h),g="y"===u,y=g?"clientHeight":"clientWidth",b=s.reference[m]+s.reference[u]-p[u]-s.floating[m],v=p[u]-s.reference[u],w=await (null==r.getOffsetParent?void 0:r.getOffsetParent(h)),x=w?w[y]:0;x&&await (null==r.isElement?void 0:r.isElement(w))||(x=l.floating[y]||s.floating[m]);let _=x/2-f[m]/2-1,k=tH(d[g?"top":"left"],_),$=tH(d[g?"bottom":"right"],_),C=x-f[m]-$,A=x/2-f[m]/2+(b/2-v/2),E=tj(k,tH(A,C)),S=!a.arrow&&null!=tJ(o)&&A!==E&&s.reference[m]/2-(A<k?k:$)-f[m]/2<0,z=S?A<k?A-k:A-C:0;return{[u]:p[u]+z,data:{[u]:E,centerOffset:A-E-z,...S&&{alignmentOffset:z}},reset:S}}});let d="absolute"===this.strategy?t=>eP.getOffsetParent(t,eD):eP.getOffsetParent;(o=this.anchorEl,s=this.popup,r={placement:this.placement,middleware:c,strategy:this.strategy,platform:tA(tI({},eP),tS({getOffsetParent:d}))},l=new Map,h={...(a={platform:eP,...r}).platform,_c:l},t7(o,s,{...a,platform:h})).then(({x:t,y:e,middlewareData:i,placement:o})=>{let s="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){let t=i.arrow.x,e=i.arrow.y,o="",n="",l="",a="";if("start"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",n=s?i:"",a=s?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n=s?"":i,a=s?i:"",l="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(a="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(a="number"==typeof t?`${t}px`:"",o="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:o,right:n,bottom:l,left:a,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.emit("sl-reposition")}render(){return q`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${eM({"popup-hover-bridge":!0,"popup-hover-bridge--visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        part="popup"
        class=${eM({popup:!0,"popup--active":this.active,"popup--fixed":"fixed"===this.strategy,"popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?q`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};eU.styles=[t$,tu],tM([tN(".popup")],eU.prototype,"popup",2),tM([tN(".popup__arrow")],eU.prototype,"arrowEl",2),tM([tU()],eU.prototype,"anchor",2),tM([tU({type:Boolean,reflect:!0})],eU.prototype,"active",2),tM([tU({reflect:!0})],eU.prototype,"placement",2),tM([tU({reflect:!0})],eU.prototype,"strategy",2),tM([tU({type:Number})],eU.prototype,"distance",2),tM([tU({type:Number})],eU.prototype,"skidding",2),tM([tU({type:Boolean})],eU.prototype,"arrow",2),tM([tU({attribute:"arrow-placement"})],eU.prototype,"arrowPlacement",2),tM([tU({attribute:"arrow-padding",type:Number})],eU.prototype,"arrowPadding",2),tM([tU({type:Boolean})],eU.prototype,"flip",2),tM([tU({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],eU.prototype,"flipFallbackPlacements",2),tM([tU({attribute:"flip-fallback-strategy"})],eU.prototype,"flipFallbackStrategy",2),tM([tU({type:Object})],eU.prototype,"flipBoundary",2),tM([tU({attribute:"flip-padding",type:Number})],eU.prototype,"flipPadding",2),tM([tU({type:Boolean})],eU.prototype,"shift",2),tM([tU({type:Object})],eU.prototype,"shiftBoundary",2),tM([tU({attribute:"shift-padding",type:Number})],eU.prototype,"shiftPadding",2),tM([tU({attribute:"auto-size"})],eU.prototype,"autoSize",2),tM([tU()],eU.prototype,"sync",2),tM([tU({type:Object})],eU.prototype,"autoSizeBoundary",2),tM([tU({attribute:"auto-size-padding",type:Number})],eU.prototype,"autoSizePadding",2),tM([tU({attribute:"hover-bridge",type:Boolean})],eU.prototype,"hoverBridge",2);var eF=new Map,eB=new WeakMap;function eN(t,e){return"rtl"===e.toLowerCase()?{keyframes:t.rtlKeyframes||t.keyframes,options:t.options}:t}function eV(t,e){eF.set(t,null!=e?e:{keyframes:[],options:{duration:0}})}function eH(t,e,i){let o=eB.get(t);if(null==o?void 0:o[e])return eN(o[e],i.dir);let s=eF.get(e);return s?eN(s,i.dir):{keyframes:[],options:{duration:0}}}function ej(t,e){return new Promise(i=>{t.addEventListener(e,function o(s){s.target===t&&(t.removeEventListener(e,o),i())})})}function eq(t,e,i){return new Promise(o=>{if((null==i?void 0:i.duration)===1/0)throw Error("Promise-based animations must be finite.");let s=t.animate(e,tA(tI({},i),tS({duration:window.matchMedia("(prefers-reduced-motion: reduce)").matches?0:i.duration})));s.addEventListener("cancel",o,{once:!0}),s.addEventListener("finish",o,{once:!0})})}function eW(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function eK(t){return Promise.all(t.getAnimations().map(t=>new Promise(e=>{t.cancel(),requestAnimationFrame(e)})))}function eY(t,e){return t.map(t=>tA(tI({},t),tS({height:"auto"===t.height?`${e}px`:t.height})))}function eZ(t,e){let i=tI({waitUntilFirstUpdate:!1},e);return(e,o)=>{let{update:s}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach(e=>{if(t.has(e)){let s=t.get(e),r=this[e];s!==r&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](s,r)}}),s.call(this,t)}}}var eX=class extends tV{constructor(){super(),this.localize=new tk(this),this.content="",this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{if(this.hasTrigger("hover")){let t=eW(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),t)}},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let t=eW(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),t)}},this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut)}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.closeWatcher)||t.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}async handleOpenChange(){var t,e;if(this.open){if(this.disabled)return;this.emit("sl-show"),"CloseWatcher"in window?(null==(t=this.closeWatcher)||t.destroy(),this.closeWatcher=new CloseWatcher,this.closeWatcher.onclose=()=>{this.hide()}):document.addEventListener("keydown",this.handleDocumentKeyDown),await eK(this.body),this.body.hidden=!1,this.popup.active=!0;let{keyframes:e,options:i}=eH(this,"tooltip.show",{dir:this.localize.dir()});await eq(this.popup.popup,e,i),this.popup.reposition(),this.emit("sl-after-show")}else{this.emit("sl-hide"),null==(e=this.closeWatcher)||e.destroy(),document.removeEventListener("keydown",this.handleDocumentKeyDown),await eK(this.body);let{keyframes:t,options:i}=eH(this,"tooltip.hide",{dir:this.localize.dir()});await eq(this.popup.popup,t,i),this.popup.active=!1,this.body.hidden=!0,this.emit("sl-after-hide")}}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ej(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,ej(this,"sl-after-hide")}render(){return q`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${eM({tooltip:!0,"tooltip--open":this.open})}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist?"fixed":"absolute"}
        flip
        shift
        arrow
        hover-bridge
      >
        ${""}
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        ${""}
        <div part="body" id="tooltip" class="tooltip__body" role="tooltip" aria-live=${this.open?"polite":"off"}>
          <slot name="content">${this.content}</slot>
        </div>
      </sl-popup>
    `}};eX.styles=[t$,tp],eX.dependencies={"sl-popup":eU},tM([tN("slot:not([name])")],eX.prototype,"defaultSlot",2),tM([tN(".tooltip__body")],eX.prototype,"body",2),tM([tN("sl-popup")],eX.prototype,"popup",2),tM([tU()],eX.prototype,"content",2),tM([tU()],eX.prototype,"placement",2),tM([tU({type:Boolean,reflect:!0})],eX.prototype,"disabled",2),tM([tU({type:Number})],eX.prototype,"distance",2),tM([tU({type:Boolean,reflect:!0})],eX.prototype,"open",2),tM([tU({type:Number})],eX.prototype,"skidding",2),tM([tU()],eX.prototype,"trigger",2),tM([tU({type:Boolean})],eX.prototype,"hoist",2),tM([eZ("open",{waitUntilFirstUpdate:!0})],eX.prototype,"handleOpenChange",1),tM([eZ(["content","distance","hoist","placement","skidding"])],eX.prototype,"handleOptionsChange",1),tM([eZ("disabled")],eX.prototype,"handleDisabledChange",1),eV("tooltip.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:150,easing:"ease"}}),eV("tooltip.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:150,easing:"ease"}});var eG=a`
  :host {
    --error-color: var(--sl-color-danger-600);
    --success-color: var(--sl-color-success-600);

    display: inline-block;
  }

  .copy-button__button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
  }

  .copy-button--success .copy-button__button {
    color: var(--success-color);
  }

  .copy-button--error .copy-button__button {
    color: var(--error-color);
  }

  .copy-button__button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .copy-button__button[disabled] {
    opacity: 0.5;
    cursor: not-allowed !important;
  }

  slot {
    display: inline-flex;
  }
`,eJ="",eQ={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},e0=[{name:"default",resolver:t=>(function(t=""){if(!eJ){let t=[...document.getElementsByTagName("script")],e=t.find(t=>t.hasAttribute("data-shoelace"));if(e)eJ=e.getAttribute("data-shoelace");else{let e=t.find(t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(t.src)),i="";e&&(i=e.getAttribute("src")),eJ=i.split("/").slice(0,-1).join("/")}}return eJ.replace(/\/$/,"")+(t?`/${t.replace(/^\//,"")}`:"")})(`assets/icons/${t}.svg`)},{name:"system",resolver:t=>t in eQ?`data:image/svg+xml,${encodeURIComponent(eQ[t])}`:""}],e1=[];function e2(t){return e0.find(e=>e.name===t)}var e5=a`
  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;let{I:e8}={M:E,P:S,A:z,C:1,L:G,R:tt,D:M,V:Q,I:te,H:ti,N:ts,U:tr,B:to,F:tn},e3={};var e6=Symbol(),e7=Symbol(),e4=new Map,e9=class extends tV{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(t,e){var i;let o;if(null==e?void 0:e.spriteSheet)return this.svg=q`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,this.svg;try{if(!(o=await fetch(t,{mode:"cors"})).ok)return 410===o.status?e6:e7}catch(t){return e7}try{let t=document.createElement("div");t.innerHTML=await o.text();let e=t.firstElementChild;if((null==(i=null==e?void 0:e.tagName)?void 0:i.toLowerCase())!=="svg")return e6;td||(td=new DOMParser);let s=td.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");if(!s)return e6;return s.part.add("svg"),document.adoptNode(s)}catch(t){return e6}}connectedCallback(){super.connectedCallback(),e1.push(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,e1=e1.filter(e=>e!==t)}getIconSource(){let t=e2(this.library);return this.name&&t?{url:t.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var t;let{url:e,fromLibrary:i}=this.getIconSource(),o=i?e2(this.library):void 0;if(!e){this.svg=null;return}let s=e4.get(e);if(s||(s=this.resolveIcon(e,o),e4.set(e,s)),!this.initialRender)return;let r=await s;if(r===e7&&e4.delete(e),e===this.getIconSource().url){let e;if(void 0===e?void 0!==r?._$litType$:r?._$litType$===e){if(this.svg=r,o){await this.updateComplete;let t=this.shadowRoot.querySelector("[part='svg']");"function"==typeof o.mutator&&t&&o.mutator(t)}return}switch(r){case e7:case e6:this.svg=null,this.emit("sl-error");break;default:this.svg=r.cloneNode(!0),null==(t=null==o?void 0:o.mutator)||t.call(o,this.svg),this.emit("sl-load")}}}render(){return this.svg}};e9.styles=[t$,e5],tM([tF()],e9.prototype,"svg",2),tM([tU({reflect:!0})],e9.prototype,"name",2),tM([tU()],e9.prototype,"src",2),tM([tU()],e9.prototype,"label",2),tM([tU({reflect:!0})],e9.prototype,"library",2),tM([eZ("label")],e9.prototype,"handleLabelChange",1),tM([eZ(["name","src","library"])],e9.prototype,"setIcon",1);var it=class extends tV{constructor(){super(...arguments),this.localize=new tk(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top",this.hoist=!1}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){let e=this.getRootNode(),i=this.from.includes("."),o=this.from.includes("[")&&this.from.includes("]"),s=this.from,r="";i?[s,r]=this.from.trim().split("."):o&&([s,r]=this.from.trim().replace(/\]$/,"").split("["));let n="getElementById"in e?e.getElementById(s):null;n?t=o?n.getAttribute(r)||"":i?n[r]||"":n.textContent||"":(this.showStatus("error"),this.emit("sl-error"))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.emit("sl-copy",{detail:{value:t}})}catch(t){this.showStatus("error"),this.emit("sl-error")}else this.showStatus("error"),this.emit("sl-error")}async showStatus(t){let e=this.copyLabel||this.localize.term("copy"),i=this.successLabel||this.localize.term("copied"),o=this.errorLabel||this.localize.term("error"),s="success"===t?this.successIcon:this.errorIcon,r=eH(this,"copy.in",{dir:"ltr"}),n=eH(this,"copy.out",{dir:"ltr"});this.tooltip.content="success"===t?i:o,await this.copyIcon.animate(n.keyframes,n.options).finished,this.copyIcon.hidden=!0,this.status=t,s.hidden=!1,await s.animate(r.keyframes,r.options).finished,setTimeout(async()=>{await s.animate(n.keyframes,n.options).finished,s.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await this.copyIcon.animate(r.keyframes,r.options).finished,this.tooltip.content=e,this.isCopying=!1},this.feedbackDuration)}render(){let t=this.copyLabel||this.localize.term("copy");return q`
      <sl-tooltip
        class=${eM({"copy-button":!0,"copy-button--success":"success"===this.status,"copy-button--error":"error"===this.status})}
        content=${t}
        placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        exportparts="
          base:tooltip__base,
          base__popup:tooltip__base__popup,
          base__arrow:tooltip__base__arrow,
          body:tooltip__body
        "
      >
        <button
          class="copy-button__button"
          part="button"
          type="button"
          ?disabled=${this.disabled}
          @click=${this.handleCopy}
        >
          <slot part="copy-icon" name="copy-icon">
            <sl-icon library="system" name="copy"></sl-icon>
          </slot>
          <slot part="success-icon" name="success-icon" hidden>
            <sl-icon library="system" name="check"></sl-icon>
          </slot>
          <slot part="error-icon" name="error-icon" hidden>
            <sl-icon library="system" name="x-lg"></sl-icon>
          </slot>
        </button>
      </sl-tooltip>
    `}};it.styles=[t$,eG],it.dependencies={"sl-icon":e9,"sl-tooltip":eX},tM([tN('slot[name="copy-icon"]')],it.prototype,"copyIcon",2),tM([tN('slot[name="success-icon"]')],it.prototype,"successIcon",2),tM([tN('slot[name="error-icon"]')],it.prototype,"errorIcon",2),tM([tN("sl-tooltip")],it.prototype,"tooltip",2),tM([tF()],it.prototype,"isCopying",2),tM([tF()],it.prototype,"status",2),tM([tU()],it.prototype,"value",2),tM([tU()],it.prototype,"from",2),tM([tU({type:Boolean,reflect:!0})],it.prototype,"disabled",2),tM([tU({attribute:"copy-label"})],it.prototype,"copyLabel",2),tM([tU({attribute:"success-label"})],it.prototype,"successLabel",2),tM([tU({attribute:"error-label"})],it.prototype,"errorLabel",2),tM([tU({attribute:"feedback-duration",type:Number})],it.prototype,"feedbackDuration",2),tM([tU({attribute:"tooltip-placement"})],it.prototype,"tooltipPlacement",2),tM([tU({type:Boolean})],it.prototype,"hoist",2),eV("copy.in",{keyframes:[{scale:".25",opacity:".25"},{scale:"1",opacity:"1"}],options:{duration:100}}),eV("copy.out",{keyframes:[{scale:"1",opacity:"1"},{scale:".25",opacity:"0"}],options:{duration:100}}),it.define("sl-copy-button");let ie={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},ii=([t,e,i])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{o.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{let e=ii(t);o.appendChild(e)}),o},io=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",is=(t,{nameAttr:e,icons:i,attrs:o})=>{let s=t.getAttribute(e);if(null==s)return;let r=i[s.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!r)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let n=Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),l={...ie,"data-lucide":s,...o,...n},a=["lucide",`lucide-${s}`,n,o].flatMap(io).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");a&&Object.assign(l,{class:a});let h=((t,e={})=>ii(["svg",{...ie,...e},t]))(r,l);return t.parentNode?.replaceChild(h,t)},ir=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]],il=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]],ia=({icons:t={},nameAttr:e="data-lucide",attrs:i={},root:o=document,inTemplates:s}={})=>{if(!Object.values(t).length)throw Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if(void 0===o)throw Error("`createIcons()` only works in a browser environment.");if(Array.from(o.querySelectorAll(`[${e}]`)).forEach(o=>is(o,{nameAttr:e,icons:t,attrs:i})),s&&Array.from(o.querySelectorAll("template")).forEach(o=>ia({icons:t,nameAttr:e,attrs:i,root:o.content,inTemplates:s})),"data-lucide"===e){let e=o.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>is(e,{nameAttr:"icon-name",icons:t,attrs:i})))}},ih={"copy-icon":"link","success-icon":"link","error-icon":"unlink"},ic="data-icon";customElements.define("copy-url",class extends it{constructor(){super()}connectedCallback(){ia({icons:{Link:ir,Unlink:il},nameAttr:ic}),this.copyLabel="Copy link",this.successLabel="Copied",this.errorLabel="Can't copy link",this.closest("h1, h2, h3, h4, h5, h6")&&Object.entries(ih).forEach(t=>{this.appendChild(function([t,e]){let i=document.createElement("span");return i.setAttribute(ic,e),i.setAttribute("slot",t),i}(t))}),super.connectedCallback()}async handleCopy(){let t=this.from,e=new URL(window.location.href),i=document.createElement("span"),o=t.replace(/\./g,"_").replace(/\[/g,"_");e.hash=t,i.id=`FAKE_TARGET_${o}`,i.textContent=e.href,i.style.display="none",this.appendChild(i),this.from=i.id,await super.handleCopy(),this.from=t,this.removeChild(i)}});var id={},ip="undefined"!=typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(t){setTimeout(t,16)};id=function(t){var e="startValue"in t?t.startValue:0,i="endValue"in t?t.endValue:1,o="durationMs"in t?t.durationMs:200,s=t.onComplete||function(){},r=o/16,n=(i-e)/r,l=Math.PI/r,a=e,h=0;ip(function e(){h+=l,a+=n*Math.pow(Math.sin(h),2)*2,h<Math.PI?(t.onStep(a),ip(e)):(t.onStep(i),s())})},(()=>{let t="PageUp",e="--navbar-scroll-margin";function i(t,i){var o;let s,r=getComputedStyle(document.body);return t&&(s=getComputedStyle(t).getPropertyValue(e)),s||(s=r.getPropertyValue(e)),i-(s=5*Math.ceil((s=(o=Number(s.replace("rem","")))*parseFloat(r.fontSize))/5))}function o(t){var e;((e=id)&&e.__esModule?e.default:e)({durationMs:200,startValue:window.scrollY,endValue:t,onStep:t=>window.scroll({behavior:"instant",top:t})})}function s(t,e,s){let r;e&&(r=document.getElementById(e))&&(t.preventDefault(),o(i(r,r.offsetTop)),window.history.pushState(null,null,s))}function r(t){return t.substring(1)}window.addEventListener("load",t=>{s(t,r(document.location.hash),document.location.href)}),window.addEventListener("hashchange",t=>{let e=new URL(t.newURL);s(t,r(e.hash),e.hash)}),document.addEventListener("keydown",e=>{let s,r=e.code;("Space"===r||"PageDown"===r||r===t)&&(e.preventDefault(),e.stopImmediatePropagation(),s=i(null,window.innerHeight),r===t?o(window.scrollY-s):o(window.scrollY+s))})})();var iu=a`
  :host {
    display: block;
  }

  .details {
    border: solid 1px var(--sl-color-neutral-200);
    border-radius: var(--sl-border-radius-medium);
    background-color: var(--sl-color-neutral-0);
    overflow-anchor: none;
  }

  .details--disabled {
    opacity: 0.5;
  }

  .details__header {
    display: flex;
    align-items: center;
    border-radius: inherit;
    padding: var(--sl-spacing-medium);
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  }

  .details__header::-webkit-details-marker {
    display: none;
  }

  .details__header:focus {
    outline: none;
  }

  .details__header:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(1px + var(--sl-focus-ring-offset));
  }

  .details--disabled .details__header {
    cursor: not-allowed;
  }

  .details--disabled .details__header:focus-visible {
    outline: none;
    box-shadow: none;
  }

  .details__summary {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .details__summary-icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    transition: var(--sl-transition-medium) rotate ease;
  }

  .details--open .details__summary-icon {
    rotate: 90deg;
  }

  .details--open.details--rtl .details__summary-icon {
    rotate: -90deg;
  }

  .details--open slot[name='expand-icon'],
  .details:not(.details--open) slot[name='collapse-icon'] {
    display: none;
  }

  .details__body {
    overflow: hidden;
  }

  .details__content {
    display: block;
    padding: var(--sl-spacing-medium);
  }
`,im=class extends tV{constructor(){super(...arguments),this.localize=new tk(this),this.open=!1,this.disabled=!1}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)"attributes"===e.type&&"open"===e.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.detailsObserver)||t.disconnect()}handleSummaryClick(t){t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus())}handleSummaryKeyDown(t){("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.open?this.hide():this.show()),("ArrowUp"===t.key||"ArrowLeft"===t.key)&&(t.preventDefault(),this.hide()),("ArrowDown"===t.key||"ArrowRight"===t.key)&&(t.preventDefault(),this.show())}async handleOpenChange(){if(this.open){if(this.details.open=!0,this.emit("sl-show",{cancelable:!0}).defaultPrevented){this.open=!1,this.details.open=!1;return}await eK(this.body);let{keyframes:t,options:e}=eH(this,"details.show",{dir:this.localize.dir()});await eq(this.body,eY(t,this.body.scrollHeight),e),this.body.style.height="auto",this.emit("sl-after-show")}else{if(this.emit("sl-hide",{cancelable:!0}).defaultPrevented){this.details.open=!0,this.open=!0;return}await eK(this.body);let{keyframes:t,options:e}=eH(this,"details.hide",{dir:this.localize.dir()});await eq(this.body,eY(t,this.body.scrollHeight),e),this.body.style.height="auto",this.details.open=!1,this.emit("sl-after-hide")}}async show(){if(!this.open&&!this.disabled)return this.open=!0,ej(this,"sl-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,ej(this,"sl-after-hide")}render(){let t="rtl"===this.localize.dir();return q`
      <details
        part="base"
        class=${eM({details:!0,"details--open":this.open,"details--disabled":this.disabled,"details--rtl":t})}
      >
        <summary
          part="header"
          id="header"
          class="details__header"
          role="button"
          aria-expanded=${this.open?"true":"false"}
          aria-controls="content"
          aria-disabled=${this.disabled?"true":"false"}
          tabindex=${this.disabled?"-1":"0"}
          @click=${this.handleSummaryClick}
          @keydown=${this.handleSummaryKeyDown}
        >
          <slot name="summary" part="summary" class="details__summary">${this.summary}</slot>

          <span part="summary-icon" class="details__summary-icon">
            <slot name="expand-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot name="collapse-icon">
              <sl-icon library="system" name=${t?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </span>
        </summary>

        <div class="details__body" role="region" aria-labelledby="header">
          <slot part="content" id="content" class="details__content"></slot>
        </div>
      </details>
    `}};im.styles=[t$,iu],im.dependencies={"sl-icon":e9},tM([tN(".details")],im.prototype,"details",2),tM([tN(".details__header")],im.prototype,"header",2),tM([tN(".details__body")],im.prototype,"body",2),tM([tN(".details__expand-icon-slot")],im.prototype,"expandIconSlot",2),tM([tU({type:Boolean,reflect:!0})],im.prototype,"open",2),tM([tU()],im.prototype,"summary",2),tM([tU({type:Boolean,reflect:!0})],im.prototype,"disabled",2),tM([eZ("open",{waitUntilFirstUpdate:!0})],im.prototype,"handleOpenChange",1),eV("details.show",{keyframes:[{height:"0",opacity:"0"},{height:"auto",opacity:"1"}],options:{duration:250,easing:"linear"}}),eV("details.hide",{keyframes:[{height:"auto",opacity:"1"},{height:"0",opacity:"0"}],options:{duration:250,easing:"linear"}}),im.define("sl-details");var ig=a`
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
    -webkit-user-select: none;
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
    line-height: var(--sl-line-height-dense);
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
    flex-shrink: 0;
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
`,iy=a`
  :host {
    display: inline-block;
  }

  .checkbox {
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-label-color);
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
    transition:
      var(--sl-transition-fast) border-color,
      var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) color,
      var(--sl-transition-fast) box-shadow;
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
    -webkit-user-select: none;
  }

  :host([required]) .checkbox__label::after {
    content: var(--sl-input-required-content);
    color: var(--sl-input-required-content-color);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`,ib=a`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control__label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`,iv=new WeakMap,iw=new WeakMap,ix=new WeakMap,i_=new WeakSet,ik=new WeakMap,i$=class{constructor(t,e){this.handleFormData=t=>{let e=this.options.disabled(this.host),i=this.options.name(this.host),o=this.options.value(this.host),s="sl-button"===this.host.tagName.toLowerCase();this.host.isConnected&&!e&&!s&&"string"==typeof i&&i.length>0&&void 0!==o&&(Array.isArray(o)?o.forEach(e=>{t.formData.append(i,e.toString())}):t.formData.append(i,o.toString()))},this.handleFormSubmit=t=>{var e;let i=this.options.disabled(this.host),o=this.options.reportValidity;this.form&&!this.form.noValidate&&(null==(e=iv.get(this.form))||e.forEach(t=>{this.setUserInteracted(t,!0)})),!this.form||this.form.noValidate||i||o(this.host)||(t.preventDefault(),t.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),ik.set(this.host,[])},this.handleInteraction=t=>{let e=ik.get(this.host);e.includes(t.type)||e.push(t.type),e.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let t of this.form.querySelectorAll("*"))if("function"==typeof t.checkValidity&&!t.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){for(let t of this.form.querySelectorAll("*"))if("function"==typeof t.reportValidity&&!t.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=tI({form:t=>{let e=t.form;if(e){let i=t.getRootNode().querySelector(`#${e}`);if(i)return i}return t.closest("form")},name:t=>t.name,value:t=>t.value,defaultValue:t=>t.defaultValue,disabled:t=>{var e;return null!=(e=t.disabled)&&e},reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity(),checkValidity:t=>"function"!=typeof t.checkValidity||t.checkValidity(),setValue:(t,e)=>t.value=e,assumeInteractionOn:["sl-input"]},e)}hostConnected(){let t=this.options.form(this.host);t&&this.attachForm(t),ik.set(this.host,[]),this.options.assumeInteractionOn.forEach(t=>{this.host.addEventListener(t,this.handleInteraction)})}hostDisconnected(){this.detachForm(),ik.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){let t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,iv.has(this.form)?iv.get(this.form).add(this.host):iv.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),iw.has(this.form)||(iw.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),ix.has(this.form)||(ix.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;let t=iv.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),iw.has(this.form)&&(this.form.reportValidity=iw.get(this.form),iw.delete(this.form)),ix.has(this.form)&&(this.form.checkValidity=ix.get(this.form),ix.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?i_.add(t):i_.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){let i=document.createElement("button");i.type=t,i.style.position="absolute",i.style.width="0",i.style.height="0",i.style.clipPath="inset(50%)",i.style.overflow="hidden",i.style.whiteSpace="nowrap",e&&(i.name=e.name,i.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(t=>{e.hasAttribute(t)&&i.setAttribute(t,e.getAttribute(t))})),this.form.append(i),i.click(),i.remove()}}getForm(){var t;return null!=(t=this.form)?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){let e=this.host,i=!!i_.has(e),o=!!e.required;e.toggleAttribute("data-required",o),e.toggleAttribute("data-optional",!o),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&i),e.toggleAttribute("data-user-valid",t&&i)}updateValidity(){let t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){let e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||null==t||t.preventDefault()}},iC=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(tA(tI({},iC),tS({valid:!1,valueMissing:!0}))),Object.freeze(tA(tI({},iC),tS({valid:!1,customError:!0})));var iA=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{let e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){if("sl-visually-hidden"===t.tagName.toLowerCase())return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};let iE=eO(class extends eI{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===W||e===K)return e;let i=t.element,o=t.name;if(3===t.type){if(e===i[o])return W}else if(4===t.type){if(!!e===i.hasAttribute(o))return W}else if(1===t.type&&i.getAttribute(o)===e+"")return W;return((t,e=e3)=>t._$AH=e)(t),e}});var iS=class extends tV{constructor(){super(...arguments),this.formControlController=new i$(this,{value:t=>t.checked?t.value||"on":void 0,defaultValue:t=>t.defaultChecked,setValue:(t,e)=>t.checked=e}),this.hasSlotController=new iA(this,"help-text"),this.hasFocus=!1,this.title="",this.name="",this.size="medium",this.disabled=!1,this.checked=!1,this.indeterminate=!1,this.defaultChecked=!1,this.form="",this.required=!1,this.helpText=""}get validity(){return this.input.validity}get validationMessage(){return this.input.validationMessage}firstUpdated(){this.formControlController.updateValidity()}handleClick(){this.checked=!this.checked,this.indeterminate=!1,this.emit("sl-change")}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleInput(){this.emit("sl-input")}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleDisabledChange(){this.formControlController.setValidity(this.disabled)}handleStateChange(){this.input.checked=this.checked,this.input.indeterminate=this.indeterminate,this.formControlController.updateValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}checkValidity(){return this.input.checkValidity()}getForm(){return this.formControlController.getForm()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.formControlController.updateValidity()}render(){let t=this.hasSlotController.test("help-text"),e=!!this.helpText||!!t;return q`
      <div
        class=${eM({"form-control":!0,"form-control--small":"small"===this.size,"form-control--medium":"medium"===this.size,"form-control--large":"large"===this.size,"form-control--has-help-text":e})}
      >
        <label
          part="base"
          class=${eM({checkbox:!0,"checkbox--checked":this.checked,"checkbox--disabled":this.disabled,"checkbox--focused":this.hasFocus,"checkbox--indeterminate":this.indeterminate,"checkbox--small":"small"===this.size,"checkbox--medium":"medium"===this.size,"checkbox--large":"large"===this.size})}
        >
          <input
            class="checkbox__input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${this.value??K}
            .indeterminate=${iE(this.indeterminate)}
            .checked=${iE(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="help-text"
            @click=${this.handleClick}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
          />

          <span
            part="control${this.checked?" control--checked":""}${this.indeterminate?" control--indeterminate":""}"
            class="checkbox__control"
          >
            ${this.checked?q`
                  <sl-icon part="checked-icon" class="checkbox__checked-icon" library="system" name="check"></sl-icon>
                `:""}
            ${!this.checked&&this.indeterminate?q`
                  <sl-icon
                    part="indeterminate-icon"
                    class="checkbox__indeterminate-icon"
                    library="system"
                    name="indeterminate"
                  ></sl-icon>
                `:""}
          </span>

          <div part="label" class="checkbox__label">
            <slot></slot>
          </div>
        </label>

        <div
          aria-hidden=${e?"false":"true"}
          class="form-control__help-text"
          id="help-text"
          part="form-control-help-text"
        >
          <slot name="help-text">${this.helpText}</slot>
        </div>
      </div>
    `}};iS.styles=[t$,ib,iy],iS.dependencies={"sl-icon":e9},tM([tN('input[type="checkbox"]')],iS.prototype,"input",2),tM([tF()],iS.prototype,"hasFocus",2),tM([tU()],iS.prototype,"title",2),tM([tU()],iS.prototype,"name",2),tM([tU()],iS.prototype,"value",2),tM([tU({reflect:!0})],iS.prototype,"size",2),tM([tU({type:Boolean,reflect:!0})],iS.prototype,"disabled",2),tM([tU({type:Boolean,reflect:!0})],iS.prototype,"checked",2),tM([tU({type:Boolean,reflect:!0})],iS.prototype,"indeterminate",2),tM([((t="value")=>(e,i)=>{let o=e.constructor,s=o.prototype.attributeChangedCallback;o.prototype.attributeChangedCallback=function(e,r,n){var l;let a=o.getPropertyOptions(t);if(e===("string"==typeof a.attribute?a.attribute:t)){let e=a.converter||w,o=("function"==typeof e?e:null!=(l=null==e?void 0:e.fromAttribute)?l:w.fromAttribute)(n,a.type);this[t]!==o&&(this[i]=o)}s.call(this,e,r,n)}})("checked")],iS.prototype,"defaultChecked",2),tM([tU({reflect:!0})],iS.prototype,"form",2),tM([tU({type:Boolean,reflect:!0})],iS.prototype,"required",2),tM([tU({attribute:"help-text"})],iS.prototype,"helpText",2),tM([eZ("disabled",{waitUntilFirstUpdate:!0})],iS.prototype,"handleDisabledChange",1),tM([eZ(["checked","indeterminate"],{waitUntilFirstUpdate:!0})],iS.prototype,"handleStateChange",1);var iz=a`
  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
    flex: none;
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
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.05em, 3em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.05em, 3em;
    }
  }
`,iL=class extends tV{constructor(){super(...arguments),this.localize=new tk(this)}render(){return q`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};iL.styles=[t$,iz];var iP=class t extends tV{constructor(){super(...arguments),this.localize=new tk(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&"treeitem"===t.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.emit("sl-collapse"),await eK(this.childrenContainer);let{keyframes:t,options:e}=eH(this,"tree-item.collapse",{dir:this.localize.dir()});await eq(this.childrenContainer,eY(t,this.childrenContainer.scrollHeight),e),this.childrenContainer.hidden=!0,this.emit("sl-after-collapse")}isNestedItem(){let e=this.parentElement;return!!e&&t.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.emit("sl-expand"),await eK(this.childrenContainer),this.childrenContainer.hidden=!1;let{keyframes:t,options:e}=eH(this,"tree-item.expand",{dir:this.localize.dir()});await eq(this.childrenContainer,eY(t,this.childrenContainer.scrollHeight),e),this.childrenContainer.style.height="auto",this.emit("sl-after-expand")}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleSelectedChange(){this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.emit("sl-lazy-load")):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.emit("sl-lazy-change")}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(i=>t.isTreeItem(i)&&(e||!i.disabled)):[]}render(){var t,e,i,o;let s="rtl"===this.localize.dir(),r=!this.loading&&(!this.isLeaf||this.lazy);return q`
      <div
        part="base"
        class="${eM({"tree-item":!0,"tree-item--expanded":this.expanded,"tree-item--selected":this.selected,"tree-item--disabled":this.disabled,"tree-item--leaf":this.isLeaf,"tree-item--has-expand-button":r,"tree-item--rtl":"rtl"===this.localize.dir()})}"
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
            class=${eM({"tree-item__expand-button":!0,"tree-item__expand-button--visible":r})}
            aria-hidden="true"
          >
            ${t=this.loading,e=()=>q` <sl-spinner part="spinner" exportparts="base:spinner__base"></sl-spinner> `,t?e(t):void 0}
            <slot class="tree-item__expand-icon-slot" name="expand-icon">
              <sl-icon library="system" name=${s?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
            <slot class="tree-item__expand-icon-slot" name="collapse-icon">
              <sl-icon library="system" name=${s?"chevron-left":"chevron-right"}></sl-icon>
            </slot>
          </div>

          ${i=this.selectable,o=()=>q`
              <sl-checkbox
                part="checkbox"
                exportparts="
                    base:checkbox__base,
                    control:checkbox__control,
                    control--checked:checkbox__control--checked,
                    control--indeterminate:checkbox__control--indeterminate,
                    checked-icon:checkbox__checked-icon,
                    indeterminate-icon:checkbox__indeterminate-icon,
                    label:checkbox__label
                  "
                class="tree-item__checkbox"
                ?disabled="${this.disabled}"
                ?checked="${iE(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></sl-checkbox>
            `,i?o(i):void 0}

          <slot class="tree-item__label" part="label"></slot>
        </div>

        <div class="tree-item__children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};iP.styles=[t$,ig],iP.dependencies={"sl-checkbox":iS,"sl-icon":e9,"sl-spinner":iL},tM([tF()],iP.prototype,"indeterminate",2),tM([tF()],iP.prototype,"isLeaf",2),tM([tF()],iP.prototype,"loading",2),tM([tF()],iP.prototype,"selectable",2),tM([tU({type:Boolean,reflect:!0})],iP.prototype,"expanded",2),tM([tU({type:Boolean,reflect:!0})],iP.prototype,"selected",2),tM([tU({type:Boolean,reflect:!0})],iP.prototype,"disabled",2),tM([tU({type:Boolean,reflect:!0})],iP.prototype,"lazy",2),tM([tN("slot:not([name])")],iP.prototype,"defaultSlot",2),tM([tN("slot[name=children]")],iP.prototype,"childrenSlot",2),tM([tN(".tree-item__item")],iP.prototype,"itemElement",2),tM([tN(".tree-item__children")],iP.prototype,"childrenContainer",2),tM([tN(".tree-item__expand-button slot")],iP.prototype,"expandButtonSlot",2),tM([eZ("loading",{waitUntilFirstUpdate:!0})],iP.prototype,"handleLoadingChange",1),tM([eZ("disabled")],iP.prototype,"handleDisabledChange",1),tM([eZ("selected")],iP.prototype,"handleSelectedChange",1),tM([eZ("expanded",{waitUntilFirstUpdate:!0})],iP.prototype,"handleExpandedChange",1),tM([eZ("expanded",{waitUntilFirstUpdate:!0})],iP.prototype,"handleExpandAnimation",1),tM([eZ("lazy",{waitUntilFirstUpdate:!0})],iP.prototype,"handleLazyChange",1),eV("tree-item.expand",{keyframes:[{height:"0",opacity:"0",overflow:"hidden"},{height:"auto",opacity:"1",overflow:"hidden"}],options:{duration:250,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}}),eV("tree-item.collapse",{keyframes:[{height:"auto",opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],options:{duration:200,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}});var iT=a`
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

    /*
     * Tree item indentation uses the "em" unit to increment its width on each level, so setting the font size to zero
     * here removes the indentation for all the nodes on the first level.
     */
    font-size: 0;
  }
`;function iO(t,e=!1){function i(t){let e=t.getChildrenItems({includeDisabled:!1});if(e.length){let i=e.every(t=>t.selected),o=e.every(t=>!t.selected&&!t.indeterminate);t.selected=i,t.indeterminate=!i&&!o}}!function t(o){for(let i of o.getChildrenItems())i.selected=e?o.selected||i.selected:!i.disabled&&o.selected,t(i);e&&i(o)}(t),function t(e){let o=e.parentElement;iP.isTreeItem(o)&&(i(o),t(o))}(t)}var iI=class extends tV{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new tk(this),this.initTreeItem=t=>{t.selectable="multiple"===this.selection,["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(e=>{let i=t.querySelector(`[slot="${e}-icon"]`),o=this.getExpandButtonIcon(e);o&&(null===i?t.append(o):i.hasAttribute("data-default")&&i.replaceWith(o))})},this.handleTreeChanged=t=>{for(let e of t){let t=[...e.addedNodes].filter(iP.isTreeItem),i=[...e.removedNodes].filter(iP.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;e&&this.contains(e)||(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),iP.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("sl-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){var t;super.disconnectedCallback(),null==(t=this.mutationObserver)||t.disconnect()}getExpandButtonIcon(t){let e=("expand"===t?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(e){let i=e.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(t=>t.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${t}-icon`,i}return null}selectItem(t){let e=[...this.selectedItems];if("multiple"===this.selection)t.selected=!t.selected,t.lazy&&(t.expanded=!0),iO(t);else if("single"===this.selection||t.isLeaf)for(let e of this.getAllTreeItems())e.selected=e===t;else"leaf"===this.selection&&(t.expanded=!t.expanded);let i=this.selectedItems;(e.length!==i.length||i.some(t=>!e.includes(t)))&&Promise.all(i.map(t=>t.updateComplete)).then(()=>{this.emit("sl-selection-change",{detail:{selection:i}})})}getAllTreeItems(){return[...this.querySelectorAll("sl-tree-item")]}focusItem(t){null==t||t.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(t=>{var e;return["input","textarea"].includes(null==(e=null==t?void 0:t.tagName)?void 0:e.toLowerCase())}))return;let e=this.getFocusableItems(),i="ltr"===this.localize.dir(),o="rtl"===this.localize.dir();if(e.length>0){t.preventDefault();let s=e.findIndex(t=>t.matches(":focus")),r=e[s],n=t=>{var i;let o=e[i=e.length-1,(t=>Object.is(t,-0)?0:t)(t<0?0:t>i?i:t)];this.focusItem(o)},l=t=>{r.expanded=t};"ArrowDown"===t.key?n(s+1):"ArrowUp"===t.key?n(s-1):i&&"ArrowRight"===t.key||o&&"ArrowLeft"===t.key?!r||r.disabled||r.expanded||r.isLeaf&&!r.lazy?n(s+1):l(!0):i&&"ArrowLeft"===t.key||o&&"ArrowRight"===t.key?!r||r.disabled||r.isLeaf||!r.expanded?n(s-1):l(!1):"Home"===t.key?n(0):"End"===t.key?n(e.length-1):"Enter"!==t.key&&" "!==t.key||r.disabled||this.selectItem(r)}}handleClick(t){let e=t.target,i=e.closest("sl-tree-item"),o=t.composedPath().some(t=>{var e;return null==(e=null==t?void 0:t.classList)?void 0:e.contains("tree-item__expand-button")});i&&!i.disabled&&e===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t="multiple"===this.selection,e=this.getAllTreeItems();for(let i of(this.setAttribute("aria-multiselectable",t?"true":"false"),e))i.selectable=t;t&&(await this.updateComplete,[...this.querySelectorAll(":scope > sl-tree-item")].forEach(t=>iO(t,!0)))}get selectedItems(){return this.getAllTreeItems().filter(t=>t.selected)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(t=>{var i;if(t.disabled)return!1;let o=null==(i=t.parentElement)?void 0:i.closest("[role=treeitem]");return o&&(!o.expanded||o.loading||e.has(o))&&e.add(t),!e.has(t)})}render(){return q`
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
    `}};iI.styles=[t$,iT],tM([tN("slot:not([name])")],iI.prototype,"defaultSlot",2),tM([tN("slot[name=expand-icon]")],iI.prototype,"expandedIconSlot",2),tM([tN("slot[name=collapse-icon]")],iI.prototype,"collapsedIconSlot",2),tM([tU()],iI.prototype,"selection",2),tM([eZ("selection")],iI.prototype,"handleSelectionChange",1),iI.define("sl-tree"),iP.define("sl-tree-item");let iM=["sl-details","sl-tree"];function iD(t){t.preventDefault()}function iR(t){t.stopImmediatePropagation()}document.querySelectorAll("sl-details").forEach(t=>{t.addEventListener("sl-hide",iD),t.addEventListener("sl-show",iD)}),document.querySelectorAll(":not(sl-details) > sl-tree > sl-tree-item").forEach(t=>{let e=t.firstElementChild;e?.nodeName==="A"&&e.addEventListener("click",iR)}),(async()=>{let t=iM.filter(t=>document.querySelector(t));for(let e of(await Promise.allSettled(t.map(t=>customElements.whenDefined(t))),t))for(let t of document.querySelectorAll(e))t.classList.add("ready")})(),eV("details.show",{keyframes:e=[{height:"0"},{height:"auto"}],options:i={duration:150,easing:"ease-in-out"}}),eV("details.hide",{keyframes:e.slice().reverse(),options:i});