if( typeof Object.create !== 'function'){
	Object.create = function( obj ){
		function F(){};
		F.prototype = obj;
		return new F();
	};
}

$.fn.urlData = {};
$.fn.urlData.path;

(function( $, window, document, undefined ){
	
	var URL_Data = {
		init: function( options, el ){
			var self = this;
			self.elem = el;
			self.$elem = $( el );

			$.fn.urlData.path = ($.fn.urlData.path == undefined) ? '' : $.fn.urlData.path;

			self.options = $.extend( {}, $.fn.urlData.options, options );

			if( self.options.previewLink === false )
				self.build();
			else
				self.buildPreview();
		},
		
		build: function(){

			var self = this;

			self.$elem.addClass( "urldata_data_parser" );
			self.$elem.width( self.options.width );

			self.inputURL 	 	= $( self.template.input );
			self.inputURL.attr( "placeholder", self.options.placeholder );

			self.buttonParse 	= $( self.template.button );
			self.buttonParse.val( self.options.buttonText );			

			self.inputHolder 		= $( self.template.inputHolder );

			self.inputURL.appendTo( self.inputHolder );
			self.inputURL.focus(function(){ $(this).select(); });
			
			self.buttonParse.appendTo( self.$elem );
			self.inputHolder.appendTo( self.$elem );

			self.buttonParse.on("click", function(evt){

				if(self.viewport != undefined)
					self.viewport.slideUp("normal", function(){ $(this).remove(); });

				self.URL = self.inputURL.val();
				self.parseURL(evt);

			});
		},

		buildPreview: function(){

			var self = this;

			self.$elem.hover(
				function(evt){
					self.loadTimer = setTimeout(function(){ self.loadPreview(evt); }, self.options.hoverTime);
				},
				function(evt){
					clearTimeout(self.loadTimer);
				});
		},

		loadPreview: function(evt){

			var self = this;

			o = self.getElementOffset();

			if(self.previewContainer == undefined)
			{
				
				if( self.$elem.attr("data-urldata-load") == undefined ){

					self.URL = ( self.options.previewURL === null ? self.$elem.attr("href") : self.options.previewURL );

					if(self.URL == undefined)
					{
						console.log("Please insert href on Anchor tag or URL set to previewURL option.");
						return false;	
					}
					
					self.parseURL(evt);
					self.$elem.attr("data-urldata-load", true);

					self.loading = $(self.template.loading);
					self.loading.appendTo("body");
					self.loading.css({left: o.l + o.w + 5, top: o.t + ((o.h - self.loading.height()) / 2)});
					self.loading.fadeIn();
				}
				
				$(".urldata_preview_container[data-show]").removeAttr("data-show").fadeOut();
				return true;
			}
			
			if( self.previewContainer.attr("data-show") == "true" )
				return true;
			
			
			$(".urldata_preview_container[data-show]").removeAttr("data-show").fadeOut();
			self.previewContainer.attr("data-show", true).stop(true, true).fadeIn();
			self.setPositionToElem(self.previewContainer);
			return true;
		},

		prepare: function(isThumbnail){
			var self = this;

			self.viewport = $(self.template.viewport);

			if(isThumbnail)
			{
				self.thumbnail = $(self.template.thumbnail);
				self.thumbnail.appendTo( self.viewport );
			} else {
var vurl = self.URL;


    var yid = vurl.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
        'http://i.ytimg.com/vi/$1/0.jpg');


thumbnail = yid;

self.thumbnail = $('<div class="urldata_thumbnail"><img src="'+thumbnail+'" style="display:block"/></div>');
self.thumbnail.appendTo( self.viewport );


}




			self.section 		= $(self.template.section);

			self.title 			= $(self.template.title);
			self.description 	= $(self.template.description);
			self.site_name 		= $(self.template.site_name);

			self.title.appendTo( self.section );
			self.description.appendTo( self.section );
			self.site_name.appendTo( self.section );

			self.section.appendTo( self.viewport );
			self.viewport.appendTo( self.$elem );
		},

		setData: function( d ){
			var self = this;
			self.data = d;

			self.prepare( d.image.length );

			self.title.html( d.title );
			self.description.html( d.description );
			self.site_name.html( d.site_name );

			if(self.options.previewLink === false )
			{
				self.title.on("click", function(evt){ self.titleEditable( evt ); });
				self.description.on("click", function(evt){ self.descriptionEditable( evt ); });
			}			

			if(d.image.length)
			{
				self.setImages( d.image );

				var mainImage = self.thumbnail.find("img:eq(" + self.currentImg + ")");
				var mainSource = mainImage.attr("src");				

				mainImage.load(function(){					
					$(this).fadeIn();
					self.enableControl();
				});

			}
			else
			{

var vurl = self.URL;

    var yid = vurl.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
        'http://i.ytimg.com/vi/$1/0.jpg');

d.image = yid;
self.setImages( d.image );

self.thumbnail = $('<div class="urldata_thumbnail"><img src="'+thumbnail+'" style="display:block"/></div>');
				var mainImage = self.thumbnail.find("img:eq(" + self.currentImg + ")");
				var mainSource = mainImage.attr("src");				

				mainImage.load(function(){					
					$(this).fadeIn();
					self.enableControl();
				});


			}	
			
			if( self.options.previewLink === false )
				self.viewport.slideDown();
			else
			{
				self.collectData();
				self.viewport.remove();
			}

		},

		parseURL: function( evt ){

			var self = this;

			if( ! self.isValidURL( self.URL ) )
			{
				console.log("Invalid URL. Please check URL!");
				return false;
			}

			self.disableControl();

			if( self.inputHolder != undefined )
			{
				self.loading = $( self.template.loading );
				self.loading.appendTo( self.inputHolder );
				self.loading.css({ top: parseInt(self.inputHolder.height() - self.loading.height())/2 }).fadeIn("fast");	
			}
			
			self.parser( self.URL ).done( function( data, status){

				if( data.title != undefined )
				{
					/*console.log( "DONE!" );*/
					self.setData( data );
					return true;
				}
				else
				{
					/*console.log( "DONE! Data failed!" );*/
					self.enableControl( false );
					return false;
				}

			}).fail(function(status, errorThrown){

				console.log( "FAIL!" + errorThrown );
				self.enableControl( false );
				return false;

			});
			
		},

		parser: function(){
			var self = this;

			return $.post($.fn.urlData.path + self.options.parserURL, { 
				url: self.URL, 
				minThumb: self.options.minThumbSize,
				thumbCount: self.options.thumbCount,
				execTime: self.options.executionTime 
			}, function( data ){}, "json");

		},

		disableControl: function(){
			var self = this;

			if(self.options.previewLink === false)
			{
				self.buttonParse.prop("disabled", true);
				self.inputURL.prop("disabled", true);
			}
		},

		enableControl: function( isSuccess ){
			var self = this;

			isSuccess = (isSuccess == undefined) ? true : isSuccess;

			if(isSuccess === true)
				self.collectData();
			else
			{
				if(self.options.previewLink !== false)
					self.$elem.removeAttr("data-urldata-load");
			}

			if(self.options.previewLink === false)
			{
				self.buttonParse.prop("disabled", false);
				self.inputURL.prop("disabled", false);
			}

			self.loading.remove();
		},

		setImages: function( data_image ){
			var self = this;

			self.currentImg = 0;

			if(typeof data_image == "string")
			{
				self.addThumbnail( data_image );
			}							
			else
			{
				
				if( data_image.length > 1 )
				{
					self.thumbNav  = $( self.template.thumbChooser );
					self.thumbPrev = self.thumbNav.find(".urldata-prev");
					self.thumbNext = self.thumbNav.find(".urldata-next");

					self.thumbNav.appendTo( self.thumbnail ).fadeIn();

					self.currentImg = data_image.length - 1;

					self.thumbPrev.bind("click", function(evt){						
						evt.preventDefault();

						if(self.currentImg == data_image.length - 1)
							return false;

						self.thumbnail.find("img:eq(" + self.currentImg + ")").fadeOut();
						self.thumbnail.find("img:eq(" + ( ++self.currentImg ) + ")").fadeIn("normal", function(){

							self.collectData();

						});

					});

					self.thumbNext.bind("click", function(evt){
						evt.preventDefault();
						
						if(self.currentImg == 0)
							return false;

						self.thumbnail.find("img:eq(" + self.currentImg + ")").fadeOut();
						self.thumbnail.find("img:eq(" + ( --self.currentImg ) + ")").fadeIn("normal", function(){

							self.collectData();

						});
					});
				}

				$.each( data_image , function(key, val){
					
					self.addThumbnail( val );

				});
			}
		},

		titleEditable: function(evt)
		{

			var self = this;

			if( self.title.find("input").length > 0)
				return false;

			titleEditor 	= $( self.template.titleEditor );
			currentTitle  	= self.title.html();

			self.title.html( titleEditor );

			titleEditor.val( currentTitle ).focus();			
			titleEditor.on("keypress", function( event ) {

				if(event.keyCode == 13 || event.keyCode == 27)
				{
					self.title.html( titleEditor.val() );
					titleEditor.off("keypress");

					self.collectData();
				}

			}).blur(function(){

				self.title.html( titleEditor.val() );
				titleEditor.off("keypress");

				self.collectData();
				
			});
		},

		descriptionEditable: function(evt)
		{
			var self = this;

			if( self.description.find("textarea").length > 0)
				return false;

			self.description.wrapInner( self.template.descriptionEditor );

			description = self.description.find("textarea");
			var browser = window.navigator.userAgent.toLowerCase();

			if (browser.indexOf("firefox") > 0) {
				if ( parseInt(description.attr('rows')) > 1 ) 
					description.attr('rows', ( parseInt( description.attr('rows') ) - 1 ));
			}

			description.focus().on("keypress", function( event ) {

				if(event.keyCode == 13 || event.keyCode == 27)
				{
					self.description.html( description.val() ).scrollTop(0);
					description.off("keypress");

					self.collectData();
				}

			}).blur(function(){

				self.description.html( description.val() ).scrollTop(0);
				description.off("keypress");

				self.collectData();
				
			});

		},

		addThumbnail: function (imgURL)
		{
			var self = this;
			image = $("<img>");

			safeImageURL =  imgURL;


			var counter = 1;
			timer = setInterval(function(){ 

				if(image.attr("data-loaded") != "true"){
					/*console.log("Retry: " + (counter++) +" | "+ safeImageURL);*/
					image.attr("src", safeImageURL + "&refresh=" + Math.random() );
				}
				else
					clearInterval(timer);
			}, 5000);

			image.load(function(){
				image.attr("data-loaded", "true");
			}).error(function(){
				/*console.log("Reload: "+ safeImageURL);*/
				image.attr("src", safeImageURL + "&refresh=" + Math.random() );
			});

			image.prop("src", safeImageURL);
			image.prependTo( self.thumbnail );
		},

		isValidURL: function (url){
		
				return true;
		},

		collectData: function(){

			var self = this;

			temp = self.viewport.clone();

			if( self.data.video )
			{
				thumbnail = temp.find(".urldata_thumbnail");
				thumbnail.addClass("urldata_video_play");
				thumbnail.attr("data-video", self.data.video);
				thumbnail.attr("data-video-type", self.data["video:type"]);
				thumbnail.attr("data-video-width", self.data["video:width"]);
				thumbnail.attr("data-video-height", self.data["video:height"]);
			}

			if( self.data["image:width"] || self.data["image:height"] )
			{
				thumbnail = temp.find(".urldata_thumbnail");
				thumbnail.addClass("urldata_image_show");
				thumbnail.attr("data-image", self.data.image);
				thumbnail.attr("data-image-width", self.data["image:width"]);
				thumbnail.attr("data-image-height", self.data["image:height"]);
			}

			temp.find("img:not(:eq("+ self.currentImg +"))").remove();
			temp.find("img").removeAttr("style");
			temp.find("span.urldata_thumb_selector").remove();
			
			temp.wrapInner( self.template.anchor );
			temp.find("a").prop("href", self.URL);			

			if(self.options.containerAnchorClass !== null)
				temp.find("a").addClass(self.options.containerAnchorClass);

			if( self.options.previewLink === false )
			{
				if(self.collectedData == undefined)
				{
					self.collectedData = $(self.template.collected);
					self.collectedData.attr("name", self.options.name);
					self.collectedData.attr("id", self.options.name);
					self.collectedData.appendTo(self.$elem);
				}
				self.collectedData.val( temp.html() );
			}
			else
			{
				if(self.previewContainer == undefined)					
				{
					self.previewContainer = $( self.template.previewContainer );
					self.previewContainer.appendTo("body");					
				}
				
				self.previewContainer.html( temp.html() );
				self.previewContainer.find("img").fadeIn();
				closeBtn = $(self.template.previewClose);
				closeBtn.on("click", function (){ self.previewContainer.removeAttr("data-show").fadeOut(); });				
				closeBtn.appendTo(self.previewContainer);

				self.previewContainer.addClass("urldata_preview_shadow");
				self.previewContainer.fadeIn();				
				self.previewContainer.find("a.urldata_finally_data").urlView({ width:  self.options.width });
				self.setPositionToElem(self.previewContainer);
				self.loading.remove();
			}

			self.options.onComplete( temp.html() );
		},

		getElementOffset: function(){
			var self = this, o = [];
			o.w = self.elem.offsetWidth;
			o.h = self.elem.offsetHeight;
			o.l = self.$elem.offset().left;
			o.t = self.$elem.offset().top;
			return o;
		},

		setPositionToElem: function(e){
			var self = this;

			o = self.getElementOffset();
			height = e.get(0).offsetHeight;
			width = e.get(0).offsetWidth;
			wWidth = $(window).width();

			switch(self.options.alignment.toLowerCase())
			{
				
				case 'tl': 
					left = o.l;
					e.addClass('topleftpreview');
					break;
				case 'tr':
					left = (o.l + o.w) - width;
					left = (left <= 0)? 5 : left;

					e.css({left: left, top: o.t - (height + 2) });
					break;
				case 'br':
					left = (o.l + o.w) - width;
					left = (left <= 0)? 5 : left;

					e.css({left: left, top: o.t + o.h + 2 });
					break;						
				default:
					left = o.l;
					left = (left + width >= wWidth) ? wWidth - width - 25 : left;
					e.css({left: left, top: o.t + o.h + 2 });
					break;
			}
		},

		template:{
			input: 				'<input type="text" id="target_url_input">',
			button:     		'<input type="button" id="urldata_parse_button">',
			inputHolder:  		'<div class="urldata_parse_txt"></div>',
			viewport: 			'<div class="urldata_meta_result"></div>',
			thumbnail: 			'<div class="urldata_thumbnail"></div>',
			section: 			'<section class="urldata_info_section"></section>',
			title: 				'<div class="urldata_title"></div>',
			description: 		'<p class="urldata_description"></p>',
			site_name: 			'<div class="urldata_site_name"></div>',
			thumbChooser:   	'<span class="urldata_thumb_selector"><a href="#" class="urldata-prev">&lsaquo;</a><a href="#" class="urldata-next">&rsaquo;</a></span>',
			titleEditor: 		'<input type="text" name="urldata_title_input" id="urldata_title_input" class="gui-input"/>',
			descriptionEditor: 	'<textarea class="gui-input" id="urldata_description_textarea" ></textarea>',
			loading: 			'<span class="urldata_url_loading"></span>',
			anchor: 			'<a href="#" class="urldata_finally_data"></a>',
			collected: 			'<textarea class="final_data_container" cols="60" rows="10"></textarea>',
			previewContainer: 	'<div class="urldata_preview_container" data-show="true"></div>',
			previewClose: 		'<i class="urldata_preview_x">&times;</i>'
		}

	};

	var URL_View = {
		init: function( options, el ){
			var self = this;
			self.elem = el;
			self.$elem = $( el );

			self.options = $.extend( {}, $.fn.urlView.options, options );
			self.$elem.css("width", self.options.width);
			self.$elem.attr("target", self.options.target);
			self.build();
		},

		build: function(){
			var self = this;

			if(self.$elem.find(".urldata_thumbnail"))
			{
				self.thumbnail 	= self.$elem.find(".urldata_thumbnail");
				self.image 		= self.thumbnail.find("img");
				self.imageURL   = self.image.attr("src");
			}

			if( self.image != undefined)
				self.showProcess();
		},

		showProcess: function()
		{
			var self = this;

			self.loading = $('<span class="urldata_url_loading"></span>');
			self.loading.appendTo( self.thumbnail );
			self.loading.css({
				left: parseInt(( self.thumbnail.width()  - self.loading.width())  / 2),
				top:  parseInt(( self.thumbnail.height() - self.loading.height()) / 2),
				zIndex: self.thumbnail.children().length + 1
			});

			self.loading.show();
			var counter = 1;
			self.timer = setInterval(function(){ 
				if(self.image.attr("data-loaded") != "true"){
					/*console.log("Retry... " + (counter++) );*/
					self.image.attr("src", self.imageURL + "&refresh=" + Math.random() );
				}
				else
				{
					clearInterval(self.timer);
				}
			}, 5000);

			self.image.load(function(){

				/*console.log("LOADED!");*/
				clearInterval(self.timer);
				self.image.fadeIn("normal", function(){

					if( self.thumbnail.hasClass("urldata_video_play") )
						self.setThumbIcon("play");

					if( self.thumbnail.hasClass("urldata_image_show") )
						self.setThumbIcon("zoom");

					self.loading.hide();
					self.image.attr("data-loaded", "true");
					self.image.off("load");
					
				});

			}).error(function(){
				/*console.log("Retry...");*/
				self.image.attr("src", self.imageURL + "&refresh=" + Math.random() );
			});
		},

		doShow: function( ){
			var self = this;

			self.thumbnail.one("click", function(evt){

				evt.preventDefault();
				self.icon.hide();


				if( self.options.btnLongShadow === true)
					self.shadow.hide();

				if( self.thumbnail.hasClass("urldata_video_play") )
				{
					self.playVideo( evt );
				}

				if( self.thumbnail.hasClass("urldata_image_show") )
				{
					self.loading.show();
					self.showImage( evt );
				}
			});
		},

		playVideo: function(evt){
			var self = this;

			self.thumbnail.animate({"width": 0}, 300, function(){

				self.thumbnail.hide();
				self.image.hide();

				precent = self.thumbnail.parent().width() / self.thumbnail.data("video-width");

				embed = $('<embed bgcolor="#bdc3c7">');

				embed.attr("src", self.thumbnail.data("video"));
				embed.attr("width", self.thumbnail.parent().width());
				embed.attr("height", parseInt( self.thumbnail.data("video-height") * precent ));

				self.thumbnail.css("height", parseInt( self.thumbnail.data("video-height") * precent ));
				self.thumbnail.append(embed);

				self.thumbnail.css({
					"clear": "both",
					"width": "100%"
				}).slideDown();
			});
		},

		showImage: function(evt){
			var self = this;

			var tmpImg = new Image();
			tmpImg.onload = function(){

				self.loading.remove();

				self.thumbnail.animate({"width": 0}, 300, function(){

					self.thumbnail.hide();
					
					precent = self.thumbnail.parent().width() / self.thumbnail.data("image-width");

					self.image.attr("src", self.thumbnail.data("image"));
					self.image.attr("width", self.thumbnail.parent().width());
					self.image.attr("height", parseInt(self.thumbnail.data("image-height")*precent));

					self.thumbnail.css("height",  parseInt(self.thumbnail.data("image-height")*precent));
					self.thumbnail.css({
						"clear": "both",
						"width": "100%"
					}).slideDown("normal", function(){
						$(tmpImg).remove();
					});
				});
			};

			tmpImg.src = self.thumbnail.data("image");
		},

		setThumbIcon: function(type){
			var self = this;

			self.icon  = $("<i>");

			if(type == "play")
				self.icon.addClass("urldata_icon_play");

			if(type == "zoom")
				self.icon.addClass("urldata_icon_zoom");

			self.icon.appendTo( self.thumbnail );

			l = parseInt((self.thumbnail.width() - self.icon.width()) / 2);
			t = parseInt((self.thumbnail.height() - self.icon.height()) / 2);

			self.icon.css({ left: l, top: t });

			self.icon.fadeIn();
			self.doShow();

			if(self.options.btnLongShadow === true)
			{
				self.shadow = $('<i class="urldata_icon_shadow">');
				self.shadow.css({ left: l, top: t});
				self.shadow.appendTo(self.thumbnail);
				self.shadow.fadeIn();
			}
		}
	};
	
	$.fn.urlData = function( options ){
		return this.each(function(){
			var _url_data = Object.create( URL_Data );
			_url_data.init( options, this );
		});
	};
	
	$.fn.urlData.options = {
		parserURL: "index.php?option=com_iconnect&view=ajaxcall&layout=get_data&tmpl=tigraajax",
		safeImageURL: "index.php?option=com_iconnect&view=ajaxcall&layout=safe_image&tmpl=tigraajax",		
		buttonText: "Parse",
		placeholder: "Enter a valid URL",
		name: 'urldata_meta_data',
		width: 'auto',
		thumbSize: 150,
		minThumbSize: 150,
		thumbCount: 5,
		executionTime: 30,
		containerAnchorClass: null,
		previewLink: false,
		previewURL: null,
		hoverTime: 500, 
		alignment: "tl",
		onComplete: function( data ){ return true; }
	};

	$.fn.urlView = function( options ){
		return this.each(function(){
			var _url_view = Object.create( URL_View );
			_url_view.init( options, this );
		});
	};

	$.fn.urlView.options = {
		width: 'auto',
		target: "_blank",
		btnLongShadow: false
	};

})(tQuery, window, document);