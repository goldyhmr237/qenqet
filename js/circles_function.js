var circlesMainFunction = function() {
	var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=circlesContent&loginid="+loginid,
        data: "circlesContent",
        dataType:"json",
        success: function(response) 
        {	
            var total = response.total['id'];
            var userdata = "";
			//console.log(response);
			for(var i=total; i>0; i--) {
				if(response.circle) {
					var circleId = response.circle[i];
				}
				if(response[i]) 
				{
					var acl = response[i].acl;
					var circlelist = response[i].circlelist;
					var cover = response[i].cover;
					var date = response[i].date;
					var description = response[i].description;
					var featured = response[i].featured;
					var fullname = response[i].fullname;
					var hashtags = response[i].hashtags;
					var id = response[i].id;
					var iname = response[i].iname;
					var thumb = response[i].thumb;
					var title = response[i].title;
					var type = response[i].type;
					var userid = response[i].userid;
					
					if(response[i].userthumb == "" || response[i].userthumb == null ){
						var userthumb = "default-avatar.png";
					}
					else {
						var userthumb = userid + "/" + response[i].userthumb;
					}

					if(circleId == id ){
						userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iapproved ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-9'>VIEW CIRCLE</a><a onclick='removecircle(" + id + ");' data-uid='1004' data-circleid='6' data-hint='REMOVE ME FROM THIS CIRCLE' class='action-leavecc ic-btn ic-btn-red iconn-col-xs-3 isinlineblock hint--left hint--danger'><i class='icicon-times'></i></a></div></div></div></div>";
					}
					else if (loginid == userid) {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iowner ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='width: 328px; height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='width: 328px; height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>2 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + id + "&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='iconn-actions-circle-mini'><a href='#' data-hint='Open Pending Requests' class='pendingreq ic-btn ic-btn-blue disabled isinlineblock iconn-col-xs-3 hint--right hint--info' data-uid='" + userid + "' data-circleid='" + id + "'><i class='icicon-bell'></i><span>0</span></a><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-6'>VIEW CIRCLE</a><a onclick='viewcirclemembers(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' data-hint='VIEW CIRCLE MEMBERS' class='icopencircle ic-btn ic-btn-green isinlineblock iconn-col-xs-3 hint--left hint--success'><i class='icicon-cogs'></i></a></div></div></div></div>";					
		 			}
		 			else {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle inonmember ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='addcircle(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' class='action-circlejoin ic-btn ic-btn-green isblock iconn-col-xs-12'>Join Circle</a></div></div></div></div>";
		 			}
            	}
			}
        	jQuery("#grid").html(userdata);
        }
    });
}

var removecircle = function(id){
	var loginid = localStorage.getItem('id');
	var formData = {
        task: "removecircle",
        loginid : loginid,
        circleid: id
    }; 
	jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        dataType:"json",
        success: function(response) 
        {	
            var total = response.total['id'];
            var userdata = "";
			// console.log(response);
			for(var i=total; i>0; i--) {
				if(response.circle) {
					var circleId = response.circle[i];
				}
				if(response[i]) 
				{
					var acl = response[i].acl;
					var circlelist = response[i].circlelist;
					var cover = response[i].cover;
					var date = response[i].date;
					var description = response[i].description;
					var featured = response[i].featured;
					var fullname = response[i].fullname;
					var hashtags = response[i].hashtags;
					var id = response[i].id;
					var iname = response[i].iname;
					var thumb = response[i].thumb;
					var title = response[i].title;
					var type = response[i].type;
					var userid = response[i].userid;
					
					if(response[i].userthumb == "" || response[i].userthumb == null ){
						var userthumb = "default-avatar.png";
					}
					else {
						var userthumb = userid + "/" + response[i].userthumb;
					}

					if(circleId == id ){
						userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iapproved ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-9'>VIEW CIRCLE</a><a onclick='removecircle(" + id + ");' data-uid='1004' data-circleid='6' data-hint='REMOVE ME FROM THIS CIRCLE' class='action-leavecc ic-btn ic-btn-red iconn-col-xs-3 isinlineblock hint--left hint--danger'><i class='icicon-times'></i></a></div></div></div></div>";
					}
					else if (loginid == userid) {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iowner ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='width: 328px; height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='width: 328px; height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>2 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + id + "&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='iconn-actions-circle-mini'><a href='#' data-hint='Open Pending Requests' class='pendingreq ic-btn ic-btn-blue disabled isinlineblock iconn-col-xs-3 hint--right hint--info' data-uid='" + userid + "' data-circleid='" + id + "'><i class='icicon-bell'></i><span>0</span></a><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-6'>VIEW CIRCLE</a><a onclick='viewcirclemembers(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' data-hint='VIEW CIRCLE MEMBERS' class='icopencircle ic-btn ic-btn-green isinlineblock iconn-col-xs-3 hint--left hint--success'><i class='icicon-cogs'></i></a></div></div></div></div>";					
		 			}
		 			else {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle inonmember ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='addcircle(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' class='action-circlejoin ic-btn ic-btn-green isblock iconn-col-xs-12'>Join Circle</a></div></div></div></div>";
		 			}
            	}
			}
        	jQuery("#grid").html(userdata);
        }
    });
}

var addcircle = function(id){
	var loginid = localStorage.getItem('id');
	var formData = {
        task: "addcircle",
        loginid : loginid,
        circleid: id
    }; 
	jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        dataType:"json",
        success: function(response) 
        {	
            var total = response.total['id'];
            var userdata = "";
			// console.log(response);
			for(var i=total; i>0; i--) {
				if(response.circle) {
					var circleId = response.circle[i];
				}
				if(response[i]) 
				{
					var acl = response[i].acl;
					var circlelist = response[i].circlelist;
					var cover = response[i].cover;
					var date = response[i].date;
					var description = response[i].description;
					var featured = response[i].featured;
					var fullname = response[i].fullname;
					var hashtags = response[i].hashtags;
					var id = response[i].id;
					var iname = response[i].iname;
					var thumb = response[i].thumb;
					var title = response[i].title;
					var type = response[i].type;
					var userid = response[i].userid;
					
					if(response[i].userthumb == "" || response[i].userthumb == null ){
						var userthumb = "default-avatar.png";
					}
					else {
						var userthumb = userid + "/" + response[i].userthumb;
					}

					if(circleId == id ){
						userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iapproved ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-9'>VIEW CIRCLE</a><a onclick='removecircle(" + id + ");' data-uid='1004' data-circleid='6' data-hint='REMOVE ME FROM THIS CIRCLE' class='action-leavecc ic-btn ic-btn-red iconn-col-xs-3 isinlineblock hint--left hint--danger'><i class='icicon-times'></i></a></div></div></div></div>";
					}
					else if (loginid == userid) {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle iowner ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='width: 328px; height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='width: 328px; height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>2 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + id + "&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='iconn-actions-circle-mini'><a href='#' data-hint='Open Pending Requests' class='pendingreq ic-btn ic-btn-blue disabled isinlineblock iconn-col-xs-3 hint--right hint--info' data-uid='" + userid + "' data-circleid='" + id + "'><i class='icicon-bell'></i><span>0</span></a><a onclick='viewcircle(" + id + ");' class='ic-btn ic-btn-default isinlineblock iconn-col-xs-6'>VIEW CIRCLE</a><a onclick='viewcirclemembers(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' data-hint='VIEW CIRCLE MEMBERS' class='icopencircle ic-btn ic-btn-green isinlineblock iconn-col-xs-3 hint--left hint--success'><i class='icicon-cogs'></i></a></div></div></div></div>";					
		 			}
		 			else {
		 				userdata += "<div data-cid='" + id + "' data-featured='0' class='circle inonmember ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='circle" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 246px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 246px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' title='http://qeneqt.us/images/iccircles/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a style='display: block !important;' target='_top' onclick='viewcircle(" + id + ");'><span class='icicon-users'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>" + title + "</div><div class='mauthor'>" + description + "</div></div></div><div class='media-box-content'><div class='media-box-date'>3 weeks ago</div><div class='media-box-title'>a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=6&amp;Itemid=987' class='ilink'>" + title + "</a> by <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-text'>" + description + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + userthumb + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-circle-mini'><a onclick='addcircle(" + id + ");' data-uid='" + userid + "' data-circleid='" + id + "' class='action-circlejoin ic-btn ic-btn-green isblock iconn-col-xs-12'>Join Circle</a></div></div></div></div>";
		 			}
            	}
			}
        	jQuery("#grid").html(userdata);
        }
    });
}

var viewcirclemembers = function(id) {
	$("#drop-area").addClass("show");
	var loginid = localStorage.getItem('id');
	var formData = {
        task: "viewcirclemembers",
        loginid : loginid,
        circleid: id
    }; 
	jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        dataType:"json",
        success: function(response) 
        {	
            var total = response.total;
            var userdata = "";
			console.log(response);
			for(var i=total; i>0; i--) {
				if(response[i]) 
				{
					var circleid = response[i].circleid;
					var fullname = response[i].fullname;
					var iname = response[i].iname;					
					var userid = response[i].userid;
					
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

		 			userdata += "<div data-incircle='1' data-profileid='" + userid + "' class='isb drop-area__item drop-feedback' onclick='removeCcircle(" + circleid + "," + userid + ");'><div class='dropinner'><img src='http://qeneqt.us/images/icprofiles/" + avatar + "' class='minicircle'></div><div class='dropname'>" + fullname + " (" + iname + ")</div><div class='dropadd' >remove user</div><div class='dummy'></div></div>";
            	}
			}
        	if (total == 0) {
        		userdata += "<div class='nocirclesyet'><p class='isblock iscenter'>You have no one added to this Circle, yet.</p><small class='isblock iscenter'>Why not add some from </small><p class='isblock iscenter'><a class='isinlineblock iscenter ic-btn ic-btn-blue createnew' href='/index.php?option=com_iconnect&amp;view=profiles&amp;Itemid=987'>here</a></p></div>";
        	}
        	jQuery("#dropline").html(userdata);
        }
    });

}

var removeCcircle = function(circleid, userid) {
	var loginid = localStorage.getItem('id');
	var formData = {
        task: "removeCcircle",
        loginid : loginid,
        circleid: circleid,
        userid: userid,
    }; 
	jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        dataType:"json",
        success: function(response) 
        {	
            var total = response.total;
            var userdata = "";
			console.log(response);
			for(var i=total; i>0; i--) {
				if(response[i]) 
				{
					var circleid = response[i].circleid;
					var fullname = response[i].fullname;
					var iname = response[i].iname;					
					var userid = response[i].userid;
					
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

		 			userdata += "<div data-incircle='1' data-profileid='" + userid + "' class='isb drop-area__item drop-feedback' onclick='removeCcircle(" + circleid + "," + userid + ");'><div class='dropinner'><img src='http://qeneqt.us/images/icprofiles/" + avatar + "' class='minicircle'></div><div class='dropname'>" + fullname + " (" + iname + ")</div><div class='dropadd'>remove user</div><div class='dummy'></div></div>";
            	}
			}
        	if (total == 0) {
        		userdata += "<div class='nocirclesyet'><p class='isblock iscenter'>You have no one added to this Circle, yet.</p><small class='isblock iscenter'>Why not add some from </small><p class='isblock iscenter'><a class='isinlineblock iscenter ic-btn ic-btn-blue createnew' href='/index.php?option=com_iconnect&amp;view=profiles&amp;Itemid=987'>here</a></p></div>";
        	}
        	jQuery("#dropline").html(userdata);
        }
    });
}

var closecmpopup = function() {
	$("#drop-area").removeClass("show");
}

var viewcircle = function(circleid) {
	var loginid = localStorage.getItem('id');
	var formData = {
        task: "viewcircle",
        loginid : loginid,
        circleid: circleid,
    };
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        dataType:"json",
        success: function(response) 
        {	
        	var userdata = "";
        	var circletitle = response.circleInfo['title'];
        	var circledescription = response.circleInfo['description'];
        	var circlecover = response.circleInfo['cover'];
        	var circleuavatar = response.circleInfo['avatar'];
        	var circleuiname = response.circleInfo['iname'];
        	var circleufullname = response.circleInfo['fullname'];
        	
        	
			// var total = response.total['id'];
            
			console.log(response);
			// for(var i=total; i>0; i--) {
			// 	if(response.circle) {
			// 		var circleId = response.circle[i];
			// 	}
			// 	if(response[i]) 
			// 	{
			// 		var acl = response[i].acl;
			// 		var circlelist = response[i].circlelist;
			// 		var cover = response[i].cover;
			// 		var date = response[i].date;
			// 		var description = response[i].description;
			// 		var featured = response[i].featured;
			// 		var fullname = response[i].fullname;
			// 		var hashtags = response[i].hashtags;
			// 		var id = response[i].id;
			// 		var iname = response[i].iname;
			// 		var thumb = response[i].thumb;
			// 		var title = response[i].title;
			// 		var type = response[i].type;
			// 		var userid = response[i].userid;
					
			// 		if(response[i].userthumb == "" || response[i].userthumb == null ){
			// 			var userthumb = "default-avatar.png";
			// 		}
			// 		else {
			// 			var userthumb = userid + "/" + response[i].userthumb;
			// 		}

   //          	}
			// }
        	jQuery("#grid").html(userdata);
        }
    });

}