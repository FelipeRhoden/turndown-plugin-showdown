describe("Teste da funcionalidade de links automáticos", function(){

    const   TurndownService = require('turndown'),
            ShowdownService = require('showdown'),
            automaticLinks = require('../../src/automaticLinks');

    it('Deveria converter uma tag A em um link padrão automático', ()=>{
        const   turndownService = new TurndownService().use(automaticLinks);
        
        let html = `<a href="http://www.google.com">http://www.google.com</a>`,
            text = `<http://www.google.com>`;

        expect(turndownService.turndown(html)).toBe(text);

    })

    it('Deveria converter uma tag A gerada por Showdown em um link padrão automático', ()=>{
        const   turndownService = new TurndownService().use(automaticLinks),
                showdownService = new ShowdownService.Converter();
        
        let text = `<http://www.google.com>`,
            html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);

    });

    it('Deveria converter uma tag A de e-mail gerada por Showdown em um link padrão automático', ()=>{
        const   turndownService = new TurndownService().use(automaticLinks),
                showdownService = new ShowdownService.Converter();
        
        let text = `<teste@email.com>`,
            html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);

    });

    it('Deveria não converter uma tag A gerada por Showdown em um link padrão automático', ()=>{
        const   turndownService = new TurndownService().use(automaticLinks),
                showdownService = new ShowdownService.Converter();
        
        let text = `[teste@email.com](mailto:testi@email.com)`,
            html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);

        text = `[http:www.teste.com](http:www.testi.com)`,
        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);

    });

})