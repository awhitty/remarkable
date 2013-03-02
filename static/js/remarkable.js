;(function($){

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

		create_popup: function(hash) {
			var source   = $("#popup-template").html()
			var template = Handlebars.compile(source)
			var comments = {
				1: {name: 'Austin', text: 'Hello world'},
				2: {name: 'Billy', text: 'Hello France'},
				3: {name: 'Billy', text: 'Hello France'},
				4: {name: 'Billy', text: 'Hello France'},
				5: {name: 'Billy', text: 'Hello France'},
				6: {name: 'Billy', text: 'Hello France'},
			}
			var html = template({hash:hash, comments:comments})

			return html
		},

		show_or_create_popup: function(hash, offset) {
			// find popup in DOM with has
			// if it doesn't exist, make one with handlebars
			// display it and position it 
			var popup = $('#'+hash)
			var top = offset.top + offset.height/2 - 32
			var left = offset.left + offset.width + 10

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

				$('body').append(html)
			}
		},

		bind: function(tallies, options) {
			$('body').click(function(e) {
				$('.remarks').hide()
			})

			$.each(tallies, function(index, item) {
				$('a', item).click(function(e) {
					var hash = $(this).data('hash');
					var offset = $(this).offset()

					$('.remarks').hide()
					methods.show_or_create_popup(hash, offset)
					e.stopPropagation()
					e.preventDefault()
				})
			})
		},

		init: function(parent, options) {
			if (!options) {
				options = {
					selector: '*'
				}
			}

			var children = parent.children().filter(options.selector)
			var tallies = []

			$.each(children, function(index, item) {
				var hash = methods.hash(item)

				var source   = $("#tally-template").html()
				var template = Handlebars.compile(source)
				var link = template({hash:hash, count:13})

				link = $(link)
				item = $(item)
				item.prepend(link)
				item.addClass('remarkable')
				tallies.push(link)
			})

			methods.bind(tallies, options)
		}
	}

    $.fn.remarkable = function(options){

    	methods.init(this, options)

     	return this
    }
})(Zepto)