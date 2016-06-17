define(["datetime","paper-icon-button-light"],function(e){function t(){var e="";return e+='<div class="nowPlayingBar hide">',e+='<div class="nowPlayingBarPositionContainer sliderContainer">',e+='<input type="range" is="emby-slider" pin step=".1" min="0" max="100" value="0" class="nowPlayingBarPositionSlider"/>',e+="</div>",e+='<div class="nowPlayingBarInfoContainer">',e+='<div class="nowPlayingImage"></div>',e+='<div class="nowPlayingBarText"></div>',e+="</div>",e+='<div class="nowPlayingBarCenter">',e+='<button is="paper-icon-button-light" class="previousTrackButton mediaButton autoSize"><i class="md-icon">skip_previous</i></button>',e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton autoSize"><i class="md-icon">play_arrow</i></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton autoSize"><i class="md-icon">pause</i></button>',e+='<button is="paper-icon-button-light" class="stopButton mediaButton autoSize"><i class="md-icon">stop</i></button>',e+='<button is="paper-icon-button-light" class="nextTrackButton mediaButton autoSize"><i class="md-icon">skip_next</i></button>',e+='<div class="nowPlayingBarCurrentTime"></div>',e+="</div>",e+='<div class="nowPlayingBarRight">',e+='<button is="paper-icon-button-light" class="muteButton mediaButton autoSize"><i class="md-icon">volume_up</i></button>',e+='<button is="paper-icon-button-light" class="unmuteButton mediaButton autoSize"><i class="md-icon">volume_off</i></button>',e+='<div class="sliderContainer nowPlayingBarVolumeSliderContainer" style="width:100px;vertical-align:middle;display:inline-flex;">',e+='<input type="range" is="emby-slider" pin step="1" min="0" max="100" value="0" class="nowPlayingBarVolumeSlider"/>',e+="</div>",e+='<button is="paper-icon-button-light" class="toggleRepeatButton mediaButton autoSize"><i class="md-icon">repeat</i></button>',e+='<div class="nowPlayingBarUserDataButtons">',e+="</div>",e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton autoSize"><i class="md-icon">play_arrow</i></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton autoSize"><i class="md-icon">pause</i></button>',e+='<button is="paper-icon-button-light" class="remoteControlButton mediaButton autoSize"><i class="md-icon">tablet_android</i></button>',e+='<button is="paper-icon-button-light" class="playlistButton mediaButton autoSize"><i class="md-icon">queue_music</i></button>',e+="</div>",e+="</div>"}function n(e){return H||(H=e.offsetHeight),H+"px"}function i(e){if(!e.classList.contains("hide")){var t=function(){e.classList.add("hide")};return!browserInfo.animate||browserInfo.mobile?void t():void requestAnimationFrame(function(){var i=[{height:n(e),offset:0},{height:"0",display:"none",offset:1}],a={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(i,a).onfinish=t})}}function a(e){e.classList.contains("hide")&&(e.classList.remove("hide"),browserInfo.animate&&!browserInfo.mobile&&requestAnimationFrame(function(){var t=[{height:"0",offset:0},{height:n(e),offset:1}],i={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(t,i)}))}function o(){I&&I.pause()}function s(){I&&I.unpause()}function r(t){S=t.querySelector(".nowPlayingBarCurrentTime"),L=t.querySelector(".nowPlayingImage"),k=t.querySelector(".nowPlayingBarText"),M=t.querySelector(".nowPlayingBarUserDataButtons"),R=t.querySelector(".unmuteButton"),R.addEventListener("click",function(){I&&I.unMute()}),C=t.querySelector(".muteButton"),C.addEventListener("click",function(){I&&I.mute()}),t.querySelector(".stopButton").addEventListener("click",function(){I&&I.stop()});var n,i;for(x=t.querySelectorAll(".pauseButton"),n=0,i=x.length;i>n;n++)x[n].addEventListener("click",o);for(q=t.querySelectorAll(".unpauseButton"),n=0,i=q.length;i>n;n++)q[n].addEventListener("click",s);t.querySelector(".nextTrackButton").addEventListener("click",function(){I&&I.nextTrack()}),t.querySelector(".previousTrackButton").addEventListener("click",function(){I&&I.previousTrack()}),t.querySelector(".remoteControlButton").addEventListener("click",function(){l()}),t.querySelector(".playlistButton").addEventListener("click",function(){l(2)}),A=t.querySelector(".toggleRepeatButton"),A.addEventListener("click",function(){if(I){var e=D||{};switch((e.PlayState||{}).RepeatMode){case"RepeatAll":I.setRepeatMode("RepeatOne");break;case"RepeatOne":I.setRepeatMode("RepeatNone");break;default:I.setRepeatMode("RepeatAll")}}}),z=A.querySelector("i"),setTimeout(function(){E=t.querySelector(".nowPlayingBarVolumeSlider"),E.addEventListener("change",function(){I&&I.setVolume(this.value)}),N=t.querySelector(".nowPlayingBarPositionSlider"),N.addEventListener("change",function(){if(I&&D){var e=parseFloat(this.value),t=e/100*D.NowPlayingItem.RunTimeTicks;I.seek(Math.floor(t))}}),N.getBubbleText=function(t){var n=D;if(!n||!n.NowPlayingItem||!n.NowPlayingItem.RunTimeTicks)return"--:--";var i=n.NowPlayingItem.RunTimeTicks;return i/=100,i*=t,e.getDisplayRunningTime(i)}},300)}function l(e){Dashboard.navigate(e?"nowplaying.html?tab="+e:"nowplaying.html")}function u(){return new Promise(function(e){return U?void e(U):void require(["css!css/nowplayingbar.css","emby-slider"],function(){return(U=document.querySelector(".nowPlayingBar"))?void e(U):(document.body.insertAdjacentHTML("beforeend",t()),U=document.querySelector(".nowPlayingBar"),browserInfo.safari&&browserInfo.mobile&&U.classList.add("noMediaProgress"),r(U),void e(U))})})}function c(e){e.classList.remove("hide")}function d(e){e.classList.add("hide")}function g(e,t){return t.NowPlayingItem?U?void m(e,t):void u().then(function(){m(e,t)}):void h()}function m(t,n){if(v(),"positionchange"==t.type){var i=(new Date).getTime();if(700>i-_)return;_=i}D=n;var a,o,s=MediaController.getPlayerInfo(),r=n.PlayState||{};if(r.IsPaused){for(a=0,o=x.length;o>a;a++)d(x[a]);for(a=0,o=q.length;o>a;a++)c(q[a])}else{for(a=0,o=x.length;o>a;a++)c(x[a]);for(a=0,o=q.length;o>a;a++)d(q[a])}p(n,s);var l=n.NowPlayingItem||{};if(N&&!N.dragging){if(l.RunTimeTicks){var u=r.PositionTicks/l.RunTimeTicks;u*=100,N.value=u}else N.value=0;N.disabled=!r.CanSeek}var g=e.getDisplayRunningTime(r.PositionTicks);l.RunTimeTicks&&(g+=" / "+e.getDisplayRunningTime(l.RunTimeTicks)),S.innerHTML=g,y(n)}function p(e,t){t=t||MediaController.getPlayerInfo();var n=e.PlayState||{},i=t.supportedCommands,a=!0,o=!0,s=!0;-1==i.indexOf("Mute")&&(a=!1),-1==i.indexOf("Unmute")&&(o=!1),n.IsMuted?a=!1:o=!1,-1==i.indexOf("SetRepeatMode")?A.classList.add("hide"):A.classList.remove("hide"),"RepeatAll"==n.RepeatMode?(z.innerHTML="repeat",A.classList.add("repeatActive")):"RepeatOne"==n.RepeatMode?(z.innerHTML="repeat_one",A.classList.add("repeatActive")):(z.innerHTML="repeat",A.classList.remove("repeatActive")),-1==i.indexOf("SetVolume")&&(s=!1),t.isLocalPlayer&&AppInfo.hasPhysicalVolumeButtons&&(a=!1,o=!1,s=!1),a?c(C):d(C),o?c(R):d(R),E&&(s?E.classList.remove("hide"):E.classList.add("hide"),E.dragging||(E.value=n.VolumeLevel||0))}function y(e){var t=MediaController.getNowPlayingNameHtml(e.NowPlayingItem)||"";-1!=t.indexOf("<br/>")?k.classList.add("nowPlayingDoubleText"):k.classList.remove("nowPlayingDoubleText"),e.NowPlayingItem.Id&&(t='<a style="color:inherit;text-decoration:none;" href="'+LibraryBrowser.getHref(e.NowPlayingItem)+'">'+t+"</a>"),k.innerHTML=t;var n,i=80,a=e.NowPlayingItem;n=a.PrimaryImageTag?ApiClient.getScaledImageUrl(a.PrimaryImageItemId,{type:"Primary",height:i,tag:a.PrimaryImageTag}):a.BackdropImageTag?ApiClient.getScaledImageUrl(a.BackdropItemId,{type:"Backdrop",height:i,tag:a.BackdropImageTag,index:0}):a.ThumbImageTag?ApiClient.getScaledImageUrl(a.ThumbImageItemId,{type:"Thumb",height:i,tag:a.ThumbImageTag}):"TvChannel"==a.Type||"Recording"==a.Type?"css/images/items/detail/tv.png":"Audio"==a.MediaType?"css/images/items/detail/audio.png":"css/images/items/detail/video.png",n!=V&&(V=n,ImageLoader.lazyImage(L,n),a.Id?ApiClient.getItem(Dashboard.getCurrentUserId(),a.Id).then(function(e){M.innerHTML=LibraryBrowser.getUserDataIconsHtml(e,!1)}):M.innerHTML="")}function f(e,t){var n=this;n.beginPlayerUpdates(),P.call(n,e,t)}function v(){u().then(a)}function h(){var e=document.getElementsByClassName("nowPlayingBar")[0];e&&i(e)}function b(e){var t=this;t.endPlayerUpdates(),h()}function P(e,t){var n=this;n.isDefaultPlayer&&t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType||g(e,t)}function B(){I&&(Events.off(I,"playbackstart",f),Events.off(I,"playbackstop",b),Events.off(I,"volumechange",T),Events.off(I,"playstatechange",P),Events.off(I,"positionchange",P),I.endPlayerUpdates(),I=null,h())}function T(){var e=this;Promise.all([e.getPlayerState(),u()]).then(function(t){var n=t[0];e.isDefaultPlayer&&n.NowPlayingItem&&"Video"==n.NowPlayingItem.MediaType||p(n)})}function w(e){B(),I=e,e.getPlayerState().then(function(t){t.NowPlayingItem&&e.beginPlayerUpdates(),P.call(e,{type:"init"},t)}),Events.on(e,"playbackstart",f),Events.on(e,"playbackstop",b),Events.on(e,"volumechange",T),Events.on(e,"playstatechange",P),Events.on(e,"positionchange",P)}var I,S,L,k,M,R,C,E,q,x,N,A,z,D,H,U,V,_=0;Events.on(MediaController,"playerchange",function(){w(MediaController.getCurrentPlayer())}),w(MediaController.getCurrentPlayer())});