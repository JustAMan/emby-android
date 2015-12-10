!function(e,t,r,a,n,i){function o(){function t(){var e=P.currentMediaRenderer,t=P.getCurrentSrc(e);if(-1!=(t||"").indexOf(".m3u8"))return!0;var r=e.duration();return r&&!isNaN(r)&&r!=Number.POSITIVE_INFINITY&&r!=Number.NEGATIVE_INFINITY}function o(e,t,r,a){m(),Events.off(e,"ended",P.onPlaybackStopped),Events.off(e,"ended",P.playNextAfterEnded),$(e).one("play",function(){Events.on(this,"ended",P.onPlaybackStopped),$(this).one("ended",P.playNextAfterEnded),P.startProgressInterval(),p()}),"Video"==P.currentItem.MediaType?(ApiClient.stopActiveEncodings(t).then(function(){P.setSrcIntoRenderer(e,r,P.currentItem,P.currentMediaSource)}),P.startTimeTicksOffset=a||0,P.updateTextStreamUrls(a||0)):(P.startTimeTicksOffset=a||0,P.setSrcIntoRenderer(e,r,P.currentItem,P.currentMediaSource))}function s(e){var t,r=e[0];return"Playlist"==r.Type?t=P.getItemsForPlayback({ParentId:r.Id}):"MusicArtist"==r.Type?t=P.getItemsForPlayback({ArtistIds:r.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):"MusicGenre"==r.Type?t=P.getItemsForPlayback({Genres:r.Name,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio"}):r.IsFolder&&(t=P.getItemsForPlayback({ParentId:r.Id,Filters:"IsNotFolder",Recursive:!0,SortBy:"SortName",MediaTypes:"Audio,Video"})),new Promise(t?function(e){t.then(function(t){e(t.Items)})}:function(t){t(e)})}function u(e,t){var r=$.Deferred(),a=t.map(function(e){return MediaController.supportsDirectPlay(e)});return Promise.all(a).then(function(e){for(var a=0,n=t.length;n>a;a++)t[a].enableDirectPlay=e[a]||!1;var i=t.filter(function(e){return e.enableDirectPlay})[0];i||(i=t.filter(function(e){return e.SupportsDirectStream})[0]),i=i||t.filter(function(e){return e.SupportsTranscoding})[0],r.resolveWith(null,[i])}),r.promise()}function l(e,t,r,a){P.tryStartPlayback(e,t,r,function(e){d(t,e,r,a)})}function d(e,t,r,a){Dashboard.hideLoadingMsg(),P.currentMediaSource=t,P.currentItem=e,"Video"===e.MediaType?requirejs(["videorenderer","scripts/mediaplayer-video"],function(){P.playVideo(e,P.currentMediaSource,r,a)}):"Audio"===e.MediaType&&f(e,P.currentMediaSource,r,a)}function c(e){return e.ErrorCode?(MediaController.showPlaybackInfoErrorMessage(e.ErrorCode),!1):!0}function p(){var e=P.currentMediaRenderer;if(e.enableProgressReporting!==!1){var t=P.getPlayerStateInternal(e,P.currentItem,P.currentMediaSource),r={QueueableMediaTypes:t.NowPlayingItem.MediaType,ItemId:t.NowPlayingItem.Id,NowPlayingItem:t.NowPlayingItem};r=$.extend(r,t.PlayState),ApiClient.reportPlaybackProgress(r)}}function m(){I&&(r(I),I=null)}function g(){if(v)return v;var t=[],r=e.createElement("video");r.canPlayType("video/webm").replace(/no/,"")&&t.push("webm"),r.canPlayType('audio/mp4; codecs="ac-3"').replace(/no/,"")&&t.push("ac3");var a=!0,n=navigator.userAgent.toLowerCase();return-1!=n.indexOf("firefox")&&-1==n.indexOf("windows")&&(a=!1),a&&t.push("h264"),e.createElement("audio").canPlayType("audio/aac").replace(/no/,"")&&t.push("aac"),e.createElement("audio").canPlayType("audio/mp3").replace(/no/,"")&&t.push("mp3"),v=t,t}function y(){var e=P.getCurrentTicks(this);P.setCurrentTime(e)}function f(e,t,r,a){requirejs(["audiorenderer"],function(){h(e,t,r),a&&a()})}function h(e,t,r){P.createStreamInfo("Audio",e,t,r).then(function(r){P.startTimeTicksOffset=r.startTimeTicksOffset;var a=P.getSavedVolume(),n=new AudioRenderer({poster:P.getPosterUrl(e)});Events.on(n,"volumechange.mediaplayerevent",function(){Logger.log("audio element event: volumechange"),P.onVolumeChanged(this)}),$(n).one("playing.mediaplayerevent",function(){Logger.log("audio element event: playing"),Events.on(this,"ended",P.onPlaybackStopped),$(this).one("ended",P.playNextAfterEnded),P.onPlaybackStart(this,e,t)}).on("pause.mediaplayerevent",function(){Logger.log("audio element event: pause"),P.onPlaystateChange(this),P.setCurrentTime(P.getCurrentTicks())}).on("playing.mediaplayerevent",function(){Logger.log("audio element event: playing"),P.onPlaystateChange(this),P.setCurrentTime(P.getCurrentTicks())}).on("timeupdate.mediaplayerevent",y),P.currentMediaRenderer=n,P.currentDurationTicks=P.currentMediaSource.RunTimeTicks,n.init().then(function(){n.volume(a),P.onBeforePlaybackStart(n,e,t),n.setCurrentSrc(r,e,t),P.streamInfo=r})})}var I,P=this,b=-1;P.currentMediaRenderer=null,P.currentItem=null,P.currentMediaSource=null,P.currentDurationTicks=null,P.startTimeTicksOffset=null,P.playlist=[],P.isLocalPlayer=!0,P.isDefaultPlayer=!0,P.streamInfo={},P.name="Html5 Player",P.getTargets=function(){var e=[{name:Globalize.translate("MyDevice"),id:AppInfo.deviceId,playerName:P.name,playableMediaTypes:["Audio","Video"],isLocalPlayer:!0,supportedCommands:Dashboard.getSupportedRemoteCommands()}];return e},P.getVideoQualityOptions=function(e,t){var r=AppSettings.maxStreamingBitrate(),a=e||4096,n=[];a>=1900?(n.push({name:"1080p - 40Mbps",maxHeight:1080,bitrate:4e7}),n.push({name:"1080p - 35Mbps",maxHeight:1080,bitrate:35e6}),n.push({name:"1080p - 30Mbps",maxHeight:1080,bitrate:3e7}),n.push({name:"1080p - 25Mbps",maxHeight:1080,bitrate:25e6}),n.push({name:"1080p - 20Mbps",maxHeight:1080,bitrate:2e7}),n.push({name:"1080p - 15Mbps",maxHeight:1080,bitrate:15e6}),n.push({name:"1080p - 10Mbps",maxHeight:1080,bitrate:10000001}),n.push({name:"1080p - 8Mbps",maxHeight:1080,bitrate:8000001}),n.push({name:"1080p - 6Mbps",maxHeight:1080,bitrate:6000001}),n.push({name:"1080p - 5Mbps",maxHeight:1080,bitrate:5000001}),n.push({name:"1080p - 4Mbps",maxHeight:1080,bitrate:4000002})):a>=1260?(n.push({name:"720p - 10Mbps",maxHeight:720,bitrate:1e7}),n.push({name:"720p - 8Mbps",maxHeight:720,bitrate:8e6}),n.push({name:"720p - 6Mbps",maxHeight:720,bitrate:6e6}),n.push({name:"720p - 5Mbps",maxHeight:720,bitrate:5e6})):a>=700&&(n.push({name:"480p - 4Mbps",maxHeight:480,bitrate:4000001}),n.push({name:"480p - 3Mbps",maxHeight:480,bitrate:3000001}),n.push({name:"480p - 2.5Mbps",maxHeight:480,bitrate:25e5}),n.push({name:"480p - 2Mbps",maxHeight:480,bitrate:2000001}),n.push({name:"480p - 1.5Mbps",maxHeight:480,bitrate:1500001})),a>=1260&&(n.push({name:"720p - 4Mbps",maxHeight:720,bitrate:4e6}),n.push({name:"720p - 3Mbps",maxHeight:720,bitrate:3e6}),n.push({name:"720p - 2Mbps",maxHeight:720,bitrate:2e6}),n.push({name:"720p - 1.5Mbps",maxHeight:720,bitrate:15e5}),n.push({name:"720p - 1Mbps",maxHeight:720,bitrate:1000001})),n.push({name:"480p - 1.0Mbps",maxHeight:480,bitrate:1e6}),n.push({name:"480p - 720kbps",maxHeight:480,bitrate:72e4}),n.push({name:"480p - 420kbps",maxHeight:480,bitrate:42e4}),n.push({name:"360p",maxHeight:360,bitrate:4e5}),n.push({name:"240p",maxHeight:240,bitrate:32e4}),n.push({name:"144p",maxHeight:144,bitrate:192e3});var i,o,s,u=-1;for(i=0,o=n.length;o>i;i++)s=n[i],-1==u&&s.bitrate<=r&&(u=i);return-1==u&&(u=n.length-1),n[u].selected=!0,n},P.getDeviceProfile=function(e){e||(e=P.getVideoQualityOptions().filter(function(e){return e.selected})[0].maxHeight);var t=AppInfo.isNativeApp&&browserInfo.android,r=AppSettings.maxStreamingBitrate(),a=g(),n=-1!=a.indexOf("webm"),i=-1!=a.indexOf("ac3"),o=-1!=a.indexOf("aac"),s=-1!=a.indexOf("mp3"),u={};u.MaxStreamingBitrate=r,u.MaxStaticBitrate=8e6,u.MusicStreamingTranscodingBitrate=Math.min(r,192e3),u.DirectPlayProfiles=[],-1!=a.indexOf("h264")&&u.DirectPlayProfiles.push({Container:"mp4,m4v",Type:"Video",VideoCodec:"h264",AudioCodec:"aac"+(s?",mp3":"")+(i?",ac3":"")}),browserInfo.chrome&&u.DirectPlayProfiles.push({Container:"mkv,mov",Type:"Video",VideoCodec:"h264",AudioCodec:"aac"+(s?",mp3":"")+(i?",ac3":"")});var l=AppInfo.directPlayVideoContainers;l&&l.length&&u.DirectPlayProfiles.push({Container:l.join(","),Type:"Video"}),s&&u.DirectPlayProfiles.push({Container:"mp3",Type:"Audio"}),o&&u.DirectPlayProfiles.push({Container:"aac",Type:"Audio"});var d=AppInfo.directPlayAudioContainers;return d&&d.length&&u.DirectPlayProfiles.push({Container:d.join(","),Type:"Audio"}),n&&(u.DirectPlayProfiles.push({Container:"webm",Type:"Video"}),u.DirectPlayProfiles.push({Container:"webm,webma",Type:"Audio"})),u.TranscodingProfiles=[],P.canPlayHls()&&(u.TranscodingProfiles.push({Container:"ts",Type:"Video",AudioCodec:"aac"+(i?",ac3":""),VideoCodec:"h264",Context:"Streaming",Protocol:"hls"}),o&&browserInfo.safari&&!AppInfo.isNativeApp&&u.TranscodingProfiles.push({Container:"ts",Type:"Audio",AudioCodec:"aac",Context:"Streaming",Protocol:"hls"})),n&&u.TranscodingProfiles.push({Container:"webm",Type:"Video",AudioCodec:"vorbis",VideoCodec:"vpx",Context:"Streaming",Protocol:"http"}),u.TranscodingProfiles.push({Container:"mp4",Type:"Video",AudioCodec:"aac",VideoCodec:"h264",Context:"Streaming",Protocol:"http"}),u.TranscodingProfiles.push({Container:"mp4",Type:"Video",AudioCodec:"aac",VideoCodec:"h264",Context:"Static",Protocol:"http"}),o&&browserInfo.safari?(u.TranscodingProfiles.push({Container:"aac",Type:"Audio",AudioCodec:"aac",Context:"Streaming",Protocol:"http"}),u.TranscodingProfiles.push({Container:"aac",Type:"Audio",AudioCodec:"aac",Context:"Static",Protocol:"http"})):(u.TranscodingProfiles.push({Container:"mp3",Type:"Audio",AudioCodec:"mp3",Context:"Streaming",Protocol:"http"}),u.TranscodingProfiles.push({Container:"mp3",Type:"Audio",AudioCodec:"mp3",Context:"Static",Protocol:"http"})),u.ContainerProfiles=[],u.CodecProfiles=[],u.CodecProfiles.push({Type:"Audio",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:"2"}]}),t||u.CodecProfiles.push({Type:"VideoAudio",Codec:"aac",Container:"mkv,mov",Conditions:[{Condition:"NotEquals",Property:"AudioProfile",Value:"HE-AAC"}]}),u.CodecProfiles.push({Type:"VideoAudio",Codec:"aac",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:"6"}]}),t&&u.CodecProfiles.push({Type:"VideoAudio",Codec:"dca",Conditions:[{Condition:"LessThanEqual",Property:"AudioChannels",Value:6}]}),u.CodecProfiles.push(t?{Type:"Video",Codec:"h264",Conditions:[{Condition:"EqualsAny",Property:"VideoProfile",Value:"high|main|baseline|constrained baseline"},{Condition:"LessThanEqual",Property:"VideoLevel",Value:"41"}]}:{Type:"Video",Codec:"h264",Conditions:[{Condition:"NotEquals",Property:"IsAnamorphic",Value:"true",IsRequired:!1},{Condition:"EqualsAny",Property:"VideoProfile",Value:"high|main|baseline|constrained baseline"},{Condition:"LessThanEqual",Property:"VideoLevel",Value:"41"},{Condition:"LessThanEqual",Property:"Height",Value:e}]}),t||u.CodecProfiles.push({Type:"Video",Codec:"vpx",Conditions:[{Condition:"NotEquals",Property:"IsAnamorphic",Value:"true",IsRequired:!1},{Condition:"LessThanEqual",Property:"Height",Value:e}]}),u.SubtitleProfiles=[],P.supportsTextTracks()&&(t?(u.SubtitleProfiles.push({Format:"srt",Method:"External"}),u.SubtitleProfiles.push({Format:"srt",Method:"Embed"}),u.SubtitleProfiles.push({Format:"subrip",Method:"Embed"}),u.SubtitleProfiles.push({Format:"ass",Method:"Embed"}),u.SubtitleProfiles.push({Format:"ssa",Method:"Embed"}),u.SubtitleProfiles.push({Format:"pgs",Method:"Embed"}),u.SubtitleProfiles.push({Format:"pgssub",Method:"Embed"}),u.SubtitleProfiles.push({Format:"dvdsub",Method:"Embed"}),u.SubtitleProfiles.push({Format:"vtt",Method:"Embed"}),u.SubtitleProfiles.push({Format:"sub",Method:"Embed"}),u.SubtitleProfiles.push({Format:"idx",Method:"Embed"})):u.SubtitleProfiles.push({Format:"vtt",Method:"External"})),u.ResponseProfiles=[],u.ResponseProfiles.push({Type:"Video",Container:"m4v",MimeType:"video/mp4"}),u.ResponseProfiles.push({Type:"Video",Container:"mov",MimeType:"video/webm"}),u};var T;P.supportsTextTracks=function(){return null==T&&(T=null!=e.createElement("video").textTracks),T},P.getCurrentSrc=function(e){return e.currentSrc()},P.getCurrentTicks=function(e){var t=Math.floor(1e4*(e||P.currentMediaRenderer).currentTime());return t+=P.startTimeTicksOffset},P.playNextAfterEnded=function(){P.nextTrack()},P.startProgressInterval=function(){m();var e=ApiClient.isWebSocketOpen()?1200:5e3;browserInfo.safari&&(e=Math.max(e,5e3)),P.lastProgressReport=0,I=n(function(){P.currentMediaRenderer&&(new Date).getTime()-P.lastProgressReport>e&&(P.lastProgressReport=(new Date).getTime(),p())},250)},P.getCurrentMediaExtension=function(e){return e=e.split("?")[0],e.substring(e.lastIndexOf("."))},P.canPlayNativeHls=function(){if(AppInfo.isNativeApp)return!0;var t=e.createElement("video");return t.canPlayType("application/x-mpegURL").replace(/no/,"")||t.canPlayType("application/vnd.apple.mpegURL").replace(/no/,"")?!0:!1},P.canPlayHls=function(){return P.canPlayNativeHls()?!0:null!=i.MediaSource},P.changeStream=function(e,r){var a=P.currentMediaRenderer;if(t()&&null==r)return void a.currentTime(e/1e4);r=r||{};var n=a.currentSrc(),i=getParameterByName("PlaySessionId",n),s=getParameterByName("LiveStreamId",n),u=P.getDeviceProfile(),l=null==r.AudioStreamIndex?getParameterByName("AudioStreamIndex",n)||null:r.AudioStreamIndex;"string"==typeof l&&(l=parseInt(l));var d=null==r.SubtitleStreamIndex?getParameterByName("SubtitleStreamIndex",n)||null:r.SubtitleStreamIndex;"string"==typeof d&&(d=parseInt(d)),MediaController.getPlaybackInfo(P.currentItem.Id,u,e,P.currentMediaSource,l,d,s).then(function(t){c(t)&&(P.currentMediaSource=t.MediaSources[0],P.createStreamInfo(P.currentItem.MediaType,P.currentItem,P.currentMediaSource,e).then(function(e){return e.url?(P.currentSubtitleStreamIndex=d,void o(a,i,e,e.startTimeTicksOffset||0)):(MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"),void P.stop())}))})},P.setSrcIntoRenderer=function(e,t,r,a){for(var n=a.MediaStreams.filter(function(e){return"Subtitle"==e.Type}),i=n.filter(function(e){return"External"==e.DeliveryMethod}),o=[],s=0,u=i.length;u>s;s++){var l=i[s],d=l.IsExternalUrl?l.DeliveryUrl:ApiClient.getUrl(l.DeliveryUrl);o.push({url:d,language:l.Language||"und",isDefault:l.Index==a.DefaultSubtitleStreamIndex})}e.setCurrentSrc(t,r,a,o),P.streamInfo=t},P.setCurrentTime=function(e,r,a){e=Math.floor(e);var n=Dashboard.getDisplayTime(e),i=P.currentMediaRenderer;if(P.currentDurationTicks&&(n+=" / "+Dashboard.getDisplayTime(P.currentDurationTicks),r)){var o=e/P.currentDurationTicks;o*=100,r.value=o}r&&(r.disabled=!((P.currentDurationTicks||0)>0||t())),a&&a.html(n);var s=P.getPlayerStateInternal(i,P.currentItem,P.currentMediaSource);Events.trigger(P,"positionchange",[s])},P.canQueueMediaType=function(e){return P.currentItem&&P.currentItem.MediaType==e},P.play=function(e){Dashboard.showLoadingMsg(),Dashboard.getCurrentUser().then(function(t){e.items?s(e.items).then(function(r){P.playWithIntros(r,e,t)}):P.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(r){s(r.Items).then(function(r){P.playWithIntros(r,e,t)})})})},P.playWithIntros=function(e,t,r){var a=e[0];return"Video"===a.MediaType&&Dashboard.showLoadingMsg(),t.startPositionTicks||"Video"!==a.MediaType||!AppSettings.enableCinemaMode()?void P.playInternal(a,t.startPositionTicks,function(){P.setPlaylistState(0,e)}):void ApiClient.getJSON(ApiClient.getUrl("Users/"+r.Id+"/Items/"+a.Id+"/Intros")).then(function(r){e=r.Items.concat(e),P.playInternal(e[0],t.startPositionTicks,function(){P.setPlaylistState(0,e)})})},P.createStreamInfo=function(e,t,r,a){var n,i,o=$.Deferred(),s=0,u=a?a/1e7:0,l=u?"#t="+u:"",d="Transcode";if("Video"==e)if(i="video/"+r.Container,r.enableDirectPlay)n=r.Path,d="DirectPlay";else if(r.SupportsDirectStream){var c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),n=ApiClient.getUrl("Videos/"+t.Id+"/stream."+r.Container,c),n+=l,d="DirectStream"}else r.SupportsTranscoding&&(n=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(r.RunTimeTicks&&(n+="&EnableAutoStreamCopy=false"),n+=l,i="application/x-mpegURL"):(n+="&EnableAutoStreamCopy=false",s=a||0,i="video/"+r.TranscodingContainer));else if(i="audio/"+r.Container,r.enableDirectPlay)n=r.Path,d="DirectPlay";else{var p=r.SupportsDirectStream;if(p){var m=(r.Container||"").toLowerCase(),c={Static:!0,mediaSourceId:r.Id,deviceId:ApiClient.deviceId(),api_key:ApiClient.accessToken()};r.LiveStreamId&&(c.LiveStreamId=r.LiveStreamId),n=ApiClient.getUrl("Audio/"+t.Id+"/stream."+m,c),n+=l,d="DirectStream"}else r.SupportsTranscoding&&(n=ApiClient.getUrl(r.TranscodingUrl),"hls"==r.TranscodingSubProtocol?(n+=l,i="application/x-mpegURL"):(s=a||0,i="audio/"+r.TranscodingContainer))}var g={url:n,mimeType:i,startTimeTicksOffset:s,startPositionInSeekParam:u,playMethod:d};return"DirectPlay"==d&&"File"==r.Protocol?require(["localassetmanager"],function(){LocalAssetManager.translateFilePath(g.url).then(function(e){g.url=e,Logger.log("LocalAssetManager.translateFilePath: path: "+g.url+" result: "+e),o.resolveWith(null,[g])})}):o.resolveWith(null,[g]),o.promise()},P.lastBitrateDetections={},P.playInternal=function(e,t,r){if(null==e)throw new Error("item cannot be null");if(P.isPlaying()&&P.stop(!1),"Audio"!==e.MediaType&&"Video"!==e.MediaType)throw new Error("Unrecognized media type");if(e.IsPlaceHolder)return Dashboard.hideLoadingMsg(),void MediaController.showPlaybackInfoErrorMessage("PlaceHolder");var a=ApiClient.serverAddress();"Video"==e.MediaType&&AppSettings.enableAutomaticBitrateDetection()&&(new Date).getTime()-(P.lastBitrateDetections[a]||0)>3e5?(Dashboard.showLoadingMsg(),ApiClient.detectBitrate().then(function(n){Logger.log("Max bitrate auto detected to "+n),P.lastBitrateDetections[a]=(new Date).getTime(),AppSettings.maxStreamingBitrate(n),l(P.getDeviceProfile(),e,t,r)},function(){l(P.getDeviceProfile(),e,t,r)})):l(P.getDeviceProfile(),e,t,r)},P.tryStartPlayback=function(e,t,r,a){"Video"===t.MediaType&&Dashboard.showLoadingMsg(),MediaController.getPlaybackInfo(t.Id,e,r).then(function(n){c(n)&&u(t.MediaType,n.MediaSources).then(function(i){i?i.RequiresOpening?MediaController.getLiveStream(t.Id,n.PlaySessionId,e,r,i,null,null).then(function(e){MediaController.supportsDirectPlay(e.MediaSource).then(function(t){e.MediaSource.enableDirectPlay=t,a(e.MediaSource)})}):a(i):(Dashboard.hideLoadingMsg(),MediaController.showPlaybackInfoErrorMessage("NoCompatibleStream"))})})},P.getPosterUrl=function(e){var t=Math.max(a.height,a.width);return e.BackdropImageTags&&e.BackdropImageTags.length?ApiClient.getScaledImageUrl(e.Id,{type:"Backdrop",index:0,maxWidth:t,tag:e.BackdropImageTags[0]}):e.ParentBackdropItemId&&e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length?ApiClient.getScaledImageUrl(e.ParentBackdropItemId,{type:"Backdrop",index:0,maxWidth:t,tag:e.ParentBackdropImageTags[0]}):null},P.displayContent=function(e){Dashboard.onBrowseCommand(e)},P.getItemsForPlayback=function(e){var t=Dashboard.getCurrentUserId();return e.Ids&&1==e.Ids.split(",").length?new Promise(function(r){ApiClient.getItem(t,e.Ids.split(",")).then(function(e){r({Items:[e],TotalRecordCount:1})})}):(e.Limit=e.Limit||100,e.Fields=M,e.ExcludeLocationTypes="Virtual",ApiClient.getItems(t,e))},P.removeFromPlaylist=function(e){P.playlist.remove(e)},P.currentPlaylistIndex=function(e){if(null==e)return b;var t=P.playlist[e];P.playInternal(t,0,function(){P.setPlaylistState(e)})},P.setPlaylistState=function(e,t){isNaN(e)||(b=e),t&&(P.playlist=t),P.updatePlaylistUi&&P.updatePlaylistUi()},P.nextTrack=function(){var e;switch(P.getRepeatMode()){case"RepeatOne":e=b;break;case"RepeatAll":e=b+1,e>=P.playlist.length&&(e=0);break;default:e=b+1}var t=P.playlist[e];t&&(Logger.log("playing next track"),P.playInternal(t,0,function(){P.setPlaylistState(e)}))},P.previousTrack=function(){var e=b-1;if(e>=0){var t=P.playlist[e];t&&P.playInternal(t,0,function(){P.setPlaylistState(e)})}},P.queueItemsNext=function(e){for(var t=1,r=0,a=e.length;a>r;r++)P.playlist.splice(t,0,e[r]),t++},P.queueItems=function(e){for(var t=0,r=e.length;r>t;t++)P.playlist.push(e[t])},P.queue=function(e){return P.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?s(e.items).then(function(e){P.queueItems(e)}):P.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(e){s(e.Items).then(function(e){P.queueItems(e)})})}):void P.play(e)},P.queueNext=function(e){return P.playlist.length?void Dashboard.getCurrentUser().then(function(){e.items?P.queueItemsNext(e.items):P.getItemsForPlayback({Ids:e.ids.join(",")}).then(function(t){e.items=t.Items,P.queueItemsNext(e.items)})}):void P.play(e)},P.pause=function(){P.currentMediaRenderer.pause()},P.unpause=function(){P.currentMediaRenderer.unpause()},P.seek=function(e){P.changeStream(e)},P.mute=function(){P.setVolume(0)},P.unMute=function(){P.setVolume(100*P.getSavedVolume())},P.volume=function(){return 100*P.currentMediaRenderer.volume()},P.toggleMute=function(){P.currentMediaRenderer&&(Logger.log("MediaPlayer toggling mute"),P.volume()?P.mute():P.unMute())},P.volumeDown=function(){P.currentMediaRenderer&&P.setVolume(Math.max(P.volume()-2,0))},P.volumeUp=function(){P.currentMediaRenderer&&P.setVolume(Math.min(P.volume()+2,100))},P.setVolume=function(e){P.currentMediaRenderer&&(Logger.log("MediaPlayer setting volume to "+e),P.currentMediaRenderer.volume(e/100),P.onVolumeChanged(P.currentMediaRenderer))},P.saveVolume=function(e){e&&appStorage.setItem("volume",e)},P.getSavedVolume=function(){return appStorage.getItem("volume")||.5},P.shuffle=function(e){var t=Dashboard.getCurrentUserId();ApiClient.getItem(t,e).then(function(r){var a={UserId:t,Fields:M,Limit:100,Filters:"IsNotFolder",Recursive:!0,SortBy:"Random"};if("MusicArtist"==r.Type)a.MediaTypes="Audio",a.ArtistIds=r.Id;else if("MusicGenre"==r.Type)a.MediaTypes="Audio",a.Genres=r.Name;else{if(!r.IsFolder)return;a.ParentId=e}P.getItemsForPlayback(a).then(function(e){P.play({items:e.Items})})})},P.instantMix=function(e){var t=100;ApiClient.getInstantMixFromItem(e,{UserId:Dashboard.getCurrentUserId(),Fields:M,Limit:t}).then(function(e){P.play({items:e.Items})})},P.stop=function(e){var t=P.currentMediaRenderer;t?(t.stop(),Events.off(t,"ended",P.playNextAfterEnded),$(t).one("ended",function(){$(this).off(".mediaplayerevent"),this.cleanup(e),P.currentMediaRenderer=null,P.currentItem=null,P.currentMediaSource=null,P.currentSubtitleStreamIndex=null,P.streamInfo={}}),Events.trigger(t,"ended")):(P.currentMediaRenderer=null,P.currentItem=null,P.currentMediaSource=null,P.currentSubtitleStreamIndex=null,P.streamInfo={}),P.resetEnhancements&&P.resetEnhancements()},P.isPlaying=function(){return P.playlist.length>0},P.getPlayerState=function(){var e=$.Deferred(),t=P.getPlayerStateInternal(P.currentMediaRenderer,P.currentItem,P.currentMediaSource);return e.resolveWith(null,[t]),e.promise()},P.getPlayerStateInternal=function(e,r,a){var n={PlayState:{}};if(e){n.PlayState.VolumeLevel=100*e.volume(),n.PlayState.IsMuted=0==e.volume(),n.PlayState.IsPaused=e.paused(),n.PlayState.PositionTicks=P.getCurrentTicks(e),n.PlayState.RepeatMode=P.getRepeatMode();var i=e.currentSrc();if(i){var o=getParameterByName("AudioStreamIndex",i);o&&(n.PlayState.AudioStreamIndex=parseInt(o)),n.PlayState.SubtitleStreamIndex=P.currentSubtitleStreamIndex,n.PlayState.PlayMethod=P.streamInfo.playMethod,n.PlayState.LiveStreamId=a.LiveStreamId,n.PlayState.PlaySessionId=getParameterByName("PlaySessionId",i)}}return a&&(n.PlayState.MediaSourceId=a.Id,n.NowPlayingItem={RunTimeTicks:a.RunTimeTicks},n.PlayState.CanSeek=(a.RunTimeTicks||0)>0||t()),r&&(n.NowPlayingItem=P.getNowPlayingItemForReporting(r,a)),n},P.getNowPlayingItemForReporting=function(e,t){var r={};r.RunTimeTicks=t.RunTimeTicks,r.Id=e.Id,r.MediaType=e.MediaType,r.Type=e.Type,r.Name=e.Name,r.IndexNumber=e.IndexNumber,r.IndexNumberEnd=e.IndexNumberEnd,r.ParentIndexNumber=e.ParentIndexNumber,r.ProductionYear=e.ProductionYear,r.PremiereDate=e.PremiereDate,r.SeriesName=e.SeriesName,r.Album=e.Album,r.Artists=e.Artists;var a=e.ImageTags||{};return e.SeriesPrimaryImageTag?(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag):a.Primary?(r.PrimaryImageItemId=e.Id,r.PrimaryImageTag=a.Primary):e.AlbumPrimaryImageTag?(r.PrimaryImageItemId=e.AlbumId,r.PrimaryImageTag=e.AlbumPrimaryImageTag):e.SeriesPrimaryImageTag&&(r.PrimaryImageItemId=e.SeriesId,r.PrimaryImageTag=e.SeriesPrimaryImageTag),e.BackdropImageTags&&e.BackdropImageTags.length?(r.BackdropItemId=e.Id,r.BackdropImageTag=e.BackdropImageTags[0]):e.ParentBackdropImageTags&&e.ParentBackdropImageTags.length&&(r.BackdropItemId=e.ParentBackdropItemId,r.BackdropImageTag=e.ParentBackdropImageTags[0]),a.Thumb&&(r.ThumbItemId=e.Id,r.ThumbImageTag=a.Thumb),a.Logo?(r.LogoItemId=e.Id,r.LogoImageTag=a.Logo):e.ParentLogoImageTag&&(r.LogoItemId=e.ParentLogoItemId,r.LogoImageTag=e.ParentLogoImageTag),r},P.beginPlayerUpdates=function(){},P.endPlayerUpdates=function(){},P.onBeforePlaybackStart=function(e,t,r){var a=P.getPlayerStateInternal(e,t,r);Events.trigger(P,"beforeplaybackstart",[a])},P.onPlaybackStart=function(e,t,r){var a=P.getPlayerStateInternal(e,t,r);Events.trigger(P,"playbackstart",[a]),P.startProgressInterval()},P.onVolumeChanged=function(e){P.saveVolume(e.volume());var t=P.getPlayerStateInternal(e,P.currentItem,P.currentMediaSource);Events.trigger(P,"volumechange",[t])},P.cleanup=function(){},P.onPlaybackStopped=function(){Logger.log("playback stopped"),e.body.classList.remove("bodyWithPopupOpen");var t=this;Events.off(t,".mediaplayerevent"),Events.off(t,"ended",P.onPlaybackStopped);var r=P.currentItem,a=P.currentMediaSource,n=P.getPlayerStateInternal(t,r,a);P.cleanup(t),m(),"Video"==r.MediaType&&P.resetEnhancements(),Events.trigger(P,"playbackstop",[n])},P.onPlaystateChange=function(e){var t=P.getPlayerStateInternal(e,P.currentItem,P.currentMediaSource);Events.trigger(P,"playstatechange",[t])},i.addEventListener("beforeunload",function(){P.currentItem&&P.currentMediaRenderer&&I&&P.onPlaybackStopped.call(P.currentMediaRenderer)});var v;P.canAutoPlayAudio=function(){return AppInfo.isNativeApp?!0:browserInfo.mobile?!1:!0};var S="RepeatNone";P.getRepeatMode=function(){return S},P.setRepeatMode=function(e){S=e};var M="MediaSources,Chapters";P.tryPair=function(){var e=$.Deferred();return e.resolve(),e.promise()}}i.MediaPlayer=new o,i.MediaController.registerPlayer(i.MediaPlayer),i.MediaController.setActivePlayer(i.MediaPlayer,i.MediaPlayer.getTargets()[0])}(document,setTimeout,clearTimeout,screen,setInterval,window);