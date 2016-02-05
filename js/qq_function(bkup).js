var indexMainFunction = function() {
    var  localStorageId = localStorage.getItem('id');
    if(localStorageId) {
        window.location.assign("timeline.html");
    }
}
var choosePage = function() {
	var  localStorageId = localStorage.getItem('id');
	if(localStorageId) {
		window.location.assign("timeline.html");
	} else {
		window.location.assign("login.html");
	}
}

var mainlogin = function() {
	window.location.assign("login.html");;
}


var googlelogin = function () {

}

var fblogin = function () {
   facebookConnectPlugin.login(["public_profile"],
        fbLoginSuccess,
        function (error) { alert("qeneqt" + JSON.stringify(error)) }
    );
}

var fbLoginSuccess = function (userData) {
    //alert("userData: " + JSON.stringify(userData));
    var packet = jQuery.parseJSON(JSON.stringify(userData));
	var status = JSON.stringify(packet["status"]);
	localStorage.setItem('status', status);

	facebookConnectPlugin.getAccessToken(function(token) {
		localStorage.setItem('token', token);
		fbData();
    }, 
    function(err) {
        alert("Could not get access token: " + err);
    });
}

var fbData = function () {
	facebookConnectPlugin.api( "me/?fields=id,name,email", ["public_profile"],
        function (response) { 
        	//alert("status: " + localStorage.status + "token: " + localStorage.token);
        	var response = jQuery.parseJSON(JSON.stringify(response));
        	var fbId2 = JSON.stringify(response["id"]);
        	fbId1 = fbId2.replace('"', "");
        	fbId = fbId1.replace('"', "");
        	var fbName2 = JSON.stringify(response["name"]);
        	fbName1 = fbName2.replace('"', "");
        	fbName = fbName1.replace('"', "");
        	var fbEmail2 = JSON.stringify(response["email"]);
        	fbEmail1 = fbEmail2.replace('"', "");
        	fbEmail = fbEmail1.replace('"', "");
        	//alert("fbId:=> " + fbId + " <=:fbName:=> " + fbName + " <=:fbEmail:=> " + fbEmail);

        	var task = "appConnectionFb";
        	var formData = {
	            task: task,
	            userid : fbId,
	            name: fbName,
	            username: fbEmail,
	            password1: "",
	            email1: fbEmail
	        }; 

	        jQuery.ajax({
	            type: "POST",
	            url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
	            data: formData,
	            success: function(response) {
	            	// console.log(response);
                    // alert(response);
                    var strshortened = response.slice(0,13);
                    var strvalue = response.slice(13);
                    if (strshortened == "Registration Success") {
                        jQuery("#system-message-container").html("<h1 class='error'>Registration Success</h1>");
                    }
                    else if (strshortened == "Already Exists") {
                        alert("Already Exists");
                        //jQuery("#system-message-container").html("<h1 class='error'>Already Exists</h1>");
                    }
                    else if (strshortened == "Registration Error") {
                        alert("Registration Error.");
                        //jQuery("#system-message-container").html("<h1 class='error'>Registration Error.</h1>");
                    }
                    else if (strshortened == "Login Success") {
                        localStorage.setItem('id', strvalue);
                        window.location.assign("timeline.html");
                        jQuery("#system-message-container").html("<h1 class='error'>Login Successful.</h1>");
                    }
                    else if (strshortened == "Login Error") {
                        alert("Login Error.");
                        //jQuery("#system-message-container").html("<h1 class='error'>Login Error.</h1>");
                    }
                    else {
                        alert("Response Error.");
                        //jQuery("#system-message-container").html("<h1 class='error'>Response Error.</h1>");
                    }
                }

	        });
	        return false;
    	},
        function (error) { alert("arv" + JSON.stringify(error)) }
    );

	if(localStorage.user_id == userID) {
		alert("localStorage.user_id == userID");
	}
	else {
		alert("localStorage.user_id != userID");
    }
}

var appLogout = function () { 
    var  localStorageId = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=applogout&loginid=" + localStorageId,
        data: "appLogout",
        success: function(response) {
        	
        	localStorage.setItem('id', "");
        	window.location.assign("index.html");
         }

    });
}

var appRegistration = function() {
    var name = jQuery('#jform_name').val();
    var username = jQuery('#jform_username').val();
    var password1 = jQuery('#jform_password1').val();
    var password2 = jQuery('#jform_password2').val();
    var email1 = jQuery('#jform_email1').val();
    var email2 = jQuery('#jform_email2').val();
    var hiddenVal = jQuery('#hiddenValue').val();
    var task = "appRegistration";

    if(password1 != password2) {
        alert("Password Are Not Matched.");
    }
    else if(email1 != email2) {
        alert("Emails Are Not Matched.");
    }
    else {
        var formData = {
            task: task,
            name: name,
            username: username,
            password1: password1,
            email1: email1
        }; 

        jQuery.ajax({
            type: "POST",
            //url: "http://qeneqt.us/appcode/appfunctions.php",
            url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
            data: formData,
            success: function(response) {
                console.log(response);
              //  window.location.assign("login.html");
                if (response == "Registration Success") {
                	localStorage.setItem('id', hiddenVal);
                    window.location.assign("login.html");
                    jQuery("#system-message-container").html("<h1 class='error'>Registration Successfull. Please Login</h1>");
                }
                if (response == "Already Exists") {
                    alert("This Email ID Already Exists");
                    //window.location.assign("login.html");
                    //jQuery("#system-message-container").html("<h1 class='error'>This Email ID Already Exists. Please Login</h1>");
                }
                if (response == "Registration Error") {
                    alert("Registration Unsuccessfull. Please Try Again.");
                    //jQuery("#system-message-container").html("<h1 class='error'>Registration Unsuccessfull. Please Try Again.</h1>");
                }
            }
        });
        return false;
    }
}

var appLogin = function() {
    jQuery('#icModloginbtn').css('display', 'none');
    jQuery('.ajax-loader-img').css('display', 'block');
    var username = jQuery('#jform_username').val();
    var password1 = jQuery('#jform_password1').val();    
    var hiddenVal = jQuery('#hiddenValue').val();
    var task = "appLogin";

    var formData = {
        task: task,
        username: username,
        password1: password1,
    }; 

    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode",
        data: formData,
        success: function(response) {
            // console.log(response);
            // alert(response);
            var strshortened = response.slice(0,13);
            var strvalue = response.slice(13);
            // alert("responce =" + response + "success =" + strshortened + "value = " + strvalue);
            // window.location.assign("login.html");
            if (strshortened == "Login Success") {            	
                localStorage.setItem('id', strvalue);
                window.location.assign("timeline.html");
                jQuery("#system-message-container").html("<h1 class='error'>Login Successful.</h1>");
            }
            else {
                jQuery('#icModloginbtn').css('display', 'block');
                jQuery('.ajax-loader-img').css('display', 'none');
                alert("Incorrect Username & Password");
                //jQuery("#system-message-container").html("<h1 class='error'>Incorrect Username & Password.</h1>");
            }
        }
    });
    return false;
}

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
            //  console.log(response);
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
    navigator.camera.getPicture(onVideoURISuccess, onFail, { quality: 50, 
    destinationType: destinationType.FILE_URI,
    sourceType: source,
    mediaType: 1 });
}

function onVideoURISuccess(videoURI) {
    //alert("video url= " + videoURI);
    var loginid = localStorage.getItem('id');   
    var options = new FileUploadOptions();
    options.fileKey = "video";
    if (videoURI.substr(videoURI.lastIndexOf('/') + 1).indexOf(".") >= 0) {
        var newfname = videoURI.substr(videoURI.lastIndexOf('/') + 1);
    } else {
        var newfname = jQuery.trim(videoURI.substr(videoURI.lastIndexOf('/') + 1)) + '.mp4';
    }
   // alert("new name= " + newfname);
    options.fileName = newfname;
    options.mimeType="video/mp4";
    var params = new Object();
    params.loginid =loginid;

    options.params = params;
    options.chunkedMode = false;
    var ft = new FileTransfer();
    // alert(videoURI);
    ft.upload(videoURI, encodeURI("http://qeneqt.us/index2.php?option=com_content&view=appcode&task=videoupload"), win, fail, options);

    function win(r) {
        //alert("VideoData: " + JSON.stringify(r));
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

document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

var  profileMainFunction = function() {
    var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=profileContent&loginid="+loginid,
        data: "profileContent",
        dataType:"json",
        success: function(response) 
        {             
           var total = response.total['id']
            var userdata = "";
            for(var i=total; i>0; i--) {
                //console.log(i +") type=" + response[i].type +"\naction=" + response[i].action);
                if (response[i]) 
                {
                    var type = response[i].type; 
                    var action = response[i].action;
                    var id = response[i].id;
                    //var userid = response[i].userid;
                    var userid = loginid;
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
                        var header = loginid + "/" + response[i].header;
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
                        userdata += "<div data-cid='" + cid + "' class='profile  isno visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>"  +fullname  + " </a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-desc'>uploaded " + type + " " + action + " </div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + cid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + cid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + cid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + cid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='" + type + "' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='" + type + "' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                    }
                    else if(type == "profile" && action == "newcover")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box profile  isowner search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='media-box-desc'>uploaded new profile cover</div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + cid + "' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + cid + "' data-cidtype='profiles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + cid + "' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + cid + "' data-cidtype='profiles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>7</span><a href='#' data-hint='Options' class='action-opts ic-btn ic-btn-default iconn-col-xs-2 hint--left'><i class='icicon-cog'></i></a></div></div><div style='display:none;' class='action-xtd'><div class='opthdr'>Change the post or delete this activity.</div><a data-hint='Your post will not be deleted' data-creatorid='" + cid + "' data-cid='" + id + "' href='#' class='xtd-delact ic-btn ic-btn-red hint--top'><i class='icicon-trash'></i>DELETE ACTIVITY</a><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;layout=edit' target='_top' class='xtd-editlink ic-btn ic-btn-blue'><i class='icicon-pencil'></i>EDIT POST</a></div></div></div>";    
                    }
                    /*else if(type == "profile" && action == "newprofile")
                    {
                        userdata += "<div data-cid='" + cid + "' class='profile  isowner visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 69px;'><div data-thumbnail='http://qeneqt.us/images/icprofiles/" + header + "' data-height='120' data-width='425' style='height: 69px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icprofiles/" + header + "' title='http://qeneqt.us/images/icprofiles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_top' href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "'><span class='icicon-user'></span></a></div></div></div><div class='profile-avatar'><img class='icStreamAvatar' src='http://qeneqt.us/images/icprofiles/" + cid + "/" + avatar + "'></div></div><div class='media-box-content'><div class='media-box-title'>New member just joined our social network. Welcome <a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + cid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + cid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='" + cid + "' data-element='profile' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='" + cid + "' data-cidtype='profiles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='" + cid + "' data-cidtype='profile' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='" + cid + "' data-cidtype='profiles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Views' class='iviews ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='#' data-hint='Options' class='action-opts ic-btn ic-btn-default iconn-col-xs-2 hint--left'><i class='icicon-cog'></i></a></div></div><div style='display:none;' class='action-xtd'><div class='opthdr'>Change the post or delete this activity.</div><a data-hint='Your post will not be deleted' data-creatorid='" + cid + "' data-cid='" + id + "' href='#' class='xtd-delact ic-btn ic-btn-red hint--top'><i class='icicon-trash'></i>DELETE ACTIVITY</a><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;layout=edit' target='_top' class='xtd-editlink ic-btn ic-btn-blue'><i class='icicon-pencil'></i>EDIT POST</a></div></div></div>";  
                    }*/
                    else if(type == "localvideo" && action == "posted")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box video  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;''><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 138px;'><div data-thumbnail='http://qeneqt.us/images/icvideos/converted/" + userid + "/" + image + "' style='' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icvideos/converted/" + userid + "/" + image + "' title='http://qeneqt.us/images/icvideos/converted/" + userid + "/" + image + "'></div><div data-popup='http://qeneqt.us/images/icvideos/converted/" + userid + "/" + mp4 + "' data-type='iframe'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><i class='icicon-film mb-open-popup mfp-iframe' data-mfp-src='http://qeneqt.us/images/icvideos/converted/" + userid + "/" + mp4 + "'></i><a target='_top' href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted own video <a href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "' target='_top' class='ifulllink'>Using Matchups</a></div><div class='media-box-desc'></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='video' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='videos' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='localvideo' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='videos' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='1004' data-cidtype='video' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=video&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";  
                    }
                    else if(type == "photos" && action == "posted")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box photo  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='; height: 183px;'><div data-thumbnail='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' title='http://qeneqt.us/images/icphotos/" + userid + "/" + thumb + "' data-dont-wait-for-me='yes' style=''></div><div data-popup='http://qeneqt.us/images/icphotos/" + userid + "/" + photo + "'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><i class='icicon-arrows-alt mb-open-popup mfp-image' data-mfp-src='http://qeneqt.us/images/icphotos/" + userid + "/" + photo + "'></i><a target='_top' href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname +"</span></a> posted <a href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "' target='_top' class='ifulllink'>a photo</a></div><div class='media-sharebox-intro'></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname +"' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname +"' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='photo' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='photos' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>1</a><a data-hint='share' data-uid='1004' data-cidtype='photos' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='photos' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='1004' data-cidtype='photo' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=photo&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                    }
                    else if(type == "link" && action == "posted")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box link  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' title='http://qeneqt.us//images/iclinks/" + userid + "/" + image + "' data-dont-wait-for-me='yes' style=''></div><div data-popup='" + link + "' data-type='iframe'></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><i class='icicon-plus mb-open-popup mfp-iframe' data-mfp-src='" + link + "'></i><a target='_blank' href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "'><span class='icicon-link'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a>  posted a link <a href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "' target='_top' class='ifulllink'>Meet the chef who decides what Tom Brady eats&mdash;and what he definitely doesn’t</a></div><div class='media-box-link'>" + link + "</div><div class='media-box-desc'></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='link' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='links' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='link' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='links' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='1004' data-cidtype='link' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=link&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                    }
                    else if(type == "board" && action == "posted")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box board  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' title='http://qeneqt.us/images/icboards/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_blank' href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "'><span class='icicon-map-marker'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted a board <a href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "' target='_top' class='ifulllink'>" + title + "</a></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='board' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='boards' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>3</a><a data-hint='share' data-uid='1004' data-cidtype='board' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='boards' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Pinned' class='ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</span><a href='/index.php?option=com_iconnect&amp;view=board&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                    }
                    /*else if(type == "circle" && action == "posted")
                    {
                        userdata += "<div data-cid='" + cid + "' class='media-box circle  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-bottom: 20px; margin-right: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 183px;'><div data-thumbnail='http://qeneqt.us/images/iccircles/" + header + "' data-height='300' data-width='400' style='height: 183px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/iccircles/" + header + "' title='http://qeneqt.us/images/iccircles/" + header + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px;'><div class='aligment'><div class='aligment'><a target='_blank' href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "'><span class='icicon-users'></span></a></div></div></div></div><div class='media-box-content'><div class='media-box-date'><!-- add time here --></div><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + loginid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + loginid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted a circle <a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' target='_top' class='ifulllink'>" + title + "</a></div><div class='circletype'>Circle is Open!<small>Feel free to join Circle, it is open to all</small><a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' data-hint='GO TO CIRCLE' class='cis1 hint--top hint--success'></a></div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + loginid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + loginid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + loginid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + loginid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-loginid='1004' data-uid='" + loginid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + loginid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='circle' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='circles' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='circle' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='circles' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><span data-hint='total Members' class='imembers ic-btn ic-btn-default iconn-col-xs-2 hint--top'>9</span><a href='/index.php?option=com_iconnect&amp;view=circle&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                    }*/
                    else if(type == "status" && action == "posted")
                    {
                        if(text != "") {
                            userdata += "<div data-cid='" + cid + "' class='media-box status  isno search-match media-box-loaded' data-streamid='" + id + "' id='act" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px;margin-bottom: 20px;'><div class='media-box-intro'><div class='media-box-status'><div class='media-box-title'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' class='ulink' title='" + fullname + "'>" + fullname + "</a><a data-uid='" + userid + "' class='inamelink' href='#'><span class='iname'>@" + iname + "</span></a> posted status</div><div class='media-box-subtitle'><div class='media-box-date'>1 week ago</div></div><a href='/index.php?option=com_iconnect&amp;view=status&amp;id=" + cid + "' target='_top' class='ifulllink'><i class='icicon-comments'></i></a></div></div><div class='media-box-content'><div class='media-box-date'>1 week ago</div><div class='media-box-text'>" + text + "</div><div class='media-box-inner'><div class='media-box-author'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' data-hint='" + iname + "' class='iUserUrl hint--right'><img src='http://qeneqt.us/images/icprofiles/" + userid + "/" + avatarm + "' class='iMiniThumb'></a></div><div class='media-box-iauthor'><a data-hint='Send Private Message' data-thumb='" + avatarm + "' data-iname='@" + iname + "' data-uid='" + userid + "' data-action='sendpm' href='#' class='imessage iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add as friend' data-uid='" + userid + "' data-action='add' class='icfriends icaddfriend iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Add to Circle' data-userid='1004' data-uid='" + userid + "' class='icaddcircle iconn-round-btn gradlite hint--left hint--info'></a><a href='#' data-hint='Follow' data-uid='" + userid + "' data-action='add' class='ifollows icaddfollower iconn-round-btn gradlite hint--left hint--info'></a></div></div><div class='iconn-actions-mini ic-btn-group iconn-row'><a data-hint='be the first to comment' data-uid='1004' data-element='status' data-cid='" + cid + "' data-comtotal='0' href='#' class='icomments ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='like' data-uid='1004' data-cidtype='status' data-cid='" + cid + "' data-action='add' href='#' class='ilikes ic-btn ic-btn-default iconn-col-xs-2 hint--top'>0</a><a data-hint='share' data-uid='1004' data-cidtype='status' data-origid='" + cid + "' data-wallid='0' class='ishares ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a class='isupport ic-btn ic-btn-default iconn-col-xs-2 hint--left' href='#' data-action='add' data-cid='" + cid + "' data-cidtype='" + type + "' data-uid='" + cid + "' data-hint='support'>0</a><a data-hint='add to Favorites' data-uid='1004' data-cidtype='status' data-origid='" + cid + "' data-action='add' class='ifavorites icfavor ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#'>0</a><a data-hint='Pin to Board' data-uid='1004' data-cidtype='status' data-origid='" + cid + "' class='ipins ipinned ic-btn ic-btn-default iconn-col-xs-2 hint--top' href='#' id='pincid" + cid + "'>0</a><a href='/index.php?option=com_iconnect&amp;view=status&amp;id=" + cid + "' target='_top' data-hint='full view' class='action-more ic-btn ic-btn-default iconn-col-xs-2 hint--left'>...</a></div></div></div></div>";
                        }
                    }
                    else
                    {
                        //userdata += "type=" + type +"\naction=" + action;
                    }
                }
            }
            jQuery("#grid").html(userdata);
            profileCover();
        }
    });
}

var profileCover = function () {
    var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=profileCover&loginid="+loginid,
        data: "profileCover",
        dataType:"json",
        success: function(response) 
        {   
            var userprofiledata = "";
            //console.log(response);
            var profileid = response['profile'].id;
            var profileuserid = response['profile'].userid;
            var profileheader = profileuserid + "/" + response['profile'].header;
            localStorage.setItem('profileheader', profileheader);
            var profileavatar = profileuserid + "/" + response['profile'].avatar;
            localStorage.setItem('profileavatar', profileavatar);
            var profilethumb = profileuserid + "/" + response['profile'].thumb;
            var profilefullname = response['profile'].fullname;
            localStorage.setItem('profilefullname', profilefullname);
            var profileiname = response['profile'].iname;
            localStorage.setItem('profileiname', profileiname);
            var profilefriends = response['friends'];
            var profilefollowers = response['followers'];
            var profilelikes = response['likes'];
            var profilecircles = response['circles'];
            var profilefollowing = response['following'];
            
            userprofiledata = "<div style='background-image:url(http://qeneqt.us/images/icprofiles/" + profileheader + ")' class='ishdr lite' id='iProfileCover'><div class='item-ishare' id='ipshare'><ul class='ishare'><li><a data-service='facebook' class='socicon-facebook-6' href='#'></a></li><li><a data-service='twitter' class='socicon-twitter-6' href='#'></a></li><li><a data-service='google-plus' class='socicon-google-plus-6' href='#'></a></li><li><a data-service='linkedin' class='socicon-linkedin-6' href='#'></a></li><li><a data-service='stumbleupon' class='socicon-stumbleupon-6' href='#'></a></li><li><a data-service='reddit' class='socicon-reddit-6' href='#'></a></li><li><a data-service='tumblr' class='socicon-tumblr-6' href='#'></a></li></ul></div><div id='prshare'><a data-ip-modal='#headerModal' class='edit-header'></a></div><div class='iconn-row' id='icProfavatar'><div id='icAvatar'><img alt='" + profileiname + "' src='http://qeneqt.us/images/icprofiles/" + profileavatar + "' id='profileavatar'><div class='ic-overlay-area'><div class='ic-overlay-area-content'><a data-ip-modal='#avatarModal' class='edit-avatar'></a></div></div></div><div class='profileCovLinks'></div><div class='profileCovInfo'><div class='profileInameTag'>" + profilefullname + " <span class='iname'>@" + profileiname + "</span></div><div class='profileImoto'></div></div><div class='profileCovDetails'><div class='iinner'><div class='iPrFriends isinlineblock isw20'><span class='iscount'>" + profilefriends + "</span><span class='issub'>friends</span></div><div class='iPrFollowers isinlineblock isw20'><span class='iscount'>" + profilefollowing + "</span><span class='issub'>followers</span></div><div class='iPrFollowing isinlineblock isw20'><span class='iscount'>" + profilefollowers + "</span><span class='issub'>following</span></div><div class='iPrLikes isinlineblock isw20'><span class='iscount'>" + profilelikes + "</span><span class='issub'>likes</span></div><div class='iPrCircles isinlineblock isw20'><span class='iscount'>" + profilecircles + "</span><span class='issub'>circles</span></div></div></div></div></div>";
            
            jQuery("#iConnectProfile").html(userprofiledata);
          
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
    options.chunkedMode = false;
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

var pictureSource;   // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
//
document.addEventListener("deviceready",onDeviceReady,false);

// device APIs are available
//
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

var  profileEditMainFunction = function() {
    var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=profileeditContent&loginid=" + loginid,
        data: "profileeditContent",
        dataType:"json",
        success: function(response) 
        {
            //console.log(response);
            
            var profilefullname = response.fullname;
            var profileiname = response.iname;
            var profilemotto = response.motto;
            if(response.header == "" || response.header == null ){
                var profileheader = "default-header.jpg";
            }
            else {
                var profileheader = loginid + "/" + response.header;
            }
            
            if(response.avatar == "" || response.avatar == null ){
                var profileavatar = "default-avatar.gif";
            }
            else {
                var profileavatar = loginid + "/" + response.avatar;
            }

            
            var curproavatar = "<img class='iconn-responsive' src='http://qeneqt.us/images/icprofiles/" + profileavatar + "'>";
            var curproheader = "<img class='iconn-responsive' src='http://qeneqt.us/images/icprofiles/" + profileheader + "'>";
            var cupronames = "<div class='iconn-col-sm-6'><label class='ifield prepend-icicon'><input value='" + profilefullname + "' placeholder='Full Community Name' class='gui-input' id='curfullname' name='curfullname'><label class='ifield-icicon' for='curfullname'><i class='icicon-user'></i></label></label></div><div class='iconn-col-sm-6'><label class='ifield prepend-icicon' for='curiname'><input value='" + profileiname + "' placeholder='CHANGE YOUR UNIQUE INAME' class='gui-input' id='curiname' name='curiname'><b class='tooltip tip-left-top'><em>YOUR INAME NEEDS TO BE UNIQUE!  THINK OF SOMETHING ORIGINAL</em></b><label class='ifield-icicon'><i class='icicon-at'></i></label></label></div>";
            var curpromoto = "<div>" + profilemotto +"</div>";

            if(response.motto == "" || response.motto == null ){
                
            }
            else {
                jQuery(".textntags-beautifier").html(curpromoto);
            }
            jQuery("#currentimage").html(curproavatar);
            jQuery("#currentcover").html(curproheader);
            jQuery("#editProfileFields").html(cupronames);

            
        }
    }); 
}

var profileEditsave = function() {
    var loginid = localStorage.getItem('id');
    var curfullname = jQuery('#curfullname').val();
    var curiname = jQuery('#curiname').val();
    var motto = jQuery('#motto').val();
    
    // alert(curfullname);
    // alert(curiname);
    // alert(motto);
    jQuery.ajax({
        type: "POST",
       // url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=profileEditsave&loginid=1500&curfullname=" + curfullname + "&curiname=" + curiname + "&motto=" + motto,
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=profileEditsave&loginid=" + loginid + "&curfullname=" + curfullname + "&curiname=" + curiname + "&motto=" + motto,
        data: "profileEditsave",
        dataType:"json",
        success: function(response) 
        {
                alert(response);
        }
    });

}

function onFail(message) {
    alert('Failed because: ' + message);
}

function captureAvatar() {
    jQuery('.ic-btn.ic-btn-md.ic-btn-round.ic-btn-green.customButtons.snapit').css('display', 'none');
    jQuery('.ajax-loader-img.snapit').css('display', 'block');
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onAvatarURISuccess, onFail, {
        quality: 100,
        allowEdit: true,
        destinationType: destinationType.FILE_URI,
        saveToPhotoAlbum: false
    });
}

function getAvatar(source) {
    jQuery('.ic-btn.ic-btn-md.ic-btn-round.ic-btn-blue.customButtons.browse').css('display', 'none');
    jQuery('.ajax-loader-img.browse').css('display', 'block');
    //var source = "file:///C:/Users/Soft%20Win/Pictures/tv-smith-icon.png";
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onAvatarURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.NATIVE_URI,
        sourceType: source
    });
}


// Called when a photo is successfully retrieved
function onAvatarURISuccess(imageURI) {
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
    options.chunkedMode = false;
    var ft = new FileTransfer();
   // alert(imageURI);
    ft.upload(imageURI, encodeURI("http://qeneqt.us/index2.php?option=com_content&view=appcode&task=avatarupload"), win, fail, options);

    function win(r) {
        alert("ImageData: " + JSON.stringify(r));
        // alert("ImageData: " + r.response.);
        // alert("Code = " + r.responseCode.toString());
        // alert("Response = " + r.response.message);
        var resp = JSON.parse(r.response);
        window.location.assign("edit-profile.html");
        
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code + "upload error source " + error.source + "upload error target " + error.target);
    }
}

function getHeader(source) {
    jQuery('.ic-btn.ic-btn-md.ic-btn-round.ic-btn-blue.customButtons.browsecover').css('display', 'none');
    jQuery('.ajax-loader-img.browsecover').css('display', 'block');
    //var source = "file:///C:/Users/Soft%20Win/Pictures/tv-smith-icon.png";
    // Retrieve image file location from specified source
    navigator.camera.getPicture(onHeaderURISuccess, onFail, {
        quality: 50,
        destinationType: destinationType.NATIVE_URI,
        sourceType: source
    });
}


// Called when a photo is successfully retrieved
function onHeaderURISuccess(imageURI) {
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
    options.chunkedMode = false;
    var ft = new FileTransfer();
   // alert(imageURI);
    ft.upload(imageURI, encodeURI("http://qeneqt.us/index2.php?option=com_content&view=appcode&task=headerupload"), win, fail, options);

    function win(r) {
        //alert("ImageData: " + JSON.stringify(r));
        // alert("ImageData: " + r.response.);
        // alert("Code = " + r.responseCode.toString());
        // alert("Response = " + r.response.message);
        var resp = JSON.parse(r.response);
        window.location.assign("edit-profile.html");
        
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
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}

var matchupsMainFunction = function() {
    var loginid = localStorage.getItem('id');
    jQuery.ajax({
        type: "POST",
        url: "http://qeneqt.us/index2.php?option=com_content&view=appcode&task=matchupsContent&loginid="+loginid,
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
                    var acl = response[i].acl;
                    var catids = response[i].catids;
                    var cover = response[i].cover;
                    var date = response[i].date;
                    var description = response[i].description;
                    var featured = response[i].featured;
                    var id = response[i].id;
                    var iname = response[i].iname;
                    var fullname = response[i].fullname;
                    var qlist = response[i].qlist;
                    var thumb = response[i].thumb;
                    var title = response[i].title;
                    var userid = response[i].userid;
                    var userthumb = response[i].userthumb;

                    if(response[i].userthumb == "" || response[i].userthumb == null ){
                        var userthumb = "default-avatar.png";
                    }
                    else {
                        var userthumb = userid + "/" + response[i].userthumb;
                    }

                    userdata += "<div data-cid='" + id + "' data-featured='0' data-answered='' class='matchup user-" + userid + "  ftd0 visible-media-boxes-by-filter media-box media-box-loaded' data-streamid='" + id + "' id='matchup" + id + "' style='margin: 0px;' data-wrapper-added='yes' data-set-overlay-for-hover-effect='yes'><div class='media-box-container' style='margin-left: 20px; margin-right: 20px; margin-bottom: 20px;'><div class='media-box-image' data-popuptrigger='yes' data-imageconverted='yes' style='height: 232px;'><div data-thumbnail='http://qeneqt.us/images/icmatchups/" + userid + "/" + cover + "' data-height='150' data-width='200' style='height: 232px;' class='media-box-thumbnail-container'><img src='http://qeneqt.us/images/icmatchups/" + userid + "/" + cover + "' title='http://qeneqt.us/images/icmatchups/" + userid + "/" + cover + "' data-dont-wait-for-me='yes' style=''></div><div class='thumbnail-overlay' style='display: none; height: 100%; top: 0px; left: 0px; opacity: 1;'><div class='aligment'><div class='aligment'><a target='_top' href='/index.php?option=com_iconnect&amp;view=matchup&amp;id=" + id + "&amp;Itemid=1021'><span class='icicon-question'></span></a></div></div></div><div class='trackinfo'><div class='mtitle'>a matchu-up by  @" + iname + "</div><div class='mauthor'><a href='http://qeneqt.us/index.php?option=com_iconnect&amp;view=profile&amp;id=" + userid + "' title='" + fullname + "' class='iuthumburl'><img src='http://qeneqt.us/images/icprofiles/" + userthumb + "' class='iMiniThumb'></a></div></div></div><div class='media-box-content'><div class='media-box-title'><a href='/index.php?option=com_iconnect&amp;view=matchup&amp;id=" + id + "&amp;Itemid=1021' class='ilink'>Fashion</a></div><div class='media-box-text'>I'm into fashion.</div><div class='media-box-answer'><a class='ic-btn isfull ic-btn-blue' href='/index.php?option=com_iconnect&amp;view=matchup&amp;id=" + id + "&amp;Itemid=1021'>Match this Up</a></div></div></div></div>";                   
                }
            }
            jQuery("#grid").html(userdata);
        }
    });
}

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
            //  if(response.circle) {
            //      var circleId = response.circle[i];
            //  }
            //  if(response[i]) 
            //  {
            //      var acl = response[i].acl;
            //      var circlelist = response[i].circlelist;
            //      var cover = response[i].cover;
            //      var date = response[i].date;
            //      var description = response[i].description;
            //      var featured = response[i].featured;
            //      var fullname = response[i].fullname;
            //      var hashtags = response[i].hashtags;
            //      var id = response[i].id;
            //      var iname = response[i].iname;
            //      var thumb = response[i].thumb;
            //      var title = response[i].title;
            //      var type = response[i].type;
            //      var userid = response[i].userid;
                    
            //      if(response[i].userthumb == "" || response[i].userthumb == null ){
            //          var userthumb = "default-avatar.png";
            //      }
            //      else {
            //          var userthumb = userid + "/" + response[i].userthumb;
            //      }

   //           }
            // }
            jQuery("#grid").html(userdata);
        }
    });

}