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
                        jQuery("#system-message-container").html("<h1 class='error'>Already Exists</h1>");
                    }
                    else if (strshortened == "Registration Error") {
                        jQuery("#system-message-container").html("<h1 class='error'>Registration Error.</h1>");
                    }
                    else if (strshortened == "Login Success") {
                        localStorage.setItem('id', strvalue);
                        window.location.assign("timeline.html");
                        jQuery("#system-message-container").html("<h1 class='error'>Login Success.</h1>");
                    }
                    else if (strshortened == "Login Error") {
                        jQuery("#system-message-container").html("<h1 class='error'>Login Error.</h1>");
                    }
                    else {
                        jQuery("#system-message-container").html("<h1 class='error'>Response Error.</h1>");
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
                    //window.location.assign("login.html");
                    jQuery("#system-message-container").html("<h1 class='error'>This Email ID Already Exists. Please Login</h1>");
                }
                if (response == "Registration Error") {
                    jQuery("#system-message-container").html("<h1 class='error'>Registration Unsuccessfull. Please Try Again.</h1>");
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
                jQuery("#system-message-container").html("<h1 class='error'>Incorrect Username & Password.</h1>");
            }
        }
    });
    return false;
}