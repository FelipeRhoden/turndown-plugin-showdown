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
    });

    it('Devereia converter uma tag "A" com link específico no padrão ghMentions gerado pelo Showdown', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        let text = '@teste',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Devereia não converter uma tag "A" com link específico, mas texto diferente, no padrão ghMentions gerado pelo Showdown', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        let text = '[teste](https://github.com/teste)',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);

        text = '[@teste](https://github.com/testi)',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Devereia converter uma tag "A" com link específico no padrão ghMentions gerado pelo Showdown com letra maíuscula', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        let text = '@Teste',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Devereia converter uma tag "A" com link específico no padrão ghMentions gerado pelo Showdown referencia no meio', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        turndownService.options['ghMentionsLink'] = 'https://github.com/{u}/teste';
        showdownService.setOption('ghMentionsLink','https://github.com/{u}/teste');

        let text = '@Teste',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Devereia converter uma tag "A" com link específico no padrão ghMentions gerado pelo Showdown sem referencia', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        turndownService.options['ghMentionsLink'] = 'https://github.com/';
        showdownService.setOption('ghMentionsLink','https://github.com/');

        let text = '@Teste',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Devereia converter uma tag "A" com link específico no padrão ghMentions gerado pelo Showdown com mais de uma referencia', ()=>{
        const   turndownService = new TurndownService().use(ghMentions),
                showdownService = new ShowdownService.Converter({ghMentions: true});
        
        turndownService.options['ghMentionsLink'] = 'https://github.com/{u}/teste/{u}';
        showdownService.setOption('ghMentionsLink','https://github.com/{u}/teste/{u}');

        let text = '@Teste',
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });
})