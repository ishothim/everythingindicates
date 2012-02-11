$(document).ready(function(){
	
	
	
	// gets base URL of site as set by wordpress
	var base = $('h1#logo a').attr('href');
	
	// gets the title of site as set by wordpress
	var title = $('h1#logo a').attr('title');
	
	var setUrl = false;
	
	// tests if browser history pushstates are supported in browser
	function isSupportedBrowserHistory() {
        return !!(window.history && history.pushState);
    }
	
	
	function resizeOverlay(){
		var browserheight = window.innerHeight ? window.innerHeight : $(window).height()
		$('.page-light-box').css('height', browserheight);
	}
	
	/*(function ($) {
		$.fn.resizeLightBox = function() {
			return this.each(function(i){
				var browserheight = $(window).height();
				$(this).height(browserheight);
			});
		};
	})(jQuery);
	*/
	// history back or forward buttons pressed/activated in browser
	function popStateHandler(event) {
		
		//prevents default action of back/forward button
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		
		// tests for existing history state
        if(event.state != null) {
			
			// initial URL entry is checked for hash tags and runs appropriate function
         	if (location.hash) {
				hashScroll();
			} else {
				noHashScroll();
			}	
        }
    }

	//runs if url has hash
	function hashScroll() {
		//gets current URL
		var current = location.protocol + '//' + location.hostname + location.pathname;
		
		// gets hashed portion of current URL
		var diff = location.hash;
		
		// replaces the # hashtag from URL with /
		var noHash = diff.replace('#', '');
		
		// sets the history pushstate to new / slash URL without hash and a description
		history.pushState(noHash, title + ' - ' + noHash, noHash);
		
		//creates variable with hash to detech related anchor's offset
		var thisAnchor = noHash.replace(noHash, "#"+noHash);
		
		//removes any / shashes from URL
		var newAnchor = thisAnchor.replace('/', '');
		
		// gets related anchor's offset from top
		var destination = $(newAnchor).offset().top;
		
		//scrolls to anchor minus height of header
		$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 500 );
		if ($(newAnchor).hasClass('.page-light-box') ) {
			
			$(this).addClass('active');
		} else {
			
		};
		return false;
	}
	
	// URL does not have a # hash tag
	function noHashScroll() {
		
		//sets current URL
		var current = location.protocol + '//' + location.hostname + location.pathname;
		
		// test to see if you are on homepage of site
		if (base != current) {
			
			// gets the URL minus the homepage URL (the difference)
			var diff = current.replace(base, '');
			
			// adds # hash tag to URL
			var thisAnchor = diff.replace(diff, '#'+diff);
			
			// removes any / shashes from URL
			var newAnchor = thisAnchor.replace('/', '');
				
			if ($(newAnchor).hasClass('page-light-box') ) {
				
				$(newAnchor).addClass('active');
			} else {
				
			};
			
			// sets the related anchor's offset distance
			var destination = $(newAnchor).offset().top;
			
			// scrolls to related anchor
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 500 );;
			
		} else {
			// scrolls to top of home page
			$("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0}, 500 );
		}
		return false;
	}
	
	
	// initializes history push states and adds an inital state onto the stack
	function init() {
		
				
		// checks to see if history.pushState is supported in browser
        historySupported = isSupportedBrowserHistory();
		
		// gets current URL
		var current = location.protocol + '//' + location.hostname + location.pathname;
		
		// assigns popStateHandler to deal with forward / back request         
        window.onpopstate = popStateHandler;
		
		// if Browser History is supported replace URLs on clicks and loads	
        if(historySupported) { 
						
			// initial URL entry is checked for hash tags.
			if (location.hash) { 
				hashScroll();						
			} else {
				noHashScroll();	
			}
			
			/*** table of contents (toggle slide in-out)    ***/
		    $(".table-of-contents a").click(function(event){
				
				$("#table-of-contents").ontouchmove = function(e) {
				    e.stopPropagation();
				};
				
				
				//$('#primary').css('overflow', 'hidden');
				
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				// gets clicked link's URL
				var thisAnchor = $(this).attr('href'); 

				// replaces URL's hashtag with / slash
				var thisUrl = thisAnchor.replace('#', '/');

				//sets a more readable name for browser history display
				var thisName = thisUrl.replace('/', '');

				// sets the history pushstate to new / slash URL with description
				history.pushState(thisUrl, title + ' - ' + thisName, thisUrl);
				
				$('#menu-primary li a').removeClass('current');
				$('.table-of-contents a').addClass('current'); 
				$(".page-light-box").removeClass("active");    
		        $(".table-of-contents.page-light-box").toggleClass("active");
				
				//if( navigator.userAgent.match(/iPad/i)){
				//	$("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0}, 500 );
				//}   

		    });

			/*** bios (toggle slide in-out)    ***/
		    $(".bios a").click(function(event){
				
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				// gets clicked link's URL
				var thisAnchor = $(this).attr('href'); 

				// replaces URL's hashtag with / slash
				var thisUrl = thisAnchor.replace('#', '/');

				//sets a more readable name for browser history display
				var thisName = thisUrl.replace('/', '');
			
				// sets the history pushstate to new / slash URL with description
				history.pushState(thisUrl, title + ' - ' + thisName, thisUrl);
				$('#menu-primary li a').removeClass('current');
				$('.bios a').addClass('current');
				$(".page-light-box").removeClass("active");    
		        $(".bios.page-light-box").toggleClass("active");     
		    });

			/*** gallery (toggle slide in-out)    ***/
		    $(".gallery a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				// gets clicked link's URL
				var thisAnchor = $(this).attr('href'); 

				// replaces URL's hashtag with / slash
				var thisUrl = thisAnchor.replace('#', '/');

				//sets a more readable name for browser history display
				var thisName = thisUrl.replace('/', '');
			
				// sets the history pushstate to new / slash URL with description
				history.pushState(thisUrl, title + ' - ' + thisName, thisUrl);
				$('#menu-primary li a').removeClass('current');
				$('.gallery a').addClass('current');
				$(".page-light-box").removeClass("active");    
		        $(".gallery.page-light-box").toggleClass("active");     
		    });

			/*** home (toggle slide in of lightBox)    ***/
		    $("li.home a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				// gets clicked link's URL
				var thisAnchor = $(this).attr('href'); 

				// replaces URL's hashtag with / slash
				var thisUrl = thisAnchor.replace('#', '/');

				//sets a more readable name for browser history display
				var thisName = thisUrl.replace('/', '');
			
				// sets the history pushstate to new / slash URL with description
				history.pushState(thisUrl, title + ' - ' + thisName, thisUrl);
				$('#menu-primary li a').removeClass('current');
				$('.home a').addClass('current');
				$(".page-light-box").removeClass("active");
				// scrolls to anchors offset
				$('html, body').animate({scrollTop:0}, 700);    

		    });
			
			
			// runs when window is loaded
			$(window).load(function(){
				
				// prevents default action
				event.preventDefault ? event.preventDefault() : event.returnValue = false;
				
				// gets current URL
				var current = location.protocol + '//' + location.hostname + location.pathname;
				
				// test to see if you are on homepage of site
	            if (base != current) {
		
					// replaces initial state on stack with current URL 
					history.replaceState('start', current, '');
					
					// initial URL entry is checked for hash tags.
					if (location.hash) {
						
						hashScroll();
												
					} else {
						
						noHashScroll();
						
					}
					
					// 404 page not found error handling
					if ($('body').hasClass('error404')) {
						
						// changes URL to site homepage URL
						history.pushState(base, title, base);
						
						// creates a new div with 404 messaging
						var $newdiv1 = $('<div id="404message"><div class="">close (x)</div>The URL you requested does not exist.  Use the menu on the left to navigate this single page site.</div>');
						
						// adds 404 div into the content section
						$('#content').append($newdiv1);
						
					}
	
	            } else {
		 			
					// replaces state on stack with homepage URL 
					history.replaceState('start', title, '');
				}
				
				$(window).scroll(function () {
					$('.poem').each(function (i) {
						
						var poemId = $(this).attr('id');
						var newhash = '#'+poemId;
						var newOffset = $(newhash).offset().top;
						var scrollDistance = $(window).scrollTop();

						if ((newOffset <= scrollDistance + 300 ) && (scrollDistance - newOffset < 0) ) {			
							// make note of what poem is inview
							var setUrl = $(this).attr('id');
							
							if (setUrl != setUrl2) {
								// replaces URL's hashtag with / slash
								var thisUrl = newhash.replace('#', '/');

								//sets a more readable name for browser history display
								var thisName = thisUrl.replace('/', '');

								// sets the history pushstate to new / slash URL with description
								history.pushState(thisUrl, title + ' - ' + thisName, thisUrl);
								var setUrl2 = $(this).attr('id');
							} else {
							}
						
							
						}
					
					});
				})
			});
           
        // fallback if history state isn't supported
 		// creates hash tag URLs
   		// preventingDefault will stop the hashed URL from being added when link is clicked
		// location.hash will set the URL to a hashed location after scrollTop completes
		// because the scrollTop uses and offset and location.hash jumps to anchor you will see a glitch at the end of the animation
		// trying to work on relocating anchor to be absolutely positioned to compensate
		
        } else {	
	
	
			/*** table of contents (toggle slide in-out)    ***/
		    $(".table-of-contents a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;

				var newAnchor = $(this).attr('href');
				window.location = (base + newAnchor);
				$('#menu-primary li a').removeClass('current');
				$('.table-of-contents a').addClass('current'); 
				$(".page-light-box").removeClass("active");    
		        $(".table-of-contents.page-light-box").toggleClass("active");     
		    });
		
			/*** bios (toggle slide in-out)    ***/
		    $(".bios a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;

				var newAnchor = $(this).attr('href');
				window.location = (base + newAnchor);
				$('#menu-primary li a').removeClass('current');
				$('.bios a').addClass('current');
				$(".page-light-box").removeClass("active");    
		        $(".bios.page-light-box").toggleClass("active");     
		    });
		
			/*** gallery (toggle slide in-out)    ***/
		    $(".gallery a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;

				var newAnchor = $(this).attr('href');
				window.location = (base + newAnchor);
				$('#menu-primary li a').removeClass('current');
				$('.gallery a').addClass('current');
				$(".page-light-box").removeClass("active");    
		        $(".gallery.page-light-box").toggleClass("active");     
		    });
		
			/*** home (toggle slide in of lightBox)    ***/
		    $("li.home a").click(function(event){
				// prevents browser from going to URL
				event.preventDefault ? event.preventDefault() : event.returnValue = false;

				var newAnchor = $(this).attr('href');
				window.location = (base + newAnchor);
				$('#menu-primary li a').removeClass('current');
				$('.home a').addClass('current');
				$(".page-light-box").removeClass("active");
				// scrolls to anchors offset
				$('html, body').animate({scrollTop:0}, 700);    

		    });
	   			
			
			$(window).load(function(){
				var current = location.protocol + '//' + location.hostname + location.pathname;
	            if (base != current) {
	                var diff = current.replace(base, '');
					var thisAnchor = diff.replace(diff, "#"+diff);
					var newAnchor = thisAnchor.replace('/', '');
					var destination = $(newAnchor).offset().top;
					window.location = (base + newAnchor);
					$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 500 );
	            }
			});
        }       
    }

	init();
	
	resizeOverlay();
	//$('.page-light-box').resizeLightBox();

	/*** table of contents scroll to poem and toggle slide out of toc    ***/
    $(".poem-titles a").click(function(event){
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		// gets clicked link's URL
		var thisAnchor = $(this).attr('href'); 
		
		// gets related anchor's offset from top
		var offset = $(thisAnchor).offset().top;
		
		$(".page-light-box").removeClass("active");   
		
		// scrolls to anchors offset
		$('html:not(:animated),body:not(:animated)').animate({scrollTop:offset}, 700);
    });
	
	
	$(window).bind('resize', function(){
		resizeOverlay();
	});
	
	//lighbox
	
	//$('.isotope a').lightBox({fixedNavigation:true});
	
	
});