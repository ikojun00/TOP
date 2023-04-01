(()=>{"use strict";function t(t){document.getElementById(t).style.display="grid",document.querySelectorAll(`.content >*:not(#${t})`).forEach((t=>t.style.display="none"))}function e(t){document.getElementById(t).style.display="flex",document.getElementById("add-button").style.display="none",document.querySelectorAll(`body >*:not(#${t})`).forEach((t=>t.style.filter="blur(10px)"))}function n(t){document.getElementById(t).style.display="none",document.getElementById("add-button").style.display="flex",document.querySelectorAll("body >*").forEach((t=>t.style.filter="blur(0)"))}function o(t){i.splice(t,1),document.querySelectorAll(`[data-remove-button='${t}']`).forEach((t=>t.parentNode.parentNode.parentNode.removeChild(t.parentNode.parentNode)))}function d(t,d,c){const a=document.getElementById(c),l=document.createElement("div");l.classList.add("card"),l.innerHTML=`\n            <div class="card-text">\n                <input type="checkbox" name="checkbox" id="opt-in" data-checkbox=${d}/>\n                <p>${t.title}</p>\n            </div>\n            <div class="card-options">\n                <button id='details-button' data-details-button=${d}>Details</button>\n                <p>${t.date}</p>\n                <button id='edit-button' data-edit-button=${d}><img src="SVG/file-edit-outline.svg" alt="File Edit"></button>\n                <button id='remove-button' data-remove-button=${d}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>\n            </div>`,a.appendChild(l),document.querySelector("input[name=checkbox]").addEventListener("change",(()=>function(){this.checked?console.log("Checkbox is checked.."):console.log("Checkbox is not checked..")}())),document.querySelector(`[data-remove-button='${d}']`).addEventListener("click",(()=>o(d))),document.querySelector(`[data-edit-button='${d}']`).addEventListener("click",(()=>function(t){o(t),e("myForm")}(d))),document.querySelector(`[data-details-button='${d}']`).addEventListener("click",(()=>function(t){document.getElementById("card-details-text").innerHTML=`\n                <p>Title: ${i[t].title}</p>\n                <p>Description: ${i[t].desc}</p>\n                <p>Date: ${i[t].date}</p>\n                <p>Priority: ${i[t].priority}</p>\n                <button id='details-close-button'>Close</button>`,e("card-details-text"),document.getElementById("details-close-button").addEventListener("click",(()=>n("card-details-text"))),console.log(i[t])}(d)))}class c{constructor(t,e,n,o){this.title=t,this.desc=e,this.priority=n,this.date=o}addCardToContent(t){const e={title:"",desc:"",priority:"",date:""};for(const[n,o]of t)"title"===n?e.title=o:"desc"===n?e.desc=o:"priority"===n?e.priority=o:"date"===n?e.date=o:console.log("Error");const n=new c(e.title,e.desc,e.priority,e.date);i.push(n),function(t){const e=new Date(t),n=new Date;return e.getDate()===n.getDate()&&e.getMonth()===n.getMonth()&&e.getYear()===n.getYear()}(e.date)&&d(n,i.length-1,"content-today"),function(t){const e=new Date(t),n=new Date,o=n.getDate(),d=n.getDay(),c=new Date(n.setDate(o-d)),i=new Date(c);return i.setDate(i.getDate()+6),e>=c&&e<=i}(e.date)&&d(n,i.length-1,"content-week"),d(n,i.length-1,"content-inbox"),console.table(i)}}const i=[];document.querySelectorAll("button").forEach((o=>{o.addEventListener("click",(d=>{if("add-button"===o.id)e("myForm");else if("submit-button"===o.id){const t=document.getElementById("myForm"),e=new FormData(t);d.preventDefault(),(new c).addCardToContent(e),n("myForm")}else"inbox-button"===o.id?t("content-inbox"):"today-button"===o.id?t("content-today"):"week-button"===o.id?t("content-week"):console.log("Error")}))}))})();