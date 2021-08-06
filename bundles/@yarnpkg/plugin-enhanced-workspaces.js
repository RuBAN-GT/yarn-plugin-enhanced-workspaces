/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-enhanced-workspaces",
factory: function (require) {
var plugin;(()=>{var e={397:e=>{e.exports=function(){"use strict";return function(e,t,n){var r,o;for(r=0,o=t.length;r<o&&!(e(t[r],n)>0);r++);return r}}()},346:e=>{e.exports=function(){"use strict";return function e(t,n){var r,o,i=n.length;return i>=2?(r=n.slice(0,i/2),o=n.slice(i/2,i),function(e,t,n){var r=[],o=t.length,i=n.length;for(;o>0&&i>0;)e(t[0],n[0])<=0?(r.push(t.shift()),o--):(r.push(n.shift()),i--);o>0?r.push.apply(r,t):r.push.apply(r,n);return r}(t,e(t,r),e(t,o))):n.slice()}}()},993:(e,t,n)=>{var r,o;r=n(346),o=n(397),e.exports=function(){"use strict";var e;function t(e){return function(){return e}}function n(e){e=e||{},this.config=e,this.config.childrenPropertyName=e.childrenPropertyName||"children",this.config.modelComparatorFn=e.modelComparatorFn}function i(e,t){return t.parent=e,e.children.push(t),t}function s(e,t){this.config=e,this.model=t,this.children=[]}function a(e){return"function"==typeof e.config.modelComparatorFn}function c(e,t,n){var r;if(!(t instanceof s))throw new TypeError("Child must be of type Node.");if(t.parent=e,e.model[e.config.childrenPropertyName]instanceof Array||(e.model[e.config.childrenPropertyName]=[]),a(e))r=o(e.config.modelComparatorFn,e.model[e.config.childrenPropertyName],t.model),e.model[e.config.childrenPropertyName].splice(r,0,t.model),e.children.splice(r,0,t);else if(void 0===n)e.model[e.config.childrenPropertyName].push(t.model),e.children.push(t);else{if(n<0||n>e.children.length)throw new Error("Invalid index.");e.model[e.config.childrenPropertyName].splice(n,0,t.model),e.children.splice(n,0,t)}return t}function l(){var t={};if(1===arguments.length?"function"==typeof arguments[0]?t.fn=arguments[0]:t.options=arguments[0]:2===arguments.length?"function"==typeof arguments[0]?(t.fn=arguments[0],t.ctx=arguments[1]):(t.options=arguments[0],t.fn=arguments[1]):(t.options=arguments[0],t.fn=arguments[1],t.ctx=arguments[2]),t.options=t.options||{},t.options.strategy||(t.options.strategy="pre"),!e[t.options.strategy])throw new Error("Unknown tree walk strategy. Valid strategies are 'pre' [default], 'post' and 'breadth'.");return t}return e={},n.prototype.parse=function(e){var t,n,o;if(!(e instanceof Object))throw new TypeError("Model must be of type object.");if(o=new s(this.config,e),e[this.config.childrenPropertyName]instanceof Array)for(this.config.modelComparatorFn&&(e[this.config.childrenPropertyName]=r(this.config.modelComparatorFn,e[this.config.childrenPropertyName])),t=0,n=e[this.config.childrenPropertyName].length;t<n;t++)i(o,this.parse(e[this.config.childrenPropertyName][t]));return o},s.prototype.isRoot=function(){return void 0===this.parent},s.prototype.hasChildren=function(){return this.children.length>0},s.prototype.addChild=function(e){return c(this,e)},s.prototype.addChildAtIndex=function(e,t){if(a(this))throw new Error("Cannot add child at index when using a comparator function.");return c(this,e,t)},s.prototype.setIndex=function(e){if(a(this))throw new Error("Cannot set node index when using a comparator function.");if(this.isRoot()){if(0===e)return this;throw new Error("Invalid index.")}if(e<0||e>=this.parent.children.length)throw new Error("Invalid index.");var t=this.parent.children.indexOf(this);return this.parent.children.splice(e,0,this.parent.children.splice(t,1)[0]),this.parent.model[this.parent.config.childrenPropertyName].splice(e,0,this.parent.model[this.parent.config.childrenPropertyName].splice(t,1)[0]),this},s.prototype.getPath=function(){var e=[];return function t(n){e.unshift(n),n.isRoot()||t(n.parent)}(this),e},s.prototype.getIndex=function(){return this.isRoot()?0:this.parent.children.indexOf(this)},s.prototype.walk=function(){var t;t=l.apply(this,arguments),e[t.options.strategy].call(this,t.fn,t.ctx)},e.pre=function e(t,n){var r,o,i;for(i=t.call(n,this),r=0,o=this.children.length;r<o;r++){if(!1===i)return!1;i=e.call(this.children[r],t,n)}return i},e.post=function e(t,n){var r,o;for(r=0,o=this.children.length;r<o;r++)if(!1===e.call(this.children[r],t,n))return!1;return t.call(n,this)},e.breadth=function(e,t){var n=[this];!function r(){var o,i,s;if(0!==n.length){for(o=0,i=(s=n.shift()).children.length;o<i;o++)n.push(s.children[o]);!1!==e.call(t,s)&&r()}}()},s.prototype.all=function(){var n,r=[];return(n=l.apply(this,arguments)).fn=n.fn||t(!0),e[n.options.strategy].call(this,(function(e){n.fn.call(n.ctx,e)&&r.push(e)}),n.ctx),r},s.prototype.first=function(){var n,r;return(n=l.apply(this,arguments)).fn=n.fn||t(!0),e[n.options.strategy].call(this,(function(e){if(n.fn.call(n.ctx,e))return r=e,!1}),n.ctx),r},s.prototype.drop=function(){var e;return this.isRoot()||(e=this.parent.children.indexOf(this),this.parent.children.splice(e,1),this.parent.model[this.config.childrenPropertyName].splice(e,1),this.parent=void 0,delete this.parent),this},n}()},269:function(e){e.exports=function(){function e(t,n,r,o,i,s,a){var c,l,p="",d=0,h=o.slice(0);if(h.push([n,r])&&o.length>0&&(o.forEach((function(e,t){t>0&&(p+=(e[1]?" ":"│")+"  "),l||e[0]!==n||(l=!0)})),p+=function(e,t){var n=t?"└":"├";return n+=e?"─ ":"──┐"}(t,r)+t,i&&("object"!=typeof n||n instanceof Date)&&(p+=": "+n),l&&(p+=" (circular ref.)"),a(p)),!l&&"object"==typeof n){var u=function(e,t){var n=[];for(var r in e)e.hasOwnProperty(r)&&(t&&"function"==typeof e[r]||n.push(r));return n}(n,s);u.forEach((function(t){c=++d===u.length,e(t,n[t],c,h,i,s,a)}))}}var t={asLines:function(t,n,r,o){e(".",t,!1,[],n,"function"!=typeof r&&r,o||r)},asTree:function(t,n,r){var o="";return e(".",t,!1,[],n,r,(function(e){o+=e+"\n"})),o}};return t}()}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{default:()=>A});const e=require("@yarnpkg/core");var t;!function(e){e.baseRef="base-ref",e.prevRef="prev-ref"}(t||(t={}));function o(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s}Object.create;Object.create;const i=require("clipanion");var s,a=n(269);function c(e){var t;const n=(null===(t=e.children)||void 0===t?void 0:t.length)>0?{}:null;return e.children.forEach(e=>{n[e.name]=c(e)}),n}!function(e){e.json="json",e.tree="tree"}(s||(s={}));class l extends class{constructor(){this.children=[]}get chain(){return this._chain}get depth(){return this._chain.size}addChildren(e){return this.children.push(e),this}generateChain(){var e;this._chain=new Set(null===(e=this.parent)||void 0===e?void 0:e.chain),this._chain.add(this.id)}}{constructor(e,t){super(),this.parent=t,this.workspace=e,this.generateChain()}get id(){return this.workspace.anchoredLocator}get name(){return this.workspace.manifest.raw.name}}class p{async resolve(e){return await e.restoreInstallState(),this.buildWorkspacesTree(e)}buildWorkspacesTree(e){const t=this.getEssentialWorkspaces(e);if(0===t.length)throw new Error("Project doesn't have any essentail workspaces");const n=new l(e.topLevelWorkspace);return t.forEach(t=>{const r=new l(t,n);this.fillChildrenNodes(e,r),n.addChildren(r)}),n}getWorkspacePackage(e,t){const n=e.storedPackages.get(t.anchoredLocator.locatorHash);if(!n)throw new Error("Unknown workspace");return n}getEssentialWorkspaces(e){return e.workspaces.filter(t=>t.locator.name!==e.topLevelWorkspace.locator.name&&0===this.getWorkspaceInternalDependencies(e,t).size)}getWorkspaceInternalDependencies(e,t){const n=this.getWorkspacePackage(e,t),r=new Set;return[...n.dependencies,...n.peerDependencies].forEach(([,t])=>{const n=e.tryWorkspaceByIdent(t);n&&r.add(n)}),r}getWorkspaceExternalDependencies(e,t){const n=e.workspaces.filter(n=>{const r=this.getWorkspacePackage(e,n);return r.dependencies.has(t.locator.identHash)||r.peerDependencies.has(t.locator.identHash)});return new Set(n)}fillChildrenNodes(e,t){this.getWorkspaceExternalDependencies(e,t.workspace).forEach(n=>{if(t.chain.has(n.anchoredLocator))return;const r=new l(n,t);t.addChildren(r),this.fillChildrenNodes(e,r)})}}var d=n(993),h=n.n(d);class u{constructor(e){this.root=e,this.tree=this.parseWorkspaceNode(e)}findNodesByIds(e){return this.tree.all(({model:t})=>e.has(t.id)).map(e=>e.model)}findNodesByWorkspaces(e){return this.tree.all(({model:t})=>e.includes(t.workspace)).map(e=>e.model)}parseWorkspaceNode(e){return(new(h())).parse(e)}}class f extends i.Command{constructor(){super(...arguments),this.workspaceResolver=new p,this.outputFormat=s.tree}async execute(){this.validateInput();const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await e.Project.find(t,this.context.cwd),r=await this.workspaceResolver.resolve(n);this.printTree(r)}validateInput(){if(!Object.keys(s).includes(this.outputFormat))throw new i.UsageError("Invalid --output-format option, can be 'json', 'tree'")}printTree(e){switch(this.outputFormat){case s.json:console.dir(JSON.stringify(function e(t){const n=[];return t.children.forEach(t=>{n.push(e(t))}),{name:t.name,children:n}}(e)));break;case s.tree:console.log((0,a.asTree)(function(e){return{[e.name]:c(e)}}(e),!1,!0))}}}async function g(t,n=[]){const r=await async function(t,n){const r=[];for(const o of n){const{code:n}=await e.execUtils.execvp("git",["merge-base",o,"HEAD"],{cwd:t,strict:!1});0===n&&r.push(o)}return r}(t,n);if(0===r.length)return"";const{stdout:o}=await e.execUtils.execvp("git",["merge-base","HEAD",...r],{cwd:t,strict:!1});return o.trim()}f.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints monitored workspaces graph"}),o([i.Command.String("-o,--output-format",{description:"Output format, can be 'json', 'tree'"})],f.prototype,"outputFormat",void 0),o([i.Command.Path("workspaces","graph")],f.prototype,"execute",null);const m=async t=>{const{projectCwd:n,baseRefs:r=[]}=t,o=await async function(t){const n={cwd:t,strict:!1},{stdout:r}=await e.execUtils.execvp("git",["describe","--tags","--abbrev=0"],n),o=r.trim();if(!o)return"";const{stdout:i}=await e.execUtils.execvp("git",["rev-list","-n","1",o],n);return i.trim()}(n);return{commit:o||await g(n,r)}},w=async t=>{const{projectCwd:n}=t,r={cwd:n,strict:!1},{stdout:o}=await e.execUtils.execvp("git",["rev-parse","HEAD^1"],r);return{commit:o.trim()}};const y=async e=>{const{configuration:n}=e,r=function(e){if(e===t.baseRef)return m;if(e===t.prevRef)return w;throw new Error("Unknown strategy "+e)}(n.get("changeDetectionStrategy"));return(await r({projectCwd:n.projectCwd,baseRefs:n.get("changesetBaseRefs")})).commit};const v=require("@yarnpkg/fslib"),k=(e,t)=>t.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>v.ppath.resolve(e,v.npath.toPortablePath(t)));class x{constructor(){this.workspaceResolver=new p}async findCandidates(e,t=!1){const n=[...await this.findAffectedWorkspaces(e)].filter(t=>t!==e.topLevelWorkspace);if(0===n.length)return new Map;const r=await this.workspaceResolver.resolve(e),o=new u(r),i=this.findAffectedNodes(o,n);return t?this.mixAncestorsNodes(o,i):i}async findAffectedWorkspaces(t){if(!t.configuration.projectCwd)throw new i.UsageError("Invalid project configuration.");const n=await y(t),r=await async function(t,n){const r=t.configuration.projectCwd,o=t.configuration.get("changesetIgnorePatterns")||[],i={cwd:r,strict:!0};let s=[];if(n){const{stdout:t}=await e.execUtils.execvp("git",["diff","--name-only",n],i);s=k(r,t)}const{stdout:a}=await e.execUtils.execvp("git",["ls-files","--others","--exclude-standard"],i),c=k(r,a),l=[...new Set([...s,...c].sort())],p=e.miscUtils.buildIgnorePattern(o);return p?l.filter(e=>!v.ppath.relative(t.cwd,e).match(p)):l}(t,n);return function(t,n){const r=e.miscUtils.mapAndFilter(n,n=>{const r=t.tryWorkspaceByFilePath(n);return null===r?e.miscUtils.mapAndFilter.skip:r});return new Set(r)}(t,r)}findAffectedNodes(e,t){const n=new Map;return e.findNodesByWorkspaces(t).forEach(e=>{const t=e.workspace.locator,r=n.get(t);(!r||r.depth<e.depth)&&n.set(t,e)}),n}mixAncestorsNodes(e,t){const n=new Map;return t.forEach(t=>{e.findNodesByIds(t.chain).forEach(e=>n.set(e.id,e))}),n}}function C(e){const t=[];return e.forEach(e=>{t.push(e)}),t}function b(e){const t=new Set;return e.forEach((e,n)=>{t.add(n)}),t}function P(e){const t=new Map;return e.forEach((e,n)=>{const r=t.get(e)||[];r.push(n),t.set(e,r)}),t}class E{resolve(e){const t=new Map;return this.fillSourceFragment(t,e),t}fillSourceFragment(e,[t,...n]){if(!t)return;if(!t.parent)return e.set(t,0),this.fillSourceFragment(e,n);const[r,o]=function(e,t){const n=function(e,t){let n=void 0;return e.chain.forEach(e=>{const r=t.find(t=>t.id===e);r&&(!n||r.depth>n.depth)&&(n=r)}),n}(t,[...b(e)]);return n?[e.get(n),n]:[0,void 0]}(e,t);o?e.set(t,r+1):e.set(t,0),n.length>0&&this.fillSourceFragment(e,n)}}class N{constructor(){this.rankResolver=new E}list(e){let t=[];return P(this.rankResolver.resolve(e)).forEach(e=>{t=t.concat(e)}),t}chunks(e){const{groupBy:t,input:n}=e;let r=[];return P(this.rankResolver.resolve(n)).forEach(e=>{const n=function(e,t){const n=Math.ceil(e.length/t),r=Array(n);for(let o=0;o<n;o++){const n=o*t;r[o]=e.slice(n,n+t)}return r}(e,t);r=r.concat(n)}),{groupBy:t,data:r}}}const j=require("os");class R extends i.Command{constructor(){super(...arguments),this.groupBy=Math.max(1,(0,j.cpus)().length/2),this.cdManager=new x,this.groupManager=new N}async execute(){this.validateInput();const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await e.Project.find(t,this.context.cwd),r=await this.cdManager.findCandidates(n),o=this.groupManager.chunks({groupBy:+this.groupBy,input:C(r)});var i;console.log(JSON.stringify({groupBy:(i=o).groupBy,data:i.data.map(e=>e.map(e=>e.name))}))}validateInput(){const e=+this.groupBy;if(isNaN(e)||e<=0)throw new i.UsageError("Invalid group-by option")}}R.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints affected workspaces collected by chunks"}),o([i.Command.String("-g,--group-by",{description:"Slice workspaces by this number, it should be positive number"})],R.prototype,"groupBy",void 0),o([i.Command.Path("workspaces","changed","chunks")],R.prototype,"execute",null);class S extends i.Command{constructor(){super(...arguments),this.cdManager=new x,this.groupManager=new N}async execute(){const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await e.Project.find(t,this.context.cwd),r=await this.cdManager.findCandidates(n),o=this.groupManager.list(C(r)).map(e=>e.name);console.log(JSON.stringify(o))}}S.usage=i.Command.Usage({category:"Workspace-related commands",description:"Prints workspaces that should be utilized."}),o([i.Command.Path("workspaces","changed","list")],S.prototype,"execute",null);class W extends i.Command{constructor(){super(...arguments),this.args=[],this.excludeList=[],this.includeList=[],this.isParallel=!1,this.withAncestor=!1,this.cdManager=new x}async execute(){const t=await e.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await e.Project.find(t,this.context.cwd);this.validate(t);const r=await this.getAffectedList(n);if(0===r.length)return void console.dir("No affected workspaces.");const o=["workspaces","foreach","-it",...r];this.isParallel&&o.push("--parallel"),await this.cli.run([...o,this.commandName,...this.args])}async getAffectedList(e){const t=await this.cdManager.findCandidates(e,this.withAncestor),n=[];return t.forEach(e=>{this.excludeList.includes(e.name)||this.includeList.length>0&&!this.includeList.includes(e.name)||(n.push("--include"),n.push(e.name))}),n}validate(e){if(!e.plugins.has("@yarnpkg/plugin-workspace-tools"))throw new i.UsageError("You should install @yarnpkg/plugin-workspace-tools plugin to use this command.")}}W.usage=i.Command.Usage({category:"Workspace-related commands",description:"A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed @yarnpkg/plugin-workspace-tools plugin."}),o([i.Command.String()],W.prototype,"commandName",void 0),o([i.Command.Proxy()],W.prototype,"args",void 0),o([i.Command.Array("--exclude",{description:"Exclude specific workspaces"})],W.prototype,"excludeList",void 0),o([i.Command.Array("--exclude",{description:"Include specific workspaces"})],W.prototype,"includeList",void 0),o([i.Command.Boolean("-p,--parallel",{description:"Run the commands in parallel"})],W.prototype,"isParallel",void 0),o([i.Command.Boolean("-a,--ancestor",{description:"Perform operation over ancestors"})],W.prototype,"withAncestor",void 0),o([i.Command.Path("workspaces","changed","foreach")],W.prototype,"execute",null);const A={configuration:{changeDetectionStrategy:{description:"Which source the plugin should use in order to determine workspaces changes.",type:e.SettingsType.STRING,isNullable:!1,default:t.baseRef,values:[t.baseRef,t.prevRef]}},commands:[f,R,S,W]}})(),plugin=r})();
return plugin;
}
};