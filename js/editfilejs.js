function showMthlabel(mth){
if(mth == 11) {month = 'Dec';} else
if(mth == 10) {month = 'Nov';} else
if(mth == 9) {month = 'Oct';} else
if(mth == 8) {month = 'Sep';} else
if(mth == 7) {month = 'Aug';} else
if(mth == 6) {month = 'Jul';} else
if(mth == 5) {month = 'Jun';} else
if(mth == 4) {month = 'May';} else
if(mth == 3) {month = 'Apr';} else
if(mth == 2) {month = 'Mar';} else
if(mth == 1) {month = 'Feb';} else
if(mth == 0) {month = 'Jan';}

return month;
}

var StatsDonut = function(){

var colv="#3c8dbc";var coll="#3cbc81";var colf="#8989ba";var cols="#c26790";
new Morris.Donut({
element:"visitors-users-chart",
data:[{label:"Visits",value:42},{label:"Likes",value:1},{label:"Favorites",value:0},{label:"Shares",value:0}],
colors:[colv,coll,colf,cols],labelFamily:"Open Sans",labelColor:"#999",labelTextSize:"12px",backgroundColor:"#fff"});
}



var StatsByMonth = function(){

new Morris.Line({
    element: 'visitors-chart',
data: [{"day":"Dec 29","hits":"3","likes":"0","comments":"0","shares":"0"},{"day":"Dec 31","hits":"2","likes":"0","comments":"0","shares":"0"},{"day":"Jan 12","hits":"2","likes":"0","comments":"0","shares":"0"},{"day":"Jan 15","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 18","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 19","hits":"21","likes":"1","comments":"0","shares":"0"}],
		gridEnabled: true,
		gridLineColor: 'rgba(0,0,0,0.3)',
		xkey: 'day',
		ykeys: ['hits','likes','comments','shares'],

		labels: ['Visits', 'Likes', 'Comments', 'Shares'],
		lineColors: ['#3c8dbc','#3cbc81','#eb774a','#c26790'],
		pointSize: 3,
		pointStrokeColors : ['#fff','#fff','#fff','#fff'],
		lineWidth: '2px',
		resize:true,
		hideHover: 'auto',
		fillOpacity: 0.7,
		parseTime:false
});

}




var StatsByWeek = function(){

new Morris.Line({
    element: 'visitors-chart',
data: [{"day":"Jan 15","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 18","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 19","hits":"21","likes":"1","comments":"0","shares":"0"}],			
		gridEnabled: true,
		gridLineColor: 'rgba(0,0,0,0.3)',
		xkey: 'day',
		ykeys: ['hits','likes','comments','shares'],

		labels: ['Visits', 'Likes', 'Comments', 'Shares'],
		lineColors: ['#3c8dbc','#3cbc81','#eb774a','#c26790'],
		pointSize: 3,
		pointStrokeColors : ['#fff','#fff','#fff','#fff'],
		lineWidth: '2px',
		resize:true,
		hideHover: 'auto',
		fillOpacity: 0.7,
		parseTime:false
});

}



var StatsByQt = function(){

new Morris.Line({
    element: 'visitors-chart',
data: [{"day":"Dec 29","hits":"3","likes":"0","comments":"0","shares":"0"},{"day":"Dec 31","hits":"2","likes":"0","comments":"0","shares":"0"},{"day":"Jan 12","hits":"2","likes":"0","comments":"0","shares":"0"},{"day":"Jan 15","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 18","hits":"7","likes":"0","comments":"0","shares":"0"},{"day":"Jan 19","hits":"21","likes":"1","comments":"0","shares":"0"}],
			
		gridEnabled: true,
		gridLineColor: 'rgba(0,0,0,0.3)',
		xkey: 'day',
		ykeys: ['hits','likes','comments','shares'],

		labels: ['Visits', 'Likes', 'Comments', 'Shares'],
		lineColors: ['#3c8dbc','#3cbc81','#eb774a','#c26790'],
		pointSize: 3,
		pointStrokeColors : ['#fff','#fff','#fff','#fff'],
		lineWidth: '2px',
		resize:true,
		hideHover: 'auto',
		fillOpacity: 0.7,
		parseTime:false
});

}

var icBaseurl;
//Dropzone.autoDiscover = false;
tQuery(function(){

icBaseurl = 'http://qeneqt.us/';


tQuery("#showQ").click(function(){
tQuery("#visitors-chart").html('');
StatsByQt();
tQuery(".chartperiods a").removeClass('ic-btn-blue').addClass('ic-btn-default');
tQuery(this).toggleClass('ic-btn-default ic-btn-blue');
return false;
});
tQuery("#showM").click(function(){
tQuery("#visitors-chart").html('');
StatsByMonth();
tQuery(".chartperiods a").removeClass('ic-btn-blue').addClass('ic-btn-default');
tQuery(this).toggleClass('ic-btn-default ic-btn-blue');
return false;
});
tQuery("#showW").click(function(){
tQuery("#visitors-chart").html('');
StatsByWeek();
tQuery(".chartperiods a").removeClass('ic-btn-blue').addClass('ic-btn-default');
tQuery(this).toggleClass('ic-btn-default ic-btn-blue');
return false;
});


tQuery("#icOpenStats").click(function(){
tQuery("#itemStatsBox").slideToggle();
tQuery(".statsoff").slideToggle();
tQuery("#visitors-chart").html('');
tQuery("#visitors-users-chart").html('');
StatsByMonth();
StatsDonut();
tQuery("#showM").toggleClass('ic-btn-default ic-btn-blue');
tQuery("#icDetailsPanel").toggleClass('disabled');
return false;
});


tQuery("#icDetailsPanel").click(function() {
tQuery(this).parent().parent().toggleClass('iconn-col-md-8 iconn-col-md-pull-4 fixupmargin');

tQuery("#icOpenStats").toggleClass('disabled');
tQuery('#icProfileDetails').slideToggle();
tQuery(".statsoff").slideToggle();

        return false;

});



var tabcont = function() {

tQuery('.ct').codetabs('next');


tQuery(".prsecnext").off('click',tabcont);
tQuery(".prsecnext").on('click',tabcont);

        return false;

}

tQuery(".prsecnext").click(tabcont);


	tQuery(".iconnect-menu").icmenu({
					speed: 500,
					type: "horizontal",
					align: "left",
					indicator: false
				});
				
	

tQuery('.profileshareacl').val('f0');
	
setTimeout(
  function() {
tQuery("#aclf").fadeIn();
  }, 1000);			
	 		



function tagsFetcher(){

tQuery('.profileshareacl').select2("destroy").select2({allowClear: true});




tQuery('.profileshareacl').change(function() {
var ids = tQuery(this).val(); 
tQuery("input#wallacl").val(ids);
});


tQuery('.profileshareacl').on("select2-selecting", function(e) {
var tempacl = tQuery(this).val();
tQuery("input#wallacl").val(tempacl);
}); 

}

function hideLoader(){

if(tQuery('#avloadr').hasClass('hideonload')){

tQuery('#avloadr').slideToggle().toggleClass('hideonload loadhidden');
} 

}
function avatarFetcher(){


			tQuery('#avatarModal .ip-webcam').click(function(){hideLoader();return false;});

tQuery('#avatarModal .ip-actions .ic-btn').click(function(){return false;});


tQuery('#avatarModal .ip-cancel').click(function(){tQuery('#avloadr').addClass('hideonload').fadeIn();
return false;});


tQuery('#avatarModal').imgPicker({
				url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=upload_avatar&tmpl=tigraajax',
				aspectRatio: 1,
				deleteComplete: function() {
					tQuery('#currentimage').html('<img src="http://qeneqt.us/components/com_iconnect/assets/img/default-avatar.png"></img>');
					this.modal('hide');
				},
				uploadSuccess: function(image) { hideLoader();
					// Calculate the default selection for the cropper
					var select = (image.width > image.height) ? 
							[(image.width-image.height)/2, 0, image.height, image.height] : 
							[0, (image.height-image.width)/2, image.width, image.width];

					this.options.setSelect = select;
				},
				cropSuccess: function(image) {
					tQuery('#currentimage').html('<img src="'+image.versions.avatar.url+'"></img>');


					this.modal('hide');tQuery('#avloadr').addClass('hideonload').show();tQuery('#avatarModal .ip-edit,#avatarModal .ip-delete').hide();
				}
			});


}
avatarFetcher();


function headerFetcher(){

tQuery('#headerModal .ip-actions .ic-btn').click(function(){return false;});


tQuery('#headerModal .ip-cancel').click(function(){tQuery('#cloadr').slideToggle();
return false;});



			tQuery('#headerModal').imgPicker({
				url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=upload_header&tmpl=tigraajax',
				aspectRatio: 32/9,
				deleteComplete: function() {
					tQuery('#currentcover').html('<img src="http://qeneqt.us/components/com_iconnect/assets/img/default-header.jpg"></img>');
					this.modal('hide');
				},
				uploadSuccess: function(image) {tQuery('#cloadr').slideToggle();
				},
				cropSuccess: function(image) {
tQuery('#currentcover').html('<img src="'+image.versions.header.url+'"></img>');

				this.modal('hide');tQuery('#cloadr').show();
				}
			});


}

headerFetcher();



var ajax_request = false;


tQuery('textarea.taggable').textntags({

triggers: {
'@': { 
minChars: 1, 
uniqueTags: false, 
showImageOrIcon: true,
keys_map:{
	id: 'id',
	name: 'name',
	description: 'fullname',
	img: 'img',
	type: 'type'
},
syntax       : _.template('@[<%= type %>:<%= id %>:<%= title %>]'),
    parser       : /(@)\[([\w\s\.\-]+):(\d+):([\w\s@\.,-\/#!$%\^&\*;:{}=\-_`~()]+)\]/gi,
    parserGroups : {type: 2, id: 3, title: 4},
classes: {
			tagsDropDown: 'ismentiondd',
			tagActiveDropDown: 'active',
			tagHighlight: 'ismention'
		}
	
},
'#': { minChars: 1, uniqueTags: false, showImageOrIcon: false,keys_map:{
	id: 'id',
	name: 'name',
	type: 'type'
},
syntax       : _.template('#[<%= type %>:<%= id %>:<%= title %>]'),
    parser       : /(#)\[([\w\s\.\-]+):(\d+):([\w\s@\.,-\/#!$%\^&\*;:{}=\-_`~()]+)\]/gi,
    parserGroups : {type: 2, id: 3, title: 4},
classes: {
			tagsDropDown: 'ishashtagdd',
			tagActiveDropDown: 'active',
			tagHighlight: 'ishashtag'
		}
}
},
    onDataRequest:function (mode, query, triggerChar, callback) {
switch (triggerChar) {
case '@':
var surl = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=usearch&tmpl=tigraajax';
break;
case '#':
var surl = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=tagsearch&tmpl=tigraajax';
break;
}
 if(ajax_request) ajax_request.abort();

            ajax_request = tQuery.getJSON(surl, {search: query}, function(responseData) {
                query = query.toLowerCase();
             responseData = _.filter(responseData, function(item) { return item.name.toLowerCase().indexOf(query) > -1; });
                callback.call(this, responseData);
                ajax_request = false;
            });
}
});




tagsFetcher();



tQuery("#icDelme").click(function() {
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=delreq&tmpl=tigraajax';
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {profileid:1004},
        dataType: "json",
            cache: false,   
            error: function(){console.log(data);},
            success: function(data){console.log(data);
var status = parseInt(data.status);
console.log(status);

if(status === 1){

swal({
  title: "Success",
  text: "Request Sent. Your profile will be deleted asap.",
  type: "success",
  timer: 2500,
  showConfirmButton: false
});
}
if(status === 2){
swal({
  title: "FYI",
  text: "Request Already Sent and cued for deletion.",
  type: "info",
  timer: 2500,
  showConfirmButton: false
});
}
if(status === 3){

swal({
  title: "Error occurred",
  text: "Something went wrong and your Request is not sent. Please try again later.",
  type: "error",
  timer: 2500,
  showConfirmButton: false
});

}




          }
      });
return false;
  });





tQuery("#icUnpublishMe").click(function() {
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=itemunpublish&tmpl=tigraajax';
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {cid:1004,creatorid:1004,cidtype:'profile',pub:'0'},
        dataType: "json",
            cache: false,   
            error: function(data){console.log(data);},
            success: function(data){console.log(data);
var title = data.title;
var msg = data.msg;

swal({
  title: title,
  text: msg,
  type: "success",
  timer: 1500,
  showConfirmButton: false
});

setTimeout(
  function() {
document.location.reload(true);
  }, 1500);

          }
      });
return false;
  });

tQuery("#icPublishMe").click(function() {


var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=itemunpublish&tmpl=tigraajax';

  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {cid:1004,creatorid:1004,cidtype:'profile',pub:'1'},
        dataType: "json",
            cache: false,   
            success: function(data){
var title = data.title;
var msg = data.msg;

swal({
  title: title,
  text: msg,
  type: "success",
  timer: 1500,
  showConfirmButton: false
});

setTimeout(
  function() {
document.location.reload(true);
  }, 1500);

          }
      });
return false;
  });





tQuery('input#curfullname').keyup(function() {
var newfname = tQuery(this).val();
if((newfname).length > 2){
tQuery("input#fullname").val(newfname);
tQuery("#editbtn").removeClass('disabled');
}
if((newfname).length === 0){
tQuery("input#fullname").val('');
tQuery("#editbtn").addClass('disabled');
}
});


tQuery('input#curiname').bind('input', function() {
  var c = this.selectionStart,
      r = /[^a-z0-9]/gi,
      v = tQuery(this).val();
  if(r.test(v)) {
    tQuery(this).val(v.replace(r, ''));
    c--;

var msg = 'Your Unique iName should not have any spaces, or special characters!';
showErrorMsg(msg);
tQuery("input#curiname").addClass('state-error');
tQuery("input#iname").val('');
  }
  this.setSelectionRange(c, c);
});


tQuery('input#curiname').keyup(function() {
tQuery(this).parent().removeClass('state-error');
tQuery(this).parent().removeClass('state-success');
var newiname = tQuery(this).val();

if((newiname).length === 0){
tQuery("input#fullname").val('');
tQuery("#editbtn").addClass('disabled');
}


if((newiname).length > 2){

        tQuery.ajax({ 
            type: "GET",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=inamecheck&tmpl=tigraajax',
            data: {uid:'1004',iname:newiname},    
        dataType: "json",
            cache: false,   
            error: function(data){console.log(data);},
            success: function(data){console.log(data);
var status = data.status;
var msg = data.msg;
if(status === '1'){
tQuery("input#curiname").parent().addClass('state-success');
tQuery("input#iname").val(newiname);
} else
if(status === '2'){
tQuery("input#curiname").parent().addClass('state-error');
tQuery("input#iname").val('');
} 

}
});
}
});


tQuery('textarea#motto').keyup(function() {
tQuery('textarea.taggable#motto').textntags('val', function(text) {

tQuery("input#acttagtext").val(text);
});
 });

tQuery('textarea.taggable')
  .bind('tagsAdded.textntags', function (e, addedTagsList) {
 tQuery('textarea.taggable#motto').textntags('val', function(text) {

tQuery("input#acttagtext").val(text);

});
  });

     


    var ivalidate = tQuery("#edit-item-form").validate({

    submitHandler: function() {
       grabPost();
    }
    });


tQuery.validator.addClassRules("required", {
  required: true
});
       


    var iprofvalidate = tQuery("#profileinfo-form").validate({

ignore: "",
    rules: {
        required:"required",

   },
    messages: {
	required: "Please fill out all required fields!",

    },
 errorPlacement: function(error, element) {

var posterror = error.text();
//showErrorMsg(posterror);

tQuery(element).addClass('error');
tQuery(element).closest('label').addClass('state-error');

var sec = tQuery(element).attr('data-sec');
tQuery('.profile-tab-title#tab-'+sec).addClass('error');
var dadtab = tQuery('.profile-tab-title#tab-'+sec);

},

    showErrors: function (errorMap, errorList) {

var erra = "Your submission contains ";
var errb = " error(s). Do fill out all required fields before resubmitting form.";

        var errmsg = erra + this.numberOfInvalids() + errb;



       this.defaultShowErrors(); 


  if (this.numberOfInvalids() > 0) {
setTimeout(
  function() {
            showErrorMsg(errmsg);
  }, 2500);

tQuery('input.error').keyup(function(){

if(tQuery(this).val().length > 0){

var isec = tQuery(this).attr('data-sec');
tQuery(this).removeClass('error');
tQuery(this).closest('label').removeClass('state-error');
tQuery('.profile-tab-title#tab-'+isec).removeClass('error');
}
});
        } 

},

    submitHandler: function() {


       grabDetails();
    }
    });
       







      function grabDetails() {
     


var postData = tQuery("#profileinfo-form").serialize(); 
console.log(postData);

        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=profiledetails&tmpl=tigraajax',
            data: postData,    
        dataType: "json",
            cache: false,   

            success: function(data){
var title = data.title;
var msg = data.msg;

swal({
  title: title,
  text: msg,
  type: "success",
  timer: 1500,
  showConfirmButton: false
});

setTimeout(
  function() {
document.location.reload(true);
  }, 1500);

          }
      });
      
  }




      function grabPost() {
     

var postData = tQuery("#edit-item-form").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, ''); 
console.log(postData);

        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=profileedit&tmpl=tigraajax',
            data: postData,    
        dataType: "json",
            cache: false,   

            error: function(data){console.log(data);},
            success: function(data){console.log(data);
var title = data.title;
var msg = data.msg;
var status = data.status;

if(status == '1'){

swal({
  title: title,
  text: msg,
  type: "success",
  timer: 1500,
  showConfirmButton: false
});

setTimeout(
  function() {
document.location.reload(true);
  }, 1500);

}
if(status == '2'){

showInfoMsg(msg);
setTimeout(
  function() {
document.location.reload(true);
  }, 1000);
}
if(status == '3'){

showErrorMsg(msg);
setTimeout(
  function() {
document.location.reload(true);
  }, 1000);
}

          }
      });
      
  }

 
function showSuccessMsg(msg){
toastr.success(msg);
toastr.options.progressBar = true; 
}
function showErrorMsg(msg){
toastr.error(msg);
toastr.options.progressBar = true; 
}
function showInfoMsg(msg){
toastr.info(msg);
toastr.options.progressBar = true; 
}


tQuery(".itooltipend").click(function() {

 tQuery('.mentioneduser.ic-show').slideUp().removeClass('ic-show').remove();
 tQuery('.ic-overlay').fadeOut().removeClass('ic-show');

tQuery(".inamelink").off('click',userInameTag);
tQuery(".inamelink").on('click',userInameTag);
        return false;

});


var userInameTag = function (){
var uid = tQuery(this).attr('data-uid');

     tQuery.ajax({
            type: "GET",
            url:"http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=inametag&tmpl=tigraajax",
            dataType: "json",
            data: {uid:uid,userid:1004},
            success: function (data) {
                      
var name = data.name;
var iname = data.iname;
var avatar = data.avatar;
var cover = data.cover;
var profiletype = data.profiletype;
var likescount = data.likescount;
var friendcount = data.friendcount;
var followerscount = data.followerscount;
var followingcount = data.followingcount;
var amfriend = data.amfriend;
var amfollower = data.amfollower;
var isfollowing = data.isfollowing;

if(uid === '1004'){

var actionnotes = '<p class="isownprofile">This is your own Profile iTag...</p>';

} else {


if(amfriend === '1') {
var friendnote = '<p class="isfriend"><i class="icicon-users"></i>'+iname+' is your friend.</p>';
} else {
var friendnote = '<p class="isnotfriend"><i class="icicon-users"></i>'+iname+' is not your friend.</p>';
}
if(amfollower === '1') {
var followernote = '<p class="arefollower"><i class="icicon-reply"></i>You are following '+iname+'</p>';
} else {
var followernote = '<p class="arenotfollower"><i class="icicon-reply"></i>You are not following '+iname+'</p>';
}
if(isfollowing === '1') {var followingnote = '<p class="isafollower"><i class="icicon-share"></i>'+iname+' is following you.</p>';} else {var followingnote = '<p class="isnotafollower"><i class="icicon-share"></i>'+iname+'  is not following you.</p>';}

var actionnotes = friendnote+' '+followernote+' '+followingnote;

}

itag =  '<div class="iNameUserTag mentioneduser"><div class="iTagAvatar"><img class="isresponsive" src="'+icBaseurl+'images/icprofiles/' + uid + '/' + avatar + '"></img><div class="iTagName"><a class="iClink" target="_blank" href="'+icBaseurl+'index.php?option=com_iconnect&view=profile&id='+uid+'">'+name+'</a><span class="iname">@'+iname+'</span></div></div><div class="iTagInfo"><div class="iTagLikes isinlineblock isw25"><span class="iscount">'+likescount+'</span><span class="issub">likes</span></div><div class="iTagFriends isinlineblock isw25"><span class="iscount">'+friendcount+'</span><span class="issub">friends</span></div><div class="iTagFollowers isinlineblock isw25"><span class="iscount">'+followerscount+'</span><span class="issub">followers</span></div><div class="iTagFollowing isinlineblock isw25"><span class="iscount">'+followingcount+'</span><span class="issub">following</span></div></div><div class="iTagActions">'+actionnotes+'</div></div>';



tQuery('.ic-overlay').fadeIn().addClass('ic-show');

tQuery(itag).prependTo('.uNameTag').addClass('ic-show').fadeIn().slideDown('slow');
}
});
return false;
}

tQuery('.inamelink').click(userInameTag);


  tQuery('.ic-scrollbar').scrollbar({ignoreMobile:false});



tQuery.mask.definitions['f'] = "[A-Fa-f0-9]"; 	
		  	tQuery(".phonemask").mask('(999) 999-9999', {placeholder:'X'});
		  	tQuery(".zipcodemask").mask('99999', {placeholder:'X'});
		  	tQuery(".usdatemask").mask('99/99/9999', {placeholder:'_'});
		  	tQuery(".eudatemask").mask('99/99/9999', {placeholder:'_'});
			tQuery(".colormask").mask('#ffffff', {placeholder:'_'});
			tQuery(".alphamask").mask('aaaaaa-aaaaaa', {placeholder:'X'});

			


tQuery('.fieldacl').select2("destroy").select2({minimumResultsForSearch: Infinity});



tQuery('.fieldacl').change(function() {
var id = tQuery(this).val(); 
 var icon = ""
        tQuery('.select2-search-choice DIV').filter(function() {
            icon = '<i class="'+id+'"></i>';
            return tQuery(this).text() == id;
        }).prepend(icon);
      
});



tQuery('.fieldacl').on("select2-selecting", function(e) {


var css = e.object.css;
var icon = '<i class="'+css+'"></i>';

var origid = tQuery(e.target).attr('id');
tQuery('#s2id_'+origid+' .select2-choice').html(icon);
      
});

});