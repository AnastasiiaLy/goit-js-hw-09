const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");t.disabled=!1;t.addEventListener("click",(function(){timerId=setInterval((()=>{!function(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;n.style.backgroundColor=t}()}),1e3),t.disabled=!0})),e.addEventListener("click",(function(){t.disabled=!1,clearInterval(timerId)}));
//# sourceMappingURL=01-color-switcher.a0957643.js.map
