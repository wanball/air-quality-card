/*! For license information please see air-quality-card.js.LICENSE.txt */
(()=>{"use strict";const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(s,t,i)},r=(i,s)=>{if(e)i.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of s){const s=document.createElement("style"),n=t.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=e.cssText,i.appendChild(s)}},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:l,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,m=globalThis,g=m.trustedTypes,f=g?g.emptyScript:"",b=m.reactiveElementPolyfillSupport,y=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},_=(t,e)=>!l(t,e),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:_};Symbol.metadata??=Symbol("metadata"),m.litPropertyMetadata??=new WeakMap;class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);n?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const t=this.properties,e=[...d(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return r(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s,this[s]=n.fromAttribute(e,t.type)??this._$Ej?.get(s)??null,this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){const s=this.constructor,n=this[t];if(i??=s.getPropertyOptions(t),!((i.hasChanged??_)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(s._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==n||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[y("elementProperties")]=new Map,x[y("finalized")]=new Map,b?.({ReactiveElement:x}),(m.reactiveElementVersions??=[]).push("2.1.0");const w=globalThis,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,M="?"+C,P=`<${M}>`,O=document,k=()=>O.createComment(""),U=t=>null===t||"object"!=typeof t&&"function"!=typeof t,R=Array.isArray,T="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,q=/>/g,j=RegExp(`>|${T}(?:([^\\s"'>=/]+)(${T}*=${T}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),z=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,L=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=L(1),F=(L(2),L(3),Symbol.for("lit-noChange")),V=Symbol.for("lit-nothing"),W=new WeakMap,Q=O.createTreeWalker(O,129);function J(t,e){if(!R(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const K=(t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":3===e?"<math>":"",r=H;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,l=r.exec(i),null!==l);)h=r.lastIndex,r===H?"!--"===l[1]?r=N:void 0!==l[1]?r=q:void 0!==l[2]?(I.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=j):void 0!==l[3]&&(r=j):r===j?">"===l[0]?(r=n??H,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,a=l[1],r=void 0===l[3]?j:'"'===l[3]?D:z):r===D||r===z?r=j:r===N||r===q?r=H:(r=j,n=void 0);const d=r===j&&t[e+1].startsWith("/>")?" ":"";o+=r===H?i+P:c>=0?(s.push(a),i.slice(0,c)+S+i.slice(c)+C+d):i+C+(-2===c?e:d)}return[J(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,a=this.parts,[l,c]=K(t,e);if(this.el=Y.createElement(l,i),Q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Q.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=c[o++],i=s.getAttribute(t).split(C),r=/([.?@])?(.*)/.exec(e);a.push({type:1,index:n,name:r[2],strings:i,ctor:"."===r[1]?et:"?"===r[1]?it:"@"===r[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(C)&&(a.push({type:6,index:n}),s.removeAttribute(t));if(I.test(s.tagName)){const t=s.textContent.split(C),e=t.length-1;if(e>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),Q.nextNode(),a.push({type:2,index:++n});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===M)a.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(C,t+1));)a.push({type:7,index:n}),t+=C.length-1}n++}}static createElement(t,e){const i=O.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,s){if(e===F)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const o=U(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),void 0===o?n=void 0:(n=new o(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Z(t,n._$AS(t,e.values),n,s)),e}class G{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??O).importNode(e,!0);Q.currentNode=s;let n=Q.nextNode(),o=0,r=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new X(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new nt(n,this,t)),this._$AV.push(e),a=i[++r]}o!==a?.index&&(n=Q.nextNode(),o++)}return Q.currentNode=O,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),U(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>R(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&U(this._$AH)?this._$AA.nextSibling.data=t:this.T(O.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new G(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Y(t)),e}k(t){R(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new X(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=Z(this,t,e,0),o=!U(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let r,a;for(t=n[0],r=0;r<n.length-1;r++)a=Z(this,s[i+r],e,r),a===F&&(a=this._$AH[r]),o||=!U(a)||a!==this._$AH[r],a===V?t=V:t!==V&&(t+=(a??"")+n[r+1]),this._$AH[r]=a}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class st extends tt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??V)===F)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const ot=w.litHtmlPolyfillSupport;ot?.(Y,X),(w.litHtmlVersions??=[]).push("3.3.0");const rt=globalThis;class at extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new X(e.insertBefore(k(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}at._$litElement$=!0,at.finalized=!0,rt.litElementHydrateSupport?.({LitElement:at});const lt=rt.litElementPolyfillSupport;lt?.({LitElement:at}),(rt.litElementVersions??=[]).push("4.2.0");const ct={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:_},ht=(t=ct,e,i)=>{const{kind:s,metadata:n}=i;let o=globalThis.litPropertyMetadata.get(n);if(void 0===o&&globalThis.litPropertyMetadata.set(n,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?ht(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}var pt,ut;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(pt||(pt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(ut||(ut={})),new Set(["fan","input_boolean","light","switch","group","automation"]);var mt=function(t,e,i,s){s=s||{},i=i??{};var n=new Event(e,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return n.detail=i,t.dispatchEvent(n),n};new Set(["call-service","divider","section","weblink","cast","select"]);var gt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};let ft=class extends at{setConfig(t){this._config={...t}}_getSensorObject(t){const e=this._config.entities?.[t];return e?"string"==typeof e?{entity:e}:e:{entity:""}}_sensorSubFieldChanged(t,e,i){this._config.entities||(this._config.entities={});const s=t.target,n=this._getSensorObject(e);let o=s.value;"number"===s.type?o=""===s.value?void 0:parseFloat(s.value):"checkbox"===s.type&&(o=s.checked),this._config.entities={...this._config.entities,[e]:{...n,[i]:o}},mt(this,"config-changed",{config:this._config})}render(){return this.hass&&this._config?(this._config._customThresholds,B`
      <div class="card-config">
        <div class="sensor-entry">
          <div class="sensor-title">CARD SETTINGS</div>
          <label>Title <input type="text" .value=${this._config.title||""} @input=${t=>{this._config.title=t.target.value,mt(this,"config-changed",{config:this._config})}} /></label>
          <div class="field-row">
            <label>Width <input type="text" .value=${this._config.width||""} @input=${t=>{this._config.width=t.target.value,mt(this,"config-changed",{config:this._config})}} /></label>
            <label>Height <input type="text" .value=${this._config.height||""} @input=${t=>{this._config.height=t.target.value,mt(this,"config-changed",{config:this._config})}} /></label>
          </div>
          <label style="margin-top:8px;">Recommendation Sensor
            <ha-entity-picker .hass=${this.hass} .value=${this._config.recommendation||""} @value-changed=${t=>{this._config.recommendation=t.detail.value,mt(this,"config-changed",{config:this._config})}} allow-custom-entity></ha-entity-picker>
          </label>
        </div>

        ${["pm1","pm2_5","pm10","pm0_1","co2","tvoc","hcho","co","o3","no2","so2","heat_index","uv_index","noise_level","pressure","illuminance","wind_speed","dew_point","absolute_humidity","vpd","rating"].map(t=>{const e=this._getSensorObject(t);return B`
            <div class="sensor-entry">
              <div class="sensor-title">${t.toUpperCase()}</div>
              
              <label>Entity</label>
              <ha-entity-picker
                .hass=${this.hass}
                .value=${e.entity}
                @value-changed=${e=>this._sensorSubFieldChanged(e,t,"entity")}
                allow-custom-entity
              ></ha-entity-picker>

              <div class="field-row">
                <label>Custom Name <input type="text" .value=${e.name||""} @input=${e=>this._sensorSubFieldChanged(e,t,"name")} /></label>
                <label>Custom Icon <input type="text" .value=${e.icon||""} @input=${e=>this._sensorSubFieldChanged(e,t,"icon")} /></label>
              </div>

              ${"rating"!==t?B`
                <div class="field-row">
                  <label>Override Min <input type="number" .value=${e.min??""} @input=${e=>this._sensorSubFieldChanged(e,t,"min")} /></label>
                  <label>Override Max <input type="number" .value=${e.max??""} @input=${e=>this._sensorSubFieldChanged(e,t,"max")} /></label>
                </div>
                <div class="checkbox-row">
                  <input type="checkbox" id="hide-${t}" .checked=${!!e.hidden} @change=${e=>this._sensorSubFieldChanged(e,t,"hidden")} />
                  <label for="hide-${t}">Hide on narrow container (Low Priority)</label>
                </div>
              `:""}
            </div>
          `})}
      </div>
    `):B``}};ft.styles=o`
    .sensor-entry {
      margin-bottom: 16px;
      padding: 12px;
      border: 1px solid var(--divider-color, #e8e8e8);
      border-radius: 8px;
      background: var(--secondary-background-color, #f9f9f9);
    }
    .sensor-title {
      font-size: 14px;
      font-weight: bold;
      color: var(--primary-text-color);
      margin-bottom: 8px;
      border-bottom: 1px solid var(--divider-color, #e8e8e8);
      padding-bottom: 4px;
    }
    .field-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-top: 8px;
    }
    label {
      display: block;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 4px;
    }
    input[type="number"], input[type="text"] {
      background-color: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
      border: 1px solid var(--divider-color, #ccc);
      border-radius: 4px;
      padding: 6px;
      width: 100%;
      box-sizing: border-box;
    }
    .checkbox-row {
      display: flex;
      align-items: center;
      margin-top: 8px;
      gap: 6px;
    }
    .checkbox-row input {
      margin: 0;
    }
  `,gt([dt({attribute:!1})],ft.prototype,"hass",void 0),gt([dt({state:!0,attribute:!1})],ft.prototype,"_config",void 0),ft=gt([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})("air-quality-card-editor")],ft);var bt=function(t,e,i,s){var n,o=arguments.length,r=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(n=t[a])&&(r=(o<3?n(r):o>3?n(e,i,r):n(e,i))||r);return o>3&&r&&Object.defineProperty(e,i,r),r};console.info("%c AIR QUALITY CARD  v1.1 ","color: white; background: green; font-weight: bold;");const yt={pm0_1:{min:0,max:35,unit:"µg/m³",icon:"mdi:grain",absoluteMin:0,absoluteMax:100},pm1:{min:0,max:35,unit:"µg/m³",icon:"mdi:grain",absoluteMin:0,absoluteMax:100},pm2_5:{min:0,max:50,unit:"µg/m³",icon:"mdi:blur",absoluteMin:0,absoluteMax:150},pm10:{min:0,max:100,unit:"µg/m³",icon:"mdi:blur",absoluteMin:0,absoluteMax:200},co2:{min:400,max:1e3,unit:"ppm",icon:"mdi:molecule-co2",absoluteMin:400,absoluteMax:2e3},tvoc:{min:0,max:500,unit:"ppb",icon:"mdi:air-filter",absoluteMin:0,absoluteMax:1e3},hcho:{min:0,max:.1,unit:"mg/m³",icon:"mdi:chemical-weapon",absoluteMin:0,absoluteMax:.5},co:{min:0,max:9,unit:"ppm",icon:"mdi:molecule-co",absoluteMin:0,absoluteMax:25},o3:{min:0,max:.07,unit:"ppm",icon:"mdi:molecule",absoluteMin:0,absoluteMax:.1},no2:{min:0,max:.05,unit:"ppm",icon:"mdi:gas-cylinder",absoluteMin:0,absoluteMax:.2},so2:{min:0,max:.075,unit:"ppm",icon:"mdi:factory",absoluteMin:0,absoluteMax:.5},heat_index:{min:20,max:27,unit:"°C",icon:"mdi:sun-thermometer",absoluteMin:0,absoluteMax:60},uv_index:{min:0,max:2,unit:"UV",icon:"mdi:weather-sunny-alert",absoluteMin:0,absoluteMax:11},noise_level:{min:30,max:55,unit:"dB",icon:"mdi:ear-hearing",absoluteMin:0,absoluteMax:120},pressure:{min:1e3,max:1020,unit:"hPa",icon:"mdi:gauge",absoluteMin:950,absoluteMax:1050},illuminance:{min:0,max:1e3,unit:"lx",icon:"mdi:brightness-5",absoluteMin:0,absoluteMax:1e4},wind_speed:{min:0,max:10,unit:"m/s",icon:"mdi:weather-windy",absoluteMin:0,absoluteMax:50},dew_point:{min:10,max:18,unit:"°C",icon:"mdi:thermometer-water",absoluteMin:-10,absoluteMax:40},absolute_humidity:{min:4,max:15,unit:"g/m³",icon:"mdi:water-percent",absoluteMin:0,absoluteMax:30},vpd:{min:.8,max:1.2,unit:"kPa",icon:"mdi:sprout",absoluteMin:0,absoluteMax:3}},$t={excellent:"/local/community/air-quality-card/img/excellent.png",good:"/local/community/air-quality-card/img/good.png",moderate:"/local/community/air-quality-card/img/moderate.png",poor:"/local/community/air-quality-card/img/poor.png",unhealthy:"/local/community/air-quality-card/img/unhealthy.png",hazardous:"/local/community/air-quality-card/img/hazardous.png"};class _t extends at{setConfig(t){if(!t.entities)throw new Error("Entities required");this.config=t}static getConfigElement(){return Promise.resolve(document.createElement("air-quality-card-editor"))}static getStubConfig(){return{type:"custom:air-quality-card",title:"Air Quality",entities:{}}}_getSensorConfig(t){const e=this.config.entities?.[t];if(e)return"string"==typeof e?{entity:e}:e}renderBar(t,e){const i=e.entity;if(!i)return B``;const s=this.hass.states[i];if(!s||"unavailable"===s.state)return B``;const n=s.state,o=Number(n),r=(Math.round(100*(o+Number.EPSILON))/100).toFixed(2),a=yt[t]||{min:0,max:100,absoluteMin:0,absoluteMax:100,unit:"",icon:"mdi:help"},l=e.name||s.attributes.friendly_name||t.toUpperCase(),c=e.icon||a.icon,h=e.min??a.min,d=e.max??a.max,p=e.min??a.absoluteMin,u=e.max??a.absoluteMax,m=a.unit,g=`${l} — healthy: ${h}–${d} ${m}`,f=Math.max(0,Math.min(100,(o-p)/(u-p)*100)),b=e.hidden?"low-priority-sensor":"";return B`
      <div
        class="bar-container ${b}"
        @click=${()=>mt(this,"hass-more-info",{entityId:i})}
        style="cursor: pointer;"
        title="${g}"
      >
        <ha-icon class="icon" icon="${c}"></ha-icon>
        <div class="bar-wrapper">
          <div class="value-above">${r} ${m}</div>
          <div class="bar">
            <div class="gradient"></div>
            <div class="mask" style="left: ${f}%; right: 0;"></div>
          </div>
          <div class="tooltip">${g}</div>
        </div>
      </div>
    `}isValueHealthy(t,e,i){return t>=e&&t<=i}render(){const{title:t,entities:e}=this.config,i=Object.keys(e).filter(t=>"rating"!==t),s=i.filter(t=>yt[t]&&this._getSensorConfig(t)?.entity).map(t=>this.renderBar(t,this._getSensorConfig(t))),n=(i.filter(t=>yt[t]).every(t=>{const e=this._getSensorConfig(t);if(!e||!e.entity)return!0;const i=this.hass.states[e.entity];if(!i||"unavailable"===i.state)return!1;const s=parseFloat(i.state),n=e.min??yt[t].min,o=e.max??yt[t].max;return this.isValueHealthy(s,n,o)}),this._getSensorConfig("rating")),o=n?.entity;let r="",a="moderate";if(o&&this.hass.states[o]){r=this.hass.states[o].state??"";const t=r.toLowerCase().trim();t&&$t.hasOwnProperty(t)?a=t:console.warn(`[AirQualityCard] Unknown air quality rating: "${r}" — defaulting to "moderate"`)}return B`
      <ha-card
        style="width: ${this.config.width||"100%"}; height: ${this.config.height||"auto"};"
      >
        <div class="card-wrapper">
          <img 
            class="badge" 
            src="/hacsfiles/air-quality-card/img/${a}.png" 
            alt="${r}" 
            @error=${t=>{const e=t.target,i=`https://raw.githubusercontent.com/wanball/air-quality-card/main/img/${a}.png`;e.src!==i&&(e.src=i)}}
          />
          <div class="header">
            <div class="title">
              ${t?`${t} - ${r}`:r}
            </div>
          </div>
          <div class="attributes">${s}</div>
        </div>
        ${this.config.recommendation&&this.hass.states[this.config.recommendation]?B`
              <div class="recommendation-text">
                ${this.hass.states[this.config.recommendation].state}
              </div>
            `:""}
      </ha-card>
    `}}_t.styles=o`
    .card-wrapper {
      position: relative;
    }
    .badge {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      position: absolute;
      top: -45px;
      left: -15px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
      border: 3px solid var(--card-background-color);
    }
    ha-card {
      padding: 15px;
      overflow: visible;
      max-width: 100%;
      box-sizing: border-box;
      /* กำหนดให้ ha-card เป็นคอนเทนเนอร์หลักในการเช็คความกว้าง */
      container-type: inline-size;
    }
    .recommendation-text {
      margin-top: 16px;
      font-size: 14px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color);
      padding: 10px;
      border-radius: 8px;
      line-height: 1.4;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .title {
      margin-left: 70px;
      font-weight: bold;
    }
    .attributes {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 12px;
      width: 100%;
    }
    .bar-container {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;
    }
    .icon {
      margin-right: 8px;
      font-size: 24px;
    }
    .bar {
      flex-grow: 1;
      height: 10px;
      border-radius: 3px;
      background: var(--primary-background-color);
      position: relative;
      overflow: hidden;
    }
    .value-above {
      text-align: right;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 6px;
      padding-right: 2px;
    }

    .gradient {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        to right,
        #1e8449 0%,
        #27ae60 25%,
        #2ecc71 50%,
        #f1c40f 60%,
        #e67e22 75%,
        #c0392b 90%,
        #922b21 100%
      );
      z-index: 1;
    }

    .mask {
      position: absolute;
      top: 0;
      bottom: 0;
      background: var(--primary-background-color);
      z-index: 2;
      right: 0;
    }

    .bar-wrapper {
      position: relative;
      flex-grow: 1;
    }

    .tooltip {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%) translateY(-8px);
      background: #555;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
      z-index: 10;
    }

    .bar-wrapper:hover .tooltip {
      visibility: visible;
      opacity: 1;
    }
    /* === เงื่อนไขพิเศษซ่อนเซ็นเซอร์เมื่ออยู่ในช่วงความกว้างที่ต้องการ === */
    @media (min-width: 768px) {
      @container (min-width: 250px) and (max-width: 380px) {
        .low-priority-sensor {
          display: none !important;
        }
      }
    }
  `,bt([dt({attribute:!1})],_t.prototype,"hass",void 0),bt([dt()],_t.prototype,"config",void 0),customElements.get("air-quality-card")||customElements.define("air-quality-card",_t),window.customCards=window.customCards||[],window.customCards.push({type:"air-quality-card",name:"Air Quality Card",description:"Displays air quality sensors with healthy ranges and gradients.",preview:!0}),console.info("🧪 Registering card..."),customElements.whenDefined("air-quality-card").then(()=>{console.info("✅ air-quality-card is defined and ready.")}),customElements.get("air-quality-card")?console.info("✅ air-quality-card already defined"):(console.warn("🚨 air-quality-card not defined yet, defining now..."),customElements.define("air-quality-card",_t))})();