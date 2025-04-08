/*! For license information please see RadioGroup-stories.8b2df41c.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkxerck=self.webpackChunkxerck||[]).push([[177],{"./lib/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}},"./node_modules/lucide-react/dist/esm/createLucideIcon.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>createLucideIcon});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const mergeClasses=(...classes)=>classes.filter(((className,index,array)=>Boolean(className)&&""!==className.trim()&&array.indexOf(className)===index)).join(" ").trim();var defaultAttributes={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Icon=(0,react.forwardRef)((({color="currentColor",size=24,strokeWidth=2,absoluteStrokeWidth,className="",children,iconNode,...rest},ref)=>(0,react.createElement)("svg",{ref,...defaultAttributes,width:size,height:size,stroke:color,strokeWidth:absoluteStrokeWidth?24*Number(strokeWidth)/Number(size):strokeWidth,className:mergeClasses("lucide",className),...rest},[...iconNode.map((([tag,attrs])=>(0,react.createElement)(tag,attrs))),...Array.isArray(children)?children:[children]]))),createLucideIcon=(iconName,iconNode)=>{const Component=(0,react.forwardRef)((({className,...props},ref)=>{return(0,react.createElement)(Icon,{ref,iconNode,className:mergeClasses(`lucide-${string=iconName,string.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,className),...props});var string}));return Component.displayName=`${iconName}`,Component}},"./node_modules/lucide-react/dist/esm/icons/circle.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>Circle});const Circle=(0,__webpack_require__("./node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]])},"./stories/RadioGroup.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomStyles:()=>CustomStyles,Default:()=>Default,Disabled:()=>Disabled,Horizontal:()=>Horizontal,WithChildLabels:()=>WithChildLabels,WithForm:()=>WithForm,__namedExportsOrder:()=>__namedExportsOrder,default:()=>RadioGroup_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),circle=__webpack_require__("./node_modules/lucide-react/dist/esm/icons/circle.js"),utils=__webpack_require__("./lib/utils.ts");const RadioGroupContext=react.createContext({name:""}),RadioGroup=react.forwardRef((({className,value,onValueChange,name=react.useId(),disabled,...props},ref)=>{const contextValue=react.useMemo((()=>({name,value,onValueChange,disabled})),[name,value,onValueChange,disabled]);return(0,jsx_runtime.jsx)(RadioGroupContext.Provider,{value:contextValue,children:(0,jsx_runtime.jsx)("div",{role:"radiogroup",ref,className:(0,utils.cn)("grid gap-2",className),...props})})}));RadioGroup.displayName="RadioGroup";const RadioGroupItem=react.forwardRef((({className,value,disabled,...props},ref)=>{const{name,value:groupValue,onValueChange,disabled:groupDisabled}=react.useContext(RadioGroupContext),itemDisabled=disabled||groupDisabled,checked=value===groupValue,inputRef=react.useRef(null);return(0,jsx_runtime.jsxs)("label",{ref,className:(0,utils.cn)("flex items-center gap-2 cursor-pointer",itemDisabled&&"cursor-not-allowed opacity-50",className),children:[(0,jsx_runtime.jsxs)("div",{className:"relative flex items-center",children:[(0,jsx_runtime.jsx)("input",{ref:inputRef,type:"radio",name,value,checked,disabled:itemDisabled,onChange:event=>{event.target.checked&&(null==onValueChange||onValueChange(value))},className:"sr-only",...props}),(0,jsx_runtime.jsx)("div",{className:(0,utils.cn)("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow","focus-within:ring-1 focus-within:ring-ring outline-none","disabled:cursor-not-allowed disabled:opacity-50",checked&&"border-primary"),children:checked&&(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-center",children:(0,jsx_runtime.jsx)(circle.A,{className:"h-3.5 w-3.5 fill-primary"})})})]}),props.children&&(0,jsx_runtime.jsx)("span",{className:(0,utils.cn)("text-sm",itemDisabled&&"opacity-70"),children:props.children})]})}));RadioGroupItem.displayName="RadioGroupItem",RadioGroup.__docgenInfo={description:"",methods:[],displayName:"RadioGroup",props:{value:{required:!1,tsType:{name:"string"},description:"El valor seleccionado en el grupo de radio"},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Función que se llama cuando cambia el valor seleccionado"},name:{required:!1,tsType:{name:"string"},description:"Nombre único para el grupo de radio",defaultValue:{value:"React.useId()",computed:!0}},disabled:{required:!1,tsType:{name:"boolean"},description:"Si el grupo de radio está deshabilitado"},required:{required:!1,tsType:{name:"boolean"},description:"Si el grupo de radio es obligatorio"}}},RadioGroupItem.__docgenInfo={description:"",methods:[],displayName:"RadioGroupItem",props:{value:{required:!0,tsType:{name:"string"},description:"El valor del ítem de radio"},disabled:{required:!1,tsType:{name:"boolean"},description:"Si el ítem de radio está deshabilitado"}},composes:["Omit"]};const RadioGroup_stories={title:"Components/RadioGroup",component:RadioGroup,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:"text",description:"El valor seleccionado en el grupo de radio"},disabled:{control:"boolean",description:"Si el grupo de radio está deshabilitado"},required:{control:"boolean",description:"Si el grupo de radio es obligatorio"}}},Default={render:()=>{const[value,setValue]=(0,react.useState)("default");return(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,children:[(0,jsx_runtime.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"default",id:"r1"}),(0,jsx_runtime.jsx)("label",{htmlFor:"r1",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Default"})]}),(0,jsx_runtime.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"comfortable",id:"r2"}),(0,jsx_runtime.jsx)("label",{htmlFor:"r2",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Comfortable"})]}),(0,jsx_runtime.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"compact",id:"r3"}),(0,jsx_runtime.jsx)("label",{htmlFor:"r3",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Compact"})]})]})}},WithChildLabels={render:()=>{const[value,setValue]=(0,react.useState)("dog");return(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"dog",children:"Perro"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"cat",children:"Gato"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"rabbit",children:"Conejo"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"hamster",children:"Hámster"})]})}},Horizontal={render:()=>{const[value,setValue]=(0,react.useState)("one");return(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,className:"flex flex-row space-x-4",children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"one",children:"Opción 1"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"two",children:"Opción 2"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"three",children:"Opción 3"})]})}},Disabled={render:()=>{const[value,setValue]=(0,react.useState)("no");return(0,jsx_runtime.jsxs)("div",{className:"space-y-6",children:[(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"yes",children:"Habilitado"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"no",children:"También habilitado"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"maybe",disabled:!0,children:"Deshabilitado"})]}),(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,disabled:!0,children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"all-1",children:"Todo el grupo deshabilitado 1"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"all-2",children:"Todo el grupo deshabilitado 2"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"all-3",children:"Todo el grupo deshabilitado 3"})]})]})}},WithForm={render:()=>{const[formData,setFormData]=(0,react.useState)({plan:"basic",notifications:"all"}),handleChange=field=>value=>{setFormData((prev=>({...prev,[field]:value})))};return(0,jsx_runtime.jsxs)("form",{onSubmit:e=>{e.preventDefault(),alert(`Formulario enviado con: ${JSON.stringify(formData,null,2)}`)},className:"w-full max-w-md space-y-6",children:[(0,jsx_runtime.jsxs)("div",{className:"space-y-4",children:[(0,jsx_runtime.jsx)("h3",{className:"text-lg font-medium",children:"Plan de suscripción"}),(0,jsx_runtime.jsxs)(RadioGroup,{name:"plan",value:formData.plan,onValueChange:handleChange("plan"),className:"space-y-3",children:[(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-between rounded-lg border p-4",children:(0,jsx_runtime.jsx)(RadioGroupItem,{value:"basic",children:"Plan Básico - $9.99/mes"})}),(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-between rounded-lg border p-4",children:(0,jsx_runtime.jsx)(RadioGroupItem,{value:"pro",children:"Plan Pro - $19.99/mes"})}),(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-between rounded-lg border p-4",children:(0,jsx_runtime.jsx)(RadioGroupItem,{value:"enterprise",children:"Plan Empresarial - $49.99/mes"})})]})]}),(0,jsx_runtime.jsxs)("div",{className:"space-y-4",children:[(0,jsx_runtime.jsx)("h3",{className:"text-lg font-medium",children:"Preferencias de notificación"}),(0,jsx_runtime.jsxs)(RadioGroup,{name:"notifications",value:formData.notifications,onValueChange:handleChange("notifications"),children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"all",children:"Todas las notificaciones"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"important",children:"Solo notificaciones importantes"}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"none",children:"Sin notificaciones"})]})]}),(0,jsx_runtime.jsx)("button",{type:"submit",className:"rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90",children:"Guardar preferencias"})]})}},CustomStyles={render:()=>{const[value,setValue]=(0,react.useState)("blue");return(0,jsx_runtime.jsxs)(RadioGroup,{value,onValueChange:setValue,className:"flex flex-col space-y-3",children:[(0,jsx_runtime.jsx)(RadioGroupItem,{value:"red",className:"[&>div]:border-red-500 [&_svg]:fill-red-500",children:(0,jsx_runtime.jsx)("span",{className:"ml-2 text-red-500 font-medium",children:"Rojo"})}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"blue",className:"[&>div]:border-blue-500 [&_svg]:fill-blue-500",children:(0,jsx_runtime.jsx)("span",{className:"ml-2 text-blue-500 font-medium",children:"Azul"})}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"green",className:"[&>div]:border-green-500 [&_svg]:fill-green-500",children:(0,jsx_runtime.jsx)("span",{className:"ml-2 text-green-500 font-medium",children:"Verde"})}),(0,jsx_runtime.jsx)(RadioGroupItem,{value:"purple",className:"[&>div]:border-purple-500 [&_svg]:fill-purple-500",children:(0,jsx_runtime.jsx)("span",{className:"ml-2 text-purple-500 font-medium",children:"Púrpura"})})]})}},__namedExportsOrder=["Default","WithChildLabels","Horizontal","Disabled","WithForm","CustomStyles"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [value, setValue] = useState("default");\n    return <RadioGroup value={value} onValueChange={setValue}>\r\n        <div className="flex items-center space-x-2">\r\n          <RadioGroupItem value="default" id="r1" />\r\n          <label htmlFor="r1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">\r\n            Default\r\n          </label>\r\n        </div>\r\n        <div className="flex items-center space-x-2">\r\n          <RadioGroupItem value="comfortable" id="r2" />\r\n          <label htmlFor="r2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">\r\n            Comfortable\r\n          </label>\r\n        </div>\r\n        <div className="flex items-center space-x-2">\r\n          <RadioGroupItem value="compact" id="r3" />\r\n          <label htmlFor="r3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">\r\n            Compact\r\n          </label>\r\n        </div>\r\n      </RadioGroup>;\n  }\n}',...Default.parameters?.docs?.source}}},WithChildLabels.parameters={...WithChildLabels.parameters,docs:{...WithChildLabels.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [value, setValue] = useState("dog");\n    return <RadioGroup value={value} onValueChange={setValue}>\r\n        <RadioGroupItem value="dog">Perro</RadioGroupItem>\r\n        <RadioGroupItem value="cat">Gato</RadioGroupItem>\r\n        <RadioGroupItem value="rabbit">Conejo</RadioGroupItem>\r\n        <RadioGroupItem value="hamster">Hámster</RadioGroupItem>\r\n      </RadioGroup>;\n  }\n}',...WithChildLabels.parameters?.docs?.source}}},Horizontal.parameters={...Horizontal.parameters,docs:{...Horizontal.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [value, setValue] = useState("one");\n    return <RadioGroup value={value} onValueChange={setValue} className="flex flex-row space-x-4">\r\n        <RadioGroupItem value="one">Opción 1</RadioGroupItem>\r\n        <RadioGroupItem value="two">Opción 2</RadioGroupItem>\r\n        <RadioGroupItem value="three">Opción 3</RadioGroupItem>\r\n      </RadioGroup>;\n  }\n}',...Horizontal.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [value, setValue] = useState("no");\n    return <div className="space-y-6">\r\n        <RadioGroup value={value} onValueChange={setValue}>\r\n          <RadioGroupItem value="yes">Habilitado</RadioGroupItem>\r\n          <RadioGroupItem value="no">También habilitado</RadioGroupItem>\r\n          <RadioGroupItem value="maybe" disabled>\r\n            Deshabilitado\r\n          </RadioGroupItem>\r\n        </RadioGroup>\r\n        \r\n        <RadioGroup value={value} onValueChange={setValue} disabled>\r\n          <RadioGroupItem value="all-1">Todo el grupo deshabilitado 1</RadioGroupItem>\r\n          <RadioGroupItem value="all-2">Todo el grupo deshabilitado 2</RadioGroupItem>\r\n          <RadioGroupItem value="all-3">Todo el grupo deshabilitado 3</RadioGroupItem>\r\n        </RadioGroup>\r\n      </div>;\n  }\n}',...Disabled.parameters?.docs?.source}}},WithForm.parameters={...WithForm.parameters,docs:{...WithForm.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [formData, setFormData] = useState({\n      plan: "basic",\n      notifications: "all"\n    });\n    const handleChange = (field: string) => (value: string) => {\n      setFormData(prev => ({\n        ...prev,\n        [field]: value\n      }));\n    };\n    const handleSubmit = (e: React.FormEvent) => {\n      e.preventDefault();\n      alert(`Formulario enviado con: ${JSON.stringify(formData, null, 2)}`);\n    };\n    return <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">\r\n        <div className="space-y-4">\r\n          <h3 className="text-lg font-medium">Plan de suscripción</h3>\r\n          <RadioGroup name="plan" value={formData.plan} onValueChange={handleChange("plan")} className="space-y-3">\r\n            <div className="flex items-center justify-between rounded-lg border p-4">\r\n              <RadioGroupItem value="basic">\r\n                Plan Básico - $9.99/mes\r\n              </RadioGroupItem>\r\n            </div>\r\n            <div className="flex items-center justify-between rounded-lg border p-4">\r\n              <RadioGroupItem value="pro">\r\n                Plan Pro - $19.99/mes\r\n              </RadioGroupItem>\r\n            </div>\r\n            <div className="flex items-center justify-between rounded-lg border p-4">\r\n              <RadioGroupItem value="enterprise">\r\n                Plan Empresarial - $49.99/mes\r\n              </RadioGroupItem>\r\n            </div>\r\n          </RadioGroup>\r\n        </div>\r\n        \r\n        <div className="space-y-4">\r\n          <h3 className="text-lg font-medium">Preferencias de notificación</h3>\r\n          <RadioGroup name="notifications" value={formData.notifications} onValueChange={handleChange("notifications")}>\r\n            <RadioGroupItem value="all">Todas las notificaciones</RadioGroupItem>\r\n            <RadioGroupItem value="important">Solo notificaciones importantes</RadioGroupItem>\r\n            <RadioGroupItem value="none">Sin notificaciones</RadioGroupItem>\r\n          </RadioGroup>\r\n        </div>\r\n        \r\n        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">\r\n          Guardar preferencias\r\n        </button>\r\n      </form>;\n  }\n}',...WithForm.parameters?.docs?.source}}},CustomStyles.parameters={...CustomStyles.parameters,docs:{...CustomStyles.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [value, setValue] = useState("blue");\n    return <RadioGroup value={value} onValueChange={setValue} className="flex flex-col space-y-3">\r\n        <RadioGroupItem value="red" className="[&>div]:border-red-500 [&_svg]:fill-red-500">\r\n          <span className="ml-2 text-red-500 font-medium">Rojo</span>\r\n        </RadioGroupItem>\r\n        <RadioGroupItem value="blue" className="[&>div]:border-blue-500 [&_svg]:fill-blue-500">\r\n          <span className="ml-2 text-blue-500 font-medium">Azul</span>\r\n        </RadioGroupItem>\r\n        <RadioGroupItem value="green" className="[&>div]:border-green-500 [&_svg]:fill-green-500">\r\n          <span className="ml-2 text-green-500 font-medium">Verde</span>\r\n        </RadioGroupItem>\r\n        <RadioGroupItem value="purple" className="[&>div]:border-purple-500 [&_svg]:fill-purple-500">\r\n          <span className="ml-2 text-purple-500 font-medium">Púrpura</span>\r\n        </RadioGroupItem>\r\n      </RadioGroup>;\n  }\n}',...CustomStyles.parameters?.docs?.source}}}}}]);