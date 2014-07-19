/**
 * Created by azu on 2014/07/20.
 * LICENSE : MIT
 */
"use strict";
// https://developer.github.com/v3/repos/#list-tags
function getReleasesList(ghObject, callback) {
    var treeAPI = "https://api.github.com/repos/" + ghObject.user + "/" + ghObject.repo + "/tags";
    GM_xmlhttpRequest({
        method: "GET",
        url: treeAPI,
        onload: function (res) {
            if (res.status === 201 || res.status == 200) {
                callback(null, JSON.parse(res.responseText));
            } else {
                callback(new Error(res.statusText));
            }
        },
        onerror: function (res) {
            callback(new Error(res.statusText));
        }
    });
}

module.exports = {
    getReleasesList: getReleasesList
};