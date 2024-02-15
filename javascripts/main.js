/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	$(function() {

		var	$window = $(window),
			$head = $('head'),
			$body = $('body');

		// Disable animations/transitions ...

			// ... until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// ... when resizing.
				var resizeTimeout;

				$window.on('resize', function() {

					// Mark as resizing.
						$body.addClass('is-resizing');

					// Unmark after delay.
						clearTimeout(resizeTimeout);

						resizeTimeout = setTimeout(function() {
							$body.removeClass('is-resizing');
						}, 100);

				});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fixes.

			// Object fit images.
				if (!skel.canUse('object-fit')
				||	skel.vars.browser == 'safari')
					$('.image.object').each(function() {

						var $this = $(this),
							$img = $this.children('img');

						// Hide original image.
							$img.css('opacity', '0');

						// Set background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
								.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

					});

		// Sidebar.
			var $sidebar = $('#sidebar'),
				$sidebar_inner = $sidebar.children('.inner');

			// Inactive by default on <= large.
				skel
					.on('+large', function() {
						$sidebar.addClass('inactive');
					})
					.on('-large !large', function() {
						$sidebar.removeClass('inactive');
					});

			// Hack: Workaround for Chrome/Android scrollbar position bug.
				if (skel.vars.os == 'android'
				&&	skel.vars.browser == 'chrome')
					$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
						.appendTo($head);

			// Toggle.
				if (skel.vars.IEVersion > 9) {

					$('<a href="#sidebar" class="toggle">Toggle</a>')
						.appendTo($sidebar)
						.on('click', function(event) {

							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Toggle.
								$sidebar.toggleClass('inactive');

						});

				}
				// List of HTML entities for escaping.
	var htmlEscapes = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '/': '&#x2F;'
	};

	// Regex containing the keys listed immediately above.
	var htmlEscaper = /[&<>"'\/]/g;

	// Escape a string for HTML interpolation.
	var escapeHTML = function(string) {
	  return ('' + string).replace(htmlEscaper, function(match) {
	    return htmlEscapes[match];
	  });
	};

////////////////////////////////////////////////////////////////////////////////////////////////////
				function createCookie(name, value, days) {
			    var expires;

			    if (days) {
			        var date = new Date();
			        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			        expires = "; expires=" + date.toGMTString();
			    } else {
			        expires = "";
			    }
			    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
			}

			function readCookie(name) {
			    var nameEQ = encodeURIComponent(name) + "=";
			    var ca = document.cookie.split(';');
			    for (var i = 0; i < ca.length; i++) {
			        var c = ca[i];
			        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
			        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
			    }
			    return null;
			}

			function eraseCookie(name) {
			    createCookie(name, "", -1);
			}
////////////////////////////////////////////////////////////////////////////////////////////////////

      // $('#datepicker').datepick({dateFormat: 'dd/mm/yyyy', firstDay: 1});
			$('#datepicker').datepick({showTrigger: '#calImg'});

			// Events.
			$( '#postcommentForm' ).submit(function( event ) {
				event.preventDefault();
				$.post( 'postfeedback', $( '#postcommentForm' ).serialize() );
				$('#postcommentForm' ).hide();
				$('#thankForFeedback' ).show();
				// event.preventDefault();
			});

			$( '#feedbackButton').click(function(event) {
				// $("div").addClass("important");
				$('#feedbackButton').hide();
				$('#postcommentForm').show();
			});

			$( '#editArticleForm' ).submit(function( event ) {
				event.preventDefault();
				// $.post( 'postarticle', $( '#editArticleForm' ).serialize() );
				// location.href='editor';
				//location.reload(true);
				// console.log($( '#editArticleForm' ).serialize() );

				$.ajax({
			    url: 'postarticle',
			    type: 'post',
			    data: $( '#editArticleForm' ).serialize(),
			    headers: {
			        authorization: 'Bearer ' + readCookie('jwt')
			    },
			    success: function (data) {
			        // console.info(data);
							location.href='editor';
			    },
					error: function (xhr,status,error) {
						location.href='auth';
					}
		  	});

			});

			$( '#authForm' ).submit(function( event ) {
				event.preventDefault();
				$.post( 'authenticate', $( '#authForm' ).serialize(), function(response) {
					console.log(response);
					if (response.success) {
						// sessionStorage.setItem('jwtToken', response.token);
						// createCookie(jwtToken, response.token, 1);
						location.href='editor';
					} else $.notify(response.message);

				});

				// $('#postcommentForm' ).hide();
				// $('#thankForFeedback' ).show();
				// event.preventDefault();
			});


			  $( '#postcommentFormAccept' ).submit(function( event ) {
			    event.preventDefault();
			    // $('#submitbutton').addClass('disabled');
			    $('#submitbutton').val('данные сохранены');
			    // $.post( 'postfeedbackaccept', $( '#postcommentFormAccept' ).serialize() );
			    // $('#feedbackButton').hide();
			    // $('#postcommentForm').show();
			    // event.preventDefault();
					var url = 'postfeedbackaccept'
					$.ajax({
						url: url,
						type: 'post',
						data: $( '#postcommentFormAccept' ).serialize(),
						headers: {
								authorization: 'Bearer ' + readCookie('jwt')
						},
						success: function (data) {
								// console.info(data);
								location.href='feedbacklist';
						},
						error: function (xhr,status,error) {
							location.href='auth';
						}
					});

			  });




			var deletebuttons = document.getElementsByClassName('deletearticlebutton');

			for (var i = 0; i < deletebuttons.length; i++) {
			     deletebuttons[i].addEventListener('click', function(event) {
						 if (confirm("Do you want to delete article?")) {
							// 	console.log(this.getAttribute('itemToDelete'));
							var url = 'postarticle?id=' + this.getAttribute('itemToDelete')
							$.ajax({
						    url: url,
						    type: 'DELETE',
								headers: {
										authorization: 'Bearer ' + readCookie('jwt')
								},
						    success: function(result) {
									// console.log(result)
									location.reload();
						    }
							});
						 }
		 			} , false);
			}

			var deletefeedbackbuttons = document.getElementsByClassName('deletefeedbackbutton');

			for (var i = 0; i < deletefeedbackbuttons.length; i++) {
			     deletefeedbackbuttons[i].addEventListener('click', function(event) {
						 if (confirm("Do you want to delete feeback?")) {
							// 	console.log(this.getAttribute('itemToDelete'));
							var url = 'postfeedbackaccept?id=' + this.getAttribute('itemToDelete')
							$.ajax({
						    url: url,
						    type: 'DELETE',
								headers: {
										authorization: 'Bearer ' + readCookie('jwt')
								},
						    success: function(result) {
									// console.log(result)
									location.reload();
						    }
							});
						 }
		 			} , false);
			}




			document.addEventListener("trix-file-accept", function(event) {
				event.preventDefault();
			});

				// Link clicks.
					$sidebar.on('click', 'a', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Vars.
							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Check URL.
							if (!href || href == '#' || href == '')
								return;

						// Hide sidebar.
							$sidebar.addClass('inactive');

						// Redirect to href.
							setTimeout(function() {

								if (target == '_blank')
									window.open(href);
								else
									window.location.href = href;

							}, 500);

					});

				// Prevent certain events inside the panel from bubbling.
					$sidebar.on('click touchend touchstart touchmove', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Prevent propagation.
							event.stopPropagation();

					});

				// Hide panel on body click/tap.
					$body.on('click touchend', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Deactivate.
							$sidebar.addClass('inactive');

					});

			// Scroll lock.
			// Note: If you do anything to change the height of the sidebar's content, be sure to
			// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

				$window.on('load.sidebar-lock', function() {

					var sh, wh, st;

					// Reset scroll position to 0 if it's 1.
						if ($window.scrollTop() == 1)
							$window.scrollTop(0);

					$window
						.on('scroll.sidebar-lock', function() {

							var x, y;

							// IE<10? Bail.
								if (skel.vars.IEVersion < 10)
									return;

							// <=large? Bail.
								if (skel.breakpoint('large').active) {

									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');

									return;

								}

							// Calculate positions.
								x = Math.max(sh - wh, 0);
								y = Math.max(0, $window.scrollTop() - x);

							// Lock/unlock.
								if ($sidebar_inner.data('locked') == 1) {

									if (y <= 0)
										$sidebar_inner
											.data('locked', 0)
											.css('position', '')
											.css('top', '');
									else
										$sidebar_inner
											.css('top', -1 * x);

								}
								else {

									if (y > 0)
										$sidebar_inner
											.data('locked', 1)
											.css('position', 'fixed')
											.css('top', -1 * x);

								}

						})
						.on('resize.sidebar-lock', function() {

							// Calculate heights.
								wh = $window.height();
								sh = $sidebar_inner.outerHeight() + 30;

							// Trigger scroll.
								$window.trigger('scroll.sidebar-lock');

						})
						.trigger('resize.sidebar-lock');

					});

		// Menu.
			var $menu = $('#menu'),
				$menu_openers = $menu.children('ul').find('.opener');

			// Openers.
				$menu_openers.each(function() {

					var $this = $(this);

					$this.on('click', function(event) {

						// Prevent default.
							event.preventDefault();

						// Toggle.
							$menu_openers.not($this).removeClass('active');
							$this.toggleClass('active');

						// Trigger resize (sidebar lock).
							$window.triggerHandler('resize.sidebar-lock');

					});

				});

	});

})(jQuery);
