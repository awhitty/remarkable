(function($){
	var manager = {
		base: null, // the base reference for the site
		auth: null, // the reference for the auth module
		post: null, // the reference to the specific post/page
		user: null, // the user interacting with the page
	}

	var methods = {
		// simple function to make pretty hashes out of DOM elements
		hash: function(element) {
			var str = element.innerHTML;
			var tag = element.tagName;

		    var hash = 0, i, char;
		    if (str.length == 0) return hash;
		    for (i = 0; i < str.length; i++) {
		        char = str.charCodeAt(i);
		        hash = ((hash<<5)-hash)+char;
		        hash = hash & hash; // Convert to 32bit integer
		    }

		    hash = Math.abs(hash)

		    return tag.toLowerCase() + '_' + hash.toString(16);
		},

		create_popup: function(hash, manager) {
			var source   = $("#popup-template").html()
			var template = Handlebars.compile(source)
			var html = template({hash:hash})

			return html
		},

		show_or_create_popup: function(hash, manager, offset) {
			// find popup in DOM with has
			// if it doesn't exist, make one with handlebars
			// display it and position it 
			var popup = $('#'+hash)
			var top = offset.top + offset.height/2 - 32
			var left = offset.left + offset.width + 10
			var paragraphRef = manager.post.child('paragraphs/'+hash)

			if (popup.length > 0) {
				popup.show().css('top', top).css('left', left)
			} else {
				var html = methods.create_popup(hash)

				html = $(html)
						.css('top', top)
						.css('left', left)
						.click(function(e) {
							e.stopPropagation()
						})

				$('.remark-login', html).click(function() {
					$(document).trigger('remark-login')
				})

				$('input[type="submit"]', html).click(function() {
					$(document).trigger('remark-submit', this)
				})

				$('body').append(html)

				// wire the popup up to receive comments from firebase
				var source = $('#comment-template').html()
				var template = Handlebars.compile(source)

				paragraphRef.on('child_added', function(snapshot) {
					var context = snapshot.val()
					var comment = template(context)
					$('.comments', html).prepend(comment)
				})
			}
		},

		make_bindings: function(tallies, manager, options) {
			$('body').click(function(e) {
				$('.remarks').hide()
			})

			$.each(tallies, function(index, item) {
				$('a', item).click(function(e) {
					var hash = $(this).data('hash');
					var offset = $(this).offset()

					$('.remarks').hide()
					methods.show_or_create_popup(hash, manager, offset)
					e.stopPropagation() // prevent this from bubbling up to the body
					e.preventDefault() // don't scroll to the popup
				})
			})

			$(document).on('remark-login', function(e) {
				manager.auth.login('facebook')
			})

			$(document).on('keyup', '.comment-field', function (e) {
                var parent = $('#'+ $(this).data('hash'))
                $('.next-step', parent).show()

                if (!$.trim($(this).val())) {
                	$('.next-step', parent).hide()
                }
            });

			// when a comment is submitted, format it properly and send it on
			// its way
            $(document).on('remark-submit', function(e) {
            	var source = e.data
            	var hash = $(source).data('hash')
            	var parent = $('#'+hash)
            	var text = $('.comment-field', parent).val()

            	var user = manager.user

            	var comment = {
            		text: text,

            		facebook_id: user.id,
            		username: user.username,
            		name: {
            			first_name: user.first_name,
            			last_name: user.last_name
            		}
            	}

            	manager.post.child('paragraphs/'+hash).push(comment, function(e) {
            		console.log(e)
            	})
            })

            // if comments are updated somewhere, recalculate the number of
            // comments there are. This could be done WAY better, but it's
            // okay for now (it gets the job done)
            manager.post.on('child_changed', function(snapshot) {
            	var snapshot = snapshot.val()
				$.each(snapshot, function(key, value) {
					var count = c(value)
					$('.remark-tally[data-hash="'+key+'"] a').html(count)
				})
            })

            function c(obj) {
			  var i = 0;
			  for (var x in obj)
			    if (obj.hasOwnProperty(x))
			      i++;
			  return i;
			}
		},

		init: function(parent, manager, options) {
			if (!options) {
				options = {
					selector: '*',
					auth: 'facebook',
					scope: 'picture',
					baseRef: 'https://remarkable.firebaseio.com/'
				}
			}

			manager.base = new Firebase(options.baseRef);
	    	manager.auth = new FirebaseAuthClient(manager.base, function(error, user) {
				if (error) {
				  // an error occurred while attempting login
				  console.log(error)
				} else if (user) {
				  // user authenticated with Firebase
				  console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
				  manager.user = user
				  $('body').addClass('remark-logged-in')
				} else {
					console.log('Not logged in')
				  // user is logged out
				}
			})


	    	// clean the url to use as a little hash in the firebase
			var url = window.location.pathname
			url = url.substring(1).replace('.', '-').replace('/','-')

			manager.post = new Firebase(options.baseRef + 'posts/' + url)

			var children = parent.children().filter(options.selector)
			var tallies = []

			$.each(children, function(index, item) {
				var hash = methods.hash(item)

				var source   = $("#tally-template").html()
				var template = Handlebars.compile(source)
				var link     = template({hash:hash, inline: options.inline_links})

				link = $(link)
				item = $(item)

				if (options.inline_links) 
				{
					item.append(link)
				} else {
					item.prepend(link)
				}

				item.addClass('remarkable')
				tallies.push(link)
			})

			manager.post.once('value', function(snapshot) {
				var snapshot = snapshot.val()
				$.each(snapshot.paragraphs, function(key, value) {
					var count = c(value)
					$('.remark-tally[data-hash="'+key+'"] a').html(count)
				})
			})

			methods.make_bindings(tallies, manager, options)

			function c(obj) {
			  var i = 0;
			  for (var x in obj)
			    if (obj.hasOwnProperty(x))
			      i++;
			  return i;
			}
		}
	}

    $.fn.remarkable = function(options){
    	methods.init(this, manager, options)

     	return this
    }
})(Zepto)