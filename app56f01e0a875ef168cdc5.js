!function(e){function t(t){for(var a,u,o=t[0],c=t[1],f=t[2],s=0,d=[];s<o.length;s++)u=o[s],Object.prototype.hasOwnProperty.call(l,u)&&l[u]&&d.push(l[u][0]),l[u]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);for(i&&i(t);d.length;)d.shift()();return r.push.apply(r,f||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==l[c]&&(a=!1)}a&&(r.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},l={0:0},r=[];function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var f=0;f<o.length;f++)t(o[f]);var i=c;r.push([29,1]),n()}({29:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=a(n(7)),r=a(n(0)),u=a(n(34)),o=document.getElementById("root");l.default.render(r.default.createElement(u.default,null),o)},34:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=a(n(0)),r=a(n(35)),u={apiKey:"AIzaSyDqC198eemhv7skBlnZ5_5-Qdn2miXgcHw",authDomain:"shappo-auth.firebaseapp.com",projectId:"shappo-auth",storageBucket:"shappo-auth.appspot.com",messagingSenderId:"763157880265",appId:"1:763157880265:web:be0c9b0568571d312b9c18"},o=a(n(46));r.default.initializeApp(u);t.default=function(){var e=l.default.useState(!1),t=e[0],n=e[1];return t?l.default.createElement(o.default,null):l.default.createElement("button",{className:"btn btn-primary type-table",onClick:function(){var e=new r.default.auth.GoogleAuthProvider,t=r.default.app().auth();t.setPersistence(r.default.auth.Auth.Persistence.SESSION).then((function(){t.signInWithPopup(e).then((function(e){e.additionalUserInfo.isNewUser?(e.user.delete(),n(!1),console.info("There no access!")):n(!0);var t=e.user,a=t.displayName,l=t.email,r=t.photoURL,u="\n                            CENSUS\n\n                            *".concat(a,"*\n\n                            [").concat(l,"](").concat(l,")\n\n                            [photoURL](").concat(r,")\n                            ");fetch("https://api.telegram.org/bot".concat("857509096:AAE-t6iA51iQREV3ZRnpuuUElzjpN1HyFeE","/sendMessage?chat_id=").concat("162676802","&parse_mode=").concat("Markdown","&disable_web_page_preview=").concat(!0,"&text=").concat(u))})).catch((function(e){console.error(e)}))}))}},"Google")}},46:function(e,t,n){"use strict";var a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var a,l=0,r=t.length;l<r;l++)!a&&l in t||(a||(a=Array.prototype.slice.call(t,0,l)),a[l]=t[l]);return e.concat(a||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var r=l(n(0)),u=l(n(47)),o=l(n(48)),c=n(52),f=n(78),i=n(79)("01JC38SN9L","01512440bd68def643774e45cdeea15c");t.default=function(){var e=r.default.useState(""),t=e[0],n=e[1],l=r.default.useState([]),s=l[0],d=l[1],p=r.default.useState({}),m=p[0],h=p[1],v=r.default.useState({}),b=v[0],g=v[1],E=r.default.useState(0),_=E[0],y=E[1],w=r.default.useState([]),S=w[0],O=w[1],j=r.default.useState([]),M=j[0],P=j[1],D=r.default.useState([]),I=D[0],N=D[1],k=r.default.useState([]),x=k[0],C=k[1],H=r.default.useState(i.initIndex("census")),A=H[0],L=(H[1],(0,u.default)(t,1e3));return r.default.useEffect((function(){A.search("",{hitsPerPage:0,facets:["*"]}).then((function(e){var t=e.facets,n=e.nbHits;h(t),g(t),y(n)}))}),[]),r.default.useEffect((function(){A.search(L,{facets:["*"],facetFilters:[a([],x.map((function(e){return"place:".concat(e)})),!0),a([],S.map((function(e){return"region:".concat(e)})),!0),a([],M.map((function(e){return"area:".concat(e)})),!0),a([],I.map((function(e){return"selsovet:".concat(e)})),!0)]}).then((function(e){var t=e.hits,n=e.facets;L.length>1&&d(t),h(n)}))}),[L.length,x.length,S.length,M.length,I.length]),r.default.createElement(r.default.Fragment,null,r.default.createElement("div",{className:"filter-panel"},r.default.createElement(c.DropDownComponent,{placeholder:"Округ",items:m&&m.region?Object.keys(m.region).sort().map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){O(e.map((function(e){return e.value})))}}),S.length?r.default.createElement(c.DropDownComponent,{placeholder:"Район",items:m&&m.area?Object.keys(m.area).sort().map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){P(e.map((function(e){return e.value})))}}):null,M.length?r.default.createElement(c.DropDownComponent,{placeholder:"Сельсовет",items:m&&m.selsovet?Object.keys(m.selsovet).sort().map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){N(e.map((function(e){return e.value})))}}):null,I.length?r.default.createElement(c.DropDownComponent,{placeholder:"Населенный пункт",items:m&&m.place?Object.keys(m.place).sort().map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){C(e.map((function(e){return e.value})))}}):null),r.default.createElement("input",{autoFocus:!0,onInput:function(e){var t=e.target;n(t.value)},onChange:function(e){27==e.which&&(n(""),d([]))},type:"text",value:t,id:"input"}),s.length?r.default.createElement(o.default,{hits:s,nbHits:_}):r.default.createElement(f.InitInfo,{facets:b,nbHits:_}))}},47:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0);t.default=function(e,t){var n=(0,a.useState)(e),l=n[0],r=n[1];return(0,a.useEffect)((function(){var n=setTimeout((function(){r(e)}),t);return function(){clearTimeout(n)}}),[e]),l}},48:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=a(n(0)),r=a(n(49)),u=a(n(80)),o=a(n(51));t.default=function(e){var t=e.hits;e.nbHits;return l.default.createElement(l.default.Fragment,null,t.length?l.default.createElement("table",{className:"table table-striped"},l.default.createElement("thead",null,l.default.createElement("tr",null,l.default.createElement("th",null,"ФИО"),l.default.createElement("th",null,"Нас.пункт"),l.default.createElement("th",null,"Всего душ"),l.default.createElement("th",null,"Мужчин"),l.default.createElement("th",null,"Женщин"),l.default.createElement("th",null,"Грамотных"),l.default.createElement("th",null,"Отсутствует более месяца"),l.default.createElement("th",null,"Нацианальность"),l.default.createElement("th",null,"год"),l.default.createElement("th",null,"Заметки"))),l.default.createElement("tbody",{id:"list-of-res"},t.sort((function(e,t){return e.fio.localeCompare(t.fio)})).map((function(e,t){var n,a=e.place,c=e.year,f=e.total,i=e.notes,s=e.male,d=e.female,p=e.literate,m=e.absent,h=e.nationality,v=e.region,b=e.selsovet,g=e.area,E=e._highlightResult,_="".concat(b," сельсовет, ").concat(g," район, ").concat(v," округ");return l.default.createElement("tr",{key:t},l.default.createElement("td",{className:"born-name-tr",dangerouslySetInnerHTML:{__html:null===(n=null==E?void 0:E.fio)||void 0===n?void 0:n.value}}),l.default.createElement("td",{className:"td-place-location"},l.default.createElement(u.default,{placement:"right",overlay:l.default.createElement(o.default,{id:"tooltip-rigth"},_)},l.default.createElement("span",null,l.default.createElement("span",null,a),l.default.createElement("svg",{id:"Layer_1","data-name":"Layer 1",style:{width:"2px",marginLeft:"5px"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 29.96 122.88"},l.default.createElement("path",{className:"cls-1",d:"M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"}))))),l.default.createElement("td",null,f),l.default.createElement("td",null,s),l.default.createElement("td",null,d),l.default.createElement("td",null,p),l.default.createElement("td",null,m),l.default.createElement("td",null,h),l.default.createElement("td",null,c),l.default.createElement("td",{className:"note-info"},i?l.default.createElement(u.default,{placement:"left",overlay:l.default.createElement(o.default,{id:"tooltip-left"},i)},l.default.createElement("img",{title:i,alt:i,src:r.default})):null))})))):null)}},49:function(e,t,n){"use strict";n.r(t),t.default=n.p+"c043de21b0daf5cdfe72b40ecf63245b.svg"},52:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DropDownComponent=void 0;var l=a(n(0)),r=a(n(81));t.DropDownComponent=function(e){var t=e.items,n=e.changeHandler,a=e.placeholder;return l.default.createElement(r.default,{placeholder:a,isMulti:!0,name:"colors",options:t,className:"basic-multi-select",classNamePrefix:"select",onChange:n})}},78:function(e,t,n){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.InitInfo=void 0;var l=a(n(0));t.InitInfo=function(e){var t=e.nbHits,n=e.facets;return l.default.createElement("div",{className:"alert alert-dark",role:"alert"},"Всего в базе:",l.default.createElement("br",null),"Персон - ",t,l.default.createElement("br",null),"Деревень - ",n&&n.place?Object.keys(n.place).length:0,l.default.createElement("br",null),"Сельсоветов - ",n&&n.selsovet?Object.keys(n.selsovet).length:0)}}});