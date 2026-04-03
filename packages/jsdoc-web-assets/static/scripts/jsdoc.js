(()=>{var yr=Object.create;var ut=Object.defineProperty;var br=Object.getOwnPropertyDescriptor;var Ai=Object.getOwnPropertyNames;var ki=Object.getPrototypeOf,Ei=Object.prototype.hasOwnProperty;var vr=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),Xe=e=>{throw TypeError(e)};var wr=(e,t,o)=>t in e?ut(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var gr=(e,t)=>ut(e,"name",{value:t,configurable:!0});var Pi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ti=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ai(t))!Ei.call(e,a)&&a!==o&&ut(e,a,{get:()=>t[a],enumerable:!(r=br(t,a))||r.enumerable});return e};var Ri=(e,t,o)=>(o=e!=null?yr(ki(e)):{},Ti(t||!e||!e.__esModule?ut(o,"default",{value:e,enumerable:!0}):o,e));var _t=e=>[,,,yr(e?.[vr("metadata")]??null)],Cr=["class","method","getter","setter","accessor","field","value","get","set"],dt=e=>e!==void 0&&typeof e!="function"?Xe("Function expected"):e,Li=(e,t,o,r,a)=>({kind:Cr[e],name:t,metadata:r,addInitializer:s=>o._?Xe("Already initialized"):a.push(dt(s||null))}),_i=(e,t)=>wr(t,vr("metadata"),e[3]),v=(e,t,o,r)=>{for(var a=0,s=e[t>>1],i=s&&s.length;a<i;a++)t&1?s[a].call(o):r=s[a].call(o,r);return r},I=(e,t,o,r,a,s)=>{var i,n,l,u,p,d=t&7,h=!!(t&8),m=!!(t&16),x=d>3?e.length+1:d?h?1:2:0,g=Cr[d+5],S=d>3&&(e[x-1]=[]),y=e[x]||(e[x]=[]),b=d&&(!m&&!h&&(a=a.prototype),d<5&&(d>3||!m)&&br(d<4?a:{get[o](){return fe(this,s)},set[o](w){return me(this,s,w)}},o));d?m&&d<4&&gr(s,(d>2?"set ":d>1?"get ":"")+o):gr(a,o);for(var E=r.length-1;E>=0;E--)u=Li(d,o,l={},e[3],y),d&&(u.static=h,u.private=m,p=u.access={has:m?w=>$i(a,w):w=>o in w},d^3&&(p.get=m?w=>(d^1?fe:K)(w,a,d^4?s:b.get):w=>w[o]),d>2&&(p.set=m?(w,O)=>me(w,a,O,d^4?s:b.set):(w,O)=>w[o]=O)),n=(0,r[E])(d?d<4?m?s:b[g]:d>4?void 0:{get:b.get,set:b.set}:a,u),l._=1,d^4||n===void 0?dt(n)&&(d>4?S.unshift(n):d?m?s=n:b[g]=n:a=n):typeof n!="object"||n===null?Xe("Object expected"):(dt(i=n.get)&&(b.get=i),dt(i=n.set)&&(b.set=i),dt(i=n.init)&&S.unshift(i));return d||_i(e,a),b&&ut(a,o,b),m?d^4?s:b:a},$t=(e,t,o)=>wr(e,typeof t!="symbol"?t+"":t,o),po=(e,t,o)=>t.has(e)||Xe("Cannot "+o),$i=(e,t)=>Object(t)!==t?Xe('Cannot use the "in" operator on this value'):e.has(t),fe=(e,t,o)=>(po(e,t,"read from private field"),o?o.call(e):t.get(e)),_=(e,t,o)=>t.has(e)?Xe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),me=(e,t,o,r)=>(po(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o),K=(e,t,o)=>(po(e,t,"access private method"),o);var cs=Pi((op,ps)=>{var us=typeof window<"u"&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(e){setTimeout(e,16)};function kn(e){var t="startValue"in e?e.startValue:0,o="endValue"in e?e.endValue:1,r="durationMs"in e?e.durationMs:200,a=e.onComplete||function(){},s=r/16,i=(o-t)/s,n=Math.PI/s,l=t,u=0;function p(){u+=n,l+=i*Math.pow(Math.sin(u),2)*2,u<Math.PI?(e.onStep(l),us(p)):(e.onStep(o),a())}us(p)}ps.exports=kn});var Sr={keyframes:[{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)"},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.3},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.1)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)",filter:"drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))",offset:.6},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.9},{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)",color:"var(--jsdoc-copy-icon-color)"}],options:{duration:800,easing:"ease-in-out"}},Ar={keyframes:[{scale:1,opacity:1},{scale:3,opacity:.25,offset:.2},{scale:5,opacity:.0625,offset:.4},{scale:10,opacity:0}],options:{duration:300,easing:"ease-in-out"}};var Dt=globalThis,Ot=Dt.ShadowRoot&&(Dt.ShadyCSS===void 0||Dt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,co=Symbol(),kr=new WeakMap,pt=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==co)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(Ot&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=kr.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&kr.set(o,t))}return t}toString(){return this.cssText}},Er=e=>new pt(typeof e=="string"?e:e+"",void 0,co),L=(e,...t)=>{let o=e.length===1?e[0]:t.reduce((r,a,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[s+1],e[0]);return new pt(o,e,co)},Pr=(e,t)=>{if(Ot)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let r=document.createElement("style"),a=Dt.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=o.cssText,e.appendChild(r)}},mo=Ot?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return Er(o)})(e):e;var{is:Oi,defineProperty:Mi,getOwnPropertyDescriptor:Bi,getOwnPropertyNames:Fi,getOwnPropertySymbols:Ii,getPrototypeOf:qi}=Object,Le=globalThis,Tr=Le.trustedTypes,Ui=Tr?Tr.emptyScript:"",Hi=Le.reactiveElementPolyfillSupport,ct=(e,t)=>e,mt={toAttribute(e,t){switch(t){case Boolean:e=e?Ui:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},Mt=(e,t)=>!Oi(e,t),Rr={attribute:!0,type:String,converter:mt,reflect:!1,useDefault:!1,hasChanged:Mt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Le.litPropertyMetadata??(Le.litPropertyMetadata=new WeakMap);var we=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Rr){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(t,r,o);a!==void 0&&Mi(this.prototype,t,a)}}static getPropertyDescriptor(t,o,r){let{get:a,set:s}=Bi(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:a,set(i){let n=a?.call(this);s?.call(this,i),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Rr}static _$Ei(){if(this.hasOwnProperty(ct("elementProperties")))return;let t=qi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(ct("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ct("properties"))){let o=this.properties,r=[...Fi(o),...Ii(o)];for(let a of r)this.createProperty(a,o[a])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,a]of o)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let a=this._$Eu(o,r);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let a of r)o.unshift(mo(a))}else t!==void 0&&o.push(mo(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Pr(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,r);if(a!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:mt).toAttribute(o,r.type);this._$Em=t,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,o){let r=this.constructor,a=r._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let s=r.getPropertyOptions(a),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:mt;this._$Em=a;let n=i.fromAttribute(o,s.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(t,o,r,a=!1,s){if(t!==void 0){let i=this.constructor;if(a===!1&&(s=this[t]),r??(r=i.getPropertyOptions(t)),!((r.hasChanged??Mt)(s,o)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:a,wrapped:s},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,i??o??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,s]of r){let{wrapped:i}=s,n=this[a];i!==!0||this._$AL.has(a)||n===void 0||this.C(a,void 0,s,n)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};we.elementStyles=[],we.shadowRootOptions={mode:"open"},we[ct("elementProperties")]=new Map,we[ct("finalized")]=new Map,Hi?.({ReactiveElement:we}),(Le.reactiveElementVersions??(Le.reactiveElementVersions=[])).push("2.1.2");var xt=globalThis,Lr=e=>e,Bt=xt.trustedTypes,_r=Bt?Bt.createPolicy("lit-html",{createHTML:e=>e}):void 0,xo="$lit$",Ce=`lit$${Math.random().toFixed(9).slice(2)}$`,go="?"+Ce,zi=`<${go}>`,Me=document,gt=()=>Me.createComment(""),yt=e=>e===null||typeof e!="object"&&typeof e!="function",yo=Array.isArray,Fr=e=>yo(e)||typeof e?.[Symbol.iterator]=="function",ho=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$r=/-->/g,Dr=/>/g,De=RegExp(`>|${ho}(?:([^\\s"'>=/]+)(${ho}*=${ho}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Or=/'/g,Mr=/"/g,Ir=/^(?:script|style|textarea|title)$/i,bo=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),T=bo(1),Cl=bo(2),Sl=bo(3),Y=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Br=new WeakMap,Oe=Me.createTreeWalker(Me,129);function qr(e,t){if(!yo(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return _r!==void 0?_r.createHTML(t):t}var Ur=(e,t)=>{let o=e.length-1,r=[],a,s=t===2?"<svg>":t===3?"<math>":"",i=ht;for(let n=0;n<o;n++){let l=e[n],u,p,d=-1,h=0;for(;h<l.length&&(i.lastIndex=h,p=i.exec(l),p!==null);)h=i.lastIndex,i===ht?p[1]==="!--"?i=$r:p[1]!==void 0?i=Dr:p[2]!==void 0?(Ir.test(p[2])&&(a=RegExp("</"+p[2],"g")),i=De):p[3]!==void 0&&(i=De):i===De?p[0]===">"?(i=a??ht,d=-1):p[1]===void 0?d=-2:(d=i.lastIndex-p[2].length,u=p[1],i=p[3]===void 0?De:p[3]==='"'?Mr:Or):i===Mr||i===Or?i=De:i===$r||i===Dr?i=ht:(i=De,a=void 0);let m=i===De&&e[n+1].startsWith("/>")?" ":"";s+=i===ht?l+zi:d>=0?(r.push(u),l.slice(0,d)+xo+l.slice(d)+Ce+m):l+Ce+(d===-2?n:m)}return[qr(e,s+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},bt=class e{constructor({strings:t,_$litType$:o},r){let a;this.parts=[];let s=0,i=0,n=t.length-1,l=this.parts,[u,p]=Ur(t,o);if(this.el=e.createElement(u,r),Oe.currentNode=this.el.content,o===2||o===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(a=Oe.nextNode())!==null&&l.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(let d of a.getAttributeNames())if(d.endsWith(xo)){let h=p[i++],m=a.getAttribute(d).split(Ce),x=/([.?@])?(.*)/.exec(h);l.push({type:1,index:s,name:x[2],strings:m,ctor:x[1]==="."?It:x[1]==="?"?qt:x[1]==="@"?Ut:Fe}),a.removeAttribute(d)}else d.startsWith(Ce)&&(l.push({type:6,index:s}),a.removeAttribute(d));if(Ir.test(a.tagName)){let d=a.textContent.split(Ce),h=d.length-1;if(h>0){a.textContent=Bt?Bt.emptyScript:"";for(let m=0;m<h;m++)a.append(d[m],gt()),Oe.nextNode(),l.push({type:2,index:++s});a.append(d[h],gt())}}}else if(a.nodeType===8)if(a.data===go)l.push({type:2,index:s});else{let d=-1;for(;(d=a.data.indexOf(Ce,d+1))!==-1;)l.push({type:7,index:s}),d+=Ce.length-1}s++}}static createElement(t,o){let r=Me.createElement("template");return r.innerHTML=t,r}};function Be(e,t,o=e,r){if(t===Y)return t;let a=r!==void 0?o._$Co?.[r]:o._$Cl,s=yt(t)?void 0:t._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(e),a._$AT(e,o,r)),r!==void 0?(o._$Co??(o._$Co=[]))[r]=a:o._$Cl=a),a!==void 0&&(t=Be(e,a._$AS(e,t.values),a,r)),t}var Ft=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,a=(t?.creationScope??Me).importNode(o,!0);Oe.currentNode=a;let s=Oe.nextNode(),i=0,n=0,l=r[0];for(;l!==void 0;){if(i===l.index){let u;l.type===2?u=new Ke(s,s.nextSibling,this,t):l.type===1?u=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(u=new Ht(s,this,t)),this._$AV.push(u),l=r[++n]}i!==l?.index&&(s=Oe.nextNode(),i++)}return Oe.currentNode=Me,a}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},Ke=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,a){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=Be(this,t,o),yt(t)?t===q||t==null||t===""?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Fr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&yt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Me.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,a=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=bt.createElement(qr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(o);else{let s=new Ft(a,this),i=s.u(this.options);s.p(o),this.T(i),this._$AH=s}}_$AC(t){let o=Br.get(t.strings);return o===void 0&&Br.set(t.strings,o=new bt(t)),o}k(t){yo(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,a=0;for(let s of t)a===o.length?o.push(r=new e(this.O(gt()),this.O(gt()),this,this.options)):r=o[a],r._$AI(s),a++;a<o.length&&(this._$AR(r&&r._$AB.nextSibling,a),o.length=a)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=Lr(t).nextSibling;Lr(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Fe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,a,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=o,this._$AM=a,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=q}_$AI(t,o=this,r,a){let s=this.strings,i=!1;if(s===void 0)t=Be(this,t,o,0),i=!yt(t)||t!==this._$AH&&t!==Y,i&&(this._$AH=t);else{let n=t,l,u;for(t=s[0],l=0;l<s.length-1;l++)u=Be(this,n[r+l],o,l),u===Y&&(u=this._$AH[l]),i||(i=!yt(u)||u!==this._$AH[l]),u===q?t=q:t!==q&&(t+=(u??"")+s[l+1]),this._$AH[l]=u}i&&!a&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},It=class extends Fe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}},qt=class extends Fe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}},Ut=class extends Fe{constructor(t,o,r,a,s){super(t,o,r,a,s),this.type=5}_$AI(t,o=this){if((t=Be(this,t,o,0)??q)===Y)return;let r=this._$AH,a=t===q&&r!==q||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==q&&(r===q||a);a&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ht=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Be(this,t)}},Hr={M:xo,P:Ce,A:go,C:1,L:Ur,R:Ft,D:Fr,V:Be,I:Ke,H:Fe,N:qt,U:Ut,B:It,F:Ht},Wi=xt.litHtmlPolyfillSupport;Wi?.(bt,Ke),(xt.litHtmlVersions??(xt.litHtmlVersions=[])).push("3.3.2");var zr=(e,t,o)=>{let r=o?.renderBefore??t,a=r._$litPart$;if(a===void 0){let s=o?.renderBefore??null;r._$litPart$=a=new Ke(t.insertBefore(gt(),s),s,void 0,o??{})}return a._$AI(e),a};var vt=globalThis,oe=class extends we{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;let t=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=t.firstChild),t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};oe._$litElement$=!0,oe.finalized=!0,vt.litElementHydrateSupport?.({LitElement:oe});var Ni=vt.litElementPolyfillSupport;Ni?.({LitElement:oe});(vt.litElementVersions??(vt.litElementVersions=[])).push("4.2.2");var Wr=L`
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

  .tooltip {
    --popup-border-width: var(--wa-tooltip-border-width);

    &::part(arrow) {
      border-bottom: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
      border-right: var(--wa-tooltip-border-width) var(--wa-tooltip-border-style) var(--wa-tooltip-border-color);
    }
  }
`;var Nr=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var Vr=L`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: 100ms;
    --hide-duration: 100ms;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

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
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
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
`;var vo=new Set,Ye=new Map,Ie,wo="ltr",Co="en",jr=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(jr){let e=new MutationObserver(Gr);wo=document.documentElement.dir||"ltr",Co=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function wt(...e){e.map(t=>{let o=t.$code.toLowerCase();Ye.has(o)?Ye.set(o,Object.assign(Object.assign({},Ye.get(o)),t)):Ye.set(o,t),Ie||(Ie=t)}),Gr()}function Gr(){jr&&(wo=document.documentElement.dir||"ltr",Co=document.documentElement.lang||navigator.language),[...vo.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var zt=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){vo.add(this.host)}hostDisconnected(){vo.delete(this.host)}dir(){return`${this.host.dir||wo}`.toLowerCase()}lang(){return`${this.host.lang||Co}`.toLowerCase()}getTranslationData(t){var o,r;let a=new Intl.Locale(t.replace(/_/g,"-")),s=a?.language.toLowerCase(),i=(r=(o=a?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",n=Ye.get(`${s}-${i}`),l=Ye.get(s);return{locale:a,language:s,region:i,primary:n,secondary:l}}exists(t,o){var r;let{primary:a,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(a&&a[t]||s&&s[t]||o.includeFallback&&Ie&&Ie[t])}term(t,...o){let{primary:r,secondary:a}=this.getTranslationData(this.lang()),s;if(r&&r[t])s=r[t];else if(a&&a[t])s=a[t];else if(Ie&&Ie[t])s=Ie[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof s=="function"?s(...o):s}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,o)}};var Xr={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",createOption:e=>`Create "${e}"`,copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};wt(Xr);var Kr=Xr;var he=class extends zt{};wt(Kr);var Vi=Object.defineProperty,ji=Object.getOwnPropertyDescriptor,Yr=e=>{throw TypeError(e)},f=(e,t,o,r)=>{for(var a=r>1?void 0:r?ji(t,o):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(a=(r?i(t,o,a):i(a))||a);return r&&a&&Vi(t,o,a),a},Zr=(e,t,o)=>t.has(e)||Yr("Cannot "+o),Qr=(e,t,o)=>(Zr(e,t,"read from private field"),o?o.call(e):t.get(e)),Jr=(e,t,o)=>t.has(e)?Yr("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),ea=(e,t,o,r)=>(Zr(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o);var U=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var Gi={attribute:!0,type:String,converter:mt,reflect:!1,hasChanged:Mt},Xi=(e=Gi,t,o)=>{let{kind:r,metadata:a}=o,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(n){let l=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,l,e,!0,n)},init(n){return n!==void 0&&this.C(i,void 0,e,n),n}}}if(r==="setter"){let{name:i}=o;return function(n){let l=this[i];t.call(this,n),this.requestUpdate(i,l,e,!0,n)}}throw Error("Unsupported decorator location: "+r)};function c(e){return(t,o)=>typeof o=="object"?Xi(e,t,o):((r,a,s)=>{let i=a.hasOwnProperty(s);return a.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(a,s):void 0})(e,t,o)}function Z(e){return c({...e,state:!0,attribute:!1})}var _e=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function P(e,t){return(o,r,a)=>{let s=i=>i.renderRoot?.querySelector(e)??null;if(t){let{get:i,set:n}=typeof r=="object"?o:a??(()=>{let l=Symbol();return{get(){return this[l]},set(u){this[l]=u}}})();return _e(o,r,{get(){let l=i.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&n.call(this,l)),l}})}return _e(o,r,{get(){return s(this)}})}}var Ki;function ta(e){return(t,o)=>_e(t,o,{get(){return(this.renderRoot??Ki??(Ki=document.createDocumentFragment())).querySelectorAll(e)}})}var Yi=L`
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
`,Wt,H=class extends oe{constructor(){super(),Jr(this,Wt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Yi,...e]}connectedCallback(){super.connectedCallback(),this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))}attributeChangedCallback(e,t,o){Qr(this,Wt)||(this.constructor.elementProperties.forEach((r,a)=>{r.reflect&&this[a]!=null&&this.initialReflectedProperties.set(a,this[a])}),ea(this,Wt,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};Wt=new WeakMap;f([c()],H.prototype,"dir",2);f([c()],H.prototype,"lang",2);f([c({type:Boolean,reflect:!0,attribute:"did-ssr"})],H.prototype,"didSSR",2);var ge=Math.min,X=Math.max,St=Math.round,At=Math.floor,de=e=>({x:e,y:e}),Zi={left:"right",right:"left",bottom:"top",top:"bottom"};function Vt(e,t,o){return X(e,ge(t,o))}function qe(e,t){return typeof e=="function"?e(t):e}function Se(e){return e.split("-")[0]}function Ue(e){return e.split("-")[1]}function So(e){return e==="x"?"y":"x"}function jt(e){return e==="y"?"height":"width"}function ye(e){let t=e[0];return t==="t"||t==="b"?"y":"x"}function Gt(e){return So(ye(e))}function aa(e,t,o){o===void 0&&(o=!1);let r=Ue(e),a=Gt(e),s=jt(a),i=a==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[s]>t.floating[s]&&(i=Ct(i)),[i,Ct(i)]}function sa(e){let t=Ct(e);return[Nt(e),t,Nt(t)]}function Nt(e){return e.includes("start")?e.replace("start","end"):e.replace("end","start")}var oa=["left","right"],ra=["right","left"],Qi=["top","bottom"],Ji=["bottom","top"];function en(e,t,o){switch(e){case"top":case"bottom":return o?t?ra:oa:t?oa:ra;case"left":case"right":return t?Qi:Ji;default:return[]}}function ia(e,t,o,r){let a=Ue(e),s=en(Se(e),o==="start",r);return a&&(s=s.map(i=>i+"-"+a),t&&(s=s.concat(s.map(Nt)))),s}function Ct(e){let t=Se(e);return Zi[t]+e.slice(t.length)}function tn(e){return{top:0,right:0,bottom:0,left:0,...e}}function Ao(e){return typeof e!="number"?tn(e):{top:e,right:e,bottom:e,left:e}}function He(e){let{x:t,y:o,width:r,height:a}=e;return{width:r,height:a,top:o,left:t,right:t+r,bottom:o+a,x:t,y:o}}function na(e,t,o){let{reference:r,floating:a}=e,s=ye(t),i=Gt(t),n=jt(i),l=Se(t),u=s==="y",p=r.x+r.width/2-a.width/2,d=r.y+r.height/2-a.height/2,h=r[n]/2-a[n]/2,m;switch(l){case"top":m={x:p,y:r.y-a.height};break;case"bottom":m={x:p,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:d};break;case"left":m={x:r.x-a.width,y:d};break;default:m={x:r.x,y:r.y}}switch(Ue(t)){case"start":m[i]-=h*(o&&u?-1:1);break;case"end":m[i]+=h*(o&&u?-1:1);break}return m}async function la(e,t){var o;t===void 0&&(t={});let{x:r,y:a,platform:s,rects:i,elements:n,strategy:l}=e,{boundary:u="clippingAncestors",rootBoundary:p="viewport",elementContext:d="floating",altBoundary:h=!1,padding:m=0}=qe(t,e),x=Ao(m),S=n[h?d==="floating"?"reference":"floating":d],y=He(await s.getClippingRect({element:(o=await(s.isElement==null?void 0:s.isElement(S)))==null||o?S:S.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(n.floating)),boundary:u,rootBoundary:p,strategy:l})),b=d==="floating"?{x:r,y:a,width:i.floating.width,height:i.floating.height}:i.reference,E=await(s.getOffsetParent==null?void 0:s.getOffsetParent(n.floating)),w=await(s.isElement==null?void 0:s.isElement(E))?await(s.getScale==null?void 0:s.getScale(E))||{x:1,y:1}:{x:1,y:1},O=He(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:n,rect:b,offsetParent:E,strategy:l}):b);return{top:(y.top-O.top+x.top)/w.y,bottom:(O.bottom-y.bottom+x.bottom)/w.y,left:(y.left-O.left+x.left)/w.x,right:(O.right-y.right+x.right)/w.x}}var on=50,fa=async(e,t,o)=>{let{placement:r="bottom",strategy:a="absolute",middleware:s=[],platform:i}=o,n=i.detectOverflow?i:{...i,detectOverflow:la},l=await(i.isRTL==null?void 0:i.isRTL(t)),u=await i.getElementRects({reference:e,floating:t,strategy:a}),{x:p,y:d}=na(u,r,l),h=r,m=0,x={};for(let g=0;g<s.length;g++){let S=s[g];if(!S)continue;let{name:y,fn:b}=S,{x:E,y:w,data:O,reset:C}=await b({x:p,y:d,initialPlacement:r,placement:h,strategy:a,middlewareData:x,rects:u,platform:n,elements:{reference:e,floating:t}});p=E??p,d=w??d,x[y]={...x[y],...O},C&&m<on&&(m++,typeof C=="object"&&(C.placement&&(h=C.placement),C.rects&&(u=C.rects===!0?await i.getElementRects({reference:e,floating:t,strategy:a}):C.rects),{x:p,y:d}=na(u,h,l)),g=-1)}return{x:p,y:d,placement:h,strategy:a,middlewareData:x}},da=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:r,placement:a,rects:s,platform:i,elements:n,middlewareData:l}=t,{element:u,padding:p=0}=qe(e,t)||{};if(u==null)return{};let d=Ao(p),h={x:o,y:r},m=Gt(a),x=jt(m),g=await i.getDimensions(u),S=m==="y",y=S?"top":"left",b=S?"bottom":"right",E=S?"clientHeight":"clientWidth",w=s.reference[x]+s.reference[m]-h[m]-s.floating[x],O=h[m]-s.reference[m],C=await(i.getOffsetParent==null?void 0:i.getOffsetParent(u)),$=C?C[E]:0;(!$||!await(i.isElement==null?void 0:i.isElement(C)))&&($=n.floating[E]||s.floating[x]);let j=w/2-O/2,J=$/2-g[x]/2-1,te=ge(d[y],J),Pe=ge(d[b],J),ce=te,Te=$-g[x]-Pe,G=$/2-g[x]/2+j,$e=Vt(ce,G,Te),ve=!l.arrow&&Ue(a)!=null&&G!==$e&&s.reference[x]/2-(G<ce?te:Pe)-g[x]/2<0,ne=ve?G<ce?G-ce:G-Te:0;return{[m]:h[m]+ne,data:{[m]:$e,centerOffset:G-$e-ne,...ve&&{alignmentOffset:ne}},reset:ve}}});var ua=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,r;let{placement:a,middlewareData:s,rects:i,initialPlacement:n,platform:l,elements:u}=t,{mainAxis:p=!0,crossAxis:d=!0,fallbackPlacements:h,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:g=!0,...S}=qe(e,t);if((o=s.arrow)!=null&&o.alignmentOffset)return{};let y=Se(a),b=ye(n),E=Se(n)===n,w=await(l.isRTL==null?void 0:l.isRTL(u.floating)),O=h||(E||!g?[Ct(n)]:sa(n)),C=x!=="none";!h&&C&&O.push(...ia(n,g,x,w));let $=[n,...O],j=await l.detectOverflow(t,S),J=[],te=((r=s.flip)==null?void 0:r.overflows)||[];if(p&&J.push(j[y]),d){let G=aa(a,i,w);J.push(j[G[0]],j[G[1]])}if(te=[...te,{placement:a,overflows:J}],!J.every(G=>G<=0)){var Pe,ce;let G=(((Pe=s.flip)==null?void 0:Pe.index)||0)+1,$e=$[G];if($e&&(!(d==="alignment"?b!==ye($e):!1)||te.every(le=>ye(le.placement)===b?le.overflows[0]>0:!0)))return{data:{index:G,overflows:te},reset:{placement:$e}};let ve=(ce=te.filter(ne=>ne.overflows[0]<=0).sort((ne,le)=>ne.overflows[1]-le.overflows[1])[0])==null?void 0:ce.placement;if(!ve)switch(m){case"bestFit":{var Te;let ne=(Te=te.filter(le=>{if(C){let Re=ye(le.placement);return Re===b||Re==="y"}return!0}).map(le=>[le.placement,le.overflows.filter(Re=>Re>0).reduce((Re,Si)=>Re+Si,0)]).sort((le,Re)=>le[1]-Re[1])[0])==null?void 0:Te[0];ne&&(ve=ne);break}case"initialPlacement":ve=n;break}if(a!==ve)return{reset:{placement:ve}}}return{}}}};var rn=new Set(["left","top"]);async function an(e,t){let{placement:o,platform:r,elements:a}=e,s=await(r.isRTL==null?void 0:r.isRTL(a.floating)),i=Se(o),n=Ue(o),l=ye(o)==="y",u=rn.has(i)?-1:1,p=s&&l?-1:1,d=qe(t,e),{mainAxis:h,crossAxis:m,alignmentAxis:x}=typeof d=="number"?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return n&&typeof x=="number"&&(m=n==="end"?x*-1:x),l?{x:m*p,y:h*u}:{x:h*u,y:m*p}}var pa=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,r;let{x:a,y:s,placement:i,middlewareData:n}=t,l=await an(t,e);return i===((o=n.offset)==null?void 0:o.placement)&&(r=n.arrow)!=null&&r.alignmentOffset?{}:{x:a+l.x,y:s+l.y,data:{...l,placement:i}}}}},ca=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:r,placement:a,platform:s}=t,{mainAxis:i=!0,crossAxis:n=!1,limiter:l={fn:y=>{let{x:b,y:E}=y;return{x:b,y:E}}},...u}=qe(e,t),p={x:o,y:r},d=await s.detectOverflow(t,u),h=ye(Se(a)),m=So(h),x=p[m],g=p[h];if(i){let y=m==="y"?"top":"left",b=m==="y"?"bottom":"right",E=x+d[y],w=x-d[b];x=Vt(E,x,w)}if(n){let y=h==="y"?"top":"left",b=h==="y"?"bottom":"right",E=g+d[y],w=g-d[b];g=Vt(E,g,w)}let S=l.fn({...t,[m]:x,[h]:g});return{...S,data:{x:S.x-o,y:S.y-r,enabled:{[m]:i,[h]:n}}}}}};var ma=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var o,r;let{placement:a,rects:s,platform:i,elements:n}=t,{apply:l=()=>{},...u}=qe(e,t),p=await i.detectOverflow(t,u),d=Se(a),h=Ue(a),m=ye(a)==="y",{width:x,height:g}=s.floating,S,y;d==="top"||d==="bottom"?(S=d,y=h===(await(i.isRTL==null?void 0:i.isRTL(n.floating))?"start":"end")?"left":"right"):(y=d,S=h==="end"?"top":"bottom");let b=g-p.top-p.bottom,E=x-p.left-p.right,w=ge(g-p[S],b),O=ge(x-p[y],E),C=!t.middlewareData.shift,$=w,j=O;if((o=t.middlewareData.shift)!=null&&o.enabled.x&&(j=E),(r=t.middlewareData.shift)!=null&&r.enabled.y&&($=b),C&&!h){let te=X(p.left,0),Pe=X(p.right,0),ce=X(p.top,0),Te=X(p.bottom,0);m?j=x-2*(te!==0||Pe!==0?te+Pe:X(p.left,p.right)):$=g-2*(ce!==0||Te!==0?ce+Te:X(p.top,p.bottom))}await l({...t,availableWidth:j,availableHeight:$});let J=await i.getDimensions(n.floating);return x!==J.width||g!==J.height?{reset:{rects:!0}}:{}}}};function Xt(){return typeof window<"u"}function We(e){return xa(e)?(e.nodeName||"").toLowerCase():"#document"}function Q(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ue(e){var t;return(t=(xa(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function xa(e){return Xt()?e instanceof Node||e instanceof Q(e).Node:!1}function re(e){return Xt()?e instanceof Element||e instanceof Q(e).Element:!1}function be(e){return Xt()?e instanceof HTMLElement||e instanceof Q(e).HTMLElement:!1}function ha(e){return!Xt()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Q(e).ShadowRoot}function Ze(e){let{overflow:t,overflowX:o,overflowY:r,display:a}=ae(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+o)&&a!=="inline"&&a!=="contents"}function ga(e){return/^(table|td|th)$/.test(We(e))}function kt(e){try{if(e.matches(":popover-open"))return!0}catch{}try{return e.matches(":modal")}catch{return!1}}var sn=/transform|translate|scale|rotate|perspective|filter/,nn=/paint|layout|strict|content/,ze=e=>!!e&&e!=="none",ko;function Qe(e){let t=re(e)?ae(e):e;return ze(t.transform)||ze(t.translate)||ze(t.scale)||ze(t.rotate)||ze(t.perspective)||!Kt()&&(ze(t.backdropFilter)||ze(t.filter))||sn.test(t.willChange||"")||nn.test(t.contain||"")}function ya(e){let t=Ae(e);for(;be(t)&&!Ne(t);){if(Qe(t))return t;if(kt(t))return null;t=Ae(t)}return null}function Kt(){return ko==null&&(ko=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),ko}function Ne(e){return/^(html|body|#document)$/.test(We(e))}function ae(e){return Q(e).getComputedStyle(e)}function Et(e){return re(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Ae(e){if(We(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ha(e)&&e.host||ue(e);return ha(t)?t.host:t}function ba(e){let t=Ae(e);return Ne(t)?e.ownerDocument?e.ownerDocument.body:e.body:be(t)&&Ze(t)?t:ba(t)}function ke(e,t,o){var r;t===void 0&&(t=[]),o===void 0&&(o=!0);let a=ba(e),s=a===((r=e.ownerDocument)==null?void 0:r.body),i=Q(a);if(s){let n=Yt(i);return t.concat(i,i.visualViewport||[],Ze(a)?a:[],n&&o?ke(n):[])}else return t.concat(a,ke(a,[],o))}function Yt(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function Sa(e){let t=ae(e),o=parseFloat(t.width)||0,r=parseFloat(t.height)||0,a=be(e),s=a?e.offsetWidth:o,i=a?e.offsetHeight:r,n=St(o)!==s||St(r)!==i;return n&&(o=s,r=i),{width:o,height:r,$:n}}function Po(e){return re(e)?e:e.contextElement}function Je(e){let t=Po(e);if(!be(t))return de(1);let o=t.getBoundingClientRect(),{width:r,height:a,$:s}=Sa(t),i=(s?St(o.width):o.width)/r,n=(s?St(o.height):o.height)/a;return(!i||!Number.isFinite(i))&&(i=1),(!n||!Number.isFinite(n))&&(n=1),{x:i,y:n}}var ln=de(0);function Aa(e){let t=Q(e);return!Kt()||!t.visualViewport?ln:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function fn(e,t,o){return t===void 0&&(t=!1),!o||t&&o!==Q(e)?!1:t}function Ve(e,t,o,r){t===void 0&&(t=!1),o===void 0&&(o=!1);let a=e.getBoundingClientRect(),s=Po(e),i=de(1);t&&(r?re(r)&&(i=Je(r)):i=Je(e));let n=fn(s,o,r)?Aa(s):de(0),l=(a.left+n.x)/i.x,u=(a.top+n.y)/i.y,p=a.width/i.x,d=a.height/i.y;if(s){let h=Q(s),m=r&&re(r)?Q(r):r,x=h,g=Yt(x);for(;g&&r&&m!==x;){let S=Je(g),y=g.getBoundingClientRect(),b=ae(g),E=y.left+(g.clientLeft+parseFloat(b.paddingLeft))*S.x,w=y.top+(g.clientTop+parseFloat(b.paddingTop))*S.y;l*=S.x,u*=S.y,p*=S.x,d*=S.y,l+=E,u+=w,x=Q(g),g=Yt(x)}}return He({width:p,height:d,x:l,y:u})}function Zt(e,t){let o=Et(e).scrollLeft;return t?t.left+o:Ve(ue(e)).left+o}function ka(e,t){let o=e.getBoundingClientRect(),r=o.left+t.scrollLeft-Zt(e,o),a=o.top+t.scrollTop;return{x:r,y:a}}function dn(e){let{elements:t,rect:o,offsetParent:r,strategy:a}=e,s=a==="fixed",i=ue(r),n=t?kt(t.floating):!1;if(r===i||n&&s)return o;let l={scrollLeft:0,scrollTop:0},u=de(1),p=de(0),d=be(r);if((d||!d&&!s)&&((We(r)!=="body"||Ze(i))&&(l=Et(r)),d)){let m=Ve(r);u=Je(r),p.x=m.x+r.clientLeft,p.y=m.y+r.clientTop}let h=i&&!d&&!s?ka(i,l):de(0);return{width:o.width*u.x,height:o.height*u.y,x:o.x*u.x-l.scrollLeft*u.x+p.x+h.x,y:o.y*u.y-l.scrollTop*u.y+p.y+h.y}}function un(e){return Array.from(e.getClientRects())}function pn(e){let t=ue(e),o=Et(e),r=e.ownerDocument.body,a=X(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),s=X(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),i=-o.scrollLeft+Zt(e),n=-o.scrollTop;return ae(r).direction==="rtl"&&(i+=X(t.clientWidth,r.clientWidth)-a),{width:a,height:s,x:i,y:n}}var va=25;function cn(e,t){let o=Q(e),r=ue(e),a=o.visualViewport,s=r.clientWidth,i=r.clientHeight,n=0,l=0;if(a){s=a.width,i=a.height;let p=Kt();(!p||p&&t==="fixed")&&(n=a.offsetLeft,l=a.offsetTop)}let u=Zt(r);if(u<=0){let p=r.ownerDocument,d=p.body,h=getComputedStyle(d),m=p.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,x=Math.abs(r.clientWidth-d.clientWidth-m);x<=va&&(s-=x)}else u<=va&&(s+=u);return{width:s,height:i,x:n,y:l}}function mn(e,t){let o=Ve(e,!0,t==="fixed"),r=o.top+e.clientTop,a=o.left+e.clientLeft,s=be(e)?Je(e):de(1),i=e.clientWidth*s.x,n=e.clientHeight*s.y,l=a*s.x,u=r*s.y;return{width:i,height:n,x:l,y:u}}function wa(e,t,o){let r;if(t==="viewport")r=cn(e,o);else if(t==="document")r=pn(ue(e));else if(re(t))r=mn(t,o);else{let a=Aa(e);r={x:t.x-a.x,y:t.y-a.y,width:t.width,height:t.height}}return He(r)}function Ea(e,t){let o=Ae(e);return o===t||!re(o)||Ne(o)?!1:ae(o).position==="fixed"||Ea(o,t)}function hn(e,t){let o=t.get(e);if(o)return o;let r=ke(e,[],!1).filter(n=>re(n)&&We(n)!=="body"),a=null,s=ae(e).position==="fixed",i=s?Ae(e):e;for(;re(i)&&!Ne(i);){let n=ae(i),l=Qe(i);!l&&n.position==="fixed"&&(a=null),(s?!l&&!a:!l&&n.position==="static"&&!!a&&(a.position==="absolute"||a.position==="fixed")||Ze(i)&&!l&&Ea(e,i))?r=r.filter(p=>p!==i):a=n,i=Ae(i)}return t.set(e,r),r}function xn(e){let{element:t,boundary:o,rootBoundary:r,strategy:a}=e,i=[...o==="clippingAncestors"?kt(t)?[]:hn(t,this._c):[].concat(o),r],n=wa(t,i[0],a),l=n.top,u=n.right,p=n.bottom,d=n.left;for(let h=1;h<i.length;h++){let m=wa(t,i[h],a);l=X(m.top,l),u=ge(m.right,u),p=ge(m.bottom,p),d=X(m.left,d)}return{width:u-d,height:p-l,x:d,y:l}}function gn(e){let{width:t,height:o}=Sa(e);return{width:t,height:o}}function yn(e,t,o){let r=be(t),a=ue(t),s=o==="fixed",i=Ve(e,!0,s,t),n={scrollLeft:0,scrollTop:0},l=de(0);function u(){l.x=Zt(a)}if(r||!r&&!s)if((We(t)!=="body"||Ze(a))&&(n=Et(t)),r){let m=Ve(t,!0,s,t);l.x=m.x+t.clientLeft,l.y=m.y+t.clientTop}else a&&u();s&&!r&&a&&u();let p=a&&!r&&!s?ka(a,n):de(0),d=i.left+n.scrollLeft-l.x-p.x,h=i.top+n.scrollTop-l.y-p.y;return{x:d,y:h,width:i.width,height:i.height}}function Eo(e){return ae(e).position==="static"}function Ca(e,t){if(!be(e)||ae(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return ue(e)===o&&(o=o.ownerDocument.body),o}function Pa(e,t){let o=Q(e);if(kt(e))return o;if(!be(e)){let a=Ae(e);for(;a&&!Ne(a);){if(re(a)&&!Eo(a))return a;a=Ae(a)}return o}let r=Ca(e,t);for(;r&&ga(r)&&Eo(r);)r=Ca(r,t);return r&&Ne(r)&&Eo(r)&&!Qe(r)?o:r||ya(e)||o}var bn=async function(e){let t=this.getOffsetParent||Pa,o=this.getDimensions,r=await o(e.floating);return{reference:yn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function vn(e){return ae(e).direction==="rtl"}var Pt={convertOffsetParentRelativeRectToViewportRelativeRect:dn,getDocumentElement:ue,getClippingRect:xn,getOffsetParent:Pa,getElementRects:bn,getClientRects:un,getDimensions:gn,getScale:Je,isElement:re,isRTL:vn};function Ta(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function wn(e,t){let o=null,r,a=ue(e);function s(){var n;clearTimeout(r),(n=o)==null||n.disconnect(),o=null}function i(n,l){n===void 0&&(n=!1),l===void 0&&(l=1),s();let u=e.getBoundingClientRect(),{left:p,top:d,width:h,height:m}=u;if(n||t(),!h||!m)return;let x=At(d),g=At(a.clientWidth-(p+h)),S=At(a.clientHeight-(d+m)),y=At(p),E={rootMargin:-x+"px "+-g+"px "+-S+"px "+-y+"px",threshold:X(0,ge(1,l))||1},w=!0;function O(C){let $=C[0].intersectionRatio;if($!==l){if(!w)return i();$?i(!1,$):r=setTimeout(()=>{i(!1,1e-7)},1e3)}$===1&&!Ta(u,e.getBoundingClientRect())&&i(),w=!1}try{o=new IntersectionObserver(O,{...E,root:a.ownerDocument})}catch{o=new IntersectionObserver(O,E)}o.observe(e)}return i(!0),s}function Ra(e,t,o,r){r===void 0&&(r={});let{ancestorScroll:a=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:n=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,u=Po(e),p=a||s?[...u?ke(u):[],...t?ke(t):[]]:[];p.forEach(y=>{a&&y.addEventListener("scroll",o,{passive:!0}),s&&y.addEventListener("resize",o)});let d=u&&n?wn(u,o):null,h=-1,m=null;i&&(m=new ResizeObserver(y=>{let[b]=y;b&&b.target===u&&m&&t&&(m.unobserve(t),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var E;(E=m)==null||E.observe(t)})),o()}),u&&!l&&m.observe(u),t&&m.observe(t));let x,g=l?Ve(e):null;l&&S();function S(){let y=Ve(e);g&&!Ta(g,y)&&o(),g=y,x=requestAnimationFrame(S)}return o(),()=>{var y;p.forEach(b=>{a&&b.removeEventListener("scroll",o),s&&b.removeEventListener("resize",o)}),d?.(),(y=m)==null||y.disconnect(),m=null,l&&cancelAnimationFrame(x)}}var La=pa;var _a=ca,$a=ua,To=ma;var Da=da;var Oa=(e,t,o)=>{let r=new Map,a={platform:Pt,...o},s={...a.platform,_c:r};return fa(e,t,{...a,platform:s})};function Ma(e){return Cn(e)}function Ro(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Cn(e){for(let t=e;t;t=Ro(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=Ro(e);t;t=Ro(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||Qe(o)||t.tagName==="BODY"))return t}return null}var Ee={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qt=e=>(...t)=>({_$litDirective$:e,values:t}),et=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var se=Qt(class extends et{constructor(e){if(super(e),e.type!==Ee.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let a=!!t[r];a===this.st.has(r)||this.nt?.has(r)||(a?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return Y}});function Ba(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var Jt=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),R=class extends H{constructor(){super(...arguments),this.localize=new he(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,a=0,s=0,i=0,n=0,l=0,u=0,p=0;o?e.top<t.top?(r=e.left,a=e.bottom,s=e.right,i=e.bottom,n=t.left,l=t.top,u=t.right,p=t.top):(r=t.left,a=t.bottom,s=t.right,i=t.bottom,n=e.left,l=e.top,u=e.right,p=e.top):e.left<t.left?(r=e.right,a=e.top,s=t.left,i=t.top,n=e.right,l=e.bottom,u=t.left,p=t.bottom):(r=t.right,a=t.top,s=e.left,i=e.top,n=t.right,l=t.bottom,u=e.left,p=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${i}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${u}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${p}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||Ba(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Ra(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[La({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(To({apply:({rects:r})=>{let a=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=a?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;Jt&&!Ba(this.anchor)&&this.boundary==="scroll"&&(t=ke(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&e.push($a({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(_a({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(To({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:a})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${a}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(Da({element:this.arrowEl,padding:this.arrowPadding}));let o=Jt?r=>Pt.getOffsetParent(r,Ma):Pt.getOffsetParent;Oa(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:Jt?"absolute":"fixed",platform:{...Pt,getOffsetParent:o}}).then(({x:r,y:a,middlewareData:s,placement:i})=>{let n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${r}px`,top:`${a}px`}),this.arrow){let u=s.arrow.x,p=s.arrow.y,d="",h="",m="",x="";if(this.arrowPlacement==="start"){let g=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";d=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=n?g:"",x=n?"":g}else if(this.arrowPlacement==="end"){let g=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=n?"":g,x=n?g:"",m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(x=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":"",d=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(x=typeof u=="number"?`${u}px`:"",d=typeof p=="number"?`${p}px`:"");Object.assign(this.arrowEl.style,{top:d,right:h,bottom:m,left:x,[l]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Nr)}render(){return T`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${se({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${se({popup:!0,"popup-active":this.active,"popup-fixed":!Jt,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?T`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};R.css=Vr;f([P(".popup")],R.prototype,"popup",2);f([P(".arrow")],R.prototype,"arrowEl",2);f([c()],R.prototype,"anchor",2);f([c({type:Boolean,reflect:!0})],R.prototype,"active",2);f([c({reflect:!0})],R.prototype,"placement",2);f([c()],R.prototype,"boundary",2);f([c({type:Number})],R.prototype,"distance",2);f([c({type:Number})],R.prototype,"skidding",2);f([c({type:Boolean})],R.prototype,"arrow",2);f([c({attribute:"arrow-placement"})],R.prototype,"arrowPlacement",2);f([c({attribute:"arrow-padding",type:Number})],R.prototype,"arrowPadding",2);f([c({type:Boolean})],R.prototype,"flip",2);f([c({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],R.prototype,"flipFallbackPlacements",2);f([c({attribute:"flip-fallback-strategy"})],R.prototype,"flipFallbackStrategy",2);f([c({type:Object})],R.prototype,"flipBoundary",2);f([c({attribute:"flip-padding",type:Number})],R.prototype,"flipPadding",2);f([c({type:Boolean})],R.prototype,"shift",2);f([c({type:Object})],R.prototype,"shiftBoundary",2);f([c({attribute:"shift-padding",type:Number})],R.prototype,"shiftPadding",2);f([c({attribute:"auto-size"})],R.prototype,"autoSize",2);f([c()],R.prototype,"sync",2);f([c({type:Object})],R.prototype,"autoSizeBoundary",2);f([c({attribute:"auto-size-padding",type:Number})],R.prototype,"autoSizePadding",2);f([c({attribute:"hover-bridge",type:Boolean})],R.prototype,"hoverBridge",2);R=f([U("wa-popup")],R);var eo=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var to=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var oo=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var ro=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var je=[];function Fa(e){je.push(e)}function Lo(e){for(let t=je.length-1;t>=0;t--)if(je[t]===e){je.splice(t,1);break}}function Ia(e){return je.length>0&&je[je.length-1]===e}var qa="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Ua=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=qa[o[e]&63];return t};function Ha(e,t,o){let r=a=>Object.is(a,-0)?0:a;return e<t?r(t):e>o?r(o):r(e)}function za(e=""){return`${e}${Ua()}`}function tt(e,t){return new Promise(o=>{function r(a){a.target===e&&(e.removeEventListener(t,r),o())}e.addEventListener(t,r)})}async function ot(e,t,o){return e.animate(t,o).finished.catch(()=>{})}function _o(e,t){return new Promise(o=>{let r=new AbortController,{signal:a}=r;if(e.classList.contains(t))return;e.classList.add(t);let s=!1,i=()=>{s||(s=!0,e.classList.remove(t),o(),r.abort())};e.addEventListener("animationend",i,{once:!0,signal:a}),e.addEventListener("animationcancel",i,{once:!0,signal:a}),requestAnimationFrame(()=>{!s&&e.getAnimations().length===0&&i()})})}function rt(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}function D(e,t){let o={waitUntilFirstUpdate:!1,...t};return(r,a)=>{let{update:s}=r,i=Array.isArray(e)?e:[e];r.update=function(n){i.forEach(l=>{let u=l;if(n.has(u)){let p=n.get(u),d=this[u];p!==d&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[a](p,d)}}),s.call(this,n)}}}var B=class extends H{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Ia(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=!!this.anchor?.matches(":hover"),t=this.matches(":hover");if(e||t)return;clearTimeout(this.hoverTimeout),e||t||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=za("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),Lo(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let r=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(t)||(r.push(t),e.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(e,t){let a=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(s=>s!==t);a.length>0?e.setAttribute("aria-labelledby",a.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new eo;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),Fa(this),this.body.hidden=!1,this.popup.active=!0,await _o(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new ro)}else{let e=new to;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),Lo(this),await _o(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new oo)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,o=this.anchor;if(t===o)return;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),t.addEventListener("click",this.handleClick,{signal:r}),t.addEventListener("mouseover",this.handleMouseOver,{signal:r}),t.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,tt(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,tt(this,"wa-after-hide")}render(){return T`
      <wa-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${se({tooltip:!0,"tooltip-open":this.open})}
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
    `}};B.css=Wr;B.dependencies={"wa-popup":R};f([P("slot:not([name])")],B.prototype,"defaultSlot",2);f([P(".body")],B.prototype,"body",2);f([P("wa-popup")],B.prototype,"popup",2);f([c()],B.prototype,"placement",2);f([c({type:Boolean,reflect:!0})],B.prototype,"disabled",2);f([c({type:Number})],B.prototype,"distance",2);f([c({type:Boolean,reflect:!0})],B.prototype,"open",2);f([c({type:Number})],B.prototype,"skidding",2);f([c({attribute:"show-delay",type:Number})],B.prototype,"showDelay",2);f([c({attribute:"hide-delay",type:Number})],B.prototype,"hideDelay",2);f([c()],B.prototype,"trigger",2);f([c({attribute:"without-arrow",type:Boolean,reflect:!0})],B.prototype,"withoutArrow",2);f([c()],B.prototype,"for",2);f([Z()],B.prototype,"anchor",2);f([D("open",{waitUntilFirstUpdate:!0})],B.prototype,"handleOpenChange",1);f([D("for")],B.prototype,"handleForChange",1);f([D(["distance","placement","skidding"])],B.prototype,"handleOptionsChange",1);f([D("disabled")],B.prototype,"handleDisabledChange",1);B=f([U("wa-tooltip")],B);var ao={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Wa=([e,t,o])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(a=>{r.setAttribute(a,String(t[a]))}),o?.length&&o.forEach(a=>{let s=Wa(a);r.appendChild(s)}),r},Na=(e,t={})=>{let r={...ao,...t};return Wa(["svg",r,e])};var Va=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var ja=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();var Ga=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,r)=>r?r.toUpperCase():o.toLowerCase());var Xa=e=>{let t=Ga(e);return t.charAt(0).toUpperCase()+t.slice(1)};var Sn=e=>Array.from(e.attributes).reduce((t,o)=>(t[o.name]=o.value,t),{}),Ka=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",$o=(e,{nameAttr:t,icons:o,attrs:r})=>{let a=e.getAttribute(t);if(a==null)return;let s=Xa(a),i=o[s];if(!i)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let n=Sn(e),l=Va(n)?{}:{"aria-hidden":"true"},u={...ao,"data-lucide":a,...l,...r,...n},p=Ka(n),d=Ka(r),h=ja("lucide",`lucide-${a}`,...p,...d);h&&Object.assign(u,{class:h});let m=Na(i,u);return e.parentNode?.replaceChild(m,e)};var Do=[["path",{d:"m9 18 6-6-6-6"}]];var Oo=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var Mo=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]];var Bo=({icons:e={},nameAttr:t="data-lucide",attrs:o={},root:r=document,inTemplates:a}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${t}]`)).forEach(i=>$o(i,{nameAttr:t,icons:e,attrs:o})),a&&Array.from(r.querySelectorAll("template")).forEach(n=>Bo({icons:e,nameAttr:t,attrs:o,root:n.content,inTemplates:a})),t==="data-lucide"){let i=r.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach(n=>$o(n,{nameAttr:"icon-name",icons:e,attrs:o})))}};var Ya="data-icon";function Za([e,t]){let o=document.createElement("span");return o.setAttribute(Ya,t),o.setAttribute("slot",e),o}function so(e){Bo({icons:{ChevronRight:Do,Link:Oo,Unlink:Mo},attrs:{width:16,height:16},nameAttr:Ya,root:e?.root})}var io={REST:"rest",SUCCESS:"success"},Qa,Ja,es,ts,os,rs,as,ss,is,ns,ls,fs,ds,A,Fo,Io,qo,Uo,Ho,zo,Wo,No,Vo,jo,Go;ds=[U("copy-url")];var W=class extends(fs=oe,ls=[P('slot[name="copy-icon"]')],ns=[P('slot[name="success-icon"]')],is=[c()],ss=[c({attribute:"copy-label"})],as=[c()],rs=[c()],os=[c()],ts=[c({attribute:"success-label"})],es=[c({attribute:"tooltip-placement"})],Ja=[Z()],Qa=[Z()],fs){constructor(){super(...arguments);_(this,Fo,v(A,8,this)),v(A,11,this);_(this,Io,v(A,12,this)),v(A,15,this);_(this,qo,v(A,16,this,"")),v(A,19,this);_(this,Uo,v(A,20,this,"Copy link")),v(A,23,this);_(this,Ho,v(A,24,this,1e3)),v(A,27,this);_(this,zo,v(A,28,this,Ar)),v(A,31,this);_(this,Wo,v(A,32,this,Sr)),v(A,35,this);_(this,No,v(A,36,this,"Copied")),v(A,39,this);_(this,Vo,v(A,40,this,"top")),v(A,43,this);_(this,jo,v(A,44,this,!1)),v(A,47,this);_(this,Go,v(A,48,this,io.REST)),v(A,51,this)}async handleCopy(){let o,r;this.isCopying||(this.isCopying=!0,o=new URL(window.location.href),o.hash=this.from,r=o.href,r&&(await navigator.clipboard.writeText(r),await this.animateIcon()))}firstUpdated(){super.firstUpdated(),so({root:this.shadowRoot})}get label(){return this.status===io.SUCCESS?this.successLabel:this.copyLabel}render(){return T`
      <button
        id="copy-button"
        class="copy-button__button"
        part="button"
        type="button"
        @click=${this.handleCopy}
      >
        <slot part="copy-icon" name="copy-icon">
          <span data-icon="link" slot="copy-icon"></span>
        </slot>
        <slot part="success-icon" name="success-icon">
          <span data-icon="link" slot="success-icon"></span>
        </slot>
        <wa-tooltip
          class="copy-url"
          for="copy-button"
          placement=${this.tooltipPlacement}
          ?disabled=${this.disabled}
          exportparts="
            base:tooltip__base,
            base__popup:tooltip__base__popup,
            base__arrow:tooltip__base__arrow,
            body:tooltip__body
          "
          >${this.label}</wa-tooltip
        >
      </button>
    `}async animateIcon(){let{matches:o}=window.matchMedia("(prefers-reduced-motion: reduce)"),r=o?this.showAnimationReducedMotion:this.showAnimation;this.copyIcon.hidden=!1,this.status=io.SUCCESS,await this.successIcon.animate(r.keyframes,r.options).finished,setTimeout(()=>{document.documentElement.style.setProperty("--jsdoc-copy-icon-opacity",0),this.copyIcon.hidden=!0,this.isCopying=!1,this.status=io.REST},this.feedbackDuration)}};A=_t(fs),Fo=new WeakMap,Io=new WeakMap,qo=new WeakMap,Uo=new WeakMap,Ho=new WeakMap,zo=new WeakMap,Wo=new WeakMap,No=new WeakMap,Vo=new WeakMap,jo=new WeakMap,Go=new WeakMap,I(A,4,"copyIcon",ls,W,Fo),I(A,4,"successIcon",ns,W,Io),I(A,4,"from",is,W,qo),I(A,4,"copyLabel",ss,W,Uo),I(A,4,"feedbackDuration",as,W,Ho),I(A,4,"showAnimation",rs,W,zo),I(A,4,"showAnimationReducedMotion",os,W,Wo),I(A,4,"successLabel",ts,W,No),I(A,4,"tooltipPlacement",es,W,Vo),I(A,4,"isCopying",Ja,W,jo),I(A,4,"status",Qa,W,Go),W=I(A,0,"CopyUrl",ds,W),$t(W,"styles",[L`
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
    `,L`
      :host {
        --wa-tooltip-arrow-size: 0.5rem;
        --wa-tooltip-background-color: var(--jsdoc-color-zinc-600);
      }

      :host wa-tooltip {
        translatey: -0.5rem;
      }

      :host wa-tooltip::part(base__arrow) {
        --arrow-size-diagonal: calc(var(--arrow-size) * 0.6);
        --arrow-size-div: var(--arrow-size-diagonal);
        bottom: calc(var(--arrow-size-diagonal) * -1);
        height: calc(var(--arrow-size-diagonal) * 2);
        width: calc(var(--arrow-size-diagonal) * 2);
        z-index: -1;
      }

      :host wa-tooltip::part(base__popup) {
        transform: translate(0, -0.25rem);
      }

      :host wa-tooltip::part(body) {
        --wa-tooltip-border-radius: 0.25rem;
        background-color: var(--jsdoc-color-zinc-600);
        color: var(--jsdoc-color-white);
        font-size: calc(var(--jsdoc-font-font-size-base) * 0.8);
        font-family: var(--jsdoc-font-sans-serif-font);
        padding: 0.25rem 0.5rem;
      }
    `]),v(A,1,W);var An=["copy-url","jsdoc-outline","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let e=An.filter(t=>document.querySelector(t));await Promise.allSettled(e.map(t=>customElements.whenDefined(t)));for(let t of e)for(let o of document.querySelectorAll(t))o.classList.add("ready")})();var hs=Ri(cs(),1),ms="--navbar-scroll-margin";function Xo(e){let t=getComputedStyle(document.body),o;return e&&(o=getComputedStyle(e).getPropertyValue(ms)),o||(o=t.getPropertyValue(ms)),o=Number(o.replace("rem",""))*parseFloat(t.fontSize),Math.ceil(o/5)*5}(()=>{let e={PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SPACE:"Space"};function t(s,i){let n=Xo(s);return i-n}function o(s){(0,hs.default)({durationMs:200,startValue:window.scrollY,endValue:s,onStep:i=>window.scroll({behavior:"instant",top:i})})}function r(s,i,n){let l;i&&(l=document.getElementById(i),l&&(s.preventDefault(),o(t(l,l.offsetTop)),window.history.pushState(null,null,n)))}function a(s){return s.substring(1)}window.addEventListener("load",s=>{let i=a(document.location.hash);r(s,i,document.location.href)}),window.addEventListener("hashchange",s=>{let i=new URL(s.newURL),n=a(i.hash);r(s,n,i.hash)}),document.addEventListener("keydown",s=>{let i=s.code,n;i!==e.SPACE&&i!==e.PAGE_DOWN&&i!==e.PAGE_UP||(s.preventDefault(),s.stopImmediatePropagation(),n=t(null,window.innerHeight),i===e.PAGE_UP?o(window.scrollY-n):o(window.scrollY+n))})})();function En(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var Ge=En;var Pn=typeof global=="object"&&global&&global.Object===Object&&global,xs=Pn;var Tn=typeof self=="object"&&self&&self.Object===Object&&self,Rn=xs||Tn||Function("return this")(),no=Rn;var Ln=function(){return no.Date.now()},lo=Ln;var _n=/\s/;function $n(e){for(var t=e.length;t--&&_n.test(e.charAt(t)););return t}var gs=$n;var Dn=/^\s+/;function On(e){return e&&e.slice(0,gs(e)+1).replace(Dn,"")}var ys=On;var Mn=no.Symbol,at=Mn;var bs=Object.prototype,Bn=bs.hasOwnProperty,Fn=bs.toString,Tt=at?at.toStringTag:void 0;function In(e){var t=Bn.call(e,Tt),o=e[Tt];try{e[Tt]=void 0;var r=!0}catch{}var a=Fn.call(e);return r&&(t?e[Tt]=o:delete e[Tt]),a}var vs=In;var qn=Object.prototype,Un=qn.toString;function Hn(e){return Un.call(e)}var ws=Hn;var zn="[object Null]",Wn="[object Undefined]",Cs=at?at.toStringTag:void 0;function Nn(e){return e==null?e===void 0?Wn:zn:Cs&&Cs in Object(e)?vs(e):ws(e)}var Ss=Nn;function Vn(e){return e!=null&&typeof e=="object"}var As=Vn;var jn="[object Symbol]";function Gn(e){return typeof e=="symbol"||As(e)&&Ss(e)==jn}var ks=Gn;var Es=NaN,Xn=/^[-+]0x[0-9a-f]+$/i,Kn=/^0b[01]+$/i,Yn=/^0o[0-7]+$/i,Zn=parseInt;function Qn(e){if(typeof e=="number")return e;if(ks(e))return Es;if(Ge(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=Ge(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=ys(e);var o=Kn.test(e);return o||Yn.test(e)?Zn(e.slice(2),o?2:8):Xn.test(e)?Es:+e}var Ko=Qn;var Jn="Expected a function",el=Math.max,tl=Math.min;function ol(e,t,o){var r,a,s,i,n,l,u=0,p=!1,d=!1,h=!0;if(typeof e!="function")throw new TypeError(Jn);t=Ko(t)||0,Ge(o)&&(p=!!o.leading,d="maxWait"in o,s=d?el(Ko(o.maxWait)||0,t):s,h="trailing"in o?!!o.trailing:h);function m(C){var $=r,j=a;return r=a=void 0,u=C,i=e.apply(j,$),i}function x(C){return u=C,n=setTimeout(y,t),p?m(C):i}function g(C){var $=C-l,j=C-u,J=t-$;return d?tl(J,s-j):J}function S(C){var $=C-l,j=C-u;return l===void 0||$>=t||$<0||d&&j>=s}function y(){var C=lo();if(S(C))return b(C);n=setTimeout(y,g(C))}function b(C){return n=void 0,h&&r?m(C):(r=a=void 0,i)}function E(){n!==void 0&&clearTimeout(n),u=0,r=l=a=n=void 0}function w(){return n===void 0?i:b(lo())}function O(){var C=lo(),$=S(C);if(r=arguments,a=this,l=C,$){if(n===void 0)return x(l);if(d)return clearTimeout(n),n=setTimeout(y,t),m(l)}return n===void 0&&(n=setTimeout(y,t)),i}return O.cancel=E,O.flush=w,O}var Ps=ol;var rl="Expected a function";function al(e,t,o){var r=!0,a=!0;if(typeof e!="function")throw new TypeError(rl);return Ge(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),Ps(e,t,{leading:r,maxWait:t,trailing:a})}var Ts=al;var sl="h2, h3";function Is(e,t,o=[]){for(let r of e)r instanceof Comment||(r instanceof Text?o.push(r.textContent):r.matches(t)&&Is(r.childNodes,t,o));return o}function rr(e){if(e?.localName.startsWith("h")){let t=e.localName.substring(1),o=parseInt(t,10);if(o>=1&&o<=6)return o}return null}function il(e){return t=>{for(let o of t)if(o.target.parentElement.closest(e.levels)){e.updateTree();break}}}function nl(e,t){let o=`:not(copy-url, .${t.hideFromNavClass})`,r;return e?(r=Is(e.childNodes,o),r.join("").trim()):null}var ar=class{constructor(t,o){this.children=[],this.hideFromNav=o.isHidden(t),this.id=t?.id,this.level=rr(t),this.text=nl(t,o)}},Rs,Ls,_s,$s,Ds,Os,Ms,Bs,Fs,M,Yo,Zo,Qo,Jo,er,tr,or,st,it,nt,lt,ft,F,sr,qs,Us,Hs,zs,ir,Ws,nr,Ns;Fs=[U("jsdoc-outline")];var ee=class extends(Bs=oe,Ms=[P('slot[name="contents"]')],Os=[c({attribute:"hide-from-nav-class"})],Ds=[c({reflect:!0})],$s=[ta("a")],_s=[P('slot[name="title"]')],Ls=[c({reflect:!0})],Rs=[c()],Bs){constructor(){super();_(this,F);_(this,Yo,v(M,8,this)),v(M,11,this);_(this,Zo,v(M,12,this,"hide-from-nav")),v(M,15,this);_(this,Qo,v(M,16,this,sl)),v(M,19,this);_(this,Jo,v(M,20,this)),v(M,23,this);_(this,er,v(M,24,this)),v(M,27,this);_(this,tr,v(M,28,this,"On this page")),v(M,31,this);_(this,or,v(M,32,this)),v(M,35,this);_(this,st);_(this,it);_(this,nt);_(this,lt);_(this,ft);me(this,st,null),me(this,it,new WeakMap),me(this,nt,null),me(this,ft,new WeakSet)}connectedCallback(){super.connectedCallback(),this.updateTree()}firstUpdated(){super.firstUpdated(),me(this,nt,new MutationObserver(il(this))),K(this,F,Us).call(this);let o=Xo(),r=o/2;me(this,st,new IntersectionObserver(a=>K(this,F,qs).call(this,a,fe(this,ft)),{rootMargin:`-${o}px 0px -${r}px 0px`})),K(this,F,nr).call(this),K(this,F,Hs).call(this)}isHidden(o){return Array.from(o.classList).includes(this.hideFromNavClass)}render(){return this.tree?T`
      <nav class="container" aria-labelledby="title">
        <slot name="title">
          <h2 part="title" class="title">${this.titleText}</h2>
        </slot>
        <slot name="contents">
          <ul part="contents" class="contents">
            ${K(this,F,ir).call(this,this.tree)}
          </ul>
        </slot>
        <slot></slot>
      </nav>
    `:T``}updateTree(){return fe(this,lt)||me(this,lt,Ts(K(this,F,Ns),500)),fe(this,lt).call(this)}};M=_t(Bs),Yo=new WeakMap,Zo=new WeakMap,Qo=new WeakMap,Jo=new WeakMap,er=new WeakMap,tr=new WeakMap,or=new WeakMap,st=new WeakMap,it=new WeakMap,nt=new WeakMap,lt=new WeakMap,ft=new WeakMap,F=new WeakSet,sr=function(o,r){let a=[];for(r??(r={count:0});o.length;){let s=o.shift(),i,n;this.isHidden(s)||(n=new ar(s,this),r.count++,i=K(this,F,Ws).call(this,o,s),i.length&&(n.children=K(this,F,sr).call(this,i,r)),a.push(n))}return r.count<=1?null:a},qs=function(o,r){o.forEach(a=>{a.isIntersecting?r.add(a.target):r.delete(a.target)}),K(this,F,nr).call(this)},Us=function(){fe(this,nt).observe(document.body,{attributes:!0,characterData:!0,childList:!0,subtree:!0})},Hs=function(){for(let o of Array.from(this.links)){let r=o.hash.slice(1),a=r?document.getElementById(r):null;a&&(fe(this,it).set(o,a),fe(this,st).observe(a))}},zs=function(o){return o?T`
      <ul class="contents nested">
        ${K(this,F,ir).call(this,o)}
      </ul>
    `:T``},ir=function(o){let r=[];for(let a of o)r.push(T`
        <li>
          <p><a href="#${a.id}">${a.text}</a></p>
          ${K(this,F,zs).call(this,a.children)}
        </li>
      `);return r},Ws=function(o,r){let a=[],s=rr(r);for(;rr(o[0])>s;){let i=o.shift();this.isHidden(i)||a.push(i)}return a},nr=function(){let o=Array.from(this.links);o.find(r=>{let a=fe(this,it).get(r);return a&&fe(this,ft).has(a)?(o.forEach(s=>s.classList.toggle("current",s===r)),!0):!1})},Ns=function(){let r=this.levels.split(",").map(a=>a.trim()).map(a=>`.jsdoc-content ${a}`).join(", ");this.tree=K(this,F,sr).call(this,Array.from(document.querySelectorAll(r)))},I(M,4,"contents",Ms,ee,Yo),I(M,4,"hideFromNavClass",Os,ee,Zo),I(M,4,"levels",Ds,ee,Qo),I(M,4,"links",$s,ee,Jo),I(M,4,"title",_s,ee,er),I(M,4,"titleText",Ls,ee,tr),I(M,4,"tree",Rs,ee,or),ee=I(M,0,"Outline",Fs,ee),$t(ee,"styles",[L`
      :host {
        --outline-font-size: calc(var(--jsdoc-font-font-size-base) * 0.875);
        --outline-line-height: 0.825rem;
      }

      .contents {
        color: var(--jsdoc-color-zinc-700);
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
        margin-inline-start: 0.75rem;
      }

      .title {
        font-family: var(--jsdoc-font-body-font);
        font-size: var(--jsdoc-font-font-size-base);
        font-weight: bold;
        line-height: var(--outline-line-height);
        margin-inline-start: 1rem;
      }
    `]),v(M,1,ee);var Vs=L`
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
    box-sizing: border-box; /* Ensure contents don't overflow */
    padding-block-start: var(--spacing);
    padding-inline: var(--spacing); /* Add horizontal padding */
    padding-block-end: var(--spacing); /* Add bottom padding */
  }
`;var js=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var ll=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),ie=class extends H{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new js))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[ll()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let t=this.value;if(Array.isArray(t)){if(this.name){let o=new FormData;for(let r of t)o.append(this.name,r);this.setValue(o,o)}}else this.setValue(t,t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],r=e[2];r||(r=this.validationTarget),this.internals.setValidity(t,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let a of e){let{isValid:s,message:i,invalidKeys:n}=a.checkValidity(this);s||(r||(r=i),n?.length>=0&&n.forEach(l=>t[l]=!0))}r||(r=this.validationMessage),this.setValidity(t,r,o)}};ie.formAssociated=!0;f([c({reflect:!0})],ie.prototype,"name",2);f([c({type:Boolean})],ie.prototype,"disabled",2);f([c({state:!0,attribute:!1})],ie.prototype,"valueHasChanged",2);f([c({state:!0,attribute:!1})],ie.prototype,"hasInteracted",2);f([c({attribute:"custom-error",reflect:!0})],ie.prototype,"customError",2);f([c({attribute:!1,state:!0,type:Object})],ie.prototype,"validity",1);var V=class extends H{constructor(){super(...arguments),this.localize=new he(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(let t of e)t.type==="attributes"&&t.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){e.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;let a=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(a)?!0:r instanceof ie?!("disabled"in r)||!r.disabled:!1})||(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let e=new eo;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let t=rt(getComputedStyle(this.body).getPropertyValue("--show-duration"));await ot(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new ro)}else{let e=new to;if(this.dispatchEvent(e),e.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let t=rt(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await ot(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new oo)}}async show(){if(!(this.open||this.disabled))return this.open=!0,tt(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,tt(this,"wa-after-hide")}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return T`
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
          class=${se({body:!0,animating:this.isAnimating})}
          role="region"
          aria-labelledby="header"
        >
          <slot part="content" id="content" class="content"></slot>
        </div>
      </details>
    `}};V.css=Vs;f([P("details")],V.prototype,"details",2);f([P("summary")],V.prototype,"header",2);f([P(".body")],V.prototype,"body",2);f([P(".expand-icon-slot")],V.prototype,"expandIconSlot",2);f([Z()],V.prototype,"isAnimating",2);f([c({type:Boolean,reflect:!0})],V.prototype,"open",2);f([c()],V.prototype,"summary",2);f([c({reflect:!0})],V.prototype,"name",2);f([c({type:Boolean,reflect:!0})],V.prototype,"disabled",2);f([c({reflect:!0})],V.prototype,"appearance",2);f([c({attribute:"icon-placement",reflect:!0})],V.prototype,"iconPlacement",2);f([D("open",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpenChange",1);V=f([U("wa-details")],V);var Gs=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var Xs=L`
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
`;var Ks=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var lr="";function fl(e){lr=e}function Ys(){if(!lr){let e=document.querySelector("[data-fa-kit-code]");e&&fl(e.getAttribute("data-fa-kit-code")||"")}return lr}var Zs="7.2.0";function dl(e,t,o){let r=Ys(),a=r.length>0,s="solid";return t==="chisel"&&(s="chisel-regular"),t==="etch"&&(s="etch-solid"),t==="graphite"&&(s="graphite-thin"),t==="jelly"&&(s="jelly-regular",o==="duo-regular"&&(s="jelly-duo-regular"),o==="fill-regular"&&(s="jelly-fill-regular")),t==="jelly-duo"&&(s="jelly-duo-regular"),t==="jelly-fill"&&(s="jelly-fill-regular"),t==="notdog"&&(o==="solid"&&(s="notdog-solid"),o==="duo-solid"&&(s="notdog-duo-solid")),t==="notdog-duo"&&(s="notdog-duo-solid"),t==="slab"&&((o==="solid"||o==="regular")&&(s="slab-regular"),o==="press-regular"&&(s="slab-press-regular")),t==="slab-press"&&(s="slab-press-regular"),t==="thumbprint"&&(s="thumbprint-light"),t==="utility"&&(s="utility-semibold"),t==="utility-duo"&&(s="utility-duo-semibold"),t==="utility-fill"&&(s="utility-fill-semibold"),t==="whiteboard"&&(s="whiteboard-semibold"),t==="classic"&&(o==="thin"&&(s="thin"),o==="light"&&(s="light"),o==="regular"&&(s="regular"),o==="solid"&&(s="solid")),t==="duotone"&&(o==="thin"&&(s="duotone-thin"),o==="light"&&(s="duotone-light"),o==="regular"&&(s="duotone-regular"),o==="solid"&&(s="duotone")),t==="sharp"&&(o==="thin"&&(s="sharp-thin"),o==="light"&&(s="sharp-light"),o==="regular"&&(s="sharp-regular"),o==="solid"&&(s="sharp-solid")),t==="sharp-duotone"&&(o==="thin"&&(s="sharp-duotone-thin"),o==="light"&&(s="sharp-duotone-light"),o==="regular"&&(s="sharp-duotone-regular"),o==="solid"&&(s="sharp-duotone-solid")),t==="brands"&&(s="brands"),a?`https://ka-p.fontawesome.com/releases/v${Zs}/svgs/${s}/${e}.svg?token=${encodeURIComponent(r)}`:`https://ka-f.fontawesome.com/releases/v${Zs}/svgs/${s}/${e}.svg`}var ul={name:"default",resolver:(e,t="classic",o="solid")=>dl(e,t,o),mutator:(e,t)=>{if(t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let a=[...e.querySelectorAll("path")],s=a.find(n=>!n.hasAttribute("opacity")),i=a.find(n=>n.hasAttribute("opacity"));if(!s||!i)return;if(s.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),t.swapOpacity&&s&&i){let n=i.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",n),i.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},Qs=ul;var Js={};var pl="classic",cl=[Qs,Js],fr=[];function ei(e){fr.push(e)}function ti(e){fr=fr.filter(t=>t!==e)}function fo(e){return cl.find(t=>t.name===e)}function oi(){return pl}var{I:Bc}=Hr;var ri=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var ai=e=>e.strings===void 0;var ml={},si=(e,t=ml)=>e._$AH=t;var Rt=Symbol(),uo=Symbol(),dr,ur=new Map,N=class extends H{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=T`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(r,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Rt:uo}catch{return uo}try{let r=document.createElement("div");r.innerHTML=await o.text();let a=r.firstElementChild;if(a?.tagName?.toLowerCase()!=="svg")return Rt;dr||(dr=new DOMParser);let i=dr.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Rt}catch{return Rt}}}connectedCallback(){super.connectedCallback(),ei(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),ti(this)}async getIconSource(){let e=fo(this.library),t=this.family||oi();if(this.name&&e){let o;try{o=await e.resolver(this.name,t,this.variant,this.autoWidth)}catch{o=void 0}return{url:o,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=await this.getIconSource(),o=t?fo(this.library):void 0;if(!e){this.svg=null;return}let r=ur.get(e);r||(r=this.resolveIcon(e,o),ur.set(e,r));let a=await r;a===uo&&ur.delete(e);let s=await this.getIconSource();if(e===s.url){if(ri(a)){this.svg=a;return}switch(a){case uo:case Rt:this.svg=null,this.dispatchEvent(new Gs);break;default:this.svg=a.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new Ks)}}}updated(e){super.updated(e);let t=fo(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:T`<svg part="svg" width="16" height="16"></svg>`}};N.css=Xs;f([Z()],N.prototype,"svg",2);f([c({reflect:!0})],N.prototype,"name",2);f([c({reflect:!0})],N.prototype,"family",2);f([c({reflect:!0})],N.prototype,"variant",2);f([c({attribute:"auto-width",type:Boolean,reflect:!0})],N.prototype,"autoWidth",2);f([c({attribute:"swap-opacity",type:Boolean,reflect:!0})],N.prototype,"swapOpacity",2);f([c()],N.prototype,"src",2);f([c()],N.prototype,"label",2);f([c({reflect:!0})],N.prototype,"library",2);f([c({type:Number,reflect:!0})],N.prototype,"rotate",2);f([c({type:String,reflect:!0})],N.prototype,"flip",2);f([c({type:String,reflect:!0})],N.prototype,"animation",2);f([D("label")],N.prototype,"handleLabelChange",1);f([D(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],N.prototype,"setIcon",1);N=f([U("wa-icon")],N);var ii=class extends Event{constructor(e){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var ni=L`
  :host {
    /*
     * These are actually used by tree item, but we define them here so they can more easily be set and all tree items
     * stay consistent.
     */
    --indent-guide-color: var(--wa-color-surface-border);
    --indent-guide-offset: 0;
    --indent-guide-style: solid;
    --indent-guide-width: 0;
    --indent-size: 2em;

    display: block;
  }
`;var li=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var fi=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var di=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var ui=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var pi=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var ci=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var mi=L`
  :host {
    /* Private - set by the component to control indentation depth */
    --indent: 0px;
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
    margin-inline-end: 0.5em;
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
    font-size: inherit;
    font-weight: inherit;
  }

  .checkbox::part(base) {
    display: flex;
    align-items: center;
  }

  .indentation {
    display: block;
    width: var(--indent);
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
    border-inline-start: solid 0.1875em transparent;
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
    inset-inline-start: calc(0.1875em + var(--indent) + 1em - (var(--indent-guide-width) / 2));
    border-inline-end: var(--indent-guide-width) var(--indent-guide-style) var(--indent-guide-color);
    z-index: 1;
  }

  @media (forced-colors: active) {
    :host(:not([aria-disabled='true'])) .tree-item-selected .item {
      outline: dashed 1px SelectedItem;
    }
  }
`;var Lt=Qt(class extends et{constructor(e){if(super(e),e.type!==Ee.PROPERTY&&e.type!==Ee.ATTRIBUTE&&e.type!==Ee.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!ai(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Y||t===q)return t;let o=e.element,r=e.name;if(e.type===Ee.PROPERTY){if(t===o[r])return Y}else if(e.type===Ee.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return Y}else if(e.type===Ee.ATTRIBUTE&&o.getAttribute(r)===t+"")return Y;return si(e),t}});function pr(e,t,o){return e?t(e):o?.(e)}var k=class extends H{constructor(){super(...arguments),this.localize=new he(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children"),this.updateIndentation()}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new pi);let e=rt(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await ot(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new ci)}isNestedItem(){let e=this.parentElement;return!!e&&k.isTreeItem(e)}updateIndentation(){let e=0,t=this.parentElement;for(;t;)k.isTreeItem(t)&&e++,t=t.parentElement;this.style.setProperty("--indent",`calc(${e} * var(--indent-size, 2em))`)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new di),this.childrenContainer.hidden=!1;let e=rt(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await ot(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new ui)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new fi)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new li)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>k.isTreeItem(t)&&(e||!t.disabled)):[]}render(){let e=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return T`
      <div
        part="base"
        class="${se({"tree-item":!0,"tree-item-expanded":this.expanded,"tree-item-selected":this.selected,"tree-item-leaf":this.isLeaf,"tree-item-loading":this.loading,"tree-item-has-expand-button":t})}"
      >
        <div class="item" part="item">
          <div class="indentation" part="indentation"></div>

          <div
            part="expand-button"
            class=${se({"expand-button":!0,"expand-button-visible":t})}
            aria-hidden="true"
          >
            <slot class="expand-icon-slot" name="expand-icon">
              ${pr(this.loading,()=>T` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>T`
                  <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${pr(this.selectable,()=>T`
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
                ?checked="${Lt(this.selected)}"
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
    `}};k.css=mi;f([Z()],k.prototype,"indeterminate",2);f([Z()],k.prototype,"isLeaf",2);f([Z()],k.prototype,"loading",2);f([Z()],k.prototype,"selectable",2);f([c({type:Boolean,reflect:!0})],k.prototype,"expanded",2);f([c({type:Boolean,reflect:!0})],k.prototype,"selected",2);f([c({type:Boolean,reflect:!0})],k.prototype,"disabled",2);f([c({type:Boolean,reflect:!0})],k.prototype,"lazy",2);f([P("slot:not([name])")],k.prototype,"defaultSlot",2);f([P("slot[name=children]")],k.prototype,"childrenSlot",2);f([P(".item")],k.prototype,"itemElement",2);f([P(".children")],k.prototype,"childrenContainer",2);f([P(".expand-button slot")],k.prototype,"expandButtonSlot",2);f([D("loading",{waitUntilFirstUpdate:!0})],k.prototype,"handleLoadingChange",1);f([D("disabled")],k.prototype,"handleDisabledChange",1);f([D("expanded")],k.prototype,"handleExpandedState",1);f([D("indeterminate")],k.prototype,"handleIndeterminateStateChange",1);f([D("selected")],k.prototype,"handleSelectedChange",1);f([D("expanded",{waitUntilFirstUpdate:!0})],k.prototype,"handleExpandedChange",1);f([D("expanded",{waitUntilFirstUpdate:!0})],k.prototype,"handleExpandAnimation",1);f([D("lazy",{waitUntilFirstUpdate:!0})],k.prototype,"handleLazyChange",1);k=f([U("wa-tree-item")],k);function hi(e,t=!1){function o(s){let i=s.getChildrenItems({includeDisabled:!1});if(i.length){let n=i.every(u=>u.selected),l=i.every(u=>!u.selected&&!u.indeterminate);s.selected=n,s.indeterminate=!n&&!l}}function r(s){let i=s.parentElement;k.isTreeItem(i)&&(o(i),r(i))}function a(s){for(let i of s.getChildrenItems())i.selected=t?s.selected||i.selected:!i.disabled&&s.selected,a(i);t&&o(s)}a(e),r(e)}var pe=class extends H{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new he(this),this.initTreeItem=e=>{e.updateComplete.then(()=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(t=>{let o=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(o===null?e.append(r):o.hasAttribute("data-default")&&o.replaceWith(r))})})},this.handleTreeChanged=e=>{for(let t of e){let o=[...t.addedNodes].filter(k.isTreeItem),r=[...t.removedNodes].filter(k.isTreeItem);o.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),k.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(e){let o=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(o){let r=o.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(a=>a.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${e}-icon`,r}return null}selectItem(e){let t=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=!0),hi(e);else if(this.selection==="single"||e.isLeaf){let r=this.getAllTreeItems();for(let a of r)a.selected=a===e}else this.selection==="leaf"&&(e.expanded=!e.expanded);let o=this.selectedItems;(t.length!==o.length||o.some(r=>!t.includes(r)))&&Promise.all(o.map(r=>r.updateComplete)).then(()=>{this.dispatchEvent(new ii({selection:o}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(e){e?.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(a=>["input","textarea"].includes(a?.tagName?.toLowerCase())))return;let t=this.getFocusableItems(),o=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(t.length>0){e.preventDefault();let a=t.findIndex(l=>l.matches(":focus")),s=t[a],i=l=>{let u=t[Ha(l,0,t.length-1)];this.focusItem(u)},n=l=>{s.expanded=l};e.key==="ArrowDown"?i(a+1):e.key==="ArrowUp"?i(a-1):o&&e.key==="ArrowRight"||r&&e.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?i(a+1):n(!0):o&&e.key==="ArrowLeft"||r&&e.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?i(a-1):n(!1):e.key==="Home"?i(0):e.key==="End"?i(t.length-1):(e.key==="Enter"||e.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(e){let t=e.target,o=t.closest("wa-tree-item"),r=e.composedPath().some(a=>a?.classList?.contains("expand-button"));!o||o.disabled||t!==this.clickTarget||(r?o.expanded=!o.expanded:this.selectItem(o))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e=this.selection==="multiple",t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(let o of t)o.updateComplete.then(()=>{o.selectable=e});e&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(o=>{o.updateComplete.then(()=>{hi(o,!0)})}))}get selectedItems(){let e=this.getAllTreeItems(),t=o=>o.selected;return e.filter(t)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(o=>{if(o.disabled)return!1;let r=o.parentElement?.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||t.has(r))&&t.add(o),!t.has(o)})}render(){return T`
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
    `}};pe.css=ni;f([P("slot:not([name])")],pe.prototype,"defaultSlot",2);f([P("slot[name=expand-icon]")],pe.prototype,"expandedIconSlot",2);f([P("slot[name=collapse-icon]")],pe.prototype,"collapsedIconSlot",2);f([c()],pe.prototype,"selection",2);f([D("selection")],pe.prototype,"handleSelectionChange",1);pe=f([U("wa-tree")],pe);var xi=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:t.validationMessage,checkValidity(a){let s={message:"",isValid:!0,invalidKeys:[]};return(a.required??a.hasAttribute("required"))&&!a[o]&&(s.message=typeof r.message=="function"?r.message(a):r.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return r};var gi=L`
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
`;var yi=L`
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
`;var bi=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var vi=L`
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
`;var cr=e=>e??q;var z=class extends ie{constructor(){super(...arguments),this.hasSlotController=new bi(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let e=[xi({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){let e=this._value||"on";return this.checked?e:null}set value(e){this._value=e}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=this.hint?!0:!!e,o=!this.checked&&this.indeterminate,r=o?"indeterminate":"check",a=o?"indeterminate":"check";return T`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${cr(this.name)}
            value=${cr(this._value)}
            .indeterminate=${Lt(this.indeterminate)}
            .checked=${Lt(this.checked)}
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
        aria-hidden=${t?"false":"true"}
        class="${se({"has-slotted":t})}"
      >
        ${this.hint}
      </slot>
    `}};z.css=[gi,vi,yi];z.shadowRootOptions={...ie.shadowRootOptions,delegatesFocus:!0};f([P('input[type="checkbox"]')],z.prototype,"input",2);f([c()],z.prototype,"title",2);f([c({reflect:!0})],z.prototype,"name",2);f([c({reflect:!0})],z.prototype,"value",1);f([c({reflect:!0})],z.prototype,"size",2);f([c({type:Boolean})],z.prototype,"disabled",2);f([c({type:Boolean,reflect:!0})],z.prototype,"indeterminate",2);f([c({type:Boolean,attribute:!1})],z.prototype,"checked",1);f([c({type:Boolean,reflect:!0,attribute:"checked"})],z.prototype,"defaultChecked",2);f([c({type:Boolean,reflect:!0})],z.prototype,"required",2);f([c()],z.prototype,"hint",2);f([D(["checked","defaultChecked"])],z.prototype,"handleDefaultCheckedChange",1);f([D(["checked","indeterminate"])],z.prototype,"handleStateChange",1);f([D("disabled")],z.prototype,"handleDisabledChange",1);z=f([U("wa-checkbox")],z);var wi=L`
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
`;var mr=class extends H{constructor(){super(...arguments),this.localize=new he(this)}render(){return T`
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
    `}};mr.css=wi;mr=f([U("wa-spinner")],mr);var hl={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function Ci(e){e.preventDefault()}function xl(e){e.stopImmediatePropagation()}var hr=class extends pe{handleClick(t){let o=t.target,r=o.closest("jsdoc-tree-item"),a=t.composedPath().some(s=>s?.classList?.contains("expand-button"));!r||r.disabled||o!==this.clickTarget||(a?r.expanded=!r.expanded:this.selectItem(r))}},xr=class extends k{connectedCallback(){super.connectedCallback(),Object.entries(hl).forEach(([t,o])=>{let r=Za([t,o]);this.prepend(r)}),so()}firstUpdated(){super.firstUpdated();for(let t of this.shadowRoot.querySelectorAll("wa-icon"))t.remove()}};customElements.define("jsdoc-tree",hr);customElements.define("jsdoc-tree-item",xr);document.querySelectorAll("wa-details").forEach(e=>{e.addEventListener("wa-hide",Ci),e.addEventListener("wa-show",Ci)});document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(e=>{let t=e.firstElementChild;t?.localName==="a"&&t.addEventListener("click",xl)});})();
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
@lit/reactive-element/decorators/state.js:
@lit/reactive-element/decorators/event-options.js:
@lit/reactive-element/decorators/base.js:
@lit/reactive-element/decorators/query.js:
@lit/reactive-element/decorators/query-all.js:
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

@awesome.me/webawesome/dist/chunks/chunk.TKL7YZKI.js:
@awesome.me/webawesome/dist/chunks/chunk.ZWQCGLB5.js:
@awesome.me/webawesome/dist/chunks/chunk.NUEKQX75.js:
@awesome.me/webawesome/dist/chunks/chunk.T7HT4WM7.js:
@awesome.me/webawesome/dist/chunks/chunk.6C7ZQVTW.js:
@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome/dist/chunks/chunk.46TKUQGS.js:
@awesome.me/webawesome/dist/chunks/chunk.ZZLASWHE.js:
@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js:
@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js:
@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js:
@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js:
@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
@awesome.me/webawesome/dist/chunks/chunk.KYETJHTF.js:
@awesome.me/webawesome/dist/components/tooltip/tooltip.js:
@awesome.me/webawesome/dist/chunks/chunk.OVCFQTDZ.js:
@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
@awesome.me/webawesome/dist/chunks/chunk.EY4OIIMG.js:
@awesome.me/webawesome/dist/chunks/chunk.LDGRGQFR.js:
@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
@awesome.me/webawesome/dist/chunks/chunk.D5I2DWML.js:
@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
@awesome.me/webawesome/dist/chunks/chunk.K6QMUIHP.js:
@awesome.me/webawesome/dist/chunks/chunk.JVTAGR5B.js:
@awesome.me/webawesome/dist/chunks/chunk.FSRXYGSW.js:
@awesome.me/webawesome/dist/chunks/chunk.T2APQMAX.js:
@awesome.me/webawesome/dist/components/details/details.js:
@awesome.me/webawesome/dist/chunks/chunk.LCFSCRUJ.js:
@awesome.me/webawesome/dist/chunks/chunk.52PSTI2X.js:
@awesome.me/webawesome/dist/chunks/chunk.ZSEFTQAO.js:
@awesome.me/webawesome/dist/chunks/chunk.26QE47KB.js:
@awesome.me/webawesome/dist/chunks/chunk.FYKN76UA.js:
@awesome.me/webawesome/dist/chunks/chunk.Q6XMGFWJ.js:
@awesome.me/webawesome/dist/chunks/chunk.U36KZLSQ.js:
@awesome.me/webawesome/dist/chunks/chunk.AG44H7MD.js:
@awesome.me/webawesome/dist/chunks/chunk.L7VZ7BBH.js:
@awesome.me/webawesome/dist/chunks/chunk.P6S6N57B.js:
@awesome.me/webawesome/dist/chunks/chunk.PKVX5JGP.js:
@awesome.me/webawesome/dist/chunks/chunk.SDDRXMOC.js:
@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js:
@awesome.me/webawesome/dist/chunks/chunk.YB6263IP.js:
@awesome.me/webawesome/dist/chunks/chunk.KIHB3VMB.js:
@awesome.me/webawesome/dist/chunks/chunk.6J6QYFHV.js:
@awesome.me/webawesome/dist/chunks/chunk.TOEKFVCQ.js:
@awesome.me/webawesome/dist/chunks/chunk.AGDGRG4E.js:
@awesome.me/webawesome/dist/chunks/chunk.WL5GVAF7.js:
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
   * @license lucide v1.7.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)

lit-html/directive-helpers.js:
lit-html/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
