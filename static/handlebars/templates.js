(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['comment-template.hb'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [2,'>= 1.0.0-rc.3'];
helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<li class=\"comment\">\n    <div class=\"info\">\n        <span class=\"author\">\n            <img src=\"http://graph.facebook.com/";
  if (stack1 = helpers.username) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.username; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "/picture?width=100&height=100\" alt=\"\">\n            "
    + escapeExpression(((stack1 = ((stack1 = depth0.name),stack1 == null || stack1 === false ? stack1 : stack1.first_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " "
    + escapeExpression(((stack1 = ((stack1 = depth0.name),stack1 == null || stack1 === false ? stack1 : stack1.last_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + ":\n        </span>\n    </div>\n    <span class=\"body\">\n        <p>";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = depth0.text; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
  buffer += escapeExpression(stack2)
    + "</p>\n    </span>\n</li>";
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
    + "\" class=\"comment-field required\" placeholder=\"What do you think?\"></textarea>\n        <span class=\"next-step\" style=\"display: none;\">\n            <a href=\"#\" class=\"remark-login\">Login</a>\n            <button data-hash=\"";
  if (stack1 = helpers.hash) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hash; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">Add note</button>\n        </span>\n\n    </div>\n\n    <ul class=\"comments\">\n    </ul>\n\n    "
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