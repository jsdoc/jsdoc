(()=>{var oo=Object.create;var Ee=Object.defineProperty;var ro=Object.getOwnPropertyDescriptor;var wa=Object.getOwnPropertyNames;var ya=Object.getPrototypeOf,va=Object.prototype.hasOwnProperty;var ao=(t,e)=>(e=Symbol[t])?e:Symbol.for("Symbol."+t),ue=t=>{throw TypeError(t)};var so=(t,e,o)=>e in t?Ee(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var to=(t,e)=>Ee(t,"name",{value:e,configurable:!0});var ba=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports);var Sa=(t,e,o,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of wa(e))!va.call(t,a)&&a!==o&&Ee(t,a,{get:()=>e[a],enumerable:!(r=ro(e,a))||r.enumerable});return t};var Aa=(t,e,o)=>(o=t!=null?oo(ya(t)):{},Sa(e||!t||!t.__esModule?Ee(o,"default",{value:t,enumerable:!0}):o,t));var He=t=>[,,,oo(t?.[ao("metadata")]??null)],io=["class","method","getter","setter","accessor","field","value","get","set"],ke=t=>t!==void 0&&typeof t!="function"?ue("Function expected"):t,La=(t,e,o,r,a)=>({kind:io[t],name:e,metadata:r,addInitializer:s=>o._?ue("Already initialized"):a.push(ke(s||null))}),ka=(t,e)=>so(e,ao("metadata"),t[3]),h=(t,e,o,r)=>{for(var a=0,s=t[e>>1],i=s&&s.length;a<i;a++)e&1?s[a].call(o):r=s[a].call(o,r);return r},M=(t,e,o,r,a,s)=>{var i,l,f,p,c,d=e&7,L=!!(e&8),x=!!(e&16),N=d>3?t.length+1:d?L?1:2:0,ze=io[d+5],Se=d>3&&(t[N-1]=[]),de=t[N]||(t[N]=[]),R=d&&(!x&&!L&&(a=a.prototype),d<5&&(d>3||!x)&&ro(d<4?a:{get[o](){return H(this,s)},set[o]($){return j(this,s,$)}},o));d?x&&d<4&&to(s,(d>2?"set ":d>1?"get ":"")+o):to(a,o);for(var Ae=r.length-1;Ae>=0;Ae--)p=La(d,o,f={},t[3],de),d&&(p.static=L,p.private=x,c=p.access={has:x?$=>Ea(a,$):$=>o in $},d^3&&(c.get=x?$=>(d^1?H:D)($,a,d^4?s:R.get):$=>$[o]),d>2&&(c.set=x?($,te)=>j($,a,te,d^4?s:R.set):($,te)=>$[o]=te)),l=(0,r[Ae])(d?d<4?x?s:R[ze]:d>4?void 0:{get:R.get,set:R.set}:a,p),f._=1,d^4||l===void 0?ke(l)&&(d>4?Se.unshift(l):d?x?s=l:R[ze]=l:a=l):typeof l!="object"||l===null?ue("Object expected"):(ke(i=l.get)&&(R.get=i),ke(i=l.set)&&(R.set=i),ke(i=l.init)&&Se.unshift(i));return d||ka(t,a),R&&Ee(a,o,R),x?d^4?s:R:a},Ve=(t,e,o)=>so(t,typeof e!="symbol"?e+"":e,o),nt=(t,e,o)=>e.has(t)||ue("Cannot "+o),Ea=(t,e)=>Object(e)!==e?ue('Cannot use the "in" operator on this value'):t.has(e),H=(t,e,o)=>(nt(t,e,"read from private field"),o?o.call(t):e.get(t)),S=(t,e,o)=>e.has(t)?ue("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),j=(t,e,o,r)=>(nt(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o),D=(t,e,o)=>(nt(t,e,"access private method"),o);var Go=ba((tl,jo)=>{var No=typeof window<"u"&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(t){setTimeout(t,16)};function Wa(t){var e="startValue"in t?t.startValue:0,o="endValue"in t?t.endValue:1,r="durationMs"in t?t.durationMs:200,a=t.onComplete||function(){},s=r/16,i=(o-e)/s,l=Math.PI/s,f=e,p=0;function c(){p+=l,f+=i*Math.pow(Math.sin(p),2)*2,p<Math.PI?(t.onStep(f),No(c)):(t.onStep(o),a())}No(c)}jo.exports=Wa});var lo={keyframes:[{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)"},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.3},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.1)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)",filter:"drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))",offset:.6},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.9},{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)",color:"var(--jsdoc-copy-icon-color)"}],options:{duration:800,easing:"ease-in-out"}},no={keyframes:[{scale:1,opacity:1},{scale:3,opacity:.25,offset:.2},{scale:5,opacity:.0625,offset:.4},{scale:10,opacity:0}],options:{duration:300,easing:"ease-in-out"}};var We=globalThis,Ne=We.ShadowRoot&&(We.ShadyCSS===void 0||We.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ft=Symbol(),fo=new WeakMap,Pe=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==ft)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ne&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=fo.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&fo.set(o,e))}return e}toString(){return this.cssText}},uo=t=>new Pe(typeof t=="string"?t:t+"",void 0,ft),C=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,a,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[s+1],t[0]);return new Pe(o,t,ft)},po=(t,e)=>{if(Ne)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),a=We.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=o.cssText,t.appendChild(r)}},dt=Ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return uo(o)})(t):t;var{is:Ma,defineProperty:Fa,getOwnPropertyDescriptor:Ta,getOwnPropertyNames:_a,getOwnPropertySymbols:$a,getPrototypeOf:Ba}=Object,Q=globalThis,mo=Q.trustedTypes,Ra=mo?mo.emptyScript:"",Da=Q.reactiveElementPolyfillSupport,Me=(t,e)=>t,Fe={toAttribute(t,e){switch(e){case Boolean:t=t?Ra:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},je=(t,e)=>!Ma(t,e),co={attribute:!0,type:String,converter:Fe,reflect:!1,useDefault:!1,hasChanged:je};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Q.litPropertyMetadata??(Q.litPropertyMetadata=new WeakMap);var X=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=co){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(e,r,o);a!==void 0&&Fa(this.prototype,e,a)}}static getPropertyDescriptor(e,o,r){let{get:a,set:s}=Ta(this.prototype,e)??{get(){return this[o]},set(i){this[o]=i}};return{get:a,set(i){let l=a?.call(this);s?.call(this,i),this.requestUpdate(e,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??co}static _$Ei(){if(this.hasOwnProperty(Me("elementProperties")))return;let e=Ba(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Me("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Me("properties"))){let o=this.properties,r=[..._a(o),...$a(o)];for(let a of r)this.createProperty(a,o[a])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,a]of o)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let a=this._$Eu(o,r);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let a of r)o.unshift(dt(a))}else e!==void 0&&o.push(dt(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return po(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,r);if(a!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:Fe).toAttribute(o,r.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,o){let r=this.constructor,a=r._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let s=r.getPropertyOptions(a),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:Fe;this._$Em=a;let l=i.fromAttribute(o,s.type);this[a]=l??this._$Ej?.get(a)??l,this._$Em=null}}requestUpdate(e,o,r,a=!1,s){if(e!==void 0){let i=this.constructor;if(a===!1&&(s=this[e]),r??(r=i.getPropertyOptions(e)),!((r.hasChanged??je)(s,o)||r.useDefault&&r.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(i._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:a,wrapped:s},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,i??o??this[e]),s!==!0||i!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,s]of r){let{wrapped:i}=s,l=this[a];i!==!0||this._$AL.has(a)||l===void 0||this.C(a,void 0,s,l)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(e){}firstUpdated(e){}};X.elementStyles=[],X.shadowRootOptions={mode:"open"},X[Me("elementProperties")]=new Map,X[Me("finalized")]=new Map,Da?.({ReactiveElement:X}),(Q.reactiveElementVersions??(Q.reactiveElementVersions=[])).push("2.1.2");var _e=globalThis,ho=t=>t,Ge=_e.trustedTypes,xo=Ge?Ge.createPolicy("lit-html",{createHTML:t=>t}):void 0,pt="$lit$",K=`lit$${Math.random().toFixed(9).slice(2)}$`,mt="?"+K,Ia=`<${mt}>`,ae=document,$e=()=>ae.createComment(""),Be=t=>t===null||typeof t!="object"&&typeof t!="function",ct=Array.isArray,bo=t=>ct(t)||typeof t?.[Symbol.iterator]=="function",ut=`[ 	
\f\r]`,Te=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,go=/-->/g,Co=/>/g,oe=RegExp(`>|${ut}(?:([^\\s"'>=/]+)(${ut}*=${ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wo=/'/g,yo=/"/g,So=/^(?:script|style|textarea|title)$/i,ht=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),w=ht(1),Gs=ht(2),Xs=ht(3),I=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),vo=new WeakMap,re=ae.createTreeWalker(ae,129);function Ao(t,e){if(!ct(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return xo!==void 0?xo.createHTML(e):e}var Lo=(t,e)=>{let o=t.length-1,r=[],a,s=e===2?"<svg>":e===3?"<math>":"",i=Te;for(let l=0;l<o;l++){let f=t[l],p,c,d=-1,L=0;for(;L<f.length&&(i.lastIndex=L,c=i.exec(f),c!==null);)L=i.lastIndex,i===Te?c[1]==="!--"?i=go:c[1]!==void 0?i=Co:c[2]!==void 0?(So.test(c[2])&&(a=RegExp("</"+c[2],"g")),i=oe):c[3]!==void 0&&(i=oe):i===oe?c[0]===">"?(i=a??Te,d=-1):c[1]===void 0?d=-2:(d=i.lastIndex-c[2].length,p=c[1],i=c[3]===void 0?oe:c[3]==='"'?yo:wo):i===yo||i===wo?i=oe:i===go||i===Co?i=Te:(i=oe,a=void 0);let x=i===oe&&t[l+1].startsWith("/>")?" ":"";s+=i===Te?f+Ia:d>=0?(r.push(p),f.slice(0,d)+pt+f.slice(d)+K+x):f+K+(d===-2?l:x)}return[Ao(t,s+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},Re=class t{constructor({strings:e,_$litType$:o},r){let a;this.parts=[];let s=0,i=0,l=e.length-1,f=this.parts,[p,c]=Lo(e,o);if(this.el=t.createElement(p,r),re.currentNode=this.el.content,o===2||o===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(a=re.nextNode())!==null&&f.length<l;){if(a.nodeType===1){if(a.hasAttributes())for(let d of a.getAttributeNames())if(d.endsWith(pt)){let L=c[i++],x=a.getAttribute(d).split(K),N=/([.?@])?(.*)/.exec(L);f.push({type:1,index:s,name:N[2],strings:x,ctor:N[1]==="."?Ke:N[1]==="?"?Ye:N[1]==="@"?Ze:ie}),a.removeAttribute(d)}else d.startsWith(K)&&(f.push({type:6,index:s}),a.removeAttribute(d));if(So.test(a.tagName)){let d=a.textContent.split(K),L=d.length-1;if(L>0){a.textContent=Ge?Ge.emptyScript:"";for(let x=0;x<L;x++)a.append(d[x],$e()),re.nextNode(),f.push({type:2,index:++s});a.append(d[L],$e())}}}else if(a.nodeType===8)if(a.data===mt)f.push({type:2,index:s});else{let d=-1;for(;(d=a.data.indexOf(K,d+1))!==-1;)f.push({type:7,index:s}),d+=K.length-1}s++}}static createElement(e,o){let r=ae.createElement("template");return r.innerHTML=e,r}};function se(t,e,o=t,r){if(e===I)return e;let a=r!==void 0?o._$Co?.[r]:o._$Cl,s=Be(e)?void 0:e._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(t),a._$AT(t,o,r)),r!==void 0?(o._$Co??(o._$Co=[]))[r]=a:o._$Cl=a),a!==void 0&&(e=se(t,a._$AS(t,e.values),a,r)),e}var Xe=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,a=(e?.creationScope??ae).importNode(o,!0);re.currentNode=a;let s=re.nextNode(),i=0,l=0,f=r[0];for(;f!==void 0;){if(i===f.index){let p;f.type===2?p=new pe(s,s.nextSibling,this,e):f.type===1?p=new f.ctor(s,f.name,f.strings,this,e):f.type===6&&(p=new Qe(s,this,e)),this._$AV.push(p),f=r[++l]}i!==f?.index&&(s=re.nextNode(),i++)}return re.currentNode=ae,a}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},pe=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,a){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=se(this,e,o),Be(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==I&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):bo(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==b&&Be(this._$AH)?this._$AA.nextSibling.data=e:this.T(ae.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Re.createElement(Ao(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(o);else{let s=new Xe(a,this),i=s.u(this.options);s.p(o),this.T(i),this._$AH=s}}_$AC(e){let o=vo.get(e.strings);return o===void 0&&vo.set(e.strings,o=new Re(e)),o}k(e){ct(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,a=0;for(let s of e)a===o.length?o.push(r=new t(this.O($e()),this.O($e()),this,this.options)):r=o[a],r._$AI(s),a++;a<o.length&&(this._$AR(r&&r._$AB.nextSibling,a),o.length=a)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=ho(e).nextSibling;ho(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},ie=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,a,s){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=o,this._$AM=a,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=b}_$AI(e,o=this,r,a){let s=this.strings,i=!1;if(s===void 0)e=se(this,e,o,0),i=!Be(e)||e!==this._$AH&&e!==I,i&&(this._$AH=e);else{let l=e,f,p;for(e=s[0],f=0;f<s.length-1;f++)p=se(this,l[r+f],o,f),p===I&&(p=this._$AH[f]),i||(i=!Be(p)||p!==this._$AH[f]),p===b?e=b:e!==b&&(e+=(p??"")+s[f+1]),this._$AH[f]=p}i&&!a&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ke=class extends ie{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}},Ye=class extends ie{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==b)}},Ze=class extends ie{constructor(e,o,r,a,s){super(e,o,r,a,s),this.type=5}_$AI(e,o=this){if((e=se(this,e,o,0)??b)===I)return;let r=this._$AH,a=e===b&&r!==b||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==b&&(r===b||a);a&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Qe=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){se(this,e)}},ko={M:pt,P:K,A:mt,C:1,L:Lo,R:Xe,D:bo,V:se,I:pe,H:ie,N:Ye,U:Ze,B:Ke,F:Qe},qa=_e.litHtmlPolyfillSupport;qa?.(Re,pe),(_e.litHtmlVersions??(_e.litHtmlVersions=[])).push("3.3.2");var Eo=(t,e,o)=>{let r=o?.renderBefore??e,a=r._$litPart$;if(a===void 0){let s=o?.renderBefore??null;r._$litPart$=a=new pe(e.insertBefore($e(),s),s,void 0,o??{})}return a._$AI(t),a};var De=globalThis,U=class extends X{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;let e=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=e.firstChild),e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Eo(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};U._$litElement$=!0,U.finalized=!0,De.litElementHydrateSupport?.({LitElement:U});var Ua=De.litElementPolyfillSupport;Ua?.({LitElement:U});(De.litElementVersions??(De.litElementVersions=[])).push("4.2.2");var T=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Oa={attribute:!0,type:String,converter:Fe,reflect:!1,hasChanged:je},za=(t=Oa,e,o)=>{let{kind:r,metadata:a}=o,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),s.set(o.name,t),r==="accessor"){let{name:i}=o;return{set(l){let f=e.get.call(this);e.set.call(this,l),this.requestUpdate(i,f,t,!0,l)},init(l){return l!==void 0&&this.C(i,void 0,t,l),l}}}if(r==="setter"){let{name:i}=o;return function(l){let f=this[i];e.call(this,l),this.requestUpdate(i,f,t,!0,l)}}throw Error("Unsupported decorator location: "+r)};function u(t){return(e,o)=>typeof o=="object"?za(t,e,o):((r,a,s)=>{let i=a.hasOwnProperty(s);return a.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(a,s):void 0})(t,e,o)}var J=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o);function y(t,e){return(o,r,a)=>{let s=i=>i.renderRoot?.querySelector(t)??null;if(e){let{get:i,set:l}=typeof r=="object"?o:a??(()=>{let f=Symbol();return{get(){return this[f]},set(p){this[f]=p}}})();return J(o,r,{get(){let f=i.call(this);return f===void 0&&(f=s(this),(f!==null||this.hasUpdated)&&l.call(this,f)),f}})}return J(o,r,{get(){return s(this)}})}}function V(t){return u({...t,state:!0,attribute:!1})}var Je={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Po=([t,e,o])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",t);return Object.keys(e).forEach(a=>{r.setAttribute(a,String(e[a]))}),o?.length&&o.forEach(a=>{let s=Po(a);r.appendChild(s)}),r},Mo=(t,e={})=>{let r={...Je,...e};return Po(["svg",r,t])};var Fo=t=>{for(let e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};var To=(...t)=>t.filter((e,o,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===o).join(" ").trim();var _o=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,o,r)=>r?r.toUpperCase():o.toLowerCase());var $o=t=>{let e=_o(t);return e.charAt(0).toUpperCase()+e.slice(1)};var Ha=t=>Array.from(t.attributes).reduce((e,o)=>(e[o.name]=o.value,e),{}),Bo=t=>typeof t=="string"?t:!t||!t.class?"":t.class&&typeof t.class=="string"?t.class.split(" "):t.class&&Array.isArray(t.class)?t.class:"",xt=(t,{nameAttr:e,icons:o,attrs:r})=>{let a=t.getAttribute(e);if(a==null)return;let s=$o(a),i=o[s];if(!i)return console.warn(`${t.outerHTML} icon name was not found in the provided icons object.`);let l=Ha(t),f=Fo(l)?{}:{"aria-hidden":"true"},p={...Je,"data-lucide":a,...f,...r,...l},c=Bo(l),d=Bo(r),L=To("lucide",`lucide-${a}`,...c,...d);L&&Object.assign(p,{class:L});let x=Mo(i,p);return t.parentNode?.replaceChild(x,t)};var gt=[["path",{d:"m9 18 6-6-6-6"}]];var Ct=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var wt=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]];var yt=({icons:t={},nameAttr:e="data-lucide",attrs:o={},root:r=document,inTemplates:a}={})=>{if(!Object.values(t).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${e}]`)).forEach(i=>xt(i,{nameAttr:e,icons:t,attrs:o})),a&&Array.from(r.querySelectorAll("template")).forEach(l=>yt({icons:t,nameAttr:e,attrs:o,root:l.content,inTemplates:a})),e==="data-lucide"){let i=r.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach(l=>xt(l,{nameAttr:"icon-name",icons:t,attrs:o})))}};var Ro="data-icon";function Do([t,e]){let o=document.createElement("span");return o.setAttribute(Ro,e),o.setAttribute("slot",t),o}function et(t){yt({icons:{ChevronRight:gt,Link:Ct,Unlink:wt},attrs:{width:16,height:16},nameAttr:Ro,root:t?.root})}var Io,qo,Uo,Oo,zo,Ho,Vo,Wo,A,vt,bt,St,At,Lt,kt;Wo=[T("copy-url")];var O=class extends(Vo=U,Ho=[y('slot[name="copy-icon"]')],zo=[y('slot[name="success-icon"]')],Oo=[u()],Uo=[u()],qo=[u()],Io=[V()],Vo){constructor(){super(...arguments);S(this,vt,h(A,8,this)),h(A,11,this);S(this,bt,h(A,12,this)),h(A,15,this);S(this,St,h(A,16,this,"")),h(A,19,this);S(this,At,h(A,20,this,no)),h(A,23,this);S(this,Lt,h(A,24,this,lo)),h(A,27,this);S(this,kt,h(A,28,this,!1)),h(A,31,this)}async handleCopy(){let o,r;this.isCopying||(this.isCopying=!0,o=new URL(window.location.href),o.hash=this.from,r=o.href,r&&(await navigator.clipboard.writeText(r),await this.animateIcon()))}firstUpdated(){super.firstUpdated(),et({root:this.shadowRoot})}render(){return w`
      <button class="copy-button__button" part="button" type="button" @click=${this.handleCopy}>
        <slot part="copy-icon" name="copy-icon">
          <span data-icon="link" slot="copy-icon"></span>
        </slot>
        <slot part="success-icon" name="success-icon">
          <span data-icon="link" slot="success-icon"></span>
        </slot>
      </button>
    `}async animateIcon(){let{matches:o}=window.matchMedia("(prefers-reduced-motion: reduce)"),r=o?this.showAnimationReducedMotion:this.showAnimation;this.copyIcon.hidden=!1,await this.successIcon.animate(r.keyframes,r.options).finished,document.documentElement.style.setProperty("--jsdoc-copy-icon-opacity",0),this.copyIcon.hidden=!0,this.isCopying=!1}};A=He(Vo),vt=new WeakMap,bt=new WeakMap,St=new WeakMap,At=new WeakMap,Lt=new WeakMap,kt=new WeakMap,M(A,4,"copyIcon",Ho,O,vt),M(A,4,"successIcon",zo,O,bt),M(A,4,"from",Oo,O,St),M(A,4,"showAnimation",Uo,O,At),M(A,4,"showAnimationReducedMotion",qo,O,Lt),M(A,4,"isCopying",Io,O,kt),O=M(A,0,"CopyUrl",Wo,O),Ve(O,"styles",[C`
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
    `]),h(A,1,O);var Va=["copy-url","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let t=Va.filter(e=>document.querySelector(e));await Promise.allSettled(t.map(e=>customElements.whenDefined(e)));for(let e of t)for(let o of document.querySelectorAll(e))o.classList.add("ready")})();var Ko=Aa(Go(),1),Xo="--navbar-scroll-margin";function Et(t){let e=getComputedStyle(document.body),o;return t&&(o=getComputedStyle(t).getPropertyValue(Xo)),o||(o=e.getPropertyValue(Xo)),o=Number(o.replace("rem",""))*parseFloat(e.fontSize),Math.ceil(o/5)*5}(()=>{let t={PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SPACE:"Space"};function e(s,i){let l=Et(s);return i-l}function o(s){(0,Ko.default)({durationMs:200,startValue:window.scrollY,endValue:s,onStep:i=>window.scroll({behavior:"instant",top:i})})}function r(s,i,l){let f;i&&(f=document.getElementById(i),f&&(s.preventDefault(),o(e(f,f.offsetTop)),window.history.pushState(null,null,l)))}function a(s){return s.substring(1)}window.addEventListener("load",s=>{let i=a(document.location.hash);r(s,i,document.location.href)}),window.addEventListener("hashchange",s=>{let i=new URL(s.newURL),l=a(i.hash);r(s,l,i.hash)}),document.addEventListener("keydown",s=>{let i=s.code,l;i!==t.SPACE&&i!==t.PAGE_DOWN&&i!==t.PAGE_UP||(s.preventDefault(),s.stopImmediatePropagation(),l=e(null,window.innerHeight),i===t.PAGE_UP?o(window.scrollY-l):o(window.scrollY+l))})})();var Na;function Yo(t){return(e,o)=>J(e,o,{get(){return(this.renderRoot??Na??(Na=document.createDocumentFragment())).querySelectorAll(t)}})}function ja(t){var e=typeof t;return t!=null&&(e=="object"||e=="function")}var le=ja;var Ga=typeof global=="object"&&global&&global.Object===Object&&global,Zo=Ga;var Xa=typeof self=="object"&&self&&self.Object===Object&&self,Ka=Zo||Xa||Function("return this")(),tt=Ka;var Ya=function(){return tt.Date.now()},ot=Ya;var Za=/\s/;function Qa(t){for(var e=t.length;e--&&Za.test(t.charAt(e)););return e}var Qo=Qa;var Ja=/^\s+/;function es(t){return t&&t.slice(0,Qo(t)+1).replace(Ja,"")}var Jo=es;var ts=tt.Symbol,me=ts;var er=Object.prototype,os=er.hasOwnProperty,rs=er.toString,Ie=me?me.toStringTag:void 0;function as(t){var e=os.call(t,Ie),o=t[Ie];try{t[Ie]=void 0;var r=!0}catch{}var a=rs.call(t);return r&&(e?t[Ie]=o:delete t[Ie]),a}var tr=as;var ss=Object.prototype,is=ss.toString;function ls(t){return is.call(t)}var or=ls;var ns="[object Null]",fs="[object Undefined]",rr=me?me.toStringTag:void 0;function ds(t){return t==null?t===void 0?fs:ns:rr&&rr in Object(t)?tr(t):or(t)}var ar=ds;function us(t){return t!=null&&typeof t=="object"}var sr=us;var ps="[object Symbol]";function ms(t){return typeof t=="symbol"||sr(t)&&ar(t)==ps}var ir=ms;var lr=NaN,cs=/^[-+]0x[0-9a-f]+$/i,hs=/^0b[01]+$/i,xs=/^0o[0-7]+$/i,gs=parseInt;function Cs(t){if(typeof t=="number")return t;if(ir(t))return lr;if(le(t)){var e=typeof t.valueOf=="function"?t.valueOf():t;t=le(e)?e+"":e}if(typeof t!="string")return t===0?t:+t;t=Jo(t);var o=hs.test(t);return o||xs.test(t)?gs(t.slice(2),o?2:8):cs.test(t)?lr:+t}var Pt=Cs;var ws="Expected a function",ys=Math.max,vs=Math.min;function bs(t,e,o){var r,a,s,i,l,f,p=0,c=!1,d=!1,L=!0;if(typeof t!="function")throw new TypeError(ws);e=Pt(e)||0,le(o)&&(c=!!o.leading,d="maxWait"in o,s=d?ys(Pt(o.maxWait)||0,e):s,L="trailing"in o?!!o.trailing:L);function x(E){var Z=r,Le=a;return r=a=void 0,p=E,i=t.apply(Le,Z),i}function N(E){return p=E,l=setTimeout(de,e),c?x(E):i}function ze(E){var Z=E-f,Le=E-p,eo=e-Z;return d?vs(eo,s-Le):eo}function Se(E){var Z=E-f,Le=E-p;return f===void 0||Z>=e||Z<0||d&&Le>=s}function de(){var E=ot();if(Se(E))return R(E);l=setTimeout(de,ze(E))}function R(E){return l=void 0,L&&r?x(E):(r=a=void 0,i)}function Ae(){l!==void 0&&clearTimeout(l),p=0,r=f=a=l=void 0}function $(){return l===void 0?i:R(ot())}function te(){var E=ot(),Z=Se(E);if(r=arguments,a=this,f=E,Z){if(l===void 0)return N(f);if(d)return clearTimeout(l),l=setTimeout(de,e),x(f)}return l===void 0&&(l=setTimeout(de,e)),i}return te.cancel=Ae,te.flush=$,te}var nr=bs;var Ss="Expected a function";function As(t,e,o){var r=!0,a=!0;if(typeof t!="function")throw new TypeError(Ss);return le(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),nr(t,e,{leading:r,maxWait:e,trailing:a})}var fr=As;var Ls="h2, h3, h4, h5, h6";function wr(t,e,o=[]){for(let r of t)r instanceof Comment||(r instanceof Text?o.push(r.textContent):r.matches(e)&&wr(r.childNodes,e,o));return o}function Dt(t){if(t?.localName.startsWith("h")){let e=t.localName.substring(1),o=parseInt(e,10);if(o>=1&&o<=6)return o}return null}function ks(t){return e=>{for(let o of e)if(o.target.parentElement.closest(t.levels)){t.updateTree();break}}}function Es(t,e){let o=`:not(copy-url, .${e.hideFromNavClass})`,r;return t?(r=wr(t.childNodes,o),r.join("").trim()):null}var It=class{constructor(e,o){this.children=[],this.hideFromNav=o.isHidden(e),this.id=e?.id,this.level=Dt(e),this.text=Es(e,o)}},dr,ur,pr,mr,cr,hr,xr,gr,Cr,g,Mt,Ft,Tt,_t,$t,Bt,Rt,ce,he,xe,ge,Ce,v,qt,yr,vr,br,Sr,Ut,Ar,Ot,Lr;Cr=[T("jsdoc-outline")];var q=class extends(gr=U,xr=[y('slot[name="contents"]')],hr=[u({attribute:"hide-from-nav-class"})],cr=[u({reflect:!0})],mr=[Yo("a")],pr=[y('slot[name="title"]')],ur=[u({reflect:!0})],dr=[u()],gr){constructor(){super();S(this,v);S(this,Mt,h(g,8,this)),h(g,11,this);S(this,Ft,h(g,12,this,"hide-from-nav")),h(g,15,this);S(this,Tt,h(g,16,this,Ls)),h(g,19,this);S(this,_t,h(g,20,this)),h(g,23,this);S(this,$t,h(g,24,this)),h(g,27,this);S(this,Bt,h(g,28,this,"On this page")),h(g,31,this);S(this,Rt,h(g,32,this)),h(g,35,this);S(this,ce);S(this,he);S(this,xe);S(this,ge);S(this,Ce);j(this,ce,null),j(this,he,new WeakMap),j(this,xe,null),j(this,Ce,new WeakSet)}connectedCallback(){super.connectedCallback(),this.updateTree()}firstUpdated(){super.firstUpdated(),j(this,xe,new MutationObserver(ks(this))),D(this,v,vr).call(this);let o=Et(),r=o/2;j(this,ce,new IntersectionObserver(a=>D(this,v,yr).call(this,a,H(this,Ce)),{rootMargin:`-${o}px 0px -${r}px 0px`})),D(this,v,Ot).call(this),D(this,v,br).call(this)}isHidden(o){return Array.from(o.classList).includes(this.hideFromNavClass)}render(){return w`
      <nav class="container" aria-labelledby="title">
        <slot name="title">
          <h2 part="title" class="title">${this.titleText}</h2>
        </slot>
        <slot name="contents">
          <ul part="contents" class="contents">
            ${D(this,v,Ut).call(this,this.tree??[])}
          </ul>
        </slot>
        <slot></slot>
      </nav>
    `}updateTree(){return H(this,ge)||j(this,ge,fr(D(this,v,Lr),500)),H(this,ge).call(this)}};g=He(gr),Mt=new WeakMap,Ft=new WeakMap,Tt=new WeakMap,_t=new WeakMap,$t=new WeakMap,Bt=new WeakMap,Rt=new WeakMap,ce=new WeakMap,he=new WeakMap,xe=new WeakMap,ge=new WeakMap,Ce=new WeakMap,v=new WeakSet,qt=function(o){let r=[];for(;o.length;){let a=o.shift();if(this.isHidden(a))continue;let s=new It(a,this),i=D(this,v,Ar).call(this,o,a);i.length&&(s.children=D(this,v,qt).call(this,i)),r.push(s)}return r},yr=function(o,r){o.forEach(a=>{a.isIntersecting?r.add(a.target):r.delete(a.target)}),D(this,v,Ot).call(this)},vr=function(){H(this,xe).observe(document.body,{attributes:!0,characterData:!0,childList:!0,subtree:!0})},br=function(){for(let o of Array.from(this.links)){let r=o.hash.slice(1),a=r?document.getElementById(r):null;a&&(H(this,he).set(o,a),H(this,ce).observe(a))}},Sr=function(o){return o?w`
      <ul class="contents nested">
        ${D(this,v,Ut).call(this,o)}
      </ul>
    `:w``},Ut=function(o){let r=[];for(let a of o)r.push(w`
        <li>
          <p><a href="#${a.id}">${a.text}</a></p>
          ${D(this,v,Sr).call(this,a.children)}
        </li>
      `);return r},Ar=function(o,r){let a=[],s=Dt(r);for(;Dt(o[0])>s;){let i=o.shift();this.isHidden(i)||a.push(i)}return a},Ot=function(){let o=Array.from(this.links);o.find(r=>{let a=H(this,he).get(r);return a&&H(this,Ce).has(a)?(o.forEach(s=>s.classList.toggle("current",s===r)),!0):!1})},Lr=function(){this.tree=D(this,v,qt).call(this,Array.from(document.querySelectorAll(`.jsdoc-content ${this.levels}`)))},M(g,4,"contents",xr,q,Mt),M(g,4,"hideFromNavClass",hr,q,Ft),M(g,4,"levels",cr,q,Tt),M(g,4,"links",mr,q,_t),M(g,4,"title",pr,q,$t),M(g,4,"titleText",ur,q,Bt),M(g,4,"tree",dr,q,Rt),q=M(g,0,"Outline",Cr,q),Ve(q,"styles",[C`
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
    `]),h(g,1,q);var kr=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var Er=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}};var Pr=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var Mr=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var Fr=C`
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
`;function zt(t,e){return new Promise(o=>{function r(a){a.target===t&&(t.removeEventListener(e,r),o())}t.addEventListener(e,r)})}async function we(t,e,o){return t.animate(e,o).finished.catch(()=>{})}function ye(t){return t=t.toString().toLowerCase(),t.indexOf("ms")>-1?parseFloat(t)||0:t.indexOf("s")>-1?(parseFloat(t)||0)*1e3:parseFloat(t)||0}var Tr=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var Ps=Object.defineProperty,Ms=Object.getOwnPropertyDescriptor,_r=t=>{throw TypeError(t)},n=(t,e,o,r)=>{for(var a=r>1?void 0:r?Ms(e,o):e,s=t.length-1,i;s>=0;s--)(i=t[s])&&(a=(r?i(e,o,a):i(a))||a);return r&&a&&Ps(e,o,a),a},$r=(t,e,o)=>e.has(t)||_r("Cannot "+o),Br=(t,e,o)=>($r(t,e,"read from private field"),o?o.call(t):e.get(t)),Rr=(t,e,o)=>e.has(t)?_r("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),Dr=(t,e,o,r)=>($r(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o);var Fs=C`
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
`,rt,B=class extends U{constructor(){super(),Rr(this,rt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Fs,...t]}attributeChangedCallback(t,e,o){Br(this,rt)||(this.constructor.elementProperties.forEach((r,a)=>{r.reflect&&this[a]!=null&&this.initialReflectedProperties.set(a,this[a])}),Dr(this,rt,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};rt=new WeakMap;n([u()],B.prototype,"dir",2);n([u()],B.prototype,"lang",2);n([u({type:Boolean,reflect:!0,attribute:"did-ssr"})],B.prototype,"didSSR",2);var Ts=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),z=class extends B{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Tr))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[Ts()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")){let e=this.value;if(Array.isArray(e)){if(this.name){let o=new FormData;for(let r of e)o.append(this.name,r);this.setValue(o,o)}}else this.setValue(e,e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),this.updateValidity(),super.willUpdate(t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],r=t[2];r||(r=this.validationTarget),this.internals.setValidity(e,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let a of t){let{isValid:s,message:i,invalidKeys:l}=a.checkValidity(this);s||(r||(r=i),l?.length>=0&&l.forEach(f=>e[f]=!0))}r||(r=this.validationMessage),this.setValidity(e,r,o)}};z.formAssociated=!0;n([u({reflect:!0})],z.prototype,"name",2);n([u({type:Boolean})],z.prototype,"disabled",2);n([u({state:!0,attribute:!1})],z.prototype,"valueHasChanged",2);n([u({state:!0,attribute:!1})],z.prototype,"hasInteracted",2);n([u({attribute:"custom-error",reflect:!0})],z.prototype,"customError",2);n([u({attribute:!1,state:!0,type:Object})],z.prototype,"validity",1);var Ht=new Set,ve=new Map,ne,Vt="ltr",Wt="en",Ir=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Ir){let t=new MutationObserver(qr);Vt=document.documentElement.dir||"ltr",Wt=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function qe(...t){t.map(e=>{let o=e.$code.toLowerCase();ve.has(o)?ve.set(o,Object.assign(Object.assign({},ve.get(o)),e)):ve.set(o,e),ne||(ne=e)}),qr()}function qr(){Ir&&(Vt=document.documentElement.dir||"ltr",Wt=document.documentElement.lang||navigator.language),[...Ht.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var at=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ht.add(this.host)}hostDisconnected(){Ht.delete(this.host)}dir(){return`${this.host.dir||Vt}`.toLowerCase()}lang(){return`${this.host.lang||Wt}`.toLowerCase()}getTranslationData(e){var o,r;let a=new Intl.Locale(e.replace(/_/g,"-")),s=a?.language.toLowerCase(),i=(r=(o=a?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",l=ve.get(`${s}-${i}`),f=ve.get(s);return{locale:a,language:s,region:i,primary:l,secondary:f}}exists(e,o){var r;let{primary:a,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(a&&a[e]||s&&s[e]||o.includeFallback&&ne&&ne[e])}term(e,...o){let{primary:r,secondary:a}=this.getTranslationData(this.lang()),s;if(r&&r[e])s=r[e];else if(a&&a[e])s=a[e];else if(ne&&ne[e])s=ne[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof s=="function"?s(...o):s}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}};var Ur={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:t=>`Slide ${t}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};qe(Ur);var Or=Ur;var ee=class extends at{};qe(Or);function k(t,e){let o={waitUntilFirstUpdate:!1,...e};return(r,a)=>{let{update:s}=r,i=Array.isArray(t)?t:[t];r.update=function(l){i.forEach(f=>{let p=f;if(l.has(p)){let c=l.get(p),d=this[p];c!==d&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[a](c,d)}}),s.call(this,l)}}}var Y={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},st=t=>(...e)=>({_$litDirective$:t,values:e}),be=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}};var fe=st(class extends be{constructor(t){if(super(t),t.type!==Y.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let a=!!e[r];a===this.st.has(r)||this.nt?.has(r)||(a?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return I}});var _=class extends B{constructor(){super(...arguments),this.localize=new ee(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(t=>{for(let e of t)e.type==="attributes"&&e.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(t){t.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(t){t.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;let a=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(a)?!0:r instanceof z?!("disabled"in r)||!r.disabled:!1})||(t.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this.open?this.hide():this.show()),(t.key==="ArrowUp"||t.key==="ArrowLeft")&&(t.preventDefault(),this.hide()),(t.key==="ArrowDown"||t.key==="ArrowRight")&&(t.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let t=new kr;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let e=ye(getComputedStyle(this.body).getPropertyValue("--show-duration"));await we(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new Mr)}else{let t=new Er;if(this.dispatchEvent(t),t.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let e=ye(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await we(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:e,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new Pr)}}async show(){if(!(this.open||this.disabled))return this.open=!0,zt(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,zt(this,"wa-after-hide")}render(){let t=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return w`
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
    `}};_.css=Fr;n([y("details")],_.prototype,"details",2);n([y("summary")],_.prototype,"header",2);n([y(".body")],_.prototype,"body",2);n([y(".expand-icon-slot")],_.prototype,"expandIconSlot",2);n([V()],_.prototype,"isAnimating",2);n([u({type:Boolean,reflect:!0})],_.prototype,"open",2);n([u()],_.prototype,"summary",2);n([u({reflect:!0})],_.prototype,"name",2);n([u({type:Boolean,reflect:!0})],_.prototype,"disabled",2);n([u({reflect:!0})],_.prototype,"appearance",2);n([u({attribute:"icon-placement",reflect:!0})],_.prototype,"iconPlacement",2);n([k("open",{waitUntilFirstUpdate:!0})],_.prototype,"handleOpenChange",1);_=n([T("wa-details")],_);var zr=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var Hr=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Vr=C`
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
`;function _s(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Nt={solid:{check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path fill="currentColor" d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path fill="currentColor" d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},$s={name:"system",resolver:(t,e="classic",o="solid")=>{let a=Nt[o][t]??Nt.regular[t]??Nt.regular["circle-question"];return a?_s(a):""}},Wr=$s;var jt="";function Bs(t){jt=t}function Nr(){if(!jt){let t=document.querySelector("[data-fa-kit-code]");t&&Bs(t.getAttribute("data-fa-kit-code")||"")}return jt}var jr="7.1.0";function Rs(t,e,o){let r=Nr(),a=r.length>0,s="solid";return e==="notdog"&&(o==="solid"&&(s="notdog-solid"),o==="duo-solid"&&(s="notdog-duo-solid")),e==="notdog-duo"&&(s="notdog-duo-solid"),e==="chisel"&&(s="chisel-regular"),e==="etch"&&(s="etch-solid"),e==="jelly"&&(s="jelly-regular",o==="duo-regular"&&(s="jelly-duo-regular"),o==="fill-regular"&&(s="jelly-fill-regular")),e==="jelly-duo"&&(s="jelly-duo-regular"),e==="jelly-fill"&&(s="jelly-fill-regular"),e==="slab"&&((o==="solid"||o==="regular")&&(s="slab-regular"),o==="press-regular"&&(s="slab-press-regular")),e==="slab-press"&&(s="slab-press-regular"),e==="thumbprint"&&(s="thumbprint-light"),e==="whiteboard"&&(s="whiteboard-semibold"),e==="utility"&&(s="utility-semibold"),e==="utility-duo"&&(s="utility-duo-semibold"),e==="utility-fill"&&(s="utility-fill-semibold"),e==="classic"&&(o==="thin"&&(s="thin"),o==="light"&&(s="light"),o==="regular"&&(s="regular"),o==="solid"&&(s="solid")),e==="sharp"&&(o==="thin"&&(s="sharp-thin"),o==="light"&&(s="sharp-light"),o==="regular"&&(s="sharp-regular"),o==="solid"&&(s="sharp-solid")),e==="duotone"&&(o==="thin"&&(s="duotone-thin"),o==="light"&&(s="duotone-light"),o==="regular"&&(s="duotone-regular"),o==="solid"&&(s="duotone")),e==="sharp-duotone"&&(o==="thin"&&(s="sharp-duotone-thin"),o==="light"&&(s="sharp-duotone-light"),o==="regular"&&(s="sharp-duotone-regular"),o==="solid"&&(s="sharp-duotone-solid")),e==="brands"&&(s="brands"),a?`https://ka-p.fontawesome.com/releases/v${jr}/svgs/${s}/${t}.svg?token=${encodeURIComponent(r)}`:`https://ka-f.fontawesome.com/releases/v${jr}/svgs/${s}/${t}.svg`}var Ds={name:"default",resolver:(t,e="classic",o="solid")=>Rs(t,e,o),mutator:(t,e)=>{if(e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let a=[...t.querySelectorAll("path")],s=a.find(l=>!l.hasAttribute("opacity")),i=a.find(l=>l.hasAttribute("opacity"));if(!s||!i)return;if(s.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),e.swapOpacity&&s&&i){let l=i.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",l),i.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Gr=Ds;var Is="classic",qs=[Gr,Wr],Gt=[];function Xr(t){Gt.push(t)}function Kr(t){Gt=Gt.filter(e=>e!==t)}function it(t){return qs.find(e=>e.name===t)}function Yr(){return Is}var{I:Rf}=ko;var Zr=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e;var Qr=t=>t.strings===void 0;var Us={},Jr=(t,e=Us)=>t._$AH=e;var Ue=Symbol(),lt=Symbol(),Xt,Kt=new Map,F=class extends B{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=w`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(r,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?Ue:lt}catch{return lt}try{let r=document.createElement("div");r.innerHTML=await o.text();let a=r.firstElementChild;if(a?.tagName?.toLowerCase()!=="svg")return Ue;Xt||(Xt=new DOMParser);let i=Xt.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Ue}catch{return Ue}}}connectedCallback(){super.connectedCallback(),Xr(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Kr(this)}getIconSource(){let t=it(this.library),e=this.family||Yr();return this.name&&t?{url:t.resolver(this.name,e,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=this.getIconSource(),o=e?it(this.library):void 0;if(!t){this.svg=null;return}let r=Kt.get(t);r||(r=this.resolveIcon(t,o),Kt.set(t,r));let a=await r;if(a===lt&&Kt.delete(t),t===this.getIconSource().url){if(Zr(a)){this.svg=a;return}switch(a){case lt:case Ue:this.svg=null,this.dispatchEvent(new zr);break;default:this.svg=a.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new Hr)}}}updated(t){super.updated(t);let e=it(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:w`<svg part="svg" width="16" height="16"></svg>`}};F.css=Vr;n([V()],F.prototype,"svg",2);n([u({reflect:!0})],F.prototype,"name",2);n([u({reflect:!0})],F.prototype,"family",2);n([u({reflect:!0})],F.prototype,"variant",2);n([u({attribute:"auto-width",type:Boolean,reflect:!0})],F.prototype,"autoWidth",2);n([u({attribute:"swap-opacity",type:Boolean,reflect:!0})],F.prototype,"swapOpacity",2);n([u()],F.prototype,"src",2);n([u()],F.prototype,"label",2);n([u({reflect:!0})],F.prototype,"library",2);n([u({type:Number,reflect:!0})],F.prototype,"rotate",2);n([u({type:String,reflect:!0})],F.prototype,"flip",2);n([u({type:String,reflect:!0})],F.prototype,"animation",2);n([k("label")],F.prototype,"handleLabelChange",1);n([k(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],F.prototype,"setIcon",1);F=n([T("wa-icon")],F);var ea=class extends Event{constructor(t){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=t}};var ta=C`
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
`;var oa=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var ra=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var aa=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var sa=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var ia=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var la=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var na=C`
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
`;var Oe=st(class extends be{constructor(t){if(super(t),t.type!==Y.PROPERTY&&t.type!==Y.ATTRIBUTE&&t.type!==Y.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qr(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===I||e===b)return e;let o=t.element,r=t.name;if(t.type===Y.PROPERTY){if(e===o[r])return I}else if(t.type===Y.BOOLEAN_ATTRIBUTE){if(!!e===o.hasAttribute(r))return I}else if(t.type===Y.ATTRIBUTE&&o.getAttribute(r)===e+"")return I;return Jr(t),e}});function Yt(t,e,o){return t?e(t):o?.(t)}var m=class extends B{constructor(){super(...arguments),this.localize=new ee(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(t){return t instanceof Element&&t.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new ia);let t=ye(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await we(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new la)}isNestedItem(){let t=this.parentElement;return!!t&&m.isTreeItem(t)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(t){t.has("selected")&&!t.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new aa),this.childrenContainer.hidden=!1;let t=ye(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await we(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:t,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new sa)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new ra)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new oa)}getChildrenItems({includeDisabled:t=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(e=>m.isTreeItem(e)&&(t||!e.disabled)):[]}render(){let t=this.localize.dir()==="rtl",e=!this.loading&&(!this.isLeaf||this.lazy);return w`
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
              ${Yt(this.loading,()=>w` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>w`
                  <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${t?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${Yt(this.selectable,()=>w`
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
    `}};m.css=na;n([V()],m.prototype,"indeterminate",2);n([V()],m.prototype,"isLeaf",2);n([V()],m.prototype,"loading",2);n([V()],m.prototype,"selectable",2);n([u({type:Boolean,reflect:!0})],m.prototype,"expanded",2);n([u({type:Boolean,reflect:!0})],m.prototype,"selected",2);n([u({type:Boolean,reflect:!0})],m.prototype,"disabled",2);n([u({type:Boolean,reflect:!0})],m.prototype,"lazy",2);n([y("slot:not([name])")],m.prototype,"defaultSlot",2);n([y("slot[name=children]")],m.prototype,"childrenSlot",2);n([y(".item")],m.prototype,"itemElement",2);n([y(".children")],m.prototype,"childrenContainer",2);n([y(".expand-button slot")],m.prototype,"expandButtonSlot",2);n([k("loading",{waitUntilFirstUpdate:!0})],m.prototype,"handleLoadingChange",1);n([k("disabled")],m.prototype,"handleDisabledChange",1);n([k("expanded")],m.prototype,"handleExpandedState",1);n([k("indeterminate")],m.prototype,"handleIndeterminateStateChange",1);n([k("selected")],m.prototype,"handleSelectedChange",1);n([k("expanded",{waitUntilFirstUpdate:!0})],m.prototype,"handleExpandedChange",1);n([k("expanded",{waitUntilFirstUpdate:!0})],m.prototype,"handleExpandAnimation",1);n([k("lazy",{waitUntilFirstUpdate:!0})],m.prototype,"handleLazyChange",1);m=n([T("wa-tree-item")],m);function fa(t,e,o){let r=a=>Object.is(a,-0)?0:a;return t<e?r(e):t>o?r(o):r(t)}function da(t,e=!1){function o(s){let i=s.getChildrenItems({includeDisabled:!1});if(i.length){let l=i.every(p=>p.selected),f=i.every(p=>!p.selected&&!p.indeterminate);s.selected=l,s.indeterminate=!l&&!f}}function r(s){let i=s.parentElement;m.isTreeItem(i)&&(o(i),r(i))}function a(s){for(let i of s.getChildrenItems())i.selected=e?s.selected||i.selected:!i.disabled&&s.selected,a(i);e&&o(s)}a(t),r(t)}var W=class extends B{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new ee(this),this.initTreeItem=t=>{t.updateComplete.then(()=>{t.selectable=this.selection==="multiple",["expand","collapse"].filter(e=>!!this.querySelector(`[slot="${e}-icon"]`)).forEach(e=>{let o=t.querySelector(`[slot="${e}-icon"]`),r=this.getExpandButtonIcon(e);r&&(o===null?t.append(r):o.hasAttribute("data-default")&&o.replaceWith(r))})})},this.handleTreeChanged=t=>{for(let e of t){let o=[...e.addedNodes].filter(m.isTreeItem),r=[...e.removedNodes].filter(m.isTreeItem);o.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=t=>{let e=t.relatedTarget;(!e||!this.contains(e))&&(this.tabIndex=0)},this.handleFocusIn=t=>{let e=t.target;t.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),m.isTreeItem(e)&&!e.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=e,this.tabIndex=-1,e.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(t){let o=(t==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(o){let r=o.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(a=>a.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${t}-icon`,r}return null}selectItem(t){let e=[...this.selectedItems];if(this.selection==="multiple")t.selected=!t.selected,t.lazy&&(t.expanded=!0),da(t);else if(this.selection==="single"||t.isLeaf){let r=this.getAllTreeItems();for(let a of r)a.selected=a===t}else this.selection==="leaf"&&(t.expanded=!t.expanded);let o=this.selectedItems;(e.length!==o.length||o.some(r=>!e.includes(r)))&&Promise.all(o.map(r=>r.updateComplete)).then(()=>{this.dispatchEvent(new ea({selection:o}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(t){t?.focus()}handleKeyDown(t){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(t.key)||t.composedPath().some(a=>["input","textarea"].includes(a?.tagName?.toLowerCase())))return;let e=this.getFocusableItems(),o=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(e.length>0){t.preventDefault();let a=e.findIndex(f=>f.matches(":focus")),s=e[a],i=f=>{let p=e[fa(f,0,e.length-1)];this.focusItem(p)},l=f=>{s.expanded=f};t.key==="ArrowDown"?i(a+1):t.key==="ArrowUp"?i(a-1):o&&t.key==="ArrowRight"||r&&t.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?i(a+1):l(!0):o&&t.key==="ArrowLeft"||r&&t.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?i(a-1):l(!1):t.key==="Home"?i(0):t.key==="End"?i(e.length-1):(t.key==="Enter"||t.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(t){let e=t.target,o=e.closest("wa-tree-item"),r=t.composedPath().some(a=>a?.classList?.contains("expand-button"));!o||o.disabled||e!==this.clickTarget||(r?o.expanded=!o.expanded:this.selectItem(o))}handleMouseDown(t){this.clickTarget=t.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let t=this.selection==="multiple",e=this.getAllTreeItems();this.setAttribute("aria-multiselectable",t?"true":"false");for(let o of e)o.updateComplete.then(()=>{o.selectable=t});t&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(o=>{o.updateComplete.then(()=>{da(o,!0)})}))}get selectedItems(){let t=this.getAllTreeItems(),e=o=>o.selected;return t.filter(e)}getFocusableItems(){let t=this.getAllTreeItems(),e=new Set;return t.filter(o=>{if(o.disabled)return!1;let r=o.parentElement?.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||e.has(r))&&e.add(o),!e.has(o)})}render(){return w`
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
    `}};W.css=ta;n([y("slot:not([name])")],W.prototype,"defaultSlot",2);n([y("slot[name=expand-icon]")],W.prototype,"expandedIconSlot",2);n([y("slot[name=collapse-icon]")],W.prototype,"collapsedIconSlot",2);n([u()],W.prototype,"selection",2);n([k("selection")],W.prototype,"handleSelectionChange",1);W=n([T("wa-tree")],W);var ua=(t={})=>{let{validationElement:e,validationProperty:o}=t;e||(e=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:e.validationMessage,checkValidity(a){let s={message:"",isValid:!0,invalidKeys:[]};return(a.required??a.hasAttribute("required"))&&!a[o]&&(s.message=typeof r.message=="function"?r.message(a):r.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return r};var pa=C`
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
`;var ma=C`
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
`;var ca=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(t){return this.host.querySelector(`:scope > [slot="${t}"]`)!==null}test(t){return t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};var ha=C`
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
`;var xa=t=>t??b;var P=class extends z{constructor(){super(...arguments),this.hasSlotController=new ca(this,"hint"),this.title="",this.name="",this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this.checked=this.hasAttribute("checked"),this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let t=[ua({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...t]}get value(){let t=this._value||"on";return this.checked?t:null}set value(t){this._value=t}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}handleDefaultCheckedChange(){!this.hasInteracted&&this.checked!==this.defaultChecked&&(this.checked=this.defaultChecked,this.handleValueOrCheckedChange())}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(t){super.willUpdate(t),t.has("defaultChecked")&&(this.hasInteracted||(this.checked=this.defaultChecked)),(t.has("value")||t.has("checked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this.checked=this.defaultChecked,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}render(){let t=this.hasSlotController.test("hint"),e=this.hint?!0:!!t,o=!this.checked&&this.indeterminate,r=o?"indeterminate":"check",a=o?"indeterminate":"check";return w`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${this.name}
            value=${xa(this._value)}
            .indeterminate=${Oe(this.indeterminate)}
            .checked=${Oe(this.checked)}
            .disabled=${this.disabled}
            .required=${this.required}
            aria-checked=${this.checked?"true":"false"}
            aria-describedby="hint"
            @click=${this.handleClick}
          />

          <wa-icon part="${a}-icon icon" library="system" name=${r}></wa-icon>
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
    `}};P.css=[pa,ha,ma];P.shadowRootOptions={...z.shadowRootOptions,delegatesFocus:!0};n([y('input[type="checkbox"]')],P.prototype,"input",2);n([u()],P.prototype,"title",2);n([u({reflect:!0})],P.prototype,"name",2);n([u({reflect:!0})],P.prototype,"value",1);n([u({reflect:!0})],P.prototype,"size",2);n([u({type:Boolean})],P.prototype,"disabled",2);n([u({type:Boolean,reflect:!0})],P.prototype,"indeterminate",2);n([u({type:Boolean,attribute:!1})],P.prototype,"checked",2);n([u({type:Boolean,reflect:!0,attribute:"checked"})],P.prototype,"defaultChecked",2);n([u({type:Boolean,reflect:!0})],P.prototype,"required",2);n([u()],P.prototype,"hint",2);n([k("defaultChecked")],P.prototype,"handleDefaultCheckedChange",1);n([k(["checked","indeterminate"])],P.prototype,"handleStateChange",1);n([k("disabled")],P.prototype,"handleDisabledChange",1);P=n([T("wa-checkbox")],P);var ga=C`
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
`;var Zt=class extends B{constructor(){super(...arguments),this.localize=new ee(this)}render(){return w`
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
    `}};Zt.css=ga;Zt=n([T("wa-spinner")],Zt);var Os={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function Ca(t){t.preventDefault()}function zs(t){t.stopImmediatePropagation()}var Qt=class extends W{handleClick(e){let o=e.target,r=o.closest("jsdoc-tree-item"),a=e.composedPath().some(s=>s?.classList?.contains("expand-button"));!r||r.disabled||o!==this.clickTarget||(a?r.expanded=!r.expanded:this.selectItem(r))}},Jt=class extends m{connectedCallback(){super.connectedCallback(),Object.entries(Os).forEach(([e,o])=>{let r=Do([e,o]);this.prepend(r)}),et()}firstUpdated(){super.firstUpdated();for(let e of this.shadowRoot.querySelectorAll("wa-icon"))e.remove()}};customElements.define("jsdoc-tree",Qt);customElements.define("jsdoc-tree-item",Jt);document.querySelectorAll("wa-details").forEach(t=>{t.addEventListener("wa-hide",Ca),t.addEventListener("wa-show",Ca)});document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(t=>{let e=t.firstElementChild;e?.localName==="a"&&e.addEventListener("click",zs)});})();
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
@awesome.me/webawesome/dist/chunks/chunk.KPN3YZ6U.js:
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
