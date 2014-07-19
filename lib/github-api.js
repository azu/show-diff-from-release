/**
 * Created by azu on 2014/07/20.
 * LICENSE : MIT
 */
"use strict";
// GET /repos/:owner/:repo/releases
function getReleasesList(ghObject, callback) {
    var treeAPI = "https://api.github.com/repos/" + ghObject.owner + "/" + ghObject.repo + "/releases";
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
            callback(res);
        }
    });
}

module.exports = {
    getReleasesList: getReleasesList
};