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