const TurndownService = require("turndown")

describe("Teste de conversão da opção ghMentions", function(){
    const   TurndownService = require("turndown"),
            ShowdownService = require("showdown"),
            ghMentions = require("../../src/ghMentions");

    it('Deveria converter uma tag "A" com link específico no padrão ghMentions',()=>{
        const turndownService = new TurndownService().use(ghMentions);

        let html = `<a href="https://github.com/teste">@teste</a>`,
            text = turndownService.turndown(html);

        expect(text).toBe("@teste");
    })

})