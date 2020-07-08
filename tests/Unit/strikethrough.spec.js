describe("Teste de conversão de strikethrough", function(){
    const   TurndownService = require("turndown"),
            ShowdownService = require("showdown"),
            strikethrough = require("../../src/strikethrough");
    
    it('Deveria converter a tag strike, s e del',()=>{
        const turndownService = new TurndownService().use(strikethrough);
        let html = `<del>strike</del> <strike>s</strike> <s>del</s>`,

        text = turndownService.turndown(html);

        expect(text).toBe("~~strike~~ ~~s~~ ~~del~~");
    });

    it('Deveria converter uma tag criada pelo Showdown com a opção strikethrough', ()=>{
        const   turndownService = new TurndownService().use(strikethrough);
                showdownService = new ShowdownService.Converter({strikethrough: true});
        
        let     text = `~~strike~~ ~~s~~ ~~del~~`,
                html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    })
})