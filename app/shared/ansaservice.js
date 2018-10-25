const httpModule = require("http");


const config = require("./config");


function listNews() {
    return httpModule.getJSON(config.serverUrl + "/api/news/Homepage");
}


exports.listNews = listNews;
