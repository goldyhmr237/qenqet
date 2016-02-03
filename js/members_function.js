var membersMainFunction = function() {
	var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=membersContent&loginid="+loginid,
        data: "profileContent",
        dataType:"json",
        success: function(response) 
        {	          
            var total = response.total['id'];
            var userdata = "";
			console.log(response);
			for(var i=total; i>0; i--) {
				if (response[i]) 
				{
					var type = response[i].type; 
					var featured = response[i].featured;
					var fullname = response[i].fullname;
					var id = response[i].id;
					var iname = response[i].iname;
					var logindate = response[i].logindate;
					var motto = response[i].motto;
					var online = response[i].online;
					var profiletype = response[i].profiletype;
					var userid = response[i].userid;
					var wallacl = response[i].wallacl;

					if(response[i].header == "" || response[i].header == null ){
						var header = "default-header.jpg";
					}
					else {
						var header = userid + "/" + response[i].header;
					}

					if(response[i].thumb == "" || response[i].thumb == null ){
						var thumb = "default-avatar.png";
					}
					else {
						var thumb = userid + "/" + response[i].thumb;
					}

					if(response[i].avatar == "" || response[i].avatar == null ){
						var avatar = "default-avatar.png";
					}
					else {
						var avatar = userid + "/" + response[i].avatar;
					}

					if(response[i].status == 1) {
						var status = "Member is Online";

						userdata += "<div data-profileid='" + userid + "' data-profiletype='" + profiletype + "' class='profile isftd0 visible-media-boxes-by-filter media-box-loaded media-box' data-streamid='" + id + "' id='profile" + userid + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 92px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='width: 328px; height: 92px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='height: 100%; top: 0px; left: 0px; display: none;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-inner'><div class='media-box-prauthor onprofile isblock'><a data-hint='Send Private Message' data-uid='" + userid + "' data-action='sendpm' href='#' data-thumb='" + thumb + "' data-iname='@" + iname + "' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div data-hint='" + status + "' class='onstat hint--top hint--success'><i class='icicon-circle iconn-ianimated infinite flash isgreen'></i></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='profile' data-cid='" + userid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='profiles' data-cid='" + userid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='profile' data-origid='" + userid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + userid + "' data-cidtype='profiles' data-uid='" + userid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='profiles' data-origid='" + userid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
					}
					else {
						var status = "Member is Offline";

						userdata += "<div data-profileid='" + userid + "' data-profiletype='" + profiletype + "' class='profile isftd0 visible-media-boxes-by-filter media-box-loaded media-box' data-streamid='" + id + "' id='profile" + userid + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 92px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='width: 328px; height: 92px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='height: 100%; top: 0px; left: 0px; display: none;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-inner'><div class='media-box-prauthor onprofile isblock'><a data-hint='Send Private Message' data-uid='" + userid + "' data-action='sendpm' href='#' data-thumb='" + thumb + "' data-iname='@" + iname + "' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div data-hint='" + status + "' class='onstat hint--top hint--success'><i class='icicon-circle isgrey'></i></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='profile' data-cid='" + userid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='profiles' data-cid='" + userid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='profile' data-origid='" + userid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + userid + "' data-cidtype='profiles' data-uid='" + userid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='profiles' data-origid='" + userid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";;
					}
					
            	}
			}
        	jQuery("#grid").html(userdata);
        }
    });
}