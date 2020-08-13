(this.webpackJsonpmarkingtool=this.webpackJsonpmarkingtool||[]).push([[0],{23:function(e,t,a){},43:function(e,t,a){e.exports=a(79)},77:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(18),l=a.n(s),o=a(17),i=a(2),c=a(9),u=a(10),d=a(12),m=a(11),p=a(8),h=(a(23),function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(e=t.call.apply(t,[this].concat(r))).state={inputText:""},e.handleChange=function(t){var a=t.target,n=a.value;a.name;e.props.inputText(n),e.props.history.push("/marker")},e}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"textFieldContainer"},r.a.createElement("div",{className:"description"},r.a.createElement("h1",{style:{fontSize:"3rem"}},"\u7ffb\u8a33\u5358\u8a9e\u5e33\u30c4\u30fc\u30eb"),r.a.createElement("br",null),r.a.createElement("div",{className:"explanationContainer"},r.a.createElement("div",{className:"explanationIcon"},r.a.createElement("div",{className:"explanationText"},r.a.createElement("span",{style:{background:"#028090",color:"#E4FDE1"}},"this"),r.a.createElement("span",null,"is "),r.a.createElement("span",null,"a "),r.a.createElement("span",null,"tool "),r.a.createElement("span",null,"for "),r.a.createElement("span",{style:{background:"#028090",color:"#E4FDE1"}},"marking "),r.a.createElement("span",null,"and "),r.a.createElement("span",null,"translating "),r.a.createElement("span",{style:{background:"#028090",color:"#E4FDE1"}},"text "),r.a.createElement("span",null,"to "),r.a.createElement("span",null,"make "),r.a.createElement("span",null,"cards "))),r.a.createElement("div",{className:"explanationArrow"},"\ud83e\udc46"),r.a.createElement("div",{className:"resultIcon"},r.a.createElement("div",{className:"resultIconBoxOne"},"\u3053\u308c"),r.a.createElement("div",{className:"resultIconBoxTwo"},"this"))),r.a.createElement("br",null),r.a.createElement("h1",{className:"explanationCopyPaste"},"\u307e\u305a\u306f\u3053\u3053\u306b\u6587\u7ae0\u3092\u30b3\u30d4\u30da")),r.a.createElement("form",{action:"",className:"ui inputField"},r.a.createElement("input",{type:"text",name:"inputText",className:"inputTextBox",onChange:this.handleChange,autoComplete:"off"})))}}]),a}(r.a.Component)),E=Object(p.b)((function(e){return{inputText:e.inputText}}),{inputText:function(e){return console.log(e),{type:"INPUT_TEXT",payload:e}}})(h),g=a(21),v="http://127.0.0.1:5000/api",f={"Content-type":"application/json"},x=a(20),S=a.n(x),b=a(14),y=a.n(b),N=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).state={loading:!1,index:[],sentence:""},e.selectWord=function(t,a){e.state.index.includes(a)?e.setState({index:e.state.index.filter((function(e){return e!==a}))}):e.setState({index:[].concat(Object(g.a)(e.state.index),[a])})},e.textRenderer=function(){return e.state.sentence.split(" ").map((function(t,a){return r.a.createElement("span",{className:"wordWrapper",key:a,onClick:function(){return e.selectWord(t,a)},style:e.state.index.includes(a)?{background:"#028090",color:"#E4FDE1"}:{background:"none"}},t," ")}))},e.handleSubmit=function(t){if(e.state.index.length>0){var a=e.state.sentence.split(" ").filter((function(t,a){return e.state.index.includes(a)}));e.setState({loading:!0}),e.props.saveWords(a);var n=e.state,r=n.sentence,s=n.index;console.log({sentence:r,index:s}),S.a.post(v+"/lemmatisation",{sentence:r,index:s},f).then((function(t){console.log("Post request response",t.data),e.setState({loading:!1}),e.props.saveResults(t.data)}),(function(t){console.log("Error"),e.props.setError(t.response)})).then((function(){e.props.history.push("/results")}))}},e.handleBack=function(){e.props.history.push("/")},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){""===this.props.inputText?this.props.history.push("/"):(this.setState({sentence:this.props.inputText}),console.log(this.props))}},{key:"render",value:function(){return this.state.loading?r.a.createElement(y.a,{size:150,color:"#F45B69",loading:this.state.loading}):r.a.createElement("div",{className:"ui markerField"},r.a.createElement("div",{className:"submitMarker"},r.a.createElement("div",{className:"backBtnContainer"},r.a.createElement("span",{className:"goBackBtn",onClick:this.handleBack},"\ud83e\udc44 BACK")),r.a.createElement("div",{className:"submitBtnContainer"},r.a.createElement("span",{className:"submitMarkerText",onClick:this.handleSubmit},"GO \ud83e\udc46"))),r.a.createElement("div",{className:"ui markerFieldText"},this.textRenderer()))}}]),a}(r.a.Component),C=Object(p.b)((function(e){return{inputText:e.inputText}}),{saveResults:function(e){return console.log("Saving results to store..."),{type:"SAVE_RESULTS",payload:e}},setError:function(e){return console.log(e),{type:"SET_ERROR",payload:e}},saveWords:function(e){return{type:"SAVE_WORDS",payload:e}}})(N),k=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).fakeResults=[["origin0","translated"],["origin1","translated"],["origin2","translated"],["origin3","translated"],["origin4","translated"],["origin5","translatdddded"],["origin6","translated"],["origin7","translated"],["origin8","translated"],["origin9","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"],["origin0","translated"]],e.state={results:null,error:null,errorSet:!1,dontShow:[],loading:!1,invalid:!1},e.handleClick=function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};e.state.dontShow.includes(a.id)?e.state.dontShow.includes(a.id)&&e.setState({dontShow:e.state.dontShow.filter((function(e){return e!==a.id}))}):e.setState({dontShow:[].concat(Object(g.a)(e.state.dontShow),[a.id])})},e.handleSubmit=function(){console.log(e.state.results.length);var t=e.state.results.filter((function(t){return!e.state.dontShow.includes(t[2])||0===t[0].length||0===t[1].length}));console.log("PRECSV",t),e.setState({loading:!0});var a=t.map((function(e){return[e[0],e[1]]}));e.props.saveCSV(a),e.setState({loading:!1}),e.props.history.push("/finaloptions")},e.handleChange=function(t,a,n){e.setState({fakeResults:e.state.results.map((function(e,r){return r===t?(e[a]=n.target.value,e):e}))})},e.renderError=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Error: ",e.state.error.status),r.a.createElement("p",null,e.state.error.statusText))},e.renderResults=function(){return e.state.results.map((function(t,a){return r.a.createElement("div",{className:"lemmaList",key:t[2],style:e.state.dontShow.includes(t[2])||0===t[0].length||0===t[1].length?{backgroundColor:"#f5f5f5"}:{display:"grid"}},r.a.createElement("div",{className:"wordResult",style:e.state.dontShow.includes(t[2])||0===t[0].length||0===t[1].length?{textDecoration:"line-through"}:{textDecoration:"none"}},r.a.createElement("input",{className:"txtF originalText",type:"text",value:e.state.results[a][0],onChange:function(t){return e.handleChange(a,0,t)}}),r.a.createElement("input",{className:"txtF translatedText",type:"text",value:e.state.results[a][1],onChange:function(t){return e.handleChange(a,1,t)}})),r.a.createElement("div",{className:"lemmaBtn delete",name:"delete",onClick:function(a){return e.handleClick(a,{id:t[2]})},style:e.state.dontShow.includes(t[2])?{color:"black"}:{color:"red"}},e.state.dontShow.includes(t[2])?"UNDO":"DELETE"))}))},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){null===this.props.results&&null===this.props.errors?this.props.history.push("/"):null===this.props.errors?(console.log("Results in Resultsjs",this.props.results),console.log("Words selected:",this.props.words),this.setState({results:this.props.results.word_list})):(console.log(this.props.errors),this.setState({error:this.props.errors,errorSet:!0}))}},{key:"render",value:function(){return this.state.loading?r.a.createElement(y.a,{size:150,color:"#F45B69",loading:this.state.loading}):this.state.errorSet?this.renderError():this.state.results?r.a.createElement("div",{className:"ui lemmaContainer"},r.a.createElement("div",{onClick:this.handleSubmit,className:"finalSubmitBtnContainer"},r.a.createElement("span",{className:"finalSubmitBtn"},"GO \ud83e\udc46")),r.a.createElement("div",{className:"lemmaListWrapper"},r.a.createElement("div",{className:"lemmaListWrap"},this.renderResults()))):r.a.createElement("div",null,"..")}}]),a}(r.a.Component),w=Object(p.b)((function(e){return{results:e.results,errors:e.errors,words:e.words}}),{saveCSV:function(e){return{type:"SAVE_CSV",payload:e}}})(k),T=a(41),O=a(42),R=function(e){Object(d.a)(a,e);var t=Object(m.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),l=0;l<n;l++)s[l]=arguments[l];return(e=t.call.apply(t,[this].concat(s))).state={username:"",password:"",csvData:[],loading:!1,quizletURL:""},e.createCSV=function(){},e.handleChange=function(t){t.preventDefault();var a=t.target,n=a.name,r=a.value;console.log(e.state),e.setState(Object(T.a)({},n,r))},e.handleSubmit=function(t){t.preventDefault(),console.log(e.state.username),console.log(e.state.password);var a=e.state;a.password,a.username,a.csvData;e.setState({loading:!0}),setTimeout((function(){return e.setState({loading:!1,quizletURL:"https://www.hhhhhhahahahahahaha.com"})}),3e4)},e.renderForm=function(){return e.state.loading?r.a.createElement("div",{className:"quizletLoad"},r.a.createElement(y.a,{size:200,color:"#F45B69",loading:e.state.loading})):r.a.createElement("form",{action:"submit",onSubmit:e.handleSubmit},r.a.createElement("div",{className:"quizletLogo"},r.a.createElement("div",{className:"boxOne"}),r.a.createElement("div",{className:"boxTwo"},"+"),r.a.createElement("div",{className:"quizletText"},"Quizlet")),r.a.createElement("div",{className:"quizletFormContainer"},r.a.createElement("div",null,r.a.createElement("label",{className:"quizletFormText",for:"username"},"Username:"),r.a.createElement("input",{className:"quizletFormTextBox",type:"text",value:e.state.username,name:"username",onChange:e.handleChange})),r.a.createElement("div",null,r.a.createElement("label",{className:"quizletFormText",for:"pass"},"Password:"),r.a.createElement("input",{className:"quizletFormTextBox",type:"password",required:!0,value:e.state.password,name:"password",onChange:e.handleChange})),r.a.createElement("input",{className:"quizletFormSubmit",type:"submit",value:"Sign in"})))},e.renderURL=function(){return e.state.loading?r.a.createElement("div",{className:"quizletLoad"},r.a.createElement(y.a,{size:200,color:"#F45B69",loading:e.state.loading})):r.a.createElement("div",{className:"quizletURLContainer"},r.a.createElement("a",{href:e.state.quizletURL,target:"_blank",className:"quizletURL"},"quizletCards"))},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){this.setState({csvData:this.props.csvElements})}},{key:"render",value:function(){return this.state.csvData.length>0?r.a.createElement("div",{className:"ui finalOptionsContainer"},r.a.createElement(O.CSVLink,{data:this.state.csvData,className:"csvContainer"},r.a.createElement("div",{className:"csvicon"},r.a.createElement("p",{className:"csvicontextcontainer"},r.a.createElement("span",{className:"csvicontext"},"CSV"))),r.a.createElement("div",{className:"csvDownload"},"Download")),r.a.createElement("div",{className:"quizletContainer"},""!==this.state.quizletURL?this.renderURL():this.renderForm()),r.a.createElement(o.b,{to:"/",className:"homeLink"},"Home")):r.a.createElement("div",null,r.a.createElement(o.b,{to:"/",className:"homeLink"},"Home"))}}]),a}(r.a.Component),j=Object(p.b)((function(e){return{csvElements:e.csvElements}}),null)(R),z=function(){return r.a.createElement("div",null,r.a.createElement(o.a,null,r.a.createElement("div",{className:"appContainer"},r.a.createElement(i.a,{path:"/",exact:!0,component:E}),r.a.createElement(i.a,{path:"/marker",exact:!0,component:C}),r.a.createElement(i.a,{path:"/results",exact:!0,component:w}),r.a.createElement(i.a,{path:"/finaloptions",exact:!0,component:j}))))},D=(a(77),a(15)),F=Object(D.b)({inputText:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INPUT_TEXT":return t.payload;default:return e}},results:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_RESULTS":return t.payload;default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_ERROR":return t.payload;default:return e}},words:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SAVE_WORDS":return t.payload;default:return e}},csvElements:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(console.log(t),t.type){case"SAVE_CSV":return t.payload;default:return e}}}),q=Object(D.c)(F);l.a.render(r.a.createElement(p.a,{store:q},r.a.createElement(z,null)),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.91cb9ce9.chunk.js.map