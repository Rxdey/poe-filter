import{_ as D,g as I,r as M}from"./Load-cc4c7cf8.js";import{S as R,_ as L,f as z,a as j}from"./FilterTree-91e5a79d.js";import{d as J,r,w as N,b as U,e as p,o as i,c as g,a as e,f as n,u as k,t as A,g as P,F as T,h as b,i as O,j as x,k as S,_ as B,p as q,l as G,m as W,E as Y}from"./index-1d1db870.js";const H=J("filter",{state:()=>({filterData:null}),actions:{UPDATE_FILTER_DATA(_){this.filterData=_}},getters:{}}),K=["Red","Green","Blue","Brown","White","Yellow","Cyan","Grey","Orange","Pink","Purple"],F=["rgba(255,255,255,1)","rgba(0,0,0,1)","rgba(255,40,0,.9)","rgba(153, 63, 131, 1)","rgba(255, 0, 255, 1)","rgba(255, 128, 192, 1)","rgba(127, 235, 48, 1)","rgba(242, 222, 179, 1)","rgba(170, 158, 130, 1)","rgba(27, 162, 155, 1)","rgba(29, 255, 149, 0.88)"];const Q={class:"filter-prview"},X={class:"style-wrap"},Z={class:"style-card"},ee={class:"config-card"},le={class:"form-wrap"},te={class:"form-item"},ae={class:"field"},oe=e("div",{class:"form-label"},"字体大小",-1),se={class:"form-item"},ne=e("div",{class:"form-label"},"文字颜色",-1),de={class:"form-item"},ce=e("div",{class:"form-label"},"背景颜色",-1),re={class:"form-item"},ie=e("div",{class:"form-label"},"边框颜色",-1),ue={key:0,class:"form-item"},_e={class:"form-label"},fe={class:"form-item"},pe=e("div",{class:"form-label"},[S("光柱颜色"),e("span",{class:"tip"},"(样式不准确)")],-1),ve={class:"form-item"},me=e("div",{class:"form-label"},[S("光柱持续可见"),e("span",{class:"tip"},"(一般不动它)")],-1),he={__name:"FilterPrview",props:{data:{type:Object,default:()=>({})}},setup(_){const s=_,l=r({SetBackgroundColor:"",SetBorderColor:"",SetFontSize:25,SetTextColor:""}),u=r(null);return N(()=>s.data,f=>{l.value=f,f.id!==u.value.id&&(u.value=JSON.parse(JSON.stringify(s.data)))}),U(()=>{l.value=s.data,u.value=JSON.parse(JSON.stringify(s.data))}),(f,a)=>{const v=p("el-slider"),y=p("el-color-picker"),m=p("el-switch"),d=p("el-option"),o=p("el-select");return i(),g("div",Q,[e("div",X,[e("div",Z,[n(R,{config:l.value,label:s.data.label},null,8,["config","label"])]),e("div",ee,[e("div",le,[e("div",te,[e("div",ae,[n(v,{modelValue:l.value.SetFontSize,"onUpdate:modelValue":a[0]||(a[0]=t=>l.value.SetFontSize=t),min:1,max:45},null,8,["modelValue"])]),oe]),e("div",se,[n(y,{modelValue:l.value.SetTextColor,"onUpdate:modelValue":a[1]||(a[1]=t=>l.value.SetTextColor=t),"show-alpha":"",predefine:k(F)},null,8,["modelValue","predefine"]),ne]),e("div",de,[n(y,{modelValue:l.value.SetBackgroundColor,"onUpdate:modelValue":a[2]||(a[2]=t=>l.value.SetBackgroundColor=t),"show-alpha":"",predefine:k(F)},null,8,["modelValue","predefine"]),ce]),e("div",re,[n(y,{modelValue:l.value.SetBorderColor,"onUpdate:modelValue":a[3]||(a[3]=t=>l.value.SetBorderColor=t),"show-alpha":"",predefine:k(F)},null,8,["modelValue","predefine"]),ie]),l.value.PlayEffect?(i(),g("div",ue,[n(m,{modelValue:l.value.PlayEffect.show,"onUpdate:modelValue":a[4]||(a[4]=t=>l.value.PlayEffect.show=t),style:{"--el-switch-on-color":"#f56c6c","--el-switch-off-color":"#555968"}},null,8,["modelValue"]),e("div",_e,A(l.value.PlayEffect.show?"移除光柱":"添加光柱"),1)])):P("",!0),l.value.PlayEffect&&l.value.PlayEffect.show?(i(),g(T,{key:1},[e("div",fe,[n(o,{modelValue:l.value.PlayEffect.Colour,"onUpdate:modelValue":a[5]||(a[5]=t=>l.value.PlayEffect.Colour=t),placeholoder:"光柱颜色"},{default:b(()=>[(i(!0),g(T,null,O(k(K),t=>(i(),x(d,{key:t,label:t,value:t},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),pe]),e("div",ve,[n(m,{modelValue:l.value.PlayEffect.Temp,"onUpdate:modelValue":a[6]||(a[6]=t=>l.value.PlayEffect.Temp=t),style:{"--el-switch-on-color":"#f56c6c","--el-switch-off-color":"#555968"}},null,8,["modelValue"]),me])],64)):P("",!0)])])])])}}};const ye={class:"AddPanel"},ge={class:"child-class"},be=e("label",null,"分类名称",-1),Se={__name:"AddPanel",props:{addPanelType:{type:Number,default:0}},setup(_){const s=r({label:""});return(l,u)=>{const f=p("el-input");return i(),g("div",ye,[e("div",ge,[be,n(f,{modelValue:s.value.label,"onUpdate:modelValue":u[0]||(u[0]=a=>s.value.label=a),placeholder:"请输入分类名称"},null,8,["modelValue"])])])}}};const Ve=_=>(q("data-v-a9c5ad8b"),_=_(),G(),_),we={class:"FilterMain"},Ce={class:"filter-title"},ke=Ve(()=>e("span",null,"- 分类",-1)),Pe={class:"children-list"},xe={class:"add-panel"},Ee={__name:"FilterMain",props:{data:{type:Object,default:()=>({})}},setup(_){const s=_,l=r([]),u=r(!1),f=r(0),a=d=>{let o=0;if(d.length===0)return o;for(let t=0;t<d.length;t++){const w=d.charCodeAt(t);o=(o<<5)-o+w,o=o&o}return Math.abs(o)%11},v=(d=0)=>["#f56c6c","#ff4301","#89c9b8","#a37eba","#46cdcf","#f6416c","#776d8a","#a35d6a","#febf63","#393e46","#e36387","#1b6ca8","#7c3c21","#45046a"][a(d.toString())],y=()=>{},m=d=>{f.value=d,u.value=!0};return U(()=>{l.value=s.data.children}),N(()=>s.data,d=>{d&&d.children?l.value=d.children:l.value=[]}),(d,o)=>{const t=p("el-tag"),w=p("el-popconfirm");return i(),g("div",we,[e("div",Ce,[S(A(s.data.label)+" ",1),ke]),e("div",Pe,[(i(!0),g(T,null,O(l.value,(c,h)=>(i(),x(t,{key:c.id,effect:"dark",color:v(h),round:"",size:"large",closable:!c.disabled,hit:!1,onClose:y,class:"chl-tag"},{default:b(()=>[S(A(c.label),1)]),_:2},1032,["color","closable"]))),128)),n(w,{title:"请选择添加类型","confirm-button-text":"添加子分类","cancel-button-text":"添加过滤选项","cancel-button-type":"danger","confirm-button-type":"danger",width:"220",icon:"StarFilled","hide-after":100,onConfirm:o[0]||(o[0]=c=>m(0)),onCancel:o[1]||(o[1]=c=>m(1))},{reference:b(()=>[n(t,{effect:"plain",type:"info",round:"",size:"large",class:"chl-tag add-tag"},{default:b(()=>[S(" + 添加 ")]),_:1})]),_:1})]),e("div",xe,[n(Se,{addPanelType:f.value},null,8,["addPanelType"])])])}}},Te=B(Ee,[["__scopeId","data-v-a9c5ad8b"]]);const $e={class:"home"},Fe={class:"tool-bar"},Ae={class:"card-wrap"},Ue={class:"card-aside"},Ne={class:"card-main"},Oe={class:"tip"},Be={__name:"filter",setup(_){const s=H(),l=r(null),u=r(null),f=r([]),a=r(null),v=r(null),y=r(!1),m=r(""),d=c=>{if("status"in c){v.value=null,a.value=c;return}a.value=null,v.value=c,console.log(c)},o=async c=>{const h=c.target.files[0];if(I(h.name)!=="filter"){Y.error("请选择.filter格式文件"),document.querySelector("#file").value="";return}const E=await M(h),V=z(E);console.log(V),a.value=null,v.value=null,m.value="",u.value=V,console.log(s),await s.UPDATE_FILTER_DATA(V),f.value=j(V).filter(C=>C.status).map(C=>C.id)},t=()=>{document.querySelector("#file").value="",l.value&&l.value.click()},w=()=>{};return W(()=>{s.UPDATE_FILTER_DATA(null)}),U(()=>{}),(c,h)=>{const E=p("el-button"),V=p("el-input"),C=p("el-dialog");return i(),g(T,null,[e("div",$e,[e("div",Fe,[n(E,{round:"",plain:"",onClick:t},{default:b(()=>[S("导入过滤")]),_:1}),n(E,{round:"",type:"danger",plain:"",disabled:!u.value,onClick:w},{default:b(()=>[S("保存")]),_:1},8,["disabled"])]),e("div",Ae,[e("div",Ue,[n(L,{data:k(s).filterData,"default-checked-keys":f.value,onNodeClick:d},null,8,["data","default-checked-keys"]),u.value?P("",!0):(i(),x(D,{key:0},{default:b(()=>[S("请先导入")]),_:1}))]),e("div",Ne,[a.value?(i(),x(he,{key:0,data:a.value},null,8,["data"])):P("",!0),v.value?(i(),x(Te,{key:1,data:v.value},null,8,["data"])):P("",!0)])]),e("input",{type:"file",id:"file",onChange:o,hidden:"",ref_key:"inputRef",ref:l},null,544)]),n(C,{modelValue:y.value,"onUpdate:modelValue":h[1]||(h[1]=$=>y.value=$),title:"不想写了，请自行复制替换",class:"update-card-dialog"},{default:b(()=>[e("div",Oe,[n(V,{modelValue:m.value,"onUpdate:modelValue":h[0]||(h[0]=$=>m.value=$),rows:20,type:"textarea",readonly:""},null,8,["modelValue"])])]),_:1},8,["modelValue"])],64)}}},Re=B(Be,[["__scopeId","data-v-effff551"]]);export{Re as default};