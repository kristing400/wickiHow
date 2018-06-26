(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['intro'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id=\"intro\" class=\"section  sticky  hasad\">\n  <h1 class=\"firstHeading\"><a><span id=\"hdr_prefix\">wiki</span>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</a></h1>\n  <p>"
    + alias4(((helper = (helper = helpers.intro || (depth0 != null ? depth0.intro : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"intro","hash":{},"data":data}) : helper)))
    + "</p>\n  <div class=\"clearall\"></div>\n  <div class=\"clearall adclear\"></div>\n\n</div>\n";
},"useData":true});
templates['step'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "        <li class=\"hasimage\">\n          <div class=\"mwimg  largeimage  floatcenter \" style=\"max-width:728px\"><a href=\"#/Image:Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg\" class=\"image lightbox\" data-href=\"/Image:Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg?ajax=true&amp;aid=42328\"><div class=\"content-spacer\">\n            <img alt=\"Image titled Be the Only Single One in the Group Step 1\" width=\"728\" height=\"514\" class=\"whcdn content-fill\" onload=\"WH.performance.clearMarks('image1_rendered'); WH.performance.mark('image1_rendered');\" id=\"img_1f29b8cf30\" data-src=\"http://pad2.whstatic.com/images/thumb/8/8c/Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg/aid42328-v4-728px-Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg\">\n          </div>\n          <noscript><img alt=\"Image titled Be the Only Single One in the Group Step 1\" src=\"http://pad2.whstatic.com/images/thumb/8/8c/Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg/aid42328-v4-728px-Be-the-Only-Single-One-in-the-Group-Step-1-Version-2.jpg\" width=\"728\" height=\"514\" class=\"whcdn content-fill\" onload=\"WH.performance.clearMarks('image1_rendered'); WH.performance.mark('image1_rendered');\"></noscript>\n        </a></div>\n          <div class=\"step_num\" aria-label=\"Step 1\">"
    + alias2(alias1((depth0 != null ? depth0.stepNumber : depth0), depth0))
    + "</div>\n          <a name=\"step_1_1\" class=\"stepanchor\"></a><div class=\"step\">\n            <b class=\"whb\">"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + "</b>"
    + alias2(alias1((depth0 != null ? depth0.content : depth0), depth0))
    + "\n            <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.bullets : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n          </div>\n          <div class=\"clearall\"></div>\n        </li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "                <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a name=\"Making_it_Bearable_sub\" class=\"anchor\"></a>\n<div class=\"section steps   sticky  steps_first\">\n  <h3>\n    <div class=\"altblock\">Part <span>"
    + alias4(((helper = (helper = helpers.partNumber || (depth0 != null ? depth0.partNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"partNumber","hash":{},"data":data}) : helper)))
    + "</span>\n    </div>\n    <a title=\"Edit section: Making it Bearable\" class=\"editsection\" onclick=\"gatTrack(gatUser,\\'Edit\\',\\'Edit_section\\');\" tabindex=\"-1\" aria-label=\"Link to edit section Making it Bearable\">Edit</a>\n    <span class=\"mw-headline\" id=\"Making_it_Bearable\">"
    + alias4(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</span>\n  </h3>\n  <div id=\"steps_1\" class=\"section_text\">\n    <ol class=\"steps_list_2\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.steps : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ol>\n    <div class=\"clearall\"></div>\n  </div>\n</div>\n";
},"useData":true});
})();