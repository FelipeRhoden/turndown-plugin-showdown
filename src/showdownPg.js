const   parseImgDimension = require("./parseImgDimensions"),
        strikethrough = require("./strikethrough"),
        ghMentions = require("./ghMentions"),
        emoji = require("./emoji"),
        automaticLinks = require('./automaticLinks'),
        underline = require('./underline'),
        tables = require('./tables'),
        taskLists = require('./taskLists');

function showdownPg(turndownService){
    turndownService.use([
        parseImgDimension,
        strikethrough,
        ghMentions,
        emoji,
        automaticLinks,
        underline,
        tables,
        taskLists
    ]);
}

module.exports = {
    showdownPg, 
    parseImgDimension, 
    strikethrough,
    ghMentions,
    emoji,
    automaticLinks,
    underline,
    tables,
    taskLists
}