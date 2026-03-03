(()=>{var tr=Object.create;var Pe=Object.defineProperty;var rr=Object.getOwnPropertyDescriptor;var yo=Object.getOwnPropertyNames;var bo=Object.getPrototypeOf,vo=Object.prototype.hasOwnProperty;var ar=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),ue=t=>{throw TypeError(t)};var or=(t,e,r)=>e in t?Pe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var er=(t,e)=>Pe(t,"name",{value:e,configurable:!0});var Co=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var wo=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of yo(e))!vo.call(t,o)&&o!==r&&Pe(t,o,{get:()=>e[o],enumerable:!(a=rr(e,o))||a.enumerable});return t};var So=(t,e,r)=>(r=t!=null?tr(bo(t)):{},wo(e||!t||!t.__esModule?Pe(r,"default",{value:t,enumerable:!0}):r,t));var ze=t=>[,,,tr(t?.[ar("metadata")]??null)],sr=["class","method","getter","setter","accessor","field","value","get","set"],Ee=t=>t!==void 0&&typeof t!="function"?ue("Function expected"):t,Ao=(t,e,r,a,o)=>({kind:sr[t],name:e,metadata:a,addInitializer:s=>r._?ue("Already initialized"):o.push(Ee(s||null))}),ko=(t,e)=>or(e,ar("metadata"),t[3]),h=(t,e,r,a)=>{for(var o=0,s=t[e>>1],i=s&&s.length;o<i;o++)e&1?s[o].call(r):a=s[o].call(r,a);return a},_=(t,e,r,a,o,s)=>{var i,l,f,p,c,d=e&7,k=!!(e&8),x=!!(e&16),N=d>3?t.length+1:d?k?1:2:0,He=sr[d+5],Se=d>3&&(t[N-1]=[]),de=t[N]||(t[N]=[]),B=d&&(!x&&!k&&(o=o.prototype),d<5&&(d>3||!x)&&rr(d<4?o:{get[r](){return z(this,s)},set[r](R){return j(this,s,R)}},r));d?x&&d<4&&er(s,(d>2?"set ":d>1?"get ":"")+r):er(o,r);for(var Ae=a.length-1;Ae>=0;Ae--)p=Ao(d,r,f={},t[3],de),d&&(p.static=k,p.private=x,c=p.access={has:x?R=>Eo(o,R):R=>r in R},d^3&&(c.get=x?R=>(d^1?z:F)(R,o,d^4?s:B.get):R=>R[r]),d>2&&(c.set=x?(R,te)=>j(R,o,te,d^4?s:B.set):(R,te)=>R[r]=te)),l=(0,a[Ae])(d?d<4?x?s:B[He]:d>4?void 0:{get:B.get,set:B.set}:o,p),f._=1,d^4||l===void 0?Ee(l)&&(d>4?Se.unshift(l):d?x?s=l:B[He]=l:o=l):typeof l!="object"||l===null?ue("Object expected"):(Ee(i=l.get)&&(B.get=i),Ee(i=l.set)&&(B.set=i),Ee(i=l.init)&&Se.unshift(i));return d||ko(t,o),B&&Pe(o,r,B),x?d^4?s:B:o},Ve=(t,e,r)=>or(t,typeof e!="symbol"?e+"":e,r),nt=(t,e,r)=>e.has(t)||ue("Cannot "+r),Eo=(t,e)=>Object(e)!==e?ue('Cannot use the "in" operator on this value'):t.has(e),z=(t,e,r)=>(nt(t,e,"read from private field"),r?r.call(t):e.get(t)),S=(t,e,r)=>e.has(t)?ue("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),j=(t,e,r,a)=>(nt(t,e,"write to private field"),a?a.call(t,r):e.set(t,r),r),F=(t,e,r)=>(nt(t,e,"access private method"),r);var Nr=Co((Qi,Wr)=>{var Vr=typeof window<"u"&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(t){setTimeout(t,16)};function Vo(t){var e="startValue"in t?t.startValue:0,r="endValue"in t?t.endValue:1,a="durationMs"in t?t.durationMs:200,o=t.onComplete||function(){},s=a/16,i=(r-e)/s,l=Math.PI/s,f=e,p=0;function c(){p+=l,f+=i*Math.pow(Math.sin(p),2)*2,p<Math.PI?(t.onStep(f),Vr(c)):(t.onStep(r),o())}Vr(c)}Wr.exports=Vo});var ir={keyframes:[{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)"},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.3},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.1)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)",filter:"drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))",offset:.6},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.9},{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)",color:"var(--jsdoc-copy-icon-color)"}],options:{duration:800,easing:"ease-in-out"}},lr={keyframes:[{scale:1,opacity:1},{scale:3,opacity:.25,offset:.2},{scale:5,opacity:.0625,offset:.4},{scale:10,opacity:0}],options:{duration:300,easing:"ease-in-out"}};var We=globalThis,Ne=We.ShadowRoot&&(We.ShadyCSS===void 0||We.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),nr=new WeakMap,Te=class{constructor(e,r,a){if(this._$cssResult$=!0,a!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=r}get styleSheet(){let e=this.o,r=this.t;if(Ne&&e===void 0){let a=r!==void 0&&r.length===1;a&&(e=nr.get(r)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),a&&nr.set(r,e))}return e}toString(){return this.cssText}},fr=t=>new Te(typeof t=="string"?t:t+"",void 0,ft),y=(t,...e)=>{let r=t.length===1?t[0]:e.reduce((a,o,s)=>a+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+t[s+1],t[0]);return new Te(r,t,ft)},dr=(t,e)=>{if(Ne)t.adoptedStyleSheets=e.map(r=>r instanceof CSSStyleSheet?r:r.styleSheet);else for(let r of e){let a=document.createElement("style"),o=We.litNonce;o!==void 0&&a.setAttribute("nonce",o),a.textContent=r.cssText,t.appendChild(a)}},dt=Ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let r="";for(let a of e.cssRules)r+=a.cssText;return fr(r)})(t):t;var{is:To,defineProperty:_o,getOwnPropertyDescriptor:Lo,getOwnPropertyNames:$o,getOwnPropertySymbols:Mo,getPrototypeOf:Ro}=Object,Q=globalThis,ur=Q.trustedTypes,Do=ur?ur.emptyScript:"",Bo=Q.reactiveElementPolyfillSupport,_e=(t,e)=>t,Le={toAttribute(t,e){switch(e){case Boolean:t=t?Do:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=t!==null;break;case Number:r=t===null?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch{r=null}}return r}},je=(t,e)=>!To(t,e),pr={attribute:!0,type:String,converter:Le,reflect:!1,useDefault:!1,hasChanged:je};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Q.litPropertyMetadata??(Q.litPropertyMetadata=new WeakMap);var X=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,r=pr){if(r.state&&(r.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((r=Object.create(r)).wrapped=!0),this.elementProperties.set(e,r),!r.noAccessor){let a=Symbol(),o=this.getPropertyDescriptor(e,a,r);o!==void 0&&_o(this.prototype,e,o)}}static getPropertyDescriptor(e,r,a){let{get:o,set:s}=Lo(this.prototype,e)??{get(){return this[r]},set(i){this[r]=i}};return{get:o,set(i){let l=o?.call(this);s?.call(this,i),this.requestUpdate(e,l,a)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??pr}static _$Ei(){if(this.hasOwnProperty(_e("elementProperties")))return;let e=Ro(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_e("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_e("properties"))){let r=this.properties,a=[...$o(r),...Mo(r)];for(let o of a)this.createProperty(o,r[o])}let e=this[Symbol.metadata];if(e!==null){let r=litPropertyMetadata.get(e);if(r!==void 0)for(let[a,o]of r)this.elementProperties.set(a,o)}this._$Eh=new Map;for(let[r,a]of this.elementProperties){let o=this._$Eu(r,a);o!==void 0&&this._$Eh.set(o,r)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let r=[];if(Array.isArray(e)){let a=new Set(e.flat(1/0).reverse());for(let o of a)r.unshift(dt(o))}else e!==void 0&&r.push(dt(e));return r}static _$Eu(e,r){let a=r.attribute;return a===!1?void 0:typeof a=="string"?a:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,r=this.constructor.elementProperties;for(let a of r.keys())this.hasOwnProperty(a)&&(e.set(a,this[a]),delete this[a]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return dr(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,r,a){this._$AK(e,a)}_$ET(e,r){let a=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,a);if(o!==void 0&&a.reflect===!0){let s=(a.converter?.toAttribute!==void 0?a.converter:Le).toAttribute(r,a.type);this._$Em=e,s==null?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,r){let a=this.constructor,o=a._$Eh.get(e);if(o!==void 0&&this._$Em!==o){let s=a.getPropertyOptions(o),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Le;this._$Em=o;let l=i.fromAttribute(r,s.type);this[o]=l??this._$Ej?.get(o)??l,this._$Em=null}}requestUpdate(e,r,a,o=!1,s){if(e!==void 0){let i=this.constructor;if(o===!1&&(s=this[e]),a??(a=i.getPropertyOptions(e)),!((a.hasChanged??je)(s,r)||a.useDefault&&a.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,a))))return;this.C(e,r,a)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,r,{useDefault:a,reflect:o,wrapped:s},i){a&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??r??this[e]),s!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||a||(r=void 0),this._$AL.set(e,r)),o===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(r){Promise.reject(r)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[o,s]of this._$Ep)this[o]=s;this._$Ep=void 0}let a=this.constructor.elementProperties;if(a.size>0)for(let[o,s]of a){let{wrapped:i}=s,l=this[o];i!==!0||this._$AL.has(o)||l===void 0||this.C(o,void 0,s,l)}}let e=!1,r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),this._$EO?.forEach(a=>a.hostUpdate?.()),this.update(r)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(r)}willUpdate(e){}_$AE(e){this._$EO?.forEach(r=>r.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(r=>this._$ET(r,this[r]))),this._$EM()}updated(e){}firstUpdated(e){}};X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[_e("elementProperties")]=new Map,X[_e("finalized")]=new Map,Bo?.({ReactiveElement:X}),(Q.reactiveElementVersions??(Q.reactiveElementVersions=[])).push("2.1.2");var Me=globalThis,mr=t=>t,Ge=Me.trustedTypes,cr=Ge?Ge.createPolicy("lit-html",{createHTML:t=>t}):void 0,pt="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+K,Fo=`<${mt}>`,oe=document,Re=()=>oe.createComment(""),De=t=>t===null||typeof t!="object"&&typeof t!="function",ct=Array.isArray,vr=t=>ct(t)||typeof t?.[Symbol.iterator]=="function",ut=`[ 	
\f\r]`,$e=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,hr=/-->/g,xr=/>/g,re=RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gr=/'/g,yr=/"/g,Cr=/^(?:script|style|textarea|title)$/i,ht=t=>(e,...r)=>({_$litType$:t,strings:e,values:r}),b=ht(1),Ws=ht(2),Ns=ht(3),I=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),br=new WeakMap,ae=oe.createTreeWalker(oe,129);function wr(t,e){if(!ct(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return cr!==void 0?cr.createHTML(e):e}var Sr=(t,e)=>{let r=t.length-1,a=[],o,s=e===2?"<svg>":e===3?"<math>":"",i=$e;for(let l=0;l<r;l++){let f=t[l],p,c,d=-1,k=0;for(;k<f.length&&(i.lastIndex=k,c=i.exec(f),c!==null);)k=i.lastIndex,i===$e?c[1]==="!--"?i=hr:c[1]!==void 0?i=xr:c[2]!==void 0?(Cr.test(c[2])&&(o=RegExp("</"+c[2],"g")),i=re):c[3]!==void 0&&(i=re):i===re?c[0]===">"?(i=o??$e,d=-1):c[1]===void 0?d=-2:(d=i.lastIndex-c[2].length,p=c[1],i=c[3]===void 0?re:c[3]==='"'?yr:gr):i===yr||i===gr?i=re:i===hr||i===xr?i=$e:(i=re,o=void 0);let x=i===re&&t[l+1].startsWith("/>")?" ":"";s+=i===$e?f+Fo:d>=0?(a.push(p),f.slice(0,d)+pt+f.slice(d)+K+x):f+K+(d===-2?l:x)}return[wr(t,s+(t[r]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),a]},Be=class t{constructor({strings:e,_$litType$:r},a){let o;this.parts=[];let s=0,i=0,l=e.length-1,f=this.parts,[p,c]=Sr(e,r);if(this.el=t.createElement(p,a),ae.currentNode=this.el.content,r===2||r===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(o=ae.nextNode())!==null&&f.length<l;){if(o.nodeType===1){if(o.hasAttributes())for(let d of o.getAttributeNames())if(d.endsWith(pt)){let k=c[i++],x=o.getAttribute(d).split(K),N=/([.?@])?(.*)/.exec(k);f.push({type:1,index:s,name:N[2],strings:x,ctor:N[1]==="."?Ke:N[1]==="?"?Ye:N[1]==="@"?Ze:ie}),o.removeAttribute(d)}else d.startsWith(K)&&(f.push({type:6,index:s}),o.removeAttribute(d));if(Cr.test(o.tagName)){let d=o.textContent.split(K),k=d.length-1;if(k>0){o.textContent=Ge?Ge.emptyScript:"";for(let x=0;x<k;x++)o.append(d[x],Re()),ae.nextNode(),f.push({type:2,index:++s});o.append(d[k],Re())}}}else if(o.nodeType===8)if(o.data===mt)f.push({type:2,index:s});else{let d=-1;for(;(d=o.data.indexOf(K,d+1))!==-1;)f.push({type:7,index:s}),d+=K.length-1}s++}}static createElement(e,r){let a=oe.createElement("template");return a.innerHTML=e,a}};function se(t,e,r=t,a){if(e===I)return e;let o=a!==void 0?r._$Co?.[a]:r._$Cl,s=De(e)?void 0:e._$litDirective$;return o?.constructor!==s&&(o?._$AO?.(!1),s===void 0?o=void 0:(o=new s(t),o._$AT(t,r,a)),a!==void 0?(r._$Co??(r._$Co=[]))[a]=o:r._$Cl=o),o!==void 0&&(e=se(t,o._$AS(t,e.values),o,a)),e}var Xe=class{constructor(e,r){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=r}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:r},parts:a}=this._$AD,o=(e?.creationScope??oe).importNode(r,!0);ae.currentNode=o;let s=ae.nextNode(),i=0,l=0,f=a[0];for(;f!==void 0;){if(i===f.index){let p;f.type===2?p=new pe(s,s.nextSibling,this,e):f.type===1?p=new f.ctor(s,f.name,f.strings,this,e):f.type===6&&(p=new Qe(s,this,e)),this._$AV.push(p),f=a[++l]}i!==f?.index&&(s=ae.nextNode(),i++)}return ae.currentNode=oe,o}p(e){let r=0;for(let a of this._$AV)a!==void 0&&(a.strings!==void 0?(a._$AI(e,a,r),r+=a.strings.length-2):a._$AI(e[r])),r++}},pe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,r,a,o){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=e,this._$AB=r,this._$AM=a,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,r=this._$AM;return r!==void 0&&e?.nodeType===11&&(e=r.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,r=this){e=se(this,e,r),De(e)?e===w||e==null||e===""?(this._$AH!==w&&this._$AR(),this._$AH=w):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):vr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==w&&De(this._$AH)?this._$AA.nextSibling.data=e:this.T(oe.createTextNode(e)),this._$AH=e}$(e){let{values:r,_$litType$:a}=e,o=typeof a=="number"?this._$AC(e):(a.el===void 0&&(a.el=Be.createElement(wr(a.h,a.h[0]),this.options)),a);if(this._$AH?._$AD===o)this._$AH.p(r);else{let s=new Xe(o,this),i=s.u(this.options);s.p(r),this.T(i),this._$AH=s}}_$AC(e){let r=br.get(e.strings);return r===void 0&&br.set(e.strings,r=new Be(e)),r}k(e){ct(this._$AH)||(this._$AH=[],this._$AR());let r=this._$AH,a,o=0;for(let s of e)o===r.length?r.push(a=new t(this.O(Re()),this.O(Re()),this,this.options)):a=r[o],a._$AI(s),o++;o<r.length&&(this._$AR(a&&a._$AB.nextSibling,o),r.length=o)}_$AR(e=this._$AA.nextSibling,r){for(this._$AP?.(!1,!0,r);e!==this._$AB;){let a=mr(e).nextSibling;mr(e).remove(),e=a}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,r,a,o,s){this.type=1,this._$AH=w,this._$AN=void 0,this.element=e,this.name=r,this._$AM=o,this.options=s,a.length>2||a[0]!==""||a[1]!==""?(this._$AH=Array(a.length-1).fill(new String),this.strings=a):this._$AH=w}_$AI(e,r=this,a,o){let s=this.strings,i=!1;if(s===void 0)e=se(this,e,r,0),i=!De(e)||e!==this._$AH&&e!==I,i&&(this._$AH=e);else{let l=e,f,p;for(e=s[0],f=0;f<s.length-1;f++)p=se(this,l[a+f],r,f),p===I&&(p=this._$AH[f]),i||(i=!De(p)||p!==this._$AH[f]),p===w?e=w:e!==w&&(e+=(p??"")+s[f+1]),this._$AH[f]=p}i&&!o&&this.j(e)}j(e){e===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ke=class extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===w?void 0:e}},Ye=class extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==w)}},Ze=class extends ie{constructor(e,r,a,o,s){super(e,r,a,o,s),this.type=5}_$AI(e,r=this){if((e=se(this,e,r,0)??w)===I)return;let a=this._$AH,o=e===w&&a!==w||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==w&&(a===w||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Qe=class{constructor(e,r,a){this.element=e,this.type=6,this._$AN=void 0,this._$AM=r,this.options=a}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}},Ar={M:pt,P:K,A:mt,C:1,L:Sr,R:Xe,D:vr,V:se,I:pe,H:ie,N:Ye,U:Ze,B:Ke,F:Qe},Io=Me.litHtmlPolyfillSupport;Io?.(Be,pe),(Me.litHtmlVersions??(Me.litHtmlVersions=[])).push("3.3.2");var kr=(t,e,r)=>{let a=r?.renderBefore??e,o=a._$litPart$;if(o===void 0){let s=r?.renderBefore??null;a._$litPart$=o=new pe(e.insertBefore(Re(),s),s,void 0,r??{})}return o._$AI(t),o};var Fe=globalThis,U=class extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var r;let e=super.createRenderRoot();return(r=this.renderOptions).renderBefore??(r.renderBefore=e.firstChild),e}update(e){let r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=kr(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};U._$litElement$=!0,U.finalized=!0,Fe.litElementHydrateSupport?.({LitElement:U});var qo=Fe.litElementPolyfillSupport;qo?.({LitElement:U});(Fe.litElementVersions??(Fe.litElementVersions=[])).push("4.2.2");var $=t=>(e,r)=>{r!==void 0?r.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Uo={attribute:!0,type:String,converter:Le,reflect:!1,hasChanged:je},Oo=(t=Uo,e,r)=>{let{kind:a,metadata:o}=r,s=globalThis.litPropertyMetadata.get(o);if(s===void 0&&globalThis.litPropertyMetadata.set(o,s=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(r.name,t),a==="accessor"){let{name:i}=r;return{set(l){let f=e.get.call(this);e.set.call(this,l),this.requestUpdate(i,f,t,!0,l)},init(l){return l!==void 0&&this.C(i,void 0,t,l),l}}}if(a==="setter"){let{name:i}=r;return function(l){let f=this[i];e.call(this,l),this.requestUpdate(i,f,t,!0,l)}}throw Error("Unsupported decorator location: "+a)};function u(t){return(e,r)=>typeof r=="object"?Oo(t,e,r):((a,o,s)=>{let i=o.hasOwnProperty(s);return o.constructor.createProperty(s,a),i?Object.getOwnPropertyDescriptor(o,s):void 0})(t,e,r)}var J=(t,e,r)=>(r.configurable=!0,r.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,r),r);function v(t,e){return(r,a,o)=>{let s=i=>i.renderRoot?.querySelector(t)??null;if(e){let{get:i,set:l}=typeof a=="object"?r:o??(()=>{let f=Symbol();return{get(){return this[f]},set(p){this[f]=p}}})();return J(r,a,{get(){let f=i.call(this);return f===void 0&&(f=s(this),(f!==null||this.hasUpdated)&&l.call(this,f)),f}})}return J(r,a,{get(){return s(this)}})}}function V(t){return u({...t,state:!0,attribute:!1})}var Je={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Er=([t,e,r])=>{let a=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(o=>{a.setAttribute(o,String(e[o]))}),r?.length&&r.forEach(o=>{let s=Er(o);a.appendChild(s)}),a},Pr=(t,e={})=>{let a={...Je,...e};return Er(["svg",a,t])};var Tr=t=>{for(let e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var _r=(...t)=>t.filter((e,r,a)=>!!e&&e.trim()!==""&&a.indexOf(e)===r).join(" ").trim();var Lr=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,r,a)=>a?a.toUpperCase():r.toLowerCase());var $r=t=>{let e=Lr(t);return e.charAt(0).toUpperCase()+e.slice(1)};var Ho=t=>Array.from(t.attributes).reduce((e,r)=>(e[r.name]=r.value,e),{}),Mr=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",xt=(t,{nameAttr:e,icons:r,attrs:a})=>{let o=t.getAttribute(e);if(o==null)return;let s=$r(o),i=r[s];if(!i)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let l=Ho(t),f=Tr(l)?{}:{"aria-hidden":"true"},p={...Je,"data-lucide":o,...f,...a,...l},c=Mr(l),d=Mr(a),k=_r("lucide",`lucide-${o}`,...c,...d);k&&Object.assign(p,{class:k});let x=Pr(i,p);return t.parentNode?.replaceChild(x,t)};var gt=[["path",{d:"m9 18 6-6-6-6"}]];var yt=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var bt=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]];var vt=({icons:t={},nameAttr:e="data-lucide",attrs:r={},root:a=document,inTemplates:o}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof a>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(a.querySelectorAll(`[${e}]`)).forEach(i=>xt(i,{nameAttr:e,icons:t,attrs:r})),o&&Array.from(a.querySelectorAll("template")).forEach(l=>vt({icons:t,nameAttr:e,attrs:r,root:l.content,inTemplates:o})),e==="data-lucide"){let i=a.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach(l=>xt(l,{nameAttr:"icon-name",icons:t,attrs:r})))}};var Rr="data-icon";function Dr([t,e]){let r=document.createElement("span");return r.setAttribute(Rr,e),r.setAttribute("slot",t),r}function et(t){vt({icons:{ChevronRight:gt,Link:yt,Unlink:bt},attrs:{width:16,height:16},nameAttr:Rr,root:t?.root})}var Br,Fr,Ir,qr,Ur,Or,Hr,zr,A,Ct,wt,St,At,kt,Et;zr=[$("copy-url")];var O=class extends(Hr=U,Or=[v('slot[name="copy-icon"]')],Ur=[v('slot[name="success-icon"]')],qr=[u()],Ir=[u()],Fr=[u()],Br=[V()],Hr){constructor(){super(...arguments);S(this,Ct,h(A,8,this)),h(A,11,this);S(this,wt,h(A,12,this)),h(A,15,this);S(this,St,h(A,16,this,"")),h(A,19,this);S(this,At,h(A,20,this,lr)),h(A,23,this);S(this,kt,h(A,24,this,ir)),h(A,27,this);S(this,Et,h(A,28,this,!1)),h(A,31,this)}async handleCopy(){let r,a;this.isCopying||(this.isCopying=!0,r=new URL(window.location.href),r.hash=this.from,a=r.href,a&&(await navigator.clipboard.writeText(a),await this.animateIcon()))}firstUpdated(){super.firstUpdated(),et({root:this.shadowRoot})}render(){return b`
      <button class="copy-button__button" part="button" type="button" @click=${this.handleCopy}>
        <slot part="copy-icon" name="copy-icon">
          <span data-icon="link" slot="copy-icon"></span>
        </slot>
        <slot part="success-icon" name="success-icon">
          <span data-icon="link" slot="success-icon"></span>
        </slot>
      </button>
    `}async animateIcon(){let{matches:r}=window.matchMedia("(prefers-reduced-motion: reduce)"),a=r?this.showAnimationReducedMotion:this.showAnimation;this.copyIcon.hidden=!1,await this.successIcon.animate(a.keyframes,a.options).finished,document.documentElement.style.setProperty("--jsdoc-copy-icon-opacity",0),this.copyIcon.hidden=!0,this.isCopying=!1}};A=ze(Hr),Ct=new WeakMap,wt=new WeakMap,St=new WeakMap,At=new WeakMap,kt=new WeakMap,Et=new WeakMap,_(A,4,"copyIcon",Or,O,Ct),_(A,4,"successIcon",Ur,O,wt),_(A,4,"from",qr,O,St),_(A,4,"showAnimation",Ir,O,At),_(A,4,"showAnimationReducedMotion",Fr,O,kt),_(A,4,"isCopying",Br,O,Et),O=_(A,0,"CopyUrl",zr,O),Ve(O,"styles",[y`
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
    `]),h(A,1,O);var zo=["copy-url","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let t=zo.filter(e=>document.querySelector(e));await Promise.allSettled(t.map(e=>customElements.whenDefined(e)));for(let e of t)for(let r of document.querySelectorAll(e))r.classList.add("ready")})();var Gr=So(Nr(),1),jr="--navbar-scroll-margin";function Pt(t){let e=getComputedStyle(document.body),r;return t&&(r=getComputedStyle(t).getPropertyValue(jr)),r||(r=e.getPropertyValue(jr)),r=Number(r.replace("rem",""))*parseFloat(e.fontSize),Math.ceil(r/5)*5}(()=>{let t={PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SPACE:"Space"};function e(s,i){let l=Pt(s);return i-l}function r(s){(0,Gr.default)({durationMs:200,startValue:window.scrollY,endValue:s,onStep:i=>window.scroll({behavior:"instant",top:i})})}function a(s,i,l){let f;i&&(f=document.getElementById(i),f&&(s.preventDefault(),r(e(f,f.offsetTop)),window.history.pushState(null,null,l)))}function o(s){return s.substring(1)}window.addEventListener("load",s=>{let i=o(document.location.hash);a(s,i,document.location.href)}),window.addEventListener("hashchange",s=>{let i=new URL(s.newURL),l=o(i.hash);a(s,l,i.hash)}),document.addEventListener("keydown",s=>{let i=s.code,l;i!==t.SPACE&&i!==t.PAGE_DOWN&&i!==t.PAGE_UP||(s.preventDefault(),s.stopImmediatePropagation(),l=e(null,window.innerHeight),i===t.PAGE_UP?r(window.scrollY-l):r(window.scrollY+l))})})();var Wo;function Xr(t){return(e,r)=>J(e,r,{get(){return(this.renderRoot??Wo??(Wo=document.createDocumentFragment())).querySelectorAll(t)}})}function No(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var le=No;var jo=typeof global=="object"&&global&&global.Object===Object&&global,Kr=jo;var Go=typeof self=="object"&&self&&self.Object===Object&&self,Xo=Kr||Go||Function("return this")(),tt=Xo;var Ko=function(){return tt.Date.now()},rt=Ko;var Yo=/\s/;function Zo(t){for(var e=t.length;e--&&Yo.test(t.charAt(e)););return e}var Yr=Zo;var Qo=/^\s+/;function Jo(t){return t&&t.slice(0,Yr(t)+1).replace(Qo,"")}var Zr=Jo;var es=tt.Symbol,me=es;var Qr=Object.prototype,ts=Qr.hasOwnProperty,rs=Qr.toString,Ie=me?me.toStringTag:void 0;function as(t){var e=ts.call(t,Ie),r=t[Ie];try{t[Ie]=void 0;var a=!0}catch{}var o=rs.call(t);return a&&(e?t[Ie]=r:delete t[Ie]),o}var Jr=as;var os=Object.prototype,ss=os.toString;function is(t){return ss.call(t)}var ea=is;var ls="[object Null]",ns="[object Undefined]",ta=me?me.toStringTag:void 0;function fs(t){return t==null?t===void 0?ns:ls:ta&&ta in Object(t)?Jr(t):ea(t)}var ra=fs;function ds(t){return t!=null&&typeof t=="object"}var aa=ds;var us="[object Symbol]";function ps(t){return typeof t=="symbol"||aa(t)&&ra(t)==us}var oa=ps;var sa=NaN,ms=/^[-+]0x[0-9a-f]+$/i,cs=/^0b[01]+$/i,hs=/^0o[0-7]+$/i,xs=parseInt;function gs(t){if(typeof t=="number")return t;if(oa(t))return sa;if(le(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=le(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Zr(t);var r=cs.test(t);return r||hs.test(t)?xs(t.slice(2),r?2:8):ms.test(t)?sa:+t}var Tt=gs;var ys="Expected a function",bs=Math.max,vs=Math.min;function Cs(t,e,r){var a,o,s,i,l,f,p=0,c=!1,d=!1,k=!0;if(typeof t!="function")throw new TypeError(ys);e=Tt(e)||0,le(r)&&(c=!!r.leading,d="maxWait"in r,s=d?bs(Tt(r.maxWait)||0,e):s,k="trailing"in r?!!r.trailing:k);function x(P){var Z=a,ke=o;return a=o=void 0,p=P,i=t.apply(ke,Z),i}function N(P){return p=P,l=setTimeout(de,e),c?x(P):i}function He(P){var Z=P-f,ke=P-p,Jt=e-Z;return d?vs(Jt,s-ke):Jt}function Se(P){var Z=P-f,ke=P-p;return f===void 0||Z>=e||Z<0||d&&ke>=s}function de(){var P=rt();if(Se(P))return B(P);l=setTimeout(de,He(P))}function B(P){return l=void 0,k&&a?x(P):(a=o=void 0,i)}function Ae(){l!==void 0&&clearTimeout(l),p=0,a=f=o=l=void 0}function R(){return l===void 0?i:B(rt())}function te(){var P=rt(),Z=Se(P);if(a=arguments,o=this,f=P,Z){if(l===void 0)return N(f);if(d)return clearTimeout(l),l=setTimeout(de,e),x(f)}return l===void 0&&(l=setTimeout(de,e)),i}return te.cancel=Ae,te.flush=R,te}var ia=Cs;var ws="Expected a function";function Ss(t,e,r){var a=!0,o=!0;if(typeof t!="function")throw new TypeError(ws);return le(r)&&(a="leading"in r?!!r.leading:a,o="trailing"in r?!!r.trailing:o),ia(t,e,{leading:a,maxWait:e,trailing:o})}var la=Ss;var As="h2, h3, h4, h5, h6";function ga(t,e,r=[]){for(let a of t)a instanceof Comment||(a instanceof Text?r.push(a.textContent):a.matches(e)&&ga(a.childNodes,e,r));return r}function Ft(t){if(t?.localName.startsWith("h")){let e=t.localName.substring(1),r=parseInt(e,10);if(r>=1&&r<=6)return r}return null}function ks(t){return e=>{for(let r of e)if(r.target.parentElement.closest(t.levels)){t.updateTree();break}}}function Es(t,e){let r=`:not(copy-url, .${e.hideFromNavClass})`,a;return t?(a=ga(t.childNodes,r),a.join("").trim()):null}var It=class{constructor(e,r){this.children=[],this.hideFromNav=r.isHidden(e),this.id=e?.id,this.level=Ft(e),this.text=Es(e,r)}},na,fa,da,ua,pa,ma,ca,ha,xa,g,_t,Lt,$t,Mt,Rt,Dt,Bt,ce,he,xe,ge,ye,C,qt,ya,ba,va,Ca,Ut,wa,Ot,Sa;xa=[$("jsdoc-outline")];var q=class extends(ha=U,ca=[v('slot[name="contents"]')],ma=[u({attribute:"hide-from-nav-class"})],pa=[u({reflect:!0})],ua=[Xr("a")],da=[v('slot[name="title"]')],fa=[u({reflect:!0})],na=[u()],ha){constructor(){super();S(this,C);S(this,_t,h(g,8,this)),h(g,11,this);S(this,Lt,h(g,12,this,"hide-from-nav")),h(g,15,this);S(this,$t,h(g,16,this,As)),h(g,19,this);S(this,Mt,h(g,20,this)),h(g,23,this);S(this,Rt,h(g,24,this)),h(g,27,this);S(this,Dt,h(g,28,this,"On this page")),h(g,31,this);S(this,Bt,h(g,32,this)),h(g,35,this);S(this,ce);S(this,he);S(this,xe);S(this,ge);S(this,ye);j(this,ce,null),j(this,he,new WeakMap),j(this,xe,null),j(this,ye,new WeakSet)}connectedCallback(){super.connectedCallback(),this.updateTree()}firstUpdated(){super.firstUpdated(),j(this,xe,new MutationObserver(ks(this))),F(this,C,ba).call(this);let r=Pt(),a=r/2;j(this,ce,new IntersectionObserver(o=>F(this,C,ya).call(this,o,z(this,ye)),{rootMargin:`-${r}px 0px -${a}px 0px`})),F(this,C,Ot).call(this),F(this,C,va).call(this)}isHidden(r){return Array.from(r.classList).includes(this.hideFromNavClass)}render(){return b`
      <nav class="container" aria-labelledby="title">
        <slot name="title">
          <h2 part="title" class="title">${this.titleText}</h2>
        </slot>
        <slot name="contents">
          <ul part="contents" class="contents">
            ${F(this,C,Ut).call(this,this.tree??[])}
          </ul>
        </slot>
        <slot></slot>
      </nav>
    `}updateTree(){return z(this,ge)||j(this,ge,la(F(this,C,Sa),500)),z(this,ge).call(this)}};g=ze(ha),_t=new WeakMap,Lt=new WeakMap,$t=new WeakMap,Mt=new WeakMap,Rt=new WeakMap,Dt=new WeakMap,Bt=new WeakMap,ce=new WeakMap,he=new WeakMap,xe=new WeakMap,ge=new WeakMap,ye=new WeakMap,C=new WeakSet,qt=function(r){let a=[];for(;r.length;){let o=r.shift();if(this.isHidden(o))continue;let s=new It(o,this),i=F(this,C,wa).call(this,r,o);i.length&&(s.children=F(this,C,qt).call(this,i)),a.push(s)}return a},ya=function(r,a){r.forEach(o=>{o.isIntersecting?a.add(o.target):a.delete(o.target)}),F(this,C,Ot).call(this)},ba=function(){z(this,xe).observe(document.body,{attributes:!0,characterData:!0,childList:!0,subtree:!0})},va=function(){for(let r of Array.from(this.links)){let a=r.hash.slice(1),o=a?document.getElementById(a):null;o&&(z(this,he).set(r,o),z(this,ce).observe(o))}},Ca=function(r){return r?b`
      <ul class="contents nested">
        ${F(this,C,Ut).call(this,r)}
      </ul>
    `:b``},Ut=function(r){let a=[];for(let o of r)a.push(b`
        <li>
          <p><a href="#${o.id}">${o.text}</a></p>
          ${F(this,C,Ca).call(this,o.children)}
        </li>
      `);return a},wa=function(r,a){let o=[],s=Ft(a);for(;Ft(r[0])>s;){let i=r.shift();this.isHidden(i)||o.push(i)}return o},Ot=function(){let r=Array.from(this.links);r.find(a=>{let o=z(this,he).get(a);return o&&z(this,ye).has(o)?(r.forEach(s=>s.classList.toggle("current",s===a)),!0):!1})},Sa=function(){this.tree=F(this,C,qt).call(this,Array.from(document.querySelectorAll(`.jsdoc-content ${this.levels}`)))},_(g,4,"contents",ca,q,_t),_(g,4,"hideFromNavClass",ma,q,Lt),_(g,4,"levels",pa,q,$t),_(g,4,"links",ua,q,Mt),_(g,4,"title",da,q,Rt),_(g,4,"titleText",fa,q,Dt),_(g,4,"tree",na,q,Bt),q=_(g,0,"Outline",xa,q),Ve(q,"styles",[y`
      :host {
        --outline-font-size: calc(var(--jsdoc-font-font-size-base) * 0.875);
        --outline-line-height: 0.825rem;
      }

      .contents {
        font-family: var(--jsdoc-font-body-font);
        font-size: var(--outline-font-size);
        line-height: var(--outline-line-height);
        margin-block: revert;
        margin-inline-start: 1rem;
        padding-inline-start: 0;
      }

      .contents li {
        list-style-type: none;

        a {
          color: inherit;
          text-decoration: none;

          &:focus,
          &:hover {
            color: var(--jsdoc-color-sky-700);
          }
        }

        .current {
          color: var(--jsdoc-color-sky-700);
          font-weight: bold;
        }
      }

      .nested {
        padding-inline-start: 0.625rem;
      }

      .title {
        font-family: var(--jsdoc-font-body-font);
        font-size: var(--jsdoc-font-font-size-base);
        font-weight: bold;
        line-height: var(--outline-line-height);
        margin-inline-start: 1rem;
      }
    `]),h(g,1,q);var Aa=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var ka=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Ea=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Pa=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var Ta=y`
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
`;function Ht(t,e){return new Promise(r=>{function a(o){o.target===t&&(t.removeEventListener(e,a),r())}t.addEventListener(e,a)})}async function be(t,e,r){return t.animate(e,r).finished.catch(()=>{})}function ve(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?(parseFloat(t)||0)*1e3:parseFloat(t)||0}var _a=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var Ps=Object.defineProperty,Ts=Object.getOwnPropertyDescriptor,La=t=>{throw TypeError(t)},n=(t,e,r,a)=>{for(var o=a>1?void 0:a?Ts(e,r):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(o=(a?i(e,r,o):i(o))||o);return a&&o&&Ps(e,r,o),o},$a=(t,e,r)=>e.has(t)||La("Cannot "+r),Ma=(t,e,r)=>($a(t,e,"read from private field"),r?r.call(t):e.get(t)),Ra=(t,e,r)=>e.has(t)?La("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),Da=(t,e,r,a)=>($a(t,e,"write to private field"),a?a.call(t,r):e.set(t,r),r);var _s=y`
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
`,at,D=class extends U{constructor(){super(),Ra(this,at,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,r)=>{if(this.internals?.states)try{r?this.internals.states.add(e):this.internals.states.delete(e)}catch(a){if(String(a).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw a}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,r]of t.elementProperties)r.default==="inherit"&&r.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${r.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[_s,...t]}attributeChangedCallback(t,e,r){Ma(this,at)||(this.constructor.elementProperties.forEach((a,o)=>{a.reflect&&this[o]!=null&&this.initialReflectedProperties.set(o,this[o])}),Da(this,at,!0)),super.attributeChangedCallback(t,e,r)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,r)=>{t.has(r)&&this[r]==null&&(this[r]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let r=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});r.error=e,this.dispatchEvent(r)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};at=new WeakMap;n([u()],D.prototype,"dir",2);n([u()],D.prototype,"lang",2);n([u({type:Boolean,reflect:!0,attribute:"did-ssr"})],D.prototype,"didSSR",2);var Ls=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),H=class extends D{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new _a))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Ls()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let r of e.observedAttributes)t.add(r);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){let e=this.value;if(Array.isArray(e)){if(this.name){let r=new FormData;for(let a of e)r.append(this.name,a);this.setValue(r,r)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],r=t[1],a=t[2];a||(a=this.validationTarget),this.internals.setValidity(e,r,a||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,r=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&r),this.customStates.set("user-valid",e&&r)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,r]=t;this.internals.setFormValue(e,r)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},r=this.validationTarget||this.input||void 0,a="";for(let o of t){let{isValid:s,message:i,invalidKeys:l}=o.checkValidity(this);s||(a||(a=i),l?.length>=0&&l.forEach(f=>e[f]=!0))}a||(a=this.validationMessage),this.setValidity(e,a,r)}};H.formAssociated=!0;n([u({reflect:!0})],H.prototype,"name",2);n([u({type:Boolean})],H.prototype,"disabled",2);n([u({state:!0,attribute:!1})],H.prototype,"valueHasChanged",2);n([u({state:!0,attribute:!1})],H.prototype,"hasInteracted",2);n([u({attribute:"custom-error",reflect:!0})],H.prototype,"customError",2);n([u({attribute:!1,state:!0,type:Object})],H.prototype,"validity",1);var zt=new Set,Ce=new Map,ne,Vt="ltr",Wt="en",Ba=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ba){let t=new MutationObserver(Fa);Vt=document.documentElement.dir||"ltr",Wt=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function qe(...t){t.map(e=>{let r=e.$code.toLowerCase();Ce.has(r)?Ce.set(r,Object.assign(Object.assign({},Ce.get(r)),e)):Ce.set(r,e),ne||(ne=e)}),Fa()}function Fa(){Ba&&(Vt=document.documentElement.dir||"ltr",Wt=document.documentElement.lang||navigator.language),[...zt.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var ot=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){zt.add(this.host)}hostDisconnected(){zt.delete(this.host)}dir(){return`${this.host.dir||Vt}`.toLowerCase()}lang(){return`${this.host.lang||Wt}`.toLowerCase()}getTranslationData(e){var r,a;let o=new Intl.Locale(e.replace(/_/g,"-")),s=o?.language.toLowerCase(),i=(a=(r=o?.region)===null||r===void 0?void 0:r.toLowerCase())!==null&&a!==void 0?a:"",l=Ce.get(`${s}-${i}`),f=Ce.get(s);return{locale:o,language:s,region:i,primary:l,secondary:f}}exists(e,r){var a;let{primary:o,secondary:s}=this.getTranslationData((a=r.lang)!==null&&a!==void 0?a:this.lang());return r=Object.assign({includeFallback:!1},r),!!(o&&o[e]||s&&s[e]||r.includeFallback&&ne&&ne[e])}term(e,...r){let{primary:a,secondary:o}=this.getTranslationData(this.lang()),s;if(a&&a[e])s=a[e];else if(o&&o[e])s=o[e];else if(ne&&ne[e])s=ne[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...r):s}date(e,r){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),r).format(e)}number(e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),r).format(e)}relativeTime(e,r,a){return new Intl.RelativeTimeFormat(this.lang(),a).format(e,r)}};var Ia={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};qe(Ia);var qa=Ia;var ee=class extends ot{};qe(qa);function E(t,e){let r={waitUntilFirstUpdate:!1,...e};return(a,o)=>{let{update:s}=a,i=Array.isArray(t)?t:[t];a.update=function(l){i.forEach(f=>{let p=f;if(l.has(p)){let c=l.get(p),d=this[p];c!==d&&(!r.waitUntilFirstUpdate||this.hasUpdated)&&this[o](c,d)}}),s.call(this,l)}}}var Y={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=t=>(...e)=>({_$litDirective$:t,values:e}),we=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,r,a){this._$Ct=e,this._$AM=r,this._$Ci=a}_$AS(e,r){return this.update(e,r)}update(e,r){return this.render(...r)}};var fe=st(class extends we{constructor(t){if(super(t),t.type!==Y.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(let a in e)e[a]&&!this.nt?.has(a)&&this.st.add(a);return this.render(e)}let r=t.element.classList;for(let a of this.st)a in e||(r.remove(a),this.st.delete(a));for(let a in e){let o=!!e[a];o===this.st.has(a)||this.nt?.has(a)||(o?(r.add(a),this.st.add(a)):(r.remove(a),this.st.delete(a)))}return I}});var M=class extends D{constructor(){super(...arguments),this.localize=new ee(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(a=>{if(!(a instanceof HTMLElement))return!1;let o=a.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(o)?!0:a instanceof H?!("disabled"in a)||!a.disabled:!1})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(r=>{r!==this&&r.open&&(r.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let t=new Aa;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let e=ve(getComputedStyle(this.body).getPropertyValue("--show-duration"));await be(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new Pa)}else{let t=new ka;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let e=ve(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await be(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Ea)}}async show(){if(!(this.open||this.disabled))return this.open=!0,Ht(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,Ht(this,"wa-after-hide")}render(){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return b`
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
          class=${fe({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};M.css=Ta;n([v("details")],M.prototype,"details",2);n([v("summary")],M.prototype,"header",2);n([v(".body")],M.prototype,"body",2);n([v(".expand-icon-slot")],M.prototype,"expandIconSlot",2);n([V()],M.prototype,"isAnimating",2);n([u({type:Boolean,reflect:!0})],M.prototype,"open",2);n([u()],M.prototype,"summary",2);n([u({reflect:!0})],M.prototype,"name",2);n([u({type:Boolean,reflect:!0})],M.prototype,"disabled",2);n([u({reflect:!0})],M.prototype,"appearance",2);n([u({attribute:"icon-placement",reflect:!0})],M.prototype,"iconPlacement",2);n([E("open",{waitUntilFirstUpdate:!0})],M.prototype,"handleOpenChange",1);M=n([$("wa-details")],M);var Ua=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var Oa=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Ha=y`
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
`;var za={};var Nt="";function $s(t){Nt=t}function Va(){if(!Nt){let t=document.querySelector("[data-fa-kit-code]");t&&$s(t.getAttribute("data-fa-kit-code")||"")}return Nt}var Wa="7.1.0";function Ms(t,e,r){let a=Va(),o=a.length>0,s="solid";return e==="notdog"&&(r==="solid"&&(s="notdog-solid"),r==="duo-solid"&&(s="notdog-duo-solid")),e==="notdog-duo"&&(s="notdog-duo-solid"),e==="chisel"&&(s="chisel-regular"),e==="etch"&&(s="etch-solid"),e==="jelly"&&(s="jelly-regular",r==="duo-regular"&&(s="jelly-duo-regular"),r==="fill-regular"&&(s="jelly-fill-regular")),e==="jelly-duo"&&(s="jelly-duo-regular"),e==="jelly-fill"&&(s="jelly-fill-regular"),e==="slab"&&((r==="solid"||r==="regular")&&(s="slab-regular"),r==="press-regular"&&(s="slab-press-regular")),e==="slab-press"&&(s="slab-press-regular"),e==="thumbprint"&&(s="thumbprint-light"),e==="whiteboard"&&(s="whiteboard-semibold"),e==="utility"&&(s="utility-semibold"),e==="utility-duo"&&(s="utility-duo-semibold"),e==="utility-fill"&&(s="utility-fill-semibold"),e==="classic"&&(r==="thin"&&(s="thin"),r==="light"&&(s="light"),r==="regular"&&(s="regular"),r==="solid"&&(s="solid")),e==="sharp"&&(r==="thin"&&(s="sharp-thin"),r==="light"&&(s="sharp-light"),r==="regular"&&(s="sharp-regular"),r==="solid"&&(s="sharp-solid")),e==="duotone"&&(r==="thin"&&(s="duotone-thin"),r==="light"&&(s="duotone-light"),r==="regular"&&(s="duotone-regular"),r==="solid"&&(s="duotone")),e==="sharp-duotone"&&(r==="thin"&&(s="sharp-duotone-thin"),r==="light"&&(s="sharp-duotone-light"),r==="regular"&&(s="sharp-duotone-regular"),r==="solid"&&(s="sharp-duotone-solid")),e==="brands"&&(s="brands"),o?`https://ka-p.fontawesome.com/releases/v${Wa}/svgs/${s}/${t}.svg?token=${encodeURIComponent(a)}`:`https://ka-f.fontawesome.com/releases/v${Wa}/svgs/${s}/${t}.svg`}var Rs={name:"default",resolver:(t,e="classic",r="solid")=>Ms(t,e,r),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:r,variant:a}=e;if(r==="duotone"||r==="sharp-duotone"||r==="notdog-duo"||r==="notdog"&&a==="duo-solid"||r==="jelly-duo"||r==="jelly"&&a==="duo-regular"||r==="utility-duo"||r==="thumbprint"){let o=[...t.querySelectorAll("path")],s=o.find(l=>!l.hasAttribute("opacity")),i=o.find(l=>l.hasAttribute("opacity"));if(!s||!i)return;if(s.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),e.swapOpacity&&s&&i){let l=i.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",l),i.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Na=Rs;var Ds="classic",Bs=[Na,za],jt=[];function ja(t){jt.push(t)}function Ga(t){jt=jt.filter(e=>e!==t)}function it(t){return Bs.find(e=>e.name===t)}function Xa(){return Ds}var{I:Mf}=Ar;var Ka=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var Ya=t=>t.strings===void 0;var Fs={},Za=(t,e=Fs)=>t._$AH=e;var Ue=Symbol(),lt=Symbol(),Gt,Xt=new Map,L=class extends D{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let r;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=b`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let a=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(a,this),this.svg}try{if(r=await fetch(t,{mode:"cors"}),!r.ok)return r.status===410?Ue:lt}catch{return lt}try{let a=document.createElement("div");a.innerHTML=await r.text();let o=a.firstElementChild;if(o?.tagName?.toLowerCase()!=="svg")return Ue;Gt||(Gt=new DOMParser);let i=Gt.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Ue}catch{return Ue}}}connectedCallback(){super.connectedCallback(),ja(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Ga(this)}getIconSource(){let t=it(this.library),e=this.family||Xa();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=this.getIconSource(),r=e?it(this.library):void 0;if(!t){this.svg=null;return}let a=Xt.get(t);a||(a=this.resolveIcon(t,r),Xt.set(t,a));let o=await a;if(o===lt&&Xt.delete(t),t===this.getIconSource().url){if(Ka(o)){this.svg=o;return}switch(o){case lt:case Ue:this.svg=null,this.dispatchEvent(new Ua);break;default:this.svg=o.cloneNode(!0),r?.mutator?.(this.svg,this),this.dispatchEvent(new Oa)}}}updated(t){super.updated(t);let e=it(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let r=this.shadowRoot?.querySelector("svg");r&&e?.mutator?.(r,this)}render(){return this.hasUpdated?this.svg:b`<svg part="svg" width="16" height="16"></svg>`}};L.css=Ha;n([V()],L.prototype,"svg",2);n([u({reflect:!0})],L.prototype,"name",2);n([u({reflect:!0})],L.prototype,"family",2);n([u({reflect:!0})],L.prototype,"variant",2);n([u({attribute:"auto-width",type:Boolean,reflect:!0})],L.prototype,"autoWidth",2);n([u({attribute:"swap-opacity",type:Boolean,reflect:!0})],L.prototype,"swapOpacity",2);n([u()],L.prototype,"src",2);n([u()],L.prototype,"label",2);n([u({reflect:!0})],L.prototype,"library",2);n([u({type:Number,reflect:!0})],L.prototype,"rotate",2);n([u({type:String,reflect:!0})],L.prototype,"flip",2);n([u({type:String,reflect:!0})],L.prototype,"animation",2);n([E("label")],L.prototype,"handleLabelChange",1);n([E(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],L.prototype,"setIcon",1);L=n([$("wa-icon")],L);var Qa=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var Ja=y`
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
`;var eo=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var to=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var ro=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var ao=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var oo=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var so=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var io=y`
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
`;var Oe=st(class extends we{constructor(t){if(super(t),t.type!==Y.PROPERTY&&t.type!==Y.ATTRIBUTE&&t.type!==Y.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ya(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===I||e===w)return e;let r=t.element,a=t.name;if(t.type===Y.PROPERTY){if(e===r[a])return I}else if(t.type===Y.BOOLEAN_ATTRIBUTE){if(!!e===r.hasAttribute(a))return I}else if(t.type===Y.ATTRIBUTE&&r.getAttribute(a)===e+"")return I;return Za(t),e}});function Kt(t,e,r){return t?e(t):r?.(t)}var m=class extends D{constructor(){super(...arguments),this.localize=new ee(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new oo);let t=ve(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await be(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new so)}isNestedItem(){let t=this.parentElement;return!!t&&m.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new ro),this.childrenContainer.hidden=!1;let t=ve(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await be(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new ao)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new to)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new eo)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>m.isTreeItem(e)&&(t||!e.disabled)):[]}render(){let t=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return b`
      <div
        part="base"
        class="${fe({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":e})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${fe({"expand-button":!0,"expand-button-visible":e})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${Kt(this.loading,()=>b` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>b`
                  <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${Kt(this.selectable,()=>b`
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
                ?checked="${Oe(this.selected)}"
                ?indeterminate="${this.indeterminate}"
                tabindex="-1"
              ></wa-checkbox>
            `)}

          <slot class="label" part="label"></slot>
        </div>

        <div class="children" part="children" role="group">
          <slot name="children" @slotchange="${this.handleChildrenSlotChange}"></slot>
        </div>
      </div>
    `}};m.css=io;n([V()],m.prototype,"indeterminate",2);n([V()],m.prototype,"isLeaf",2);n([V()],m.prototype,"loading",2);n([V()],m.prototype,"selectable",2);n([u({type:Boolean,reflect:!0})],m.prototype,"expanded",2);n([u({type:Boolean,reflect:!0})],m.prototype,"selected",2);n([u({type:Boolean,reflect:!0})],m.prototype,"disabled",2);n([u({type:Boolean,reflect:!0})],m.prototype,"lazy",2);n([v("slot:not([name])")],m.prototype,"defaultSlot",2);n([v("slot[name=children]")],m.prototype,"childrenSlot",2);n([v(".item")],m.prototype,"itemElement",2);n([v(".children")],m.prototype,"childrenContainer",2);n([v(".expand-button slot")],m.prototype,"expandButtonSlot",2);n([E("loading",{waitUntilFirstUpdate:!0})],m.prototype,"handleLoadingChange",1);n([E("disabled")],m.prototype,"handleDisabledChange",1);n([E("expanded")],m.prototype,"handleExpandedState",1);n([E("indeterminate")],m.prototype,"handleIndeterminateStateChange",1);n([E("selected")],m.prototype,"handleSelectedChange",1);n([E("expanded",{waitUntilFirstUpdate:!0})],m.prototype,"handleExpandedChange",1);n([E("expanded",{waitUntilFirstUpdate:!0})],m.prototype,"handleExpandAnimation",1);n([E("lazy",{waitUntilFirstUpdate:!0})],m.prototype,"handleLazyChange",1);m=n([$("wa-tree-item")],m);function lo(t,e,r){let a=o=>Object.is(o,-0)?0:o;return t<e?a(e):t>r?a(r):a(t)}function no(t,e=!1){function r(s){let i=s.getChildrenItems({includeDisabled:!1});if(i.length){let l=i.every(p=>p.selected),f=i.every(p=>!p.selected&&!p.indeterminate);s.selected=l,s.indeterminate=!l&&!f}}function a(s){let i=s.parentElement;m.isTreeItem(i)&&(r(i),a(i))}function o(s){for(let i of s.getChildrenItems())i.selected=e?s.selected||i.selected:!i.disabled&&s.selected,o(i);e&&r(s)}o(t),a(t)}var W=class extends D{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new ee(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let r=t.querySelector(`[slot="${e}-icon"]`),a=this.getExpandButtonIcon(e);a&&(r===null?t.append(a):r.hasAttribute("data-default")&&r.replaceWith(a))})})},this.handleTreeChanged=t=>{for(let e of t){let r=[...e.addedNodes].filter(m.isTreeItem),a=[...e.removedNodes].filter(m.isTreeItem);r.forEach(this.initTreeItem),this.lastFocusedItem&&a.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),m.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){let r=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(r){let a=r.cloneNode(!0);return[a,...a.querySelectorAll("[id]")].forEach(o=>o.removeAttribute("id")),a.setAttribute("data-default",""),a.slot=`${t}-icon`,a}return null}selectItem(t){let e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),no(t);else if(this.selection==="single"||t.isLeaf){let a=this.getAllTreeItems();for(let o of a)o.selected=o===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);let r=this.selectedItems;(e.length!==r.length||r.some(a=>!e.includes(a)))&&Promise.all(r.map(a=>a.updateComplete)).then(()=>{this.dispatchEvent(new Qa({selection:r}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(o=>["input","textarea"].includes(o?.tagName?.toLowerCase())))return;let e=this.getFocusableItems(),r=this.matches(":dir(ltr)"),a=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();let o=e.findIndex(f=>f.matches(":focus")),s=e[o],i=f=>{let p=e[lo(f,0,e.length-1)];this.focusItem(p)},l=f=>{s.expanded=f};t.key==="ArrowDown"?i(o+1):t.key==="ArrowUp"?i(o-1):r&&t.key==="ArrowRight"||a&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?i(o+1):l(!0):r&&t.key==="ArrowLeft"||a&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?i(o-1):l(!1):t.key==="Home"?i(0):t.key==="End"?i(e.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(t){let e=t.target,r=e.closest("wa-tree-item"),a=t.composedPath().some(o=>o?.classList?.contains("expand-button"));!r||r.disabled||e!==this.clickTarget||(a?r.expanded=!r.expanded:this.selectItem(r))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let r of e)r.updateComplete.then(()=>{r.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(r=>{r.updateComplete.then(()=>{no(r,!0)})}))}get selectedItems(){let t=this.getAllTreeItems(),e=r=>r.selected;return t.filter(e)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(r=>{if(r.disabled)return!1;let a=r.parentElement?.closest("[role=treeitem]");return a&&(!a.expanded||a.loading||e.has(a))&&e.add(r),!e.has(r)})}render(){return b`
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
    `}};W.css=Ja;n([v("slot:not([name])")],W.prototype,"defaultSlot",2);n([v("slot[name=expand-icon]")],W.prototype,"expandedIconSlot",2);n([v("slot[name=collapse-icon]")],W.prototype,"collapsedIconSlot",2);n([u()],W.prototype,"selection",2);n([E("selection")],W.prototype,"handleSelectionChange",1);W=n([$("wa-tree")],W);var fo=(t={})=>{let{validationElement:e,validationProperty:r}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),r||(r="value");let a={observedAttributes:["required"],message:e.validationMessage,checkValidity(o){let s={message:"",isValid:!0,invalidKeys:[]};return(o.required??o.hasAttribute("required"))&&!o[r]&&(s.message=typeof a.message=="function"?a.message(o):a.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return a};var uo=y`
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
`;var po=y`
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
`;var mo=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=r=>{let a=r.target;(this.slotNames.includes("[default]")&&!a.name||a.name&&this.slotNames.includes(a.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var co=y`
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
`;var ho=t=>t??w;var T=class extends H{constructor(){super(...arguments),this.hasSlotController=new mo(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[fo({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){let t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,r=!this.checked&&this.indeterminate,a=r?"indeterminate":"check",o=r?"indeterminate":"check";return b`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${ho(this._value)}
            .indeterminate=${Oe(this.indeterminate)}
            .checked=${Oe(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${o}-icon icon" library="system" name=${a}></wa-icon>
        </span>

        <slot part="label"></slot>
      </label>

      <slot
        id="hint"
        part="hint"
        name="hint"
        aria-hidden=${e?"false":"true"}
        class="${fe({"has-slotted":e})}"
      >
        ${this.hint}
      </slot>
    `}};T.css=[uo,co,po];T.shadowRootOptions={...H.shadowRootOptions,delegatesFocus:!0};n([v('input[type="checkbox"]')],T.prototype,"input",2);n([u()],T.prototype,"title",2);n([u({reflect:!0})],T.prototype,"name",2);n([u({reflect:!0})],T.prototype,"value",1);n([u({reflect:!0})],T.prototype,"size",2);n([u({type:Boolean})],T.prototype,"disabled",2);n([u({type:Boolean,reflect:!0})],T.prototype,"indeterminate",2);n([u({type:Boolean,attribute:!1})],T.prototype,"checked",2);n([u({type:Boolean,reflect:!0,attribute:"checked"})],T.prototype,"defaultChecked",2);n([u({type:Boolean,reflect:!0})],T.prototype,"required",2);n([u()],T.prototype,"hint",2);n([E("defaultChecked")],T.prototype,"handleDefaultCheckedChange",1);n([E(["checked","indeterminate"])],T.prototype,"handleStateChange",1);n([E("disabled")],T.prototype,"handleDisabledChange",1);T=n([$("wa-checkbox")],T);var xo=y`
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
`;var Yt=class extends D{constructor(){super(...arguments),this.localize=new ee(this)}render(){return b`
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
    `}};Yt.css=xo;Yt=n([$("wa-spinner")],Yt);var Is={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function go(t){t.preventDefault()}function qs(t){t.stopImmediatePropagation()}var Zt=class extends W{handleClick(e){let r=e.target,a=r.closest("jsdoc-tree-item"),o=e.composedPath().some(s=>s?.classList?.contains("expand-button"));!a||a.disabled||r!==this.clickTarget||(o?a.expanded=!a.expanded:this.selectItem(a))}},Qt=class extends m{connectedCallback(){super.connectedCallback(),Object.entries(Is).forEach(([e,r])=>{let a=Dr([e,r]);this.prepend(a)}),et()}firstUpdated(){super.firstUpdated();for(let e of this.shadowRoot.querySelectorAll("wa-icon"))e.remove()}};customElements.define("jsdoc-tree",Zt);customElements.define("jsdoc-tree-item",Qt);document.querySelectorAll("wa-details").forEach(t=>{t.addEventListener("wa-hide",go),t.addEventListener("wa-show",go)});document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(t=>{let e=t.firstElementChild;e?.localName==="a"&&e.addEventListener("click",qs)});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
lit-html/lit-html.js:
lit-element/lit-element.js:
@lit/reactive-element/decorators/custom-element.js:
@lit/reactive-element/decorators/property.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/query-all.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/query-async.js:
@lit/reactive-element/decorators/query-assigned-nodes.js:
lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lucide/dist/esm/defaultAttributes.js:
lucide/dist/esm/createElement.js:
lucide/dist/esm/shared/src/utils/hasA11yProp.js:
lucide/dist/esm/shared/src/utils/mergeClasses.js:
lucide/dist/esm/shared/src/utils/toCamelCase.js:
lucide/dist/esm/shared/src/utils/toPascalCase.js:
lucide/dist/esm/replaceElement.js:
lucide/dist/esm/icons/chevron-right.js:
lucide/dist/esm/icons/link.js:
lucide/dist/esm/icons/unlink.js:
lucide/dist/esm/lucide.js:
  (**
   * @license lucide v0.575.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
@awesome.me/webawesome/dist/chunks/chunk.WRKKMHO2.js:
@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js:
@awesome.me/webawesome/dist/chunks/chunk.ZAEBENIO.js:
@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome/dist/chunks/chunk.K43TEC7B.js:
@awesome.me/webawesome/dist/chunks/chunk.2YERLJAC.js:
@awesome.me/webawesome/dist/chunks/chunk.72WJND5X.js:
@awesome.me/webawesome/dist/chunks/chunk.OKXBNRE6.js:
@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
@awesome.me/webawesome/dist/chunks/chunk.VYH6PG3F.js:
@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
@awesome.me/webawesome/dist/chunks/chunk.D5I2DWML.js:
@awesome.me/webawesome/dist/chunks/chunk.K6QMUIHP.js:
@awesome.me/webawesome/dist/chunks/chunk.F5JLNOSF.js:
@awesome.me/webawesome/dist/chunks/chunk.IVRNYRHD.js:
@awesome.me/webawesome/dist/chunks/chunk.H27JY7XC.js:
@awesome.me/webawesome/dist/components/details/details.js:
@awesome.me/webawesome/dist/chunks/chunk.LCFSCRUJ.js:
@awesome.me/webawesome/dist/chunks/chunk.76FKYXVS.js:
@awesome.me/webawesome/dist/chunks/chunk.ZSEFTQAO.js:
@awesome.me/webawesome/dist/chunks/chunk.26QE47KB.js:
@awesome.me/webawesome/dist/chunks/chunk.FYKN76UA.js:
@awesome.me/webawesome/dist/chunks/chunk.Q6XMGFWJ.js:
@awesome.me/webawesome/dist/chunks/chunk.U36KZLSQ.js:
@awesome.me/webawesome/dist/chunks/chunk.AG44H7MD.js:
@awesome.me/webawesome/dist/chunks/chunk.22T33GII.js:
@awesome.me/webawesome/dist/chunks/chunk.YF3VIUFP.js:
@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js:
@awesome.me/webawesome/dist/chunks/chunk.EK53USZ7.js:
@awesome.me/webawesome/dist/chunks/chunk.SDDRXMOC.js:
@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js:
@awesome.me/webawesome/dist/chunks/chunk.YB6263IP.js:
@awesome.me/webawesome/dist/chunks/chunk.66QW7PWS.js:
@awesome.me/webawesome/dist/chunks/chunk.6J6QYFHV.js:
@awesome.me/webawesome/dist/chunks/chunk.UJFSGHFI.js:
@awesome.me/webawesome/dist/chunks/chunk.AGDGRG4E.js:
@awesome.me/webawesome/dist/chunks/chunk.QAD32DJP.js:
@awesome.me/webawesome/dist/components/tree/tree.js:
@awesome.me/webawesome/dist/components/tree-item/tree-item.js:
  (*! Copyright 2026 Fonticons, Inc. - https://webawesome.com/license *)

@lit/reactive-element/decorators/query-assigned-elements.js:
lit-html/directives/when.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
lit-html/directives/if-defined.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
