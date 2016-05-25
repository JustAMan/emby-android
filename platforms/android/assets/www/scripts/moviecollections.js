define(["jQuery"],function(e){function t(){var e=a(),t=n[e];return t||(t=n[e]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"BoxSet",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName,SyncInfo,CanDelete",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:LibraryBrowser.getDefaultPageSize()},view:LibraryBrowser.getSavedView(e)||LibraryBrowser.getDefaultItemsView("Poster","Poster")},LibraryBrowser.loadSavedQueryValues(e,t.query)),t}function r(){return t().query}function a(){return LibraryBrowser.getSavedQueryKey("collections")}function o(i){Dashboard.showLoadingMsg();var n=r(),s=ApiClient.getItems(Dashboard.getCurrentUserId(),n),l=Dashboard.getCurrentUser();Promise.all([s,l]).then(function(r){{var s=r[0];r[1]}window.scrollTo(0,0);var l="",u=t().view;e(".listTopPaging",i).html(LibraryBrowser.getQueryPagingHtml({startIndex:n.StartIndex,limit:n.Limit,totalRecordCount:s.TotalRecordCount,viewButton:!1,sortButton:!0,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!0,currentLayout:u})),s.TotalRecordCount?("List"==u?l=LibraryBrowser.getListViewHtml({items:s.Items,sortBy:n.SortBy}):"Poster"==u?l=LibraryBrowser.getPosterViewHtml({items:s.Items,shape:"auto",showTitle:!0,centerText:!0,lazy:!0,overlayPlayButton:!0}):"PosterCard"==u?l=LibraryBrowser.getPosterViewHtml({items:s.Items,shape:"auto",showTitle:!0,cardLayout:!0,lazy:!0,showItemCounts:!0}):"Thumb"==u?l=LibraryBrowser.getPosterViewHtml({items:s.Items,shape:"backdrop",showTitle:!0,centerText:!0,lazy:!0,preferThumb:!0,overlayPlayButton:!0}):"ThumbCard"==u&&(l=LibraryBrowser.getPosterViewHtml({items:s.Items,shape:"backdrop",showTitle:!0,lazy:!0,preferThumb:!0,cardLayout:!0,showItemCounts:!0})),e(".noItemsMessage",i).hide()):e(".noItemsMessage",i).show();var m=i.querySelector(".itemsContainer");m.innerHTML=l,ImageLoader.lazyChildren(m),e(".btnNextPage",i).on("click",function(){n.StartIndex+=n.Limit,o(i)}),e(".btnPreviousPage",i).on("click",function(){n.StartIndex-=n.Limit,o(i)}),e(".btnChangeLayout",i).on("layoutchange",function(e,r){t().view=r,LibraryBrowser.saveViewSetting(a(),r),o(i)}),e(".btnSort",i).on("click",function(){LibraryBrowser.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"}],callback:function(){o(i)},query:n})}),LibraryBrowser.saveQueryValues(a(),n),Dashboard.hideLoadingMsg()})}function i(t){e(".btnNewCollection",t).on("click",function(){require(["collectionEditor"],function(e){var t=ApiClient.serverInfo().Id;(new e).show({items:[],serverId:t})})})}var n={};return pageIdOn("pageinit","boxsetsPage",function(){var e=this,t=e;i(t)}),pageIdOn("pagebeforeshow","boxsetsPage",function(){var e=this,t=e;o(t)}),function(e,t,r){var a=this;a.initTab=function(){i(r)},a.renderTab=function(){o(r)}}});