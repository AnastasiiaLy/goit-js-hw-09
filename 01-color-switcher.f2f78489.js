const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");t.disabled=!1;let o=null;t.addEventListener("click",(function(){o=setInterval((()=>{!function(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;n.style.backgroundColor=t}()}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.f2f78489.js.map
