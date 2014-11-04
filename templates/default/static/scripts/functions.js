function getAppName()
{
    var initialIndex = window.location.pathname.indexOf("jsdoc/") + 6;
    var lastIndex = window.location.pathname.indexOf("/jsdoc");
    return window.location.pathname.substring(initialIndex, lastIndex);
}

function createAppLinks()
{
    var appName = getAppName();
    var appLink = document.getElementById("appLink");
    appLink.href = "/dashboard/#apps/" + appName;
    appLink.innerHTML = appName;
}

function generateDocs()
{
    window.location = "/dashboard-services/appjsdoc/" + getAppName() + "/jsdoc/generated-docs.html";
};
