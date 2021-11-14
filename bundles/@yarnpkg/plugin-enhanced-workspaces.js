/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@yarnpkg/plugin-enhanced-workspaces",
factory: function (require) {
var plugin=(()=>{var Oe=Object.create,G=Object.defineProperty;var Fe=Object.getOwnPropertyDescriptor;var Je=Object.getOwnPropertyNames;var He=Object.getPrototypeOf,Ke=Object.prototype.hasOwnProperty;var _e=n=>G(n,"__esModule",{value:!0});var u=n=>{if(typeof require!="undefined")return require(n);throw new Error('Dynamic require of "'+n+'" is not supported')};var U=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),Ve=(n,e)=>{for(var t in e)G(n,t,{get:e[t],enumerable:!0})},qe=(n,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Je(e))!Ke.call(n,s)&&s!=="default"&&G(n,s,{get:()=>e[s],enumerable:!(t=Fe(e,s))||t.enumerable});return n},f=n=>qe(_e(G(n!=null?Oe(He(n)):{},"default",n&&n.__esModule&&"default"in n?{get:()=>n.default,enumerable:!0}:{value:n,enumerable:!0})),n);var X=U((H,Y)=>{(function(n,e){typeof H=="object"?Y.exports=e():typeof define=="function"&&define.amd?define(e):n.treeify=e()})(H,function(){function n(o,i){var c=i?"\u2514":"\u251C";return o?c+="\u2500 ":c+="\u2500\u2500\u2510",c}function e(o,i){var c=[];for(var l in o)!o.hasOwnProperty(l)||i&&typeof o[l]=="function"||c.push(l);return c}function t(o,i,c,l,r,a,p){var d="",k=0,g,y,b=l.slice(0);if(b.push([i,c])&&l.length>0&&(l.forEach(function(C,Ue){Ue>0&&(d+=(C[1]?" ":"\u2502")+"  "),!y&&C[0]===i&&(y=!0)}),d+=n(o,c)+o,r&&(typeof i!="object"||i instanceof Date)&&(d+=": "+i),y&&(d+=" (circular ref.)"),p(d)),!y&&typeof i=="object"){var Q=e(i,a);Q.forEach(function(C){g=++k===Q.length,t(C,i[C],g,b,r,a,p)})}}var s={};return s.asLines=function(o,i,c,l){var r=typeof c!="function"?c:!1;t(".",o,!1,[],i,r,l||c)},s.asTree=function(o,i,c){var l="";return t(".",o,!1,[],i,c,function(r){l+=r+`
`}),l},s})});var re=U((dt,te)=>{te.exports=function(){"use strict";function n(t,s){var o=s.length,i,c;return o>=2?(i=s.slice(0,o/2),c=s.slice(o/2,o),e(t,n(t,i),n(t,c))):s.slice()}function e(t,s,o){for(var i=[],c=s.length,l=o.length;c>0&&l>0;)t(s[0],o[0])<=0?(i.push(s.shift()),c--):(i.push(o.shift()),l--);return c>0?i.push.apply(i,s):i.push.apply(i,o),i}return n}()});var ne=U((lt,oe)=>{oe.exports=function(){"use strict";function n(e,t,s){var o,i;for(o=0,i=t.length;o<i&&!(e(t[o],s)>0);o++);return o}return n}()});var ce=U((ft,ae)=>{var se,ie;se=re();ie=ne();ae.exports=function(){"use strict";var n;n={};function e(r){return function(){return r}}function t(r){r=r||{},this.config=r,this.config.childrenPropertyName=r.childrenPropertyName||"children",this.config.modelComparatorFn=r.modelComparatorFn}function s(r,a){return a.parent=r,r.children.push(a),a}function o(r,a){this.config=r,this.model=a,this.children=[]}t.prototype.parse=function(r){var a,p,d;if(!(r instanceof Object))throw new TypeError("Model must be of type object.");if(d=new o(this.config,r),r[this.config.childrenPropertyName]instanceof Array)for(this.config.modelComparatorFn&&(r[this.config.childrenPropertyName]=se(this.config.modelComparatorFn,r[this.config.childrenPropertyName])),a=0,p=r[this.config.childrenPropertyName].length;a<p;a++)s(d,this.parse(r[this.config.childrenPropertyName][a]));return d};function i(r){return typeof r.config.modelComparatorFn=="function"}o.prototype.isRoot=function(){return this.parent===void 0},o.prototype.hasChildren=function(){return this.children.length>0};function c(r,a,p){var d;if(!(a instanceof o))throw new TypeError("Child must be of type Node.");if(a.parent=r,r.model[r.config.childrenPropertyName]instanceof Array||(r.model[r.config.childrenPropertyName]=[]),i(r))d=ie(r.config.modelComparatorFn,r.model[r.config.childrenPropertyName],a.model),r.model[r.config.childrenPropertyName].splice(d,0,a.model),r.children.splice(d,0,a);else if(p===void 0)r.model[r.config.childrenPropertyName].push(a.model),r.children.push(a);else{if(p<0||p>r.children.length)throw new Error("Invalid index.");r.model[r.config.childrenPropertyName].splice(p,0,a.model),r.children.splice(p,0,a)}return a}o.prototype.addChild=function(r){return c(this,r)},o.prototype.addChildAtIndex=function(r,a){if(i(this))throw new Error("Cannot add child at index when using a comparator function.");return c(this,r,a)},o.prototype.setIndex=function(r){if(i(this))throw new Error("Cannot set node index when using a comparator function.");if(this.isRoot()){if(r===0)return this;throw new Error("Invalid index.")}if(r<0||r>=this.parent.children.length)throw new Error("Invalid index.");var a=this.parent.children.indexOf(this);return this.parent.children.splice(r,0,this.parent.children.splice(a,1)[0]),this.parent.model[this.parent.config.childrenPropertyName].splice(r,0,this.parent.model[this.parent.config.childrenPropertyName].splice(a,1)[0]),this},o.prototype.getPath=function(){var r=[];return function a(p){r.unshift(p),p.isRoot()||a(p.parent)}(this),r},o.prototype.getIndex=function(){return this.isRoot()?0:this.parent.children.indexOf(this)};function l(){var r={};if(arguments.length===1?typeof arguments[0]=="function"?r.fn=arguments[0]:r.options=arguments[0]:arguments.length===2?typeof arguments[0]=="function"?(r.fn=arguments[0],r.ctx=arguments[1]):(r.options=arguments[0],r.fn=arguments[1]):(r.options=arguments[0],r.fn=arguments[1],r.ctx=arguments[2]),r.options=r.options||{},r.options.strategy||(r.options.strategy="pre"),!n[r.options.strategy])throw new Error("Unknown tree walk strategy. Valid strategies are 'pre' [default], 'post' and 'breadth'.");return r}return o.prototype.walk=function(){var r;r=l.apply(this,arguments),n[r.options.strategy].call(this,r.fn,r.ctx)},n.pre=function r(a,p){var d,k,g;for(g=a.call(p,this),d=0,k=this.children.length;d<k;d++){if(g===!1)return!1;g=r.call(this.children[d],a,p)}return g},n.post=function r(a,p){var d,k,g;for(d=0,k=this.children.length;d<k;d++)if(g=r.call(this.children[d],a,p),g===!1)return!1;return g=a.call(p,this),g},n.breadth=function(a,p){var d=[this];(function k(){var g,y,b;if(d.length!==0){for(b=d.shift(),g=0,y=b.children.length;g<y;g++)d.push(b.children[g]);a.call(p,b)!==!1&&k()}})()},o.prototype.all=function(){var r,a=[];return r=l.apply(this,arguments),r.fn=r.fn||e(!0),n[r.options.strategy].call(this,function(p){r.fn.call(r.ctx,p)&&a.push(p)},r.ctx),a},o.prototype.first=function(){var r,a;return r=l.apply(this,arguments),r.fn=r.fn||e(!0),n[r.options.strategy].call(this,function(p){if(r.fn.call(r.ctx,p))return a=p,!1},r.ctx),a},o.prototype.drop=function(){var r;return this.isRoot()||(r=this.parent.children.indexOf(this),this.parent.children.splice(r,1),this.parent.model[this.config.childrenPropertyName].splice(r,1),this.parent=void 0,delete this.parent),this},t}()});var Ze={};Ve(Ze,{default:()=>Xe});var j=f(u("@yarnpkg/core"));var h;(function(t){t.baseRef="base-ref",t.prevRef="prev-ref"})(h||(h={}));var le=f(u("@yarnpkg/core")),R=f(u("clipanion")),fe=f(u("@yarnpkg/core")),ue=f(X()),ge=f(u("typanion"));var N;(function(t){t.json="json",t.tree="tree"})(N||(N={}));var K=class{constructor(){this.children=[]}get chain(){return this._chain}get depth(){return this._chain.size}addChildren(e){return this.children.push(e),this}generateChain(){var e;this._chain=new Set((e=this.parent)==null?void 0:e.chain),this._chain.add(this.id)}};var M=class extends K{constructor(e,t){super();this.parent=t,this.workspace=e,this.generateChain()}get id(){return this.workspace.anchoredLocator}get name(){return this.workspace.manifest.raw.name}};function _(n){let e=[];return n.children.forEach(t=>{e.push(_(t))}),{name:n.name,children:e}}function Z(n){var t;let e=((t=n.children)==null?void 0:t.length)>0?{}:null;return n.children.forEach(s=>{e[s.name]=Z(s)}),e}function ee(n){return{[n.name]:Z(n)}}var T=class{async resolve(e){return await e.restoreInstallState(),this.buildWorkspacesTree(e)}buildWorkspacesTree(e){let t=this.getEssentialWorkspaces(e);if(t.length===0)throw new Error("Project doesn't have any essentail workspaces");let s=new M(e.topLevelWorkspace);return t.forEach(o=>{let i=new M(o,s);this.fillChildrenNodes(e,i),s.addChildren(i)}),s}getWorkspacePackage(e,t){let s=e.storedPackages.get(t.anchoredLocator.locatorHash);if(!s)throw new Error("Unknown workspace");return s}getEssentialWorkspaces(e){return e.workspaces.filter(t=>t.locator.name===e.topLevelWorkspace.locator.name?!1:this.getWorkspaceInternalDependencies(e,t).size===0)}getWorkspaceInternalDependencies(e,t){let s=this.getWorkspacePackage(e,t),o=new Set;return[...s.dependencies,...s.peerDependencies].forEach(([,i])=>{let c=e.tryWorkspaceByIdent(i);c&&o.add(c)}),o}getWorkspaceExternalDependencies(e,t){let s=e.workspaces.filter(o=>{let i=this.getWorkspacePackage(e,o);return i.dependencies.has(t.locator.identHash)||i.peerDependencies.has(t.locator.identHash)});return new Set(s)}fillChildrenNodes(e,t){this.getWorkspaceExternalDependencies(e,t.workspace).forEach(o=>{if(t.chain.has(o.anchoredLocator))return;let i=new M(o,t);t.addChildren(i),this.fillChildrenNodes(e,i)})}};var pe=f(ce()),V=class{constructor(e){this.root=e,this.tree=this.parseWorkspaceNode(e)}findNodesByIds(e){return this.tree.all(({model:t})=>e.has(t.id)).map(t=>t.model)}findNodesByWorkspaces(e){return this.tree.all(({model:s})=>e.includes(s.workspace)).map(s=>s.model)}parseWorkspaceNode(e){return new pe.default().parse(e)}};function de(n,e){let t;return n.chain.forEach(s=>{let o=e.find(i=>i.id===s);o&&(!t||o.depth>t.depth)&&(t=o)}),t}var W=class extends R.Command{constructor(){super(...arguments);this.outputFormat=R.Option.String("-o,--output-format",N.tree,{description:"Output format, can be 'json', 'tree'",validator:(0,ge.isEnum)(N)});this.workspaceResolver=new T}async execute(){let e=await fe.Configuration.find(this.context.cwd,this.context.plugins),{project:t}=await le.Project.find(e,this.context.cwd),s=await this.workspaceResolver.resolve(t);this.printTree(s)}printTree(e){switch(this.outputFormat){case N.json:{console.log(JSON.stringify(_(e)));break}case N.tree:{console.log((0,ue.asTree)(ee(e),!1,!0));break}}}};W.paths=[["workspaces","graph"]],W.usage=R.Command.Usage({category:"Workspace-related commands",description:"Prints monitored workspaces graph"});var Ae=f(u("@yarnpkg/core")),w=f(u("clipanion")),Se=f(u("@yarnpkg/core")),v=f(u("typanion"));var xe=f(u("clipanion"));var D=f(u("@yarnpkg/core"));async function $e(n){let e={cwd:n,strict:!1},{stdout:t}=await D.execUtils.execvp("git",["describe","--tags","--abbrev=0"],e),s=t.trim();if(!s)return"";let{stdout:o}=await D.execUtils.execvp("git",["rev-list","-n","1",s],e);return o.trim()}async function ze(n,e){let t=[];for(let s of e){let{code:o}=await D.execUtils.execvp("git",["merge-base",s,"HEAD"],{cwd:n,strict:!1});o===0&&t.push(s)}return t}async function Qe(n,e=[]){let t=await ze(n,e);if(t.length===0)return"";let{stdout:s}=await D.execUtils.execvp("git",["merge-base","HEAD",...t],{cwd:n,strict:!1});return s.trim()}var he=async n=>{let{projectCwd:e,baseRefs:t=[]}=n,s=await $e(e);return{commit:s||await Qe(e,t)}};var me=f(u("@yarnpkg/core")),ke=async n=>{let{projectCwd:e}=n,t={cwd:e,strict:!1},{stdout:s}=await me.execUtils.execvp("git",["rev-parse","HEAD^1"],t);return{commit:s.trim()}};function ye(n){if(n===h.baseRef)return he;if(n===h.prevRef)return ke;throw new Error(`Unknown strategy ${n}`)}async function we(n,e){let{configuration:t}=n;return e||(e=t.get("changeDetectionStrategy")),(await ye(e)({projectCwd:t.projectCwd,baseRefs:t.get("changesetBaseRefs")})).commit}var q=f(u("@yarnpkg/core"));function ve(n,e){let t=q.miscUtils.mapAndFilter(e,s=>{let o=n.tryWorkspaceByFilePath(s);return o===null?q.miscUtils.mapAndFilter.skip:o});return new Set(t)}var A=f(u("@yarnpkg/core")),S=f(u("@yarnpkg/fslib")),Pe=(n,e)=>e.split(/\r\n|\r|\n/).filter(t=>t.length>0).map(t=>S.ppath.resolve(n,S.npath.toPortablePath(t)));async function be(n,e){let t=n.configuration.projectCwd,s=n.configuration.get("changesetIgnorePatterns")||[],o={cwd:t,strict:!0},i=[];if(e){let{stdout:p}=await A.execUtils.execvp("git",["diff","--name-only",e],o);i=Pe(t,p)}let{stdout:c}=await A.execUtils.execvp("git",["ls-files","--others","--exclude-standard"],o),l=Pe(t,c),r=[...new Set([...i,...l].sort())],a=A.miscUtils.buildIgnorePattern(s);return a?r.filter(p=>!S.ppath.relative(n.cwd,p).match(a)):r}var O=f(u("@yarnpkg/fslib"));function Ne(n,e){if(!e||e.length===0)return!1;let{workspace:t}=n;return e.some(s=>{let o=O.ppath.join(t.cwd,s);return O.xfs.existsSync(o)})}var x=class{constructor(){this.workspaceResolver=new T}async findCandidates(e,t={}){let{topLevelWorkspace:s,configuration:o}=e,{ignoredAncestorsMarkers:i,withAncestor:c,withPrivate:l}=t,r=await this.findAffectedWorkspaces(e,t.changeDetectionStrategy);l=l===void 0?o.get("detectPrivates"):l;let a=[...r].filter(g=>g===s?!1:!g.manifest.private||l);if(a.length===0)return new Map;let p=await this.workspaceResolver.resolve(e),d=new V(p),k=this.findAffectedNodes(d,a);if(c=c===void 0?o.get("preserveAncestors"):c,c){i=i||[];let g=o.get("ignoredAncestorsMarkers")||[],y=this.mixAncestorsNodes(d,k,i.concat(g));return y.delete(p.workspace.locator),y}else return k}async findAffectedWorkspaces(e,t){if(!e.configuration.projectCwd)throw new xe.UsageError("Invalid project configuration.");let s=await we(e,t),o=await be(e,s);return ve(e,o)}findAffectedNodes(e,t){let s=new Map;return e.findNodesByWorkspaces(t).forEach(o=>{let i=o.workspace.locator,c=s.get(i);(!c||c.depth<o.depth)&&s.set(i,o)}),s}mixAncestorsNodes(e,t,s=[]){let o=new Map;return t.forEach(i=>{e.findNodesByIds(i.chain).forEach(c=>{(t.has(c.workspace.locator)||!Ne(c,s))&&o.set(c.workspace.locator,c)})}),o}};function Ce(n,e){let t=Math.ceil(n.length/e),s=Array(t);for(let o=0;o<t;o++){let i=o*e;s[o]=n.slice(i,i+e)}return s}function F(n){let e=[];return n.forEach(t=>{e.push(t)}),e}function Me(n){let e=new Set;return n.forEach((t,s)=>{e.add(s)}),e}function $(n){let e=new Map;return n.forEach((t,s)=>{let o=e.get(t)||[];o.push(s),e.set(t,o)}),e}function Te(n,e){let t=de(e,[...Me(n)]);return t?[n.get(t),t]:[0,void 0]}var z=class{resolve(e){let t=new Map;return this.fillSourceFragment(t,e),t}fillSourceFragment(e,[t,...s]){if(!t)return;if(!t.parent)return e.set(t,0),this.fillSourceFragment(e,s);let[o,i]=Te(e,t);i?e.set(t,o+1):e.set(t,0),s.length>0&&this.fillSourceFragment(e,s)}};var E=class{constructor(){this.rankResolver=new z}list(e){let t=[],s=this.rankResolver.resolve(e);return $(s).forEach(o=>{t=t.concat(o)}),t}chunks(e){let{groupBy:t,input:s}=e,o=[],i=this.rankResolver.resolve(s);return $(i).forEach(c=>{let l=Ce(c,t);o=o.concat(l)}),{groupBy:t,data:o}}};function Re(n){return{groupBy:n.groupBy,data:n.data.map(e=>e.map(t=>t.name))}}var We=f(u("os")),De=()=>Math.max(1,(0,We.cpus)().length/2);var I=class extends w.Command{constructor(){super(...arguments);this.groupBy=w.Option.String("-g,--group-by",De().toString(),{description:"Slice workspaces by this number, it should be positive number",validator:(0,v.applyCascade)((0,v.isNumber)(),[(0,v.isAtLeast)(1)])});this.changeDetectionStrategy=w.Option.String("-s,--change-detection-strategy",{description:"Change detection strategy",validator:(0,v.isEnum)(h)});this.withAncestors=w.Option.Boolean("-a,--ancestors",!1,{description:"Perform operation over ancestors"});this.ignoredAncestorsMarkers=w.Option.Array("--ignored-ancestors-markers",[],{description:"The same as ignoredAncestorsMarkers"});this.withPrivate=w.Option.Boolean("--private",!0,{description:"Include private workspaces"});this.cdManager=new x;this.groupManager=new E}async execute(){let e=await Se.Configuration.find(this.context.cwd,this.context.plugins),{project:t}=await Ae.Project.find(e,this.context.cwd),s=await this.cdManager.findCandidates(t,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestors,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),o=this.groupManager.chunks({groupBy:+this.groupBy,input:F(s)});console.log(JSON.stringify(Re(o)))}};I.paths=[["workspaces","changed","chunks"]],I.usage=w.Command.Usage({category:"Workspace-related commands",description:"Prints affected workspaces collected by chunks"});var Ee=f(u("@yarnpkg/core")),P=f(u("clipanion")),Ie=f(u("@yarnpkg/core")),Be=f(u("typanion"));var B=class extends P.Command{constructor(){super(...arguments);this.changeDetectionStrategy=P.Option.String("-s,--change-detection-strategy",{description:"Change detection strategy",validator:(0,Be.isEnum)(h)});this.withAncestors=P.Option.Boolean("-a,--ancestors",!1,{description:"Perform operation over ancestors"});this.ignoredAncestorsMarkers=P.Option.Array("--ignored-ancestors-markers",[],{description:"The same as ignoredAncestorsMarkers"});this.withPrivate=P.Option.Boolean("--private",!0,{description:"Include private workspaces"});this.cdManager=new x;this.groupManager=new E}async execute(){let e=await Ie.Configuration.find(this.context.cwd,this.context.plugins),{project:t}=await Ee.Project.find(e,this.context.cwd),s=await this.cdManager.findCandidates(t,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestors,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),o=this.groupManager.list(F(s)).map(i=>i.name);console.log(JSON.stringify(o))}};B.paths=[["workspaces","changed","list"]],B.usage=P.Command.Usage({category:"Workspace-related commands",description:"Prints workspaces that should be utilized."});var Le=f(u("@yarnpkg/core")),m=f(u("clipanion")),je=f(u("@yarnpkg/core")),Ge=f(u("typanion"));var J="@yarnpkg/plugin-workspace-tools";var L=class extends m.Command{constructor(){super(...arguments);this.commandName=m.Option.String();this.args=m.Option.Proxy()||[];this.changeDetectionStrategy=m.Option.String("-s,--change-detection-strategy",{description:"Change detection strategy",validator:(0,Ge.isEnum)(h)});this.withAncestors=m.Option.Boolean("-a,--ancestors",!1,{description:"Perform operation over ancestors"});this.ignoredAncestorsMarkers=m.Option.Array("--ignored-ancestors-markers",[],{description:"The same as ignoredAncestorsMarkers"});this.withPrivate=m.Option.Boolean("--private",!0,{description:"Include private workspaces"});this.isParallel=m.Option.Boolean("-p,--parallel",!1,{description:"Run the commands in parallel"});this.excludeList=m.Option.Array("--exclude",[],{description:"Exclude specific workspaces"});this.includeList=m.Option.Array("--include",[],{description:"Include specific workspaces"});this.cdManager=new x}async execute(){let e=await je.Configuration.find(this.context.cwd,this.context.plugins),{project:t}=await Le.Project.find(e,this.context.cwd);this.validate(e);let s=await this.getAffectedList(t);if(s.length===0){console.dir("No affected workspaces.");return}let o=["workspaces","foreach","-it",...s];this.isParallel&&o.push("--parallel"),await this.cli.run([...o,this.commandName,...this.args])}async getAffectedList(e){let t=await this.cdManager.findCandidates(e,{changeDetectionStrategy:this.changeDetectionStrategy,withAncestor:this.withAncestors,ignoredAncestorsMarkers:this.ignoredAncestorsMarkers,withPrivate:this.withPrivate}),s=[];return t.forEach(o=>{this.excludeList.includes(o.name)||this.includeList.length>0&&!this.includeList.includes(o.name)||(s.push("--include"),s.push(o.name))}),s}validate(e){if(!e.plugins.has(J))throw new m.UsageError(`You should install ${J} plugin to use this command.`)}};L.paths=[["workspaces","changed","foreach"]],L.usage=m.Command.Usage({category:"Workspace-related commands",description:`A wrapper over foreach with -it options helping to invoke operations for changed workspaces. Required to have installed ${J} plugin.`});var Ye={configuration:{changeDetectionStrategy:{description:"Which source the plugin should use in order to determine workspaces changes.",type:j.SettingsType.STRING,isNullable:!1,default:h.baseRef,values:[h.baseRef,h.prevRef]},detectPrivates:{description:"Gather private workspaces into changed list.",type:j.SettingsType.BOOLEAN,isNullable:!1,default:!0},ignoredAncestorsMarkers:{description:"If ancestor workspace contains these files/directories it will be excluded from execution list.",type:j.SettingsType.STRING,isNullable:!1,isArray:!0,default:[]},preserveAncestors:{description:"Preserve ancestors of changed workspaces.",type:j.SettingsType.BOOLEAN,isNullable:!1,default:!1}},commands:[W,I,B,L]},Xe=Ye;return Ze;})();
return plugin;
}
};
