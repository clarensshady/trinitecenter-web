import{u as xs,W as ms,t as ye,d as us,$ as we,a as ps,b as R,c as hs,r as p,e as fs,f as bs,g as Ae,h as X,i as De,k as Se,o as js,l as re,m as v,n as _e,p as be,q as Be,s as Z,j as e,C as je,L as ge,v as Ne,w as ve,A as gs,T as Ce,R as T,x as Ns,y as vs,z as Cs,B as Ps,D as Fe,E as ys,F as ws,G as As,H as k,I as me,J as Ds,K as ue,M as oe,N as Ss,P as q,Q as g,S as C,U as Ie,V as Te,X as $e,Y as Me,Z as ke,_ as Ke,a0 as Le,a1 as Oe,a2 as Ve,a3 as _s,a4 as Bs,a5 as Fs,a6 as Is,a7 as Ts,a8 as $s,a9 as Ms,aa as ks,ab as Ks,ac as Ls,ad as Os,ae as Vs,af as Es,ag as Rs,ah as Us,ai as Hs,aj as Pe,ak as Ws,al as Ee,am as zs,an as Gs,ao as qs,ap as Js,aq as Qs,O as Ys,ar as Xs,as as Zs,at as et}from"./index-DeD_ULMO.js";function st(){return xs(()=>new ms("auto"))}var tt=ye({base:"px-2",variants:{variant:{light:"",shadow:"px-4 shadow-medium rounded-medium bg-content1",bordered:"px-4 border-medium border-divider rounded-medium",splitted:"flex flex-col gap-2"},fullWidth:{true:"w-full"}},defaultVariants:{variant:"light",fullWidth:!0}}),at=ye({slots:{base:"",heading:"",trigger:["flex py-4 w-full h-full gap-3 outline-none items-center tap-highlight-transparent",...us],startContent:"flex-shrink-0",indicator:"text-default-400",titleWrapper:"flex-1 flex flex-col text-start",title:"text-foreground text-large",subtitle:"text-small text-foreground-500 font-normal",content:"py-2"},variants:{variant:{splitted:{base:"px-4 bg-content1 shadow-medium rounded-medium"}},isCompact:{true:{trigger:"py-2",title:"text-medium",subtitle:"text-small",indicator:"text-medium",content:"py-1"}},isDisabled:{true:{base:"opacity-disabled pointer-events-none"}},hideIndicator:{true:{indicator:"hidden"}},disableAnimation:{true:{content:"hidden data-[open=true]:block"},false:{indicator:"transition-transform",trigger:"transition-opacity"}},disableIndicatorAnimation:{true:{indicator:"transition-none"},false:{indicator:"rotate-0 data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90"}}},defaultVariants:{size:"md",radius:"lg",isDisabled:!1,hideIndicator:!1,disableIndicatorAnimation:!1}});function nt(t,s){let{elementType:n="button",isDisabled:o,onPress:x,onPressStart:r,onPressEnd:l,onPressUp:c,onPressChange:h,preventFocusOnPress:b,allowFocusWhenDisabled:j,onClick:a,href:f,target:m,rel:i,type:N="button"}=t,A;n==="button"?A={type:N,disabled:o}:A={role:"button",tabIndex:o?void 0:0,href:n==="a"&&o?void 0:f,target:n==="a"?m:void 0,type:n==="input"?N:void 0,disabled:n==="input"?o:void 0,"aria-disabled":!o||n==="input"?void 0:o,rel:n==="a"?i:void 0};let{pressProps:D,isPressed:u}=we({onPressStart:r,onPressEnd:l,onPressChange:h,onPress:x,onPressUp:c,isDisabled:o,preventFocusOnPress:b,ref:s}),{focusableProps:y}=ps(t,s);j&&(y.tabIndex=o?-1:y.tabIndex);let K=R(y,D,hs(t,{labelable:!0}));return{isPressed:u,buttonProps:R(A,K,{"aria-haspopup":t["aria-haspopup"],"aria-expanded":t["aria-expanded"],"aria-controls":t["aria-controls"],"aria-pressed":t["aria-pressed"],onClick:I=>{a&&(a(I),console.warn("onClick is deprecated, please use onPress"))}})}}function lt(t,s,n){let{item:o,isDisabled:x}=t,r=o.key,l=s.selectionManager,c=p.useId(),h=p.useId(),b=s.disabledKeys.has(o.key)||x;p.useEffect(()=>{r===s.focusedKey&&document.activeElement!==n.current&&n.current&&fs(n.current)},[n,r,s.focusedKey]);let j=p.useCallback(N=>{l.canSelectItem(r)&&(l.select(r,N),s.toggleKey(r))},[r,l]);const a=p.useCallback(N=>{l.selectionBehavior==="replace"&&l.extendSelection(N),l.setFocusedKey(N)},[l]),f=p.useCallback(N=>{const D={ArrowDown:()=>{const u=s.collection.getKeyAfter(r);if(u&&s.disabledKeys.has(u)){const y=s.collection.getKeyAfter(u);y&&a(y)}else u&&a(u)},ArrowUp:()=>{const u=s.collection.getKeyBefore(r);if(u&&s.disabledKeys.has(u)){const y=s.collection.getKeyBefore(u);y&&a(y)}else u&&a(u)},Home:()=>{const u=s.collection.getFirstKey();u&&a(u)},End:()=>{const u=s.collection.getLastKey();u&&a(u)}}[N.key];D&&(N.preventDefault(),l.canSelectItem(r)&&D(N))},[r,l]);let{buttonProps:m}=nt({id:c,elementType:"button",isDisabled:b,onKeyDown:f,onPress:j},n),i=s.selectionManager.isSelected(o.key);return{buttonProps:{...m,"aria-expanded":i,"aria-controls":i?h:void 0},regionProps:{id:h,role:"region","aria-labelledby":c}}}function ot(t,s,n){let{listProps:o}=bs({...t,...s,allowsTabNavigation:!0,disallowSelectAll:!0,ref:n});return delete o.onKeyDownCapture,{accordionProps:{...o,tabIndex:void 0}}}function rt(t){var s,n;const o=Ae(),{ref:x,as:r,item:l,onFocusChange:c}=t,{state:h,className:b,indicator:j,children:a,title:f,subtitle:m,startContent:i,motionProps:N,focusedKey:A,variant:D,isCompact:u=!1,classNames:y={},isDisabled:K=!1,hideIndicator:I=!1,disableAnimation:B=(s=o==null?void 0:o.disableAnimation)!=null?s:!1,keepContentMounted:V=!1,disableIndicatorAnimation:L=!1,HeadingComponent:U=r||"h2",onPress:$,onPressStart:O,onPressEnd:G,onPressChange:H,onPressUp:Q,onClick:ee,...W}=t,se=r||"div",Y=typeof se=="string",z=X(x),P=h.disabledKeys.has(l.key)||K,w=h.selectionManager.isSelected(l.key),{buttonProps:te,regionProps:ae}=lt({item:l,isDisabled:P},{...h,focusedKey:A},z),{onFocus:M,onBlur:ie,...ce}=te,{isFocused:de,isFocusVisible:xe,focusProps:F}=De({autoFocus:(n=l.props)==null?void 0:n.autoFocus}),{isHovered:E,hoverProps:ne}=Se({isDisabled:P}),{pressProps:le,isPressed:ss}=we({ref:z,isDisabled:P,onPress:$,onPressStart:O,onPressEnd:G,onPressChange:H,onPressUp:Q}),ts=p.useCallback(()=>{c==null||c(!0,l.key)},[]),as=p.useCallback(()=>{c==null||c(!1,l.key)},[]),d=p.useMemo(()=>({...y}),[js(y)]),S=p.useMemo(()=>at({isCompact:u,isDisabled:P,hideIndicator:I,disableAnimation:B,disableIndicatorAnimation:L,variant:D}),[u,P,I,B,L,D]),pe=re(d==null?void 0:d.base,b),ns=p.useCallback((_={})=>({"data-open":v(w),"data-disabled":v(P),className:S.base({class:pe}),...R(_e(W,{enabled:Y}),_)}),[pe,Y,W,S,l.props,w,P]),ls=(_={})=>{var he,fe;return{ref:z,"data-open":v(w),"data-focus":v(de),"data-focus-visible":v(xe),"data-disabled":v(P),"data-hover":v(E),"data-pressed":v(ss),className:S.trigger({class:d==null?void 0:d.trigger}),onFocus:be(ts,M,F.onFocus,W.onFocus,(he=l.props)==null?void 0:he.onFocus),onBlur:be(as,ie,F.onBlur,W.onBlur,(fe=l.props)==null?void 0:fe.onBlur),...R(ce,ne,le,_,{onClick:Be(le.onClick,ee)})}},os=p.useCallback((_={})=>({"data-open":v(w),"data-disabled":v(P),className:S.content({class:d==null?void 0:d.content}),...R(ae,_)}),[S,d,ae,w,P,d==null?void 0:d.content]),rs=p.useCallback((_={})=>({"aria-hidden":v(!0),"data-open":v(w),"data-disabled":v(P),className:S.indicator({class:d==null?void 0:d.indicator}),..._}),[S,d==null?void 0:d.indicator,w,P,d==null?void 0:d.indicator]),is=p.useCallback((_={})=>({"data-open":v(w),"data-disabled":v(P),className:S.heading({class:d==null?void 0:d.heading}),..._}),[S,d==null?void 0:d.heading,w,P,d==null?void 0:d.heading]),cs=p.useCallback((_={})=>({"data-open":v(w),"data-disabled":v(P),className:S.title({class:d==null?void 0:d.title}),..._}),[S,d==null?void 0:d.title,w,P,d==null?void 0:d.title]),ds=p.useCallback((_={})=>({"data-open":v(w),"data-disabled":v(P),className:S.subtitle({class:d==null?void 0:d.subtitle}),..._}),[S,d,w,P,d==null?void 0:d.subtitle]);return{Component:se,HeadingComponent:U,item:l,slots:S,classNames:d,domRef:z,indicator:j,children:a,title:f,subtitle:m,startContent:i,isOpen:w,isDisabled:P,hideIndicator:I,keepContentMounted:V,disableAnimation:B,motionProps:N,getBaseProps:ns,getHeadingProps:is,getButtonProps:ls,getContentProps:os,getIndicatorProps:rs,getTitleProps:cs,getSubtitleProps:ds}}var Re=Z((t,s)=>{const{Component:n,HeadingComponent:o,classNames:x,slots:r,indicator:l,children:c,title:h,subtitle:b,startContent:j,isOpen:a,isDisabled:f,hideIndicator:m,keepContentMounted:i,disableAnimation:N,motionProps:A,getBaseProps:D,getHeadingProps:u,getButtonProps:y,getTitleProps:K,getSubtitleProps:I,getContentProps:B,getIndicatorProps:V}=rt({...t,ref:s}),L=st(),$=p.useMemo(()=>typeof l=="function"?l({indicator:e.jsx(je,{}),isOpen:a,isDisabled:f}):l||null,[l,a,f])||e.jsx(je,{}),O=p.useMemo(()=>{if(N)return e.jsx("div",{...B(),children:c});const G={exit:{...Ce.collapse.exit,overflowY:"hidden"},enter:{...Ce.collapse.enter,overflowY:"unset"}};return i?e.jsx(ge,{features:Ne,children:e.jsx(ve.section,{animate:a?"enter":"exit",exit:"exit",initial:"exit",style:{willChange:L},variants:G,onKeyDown:H=>{H.stopPropagation()},...A,children:e.jsx("div",{...B(),children:c})},"accordion-content")}):e.jsx(gs,{initial:!1,children:a&&e.jsx(ge,{features:Ne,children:e.jsx(ve.section,{animate:"enter",exit:"exit",initial:"exit",style:{willChange:L},variants:G,onKeyDown:H=>{H.stopPropagation()},...A,children:e.jsx("div",{...B(),children:c})},"accordion-content")})})},[a,N,i,c,A]);return e.jsxs(n,{...D(),children:[e.jsx(o,{...u(),children:e.jsxs("button",{...y(),children:[j&&e.jsx("div",{className:r.startContent({class:x==null?void 0:x.startContent}),children:j}),e.jsxs("div",{className:r.titleWrapper({class:x==null?void 0:x.titleWrapper}),children:[h&&e.jsx("span",{...K(),children:h}),b&&e.jsx("span",{...I(),children:b})]}),!m&&$&&e.jsx("span",{...V(),children:$})]})}),O]})});Re.displayName="NextUI.AccordionItem";var it=Re;function ct(t){var s;const n=Ae(),{ref:o,as:x,className:r,items:l,variant:c,motionProps:h,expandedKeys:b,disabledKeys:j,selectedKeys:a,children:f,defaultExpandedKeys:m,selectionMode:i="single",selectionBehavior:N="toggle",keepContentMounted:A=!1,disallowEmptySelection:D,defaultSelectedKeys:u,onExpandedChange:y,onSelectionChange:K,dividerProps:I={},isCompact:B=!1,isDisabled:V=!1,showDivider:L=!0,hideIndicator:U=!1,disableAnimation:$=(s=n==null?void 0:n.disableAnimation)!=null?s:!1,disableIndicatorAnimation:O=!1,itemClasses:G,...H}=t,[Q,ee]=p.useState(null),W=x||"div",se=typeof W=="string",Y=X(o),z=p.useMemo(()=>tt({variant:c,className:r}),[c,r]),w={children:p.useMemo(()=>{let F=[];return T.Children.map(f,E=>{var ne;if(T.isValidElement(E)&&typeof((ne=E.props)==null?void 0:ne.children)!="string"){const le=T.cloneElement(E,{hasChildItems:!1});F.push(le)}else F.push(E)}),F},[f]),items:l},te={expandedKeys:b,defaultExpandedKeys:m,onExpandedChange:y},ae={disabledKeys:j,selectedKeys:a,selectionMode:i,selectionBehavior:N,disallowEmptySelection:D,defaultSelectedKeys:u??m,onSelectionChange:K,...w,...te},M=Ns(ae);M.selectionManager.setFocusedKey=F=>{ee(F)};const{accordionProps:ie}=ot({...w,...te},M,Y),ce=p.useMemo(()=>({state:M,focusedKey:Q,motionProps:h,isCompact:B,isDisabled:V,hideIndicator:U,disableAnimation:$,keepContentMounted:A,disableIndicatorAnimation:O}),[Q,B,V,U,a,$,A,M==null?void 0:M.expandedKeys.values,O,M.expandedKeys.size,M.disabledKeys.size,h]),de=p.useCallback((F={})=>({ref:Y,className:z,"data-orientation":"vertical",...R(ie,_e(H,{enabled:se}),F)}),[]),xe=p.useCallback((F,E)=>{F&&ee(E)},[]);return{Component:W,values:ce,state:M,focusedKey:Q,getBaseProps:de,isSplitted:c==="splitted",classNames:z,showDivider:L,dividerProps:I,disableAnimation:$,handleFocusChanged:xe,itemClasses:G}}var Ue=Z((t,s)=>{const{Component:n,values:o,state:x,isSplitted:r,showDivider:l,getBaseProps:c,disableAnimation:h,handleFocusChanged:b,itemClasses:j,dividerProps:a}=ct({...t,ref:s}),f=p.useCallback((i,N)=>b(i,N),[b]),m=p.useMemo(()=>[...x.collection].map((i,N)=>{const A={...j,...i.props.classNames||{}};return e.jsxs(p.Fragment,{children:[e.jsx(it,{item:i,variant:t.variant,onFocusChange:f,...o,...i.props,classNames:A}),!i.props.hidden&&!r&&l&&N<x.collection.size-1&&e.jsx(vs,{...a})]},i.key)}),[o,j,f,r,l,x.collection]);return e.jsx(n,{...c(),children:h?m:e.jsx(Cs,{children:m})})});Ue.displayName="NextUI.Accordion";var He=Ue,dt=Ps,We=dt,ze=Z((t,s)=>{var n;const{as:o,className:x,children:r,...l}=t,c=o||"div",h=X(s),{slots:b,classNames:j}=Fe(),a=re(j==null?void 0:j.footer,x);return e.jsx(c,{ref:h,className:(n=b.footer)==null?void 0:n.call(b,{class:a}),...l,children:r})});ze.displayName="NextUI.CardFooter";var xt=ze,Ge=Z((t,s)=>{var n;const{as:o,className:x,children:r,...l}=t,c=o||"div",h=X(s),{slots:b,classNames:j}=Fe(),a=re(j==null?void 0:j.header,x);return e.jsx(c,{ref:h,className:(n=b.header)==null?void 0:n.call(b,{class:a}),...l,children:r})});Ge.displayName="NextUI.CardHeader";var mt=Ge;function ut(t,s,n){const{isSelected:o}=s,{isPressed:x,buttonProps:r}=ys({...t,onPress:Be(s.toggle,t.onPress)},n);return{isPressed:x,buttonProps:R(r,{"aria-pressed":o})}}var qe=Z((t,s)=>{var n;const{as:o,icon:x,className:r,onChange:l,autoFocus:c,srOnlyText:h,...b}=t,j=o||"button",a=X(s),{slots:f,classNames:m,isMenuOpen:i,setIsMenuOpen:N}=ws(),D=As({...b,isSelected:i,onChange:O=>{l==null||l(O),N(O)}}),{buttonProps:u,isPressed:y}=ut(t,D,a),{isFocusVisible:K,focusProps:I}=De({autoFocus:c}),{isHovered:B,hoverProps:V}=Se({}),L=re(m==null?void 0:m.toggle,r),U=p.useMemo(()=>typeof x=="function"?x(i??!1):x||e.jsx("span",{className:f.toggleIcon({class:m==null?void 0:m.toggleIcon})}),[x,i,f.toggleIcon,m==null?void 0:m.toggleIcon]),$=p.useMemo(()=>h||(D.isSelected?"close navigation menu":"open navigation menu"),[h,i]);return e.jsxs(j,{ref:a,className:(n=f.toggle)==null?void 0:n.call(f,{class:L}),"data-focus-visible":v(K),"data-hover":v(B),"data-open":v(i),"data-pressed":v(y),...R(u,I,V,b),children:[e.jsx("span",{className:f.srOnly(),children:$}),U]})});qe.displayName="NextUI.NavbarMenuToggle";var pt=qe;const ht=()=>{const t=k(),{userInfo:s}=me(n=>({userInfo:n.User}));return e.jsxs(Ds,{shadow:"none",className:"max-w-[300px] border-none bg-transparent",children:[e.jsxs(mt,{className:"justify-between",children:[e.jsxs("div",{className:"flex gap-3",children:[e.jsx(ue,{isBordered:!0,radius:"full",size:"md",src:s.PhotoUrl??""}),e.jsxs("div",{className:"flex flex-col items-start justify-center",children:[e.jsx("h4",{className:"text-small font-semibold leading-none text-default-600",children:s.Pseudoname}),e.jsxs("h5",{className:"text-small tracking-tight text-default-500",children:["@",s.Pseudoname]})]})]}),e.jsx("div",{className:"pl-2",children:e.jsx(oe,{color:"primary",radius:"full",size:"sm",variant:"solid",onPress:()=>t("user/account"),children:"Profile"})})]}),e.jsx(Ss,{className:"px-3 py-0",children:e.jsxs("p",{className:"text-small pl-px text-default-500",children:["#",s.Role,", @Trinite Center",e.jsx("span",{"aria-label":"confetti",role:"img",children:"🎉"})]})}),e.jsxs(xt,{className:"gap-3",children:[e.jsxs("div",{className:"flex gap-1",children:[e.jsx("p",{className:"font-semibold text-default-600 text-small",children:"@@"}),e.jsx("p",{className:" text-default-500 text-small",children:s.Ville})]}),e.jsxs("div",{className:"flex gap-1",children:[e.jsx("p",{className:"font-semibold text-default-600 text-small",children:"##"}),e.jsx("p",{className:"text-default-500 text-small",children:s.Pays})]})]})]})},J=({children:t})=>e.jsx("div",{className:"w-full max-w-[230px] py-2",children:t});function Je(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>t(s==="Tirages"?"configuration/tirages/listes":s==="Prime Generale"?"configuration/prime_general/modification":s==="Prime Agent"?"configuration/prime_par_agent":s==="Prime Tirage"?"configuration/prime_par_tirage":"configuration/superviseur/listes"),children:[e.jsx(g,{className:"space-x-3",startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Tirages"})},"Tirages"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Prime Generale"})},"Prime Generale"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Prime Agent"})},"Prime Agent"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"Prime Tirages"})},"Prime Tirage"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Superviseur"})},"Superviseur")]})})}function Qe(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>t(s==="newAgent"?"agent/new":"agent/list"),children:[e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Ajouter"})},"newAgent"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"Listes"})},"agents")]})})}function Ye(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>s==="LotGagnants"?t("tirage/list"):s==="Blocage Boule"?t("borlette/blockage-boule"):s==="Statistiques"?t("borlette/statistique"):s==="Listes Options"?t("borlette/lotto"):s==="Limite Jeu"?t("borlette/limite-game"):s==="Limite Jeu Par Agent"?t("borlette/limite-game-par-agent"):s==="Limite Boule"?t("borlette/limite-boule"):s==="Limite Boule par Agent"?t("borlette/limite-boule-par-agent"):alert("Pas encore disponible"),children:[e.jsx(g,{className:"space-x-3",startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Lot Gagnants"})},"LotGagnants"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Blocage Boule"})},"Blocage Boule"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Statistiques"})},"Statistiques"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"Listes Options"})},"Listes Options"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Limite Jeu"})},"Limite Jeu"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Limite Jeu Par Agent"})},"Limite Jeu Par Agent"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Limite Boule"})},"Limite Boule"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Limite Boule par Agent"})},"Limite Boule par Agent"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Tracabilite Agents"})},"Tracabilite Agents"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Tracabilite Superviseur"})},"edit")]})})}function Xe(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>t(s==="Ventes"?"rapports/root":s==="Control Agent"?"rapports/agent":s==="Fiches Vendu"?"rapports/liste-fiches":s==="Fiches Gagnants"?"rapports/liste-fiches-gagnant":"rapports/liste-fiches-supprimer"),children:[e.jsx(g,{className:"space-x-3",startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Ventes"})},"Ventes"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Control Agent"})},"Control Agent"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Fiches Vendu"})},"Fiches Vendu"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"Fiches Gagnants"})},"Fiches Gagnants"),e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Fiches Eliminés"})},"Fiche eliminés")]})})}function Ze(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>s==="new Surccursale"?t("surccussale/new"):s==="Surccusales"?t("surccusale/listes"):alert("Pas encore disponible"),children:[e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Ajouter"})},"new Surccursale"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"Listes"})},"Surccusales")]})})}function es(){const t=k();return e.jsx(J,{children:e.jsxs(q,{"aria-label":"Actions",onAction:s=>s==="My Account"?t("user/account"):alert("pas encore disponible"),children:[e.jsx(g,{startContent:e.jsx("span",{className:"text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:"text-[0.9rem] text-slate-500",children:"Editer Profile"})},"My Account"),e.jsx(g,{startContent:e.jsx("span",{className:" text-2xl font-bold -mt-3 text-slate-500",children:"."}),className:"space-x-3",children:e.jsx("span",{className:" text-start text-[0.9rem] text-slate-500",children:"tracabilité Du Compagnie"})},"PrimeTirage")]})})}const ft=[{icon:e.jsx(C,{icon:Ie}),name:"Tableau De Bord",isDown:!1,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Te}),name:"Configuration",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:$e}),name:"Vendeur",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Me}),name:"Surveillance",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:ke}),name:"Succursale",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Ke}),name:"Rapports",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{icon:Le}),name:"Transactions",isDown:!1},{icon:e.jsx(C,{className:"text-slate-600",icon:Oe}),name:"Facturation",isDown:!1},{icon:e.jsx(C,{className:"text-slate-600",icon:Ve}),name:"Mon Compte",isDown:!0,content:e.jsx("div",{children:"second one"})}];function bt(){const t=k();return e.jsx("div",{className:"flex w-full flex-col justify-center mt-5",children:ft.map((s,n)=>e.jsx("div",{className:"w-full",children:s.isDown?e.jsx("div",{className:"px-7",children:e.jsx(He,{children:e.jsx(We,{startContent:s.icon,"aria-label":"Accordion 1",title:e.jsx("span",{className:"text-slate-600 text-sm",children:s.name}),children:s.name=="Configuration"?e.jsx(Je,{}):s.name=="Vendeur"?e.jsx(Qe,{}):s.name=="Surveillance"?e.jsx(Ye,{}):s.name=="Rapports"?e.jsx(Xe,{}):s.name==="Succursale"?e.jsx(Ze,{}):s.name=="Mon Compte"?e.jsx(es,{}):"first one"},"1")})}):e.jsx("label",{onClick:()=>{s.name==="Tableau De Bord"?t("/dashboard"):s.name=="Transactions"?alert("not available yet"):alert("not availble yet")},children:e.jsxs("div",{className:s.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"flex w-full items-center px-9 gap-3 mb-1 border-solid py-3 bg-blue-100 border-blue-600 border-r-4":s.name=="Transactions"?"flex gap-3 items-center px-9 mt-3 mb-6":s.name=="Facturation"?"flex gap-3 items-center px-9 mb-2":"flex gap-3 items-center  px-9 ",children:[e.jsx("div",{children:e.jsx("span",{className:s.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"text-blue-700 font-bold":"text-slate-600",children:s.icon})}),e.jsx("div",{children:e.jsx("span",{className:s.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"text-blue-600 text-sm font-bold":"text-slate-600 text-sm",children:s.name})})]})})},n))})}function jt({setWidth:t}){const[s,n]=T.useState(!0),[o]=T.useState(!1),x=i=>{n(i)};T.useEffect(()=>{t(s?275:120)},[s]);const{isOpen:r,onOpen:l,onOpenChange:c}=_s(),h=k(),{changeAuthentication:b,deleteUser:j,userInfo:a,isMessage:f,setIsMessage:m}=me(i=>({changeAuthentication:i.changeAuthentication,deleteUser:i.deleteUser,userInfo:i.User,isMessage:i.isMessage,setIsMessage:i.setIsMessage}));return T.useEffect(()=>{f&&(Bs.success(`Bienvenue ${a.Pseudoname} 👏`,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"light",transition:Fs,type:"success"}),m(!1))},[f]),e.jsxs(Is,{maxWidth:"full",isBordered:!0,children:[e.jsx(pt,{"aria-label":o?"Close menu":"Open menu",className:"md:hidden"}),e.jsxs(Ts,{children:[e.jsx("div",{className:"hidden md:block",children:e.jsx($s,{isSelected:s,size:"md",color:"primary",onValueChange:x,startContent:e.jsx(C,{icon:Ms}),endContent:e.jsx(C,{icon:ks})})}),e.jsx("div",{className:"sm:ml-3",children:e.jsx("img",{src:Ks,style:{width:70,height:70,objectFit:"cover"}})})]}),e.jsx(Ls,{}),e.jsx(Os,{isOpen:r,onOpenChange:c,children:e.jsx(Vs,{children:i=>e.jsxs(e.Fragment,{children:[e.jsx(Es,{className:"flex flex-col gap-1",children:"Trinite Center"}),e.jsx(Rs,{children:e.jsx("p",{children:"Voulez-vous vraiement Deconnecté"})}),e.jsxs(Us,{children:[e.jsx(oe,{color:"danger",variant:"light",onPress:()=>{i()},children:"Annulé"}),e.jsx(oe,{color:"primary",onPress:()=>{j(),b(!1),h("/"),i()},children:"Deconnecté"})]})]})})}),e.jsxs(Hs,{justify:"end",children:[e.jsx(Pe,{onClick:l,className:"hidden lg:flex",children:e.jsx(C,{className:"text-2xl",icon:Ws})}),e.jsx(Pe,{children:e.jsx(Ee,{content:"",color:"primary",shape:"circle",placement:"bottom-right",children:e.jsxs(zs,{showArrow:!0,placement:"bottom",children:[e.jsx(Gs,{children:e.jsx(ue,{isBordered:!0,radius:"full",src:a.PhotoUrl??""})}),e.jsx(qs,{className:"p-1",children:e.jsx(ht,{})})]})})})]}),e.jsx(Js,{children:e.jsx(bt,{})})]})}function Nt(){const t=[{icon:e.jsx(C,{icon:Ie}),name:"Tableau De Bord",isDown:!1,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Te}),name:"Configuration",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:$e}),name:"Vendeur",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Me}),name:"Surveillance",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:ke}),name:"Succursale",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{className:"text-slate-600",icon:Ke}),name:"Rapports",isDown:!0,content:e.jsx("div",{children:"first one"})},{icon:e.jsx(C,{icon:Le}),name:"Transactions",isDown:!1},{icon:e.jsx(C,{className:"text-slate-600",icon:Oe}),name:"Facturation",isDown:!1},{icon:e.jsx(C,{className:"text-slate-600",icon:Ve}),name:"Mon Compte",isDown:!0,content:e.jsx("div",{children:"second one"})}],[s,n]=T.useState(""),[o,x]=T.useState({}),{userInfo:r}=me(a=>({userInfo:a.User})),l=k(),[c,h]=T.useState(275),b={setWidth:h};T.useEffect(()=>{(async()=>{const f=Xs(et,"Administrator","RfpQV4TWQqLbEV5BroKV");try{const m=await Zs(f);m.exists()&&(n(`${m.data().photoUrl}`),x({Pseudoname:`${m.data().Pseudoname}`,Prenom:`${m.data().Prenom}`}))}catch(m){throw new Error(`${m}`)}})()},[]);const j=Qs("(max-width: 790px)");return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex w-full h-100vh",children:[e.jsx("div",{style:{width:j?"0px":`${c}px`},className:" hidden md:flex sm:flex-col border-slate-200 border-r-1 border-solid fixed z-20",children:e.jsxs("div",{className:"max-h-[100vh] hover:whitespace-nowrap hover:overflow-y-auto",children:[e.jsx("div",{className:"flex w-full justify-center mt-6",children:e.jsx(Ee,{content:"Admin",color:"danger",placement:"top-left",children:e.jsx(ue,{className:"w-20 h-20 text-large",radius:"full",isBordered:!0,src:r.Role==="Superviseur"?s:r.PhotoUrl})})}),e.jsx("div",{className:"flex w-full justify-center mt-3",children:e.jsxs("div",{className:"flex flex-col items-center ",children:[e.jsx("div",{children:c==120?"":e.jsx("span",{className:"font-medium text-1xl",children:o.Pseudoname})}),e.jsx("div",{children:e.jsx("span",{className:"text-slate-400",children:c==120?"":`@${o.Prenom}#administrator`})})]})}),e.jsx("div",{className:"flex w-full justify-center mt-7 text-center",children:e.jsx("span",{className:"font-bold text-2xl font-monserrat",children:"Trinite center"})}),e.jsx("div",{className:"flex w-full flex-col justify-center mt-5",children:t.map((a,f)=>e.jsx("div",{className:"w-full",children:a.isDown?e.jsx("div",{className:"px-7",children:e.jsx(He,{children:e.jsx(We,{startContent:a.icon,"aria-label":"Accordion 1",title:c==120?"":e.jsx("span",{className:"text-slate-600 text-sm",children:a.name}),children:a.name=="Configuration"?e.jsx(Je,{}):a.name=="Vendeur"?e.jsx(Qe,{}):a.name=="Surveillance"?e.jsx(Ye,{}):a.name=="Rapports"?e.jsx(Xe,{}):a.name==="Succursale"?e.jsx(Ze,{}):a.name=="Mon Compte"?e.jsx(es,{}):"first one"},"1")})}):e.jsx("label",{onClick:()=>{a.name==="Tableau De Bord"?l("/dashboard"):a.name=="Transactions"?alert("not available yet"):alert("not availble yet")},children:e.jsxs("div",{className:a.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"flex w-full items-center px-9 gap-3 mb-1 border-solid py-3 bg-blue-100 border-blue-600 border-r-4":a.name=="Transactions"?"flex gap-3 items-center px-9 mt-3 mb-6":a.name=="Facturation"?"flex gap-3 items-center px-9 mb-2":a.name=="Tableau De Bord"?"flex gap-3 items-center  px-8 py-3 ":"flex gap-3 items-center  px-9 ",children:[e.jsx("div",{children:e.jsx("span",{className:a.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"text-blue-700 font-bold":"text-slate-600",children:a.icon})}),e.jsx("div",{children:e.jsx("span",{className:a.name=="Tableau De Bord"&&location.pathname.split("/").length<3?"text-blue-600 text-sm font-bold":"text-slate-600 text-sm",children:c==120?"":a.name})})]})})},f))}),c==120?"":e.jsxs("div",{className:"flex flex-col items-center justify-center gap-5 mb-8 mt-8",children:[e.jsx("div",{className:"w-[170px] text-wrap text-center",children:e.jsx("span",{className:"text-sm text-slate-400",children:"Vous avez besoin de l'application pour POS ? Veuillez le télécharger sur le lien ci-dessous"})}),e.jsx("div",{children:e.jsx(oe,{variant:"shadow",className:"font-semibold",color:"primary",size:"md",children:e.jsx("a",{href:"../assets/Florida.jpeg",download:"Florida.jpeg",style:{textDecoration:"none",color:"inherit"},children:"Télécharger"})})})]})]})}),e.jsx("div",{style:{marginLeft:j?0:c},className:"flex-1",children:e.jsxs("div",{className:"w-full",children:[e.jsx(jt,{...b}),e.jsx("div",{children:e.jsx(Ys,{})})]})})]})})}export{Nt as default};
