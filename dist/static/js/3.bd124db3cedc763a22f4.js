webpackJsonp([3],{"J+R/":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("VTQS"),o=i("WdI8"),s={data:function(){return{login:"",password:"",isLogin:!1}},computed:{},methods:{auth:function(){var t=this;n.b.auth(this.login,this.password,"login").then(function(e){void 0!==e.data.message?alert(e.data.message):(t.isLogin=Object(o.b)(),t.$emit("login"))}).catch(function(t){console.log(["auth error",t])})}},mounted:function(){this.isLogin=Object(o.b)()}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("md-card",{staticClass:"md-layout-item md-size-20",staticStyle:{margin:"auto"}},[i("md-card-content",[i("md-field",[i("label",[t._v("Логин")]),t._v(" "),i("md-input",{attrs:{type:"text",required:""},model:{value:t.login,callback:function(e){t.login="string"==typeof e?e.trim():e},expression:"login"}}),t._v(" "),i("md-tooltip",{attrs:{"md-direction":"right"}},[t._v("Логин redmine")])],1),t._v(" "),i("md-field",[i("label",[t._v("Пароль")]),t._v(" "),i("md-input",{attrs:{type:"password",required:""},model:{value:t.password,callback:function(e){t.password="string"==typeof e?e.trim():e},expression:"password"}}),t._v(" "),i("md-tooltip",{attrs:{"md-direction":"right"}},[t._v("Пароль redmine")])],1),t._v(" "),i("div",{staticClass:"auth-buttons"},[i("md-button",{on:{click:function(e){t.auth()}}},[t._v("Войти")])],1)],1)],1)],1)},staticRenderFns:[]};var r=i("VU/8")(s,a,!1,function(t){i("tGuD")},null,null);e.default=r.exports},tGuD:function(t,e){}});
//# sourceMappingURL=3.bd124db3cedc763a22f4.js.map