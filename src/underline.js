function underline(turndownService){
    
    Object.defineProperty(turndownService.options, "emDelimiter",{
        get: () => '*',
    });

    Object.defineProperty(turndownService.options, "strongDelimiter",{
        get: () => '**',
    });

    turndownService.addRule("underline",{
       filter: "u",
       replacement: function(content){
           return `__${content}__`;
       }
    });

}

module.exports = underline;