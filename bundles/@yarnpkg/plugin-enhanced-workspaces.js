/* eslint-disable */
module.exports = {
name: "@yarnpkg/plugin-enhanced-workspaces",
factory: function (require) {
var plugin;(()=>{var e={397:e=>{e.exports=function(){"use strict";return function(e,t,n){var r,o;for(r=0,o=t.length;r<o&&!(e(t[r],n)>0);r++);return r}}()},346:e=>{e.exports=function(){"use strict";return function e(t,n){var r,o,i=n.length;return i>=2?(r=n.slice(0,i/2),o=n.slice(i/2,i),function(e,t,n){var r=[],o=t.length,i=n.length;for(;o>0&&i>0;)e(t[0],n[0])<=0?(r.push(t.shift()),o--):(r.push(n.shift()),i--);o>0?r.push.apply(r,t):r.push.apply(r,n);return r}(t,e(t,r),e(t,o))):n.slice()}}()},993:(e,t,n)=>{var r,o;r=n(346),o=n(397),e.exports=function(){"use strict";var e;function t(e){return function(){return e}}function n(e){e=e||{},this.config=e,this.config.childrenPropertyName=e.childrenPropertyName||"children",this.config.modelComparatorFn=e.modelComparatorFn}function i(e,t){return t.parent=e,e.children.push(t),t}function s(e,t){this.config=e,this.model=t,this.children=[]}function a(e){return"function"==typeof e.config.modelComparatorFn}function c(e,t,n){var r;if(!(t instanceof s))throw new TypeError("Child must be of type Node.");if(t.parent=e,e.model[e.config.childrenPropertyName]instanceof Array||(e.model[e.config.childrenPropertyName]=[]),a(e))r=o(e.config.modelComparatorFn,e.model[e.config.childrenPropertyName],t.model),e.model[e.config.childrenPropertyName].splice(r,0,t.model),e.children.splice(r,0,t);else if(void 0===n)e.model[e.config.childrenPropertyName].push(t.model),e.children.push(t);else{if(n<0||n>e.children.length)throw new Error("Invalid index.");e.model[e.config.childrenPropertyName].splice(n,0,t.model),e.children.splice(n,0,t)}return t}function l(){var t={};if(1===arguments.length?"function"==typeof arguments[0]?t.fn=arguments[0]:t.options=arguments[0]:2===arguments.length?"function"==typeof arguments[0]?(t.fn=arguments[0],t.ctx=arguments[1]):(t.options=arguments[0],t.fn=arguments[1]):(t.options=arguments[0],t.fn=arguments[1],t.ctx=arguments[2]),t.options=t.options||{},t.options.strategy||(t.options.strategy="pre"),!e[t.options.strategy])throw new Error("Unknown tree walk strategy. Valid strategies are 'pre' [default], 'post' and 'breadth'.");return t}return e={},n.prototype.parse=function(e){var t,n,o;if(!(e instanceof Object))throw new TypeError("Model must be of type object.");if(o=new s(this.config,e),e[this.config.childrenPropertyName]instanceof Array)for(this.config.modelComparatorFn&&(e[this.config.childrenPropertyName]=r(this.config.modelComparatorFn,e[this.config.childrenPropertyName])),t=0,n=e[this.config.childrenPropertyName].length;t<n;t++)i(o,this.parse(e[this.config.childrenPropertyName][t]));return o},s.prototype.isRoot=function(){return void 0===this.parent},s.prototype.hasChildren=function(){return this.children.length>0},s.prototype.addChild=function(e){return c(this,e)},s.prototype.addChildAtIndex=function(e,t){if(a(this))throw new Error("Cannot add child at index when using a comparator function.");return c(this,e,t)},s.prototype.setIndex=function(e){if(a(this))throw new Error("Cannot set node index when using a comparator function.");if(this.isRoot()){if(0===e)return this;throw new Error("Invalid index.")}if(e<0||e>=this.parent.children.length)throw new Error("Invalid index.");var t=this.parent.children.indexOf(this);return this.parent.children.splice(e,0,this.parent.children.splice(t,1)[0]),this.parent.model[this.parent.config.childrenPropertyName].splice(e,0,this.parent.model[this.parent.config.childrenPropertyName].splice(t,1)[0]),this},s.prototype.getPath=function(){var e=[];return function t(n){e.unshift(n),n.isRoot()||t(n.parent)}(this),e},s.prototype.getIndex=function(){return this.isRoot()?0:this.parent.children.indexOf(this)},s.prototype.walk=function(){var t;t=l.apply(this,arguments),e[t.options.strategy].call(this,t.fn,t.ctx)},e.pre=function e(t,n){var r,o,i;for(i=t.call(n,this),r=0,o=this.children.length;r<o;r++){if(!1===i)return!1;i=e.call(this.children[r],t,n)}return i},e.post=function e(t,n){var r,o;for(r=0,o=this.children.length;r<o;r++)if(!1===e.call(this.children[r],t,n))return!1;return t.call(n,this)},e.breadth=function(e,t){var n=[this];!function r(){var o,i,s;if(0!==n.length){for(o=0,i=(s=n.shift()).children.length;o<i;o++)n.push(s.children[o]);!1!==e.call(t,s)&&r()}}()},s.prototype.all=function(){var n,r=[];return(n=l.apply(this,arguments)).fn=n.fn||t(!0),e[n.options.strategy].call(this,(function(e){n.fn.call(n.ctx,e)&&r.push(e)}),n.ctx),r},s.prototype.first=function(){var n,r;return(n=l.apply(this,arguments)).fn=n.fn||t(!0),e[n.options.strategy].call(this,(function(e){if(n.fn.call(n.ctx,e))return r=e,!1}),n.ctx),r},s.prototype.drop=function(){var e;return this.isRoot()||(e=this.parent.children.indexOf(this),this.parent.children.splice(e,1),this.parent.model[this.config.childrenPropertyName].splice(e,1),this.parent=void 0,delete this.parent),this},n}()},269:function(e){e.exports=function(){function e(t,n,r,o,i,s,a){var c,l,p="",h=0,d=o.slice(0);if(d.push([n,r])&&o.length>0&&(o.forEach((function(e,t){t>0&&(p+=(e[1]?" ":"│")+"  "),l||e[0]!==n||(l=!0)})),p+=function(e,t){var n=t?"└":"├";return n+=e?"─ ":"──┐"}(t,r)+t,i&&("object"!=typeof n||n instanceof Date)&&(p+=": "+n),l&&(p+=" (circular ref.)"),a(p)),!l&&"object"==typeof n){var u=function(e,t){var n=[];for(var r in e)e.hasOwnProperty(r)&&(t&&"function"==typeof e[r]||n.push(r));return n}(n,s);u.forEach((function(t){c=++h===u.length,e(t,n[t],c,d,i,s,a)}))}}var t={asLines:function(t,n,r,o){e(".",t,!1,[],n,"function"!=typeof r&&r,o||r)},asTree:function(t,n,r){var o="";return e(".",t,!1,[],n,r,(function(e){o+=e+"\n"})),o}};return t}()}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r),n.d(r,{default:()=>S});function e(e,t,n,r){var o,i=arguments.length,s=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(i<3?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s}Object.create;Object.create;const t=require("@yarnpkg/core"),o=require("clipanion");var i,s=n(269);function a(e){var t;const n=(null===(t=e.children)||void 0===t?void 0:t.length)>0?{}:null;return e.children.forEach(e=>{n[e.name]=a(e)}),n}!function(e){e.json="json",e.tree="tree"}(i||(i={}));class c extends class{constructor(){this.children=[]}get chain(){return this._chain}get depth(){return this._chain.size}addChildren(e){return this.children.push(e),this}generateChain(){var e;this._chain=new Set(null===(e=this.parent)||void 0===e?void 0:e.chain),this._chain.add(this.id)}}{constructor(e,t){super(),this.parent=t,this.workspace=e,this.generateChain()}get id(){return this.workspace.anchoredLocator}get name(){return this.workspace.manifest.raw.name}}class l{async resolve(e){return await e.restoreInstallState(),this.buildWorkspacesTree(e)}buildWorkspacesTree(e){const t=this.getEssentialWorkspaces(e);if(0===t.length)throw new Error("Project doesn't have any essentail workspaces");const n=new c(e.topLevelWorkspace);return t.forEach(t=>{const r=new c(t,n);this.fillChildrenNodes(e,r),n.addChildren(r)}),n}getWorkspacePackage(e,t){const n=e.storedPackages.get(t.anchoredLocator.locatorHash);if(!n)throw new Error("Unknown workspace");return n}getEssentialWorkspaces(e){return e.workspaces.filter(t=>t.locator.name!==e.topLevelWorkspace.locator.name&&0===this.getWorkspaceInternalDependencies(e,t).size)}getWorkspaceInternalDependencies(e,t){const n=this.getWorkspacePackage(e,t),r=new Set;return[...n.dependencies,...n.peerDependencies].forEach(([,t])=>{const n=e.tryWorkspaceByIdent(t);n&&r.add(n)}),r}getWorkspaceExternalDependencies(e,t){const n=e.workspaces.filter(n=>{const r=this.getWorkspacePackage(e,n);return r.dependencies.has(t.locator.identHash)||r.peerDependencies.has(t.locator.identHash)});return new Set(n)}fillChildrenNodes(e,t){this.getWorkspaceExternalDependencies(e,t.workspace).forEach(n=>{if(t.chain.has(n.anchoredLocator))return;const r=new c(n,t);t.addChildren(r),this.fillChildrenNodes(e,r)})}}var p=n(993),h=n.n(p);class d{constructor(e){this.root=e,this.tree=this.parseWorkspaceNode(e)}findNodesByWorkspaces(e){return this.tree.all(({model:t})=>e.includes(t.workspace)).map(e=>e.model)}parseWorkspaceNode(e){return(new(h())).parse(e)}}class u extends o.Command{constructor(){super(...arguments),this.workspaceResolver=new l,this.outputFormat=i.tree}async execute(){this.validateInput();const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await t.Project.find(e,this.context.cwd),r=await this.workspaceResolver.resolve(n);this.printTree(r)}validateInput(){if(!Object.keys(i).includes(this.outputFormat))throw new o.UsageError("Invalid --output-format option, can be 'json', 'tree'")}printTree(e){switch(this.outputFormat){case i.json:console.dir(JSON.stringify(function e(t){const n=[];return t.children.forEach(t=>{n.push(e(t))}),{name:t.name,children:n}}(e)));break;case i.tree:console.log((0,s.asTree)(function(e){return{[e.name]:a(e)}}(e),!1,!0))}}}u.usage=o.Command.Usage({category:"Workspace-related commands",description:"Prints monitored workspaces graph"}),e([o.Command.String("-o,--output-format",{description:"Output format, can be 'json', 'tree'"})],u.prototype,"outputFormat",void 0),e([o.Command.Path("workspaces","graph")],u.prototype,"execute",null);const f=require("@yarnpkg/fslib"),g=require("@yarnpkg/parsers");require("semver");var m;async function w(e,{allowEmpty:n=!1}={}){const r=e.configuration;if(null===r.projectCwd)throw new o.UsageError("This command can only be run from within a Yarn project");const i=await async function(e){let t,n=null,r=e;do{t=r,await f.xfs.existsPromise(f.ppath.join(t,".git"))&&(n=t),r=f.ppath.dirname(t)}while(null===n&&r!==t);return n}(r.projectCwd),s=null!==i?await async function(e,{baseRefs:n}){if(0===n.length)throw new o.UsageError("Can't run this command with zero base refs specified.");const r=[];for(const o of n){const{code:n}=await t.execUtils.execvp("git",["merge-base",o,"HEAD"],{cwd:e});0===n&&r.push(o)}if(0===r.length)throw new o.UsageError("No ancestor could be found between any of HEAD and "+n.join(", "));const{stdout:i}=await t.execUtils.execvp("git",["merge-base","HEAD",...r],{cwd:e,strict:!0}),s=i.trim(),{stdout:a}=await t.execUtils.execvp("git",["show","--quiet","--pretty=format:%s",s],{cwd:e,strict:!0});return{hash:s,title:a.trim()}}(i,{baseRefs:r.get("changesetBaseRefs")}):null,a=null!==i?await async function(e,{base:n,project:r}){const o=t.miscUtils.buildIgnorePattern(r.configuration.get("changesetIgnorePatterns")),{stdout:i}=await t.execUtils.execvp("git",["diff","--name-only",""+n],{cwd:e,strict:!0}),s=i.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>f.ppath.resolve(e,f.npath.toPortablePath(t))),{stdout:a}=await t.execUtils.execvp("git",["ls-files","--others","--exclude-standard"],{cwd:e,strict:!0}),c=a.split(/\r\n|\r|\n/).filter(e=>e.length>0).map(t=>f.ppath.resolve(e,f.npath.toPortablePath(t))),l=[...new Set([...s,...c].sort())];return o?l.filter(e=>!f.ppath.relative(r.cwd,e).match(o)):l}(i,{base:s.hash,project:e}):[],c=r.get("deferredVersionFolder"),l=a.filter(e=>null!==f.ppath.contains(c,e));if(l.length>1)throw new o.UsageError("Your current branch contains multiple versioning files; this isn't supported:\n- "+l.join("\n- "));const p=new Set(t.miscUtils.mapAndFilter(a,n=>{const r=e.tryWorkspaceByFilePath(n);return null===r?t.miscUtils.mapAndFilter.skip:r}));if(0===l.length&&0===p.size&&!n)return null;const h=1===l.length?l[0]:f.ppath.join(c,t.hashUtils.makeHash(Math.random().toString()).slice(0,8)+".yml"),d=f.xfs.existsSync(h)?await f.xfs.readFilePromise(h,"utf8"):"{}",u=(0,g.parseSyml)(d),w=new Map;for(const n of u.declined||[]){const r=t.structUtils.parseIdent(n),o=e.getWorkspaceByIdent(r);w.set(o,m.DECLINE)}for(const[n,r]of Object.entries(u.releases||{})){const o=t.structUtils.parseIdent(n),i=e.getWorkspaceByIdent(o);w.set(i,r)}return{project:e,root:i,baseHash:null!==s?s.hash:null,baseTitle:null!==s?s.title:null,changedFiles:new Set(a),changedWorkspaces:p,releaseRoots:new Set([...p].filter(e=>null!==e.manifest.version)),releases:w,async saveAll(){const n={},r=[],o=[];for(const i of e.workspaces){if(null===i.manifest.version)continue;const e=t.structUtils.stringifyIdent(i.locator),s=w.get(i);s===m.DECLINE?r.push(e):void 0!==s?n[e]=s:p.has(i)&&o.push(e)}await f.xfs.mkdirPromise(f.ppath.dirname(h),{recursive:!0}),await f.xfs.changeFilePromise(h,(0,g.stringifySyml)(new g.stringifySyml.PreserveOrdering({releases:Object.keys(n).length>0?n:void 0,declined:r.length>0?r:void 0,undecided:o.length>0?o:void 0})))}}}!function(e){e.UNDECIDED="undecided",e.DECLINE="decline",e.MAJOR="major",e.MINOR="minor",e.PATCH="patch",e.PRERELEASE="prerelease"}(m||(m={}));class y extends Error{constructor(){super("No changes")}}class v{constructor(){this.workspaceResolver=new l}async findCandidates(e){const t=await this.workspaceResolver.resolve(e),n=new d(t),r=[...(await this.generateVersionFile(e)).changedWorkspaces].filter(t=>t!==e.topLevelWorkspace);return this.findAffectedNodes(n,r)}async generateVersionFile(e){const t=await w(e);if(!t)throw new y;return t}findAffectedNodes(e,t){const n=new Map;return e.findNodesByWorkspaces(t).forEach(e=>{const t=e.workspace.locator,r=n.get(t);(!r||r.depth<e.depth)&&n.set(t,e)}),n}}function k(e){const t=[];return e.forEach(e=>{t.push(e)}),t}function x(e){const t=new Set;return e.forEach((e,n)=>{t.add(n)}),t}class P{resolve(e){const t=new Map;return this.fillSourceFragment(t,e),t}fillSourceFragment(e,[t,...n]){if(!t)return;if(!t.parent)return e.set(t,0),this.fillSourceFragment(e,n);const[r,o]=function(e,t){const n=function(e,t){let n=void 0;return e.chain.forEach(e=>{const r=t.find(t=>t.id===e);r&&(!n||r.depth>n.depth)&&(n=r)}),n}(t,[...x(e)]);return n?[e.get(n),n]:[0,void 0]}(e,t);o?e.set(t,r+1):e.set(t,0),n.length>0&&this.fillSourceFragment(e,n)}}class b{constructor(){this.rankResolver=new P}flatGroups(e){const{groupBy:t,input:n}=e;let r=[];return function(e){const t=new Map;return e.forEach((e,n)=>{const r=t.get(e)||[];r.push(n),t.set(e,r)}),t}(this.rankResolver.resolve(n)).forEach(e=>{const n=function(e,t){const n=Math.ceil(e.length/t),r=Array(n);for(let o=0;o<n;o++){const n=o*t;r[o]=e.slice(n,n+t)}return r}(e,t);r=[...r,...n]}),{groupBy:t,groups:r}}}const C=require("os");class E extends o.Command{constructor(){super(...arguments),this.groupBy=Math.max(1,(0,C.cpus)().length/2),this.versionManager=new v,this.groupManager=new b}async execute(){this.validateInput();const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await t.Project.find(e,this.context.cwd),r=await this.versionManager.findCandidates(n),o=this.groupManager.flatGroups({groupBy:+this.groupBy,input:k(r)});var i;console.dir(JSON.stringify({groupBy:(i=o).groupBy,groups:i.groups.map(e=>e.map(e=>e.name))}))}validateInput(){const e=+this.groupBy;if(isNaN(e)||e<=0)throw new o.UsageError("Invalid group-by option")}}E.usage=o.Command.Usage({category:"Workspace-related commands",description:"Prints affected workspaces collected by chunks"}),e([o.Command.String("-g,--group-by",{description:"Slice workspaces by this number, it should be positive number"})],E.prototype,"groupBy",void 0),e([o.Command.Path("workspaces","changed","chunks")],E.prototype,"execute",null);class j extends o.Command{constructor(){super(...arguments),this.verbose=!1,this.versionManager=new v}async execute(){const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await t.Project.find(e,this.context.cwd),r=await this.versionManager.findCandidates(n);if(0===r.size)return void console.dir("No affected workspaces.");const o=[];r.forEach(e=>{if(this.verbose){const t=[...e.chain].map(e=>{const{manifest:t}=n.getWorkspaceByLocator(e);return t.raw.name});o.push(t)}else o.push([e.name])}),console.dir("Affected chains:"),o.forEach(e=>console.dir(e.join(" → ")))}}j.usage=o.Command.Usage({category:"Workspace-related commands",description:"Prints workspaces that should be utilized."}),e([o.Command.Boolean("-v,--verbose",{description:"Print detailed workspaces parent chunks"})],j.prototype,"verbose",void 0),e([o.Command.Path("workspaces","changed","list")],j.prototype,"execute",null);class N extends o.Command{constructor(){super(...arguments),this.args=[],this.excludeList=[],this.includeList=[],this.isParallel=!1,this.versionManager=new v}async execute(){const e=await t.Configuration.find(this.context.cwd,this.context.plugins),{project:n}=await t.Project.find(e,this.context.cwd);this.validate(e);const r=await this.getAffectedList(n);if(0===r.length)return void console.dir("No affected workspaces.");const o=["workspaces","foreach","-it",...r];this.isParallel&&o.push("--parallel"),await this.cli.run([...o,this.commandName,...this.args])}async getAffectedList(e){const t=await this.versionManager.findCandidates(e),n=[];return t.forEach(e=>{this.excludeList.includes(e.name)||this.includeList.length>0&&!this.includeList.includes(e.name)||(n.push("--include"),n.push(e.name))}),n}validate(e){if(!e.plugins.has("@yarnpkg/plugin-workspace-tools"))throw new o.UsageError("You should install @yarnpkg/plugin-workspace-tools plugin to use this command.")}}N.usage=o.Command.Usage({category:"Workspace-related commands",description:"A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed @yarnpkg/plugin-workspace-tools plugin."}),e([o.Command.String()],N.prototype,"commandName",void 0),e([o.Command.Proxy()],N.prototype,"args",void 0),e([o.Command.Array("--exclude",{description:"Exclude specific workspaces"})],N.prototype,"excludeList",void 0),e([o.Command.Array("--exclude",{description:"Include specific workspaces"})],N.prototype,"includeList",void 0),e([o.Command.Boolean("-p,--parallel",{description:"Run the commands in parallel"})],N.prototype,"isParallel",void 0),e([o.Command.Path("workspaces","changed","foreach")],N.prototype,"execute",null);const S={commands:[u,E,j,N]}})(),plugin=r})();
return plugin;
}
};