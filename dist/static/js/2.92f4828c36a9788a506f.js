webpackJsonp([2],{"+tPU":function(t,e,n){n("xGkn");for(var o=n("7KvD"),r=n("hJx8"),i=n("/bQp"),s=n("dSzd")("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<a.length;u++){var c=a[u],l=o[c],f=l&&l.prototype;f&&!f[s]&&r(f,s,c),i[c]=i.Array}},"/bQp":function(t,e){t.exports={}},"3fs2":function(t,e,n){var o=n("RY/4"),r=n("dSzd")("iterator"),i=n("/bQp");t.exports=n("FeBl").getIteratorMethod=function(t){if(void 0!=t)return t[r]||t["@@iterator"]||i[o(t)]}},"4mcu":function(t,e){t.exports=function(){}},"880/":function(t,e,n){t.exports=n("hJx8")},"94VQ":function(t,e,n){"use strict";var o=n("Yobk"),r=n("X8DO"),i=n("e6n0"),s={};n("hJx8")(s,n("dSzd")("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=o(s,{next:r(1,n)}),i(t,e+" Iterator")}},BO1k:function(t,e,n){t.exports={default:n("fxRn"),__esModule:!0}},EGZi:function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},KYvs:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("fZjL"),r=n.n(o),i=n("BO1k"),s=n.n(i),a=n("mtWM"),u=n.n(a),c={data:function(){return{taskName:"",taskCompletitions:[],showSuggestion:!1}},components:{Autocomplete:n("lbUa").default},computed:{filteredSuggestion:function(){console.log(["name",this.taskName]);var t=[],e=this.taskName.toLowerCase(),n=this.getTimeDelta(e,"",0),o=e.replace(n,"").trim(),r=new RegExp(o,"i"),i=!0,a=!1,u=void 0;try{for(var c,l=s()(this.taskCompletitions);!(i=(c=l.next()).done);i=!0){var f=c.value;if(f.match(r)&&f!==o&&t.push(n+" "+f),t.length>=10)break}}catch(t){a=!0,u=t}finally{try{!i&&l.return&&l.return()}finally{if(a)throw u}}return t}},methods:{getCompletitions:function(){var t=this;u.a.get("http://localhost:5000/api/completitions").then(function(e){t.taskCompletitions=e.data.values}).catch(function(t){console.log(["getCompletitions error",t])})},addTask:function(){var t=this;u.a.post("http://localhost:5000/api/task",this.urlEncode({name:this.taskName}),{headers:{"Content-type":"application/x-www-form-urlencoded"}}).then(function(e){t.taskName="",t.$emit("add-task"),t.$refs.autocomplete.clear()}).catch(function(t){console.log(["getCompletitions error",t])})},getTimeDelta:function(t,e,n){var o="",r=[new RegExp(/^-[0-9]{0,3}/),new RegExp(/^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])/),new RegExp(/^([0-1]?[0-9]|[2][0-3]):([0-5][0-9])-([0-1]?[0-9]|[2][0-3]):([0-5][0-9])/)];if(0===n&&t.match(r[2]))return t.match(r[2])[0];if(t.match(r[0])?o=t.match(r[0])[0]:t.match(r[1])&&(o=t.match(r[1])[0]),""!==o&&0===n)return this.getTimeDelta(t.replace(o,"").trim(),o,1);if(""!==e&&""!==o)o=e+" "+o;else if(""!==e&&""===o)return e;return o},onFocus:function(){this.showSuggestion=!0},urlEncode:function(t){return r()(t).reduce(function(e,n){return e.push(n+"="+encodeURIComponent(t[n])),e},[]).join("&")}},mounted:function(){this.getCompletitions()}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{staticClass:"md-layout md-gutter md-alignment-top-center",attrs:{action:"",method:"post"},on:{submit:function(e){e.preventDefault(),t.addTask()}}},[n("md-card",{staticClass:"md-layout-item md-large-size-50 md-xlarge-size-50 md-medium-size-70 md-small-size-100"},[n("md-card-content",[n("div",{staticClass:"md-layout"},[n("div",{staticClass:"md-layout-item md-size-80"},[n("Autocomplete",{ref:"autocomplete",attrs:{suggestions:t.filteredSuggestion},model:{value:t.taskName,callback:function(e){t.taskName=e},expression:"taskName"}})],1),t._v(" "),n("div",{staticClass:"md-layout-item md-size-20"},[n("md-button",{staticClass:"md-primary",staticStyle:{"margin-top":"18px"},attrs:{type:"submit"}},[t._v("Add")])],1)])])],1)],1)])},staticRenderFns:[]},f=n("VU/8")(c,l,!1,null,null,null);e.default=f.exports},PzxK:function(t,e,n){var o=n("D2L2"),r=n("sB3e"),i=n("ax3d")("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),o(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},RPLV:function(t,e,n){var o=n("7KvD").document;t.exports=o&&o.documentElement},"RY/4":function(t,e,n){var o=n("R9M2"),r=n("dSzd")("toStringTag"),i="Arguments"==o(function(){return arguments}());t.exports=function(t){var e,n,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),r))?n:i?o(e):"Object"==(s=o(e))&&"function"==typeof e.callee?"Arguments":s}},Yobk:function(t,e,n){var o=n("77Pl"),r=n("qio6"),i=n("xnc9"),s=n("ax3d")("IE_PROTO"),a=function(){},u=function(){var t,e=n("ON07")("iframe"),o=i.length;for(e.style.display="none",n("RPLV").appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),u=t.F;o--;)delete u.prototype[i[o]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(a.prototype=o(t),n=new a,a.prototype=null,n[s]=t):n=u(),void 0===e?n:r(n,e)}},dSzd:function(t,e,n){var o=n("e8AB")("wks"),r=n("3Eo+"),i=n("7KvD").Symbol,s="function"==typeof i;(t.exports=function(t){return o[t]||(o[t]=s&&i[t]||(s?i:r)("Symbol."+t))}).store=o},e6n0:function(t,e,n){var o=n("evD5").f,r=n("D2L2"),i=n("dSzd")("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,i)&&o(t,i,{configurable:!0,value:e})}},fxRn:function(t,e,n){n("+tPU"),n("zQR9"),t.exports=n("g8Ux")},g8Ux:function(t,e,n){var o=n("77Pl"),r=n("3fs2");t.exports=n("FeBl").getIterator=function(t){var e=r(t);if("function"!=typeof e)throw TypeError(t+" is not iterable!");return o(e.call(t))}},h65t:function(t,e,n){var o=n("UuGF"),r=n("52gC");t.exports=function(t){return function(e,n){var i,s,a=String(r(e)),u=o(n),c=a.length;return u<0||u>=c?t?"":void 0:(i=a.charCodeAt(u))<55296||i>56319||u+1===c||(s=a.charCodeAt(u+1))<56320||s>57343?t?a.charAt(u):i:t?a.slice(u,u+2):s-56320+(i-55296<<10)+65536}}},qio6:function(t,e,n){var o=n("evD5"),r=n("77Pl"),i=n("lktj");t.exports=n("+E39")?Object.defineProperties:function(t,e){r(t);for(var n,s=i(e),a=s.length,u=0;a>u;)o.f(t,n=s[u++],e[n]);return t}},"vIB/":function(t,e,n){"use strict";var o=n("O4g8"),r=n("kM2E"),i=n("880/"),s=n("hJx8"),a=n("/bQp"),u=n("94VQ"),c=n("e6n0"),l=n("PzxK"),f=n("dSzd")("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,m,h,v,g){u(n,e,m);var y,x,S,k=function(t){if(!p&&t in T)return T[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},L=e+" Iterator",b="values"==h,C=!1,T=t.prototype,O=T[f]||T["@@iterator"]||h&&T[h],_=O||k(h),w=h?b?k("entries"):_:void 0,R="Array"==e&&T.entries||O;if(R&&(S=l(R.call(new t)))!==Object.prototype&&S.next&&(c(S,L,!0),o||"function"==typeof S[f]||s(S,f,d)),b&&O&&"values"!==O.name&&(C=!0,_=function(){return O.call(this)}),o&&!g||!p&&!C&&T[f]||s(T,f,_),a[e]=_,a[L]=d,h)if(y={values:b?_:k("values"),keys:v?_:k("keys"),entries:w},g)for(x in y)x in T||i(T,x,y[x]);else r(r.P+r.F*(p||C),e,y);return y}},xGkn:function(t,e,n){"use strict";var o=n("4mcu"),r=n("EGZi"),i=n("/bQp"),s=n("TcQ7");t.exports=n("vIB/")(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):r(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,o("keys"),o("values"),o("entries")},zQR9:function(t,e,n){"use strict";var o=n("h65t")(!0);n("vIB/")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=o(e,n),this._i+=t.length,{value:t,done:!1})})}});
//# sourceMappingURL=2.92f4828c36a9788a506f.js.map