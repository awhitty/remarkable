(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment-template.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"comment\">\n	<div class=\"left_side\">\n			<img class=\"avatar\" src=\"http://gravatar.com/avatar/";
  if (stack1 = helpers.email_hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.email_hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "?s=128&d=retro\" alt=\"\">\n	</div>\n    <div class=\"right_side\">\n    	<div class=\"comment-info\">\n    	    <span class=\"comment-author\">\n    	        ";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + ":\n    	    </span>\n    	</div>\n    	<div class=\"comment-body\">\n    	    <p>";
  if (stack1 = helpers.text) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.text; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n    	</div>\n    </div>\n</li>";
  return buffer;
  });
templates['popup-template.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"remarks\">\n    <div data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"add-comment\">\n        <textarea data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"comment-field required\" placeholder=\"What do you think?\"></textarea>\n        <span class=\"next-step\" style=\"display: none;\">\n            <div class=\"remark-login\">\n                    <input class=\"name\" type=\"text\" placeholder=\"Name\">\n                    <input class=\"email\" type=\"text\" placeholder=\"Email\">\n            </div>\n            <button data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\"><i class=\"icon-plus\"></i> Add comment</button>\n        </span>\n\n    </div>\n\n    <ul class=\"comments\">\n    </ul>\n\n    "
    + "\n    <div class=\"homage\">powered by <a href=\"http://remarkablejs.com\" >Remarkable</a></div>\n</div>";
  return buffer;
  });
templates['tally-template.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "inline";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            ";
  if (stack1 = helpers.count) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\n        ";
  return buffer;
  }

function program5(depth0,data) {
  
  
  return "\n            +\n        ";
  }

  buffer += "<span data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"remark-tally ";
  stack1 = helpers['if'].call(depth0, depth0.inline, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <a href=\"#";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n        ";
  stack1 = helpers['if'].call(depth0, depth0.count, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </a>\n</span>";
  return buffer;
  });
})();