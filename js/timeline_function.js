var timelineMainFunction = function() {	
	var url = "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=timelineContent";
	timelineContentFunction(url);
}

var timelineSearchFunction = function() {	
	var loginid = localStorage.getItem('id');
	alert(loginid);
	// var url = "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=timelineContent";
	// timelineContentFunction(url);
}


var timelineContentFunction = function(url) {	
	var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: url,
        data: "timelineContent",
        dataType:"json",
        success: function(response) 
        {	            	
			//var count = Object.keys(response).length
			//	console.log(response);
        	var total = response.total['id'];
    
			var userdata = "";
			for(var i=total; i>375; i--) {
				//console.log(i +") type=" + response[i].type +"\naction=" + response[i].action);
				if (response[i]) 
				{
					var type = response[i].type; 
					var action = response[i].action;
					var id = response[i].id;
					var userid = response[i].userid;
					var cid = response[i].cid;
					var fullname = response[i].fullname;
					var iname = response[i].iname;
					var text = response[i].text; 
					var vtype = response[i].vtype;
					var title = response[i].title;
					var description = response[i].description; 
					var image = response[i].image;
					var mp4 = response[i].mp4;
					var photo = response[i].photo;
					var thumb = response[i].thumb;
					var link = response[i].link;
					var cover = response[i].cover;
					

					if(response[i].header == "" || response[i].header == null ){
						var header = "default-header.jpg";
					}
					else {
						var header = userid + "/" + response[i].header;
					}

					if(response[i].avatarm == "" || response[i].avatarm == null ){
						var avatarm = "../default-avatar.gif";
					}
					else {
						var avatarm = response[i].avatarm;
					}

					if(response[i].avatar == "" || response[i].avatar == null ){
						var avatar = "../default-avatar.gif";
					}
					else {
					var avatar = response[i].avatar;
					}

            		// alert("type=" + type +"\naction=" + action);
            		if(type == "profile" && action == "newavatar")
            		{
       		            userdata += "<div data-cid='" + cid + "' class='profile  isno visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>"  +fullname  + " </a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-desc'>uploaded " + type + " " + action + " </div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + cid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + cid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + cid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + cid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='" + type + "' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='" + type + "' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            		}
            		else if(type == "profile" && action == "newcover")
            		{
						userdata += "<div data-cid='" + cid + "' class='media-box profile  isowner search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-desc'>uploaded new profile cover</div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + cid + "' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + cid + "' data-cidtype='profiles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + cid + "' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + cid + "' data-cidtype='profiles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>7</span><a href='#' data-hint='Options' class='action-opts ic-btn ic-btn-default iconn-col-xs-2 hint--left'><i class='icicon-cog'></i></a></div></div><div style='display:none;' class='action-xtd'><div class='opthdr'>Change the post or delete this activity.</div><a data-hint='Your post will not be deleted' data-creatorid='" + cid + "' data-cid='" + id + "' href='#' class='xtd-delact ic-btn ic-btn-red hint--top'><i class='icicon-trash'></i>DELETE ACTIVITY</a><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;layout=edit' target='_top' class='xtd-editlink ic-btn ic-btn-blue'><i class='icicon-pencil'></i>EDIT POST</a></div></div></div>";	
            		}
            		else if(type == "profile" && action == "newprofile")
            		{
						userdata += "<div data-cid='" + cid + "' class='profile  isowner visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'>New member just joined our social network. Welcome <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + cid + "' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + cid + "' data-cidtype='profiles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + cid + "' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + cid + "' data-cidtype='profiles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='#' data-hint='Options' class='action-opts ic-btn ic-btn-default iconn-col-xs-2 hint--left'><i class='icicon-cog'></i></a></div></div><div style='display:none;' class='action-xtd'><div class='opthdr'>Change the post or delete this activity.</div><a data-hint='Your post will not be deleted' data-creatorid='" + cid + "' data-cid='" + id + "' href='#' class='xtd-delact ic-btn ic-btn-red hint--top'><i class='icicon-trash'></i>DELETE ACTIVITY</a><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;layout=edit' target='_top' class='xtd-editlink ic-btn ic-btn-blue'><i class='icicon-pencil'></i>EDIT POST</a></div></div></div>";	
            		}
            		else if((type == "localvideo" || type == "video" )&& action == "posted")
            		{
            			if(type == "localvideo") {
            				var link = "own video <a href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "' target='_top' class='ifulllink'>Using Matchups</a>";
            			}
            			if(type == "video") {
            				var link = "a video";
            			}

            			userdata += "<div data-cid='" + cid + "' class='media-box video  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;''><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 138px;'><div data-thumbnail='http://qeneqt.us/images/icvideos/" + userid + "/" + image + "' style='' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icvideos/" + userid + "/" + image + "' title='http://qeneqt.us/images/icvideos/" + userid + "/" + image + "'></div><div data-popup='http://qeneqt.us/images/icvideos/" + userid + "/" + mp4 + "' data-type='iframe'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><i class='icicon-film mb-open-popup mfp-iframe' data-mfp-src='http://qeneqt.us/images/icvideos/" + userid + "/" + mp4 + "'></i><a target='_top' href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted " + link + "</div><div class='media-box-desc'></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='video' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='videos' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='localvideo' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='videos' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='" + userid + "' data-cidtype='video' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";	
            		}
            		else if(type == "photos" && action == "posted")
            		{
						userdata += "<div data-cid='" + cid + "' class='media-box photo  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='; height: 183px;'><div data-thumbnail='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' title='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' data-dont-wait-for-me='yes' style=''></div><div data-popup='http://qeneqt.us/images/icphotos/" + userid + "/" + photo + "'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><i class='icicon-arrows-alt mb-open-popup mfp-image' data-mfp-src='http://qeneqt.us/images/icphotos/" + userid + "/" + photo + "'></i><a target='_top' href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname +"</span></a> posted <a href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "' target='_top' class='ifulllink'>a photo</a></div><div class='media-sharebox-intro'>" + text + " </div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname +"' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname +"' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='photo' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='photos' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>1</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='photos' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='photos' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='" + userid + "' data-cidtype='photo' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            		}
            		else if(type == "link" && action == "posted")
            		{
						userdata += "<div data-cid='" + cid + "' class='media-box link  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' title='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' data-dont-wait-for-me='yes' style=''></div><div data-popup='" + link + "' data-type='iframe'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><i class='icicon-plus mb-open-popup mfp-iframe' data-mfp-src='" + link + "'></i><a target='_blank' href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a>  posted a link <a href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "' target='_top' class='ifulllink'>Meet the chef who decides what Tom Brady eats&mdash;and what he definitely doesn’t</a></div><div class='media-box-link'>" + link + "</div><div class='media-box-desc'></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='link' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='links' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='link' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='links' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='" + userid + "' data-cidtype='link' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            		}
            		else if(type == "board" && action == "posted")
            		{
						userdata += "<div data-cid='" + cid + "' class='media-box board  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' title='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_blank' href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "'><span class='icicon-map-marker'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted a board <a href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "' target='_top' class='ifulllink'>" + title + "</a></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='board' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='boards' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>3</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='board' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='boards' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Pinned' class='ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            		}
            		else if(type == "circle" && action == "posted")
            		{
						userdata += "<div data-cid='" + cid + "' class='media-box circle  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_blank' href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "'><span class='icicon-users'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' target='_top' class='ifulllink'>" + title + "</a></div><div class='circletype'>Circle is Open!<small>Feel free to join Circle, it is open to all</small><a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' data-hint='GO TO CIRCLE' class='cis1 hint--top hint--success'></a></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='circle' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='circles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='circle' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='circles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Members' class='imembers ic-btn ic-btn-default iconn-col-xs-2 hint--top'>9</span><a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            		}
            		else if(type == "status" && action == "posted")
            		{
            			if(text != "") {
            				userdata += "<div data-cid='" + cid + "' class='media-box status  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px;margin-bottom: 20px;'><div class='media-box-intro'><div class='media-box-status'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted status</div><div class='media-box-subtitle'><div class='media-box-date'>1 week ago</div></div><a href='/index.php?option=com_iconnect&amp;view=status&amp;id=" + cid + "' target='_top' class='ifulllink'><i class='icicon-comments'></i></a></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-text'>" + text + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='" + userid + "' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + userid + "' data-element='status' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + userid + "' data-cidtype='status' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + userid + "' data-cidtype='status' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + userid + "' data-cidtype='status' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='" + userid + "' data-cidtype='status' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=status&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
            			}
            		}
            		else
            		{
            			//userdata += "type=" + type +"\naction=" + action;
            		}
            	}
			}
        	jQuery("#grid").html(userdata);
        }
    });
}





function onFail(message) {
    alert('Failed because: ' + message);
}

function capturePhoto() {
	jQuery('.ic-btn.ic-btn-md.ic-btn-round.ic-btn-green.customButtons.getsnapit').css('display', 'none');
    jQuery('.ajax-loader-img.getsnapit').css('display', 'block');
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 100,
        allowEdit: true,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: false
    });
}

function getPhoto(source) {
	jQuery('.ic-btn.ic-btn-md.ic-btn-round.ic-btn-blue.customButtons.getphoto').css('display', 'none');
    jQuery('.ajax-loader-img.getphoto').css('display', 'block');
	//var source = "file:///C:/Users/Soft%20Win/Pictures/tv-smith-icon.png";
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.NATIVE_URI,
        sourceType: source
    });
}

// Called when a photo is successfully retrieved
function onPhotoURISuccess(imageURI) {
	var loginid = localStorage.getItem('id');
	//alert(loginid);
    var imageData = imageURI;
    var photo_ur = imageData;
    var options = new FileUploadOptions();
    var imageURI = photo_ur;
    options.fileKey = "image";
    if (imageURI.substr(imageURI.lastIndexOf('/') + 1).indexOf(".") >= 0) {
        var newfname = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    } else {
        var newfname = jQuery.trim(imageURI.substr(imageURI.lastIndexOf('/') + 1)) + '.jpg';
    }
    options.fileName = newfname;
    //alert(newfname);
    options.mimeType = "image/jpeg";
    var params = new Object();
    params.loginid =loginid;

    options.params = params;
    //options.headers = "Content-Type: multipart/form-data; boundary=38516d25820c4a9aad05f1e42cb442f4";
    options.chunkedMode = true;
    var ft = new FileTransfer();
   // alert(imageURI);
    ft.upload(imageURI, encodeURI("http://qeneqt.us/index2.php?option=com_content&view=appcode&task=imageupload"), win, fail, options);

    function win(r) {
    	//alert("ImageData: " + JSON.stringify(r));
    	// alert("ImageData: " + r.response.);
        // alert("Code = " + r.responseCode.toString());
        // alert("Response = " + r.response.message);
        var resp = JSON.parse(r.response);
        window.location.reload();
        
    }

    function fail(error) {
    	alert("An error has occurred: Code = " + error.code + "upload error source " + error.source + "upload error target " + error.target);
    }
}

function fetchVideo(source, type) {
	var loginid = localStorage.getItem('id');
	var imageURI = jQuery('#target_url_input').val();
	alert("imageURI " + imageURI);
	var task = "fetchvideo";
	var formData = {
        task: task,
        loginid : loginid,
        imageURI: imageURI,
    };
	jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        success: function(response) {
        	// console.log(response);
            alert(response);
            window.location.reload();
            
        }

    });
}

function getVideo(source) {
	navigator.camera.getPicture(onVideoURISuccess, onFail, { 
		quality: 50, 
	    destinationType: destinationType.FILE_URI,
	    sourceType: source,
	    mediaType: 1 
	});
}


function onVideoURISuccess(videoURI) {
	//alert(videoURI);
	var loginid = localStorage.getItem('id');	
    var options = new FileUploadOptions();
    options.fileKey = "document";
   
    var newfname = videoURI.substr(videoURI.lastIndexOf('/') + 1);

    alert(newfname);
 
    options.fileName = newfname;
    var params = new Object();
    params.loginid =loginid;

    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();

    ft.upload(videoURI, encodeURI("http://qeneqt.us/index2.php?option=com_content&view=appcode&task=videoupload"), win, fail, options);

    function win(r) {
    	alert("VideoData: " + JSON.stringify(r));
    	// alert("VideoData: " + r.response.);
        // alert("Code = " + r.responseCode.toString());
        // alert("Response = " + r.response.message);
        var resp = JSON.parse(r.response);
        window.location.reload();
        
    }

    function fail(error) {
    	alert("An error has occurred: Code = " + error.code + "upload error source " + error.source + "upload error target " + error.target);
    }
}
var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    /*pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;*/
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    mediaType = navigator.camera.MediaType;
}