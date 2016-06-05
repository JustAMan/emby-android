define(["visibleinviewport","imageFetcher","layoutManager","events","browser"],function(e,t,n,r,i){function a(){b={innerHeight:window.innerHeight,innerWidth:window.innerWidth}}function o(){var e=screen.availWidth,t=screen.availHeight;n.mobile&&(e*=2,t*=2),w=e,p=t,a()}function s(t){return e(t,!0,w,p,b)}function u(e,r,i){r||(r=e.getAttribute("data-src")),r&&(L&&!n.tv&&i!==!1?t.loadImage(e,r).then(c):t.loadImage(e,r),e.setAttribute("data-src",""))}function c(e){var t=n.tv?160:300,r=[{opacity:"0",offset:0},{opacity:"1",offset:1}],i={duration:t,iterations:1};e.animate(r,i)}function v(e){for(var t=0,n=e.length;n>t;t++)e[t]=!0}function f(e,t,n,r){var i=r;z||(i=r.capture),e.addEventListener(t,n,i)}function l(e){for(var t=0,n={},r=new IntersectionObserver(function(n){for(var i=0,a=n.length;a>i;i++){var o=n[i],s=o.target;r.unobserve(s),u(s),t++}t>=e.length&&r.disconnect()},n),i=0,a=e.length;a>i;i++)r.observe(e[i])}function d(e,t){function n(t){for(var n=!1,o=!1,c=0,v=e.length;v>c;c++){if(a[t])return;if(!i[c]){var f=e[c];!o&&s(f)?(n=!0,i[c]=!0,u(f)):n&&(o=!0)}}e.length||(document.removeEventListener("focus",r,!0),document.removeEventListener("scroll",r,!0),document.removeEventListener(E,r,!0),window.removeEventListener("resize",r,!0))}function r(){v(a);var e=a.length;a.length++,setTimeout(function(){n(e)},1)}if(e.length){if(y)return void l(e,t);var i=[],a=[];f(document,"scroll",r,{capture:!0,passive:!0}),document.addEventListener("focus",r,!0),f(document,E,r,{capture:!0,passive:!0}),f(window,"resize",r,{capture:!0,passive:!0}),r()}}function h(e){d(e.getElementsByClassName("lazy"),e)}function g(e){for(var t=[],n=0,r=e.length;r>n;n++){var i=e[n].PrimaryImageAspectRatio||0;i&&(t[t.length]=i)}if(!t.length)return null;t.sort(function(e,t){return e-t});var a,o=Math.floor(t.length/2);a=t.length%2?t[o]:(t[o-1]+t[o])/2;var s=2/3;if(Math.abs(s-a)<=.15)return s;var u=16/9;if(Math.abs(u-a)<=.2)return u;if(Math.abs(1-a)<=.15)return 1;var c=4/3;return Math.abs(c-a)<=.15?c:a}function m(e){for(var t=0,n=e.length;n>t;t++){var r=e[0];u(r)}}var w,p,b,y=function(){if(window.IntersectionObserver){if(i.chrome){var e=parseInt(i.version.split(".")[0]);return e>=51}return!0}return!1}();y||(window.addEventListener("orientationchange",o),window.addEventListener("resize",o),r.on(n,"modechange",o),o());var E=document.implementation.hasFeature("Event.wheel","3.0")?"wheel":"mousewheel",I={},L=i.animate&&!i.mobile&&!i.operaTv,z=!1;try{var M=Object.defineProperty({},"capture",{get:function(){z=!0}});window.addEventListener("test",null,M)}catch(A){}return I.fillImages=m,I.lazyImage=u,I.lazyChildren=h,I.getPrimaryImageAspectRatio=g,I});