(()=>{var xr=Object.create;var dt=Object.defineProperty;var gr=Object.getOwnPropertyDescriptor;var Ci=Object.getOwnPropertyNames;var Si=Object.getPrototypeOf,Ai=Object.prototype.hasOwnProperty;var yr=(e,t)=>(t=Symbol[e])?t:Symbol.for("Symbol."+e),Ge=e=>{throw TypeError(e)};var br=(e,t,o)=>t in e?dt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o;var hr=(e,t)=>dt(e,"name",{value:t,configurable:!0});var ki=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ei=(e,t,o,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Ci(t))!Ai.call(e,a)&&a!==o&&dt(e,a,{get:()=>t[a],enumerable:!(r=gr(t,a))||r.enumerable});return e};var Pi=(e,t,o)=>(o=e!=null?xr(Si(e)):{},Ei(t||!e||!e.__esModule?dt(o,"default",{value:e,enumerable:!0}):o,e));var Rt=e=>[,,,xr(e?.[yr("metadata")]??null)],vr=["class","method","getter","setter","accessor","field","value","get","set"],ft=e=>e!==void 0&&typeof e!="function"?Ge("Function expected"):e,Ti=(e,t,o,r,a)=>({kind:vr[e],name:t,metadata:r,addInitializer:s=>o._?Ge("Already initialized"):a.push(ft(s||null))}),Li=(e,t)=>br(t,yr("metadata"),e[3]),w=(e,t,o,r)=>{for(var a=0,s=e[t>>1],i=s&&s.length;a<i;a++)t&1?s[a].call(o):r=s[a].call(o,r);return r},I=(e,t,o,r,a,s)=>{var i,n,l,d,p,u=t&7,h=!!(t&8),m=!!(t&16),x=u>3?e.length+1:u?h?1:2:0,g=vr[u+5],v=u>3&&(e[x-1]=[]),y=e[x]||(e[x]=[]),b=u&&(!m&&!h&&(a=a.prototype),u<5&&(u>3||!m)&&gr(u<4?a:{get[o](){return fe(this,s)},set[o](C){return he(this,s,C)}},o));u?m&&u<4&&hr(s,(u>2?"set ":u>1?"get ":"")+o):hr(a,o);for(var k=r.length-1;k>=0;k--)d=Ti(u,o,l={},e[3],y),u&&(d.static=h,d.private=m,p=d.access={has:m?C=>Ri(a,C):C=>o in C},u^3&&(p.get=m?C=>(u^1?fe:K)(C,a,u^4?s:b.get):C=>C[o]),u>2&&(p.set=m?(C,O)=>he(C,a,O,u^4?s:b.set):(C,O)=>C[o]=O)),n=(0,r[k])(u?u<4?m?s:b[g]:u>4?void 0:{get:b.get,set:b.set}:a,d),l._=1,u^4||n===void 0?ft(n)&&(u>4?v.unshift(n):u?m?s=n:b[g]=n:a=n):typeof n!="object"||n===null?Ge("Object expected"):(ft(i=n.get)&&(b.get=i),ft(i=n.set)&&(b.set=i),ft(i=n.init)&&v.unshift(i));return u||Li(e,a),b&&dt(a,o,b),m?u^4?s:b:a},_t=(e,t,o)=>br(e,typeof t!="symbol"?t+"":t,o),uo=(e,t,o)=>t.has(e)||Ge("Cannot "+o),Ri=(e,t)=>Object(t)!==t?Ge('Cannot use the "in" operator on this value'):e.has(t),fe=(e,t,o)=>(uo(e,t,"read from private field"),o?o.call(e):t.get(e)),_=(e,t,o)=>t.has(e)?Ge("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),he=(e,t,o,r)=>(uo(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o),K=(e,t,o)=>(uo(e,t,"access private method"),o);var us=ki((np,ds)=>{var fs=typeof window<"u"&&"requestAnimationFrame"in window?window.requestAnimationFrame:function(e){setTimeout(e,16)};function Rn(e){var t="startValue"in e?e.startValue:0,o="endValue"in e?e.endValue:1,r="durationMs"in e?e.durationMs:200,a=e.onComplete||function(){},s=r/16,i=(o-t)/s,n=Math.PI/s,l=t,d=0;function p(){d+=n,l+=i*Math.pow(Math.sin(d),2)*2,d<Math.PI?(e.onStep(l),fs(p)):(e.onStep(o),a())}fs(p)}ds.exports=Rn});var wr={keyframes:[{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)"},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.3},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.1)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)",filter:"drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))",offset:.6},{scale:"calc(var(--jsdoc-copy-icon-scale) * 1.05)",strokeWidth:"calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)",color:"oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)",filter:"drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))",offset:.9},{scale:"var(--jsdoc-copy-icon-scale)",strokeWidth:"var(--jsdoc-copy-icon-stroke-width)",color:"var(--jsdoc-copy-icon-color)"}],options:{duration:800,easing:"ease-in-out"}},Cr={keyframes:[{scale:1,opacity:1},{scale:3,opacity:.25,offset:.2},{scale:5,opacity:.0625,offset:.4},{scale:10,opacity:0}],options:{duration:300,easing:"ease-in-out"}};var $t=globalThis,Dt=$t.ShadowRoot&&($t.ShadyCSS===void 0||$t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,po=Symbol(),Sr=new WeakMap,ut=class{constructor(t,o,r){if(this._$cssResult$=!0,r!==po)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=o}get styleSheet(){let t=this.o,o=this.t;if(Dt&&t===void 0){let r=o!==void 0&&o.length===1;r&&(t=Sr.get(o)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&Sr.set(o,t))}return t}toString(){return this.cssText}},Ar=e=>new ut(typeof e=="string"?e:e+"",void 0,po),R=(e,...t)=>{let o=e.length===1?e[0]:t.reduce((r,a,s)=>r+(i=>{if(i._$cssResult$===!0)return i.cssText;if(typeof i=="number")return i;throw Error("Value passed to 'css' function must be a 'css' function result: "+i+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+e[s+1],e[0]);return new ut(o,e,po)},kr=(e,t)=>{if(Dt)e.adoptedStyleSheets=t.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of t){let r=document.createElement("style"),a=$t.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=o.cssText,e.appendChild(r)}},co=Dt?e=>e:e=>e instanceof CSSStyleSheet?(t=>{let o="";for(let r of t.cssRules)o+=r.cssText;return Ar(o)})(e):e;var{is:$i,defineProperty:Di,getOwnPropertyDescriptor:Oi,getOwnPropertyNames:Mi,getOwnPropertySymbols:Bi,getPrototypeOf:Fi}=Object,Re=globalThis,Er=Re.trustedTypes,Ii=Er?Er.emptyScript:"",qi=Re.reactiveElementPolyfillSupport,pt=(e,t)=>e,ct={toAttribute(e,t){switch(t){case Boolean:e=e?Ii:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let o=e;switch(t){case Boolean:o=e!==null;break;case Number:o=e===null?null:Number(e);break;case Object:case Array:try{o=JSON.parse(e)}catch{o=null}}return o}},Ot=(e,t)=>!$i(e,t),Pr={attribute:!0,type:String,converter:ct,reflect:!1,useDefault:!1,hasChanged:Ot};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Re.litPropertyMetadata??(Re.litPropertyMetadata=new WeakMap);var we=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,o=Pr){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(t,o),!o.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(t,r,o);a!==void 0&&Di(this.prototype,t,a)}}static getPropertyDescriptor(t,o,r){let{get:a,set:s}=Oi(this.prototype,t)??{get(){return this[o]},set(i){this[o]=i}};return{get:a,set(i){let n=a?.call(this);s?.call(this,i),this.requestUpdate(t,n,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Pr}static _$Ei(){if(this.hasOwnProperty(pt("elementProperties")))return;let t=Fi(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(pt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pt("properties"))){let o=this.properties,r=[...Mi(o),...Bi(o)];for(let a of r)this.createProperty(a,o[a])}let t=this[Symbol.metadata];if(t!==null){let o=litPropertyMetadata.get(t);if(o!==void 0)for(let[r,a]of o)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let a=this._$Eu(o,r);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let o=[];if(Array.isArray(t)){let r=new Set(t.flat(1/0).reverse());for(let a of r)o.unshift(co(a))}else t!==void 0&&o.push(co(t));return o}static _$Eu(t,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return kr(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,o,r){this._$AK(t,r)}_$ET(t,o){let r=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,r);if(a!==void 0&&r.reflect===!0){let s=(r.converter?.toAttribute!==void 0?r.converter:ct).toAttribute(o,r.type);this._$Em=t,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,o){let r=this.constructor,a=r._$Eh.get(t);if(a!==void 0&&this._$Em!==a){let s=r.getPropertyOptions(a),i=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ct;this._$Em=a;let n=i.fromAttribute(o,s.type);this[a]=n??this._$Ej?.get(a)??n,this._$Em=null}}requestUpdate(t,o,r,a=!1,s){if(t!==void 0){let i=this.constructor;if(a===!1&&(s=this[t]),r??(r=i.getPropertyOptions(t)),!((r.hasChanged??Ot)(s,o)||r.useDefault&&r.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(i._$Eu(t,r))))return;this.C(t,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,o,{useDefault:r,reflect:a,wrapped:s},i){r&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,i??o??this[t]),s!==!0||i!==void 0)||(this._$AL.has(t)||(this.hasUpdated||r||(o=void 0),this._$AL.set(t,o)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(let[a,s]of this._$Ep)this[a]=s;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,s]of r){let{wrapped:i}=s,n=this[a];i!==!0||this._$AL.has(a)||n===void 0||this.C(a,void 0,s,n)}}let t=!1,o=this._$AL;try{t=this.shouldUpdate(o),t?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(o)}willUpdate(t){}_$AE(t){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(o=>this._$ET(o,this[o]))),this._$EM()}updated(t){}firstUpdated(t){}};we.elementStyles=[],we.shadowRootOptions={mode:"open"},we[pt("elementProperties")]=new Map,we[pt("finalized")]=new Map,qi?.({ReactiveElement:we}),(Re.reactiveElementVersions??(Re.reactiveElementVersions=[])).push("2.1.2");var ht=globalThis,Tr=e=>e,Mt=ht.trustedTypes,Lr=Mt?Mt.createPolicy("lit-html",{createHTML:e=>e}):void 0,ho="$lit$",Ce=`lit$${Math.random().toFixed(9).slice(2)}$`,xo="?"+Ce,Ui=`<${xo}>`,Me=document,xt=()=>Me.createComment(""),gt=e=>e===null||typeof e!="object"&&typeof e!="function",go=Array.isArray,Mr=e=>go(e)||typeof e?.[Symbol.iterator]=="function",mo=`[ 	
\f\r]`,mt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rr=/-->/g,_r=/>/g,De=RegExp(`>|${mo}(?:([^\\s"'>=/]+)(${mo}*=${mo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),$r=/'/g,Dr=/"/g,Br=/^(?:script|style|textarea|title)$/i,yo=e=>(t,...o)=>({_$litType$:e,strings:t,values:o}),T=yo(1),Pl=yo(2),Tl=yo(3),Y=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Or=new WeakMap,Oe=Me.createTreeWalker(Me,129);function Fr(e,t){if(!go(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return Lr!==void 0?Lr.createHTML(t):t}var Ir=(e,t)=>{let o=e.length-1,r=[],a,s=t===2?"<svg>":t===3?"<math>":"",i=mt;for(let n=0;n<o;n++){let l=e[n],d,p,u=-1,h=0;for(;h<l.length&&(i.lastIndex=h,p=i.exec(l),p!==null);)h=i.lastIndex,i===mt?p[1]==="!--"?i=Rr:p[1]!==void 0?i=_r:p[2]!==void 0?(Br.test(p[2])&&(a=RegExp("</"+p[2],"g")),i=De):p[3]!==void 0&&(i=De):i===De?p[0]===">"?(i=a??mt,u=-1):p[1]===void 0?u=-2:(u=i.lastIndex-p[2].length,d=p[1],i=p[3]===void 0?De:p[3]==='"'?Dr:$r):i===Dr||i===$r?i=De:i===Rr||i===_r?i=mt:(i=De,a=void 0);let m=i===De&&e[n+1].startsWith("/>")?" ":"";s+=i===mt?l+Ui:u>=0?(r.push(d),l.slice(0,u)+ho+l.slice(u)+Ce+m):l+Ce+(u===-2?n:m)}return[Fr(e,s+(e[o]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]},yt=class e{constructor({strings:t,_$litType$:o},r){let a;this.parts=[];let s=0,i=0,n=t.length-1,l=this.parts,[d,p]=Ir(t,o);if(this.el=e.createElement(d,r),Oe.currentNode=this.el.content,o===2||o===3){let u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(a=Oe.nextNode())!==null&&l.length<n;){if(a.nodeType===1){if(a.hasAttributes())for(let u of a.getAttributeNames())if(u.endsWith(ho)){let h=p[i++],m=a.getAttribute(u).split(Ce),x=/([.?@])?(.*)/.exec(h);l.push({type:1,index:s,name:x[2],strings:m,ctor:x[1]==="."?Ft:x[1]==="?"?It:x[1]==="@"?qt:Fe}),a.removeAttribute(u)}else u.startsWith(Ce)&&(l.push({type:6,index:s}),a.removeAttribute(u));if(Br.test(a.tagName)){let u=a.textContent.split(Ce),h=u.length-1;if(h>0){a.textContent=Mt?Mt.emptyScript:"";for(let m=0;m<h;m++)a.append(u[m],xt()),Oe.nextNode(),l.push({type:2,index:++s});a.append(u[h],xt())}}}else if(a.nodeType===8)if(a.data===xo)l.push({type:2,index:s});else{let u=-1;for(;(u=a.data.indexOf(Ce,u+1))!==-1;)l.push({type:7,index:s}),u+=Ce.length-1}s++}}static createElement(t,o){let r=Me.createElement("template");return r.innerHTML=t,r}};function Be(e,t,o=e,r){if(t===Y)return t;let a=r!==void 0?o._$Co?.[r]:o._$Cl,s=gt(t)?void 0:t._$litDirective$;return a?.constructor!==s&&(a?._$AO?.(!1),s===void 0?a=void 0:(a=new s(e),a._$AT(e,o,r)),r!==void 0?(o._$Co??(o._$Co=[]))[r]=a:o._$Cl=a),a!==void 0&&(t=Be(e,a._$AS(e,t.values),a,r)),t}var Bt=class{constructor(t,o){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:o},parts:r}=this._$AD,a=(t?.creationScope??Me).importNode(o,!0);Oe.currentNode=a;let s=Oe.nextNode(),i=0,n=0,l=r[0];for(;l!==void 0;){if(i===l.index){let d;l.type===2?d=new Xe(s,s.nextSibling,this,t):l.type===1?d=new l.ctor(s,l.name,l.strings,this,t):l.type===6&&(d=new Ut(s,this,t)),this._$AV.push(d),l=r[++n]}i!==l?.index&&(s=Oe.nextNode(),i++)}return Oe.currentNode=Me,a}p(t){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,o),o+=r.strings.length-2):r._$AI(t[o])),o++}},Xe=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,o,r,a){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=o,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,o=this._$AM;return o!==void 0&&t?.nodeType===11&&(t=o.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,o=this){t=Be(this,t,o),gt(t)?t===q||t==null||t===""?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==Y&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Mr(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&gt(this._$AH)?this._$AA.nextSibling.data=t:this.T(Me.createTextNode(t)),this._$AH=t}$(t){let{values:o,_$litType$:r}=t,a=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=yt.createElement(Fr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(o);else{let s=new Bt(a,this),i=s.u(this.options);s.p(o),this.T(i),this._$AH=s}}_$AC(t){let o=Or.get(t.strings);return o===void 0&&Or.set(t.strings,o=new yt(t)),o}k(t){go(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,a=0;for(let s of t)a===o.length?o.push(r=new e(this.O(xt()),this.O(xt()),this,this.options)):r=o[a],r._$AI(s),a++;a<o.length&&(this._$AR(r&&r._$AB.nextSibling,a),o.length=a)}_$AR(t=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);t!==this._$AB;){let r=Tr(t).nextSibling;Tr(t).remove(),t=r}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},Fe=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,o,r,a,s){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=o,this._$AM=a,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=q}_$AI(t,o=this,r,a){let s=this.strings,i=!1;if(s===void 0)t=Be(this,t,o,0),i=!gt(t)||t!==this._$AH&&t!==Y,i&&(this._$AH=t);else{let n=t,l,d;for(t=s[0],l=0;l<s.length-1;l++)d=Be(this,n[r+l],o,l),d===Y&&(d=this._$AH[l]),i||(i=!gt(d)||d!==this._$AH[l]),d===q?t=q:t!==q&&(t+=(d??"")+s[l+1]),this._$AH[l]=d}i&&!a&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Ft=class extends Fe{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}},It=class extends Fe{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}},qt=class extends Fe{constructor(t,o,r,a,s){super(t,o,r,a,s),this.type=5}_$AI(t,o=this){if((t=Be(this,t,o,0)??q)===Y)return;let r=this._$AH,a=t===q&&r!==q||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==q&&(r===q||a);a&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},Ut=class{constructor(t,o,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Be(this,t)}},qr={M:ho,P:Ce,A:xo,C:1,L:Ir,R:Bt,D:Mr,V:Be,I:Xe,H:Fe,N:It,U:qt,B:Ft,F:Ut},Hi=ht.litHtmlPolyfillSupport;Hi?.(yt,Xe),(ht.litHtmlVersions??(ht.litHtmlVersions=[])).push("3.3.2");var Ur=(e,t,o)=>{let r=o?.renderBefore??t,a=r._$litPart$;if(a===void 0){let s=o?.renderBefore??null;r._$litPart$=a=new Xe(t.insertBefore(xt(),s),s,void 0,o??{})}return a._$AI(e),a};var bt=globalThis,oe=class extends we{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var o;let t=super.createRenderRoot();return(o=this.renderOptions).renderBefore??(o.renderBefore=t.firstChild),t}update(t){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ur(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Y}};oe._$litElement$=!0,oe.finalized=!0,bt.litElementHydrateSupport?.({LitElement:oe});var zi=bt.litElementPolyfillSupport;zi?.({LitElement:oe});(bt.litElementVersions??(bt.litElementVersions=[])).push("4.2.2");var Hr=R`
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
`;var zr=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}};var Nr=R`
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
`;var bo=new Set,Ke=new Map,Ie,vo="ltr",wo="en",Wr=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(Wr){let e=new MutationObserver(Vr);vo=document.documentElement.dir||"ltr",wo=document.documentElement.lang||navigator.language,e.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}function vt(...e){e.map(t=>{let o=t.$code.toLowerCase();Ke.has(o)?Ke.set(o,Object.assign(Object.assign({},Ke.get(o)),t)):Ke.set(o,t),Ie||(Ie=t)}),Vr()}function Vr(){Wr&&(vo=document.documentElement.dir||"ltr",wo=document.documentElement.lang||navigator.language),[...bo.keys()].map(e=>{typeof e.requestUpdate=="function"&&e.requestUpdate()})}var Ht=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){bo.add(this.host)}hostDisconnected(){bo.delete(this.host)}dir(){return`${this.host.dir||vo}`.toLowerCase()}lang(){return`${this.host.lang||wo}`.toLowerCase()}getTranslationData(t){var o,r;let a=new Intl.Locale(t.replace(/_/g,"-")),s=a?.language.toLowerCase(),i=(r=(o=a?.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",n=Ke.get(`${s}-${i}`),l=Ke.get(s);return{locale:a,language:s,region:i,primary:n,secondary:l}}exists(t,o){var r;let{primary:a,secondary:s}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(a&&a[t]||s&&s[t]||o.includeFallback&&Ie&&Ie[t])}term(t,...o){let{primary:r,secondary:a}=this.getTranslationData(this.lang()),s;if(r&&r[t])s=r[t];else if(a&&a[t])s=a[t];else if(Ie&&Ie[t])s=Ie[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof s=="function"?s(...o):s}date(t,o){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),o).format(t)}number(t,o){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),o).format(t)}relativeTime(t,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(t,o)}};var jr={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",dropFileHere:"Drop file here or click to browse",decrement:"Decrement",dropFilesHere:"Drop files here or click to browse",error:"Error",goToSlide:(e,t)=>`Go to slide ${e} of ${t}`,hidePassword:"Hide password",increment:"Increment",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:e=>e===0?"No options selected":e===1?"1 option selected":`${e} options selected`,pauseAnimation:"Pause animation",playAnimation:"Play animation",previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:e=>`Slide ${e}`,toggleColorFormat:"Toggle color format",zoomIn:"Zoom in",zoomOut:"Zoom out"};vt(jr);var Gr=jr;var xe=class extends Ht{};vt(Gr);var Ni=Object.defineProperty,Wi=Object.getOwnPropertyDescriptor,Xr=e=>{throw TypeError(e)},f=(e,t,o,r)=>{for(var a=r>1?void 0:r?Wi(t,o):t,s=e.length-1,i;s>=0;s--)(i=e[s])&&(a=(r?i(t,o,a):i(a))||a);return r&&a&&Ni(t,o,a),a},Kr=(e,t,o)=>t.has(e)||Xr("Cannot "+o),Yr=(e,t,o)=>(Kr(e,t,"read from private field"),o?o.call(e):t.get(e)),Zr=(e,t,o)=>t.has(e)?Xr("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,o),Qr=(e,t,o,r)=>(Kr(e,t,"write to private field"),r?r.call(e,o):t.set(e,o),o);var U=e=>(t,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)};var Vi={attribute:!0,type:String,converter:ct,reflect:!1,hasChanged:Ot},ji=(e=Vi,t,o)=>{let{kind:r,metadata:a}=o,s=globalThis.litPropertyMetadata.get(a);if(s===void 0&&globalThis.litPropertyMetadata.set(a,s=new Map),r==="setter"&&((e=Object.create(e)).wrapped=!0),s.set(o.name,e),r==="accessor"){let{name:i}=o;return{set(n){let l=t.get.call(this);t.set.call(this,n),this.requestUpdate(i,l,e,!0,n)},init(n){return n!==void 0&&this.C(i,void 0,e,n),n}}}if(r==="setter"){let{name:i}=o;return function(n){let l=this[i];t.call(this,n),this.requestUpdate(i,l,e,!0,n)}}throw Error("Unsupported decorator location: "+r)};function c(e){return(t,o)=>typeof o=="object"?ji(e,t,o):((r,a,s)=>{let i=a.hasOwnProperty(s);return a.constructor.createProperty(s,r),i?Object.getOwnPropertyDescriptor(a,s):void 0})(e,t,o)}function Z(e){return c({...e,state:!0,attribute:!1})}var _e=(e,t,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(e,t,o),o);function P(e,t){return(o,r,a)=>{let s=i=>i.renderRoot?.querySelector(e)??null;if(t){let{get:i,set:n}=typeof r=="object"?o:a??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return _e(o,r,{get(){let l=i.call(this);return l===void 0&&(l=s(this),(l!==null||this.hasUpdated)&&n.call(this,l)),l}})}return _e(o,r,{get(){return s(this)}})}}var Gi;function Jr(e){return(t,o)=>_e(t,o,{get(){return(this.renderRoot??Gi??(Gi=document.createDocumentFragment())).querySelectorAll(e)}})}var Xi=R`
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
`,zt,H=class extends oe{constructor(){super(),Zr(this,zt,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(t,o)=>{if(this.internals?.states)try{o?this.internals.states.add(t):this.internals.states.delete(t)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:t=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(t)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let e=this.constructor;for(let[t,o]of e.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof t=="string"&&this.customStates.set(`initial-${t}-${o.initial}`,!0)}static get styles(){let e=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[Xi,...e]}attributeChangedCallback(e,t,o){Yr(this,zt)||(this.constructor.elementProperties.forEach((r,a)=>{r.reflect&&this[a]!=null&&this.initialReflectedProperties.set(a,this[a])}),Qr(this,zt,!0)),super.attributeChangedCallback(e,t,o)}willUpdate(e){super.willUpdate(e),this.initialReflectedProperties.forEach((t,o)=>{e.has(o)&&this[o]==null&&(this[o]=t)})}firstUpdated(e){super.firstUpdated(e),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(t=>{t.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(e){try{super.update(e)}catch(t){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=t,this.dispatchEvent(o)}throw t}}relayNativeEvent(e,t){e.stopImmediatePropagation(),this.dispatchEvent(new e.constructor(e.type,{...e,...t}))}};zt=new WeakMap;f([c()],H.prototype,"dir",2);f([c()],H.prototype,"lang",2);f([c({type:Boolean,reflect:!0,attribute:"did-ssr"})],H.prototype,"didSSR",2);var ye=Math.min,X=Math.max,Ct=Math.round,St=Math.floor,de=e=>({x:e,y:e}),Ki={left:"right",right:"left",bottom:"top",top:"bottom"},Yi={start:"end",end:"start"};function Wt(e,t,o){return X(e,ye(t,o))}function qe(e,t){return typeof e=="function"?e(t):e}function Se(e){return e.split("-")[0]}function Ue(e){return e.split("-")[1]}function Co(e){return e==="x"?"y":"x"}function Vt(e){return e==="y"?"height":"width"}var Zi=new Set(["top","bottom"]);function be(e){return Zi.has(Se(e))?"y":"x"}function jt(e){return Co(be(e))}function oa(e,t,o){o===void 0&&(o=!1);let r=Ue(e),a=jt(e),s=Vt(a),i=a==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return t.reference[s]>t.floating[s]&&(i=wt(i)),[i,wt(i)]}function ra(e){let t=wt(e);return[Nt(e),t,Nt(t)]}function Nt(e){return e.replace(/start|end/g,t=>Yi[t])}var ea=["left","right"],ta=["right","left"],Qi=["top","bottom"],Ji=["bottom","top"];function en(e,t,o){switch(e){case"top":case"bottom":return o?t?ta:ea:t?ea:ta;case"left":case"right":return t?Qi:Ji;default:return[]}}function aa(e,t,o,r){let a=Ue(e),s=en(Se(e),o==="start",r);return a&&(s=s.map(i=>i+"-"+a),t&&(s=s.concat(s.map(Nt)))),s}function wt(e){return e.replace(/left|right|bottom|top/g,t=>Ki[t])}function tn(e){return{top:0,right:0,bottom:0,left:0,...e}}function So(e){return typeof e!="number"?tn(e):{top:e,right:e,bottom:e,left:e}}function He(e){let{x:t,y:o,width:r,height:a}=e;return{width:r,height:a,top:o,left:t,right:t+r,bottom:o+a,x:t,y:o}}function sa(e,t,o){let{reference:r,floating:a}=e,s=be(t),i=jt(t),n=Vt(i),l=Se(t),d=s==="y",p=r.x+r.width/2-a.width/2,u=r.y+r.height/2-a.height/2,h=r[n]/2-a[n]/2,m;switch(l){case"top":m={x:p,y:r.y-a.height};break;case"bottom":m={x:p,y:r.y+r.height};break;case"right":m={x:r.x+r.width,y:u};break;case"left":m={x:r.x-a.width,y:u};break;default:m={x:r.x,y:r.y}}switch(Ue(t)){case"start":m[i]-=h*(o&&d?-1:1);break;case"end":m[i]+=h*(o&&d?-1:1);break}return m}async function ia(e,t){var o;t===void 0&&(t={});let{x:r,y:a,platform:s,rects:i,elements:n,strategy:l}=e,{boundary:d="clippingAncestors",rootBoundary:p="viewport",elementContext:u="floating",altBoundary:h=!1,padding:m=0}=qe(t,e),x=So(m),v=n[h?u==="floating"?"reference":"floating":u],y=He(await s.getClippingRect({element:(o=await(s.isElement==null?void 0:s.isElement(v)))==null||o?v:v.contextElement||await(s.getDocumentElement==null?void 0:s.getDocumentElement(n.floating)),boundary:d,rootBoundary:p,strategy:l})),b=u==="floating"?{x:r,y:a,width:i.floating.width,height:i.floating.height}:i.reference,k=await(s.getOffsetParent==null?void 0:s.getOffsetParent(n.floating)),C=await(s.isElement==null?void 0:s.isElement(k))?await(s.getScale==null?void 0:s.getScale(k))||{x:1,y:1}:{x:1,y:1},O=He(s.convertOffsetParentRelativeRectToViewportRelativeRect?await s.convertOffsetParentRelativeRectToViewportRelativeRect({elements:n,rect:b,offsetParent:k,strategy:l}):b);return{top:(y.top-O.top+x.top)/C.y,bottom:(O.bottom-y.bottom+x.bottom)/C.y,left:(y.left-O.left+x.left)/C.x,right:(O.right-y.right+x.right)/C.x}}var na=async(e,t,o)=>{let{placement:r="bottom",strategy:a="absolute",middleware:s=[],platform:i}=o,n=s.filter(Boolean),l=await(i.isRTL==null?void 0:i.isRTL(t)),d=await i.getElementRects({reference:e,floating:t,strategy:a}),{x:p,y:u}=sa(d,r,l),h=r,m={},x=0;for(let v=0;v<n.length;v++){var g;let{name:y,fn:b}=n[v],{x:k,y:C,data:O,reset:S}=await b({x:p,y:u,initialPlacement:r,placement:h,strategy:a,middlewareData:m,rects:d,platform:{...i,detectOverflow:(g=i.detectOverflow)!=null?g:ia},elements:{reference:e,floating:t}});p=k??p,u=C??u,m={...m,[y]:{...m[y],...O}},S&&x<=50&&(x++,typeof S=="object"&&(S.placement&&(h=S.placement),S.rects&&(d=S.rects===!0?await i.getElementRects({reference:e,floating:t,strategy:a}):S.rects),{x:p,y:u}=sa(d,h,l)),v=-1)}return{x:p,y:u,placement:h,strategy:a,middlewareData:m}},la=e=>({name:"arrow",options:e,async fn(t){let{x:o,y:r,placement:a,rects:s,platform:i,elements:n,middlewareData:l}=t,{element:d,padding:p=0}=qe(e,t)||{};if(d==null)return{};let u=So(p),h={x:o,y:r},m=jt(a),x=Vt(m),g=await i.getDimensions(d),v=m==="y",y=v?"top":"left",b=v?"bottom":"right",k=v?"clientHeight":"clientWidth",C=s.reference[x]+s.reference[m]-h[m]-s.floating[x],O=h[m]-s.reference[m],S=await(i.getOffsetParent==null?void 0:i.getOffsetParent(d)),$=S?S[k]:0;(!$||!await(i.isElement==null?void 0:i.isElement(S)))&&($=n.floating[k]||s.floating[x]);let j=C/2-O/2,J=$/2-g[x]/2-1,te=ye(u[y],J),Pe=ye(u[b],J),me=te,Te=$-g[x]-Pe,G=$/2-g[x]/2+j,$e=Wt(me,G,Te),ve=!l.arrow&&Ue(a)!=null&&G!==$e&&s.reference[x]/2-(G<me?te:Pe)-g[x]/2<0,ne=ve?G<me?G-me:G-Te:0;return{[m]:h[m]+ne,data:{[m]:$e,centerOffset:G-$e-ne,...ve&&{alignmentOffset:ne}},reset:ve}}});var fa=function(e){return e===void 0&&(e={}),{name:"flip",options:e,async fn(t){var o,r;let{placement:a,middlewareData:s,rects:i,initialPlacement:n,platform:l,elements:d}=t,{mainAxis:p=!0,crossAxis:u=!0,fallbackPlacements:h,fallbackStrategy:m="bestFit",fallbackAxisSideDirection:x="none",flipAlignment:g=!0,...v}=qe(e,t);if((o=s.arrow)!=null&&o.alignmentOffset)return{};let y=Se(a),b=be(n),k=Se(n)===n,C=await(l.isRTL==null?void 0:l.isRTL(d.floating)),O=h||(k||!g?[wt(n)]:ra(n)),S=x!=="none";!h&&S&&O.push(...aa(n,g,x,C));let $=[n,...O],j=await l.detectOverflow(t,v),J=[],te=((r=s.flip)==null?void 0:r.overflows)||[];if(p&&J.push(j[y]),u){let G=oa(a,i,C);J.push(j[G[0]],j[G[1]])}if(te=[...te,{placement:a,overflows:J}],!J.every(G=>G<=0)){var Pe,me;let G=(((Pe=s.flip)==null?void 0:Pe.index)||0)+1,$e=$[G];if($e&&(!(u==="alignment"?b!==be($e):!1)||te.every(le=>be(le.placement)===b?le.overflows[0]>0:!0)))return{data:{index:G,overflows:te},reset:{placement:$e}};let ve=(me=te.filter(ne=>ne.overflows[0]<=0).sort((ne,le)=>ne.overflows[1]-le.overflows[1])[0])==null?void 0:me.placement;if(!ve)switch(m){case"bestFit":{var Te;let ne=(Te=te.filter(le=>{if(S){let Le=be(le.placement);return Le===b||Le==="y"}return!0}).map(le=>[le.placement,le.overflows.filter(Le=>Le>0).reduce((Le,wi)=>Le+wi,0)]).sort((le,Le)=>le[1]-Le[1])[0])==null?void 0:Te[0];ne&&(ve=ne);break}case"initialPlacement":ve=n;break}if(a!==ve)return{reset:{placement:ve}}}return{}}}};var on=new Set(["left","top"]);async function rn(e,t){let{placement:o,platform:r,elements:a}=e,s=await(r.isRTL==null?void 0:r.isRTL(a.floating)),i=Se(o),n=Ue(o),l=be(o)==="y",d=on.has(i)?-1:1,p=s&&l?-1:1,u=qe(t,e),{mainAxis:h,crossAxis:m,alignmentAxis:x}=typeof u=="number"?{mainAxis:u,crossAxis:0,alignmentAxis:null}:{mainAxis:u.mainAxis||0,crossAxis:u.crossAxis||0,alignmentAxis:u.alignmentAxis};return n&&typeof x=="number"&&(m=n==="end"?x*-1:x),l?{x:m*p,y:h*d}:{x:h*d,y:m*p}}var da=function(e){return e===void 0&&(e=0),{name:"offset",options:e,async fn(t){var o,r;let{x:a,y:s,placement:i,middlewareData:n}=t,l=await rn(t,e);return i===((o=n.offset)==null?void 0:o.placement)&&(r=n.arrow)!=null&&r.alignmentOffset?{}:{x:a+l.x,y:s+l.y,data:{...l,placement:i}}}}},ua=function(e){return e===void 0&&(e={}),{name:"shift",options:e,async fn(t){let{x:o,y:r,placement:a,platform:s}=t,{mainAxis:i=!0,crossAxis:n=!1,limiter:l={fn:y=>{let{x:b,y:k}=y;return{x:b,y:k}}},...d}=qe(e,t),p={x:o,y:r},u=await s.detectOverflow(t,d),h=be(Se(a)),m=Co(h),x=p[m],g=p[h];if(i){let y=m==="y"?"top":"left",b=m==="y"?"bottom":"right",k=x+u[y],C=x-u[b];x=Wt(k,x,C)}if(n){let y=h==="y"?"top":"left",b=h==="y"?"bottom":"right",k=g+u[y],C=g-u[b];g=Wt(k,g,C)}let v=l.fn({...t,[m]:x,[h]:g});return{...v,data:{x:v.x-o,y:v.y-r,enabled:{[m]:i,[h]:n}}}}}};var pa=function(e){return e===void 0&&(e={}),{name:"size",options:e,async fn(t){var o,r;let{placement:a,rects:s,platform:i,elements:n}=t,{apply:l=()=>{},...d}=qe(e,t),p=await i.detectOverflow(t,d),u=Se(a),h=Ue(a),m=be(a)==="y",{width:x,height:g}=s.floating,v,y;u==="top"||u==="bottom"?(v=u,y=h===(await(i.isRTL==null?void 0:i.isRTL(n.floating))?"start":"end")?"left":"right"):(y=u,v=h==="end"?"top":"bottom");let b=g-p.top-p.bottom,k=x-p.left-p.right,C=ye(g-p[v],b),O=ye(x-p[y],k),S=!t.middlewareData.shift,$=C,j=O;if((o=t.middlewareData.shift)!=null&&o.enabled.x&&(j=k),(r=t.middlewareData.shift)!=null&&r.enabled.y&&($=b),S&&!h){let te=X(p.left,0),Pe=X(p.right,0),me=X(p.top,0),Te=X(p.bottom,0);m?j=x-2*(te!==0||Pe!==0?te+Pe:X(p.left,p.right)):$=g-2*(me!==0||Te!==0?me+Te:X(p.top,p.bottom))}await l({...t,availableWidth:j,availableHeight:$});let J=await i.getDimensions(n.floating);return x!==J.width||g!==J.height?{reset:{rects:!0}}:{}}}};function Gt(){return typeof window<"u"}function ze(e){return ma(e)?(e.nodeName||"").toLowerCase():"#document"}function Q(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function ue(e){var t;return(t=(ma(e)?e.ownerDocument:e.document)||window.document)==null?void 0:t.documentElement}function ma(e){return Gt()?e instanceof Node||e instanceof Q(e).Node:!1}function re(e){return Gt()?e instanceof Element||e instanceof Q(e).Element:!1}function pe(e){return Gt()?e instanceof HTMLElement||e instanceof Q(e).HTMLElement:!1}function ca(e){return!Gt()||typeof ShadowRoot>"u"?!1:e instanceof ShadowRoot||e instanceof Q(e).ShadowRoot}var an=new Set(["inline","contents"]);function Ye(e){let{overflow:t,overflowX:o,overflowY:r,display:a}=ae(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+o)&&!an.has(a)}var sn=new Set(["table","td","th"]);function ha(e){return sn.has(ze(e))}var nn=[":popover-open",":modal"];function At(e){return nn.some(t=>{try{return e.matches(t)}catch{return!1}})}var ln=["transform","translate","scale","rotate","perspective"],fn=["transform","translate","scale","rotate","perspective","filter"],dn=["paint","layout","strict","content"];function Ze(e){let t=Xt(),o=re(e)?ae(e):e;return ln.some(r=>o[r]?o[r]!=="none":!1)||(o.containerType?o.containerType!=="normal":!1)||!t&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!t&&(o.filter?o.filter!=="none":!1)||fn.some(r=>(o.willChange||"").includes(r))||dn.some(r=>(o.contain||"").includes(r))}function xa(e){let t=Ae(e);for(;pe(t)&&!Ne(t);){if(Ze(t))return t;if(At(t))return null;t=Ae(t)}return null}function Xt(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}var un=new Set(["html","body","#document"]);function Ne(e){return un.has(ze(e))}function ae(e){return Q(e).getComputedStyle(e)}function kt(e){return re(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function Ae(e){if(ze(e)==="html")return e;let t=e.assignedSlot||e.parentNode||ca(e)&&e.host||ue(e);return ca(t)?t.host:t}function ga(e){let t=Ae(e);return Ne(t)?e.ownerDocument?e.ownerDocument.body:e.body:pe(t)&&Ye(t)?t:ga(t)}function ke(e,t,o){var r;t===void 0&&(t=[]),o===void 0&&(o=!0);let a=ga(e),s=a===((r=e.ownerDocument)==null?void 0:r.body),i=Q(a);if(s){let n=Kt(i);return t.concat(i,i.visualViewport||[],Ye(a)?a:[],n&&o?ke(n):[])}return t.concat(a,ke(a,[],o))}function Kt(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}function wa(e){let t=ae(e),o=parseFloat(t.width)||0,r=parseFloat(t.height)||0,a=pe(e),s=a?e.offsetWidth:o,i=a?e.offsetHeight:r,n=Ct(o)!==s||Ct(r)!==i;return n&&(o=s,r=i),{width:o,height:r,$:n}}function ko(e){return re(e)?e:e.contextElement}function Qe(e){let t=ko(e);if(!pe(t))return de(1);let o=t.getBoundingClientRect(),{width:r,height:a,$:s}=wa(t),i=(s?Ct(o.width):o.width)/r,n=(s?Ct(o.height):o.height)/a;return(!i||!Number.isFinite(i))&&(i=1),(!n||!Number.isFinite(n))&&(n=1),{x:i,y:n}}var pn=de(0);function Ca(e){let t=Q(e);return!Xt()||!t.visualViewport?pn:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function cn(e,t,o){return t===void 0&&(t=!1),!o||t&&o!==Q(e)?!1:t}function We(e,t,o,r){t===void 0&&(t=!1),o===void 0&&(o=!1);let a=e.getBoundingClientRect(),s=ko(e),i=de(1);t&&(r?re(r)&&(i=Qe(r)):i=Qe(e));let n=cn(s,o,r)?Ca(s):de(0),l=(a.left+n.x)/i.x,d=(a.top+n.y)/i.y,p=a.width/i.x,u=a.height/i.y;if(s){let h=Q(s),m=r&&re(r)?Q(r):r,x=h,g=Kt(x);for(;g&&r&&m!==x;){let v=Qe(g),y=g.getBoundingClientRect(),b=ae(g),k=y.left+(g.clientLeft+parseFloat(b.paddingLeft))*v.x,C=y.top+(g.clientTop+parseFloat(b.paddingTop))*v.y;l*=v.x,d*=v.y,p*=v.x,u*=v.y,l+=k,d+=C,x=Q(g),g=Kt(x)}}return He({width:p,height:u,x:l,y:d})}function Yt(e,t){let o=kt(e).scrollLeft;return t?t.left+o:We(ue(e)).left+o}function Sa(e,t){let o=e.getBoundingClientRect(),r=o.left+t.scrollLeft-Yt(e,o),a=o.top+t.scrollTop;return{x:r,y:a}}function mn(e){let{elements:t,rect:o,offsetParent:r,strategy:a}=e,s=a==="fixed",i=ue(r),n=t?At(t.floating):!1;if(r===i||n&&s)return o;let l={scrollLeft:0,scrollTop:0},d=de(1),p=de(0),u=pe(r);if((u||!u&&!s)&&((ze(r)!=="body"||Ye(i))&&(l=kt(r)),pe(r))){let m=We(r);d=Qe(r),p.x=m.x+r.clientLeft,p.y=m.y+r.clientTop}let h=i&&!u&&!s?Sa(i,l):de(0);return{width:o.width*d.x,height:o.height*d.y,x:o.x*d.x-l.scrollLeft*d.x+p.x+h.x,y:o.y*d.y-l.scrollTop*d.y+p.y+h.y}}function hn(e){return Array.from(e.getClientRects())}function xn(e){let t=ue(e),o=kt(e),r=e.ownerDocument.body,a=X(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),s=X(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),i=-o.scrollLeft+Yt(e),n=-o.scrollTop;return ae(r).direction==="rtl"&&(i+=X(t.clientWidth,r.clientWidth)-a),{width:a,height:s,x:i,y:n}}var ya=25;function gn(e,t){let o=Q(e),r=ue(e),a=o.visualViewport,s=r.clientWidth,i=r.clientHeight,n=0,l=0;if(a){s=a.width,i=a.height;let p=Xt();(!p||p&&t==="fixed")&&(n=a.offsetLeft,l=a.offsetTop)}let d=Yt(r);if(d<=0){let p=r.ownerDocument,u=p.body,h=getComputedStyle(u),m=p.compatMode==="CSS1Compat"&&parseFloat(h.marginLeft)+parseFloat(h.marginRight)||0,x=Math.abs(r.clientWidth-u.clientWidth-m);x<=ya&&(s-=x)}else d<=ya&&(s+=d);return{width:s,height:i,x:n,y:l}}var yn=new Set(["absolute","fixed"]);function bn(e,t){let o=We(e,!0,t==="fixed"),r=o.top+e.clientTop,a=o.left+e.clientLeft,s=pe(e)?Qe(e):de(1),i=e.clientWidth*s.x,n=e.clientHeight*s.y,l=a*s.x,d=r*s.y;return{width:i,height:n,x:l,y:d}}function ba(e,t,o){let r;if(t==="viewport")r=gn(e,o);else if(t==="document")r=xn(ue(e));else if(re(t))r=bn(t,o);else{let a=Ca(e);r={x:t.x-a.x,y:t.y-a.y,width:t.width,height:t.height}}return He(r)}function Aa(e,t){let o=Ae(e);return o===t||!re(o)||Ne(o)?!1:ae(o).position==="fixed"||Aa(o,t)}function vn(e,t){let o=t.get(e);if(o)return o;let r=ke(e,[],!1).filter(n=>re(n)&&ze(n)!=="body"),a=null,s=ae(e).position==="fixed",i=s?Ae(e):e;for(;re(i)&&!Ne(i);){let n=ae(i),l=Ze(i);!l&&n.position==="fixed"&&(a=null),(s?!l&&!a:!l&&n.position==="static"&&!!a&&yn.has(a.position)||Ye(i)&&!l&&Aa(e,i))?r=r.filter(p=>p!==i):a=n,i=Ae(i)}return t.set(e,r),r}function wn(e){let{element:t,boundary:o,rootBoundary:r,strategy:a}=e,i=[...o==="clippingAncestors"?At(t)?[]:vn(t,this._c):[].concat(o),r],n=i[0],l=i.reduce((d,p)=>{let u=ba(t,p,a);return d.top=X(u.top,d.top),d.right=ye(u.right,d.right),d.bottom=ye(u.bottom,d.bottom),d.left=X(u.left,d.left),d},ba(t,n,a));return{width:l.right-l.left,height:l.bottom-l.top,x:l.left,y:l.top}}function Cn(e){let{width:t,height:o}=wa(e);return{width:t,height:o}}function Sn(e,t,o){let r=pe(t),a=ue(t),s=o==="fixed",i=We(e,!0,s,t),n={scrollLeft:0,scrollTop:0},l=de(0);function d(){l.x=Yt(a)}if(r||!r&&!s)if((ze(t)!=="body"||Ye(a))&&(n=kt(t)),r){let m=We(t,!0,s,t);l.x=m.x+t.clientLeft,l.y=m.y+t.clientTop}else a&&d();s&&!r&&a&&d();let p=a&&!r&&!s?Sa(a,n):de(0),u=i.left+n.scrollLeft-l.x-p.x,h=i.top+n.scrollTop-l.y-p.y;return{x:u,y:h,width:i.width,height:i.height}}function Ao(e){return ae(e).position==="static"}function va(e,t){if(!pe(e)||ae(e).position==="fixed")return null;if(t)return t(e);let o=e.offsetParent;return ue(e)===o&&(o=o.ownerDocument.body),o}function ka(e,t){let o=Q(e);if(At(e))return o;if(!pe(e)){let a=Ae(e);for(;a&&!Ne(a);){if(re(a)&&!Ao(a))return a;a=Ae(a)}return o}let r=va(e,t);for(;r&&ha(r)&&Ao(r);)r=va(r,t);return r&&Ne(r)&&Ao(r)&&!Ze(r)?o:r||xa(e)||o}var An=async function(e){let t=this.getOffsetParent||ka,o=this.getDimensions,r=await o(e.floating);return{reference:Sn(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function kn(e){return ae(e).direction==="rtl"}var Et={convertOffsetParentRelativeRectToViewportRelativeRect:mn,getDocumentElement:ue,getClippingRect:wn,getOffsetParent:ka,getElementRects:An,getClientRects:hn,getDimensions:Cn,getScale:Qe,isElement:re,isRTL:kn};function Ea(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function En(e,t){let o=null,r,a=ue(e);function s(){var n;clearTimeout(r),(n=o)==null||n.disconnect(),o=null}function i(n,l){n===void 0&&(n=!1),l===void 0&&(l=1),s();let d=e.getBoundingClientRect(),{left:p,top:u,width:h,height:m}=d;if(n||t(),!h||!m)return;let x=St(u),g=St(a.clientWidth-(p+h)),v=St(a.clientHeight-(u+m)),y=St(p),k={rootMargin:-x+"px "+-g+"px "+-v+"px "+-y+"px",threshold:X(0,ye(1,l))||1},C=!0;function O(S){let $=S[0].intersectionRatio;if($!==l){if(!C)return i();$?i(!1,$):r=setTimeout(()=>{i(!1,1e-7)},1e3)}$===1&&!Ea(d,e.getBoundingClientRect())&&i(),C=!1}try{o=new IntersectionObserver(O,{...k,root:a.ownerDocument})}catch{o=new IntersectionObserver(O,k)}o.observe(e)}return i(!0),s}function Pa(e,t,o,r){r===void 0&&(r={});let{ancestorScroll:a=!0,ancestorResize:s=!0,elementResize:i=typeof ResizeObserver=="function",layoutShift:n=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,d=ko(e),p=a||s?[...d?ke(d):[],...ke(t)]:[];p.forEach(y=>{a&&y.addEventListener("scroll",o,{passive:!0}),s&&y.addEventListener("resize",o)});let u=d&&n?En(d,o):null,h=-1,m=null;i&&(m=new ResizeObserver(y=>{let[b]=y;b&&b.target===d&&m&&(m.unobserve(t),cancelAnimationFrame(h),h=requestAnimationFrame(()=>{var k;(k=m)==null||k.observe(t)})),o()}),d&&!l&&m.observe(d),m.observe(t));let x,g=l?We(e):null;l&&v();function v(){let y=We(e);g&&!Ea(g,y)&&o(),g=y,x=requestAnimationFrame(v)}return o(),()=>{var y;p.forEach(b=>{a&&b.removeEventListener("scroll",o),s&&b.removeEventListener("resize",o)}),u?.(),(y=m)==null||y.disconnect(),m=null,l&&cancelAnimationFrame(x)}}var Ta=da;var La=ua,Ra=fa,Eo=pa;var _a=la;var $a=(e,t,o)=>{let r=new Map,a={platform:Et,...o},s={...a.platform,_c:r};return na(e,t,{...a,platform:s})};function Da(e){return Pn(e)}function Po(e){return e.assignedSlot?e.assignedSlot:e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentNode}function Pn(e){for(let t=e;t;t=Po(t))if(t instanceof Element&&getComputedStyle(t).display==="none")return null;for(let t=Po(e);t;t=Po(t)){if(!(t instanceof Element))continue;let o=getComputedStyle(t);if(o.display!=="contents"&&(o.position!=="static"||Ze(o)||t.tagName==="BODY"))return t}return null}var Ee={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Zt=e=>(...t)=>({_$litDirective$:e,values:t}),Je=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,o,r){this._$Ct=t,this._$AM=o,this._$Ci=r}_$AS(t,o){return this.update(t,o)}update(t,o){return this.render(...o)}};var se=Zt(class extends Je{constructor(e){if(super(e),e.type!==Ee.ATTRIBUTE||e.name!=="class"||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return" "+Object.keys(e).filter(t=>e[t]).join(" ")+" "}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in t)t[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(t)}let o=e.element.classList;for(let r of this.st)r in t||(o.remove(r),this.st.delete(r));for(let r in t){let a=!!t[r];a===this.st.has(r)||this.nt?.has(r)||(a?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return Y}});function Oa(e){return e!==null&&typeof e=="object"&&"getBoundingClientRect"in e&&("contextElement"in e?e instanceof Element:!0)}var Qt=globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),L=class extends H{constructor(){super(...arguments),this.localize=new xe(this),this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let e=this.anchorEl.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,a=0,s=0,i=0,n=0,l=0,d=0,p=0;o?e.top<t.top?(r=e.left,a=e.bottom,s=e.right,i=e.bottom,n=t.left,l=t.top,d=t.right,p=t.top):(r=t.left,a=t.bottom,s=t.right,i=t.bottom,n=e.left,l=e.top,d=e.right,p=e.top):e.left<t.left?(r=e.right,a=e.top,s=t.left,i=t.top,n=e.right,l=e.bottom,d=t.left,p=t.bottom):(r=t.right,a=t.top,s=e.left,i=e.top,n=t.right,l=t.bottom,d=e.left,p=e.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${s}px`),this.style.setProperty("--hover-bridge-top-right-y",`${i}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${p}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(e){super.updated(e),e.has("active")&&(this.active?this.start():this.stop()),e.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let e=this.getRootNode();this.anchorEl=e.getElementById(this.anchor)}else this.anchor instanceof Element||Oa(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=Pa(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(e=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>e())):e()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let e=[Ta({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?e.push(Eo({apply:({rects:r})=>{let a=this.sync==="width"||this.sync==="both",s=this.sync==="height"||this.sync==="both";this.popup.style.width=a?`${r.reference.width}px`:"",this.popup.style.height=s?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let t;Qt&&!Oa(this.anchor)&&this.boundary==="scroll"&&(t=ke(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&e.push(Ra({boundary:this.flipBoundary||t,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&e.push(La({boundary:this.shiftBoundary||t,padding:this.shiftPadding})),this.autoSize?e.push(Eo({boundary:this.autoSizeBoundary||t,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:a})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${a}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&e.push(_a({element:this.arrowEl,padding:this.arrowPadding}));let o=Qt?r=>Et.getOffsetParent(r,Da):Et.getOffsetParent;$a(this.anchorEl,this.popup,{placement:this.placement,middleware:e,strategy:Qt?"absolute":"fixed",platform:{...Et,getOffsetParent:o}}).then(({x:r,y:a,middlewareData:s,placement:i})=>{let n=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[i.split("-")[0]];if(this.setAttribute("data-current-placement",i),Object.assign(this.popup.style,{left:`${r}px`,top:`${a}px`}),this.arrow){let d=s.arrow.x,p=s.arrow.y,u="",h="",m="",x="";if(this.arrowPlacement==="start"){let g=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";u=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",h=n?g:"",x=n?"":g}else if(this.arrowPlacement==="end"){let g=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=n?"":g,x=n?g:"",m=typeof p=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(x=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",u=typeof p=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(x=typeof d=="number"?`${d}px`:"",u=typeof p=="number"?`${p}px`:"");Object.assign(this.arrowEl.style,{top:u,right:h,bottom:m,left:x,[l]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new zr)}render(){return T`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${se({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${se({popup:!0,"popup-active":this.active,"popup-fixed":!Qt,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?T`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};L.css=Nr;f([P(".popup")],L.prototype,"popup",2);f([P(".arrow")],L.prototype,"arrowEl",2);f([c()],L.prototype,"anchor",2);f([c({type:Boolean,reflect:!0})],L.prototype,"active",2);f([c({reflect:!0})],L.prototype,"placement",2);f([c()],L.prototype,"boundary",2);f([c({type:Number})],L.prototype,"distance",2);f([c({type:Number})],L.prototype,"skidding",2);f([c({type:Boolean})],L.prototype,"arrow",2);f([c({attribute:"arrow-placement"})],L.prototype,"arrowPlacement",2);f([c({attribute:"arrow-padding",type:Number})],L.prototype,"arrowPadding",2);f([c({type:Boolean})],L.prototype,"flip",2);f([c({attribute:"flip-fallback-placements",converter:{fromAttribute:e=>e.split(" ").map(t=>t.trim()).filter(t=>t!==""),toAttribute:e=>e.join(" ")}})],L.prototype,"flipFallbackPlacements",2);f([c({attribute:"flip-fallback-strategy"})],L.prototype,"flipFallbackStrategy",2);f([c({type:Object})],L.prototype,"flipBoundary",2);f([c({attribute:"flip-padding",type:Number})],L.prototype,"flipPadding",2);f([c({type:Boolean})],L.prototype,"shift",2);f([c({type:Object})],L.prototype,"shiftBoundary",2);f([c({attribute:"shift-padding",type:Number})],L.prototype,"shiftPadding",2);f([c({attribute:"auto-size"})],L.prototype,"autoSize",2);f([c()],L.prototype,"sync",2);f([c({type:Object})],L.prototype,"autoSizeBoundary",2);f([c({attribute:"auto-size-padding",type:Number})],L.prototype,"autoSizePadding",2);f([c({attribute:"hover-bridge",type:Boolean})],L.prototype,"hoverBridge",2);L=f([U("wa-popup")],L);var Ve=[];function Ma(e){Ve.push(e)}function To(e){for(let t=Ve.length-1;t>=0;t--)if(Ve[t]===e){Ve.splice(t,1);break}}function Ba(e){return Ve.length>0&&Ve[Ve.length-1]===e}var Jt=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}};var eo=class extends Event{constructor(e){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=e}};var to=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}};var oo=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}};var Fa="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";var Ia=(e=21)=>{let t="",o=crypto.getRandomValues(new Uint8Array(e|=0));for(;e--;)t+=Fa[o[e]&63];return t};function qa(e,t,o){let r=a=>Object.is(a,-0)?0:a;return e<t?r(t):e>o?r(o):r(e)}function Ua(e=""){return`${e}${Ia()}`}function et(e,t){return new Promise(o=>{function r(a){a.target===e&&(e.removeEventListener(t,r),o())}e.addEventListener(t,r)})}async function tt(e,t,o){return e.animate(t,o).finished.catch(()=>{})}function Lo(e,t){return new Promise(o=>{let r=new AbortController,{signal:a}=r;if(e.classList.contains(t))return;e.classList.add(t);let s=!1,i=()=>{s||(s=!0,e.classList.remove(t),o(),r.abort())};e.addEventListener("animationend",i,{once:!0,signal:a}),e.addEventListener("animationcancel",i,{once:!0,signal:a}),requestAnimationFrame(()=>{!s&&e.getAnimations().length===0&&i()})})}function ot(e){return e=e.toString().toLowerCase(),e.indexOf("ms")>-1?parseFloat(e)||0:e.indexOf("s")>-1?(parseFloat(e)||0)*1e3:parseFloat(e)||0}function D(e,t){let o={waitUntilFirstUpdate:!1,...t};return(r,a)=>{let{update:s}=r,i=Array.isArray(e)?e:[e];r.update=function(n){i.forEach(l=>{let d=l;if(n.has(d)){let p=n.get(d),u=this[d];p!==u&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[a](p,u)}}),s.call(this,n)}}}var B=class extends H{constructor(){super(...arguments),this.placement="top",this.disabled=!1,this.distance=8,this.open=!1,this.skidding=0,this.showDelay=150,this.hideDelay=0,this.trigger="hover focus",this.withoutArrow=!1,this.for=null,this.anchor=null,this.eventController=new AbortController,this.handleBlur=()=>{this.hasTrigger("focus")&&this.hide()},this.handleClick=()=>{this.hasTrigger("click")&&(this.open?this.hide():this.show())},this.handleFocus=()=>{this.hasTrigger("focus")&&this.show()},this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.open&&Ba(this)&&(e.preventDefault(),e.stopPropagation(),this.hide())},this.handleMouseOver=()=>{this.hasTrigger("hover")&&(clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout(()=>this.show(),this.showDelay))},this.handleMouseOut=()=>{if(this.hasTrigger("hover")){let e=!!this.anchor?.matches(":hover"),t=this.matches(":hover");if(e||t)return;clearTimeout(this.hoverTimeout),e||t||(this.hoverTimeout=window.setTimeout(()=>{this.hide()},this.hideDelay))}}}connectedCallback(){super.connectedCallback(),this.eventController.signal.aborted&&(this.eventController=new AbortController),this.addEventListener("mouseout",this.handleMouseOut),this.open&&(this.open=!1,this.updateComplete.then(()=>{this.open=!0})),this.id||(this.id=Ua("wa-tooltip-")),this.for&&this.anchor?(this.anchor=null,this.handleForChange()):this.for&&this.handleForChange()}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("keydown",this.handleDocumentKeyDown),To(this),this.eventController.abort(),this.anchor&&this.removeFromAriaLabelledBy(this.anchor,this.id)}firstUpdated(){this.body.hidden=!this.open,this.open&&(this.popup.active=!0,this.popup.reposition())}hasTrigger(e){return this.trigger.split(" ").includes(e)}addToAriaLabelledBy(e,t){let r=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean);r.includes(t)||(r.push(t),e.setAttribute("aria-labelledby",r.join(" ")))}removeFromAriaLabelledBy(e,t){let a=(e.getAttribute("aria-labelledby")||"").split(/\s+/).filter(Boolean).filter(s=>s!==t);a.length>0?e.setAttribute("aria-labelledby",a.join(" ")):e.removeAttribute("aria-labelledby")}async handleOpenChange(){if(this.open){if(this.disabled)return;let e=new Jt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.addEventListener("keydown",this.handleDocumentKeyDown,{signal:this.eventController.signal}),Ma(this),this.body.hidden=!1,this.popup.active=!0,await Lo(this.popup.popup,"show-with-scale"),this.popup.reposition(),this.dispatchEvent(new oo)}else{let e=new eo;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}document.removeEventListener("keydown",this.handleDocumentKeyDown),To(this),await Lo(this.popup.popup,"hide-with-scale"),this.popup.active=!1,this.body.hidden=!0,this.dispatchEvent(new to)}}handleForChange(){let e=this.getRootNode();if(!e)return;let t=this.for?e.getElementById(this.for):null,o=this.anchor;if(t===o)return;let{signal:r}=this.eventController;t&&(this.addToAriaLabelledBy(t,this.id),t.addEventListener("blur",this.handleBlur,{capture:!0,signal:r}),t.addEventListener("focus",this.handleFocus,{capture:!0,signal:r}),t.addEventListener("click",this.handleClick,{signal:r}),t.addEventListener("mouseover",this.handleMouseOver,{signal:r}),t.addEventListener("mouseout",this.handleMouseOut,{signal:r})),o&&(this.removeFromAriaLabelledBy(o,this.id),o.removeEventListener("blur",this.handleBlur,{capture:!0}),o.removeEventListener("focus",this.handleFocus,{capture:!0}),o.removeEventListener("click",this.handleClick),o.removeEventListener("mouseover",this.handleMouseOver),o.removeEventListener("mouseout",this.handleMouseOut)),this.anchor=t}async handleOptionsChange(){this.hasUpdated&&(await this.updateComplete,this.popup.reposition())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}async show(){if(!this.open)return this.open=!0,et(this,"wa-after-show")}async hide(){if(this.open)return this.open=!1,et(this,"wa-after-hide")}render(){return T`
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
    `}};B.css=Hr;B.dependencies={"wa-popup":L};f([P("slot:not([name])")],B.prototype,"defaultSlot",2);f([P(".body")],B.prototype,"body",2);f([P("wa-popup")],B.prototype,"popup",2);f([c()],B.prototype,"placement",2);f([c({type:Boolean,reflect:!0})],B.prototype,"disabled",2);f([c({type:Number})],B.prototype,"distance",2);f([c({type:Boolean,reflect:!0})],B.prototype,"open",2);f([c({type:Number})],B.prototype,"skidding",2);f([c({attribute:"show-delay",type:Number})],B.prototype,"showDelay",2);f([c({attribute:"hide-delay",type:Number})],B.prototype,"hideDelay",2);f([c()],B.prototype,"trigger",2);f([c({attribute:"without-arrow",type:Boolean,reflect:!0})],B.prototype,"withoutArrow",2);f([c()],B.prototype,"for",2);f([Z()],B.prototype,"anchor",2);f([D("open",{waitUntilFirstUpdate:!0})],B.prototype,"handleOpenChange",1);f([D("for")],B.prototype,"handleForChange",1);f([D(["distance","placement","skidding"])],B.prototype,"handleOptionsChange",1);f([D("disabled")],B.prototype,"handleDisabledChange",1);B=f([U("wa-tooltip")],B);var ro={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};var Ha=([e,t,o])=>{let r=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.keys(t).forEach(a=>{r.setAttribute(a,String(t[a]))}),o?.length&&o.forEach(a=>{let s=Ha(a);r.appendChild(s)}),r},za=(e,t={})=>{let r={...ro,...t};return Ha(["svg",r,e])};var Na=e=>{for(let t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};var Wa=(...e)=>e.filter((t,o,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===o).join(" ").trim();var Va=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,o,r)=>r?r.toUpperCase():o.toLowerCase());var ja=e=>{let t=Va(e);return t.charAt(0).toUpperCase()+t.slice(1)};var Tn=e=>Array.from(e.attributes).reduce((t,o)=>(t[o.name]=o.value,t),{}),Ga=e=>typeof e=="string"?e:!e||!e.class?"":e.class&&typeof e.class=="string"?e.class.split(" "):e.class&&Array.isArray(e.class)?e.class:"",Ro=(e,{nameAttr:t,icons:o,attrs:r})=>{let a=e.getAttribute(t);if(a==null)return;let s=ja(a),i=o[s];if(!i)return console.warn(`${e.outerHTML} icon name was not found in the provided icons object.`);let n=Tn(e),l=Na(n)?{}:{"aria-hidden":"true"},d={...ro,"data-lucide":a,...l,...r,...n},p=Ga(n),u=Ga(r),h=Wa("lucide",`lucide-${a}`,...p,...u);h&&Object.assign(d,{class:h});let m=za(i,d);return e.parentNode?.replaceChild(m,e)};var _o=[["path",{d:"m9 18 6-6-6-6"}]];var $o=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var Do=[["path",{d:"m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71"}],["path",{d:"m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71"}],["line",{x1:"8",x2:"8",y1:"2",y2:"5"}],["line",{x1:"2",x2:"5",y1:"8",y2:"8"}],["line",{x1:"16",x2:"16",y1:"19",y2:"22"}],["line",{x1:"19",x2:"22",y1:"16",y2:"16"}]];var Oo=({icons:e={},nameAttr:t="data-lucide",attrs:o={},root:r=document,inTemplates:a}={})=>{if(!Object.values(e).length)throw new Error(`Please provide an icons object.
If you want to use all the icons you can import it like:
 \`import { createIcons, icons } from 'lucide';
lucide.createIcons({icons});\``);if(typeof r>"u")throw new Error("`createIcons()` only works in a browser environment.");if(Array.from(r.querySelectorAll(`[${t}]`)).forEach(i=>Ro(i,{nameAttr:t,icons:e,attrs:o})),a&&Array.from(r.querySelectorAll("template")).forEach(n=>Oo({icons:e,nameAttr:t,attrs:o,root:n.content,inTemplates:a})),t==="data-lucide"){let i=r.querySelectorAll("[icon-name]");i.length>0&&(console.warn("[Lucide] Some icons were found with the now deprecated icon-name attribute. These will still be replaced for backwards compatibility, but will no longer be supported in v1.0 and you should switch to data-lucide"),Array.from(i).forEach(n=>Ro(n,{nameAttr:"icon-name",icons:e,attrs:o})))}};var Xa="data-icon";function Ka([e,t]){let o=document.createElement("span");return o.setAttribute(Xa,t),o.setAttribute("slot",e),o}function ao(e){Oo({icons:{ChevronRight:_o,Link:$o,Unlink:Do},attrs:{width:16,height:16},nameAttr:Xa,root:e?.root})}var so={REST:"rest",SUCCESS:"success"},Ya,Za,Qa,Ja,es,ts,os,rs,as,ss,is,ns,ls,A,Mo,Bo,Fo,Io,qo,Uo,Ho,zo,No,Wo,Vo;ls=[U("copy-url")];var N=class extends(ns=oe,is=[P('slot[name="copy-icon"]')],ss=[P('slot[name="success-icon"]')],as=[c()],rs=[c({attribute:"copy-label"})],os=[c()],ts=[c()],es=[c()],Ja=[c({attribute:"success-label"})],Qa=[c({attribute:"tooltip-placement"})],Za=[Z()],Ya=[Z()],ns){constructor(){super(...arguments);_(this,Mo,w(A,8,this)),w(A,11,this);_(this,Bo,w(A,12,this)),w(A,15,this);_(this,Fo,w(A,16,this,"")),w(A,19,this);_(this,Io,w(A,20,this,"Copy link")),w(A,23,this);_(this,qo,w(A,24,this,1e3)),w(A,27,this);_(this,Uo,w(A,28,this,Cr)),w(A,31,this);_(this,Ho,w(A,32,this,wr)),w(A,35,this);_(this,zo,w(A,36,this,"Copied")),w(A,39,this);_(this,No,w(A,40,this,"top")),w(A,43,this);_(this,Wo,w(A,44,this,!1)),w(A,47,this);_(this,Vo,w(A,48,this,so.REST)),w(A,51,this)}async handleCopy(){let o,r;this.isCopying||(this.isCopying=!0,o=new URL(window.location.href),o.hash=this.from,r=o.href,r&&(await navigator.clipboard.writeText(r),await this.animateIcon()))}firstUpdated(){super.firstUpdated(),ao({root:this.shadowRoot})}get label(){return this.status===so.SUCCESS?this.successLabel:this.copyLabel}render(){return T`
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
    `}async animateIcon(){let{matches:o}=window.matchMedia("(prefers-reduced-motion: reduce)"),r=o?this.showAnimationReducedMotion:this.showAnimation;this.copyIcon.hidden=!1,this.status=so.SUCCESS,await this.successIcon.animate(r.keyframes,r.options).finished,setTimeout(()=>{document.documentElement.style.setProperty("--jsdoc-copy-icon-opacity",0),this.copyIcon.hidden=!0,this.isCopying=!1,this.status=so.REST},this.feedbackDuration)}};A=Rt(ns),Mo=new WeakMap,Bo=new WeakMap,Fo=new WeakMap,Io=new WeakMap,qo=new WeakMap,Uo=new WeakMap,Ho=new WeakMap,zo=new WeakMap,No=new WeakMap,Wo=new WeakMap,Vo=new WeakMap,I(A,4,"copyIcon",is,N,Mo),I(A,4,"successIcon",ss,N,Bo),I(A,4,"from",as,N,Fo),I(A,4,"copyLabel",rs,N,Io),I(A,4,"feedbackDuration",os,N,qo),I(A,4,"showAnimation",ts,N,Uo),I(A,4,"showAnimationReducedMotion",es,N,Ho),I(A,4,"successLabel",Ja,N,zo),I(A,4,"tooltipPlacement",Qa,N,No),I(A,4,"isCopying",Za,N,Wo),I(A,4,"status",Ya,N,Vo),N=I(A,0,"CopyUrl",ls,N),_t(N,"styles",[R`
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
    `,R`
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
    `]),w(A,1,N);var Ln=["copy-url","jsdoc-outline","wa-details","wa-icon","wa-tree","wa-tree-item"];(async()=>{let e=Ln.filter(t=>document.querySelector(t));await Promise.allSettled(e.map(t=>customElements.whenDefined(t)));for(let t of e)for(let o of document.querySelectorAll(t))o.classList.add("ready")})();var cs=Pi(us(),1),ps="--navbar-scroll-margin";function jo(e){let t=getComputedStyle(document.body),o;return e&&(o=getComputedStyle(e).getPropertyValue(ps)),o||(o=t.getPropertyValue(ps)),o=Number(o.replace("rem",""))*parseFloat(t.fontSize),Math.ceil(o/5)*5}(()=>{let e={PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SPACE:"Space"};function t(s,i){let n=jo(s);return i-n}function o(s){(0,cs.default)({durationMs:200,startValue:window.scrollY,endValue:s,onStep:i=>window.scroll({behavior:"instant",top:i})})}function r(s,i,n){let l;i&&(l=document.getElementById(i),l&&(s.preventDefault(),o(t(l,l.offsetTop)),window.history.pushState(null,null,n)))}function a(s){return s.substring(1)}window.addEventListener("load",s=>{let i=a(document.location.hash);r(s,i,document.location.href)}),window.addEventListener("hashchange",s=>{let i=new URL(s.newURL),n=a(i.hash);r(s,n,i.hash)}),document.addEventListener("keydown",s=>{let i=s.code,n;i!==e.SPACE&&i!==e.PAGE_DOWN&&i!==e.PAGE_UP||(s.preventDefault(),s.stopImmediatePropagation(),n=t(null,window.innerHeight),i===e.PAGE_UP?o(window.scrollY-n):o(window.scrollY+n))})})();function _n(e){var t=typeof e;return e!=null&&(t=="object"||t=="function")}var je=_n;var $n=typeof global=="object"&&global&&global.Object===Object&&global,ms=$n;var Dn=typeof self=="object"&&self&&self.Object===Object&&self,On=ms||Dn||Function("return this")(),io=On;var Mn=function(){return io.Date.now()},no=Mn;var Bn=/\s/;function Fn(e){for(var t=e.length;t--&&Bn.test(e.charAt(t)););return t}var hs=Fn;var In=/^\s+/;function qn(e){return e&&e.slice(0,hs(e)+1).replace(In,"")}var xs=qn;var Un=io.Symbol,rt=Un;var gs=Object.prototype,Hn=gs.hasOwnProperty,zn=gs.toString,Pt=rt?rt.toStringTag:void 0;function Nn(e){var t=Hn.call(e,Pt),o=e[Pt];try{e[Pt]=void 0;var r=!0}catch{}var a=zn.call(e);return r&&(t?e[Pt]=o:delete e[Pt]),a}var ys=Nn;var Wn=Object.prototype,Vn=Wn.toString;function jn(e){return Vn.call(e)}var bs=jn;var Gn="[object Null]",Xn="[object Undefined]",vs=rt?rt.toStringTag:void 0;function Kn(e){return e==null?e===void 0?Xn:Gn:vs&&vs in Object(e)?ys(e):bs(e)}var ws=Kn;function Yn(e){return e!=null&&typeof e=="object"}var Cs=Yn;var Zn="[object Symbol]";function Qn(e){return typeof e=="symbol"||Cs(e)&&ws(e)==Zn}var Ss=Qn;var As=NaN,Jn=/^[-+]0x[0-9a-f]+$/i,el=/^0b[01]+$/i,tl=/^0o[0-7]+$/i,ol=parseInt;function rl(e){if(typeof e=="number")return e;if(Ss(e))return As;if(je(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=je(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=xs(e);var o=el.test(e);return o||tl.test(e)?ol(e.slice(2),o?2:8):Jn.test(e)?As:+e}var Go=rl;var al="Expected a function",sl=Math.max,il=Math.min;function nl(e,t,o){var r,a,s,i,n,l,d=0,p=!1,u=!1,h=!0;if(typeof e!="function")throw new TypeError(al);t=Go(t)||0,je(o)&&(p=!!o.leading,u="maxWait"in o,s=u?sl(Go(o.maxWait)||0,t):s,h="trailing"in o?!!o.trailing:h);function m(S){var $=r,j=a;return r=a=void 0,d=S,i=e.apply(j,$),i}function x(S){return d=S,n=setTimeout(y,t),p?m(S):i}function g(S){var $=S-l,j=S-d,J=t-$;return u?il(J,s-j):J}function v(S){var $=S-l,j=S-d;return l===void 0||$>=t||$<0||u&&j>=s}function y(){var S=no();if(v(S))return b(S);n=setTimeout(y,g(S))}function b(S){return n=void 0,h&&r?m(S):(r=a=void 0,i)}function k(){n!==void 0&&clearTimeout(n),d=0,r=l=a=n=void 0}function C(){return n===void 0?i:b(no())}function O(){var S=no(),$=v(S);if(r=arguments,a=this,l=S,$){if(n===void 0)return x(l);if(u)return clearTimeout(n),n=setTimeout(y,t),m(l)}return n===void 0&&(n=setTimeout(y,t)),i}return O.cancel=k,O.flush=C,O}var ks=nl;var ll="Expected a function";function fl(e,t,o){var r=!0,a=!0;if(typeof e!="function")throw new TypeError(ll);return je(o)&&(r="leading"in o?!!o.leading:r,a="trailing"in o?!!o.trailing:a),ks(e,t,{leading:r,maxWait:t,trailing:a})}var Es=fl;var dl="h2, h3";function Bs(e,t,o=[]){for(let r of e)r instanceof Comment||(r instanceof Text?o.push(r.textContent):r.matches(t)&&Bs(r.childNodes,t,o));return o}function tr(e){if(e?.localName.startsWith("h")){let t=e.localName.substring(1),o=parseInt(t,10);if(o>=1&&o<=6)return o}return null}function ul(e){return t=>{for(let o of t)if(o.target.parentElement.closest(e.levels)){e.updateTree();break}}}function pl(e,t){let o=`:not(copy-url, .${t.hideFromNavClass})`,r;return e?(r=Bs(e.childNodes,o),r.join("").trim()):null}var or=class{constructor(t,o){this.children=[],this.hideFromNav=o.isHidden(t),this.id=t?.id,this.level=tr(t),this.text=pl(t,o)}},Ps,Ts,Ls,Rs,_s,$s,Ds,Os,Ms,M,Xo,Ko,Yo,Zo,Qo,Jo,er,at,st,it,nt,lt,F,rr,Fs,Is,qs,Us,ar,Hs,sr,zs;Ms=[U("jsdoc-outline")];var ee=class extends(Os=oe,Ds=[P('slot[name="contents"]')],$s=[c({attribute:"hide-from-nav-class"})],_s=[c({reflect:!0})],Rs=[Jr("a")],Ls=[P('slot[name="title"]')],Ts=[c({reflect:!0})],Ps=[c()],Os){constructor(){super();_(this,F);_(this,Xo,w(M,8,this)),w(M,11,this);_(this,Ko,w(M,12,this,"hide-from-nav")),w(M,15,this);_(this,Yo,w(M,16,this,dl)),w(M,19,this);_(this,Zo,w(M,20,this)),w(M,23,this);_(this,Qo,w(M,24,this)),w(M,27,this);_(this,Jo,w(M,28,this,"On this page")),w(M,31,this);_(this,er,w(M,32,this)),w(M,35,this);_(this,at);_(this,st);_(this,it);_(this,nt);_(this,lt);he(this,at,null),he(this,st,new WeakMap),he(this,it,null),he(this,lt,new WeakSet)}connectedCallback(){super.connectedCallback(),this.updateTree()}firstUpdated(){super.firstUpdated(),he(this,it,new MutationObserver(ul(this))),K(this,F,Is).call(this);let o=jo(),r=o/2;he(this,at,new IntersectionObserver(a=>K(this,F,Fs).call(this,a,fe(this,lt)),{rootMargin:`-${o}px 0px -${r}px 0px`})),K(this,F,sr).call(this),K(this,F,qs).call(this)}isHidden(o){return Array.from(o.classList).includes(this.hideFromNavClass)}render(){return this.tree?T`
      <nav class="container" aria-labelledby="title">
        <slot name="title">
          <h2 part="title" class="title">${this.titleText}</h2>
        </slot>
        <slot name="contents">
          <ul part="contents" class="contents">
            ${K(this,F,ar).call(this,this.tree)}
          </ul>
        </slot>
        <slot></slot>
      </nav>
    `:T``}updateTree(){return fe(this,nt)||he(this,nt,Es(K(this,F,zs),500)),fe(this,nt).call(this)}};M=Rt(Os),Xo=new WeakMap,Ko=new WeakMap,Yo=new WeakMap,Zo=new WeakMap,Qo=new WeakMap,Jo=new WeakMap,er=new WeakMap,at=new WeakMap,st=new WeakMap,it=new WeakMap,nt=new WeakMap,lt=new WeakMap,F=new WeakSet,rr=function(o,r){let a=[];for(r??(r={count:0});o.length;){let s=o.shift(),i,n;this.isHidden(s)||(n=new or(s,this),r.count++,i=K(this,F,Hs).call(this,o,s),i.length&&(n.children=K(this,F,rr).call(this,i,r)),a.push(n))}return r.count<=1?null:a},Fs=function(o,r){o.forEach(a=>{a.isIntersecting?r.add(a.target):r.delete(a.target)}),K(this,F,sr).call(this)},Is=function(){fe(this,it).observe(document.body,{attributes:!0,characterData:!0,childList:!0,subtree:!0})},qs=function(){for(let o of Array.from(this.links)){let r=o.hash.slice(1),a=r?document.getElementById(r):null;a&&(fe(this,st).set(o,a),fe(this,at).observe(a))}},Us=function(o){return o?T`
      <ul class="contents nested">
        ${K(this,F,ar).call(this,o)}
      </ul>
    `:T``},ar=function(o){let r=[];for(let a of o)r.push(T`
        <li>
          <p><a href="#${a.id}">${a.text}</a></p>
          ${K(this,F,Us).call(this,a.children)}
        </li>
      `);return r},Hs=function(o,r){let a=[],s=tr(r);for(;tr(o[0])>s;){let i=o.shift();this.isHidden(i)||a.push(i)}return a},sr=function(){let o=Array.from(this.links);o.find(r=>{let a=fe(this,st).get(r);return a&&fe(this,lt).has(a)?(o.forEach(s=>s.classList.toggle("current",s===r)),!0):!1})},zs=function(){let r=this.levels.split(",").map(a=>a.trim()).map(a=>`.jsdoc-content ${a}`).join(", ");this.tree=K(this,F,rr).call(this,Array.from(document.querySelectorAll(r)))},I(M,4,"contents",Ds,ee,Xo),I(M,4,"hideFromNavClass",$s,ee,Ko),I(M,4,"levels",_s,ee,Yo),I(M,4,"links",Rs,ee,Zo),I(M,4,"title",Ls,ee,Qo),I(M,4,"titleText",Ts,ee,Jo),I(M,4,"tree",Ps,ee,er),ee=I(M,0,"Outline",Ms,ee),_t(ee,"styles",[R`
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
    `]),w(M,1,ee);var Ns=R`
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
`;var Ws=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}};var cl=()=>({observedAttributes:["custom-error"],checkValidity(e){let t={message:"",isValid:!0,invalidKeys:[]};return e.customError&&(t.message=e.customError,t.isValid=!1,t.invalidKeys=["customError"]),t}}),ie=class extends H{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=e=>{e.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new Ws))},this.handleInteraction=e=>{let t=this.emittedEvents;t.includes(e.type)||t.push(e.type),t.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[cl()]}static get observedAttributes(){let e=new Set(super.observedAttributes||[]);for(let t of this.validators)if(t.observedAttributes)for(let o of t.observedAttributes)e.add(o);return[...e]}connectedCallback(){super.connectedCallback(),this.updateValidity(),this.assumeInteractionOn.forEach(e=>{this.addEventListener(e,this.handleInteraction)})}firstUpdated(...e){super.firstUpdated(...e),this.updateValidity()}willUpdate(e){if(!!1&&e.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),e.has("value")||e.has("disabled")||e.has("defaultValue")){let t=this.value;if(Array.isArray(t)){if(this.name){let o=new FormData;for(let r of t)o.append(this.name,r);this.setValue(o,o)}}else this.setValue(t,t)}e.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(e),this.updateValidity()}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(e){e?this.setAttribute("form",e):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...e){let t=e[0],o=e[1],r=e[2];r||(r=this.validationTarget),this.internals.setValidity(t,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let e=!!this.required,t=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",e),this.customStates.set("optional",!e),this.customStates.set("invalid",!t),this.customStates.set("valid",t),this.customStates.set("user-invalid",!t&&o),this.customStates.set("user-valid",t&&o)}setCustomValidity(e){if(!e){this.customError=null,this.setValidity({});return}this.customError=e,this.setValidity({customError:!0},e,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(e){this.disabled=e,this.updateValidity()}formStateRestoreCallback(e,t){this.value=e,t==="restore"&&this.resetValidity(),this.updateValidity()}setValue(...e){let[t,o]=e;this.internals.setFormValue(t,o)}get allValidators(){let e=this.constructor.validators||[],t=this.validators||[];return[...e,...t]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let e=this.allValidators;if(!e?.length)return;let t={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let a of e){let{isValid:s,message:i,invalidKeys:n}=a.checkValidity(this);s||(r||(r=i),n?.length>=0&&n.forEach(l=>t[l]=!0))}r||(r=this.validationMessage),this.setValidity(t,r,o)}};ie.formAssociated=!0;f([c({reflect:!0})],ie.prototype,"name",2);f([c({type:Boolean})],ie.prototype,"disabled",2);f([c({state:!0,attribute:!1})],ie.prototype,"valueHasChanged",2);f([c({state:!0,attribute:!1})],ie.prototype,"hasInteracted",2);f([c({attribute:"custom-error",reflect:!0})],ie.prototype,"customError",2);f([c({attribute:!1,state:!0,type:Object})],ie.prototype,"validity",1);var V=class extends H{constructor(){super(...arguments),this.localize=new xe(this),this.isAnimating=!1,this.open=!1,this.disabled=!1,this.appearance="outlined",this.iconPlacement="end"}disconnectedCallback(){super.disconnectedCallback(),this.detailsObserver?.disconnect()}firstUpdated(){this.body.style.height=this.open?"auto":"0",this.open&&(this.details.open=!0),this.detailsObserver=new MutationObserver(e=>{for(let t of e)t.type==="attributes"&&t.attributeName==="open"&&(this.details.open?this.show():this.hide())}),this.detailsObserver.observe(this.details,{attributes:!0})}updated(e){e.has("isAnimating")&&this.customStates.set("animating",this.isAnimating)}handleSummaryClick(e){e.composedPath().some(r=>{if(!(r instanceof HTMLElement))return!1;let a=r.tagName?.toLowerCase();return["a","button","input","textarea","select"].includes(a)?!0:r instanceof ie?!("disabled"in r)||!r.disabled:!1})||(e.preventDefault(),this.disabled||(this.open?this.hide():this.show(),this.header.focus()))}handleSummaryKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.open?this.hide():this.show()),(e.key==="ArrowUp"||e.key==="ArrowLeft")&&(e.preventDefault(),this.hide()),(e.key==="ArrowDown"||e.key==="ArrowRight")&&(e.preventDefault(),this.show())}closeOthersWithSameName(){if(!this.name)return;this.getRootNode().querySelectorAll(`wa-details[name="${this.name}"]`).forEach(o=>{o!==this&&o.open&&(o.open=!1)})}async handleOpenChange(){if(this.open){this.details.open=!0;let e=new Jt;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1,this.details.open=!1;return}this.closeOthersWithSameName(),this.isAnimating=!0;let t=ot(getComputedStyle(this.body).getPropertyValue("--show-duration"));await tt(this.body,[{height:"0",opacity:"0"},{height:`${this.body.scrollHeight}px`,opacity:"1"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.dispatchEvent(new oo)}else{let e=new eo;if(this.dispatchEvent(e),e.defaultPrevented){this.details.open=!0,this.open=!0;return}this.isAnimating=!0;let t=ot(getComputedStyle(this.body).getPropertyValue("--hide-duration"));await tt(this.body,[{height:`${this.body.scrollHeight}px`,opacity:"1"},{height:"0",opacity:"0"}],{duration:t,easing:"linear"}),this.body.style.height="auto",this.isAnimating=!1,this.details.open=!1,this.dispatchEvent(new to)}}async show(){if(!(this.open||this.disabled))return this.open=!0,et(this,"wa-after-show")}async hide(){if(!(!this.open||this.disabled))return this.open=!1,et(this,"wa-after-hide")}render(){let e=this.hasUpdated?this.localize.dir()==="rtl":this.dir==="rtl";return T`
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
    `}};V.css=Ns;f([P("details")],V.prototype,"details",2);f([P("summary")],V.prototype,"header",2);f([P(".body")],V.prototype,"body",2);f([P(".expand-icon-slot")],V.prototype,"expandIconSlot",2);f([Z()],V.prototype,"isAnimating",2);f([c({type:Boolean,reflect:!0})],V.prototype,"open",2);f([c()],V.prototype,"summary",2);f([c({reflect:!0})],V.prototype,"name",2);f([c({type:Boolean,reflect:!0})],V.prototype,"disabled",2);f([c({reflect:!0})],V.prototype,"appearance",2);f([c({attribute:"icon-placement",reflect:!0})],V.prototype,"iconPlacement",2);f([D("open",{waitUntilFirstUpdate:!0})],V.prototype,"handleOpenChange",1);V=f([U("wa-details")],V);var Vs=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}};var js=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}};var Gs=R`
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
`;var ir="";function ml(e){ir=e}function Xs(){if(!ir){let e=document.querySelector("[data-fa-kit-code]");e&&ml(e.getAttribute("data-fa-kit-code")||"")}return ir}var Ks="7.2.0";function hl(e,t,o){let r=Xs(),a=r.length>0,s="solid";return t==="chisel"&&(s="chisel-regular"),t==="etch"&&(s="etch-solid"),t==="graphite"&&(s="graphite-thin"),t==="jelly"&&(s="jelly-regular",o==="duo-regular"&&(s="jelly-duo-regular"),o==="fill-regular"&&(s="jelly-fill-regular")),t==="jelly-duo"&&(s="jelly-duo-regular"),t==="jelly-fill"&&(s="jelly-fill-regular"),t==="notdog"&&(o==="solid"&&(s="notdog-solid"),o==="duo-solid"&&(s="notdog-duo-solid")),t==="notdog-duo"&&(s="notdog-duo-solid"),t==="slab"&&((o==="solid"||o==="regular")&&(s="slab-regular"),o==="press-regular"&&(s="slab-press-regular")),t==="slab-press"&&(s="slab-press-regular"),t==="thumbprint"&&(s="thumbprint-light"),t==="utility"&&(s="utility-semibold"),t==="utility-duo"&&(s="utility-duo-semibold"),t==="utility-fill"&&(s="utility-fill-semibold"),t==="whiteboard"&&(s="whiteboard-semibold"),t==="classic"&&(o==="thin"&&(s="thin"),o==="light"&&(s="light"),o==="regular"&&(s="regular"),o==="solid"&&(s="solid")),t==="duotone"&&(o==="thin"&&(s="duotone-thin"),o==="light"&&(s="duotone-light"),o==="regular"&&(s="duotone-regular"),o==="solid"&&(s="duotone")),t==="sharp"&&(o==="thin"&&(s="sharp-thin"),o==="light"&&(s="sharp-light"),o==="regular"&&(s="sharp-regular"),o==="solid"&&(s="sharp-solid")),t==="sharp-duotone"&&(o==="thin"&&(s="sharp-duotone-thin"),o==="light"&&(s="sharp-duotone-light"),o==="regular"&&(s="sharp-duotone-regular"),o==="solid"&&(s="sharp-duotone-solid")),t==="brands"&&(s="brands"),a?`https://ka-p.fontawesome.com/releases/v${Ks}/svgs/${s}/${e}.svg?token=${encodeURIComponent(r)}`:`https://ka-f.fontawesome.com/releases/v${Ks}/svgs/${s}/${e}.svg`}var xl={name:"default",resolver:(e,t="classic",o="solid")=>hl(e,t,o),mutator:(e,t)=>{if(t?.family&&!e.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=t;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="thumbprint"){let a=[...e.querySelectorAll("path")],s=a.find(n=>!n.hasAttribute("opacity")),i=a.find(n=>n.hasAttribute("opacity"));if(!s||!i)return;if(s.setAttribute("data-duotone-primary",""),i.setAttribute("data-duotone-secondary",""),t.swapOpacity&&s&&i){let n=i.getAttribute("opacity")||"0.4";s.style.setProperty("--path-opacity",n),i.style.setProperty("--path-opacity","1")}e.setAttribute("data-duotone-initialized","")}}}},Ys=xl;var Zs={};var gl="classic",yl=[Ys,Zs],nr=[];function Qs(e){nr.push(e)}function Js(e){nr=nr.filter(t=>t!==e)}function lo(e){return yl.find(t=>t.name===e)}function ei(){return gl}var{I:Hc}=qr;var ti=(e,t)=>t===void 0?e?._$litType$!==void 0:e?._$litType$===t;var oi=e=>e.strings===void 0;var bl={},ri=(e,t=bl)=>e._$AH=t;var Tt=Symbol(),fo=Symbol(),lr,fr=new Map,W=class extends H{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(e,t)=>{let o;if(t?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=T`<svg part="svg">
        <use part="use" href="${e}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof t.mutator=="function"&&t.mutator(r,this),this.svg}try{if(o=await fetch(e,{mode:"cors"}),!o.ok)return o.status===410?Tt:fo}catch{return fo}try{let r=document.createElement("div");r.innerHTML=await o.text();let a=r.firstElementChild;if(a?.tagName?.toLowerCase()!=="svg")return Tt;lr||(lr=new DOMParser);let i=lr.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return i?(i.part.add("svg"),document.adoptNode(i)):Tt}catch{return Tt}}}connectedCallback(){super.connectedCallback(),Qs(this)}firstUpdated(e){super.firstUpdated(e),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Js(this)}getIconSource(){let e=lo(this.library),t=this.family||ei();return this.name&&e?{url:e.resolver(this.name,t,this.variant,this.autoWidth),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:e,fromLibrary:t}=this.getIconSource(),o=t?lo(this.library):void 0;if(!e){this.svg=null;return}let r=fr.get(e);r||(r=this.resolveIcon(e,o),fr.set(e,r));let a=await r;if(a===fo&&fr.delete(e),e===this.getIconSource().url){if(ti(a)){this.svg=a;return}switch(a){case fo:case Tt:this.svg=null,this.dispatchEvent(new Vs);break;default:this.svg=a.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new js)}}}updated(e){super.updated(e);let t=lo(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&t?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:T`<svg part="svg" width="16" height="16"></svg>`}};W.css=Gs;f([Z()],W.prototype,"svg",2);f([c({reflect:!0})],W.prototype,"name",2);f([c({reflect:!0})],W.prototype,"family",2);f([c({reflect:!0})],W.prototype,"variant",2);f([c({attribute:"auto-width",type:Boolean,reflect:!0})],W.prototype,"autoWidth",2);f([c({attribute:"swap-opacity",type:Boolean,reflect:!0})],W.prototype,"swapOpacity",2);f([c()],W.prototype,"src",2);f([c()],W.prototype,"label",2);f([c({reflect:!0})],W.prototype,"library",2);f([c({type:Number,reflect:!0})],W.prototype,"rotate",2);f([c({type:String,reflect:!0})],W.prototype,"flip",2);f([c({type:String,reflect:!0})],W.prototype,"animation",2);f([D("label")],W.prototype,"handleLabelChange",1);f([D(["family","name","library","variant","src","autoWidth","swapOpacity"],{waitUntilFirstUpdate:!0})],W.prototype,"setIcon",1);W=f([U("wa-icon")],W);var ai=class extends Event{constructor(e){super("wa-selection-change",{bubbles:!0,cancelable:!1,composed:!0}),this.detail=e}};var si=class extends Event{constructor(){super("wa-lazy-change",{bubbles:!0,cancelable:!1,composed:!0})}};var ii=class extends Event{constructor(){super("wa-lazy-load",{bubbles:!0,cancelable:!1,composed:!0})}};var ni=class extends Event{constructor(){super("wa-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var li=class extends Event{constructor(){super("wa-after-expand",{bubbles:!0,cancelable:!1,composed:!0})}};var fi=class extends Event{constructor(){super("wa-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var di=class extends Event{constructor(){super("wa-after-collapse",{bubbles:!0,cancelable:!1,composed:!0})}};var ui=R`
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
`;var Lt=Zt(class extends Je{constructor(e){if(super(e),e.type!==Ee.PROPERTY&&e.type!==Ee.ATTRIBUTE&&e.type!==Ee.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!oi(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Y||t===q)return t;let o=e.element,r=e.name;if(e.type===Ee.PROPERTY){if(t===o[r])return Y}else if(e.type===Ee.BOOLEAN_ATTRIBUTE){if(!!t===o.hasAttribute(r))return Y}else if(e.type===Ee.ATTRIBUTE&&o.getAttribute(r)===t+"")return Y;return ri(e),t}});function dr(e,t,o){return e?t(e):o?.(e)}var E=class extends H{constructor(){super(...arguments),this.localize=new xe(this),this.indeterminate=!1,this.isLeaf=!1,this.loading=!1,this.selectable=!1,this.expanded=!1,this.selected=!1,this.disabled=!1,this.lazy=!1}static isTreeItem(e){return e instanceof Element&&e.getAttribute("role")==="treeitem"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","treeitem"),this.setAttribute("tabindex","-1"),this.isNestedItem()&&(this.slot="children")}firstUpdated(){this.childrenContainer.hidden=!this.expanded,this.childrenContainer.style.height=this.expanded?"auto":"0",this.isLeaf=!this.lazy&&this.getChildrenItems().length===0,this.handleExpandedChange()}async animateCollapse(){this.dispatchEvent(new fi);let e=ot(getComputedStyle(this.childrenContainer).getPropertyValue("--hide-duration"));await tt(this.childrenContainer,[{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"},{height:"0",opacity:"0",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.hidden=!0,this.dispatchEvent(new di)}isNestedItem(){let e=this.parentElement;return!!e&&E.isTreeItem(e)}handleChildrenSlotChange(){this.loading=!1,this.isLeaf=!this.lazy&&this.getChildrenItems().length===0}willUpdate(e){e.has("selected")&&!e.has("indeterminate")&&(this.indeterminate=!1)}async animateExpand(){this.dispatchEvent(new ni),this.childrenContainer.hidden=!1;let e=ot(getComputedStyle(this.childrenContainer).getPropertyValue("--show-duration"));await tt(this.childrenContainer,[{height:"0",opacity:"0",overflow:"hidden"},{height:`${this.childrenContainer.scrollHeight}px`,opacity:"1",overflow:"hidden"}],{duration:e,easing:"cubic-bezier(0.4, 0.0, 0.2, 1)"}),this.childrenContainer.style.height="auto",this.dispatchEvent(new li)}handleLoadingChange(){this.setAttribute("aria-busy",this.loading?"true":"false"),this.loading||this.animateExpand()}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.setAttribute("aria-disabled",this.disabled?"true":"false")}handleExpandedState(){this.customStates.set("expanded",this.expanded)}handleIndeterminateStateChange(){this.customStates.set("indeterminate",this.indeterminate)}handleSelectedChange(){this.customStates.set("selected",this.selected),this.setAttribute("aria-selected",this.selected?"true":"false")}handleExpandedChange(){this.isLeaf?this.removeAttribute("aria-expanded"):this.setAttribute("aria-expanded",this.expanded?"true":"false")}handleExpandAnimation(){this.expanded?this.lazy?(this.loading=!0,this.dispatchEvent(new ii)):this.animateExpand():this.animateCollapse()}handleLazyChange(){this.dispatchEvent(new si)}getChildrenItems({includeDisabled:e=!0}={}){return this.childrenSlot?[...this.childrenSlot.assignedElements({flatten:!0})].filter(t=>E.isTreeItem(t)&&(e||!t.disabled)):[]}render(){let e=this.localize.dir()==="rtl",t=!this.loading&&(!this.isLeaf||this.lazy);return T`
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
              ${dr(this.loading,()=>T` <wa-spinner part="spinner" exportparts="base:spinner__base"></wa-spinner> `,()=>T`
                  <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
                `)}
            </slot>
            <slot class="expand-icon-slot" name="collapse-icon">
              <wa-icon name=${e?"chevron-left":"chevron-right"} library="system" variant="solid"></wa-icon>
            </slot>
          </div>

          ${dr(this.selectable,()=>T`
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
    `}};E.css=ui;f([Z()],E.prototype,"indeterminate",2);f([Z()],E.prototype,"isLeaf",2);f([Z()],E.prototype,"loading",2);f([Z()],E.prototype,"selectable",2);f([c({type:Boolean,reflect:!0})],E.prototype,"expanded",2);f([c({type:Boolean,reflect:!0})],E.prototype,"selected",2);f([c({type:Boolean,reflect:!0})],E.prototype,"disabled",2);f([c({type:Boolean,reflect:!0})],E.prototype,"lazy",2);f([P("slot:not([name])")],E.prototype,"defaultSlot",2);f([P("slot[name=children]")],E.prototype,"childrenSlot",2);f([P(".item")],E.prototype,"itemElement",2);f([P(".children")],E.prototype,"childrenContainer",2);f([P(".expand-button slot")],E.prototype,"expandButtonSlot",2);f([D("loading",{waitUntilFirstUpdate:!0})],E.prototype,"handleLoadingChange",1);f([D("disabled")],E.prototype,"handleDisabledChange",1);f([D("expanded")],E.prototype,"handleExpandedState",1);f([D("indeterminate")],E.prototype,"handleIndeterminateStateChange",1);f([D("selected")],E.prototype,"handleSelectedChange",1);f([D("expanded",{waitUntilFirstUpdate:!0})],E.prototype,"handleExpandedChange",1);f([D("expanded",{waitUntilFirstUpdate:!0})],E.prototype,"handleExpandAnimation",1);f([D("lazy",{waitUntilFirstUpdate:!0})],E.prototype,"handleLazyChange",1);E=f([U("wa-tree-item")],E);var pi=R`
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
`;function ci(e,t=!1){function o(s){let i=s.getChildrenItems({includeDisabled:!1});if(i.length){let n=i.every(d=>d.selected),l=i.every(d=>!d.selected&&!d.indeterminate);s.selected=n,s.indeterminate=!n&&!l}}function r(s){let i=s.parentElement;E.isTreeItem(i)&&(o(i),r(i))}function a(s){for(let i of s.getChildrenItems())i.selected=t?s.selected||i.selected:!i.disabled&&s.selected,a(i);t&&o(s)}a(e),r(e)}var ce=class extends H{constructor(){super(),this.selection="single",this.clickTarget=null,this.localize=new xe(this),this.initTreeItem=e=>{e.updateComplete.then(()=>{e.selectable=this.selection==="multiple",["expand","collapse"].filter(t=>!!this.querySelector(`[slot="${t}-icon"]`)).forEach(t=>{let o=e.querySelector(`[slot="${t}-icon"]`),r=this.getExpandButtonIcon(t);r&&(o===null?e.append(r):o.hasAttribute("data-default")&&o.replaceWith(r))})})},this.handleTreeChanged=e=>{for(let t of e){let o=[...t.addedNodes].filter(E.isTreeItem),r=[...t.removedNodes].filter(E.isTreeItem);o.forEach(this.initTreeItem),this.lastFocusedItem&&r.includes(this.lastFocusedItem)&&(this.lastFocusedItem=null)}},this.handleFocusOut=e=>{let t=e.relatedTarget;(!t||!this.contains(t))&&(this.tabIndex=0)},this.handleFocusIn=e=>{let t=e.target;e.target===this&&this.focusItem(this.lastFocusedItem||this.getAllTreeItems()[0]),E.isTreeItem(t)&&!t.disabled&&(this.lastFocusedItem&&(this.lastFocusedItem.tabIndex=-1),this.lastFocusedItem=t,this.tabIndex=-1,t.tabIndex=0)},this.addEventListener("focusin",this.handleFocusIn),this.addEventListener("focusout",this.handleFocusOut),this.addEventListener("wa-lazy-change",this.handleSlotChange)}async connectedCallback(){super.connectedCallback(),this.setAttribute("role","tree"),this.setAttribute("tabindex","0"),await this.updateComplete,this.mutationObserver=new MutationObserver(this.handleTreeChanged),this.mutationObserver.observe(this,{childList:!0,subtree:!0})}disconnectedCallback(){super.disconnectedCallback(),this.mutationObserver?.disconnect()}getExpandButtonIcon(e){let o=(e==="expand"?this.expandedIconSlot:this.collapsedIconSlot).assignedElements({flatten:!0})[0];if(o){let r=o.cloneNode(!0);return[r,...r.querySelectorAll("[id]")].forEach(a=>a.removeAttribute("id")),r.setAttribute("data-default",""),r.slot=`${e}-icon`,r}return null}selectItem(e){let t=[...this.selectedItems];if(this.selection==="multiple")e.selected=!e.selected,e.lazy&&(e.expanded=!0),ci(e);else if(this.selection==="single"||e.isLeaf){let r=this.getAllTreeItems();for(let a of r)a.selected=a===e}else this.selection==="leaf"&&(e.expanded=!e.expanded);let o=this.selectedItems;(t.length!==o.length||o.some(r=>!t.includes(r)))&&Promise.all(o.map(r=>r.updateComplete)).then(()=>{this.dispatchEvent(new ai({selection:o}))})}getAllTreeItems(){return[...this.querySelectorAll("wa-tree-item")]}focusItem(e){e?.focus()}handleKeyDown(e){if(!["ArrowDown","ArrowUp","ArrowRight","ArrowLeft","Home","End","Enter"," "].includes(e.key)||e.composedPath().some(a=>["input","textarea"].includes(a?.tagName?.toLowerCase())))return;let t=this.getFocusableItems(),o=this.matches(":dir(ltr)"),r=this.localize.dir()==="rtl";if(t.length>0){e.preventDefault();let a=t.findIndex(l=>l.matches(":focus")),s=t[a],i=l=>{let d=t[qa(l,0,t.length-1)];this.focusItem(d)},n=l=>{s.expanded=l};e.key==="ArrowDown"?i(a+1):e.key==="ArrowUp"?i(a-1):o&&e.key==="ArrowRight"||r&&e.key==="ArrowLeft"?!s||s.disabled||s.expanded||s.isLeaf&&!s.lazy?i(a+1):n(!0):o&&e.key==="ArrowLeft"||r&&e.key==="ArrowRight"?!s||s.disabled||s.isLeaf||!s.expanded?i(a-1):n(!1):e.key==="Home"?i(0):e.key==="End"?i(t.length-1):(e.key==="Enter"||e.key===" ")&&(s.disabled||this.selectItem(s))}}handleClick(e){let t=e.target,o=t.closest("wa-tree-item"),r=e.composedPath().some(a=>a?.classList?.contains("expand-button"));!o||o.disabled||t!==this.clickTarget||(r?o.expanded=!o.expanded:this.selectItem(o))}handleMouseDown(e){this.clickTarget=e.target}handleSlotChange(){this.getAllTreeItems().forEach(this.initTreeItem)}async handleSelectionChange(){let e=this.selection==="multiple",t=this.getAllTreeItems();this.setAttribute("aria-multiselectable",e?"true":"false");for(let o of t)o.updateComplete.then(()=>{o.selectable=e});e&&(await this.updateComplete,[...this.querySelectorAll(":scope > wa-tree-item")].forEach(o=>{o.updateComplete.then(()=>{ci(o,!0)})}))}get selectedItems(){let e=this.getAllTreeItems(),t=o=>o.selected;return e.filter(t)}getFocusableItems(){let e=this.getAllTreeItems(),t=new Set;return e.filter(o=>{if(o.disabled)return!1;let r=o.parentElement?.closest("[role=treeitem]");return r&&(!r.expanded||r.loading||t.has(r))&&t.add(o),!t.has(o)})}render(){return T`
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
    `}};ce.css=pi;f([P("slot:not([name])")],ce.prototype,"defaultSlot",2);f([P("slot[name=expand-icon]")],ce.prototype,"expandedIconSlot",2);f([P("slot[name=collapse-icon]")],ce.prototype,"collapsedIconSlot",2);f([c()],ce.prototype,"selection",2);f([D("selection")],ce.prototype,"handleSelectionChange",1);ce=f([U("wa-tree")],ce);var mi=R`
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
`;var hi=(e={})=>{let{validationElement:t,validationProperty:o}=e;t||(t=Object.assign(document.createElement("input"),{required:!0})),o||(o="value");let r={observedAttributes:["required"],message:t.validationMessage,checkValidity(a){let s={message:"",isValid:!0,invalidKeys:[]};return(a.required??a.hasAttribute("required"))&&!a[o]&&(s.message=typeof r.message=="function"?r.message(a):r.message||"",s.isValid=!1,s.invalidKeys.push("valueMissing")),s}};return r};var xi=R`
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
`;var gi=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(e=>{if(e.nodeType===Node.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===Node.ELEMENT_NODE){let t=e;if(t.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(e){return this.host.querySelector?.(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}};var yi=R`
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
`;var ur=e=>e??q;var z=class extends ie{constructor(){super(...arguments),this.hasSlotController=new gi(this,"hint"),this.title="",this.name=null,this._value=this.getAttribute("value")??null,this.size="medium",this.disabled=!1,this.indeterminate=!1,this._checked=null,this.defaultChecked=this.hasAttribute("checked"),this.required=!1,this.hint=""}static get validators(){let e=[hi({validationProperty:"checked",validationElement:Object.assign(document.createElement("input"),{type:"checkbox",required:!0})})];return[...super.validators,...e]}get value(){let e=this._value||"on";return this.checked?e:null}set value(e){this._value=e}get checked(){return this.valueHasChanged?!!this._checked:this._checked??this.defaultChecked}set checked(e){this._checked=!!e,this.valueHasChanged=!0}handleClick(){this.hasInteracted=!0,this.checked=!this.checked,this.indeterminate=!1,this.updateComplete.then(()=>{this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))})}connectedCallback(){super.connectedCallback(),this.handleDefaultCheckedChange()}handleDefaultCheckedChange(){this.handleValueOrCheckedChange()}handleValueOrCheckedChange(){this.setValue(this.checked?this.value:null,this._value),this.updateValidity()}handleStateChange(){this.hasUpdated&&(this.input.checked=this.checked,this.input.indeterminate=this.indeterminate),this.customStates.set("checked",this.checked),this.customStates.set("indeterminate",this.indeterminate),this.updateValidity()}handleDisabledChange(){this.customStates.set("disabled",this.disabled)}willUpdate(e){super.willUpdate(e),(e.has("value")||e.has("checked")||e.has("defaultChecked"))&&this.handleValueOrCheckedChange()}formResetCallback(){this._checked=null,super.formResetCallback(),this.handleValueOrCheckedChange()}click(){this.input.click()}focus(e){this.input.focus(e)}blur(){this.input.blur()}render(){let e=this.hasSlotController.test("hint"),t=this.hint?!0:!!e,o=!this.checked&&this.indeterminate,r=o?"indeterminate":"check",a=o?"indeterminate":"check";return T`
      <label part="base">
        <span part="control">
          <input
            class="input"
            type="checkbox"
            title=${this.title}
            name=${ur(this.name)}
            value=${ur(this._value)}
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
    `}};z.css=[xi,yi,mi];z.shadowRootOptions={...ie.shadowRootOptions,delegatesFocus:!0};f([P('input[type="checkbox"]')],z.prototype,"input",2);f([c()],z.prototype,"title",2);f([c({reflect:!0})],z.prototype,"name",2);f([c({reflect:!0})],z.prototype,"value",1);f([c({reflect:!0})],z.prototype,"size",2);f([c({type:Boolean})],z.prototype,"disabled",2);f([c({type:Boolean,reflect:!0})],z.prototype,"indeterminate",2);f([c({type:Boolean,attribute:!1})],z.prototype,"checked",1);f([c({type:Boolean,reflect:!0,attribute:"checked"})],z.prototype,"defaultChecked",2);f([c({type:Boolean,reflect:!0})],z.prototype,"required",2);f([c()],z.prototype,"hint",2);f([D(["checked","defaultChecked"])],z.prototype,"handleDefaultCheckedChange",1);f([D(["checked","indeterminate"])],z.prototype,"handleStateChange",1);f([D("disabled")],z.prototype,"handleDisabledChange",1);z=f([U("wa-checkbox")],z);var bi=R`
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
`;var pr=class extends H{constructor(){super(...arguments),this.localize=new xe(this)}render(){return T`
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
    `}};pr.css=bi;pr=f([U("wa-spinner")],pr);var vl={"expand-icon":"chevron-right","collapse-icon":"chevron-right"};function vi(e){e.preventDefault()}function wl(e){e.stopImmediatePropagation()}var cr=class extends ce{handleClick(t){let o=t.target,r=o.closest("jsdoc-tree-item"),a=t.composedPath().some(s=>s?.classList?.contains("expand-button"));!r||r.disabled||o!==this.clickTarget||(a?r.expanded=!r.expanded:this.selectItem(r))}},mr=class extends E{connectedCallback(){super.connectedCallback(),Object.entries(vl).forEach(([t,o])=>{let r=Ka([t,o]);this.prepend(r)}),ao()}firstUpdated(){super.firstUpdated();for(let t of this.shadowRoot.querySelectorAll("wa-icon"))t.remove()}};customElements.define("jsdoc-tree",cr);customElements.define("jsdoc-tree-item",mr);document.querySelectorAll("wa-details").forEach(e=>{e.addEventListener("wa-hide",vi),e.addEventListener("wa-show",vi)});document.querySelectorAll(":not(wa-details) > jsdoc-tree > jsdoc-tree-item").forEach(e=>{let t=e.firstElementChild;t?.localName==="a"&&t.addEventListener("click",wl)});})();
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
@awesome.me/webawesome/dist/chunks/chunk.72WJND5X.js:
@awesome.me/webawesome/dist/chunks/chunk.OKXBNRE6.js:
@awesome.me/webawesome/dist/chunks/chunk.7VGCIHDG.js:
@awesome.me/webawesome/dist/chunks/chunk.EPHHWXK2.js:
@awesome.me/webawesome/dist/chunks/chunk.KGZRQJER.js:
@awesome.me/webawesome/dist/chunks/chunk.52WA2DJO.js:
@awesome.me/webawesome/dist/chunks/chunk.4ZAKP7NY.js:
@awesome.me/webawesome/dist/chunks/chunk.MQODJ75V.js:
@awesome.me/webawesome/dist/chunks/chunk.3NKIHICW.js:
@awesome.me/webawesome/dist/chunks/chunk.PX3HMKF7.js:
@awesome.me/webawesome/dist/chunks/chunk.KNJT7KBU.js:
@awesome.me/webawesome/dist/chunks/chunk.F25QOBDY.js:
@awesome.me/webawesome/dist/chunks/chunk.L6CIKOFQ.js:
@awesome.me/webawesome/dist/chunks/chunk.PZAN6FPN.js:
@awesome.me/webawesome/dist/chunks/chunk.2XOQF53T.js:
@awesome.me/webawesome/dist/components/tooltip/tooltip.js:
@awesome.me/webawesome/dist/chunks/chunk.WRKKMHO2.js:
@awesome.me/webawesome/dist/chunks/chunk.VC3BPUZJ.js:
@awesome.me/webawesome/dist/chunks/chunk.IPWPRIHZ.js:
@awesome.me/webawesome/dist/chunks/chunk.EERPZXW4.js:
@awesome.me/webawesome/dist/chunks/chunk.YDQCS2HK.js:
@awesome.me/webawesome/dist/chunks/chunk.WDIIGUNP.js:
@awesome.me/webawesome/dist/chunks/chunk.D5I2DWML.js:
@awesome.me/webawesome/dist/chunks/chunk.K6QMUIHP.js:
@awesome.me/webawesome/dist/chunks/chunk.JVTAGR5B.js:
@awesome.me/webawesome/dist/chunks/chunk.FSRXYGSW.js:
@awesome.me/webawesome/dist/chunks/chunk.JKBNW2TG.js:
@awesome.me/webawesome/dist/components/details/details.js:
@awesome.me/webawesome/dist/chunks/chunk.LCFSCRUJ.js:
@awesome.me/webawesome/dist/chunks/chunk.ZSEFTQAO.js:
@awesome.me/webawesome/dist/chunks/chunk.26QE47KB.js:
@awesome.me/webawesome/dist/chunks/chunk.FYKN76UA.js:
@awesome.me/webawesome/dist/chunks/chunk.Q6XMGFWJ.js:
@awesome.me/webawesome/dist/chunks/chunk.U36KZLSQ.js:
@awesome.me/webawesome/dist/chunks/chunk.AG44H7MD.js:
@awesome.me/webawesome/dist/chunks/chunk.22T33GII.js:
@awesome.me/webawesome/dist/chunks/chunk.QGB5HLXX.js:
@awesome.me/webawesome/dist/chunks/chunk.76FKYXVS.js:
@awesome.me/webawesome/dist/chunks/chunk.DBEJBXME.js:
@awesome.me/webawesome/dist/chunks/chunk.YB6263IP.js:
@awesome.me/webawesome/dist/chunks/chunk.SDDRXMOC.js:
@awesome.me/webawesome/dist/chunks/chunk.5LXXXELE.js:
@awesome.me/webawesome/dist/chunks/chunk.KIHB3VMB.js:
@awesome.me/webawesome/dist/chunks/chunk.6J6QYFHV.js:
@awesome.me/webawesome/dist/chunks/chunk.JVWBZOVQ.js:
@awesome.me/webawesome/dist/chunks/chunk.AGDGRG4E.js:
@awesome.me/webawesome/dist/chunks/chunk.VTAV2SG4.js:
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
   * @license lucide v0.575.0 - ISC
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
