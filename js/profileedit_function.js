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
        	var profileavatar = loginid + "/" + response.avatar;
			var profilefullname = response.fullname;
			var profileiname = response.iname;
			var profilemotto = response.motto;
			if(response.header == "" || response.header == null ){
				var profileheader = "default-header.jpg";
			}
			else {
				var profileheader = loginid + "/" + response.header;
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