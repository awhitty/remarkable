(function($){
	var manager = {
		base: null, // the base reference for the site
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
			var template = Handlebars.templates['popup-template.hb']
			var html = template({hash:hash})

			return html
		},

		show_or_create_popup: function(hash, manager, offset) {
			// find popup in DOM with hash
			// if it doesn't exist, make one with handlebars
			// display it and position it 
			var popup = $('#'+hash)
			var top = offset.top + offset.height/2 - 32
			var left = offset.left + offset.width + 10
			var paragraphRef = manager.post.child('paragraphs/'+hash)

			if (popup.length > 0) {
				popup.show()
			} else {
				var html = methods.create_popup(hash)

				html = $(html)
						.click(function(e) {
							e.stopPropagation()
						})

				$('button', html).click(function() {
					$(document).trigger('remark-submit', this)
				})

				$('.remarkable[data-hash="'+hash+'"]').append(html)

				// wire the popup up to receive comments from firebase
				var template = Handlebars.templates['comment-template.hb']

				paragraphRef.on('child_added', function(snapshot) {
					var context = snapshot.val()
					var comment = template(context)
					$('.comments', html).prepend(comment)
				})
			}
		},

		make_bindings: function(tallies, manager, options) {
			$(document).click(function(e) {
				$('.remarks').hide()
			})

			$.each(tallies, function(index, item) {
				$('a', item).click(function(e) {
					var hash = $(this).data('hash');
					var offset = $(this).offset()
					$(this).removeClass('changed')

					$('.remarks').hide()
					methods.show_or_create_popup(hash, manager, offset)
					e.stopPropagation() // prevent this from bubbling up to the body
					e.preventDefault()  // don't scroll to the popup
				})
			})

			$(document).on('keyup', '.comment-field', function (e) {
                var parent = $('#'+ $(this).data('hash'))
                $('.next-step', parent).show()

                if (!$.trim($(this).val())) {
                	$('.next-step', parent).hide()
                }

                console.log($('.next-step', parent))
            });

			// when a comment is submitted, format it properly and send it on
			// its way
            $(document).on('remark-submit', function(e) {
            	var source = e.data
            	var hash = $(source).data('hash')
            	var parent = $('#'+hash)
            	var text = $('.comment-field', parent).val()
            	var user_name  = $.trim($('.name',  parent).val())
            	var user_email = $.trim($('.email', parent).val())

            	if (!(text&&user_name&&user_email)) return;
            	user_email = calcMD5(user_email)


            	var now = new Date();
            	// now.format("m/dd/yy");

            	var comment = {
            		text: text,

            		time: now.getTime(),
            		name: user_name,
            		email_hash: user_email
            	}

            	manager.post.child('paragraphs/'+hash).push(comment, function(e) {
            		console.log("Submitted post to paragraphs/'"+hash)
            	})

            	$('.comment-field', parent).val('')
            })

            // if comments are updated somewhere, recalculate the number of
            // comments there are. This could be done WAY better, but it's
            // okay for now (it gets the job done)
            manager.post.on('child_changed', function(snapshot) {
            	var snapshot = snapshot.val()
				$.each(snapshot, function(key, value) {
					var count = c(value)
					var tally = $('.remark-tally[data-hash="'+key+'"] a')
					var original_count = tally.html()

					if (count != original_count)
					{
						tally.html(count).addClass('changed')
					}
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
			manager.base = new Firebase(options.baseRef);


	    	// clean the url to use as a little hash in the firebase
			var url = window.location.pathname
			url = url.substring(1).replace('.', '-').replace('/','-')
			if (!url) url = 'root'

			manager.post = new Firebase(options.baseRef + 'pages/' + url)

			var children = parent.children().filter(options.selector)
			var tallies = []

			$.each(children, function(index, item) {
				var hash = methods.hash(item)

				var template = Handlebars.templates['tally-template.hb']
				var link     = template({hash:hash})


				link = $(link)
				item = $(item)
				item.data('hash', hash)


				item.append(link)

				item.addClass('remarkable')
				tallies.push(link)
			})

			manager.post.once('value', function(snapshot) {
				var snapshot = snapshot.val()
				if (!snapshot) return;
				$.each(snapshot.paragraphs, function(key, value) {
					var count = countTally(value)
					$('.remark-tally[data-hash="'+key+'"] a').html(count)
				})
			})

			methods.make_bindings(tallies, manager, options)

			function countTally(obj) {
			  var i = 0;
			  for (var x in obj)
			    if (obj.hasOwnProperty(x))
			      i++;
			  return i;
			}
		}
	}

    $.fn.remarkable = function(options){
    	if (!options) { 
    		console.log("Please pass options to Remarkable.js")
    		return;
    	}

    	methods.init(this, manager, options)

     	return this
    }
})(Zepto)

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */
 
/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  str = "";
  for(j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}
 
/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for(i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}
 
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}
 
/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
 
/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
  return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
  return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
  return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
  return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
 
/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
  x = str2blks_MD5(str);
  a =  1732584193;
  b = -271733879;
  c = -1732584194;
  d =  271733878;
 
  for(i = 0; i < x.length; i += 16)
  {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
 
    a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i+10], 17, -42063);
    b = ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = ff(d, a, b, c, x[i+13], 12, -40341101);
    c = ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = ff(b, c, d, a, x[i+15], 22,  1236535329);    
 
    a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = gg(c, d, a, b, x[i+11], 14,  643717713);
    b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = gg(c, d, a, b, x[i+15], 14, -660478335);
    b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = gg(b, c, d, a, x[i+12], 20, -1926607734);
     
    a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = hh(b, c, d, a, x[i+14], 23, -35309556);
    a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = hh(d, a, b, c, x[i+12], 11, -421815835);
    c = hh(c, d, a, b, x[i+15], 16,  530742520);
    b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
 
    a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i+10], 15, -1051523);
    b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = ii(d, a, b, c, x[i+15], 10, -30611744);
    c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
 
    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}