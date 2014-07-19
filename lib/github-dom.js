function getCurrentTagObject(ghObject, tagList) {
    var currentTag = ghObject.tagName;
    for (var i = 0; i < tagList.length; i++) {
        var tagObject = tagList[i];
        if (tagObject.name == currentTag) {
            return tagObject;
        }
    }
}
function markupTagList(ghObject, tagList) {
    var currentTag = ghObject.tagName;
    var reverse = false;

    function isNotUndefined(value) {
        return value != null;
    }

    return tagList.map(function (tagObject) {
        if (tagObject.name == currentTag) {
            reverse = true;
            return;
        }
        tagObject._older = reverse;
        return tagObject;
    }).filter(isNotUndefined);
}
function buildListTag(ghObject, tagList) {
    var ul = document.createElement("ul");
    ul.setAttribute("style", "list-style:none;text-align:left;float:left");
    // https://developer.github.com/v3/repos/#list-tags
    var baseURL = "https://github.com/" + ghObject.user + "/" + ghObject.repo + "/compare/";
    var markedTagList = markupTagList(ghObject, tagList);
    var currentTagObject = getCurrentTagObject(ghObject, tagList);
    markedTagList.forEach(function (tagObject) {
        var li = document.createElement("li");
        var aTag = document.createElement("a");
        var compareSpan = document.createElement("span");
        compareSpan.className = "octicon octicon-git-compare";
        compareSpan.setAttribute("style", "margin-right:0.5em");
        li.appendChild(compareSpan);
        aTag.textContent = tagObject.name;
        if (tagObject._older) {
            aTag.href = baseURL + tagObject.commit.sha + "..." + currentTagObject.commit.sha;
        } else {
            aTag.href = baseURL + currentTagObject.commit.sha + "..." + tagObject.commit.sha;
        }
        li.appendChild(aTag);
        ul.appendChild(li);
    });
    return ul;
}
function addDiffList(ghObject, tagList) {
    var point = document.querySelector(".release-meta");
    var ulTag = buildListTag(ghObject, tagList);
    console.log(ulTag);
    point.appendChild(ulTag);
}
module.exports = {
    addDiffList: addDiffList

};