Dropzone.autoDiscover = false;
var icBaseurl;
tQuery(function(){
icBaseurl = "http://qeneqt.us/";
var posts,
$ifr = tQuery('#ifront'),
$icontent = tQuery('#grid'),
$origloc;
var inilimit = tQuery("#grid").attr('data-limit');
var inicols = parseInt(tQuery("#grid").attr('data-inicols'));
var ajaxInProgress = false;
tQuery(".iconnect-menu").icmenu({
					speed: 700,
					type: "horizontal",
					align: "left",
					indicator: false
				});

tQuery("#trending").BreakingNews({
			timer			:5000,
			autoplay		:true,
			effect			:'slide'
				
		});

tQuery('.fixheight .ic-panel').matchHeight();

$icontent.mediaBoxes({
	   // 	filterContainer: false,
	    	search: false,
	//    	searchTarget:".media-box-title,.media-box-text",
	    	sortContainer: '#icsortby',
	        getSortData: {
        idate: '[data-streamid] parseInt',
	  title: '.media-box-title',
	          iviews: '.iviews parseInt',
	          ilikes: '.ilikes parseInt',
	          ishares: '.ishares parseInt',
	          icomments: '.icomments parseInt',
	          ifavorites: '.ifavorites parseInt'
	        }, lazyLoad : false,
	    	boxesToLoadStart: inilimit,
	        thumbnailOverlay: true,
	    	horizontalSpaceBetweenBoxes: 20,
        	verticalSpaceBetweenBoxes: 20,
LoadingWord : 	'Loading...',
loadMoreWord :	'SCROLL DOWN TO LOAD MORE',
noMoreEntriesWord : 'No more entries',
         columnWidth: 'auto',
columns: inicols
	    }); 
   
   

tQuery('#icsearch').select2("val", "");
tQuery('#icsearchtags').select2("val", "");

function displayNoPostMsg(){

var msg = tQuery('<div class="nomoreposts iconn-animated fadeInLeft"><div class="nomorepostsicon"><i class="icicon-info"></i></div><div class="nomorepostsinfo"><span class="isfirst">No more entries</span><span class="issecond">Choose another filter, or reset to all</span><a class="resetLayout ic-btn ic-btn-default">RESET HERE</a></div><div class="trclose"><a class="killme" href="/"><i class="icicon-remove"></i></a></div></div>');

tQuery("#grid").prepend(msg).fadeIn();

tQuery('.killme').click(function(){
tQuery(this).closest('.nomoreposts').addClass('fadeOutUp').remove();
return false;
 }); 
tQuery('.resetLayout').click(function(){
tQuery(this).closest('.nomoreposts').addClass('fadeOutUp').remove();
tQuery("#iloadr").fadeIn();

    setTimeout(function(){
var limit = parseInt(tQuery("#grid").attr('data-limit'));
var limitstart = '0';
tQuery("#grid").attr('data-filter','*');
tQuery("#grid").attr('data-filtertype','*');

iLoadPosts(limit,limitstart,'*','*');
    },300);
return false;
 }); 

}


function checkme() {
if(tQuery("#iloadmoreact").hasClass('iniscroll')){
tQuery("#iloadmoreact").fadeOut();
tQuery("#iloadmoreact").removeClass('iniscroll');

    setTimeout(function(){
 if(ajaxInProgress) return;
iLoadMorePosts();
   },500);

}

}

function loadInfiScroll(){
 if(ajaxInProgress) return;
tQuery("#iloadmoreact.iniscroll").onImpression({
            offset: +100,
            alwayscallback: false,
            callback: checkme
});

}


if(tQuery("#iloadmoreact").is('.readyini')){
    setTimeout(function(){
tQuery("#iloadmoreact").fadeIn().addClass('iniscroll');
loadInfiScroll();
   },2000);
}


tQuery('#iloadmoreact').on('click',function(){

iLoadMorePosts();
return false;
});

	
function iLoadPosts(limit,limitstart,filter,filtertype){
 if(ajaxInProgress) return;
  ajaxInProgress = true;


limit = parseFloat(limit);
limitstart = parseFloat(limitstart);
  tQuery.ajax({
    url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=homestream&tmpl=tigraajax',
    type: 'GET',
    data: {ilimit:limit,ilimitstart:limitstart,ifilter:filter,ifiltertype:filtertype,iview:'frontpage'},
    dataType: "html",
    cache: false,
    error: function() {ajaxInProgress = false;displayNoPostMsg();},
    success: function(content) {
tQuery("#iloadr").fadeOut();
tQuery("#ipostloadr").fadeOut();
var inewitems = tQuery(content);
var itemsloaded = tQuery(content).length;

if(itemsloaded > 0 && itemsloaded !== null) { 

inewitems = tQuery(inewitems).addClass('search-match');

$icontent.isotopeMB( 'insert', tQuery(inewitems).hide(), function(){
                  
var newlimitstart = parseInt(itemsloaded);

tQuery("#iloadmoreact").attr('data-limitstart',newlimitstart);

setTimeout(function(){

tQuery("#iloadmoreact").fadeIn();
tQuery("#iloadmoreact").toggleClass('iniscroll');loadInfiScroll();
 },1500);

resetIbuttons();

 });

} else {
tQuery("#iloadmoreact").removeClass('iniscroll');
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#iloadmoreact").fadeOut();
tQuery("#ipostloadr").fadeOut();
tQuery("#iloadr").fadeOut();
displayNoPostMsg();
}

setTimeout(function(){

 ajaxInProgress = false;
 },1300);
}
 });
setTimeout(function(){
tQuery("#icfilter a").removeClass('disabled');
tQuery("#icfilter a").off('click',stripfilter);
tQuery("#icfilter a").one('click',stripfilter);
 },1500);
tQuery("#ipostloadr").fadeOut();

}



var stripfilter = function(){

 if(ajaxInProgress) return;
tQuery("#icfilter a").off('click');
tQuery("#icfilter a").addClass('disabled');

tQuery('#icsearch').select2("val", "");
tQuery('#icsearchtags').select2("val", "");
tQuery("#iloadmoreact").fadeOut();
var clifilter = tQuery(this).attr('data-filter');
var clifiltertype = tQuery(this).attr('data-filtertype');
var limit = parseInt(tQuery("#grid").attr('data-limit'));
var limitstart = '0';
tQuery("#grid").attr('data-filter',clifilter);
tQuery("#grid").attr('data-filtertype',clifiltertype);
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#grid").find('.media-box,.media-box-hidden,.nomoreposts').fadeOut('fast').remove();
tQuery("#iloadr").fadeIn();
tQuery("#iloadmoreact").removeClass('iniscroll');


iLoadPosts(limit,limitstart,clifilter,clifiltertype);

return false;
}

tQuery("#icfilter a").one('click',stripfilter);


function iLoadMorePosts(){

 if(ajaxInProgress) return;
  ajaxInProgress = true;

tQuery("#ipostloadr").fadeIn();

var limit = parseFloat(tQuery("#grid").attr('data-limit'));
var limitstart = parseFloat(tQuery("#iloadmoreact").attr('data-limitstart'));
var filter = tQuery("#grid").attr('data-filter');
var filtertype = tQuery("#grid").attr('data-filtertype');

  tQuery.ajax({
    url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=homestream&tmpl=tigraajax',
    type: 'GET',
    data: {ilimit:limit,ilimitstart:limitstart,ifilter:filter,ifiltertype:filtertype,iview:'frontpage'},
    dataType: "html",
    cache: false,   
    error: function( data ) {ajaxInProgress = false;},
    success: function( content ) {
tQuery("#ipostloadr").fadeOut();
tQuery("#iloadr").fadeOut();
var linewitems = tQuery(content);
var litemsloaded = tQuery(content).length;

if(litemsloaded > 0 && litemsloaded !== null) { 

linewitems = tQuery(linewitems).addClass('search-match');

$icontent.isotopeMB( 'insert', tQuery(linewitems).hide(), function(){
                  
var newlimitstart = parseFloat(limitstart + litemsloaded);

tQuery("#iloadmoreact").attr('data-limitstart',newlimitstart);

resetIbuttons();
setTimeout(function(){
tQuery("#iloadmoreact").fadeIn();
tQuery("#iloadmoreact").toggleClass('iniscroll');
loadInfiScroll();
 },1500);

 });

} else {
tQuery("#iloadmoreact").removeClass('iniscroll');
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#iloadmoreact").fadeOut();
tQuery("#ipostloadr").fadeOut();
tQuery("#iloadr").fadeOut();
}
setTimeout(function(){

 ajaxInProgress = false;
 },1000);

}
 });
setTimeout(function(){
tQuery("#icfilter a").removeClass('disabled');
tQuery("#icfilter a").off('click',stripfilter);
tQuery("#icfilter a").one('click',stripfilter);
 },1500);
tQuery("#ipostloadr").fadeOut();

}



tQuery('#icsearch').select2("destroy").select2({
placeholder: "Filter by ...",
allowClear: true
});

tQuery('#icsearchtags').select2("destroy").select2({
placeholder: "Filter by Hashtags",
//minimumInputLength: 2,
allowClear: true
});



tQuery("#icsearch").on('select2-clearing', function(event) {

tQuery('#icsearchtags').select2("val", "");
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#grid").attr('data-filter','*');
tQuery("#grid").attr('data-filtertype','*');
tQuery("#grid").find('.media-box,.media-box-hidden,.nomoreposts').fadeOut().remove();
tQuery("#iloadr").fadeIn();
    setTimeout(function(){
var limit = parseInt(tQuery("#grid").attr('data-limit'));
tQuery("#iloadmoreact").removeClass('iniscroll');
var limitstart = '0';

iLoadPosts(limit,limitstart,'*','*');
    },300);

});


tQuery("#icsearchtags").on('select2-clearing', function(event) {

tQuery('#icsearch').select2("val", "");
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#grid").attr('data-filter','*');
tQuery("#grid").attr('data-filtertype','*');
tQuery("#grid").find('.media-box,.media-box-hidden,.nomoreposts').fadeOut().remove();
tQuery("#iloadr").fadeIn();
    setTimeout(function(){
var limit = parseInt(tQuery("#grid").attr('data-limit'));
tQuery("#iloadmoreact").removeClass('iniscroll');
var limitstart = '0';

iLoadPosts(limit,limitstart,'*','*');
    },300);

});


    
tQuery('#s2id_autogen2_search').on('keyup', function() {
var searchword = tQuery(this).val(); 

    setTimeout(function(){
        if(searchword == tQuery('#s2id_autogen2_search').val() && searchword != null && searchword != "") {

tQuery.get('http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=tagfilter&tmpl=tigraajax', {ifilter:searchword}, function(content){
tQuery('#icsearchtags').html(content);
});  
        }
        
    },300);


});  




tQuery('#icsearchtags').on("select2-selecting", function(e) {

tQuery('#icsearch').select2("val", "");
var chosenval = e.val;

var tagfilter = (chosenval.substr(4));

tQuery('#grid').find('.media-box,.media-box-hidden,.nomoreposts').fadeOut().remove();
tQuery("#iloadr").fadeIn();
var limit = parseInt(tQuery("#grid").attr('data-limit'));
tQuery("#grid").attr('data-filter',tagfilter);
tQuery("#grid").attr('data-filtertype','tags');
var limitstart = '0';
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#iloadmoreact").fadeOut();
tQuery("#iloadmoreact").removeClass('iniscroll');
    setTimeout(function(){

iLoadPosts(limit,limitstart,tagfilter,'tags');
    },300);

}); 
tQuery('#icsearch').on("select2-selecting", function(e) {

tQuery('#icsearchtags').select2("val", "");
var chosenval = e.val;

tQuery('#grid').find('.media-box,.media-box-hidden,.nomoreposts').fadeOut().remove();
tQuery("#iloadr").fadeIn();

if (chosenval.indexOf('f') == 0) {
var filtertype = 'iacl';
} else 
if (chosenval.indexOf('c') == 0) {
var filtertype = 'circle';
} else 
if (chosenval.indexOf('u') == 0) {
var filtertype = 'friend';
} 
var limit = parseInt(tQuery("#grid").attr('data-limit'));
tQuery("#grid").attr('data-filter',chosenval);
tQuery("#grid").attr('data-filtertype',filtertype);
var limitstart = '0';
tQuery("#iloadmoreact").attr('data-limitstart','0');
tQuery("#iloadmoreact").fadeOut();
tQuery("#iloadmoreact").removeClass('iniscroll');
    setTimeout(function(){

iLoadPosts(limit,limitstart,chosenval,filtertype);
    },300);

});  


tQuery('.select2-results').scrollbar({ignoreMobile:false});


tQuery("#iclogin,#icModloginclose").click(function () {
 tQuery("#icLoginMod").slideToggle();
        return false;
    });




var ajax_request = false;
var loadInProgress = false;

tQuery('textarea.taggable').textntags({

    onDataRequest:function (mode, query, triggerChar, callback) {
switch (triggerChar) {
case '@':
var surl = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=usearch&tmpl=tigraajax';
break;
case '#':
var surl = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=tagsearch&tmpl=tigraajax';
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




tQuery("div#pm-dropzone").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=pmuploader&tmpl=tigraajax",
maxFiles: 1,
acceptedFiles: "image/*,audio/*,video/*",
previewsContainer:"#pmpreview.dropzone-previews",
addRemoveLinks: true,
dictRemoveFile:"remove",
dictCancelUpload:"cancel",
dictCancelUploadConfirmation:"confirm",
init: function() {
        this.on("success", function(file, responseText) { console.log(responseText);
            var filepm = tQuery.parseJSON(responseText);
            var name = filepm.name;
            var ext = filepm.ext;
            var size = filepm.size;
if(filepm.thumb !== undefined){var thumb = filepm.thumb;

tQuery('<input>').attr({
    type: 'hidden',
    id: 'pmattchthumb',
    name: 'pmattchthumb',
    class: 'loadme',
    value: thumb
}).appendTo('form#new-pm-form');
}
tQuery('<input>').attr({
    type: 'hidden',
    id: 'pmattch',
    name: 'pmattch',
    class: 'loadme',
    value: name
}).appendTo('form#new-pm-form');
tQuery('<input>').attr({
    type: 'hidden',
    id: 'pmattchext',
    name: 'pmattchext',
    class: 'loadme',
    value: ext
}).appendTo('form#new-pm-form');
 });
var _this = this;

      tQuery("button#pmsend, a#pmcancel").on("click", function() {

        _this.removeAllFiles();

      });

    }
 });



var sendPM = function() {
tQuery("#new-pm-form .textntags-wrapper").show().attr('style','').css("visibility","visible");

tQuery("#new-pm-form textarea.taggable").css("min-height","18px");
tQuery("#new-pm-form .textntags-beautifier>div").css("min-height","18px");

var sendtoid = tQuery(this).attr('data-uid');
var senderid = '1004';
tQuery("#icPMessage").attr('data-sendtoid',sendtoid);


tQuery("#icPMessage").addClass('iconn-animated zoomInRight').show();



var recthumb = tQuery(this).attr('data-thumb');
var recimage = 'http://qeneqt.us/images/icprofiles/'+sendtoid+'/'+recthumb;
var recname = tQuery(this).attr('data-iname');
var header = 'Private Message to: ';

tQuery("#icPMessage").find('.pm-rec-image').html('<img src="'+recimage+'" />');
tQuery("#icPMessage").find('.pm-rec-name').html('<span>'+header+'</span>'+recname);
tQuery("input#sendtoid").val(sendtoid);
tQuery("input#senderid").val(senderid);


tQuery(".imessage").off('click',sendPM);
tQuery(".imessage").on('click',sendPM);

return false;
    }
 tQuery(".imessage").click(sendPM);




tQuery('textarea#pmtext').keyup(function() {
tQuery('textarea.taggable#pmtext').textntags('val', function(text) {

tQuery("input#ipmtext").val(text);

});
 });

tQuery('textarea.taggable#pmtext')
  .bind('tagsAdded.textntags', function (e, addedTagsList) {
 tQuery('textarea.taggable#pmtext').textntags('val', function(text) {

tQuery("input#ipmtext").val(text);

});
  });






function callPmAjax(){


 var pmData = tQuery("#new-pm-form input.loadme").map(function () {
        return tQuery(this).val().trim() == "" ? null : this;
    }).serialize();

   tQuery.ajax({
            type: 'POST',
            url:'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=sendpm&tmpl=tigraajax',
            dataType: "json",
            data: pmData,
            cache: false,
            success: function (data) {    

var successmsg = '<div id="overmsg" class="sweet-alert"><div style="display: block;" class="sa-icon sa-success animate"><span class="sa-line sa-tip animateSuccessTip"></span><span class="sa-line sa-long animateSuccessLong"></span><div class="sa-placeholder"></div><div class="sa-fix"></div></div><h2>'+data.title+'</h2><p>'+data.msg+'</p><div class="closing-alert">Closing in 2 seconds</div></div>';


tQuery("#icPMessage").find("#tagpmspace").fadeOut();

tQuery(successmsg).hide().prependTo("#icPMessage").fadeIn();
setTimeout(
  function() 
  {
tQuery("#icPMessage").addClass('zoomOutRight').hide();
tQuery("#overmsg").remove();
tQuery("#icPMessage").removeClass('iconn-animated zoomInRight zoomOutRight').attr('data-sendtoid','');
tQuery("input#sendtoid").val('');
tQuery("#new-pm-form input").val('');
tQuery("#new-pm-form textarea").val('');
tQuery("#pmpreview").html('');
tQuery('input#pmattch').remove();
tQuery('input#pmattchext').remove();
tQuery('input#pmattchthumb').remove();

tQuery("#icPMessage").find("#tagpmspace").fadeIn();
  }, 2000);


}
});
}


var ipmvalidate = tQuery("#new-pm-form").validate({
ignore: "",
    rules: {
        ipmsubject:"required",
        ipmtext:"required",

    },
    messages: {
	ipmsubject: "Your Message needs a Subject",
	ipmtext: "Your Message needs some content",

    },
 errorPlacement: function(error, element) {


var posterror = error.text();

swal({
  title: "Oops, an error occurred!",
  text: posterror,
  type: "error",
  confirmButtonText: "Got it!"
},
function(isConfirm){
tQuery("#new-pm-form .textntags-wrapper").show().attr('style','').css("visibility","visible");

tQuery("#new-pm-form textarea.taggable").css("min-height","18px");
tQuery("#new-pm-form .textntags-beautifier>div").css("min-height","18px");
});
},
    submitHandler: function() {

        callPmAjax();

    }
    });

tQuery("#pmcancel").click(function(){

tQuery("#icPMessage").removeClass('zoomInRight').addClass('zoomOutRight');
setTimeout(function () {

tQuery("#icPMessage").hide()
tQuery("#overmsg").remove();
tQuery("#icPMessage").removeClass('iconn-animated zoomOutRight').attr('data-sendtoid','');
tQuery("input#sendtoid").val('');
tQuery("#new-pm-form input").val('');
tQuery("#new-pm-form textarea").val('');
tQuery("#pmpreview").html('');
tQuery("#pm-dropzone").removeClass('dz-max-files-reached');
tQuery('input#pmattch').remove();
tQuery('input#pmattchext').remove();
tQuery('input#pmattchthumb').remove();

tQuery("#icPMessage").find("#tagpmspace").fadeIn();
     
    }, 500);
return false;
    });




function removeShareForm(){
tQuery("#ishare-form").get(0).reset();
tQuery("#isharemodal").attr('data-formsid','');
tQuery("#isharemodal").find('.shared-preview').empty();
tQuery("#ishare-form input,#ishare-form textarea").val('');
tQuery("#sharebox").removeClass('ismedia istext istitle');

tQuery('#ishare-form textarea.taggable').textntags('reset');
tQuery("#ishare-form .textntags-beautifier").find("div").empty();
tQuery("#ishare-form .textntags-wrapper").show().css("visibility","visible");

tQuery("#ishare-form textarea.taggable").css("min-height","18px");
tQuery(".textntags-beautifier>div").css("min-height","18px");
tQuery("#ishare-form input#sh1").val('1');
tQuery("#ishare-form input#sh2").val('2');
tQuery("#ishare-form input#sh3").val('3');
tQuery("#ishare-form input#shareoptval").val('1');

tQuery("#ishare-form").find('.select2-search-choice').remove();

tQuery("#ishare-form .statusreshareacl").val('f0');
tQuery("#ishare-form input#sharedacl").val('f0');
}


function sharetagsFetcher(){




tQuery("#ishare-form input#sh1").val('1');
tQuery("#ishare-form input#sh2").val('2');
tQuery("#ishare-form input#sh3").val('3');
tQuery("#ishare-form input#shareoptval").val('1');

 tQuery("#ishare-form textarea.taggable").css("min-height","18px");
tQuery(".textntags-beautifier>div").css("min-height","18px");

$queryShare = tQuery("#preshareacl");
$queryShare.select2("destroy").select2({});

tQuery("#ishare-form .statusreshareacl").select2("val","f0");
tQuery("#ishare-form input#sharedacl").val('f0');


tQuery('.select2-results').scrollbar({ignoreMobile:false});

tQuery('#ishare-form textarea.taggable').change(function() {
var sasitype =  tQuery(this).val();
tQuery("input#actretext").val(sasitype);
 
});

var radioShareswitch = function(){


var optval =  tQuery(this).val();
tQuery("#ishare-form input#shareopt").val(optval);
tQuery("input#sharedacl").val('');
$queryShare.select2("destroy").select2({});
tQuery("#ishare-form .statusreshareacl").select2("val","");



if(optval !== '1'){

tQuery('#preshareacl').find('optgroup.ishcons option').attr('disabled','disabled');
tQuery('#preshareacl').find('optgroup.ishcircles option').attr('disabled','disabled');

if(optval == '2'){
tQuery('#preshareacl').find('option.ihideon').removeAttr("disabled");
}
if(optval == '3'){
tQuery('#preshareacl').find('option.ihideon').attr('disabled','disabled');
}
}
if(optval === '1'){


tQuery('#preshareacl').find('option.ihideon').attr('disabled','disabled');
tQuery('#preshareacl').find('optgroup.ishcons option').removeAttr("disabled");
tQuery('#preshareacl').find('optgroup.ishcircles option').removeAttr("disabled");
tQuery('.ihideon').hide();
}
}
tQuery("#ishare-form input:radio").click(radioShareswitch);


$queryShare.on('change', function(obj) {

var isnowval = obj.val;

var cleanVals = [];
tQuery.each(isnowval, function(i, el){
    if((tQuery.inArray(el, cleanVals) === -1) && (el != "")){ cleanVals.push(el)};

});

var sharestringval = cleanVals.toString();

console.log(sharestringval);

tQuery("input#sharedacl").val(sharestringval);
});
}






function callShareAjax(dataopt){

var shareData = tQuery("#ishare-form").serialize(); 
console.log(dataopt);

if(dataopt === "1") {

  tQuery.ajax({
            type: 'POST',
            url:'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=ishare&tmpl=tigraajax',
            dataType: 'html',
            data: shareData,
            cache: false,
            error: function (data) { console.log(data);},   
            success: function (html) {    

var newitem = tQuery(html);

var $gridd = tQuery('#grid').isotopeMB();
  
$gridd.prepend( newitem ).fadeIn().isotopeMB( 'insert', newitem );

$gridd.isotopeMB({
  sortBy: '[data-streamid] parseInt',
  sortAscending: false
});
resetIbuttons();
}
});

} else {

  tQuery.ajax({
            type: 'POST',
            url:'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=ishare&tmpl=tigraajax',
            dataType: 'json',
            data: shareData,
            cache: false,
            error: function (data) { console.log(data);},   
            success: function (data) {    


if(dataopt === "2") {
var title = "Post Shared";
var msg = "You have successfully shared post on a Wall";
} else if(dataopt === "3") {
var title = "Post Shared";
var msg = "You have successfully shared post via private message";
} 

swal({
  title: title,
  text: msg,
  type: "success",
  timer: 2000,
  showConfirmButton: false
});
}
});
}
tQuery("#isharemodal").dockmodal("close");

}





var Sharehandler = function() {


var sharebutton = tQuery(this);
var id = tQuery(this).attr('data-origid');
var cidtype = tQuery(this).attr('data-cidtype');
tQuery("#ishare-form input#sharedtype").val(cidtype);
tQuery("#ishare-form input#sharedid").val(id);

var iscircleid = tQuery(this).attr('data-circleid');
var iswallid = tQuery(this).attr('data-wallid');

tQuery("#ishare-form input#circleid").val(iscircleid);
tQuery("#ishare-form input#wallid").val(iswallid);
tQuery("#ishare-form input#sh1").val('1');
tQuery("#ishare-form input#sh2").val('2');
tQuery("#ishare-form input#sh3").val('3');
tQuery("#ishare-form input#shareopt").val('1');
tQuery("#ishare-form input#sharedacl").val('f0');
tQuery("#ishare-form .statusreshareacl").val('f0');
tQuery("#ishare-form input#creatorid").val(1004);
var newsharestyle = tQuery("#iconn-stream").attr('class');
var newsharemodal = tQuery("#isharemodal");
newsharemodal.attr('data-formsid', id).attr('class',newsharestyle);


    tQuery(newsharemodal).dockmodal({
    initialState: "docked",
    title: "Share",
    width: 360,
    height: "70%",
     close: function( event, dialog ) {
     removeShareForm();

     }
    });
sharetagsFetcher();

var actpreview = tQuery(this).closest('.media-box');
var actpreviewimg = tQuery(actpreview).find('.media-box-thumbnail-container').attr('data-thumbnail');
var actpreviewtitle = tQuery(actpreview).find('.media-box-title').html();
var actpreviewtext = tQuery(actpreview).find('.media-box-text').html();

if(actpreviewimg !== undefined && actpreviewtitle !== undefined){
tQuery("#sharebox").addClass('ismedia');
tQuery("#sharebox .shared-preview").html('<div class="shared-title">'+actpreviewtitle+'</div><div class="shared-img"><img class="ishare-img" src="'+actpreviewimg+'"/></div>').fadeIn();
} else
if(actpreviewimg !== undefined){
tQuery("#sharebox").addClass('ismedia');
tQuery("#sharebox .shared-preview").html('<div class="shared-img"><img class="ishare-img" src="'+actpreviewimg+'"/></div>').fadeIn();
} else 
if(actpreviewtext !== undefined && actpreviewtitle !== undefined){
tQuery("#sharebox").addClass('istext');
tQuery("#sharebox .shared-preview").html('<div class="shared-title">'+actpreviewtitle+'</div><div class="shared-text">'+actpreviewtext+'</div>').fadeIn();
} else
if(actpreviewtitle !== undefined){
tQuery("#sharebox").addClass('istitle');
tQuery("#sharebox .shared-preview").html('<div class="shared-title">'+actpreviewtitle+'</div>').fadeIn();
}
 
tQuery('.inamelink').click(userInameTag);


 isharevalidate = tQuery("#ishare-form").validate({
ignore: "input[type='hidden']:not('.toshare')",
    rules: {
        sharedacl:"required",
        shareopt:"required",

    },
    messages: {
	sharedacl: "Please add who are you sharing the post with",
	shareopt: "Please choose sharing option",

    },
 errorPlacement: function(error, element) {
var parentlbl = tQuery(element).closest('label.ifield').addClass('state-error');

var posterror = error.text();

swal({
  title: "Oops, an error occurred!",
  text: posterror,
  type: "error",
  confirmButtonText: "Got it!"
},
function(isConfirm){
tQuery("#ishare-form .textntags-wrapper").show().attr('style','').css("visibility","visible");

tQuery("#ishare-form textarea.taggable").css("min-height","18px");
tQuery("#ishare-form .textntags-beautifier>div").css("min-height","18px");
});
},
    submitHandler: function(form) {
var dataopt = tQuery("#ishare-form input#shareopt").val();

        callShareAjax(dataopt);

        return false; 

    }
    });

return false;
};


 tQuery('.ishares').click(Sharehandler);




var ilikeActbtn = function () {
var likebutton = tQuery(this);
var cid = tQuery(this).attr('data-cid');
var cidtype = tQuery(this).attr('data-cidtype');
var uid = tQuery(this).attr('data-uid');
var action = tQuery(this).attr('data-action');
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=likes&tmpl=tigraajax';


if (action =='add')
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'add',cid:cid,cidtype:cidtype,uid:'1004'},
cache: false,
success: function( data ) {
tQuery(likebutton).addClass('liked').attr("data-action","remove").attr("data-hint","remove like");
tQuery(likebutton).text(data);
}
});
}
else
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'remove',cid:cid,cidtype:cidtype,uid:'1004'},
cache: false,
success: function( data ) {
tQuery(likebutton).removeClass('liked').attr("data-action","add").attr("data-hint","like");
tQuery(likebutton).text(data);
}
});
}

return false;

    }
 tQuery(".ilikes").click(ilikeActbtn);



function sendNoti27(){
var cid = tQuery(this).attr('data-cid');
var cidtype = tQuery(this).attr('data-cidtype');
var targetid = tQuery(this).attr('data-targetid');


      tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=notify&tmpl=tigraajax',
            data: {type:'info',cid:cid,cidview:cidtype,uid:'1004',targetuser:targetid,status:'27'},    
        dataType: "html",
            cache: false,   
            success: function(){

}
});
}

tQuery('a.sendnoti27').click(sendNoti27);

function clearmyNoti(notiid){

      tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=notiupdate&tmpl=tigraajax',
            data: {notiid:notiid},    
        dataType: "json",
            cache: false,   
            error: function(data){console.log(data);},
            success: function(data){console.log(data);

tQuery('#noti'+notiid).fadeOut();


var curnotinum = tQuery('#icNotibtn span.notinum').text();
var newnotinum = parseFloat(curnotinum) - 1;
tQuery('#icNotibtn span.notinum').text(newnotinum);
}
});
}

var clearNotionView = function(){

var notiid = tQuery(this).closest('.icNotify').attr('data-notiid');
tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=notiupdate&tmpl=tigraajax',
            data: {notiid:notiid},    
        dataType: "json",
            cache: false,   
            error: function(data){console.log(data);},
            success: function(data){console.log(data);

tQuery('#noti'+notiid).fadeOut();
var curnotinum = tQuery('#icNotibtn span.notinum').text();
var newnotinum = parseFloat(curnotinum) - 1;
tQuery('#icNotibtn span.notinum').text(newnotinum);
}
});
}
tQuery('.icNotifyacts a.noticlear').click(clearNotionView);


var ifriends = function () {
var friendsbutton = tQuery(this);
var friendid = tQuery(this).attr('data-uid');

var action = tQuery(this).attr('data-action');
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=friends&tmpl=tigraajax';


if (action == 'add')
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'add',friendid:friendid,uid:'1004'},
cache: false,
    dataType: "json",
success: function(data) {

if(data.status === "1"){

showSuccessMsg('Friend request sent');

tQuery(friendsbutton).removeClass('icaddfriend').addClass('icfriendpending').attr("data-action","").attr("data-hint","Friend request already sent");
}
}
});
}


if (action == 'accept')
{

var notiid = tQuery(friendsbutton).closest('.icNotify').attr('data-notiid');

  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'confirm',friendid:friendid,uid:'1004'},
    dataType: "json",
cache: false,
success: function(data) {

if(data.status === "1"){

showSuccessMsg('You are friends now!');

clearmyNoti(notiid);
}
}
});
}


if (action == 'confirm')
{

  tQuery.ajax({
    url: url,
    type: 'POST',
    dataType: "json",
    data: {action:'confirm',friendid:friendid,uid:'1004'},
cache: false,

success: function(data) {

if(data.status === "1"){
showSuccessMsg('You are friends now!');

tQuery(friendsbutton).removeClass('icapprovefriend').addClass('icremovefriend').attr("data-action","remove").attr("data-hint","You are friends now!");

}
}
});
}

if (action =='reject')
{

var notiid = tQuery(friendsbutton).closest('.icNotify').attr('data-notiid');

  tQuery.ajax({
    url: url,
    type: 'json',
    data: {action:'reject',friendid:friendid,uid:'1004'},
    dataType: "html",
cache: false,
success: function(data) {
showSuccessMsg('Friend request rejected');
if(data.status === "1"){
clearmyNoti(notiid);
}
}
});
}


if (action =='remove')
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'remove',friendid:friendid,uid:'1004'},
    dataType: "json",
cache: false,
success: function(data) {

if(data.status === "1"){

showSuccessMsg('You are no longer friends');
tQuery(friendsbutton).removeClass('icremovefriend').addClass('icaddfriend').attr("data-action","add").attr("data-hint","Add as friend");
}
}
});
}

return false;

    }
 tQuery(".icfriends").click(ifriends);




var ifollow = function () {
var followbutton = tQuery(this);
var followid = tQuery(this).attr('data-uid');

var action = tQuery(this).attr('data-action');
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=follows&tmpl=tigraajax';


if (action =='add')
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'add',followid:followid,uid:'1004'},
    dataType: "html",
cache: false,
success: function() {showSuccessMsg('Following successful');
tQuery(followbutton).removeClass('icaddfollower').addClass('icfollowing').attr("data-action","remove").attr("data-hint","Un-follow");

}
});
}
else
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'remove',followid:followid,uid:'1004'},
    dataType: "html",
cache: false,
success: function() {showSuccessMsg('Un-following successful');
tQuery(followbutton).removeClass('icfollowing').addClass('icaddfollower').attr("data-action","add").attr("data-hint","Follow");

}
});
}

return false;

    }
 tQuery(".ifollows").click(ifollow);




var ifavorites = function () {
var favoritebutton = tQuery(this);
var cid = tQuery(this).attr('data-origid');
var cidtype = tQuery(this).attr('data-cidtype');
var action = tQuery(this).attr('data-action');
var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=favorites&tmpl=tigraajax';


if (action =='add')
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    data: {action:'add',cid:cid,cidtype:cidtype,uid:'1004'},
    dataType: "html",
cache: false,
success: function( data ) {
tQuery(favoritebutton).removeClass('icfavor').addClass('icfavored').attr("data-action","remove").attr("data-hint","Remove from Favorites");
tQuery(favoritebutton).text(data);
}
});
}
else
{
  tQuery.ajax({
    url: url,
    type: 'POST',
    dataType: "html",
    data: {action:'remove',cid:cid,cidtype:cidtype,uid:'1004'},
cache: false,
success: function( data ) {
tQuery(favoritebutton).removeClass('icfavored').addClass('icfavor').attr("data-action","add").attr("data-hint","add to Favorites");
tQuery(favoritebutton).text(data);
}
});
}

return false;

    }
 tQuery(".ifavorites").click(ifavorites);





function resizecommbox(){

if(tQuery("#commentbox").length){
var iniheight = tQuery("#commentbox").height();

tQuery("#commentscroll").css('max-height',iniheight);
console.log(iniheight);
}
}




var Comhandler  = function() {
var cid = tQuery(this).attr('data-cid');console.log(cid); 
var comtotal = tQuery(this).attr('data-comtotal');
var comlimit = '5';

var cidtype = tQuery(this).attr('data-element');

      tQuery.ajax({ 
            type: "GET",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=icommbox&tmpl=tigraajax',
            data: {element:cidtype,cid:cid,uid:1004,comtotal:comtotal,comlimit:comlimit,iview:'frontpage'},    
        dataType: "html",
            cache: false,   
            error: function(data){console.log(data); },
            success: function(content){

var comform = tQuery(content);

tQuery("#comwrapr").html(comform).addClass('iconn-animated zoomInRight').show();
setTimeout(function(){resizecommbox();}, 500);



tQuery('#commentscroll.ic-scrollbar').scrollbar({ignoreMobile:false});


tQuery(window).resize(_.debounce(function(){
   resizecommbox();
},500));


          }
      });

return false;
}
 tQuery('.icomments').click(Comhandler);



      function saveBoardlist(boardid,itemid,cidtype,action) {
     
        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=saveboard&tmpl=tigraajax',
            data: {action:action,boardid:boardid,uid:1004,cid:itemid,cidtype:cidtype},    
        dataType: "json",
            cache: false,   
            success: function(data){

var msg = data.msg;

showSuccessMsg(msg);

if(action === 'add'){
var pinnedcount = tQuery('.ipins#pincid'+itemid).text();
var newcount = parseInt(pinnedcount)+1;
tQuery('.ipins#pincid'+itemid).text(newcount).removeClass('disabled');
}
if(action === 'remove'){
var pinnedcount = tQuery('.ipins#pincid'+itemid).text();
var newcount = parseInt(pinnedcount)-1;
tQuery('.ipins#pincid'+itemid).text(newcount).removeClass('disabled');
}

          }
      });
    
  }

function boardactions(itemid,cidtype){


tQuery("#closegrid").click(function(){
tQuery('body').removeClass('drag-active');
tQuery("#drop-area").removeClass('show');
tQuery("#dropline").find('.drop-area__item').remove();
tQuery("#dropline").find('.noboardsyet').remove();

loadInProgress = false;
return false;
});

tQuery(".drop-area__item").click(function(){

tQuery(this).toggleClass('drop-feedback');

var boardid = tQuery(this).attr('data-boardid');
var inboard = tQuery(this).attr('data-inboard');
if(inboard === '0') {
tQuery(this).attr('data-inboard','1')

saveBoardlist(boardid,itemid,cidtype,'add');

} else 
if(inboard === '1') {
tQuery(this).attr('data-inboard','0')
saveBoardlist(boardid,itemid,cidtype,'remove');
} 

return false;
});


}



var addtoBoards = function() {

 if(loadInProgress) return;
  loadInProgress = true;

var itemid = tQuery(this).attr('data-origid');
var cidtype = tQuery(this).attr('data-cidtype');
var uid = '1004';
tQuery('body').addClass('drag-active');

 tQuery.ajax({ 
            type: "GET",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=getuboards&tmpl=tigraajax',
            data: {cid:itemid,element:cidtype,uid:1004},    
        dataType: "json",
            cache: false,   
            success: function(cdata){

if((cdata !== null) && (cdata.length)) {

var boards = '';

               
                tQuery.each(cdata,function(i,obj)
                {

var boardid = obj.boardid;
var cidinboard = obj.inboard;
var boardname = obj.boardname;
var boardthumb = obj.boardthumb;
if(cidinboard === '1' ){
var inboard = 'drop-feedback';
} else {
var inboard = '';
}

var board = '<div class="isb drop-area__item ' + inboard + '" data-boardid="' + boardid + '" data-inboard="' + cidinboard + '"><div class="dropinner"><img class="miniboard" src="'+icBaseurl+'images/icboards/' + uid + '/' + boardthumb + '"></img></div><div class="dropname">' + boardname + '</div><div class="dropadd">add me here</div><div class="dummy"></div></div>';

boards += board;
});


tQuery("#dropline").append(boards);
tQuery("#drop-area").addClass('show');

boardactions(itemid,cidtype);

}
else {

var noboards = '<div class="noboardsyet"><p class="isblock iscenter">You have no Boards, yet!</p><small class="isblock iscenter">Create some now, by clicking </small><p class="isblock iscenter"><a href="/add-board" class="isinlineblock iscenter ic-btn ic-btn-blue createnew">here</a></p></div>';

tQuery("#dropline").append(noboards);
tQuery("#drop-area").addClass('show');
boardactions(itemid,cidtype);
}
}
});



return false;

}


tQuery(".ipins").click(addtoBoards);


setTimeout(
  function() {
tQuery("#drop-area").attr('style','');
tQuery(".drop-overlay").attr('style','');
  }, 5000);


     function saveCirclelist(circleid,profileid,action) {
     
        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=savecircle&tmpl=tigraajax',
            data: {action:action,circleid:circleid,uid:1004,profileid:profileid},    
        dataType: "json",
            cache: false,   
            error: function(cdata){},
            success: function(data){

var msg = data.msg;


function ishowSuccessMsg(msg){
toastr.success(msg);
toastr.options.progressBar = true; 
toastr.options.preventDuplicates = true;
}
ishowSuccessMsg(msg);

          }
      });
    
  }

function circleactions(profileid){

tQuery("#closegrid").click(function(){
tQuery('body').removeClass('drag-active');
tQuery("#drop-area").removeClass('show');
tQuery("#dropline").find('.drop-area__item').remove();
tQuery("#dropline").find('.nocirclesyet').remove();
loadInProgress = false;

return false;
});

tQuery(".drop-area__item").click(function(){

tQuery(this).toggleClass('drop-feedback');

var circleid = tQuery(this).attr('data-circleid');
var incircle = tQuery(this).attr('data-incircle');

if(incircle === '3') {
tQuery(this).attr('data-incircle','1');
saveCirclelist(circleid,profileid,'add');
} else 
if(incircle === '0') {
tQuery(this).attr('data-incircle','1');
tQuery(this).removeClass('den');
saveCirclelist(circleid,profileid,'approve');
} else 
if(incircle === '1') {
tQuery(this).attr('data-incircle','0');
saveCirclelist(circleid,profileid,'remove');
} else 
if(incircle === '2') {
tQuery(this).attr('data-incircle','1');
tQuery(this).removeClass('pend');
saveCirclelist(circleid,profileid,'approve');
} 


return false;
});


}



var addtoCircles = function() {
var profileid = tQuery(this).attr('data-uid');
tQuery('body').addClass('drag-active');

 if(loadInProgress) return;
  loadInProgress = true;
 tQuery.ajax({ 
            type: "GET",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=getucircles&tmpl=tigraajax',
            data: {profileid:profileid,uid:1004},    
        dataType: "json",
            cache: false,   
            error: function(cdata){console.log(cdata);},
            success: function(cdata){

if((cdata !== null) && (cdata.length)) {

var circles = '';

               
                tQuery.each(cdata,function(i,obj)
                {

var uid = '1004';

var circleid = obj.circleid;
var uidincircle = obj.incircle;
var circlename = obj.circlename;
var circlethumb = obj.circlethumb;

if(uidincircle === '1' ){
var incircle = 'drop-feedback';

var circle = '<div class="isb drop-area__item ' + incircle + '" data-circleid="' + circleid + '" data-incircle="' + uidincircle + '"><div class="dropinner"><img class="minicircle" src="'+icBaseurl+'images/iccircles/' + uid + '/' + circlethumb + '"></img></div><div class="dropname">' + circlename + '</div><div class="dropadd">add here</div><div class="dummy"></div></div>';

} else if(uidincircle === '2' ){
var incircle = 'pend';


var circle = '<div class="isb drop-area__item ' + incircle + '" data-circleid="' + circleid + '" data-incircle="' + uidincircle + '"><div class="dropinner"><img class="minicircle" src="'+icBaseurl+'images/iccircles/' + uid + '/' + circlethumb + '"></img></div><div class="dropname">' + circlename + '</div><div class="dropadd">pending, approve now</div><div class="dummy"></div></div>';

} else if(uidincircle === '0' ){
var incircle = 'den';

var circle = '<div class="isb drop-area__item ' + incircle + '" data-circleid="' + circleid + '" data-incircle="' + uidincircle + '"><div class="dropinner"><img class="minicircle" src="'+icBaseurl+'images/iccircles/' + uid + '/' + circlethumb + '"></img></div><div class="dropname">' + circlename + '</div><div class="dropadd">denied! approve now</div><div class="dummy"></div></div>';

} else {
var incircle = '';

var circle = '<div class="isb drop-area__item ' + incircle + '" data-circleid="' + circleid + '" data-incircle="' + uidincircle + '"><div class="dropinner"><img class="minicircle" src="'+icBaseurl+'images/iccircles/' + uid + '/' + circlethumb + '"></img></div><div class="dropname">' + circlename + '</div><div class="dropadd">add here</div><div class="dummy"></div></div>';

}


circles += circle;
});


tQuery("#dropline").append(circles);
tQuery("#drop-area").addClass('show');

circleactions(profileid);

}
else {

var nocircles = '<div class="nocirclesyet"><p class="isblock iscenter">You have no Circles, yet!</p><small class="isblock iscenter">Create some now, by clicking </small><p class="isblock iscenter"><a href="/add-circle" class="isinlineblock iscenter ic-btn ic-btn-blue createnew">here</a></p></div>';

tQuery("#dropline").append(nocircles);
tQuery("#drop-area").addClass('show');
circleactions(profileid);
}
}
});


return false;

}


tQuery(".icaddcircle").click(addtoCircles);





var payForFile = function() {


var cid = tQuery(this).attr('data-fileid');
var uid = '1004';
var amt = tQuery(this).attr('data-filefee');

swal({
customClass: 'ipaynoti',
  title: "Please Confirm before proceeding<br><small>We encourage Fair Trading and all suspicious transactions should be reported immediately</small>",
  text: '<span class="mywallet"><span class="isbalance">Balance:</span><span class="iwfee">0</span><span class="iwcurrency">COINS</span><span class="isbalance">Download Cost:</span><span class="iwfee">'+amt+'</span><span class="iwcurrency">COINS</span></span>',
  type: "warning",
  imageUrl: "http://qeneqt.us/components/com_iconnect/assets/images/banktransaction.gif",
  html: true,
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "YES! Continue",
  cancelButtonText: "NO! Cancel for now",
  closeOnConfirm: false,
  closeOnCancel: true
},
function(isConfirm){
  if (isConfirm) {

var payurl = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=filemanager&tmpl=tigraajax';

  tQuery.ajax({
    url: payurl,
    type: 'POST',
    dataType: 'json',
    data: {action:'debit',cid:cid,uid:'1004'},
cache: false
}).done(function(data) { 
         swal(data.title, data.msg, "success");
setTimeout(
  function() {
document.location.reload(true);
  }, 500);
      })
      .error(function(data) {

var errortitle = "Transaction Error!";
var errormsg = "Please, try again later.";

swal(errortitle, errormsg, "error");
      });


}
}
);


return false;

    }
 tQuery(".icPayDownload").click(payForFile);



var sendtoImanager = function() {
var cid = tQuery(this).attr('data-fileid');

var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=filemanager&tmpl=tigraajax';

  tQuery.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: {action:'add',cid:cid,uid:'1004'},
cache: false,
success: function( data ) {

var itemURL = 'http://qeneqt.us/index.php?option=com_iconnect&view=upload&layout=imanager';
var dlhint = "File already in Manager";

tQuery('.icToManager[data-fileid="'+cid+'"] i').toggleClass('icicon-folder-open icicon-cloud-upload');
tQuery('.icToManager[data-fileid="'+cid+'"]').addClass('icInManager').removeClass('icToManager').attr('href',itemURL).attr('data-hint',dlhint);


swal({
  title: data.title,
  text: data.msg,
  type: "success",
  showCancelButton: true,
  confirmButtonColor: "#3c8dbc",
  confirmButtonText: "Open File Manager",
  cancelButtonText: "Stay on Page",
  closeOnConfirm: false,
  closeOnCancel: true
},
function(isConfirm){
  if (isConfirm) {
setTimeout(
  function() {
window.location.href = itemURL;
  }, 500);
  }
});


}
});

return false;

    }
 tQuery(".icToManager").click(sendtoImanager);



var removefromImanager = function() {
var cid = tQuery(this).attr('data-fileid');

var url = 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=filemanager&tmpl=tigraajax';

  tQuery.ajax({
    url: url,
    type: 'POST',
    dataType: 'json',
    data: {action:'remove',cid:cid,uid:'1004'},
cache: false,
success: function( data ) {

var itemURL = 'http://qeneqt.us/index.php?option=com_iconnect&view=upload&layout=imanager';

swal({
  title: data.title,
  text: data.msg,
  type: "success",
  showCancelButton: true,
  confirmButtonColor: "#3c8dbc",
  confirmButtonText: "Open File Manager",
  cancelButtonText: "Maybe later!",
  closeOnConfirm: false,
  closeOnCancel: true
},
function(isConfirm){
  if (isConfirm) {
setTimeout(
  function() {
window.location.href = itemURL;
  }, 500);
  } 
});


}
});

return false;

    }
 tQuery(".icFromManager").click(removefromImanager);





var altAct = function(){

var daddy = tQuery(this).closest('.media-box');
var dhght = tQuery(daddy).height();

if(dhght < 160){tQuery(daddy).addClass('isminiszd');}


$icontent.isotopeMB('layout');


tQuery(daddy).find(".stream-edit-opts").remove();


tQuery(daddy).find(".xtd-editlink").show();
tQuery(daddy).find(".xtd-editact").show();
tQuery(daddy).find('.action-xtd').fadeToggle();
return false;
}

tQuery(".action-opts").click(altAct);


var delAct = function(){
var actid = tQuery(this).attr('data-cid');
var uid = '1004';

        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=actdel&tmpl=tigraajax',
            data: {creatorid:uid,cid:actid},    
       dataType: "json",
            cache: false,   
            error: function(data){console.log(data);},
            success: function(data){console.log(data);
              status = parseInt(data.status);

if(status === '1'){
var msg = 'Activity Deleted!';
showSuccessMsg(msg);
tQuery('#act'+actid+'.media-box').addClass('iconn-animated zoomOutUp').remove();
$icontent.isotopeMB('layout');
} else 

if(status === '2'){
var msg = 'Activity Not deleted!';
showErrorMsg(msg);
} else
if(status === '3'){
var msg = 'Permission Denied!';
showErrorMsg(msg);
}
}
});

return false;
}

tQuery(".xtd-delact").click(delAct);








tQuery(".itooltipster").click(function() {
var iel = tQuery(this);
     tQuery('.ic-overlay').fadeIn().addClass('ic-show');
         iel.find('.mentioneduser').addClass('ic-show').slideDown('slow');
        return false;
});

tQuery(".itooltipend").click(function() {

 tQuery('.mentioneduser.ic-show').slideUp().removeClass('ic-show').remove();
 tQuery('.ic-overlay').fadeOut().removeClass('ic-show');
        return false;

});




 tQuery(".idockchat").click(function () {
var idmodal = tQuery(this).attr('data-uid');
var idtitle = tQuery(this).attr('data-title');
var dmodalcont = tQuery('#formodal'+idmodal+'.ish').html();
tQuery('#imodal').html(dmodalcont).attr('title',idtitle);
 tQuery('#imodal').dockmodal({
            initialState:"docked",
            width:400,
    minimizedWidth: 200,
    height: "50%",
    title: idtitle
    });
        return false;
    });




function showSuccessMsg(msg){
toastr.success(msg);
toastr.options.progressBar = true; 
toastr.options.preventDuplicates = true;
}
function showErrorMsg(msg){
toastr.error(msg);
toastr.options.progressBar = true; 
toastr.options.preventDuplicates = true;
}
function showInfoMsg(msg){
toastr.info(msg);
toastr.options.progressBar = true; 
toastr.options.preventDuplicates = true;
}
function showWarningMsg(msg){
toastr.warning(msg);
toastr.options.progressBar = true; 
toastr.options.preventDuplicates = true;
}


tQuery("#iclogin,#icModloginclose").click(function () {
 tQuery("#welcomelogin").slideToggle();
        return false;
    });



var userInameTag = function (){
var uid = tQuery(this).attr('data-uid');

     tQuery.ajax({
            type: "GET",
            url:"http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=inametag&tmpl=tigraajax",
            dataType: "json",
            data: {uid:uid,userid:'1004'},
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


var itag =  '<div class="iNameUserTag mentioneduser"><div class="iTagAvatar"><img class="isresponsive" src="'+icBaseurl+'images/icprofiles/' + uid + '/' + avatar + '"></img><div class="iTagName"><a class="iClink" target="_blank" href="'+icBaseurl+'index.php?option=com_iconnect&view=profile&id='+uid+'">'+name+'</a><span class="iname">@'+iname+'</span></div></div><div class="iTagInfo"><div class="iTagLikes isinlineblock isw25"><span class="iscount">'+likescount+'</span><span class="issub">likes</span></div><div class="iTagFriends isinlineblock isw25"><span class="iscount">'+friendcount+'</span><span class="issub">friends</span></div><div class="iTagFollowers isinlineblock isw25"><span class="iscount">'+followerscount+'</span><span class="issub">followers</span></div><div class="iTagFollowing isinlineblock isw25"><span class="iscount">'+followingcount+'</span><span class="issub">following</span></div></div><div class="iTagActions">'+actionnotes+'</div></div>';



tQuery('.ic-overlay').fadeIn().addClass('ic-show');

tQuery(itag).prependTo('.uNameTag').addClass('ic-show').fadeIn().slideDown('slow');
}
});
return false;
}

tQuery('.inamelink').click(userInameTag);
tQuery("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});





var openNotis = function(){
tQuery("#noti-window").toggleClass('zoomInDown zoomOutUp ihidden');

tQuery('.icNotifyacts a.noticlear').off('click',clearNotionView);
tQuery('.icNotifyacts a.noticlear').on('click',clearNotionView);
return false;
}
tQuery('#icNotibtn').click(openNotis);



function updateiState(){

      tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=ionupdate&tmpl=tigraajax',
            data: {uid:'1004'},    
        dataType: "json",
            cache: false,   
            success: function(){
console.log('logged out');
}
});

}

tQuery("#iclogout").on('click',updateiState);
 

var ivalidate = tQuery("#timeline-act-form").validate({
ignore: "",
    rules: {
        acl:"required"
    },
    messages: {
	acl: "Please add who are you sharing the post with"
   },
 errorPlacement: function(error, element) {

var posterror = error.text();

swal({
  title: "Oops, an error occurred!",
  text: posterror,
  type: "error",
  confirmButtonText: "Got it!"
},
function(isConfirm){
tQuery("#timeline-act-form").find(".textntags-wrapper").show().attr('style','').css("visibility","visible");

tQuery("#timeline-act-form textarea.taggable").css("min-height","18px");
tQuery("#timeline-act-form .textntags-beautifier>div").css("min-height","18px");
});
},

    submitHandler: function() {

tQuery("#iloadr").fadeIn();
       grabPost();
        return false; 
    }
    });

tQuery(".statusshareacl").val('f0');
tQuery("input#acl").val('f0');



tQuery('#showlocalvid').click(function(){
 tQuery('#lvform').slideToggle();
 tQuery('#ytform').slideToggle();
  return false;
});
tQuery('.ip-webcam,.ip-cancel,#iloadermulti .dz-message').click(function(){
 tQuery('#pixform').slideToggle();
  return false;
});



var stform =  tQuery('#timeline-act-form');


function loaderFetcher(){


tQuery("div#evloadercover").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=iuploaderev&tmpl=tigraajax",
thumbnailWidth: 120,
thumbnailHeight: 120,
maxFiles: 1,
acceptedFiles: "image/*",
init: function() {
        this.on("success", function(file, responseText) {
            var fileres = tQuery.parseJSON(responseText);
            var img = fileres.stream;
            var thumb = fileres.thumb;
tQuery('<input>').attr({
    type: 'hidden',
    id: 'eventcover',
    name: 'eventcover',
    value: img
}).appendTo('form#timeline-act-form');
tQuery('<input>').attr({
    type: 'hidden',
    id: 'eventthumb',
    name: 'eventthumb',
    value: thumb
}).appendTo('form#timeline-act-form');
tQuery('input#acttype').val("event");
tQuery('button.subbtn').removeClass('disabled');
        });
var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {
        _this.removeAllFiles();
      });


    }
 });



tQuery("div#iloadermulti").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=iuploader&tmpl=tigraajax",
thumbnailWidth: 120,
thumbnailHeight: 120,
maxFiles: 4,
previewsContainer: "#iloaderpreview",
acceptedFiles: "image/*",
init: function() {
var num = 0;
        this.on("success", function(file, responseText) {num = num + 1;
            var fileres = tQuery.parseJSON(responseText);
            var img = fileres.img;
            var thumb = fileres.stream;
tQuery('<input>').attr({
    type: 'hidden',
    class: 'loadme',
    id: 'iphoto'+num,
    name: 'iphoto'+num,
    value: img
}).appendTo('form#timeline-act-form');
tQuery('<input>').attr({
    type: 'hidden',
    class: 'loadme',
    id: 'ithumb'+num,
    name: 'ithumb'+num,
    value: thumb
}).appendTo('form#timeline-act-form');

tQuery("input#acttype").val("photos");
tQuery(".subbtn").removeClass("disabled");
        });

var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {num = 0;
        _this.removeAllFiles();
      });


    }
 });

tQuery("div#iloaderviduploads").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=ividuploader&tmpl=tigraajax",
maxFiles: 1,
acceptedFiles: "video/*",
init: function() {
        this.on('uploadprogress', function (file, progress) {

if(progress >90) {
tQuery('.loadinginfo').find('p').text('Converting to a web friendly format... please wait').addClass('iconn-animated flash');
}
       
    });
        this.on("error", function(error) {console.log(error);    });
        this.on("success", function(file, responseText) {console.log(responseText);console.log(file);
tQuery('<input>').attr({
    type: 'hidden',
    id: 'localvideo',
    name: 'localvideo',
    value: responseText
}).appendTo('form#timeline-act-form');
tQuery("input#acttype").val("localvideo");
tQuery("div#iloaderviduploads").addClass('dz-complete');
 var converted = tQuery.parseJSON(responseText);
            var img = converted.image;

var previmg = "http://qeneqt.us/images/icvideos/converted/1004/"+img;

var imgpreview = tQuery('#iloaderviduploads').find('.dz-image').fadeIn();

tQuery(imgpreview).html('<img src="'+previmg+'"/>').addClass('iconn-animated rubberBand');

var locvidObject = new Object();
locvidObject.vtype = "local";
locvidObject.title = tQuery("input#locvidname").val();
locvidObject.description = tQuery("input#locviddesc").val();
locvidObject.image = converted.image;
locvidObject.mp4 = converted.mp4;



var locvidString = JSON.stringify(locvidObject);

tQuery("input#actlocvideo").val(locvidString);
tQuery("input#acttype").val("localvideo");
tQuery("input#vidon").val("yes");
if((tQuery('input#locvidname').val().length > 2 ) && (tQuery('input#locviddesc').val().length > 2 )){
tQuery('button.subbtn').removeClass('disabled');
}
        });
var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {
        _this.removeAllFiles();
      });
    }
 });
 


tQuery('input#locvidname').keyup(function() {
if( tQuery(this).val().length > 2 ) {
if((tQuery('input#locviddesc').val().length > 2 ) && (tQuery("input#actlocvideo").val().length >0)){
tQuery('button.subbtn').removeClass('disabled');
}
}
if( tQuery(this).val().length === 0 ) { tQuery('button.subbtn').addClass('disabled');}
});
tQuery('input#locviddesc').keyup(function() {
if(tQuery(this).val().length > 2 ) {
if((tQuery('input#locvidname').val().length > 2 ) && (tQuery("input#actlocvideo").val().length >0)) {
tQuery('button.subbtn').removeClass('disabled');
}
}

if( tQuery(this).val().length === 0 ) { tQuery('button.subbtn').addClass('disabled');}
});
 


tQuery("._vid_parser").urlData({
		containerAnchorClass: "parsed-vid-data",
		name: 'vidDataTextarea',
buttonText: "FETCH",
	placeholder: "Enter Video URL",
parserURL: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=get_data&tmpl=tigraajax",
		onComplete: function( data ){		
			tQuery("#actVid .save-holder").show();
var isvtitle = tQuery("#actVid .urldata_title").text();
var isvdesc = tQuery("#actVid .urldata_description").text();
var isvurl = tQuery("#actVid #target_url_input").val();
var isvthumb = tQuery('#actVid').find('.urldata_thumbnail img:visible').attr('src');

var vidObject = new Object();
vidObject.vtype = "youtube";
vidObject.photo = isvthumb;
vidObject.link = isvurl;
vidObject.title = isvtitle;
vidObject.description = isvdesc;

var vidString = JSON.stringify(vidObject);

tQuery("input#actvideo").val(vidString);
tQuery("input#acttype").val("video");
tQuery("input#vidon").val("yes");
tQuery("button.subbtn").removeClass("disabled");

		}
	});

tQuery(".parsed-vid-data").urlView();



tQuery("div#iloaderuploads").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=ifuploader&tmpl=tigraajax",
maxFiles: 1,
acceptedFiles: "image/*,application/pdf,audio/*,video/*",
init: function() {
        this.on("success", function(file, responseText) {
var uploaded = tQuery.parseJSON(responseText);

var uploadObject = new Object();
uploadObject.title = file.name;
uploadObject.name = uploaded.name;
uploadObject.ext = uploaded.ext;
uploadObject.size = uploaded.size;

var uploadString = JSON.stringify(uploadObject);

tQuery("input#actupload").val(uploadString);
tQuery("input#acttype").val("upload");
if(tQuery('input#ftitle').val().length > 2){
tQuery('button.subbtn').removeClass('disabled');
}
        });
var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {
        _this.removeAllFiles();
      });
    }
 });




tQuery('input#ftitle').keyup(function() {
if((tQuery(this).val().length > 2 ) && (tQuery("input#actupload").val().length >0)){
tQuery('button.subbtn').removeClass('disabled');
}
if( tQuery(this).val().length === 0 ) { tQuery('button.subbtn').addClass('disabled');}
});



tQuery("div#iloadermusic").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=imuploader&tmpl=tigraajax",
maxFiles: 1,
acceptedFiles: "audio/*",
init: function() {
        this.on("success", function(file, responseText) {
var iuploaded = tQuery.parseJSON(responseText);

var musicObject = new Object();
musicObject.title = file.name;
musicObject.file = iuploaded.imusic;
musicObject.type = iuploaded.imusictype;

var musicString = JSON.stringify(musicObject);

tQuery("input#actmusic").val(musicString);
tQuery("input#acttype").val("music");
if((tQuery('input#imauthor').val().length > 2 ) && (tQuery('input#imtitle').val().length > 2 ) && (tQuery("input#icover").val().length)){
tQuery('button.subbtn').removeClass('disabled');
}
        });
var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {
        _this.removeAllFiles();
      });
    }
 });





tQuery('input#imtitle').keyup(function() {
if( tQuery(this).val().length > 2 ) {
if((tQuery('input#imauthor').val().length > 2 ) && (tQuery("input#actmusic").val().length >0) && (tQuery("input#icover").val().length)){
tQuery('button.subbtn').removeClass('disabled');
}
}
if( tQuery(this).val().length === 0 ) { tQuery('button.subbtn').addClass('disabled');}
});
tQuery('input#imauthor').keyup(function() {
if(tQuery(this).val().length > 2 ) {
if((tQuery('input#imtitle').val().length > 2 ) && (tQuery("input#actmusic").val().length >0) && (tQuery("input#icover").val().length)) {
tQuery('button.subbtn').removeClass('disabled');
}
}

if( tQuery(this).val().length === 0 ) { tQuery('button.subbtn').addClass('disabled');}
});


tQuery('#imtitle').change(function() {
var imusictitle  = tQuery(this).val(); 
tQuery("input#imusictitle").val(imusictitle);
});
tQuery('#imauthor').change(function() {
var imusicauthor = tQuery(this).val(); 
tQuery("input#imusicauthor").val(imusicauthor);
});


tQuery("div#iloadercover").dropzone({ 
url: "http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=icovloader&tmpl=tigraajax",
thumbnailWidth: 120,
thumbnailHeight: 120,
maxFiles: 1,
acceptedFiles: "image/*",
init: function() {
        this.on("success", function(file, responseText) {
            var fileres = tQuery.parseJSON(responseText);
            var cover = fileres.stream;
            var thumb = fileres.thumb;
tQuery('<input>').attr({
    type: 'hidden',
    class: 'loadme',
    id: 'icover',
    name: 'icover',
    value: cover
}).appendTo('form#timeline-act-form');
tQuery('<input>').attr({
    type: 'hidden',
    class: 'loadme',
    id: 'ithumb',
    name: 'ithumb',
    value: thumb
}).appendTo('form#timeline-act-form');

        });

var _this = this;
      tQuery(".subbtn,.ireset").on("click", function() {
        _this.removeAllFiles();
      });


    }
 });

}



function tagsFetcher(){


tQuery('.statusshareacl').select2("destroy").select2({});


tQuery(".statusshareacl").val('f0');
tQuery("input#acl").val('f0');

tQuery('.statusshareacl').change(function() {
var ids = tQuery(this).val(); 
tQuery("input#acl").val(ids);
});
}



function remoteFetcher(){
var time = function(){return'?'+new Date().getTime()};

			tQuery('#actPhoto .ip-webcam').click(function(){tQuery("#paction").fadeIn();return false;});

tQuery('#actPhoto .ip-actions .ic-btn').click(function(){return false;});

tQuery("input#actphoto").val('');
tQuery('#actPhoto .ip-cancel').click(function(){
tQuery("input#actphoto").val('');
tQuery("#paction img").remove();
tQuery("#paction .ip-preview").html('');
tQuery("#paction").hide();
tQuery("input#acttype").val('');
return false;});

			tQuery('#actPhoto').imgPicker({
				url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=upload_photo&tmpl=tigraajax',
				aspectRatio: 1,
				deleteComplete: function() {					
					tQuery('input#actphoto').val('');
					this.modal('hide');
				},
				uploadSuccess: function(image) {

tQuery("#paction").fadeIn();
var urlimage = image.versions.stream.url;
var strImage = urlimage.split(/[/ ]+/).pop();
var cleanImage = strImage.split("?");
var saveImage = cleanImage[0];

					this.modal('hide');
var photoObject = new Object();
photoObject.thumb = image.versions.stream.vname;
photoObject.photo = image.versions.photo.vname;

var photoString = JSON.stringify(photoObject);

tQuery("input#actphoto").val(photoString);
tQuery("input#acttype").val("photo");

tQuery("button.subbtn").removeClass("disabled");
				},
cropSuccess: function(image) { 

tQuery('#paction').prepend('<img class="iconn-img-thumbnail" src='+image.versions.stream.url + time()+'/>');
		

var urlimage = image.versions.stream.url;
var strImage = urlimage.split(/[/ ]+/).pop();
var cleanImage = strImage.split("?");
var saveImage = cleanImage[0];

var photoObject = new Object();
photoObject.thumb = image.versions.stream.vname;
photoObject.photo = image.versions.photo.vname;


var photoString = JSON.stringify(photoObject);

tQuery("input#actphoto").val(photoString);
tQuery("input#acttype").val("photo");

tQuery("button.subbtn").removeClass("disabled");
			}

				
			});


}




var i= 1;

var iThumbInterval;

function getThumbshot(isurl){

var filesrc = 'https://api.thumbalizr.com/?url='+isurl+'&width=800&quality=90&encoding=jpg&mode=screen&api_key=5TJCp36AkQmNqHm0RFONMX2mWSxat';


 tQuery.ajax({ 
            type: "GET",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=thumbalizr&tmpl=tigraajax',
            data: {url: filesrc},    
        dataType: "json",
            cache: false,   
            success: function(data){

if(data.status){

var status = data.status;

var newgen = '<img class="iconn-animated fadeIn" src="'+filesrc+'" width="200" height="200"/>';

if(status == 'QUEUED'){

tQuery("#extracted_thumb").addClass('queued');
tQuery("#extracted_thumb").find('img').fadeOut();
}
if(status == 'FAILED'){
tQuery("#extracted_thumb").addClass('failed');
tQuery("#extracted_thumb").find('img').fadeOut();
var fmsg = 'Thumbshot creation failed temporarily, please try again little later';
showErrorMsg(fmsg);
clearInterval(iThumbInterval);
}

if(status == 'OK'){
tQuery("#extracted_thumb").html(newgen);


var linkObject = new Object();
linkObject.title = tQuery('input#ltitle').val();
linkObject.description = tQuery('input#ldescription').val();
linkObject.image = filesrc;
linkObject.link = tQuery('#get_url').val();

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
if((linkObject.title !== '') && (linkObject.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
tQuery("input#acttype").val("link");
}
clearInterval(iThumbInterval);
}
}
else {
var msg = 'Please, try again later.';
showErrorMsg(msg);
}
}
});
}


	

tQuery('#ifetch').click(function() { 	

var getUrl  = tQuery('#get_url'); 

	var iniurl = tQuery(getUrl).val();
		if (tQuery(getUrl).val()) {
				tQuery("#results").fadeOut();
				tQuery("#loading_indicator").show(); 
				
				var extracted_url = tQuery(getUrl).val(); 
				
				tQuery.post('http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=get_data&tmpl=tigraajax',{'url': extracted_url}, function(data){    

if((data.title == 'undefined') || (data.title == null)) {data.title = "";}

if((data.description == 'undefined') || (data.description == null)) {data.description = "";}


if((data.image == 'undefined') || (data.image == null)) {
getThumbshot(iniurl);

var content = '<div class="extracted_url"><div class="extracted_imgs"><div class="extracted_thumb isgenerating iconn-animated fadeIn" id="extracted_thumb"></div></div></div><div class="extracted_content"><h4 class="extracted_title">'+data.title+'</h4><p class="extracted_description">'+data.description+'</p><div id="alternateinfo"><p class="iconn-alert">Since we could not find any appropriate images on the given url, alternate option - Thumbshots has been activated</p><p class="extracted_generating">Your Link Thumbshot is being generated and refreshed every 2 seconds. Once you see the thumbshot preview, continue with customizing and saving</p></div></div>';

					
					tQuery("#results").html(content); 
					tQuery("#results").slideDown(); 

					tQuery("#openonedit").fadeIn(); 
					tQuery("#loading_indicator").hide(); 

iThumbInterval = setInterval(function(){getThumbshot(iniurl);},5000);

	
} else {

            		
					extracted_images = data.image;
					total_images = parseInt(data.image.length-1);
					total_label = parseInt(data.image.length);
					img_arr_pos = total_images;
					img_label_pos = total_label;
						
					if(total_images>=0){
						inc_image = '<div class="extracted_thumb" id="extracted_thumb"><img src="'+data.image[img_arr_pos]+'" width="200" height="200"></div>';
var content = '<div class="extracted_url"><div class="extracted_imgs">'+ inc_image +'</div><div class="extracted_imgsmore"><div class="thumb_sel"><span class="prev_thumb" id="thumb_prev">&nbsp;</span><span class="next_thumb" id="thumb_next">&nbsp;</span> </div><span class="small_text" id="total_imgs">'+img_label_pos+' of '+total_label+'</span><span class="small_text">&nbsp;&nbsp;Choose a Thumbnail</span></div></div><div class="extracted_content"><h4 class="extracted_title">'+data.title+'</h4><p class="extracted_description">'+data.description+'</p><div id="alternateinfo"><p class="iconn-alert">If no acceptable images have returned from desired website, use thumbshot generator as an alternative.</p><a href="#" id="generatenew" class="ic-btn ic-btn-sm ic-btn-green floatright">GENERATE THUMBSHOT</a></div></div>';

				
					
					tQuery("#results").html(content); 
					tQuery("#results").slideDown(); 
					tQuery("#loading_indicator").hide(); 

					tQuery("#openonedit").fadeIn(); 



alt_geninfo = '<p class="iconn-alert">Since we could not find any appropriate images on the given url, alternate option - Thumbshots has been activated</p><p class="extracted_generating">Your Link Thumbshot is being generated and refreshed every 2 seconds. Once you see the thumbshot preview, continue with customizing and saving</p>';

tQuery("#generatenew").click(function(){

tQuery("#alternateinfo").html(alt_geninfo);
iThumbInterval = setInterval(function(){getThumbshot(iniurl);},5000);

return false;
});	

					}else{


					var content = '<div class="extracted_url"><div class="extracted_imgs"><div class="extracted_thumb isgenerating iconn-animated fadeIn" id="extracted_thumb"></div><div class="getthumbsh"></div></div></div><div class="extracted_content"><h4 class="extracted_title">'+data.title+'</h4><p class="extracted_description">'+data.description+'</p><div id="alternateinfo"><p class="iconn-alert">Since we could not find any appropriate images on the given url, alternate option - Thumbshots has been activated</p><p class="extracted_generating">Your Link Thumbshot is being generated and refreshed every 2 seconds. Once you see the thumbshot preview, continue with customizing and saving</p></div></div>';

					
					//load results in the element
					tQuery("#results").html(content); 
					tQuery("#results").slideDown(); 
					tQuery("#loading_indicator").hide(); 
					tQuery("#openonedit").fadeIn(); 

iThumbInterval = setInterval(function(){getThumbshot(iniurl);},5000);

	
					}
	}				

var linkObject = new Object();
linkObject.title = data.title;
linkObject.description = data.description;
linkObject.image = tQuery('#extracted_thumb img').attr('src');
linkObject.link = extracted_url;

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
tQuery("input#acttype").val("link");
if((data.title !== '') && (data.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
}
tQuery('input#ltitle').val(data.title);
tQuery('input#ldescription').val(data.description);
                },'json');
		}
return false;
	});




	tQuery("body").on("click","#thumb_prev", function(e){		
		if(img_arr_pos>0) 
		{
			img_arr_pos--; //thmubnail array position decrement
			
			//replace with new thumbnail
			tQuery("#extracted_thumb").html('<img src="'+extracted_images[img_arr_pos]+'" width="200" height="200">');
			
			//show thmubnail position
			tQuery("#total_imgs").html((img_label_pos) +' of '+ total_lbel);


var linkObject = new Object();
linkObject.title = tQuery('input#ltitle').val();
linkObject.description = tQuery('input#ldescription').val();
linkObject.image = tQuery('#extracted_thumb img').attr('src');
linkObject.link = tQuery('#get_url').val();

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
tQuery("input#acttype").val("link");
if((linkObject.title !== '') && (linkObject.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
}
		}
	});
	
	tQuery("body").on("click","#thumb_next", function(e){		
		if(img_arr_pos<total_images)
		{
			img_arr_pos++; //thmubnail array position increment
			
			//replace with new thumbnail
			tQuery("#extracted_thumb").html('<img src="'+extracted_images[img_arr_pos]+'" width="200" height="200">');
			
			//replace thmubnail position text
			tQuery("#total_imgs").html((img_label_pos) +' of '+ total_label);

var linkObject = new Object();
linkObject.title = tQuery('input#ltitle').val();
linkObject.description = tQuery('input#ldescription').val();
linkObject.image = tQuery('#extracted_thumb img').attr('src');
linkObject.link = tQuery('#get_url').val();

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
tQuery("input#acttype").val("link");
if((linkObject.title !== '') && (linkObject.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
}

		}
	});

 

tQuery("input#ltitle").keyup(function() {
var newtitle = tQuery(this).val();

var linkObject = new Object();
linkObject.title = tQuery(newtitle);
linkObject.description = tQuery('input#ldescription').val();
linkObject.image = tQuery('#extracted_thumb img').attr('src');
linkObject.link = tQuery('#get_url').val();

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
if((linkObject.title !== '') && (linkObject.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
}

});



tQuery("input#ldescription").keyup(function() {
var newdescr = tQuery(this).val();

var linkObject = new Object();

var linkObject = new Object();
linkObject.title = tQuery('input#ltitle').val();
linkObject.description = newdescr;
linkObject.image = tQuery('#extracted_thumb img').attr('src');
linkObject.link = tQuery('#get_url').val();

var linkString = JSON.stringify(linkObject);

tQuery("input#actlink").val(linkString);
if((linkObject.title !== '') && (linkObject.description !== '') && (linkObject.image !== '')){
tQuery(".subbtn").removeClass('disabled');
}
});



tQuery('textarea#acttext').keyup(function() {
tQuery('textarea.taggable#acttext').textntags('val', function(text) {

tQuery("input#acttagtext").val(text);

});
if( tQuery(this).val().length > 2 ) { 
tQuery(".subbtn").removeClass('disabled');
}

 });

tQuery('textarea.taggable')
  .bind('tagsAdded.textntags', function (e, addedTagsList) {
 tQuery('textarea.taggable#acttext').textntags('val', function(text) {

tQuery("input#acttagtext").val(text);
});
if( tQuery(this).val().length > 2 ) { 
tQuery(".subbtn").removeClass('disabled');
}
  });





function mapFetcher(){

var mapper = tQuery("#formmapper").formmapper({

          map: ".map_canvas",
          details: "form",
          useViewport: false,
		  location: false,
		  maxZoom: 15,
          markerOptions: {
            draggable: true
          }
        });
        
        tQuery("#formmapper").bind("geocode:dragged", function(event, latLng){
		  tQuery("#formmapper").formmapper("find",latLng.lat()+","+latLng.lng());
		  reloadMap();
        });
   
        tQuery("#ifind").click(function(){
		  tQuery("#formmapper").trigger("geocode");
		  reloadMap();
        }).click();

          tQuery("#formmapper").change(function(){
		  reloadMap();

        });
        
         tQuery("#formmapper").focus(function(){
         
         tQuery(".map-container.noloc").slideDown().show();
         tQuery(".map-container").removeClass('noloc');
        });

         tQuery("#locateme").click(function(){
         
         tQuery(".map-container.noloc").slideDown().show();
         tQuery(".map-container").removeClass('noloc');
        });

         tQuery("#setlocation").mouseover(function(){
         
		  reloadMap();return false;

        });

}



var origloc = tQuery("#setlocation").html();

function reloadMap(){
var map =  tQuery("#formmapper").formmapper("map");
new google.maps.event.trigger(map, 'resize');

}



tQuery("#maptrig").click(function () {
var mapbutton = tQuery(this);

if(mapbutton.hasClass("isclosed")) {

tQuery("#setlocation").slideDown().fadeIn();
tQuery(this).find('i').toggleClass('icicon-map-marker icicon-check');
tQuery(this).toggleClass('isclosed isopen');

} else {
tQuery("#setlocation").slideUp().fadeOut();
tQuery(this).find('i').toggleClass('icicon-map-marker icicon-check');
tQuery(this).toggleClass('isclosed isopen');
}
return false;
});




tagsFetcher();
loaderFetcher();





function dateloader(){

tQuery('#eventstart').datetimepicker({
						prevText: '<i class="icicon-chevron-left"></i>',
						nextText: '<i class="icicon-chevron-right"></i>',				
						beforeShow: function(input, inst) {
								var newclass = 'iconnect-forms'; 
								var smartpikr = inst.dpDiv.parent();
								if (!smartpikr.hasClass('iconnect-forms')){
									inst.dpDiv.wrap('<div class="'+newclass+'"></div>');
								}
						}					
					
					});
					
tQuery('#eventend').datetimepicker({
						prevText: '<i class="icicon-chevron-left"></i>',
						nextText: '<i class="icicon-chevron-right"></i>',				
						beforeShow: function(input, inst) {
								var newclass = 'iconnect-forms'; 
								var smartpikr = inst.dpDiv.parent();
								if (!smartpikr.hasClass('iconnect-forms')){
									inst.dpDiv.wrap('<div class="'+newclass+'"></div>');
								}
						},
onClose:function(e,t){		


var startDate = new Date(tQuery('#eventstart').val());
var endDate = new Date(tQuery('#eventend').val());
var dmsg = 'End date should be greater than the Start date';

if (startDate >= endDate){
tQuery(this).closest('label').addClass('state-error');
showErrorMsg(dmsg);
}
if (startDate < endDate){
tQuery('label.state-error').removeClass('state-error');
}




						}
					});	

}


tQuery('.ipostnow').click(function(){
tQuery("#timeline-act-form .input,#timeline-act-form textarea").val('');
tQuery('textarea.taggable').textntags('reset');


tQuery(".textntags-wrapper").show().css("visibility","visible");


tQuery("#itabs").find("input#icstatusf").prop("checked", true);
tQuery("#searchfilters").fadeToggle('fast');
tQuery("#iconn-stream").slideToggle();
tQuery(this).toggleClass('ic-btn-red');
tQuery(this).find('i').toggleClass('icicon-pencil icicon-remove');

tQuery("button.subbtn").toggleClass("disabled");

remoteFetcher();
mapFetcher();
dateloader();
return false;
});



  function showPosts(){
      if (!posts) return;


var newitem = tQuery(posts);

var $gridd = tQuery('#grid').isotopeMB();
  
$gridd.prepend( newitem ).fadeIn().isotopeMB( 'insert', newitem );

$gridd.isotopeMB({
  sortBy: '[data-streamid] parseInt',
  sortAscending: false
});


resetIform();
resetIbuttons();

  };





  function grabPost() {
var idata = [];
idata[0] = tQuery("#timeline-act-form").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
idata[1] = tQuery("#ic-event").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '');
idata[2] = tQuery("#ic-upload").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, ''); 


var postData = idata.join('&');console.log(postData);


        tQuery.ajax({ 
            type: "POST",
            url: 'http://qeneqt.us/index.php?option=com_iconnect&view=ajaxcall&layout=homeact&tmpl=tigraajax',
            data: postData,    
       dataType: "html",
            cache: false,   
            error: function(html){console.log(html);},
            success: function(html){
              posts = tQuery(html);
   tQuery("#iconn-stream").slideToggle();
tQuery("#searchfilters").fadeToggle();
tQuery('.ipostnow').toggleClass('ic-btn-red');
tQuery('.ipostnow').find('i').toggleClass('icicon-pencil icicon-remove');
          },
          error : function (edata) {
              
          }
      }).then( function(){
setTimeout(
  function() 
  {        
tQuery("#iloadr").fadeOut();
showPosts();  }, 500);



      });
  }





function resetIform(){
tQuery("#timeline-act-form .input,#timeline-act-form textarea").val('');
tQuery("#ic-upload .input,#ic-upload select").val('');
tQuery("#ic-event .input,#ic-event select").val('');
tQuery('textarea.taggable').textntags('reset');
tQuery(".textntags-beautifier").find("div").empty();

tQuery("#timeline-act-form textarea.taggable").css("min-height","18px");
tQuery("#timeline-act-form .textntags-beautifier>div").css("min-height","18px");
tQuery("#timeline-act-form .textntags-wrapper").show().css("visibility","visible");

tQuery("#iloaderviduploads").removeClass('dz-complete');


tQuery("#setlocation").html(origloc);

tQuery("#setlocation").hide();
tQuery("#setprice").hide();
tQuery("#maptrig").removeClass('isopen isclosed').addClass('isclosed');
tQuery("#maptrig").find('i').removeClass('icicon-map-marker icicon-check').addClass('icicon-map-marker');




tQuery(".statusshareacl").select2("val", "f0");
tQuery("#itabs").find("input:radio").prop("checked", false).end();


tQuery("#actLink input#get_url").val('');
tQuery("#actLink #results").html('').fadeOut();
tQuery("#actLink").find("input#ltitle").val('');
tQuery("#actLink").find("input#ldescription").val('');

tQuery("#actVid").find("input#target_url_input").val('').attr('disabled', false);
tQuery("#actVid").find(".urldata_meta_result").remove();
tQuery("#actVid").find("#vidDataTextarea").remove();

tQuery("#actVid .urldata_title").text('');
tQuery("#actVid .urldata_description").text('');
tQuery('#actVid .urldata_thumbnail').attr('src','');
tQuery("#actVid #target_url_input").val('');
tQuery("input#locvidname").val('');
tQuery("input#locviddesc").val('');
tQuery("input#localvideo").remove();

tQuery("input#actvideo").val('');
tQuery("input#actphoto").val('');
tQuery("input#actphotos").val('');
tQuery("input#actlocvideo").val('');
tQuery("input#actupload").val('');
tQuery("input#actmusic").val('');
tQuery("input#actlink").val('');


tQuery('input[id^="iphoto"]').remove();
tQuery('input[id^="ithumb"]').remove();

tQuery('input#icover').remove();
tQuery('input#eventcover').remove();
tQuery('input#eventthumb').remove();

tQuery("input#imusictitle").val('');
tQuery("input#imusicauthor").val('');
tQuery("input#accessfee").val('0');
tQuery("input#accesspaid").val('0');
tQuery("input#accesspreview").val('');
tQuery("input#acttype").val('status');

tQuery("input#acttagtext").val('');

tQuery("input#creatorid").val('1004');

tQuery(".ip-preview").empty();
tQuery("#paction img").remove();
tQuery("#paction").hide();	
tQuery("#pixform").show();


tQuery("button.subbtn").addClass("disabled");


remoteFetcher();
mapFetcher();

tQuery("#itabs").find("input#icstatusf").prop("checked", true);

}

tQuery('.ireset').click(resetIform);


tQuery('.ic-scrollbar').scrollbar({ignoreMobile:false});

tQuery('.select2-results').scrollbar({ignoreMobile:false});


function resetIbuttons(){

tQuery(".icomments").off('click',Comhandler);
tQuery(".icomments").on('click',Comhandler);

tQuery(".ishares").off('click',Sharehandler);
tQuery(".ishares").on('click',Sharehandler);

tQuery(".ilikes").off('click',ilikeActbtn);
tQuery(".ilikes").on('click',ilikeActbtn);

tQuery(".ifollows").off('click',ifollow);
tQuery(".ifollows").on('click',ifollow);

tQuery(".ifavorites").off('click',ifavorites);
tQuery(".ifavorites").on('click',ifavorites);

tQuery(".icfriends").off('click',ifriends);
tQuery(".icfriends").on('click',ifriends);

tQuery(".imessage").off('click',sendPM);
tQuery(".imessage").on('click',sendPM);

tQuery(".icaddcircle").off('click',addtoCircles);
tQuery(".icaddcircle").on('click',addtoCircles);

tQuery(".ipins").off('click',addtoBoards);
tQuery(".ipins").on('click',addtoBoards);


tQuery(".action-opts").off('click',altAct);
tQuery(".action-opts").on('click',altAct);

tQuery(".xtd-delact").off('click',delAct);
tQuery(".xtd-delact").on('click',delAct);



tQuery(".icFromManager").off('click',removefromImanager);
tQuery(".icFromManager").on('click',removefromImanager);

tQuery(".icToManager").off('click',sendtoImanager);
tQuery(".icToManager").on('click',sendtoImanager);

tQuery(".icPayDownload").off('click',payForFile);
tQuery(".icPayDownload").on('click',payForFile);




tQuery(".inamelink").off('click',userInameTag);
tQuery(".inamelink").on('click',userInameTag);

tQuery("a[rel^='prettyPhoto']").prettyPhoto({social_tools: false});

}
});