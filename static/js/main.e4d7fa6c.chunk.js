(this.webpackJsonpinvestor=this.webpackJsonpinvestor||[]).push([[0],{79:function(e,t,c){},89:function(e,t,c){"use strict";c.r(t);var r=c(7),n=c.n(r),a=c(46),i=c.n(a),s=(c(79),c(16)),o=c(63),u=c(71),l=c(100),j=c(14),d=c(27),b=c(18),O=c(0),f=c.n(O),p=c(3),x=c(101),h=c(4),k=Object(x.a)((function(e){return{searchListContainer:{maxWidth:"500px"},searchList:{listStyle:"none",padding:"0",margin:"0"},addButton:{border:"none","&:hover":{color:"#fff",backgroundColor:"#222"}}}}));var v=function(e){var t=k();return Object(h.jsx)("div",{className:t.searchListContainer,children:Object(h.jsx)("ul",{className:t.searchList,children:e.searchResult.map((function(c){return Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:function(t){return e.submitTicker(t,c.ticker)},className:t.addButton,children:c.descr})},c.ticker+c.classcode)}))})})},m=c(2),y=c(15),T="TICKERS::ADD_FILTERED_TICKERS",g="TICKERS::ADD_TICKER_WITH_SAGA",D=function(e,t,c){return+t&&+c?"https://api.bcs.ru/udfdatafeed/v1/history?symbol=".concat(e,"&resolution=d&from=").concat(Math.round(+new Date(t)/1e3),"&to=").concat(Math.round(+new Date(c)/1e3)):"https://api.bcs.ru/udfdatafeed/v1/history?symbol=".concat(e,"&resolution=d&from=").concat(Math.round(+new Date/1e3),"&to=").concat(Math.round(+new Date/1e3))},C=function(e,t,c,r){for(var n=+new Date(t);5!==new Date(n).getDay();)n+=864e5;var a=D(e,n,n+828e5),i=function(e){return"https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=".concat(e)}(e),s="";"rur"===r?s="":"usd"===r?s="RUR":"eur"===r&&(s="EUR_RUB");var o=D(s,n,n+828e5),u=1;return fetch(o).then((function(e){return e.json()})).then((function(t){return u="unknown_symbol"===t.errmsg?1:t.c[0],fetch(a).then((function(e){return e.json()})).then((function(t){if("no_data"===t.s)throw new Error("\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445");return fetch(i).then((function(e){return e.json()})).then((function(a){var i="bonds"!==a.type?t.c[0]:10*t.c[0],s="bonds"!==a.type?t.c[0]*c:t.c[0]*c*10,o="bonds"!==a.type?t.c[0]*u:t.c[0]*u*10,l="bonds"!==a.type?t.c[0]*u*c:t.c[0]*u*c*10;if(isNaN(t.c[0]))throw new Error("\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445");return function(e,t,c,r,n,a,i,s,o,u){return{type:g,ticker:e,description:t,date:c,quantity:r,cost:n,total:a,roubleCost:i,roubleTotal:s,currency:o,tickerType:u}}(e,a.description,new Date(n).toISOString().slice(0,10),c,i.toFixed(2),s.toFixed(2),o.toFixed(2),l.toFixed(2),r,a.type)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))},w=function(){var e=Object(p.a)(f.a.mark((function e(t,c){var r,n,a,i,s,o,u,l,j,d,b,O,p,x,h,k,v,T,g;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=D("RUR",null,null),n=D("EUR_RUB",null,null),e.next=4,fetch(r);case 4:return a=e.sent,e.next=7,a.json();case 7:return i=e.sent,s=i.c[0],e.next=11,fetch(n);case 11:return o=e.sent,e.next=14,o.json();case 14:u=e.sent,l=u.c[0],h={},e.t0=f.a.keys(t);case 18:if((e.t1=e.t0()).done){e.next=32;break}return k=e.t1.value,v=D(k,null,null),e.next=23,fetch(v);case 23:return T=e.sent,e.next=26,T.json();case 26:g=e.sent,"rur"===t[k].currency?(j=g.c[0],d=j*t[k].quantity,O=(b=j/s)*t[k].quantity,x=(p=j/l)*t[k].quantity):"usd"===t[k].currency?(b=g.c[0],O=b*t[k].quantity,d=(j=b*s)*t[k].quantity,x=(p=j/l)*t[k].quantity):"eur"===t[k].currency&&(p=g.c[0],x=p*t[k].quantity,d=(j=p*l)*t[k].quantity,O=(b=j/s)*t[k].quantity),"bonds"===c&&(j*=10,d*=10,b*=10,O*=10,p*=10,x*=10),h=Object(y.a)(Object(y.a)({},h),{},Object(m.a)({},k,{quantity:t[k].quantity,RUBCost:j.toFixed(2),RUBTotal:d.toFixed(2),USDCost:b.toFixed(2),USDTotal:O.toFixed(2),EURCost:p.toFixed(2),EURTotal:x.toFixed(2),currency:t[k].currency,description:t[k].description})),e.next=18;break;case 32:return e.abrupt("return",h);case 33:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),S=function(){for(var e=0,t=0,c=0,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return n.forEach((function(r){Object.values(r).forEach((function(r){e+=+r.RUBTotal,t+=+r.USDTotal,c+=+r.EURTotal}))})),{RUBGrandTotal:e.toFixed(1),USDGrandTotal:t.toFixed(1),EURGrandTotal:c.toFixed(1)}},E=function(e,t,c){var r={};return Object.keys(e).forEach((function(n){var a=Object.keys(e[n]);r=Object(y.a)(Object(y.a)({},r),{},Object(m.a)({},n,{})),a.forEach((function(a){var i=Object.keys(e[n][a].data);r=Object(y.a)(Object(y.a)({},r),{},Object(m.a)({},n,Object(y.a)(Object(y.a)({},r[n]),{},Object(m.a)({},a,{data:{}})))),i.filter((function(e){return new Date(e).getMonth()===c&&new Date(e).getFullYear()===t})).forEach((function(t){r=Object(y.a)(Object(y.a)({},r),{},Object(m.a)({},n,Object(y.a)(Object(y.a)({},r[n]),{},Object(m.a)({},a,{data:Object(y.a)(Object(y.a)({},r[n][a].data),{},Object(m.a)({},t,e[n][a].data[t]))}))))}))}))})),{type:T,filteredTickers:r}},U=Object(x.a)((function(e){return{form:{maxWidth:"400px",border:"1px solid black",borderRadius:"10px",display:"flex",flexDirection:"column",margin:"10px"},formSubmit:{display:"block"},searchItem:{margin:"5px 10px",marginBottom:"5px"}}}));var I=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),i=Object(j.a)(a,2),o=i[0],u=i[1],l=Object(r.useState)(""),d=Object(j.a)(l,2),b=d[0],O=d[1],x=Object(r.useState)(""),k=Object(j.a)(x,2),m=k[0],y=k[1],T=Object(r.useState)([]),g=Object(j.a)(T,2),D=g[0],w=g[1],S=Object(r.useState)("rur"),E=Object(j.a)(S,2),I=E[0],R=E[1],N=Object(s.b)(),_=function(){var e=Object(p.a)(f.a.mark((function e(t){var r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),w([]),e.next=4,C(c,b,o,I);case 4:(r=e.sent)&&N(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),F=U();return Object(h.jsxs)("form",{action:"",onSubmit:_,className:F.form,label:"Ticker",children:[Object(h.jsx)("input",{type:"text",disabled:!0,className:F.searchItem,value:c,onChange:function(e){n(e.target.value)},required:!0}),Object(h.jsxs)("select",{required:!0,onChange:function(e){R(e.target.value)},className:F.searchItem,children:[Object(h.jsx)("option",{value:"rur",children:"rur"}),Object(h.jsx)("option",{value:"usd",children:"usd"}),Object(h.jsx)("option",{value:"eur",children:"eur"})]}),Object(h.jsx)("input",{type:"number",className:F.searchItem,value:o,onChange:function(e){u(e.target.value)},required:!0}),Object(h.jsx)("input",{type:"date",className:F.searchItem,value:b,onChange:function(e){O(e.target.value)},required:!0}),Object(h.jsx)("input",{type:"submit",className:F.formSubmit+" "+F.searchItem,value:"Add"}),Object(h.jsx)("input",{type:"text",className:F.searchItem,value:m,onChange:function(e){y(e.target.value);var t,c=(t=e.target.value,"https://api.bcs.ru/udfdatafeed/v1/search?query=".concat(t,"&limit=10&fulldescription=on"));fetch(c).then((function(e){return e.json()})).then((function(e){var t=[];e.forEach((function(e,c){t.push({ticker:e.symbol,descr:e.description,classcode:e.classcode})})),w(t)})).catch((function(e){console.log(e)}))}}),Object(h.jsx)(v,{className:F.searchItem,searchResult:D,submitTicker:function(e,t){e.preventDefault(),n(t)}})]})},R="TICKERS::DEL_TICKER_WITH_SAGA",N=function(e,t){return{type:R,ticker:e,marketType:t}},_=Object(x.a)((function(e){return{table:{maxWidth:"100%"},ticker:{display:"flex",flexDirection:"row",border:"1px solid black",margin:"10px",overflow:"auto"},tickerName:{display:"flex",flexDirection:"column",width:"110px",alignItems:"center",justifyContent:"space-around",padding:"5px",flexShrink:"0"},tickerTable:{display:"flex",flexDirection:"row"},tickerDate:{display:"flex",flexDirection:"column",borderLeft:"1px solid black","&:last-child":{borderRight:"1px solid black"}},tickerDateCell:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}}}}));var F=function(e){var t=Object(s.b)(),c=_(),r=Object.keys(e.filteredTickers||{});return Object(h.jsx)("div",{children:Object(h.jsx)("div",{className:c.table,children:r.map((function(r){return 0!==Object.keys(e.filteredTickers[r].data).length&&Object(h.jsxs)("div",{className:c.ticker,children:[Object(h.jsxs)("div",{className:c.tickerName,children:[Object(h.jsx)("p",{children:r}),Object(h.jsx)("p",{children:e.filteredTickers[r].data[Object.keys(e.filteredTickers[r].data)[Object.keys(e.filteredTickers[r].data).length-1]].description}),Object(h.jsx)("p",{children:e.filteredTickers[r].data[Object.keys(e.filteredTickers[r].data)[Object.keys(e.filteredTickers[r].data).length-1]].currency}),Object(h.jsx)("button",{onClick:function(){return function(e,c){t(N(e,c))}(r,e.type)},children:"del"})]}),Object(h.jsx)("div",{className:c.tickerTable,children:Object.keys(e.filteredTickers[r].data).map((function(t){return Object(h.jsxs)("div",{className:c.tickerDate,children:[Object(h.jsx)("p",{className:c.tickerDateCell,children:t}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.filteredTickers[r].data[t].quantity}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.filteredTickers[r].data[t].cost}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.filteredTickers[r].data[t].total}),"rur"!==e.filteredTickers[r].data[t].currency?Object(h.jsx)("p",{className:c.tickerDateCell,children:e.filteredTickers[r].data[t].roubleCost}):"","rur"!==e.filteredTickers[r].data[t].currency?Object(h.jsx)("p",{className:c.tickerDateCell,children:e.filteredTickers[r].data[t].roubleTotal}):""]},e.filteredTickers[r].data[t].ticker+t)}))})]},r)}))})})},A="USER::INIT_USER_DATA",q=function(e){return{type:A,userData:e}},L="USER::INIT_USER_DATA_WITH_SAGA",B=c(49),G=c(24),H=c(68),P=(Object(H.a)({apiKey:"AIzaSyAS0Sazo-Bbg-TouSxSrenj5hTYa5bnjN8",authDomain:"investor-8a0c2.firebaseapp.com",projectId:"investor-8a0c2",storageBucket:"investor-8a0c2.appspot.com",messagingSenderId:"949350207446",appId:"1:949350207446:web:c6cf85c9033c3ed2491e77"}),Object(B.b)()),K=Object(G.a)();function M(e){return e.userData[P.currentUser.uid]?e.userData[P.currentUser.uid].tickers:{}}function W(e){return e.filteredTickers?e.filteredTickers.stock:{}}function Y(e){return e.filteredTickers?e.filteredTickers.pif:{}}function $(e){return e.filteredTickers?e.filteredTickers.etf:{}}function z(e){return e.filteredTickers?e.filteredTickers.bonds:{}}function J(e){return e.filteredTickers?e.filteredTickers.forex:{}}var X=Object(x.a)((function(e){return{App:{margin:"0 auto"},mainContainer:{display:"flex",flexDirection:"column",backgroundColor:"#EEE"}}}));var V=function(){var e=Object(s.b)(),t=Object(s.c)(J),c=Object(s.c)(W),n=Object(s.c)(Y),a=Object(s.c)($),i=Object(s.c)(z),o=Object(s.c)(M),u=Object(r.useState)((new Date).toISOString().slice(0,7)),l=Object(j.a)(u,2),d=l[0],b=l[1];Object(r.useEffect)((function(){e({type:L})}),[]),Object(r.useEffect)((function(){e(E(o,new Date(d).getFullYear(),new Date(d).getMonth()))}),[d]);var O=X();return Object(h.jsxs)("div",{className:O.App+" "+O.mainContainer,children:[Object(h.jsx)("input",{type:"month",onChange:function(e){b(e.target.value)},value:d}),Object(h.jsx)(I,{}),Object(h.jsx)("div",{children:"\u0412\u0430\u043b\u044e\u0442\u0430"}),Object(h.jsx)(F,{filteredTickers:t,type:"forex"}),Object(h.jsx)("div",{children:"\u0410\u043a\u0446\u0438\u0438"}),Object(h.jsx)(F,{filteredTickers:c,type:"stock"}),Object(h.jsx)("div",{children:"\u0424\u043e\u043d\u0434\u044b"}),Object(h.jsx)(F,{filteredTickers:n,type:"pif"}),Object(h.jsx)(F,{filteredTickers:a,type:"etf"}),Object(h.jsx)("div",{children:"\u041e\u0431\u043b\u0438\u0433\u0430\u0446\u0438\u0438"}),Object(h.jsx)(F,{filteredTickers:i,type:"bonds"})]})},Q=c(55),Z="",ee=["authenticated"];function te(e){var t=e.authenticated,c=Object(Q.a)(e,ee);return t?Object(h.jsx)(b.b,Object(y.a)({},c)):Object(h.jsx)(b.a,{to:{pathname:"".concat(Z,"/login")}})}var ce=["authenticated"];function re(e){var t=e.authenticated,c=Object(Q.a)(e,ce);return t?Object(h.jsx)(b.a,{to:"".concat(Z,"/")}):Object(h.jsx)(b.b,Object(y.a)({},c))}var ne=c(38);var ae=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),i=Object(j.a)(a,2),s=i[0],o=i[1],u=Object(r.useState)(""),l=Object(j.a)(u,2),b=l[0],O=l[1],x=Object(r.useCallback)((function(e){o(e.target.value)}),[]),k=Object(r.useCallback)((function(e){n(e.target.value)}),[]),v=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),O(""),e.prev=2,e.next=5,Object(ne.a)(P,c,s);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),O(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:v,children:[Object(h.jsx)("p",{children:"Fill in the form below to register new account."}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Email",name:"email",type:"email",onChange:k,value:c})}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Password",name:"password",onChange:x,value:s,type:"password"})}),Object(h.jsxs)("div",{children:[b&&Object(h.jsx)("p",{children:b}),Object(h.jsx)("button",{type:"submit",children:"Login"})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("p",{children:["Already have an account? ",Object(h.jsx)(d.b,{to:"/gbCourse5Hw/login",children:"Sign in"})]})]})})};var ie=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),i=Object(j.a)(a,2),s=i[0],o=i[1],u=Object(r.useState)(""),l=Object(j.a)(u,2),b=l[0],O=l[1],x=function(){var e=Object(p.a)(f.a.mark((function e(t){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),O(""),e.prev=2,e.next=5,Object(ne.c)(P,c,s);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),O(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:x,children:[Object(h.jsx)("p",{children:"Fill in the form below to login to your account."}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Email",name:"email",type:"email",onChange:function(e){n(e.target.value)},value:c})}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Password",name:"password",onChange:function(e){o(e.target.value)},value:s,type:"password"})}),Object(h.jsxs)("div",{children:[b&&Object(h.jsx)("p",{children:b}),Object(h.jsx)("button",{type:"submit",children:"Login"})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("p",{children:["Don't have an account? ",Object(h.jsx)(d.b,{to:"/gbCourse5Hw/signup",children:"Sign up"})]})]})})};function se(e){return e.userData[P.currentUser.uid]?e.userData[P.currentUser.uid].portfolio:{}}function oe(e){return e.currentUserData?e.currentUserData.stock:{}}function ue(e){return e.currentUserData?e.currentUserData.pif:{}}function le(e){return e.currentUserData?e.currentUserData.etf:{}}function je(e){return e.currentUserData?e.currentUserData.bonds:{}}function de(e){return e.currentUserData?e.currentUserData.forex:{}}function be(e){return e.currentUserData?e.currentUserData.portfolioCost:{}}var Oe="PROFILE::SET_TICKERS_INFO",fe=function(e,t){return{type:Oe,tickerTable:e,tickerType:t}},pe="PROFILE::SET_TICKERS_INFO_WITH_SAGA",xe=function(e,t){return{type:pe,tickers:e,tickerType:t}},he=Object(x.a)((function(e){return{table:{maxWidth:"400px"},ticker:{display:"flex",flexDirection:"row",border:"1px solid black",margin:"10px"},tickerName:{display:"flex",flexDirection:"column",width:"110px",alignItems:"center",justifyContent:"space-around",padding:"5px",flexShrink:"0"},tickerTable:{display:"flex",flexDirection:"row"},tickerData:{display:"flex",flexDirection:"column",borderLeft:"1px solid black",flexGrow:"1"},tickerDataCell:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}},tickerHeaders:{display:"flex",flexDirection:"column",borderLeft:"1px solid black",flexGrow:"0"},tickerHeader:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}}}}));var ke=function(e){var t=Object(s.b)(),c=he(),r=Object.keys(e.tickers||{});return Object(h.jsx)("div",{children:Object(h.jsx)("div",{className:c.table,children:r.map((function(r){return Object(h.jsxs)("div",{className:c.ticker,children:[Object(h.jsxs)("div",{className:c.tickerName,children:[Object(h.jsx)("p",{children:r}),Object(h.jsx)("p",{children:e.tickers[r].description}),Object(h.jsx)("button",{onClick:function(){return function(e,c){t(N(e,c))}(r,e.type)},children:"del"})]}),Object(h.jsxs)("div",{className:c.tickerHeaders,children:[Object(h.jsx)("p",{className:c.tickerHeader,children:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e"}),Object(h.jsxs)("p",{className:c.tickerHeader,children:["\u0426\u0435\u043d\u0430,  ","rur"===e.currency&&Object(h.jsx)("span",{children:"\u20bd"})||"usd"===e.currency&&Object(h.jsx)("span",{children:"$"})||"eur"===e.currency&&Object(h.jsx)("span",{children:"\u20ac"})]}),Object(h.jsxs)("p",{className:c.tickerHeader,children:["\u0421\u0443\u043c\u043c\u0430,  ","rur"===e.currency&&Object(h.jsx)("span",{children:"\u20bd"})||"usd"===e.currency&&Object(h.jsx)("span",{children:"$"})||"eur"===e.currency&&Object(h.jsx)("span",{children:"\u20ac"})]})]}),Object(h.jsxs)("div",{className:c.tickerData,children:[Object(h.jsx)("p",{className:c.tickerDataCell,children:e.tickers[r].quantity}),Object(h.jsx)("p",{className:c.tickerDataCell,children:"rur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].RUBCost})||"usd"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].USDCost})||"eur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].EURCost})}),Object(h.jsx)("p",{className:c.tickerDataCell,children:"rur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].RUBTotal})||"usd"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].USDTotal})||"eur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].EURTotal})})]})]},r)}))})})},ve="PROFILE::CALCULATE_PORTFOLIO_COST",me=function(e){return{type:ve,portfolioCost:e}},ye="PROFILE::CALCULATE_PORTFOLIO_COST_WITH_SAGA",Te=Object(x.a)((function(e){return{App:{margin:"0 auto"},mainContainer:{display:"flex",flexDirection:"column",backgroundColor:"#EEE"}}}));var ge=function(){var e=Object(r.useState)("rur"),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(s.c)(se),i=a.stock,o=a.bonds,u=a.forex,l=a.pif,d=a.etf,b=Te(),O=Object(s.b)(),f=Object(s.c)(oe),p=Object(s.c)(ue),x=Object(s.c)(le),k=Object(s.c)(je),v=Object(s.c)(de),m=Object(s.c)(be);return Object(r.useEffect)((function(){O(xe(i,"stock")),O(xe(l,"pif")),O(xe(d,"etf")),O(xe(o,"bonds")),O(xe(u,"forex"))}),[]),Object(r.useEffect)((function(){O(function(e,t,c,r,n){return{type:ye,stock:e,pif:t,etf:c,bonds:r,forex:n}}(f,p,x,k,v))}),[f,p,k,v]),Object(h.jsxs)("div",{children:[Object(h.jsxs)("select",{required:!0,onChange:function(e){n(e.target.value)},className:b.searchItem,children:[Object(h.jsx)("option",{value:"rur",children:"rur"}),Object(h.jsx)("option",{value:"usd",children:"usd"}),Object(h.jsx)("option",{value:"eur",children:"eur"})]}),Object(h.jsx)("div",{children:"\u0412\u0430\u043b\u044e\u0442\u0430"}),Object(h.jsx)(ke,{tickers:v,type:"forex",currency:c}),Object(h.jsx)("div",{children:"\u0410\u043a\u0446\u0438\u0438"}),Object(h.jsx)(ke,{tickers:f,type:"stock",currency:c}),Object(h.jsx)("div",{children:"\u0424\u043e\u043d\u0434\u044b"}),Object(h.jsx)(ke,{tickers:p,type:"pif",currency:c}),Object(h.jsx)(ke,{tickers:x,type:"etf",currency:c}),Object(h.jsx)("div",{children:"\u041e\u0431\u043b\u0438\u0433\u0430\u0446\u0438\u0438"}),Object(h.jsx)(ke,{tickers:k,type:"bonds",currency:c}),Object(h.jsx)("h1",{children:P.currentUser?P.currentUser.email:""}),Object(h.jsxs)("p",{children:["\u20bd ",m?m.RUBGrandTotal:""]}),Object(h.jsxs)("p",{children:["$ ",m?m.USDGrandTotal:""]}),Object(h.jsxs)("p",{children:["\u20ac ",m?m.EURGrandTotal:""]})]})};var De=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),c=t[0],n=t[1];Object(r.useEffect)((function(){return Object(ne.b)(P,(function(e){e?(n(!0),console.log(P.currentUser.email)):n(!1)}))}),[]);var a=Object(r.useCallback)((function(){Object(ne.d)(P).then((function(){})).catch((function(e){}))}),[]);return Object(h.jsxs)(d.a,{children:[Object(h.jsxs)("header",{children:[Object(h.jsx)(d.b,{to:"".concat(Z,"/"),children:"Main"}),Object(h.jsx)(d.b,{to:"".concat(Z,"/profile"),children:"Profile"}),Object(h.jsx)(d.b,{to:"".concat(Z,"/signup"),children:"Registration"}),Object(h.jsx)(d.b,{to:"".concat(Z,"/login"),children:"Login"}),Object(h.jsx)("button",{onClick:a,children:"Sign Out"})]}),Object(h.jsxs)(b.d,{children:[Object(h.jsx)(te,{authenticated:c,exact:!0,path:"".concat(Z,"/"),children:Object(h.jsx)(V,{})}),Object(h.jsx)(te,{authenticated:c,exact:!0,path:"".concat(Z,"/profile"),children:Object(h.jsx)(ge,{})}),Object(h.jsx)(re,{authenticated:c,path:"".concat(Z,"/signup"),children:Object(h.jsx)(ae,{})}),Object(h.jsx)(re,{authenticated:c,path:"".concat(Z,"/login"),children:Object(h.jsx)(ie,{})}),Object(h.jsx)(b.b,{children:Object(h.jsx)("h4",{children:"404"})})]})]})},Ce=c(31),we=c(72),Se=c(60),Ee=c(70),Ue=c.n(Ee),Ie={userData:{},currentUserData:{},filteredTickers:{}},Re=c(39),Ne="TICKERS::AUTOCOMPLETE_TICKER_WITH_SAGA",_e=c(30),Fe=f.a.mark((function e(t){var c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(_e.a)(S,t.stock,t.pif,t.etf,t.bonds,t.forex);case 3:return c=e.sent,e.next=6,Object(_e.b)(me(c));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),Ae=f.a.mark((function e(t){var c,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(G.c)(K,"".concat(P.currentUser.uid,"/tickers/").concat(t.tickerType,"/").concat(t.ticker,"/data/").concat(t.date));case 3:return c=e.sent,e.next=6,Object(G.e)(c,{ticker:t.ticker,description:t.description,quantity:t.quantity,cost:t.cost,total:t.total,roubleCost:t.roubleCost,roubleTotal:t.roubleTotal,currency:t.currency});case 6:return e.next=8,Object(G.c)(K,"".concat(P.currentUser.uid,"/portfolio/").concat(t.tickerType,"/").concat(t.ticker,"/"));case 8:return r=e.sent,e.next=11,Object(G.e)(r,{ticker:t.ticker,quantity:t.quantity,currency:t.currency,description:t.description});case 11:return e.next=13,Object(_e.b)((n=t.ticker,a=t.date,i=t.quantity,s=t.currency,{type:Ne,ticker:n,date:a,quantity:i,currency:s}));case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log(e.t0);case 18:case 19:case"end":return e.stop()}var n,a,i,s}),e,null,[[0,15]])})),qe=f.a.mark((function e(t){var c,r;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(G.c)(K,"".concat(P.currentUser.uid,"/portfolio/").concat(t.marketType,"/").concat(t.ticker));case 3:return c=e.sent,e.next=6,Object(G.d)(c);case 6:return e.next=8,Object(G.c)(K,"".concat(P.currentUser.uid,"/tickers/").concat(t.marketType,"/").concat(t.ticker));case 8:return r=e.sent,e.next=11,Object(G.d)(r);case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case 17:case"end":return e.stop()}}),e,null,[[0,13]])})),Le=f.a.mark((function e(t){var c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!(+new Date(t.date)<+new Date-6048e5)){e.next=7;break}return e.next=4,Object(_e.a)(C,t.ticker,new Date(+new Date(t.date)+6048e5),t.quantity,t.currency);case 4:return c=e.sent,e.next=7,Object(_e.b)(c);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case 13:case"end":return e.stop()}}),e,null,[[0,9]])})),Be=f.a.mark((function e(t){var c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(_e.a)(w,t.tickers,t.tickerType);case 3:return c=e.sent,e.next=6,Object(_e.b)(fe(c,t.tickerType));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),Ge=f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(G.c)(K);case 3:return t=e.sent,e.next=6,Object(G.b)(t,(function(e){var t=e.val();ct.dispatch(q(t||{}))}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})),He=f.a.mark(Pe);function Pe(){return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Re.b)(L,Ge);case 2:return e.next=4,Object(Re.a)(g,Ae);case 4:return e.next=6,Object(Re.b)(R,qe);case 6:return e.next=8,Object(Re.a)(Ne,Le);case 8:return e.next=10,Object(Re.a)(pe,Be);case 10:return e.next=12,Object(Re.b)(ye,Fe);case 12:case"end":return e.stop()}}),He)}var Ke=Pe,Me=Ie.userData;var We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Me,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return Object(y.a)({},t.userData);default:return e}},Ye=Ie.currentUserData;var $e=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ye,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case Oe:return Object(y.a)(Object(y.a)({},e),{},Object(m.a)({},t.tickerType,t.tickerTable));case ve:return Object(y.a)(Object(y.a)({},e),{},{portfolioCost:t.portfolioCost});default:return e}},ze=Ie.filteredTickers;var Je=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ze,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case T:return Object(y.a)({},t.filteredTickers);default:return e}},Xe=Object(Ce.b)({userData:We,currentUserData:$e,filteredTickers:Je}),Ve={onError:function(e,t){console.log("qqq"+e),console.log(t)}},Qe=Object(we.a)(Ve),Ze=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Ce.c,et={key:"root",storage:Ue.a},tt=Object(Se.a)(et,Xe),ct=Object(Ce.d)(tt,Ie,Ze(Object(Ce.a)(Qe)));Qe.run(Ke);var rt=Object(Se.b)(ct),nt=Object(u.a)({palette:{primary:{main:"#708238"},secondary:{main:"#0098FF"}}});var at=function(){return Object(h.jsx)(s.a,{store:ct,children:Object(h.jsx)(o.a,{persistor:rt,children:Object(h.jsx)(l.a,{theme:nt,children:Object(h.jsx)(De,{})})})})},it=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,102)).then((function(t){var c=t.getCLS,r=t.getFID,n=t.getFCP,a=t.getLCP,i=t.getTTFB;c(e),r(e),n(e),a(e),i(e)}))};i.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(at,{})}),document.getElementById("root")),it()}},[[89,1,2]]]);
//# sourceMappingURL=main.e4d7fa6c.chunk.js.map