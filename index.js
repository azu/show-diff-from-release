// ==UserScript==
// @name        show-diff-from-release
// @namespace   http://efcl.info/
// @license     MIT
// @include     https://github.com/*/*/releases/tag/*
// @version     1
// @grant GM_xmlhttpRequest
// ==/UserScript==

var api = require("./lib/github-api");
var dom = require("./lib/github-dom");
var ghObject = require("github-release-dom")(location.href);
api.getReleasesList(ghObject, function (error, tagList) {
    if (error) {
        return console.error(error);
    }
    try{
        dom.addDiffList(ghObject, tagList);
    }catch(error){
        console.error(error);
    }
});