"use strict";(self.webpackChunkxerck=self.webpackChunkxerck||[]).push([[6134],{"./components/ui/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>Button});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./app/globals.css");const variantStyles={normal:"bg-primary text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",secondary:"bg-secondary text-foreground hover:bg-secondary/90 hover:ring-2 hover:ring-secondary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",danger:"bg-destructive text-primary-foreground hover:ring-2 hover:ring-destructive hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",success:"bg-green-600 text-white hover:bg-green-700 hover:ring-2 hover:ring-green-600 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",info:"bg-blue-500 text-white hover:bg-blue-600 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",warning:"bg-amber-500 text-white hover:bg-amber-600 hover:ring-2 hover:ring-amber-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",ghost:"bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground text-sm transform-gpu transition-all duration-300 ease-out",link:"bg-transparent text-primary underline-offset-4 hover:underline text-sm transform-gpu transition-all duration-300 ease-out p-0 shadow-none",subtle:"bg-primary/10 text-primary hover:bg-primary/20 text-sm transform-gpu transition-all duration-300 ease-out"},sizeStyles={sm:"h-8 px-3 text-xs",md:"h-9 px-4 py-2 text-sm",lg:"h-11 px-6 py-2 text-base"},Button=({variant="normal",style,label,children,className,disabled=!1,size="md",...props})=>{const variantStyle=variantStyles[variant],sizeStyle=sizeStyles[size];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button",{type:"button",className:[style||variantStyle,sizeStyle,className,"cursor-pointer font-[Geist] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"].join(" "),disabled,...props,children:[label,children]})};Button.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'normal' | 'secondary' | 'outline' | 'danger' | 'success' | 'info' | 'warning' | 'ghost' | 'link' | 'subtle'",elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'success'"},{name:"literal",value:"'info'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'link'"},{name:"literal",value:"'subtle'"}]},description:"Which variant style to use",defaultValue:{value:"'normal'",computed:!1}},style:{required:!1,tsType:{name:"string"},description:"Custom style class (optional)"},label:{required:!1,tsType:{name:"string"},description:"Button contents"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the button is disabled",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Size of the button",defaultValue:{value:"'md'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./lib/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}},"./stories/Popover.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ControlledExample:()=>ControlledExample,Default:()=>Default,WithAlignOptions:()=>WithAlignOptions,WithArrow:()=>WithArrow,WithCustomTrigger:()=>WithCustomTrigger,WithDifferentOffsets:()=>WithDifferentOffsets,WithDifferentSides:()=>WithDifferentSides,__namedExportsOrder:()=>__namedExportsOrder,default:()=>Popover_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),react_dom=__webpack_require__("./node_modules/next/dist/compiled/react-dom/index.js"),utils=__webpack_require__("./lib/utils.ts"),ui_button=__webpack_require__("./components/ui/button.tsx");const PopoverContext=react.createContext(void 0);function usePopover(){const context=react.useContext(PopoverContext);if(!context)throw new Error("usePopover debe usarse dentro de un Popover");return context}const Popover=({children,defaultOpen=!1,open:controlledOpen,onOpenChange})=>{const[uncontrolledOpen,setUncontrolledOpen]=(0,react.useState)(defaultOpen),[align,setAlign]=(0,react.useState)("center"),[sideOffset,setSideOffset]=(0,react.useState)(4),triggerRef=react.useRef(null),contentRef=react.useRef(null),arrowRef=react.useRef(null),isControlled=void 0!==controlledOpen,open=isControlled?controlledOpen:uncontrolledOpen,setOpen=react.useCallback((value=>{if(isControlled||setUncontrolledOpen(value),onOpenChange){const newValue="function"==typeof value?value(isControlled?controlledOpen:uncontrolledOpen):value;onOpenChange(newValue)}}),[isControlled,controlledOpen,uncontrolledOpen,onOpenChange]);react.useEffect((()=>{if(!open)return;const handleOutsideClick=event=>{const target=event.target,triggerEl=triggerRef.current,contentEl=contentRef.current;(null==triggerEl?void 0:triggerEl.contains(target))||(null==contentEl?void 0:contentEl.contains(target))||setOpen(!1)},handleEscapeKey=event=>{"Escape"===event.key&&setOpen(!1)};return document.addEventListener("mousedown",handleOutsideClick),document.addEventListener("keydown",handleEscapeKey),()=>{document.removeEventListener("mousedown",handleOutsideClick),document.removeEventListener("keydown",handleEscapeKey)}}),[open,setOpen]);const contextValue=react.useMemo((()=>({open,setOpen,triggerRef,contentRef,arrowRef,align,sideOffset,onOpenChange})),[open,setOpen,align,sideOffset,onOpenChange]);return(0,jsx_runtime.jsx)(PopoverContext.Provider,{value:contextValue,children})};Popover.displayName="Popover";const PopoverTrigger=react.forwardRef((({asChild,children,...props},forwardedRef)=>{const{setOpen,triggerRef,open}=usePopover(),ref=react.useCallback((node=>{node&&(triggerRef.current=node,"function"==typeof forwardedRef?forwardedRef(node):forwardedRef&&(forwardedRef.current=node))}),[forwardedRef,triggerRef]),handleClick=e=>{props.onClick&&props.onClick(e),setOpen(!open)};return asChild&&react.isValidElement(children)?react.cloneElement(children,{ref,onClick:handleClick,"data-state":open?"open":"closed",...props,...children.props}):(0,jsx_runtime.jsx)(ui_button.$,{ref,type:"button",onClick:handleClick,"data-state":open?"open":"closed",...props,children})}));PopoverTrigger.displayName="PopoverTrigger";const PopoverAnchor=react.forwardRef((({asChild,children,...props},forwardedRef)=>{const{triggerRef}=usePopover(),ref=react.useCallback((node=>{node&&(triggerRef.current=node,"function"==typeof forwardedRef?forwardedRef(node):forwardedRef&&(forwardedRef.current=node))}),[forwardedRef,triggerRef]);return asChild&&react.isValidElement(children)?react.cloneElement(children,{ref,...props,...children.props}):(0,jsx_runtime.jsx)("div",{ref,...props,children})}));PopoverAnchor.displayName="PopoverAnchor";const PopoverContent=react.forwardRef((({className,children,align="center",sideOffset=4,alignOffset=0,forceMount,showArrow=!1,arrowClassName,side="bottom",...props},forwardedRef)=>{const{open,contentRef,triggerRef,arrowRef}=usePopover(),[position,setPosition]=(0,react.useState)({top:0,left:0}),[arrowPosition,setArrowPosition]=(0,react.useState)({top:0,left:0}),[mounted,setMounted]=(0,react.useState)(!1),updatePosition=react.useCallback((()=>{if(!triggerRef.current||!contentRef.current)return;const triggerRect=triggerRef.current.getBoundingClientRect(),contentRect=contentRef.current.getBoundingClientRect(),{scrollX,scrollY}=window;let top=0,left=0;switch(side){case"bottom":top=triggerRect.bottom+sideOffset,"center"===align?left=triggerRect.left+triggerRect.width/2-contentRect.width/2+alignOffset:"start"===align?left=triggerRect.left+alignOffset:"end"===align&&(left=triggerRect.right-contentRect.width+alignOffset);break;case"top":top=triggerRect.top-contentRect.height-sideOffset,"center"===align?left=triggerRect.left+triggerRect.width/2-contentRect.width/2+alignOffset:"start"===align?left=triggerRect.left+alignOffset:"end"===align&&(left=triggerRect.right-contentRect.width+alignOffset);break;case"left":left=triggerRect.left-contentRect.width-sideOffset,"center"===align?top=triggerRect.top+triggerRect.height/2-contentRect.height/2+alignOffset:"start"===align?top=triggerRect.top+alignOffset:"end"===align&&(top=triggerRect.bottom-contentRect.height+alignOffset);break;case"right":left=triggerRect.right+sideOffset,"center"===align?top=triggerRect.top+triggerRect.height/2-contentRect.height/2+alignOffset:"start"===align?top=triggerRect.top+alignOffset:"end"===align&&(top=triggerRect.bottom-contentRect.height+alignOffset)}const viewportWidth=window.innerWidth,viewportHeight=window.innerHeight;if(left<10?left=10:left+contentRect.width>viewportWidth-10&&(left=viewportWidth-contentRect.width-10),top<10?top=10:top+contentRect.height>viewportHeight-10&&(top=viewportHeight-contentRect.height-10),setPosition({top:top+scrollY,left:left+scrollX}),showArrow&&arrowRef.current){let arrowTop=0,arrowLeft=0;const arrowSize=8;switch(side){case"bottom":arrowTop=-arrowSize,arrowLeft=triggerRect.left+triggerRect.width/2-left;break;case"top":arrowTop=contentRect.height,arrowLeft=triggerRect.left+triggerRect.width/2-left;break;case"left":arrowTop=triggerRect.top+triggerRect.height/2-top,arrowLeft=contentRect.width;break;case"right":arrowTop=triggerRect.top+triggerRect.height/2-top,arrowLeft=-arrowSize}setArrowPosition({top:arrowTop,left:arrowLeft})}}),[triggerRef,contentRef,arrowRef,side,align,sideOffset,alignOffset,showArrow]),ref=react.useCallback((node=>{node&&(contentRef.current=node,"function"==typeof forwardedRef?forwardedRef(node):forwardedRef&&(forwardedRef.current=node))}),[forwardedRef,contentRef]);if(react.useEffect((()=>(setMounted(!0),()=>setMounted(!1))),[]),react.useEffect((()=>{if(!open||!mounted)return;updatePosition(),window.addEventListener("resize",updatePosition),window.addEventListener("scroll",updatePosition);const intervalId=setInterval(updatePosition,200);return()=>{window.removeEventListener("resize",updatePosition),window.removeEventListener("scroll",updatePosition),clearInterval(intervalId)}}),[open,mounted,updatePosition]),!mounted||!open&&!forceMount)return null;const transformOrigin={top:"bottom",right:"left",bottom:"top",left:"right"}[side],content=(0,jsx_runtime.jsxs)("div",{ref,style:{position:"fixed",top:position.top,left:position.left,zIndex:50,width:"max-content",maxWidth:"calc(100vw - 20px)",transformOrigin,opacity:open?1:0,transform:`scale(${open?1:.95})`,transition:"opacity 0.2s ease, transform 0.2s ease"},"data-state":open?"open":"closed","data-side":side,className:(0,utils.cn)("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0","data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95","data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",className),...props,children:[children,showArrow&&(0,jsx_runtime.jsx)("div",{ref:arrowRef,className:(0,utils.cn)("absolute rotate-45 w-2 h-2 bg-popover border","bottom"===side?"border-t border-l":"","top"===side?"border-b border-r":"","left"===side?"border-r border-b":"","right"===side?"border-l border-t":"",arrowClassName),style:{top:arrowPosition.top,left:arrowPosition.left,borderTopColor:"bottom"===side?"inherit":"transparent",borderRightColor:"left"===side?"inherit":"transparent",borderBottomColor:"top"===side?"inherit":"transparent",borderLeftColor:"right"===side?"inherit":"transparent"}})]});return(0,react_dom.createPortal)(content,document.body)}));PopoverContent.displayName="PopoverContent",Popover.__docgenInfo={description:"",methods:[],displayName:"Popover",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},defaultOpen:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:""},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}},PopoverTrigger.__docgenInfo={description:"",methods:[],displayName:"PopoverTrigger",props:{asChild:{required:!1,tsType:{name:"boolean"},description:""}}},PopoverContent.__docgenInfo={description:"",methods:[],displayName:"PopoverContent",props:{align:{required:!1,tsType:{name:"union",raw:'"start" | "center" | "end"',elements:[{name:"literal",value:'"start"'},{name:"literal",value:'"center"'},{name:"literal",value:'"end"'}]},description:"",defaultValue:{value:'"center"',computed:!1}},sideOffset:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}},alignOffset:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"0",computed:!1}},avoidCollisions:{required:!1,tsType:{name:"boolean"},description:""},hideWhenDetached:{required:!1,tsType:{name:"boolean"},description:""},forceMount:{required:!1,tsType:{name:"boolean"},description:""},showArrow:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},arrowClassName:{required:!1,tsType:{name:"string"},description:""},side:{required:!1,tsType:{name:"union",raw:'"top" | "right" | "bottom" | "left"',elements:[{name:"literal",value:'"top"'},{name:"literal",value:'"right"'},{name:"literal",value:'"bottom"'},{name:"literal",value:'"left"'}]},description:"",defaultValue:{value:'"bottom"',computed:!1}}}},PopoverAnchor.__docgenInfo={description:"",methods:[],displayName:"PopoverAnchor",props:{asChild:{required:!1,tsType:{name:"boolean"},description:""}}};const Popover_stories={title:"Components/Popover",component:Popover,parameters:{layout:"centered"},tags:["autodocs"]},Default={render:()=>(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Abrir Popover"}),(0,jsx_runtime.jsx)(PopoverContent,{children:(0,jsx_runtime.jsxs)("div",{className:"grid gap-4",children:[(0,jsx_runtime.jsxs)("div",{className:"space-y-2",children:[(0,jsx_runtime.jsx)("h4",{className:"font-medium leading-none",children:"Dimensiones"}),(0,jsx_runtime.jsx)("p",{className:"text-sm text-muted-foreground",children:"Establece las dimensiones para el objeto."})]}),(0,jsx_runtime.jsxs)("div",{className:"grid gap-2",children:[(0,jsx_runtime.jsxs)("div",{className:"grid grid-cols-3 items-center gap-4",children:[(0,jsx_runtime.jsx)("label",{htmlFor:"width",className:"text-sm",children:"Ancho"}),(0,jsx_runtime.jsx)("input",{id:"width",defaultValue:"100%",className:"col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"})]}),(0,jsx_runtime.jsxs)("div",{className:"grid grid-cols-3 items-center gap-4",children:[(0,jsx_runtime.jsx)("label",{htmlFor:"height",className:"text-sm",children:"Alto"}),(0,jsx_runtime.jsx)("input",{id:"height",defaultValue:"25px",className:"col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"})]})]})]})})]})},WithAlignOptions={render:()=>(0,jsx_runtime.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Alineación: start"}),(0,jsx_runtime.jsx)(PopoverContent,{align:"start",className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover está alineado al inicio del trigger."})})]}),(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Alineación: center"}),(0,jsx_runtime.jsx)(PopoverContent,{align:"center",className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover está alineado al centro del trigger."})})]}),(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Alineación: end"}),(0,jsx_runtime.jsx)(PopoverContent,{align:"end",className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover está alineado al final del trigger."})})]})]})},WithDifferentSides={render:()=>(0,jsx_runtime.jsxs)("div",{className:"flex flex-col items-center space-y-8 py-20",children:[(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Lado: bottom (default)"}),(0,jsx_runtime.jsx)(PopoverContent,{side:"bottom",showArrow:!0,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover aparece debajo del trigger."})})]}),(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Lado: top"}),(0,jsx_runtime.jsx)(PopoverContent,{side:"top",showArrow:!0,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover aparece encima del trigger."})})]}),(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Lado: left"}),(0,jsx_runtime.jsx)(PopoverContent,{side:"left",showArrow:!0,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover aparece a la izquierda del trigger."})})]}),(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Lado: right"}),(0,jsx_runtime.jsx)(PopoverContent,{side:"right",showArrow:!0,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover aparece a la derecha del trigger."})})]})]})},WithDifferentOffsets={render:()=>(0,jsx_runtime.jsx)("div",{className:"flex flex-col items-center space-y-4",children:(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Offset: 4px (default)"}),(0,jsx_runtime.jsx)(PopoverContent,{sideOffset:4,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover tiene un offset de 4px (valor por defecto)."})}),(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Offset: 15px"}),(0,jsx_runtime.jsx)(PopoverContent,{sideOffset:15,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover tiene un offset de 15px."})}),(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Offset: 30px"}),(0,jsx_runtime.jsx)(PopoverContent,{sideOffset:30,className:"w-60",children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover tiene un offset de 30px."})})]})})},WithArrow={render:()=>(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Popover con flecha"}),(0,jsx_runtime.jsx)(PopoverContent,{showArrow:!0,children:(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este popover muestra una flecha que apunta hacia el trigger."})})]})},WithCustomTrigger={render:()=>(0,jsx_runtime.jsxs)(Popover,{children:[(0,jsx_runtime.jsx)(PopoverTrigger,{asChild:!0,children:(0,jsx_runtime.jsx)("button",{className:"inline-flex items-center justify-center rounded-full w-10 h-10 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",children:"i"})}),(0,jsx_runtime.jsx)(PopoverContent,{showArrow:!0,className:"w-80",children:(0,jsx_runtime.jsxs)("div",{className:"space-y-2",children:[(0,jsx_runtime.jsx)("h4",{className:"font-medium leading-none",children:"Información importante"}),(0,jsx_runtime.jsx)("p",{className:"text-sm text-muted-foreground",children:'Esta información es esencial para entender cómo funciona este componente. El botón de trigger es personalizado usando "asChild".'})]})})]})},ControlledExample={render:()=>{const[open,setOpen]=(0,react.useState)(!1);return(0,jsx_runtime.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,jsx_runtime.jsxs)("div",{className:"pb-4 space-x-2",children:[(0,jsx_runtime.jsx)("button",{onClick:()=>setOpen(!0),className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Abrir Popover"}),(0,jsx_runtime.jsx)("button",{onClick:()=>setOpen(!1),className:"bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md",children:"Cerrar Popover"})]}),(0,jsx_runtime.jsxs)(Popover,{open,onOpenChange:setOpen,children:[(0,jsx_runtime.jsx)(PopoverTrigger,{className:"bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md",children:"Popover Controlado"}),(0,jsx_runtime.jsxs)(PopoverContent,{children:[(0,jsx_runtime.jsx)("p",{className:"text-sm",children:"Este es un popover controlado, se abre y cierra con botones externos."}),(0,jsx_runtime.jsx)("div",{className:"mt-4 flex justify-end",children:(0,jsx_runtime.jsx)("button",{onClick:()=>setOpen(!1),className:"bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 py-1 rounded-md text-sm",children:"Cerrar"})})]})]})]})}},__namedExportsOrder=["Default","WithAlignOptions","WithDifferentSides","WithDifferentOffsets","WithArrow","WithCustomTrigger","ControlledExample"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => <Popover>\r\n      <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n        Abrir Popover\r\n      </PopoverTrigger>\r\n      <PopoverContent>\r\n        <div className="grid gap-4">\r\n          <div className="space-y-2">\r\n            <h4 className="font-medium leading-none">Dimensiones</h4>\r\n            <p className="text-sm text-muted-foreground">\r\n              Establece las dimensiones para el objeto.\r\n            </p>\r\n          </div>\r\n          <div className="grid gap-2">\r\n            <div className="grid grid-cols-3 items-center gap-4">\r\n              <label htmlFor="width" className="text-sm">\r\n                Ancho\r\n              </label>\r\n              <input id="width" defaultValue="100%" className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />\r\n            </div>\r\n            <div className="grid grid-cols-3 items-center gap-4">\r\n              <label htmlFor="height" className="text-sm">\r\n                Alto\r\n              </label>\r\n              <input id="height" defaultValue="25px" className="col-span-2 h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" />\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </PopoverContent>\r\n    </Popover>\n}',...Default.parameters?.docs?.source}}},WithAlignOptions.parameters={...WithAlignOptions.parameters,docs:{...WithAlignOptions.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col items-center space-y-4">\r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Alineación: start\r\n        </PopoverTrigger>\r\n        <PopoverContent align="start" className="w-60">\r\n          <p className="text-sm">\r\n            Este popover está alineado al inicio del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n      \r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Alineación: center\r\n        </PopoverTrigger>\r\n        <PopoverContent align="center" className="w-60">\r\n          <p className="text-sm">\r\n            Este popover está alineado al centro del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n      \r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Alineación: end\r\n        </PopoverTrigger>\r\n        <PopoverContent align="end" className="w-60">\r\n          <p className="text-sm">\r\n            Este popover está alineado al final del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n    </div>\n}',...WithAlignOptions.parameters?.docs?.source}}},WithDifferentSides.parameters={...WithDifferentSides.parameters,docs:{...WithDifferentSides.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col items-center space-y-8 py-20">\r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Lado: bottom (default)\r\n        </PopoverTrigger>\r\n        <PopoverContent side="bottom" showArrow className="w-60">\r\n          <p className="text-sm">\r\n            Este popover aparece debajo del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n      \r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Lado: top\r\n        </PopoverTrigger>\r\n        <PopoverContent side="top" showArrow className="w-60">\r\n          <p className="text-sm">\r\n            Este popover aparece encima del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n      \r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Lado: left\r\n        </PopoverTrigger>\r\n        <PopoverContent side="left" showArrow className="w-60">\r\n          <p className="text-sm">\r\n            Este popover aparece a la izquierda del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n      \r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Lado: right\r\n        </PopoverTrigger>\r\n        <PopoverContent side="right" showArrow className="w-60">\r\n          <p className="text-sm">\r\n            Este popover aparece a la derecha del trigger.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n    </div>\n}',...WithDifferentSides.parameters?.docs?.source}}},WithDifferentOffsets.parameters={...WithDifferentOffsets.parameters,docs:{...WithDifferentOffsets.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col items-center space-y-4">\r\n      <Popover>\r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Offset: 4px (default)\r\n        </PopoverTrigger>\r\n        <PopoverContent sideOffset={4} className="w-60">\r\n          <p className="text-sm">\r\n            Este popover tiene un offset de 4px (valor por defecto).\r\n          </p>\r\n        </PopoverContent> \r\n       \r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Offset: 15px\r\n        </PopoverTrigger>\r\n        <PopoverContent sideOffset={15} className="w-60">\r\n          <p className="text-sm">\r\n            Este popover tiene un offset de 15px.\r\n          </p>\r\n        </PopoverContent> \r\n       \r\n        <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n          Offset: 30px\r\n        </PopoverTrigger>\r\n        <PopoverContent sideOffset={30} className="w-60">\r\n          <p className="text-sm">\r\n            Este popover tiene un offset de 30px.\r\n          </p>\r\n        </PopoverContent>\r\n      </Popover>\r\n    </div>\n}',...WithDifferentOffsets.parameters?.docs?.source}}},WithArrow.parameters={...WithArrow.parameters,docs:{...WithArrow.parameters?.docs,source:{originalSource:'{\n  render: () => <Popover>\r\n      <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n        Popover con flecha\r\n      </PopoverTrigger>\r\n      <PopoverContent showArrow>\r\n        <p className="text-sm">\r\n          Este popover muestra una flecha que apunta hacia el trigger.\r\n        </p>\r\n      </PopoverContent>\r\n    </Popover>\n}',...WithArrow.parameters?.docs?.source}}},WithCustomTrigger.parameters={...WithCustomTrigger.parameters,docs:{...WithCustomTrigger.parameters?.docs,source:{originalSource:'{\n  render: () => <Popover>\r\n      <PopoverTrigger asChild>\r\n        <button className="inline-flex items-center justify-center rounded-full w-10 h-10 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">\r\n          i\r\n        </button>\r\n      </PopoverTrigger>\r\n      <PopoverContent showArrow className="w-80">\r\n        <div className="space-y-2">\r\n          <h4 className="font-medium leading-none">Información importante</h4>\r\n          <p className="text-sm text-muted-foreground">\r\n            Esta información es esencial para entender cómo funciona este componente.\r\n            El botón de trigger es personalizado usando "asChild".\r\n          </p>\r\n        </div>\r\n      </PopoverContent>\r\n    </Popover>\n}',...WithCustomTrigger.parameters?.docs?.source}}},ControlledExample.parameters={...ControlledExample.parameters,docs:{...ControlledExample.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [open, setOpen] = useState(false);\n    return <div className="flex flex-col items-center space-y-4">\r\n        <div className="pb-4 space-x-2">\r\n          <button onClick={() => setOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n            Abrir Popover\r\n          </button>\r\n          <button onClick={() => setOpen(false)} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 rounded-md">\r\n            Cerrar Popover\r\n          </button>\r\n        </div>\r\n        \r\n        <Popover open={open} onOpenChange={setOpen}> \r\n          <PopoverTrigger className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">\r\n            Popover Controlado\r\n          </PopoverTrigger>\r\n          <PopoverContent>\r\n            <p className="text-sm">\r\n              Este es un popover controlado, se abre y cierra con botones externos.\r\n            </p>\r\n            <div className="mt-4 flex justify-end">\r\n              <button onClick={() => setOpen(false)} className="bg-secondary text-secondary-foreground hover:bg-secondary/80 h-8 px-3 py-1 rounded-md text-sm">\r\n                Cerrar\r\n              </button>\r\n            </div>\r\n          </PopoverContent>\r\n        </Popover>\r\n      </div>;\n  }\n}',...ControlledExample.parameters?.docs?.source}}}}}]);