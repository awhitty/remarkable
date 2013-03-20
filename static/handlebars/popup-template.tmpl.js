(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['popup-template.tmpl'] = template(function (Handlebars,depth0,helpers,partials,data) {
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
})();