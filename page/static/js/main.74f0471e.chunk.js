(this.webpackJsonpcheckers=this.webpackJsonpcheckers||[]).push([[0],{35:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),o=t(13),i=t.n(o),a=t(2),l=(t(32),t(10)),u=t(11),s=t(3),b=t(7),d=t(6),f=function(){return Array.from(Array(8)).map((function(e,n){return function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return Array.from(Array(8)).map((function(n,t){return e?t%2===1:t%2===0}))}(n%2===0)}))},p=function(e){var n=e.rowIndex,t=e.colIndex;return"".concat(n,"-").concat(t)},j=function(e,n){var t=e.rowIndex,r=e.colIndex;return{rowIndex:t+n.rowOffset,colIndex:r+n.colOffset}},O=function(e){var n=e.split("-"),t=Object(d.a)(n,2),r=t[0],c=t[1];return{colIndex:Number(c),rowIndex:Number(r)}},x=function(e,n){var t=e.rowIndex,r=e.colIndex,c=n.rowIndex,o=n.colIndex;return t===c&&r===o},h=function(e){return e<3?{color:"black",isRisen:!1,isQueen:!1}:e>4?{color:"white",isRisen:!1,isQueen:!1}:null},g=function(e,n){return Math.floor(Math.random()*(Math.floor(n)-Math.ceil(e))+Math.ceil(e))},v="game/RISE_PIECE",m="game/PUT_PIECE",w="game/MOVE_PIECE",y="game/HOVER_CELL",I="game/HIT_PIECE",C="game/NEW_GAME",E="game/SET_STATE",k="game/UNDO",P=function(e,n){return{type:w,payload:{fromCoordinate:e,toCoordinate:n}}},T=function(e){return{type:y,payload:e}},A=function(e,n,t){return{type:I,payload:{fromCoordinate:e,hitCoordinate:n,toCoordinate:t}}},R={"top-right":{rowOffset:-1,colOffset:1},"top-left":{rowOffset:-1,colOffset:-1},"bottom-right":{rowOffset:1,colOffset:1},"bottom-left":{rowOffset:1,colOffset:-1}},S=function(e){return R[e]},M=function(e){return e.some((function(e){return e.cell.piece}))},N=function(e,n){var t=e[p(n)];if(!t||!t.piece)return[];var r=function(e,n){return Object.entries(R).filter((function(t){var r=Object(d.a)(t,2),c=r[0],o=r[1],i=e[p(n)].piece;if(null===i)return!1;var a=e[p(j(n,o))];return!!a&&(a.piece?a.piece.color!==i.color:"black"===i.color?"bottom-left"===c||"bottom-right"===c:"top-left"===c||"top-right"===c)})).map((function(e){return Object(d.a)(e,1)[0]}))}(e,n).map((function(t){return function(e,n,t){var r=j(t,S(n)),c=e[p(r)];if(null===c.piece)return[{cell:c,coordinate:r}];var o=j(r,S(n)),i=e[p(o)];return i&&null===i.piece?[{cell:c,coordinate:r},{cell:i,coordinate:o}]:[]}(e,t,n)})).filter((function(e){return e.length})),c=r.filter(M);return c.length?c:r},H=function(e,n){return e.find((function(e){return function(e,n){return e.some((function(e){return p(e.coordinate)===p(n)}))}(e,n)}))},L=function(e,n){return!!e&&(e.isQueen||"white"===e.color&&0===n.rowIndex||"black"===e.color&&7===n.rowIndex)},V=function(e,n){return N(e,n).some(M)?n:null},G=function(e,n){return Object.entries(e).reduce((function(e,t){var r=Object(d.a)(t,2),c=r[0],o=r[1];return o.piece&&o.piece.color===n?[].concat(Object(u.a)(e),[O(c)]):e}),[])},z=function(e,n){var t=G(e,n).reduce((function(n,t){var r=N(e,t);return r.length?[].concat(Object(u.a)(n),[{coordinate:t,availableRoutes:r}]):n}),[]),r=t.filter((function(e){return e.availableRoutes.some(M)}));return(r.length?r:t).map((function(e){return e.coordinate}))},Q=function(e,n){return n?e:"white"===e?"black":"white"},U=function(e,n,t){var r,c=p(n),o=p(t),i=e[c],a=e[o];if(!i||!a||!i.piece)return e;var l=i.piece,u=L(l,t);return Object(s.a)(Object(s.a)({},e),{},(r={},Object(b.a)(r,c,Object(s.a)(Object(s.a)({},i),{},{piece:null})),Object(b.a)(r,o,Object(s.a)(Object(s.a)({},a),{},{piece:Object(s.a)(Object(s.a)({},l),{},{isQueen:u})})),r))},D=function(e,n,t,r){var c,o=p(n),i=p(t),a=p(r),l=e[o],u=e[o],d=e[a];if(!l||!d||!u||!u.piece||!l.piece)return e;var f=l.piece,j=L(f,r);return Object(s.a)(Object(s.a)({},e),{},(c={},Object(b.a)(c,o,Object(s.a)(Object(s.a)({},l),{},{piece:null})),Object(b.a)(c,i,Object(s.a)(Object(s.a)({},l),{},{piece:null})),Object(b.a)(c,a,Object(s.a)(Object(s.a)({},d),{},{piece:Object(s.a)(Object(s.a)({},f),{},{isQueen:j})})),c))},_=function(e){return{cells:e.cells,currentPlayer:e.currentPlayer,availableTurnPieces:e.availableTurnPieces,mandatoryTurnPiece:e.mandatoryTurnPiece}},W="white",Y=f().reduce((function(e,n,t){return Object(s.a)(Object(s.a)({},e),function(e,n){return n.reduce((function(n,t,r){return t?Object(s.a)(Object(s.a)({},n),{},Object(b.a)({},p({rowIndex:e,colIndex:r}),{piece:h(e)})):n}),{})}(t,n))}),{}),J=[],B=z(Y,W),F={cells:Y,availableTurnRoutes:J,availableTurnPieces:B,selectedPieceCoordinate:null,hoveredCellCoordinate:null,mandatoryTurnPiece:null,history:[],currentPlayer:W,mode:"PvP"},K="checkers-game";function X(){window.localStorage.removeItem(K)}var q,Z,$,ee,ne,te,re,ce,oe,ie,ae,le,ue,se,be,de,fe,pe,je,Oe,xe,he,ge,ve,me=function(e){return e.game.cells},we=function(e){return function(n){var t=n.game.cells[p(e)];return t?t.piece:null}},ye=function(e){return e.game.selectedPieceCoordinate},Ie=function(e){return e.game.availableTurnRoutes},Ce=function(e){return e.game.currentPlayer},Ee=function(e){return e.game.mode},ke=function(e){return e.game.mandatoryTurnPiece},Pe=function(e){var n=e.getState;return function(e){return function(t){var r,c=e(t),o=n();return[w,I,k].includes(t.type)&&(r=function(e){return e.game}(o),window.localStorage.setItem(K,JSON.stringify(r))),c}}},Te=Object(l.d)(Object(l.c)({game:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case m:return Object(s.a)(Object(s.a)({},e),{},{selectedPieceCoordinate:null,availableTurnRoutes:J});case v:var t=N(e.cells,n.payload);return Object(s.a)(Object(s.a)({},e),{},{selectedPieceCoordinate:n.payload,availableTurnRoutes:t});case y:var r=n.payload?N(e.cells,n.payload):J;return Object(s.a)(Object(s.a)({},e),{},{hoveredCellCoordinate:n.payload,availableTurnRoutes:r});case w:var c=n.payload,o=c.fromCoordinate,i=c.toCoordinate,a=Q(e.currentPlayer,!1),l=U(e.cells,o,i),b=z(l,a);return Object(s.a)(Object(s.a)({},e),{},{cells:l,selectedPieceCoordinate:null,mandatoryTurnPiece:null,history:[_(e)].concat(Object(u.a)(e.history)),availableTurnRoutes:J,availableTurnPieces:b,currentPlayer:a});case I:var d=n.payload,f=d.fromCoordinate,p=d.hitCoordinate,j=d.toCoordinate,O=D(e.cells,f,p,j),x=V(O,j),h=Q(e.currentPlayer,null!==x),g=D(e.cells,f,p,j),P=null!==x?[x]:z(g,h);return Object(s.a)(Object(s.a)({},e),{},{cells:g,selectedPieceCoordinate:null,mandatoryTurnPiece:x,availableTurnPieces:P,history:[_(e)].concat(Object(u.a)(e.history)),availableTurnRoutes:J,currentPlayer:h});case k:var T=e.history[0];return Object(s.a)(Object(s.a)(Object(s.a)({},e),T),{},{history:e.history.slice(1)});case C:return Object(s.a)(Object(s.a)({},F),{},{mode:n.payload});case E:return n.payload;default:return e}}}),Object(l.a)(Pe)),Ae=function(e){var n=c.a.useRef();return c.a.useEffect((function(){n.current=e}),[e]),n.current},Re="black",Se=function(){var e=Object(a.b)(),n=Object(a.c)(me),t=Object(a.c)(Ce),r=Object(a.c)(ke),o=Ae(t),i=Ae(r);c.a.useEffect((function(){return console.log("IM ALIVE"),function(){console.log("I`LL BE BACK")}}),[]);var l=c.a.useCallback((function(n,t){var r=t[t.length-2].coordinate,c=t[t.length-1].coordinate;console.log("HEHE! I WILL HIT: ",r),window.setTimeout((function(){e(A(n,r,c))}),500)}),[e]),u=c.a.useCallback((function(n,t){var r=t[g(0,t.length)].coordinate;console.log("MOVING TO: ",r),window.setTimeout((function(){e(P(n,r))}),500)}),[e]);return c.a.useEffect((function(){if(t!==o&&t===Re){console.log("MY TURN!");var e=z(n,Re);if(!e.length)return void console.log("OOOPS, I GIVE UP");console.log("I CAN MOVE: ",e);var c=e[g(0,e.length)];console.log("I HAVE DECIDED TO MOVE: ",c);var a=N(n,c);console.log("I CAN MOVE IT TO: ",a);var s=a[g(0,a.length)];console.log("I CHOOSE TO GO THIS WAY: ",s),s.length>1?l(c,s):u(c,s)}if(i!==r&&null!==r&&t===Re){console.log("I`M MACHINEEE! I HIT AGAIN: ",r);var b=N(n,r),d=b[g(0,b.length)];console.log("I CHOOSE TO GO AND HIT THIS WAY: ",d),M(d)?l(r,d):console.log("OOOPS! SOMETHING WENT WRONG")}}),[e,n,t,o,i,r,l,u]),null},Me=function(e){var n=Object(a.c)(Ie),t=H(n,e);return!!t&&t.some((function(e){return e.cell.piece}))},Ne=function(e){var n=Object(a.c)(function(e){return function(n){return n.game.availableTurnPieces.some((function(n){return x(e,n)}))}}(e)),t=Object(a.c)(Ee),r=Object(a.c)(Ce);return"AI"===t?r!==Re&&n:n},He=function(e){var n=Object(a.c)(ke);return null!==n&&x(n,e)},Le=t(4),Ve=t(5),Ge=440,ze=55,Qe="#222",Ue="#ffece4",De="#ff804d",_e="#fb5",We=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qe;return Object(Ve.b)(Z||(Z=Object(Le.a)(["\n  background-image: linear-gradient(45deg, "," 25%, transparent 25%, transparent 50%, "," 50%, "," 75%, transparent 75%, transparent 100%);\n  background-size: ","px ","px;\n"])),n,n,n,2*e,2*e)},Ye=Object(Ve.a)($||($=Object(Le.a)(["\n  html, body, #root {\n    width: 100%;\n    height: 100%;\n    font-family: 'Courier New', monospace;\n    background: #ff804d;\n    user-select: none;\n  }\n"]))),Je=Ve.c.div(ee||(ee=Object(Le.a)(["\n  position: ",";\n  width: ","px;\n  height: ","px;\n  z-index: ",";\n  visibility: ",";\n  \n  cursor: ",";\n  pointer-events: ",";\n  \n  ","\n"])),(function(e){return e.isRisen?"fixed":"relative"}),ze,ze,(function(e){return e.isRisen?10:1}),(function(e){return e.isVisible?"visible":"hidden"}),(function(e){return e.isRisen?"grabbing":"grab"}),(function(e){return e.isInteractive?"all":"none"}),(function(e){return e.isPieceHit&&Object(Ve.b)(ne||(ne=Object(Le.a)(["\n    &:after,\n    &:before {\n      position: absolute;\n      display: block;\n      width: 2px;\n      height: ","px;\n      left: 0;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      margin: auto;\n      background-color: ",";\n      transform-origin: 50% 50%;\n      content: '';\n      z-index: 1;\n    }\n    \n    &:before {\n      transform: rotate(45deg);\n    }\n    \n    &:after {\n      transform: rotate(-45deg);\n    }\n  "])),ze,"white"===e.pieceColor?Qe:Ue)})),Be=Ve.c.div(te||(te=Object(Le.a)(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  background-color: ",";\n  box-sizing: border-box;\n  border: 4px solid ",";\n  \n  &:before,\n  &:after {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    margin: auto;\n    display: block;\n    border-radius: 50%;\n    border: 2px solid ",";\n    content: '';\n  }\n  \n  &:before {\n    width: 70%;\n    height: 70%;\n    ","\n  }\n  \n  &:after {\n    width: 40%;\n    height: 40%;\n    ","\n  }\n"])),(function(e){return"white"===e.pieceColor?Ue:Qe}),(function(e){return e.isMandatory?_e:Qe}),(function(e){return"white"===e.pieceColor?Qe:Ue}),(function(e){return e.isQueen&&Object(Ve.b)(re||(re=Object(Le.a)(["\n      border: 2px solid ",";\n    "])),_e)}),(function(e){return e.isQueen&&Object(Ve.b)(ce||(ce=Object(Le.a)(["\n      font-weight: bold;\n      border: 2px solid ",";\n      color: ",";\n      content: 'Q';\n    "])),_e,_e)})),Fe=Ve.c.div(oe||(oe=Object(Le.a)(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  visibility: ",";\n  top: 2px;\n  left: 2px;\n  \n  ",";\n"])),(function(e){return e.isVisible?"visible":"hidden"}),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:Qe;return Object(Ve.b)(q||(q=Object(Le.a)(["\n  background-image:\n    linear-gradient(45deg, "," 25%, transparent 25%),\n    linear-gradient(-45deg, "," 25%, transparent 25%),\n    linear-gradient(45deg, transparent 75%, "," 75%),\n    linear-gradient(-45deg, transparent 75%, "," 75%);\n  background-size: ","px ","px;\n  background-position: 0 0, 0 ","px, ","px -","px, -","px 0px;\n"])),n,n,n,n,e,e,e/2,e/2,e/2,e/2)}()),Ke=t(1),Xe=function(e){var n=e.coordinate,t=Object(a.b)(),r=c.a.createRef(),o=Object(a.c)(we(n)),i=Object(a.c)(function(e){return function(n){var t=we(e)(n),r=ye(n);return null!==t&&null!==r&&x(e,r)}}(n)),l=Object(a.c)(ye),u=Object(a.c)(Ce),s=Me(n),b=He(n),d=Ne(n),f=c.a.useCallback((function(){o&&u===o.color&&t(function(e){return{type:v,payload:e}}(n))}),[t,o,u,n]),p=c.a.useCallback((function(){u!==(null===o||void 0===o?void 0:o.color)||l||t(T(n))}),[t,n,u,o,l]),j=c.a.useCallback((function(){u!==(null===o||void 0===o?void 0:o.color)||l||t(T(null))}),[t,u,o,l]);return o?Object(Ke.jsx)(Je,{ref:r,isRisen:i,isVisible:!i,isPieceHit:s,pieceColor:o.color,isInteractive:d,onMouseEnter:p,onMouseLeave:j,children:Object(Ke.jsx)(Be,{onMouseDown:f,pieceColor:o.color,isMandatory:b,isQueen:o.isQueen,isRisen:!1})}):null},qe=function(e){var n=Object(a.c)(we(e)),t=Object(a.c)(Ie),r=H(t,e),c=Me(e);return r?c&&n?"hit":"available":"none"},Ze=function(e){var n=Object(a.b)(),t=Object(a.c)(Ie),r=Object(a.c)(ye),o=H(t,e);return c.a.useCallback((function(){if(o&&r){var t=o.find((function(e){return e.cell.piece}));n(t?A(r,t.coordinate,e):P(r,e))}}),[n,r,e,o])},$e=Ve.c.div(ae||(ae=Object(Le.a)(["\n  position: relative;\n  width: ","px;\n  height: ","px;\n  background-color: ",";\n  \n  ","\n  \n  ",";\n"])),ze,ze,De,(function(e){return e.hasOffset&&Object(Ve.b)(le||(le=Object(Le.a)(["\n    margin-left: ","px;\n  "])),ze)}),(function(e){return function(e){switch(e){case"available":return We(2,"rgba(255, 255, 255, 0.5)");case"hit":return We(2,"rgba(255, 0, 0, 0.5)");case"none":default:return Object(Ve.b)(ie||(ie=Object(Le.a)(["\n        background: ",";\n      "])),De)}}(e.highlight)})),en=function(e){var n=e.coordinate,t=e.hasOffset,r=qe(n),c=Ze(n);return Object(Ke.jsx)($e,{onMouseUp:c,hasOffset:t,highlight:r,children:Object(Ke.jsx)(Xe,{coordinate:n})})},nn=function(){var e=Object(a.b)(),n=r.useRef(null),t=Object(a.c)(ye),c=Object(a.c)(Ce),o=r.useCallback((function(e){!t&&n.current&&(n.current.style.top="".concat(e.clientY-27.5,"px"),n.current.style.left="".concat(e.clientX-27.5,"px"))}),[n,t]),i=r.useCallback((function(){t&&e({type:m,payload:t})}),[e,t]),l=r.useCallback((function(e){t&&n.current&&(n.current.style.top="".concat(e.clientY-27.5,"px"),n.current.style.left="".concat(e.clientX-27.5,"px"))}),[t,n]);return r.useEffect((function(){return document.addEventListener("mousedown",o),document.addEventListener("mouseup",i),document.addEventListener("mousemove",l),function(){document.removeEventListener("mousedown",o),document.removeEventListener("mouseup",i),document.removeEventListener("mousemove",l)}})),Object(Ke.jsxs)(Je,{isRisen:!0,ref:n,isVisible:!!t,isInteractive:!1,isPieceHit:!1,pieceColor:c,children:[Object(Ke.jsx)(Fe,{isVisible:!!t}),Object(Ke.jsx)(Be,{pieceColor:c,isRisen:!0})]})},tn=Ve.c.div(ue||(ue=Object(Le.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  width: ","px;\n  height: ","px;\n  border: 6px solid ",";\n  border-radius: 10px;\n  background: #ffece4;\n  box-shadow: 10px 10px ",";\n  overflow: hidden;\n"])),Ge,Ge,_e,Qe),rn=Ve.c.div(se||(se=Object(Le.a)(["\n  display: flex;\n  flex-wrap: wrap;\n  \n  background: ",";\n  border: 6px solid ",";\n  border-radius: ",";\n  box-shadow: 10px 10px ",";\n      padding: 10px 50px;\n    letter-spacing: 4px;\n    font-weight: bold;\n  \n  ",";\n"])),(function(e){return e.isActive?Ue:De}),_e,(function(e){return"top"===e.position?"10px 10px 0 0 ":"0 0 10px 10px"}),Qe,(function(e){return"top"===e.position?Object(Ve.b)(be||(be=Object(Le.a)(["border-bottom: none;"]))):Object(Ve.b)(de||(de=Object(Le.a)(["border-top: none;"])))})),cn=f(),on=function(){var e=Object(a.c)(Ce),n=Object(a.c)(Ee);return Object(Ke.jsxs)(Ke.Fragment,{children:[Object(Ke.jsx)(nn,{}),Object(Ke.jsx)(rn,{position:"top",isActive:"black"===e,children:"AI"===n?"Dummy AI":"Player 2"}),Object(Ke.jsx)(tn,{children:cn.map((function(e,n){return e.map((function(t,r){var c=e[r-1],o={colIndex:r,rowIndex:n};return t?Object(Ke.jsx)(en,{coordinate:o,hasOffset:void 0!==c&&!c},p({rowIndex:n,colIndex:r})):null}))}))}),Object(Ke.jsx)(rn,{position:"bottom",isActive:"white"===e,children:"Player 1"})]})},an=Ve.c.button(fe||(fe=Object(Le.a)(["\n    box-sizing: border-box;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 100%;\n    margin: 22px;\n    padding: 10px 22px;\n    border: 2px solid ",";\n    border-radius: 6px;\n    background: ",";\n    box-shadow: ","px ","px ",";\n    font-weight: bold;\n    font-size: 16px;\n    text-transform: uppercase;\n    outline: none;\n    cursor: pointer;\n    white-space: nowrap;\n    \n    &:hover {\n      transform: translate(-","px, -","px);\n      box-shadow: ","px ","px black;\n    }\n    \n    &:active {\n      transform: translate(","px, ","px);\n      box-shadow: 0 0 black;\n    }\n"])),Qe,Ue,4,4,Qe,2,2,6,6,2,2),ln=function(e){var n=e.label,t=e.onClick;return Object(Ke.jsx)(an,{type:"button",onClick:t,children:n})},un=Ve.c.div(pe||(pe=Object(Le.a)(["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n"]))),sn=Ve.c.h2(je||(je=Object(Le.a)(["\n  text-transform: uppercase;\n"]))),bn=function(e){var n=e.onModeSelect;return Object(Ke.jsxs)(un,{children:[Object(Ke.jsx)(sn,{children:"New game"}),Object(Ke.jsx)(ln,{label:"Player vs Player",onClick:function(){return n("PvP")}}),Object(Ke.jsx)(ln,{label:"Player vs 'AI'",onClick:function(){return n("AI")}})]})},dn=Ve.c.div(Oe||(Oe=Object(Le.a)(["\n    box-sizing: border-box;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n"]))),fn=function(e){var n=e.onUndo,t=e.onStartNewGame;return Object(Ke.jsxs)(dn,{children:[Object(Ke.jsx)(ln,{label:"Undo",onClick:n}),Object(Ke.jsx)(ln,{label:"New game",onClick:t})]})},pn=Ve.c.div(xe||(xe=Object(Le.a)(["\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n"]))),jn=Ve.c.h2(he||(he=Object(Le.a)(["\n  text-transform: uppercase;\n  font-size: 60px;\n"]))),On=function(e){var n=e.winner,t=e.onStartNewGame;return n?Object(Ke.jsxs)(pn,{children:[Object(Ke.jsx)(jn,{children:"".concat(n," player wins!")}),Object(Ke.jsx)(ln,{label:"New game",onClick:t})]}):null},xn=function(){var e=Object(a.b)(),n=c.a.useState("start"),t=Object(d.a)(n,2),r=t[0],o=t[1],i=c.a.useState(null),l=Object(d.a)(i,2),u=l[0],s=l[1],b=Object(a.c)(me);c.a.useEffect((function(){var e=function(e){var n=G(e,"white"),t=G(e,"black");return n.length?t.length?n.some((function(n){return N(e,n).length}))?t.some((function(n){return N(e,n).length}))?null:"white":"black":"white":"black"}(b);null!==e&&(s(e),o("winner"))}),[b]),c.a.useEffect((function(){var n=function(){var e=localStorage.getItem(K);return e&&JSON.parse(e)}();null!==n?(e({type:E,payload:n}),o("main")):o("start")}),[e]);var f=c.a.useCallback((function(){X(),o("start")}),[]),p=c.a.useCallback((function(n){e({type:C,payload:n}),X(),o("main")}),[e]);switch(r){case"main":return Object(Ke.jsxs)(Ke.Fragment,{children:[Object(Ke.jsx)(on,{}),Object(Ke.jsx)(fn,{onUndo:function(){e({type:k})},onStartNewGame:f})]});case"winner":return Object(Ke.jsx)(On,{winner:u,onStartNewGame:f});case"start":default:return Object(Ke.jsx)(bn,{onModeSelect:p})}},hn=Ve.c.div(ge||(ge=Object(Le.a)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  margin: auto;\n  width: ","px;\n  text-align: center;\n"])),Ge),gn=Ve.c.h1(ve||(ve=Object(Le.a)(["\n  margin: 10px;\n  padding: 20px 28px;\n  font-size: 48px;\n  color: ",";\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  text-shadow: 2px 2px 0 ",";\n"])),Qe,Ue),vn=function(){var e=Object(a.c)(Ee);return Object(Ke.jsxs)(hn,{children:[Object(Ke.jsx)(gn,{children:"CHECKERS"}),Object(Ke.jsx)(xn,{}),"AI"===e&&Object(Ke.jsx)(Se,{})]})},mn=function(){return Object(Ke.jsxs)(Ke.Fragment,{children:[Object(Ke.jsx)(Ye,{}),Object(Ke.jsx)(a.a,{store:Te,children:Object(Ke.jsx)(vn,{})})]})};i.a.render(Object(Ke.jsx)(c.a.StrictMode,{children:Object(Ke.jsx)(mn,{})}),document.getElementById("root"))}},[[35,1,2]]]);
//# sourceMappingURL=main.74f0471e.chunk.js.map