import{j as f}from"./context-73c790cf.js";import l,{useState as r,useEffect as b,useReducer as A,useCallback as v,useMemo as x}from"react";function P(t,s){const[n,o]=r(()=>{if(typeof window<"u"&&window.sessionStorage){const e=sessionStorage.getItem(t);return e!==null&&e!=="undefined"?JSON.parse(e):s}return s});return b(()=>{if(typeof window>"u"||!window.sessionStorage)return;const e=()=>{sessionStorage.setItem(t,JSON.stringify(n))};return window.addEventListener("beforeunload",e),()=>{window.removeEventListener("beforeunload",e)}},[n,t]),[n,o]}function E(t,s,n){const[o,e]=A(s,n,a=>{if(typeof window<"u"&&window.sessionStorage){const d=sessionStorage.getItem(t);return d!==null&&d!=="undefined"?JSON.parse(d):a}return a});return b(()=>{if(typeof window>"u"||!window.sessionStorage)return;const a=()=>{sessionStorage.setItem(t,JSON.stringify(o))};return window.addEventListener("beforeunload",a),()=>{window.removeEventListener("beforeunload",a)}},[o,t]),[o,e]}const I=l.createContext({chatList:[],addChat:()=>({}),clearChat:()=>({})}),H=(t,s)=>{switch(s.type){case"add":{const n=Array.isArray(s.payload)?s.payload:[s.payload];return[...t,...n.map((o,e)=>({id:(t.length+e).toString(),...o}))]}case"clear":return[];default:return t}},R=({children:t})=>{const[s,n]=E("uikit-assistant-chat-history",H,[]),{username:o}=F(),e=v(i=>{const c=(Array.isArray(i)?i:[i]).map(u=>({...u,name:u.type==="human"?o:u.name}));n({type:"add",payload:c})},[n]),a=v(()=>{n({type:"clear",payload:[]})},[n]),d=x(()=>({chatList:s,addChat:e,clearChat:a}),[s,e,a]);return f(I.Provider,{value:d,children:t})},T=()=>l.useContext(I),L=l.createContext({username:"David",selectedCompanion:"Configuration Sentinel",tabId:0,loading:!1,sessionId:"",selectedFiles:[],title:"New Chat",history:!1,newChat:!1,setSelectedCompanion:()=>({}),setLoading:()=>({}),setTabId:()=>({}),setSessionId:()=>({}),setSelectedFiles:()=>({}),setTitle:()=>({}),setHistory:()=>({}),setNewChat:()=>({})}),j=({children:t})=>{const s="David",[n,o]=r("Configuration Sentinel"),[e,a]=r(!1),[d,i]=r(0),[c,u]=r(""),[C,w]=r([]),[h,S]=r("New Chat"),[p,y]=r(!1),[m,g]=r(!1),N=x(()=>({username:s,selectedCompanion:n,setSelectedCompanion:o,loading:e,setLoading:a,tabId:d,setTabId:i,sessionId:c,setSessionId:u,selectedFiles:C,setSelectedFiles:w,title:h,setTitle:S,history:p,setHistory:y,newChat:m,setNewChat:g}),[s,n,o,e,a,d,i,c,u,C,w,h,S,p,y,m,g]);return f(L.Provider,{value:N,children:f(R,{children:t})})},F=()=>l.useContext(L);export{j as C,F as a,T as b,P as u};
