(this.webpackJsonpinvestor=this.webpackJsonpinvestor||[]).push([[0],{79:function(e,t,c){},89:function(e,t,c){"use strict";c.r(t);var r=c(7),n=c.n(r),a=c(46),s=c.n(a),i=(c(79),c(16)),o=c(63),u=c(71),l=c(100),j=c(14),d=c(27),b=c(17),p=c(0),O=c.n(p),x=c(3),f=c(101),h=c(5),k=Object(f.a)((function(e){return{searchListContainer:{maxWidth:"500px"},searchList:{listStyle:"none",padding:"0",margin:"0"},addButton:{border:"none","&:hover":{color:"#fff",backgroundColor:"#222"}}}}));var v=function(e){var t=k();return Object(h.jsx)("div",{className:t.searchListContainer,children:Object(h.jsx)("ul",{className:t.searchList,children:e.searchResult.map((function(c){return Object(h.jsx)("li",{children:Object(h.jsx)("button",{onClick:function(t){return e.submitTicker(t,c.ticker)},className:t.addButton,children:c.descr})},c.ticker+c.classcode)}))})})},m=c(2),y=c(22),g="TICKERS::ADD_TICKER_WITH_SAGA",D=function(e,t,c,r){var n="https://api.bcs.ru/udfdatafeed/v1/history?symbol=".concat(e,"&resolution=d&from=").concat(+new Date(t)/1e3,"&to=").concat((+new Date(t)+828e5)/1e3),a="https://api.bcs.ru/udfdatafeed/v1/symbols?symbol=".concat(e),s="";"rur"===r?s="":"usd"===r?s="RUR":"eur"===r&&(s="EUR_RUB");var i="https://api.bcs.ru/udfdatafeed/v1/history?symbol=".concat(s,"&resolution=d&from=").concat(+new Date(t)/1e3,"&to=").concat((+new Date(t)+828e5)/1e3),o=1;return fetch(i).then((function(e){return e.json()})).then((function(s){return o="unknown_symbol"===s.errmsg?1:s.c[0],fetch(n).then((function(e){return e.json()})).then((function(n){return fetch(a).then((function(e){return e.json()})).then((function(a){var s="bonds"!==a.type?n.c[0]:10*n.c[0],i="bonds"!==a.type?n.c[0]*c:n.c[0]*c*10,u="bonds"!==a.type?n.c[0]*o:n.c[0]*o*10,l="bonds"!==a.type?n.c[0]*o*c:n.c[0]*o*c*10;if(isNaN(n.c[0]))throw new Error("\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445");return function(e,t,c,r,n,a,s,i,o,u){return{type:g,ticker:e,description:t,date:c,quantity:r,cost:n,total:a,roubleCost:s,roubleTotal:i,currency:o,tickerType:u}}(e,a.description,new Date(t).toISOString().slice(0,10),c,s.toFixed(2),i.toFixed(2),u.toFixed(2),l.toFixed(2),r,a.type)})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))},C=function(){var e=Object(x.a)(O.a.mark((function e(t,c){var r,n,a,s,i,o,u,l,j,d,b,p,x,f,h,k,v,g,D;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r="https://api.bcs.ru/udfdatafeed/v1/history?symbol=RUR&resolution=d&from=".concat(Math.round(+new Date/1e3),"&to=").concat(Math.round(+new Date/1e3)),n="https://api.bcs.ru/udfdatafeed/v1/history?symbol=EUR_RUB&resolution=d&from=".concat(Math.round(+new Date/1e3),"&to=").concat(Math.round(+new Date/1e3)),e.next=4,fetch(r);case 4:return a=e.sent,e.next=7,a.json();case 7:return s=e.sent,i=s.c[0],e.next=11,fetch(n);case 11:return o=e.sent,e.next=14,o.json();case 14:u=e.sent,l=u.c[0],h={},e.t0=O.a.keys(t);case 18:if((e.t1=e.t0()).done){e.next=32;break}return k=e.t1.value,v="https://api.bcs.ru/udfdatafeed/v1/history?symbol=".concat(k,"&resolution=d&from=").concat(Math.round(+new Date/1e3),"&to=").concat(Math.round(+new Date/1e3)),e.next=23,fetch(v);case 23:return g=e.sent,e.next=26,g.json();case 26:D=e.sent,"rur"===t[k].currency?(j=D.c[0],d=j*t[k].quantity,p=(b=j/i)*t[k].quantity,f=(x=j/l)*t[k].quantity):"usd"===t[k].currency?(b=D.c[0],p=b*t[k].quantity,d=(j=b*i)*t[k].quantity,f=(x=j/l)*t[k].quantity):"eur"===t[k].currency&&(x=D.c[0],f=x*t[k].quantity,d=(j=x*l)*t[k].quantity,p=(b=j/i)*t[k].quantity),"bonds"===c&&(j*=10,d*=10,b*=10,p*=10,x*=10,f*=10),h=Object(y.a)(Object(y.a)({},h),{},Object(m.a)({},k,{quantity:t[k].quantity,RUBCost:j.toFixed(2),RUBTotal:d.toFixed(2),USDCost:b.toFixed(2),USDTotal:p.toFixed(2),EURCost:x.toFixed(2),EURTotal:f.toFixed(2),currency:t[k].currency,description:t[k].description})),e.next=18;break;case 32:return e.abrupt("return",h);case 33:case"end":return e.stop()}}),e)})));return function(t,c){return e.apply(this,arguments)}}(),T=function(){for(var e=0,t=0,c=0,r=arguments.length,n=new Array(r),a=0;a<r;a++)n[a]=arguments[a];return console.log(n),n.forEach((function(r){Object.values(r).forEach((function(r){e+=+r.RUBTotal,t+=+r.USDTotal,c+=+r.EURTotal}))})),{RUBGrandTotal:e.toFixed(1),USDGrandTotal:t.toFixed(1),EURGrandTotal:c.toFixed(1)}},U=Object(f.a)((function(e){return{form:{maxWidth:"400px",border:"1px solid black",borderRadius:"10px",display:"flex",flexDirection:"column",margin:"10px"},formSubmit:{display:"block"},searchItem:{margin:"5px 10px",marginBottom:"5px"}}}));var w=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),s=Object(j.a)(a,2),o=s[0],u=s[1],l=Object(r.useState)(""),d=Object(j.a)(l,2),b=d[0],p=d[1],f=Object(r.useState)(""),k=Object(j.a)(f,2),m=k[0],y=k[1],g=Object(r.useState)([]),C=Object(j.a)(g,2),T=C[0],w=C[1],S=Object(r.useState)("rur"),E=Object(j.a)(S,2),N=E[0],R=E[1],I=Object(i.b)(),_=function(){var e=Object(x.a)(O.a.mark((function e(t){var r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),w([]),e.next=4,D(c,b,o,N);case 4:(r=e.sent)&&I(r);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),q=U();return Object(h.jsxs)("form",{action:"",onSubmit:_,className:q.form,label:"Ticker",children:[Object(h.jsx)("input",{type:"text",disabled:!0,className:q.searchItem,value:c,onChange:function(e){n(e.target.value)},required:!0}),Object(h.jsxs)("select",{required:!0,onChange:function(e){R(e.target.value)},className:q.searchItem,children:[Object(h.jsx)("option",{value:"rur",children:"rur"}),Object(h.jsx)("option",{value:"usd",children:"usd"}),Object(h.jsx)("option",{value:"eur",children:"eur"})]}),Object(h.jsx)("input",{type:"number",className:q.searchItem,value:o,onChange:function(e){u(e.target.value)},required:!0}),Object(h.jsx)("input",{type:"date",className:q.searchItem,value:b,onChange:function(e){p(e.target.value)},required:!0}),Object(h.jsx)("input",{type:"submit",className:q.formSubmit+" "+q.searchItem,value:"Add"}),Object(h.jsx)("input",{type:"text",className:q.searchItem,value:m,onChange:function(e){y(e.target.value);var t="https://api.bcs.ru/udfdatafeed/v1/search?query=".concat(e.target.value,"&limit=10");fetch(t).then((function(e){return e.json()})).then((function(e){var t=[];e.forEach((function(e,c){t.push({ticker:e.symbol,descr:e.description,classcode:e.classcode})})),w(t)})).catch((function(e){console.log(e)}))}}),Object(h.jsx)(v,{className:q.searchItem,searchResult:T,submitTicker:function(e,t){e.preventDefault(),n(t)}})]})},S="TICKERS::DEL_TICKER_WITH_SAGA",E=function(e,t){return{type:S,ticker:e,marketType:t}},N="TICKERS::AUTOCOMPLETE_TICKER_WITH_SAGA",R=Object(f.a)((function(e){return{table:{maxWidth:"100%"},ticker:{display:"flex",flexDirection:"row",border:"1px solid black",margin:"10px",overflow:"auto"},tickerName:{display:"flex",flexDirection:"column",width:"110px",alignItems:"center",justifyContent:"space-around",padding:"5px",flexShrink:"0"},tickerTable:{display:"flex",flexDirection:"row"},tickerDate:{display:"flex",flexDirection:"column",borderLeft:"1px solid black","&:last-child":{borderRight:"1px solid black"}},tickerDateCell:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}}}}));var I=function(e){var t=Object(i.b)(),c=R(),n=Object.keys(e.tickers||{});return Object(r.useEffect)((function(){n.forEach((function(c,r){var n=Object.keys(e.tickers[c].data)[Object.keys(e.tickers[c].data).length-1];+new Date(n)<+new Date-6048e5&&t(function(e,t,c,r){return{type:N,ticker:e,date:t,quantity:c,currency:r}}(c,new Date(+new Date(n)+6048e5),e.tickers[c].data[n].quantity,e.tickers[c].data[n].currency))}))}),[e.tickers]),Object(h.jsx)("div",{children:Object(h.jsx)("div",{className:c.table,children:n.map((function(r){return Object(h.jsxs)("div",{className:c.ticker,children:[Object(h.jsxs)("div",{className:c.tickerName,children:[Object(h.jsx)("p",{children:r}),Object(h.jsx)("p",{children:e.tickers[r].data[Object.keys(e.tickers[r].data)[Object.keys(e.tickers[r].data).length-1]].description}),Object(h.jsx)("button",{onClick:function(){return function(e,c){t(E(e,c))}(r,e.type)},children:"del"})]}),Object(h.jsx)("div",{className:c.tickerTable,children:Object.keys(e.tickers[r].data).map((function(t){return Object(h.jsxs)("div",{className:c.tickerDate,children:[Object(h.jsx)("p",{className:c.tickerDateCell,children:t}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.tickers[r].data[t].quantity}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.tickers[r].data[t].cost}),Object(h.jsx)("p",{className:c.tickerDateCell,children:e.tickers[r].data[t].total}),"rur"!==e.tickers[r].data[t].currency?Object(h.jsx)("p",{className:c.tickerDateCell,children:e.tickers[r].data[t].roubleCost}):"","rur"!==e.tickers[r].data[t].currency?Object(h.jsx)("p",{className:c.tickerDateCell,children:e.tickers[r].data[t].roubleTotal}):""]},e.tickers[r].data[t].ticker+t)}))})]},r)}))})})},_="USER::INIT_USER_DATA",q=function(e){return{type:_,userData:e}},A="USER::INIT_USER_DATA_WITH_SAGA",F=c(49),L=c(24),B=c(68),G=(Object(B.a)({apiKey:"AIzaSyAS0Sazo-Bbg-TouSxSrenj5hTYa5bnjN8",authDomain:"investor-8a0c2.firebaseapp.com",projectId:"investor-8a0c2",storageBucket:"investor-8a0c2.appspot.com",messagingSenderId:"949350207446",appId:"1:949350207446:web:c6cf85c9033c3ed2491e77"}),Object(F.b)()),H=Object(L.a)();function P(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].tickers.stock:{}}function M(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].tickers.pif:{}}function W(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].tickers.etf:{}}function K(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].tickers.bonds:{}}function $(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].tickers.forex:{}}var z=Object(f.a)((function(e){return{App:{margin:"0 auto"},mainContainer:{display:"flex",flexDirection:"column",backgroundColor:"#EEE"}}}));var J=function(){var e=Object(i.b)(),t=Object(i.c)($),c=Object(i.c)(P),n=Object(i.c)(M),a=Object(i.c)(W),s=Object(i.c)(K);Object(r.useEffect)((function(){e({type:A})}),[]);var o=z();return Object(h.jsxs)("div",{className:o.App+" "+o.mainContainer,children:[Object(h.jsx)(w,{}),Object(h.jsx)("div",{children:"\u0412\u0430\u043b\u044e\u0442\u0430"}),Object(h.jsx)(I,{tickers:t,type:"forex"}),Object(h.jsx)("div",{children:"\u0410\u043a\u0446\u0438\u0438"}),Object(h.jsx)(I,{tickers:c,type:"stock"}),Object(h.jsx)("div",{children:"\u0424\u043e\u043d\u0434\u044b"}),Object(h.jsx)(I,{tickers:n,type:"pif"}),Object(h.jsx)(I,{tickers:a,type:"etf"}),Object(h.jsx)("div",{children:"\u041e\u0431\u043b\u0438\u0433\u0430\u0446\u0438\u0438"}),Object(h.jsx)(I,{tickers:s,type:"bonds"})]})},X=c(55),V="",Y=["authenticated"];function Q(e){var t=e.authenticated,c=Object(X.a)(e,Y);return t?Object(h.jsx)(b.b,Object(y.a)({},c)):Object(h.jsx)(b.a,{to:{pathname:"".concat(V,"/login")}})}var Z=["authenticated"];function ee(e){var t=e.authenticated,c=Object(X.a)(e,Z);return t?Object(h.jsx)(b.a,{to:"".concat(V,"/")}):Object(h.jsx)(b.b,Object(y.a)({},c))}var te=c(38);var ce=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),s=Object(j.a)(a,2),i=s[0],o=s[1],u=Object(r.useState)(""),l=Object(j.a)(u,2),b=l[0],p=l[1],f=Object(r.useCallback)((function(e){o(e.target.value)}),[]),k=Object(r.useCallback)((function(e){n(e.target.value)}),[]),v=function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),p(""),e.prev=2,e.next=5,Object(te.a)(G,c,i);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),p(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:v,children:[Object(h.jsx)("p",{children:"Fill in the form below to register new account."}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Email",name:"email",type:"email",onChange:k,value:c})}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Password",name:"password",onChange:f,value:i,type:"password"})}),Object(h.jsxs)("div",{children:[b&&Object(h.jsx)("p",{children:b}),Object(h.jsx)("button",{type:"submit",children:"Login"})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("p",{children:["Already have an account? ",Object(h.jsx)(d.b,{to:"/gbCourse5Hw/login",children:"Sign in"})]})]})})};var re=function(){var e=Object(r.useState)(""),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(r.useState)(""),s=Object(j.a)(a,2),i=s[0],o=s[1],u=Object(r.useState)(""),l=Object(j.a)(u,2),b=l[0],p=l[1],f=function(){var e=Object(x.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),p(""),e.prev=2,e.next=5,Object(te.c)(G,c,i);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),p(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[2,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsx)("div",{children:Object(h.jsxs)("form",{onSubmit:f,children:[Object(h.jsx)("p",{children:"Fill in the form below to login to your account."}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Email",name:"email",type:"email",onChange:function(e){n(e.target.value)},value:c})}),Object(h.jsx)("div",{children:Object(h.jsx)("input",{placeholder:"Password",name:"password",onChange:function(e){o(e.target.value)},value:i,type:"password"})}),Object(h.jsxs)("div",{children:[b&&Object(h.jsx)("p",{children:b}),Object(h.jsx)("button",{type:"submit",children:"Login"})]}),Object(h.jsx)("hr",{}),Object(h.jsxs)("p",{children:["Don't have an account? ",Object(h.jsx)(d.b,{to:"/gbCourse5Hw/signup",children:"Sign up"})]})]})})};function ne(e){return e.userData[G.currentUser.uid]?e.userData[G.currentUser.uid].portfolio:{}}function ae(e){return e.currentUserData?e.currentUserData.stock:{}}function se(e){return e.currentUserData?e.currentUserData.pif:{}}function ie(e){return e.currentUserData?e.currentUserData.etf:{}}function oe(e){return e.currentUserData?e.currentUserData.bonds:{}}function ue(e){return e.currentUserData?e.currentUserData.forex:{}}function le(e){return e.currentUserData?e.currentUserData.portfolioCost:{}}var je="PROFILE::SET_TICKERS_INFO",de=function(e,t){return{type:je,tickerTable:e,tickerType:t}},be="PROFILE::SET_TICKERS_INFO_WITH_SAGA",pe=function(e,t){return{type:be,tickers:e,tickerType:t}},Oe=Object(f.a)((function(e){return{table:{maxWidth:"400px"},ticker:{display:"flex",flexDirection:"row",border:"1px solid black",margin:"10px"},tickerName:{display:"flex",flexDirection:"column",width:"110px",alignItems:"center",justifyContent:"space-around",padding:"5px",flexShrink:"0"},tickerTable:{display:"flex",flexDirection:"row"},tickerData:{display:"flex",flexDirection:"column",borderLeft:"1px solid black",flexGrow:"1"},tickerDataCell:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}},tickerHeaders:{display:"flex",flexDirection:"column",borderLeft:"1px solid black",flexGrow:"0"},tickerHeader:{borderBottom:"1px solid black",margin:"0",padding:"5px","&:last-child":{borderBottom:"none"}}}}));var xe=function(e){var t=Object(i.b)(),c=Oe(),r=Object.keys(e.tickers||{});return Object(h.jsx)("div",{children:Object(h.jsx)("div",{className:c.table,children:r.map((function(r){return Object(h.jsxs)("div",{className:c.ticker,children:[Object(h.jsxs)("div",{className:c.tickerName,children:[Object(h.jsx)("p",{children:r}),Object(h.jsx)("p",{children:e.tickers[r].description}),Object(h.jsx)("button",{onClick:function(){return function(e,c){t(E(e,c))}(r,e.type)},children:"del"})]}),Object(h.jsxs)("div",{className:c.tickerHeaders,children:[Object(h.jsx)("p",{className:c.tickerHeader,children:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e"}),Object(h.jsxs)("p",{className:c.tickerHeader,children:["\u0426\u0435\u043d\u0430,  ","rur"===e.currency&&Object(h.jsx)("span",{children:"\u20bd"})||"usd"===e.currency&&Object(h.jsx)("span",{children:"$"})||"eur"===e.currency&&Object(h.jsx)("span",{children:"\u20ac"})]}),Object(h.jsxs)("p",{className:c.tickerHeader,children:["\u0421\u0443\u043c\u043c\u0430,  ","rur"===e.currency&&Object(h.jsx)("span",{children:"\u20bd"})||"usd"===e.currency&&Object(h.jsx)("span",{children:"$"})||"eur"===e.currency&&Object(h.jsx)("span",{children:"\u20ac"})]})]}),Object(h.jsxs)("div",{className:c.tickerData,children:[Object(h.jsx)("p",{className:c.tickerDataCell,children:e.tickers[r].quantity}),Object(h.jsx)("p",{className:c.tickerDataCell,children:"rur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].RUBCost})||"usd"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].USDCost})||"eur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].EURCost})}),Object(h.jsx)("p",{className:c.tickerDataCell,children:"rur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].RUBTotal})||"usd"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].USDTotal})||"eur"===e.currency&&Object(h.jsx)("span",{children:e.tickers[r].EURTotal})})]})]},r)}))})})},fe="PROFILE::CALCULATE_PORTFOLIO_COST",he=function(e){return{type:fe,portfolioCost:e}},ke="PROFILE::CALCULATE_PORTFOLIO_COST_WITH_SAGA",ve=Object(f.a)((function(e){return{App:{margin:"0 auto"},mainContainer:{display:"flex",flexDirection:"column",backgroundColor:"#EEE"}}}));var me=function(){var e=Object(r.useState)("rur"),t=Object(j.a)(e,2),c=t[0],n=t[1],a=Object(i.c)(ne),s=a.stock,o=a.bonds,u=a.forex,l=a.pif,d=a.etf,b=ve(),p=Object(i.b)(),O=Object(i.c)(ae),x=Object(i.c)(se),f=Object(i.c)(ie),k=Object(i.c)(oe),v=Object(i.c)(ue),m=Object(i.c)(le);return Object(r.useEffect)((function(){p(pe(s,"stock")),p(pe(l,"pif")),p(pe(d,"etf")),p(pe(o,"bonds")),p(pe(u,"forex"))}),[]),Object(r.useEffect)((function(){p(function(e,t,c,r,n){return{type:ke,stock:e,pif:t,etf:c,bonds:r,forex:n}}(O,x,f,k,v))}),[O,x,k,v]),Object(h.jsxs)("div",{children:[Object(h.jsxs)("select",{required:!0,onChange:function(e){n(e.target.value)},className:b.searchItem,children:[Object(h.jsx)("option",{value:"rur",children:"rur"}),Object(h.jsx)("option",{value:"usd",children:"usd"}),Object(h.jsx)("option",{value:"eur",children:"eur"})]}),Object(h.jsx)("div",{children:"\u0412\u0430\u043b\u044e\u0442\u0430"}),Object(h.jsx)(xe,{tickers:v,type:"forex",currency:c}),Object(h.jsx)("div",{children:"\u0410\u043a\u0446\u0438\u0438"}),Object(h.jsx)(xe,{tickers:O,type:"stock",currency:c}),Object(h.jsx)("div",{children:"\u0424\u043e\u043d\u0434\u044b"}),Object(h.jsx)(xe,{tickers:x,type:"pif",currency:c}),Object(h.jsx)(xe,{tickers:f,type:"etf",currency:c}),Object(h.jsx)("div",{children:"\u041e\u0431\u043b\u0438\u0433\u0430\u0446\u0438\u0438"}),Object(h.jsx)(xe,{tickers:k,type:"bonds",currency:c}),Object(h.jsx)("h1",{children:G.currentUser?G.currentUser.email:""}),Object(h.jsxs)("p",{children:["\u20bd ",m?m.RUBGrandTotal:""]}),Object(h.jsxs)("p",{children:["$ ",m?m.USDGrandTotal:""]}),Object(h.jsxs)("p",{children:["\u20ac ",m?m.EURGrandTotal:""]})]})};var ye=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),c=t[0],n=t[1];Object(r.useEffect)((function(){return Object(te.b)(G,(function(e){e?(n(!0),console.log(G.currentUser.email)):n(!1)}))}),[]);var a=Object(r.useCallback)((function(){Object(te.d)(G).then((function(){})).catch((function(e){}))}),[]);return Object(h.jsxs)(d.a,{children:[Object(h.jsxs)("header",{children:[Object(h.jsx)(d.b,{to:"".concat(V,"/"),children:"Main"}),Object(h.jsx)(d.b,{to:"".concat(V,"/profile"),children:"Profile"}),Object(h.jsx)(d.b,{to:"".concat(V,"/signup"),children:"Registration"}),Object(h.jsx)(d.b,{to:"".concat(V,"/login"),children:"Login"}),Object(h.jsx)("button",{onClick:a,children:"Sign Out"})]}),Object(h.jsxs)(b.d,{children:[Object(h.jsx)(Q,{authenticated:c,exact:!0,path:"".concat(V,"/"),children:Object(h.jsx)(J,{})}),Object(h.jsx)(Q,{authenticated:c,exact:!0,path:"".concat(V,"/profile"),children:Object(h.jsx)(me,{})}),Object(h.jsx)(ee,{authenticated:c,path:"".concat(V,"/signup"),children:Object(h.jsx)(ce,{})}),Object(h.jsx)(ee,{authenticated:c,path:"".concat(V,"/login"),children:Object(h.jsx)(re,{})}),Object(h.jsx)(b.b,{children:Object(h.jsx)("h4",{children:"404"})})]})]})},ge=c(31),De=c(72),Ce=c(60),Te=c(70),Ue=c.n(Te),we={userData:{},currentUserData:{}},Se=c(39),Ee=c(32),Ne=O.a.mark((function e(t){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Ee.a)(T,t.stock,t.pif,t.etf,t.bonds,t.forex);case 3:return c=e.sent,e.next=6,Object(Ee.b)(he(c));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),Re=O.a.mark((function e(t){var c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(L.c)(H,"".concat(G.currentUser.uid,"/tickers/").concat(t.tickerType,"/").concat(t.ticker,"/data/").concat(t.date));case 3:return c=e.sent,e.next=6,Object(L.e)(c,{ticker:t.ticker,description:t.description,quantity:t.quantity,cost:t.cost,total:t.total,roubleCost:t.roubleCost,roubleTotal:t.roubleTotal,currency:t.currency});case 6:return e.next=8,Object(L.c)(H,"".concat(G.currentUser.uid,"/portfolio/").concat(t.tickerType,"/").concat(t.ticker,"/"));case 8:return r=e.sent,e.next=11,Object(L.e)(r,{ticker:t.ticker,quantity:t.quantity,currency:t.currency,description:t.description});case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case 17:case"end":return e.stop()}}),e,null,[[0,13]])})),Ie=O.a.mark((function e(t){var c,r;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(L.c)(H,"".concat(G.currentUser.uid,"/portfolio/").concat(t.marketType,"/").concat(t.ticker));case 3:return c=e.sent,e.next=6,Object(L.d)(c);case 6:return e.next=8,Object(L.c)(H,"".concat(G.currentUser.uid,"/tickers/").concat(t.marketType,"/").concat(t.ticker));case 8:return r=e.sent,e.next=11,Object(L.d)(r);case 11:e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0);case 16:case 17:case"end":return e.stop()}}),e,null,[[0,13]])})),_e=O.a.mark((function e(t){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Ee.a)(D,t.ticker,t.date,t.quantity,t.currency);case 3:return c=e.sent,e.next=6,Object(Ee.b)(c);case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),qe=O.a.mark((function e(t){var c;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(Ee.a)(C,t.tickers,t.tickerType);case 3:return c=e.sent,e.next=6,Object(Ee.b)(de(c,t.tickerType));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case 12:case"end":return e.stop()}}),e,null,[[0,8]])})),Ae=O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(L.c)(H);case 3:return t=e.sent,e.next=6,Object(L.b)(t,(function(e){var t=e.val();Ve.dispatch(q(t||{}))}));case 6:e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})),Fe=O.a.mark(Le);function Le(){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Se.b)(A,Ae);case 2:return e.next=4,Object(Se.a)(g,Re);case 4:return e.next=6,Object(Se.b)(S,Ie);case 6:return e.next=8,Object(Se.a)(N,_e);case 8:return e.next=10,Object(Se.a)(be,qe);case 10:return e.next=12,Object(Se.b)(ke,Ne);case 12:case"end":return e.stop()}}),Fe)}var Be=Le,Ge=we.userData;var He=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ge,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case _:return Object(y.a)({},t.userData);default:return e}},Pe=we.currentUserData;var Me=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Pe,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case je:return Object(y.a)(Object(y.a)({},e),{},Object(m.a)({},t.tickerType,t.tickerTable));case fe:return Object(y.a)(Object(y.a)({},e),{},{portfolioCost:t.portfolioCost});default:return e}},We=Object(ge.b)({userData:He,currentUserData:Me}),Ke={onError:function(e,t){console.log("qqq"+e),console.log(t)}},$e=Object(De.a)(Ke),ze=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ge.c,Je={key:"root",storage:Ue.a},Xe=Object(Ce.a)(Je,We),Ve=Object(ge.d)(Xe,we,ze(Object(ge.a)($e)));$e.run(Be);var Ye=Object(Ce.b)(Ve),Qe=Object(u.a)({palette:{primary:{main:"#708238"},secondary:{main:"#0098FF"}}});var Ze=function(){return Object(h.jsx)(i.a,{store:Ve,children:Object(h.jsx)(o.a,{persistor:Ye,children:Object(h.jsx)(l.a,{theme:Qe,children:Object(h.jsx)(ye,{})})})})},et=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,102)).then((function(t){var c=t.getCLS,r=t.getFID,n=t.getFCP,a=t.getLCP,s=t.getTTFB;c(e),r(e),n(e),a(e),s(e)}))};s.a.render(Object(h.jsx)(n.a.StrictMode,{children:Object(h.jsx)(Ze,{})}),document.getElementById("root")),et()}},[[89,1,2]]]);
//# sourceMappingURL=main.6fc04fb7.chunk.js.map