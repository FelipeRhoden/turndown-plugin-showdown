const   parseImgDimension = require("./parseImgDimensions"),
        strikethrough = require("./strikethrough");

function showdownPg(turndownService){
    turndownService.use([
        parseImgDimension,
        strikethrough,
    ]);
}

module.exports = {
    showdownPg, 
    parseImgDimension, 
    strikethrough,
}