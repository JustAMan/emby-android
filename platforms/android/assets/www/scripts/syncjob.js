define(["jQuery","datetime","paper-progress","paper-fab","paper-item-body","paper-icon-item","paper-icon-button-light","emby-button"],function(e,t){function n(n,i,o){var r="";r+="<div>",r+=Globalize.translate("ValueDateCreated",t.parseISO8601Date(i.DateCreated,!0).toLocaleString()),r+="</div>",r+="<br/>",r+='<div class="formFields"></div>',r+="<br/>",r+="<br/>",r+='<button is="emby-button" type="submit" class="raised submit block"><iron-icon icon="check"></iron-icon><span>'+Globalize.translate("ButtonSave")+"</span></button>",e(".syncJobForm",n).html(r),require(["syncDialog"],function(t){t.renderForm({elem:e(".formFields",n),dialogOptions:o,dialogOptionsFn:a(o),showName:!0,readOnlySyncTarget:!0}).then(function(){u(n,i,o)})})}function a(t){return function(){var n=e.Deferred();return n.resolveWith(null,[t]),n.promise()}}function i(e){var t="";t+='<paper-icon-item data-itemid="'+e.Id+'" data-status="'+e.Status+'" data-remove="'+e.IsMarkedForRemoval+'">';var n,a=-1!=["Queued","Cancelled","Failed","ReadyToTransfer","Transferring","Converting","Synced"].indexOf(e.Status);return e.PrimaryImageItemId&&(n=ApiClient.getImageUrl(e.PrimaryImageItemId,{type:"Primary",width:80,tag:e.PrimaryImageTag,minScale:1.5})),t+=n?'<paper-fab mini class="blue" style="background-image:url(\''+n+"');background-repeat:no-repeat;background-position:center center;background-size: cover;\" item-icon></paper-fab>":'<paper-fab mini class="blue" icon="sync" item-icon></paper-fab>',t+="<paper-item-body three-line>",t+="<div>",t+=e.ItemName,t+="</div>",t+="Failed"==e.Status?'<div secondary style="color:red;">':"<div secondary>",t+=Globalize.translate("SyncJobItemStatus"+e.Status),"Synced"==e.Status&&e.IsMarkedForRemoval&&(t+="<br/>",t+=Globalize.translate("SyncJobItemStatusSyncedMarkForRemoval")),t+="</div>",t+='<div secondary style="padding-top:5px;">',t+='<paper-progress class="mini" style="width:100%;" value="'+(e.Progress||0)+'"></paper-progress>',t+="</div>",t+="</paper-item-body>",t+=a?'<button type="button" is="paper-icon-button-light" class="btnJobItemMenu"><iron-icon icon="'+AppInfo.moreIcon+'"></iron-icon></button>':'<button type="button" is="paper-icon-button-light" class="btnJobItemMenu" disabled><iron-icon icon="'+AppInfo.moreIcon+'"></iron-icon></button>',t+="</paper-icon-item>"}function o(t,n){var a="";a+="<h1>"+Globalize.translate("HeaderItems")+"</h1>",a+='<div class="paperList">';var o=0;a+=n.map(function(e){return i(e,o++)}).join(""),a+="</div>";var s=e(".jobItems",t).html(a).lazyChildren();e(".btnJobItemMenu",s).on("click",function(){r(this)})}function r(t){var n=e(t).parents(".page"),a=e(t).parents("paper-icon-item"),i=a.attr("data-itemid"),o=a.attr("data-status"),r="true"==a.attr("data-remove").toLowerCase(),u=[];"Failed"==o?u.push({name:Globalize.translate("ButtonQueueForRetry"),id:"retry",ironIcon:"check"}):"Cancelled"==o?u.push({name:Globalize.translate("ButtonReenable"),id:"retry",ironIcon:"check"}):"Queued"==o||"Transferring"==o||"Converting"==o||"ReadyToTransfer"==o?u.push({name:Globalize.translate("ButtonCancelItem"),id:"cancel",ironIcon:"delete"}):"Synced"==o&&r?u.push({name:Globalize.translate("ButtonUnmarkForRemoval"),id:"unmarkforremoval",ironIcon:"check"}):"Synced"==o&&u.push({name:Globalize.translate("ButtonMarkForRemoval"),id:"markforremoval",ironIcon:"delete"}),require(["actionsheet"],function(e){e.show({items:u,positionTo:t,callback:function(e){switch(e){case"cancel":s(n,i);break;case"retry":d(n,i);break;case"markforremoval":c(n,i);break;case"unmarkforremoval":l(n,i)}}})})}function s(e,t){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Sync/JobItems/"+t)}).then(function(){p(e)})}function c(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/MarkForRemoval")}).then(function(){p(e)})}function l(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/UnmarkForRemoval")}).then(function(){p(e)})}function d(e,t){ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Sync/JobItems/"+t+"/Enable")}).then(function(){p(e)})}function u(t,n,a){var i=t.querySelector("#txtSyncJobName");i&&(i.value=n.Name),e("#selectProfile",t).val(n.Profile||"").trigger("change"),e("#selectQuality",t).val(n.Quality||"").trigger("change"),e("#chkUnwatchedOnly",t).checked(n.UnwatchedOnly),e("#chkSyncNewContent",t).checked(n.SyncNewContent),e("#txtItemLimit",t).val(n.ItemLimit),e("#txtBitrate",t).val(n.Bitrate?n.Bitrate/1e6:"");var o=a.Targets.filter(function(e){return e.Id==n.TargetId})[0],r=o?o.Name:"";e("#selectSyncTarget",t).val(r)}function p(e){Dashboard.showLoadingMsg();var t=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+t)).then(function(t){ApiClient.getJSON(ApiClient.getUrl("Sync/Options",{UserId:t.UserId,ItemIds:t.RequestedItemIds&&t.RequestedItemIds.length?t.RequestedItemIds.join(""):null,ParentId:t.ParentId,Category:t.Category,TargetId:t.TargetId})).then(function(a){v=a,n(e,t,a),Dashboard.hideLoadingMsg()})}),ApiClient.getJSON(ApiClient.getUrl("Sync/JobItems",{JobId:t,AddMetadata:!0})).then(function(t){o(e,t.Items),Dashboard.hideLoadingMsg()})}function m(e,t,n){o(e,n),Dashboard.hideLoadingMsg()}function b(e){Dashboard.showLoadingMsg();var t=getParameterByName("id");ApiClient.getJSON(ApiClient.getUrl("Sync/Jobs/"+t)).then(function(n){require(["syncDialog"],function(a){a.setJobValues(n,e),ApiClient.ajax({url:ApiClient.getUrl("Sync/Jobs/"+t),type:"POST",data:JSON.stringify(n),contentType:"application/json"}).then(function(){Dashboard.hideLoadingMsg(),require(["toast"],function(e){e(Globalize.translate("SettingsSaved"))})})})})}function g(t,n){var a=e.mobile.activePage;"SyncJob"==n.MessageType&&m(a,n.Data.Job,n.Data.JobItems)}function y(){var e="0,1500";e+=","+getParameterByName("id"),ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStart",e)}function f(){ApiClient.isWebSocketOpen()&&ApiClient.sendWebSocketMessage("SyncJobStop","")}function h(){var t=this,n=e(t).parents(".page");return b(n),!1}e.fn.lazyChildren=function(){for(var e=0,t=this.length;t>e;e++)ImageLoader.lazyChildren(this[e]);return this};var v;e(document).on("pageinit",".syncJobPage",function(){e(".syncJobForm").off("submit",h).on("submit",h)}).on("pageshow",".syncJobPage",function(){var e=this;p(e),y(e),Events.on(ApiClient,"websocketmessage",g)}).on("pagebeforehide",".syncJobPage",function(){f(),Events.off(ApiClient,"websocketmessage",g)})});