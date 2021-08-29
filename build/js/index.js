var nt=Object.defineProperty;var T=e=>nt(e,"__esModule",{value:!0});var R=(e,t)=>()=>(t||(t={exports:{}},e(t.exports,t)),t.exports),W=(e,t)=>{for(var r in t)nt(e,r,{get:t[r],enumerable:!0})};var Ut=R(be=>{T(be);W(be,{settings:()=>we,template:()=>Ce});var Ce=({value:e})=>`<div class="text-widget">${e}</div>`,we={type:"textWidget",value:"<h4>Barnaby The Bear's my name</h4><p>Barnaby The Bear's my name, never call me Jack or James, I will sing my way to fame, Barnaby the Bear's my name.</p>"}});var Bt=R(Se=>{T(Se);W(Se,{settings:()=>Oe,template:()=>Ie});var Ie=({title:e,source:t})=>`<div class="block">
  <h4>${e.value}</h4>
  <iframe width="100%" height="350" src="https://www.youtube.com/embed/65Co1eTbqzo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  
</div>
`,Oe={source:{type:"text",value:"http://www.youtube.com/embed/wCkerYMffMo",description:"Video URL"},title:{type:"string",value:"BANANA!!",description:"Title"}}});var Pt=R(Ee=>{T(Ee);W(Ee,{settings:()=>Te,template:()=>Le});var Le=({header:e,fields:t,option:r,submit:n})=>`
<div class="block">
  <h4>${e.value}</h4>

  <form action="#">
    ${t.fields.map(({label:s,value:i,placeholder:c,type:u,required:g,rows:y,cols:O,options:I,checked:P})=>`
          <fieldset>
            <label>${s}</label>
            ${u==="string"?`<input type="text" value="${i}" placeholder="${c}" ${g?"required":""} />`:""}
            
            ${u==="text"?`<textarea rows="${y}" cols="${O}" value="${i}" placeholder="${c}"
                             ${g?"required":""} />`:""}
            
            ${u==="select"?`<select>
                    ${I.map(({name:x,value:z,label:M})=>`<option name="${x}" value="${z}">${M}</option>`).join("")}
                  </select>`:""}
    
            ${u==="checkbox"?`<input type="checkbox" value="${i}" ${P?"checked":""} ${g||""}/>`:""}
            
            
          </fieldset>
      `).join("")}
      
      <fieldset class="submit">
        <button type="submit">${n.value}</button>
      </fieldset>
    </form>    
</div>
`,Te={header:{type:"string",value:"Happy Form",description:"Form name"},fields:{type:"form",fields:[{type:"string",label:"Field 1:",value:"",placeholder:"Please, input happy face here...",required:!0},{type:"string",label:"Field 2:",value:":o)",placeholder:"Please, input happy face here...",required:!0},{type:"text",label:"Field 3:",value:"",placeholder:"",required:!0,rows:10,cols:10},{type:"select",label:"Field 4:",required:!0,options:[{name:"option1",label:"option1",value:"option 1"},{name:"option2",label:"option2",value:"option 2"},{name:"option3",label:"option3",value:"option 3"}]},{type:"checkbox",label:"Field 5:",value:"0",checked:!0,required:!0}]},submit:{type:"string",value:"Be happy!",description:"Text for Submit button"}}});var zt=R(Re=>{T(Re);W(Re,{settings:()=>je,template:()=>We});var We=()=>`<div class="table-widget-1">
  <table class="table-bordered table-striped table-condensed">
    <thead>
    <tr>
      <th>Code</th>
      <th>Company</th>
      <th class="numeric">Price</th>
      <th class="numeric">Change</th>
      <th class="numeric">Change %</th>
      <th class="numeric">Open</th>
      <th class="numeric">High</th>
      <th class="numeric">Low</th>
      <th class="numeric">Volume</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>AAC</td>
      <td>AUSTRALIAN AGRICULTURAL COMPANY LIMITED.</td>
      <td class="numeric">$1.38</td>
      <td class="numeric">-0.01</td>
      <td class="numeric">-0.36%</td>
      <td class="numeric">$1.39</td>
      <td class="numeric">$1.39</td>
      <td class="numeric">$1.38</td>
      <td class="numeric">9,395</td>
    </tr>
    <tr>
      <td>AAD</td>
      <td>ARDENT LEISURE GROUP</td>
      <td class="numeric">$1.15</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">1.32%</td>
      <td class="numeric">$1.14</td>
      <td class="numeric">$1.15</td>
      <td class="numeric">$1.13</td>
      <td class="numeric">56,431</td>
    </tr>
    <tr>
      <td>AAX</td>
      <td>AUSENCO LIMITED</td>
      <td class="numeric">$4.00</td>
      <td class="numeric">-0.04</td>
      <td class="numeric">-0.99%</td>
      <td class="numeric">$4.01</td>
      <td class="numeric">$4.05</td>
      <td class="numeric">$4.00</td>
      <td class="numeric">90,641</td>
    </tr>
    <tr>
      <td>ABC</td>
      <td>ADELAIDE BRIGHTON LIMITED</td>
      <td class="numeric">$3.00</td>
      <td class="numeric">  +0.06</td>
      <td class="numeric">2.04%</td>
      <td class="numeric">$2.98</td>
      <td class="numeric">$3.00</td>
      <td class="numeric">$2.96</td>
      <td class="numeric">862,518</td>
    </tr>
    <tr>
      <td>ABP</td>
      <td>ABACUS PROPERTY GROUP</td>
      <td class="numeric">$1.91</td>
      <td class="numeric">0.00</td>
      <td class="numeric">0.00%</td>
      <td class="numeric">$1.92</td>
      <td class="numeric">$1.93</td>
      <td class="numeric">$1.90</td>
      <td class="numeric">595,701</td>
    </tr>
    <tr>
      <td>ABY</td>
      <td>ADITYA BIRLA MINERALS LIMITED</td>
      <td class="numeric">$0.77</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">2.00%</td>
      <td class="numeric">$0.76</td>
      <td class="numeric">$0.77</td>
      <td class="numeric">$0.76</td>
      <td class="numeric">54,567</td>
    </tr>
    <tr>
      <td>ACR</td>
      <td>ACRUX LIMITED</td>
      <td class="numeric">$3.71</td>
      <td class="numeric">  +0.01</td>
      <td class="numeric">0.14%</td>
      <td class="numeric">$3.70</td>
      <td class="numeric">$3.72</td>
      <td class="numeric">$3.68</td>
      <td class="numeric">191,373</td>
    </tr>
    <tr>
      <td>ADU</td>
      <td>ADAMUS RESOURCES LIMITED</td>
      <td class="numeric">$0.72</td>
      <td class="numeric">0.00</td>
      <td class="numeric">0.00%</td>
      <td class="numeric">$0.73</td>
      <td class="numeric">$0.74</td>
      <td class="numeric">$0.72</td>
      <td class="numeric">8,602,291</td>
    </tr>
    <tr>
      <td>AGG</td>
      <td>ANGLOGOLD ASHANTI LIMITED</td>
      <td class="numeric">$7.81</td>
      <td class="numeric">-0.22</td>
      <td class="numeric">-2.74%</td>
      <td class="numeric">$7.82</td>
      <td class="numeric">$7.82</td>
      <td class="numeric">$7.81</td>
      <td class="numeric">148</td>
    </tr>
    <tr>
      <td>AGK</td>
      <td>AGL ENERGY LIMITED</td>
      <td class="numeric">$13.82</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">0.14%</td>
      <td class="numeric">$13.83</td>
      <td class="numeric">$13.83</td>
      <td class="numeric">$13.67</td>
      <td class="numeric">846,403</td>
    </tr>
    <tr>
      <td>AGO</td>
      <td>ATLAS IRON LIMITED</td>
      <td class="numeric">$3.17</td>
      <td class="numeric">-0.02</td>
      <td class="numeric">-0.47%</td>
      <td class="numeric">$3.11</td>
      <td class="numeric">$3.22</td>
      <td class="numeric">$3.10</td>
      <td class="numeric">5,416,303</td>
    </tr>
    </tbody>
  </table>
</div>`,je={}});var Gt=R(Me=>{T(Me);W(Me,{settings:()=>Ne,template:()=>De});var De=()=>`
<div class="table-widget-2">
  <table class="table-bordered table-striped table-condensed cf">
    <thead>
    <tr>
      <th>Code</th>
      <th>Company</th>
      <th class="numeric">Price</th>
      <th class="numeric">Change</th>
      <th class="numeric">Change %</th>
      <th class="numeric">Open</th>
      <th class="numeric">High</th>
      <th class="numeric">Low</th>
      <th class="numeric">Volume</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>AAC</td>
      <td>AUSTRALIAN AGRICULTURAL COMPANY LIMITED.</td>
      <td class="numeric">$1.38</td>
      <td class="numeric">-0.01</td>
      <td class="numeric">-0.36%</td>
      <td class="numeric">$1.39</td>
      <td class="numeric">$1.39</td>
      <td class="numeric">$1.38</td>
      <td class="numeric">9,395</td>
    </tr>
    <tr>
      <td>AAD</td>
      <td>ARDENT LEISURE GROUP</td>
      <td class="numeric">$1.15</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">1.32%</td>
      <td class="numeric">$1.14</td>
      <td class="numeric">$1.15</td>
      <td class="numeric">$1.13</td>
      <td class="numeric">56,431</td>
    </tr>
    <tr>
      <td>AAX</td>
      <td>AUSENCO LIMITED</td>
      <td class="numeric">$4.00</td>
      <td class="numeric">-0.04</td>
      <td class="numeric">-0.99%</td>
      <td class="numeric">$4.01</td>
      <td class="numeric">$4.05</td>
      <td class="numeric">$4.00</td>
      <td class="numeric">90,641</td>
    </tr>
    <tr>
      <td>ABC</td>
      <td>ADELAIDE BRIGHTON LIMITED</td>
      <td class="numeric">$3.00</td>
      <td class="numeric">  +0.06</td>
      <td class="numeric">2.04%</td>
      <td class="numeric">$2.98</td>
      <td class="numeric">$3.00</td>
      <td class="numeric">$2.96</td>
      <td class="numeric">862,518</td>
    </tr>
    <tr>
      <td>ABP</td>
      <td>ABACUS PROPERTY GROUP</td>
      <td class="numeric">$1.91</td>
      <td class="numeric">0.00</td>
      <td class="numeric">0.00%</td>
      <td class="numeric">$1.92</td>
      <td class="numeric">$1.93</td>
      <td class="numeric">$1.90</td>
      <td class="numeric">595,701</td>
    </tr>
    <tr>
      <td>ABY</td>
      <td>ADITYA BIRLA MINERALS LIMITED</td>
      <td class="numeric">$0.77</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">2.00%</td>
      <td class="numeric">$0.76</td>
      <td class="numeric">$0.77</td>
      <td class="numeric">$0.76</td>
      <td class="numeric">54,567</td>
    </tr>
    <tr>
      <td>ACR</td>
      <td>ACRUX LIMITED</td>
      <td class="numeric">$3.71</td>
      <td class="numeric">  +0.01</td>
      <td class="numeric">0.14%</td>
      <td class="numeric">$3.70</td>
      <td class="numeric">$3.72</td>
      <td class="numeric">$3.68</td>
      <td class="numeric">191,373</td>
    </tr>
    <tr>
      <td>ADU</td>
      <td>ADAMUS RESOURCES LIMITED</td>
      <td class="numeric">$0.72</td>
      <td class="numeric">0.00</td>
      <td class="numeric">0.00%</td>
      <td class="numeric">$0.73</td>
      <td class="numeric">$0.74</td>
      <td class="numeric">$0.72</td>
      <td class="numeric">8,602,291</td>
    </tr>
    <tr>
      <td>AGG</td>
      <td>ANGLOGOLD ASHANTI LIMITED</td>
      <td class="numeric">$7.81</td>
      <td class="numeric">-0.22</td>
      <td class="numeric">-2.74%</td>
      <td class="numeric">$7.82</td>
      <td class="numeric">$7.82</td>
      <td class="numeric">$7.81</td>
      <td class="numeric">148</td>
    </tr>
    <tr>
      <td>AGK</td>
      <td>AGL ENERGY LIMITED</td>
      <td class="numeric">$13.82</td>
      <td class="numeric">  +0.02</td>
      <td class="numeric">0.14%</td>
      <td class="numeric">$13.83</td>
      <td class="numeric">$13.83</td>
      <td class="numeric">$13.67</td>
      <td class="numeric">846,403</td>
    </tr>
    <tr>
      <td>AGO</td>
      <td>ATLAS IRON LIMITED</td>
      <td class="numeric">$3.17</td>
      <td class="numeric">-0.02</td>
      <td class="numeric">-0.47%</td>
      <td class="numeric">$3.11</td>
      <td class="numeric">$3.22</td>
      <td class="numeric">$3.10</td>
      <td class="numeric">5,416,303</td>
    </tr>
    </tbody>
  </table>
</div>`,Ne={}});var Ht=R(Ue=>{T(Ue);W(Ue,{settings:()=>Pe,template:()=>Be});var Be=()=>`<div class="table-widget-3">
  <table class="table-bordered table-striped table-condensed cf">
    <thead class="cf">
    <tr>
      <th>Code</th>
      <th>Company</th>
      <th class="numeric">Price</th>
      <th class="numeric">Change</th>
      <th class="numeric">Change %</th>
      <th class="numeric">Open</th>
      <th class="numeric">High</th>
      <th class="numeric">Low</th>
      <th class="numeric">Volume</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td data-title="Code">AAC</td>
      <td data-title="Company">AUSTRALIAN AGRICULTURAL COMPANY LIMITED.</td>
      <td class="numeric" data-title="Price">$1.38</td>
      <td class="numeric" data-title="Change">-0.01</td>
      <td class="numeric" data-title="Change %">-0.36%</td>
      <td class="numeric" data-title="Open">$1.39</td>
      <td class="numeric" data-title="High">$1.39</td>
      <td class="numeric" data-title="Low">$1.38</td>
      <td class="numeric" data-title="Volume">9,395</td>
    </tr>
    <tr>
      <td data-title="Code">AAD</td>
      <td data-title="Company">ARDENT LEISURE GROUP</td>
      <td class="numeric" data-title="Price">$1.15</td>
      <td class="numeric" data-title="Change">  +0.02</td>
      <td class="numeric" data-title="Change %">1.32%</td>
      <td class="numeric" data-title="Open">$1.14</td>
      <td class="numeric" data-title="High">$1.15</td>
      <td class="numeric" data-title="Low">$1.13</td>
      <td class="numeric" data-title="Volume">56,431</td>
    </tr>
    <tr>
      <td data-title="Code">AAX</td>
      <td data-title="Company">AUSENCO LIMITED</td>
      <td class="numeric" data-title="Price">$4.00</td>
      <td class="numeric" data-title="Change">-0.04</td>
      <td class="numeric" data-title="Change %">-0.99%</td>
      <td class="numeric" data-title="Open">$4.01</td>
      <td class="numeric" data-title="High">$4.05</td>
      <td class="numeric" data-title="Low">$4.00</td>
      <td class="numeric" data-title="Volume">90,641</td>
    </tr>
    <tr>
      <td data-title="Code">ABC</td>
      <td data-title="Company">ADELAIDE BRIGHTON LIMITED</td>
      <td class="numeric" data-title="Price">$3.00</td>
      <td class="numeric" data-title="Change">  +0.06</td>
      <td class="numeric" data-title="Change %">2.04%</td>
      <td class="numeric" data-title="Open">$2.98</td>
      <td class="numeric" data-title="High">$3.00</td>
      <td class="numeric" data-title="Low">$2.96</td>
      <td class="numeric" data-title="Volume">862,518</td>
    </tr>
    <tr>
      <td data-title="Code">ABP</td>
      <td data-title="Company">ABACUS PROPERTY GROUP</td>
      <td class="numeric" data-title="Price">$1.91</td>
      <td class="numeric" data-title="Change">0.00</td>
      <td class="numeric" data-title="Change %">0.00%</td>
      <td class="numeric" data-title="Open">$1.92</td>
      <td class="numeric" data-title="High">$1.93</td>
      <td class="numeric" data-title="Low">$1.90</td>
      <td class="numeric" data-title="Volume">595,701</td>
    </tr>
    <tr>
      <td data-title="Code">ABY</td>
      <td data-title="Company">ADITYA BIRLA MINERALS LIMITED</td>
      <td class="numeric" data-title="Price">$0.77</td>
      <td class="numeric" data-title="Change">  +0.02</td>
      <td class="numeric" data-title="Change %">2.00%</td>
      <td class="numeric" data-title="Open">$0.76</td>
      <td class="numeric" data-title="High">$0.77</td>
      <td class="numeric" data-title="Low">$0.76</td>
      <td class="numeric" data-title="Volume">54,567</td>
    </tr>
    <tr>
      <td data-title="Code">ACR</td>
      <td data-title="Company">ACRUX LIMITED</td>
      <td class="numeric" data-title="Price">$3.71</td>
      <td class="numeric" data-title="Change">  +0.01</td>
      <td class="numeric" data-title="Change %">0.14%</td>
      <td class="numeric" data-title="Open">$3.70</td>
      <td class="numeric" data-title="High">$3.72</td>
      <td class="numeric" data-title="Low">$3.68</td>
      <td class="numeric" data-title="Volume">191,373</td>
    </tr>
    <tr>
      <td data-title="Code">ADU</td>
      <td data-title="Company">ADAMUS RESOURCES LIMITED</td>
      <td class="numeric" data-title="Price">$0.72</td>
      <td class="numeric" data-title="Change">0.00</td>
      <td class="numeric" data-title="Change %">0.00%</td>
      <td class="numeric" data-title="Open">$0.73</td>
      <td class="numeric" data-title="High">$0.74</td>
      <td class="numeric" data-title="Low">$0.72</td>
      <td class="numeric" data-title="Volume">8,602,291</td>
    </tr>
    <tr>
      <td data-title="Code">AGG</td>
      <td data-title="Company">ANGLOGOLD ASHANTI LIMITED</td>
      <td class="numeric" data-title="Price">$7.81</td>
      <td class="numeric" data-title="Change">-0.22</td>
      <td class="numeric" data-title="Change %">-2.74%</td>
      <td class="numeric" data-title="Open">$7.82</td>
      <td class="numeric" data-title="High">$7.82</td>
      <td class="numeric" data-title="Low">$7.81</td>
      <td class="numeric" data-title="Volume">148</td>
    </tr>
    <tr>
      <td data-title="Code">AGK</td>
      <td data-title="Company">AGL ENERGY LIMITED</td>
      <td class="numeric" data-title="Price">$13.82</td>
      <td class="numeric" data-title="Change">  +0.02</td>
      <td class="numeric" data-title="Change %">0.14%</td>
      <td class="numeric" data-title="Open">$13.83</td>
      <td class="numeric" data-title="High">$13.83</td>
      <td class="numeric" data-title="Low">$13.67</td>
      <td class="numeric" data-title="Volume">846,403</td>
    </tr>
    <tr>
      <td data-title="Code">AGO</td>
      <td data-title="Company">ATLAS IRON LIMITED</td>
      <td class="numeric" data-title="Price">$3.17</td>
      <td class="numeric" data-title="Change">-0.02</td>
      <td class="numeric" data-title="Change %">-0.47%</td>
      <td class="numeric" data-title="Open">$3.11</td>
      <td class="numeric" data-title="High">$3.22</td>
      <td class="numeric" data-title="Low">$3.10</td>
      <td class="numeric" data-title="Volume">5,416,303</td>
    </tr>
    </tbody>
  </table>
</div>`,Pe={}});var it=class{constructor(){this.events={},this.eventsOne={}}bind(t,r){return t=t.toLocaleLowerCase(),t=t.indexOf("on")!==0?"on"+t:t,this.events[t]?this.events[t].push(r):this.events[t]=[r],this}unbind(t,r){var n;if(t=t.toLocaleLowerCase(),t=t.indexOf("on")!==0?"on"+t:t,this.events[t]){for(n=0;n<this.events[t].length;n+=1)if(this.events[t][n].toString()===r.toString()){this.events[t].splice(n,1);break}}if(this.eventsOne[t]){for(n=0;n<this.eventsOne[t].length;n+=1)if(this.eventsOne[t][n].toString()===r.toString()){this.eventsOne[t].splice(n,1);break}}return this}one(t,r){return t=t.toLocaleLowerCase(),t=t.indexOf("on")!==0?"on"+t:t,this.eventsOne[t]?this.eventsOne[t].push(r):(this.eventsOne[t]=[]).push(r),this}trigger(t,r){t=t.toLocaleLowerCase(),t=t.indexOf("on")!==0?"on"+t:t;for(let n=0;this.events[t]&&n<this.events[t].length;n+=1)this.events[t][n].apply(this,r);for(let n=0;this.eventsOne[t]&&n<this.eventsOne[t].length;n+=1)this.eventsOne[t][n].apply(this,r);return delete this.eventsOne[t],this}},G=it;var j=class extends G{constructor(){super();if(this.widgets={},this.activeWidget=void 0,this.addWidget=t=>{t.activateMode("behaviour").then(()=>this.trigger("addWidget",[t])),this.widgets[t.id]=t},this.removeWidget=t=>{delete this.widgets[t.id],this.activeWidget===t&&(this.activeWidget=void 0),this.getWidgetsCount()>0&&this.selectWidget(Object.keys(this.widgets)[0])},this.selectWidget=t=>{this.activeWidget&&this.activeWidget!==t&&this.unSelectWidget(this.activeWidget),this.activeWidget=t,this.trigger("selectWidget",[t])},this.unSelectWidget=t=>{this.trigger("unSelectWidget",[t])},this.getWidgetsCount=()=>{let t=0;for(let r in this.widgets)this.widgets.hasOwnProperty(r)&&(t+=1);return t},typeof j.instance=="object")return j.instance;j.instance=this}},H=j;var st=()=>{let e=()=>((1+Math.random())*65536|0).toString(16).substring(1);return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()};Array.prototype.sum=function(){for(var e=0,t=0;t<this.length;t++)e+=parseInt(this[t]);return e};Array.prototype.normalize=function(e,t){var r=this.sum()-e,n=0;if(t=t||1,!e||e<this.length)throw"Error: argument must be much than array length";for(;r!=0;){if(r<0&&(this[n]+=1,r++),r>0){if(this[n]<=1){n=(n+1)%this.length;continue}this[n]-=1,r--}n=(n+1)%this.length}return this};var at=(e,t,r)=>e.reduceRight(([n,s],i)=>{if(n===0)return[n,[i,...s]];if(i<=t)return[n,[i,...s]];if(i-n>=t)return[0,[i-n,...s]];let c=i-t;return[n-c,[i-c,...s]]},[r,[]])[1],ct=(e,t,r)=>e.reduce(([n,s],i)=>{if(n===0)return[n,[...s,i]];if(i<=t)return[n,[...s,i]];if(i-n>=t)return[0,[...s,i-n]];let c=i-t;return[n-c,[...s,i-c]]},[r,[]])[1];var dt=class extends G{constructor(t,r){super();this.modeTemplate={edit:"/editTemplate.js",behaviour:"/template.js"},this.settingsSrc="/settings.json",this.activateMode=s=>(this.trigger("beforeModeChanged",[this.mode,s]),this.src().then(({template:i,settings:c})=>(this.settings||(this.settings=c),i(c))).then(i=>(this.html=i,this.trigger("modeChanged",[this.mode,s]),this.mode=s,i))),this.urlData_={},this.id=r||st(),this.html=null,this.rootConfig=t;for(var n in t)this[n]=t[n]}fetchResource(t,r){return this.urlData_[t]?Promise.resolve(this.urlData_[t]):fetch(t).then(n=>r==="json"?n.json():n.text()).then(n=>(this.urlData_[t]=n,n))}},lt=dt;var ot=new WeakMap,A=(e,t,r,n)=>{if(!e)throw new Error("attachEventListener(node, event, callback, props): node parameter shouldn be a HTML Node");return t==="custom:drag"&&ot.set(e,!0),e.addEventListener(t,r,n),()=>e.removeEventListener(t,r,n)};A(document,"mousedown",()=>{let e=A(document,"mousemove",n=>{e();let s=new MouseEvent("custom:dragstart",{bubbles:!0,cancelable:!0,clientX:n.clientX,clientY:n.clientY});n.target.dispatchEvent(s)}),t=A(document,"mousemove",n=>{let s=new MouseEvent("custom:dragover",{bubbles:!0,cancelable:!0,clientX:n.clientX,clientY:n.clientY});n.target.dispatchEvent(s)}),r=A(document,"mouseup",n=>{t(),r();let s=new MouseEvent("custom:drop",{bubbles:!0,cancelable:!0,clientX:n.clientX,clientY:n.clientY});n.target.dispatchEvent(s)})});var ut=(e,t,r=[])=>{let n=t(e)?[...r,e]:r;return e.parentNode?ut(e.parentNode,t,n):n};A(document,"custom:dragstart",({clientX:e,clientY:t,target:r})=>{let n=ut(r,c=>ot.has(c));if(n.length===0)return;let s=A(document,"custom:dragover",({clientX:c,clientY:u})=>{n.map(g=>{let y=new MouseEvent("custom:drag",{bubbles:!1,cancelable:!1,clientX:c,clientY:u,movementX:c-e,movementY:u-t});g.dispatchEvent(y)})}),i=A(document,"custom:drop",()=>{s(),i()})});function f(e){return e!=null&&typeof e=="object"&&e["@@functional/placeholder"]===!0}function v(e){return function t(r){return arguments.length===0||f(r)?t:e.apply(this,arguments)}}function p(e){return function t(r,n){switch(arguments.length){case 0:return t;case 1:return f(r)?t:v(function(s){return e(r,s)});default:return f(r)&&f(n)?t:f(r)?v(function(s){return e(s,n)}):f(n)?v(function(s){return e(r,s)}):e(r,n)}}}var kt=p(function(t,r){return Number(t)+Number(r)});function qt(e,t){e=e||[],t=t||[];var r,n=e.length,s=t.length,i=[];for(r=0;r<n;)i[i.length]=e[r],r+=1;for(r=0;r<s;)i[i.length]=t[r],r+=1;return i}function xt(e,t){switch(e){case 0:return function(){return t.apply(this,arguments)};case 1:return function(r){return t.apply(this,arguments)};case 2:return function(r,n){return t.apply(this,arguments)};case 3:return function(r,n,s){return t.apply(this,arguments)};case 4:return function(r,n,s,i){return t.apply(this,arguments)};case 5:return function(r,n,s,i,c){return t.apply(this,arguments)};case 6:return function(r,n,s,i,c,u){return t.apply(this,arguments)};case 7:return function(r,n,s,i,c,u,g){return t.apply(this,arguments)};case 8:return function(r,n,s,i,c,u,g,y){return t.apply(this,arguments)};case 9:return function(r,n,s,i,c,u,g,y,O){return t.apply(this,arguments)};case 10:return function(r,n,s,i,c,u,g,y,O,I){return t.apply(this,arguments)};default:throw new Error("First argument to _arity must be a non-negative integer no greater than ten")}}function D(e){return function t(r,n,s){switch(arguments.length){case 0:return t;case 1:return f(r)?t:p(function(i,c){return e(r,i,c)});case 2:return f(r)&&f(n)?t:f(r)?p(function(i,c){return e(i,n,c)}):f(n)?p(function(i,c){return e(r,i,c)}):v(function(i){return e(r,n,i)});default:return f(r)&&f(n)&&f(s)?t:f(r)&&f(n)?p(function(i,c){return e(i,c,s)}):f(r)&&f(s)?p(function(i,c){return e(i,n,c)}):f(n)&&f(s)?p(function(i,c){return e(r,i,c)}):f(r)?v(function(i){return e(i,n,s)}):f(n)?v(function(i){return e(r,i,s)}):f(s)?v(function(i){return e(r,n,i)}):e(r,n,s)}}}var Ft=D(function(t,r,n){if(t>=n.length||t<-n.length)return n;var s=t<0?n.length:0,i=s+t,c=qt(n);return c[i]=r(n[i]),c}),N=Array.isArray||function(t){return t!=null&&t.length>=0&&Object.prototype.toString.call(t)==="[object Array]"};function Yt(e){return e!=null&&typeof e["@@transducer/step"]=="function"}function Xt(e,t,r){return function(){if(arguments.length===0)return r();var n=Array.prototype.slice.call(arguments,0),s=n.pop();if(!N(s)){for(var i=0;i<e.length;){if(typeof s[e[i]]=="function")return s[e[i]].apply(s,n);i+=1}if(Yt(s)){var c=t.apply(null,n);return c(s)}}return r.apply(this,arguments)}}var mt={init:function(){return this.xf["@@transducer/init"]()},result:function(e){return this.xf["@@transducer/result"](e)}};function F(e,t){for(var r=0,n=t.length,s=Array(n);r<n;)s[r]=e(t[r]),r+=1;return s}function k(e){return Object.prototype.toString.call(e)==="[object String]"}var Vt=v(function(t){return N(t)?!0:!t||typeof t!="object"||k(t)?!1:t.nodeType===1?!!t.length:t.length===0?!0:t.length>0?t.hasOwnProperty(0)&&t.hasOwnProperty(t.length-1):!1}),Jt=function(){function e(t){this.f=t}return e.prototype["@@transducer/init"]=function(){throw new Error("init not implemented on XWrap")},e.prototype["@@transducer/result"]=function(t){return t},e.prototype["@@transducer/step"]=function(t,r){return this.f(t,r)},e}();function Kt(e){return new Jt(e)}var Zt=p(function(t,r){return xt(t.length,function(){return t.apply(r,arguments)})});function Qt(e,t,r){for(var n=0,s=r.length;n<s;){if(t=e["@@transducer/step"](t,r[n]),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n+=1}return e["@@transducer/result"](t)}function ht(e,t,r){for(var n=r.next();!n.done;){if(t=e["@@transducer/step"](t,n.value),t&&t["@@transducer/reduced"]){t=t["@@transducer/value"];break}n=r.next()}return e["@@transducer/result"](t)}function ft(e,t,r,n){return e["@@transducer/result"](r[n](Zt(e["@@transducer/step"],e),t))}var gt=typeof Symbol!="undefined"?Symbol.iterator:"@@iterator";function pt(e,t,r){if(typeof e=="function"&&(e=Kt(e)),Vt(r))return Qt(e,t,r);if(typeof r["fantasy-land/reduce"]=="function")return ft(e,t,r,"fantasy-land/reduce");if(r[gt]!=null)return ht(e,t,r[gt]());if(typeof r.next=="function")return ht(e,t,r);if(typeof r.reduce=="function")return ft(e,t,r,"reduce");throw new TypeError("reduce: list must be array or iterable")}function q(e,t){return Object.prototype.hasOwnProperty.call(t,e)}var yt=Object.prototype.toString,_t=function(){return yt.call(arguments)==="[object Arguments]"?function(t){return yt.call(t)==="[object Arguments]"}:function(t){return q("callee",t)}}(),te=!{toString:null}.propertyIsEnumerable("toString"),$t=["constructor","valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"],vt=function(){return arguments.propertyIsEnumerable("length")}(),ee=function(t,r){for(var n=0;n<t.length;){if(t[n]===r)return!0;n+=1}return!1},U=typeof Object.keys=="function"&&!vt?v(function(t){return Object(t)!==t?[]:Object.keys(t)}):v(function(t){if(Object(t)!==t)return[];var r,n,s=[],i=vt&&_t(t);for(r in t)q(r,t)&&(!i||r!=="length")&&(s[s.length]=r);if(te)for(n=$t.length-1;n>=0;)r=$t[n],q(r,t)&&!ee(s,r)&&(s[s.length]=r),n-=1;return s}),At=p(function(t,r){var n=t<0?r.length+t:t;return k(r)?r.charAt(n):r[n]}),re=D(pt),ne=v(function(t){return function(){return t}});function bt(e){var t=Object.prototype.toString.call(e);return t==="[object Function]"||t==="[object AsyncFunction]"||t==="[object GeneratorFunction]"||t==="[object AsyncGeneratorFunction]"}var Ct=v(function(t){return t===null?"Null":t===void 0?"Undefined":Object.prototype.toString.call(t).slice(8,-1)});function ie(e,t){return function(){var r=arguments.length;if(r===0)return t();var n=arguments[r-1];return N(n)||typeof n[e]!="function"?t.apply(this,arguments):n[e].apply(n,Array.prototype.slice.call(arguments,0,r-1))}}var wt=D(ie("slice",function(t,r,n){return Array.prototype.slice.call(n,t,r)})),St=At(0);function It(e){for(var t=[],r;!(r=e.next()).done;)t.push(r.value);return t}function Ot(e,t,r){for(var n=0,s=r.length;n<s;){if(e(t,r[n]))return!0;n+=1}return!1}function se(e){var t=String(e).match(/^function (\w*)/);return t==null?"":t[1]}function ae(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Y=typeof Object.is=="function"?Object.is:ae;function Et(e,t,r,n){var s=It(e),i=It(t);function c(u,g){return X(u,g,r.slice(),n.slice())}return!Ot(function(u,g){return!Ot(c,g,u)},i,s)}function X(e,t,r,n){if(Y(e,t))return!0;var s=Ct(e);if(s!==Ct(t)||e==null||t==null)return!1;if(typeof e["fantasy-land/equals"]=="function"||typeof t["fantasy-land/equals"]=="function")return typeof e["fantasy-land/equals"]=="function"&&e["fantasy-land/equals"](t)&&typeof t["fantasy-land/equals"]=="function"&&t["fantasy-land/equals"](e);if(typeof e.equals=="function"||typeof t.equals=="function")return typeof e.equals=="function"&&e.equals(t)&&typeof t.equals=="function"&&t.equals(e);switch(s){case"Arguments":case"Array":case"Object":if(typeof e.constructor=="function"&&se(e.constructor)==="Promise")return e===t;break;case"Boolean":case"Number":case"String":if(!(typeof e==typeof t&&Y(e.valueOf(),t.valueOf())))return!1;break;case"Date":if(!Y(e.valueOf(),t.valueOf()))return!1;break;case"Error":return e.name===t.name&&e.message===t.message;case"RegExp":if(!(e.source===t.source&&e.global===t.global&&e.ignoreCase===t.ignoreCase&&e.multiline===t.multiline&&e.sticky===t.sticky&&e.unicode===t.unicode))return!1;break}for(var i=r.length-1;i>=0;){if(r[i]===e)return n[i]===t;i-=1}switch(s){case"Map":return e.size!==t.size?!1:Et(e.entries(),t.entries(),r.concat([e]),n.concat([t]));case"Set":return e.size!==t.size?!1:Et(e.values(),t.values(),r.concat([e]),n.concat([t]));case"Arguments":case"Array":case"Object":case"Boolean":case"Number":case"String":case"Date":case"Error":case"RegExp":case"Int8Array":case"Uint8Array":case"Uint8ClampedArray":case"Int16Array":case"Uint16Array":case"Int32Array":case"Uint32Array":case"Float32Array":case"Float64Array":case"ArrayBuffer":break;default:return!1}var c=U(e);if(c.length!==U(t).length)return!1;var u=r.concat([e]),g=n.concat([t]);for(i=c.length-1;i>=0;){var y=c[i];if(!(q(y,t)&&X(t[y],e[y],u,g)))return!1;i-=1}return!0}var ce=p(function(t,r){return X(t,r,[],[])});function de(e,t,r){var n,s;if(typeof e.indexOf=="function")switch(typeof t){case"number":if(t===0){for(n=1/t;r<e.length;){if(s=e[r],s===0&&1/s===n)return r;r+=1}return-1}else if(t!==t){for(;r<e.length;){if(s=e[r],typeof s=="number"&&s!==s)return r;r+=1}return-1}return e.indexOf(t,r);case"string":case"boolean":case"function":case"undefined":return e.indexOf(t,r);case"object":if(t===null)return e.indexOf(t,r)}for(;r<e.length;){if(ce(e[r],t))return r;r+=1}return-1}function le(e,t){return de(t,e,0)>=0}function V(e){var t=e.replace(/\\/g,"\\\\").replace(/[\b]/g,"\\b").replace(/\f/g,"\\f").replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\t/g,"\\t").replace(/\v/g,"\\v").replace(/\0/g,"\\0");return'"'+t.replace(/"/g,'\\"')+'"'}var B=function(t){return(t<10?"0":"")+t},oe=typeof Date.prototype.toISOString=="function"?function(t){return t.toISOString()}:function(t){return t.getUTCFullYear()+"-"+B(t.getUTCMonth()+1)+"-"+B(t.getUTCDate())+"T"+B(t.getUTCHours())+":"+B(t.getUTCMinutes())+":"+B(t.getUTCSeconds())+"."+(t.getUTCMilliseconds()/1e3).toFixed(3).slice(2,5)+"Z"};function ue(e){return function(){return!e.apply(this,arguments)}}function me(e,t){for(var r=0,n=t.length,s=[];r<n;)e(t[r])&&(s[s.length]=t[r]),r+=1;return s}function he(e){return Object.prototype.toString.call(e)==="[object Object]"}var fe=function(){function e(t,r){this.xf=r,this.f=t}return e.prototype["@@transducer/init"]=mt.init,e.prototype["@@transducer/result"]=mt.result,e.prototype["@@transducer/step"]=function(t,r){return this.f(r)?this.xf["@@transducer/step"](t,r):t},e}(),ge=p(function(t,r){return new fe(t,r)}),pe=p(Xt(["filter"],ge,function(e,t){return he(t)?pt(function(r,n){return e(t[n])&&(r[n]=t[n]),r},{},U(t)):me(e,t)})),ye=p(function(t,r){return pe(ue(t),r)});function Lt(e,t){var r=function(c){var u=t.concat([e]);return le(c,u)?"<Circular>":Lt(c,u)},n=function(i,c){return F(function(u){return V(u)+": "+r(i[u])},c.slice().sort())};switch(Object.prototype.toString.call(e)){case"[object Arguments]":return"(function() { return arguments; }("+F(r,e).join(", ")+"))";case"[object Array]":return"["+F(r,e).concat(n(e,ye(function(i){return/^\d+$/.test(i)},U(e)))).join(", ")+"]";case"[object Boolean]":return typeof e=="object"?"new Boolean("+r(e.valueOf())+")":e.toString();case"[object Date]":return"new Date("+(isNaN(e.valueOf())?r(NaN):V(oe(e)))+")";case"[object Null]":return"null";case"[object Number]":return typeof e=="object"?"new Number("+r(e.valueOf())+")":1/e==-Infinity?"-0":e.toString(10);case"[object String]":return typeof e=="object"?"new String("+r(e.valueOf())+")":V(e);case"[object Undefined]":return"undefined";default:if(typeof e.toString=="function"){var s=e.toString();if(s!=="[object Object]")return s}return"{"+n(e,U(e)).join(", ")+"}"}}var J=v(function(t){return Lt(t,[])}),K=p(function(t,r){if(N(t)){if(N(r))return t.concat(r);throw new TypeError(J(r)+" is not an array")}if(k(t)){if(k(r))return t+r;throw new TypeError(J(r)+" is not a string")}if(t!=null&&bt(t["fantasy-land/concat"]))return t["fantasy-land/concat"](r);if(t!=null&&bt(t.concat))return t.concat(r);throw new TypeError(J(t)+' does not have a method named "concat" or "fantasy-land/concat"')}),Z=D(function(t,r,n){return Ft(t,ne(r),n)}),Tt=At(-1);function $e(e){return Object.prototype.toString.call(e)==="[object Number]"}var ve=v(function(t){return t!=null&&$e(t.length)?t.length:NaN}),Q=re(kt,0),Rt=p(function(t,r){return[wt(0,t,r),wt(t,ve(r),r)]}),Wt=D(function(t,r,n){for(var s=[],i=0,c=Math.min(r.length,n.length);i<c;)s[i]=t(r[i],n[i]),i+=1;return s});var S=new H,Ae=70,jt=class{constructor(){this.cellTemplate=({name:a})=>`<div class='ui-widget-header'>${a}</div>`,this.wClassSelector=".widget",this.rClassSelector=".row",this.cClassSelector=".cell",this.wCl="widget",this.rCl="row",this.cCl="cell",this.wMinWidth=2,this.$resizableCell=null,this.getWidgetHolder=({id:a})=>$(`[widgetid='${a}']`),this.getWidgetCell=a=>this.getWidgetHolder(a).parent();let t=this,r=null,n,s,i,c=({pageX:a,pageY:l,ctrlKey:d,metaKey:o})=>{var E;d||o?document.body.classList.add("extend-cell"):document.body.classList.remove("extend-cell"),r=d||o?y(a,l):g(a,l);let{height:h,width:m,left:b,top:C}=(((E=r.row)==null?void 0:E[0])||this.$container[0]).getBoundingClientRect();i.css({height:h,width:m,left:b,top:C}).html(u(r))},u=({direction:a,element:l,row:d,cell:o})=>{let h=$("<div class='helper'></div>"),m=$(l);if(a==="left")return h.css({left:l?m.offset().left-d.offset().left:d.width(),height:"100%"});if(a==="center")return h.css({width:m.width()*80/100,top:m.offset().top-d.offset().top+m.height()*25/100,left:m.offset().left-d.offset().left+m.width()*10/100,height:m.height()*50/100});if(a==="top"){if(l)return h.css({width:m.width()||"100%",top:m.offset().top-$(d).offset().top,left:m.offset().left-$(d).offset().left});if(o)return m=$(o).find(this.wClassSelector).last(),h.css({width:m.width()||"100%",top:m.offset().top-$(o).parent().offset().top+m.height(),left:m.offset().left-$(o).parent().offset().left});d&&h.css({width:"100%",bottom:0});let b=this.$container.find(".row").last();return h.css({width:"100%",top:b[0]?b.offset().top+b.height():0})}return h},g=(a,l)=>{let d=25,o=this.getElementByPos(a,l,this.rClassSelector);if(!o)return{row:o,direction:"top",element:null};let{top:h,height:m}=o[0].getBoundingClientRect(),b=(l-h)*100/m;if(b<d||b>100-d)return{row:o,direction:"top",element:b>100-d?null:o};let C=Array.from(o[0].querySelectorAll(this.cClassSelector)),E=C.length?[C[0].getBoundingClientRect().left,...C.flatMap(w=>{let{left:et,width:rt}=w.getBoundingClientRect();return[et+rt*d/100,et+rt*(100-d)/100]}),C[C.length-1].getBoundingClientRect().right]:[];for(let w=0;w<E.length;w+=2){if(E[w]<a&&a<E[w+1])return{row:o,direction:"left",element:C[w/2]||null};if(E[w+1]<a&&a<E[w+2])return{row:o,direction:"center",element:C[w/2]||null}}return{row:o,direction:"top",element:null}},y=(a,l)=>{let d=this.getElementByPos(a,l,this.cClassSelector);if(!d)return{element:null,row:null,cell:null,direction:null};let o=Array.from(d[0].querySelectorAll(this.wClassSelector)),h=o.length?[o[0].getBoundingClientRect().top,...o.flatMap(m=>{let{top:b,height:C}=m.getBoundingClientRect();return[b+C*25/100,b+C*(100-25)/100]}),o[o.length-1].getBoundingClientRect().bottom]:[];for(let m=0;m<h.length;m+=2)if(h[m]<l&&l<h[m+1])return{element:o[m/2],row:d.parent(),cell:d,direction:"top"};return{element:null,row:d.parent(),cell:d,direction:null}},O=a=>Array.from(a.querySelectorAll(this.cClassSelector)).map(l=>Number(l.className.match(/\d+/)[0])),I=(a,l)=>Wt((d,o)=>d.className=d.className.replace(/\s*grid_(\d{1,2})\s*/,` grid_${o}`),Array.from(a.querySelectorAll(this.cClassSelector)),l),P=a=>{let l=$("<div></div>").addClass(this.cCl);if(a.direction==="left"){let d=a.row.find(this.cClassSelector),o=Math.ceil(12/(d.length+1)),h=O(a.row[0]);h.normalize(12-o),I(a.row[0],h),l.addClass("grid_"+o),a.element?l.insertBefore(a.element):l.insertAfter(d.last())}else if(a.direction==="top"){if(a.cell)return a.cell;{let d=$("<div class='row container_12'></div>");l.addClass("grid_12"),l.appendTo(d),a.row&&a.element?d.insertBefore(a.row):a.row?d.insertAfter(a.row):d.appendTo(this.container)}}return l},x=(a,l)=>{var d=l.draggable.data("widgetRootConfig"),o=l.draggable.data("widget");d?this.addWidget(d,P(r)):o&&r.direction==="center"?alert("Replace still not implemented"):o&&r.direction!=="center"&&this.relocateWidget(o,P(r)),a.stopPropagation(),this.$container.unbind("mousemove",c),i.css({display:"none"})};n=$("<div class='resize-left'></div>"),s=$("<div class='resize-right'></div>");let z,M,_=({movementX:a})=>{let l=Math.round(a/Ae);if(l===0)return I(this.$resizableCell[0].parentNode,M);let[d,o]=Rt(z,M);if(l<0)return Q(d)+l<d.length*this.wMinWidth?void 0:I(this.$resizableCell[0].parentNode,K(at(d,this.wMinWidth,Math.abs(l)),Z(0,St(o)-l,o)));Q(o)-l<o.length*this.wMinWidth||I(this.$resizableCell[0].parentNode,K(Z(d.length-1,Tt(d)+l,d),ct(o,this.wMinWidth,Math.abs(l))))},tt=a=>()=>{let l=a==="right"?1:0;this.container.classList.add("resize");let d=this.$resizableCell[0];z=Array.from(d.parentNode.querySelectorAll(this.cClassSelector)).findIndex(h=>h===d)+l,M=O(this.$resizableCell[0].parentNode)};A(document,"custom:drop",()=>this.container.classList.remove("resize")),A(n[0],"custom:dragstart",tt("left")),A(s[0],"custom:dragstart",tt("right")),A(n[0],"custom:drag",_),A(s[0],"custom:drag",_),this.setResizable=a=>{this.$resizableCell=a;let l=a.parent().find(this.cClassSelector).length;a.index()!==0&&this.$resizableCell.append(n),a.index()!==l-1&&this.$resizableCell.append(s)},this.unSetResizable=function(a){$(document.body).append(n,s),this.$resizableCell=null},this.relocateWidget=function(a,l){let d=this.getWidgetCell(a),o,h=this.getWidgetCell(a).parent();S.unSelectWidget(a),l.append(this.getWidgetHolder(a)),d.find(this.wClassSelector)[0]||d.remove(),h.find(this.cClassSelector)[0]?(o=O(h),o.normalize(12),I(h[0],o)):h.remove(),S.selectWidget(a)},this.removeWidget=a=>{let l=this.getWidgetCell(a).parent(),d=this.getWidgetCell(a);S.unSelectWidget(a),this.getWidgetHolder(a).remove(),d[0].childNodes.length||d.remove(),l[0].childNodes.length?I(l[0],O(l).normalize(12)):l.remove()},this.addWidget=(a,l)=>{let d=new lt(a),o=$("<div></div>").addClass(this.wCl).attr("widgetID",d.id);r.cell&&r.element?o.insertBefore(r.element):o.appendTo(l),S.addWidget(d),S.selectWidget(d)},i=$("<div class='extend-element container_12'></div>").appendTo(document.body).bind("mousemove",c),this.container=document.querySelector("#mainCanvas"),this.$container=$(this.container),this.$container.droppable({over:()=>{i.css({display:"block"}),this.$container.bind("mousemove",c)},out:()=>i.css({display:"none"}),drop:x,activeClass:"hovered",deactivate:function(a,l){$(this).undelegate(t.cClassSelector,"mouseenter"),$(this).undelegate(t.cClassSelector,"mouseleave")}}).delegate(this.wClassSelector,"mousedown",function(){S.selectWidget($(this).data("widget"))}),S.bind("selectWidget",a=>this.setResizable(this.getWidgetCell(a))),S.bind("unSelectWidget",a=>this.unSetResizable(this.getWidgetCell(a))),document.addEventListener("keydown",a=>{(a.key==="Backspace"||a.key==="Delete")&&(S.removeWidget(S.activeWidget),a.preventDefault())})}getElementByPos(t,r,n){let s=Array.from(this.container.querySelectorAll(n)).find(i=>{let{top:c,bottom:u,left:g,right:y}=i.getBoundingClientRect();if(r>c&&r<=u&&t>g&&t<=y)return!0});return s?$(s):null}},Mt=jt;var Dt=class{constructor(t,r,n){this.itemTemplate=({thumb:i,name:c})=>`<div class='tools-item'><div><img src='${i}'>${c}</div></div>`,this.categories=[],this.$container=t;let s=i=>this.categories.push(i);return r.map((i,c)=>s(r[c])),this.categories.map(i=>$(this.itemTemplate(i)).data(n,i).draggable({cursorAt:{top:-5,left:-5},helper:"clone"}).appendTo(this.$container)),$(t)}},Nt=Dt;var ze=new H,L=new Mt;ze.bind("removeWidget",L.removeWidget).bind("changeWidget",e=>L.getWidgetHolder(e).html(e.html)).bind("addWidget",e=>{L.getWidgetHolder(e).html(e.html),L.getWidgetHolder(e).addClass("widget").data("widget",e).draggable({cursorAt:{top:-35,left:-35},helper:()=>$(L.cellTemplate({name:e.name}))})}).bind("selectWidget",e=>L.getWidgetHolder(e).addClass("active")).bind("unselectWidget",e=>L.getWidgetHolder(e).removeClass("active"));try{new Nt(document.querySelector("#widgets"),[{name:"text",thumb:"images/icons/ico_txt.png",src:()=>Promise.resolve().then(()=>Ut())},{name:"video",thumb:"images/icons/ico_video.png",src:()=>Promise.resolve().then(()=>Bt())},{name:"form",thumb:"images/icons/ico_form.png",src:()=>Promise.resolve().then(()=>Pt())},{name:"The Unseen Column",thumb:"",src:()=>Promise.resolve().then(()=>zt())},{name:"Flip scroll",thumb:"",src:()=>Promise.resolve().then(()=>Gt())},{name:"No more tables",thumb:"",src:()=>Promise.resolve().then(()=>Ht())}],"widgetRootConfig")}catch(e){console.error("Cannot load source for widgets settings",e)}
//# sourceMappingURL=index.js.map
