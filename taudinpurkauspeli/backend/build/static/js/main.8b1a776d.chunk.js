(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var s=a(0),i=a.n(s),n=a(20),c=a.n(n),r=a(10),o=a(17),l=(a(67),a(68),a(7)),u=a(115),d=a(116),j=a(114),h=a(38),b=a(118),p=a(31),O=a(30),m=a(62);p.a.use(m.a).init(),p.a.use(O.e).init({fallbackLng:"fi",lng:localStorage.getItem("i18nextLng")||"fi",resources:{fi:{translations:a(69)},en:{translations:a(70)}},ns:["translations"],defaultNS:"translations"}),p.a.languages=["fi","en"];var g=p.a,x=a(59),f=a(112),v=a(113),y=a(117),k=a(119),w=a(1),T=function(e){var t=e.c,a=e.admin,s=Object(b.a)().t;return Object(w.jsxs)(y.a,{as:r.b,to:"/cases/".concat(t.id),style:{width:"20rem",cursor:"pointer"},className:"caseCard",children:[Object(w.jsxs)(y.a.Body,{children:[Object(w.jsx)(y.a.Title,{children:t.title}),Object(w.jsx)(y.a.Text,{children:t.anamnesis}),a&&Object(w.jsxs)("div",{children:[Object(w.jsx)(x.a,{className:"copyButton",size:"sm",children:s("copy")})," ",Object(w.jsx)(x.a,{className:"removeButton",size:"sm",variant:"danger",children:s("button_remove")})]})]}),Object(w.jsx)(y.a.Footer,{children:Object(w.jsx)(k.a,{className:"progsbar",variant:"success",now:25,label:"".concat(25,"%")})})]})},_=function(e){var t=e.cases,a=e.admin,s=Object(b.a)().t;return Object(w.jsxs)("div",{id:"wrapper",children:[Object(w.jsx)("h2",{children:s("frontpage_title")}),Object(w.jsx)("p",{children:s("frontpage_text")}),a&&Object(w.jsxs)("div",{children:[Object(w.jsx)(x.a,{as:r.b,to:"/newcase",children:s("button_newCase")}),Object(w.jsx)("br",{}),Object(w.jsx)("h3",{children:s("case_hidden")}),Object(w.jsx)("hr",{})]}),Object(w.jsx)(f.a,{xs:"auto",md:"auto",className:"g-4",children:a&&t.filter((function(e){return e.hidden})).map((function(e){return Object(w.jsx)(v.a,{children:Object(w.jsx)(T,{c:e,admin:a})},e.id)}))}),Object(w.jsx)("br",{}),Object(w.jsx)("h3",{children:s("case_playable")}),Object(w.jsx)("hr",{}),Object(w.jsx)(f.a,{xs:"auto",md:"auto",className:"g-4",children:t.filter((function(e){return!e.hidden})).map((function(e){return Object(w.jsx)(v.a,{children:Object(w.jsx)(T,{c:e,admin:a})},e.id)}))})]})},C=function(){var e=Object(b.a)().t;return Object(w.jsxs)("div",{id:"wrapper",children:[Object(w.jsx)("h2",{children:e("GuestFrontpageTitle")}),Object(w.jsx)("p",{children:e("GuestFrontpageText")})]})},I=function(){return Object(w.jsx)("div",{id:"sidebar"})},P=function(){var e=Object(b.a)().t;return Object(w.jsxs)("div",{id:"wrapper",children:[Object(w.jsx)("h2",{children:e("howToPlay")}),Object(w.jsx)("p",{children:e("gameInstructions")})]})},S=function(){var e=Object(b.a)().t;return Object(w.jsx)("div",{id:"wrapper",children:Object(w.jsx)("h2",{children:e("userProfile")})})},N=function(e){var t=e.cases,a=Object(l.f)().id,s=t.find((function(e){return e.id===Number(a)}));return Object(w.jsxs)("div",{id:"wrapper",children:[Object(w.jsx)("h2",{children:s.title}),Object(w.jsx)("p",{children:s.anamnesis})]})},A=a(39),L=a.n(A),D="/api/cases",F=function(){return L.a.get(D).then((function(e){return e.data}))},K=function(e){return L.a.post(D,e).then((function(e){return e.data}))},B=function(e){var t=e.addCaseFunc,a=Object(b.a)().t,i=Object(s.useState)(""),n=Object(o.a)(i,2),c=n[0],r=n[1],l=Object(s.useState)(""),u=Object(o.a)(l,2),d=u[0],j=u[1],h=Object(s.useState)(!1),p=Object(o.a)(h,2),O=p[0],m=p[1];return Object(w.jsxs)("div",{id:"wrapper",children:[Object(w.jsx)("h2",{children:a("addCase")}),Object(w.jsxs)("form",{onSubmit:function(e){e.preventDefault();var a={title:c,anamnesis:d,hidden:O};null!=t&&t(a),K(a).then((function(){r(""),j(""),m(!1)}))},children:[Object(w.jsxs)("p",{children:[Object(w.jsx)("label",{htmlFor:"title",children:a("caseTitle")}),Object(w.jsx)("br",{}),Object(w.jsx)("input",{id:"title",type:"text",value:c,onChange:function(e){r(e.target.value)}})]}),Object(w.jsxs)("p",{children:[Object(w.jsx)("label",{htmlFor:"anamnesis",children:a("caseAnamnesis")}),Object(w.jsx)("br",{}),Object(w.jsx)("textarea",{id:"anamnesis",type:"textarea",value:d,onChange:function(e){j(e.target.value)}})]}),Object(w.jsxs)("p",{children:[Object(w.jsx)("label",{htmlFor:"hidden",children:a("hideCase")}),Object(w.jsx)("br",{}),Object(w.jsx)("input",{id:"hidden",value:O,type:"checkbox",onClick:function(e){m(e.target.value)}})]}),Object(w.jsx)("p",{children:Object(w.jsx)("input",{type:"submit",id:"submit",value:a("button_submitNewCase")})})]})]})},G=function(e){var t=e.user,a=e.admin,n=e.guest,c=e.changeUser,p=e.changeAdmin,O=e.changeGuest,m=Object(b.a)().t,x=Object(s.useState)([]),f=Object(o.a)(x,2),v=f[0],y=f[1];i.a.useEffect((function(){F().then((function(e){y(e)})).catch((function(e){console.log(e)}))}),[]);var k=function(e){g.changeLanguage(e)};return Object(w.jsxs)(r.a,{children:[Object(w.jsxs)(u.a,{collapseOnSelect:!0,expand:"lg",variant:"dark",children:[Object(w.jsx)(u.a.Brand,{as:r.b,to:"/",children:m("nameOfTheGame")}),Object(w.jsx)(u.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),Object(w.jsx)(u.a.Collapse,{id:"responsive-navbar-nav",children:Object(w.jsxs)(d.a,{className:"ml-auto",children:[Object(w.jsxs)(j.a,{title:m("selectUser"),children:[Object(w.jsx)(j.a.Item,{onClick:function(){return O()},eventKey:"guest",children:m("guest")}),Object(w.jsx)(j.a.Item,{onClick:function(){return c()},eventKey:"student",children:m("student")}),Object(w.jsx)(j.a.Item,{onClick:function(){return p()},eventKey:"teacher",children:m("teacher")})]}),Object(w.jsxs)(j.a,{title:m("selectLanguage"),children:[Object(w.jsx)(j.a.Item,{onClick:function(){return k("fi")},eventKey:"fi",children:m("language_finnish")}),Object(w.jsx)(j.a.Item,{onClick:function(){return k("en")},eventKey:"en",children:m("language_english")})]}),a&&Object(w.jsx)(d.a.Item,{children:Object(w.jsx)(h.a,{as:r.b,to:"/users",children:m("userInformation")})}),a&&Object(w.jsx)(d.a.Item,{children:Object(w.jsx)(h.a,{as:r.b,to:"/files",children:m("fileBank")})}),(t||n||a)&&Object(w.jsx)(d.a.Item,{children:Object(w.jsx)(h.a,{as:r.b,to:"/howtoplay",children:m("howToPlay")})}),t&&Object(w.jsx)(d.a.Item,{children:Object(w.jsx)(h.a,{as:r.b,to:"/profile",children:m("userProfile")})}),Object(w.jsx)(d.a.Item,{children:t||a?Object(w.jsx)(h.a,{as:r.b,to:"/logout",children:m("logOut")}):Object(w.jsx)(h.a,{as:r.b,to:"/login",children:m("logIn")})})]})})]}),n?" ":Object(w.jsx)(I,{}),Object(w.jsxs)(l.c,{children:[Object(w.jsx)(l.a,{path:"/howtoplay",children:Object(w.jsx)(P,{})}),Object(w.jsx)(l.a,{path:"/profile",children:Object(w.jsx)(S,{})}),Object(w.jsx)(l.a,{path:"/cases/:id",children:Object(w.jsx)(N,{cases:v})}),a&&Object(w.jsx)(l.a,{path:"/newcase",children:Object(w.jsx)(B,{})}),Object(w.jsx)(l.a,{path:"/",children:n?Object(w.jsx)(C,{}):Object(w.jsx)(_,{admin:a,cases:v})})]})]})},E=function(){var e=Object(s.useState)(!1),t=Object(o.a)(e,2),a=t[0],i=t[1],n=Object(s.useState)(!1),c=Object(o.a)(n,2),r=c[0],l=c[1],u=Object(s.useState)(!0),d=Object(o.a)(u,2),j=d[0],h=d[1];return Object(w.jsx)(G,{user:a,admin:r,guest:j,changeUser:function(){i(!0),h(!1),l(!1)},changeAdmin:function(){i(!1),h(!1),l(!0)},changeGuest:function(){i(!1),h(!0),l(!1)}})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(w.jsx)(r.a,{children:Object(w.jsx)(E,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},67:function(e,t,a){},69:function(e){e.exports=JSON.parse('{"nameOfTheGame":"Taudinpurkauspeli","diseases":"Taudit","disease":"Tauti","listOfDiseases":"Tautilista","addDisease":"Lis\xe4\xe4 tauti","diseaseAdded":"Tauti lis\xe4tty","category":"Kategoria","title":"Nimi","description":"Kuvaus","searchByTitle":"Etsi nimell\xe4","edit":"Muokkaa","copy":"Kopioi","clickTheDisease":"Klikkaa tautia","logIn":"Kirjaudu sis\xe4\xe4n","logOut":"Kirjaudu ulos","howToPlay":"Peliohjeet","cases":"Caset","case_hidden":"Opiskelijoilta piilotetut caset","case_playable":"Pelattavissa olevat caset","userProfile":"K\xe4ytt\xe4j\xe4tiedot","userInformation":"K\xe4ytt\xe4jien seuranta","fileBank":"Tiedostopankki","selectLanguage":"Valitse kieli","addCase":"Lis\xe4\xe4 case","caseTitle":"Casen nimi","caseAnamnesis":"Anemneesi","hideCase":"Piilota opiskelijoilta","button_submitNewCase":"Lis\xe4\xe4 case","button_submitNewDisease":"Lis\xe4\xe4","button_remove":"Poista","button_removeAll":"Poista kaikki","button_update":"P\xe4ivit\xe4","button_search":"Etsi","button_selectCase":"Valitse case:","button_play":"Pelaa","button_newCase":"+ Lis\xe4\xe4 uusi case","language_finnish":"Suomi","language_english":"English","frontpage_title":"Etusivu","frontpage_text":"Tervetuloa! \\n\\n Valitse alta case, jota haluat pelata. Peliohjeet l\xf6ytyv\xe4t navigointipalkista.","selectUser":"Valitse k\xe4ytt\xe4j\xe4muoto","guest":"vierailija","student":"opiskelija","teacher":"opettaja","GuestFrontpageTitle":"Tervetuloa taudinpurkauspelin pariin!","GuestFrontpageText":"T\xe4m\xe4 on el\xe4inl\xe4\xe4ketieteellisen tiedekunnan epidemiologian kurssin taudinpurkauspelin etusivu. \\n Peliohjeet l\xf6ytyv\xe4t peliohjeet-linkin takaa. Mik\xe4li haluat pelata peli\xe4, kirjaudu sis\xe4\xe4n yliopiston k\xe4ytt\xe4j\xe4tunnuksilla!","gameInstructions":"Pelin tarkoitus on opetella taudinpurkaukseen tarvittavaa ajattelumallia. Yrit\xe4 mietti\xe4, mik\xe4 olisi paras j\xe4rjestys suorittaa pelin toimenpiteet oikeaan diagnoosiin p\xe4\xe4st\xe4ksesi. Pelin toimenpiteet eiv\xe4t ole toimenpidelistassa oikeassa suoritusj\xe4rjestyksess\xe4. V\xe4\xe4ri\xe4 diffej\xe4 on helpointa sulkea pois heti, kun voit varmuudella tehd\xe4 niin. \\n\\n Edistymisesi casessa tallentuu automaattisesti, joten voit poistua v\xe4lill\xe4 Taudinpurkauspelist\xe4 ja tulla my\xf6hemmin jatkamaan casen selvitt\xe4mist\xe4. N\xe4et edistymisesi casessa etusivulla."}')},70:function(e){e.exports=JSON.parse('{"nameOfTheGame":"Taudinpurkauspeli","diseases":"Diseases","disease":"Disease","listOfDiseases":"List of diseases","addDisease":"Add disease","diseaseAdded":"Disease added","category":"Category","title":"Title","description":"Description","searchByTitle":"Search by title","edit":"Edit","copy":"Copy","clickTheDisease":"Click the disease","cases":"Cases","case_hidden":"Cases hidden from students","case_playable":"Playable cases","logIn":"Log in","logOut":"Log out","howToPlay":"How to play","userProfile":"Profile","userInformation":"Users","fileBank":"Filebank","selectLanguage":"Select language","addCase":"Add case","caseTitle":"Case title","caseAnamnesis":"Anemnesis","hideCase":"Hide from students","button_submitNewCase":"Add case","button_submitNewDisease":"Submit","button_remove":"Remove","button_removeAll":"Remove all","button_update":"Update","button_search":"Search","button_selectCase":"Select case:","button_play":"Play","button_newCase":"+ Add new case","language_finnish":"Suomi","language_english":"English","frontpage_title":"Front page","frontpage_text":"Welcome! \\n \\n Select the case you want to play. The game instructions can be found in navigation bar.","selectUser":"Select user in charge","guest":"guest","student":"student","teacher":"teacher","GuestFrontpageTitle":"Welcome to Taudinpurkauspeli!","GuestFrontpageText":"This is the veterinary faculty\'s epidemiology courses taudinpurkaus-games frontpage. \\n The instructions can be found behind the game instructions link. If you want to play the game, sign in with your university log-in details!","gameInstructions":"The goal of this game is to learn the procedure to handle disease outbreaks. Try to think what would be the best order to execute the operations to come to the right diagnosis. The operations are not in the right order at the operations list. It\'s easiest to rule out wrong diffs whenever you\'re sure it\'s the right call. \\n\\n Your progress is saved automatically, so you can leave the game and continue later where you left off. You can see your progress with the case on the front page."}')}},[[107,1,2]]]);
//# sourceMappingURL=main.8b1a776d.chunk.js.map