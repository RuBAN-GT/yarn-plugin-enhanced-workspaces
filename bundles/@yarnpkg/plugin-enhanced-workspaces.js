/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-enhanced-workspaces",
factory: function (require) {
var plugin;(()=>{var e={397:e=>{e.exports=function(){"use strict";return function(e,t,r){var n,o;for(n=0,o=t.length;n<o&&!(e(t[n],r)>0);n++);return n}}()},346:e=>{e.exports=function(){"use strict";return function e(t,r){var n,o,i=r.length;return i>=2?(n=r.slice(0,i/2),o=r.slice(i/2,i),function(e,t,r){var n=[],o=t.length,i=r.length;for(;o>0&&i>0;)e(t[0],r[0])<=0?(n.push(t.shift()),o--):(n.push(r.shift()),i--);o>0?n.push.apply(n,t):n.push.apply(n,r);return n}(t,e(t,n),e(t,o))):r.slice()}}()},993:(e,t,r)=>{var n,o;n=r(346),o=r(397),e.exports=function(){"use strict";var e;function t(e){return function(){return e}}function r(e){e=e||{},this.config=e,this.config.childrenPropertyName=e.childrenPropertyName||"children",this.config.modelComparatorFn=e.modelComparatorFn}function i(e,t){return t.parent=e,e.children.push(t),t}function s(e,t){this.config=e,this.model=t,this.children=[]}function a(e){return"function"==typeof e.config.modelComparatorFn}function c(e,t,r){var n;if(!(t instanceof s))throw new TypeError("Child must be of type Node.");if(t.parent=e,e.model[e.config.childrenPropertyName]instanceof Array||(e.model[e.config.childrenPropertyName]=[]),a(e))n=o(e.config.modelComparatorFn,e.model[e.config.childrenPropertyName],t.model),e.model[e.config.childrenPropertyName].splice(n,0,t.model),e.children.splice(n,0,t);else if(void 0===r)e.model[e.config.childrenPropertyName].push(t.model),e.children.push(t);else{if(r<0||r>e.children.length)throw new Error("Invalid index.");e.model[e.config.childrenPropertyName].splice(r,0,t.model),e.children.splice(r,0,t)}return t}function p(){var t={};if(1===arguments.length?"function"==typeof arguments[0]?t.fn=arguments[0]:t.options=arguments[0]:2===arguments.length?"function"==typeof arguments[0]?(t.fn=arguments[0],t.ctx=arguments[1]):(t.options=arguments[0],t.fn=arguments[1]):(t.options=arguments[0],t.fn=arguments[1],t.ctx=arguments[2]),t.options=t.options||{},t.options.strategy||(t.options.strategy="pre"),!e[t.options.strategy])throw new Error("Unknown tree walk strategy. Valid strategies are 'pre' [default], 'post' and 'breadth'.");return t}return e={},r.prototype.parse=function(e){var t,r,o;if(!(e instanceof Object))throw new TypeError("Model must be of type object.");if(o=new s(this.config,e),e[this.config.childrenPropertyName]instanceof Array)for(this.config.modelComparatorFn&&(e[this.config.childrenPropertyName]=n(this.config.modelComparatorFn,e[this.config.childrenPropertyName])),t=0,r=e[this.config.childrenPropertyName].length;t<r;t++)i(o,this.parse(e[this.config.childrenPropertyName][t]));return o},s.prototype.isRoot=function(){return void 0===this.parent},s.prototype.hasChildren=function(){return this.children.length>0},s.prototype.addChild=function(e){return c(this,e)},s.prototype.addChildAtIndex=function(e,t){if(a(this))throw new Error("Cannot add child at index when using a comparator function.");return c(this,e,t)},s.prototype.setIndex=function(e){if(a(this))throw new Error("Cannot set node index when using a comparator function.");if(this.isRoot()){if(0===e)return this;throw new Error("Invalid index.")}if(e<0||e>=this.parent.children.length)throw new Error("Invalid index.");var t=this.parent.children.indexOf(this);return this.parent.children.splice(e,0,this.parent.children.splice(t,1)[0]),this.parent.model[this.parent.config.childrenPropertyName].splice(e,0,this.parent.model[this.parent.config.childrenPropertyName].splice(t,1)[0]),this},s.prototype.getPath=function(){var e=[];return function t(r){e.unshift(r),r.isRoot()||t(r.parent)}(this),e},s.prototype.getIndex=function(){return this.isRoot()?0:this.parent.children.indexOf(this)},s.prototype.walk=function(){var t;t=p.apply(this,arguments),e[t.options.strategy].call(this,t.fn,t.ctx)},e.pre=function e(t,r){var n,o,i;for(i=t.call(r,this),n=0,o=this.children.length;n<o;n++){if(!1===i)return!1;i=e.call(this.children[n],t,r)}return i},e.post=function e(t,r){var n,o;for(n=0,o=this.children.length;n<o;n++)if(!1===e.call(this.children[n],t,r))return!1;return t.call(r,this)},e.breadth=function(e,t){var r=[this];!function n(){var o,i,s;if(0!==r.length){for(o=0,i=(s=r.shift()).children.length;o<i;o++)r.push(s.children[o]);!1!==e.call(t,s)&&n()}}()},s.prototype.all=function(){var r,n=[];return(r=p.apply(this,arguments)).fn=r.fn||t(!0),e[r.options.strategy].call(this,(function(e){r.fn.call(r.ctx,e)&&n.push(e)}),r.ctx),n},s.prototype.first=function(){var r,n;return(r=p.apply(this,arguments)).fn=r.fn||t(!0),e[r.options.strategy].call(this,(function(e){if(r.fn.call(r.ctx,e))return n=e,!1}),r.ctx),n},s.prototype.drop=function(){var e;return this.isRoot()||(e=this.parent.children.indexOf(this),this.parent.children.splice(e,1),this.parent.model[this.config.childrenPropertyName].splice(e,1),this.parent=void 0,delete this.parent),this},r}()},269:function(e){e.exports=function(){function e(t,r,n,o,i,s,a){var c,p,d="",h=0,l=o.slice(0);if(l.push([r,n])&&o.length>0&&(o.forEach((function(e,t){t>0&&(d+=(e[1]?" ":"│")+"  "),p||e[0]!==r||(p=!0)})),d+=function(e,t){var r=t?"└":"├";return r+=e?"─ ":"──┐"}(t,n)+t,i&&("object"!=typeof r||r instanceof Date)&&(d+=": "+r),p&&(d+=" (circular ref.)"),a(d)),!p&&"object"==typeof r){var u=function(e,t){var r=[];for(var n in e)e.hasOwnProperty(n)&&(t&&"function"==typeof e[n]||r.push(n));return r}(r,s);u.forEach((function(t){c=++h===u.length,e(t,r[t],c,l,i,s,a)}))}}var t={asLines:function(t,r,n,o){e(".",t,!1,[],r,"function"!=typeof n&&n,o||n)},asTree:function(t,r,n){var o="";return e(".",t,!1,[],r,n,(function(e){o+=e+"\n"})),o}};return t}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r.d(n,{default:()=>R});const e=require("@yarnpkg/core");var t;!function(e){e.baseRef="base-ref",e.prevRef="prev-ref"}(t||(t={}));function o(e,t,r,n){var o,i=arguments.length,s=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s}Object.create;Object.create;const i=require("clipanion");var s,a=r(269);function c(e){var t;const r=(null===(t=e.children)||void 0===t?void 0:t.length)>0?{}:null;return e.children.forEach(e=>{r[e.name]=c(e)}),r}!function(e){e.json="json",e.tree="tree"}(s||(s={}));class p extends class{constructor(){this.children=[]}get chain(){return this._chain}get depth(){return this._chain.size}addChildren(e){return this.children.push(e),this}generateChain(){var e;this._chain=new Set(null===(e=this.parent)||void 0===e?void 0:e.chain),this._chain.add(this.id)}}{constructor(e,t){super(),this.parent=t,this.workspace=e,this.generateChain()}get id(){return this.workspace.anchoredLocator}get name(){return this.workspace.manifest.raw.name}}class d{async resolve(e){return await e.restoreInstallState(),this.buildWorkspacesTree(e)}buildWorkspacesTree(e){const t=this.getEssentialWorkspaces(e);if(0===t.length)throw new Error("Project doesn't have any essentail workspaces");const r=new p(e.topLevelWorkspace);return t.forEach(t=>{const n=new p(t,r);this.fillChildrenNodes(e,n),r.addChildren(n)}),r}getWorkspacePackage(e,t){const r=e.storedPackages.get(t.anchoredLocator.locatorHash);if(!r)throw new Error("Unknown workspace");return r}getEssentialWorkspaces(e){return e.workspaces.filter(t=>t.locator.name!==e.topLevelWorkspace.locator.name&&0===this.getWorkspaceInternalDependencies(e,t).size)}getWorkspaceInternalDependencies(e,t){const r=this.getWorkspacePackage(e,t),n=new Set;return[...r.dependencies,...r.peerDependencies].forEach(([,t])=>{const r=e.tryWorkspaceByIdent(t);r&&n.add(r)}),n}getWorkspaceExternalDependencies(e,t){const r=e.workspaces.filter(r=>{const n=this.getWorkspacePackage(e,r);return n.dependencies.has(t.locator.identHash)||n.peerDependencies.has(t.locator.identHash)});return new Set(r)}fillChildrenNodes(e,t){this.getWorkspaceExternalDependencies(e,t.workspace).forEach(r=>{if(t.chain.has(r.anchoredLocator))return;const n=new p(r,t);t.addChildren(n),this.fillChildrenNodes(e,n)})}}var h=r(993),l=r.n(h);class u{constructor(e){this.root=e,this.tree=this.parseWorkspaceNode(e)}findNodesByIds(e){return this.tree.all(({model:t})=>e.has(t.id)).map(e=>e.model)}findNodesByWorkspaces(e){return this.tree.all(({model:t})=>e.includes(t.workspace)).map(e=>e.model)}parseWorkspaceNode(e){return(new(l())).parse(e)}}class f extends i.Command{constructor(){super(...arguments),this.workspaceResolver=new d,this.outputFormat=s.tree}async execute(){this.validateInput();const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:r}=await e.Project.find(t,this.context.cwd),n=await this.workspaceResolver.resolve(r);this.printTree(n)}validateInput(){if(!Object.keys(s).includes(this.outputFormat))throw new i.UsageError("Invalid --output-format option, can be 'json', 'tree'")}printTree(e){switch(this.outputFormat){case s.json:console.dir(JSON.stringify(function e(t){const r=[];return t.children.forEach(t=>{r.push(e(t))}),{name:t.name,children:r}}(e)));break;case s.tree:console.log((0,a.asTree)(function(e){return{[e.name]:c(e)}}(e),!1,!0))}}}async function g(t,r=[]){const n=await async function(t,r){const n=[];for(const o of r){const{code:r}=await e.execUtils.execvp("git",["merge-base",o,"HEAD"],{cwd:t,strict:!1});0===r&&n.push(o)}return n}(t,r);if(0===n.length)return"";const{stdout:o}=await e.execUtils.execvp("git",["merge-base","HEAD",...n],{cwd:t,strict:!1});return o.trim()}f.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints monitored workspaces graph"}),o([i.Command.String("-o,--output-format",{description:"Output format, can be 'json', 'tree'"})],f.prototype,"outputFormat",void 0),o([i.Command.Path("workspaces","graph")],f.prototype,"execute",null);const m=async t=>{const{projectCwd:r,baseRefs:n=[]}=t,o=await async function(t){const r={cwd:t,strict:!1},{stdout:n}=await e.execUtils.execvp("git",["describe","--tags","--abbrev=0"],r),o=n.trim();if(!o)return"";const{stdout:i}=await e.execUtils.execvp("git",["rev-list","-n","1",o],r);return i.trim()}(r);return{commit:o||await g(r,n)}},w=async t=>{const{projectCwd:r}=t,n={cwd:r,strict:!1},{stdout:o}=await e.execUtils.execvp("git",["rev-parse","HEAD^1"],n);return{commit:o.trim()}};async function y(e,r){const{configuration:n}=e;r||(r=n.get("changeDetectionStrategy"));const o=function(e){if(e===t.baseRef)return m;if(e===t.prevRef)return w;throw new Error("Unknown strategy "+e)}(r);return(await o({projectCwd:n.projectCwd,baseRefs:n.get("changesetBaseRefs")})).commit}const v=require("@yarnpkg/fslib"),k=(e,t)=>t.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>v.ppath.resolve(e,v.npath.toPortablePath(t)));class x{constructor(){this.workspaceResolver=new d}async findCandidates(e,t={}){const{topLevelWorkspace:r,configuration:n}=e;let{ignoredAncestorsMarkers:o,withAncestor:i,withPrivate:s}=t;const a=await this.findAffectedWorkspaces(e,t.changeDetectionStrategy);s=void 0===s?n.get("detectPrivates"):s;const c=[...a].filter(e=>e!==r&&(!e.manifest.private||s));if(0===c.length)return new Map;const p=await this.workspaceResolver.resolve(e),d=new u(p),h=this.findAffectedNodes(d,c);if(i=void 0===i?n.get("preserveAncestors"):i,i){o=o||[];const e=n.get("ignoredAncestorsMarkers")||[],t=this.mixAncestorsNodes(d,h,o.concat(e));return t.delete(p.workspace.locator),t}return h}async findAffectedWorkspaces(t,r){if(!t.configuration.projectCwd)throw new i.UsageError("Invalid project configuration.");const n=await y(t,r),o=await async function(t,r){const n=t.configuration.projectCwd,o=t.configuration.get("changesetIgnorePatterns")||[],i={cwd:n,strict:!0};let s=[];if(r){const{stdout:t}=await e.execUtils.execvp("git",["diff","--name-only",r],i);s=k(n,t)}const{stdout:a}=await e.execUtils.execvp("git",["ls-files","--others","--exclude-standard"],i),c=k(n,a),p=[...new Set([...s,...c].sort())],d=e.miscUtils.buildIgnorePattern(o);return d?p.filter(e=>!v.ppath.relative(t.cwd,e).match(d)):p}(t,n);return function(t,r){const n=e.miscUtils.mapAndFilter(r,r=>{const n=t.tryWorkspaceByFilePath(r);return null===n?e.miscUtils.mapAndFilter.skip:n});return new Set(n)}(t,o)}findAffectedNodes(e,t){const r=new Map;return e.findNodesByWorkspaces(t).forEach(e=>{const t=e.workspace.locator,n=r.get(t);(!n||n.depth<e.depth)&&r.set(t,e)}),r}mixAncestorsNodes(e,t,r=[]){const n=new Map;return t.forEach(o=>{e.findNodesByIds(o.chain).forEach(e=>{!t.has(e.workspace.locator)&&function(e,t){if(!t||0===t.length)return!1;const{workspace:r}=e;return t.some(e=>{const t=v.ppath.join(r.cwd,e);return v.xfs.existsSync(t)})}(e,r)||n.set(e.workspace.locator,e)})}),n}}function C(e){const t=[];return e.forEach(e=>{t.push(e)}),t}function P(e){const t=new Set;return e.forEach((e,r)=>{t.add(r)}),t}function A(e){const t=new Map;return e.forEach((e,r)=>{const n=t.get(e)||[];n.push(r),t.set(e,n)}),t}class b{resolve(e){const t=new Map;return this.fillSourceFragment(t,e),t}fillSourceFragment(e,[t,...r]){if(!t)return;if(!t.parent)return e.set(t,0),this.fillSourceFragment(e,r);const[n,o]=function(e,t){const r=function(e,t){let r=void 0;return e.chain.forEach(e=>{const n=t.find(t=>t.id===e);n&&(!r||n.depth>r.depth)&&(r=n)}),r}(t,[...P(e)]);return r?[e.get(r),r]:[0,void 0]}(e,t);o?e.set(t,n+1):e.set(t,0),r.length>0&&this.fillSourceFragment(e,r)}}class N{constructor(){this.rankResolver=new b}list(e){let t=[];return A(this.rankResolver.resolve(e)).forEach(e=>{t=t.concat(e)}),t}chunks(e){const{groupBy:t,input:r}=e;let n=[];return A(this.rankResolver.resolve(r)).forEach(e=>{const r=function(e,t){const r=Math.ceil(e.length/t),n=Array(r);for(let o=0;o<r;o++){const r=o*t;n[o]=e.slice(r,r+t)}return n}(e,t);n=n.concat(r)}),{groupBy:t,data:n}}}const S=require("os");class E extends i.Command{constructor(){super(...arguments),this.groupBy=Math.max(1,(0,S.cpus)().length/2),this.cdManager=new x,this.groupManager=new N,this.withAncestor=!1,this.ignoredAncestorsMarkers=[],this.withPrivate=!0}async execute(){this.validateInput();const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:r}=await e.Project.find(t,this.context.cwd),n=await this.cdManager.findCandidates(r,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestor,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),o=this.groupManager.chunks({groupBy:+this.groupBy,input:C(n)});var i;console.log(JSON.stringify({groupBy:(i=o).groupBy,data:i.data.map(e=>e.map(e=>e.name))}))}validateInput(){const e=+this.groupBy;if(isNaN(e)||e<=0)throw new i.UsageError("Invalid group-by option")}}E.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints affected workspaces collected by chunks"}),o([i.Command.String("-g,--group-by",{description:"Slice workspaces by this number, it should be positive number"})],E.prototype,"groupBy",void 0),o([i.Command.String("-s,--change-detection-strategy",{description:"Change detection strategy"})],E.prototype,"changeDetectionStrategy",void 0),o([i.Command.Boolean("-a,--ancestors",{description:"Perform operation over ancestors"})],E.prototype,"withAncestor",void 0),o([i.Command.Array("--ignored-ancestors-markers",{description:"The same as ignoredAncestorsMarkers"})],E.prototype,"ignoredAncestorsMarkers",void 0),o([i.Command.Boolean("--private",{description:"Include private workspaces"})],E.prototype,"withPrivate",void 0),o([i.Command.Path("workspaces","changed","chunks")],E.prototype,"execute",null);class M extends i.Command{constructor(){super(...arguments),this.cdManager=new x,this.groupManager=new N,this.withAncestor=!1,this.ignoredAncestorsMarkers=[],this.withPrivate=!0}async execute(){const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:r}=await e.Project.find(t,this.context.cwd),n=await this.cdManager.findCandidates(r,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestor,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),o=this.groupManager.list(C(n)).map(e=>e.name);console.log(JSON.stringify(o))}}M.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints workspaces that should be utilized."}),o([i.Command.String("-s,--change-detection-strategy",{description:"Change detection strategy"})],M.prototype,"changeDetectionStrategy",void 0),o([i.Command.Boolean("-a,--ancestors",{description:"Perform operation over ancestors"})],M.prototype,"withAncestor",void 0),o([i.Command.Array("--ignored-ancestors-markers",{description:"The same as ignoredAncestorsMarkers"})],M.prototype,"ignoredAncestorsMarkers",void 0),o([i.Command.Boolean("--private",{description:"Include private workspaces"})],M.prototype,"withPrivate",void 0),o([i.Command.Path("workspaces","changed","list")],M.prototype,"execute",null);class j extends i.Command{constructor(){super(...arguments),this.args=[],this.withPrivate=!0,this.excludeList=[],this.includeList=[],this.isParallel=!1,this.withAncestor=!1,this.ignoredAncestorsMarkers=[],this.cdManager=new x}async execute(){const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:r}=await e.Project.find(t,this.context.cwd);this.validate(t);const n=await this.getAffectedList(r);if(0===n.length)return void console.dir("No affected workspaces.");const o=["workspaces","foreach","-it",...n];this.isParallel&&o.push("--parallel"),await this.cli.run([...o,this.commandName,...this.args])}async getAffectedList(e){const t=await this.cdManager.findCandidates(e,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestor,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),r=[];return t.forEach(e=>{this.excludeList.includes(e.name)||this.includeList.length>0&&!this.includeList.includes(e.name)||(r.push("--include"),r.push(e.name))}),r}validate(e){if(!e.plugins.has("@yarnpkg/plugin-workspace-tools"))throw new i.UsageError("You should install @yarnpkg/plugin-workspace-tools plugin to use this command.")}}j.usage=i.Command.Usage({category:"Workspace-related commands",description:"A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed @yarnpkg/plugin-workspace-tools plugin."}),o([i.Command.String()],j.prototype,"commandName",void 0),o([i.Command.Proxy()],j.prototype,"args",void 0),o([i.Command.Boolean("--private",{description:"Include private workspaces"})],j.prototype,"withPrivate",void 0),o([i.Command.Array("--exclude",{description:"Exclude specific workspaces"})],j.prototype,"excludeList",void 0),o([i.Command.Array("--include",{description:"Include specific workspaces"})],j.prototype,"includeList",void 0),o([i.Command.Boolean("-p,--parallel",{description:"Run the commands in parallel"})],j.prototype,"isParallel",void 0),o([i.Command.Boolean("-a,--ancestors",{description:"Perform operation over ancestors"})],j.prototype,"withAncestor",void 0),o([i.Command.Array("--ignored-ancestors-markers",{description:"The same as ignoredAncestorsMarkers"})],j.prototype,"ignoredAncestorsMarkers",void 0),o([i.Command.String("-s,--change-detection-strategy",{description:"Change detection strategy"})],j.prototype,"changeDetectionStrategy",void 0),o([i.Command.Path("workspaces","changed","foreach")],j.prototype,"execute",null);const R={configuration:{changeDetectionStrategy:{description:"Which source the plugin should use in order to determine workspaces changes.",type:e.SettingsType.STRING,isNullable:!1,default:t.baseRef,values:[t.baseRef,t.prevRef]},detectPrivates:{description:"Gather private workspaces into changed list.",type:e.SettingsType.BOOLEAN,isNullable:!1,default:!0},ignoredAncestorsMarkers:{description:"If ancestor workspace contains these files/directories it will be excluded from execution list.",type:e.SettingsType.STRING,isNullable:!1,isArray:!0,default:[]},preserveAncestors:{description:"Preserve ancestors of changed workspaces.",type:e.SettingsType.BOOLEAN,isNullable:!1,default:!1}},commands:[f,E,M,j]}})(),plugin=n})();
return plugin;
}
};