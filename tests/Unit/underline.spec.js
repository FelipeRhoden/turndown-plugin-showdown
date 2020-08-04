describe("Teste da funcionalidade underline", function(){

    const   TurndownService = require("turndown"),
            ShowdownService = require("showdown"),
            underline = require("../../src/underline");

    it("Deveria converter uma tag 'u'em dois underscores",()=>{

        const   turndownService = new TurndownService().use(underline),
                showdownService = new ShowdownService.Converter({underline: true});
        
        let text = "__underlinde__",
            html = showdownService.makeHtml(text),
            htmlConverted = turndownService.turndown(html);

            expect(htmlConverted).toBe(text);

    })

    it("Não deveria converter uma tag 'em' em um underscore mesmo setando as opções",()=>{
        const   turndownService = new TurndownService().use(underline),
        showdownService = new ShowdownService.Converter();

        turndownService.options.emDelimiter = "_";

        let text = "*underlinde*",
            html = showdownService.makeHtml(text),
            htmlConverted = turndownService.turndown(html);

            expect(htmlConverted).toBe(text);
    });

    it("Não deveria converter uma tag 'strong' em dois underscore mesmo setando as opções",()=>{
        const   turndownService = new TurndownService().use(underline),
        showdownService = new ShowdownService.Converter();

        turndownService.options.strongDelimiter = "__";

        let text = "**underlinde**",
            html = showdownService.makeHtml(text),
            htmlConverted = turndownService.turndown(html);

            expect(htmlConverted).toBe(text);
    });

});