let e,t,i,o,s,n,a,r,l,c,d,h,p,u,m,f,g;let y={keyframes:[{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)"},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.3},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.1)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)",filter:"drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))",offset:.6},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.9},{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)",color:"var(--jsdoc-copy-icon-color)"}],options:{duration:800,easing:"ease-in-out"}},v={keyframes:[{scale:1,opacity:1},{scale:3,opacity:.25,offset:.2},{scale:5,opacity:.0625,offset:.4},{scale:10,opacity:0}],options:{duration:300,easing:"ease-in-out"}},w=globalThis,b=w.ShadowRoot&&(void 0===w.ShadyCSS||w.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,C=Symbol(),x=new WeakMap;class L{constructor(e,t,i){if(this._$cssResult$=!0,i!==C)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(b&&void 0===e){let i=void 0!==t&&1===t.length;i&&(e=x.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&x.set(t,e))}return e}toString(){return this.cssText}}let A=(e,...t)=>new L(1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]),e,C),$=b?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t,i="";for(let t of e.cssRules)i+=t.cssText;return new L("string"==typeof(t=i)?t:t+"",void 0,C)})(e):e,{is:k,defineProperty:E,getOwnPropertyDescriptor:S,getOwnPropertyNames:_,getOwnPropertySymbols:z,getPrototypeOf:I}=Object,M=globalThis,F=M.trustedTypes,P=F?F.emptyScript:"",j=M.reactiveElementPolyfillSupport,T={toAttribute(e,t){switch(t){case Boolean:e=e?P:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},U=(e,t)=>!k(e,t),O={attribute:!0,type:String,converter:T,reflect:!1,useDefault:!1,hasChanged:U};Symbol.metadata??=Symbol("metadata"),M.litPropertyMetadata??=new WeakMap;class R extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=O){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&E(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){let{get:o,set:s}=S(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){let n=o?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??O}static _$Ei(){if(this.hasOwnProperty("elementProperties"))return;let e=I(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty("finalized"))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty("properties")){let e=this.properties;for(let t of[..._(e),...z(e)])this.createProperty(t,e[t])}let e=this[Symbol.metadata];if(null!==e){let t=litPropertyMetadata.get(e);if(void 0!==t)for(let[e,i]of t)this.elementProperties.set(e,i)}for(let[e,t]of(this._$Eh=new Map,this.elementProperties)){let i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e))for(let i of new Set(e.flat(1/0).reverse()))t.unshift($(i));else void 0!==e&&t.push($(e));return t}static _$Eu(e,t){let i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map;for(let t of this.constructor.elementProperties.keys())this.hasOwnProperty(t)&&(e.set(t,this[t]),delete this[t]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(b)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let i of t){let t=document.createElement("style"),o=w.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=i.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){let s=(void 0!==i.converter?.toAttribute?i.converter:T).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){let i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){let e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:T;this._$Em=o;let n=s.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,i,o=!1,s){if(void 0!==e){let n=this.constructor;if(!1===o&&(s=this[e]),!(((i??=n.getPropertyOptions(e)).hasChanged??U)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,i]of e){let{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1,t=this._$AL;try{(e=this.shouldUpdate(t))?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}R.elementStyles=[],R.shadowRootOptions={mode:"open"},R.elementProperties=new Map,R.finalized=new Map,j?.({ReactiveElement:R}),(M.reactiveElementVersions??=[]).push("2.1.2");let N=globalThis,V=e=>e,B=N.trustedTypes,D=B?B.createPolicy("lit-html",{createHTML:e=>e}):void 0,q="$lit$",H=`lit$${Math.random().toFixed(9).slice(2)}$`,W="?"+H,Y=`<${W}>`,K=document,Z=()=>K.createComment(""),X=e=>null===e||"object"!=typeof e&&"function"!=typeof e,J=Array.isArray,G=e=>J(e)||"function"==typeof e?.[Symbol.iterator],Q="[ 	\n\f\r]",ee=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,et=/-->/g,ei=/>/g,eo=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),es=/'/g,en=/"/g,ea=/^(?:script|style|textarea|title)$/i,er=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),el=er(1),ec=(er(2),er(3),Symbol.for("lit-noChange")),ed=Symbol.for("lit-nothing"),eh=new WeakMap,ep=K.createTreeWalker(K,129);function eu(e,t){if(!J(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==D?D.createHTML(t):t}let em=(e,t)=>{let i=e.length-1,o=[],s,n=2===t?"<svg>":3===t?"<math>":"",a=ee;for(let t=0;t<i;t++){let i=e[t],r,l,c=-1,d=0;for(;d<i.length&&(a.lastIndex=d,null!==(l=a.exec(i)));)d=a.lastIndex,a===ee?"!--"===l[1]?a=et:void 0!==l[1]?a=ei:void 0!==l[2]?(ea.test(l[2])&&(s=RegExp("</"+l[2],"g")),a=eo):void 0!==l[3]&&(a=eo):a===eo?">"===l[0]?(a=s??ee,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,r=l[1],a=void 0===l[3]?eo:'"'===l[3]?en:es):a===en||a===es?a=eo:a===et||a===ei?a=ee:(a=eo,s=void 0);let h=a===eo&&e[t+1].startsWith("/>")?" ":"";n+=a===ee?i+Y:c>=0?(o.push(r),i.slice(0,c)+q+i.slice(c)+H+h):i+H+(-2===c?t:h)}return[eu(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class ef{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0,a=e.length-1,r=this.parts,[l,c]=em(e,t);if(this.el=ef.createElement(l,i),ep.currentNode=this.el.content,2===t||3===t){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=ep.nextNode())&&r.length<a;){if(1===o.nodeType){if(o.hasAttributes())for(let e of o.getAttributeNames())if(e.endsWith(q)){let t=c[n++],i=o.getAttribute(e).split(H),a=/([.?@])?(.*)/.exec(t);r.push({type:1,index:s,name:a[2],strings:i,ctor:"."===a[1]?eb:"?"===a[1]?eC:"@"===a[1]?ex:ew}),o.removeAttribute(e)}else e.startsWith(H)&&(r.push({type:6,index:s}),o.removeAttribute(e));if(ea.test(o.tagName)){let e=o.textContent.split(H),t=e.length-1;if(t>0){o.textContent=B?B.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],Z()),ep.nextNode(),r.push({type:2,index:++s});o.append(e[t],Z())}}}else if(8===o.nodeType)if(o.data===W)r.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(H,e+1));)r.push({type:7,index:s}),e+=H.length-1}s++}}static createElement(e,t){let i=K.createElement("template");return i.innerHTML=e,i}}function eg(e,t,i=e,o){if(t===ec)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl,n=X(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e))._$AT(e,i,o),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=eg(e,s._$AS(e,t.values),s,o)),t}class ey{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??K).importNode(t,!0);ep.currentNode=o;let s=ep.nextNode(),n=0,a=0,r=i[0];for(;void 0!==r;){if(n===r.index){let t;2===r.type?t=new ev(s,s.nextSibling,this,e):1===r.type?t=new r.ctor(s,r.name,r.strings,this,e):6===r.type&&(t=new eL(s,this,e)),this._$AV.push(t),r=i[++a]}n!==r?.index&&(s=ep.nextNode(),n++)}return ep.currentNode=K,o}p(e){let t=0;for(let i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ev{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=ed,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){X(e=eg(this,e,t))?e===ed||null==e||""===e?(this._$AH!==ed&&this._$AR(),this._$AH=ed):e!==this._$AH&&e!==ec&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):G(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ed&&X(this._$AH)?this._$AA.nextSibling.data=e:this.T(K.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ef.createElement(eu(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{let e=new ey(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=eh.get(e.strings);return void 0===t&&eh.set(e.strings,t=new ef(e)),t}k(e){J(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,o=0;for(let s of e)o===t.length?t.push(i=new ev(this.O(Z()),this.O(Z()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=V(e).nextSibling;V(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ew{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=ed,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ed}_$AI(e,t=this,i,o){let s=this.strings,n=!1;if(void 0===s)(n=!X(e=eg(this,e,t,0))||e!==this._$AH&&e!==ec)&&(this._$AH=e);else{let o,a,r=e;for(e=s[0],o=0;o<s.length-1;o++)(a=eg(this,r[i+o],t,o))===ec&&(a=this._$AH[o]),n||=!X(a)||a!==this._$AH[o],a===ed?e=ed:e!==ed&&(e+=(a??"")+s[o+1]),this._$AH[o]=a}n&&!o&&this.j(e)}j(e){e===ed?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class eb extends ew{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ed?void 0:e}}class eC extends ew{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ed)}}class ex extends ew{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=eg(this,e,t,0)??ed)===ec)return;let i=this._$AH,o=e===ed&&i!==ed||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==ed&&(i===ed||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class eL{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){eg(this,e)}}let eA=N.litHtmlPolyfillSupport;eA?.(ef,ev),(N.litHtmlVersions??=[]).push("3.3.2");let e$=globalThis;class ek extends R{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{let o=i?.renderBefore??t,s=o._$litPart$;if(void 0===s){let e=i?.renderBefore??null;o._$litPart$=s=new ev(t.insertBefore(Z(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ec}}ek._$litElement$=!0,ek.finalized=!0,e$.litElementHydrateSupport?.({LitElement:ek});let eE=e$.litElementPolyfillSupport;eE?.({LitElement:ek}),(e$.litElementVersions??=[]).push("4.2.2");let eS=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},e_={attribute:!0,type:String,converter:T,reflect:!1,hasChanged:U};function ez(e){return(t,i)=>{let o;return"object"==typeof i?((e=e_,t,i)=>{let{kind:o,metadata:s}=i,n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===o){let{name:o}=i;return{set(i){let s=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,s,e,!0,i)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){let{name:o}=i;return function(i){let s=this[o];t.call(this,i),this.requestUpdate(o,s,e,!0,i)}}throw Error("Unsupported decorator location: "+o)})(e,t,i):(o=t.hasOwnProperty(i),t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0)}}let eI=(e,t,i)=>(i.configurable=!0,i.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,i),i);function eM(e,t){return(i,o,s)=>{let n=t=>t.renderRoot?.querySelector(e)??null;if(t){let e,{get:t,set:a}="object"==typeof o?i:s??(e=Symbol(),{get(){return this[e]},set(t){this[e]=t}});return eI(i,o,{get(){let e=t.call(this);return void 0===e&&(null!==(e=n(this))||this.hasUpdated)&&a.call(this,e),e}})}return eI(i,o,{get(){return n(this)}})}}function eF(e){return ez({...e,state:!0,attribute:!1})}let eP=[["path",{d:"m9 18 6-6-6-6"}]],ej={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},eT=([e,t,i])=>{let o=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(e=>{o.setAttribute(e,String(t[e]))}),i?.length&&i.forEach(e=>{let t=eT(e);o.appendChild(t)}),o},eU=e=>"string"==typeof e?e:e&&e.class?e.class&&"string"==typeof e.class?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"":"",eO=(e,{nameAttr:t,icons:i,attrs:o})=>{let s=e.getAttribute(t);if(null==s)return;let n=i[s.replace(/(\w)(\w*)(_|-|\s*)/g,(e,t,i)=>t.toUpperCase()+i.toLowerCase())];if(!n)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let a=Array.from(e.attributes).reduce((e,t)=>(e[t.name]=t.value,e),{}),r={...ej,"data-lucide":s,...o,...a},l=["lucide",`lucide-${s}`,a,o].flatMap(eU).map(e=>e.trim()).filter(Boolean).filter((e,t,i)=>i.indexOf(e)===t).join(" ");l&&Object.assign(r,{class:l});let c=((e,t={})=>eT(["svg",{...ej,...t},e]))(n,r);return e.parentNode?.replaceChild(c,e)},eR=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]],eN=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]],eV=({icons:e={},nameAttr:t="data-lucide",attrs:i={},root:o=document,inTemplates:s}={})=>{if(!Object.values(e).length)throw Error("Please provide an icons object.\nIf you want to use all the icons you can import it like:\n `import { createIcons, icons } from 'lucide';\nlucide.createIcons({icons});`");if(void 0===o)throw Error("`createIcons()` only works in a browser environment.");if(Array.from(o.querySelectorAll(`[${t}]`)).forEach(o=>eO(o,{nameAttr:t,icons:e,attrs:i})),s&&Array.from(o.querySelectorAll("template")).forEach(o=>eV({icons:e,nameAttr:t,attrs:i,root:o.content,inTemplates:s})),"data-lucide"===t){let t=o.querySelectorAll("[icon-name]");t.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(t).forEach(t=>eO(t,{nameAttr:"icon-name",icons:e,attrs:i})))}},eB="data-icon";function eD(e){eV({icons:{ChevronRight:eP,Link:eR,Unlink:eN},attrs:{width:16,height:16},nameAttr:eB,root:e?.root})}function eq(e,t,i){"symbol"==typeof t&&(t=(t=t.description)?"["+t+"]":"");try{Object.defineProperty(e,"name",{configurable:!0,value:i?i+" "+t:t})}catch(e){}return e}function eH(e){return e}i=[eS("copy-url")],new class extends eH{static [class extends ek{static{({e:[s,a,l,d,p,m,e],c:[f,t]}=function(e,t,i,o,s,n){function a(e,t,i){return function(o,s){return i&&i(o),e[t].call(o,s)}}function r(e,t){for(var i=0;i<e.length;i++)e[i].call(t);return t}function l(e,t,i,o){if("function"!=typeof e&&(o||void 0!==e))throw TypeError(t+" must "+(i||"be")+" a function"+(o?"":" or undefined"));return e}function c(e,t,i,o,s,n,r,c,d,h,p,u,m){function f(e){if(!m(e))throw TypeError("Attempted to access private element on non-instance")}var g,y=t[0],v=t[3],w=!c;if(!w){i||Array.isArray(y)||(y=[y]);var b={},C=[],x=3===s?"get":4===s||u?"set":"value";h?(p||u?b={get:eq(function(){return v(this)},o,"get"),set:function(e){t[4](this,e)}}:b[x]=v,p||eq(b[x],o,2===s?"":x)):p||(b=Object.getOwnPropertyDescriptor(e,o))}for(var L=e,A=y.length-1;A>=0;A-=i?2:1){var $=y[A],k=i?y[A-1]:void 0,E={},S={kind:["field","accessor","method","getter","setter","class"][s],name:o,metadata:n,addInitializer:(function(e,t){if(e.v)throw Error("attempted to call addInitializer after decoration was finished");l(t,"An initializer","be",!0),r.push(t)}).bind(null,E)};try{if(w)(g=l($.call(k,L,S),"class decorators","return"))&&(L=g);else{S.static=d,S.private=h,h?2===s?_=function(e){return f(e),b.value}:(s<4&&(_=a(b,"get",f)),3!==s&&(z=a(b,"set",f))):(_=function(e){return e[o]},(s<2||4===s)&&(z=function(e,t){e[o]=t}));var _,z,I=S.access={has:h?m.bind():function(e){return o in e}};if(_&&(I.get=_),z&&(I.set=z),L=$.call(k,u?{get:b.get,set:b.set}:b[x],S),u){if("object"==typeof L&&L)(g=l(L.get,"accessor.get"))&&(b.get=g),(g=l(L.set,"accessor.set"))&&(b.set=g),(g=l(L.init,"accessor.init"))&&C.push(g);else if(void 0!==L)throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0")}else l(L,(p?"field":"method")+" decorators","return")&&(p?C.push(L):b[x]=L)}}finally{E.v=!0}}return(p||u)&&c.push(function(e,t){for(var i=C.length-1;i>=0;i--)t=C[i].call(e,t);return t}),p||w||(h?u?c.push(a(b,"get"),a(b,"set")):c.push(2===s?b[x]:a.call.bind(b[x])):Object.defineProperty(e,o,b)),L}function d(e,t){return Object.defineProperty(e,Symbol.metadata||Symbol.for("Symbol.metadata"),{configurable:!0,enumerable:!0,value:t})}if(arguments.length>=6)var h=n[Symbol.metadata||Symbol.for("Symbol.metadata")];var p=Object.create(null==h?null:h),u=function(e,t,i,o){var s,n,a=[],l=function(t){return function(e){if(Object(e)!==e)throw TypeError("right-hand side of 'in' should be an object, got "+(null!==e?typeof e:"null"));return e}(t)===e},d=new Map;function h(e){e&&a.push(r.bind(null,e))}for(var p=0;p<t.length;p++){var u=t[p];if(Array.isArray(u)){var m=u[1],f=u[2],g=u.length>3,y=16&m,v=!!(8&m),w=0==(m&=7),b=f+"/"+v;if(!w&&!g){var C=d.get(b);if(!0===C||3===C&&4!==m||4===C&&3!==m)throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: "+f);d.set(b,!(m>2)||m)}c(v?e:e.prototype,u,y,g?"#"+f:function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var i=e[Symbol.toPrimitive];if(void 0!==i){var o=i.call(e,t||"default");if("object"!=typeof o)return o;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(f),m,o,v?n=n||[]:s=s||[],a,v,g,w,1===m,v&&g?l:i)}}return h(s),h(n),a}(e,t,s,p);return i.length||d(e,p),{e:u,get c(){var m=[];return i.length&&[d(c(e,[i],o,e.name,5,p,m),p),r.bind(null,m,e)]}}}(this,[[o,1,"copyIcon"],[n,1,"successIcon"],[r,1,"from"],[c,1,"showAnimation"],[h,1,"showAnimationReducedMotion"],[u,1,"isCopying"]],i,0,void 0,ek))}#e=(e(this),s(this));get[(o=eM('slot[name="copy-icon"]'),n=eM('slot[name="success-icon"]'),r=ez(),c=ez(),h=ez(),u=eF(),"copyIcon")](){return this.#e}set copyIcon(e){this.#e=e}#t=a(this);get successIcon(){return this.#t}set successIcon(e){this.#t=e}#i=l(this,"");get from(){return this.#i}set from(e){this.#i=e}#o=d(this,v);get showAnimation(){return this.#o}set showAnimation(e){this.#o=e}#s=p(this,y);get showAnimationReducedMotion(){return this.#s}set showAnimationReducedMotion(e){this.#s=e}#n=m(this,!1);get isCopying(){return this.#n}set isCopying(e){this.#n=e}async handleCopy(){let e,t;!this.isCopying&&(this.isCopying=!0,(e=new URL(window.location.href)).hash=this.from,(t=e.href)&&(await navigator.clipboard.writeText(t),await this.animateIcon()))}firstUpdated(){super.firstUpdated(),eD({root:this.shadowRoot})}render(){return el`
      <button class="copy-button__button" part="button" type="button" @click=${this.handleCopy}>
        <slot part="copy-icon" name="copy-icon">
          <span data-icon="link" slot="copy-icon"></span>
        </slot>
        <slot part="success-icon" name="success-icon">
          <span data-icon="link" slot="success-icon"></span>
        </slot>
      </button>
    `}async animateIcon(){let{matches:e}=window.matchMedia("(prefers-reduced-motion: reduce)"),t=e?this.showAnimationReducedMotion:this.showAnimation;this.copyIcon.hidden=!1,await this.successIcon.animate(t.keyframes,t.options).finished,document.documentElement.style.setProperty("--jsdoc-copy-icon-opacity",0),this.copyIcon.hidden=!0,this.isCopying=!1}}];styles=[A`
      :host {
        --jsdoc-copy-icon-scale: 1;
        --jsdoc-copy-icon-stroke-width: 2px;
        display: inline-block;
      }

      .copy-button__button {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        color: inherit;
        font-size: inherit;
        margin-inline: var(--jsdoc-spacer-x-small);
        padding: var(--jsdoc-spacer-x-small);
        cursor: pointer;
        transform: translateY(var(--jsdoc-spacer-xxx-small));
        transition: color 0.3s ease-in-out;
      }

      .copy-button__button:focus-visible {
        outline-offset: var(--jsdoc-spacer-xx-small);
        transform: translateY(var(--jsdoc-spacer-xxx-small));
      }

      slot[name='copy-icon'],
      slot[name='success-icon'] {
        position: absolute;
        top: 0;
        right: 0;
      }

      slot[name='copy-icon'] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
        transition: opacity 0.3s ease-in-out;
      }

      slot[name='copy-icon']:focus,
      :focus slot[name='copy-icon'],
      slot[name='copy-icon']:hover,
      :hover slot[name='copy-icon'] {
        color: var(--jsdoc-copy-icon-color-hover);
        opacity: 1;
      }

      slot[name='copy-icon'][hidden]:focus,
      :focus slot[name='copy-icon'][hidden] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
      }

      slot[name='success-icon'] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
        transition: opacity 0.3s ease-in-out;
      }

      slot[name='success-icon']:focus,
      :focus slot[name='success-icon'],
      slot[name='success-icon']:hover,
      :hover slot[name='success-icon'] {
        color: var(--jsdoc-copy-icon-color-hover);
      }

      slot {
        display: inline-flex;
      }
    `];constructor(){super(f),t()}};let eW=["copy-url","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let e=eW.filter(e=>document.querySelector(e));for(let t of(await Promise.allSettled(e.map(e=>customElements.whenDefined(e))),e))for(let e of document.querySelectorAll(t))e.classList.add("ready")})();var eY,eK,eZ={},eX="u">typeof window&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(e){setTimeout(e,16)};eZ=function(e){var t="startValue"in e?e.startValue:0,i="endValue"in e?e.endValue:1,o="durationMs"in e?e.durationMs:200,s=e.onComplete||function(){},n=o/16,a=(i-t)/n,r=Math.PI/n,l=t,c=0;eX(function t(){c+=r,l+=a*Math.pow(Math.sin(c),2)*2,c<Math.PI?(e.onStep(l),eX(t)):(e.onStep(i),s())})},(()=>{let e="PageUp",t="--navbar-scroll-margin";function i(e,i){var o;let s,n=getComputedStyle(document.body);return e&&(s=getComputedStyle(e).getPropertyValue(t)),s||(s=n.getPropertyValue(t)),i-(s=5*Math.ceil((s=(o=Number(s.replace("rem","")))*parseFloat(n.fontSize))/5))}function o(e){var t;((t=eZ)&&t.__esModule?t.default:t)({durationMs:200,startValue:window.scrollY,endValue:e,onStep:e=>window.scroll({behavior:"instant",top:e})})}function s(e,t,s){let n;t&&(n=document.getElementById(t))&&(e.preventDefault(),o(i(n,n.offsetTop)),window.history.pushState(null,null,s))}function n(e){return e.substring(1)}window.addEventListener("load",e=>{s(e,n(document.location.hash),document.location.href)}),window.addEventListener("hashchange",e=>{let t=new URL(e.newURL);s(e,n(t.hash),t.hash)}),document.addEventListener("keydown",t=>{let s,n=t.code;("Space"===n||"PageDown"===n||n===e)&&(t.preventDefault(),t.stopImmediatePropagation(),s=i(null,window.innerHeight),n===e?o(window.scrollY-s):o(window.scrollY+s))})})();var eJ=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}},eG=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}},eQ=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}},e2=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}},e0=A`
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
`;function e1(e,t){return new Promise(i=>{e.addEventListener(t,function o(s){s.target===e&&(e.removeEventListener(t,o),i())})})}async function e4(e,t,i){return e.animate(t,i).finished.catch(()=>{})}function e3(e){return(e=e.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?1e3*(parseFloat(e)||0):parseFloat(e)||0}var e5=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}},e6=Object.defineProperty,e8=Object.getOwnPropertyDescriptor,e7=e=>{throw TypeError(e)},e9=(e,t,i,o)=>{for(var s,n=o>1?void 0:o?e8(t,i):t,a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o?s(t,i,n):s(n))||n);return o&&n&&e6(t,i,n),n},te=(e,t,i)=>t.has(e)||e7("Cannot "+i),tt=A`
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
`,ti=class extends ek{constructor(){let e;super(),(e=eY).has(this)?e7("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(this):e.set(this,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,t)=>{if(this.internals?.states)try{t?this.internals.states.add(e):this.internals.states.delete(e)}catch(e){if(String(e).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw e}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}for(let[e,t]of(this.customStates.set("wa-defined",!0),this.constructor.elementProperties))"inherit"===t.default&&void 0!==t.initial&&"string"==typeof e&&this.customStates.set(`initial-${e}-${t.initial}`,!0)}static get styles(){return[tt,...Array.isArray(this.css)?this.css:this.css?[this.css]:[]]}attributeChangedCallback(e,t,i){let o,s;if(te(this,o=eY,"read from private field"),s?!s.call(this):!o.get(this)){let e,t;this.constructor.elementProperties.forEach((e,t)=>{e.reflect&&null!=this[t]&&this.initialReflectedProperties.set(t,this[t])}),te(this,e=eY,"write to private field"),t?t.call(this,!0):e.set(this,!0)}super.attributeChangedCallback(e,t,i)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,i)=>{e.has(i)&&null==this[i]&&(this[i]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(e){if(this.didSSR&&!this.hasUpdated){let t=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});t.error=e,this.dispatchEvent(t)}throw e}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};eY=new WeakMap,e9([ez()],ti.prototype,"dir",2),e9([ez()],ti.prototype,"lang",2),e9([ez({type:Boolean,reflect:!0,attribute:"did-ssr"})],ti.prototype,"didSSR",2);var to=class extends ti{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new e5))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[{observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let i of t.observedAttributes)e.add(i);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")){let e=this.value;if(Array.isArray(e)){if(this.name){let t=new FormData;for(let i of e)t.append(this.name,i);this.setValue(t,t)}}else this.setValue(e,e)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(e)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],i=e[1],o=e[2];o||(o=this.validationTarget),this.internals.setValidity(t,i,o||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,i=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&i),this.customStates.set("user-valid",t&&i)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,"restore"===t&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,i]=e;this.internals.setFormValue(t,i)}get allValidators(){return[...this.constructor.validators||[],...this.validators||[]]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate)return void this.resetValidity();let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},i=this.validationTarget||this.input||void 0,o="";for(let i of e){let{isValid:e,message:s,invalidKeys:n}=i.checkValidity(this);!e&&(o||(o=s),n?.length>=0&&n.forEach(e=>t[e]=!0))}o||(o=this.validationMessage),this.setValidity(t,o,i)}};to.formAssociated=!0,e9([ez({reflect:!0})],to.prototype,"name",2),e9([ez({type:Boolean})],to.prototype,"disabled",2),e9([ez({state:!0,attribute:!1})],to.prototype,"valueHasChanged",2),e9([ez({state:!0,attribute:!1})],to.prototype,"hasInteracted",2),e9([ez({attribute:"custom-error",reflect:!0})],to.prototype,"customError",2),e9([ez({attribute:!1,state:!0,type:Object})],to.prototype,"validity",1);let ts=new Set,tn=new Map,ta="ltr",tr="en",tl="u">typeof MutationObserver&&"u">typeof document&&void 0!==document.documentElement;if(tl){let e=new MutationObserver(td);ta=document.documentElement.dir||"ltr",tr=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function tc(...e){e.map(e=>{let t=e.$code.toLowerCase();tn.has(t)?tn.set(t,Object.assign(Object.assign({},tn.get(t)),e)):tn.set(t,e),g||(g=e)}),td()}function td(){tl&&(ta=document.documentElement.dir||"ltr",tr=document.documentElement.lang||navigator.language),[...ts.keys()].map(e=>{"function"==typeof e.requestUpdate&&e.requestUpdate()})}class th{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){ts.add(this.host)}hostDisconnected(){ts.delete(this.host)}dir(){return`${this.host.dir||ta}`.toLowerCase()}lang(){return`${this.host.lang||tr}`.toLowerCase()}getTranslationData(e){var t,i;let o=new Intl.Locale(e.replace(/_/g,"-")),s=null==o?void 0:o.language.toLowerCase(),n=null!=(i=null==(t=null==o?void 0:o.region)?void 0:t.toLowerCase())?i:"",a=tn.get(`${s}-${n}`),r=tn.get(s);return{locale:o,language:s,region:n,primary:a,secondary:r}}exists(e,t){var i;let{primary:o,secondary:s}=this.getTranslationData(null!=(i=t.lang)?i:this.lang());return t=Object.assign({includeFallback:!1},t),!!o&&!!o[e]||!!s&&!!s[e]||!!t.includeFallback&&!!g&&!!g[e]}term(e,...t){let i,{primary:o,secondary:s}=this.getTranslationData(this.lang());if(o&&o[e])i=o[e];else if(s&&s[e])i=s[e];else{if(!g||!g[e])return console.error(`No translation found for: ${String(e)}`),String(e);i=g[e]}return"function"==typeof i?i(...t):i}date(e,t){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),t).format(e)}number(e,t){return isNaN(e=Number(e))?"":new Intl.NumberFormat(this.lang(),t).format(e)}relativeTime(e,t,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(e,t)}}var tp={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>0===e?"No options selected":1===e?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};tc(tp);var tu=class extends th{};function tm(e,t){let i={waitUntilFirstUpdate:!1,...t};return(t,o)=>{let{update:s}=t,n=Array.isArray(e)?e:[e];t.update=function(e){n.forEach(t=>{if(e.has(t)){let s=e.get(t),n=this[t];s!==n&&(!i.waitUntilFirstUpdate||this.hasUpdated)&&this[o](s,n)}}),s.call(this,e)}}}tc(tp);let tf=e=>(...t)=>({_$litDirective$:e,values:t});class tg{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}let ty=tf(class extends tg{constructor(e){if(super(e),1!==e.type||"class"!==e.name||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(void 0===this.st){for(let i in this.st=new Set,void 0!==e.strings&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(e=>""!==e))),t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let i=e.element.classList;for(let e of this.st)e in t||(i.remove(e),this.st.delete(e));for(let e in t){let o=!!t[e];o===this.st.has(e)||this.nt?.has(e)||(o?(i.add(e),this.st.add(e)):(i.remove(e),this.st.delete(e)))}return ec}});var tv=class extends ti{constructor(){super(...arguments),this.localize=new tu(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(let t of e)"attributes"===t.type&&"open"===t.attributeName&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){!e.composedPath().some(e=>e instanceof HTMLElement&&(!!["a","button","input","textarea","select"].includes(e.tagName?.toLowerCase())||e instanceof to&&(!("disabled"in e)||!e.disabled)))&&(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){("Enter"===e.key||" "===e.key)&&(e.preventDefault(),this.open?this.hide():this.show()),("ArrowUp"===e.key||"ArrowLeft"===e.key)&&(e.preventDefault(),this.hide()),("ArrowDown"===e.key||"ArrowRight"===e.key)&&(e.preventDefault(),this.show())}closeOthersWithSameName(){this.name&&this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(e=>{e!==this&&e.open&&(e.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let e=new eJ;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let t=e3(getComputedStyle(this.body).getPropertyValue("--show-duration"));await e4(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new e2)}else{let e=new eG;if(this.dispatchEvent(e),e.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let t=e3(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await e4(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new eQ)}}async show(){if(!this.open&&!this.disabled)return this.open=!0,e1(this,"wa-after-show")}async hide(){if(this.open&&!this.disabled)return this.open=!1,e1(this,"wa-after-hide")}render(){let e=this.hasUpdated?"rtl"===this.localize.dir():"rtl"===this.dir;return el`
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
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
            <slot name="collapse-icon">
              <wa-icon library="system" variant="solid" name=${e?"chevron-left":"chevron-right"}></wa-icon>
            </slot>
          </span>
        </summary>

        <div
          class=${ty({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};tv.css=e0,e9([eM("details")],tv.prototype,"details",2),e9([eM("summary")],tv.prototype,"header",2),e9([eM(".body")],tv.prototype,"body",2),e9([eM(".expand-icon-slot")],tv.prototype,"expandIconSlot",2),e9([eF()],tv.prototype,"isAnimating",2),e9([ez({type:Boolean,reflect:!0})],tv.prototype,"open",2),e9([ez()],tv.prototype,"summary",2),e9([ez({reflect:!0})],tv.prototype,"name",2),e9([ez({type:Boolean,reflect:!0})],tv.prototype,"disabled",2),e9([ez({reflect:!0})],tv.prototype,"appearance",2),e9([ez({attribute:"icon-placement",reflect:!0})],tv.prototype,"iconPlacement",2),e9([tm("open",{waitUntilFirstUpdate:!0})],tv.prototype,"handleOpenChange",1),tv=e9([eS("wa-details")],tv);var tw=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}},tb=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}},tC=A`
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
`,tx={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">\x3c!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--\x3e<path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">\x3c!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --\x3e<path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},tL="",tA="7.1.0",t$=[{name:"default",resolver:(e,t="classic",i="solid")=>{let o,s,n;return s=(o=function(){if(!tL){let e=document.querySelector("[data-fa-kit-code]");e&&(tL=e.getAttribute("data-fa-kit-code")||"")}return tL}()).length>0,n="solid","notdog"===t&&("solid"===i&&(n="notdog-solid"),"duo-solid"===i&&(n="notdog-duo-solid")),"notdog-duo"===t&&(n="notdog-duo-solid"),"chisel"===t&&(n="chisel-regular"),"etch"===t&&(n="etch-solid"),"jelly"===t&&(n="jelly-regular","duo-regular"===i&&(n="jelly-duo-regular"),"fill-regular"===i&&(n="jelly-fill-regular")),"jelly-duo"===t&&(n="jelly-duo-regular"),"jelly-fill"===t&&(n="jelly-fill-regular"),"slab"===t&&(("solid"===i||"regular"===i)&&(n="slab-regular"),"press-regular"===i&&(n="slab-press-regular")),"slab-press"===t&&(n="slab-press-regular"),"thumbprint"===t&&(n="thumbprint-light"),"whiteboard"===t&&(n="whiteboard-semibold"),"utility"===t&&(n="utility-semibold"),"utility-duo"===t&&(n="utility-duo-semibold"),"utility-fill"===t&&(n="utility-fill-semibold"),"classic"===t&&("thin"===i&&(n="thin"),"light"===i&&(n="light"),"regular"===i&&(n="regular"),"solid"===i&&(n="solid")),"sharp"===t&&("thin"===i&&(n="sharp-thin"),"light"===i&&(n="sharp-light"),"regular"===i&&(n="sharp-regular"),"solid"===i&&(n="sharp-solid")),"duotone"===t&&("thin"===i&&(n="duotone-thin"),"light"===i&&(n="duotone-light"),"regular"===i&&(n="duotone-regular"),"solid"===i&&(n="duotone")),"sharp-duotone"===t&&("thin"===i&&(n="sharp-duotone-thin"),"light"===i&&(n="sharp-duotone-light"),"regular"===i&&(n="sharp-duotone-regular"),"solid"===i&&(n="sharp-duotone-solid")),"brands"===t&&(n="brands"),s?`https://ka-p.fontawesome.com/releases/v${tA}/svgs/${n}/${e}.svg?token=${encodeURIComponent(o)}`:`https://ka-f.fontawesome.com/releases/v${tA}/svgs/${n}/${e}.svg`},mutator:(e,t)=>{if(t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:i,variant:o}=t;if("duotone"===i||"sharp-duotone"===i||"notdog-duo"===i||"notdog"===i&&"duo-solid"===o||"jelly-duo"===i||"jelly"===i&&"duo-regular"===o||"utility-duo"===i||"thumbprint"===i){let i=[...e.querySelectorAll("path")],o=i.find(e=>!e.hasAttribute("opacity")),s=i.find(e=>e.hasAttribute("opacity"));if(!o||!s)return;if(o.setAttribute("data-duotone-primary",""),s.setAttribute("data-duotone-secondary",""),t.swapOpacity&&o&&s){let e=s.getAttribute("opacity")||"0.4";o.style.setProperty("--path-opacity",e),s.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},{name:"system",resolver:(e,t="classic",i="solid")=>{let o=tx[i][e]??tx.regular[e]??tx.regular["circle-question"];if(o)return`data:image/svg+xml,${encodeURIComponent(o)}`;return""}}],tk=[];function tE(e){return t$.find(t=>t.name===e)}let{I:tS}={M:q,P:H,A:W,C:1,L:em,R:ey,D:G,V:eg,I:ev,H:ew,N:eC,U:ex,B:eb,F:eL},t_={};var tz=Symbol(),tI=Symbol(),tM=new Map,tF=class extends ti{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let i;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=el`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let i=this.shadowRoot.querySelector("[part='svg']");return"function"==typeof t.mutator&&t.mutator(i,this),this.svg}try{if(!(i=await fetch(e,{mode:"cors"})).ok)return 410===i.status?tz:tI}catch{return tI}try{let e=document.createElement("div");e.innerHTML=await i.text();let t=e.firstElementChild;if(t?.tagName?.toLowerCase()!=="svg")return tz;eK||(eK=new DOMParser);let o=eK.parseFromString(t.outerHTML,"text/html").body.querySelector("svg");if(!o)return tz;return o.part.add("svg"),document.adoptNode(o)}catch{return tz}}}connectedCallback(){super.connectedCallback(),tk.push(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){var e;super.disconnectedCallback(),e=this,tk=tk.filter(t=>t!==e)}getIconSource(){let e=tE(this.library),t=this.family||"classic";return this.name&&e?{url:e.resolver(this.name,t,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){"string"==typeof this.label&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=this.getIconSource(),i=t?tE(this.library):void 0;if(!e){this.svg=null;return}let o=tM.get(e);o||(o=this.resolveIcon(e,i),tM.set(e,o));let s=await o;if(s===tI&&tM.delete(e),e===this.getIconSource().url){let e;if(void 0===e?void 0!==s?._$litType$:s?._$litType$===e){this.svg=s;return}switch(s){case tI:case tz:this.svg=null,this.dispatchEvent(new tw);break;default:this.svg=s.cloneNode(!0),i?.mutator?.(this.svg,this),this.dispatchEvent(new tb)}}}updated(e){super.updated(e);let t=tE(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let i=this.shadowRoot?.querySelector("svg");i&&t?.mutator?.(i,this)}render(){return this.hasUpdated?this.svg:el`<svg part="svg" width="16" height="16"></svg>`}};tF.css=tC,e9([eF()],tF.prototype,"svg",2),e9([ez({reflect:!0})],tF.prototype,"name",2),e9([ez({reflect:!0})],tF.prototype,"family",2),e9([ez({reflect:!0})],tF.prototype,"variant",2),e9([ez({attribute:"auto-width",type:Boolean,reflect:!0})],tF.prototype,"autoWidth",2),e9([ez({attribute:"swap-opacity",type:Boolean,reflect:!0})],tF.prototype,"swapOpacity",2),e9([ez()],tF.prototype,"src",2),e9([ez()],tF.prototype,"label",2),e9([ez({reflect:!0})],tF.prototype,"library",2),e9([ez({type:Number,reflect:!0})],tF.prototype,"rotate",2),e9([ez({type:String,reflect:!0})],tF.prototype,"flip",2),e9([ez({type:String,reflect:!0})],tF.prototype,"animation",2),e9([tm("label")],tF.prototype,"handleLabelChange",1),e9([tm(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],tF.prototype,"setIcon",1),tF=e9([eS("wa-icon")],tF);var tP=class extends Event{constructor(e){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}},tj=A`
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
`,tT=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}},tU=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}},tO=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}},tR=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}},tN=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},tV=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}},tB=A`
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
`;let tD=tf(class extends tg{constructor(e){if(super(e),3!==e.type&&1!==e.type&&4!==e.type)throw Error("The `live` directive is not allowed on child or event bindings");if(void 0!==e.strings)throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===ec||t===ed)return t;let i=e.element,o=e.name;if(3===e.type){if(t===i[o])return ec}else if(4===e.type){if(!!t===i.hasAttribute(o))return ec}else if(1===e.type&&i.getAttribute(o)===t+"")return ec;return((e,t=t_)=>e._$AH=t)(e),t}});var tq=class extends ti{constructor(){super(...arguments),this.localize=new tu(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&"treeitem"===e.getAttribute("role")}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&0===this.getChildrenItems().length,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new tN);let e=e3(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await e4(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new tV)}isNestedItem(){let e=this.parentElement;return!!e&&tq.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&0===this.getChildrenItems().length}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new tO),this.childrenContainer.hidden=!1;let e=e3(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await e4(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new tR)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new tU)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new tT)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>tq.isTreeItem(t)&&(e||!t.disabled)):[]}render(){var e,t,i,o,s;let n="rtl"===this.localize.dir(),a=!this.loading&&(!this.isLeaf||this.lazy);return el`
      <div
        part="base"
        class="${ty({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":a})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${ty({"expand-button":!0,"expand-button-visible":a})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${e=this.loading,t=()=>el` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,i=()=>el`
                  <wa-icon name=${n?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `,e?t(e):i?.(e)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${n?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${o=this.selectable,s=()=>el`
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
                ?checked="${tD(this.selected)}"
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
    `}};function tH(e,t=!1){function i(e){let t=e.getChildrenItems({includeDisabled:!1});if(t.length){let i=t.every(e=>e.selected),o=t.every(e=>!e.selected&&!e.indeterminate);e.selected=i,e.indeterminate=!i&&!o}}!function e(o){for(let i of o.getChildrenItems())i.selected=t?o.selected||i.selected:!i.disabled&&o.selected,e(i);t&&i(o)}(e),function e(t){let o=t.parentElement;tq.isTreeItem(o)&&(i(o),e(o))}(e)}tq.css=tB,e9([eF()],tq.prototype,"indeterminate",2),e9([eF()],tq.prototype,"isLeaf",2),e9([eF()],tq.prototype,"loading",2),e9([eF()],tq.prototype,"selectable",2),e9([ez({type:Boolean,reflect:!0})],tq.prototype,"expanded",2),e9([ez({type:Boolean,reflect:!0})],tq.prototype,"selected",2),e9([ez({type:Boolean,reflect:!0})],tq.prototype,"disabled",2),e9([ez({type:Boolean,reflect:!0})],tq.prototype,"lazy",2),e9([eM("slot:not([name])")],tq.prototype,"defaultSlot",2),e9([eM("slot[name=children]")],tq.prototype,"childrenSlot",2),e9([eM(".item")],tq.prototype,"itemElement",2),e9([eM(".children")],tq.prototype,"childrenContainer",2),e9([eM(".expand-button slot")],tq.prototype,"expandButtonSlot",2),e9([tm("loading",{waitUntilFirstUpdate:!0})],tq.prototype,"handleLoadingChange",1),e9([tm("disabled")],tq.prototype,"handleDisabledChange",1),e9([tm("expanded")],tq.prototype,"handleExpandedState",1),e9([tm("indeterminate")],tq.prototype,"handleIndeterminateStateChange",1),e9([tm("selected")],tq.prototype,"handleSelectedChange",1),e9([tm("expanded",{waitUntilFirstUpdate:!0})],tq.prototype,"handleExpandedChange",1),e9([tm("expanded",{waitUntilFirstUpdate:!0})],tq.prototype,"handleExpandAnimation",1),e9([tm("lazy",{waitUntilFirstUpdate:!0})],tq.prototype,"handleLazyChange",1),tq=e9([eS("wa-tree-item")],tq);var tW=class extends ti{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new tu(this),this.initTreeItem=e=>{e.updateComplete.then(()=>{e.selectable="multiple"===this.selection,["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(t=>{let i=e.querySelector(`[slot="${t}-icon"]`),o=this.getExpandButtonIcon(t);o&&(null===i?e.append(o):i.hasAttribute("data-default")&&i.replaceWith(o))})})},this.handleTreeChanged=e=>{for(let t of e){let e=[...t.addedNodes].filter(tq.isTreeItem),i=[...t.removedNodes].filter(tq.isTreeItem);e.forEach(this.initTreeItem),this.lastFocusedItem&&i.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;t&&this.contains(t)||(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),tq.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(e){let t=("expand"===e?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(t){let i=t.cloneNode(!0);return[i,...i.querySelectorAll("[id]")].forEach(e=>e.removeAttribute("id")),i.setAttribute("data-default",""),i.slot=`${e}-icon`,i}return null}selectItem(e){let t=[...this.selectedItems];if("multiple"===this.selection)e.selected=!e.selected,e.lazy&&(e.expanded=!0),tH(e);else if("single"===this.selection||e.isLeaf)for(let t of this.getAllTreeItems())t.selected=t===e;else"leaf"===this.selection&&(e.expanded=!e.expanded);let i=this.selectedItems;(t.length!==i.length||i.some(e=>!t.includes(e)))&&Promise.all(i.map(e=>e.updateComplete)).then(()=>{this.dispatchEvent(new tP({selection:i}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(e){e?.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(e=>["input","textarea"].includes(e?.tagName?.toLowerCase())))return;let t=this.getFocusableItems(),i=this.matches(":dir(ltr)"),o="rtl"===this.localize.dir();if(t.length>0){e.preventDefault();let s=t.findIndex(e=>e.matches(":focus")),n=t[s],a=e=>{var i;let o=t[i=t.length-1,(e=>Object.is(e,-0)?0:e)(e<0?0:e>i?i:e)];this.focusItem(o)},r=e=>{n.expanded=e};"ArrowDown"===e.key?a(s+1):"ArrowUp"===e.key?a(s-1):i&&"ArrowRight"===e.key||o&&"ArrowLeft"===e.key?!n||n.disabled||n.expanded||n.isLeaf&&!n.lazy?a(s+1):r(!0):i&&"ArrowLeft"===e.key||o&&"ArrowRight"===e.key?!n||n.disabled||n.isLeaf||!n.expanded?a(s-1):r(!1):"Home"===e.key?a(0):"End"===e.key?a(t.length-1):"Enter"!==e.key&&" "!==e.key||n.disabled||this.selectItem(n)}}handleClick(e){let t=e.target,i=t.closest("wa-tree-item"),o=e.composedPath().some(e=>e?.classList?.contains("expand-button"));i&&!i.disabled&&t===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e="multiple"===this.selection,t=this.getAllTreeItems();for(let i of(this.setAttribute("aria-multiselectable",e?"true":"false"),t))i.updateComplete.then(()=>{i.selectable=e});e&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(e=>{e.updateComplete.then(()=>{tH(e,!0)})}))}get selectedItems(){return this.getAllTreeItems().filter(e=>e.selected)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(e=>{if(e.disabled)return!1;let i=e.parentElement?.closest("[role=treeitem]");return i&&(!i.expanded||i.loading||t.has(i))&&t.add(e),!t.has(e)})}render(){return el`
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
    `}};tW.css=tj,e9([eM("slot:not([name])")],tW.prototype,"defaultSlot",2),e9([eM("slot[name=expand-icon]")],tW.prototype,"expandedIconSlot",2),e9([eM("slot[name=collapse-icon]")],tW.prototype,"collapsedIconSlot",2),e9([ez()],tW.prototype,"selection",2),e9([tm("selection")],tW.prototype,"handleSelectionChange",1),tW=e9([eS("wa-tree")],tW);var tY=A`
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
`,tK=A`
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
`,tZ=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=e=>{let t=e.target;(this.slotNames.includes("[default]")&&!t.name||t.name&&this.slotNames.includes(t.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&""!==e.textContent.trim())return!0;if(e.nodeType===Node.ELEMENT_NODE){if("wa-visually-hidden"===e.tagName.toLowerCase())return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return null!==this.host.querySelector(`:scope > [slot="${e}"]`)}test(e){return"[default]"===e?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}},tX=A`
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
`,tJ=class extends to{constructor(){super(...arguments),this.hasSlotController=new tZ(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let e=[((e={})=>{let{validationElement:t,validationProperty:i}=e;t||(t=Object.assign(document.createElement("input"),{required:!0})),i||(i="value");let o={observedAttributes:["required"],message:t.validationMessage,checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.required??e.hasAttribute("required")?(e[i]||(t.message="function"==typeof o.message?o.message(e):o.message||"",t.isValid=!1,t.invalidKeys.push("valueMissing")),t):t}};return o})({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){let e=this._value||"on";return this.checked?e:null}set value(e){this._value=e}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){this.hasInteracted||this.checked===this.defaultChecked||(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),e.has("defaultChecked")&&!this.hasInteracted&&(this.checked=this.defaultChecked),(e.has("value")||e.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=!!this.hint||!!e,i=!this.checked&&this.indeterminate;return el`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${this._value??ed}
            .indeterminate=${tD(this.indeterminate)}
            .checked=${tD(this.checked)}
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
        aria-hidden=${t?"false":"true"}
        class="${ty({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};tJ.css=[tY,tX,tK],tJ.shadowRootOptions={...to.shadowRootOptions,delegatesFocus:!0},e9([eM('input[type="checkbox"]')],tJ.prototype,"input",2),e9([ez()],tJ.prototype,"title",2),e9([ez({reflect:!0})],tJ.prototype,"name",2),e9([ez({reflect:!0})],tJ.prototype,"value",1),e9([ez({reflect:!0})],tJ.prototype,"size",2),e9([ez({type:Boolean})],tJ.prototype,"disabled",2),e9([ez({type:Boolean,reflect:!0})],tJ.prototype,"indeterminate",2),e9([ez({type:Boolean,attribute:!1})],tJ.prototype,"checked",2),e9([ez({type:Boolean,reflect:!0,attribute:"checked"})],tJ.prototype,"defaultChecked",2),e9([ez({type:Boolean,reflect:!0})],tJ.prototype,"required",2),e9([ez()],tJ.prototype,"hint",2),e9([tm("defaultChecked")],tJ.prototype,"handleDefaultCheckedChange",1),e9([tm(["checked","indeterminate"])],tJ.prototype,"handleStateChange",1),e9([tm("disabled")],tJ.prototype,"handleDisabledChange",1),tJ=e9([eS("wa-checkbox")],tJ);var tG=A`
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
`,tQ=class extends ti{constructor(){super(...arguments),this.localize=new tu(this)}render(){return el`
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
    `}};tQ.css=tG,tQ=e9([eS("wa-spinner")],tQ);let t2={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function t0(e){e.preventDefault()}function t1(e){e.stopImmediatePropagation()}customElements.define("jsdoc-tree",class extends tW{handleClick(e){let t=e.target,i=t.closest("jsdoc-tree-item"),o=e.composedPath().some(e=>e?.classList?.contains("expand-button"));i&&!i.disabled&&t===this.clickTarget&&(o?i.expanded=!i.expanded:this.selectItem(i))}}),customElements.define("jsdoc-tree-item",class extends tq{connectedCallback(){super.connectedCallback(),Object.entries(t2).forEach(([e,t])=>{let i=function([e,t]){let i=document.createElement("span");return i.setAttribute(eB,t),i.setAttribute("slot",e),i}([e,t]);this.prepend(i)}),eD()}firstUpdated(){for(let e of(super.firstUpdated(),this.shadowRoot.querySelectorAll("wa-icon")))e.remove()}}),document.querySelectorAll("wa-details").forEach(e=>{e.addEventListener("wa-hide",t0),e.addEventListener("wa-show",t0)}),document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(e=>{let t=e.firstElementChild;t?.localName==="a"&&t.addEventListener("click",t1)});