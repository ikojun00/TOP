(()=>{"use strict";function t(t){document.getElementById(t).style.display="grid",document.querySelectorAll(`.content >*:not(#${t})`).forEach((t=>t.style.display="none"))}function e(t){const e=document.getElementById("sidebar");document.getElementById(t).style.backgroundColor="#D4A373",document.getElementById(`${t}-button`).style.backgroundColor="#D4A373",e.querySelectorAll(`ul>*:not(#${t})`).forEach((t=>t.style.backgroundColor="#FAEDCD")),e.querySelectorAll(`li>*:not(#${t}-button)`).forEach((t=>t.style.backgroundColor="#FAEDCD"))}function n(t){document.getElementById(t).style.display="flex",document.getElementById("add-button").style.display="none",document.querySelectorAll(`body >*:not(#${t})`).forEach((t=>t.style.filter="blur(10px)"))}function o(t){document.getElementById(t).style.display="none",document.getElementById("add-button").style.display="flex",document.querySelectorAll("body >*").forEach((t=>t.style.filter="blur(0)"))}function d(t){const e=document.querySelectorAll(`[data-checkbox-button='${t}']`);!1===c[t].done?e.forEach((t=>{t.style.backgroundColor="white",t.nextElementSibling.style.textDecoration="none"})):e.forEach((t=>{t.style.backgroundColor="rgb(212, 163, 115)",t.nextElementSibling.style.textDecoration="line-through"}))}function l(t,e,n){const o=document.getElementById(n),d=document.createElement("div");d.classList.add("card"),d.innerHTML=`\n            <div class="card-text">\n              <button id='checkbox-button' data-checkbox-button=${e}></button>\n              <p>${t.title}</p>\n            </div>\n            <div class="card-options">\n                <button id='details-button' data-details-button=${e}>Details</button>\n                <p>${t.date}</p>\n                <button id='remove-button' data-remove-button=${e}><img src="SVG/trash-can-outline.svg" alt="Trash"></button>\n            </div>`,o.appendChild(d)}let c=[];function r(t,e){(function(t){const e=new Date(t),n=new Date;return e.getDate()===n.getDate()&&e.getMonth()===n.getMonth()&&e.getYear()===n.getYear()})(t.date)&&l(t,e,"content-today"),function(t){const e=new Date(t),n=new Date,o=n.getDate(),d=n.getDay(),l=new Date(n.setDate(o-d-1)),c=new Date(l);return c.setDate(c.getDate()+7),e>=l&&e<=c}(t.date)&&l(t,e,"content-week"),l(t,e,"content-inbox"),function(t){document.querySelectorAll(`[data-checkbox-button='${t}']`).forEach((e=>e.addEventListener("click",(()=>{!0===c[t].done?c[t].done=!1:c[t].done=!0,d(t),localStorage.setItem("cards",JSON.stringify(c))})))),document.querySelectorAll(`[data-remove-button='${t}']`).forEach((e=>e.addEventListener("click",(()=>function(t){c.splice(t,1),localStorage.setItem("cards",JSON.stringify(c)),document.querySelectorAll(`[data-remove-button='${t}']`).forEach((t=>t.parentNode.parentNode.parentNode.removeChild(t.parentNode.parentNode)))}(t))))),document.querySelectorAll(`[data-details-button='${t}']`).forEach((e=>e.addEventListener("click",(()=>function(t){document.getElementById("card-details-text").innerHTML=`\n                <p>Title: ${c[t].title}</p>\n                <p>Description: ${c[t].desc}</p>\n                <p>Date: ${c[t].date}</p>\n                <p>Priority: ${c[t].priority}</p>\n                <button id='details-close-button'>Close</button>`,n("card-details-text"),document.getElementById("details-close-button").addEventListener("click",(()=>o("card-details-text")))}(t)))))}(e)}!function(){let t=0;const e=localStorage.getItem("cards");e&&(c=JSON.parse(e),c.forEach((e=>{r(e,t),d(t),t+=1})))}(),document.querySelectorAll("button").forEach((d=>{d.addEventListener("click",(l=>{if("add-button"===d.id)n("myForm");else if("submit-button"===d.id){if(!0===function(){const t=document.forms.myForm.title.value,e=document.forms.myForm.date.value;return""!==t&&""!==e}()){const t=document.getElementById("myForm"),e=new FormData(t);l.preventDefault(),(t=>{const e={title:"",desc:"",priority:"",date:"",done:!1};for(const[n,o]of t)"title"===n?e.title=o:"desc"===n?e.desc=o:"priority"===n?e.priority=o:"date"===n?e.date=o:console.log("Error");c.push(e),localStorage.setItem("cards",JSON.stringify(c)),r(e,c.length-1)})(e),o("myForm")}}else"inbox-button"===d.id?(t("content-inbox"),e("inbox")):"today-button"===d.id?(t("content-today"),e("today")):"week-button"===d.id&&(t("content-week"),e("week"))}))}))})();