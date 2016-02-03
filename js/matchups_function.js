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