"use strict";(self.webpackChunkxerck=self.webpackChunkxerck||[]).push([[5306],{"./components/ui/Progress.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{k:()=>Progress});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_lib_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./lib/utils.ts");const Progress=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,value=0,showValue=!1,max=100,valueFormat="{value}%",colors,animationDuration="0.3s",...props},ref)=>{const normalizedValue=Math.max(0,Math.min(value||0,max)),percentage=normalizedValue/max*100,formattedValue=valueFormat.replace("{value}",Math.round(percentage).toString());return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{ref,role:"progressbar","aria-valuemin":0,"aria-valuemax":max,"aria-valuenow":normalizedValue,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("relative h-2 w-full overflow-hidden rounded-full bg-primary/20",className),style:{backgroundColor:null==colors?void 0:colors.background},...props,children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"h-full w-full flex-1 bg-primary transition-all",style:{transform:`translateX(-${100-percentage}%)`,backgroundColor:null==colors?void 0:colors.indicator,transition:`transform ${animationDuration} ease-in-out`}}),showValue&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:"absolute inset-0 flex items-center justify-center text-xs font-medium",style:{color:(null==colors?void 0:colors.valueText)||"currentColor"},children:formattedValue})]})}));Progress.displayName="Progress",Progress.__docgenInfo={description:"",methods:[],displayName:"Progress",props:{value:{required:!1,tsType:{name:"number"},description:"El valor actual del progreso, entre 0 y 100",defaultValue:{value:"0",computed:!1}},showValue:{required:!1,tsType:{name:"boolean"},description:"Indica si debe mostrar el valor como texto",defaultValue:{value:"false",computed:!1}},max:{required:!1,tsType:{name:"number"},description:"El valor máximo del progreso\r\n@default 100",defaultValue:{value:"100",computed:!1}},valueFormat:{required:!1,tsType:{name:"string"},description:'El formato en el que se muestra el valor\r\n@default "{value}%"',defaultValue:{value:'"{value}%"',computed:!1}},colors:{required:!1,tsType:{name:"signature",type:"object",raw:"{\r\n  background?: string\r\n  indicator?: string\r\n  valueText?: string\r\n}",signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"indicator",value:{name:"string",required:!1}},{key:"valueText",value:{name:"string",required:!1}}]}},description:"Colores personalizados para las siguientes propiedades:\r\n- background: Color de fondo de la barra de progreso\r\n- indicator: Color del indicador de progreso\r\n- valueText: Color del texto del valor"},animationDuration:{required:!1,tsType:{name:"string"},description:'La velocidad de la animación de transición\r\n@default "0.3s"',defaultValue:{value:'"0.3s"',computed:!1}}}}},"./lib/utils.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{cn:()=>cn});var clsx__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/clsx/dist/clsx.mjs"),tailwind_merge__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/tailwind-merge/dist/bundle-mjs.mjs");function cn(...inputs){return(0,tailwind_merge__WEBPACK_IMPORTED_MODULE_0__.QP)((0,clsx__WEBPACK_IMPORTED_MODULE_1__.$)(inputs))}},"./stories/Progress.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Animated:()=>Animated,CustomColors:()=>CustomColors,CustomFormat:()=>CustomFormat,CustomSizes:()=>CustomSizes,Default:()=>Default,DifferentMax:()=>DifferentMax,LoadingStates:()=>LoadingStates,ProgressWithSteps:()=>ProgressWithSteps,WithValueDisplay:()=>WithValueDisplay,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./components/ui/Progress.tsx");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Progress",component:_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{value:{control:{type:"range",min:0,max:100,step:1},description:"El valor actual del progreso, entre 0 y 100"},showValue:{control:"boolean",description:"Indica si debe mostrar el valor como texto"},max:{control:{type:"number",min:1},description:"El valor máximo del progreso"},valueFormat:{control:"text",description:"El formato en el que se muestra el valor. Use {value} como placeholder."},colors:{control:"object",description:"Colores personalizados para la barra de progreso"},animationDuration:{control:"text",description:"La velocidad de la animación de transición"}}},Default={args:{value:40,className:"w-[350px]"}},WithValueDisplay={args:{value:65,showValue:!0,className:"w-[350px] h-6"}},CustomColors={args:{value:80,showValue:!0,className:"w-[350px] h-6",colors:{background:"#f1f5f9",indicator:"#0ea5e9",valueText:"#0369a1"}}},CustomFormat={args:{value:75,showValue:!0,className:"w-[350px] h-6",valueFormat:"{value}/100 completado"}},DifferentMax={args:{value:350,max:1e3,showValue:!0,className:"w-[350px] h-6",valueFormat:"{value}% de 1000"}},CustomSizes={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex flex-col space-y-4 w-[350px]",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:60,className:"h-1"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:60,className:"h-2"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:60,className:"h-4"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:60,className:"h-6",showValue:!0}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:60,className:"h-8",showValue:!0})]})},Animated={render:()=>{const[progress,setProgress]=(0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);return(0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)((()=>{const interval=setInterval((()=>{setProgress((prev=>prev>=100?0:prev+5))}),500);return()=>clearInterval(interval)}),[]),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"w-[350px] space-y-4",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"text-center mb-2",children:["Progreso: ",progress,"%"]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:progress,className:"h-3"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:progress,className:"h-6",showValue:!0})]})}},LoadingStates={render:()=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"w-[350px] space-y-6",children:[{name:"Cargando",value:25},{name:"En proceso",value:50},{name:"Casi listo",value:75},{name:"Completado",value:100}].map((state=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"space-y-2",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex justify-between text-sm",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{children:state.name}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span",{children:[state.value,"%"]})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:state.value,className:"h-2",colors:{indicator:100===state.value?"#22c55e":void 0}})]},state.name)))})},ProgressWithSteps={render:()=>{const steps=["Información","Pago","Confirmación","Completado"],progressValue=3/steps.length*100;return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"w-[350px] space-y-6",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Progress__WEBPACK_IMPORTED_MODULE_2__.k,{value:progressValue,className:"h-2 mb-4"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"flex justify-between",children:steps.map(((step,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"flex flex-col items-center gap-2 "+(index<=2?"text-primary":"text-muted-foreground"),children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"w-8 h-8 rounded-full flex items-center justify-center text-xs "+(index<=2?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground"),children:index+1}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span",{className:"text-xs",children:step})]},step)))})]})}},__namedExportsOrder=["Default","WithValueDisplay","CustomColors","CustomFormat","DifferentMax","CustomSizes","Animated","LoadingStates","ProgressWithSteps"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: 40,\n    className: "w-[350px]"\n  }\n}',...Default.parameters?.docs?.source}}},WithValueDisplay.parameters={...WithValueDisplay.parameters,docs:{...WithValueDisplay.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: 65,\n    showValue: true,\n    className: "w-[350px] h-6"\n  }\n}',...WithValueDisplay.parameters?.docs?.source}}},CustomColors.parameters={...CustomColors.parameters,docs:{...CustomColors.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: 80,\n    showValue: true,\n    className: "w-[350px] h-6",\n    colors: {\n      background: "#f1f5f9",\n      // slate-100\n      indicator: "#0ea5e9",\n      // sky-500\n      valueText: "#0369a1" // sky-700\n    }\n  }\n}',...CustomColors.parameters?.docs?.source}}},CustomFormat.parameters={...CustomFormat.parameters,docs:{...CustomFormat.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: 75,\n    showValue: true,\n    className: "w-[350px] h-6",\n    valueFormat: "{value}/100 completado"\n  }\n}',...CustomFormat.parameters?.docs?.source}}},DifferentMax.parameters={...DifferentMax.parameters,docs:{...DifferentMax.parameters?.docs,source:{originalSource:'{\n  args: {\n    value: 350,\n    max: 1000,\n    showValue: true,\n    className: "w-[350px] h-6",\n    valueFormat: "{value}% de 1000"\n  }\n}',...DifferentMax.parameters?.docs?.source}}},CustomSizes.parameters={...CustomSizes.parameters,docs:{...CustomSizes.parameters?.docs,source:{originalSource:'{\n  render: () => <div className="flex flex-col space-y-4 w-[350px]">\r\n      <Progress value={60} className="h-1" />\r\n      <Progress value={60} className="h-2" />\r\n      <Progress value={60} className="h-4" />\r\n      <Progress value={60} className="h-6" showValue />\r\n      <Progress value={60} className="h-8" showValue />\r\n    </div>\n}',...CustomSizes.parameters?.docs?.source}}},Animated.parameters={...Animated.parameters,docs:{...Animated.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const [progress, setProgress] = useState(0);\n    useEffect(() => {\n      const interval = setInterval(() => {\n        setProgress(prev => {\n          if (prev >= 100) {\n            return 0;\n          }\n          return prev + 5;\n        });\n      }, 500);\n      return () => clearInterval(interval);\n    }, []);\n    return <div className="w-[350px] space-y-4">\r\n        <div className="text-center mb-2">\r\n          Progreso: {progress}%\r\n        </div>\r\n        <Progress value={progress} className="h-3" />\r\n        <Progress value={progress} className="h-6" showValue />\r\n      </div>;\n  }\n}',...Animated.parameters?.docs?.source}}},LoadingStates.parameters={...LoadingStates.parameters,docs:{...LoadingStates.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const states = [{\n      name: "Cargando",\n      value: 25\n    }, {\n      name: "En proceso",\n      value: 50\n    }, {\n      name: "Casi listo",\n      value: 75\n    }, {\n      name: "Completado",\n      value: 100\n    }];\n    return <div className="w-[350px] space-y-6">\r\n        {states.map(state => <div key={state.name} className="space-y-2">\r\n            <div className="flex justify-between text-sm">\r\n              <span>{state.name}</span>\r\n              <span>{state.value}%</span>\r\n            </div>\r\n            <Progress value={state.value} className="h-2" colors={{\n          indicator: state.value === 100 ? "#22c55e" : undefined // verde si está completo\n        }} />\r\n          </div>)}\r\n      </div>;\n  }\n}',...LoadingStates.parameters?.docs?.source}}},ProgressWithSteps.parameters={...ProgressWithSteps.parameters,docs:{...ProgressWithSteps.parameters?.docs,source:{originalSource:'{\n  render: () => {\n    const steps = ["Información", "Pago", "Confirmación", "Completado"];\n    const currentStep = 2; // 0-based index\n    const progressValue = (currentStep + 1) / steps.length * 100;\n    return <div className="w-[350px] space-y-6">\r\n        <Progress value={progressValue} className="h-2 mb-4" />\r\n        \r\n        <div className="flex justify-between">\r\n          {steps.map((step, index) => <div key={step} className={`flex flex-col items-center gap-2 ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}>\r\n              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${index <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>\r\n                {index + 1}\r\n              </div>\r\n              <span className="text-xs">{step}</span>\r\n            </div>)}\r\n        </div>\r\n      </div>;\n  }\n}',...ProgressWithSteps.parameters?.docs?.source}}}}}]);