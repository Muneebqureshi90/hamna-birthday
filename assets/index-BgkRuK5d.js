(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=n(o);fetch(o.href,i)}})();function Rc(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ks={exports:{}},fo={},js={exports:{}},B={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var er=Symbol.for("react.element"),Oc=Symbol.for("react.portal"),Ic=Symbol.for("react.fragment"),Wc=Symbol.for("react.strict_mode"),$c=Symbol.for("react.profiler"),Hc=Symbol.for("react.provider"),Uc=Symbol.for("react.context"),Vc=Symbol.for("react.forward_ref"),Gc=Symbol.for("react.suspense"),Qc=Symbol.for("react.memo"),Yc=Symbol.for("react.lazy"),ra=Symbol.iterator;function Kc(e){return e===null||typeof e!="object"?null:(e=ra&&e[ra]||e["@@iterator"],typeof e=="function"?e:null)}var Es={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Cs=Object.assign,Fs={};function cn(e,t,n){this.props=e,this.context=t,this.refs=Fs,this.updater=n||Es}cn.prototype.isReactComponent={};cn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};cn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Ss(){}Ss.prototype=cn.prototype;function rl(e,t,n){this.props=e,this.context=t,this.refs=Fs,this.updater=n||Es}var ol=rl.prototype=new Ss;ol.constructor=rl;Cs(ol,cn.prototype);ol.isPureReactComponent=!0;var oa=Array.isArray,bs=Object.prototype.hasOwnProperty,il={current:null},Ns={key:!0,ref:!0,__self:!0,__source:!0};function _s(e,t,n){var r,o={},i=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(i=""+t.key),t)bs.call(t,r)&&!Ns.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var u=Array(s),f=0;f<s;f++)u[f]=arguments[f+2];o.children=u}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:er,type:e,key:i,ref:a,props:o,_owner:il.current}}function Xc(e,t){return{$$typeof:er,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ll(e){return typeof e=="object"&&e!==null&&e.$$typeof===er}function Zc(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var ia=/\/+/g;function Po(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Zc(""+e.key):t.toString(36)}function Nr(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case er:case Oc:a=!0}}if(a)return a=e,o=o(a),e=r===""?"."+Po(a,0):r,oa(o)?(n="",e!=null&&(n=e.replace(ia,"$&/")+"/"),Nr(o,t,n,"",function(f){return f})):o!=null&&(ll(o)&&(o=Xc(o,n+(!o.key||a&&a.key===o.key?"":(""+o.key).replace(ia,"$&/")+"/")+e)),t.push(o)),1;if(a=0,r=r===""?".":r+":",oa(e))for(var s=0;s<e.length;s++){i=e[s];var u=r+Po(i,s);a+=Nr(i,t,n,u,o)}else if(u=Kc(e),typeof u=="function")for(e=u.call(e),s=0;!(i=e.next()).done;)i=i.value,u=r+Po(i,s++),a+=Nr(i,t,n,u,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function ar(e,t,n){if(e==null)return e;var r=[],o=0;return Nr(e,r,"","",function(i){return t.call(n,i,o++)}),r}function qc(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var se={current:null},_r={transition:null},Jc={ReactCurrentDispatcher:se,ReactCurrentBatchConfig:_r,ReactCurrentOwner:il};function Ms(){throw Error("act(...) is not supported in production builds of React.")}B.Children={map:ar,forEach:function(e,t,n){ar(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ar(e,function(){t++}),t},toArray:function(e){return ar(e,function(t){return t})||[]},only:function(e){if(!ll(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};B.Component=cn;B.Fragment=Ic;B.Profiler=$c;B.PureComponent=rl;B.StrictMode=Wc;B.Suspense=Gc;B.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Jc;B.act=Ms;B.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Cs({},e.props),o=e.key,i=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,a=il.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(u in t)bs.call(t,u)&&!Ns.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&s!==void 0?s[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){s=Array(u);for(var f=0;f<u;f++)s[f]=arguments[f+2];r.children=s}return{$$typeof:er,type:e.type,key:o,ref:i,props:r,_owner:a}};B.createContext=function(e){return e={$$typeof:Uc,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Hc,_context:e},e.Consumer=e};B.createElement=_s;B.createFactory=function(e){var t=_s.bind(null,e);return t.type=e,t};B.createRef=function(){return{current:null}};B.forwardRef=function(e){return{$$typeof:Vc,render:e}};B.isValidElement=ll;B.lazy=function(e){return{$$typeof:Yc,_payload:{_status:-1,_result:e},_init:qc}};B.memo=function(e,t){return{$$typeof:Qc,type:e,compare:t===void 0?null:t}};B.startTransition=function(e){var t=_r.transition;_r.transition={};try{e()}finally{_r.transition=t}};B.unstable_act=Ms;B.useCallback=function(e,t){return se.current.useCallback(e,t)};B.useContext=function(e){return se.current.useContext(e)};B.useDebugValue=function(){};B.useDeferredValue=function(e){return se.current.useDeferredValue(e)};B.useEffect=function(e,t){return se.current.useEffect(e,t)};B.useId=function(){return se.current.useId()};B.useImperativeHandle=function(e,t,n){return se.current.useImperativeHandle(e,t,n)};B.useInsertionEffect=function(e,t){return se.current.useInsertionEffect(e,t)};B.useLayoutEffect=function(e,t){return se.current.useLayoutEffect(e,t)};B.useMemo=function(e,t){return se.current.useMemo(e,t)};B.useReducer=function(e,t,n){return se.current.useReducer(e,t,n)};B.useRef=function(e){return se.current.useRef(e)};B.useState=function(e){return se.current.useState(e)};B.useSyncExternalStore=function(e,t,n){return se.current.useSyncExternalStore(e,t,n)};B.useTransition=function(){return se.current.useTransition()};B.version="18.3.1";js.exports=B;var S=js.exports;const ed=Rc(S);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var td=S,nd=Symbol.for("react.element"),rd=Symbol.for("react.fragment"),od=Object.prototype.hasOwnProperty,id=td.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ld={key:!0,ref:!0,__self:!0,__source:!0};function zs(e,t,n){var r,o={},i=null,a=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)od.call(t,r)&&!ld.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:nd,type:e,key:i,ref:a,props:o,_owner:id.current}}fo.Fragment=rd;fo.jsx=zs;fo.jsxs=zs;ks.exports=fo;var l=ks.exports,As={exports:{}},ke={},Ls={exports:{}},Bs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(_,z){var L=_.length;_.push(z);e:for(;0<L;){var V=L-1>>>1,X=_[V];if(0<o(X,z))_[V]=z,_[L]=X,L=V;else break e}}function n(_){return _.length===0?null:_[0]}function r(_){if(_.length===0)return null;var z=_[0],L=_.pop();if(L!==z){_[0]=L;e:for(var V=0,X=_.length,ir=X>>>1;V<ir;){var vt=2*(V+1)-1,Bo=_[vt],xt=vt+1,lr=_[xt];if(0>o(Bo,L))xt<X&&0>o(lr,Bo)?(_[V]=lr,_[xt]=L,V=xt):(_[V]=Bo,_[vt]=L,V=vt);else if(xt<X&&0>o(lr,L))_[V]=lr,_[xt]=L,V=xt;else break e}}return z}function o(_,z){var L=_.sortIndex-z.sortIndex;return L!==0?L:_.id-z.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,s=a.now();e.unstable_now=function(){return a.now()-s}}var u=[],f=[],p=1,m=null,g=3,k=!1,v=!1,j=!1,x=typeof setTimeout=="function"?setTimeout:null,d=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(_){for(var z=n(f);z!==null;){if(z.callback===null)r(f);else if(z.startTime<=_)r(f),z.sortIndex=z.expirationTime,t(u,z);else break;z=n(f)}}function y(_){if(j=!1,h(_),!v)if(n(u)!==null)v=!0,Ao(w);else{var z=n(f);z!==null&&Lo(y,z.startTime-_)}}function w(_,z){v=!1,j&&(j=!1,d(F),F=-1),k=!0;var L=g;try{for(h(z),m=n(u);m!==null&&(!(m.expirationTime>z)||_&&!ce());){var V=m.callback;if(typeof V=="function"){m.callback=null,g=m.priorityLevel;var X=V(m.expirationTime<=z);z=e.unstable_now(),typeof X=="function"?m.callback=X:m===n(u)&&r(u),h(z)}else r(u);m=n(u)}if(m!==null)var ir=!0;else{var vt=n(f);vt!==null&&Lo(y,vt.startTime-z),ir=!1}return ir}finally{m=null,g=L,k=!1}}var E=!1,b=null,F=-1,A=5,M=-1;function ce(){return!(e.unstable_now()-M<A)}function pn(){if(b!==null){var _=e.unstable_now();M=_;var z=!0;try{z=b(!0,_)}finally{z?mn():(E=!1,b=null)}}else E=!1}var mn;if(typeof c=="function")mn=function(){c(pn)};else if(typeof MessageChannel<"u"){var na=new MessageChannel,Dc=na.port2;na.port1.onmessage=pn,mn=function(){Dc.postMessage(null)}}else mn=function(){x(pn,0)};function Ao(_){b=_,E||(E=!0,mn())}function Lo(_,z){F=x(function(){_(e.unstable_now())},z)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(_){_.callback=null},e.unstable_continueExecution=function(){v||k||(v=!0,Ao(w))},e.unstable_forceFrameRate=function(_){0>_||125<_?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<_?Math.floor(1e3/_):5},e.unstable_getCurrentPriorityLevel=function(){return g},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(_){switch(g){case 1:case 2:case 3:var z=3;break;default:z=g}var L=g;g=z;try{return _()}finally{g=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(_,z){switch(_){case 1:case 2:case 3:case 4:case 5:break;default:_=3}var L=g;g=_;try{return z()}finally{g=L}},e.unstable_scheduleCallback=function(_,z,L){var V=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?V+L:V):L=V,_){case 1:var X=-1;break;case 2:X=250;break;case 5:X=1073741823;break;case 4:X=1e4;break;default:X=5e3}return X=L+X,_={id:p++,callback:z,priorityLevel:_,startTime:L,expirationTime:X,sortIndex:-1},L>V?(_.sortIndex=L,t(f,_),n(u)===null&&_===n(f)&&(j?(d(F),F=-1):j=!0,Lo(y,L-V))):(_.sortIndex=X,t(u,_),v||k||(v=!0,Ao(w))),_},e.unstable_shouldYield=ce,e.unstable_wrapCallback=function(_){var z=g;return function(){var L=g;g=z;try{return _.apply(this,arguments)}finally{g=L}}}})(Bs);Ls.exports=Bs;var ad=Ls.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sd=S,we=ad;function C(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Ps=new Set,Dn={};function Lt(e,t){nn(e,t),nn(e+"Capture",t)}function nn(e,t){for(Dn[e]=t,e=0;e<t.length;e++)Ps.add(t[e])}var Ge=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ci=Object.prototype.hasOwnProperty,ud=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la={},aa={};function cd(e){return ci.call(aa,e)?!0:ci.call(la,e)?!1:ud.test(e)?aa[e]=!0:(la[e]=!0,!1)}function dd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function fd(e,t,n,r){if(t===null||typeof t>"u"||dd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ue(e,t,n,r,o,i,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}var te={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){te[e]=new ue(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];te[t]=new ue(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){te[e]=new ue(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){te[e]=new ue(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){te[e]=new ue(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){te[e]=new ue(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){te[e]=new ue(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){te[e]=new ue(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){te[e]=new ue(e,5,!1,e.toLowerCase(),null,!1,!1)});var al=/[\-:]([a-z])/g;function sl(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(al,sl);te[t]=new ue(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(al,sl);te[t]=new ue(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(al,sl);te[t]=new ue(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!1,!1)});te.xlinkHref=new ue("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){te[e]=new ue(e,1,!1,e.toLowerCase(),null,!0,!0)});function ul(e,t,n,r){var o=te.hasOwnProperty(t)?te[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(fd(t,n,o,r)&&(n=null),r||o===null?cd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Ze=sd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sr=Symbol.for("react.element"),Rt=Symbol.for("react.portal"),Ot=Symbol.for("react.fragment"),cl=Symbol.for("react.strict_mode"),di=Symbol.for("react.profiler"),Ts=Symbol.for("react.provider"),Ds=Symbol.for("react.context"),dl=Symbol.for("react.forward_ref"),fi=Symbol.for("react.suspense"),hi=Symbol.for("react.suspense_list"),fl=Symbol.for("react.memo"),Je=Symbol.for("react.lazy"),Rs=Symbol.for("react.offscreen"),sa=Symbol.iterator;function gn(e){return e===null||typeof e!="object"?null:(e=sa&&e[sa]||e["@@iterator"],typeof e=="function"?e:null)}var H=Object.assign,To;function Cn(e){if(To===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);To=t&&t[1]||""}return`
`+To+e}var Do=!1;function Ro(e,t){if(!e||Do)return"";Do=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(f){var r=f}Reflect.construct(e,[],t)}else{try{t.call()}catch(f){r=f}e.call(t.prototype)}else{try{throw Error()}catch(f){r=f}e()}}catch(f){if(f&&r&&typeof f.stack=="string"){for(var o=f.stack.split(`
`),i=r.stack.split(`
`),a=o.length-1,s=i.length-1;1<=a&&0<=s&&o[a]!==i[s];)s--;for(;1<=a&&0<=s;a--,s--)if(o[a]!==i[s]){if(a!==1||s!==1)do if(a--,s--,0>s||o[a]!==i[s]){var u=`
`+o[a].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=a&&0<=s);break}}}finally{Do=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Cn(e):""}function hd(e){switch(e.tag){case 5:return Cn(e.type);case 16:return Cn("Lazy");case 13:return Cn("Suspense");case 19:return Cn("SuspenseList");case 0:case 2:case 15:return e=Ro(e.type,!1),e;case 11:return e=Ro(e.type.render,!1),e;case 1:return e=Ro(e.type,!0),e;default:return""}}function pi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Ot:return"Fragment";case Rt:return"Portal";case di:return"Profiler";case cl:return"StrictMode";case fi:return"Suspense";case hi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ds:return(e.displayName||"Context")+".Consumer";case Ts:return(e._context.displayName||"Context")+".Provider";case dl:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case fl:return t=e.displayName||null,t!==null?t:pi(e.type)||"Memo";case Je:t=e._payload,e=e._init;try{return pi(e(t))}catch{}}return null}function pd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return pi(t);case 8:return t===cl?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Os(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function md(e){var t=Os(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(a){r=""+a,i.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function ur(e){e._valueTracker||(e._valueTracker=md(e))}function Is(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Os(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ir(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function mi(e,t){var n=t.checked;return H({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function ua(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ws(e,t){t=t.checked,t!=null&&ul(e,"checked",t,!1)}function gi(e,t){Ws(e,t);var n=ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?yi(e,t.type,n):t.hasOwnProperty("defaultValue")&&yi(e,t.type,ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function ca(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function yi(e,t,n){(t!=="number"||Ir(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Fn=Array.isArray;function Xt(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ht(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function vi(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(C(91));return H({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function da(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(C(92));if(Fn(n)){if(1<n.length)throw Error(C(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ht(n)}}function $s(e,t){var n=ht(t.value),r=ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function fa(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Hs(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function xi(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Hs(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,Us=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Rn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Nn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},gd=["Webkit","ms","Moz","O"];Object.keys(Nn).forEach(function(e){gd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Nn[t]=Nn[e]})});function Vs(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Nn.hasOwnProperty(e)&&Nn[e]?(""+t).trim():t+"px"}function Gs(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Vs(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var yd=H({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function wi(e,t){if(t){if(yd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(C(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(C(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(C(61))}if(t.style!=null&&typeof t.style!="object")throw Error(C(62))}}function ki(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ji=null;function hl(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ei=null,Zt=null,qt=null;function ha(e){if(e=rr(e)){if(typeof Ei!="function")throw Error(C(280));var t=e.stateNode;t&&(t=yo(t),Ei(e.stateNode,e.type,t))}}function Qs(e){Zt?qt?qt.push(e):qt=[e]:Zt=e}function Ys(){if(Zt){var e=Zt,t=qt;if(qt=Zt=null,ha(e),t)for(e=0;e<t.length;e++)ha(t[e])}}function Ks(e,t){return e(t)}function Xs(){}var Oo=!1;function Zs(e,t,n){if(Oo)return e(t,n);Oo=!0;try{return Ks(e,t,n)}finally{Oo=!1,(Zt!==null||qt!==null)&&(Xs(),Ys())}}function On(e,t){var n=e.stateNode;if(n===null)return null;var r=yo(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(C(231,t,typeof n));return n}var Ci=!1;if(Ge)try{var yn={};Object.defineProperty(yn,"passive",{get:function(){Ci=!0}}),window.addEventListener("test",yn,yn),window.removeEventListener("test",yn,yn)}catch{Ci=!1}function vd(e,t,n,r,o,i,a,s,u){var f=Array.prototype.slice.call(arguments,3);try{t.apply(n,f)}catch(p){this.onError(p)}}var _n=!1,Wr=null,$r=!1,Fi=null,xd={onError:function(e){_n=!0,Wr=e}};function wd(e,t,n,r,o,i,a,s,u){_n=!1,Wr=null,vd.apply(xd,arguments)}function kd(e,t,n,r,o,i,a,s,u){if(wd.apply(this,arguments),_n){if(_n){var f=Wr;_n=!1,Wr=null}else throw Error(C(198));$r||($r=!0,Fi=f)}}function Bt(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function qs(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function pa(e){if(Bt(e)!==e)throw Error(C(188))}function jd(e){var t=e.alternate;if(!t){if(t=Bt(e),t===null)throw Error(C(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return pa(o),e;if(i===r)return pa(o),t;i=i.sibling}throw Error(C(188))}if(n.return!==r.return)n=o,r=i;else{for(var a=!1,s=o.child;s;){if(s===n){a=!0,n=o,r=i;break}if(s===r){a=!0,r=o,n=i;break}s=s.sibling}if(!a){for(s=i.child;s;){if(s===n){a=!0,n=i,r=o;break}if(s===r){a=!0,r=i,n=o;break}s=s.sibling}if(!a)throw Error(C(189))}}if(n.alternate!==r)throw Error(C(190))}if(n.tag!==3)throw Error(C(188));return n.stateNode.current===n?e:t}function Js(e){return e=jd(e),e!==null?eu(e):null}function eu(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=eu(e);if(t!==null)return t;e=e.sibling}return null}var tu=we.unstable_scheduleCallback,ma=we.unstable_cancelCallback,Ed=we.unstable_shouldYield,Cd=we.unstable_requestPaint,G=we.unstable_now,Fd=we.unstable_getCurrentPriorityLevel,pl=we.unstable_ImmediatePriority,nu=we.unstable_UserBlockingPriority,Hr=we.unstable_NormalPriority,Sd=we.unstable_LowPriority,ru=we.unstable_IdlePriority,ho=null,Oe=null;function bd(e){if(Oe&&typeof Oe.onCommitFiberRoot=="function")try{Oe.onCommitFiberRoot(ho,e,void 0,(e.current.flags&128)===128)}catch{}}var Le=Math.clz32?Math.clz32:Md,Nd=Math.log,_d=Math.LN2;function Md(e){return e>>>=0,e===0?32:31-(Nd(e)/_d|0)|0}var dr=64,fr=4194304;function Sn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Ur(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,a=n&268435455;if(a!==0){var s=a&~o;s!==0?r=Sn(s):(i&=a,i!==0&&(r=Sn(i)))}else a=n&~o,a!==0?r=Sn(a):i!==0&&(r=Sn(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Le(t),o=1<<n,r|=e[n],t&=~o;return r}function zd(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Ad(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Le(i),s=1<<a,u=o[a];u===-1?(!(s&n)||s&r)&&(o[a]=zd(s,t)):u<=t&&(e.expiredLanes|=s),i&=~s}}function Si(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ou(){var e=dr;return dr<<=1,!(dr&4194240)&&(dr=64),e}function Io(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function tr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Le(t),e[t]=n}function Ld(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-Le(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function ml(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Le(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var T=0;function iu(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var lu,gl,au,su,uu,bi=!1,hr=[],it=null,lt=null,at=null,In=new Map,Wn=new Map,tt=[],Bd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ga(e,t){switch(e){case"focusin":case"focusout":it=null;break;case"dragenter":case"dragleave":lt=null;break;case"mouseover":case"mouseout":at=null;break;case"pointerover":case"pointerout":In.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Wn.delete(t.pointerId)}}function vn(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=rr(t),t!==null&&gl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function Pd(e,t,n,r,o){switch(t){case"focusin":return it=vn(it,e,t,n,r,o),!0;case"dragenter":return lt=vn(lt,e,t,n,r,o),!0;case"mouseover":return at=vn(at,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return In.set(i,vn(In.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,Wn.set(i,vn(Wn.get(i)||null,e,t,n,r,o)),!0}return!1}function cu(e){var t=jt(e.target);if(t!==null){var n=Bt(t);if(n!==null){if(t=n.tag,t===13){if(t=qs(n),t!==null){e.blockedOn=t,uu(e.priority,function(){au(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Mr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ni(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ji=r,n.target.dispatchEvent(r),ji=null}else return t=rr(n),t!==null&&gl(t),e.blockedOn=n,!1;t.shift()}return!0}function ya(e,t,n){Mr(e)&&n.delete(t)}function Td(){bi=!1,it!==null&&Mr(it)&&(it=null),lt!==null&&Mr(lt)&&(lt=null),at!==null&&Mr(at)&&(at=null),In.forEach(ya),Wn.forEach(ya)}function xn(e,t){e.blockedOn===t&&(e.blockedOn=null,bi||(bi=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,Td)))}function $n(e){function t(o){return xn(o,e)}if(0<hr.length){xn(hr[0],e);for(var n=1;n<hr.length;n++){var r=hr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(it!==null&&xn(it,e),lt!==null&&xn(lt,e),at!==null&&xn(at,e),In.forEach(t),Wn.forEach(t),n=0;n<tt.length;n++)r=tt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<tt.length&&(n=tt[0],n.blockedOn===null);)cu(n),n.blockedOn===null&&tt.shift()}var Jt=Ze.ReactCurrentBatchConfig,Vr=!0;function Dd(e,t,n,r){var o=T,i=Jt.transition;Jt.transition=null;try{T=1,yl(e,t,n,r)}finally{T=o,Jt.transition=i}}function Rd(e,t,n,r){var o=T,i=Jt.transition;Jt.transition=null;try{T=4,yl(e,t,n,r)}finally{T=o,Jt.transition=i}}function yl(e,t,n,r){if(Vr){var o=Ni(e,t,n,r);if(o===null)Xo(e,t,r,Gr,n),ga(e,r);else if(Pd(o,e,t,n,r))r.stopPropagation();else if(ga(e,r),t&4&&-1<Bd.indexOf(e)){for(;o!==null;){var i=rr(o);if(i!==null&&lu(i),i=Ni(e,t,n,r),i===null&&Xo(e,t,r,Gr,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else Xo(e,t,r,null,n)}}var Gr=null;function Ni(e,t,n,r){if(Gr=null,e=hl(r),e=jt(e),e!==null)if(t=Bt(e),t===null)e=null;else if(n=t.tag,n===13){if(e=qs(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Gr=e,null}function du(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Fd()){case pl:return 1;case nu:return 4;case Hr:case Sd:return 16;case ru:return 536870912;default:return 16}default:return 16}}var rt=null,vl=null,zr=null;function fu(){if(zr)return zr;var e,t=vl,n=t.length,r,o="value"in rt?rt.value:rt.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===o[i-r];r++);return zr=o.slice(e,1<r?1-r:void 0)}function Ar(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function pr(){return!0}function va(){return!1}function je(e){function t(n,r,o,i,a){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?pr:va,this.isPropagationStopped=va,this}return H(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=pr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=pr)},persist:function(){},isPersistent:pr}),t}var dn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},xl=je(dn),nr=H({},dn,{view:0,detail:0}),Od=je(nr),Wo,$o,wn,po=H({},nr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wn&&(wn&&e.type==="mousemove"?(Wo=e.screenX-wn.screenX,$o=e.screenY-wn.screenY):$o=Wo=0,wn=e),Wo)},movementY:function(e){return"movementY"in e?e.movementY:$o}}),xa=je(po),Id=H({},po,{dataTransfer:0}),Wd=je(Id),$d=H({},nr,{relatedTarget:0}),Ho=je($d),Hd=H({},dn,{animationName:0,elapsedTime:0,pseudoElement:0}),Ud=je(Hd),Vd=H({},dn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Gd=je(Vd),Qd=H({},dn,{data:0}),wa=je(Qd),Yd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Kd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Xd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Zd(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Xd[e])?!!t[e]:!1}function wl(){return Zd}var qd=H({},nr,{key:function(e){if(e.key){var t=Yd[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Ar(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Kd[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wl,charCode:function(e){return e.type==="keypress"?Ar(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Ar(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Jd=je(qd),ef=H({},po,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ka=je(ef),tf=H({},nr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wl}),nf=je(tf),rf=H({},dn,{propertyName:0,elapsedTime:0,pseudoElement:0}),of=je(rf),lf=H({},po,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),af=je(lf),sf=[9,13,27,32],kl=Ge&&"CompositionEvent"in window,Mn=null;Ge&&"documentMode"in document&&(Mn=document.documentMode);var uf=Ge&&"TextEvent"in window&&!Mn,hu=Ge&&(!kl||Mn&&8<Mn&&11>=Mn),ja=" ",Ea=!1;function pu(e,t){switch(e){case"keyup":return sf.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function mu(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var It=!1;function cf(e,t){switch(e){case"compositionend":return mu(t);case"keypress":return t.which!==32?null:(Ea=!0,ja);case"textInput":return e=t.data,e===ja&&Ea?null:e;default:return null}}function df(e,t){if(It)return e==="compositionend"||!kl&&pu(e,t)?(e=fu(),zr=vl=rt=null,It=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return hu&&t.locale!=="ko"?null:t.data;default:return null}}var ff={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ca(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!ff[e.type]:t==="textarea"}function gu(e,t,n,r){Qs(r),t=Qr(t,"onChange"),0<t.length&&(n=new xl("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var zn=null,Hn=null;function hf(e){bu(e,0)}function mo(e){var t=Ht(e);if(Is(t))return e}function pf(e,t){if(e==="change")return t}var yu=!1;if(Ge){var Uo;if(Ge){var Vo="oninput"in document;if(!Vo){var Fa=document.createElement("div");Fa.setAttribute("oninput","return;"),Vo=typeof Fa.oninput=="function"}Uo=Vo}else Uo=!1;yu=Uo&&(!document.documentMode||9<document.documentMode)}function Sa(){zn&&(zn.detachEvent("onpropertychange",vu),Hn=zn=null)}function vu(e){if(e.propertyName==="value"&&mo(Hn)){var t=[];gu(t,Hn,e,hl(e)),Zs(hf,t)}}function mf(e,t,n){e==="focusin"?(Sa(),zn=t,Hn=n,zn.attachEvent("onpropertychange",vu)):e==="focusout"&&Sa()}function gf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return mo(Hn)}function yf(e,t){if(e==="click")return mo(t)}function vf(e,t){if(e==="input"||e==="change")return mo(t)}function xf(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Pe=typeof Object.is=="function"?Object.is:xf;function Un(e,t){if(Pe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!ci.call(t,o)||!Pe(e[o],t[o]))return!1}return!0}function ba(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Na(e,t){var n=ba(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=ba(n)}}function xu(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?xu(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function wu(){for(var e=window,t=Ir();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ir(e.document)}return t}function jl(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function wf(e){var t=wu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&xu(n.ownerDocument.documentElement,n)){if(r!==null&&jl(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=Na(n,i);var a=Na(n,r);o&&a&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var kf=Ge&&"documentMode"in document&&11>=document.documentMode,Wt=null,_i=null,An=null,Mi=!1;function _a(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Mi||Wt==null||Wt!==Ir(r)||(r=Wt,"selectionStart"in r&&jl(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),An&&Un(An,r)||(An=r,r=Qr(_i,"onSelect"),0<r.length&&(t=new xl("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Wt)))}function mr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var $t={animationend:mr("Animation","AnimationEnd"),animationiteration:mr("Animation","AnimationIteration"),animationstart:mr("Animation","AnimationStart"),transitionend:mr("Transition","TransitionEnd")},Go={},ku={};Ge&&(ku=document.createElement("div").style,"AnimationEvent"in window||(delete $t.animationend.animation,delete $t.animationiteration.animation,delete $t.animationstart.animation),"TransitionEvent"in window||delete $t.transitionend.transition);function go(e){if(Go[e])return Go[e];if(!$t[e])return e;var t=$t[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ku)return Go[e]=t[n];return e}var ju=go("animationend"),Eu=go("animationiteration"),Cu=go("animationstart"),Fu=go("transitionend"),Su=new Map,Ma="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function mt(e,t){Su.set(e,t),Lt(t,[e])}for(var Qo=0;Qo<Ma.length;Qo++){var Yo=Ma[Qo],jf=Yo.toLowerCase(),Ef=Yo[0].toUpperCase()+Yo.slice(1);mt(jf,"on"+Ef)}mt(ju,"onAnimationEnd");mt(Eu,"onAnimationIteration");mt(Cu,"onAnimationStart");mt("dblclick","onDoubleClick");mt("focusin","onFocus");mt("focusout","onBlur");mt(Fu,"onTransitionEnd");nn("onMouseEnter",["mouseout","mouseover"]);nn("onMouseLeave",["mouseout","mouseover"]);nn("onPointerEnter",["pointerout","pointerover"]);nn("onPointerLeave",["pointerout","pointerover"]);Lt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Lt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Lt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Lt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Lt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Lt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Cf=new Set("cancel close invalid load scroll toggle".split(" ").concat(bn));function za(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,kd(r,t,void 0,e),e.currentTarget=null}function bu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var a=r.length-1;0<=a;a--){var s=r[a],u=s.instance,f=s.currentTarget;if(s=s.listener,u!==i&&o.isPropagationStopped())break e;za(o,s,f),i=u}else for(a=0;a<r.length;a++){if(s=r[a],u=s.instance,f=s.currentTarget,s=s.listener,u!==i&&o.isPropagationStopped())break e;za(o,s,f),i=u}}}if($r)throw e=Fi,$r=!1,Fi=null,e}function R(e,t){var n=t[Pi];n===void 0&&(n=t[Pi]=new Set);var r=e+"__bubble";n.has(r)||(Nu(t,e,2,!1),n.add(r))}function Ko(e,t,n){var r=0;t&&(r|=4),Nu(n,e,r,t)}var gr="_reactListening"+Math.random().toString(36).slice(2);function Vn(e){if(!e[gr]){e[gr]=!0,Ps.forEach(function(n){n!=="selectionchange"&&(Cf.has(n)||Ko(n,!1,e),Ko(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[gr]||(t[gr]=!0,Ko("selectionchange",!1,t))}}function Nu(e,t,n,r){switch(du(t)){case 1:var o=Dd;break;case 4:o=Rd;break;default:o=yl}n=o.bind(null,t,n,e),o=void 0,!Ci||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function Xo(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===o||u.nodeType===8&&u.parentNode===o))return;a=a.return}for(;s!==null;){if(a=jt(s),a===null)return;if(u=a.tag,u===5||u===6){r=i=a;continue e}s=s.parentNode}}r=r.return}Zs(function(){var f=i,p=hl(n),m=[];e:{var g=Su.get(e);if(g!==void 0){var k=xl,v=e;switch(e){case"keypress":if(Ar(n)===0)break e;case"keydown":case"keyup":k=Jd;break;case"focusin":v="focus",k=Ho;break;case"focusout":v="blur",k=Ho;break;case"beforeblur":case"afterblur":k=Ho;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":k=xa;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":k=Wd;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":k=nf;break;case ju:case Eu:case Cu:k=Ud;break;case Fu:k=of;break;case"scroll":k=Od;break;case"wheel":k=af;break;case"copy":case"cut":case"paste":k=Gd;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":k=ka}var j=(t&4)!==0,x=!j&&e==="scroll",d=j?g!==null?g+"Capture":null:g;j=[];for(var c=f,h;c!==null;){h=c;var y=h.stateNode;if(h.tag===5&&y!==null&&(h=y,d!==null&&(y=On(c,d),y!=null&&j.push(Gn(c,y,h)))),x)break;c=c.return}0<j.length&&(g=new k(g,v,null,n,p),m.push({event:g,listeners:j}))}}if(!(t&7)){e:{if(g=e==="mouseover"||e==="pointerover",k=e==="mouseout"||e==="pointerout",g&&n!==ji&&(v=n.relatedTarget||n.fromElement)&&(jt(v)||v[Qe]))break e;if((k||g)&&(g=p.window===p?p:(g=p.ownerDocument)?g.defaultView||g.parentWindow:window,k?(v=n.relatedTarget||n.toElement,k=f,v=v?jt(v):null,v!==null&&(x=Bt(v),v!==x||v.tag!==5&&v.tag!==6)&&(v=null)):(k=null,v=f),k!==v)){if(j=xa,y="onMouseLeave",d="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(j=ka,y="onPointerLeave",d="onPointerEnter",c="pointer"),x=k==null?g:Ht(k),h=v==null?g:Ht(v),g=new j(y,c+"leave",k,n,p),g.target=x,g.relatedTarget=h,y=null,jt(p)===f&&(j=new j(d,c+"enter",v,n,p),j.target=h,j.relatedTarget=x,y=j),x=y,k&&v)t:{for(j=k,d=v,c=0,h=j;h;h=Dt(h))c++;for(h=0,y=d;y;y=Dt(y))h++;for(;0<c-h;)j=Dt(j),c--;for(;0<h-c;)d=Dt(d),h--;for(;c--;){if(j===d||d!==null&&j===d.alternate)break t;j=Dt(j),d=Dt(d)}j=null}else j=null;k!==null&&Aa(m,g,k,j,!1),v!==null&&x!==null&&Aa(m,x,v,j,!0)}}e:{if(g=f?Ht(f):window,k=g.nodeName&&g.nodeName.toLowerCase(),k==="select"||k==="input"&&g.type==="file")var w=pf;else if(Ca(g))if(yu)w=vf;else{w=gf;var E=mf}else(k=g.nodeName)&&k.toLowerCase()==="input"&&(g.type==="checkbox"||g.type==="radio")&&(w=yf);if(w&&(w=w(e,f))){gu(m,w,n,p);break e}E&&E(e,g,f),e==="focusout"&&(E=g._wrapperState)&&E.controlled&&g.type==="number"&&yi(g,"number",g.value)}switch(E=f?Ht(f):window,e){case"focusin":(Ca(E)||E.contentEditable==="true")&&(Wt=E,_i=f,An=null);break;case"focusout":An=_i=Wt=null;break;case"mousedown":Mi=!0;break;case"contextmenu":case"mouseup":case"dragend":Mi=!1,_a(m,n,p);break;case"selectionchange":if(kf)break;case"keydown":case"keyup":_a(m,n,p)}var b;if(kl)e:{switch(e){case"compositionstart":var F="onCompositionStart";break e;case"compositionend":F="onCompositionEnd";break e;case"compositionupdate":F="onCompositionUpdate";break e}F=void 0}else It?pu(e,n)&&(F="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(F="onCompositionStart");F&&(hu&&n.locale!=="ko"&&(It||F!=="onCompositionStart"?F==="onCompositionEnd"&&It&&(b=fu()):(rt=p,vl="value"in rt?rt.value:rt.textContent,It=!0)),E=Qr(f,F),0<E.length&&(F=new wa(F,e,null,n,p),m.push({event:F,listeners:E}),b?F.data=b:(b=mu(n),b!==null&&(F.data=b)))),(b=uf?cf(e,n):df(e,n))&&(f=Qr(f,"onBeforeInput"),0<f.length&&(p=new wa("onBeforeInput","beforeinput",null,n,p),m.push({event:p,listeners:f}),p.data=b))}bu(m,t)})}function Gn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qr(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=On(e,n),i!=null&&r.unshift(Gn(e,i,o)),i=On(e,t),i!=null&&r.push(Gn(e,i,o))),e=e.return}return r}function Dt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Aa(e,t,n,r,o){for(var i=t._reactName,a=[];n!==null&&n!==r;){var s=n,u=s.alternate,f=s.stateNode;if(u!==null&&u===r)break;s.tag===5&&f!==null&&(s=f,o?(u=On(n,i),u!=null&&a.unshift(Gn(n,u,s))):o||(u=On(n,i),u!=null&&a.push(Gn(n,u,s)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var Ff=/\r\n?/g,Sf=/\u0000|\uFFFD/g;function La(e){return(typeof e=="string"?e:""+e).replace(Ff,`
`).replace(Sf,"")}function yr(e,t,n){if(t=La(t),La(e)!==t&&n)throw Error(C(425))}function Yr(){}var zi=null,Ai=null;function Li(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Bi=typeof setTimeout=="function"?setTimeout:void 0,bf=typeof clearTimeout=="function"?clearTimeout:void 0,Ba=typeof Promise=="function"?Promise:void 0,Nf=typeof queueMicrotask=="function"?queueMicrotask:typeof Ba<"u"?function(e){return Ba.resolve(null).then(e).catch(_f)}:Bi;function _f(e){setTimeout(function(){throw e})}function Zo(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),$n(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);$n(t)}function st(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Pa(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var fn=Math.random().toString(36).slice(2),Re="__reactFiber$"+fn,Qn="__reactProps$"+fn,Qe="__reactContainer$"+fn,Pi="__reactEvents$"+fn,Mf="__reactListeners$"+fn,zf="__reactHandles$"+fn;function jt(e){var t=e[Re];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Qe]||n[Re]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Pa(e);e!==null;){if(n=e[Re])return n;e=Pa(e)}return t}e=n,n=e.parentNode}return null}function rr(e){return e=e[Re]||e[Qe],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Ht(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(C(33))}function yo(e){return e[Qn]||null}var Ti=[],Ut=-1;function gt(e){return{current:e}}function O(e){0>Ut||(e.current=Ti[Ut],Ti[Ut]=null,Ut--)}function D(e,t){Ut++,Ti[Ut]=e.current,e.current=t}var pt={},ie=gt(pt),pe=gt(!1),bt=pt;function rn(e,t){var n=e.type.contextTypes;if(!n)return pt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function me(e){return e=e.childContextTypes,e!=null}function Kr(){O(pe),O(ie)}function Ta(e,t,n){if(ie.current!==pt)throw Error(C(168));D(ie,t),D(pe,n)}function _u(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(C(108,pd(e)||"Unknown",o));return H({},n,r)}function Xr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||pt,bt=ie.current,D(ie,e),D(pe,pe.current),!0}function Da(e,t,n){var r=e.stateNode;if(!r)throw Error(C(169));n?(e=_u(e,t,bt),r.__reactInternalMemoizedMergedChildContext=e,O(pe),O(ie),D(ie,e)):O(pe),D(pe,n)}var $e=null,vo=!1,qo=!1;function Mu(e){$e===null?$e=[e]:$e.push(e)}function Af(e){vo=!0,Mu(e)}function yt(){if(!qo&&$e!==null){qo=!0;var e=0,t=T;try{var n=$e;for(T=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}$e=null,vo=!1}catch(o){throw $e!==null&&($e=$e.slice(e+1)),tu(pl,yt),o}finally{T=t,qo=!1}}return null}var Vt=[],Gt=0,Zr=null,qr=0,Ee=[],Ce=0,Nt=null,He=1,Ue="";function wt(e,t){Vt[Gt++]=qr,Vt[Gt++]=Zr,Zr=e,qr=t}function zu(e,t,n){Ee[Ce++]=He,Ee[Ce++]=Ue,Ee[Ce++]=Nt,Nt=e;var r=He;e=Ue;var o=32-Le(r)-1;r&=~(1<<o),n+=1;var i=32-Le(t)+o;if(30<i){var a=o-o%5;i=(r&(1<<a)-1).toString(32),r>>=a,o-=a,He=1<<32-Le(t)+o|n<<o|r,Ue=i+e}else He=1<<i|n<<o|r,Ue=e}function El(e){e.return!==null&&(wt(e,1),zu(e,1,0))}function Cl(e){for(;e===Zr;)Zr=Vt[--Gt],Vt[Gt]=null,qr=Vt[--Gt],Vt[Gt]=null;for(;e===Nt;)Nt=Ee[--Ce],Ee[Ce]=null,Ue=Ee[--Ce],Ee[Ce]=null,He=Ee[--Ce],Ee[Ce]=null}var xe=null,ve=null,I=!1,Ae=null;function Au(e,t){var n=Fe(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Ra(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,xe=e,ve=st(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,xe=e,ve=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Nt!==null?{id:He,overflow:Ue}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Fe(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,xe=e,ve=null,!0):!1;default:return!1}}function Di(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ri(e){if(I){var t=ve;if(t){var n=t;if(!Ra(e,t)){if(Di(e))throw Error(C(418));t=st(n.nextSibling);var r=xe;t&&Ra(e,t)?Au(r,n):(e.flags=e.flags&-4097|2,I=!1,xe=e)}}else{if(Di(e))throw Error(C(418));e.flags=e.flags&-4097|2,I=!1,xe=e}}}function Oa(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;xe=e}function vr(e){if(e!==xe)return!1;if(!I)return Oa(e),I=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Li(e.type,e.memoizedProps)),t&&(t=ve)){if(Di(e))throw Lu(),Error(C(418));for(;t;)Au(e,t),t=st(t.nextSibling)}if(Oa(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(C(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){ve=st(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}ve=null}}else ve=xe?st(e.stateNode.nextSibling):null;return!0}function Lu(){for(var e=ve;e;)e=st(e.nextSibling)}function on(){ve=xe=null,I=!1}function Fl(e){Ae===null?Ae=[e]:Ae.push(e)}var Lf=Ze.ReactCurrentBatchConfig;function kn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(C(309));var r=n.stateNode}if(!r)throw Error(C(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(a){var s=o.refs;a===null?delete s[i]:s[i]=a},t._stringRef=i,t)}if(typeof e!="string")throw Error(C(284));if(!n._owner)throw Error(C(290,e))}return e}function xr(e,t){throw e=Object.prototype.toString.call(t),Error(C(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function Ia(e){var t=e._init;return t(e._payload)}function Bu(e){function t(d,c){if(e){var h=d.deletions;h===null?(d.deletions=[c],d.flags|=16):h.push(c)}}function n(d,c){if(!e)return null;for(;c!==null;)t(d,c),c=c.sibling;return null}function r(d,c){for(d=new Map;c!==null;)c.key!==null?d.set(c.key,c):d.set(c.index,c),c=c.sibling;return d}function o(d,c){return d=ft(d,c),d.index=0,d.sibling=null,d}function i(d,c,h){return d.index=h,e?(h=d.alternate,h!==null?(h=h.index,h<c?(d.flags|=2,c):h):(d.flags|=2,c)):(d.flags|=1048576,c)}function a(d){return e&&d.alternate===null&&(d.flags|=2),d}function s(d,c,h,y){return c===null||c.tag!==6?(c=ii(h,d.mode,y),c.return=d,c):(c=o(c,h),c.return=d,c)}function u(d,c,h,y){var w=h.type;return w===Ot?p(d,c,h.props.children,y,h.key):c!==null&&(c.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Je&&Ia(w)===c.type)?(y=o(c,h.props),y.ref=kn(d,c,h),y.return=d,y):(y=Or(h.type,h.key,h.props,null,d.mode,y),y.ref=kn(d,c,h),y.return=d,y)}function f(d,c,h,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==h.containerInfo||c.stateNode.implementation!==h.implementation?(c=li(h,d.mode,y),c.return=d,c):(c=o(c,h.children||[]),c.return=d,c)}function p(d,c,h,y,w){return c===null||c.tag!==7?(c=St(h,d.mode,y,w),c.return=d,c):(c=o(c,h),c.return=d,c)}function m(d,c,h){if(typeof c=="string"&&c!==""||typeof c=="number")return c=ii(""+c,d.mode,h),c.return=d,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case sr:return h=Or(c.type,c.key,c.props,null,d.mode,h),h.ref=kn(d,null,c),h.return=d,h;case Rt:return c=li(c,d.mode,h),c.return=d,c;case Je:var y=c._init;return m(d,y(c._payload),h)}if(Fn(c)||gn(c))return c=St(c,d.mode,h,null),c.return=d,c;xr(d,c)}return null}function g(d,c,h,y){var w=c!==null?c.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return w!==null?null:s(d,c,""+h,y);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case sr:return h.key===w?u(d,c,h,y):null;case Rt:return h.key===w?f(d,c,h,y):null;case Je:return w=h._init,g(d,c,w(h._payload),y)}if(Fn(h)||gn(h))return w!==null?null:p(d,c,h,y,null);xr(d,h)}return null}function k(d,c,h,y,w){if(typeof y=="string"&&y!==""||typeof y=="number")return d=d.get(h)||null,s(c,d,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case sr:return d=d.get(y.key===null?h:y.key)||null,u(c,d,y,w);case Rt:return d=d.get(y.key===null?h:y.key)||null,f(c,d,y,w);case Je:var E=y._init;return k(d,c,h,E(y._payload),w)}if(Fn(y)||gn(y))return d=d.get(h)||null,p(c,d,y,w,null);xr(c,y)}return null}function v(d,c,h,y){for(var w=null,E=null,b=c,F=c=0,A=null;b!==null&&F<h.length;F++){b.index>F?(A=b,b=null):A=b.sibling;var M=g(d,b,h[F],y);if(M===null){b===null&&(b=A);break}e&&b&&M.alternate===null&&t(d,b),c=i(M,c,F),E===null?w=M:E.sibling=M,E=M,b=A}if(F===h.length)return n(d,b),I&&wt(d,F),w;if(b===null){for(;F<h.length;F++)b=m(d,h[F],y),b!==null&&(c=i(b,c,F),E===null?w=b:E.sibling=b,E=b);return I&&wt(d,F),w}for(b=r(d,b);F<h.length;F++)A=k(b,d,F,h[F],y),A!==null&&(e&&A.alternate!==null&&b.delete(A.key===null?F:A.key),c=i(A,c,F),E===null?w=A:E.sibling=A,E=A);return e&&b.forEach(function(ce){return t(d,ce)}),I&&wt(d,F),w}function j(d,c,h,y){var w=gn(h);if(typeof w!="function")throw Error(C(150));if(h=w.call(h),h==null)throw Error(C(151));for(var E=w=null,b=c,F=c=0,A=null,M=h.next();b!==null&&!M.done;F++,M=h.next()){b.index>F?(A=b,b=null):A=b.sibling;var ce=g(d,b,M.value,y);if(ce===null){b===null&&(b=A);break}e&&b&&ce.alternate===null&&t(d,b),c=i(ce,c,F),E===null?w=ce:E.sibling=ce,E=ce,b=A}if(M.done)return n(d,b),I&&wt(d,F),w;if(b===null){for(;!M.done;F++,M=h.next())M=m(d,M.value,y),M!==null&&(c=i(M,c,F),E===null?w=M:E.sibling=M,E=M);return I&&wt(d,F),w}for(b=r(d,b);!M.done;F++,M=h.next())M=k(b,d,F,M.value,y),M!==null&&(e&&M.alternate!==null&&b.delete(M.key===null?F:M.key),c=i(M,c,F),E===null?w=M:E.sibling=M,E=M);return e&&b.forEach(function(pn){return t(d,pn)}),I&&wt(d,F),w}function x(d,c,h,y){if(typeof h=="object"&&h!==null&&h.type===Ot&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case sr:e:{for(var w=h.key,E=c;E!==null;){if(E.key===w){if(w=h.type,w===Ot){if(E.tag===7){n(d,E.sibling),c=o(E,h.props.children),c.return=d,d=c;break e}}else if(E.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Je&&Ia(w)===E.type){n(d,E.sibling),c=o(E,h.props),c.ref=kn(d,E,h),c.return=d,d=c;break e}n(d,E);break}else t(d,E);E=E.sibling}h.type===Ot?(c=St(h.props.children,d.mode,y,h.key),c.return=d,d=c):(y=Or(h.type,h.key,h.props,null,d.mode,y),y.ref=kn(d,c,h),y.return=d,d=y)}return a(d);case Rt:e:{for(E=h.key;c!==null;){if(c.key===E)if(c.tag===4&&c.stateNode.containerInfo===h.containerInfo&&c.stateNode.implementation===h.implementation){n(d,c.sibling),c=o(c,h.children||[]),c.return=d,d=c;break e}else{n(d,c);break}else t(d,c);c=c.sibling}c=li(h,d.mode,y),c.return=d,d=c}return a(d);case Je:return E=h._init,x(d,c,E(h._payload),y)}if(Fn(h))return v(d,c,h,y);if(gn(h))return j(d,c,h,y);xr(d,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,c!==null&&c.tag===6?(n(d,c.sibling),c=o(c,h),c.return=d,d=c):(n(d,c),c=ii(h,d.mode,y),c.return=d,d=c),a(d)):n(d,c)}return x}var ln=Bu(!0),Pu=Bu(!1),Jr=gt(null),eo=null,Qt=null,Sl=null;function bl(){Sl=Qt=eo=null}function Nl(e){var t=Jr.current;O(Jr),e._currentValue=t}function Oi(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function en(e,t){eo=e,Sl=Qt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(he=!0),e.firstContext=null)}function be(e){var t=e._currentValue;if(Sl!==e)if(e={context:e,memoizedValue:t,next:null},Qt===null){if(eo===null)throw Error(C(308));Qt=e,eo.dependencies={lanes:0,firstContext:e}}else Qt=Qt.next=e;return t}var Et=null;function _l(e){Et===null?Et=[e]:Et.push(e)}function Tu(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,_l(t)):(n.next=o.next,o.next=n),t.interleaved=n,Ye(e,r)}function Ye(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var et=!1;function Ml(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Du(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ve(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ut(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,P&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Ye(e,n)}return o=r.interleaved,o===null?(t.next=t,_l(r)):(t.next=o.next,o.next=t),r.interleaved=t,Ye(e,n)}function Lr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ml(e,n)}}function Wa(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=a:i=i.next=a,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function to(e,t,n,r){var o=e.updateQueue;et=!1;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var u=s,f=u.next;u.next=null,a===null?i=f:a.next=f,a=u;var p=e.alternate;p!==null&&(p=p.updateQueue,s=p.lastBaseUpdate,s!==a&&(s===null?p.firstBaseUpdate=f:s.next=f,p.lastBaseUpdate=u))}if(i!==null){var m=o.baseState;a=0,p=f=u=null,s=i;do{var g=s.lane,k=s.eventTime;if((r&g)===g){p!==null&&(p=p.next={eventTime:k,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var v=e,j=s;switch(g=t,k=n,j.tag){case 1:if(v=j.payload,typeof v=="function"){m=v.call(k,m,g);break e}m=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=j.payload,g=typeof v=="function"?v.call(k,m,g):v,g==null)break e;m=H({},m,g);break e;case 2:et=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,g=o.effects,g===null?o.effects=[s]:g.push(s))}else k={eventTime:k,lane:g,tag:s.tag,payload:s.payload,callback:s.callback,next:null},p===null?(f=p=k,u=m):p=p.next=k,a|=g;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;g=s,s=g.next,g.next=null,o.lastBaseUpdate=g,o.shared.pending=null}}while(!0);if(p===null&&(u=m),o.baseState=u,o.firstBaseUpdate=f,o.lastBaseUpdate=p,t=o.shared.interleaved,t!==null){o=t;do a|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);Mt|=a,e.lanes=a,e.memoizedState=m}}function $a(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(C(191,o));o.call(r)}}}var or={},Ie=gt(or),Yn=gt(or),Kn=gt(or);function Ct(e){if(e===or)throw Error(C(174));return e}function zl(e,t){switch(D(Kn,t),D(Yn,e),D(Ie,or),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:xi(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=xi(t,e)}O(Ie),D(Ie,t)}function an(){O(Ie),O(Yn),O(Kn)}function Ru(e){Ct(Kn.current);var t=Ct(Ie.current),n=xi(t,e.type);t!==n&&(D(Yn,e),D(Ie,n))}function Al(e){Yn.current===e&&(O(Ie),O(Yn))}var W=gt(0);function no(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Jo=[];function Ll(){for(var e=0;e<Jo.length;e++)Jo[e]._workInProgressVersionPrimary=null;Jo.length=0}var Br=Ze.ReactCurrentDispatcher,ei=Ze.ReactCurrentBatchConfig,_t=0,$=null,Y=null,Z=null,ro=!1,Ln=!1,Xn=0,Bf=0;function ne(){throw Error(C(321))}function Bl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Pe(e[n],t[n]))return!1;return!0}function Pl(e,t,n,r,o,i){if(_t=i,$=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Br.current=e===null||e.memoizedState===null?Rf:Of,e=n(r,o),Ln){i=0;do{if(Ln=!1,Xn=0,25<=i)throw Error(C(301));i+=1,Z=Y=null,t.updateQueue=null,Br.current=If,e=n(r,o)}while(Ln)}if(Br.current=oo,t=Y!==null&&Y.next!==null,_t=0,Z=Y=$=null,ro=!1,t)throw Error(C(300));return e}function Tl(){var e=Xn!==0;return Xn=0,e}function De(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Z===null?$.memoizedState=Z=e:Z=Z.next=e,Z}function Ne(){if(Y===null){var e=$.alternate;e=e!==null?e.memoizedState:null}else e=Y.next;var t=Z===null?$.memoizedState:Z.next;if(t!==null)Z=t,Y=e;else{if(e===null)throw Error(C(310));Y=e,e={memoizedState:Y.memoizedState,baseState:Y.baseState,baseQueue:Y.baseQueue,queue:Y.queue,next:null},Z===null?$.memoizedState=Z=e:Z=Z.next=e}return Z}function Zn(e,t){return typeof t=="function"?t(e):t}function ti(e){var t=Ne(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=Y,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var a=o.next;o.next=i.next,i.next=a}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var s=a=null,u=null,f=i;do{var p=f.lane;if((_t&p)===p)u!==null&&(u=u.next={lane:0,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null}),r=f.hasEagerState?f.eagerState:e(r,f.action);else{var m={lane:p,action:f.action,hasEagerState:f.hasEagerState,eagerState:f.eagerState,next:null};u===null?(s=u=m,a=r):u=u.next=m,$.lanes|=p,Mt|=p}f=f.next}while(f!==null&&f!==i);u===null?a=r:u.next=s,Pe(r,t.memoizedState)||(he=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,$.lanes|=i,Mt|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ni(e){var t=Ne(),n=t.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var a=o=o.next;do i=e(i,a.action),a=a.next;while(a!==o);Pe(i,t.memoizedState)||(he=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Ou(){}function Iu(e,t){var n=$,r=Ne(),o=t(),i=!Pe(r.memoizedState,o);if(i&&(r.memoizedState=o,he=!0),r=r.queue,Dl(Hu.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||Z!==null&&Z.memoizedState.tag&1){if(n.flags|=2048,qn(9,$u.bind(null,n,r,o,t),void 0,null),q===null)throw Error(C(349));_t&30||Wu(n,t,o)}return o}function Wu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function $u(e,t,n,r){t.value=n,t.getSnapshot=r,Uu(t)&&Vu(e)}function Hu(e,t,n){return n(function(){Uu(t)&&Vu(e)})}function Uu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Pe(e,n)}catch{return!0}}function Vu(e){var t=Ye(e,1);t!==null&&Be(t,e,1,-1)}function Ha(e){var t=De();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:e},t.queue=e,e=e.dispatch=Df.bind(null,$,e),[t.memoizedState,e]}function qn(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=$.updateQueue,t===null?(t={lastEffect:null,stores:null},$.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Gu(){return Ne().memoizedState}function Pr(e,t,n,r){var o=De();$.flags|=e,o.memoizedState=qn(1|t,n,void 0,r===void 0?null:r)}function xo(e,t,n,r){var o=Ne();r=r===void 0?null:r;var i=void 0;if(Y!==null){var a=Y.memoizedState;if(i=a.destroy,r!==null&&Bl(r,a.deps)){o.memoizedState=qn(t,n,i,r);return}}$.flags|=e,o.memoizedState=qn(1|t,n,i,r)}function Ua(e,t){return Pr(8390656,8,e,t)}function Dl(e,t){return xo(2048,8,e,t)}function Qu(e,t){return xo(4,2,e,t)}function Yu(e,t){return xo(4,4,e,t)}function Ku(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Xu(e,t,n){return n=n!=null?n.concat([e]):null,xo(4,4,Ku.bind(null,t,e),n)}function Rl(){}function Zu(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qu(e,t){var n=Ne();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Bl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ju(e,t,n){return _t&21?(Pe(n,t)||(n=ou(),$.lanes|=n,Mt|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,he=!0),e.memoizedState=n)}function Pf(e,t){var n=T;T=n!==0&&4>n?n:4,e(!0);var r=ei.transition;ei.transition={};try{e(!1),t()}finally{T=n,ei.transition=r}}function ec(){return Ne().memoizedState}function Tf(e,t,n){var r=dt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},tc(e))nc(t,n);else if(n=Tu(e,t,n,r),n!==null){var o=ae();Be(n,e,r,o),rc(n,t,r)}}function Df(e,t,n){var r=dt(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(tc(e))nc(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var a=t.lastRenderedState,s=i(a,n);if(o.hasEagerState=!0,o.eagerState=s,Pe(s,a)){var u=t.interleaved;u===null?(o.next=o,_l(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch{}finally{}n=Tu(e,t,o,r),n!==null&&(o=ae(),Be(n,e,r,o),rc(n,t,r))}}function tc(e){var t=e.alternate;return e===$||t!==null&&t===$}function nc(e,t){Ln=ro=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function rc(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ml(e,n)}}var oo={readContext:be,useCallback:ne,useContext:ne,useEffect:ne,useImperativeHandle:ne,useInsertionEffect:ne,useLayoutEffect:ne,useMemo:ne,useReducer:ne,useRef:ne,useState:ne,useDebugValue:ne,useDeferredValue:ne,useTransition:ne,useMutableSource:ne,useSyncExternalStore:ne,useId:ne,unstable_isNewReconciler:!1},Rf={readContext:be,useCallback:function(e,t){return De().memoizedState=[e,t===void 0?null:t],e},useContext:be,useEffect:Ua,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Pr(4194308,4,Ku.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Pr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Pr(4,2,e,t)},useMemo:function(e,t){var n=De();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=De();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=Tf.bind(null,$,e),[r.memoizedState,e]},useRef:function(e){var t=De();return e={current:e},t.memoizedState=e},useState:Ha,useDebugValue:Rl,useDeferredValue:function(e){return De().memoizedState=e},useTransition:function(){var e=Ha(!1),t=e[0];return e=Pf.bind(null,e[1]),De().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=$,o=De();if(I){if(n===void 0)throw Error(C(407));n=n()}else{if(n=t(),q===null)throw Error(C(349));_t&30||Wu(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,Ua(Hu.bind(null,r,i,e),[e]),r.flags|=2048,qn(9,$u.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=De(),t=q.identifierPrefix;if(I){var n=Ue,r=He;n=(r&~(1<<32-Le(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Xn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=Bf++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Of={readContext:be,useCallback:Zu,useContext:be,useEffect:Dl,useImperativeHandle:Xu,useInsertionEffect:Qu,useLayoutEffect:Yu,useMemo:qu,useReducer:ti,useRef:Gu,useState:function(){return ti(Zn)},useDebugValue:Rl,useDeferredValue:function(e){var t=Ne();return Ju(t,Y.memoizedState,e)},useTransition:function(){var e=ti(Zn)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:Ou,useSyncExternalStore:Iu,useId:ec,unstable_isNewReconciler:!1},If={readContext:be,useCallback:Zu,useContext:be,useEffect:Dl,useImperativeHandle:Xu,useInsertionEffect:Qu,useLayoutEffect:Yu,useMemo:qu,useReducer:ni,useRef:Gu,useState:function(){return ni(Zn)},useDebugValue:Rl,useDeferredValue:function(e){var t=Ne();return Y===null?t.memoizedState=e:Ju(t,Y.memoizedState,e)},useTransition:function(){var e=ni(Zn)[0],t=Ne().memoizedState;return[e,t]},useMutableSource:Ou,useSyncExternalStore:Iu,useId:ec,unstable_isNewReconciler:!1};function Me(e,t){if(e&&e.defaultProps){t=H({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ii(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:H({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var wo={isMounted:function(e){return(e=e._reactInternals)?Bt(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=ae(),o=dt(e),i=Ve(r,o);i.payload=t,n!=null&&(i.callback=n),t=ut(e,i,o),t!==null&&(Be(t,e,o,r),Lr(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=ae(),o=dt(e),i=Ve(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ut(e,i,o),t!==null&&(Be(t,e,o,r),Lr(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ae(),r=dt(e),o=Ve(n,r);o.tag=2,t!=null&&(o.callback=t),t=ut(e,o,r),t!==null&&(Be(t,e,r,n),Lr(t,e,r))}};function Va(e,t,n,r,o,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,a):t.prototype&&t.prototype.isPureReactComponent?!Un(n,r)||!Un(o,i):!0}function oc(e,t,n){var r=!1,o=pt,i=t.contextType;return typeof i=="object"&&i!==null?i=be(i):(o=me(t)?bt:ie.current,r=t.contextTypes,i=(r=r!=null)?rn(e,o):pt),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=wo,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function Ga(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&wo.enqueueReplaceState(t,t.state,null)}function Wi(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Ml(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=be(i):(i=me(t)?bt:ie.current,o.context=rn(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(Ii(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&wo.enqueueReplaceState(o,o.state,null),to(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function sn(e,t){try{var n="",r=t;do n+=hd(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function ri(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function $i(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Wf=typeof WeakMap=="function"?WeakMap:Map;function ic(e,t,n){n=Ve(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){lo||(lo=!0,qi=r),$i(e,t)},n}function lc(e,t,n){n=Ve(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){$i(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){$i(e,t),typeof r!="function"&&(ct===null?ct=new Set([this]):ct.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Qa(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Wf;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=th.bind(null,e,t,n),t.then(e,e))}function Ya(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Ka(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Ve(-1,1),t.tag=2,ut(n,t,1))),n.lanes|=1),e)}var $f=Ze.ReactCurrentOwner,he=!1;function le(e,t,n,r){t.child=e===null?Pu(t,null,n,r):ln(t,e.child,n,r)}function Xa(e,t,n,r,o){n=n.render;var i=t.ref;return en(t,o),r=Pl(e,t,n,r,i,o),n=Tl(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Ke(e,t,o)):(I&&n&&El(t),t.flags|=1,le(e,t,r,o),t.child)}function Za(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!Gl(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,ac(e,t,i,r,o)):(e=Or(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var a=i.memoizedProps;if(n=n.compare,n=n!==null?n:Un,n(a,r)&&e.ref===t.ref)return Ke(e,t,o)}return t.flags|=1,e=ft(i,r),e.ref=t.ref,e.return=t,t.child=e}function ac(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(Un(i,r)&&e.ref===t.ref)if(he=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(he=!0);else return t.lanes=e.lanes,Ke(e,t,o)}return Hi(e,t,n,r,o)}function sc(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},D(Kt,ye),ye|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,D(Kt,ye),ye|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,D(Kt,ye),ye|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,D(Kt,ye),ye|=r;return le(e,t,o,n),t.child}function uc(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function Hi(e,t,n,r,o){var i=me(n)?bt:ie.current;return i=rn(t,i),en(t,o),n=Pl(e,t,n,r,i,o),r=Tl(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,Ke(e,t,o)):(I&&r&&El(t),t.flags|=1,le(e,t,n,o),t.child)}function qa(e,t,n,r,o){if(me(n)){var i=!0;Xr(t)}else i=!1;if(en(t,o),t.stateNode===null)Tr(e,t),oc(t,n,r),Wi(t,n,r,o),r=!0;else if(e===null){var a=t.stateNode,s=t.memoizedProps;a.props=s;var u=a.context,f=n.contextType;typeof f=="object"&&f!==null?f=be(f):(f=me(n)?bt:ie.current,f=rn(t,f));var p=n.getDerivedStateFromProps,m=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function";m||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==r||u!==f)&&Ga(t,a,r,f),et=!1;var g=t.memoizedState;a.state=g,to(t,r,a,o),u=t.memoizedState,s!==r||g!==u||pe.current||et?(typeof p=="function"&&(Ii(t,n,p,r),u=t.memoizedState),(s=et||Va(t,n,s,r,g,u,f))?(m||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),a.props=r,a.state=u,a.context=f,r=s):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Du(e,t),s=t.memoizedProps,f=t.type===t.elementType?s:Me(t.type,s),a.props=f,m=t.pendingProps,g=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=be(u):(u=me(n)?bt:ie.current,u=rn(t,u));var k=n.getDerivedStateFromProps;(p=typeof k=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(s!==m||g!==u)&&Ga(t,a,r,u),et=!1,g=t.memoizedState,a.state=g,to(t,r,a,o);var v=t.memoizedState;s!==m||g!==v||pe.current||et?(typeof k=="function"&&(Ii(t,n,k,r),v=t.memoizedState),(f=et||Va(t,n,f,r,g,v,u)||!1)?(p||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,v,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,v,u)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=v),a.props=r,a.state=v,a.context=u,r=f):(typeof a.componentDidUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&g===e.memoizedState||(t.flags|=1024),r=!1)}return Ui(e,t,n,r,i,o)}function Ui(e,t,n,r,o,i){uc(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return o&&Da(t,n,!1),Ke(e,t,i);r=t.stateNode,$f.current=t;var s=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=ln(t,e.child,null,i),t.child=ln(t,null,s,i)):le(e,t,s,i),t.memoizedState=r.state,o&&Da(t,n,!0),t.child}function cc(e){var t=e.stateNode;t.pendingContext?Ta(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ta(e,t.context,!1),zl(e,t.containerInfo)}function Ja(e,t,n,r,o){return on(),Fl(o),t.flags|=256,le(e,t,n,r),t.child}var Vi={dehydrated:null,treeContext:null,retryLane:0};function Gi(e){return{baseLanes:e,cachePool:null,transitions:null}}function dc(e,t,n){var r=t.pendingProps,o=W.current,i=!1,a=(t.flags&128)!==0,s;if((s=a)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),D(W,o&1),e===null)return Ri(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,i?(r=t.mode,i=t.child,a={mode:"hidden",children:a},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Eo(a,r,0,null),e=St(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=Gi(n),t.memoizedState=Vi,e):Ol(t,a));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Hf(e,t,a,r,s,o,n);if(i){i=r.fallback,a=t.mode,o=e.child,s=o.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=ft(o,u),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?i=ft(s,i):(i=St(i,a,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,a=e.child.memoizedState,a=a===null?Gi(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~n,t.memoizedState=Vi,r}return i=e.child,e=i.sibling,r=ft(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Ol(e,t){return t=Eo({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function wr(e,t,n,r){return r!==null&&Fl(r),ln(t,e.child,null,n),e=Ol(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Hf(e,t,n,r,o,i,a){if(n)return t.flags&256?(t.flags&=-257,r=ri(Error(C(422))),wr(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=Eo({mode:"visible",children:r.children},o,0,null),i=St(i,o,a,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&ln(t,e.child,null,a),t.child.memoizedState=Gi(a),t.memoizedState=Vi,i);if(!(t.mode&1))return wr(e,t,a,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(C(419)),r=ri(i,r,void 0),wr(e,t,a,r)}if(s=(a&e.childLanes)!==0,he||s){if(r=q,r!==null){switch(a&-a){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|a)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Ye(e,o),Be(r,e,o,-1))}return Vl(),r=ri(Error(C(421))),wr(e,t,a,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=nh.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,ve=st(o.nextSibling),xe=t,I=!0,Ae=null,e!==null&&(Ee[Ce++]=He,Ee[Ce++]=Ue,Ee[Ce++]=Nt,He=e.id,Ue=e.overflow,Nt=t),t=Ol(t,r.children),t.flags|=4096,t)}function es(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Oi(e.return,t,n)}function oi(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function fc(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(le(e,t,r.children,n),r=W.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&es(e,n,t);else if(e.tag===19)es(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(D(W,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&no(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),oi(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&no(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}oi(t,!0,n,null,i);break;case"together":oi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Tr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Ke(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Mt|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(C(153));if(t.child!==null){for(e=t.child,n=ft(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=ft(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Uf(e,t,n){switch(t.tag){case 3:cc(t),on();break;case 5:Ru(t);break;case 1:me(t.type)&&Xr(t);break;case 4:zl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;D(Jr,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(D(W,W.current&1),t.flags|=128,null):n&t.child.childLanes?dc(e,t,n):(D(W,W.current&1),e=Ke(e,t,n),e!==null?e.sibling:null);D(W,W.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return fc(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),D(W,W.current),r)break;return null;case 22:case 23:return t.lanes=0,sc(e,t,n)}return Ke(e,t,n)}var hc,Qi,pc,mc;hc=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Qi=function(){};pc=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Ct(Ie.current);var i=null;switch(n){case"input":o=mi(e,o),r=mi(e,r),i=[];break;case"select":o=H({},o,{value:void 0}),r=H({},r,{value:void 0}),i=[];break;case"textarea":o=vi(e,o),r=vi(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Yr)}wi(n,r);var a;n=null;for(f in o)if(!r.hasOwnProperty(f)&&o.hasOwnProperty(f)&&o[f]!=null)if(f==="style"){var s=o[f];for(a in s)s.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else f!=="dangerouslySetInnerHTML"&&f!=="children"&&f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&f!=="autoFocus"&&(Dn.hasOwnProperty(f)?i||(i=[]):(i=i||[]).push(f,null));for(f in r){var u=r[f];if(s=o!=null?o[f]:void 0,r.hasOwnProperty(f)&&u!==s&&(u!=null||s!=null))if(f==="style")if(s){for(a in s)!s.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&s[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(i||(i=[]),i.push(f,n)),n=u;else f==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,s=s?s.__html:void 0,u!=null&&s!==u&&(i=i||[]).push(f,u)):f==="children"?typeof u!="string"&&typeof u!="number"||(i=i||[]).push(f,""+u):f!=="suppressContentEditableWarning"&&f!=="suppressHydrationWarning"&&(Dn.hasOwnProperty(f)?(u!=null&&f==="onScroll"&&R("scroll",e),i||s===u||(i=[])):(i=i||[]).push(f,u))}n&&(i=i||[]).push("style",n);var f=i;(t.updateQueue=f)&&(t.flags|=4)}};mc=function(e,t,n,r){n!==r&&(t.flags|=4)};function jn(e,t){if(!I)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function re(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Vf(e,t,n){var r=t.pendingProps;switch(Cl(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return re(t),null;case 1:return me(t.type)&&Kr(),re(t),null;case 3:return r=t.stateNode,an(),O(pe),O(ie),Ll(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(vr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Ae!==null&&(tl(Ae),Ae=null))),Qi(e,t),re(t),null;case 5:Al(t);var o=Ct(Kn.current);if(n=t.type,e!==null&&t.stateNode!=null)pc(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(C(166));return re(t),null}if(e=Ct(Ie.current),vr(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Re]=t,r[Qn]=i,e=(t.mode&1)!==0,n){case"dialog":R("cancel",r),R("close",r);break;case"iframe":case"object":case"embed":R("load",r);break;case"video":case"audio":for(o=0;o<bn.length;o++)R(bn[o],r);break;case"source":R("error",r);break;case"img":case"image":case"link":R("error",r),R("load",r);break;case"details":R("toggle",r);break;case"input":ua(r,i),R("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},R("invalid",r);break;case"textarea":da(r,i),R("invalid",r)}wi(n,i),o=null;for(var a in i)if(i.hasOwnProperty(a)){var s=i[a];a==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&yr(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&yr(r.textContent,s,e),o=["children",""+s]):Dn.hasOwnProperty(a)&&s!=null&&a==="onScroll"&&R("scroll",r)}switch(n){case"input":ur(r),ca(r,i,!0);break;case"textarea":ur(r),fa(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Yr)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Hs(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[Re]=t,e[Qn]=r,hc(e,t,!1,!1),t.stateNode=e;e:{switch(a=ki(n,r),n){case"dialog":R("cancel",e),R("close",e),o=r;break;case"iframe":case"object":case"embed":R("load",e),o=r;break;case"video":case"audio":for(o=0;o<bn.length;o++)R(bn[o],e);o=r;break;case"source":R("error",e),o=r;break;case"img":case"image":case"link":R("error",e),R("load",e),o=r;break;case"details":R("toggle",e),o=r;break;case"input":ua(e,r),o=mi(e,r),R("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=H({},r,{value:void 0}),R("invalid",e);break;case"textarea":da(e,r),o=vi(e,r),R("invalid",e);break;default:o=r}wi(n,o),s=o;for(i in s)if(s.hasOwnProperty(i)){var u=s[i];i==="style"?Gs(e,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Us(e,u)):i==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Rn(e,u):typeof u=="number"&&Rn(e,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Dn.hasOwnProperty(i)?u!=null&&i==="onScroll"&&R("scroll",e):u!=null&&ul(e,i,u,a))}switch(n){case"input":ur(e),ca(e,r,!1);break;case"textarea":ur(e),fa(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ht(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?Xt(e,!!r.multiple,i,!1):r.defaultValue!=null&&Xt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Yr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return re(t),null;case 6:if(e&&t.stateNode!=null)mc(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(C(166));if(n=Ct(Kn.current),Ct(Ie.current),vr(t)){if(r=t.stateNode,n=t.memoizedProps,r[Re]=t,(i=r.nodeValue!==n)&&(e=xe,e!==null))switch(e.tag){case 3:yr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&yr(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Re]=t,t.stateNode=r}return re(t),null;case 13:if(O(W),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(I&&ve!==null&&t.mode&1&&!(t.flags&128))Lu(),on(),t.flags|=98560,i=!1;else if(i=vr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(C(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(C(317));i[Re]=t}else on(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;re(t),i=!1}else Ae!==null&&(tl(Ae),Ae=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?K===0&&(K=3):Vl())),t.updateQueue!==null&&(t.flags|=4),re(t),null);case 4:return an(),Qi(e,t),e===null&&Vn(t.stateNode.containerInfo),re(t),null;case 10:return Nl(t.type._context),re(t),null;case 17:return me(t.type)&&Kr(),re(t),null;case 19:if(O(W),i=t.memoizedState,i===null)return re(t),null;if(r=(t.flags&128)!==0,a=i.rendering,a===null)if(r)jn(i,!1);else{if(K!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=no(e),a!==null){for(t.flags|=128,jn(i,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return D(W,W.current&1|2),t.child}e=e.sibling}i.tail!==null&&G()>un&&(t.flags|=128,r=!0,jn(i,!1),t.lanes=4194304)}else{if(!r)if(e=no(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),jn(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!I)return re(t),null}else 2*G()-i.renderingStartTime>un&&n!==1073741824&&(t.flags|=128,r=!0,jn(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(n=i.last,n!==null?n.sibling=a:t.child=a,i.last=a)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=G(),t.sibling=null,n=W.current,D(W,r?n&1|2:n&1),t):(re(t),null);case 22:case 23:return Ul(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?ye&1073741824&&(re(t),t.subtreeFlags&6&&(t.flags|=8192)):re(t),null;case 24:return null;case 25:return null}throw Error(C(156,t.tag))}function Gf(e,t){switch(Cl(t),t.tag){case 1:return me(t.type)&&Kr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return an(),O(pe),O(ie),Ll(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Al(t),null;case 13:if(O(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(C(340));on()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return O(W),null;case 4:return an(),null;case 10:return Nl(t.type._context),null;case 22:case 23:return Ul(),null;case 24:return null;default:return null}}var kr=!1,oe=!1,Qf=typeof WeakSet=="function"?WeakSet:Set,N=null;function Yt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){U(e,t,r)}else n.current=null}function Yi(e,t,n){try{n()}catch(r){U(e,t,r)}}var ts=!1;function Yf(e,t){if(zi=Vr,e=wu(),jl(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var a=0,s=-1,u=-1,f=0,p=0,m=e,g=null;t:for(;;){for(var k;m!==n||o!==0&&m.nodeType!==3||(s=a+o),m!==i||r!==0&&m.nodeType!==3||(u=a+r),m.nodeType===3&&(a+=m.nodeValue.length),(k=m.firstChild)!==null;)g=m,m=k;for(;;){if(m===e)break t;if(g===n&&++f===o&&(s=a),g===i&&++p===r&&(u=a),(k=m.nextSibling)!==null)break;m=g,g=m.parentNode}m=k}n=s===-1||u===-1?null:{start:s,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ai={focusedElem:e,selectionRange:n},Vr=!1,N=t;N!==null;)if(t=N,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,N=e;else for(;N!==null;){t=N;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var j=v.memoizedProps,x=v.memoizedState,d=t.stateNode,c=d.getSnapshotBeforeUpdate(t.elementType===t.type?j:Me(t.type,j),x);d.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(C(163))}}catch(y){U(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,N=e;break}N=t.return}return v=ts,ts=!1,v}function Bn(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&Yi(t,n,i)}o=o.next}while(o!==r)}}function ko(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ki(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function gc(e){var t=e.alternate;t!==null&&(e.alternate=null,gc(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Re],delete t[Qn],delete t[Pi],delete t[Mf],delete t[zf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function yc(e){return e.tag===5||e.tag===3||e.tag===4}function ns(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||yc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Xi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Yr));else if(r!==4&&(e=e.child,e!==null))for(Xi(e,t,n),e=e.sibling;e!==null;)Xi(e,t,n),e=e.sibling}function Zi(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Zi(e,t,n),e=e.sibling;e!==null;)Zi(e,t,n),e=e.sibling}var J=null,ze=!1;function qe(e,t,n){for(n=n.child;n!==null;)vc(e,t,n),n=n.sibling}function vc(e,t,n){if(Oe&&typeof Oe.onCommitFiberUnmount=="function")try{Oe.onCommitFiberUnmount(ho,n)}catch{}switch(n.tag){case 5:oe||Yt(n,t);case 6:var r=J,o=ze;J=null,qe(e,t,n),J=r,ze=o,J!==null&&(ze?(e=J,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):J.removeChild(n.stateNode));break;case 18:J!==null&&(ze?(e=J,n=n.stateNode,e.nodeType===8?Zo(e.parentNode,n):e.nodeType===1&&Zo(e,n),$n(e)):Zo(J,n.stateNode));break;case 4:r=J,o=ze,J=n.stateNode.containerInfo,ze=!0,qe(e,t,n),J=r,ze=o;break;case 0:case 11:case 14:case 15:if(!oe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&Yi(n,t,a),o=o.next}while(o!==r)}qe(e,t,n);break;case 1:if(!oe&&(Yt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){U(n,t,s)}qe(e,t,n);break;case 21:qe(e,t,n);break;case 22:n.mode&1?(oe=(r=oe)||n.memoizedState!==null,qe(e,t,n),oe=r):qe(e,t,n);break;default:qe(e,t,n)}}function rs(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Qf),t.forEach(function(r){var o=rh.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function _e(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,a=t,s=a;e:for(;s!==null;){switch(s.tag){case 5:J=s.stateNode,ze=!1;break e;case 3:J=s.stateNode.containerInfo,ze=!0;break e;case 4:J=s.stateNode.containerInfo,ze=!0;break e}s=s.return}if(J===null)throw Error(C(160));vc(i,a,o),J=null,ze=!1;var u=o.alternate;u!==null&&(u.return=null),o.return=null}catch(f){U(o,t,f)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)xc(t,e),t=t.sibling}function xc(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(_e(t,e),Te(e),r&4){try{Bn(3,e,e.return),ko(3,e)}catch(j){U(e,e.return,j)}try{Bn(5,e,e.return)}catch(j){U(e,e.return,j)}}break;case 1:_e(t,e),Te(e),r&512&&n!==null&&Yt(n,n.return);break;case 5:if(_e(t,e),Te(e),r&512&&n!==null&&Yt(n,n.return),e.flags&32){var o=e.stateNode;try{Rn(o,"")}catch(j){U(e,e.return,j)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,a=n!==null?n.memoizedProps:i,s=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Ws(o,i),ki(s,a);var f=ki(s,i);for(a=0;a<u.length;a+=2){var p=u[a],m=u[a+1];p==="style"?Gs(o,m):p==="dangerouslySetInnerHTML"?Us(o,m):p==="children"?Rn(o,m):ul(o,p,m,f)}switch(s){case"input":gi(o,i);break;case"textarea":$s(o,i);break;case"select":var g=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var k=i.value;k!=null?Xt(o,!!i.multiple,k,!1):g!==!!i.multiple&&(i.defaultValue!=null?Xt(o,!!i.multiple,i.defaultValue,!0):Xt(o,!!i.multiple,i.multiple?[]:"",!1))}o[Qn]=i}catch(j){U(e,e.return,j)}}break;case 6:if(_e(t,e),Te(e),r&4){if(e.stateNode===null)throw Error(C(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(j){U(e,e.return,j)}}break;case 3:if(_e(t,e),Te(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{$n(t.containerInfo)}catch(j){U(e,e.return,j)}break;case 4:_e(t,e),Te(e);break;case 13:_e(t,e),Te(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||($l=G())),r&4&&rs(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(oe=(f=oe)||p,_e(t,e),oe=f):_e(t,e),Te(e),r&8192){if(f=e.memoizedState!==null,(e.stateNode.isHidden=f)&&!p&&e.mode&1)for(N=e,p=e.child;p!==null;){for(m=N=p;N!==null;){switch(g=N,k=g.child,g.tag){case 0:case 11:case 14:case 15:Bn(4,g,g.return);break;case 1:Yt(g,g.return);var v=g.stateNode;if(typeof v.componentWillUnmount=="function"){r=g,n=g.return;try{t=r,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(j){U(r,n,j)}}break;case 5:Yt(g,g.return);break;case 22:if(g.memoizedState!==null){is(m);continue}}k!==null?(k.return=g,N=k):is(m)}p=p.sibling}e:for(p=null,m=e;;){if(m.tag===5){if(p===null){p=m;try{o=m.stateNode,f?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=m.stateNode,u=m.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,s.style.display=Vs("display",a))}catch(j){U(e,e.return,j)}}}else if(m.tag===6){if(p===null)try{m.stateNode.nodeValue=f?"":m.memoizedProps}catch(j){U(e,e.return,j)}}else if((m.tag!==22&&m.tag!==23||m.memoizedState===null||m===e)&&m.child!==null){m.child.return=m,m=m.child;continue}if(m===e)break e;for(;m.sibling===null;){if(m.return===null||m.return===e)break e;p===m&&(p=null),m=m.return}p===m&&(p=null),m.sibling.return=m.return,m=m.sibling}}break;case 19:_e(t,e),Te(e),r&4&&rs(e);break;case 21:break;default:_e(t,e),Te(e)}}function Te(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(yc(n)){var r=n;break e}n=n.return}throw Error(C(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(Rn(o,""),r.flags&=-33);var i=ns(e);Zi(e,i,o);break;case 3:case 4:var a=r.stateNode.containerInfo,s=ns(e);Xi(e,s,a);break;default:throw Error(C(161))}}catch(u){U(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Kf(e,t,n){N=e,wc(e)}function wc(e,t,n){for(var r=(e.mode&1)!==0;N!==null;){var o=N,i=o.child;if(o.tag===22&&r){var a=o.memoizedState!==null||kr;if(!a){var s=o.alternate,u=s!==null&&s.memoizedState!==null||oe;s=kr;var f=oe;if(kr=a,(oe=u)&&!f)for(N=o;N!==null;)a=N,u=a.child,a.tag===22&&a.memoizedState!==null?ls(o):u!==null?(u.return=a,N=u):ls(o);for(;i!==null;)N=i,wc(i),i=i.sibling;N=o,kr=s,oe=f}os(e)}else o.subtreeFlags&8772&&i!==null?(i.return=o,N=i):os(e)}}function os(e){for(;N!==null;){var t=N;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:oe||ko(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!oe)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:Me(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&$a(t,i,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}$a(t,a,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var f=t.alternate;if(f!==null){var p=f.memoizedState;if(p!==null){var m=p.dehydrated;m!==null&&$n(m)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(C(163))}oe||t.flags&512&&Ki(t)}catch(g){U(t,t.return,g)}}if(t===e){N=null;break}if(n=t.sibling,n!==null){n.return=t.return,N=n;break}N=t.return}}function is(e){for(;N!==null;){var t=N;if(t===e){N=null;break}var n=t.sibling;if(n!==null){n.return=t.return,N=n;break}N=t.return}}function ls(e){for(;N!==null;){var t=N;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{ko(4,t)}catch(u){U(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(u){U(t,o,u)}}var i=t.return;try{Ki(t)}catch(u){U(t,i,u)}break;case 5:var a=t.return;try{Ki(t)}catch(u){U(t,a,u)}}}catch(u){U(t,t.return,u)}if(t===e){N=null;break}var s=t.sibling;if(s!==null){s.return=t.return,N=s;break}N=t.return}}var Xf=Math.ceil,io=Ze.ReactCurrentDispatcher,Il=Ze.ReactCurrentOwner,Se=Ze.ReactCurrentBatchConfig,P=0,q=null,Q=null,ee=0,ye=0,Kt=gt(0),K=0,Jn=null,Mt=0,jo=0,Wl=0,Pn=null,fe=null,$l=0,un=1/0,We=null,lo=!1,qi=null,ct=null,jr=!1,ot=null,ao=0,Tn=0,Ji=null,Dr=-1,Rr=0;function ae(){return P&6?G():Dr!==-1?Dr:Dr=G()}function dt(e){return e.mode&1?P&2&&ee!==0?ee&-ee:Lf.transition!==null?(Rr===0&&(Rr=ou()),Rr):(e=T,e!==0||(e=window.event,e=e===void 0?16:du(e.type)),e):1}function Be(e,t,n,r){if(50<Tn)throw Tn=0,Ji=null,Error(C(185));tr(e,n,r),(!(P&2)||e!==q)&&(e===q&&(!(P&2)&&(jo|=n),K===4&&nt(e,ee)),ge(e,r),n===1&&P===0&&!(t.mode&1)&&(un=G()+500,vo&&yt()))}function ge(e,t){var n=e.callbackNode;Ad(e,t);var r=Ur(e,e===q?ee:0);if(r===0)n!==null&&ma(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&ma(n),t===1)e.tag===0?Af(as.bind(null,e)):Mu(as.bind(null,e)),Nf(function(){!(P&6)&&yt()}),n=null;else{switch(iu(r)){case 1:n=pl;break;case 4:n=nu;break;case 16:n=Hr;break;case 536870912:n=ru;break;default:n=Hr}n=Nc(n,kc.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function kc(e,t){if(Dr=-1,Rr=0,P&6)throw Error(C(327));var n=e.callbackNode;if(tn()&&e.callbackNode!==n)return null;var r=Ur(e,e===q?ee:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=so(e,r);else{t=r;var o=P;P|=2;var i=Ec();(q!==e||ee!==t)&&(We=null,un=G()+500,Ft(e,t));do try{Jf();break}catch(s){jc(e,s)}while(!0);bl(),io.current=i,P=o,Q!==null?t=0:(q=null,ee=0,t=K)}if(t!==0){if(t===2&&(o=Si(e),o!==0&&(r=o,t=el(e,o))),t===1)throw n=Jn,Ft(e,0),nt(e,r),ge(e,G()),n;if(t===6)nt(e,r);else{if(o=e.current.alternate,!(r&30)&&!Zf(o)&&(t=so(e,r),t===2&&(i=Si(e),i!==0&&(r=i,t=el(e,i))),t===1))throw n=Jn,Ft(e,0),nt(e,r),ge(e,G()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(C(345));case 2:kt(e,fe,We);break;case 3:if(nt(e,r),(r&130023424)===r&&(t=$l+500-G(),10<t)){if(Ur(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){ae(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=Bi(kt.bind(null,e,fe,We),t);break}kt(e,fe,We);break;case 4:if(nt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var a=31-Le(r);i=1<<a,a=t[a],a>o&&(o=a),r&=~i}if(r=o,r=G()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Xf(r/1960))-r,10<r){e.timeoutHandle=Bi(kt.bind(null,e,fe,We),r);break}kt(e,fe,We);break;case 5:kt(e,fe,We);break;default:throw Error(C(329))}}}return ge(e,G()),e.callbackNode===n?kc.bind(null,e):null}function el(e,t){var n=Pn;return e.current.memoizedState.isDehydrated&&(Ft(e,t).flags|=256),e=so(e,t),e!==2&&(t=fe,fe=n,t!==null&&tl(t)),e}function tl(e){fe===null?fe=e:fe.push.apply(fe,e)}function Zf(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!Pe(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function nt(e,t){for(t&=~Wl,t&=~jo,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Le(t),r=1<<n;e[n]=-1,t&=~r}}function as(e){if(P&6)throw Error(C(327));tn();var t=Ur(e,0);if(!(t&1))return ge(e,G()),null;var n=so(e,t);if(e.tag!==0&&n===2){var r=Si(e);r!==0&&(t=r,n=el(e,r))}if(n===1)throw n=Jn,Ft(e,0),nt(e,t),ge(e,G()),n;if(n===6)throw Error(C(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,kt(e,fe,We),ge(e,G()),null}function Hl(e,t){var n=P;P|=1;try{return e(t)}finally{P=n,P===0&&(un=G()+500,vo&&yt())}}function zt(e){ot!==null&&ot.tag===0&&!(P&6)&&tn();var t=P;P|=1;var n=Se.transition,r=T;try{if(Se.transition=null,T=1,e)return e()}finally{T=r,Se.transition=n,P=t,!(P&6)&&yt()}}function Ul(){ye=Kt.current,O(Kt)}function Ft(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,bf(n)),Q!==null)for(n=Q.return;n!==null;){var r=n;switch(Cl(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Kr();break;case 3:an(),O(pe),O(ie),Ll();break;case 5:Al(r);break;case 4:an();break;case 13:O(W);break;case 19:O(W);break;case 10:Nl(r.type._context);break;case 22:case 23:Ul()}n=n.return}if(q=e,Q=e=ft(e.current,null),ee=ye=t,K=0,Jn=null,Wl=jo=Mt=0,fe=Pn=null,Et!==null){for(t=0;t<Et.length;t++)if(n=Et[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var a=i.next;i.next=o,r.next=a}n.pending=r}Et=null}return e}function jc(e,t){do{var n=Q;try{if(bl(),Br.current=oo,ro){for(var r=$.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}ro=!1}if(_t=0,Z=Y=$=null,Ln=!1,Xn=0,Il.current=null,n===null||n.return===null){K=1,Jn=t,Q=null;break}e:{var i=e,a=n.return,s=n,u=t;if(t=ee,s.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var f=u,p=s,m=p.tag;if(!(p.mode&1)&&(m===0||m===11||m===15)){var g=p.alternate;g?(p.updateQueue=g.updateQueue,p.memoizedState=g.memoizedState,p.lanes=g.lanes):(p.updateQueue=null,p.memoizedState=null)}var k=Ya(a);if(k!==null){k.flags&=-257,Ka(k,a,s,i,t),k.mode&1&&Qa(i,f,t),t=k,u=f;var v=t.updateQueue;if(v===null){var j=new Set;j.add(u),t.updateQueue=j}else v.add(u);break e}else{if(!(t&1)){Qa(i,f,t),Vl();break e}u=Error(C(426))}}else if(I&&s.mode&1){var x=Ya(a);if(x!==null){!(x.flags&65536)&&(x.flags|=256),Ka(x,a,s,i,t),Fl(sn(u,s));break e}}i=u=sn(u,s),K!==4&&(K=2),Pn===null?Pn=[i]:Pn.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var d=ic(i,u,t);Wa(i,d);break e;case 1:s=u;var c=i.type,h=i.stateNode;if(!(i.flags&128)&&(typeof c.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(ct===null||!ct.has(h)))){i.flags|=65536,t&=-t,i.lanes|=t;var y=lc(i,s,t);Wa(i,y);break e}}i=i.return}while(i!==null)}Fc(n)}catch(w){t=w,Q===n&&n!==null&&(Q=n=n.return);continue}break}while(!0)}function Ec(){var e=io.current;return io.current=oo,e===null?oo:e}function Vl(){(K===0||K===3||K===2)&&(K=4),q===null||!(Mt&268435455)&&!(jo&268435455)||nt(q,ee)}function so(e,t){var n=P;P|=2;var r=Ec();(q!==e||ee!==t)&&(We=null,Ft(e,t));do try{qf();break}catch(o){jc(e,o)}while(!0);if(bl(),P=n,io.current=r,Q!==null)throw Error(C(261));return q=null,ee=0,K}function qf(){for(;Q!==null;)Cc(Q)}function Jf(){for(;Q!==null&&!Ed();)Cc(Q)}function Cc(e){var t=bc(e.alternate,e,ye);e.memoizedProps=e.pendingProps,t===null?Fc(e):Q=t,Il.current=null}function Fc(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Gf(n,t),n!==null){n.flags&=32767,Q=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{K=6,Q=null;return}}else if(n=Vf(n,t,ye),n!==null){Q=n;return}if(t=t.sibling,t!==null){Q=t;return}Q=t=e}while(t!==null);K===0&&(K=5)}function kt(e,t,n){var r=T,o=Se.transition;try{Se.transition=null,T=1,eh(e,t,n,r)}finally{Se.transition=o,T=r}return null}function eh(e,t,n,r){do tn();while(ot!==null);if(P&6)throw Error(C(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(C(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Ld(e,i),e===q&&(Q=q=null,ee=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||jr||(jr=!0,Nc(Hr,function(){return tn(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Se.transition,Se.transition=null;var a=T;T=1;var s=P;P|=4,Il.current=null,Yf(e,n),xc(n,e),wf(Ai),Vr=!!zi,Ai=zi=null,e.current=n,Kf(n),Cd(),P=s,T=a,Se.transition=i}else e.current=n;if(jr&&(jr=!1,ot=e,ao=o),i=e.pendingLanes,i===0&&(ct=null),bd(n.stateNode),ge(e,G()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(lo)throw lo=!1,e=qi,qi=null,e;return ao&1&&e.tag!==0&&tn(),i=e.pendingLanes,i&1?e===Ji?Tn++:(Tn=0,Ji=e):Tn=0,yt(),null}function tn(){if(ot!==null){var e=iu(ao),t=Se.transition,n=T;try{if(Se.transition=null,T=16>e?16:e,ot===null)var r=!1;else{if(e=ot,ot=null,ao=0,P&6)throw Error(C(331));var o=P;for(P|=4,N=e.current;N!==null;){var i=N,a=i.child;if(N.flags&16){var s=i.deletions;if(s!==null){for(var u=0;u<s.length;u++){var f=s[u];for(N=f;N!==null;){var p=N;switch(p.tag){case 0:case 11:case 15:Bn(8,p,i)}var m=p.child;if(m!==null)m.return=p,N=m;else for(;N!==null;){p=N;var g=p.sibling,k=p.return;if(gc(p),p===f){N=null;break}if(g!==null){g.return=k,N=g;break}N=k}}}var v=i.alternate;if(v!==null){var j=v.child;if(j!==null){v.child=null;do{var x=j.sibling;j.sibling=null,j=x}while(j!==null)}}N=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,N=a;else e:for(;N!==null;){if(i=N,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Bn(9,i,i.return)}var d=i.sibling;if(d!==null){d.return=i.return,N=d;break e}N=i.return}}var c=e.current;for(N=c;N!==null;){a=N;var h=a.child;if(a.subtreeFlags&2064&&h!==null)h.return=a,N=h;else e:for(a=c;N!==null;){if(s=N,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:ko(9,s)}}catch(w){U(s,s.return,w)}if(s===a){N=null;break e}var y=s.sibling;if(y!==null){y.return=s.return,N=y;break e}N=s.return}}if(P=o,yt(),Oe&&typeof Oe.onPostCommitFiberRoot=="function")try{Oe.onPostCommitFiberRoot(ho,e)}catch{}r=!0}return r}finally{T=n,Se.transition=t}}return!1}function ss(e,t,n){t=sn(n,t),t=ic(e,t,1),e=ut(e,t,1),t=ae(),e!==null&&(tr(e,1,t),ge(e,t))}function U(e,t,n){if(e.tag===3)ss(e,e,n);else for(;t!==null;){if(t.tag===3){ss(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ct===null||!ct.has(r))){e=sn(n,e),e=lc(t,e,1),t=ut(t,e,1),e=ae(),t!==null&&(tr(t,1,e),ge(t,e));break}}t=t.return}}function th(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=ae(),e.pingedLanes|=e.suspendedLanes&n,q===e&&(ee&n)===n&&(K===4||K===3&&(ee&130023424)===ee&&500>G()-$l?Ft(e,0):Wl|=n),ge(e,t)}function Sc(e,t){t===0&&(e.mode&1?(t=fr,fr<<=1,!(fr&130023424)&&(fr=4194304)):t=1);var n=ae();e=Ye(e,t),e!==null&&(tr(e,t,n),ge(e,n))}function nh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),Sc(e,n)}function rh(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(C(314))}r!==null&&r.delete(t),Sc(e,n)}var bc;bc=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||pe.current)he=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return he=!1,Uf(e,t,n);he=!!(e.flags&131072)}else he=!1,I&&t.flags&1048576&&zu(t,qr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Tr(e,t),e=t.pendingProps;var o=rn(t,ie.current);en(t,n),o=Pl(null,t,r,e,o,n);var i=Tl();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,me(r)?(i=!0,Xr(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ml(t),o.updater=wo,t.stateNode=o,o._reactInternals=t,Wi(t,r,e,n),t=Ui(null,t,r,!0,i,n)):(t.tag=0,I&&i&&El(t),le(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Tr(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=ih(r),e=Me(r,e),o){case 0:t=Hi(null,t,r,e,n);break e;case 1:t=qa(null,t,r,e,n);break e;case 11:t=Xa(null,t,r,e,n);break e;case 14:t=Za(null,t,r,Me(r.type,e),n);break e}throw Error(C(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Me(r,o),Hi(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Me(r,o),qa(e,t,r,o,n);case 3:e:{if(cc(t),e===null)throw Error(C(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Du(e,t),to(t,r,null,n);var a=t.memoizedState;if(r=a.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=sn(Error(C(423)),t),t=Ja(e,t,r,n,o);break e}else if(r!==o){o=sn(Error(C(424)),t),t=Ja(e,t,r,n,o);break e}else for(ve=st(t.stateNode.containerInfo.firstChild),xe=t,I=!0,Ae=null,n=Pu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(on(),r===o){t=Ke(e,t,n);break e}le(e,t,r,n)}t=t.child}return t;case 5:return Ru(t),e===null&&Ri(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,a=o.children,Li(r,o)?a=null:i!==null&&Li(r,i)&&(t.flags|=32),uc(e,t),le(e,t,a,n),t.child;case 6:return e===null&&Ri(t),null;case 13:return dc(e,t,n);case 4:return zl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=ln(t,null,r,n):le(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Me(r,o),Xa(e,t,r,o,n);case 7:return le(e,t,t.pendingProps,n),t.child;case 8:return le(e,t,t.pendingProps.children,n),t.child;case 12:return le(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value,D(Jr,r._currentValue),r._currentValue=a,i!==null)if(Pe(i.value,a)){if(i.children===o.children&&!pe.current){t=Ke(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){a=i.child;for(var u=s.firstContext;u!==null;){if(u.context===r){if(i.tag===1){u=Ve(-1,n&-n),u.tag=2;var f=i.updateQueue;if(f!==null){f=f.shared;var p=f.pending;p===null?u.next=u:(u.next=p.next,p.next=u),f.pending=u}}i.lanes|=n,u=i.alternate,u!==null&&(u.lanes|=n),Oi(i.return,n,t),s.lanes|=n;break}u=u.next}}else if(i.tag===10)a=i.type===t.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(C(341));a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),Oi(a,n,t),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===t){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}le(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,en(t,n),o=be(o),r=r(o),t.flags|=1,le(e,t,r,n),t.child;case 14:return r=t.type,o=Me(r,t.pendingProps),o=Me(r.type,o),Za(e,t,r,o,n);case 15:return ac(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:Me(r,o),Tr(e,t),t.tag=1,me(r)?(e=!0,Xr(t)):e=!1,en(t,n),oc(t,r,o),Wi(t,r,o,n),Ui(null,t,r,!0,e,n);case 19:return fc(e,t,n);case 22:return sc(e,t,n)}throw Error(C(156,t.tag))};function Nc(e,t){return tu(e,t)}function oh(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Fe(e,t,n,r){return new oh(e,t,n,r)}function Gl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function ih(e){if(typeof e=="function")return Gl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===dl)return 11;if(e===fl)return 14}return 2}function ft(e,t){var n=e.alternate;return n===null?(n=Fe(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Or(e,t,n,r,o,i){var a=2;if(r=e,typeof e=="function")Gl(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Ot:return St(n.children,o,i,t);case cl:a=8,o|=8;break;case di:return e=Fe(12,n,t,o|2),e.elementType=di,e.lanes=i,e;case fi:return e=Fe(13,n,t,o),e.elementType=fi,e.lanes=i,e;case hi:return e=Fe(19,n,t,o),e.elementType=hi,e.lanes=i,e;case Rs:return Eo(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ts:a=10;break e;case Ds:a=9;break e;case dl:a=11;break e;case fl:a=14;break e;case Je:a=16,r=null;break e}throw Error(C(130,e==null?e:typeof e,""))}return t=Fe(a,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function St(e,t,n,r){return e=Fe(7,e,r,t),e.lanes=n,e}function Eo(e,t,n,r){return e=Fe(22,e,r,t),e.elementType=Rs,e.lanes=n,e.stateNode={isHidden:!1},e}function ii(e,t,n){return e=Fe(6,e,null,t),e.lanes=n,e}function li(e,t,n){return t=Fe(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function lh(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Io(0),this.expirationTimes=Io(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Io(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function Ql(e,t,n,r,o,i,a,s,u){return e=new lh(e,t,n,s,u),t===1?(t=1,i===!0&&(t|=8)):t=0,i=Fe(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ml(i),e}function ah(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Rt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function _c(e){if(!e)return pt;e=e._reactInternals;e:{if(Bt(e)!==e||e.tag!==1)throw Error(C(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(me(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(C(171))}if(e.tag===1){var n=e.type;if(me(n))return _u(e,n,t)}return t}function Mc(e,t,n,r,o,i,a,s,u){return e=Ql(n,r,!0,e,o,i,a,s,u),e.context=_c(null),n=e.current,r=ae(),o=dt(n),i=Ve(r,o),i.callback=t??null,ut(n,i,o),e.current.lanes=o,tr(e,o,r),ge(e,r),e}function Co(e,t,n,r){var o=t.current,i=ae(),a=dt(o);return n=_c(n),t.context===null?t.context=n:t.pendingContext=n,t=Ve(i,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ut(o,t,a),e!==null&&(Be(e,o,a,i),Lr(e,o,a)),a}function uo(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function us(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Yl(e,t){us(e,t),(e=e.alternate)&&us(e,t)}function sh(){return null}var zc=typeof reportError=="function"?reportError:function(e){console.error(e)};function Kl(e){this._internalRoot=e}Fo.prototype.render=Kl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(C(409));Co(e,t,null,null)};Fo.prototype.unmount=Kl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zt(function(){Co(null,e,null,null)}),t[Qe]=null}};function Fo(e){this._internalRoot=e}Fo.prototype.unstable_scheduleHydration=function(e){if(e){var t=su();e={blockedOn:null,target:e,priority:t};for(var n=0;n<tt.length&&t!==0&&t<tt[n].priority;n++);tt.splice(n,0,e),n===0&&cu(e)}};function Xl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function So(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cs(){}function uh(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var f=uo(a);i.call(f)}}var a=Mc(t,r,e,0,null,!1,!1,"",cs);return e._reactRootContainer=a,e[Qe]=a.current,Vn(e.nodeType===8?e.parentNode:e),zt(),a}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var f=uo(u);s.call(f)}}var u=Ql(e,0,!1,null,null,!1,!1,"",cs);return e._reactRootContainer=u,e[Qe]=u.current,Vn(e.nodeType===8?e.parentNode:e),zt(function(){Co(t,u,n,r)}),u}function bo(e,t,n,r,o){var i=n._reactRootContainer;if(i){var a=i;if(typeof o=="function"){var s=o;o=function(){var u=uo(a);s.call(u)}}Co(t,a,e,o)}else a=uh(n,t,e,o,r);return uo(a)}lu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Sn(t.pendingLanes);n!==0&&(ml(t,n|1),ge(t,G()),!(P&6)&&(un=G()+500,yt()))}break;case 13:zt(function(){var r=Ye(e,1);if(r!==null){var o=ae();Be(r,e,1,o)}}),Yl(e,1)}};gl=function(e){if(e.tag===13){var t=Ye(e,134217728);if(t!==null){var n=ae();Be(t,e,134217728,n)}Yl(e,134217728)}};au=function(e){if(e.tag===13){var t=dt(e),n=Ye(e,t);if(n!==null){var r=ae();Be(n,e,t,r)}Yl(e,t)}};su=function(){return T};uu=function(e,t){var n=T;try{return T=e,t()}finally{T=n}};Ei=function(e,t,n){switch(t){case"input":if(gi(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=yo(r);if(!o)throw Error(C(90));Is(r),gi(r,o)}}}break;case"textarea":$s(e,n);break;case"select":t=n.value,t!=null&&Xt(e,!!n.multiple,t,!1)}};Ks=Hl;Xs=zt;var ch={usingClientEntryPoint:!1,Events:[rr,Ht,yo,Qs,Ys,Hl]},En={findFiberByHostInstance:jt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},dh={bundleType:En.bundleType,version:En.version,rendererPackageName:En.rendererPackageName,rendererConfig:En.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ze.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Js(e),e===null?null:e.stateNode},findFiberByHostInstance:En.findFiberByHostInstance||sh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Er=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Er.isDisabled&&Er.supportsFiber)try{ho=Er.inject(dh),Oe=Er}catch{}}ke.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ch;ke.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Xl(t))throw Error(C(200));return ah(e,t,null,n)};ke.createRoot=function(e,t){if(!Xl(e))throw Error(C(299));var n=!1,r="",o=zc;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=Ql(e,1,!1,null,null,n,!1,r,o),e[Qe]=t.current,Vn(e.nodeType===8?e.parentNode:e),new Kl(t)};ke.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(C(188)):(e=Object.keys(e).join(","),Error(C(268,e)));return e=Js(t),e=e===null?null:e.stateNode,e};ke.flushSync=function(e){return zt(e)};ke.hydrate=function(e,t,n){if(!So(t))throw Error(C(200));return bo(null,e,t,!0,n)};ke.hydrateRoot=function(e,t,n){if(!Xl(e))throw Error(C(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",a=zc;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=Mc(t,null,e,1,n??null,o,!1,i,a),e[Qe]=t.current,Vn(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new Fo(t)};ke.render=function(e,t,n){if(!So(t))throw Error(C(200));return bo(null,e,t,!1,n)};ke.unmountComponentAtNode=function(e){if(!So(e))throw Error(C(40));return e._reactRootContainer?(zt(function(){bo(null,null,e,!1,function(){e._reactRootContainer=null,e[Qe]=null})}),!0):!1};ke.unstable_batchedUpdates=Hl;ke.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!So(n))throw Error(C(200));if(e==null||e._reactInternals===void 0)throw Error(C(38));return bo(e,t,n,!1,r)};ke.version="18.3.1-next-f1338f8080-20240426";function Ac(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ac)}catch(e){console.error(e)}}Ac(),As.exports=ke;var fh=As.exports,Lc,ds=fh;Lc=ds.createRoot,ds.hydrateRoot;const hh="modulepreload",ph=function(e){return"/hamna-birthday/"+e},fs={},mh=function(t,n,r){let o=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),s=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));o=Promise.allSettled(n.map(u=>{if(u=ph(u),u in fs)return;fs[u]=!0;const f=u.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${p}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":hh,f||(m.as="script"),m.crossOrigin="",m.href=u,s&&m.setAttribute("nonce",s),document.head.appendChild(m),f)return new Promise((g,k)=>{m.addEventListener("load",g),m.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(a){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=a,window.dispatchEvent(s),!s.defaultPrevented)throw a}return o.then(a=>{for(const s of a||[])s.status==="rejected"&&i(s.reason);return t().catch(i)})},gh="/hamna-birthday/assets/happy-birthday-DU38Z9_-.mp3",yh="/hamna-birthday/assets/1-1400-jxvOGpQV.webp",vh="/hamna-birthday/assets/1-480-sLRTVJOO.webp",xh="/hamna-birthday/assets/1-900-BC6VdEbh.webp",wh="/hamna-birthday/assets/2-1400-DUL9RsUj.webp",kh="/hamna-birthday/assets/2-480-C908prUq.webp",jh="/hamna-birthday/assets/2-900-Bn7AWgeu.webp",Eh="/hamna-birthday/assets/3-1400-BoRLgLZW.webp",Ch="/hamna-birthday/assets/3-480-BqwB3-5t.webp",Fh="/hamna-birthday/assets/3-900-BKKyTKKX.webp",Sh="/hamna-birthday/assets/4-1400-DvRTl7t4.webp",bh="/hamna-birthday/assets/4-480-D6ZfCr0v.webp",Nh="/hamna-birthday/assets/4-900-b-0z21Cz.webp",_h="/hamna-birthday/assets/5-1400-CHUdHeAw.webp",Mh="/hamna-birthday/assets/5-480-BUytZ_Mc.webp",zh="/hamna-birthday/assets/5-900-CX755WsD.webp",Ah="/hamna-birthday/assets/6-1400-JFQsJY2f.webp",Lh="/hamna-birthday/assets/6-480-Bn3QE2Kh.webp",Bh="/hamna-birthday/assets/6-900-BJ2MER8V.webp",Ph="/hamna-birthday/assets/1-1400-CjNn64Jo.jpg",Th="/hamna-birthday/assets/2-1400-UV-9tlOh.jpg",Dh="/hamna-birthday/assets/3-1400-gXGJBYLm.jpg",Rh="/hamna-birthday/assets/4-1400-CyHzKjzJ.jpg",Oh="/hamna-birthday/assets/5-1400-CiZtp5mA.jpg",Ih="/hamna-birthday/assets/6-1400-C0rIPGNI.jpg",ai=Object.assign({"./1-1400.webp":yh,"./1-480.webp":vh,"./1-900.webp":xh,"./2-1400.webp":wh,"./2-480.webp":kh,"./2-900.webp":jh,"./3-1400.webp":Eh,"./3-480.webp":Ch,"./3-900.webp":Fh,"./4-1400.webp":Sh,"./4-480.webp":bh,"./4-900.webp":Nh,"./5-1400.webp":_h,"./5-480.webp":Mh,"./5-900.webp":zh,"./6-1400.webp":Ah,"./6-480.webp":Lh,"./6-900.webp":Bh}),Bc=Object.assign({"./1-1400.jpg":Ph,"./2-1400.jpg":Th,"./3-1400.jpg":Dh,"./4-1400.jpg":Rh,"./5-1400.jpg":Oh,"./6-1400.jpg":Ih}),Cr=(e,t)=>e[`./${t}`],Zl=Object.keys(Bc).length;function Wh(e){const t=[];for(let n=0;n<e;n++){const r=Math.floor(n/2),o=n%2===1,i=Math.ceil(e/2),a=r/Math.max(1,i-1)*6;t.push({row:r,side:o?1:0,x:o?50-a+r%2*5:5+a+r%2*6,rot:[-6.5,4.2,-3.1,7.4,-5.2,2.8,-4.4,6.1][n%8],scale:[1,1.09,.93,.88,1.04,.96,1.01,.9][n%8]})}return t}const $h=Math.ceil(Zl/2),Hh=["Hamna in a blush pink coat on a winter morning","Hamna in an orange embroidered suit","Hamna in a red jacket","Hamna outdoors in black florals","Hamna against an open sky","Hamna out on an evening walk"],Uh=Wh(Zl),de=Array.from({length:Zl},(e,t)=>{const n=t+1,r=Cr(ai,`${n}-480.webp`),o=Cr(ai,`${n}-900.webp`),i=Cr(ai,`${n}-1400.webp`);return{id:t,webp:`${r} 480w, ${o} 900w, ${i} 1400w`,src:Cr(Bc,`${n}-1400.jpg`),thumb:r,w:1400,h:1867,alt:Hh[t]||`Hamna, photo ${n}`,...Uh[t]}}),At="Hamna",No="Albatross",Vh=["cake","gallery","letter","wishes"],Gh=["one","two","three","four","five","six","seven"],_o=e=>{const t=Vh.indexOf(e);return t<0?"":`Chapter ${Gh[t]}`},Pc="the fourth of October",si=9,ui=4,Qh="(max-width: 760px) 78vw, (max-width: 1100px) 30vw, 300px",Yh="(max-width: 700px) 86vw, 700px",hs=Object.assign({"./assets/audio/happy-birthday.mp3":gh}),ps=Object.keys(hs).sort().map(e=>hs[e])[0]||"";function Kh(){const[e,t]=S.useState(()=>typeof window<"u"&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);return S.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)"),r=()=>t(n.matches);return n.addEventListener("change",r),()=>n.removeEventListener("change",r)},[]),e}function Xh(){return S.useMemo(()=>{if(typeof window>"u")return!0;const e=window.matchMedia("(pointer: coarse)").matches,t=navigator.hardwareConcurrency,n=navigator.deviceMemory,r=typeof t=="number"&&t>0&&t<=4,o=typeof n=="number"&&n>0&&n<=4;return e||r||o},[])}function ql(e="25%"){const t=S.useRef(null),[n,r]=S.useState(!1);return S.useEffect(()=>{const o=t.current;if(!o||!("IntersectionObserver"in window))return;const i=new IntersectionObserver(([a])=>r(!a.isIntersecting),{rootMargin:`${e} 0px`});return i.observe(o),()=>i.disconnect()},[e]),[t,n]}function Zh(e,{pad:t=0,enabled:n=!0}={}){S.useEffect(()=>{const r=e.current;if(!r)return;if(!n){r.style.minHeight="";return}const o=()=>{let s=0;const u=r.getBoundingClientRect().top+window.scrollY;for(const f of r.children){const p=f.getBoundingClientRect(),m=p.top+window.scrollY+p.height-u;m>s&&(s=m)}s>0&&(r.style.minHeight=`${Math.ceil(s+t)}px`)},i=requestAnimationFrame(o),a="ResizeObserver"in window?new ResizeObserver(o):null;return a==null||a.observe(r),window.addEventListener("resize",o,{passive:!0}),()=>{cancelAnimationFrame(i),a==null||a.disconnect(),window.removeEventListener("resize",o)}},[e,t,n]),S.useEffect(()=>()=>{e.current&&(e.current.style.minHeight="")},[e])}function Mo(e){const t=S.useRef(null),[n,r]=S.useState(!1);return S.useEffect(()=>{const o=t.current;if(!o)return;if(!("IntersectionObserver"in window)){r(!0);return}const i=new IntersectionObserver(([a])=>{a.isIntersecting&&(r(!0),i.disconnect())},{threshold:.01,rootMargin:"0px 0px 26% 0px",...e});return i.observe(o),()=>i.disconnect()},[e]),[t,n]}const qh=[["G4",.5],["G4",.5],["A4",1],["G4",1],["C5",1],["B4",2],["G4",.5],["G4",.5],["A4",1],["G4",1],["D5",1],["C5",2],["G4",.5],["G4",.5],["G5",1],["E5",1],["C5",1],["B4",1],["A4",2],["F5",.5],["F5",.5],["E5",1],["C5",1],["D5",1],["C5",3]],Jh={C:0,D:2,E:4,F:5,G:7,A:9,B:11},ep=e=>{const t=Jh[e[0]]+(parseInt(e[1],10)+1)*12;return 440*Math.pow(2,(t-69)/12)},Xe=(()=>{let e=null,t=null,n=null,r=[],o=0,i=0,a=!1,s=!1;const u=new Set,f=()=>u.forEach(x=>x({muted:a,blocked:s,playing:j()}));function p(){ps&&!e&&(e=new Audio(ps),e.preload="auto",e.loop=!0,e.volume=.55,e.addEventListener("error",()=>{e=null}),e.load())}function m(){if(t)return t;const x=window.AudioContext||window.webkitAudioContext;return x?(t=new x,n=t.createGain(),n.gain.value=a?0:.32,n.connect(t.destination),t):null}function g(x,d,c,h=1){const y=t.createOscillator(),w=t.createOscillator(),E=t.createGain();y.type="triangle",y.frequency.value=x,w.type="sine",w.frequency.value=x*2.004,E.gain.setValueAtTime(1e-4,d),E.gain.exponentialRampToValueAtTime(.9*h,d+.012),E.gain.exponentialRampToValueAtTime(1e-4,d+c*.98),y.connect(E),w.connect(E),E.connect(n),y.start(d),w.start(d),y.stop(d+c),w.stop(d+c),r.push(y,w)}function k(x){let c=x+.12;qh.forEach(([h,y])=>{g(ep(h),c,Math.max(.42,y*.58*1.25)),c+=y*.58}),o=x,i=c-x}function v(){r.forEach(x=>{try{x.stop()}catch{}try{x.disconnect()}catch{}}),r=[]}function j(){return e&&!e.paused?!0:t&&i?t.currentTime-o<i:!1}return{prime:p,subscribe(x){return u.add(x),()=>u.delete(x)},get state(){return{muted:a,blocked:s,playing:j()}},unlockAndPlay(){const x=m();if(x&&x.state==="suspended"&&x.resume().catch(()=>{}),e){const d=e.play();d&&typeof d.catch=="function"&&d.then(()=>{s=!1,f()}).catch(()=>{s=!0,x&&(v(),k(x.currentTime),s=!1),f()})}else x?(v(),k(x.currentTime)):s=!0;f()},resyncOrRestart(){const x=m();if(x&&x.state==="suspended"&&x.resume().catch(()=>{}),!j()){if(e){e.currentTime=0;const d=e.play();d&&d.catch&&d.catch(()=>{x&&(v(),k(x.currentTime))})}else x&&(v(),k(x.currentTime));f()}},chime(x=1318.5){const d=m();if(!d||a)return;d.state==="suspended"&&d.resume().catch(()=>{});const c=d.currentTime;[1,1.5,2.02].forEach((h,y)=>g(x*h,c+y*.05,1.1,.22))},toggleMute(){return a=!a,n&&n.gain.setTargetAtTime(a?0:.32,t.currentTime,.04),e&&(e.muted=a),s&&!a&&(s=!1,this.unlockAndPlay()),f(),a}}})();function tp(){const[e,t]=S.useState(Xe.state);return S.useEffect(()=>Xe.subscribe(t),[]),e}const Tc=S.createContext(null),hn=()=>S.useContext(Tc),Fr=["#F3D9A4","#EAB765","#FFFFFF","#CBDCFA","#F6C9D6","#A9C2F0"],Sr=["#D98BA6","#C79A5B","#FFFFFF","#EBD3A4","#A9647F","#F6D5E0","#C98A72"];function np({enabled:e,budget:t}){const n=S.useRef(null),r=hn();return S.useEffect(()=>{const o=n.current;if(!o||!e)return;const i=o.getContext("2d",{alpha:!0});let a=Math.min(window.devicePixelRatio||1,2),s=0,u=0,f=0;performance.now();const p=()=>{const c=o.clientWidth,h=o.clientHeight;if(!c||!h)return;a=Math.min(window.devicePixelRatio||1,2);const y=Math.floor(c*a),w=Math.floor(h*a);o.width===y&&o.height===w||(s=c,u=h,o.width=y,o.height=w,i.setTransform(a,0,0,a,0,0))};p();let m=null;"ResizeObserver"in window&&(m=new ResizeObserver(p),m.observe(o)),window.addEventListener("resize",p);const g=window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);g.addEventListener&&g.addEventListener("change",p);const k=new Array(t).fill(null).map(()=>({on:!1,x:0,y:0,vx:0,vy:0,life:0,max:1,size:2,spin:0,rot:0,color:"#fff",kind:"dust",drag:.98,grav:0}));let v=0;const j=()=>{for(let c=0;c<k.length;c++){const h=k[(v+c)%k.length];if(!h.on)return v=(v+c+1)%k.length,h}return null};r.current={dust(c,h,y=1){for(let w=0;w<y;w++){const E=j();if(!E)return;E.on=!0,E.kind="dust",E.x=c+(Math.random()-.5)*10,E.y=h+(Math.random()-.5)*10,E.vx=(Math.random()-.5)*22,E.vy=(Math.random()-.5)*22-14,E.life=0,E.max=.7+Math.random()*.7,E.size=1+Math.random()*2.2,E.color=Fr[Math.random()*Fr.length|0],E.drag=.94,E.grav=-8}},burst(c,h,y=60,w=340,E=!1){for(let b=0;b<y;b++){const F=j();if(!F)return;const A=Math.random()*Math.PI*2,M=w*(.25+Math.random()*.75);F.on=!0,F.kind=E&&b%5===0?"heart":"spark",F.x=c,F.y=h,F.vx=Math.cos(A)*M,F.vy=Math.sin(A)*M,F.life=0,F.max=.9+Math.random()*1.1,F.size=F.kind==="heart"?5+Math.random()*5:1.4+Math.random()*2.6,F.rot=Math.random()*6.28,F.spin=(Math.random()-.5)*6,F.color=Fr[Math.random()*Fr.length|0],F.drag=.965,F.grav=260}},spray(c,h,y,w,E,b){for(let F=0;F<y;F++){const A=j();if(!A)return;const M=w+(Math.random()-.5)*E,ce=b*(.55+Math.random()*.75);A.on=!0,A.kind="spark",A.x=c,A.y=h,A.vx=Math.cos(M)*ce,A.vy=Math.sin(M)*ce,A.life=0,A.max=1.1+Math.random()*.9,A.size=1.8+Math.random()*2.8,A.color=Sr[Math.random()*Sr.length|0],A.drag=.975,A.grav=300}},confetti(c,h){const y=j();y&&(y.on=!0,y.kind="confetti",y.x=c,y.y=h,y.vx=(Math.random()-.5)*90,y.vy=90+Math.random()*130,y.life=0,y.max=3.4+Math.random()*1.8,y.size=4+Math.random()*5,y.rot=Math.random()*6.28,y.spin=(Math.random()-.5)*9,y.color=Sr[Math.random()*Sr.length|0],y.drag=.995,y.grav=90)},rocket(c,h,y){const w=j();return w?(w.on=!0,w.kind="comet",w.x=c,w.y=h,w.vx=(Math.random()-.5)*60,w.vy=-y,w.life=0,w.max=.9,w.size=2.6,w.color="#FFF3D2",w.drag=.985,w.grav=320,620+Math.random()*160):700},petal(c,h){const y=j();y&&(y.on=!0,y.kind="petal",y.x=c,y.y=h,y.vx=(Math.random()-.5)*24,y.vy=22+Math.random()*26,y.life=0,y.max=8+Math.random()*6,y.size=5+Math.random()*6,y.rot=Math.random()*6.28,y.spin=(Math.random()-.5)*1.4,y.color=Math.random()>.5?"#F6C9D6":"#FBE7C9",y.drag=1,y.grav=4)}};const x=c=>{if(!s||!u){f=requestAnimationFrame(x);return}{f=requestAnimationFrame(x);return}};f=requestAnimationFrame(x);const d=setInterval(()=>{document.hidden||r.current.petal(Math.random()*s,-20)},t>140?900:1800);return()=>{cancelAnimationFrame(f),clearInterval(d),m&&m.disconnect(),window.removeEventListener("resize",p),g.removeEventListener&&g.removeEventListener("change",p),r.current=null}},[e,t,r]),e?l.jsx("canvas",{ref:n,className:"hm-particles","aria-hidden":"true"}):null}const ms=Math.min(6,Math.max(3,de.length)),rp=260;function op({enabled:e}){const t=S.useRef(null),n=S.useRef(null),r=hn(),[o,i]=S.useState(0),a=S.useRef({x:-200,y:-200,dx:-200,dy:-200,px:-200,py:-200,zone:0,zoneSince:0,seen:!1});return S.useEffect(()=>{if(!e)return;const s=a.current;let u=0;const f=g=>{s.x=g.clientX,s.y=g.clientY,s.seen=!0,u||(u=requestAnimationFrame(m))},p=()=>{s.seen=!1};window.addEventListener("pointermove",f,{passive:!0}),document.addEventListener("pointerleave",p);const m=g=>{if(s.dx+=(s.x-s.dx)*.42,s.dy+=(s.y-s.dy)*.42,s.px+=(s.x-s.px)*.14,s.py+=(s.y-s.py)*.14,t.current&&(t.current.style.transform=`translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`),n.current){const v=Math.max(-14,Math.min(14,(s.x-s.px)*.07));n.current.style.transform=`translate3d(${s.px}px, ${s.py}px, 0) translate(-50%, -50%) rotate(${v}deg)`,n.current.style.opacity=s.seen?"0.94":"0"}const k=Math.min(ms-1,Math.max(0,Math.floor(s.x/window.innerWidth*ms)));k!==s.zone?s.zoneSince?g-s.zoneSince>rp&&(s.zone=k,s.zoneSince=0,i(k%de.length)):s.zoneSince=g:s.zoneSince=0,Math.abs(s.x-s.dx)+Math.abs(s.y-s.dy)>1.2&&r.current&&r.current.dust(s.dx,s.dy,1),u=requestAnimationFrame(m)};return u=requestAnimationFrame(m),()=>{cancelAnimationFrame(u),window.removeEventListener("pointermove",f),document.removeEventListener("pointerleave",p)}},[e,r]),e?l.jsxs(l.Fragment,{children:[l.jsx("div",{ref:t,className:"hm-cursor-dot","aria-hidden":"true"}),l.jsx("div",{ref:n,className:"hm-cursor-photo","aria-hidden":"true",children:de.map((s,u)=>l.jsx("img",{className:u===o?"is-active":"",src:s.thumb||s.src,alt:"",width:s.w,height:s.h,decoding:"async"},s.id))})]}):null}const Pt=e=>l.jsxs("svg",{viewBox:"0 0 64 40",fill:"none","aria-hidden":"true",...e,children:[l.jsx("path",{d:"M6 30c8 2 16 1 24-3 6-3 10-8 16-11 5-2.5 10-2 13 1 2.5 2.5 2 6-1 8-6 4-14 6-22 7-9 1.2-18 1.4-27 1-2.5-.1-3.6-2.4-3-3z",fill:"currentColor",opacity:".9"}),l.jsx("path",{d:"M46 16c2-4 6-8 10-9",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",opacity:".7"}),l.jsx("circle",{cx:"57",cy:"6",r:"2.2",fill:"currentColor"})]}),zo=e=>l.jsxs("svg",{viewBox:"0 0 40 40",fill:"none","aria-hidden":"true",...e,children:[l.jsx("path",{d:"M6 34 26 14",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round"}),l.jsx("path",{d:"M30 4l2.2 5.6L38 12l-5.8 2.4L30 20l-2.2-5.6L22 12l5.8-2.4z",fill:"currentColor"}),l.jsx("circle",{cx:"16",cy:"26",r:"1.3",fill:"currentColor",opacity:".6"})]}),Jl=e=>l.jsxs("svg",{viewBox:"0 0 72 40",fill:"none","aria-hidden":"true",...e,children:[l.jsx("path",{d:"M8 32 4 10l14 10L36 4l18 16 14-10-4 22z",stroke:"currentColor",strokeWidth:"1.6",strokeLinejoin:"round",fill:"none"}),l.jsx("circle",{cx:"36",cy:"4",r:"2.6",fill:"currentColor"}),l.jsx("circle",{cx:"4",cy:"10",r:"2.2",fill:"currentColor"}),l.jsx("circle",{cx:"68",cy:"10",r:"2.2",fill:"currentColor"}),l.jsx("circle",{cx:"22",cy:"27",r:"1.6",fill:"currentColor",opacity:".7"}),l.jsx("circle",{cx:"36",cy:"25",r:"1.9",fill:"currentColor",opacity:".7"}),l.jsx("circle",{cx:"50",cy:"27",r:"1.6",fill:"currentColor",opacity:".7"})]}),nl=e=>l.jsxs("svg",{viewBox:"0 0 60 48",fill:"none","aria-hidden":"true",...e,children:[l.jsxs("g",{className:"hm-wing hm-wing-l",children:[l.jsx("path",{d:"M30 24C22 6 6 4 4 14c-2 9 12 14 26 10z",fill:"currentColor",opacity:".55"}),l.jsx("path",{d:"M30 24C22 40 10 44 7 37c-3-7 9-11 23-13z",fill:"currentColor",opacity:".4"})]}),l.jsxs("g",{className:"hm-wing hm-wing-r",children:[l.jsx("path",{d:"M30 24c8-18 24-20 26-10 2 9-12 14-26 10z",fill:"currentColor",opacity:".55"}),l.jsx("path",{d:"M30 24c8 16 20 20 23 13 3-7-9-11-23-13z",fill:"currentColor",opacity:".4"})]}),l.jsx("ellipse",{cx:"30",cy:"24",rx:"1.6",ry:"7",fill:"currentColor",opacity:".8"})]});function ip({className:e="",...t}){return l.jsxs("svg",{viewBox:"0 0 130 320",className:`hm-doll hm-doll-a ${e}`,fill:"none","aria-hidden":"true",...t,children:[l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"aGown",x1:".15",y1:"0",x2:".9",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#FFF3F7"}),l.jsx("stop",{offset:".3",stopColor:"#FBD3E2"}),l.jsx("stop",{offset:".68",stopColor:"#E28FAE"}),l.jsx("stop",{offset:"1",stopColor:"#A8567C"})]}),l.jsxs("linearGradient",{id:"aBodice",x1:"0",y1:"0",x2:"1",y2:".3",children:[l.jsx("stop",{offset:"0",stopColor:"#B0648A"}),l.jsx("stop",{offset:".42",stopColor:"#F3B7CD"}),l.jsx("stop",{offset:"1",stopColor:"#C46E92"})]}),l.jsxs("linearGradient",{id:"aHair",x1:".15",y1:"0",x2:".85",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#4A2334"}),l.jsx("stop",{offset:".5",stopColor:"#6B3648"}),l.jsx("stop",{offset:"1",stopColor:"#95505F"})]}),l.jsxs("linearGradient",{id:"aHairBack",x1:".2",y1:"0",x2:".8",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#3A1D2A"}),l.jsx("stop",{offset:"1",stopColor:"#5E3446"})]}),l.jsxs("linearGradient",{id:"aSkin",x1:".1",y1:"0",x2:".9",y2:".4",children:[l.jsx("stop",{offset:"0",stopColor:"#FBE0CF"}),l.jsx("stop",{offset:".5",stopColor:"#F5CDB4"}),l.jsx("stop",{offset:"1",stopColor:"#E3B197"})]}),l.jsxs("linearGradient",{id:"aSleeve",x1:".2",y1:"0",x2:".8",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#FBD9E6"}),l.jsx("stop",{offset:"1",stopColor:"#C46E92"})]})]}),l.jsx("path",{d:`M65 20c22 0 34 15 33.5 35-.3 12-3 20-2.4 30 .9 16-1.2 31-6.4 44-3.4-10-7.4-17-12.6-21.6
  4.6-16 4.6-34-1.7-45.4C71.8 53.4 68.9 51 65 51s-6.8 2.4-10.4 11c-6.3 11.4-6.3 29.4-1.7 45.4
  -5.2 4.6-9.2 11.6-12.6 21.6-5.2-13-7.3-28-6.4-44 .6-10-2.1-18-2.4-30C31 35 43 20 65 20z`,fill:"url(#aHairBack)",stroke:"#331925",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M58 200c-8 26-22 46-34 62-5 7-3 12 6 14 16 3.5 33 3 47-1-9-24-15-49-19-75z",fill:"url(#aGown)",opacity:".5",stroke:"#5E2A4A",strokeWidth:"1",strokeOpacity:".32",strokeLinejoin:"round"}),l.jsx("path",{d:"M52 218c-6 18-16 33-26 45",stroke:"#FFF6FA",strokeWidth:"1.2",strokeLinecap:"round",opacity:".3"}),l.jsx("path",{d:"M52 154h26c5 25 5 47 3 66 12 14 18 34 20 55-25 8-55 8-80 1 4-22 14-42 26-56-2-21-2-44 5-66z",fill:"url(#aGown)",stroke:"#5E2A4A",strokeWidth:"1.2",strokeLinejoin:"round"}),l.jsx("path",{d:"M60 167c-3 23-4 44-2 59-9 14-16 30-19 46",stroke:"#FFF6FA",strokeWidth:"1.6",strokeLinecap:"round",opacity:".55"}),l.jsx("path",{d:"M72 169c2 21 3 40 2 55 7 14 13 30 15 46",stroke:"#8E4756",strokeWidth:"1",strokeLinecap:"round",opacity:".2"}),l.jsx("path",{d:"M66 226c-6 12-11 25-13 38",stroke:"#FFF6FA",strokeWidth:"1",strokeLinecap:"round",opacity:".35"}),l.jsx("path",{d:"M27 268c21 8 50 8 72 0",stroke:"#A8567C",strokeWidth:"2",opacity:".22"}),l.jsx("path",{d:"M58.4 62.0h13.2v10c0 4.2-2.8 8-6.6 8s-6.6-3.8-6.6-8z",fill:"#EDBFA4"}),l.jsx("path",{d:"M58.4 62.0v10c0 4.2 2.8 8 6.6 8s6.6-3.8 6.6-8v-10",fill:"none",stroke:"#B5806B",strokeWidth:".9",strokeLinecap:"round"}),l.jsx("path",{d:"M59.4 63.5c3.4 4.6 7.8 4.6 11.2 0",fill:"none",stroke:"#B5806B",strokeWidth:".9",opacity:".45",strokeLinecap:"round"}),l.jsx("path",{d:"M54 73h22c7 4 11.5 11 12.5 20 .7 6.5.5 14-.4 21H41.9c-.9-7-1.1-14.5-.4-21 1-9 5.5-16 12.5-20z",fill:"url(#aSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M56 92c5.5 3.5 12.5 3.5 18 0",stroke:"#B5806B",strokeWidth:".8",opacity:".3",strokeLinecap:"round"}),l.jsx("path",{d:"M50 149h30l-1.3 8H51.3z",fill:"#C3A4E4",stroke:"#9B78C6",strokeWidth:".7",strokeLinejoin:"round"}),l.jsx("path",{d:"M78 157c5 11 5 24 2 35",stroke:"#C3A4E4",strokeWidth:"3",strokeLinecap:"round",opacity:".8"}),l.jsx("circle",{cx:"79.5",cy:"153",r:"3",fill:"#EBD9F7"}),l.jsxs("g",{children:[l.jsx("path",{d:`M48 94c-8.5 6-13.5 16.5-13 30 .4 11 3.6 20 9 27.5l5.6-3.8
    c-4.4-6.4-7-13.8-7.3-23.4-.3-10 2.2-18.2 7-24z`,fill:"url(#aSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M44 155.5l5.6-3.8c3.8 3.3 5.3 7.4 3.8 11-1.6 3.8-6 4.6-8.9 1.8-2.3-2.1-2.7-5.6-.5-9z",fill:"#FBE0CF",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M45 118c-2.4 5.6-3.2 11.4-2.6 17.2",stroke:"#B5806B",strokeWidth:".8",opacity:".4",strokeLinecap:"round"}),l.jsxs("g",{className:"hm-doll-arm",children:[l.jsx("path",{d:`M82 94c8.5 6 13.5 16.5 13 30-.4 11-3.6 20-9 27.5l-5.6-3.8
      c4.4-6.4 7-13.8 7.3-23.4.3-10-2.2-18.2-7-24z`,fill:"url(#aSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M86 155.5l-5.6-3.8c-3.8 3.3-5.3 7.4-3.8 11 1.6 3.8 6 4.6 8.9 1.8 2.3-2.1 2.7-5.6.5-9z",fill:"#FBE0CF",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M85 118c2.4 5.6 3.2 11.4 2.6 17.2",stroke:"#B5806B",strokeWidth:".8",opacity:".4",strokeLinecap:"round"})]})]}),l.jsx("path",{d:`M47 93c3.5-4 8-6.5 13-7 1.8 3 3.5 4.5 5 4.5s3.2-1.5 5-4.5c5 .5 9.5 3 13 7
  1 15-1 28-5 39 1.4 8 2.2 15.7 2.4 22.5H51.6c.2-6.8 1-14.5 2.4-22.5-4-11-6-24-5-39z`,fill:"url(#aBodice)",stroke:"#5E2A4A",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M56 102c-1.6 19-1.4 39 .5 56",stroke:"#FFF6FA",strokeWidth:"1",opacity:".4"}),l.jsx("path",{d:"M74 102c1.6 19 1.4 39-.5 56",stroke:"#8E4756",strokeWidth:"1",opacity:".28"}),l.jsx("circle",{cx:"59",cy:"122",r:"1.5",fill:"#FFF6FA",opacity:".85"}),l.jsx("circle",{cx:"71",cy:"131",r:"1.5",fill:"#FFF6FA",opacity:".7"}),l.jsx("circle",{cx:"63",cy:"141",r:"1.4",fill:"#FFF6FA",opacity:".6"}),l.jsx("path",{d:"M59.5 90c-7.5-1.8-14 .8-17.5 7-2 3.6-.4 7.4 3.4 8.2 3.4.8 5.8-.7 7.2-3.6 1.8-4 4.3-7.2 7.9-9.4z",fill:"url(#aSleeve)",stroke:"#5E2A4A",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("path",{d:"M70.5 90c7.5-1.8 14 .8 17.5 7 2 3.6.4 7.4-3.4 8.2-3.4.8-5.8-.7-7.2-3.6-1.8-4-4.3-7.2-7.9-9.4z",fill:"url(#aSleeve)",stroke:"#5E2A4A",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("ellipse",{cx:"65.0",cy:"46.0",rx:"19.0",ry:"20.5",fill:"url(#aSkin)",stroke:"#A56B57",strokeWidth:"1.1"}),l.jsx("ellipse",{cx:"56.0",cy:"48.0",rx:"7",ry:"9",fill:"#FFF3EA",opacity:".18"}),l.jsx("path",{d:"M46.4 44.5c-2.6-.4-4.4 1.4-4.2 4 .2 2.6 2.2 4.6 4.8 4.8z",fill:"#EDBFA4",stroke:"#A56B57",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M83.6 44.5c2.6-.4 4.4 1.4 4.2 4-.2 2.6-2.2 4.6-4.8 4.8z",fill:"#EDBFA4",stroke:"#A56B57",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("ellipse",{cx:"57.4",cy:"49.5",rx:"4.6",ry:"5.4",fill:"#FFFDFB"}),l.jsx("circle",{cx:"57.4",cy:"50.0",r:"3.5",fill:"#8E4756"}),l.jsx("circle",{cx:"57.4",cy:"50.4",r:"1.75",fill:"#3B2130"}),l.jsx("circle",{cx:"56.1",cy:"47.9",r:"1.45",fill:"#FFFFFF"}),l.jsx("circle",{cx:"58.9",cy:"51.9",r:".75",fill:"#FFFFFF",opacity:".8"}),l.jsx("path",{d:"M52.5 48.1c1-3.2 3-4.8 4.9-4.8s3.9 1.6 4.9 4.8",fill:"none",stroke:"#3B2130",strokeWidth:"1.35",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"57.4",cy:"49.5",rx:"4.6",ry:"5.4",fill:"none",stroke:"#3B2130",strokeWidth:".65",opacity:".5"}),l.jsx("ellipse",{cx:"72.6",cy:"49.5",rx:"4.6",ry:"5.4",fill:"#FFFDFB"}),l.jsx("circle",{cx:"72.6",cy:"50.0",r:"3.5",fill:"#8E4756"}),l.jsx("circle",{cx:"72.6",cy:"50.4",r:"1.75",fill:"#3B2130"}),l.jsx("circle",{cx:"71.3",cy:"47.9",r:"1.45",fill:"#FFFFFF"}),l.jsx("circle",{cx:"74.1",cy:"51.9",r:".75",fill:"#FFFFFF",opacity:".8"}),l.jsx("path",{d:"M67.69999999999999 48.1c1-3.2 3-4.8 4.9-4.8s3.9 1.6 4.9 4.8",fill:"none",stroke:"#3B2130",strokeWidth:"1.35",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"72.6",cy:"49.5",rx:"4.6",ry:"5.4",fill:"none",stroke:"#3B2130",strokeWidth:".65",opacity:".5"}),l.jsx("path",{d:"M53.1 41.4c1.5-2.2 3.3-3.1 5.2-2.7 1.4.3 2.6 1.2 3.5 2.5",fill:"none",stroke:"#5E3446",strokeWidth:"1.15",strokeLinecap:"round",opacity:".9"}),l.jsx("path",{d:"M76.89999999999999 41.4c-1.5-2.2-3.3-3.1-5.2-2.7-1.4.3-2.6 1.2-3.5 2.5",fill:"none",stroke:"#5E3446",strokeWidth:"1.15",strokeLinecap:"round",opacity:".9"}),l.jsx("path",{d:"M64.2 53.4c.8.7 1.6.8 2.4.2",fill:"none",stroke:"#B5806B",strokeWidth:".9",strokeLinecap:"round",opacity:".65"}),l.jsx("path",{d:"M62 58.2c1-.9 1.9-.9 3 .3 1.1-1.2 2-1.2 3-.3-.9 2.4-2 3.6-3 3.6s-2.1-1.2-3-3.6z",fill:"#D9718F"}),l.jsx("path",{d:"M62 58.2c2 .8 4 .8 6 0",fill:"none",stroke:"#8E4756",strokeWidth:".6",opacity:".55",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"51.5",cy:"54.5",rx:"4.4",ry:"2.8",fill:"#E28FAE",opacity:".42"}),l.jsx("ellipse",{cx:"78.5",cy:"54.5",rx:"4.4",ry:"2.8",fill:"#E28FAE",opacity:".42"}),l.jsx("path",{d:`M65 18c15 0 22 11 21 26.5-.2 4-.8 7-1.5 9.6-1-6.5-2-12-3.1-16.6
  -6.5 3-12.1.6-16.4-6.6-4.3 5.6-9.9 9.6-16.4 6.6-1.1 4.6-2.1 10.1-3.1 16.6
  -.7-2.6-1.3-5.6-1.5-9.6C43 29 50 18 65 18z`,fill:"url(#aHair)",stroke:"#331925",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:`M45 46c-4.5 11-6 22.5-5 34 .8 9.5 3.2 17.5 7.2 23.8 1.1 1.7 3.4.5 3-1.5
  -1.8-8.4-2.2-16.7-1.1-25 .9-6.8 2.1-21.6 3.1-29.2z`,fill:"url(#aHair)",stroke:"#331925",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("path",{d:`M85 46c4.5 11 6 22.5 5 34-.8 9.5-3.2 17.5-7.2 23.8-1.1 1.7-3.4.5-3-1.5
  1.8-8.4 2.2-16.7 1.1-25-.9-6.8-2.1-21.6-3.1-29.2z`,fill:"url(#aHair)",stroke:"#331925",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("path",{d:"M46.5 56c-2.8 9-3.8 17.5-3 25.5",stroke:"#C98A9B",strokeWidth:".9",strokeLinecap:"round",opacity:".4"}),l.jsx("path",{d:"M83.5 56c2.8 9 3.8 17.5 3 25.5",stroke:"#C98A9B",strokeWidth:".9",strokeLinecap:"round",opacity:".4"}),l.jsx("path",{d:"M93 60c2 15 1.2 30-2.4 43",stroke:"#B0648A",strokeWidth:"1.3",strokeLinecap:"round",opacity:".4"}),l.jsx("path",{d:"M37 60c-2 15-1.2 30 2.4 43",stroke:"#B0648A",strokeWidth:"1.3",strokeLinecap:"round",opacity:".3"}),l.jsx("path",{d:"M65 21c6.5.6 11.4 3.6 14.6 8.6",stroke:"#C98A9B",strokeWidth:"1.1",strokeLinecap:"round",opacity:".45"}),l.jsxs("g",{children:[l.jsx("circle",{cx:"45",cy:"32",r:"3.1",fill:"#C3A4E4"}),l.jsx("circle",{cx:"50.5",cy:"28.2",r:"2.7",fill:"#D9BFF0"}),l.jsx("circle",{cx:"46.6",cy:"25.4",r:"2.4",fill:"#C3A4E4"}),l.jsx("circle",{cx:"51.6",cy:"33.4",r:"2.2",fill:"#D9BFF0"}),l.jsx("circle",{cx:"48.2",cy:"29.6",r:"1.4",fill:"#FFF6FA"})]})]})}function lp({className:e="",...t}){return l.jsxs("svg",{viewBox:"0 0 130 320",className:`hm-doll hm-doll-b ${e}`,fill:"none","aria-hidden":"true",...t,children:[l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"bGown",x1:".1",y1:"0",x2:".95",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#FFF6F2"}),l.jsx("stop",{offset:".32",stopColor:"#FBD6C6"}),l.jsx("stop",{offset:".7",stopColor:"#F4A088"}),l.jsx("stop",{offset:"1",stopColor:"#C96A55"})]}),l.jsxs("linearGradient",{id:"bBodice",x1:"0",y1:"0",x2:"1",y2:".3",children:[l.jsx("stop",{offset:"0",stopColor:"#C2543C"}),l.jsx("stop",{offset:".44",stopColor:"#F79877"}),l.jsx("stop",{offset:"1",stopColor:"#CB5F45"})]}),l.jsxs("linearGradient",{id:"bHair",x1:".15",y1:"0",x2:".85",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#3B2647"}),l.jsx("stop",{offset:".5",stopColor:"#573A66"}),l.jsx("stop",{offset:"1",stopColor:"#8A64B0"})]}),l.jsxs("linearGradient",{id:"bSkin",x1:".1",y1:"0",x2:".9",y2:".4",children:[l.jsx("stop",{offset:"0",stopColor:"#FBE2D1"}),l.jsx("stop",{offset:".5",stopColor:"#F5D0B9"}),l.jsx("stop",{offset:"1",stopColor:"#E3B49B"})]}),l.jsxs("linearGradient",{id:"bSleeve",x1:".2",y1:"0",x2:".8",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#F9B79D"}),l.jsx("stop",{offset:"1",stopColor:"#C2543C"})]})]}),l.jsx("path",{d:"M55.8 252h7.4c.4 14 .2 28-.6 42h-6.4c-.8-14-.7-28-.4-42z",fill:"url(#bSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M66.8 252h7.4c.4 14 .6 28-.2 42h-6.4c-.8-14-1.1-28-.8-42z",fill:"url(#bSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M55.2 293h8.6l1.3 6.4c.3 1.7-.9 2.9-2.6 2.9h-7.3c-1.7 0-2.7-1.2-2.4-2.9z",fill:"#C96A55",stroke:"#8E4A3C",strokeWidth:".8",strokeLinejoin:"round"}),l.jsx("path",{d:"M66.6 293h8.6l2.7 6.4c.7 1.7-.5 2.9-2.2 2.9h-7.3c-1.8 0-2.8-1.2-2.6-2.9z",fill:"#C96A55",stroke:"#8E4A3C",strokeWidth:".8",strokeLinejoin:"round"}),l.jsx("path",{d:"M49 150h32c7 13 10 24 10 33-17 8-39 8-55 1 1-11 5-23 13-34z",fill:"url(#bGown)",stroke:"#5E2A4A",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M38 182c18 9 37 9 54 1 5.5 14 7.5 25 6.5 35-22 9-48 9-69 1 1-12 4.5-24 8.5-37z",fill:"url(#bGown)",opacity:".97",stroke:"#5E2A4A",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M32 216c21 10 45 10 66 1 5.5 14 7.5 25 6.5 34-25 10-55 10-80 1 1-12 4.5-24 7.5-36z",fill:"url(#bGown)",stroke:"#5E2A4A",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M37 183c6 5 12 5 18 0s12 5 18 0 12 5 17 1",stroke:"#FFF6F2",strokeWidth:"1.5",opacity:".65"}),l.jsx("path",{d:"M31 217c7 5 14 5 21 0s14 5 21 0 14 5 18 1",stroke:"#FFF6F2",strokeWidth:"1.5",opacity:".55"}),l.jsx("path",{d:"M25 250c8 5 16 5 24 0s16 5 24 0 15 5 20 1",stroke:"#FFF6F2",strokeWidth:"1.5",opacity:".45"}),l.jsxs("g",{fill:"#FFF6F2",opacity:".5",children:[l.jsx("circle",{cx:"45",cy:"232",r:"1.5"}),l.jsx("circle",{cx:"60",cy:"238",r:"1.5"}),l.jsx("circle",{cx:"77",cy:"232",r:"1.5"}),l.jsx("circle",{cx:"52",cy:"248",r:"1.4"}),l.jsx("circle",{cx:"70",cy:"248",r:"1.4"})]}),l.jsx("path",{d:"M58.4 62.0h13.2v10c0 4.2-2.8 8-6.6 8s-6.6-3.8-6.6-8z",fill:"#EEC2A8"}),l.jsx("path",{d:"M58.4 62.0v10c0 4.2 2.8 8 6.6 8s6.6-3.8 6.6-8v-10",fill:"none",stroke:"#B5806B",strokeWidth:".9",strokeLinecap:"round"}),l.jsx("path",{d:"M59.4 63.5c3.4 4.6 7.8 4.6 11.2 0",fill:"none",stroke:"#B5806B",strokeWidth:".9",opacity:".45",strokeLinecap:"round"}),l.jsx("path",{d:"M54 73h22c7 4 11.5 11 12.5 20 .7 6.5.5 14-.4 21H41.9c-.9-7-1.1-14.5-.4-21 1-9 5.5-16 12.5-20z",fill:"url(#bSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M56 92c5.5 3.5 12.5 3.5 18 0",stroke:"#B5806B",strokeWidth:".8",opacity:".3",strokeLinecap:"round"}),l.jsx("path",{d:"M50 144h30l-1.4 8H51.4z",fill:"#C3A4E4",stroke:"#9B78C6",strokeWidth:".7",strokeLinejoin:"round"}),l.jsx("path",{d:"M65 150c-4.4-6.6-12-8.2-14-3.7-1.8 3.9 3.4 8 8 5.4-4.4 4.4-2.6 8.2 1 7.2 3.7-1.1 5.4-4.8 5-8.9z",fill:"#C3A4E4",stroke:"#9B78C6",strokeWidth:".8",strokeLinejoin:"round"}),l.jsx("path",{d:"M65 150c4.4-6.6 12-8.2 14-3.7 1.8 3.9-3.4 8-8 5.4 4.4 4.4 2.6 8.2-1 7.2-3.7-1.1-5.4-4.8-5-8.9z",fill:"#C3A4E4",stroke:"#9B78C6",strokeWidth:".8",strokeLinejoin:"round"}),l.jsx("circle",{cx:"65",cy:"150",r:"2.5",fill:"#FFF6F2",stroke:"#9B78C6",strokeWidth:".6"}),l.jsxs("g",{children:[l.jsx("path",{d:`M48 96c-9 6.5-14.5 17.5-14 31 .4 10.5 3.8 19 9.4 25.6l5.6-4
    c-4.6-5.8-7.2-12.6-7.4-21.4-.3-10 2.5-18.4 7.6-24.4z`,fill:"url(#bSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M43.4 156.6l5.6-4c4 3.4 5.6 7.6 4.2 11.4-1.6 4-6.1 4.8-9.2 1.9-2.5-2.3-2.7-5.9-.6-9.3z",fill:"#FBE2D1",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M44.4 120c-2.4 5.6-3.2 11.4-2.6 17.2",stroke:"#B5806B",strokeWidth:".8",opacity:".4",strokeLinecap:"round"}),l.jsxs("g",{className:"hm-doll-arm",children:[l.jsx("path",{d:`M82 96c9 6.5 14.5 17.5 14 31-.4 10.5-3.8 19-9.4 25.6l-5.6-4
      c4.6-5.8 7.2-12.6 7.4-21.4.3-10-2.5-18.4-7.6-24.4z`,fill:"url(#bSkin)",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M86.6 156.6l-5.6-4c-4 3.4-5.6 7.6-4.2 11.4 1.6 4 6.1 4.8 9.2 1.9 2.5-2.3 2.7-5.9.6-9.3z",fill:"#FBE2D1",stroke:"#B5806B",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M85.6 120c2.4 5.6 3.2 11.4 2.6 17.2",stroke:"#B5806B",strokeWidth:".8",opacity:".4",strokeLinecap:"round"})]})]}),l.jsx("path",{d:"M48 93c3.5-4 8-6.5 13-7h8c5 .5 9.5 3 13 7 1.2 15-.8 28-4.6 39 1.6 8.4 2.6 16.6 3 25H45.6c.4-8.4 1.4-16.6 3-25-3.8-11-5.8-24-4.6-39z",fill:"url(#bBodice)",stroke:"#5E2A4A",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M61 86.5h8",stroke:"#FFF6F2",strokeWidth:"1.8",opacity:".55",strokeLinecap:"round"}),l.jsx("path",{d:"M65 93v65",stroke:"#FFF6F2",strokeWidth:".9",opacity:".32"}),l.jsx("path",{d:"M55 101c-1.4 19-1.2 38 .5 57",stroke:"#FFF6F2",strokeWidth:".9",opacity:".3"}),l.jsx("path",{d:"M75 101c1.4 19 1.2 38-.5 57",stroke:"#8E4A3C",strokeWidth:".9",opacity:".25"}),l.jsx("path",{d:"M59.5 89c-8-1.6-14.5 1.2-18 7.4-2 3.6-.3 7.2 3.5 7.9 3.4.7 5.7-.9 7-3.8 1.8-4.1 4.4-7.4 7.5-9.7z",fill:"url(#bSleeve)",stroke:"#5E2A4A",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("path",{d:"M70.5 89c8-1.6 14.5 1.2 18 7.4 2 3.6.3 7.2-3.5 7.9-3.4.7-5.7-.9-7-3.8-1.8-4.1-4.4-7.4-7.5-9.7z",fill:"url(#bSleeve)",stroke:"#5E2A4A",strokeWidth:"1",strokeLinejoin:"round"}),l.jsx("ellipse",{cx:"65.0",cy:"46.0",rx:"19.0",ry:"20.5",fill:"url(#bSkin)",stroke:"#A56B57",strokeWidth:"1.1"}),l.jsx("ellipse",{cx:"56.0",cy:"48.0",rx:"7",ry:"9",fill:"#FFF3EA",opacity:".18"}),l.jsx("path",{d:"M46.4 44.5c-2.6-.4-4.4 1.4-4.2 4 .2 2.6 2.2 4.6 4.8 4.8z",fill:"#EEC2A8",stroke:"#A56B57",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M83.6 44.5c2.6-.4 4.4 1.4 4.2 4-.2 2.6-2.2 4.6-4.8 4.8z",fill:"#EEC2A8",stroke:"#A56B57",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("ellipse",{cx:"57.4",cy:"49.5",rx:"4.6",ry:"5.4",fill:"#FFFDFB"}),l.jsx("circle",{cx:"57.4",cy:"50.0",r:"3.5",fill:"#573A66"}),l.jsx("circle",{cx:"57.4",cy:"50.4",r:"1.75",fill:"#2A1A33"}),l.jsx("circle",{cx:"56.1",cy:"47.9",r:"1.45",fill:"#FFFFFF"}),l.jsx("circle",{cx:"58.9",cy:"51.9",r:".75",fill:"#FFFFFF",opacity:".8"}),l.jsx("path",{d:"M52.5 48.1c1-3.2 3-4.8 4.9-4.8s3.9 1.6 4.9 4.8",fill:"none",stroke:"#2A1A33",strokeWidth:"1.35",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"57.4",cy:"49.5",rx:"4.6",ry:"5.4",fill:"none",stroke:"#2A1A33",strokeWidth:".65",opacity:".5"}),l.jsx("ellipse",{cx:"72.6",cy:"49.5",rx:"4.6",ry:"5.4",fill:"#FFFDFB"}),l.jsx("circle",{cx:"72.6",cy:"50.0",r:"3.5",fill:"#573A66"}),l.jsx("circle",{cx:"72.6",cy:"50.4",r:"1.75",fill:"#2A1A33"}),l.jsx("circle",{cx:"71.3",cy:"47.9",r:"1.45",fill:"#FFFFFF"}),l.jsx("circle",{cx:"74.1",cy:"51.9",r:".75",fill:"#FFFFFF",opacity:".8"}),l.jsx("path",{d:"M67.69999999999999 48.1c1-3.2 3-4.8 4.9-4.8s3.9 1.6 4.9 4.8",fill:"none",stroke:"#2A1A33",strokeWidth:"1.35",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"72.6",cy:"49.5",rx:"4.6",ry:"5.4",fill:"none",stroke:"#2A1A33",strokeWidth:".65",opacity:".5"}),l.jsx("path",{d:"M53.1 41.4c1.5-2.2 3.3-3.1 5.2-2.7 1.4.3 2.6 1.2 3.5 2.5",fill:"none",stroke:"#573A66",strokeWidth:"1.15",strokeLinecap:"round",opacity:".9"}),l.jsx("path",{d:"M76.89999999999999 41.4c-1.5-2.2-3.3-3.1-5.2-2.7-1.4.3-2.6 1.2-3.5 2.5",fill:"none",stroke:"#573A66",strokeWidth:"1.15",strokeLinecap:"round",opacity:".9"}),l.jsx("path",{d:"M64.2 53.4c.8.7 1.6.8 2.4.2",fill:"none",stroke:"#B5806B",strokeWidth:".9",strokeLinecap:"round",opacity:".65"}),l.jsx("path",{d:"M60.8 57.4c1.3 3.4 2.6 5 4.2 5s2.9-1.6 4.2-5c-2.8 1.1-5.6 1.1-8.4 0z",fill:"#B4553C",stroke:"#B4553C",strokeWidth:".5",strokeLinejoin:"round"}),l.jsx("path",{d:"M60.8 57.4c2.8 1.2 5.6 1.2 8.4 0",fill:"none",stroke:"#E08A6C",strokeWidth:"1.5",strokeLinecap:"round"}),l.jsx("ellipse",{cx:"51.5",cy:"54.5",rx:"4.4",ry:"2.8",fill:"#F4A088",opacity:".42"}),l.jsx("ellipse",{cx:"78.5",cy:"54.5",rx:"4.4",ry:"2.8",fill:"#F4A088",opacity:".42"}),l.jsx("path",{d:`M65 18c16 0 23.5 11 22.5 27-.2 3.8-.8 6.8-1.6 9.4-1.2-7-2.2-12.8-3.3-17.6
  -5.2-4.2-10.7-6.3-17.6-6.3s-12.4 2.1-17.6 6.3c-1.1 4.8-2.1 10.6-3.3 17.6
  -.8-2.6-1.4-5.6-1.6-9.4C41.5 29 49 18 65 18z`,fill:"url(#bHair)",stroke:"#2A1A33",strokeWidth:"1.1",strokeLinejoin:"round"}),l.jsx("path",{d:"M50 30c4.6-4.2 9.8-6.3 15-6.5",stroke:"#9B78C6",strokeWidth:"1",strokeLinecap:"round",opacity:".5"}),l.jsx("path",{d:"M80 30c-4.6-4.2-9.8-6.3-15-6.5",stroke:"#9B78C6",strokeWidth:"1",strokeLinecap:"round",opacity:".4"}),l.jsx("path",{d:"M55 21c5-4.5 15-4.5 20 0-3 3.6-7 5.2-10 5.2S58 24.6 55 21z",fill:"#3B2647",opacity:".85"}),l.jsx("ellipse",{cx:"65",cy:"10.5",rx:"13.5",ry:"10.5",fill:"url(#bHair)",stroke:"#2A1A33",strokeWidth:"1.1"}),l.jsx("path",{d:"M56.5 6.5c5-3.6 12-3.8 17 0",stroke:"#9B78C6",strokeWidth:"1.3",strokeLinecap:"round",opacity:".5"}),l.jsx("path",{d:"M55.5 14c5.5 3.6 14 3.6 19 0",stroke:"#9B78C6",strokeWidth:"1",strokeLinecap:"round",opacity:".35"}),l.jsx("path",{d:"M45.6 44c-3.4 9.5-4.2 19.4-2.4 29.2.5 2.6 3.5 2.4 3.4-.3-.3-9.6.8-18.6 3-27z",fill:"url(#bHair)",stroke:"#2A1A33",strokeWidth:".9",strokeLinejoin:"round"}),l.jsx("path",{d:"M84.4 44c3.4 9.5 4.2 19.4 2.4 29.2-.5 2.6-3.5 2.4-3.4-.3.3-9.6-.8-18.6-3-27z",fill:"url(#bHair)",stroke:"#2A1A33",strokeWidth:".9",strokeLinejoin:"round"}),l.jsxs("g",{children:[l.jsx("circle",{cx:"80",cy:"8",r:"3.1",fill:"#F4A088"}),l.jsx("circle",{cx:"85",cy:"11.6",r:"2.7",fill:"#FBC4AE"}),l.jsx("circle",{cx:"82.6",cy:"3",r:"2.4",fill:"#F4A088"}),l.jsx("circle",{cx:"86.6",cy:"6",r:"2.2",fill:"#FBC4AE"}),l.jsx("circle",{cx:"82.8",cy:"7.6",r:"1.4",fill:"#FFF6F2"})]})]})}function Tt({greet:e,variant:t="flank",className:n=""}){return l.jsxs("div",{className:`hm-dolls hm-dolls-${t} ${e?"is-greeting":""} ${n}`,"aria-hidden":"true",children:[l.jsx("span",{className:"hm-doll-slot hm-doll-slot-l",children:l.jsx(ip,{})}),l.jsx("span",{className:"hm-doll-slot hm-doll-slot-r",children:l.jsx(lp,{})})]})}function ea({icon:e="slipper"}){const t=e==="wand"?zo:e==="crown"?Jl:Pt;return l.jsxs("div",{className:"hm-divider","aria-hidden":"true",children:[l.jsx("span",{className:"hm-divider-line"}),l.jsx("span",{className:"hm-divider-bow",children:l.jsxs("svg",{viewBox:"0 0 90 40",fill:"none",children:[l.jsx("path",{d:"M45 20c-6-12-22-16-27-9s5 16 17 12c-10 8-6 16 2 13 5-2 8-8 8-16z",fill:"currentColor",opacity:".55"}),l.jsx("path",{d:"M45 20c6-12 22-16 27-9s-5 16-17 12c10 8 6 16-2 13-5-2-8-8-8-16z",fill:"currentColor",opacity:".55"}),l.jsx("circle",{cx:"45",cy:"20",r:"4",fill:"currentColor",opacity:".85"})]})}),l.jsx("span",{className:"hm-divider-icon",children:l.jsx(t,{width:"26"})}),l.jsx("span",{className:"hm-divider-line"})]})}function ta({lit:e=!1,className:t=""}){const n=S.useMemo(()=>Array.from({length:46},(r,o)=>({x:o*37.7%100,y:o*61.3%62,r:.5+o*13%10/9,d:o%7*.6})),[]);return l.jsxs("svg",{className:`hm-castle ${e?"is-lit":""} ${t}`,viewBox:"0 0 1200 420",preserveAspectRatio:"xMidYMax slice","aria-hidden":"true",children:[n.map((r,o)=>l.jsx("circle",{className:"hm-star",cx:r.x*12,cy:r.y*4.2,r:r.r,style:{animationDelay:`${r.d}s`}},o)),l.jsx("path",{className:"hm-castle-body",d:"M0 420V352l70-10v-40l16-30 16 30v34l52-6v-92l20-34 20 34v88l40-4V210l26-46 26 46v14h30v-58l34-58 34 58v58h34v-30l30-52 30 52v28l40 4v-88l22-38 22 38v84l46 6v-84l20-34 20 34v82l48 6v-46l18-30 18 30v50l58 8v70z"}),l.jsx("g",{className:"hm-castle-windows",children:[[152,300],[232,264],[318,246],[406,208],[512,232],[604,254],[700,268],[806,286],[918,300],[1046,322]].map(([r,o],i)=>l.jsx("rect",{x:r,y:o,width:"7",height:"12",rx:"3.5",style:{animationDelay:`${i*.09}s`}},i))})]})}const gs="M50 0 C 20 90, 82 150, 50 240 C 18 330, 80 380, 50 470 C 22 560, 78 610, 50 700 C 24 790, 76 840, 50 930 C 28 1000, 60 1030, 50 1100",ap=[.12,.34,.56,.78,.95];function sp({reduced:e}){const t=S.useRef(null),n=S.useRef(null),[r,o]=S.useState(e?1:0);return S.useEffect(()=>{if(e)return;const i=t.current;if(!i||typeof i.getTotalLength!="function")return;let a=0;try{a=i.getTotalLength()}catch{return}if(!a||!isFinite(a))return;i.style.strokeDasharray=`${a}`,i.style.strokeDashoffset=`${a}`;let s=!0,u=0,f=-1,p=0;const g=()=>{s=!0,p=0,u||(u=requestAnimationFrame(k))};window.addEventListener("scroll",g,{passive:!0}),window.addEventListener("resize",g,{passive:!0});const k=()=>{if(s){s=!1,p=0;const j=document.documentElement.scrollHeight-window.innerHeight,x=j>0?Math.min(1,window.scrollY/j*1.12):1;Math.abs(x-f)>.002&&(f=x,i.style.strokeDashoffset=`${a*(1-x)}`,n.current&&n.current.style.setProperty("--lit",x.toFixed(3)),o(x))}else if(++p>12){u=0;return}u=requestAnimationFrame(k)};return u=requestAnimationFrame(k),()=>{cancelAnimationFrame(u),window.removeEventListener("scroll",g),window.removeEventListener("resize",g)}},[e]),l.jsxs("div",{ref:n,className:"hm-thread","aria-hidden":"true",children:[l.jsxs("svg",{viewBox:"0 0 100 1100",preserveAspectRatio:"none",className:"hm-thread-svg",children:[l.jsx("defs",{children:l.jsxs("linearGradient",{id:"threadG",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#EBD3A4",stopOpacity:".0"}),l.jsx("stop",{offset:".08",stopColor:"#EBD3A4",stopOpacity:".9"}),l.jsx("stop",{offset:".5",stopColor:"#D98BA6",stopOpacity:".85"}),l.jsx("stop",{offset:".92",stopColor:"#C98A72",stopOpacity:".8"}),l.jsx("stop",{offset:"1",stopColor:"#C98A72",stopOpacity:"0"})]})}),l.jsx("path",{d:gs,className:"hm-thread-ghost"}),l.jsx("path",{ref:t,d:gs,className:"hm-thread-line"})]}),ap.map((i,a)=>l.jsx("span",{className:`hm-thread-node ${r>=i?"is-lit":""}`,style:{top:`${i*100}%`,"--n":a}},a))]})}function up({onOpen:e,reduced:t}){const[n,r]=S.useState("closed"),o=hn();S.useEffect(()=>{Xe.prime()},[]);const i=S.useCallback(a=>{if(n!=="closed")return;Xe.unlockAndPlay();const s=a.clientX??window.innerWidth/2,u=a.clientY??window.innerHeight/2;o.current&&!t&&(o.current.burst(s,u,90,460,!0),setTimeout(()=>o.current&&o.current.burst(s,u*.7,70,620),180),setTimeout(()=>o.current&&o.current.burst(window.innerWidth/2,window.innerHeight*.42,80,520,!0),380)),r("opening"),e(),setTimeout(()=>r("gone"),t?380:1050)},[n,e,o,t]);return n==="gone"?null:l.jsxs("div",{className:`hm-gate ${n==="opening"?"is-opening":""}`,onClick:i,onKeyDown:a=>{(a.key==="Enter"||a.key===" ")&&i(a)},role:"button",tabIndex:0,"aria-label":"Open $Hamna's birthday page",children:[l.jsx(ta,{lit:n==="opening",className:"hm-gate-sky"}),l.jsx(Tt,{greet:!0,variant:"corner",className:"hm-dolls-gate"}),l.jsx("div",{className:"hm-gate-flash"}),l.jsxs("div",{className:"hm-invite",children:[l.jsx("div",{className:"hm-invite-lace"}),l.jsx("span",{className:"hm-eyebrow",children:"An invitation, of sorts"}),l.jsx(Jl,{className:"hm-invite-crown",width:"58"}),l.jsx("h1",{className:"hm-invite-name",children:At}),l.jsx("p",{className:"hm-invite-line",children:"Something was built for you. Pull the ribbon."}),l.jsxs("div",{className:"hm-seal",children:[l.jsxs("svg",{viewBox:"0 0 120 90","aria-hidden":"true",children:[l.jsx("path",{d:"M60 46c-9-16-30-21-37-12s6 21 23 16c-14 10-9 22 3 18 7-2 11-11 11-22z",fill:"currentColor",opacity:".5"}),l.jsx("path",{d:"M60 46c9-16 30-21 37-12s-6 21-23 16c14 10 9 22-3 18-7-2-11-11-11-22z",fill:"currentColor",opacity:".5"}),l.jsx("circle",{cx:"60",cy:"46",r:"15",fill:"currentColor",opacity:".92"}),l.jsx("circle",{cx:"60",cy:"46",r:"15",fill:"none",stroke:"#fff",strokeOpacity:".35",strokeWidth:"1"})]}),l.jsx(Pt,{className:"hm-seal-mark",width:"30"})]}),l.jsxs("span",{className:"hm-btn hm-btn-lilac hm-gate-cta",children:[l.jsx(zo,{width:"16",className:"hm-btn-ico"})," tap to begin"]}),l.jsx("span",{className:"hm-gate-sub",children:"turns the music on"})]})]})}function ys(e=new Date){const t=e.getFullYear(),n=new Date(t,si,ui,0,0,0,0),r=new Date(t,si,ui+1,0,0,0,0);return e>=n&&e<r?0:(e>=r?new Date(t+1,si,ui,0,0,0,0):n).getTime()-e.getTime()}function vs(e){const t=Math.max(0,Math.floor(e/1e3));return{days:Math.floor(t/86400),hours:Math.floor(t%86400/3600),mins:Math.floor(t%3600/60),secs:t%60}}function br({value:e,label:t,animate:n}){const[r,o]=S.useState(n?0:e),i=S.useRef(0);return S.useEffect(()=>{if(!n){o(e);return}const a=0,s=1100,u=performance.now(),f=p=>{const m=Math.min(1,(p-u)/s),g=1-Math.pow(1-m,3);o(Math.round(a+(e-a)*g)),m<1&&(i.current=requestAnimationFrame(f))};return i.current=requestAnimationFrame(f),()=>cancelAnimationFrame(i.current)},[n]),S.useEffect(()=>{n||o(e)},[e,n]),l.jsxs("span",{className:"hm-tick",children:[l.jsx("span",{className:"hm-tick-num",children:String(r).padStart(2,"0")}),l.jsx("span",{className:"hm-tick-label hm-micro",children:t})]})}function cp({reduced:e}){const[t,n]=S.useState(()=>vs(ys())),[r,o]=S.useState(!e);S.useEffect(()=>{const a=setInterval(()=>n(vs(ys())),1e3);return()=>clearInterval(a)},[]),S.useEffect(()=>{if(!r)return;const a=setTimeout(()=>o(!1),1200);return()=>clearTimeout(a)},[r]);const i=t.days===0&&t.hours===0&&t.mins===0&&t.secs===0;return l.jsxs("div",{className:"hm-countdown",children:[l.jsx("span",{className:"hm-countdown-eyebrow hm-micro",children:i?"It's today":"Until the fourth of October"}),l.jsxs("div",{className:"hm-countdown-row",children:[l.jsx(br,{value:t.days,label:"days",animate:r}),l.jsx("span",{className:"hm-tick-sep",children:":"}),l.jsx(br,{value:t.hours,label:"hrs",animate:r}),l.jsx("span",{className:"hm-tick-sep",children:":"}),l.jsx(br,{value:t.mins,label:"min",animate:r}),l.jsx("span",{className:"hm-tick-sep",children:":"}),l.jsx(br,{value:t.secs,label:"sec",animate:r})]}),l.jsxs("span",{className:"hm-countdown-tag",children:["for the ",No]})]})}function dp({started:e,reduced:t}){const[n,r]=ql();return l.jsxs("header",{ref:n,className:`hm-hero hm-on-dark ${e?"is-in":""} ${r?"hm-idle":""}`,children:[l.jsx(ta,{className:"hm-hero-sky",lit:!0}),l.jsx(nl,{className:"hm-butterfly hm-butterfly-1",width:"46"}),l.jsx(nl,{className:"hm-butterfly hm-butterfly-2",width:"34"}),l.jsx(Tt,{greet:e,variant:"flank",className:"hm-dolls-hero"}),l.jsxs("div",{className:"hm-hero-inner",children:[l.jsx(Jl,{className:"hm-hero-crown",width:"64"}),l.jsx("p",{className:"hm-eyebrow hm-hero-eyebrow",children:"Once upon an October"}),l.jsxs("h1",{className:"hm-hero-name",children:[l.jsx("span",{className:"hm-shimmer",children:At}),l.jsxs("svg",{className:"hm-swash",viewBox:"0 0 320 34",fill:"none","aria-hidden":"true",children:[l.jsx("path",{d:"M6 22c46 10 108 8 154-2 40-9 92-12 152 4",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round"}),l.jsx("path",{d:"M232 24c14-8 30-10 42-4",stroke:"currentColor",strokeWidth:"1.2",strokeLinecap:"round",opacity:".6"}),l.jsx("circle",{cx:"286",cy:"26",r:"2.4",fill:"currentColor"})]})]}),l.jsx("p",{className:"hm-hero-tag",children:"Happy birthday to the friend who stayed"}),l.jsx("p",{className:"hm-hero-date",children:Pc}),l.jsx(cp,{reduced:t}),l.jsxs("span",{className:"hm-scroll-hint hm-micro","aria-hidden":"true",children:[l.jsx("span",{className:"hm-scroll-line"})," scroll"]})]})]})}function fp({photo:e,index:t,hovered:n,setHovered:r,onOpen:o,reduced:i,lowPower:a}){const s=S.useRef(null),[u,f]=S.useState(!1),p=hn(),m=S.useRef({last:0}),g=n!==null&&n!==t,k=S.useCallback(x=>{if(i||a||!s.current)return;const d=s.current.getBoundingClientRect(),c=(x.clientX-d.left)/d.width-.5,h=(x.clientY-d.top)/d.height-.5;s.current.style.setProperty("--tx",`${-h*11}deg`),s.current.style.setProperty("--ty",`${c*13}deg`),s.current.style.setProperty("--sx",`${(c+.5)*100}%`)},[i,a]),v=S.useCallback(()=>{r(null),s.current&&(s.current.style.setProperty("--tx","0deg"),s.current.style.setProperty("--ty","0deg"))},[r]),j=x=>{const d=performance.now();if(d-m.current.last<320){m.current.last=0,p.current&&!i&&p.current.burst(x.clientX,x.clientY,26,190,!0),Xe.chime(1568),f(!0),setTimeout(()=>f(!1),700);return}m.current.last=d,setTimeout(()=>{m.current.last===d&&(m.current.last=0,o(t,s.current))},300)};return l.jsxs("figure",{ref:s,className:`hm-frame ${g?"is-dim":""} ${n===t?"is-hot":""} ${u?"is-held":""}`,style:{left:`${e.x}%`,"--row":e.row,"--side":e.side,"--rot":`${e.rot}deg`,"--scale":e.scale,"--delay":`${t*45}ms`,zIndex:n===t?30:10+t},onPointerEnter:()=>r(t),onPointerLeave:v,onPointerMove:k,onClick:j,tabIndex:0,onKeyDown:x=>{x.key==="Enter"&&o(t,s.current)},"aria-label":`Open ${e.alt}`,children:[l.jsxs("div",{className:"hm-frame-inner",children:[l.jsxs("div",{className:"hm-frame-window",children:[l.jsxs("picture",{children:[l.jsx("source",{type:"image/webp",srcSet:e.webp,sizes:Qh}),l.jsx("img",{className:"hm-photo",src:e.src,alt:e.alt,width:e.w,height:e.h,loading:t<2?"eager":"lazy",decoding:"async",style:{animationDuration:`${16+t*3}s`,animationDelay:`${t*-4}s`}})]}),l.jsx("span",{className:"hm-sheen"}),l.jsx("span",{className:"hm-curtain"})]}),l.jsxs("figcaption",{className:"hm-frame-cap hm-micro",children:[l.jsx(Pt,{width:"14"})," ",l.jsx("span",{children:String(t+1).padStart(2,"0")})]})]}),l.jsx("span",{className:"hm-heart-pop","aria-hidden":"true",children:"♥"})]})}function hp({onOpen:e,reduced:t,lowPower:n}){const[r,o]=Mo(),[i,a]=S.useState(null),[s,u]=S.useState(()=>typeof window<"u"&&window.innerWidth>760);return S.useEffect(()=>{const f=()=>u(window.innerWidth>760);return window.addEventListener("resize",f,{passive:!0}),()=>window.removeEventListener("resize",f)},[]),Zh(r,{pad:48,enabled:s}),l.jsxs("section",{className:"hm-section hm-gallery-section",id:"gallery",children:[l.jsx(Tt,{greet:o,variant:"frame"}),l.jsxs("div",{className:"hm-section-head",children:[l.jsx("span",{className:"hm-eyebrow",children:_o("gallery")}),l.jsx("h2",{className:"hm-h2",children:"Frames worth keeping"}),l.jsx("p",{className:"hm-sub",children:"Hover to lift one out of the pile. Tap twice if it makes you smile."}),l.jsxs("p",{className:"hm-albatross-tag",children:["from the ",No," archives"]})]}),l.jsx("div",{ref:r,className:`hm-collage ${o?"is-in":""}`,style:{"--rows":$h},onPointerLeave:()=>a(null),children:de.map((f,p)=>l.jsx(fp,{photo:f,index:p,hovered:i,setHovered:a,onOpen:e,reduced:t,lowPower:n},f.id))}),l.jsx(ea,{icon:"wand"})]})}function pp({open:e,index:t,origin:n,onClose:r,onIndex:o,reduced:i}){const a=S.useRef(null),s=S.useRef(!1);S.useEffect(()=>{e||(s.current=!1)},[e]),S.useLayoutEffect(()=>{if(!e||!a.current)return;const p=a.current;if(s.current)return;if(s.current=!0,i||!n){p.style.transform="",p.style.opacity="1";return}const m=p.getBoundingClientRect(),g=n.getBoundingClientRect(),k=g.width/m.width,v=g.height/m.height,j=g.left+g.width/2-(m.left+m.width/2),x=g.top+g.height/2-(m.top+m.height/2);p.style.transition="none",p.style.transformOrigin="center",p.style.transform=`translate3d(${j}px, ${x}px, 0) scale(${k}, ${v})`,requestAnimationFrame(()=>{p.style.transition="transform 420ms cubic-bezier(.22,1,.28,1)",p.style.transform="translate3d(0,0,0) scale(1,1)"})},[e,t,n,i]),S.useEffect(()=>{if(!e)return;const p=m=>{m.key==="Escape"&&r(),m.key==="ArrowRight"&&o((t+1)%de.length),m.key==="ArrowLeft"&&o((t-1+de.length)%de.length)};return window.addEventListener("keydown",p),document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",p),document.body.style.overflow=""}},[e,t,r,o]);const u=S.useRef({x:0});if(!e)return null;const f=de[t];return l.jsxs("div",{className:"hm-lightbox",role:"dialog","aria-modal":"true","aria-label":f.alt,onClick:r,onTouchStart:p=>{u.current.x=p.touches[0].clientX},onTouchEnd:p=>{const m=p.changedTouches[0].clientX-u.current.x;Math.abs(m)>48&&o((t+(m<0?1:-1)+de.length)%de.length)},children:[l.jsx("div",{className:"hm-lightbox-veil"}),l.jsx("button",{className:"hm-lb-nav hm-lb-prev","aria-label":"Previous photo",onClick:p=>{p.stopPropagation(),o((t-1+de.length)%de.length)},children:"‹"}),l.jsxs("figure",{className:"hm-lightbox-stage",onClick:p=>p.stopPropagation(),children:[l.jsxs("picture",{children:[l.jsx("source",{type:"image/webp",srcSet:f.webp,sizes:Yh}),l.jsx("img",{ref:a,className:"hm-lightbox-img",src:f.src,alt:f.alt,width:f.w,height:f.h})]},t),l.jsxs("figcaption",{className:"hm-lightbox-cap hm-micro",children:[l.jsx(Pt,{width:"16"})," ",t+1," of ",de.length]})]}),l.jsx("button",{className:"hm-lb-nav hm-lb-next","aria-label":"Next photo",onClick:p=>{p.stopPropagation(),o((t+1)%de.length)},children:"›"}),l.jsx("button",{className:"hm-lb-close","aria-label":"Close",onClick:r,children:"×"})]})}function mp(){const[e,t]=Mo();return l.jsxs("section",{className:`hm-section hm-note-section ${t?"is-in":""}`,ref:e,children:[l.jsx(Tt,{greet:t,variant:"corner"}),l.jsxs("div",{className:"hm-aside-grid",children:[l.jsxs("header",{className:"hm-aside-head",children:[l.jsx("span",{className:"hm-eyebrow",children:_o("letter")}),l.jsxs("h2",{className:"hm-h2 hm-h2-aside",children:["A letter,",l.jsx("br",{}),"friend to friend"]}),l.jsx("span",{className:"hm-aside-rule","aria-hidden":"true"}),l.jsx("p",{className:"hm-aside-note",children:"Written the week before, and meant all of it."})]}),l.jsxs("div",{className:"hm-note",children:[l.jsx("span",{className:"hm-note-flourish hm-note-flourish-tl","aria-hidden":"true",children:l.jsxs("svg",{viewBox:"0 0 120 120",fill:"none",children:[l.jsx("path",{d:"M8 112C8 58 30 18 112 8",stroke:"currentColor",strokeWidth:"1.2"}),l.jsx("path",{d:"M26 96c6-30 26-52 62-62",stroke:"currentColor",strokeWidth:"1",opacity:".6"}),l.jsx("circle",{cx:"20",cy:"70",r:"3",fill:"currentColor",opacity:".7"}),l.jsx("circle",{cx:"52",cy:"40",r:"4.5",fill:"currentColor",opacity:".5"}),l.jsx("circle",{cx:"86",cy:"22",r:"2.6",fill:"currentColor",opacity:".8"})]})}),l.jsxs("div",{className:"hm-note-body",children:[l.jsxs("p",{children:["Dear ",At,","]}),l.jsx("p",{children:"I don't say this enough, so I'm saying it here: I'm really glad I have you. You've shown up for me more times than I can count, in the small ways that actually matter — checking in, listening without making it weird, staying even when it would've been easier not to."}),l.jsx("p",{children:"May Allah keep you happy and healthy, always. May He make your future easier than you're expecting and give you every good thing you've been quietly hoping for. And may He keep our friendship exactly this easy, for a long, long time."}),l.jsxs("p",{children:["Happy birthday, ",l.jsx("span",{className:"hm-nick",children:No}),". I hope this year is a really good one for you."]}),l.jsx("p",{className:"hm-sign",children:"— your friend, Muneeb"})]})]})]}),l.jsx(ea,{icon:"crown"})]})}function gp({reduced:e,lowPower:t,onWish:n}){const[r,o]=Mo(),[i,a]=ql(),[s,u]=S.useState(!1),f=S.useRef(null),p=hn(),m=S.useCallback(()=>{if(s||(u(!0),Xe.resyncOrRestart(),n&&n(),e||!p.current||!i.current))return;const x=i.current.getBoundingClientRect(),d=x.left+x.width/2,c=x.top+x.height*.22;p.current.burst(d,c,80,420,!0),[220,460,760].forEach((h,y)=>setTimeout(()=>p.current&&p.current.burst(x.left+x.width*(.25+y*.25),c+y*12,55,500,y===1),h))},[s,p,e,n,i]),g=S.useRef(null),k=S.useCallback(x=>{if(e||!g.current)return;const d=x.currentTarget.getBoundingClientRect(),c=(x.clientX-d.left)/d.width-.5,h=(x.clientY-d.top)/d.height-.5;g.current.style.setProperty("--ry",`${c*22}deg`),g.current.style.setProperty("--rx",`${-h*12}deg`)},[e]),v=S.useCallback(()=>{g.current&&(g.current.style.setProperty("--ry","0deg"),g.current.style.setProperty("--rx","0deg"))},[]),j=(x,d,c,h,y=3.2)=>Array.from({length:h},(w,E)=>{const b=d+(c-d)/(h-1)*E;return l.jsxs("g",{children:[l.jsx("circle",{cx:b,cy:x,r:y,className:"hm-pearl"}),l.jsx("circle",{cx:b-y*.3,cy:x-y*.32,r:y*.34,className:"hm-pearl-hi"})]},`${x}-${E}`)});return l.jsxs("section",{className:`hm-section hm-cake-section ${o?"is-in":""}`,ref:r,children:[l.jsx(Tt,{greet:o,variant:"flank"}),l.jsxs("div",{className:"hm-section-head",children:[l.jsx("span",{className:"hm-eyebrow",children:_o("cake")}),l.jsx("h2",{className:"hm-h2",children:"Close your eyes"}),l.jsx("p",{className:"hm-sub",children:"One candle, one wish. Midnight can wait tonight."})]}),l.jsxs("div",{ref:i,className:`hm-cake-wrap ${s?"is-blown":""} ${a?"hm-idle":""}`,onPointerMove:k,onPointerLeave:v,children:[l.jsx("div",{className:"hm-cake-stage",children:l.jsxs("div",{ref:g,className:"hm-cake-3d",children:[l.jsx("span",{className:"hm-cake-depth hm-cake-depth-back"}),l.jsxs("svg",{ref:f,className:"hm-cake",viewBox:"0 -22 400 492",role:"img",preserveAspectRatio:"xMidYMid meet","aria-label":"A blush and gold birthday cake with a lit candle",children:[l.jsxs("defs",{children:[l.jsxs("linearGradient",{id:"tierA",x1:"0",y1:"0",x2:"1",y2:"0",children:[l.jsx("stop",{offset:"0",stopColor:"#B9718C"}),l.jsx("stop",{offset:".14",stopColor:"#DC9BB2"}),l.jsx("stop",{offset:".38",stopColor:"#F7DCE5"}),l.jsx("stop",{offset:".56",stopColor:"#FDF0F4"}),l.jsx("stop",{offset:".78",stopColor:"#EBB6C8"}),l.jsx("stop",{offset:".93",stopColor:"#C67F99"}),l.jsx("stop",{offset:"1",stopColor:"#A8637E"})]}),l.jsxs("linearGradient",{id:"tierB",x1:"0",y1:"0",x2:"1",y2:"0",children:[l.jsx("stop",{offset:"0",stopColor:"#A9647F"}),l.jsx("stop",{offset:".15",stopColor:"#D28FA9"}),l.jsx("stop",{offset:".4",stopColor:"#F3D2DE"}),l.jsx("stop",{offset:".58",stopColor:"#FBEAF0"}),l.jsx("stop",{offset:".8",stopColor:"#E2ABBF"}),l.jsx("stop",{offset:"1",stopColor:"#9A5872"})]}),l.jsxs("linearGradient",{id:"crown",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#FFF7FA"}),l.jsx("stop",{offset:".55",stopColor:"#F8DDE7"}),l.jsx("stop",{offset:"1",stopColor:"#E0AEC1"})]}),l.jsxs("linearGradient",{id:"gold",x1:"0",y1:"0",x2:"1",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#F4E0B4"}),l.jsx("stop",{offset:".38",stopColor:"#C79A5B"}),l.jsx("stop",{offset:".62",stopColor:"#EFD5A2"}),l.jsx("stop",{offset:"1",stopColor:"#B4834A"})]}),l.jsxs("linearGradient",{id:"board",x1:"0",y1:"0",x2:"1",y2:"0",children:[l.jsx("stop",{offset:"0",stopColor:"#B4834A"}),l.jsx("stop",{offset:".5",stopColor:"#F4E0B4"}),l.jsx("stop",{offset:"1",stopColor:"#B4834A"})]}),l.jsxs("linearGradient",{id:"seat",x1:"0",y1:"0",x2:"0",y2:"1",children:[l.jsx("stop",{offset:"0",stopColor:"#8E4F68",stopOpacity:".45"}),l.jsx("stop",{offset:"1",stopColor:"#8E4F68",stopOpacity:"0"})]}),l.jsxs("radialGradient",{id:"flameG",cx:".5",cy:".68",r:".62",children:[l.jsx("stop",{offset:"0",stopColor:"#FFFBEC"}),l.jsx("stop",{offset:".38",stopColor:"#FFD26B"}),l.jsx("stop",{offset:".72",stopColor:"#F59B34",stopOpacity:".8"}),l.jsx("stop",{offset:"1",stopColor:"#E8722A",stopOpacity:"0"})]}),l.jsxs("radialGradient",{id:"halo",cx:".5",cy:".5",r:".5",children:[l.jsx("stop",{offset:"0",stopColor:"#FFD79C",stopOpacity:".5"}),l.jsx("stop",{offset:"1",stopColor:"#FFD79C",stopOpacity:"0"})]}),l.jsxs("linearGradient",{id:"wax",x1:"0",y1:"0",x2:"1",y2:"0",children:[l.jsx("stop",{offset:"0",stopColor:"#D9A3B6"}),l.jsx("stop",{offset:".26",stopColor:"#FFF8FA"}),l.jsx("stop",{offset:".62",stopColor:"#FDEAF0"}),l.jsx("stop",{offset:"1",stopColor:"#C88CA2"})]}),l.jsx("filter",{id:"soft",x:"-60%",y:"-60%",width:"220%",height:"220%",children:l.jsx("feGaussianBlur",{stdDeviation:"5"})})]}),l.jsx("ellipse",{className:"hm-halo",cx:"200",cy:"104",rx:"140",ry:"120",fill:"url(#halo)"}),l.jsxs("g",{className:"hm-flame-grp",children:[l.jsx("path",{className:"hm-flame-a",d:"M200 58c17 18 24 30 24 42 0 14-11 24-24 24s-24-10-24-24c0-12 7-24 24-42z",fill:"url(#flameG)"}),l.jsx("path",{className:"hm-flame-b",d:"M200 72c11 13 15 21 15 29 0 9-6 15-15 15s-15-6-15-15c0-8 4-16 15-29z",fill:"#FFE9A8",opacity:".9"}),l.jsx("path",{className:"hm-flame-c",d:"M200 84c6 8 9 13 9 18 0 6-4 10-9 10s-9-4-9-10c0-5 3-10 9-18z",fill:"#FFFDF2"})]}),l.jsx("g",{className:"hm-smoke",children:l.jsx("path",{d:"M200 118c-9 13 9 19 0 32s7 19 0 30",stroke:"#EFDCE4",strokeWidth:"4",strokeLinecap:"round",fill:"none",filter:"url(#soft)"})}),l.jsx("path",{className:"hm-wick",d:"M200 132c0-8 2-12 1-18",stroke:"#4A3226",strokeWidth:"2.6",strokeLinecap:"round",fill:"none"}),l.jsx("path",{d:"M193 132c0-4 1-6 2-8h10c1 2 2 4 2 8v56h-14z",fill:"url(#wax)"}),l.jsx("path",{d:"M193 140c5 3 9 3 14 0",stroke:"#E7B6C6",strokeWidth:"1.6",fill:"none",opacity:".7"}),l.jsx("ellipse",{cx:"200",cy:"132",rx:"7",ry:"2.4",fill:"#FFF8FA",opacity:".9"}),l.jsx("path",{d:"M191 188h18l-2.5 9h-13z",fill:"url(#gold)"}),l.jsx("ellipse",{cx:"200",cy:"200",rx:"54",ry:"14",fill:"url(#crown)"}),l.jsx("path",{d:"M146 200v44a54 14 0 0 0 108 0v-44z",fill:"url(#tierA)"}),l.jsx("path",{className:"hm-drip",d:"M146 202c0 9 3 14 8 14s7-9 12-9 7 13 13 13 7-15 13-15 8 12 14 12 7-13 13-13 8 10 13 10 8-6 8-14v-2a54 14 0 0 1-108 0z",fill:"#FFF6F9",opacity:".92"}),l.jsx("ellipse",{cx:"200",cy:"200",rx:"54",ry:"14",fill:"none",stroke:"url(#gold)",strokeWidth:"2"}),l.jsx("g",{className:"hm-piping",children:j(243,152,248,9,3)}),l.jsx("path",{d:"M158 222c14 6 30 9 42 9s28-3 42-9",stroke:"#FFFFFF",strokeWidth:"1.6",fill:"none",opacity:".3"}),l.jsx("ellipse",{cx:"200",cy:"258",rx:"60",ry:"12",fill:"url(#seat)"}),l.jsx("ellipse",{cx:"200",cy:"258",rx:"80",ry:"19",fill:"url(#crown)"}),l.jsx("path",{d:"M120 258v62a80 19 0 0 0 160 0v-62z",fill:"url(#tierB)"}),l.jsx("path",{className:"hm-drip",d:"M120 260c0 11 4 17 10 17s8-11 15-11 8 15 16 15 9-17 16-17 9 14 17 14 9-15 16-15 9 12 16 12 12-7 12-15v-2a80 19 0 0 1-160 0z",fill:"#FFF6F9",opacity:".9"}),l.jsx("ellipse",{cx:"200",cy:"258",rx:"80",ry:"19",fill:"none",stroke:"url(#gold)",strokeWidth:"2.2"}),l.jsxs("g",{className:"hm-swirls",children:[l.jsx("path",{d:"M132 290c22 11 44 16 68 16s46-5 68-16",stroke:"#FFFFFF",strokeWidth:"2",fill:"none",opacity:".24"}),l.jsx("path",{d:"M128 304c24 12 46 17 72 17s48-5 72-17",stroke:"#FFFFFF",strokeWidth:"1.5",fill:"none",opacity:".18"}),l.jsx("path",{d:"M136 276c20 9 40 13 64 13s44-4 64-13",stroke:"#A9647F",strokeWidth:"1.2",fill:"none",opacity:".14"})]}),l.jsxs("g",{className:"hm-bow",transform:"translate(200 292)",children:[l.jsx("path",{d:"M0 0c-4-7-14-9-17-5s3 10 11 7c-6 5-4 10 1 8 3-1 5-5 5-10z",fill:"url(#gold)",opacity:".9"}),l.jsx("path",{d:"M0 0c4-7 14-9 17-5s-3 10-11 7c6 5 4 10-1 8-3-1-5-5-5-10z",fill:"url(#gold)",opacity:".9"}),l.jsx("circle",{cx:"0",cy:"0",r:"2.6",fill:"#FFF3D6"})]}),l.jsx("g",{className:"hm-piping",children:j(319,124,276,13,3.4)}),l.jsx("ellipse",{cx:"200",cy:"338",rx:"88",ry:"14",fill:"url(#seat)"}),l.jsx("ellipse",{cx:"200",cy:"338",rx:"108",ry:"25",fill:"url(#crown)"}),l.jsx("path",{d:"M92 338v78a108 25 0 0 0 216 0v-78z",fill:"url(#tierA)"}),l.jsx("path",{className:"hm-drip",d:"M92 340c0 13 5 20 12 20s10-13 18-13 10 18 19 18 11-20 19-20 11 16 20 16 11-18 19-18 11 14 20 14 15-9 15-17v-2a108 25 0 0 1-216 0z",fill:"#FFF6F9",opacity:".88"}),l.jsx("ellipse",{cx:"200",cy:"338",rx:"108",ry:"25",fill:"none",stroke:"url(#gold)",strokeWidth:"2.6"}),l.jsxs("g",{className:"hm-swirls",children:[l.jsx("path",{d:"M104 374c30 14 60 20 96 20s66-6 96-20",stroke:"#FFFFFF",strokeWidth:"2.2",fill:"none",opacity:".22"}),l.jsx("path",{d:"M100 392c32 15 62 21 100 21s68-6 100-21",stroke:"#FFFFFF",strokeWidth:"1.6",fill:"none",opacity:".16"})]}),l.jsx("g",{className:"hm-lace-arc",children:[0,1,2,3,4,5].map(x=>l.jsx("path",{d:`M${106+x*32} 396c8 12 24 12 32 0`,stroke:"url(#gold)",strokeWidth:"1.6",fill:"none",opacity:".75"},x))}),l.jsx("g",{className:"hm-piping",children:j(376,100,300,15,3.8)}),l.jsx("g",{className:"hm-flecks",children:[[166,228],[238,220],[142,300],[262,296],[120,382],[282,378],[200,232],[176,364],[228,388],[154,268],[250,272]].map(([x,d],c)=>l.jsx("circle",{cx:x,cy:d,r:"1.6",fill:"#F6E4BC",style:{animationDelay:`${c*.34}s`}},c))}),l.jsx("ellipse",{cx:"200",cy:"440",rx:"132",ry:"17",fill:"#8E4F68",opacity:".2"}),l.jsx("path",{d:"M68 428h264a11 11 0 0 1-7 13H75a11 11 0 0 1-7-13z",fill:"url(#board)",opacity:".92"}),l.jsxs("g",{className:"hm-topper",transform:"translate(228 176) rotate(-9) scale(.6)",children:[l.jsx("path",{d:"M6 30c8 2 16 1 24-3 6-3 10-8 16-11 5-2.5 10-2 13 1 2.5 2.5 2 6-1 8-6 4-14 6-22 7-9 1.2-18 1.4-27 1-2.5-.1-3.6-2.4-3-3z",fill:"#F7E2EA",opacity:".95",stroke:"url(#gold)",strokeWidth:"1.6"}),l.jsx("path",{d:"M46 16c2-4 6-8 10-9",stroke:"#F4E0B4",strokeWidth:"1.6",strokeLinecap:"round"}),l.jsx("circle",{cx:"57",cy:"6",r:"2.6",fill:"#FFF3D6"})]})]}),l.jsx("span",{className:"hm-cake-depth hm-cake-depth-front"})]})}),l.jsxs("button",{className:`hm-btn hm-btn-coral hm-wish-btn ${s?"is-done":""}`,onClick:m,disabled:s,"aria-live":"polite",children:[l.jsx("span",{className:"hm-btn-ico",children:s?l.jsx(Pt,{width:"18"}):l.jsx(zo,{width:"18"})}),s?"Wish made":"Make a wish"]}),l.jsx("p",{className:`hm-wish-note ${s?"is-on":""}`,children:"Whatever you asked for — consider it in motion."})]}),l.jsx(ea,{icon:"slipper"})]})}const xs=[["#F6B9CE","#D07E9E"],["#E9A9C2","#B0648A"],["#D9BFF0","#9B78C6"],["#FBC4AE","#DA7A60"],["#F2D8C6","#C98673"],["#FFF0F5","#E9A9C2"]];function yp(e){return Array.from({length:e},(t,n)=>{const[r,o]=xs[n%xs.length];return{x:n*37.4%100,size:26+n*13%30,dur:5.2+n*7%40/10,delay:n*11%26/10,sway:20+n*17%60,swayDur:2.2+n*5%18/10,tilt:(n%5-2)*4,light:r,dark:o}})}const co=["#FFF3D2","#EBD3A4","#D98BA6","#C79A5B","#FFFFFF","#F6D5E0","#C98A72"];function vp(e,t){const n=[];for(let r=0;r<e;r++){const o=[];for(let i=0;i<t;i++){const a=i/t*Math.PI*2+Math.random()*.4,s=90+Math.random()*190;o.push({dx:Math.cos(a)*s,dy:Math.sin(a)*s,c:co[Math.random()*co.length|0],s:3+Math.random()*4,dur:1.1+Math.random()*.7})}n.push({x:6+Math.random()*88,y:8+Math.random()*62,delay:r*.34+Math.random()*.2,pieces:o})}return n}function xp(e){return Array.from({length:e},(t,n)=>({x:Math.random()*100,delay:Math.random()*3.2,dur:3.4+Math.random()*2.6,drift:(Math.random()-.5)*220,spin:360+Math.random()*900,c:co[Math.random()*co.length|0],w:5+Math.random()*5,h:9+Math.random()*8}))}function wp({active:e,reduced:t,lowPower:n,onDone:r}){const o=n?.42:1,i=v=>Math.max(1,Math.round(v*o)),a=hn(),s=S.useRef([]),u=S.useRef(r);u.current=r;const[f,p]=S.useState("idle"),m=S.useMemo(()=>e&&!t?vp(n?9:16,n?14:22):[],[e,t,n]),g=S.useMemo(()=>e&&!t?xp(n?40:80):[],[e,t,n]),k=S.useMemo(()=>e?yp(t?10:n?28:56):[],[e,t,n]);return S.useEffect(()=>{if(!e)return;const v=(w,E)=>s.current.push(setTimeout(E,w)),j=()=>a.current,x=()=>window.innerWidth,d=()=>window.innerHeight;if(p("bloom"),v(260,()=>p("party")),v(1500,()=>p("banner")),v(8200,()=>p("out")),v(10500,()=>{p("idle"),u.current&&u.current()}),[0,260,520,900,1400,2100].forEach((w,E)=>v(w,()=>Xe.chime([1046.5,1318.5,1568,2093,1568,1318.5][E]))),t)return()=>{s.current.forEach(clearTimeout),s.current=[]};[[.5,.42],[.18,.3],[.82,.3]].forEach(([w,E],b)=>v(b*90,()=>{const F=j();F&&F.burst(x()*w,d()*E,i(110),700,b===0)}));for(let w=0;w<(n?8:18);w++)v(60+w*170,()=>{const E=j();E&&(E.spray(x()*.06,d()+10,i(16),-Math.PI/2.35,.55,900),E.spray(x()*.94,d()+10,i(16),-Math.PI/1.75,.55,900))});const c=(w,E)=>v(w,()=>{const b=j();if(!b)return;const F=x()*E+(Math.random()-.5)*60,A=b.rocket(F,d()+20,900+Math.random()*260);v(A,()=>{const M=j();M&&M.burst(F,d()*(.16+Math.random()*.24),i(78),620,Math.random()>.6)})}),h=[[120,.2],[260,.78],[430,.45],[640,.12],[860,.88],[1150,.62],[1500,.3],[1900,.7],[2350,.5],[2850,.22],[3350,.8],[3900,.4],[4500,.66],[5100,.28]];(n?h.filter((w,E)=>E%2===0):h).forEach(([w,E])=>c(w,E));for(let w=0;w<(n?14:26);w++)v(240+w*(n?380:230),()=>{const E=j();E&&E.burst(x()*(.06+Math.random()*.88),d()*(.08+Math.random()*.72),i(56+Math.random()*30),380+Math.random()*280,w%3===0)});let y=0;return v(320,()=>{let w=0;y=setInterval(()=>{const E=j();if(!E||document.hidden)return;const b=i(w<55?6:w<90?3:1);for(let F=0;F<b;F++)E.confetti(Math.random()*x(),-20);++w>120&&(clearInterval(y),y=0)},70)}),()=>{s.current.forEach(clearTimeout),s.current=[],y&&clearInterval(y)}},[e,t,a,o]),f==="idle"?null:l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:`hm-finale-under is-${f}`,"aria-hidden":"true",children:[l.jsx("div",{className:"hm-finale-bloom"}),l.jsx("div",{className:"hm-finale-glow"})]}),l.jsx("div",{className:`hm-balloons is-${f}`,"aria-hidden":"true",children:k.map((v,j)=>l.jsxs("span",{className:"hm-balloon",style:{left:`${v.x}%`,"--size":`${v.size}px`,"--light":v.light,"--dark":v.dark,"--sway":`${v.sway}px`,"--tilt":`${v.tilt}deg`,animationDuration:`${v.dur}s`,animationDelay:`${v.delay}s`},children:[l.jsxs("span",{className:"hm-balloon-body",style:{animationDuration:`${v.swayDur}s`},children:[l.jsx("i",{className:"hm-balloon-shine"}),l.jsx("i",{className:"hm-balloon-knot"})]}),l.jsx("i",{className:"hm-balloon-string"})]},j))}),l.jsxs("div",{className:`hm-finale-fw is-${f}`,"aria-hidden":"true",children:[m.map((v,j)=>l.jsxs("span",{className:"hm-fw",style:{left:`${v.x}%`,top:`${v.y}%`},children:[l.jsx("span",{className:"hm-fw-core",style:{animationDelay:`${v.delay}s`}}),v.pieces.map((x,d)=>l.jsx("i",{style:{"--dx":`${x.dx}px`,"--dy":`${x.dy}px`,"--c":x.c,"--s":`${x.s}px`,animationDelay:`${v.delay}s`,animationDuration:`${x.dur}s`}},d))]},j)),g.map((v,j)=>l.jsx("b",{className:"hm-fw-confetti",style:{left:`${v.x}%`,"--drift":`${v.drift}px`,"--spin":`${v.spin}deg`,"--c":v.c,width:`${v.w}px`,height:`${v.h}px`,animationDelay:`${v.delay}s`,animationDuration:`${v.dur}s`}},`c${j}`))]}),l.jsx("div",{className:`hm-finale is-${f}`,"aria-hidden":"true",children:l.jsxs("div",{className:"hm-finale-banner",children:[l.jsx("span",{className:"hm-finale-eyebrow hm-micro",children:"Happy birthday"}),l.jsx("span",{className:"hm-finale-name",children:At}),l.jsx("span",{className:"hm-finale-rule"}),l.jsx("span",{className:"hm-finale-sub",children:Pc})]})})]})}const kp=[{k:"Health",t:"That you stay healthy and strong, and never have to be brave about it."},{k:"Future",t:"That whatever you're working toward actually happens — and it's even better than you pictured."},{k:"Ease",t:"That the things weighing on you get lighter this year, one by one."},{k:"Faith",t:"That Allah makes things easy for you — today, and every day after."},{k:"Joy",t:"That your ordinary days feel good too, not just the special ones."}];function jp(){const[e,t]=Mo();return l.jsxs("section",{className:`hm-section hm-wishes ${t?"is-in":""}`,ref:e,children:[l.jsx(nl,{className:"hm-butterfly hm-butterfly-3",width:"38"}),l.jsx(Tt,{greet:t,variant:"corner"}),l.jsxs("div",{className:"hm-aside-grid hm-aside-grid--flip",children:[l.jsxs("header",{className:"hm-aside-head hm-aside-head--sticky",children:[l.jsx("span",{className:"hm-eyebrow",children:_o("wishes")}),l.jsxs("h2",{className:"hm-h2 hm-h2-aside",children:["What I'd",l.jsx("br",{}),"wish for you"]}),l.jsx("span",{className:"hm-aside-rule","aria-hidden":"true"}),l.jsx("p",{className:"hm-amen",children:"And du'as for the parts a friend can't fix — just Allah can."})]}),l.jsx("ul",{className:"hm-wish-list",children:kp.map((n,r)=>l.jsxs("li",{className:"hm-wish-card",style:{"--delay":`${r*40}ms`},children:[l.jsx("span",{className:"hm-wish-gem","aria-hidden":"true"}),l.jsx("h3",{className:"hm-micro",children:n.k}),l.jsx("p",{children:n.t})]},n.k))})]})]})}function Ep(){const[e,t]=ql();return l.jsxs("footer",{ref:e,className:`hm-footer hm-on-dark ${t?"hm-idle":""}`,children:[l.jsx(Tt,{greet:!0,variant:"corner",className:"hm-dolls-footer"}),l.jsx(ta,{className:"hm-footer-sky",lit:!0}),l.jsx(Pt,{className:"hm-footer-mark",width:"40"}),l.jsx("p",{className:"hm-footer-close hm-micro",children:"That's everything I wanted to say"}),l.jsxs("p",{className:"hm-footer-line",children:["Happy birthday, ",l.jsx("span",{className:"hm-shimmer hm-shimmer-slow",children:At})]}),l.jsxs("p",{className:"hm-footer-albatross",children:[l.jsx("span",{className:"hm-albatross-rule","aria-hidden":"true"}),"for the ",No,l.jsx("span",{className:"hm-albatross-rule","aria-hidden":"true"})]}),l.jsx("p",{className:"hm-footer-sub",children:"Go wherever this year takes you. Just know there's always a way back here, and someone glad to see you when you do."}),l.jsxs("p",{className:"hm-footer-credit",children:["Made for ",At,", by Muneeb"]})]})}const Cp="hamna-birthday-page.png",ws=12e3;async function Fp(){const e=document.documentElement,t=Math.max(320,window.innerHeight*.9),n=Math.max(e.scrollHeight,document.body.scrollHeight)-window.innerHeight;for(let r=0;r<n;r+=t)window.scrollTo(0,r),await new Promise(o=>setTimeout(o,90));window.scrollTo(0,n),await new Promise(r=>setTimeout(r,160)),window.scrollTo(0,0),await new Promise(r=>setTimeout(r,900))}function Sp(){const[e,t]=S.useState("idle"),n=S.useRef(!1),r=S.useRef(null);S.useEffect(()=>()=>clearTimeout(r.current),[]);const o=S.useCallback(async()=>{if(n.current)return;n.current=!0,clearTimeout(r.current),t("working");const a=document.querySelector(".hm-root"),s=window.scrollY;let u=null;try{await Fp(),a&&a.classList.add("is-capturing"),await new Promise(d=>requestAnimationFrame(()=>requestAnimationFrame(d)));const{default:f}=await mh(async()=>{const{default:d}=await import("./html2canvas.esm-CBrSDip1.js");return{default:d}},[]),p=document.documentElement,m=Math.max(p.scrollWidth,document.body.scrollWidth,p.clientWidth),g=Math.max(p.scrollHeight,document.body.scrollHeight,p.clientHeight);let k=Math.min(window.devicePixelRatio||1,2);k=Math.min(k,ws/g,ws/m),(!(k>0)||!isFinite(k))&&(k=1);const v=await f(document.body,{backgroundColor:"#2B1526",scale:k,useCORS:!0,logging:!1,width:m,height:g,scrollX:0,scrollY:0,ignoreElements:d=>d.nodeType===1&&typeof d.hasAttribute=="function"&&d.hasAttribute("data-no-capture"),onclone:d=>{const c=d.querySelector(".hm-root");c&&c.classList.add("is-capturing")}}),j=await new Promise(d=>v.toBlob(d,"image/png"));if(!j)throw new Error("canvas.toBlob produced nothing");u=URL.createObjectURL(j);const x=document.createElement("a");if("download"in x)x.href=u,x.download=Cp,x.rel="noopener",document.body.appendChild(x),x.click(),x.remove();else if(!window.open(u,"_blank"))throw new Error("blocked opening the image in a new tab");t("done")}catch(f){console.warn("[hamna] full-page capture failed:",f),t("error")}finally{a&&a.classList.remove("is-capturing"),window.scrollTo(0,s),n.current=!1,u&&setTimeout(()=>URL.revokeObjectURL(u),6e4),r.current=setTimeout(()=>t("idle"),2800)}},[]),i=e==="working"?"saving…":e==="done"?"saved":e==="error"?"try again":"save page";return l.jsxs("button",{className:`hm-music-btn hm-cap-btn is-${e}`,onClick:o,disabled:e==="working","aria-label":"Save the whole page as an image","aria-busy":e==="working",children:[l.jsx("span",{className:"hm-cap-ico","aria-hidden":"true",children:e==="working"?l.jsx(Mp,{}):e==="done"?l.jsx(Np,{}):e==="error"?l.jsx(_p,{}):l.jsx(bp,{})}),l.jsx("span",{className:"hm-music-label hm-micro",children:i})]})}const bp=()=>l.jsxs("svg",{viewBox:"0 0 24 24",width:"17",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[l.jsx("path",{d:"M3 8.5A1.5 1.5 0 0 1 4.5 7h2.2l1.2-2h8.2l1.2 2h2.2A1.5 1.5 0 0 1 21 8.5v9A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5z"}),l.jsx("circle",{cx:"12",cy:"13",r:"3.6"})]}),Np=()=>l.jsx("svg",{viewBox:"0 0 24 24",width:"17",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:l.jsx("path",{d:"M4.5 12.5l5 5 10-11"})}),_p=()=>l.jsxs("svg",{viewBox:"0 0 24 24",width:"17",fill:"none",stroke:"currentColor",strokeWidth:"1.8",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[l.jsx("path",{d:"M20 12a8 8 0 1 1-2.6-5.9"}),l.jsx("path",{d:"M20 4v5h-5"})]}),Mp=()=>l.jsxs("svg",{viewBox:"0 0 24 24",width:"17",fill:"none",stroke:"currentColor",strokeWidth:"2.1",strokeLinecap:"round",className:"hm-cap-spin","aria-hidden":"true",children:[l.jsx("circle",{cx:"12",cy:"12",r:"8.5",opacity:".3"}),l.jsx("path",{d:"M12 3.5a8.5 8.5 0 0 1 8.5 8.5"})]});function zp({hidden:e}){const{muted:t,blocked:n,playing:r}=tp(),o=r&&!t&&!n;return l.jsxs("div",{className:`hm-topbar ${e?"is-hidden":""}`,"data-no-capture":"",children:[l.jsxs("span",{className:"hm-topbar-mark","aria-hidden":"true",children:[l.jsx(Pt,{width:"20"}),l.jsx("span",{className:"hm-topbar-name",children:At})]}),l.jsxs("div",{className:"hm-topbar-controls",children:[l.jsxs("button",{className:`hm-music-btn ${n?"is-blocked":""} ${t?"is-muted":""}`,onClick:()=>Xe.toggleMute(),"aria-label":n?"Tap to play the music":t?"Play the music":"Stop the music","aria-pressed":t,children:[l.jsxs("span",{className:`hm-eq ${o?"is-live":""}`,"aria-hidden":"true",children:[l.jsx("i",{}),l.jsx("i",{}),l.jsx("i",{}),l.jsx("i",{})]}),l.jsx("span",{className:"hm-music-label hm-micro",children:n?"tap to play":t?"music off":"stop music"}),l.jsx("span",{className:"hm-music-ico","aria-hidden":"true",children:n?l.jsx(zo,{width:"16"}):t?l.jsx(Lp,{}):l.jsx(Ap,{})})]}),l.jsx(Sp,{})]})]})}const Ap=()=>l.jsxs("svg",{viewBox:"0 0 24 24",width:"18",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[l.jsx("path",{d:"M4 9v6h4l5 4V5L8 9z",fill:"currentColor",stroke:"none"}),l.jsx("path",{d:"M16.5 8.5a5 5 0 0 1 0 7"}),l.jsx("path",{d:"M19 6a8.5 8.5 0 0 1 0 12",opacity:".6"})]}),Lp=()=>l.jsxs("svg",{viewBox:"0 0 24 24",width:"18",fill:"none",stroke:"currentColor",strokeWidth:"1.7",strokeLinecap:"round","aria-hidden":"true",children:[l.jsx("path",{d:"M4 9v6h4l5 4V5L8 9z",fill:"currentColor",stroke:"none"}),l.jsx("path",{d:"M17 10l4 4M21 10l-4 4"})]}),Bp="hamna-site 2026-08-15 · finale-v4 (DOM fireworks)";function Pp(){S.useEffect(()=>{console.info("%c"+Bp,"color:#C79A5B")},[]);const e=Kh(),t=Xh(),n=S.useRef(null),[r,o]=S.useState(!1),[i,a]=S.useState(!1),s=S.useCallback(()=>a(!1),[]),u=S.useCallback(()=>a(!0),[]),[f,p]=S.useState({open:!1,index:0,origin:null}),m=e?0:t?700:2200,g=S.useMemo(()=>typeof window<"u"&&window.matchMedia("(pointer: fine)").matches,[]),k=!e&&!t&&g&&r,v=S.useCallback((j,x)=>{p({open:!0,index:j,origin:x}),Xe.chime(1174.7)},[]);return l.jsxs(Tc.Provider,{value:n,children:[l.jsx("style",{children:Tp}),l.jsxs("div",{className:`hm-root ${r?"is-started":""} ${e?"is-calm":""} ${i?"is-celebrating":""}`,children:[l.jsx(np,{enabled:m>0,budget:m}),l.jsx(op,{enabled:k}),l.jsx(up,{onOpen:()=>o(!0),reduced:e}),l.jsxs("main",{className:"hm-page","aria-hidden":!r,children:[l.jsx(sp,{reduced:e}),l.jsx(dp,{started:r,reduced:e}),l.jsx(gp,{reduced:e,lowPower:t,onWish:u}),l.jsx(hp,{onOpen:v,reduced:e,lowPower:t}),l.jsx(mp,{}),l.jsx(jp,{}),l.jsx(Ep,{})]}),l.jsx(pp,{open:f.open,index:f.index,origin:f.origin,reduced:e,onClose:()=>p(j=>({...j,open:!1})),onIndex:j=>p(x=>({...x,index:j}))}),l.jsx(wp,{active:i,reduced:e,lowPower:t,onDone:s}),r&&l.jsx(zp,{hidden:f.open})]})]})}const Tp=`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&family=Pinyon+Script&display=swap');

.hm-root{
  /* ── palette ─────────────────────────────────────────────────────────────
     Rose leads, as before, but the secondary accents are LILAC and CORAL
     instead of the Cinderella blue/gold of the previous build — related in
     temperature, unmistakably its own thing. Rose-gold does the trim work.  */
  --plum:#2B1526;          /* deepest — hero top, footer base            */
  --wine:#5E2A4A;          /* mid dark                                    */
  --mauve:#B06A88;         /* the hinge between dark and light            */
  --rose:#E28FAE;          /* primary accent                              */
  --blush:#FAD6E2;         /* dominant surface tint                       */
  --petal:#FDEDF2;         /* page background                             */
  --ivory:#FFFAF8;         /* cards, frames                               */
  --rosegold:#C98673;      /* trim, dividers, icons — decorative only     */
  --rosegold-ink:#8E4756;  /* the text-safe rose: 6.4:1 ivory, 4.9:1 blush*/
  --lilac:#C3A4E4;         /* secondary accent — sparkle, gems, stars     */
  --lilac-deep:#7E5AA8;
  --coral:#F4A088;         /* secondary accent — warmth, flame, glow      */
  --coral-deep:#C96A55;    /* decorative only — 3.3:1, never used for text */
  --coral-ink:#A0452F;     /* the text-safe coral: 6.4:1 ivory, 5.1:1 blush */
  --gold-lite:#F2D8C6;     /* light trim on dark (rose-gold, not yellow)  */
  --gold:#C98673;

  /* ── text tokens — the contrast safeguard ────────────────────────────────
     Every text rule resolves to one of these four. Sections declare which
     regime they're in; no rule invents its own colour. That's what stops a
     heading quietly matching its background.                               */
  --on-light:#48213A;      /* 10.1:1 on --petal, 11.8:1 on --ivory        */
  --on-light-soft:#7A4460; /* 5.5:1 on --petal — the minimum used anywhere */
  --on-dark:#FFF2F7;
  --on-dark-soft:#EFC8DA;
  --shadow-on-dark:0 1px 14px rgba(43,21,38,.75), 0 0 2px rgba(43,21,38,.5);
  --scrim-light:radial-gradient(58% 62% at 50% 50%,
    rgba(255,250,248,.94) 0%, rgba(255,250,248,.72) 55%, rgba(255,250,248,0) 100%);

  --ink:var(--on-light);

  --font-display:'Cormorant Garamond','Didot','Bodoni MT',Georgia,serif;
  --font-script:'Pinyon Script','Snell Roundhand','Apple Chancery',cursive;
  --font-ui:'Jost','Futura','Avenir Next',system-ui,sans-serif;

  /* Soft means smooth, not slow. These are the only easings used. */
  --ease-soft:cubic-bezier(.22,1,.28,1);
  --ease-spring:cubic-bezier(.34,1.42,.44,1);

  position:relative;
  min-height:100vh;
  background:var(--plum);
  color:var(--on-light);
  font-family:var(--font-ui);
  font-weight:300;
  overflow-x:hidden;
  -webkit-font-smoothing:antialiased;
}
.hm-root *,.hm-root *::before,.hm-root *::after{box-sizing:border-box;}
.hm-root :focus-visible{outline:2px solid var(--gold);outline-offset:4px;border-radius:4px;}

/* ── shared type ─────────────────────────────────────────────────────── */
.hm-eyebrow{
  font-family:var(--font-ui);font-size:.72rem;font-weight:500;
  letter-spacing:.28em;text-transform:uppercase;color:var(--rosegold-ink);
  display:block;margin-bottom:1rem;
}
.hm-h2{
  font-family:var(--font-display);font-weight:300;font-style:italic;
  font-size:clamp(2.1rem,6vw,3.6rem);line-height:1.05;color:var(--wine);
  margin:0 0 .6rem;
}
.hm-sub{
  font-size:clamp(.9rem,2.4vw,1rem);color:var(--on-light-soft);max-width:34ch;
  margin:0 auto;line-height:1.7;
}
.hm-section{position:relative;padding:clamp(4.5rem,11vw,8rem) 1.25rem 0;}
.hm-section-head{
  position:relative;text-align:center;max-width:44rem;
  margin:0 auto clamp(2.2rem,6vw,3.8rem);
}
/* Soft scrim behind every section heading. This is the general safeguard:
   whatever the background does underneath, headings sit on a known surface. */
.hm-section-head::before{
  content:"";position:absolute;inset:-18% -8%;z-index:-1;
  background:var(--scrim-light);pointer-events:none;
}

/* ── particles + cursor ──────────────────────────────────────────────── */
.hm-particles{
  position:fixed;inset:0;width:100%;height:100%;
  pointer-events:none;z-index:70;
}
.hm-cursor-dot{
  position:fixed;top:0;left:0;width:12px;height:12px;border-radius:50%;
  background:radial-gradient(circle,#FFF8E2 0%,#F6E2AE 45%,rgba(217,169,79,0) 72%);
  box-shadow:0 0 18px 6px rgba(235,211,164,.4),0 0 26px 10px rgba(217,139,166,.28);
  pointer-events:none;z-index:46;will-change:transform;
}
.hm-cursor-photo{
  position:fixed;top:0;left:0;width:104px;height:150px;pointer-events:none;z-index:45;
  opacity:0;transform-origin:center;
  transition:opacity .3s var(--ease-soft);
  will-change:transform,opacity;
}
/* identical treatment to .hm-frame-inner — same paper, same hairline, same
   shadow — so the trail belongs to the gallery's visual language */
.hm-cursor-photo img{
  position:absolute;inset:0;width:100%;height:100%;
  object-fit:cover;object-position:center 22%;
  padding:7px 7px 26px;
  background:linear-gradient(160deg,#FFFDF9,#F3EDE3);
  border-radius:3px;
  box-shadow:0 1px 0 rgba(201,138,114,.55),0 18px 34px -14px rgba(46,24,38,.5);
  opacity:0;transform:rotate(-3.5deg) scale(.94);
  transition:opacity .3s var(--ease-soft),transform .3s var(--ease-soft);
}
/* alternate the resting tilt so consecutive previews don't look stamped */
.hm-cursor-photo img:nth-child(even){transform:rotate(3.5deg) scale(.94);}
.hm-cursor-photo img.is-active{opacity:1;transform:rotate(-2.5deg) scale(1);}
.hm-cursor-photo img:nth-child(even).is-active{transform:rotate(2.5deg) scale(1);}
@media (pointer:coarse){.hm-cursor-dot,.hm-cursor-photo{display:none;}}

/* ── castle sky ──────────────────────────────────────────────────────── */
.hm-castle{position:absolute;inset:auto 0 0 0;width:100%;height:58%;pointer-events:none;}
.hm-castle-body{fill:#3A1E2F;opacity:.92;}
.hm-star{fill:#FFF6DF;opacity:.15;animation:twinkle 4.2s ease-in-out infinite;}
@keyframes twinkle{0%,100%{opacity:.12;}50%{opacity:.85;}}
.hm-castle-windows rect{fill:#F6E2AE;opacity:0;transition:opacity .5s;}
.hm-castle.is-lit .hm-castle-windows rect{opacity:.85;animation:windowGlow 3.4s ease-in-out infinite;}
@keyframes windowGlow{0%,100%{opacity:.55;}50%{opacity:.95;}}

/* ── butterflies ─────────────────────────────────────────────────────── */
.hm-butterfly{position:absolute;color:var(--lilac);pointer-events:none;opacity:.55;}
.hm-butterfly-1{top:22%;left:9%;animation:drift1 22s ease-in-out infinite;}
.hm-butterfly-2{top:62%;right:12%;color:var(--blush);animation:drift2 27s ease-in-out infinite;}
.hm-butterfly-3{top:8%;right:8%;color:var(--rose);animation:drift1 25s ease-in-out infinite;}
.hm-wing{transform-origin:30px 24px;animation:flap 1.1s ease-in-out infinite;}
.hm-wing-r{animation-delay:-.05s;}
@keyframes flap{0%,100%{transform:rotateY(0deg);}50%{transform:rotateY(58deg);}}
@keyframes drift1{
  0%{transform:translate3d(0,0,0) rotate(-4deg);}
  33%{transform:translate3d(70px,-52px,0) rotate(6deg);}
  66%{transform:translate3d(-40px,-96px,0) rotate(-8deg);}
  100%{transform:translate3d(0,0,0) rotate(-4deg);}
}
@keyframes drift2{
  0%{transform:translate3d(0,0,0) rotate(5deg);}
  50%{transform:translate3d(-86px,-70px,0) rotate(-7deg);}
  100%{transform:translate3d(0,0,0) rotate(5deg);}
}

/* ── divider ─────────────────────────────────────────────────────────── */
.hm-divider{
  display:flex;align-items:center;justify-content:center;gap:.9rem;
  max-width:34rem;margin:clamp(3.5rem,8vw,5.5rem) auto 0;color:var(--rosegold);
  padding-bottom:clamp(1.5rem,4vw,3rem);
}
.hm-divider-line{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.55;}
.hm-divider-bow svg{width:52px;display:block;}
.hm-divider-icon{opacity:.8;display:flex;}

/* ═══ ENTRY GATE ════════════════════════════════════════════════════════ */
.hm-gate{
  position:fixed;inset:0;z-index:90;display:grid;place-items:center;
  background:radial-gradient(120% 90% at 50% 10%,#7C3D5B 0%,#4A2338 44%,#20101B 100%);
  cursor:pointer;padding:2rem 1.25rem;
  padding-bottom:calc(2rem + env(safe-area-inset-bottom));
  transition:opacity .62s var(--ease-soft);
}
.hm-gate.is-opening{opacity:0;pointer-events:none;}
.hm-gate-sky{height:52%;opacity:.85;}
.hm-gate-flash{
  position:absolute;inset:0;background:radial-gradient(circle at 50% 45%,#FFF6DF,transparent 62%);
  opacity:0;pointer-events:none;
}
.hm-gate.is-opening .hm-gate-flash{animation:flash 1.1s var(--ease-soft) forwards;}
@keyframes flash{0%{opacity:0;}18%{opacity:.75;}100%{opacity:0;}}

.hm-invite{
  position:relative;text-align:center;max-width:26rem;width:100%;
  padding:clamp(2.5rem,7vw,3.5rem) clamp(1.5rem,5vw,2.75rem) clamp(2rem,6vw,3rem);
  background:linear-gradient(160deg,rgba(251,246,239,.97),rgba(240,232,244,.94));
  border-radius:6px;
  box-shadow:0 40px 90px -30px rgba(0,0,0,.7),0 0 0 1px rgba(217,169,79,.35),
             inset 0 0 0 6px rgba(255,255,255,.5),inset 0 0 0 7px rgba(217,169,79,.28);
  animation:inviteIn .8s var(--ease-soft) both;
}
.hm-gate.is-opening .hm-invite{animation:inviteOut .6s var(--ease-soft) forwards;}
@keyframes inviteIn{from{opacity:0;transform:translate3d(0,26px,0) scale(.96);}to{opacity:1;transform:none;}}
@keyframes inviteOut{
  40%{opacity:1;transform:scale(1.05);}
  100%{opacity:0;transform:scale(1.28) translate3d(0,-14px,0);}
}
/* lace filigree edge */
.hm-invite-lace{
  position:absolute;inset:10px;border-radius:3px;pointer-events:none;
  border:1px solid rgba(217,169,79,.35);
  -webkit-mask-image:repeating-linear-gradient(90deg,#000 0 8px,transparent 8px 14px);
          mask-image:repeating-linear-gradient(90deg,#000 0 8px,transparent 8px 14px);
}
.hm-invite-crown{color:var(--gold);margin:0 auto .4rem;display:block;}
.hm-invite-name{
  font-family:var(--font-script);font-weight:400;
  font-size:clamp(3.2rem,13vw,4.6rem);line-height:1;margin:0;
  color:var(--wine);
}
.hm-invite-line{
  font-size:.86rem;color:var(--on-light-soft);margin:.9rem 0 1.6rem;letter-spacing:.03em;
}
.hm-seal{position:relative;width:120px;margin:0 auto 1.5rem;color:var(--rose);}
.hm-seal svg{width:100%;display:block;}
.hm-seal-mark{
  position:absolute;top:50%;left:50%;transform:translate(-50%,-42%);
  color:var(--ivory);opacity:.95;
}
.hm-gate-cta{animation:pulseGate 2.6s var(--ease-soft) infinite;}
@keyframes pulseGate{
  0%,100%{box-shadow:0 0 0 0 rgba(217,169,79,.35);transform:scale(1);}
  50%{box-shadow:0 0 0 14px rgba(217,169,79,0);transform:scale(1.03);}
}
.hm-gate-sub{display:block;margin-top:.9rem;font-size:.72rem;font-weight:400;letter-spacing:.12em;color:var(--on-light-soft);}

/* ═══ PAGE / HERO ═══════════════════════════════════════════════════════ */
.hm-page{
  position:relative;z-index:1;
  color:var(--on-light);
  background:
    radial-gradient(70% 40% at 15% 22%,rgba(214,139,166,.16),transparent 70%),
    radial-gradient(60% 36% at 88% 58%,rgba(201,138,114,.14),transparent 72%),
    linear-gradient(180deg,var(--petal) 0%,var(--ivory) 46%,var(--petal) 100%);
}
/* Light-regime text: dark ink on blush, plus a whisper of white lift so it
   stays crisp over the radial washes above. */
.hm-page .hm-h2,.hm-page .hm-sub,.hm-page .hm-eyebrow{
  text-shadow:0 1px 0 rgba(255,255,255,.55);
}
/* Dark-regime sections opt in explicitly and inherit the shadow token. */
.hm-on-dark,.hm-on-dark .hm-h2,.hm-on-dark .hm-sub{
  color:var(--on-dark);text-shadow:var(--shadow-on-dark);
}
.hm-on-dark .hm-eyebrow{color:var(--gold-lite);text-shadow:var(--shadow-on-dark);}

.hm-hero{
  position:relative;min-height:100svh;display:grid;place-items:center;
  text-align:center;padding:6rem 1.25rem 4rem;overflow:hidden;
  /* fades to the page surface at its own bottom edge, below all hero text */
  background:linear-gradient(180deg,
    var(--plum) 0%,var(--wine) 52%,var(--mauve) 78%,
    var(--blush) 93%,var(--petal) 100%);
}
.hm-hero-sky{height:70%;opacity:.75;}
.hm-hero-inner{position:relative;z-index:2;}
.hm-hero-crown{color:var(--gold-lite);opacity:0;margin:0 auto 1.1rem;display:block;}
.hm-hero-eyebrow{color:var(--gold-lite);opacity:0;}
.hm-hero-name{
  position:relative;margin:0;
  font-family:var(--font-script);font-weight:400;
  font-size:clamp(4rem,19vw,10rem);line-height:.95;color:var(--ivory);
  opacity:0;
}
.hm-swash{
  display:block;width:min(72vw,20rem);margin:-.4rem auto 0;color:var(--gold-lite);
  opacity:0;
}
.hm-hero-tag{
  font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1.15rem,4vw,1.7rem);color:var(--on-dark);text-shadow:var(--shadow-on-dark);margin:1.6rem 0 .5rem;opacity:0;
}
.hm-hero-date{
  font-size:.74rem;font-weight:400;letter-spacing:.3em;text-transform:uppercase;
  color:var(--on-dark-soft);text-shadow:var(--shadow-on-dark);
  opacity:0;
}
.hm-hero.is-in .hm-hero-crown{animation:riseIn .55s var(--ease-soft) .08s both;}
.hm-hero.is-in .hm-hero-eyebrow{animation:riseIn .55s var(--ease-soft) .16s both;}
.hm-hero.is-in .hm-hero-name{animation:riseIn .72s var(--ease-spring) .24s both;}
.hm-hero.is-in .hm-swash{animation:drawIn .6s var(--ease-soft) .62s both;}
.hm-hero.is-in .hm-hero-tag{animation:riseIn .55s var(--ease-soft) .54s both;}
.hm-hero.is-in .hm-hero-date{animation:riseIn .55s var(--ease-soft) .66s both;}
@keyframes riseIn{from{opacity:0;transform:translate3d(0,22px,0);}to{opacity:1;transform:none;}}
@keyframes drawIn{from{opacity:0;transform:scaleX(.7);}to{opacity:.85;transform:none;}}

/* shimmer sweep across the letters — runs twice, then settles */
.hm-shimmer{
  background:linear-gradient(100deg,var(--ivory) 30%,#FFF6DF 44%,var(--gold-lite) 50%,
    #FFF6DF 56%,var(--ivory) 70%);
  background-size:280% 100%;
  -webkit-background-clip:text;background-clip:text;
  color:transparent;
  animation:sweep 1.9s var(--ease-soft) .6s 2 both;
}
.hm-shimmer-slow{animation-duration:4.5s;animation-iteration-count:infinite;animation-delay:0s;}
@keyframes sweep{from{background-position:180% 0;}to{background-position:-80% 0;}}

.hm-scroll-hint{
  display:block;margin-top:clamp(2.5rem,8vw,4rem);
  font-size:.68rem;letter-spacing:.26em;font-weight:500;text-transform:uppercase;
  color:var(--wine);opacity:.9;
}
.hm-scroll-line{
  display:block;width:1px;height:44px;margin:0 auto .7rem;
  background:linear-gradient(180deg,transparent,var(--wine));
  animation:scrollPulse 2.4s var(--ease-soft) infinite;
}
@keyframes scrollPulse{0%,100%{transform:scaleY(.5);opacity:.4;}50%{transform:scaleY(1);opacity:1;}}

/* ── offscreen pause ─────────────────────────────────────────────────────
   Anything under .hm-idle stops animating. Applied to the hero sky, the
   footer sky and the cake when they scroll out of view. This is what stops a
   fast scroll from repainting three star fields and a filtered cake SVG that
   aren't on screen. */
.hm-idle,
.hm-idle *{animation-play-state:paused!important;}
.hm-root.is-calm .hm-doll-slot,
.hm-root.is-calm .hm-doll-arm{animation:none!important;}
.hm-root.is-calm .hm-cake-3d{transform:none!important;transition:none;}

/* ═══ BUTTONS ═══════════════════════════════════════════════════════════
   The previous builds ended up with buttons that read as flat cards: a pale
   fill, a hairline border, no depth. Every control here is built from four
   layers instead — a saturated gradient body, an inset top highlight, a
   coloured drop shadow in the button's own hue, and an outer glow ring that
   blooms on hover. Press states physically sink.                          */
.hm-btn{
  position:relative;isolation:isolate;
  display:inline-flex;align-items:center;justify-content:center;gap:.6rem;
  min-height:52px;padding:0 2.2rem;
  font-family:var(--font-ui);font-size:.74rem;font-weight:500;
  letter-spacing:.24em;text-transform:uppercase;
  color:#FFF6FA;
  border:0;border-radius:999px;cursor:pointer;
  background:linear-gradient(168deg,#F0A6C0 0%,#E28FAE 38%,#C46E92 72%,#A8567C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.55),          /* top highlight   */
    inset 0 -2px 6px rgba(120,44,78,.35),         /* bottom shading  */
    0 10px 24px -8px rgba(168,86,124,.75),        /* coloured shadow */
    0 0 0 0 rgba(226,143,174,0);                  /* glow ring, off  */
  text-shadow:0 1px 6px rgba(96,34,62,.5);
  transition:transform .18s var(--ease-spring),box-shadow .22s var(--ease-soft),
             filter .22s var(--ease-soft);
}
/* the sheen that sits on top of the gradient */
.hm-btn::before{
  content:"";position:absolute;inset:1px;border-radius:inherit;z-index:-1;
  background:linear-gradient(180deg,rgba(255,255,255,.38) 0%,rgba(255,255,255,.06) 46%,
    rgba(255,255,255,0) 62%);
  pointer-events:none;
}
.hm-btn:hover{
  transform:translateY(-2px);
  filter:saturate(1.08) brightness(1.04);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.6),
    inset 0 -2px 6px rgba(120,44,78,.3),
    0 16px 34px -10px rgba(168,86,124,.85),
    0 0 0 8px rgba(226,143,174,.22);
}
.hm-btn:active{
  transform:translateY(1px) scale(.985);
  box-shadow:
    inset 0 2px 8px rgba(120,44,78,.5),
    0 4px 12px -6px rgba(168,86,124,.7),
    0 0 0 3px rgba(226,143,174,.2);
}
.hm-btn:disabled{cursor:default;}
/* lilac variant for the entry gate, coral for the wish */
.hm-btn-lilac{
  background:linear-gradient(168deg,#D9BFF0 0%,#C3A4E4 38%,#9B78C6 72%,#7E5AA8 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 6px rgba(70,44,110,.35),
    0 10px 24px -8px rgba(126,90,168,.75);
}
.hm-btn-lilac:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.6),
  inset 0 -2px 6px rgba(70,44,110,.3),0 16px 34px -10px rgba(126,90,168,.85),
  0 0 0 8px rgba(195,164,228,.24);}
.hm-btn-coral{
  background:linear-gradient(168deg,#FBC4AE 0%,#F4A088 38%,#DA7A60 72%,#B85B45 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 6px rgba(130,54,38,.35),
    0 10px 24px -8px rgba(184,91,69,.75);
}
.hm-btn-coral:hover{box-shadow:inset 0 1px 0 rgba(255,255,255,.6),
  inset 0 -2px 6px rgba(130,54,38,.3),0 16px 34px -10px rgba(184,91,69,.85),
  0 0 0 8px rgba(244,160,136,.26);}
.hm-btn-ico{display:flex;color:rgba(255,255,255,.92);}

/* ═══ COUNTDOWN ═════════════════════════════════════════════════════════ */
.hm-countdown{
  position:relative;display:inline-flex;flex-direction:column;align-items:center;
  gap:.55rem;margin-top:clamp(1.6rem,4vw,2.4rem);
  padding:clamp(1rem,3vw,1.35rem) clamp(1.4rem,5vw,2.4rem);
  border-radius:20px;
  background:linear-gradient(160deg,rgba(255,250,248,.14),rgba(255,250,248,.05));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.28),
    0 18px 44px -22px rgba(43,21,38,.9),
    0 0 40px -18px rgba(226,143,174,.55);
  opacity:0;
}
.hm-hero.is-in .hm-countdown{animation:riseIn .6s var(--ease-soft) .78s both;}
.hm-countdown-eyebrow{color:var(--gold-lite);opacity:.9;text-transform:uppercase;
  text-shadow:var(--shadow-on-dark);}
.hm-countdown-row{display:flex;align-items:flex-start;gap:clamp(.3rem,1.6vw,.7rem);}
.hm-tick{display:flex;flex-direction:column;align-items:center;gap:.3rem;min-width:2.6rem;}
.hm-tick-num{
  font-family:var(--font-display);font-weight:300;
  font-size:clamp(1.9rem,7vw,3rem);line-height:1;
  color:#FFF6FA;font-variant-numeric:tabular-nums;
  text-shadow:0 2px 18px rgba(226,143,174,.6),var(--shadow-on-dark);
}
.hm-tick-label{color:var(--on-dark-soft);opacity:.85;text-transform:uppercase;}
.hm-tick-sep{
  font-family:var(--font-display);font-size:clamp(1.4rem,5vw,2.2rem);
  line-height:1.1;color:var(--rose);opacity:.7;
}
.hm-countdown-tag{
  font-family:var(--font-script);font-size:1.35rem;line-height:1;
  color:var(--rose);text-shadow:var(--shadow-on-dark);
}

/* ═══ ALBATROSS LINE ════════════════════════════════════════════════════ */
.hm-footer-albatross{
  position:relative;display:flex;align-items:center;justify-content:center;gap:1rem;
  margin:1.1rem 0 .4rem;
  font-family:var(--font-script);font-size:clamp(1.6rem,5vw,2.4rem);
  color:var(--rose);text-shadow:var(--shadow-on-dark);
}
.hm-albatross-rule{
  display:block;width:clamp(2rem,8vw,4.5rem);height:1px;
  background:linear-gradient(90deg,transparent,var(--rosegold),transparent);
}
.hm-albatross-tag{
  margin:.9rem 0 0;font-family:var(--font-display);font-style:italic;
  font-size:.95rem;color:var(--rosegold-ink);opacity:.85;
}
.hm-nick{font-family:var(--font-script);font-size:1.35em;color:var(--rosegold-ink);}

/* ═══ DOLLS ═════════════════════════════════════════════════════════════
   Decorative only: pointer-events none, and they sit behind content (z 0)
   so they can never cover a photo, a heading or a control. */
.hm-dolls{
  position:absolute;inset:0;pointer-events:none;z-index:0;
  overflow:visible;
}
.hm-doll-slot{
  position:absolute;bottom:6%;
  /* Sized up from the original clamp(58px,9vw,124px) — the outline strokes
     added to the redesign need room to resolve; too small and even a
     detailed path reads as a soft blob. */
  width:clamp(118px,13.5vw,216px);
  opacity:.96;
  will-change:transform;
}
.hm-doll-slot-l{left:1.5%;}
.hm-doll-slot-r{right:1.5%;}
.hm-doll{width:100%;height:auto;display:block;
  filter:drop-shadow(0 12px 22px rgba(94,42,74,.18));}

/* idle: sway + breathe on deliberately mismatched cycles so the pair never
   moves in lockstep */
.hm-doll-slot-l{animation:dollSwayL 7.2s ease-in-out infinite;}
.hm-doll-slot-r{animation:dollSwayR 8.9s ease-in-out infinite;}
@keyframes dollSwayL{
  0%,100%{transform:translate3d(0,0,0) rotate(-1.6deg) scale(1);}
  50%{transform:translate3d(0,-9px,0) rotate(1.8deg) scale(1.015);}
}
@keyframes dollSwayR{
  0%,100%{transform:translate3d(0,-4px,0) rotate(1.4deg) scale(1.01);}
  50%{transform:translate3d(0,4px,0) rotate(-1.9deg) scale(1);}
}
/* the lifted arm has its own small drift, so it reads as a wave not a rock */
.hm-doll-arm{transform-box:view-box;animation:dollArm 4.4s ease-in-out infinite;}
/* The pivot is the shoulder joint in viewBox units — NOT the fill-box corner,
   which landed on the hand end and swung the arm off the body. The sleeve cap
   is painted after the arm, so the joint stays covered through the whole swing. */
.hm-doll-a .hm-doll-arm{transform-origin:82px 95px;}
.hm-doll-b .hm-doll-arm{transform-origin:82px 97px;}
@keyframes dollArm{0%,100%{transform:rotate(-1.6deg);}50%{transform:rotate(3.4deg);}}

/* one-shot greeting when the section arrives */
.hm-dolls.is-greeting .hm-doll-slot-l{animation:dollGreet .9s var(--ease-spring),
  dollSwayL 7.2s ease-in-out .9s infinite;}
.hm-dolls.is-greeting .hm-doll-slot-r{animation:dollGreet .9s var(--ease-spring) .12s,
  dollSwayR 8.9s ease-in-out 1.02s infinite;}
@keyframes dollGreet{
  0%{transform:translate3d(0,26px,0) scale(.9);opacity:0;}
  45%{transform:translate3d(0,-6px,0) scale(1.04);opacity:1;}
  70%{transform:translate3d(0,4px,0) scale(.99);}   /* the curtsy dip */
  100%{transform:none;opacity:.9;}
}

/* placement variants per section */
.hm-dolls-flank .hm-doll-slot{bottom:auto;top:14%;}
.hm-dolls-corner .hm-doll-slot-l{bottom:2%;left:0.5%;}
.hm-dolls-corner .hm-doll-slot-r{bottom:2%;right:0.5%;}
.hm-dolls-frame .hm-doll-slot{top:22%;width:clamp(102px,11.5vw,186px);}
.hm-dolls-gate .hm-doll-slot{bottom:4%;opacity:.88;}
.hm-dolls-footer .hm-doll-slot{bottom:12%;opacity:.92;}
.hm-dolls-hero .hm-doll-slot{top:16%;}

/* MOBILE: they scale down and tuck to the very edges, never cropped, never
   hidden. Below 520px they sit lower so they frame rather than crowd. */
@media (max-width:900px){
  .hm-doll-slot{width:clamp(104px,18vw,156px);opacity:.94;}
  .hm-dolls-flank .hm-doll-slot{top:8%;}
}
@media (max-width:520px){
  .hm-doll-slot{width:clamp(96px,27vw,138px);opacity:.85;}
  .hm-doll-slot-l{left:-1%;}
  .hm-doll-slot-r{right:-1%;}
  .hm-dolls-flank .hm-doll-slot{top:4%;}
}

/* ═══ STORY THREAD ══════/* ═══ STORY THREAD ══════════════════════════════════════════════════════ */
.hm-thread{
  position:absolute;top:0;bottom:0;left:50%;
  width:min(46rem,92vw);transform:translateX(-50%);
  pointer-events:none;z-index:0;
  --lit:0;
}
.hm-thread-svg{
  position:absolute;inset:0;width:100%;height:100%;
  overflow:visible;opacity:.55;
  /* thin out where the cake sits so the ribbon reads as passing behind it
     rather than drawn across it */
  -webkit-mask-image:linear-gradient(180deg,
    #000 0%,#000 14%,rgba(0,0,0,.15) 22%,rgba(0,0,0,.15) 32%,#000 40%,#000 100%);
          mask-image:linear-gradient(180deg,
    #000 0%,#000 14%,rgba(0,0,0,.15) 22%,rgba(0,0,0,.15) 32%,#000 40%,#000 100%);
}
.hm-thread-ghost{
  fill:none;stroke:var(--rose);stroke-opacity:.14;
  stroke-width:1.1;vector-effect:non-scaling-stroke;
}
.hm-thread-line{
  fill:none;stroke:url(#threadG);
  stroke-width:1.6;stroke-linecap:round;
  vector-effect:non-scaling-stroke;   /* stays hairline despite the 1:11 squash */
  /* no filter: this path spans the whole document height, so a
     drop-shadow re-rasterised the full strip on every scroll frame */
}
/* pearl at each chapter seam */
.hm-thread-node{
  position:absolute;left:50%;width:9px;height:9px;margin:-4.5px 0 0 -4.5px;
  border-radius:50%;
  background:radial-gradient(circle at 34% 30%,#FFFFFF,#F6E4BC 42%,var(--rosegold) 100%);
  opacity:0;transform:scale(.3);
  transition:opacity .45s var(--ease-soft),transform .45s var(--ease-spring),box-shadow .45s;
}
.hm-thread-node.is-lit{
  opacity:.9;transform:scale(1);
  box-shadow:0 0 0 4px rgba(246,213,224,.5),0 0 18px 4px rgba(235,211,164,.45);
}
/* the thread sits behind everything the reader touches */
.hm-page > *:not(.hm-thread){position:relative;z-index:1;}
@media (max-width:760px){
  .hm-thread{width:100vw;}
  .hm-thread-svg{opacity:.4;}
}

/* ═══ GALLERY ═══════════════════════════════════════════════════════════ */

.hm-collage{
  position:relative;width:min(100%,64rem);margin:0 auto;
  /* Height derived from the row count, used only as the FIRST-PAINT estimate
     before useMeasuredHeight corrects it against the real rendered DOM (see
     the hook's comment for why a calc() alone caused this bug twice). This
     value now includes the polaroid's own chrome — 8px top/side padding, the
     30px caption reserve, and the caption row itself, roughly 2.5rem per
     frame — which the original formula omitted entirely, plus a further
     3rem safety pad so the pre-JS box already errs generously large rather
     than exactly-fit. */
  --rowh:clamp(10.5rem,20vw,15rem);
  --framew:min(30%, 15rem);
  --frame-chrome:2.5rem;   /* padding + caption row, not part of the photo itself */
  --frameh:calc(var(--framew) * 4 / 3 + var(--frame-chrome));
  height:calc((var(--rows,3) - 1) * var(--rowh) + var(--frameh) + 6.5rem);
  min-height:calc((var(--rows,3) - 1) * var(--rowh) + var(--frameh) + 6.5rem);
  perspective:1100px;
}
.hm-frame{
  position:absolute;width:30%;max-width:15rem;margin:0;cursor:pointer;
  /* exact row placement — no percentage-of-a-guessed-height maths */
  top:calc(var(--row,0) * var(--rowh) + var(--side,0) * 2.6rem);
  transform-style:preserve-3d;
  --tx:0deg;--ty:0deg;--sx:50%;
  transform:translate3d(0,24px,0) rotate(var(--rot)) scale(calc(var(--scale) * .95));
  opacity:0;
  transition:transform .34s var(--ease-spring),opacity .24s var(--ease-soft);
}
.hm-frame.is-off .hm-photo{animation-play-state:paused;}
.hm-collage.is-in .hm-frame{
  opacity:1;
  transform:translate3d(0,0,0) rotate(var(--rot)) scale(var(--scale));
  transition-delay:var(--delay);
}
.hm-frame-inner{
  background:linear-gradient(160deg,#FFFDF9,#F3EDE3);
  padding:8px 8px 30px;border-radius:3px;
  box-shadow:0 1px 0 rgba(217,169,79,.5),0 22px 40px -22px rgba(20,30,70,.55);
  transform:rotateX(var(--tx)) rotateY(var(--ty));
  transition-property:box-shadow,transform;
  transition-duration:.3s,.12s;
  transition-timing-function:var(--ease-soft),linear;
}
.hm-frame-window{position:relative;overflow:hidden;border-radius:2px;background:var(--blush);}
.hm-photo{
  display:block;width:100%;height:auto;
  animation-name:kenburns;animation-timing-function:ease-in-out;
  animation-iteration-count:infinite;animation-direction:alternate;
}
/* will-change only while it matters — five permanently promoted 1400px
   textures is memory the compositor doesn't need to hold during a scroll */
.hm-frame.is-hot .hm-photo,
.hm-frame:hover .hm-photo{will-change:transform;}
@keyframes kenburns{
  from{transform:scale(1.04) translate3d(-1%,1%,0);}
  to{transform:scale(1.13) translate3d(1.5%,-1.5%,0);}
}
/* silk curtain that draws back on reveal */
.hm-curtain{
  position:absolute;inset:0;
  background:linear-gradient(180deg,var(--ivory) 0%,var(--blush) 55%,var(--rose) 100%);
  transform:translate3d(0,0,0);
  transition:transform .48s var(--ease-soft);
}
.hm-collage.is-in .hm-curtain{transform:translate3d(0,-101%,0);transition-delay:calc(var(--delay) + 30ms);}
/* shimmer sweep on hover */
.hm-sheen{
  position:absolute;inset:0;pointer-events:none;opacity:0;
  background:linear-gradient(105deg,transparent 38%,rgba(255,255,255,.65) 50%,transparent 62%);
  transform:translate3d(-120%,0,0);
  transition:opacity .3s;
}
.hm-frame.is-hot .hm-sheen{opacity:1;animation:sheen .7s var(--ease-soft);}
@keyframes sheen{from{transform:translate3d(-120%,0,0);}to{transform:translate3d(120%,0,0);}}

/* ── micro-text floor ─────────────────────────────────────────────────────
   Every caption, label and counter on the site uses this. Below 11px with
   loose tracking, thin type stops being readable no matter what the contrast
   ratio says, so the floor sets size, weight and tracking together — not just
   colour. Anything smaller than this doesn't ship. */
.hm-micro{
  font-family:var(--font-ui);
  font-size:.7rem;          /* 11.2px — the floor */
  font-weight:500;          /* not 300; hairlines vanish at this size */
  letter-spacing:.18em;     /* was .3em, which shredded 9px glyphs */
  line-height:1.2;
}
.hm-frame-cap{
  display:flex;align-items:center;justify-content:center;gap:.45rem;
  padding-top:9px;color:var(--rosegold-ink);
}
.hm-frame-cap span{font-variant-numeric:tabular-nums;}
.hm-frame.is-hot{z-index:30;transition-duration:.22s;}
.hm-collage.is-in .hm-frame.is-hot{
  transform:translate3d(0,-14px,0) rotate(0deg) scale(calc(var(--scale) * 1.08));
}
/* frames lift toward the viewer on hover, not just up the page */
.hm-frame.is-hot .hm-frame-inner{transform:rotateX(var(--tx)) rotateY(var(--ty)) translateZ(46px);}
.hm-frame.is-hot .hm-frame-inner{
  box-shadow:0 2px 0 var(--gold),0 44px 70px -24px rgba(20,30,70,.6),
             0 0 60px -10px rgba(246,226,174,.75);
}
.hm-collage.is-in .hm-frame.is-dim{
  opacity:.62;
  transform:translate3d(0,0,0) rotate(var(--rot)) scale(calc(var(--scale) * .94));
}
.hm-heart-pop{
  position:absolute;top:42%;left:50%;font-size:3rem;color:var(--rose);
  transform:translate(-50%,-50%) scale(.2);opacity:0;pointer-events:none;
}
.hm-frame.is-held .hm-heart-pop{animation:heartPop .58s var(--ease-spring);}
@keyframes heartPop{
  0%{opacity:0;transform:translate(-50%,-50%) scale(.2);}
  35%{opacity:1;transform:translate(-50%,-70%) scale(1.15);}
  100%{opacity:0;transform:translate(-50%,-140%) scale(.9);}
}

/* ── lightbox ────────────────────────────────────────────────────────── */
.hm-lightbox{position:fixed;inset:0;z-index:85;display:grid;place-items:center;padding:1.5rem;}
.hm-lightbox-veil{
  position:absolute;inset:0;
  background:radial-gradient(circle at 50% 45%,rgba(46,76,147,.7),rgba(9,14,36,.94));
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  animation:fadeIn .24s var(--ease-soft) both;
}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.hm-lightbox-stage{position:relative;z-index:2;margin:0;text-align:center;}
.hm-lightbox-img{
  display:block;max-width:min(86vw,44rem);max-height:74vh;width:auto;height:auto;
  padding:10px 10px 34px;background:var(--ivory);border-radius:3px;
  box-shadow:0 50px 90px -30px rgba(0,0,0,.8),0 0 0 1px rgba(217,169,79,.4);
  animation:crossIn .28s var(--ease-soft) both;
  will-change:transform;
}
@keyframes crossIn{from{opacity:0;transform:scale(.97);}to{opacity:1;transform:none;}}
.hm-lightbox-cap{
  display:flex;align-items:center;justify-content:center;gap:.5rem;
  margin-top:1.1rem;color:#FBEEDA;text-shadow:var(--shadow-on-dark);
  text-transform:uppercase;
}
/* lightbox controls get the same four-layer treatment, sized round */
.hm-lb-nav,.hm-lb-close{
  position:absolute;z-index:3;border:0;border-radius:999px;
  width:48px;height:48px;font-size:1.6rem;line-height:1;cursor:pointer;
  display:grid;place-items:center;color:#FFF6FA;
  background:linear-gradient(168deg,#F0A6C0 0%,#D07E9E 55%,#A8567C 100%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.5),
    inset 0 -2px 5px rgba(120,44,78,.35),
    0 10px 22px -8px rgba(168,86,124,.8);
  text-shadow:0 1px 5px rgba(96,34,62,.55);
  transition:transform .18s var(--ease-spring),box-shadow .2s var(--ease-soft),filter .2s;
}
.hm-lb-nav:hover,.hm-lb-close:hover{
  transform:scale(1.08);filter:brightness(1.06);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -2px 5px rgba(120,44,78,.3),
    0 16px 30px -10px rgba(168,86,124,.9),0 0 0 7px rgba(226,143,174,.24);
}
.hm-lb-nav:active,.hm-lb-close:active{transform:scale(.96);
  box-shadow:inset 0 2px 7px rgba(120,44,78,.5),0 4px 10px -6px rgba(168,86,124,.7);}
.hm-lb-prev{left:max(1rem,2vw);top:50%;margin-top:-23px;}
.hm-lb-next{right:max(1rem,2vw);top:50%;margin-top:-23px;}
.hm-lb-close{top:max(1rem,env(safe-area-inset-top));right:max(1rem,2vw);font-size:1.3rem;}
@media (max-width:600px){.hm-lb-nav{width:40px;height:40px;}}

/* ═══ ASIDE LAYOUT — the rhythm break ═══════════════════════════════════
   Used by the letter (head left) and the wishes (head right, sticky). Below
   900px both collapse to a single column with the head on top, still
   left-aligned, so the variation survives on a phone as text alignment even
   when the two columns can't. */
.hm-aside-grid{
  display:grid;gap:clamp(1.75rem,5vw,3.5rem);
  width:min(100%,64rem);margin:0 auto;
  grid-template-columns:1fr;
}
@media (min-width:900px){
  .hm-aside-grid{grid-template-columns:minmax(15rem,22rem) 1fr;align-items:start;}
  .hm-aside-grid--flip{grid-template-columns:1fr minmax(15rem,22rem);}
  .hm-aside-grid--flip > .hm-aside-head{order:2;}
  .hm-aside-grid--flip > .hm-wish-list{order:1;}
  .hm-aside-head--sticky{position:sticky;top:6rem;}
}
.hm-aside-head{position:relative;text-align:left;}
.hm-aside-head::before{
  content:"";position:absolute;inset:-14% -10%;z-index:-1;
  background:var(--scrim-light);pointer-events:none;
}
.hm-aside-head .hm-eyebrow{margin-bottom:.85rem;}
.hm-h2-aside{
  font-size:clamp(2rem,5.2vw,3.1rem);line-height:1.02;
  margin:0 0 1.1rem;text-align:left;
}
.hm-aside-rule{
  display:block;width:3.5rem;height:1px;margin:0 0 1.1rem;
  background:linear-gradient(90deg,var(--rosegold),transparent);
}
.hm-aside-note{
  font-family:var(--font-display);font-style:italic;
  font-size:1rem;line-height:1.7;color:var(--on-light-soft);
  max-width:26ch;margin:0;
}

/* ═══ NOTE ══════════════════════════════════════════════════════════════ */
.hm-note-section{display:flex;flex-direction:column;align-items:center;}
.hm-note-section .hm-note{margin:0;}
.hm-note{
  position:relative;width:100%;max-width:38rem;
  padding:clamp(2.5rem,7vw,3.75rem) clamp(1.75rem,6vw,3rem);
  background:
    linear-gradient(#FFFDF8,#FBF3EC),
    repeating-linear-gradient(0deg,transparent 0 31px,rgba(217,139,166,.22) 31px 32px);
  background-blend-mode:multiply;
  border-radius:4px;
  box-shadow:0 30px 60px -30px rgba(20,30,70,.4),0 0 0 1px rgba(217,169,79,.28);
  opacity:0;transform:translate3d(0,16px,0);
  transition:opacity .36s var(--ease-soft),transform .36s var(--ease-soft);
}
.hm-note-section.is-in .hm-note{opacity:1;transform:none;}
.hm-note-flourish{position:absolute;width:88px;color:var(--rose);opacity:.5;}
.hm-note-flourish-tl{top:-18px;left:-16px;}
.hm-note-flourish svg{width:100%;display:block;}
.hm-note-body{font-family:var(--font-display);font-size:clamp(1.02rem,2.9vw,1.22rem);
  line-height:1.95;color:var(--on-light);}
.hm-note-body p{margin:0 0 1.15rem;}
.hm-note-body p:first-child{font-family:var(--font-script);font-size:1.9rem;color:var(--wine);margin-bottom:.6rem;}
.hm-sign{font-family:var(--font-script);font-size:1.7rem;color:var(--mauve);text-align:right;margin-top:1.8rem!important;}

/* ═══ CAKE ══════════════════════════════════════════════════════════════ */

.hm-cake-wrap{
  position:relative;width:min(100%,24rem);margin:0 auto;text-align:center;
  opacity:0;transform:translate3d(0,15px,0);
  transition:opacity .36s var(--ease-soft),transform .36s var(--ease-soft);
}
.hm-cake-section.is-in .hm-cake-wrap{opacity:1;transform:none;}
/* Fluid viewBox with a height cap: on a 390px screen the cake is ~340px wide
   and ~440px tall, well inside the viewport, and it never crops. */
.hm-cake{
  width:100%;height:auto;display:block;overflow:visible;
  max-height:min(62vh,30rem);margin-inline:auto;
}
.hm-pearl{fill:#FDF2F6;opacity:.95;}
.hm-pearl-hi{fill:#FFFFFF;opacity:.85;}
.hm-drip{/* was drop-shadow — see notes; the tier gradients carry the depth now */}

/* ── flame: three layers on deliberately mismatched cycle lengths, so their
      peaks never line up and the shape churns instead of pulsing ────────── */
.hm-flame-grp{transform-box:fill-box;transform-origin:50% 100%;animation:flameSway 2.3s ease-in-out infinite;}
.hm-flame-a{transform-box:fill-box;transform-origin:50% 100%;animation:flick1 .82s ease-in-out infinite;}
.hm-flame-b{transform-box:fill-box;transform-origin:50% 100%;animation:flick2 .61s ease-in-out infinite;}
.hm-flame-c{transform-box:fill-box;transform-origin:50% 100%;animation:flick3 .47s ease-in-out infinite;}
@keyframes flameSway{
  0%,100%{transform:rotate(-1.6deg) translateX(-.6px);}
  50%{transform:rotate(1.8deg) translateX(.6px);}
}
@keyframes flick1{
  0%,100%{transform:scale(1,1);}
  30%{transform:scale(.93,1.09) skewX(2deg);}
  62%{transform:scale(1.06,.94) skewX(-1.5deg);}
}
@keyframes flick2{
  0%,100%{transform:scale(1.02,.97) skewX(-2deg);}
  45%{transform:scale(.92,1.12) skewX(3deg);}
}
@keyframes flick3{
  0%,100%{transform:scale(1,1.04);opacity:.95;}
  40%{transform:scale(1.1,.9);opacity:1;}
  70%{transform:scale(.9,1.08);opacity:.9;}
}
.hm-wick{animation:flick2 .61s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%;}
.hm-halo{animation:haloPulse 2.2s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 50%;}
@keyframes haloPulse{0%,100%{opacity:.72;transform:scale(1);}50%{opacity:1;transform:scale(1.07);}}
.hm-smoke{opacity:0;transform-box:fill-box;transform-origin:50% 100%;}
.hm-flecks circle{animation:fleck 2.8s ease-in-out infinite;}
@keyframes fleck{0%,100%{opacity:.22;}50%{opacity:1;}}
.hm-topper{animation:topperGlint 4.5s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%;}
@keyframes topperGlint{
  0%,100%{opacity:.9;transform:rotate(-1.2deg);}
  50%{opacity:1;transform:rotate(1.2deg);}
}
/* ── Cake tilt (2D SVG cake) ────────────────────────────────────────────
   Pointer-parallax on the flat cake: a perspective stage with three depth
   layers. The SVG sits at z=0, a soft
   plate sits behind it and a highlight plate in front; tilting the stage
   moves them at different rates, which is what sells it as a solid object
   rather than a picture that rotates. One composited transform, no repaint. */
.hm-cake-stage{perspective:1000px;perspective-origin:50% 45%;}
.hm-cake-3d{
  position:relative;
  transform-style:preserve-3d;
  transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));
  transition:transform .5s var(--ease-soft);
  will-change:transform;
}
.hm-cake-wrap:hover .hm-cake-3d{transition-duration:.14s;}  /* tracks live */
.hm-cake-depth{
  position:absolute;left:50%;top:50%;pointer-events:none;
  border-radius:50%;
}
.hm-cake-depth-back{
  width:78%;height:46%;margin:-6% 0 0 -39%;
  transform:translateZ(-90px) scale(1.25);
  background:radial-gradient(ellipse at 50% 50%,
    rgba(217,139,166,.4) 0%,rgba(246,213,224,.28) 45%,transparent 72%);
}
.hm-cake-depth-front{
  width:52%;height:30%;margin:-22% 0 0 -26%;
  transform:translateZ(70px);
  background:radial-gradient(ellipse at 50% 40%,
    rgba(255,246,226,.42) 0%,rgba(235,211,164,.16) 46%,transparent 72%);
}
.hm-cake{transform:translateZ(0);}
/* the flame and its halo float nearest the viewer */
.hm-flame-grp,.hm-halo{transform-box:fill-box;}

/* Breathing lives on a wrapper DIV, not the SVG. Scaling the SVG itself
   re-rasterised its gradients and blur filter every frame; scaling a promoted
   div is a compositor transform and costs nothing. */
.hm-cake-3d{animation:cakeBreathe 6.5s ease-in-out infinite;transform-origin:50% 92%;}
@keyframes cakeBreathe{0%,100%{transform:scale(1);}50%{transform:scale(1.008);}}
.hm-bow{transform-origin:center;transform-box:fill-box;}

.hm-cake-wrap.is-blown .hm-flame-grp{transform-box:fill-box;transform-origin:50% 100%;animation:snuff .6s var(--ease-soft) forwards;}
.hm-cake-wrap.is-blown .hm-flame-a,
.hm-cake-wrap.is-blown .hm-flame-b,
.hm-cake-wrap.is-blown .hm-flame-c,
.hm-cake-wrap.is-blown .hm-wick{animation:none;}
@keyframes snuff{
  0%{opacity:1;transform:scale(1);}
  35%{opacity:1;transform:scale(.7,1.25);}
  100%{opacity:0;transform:scale(.1,.4) translateY(6px);}
}
.hm-cake-wrap.is-blown .hm-halo{animation:haloOut .8s var(--ease-soft) forwards;}
@keyframes haloOut{to{opacity:0;transform:scale(1.4);}}
.hm-cake-wrap.is-blown .hm-smoke{animation:smoke 2.6s var(--ease-soft) .35s forwards;}
@keyframes smoke{
  0%{opacity:0;transform:translateY(6px) scale(.6);}
  25%{opacity:.85;}
  100%{opacity:0;transform:translateY(-70px) scale(1.5);}
}

.hm-wish-btn{margin-top:2rem;}
.hm-wish-btn.is-done{
  filter:saturate(.55) brightness(.98);
  background:linear-gradient(168deg,#E7C3B6 0%,#CFA192 55%,#A87A6C 100%);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.4),inset 0 -2px 5px rgba(110,70,58,.3),
    0 8px 18px -10px rgba(140,100,86,.7);
}
.hm-wish-btn.is-done:hover{transform:none;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),
  inset 0 -2px 5px rgba(110,70,58,.3),0 8px 18px -10px rgba(140,100,86,.7);}
.hm-wish-ico{display:flex;color:var(--gold);}
.hm-wish-note{
  margin-top:1rem;font-family:var(--font-display);font-style:italic;
  font-size:1rem;color:var(--on-light-soft);opacity:0;transform:translateY(8px);
  transition:opacity .4s var(--ease-soft) .28s,transform .4s var(--ease-soft) .28s;
}
.hm-wish-note.is-on{opacity:1;transform:none;}

/* ═══ WISHES ════════════════════════════════════════════════════════════ */
.hm-wishes{overflow:hidden;}
.hm-wish-list{
  list-style:none;padding:0;margin:0;width:100%;
  display:grid;gap:1rem;grid-template-columns:1fr;
}
@media (min-width:640px){.hm-wish-list{grid-template-columns:1fr 1fr;gap:1.15rem;}}
/* stagger the second column down half a card — breaks the grid's flat top
   edge. margin, not transform, so it doesn't fight the reveal animation. */
@media (min-width:900px){
  .hm-wish-list > li:nth-child(even){margin-top:1.7rem;}
  .hm-wish-card:hover{transform:translateZ(28px) rotateX(3deg);}
}
.hm-wish-list{perspective:900px;}
.hm-wish-card{
  position:relative;padding:1.75rem 1.5rem 1.6rem;text-align:left;
  transform-style:preserve-3d;
  background:linear-gradient(160deg,rgba(255,253,248,.92),rgba(246,235,244,.88));
  border-radius:4px;
  box-shadow:0 20px 44px -28px rgba(40,30,70,.5),inset 0 0 0 1px rgba(217,169,79,.25);
  opacity:0;transform:translate3d(0,14px,0);
  transition:opacity .3s var(--ease-soft),transform .32s var(--ease-spring),box-shadow .2s;
  transition-delay:var(--delay);
}
.hm-wishes.is-in .hm-wish-card{opacity:1;transform:none;}
.hm-wish-card:hover{transform:translateZ(24px) rotateX(2.5deg);box-shadow:0 26px 50px -24px rgba(40,30,70,.45),inset 0 0 0 1px rgba(217,169,79,.55),0 0 30px -8px rgba(246,226,174,.7);}
.hm-wish-gem{
  position:absolute;top:1.5rem;right:1.5rem;width:11px;height:11px;border-radius:50%;
  background:radial-gradient(circle at 32% 30%,#FFFDF6,#F6E2AE 45%,#D9A94F);
  box-shadow:0 0 0 3px rgba(246,226,174,.25);
  transition:box-shadow .25s,transform .25s var(--ease-spring);
}
.hm-wish-card:hover .hm-wish-gem{transform:scale(1.25);box-shadow:0 0 0 8px rgba(217,139,166,.28);}
.hm-wish-card h3{
  font-family:var(--font-ui);font-size:.72rem;font-weight:500;
  letter-spacing:.26em;text-transform:uppercase;color:var(--rosegold-ink);margin:0 0 .7rem;
}
.hm-wish-card p{
  font-family:var(--font-display);font-size:1.06rem;line-height:1.8;color:var(--on-light);margin:0;
}
.hm-amen{
  text-align:left;margin:1.6rem 0 0;max-width:28ch;
  font-family:var(--font-display);font-style:italic;font-size:1.1rem;color:var(--on-light-soft);
}

/* ═══ FOOTER ════════════════════════════════════════════════════════════ */
.hm-footer{
  position:relative;margin-top:clamp(3rem,8vw,5.5rem);
  padding:clamp(7rem,16vw,10rem) 1.25rem clamp(3rem,8vw,4rem);
  padding-bottom:calc(clamp(3rem,8vw,4rem) + env(safe-area-inset-bottom));
  text-align:center;overflow:hidden;
  /* mirror of the hero: fades out of the page surface, above all footer text */
  background:linear-gradient(180deg,
    var(--petal) 0%,var(--blush) 8%,var(--mauve) 22%,var(--wine) 42%,var(--plum) 100%);
}
.hm-footer-sky{height:80%;opacity:.6;}
.hm-footer-mark{position:relative;color:var(--gold-lite);opacity:.75;margin:0 auto 1.5rem;display:block;}
.hm-footer-line{
  position:relative;font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1.5rem,5vw,2.2rem);color:var(--on-dark);text-shadow:var(--shadow-on-dark);margin:0;
}
.hm-footer-line .hm-shimmer{font-family:var(--font-script);font-style:normal;font-size:1.35em;}
.hm-footer-sub{
  position:relative;margin-top:1.2rem;font-size:.8rem;letter-spacing:.1em;
  color:var(--on-dark-soft);text-shadow:var(--shadow-on-dark);max-width:34ch;margin-inline:auto;line-height:1.9;
}

.hm-footer-credit{
  position:relative;margin-top:2.4rem;
  font-family:var(--font-display);font-style:italic;font-weight:300;
  font-size:clamp(1rem,3vw,1.2rem);letter-spacing:.01em;
  color:var(--on-dark-soft);opacity:.95;
  text-shadow:var(--shadow-on-dark);
}
.hm-footer-close{
  position:relative;color:var(--gold-lite);opacity:.9;
  text-transform:uppercase;margin:0 0 1rem;
  text-shadow:var(--shadow-on-dark);
}

/* ═══ BALLOONS ══════════════════════════════════════════════════════════
   Sits above the page (z 74) and below the fireworks (76) and banner (84).
   pointer-events:none on the layer AND on every child, so nothing underneath
   can be blocked. Two nested animations per balloon — the wrapper rises, the
   body sways — on independent durations, which is what stops them moving as
   a block. */
.hm-balloons{position:fixed;inset:0;z-index:74;pointer-events:none;overflow:hidden;}
.hm-balloon{
  position:absolute;bottom:-20vh;
  width:var(--size);pointer-events:none;
  animation-name:balloonRise;animation-timing-function:cubic-bezier(.36,.1,.5,1);
  animation-fill-mode:both;
}
@keyframes balloonRise{
  0%{transform:translate3d(0,0,0) rotate(var(--tilt));opacity:0;}
  8%{opacity:1;}
  78%{opacity:1;}
  100%{transform:translate3d(0,-135vh,0) rotate(var(--tilt));opacity:0;}
}
.hm-balloon-body{
  position:relative;display:block;
  width:var(--size);height:calc(var(--size) * 1.22);
  border-radius:50% 50% 48% 48% / 55% 55% 45% 45%;
  background:
    radial-gradient(ellipse at 32% 26%, rgba(255,255,255,.85) 0%, rgba(255,255,255,0) 42%),
    linear-gradient(158deg, var(--light) 0%, var(--dark) 88%);
  box-shadow:inset -4px -6px 10px rgba(120,44,78,.28),
             0 8px 18px -8px rgba(120,44,78,.45);
  animation-name:balloonSway;animation-timing-function:ease-in-out;
  animation-iteration-count:infinite;animation-direction:alternate;
}
@keyframes balloonSway{
  from{transform:translate3d(calc(var(--sway) * -.5),0,0) rotate(-4deg);}
  to{transform:translate3d(calc(var(--sway) * .5),0,0) rotate(4deg);}
}
.hm-balloon-shine{
  position:absolute;top:14%;left:22%;
  width:26%;height:20%;border-radius:50%;
  background:rgba(255,255,255,.7);filter:none;
}
.hm-balloon-knot{
  position:absolute;bottom:-5%;left:50%;
  width:22%;height:9%;margin-left:-11%;
  background:var(--dark);
  border-radius:0 0 50% 50%;
  clip-path:polygon(50% 100%, 0 0, 100% 0);
}
.hm-balloon-string{
  position:absolute;top:calc(var(--size) * 1.28);left:50%;
  width:1px;height:calc(var(--size) * 1.5);
  background:linear-gradient(180deg,var(--dark),transparent);
  opacity:.5;
}
/* wind down with the rest of the sequence */
.hm-balloons.is-out .hm-balloon{animation-play-state:running;opacity:.6;}
@media (max-width:520px){
  .hm-balloon{width:calc(var(--size) * .78);}
  .hm-balloon-body{width:calc(var(--size) * .78);height:calc(var(--size) * .95);}
}
/* reduced motion: they fade in low and still, no rise, no sway */
.hm-root.is-calm .hm-balloon{
  animation:none;bottom:12vh;opacity:.55;
}
.hm-root.is-calm .hm-balloon-body{animation:none;}

/* ═══ DOM FIREWORKS ═════════════════════════════════════════════════════
   Sits above the particle canvas (70) and below the banner (84). Every
   animation is transform/opacity on a GPU layer; nodes exist only while the
   finale is running and are removed with the component.                   */
.hm-finale-fw{position:fixed;inset:0;z-index:76;pointer-events:none;overflow:hidden;}
.hm-fw{position:absolute;width:0;height:0;}
/* the flash at the heart of each burst */
.hm-fw-core{
  position:absolute;left:-40px;top:-40px;width:80px;height:80px;border-radius:50%;
  background:radial-gradient(circle,#FFFDF2 0%,rgba(255,243,210,.7) 30%,transparent 70%);
  opacity:0;animation:fwCore .7s ease-out both;
}
@keyframes fwCore{
  0%{opacity:0;transform:scale(.2);}
  18%{opacity:1;transform:scale(1);}
  100%{opacity:0;transform:scale(2.1);}
}
.hm-fw i{
  position:absolute;left:0;top:0;
  width:var(--s);height:var(--s);margin:calc(var(--s) / -2);
  border-radius:50%;background:var(--c);
  box-shadow:0 0 10px 2px var(--c);
  opacity:0;
  animation-name:fwShard;animation-timing-function:cubic-bezier(.14,.72,.3,1);
  animation-fill-mode:both;
}
@keyframes fwShard{
  0%{opacity:0;transform:translate3d(0,0,0) scale(.5);}
  8%{opacity:1;transform:translate3d(calc(var(--dx) * .16),calc(var(--dy) * .16),0) scale(1.15);}
  62%{opacity:1;}
  100%{
    opacity:0;
    transform:translate3d(var(--dx),calc(var(--dy) + 90px),0) scale(.25);
  }
}
/* falling confetti strips */
.hm-fw-confetti{
  position:absolute;top:-6%;display:block;border-radius:1px;
  background:var(--c);opacity:0;
  animation-name:fwConfetti;animation-timing-function:linear;
  animation-fill-mode:both;
}
@keyframes fwConfetti{
  0%{opacity:0;transform:translate3d(0,0,0) rotate(0deg);}
  6%{opacity:1;}
  85%{opacity:1;}
  100%{
    opacity:0;
    transform:translate3d(var(--drift),110vh,0) rotate(var(--spin));
  }
}
/* stop spawning once the sequence is winding down */
.hm-finale-fw.is-out .hm-fw-core,
.hm-finale-fw.is-out .hm-fw i{animation-play-state:paused;}

/* ═══ FINALE ════════════════════════════════════════════════════════════ */
.hm-finale{position:fixed;inset:0;z-index:84;pointer-events:none;}
.hm-finale-under{position:fixed;inset:0;z-index:60;pointer-events:none;}

/* the bloom of light on the wish itself */
.hm-finale-bloom{
  position:absolute;inset:0;opacity:0;
  background:radial-gradient(circle at 50% 55%,#FFF6E2 0%,rgba(246,213,224,.55) 32%,transparent 68%);
}
.hm-finale-under.is-bloom .hm-finale-bloom{animation:finaleBloom .9s var(--ease-soft) forwards;}
@keyframes finaleBloom{0%{opacity:0;}22%{opacity:.85;}100%{opacity:0;}}

/* a warm wash that stays up through the barrage, so the whole page reads
   lit rather than only the cake */
.hm-finale-glow{
  position:absolute;inset:0;opacity:0;
  background:
    radial-gradient(80% 50% at 50% 0%,rgba(235,211,164,.34),transparent 70%),
    radial-gradient(70% 45% at 12% 88%,rgba(217,139,166,.3),transparent 72%),
    radial-gradient(70% 45% at 88% 88%,rgba(201,138,114,.28),transparent 72%);
  transition:opacity .7s var(--ease-soft);
}
.hm-finale-under.is-party .hm-finale-glow,
.hm-finale-under.is-banner .hm-finale-glow{opacity:1;animation:glowBreathe 2.6s ease-in-out infinite;}
@keyframes glowBreathe{0%,100%{opacity:.72;}50%{opacity:1;}}

/* the banner */
.hm-finale-banner{
  position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
  display:flex;flex-direction:column;align-items:center;gap:.35rem;
  width:min(92vw,34rem);text-align:center;
  opacity:0;
}
.hm-finale.is-banner .hm-finale-banner{animation:bannerIn 1s var(--ease-spring) forwards;}
.hm-finale.is-out .hm-finale-banner{animation:bannerOut 1.4s var(--ease-soft) forwards;}
@keyframes bannerIn{
  0%{opacity:0;transform:translate(-50%,-50%) scale(.86);}
  60%{opacity:1;}
  100%{opacity:1;transform:translate(-50%,-50%) scale(1);}
}
@keyframes bannerOut{
  0%{opacity:1;transform:translate(-50%,-50%) scale(1);}
  100%{opacity:0;transform:translate(-50%,-58%) scale(1.06);}
}
.hm-finale-eyebrow{
  color:var(--gold-lite);text-transform:uppercase;
  text-shadow:0 2px 16px rgba(46,24,38,.85);
}
.hm-finale-name{
  font-family:var(--font-script);
  font-size:clamp(3.6rem,15vw,7rem);line-height:1;
  color:#FFF6E8;
  text-shadow:0 4px 30px rgba(46,24,38,.75),0 0 60px rgba(235,211,164,.55);
}
.hm-finale-rule{
  width:6rem;height:1px;margin:.5rem 0 .35rem;
  background:linear-gradient(90deg,transparent,var(--gold-lite),transparent);
}
.hm-finale-sub{
  font-family:var(--font-display);font-style:italic;
  font-size:clamp(.95rem,3vw,1.2rem);color:#FBE7EE;
  text-shadow:0 2px 14px rgba(46,24,38,.85);
}

/* ── SITE-WIDE REACTIONS — the rest of the page joins in ────────────────
   Everything here is transform/opacity only and scoped to one root class, so
   it costs nothing until the wish is made and nothing after it ends. */
.hm-root.is-celebrating .hm-frame{animation:celebrateBob 1.5s var(--ease-soft) infinite;}
.hm-root.is-celebrating .hm-frame:nth-child(2){animation-delay:-.3s;}
.hm-root.is-celebrating .hm-frame:nth-child(3){animation-delay:-.6s;}
.hm-root.is-celebrating .hm-frame:nth-child(4){animation-delay:-.9s;}
.hm-root.is-celebrating .hm-frame:nth-child(5){animation-delay:-1.2s;}
@keyframes celebrateBob{
  0%,100%{translate:0 0;}
  50%{translate:0 -9px;}
}
.hm-root.is-celebrating .hm-wish-card{animation:celebrateLift 1.9s var(--ease-soft) infinite;}
.hm-root.is-celebrating .hm-wish-card:nth-child(even){animation-delay:-.95s;}
@keyframes celebrateLift{
  0%,100%{box-shadow:0 20px 44px -28px rgba(40,30,70,.5),inset 0 0 0 1px rgba(217,169,79,.25);}
  50%{box-shadow:0 26px 54px -24px rgba(40,30,70,.45),inset 0 0 0 1px rgba(235,211,164,.85),0 0 34px -6px rgba(235,211,164,.6);}
}
.hm-root.is-celebrating .hm-wish-gem{animation:gemFlash 1.1s ease-in-out infinite;}
@keyframes gemFlash{0%,100%{transform:scale(1);}50%{transform:scale(1.35);}}
/* every pearl on the story thread lights, whatever the scroll position */
.hm-root.is-celebrating .hm-thread-node{
  opacity:.95!important;transform:scale(1)!important;
  animation:nodeFlash 1.3s ease-in-out infinite;
  animation-delay:calc(var(--n) * .13s);
}
@keyframes nodeFlash{
  0%,100%{box-shadow:0 0 0 4px rgba(246,213,224,.5),0 0 18px 4px rgba(235,211,164,.45);}
  50%{box-shadow:0 0 0 8px rgba(246,213,224,.35),0 0 34px 10px rgba(235,211,164,.8);}
}
.hm-root.is-celebrating .hm-thread-line{stroke-width:2.6;}
.hm-root.is-celebrating .hm-topbar{background:linear-gradient(180deg,rgba(94,44,70,.8),rgba(94,44,70,0));}
.hm-root.is-celebrating .hm-music-btn{box-shadow:0 0 30px -6px rgba(235,211,164,.9);}
/* the hero name sweeps again, so the top of the page reacts too */
.hm-root.is-celebrating .hm-hero-name .hm-shimmer{
  animation:sweep 1.9s var(--ease-soft) infinite;
}
.hm-root.is-celebrating .hm-h2{animation:titleGlow 2.2s ease-in-out infinite;}
@keyframes titleGlow{
  0%,100%{text-shadow:0 1px 0 rgba(255,255,255,.55);}
  50%{text-shadow:0 1px 0 rgba(255,255,255,.55),0 0 26px rgba(235,211,164,.9);}
}
.hm-root.is-celebrating .hm-butterfly{animation-duration:9s;}

/* Reduced motion: banner and a still glow, no bob, no barrage. */
.hm-root.is-calm .hm-finale-glow{animation:none;opacity:.7;}
.hm-root.is-calm.is-celebrating .hm-frame,
.hm-root.is-calm.is-celebrating .hm-wish-card,
.hm-root.is-calm.is-celebrating .hm-wish-gem,
.hm-root.is-calm.is-celebrating .hm-thread-node,
.hm-root.is-calm.is-celebrating .hm-h2,
.hm-root.is-calm.is-celebrating .hm-hero-name .hm-shimmer{animation:none!important;}

/* ═══ TOP BAR ═══════════════════════════════════════════════════════════ */
.hm-topbar{
  position:fixed;z-index:88;top:0;left:0;right:0;
  display:flex;align-items:center;justify-content:space-between;gap:1rem;
  padding:.6rem max(.9rem,env(safe-area-inset-right)) .6rem max(.9rem,env(safe-area-inset-left));
  padding-top:calc(.6rem + env(safe-area-inset-top));
  background:linear-gradient(180deg,rgba(46,24,38,.74),rgba(46,24,38,0));
  /* backdrop-filter removed: it re-composited on every scroll frame */
  -webkit-mask-image:linear-gradient(180deg,#000 62%,transparent 100%);
          mask-image:linear-gradient(180deg,#000 62%,transparent 100%);
  animation:barIn .5s var(--ease-soft) .28s both;
  transition:opacity .22s,transform .22s var(--ease-soft);
}
.hm-topbar.is-hidden{opacity:0;transform:translateY(-100%);pointer-events:none;}
@keyframes barIn{from{opacity:0;transform:translateY(-100%);}to{opacity:1;transform:none;}}
.hm-topbar-mark{
  display:inline-flex;align-items:center;gap:.55rem;color:var(--gold-lite);opacity:.85;
}
.hm-topbar-name{
  font-family:var(--font-script);font-size:1.25rem;line-height:1;color:var(--ivory);
}
.hm-music-btn{
  display:inline-flex;align-items:center;gap:.6rem;
  min-height:44px;padding:0 .9rem;
  color:var(--gold-lite);background:rgba(46,24,38,.55);
  border:1px solid rgba(246,226,174,.4);border-radius:999px;cursor:pointer;
  font-family:var(--font-ui);
  transition:transform .22s var(--ease-spring),background .2s,box-shadow .2s,color .2s;
}
.hm-music-btn:hover{transform:scale(1.05);box-shadow:0 0 26px -6px rgba(246,226,174,.8);}
.hm-music-btn:active{transform:scale(.97);}
.hm-music-btn.is-muted{color:var(--on-dark-soft);border-color:rgba(230,195,210,.35);}
.hm-music-btn.is-blocked{background:rgba(217,169,79,.92);color:#1B2340;border-color:transparent;
  animation:pulseGate 2.2s infinite;}
.hm-music-label{text-transform:uppercase;white-space:nowrap;}
.hm-music-ico{display:flex;}
/* four little bars that dance only while audio is actually running */
.hm-eq{display:inline-flex;align-items:flex-end;gap:2px;height:13px;}
.hm-eq i{
  width:2px;height:100%;border-radius:1px;background:currentColor;
  transform:scaleY(.25);transform-origin:bottom;opacity:.55;
}
.hm-eq.is-live i{animation:eq .9s ease-in-out infinite;opacity:1;}
.hm-eq.is-live i:nth-child(2){animation-delay:-.25s;animation-duration:1.05s;}
.hm-eq.is-live i:nth-child(3){animation-delay:-.55s;animation-duration:.78s;}
.hm-eq.is-live i:nth-child(4){animation-delay:-.15s;animation-duration:1.18s;}
@keyframes eq{0%,100%{transform:scaleY(.28);}50%{transform:scaleY(1);}}
@media (max-width:420px){
  .hm-music-label{display:none;}
  .hm-music-btn{padding:0 .75rem;}
}

/* ═══ SCREENSHOT CONTROL ════════════════════════════════════════════════ */
.hm-topbar-controls{display:inline-flex;align-items:center;gap:.5rem;}
/* Shares .hm-music-btn wholesale so the pair reads as one control cluster;
   only the state colours differ. */
.hm-cap-btn{gap:.5rem;}
.hm-cap-ico{display:flex;}
.hm-cap-btn:disabled{cursor:progress;transform:none;}
.hm-cap-btn.is-working{color:var(--on-dark-soft);border-color:rgba(230,195,210,.35);}
.hm-cap-btn.is-done{color:#2B1526;background:rgba(195,164,228,.92);border-color:transparent;}
.hm-cap-btn.is-error{color:#FFE3E3;border-color:rgba(255,170,170,.55);background:rgba(120,40,55,.5);}
.hm-cap-spin{animation:capSpin .9s linear infinite;transform-origin:50% 50%;}
@keyframes capSpin{to{transform:rotate(360deg);}}

/* ── capture mode ──────────────────────────────────────────────────────────
   Held only for the moment html2canvas is painting. Animations are PAUSED
   rather than cleared: animation:none would drop reveal animations that use
   fill-mode 'both' back to their opacity-0 start frame and blank the page. */
.hm-root.is-capturing *,
.hm-root.is-capturing *::before,
.hm-root.is-capturing *::after{
  animation-play-state:paused!important;
  transition:none!important;
}
/* Fixed viewport-sized layers can't tile down a document-height canvas —
   html2canvas would stamp each once at the top of the shot. */
.hm-root.is-capturing .hm-particles,
.hm-root.is-capturing .hm-cursor-dot,
.hm-root.is-capturing .hm-cursor-photo,
.hm-root.is-capturing .hm-balloons,
.hm-root.is-capturing .hm-finale-fw,
.hm-root.is-capturing .hm-finale,
.hm-root.is-capturing .hm-finale-under,
.hm-root.is-capturing .hm-curtain{display:none!important;}
/* backdrop-filter renders as a grey plate under html2canvas; drop it for the
   shot and let the element's own background carry the panel. */
.hm-root.is-capturing *{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}

@media (max-width:420px){
  .hm-topbar-controls{gap:.35rem;}
  .hm-cap-btn{padding:0 .7rem;}
}

/* ═══ RESPONSIVE ════════════════════════════════════════════════════════ */
@media (max-width:760px){
  .hm-collage{height:auto;display:flex;flex-direction:column;gap:1.5rem;align-items:center;perspective:none;}
  .hm-frame{position:relative;left:auto!important;top:auto!important;width:min(78%,17rem);}
  .hm-collage{height:auto!important;}
  .hm-frame:nth-child(even){align-self:flex-end;margin-right:6%;}
  .hm-frame:nth-child(odd){align-self:flex-start;margin-left:6%;}
  .hm-photo{animation:none;transform:scale(1.02);} /* drop Ken Burns on mobile */
}
@media (max-width:400px){
  .hm-frame{width:min(88%,15rem);}
  .hm-note{padding-inline:1.35rem;}
}

/* ═══ REDUCED MOTION — calmer, never broken. Audio stays fully live. ════ */
@media (prefers-reduced-motion:reduce){
  .hm-photo,.hm-flame-grp,.hm-flame-a,.hm-flame-b,.hm-flame-c,.hm-wick,
  .hm-halo,.hm-flecks circle,.hm-star,.hm-wing,.hm-butterfly,.hm-shimmer,
  .hm-scroll-line,.hm-gate-cta,.hm-topper,.hm-eq i,.hm-topbar,.hm-cake{
    animation:none!important;
  }
  .hm-shimmer{color:var(--ivory);-webkit-text-fill-color:currentColor;}
  .hm-curtain{display:none;}
  .hm-frame,.hm-note,.hm-wish-card,.hm-cake-wrap{transition-duration:.25s!important;}
  .hm-lightbox-img{animation-duration:.2s;}
  .hm-cursor-dot,.hm-cursor-photo,.hm-particles{display:none;}
}
.hm-root.is-calm .hm-cake,
.hm-root.is-calm .hm-topper,
.hm-root.is-calm .hm-flame-a,
.hm-root.is-calm .hm-flame-b,
.hm-root.is-calm .hm-flame-c,
.hm-root.is-calm .hm-wick,
.hm-root.is-calm .hm-photo,
.hm-root.is-calm .hm-shimmer,
.hm-root.is-calm .hm-butterfly,
.hm-root.is-calm .hm-star,
.hm-root.is-calm .hm-gate-cta,
.hm-root.is-calm .hm-eq i,
.hm-root.is-calm .hm-topbar{animation:none!important;}
.hm-root.is-calm .hm-shimmer{color:var(--ivory);-webkit-text-fill-color:currentColor;}
.hm-root.is-calm .hm-curtain{display:none;}
`;Lc(document.getElementById("root")).render(l.jsx(ed.StrictMode,{children:l.jsx(Pp,{})}));
