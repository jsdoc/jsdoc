let t;let e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;class r{constructor(t,e,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(i&&void 0===t){let i=void 0!==e&&1===e.length;i&&(t=s.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(e,t))}return t}toString(){return this.cssText}}let n=(t,...e)=>new r(1===t.length?t[0]:e.reduce((e,i,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[o+1],t[0]),t,o),a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e,i="";for(let e of t.cssRules)i+=e.cssText;return new r("string"==typeof(e=i)?e:e+"",void 0,o)})(t):t,{is:l,defineProperty:h,getOwnPropertyDescriptor:c,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,f=m.trustedTypes,g=f?f.emptyScript:"",y=m.reactiveElementPolyfillSupport,w={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:w,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(t,i,e);void 0!==o&&h(this.prototype,t,o)}}static getPropertyDescriptor(t,e,i){let{get:o,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){let r=o?.call(this);s?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let t=this.properties;for(let e of[...d(t),...p(t)])this.createProperty(e,t[e])}let t=this[Symbol.metadata];if(null!==t){let e=litPropertyMetadata.get(t);if(void 0!==e)for(let[t,i]of e)this.elementProperties.set(t,i)}for(let[t,e]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t))for(let i of new Set(t.flat(1/0).reverse()))e.unshift(a(i));else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){let i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map;for(let e of this.constructor.elementProperties.keys())this.hasOwnProperty(e)&&(t.set(e,this[e]),delete this[e]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(i)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let i of o){let o=document.createElement("style"),s=e.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,i);if(void 0!==o&&!0===i.reflect){let s=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(t,e){let i=this.constructor,o=i._$Eh.get(t);if(void 0!==o&&this._$Em!==o){let t=i.getPropertyOptions(o),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=o;let r=s.fromAttribute(e,t.type);this[o]=r??this._$Ej?.get(o)??r,this._$Em=null}}requestUpdate(t,e,i,o=!1,s){if(void 0!==t){let r=this.constructor;if(!1===o&&(s=this[t]),!(((i??=r.getPropertyOptions(t)).hasChanged??b)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:o,wrapped:s},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==s||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}let t=this.constructor.elementProperties;if(t.size>0)for(let[e,i]of t){let{wrapped:t}=i,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,i,o)}}let t=!1,e=this._$AL;try{(t=this.shouldUpdate(e))?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x.elementProperties=new Map,x.finalized=new Map,y?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.2");let C=globalThis,$=t=>t,A=C.trustedTypes,k=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,E="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,_="?"+S,L=`<${_}>`,z=document,P=()=>z.createComment(""),I=t=>null===t||"object"!=typeof t&&"function"!=typeof t,T=Array.isArray,F=t=>T(t)||"function"==typeof t?.[Symbol.iterator],O="[ 	\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,U=/>/g,D=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,N=/"/g,V=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),H=q(1),j=(q(2),q(3),Symbol.for("lit-noChange")),W=Symbol.for("lit-nothing"),K=new WeakMap,Y=z.createTreeWalker(z,129);function Z(t,e){if(!T(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==k?k.createHTML(e):e}let X=(t,e)=>{let i=t.length-1,o=[],s,r=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){let i=t[e],a,l,h=-1,c=0;for(;c<i.length&&(n.lastIndex=c,null!==(l=n.exec(i)));)c=n.lastIndex,n===R?"!--"===l[1]?n=M:void 0!==l[1]?n=U:void 0!==l[2]?(V.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=D):void 0!==l[3]&&(n=D):n===D?">"===l[0]?(n=s??R,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?D:'"'===l[3]?N:B):n===N||n===B?n=D:n===M||n===U?n=R:(n=D,s=void 0);let d=n===D&&t[e+1].startsWith("/>")?" ":"";r+=n===R?i+L:h>=0?(o.push(a),i.slice(0,h)+E+i.slice(h)+S+d):i+S+(-2===h?e:d)}return[Z(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]};class G{constructor({strings:t,_$litType$:e},i){let o;this.parts=[];let s=0,r=0,n=t.length-1,a=this.parts,[l,h]=X(t,e);if(this.el=G.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){let t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=Y.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes())for(let t of o.getAttributeNames())if(t.endsWith(E)){let e=h[r++],i=o.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?ti:"?"===n[1]?to:"@"===n[1]?ts:te}),o.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),o.removeAttribute(t));if(V.test(o.tagName)){let t=o.textContent.split(S),e=t.length-1;if(e>0){o.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)o.append(t[i],P()),Y.nextNode(),a.push({type:2,index:++s});o.append(t[e],P())}}}else if(8===o.nodeType)if(o.data===_)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=o.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){let i=z.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,o){if(e===j)return e;let s=void 0!==o?i._$Co?.[o]:i._$Cl,r=I(e)?void 0:e._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),void 0===r?s=void 0:(s=new r(t))._$AT(t,i,o),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(e=J(t,s._$AS(t,e.values),s,o)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,o=(t?.creationScope??z).importNode(e,!0);Y.currentNode=o;let s=Y.nextNode(),r=0,n=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new tt(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new tr(s,this,t)),this._$AV.push(e),a=i[++n]}r!==a?.index&&(s=Y.nextNode(),r++)}return Y.currentNode=z,o}p(t){let e=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,o){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){I(t=J(this,t,e))?t===W||null==t||""===t?(this._$AH!==W&&this._$AR(),this._$AH=W):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):F(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==W&&I(this._$AH)?this._$AA.nextSibling.data=t:this.T(z.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(Z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(e);else{let t=new Q(o,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=K.get(t.strings);return void 0===e&&K.set(t.strings,e=new G(t)),e}k(t){T(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,o=0;for(let s of t)o===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[o],i._$AI(s),o++;o<e.length&&(this._$AR(i&&i._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let e=$(t).nextSibling;$(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,o,s){this.type=1,this._$AH=W,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=W}_$AI(t,e=this,i,o){let s=this.strings,r=!1;if(void 0===s)(r=!I(t=J(this,t,e,0))||t!==this._$AH&&t!==j)&&(this._$AH=t);else{let o,n,a=t;for(t=s[0],o=0;o<s.length-1;o++)(n=J(this,a[i+o],e,o))===j&&(n=this._$AH[o]),r||=!I(n)||n!==this._$AH[o],n===W?t=W:t!==W&&(t+=(n??"")+s[o+1]),this._$AH[o]=n}r&&!o&&this.j(t)}j(t){t===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class ti extends te{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===W?void 0:t}}class to extends te{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==W)}}class ts extends te{constructor(t,e,i,o,s){super(t,e,i,o,s),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??W)===j)return;let i=this._$AH,o=t===W&&i!==W||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==W&&(i===W||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class tr{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}let tn=C.litHtmlPolyfillSupport;tn?.(G,tt),(C.litHtmlVersions??=[]).push("3.3.2");let ta=globalThis;class tl extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{let o=i?.renderBefore??e,s=o._$litPart$;if(void 0===s){let t=i?.renderBefore??null;o._$litPart$=s=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}tl._$litElement$=!0,tl.finalized=!0,ta.litElementHydrateSupport?.({LitElement:tl});let th=ta.litElementPolyfillSupport;th?.({LitElement:tl}),(ta.litElementVersions??=[]).push("4.2.2");var tc,td,tp=n`
  .wa-visually-hidden:not(:focus-within),
  .wa-visually-hidden-force,
  .wa-visually-hidden-hint::part(hint),
  .wa-visually-hidden-label::part(label) {
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
`,tu=n`
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
`;async function tm(t,e,i){return t.animate(e,i).finished.catch(()=>{})}function tf(t,e){return new Promise(i=>{let o=new AbortController,{signal:s}=o;if(t.classList.contains(e))return;t.classList.remove(e),t.classList.add(e);let r=()=>{t.classList.remove(e),i(),o.abort()};t.addEventListener("animationend",r,{once:!0,signal:s}),t.addEventListener("animationcancel",r,{once:!0,signal:s})})}function tg(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?1e3*(parseFloat(t)||0):parseFloat(t)||0}var ty=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},tw=n`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;

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
`,tb={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},tv="",tx="7.0.1",tC=[{name:"default",resolver:(t,e="classic",i="solid")=>{let o,s,r;return s=(o=function(){if(!tv){let t=document.querySelector("[data-fa-kit-code]");t&&(tv=t.getAttribute("data-fa-kit-code")||"")}return tv}()).length>0,r="solid","notdog"===e?("solid"===i&&(r="solid"),"duo-solid"===i&&(r="duo-solid"),`https://ka-p.fontawesome.com/releases/v${tx}/svgs/notdog-${r}/${t}.svg?token=${encodeURIComponent(o)}`):"chisel"===e?`https://ka-p.fontawesome.com/releases/v${tx}/svgs/chisel-regular/${t}.svg?token=${encodeURIComponent(o)}`:"etch"===e?`https://ka-p.fontawesome.com/releases/v${tx}/svgs/etch-solid/${t}.svg?token=${encodeURIComponent(o)}`:"jelly"===e?("regular"===i&&(r="regular"),"duo-regular"===i&&(r="duo-regular"),"fill-regular"===i&&(r="fill-regular"),`https://ka-p.fontawesome.com/releases/v${tx}/svgs/jelly-${r}/${t}.svg?token=${encodeURIComponent(o)}`):"slab"===e?(("solid"===i||"regular"===i)&&(r="regular"),"press-regular"===i&&(r="press-regular"),`https://ka-p.fontawesome.com/releases/v${tx}/svgs/slab-${r}/${t}.svg?token=${encodeURIComponent(o)}`):"thumbprint"===e?`https://ka-p.fontawesome.com/releases/v${tx}/svgs/thumbprint-light/${t}.svg?token=${encodeURIComponent(o)}`:"whiteboard"===e?`https://ka-p.fontawesome.com/releases/v${tx}/svgs/whiteboard-semibold/${t}.svg?token=${encodeURIComponent(o)}`:("classic"===e&&("thin"===i&&(r="thin"),"light"===i&&(r="light"),"regular"===i&&(r="regular"),"solid"===i&&(r="solid")),"sharp"===e&&("thin"===i&&(r="sharp-thin"),"light"===i&&(r="sharp-light"),"regular"===i&&(r="sharp-regular"),"solid"===i&&(r="sharp-solid")),"duotone"===e&&("thin"===i&&(r="duotone-thin"),"light"===i&&(r="duotone-light"),"regular"===i&&(r="duotone-regular"),"solid"===i&&(r="duotone")),"sharp-duotone"===e&&("thin"===i&&(r="sharp-duotone-thin"),"light"===i&&(r="sharp-duotone-light"),"regular"===i&&(r="sharp-duotone-regular"),"solid"===i&&(r="sharp-duotone-solid")),"brands"===e&&(r="brands"),s?`https://ka-p.fontawesome.com/releases/v${tx}/svgs/${r}/${t}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${tx}/svgs/${r}/${t}.svg`)},mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:i,variant:o}=e;if("duotone"===i||"sharp-duotone"===i||"notdog"===i&&"duo-solid"===o||"jelly"===i&&"duo-regular"===o||"thumbprint"===i){let i=[...t.querySelectorAll("path")],o=i.find(t=>!t.hasAttribute("opacity")),s=i.find(t=>t.hasAttribute("opacity"));if(!o||!s)return;if(o.setAttribute("data-duotone-primary",""),s.setAttribute("data-duotone-secondary",""),e.swapOpacity&&o&&s){let t=s.getAttribute("opacity")||"0.4";o.style.setProperty("--path-opacity",t),s.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},{name:"system",resolver:(t,e="classic",i="solid")=>{let o=tb[i][t]??tb.regular[t]??tb.regular["circle-question"];if(o)return`data:image/svg+xml,${encodeURIComponent(o)}`;return""}}],t$=[];function tA(t){return tC.find(e=>e.name===t)}function tk(t,e){let i={waitUntilFirstUpdate:!1,...e};return(e,o)=>{let{update:s}=e,r=Array.isArray(t)?t:[t];e.update=function(t){r.forEach(e=>{if(t.has(e)){let s=t.get(e),r=this[e];s!==r&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](s,r)}}),s.call(this,t)}}}var tE=Object.defineProperty,tS=Object.getOwnPropertyDescriptor,t_=t=>{throw TypeError(t)},tL=(t,e,i,o)=>{for(var s,r=o>1?void 0:o?tS(e,i):e,n=t.length-1;n>=0;n--)(s=t[n])&&(r=(o?s(e,i,r):s(r))||r);return o&&r&&tE(e,i,r),r},tz=(t,e,i)=>e.has(t)||t_("Cannot "+i);let tP=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},tI={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:b};function tT(t){return(e,i)=>{let o;return"object"==typeof i?((t=tI,e,i)=>{let{kind:o,metadata:s}=i,r=globalThis.litPropertyMetadata.get(s);if(void 0===r&&globalThis.litPropertyMetadata.set(s,r=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===o){let{name:o}=i;return{set(i){let s=e.get.call(this);e.set.call(this,i),this.requestUpdate(o,s,t,!0,i)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){let{name:o}=i;return function(i){let s=this[o];e.call(this,i),this.requestUpdate(o,s,t,!0,i)}}throw Error("Unsupported decorator location: "+o)})(t,e,i):(o=e.hasOwnProperty(i),e.constructor.createProperty(i,t),o?Object.getOwnPropertyDescriptor(e,i):void 0)}}function tF(t){return tT({...t,state:!0,attribute:!1})}let tO=(t,e,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof e&&Object.defineProperty(t,e,i),i);function tR(t,e){return(i,o,s)=>{let r=e=>e.renderRoot?.querySelector(t)??null;if(e){let t,{get:e,set:n}="object"==typeof o?i:s??(t=Symbol(),{get(){return this[t]},set(e){this[t]=e}});return tO(i,o,{get(){let t=e.call(this);return void 0===t&&(null!==(t=r(this))||this.hasUpdated)&&n.call(this,t),t}})}return tO(i,o,{get(){return r(this)}})}}var tM=n`
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
`,tU=class extends tl{constructor(){let t;super(),(t=tc).has(this)?t_("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(this):t.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,e)=>{if(this.internals?.states)try{e?this.internals.states.add(t):this.internals.states.delete(t)}catch(t){if(String(t).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw t}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}for(let[t,e]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===e.default&&void 0!==e.initial&&"string"==typeof t&&this.customStates.set(`initial-${t}-${e.initial}`,!0)}static get styles(){return[tM,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}attributeChangedCallback(t,e,i){let o,s;if(tz(this,o=tc,"read from private field"),s?!s.call(this):!o.get(this)){let t,e;this.constructor.elementProperties.forEach((t,e)=>{t.reflect&&null!=this[e]&&this.initialReflectedProperties.set(e,this[e])}),tz(this,t=tc,"write to private field"),e?e.call(this,!0):t.set(this,!0)}super.attributeChangedCallback(t,e,i)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,i)=>{t.has(i)&&null==this[i]&&(this[i]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(t){if(this.didSSR&&!this.hasUpdated){let e=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});e.error=t,this.dispatchEvent(e)}throw t}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};tc=new WeakMap,tL([tT()],tU.prototype,"dir",2),tL([tT()],tU.prototype,"lang",2),tL([tT({type:Boolean,reflect:!0,attribute:"did-ssr"})],tU.prototype,"didSSR",2);let{I:tD}={M:E,P:S,A:_,C:1,L:X,R:Q,D:F,V:J,I:tt,H:te,N:to,U:ts,B:ti,F:tr},tB={};var tN=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},tV=Symbol(),tq=Symbol(),tH=new Map,tj=class extends tU{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.resolveIcon=async(t,e)=>{let i;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=H`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof e.mutator&&e.mutator(i,this),this.svg}try{if(!(i=await fetch(t,{mode:"cors"})).ok)return 410===i.status?tV:tq}catch{return tq}try{let t=document.createElement("div");t.innerHTML=await i.text();let e=t.firstElementChild;if(e?.tagName?.toLowerCase()!=="svg")return tV;td||(td=new DOMParser);let o=td.parseFromString(e.outerHTML,"text/html").body.querySelector("svg");if(!o)return tV;return o.part.add("svg"),document.adoptNode(o)}catch{return tV}}}connectedCallback(){super.connectedCallback(),t$.push(this)}firstUpdated(t){super.firstUpdated(t),this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,t$=t$.filter(e=>e!==t)}getIconSource(){let t=tA(this.library),e=this.family||"classic";return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=this.getIconSource(),i=e?tA(this.library):void 0;if(!t){this.svg=null;return}let o=tH.get(t);o||(o=this.resolveIcon(t,i),tH.set(t,o));let s=await o;if(s===tq&&tH.delete(t),t===this.getIconSource().url){let t;if(void 0===t?void 0!==s?._$litType$:s?._$litType$===t){this.svg=s;return}switch(s){case tq:case tV:this.svg=null,this.dispatchEvent(new tN);break;default:this.svg=s.cloneNode(!0),i?.mutator?.(this.svg,this),this.dispatchEvent(new ty)}}}updated(t){super.updated(t);let e=tA(this.library),i=this.shadowRoot?.querySelector("svg");i&&e?.mutator?.(i,this)}render(){return this.hasUpdated?this.svg:H`<svg part="svg" width="16" height="16"></svg>`}};tj.css=tw,tL([tF()],tj.prototype,"svg",2),tL([tT({reflect:!0})],tj.prototype,"name",2),tL([tT({reflect:!0})],tj.prototype,"family",2),tL([tT({reflect:!0})],tj.prototype,"variant",2),tL([tT({attribute:"auto-width",type:Boolean,reflect:!0})],tj.prototype,"autoWidth",2),tL([tT({attribute:"swap-opacity",type:Boolean,reflect:!0})],tj.prototype,"swapOpacity",2),tL([tT()],tj.prototype,"src",2),tL([tT()],tj.prototype,"label",2),tL([tT({reflect:!0})],tj.prototype,"library",2),tL([tk("label")],tj.prototype,"handleLabelChange",1),tL([tk(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],tj.prototype,"setIcon",1),tj=tL([tP("wa-icon")],tj);let tW=new Set,tK=new Map,tY="ltr",tZ="en",tX="undefined"!=typeof MutationObserver&&"undefined"!=typeof document&&void 0!==document.documentElement;if(tX){let t=new MutationObserver(tJ);tY=document.documentElement.dir||"ltr",tZ=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function tG(...e){e.map(e=>{let i=e.$code.toLowerCase();tK.has(i)?tK.set(i,Object.assign(Object.assign({},tK.get(i)),e)):tK.set(i,e),t||(t=e)}),tJ()}function tJ(){tX&&(tY=document.documentElement.dir||"ltr",tZ=document.documentElement.lang||navigator.language),[...tW.keys()].map(t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()})}class tQ{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){tW.add(this.host)}hostDisconnected(){tW.delete(this.host)}dir(){return`${this.host.dir||tY}`.toLowerCase()}lang(){return`${this.host.lang||tZ}`.toLowerCase()}getTranslationData(t){var e,i;let o=new Intl.Locale(t.replace(/_/g,"-")),s=null==o?void 0:o.language.toLowerCase(),r=null!=(i=null==(e=null==o?void 0:o.region)?void 0:e.toLowerCase())?i:"",n=tK.get(`${s}-${r}`),a=tK.get(s);return{locale:o,language:s,region:r,primary:n,secondary:a}}exists(e,i){var o;let{primary:s,secondary:r}=this.getTranslationData(null!=(o=i.lang)?o:this.lang());return i=Object.assign({includeFallback:!1},i),!!s&&!!s[e]||!!r&&!!r[e]||!!i.includeFallback&&!!t&&!!t[e]}term(e,...i){let o,{primary:s,secondary:r}=this.getTranslationData(this.lang());if(s&&s[e])o=s[e];else if(r&&r[e])o=r[e];else{if(!t||!t[e])return console.error(`No translation found for: ${String(e)}`),String(e);o=t[e]}return"function"==typeof o?o(...i):o}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return isNaN(t=Number(t))?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}}var t0={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>0===t?"No options selected":1===t?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};tG(t0);var t1=class extends tQ{};tG(t0);let t2=t=>(...e)=>({_$litDirective$:t,values:e});class t4{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}let t5=t2(class extends t4{constructor(t){if(super(t),1!==t.type||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(t=>""!==t))),e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let i=t.element.classList;for(let t of this.st)t in e||(i.remove(t),this.st.delete(t));for(let t in e){let o=!!e[t];o===this.st.has(t)||this.nt?.has(t)||(o?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return j}});var t3=class extends Event{constructor(t){super("wa-copy",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}},t8=class extends tU{constructor(){super(...arguments),this.localize=new t1(this),this.isCopying=!1,this.status="rest",this.value="",this.from="",this.disabled=!1,this.copyLabel="",this.successLabel="",this.errorLabel="",this.feedbackDuration=1e3,this.tooltipPlacement="top"}get currentLabel(){return"success"===this.status?this.successLabel||this.localize.term("copied"):"error"===this.status?this.errorLabel||this.localize.term("error"):this.copyLabel||this.localize.term("copy")}async handleCopy(){if(this.disabled||this.isCopying)return;this.isCopying=!0;let t=this.value;if(this.from){let e=this.getRootNode(),i=this.from.includes("."),o=this.from.includes("[")&&this.from.includes("]"),s=this.from,r="";i?[s,r]=this.from.trim().split("."):o&&([s,r]=this.from.trim().replace(/\]$/,"").split("["));let n="getElementById"in e?e.getElementById(s):null;n?t=o?n.getAttribute(r)||"":i?n[r]||"":n.textContent||"":(this.showStatus("error"),this.dispatchEvent(new tN))}if(t)try{await navigator.clipboard.writeText(t),this.showStatus("success"),this.dispatchEvent(new t3({value:t}))}catch(t){this.showStatus("error"),this.dispatchEvent(new tN)}else this.showStatus("error"),this.dispatchEvent(new tN)}async showStatus(t){let e="success"===t?this.successIcon:this.errorIcon;await tf(this.copyIcon,"hide"),this.copyIcon.hidden=!0,this.status=t,e.hidden=!1,await tf(e,"show"),setTimeout(async()=>{await tf(e,"hide"),e.hidden=!0,this.status="rest",this.copyIcon.hidden=!1,await tf(this.copyIcon,"show"),this.isCopying=!1},this.feedbackDuration)}render(){return H`
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
          class=${t5({"copy-button":!0,"copy-button-success":"success"===this.status,"copy-button-error":"error"===this.status})}
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
    `}};t8.css=[tp,tu],tL([tR('slot[name="copy-icon"]')],t8.prototype,"copyIcon",2),tL([tR('slot[name="success-icon"]')],t8.prototype,"successIcon",2),tL([tR('slot[name="error-icon"]')],t8.prototype,"errorIcon",2),tL([tR("wa-tooltip")],t8.prototype,"tooltip",2),tL([tF()],t8.prototype,"isCopying",2),tL([tF()],t8.prototype,"status",2),tL([tT()],t8.prototype,"value",2),tL([tT()],t8.prototype,"from",2),tL([tT({type:Boolean,reflect:!0})],t8.prototype,"disabled",2),tL([tT({attribute:"copy-label"})],t8.prototype,"copyLabel",2),tL([tT({attribute:"success-label"})],t8.prototype,"successLabel",2),tL([tT({attribute:"error-label"})],t8.prototype,"errorLabel",2),tL([tT({attribute:"feedback-duration",type:Number})],t8.prototype,"feedbackDuration",2),tL([tT({attribute:"tooltip-placement"})],t8.prototype,"tooltipPlacement",2),t8=tL([tP("wa-copy-button")],t8);var t6=n`
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
`,t7=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}},t9=n`
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
`;let et=Math.min,ee=Math.max,ei=Math.round,eo=Math.floor,es=t=>({x:t,y:t}),er={left:"right",right:"left",bottom:"top",top:"bottom"},en={start:"end",end:"start"};function ea(t,e){return"function"==typeof t?t(e):t}function el(t){return t.split("-")[0]}function eh(t){return t.split("-")[1]}function ec(t){return"x"===t?"y":"x"}function ed(t){return"y"===t?"height":"width"}let ep=new Set(["top","bottom"]);function eu(t){return ep.has(el(t))?"y":"x"}function em(t){return t.replace(/start|end/g,t=>en[t])}let ef=["left","right"],eg=["right","left"],ey=["top","bottom"],ew=["bottom","top"];function eb(t){return t.replace(/left|right|bottom|top/g,t=>er[t])}function ev(t){return"number"!=typeof t?{top:0,right:0,bottom:0,left:0,...t}:{top:t,right:t,bottom:t,left:t}}function ex(t){let{x:e,y:i,width:o,height:s}=t;return{width:o,height:s,top:i,left:e,right:e+o,bottom:i+s,x:e,y:i}}function eC(t,e,i){let o,{reference:s,floating:r}=t,n=eu(e),a=ec(eu(e)),l=ed(a),h=el(e),c="y"===n,d=s.x+s.width/2-r.width/2,p=s.y+s.height/2-r.height/2,u=s[l]/2-r[l]/2;switch(h){case"top":o={x:d,y:s.y-r.height};break;case"bottom":o={x:d,y:s.y+s.height};break;case"right":o={x:s.x+s.width,y:p};break;case"left":o={x:s.x-r.width,y:p};break;default:o={x:s.x,y:s.y}}switch(eh(e)){case"start":o[a]-=u*(i&&c?-1:1);break;case"end":o[a]+=u*(i&&c?-1:1)}return o}let e$=async(t,e,i)=>{let{placement:o="bottom",strategy:s="absolute",middleware:r=[],platform:n}=i,a=r.filter(Boolean),l=await (null==n.isRTL?void 0:n.isRTL(e)),h=await n.getElementRects({reference:t,floating:e,strategy:s}),{x:c,y:d}=eC(h,o,l),p=o,u={},m=0;for(let i=0;i<a.length;i++){let{name:r,fn:f}=a[i],{x:g,y:y,data:w,reset:b}=await f({x:c,y:d,initialPlacement:o,placement:p,strategy:s,middlewareData:u,rects:h,platform:n,elements:{reference:t,floating:e}});c=null!=g?g:c,d=null!=y?y:d,u={...u,[r]:{...u[r],...w}},b&&m<=50&&(m++,"object"==typeof b&&(b.placement&&(p=b.placement),b.rects&&(h=!0===b.rects?await n.getElementRects({reference:t,floating:e,strategy:s}):b.rects),{x:c,y:d}=eC(h,p,l)),i=-1)}return{x:c,y:d,placement:p,strategy:s,middlewareData:u}};async function eA(t,e){var i;void 0===e&&(e={});let{x:o,y:s,platform:r,rects:n,elements:a,strategy:l}=t,{boundary:h="clippingAncestors",rootBoundary:c="viewport",elementContext:d="floating",altBoundary:p=!1,padding:u=0}=ea(e,t),m=ev(u),f=a[p?"floating"===d?"reference":"floating":d],g=ex(await r.getClippingRect({element:null==(i=await (null==r.isElement?void 0:r.isElement(f)))||i?f:f.contextElement||await (null==r.getDocumentElement?void 0:r.getDocumentElement(a.floating)),boundary:h,rootBoundary:c,strategy:l})),y="floating"===d?{x:o,y:s,width:n.floating.width,height:n.floating.height}:n.reference,w=await (null==r.getOffsetParent?void 0:r.getOffsetParent(a.floating)),b=await (null==r.isElement?void 0:r.isElement(w))&&await (null==r.getScale?void 0:r.getScale(w))||{x:1,y:1},v=ex(r.convertOffsetParentRelativeRectToViewportRelativeRect?await r.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:y,offsetParent:w,strategy:l}):y);return{top:(g.top-v.top+m.top)/b.y,bottom:(v.bottom-g.bottom+m.bottom)/b.y,left:(g.left-v.left+m.left)/b.x,right:(v.right-g.right+m.right)/b.x}}let ek=new Set(["left","top"]);async function eE(t,e){let{placement:i,platform:o,elements:s}=t,r=await (null==o.isRTL?void 0:o.isRTL(s.floating)),n=el(i),a=eh(i),l="y"===eu(i),h=ek.has(n)?-1:1,c=r&&l?-1:1,d=ea(e,t),{mainAxis:p,crossAxis:u,alignmentAxis:m}="number"==typeof d?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return a&&"number"==typeof m&&(u="end"===a?-1*m:m),l?{x:u*c,y:p*h}:{x:p*h,y:u*c}}function eS(){return"undefined"!=typeof window}function e_(t){return eP(t)?(t.nodeName||"").toLowerCase():"#document"}function eL(t){var e;return(null==t||null==(e=t.ownerDocument)?void 0:e.defaultView)||window}function ez(t){var e;return null==(e=(eP(t)?t.ownerDocument:t.document)||window.document)?void 0:e.documentElement}function eP(t){return!!eS()&&(t instanceof Node||t instanceof eL(t).Node)}function eI(t){return!!eS()&&(t instanceof Element||t instanceof eL(t).Element)}function eT(t){return!!eS()&&(t instanceof HTMLElement||t instanceof eL(t).HTMLElement)}function eF(t){return!!eS()&&"undefined"!=typeof ShadowRoot&&(t instanceof ShadowRoot||t instanceof eL(t).ShadowRoot)}let eO=new Set(["inline","contents"]);function eR(t){let{overflow:e,overflowX:i,overflowY:o,display:s}=eK(t);return/auto|scroll|overlay|hidden|clip/.test(e+o+i)&&!eO.has(s)}let eM=new Set(["table","td","th"]),eU=[":popover-open",":modal"];function eD(t){return eU.some(e=>{try{return t.matches(e)}catch(t){return!1}})}let eB=["transform","translate","scale","rotate","perspective"],eN=["transform","translate","scale","rotate","perspective","filter"],eV=["paint","layout","strict","content"];function eq(t){let e=eH(),i=eI(t)?eK(t):t;return eB.some(t=>!!i[t]&&"none"!==i[t])||!!i.containerType&&"normal"!==i.containerType||!e&&!!i.backdropFilter&&"none"!==i.backdropFilter||!e&&!!i.filter&&"none"!==i.filter||eN.some(t=>(i.willChange||"").includes(t))||eV.some(t=>(i.contain||"").includes(t))}function eH(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}let ej=new Set(["html","body","#document"]);function eW(t){return ej.has(e_(t))}function eK(t){return eL(t).getComputedStyle(t)}function eY(t){return eI(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function eZ(t){if("html"===e_(t))return t;let e=t.assignedSlot||t.parentNode||eF(t)&&t.host||ez(t);return eF(e)?e.host:e}function eX(t,e,i){var o;void 0===e&&(e=[]),void 0===i&&(i=!0);let s=function t(e){let i=eZ(e);return eW(i)?e.ownerDocument?e.ownerDocument.body:e.body:eT(i)&&eR(i)?i:t(i)}(t),r=s===(null==(o=t.ownerDocument)?void 0:o.body),n=eL(s);if(r){let t=eG(n);return e.concat(n,n.visualViewport||[],eR(s)?s:[],t&&i?eX(t):[])}return e.concat(s,eX(s,[],i))}function eG(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}function eJ(t){let e=eK(t),i=parseFloat(e.width)||0,o=parseFloat(e.height)||0,s=eT(t),r=s?t.offsetWidth:i,n=s?t.offsetHeight:o,a=ei(i)!==r||ei(o)!==n;return a&&(i=r,o=n),{width:i,height:o,$:a}}function eQ(t){return eI(t)?t:t.contextElement}function e0(t){let e=eQ(t);if(!eT(e))return es(1);let i=e.getBoundingClientRect(),{width:o,height:s,$:r}=eJ(e),n=(r?ei(i.width):i.width)/o,a=(r?ei(i.height):i.height)/s;return n&&Number.isFinite(n)||(n=1),a&&Number.isFinite(a)||(a=1),{x:n,y:a}}let e1=es(0);function e2(t){let e=eL(t);return eH()&&e.visualViewport?{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}:e1}function e4(t,e,i,o){var s;void 0===e&&(e=!1),void 0===i&&(i=!1);let r=t.getBoundingClientRect(),n=eQ(t),a=es(1);e&&(o?eI(o)&&(a=e0(o)):a=e0(t));let l=(void 0===(s=i)&&(s=!1),o&&(!s||o===eL(n))&&s)?e2(n):es(0),h=(r.left+l.x)/a.x,c=(r.top+l.y)/a.y,d=r.width/a.x,p=r.height/a.y;if(n){let t=eL(n),e=o&&eI(o)?eL(o):o,i=t,s=eG(i);for(;s&&o&&e!==i;){let t=e0(s),e=s.getBoundingClientRect(),o=eK(s),r=e.left+(s.clientLeft+parseFloat(o.paddingLeft))*t.x,n=e.top+(s.clientTop+parseFloat(o.paddingTop))*t.y;h*=t.x,c*=t.y,d*=t.x,p*=t.y,h+=r,c+=n,s=eG(i=eL(s))}}return ex({width:d,height:p,x:h,y:c})}function e5(t,e){let i=eY(t).scrollLeft;return e?e.left+i:e4(ez(t)).left+i}function e3(t,e){let i=t.getBoundingClientRect();return{x:i.left+e.scrollLeft-e5(t,i),y:i.top+e.scrollTop}}let e8=new Set(["absolute","fixed"]);function e6(t,e,i){var o;let s;if("viewport"===e)s=function(t,e){let i=eL(t),o=ez(t),s=i.visualViewport,r=o.clientWidth,n=o.clientHeight,a=0,l=0;if(s){r=s.width,n=s.height;let t=eH();(!t||t&&"fixed"===e)&&(a=s.offsetLeft,l=s.offsetTop)}let h=e5(o);if(h<=0){let t=o.ownerDocument,e=t.body,i=getComputedStyle(e),s="CSS1Compat"===t.compatMode&&parseFloat(i.marginLeft)+parseFloat(i.marginRight)||0,n=Math.abs(o.clientWidth-e.clientWidth-s);n<=25&&(r-=n)}else h<=25&&(r+=h);return{width:r,height:n,x:a,y:l}}(t,i);else if("document"===e){let e,i,r,n,a,l,h;o=ez(t),e=ez(o),i=eY(o),r=o.ownerDocument.body,n=ee(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),a=ee(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight),l=-i.scrollLeft+e5(o),h=-i.scrollTop,"rtl"===eK(r).direction&&(l+=ee(e.clientWidth,r.clientWidth)-n),s={width:n,height:a,x:l,y:h}}else if(eI(e)){let t,o,r,n,a,l;o=(t=e4(e,!0,"fixed"===i)).top+e.clientTop,r=t.left+e.clientLeft,n=eT(e)?e0(e):es(1),a=e.clientWidth*n.x,l=e.clientHeight*n.y,s={width:a,height:l,x:r*n.x,y:o*n.y}}else{let i=e2(t);s={x:e.x-i.x,y:e.y-i.y,width:e.width,height:e.height}}return ex(s)}function e7(t){return"static"===eK(t).position}function e9(t,e){if(!eT(t)||"fixed"===eK(t).position)return null;if(e)return e(t);let i=t.offsetParent;return ez(t)===i&&(i=i.ownerDocument.body),i}function it(t,e){var i;let o=eL(t);if(eD(t))return o;if(!eT(t)){let e=eZ(t);for(;e&&!eW(e);){if(eI(e)&&!e7(e))return e;e=eZ(e)}return o}let s=e9(t,e);for(;s&&(i=s,eM.has(e_(i)))&&e7(s);)s=e9(s,e);return s&&eW(s)&&e7(s)&&!eq(s)?o:s||function(t){let e=eZ(t);for(;eT(e)&&!eW(e);){if(eq(e))return e;if(eD(e))break;e=eZ(e)}return null}(t)||o}let ie=async function(t){let e=this.getOffsetParent||it,i=this.getDimensions,o=await i(t.floating);return{reference:function(t,e,i){let o=eT(e),s=ez(e),r="fixed"===i,n=e4(t,!0,r,e),a={scrollLeft:0,scrollTop:0},l=es(0);if(o||!o&&!r)if(("body"!==e_(e)||eR(s))&&(a=eY(e)),o){let t=e4(e,!0,r,e);l.x=t.x+e.clientLeft,l.y=t.y+e.clientTop}else s&&(l.x=e5(s));r&&!o&&s&&(l.x=e5(s));let h=!s||o||r?es(0):e3(s,a);return{x:n.left+a.scrollLeft-l.x-h.x,y:n.top+a.scrollTop-l.y-h.y,width:n.width,height:n.height}}(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:o.width,height:o.height}}},ii={convertOffsetParentRelativeRectToViewportRelativeRect:function(t){let{elements:e,rect:i,offsetParent:o,strategy:s}=t,r="fixed"===s,n=ez(o),a=!!e&&eD(e.floating);if(o===n||a&&r)return i;let l={scrollLeft:0,scrollTop:0},h=es(1),c=es(0),d=eT(o);if((d||!d&&!r)&&(("body"!==e_(o)||eR(n))&&(l=eY(o)),eT(o))){let t=e4(o);h=e0(o),c.x=t.x+o.clientLeft,c.y=t.y+o.clientTop}let p=!n||d||r?es(0):e3(n,l);return{width:i.width*h.x,height:i.height*h.y,x:i.x*h.x-l.scrollLeft*h.x+c.x+p.x,y:i.y*h.y-l.scrollTop*h.y+c.y+p.y}},getDocumentElement:ez,getClippingRect:function(t){let{element:e,boundary:i,rootBoundary:o,strategy:s}=t,r=[..."clippingAncestors"===i?eD(e)?[]:function(t,e){let i=e.get(t);if(i)return i;let o=eX(t,[],!1).filter(t=>eI(t)&&"body"!==e_(t)),s=null,r="fixed"===eK(t).position,n=r?eZ(t):t;for(;eI(n)&&!eW(n);){let e=eK(n),i=eq(n);i||"fixed"!==e.position||(s=null),(r?!i&&!s:!i&&"static"===e.position&&!!s&&e8.has(s.position)||eR(n)&&!i&&function t(e,i){let o=eZ(e);return!(o===i||!eI(o)||eW(o))&&("fixed"===eK(o).position||t(o,i))}(t,n))?o=o.filter(t=>t!==n):s=e,n=eZ(n)}return e.set(t,o),o}(e,this._c):[].concat(i),o],n=r[0],a=r.reduce((t,i)=>{let o=e6(e,i,s);return t.top=ee(o.top,t.top),t.right=et(o.right,t.right),t.bottom=et(o.bottom,t.bottom),t.left=ee(o.left,t.left),t},e6(e,n,s));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}},getOffsetParent:it,getElementRects:ie,getClientRects:function(t){return Array.from(t.getClientRects())},getDimensions:function(t){let{width:e,height:i}=eJ(t);return{width:e,height:i}},getScale:e0,isElement:eI,isRTL:function(t){return"rtl"===eK(t).direction}};function io(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}let is=function(t){return void 0===t&&(t={}),{name:"size",options:t,async fn(e){var i,o;let s,r,{placement:n,rects:a,platform:l,elements:h}=e,{apply:c=()=>{},...d}=ea(t,e),p=await eA(e,d),u=el(n),m=eh(n),f="y"===eu(n),{width:g,height:y}=a.floating;"top"===u||"bottom"===u?(s=u,r=m===(await (null==l.isRTL?void 0:l.isRTL(h.floating))?"start":"end")?"left":"right"):(r=u,s="end"===m?"top":"bottom");let w=y-p.top-p.bottom,b=g-p.left-p.right,v=et(y-p[s],w),x=et(g-p[r],b),C=!e.middlewareData.shift,$=v,A=x;if(null!=(i=e.middlewareData.shift)&&i.enabled.x&&(A=b),null!=(o=e.middlewareData.shift)&&o.enabled.y&&($=w),C&&!m){let t=ee(p.left,0),e=ee(p.right,0),i=ee(p.top,0),o=ee(p.bottom,0);f?A=g-2*(0!==t||0!==e?t+e:ee(p.left,p.right)):$=y-2*(0!==i||0!==o?i+o:ee(p.top,p.bottom))}await c({...e,availableWidth:A,availableHeight:$});let k=await l.getDimensions(h.floating);return g!==k.width||y!==k.height?{reset:{rects:!0}}:{}}}};function ir(t){var e=t;for(let t=e;t;t=ia(t))if(t instanceof Element&&"none"===getComputedStyle(t).display)return null;for(let t=ia(e);t;t=ia(t)){if(!(t instanceof Element))continue;let e=getComputedStyle(t);if("contents"!==e.display&&("static"!==e.position||eq(e)||"BODY"===t.tagName))return t}return null}function ia(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function il(t){return null!==t&&"object"==typeof t&&"getBoundingClientRect"in t&&(!("contextElement"in t)||t instanceof Element)}var ih=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),ic=class extends tU{constructor(){super(...arguments),this.localize=new t1(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),i=this.placement.includes("top")||this.placement.includes("bottom"),o=0,s=0,r=0,n=0,a=0,l=0,h=0,c=0;i?t.top<e.top?(o=t.left,s=t.bottom,r=t.right,n=t.bottom,a=e.left,l=e.top,h=e.right,c=e.top):(o=e.left,s=e.bottom,r=e.right,n=e.bottom,a=t.left,l=t.top,h=t.right,c=t.top):t.left<e.left?(o=t.right,s=t.top,r=e.left,n=e.top,a=t.right,l=t.bottom,h=e.left,c=e.bottom):(o=e.right,s=e.top,r=t.left,n=t.top,a=e.right,l=e.bottom,h=t.left,c=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${o}px`),this.style.setProperty("--hover-bridge-top-left-y",`${s}px`),this.style.setProperty("--hover-bridge-top-right-x",`${r}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${a}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${h}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${c}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&"string"==typeof this.anchor){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||il(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&this.active&&(this.popup.showPopover?.(),this.cleanup=function(t,e,i,o){let s;void 0===o&&(o={});let{ancestorScroll:r=!0,ancestorResize:n=!0,elementResize:a="function"==typeof ResizeObserver,layoutShift:l="function"==typeof IntersectionObserver,animationFrame:h=!1}=o,c=eQ(t),d=r||n?[...c?eX(c):[],...eX(e)]:[];d.forEach(t=>{r&&t.addEventListener("scroll",i,{passive:!0}),n&&t.addEventListener("resize",i)});let p=c&&l?function(t,e){let i,o=null,s=ez(t);function r(){var t;clearTimeout(i),null==(t=o)||t.disconnect(),o=null}return!function n(a,l){void 0===a&&(a=!1),void 0===l&&(l=1),r();let h=t.getBoundingClientRect(),{left:c,top:d,width:p,height:u}=h;if(a||e(),!p||!u)return;let m={rootMargin:-eo(d)+"px "+-eo(s.clientWidth-(c+p))+"px "+-eo(s.clientHeight-(d+u))+"px "+-eo(c)+"px",threshold:ee(0,et(1,l))||1},f=!0;function g(e){let o=e[0].intersectionRatio;if(o!==l){if(!f)return n();o?n(!1,o):i=setTimeout(()=>{n(!1,1e-7)},1e3)}1!==o||io(h,t.getBoundingClientRect())||n(),f=!1}try{o=new IntersectionObserver(g,{...m,root:s.ownerDocument})}catch(t){o=new IntersectionObserver(g,m)}o.observe(t)}(!0),r}(c,i):null,u=-1,m=null;a&&(m=new ResizeObserver(t=>{let[o]=t;o&&o.target===c&&m&&(m.unobserve(e),cancelAnimationFrame(u),u=requestAnimationFrame(()=>{var t;null==(t=m)||t.observe(e)})),i()}),c&&!h&&m.observe(c),m.observe(e));let f=h?e4(t):null;return h&&function e(){let o=e4(t);f&&!io(f,o)&&i(),f=o,s=requestAnimationFrame(e)}(),i(),()=>{var t;d.forEach(t=>{r&&t.removeEventListener("scroll",i),n&&t.removeEventListener("resize",i)}),null==p||p(),null==(t=m)||t.disconnect(),m=null,h&&cancelAnimationFrame(s)}}(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){var t,e,i,o,s,r;let n,a,l,h,c;if(!this.active||!this.anchorEl)return;let d=[{name:"offset",options:t={mainAxis:this.distance,crossAxis:this.skidding},async fn(e){var i,o;let{x:s,y:r,placement:n,middlewareData:a}=e,l=await eE(e,t);return n===(null==(i=a.offset)?void 0:i.placement)&&null!=(o=a.arrow)&&o.alignmentOffset?{}:{x:s+l.x,y:r+l.y,data:{...l,placement:n}}}}];this.sync?d.push(is({apply:({rects:t})=>{let e="width"===this.sync||"both"===this.sync,i="height"===this.sync||"both"===this.sync;this.popup.style.width=e?`${t.reference.width}px`:"",this.popup.style.height=i?`${t.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),ih&&!il(this.anchor)&&"scroll"===this.boundary&&(n=eX(this.anchorEl).filter(t=>t instanceof Element)),this.flip&&d.push({name:"flip",options:e={boundary:this.flipBoundary||n,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:"best-fit"===this.flipFallbackStrategy?"bestFit":"initialPlacement",padding:this.flipPadding},async fn(t){var i,o,s,r,n,a,l,h;let c,d,p,{placement:u,middlewareData:m,rects:f,initialPlacement:g,platform:y,elements:w}=t,{mainAxis:b=!0,crossAxis:v=!0,fallbackPlacements:x,fallbackStrategy:C="bestFit",fallbackAxisSideDirection:$="none",flipAlignment:A=!0,...k}=ea(e,t);if(null!=(i=m.arrow)&&i.alignmentOffset)return{};let E=el(u),S=eu(g),_=el(g)===g,L=await (null==y.isRTL?void 0:y.isRTL(w.floating)),z=x||(_||!A?[eb(g)]:(c=eb(g),[em(g),c,em(c)])),P="none"!==$;!x&&P&&z.push(...(d=eh(g),p=function(t,e,i){switch(t){case"top":case"bottom":if(i)return e?eg:ef;return e?ef:eg;case"left":case"right":return e?ey:ew;default:return[]}}(el(g),"start"===$,L),d&&(p=p.map(t=>t+"-"+d),A&&(p=p.concat(p.map(em)))),p));let I=[g,...z],T=await eA(t,k),F=[],O=(null==(o=m.flip)?void 0:o.overflows)||[];if(b&&F.push(T[E]),v){let t,e,i,o,s=(a=u,l=f,void 0===(h=L)&&(h=!1),t=eh(a),i=ed(e=ec(eu(a))),o="x"===e?t===(h?"end":"start")?"right":"left":"start"===t?"bottom":"top",l.reference[i]>l.floating[i]&&(o=eb(o)),[o,eb(o)]);F.push(T[s[0]],T[s[1]])}if(O=[...O,{placement:u,overflows:F}],!F.every(t=>t<=0)){let t=((null==(s=m.flip)?void 0:s.index)||0)+1,e=I[t];if(e&&("alignment"!==v||S===eu(e)||O.every(t=>eu(t.placement)!==S||t.overflows[0]>0)))return{data:{index:t,overflows:O},reset:{placement:e}};let i=null==(r=O.filter(t=>t.overflows[0]<=0).sort((t,e)=>t.overflows[1]-e.overflows[1])[0])?void 0:r.placement;if(!i)switch(C){case"bestFit":{let t=null==(n=O.filter(t=>{if(P){let e=eu(t.placement);return e===S||"y"===e}return!0}).map(t=>[t.placement,t.overflows.filter(t=>t>0).reduce((t,e)=>t+e,0)]).sort((t,e)=>t[1]-e[1])[0])?void 0:n[0];t&&(i=t);break}case"initialPlacement":i=g}if(u!==i)return{reset:{placement:i}}}return{}}}),this.shift&&d.push({name:"shift",options:i={boundary:this.shiftBoundary||n,padding:this.shiftPadding},async fn(t){let{x:e,y:o,placement:s}=t,{mainAxis:r=!0,crossAxis:n=!1,limiter:a={fn:t=>{let{x:e,y:i}=t;return{x:e,y:i}}},...l}=ea(i,t),h={x:e,y:o},c=await eA(t,l),d=eu(el(s)),p=ec(d),u=h[p],m=h[d];if(r){let t="y"===p?"top":"left",e="y"===p?"bottom":"right",i=u+c[t],o=u-c[e];u=ee(i,et(u,o))}if(n){let t="y"===d?"top":"left",e="y"===d?"bottom":"right",i=m+c[t],o=m-c[e];m=ee(i,et(m,o))}let f=a.fn({...t,[p]:u,[d]:m});return{...f,data:{x:f.x-e,y:f.y-o,enabled:{[p]:r,[d]:n}}}}}),this.autoSize?d.push(is({boundary:this.autoSizeBoundary||n,padding:this.autoSizePadding,apply:({availableWidth:t,availableHeight:e})=>{"vertical"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-height",`${e}px`):this.style.removeProperty("--auto-size-available-height"),"horizontal"===this.autoSize||"both"===this.autoSize?this.style.setProperty("--auto-size-available-width",`${t}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&d.push({name:"arrow",options:a={element:this.arrowEl,padding:this.arrowPadding},async fn(t){let{x:e,y:i,placement:o,rects:s,platform:r,elements:n,middlewareData:l}=t,{element:h,padding:c=0}=ea(a,t)||{};if(null==h)return{};let d=ev(c),p={x:e,y:i},u=ec(eu(o)),m=ed(u),f=await r.getDimensions(h),g="y"===u,y=g?"clientHeight":"clientWidth",w=s.reference[m]+s.reference[u]-p[u]-s.floating[m],b=p[u]-s.reference[u],v=await (null==r.getOffsetParent?void 0:r.getOffsetParent(h)),x=v?v[y]:0;x&&await (null==r.isElement?void 0:r.isElement(v))||(x=n.floating[y]||s.floating[m]);let C=x/2-f[m]/2-1,$=et(d[g?"top":"left"],C),A=et(d[g?"bottom":"right"],C),k=x-f[m]-A,E=x/2-f[m]/2+(w/2-b/2),S=ee($,et(E,k)),_=!l.arrow&&null!=eh(o)&&E!==S&&s.reference[m]/2-(E<$?$:A)-f[m]/2<0,L=_?E<$?E-$:E-k:0;return{[u]:p[u]+L,data:{[u]:S,centerOffset:E-S-L,..._&&{alignmentOffset:L}},reset:_}}});let p=ih?t=>ii.getOffsetParent(t,ir):ii.getOffsetParent;(o=this.anchorEl,s=this.popup,r={placement:this.placement,middleware:d,strategy:ih?"absolute":"fixed",platform:{...ii,getOffsetParent:p}},l=new Map,c={...(h={platform:ii,...r}).platform,_c:l},e$(o,s,{...h,platform:c})).then(({x:t,y:e,middlewareData:i,placement:o})=>{let s="rtl"===this.localize.dir(),r={top:"bottom",right:"left",bottom:"top",left:"right"}[o.split("-")[0]];if(this.setAttribute("data-current-placement",o),Object.assign(this.popup.style,{left:`${t}px`,top:`${e}px`}),this.arrow){let t=i.arrow.x,e=i.arrow.y,o="",n="",a="",l="";if("start"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";o="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",n=s?i:"",l=s?"":i}else if("end"===this.arrowPlacement){let i="number"==typeof t?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";n=s?"":i,l=s?i:"",a="number"==typeof e?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else"center"===this.arrowPlacement?(l="number"==typeof t?"calc(50% - var(--arrow-size-diagonal))":"",o="number"==typeof e?"calc(50% - var(--arrow-size-diagonal))":""):(l="number"==typeof t?`${t}px`:"",o="number"==typeof e?`${e}px`:"");Object.assign(this.arrowEl.style,{top:o,right:n,bottom:a,left:l,[r]:"calc(var(--arrow-size-diagonal) * -1)"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new t7)}render(){return H`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${t5({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${t5({popup:!0,"popup-active":this.active,"popup-fixed":!ih,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?H`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};ic.css=t9,tL([tR(".popup")],ic.prototype,"popup",2),tL([tR(".arrow")],ic.prototype,"arrowEl",2),tL([tT()],ic.prototype,"anchor",2),tL([tT({type:Boolean,reflect:!0})],ic.prototype,"active",2),tL([tT({reflect:!0})],ic.prototype,"placement",2),tL([tT()],ic.prototype,"boundary",2),tL([tT({type:Number})],ic.prototype,"distance",2),tL([tT({type:Number})],ic.prototype,"skidding",2),tL([tT({type:Boolean})],ic.prototype,"arrow",2),tL([tT({attribute:"arrow-placement"})],ic.prototype,"arrowPlacement",2),tL([tT({attribute:"arrow-padding",type:Number})],ic.prototype,"arrowPadding",2),tL([tT({type:Boolean})],ic.prototype,"flip",2),tL([tT({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(t=>t.trim()).filter(t=>""!==t),toAttribute:t=>t.join(" ")}})],ic.prototype,"flipFallbackPlacements",2),tL([tT({attribute:"flip-fallback-strategy"})],ic.prototype,"flipFallbackStrategy",2),tL([tT({type:Object})],ic.prototype,"flipBoundary",2),tL([tT({attribute:"flip-padding",type:Number})],ic.prototype,"flipPadding",2),tL([tT({type:Boolean})],ic.prototype,"shift",2),tL([tT({type:Object})],ic.prototype,"shiftBoundary",2),tL([tT({attribute:"shift-padding",type:Number})],ic.prototype,"shiftPadding",2),tL([tT({attribute:"auto-size"})],ic.prototype,"autoSize",2),tL([tT()],ic.prototype,"sync",2),tL([tT({type:Object})],ic.prototype,"autoSizeBoundary",2),tL([tT({attribute:"auto-size-padding",type:Number})],ic.prototype,"autoSizePadding",2),tL([tT({attribute:"hover-bridge",type:Boolean})],ic.prototype,"hoverBridge",2),ic=tL([tP("wa-popup")],ic);var id=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},ip=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},iu=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}},im=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};function ig(t,e){return new Promise(i=>{t.addEventListener(e,function o(s){s.target===t&&(t.removeEventListener(e,o),i())})})}var iy=class extends tU{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=t=>{"Escape"===t.key&&(t.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.hide(),this.hideDelay))}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=function(t=""){return`${t}${((t=21)=>{let e="",i=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&i[t]];return e})()}`}("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(t){return this.trigger.split(" ").includes(t)}addToAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);i.includes(e)||(i.push(e),t.setAttribute("aria-labelledby",i.join(" ")))}removeFromAriaLabelledBy(t,e){let i=(t.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(t=>t!==e);i.length>0?t.setAttribute("aria-labelledby",i.join(" ")):t.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let t=new im;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),this.body.hidden=!1,this.popup.active=!0,await tf(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new ip)}else{let t=new iu;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),await tf(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new id)}}handleForChange(){let t=this.getRootNode();if(!t)return;let e=this.for?t.getElementById(this.for):null,i=this.anchor;if(e===i)return;let{signal:o}=this.eventController;e&&(this.addToAriaLabelledBy(e,this.id),e.addEventListener("blur",this.handleBlur,{capture:!0,signal:o}),e.addEventListener("focus",this.handleFocus,{capture:!0,signal:o}),e.addEventListener("click",this.handleClick,{signal:o}),e.addEventListener("mouseover",this.handleMouseOver,{signal:o}),e.addEventListener("mouseout",this.handleMouseOut,{signal:o})),i&&(this.removeFromAriaLabelledBy(i,this.id),i.removeEventListener("blur",this.handleBlur,{capture:!0}),i.removeEventListener("focus",this.handleFocus,{capture:!0}),i.removeEventListener("click",this.handleClick),i.removeEventListener("mouseover",this.handleMouseOver),i.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=e}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,ig(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,ig(this,"wa-after-hide")}render(){return H`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${t5({tooltip:!0,"tooltip-open":this.open})}
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
    `}};iy.css=t6,iy.dependencies={"wa-popup":ic},tL([tR("slot:not([name])")],iy.prototype,"defaultSlot",2),tL([tR(".body")],iy.prototype,"body",2),tL([tR("wa-popup")],iy.prototype,"popup",2),tL([tT()],iy.prototype,"placement",2),tL([tT({type:Boolean,reflect:!0})],iy.prototype,"disabled",2),tL([tT({type:Number})],iy.prototype,"distance",2),tL([tT({type:Boolean,reflect:!0})],iy.prototype,"open",2),tL([tT({type:Number})],iy.prototype,"skidding",2),tL([tT({attribute:"show-delay",type:Number})],iy.prototype,"showDelay",2),tL([tT({attribute:"hide-delay",type:Number})],iy.prototype,"hideDelay",2),tL([tT()],iy.prototype,"trigger",2),tL([tT({attribute:"without-arrow",type:Boolean,reflect:!0})],iy.prototype,"withoutArrow",2),tL([tT()],iy.prototype,"for",2),tL([tF()],iy.prototype,"anchor",2),tL([tk("open",{waitUntilFirstUpdate:!0})],iy.prototype,"handleOpenChange",1),tL([tk("for")],iy.prototype,"handleForChange",1),tL([tk(["distance","placement","skidding"])],iy.prototype,"handleOptionsChange",1),tL([tk("disabled")],iy.prototype,"handleDisabledChange",1),iy=tL([tP("wa-tooltip")],iy);let iw=[["path",{d:"m9 18 6-6-6-6"}]],ib={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},iv=([t,e,i])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(t=>{o.setAttribute(t,String(e[t]))}),i?.length&&i.forEach(t=>{let e=iv(t);o.appendChild(e)}),o},ix=t=>"string"==typeof t?t:t&&t.class?t.class&&"string"==typeof t.class?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"":"",iC=(t,{nameAttr:e,icons:i,attrs:o})=>{let s=t.getAttribute(e);if(null==s)return;let r=i[s.replace(/(\w)(\w*)(_|-|\s*)/g,(t,e,i)=>e.toUpperCase()+i.toLowerCase())];if(!r)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let n=Array.from(t.attributes).reduce((t,e)=>(t[e.name]=e.value,t),{}),a={...ib,"data-lucide":s,...o,...n},l=["lucide",`lucide-${s}`,n,o].flatMap(ix).map(t=>t.trim()).filter(Boolean).filter((t,e,i)=>i.indexOf(t)===e).join(" ");l&&Object.assign(a,{class:l});let h=((t,e={})=>iv(["svg",{...ib,...e},t]))(r,a);return t.parentNode?.replaceChild(h,t)},i$=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]],iA=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]],ik=({icons:t={},nameAttr:e="data-lucide",attrs:i={},root:o=document,inTemplates:s}={})=>{if(!Object.values(t).length)throw Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if(void 0===o)throw Error("`createIcons()` only works in a browser environment.");if(Array.from(o.querySelectorAll(`[${e}]`)).forEach(o=>iC(o,{nameAttr:e,icons:t,attrs:i})),s&&Array.from(o.querySelectorAll("template")).forEach(o=>ik({icons:t,nameAttr:e,attrs:i,root:o.content,inTemplates:s})),"data-lucide"===e){let e=o.querySelectorAll("[icon-name]");e.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(e).forEach(e=>iC(e,{nameAttr:"icon-name",icons:t,attrs:i})))}},iE="data-icon";function iS([t,e]){let i=document.createElement("span");return i.setAttribute(iE,e),i.setAttribute("slot",t),i}function i_(){ik({icons:{ChevronRight:iw,Link:i$,Unlink:iA},nameAttr:iE})}let iL={"copy-icon":"link","success-icon":"link","error-icon":"unlink"};class iz extends t8{static styles=[n`
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
    `,super.styles];constructor(){super()}connectedCallback(){super.connectedCallback(),this.copyLabel="Copy link",this.successLabel="Copied",this.errorLabel="Can't copy link",this.closest("h1, h2, h3, h4, h5, h6")&&Object.entries(iL).forEach(t=>{this.appendChild(iS(t))}),i_()}async handleCopy(){let t=this.from,e=new URL(window.location.href),i=document.createElement("span"),o=t.replace(/\./g,"_").replace(/\[/g,"_");e.hash=t,i.id=`FAKE_TARGET_${o}`,i.textContent=e.href,i.style.display="none",this.appendChild(i),this.from=i.id,await super.handleCopy(),this.from=t,this.removeChild(i)}}customElements.define("copy-url",iz);let iP=["copy-url","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let t=iP.filter(t=>document.querySelector(t));for(let e of(await Promise.allSettled(t.map(t=>customElements.whenDefined(t))),t))for(let t of document.querySelectorAll(e))t.classList.add("ready")})();var iI={},iT="undefined"!=typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(t){setTimeout(t,16)};iI=function(t){var e="startValue"in t?t.startValue:0,i="endValue"in t?t.endValue:1,o="durationMs"in t?t.durationMs:200,s=t.onComplete||function(){},r=o/16,n=(i-e)/r,a=Math.PI/r,l=e,h=0;iT(function e(){h+=a,l+=n*Math.pow(Math.sin(h),2)*2,h<Math.PI?(t.onStep(l),iT(e)):(t.onStep(i),s())})},(()=>{let t="PageUp",e="--navbar-scroll-margin";function i(t,i){var o;let s,r=getComputedStyle(document.body);return t&&(s=getComputedStyle(t).getPropertyValue(e)),s||(s=r.getPropertyValue(e)),i-(s=5*Math.ceil((s=(o=Number(s.replace("rem","")))*parseFloat(r.fontSize))/5))}function o(t){var e;((e=iI)&&e.__esModule?e.default:e)({durationMs:200,startValue:window.scrollY,endValue:t,onStep:t=>window.scroll({behavior:"instant",top:t})})}function s(t,e,s){let r;e&&(r=document.getElementById(e))&&(t.preventDefault(),o(i(r,r.offsetTop)),window.history.pushState(null,null,s))}function r(t){return t.substring(1)}window.addEventListener("load",t=>{s(t,r(document.location.hash),document.location.href)}),window.addEventListener("hashchange",t=>{let e=new URL(t.newURL);s(t,r(e.hash),e.hash)}),document.addEventListener("keydown",e=>{let s,r=e.code;("Space"===r||"PageDown"===r||r===t)&&(e.preventDefault(),e.stopImmediatePropagation(),s=i(null,window.innerHeight),r===t?o(window.scrollY-s):o(window.scrollY+s))})})();var iF=n`
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
`,iO=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},iR=class extends tU{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new iO))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let i of e.observedAttributes)t.add(i);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){let t=this.value;if(Array.isArray(t)){if(this.name){let e=new FormData;for(let i of t)e.append(this.name,i);this.setValue(e,e)}}else this.setValue(t,t)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],i=t[1],o=t[2];o||(o=this.validationTarget),this.internals.setValidity(e,i,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&i),this.customStates.set("user-valid",e&&i)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,"restore"===e&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,i]=t;this.internals.setFormValue(e,i)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},i=this.validationTarget||this.input||void 0,o="";for(let i of t){let{isValid:t,message:s,invalidKeys:r}=i.checkValidity(this);!t&&(o||(o=s),r?.length>=0&&r.forEach(t=>e[t]=!0))}o||(o=this.validationMessage),this.setValidity(e,o,i)}};iR.formAssociated=!0,tL([tT({reflect:!0})],iR.prototype,"name",2),tL([tT({type:Boolean})],iR.prototype,"disabled",2),tL([tT({state:!0,attribute:!1})],iR.prototype,"valueHasChanged",2),tL([tT({state:!0,attribute:!1})],iR.prototype,"hasInteracted",2),tL([tT({attribute:"custom-error",reflect:!0})],iR.prototype,"customError",2),tL([tT({attribute:!1,state:!0,type:Object})],iR.prototype,"validity",1);var iM=class extends tU{constructor(){super(...arguments),this.localize=new t1(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)"attributes"===e.type&&"open"===e.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){!t.composedPath().some(t=>t instanceof HTMLElement&&(!!["a","button","input","textarea","select"].includes(t.tagName?.toLowerCase())||t instanceof iR&&(!("disabled"in t)||!t.disabled)))&&(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){("Enter"===t.key||" "===t.key)&&(t.preventDefault(),this.open?this.hide():this.show()),("ArrowUp"===t.key||"ArrowLeft"===t.key)&&(t.preventDefault(),this.hide()),("ArrowDown"===t.key||"ArrowRight"===t.key)&&(t.preventDefault(),this.show())}closeOthersWithSameName(){this.name&&this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(t=>{t!==this&&t.open&&(t.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let t=new im;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let e=tg(getComputedStyle(this.body).getPropertyValue("--show-duration"));await tm(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new ip)}else{let t=new iu;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let e=tg(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await tm(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new id)}}async show(){if(!this.open&&!this.disabled)return this.open=!0,ig(this,"wa-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,ig(this,"wa-after-hide")}render(){let t=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir;return H`
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
          class=${t5({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};iM.css=iF,tL([tR("details")],iM.prototype,"details",2),tL([tR("summary")],iM.prototype,"header",2),tL([tR(".body")],iM.prototype,"body",2),tL([tR(".expand-icon-slot")],iM.prototype,"expandIconSlot",2),tL([tF()],iM.prototype,"isAnimating",2),tL([tT({type:Boolean,reflect:!0})],iM.prototype,"open",2),tL([tT()],iM.prototype,"summary",2),tL([tT({reflect:!0})],iM.prototype,"name",2),tL([tT({type:Boolean,reflect:!0})],iM.prototype,"disabled",2),tL([tT({reflect:!0})],iM.prototype,"appearance",2),tL([tT({attribute:"icon-placement",reflect:!0})],iM.prototype,"iconPlacement",2),tL([tk("open",{waitUntilFirstUpdate:!0})],iM.prototype,"handleOpenChange",1),iM=tL([tP("wa-details")],iM);var iU=n`
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
`,iD=n`
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
`;let iB=t2(class extends t4{constructor(t){if(super(t),3!==t.type&&1!==t.type&&4!==t.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==t.strings)throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===j||e===W)return e;let i=t.element,o=t.name;if(3===t.type){if(e===i[o])return j}else if(4===t.type){if(!!e===i.hasAttribute(o))return j}else if(1===t.type&&i.getAttribute(o)===e+"")return j;return((t,e=tB)=>t._$AH=e)(t),e}});var iN=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},iV=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}},iq=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},iH=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}},ij=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}},iW=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}},iK=class extends tU{constructor(){super(...arguments),this.localize=new t1(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&"treeitem"===t.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new iq);let t=tg(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await tm(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new iN)}isNestedItem(){let t=this.parentElement;return!!t&&iK.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new iH),this.childrenContainer.hidden=!1;let t=tg(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await tm(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new iV)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new iW)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new ij)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>iK.isTreeItem(e)&&(t||!e.disabled)):[]}render(){var t,e,i,o,s;let r=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir,n=!this.loading&&(!this.isLeaf||this.lazy);return H`
      <div
        part="base"
        class="${t5({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":n})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${t5({"expand-button":!0,"expand-button-visible":n})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${t=this.loading,e=()=>H` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,i=()=>H`
                  <wa-icon name=${r?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `,t?e(t):i?.(t)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${r?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${o=this.selectable,s=()=>H`
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
                ?checked="${iB(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `,o?s(o):void 0}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};iK.css=iD,tL([tF()],iK.prototype,"indeterminate",2),tL([tF()],iK.prototype,"isLeaf",2),tL([tF()],iK.prototype,"loading",2),tL([tF()],iK.prototype,"selectable",2),tL([tT({type:Boolean,reflect:!0})],iK.prototype,"expanded",2),tL([tT({type:Boolean,reflect:!0})],iK.prototype,"selected",2),tL([tT({type:Boolean,reflect:!0})],iK.prototype,"disabled",2),tL([tT({type:Boolean,reflect:!0})],iK.prototype,"lazy",2),tL([tR("slot:not([name])")],iK.prototype,"defaultSlot",2),tL([tR("slot[name=children]")],iK.prototype,"childrenSlot",2),tL([tR(".item")],iK.prototype,"itemElement",2),tL([tR(".children")],iK.prototype,"childrenContainer",2),tL([tR(".expand-button slot")],iK.prototype,"expandButtonSlot",2),tL([tk("loading",{waitUntilFirstUpdate:!0})],iK.prototype,"handleLoadingChange",1),tL([tk("disabled")],iK.prototype,"handleDisabledChange",1),tL([tk("expanded")],iK.prototype,"handleExpandedState",1),tL([tk("indeterminate")],iK.prototype,"handleIndeterminateStateChange",1),tL([tk("selected")],iK.prototype,"handleSelectedChange",1),tL([tk("expanded",{waitUntilFirstUpdate:!0})],iK.prototype,"handleExpandedChange",1),tL([tk("expanded",{waitUntilFirstUpdate:!0})],iK.prototype,"handleExpandAnimation",1),tL([tk("lazy",{waitUntilFirstUpdate:!0})],iK.prototype,"handleLazyChange",1),iK=tL([tP("wa-tree-item")],iK);var iY=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};function iZ(t,e=!1){function i(t){let e=t.getChildrenItems({includeDisabled:!1});if(e.length){let i=e.every(t=>t.selected),o=e.every(t=>!t.selected&&!t.indeterminate);t.selected=i,t.indeterminate=!i&&!o}}!function t(o){for(let i of o.getChildrenItems())i.selected=e?o.selected||i.selected:!i.disabled&&o.selected,t(i);e&&i(o)}(t),function t(e){let o=e.parentElement;iK.isTreeItem(o)&&(i(o),t(o))}(t)}var iX=class extends tU{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new t1(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable="multiple"===this.selection,["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(e=>{let i=t.querySelector(`[slot="${e}-icon"]`),o=this.getExpandButtonIcon(e);o&&(null===i?t.append(o):i.hasAttribute("data-default")&&i.replaceWith(o))})})},this.handleTreeChanged=t=>{for(let e of t){let t=[...e.addedNodes].filter(iK.isTreeItem),i=[...e.removedNodes].filter(iK.isTreeItem);t.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;e&&this.contains(e)||(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),iK.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){let e=("expand"===t?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(e){let i=e.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(t=>t.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${t}-icon`,i}return null}selectItem(t){let e=[...this.selectedItems];if("multiple"===this.selection)t.selected=!t.selected,t.lazy&&(t.expanded=!0),iZ(t);else if("single"===this.selection||t.isLeaf)for(let e of this.getAllTreeItems())e.selected=e===t;else"leaf"===this.selection&&(t.expanded=!t.expanded);let i=this.selectedItems;(e.length!==i.length||i.some(t=>!e.includes(t)))&&Promise.all(i.map(t=>t.updateComplete)).then(()=>{this.dispatchEvent(new iY({selection:i}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(t=>["input","textarea"].includes(t?.tagName?.toLowerCase())))return;let e=this.getFocusableItems(),i=this.matches(":dir(ltr)"),o="rtl"===this.localize.dir();if(e.length>0){t.preventDefault();let s=e.findIndex(t=>t.matches(":focus")),r=e[s],n=t=>{var i;let o=e[i=e.length-1,(t=>Object.is(t,-0)?0:t)(t<0?0:t>i?i:t)];this.focusItem(o)},a=t=>{r.expanded=t};"ArrowDown"===t.key?n(s+1):"ArrowUp"===t.key?n(s-1):i&&"ArrowRight"===t.key||o&&"ArrowLeft"===t.key?!r||r.disabled||r.expanded||r.isLeaf&&!r.lazy?n(s+1):a(!0):i&&"ArrowLeft"===t.key||o&&"ArrowRight"===t.key?!r||r.disabled||r.isLeaf||!r.expanded?n(s-1):a(!1):"Home"===t.key?n(0):"End"===t.key?n(e.length-1):"Enter"!==t.key&&" "!==t.key||r.disabled||this.selectItem(r)}}handleClick(t){let e=t.target,i=e.closest("wa-tree-item"),o=t.composedPath().some(t=>t?.classList?.contains("expand-button"));i&&!i.disabled&&e===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t="multiple"===this.selection,e=this.getAllTreeItems();for(let i of(this.setAttribute("aria-multiselectable",t?"true":"false"),e))i.updateComplete.then(()=>{i.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(t=>{t.updateComplete.then(()=>{iZ(t,!0)})}))}get selectedItems(){return this.getAllTreeItems().filter(t=>t.selected)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(t=>{if(t.disabled)return!1;let i=t.parentElement?.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||e.has(i))&&e.add(t),!e.has(t)})}render(){return H`
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
    `}};iX.css=iU,tL([tR("slot:not([name])")],iX.prototype,"defaultSlot",2),tL([tR("slot[name=expand-icon]")],iX.prototype,"expandedIconSlot",2),tL([tR("slot[name=collapse-icon]")],iX.prototype,"collapsedIconSlot",2),tL([tT()],iX.prototype,"selection",2),tL([tk("selection")],iX.prototype,"handleSelectionChange",1),iX=tL([tP("wa-tree")],iX);var iG=n`
  :host {
    display: flex;
    flex-direction: column;
  }

  /* Label */
  :is([part~='form-control-label'], [part~='label']):has(*:not(:empty)) {
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
    line-height: var(--wa-form-control-label-line-height);

    &:not(.has-slotted) {
      display: none;
    }
  }
`,iJ=n`
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
`,iQ=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=t=>{let e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===Node.ELEMENT_NODE){if("wa-visually-hidden"===t.tagName.toLowerCase())return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},i0=n`
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
`,i1=class extends iR{constructor(){super(...arguments),this.hasSlotController=new iQ(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[((t={})=>{let{validationElement:e,validationProperty:i}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),i||(i="value");let o={observedAttributes:["required"],message:e.validationMessage,checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.required??t.hasAttribute("required")?(t[i]||(e.message="function"==typeof o.message?o.message(t):o.message||"",e.isValid=!1,e.invalidKeys.push("valueMissing")),e):e}};return o})({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){let t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){this.hasInteracted||this.checked===this.defaultChecked||(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&!this.hasInteracted&&(this.checked=this.defaultChecked),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=!!this.hint||!!t,i=!this.checked&&this.indeterminate;return H`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${this._value??W}
            .indeterminate=${iB(this.indeterminate)}
            .checked=${iB(this.checked)}
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
        class="${t5({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};i1.css=[iG,i0,iJ],i1.shadowRootOptions={...iR.shadowRootOptions,delegatesFocus:!0},tL([tR('input[type="checkbox"]')],i1.prototype,"input",2),tL([tT()],i1.prototype,"title",2),tL([tT({reflect:!0})],i1.prototype,"name",2),tL([tT({reflect:!0})],i1.prototype,"value",1),tL([tT({reflect:!0})],i1.prototype,"size",2),tL([tT({type:Boolean})],i1.prototype,"disabled",2),tL([tT({type:Boolean,reflect:!0})],i1.prototype,"indeterminate",2),tL([tT({type:Boolean,attribute:!1})],i1.prototype,"checked",2),tL([tT({type:Boolean,reflect:!0,attribute:"checked"})],i1.prototype,"defaultChecked",2),tL([tT({type:Boolean,reflect:!0})],i1.prototype,"required",2),tL([tT()],i1.prototype,"hint",2),tL([tk("defaultChecked")],i1.prototype,"handleDefaultCheckedChange",1),tL([tk(["checked","indeterminate"])],i1.prototype,"handleStateChange",1),tL([tk("disabled")],i1.prototype,"handleDisabledChange",1),i1=tL([tP("wa-checkbox")],i1);var i2=n`
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
`,i4=class extends tU{constructor(){super(...arguments),this.localize=new t1(this)}render(){return H`
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
    `}};i4.css=i2,i4=tL([tP("wa-spinner")],i4);let i5={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function i3(t){t.preventDefault()}function i8(t){t.stopImmediatePropagation()}customElements.define("jsdoc-tree",class extends iX{handleClick(t){let e=t.target,i=e.closest("jsdoc-tree-item"),o=t.composedPath().some(t=>t?.classList?.contains("expand-button"));i&&!i.disabled&&e===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}}),customElements.define("jsdoc-tree-item",class extends iK{connectedCallback(){super.connectedCallback(),Object.entries(i5).forEach(([t,e])=>{let i=iS([t,e]);this.prepend(i)}),i_()}firstUpdated(){for(let t of(super.firstUpdated(),this.shadowRoot.querySelectorAll("wa-icon")))t.remove()}}),document.querySelectorAll("wa-details").forEach(t=>{t.addEventListener("wa-hide",i3),t.addEventListener("wa-show",i3)}),document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(t=>{let e=t.firstElementChild;e?.localName==="a"&&e.addEventListener("click",i8)});