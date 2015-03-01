/**
 * Module dependencies.
 */

var page = require('page');
var empty = require('empty');
var Homepage = require('./view');

page('/', load, function(ctx, next) {
  var container = document.querySelector('.site-content');

  var homepage = new Homepage({
    data: {applications: ctx.applications}
  });

  homepage.render('.site-content');
});

function load(ctx, next) {
  var app = {
  	"_id" : "5466c057a2277002003069b8",
  	"approved" : true,
  	"backgroundColor" : "#B03B42",
  	"comments" : "",
  	"contact" : "",
  	"description" : "ConsiderIt is an open source deliberation platform that allows people to collaboratively create pro/con lists of the key points around any complex issue.",
  	"github" : "https://github.com/dhunt925/ConsiderIt",
  	"license" : "AGPL",
  	"logo" : "https://consider.it/homepage/logo%20white%20pink%20tip.png",
  	"name" : "Considerit",
  	"organization" : "Considerit",
  	"partnership" : "",
  	"slug" : "considerit",
  	"tags" : "debate,publicparticipation",
  	"team" : "Travis Kriplean, Michael Toomim, Kevin Miniter.",
  	"technology" : "Ruby on Rails",
  	"twitter" : "LVGuide",
  	"website" : "http://consider.it/",
  	"workingAt" : "Living Voters' Guide"
  };
  ctx.applications = [app, app, app, app, app, app, app];
  next();
}
