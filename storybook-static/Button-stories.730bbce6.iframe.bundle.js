"use strict";(self.webpackChunkxerck=self.webpackChunkxerck||[]).push([[9303],{"./components/ui/button.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>Button});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js");__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./app/globals.css");const variantStyles={normal:"bg-primary text-primary-foreground hover:ring-2 hover:ring-primary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",secondary:"bg-secondary text-foreground hover:bg-secondary/90 hover:ring-2 hover:ring-secondary hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",danger:"bg-destructive text-primary-foreground hover:ring-2 hover:ring-destructive hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",success:"bg-green-600 text-white hover:bg-green-700 hover:ring-2 hover:ring-green-600 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",info:"bg-blue-500 text-white hover:bg-blue-600 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",warning:"bg-amber-500 text-white hover:bg-amber-600 hover:ring-2 hover:ring-amber-500 hover:ring-offset-2 text-sm transform-gpu ring-offset-current transition-all duration-300 ease-out",ghost:"bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground text-sm transform-gpu transition-all duration-300 ease-out",link:"bg-transparent text-primary underline-offset-4 hover:underline text-sm transform-gpu transition-all duration-300 ease-out p-0 shadow-none",subtle:"bg-primary/10 text-primary hover:bg-primary/20 text-sm transform-gpu transition-all duration-300 ease-out"},sizeStyles={sm:"h-8 px-3 text-xs",md:"h-9 px-4 py-2 text-sm",lg:"h-11 px-6 py-2 text-base"},Button=({variant="normal",style,label,children,className,disabled=!1,size="md",...props})=>{const variantStyle=variantStyles[variant],sizeStyle=sizeStyles[size];return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button",{type:"button",className:[style||variantStyle,sizeStyle,className,"cursor-pointer font-[Geist] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"].join(" "),disabled,...props,children:[label,children]})};Button.__docgenInfo={description:"Primary UI component for user interaction",methods:[],displayName:"Button",props:{variant:{required:!1,tsType:{name:"union",raw:"'normal' | 'secondary' | 'outline' | 'danger' | 'success' | 'info' | 'warning' | 'ghost' | 'link' | 'subtle'",elements:[{name:"literal",value:"'normal'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'danger'"},{name:"literal",value:"'success'"},{name:"literal",value:"'info'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'link'"},{name:"literal",value:"'subtle'"}]},description:"Which variant style to use",defaultValue:{value:"'normal'",computed:!1}},style:{required:!1,tsType:{name:"string"},description:"Custom style class (optional)"},label:{required:!1,tsType:{name:"string"},description:"Button contents"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the button is disabled",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Size of the button",defaultValue:{value:"'md'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./stories/Button.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{CustomStyle:()=>CustomStyle,Danger:()=>Danger,Disabled:()=>Disabled,Ghost:()=>Ghost,Info:()=>Info,Large:()=>Large,Link:()=>Link,Medium:()=>Medium,Normal:()=>Normal,Outline:()=>Outline,Secondary:()=>Secondary,Small:()=>Small,Subtle:()=>Subtle,Success:()=>Success,Warning:()=>Warning,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Button",component:__webpack_require__("./components/ui/button.tsx").$,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["normal","secondary","outline","danger","success","info","warning","ghost","link","subtle","gradient"]},size:{control:"radio",options:["sm","md","lg"]},disabled:{control:"boolean"},style:{control:"text"}}},Normal={args:{label:"Button",variant:"normal"}},Secondary={args:{label:"Button",variant:"secondary"}},Outline={args:{label:"Button",variant:"outline"}},Danger={args:{label:"Button",variant:"danger"}},Success={args:{label:"Success",variant:"success"}},Info={args:{label:"Info",variant:"info"}},Warning={args:{label:"Warning",variant:"warning"}},Ghost={args:{label:"Ghost",variant:"ghost"}},Link={args:{label:"Link Button",variant:"link"}},Subtle={args:{label:"Subtle",variant:"subtle"}},Small={args:{label:"Small Button",size:"sm"}},Medium={args:{label:"Medium Button",size:"md"}},Large={args:{label:"Large Button",size:"lg"}},Disabled={args:{label:"Disabled Button",disabled:!0}},CustomStyle={args:{label:"Custom Button",style:"bg-purple-600 text-white hover:bg-purple-700 text-sm transform-gpu transition-all duration-300 ease-out"}},__namedExportsOrder=["Normal","Secondary","Outline","Danger","Success","Info","Warning","Ghost","Link","Subtle","Small","Medium","Large","Disabled","CustomStyle"];Normal.parameters={...Normal.parameters,docs:{...Normal.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Button',\n    variant: 'normal'\n  }\n}",...Normal.parameters?.docs?.source}}},Secondary.parameters={...Secondary.parameters,docs:{...Secondary.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Button',\n    variant: 'secondary'\n  }\n}",...Secondary.parameters?.docs?.source}}},Outline.parameters={...Outline.parameters,docs:{...Outline.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Button',\n    variant: 'outline'\n  }\n}",...Outline.parameters?.docs?.source}}},Danger.parameters={...Danger.parameters,docs:{...Danger.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Button',\n    variant: 'danger'\n  }\n}",...Danger.parameters?.docs?.source}}},Success.parameters={...Success.parameters,docs:{...Success.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Success',\n    variant: 'success'\n  }\n}",...Success.parameters?.docs?.source}}},Info.parameters={...Info.parameters,docs:{...Info.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Info',\n    variant: 'info'\n  }\n}",...Info.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Warning',\n    variant: 'warning'\n  }\n}",...Warning.parameters?.docs?.source}}},Ghost.parameters={...Ghost.parameters,docs:{...Ghost.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Ghost',\n    variant: 'ghost'\n  }\n}",...Ghost.parameters?.docs?.source}}},Link.parameters={...Link.parameters,docs:{...Link.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Link Button',\n    variant: 'link'\n  }\n}",...Link.parameters?.docs?.source}}},Subtle.parameters={...Subtle.parameters,docs:{...Subtle.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Subtle',\n    variant: 'subtle'\n  }\n}",...Subtle.parameters?.docs?.source}}},Small.parameters={...Small.parameters,docs:{...Small.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Small Button',\n    size: 'sm'\n  }\n}",...Small.parameters?.docs?.source}}},Medium.parameters={...Medium.parameters,docs:{...Medium.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Medium Button',\n    size: 'md'\n  }\n}",...Medium.parameters?.docs?.source}}},Large.parameters={...Large.parameters,docs:{...Large.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Large Button',\n    size: 'lg'\n  }\n}",...Large.parameters?.docs?.source}}},Disabled.parameters={...Disabled.parameters,docs:{...Disabled.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Disabled Button',\n    disabled: true\n  }\n}",...Disabled.parameters?.docs?.source}}},CustomStyle.parameters={...CustomStyle.parameters,docs:{...CustomStyle.parameters?.docs,source:{originalSource:"{\n  args: {\n    label: 'Custom Button',\n    style: \"bg-purple-600 text-white hover:bg-purple-700 text-sm transform-gpu transition-all duration-300 ease-out\"\n  }\n}",...CustomStyle.parameters?.docs?.source}}}}}]);