!function(e){function t(t){for(var l,r,o=t[0],c=t[1],f=t[2],d=0,s=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&s.push(a[r][0]),a[r]=0;for(l in c)Object.prototype.hasOwnProperty.call(c,l)&&(e[l]=c[l]);for(i&&i(t);s.length;)s.shift()();return u.push.apply(u,f||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],l=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(l=!1)}l&&(u.splice(t--,1),e=r(r.s=n[0]))}return e}var l={},a={0:0},u=[];function r(t){if(l[t])return l[t].exports;var n=l[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=l,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)r.d(n,l,function(t){return e[t]}.bind(null,l));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="";var o=window.webpackJsonp=window.webpackJsonp||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var f=0;f<o.length;f++)t(o[f]);var i=c;u.push([10,1]),n()}([,,,,,function(e,t,n){"use strict";n.r(t),t.default=n.p+"6bf7218d9613f3b06b50745912c1826e.svg"},,,,,function(e,t,n){"use strict";var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(2)),u=l(n(0)),r=l(n(15)),o=document.getElementById("root");a.default.render(u.default.createElement(r.default,null),o)},,,,,function(e,t,n){"use strict";var l=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var l,a=0,u=t.length;a<u;a++)!l&&a in t||(l||(l=Array.prototype.slice.call(t,0,a)),l[a]=t[a]);return e.concat(l||Array.prototype.slice.call(t))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=a(n(0)),r=a(n(16)),o=a(n(17)),c=a(n(5)),f=n(18),i=n(44)("01JC38SN9L","01512440bd68def643774e45cdeea15c");t.default=function(){var e=u.default.useState(""),t=e[0],n=e[1],a=u.default.useState([]),d=a[0],s=a[1],p=u.default.useState({}),m=p[0],h=p[1],v=u.default.useState(0),b=v[0],g=v[1],E=u.default.useState([]),y=E[0],_=E[1],O=u.default.useState([]),j=O[0],S=O[1],w=u.default.useState([]),D=w[0],M=w[1],P=u.default.useState([]),C=P[0],H=P[1],x=u.default.useState(i.initIndex("census")),k=x[0],N=(x[1],(0,r.default)(t,1e3));return u.default.useEffect((function(){k.search("",{hitsPerPage:0,facets:["*"]}).then((function(e){var t=e.facets,n=e.nbHits;h(t),g(n)}))}),[]),u.default.useEffect((function(){N&&k.search(N,{facetFilters:[l([],C.map((function(e){return"place:".concat(e)})),!0),l([],y.map((function(e){return"region:".concat(e)})),!0),l([],j.map((function(e){return"area:".concat(e)})),!0),l([],D.map((function(e){return"selsovet:".concat(e)})),!0)]}).then((function(e){var t=e.hits;e.facets;s(t)}))}),[N,C]),u.default.createElement(u.default.Fragment,null,u.default.createElement("div",{className:"info-main-icon"},u.default.createElement("img",{src:c.default,alt:"Всего в базе записей - ".concat(b),title:"Всего в базе записей - ".concat(b),"data-bs-toggle":"tooltip"})),u.default.createElement(f.DropDownComponent,{placeholder:"Округ",items:m&&m.region?Object.keys(m.region).map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){_(e.map((function(e){return e.value})))}}),y.length?u.default.createElement(f.DropDownComponent,{placeholder:"Район",items:m&&m.area?Object.keys(m.area).map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){S(e.map((function(e){return e.value})))}}):null,j.length?u.default.createElement(f.DropDownComponent,{placeholder:"Сельсовет",items:m&&m.selsovet?Object.keys(m.selsovet).map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){M(e.map((function(e){return e.value})))}}):null,D.length?u.default.createElement(f.DropDownComponent,{placeholder:"Населенный пункт",items:m&&m.place?Object.keys(m.place).map((function(e){return{value:e,label:e}})):[],changeHandler:function(e){H(e.map((function(e){return e.value})))}}):null,u.default.createElement("input",{autoFocus:!0,onInput:function(e){var t=e.target;n(t.value)},onChange:function(e){27==e.which&&(n(""),s([]))},type:"text",value:t,id:"input"}),u.default.createElement(o.default,{hits:d,nbHits:b}))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n(0);t.default=function(e,t){var n=(0,l.useState)(e),a=n[0],u=n[1];return(0,l.useEffect)((function(){var n=setTimeout((function(){u(e)}),t);return function(){clearTimeout(n)}}),[e]),a}},function(e,t,n){"use strict";var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(0)),u=l(n(5));t.default=function(e){var t=e.hits,n=e.nbHits;return a.default.useEffect((function(){[].forEach.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'),(function(e){return new bootstrap.Tooltip(e)}))}),[t.length,n]),a.default.createElement(a.default.Fragment,null,t.length?a.default.createElement("table",{className:"table table-striped"},a.default.createElement("thead",null,a.default.createElement("tr",null,a.default.createElement("th",null,"ФИО"),a.default.createElement("th",null,"Нацианальность"),a.default.createElement("th",null,"Всего душ"),a.default.createElement("th",null,"Мужчин"),a.default.createElement("th",null,"Женщин"),a.default.createElement("th",null,"Грамотных"),a.default.createElement("th",null,"Отсутствует более месяца"),a.default.createElement("th",null,"Нас.пункт"),a.default.createElement("th",null,"год"),a.default.createElement("th",null,"Заметки"))),a.default.createElement("tbody",{id:"list-of-res"},t.map((function(e,t){var n,l=e.place,r=e.year,o=e.total,c=e.notes,f=e.male,i=e.female,d=e.literate,s=e.absent,p=e.nationality,m=e._highlightResult;return a.default.createElement("tr",{key:t},a.default.createElement("td",{className:"born-name-tr",dangerouslySetInnerHTML:{__html:null===(n=null==m?void 0:m.fio)||void 0===n?void 0:n.value}}),a.default.createElement("td",null,p),a.default.createElement("td",null,o),a.default.createElement("td",null,f),a.default.createElement("td",null,i),a.default.createElement("td",null,d),a.default.createElement("td",null,s),a.default.createElement("td",null,l),a.default.createElement("td",null,r),a.default.createElement("td",{className:"note-info"},c?a.default.createElement("img",{src:u.default,alt:c,title:c,"data-bs-toggle":"tooltip"}):null))})))):null)}},function(e,t,n){"use strict";var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.DropDownComponent=void 0;var a=l(n(0)),u=l(n(45));t.DropDownComponent=function(e){var t=e.items,n=e.changeHandler,l=e.placeholder;return a.default.createElement(u.default,{placeholder:l,isMulti:!0,name:"colors",options:t,className:"basic-multi-select",classNamePrefix:"select",onChange:n})}}]);