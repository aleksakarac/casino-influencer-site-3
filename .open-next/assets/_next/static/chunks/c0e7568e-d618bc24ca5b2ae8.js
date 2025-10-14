"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6654],{64509:(e,t,o)=>{o.d(t,{$n:()=>tp,$w:()=>t7,A3:()=>I,AM:()=>oC,B3:()=>v,BJ:()=>oO,CA:()=>e3,Cy:()=>tT,D0:()=>N,DP:()=>P,DZ:()=>tP,Dr:()=>rR,EY:()=>tt,EZ:()=>t4,Ex:()=>tr,GB:()=>A,GD:()=>op,GE:()=>e7,GG:()=>J,JU:()=>eV,M4:()=>D,Ml:()=>y,NP:()=>B,Nj:()=>rk,PR:()=>tg,Pm:()=>t$,Q3:()=>z,QY:()=>E,Qx:()=>w,Sc:()=>t_,U1:()=>_,W1:()=>r$,WE:()=>R,WP:()=>ou,Wd:()=>od,XS:()=>ot,Xy:()=>tI,Z4:()=>on,ZL:()=>of,Zp:()=>tm,aY:()=>tj,az:()=>e9,bz:()=>M,cF:()=>tx,cV:()=>tV,cZ:()=>O,dO:()=>oX,dU:()=>t8,eu:()=>e1,fs:()=>oQ,g5:()=>tc,gK:()=>eJ,jt:()=>tC,ks:()=>rt,l6:()=>oF,l_:()=>eB,m_:()=>rf,mc:()=>tF,nY:()=>j,oz:()=>rz,q4:()=>C,qW:()=>rm,rX:()=>rI,sU:()=>x,sb:()=>S,so:()=>ti,sx:()=>oN,u4:()=>t5,vE:()=>rs,wb:()=>r_,wj:()=>oy,xA:()=>tJ,y$:()=>tl,zd:()=>k});var r=o(56555),n=o(95155),i=o(68311),a=o(12115),d=o(50625),l=o(37849),c=o(50475),s=o(96241),u=o(58146),f=o(88334),p=o(1733),h=o(26497),m=o(70189),g=o(47650),b=o(88106);let v=r.B3,w=(0,r.me)(),y=[],x={},$={card:{initial:{scale:.97,willChange:"transform"},hidden:{opacity:0},visible:{opacity:1,transition:{when:"beforeChildren",duration:.1}},scaleIn:{scale:1},scaleOut:{scale:.97}},children:{hidden:{opacity:0},visible:{opacity:1}},transition:{type:"spring",visualDuration:.2,bounce:.25}};function k(e){return j(e)||R(e)}function S(e){return e instanceof Node&&e.nodeType===Node.ELEMENT_NODE}function j(e){return S(e)&&"A"===e.nodeName}function I(e){return S(e)&&"INPUT"===e.nodeName}function R(e){return S(e)&&"BUTTON"===e.nodeName}function C(e){return S(e)&&"SELECT"===e.nodeName}function E(e){return S(e)&&"TEXTAREA"===e.nodeName}function z(e,t){return e.contains(t)||e===t}function N(e){return 0===e?0:`${e/16}rem`}function _(e,t,o){return(t?.map(o)||[]).map((t,o)=>0===o?t:{[`@media screen and (min-width: ${e[o-1]}px)`]:t})}function A(e,t){return void 0===e?t||y:Array.isArray(e)?e:[e]}function W(e,t,o=y){if(!Array.isArray(o))throw Error("the property must be array of numbers");if(0===o.length)return null;let{media:n,space:i}=(0,r.JW)(e);return _(n,o,e=>{var o;return o=N(i[e]),t.reduce((e,t)=>(e[t]=o,e),{})})}function H(e,t){let{$size:o,$weight:n}=t,{font:i,media:a}=(0,r.JW)(t.theme),{family:d,sizes:l,weights:c}=i[e],s=n&&c[n]||c.regular,u=l[2],f={position:"relative",fontFamily:d,fontWeight:`${s}`,padding:"1px 0",margin:0,"&:before":{content:'""',display:"block",height:0},"&:after":{content:'""',display:"block",height:0},"& > code, & > span":{display:"block"},"&:not([hidden])":{display:"block"}};return o?[f,..._(a,o,e=>(function(e){let{ascenderHeight:t,descenderHeight:o,fontSize:r,iconSize:n,letterSpacing:i,lineHeight:a}=e,d=t+o,l=a-d,c=2*Math.floor(1.125*r/2)+1;return{fontSize:N(r),lineHeight:`calc(${a} / ${r})`,letterSpacing:N(i),transform:`translateY(${N(o)})`,"&:before":{marginTop:`calc(${N(0-d)} - 1px)`},"&:after":{marginBottom:"-1px"},"& svg:not([data-sanity-icon])":{fontSize:`calc(${c} / 16 * 1rem)`,margin:N((l-c)/2)},"& [data-sanity-icon]":{fontSize:`calc(${n} / 16 * 1rem)`,margin:N((l-n)/2)}}})(l[e]||u))]:(H.warned||(console.warn("No size specified for responsive font",{fontKey:e,$size:o,props:t,base:f}),H.warned=!0),[f])}function T(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$align,e=>({textAlign:e}))}let L=function(){if("u">typeof globalThis)return globalThis;if("u">typeof window)return window;if("u">typeof self)return self;if("u">typeof global)return global;throw Error("@sanity/ui: could not locate global scope")}();function M(e,t){let o=Symbol.for(e);if(typeof document>"u"){let o=(0,a.createContext)(t);return o.displayName=e,o}return L[o]=L[o]||(0,a.createContext)(t),L[o]}let F=M("@sanity/ui/context/theme",null);function B(e){let t,o,l,c,s=(0,i.c)(15),u=(0,a.useContext)(F),{children:f}=e,p=e.scheme??(u?.scheme||"light"),h=e.theme??(u?.theme||null),m=e.tone??(u?.tone||"default");e:{let e;if(!h){t=null;break e}s[0]!==h||s[1]!==p||s[2]!==m?(e={version:0,theme:h,scheme:p,tone:m},s[0]=h,s[1]=p,s[2]=m,s[3]=e):e=s[3],t=e}let g=t;t:{let e;if(!h){o=null;break t}s[4]!==h||s[5]!==p||s[6]!==m?(e=(0,r.sR)(h,p,m),s[4]=h,s[5]=p,s[6]=m,s[7]=e):e=s[7],o=e}let b=o;if(!b){let e;return s[8]===Symbol.for("react.memo_cache_sentinel")?(e=(0,n.jsx)("pre",{children:'ThemeProvider: no "theme" property provided'}),s[8]=e):e=s[8],e}return s[9]!==f||s[10]!==b?(l=(0,n.jsx)(d.NP,{theme:b,children:f}),s[9]=f,s[10]=b,s[11]=l):l=s[11],s[12]!==l||s[13]!==g?(c=(0,n.jsx)(F.Provider,{value:g,children:l}),s[12]=l,s[13]=g,s[14]=c):c=s[14],c}function J(){let e=(0,a.useContext)(F);if(!e)throw Error("useRootTheme(): missing context value");return e}function O(e){let t,o=(0,i.c)(5),{children:r,scheme:a,tone:d}=e,l=J(),c=a||l.scheme;return o[0]!==r||o[1]!==l.theme||o[2]!==c||o[3]!==d?(t=(0,n.jsx)(B,{scheme:c,theme:l.theme,tone:d,children:r}),o[0]=r,o[1]=l.theme,o[2]=c,o[3]=d,o[4]=t):t=o[4],t}function P(){return(0,d.DP)()}function D(){let e,t=(0,i.c)(2),o=(0,d.DP)();return t[0]!==o?(e=(0,r.JW)(o),t[0]=o,t[1]=e):e=t[1],e}function V(e){let{card:t,media:o}=(0,r.JW)(e.theme),n=`${t.border?.width??1}px solid var(--card-border-color)`;return _(o,e.$border,e=>e?{"&&":{border:n}}:{"&&":{border:0}})}function G(e){let{card:t,media:o}=(0,r.JW)(e.theme),n=`${t.border?.width??1}px solid var(--card-border-color)`;return _(o,e.$borderTop,e=>e?{"&&":{borderTop:n}}:{"&&":{borderTop:0}})}function Y(e){let{card:t,media:o}=(0,r.JW)(e.theme),n=`${t.border?.width??1}px solid var(--card-border-color)`;return _(o,e.$borderRight,e=>e?{"&&":{borderRight:n}}:{"&&":{borderRight:0}})}function X(e){let{card:t,media:o}=(0,r.JW)(e.theme),n=`${t.border?.width??1}px solid var(--card-border-color)`;return _(o,e.$borderBottom,e=>e?{"&&":{borderBottom:n}}:{"&&":{borderBottom:0}})}function U(e){let{card:t,media:o}=(0,r.JW)(e.theme),n=`${t.border?.width??1}px solid var(--card-border-color)`;return _(o,e.$borderLeft,e=>e?{"&&":{borderLeft:n}}:{"&&":{borderLeft:0}})}B.displayName="ThemeProvider",O.displayName="ThemeColorProvider";let q={'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"}},K={content:"content-box",border:"border-box"},Z={stretch:"stretch",fill:"100%"};function Q(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$display,e=>({"&:not([hidden])":{display:e}}))}function ee(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$sizing,e=>({boxSizing:K[e]}))}function et(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$height,e=>({height:Z[e]}))}function eo(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$overflow,e=>({overflow:e}))}let er={minWidth:0,minHeight:0};function en(){return[er,ei]}function ei(e){let{media:t}=(0,r.JW)(e.theme);return e.$flex?_(t,e.$flex,e=>({flex:`${e}`})):y}let ea={"&&:not([hidden])":{display:"flex"}};function ed(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$align,e=>({alignItems:e}))}function el(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$gap,e=>({gap:e?N(o[e]):void 0}))}function ec(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$wrap,e=>({flexWrap:e}))}function es(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$justify,e=>({justifyContent:e}))}function eu(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$direction,e=>({flexDirection:e}))}function ef(e){return`inset 0 0 0 ${e.width}px ${e.color}`}function ep(e){let{base:t,border:o,focusRing:r}=e,n=r.offset+r.width,i=0-r.offset,a=t?t.bg:"var(--card-bg-color)";return[i>0&&`inset 0 0 0 ${i}px var(--card-focus-ring-color)`,o&&ef(o),i<0&&`0 0 0 ${0-i}px ${a}`,n>0&&`0 0 0 ${n}px var(--card-focus-ring-color)`].filter(Boolean).join(",")}let eh={auto:"auto",full:"1 / -1"},em={auto:"auto",full:"1 / -1"};function eg(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$row,e=>"number"==typeof e?{gridRow:`span ${e} / span ${e}`}:{gridRow:eh[e]})}function eb(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$rowStart,e=>({gridRowStart:`${e}`}))}function ev(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$rowEnd,e=>({gridRowEnd:`${e}`}))}function ew(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$column,e=>"number"==typeof e?{gridColumn:`span ${e} / span ${e}`}:{gridColumn:em[e]})}function ey(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$columnStart,e=>({gridColumnStart:`${e}`}))}function ex(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$columnEnd,e=>({gridColumnEnd:`${e}`}))}let e$={"&&:not([hidden])":{display:"grid"},'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"}},ek={auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"},eS={auto:"auto",min:"min-content",max:"max-content",fr:"minmax(0, 1fr)"};function ej(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$autoFlow,e=>({gridAutoFlow:e}))}function eI(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$autoRows,e=>({gridAutoRows:e&&eS[e]}))}function eR(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$autoCols,e=>({gridAutoColumns:e&&ek[e]}))}function eC(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$columns,e=>({gridTemplateColumns:e&&`repeat(${e},minmax(0,1fr));`}))}function eE(e){let{media:t}=(0,r.JW)(e.theme);return _(t,e.$rows,e=>({gridTemplateRows:e&&`repeat(${e},minmax(0,1fr));`}))}function ez(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$gap,e=>({gridGap:e?N(o[e]):void 0}))}function eN(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$gapX,e=>({columnGap:e?N(o[e]):void 0}))}function e_(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$gapY,e=>({rowGap:e?N(o[e]):void 0}))}function eA(e){let{$fontSize:t,$iconLeft:o,$iconRight:n,$padding:i,$space:a}=e,{font:d,media:l,space:c}=(0,r.JW)(e.theme),s=Math.max(i.length,a.length,t.length),u=[],f=[],p=[];for(let e=0;e<s;e+=1)p[e]=void 0===t[e]?p[e-1]:t[e],u[e]=void 0===i[e]?u[e-1]:i[e],f[e]=void 0===a[e]?f[e-1]:a[e];return _(l,u,(e,t)=>{let r=d.text.sizes[p[t]]||d.text.sizes[2],i=r.lineHeight-r.ascenderHeight-r.descenderHeight,a=c[u[t]],l=c[f[t]],s={paddingTop:N(a-r.ascenderHeight),paddingRight:N(a),paddingBottom:N(a-r.descenderHeight),paddingLeft:N(a)};return n&&(s.paddingRight=N(a+i+l)),o&&(s.paddingLeft=N(a+i+l)),s})}function eW(e){return eA({...e,$iconRight:!0})}let eH=(0,d.AH)`
  &:not([hidden]) {
    display: flex;
  }

  align-items: center;
`;function eT(){return eH}function eL(e){let{$scheme:t,$tone:o,$weight:n}=e,{color:i,font:a}=(0,r.JW)(e.theme);return(0,d.AH)`
    appearance: none;
    background: none;
    border: 0;
    border-radius: 0;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    font-family: ${a.text.family};
    font-weight: ${n&&a.text.weights[n]||a.text.weights.regular};
    margin: 0;
    position: relative;
    z-index: 1;
    display: block;

    /* NOTE: This is a hack to disable Chrome’s autofill styles */
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-text-fill-color: var(--input-fg-color) !important;
      transition: background-color 5000s;
      transition-delay: 86400s /* 24h */;
    }

    /* &:is(textarea) */
    &[data-as='textarea'] {
      resize: none;
    }

    color: var(--input-fg-color);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &[data-scheme='${t}'][data-tone='${o}'] {
      --input-fg-color: ${i.input.default.enabled.fg};
      --input-placeholder-color: ${i.input.default.enabled.placeholder};

      /* enabled */
      &:not(:invalid):not(:disabled):not(:read-only) {
        --input-fg-color: ${i.input.default.enabled.fg};
        --input-placeholder-color: ${i.input.default.enabled.placeholder};
      }

      /* disabled */
      &:not(:invalid):disabled {
        --input-fg-color: ${i.input.default.disabled.fg};
        --input-placeholder-color: ${i.input.default.disabled.placeholder};
      }

      /* invalid */
      &:invalid {
        --input-fg-color: ${i.input.invalid.enabled.fg};
        --input-placeholder-color: ${i.input.invalid.enabled.placeholder};
      }

      /* readOnly */
      &:read-only {
        --input-fg-color: ${i.input.default.readOnly.fg};
        --input-placeholder-color: ${i.input.default.readOnly.placeholder};
      }
    }
  `}function eM(e){let{font:t,media:o}=(0,r.JW)(e.theme);return _(o,e.$fontSize,e=>{let o=t.text.sizes[e]||t.text.sizes[2];return{fontSize:N(o.fontSize),lineHeight:`${o.lineHeight/o.fontSize}`}})}function eF(e){let{$hasPrefix:t,$hasSuffix:o,$scheme:n,$tone:i,$unstableDisableFocusRing:a}=e,{color:l,input:c}=(0,r.JW)(e.theme);return(0,d.AH)`
    --input-box-shadow: none;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    pointer-events: none;
    z-index: 0;

    background-color: var(--card-bg-color);
    box-shadow: var(--input-box-shadow);

    border-top-left-radius: ${t?0:void 0};
    border-bottom-left-radius: ${t?0:void 0};
    border-top-right-radius: ${o?0:void 0};
    border-bottom-right-radius: ${o?0:void 0};

    &[data-scheme='${n}'][data-tone='${i}'] {
      --card-bg-color: ${l.input.default.enabled.bg};
      --card-fg-color: ${l.input.default.enabled.fg};

      /* enabled */
      *:not(:disabled) + &[data-border] {
        --input-box-shadow: ${ef({color:l.input.default.enabled.border,width:c.border.width})};
      }

      /* invalid */
      *:not(:disabled):invalid + & {
        --card-bg-color: ${l.input.invalid.enabled.bg};
        --card-fg-color: ${l.input.invalid.enabled.fg};

        &[data-border] {
          --input-box-shadow: ${ef({color:l.input.invalid.enabled.border,width:c.border.width})};
        }
      }

      /* focused */
      *:not(:disabled):focus + & {
        &[data-border] {
          --input-box-shadow: ${a?void 0:ep({border:{color:l.input.default.enabled.border,width:c.border.width},focusRing:c.text.focusRing})};
        }

        &:not([data-border]) {
          --input-box-shadow: ${a?void 0:ep({focusRing:c.text.focusRing})};
        }
      }

      /* disabled */
      *:not(:invalid):disabled + & {
        --card-bg-color: ${l.input.default.disabled.bg} !important;
        --card-fg-color: ${l.input.default.disabled.fg} !important;
        --card-icon-color: ${l.input.default.disabled.fg} !important;

        &[data-border] {
          --input-box-shadow: ${ef({color:l.input.default.disabled.border,width:c.border.width})};
        }
      }

      *:invalid:disabled + & {
        --card-bg-color: ${l.input.invalid.disabled.bg} !important;
        --card-fg-color: ${l.input.invalid.disabled.fg} !important;
        --card-icon-color: ${l.input.invalid.disabled.fg} !important;

        &[data-border] {
          --input-box-shadow: ${ef({color:l.input.invalid.disabled.border,width:c.border.width})};
        }
      }

      /* readOnly */
      *:not(:invalid):read-only + & {
        --card-bg-color: ${l.input.default.readOnly.bg} !important;
        --card-fg-color: ${l.input.default.readOnly.fg} !important;
      }

      *:invalid:read-only + & {
        --card-bg-color: ${l.input.invalid.readOnly.bg} !important;
        --card-fg-color: ${l.input.invalid.readOnly.fg} !important;
      }

      /* hovered */
      @media (hover: hover) {
        *:not(:disabled):not(:read-only):not(:invalid):hover + & {
          --card-bg-color: ${l.input.default.hovered.bg};
          --card-fg-color: ${l.input.default.hovered.fg};
        }

        *:invalid:not(:disabled):not(:read-only):hover + & {
          --card-bg-color: ${l.input.invalid.hovered.bg};
          --card-fg-color: ${l.input.invalid.hovered.fg};
        }

        *:not(:disabled):not(:read-only):not(:invalid):not(:focus):hover + &[data-border] {
          --input-box-shadow: ${ef({color:l.input.default.hovered.border,width:c.border.width})};
        }

        *:invalid:not(:disabled):not(:read-only):not(:focus):hover + &[data-border] {
          --input-box-shadow: ${ef({color:l.input.invalid.hovered.border,width:c.border.width})};
        }
      }
    }
  `}function eB(e){let{theme:t}=e;return[W(t,["padding"],e.$padding),W(t,["paddingLeft","paddingRight"],e.$paddingX),W(t,["paddingTop","paddingBottom"],e.$paddingY),W(t,["paddingTop"],e.$paddingTop),W(t,["paddingRight"],e.$paddingRight),W(t,["paddingBottom"],e.$paddingBottom),W(t,["paddingLeft"],e.$paddingLeft)].filter(Boolean)}function eJ(e){let{media:t,radius:o}=(0,r.JW)(e.theme);return _(t,e.$radius,e=>{let t=0;return"number"==typeof e&&(t=N(o[e])),"full"===e&&(t="9999px"),{borderRadius:t}})}function eO(e,t){return`${e.map(N).join(" ")} ${t}`}let eP=d.I4.span.withConfig({displayName:"SpanWithTextOverflow",componentId:"sc-ol2i3b-0"})`display:block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;overflow:clip;`,eD=d.I4.div.withConfig({displayName:"StyledLabel",componentId:"sc-1luap7z-0"})(function(e){return H("label",e)},T,function(e){let{$accent:t,$muted:o}=e,{font:n}=(0,r.JW)(e.theme);return(0,d.AH)`
    text-transform: uppercase;

    ${t&&(0,d.AH)`
      color: var(--card-accent-fg-color);
    `}

    ${o&&(0,d.AH)`
      color: var(--card-muted-fg-color);
    `}

    & code {
      font-family: ${n.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `}),eV=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m=(0,i.c)(26);m[0]!==e?({accent:o,align:r,children:a,muted:l,size:c,textOverflow:s,weight:u,...d}=e,m[0]=e,m[1]=o,m[2]=r,m[3]=a,m[4]=d,m[5]=l,m[6]=c,m[7]=s,m[8]=u):(o=m[1],r=m[2],a=m[3],d=m[4],l=m[5],c=m[6],s=m[7],u=m[8]);let g=void 0!==l&&l,b=void 0===c?2:c,v=a;if("ellipsis"===s){let e;m[9]!==v?(e=(0,n.jsx)(eP,{children:v}),m[9]=v,m[10]=e):e=m[10],v=e}else{let e;m[11]!==v?(e=(0,n.jsx)("span",{children:v}),m[11]=v,m[12]=e):e=m[12],v=e}return m[13]!==r?(f=A(r),m[13]=r,m[14]=f):f=m[14],m[15]!==b?(p=A(b),m[15]=b,m[16]=p):p=m[16],m[17]!==o||m[18]!==v||m[19]!==g||m[20]!==t||m[21]!==d||m[22]!==f||m[23]!==p||m[24]!==u?(h=(0,n.jsx)(eD,{"data-ui":"Label",...d,$accent:o,$align:f,$muted:g,$size:p,$weight:u,ref:t,children:v}),m[17]=o,m[18]=v,m[19]=g,m[20]=t,m[21]=d,m[22]=f,m[23]=p,m[24]=u,m[25]=h):h=m[25],h});eV.displayName="ForwardRef(Label)";let eG={root:function(e){let{$color:t}=e,{avatar:o}=(0,r.JW)(e.theme);return{"--avatar-bg-color":`var(--card-avatar-${t}-bg-color)`,"--avatar-fg-color":`var(--card-avatar-${t}-fg-color)`,backgroundColor:"var(--avatar-bg-color)",position:"relative",boxSizing:"border-box",userSelect:"none",boxShadow:"0 0 0 1px var(--card-bg-color)",'&[data-status="inactive"]':{opacity:"0.5"},"&>svg":{"&:not([hidden])":{display:"block"}},'&[data-as="button"]':{WebkitFontSmoothing:"inherit",appearance:"none",margin:0,padding:0,border:0,font:"inherit",color:"inherit",outline:"none","&:focus":{boxShadow:ep({focusRing:o.focusRing})},"&:focus:not(:focus-visible)":{boxShadow:"none"}}}},arrow:function(){return{position:"absolute",boxSizing:"border-box",zIndex:"0",opacity:"0",transition:"all 0.2s linear",transform:"rotate(-90deg) translate3d(0, 6px, 0)",left:0,right:0,top:0,bottom:0,"& > svg":{width:"11px",height:"7px",position:"absolute",top:"-5px",left:"50%",transform:"translateX(-6px)","&:not([hidden])":{display:"block"}},"[data-arrow-position='inside'] > &":{transform:"rotate(-90deg) translate3d(0, 6px, 0)",opacity:"0"},"[data-arrow-position='top'] > &":{opacity:"1",transform:"rotate(0deg)"},"[data-arrow-position='bottom'] > &":{opacity:"1",transform:"rotate(-180deg)"}}},bgStroke:function(){return{strokeWidth:"4px",stroke:"var(--card-bg-color)"}},stroke:function(){return{strokeWidth:"2px",stroke:"var(--avatar-bg-color)",'[data-status="editing"] &':{strokeDasharray:"2 4",strokeLinecap:"round"}}},initials:function(){return{width:"100%",height:"100%",color:"var(--avatar-fg-color)",alignItems:"center",justifyContent:"center",textTransform:"uppercase",textAlign:"center",borderRadius:"50%","&:not([hidden])":{display:"flex"}}},image:function(){return{position:"relative"}}},eY=d.I4.div.withConfig({displayName:"StyledAvatar",componentId:"sc-1rj7kl0-0"})(function(e){let{avatar:t,media:o}=(0,r.JW)(e.theme);return _(o,e.$size,e=>{let o=t.sizes[e]||t.sizes[0];return{width:N(o.size),height:N(o.size),borderRadius:N(o.size/2),"&>svg":{width:N(o.size),height:N(o.size),borderRadius:N(o.size/2)}}})},eG.root),eX=d.I4.div.withConfig({displayName:"Arrow",componentId:"sc-1rj7kl0-1"})(eG.arrow),eU=d.I4.ellipse.withConfig({displayName:"BgStroke",componentId:"sc-1rj7kl0-2"})(eG.bgStroke),eq=d.I4.ellipse.withConfig({displayName:"Stroke",componentId:"sc-1rj7kl0-3"})(eG.stroke),eK=d.I4.div.withConfig({displayName:"Initials",componentId:"sc-1rj7kl0-4"})(eG.initials),eZ=(0,d.I4)(eV).withConfig({displayName:"InitialsLabel",componentId:"sc-1rj7kl0-5"})({color:"inherit"}),eQ=d.I4.svg.withConfig({displayName:"AvatarImage",componentId:"sc-1rj7kl0-6"})(eG.image),e1=(0,a.forwardRef)(function(e,t){let o,r,d,c,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I=(0,i.c)(46);I[0]!==e?({__unstable_hideInnerStroke:o,as:c,color:h,src:p,title:b,initials:s,onImageLoadError:u,arrowPosition:d,animateArrowFrom:r,status:m,size:g,...f}=e,I[0]=e,I[1]=o,I[2]=r,I[3]=d,I[4]=c,I[5]=s,I[6]=u,I[7]=f,I[8]=p,I[9]=h,I[10]=m,I[11]=g,I[12]=b):(o=I[1],r=I[2],d=I[3],c=I[4],s=I[5],u=I[6],f=I[7],p=I[8],h=I[9],m=I[10],g=I[11],b=I[12]);let R=void 0===h?"gray":h,C=void 0===m?"online":m,E=void 0===g?1:g,{avatar:z}=D(),N=l.isValidElementType(c)?c:"div",_=A(E),W=(z.sizes[_[0]]||z.sizes[0]).size,H=W/2,T=(0,a.useId)(),[L,M]=(0,a.useState)(r||d||"inside"),[F,B]=(0,a.useState)(!1),J=`avatar-image-${T}`;I[13]!==L||I[14]!==d?(v=()=>{if(L===d)return;let e=requestAnimationFrame(()=>M(d));return()=>cancelAnimationFrame(e)},w=[L,d],I[13]=L,I[14]=d,I[15]=v,I[16]=w):(v=I[15],w=I[16]),(0,a.useEffect)(v,w),I[17]!==p?(y=()=>{p&&B(!1)},x=[p],I[17]=p,I[18]=y,I[19]=x):(y=I[18],x=I[19]),(0,a.useEffect)(y,x),I[20]!==u?($=()=>{B(!0),u&&u(Error("Avatar: the image failed to load"))},I[20]=u,I[21]=$):$=I[21];let O=$,P="string"==typeof N?N:void 0;I[22]!==R?(k=(0,n.jsx)(eX,{children:(0,n.jsx)("svg",{width:"11",height:"7",viewBox:"0 0 11 7",fill:"none",children:(0,n.jsx)("path",{d:"M6.67948 1.50115L11 7L0 7L4.32052 1.50115C4.92109 0.736796 6.07891 0.736795 6.67948 1.50115Z",fill:R})})}),I[22]=R,I[23]=k):k=I[23],I[24]!==o||I[25]!==H||I[26]!==W||I[27]!==O||I[28]!==F||I[29]!==J||I[30]!==p?(S=!F&&p&&(0,n.jsxs)(eQ,{viewBox:`0 0 ${W} ${W}`,fill:"none",children:[(0,n.jsx)("defs",{children:(0,n.jsx)("pattern",{id:J,patternContentUnits:"objectBoundingBox",width:"1",height:"1",children:(0,n.jsx)("image",{href:p,width:"1",height:"1",onError:O})})}),(0,n.jsx)("circle",{cx:H,cy:H,r:H,fill:`url(#${J})`}),!o&&(0,n.jsx)(eU,{cx:H,cy:H,rx:H,ry:H,vectorEffect:"non-scaling-stroke"}),(0,n.jsx)(eq,{cx:H,cy:H,rx:H,ry:H,vectorEffect:"non-scaling-stroke"})]}),I[24]=o,I[25]=H,I[26]=W,I[27]=O,I[28]=F,I[29]=J,I[30]=p,I[31]=S):S=I[31];let V=(F||!p)&&s&&(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(eK,{children:(0,n.jsx)(eZ,{forwardedAs:"span",size:_.map(e0),weight:"medium",children:s})})});return I[32]!==eY||I[33]!==L||I[34]!==N||I[35]!==R||I[36]!==t||I[37]!==f||I[38]!==_||I[39]!==C||I[40]!==k||I[41]!==S||I[42]!==V||I[43]!==P||I[44]!==b?(j=(0,n.jsxs)(eY,{as:N,"data-as":P,"data-ui":"Avatar",...f,$color:R,$size:_,"aria-label":b,"data-arrow-position":L,"data-status":C,ref:t,title:b,children:[k,S,V]}),I[32]=eY,I[33]=L,I[34]=N,I[35]=R,I[36]=t,I[37]=f,I[38]=_,I[39]=C,I[40]=k,I[41]=S,I[42]=V,I[43]=P,I[44]=b,I[45]=j):j=I[45],j});function e0(e){return 1===e?1:2===e?3:5*(3===e)}e1.displayName="ForwardRef(Avatar)";let e2=d.I4.div.withConfig({displayName:"StyledAvatarCounter",componentId:"sc-1ydx86y-0"})(function(e){let{avatar:t,media:o}=(0,r.JW)(e.theme);return _(o,e.$size,e=>{let o=t.sizes[e];return o?{borderRadius:N(o.size/2),minWidth:N(o.size),height:N(o.size)}:x})},function(e){let{space:t}=(0,r.JW)(e.theme);return(0,d.AH)`
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    user-select: none;
    color: inherit;
    color: var(--card-fg-color);
    background: var(--card-bg-color);
    box-shadow:
      0 0 0 1px var(--card-bg-color),
      inset 0 0 0 1px var(--card-hairline-hard-color);
    padding: 0 ${N(t[2])};

    &:not([hidden]) {
      display: flex;
    }
  `}),e3=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p=(0,i.c)(20),{count:h,size:m}=e,g=void 0===m?1:m;if(p[0]!==t||p[1]!==g){let e=A(g);r=e2,l=e,c="AvatarCounter",s=t,o=eV,a="span",d=e.map(e4),p[0]=t,p[1]=g,p[2]=o,p[3]=r,p[4]=a,p[5]=d,p[6]=l,p[7]=c,p[8]=s}else o=p[2],r=p[3],a=p[4],d=p[5],l=p[6],c=p[7],s=p[8];return p[9]!==o||p[10]!==h||p[11]!==a||p[12]!==d?(u=(0,n.jsx)(o,{as:a,size:d,weight:"medium",children:h}),p[9]=o,p[10]=h,p[11]=a,p[12]=d,p[13]=u):u=p[13],p[14]!==r||p[15]!==l||p[16]!==c||p[17]!==s||p[18]!==u?(f=(0,n.jsx)(r,{$size:l,"data-ui":c,ref:s,children:u}),p[14]=r,p[15]=l,p[16]=c,p[17]=s,p[18]=u,p[19]=f):f=p[19],f});function e4(e){return 1===e?1:2===e?3:5*(3===e)}e3.displayName="ForwardRef(AvatarCounter)";let e5=(0,d.AH)`
  white-space: nowrap;

  & > div {
    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  }
`,e6=d.I4.div.withConfig({displayName:"StyledAvatarStack",componentId:"sc-cysmbb-0"})(function(e){let{avatar:t,media:o}=(0,r.JW)(e.theme);return _(o,e.$size,e=>{let o=t.sizes[e];return o?{"& > div + div":{marginLeft:N(o.distance)}}:x})},function(){return e5}),e7=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v=(0,i.c)(38);v[0]!==e?({children:o,maxLength:d,size:l,...r}=e,v[0]=e,v[1]=o,v[2]=r,v[3]=d,v[4]=l):(o=v[1],r=v[2],d=v[3],l=v[4]);let w=void 0===d?4:d,y=void 0===l?1:l;if(v[5]!==o||v[6]!==w||v[7]!==t||v[8]!==r||v[9]!==y){let e,i,d=a.Children.toArray(o).filter(a.isValidElement),l=Math.max(w,0);v[18]!==y?(e=A(y),v[18]=y,v[19]=e):e=v[19];let b=e,x=d.length,$=x-(l-1),k=$>1?d.slice($,x):d;c=e6,s="AvatarStack",u=r,f=t,p=b,v[20]!==x||v[21]!==b?(h=0===x&&(0,n.jsx)("div",{children:(0,n.jsx)(e3,{count:x,size:b})}),v[20]=x,v[21]=b,v[22]=h):h=v[22],v[23]!==$||v[24]!==x||v[25]!==b?(m=0!==x&&$>1&&(0,n.jsx)("div",{children:(0,n.jsx)(e3,{count:$,size:b})}),v[23]=$,v[24]=x,v[25]=b,v[26]=m):m=v[26],v[27]!==b?(i=(e,t)=>(0,n.jsx)("div",{children:(0,a.cloneElement)(e,{size:b})},String(t)),v[27]=b,v[28]=i):i=v[28],g=k.map(i),v[5]=o,v[6]=w,v[7]=t,v[8]=r,v[9]=y,v[10]=c,v[11]=s,v[12]=u,v[13]=f,v[14]=p,v[15]=h,v[16]=m,v[17]=g}else c=v[10],s=v[11],u=v[12],f=v[13],p=v[14],h=v[15],m=v[16],g=v[17];return v[29]!==c||v[30]!==s||v[31]!==u||v[32]!==f||v[33]!==p||v[34]!==h||v[35]!==m||v[36]!==g?(b=(0,n.jsxs)(c,{"data-ui":s,...u,ref:f,$size:p,children:[h,m,g]}),v[29]=c,v[30]=s,v[31]=u,v[32]=f,v[33]=p,v[34]=h,v[35]=m,v[36]=g,v[37]=b):b=v[37],b});e7.displayName="ForwardRef(AvatarStack)";let e8=d.I4.div.withConfig({displayName:"StyledBox",componentId:"sc-1hhky9f-0"})(function(){return q},en,function(){return[ee,et,eo,Q]},function(){return[eg,eb,ev,ew,ey,ex]},function(e){let{theme:t}=e;return[W(t,["margin"],e.$margin),W(t,["marginLeft","marginRight"],e.$marginX),W(t,["marginTop","marginBottom"],e.$marginY),W(t,["marginTop"],e.$marginTop),W(t,["marginRight"],e.$marginRight),W(t,["marginBottom"],e.$marginBottom),W(t,["marginLeft"],e.$marginLeft)].filter(Boolean)},eB),e9=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,J,O,P,D,V,G,Y,X,U,q,K,Z,Q,ee,et,eo,er,en=(0,i.c)(109);en[0]!==e?({as:R,column:o,columnStart:a,columnEnd:r,display:C,flex:d,height:l,margin:E,marginX:p,marginY:h,marginTop:f,marginRight:u,marginBottom:c,marginLeft:s,overflow:m,padding:z,paddingX:y,paddingY:x,paddingTop:w,paddingRight:v,paddingBottom:g,paddingLeft:b,row:k,rowStart:j,rowEnd:S,sizing:I,...$}=e,en[0]=e,en[1]=o,en[2]=r,en[3]=a,en[4]=d,en[5]=l,en[6]=c,en[7]=s,en[8]=u,en[9]=f,en[10]=p,en[11]=h,en[12]=m,en[13]=g,en[14]=b,en[15]=v,en[16]=w,en[17]=y,en[18]=x,en[19]=$,en[20]=k,en[21]=S,en[22]=j,en[23]=I,en[24]=R,en[25]=C,en[26]=E,en[27]=z):(o=en[1],r=en[2],a=en[3],d=en[4],l=en[5],c=en[6],s=en[7],u=en[8],f=en[9],p=en[10],h=en[11],m=en[12],g=en[13],b=en[14],v=en[15],w=en[16],y=en[17],x=en[18],$=en[19],k=en[20],S=en[21],j=en[22],I=en[23],R=en[24],C=en[25],E=en[26],z=en[27]);let ei=void 0===R?"div":R,ea=void 0===C?"block":C,ed=void 0===E?0:E,el=void 0===z?0:z,ec="string"==typeof ei?ei:void 0;return en[28]!==o?(N=A(o),en[28]=o,en[29]=N):N=en[29],en[30]!==a?(_=A(a),en[30]=a,en[31]=_):_=en[31],en[32]!==r?(W=A(r),en[32]=r,en[33]=W):W=en[33],en[34]!==ea?(H=A(ea),en[34]=ea,en[35]=H):H=en[35],en[36]!==d?(T=A(d),en[36]=d,en[37]=T):T=en[37],en[38]!==l?(L=A(l),en[38]=l,en[39]=L):L=en[39],en[40]!==ed?(M=A(ed),en[40]=ed,en[41]=M):M=en[41],en[42]!==p?(F=A(p),en[42]=p,en[43]=F):F=en[43],en[44]!==h?(B=A(h),en[44]=h,en[45]=B):B=en[45],en[46]!==f?(J=A(f),en[46]=f,en[47]=J):J=en[47],en[48]!==u?(O=A(u),en[48]=u,en[49]=O):O=en[49],en[50]!==c?(P=A(c),en[50]=c,en[51]=P):P=en[51],en[52]!==s?(D=A(s),en[52]=s,en[53]=D):D=en[53],en[54]!==m?(V=A(m),en[54]=m,en[55]=V):V=en[55],en[56]!==el?(G=A(el),en[56]=el,en[57]=G):G=en[57],en[58]!==y?(Y=A(y),en[58]=y,en[59]=Y):Y=en[59],en[60]!==x?(X=A(x),en[60]=x,en[61]=X):X=en[61],en[62]!==w?(U=A(w),en[62]=w,en[63]=U):U=en[63],en[64]!==v?(q=A(v),en[64]=v,en[65]=q):q=en[65],en[66]!==g?(K=A(g),en[66]=g,en[67]=K):K=en[67],en[68]!==b?(Z=A(b),en[68]=b,en[69]=Z):Z=en[69],en[70]!==k?(Q=A(k),en[70]=k,en[71]=Q):Q=en[71],en[72]!==j?(ee=A(j),en[72]=j,en[73]=ee):ee=en[73],en[74]!==S?(et=A(S),en[74]=S,en[75]=et):et=en[75],en[76]!==I?(eo=A(I),en[76]=I,en[77]=eo):eo=en[77],en[78]!==ei||en[79]!==e.children||en[80]!==t||en[81]!==$||en[82]!==L||en[83]!==M||en[84]!==F||en[85]!==B||en[86]!==J||en[87]!==O||en[88]!==P||en[89]!==D||en[90]!==V||en[91]!==G||en[92]!==Y||en[93]!==X||en[94]!==U||en[95]!==q||en[96]!==K||en[97]!==Z||en[98]!==Q||en[99]!==ee||en[100]!==et||en[101]!==eo||en[102]!==ec||en[103]!==N||en[104]!==_||en[105]!==W||en[106]!==H||en[107]!==T?(er=(0,n.jsx)(e8,{"data-as":ec,"data-ui":"Box",...$,$column:N,$columnStart:_,$columnEnd:W,$display:H,$flex:T,$height:L,$margin:M,$marginX:F,$marginY:B,$marginTop:J,$marginRight:O,$marginBottom:P,$marginLeft:D,$overflow:V,$padding:G,$paddingX:Y,$paddingY:X,$paddingTop:U,$paddingRight:q,$paddingBottom:K,$paddingLeft:Z,$row:Q,$rowStart:ee,$rowEnd:et,$sizing:eo,as:ei,ref:t,children:e.children}),en[78]=ei,en[79]=e.children,en[80]=t,en[81]=$,en[82]=L,en[83]=M,en[84]=F,en[85]=B,en[86]=J,en[87]=O,en[88]=P,en[89]=D,en[90]=V,en[91]=G,en[92]=Y,en[93]=X,en[94]=U,en[95]=q,en[96]=K,en[97]=Z,en[98]=Q,en[99]=ee,en[100]=et,en[101]=eo,en[102]=ec,en[103]=N,en[104]=_,en[105]=W,en[106]=H,en[107]=T,en[108]=er):er=en[108],er});e9.displayName="ForwardRef(Box)";let te=d.I4.div.withConfig({displayName:"StyledText",componentId:"sc-11ov82j-0"})(function(e){return H("text",e)},T,function(e){let{$accent:t,$muted:o}=e,{font:n}=(0,r.JW)(e.theme);return(0,d.AH)`
    color: var(--card-fg-color);

    ${t&&(0,d.AH)`
      color: var(--card-accent-fg-color);
    `}

    ${o&&(0,d.AH)`
      color: var(--card-muted-fg-color);
    `}

    & code {
      font-family: ${n.code.family};
      border-radius: 1px;
      background-color: var(--card-code-bg-color);
      color: var(--card-code-fg-color);
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow:
          0 0 0 1px var(--card-bg-color),
          0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: ${n.text.weights.bold};
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
      color: var(--card-icon-color);

      & path {
        vector-effect: non-scaling-stroke !important;
      }
    }
  `}),tt=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g=(0,i.c)(26);g[0]!==e?({accent:d,align:o,children:r,muted:l,size:c,textOverflow:s,weight:u,...a}=e,g[0]=e,g[1]=o,g[2]=r,g[3]=a,g[4]=d,g[5]=l,g[6]=c,g[7]=s,g[8]=u):(o=g[1],r=g[2],a=g[3],d=g[4],l=g[5],c=g[6],s=g[7],u=g[8]);let b=void 0!==d&&d,v=void 0!==l&&l,w=void 0===c?2:c,y=r;if("ellipsis"===s){let e;g[9]!==y?(e=(0,n.jsx)(eP,{children:y}),g[9]=y,g[10]=e):e=g[10],y=e}return g[11]!==o?(f=A(o),g[11]=o,g[12]=f):f=g[12],g[13]!==w?(p=A(w),g[13]=w,g[14]=p):p=g[14],g[15]!==y?(h=(0,n.jsx)("span",{children:y}),g[15]=y,g[16]=h):h=g[16],g[17]!==b||g[18]!==v||g[19]!==t||g[20]!==a||g[21]!==f||g[22]!==p||g[23]!==h||g[24]!==u?(m=(0,n.jsx)(te,{"data-ui":"Text",...a,$accent:b,$align:f,$muted:v,ref:t,$size:p,$weight:u,children:h}),g[17]=b,g[18]=v,g[19]=t,g[20]=a,g[21]=f,g[22]=p,g[23]=h,g[24]=u,g[25]=m):m=g[25],m});tt.displayName="ForwardRef(Text)";let to=(0,d.I4)(e9).withConfig({displayName:"StyledBadge",componentId:"sc-5u140l-0"})(eJ,function(e){let{$tone:t}=e;return{"--card-bg-color":`var(--card-badge-${t}-bg-color)`,"--card-fg-color":`var(--card-badge-${t}-fg-color)`,backgroundColor:"var(--card-bg-color)",cursor:"default","&:not([hidden])":{display:"inline-block",verticalAlign:"top"}}}),tr=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h=(0,i.c)(21);if(h[0]!==e){let{children:t,fontSize:n,mode:i,padding:s,radius:u,tone:f,...p}=e;o=t,a=n,d=s,l=u,c=f,r=p,h[0]=e,h[1]=o,h[2]=r,h[3]=a,h[4]=d,h[5]=l,h[6]=c}else o=h[1],r=h[2],a=h[3],d=h[4],l=h[5],c=h[6];let m=void 0===a?1:a,g=void 0===d?1:d,b=void 0===l?"full":l,v=void 0===c?"default":c;return h[7]!==b?(s=A(b),h[7]=b,h[8]=s):s=h[8],h[9]!==g?(u=A(g),h[9]=g,h[10]=u):u=h[10],h[11]!==o||h[12]!==m?(f=(0,n.jsx)(tt,{size:m,children:o}),h[11]=o,h[12]=m,h[13]=f):f=h[13],h[14]!==t||h[15]!==r||h[16]!==s||h[17]!==u||h[18]!==f||h[19]!==v?(p=(0,n.jsx)(to,{"data-ui":"Badge",...r,$tone:v,$radius:s,padding:u,ref:t,children:f}),h[14]=t,h[15]=r,h[16]=s,h[17]=u,h[18]=f,h[19]=v,h[20]=p):p=h[20],p});tr.displayName="ForwardRef(Badge)";let tn=(0,d.I4)(e9).withConfig({displayName:"StyledFlex",componentId:"sc-oxesg3-0"})(en,function(){return[ea,ed,el,ec,es,eu]}),ti=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g,b=(0,i.c)(27);b[0]!==e?({align:o,as:r,direction:c,gap:a,justify:d,wrap:s,...l}=e,b[0]=e,b[1]=o,b[2]=r,b[3]=a,b[4]=d,b[5]=l,b[6]=c,b[7]=s):(o=b[1],r=b[2],a=b[3],d=b[4],l=b[5],c=b[6],s=b[7]);let v=void 0===c?"row":c;return b[8]!==o?(u=A(o),b[8]=o,b[9]=u):u=b[9],b[10]!==v?(f=A(v),b[10]=v,b[11]=f):f=b[11],b[12]!==a?(p=A(a),b[12]=a,b[13]=p):p=b[13],b[14]!==d?(h=A(d),b[14]=d,b[15]=h):h=b[15],b[16]!==s?(m=A(s),b[16]=s,b[17]=m):m=b[17],b[18]!==r||b[19]!==t||b[20]!==l||b[21]!==u||b[22]!==f||b[23]!==p||b[24]!==h||b[25]!==m?(g=(0,n.jsx)(tn,{"data-ui":"Flex",...l,$align:u,$direction:f,$gap:p,$justify:h,$wrap:m,forwardedAs:r,ref:t}),b[18]=r,b[19]=t,b[20]=l,b[21]=u,b[22]=f,b[23]=p,b[24]=h,b[25]=m,b[26]=g):g=b[26],g});ti.displayName="ForwardRef(Flex)";let ta=(0,d.i7)`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`,td=(0,d.I4)(tt).withConfig({displayName:"StyledSpinner",componentId:"sc-124hnd0-0"})`& > span > svg{animation:${ta} 500ms linear infinite;}`,tl=(0,a.forwardRef)(function(e,t){let o,r,a=(0,i.c)(4);return a[0]===Symbol.for("react.memo_cache_sentinel")?(o=(0,n.jsx)(s.Nl1,{}),a[0]=o):o=a[0],a[1]!==e||a[2]!==t?(r=(0,n.jsx)(td,{"data-ui":"Spinner",...e,ref:t,children:o}),a[1]=e,a[2]=t,a[3]=r):r=a[3],r});function tc(e,t,o=!1){return{"--card-backdrop-color":e.backdrop,"--card-focus-ring-color":e.focusRing,"--card-shadow-outline-color":e.shadow.outline,"--card-shadow-umbra-color":e.shadow.umbra,"--card-shadow-penumbra-color":e.shadow.penumbra,"--card-shadow-ambient-color":e.shadow.ambient,"--card-accent-fg-color":t.accent.fg,"--card-avatar-gray-bg-color":t.avatar.gray.bg,"--card-avatar-gray-fg-color":t.avatar.gray.fg,"--card-avatar-blue-bg-color":t.avatar.blue.bg,"--card-avatar-blue-fg-color":t.avatar.blue.fg,"--card-avatar-purple-bg-color":t.avatar.purple.bg,"--card-avatar-purple-fg-color":t.avatar.purple.fg,"--card-avatar-magenta-bg-color":t.avatar.magenta.bg,"--card-avatar-magenta-fg-color":t.avatar.magenta.fg,"--card-avatar-red-bg-color":t.avatar.red.bg,"--card-avatar-red-fg-color":t.avatar.red.fg,"--card-avatar-orange-bg-color":t.avatar.orange.bg,"--card-avatar-orange-fg-color":t.avatar.orange.fg,"--card-avatar-yellow-bg-color":t.avatar.yellow.bg,"--card-avatar-yellow-fg-color":t.avatar.yellow.fg,"--card-avatar-green-bg-color":t.avatar.green.bg,"--card-avatar-green-fg-color":t.avatar.green.fg,"--card-avatar-cyan-bg-color":t.avatar.cyan.bg,"--card-avatar-cyan-fg-color":t.avatar.cyan.fg,"--card-bg-color":t.bg,"--card-bg-image":o?`repeating-conic-gradient(${t.bg} 0% 25%, ${t.muted.bg} 0% 50%)`:void 0,"--card-border-color":t.border,"--card-badge-default-bg-color":t.badge.default.bg,"--card-badge-default-dot-color":t.badge.default.dot,"--card-badge-default-fg-color":t.badge.default.fg,"--card-badge-default-icon-color":t.badge.default.icon,"--card-badge-neutral-bg-color":t.badge.neutral?.bg,"--card-badge-neutral-dot-color":t.badge.neutral?.dot,"--card-badge-neutral-fg-color":t.badge.neutral?.fg,"--card-badge-neutral-icon-color":t.badge.neutral?.icon,"--card-badge-primary-bg-color":t.badge.primary.bg,"--card-badge-primary-dot-color":t.badge.primary.dot,"--card-badge-primary-fg-color":t.badge.primary.fg,"--card-badge-primary-icon-color":t.badge.primary.icon,"--card-badge-suggest-bg-color":t.badge.suggest?.bg,"--card-badge-suggest-dot-color":t.badge.suggest?.dot,"--card-badge-suggest-fg-color":t.badge.suggest?.fg,"--card-badge-suggest-icon-color":t.badge.suggest?.icon,"--card-badge-positive-bg-color":t.badge.positive.bg,"--card-badge-positive-dot-color":t.badge.positive.dot,"--card-badge-positive-fg-color":t.badge.positive.fg,"--card-badge-positive-icon-color":t.badge.positive.icon,"--card-badge-caution-bg-color":t.badge.caution.bg,"--card-badge-caution-dot-color":t.badge.caution.dot,"--card-badge-caution-fg-color":t.badge.caution.fg,"--card-badge-caution-icon-color":t.badge.caution.icon,"--card-badge-critical-bg-color":t.badge.critical.bg,"--card-badge-critical-dot-color":t.badge.critical.dot,"--card-badge-critical-fg-color":t.badge.critical.fg,"--card-badge-critical-icon-color":t.badge.critical.icon,"--card-code-bg-color":t.code.bg,"--card-code-fg-color":t.code.fg,"--card-fg-color":t.fg,"--card-icon-color":t.icon,"--card-kbd-bg-color":t.kbd.bg,"--card-kbd-border-color":t.kbd.border,"--card-kbd-fg-color":t.kbd.fg,"--card-link-fg-color":t.link.fg,"--card-muted-bg-color":t.muted.bg,"--card-muted-fg-color":t.muted.fg,"--card-skeleton-color-from":t.skeleton.from,"--card-skeleton-color-to":t.skeleton.to,"--card-bg2-color":t.muted.bg,"--card-link-color":t.link.fg,"--card-hairline-soft-color":t.border,"--card-hairline-hard-color":t.border}}function ts(...e){return e.filter(Boolean).join(",")}tl.displayName="ForwardRef(Spinner)";let tu=d.I4.button.withConfig({displayName:"StyledButton",componentId:"sc-aaekt4-0"})(eJ,function(e){let{$width:t}=e,{style:o}=(0,r.JW)(e.theme);return(0,d.AH)`
    ${o?.button};

    -webkit-font-smoothing: inherit;
    appearance: none;
    display: inline-flex;
    align-items: center;
    font: inherit;
    border: 0;
    outline: none;
    user-select: none;
    text-decoration: none;
    border: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    white-space: nowrap;
    text-align: left;
    position: relative;
    vertical-align: top;

    ${"fill"===t&&(0,d.AH)`
      width: -moz-available;
      width: -webkit-fill-available;
      width: stretch;
    `}

    & > span {
      display: block;
      flex: 1;
      min-width: 0;
      border-radius: inherit;
    }

    &::-moz-focus-inner {
      border: 0;
      padding: 0;
    }
  `},function(e){let{$mode:t}=e,{button:o,color:n,style:i}=(0,r.JW)(e.theme),a="ghost"===e.$mode,d=n.button[t]||n.button.default,l=d[e.$tone]||d.default,c={width:o.border.width,color:"var(--card-border-color)"},s=void 0;return[tc(n,l.enabled),{backgroundColor:"var(--card-bg-color)",color:"var(--card-fg-color)",boxShadow:ef(c),'&:disabled, &[data-disabled="true"]':tc(n,l.disabled),"&:not([data-disabled='true'])":{boxShadow:ts(ef(c),a?s:void 0),"&:focus":{boxShadow:ep({base:n,border:{width:2,color:n.bg},focusRing:o.focusRing})},"&:focus:not(:focus-visible)":{boxShadow:ts(ef(c),a?s:void 0)},"@media (hover: hover)":{"&:hover":tc(n,l.hovered),"&:active":tc(n,l.pressed),"&[data-hovered]":tc(n,l.hovered)},"&[data-selected]":tc(n,l.pressed)}},i?.button?.root].filter(Boolean)}),tf=d.I4.div.withConfig({displayName:"LoadingBox",componentId:"sc-aaekt4-1"})`position:absolute;top:0;left:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;background-color:var(--card-bg-color);border-radius:inherit;z-index:1;box-shadow:inherit;`,tp=(0,a.forwardRef)(function(e,t){let o,r,d,l,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,J,O,P,V,G,Y,X,U=(0,i.c)(86);U[0]!==e?({children:d,disabled:l,fontSize:w,icon:o,iconRight:r,justify:y,loading:s,mode:x,padding:$,paddingX:m,paddingY:g,paddingTop:h,paddingBottom:u,paddingLeft:f,paddingRight:p,radius:k,selected:v,space:S,text:C,textAlign:E,textWeight:z,tone:j,type:I,muted:R,width:N,...b}=e,U[0]=e,U[1]=o,U[2]=r,U[3]=d,U[4]=l,U[5]=s,U[6]=u,U[7]=f,U[8]=p,U[9]=h,U[10]=m,U[11]=g,U[12]=b,U[13]=v,U[14]=w,U[15]=y,U[16]=x,U[17]=$,U[18]=k,U[19]=S,U[20]=j,U[21]=I,U[22]=R,U[23]=C,U[24]=E,U[25]=z,U[26]=N):(o=U[1],r=U[2],d=U[3],l=U[4],s=U[5],u=U[6],f=U[7],p=U[8],h=U[9],m=U[10],g=U[11],b=U[12],v=U[13],w=U[14],y=U[15],x=U[16],$=U[17],k=U[18],S=U[19],j=U[20],I=U[21],R=U[22],C=U[23],E=U[24],z=U[25],N=U[26]);let q=void 0===w?1:w,K=void 0===y?"center":y,Z=void 0===x?"default":x,Q=void 0===$?3:$,ee=void 0===k?2:k,et=void 0===S?3:S,eo=void 0===j?"default":j,er=void 0===I?"button":I,en=void 0!==R&&R,{button:ei}=D();U[27]!==K?(_=A(K),U[27]=K,U[28]=_):_=U[28];let ea=_;U[29]!==Q?(W=A(Q),U[29]=Q,U[30]=W):W=U[30];let ed=W;U[31]!==m?(H=A(m),U[31]=m,U[32]=H):H=U[32];let el=H;U[33]!==g?(T=A(g),U[33]=g,U[34]=T):T=U[34];let ec=T;U[35]!==h?(L=A(h),U[35]=h,U[36]=L):L=U[36];let es=L;U[37]!==u?(M=A(u),U[37]=u,U[38]=M):M=U[38];let eu=M;U[39]!==f?(F=A(f),U[39]=f,U[40]=F):F=U[40];let ef=F;U[41]!==p?(B=A(p),U[41]=p,U[42]=B):B=U[42];let ep=B;U[43]!==ee?(J=A(ee),U[43]=ee,U[44]=J):J=U[44];let eh=J;U[45]!==et?(O=A(et),U[45]=et,U[46]=O):O=U[46];let em=O;U[47]!==ed||U[48]!==eu||U[49]!==ef||U[50]!==ep||U[51]!==es||U[52]!==el||U[53]!==ec?(P={padding:ed,paddingX:el,paddingY:ec,paddingTop:es,paddingBottom:eu,paddingLeft:ef,paddingRight:ep},U[47]=ed,U[48]=eu,U[49]=ef,U[50]=ep,U[51]=es,U[52]=el,U[53]=ec,U[54]=P):P=U[54];let eg=P,eb=!!(s||l),ev=v?"":void 0,ew=!!(s||l);return U[55]!==s?(V=!!s&&(0,n.jsx)(tf,{children:(0,n.jsx)(tl,{})}),U[55]=s,U[56]=V):V=U[56],U[57]!==o||U[58]!==r||U[59]!==eg||U[60]!==ei||U[61]!==q||U[62]!==ea||U[63]!==en||U[64]!==em||U[65]!==C||U[66]!==E||U[67]!==z?(G=(o||C||r)&&(0,n.jsx)(e9,{as:"span",...eg,children:(0,n.jsxs)(ti,{as:"span",justify:ea,gap:em,children:[o&&(0,n.jsxs)(tt,{size:q,children:[(0,a.isValidElement)(o)&&o,(0,c.isValidElementType)(o)&&(0,n.jsx)(o,{})]}),C&&(0,n.jsx)(e9,{children:(0,n.jsx)(tt,{muted:en,align:E,size:q,textOverflow:"ellipsis",weight:z??ei.textWeight,children:C})}),r&&(0,n.jsxs)(tt,{size:q,children:[(0,a.isValidElement)(r)&&r,(0,c.isValidElementType)(r)&&(0,n.jsx)(r,{})]})]})}),U[57]=o,U[58]=r,U[59]=eg,U[60]=ei,U[61]=q,U[62]=ea,U[63]=en,U[64]=em,U[65]=C,U[66]=E,U[67]=z,U[68]=G):G=U[68],U[69]!==eg||U[70]!==d?(Y=d&&(0,n.jsx)(e9,{as:"span",...eg,children:d}),U[69]=eg,U[70]=d,U[71]=Y):Y=U[71],U[72]!==Z||U[73]!==eh||U[74]!==t||U[75]!==b||U[76]!==eb||U[77]!==ev||U[78]!==ew||U[79]!==V||U[80]!==G||U[81]!==Y||U[82]!==eo||U[83]!==er||U[84]!==N?(X=(0,n.jsxs)(tu,{"data-ui":"Button",...b,$mode:Z,$radius:eh,$tone:eo,"data-disabled":eb,"data-selected":ev,disabled:ew,ref:t,type:er,$width:N,children:[V,G,Y]}),U[72]=Z,U[73]=eh,U[74]=t,U[75]=b,U[76]=eb,U[77]=ev,U[78]=ew,U[79]=V,U[80]=G,U[81]=Y,U[82]=eo,U[83]=er,U[84]=N,U[85]=X):X=U[85],X});tp.displayName="ForwardRef(Button)";let th=(0,d.I4)(e9).withConfig({displayName:"StyledCard",componentId:"sc-osnro2-0"})(function(){return[V,G,Y,X,U]},eJ,function(e){let{card:t,media:o,shadow:n}=(0,r.JW)(e.theme);return _(o,e.$shadow,e=>(function(e,t=1){if(!e)return x;let o=`0 0 0 ${N(t)} var(--card-shadow-outline-color)`,r=eO(e.umbra,"var(--card-shadow-umbra-color)"),n=eO(e.penumbra,"var(--card-shadow-penumbra-color)"),i=eO(e.ambient,"var(--card-shadow-ambient-color)");return{boxShadow:`${o}, ${r}, ${n}, ${i}`}})(n[e],t.shadow.outline))},function(e){return[function(e){let{$checkered:t}=e,{space:o}=(0,r.JW)(e.theme);return(0,d.AH)`
    ${t&&(0,d.AH)`
      background-size: ${o[3]}px ${o[3]}px;
      background-position: 50% 50%;
      background-image: var(--card-bg-image);
    `}

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: -moz-available;
      width: -webkit-fill-available;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      outline: none;
      text-decoration: none;
    }

    /* &:is(pre) */
    &[data-as='pre'] {
      font: inherit;
    }
  `}(e),function(e){let{$checkered:t,$focusRing:o,$muted:n}=e,{card:i,color:a,style:l}=(0,r.JW)(e.theme),c={width:i.border.width,color:"var(--card-border-color)"};return(0,d.AH)`
    color-scheme: ${a._dark?"dark":"light"};

    ${tc(a,a,t)}

    background-color: ${n?"var(--card-muted-bg-color)":"var(--card-bg-color)"};
    color: var(--card-fg-color);

    /* &:is(button) */
    &[data-as='button'] {
      --card-focus-ring-box-shadow: none;

      cursor: default;
      box-shadow: var(--card-focus-ring-box-shadow);

      &:disabled {
        ${tc(a,a.selectable.default.disabled,t)}
      }

      &:not(:disabled) {
        &[data-pressed] {
          ${tc(a,a.selectable.default.pressed,t)}
        }

        &[data-selected] {
          ${tc(a,a.selectable.default.selected,t)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${tc(a,a.selectable.default.hovered,t)}
            }

            &:active {
              ${tc(a,a.selectable.default.pressed,t)}
            }
          }
        }

        &:focus-visible {
          --card-focus-ring-box-shadow: ${o?ep({base:a,border:c,focusRing:i.focusRing}):void 0};
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      cursor: pointer;
      box-shadow: var(--card-focus-ring-box-shadow);

      &[data-disabled] {
        ${tc(a,a.selectable.default.disabled,t)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${tc(a,a.selectable.default.pressed,t)}
        }

        &[data-selected] {
          ${tc(a,a.selectable.default.selected,t)}
        }

        @media (hover: hover) {
          &:not([data-pressed]):not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${tc(a,a.selectable.default.hovered,t)}
            }

            &:active {
              ${tc(a,a.selectable.default.pressed,t)}
            }
          }
        }

        &:focus-visible {
          --card-focus-ring-box-shadow: ${o?ep({base:a,border:c,focusRing:i.focusRing}):void 0};
        }
      }
    }

    ${l?.card?.root}
  `}(e)]}),tm=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z=(0,i.c)(56);z[0]!==e?({__unstable_checkered:b,__unstable_focusRing:v,as:o,border:r,borderTop:s,borderRight:l,borderBottom:a,borderLeft:d,muted:u,pressed:f,radius:w,scheme:h,selected:m,shadow:g,tone:y,...p}=e,z[0]=e,z[1]=o,z[2]=r,z[3]=a,z[4]=d,z[5]=l,z[6]=s,z[7]=u,z[8]=f,z[9]=p,z[10]=h,z[11]=m,z[12]=g,z[13]=b,z[14]=v,z[15]=w,z[16]=y):(o=z[1],r=z[2],a=z[3],d=z[4],l=z[5],s=z[6],u=z[7],f=z[8],p=z[9],h=z[10],m=z[11],g=z[12],b=z[13],v=z[14],w=z[15],y=z[16]);let N=void 0!==b&&b,_=void 0!==v&&v,W=void 0===w?0:w,H=void 0===y?"default":y,T=(0,c.isValidElementType)(o)?o:"div",L=J(),M="inherit"===H?L.tone:H,F="string"==typeof T?T:void 0,B=L.scheme;z[17]!==r?(x=A(r),z[17]=r,z[18]=x):x=z[18],z[19]!==s?($=A(s),z[19]=s,z[20]=$):$=z[20],z[21]!==l?(k=A(l),z[21]=l,z[22]=k):k=z[22],z[23]!==a?(S=A(a),z[23]=a,z[24]=S):S=z[24],z[25]!==d?(j=A(d),z[25]=d,z[26]=j):j=z[26],z[27]!==W?(I=A(W),z[27]=W,z[28]=I):I=z[28],z[29]!==g?(R=A(g),z[29]=g,z[30]=R):R=z[30];let P=N?"":void 0,D=f?"":void 0,V=m?"":void 0;return z[31]!==T||z[32]!==N||z[33]!==_||z[34]!==u||z[35]!==t||z[36]!==p||z[37]!==L.scheme||z[38]!==m||z[39]!==j||z[40]!==I||z[41]!==R||z[42]!==P||z[43]!==D||z[44]!==V||z[45]!==F||z[46]!==x||z[47]!==$||z[48]!==k||z[49]!==S||z[50]!==M?(C=(0,n.jsx)(th,{"data-as":F,"data-scheme":B,"data-ui":"Card","data-tone":M,...p,$border:x,$borderTop:$,$borderRight:k,$borderBottom:S,$borderLeft:j,$checkered:N,$focusRing:_,$muted:u,$radius:I,$shadow:R,$tone:M,"data-checkered":P,"data-pressed":D,"data-selected":V,forwardedAs:T,ref:t,selected:m}),z[31]=T,z[32]=N,z[33]=_,z[34]=u,z[35]=t,z[36]=p,z[37]=L.scheme,z[38]=m,z[39]=j,z[40]=I,z[41]=R,z[42]=P,z[43]=D,z[44]=V,z[45]=F,z[46]=x,z[47]=$,z[48]=k,z[49]=S,z[50]=M,z[51]=C):C=z[51],z[52]!==h||z[53]!==C||z[54]!==M?(E=(0,n.jsx)(O,{scheme:h,tone:M,children:C}),z[52]=h,z[53]=C,z[54]=M,z[55]=E):E=z[55],E});function tg(e,t,o){let r,n,d,l=(0,i.c)(9),c=void 0===t?tb:t;l[0]!==o||l[1]!==c||l[2]!==e?(r=t=>{if(!e)return;let r=t.target;if(!(r instanceof Node))return;let n=o?.();if(!n||n.contains(r)){for(let e of c().flat())if(e&&(r===e||e.contains(r)))return;e(t)}},l[0]=o,l[1]=c,l[2]=e,l[3]=r):r=l[3];let s=(0,b.J)(r),u=!!e;l[4]!==u||l[5]!==s?(n=()=>{if(!u)return;let e=e=>s(e);return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},l[4]=u,l[5]=s,l[6]=n):n=l[6],l[7]!==u?(d=[u],l[7]=u,l[8]=d):d=l[8],(0,a.useEffect)(n,d),(0,a.useDebugValue)(e?"MouseDown On":"MouseDown Off")}function tb(){return y}function tv(e,t){let o,r,n=(0,i.c)(4);n[0]!==t||n[1]!==e?(o=()=>{e.current?.setCustomValidity(t||"")},r=[t,e],n[0]=t,n[1]=e,n[2]=o,n[3]=r):(o=n[2],r=n[3]),(0,a.useEffect)(o,r)}tm.displayName="ForwardRef(Card)";let tw="u">typeof document&&"u">typeof window&&window.ResizeObserver?window.ResizeObserver:m.tb,ty=function(){let e=new WeakMap,t=new WeakMap;return{subscribe(o,r){let n=t.get(o)||[],i=e.get(o);return t.has(o)||(t.set(o,n),i=({subscribe(e,t){let o=new tw(([e])=>{t({_contentRect:e.contentRect,border:{width:e.borderBoxSize[0].inlineSize,height:e.borderBoxSize[0].blockSize},content:{width:e.contentRect.width,height:e.contentRect.height}})});return o.observe(e),()=>{o.unobserve(e),o.disconnect()}}}).subscribe(o,e=>{for(let t of n)t(e)})),n.push(r),()=>{let e=n.indexOf(r);e>-1&&n.splice(e,1),0===n.length&&i&&i()}}}}();function tx(e){let t,o,r=(0,i.c)(3),[n,d]=(0,a.useState)(null);return r[0]!==e?(t=()=>{if(e)return ty.subscribe(e,d)},o=[e],r[0]=e,r[1]=t,r[2]=o):(t=r[1],o=r[2]),(0,a.useEffect)(t,o),n}function t$(e,t){let o,r,n,d=(0,i.c)(7);d[0]!==e?(o=t=>e(t),d[0]=e,d[1]=o):o=d[1];let l=(0,b.J)(o);d[2]!==l||d[3]!==t?(r=()=>{let e=e=>l(e);return window.addEventListener("keydown",e,t),()=>window.removeEventListener("keydown",e,t)},d[2]=l,d[3]=t,d[4]=r):r=d[4],d[5]!==t?(n=[t],d[5]=t,d[6]=n):n=d[6],(0,a.useEffect)(r,n)}function tk(e,t){let o,r,n=(0,i.c)(4);return(0,a.useDebugValue)(e),n[0]!==e?(o=t=>{let o=window.matchMedia(e);return o.addEventListener("change",t),()=>o.removeEventListener("change",t)},n[0]=e,n[1]=o):o=n[1],n[2]!==e?(r=()=>window.matchMedia(e).matches,n[2]=e,n[3]=r):r=n[3],(0,a.useSyncExternalStore)(o,r,t)}function tS(){return 0}function tj(){let e,t=(0,i.c)(2),{media:o}=D();t[0]!==o?(e=function(e){let t,o=e.length,r=()=>{if(!t){t=[];for(let n=o;n>-1;n-=1){var r;let o=0===(r=n)?`screen and (max-width: ${e[r]-1}px)`:r===e.length?`screen and (min-width: ${e[r-1]}px)`:`screen and (min-width: ${e[r-1]}px) and (max-width: ${e[r]-1}px)`;t.push({index:n,mq:window.matchMedia(o)})}}return t};return{getSnapshot:()=>{for(let{index:e,mq:t}of r())if(t.matches)return e;return 0},subscribe:e=>{let t=[];for(let{mq:o}of r()){let r=()=>{o.matches&&e()};o.addEventListener("change",r),t.push(()=>o.removeEventListener("change",r))}return()=>{for(let e of t)e()}}}}(o),t[0]=o,t[1]=e):e=t[1];let r=e;return(0,a.useSyncExternalStore)(r.subscribe,r.getSnapshot,tS)}function tI(e){return tk("(prefers-color-scheme: dark)",void 0===e?tR:e)}function tR(){return!1}function tC(e){return tk("(prefers-reduced-motion: reduce)",void 0===e?tE:e)}function tE(){return!1}let tz=d.I4.div.withConfig({displayName:"StyledCheckbox",componentId:"sc-1l5mt2l-0"})(function(){return(0,d.AH)`
    position: relative;
    display: inline-block;
  `}),tN=d.I4.input.withConfig({displayName:"Input",componentId:"sc-1l5mt2l-1"})(function(e){let{color:t,input:o,radius:n}=(0,r.JW)(e.theme),{focusRing:i}=o.checkbox;return(0,d.AH)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    z-index: 1;
    padding: 0;
    margin: 0;

    & + span {
      position: relative;
      display: block;
      height: ${N(o.checkbox.size)};
      width: ${N(o.checkbox.size)};
      box-sizing: border-box;
      box-shadow: ${ef({color:t.input.default.enabled.border,width:o.border.width})};
      border-radius: ${N(n[2])};
      line-height: 1;
      background-color: ${t.input.default.enabled.bg};

      & > svg {
        display: block;
        position: absolute;
        opacity: 0;
        height: 100%;
        width: 100%;

        & > path {
          vector-effect: non-scaling-stroke;
          stroke-width: 1.5px !important;
        }
      }
    }

    &:checked + span {
      background: ${t.input.default.enabled.fg};
      box-shadow: ${ef({color:t.input.default.enabled.fg,width:o.border.width})};
      color: ${t.input.default.enabled.bg};
    }

    /* focus */
    &:not(:disabled):focus:focus-visible + span {
      box-shadow: ${ep({focusRing:i})};
    }

    /* focus when checked - uses a different offset */
    &:not(:disabled):focus:focus-visible&:checked + span {
      box-shadow: ${ep({focusRing:{width:1,offset:1}})};
    }

    &[data-error] + span {
      background-color: ${t.input.invalid.enabled.border};
      box-shadow: ${ef({width:o.border.width,color:t.input.invalid.enabled.muted.bg})};
      color: ${t.input.default.disabled.fg};
    }
    &[data-error]&:checked + span {
      background-color: ${t.input.invalid.enabled.muted.bg};
      color: ${t.input.default.enabled.bg};
    }
    &[data-error]&:checked&:not(:disabled):focus:focus-visible + span {
      box-shadow: ${ep({border:{width:o.border.width,color:t.input.invalid.readOnly.muted.bg},focusRing:{width:1,offset:1}})};
    }

    &:disabled + span {
      background-color: ${t.input.default.disabled.bg};
      box-shadow: ${ef({width:o.border.width,color:t.input.default.disabled.border})};
      color: ${t.input.default.disabled.fg};
    }
    &:disabled&:checked + span {
      background-color: ${t.input.default.disabled.muted.bg};
    }

    &[data-read-only] + span {
      background-color: ${t.input.default.readOnly.bg};
      box-shadow: ${ef({width:o.border.width,color:t.input.default.readOnly.border})};
      color: ${t.input.default.readOnly.fg};
    }

    &[data-read-only]&:checked + span {
      background-color: ${t.input.default.readOnly.muted.bg};
    }

    &:checked + span > svg:first-child {
      opacity: 1;
    }
    &:indeterminate + span > svg:last-child {
      opacity: 1;
    }
  `}),t_=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,u,f,p,h,m,g,b,v,w,y=(0,i.c)(25);y[0]!==e?({checked:o,className:r,disabled:l,indeterminate:c,customValidity:d,readOnly:u,style:p,...f}=e,y[0]=e,y[1]=o,y[2]=r,y[3]=d,y[4]=l,y[5]=c,y[6]=u,y[7]=f,y[8]=p):(o=y[1],r=y[2],d=y[3],l=y[4],c=y[5],u=y[6],f=y[7],p=y[8]);let x=(0,a.useRef)(null);y[9]===Symbol.for("react.memo_cache_sentinel")?(h=()=>x.current,y[9]=h):h=y[9],(0,a.useImperativeHandle)(t,h),y[10]!==c?(m=()=>{x.current&&(x.current.indeterminate=c||!1)},g=[c],y[10]=c,y[11]=m,y[12]=g):(m=y[11],g=y[12]),(0,a.useEffect)(m,g),tv(x,d);let $=!l&&u?"":void 0,k=d?"":void 0,S=l||u;return y[13]!==o||y[14]!==u||y[15]!==f||y[16]!==$||y[17]!==k||y[18]!==S?(b=(0,n.jsx)(tN,{"data-read-only":$,"data-error":k,...f,checked:o,disabled:S,type:"checkbox",readOnly:u,ref:x}),y[13]=o,y[14]=u,y[15]=f,y[16]=$,y[17]=k,y[18]=S,y[19]=b):b=y[19],y[20]===Symbol.for("react.memo_cache_sentinel")?(v=(0,n.jsxs)("span",{children:[(0,n.jsx)(s.Nrt,{}),(0,n.jsx)(s.YPx,{})]}),y[20]=v):v=y[20],y[21]!==r||y[22]!==p||y[23]!==b?(w=(0,n.jsxs)(tz,{className:r,"data-ui":"Checkbox",style:p,children:[b,v]}),y[21]=r,y[22]=p,y[23]=b,y[24]=w):w=y[24],w});function tA({theme:e}){let{color:{syntax:t}}=(0,r.JW)(e);return{"&.atrule":{color:t.atrule},"&.attr-name":{color:t.attrName},"&.attr-value":{color:t.attrValue},"&.attribute":{color:t.attribute},"&.boolean":{color:t.boolean},"&.builtin":{color:t.builtin},"&.cdata":{color:t.cdata},"&.char":{color:t.char},"&.class":{color:t.class},"&.class-name":{color:t.className},"&.comment":{color:t.comment},"&.constant":{color:t.constant},"&.deleted":{color:t.deleted},"&.doctype":{color:t.doctype},"&.entity":{color:t.entity},"&.function":{color:t.function},"&.hexcode":{color:t.hexcode},"&.id":{color:t.id},"&.important":{color:t.important},"&.inserted":{color:t.inserted},"&.keyword":{color:t.keyword},"&.number":{color:t.number},"&.operator":{color:t.operator},"&.prolog":{color:t.prolog},"&.property":{color:t.property},"&.pseudo-class":{color:t.pseudoClass},"&.pseudo-element":{color:t.pseudoElement},"&.punctuation":{color:t.punctuation},"&.regex":{color:t.regex},"&.selector":{color:t.selector},"&.string":{color:t.string},"&.symbol":{color:t.symbol},"&.tag":{color:t.tag},"&.unit":{color:t.unit},"&.url":{color:t.url},"&.variable":{color:t.variable}}}t_.displayName="ForwardRef(Checkbox)";let tW=(0,a.lazy)(()=>o.e(1931).then(o.bind(o,51931))),tH=d.I4.pre.withConfig({displayName:"StyledCode",componentId:"sc-4dymyn-0"})(function(){return(0,d.AH)`
    color: var(--card-code-fg-color);

    & code {
      font-family: inherit;

      &.refractor .token {
        ${tA}
      }
    }

    & a {
      color: inherit;
      text-decoration: underline;
      border-radius: 1px;
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `},function(e){return H("code",e)}),tT=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m=(0,i.c)(22);m[0]!==e?({children:o,language:r,size:l,weight:c,...d}=e,m[0]=e,m[1]=o,m[2]=r,m[3]=d,m[4]=l,m[5]=c):(o=m[1],r=m[2],d=m[3],l=m[4],c=m[5]);let g=void 0===l?2:l;return m[6]!==g?(s=A(g),m[6]=g,m[7]=s):s=m[7],m[8]!==o?(u=(0,n.jsx)("code",{children:o}),m[8]=o,m[9]=u):u=m[9],m[10]!==o||m[11]!==r?(f=(0,n.jsx)(tW,{language:r,value:o}),m[10]=o,m[11]=r,m[12]=f):f=m[12],m[13]!==u||m[14]!==f?(p=(0,n.jsx)(a.Suspense,{fallback:u,children:f}),m[13]=u,m[14]=f,m[15]=p):p=m[15],m[16]!==t||m[17]!==d||m[18]!==s||m[19]!==p||m[20]!==c?(h=(0,n.jsx)(tH,{"data-ui":"Code",...d,$size:s,$weight:c,ref:t,children:p}),m[16]=t,m[17]=d,m[18]=s,m[19]=p,m[20]=c,m[21]=h):h=m[21],h});tT.displayName="ForwardRef(Code)";let tL={width:"100%",margin:"0 auto"},tM=(0,d.I4)(e9).withConfig({displayName:"StyledContainer",componentId:"sc-wyroop-0"})(function(){return tL},function(e){let{container:t,media:o}=(0,r.JW)(e.theme);return _(o,e.$width,e=>({maxWidth:"auto"===e?"none":N(t[e])}))}),tF=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c=(0,i.c)(11);c[0]!==e?({as:o,width:a,...r}=e,c[0]=e,c[1]=o,c[2]=r,c[3]=a):(o=c[1],r=c[2],a=c[3]);let s=void 0===a?2:a;return c[4]!==s?(d=A(s),c[4]=s,c[5]=d):d=c[5],c[6]!==o||c[7]!==t||c[8]!==r||c[9]!==d?(l=(0,n.jsx)(tM,{"data-ui":"Container",...r,$width:d,forwardedAs:o,ref:t}),c[6]=o,c[7]=t,c[8]=r,c[9]=d,c[10]=l):l=c[10],l});tF.displayName="ForwardRef(Container)";let tB=(0,d.I4)(e9).withConfig({displayName:"StyledGrid",componentId:"sc-v8t8oz-0"})(function(){return[e$,ej,eI,eR,eC,eE,ez,eN,e_]}),tJ=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S=(0,i.c)(42);S[0]!==e?({as:o,autoRows:d,autoCols:r,autoFlow:a,columns:c,gap:s,gapX:u,gapY:f,rows:h,children:l,...p}=e,S[0]=e,S[1]=o,S[2]=r,S[3]=a,S[4]=d,S[5]=l,S[6]=c,S[7]=s,S[8]=u,S[9]=f,S[10]=p,S[11]=h):(o=S[1],r=S[2],a=S[3],d=S[4],l=S[5],c=S[6],s=S[7],u=S[8],f=S[9],p=S[10],h=S[11]);let j="string"==typeof o?o:void 0;return S[12]!==d?(m=A(d),S[12]=d,S[13]=m):m=S[13],S[14]!==r?(g=A(r),S[14]=r,S[15]=g):g=S[15],S[16]!==a?(b=A(a),S[16]=a,S[17]=b):b=S[17],S[18]!==c?(v=A(c),S[18]=c,S[19]=v):v=S[19],S[20]!==s?(w=A(s),S[20]=s,S[21]=w):w=S[21],S[22]!==u?(y=A(u),S[22]=u,S[23]=y):y=S[23],S[24]!==f?(x=A(f),S[24]=f,S[25]=x):x=S[25],S[26]!==h?($=A(h),S[26]=h,S[27]=$):$=S[27],S[28]!==o||S[29]!==l||S[30]!==t||S[31]!==p||S[32]!==j||S[33]!==m||S[34]!==g||S[35]!==b||S[36]!==v||S[37]!==w||S[38]!==y||S[39]!==x||S[40]!==$?(k=(0,n.jsx)(tB,{"data-as":j,"data-ui":"Grid",...p,$autoRows:m,$autoCols:g,$autoFlow:b,$columns:v,$gap:w,$gapX:y,$gapY:x,$rows:$,forwardedAs:o,ref:t,children:l}),S[28]=o,S[29]=l,S[30]=t,S[31]=p,S[32]=j,S[33]=m,S[34]=g,S[35]=b,S[36]=v,S[37]=w,S[38]=y,S[39]=x,S[40]=$,S[41]=k):k=S[41],k});tJ.displayName="ForwardRef(Grid)";let tO=d.I4.div.withConfig({displayName:"StyledHeading",componentId:"sc-137lwim-0"})(function(e){let{$accent:t,$muted:o}=e,{font:n}=(0,r.JW)(e.theme);return(0,d.AH)`
    ${t&&(0,d.AH)`
      color: var(--card-accent-fg-color);
    `}

    ${o&&(0,d.AH)`
      color: var(--card-muted-fg-color);
    `}

    & code {
      font-family: ${n.code.family};
      border-radius: 1px;
    }

    & a {
      text-decoration: none;
      border-radius: 1px;
      color: var(--card-link-color);
      outline: none;

      @media (hover: hover) {
        &:hover {
          text-decoration: underline;
        }
      }

      &:focus {
        box-shadow:
          0 0 0 1px var(--card-bg-color),
          0 0 0 3px var(--card-focus-ring-color);
      }

      &:focus:not(:focus-visible) {
        box-shadow: none;
      }
    }

    & strong {
      font-weight: ${n.heading.weights.bold};
    }

    & svg {
      /* Certain popular CSS libraries changes the defaults for SVG display */
      /* Make sure SVGs are rendered as inline elements */
      display: inline;
    }

    & [data-sanity-icon] {
      vertical-align: baseline;
    }
  `},T,function(e){return H("heading",e)}),tP=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g=(0,i.c)(26);g[0]!==e?({accent:d,align:o,children:r,muted:l,size:c,textOverflow:s,weight:u,...a}=e,g[0]=e,g[1]=o,g[2]=r,g[3]=a,g[4]=d,g[5]=l,g[6]=c,g[7]=s,g[8]=u):(o=g[1],r=g[2],a=g[3],d=g[4],l=g[5],c=g[6],s=g[7],u=g[8]);let b=void 0!==d&&d,v=void 0!==l&&l,w=void 0===c?2:c,y=r;if("ellipsis"===s){let e;g[9]!==y?(e=(0,n.jsx)(eP,{children:y}),g[9]=y,g[10]=e):e=g[10],y=e}return g[11]!==o?(f=A(o),g[11]=o,g[12]=f):f=g[12],g[13]!==w?(p=A(w),g[13]=w,g[14]=p):p=g[14],g[15]!==y?(h=(0,n.jsx)("span",{children:y}),g[15]=y,g[16]=h):h=g[16],g[17]!==b||g[18]!==v||g[19]!==t||g[20]!==a||g[21]!==f||g[22]!==p||g[23]!==h||g[24]!==u?(m=(0,n.jsx)(tO,{"data-ui":"Heading",...a,$accent:b,$align:f,$muted:v,$size:p,$weight:u,ref:t,children:h}),g[17]=b,g[18]=v,g[19]=t,g[20]=a,g[21]=f,g[22]=p,g[23]=h,g[24]=u,g[25]=m):m=g[25],m});tP.displayName="ForwardRef(Heading)";let tD=(0,d.I4)(e9).withConfig({displayName:"StyledInline",componentId:"sc-1pkiy6j-0"})(function(){return{lineHeight:"0","&&:not([hidden])":{display:"block"},"& > div":{display:"inline-block",verticalAlign:"middle"}}},function(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$space,e=>{let t=N(.5===e?o[1]/2:o[e]);return{margin:`-${t} 0 0 -${t}`,"& > div":{padding:`${t} 0 0 ${t}`}}})}),tV=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f=(0,i.c)(15);f[0]!==e?({as:o,children:r,space:l,...d}=e,f[0]=e,f[1]=o,f[2]=r,f[3]=d,f[4]=l):(o=f[1],r=f[2],d=f[3],l=f[4]),f[5]!==r?(c=a.Children.map(r,tG),f[5]=r,f[6]=c):c=f[6];let p=c;return f[7]!==l?(s=A(l),f[7]=l,f[8]=s):s=f[8],f[9]!==o||f[10]!==p||f[11]!==d||f[12]!==s||f[13]!==t?(u=(0,n.jsx)(tD,{"data-ui":"Inline",...d,$space:s,forwardedAs:o,ref:t,children:p}),f[9]=o,f[10]=p,f[11]=d,f[12]=s,f[13]=t,f[14]=u):u=f[14],u});function tG(e){return e&&(0,n.jsx)("div",{children:e})}tV.displayName="ForwardRef(Inline)";let tY=d.I4.kbd.withConfig({displayName:"StyledKBD",componentId:"sc-1w7yd8w-0"})(eJ,function(){return(0,d.AH)`
    --card-bg-color: var(--card-kbd-bg-color);
    --card-border-color: var(--card-kbd-border-color);
    --card-fg-color: var(--card-kbd-fg-color);

    box-shadow: inset 0 0 0 1px var(--card-border-color);
    background: var(--card-bg-color);
    font: inherit;

    vertical-align: top;

    &:not([hidden]) {
      display: inline-block;
    }
  `}),tX=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p=(0,i.c)(19);p[0]!==e?({children:o,fontSize:a,padding:d,radius:l,...r}=e,p[0]=e,p[1]=o,p[2]=r,p[3]=a,p[4]=d,p[5]=l):(o=p[1],r=p[2],a=p[3],d=p[4],l=p[5]);let h=void 0===a?0:a,m=void 0===d?1:d,g=void 0===l?2:l;return p[6]!==g?(c=A(g),p[6]=g,p[7]=c):c=p[7],p[8]!==o||p[9]!==h?(s=(0,n.jsx)(tt,{as:"span",size:h,weight:"semibold",children:o}),p[8]=o,p[9]=h,p[10]=s):s=p[10],p[11]!==m||p[12]!==s?(u=(0,n.jsx)(e9,{as:"span",padding:m,children:s}),p[11]=m,p[12]=s,p[13]=u):u=p[13],p[14]!==t||p[15]!==r||p[16]!==c||p[17]!==u?(f=(0,n.jsx)(tY,{"data-ui":"KBD",...r,$radius:c,ref:t,children:u}),p[14]=t,p[15]=r,p[16]=c,p[17]=u,p[18]=f):f=p[18],f});tX.displayName="ForwardRef(KBD)";let tU={name:"@sanity/ui/origin",fn({middlewareData:e,placement:t,rects:o}){let[r]=t.split("-"),n=o.floating.width,i=o.floating.height,a=e.shift?.x||0,d=e.shift?.y||0;if(n<=0||i<=0)return{};let{originX:l,originY:c}=["bottom","top"].includes(r)?{originX:tq(.5-a/n,0,1),originY:+("bottom"!==r)}:{originX:+("left"===r),originY:tq(.5-d/i,0,1)};return{data:{originX:l,originY:c}}}};function tq(e,t,o){return Math.min(Math.max(e,t),o)}function tK(e,t,o){let r=t.x-e.x,n=t.y-e.y;return tZ(e,t,Math.min(1,o/Math.sqrt(r*r+n*n)))}function tZ(e,t,o){return{x:e.x+(t.x-e.x)*o,y:e.y+(t.y-e.y)*o}}let tQ=d.I4.div.withConfig({displayName:"StyledArrow",componentId:"sc-12vzy6c-0"})(({$w:e})=>(0,d.AH)`
    position: absolute;
    width: ${e}px;
    height: ${e}px;

    :empty + & {
      display: none;
    }

    & > svg {
      display: block;
      line-height: 0;
      transform-origin: ${e/2}px ${e/2}px;
    }

    [data-placement^='top'] > & {
      bottom: -${e}px;

      & > svg {
        transform: rotate(0);
      }
    }

    [data-placement^='right'] > & {
      left: -${e}px;

      & > svg {
        transform: rotate(90deg);
      }
    }

    [data-placement^='left'] > & {
      right: -${e}px;

      & > svg {
        transform: rotate(-90deg);
      }
    }

    [data-placement^='bottom'] > & {
      top: -${e}px;

      & > svg {
        transform: rotate(180deg);
      }
    }
  `),t1=d.I4.path.withConfig({displayName:"StrokePath",componentId:"sc-12vzy6c-1"})`stroke:var(--card-shadow-outline-color);`,t0=d.I4.path.withConfig({displayName:"ShapePath",componentId:"sc-12vzy6c-2"})`fill:var(--card-bg-color);`,t2=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h=(0,i.c)(29);h[0]!==e?({width:d,height:o,radius:a,...r}=e,h[0]=e,h[1]=o,h[2]=r,h[3]=a,h[4]=d):(o=h[1],r=h[2],a=h[3],d=h[4]);let m=void 0===a?0:a,{card:g}=D(),b=g.shadow.outline,v=d/2;h[5]!==v||h[6]!==o||h[7]!==m||h[8]!==d?(l=(function(e){let t=e.length,o=[];for(let r=0;r<t;r+=1){let t=e[r],n=e[r-1],i=e[r+1];if(n&&t.radius){let e=tK(t,n,t.radius),r=tK(t,i,t.radius),a=tZ(e,t,.5),d=tZ(t,r,.5);o.push({type:"point",...e}),o.push({type:"curve",curveEnd:r,startControl:a,endControl:d})}else o.push({type:"point",...t})}return o})([{x:0,y:0},{x:m,y:0,radius:m},{x:v,y:o-1,radius:m},{x:d-m,y:0,radius:m},{x:d,y:0}]).map((e,t)=>"point"===e.type?`${0===t?"M":"L"} ${e.x} ${e.y}`:"curve"===e.type?`C ${e.startControl.x} ${e.startControl.y} ${e.endControl.x} ${e.endControl.y} ${e.curveEnd.x} ${e.curveEnd.y}`:"").join(" "),h[5]=v,h[6]=o,h[7]=m,h[8]=d,h[9]=l):l=h[9];let w=l,y=`${w}`,x=`${w} M ${d} -1 M 0 -1 Z`,$=`0 0 ${d} ${d}`;h[10]!==b||h[11]!==d?(c=(0,n.jsx)("mask",{id:"stroke-mask",children:(0,n.jsx)("rect",{x:0,y:b,width:d,height:d,fill:"white"})}),h[10]=b,h[11]=d,h[12]=c):c=h[12];let k=2*b;return h[13]!==y||h[14]!==k?(s=(0,n.jsx)(t1,{d:y,mask:"url(#stroke-mask)",strokeWidth:k}),h[13]=y,h[14]=k,h[15]=s):s=h[15],h[16]!==x?(u=(0,n.jsx)(t0,{d:x}),h[16]=x,h[17]=u):u=h[17],h[18]!==$||h[19]!==c||h[20]!==s||h[21]!==u||h[22]!==d?(f=(0,n.jsxs)("svg",{width:d,height:d,viewBox:$,children:[c,s,u]}),h[18]=$,h[19]=c,h[20]=s,h[21]=u,h[22]=d,h[23]=f):f=h[23],h[24]!==t||h[25]!==r||h[26]!==f||h[27]!==d?(p=(0,n.jsx)(tQ,{...r,$w:d,ref:t,children:f}),h[24]=t,h[25]=r,h[26]=f,h[27]=d,h[28]=p):p=h[28],p});t2.displayName="ForwardRef(Arrow)";let t3=M("@sanity/ui/context/boundaryElement",null);function t4(e){let t,o,r=(0,i.c)(5),{children:a,element:d}=e;r[0]!==d?(t={version:0,element:d},r[0]=d,r[1]=t):t=r[1];let l=t;return r[2]!==a||r[3]!==l?(o=(0,n.jsx)(t3.Provider,{value:l,children:a}),r[2]=a,r[3]=l,r[4]=o):o=r[4],o}function t5(e){return!!(e&&"object"==typeof e&&!Array.isArray(e))}t4.displayName="BoundaryElementProvider";let t6={version:0,element:null};function t7(){let e=(0,a.useContext)(t3);if(e&&(!t5(e)||0!==e.version))throw Error("useBoundaryElement(): the context value is not compatible");return e||t6}let t8=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p=(0,i.c)(18),h=D();p[0]!==e?({children:r,media:o,...d}=e,p[0]=e,p[1]=o,p[2]=r,p[3]=d):(o=p[1],r=p[2],d=p[3]);let m=o??h.media,[g,b]=(0,a.useState)(null),v=tx(g)?.border.width??window.innerWidth;if(p[4]!==m||p[5]!==v){let e=function(e,t){let o=[];for(let r=0;r<e.length;r+=1)e[r]>t&&o.push(r);return o}(m,v);l=e.length?e.join(" "):void 0,p[4]=m,p[5]=v,p[6]=l}else l=p[6];let w=l;if(p[7]!==m||p[8]!==v){let e=function(e,t){let o=[];for(let r=0;r<e.length;r+=1)e[r]<=t&&o.push(r);return o}(m,v);c=e.length?e.join(" "):void 0,p[7]=m,p[8]=v,p[9]=c}else c=p[9];let y=c;return p[10]!==g?(s=()=>g,u=[g],p[10]=g,p[11]=s,p[12]=u):(s=p[11],u=p[12]),(0,a.useImperativeHandle)(t,s,u),p[13]!==r||p[14]!==w||p[15]!==y||p[16]!==d?(f=(0,n.jsx)("div",{"data-ui":"ElementQuery",...d,"data-eq-max":w,"data-eq-min":y,ref:b,children:r}),p[13]=r,p[14]=w,p[15]=y,p[16]=d,p[17]=f):f=p[17],f});function t9(e){if(!t5(e)||0!==e.version)throw Error("the context value is not compatible");if(!e)throw Error("components using `useLayer()` should be wrapped in a <LayerProvider>.");if(0===e.version)return e;throw Error("could not get layer context")}t8.displayName="ForwardRef(ElementQuery)";let oe=M("@sanity/ui/context/layer",null);function ot(e){let t,o,r,d,l,c,s,u,f=(0,i.c)(21),{children:p,zOffset:h}=e,m=void 0===h?0:h,g=(0,a.useContext)(oe);f[0]!==g?(t=g&&t9(g),f[0]=g,f[1]=t):t=f[1];let b=t,v=b?.registerChild,w=(b?.level??0)+1;f[2]!==m?(o=A(m),f[2]=m,f[3]=o):o=f[3];let y=o,x=y.length-1,$=Math.min(tj(),x),k=b?b.zIndex+y[$]:y[$];f[4]===Symbol.for("react.memo_cache_sentinel")?(r={},f[4]=r):r=f[4];let[,S]=(0,a.useState)(r),[j,I]=(0,a.useState)(0),R=0===j;f[5]!==v||f[6]!==S?(d=e=>{let t=v?.(e);return void 0!==e?S(t=>{let o=t[e]??0,r={...t,[e]:o+1};return I(Object.keys(r).length),r}):I(or),()=>{void 0!==e?S(t=>{let o={...t};return 1===o[e]?(delete o[e],I(Object.keys(o).length)):o[e]=o[e]-1,o}):I(oo),t?.()}},f[5]=v,f[6]=S,f[7]=d):d=f[7];let C=d;f[8]!==w||f[9]!==v?(l=()=>v?.(w),c=[w,v],f[8]=w,f[9]=v,f[10]=l,f[11]=c):(l=f[10],c=f[11]),(0,a.useEffect)(l,c),f[12]!==R||f[13]!==w||f[14]!==C||f[15]!==j||f[16]!==k?(s={version:0,isTopLayer:R,level:w,registerChild:C,size:j,zIndex:k},f[12]=R,f[13]=w,f[14]=C,f[15]=j,f[16]=k,f[17]=s):s=f[17];let E=s;return f[18]!==p||f[19]!==E?(u=(0,n.jsx)(oe.Provider,{value:E,children:p}),f[18]=p,f[19]=E,f[20]=u):u=f[20],u}function oo(e){return e-1}function or(e){return e+1}function on(){let e=(0,i.c)(2),t=(0,a.useContext)(oe);if(!t)throw Error("useLayer(): missing context value");try{let o;return e[0]!==t?(o=t9(t),e[0]=t,e[1]=o):o=e[1],o}catch(e){throw e instanceof Error?Error(`useLayer(): ${e.message}`):Error(`useLayer(): ${e}`)}}ot.displayName="LayerProvider";let oi=d.I4.div.withConfig({displayName:"StyledLayer",componentId:"sc-16kojrv-0"})({position:"relative"}),oa=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g=(0,i.c)(22);g[0]!==e?({children:o,onActivate:r,onFocus:d,style:c,...l}=e,g[0]=e,g[1]=o,g[2]=r,g[3]=d,g[4]=l,g[5]=c):(o=g[1],r=g[2],d=g[3],l=g[4],c=g[5]);let b=void 0===c?x:c,{zIndex:v,isTopLayer:w}=on(),y=(0,a.useRef)(null),$=(0,a.useRef)(null),k=(0,a.useRef)(w);g[6]===Symbol.for("react.memo_cache_sentinel")?(s=()=>$.current,g[6]=s):s=g[6],(0,a.useImperativeHandle)(t,s),g[7]!==w||g[8]!==r?(u=()=>{k.current!==w&&w&&r?.({activeElement:y.current}),k.current=w},f=[w,r],g[7]=w,g[8]=r,g[9]=u,g[10]=f):(u=g[9],f=g[10]),(0,a.useEffect)(u,f),g[11]!==w||g[12]!==d?(p=e=>{d?.(e);let t=$.current,o=document.activeElement;!w||!t||!o||S(o)&&z(t,o)&&(y.current=o)},g[11]=w,g[12]=d,g[13]=p):p=g[13];let j=p;return g[14]!==b||g[15]!==v?(h={...b,zIndex:v},g[14]=b,g[15]=v,g[16]=h):h=g[16],g[17]!==o||g[18]!==j||g[19]!==l||g[20]!==h?(m=(0,n.jsx)(oi,{...l,"data-ui":"Layer",onFocus:j,ref:$,style:h,children:o}),g[17]=o,g[18]=j,g[19]=l,g[20]=h,g[21]=m):m=g[21],m}),od=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c=(0,i.c)(11);c[0]!==e?({children:o,zOffset:a,...r}=e,c[0]=e,c[1]=o,c[2]=r,c[3]=a):(o=c[1],r=c[2],a=c[3]);let s=void 0===a?1:a;return c[4]!==o||c[5]!==t||c[6]!==r?(d=(0,n.jsx)(oa,{...r,ref:t,children:o}),c[4]=o,c[5]=t,c[6]=r,c[7]=d):d=c[7],c[8]!==d||c[9]!==s?(l=(0,n.jsx)(ot,{zOffset:s,children:d}),c[8]=d,c[9]=s,c[10]=l):l=c[10],l});od.displayName="ForwardRef(Layer)";let ol="@sanity/ui/context/portal",oc=Symbol.for(`${ol}/element`);L[oc]=null;let os=M(ol,{version:0,boundaryElement:null,get element(){return typeof document>"u"?null:(L[oc]||(L[oc]=document.createElement("div"),L[oc].setAttribute("data-portal",""),document.body.appendChild(L[oc])),L[oc])}});function ou(){let e=(0,a.useContext)(os);if(!e)throw Error("usePortal(): missing context value");if(!t5(e)||0!==e.version)throw Error("usePortal(): the context value is not compatible");return e}function of(e){let t,o=(0,i.c)(3),{children:r,__unstable_name:n}=e,a=ou(),d=(n?a.elements&&a.elements[n]:a.element)||a.elements?.default;return d?(o[0]!==r||o[1]!==d?(t=(0,g.createPortal)(r,d),o[0]=r,o[1]=d,o[2]=t):t=o[2],t):null}function op(e){let t,o,r=(0,i.c)(7),{boundaryElement:d,children:l,element:c,__unstable_elements:s}=e,u=(0,a.useSyncExternalStore)(og,om,oh),f=d||null,p=c||u;r[0]!==s||r[1]!==f||r[2]!==p?(t={version:0,boundaryElement:f,element:p,elements:s},r[0]=s,r[1]=f,r[2]=p,r[3]=t):t=r[3];let h=t;return r[4]!==l||r[5]!==h?(o=(0,n.jsx)(os.Provider,{value:h,children:l}),r[4]=l,r[5]=h,r[6]=o):o=r[6],o}function oh(){return null}function om(){return document.body}of.displayName="Portal",op.displayName="PortalProvider";let og=()=>()=>{},ob=d.I4.div.withConfig({displayName:"StyledSrOnly",componentId:"sc-mubr0c-0"})`display:block;width:0;height:0;position:absolute;overflow:hidden;overflow:clip;`;(0,a.forwardRef)(function(e,t){let o,r=(0,i.c)(4),{as:a,children:d}=e;return r[0]!==a||r[1]!==d||r[2]!==t?(o=(0,n.jsx)(ob,{"aria-hidden":!0,as:a,"data-ui":"SrOnly",ref:t,children:d}),r[0]=a,r[1]=d,r[2]=t,r[3]=o):o=r[3],o}).displayName="ForwardRef(SrOnly)";let ov=d.I4.div.withConfig({displayName:"StyledVirtualList",componentId:"sc-dlqsj4-0"})`position:relative;`,ow=d.I4.div.withConfig({displayName:"ItemWrapper",componentId:"sc-dlqsj4-1"})`position:absolute;left:0;right:0;`,oy=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S=(0,i.c)(44);S[0]!==e?({as:c,gap:s,getItemKey:o,items:u,onChange:r,renderItem:d,...l}=e,S[0]=e,S[1]=o,S[2]=r,S[3]=d,S[4]=l,S[5]=c,S[6]=s,S[7]=u):(o=S[1],r=S[2],d=S[3],l=S[4],c=S[5],s=S[6],u=S[7]);let j=void 0===c?"div":c,I=void 0===s?0:s;S[8]!==u?(f=void 0===u?[]:u,S[8]=u,S[9]=f):f=S[9];let R=f,{space:C}=D(),E=(0,a.useRef)(null),z=(0,a.useRef)(null),[N,_]=(0,a.useState)(0),[A,W]=(0,a.useState)(0),[H,T]=(0,a.useState)(-1);S[10]===Symbol.for("react.memo_cache_sentinel")?(p=()=>E.current,S[10]=p):p=S[10],(0,a.useImperativeHandle)(t,p),S[11]===Symbol.for("react.memo_cache_sentinel")?(h=()=>{if(!z.current)return;let e=z.current.firstChild;e instanceof HTMLElement&&T(e.offsetHeight)},S[11]=h):h=S[11],S[12]!==d?(m=[d],S[12]=d,S[13]=m):m=S[13],(0,a.useEffect)(h,m),S[14]===Symbol.for("react.memo_cache_sentinel")?(g=()=>{if(!E.current)return;let e=function(e){let t=e;for(;t&&!function(e){if(!(e instanceof Element))return!1;let t=window.getComputedStyle(e);return t.overflowX.includes("auto")||t.overflowX.includes("scroll")||t.overflowY.includes("auto")||t.overflowY.includes("scroll")}(t);)t=t.parentNode;return t}(E.current.parentNode);if(e){if(!(e instanceof HTMLElement))return;let t=()=>{_(e.scrollTop)};e.addEventListener("scroll",t,{passive:!0});let o=new tw(e=>{W(e[0].contentRect.height)});return o.observe(e),t(),()=>{e.removeEventListener("scroll",t),o.unobserve(e),o.disconnect()}}let t=()=>{_(window.scrollY)},o=()=>{W(window.innerHeight)};return window.addEventListener("scroll",t,{passive:!0}),window.addEventListener("resize",o),W(window.innerHeight),t(),()=>{window.removeEventListener("scroll",t),window.removeEventListener("resize",o)}},b=[],S[14]=g,S[15]=b):(g=S[14],b=S[15]),(0,a.useEffect)(g,b);let L=R.length,M=H?L*(H+C[I])-C[I]:0,F=M?Math.max(Math.floor(N/M*L)-2,0):0,B=M?Math.ceil((N+A)/M*L)+1:0;S[16]!==F||S[17]!==I||S[18]!==H||S[19]!==r||S[20]!==A||S[21]!==N||S[22]!==C||S[23]!==B?(w=()=>{r&&r({fromIndex:F,gap:C[I],itemHeight:H,scrollHeight:A,scrollTop:N,toIndex:B})},v=[F,I,H,r,A,N,C,B],S[16]=F,S[17]=I,S[18]=H,S[19]=r,S[20]=A,S[21]=N,S[22]=C,S[23]=B,S[24]=v,S[25]=w):(v=S[24],w=S[25]),(0,a.useEffect)(w,v),S[26]!==F||S[27]!==I||S[28]!==o||S[29]!==H||S[30]!==R||S[31]!==d||S[32]!==C||S[33]!==B?(y={fromIndex:F,gap:I,itemHeight:H,space:C,toIndex:B,getItemKey:o,items:R,renderItem:d},S[26]=F,S[27]=I,S[28]=o,S[29]=H,S[30]=R,S[31]=d,S[32]=C,S[33]=B,S[34]=y):y=S[34];let J=function(e){let t,o=(0,i.c)(21),{fromIndex:r,gap:a,getItemKey:d,itemHeight:l,items:c,renderItem:s,space:u,toIndex:f}=e;if(!s||0===c.length)return null;if(-1===l){let e,t;return o[0]!==c[0]||o[1]!==s?(e=s(c[0]),o[0]=c[0],o[1]=s,o[2]=e):e=o[2],o[3]!==e?(t=[(0,n.jsx)(ow,{children:e},0)],o[3]=e,o[4]=t):t=o[4],t}if(o[5]!==r||o[6]!==a||o[7]!==d||o[8]!==l||o[9]!==c||o[10]!==s||o[11]!==u||o[12]!==f){let e;o[14]!==r||o[15]!==a||o[16]!==d||o[17]!==l||o[18]!==s||o[19]!==u?(e=(e,t)=>{let o=r+t,i=s(e),c=d?d(e,o):o;return(0,n.jsx)(ow,{style:{top:o*(l+u[a])},children:i},c)},o[14]=r,o[15]=a,o[16]=d,o[17]=l,o[18]=s,o[19]=u,o[20]=e):e=o[20],t=c.slice(r,f).map(e),o[5]=r,o[6]=a,o[7]=d,o[8]=l,o[9]=c,o[10]=s,o[11]=u,o[12]=f,o[13]=t}else t=o[13];return t}(y);return S[35]!==M?(x={height:M},S[35]=M,S[36]=x):x=S[36],S[37]!==J||S[38]!==x?($=(0,n.jsx)("div",{ref:z,style:x,children:J}),S[37]=J,S[38]=x,S[39]=$):$=S[39],S[40]!==j||S[41]!==l||S[42]!==$?(k=(0,n.jsx)(ov,{as:j,"data-ui":"VirtualList",...l,ref:E,children:$}),S[40]=j,S[41]=l,S[42]=$,S[43]=k):k=S[43],k});function ox(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,o=t&&"isReactWarning"in t&&t.isReactWarning;return o?e.ref:(o=(t=Object.getOwnPropertyDescriptor(e,"ref")?.get)&&"isReactWarning"in t&&t.isReactWarning)?e.props.ref:e.props.ref||e.ref}oy.displayName="ForwardRef(VirtualList)";let o$=[0,0,0,0],ok={top:["bottom","left","right"],"top-start":["bottom-start","left-start","right-start"],"top-end":["bottom-end","left-end","right-end"],bottom:["top","left","right"],"bottom-start":["top-start","left-start","right-start"],"bottom-end":["top-end","left-end","right-end"],left:["right","top","bottom"],"left-start":["right-start","top-start","bottom-start"],"left-end":["right-end","top-end","bottom-end"],right:["left","top","bottom"],"right-start":["left-start","top-start","bottom-start"],"right-end":["left-end","top-end","bottom-end"]},oS=(0,d.I4)(p.P.create(tm)).withConfig({displayName:"MotionCard",componentId:"sc-ihg31s-0"})`&:not([hidden]){display:flex;}flex-direction:column;width:max-content;min-width:min-content;will-change:transform;`,oj=(0,d.I4)(p.P.create(ti)).withConfig({displayName:"MotionFlex",componentId:"sc-ihg31s-1"})`will-change:opacity;`,oI=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,k,S,j,I,R,C,E,z,N,_,A,W,H,T=(0,i.c)(66);T[0]!==e?({__unstable_margins:s,animate:o,arrow:r,arrowRef:a,arrowX:d,arrowY:l,children:c,padding:h,placement:m,originX:u,originY:f,overflow:p,radius:g,scheme:v,shadow:w,strategy:y,style:x,tone:k,width:S,x:j,y:I,...b}=e,T[0]=e,T[1]=o,T[2]=r,T[3]=a,T[4]=d,T[5]=l,T[6]=c,T[7]=s,T[8]=u,T[9]=f,T[10]=p,T[11]=h,T[12]=m,T[13]=g,T[14]=b,T[15]=v,T[16]=w,T[17]=y,T[18]=x,T[19]=k,T[20]=S,T[21]=j,T[22]=I):(o=T[1],r=T[2],a=T[3],d=T[4],l=T[5],c=T[6],s=T[7],u=T[8],f=T[9],p=T[10],h=T[11],m=T[12],g=T[13],b=T[14],v=T[15],w=T[16],y=T[17],x=T[18],k=T[19],S=T[20],j=T[21],I=T[22]);let{zIndex:L}=on(),M=s||o$,F=(j??0)+M[3],B=(I??0)+M[0],J=o?"transform":void 0;T[23]!==u||T[24]!==f||T[25]!==y||T[26]!==x||T[27]!==J||T[28]!==S||T[29]!==F||T[30]!==B||T[31]!==L?(R={left:F,originX:u,originY:f,position:y,top:B,width:S,zIndex:L,willChange:J,...x},T[23]=u,T[24]=f,T[25]=y,T[26]=x,T[27]=J,T[28]=S,T[29]=F,T[30]=B,T[31]=L,T[32]=R):R=T[32];let O=R,P=null!==d?d:void 0,D=null!==l?l:void 0;T[33]!==P||T[34]!==D?(C={left:P,top:D,right:void 0,bottom:void 0},T[33]=P,T[34]=D,T[35]=C):C=T[35];let V=C,G=b;return T[36]!==o?(E=o?["hidden","initial"]:void 0,T[36]=o,T[37]=E):E=T[37],T[38]!==o?(z=o?["visible","scaleIn"]:void 0,T[38]=o,T[39]=z):z=T[39],T[40]!==o?(N=o?["hidden","scaleOut"]:void 0,T[40]=o,T[41]=N):N=T[41],T[42]!==c||T[43]!==h?(_=(0,n.jsx)(ti,{direction:"column",flex:1,padding:h,children:c}),T[42]=c,T[43]=h,T[44]=_):_=T[44],T[45]!==p||T[46]!==_?(A=(0,n.jsx)(oj,{"data-ui":"Popover__wrapper",direction:"column",flex:1,overflow:p,variants:$.children,transition:$.transition,children:_}),T[45]=p,T[46]=_,T[47]=A):A=T[47],T[48]!==r||T[49]!==a||T[50]!==V?(W=r&&(0,n.jsx)(t2,{ref:a,style:V,width:19,height:8,radius:2}),T[48]=r,T[49]=a,T[50]=V,T[51]=W):W=T[51],T[52]!==m||T[53]!==g||T[54]!==t||T[55]!==O||T[56]!==v||T[57]!==w||T[58]!==A||T[59]!==W||T[60]!==G||T[61]!==E||T[62]!==z||T[63]!==N||T[64]!==k?(H=(0,n.jsxs)(oS,{"data-ui":"Popover",...G,"data-placement":m,radius:g,ref:t,scheme:v,shadow:w,sizing:"border",style:O,tone:k,variants:$.card,transition:$.transition,initial:E,animate:z,exit:N,children:[A,W]}),T[52]=m,T[53]=g,T[54]=t,T[55]=O,T[56]=v,T[57]=w,T[58]=A,T[59]=W,T[60]=G,T[61]=E,T[62]=z,T[63]=N,T[64]=k,T[65]=H):H=T[65],H});oI.displayName="ForwardRef(PopoverCard)";let oR=()=>{let e,t=(0,i.c)(2),{zIndex:o}=on();return t[0]!==o?(e=(0,n.jsx)("div",{style:{height:"100vh",inset:0,position:"fixed",width:"100vw",zIndex:o}}),t[0]=o,t[1]=e):e=t[1],e},oC=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,p,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,J,O,P,V,G,Y,X,U,q,K,Z,Q,ee,et,eo,er,en,ei,ea,ed,el,ec,es,eu,ef,ep=(0,i.c)(126),{container:eh,layer:em}=D(),eg=t7();if(ep[0]!==e){let{__unstable_margins:t,animate:n,arrow:i,boundaryElement:a,children:u,constrainSize:f,content:h,disabled:A,fallbackPlacements:M,matchReferenceWidth:F,floatingBoundary:B,modal:J,onActivate:O,open:P,overflow:D,padding:V,placement:G,placementStrategy:Y,portal:X,preventOverflow:U,radius:q,referenceBoundary:K,referenceElement:Z,scheme:Q,shadow:ee,tone:et,width:eo,zOffset:er,updateRef:en,...ei}=e;S=t,j=n,C=i,o=a,s=u,E=f,p=h,m=A,r=M,g=F,d=B,b=J,v=P,z=D,w=V,N=G,_=Y,y=X,W=U,H=q,l=K,x=Z,k=Q,T=ee,I=et,R=eo,c=er,L=en,$=ei,ep[0]=e,ep[1]=o,ep[2]=r,ep[3]=d,ep[4]=l,ep[5]=c,ep[6]=s,ep[7]=p,ep[8]=m,ep[9]=g,ep[10]=b,ep[11]=v,ep[12]=w,ep[13]=y,ep[14]=x,ep[15]=$,ep[16]=k,ep[17]=S,ep[18]=j,ep[19]=I,ep[20]=R,ep[21]=C,ep[22]=E,ep[23]=z,ep[24]=N,ep[25]=_,ep[26]=W,ep[27]=H,ep[28]=T,ep[29]=L}else o=ep[1],r=ep[2],d=ep[3],l=ep[4],c=ep[5],s=ep[6],p=ep[7],m=ep[8],g=ep[9],b=ep[10],v=ep[11],w=ep[12],y=ep[13],x=ep[14],$=ep[15],k=ep[16],S=ep[17],j=ep[18],I=ep[19],R=ep[20],C=ep[21],E=ep[22],z=ep[23],N=ep[24],_=ep[25],W=ep[26],H=ep[27],T=ep[28],L=ep[29];let eb=void 0===S?o$:S,ev=void 0!==j&&j,ew=void 0!==C&&C,ey=void 0!==E&&E,ex=void 0===z?"hidden":z,e$=void 0===N?"bottom":N,ek=void 0===_?"flip":_,eS=void 0===W||W,ej=void 0===H?3:H,eI=void 0===T?3:T,eR=void 0===I?"inherit":I,eC=void 0===R?"auto":R,eE=o??eg?.element,ez=r??ok[e.placement??"bottom"],eN=d??e.boundaryElement??eg.element,e_=l??e.boundaryElement??eg.element,eA=c??em.popover.zOffset,eW=!tC()&&ev,eH=tx(eE)?.border;ep[30]!==w?(M=A(w),ep[30]=w,ep[31]=M):M=ep[31];let eT=M;ep[32]!==ej?(F=A(ej),ep[32]=ej,ep[33]=F):F=ep[33];let eL=F;ep[34]!==eI?(B=A(eI),ep[34]=eI,ep[35]=B):B=ep[35];let eM=B,eF=A(eC);ep[36]!==eA?(J=A(eA),ep[36]=eA,ep[37]=J):J=ep[37];let eB=J,eJ=(0,a.useRef)(null),eO=(0,a.useRef)(null);ep[38]===Symbol.for("react.memo_cache_sentinel")?(O=()=>eJ.current,ep[38]=O):O=ep[38],(0,a.useImperativeHandle)(t,O);let eP=tj(),eD=ey||eS?eH?.width:void 0,eV=function(e){let{container:t,mediaIndex:o,width:r}=e,n=r[o],i=void 0===n?r[r.length-1]:n;return"number"==typeof i?t[i]:void 0}({container:eh,mediaIndex:eP,width:eF}),eG=(0,a.useRef)(eV);ep[39]!==eV?(P=()=>{eG.current=eV},V=[eV],ep[39]=eV,ep[40]=P,ep[41]=V):(P=ep[40],V=ep[41]),(0,a.useEffect)(P,V),ep[42]!==eD||ep[43]!==eV?(G=function(e){let{boundaryWidth:t,currentWidth:o}=e;if(void 0!==o||void 0!==t)return Math.min(o??1/0,(t||1/0)-8)}({boundaryWidth:eD,currentWidth:eV}),ep[42]=eD,ep[43]=eV,ep[44]=G):G=ep[44];let eY=G,eX=(0,a.useRef)(eY);ep[45]!==eY?(Y=()=>{eX.current=eY},X=[eY],ep[45]=eY,ep[46]=Y,ep[47]=X):(Y=ep[46],X=ep[47]),(0,a.useEffect)(Y,X);let eU=(0,a.useRef)(void 0);ep[48]!==g||ep[49]!==eY||ep[50]!==v||ep[51]!==eV?(U=()=>{let e=eJ.current;if(!v||!e)return;let t=eU.current;g?void 0!==t&&(e.style.width=`${t}px`):void 0!==eV&&(e.style.width=`${eV}px`),"number"==typeof eY&&(e.style.maxWidth=`${eY}px`)},q=[eV,g,eY,v],ep[48]=g,ep[49]=eY,ep[50]=v,ep[51]=eV,ep[52]=U,ep[53]=q):(U=ep[52],q=ep[53]),(0,a.useEffect)(U,q);let[eq,eK]=(0,a.useState)(void 0);ep[54]!==eW||ep[55]!==ew||ep[56]!==ey||ep[57]!==ez||ep[58]!==eN||ep[59]!==eb||ep[60]!==g||ep[61]!==e$||ep[62]!==ek||ep[63]!==eS||ep[64]!==e_?(K={animate:eW,arrowProp:ew,arrowRef:eO,constrainSize:ey,fallbackPlacements:ez,floatingBoundary:eN,margins:eb,matchReferenceWidth:g,maxWidthRef:eX,placementProp:e$,placementStrategy:ek,preventOverflow:eS,referenceBoundary:e_,referenceWidthRef:eU,rootBoundary:"viewport",setReferenceWidth:eK,widthRef:eG},ep[54]=eW,ep[55]=ew,ep[56]=ey,ep[57]=ez,ep[58]=eN,ep[59]=eb,ep[60]=g,ep[61]=e$,ep[62]=ek,ep[63]=eS,ep[64]=e_,ep[65]=K):K=ep[65];let eZ=function(e){let t,o=(0,i.c)(42),{animate:r,arrowProp:n,arrowRef:a,constrainSize:d,fallbackPlacements:l,floatingBoundary:c,margins:s,matchReferenceWidth:p,maxWidthRef:h,placementProp:m,placementStrategy:g,preventOverflow:b,referenceBoundary:v,referenceWidthRef:w,rootBoundary:y,setReferenceWidth:x,widthRef:$}=e;if(o[0]!==r||o[1]!==n||o[2]!==a||o[3]!==d||o[4]!==l||o[5]!==c||o[6]!==s||o[7]!==p||o[8]!==h||o[9]!==m||o[10]!==g||o[11]!==b||o[12]!==v||o[13]!==w||o[14]!==y||o[15]!==x||o[16]!==$){let e,i;if(t=[],d||b)if("autoPlacement"===g){let e;o[18]!==l||o[19]!==m?(e=(0,f.RK)({allowedPlacements:[m].concat(l)}),o[18]=l,o[19]=m,o[20]=e):e=o[20],t.push(e)}else{let e,r=c||void 0;o[21]!==l||o[22]!==y||o[23]!==r?(e=(0,f.UU)({boundary:r,fallbackPlacements:l,padding:4,rootBoundary:y}),o[21]=l,o[22]=y,o[23]=r,o[24]=e):e=o[24],t.push(e)}if(o[25]===Symbol.for("react.memo_cache_sentinel")?(e=(0,f.cY)({mainAxis:4}),o[25]=e):e=o[25],t.push(e),d||p){let e,r=c||void 0;o[26]!==d||o[27]!==s||o[28]!==p||o[29]!==h||o[30]!==w||o[31]!==x||o[32]!==r||o[33]!==$?(e=function(e){let{constrainSize:t,margins:o,matchReferenceWidth:r,maxWidthRef:n,padding:i=0,referenceWidthRef:a,setReferenceWidth:d,widthRef:l}=e;return{name:"@sanity/ui/size",async fn(c){let{elements:s,placement:f,platform:p,rects:h}=c,{floating:m,reference:g}=h,b=await (0,u.__)(c,{altBoundary:!0,boundary:e.boundaryElement||void 0,elementContext:"floating",padding:i,rootBoundary:"viewport"}),v=1/0,w=1/0,y=m.width,x=m.height;f.includes("top")&&(v=y-(b.left+b.right),w=x-b.top),f.includes("right")&&(v=y-b.right,w=x-(b.top+b.bottom)),f.includes("bottom")&&(v=y-(b.left+b.right),w=x-b.bottom),f.includes("left")&&(v=y-b.left,w=x-(b.top+b.bottom));let $=v-o[1]-o[3],k=w-o[0]-o[2],S=g.width-o[1]-o[3];a.current=S,d(S),r?s.floating.style.width=`${S}px`:void 0!==l.current&&(s.floating.style.width=`${l.current}px`),t&&(s.floating.style.maxWidth=`${Math.min($,n.current??1/0)}px`,s.floating.style.maxHeight=`${k}px`);let j=await p.getDimensions(s.floating),I=j.height;return y!==j.width||x!==I?{reset:{rects:!0}}:{}}}}({boundaryElement:r,constrainSize:d,margins:s,matchReferenceWidth:p,maxWidthRef:h,padding:4,referenceWidthRef:w,setReferenceWidth:x,widthRef:$}),o[26]=d,o[27]=s,o[28]=p,o[29]=h,o[30]=w,o[31]=x,o[32]=r,o[33]=$,o[34]=e):e=o[34],t.push(e)}if(b){let e,r=c||void 0;o[35]!==y||o[36]!==r?(e=(0,f.BN)({boundary:r,rootBoundary:y,padding:4}),o[35]=y,o[36]=r,o[37]=e):e=o[37],t.push(e)}if(n){let e;o[38]!==a?(e=(0,f.UE)({element:a,padding:4}),o[38]=a,o[39]=e):e=o[39],t.push(e)}r&&t.push(tU);let k=v||void 0;o[40]!==k?(i=(0,f.jD)({boundary:k,padding:4,strategy:"referenceHidden"}),o[40]=k,o[41]=i):i=o[41],t.push(i),o[0]=r,o[1]=n,o[2]=a,o[3]=d,o[4]=l,o[5]=c,o[6]=s,o[7]=p,o[8]=h,o[9]=m,o[10]=g,o[11]=b,o[12]=v,o[13]=w,o[14]=y,o[15]=x,o[16]=$,o[17]=t}else t=o[17];return t}(K);ep[66]!==x?(Z=x?{reference:x}:void 0,ep[66]=x,ep[67]=Z):Z=ep[67],ep[68]!==eZ||ep[69]!==e$||ep[70]!==Z?(Q={middleware:eZ,placement:e$,whileElementsMounted:u.ll,elements:Z},ep[68]=eZ,ep[69]=e$,ep[70]=Z,ep[71]=Q):Q=ep[71];let{x:eQ,y:e1,middlewareData:e0,placement:e2,refs:e3,strategy:e4,update:e5}=(0,f.we)(Q),e6=e0.hide?.referenceHidden,e7=e0.arrow?.x,e8=e0.arrow?.y,e9=e0["@sanity/ui/origin"]?.originX,te=e0["@sanity/ui/origin"]?.originY;ep[72]===Symbol.for("react.memo_cache_sentinel")?(ee=e=>{eO.current=e},ep[72]=ee):ee=ep[72];let tt=ee;ep[73]!==e3?(et=e=>{eJ.current=e,e3.setFloating(e)},ep[73]=e3,ep[74]=et):et=ep[74];let to=et;ep[75]!==s?(eo=s?ox(s):null,ep[75]=s,ep[76]=eo):eo=ep[76],ep[77]!==e3.reference.current?(er=()=>e3.reference.current,ep[77]=e3.reference.current,ep[78]=er):er=ep[78],(0,a.useImperativeHandle)(eo,er);e:{let e;if(x){en=s;break e}if(!s){en=null;break e}ep[79]!==s||ep[80]!==e3.setReference?(e=(0,a.cloneElement)(s,{ref:e3.setReference}),ep[79]=s,ep[80]=e3.setReference,ep[81]=e):e=ep[81],en=e}let tr=en;if(ep[82]!==e5?(ei=()=>e5,ea=[e5],ep[82]=e5,ep[83]=ei,ep[84]=ea):(ei=ep[83],ea=ep[84]),(0,a.useImperativeHandle)(L,ei,ea),m){let e;return ep[85]!==s?(e=s||(0,n.jsx)(n.Fragment,{}),ep[85]=s,ep[86]=e):e=ep[86],e}ep[87]!==b?(ed=b&&(0,n.jsx)(oR,{}),ep[87]=b,ep[88]=ed):ed=ep[88];let tn=g?eq:eV;ep[89]!==eW||ep[90]!==ew||ep[91]!==e7||ep[92]!==e8||ep[93]!==p||ep[94]!==eb||ep[95]!==e9||ep[96]!==te||ep[97]!==ex||ep[98]!==eT||ep[99]!==e2||ep[100]!==eL||ep[101]!==e6||ep[102]!==$||ep[103]!==k||ep[104]!==to||ep[105]!==eM||ep[106]!==e4||ep[107]!==tn||ep[108]!==eR||ep[109]!==eQ||ep[110]!==e1?(el=(0,n.jsx)(oI,{...$,__unstable_margins:eb,animate:eW,arrow:ew,arrowRef:tt,arrowX:e7,arrowY:e8,hidden:e6,overflow:ex,padding:eT,placement:e2,radius:eL,ref:to,scheme:k,shadow:eM,originX:e9,originY:te,strategy:e4,tone:eR,width:tn,x:eQ,y:e1,children:p}),ep[89]=eW,ep[90]=ew,ep[91]=e7,ep[92]=e8,ep[93]=p,ep[94]=eb,ep[95]=e9,ep[96]=te,ep[97]=ex,ep[98]=eT,ep[99]=e2,ep[100]=eL,ep[101]=e6,ep[102]=$,ep[103]=k,ep[104]=to,ep[105]=eM,ep[106]=e4,ep[107]=tn,ep[108]=eR,ep[109]=eQ,ep[110]=e1,ep[111]=el):el=ep[111],ep[112]!==ed||ep[113]!==el||ep[114]!==eB?(ec=(0,n.jsxs)(ot,{zOffset:eB,children:[ed,el]}),ep[112]=ed,ep[113]=el,ep[114]=eB,ep[115]=ec):ec=ep[115];let ti=ec;ep[116]!==v||ep[117]!==ti||ep[118]!==y?(es=v&&(y?(0,n.jsx)(of,{__unstable_name:"string"==typeof y?y:void 0,children:ti}):ti),ep[116]=v,ep[117]=ti,ep[118]=y,ep[119]=es):es=ep[119];let ta=es;return ep[120]!==eW||ep[121]!==ta?(eu=eW?(0,n.jsx)(h.N,{children:ta}):ta,ep[120]=eW,ep[121]=ta,ep[122]=eu):eu=ep[122],ep[123]!==tr||ep[124]!==eu?(ef=(0,n.jsxs)(n.Fragment,{children:[eu,tr]}),ep[123]=tr,ep[124]=eu,ep[125]=ef):ef=ep[125],ef});oC.displayName="ForwardRef(Popover)";let oE=d.I4.div.withConfig({displayName:"StyledRadio",componentId:"sc-ccrwkf-0"})(function(){return(0,d.AH)`
    position: relative;

    &:not([hidden]) {
      display: inline-block;
    }

    &[data-read-only] {
      outline: 1px solid red;
    }
  `}),oz=d.I4.input.withConfig({displayName:"Input",componentId:"sc-ccrwkf-1"})(function(e){let{color:t,input:o}=(0,r.JW)(e.theme),n=(o.radio.size-o.radio.markSize)/2;return(0,d.AH)`
    appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    z-index: 1;
    padding: 0;
    margin: 0;
    border-radius: ${N(o.radio.size/2)};
    border: none;

    /* enabled */
    & + span {
      display: block;
      position: relative;
      height: ${N(o.radio.size)};
      width: ${N(o.radio.size)};
      border-radius: ${N(o.radio.size/2)};
      background: ${t.input.default.enabled.bg};
      box-shadow: ${ef({color:t.input.default.enabled.border,width:o.border.width})};

      &::after {
        content: '';
        position: absolute;
        top: ${N(n)};
        left: ${N(n)};
        height: ${N(o.radio.markSize)};
        width: ${N(o.radio.markSize)};
        border-radius: ${N(o.radio.markSize/2)};
        background: ${t.input.default.enabled.fg};
        opacity: 0;
      }
    }

    /* focused */
    &:not(:disabled):focus + span {
      box-shadow: ${ep({border:{width:o.border.width,color:t.input.default.enabled.border},focusRing:o.radio.focusRing})};
    }

    &:not(:disabled):focus:not(:focus-visible) + span {
      box-shadow: ${ef({color:t.input.default.enabled.border,width:o.border.width})};
    }

    &:checked + span::after {
      opacity: 1;
    }

    /* customValidity */
    &[data-error] + span {
      background-color: ${t.input.invalid.enabled.border};
      box-shadow: ${ef({width:o.border.width,color:t.input.invalid.enabled.muted.bg})};
      &::after {
        background: ${t.input.invalid.enabled.muted.bg};
      }
    }

    /* read only */
    &[data-read-only] + span {
      box-shadow: 0 0 0 1px ${t.input.default.readOnly.border};
      background: ${t.input.default.readOnly.bg};

      &::after {
        background: ${t.input.default.readOnly.border};
      }
    }

    /* disabled */
    &:not([data-read-only]):disabled + span {
      box-shadow: 0 0 0 1px ${t.input.default.disabled.border};
      background: ${t.input.default.disabled.bg};

      &::after {
        background: ${t.input.default.disabled.border};
      }
    }
  `}),oN=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m=(0,i.c)(19);m[0]!==e?({className:o,disabled:d,style:s,customValidity:r,readOnly:l,...c}=e,m[0]=e,m[1]=o,m[2]=r,m[3]=d,m[4]=l,m[5]=c,m[6]=s):(o=m[1],r=m[2],d=m[3],l=m[4],c=m[5],s=m[6]);let g=(0,a.useRef)(null);m[7]===Symbol.for("react.memo_cache_sentinel")?(u=()=>g.current,m[7]=u):u=m[7],(0,a.useImperativeHandle)(t,u),tv(g,r);let b=!d&&l?"":void 0,v=r?"":void 0,w=d||l;return m[8]!==l||m[9]!==c||m[10]!==b||m[11]!==v||m[12]!==w?(f=(0,n.jsx)(oz,{"data-read-only":b,"data-error":v,...c,disabled:w,readOnly:l,ref:g,type:"radio"}),m[8]=l,m[9]=c,m[10]=b,m[11]=v,m[12]=w,m[13]=f):f=m[13],m[14]===Symbol.for("react.memo_cache_sentinel")?(p=(0,n.jsx)("span",{}),m[14]=p):p=m[14],m[15]!==o||m[16]!==s||m[17]!==f?(h=(0,n.jsxs)(oE,{className:o,"data-ui":"Radio",style:s,children:[f,p]}),m[15]=o,m[16]=s,m[17]=f,m[18]=h):h=m[18],h});function o_(e){let{font:t}=(0,r.JW)(e.theme);return(0,d.AH)`
    -webkit-font-smoothing: antialiased;
    appearance: none;
    border: 0;
    font-family: ${t.text.family};
    color: inherit;
    width: 100%;
    outline: none;
    margin: 0;

    &:disabled {
      opacity: 1;
    }
  `}function oA(e){let{color:t,input:o}=(0,r.JW)(e.theme);return(0,d.AH)`
    /* enabled */
    background-color: ${t.input.default.enabled.bg};
    color: ${t.input.default.enabled.fg};
    box-shadow: ${ef({color:t.input.default.enabled.border,width:o.border.width})};

    /* hovered */
    @media (hover: hover) {
      &:not(:disabled):hover {
        background-color: ${t.input.default.hovered.bg};
        color: ${t.input.default.hovered.fg};
        box-shadow: ${ef({color:t.input.default.hovered.border,width:o.border.width})};
      }
    }

    /* focused */
    &:not(:disabled):focus {
      box-shadow: ${ep({border:{width:o.border.width,color:t.input.default.enabled.border},focusRing:o.select.focusRing})};
    }

    /* read-only */
    &[data-read-only] {
      background-color: ${t.input.default.readOnly.bg};
      color: ${t.input.default.readOnly.fg};
      box-shadow: ${ef({color:t.input.default.readOnly.border,width:o.border.width})};
    }

    /* disabled */
    &:not([data-read-only]):disabled {
      background-color: ${t.input.default.disabled.bg};
      color: ${t.input.default.disabled.fg};
      box-shadow: ${ef({color:t.input.default.disabled.border,width:o.border.width})};
    }
  `}function oW(e){let{$fontSize:t}=e,{font:o,media:n}=(0,r.JW)(e.theme);return _(n,t,e=>{var t;return{fontSize:N((t=o.text.sizes[e]||o.text.sizes[2]).fontSize),lineHeight:`${N(t.lineHeight)}`}})}oN.displayName="ForwardRef(Radio)";let oH={root:function(){return(0,d.AH)`
    position: relative;
    width: -moz-available;
    width: -webkit-fill-available;
    width: stretch;

    &:not([hidden]) {
      display: inline-block;
    }
  `},input:function(){return[eJ,o_,oA,oW,eW]},iconBox:function(e){let{color:t}=(0,r.JW)(e.theme);return(0,d.AH)`
    pointer-events: none;
    position: absolute;
    top: 0;
    right: 0;

    /* enabled */
    --card-fg-color: ${t.input.default.enabled.fg};

    /* hover */
    @media (hover: hover) {
      select:not(disabled):not(:read-only):hover + && {
        --card-fg-color: ${t.input.default.hovered.fg};
      }
    }

    /* disabled */
    select:disabled + && {
      --card-fg-color: ${t.input.default.disabled.fg};
    }

    /* read-only */
    select[data-read-only] + && {
      --card-fg-color: ${t.input.default.readOnly.fg};
    }
  `}},oT=d.I4.div.withConfig({displayName:"StyledSelect",componentId:"sc-5mxno7-0"})(oH.root),oL=d.I4.select.withConfig({displayName:"Input",componentId:"sc-5mxno7-1"})(oH.input),oM=(0,d.I4)(e9).withConfig({displayName:"IconBox",componentId:"sc-5mxno7-2"})(oH.iconBox),oF=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j=(0,i.c)(37);j[0]!==e?({children:o,customValidity:r,disabled:d,fontSize:u,padding:f,radius:p,readOnly:l,space:h,...c}=e,j[0]=e,j[1]=o,j[2]=r,j[3]=d,j[4]=l,j[5]=c,j[6]=u,j[7]=f,j[8]=p,j[9]=h):(o=j[1],r=j[2],d=j[3],l=j[4],c=j[5],u=j[6],f=j[7],p=j[8],h=j[9]);let I=void 0===u?2:u,R=void 0===f?3:f,C=void 0===p?2:p,E=void 0===h?3:h,z=(0,a.useRef)(null);j[10]===Symbol.for("react.memo_cache_sentinel")?(m=()=>z.current,j[10]=m):m=j[10],(0,a.useImperativeHandle)(t,m),tv(z,r);let N=!d&&l?"":void 0;j[11]!==I?(g=A(I),j[11]=I,j[12]=g):g=j[12],j[13]!==R?(b=A(R),j[13]=R,j[14]=b):b=j[14],j[15]!==C?(v=A(C),j[15]=C,j[16]=v):v=j[16],j[17]!==E?(w=A(E),j[17]=E,j[18]=w):w=j[18];let _=d||l;return j[19]!==o||j[20]!==c||j[21]!==_||j[22]!==N||j[23]!==g||j[24]!==b||j[25]!==v||j[26]!==w?(y=(0,n.jsx)(oL,{"data-read-only":N,"data-ui":"Select",...c,$fontSize:g,$padding:b,$radius:v,$space:w,disabled:_,ref:z,children:o}),j[19]=o,j[20]=c,j[21]=_,j[22]=N,j[23]=g,j[24]=b,j[25]=v,j[26]=w,j[27]=y):y=j[27],j[28]===Symbol.for("react.memo_cache_sentinel")?(x=(0,n.jsx)(s.D3D,{}),j[28]=x):x=j[28],j[29]!==I?($=(0,n.jsx)(tt,{size:I,children:x}),j[29]=I,j[30]=$):$=j[30],j[31]!==R||j[32]!==$?(k=(0,n.jsx)(oM,{padding:R,children:$}),j[31]=R,j[32]=$,j[33]=k):k=j[33],j[34]!==y||j[35]!==k?(S=(0,n.jsxs)(oT,{"data-ui":"Select",children:[y,k]}),j[34]=y,j[35]=k,j[36]=S):S=j[36],S});oF.displayName="ForwardRef(Select)";let oB={"&&:not([hidden])":{display:"grid"},'&[data-as="ul"],&[data-as="ol"]':{listStyle:"none"},gridTemplateColumns:"minmax(0, 1fr)",gridAutoRows:"min-content"},oJ=(0,d.I4)(e9).withConfig({displayName:"StyledStack",componentId:"sc-8dpfq2-0"})(function(){return oB},function(e){let{media:t,space:o}=(0,r.JW)(e.theme);return _(t,e.$space,e=>({gridGap:N(o[e])}))}),oO=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c=(0,i.c)(12);c[0]!==e?({as:o,space:a,...r}=e,c[0]=e,c[1]=o,c[2]=r,c[3]=a):(o=c[1],r=c[2],a=c[3]);let s="string"==typeof o?o:void 0;return c[4]!==a?(d=A(a),c[4]=a,c[5]=d):d=c[5],c[6]!==o||c[7]!==t||c[8]!==r||c[9]!==s||c[10]!==d?(l=(0,n.jsx)(oJ,{"data-as":s,"data-ui":"Stack",...r,$space:d,forwardedAs:o,ref:t}),c[6]=o,c[7]=t,c[8]=r,c[9]=s,c[10]=d,c[11]=l):l=c[11],l});oO.displayName="ForwardRef(Stack)";let oP=d.I4.span.withConfig({displayName:"StyledSwitch",componentId:"sc-dw1foe-0"})(function(){return(0,d.AH)`
    position: relative;
    &:not([hidden]) {
      display: inline-block;
    }
  `}),oD=d.I4.input.withConfig({displayName:"Input",componentId:"sc-dw1foe-1"})(function(){return(0,d.AH)`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    outline: none;
    padding: 0;
    margin: 0;

    /* Place the input element above the representation element */
    z-index: 1;
  `}),oV=d.I4.span.withConfig({displayName:"Representation",componentId:"sc-dw1foe-2"})(function(e){let{color:t,input:o}=(0,r.JW)(e.theme);return(0,d.AH)`
    --switch-bg-color: ${t.input.default.enabled.border};
    --switch-fg-color: ${t.input.default.enabled.bg};
    --switch-box-shadow: none;

    &:not([hidden]) {
      display: block;
    }
    position: relative;
    width: ${N(o.switch.width)};
    height: ${N(o.switch.height)};
    border-radius: ${N(o.switch.height/2)};

    /* Make sure it’s not possible to interact with the wrapper element */
    pointer-events: none;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      box-shadow: var(--switch-box-shadow);
      border-radius: inherit;
    }

    /* Focus styles */
    input:focus + && {
      --switch-box-shadow: ${ep({focusRing:o.switch.focusRing})};
    }

    input:focus:not(:focus-visible) + && {
      --switch-box-shadow: none;
    }

    input:checked + && {
      --switch-bg-color: ${t.input.default.enabled.fg};
      --switch-fg-color: ${t.input.default.enabled.bg};
    }

    @media (hover: hover) {
      input:not(:disabled):hover + && {
        --switch-bg-color: ${t.input.default.hovered.border};
        --switch-fg-color: ${t.input.default.hovered.bg};
      }

      input:not(:disabled):checked:hover + && {
        --switch-bg-color: ${t.input.default.enabled.fg};
        --switch-fg-color: ${t.input.default.enabled.bg};
      }
    }

    input:not([data-read-only]):disabled + && {
      --switch-bg-color: ${t.input.default.disabled.border};
      --switch-fg-color: ${t.input.default.disabled.bg};
    }

    input[data-read-only]:disabled + && {
      --switch-bg-color: ${t.input.default.readOnly.border};
      --switch-fg-color: ${t.input.default.readOnly.bg};
    }

    input:checked[data-read-only]:disabled + && {
      --switch-bg-color: ${t.input.default.readOnly.fg};
      --switch-fg-color: ${t.input.default.readOnly.bg};
    }
  `}),oG=d.I4.span.withConfig({displayName:"Track",componentId:"sc-dw1foe-3"})(function(e){let{input:t}=(0,r.JW)(e.theme);return(0,d.AH)`
    &:not([hidden]) {
      display: block;
    }
    background-color: var(--switch-bg-color);
    position: absolute;
    left: 0;
    top: 0;
    width: ${N(t.switch.width)};
    height: ${N(t.switch.height)};
    border-radius: ${N(t.switch.height/2)};
  `}),oY=d.I4.span.withConfig({displayName:"Thumb",componentId:"sc-dw1foe-4"})(function(e){let{$indeterminate:t}=e,{input:o}=(0,r.JW)(e.theme),n=o.switch.width,i=o.switch.height,a=o.switch.padding,l=i-2*o.switch.padding,c=n-2*a-l,s=n/2-l/2-a,u=!0!==t&&!0===e.$checked;return(0,d.AH)`
    &:not([hidden]) {
      display: block;
    }
    position: absolute;
    left: ${N(a)};
    top: ${N(a)};
    height: ${N(l)};
    width: ${N(l)};
    border-radius: ${N(l/2)};
    transition-property: transform;
    transition-duration: ${o.switch.transitionDurationMs}ms;
    transition-timing-function: ${o.switch.transitionTimingFunction};
    background: var(--switch-fg-color);
    transform: translate3d(0, 0, 0);
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.05);

    ${u&&(0,d.AH)`
      transform: translate3d(${c}px, 0, 0);
    `}

    ${t&&(0,d.AH)`
      transform: translate3d(${s}px, 0, 0);
    `}
  `}),oX=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v,w=(0,i.c)(26);w[0]!==e?({checked:o,className:r,disabled:d,indeterminate:l,readOnly:c,style:u,...s}=e,w[0]=e,w[1]=o,w[2]=r,w[3]=d,w[4]=l,w[5]=c,w[6]=s,w[7]=u):(o=w[1],r=w[2],d=w[3],l=w[4],c=w[5],s=w[6],u=w[7]);let y=(0,a.useRef)(null);w[8]===Symbol.for("react.memo_cache_sentinel")?(f=()=>y.current,w[8]=f):f=w[8],(0,a.useImperativeHandle)(t,f),w[9]!==l?(p=()=>{y.current&&(y.current.indeterminate=l||!1)},h=[l],w[9]=l,w[10]=p,w[11]=h):(p=w[10],h=w[11]),(0,a.useEffect)(p,h);let x=!d&&c?"":void 0,$=!0!==l&&o,k=d||c;return w[12]!==s||w[13]!==x||w[14]!==$||w[15]!==k?(m=(0,n.jsx)(oD,{"data-read-only":x,...s,checked:$,disabled:k,type:"checkbox",ref:y}),w[12]=s,w[13]=x,w[14]=$,w[15]=k,w[16]=m):m=w[16],w[17]===Symbol.for("react.memo_cache_sentinel")?(g=(0,n.jsx)(oG,{}),w[17]=g):g=w[17],w[18]!==o||w[19]!==l?(b=(0,n.jsxs)(oV,{"aria-hidden":!0,"data-name":"representation",children:[g,(0,n.jsx)(oY,{$checked:o,$indeterminate:l})]}),w[18]=o,w[19]=l,w[20]=b):b=w[20],w[21]!==r||w[22]!==u||w[23]!==m||w[24]!==b?(v=(0,n.jsxs)(oP,{className:r,"data-ui":"Switch",style:u,children:[m,b]}),w[21]=r,w[22]=u,w[23]=m,w[24]=b,w[25]=v):v=w[25],v});oX.displayName="ForwardRef(Switch)";let oU=d.I4.span.withConfig({displayName:"StyledTextArea",componentId:"sc-1d6h1o8-0"})(eT),oq=d.I4.span.withConfig({displayName:"InputRoot",componentId:"sc-1d6h1o8-1"})`flex:1;min-width:0;display:block;position:relative;`,oK=d.I4.textarea.withConfig({displayName:"Input",componentId:"sc-1d6h1o8-2"})(eA,eL,eM),oZ=d.I4.div.withConfig({displayName:"Presentation",componentId:"sc-1d6h1o8-3"})(eJ,eF),oQ=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,$=(0,i.c)(35);$[0]!==e?({border:l,customValidity:r,disabled:c,fontSize:s,padding:u,radius:f,weight:p,__unstable_disableFocusRing:o,...d}=e,$[0]=e,$[1]=o,$[2]=r,$[3]=d,$[4]=l,$[5]=c,$[6]=s,$[7]=u,$[8]=f,$[9]=p):(o=$[1],r=$[2],d=$[3],l=$[4],c=$[5],s=$[6],u=$[7],f=$[8],p=$[9]);let k=void 0===l||l,S=void 0!==c&&c,j=void 0===s?2:s,I=void 0===u?3:u,R=void 0===f?2:f,C=(0,a.useRef)(null),E=J();$[10]===Symbol.for("react.memo_cache_sentinel")?(h=()=>C.current,$[10]=h):h=$[10],(0,a.useImperativeHandle)(t,h),tv(C,r);let z=E.scheme,N=E.tone;$[11]!==j?(m=A(j),$[11]=j,$[12]=m):m=$[12],$[13]!==I?(g=A(I),$[13]=I,$[14]=g):g=$[14];let _=E.scheme;$[15]===Symbol.for("react.memo_cache_sentinel")?(b=A(0),$[15]=b):b=$[15],$[16]!==S||$[17]!==d||$[18]!==E.scheme||$[19]!==E.tone||$[20]!==m||$[21]!==g||$[22]!==p?(v=(0,n.jsx)(oK,{"data-as":"textarea","data-scheme":z,"data-tone":N,...d,$fontSize:m,$padding:g,$scheme:_,$space:b,$tone:E.tone,$weight:p,disabled:S,ref:C}),$[16]=S,$[17]=d,$[18]=E.scheme,$[19]=E.tone,$[20]=m,$[21]=g,$[22]=p,$[23]=v):v=$[23],$[24]!==R?(w=A(R),$[24]=R,$[25]=w):w=$[25];let W=k?"":void 0;return $[26]!==o||$[27]!==E.scheme||$[28]!==E.tone||$[29]!==w||$[30]!==W?(y=(0,n.jsx)(oZ,{$radius:w,$unstableDisableFocusRing:o,$scheme:E.scheme,$tone:E.tone,"data-border":W,"data-scheme":E.scheme,"data-tone":E.tone}),$[26]=o,$[27]=E.scheme,$[28]=E.tone,$[29]=w,$[30]=W,$[31]=y):y=$[31],$[32]!==v||$[33]!==y?(x=(0,n.jsx)(oU,{"data-ui":"TextArea",children:(0,n.jsxs)(oq,{children:[v,y]})}),$[32]=v,$[33]=y,$[34]=x):x=$[34],x});oQ.displayName="ForwardRef(TextArea)";let o1={zIndex:2},o0=(0,d.I4)(tm).attrs({forwardedAs:"span"}).withConfig({displayName:"StyledTextInput",componentId:"sc-h62wco-0"})(eT),o2=d.I4.span.withConfig({displayName:"InputRoot",componentId:"sc-h62wco-1"})`flex:1;min-width:0;display:block;position:relative;`,o3=(0,d.I4)(tm).attrs({forwardedAs:"span"}).withConfig({displayName:"Prefix",componentId:"sc-h62wco-2"})`border-top-right-radius:0;border-bottom-right-radius:0;& > span{display:block;margin:-1px;}`,o4=(0,d.I4)(tm).attrs({forwardedAs:"span"}).withConfig({displayName:"Suffix",componentId:"sc-h62wco-3"})`border-top-left-radius:0;border-bottom-left-radius:0;& > span{display:block;margin:-1px;}`,o5=d.I4.input.withConfig({displayName:"Input",componentId:"sc-h62wco-4"})(eA,eL,eM),o6=d.I4.span.withConfig({displayName:"Presentation",componentId:"sc-h62wco-5"})(eJ,eF),o7=(0,d.I4)(e9).withConfig({displayName:"LeftBox",componentId:"sc-h62wco-6"})`position:absolute;top:0;left:0;`,o8=(0,d.I4)(e9).withConfig({displayName:"RightBox",componentId:"sc-h62wco-7"})`position:absolute;top:0;right:0;`,o9=(0,d.I4)(tm).withConfig({displayName:"RightCard",componentId:"sc-h62wco-8"})`background-color:transparent;position:absolute;top:0;right:0;`,re=(0,d.I4)(tp).withConfig({displayName:"TextInputClearButton",componentId:"sc-h62wco-9"})({"&:not([hidden])":{display:"block"}}),rt=(0,a.forwardRef)(function(e,t){let o,r,d,l,u,f,p,h,m,g,b,v,w,y,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,O,P,D,V=(0,i.c)(92);V[0]!==e?({__unstable_disableFocusRing:d,border:b,clearButton:l,disabled:v,fontSize:w,icon:o,iconRight:r,onClear:f,padding:y,prefix:p,radius:$,readOnly:h,space:k,suffix:g,customValidity:u,type:S,weight:j,...m}=e,V[0]=e,V[1]=o,V[2]=r,V[3]=d,V[4]=l,V[5]=u,V[6]=f,V[7]=p,V[8]=h,V[9]=m,V[10]=g,V[11]=b,V[12]=v,V[13]=w,V[14]=y,V[15]=$,V[16]=k,V[17]=S,V[18]=j):(o=V[1],r=V[2],d=V[3],l=V[4],u=V[5],f=V[6],p=V[7],h=V[8],m=V[9],g=V[10],b=V[11],v=V[12],w=V[13],y=V[14],$=V[15],k=V[16],S=V[17],j=V[18]);let G=void 0===b||b,Y=void 0!==v&&v,X=void 0===w?2:w,U=void 0===y?3:y,q=void 0===$?2:$,K=void 0===k?3:k,Z=void 0===S?"text":S,Q=(0,a.useRef)(null),ee=J();V[19]!==X?(I=A(X),V[19]=X,V[20]=I):I=V[20];let et=I;V[21]!==U?(R=A(U),V[21]=U,V[22]=R):R=V[22];let eo=R;V[23]!==q?(C=A(q),V[23]=q,V[24]=C):C=V[24];let er=C;V[25]!==K?(E=A(K),V[25]=K,V[26]=E):E=V[26];let en=E,ei=!!l,ea=!!o,ed=!!r,el=!!g,ec=!!p;V[27]===Symbol.for("react.memo_cache_sentinel")?(z=()=>Q.current,V[27]=z):z=V[27],(0,a.useImperativeHandle)(t,z),tv(Q,u),V[28]!==f?(N=e=>{e.preventDefault(),e.stopPropagation(),f&&f(),Q.current?.focus()},V[28]=f,V[29]=N):N=V[29];let es=N;V[30]!==p||V[31]!==er?(_=p&&(0,n.jsx)(o3,{borderTop:!0,borderLeft:!0,borderBottom:!0,radius:er,sizing:"border",tone:"inherit",children:(0,n.jsx)("span",{children:p})}),V[30]=p,V[31]=er,V[32]=_):_=V[32];let eu=_,ef=G?"":void 0;V[33]!==o||V[34]!==et||V[35]!==eo?(W=o&&(0,n.jsx)(o7,{padding:eo,children:(0,n.jsxs)(tt,{size:et,children:[(0,a.isValidElement)(o)&&o,(0,c.isValidElementType)(o)&&(0,n.jsx)(o,{})]})}),V[33]=o,V[34]=et,V[35]=eo,V[36]=W):W=V[36],V[37]!==ei||V[38]!==r||V[39]!==et||V[40]!==eo?(H=!ei&&r&&(0,n.jsx)(o8,{padding:eo,children:(0,n.jsxs)(tt,{size:et,children:[(0,a.isValidElement)(r)&&r,(0,c.isValidElementType)(r)&&(0,n.jsx)(r,{})]})}),V[37]=ei,V[38]=r,V[39]=et,V[40]=eo,V[41]=H):H=V[41],V[42]!==ec||V[43]!==el||V[44]!==d||V[45]!==er||V[46]!==ee.scheme||V[47]!==ee.tone||V[48]!==ef||V[49]!==W||V[50]!==H?(T=(0,n.jsxs)(o6,{$hasPrefix:ec,$unstableDisableFocusRing:d,$hasSuffix:el,$radius:er,$scheme:ee.scheme,$tone:ee.tone,"data-border":ef,"data-scheme":ee.scheme,"data-tone":ee.tone,children:[W,H]}),V[42]=ec,V[43]=el,V[44]=d,V[45]=er,V[46]=ee.scheme,V[47]=ee.tone,V[48]=ef,V[49]=W,V[50]=H,V[51]=T):T=V[51];let ep=T;V[52]!==eo?(L=eo.map(rr),V[52]=eo,V[53]=L):L=V[53];let eh=L;V[54]!==eo?(M=eo.map(rn),V[54]=eo,V[55]=M):M=V[55];let em=M,eg="object"==typeof l?l:x;V[56]!==l||V[57]!==eh||V[58]!==em||V[59]!==eg||V[60]!==u||V[61]!==Y||V[62]!==et||V[63]!==es||V[64]!==er||V[65]!==h?(F=!Y&&!h&&l&&(0,n.jsx)(o9,{forwardedAs:"span",padding:eh,style:o1,tone:u?"critical":"inherit",children:(0,n.jsx)(re,{"aria-label":"Clear","data-qa":"clear-button",fontSize:et,icon:s.USm,mode:"bleed",padding:em,radius:er,...eg,onClick:es,onMouseDown:ro})}),V[56]=l,V[57]=eh,V[58]=em,V[59]=eg,V[60]=u,V[61]=Y,V[62]=et,V[63]=es,V[64]=er,V[65]=h,V[66]=F):F=V[66];let eb=F;V[67]!==er||V[68]!==g?(B=g&&(0,n.jsx)(o4,{borderTop:!0,borderRight:!0,borderBottom:!0,radius:er,sizing:"border",tone:"inherit",children:(0,n.jsx)("span",{children:g})}),V[67]=er,V[68]=g,V[69]=B):B=V[69];let ev=B,ew=ed||ei;return V[70]!==ea||V[71]!==Y||V[72]!==et||V[73]!==eo||V[74]!==h||V[75]!==m||V[76]!==ee.scheme||V[77]!==ee.tone||V[78]!==en||V[79]!==ew||V[80]!==Z||V[81]!==j?(O=(0,n.jsx)(o5,{"data-as":"input","data-scheme":ee.scheme,"data-tone":ee.tone,...m,$fontSize:et,$iconLeft:ea,$iconRight:ew,$padding:eo,$scheme:ee.scheme,$space:en,$tone:ee.tone,$weight:j,disabled:Y,readOnly:h,ref:Q,type:Z}),V[70]=ea,V[71]=Y,V[72]=et,V[73]=eo,V[74]=h,V[75]=m,V[76]=ee.scheme,V[77]=ee.tone,V[78]=en,V[79]=ew,V[80]=Z,V[81]=j,V[82]=O):O=V[82],V[83]!==eb||V[84]!==ep||V[85]!==O?(P=(0,n.jsxs)(o2,{children:[O,ep,eb]}),V[83]=eb,V[84]=ep,V[85]=O,V[86]=P):P=V[86],V[87]!==eu||V[88]!==ee.tone||V[89]!==ev||V[90]!==P?(D=(0,n.jsxs)(o0,{"data-ui":"TextInput",tone:ee.tone,children:[eu,P,ev]}),V[87]=eu,V[88]=ee.tone,V[89]=ev,V[90]=P,V[91]=D):D=V[91],D});function ro(e){e.preventDefault(),e.stopPropagation()}function rr(e){return 0===e?0:1===e||2===e?1:e-2}function rn(e){return 0===e||1===e?0:2===e?1:e-1}function ri(e){let t,o,r=(0,i.c)(3),[n,d]=(0,a.useState)(e),l=(0,a.useRef)(void 0);r[0]===Symbol.for("react.memo_cache_sentinel")?(t=(e,t)=>{let o=()=>{d(e)};if(l.current&&(clearTimeout(l.current),l.current=void 0),!t)return o();l.current=setTimeout(o,t)},r[0]=t):t=r[0];let c=t;return r[1]!==n?(o=[n,c],r[1]=n,r[2]=o):o=r[2],o}rt.displayName="ForwardRef(TextInput)";let ra={top:["top-end","top-start","bottom","left","right"],"top-start":["top","top-end","bottom-start","left-start","right-start"],"top-end":["top","top-start","bottom-end","left-end","right-end"],bottom:["bottom-end","bottom-start","top","left","right"],"bottom-start":["bottom","bottom-end","top-start","left-start","right-start"],"bottom-end":["bottom","bottom-start","top-end","left-end","right-end"],left:["left-end","left-start","right","top","bottom"],"left-start":["left","left-end","right-start","top-start","bottom-start"],"left-end":["left","left-start","right-end","top-end","bottom-end"],right:["right-end","right-start","left","top","bottom"],"right-start":["right","right-end","left-start","top-start","bottom-start"],"right-end":["right","right-start","left-end","top-end","bottom-end"]},rd=(0,d.I4)(p.P.create(tm)).withConfig({displayName:"MotionCard",componentId:"sc-1xn138w-0"})`will-change:transform;`,rl=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,k,S,j,I,R=(0,i.c)(48);R[0]!==e?({animate:o,arrow:r,arrowRef:a,arrowX:d,arrowY:l,children:c,originX:s,originY:u,padding:f,placement:p,radius:h,scheme:g,shadow:b,style:v,...m}=e,R[0]=e,R[1]=o,R[2]=r,R[3]=a,R[4]=d,R[5]=l,R[6]=c,R[7]=s,R[8]=u,R[9]=f,R[10]=p,R[11]=h,R[12]=m,R[13]=g,R[14]=b,R[15]=v):(o=R[1],r=R[2],a=R[3],d=R[4],l=R[5],c=R[6],s=R[7],u=R[8],f=R[9],p=R[10],h=R[11],m=R[12],g=R[13],b=R[14],v=R[15]);let C=o?"transform":void 0;R[16]!==s||R[17]!==u||R[18]!==v||R[19]!==C?(w={originX:s,originY:u,willChange:C,...v},R[16]=s,R[17]=u,R[18]=v,R[19]=C,R[20]=w):w=R[20];let E=w,z=null!==d?d:void 0,N=null!==l?l:void 0;R[21]!==z||R[22]!==N?(y={left:z,top:N,right:void 0,bottom:void 0},R[21]=z,R[22]=N,R[23]=y):y=R[23];let _=y,A=m;return R[24]!==o?(x=o?["hidden","initial"]:void 0,R[24]=o,R[25]=x):x=R[25],R[26]!==o?(k=o?["visible","scaleIn"]:void 0,R[26]=o,R[27]=k):k=R[27],R[28]!==o?(S=o?["hidden","scaleOut"]:void 0,R[28]=o,R[29]=S):S=R[29],R[30]!==r||R[31]!==a||R[32]!==_?(j=r&&(0,n.jsx)(t2,{ref:a,style:_,width:15,height:6,radius:2}),R[30]=r,R[31]=a,R[32]=_,R[33]=j):j=R[33],R[34]!==c||R[35]!==f||R[36]!==p||R[37]!==h||R[38]!==t||R[39]!==E||R[40]!==g||R[41]!==b||R[42]!==A||R[43]!==x||R[44]!==k||R[45]!==S||R[46]!==j?(I=(0,n.jsxs)(rd,{"data-ui":"Tooltip__card",...A,"data-placement":p,padding:f,radius:h,ref:t,scheme:g,shadow:b,style:E,variants:$.card,transition:$.transition,initial:x,animate:k,exit:S,children:[c,j]}),R[34]=c,R[35]=f,R[36]=p,R[37]=h,R[38]=t,R[39]=E,R[40]=g,R[41]=b,R[42]=A,R[43]=x,R[44]=k,R[45]=S,R[46]=j,R[47]=I):I=R[47],I});rl.displayName="ForwardRef(TooltipCard)";let rc=M("@sanity/ui/context/tooltipDelayGroup",null);function rs(e){let t,o,r=(0,i.c)(9),{children:a,delay:d}=e,[l,c]=ri(!1),[s,u]=ri(null),f="number"==typeof d?d:d?.open||0,p="number"==typeof d?d:d?.close||0,h=l?1:f;r[0]!==p||r[1]!==s||r[2]!==c||r[3]!==u||r[4]!==h?(t={setIsGroupActive:c,openTooltipId:s,setOpenTooltipId:u,openDelay:h,closeDelay:p},r[0]=p,r[1]=s,r[2]=c,r[3]=u,r[4]=h,r[5]=t):t=r[5];let m=t;return r[6]!==a||r[7]!==m?(o=(0,n.jsx)(rc.Provider,{value:m,children:a}),r[6]=a,r[7]=m,r[8]=o):o=r[8],o}rs.displayName="TooltipDelayGroupProvider";let ru=(0,d.I4)(od).withConfig({displayName:"StyledTooltip",componentId:"sc-13f2zvh-0"})`pointer-events:none;`,rf=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,p,m,g,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,J,O,P,V,G,Y,X,U,q,K,Z,Q,ee,et,eo,er,en,ei,ea,ed=(0,i.c)(137),el=t7(),{layer:ec}=D();ed[0]!==e?({animate:w,arrow:y,boundaryElement:o,children:l,content:c,disabled:p,fallbackPlacements:r,padding:x,placement:$,portal:m,radius:k,scheme:v,shadow:S,zOffset:d,delay:s,...g}=e,ed[0]=e,ed[1]=o,ed[2]=r,ed[3]=d,ed[4]=l,ed[5]=c,ed[6]=s,ed[7]=p,ed[8]=m,ed[9]=g,ed[10]=v,ed[11]=w,ed[12]=y,ed[13]=x,ed[14]=$,ed[15]=k,ed[16]=S):(o=ed[1],r=ed[2],d=ed[3],l=ed[4],c=ed[5],s=ed[6],p=ed[7],m=ed[8],g=ed[9],v=ed[10],w=ed[11],y=ed[12],x=ed[13],$=ed[14],k=ed[15],S=ed[16]);let es=void 0!==w&&w,eu=void 0!==y&&y,ef=void 0===x?2:x,ep=void 0===$?"bottom":$,eh=void 0===k?2:k,em=void 0===S?2:S,eg=o??el?.element,eb=r??ra[e.placement??"bottom"],ev=d??ec.tooltip.zOffset,ew=!tC()&&es;ed[17]!==eb?(j=A(eb),ed[17]=eb,ed[18]=j):j=ed[18];let ey=j,ex=(0,a.useRef)(null),[e$,ek]=(0,a.useState)(null),eS=(0,a.useRef)(null),[ej,eI]=(0,a.useState)(0);ed[19]===Symbol.for("react.memo_cache_sentinel")?(I=()=>ex.current,ed[19]=I):I=ed[19],(0,a.useImperativeHandle)(t,I);let eR=ou(),eC="string"==typeof m?eR.elements?.[m]||null:eR.element;ed[20]!==ew||ed[21]!==eu||ed[22]!==eg||ed[23]!==ey?(R={animate:ew,arrowProp:eu,arrowRef:eS,boundaryElement:eg,fallbackPlacements:ey,rootBoundary:"viewport"},ed[20]=ew,ed[21]=eu,ed[22]=eg,ed[23]=ey,ed[24]=R):R=ed[24];let eE=function(e){let t,o=(0,i.c)(17),{animate:r,arrowProp:n,arrowRef:a,boundaryElement:d,fallbackPlacements:l,rootBoundary:c}=e;if(o[0]!==r||o[1]!==n||o[2]!==a||o[3]!==d||o[4]!==l||o[5]!==c){let e,i,s;t=[];let u=d||void 0;o[7]!==l||o[8]!==c||o[9]!==u?(e=(0,f.UU)({boundary:u,fallbackPlacements:l,padding:4,rootBoundary:c}),o[7]=l,o[8]=c,o[9]=u,o[10]=e):e=o[10],t.push(e),o[11]===Symbol.for("react.memo_cache_sentinel")?(i=(0,f.cY)({mainAxis:4}),o[11]=i):i=o[11],t.push(i);let p=d||void 0;if(o[12]!==c||o[13]!==p?(s=(0,f.BN)({boundary:p,rootBoundary:c,padding:4}),o[12]=c,o[13]=p,o[14]=s):s=o[14],t.push(s),n){let e;o[15]!==a?(e=(0,f.UE)({element:a,padding:4}),o[15]=a,o[16]=e):e=o[16],t.push(e)}r&&t.push(tU),o[0]=r,o[1]=n,o[2]=a,o[3]=d,o[4]=l,o[5]=c,o[6]=t}else t=o[6];return t}(R);ed[25]!==e$?(C={reference:e$},ed[25]=e$,ed[26]=C):C=ed[26],ed[27]!==eE||ed[28]!==ep||ed[29]!==C?(E={middleware:eE,placement:ep,whileElementsMounted:u.ll,elements:C},ed[27]=eE,ed[28]=ep,ed[29]=C,ed[30]=E):E=ed[30];let{floatingStyles:ez,placement:eN,middlewareData:e_,refs:eA,update:eW}=(0,f.we)(E),eH=e_.arrow?.x,eT=e_.arrow?.y,eL=e_["@sanity/ui/origin"]?.originX,eM=e_["@sanity/ui/origin"]?.originY,eF=(0,a.useId)(),[eB,eJ]=ri(!1),eO=(0,a.useContext)(rc);ed[31]!==eO?(z=eO||{},ed[31]=eO,ed[32]=z):z=ed[32];let{setIsGroupActive:eP,setOpenTooltipId:eD}=z,eV=eB||eO?.openTooltipId===eF,eG=null!==eO,eY="number"==typeof s?s:s?.open||0,eX="number"==typeof s?s:s?.close||0,eU=eG?eO.openDelay:eY,eq=eG?eO.closeDelay:eX;ed[33]!==eq||ed[34]!==eG||ed[35]!==eU||ed[36]!==eP||ed[37]!==eJ||ed[38]!==eD||ed[39]!==eF?(N=(e,t)=>{if(eG)if(e){let o=t?0:eU;eP?.(e,o),eD?.(eF,o)}else{let o=eq>200?eq:200;eP?.(e,o),eD?.(null,t?0:eq)}else eJ(e,t?0:e?eU:eq)},ed[33]=eq,ed[34]=eG,ed[35]=eU,ed[36]=eP,ed[37]=eJ,ed[38]=eD,ed[39]=eF,ed[40]=N):N=ed[40];let eK=N;ed[41]!==l?.props||ed[42]!==eK?(_=e=>{eK(!1),l?.props?.onBlur?.(e)},ed[41]=l?.props,ed[42]=eK,ed[43]=_):_=ed[43];let eZ=_;ed[44]!==l?.props||ed[45]!==eK?(W=e=>{eK(!1,!0),l?.props.onClick?.(e)},ed[44]=l?.props,ed[45]=eK,ed[46]=W):W=ed[46];let eQ=W;ed[47]!==l?.props||ed[48]!==eK?(H=e=>{eK(!1,!0),l?.props.onContextMenu?.(e)},ed[47]=l?.props,ed[48]=eK,ed[49]=H):H=ed[49];let e1=H;ed[50]!==l?.props||ed[51]!==eK?(T=e=>{eK(!0),l?.props?.onFocus?.(e)},ed[50]=l?.props,ed[51]=eK,ed[52]=T):T=ed[52];let e0=T;ed[53]!==l?.props||ed[54]!==eK?(L=e=>{eK(!0),l?.props?.onMouseEnter?.(e)},ed[53]=l?.props,ed[54]=eK,ed[55]=L):L=ed[55];let e2=L;ed[56]!==l?.props||ed[57]!==eK?(M=e=>{eK(!1),l?.props?.onMouseLeave?.(e)},ed[56]=l?.props,ed[57]=eK,ed[58]=M):M=ed[58];let e3=M;ed[59]!==eK||ed[60]!==eG||ed[61]!==e$||ed[62]!==eV?(F={handleIsOpenChange:eK,referenceElement:e$,showTooltip:eV,isInsideGroup:eG},ed[59]=eK,ed[60]=eG,ed[61]=e$,ed[62]=eV,ed[63]=F):F=ed[63],function(e){let t,o,r,n=(0,i.c)(10),{handleIsOpenChange:d,referenceElement:l,showTooltip:c,isInsideGroup:s}=e;n[0]!==d||n[1]!==l?(t=(e,t)=>{l&&(l===e||e instanceof Node&&l.contains(e)||(d(!1),t()))},n[0]=d,n[1]=l,n[2]=t):t=n[2];let u=(0,b.J)(t);n[3]!==s||n[4]!==u||n[5]!==c?(o=()=>{if(!c||s)return;let e=t=>{u(t.target,()=>window.removeEventListener("mousemove",e))};return window.addEventListener("mousemove",e),()=>window.removeEventListener("mousemove",e)},n[3]=s,n[4]=u,n[5]=c,n[6]=o):o=n[6],n[7]!==s||n[8]!==c?(r=[s,c],n[7]=s,n[8]=c,n[9]=r):r=n[9],(0,a.useEffect)(o,r)}(F),ed[64]!==p||ed[65]!==eK||ed[66]!==eV?(B=()=>{p&&eV&&eK(!1)},J=[p,eK,eV],ed[64]=p,ed[65]=eK,ed[66]=eV,ed[67]=B,ed[68]=J):(B=ed[67],J=ed[68]),(0,a.useEffect)(B,J),ed[69]!==c||ed[70]!==eK||ed[71]!==eV?(O=()=>{!c&&eV&&eK(!1)},P=[c,eK,eV],ed[69]=c,ed[70]=eK,ed[71]=eV,ed[72]=O,ed[73]=P):(O=ed[72],P=ed[73]),(0,a.useEffect)(O,P),ed[74]!==eK||ed[75]!==eV?(V=()=>{if(!eV)return;let e=function(e){"Escape"===e.key&&eK(!1,!0)};return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}},G=[eK,eV],ed[74]=eK,ed[75]=eV,ed[76]=V,ed[77]=G):(V=ed[76],G=ed[77]),(0,a.useEffect)(V,G),ed[78]!==eg||ed[79]!==eC?.offsetWidth?(Y=()=>{eI(Math.min(...eg?[eg.offsetWidth]:[],eC?.offsetWidth||document.body.offsetWidth)-8)},ed[78]=eg,ed[79]=eC?.offsetWidth,ed[80]=Y):Y=ed[80],ed[81]!==eg||ed[82]!==eC?(X=[eg,eC],ed[81]=eg,ed[82]=eC,ed[83]=X):X=ed[83],(0,a.useLayoutEffect)(Y,X),ed[84]!==eW?(U=e=>{eS.current=e,eW()},ed[84]=eW,ed[85]=U):U=ed[85];let e4=U;ed[86]!==eA?(q=e=>{ex.current=e,eA.setFloating(e)},ed[86]=eA,ed[87]=q):q=ed[87];let e5=q;e:{let e;if(!l){K=null;break e}ed[88]!==l||ed[89]!==eZ||ed[90]!==eQ||ed[91]!==e1||ed[92]!==e0||ed[93]!==e2||ed[94]!==e3?(e=(0,a.cloneElement)(l,{onBlur:eZ,onFocus:e0,onMouseEnter:e2,onMouseLeave:e3,onClick:eQ,onContextMenu:e1,ref:ek}),ed[88]=l,ed[89]=eZ,ed[90]=eQ,ed[91]=e1,ed[92]=e0,ed[93]=e2,ed[94]=e3,ed[95]=e):e=ed[95],K=e}let e6=K;if(ed[96]!==l?(Z=l?ox(l):null,ed[96]=l,ed[97]=Z):Z=ed[97],ed[98]!==e$?(Q=()=>e$,ee=[e$],ed[98]=e$,ed[99]=Q,ed[100]=ee):(Q=ed[99],ee=ed[100]),(0,a.useImperativeHandle)(Z,Q,ee),!e6){let e;return ed[101]===Symbol.for("react.memo_cache_sentinel")?(e=(0,n.jsx)(n.Fragment,{}),ed[101]=e):e=ed[101],e}if(p)return e6;let e7=ej>0?`${ej}px`:void 0;ed[102]!==ez||ed[103]!==e7?(et={...ez,maxWidth:e7},ed[102]=ez,ed[103]=e7,ed[104]=et):et=ed[104],ed[105]!==ew||ed[106]!==eu||ed[107]!==eH||ed[108]!==eT||ed[109]!==c||ed[110]!==eL||ed[111]!==eM||ed[112]!==ef||ed[113]!==eN||ed[114]!==eh||ed[115]!==g||ed[116]!==v||ed[117]!==e4||ed[118]!==e5||ed[119]!==em?(eo=(0,n.jsx)(rl,{...g,animate:ew,arrow:eu,arrowRef:e4,arrowX:eH,arrowY:eT,originX:eL,originY:eM,padding:ef,placement:eN,radius:eh,ref:e5,scheme:v,shadow:em,children:c}),ed[105]=ew,ed[106]=eu,ed[107]=eH,ed[108]=eT,ed[109]=c,ed[110]=eL,ed[111]=eM,ed[112]=ef,ed[113]=eN,ed[114]=eh,ed[115]=g,ed[116]=v,ed[117]=e4,ed[118]=e5,ed[119]=em,ed[120]=eo):eo=ed[120],ed[121]!==g||ed[122]!==e5||ed[123]!==et||ed[124]!==eo||ed[125]!==ev?(er=(0,n.jsx)(ru,{"data-ui":"Tooltip",...g,ref:e5,style:et,zOffset:ev,children:eo}),ed[121]=g,ed[122]=e5,ed[123]=et,ed[124]=eo,ed[125]=ev,ed[126]=er):er=ed[126];let e8=er;ed[127]!==m||ed[128]!==eV||ed[129]!==e8?(en=eV&&(m?(0,n.jsx)(of,{__unstable_name:"string"==typeof m?m:void 0,children:e8}):e8),ed[127]=m,ed[128]=eV,ed[129]=e8,ed[130]=en):en=ed[130];let e9=en;return ed[131]!==ew||ed[132]!==e9?(ei=ew?(0,n.jsx)(h.N,{children:e9}):e9,ed[131]=ew,ed[132]=e9,ed[133]=ei):ei=ed[133],ed[134]!==e6||ed[135]!==ei?(ea=(0,n.jsxs)(n.Fragment,{children:[ei,e6]}),ed[134]=e6,ed[135]=ei,ed[136]=ea):ea=ed[136],ea});rf.displayName="ForwardRef(Tooltip)";let rp=d.I4.kbd.withConfig({displayName:"StyledHotkeys",componentId:"sc-b37mge-0"})`font:inherit;padding:1px;&:not([hidden]){display:block;}`,rh=(0,d.I4)(tX).withConfig({displayName:"Key",componentId:"sc-b37mge-1"})`&:not([hidden]){display:block;}`,rm=(0,a.forwardRef)(function(e,t){let o,r,a,d,l,c,s,u,f,p,h=(0,i.c)(26);h[0]!==e?({fontSize:o,keys:r,padding:a,radius:d,space:c,...l}=e,h[0]=e,h[1]=o,h[2]=r,h[3]=a,h[4]=d,h[5]=l,h[6]=c):(o=h[1],r=h[2],a=h[3],d=h[4],l=h[5],c=h[6]);let m=void 0===c?.5:c;h[7]!==m?(s=A(m),h[7]=m,h[8]=s):s=h[8];let g=s;if(!r||0===r.length){let e;return h[9]===Symbol.for("react.memo_cache_sentinel")?(e=(0,n.jsx)(n.Fragment,{}),h[9]=e):e=h[9],e}if(h[10]!==o||h[11]!==r||h[12]!==a||h[13]!==d){let e;h[15]!==o||h[16]!==a||h[17]!==d?(e=(e,t)=>(0,n.jsx)(rh,{fontSize:o,padding:a,radius:d,children:e},t),h[15]=o,h[16]=a,h[17]=d,h[18]=e):e=h[18],u=r.map(e),h[10]=o,h[11]=r,h[12]=a,h[13]=d,h[14]=u}else u=h[14];return h[19]!==g||h[20]!==u?(f=(0,n.jsx)(tV,{as:"span",space:g,children:u}),h[19]=g,h[20]=u,h[21]=f):f=h[21],h[22]!==t||h[23]!==l||h[24]!==f?(p=(0,n.jsx)(rp,{"data-ui":"Hotkeys",...l,ref:t,children:f}),h[22]=t,h[23]=l,h[24]=f,h[25]=p):p=h[25],p});rm.displayName="ForwardRef(Hotkeys)";let rg=M("@sanity/ui/context/menu",null);function rb(e){return j(e)&&"true"!==e.getAttribute("data-disabled")||R(e)&&!e.disabled}function rv(e){return e.filter(rb)}let rw=[];function ry(){}let rx=(0,d.I4)(e9).withConfig({displayName:"StyledMenu",componentId:"sc-xt0tnv-0"})`outline:none;overflow:auto;`,r$=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C=(0,i.c)(49);if(C[0]!==e){let{children:t,focusFirst:n,focusLast:i,onClickOutside:a,onEscape:b,onItemClick:v,onItemSelect:w,onKeyDown:y,originElement:x,padding:$,registerElement:k,shouldFocus:S,space:j,...I}=e;r=t,d=a,l=b,c=v,s=w,u=y,f=x,m=$,p=k,o=S,g=j,h=I,C[0]=e,C[1]=o,C[2]=r,C[3]=d,C[4]=l,C[5]=c,C[6]=s,C[7]=u,C[8]=f,C[9]=p,C[10]=h,C[11]=m,C[12]=g}else o=C[1],r=C[2],d=C[3],l=C[4],c=C[5],s=C[6],u=C[7],f=C[8],p=C[9],h=C[10],m=C[11],g=C[12];let E=void 0===m?1:m,z=void 0===g?1:g,N=o??(e.focusFirst&&"first"||e.focusLast&&"last"||null),_=(0,a.useRef)(null);C[13]===Symbol.for("react.memo_cache_sentinel")?(b=()=>_.current,C[13]=b):b=C[13],(0,a.useImperativeHandle)(t,b);let{isTopLayer:A}=on();C[14]!==u||C[15]!==f||C[16]!==N?(v={onKeyDown:u,originElement:f,shouldFocus:N,rootElementRef:_},C[14]=u,C[15]=f,C[16]=N,C[17]=v):v=C[17];let{activeElement:W,activeIndex:H,handleItemMouseEnter:T,handleItemMouseLeave:L,handleKeyDown:M,mount:F}=function(e){let t,o,r,n,d,l,c,s,u,f=(0,i.c)(21),{onKeyDown:p,originElement:h,shouldFocus:m,rootElementRef:g}=e;f[0]===Symbol.for("react.memo_cache_sentinel")?(t=[],f[0]=t):t=f[0];let b=(0,a.useRef)(t),[v,w]=(0,a.useState)(-1),y=(0,a.useRef)(v),[x,$]=(0,a.useState)(null);f[1]===Symbol.for("react.memo_cache_sentinel")?(o=e=>{w(e),y.current=e,$(b.current[e]||null)},f[1]=o):o=f[1];let k=o;f[2]!==g?(r=(e,t)=>e?(-1===b.current.indexOf(e)&&(b.current.push(e),function(e,t){if(!e)return;let o=new WeakMap;for(let r of t)o.set(r,function(e,t){let o=[],r=t;for(;r!==e;){let t=r.parentElement;if(!t)break;let n=Array.from(t.childNodes).indexOf(r);if(o.unshift(n),t===e)break;r=t}return o}(e,r));t.sort((e,t)=>{let r=o.get(e)||rw,n=o.get(t)||rw,i=Math.max(r.length,n.length);for(let e=0;e<i;e+=1){let t=r[e]||-1,o=n[e]||-1;if(t!==o)return t-o}return 0})}(g.current,b.current)),t&&k(b.current.indexOf(e)),()=>{let t=b.current.indexOf(e);t>-1&&b.current.splice(t,1)}):ry,f[2]=g,f[3]=r):r=f[3];let S=r;f[4]!==p||f[5]!==h?(n=e=>{if("Tab"===e.key){h&&h.focus();return}if("Home"===e.key){e.preventDefault(),e.stopPropagation();let t=rv(b.current)[0];if(!t)return;k(b.current.indexOf(t));return}if("End"===e.key){e.preventDefault(),e.stopPropagation();let t=rv(b.current),o=t[t.length-1];if(!o)return;k(b.current.indexOf(o));return}if("ArrowUp"===e.key){e.preventDefault(),e.stopPropagation();let t=rv(b.current),o=t.length;if(0===o)return;let r=b.current[y.current],n=t.indexOf(r),i=t[n=(n-1+o)%o];k(b.current.indexOf(i));return}if("ArrowDown"===e.key){e.preventDefault(),e.stopPropagation();let t=rv(b.current),o=t.length;if(0===o)return;let r=b.current[y.current],n=t.indexOf(r),i=t[n=(n+1)%o];k(b.current.indexOf(i));return}p&&p(e)},f[4]=p,f[5]=h,f[6]=n):n=f[6];let j=n;f[7]===Symbol.for("react.memo_cache_sentinel")?(d=e=>{let t=e.currentTarget;k(b.current.indexOf(t))},f[7]=d):d=f[7];let I=d;f[8]!==g?(l=()=>{k(-2),g.current?.focus()},f[8]=g,f[9]=l):l=f[9];let R=l;return f[10]!==v||f[11]!==g||f[12]!==m?(c=()=>{if(!g.current)return;let e=requestAnimationFrame(()=>{if(-1===v){if("first"===m){let e=rv(b.current)[0];e&&k(b.current.indexOf(e))}if("last"===m){let e=rv(b.current),t=e[e.length-1];t&&k(b.current.indexOf(t))}return}(b.current[v]||null)?.focus()});return()=>cancelAnimationFrame(e)},s=[v,g,k,m],f[10]=v,f[11]=g,f[12]=m,f[13]=c,f[14]=s):(c=f[13],s=f[14]),(0,a.useEffect)(c,s),f[15]!==x||f[16]!==v||f[17]!==R||f[18]!==j||f[19]!==S?(u={activeElement:x,activeIndex:v,handleItemMouseEnter:I,handleItemMouseLeave:R,handleKeyDown:j,mount:S},f[15]=x,f[16]=v,f[17]=R,f[18]=j,f[19]=S,f[20]=u):u=f[20],u}(v),B=(0,a.useRef)(null);C[18]!==p?(w=e=>{B.current&&(B.current(),B.current=null),_.current=e,_.current&&p&&(B.current=p(_.current))},C[18]=p,C[19]=w):w=C[19];let J=w;C[20]!==H||C[21]!==s?(y=()=>{s&&s(H)},x=[H,s],C[20]=H,C[21]=s,C[22]=y,C[23]=x):(y=C[22],x=C[23]),(0,a.useEffect)(y,x),C[24]===Symbol.for("react.memo_cache_sentinel")?($=()=>[_.current],C[24]=$):$=C[24],tg(A&&d,$),C[25]!==A||C[26]!==l?(k=e=>{A&&"Escape"===e.key&&(e.stopPropagation(),l&&l())},C[25]=A,C[26]=l,C[27]=k):k=C[27],t$(k),C[28]!==W||C[29]!==T||C[30]!==L||C[31]!==F||C[32]!==d||C[33]!==l||C[34]!==c||C[35]!==p?(S={version:2,activeElement:W,mount:F,onClickOutside:d,onEscape:l,onItemClick:c,onItemMouseEnter:T,onItemMouseLeave:L,registerElement:p},C[28]=W,C[29]=T,C[30]=L,C[31]=F,C[32]=d,C[33]=l,C[34]=c,C[35]=p,C[36]=S):S=C[36];let O=S;return C[37]!==r||C[38]!==z?(j=(0,n.jsx)(oO,{space:z,children:r}),C[37]=r,C[38]=z,C[39]=j):j=C[39],C[40]!==M||C[41]!==J||C[42]!==E||C[43]!==h||C[44]!==j?(I=(0,n.jsx)(rx,{"data-ui":"Menu",...h,onKeyDown:M,padding:E,ref:J,role:"menu",tabIndex:-1,children:j}),C[40]=M,C[41]=J,C[42]=E,C[43]=h,C[44]=j,C[45]=I):I=C[45],C[46]!==I||C[47]!==O?(R=(0,n.jsx)(rg.Provider,{value:O,children:I}),C[46]=I,C[47]=O,C[48]=R):R=C[48],R});r$.displayName="ForwardRef(Menu)";let rk=d.I4.hr.withConfig({displayName:"MenuDivider",componentId:"sc-uhoxwu-0"})`height:1px;border:0;background:var(--card-hairline-soft-color);margin:0;`;rk.displayName="MenuDivider";let rS=(0,d.I4)(e9).withConfig({displayName:"Selectable",componentId:"sc-1w01ang-0"})(eJ,function(){return(0,d.AH)`
    background-color: inherit;
    color: inherit;

    &[data-as='button'] {
      -webkit-font-smoothing: inherit;
      appearance: none;
      outline: none;
      font: inherit;
      text-align: inherit;
      border: 0;
      width: -moz-available;
      width: -webkit-fill-available;
      width: stretch;
    }

    /* &:is(a) */
    &[data-as='a'] {
      text-decoration: none;
    }
  `},function(e){let{$tone:t}=e,{color:o,style:n}=(0,r.JW)(e.theme),i=o.selectable[t];return(0,d.AH)`
    ${tc(o,i.enabled)}

    background-color: var(--card-bg-color);
    color: var(--card-fg-color);
    outline: none;

    /* &:is(button) */
    &[data-as='button'] {
      &:disabled {
        ${tc(o,i.disabled)}
      }

      &:not(:disabled) {
        &[aria-pressed='true'] {
          ${tc(o,i.pressed)}
        }

        &[data-selected],
        &[aria-selected='true'] > & {
          ${tc(o,i.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${tc(o,i.hovered)}
            }

            &:active {
              ${tc(o,i.pressed)}
            }
          }
        }
      }
    }

    /* &:is(a) */
    &[data-as='a'] {
      &[data-disabled] {
        ${tc(o,i.disabled)}
      }

      &:not([data-disabled]) {
        &[data-pressed] {
          ${tc(o,i.pressed)}
        }

        &[data-selected] {
          ${tc(o,i.selected)}
        }

        @media (hover: hover) {
          &:not([data-selected]) {
            &[data-hovered],
            &:hover {
              ${tc(o,i.hovered)}
            }
            &:active {
              ${tc(o,i.pressed)}
            }
          }
        }
      }
    }

    ${n?.card?.root}
  `});function rj(){let e=(0,a.useContext)(rg);if(!e)throw Error("useMenu(): missing context value");if(!t5(e)||2!==e.version)throw Error("useMenu(): the context value is not compatible");return e}function rI(e){let t,o,r,d,l,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,O,P,D=(0,i.c)(81);D[0]!==e?({as:f,children:o,fontSize:p,icon:t,menu:r,onClick:d,padding:h,popover:l,radius:m,space:g,text:v,tone:b,...u}=e,D[0]=e,D[1]=t,D[2]=o,D[3]=r,D[4]=d,D[5]=l,D[6]=u,D[7]=f,D[8]=p,D[9]=h,D[10]=m,D[11]=g,D[12]=b,D[13]=v):(t=D[1],o=D[2],r=D[3],d=D[4],l=D[5],u=D[6],f=D[7],p=D[8],h=D[9],m=D[10],g=D[11],b=D[12],v=D[13]);let V=void 0===f?"button":f,G=void 0===p?1:p,Y=void 0===h?3:h,X=void 0===m?2:m,U=void 0===g?3:g,q=void 0===b?"default":b,K=rj(),{scheme:Z}=J(),{activeElement:Q,mount:ee,onClickOutside:et,onEscape:eo,onItemClick:er,onItemMouseEnter:en,registerElement:ei}=K,ea=en??K.onItemMouseEnter,[ed,el]=(0,a.useState)(null),[ec,es]=(0,a.useState)(!1),[eu,ef]=(0,a.useState)(null),ep=!!Q&&Q===ed,[eh,em]=(0,a.useState)(!1);D[14]!==ea?(w=e=>{em(!1),ea(e),es(!0)},D[14]=ea,D[15]=w):w=D[15];let eg=w;D[16]!==ed?(y=e=>{"ArrowLeft"===e.key&&(e.stopPropagation(),es(!1),requestAnimationFrame(()=>{ed?.focus()}))},D[16]=ed,D[17]=y):y=D[17];let eb=y;D[18]!==d?(x=e=>{d?.(e),ef("first"),es(!0)},D[18]=d,D[19]=x):x=D[19];let ev=x;D[20]!==er?($=()=>{es(!1),er?.()},D[20]=er,D[21]=$):$=D[21];let ew=$;D[22]===Symbol.for("react.memo_cache_sentinel")?(k=()=>em(!0),D[22]=k):k=D[22];let ey=k;D[23]!==ee||D[24]!==ed?(S=()=>ee(ed),j=[ee,ed],D[23]=ee,D[24]=ed,D[25]=S,D[26]=j):(S=D[25],j=D[26]),(0,a.useEffect)(S,j),D[27]!==ep?(I=()=>{ep||es(!1)},R=[ep],D[27]=ep,D[28]=I,D[29]=R):(I=D[28],R=D[29]),(0,a.useEffect)(I,R),D[30]!==ec?(C=()=>{ec||em(!1)},E=[ec],D[30]=ec,D[31]=C,D[32]=E):(C=D[31],E=D[32]),(0,a.useEffect)(C,E),D[33]!==eu?(z=()=>{if(!eu)return;let e=requestAnimationFrame(()=>ef(null));return()=>cancelAnimationFrame(e)},N=[eu],D[33]=eu,D[34]=z,D[35]=N):(z=D[34],N=D[35]),(0,a.useEffect)(z,N),D[36]!==o||D[37]!==ew||D[38]!==eb||D[39]!==r||D[40]!==et||D[41]!==eo||D[42]!==ei||D[43]!==eu?(_=(0,n.jsx)(r$,{...r,onClickOutside:et,onEscape:eo,onItemClick:ew,onKeyDown:eb,onMouseEnter:ey,registerElement:ei,shouldFocus:eu,children:o}),D[36]=o,D[37]=ew,D[38]=eb,D[39]=r,D[40]=et,D[41]=eo,D[42]=ei,D[43]=eu,D[44]=_):_=D[44];let ex=_;D[45]===Symbol.for("react.memo_cache_sentinel")?(W=e=>{let t=e.currentTarget;if(document.activeElement===t&&"ArrowRight"===e.key){ef("first"),es(!0),em(!0);return}},D[45]=W):W=D[45];let e$=W,ek="button"===V?eh:void 0,eS="button"!==V?eh:void 0,ej=!eh&&ep?"":void 0;D[46]!==X?(H=A(X),D[46]=X,D[47]=H):H=D[47];let eI="button"===V?"button":void 0;return D[48]!==t||D[49]!==G?(T=t&&(0,n.jsxs)(tt,{size:G,children:[(0,a.isValidElement)(t)&&t,(0,c.isValidElementType)(t)&&(0,n.jsx)(t,{})]}),D[48]=t,D[49]=G,D[50]=T):T=D[50],D[51]!==G||D[52]!==v?(L=(0,n.jsx)(e9,{flex:1,children:(0,n.jsx)(tt,{size:G,textOverflow:"ellipsis",weight:"medium",children:v})}),D[51]=G,D[52]=v,D[53]=L):L=D[53],D[54]===Symbol.for("react.memo_cache_sentinel")?(M=(0,n.jsx)(s.vKP,{}),D[54]=M):M=D[54],D[55]!==G?(F=(0,n.jsx)(tt,{size:G,children:M}),D[55]=G,D[56]=F):F=D[56],D[57]!==Y||D[58]!==U||D[59]!==T||D[60]!==L||D[61]!==F?(B=(0,n.jsxs)(ti,{gap:U,padding:Y,children:[T,L,F]}),D[57]=Y,D[58]=U,D[59]=T,D[60]=L,D[61]=F,D[62]=B):B=D[62],D[63]!==V||D[64]!==ev||D[65]!==eg||D[66]!==u||D[67]!==Z||D[68]!==ek||D[69]!==eS||D[70]!==ej||D[71]!==H||D[72]!==eI||D[73]!==B||D[74]!==q?(O=(0,n.jsx)(rS,{"data-as":V,"data-ui":"MenuGroup",forwardedAs:V,...u,"aria-pressed":ek,"data-pressed":eS,"data-selected":ej,$radius:H,$tone:q,$scheme:Z,onClick:ev,onKeyDown:e$,onMouseEnter:eg,ref:el,tabIndex:-1,type:eI,children:B}),D[63]=V,D[64]=ev,D[65]=eg,D[66]=u,D[67]=Z,D[68]=ek,D[69]=eS,D[70]=ej,D[71]=H,D[72]=eI,D[73]=B,D[74]=q,D[75]=O):O=D[75],D[76]!==ex||D[77]!==ec||D[78]!==l||D[79]!==O?(P=(0,n.jsx)(oC,{...l,content:ex,"data-ui":"MenuGroup__popover",open:ec,children:O}),D[76]=ex,D[77]=ec,D[78]=l,D[79]=O,D[80]=P):P=D[80],P}rS.displayName="Selectable",rI.displayName="MenuGroup";let rR=(0,a.forwardRef)(function(e,t){let o,r,d,l,s,u,f,p,h,m,g,b,v,w,y,x,$,k,S,j,I,R,C,E,z,N,_,W,H,T,L,M,F,B,O=(0,i.c)(75);O[0]!==e?({as:x,children:d,disabled:l,fontSize:$,hotkeys:s,icon:o,iconRight:r,onClick:u,padding:k,paddingX:g,paddingY:b,paddingTop:m,paddingRight:h,paddingBottom:f,paddingLeft:p,pressed:v,radius:S,selected:y,space:j,text:R,tone:I,...w}=e,O[0]=e,O[1]=o,O[2]=r,O[3]=d,O[4]=l,O[5]=s,O[6]=u,O[7]=f,O[8]=p,O[9]=h,O[10]=m,O[11]=g,O[12]=b,O[13]=v,O[14]=w,O[15]=y,O[16]=x,O[17]=$,O[18]=k,O[19]=S,O[20]=j,O[21]=I,O[22]=R):(o=O[1],r=O[2],d=O[3],l=O[4],s=O[5],u=O[6],f=O[7],p=O[8],h=O[9],m=O[10],g=O[11],b=O[12],v=O[13],w=O[14],y=O[15],x=O[16],$=O[17],k=O[18],S=O[19],j=O[20],I=O[21],R=O[22]);let P=void 0===x?"button":x,D=void 0===$?1:$,V=void 0===k?3:k,G=void 0===S?2:S,Y=void 0===j?3:j,X=void 0===I?"default":I,{scheme:U}=J(),q=rj(),{activeElement:K,mount:Z,onItemClick:Q,onItemMouseEnter:ee,onItemMouseLeave:et}=q,eo=ee??q.onItemMouseEnter,er=et??q.onItemMouseLeave,[en,ei]=(0,a.useState)(null),ea=!!K&&K===en,ed=(0,a.useRef)(null);O[23]===Symbol.for("react.memo_cache_sentinel")?(C=()=>ed.current,O[23]=C):C=O[23],(0,a.useImperativeHandle)(t,C),O[24]!==Z||O[25]!==en||O[26]!==y?(E=()=>Z(en,y),z=[Z,en,y],O[24]=Z,O[25]=en,O[26]=y,O[27]=E,O[28]=z):(E=O[27],z=O[28]),(0,a.useEffect)(E,z),O[29]!==l||O[30]!==u||O[31]!==Q?(N=e=>{l||(u&&u(e),Q&&Q())},O[29]=l,O[30]=u,O[31]=Q,O[32]=N):N=O[32];let el=N;O[33]!==V||O[34]!==f||O[35]!==p||O[36]!==h||O[37]!==m||O[38]!==g||O[39]!==b?(_={padding:V,paddingX:g,paddingY:b,paddingTop:m,paddingRight:h,paddingBottom:f,paddingLeft:p},O[33]=V,O[34]=f,O[35]=p,O[36]=h,O[37]=m,O[38]=g,O[39]=b,O[40]=_):_=O[40];let ec=_;O[41]!==D?(W=A(D).map(rC),O[41]=D,O[42]=W):W=O[42];let es=W;O[43]===Symbol.for("react.memo_cache_sentinel")?(H=e=>{ed.current=e,ei(e)},O[43]=H):H=O[43];let eu=H,ef="button"!==P&&v?"":void 0,ep=ea?"":void 0,eh=l?"":void 0;O[44]!==G?(T=A(G),O[44]=G,O[45]=T):T=O[45],O[46]===Symbol.for("react.memo_cache_sentinel")?(L=A(0),O[46]=L):L=O[46];let em=l?"default":X,eg="button"===P?"button":void 0;return O[47]!==o||O[48]!==r||O[49]!==D||O[50]!==s||O[51]!==es||O[52]!==ec||O[53]!==Y||O[54]!==R?(M=(o||R||r)&&(0,n.jsxs)(ti,{as:"span",gap:Y,align:"center",...ec,children:[o&&(0,n.jsxs)(tt,{size:D,children:[(0,a.isValidElement)(o)&&o,(0,c.isValidElementType)(o)&&(0,n.jsx)(o,{})]}),R&&(0,n.jsx)(e9,{flex:1,children:(0,n.jsx)(tt,{size:D,textOverflow:"ellipsis",weight:"medium",children:R})}),s&&(0,n.jsx)(rm,{fontSize:es,keys:s,style:{marginTop:-4,marginBottom:-4}}),r&&(0,n.jsxs)(tt,{size:D,children:[(0,a.isValidElement)(r)&&r,(0,c.isValidElementType)(r)&&(0,n.jsx)(r,{})]})]}),O[47]=o,O[48]=r,O[49]=D,O[50]=s,O[51]=es,O[52]=ec,O[53]=Y,O[54]=R,O[55]=M):M=O[55],O[56]!==d||O[57]!==ec?(F=d&&(0,n.jsx)(e9,{as:"span",...ec,children:d}),O[56]=d,O[57]=ec,O[58]=F):F=O[58],O[59]!==P||O[60]!==l||O[61]!==el||O[62]!==eo||O[63]!==er||O[64]!==w||O[65]!==U||O[66]!==ef||O[67]!==ep||O[68]!==eh||O[69]!==T||O[70]!==em||O[71]!==eg||O[72]!==M||O[73]!==F?(B=(0,n.jsxs)(rS,{"data-ui":"MenuItem",role:"menuitem",...w,"data-pressed":ef,"data-selected":ep,"data-disabled":eh,forwardedAs:P,$radius:T,$padding:L,$tone:em,$scheme:U,disabled:l,onClick:el,onMouseEnter:eo,onMouseLeave:er,ref:eu,tabIndex:-1,type:eg,children:[M,F]}),O[59]=P,O[60]=l,O[61]=el,O[62]=eo,O[63]=er,O[64]=w,O[65]=U,O[66]=ef,O[67]=ep,O[68]=eh,O[69]=T,O[70]=em,O[71]=eg,O[72]=M,O[73]=F,O[74]=B):B=O[74],B});function rC(e){return e-1}rR.displayName="ForwardRef(MenuItem)";let rE=(0,d.I4)(tp).withConfig({displayName:"CustomButton",componentId:"sc-1kns779-0"})`max-width:100%;`,rz=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s,u,f,p,h,m,g,b,v,w,y,x=(0,i.c)(30);x[0]!==e?({icon:r,id:d,focused:o,fontSize:p,label:l,onClick:c,onFocus:s,padding:h,selected:f,...u}=e,x[0]=e,x[1]=o,x[2]=r,x[3]=d,x[4]=l,x[5]=c,x[6]=s,x[7]=u,x[8]=f,x[9]=p,x[10]=h):(o=x[1],r=x[2],d=x[3],l=x[4],c=x[5],s=x[6],u=x[7],f=x[8],p=x[9],h=x[10]);let $=void 0===p?1:p,k=void 0===h?2:h,S=(0,a.useRef)(null),j=(0,a.useRef)(!1);x[11]===Symbol.for("react.memo_cache_sentinel")?(m=()=>S.current,x[11]=m):m=x[11],(0,a.useImperativeHandle)(t,m),x[12]===Symbol.for("react.memo_cache_sentinel")?(g=()=>{j.current=!1},x[12]=g):g=x[12];let I=g;x[13]!==s?(b=e=>{j.current=!0,s&&s(e)},x[13]=s,x[14]=b):b=x[14];let R=b;x[15]!==o?(v=()=>{o&&!j.current&&(S.current&&S.current.focus(),j.current=!0)},w=[o],x[15]=o,x[16]=v,x[17]=w):(v=x[16],w=x[17]),(0,a.useEffect)(v,w);let C=f?"true":"false",E=f?0:-1;return x[18]!==$||x[19]!==R||x[20]!==r||x[21]!==d||x[22]!==l||x[23]!==c||x[24]!==k||x[25]!==u||x[26]!==f||x[27]!==C||x[28]!==E?(y=(0,n.jsx)(rE,{"data-ui":"Tab",...u,"aria-selected":C,fontSize:$,icon:r,id:d,mode:"bleed",onClick:c,onBlur:I,onFocus:R,padding:k,ref:S,role:"tab",selected:f,tabIndex:E,text:l,type:"button"}),x[18]=$,x[19]=R,x[20]=r,x[21]=d,x[22]=l,x[23]=c,x[24]=k,x[25]=u,x[26]=f,x[27]=C,x[28]=E,x[29]=y):y=x[29],y});rz.displayName="ForwardRef(Tab)";let rN=(0,d.I4)(tV).withConfig({displayName:"CustomInline",componentId:"sc-5cm04m-0"})`& > div{display:inline-block;vertical-align:middle;max-width:100%;box-sizing:border-box;}`,r_=(0,a.forwardRef)(function(e,t){let o,r,d,l,c,s=(0,i.c)(15);s[0]!==e?({children:o,...r}=e,s[0]=e,s[1]=o,s[2]=r):(o=s[1],r=s[2]);let[u,f]=(0,a.useState)(-1);if(s[3]!==o||s[4]!==u){let e,t=a.Children.toArray(o).filter(a.isValidElement);s[6]!==u?(e=(e,t)=>(0,a.cloneElement)(e,{focused:u===t,key:t,onFocus:()=>f(t)}),s[6]=u,s[7]=e):e=s[7],d=t.map(e),s[3]=o,s[4]=u,s[5]=d}else d=s[5];let p=d,h=p.length;s[8]!==h?(l=e=>{"ArrowLeft"===e.key&&f(e=>(e+h-1)%h),"ArrowRight"===e.key&&f(e=>(e+1)%h)},s[8]=h,s[9]=l):l=s[9];let m=l;return s[10]!==m||s[11]!==t||s[12]!==r||s[13]!==p?(c=(0,n.jsx)(rN,{"data-ui":"TabList",...r,onKeyDown:m,ref:t,role:"tablist",children:p}),s[10]=m,s[11]=t,s[12]=r,s[13]=p,s[14]=c):c=s[14],c});r_.displayName="ForwardRef(TabList)"}}]);