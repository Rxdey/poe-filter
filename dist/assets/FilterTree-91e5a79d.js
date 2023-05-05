import{_ as y,n as b,o as d,c as _,a as f,t as S,g as $,s as C,u as A,e as j,j as P,h as w,v as E}from"./index-1d1db870.js";const T=(c="")=>{var u;const r=c.split(/\n/),n=r.splice(0,1)[0],e=r.reduce((l,a)=>{const h=a.search('"')>-1?a.replace(/#.*/,"").trim().split(/\s"/):a.replace(/#.*/,"").trim().split(/\s/),g=h.splice(0,1);return l[g[0]]=h.flat().join(",").replace(/\"/g,""),l},{}),s={};Object.keys(e).map(l=>{if(["SetBackgroundColor","SetBorderColor","SetTextColor"].includes(l)){const a=e[l].split(",");a.length===4?a[3]=Math.floor(a[3]/255*100)/100:a.push(1),s[l]=`rgba(${a.join(",")})`;return}if(["SetFontSize"].includes(l)){s[l]=parseInt(e[l]);return}if(["DisableDropSound"].includes(l)){s[l]=!0;return}if(["MinimapIcon"].includes(l)){const a=e[l].split(",");s[l]={size:a[0]||"",color:a[1]||"",shape:a[2]||"",show:!0};return}if(["PlayEffect"].includes(l)){const a=e[l].split(",");s[l]={Colour:a[0]||"",Temp:!!a[1],show:!0};return}if(["CustomAlertSound"].includes(l)){const a=e[l].split(" ");s[l]={path:a[0],vol:a[1]||"300"};return}return s[l]=e[l]}),s.PlayEffect||(s.PlayEffect={Colour:"White",Temp:!1,show:!1}),s.MinimapIcon||(s.MinimapIcon={size:2,color:"White",shape:"Circle",show:!1});const t=(((u=r.find(l=>l.search("SetTextColor")>-1))==null?void 0:u.split("#")[1])||"").trim(),o=n.split(/[#|-]/).map(l=>l.trim());return o.length===1&&o.push(t),{...{status:o[0].trim()==="Show",label:o[o.length-1],disabled:o[o.length-1].endsWith("*"),deepLevel:o.length-1,titleArr:o.length>=3?o.slice(1,o.length-1):o.slice(1,2)},...s}},m=c=>{const r=[];if(!Array.isArray(c))return r;const n={};return c.forEach(e=>{n[e.id]=e}),c.forEach((e,s)=>{let t=n[e.pid];t?(t.children||(t.children=[])).push(e):r.push(e)}),r},p=(c,r="")=>{const n=[];return!Array.isArray(c)||!c.length||c.forEach((e,s)=>{const t=n.findIndex(i=>i.label===e.label),o=`${r?r+"-":""}${s}`;t>-1?n[t].children=p([...n[t].children||[],...e.children||[]],n[t].id):n.push({...e,id:o,pid:r,children:e.children?p(e.children,o):null})}),n},x=c=>{const r=c.map(n=>{const e=n.titleArr.map((s,t)=>{const o={label:s,id:t,pid:t>0?t-1:""};return t===n.titleArr.length-1&&(o.children=[n]),o});return m(e)[0]});return p(r)},F=(c="")=>{const r=c.replace(/\r/g,"").split(/\n\n/).filter(n=>n&&/^[Show|Hide]/.test(n)).map(n=>T(n));return x(r)},O=(c=[])=>c.reduce((r,n)=>(r||(r=[]),n.children?r.push(...O(n.children)):r.push(n),r),[]),W=(c=[])=>{const r=["titleArr","status","id","pid","className","disabled","label","children","deepLevel"];return c.map(n=>Object.keys(n).reduce((e,s)=>{if(r.includes(s))return e;const t=n[s];if(!e){const i=n.status?"Show":"Hide",u=JSON.parse(JSON.stringify(n.titleArr));return n.label&&u.push(n.label),e=`${i} # ${u.join(" - ")}
`,e}if(s==="BaseType"&&!t)return e;if(!t||s==="DisableDropSound")return e+=`    ${s}
`,e;if(s==="MinimapIcon")return delete t.show,e+=`    ${s} ${Object.keys(t).map(i=>t[i]).join(" ")}
`,e;if(s==="PlayEffect")return t.show&&(console.log(t.Temp),e+=`    ${s} ${t.Colour}${t.Temp?" Temp":""}
`),e;if(Array.isArray(t))return e+=`    ${s} ${t.join(" ")}
`,e;if(s==="CustomAlertSound")return e+=`    ${s} "${t.path}" ${t.vol}
`,e;if(s.endsWith("Color")){const i=t.match(/rgba\((.*)?\)/)[1].split(",");return i[i.length-1]=Math.floor(i[i.length-1]*255),e+=`    ${s} ${i.join(" ").trim()}
`,e}const o=typeof t=="number"?t:t.split(",").join(" ").trim();return e+=`    ${s} ${o}
`,e},"")).join(`
`)};const B={class:"StylePrview"},I={class:"card"},D={key:0,class:"playEffect"},L={__name:"StylePrview",props:{config:{type:Object,default:()=>({})},label:{type:String,default:""}},setup(c){const r=c,n=b(()=>e(r.config)),e=t=>{if(!t)return;const o=["SetBackgroundColor","SetFontSize","SetBorderColor","SetTextColor"],i={};return Object.keys(t).forEach(u=>{if(["SetFontSize"].includes(u)){i[`--${u}`]=`${t[u]*.7}px`;return}["PlayEffect"].includes(u)&&(i["--PlayEffectColour"]=t.PlayEffect.Colour),o.includes(u)&&(i[`--${u}`]=t[u])}),i},s=t=>t.replace("*","");return(t,o)=>(d(),_("div",B,[f("div",{class:"preview",style:C(A(n))},[f("div",I,S(s(r.label)),1),r.config.PlayEffect&&r.config.PlayEffect.show?(d(),_("div",D)):$("",!0)],4)]))}},H=y(L,[["__scopeId","data-v-ecfa40d6"]]),M={class:"custom-tree-node"},z=f("span",null,null,-1),J={__name:"FilterTree",props:{data:{type:Array,default:()=>[]},defaultProps:{type:Object,default:()=>({children:"children",label:"label",class:"customTree"})}},setup(c){const r=c;return(n,e)=>{const s=j("el-tree");return d(),P(s,E({ref:"treeRef",data:r.data,props:r.defaultProps,"node-key":"id","show-checkbox":"","highlight-current":"",indent:8,"empty-text":""},n.$attrs),{default:w(({node:t,data:o})=>[f("span",M,[f("span",null,S(t.label),1),z])]),_:1},16,["data","props"])}}};export{H as S,J as _,O as a,W as c,F as f};
