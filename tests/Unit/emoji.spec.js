describe('Teste da funcionalidade emoji', function(){
    const   TurndownService = require('turndown'),
            ShowdownService = require('showdown'),
            emoji = require('../../src/emoji'),
            csv = require('neat-csv'),
            fs = require('fs');

    it('Deveria converter um unicode gerado por Showdown em emoji', ()=>{
        const   turndownService = new TurndownService().use(emoji),
                showdownService = new ShowdownService.Converter({emoji: true});

        let text = ':smile:',
            html = showdownService.makeHtml(text);
        
        expect(turndownService.turndown(html)).toBe(text);
    }) 

    it('Deveria converter um unicode gerado por Showdown em emoji específico do Showdown', ()=>{
        const   turndownService = new TurndownService().use(emoji),
                showdownService = new ShowdownService.Converter({emoji: true});

        let text = 'Teste :showdown:',
            html = showdownService.makeHtml(text);
        
        expect(turndownService.turndown(html)).toBe(text);
    }) 

    it('Deveria converter um unicode gerado por Showdown em emoji com texto entre ele', ()=>{
        const   turndownService = new TurndownService().use(emoji),
                showdownService = new ShowdownService.Converter({emoji: true});

                let text = 'Teste de emoji: :smile:, sorriso.',
                html = showdownService.makeHtml(text);
    
            expect(turndownService.turndown(html)).toBe(text);
    });

    it('Deveria converter uma lista de emoji',done =>{

        const   turndownService = new TurndownService().use(emoji),
                showdownService = new ShowdownService.Converter({emoji: true, literalMidWordUnderscores: true});

        let text, html, htmlConverted;

        fs.readFile(__dirname+'/../../listaEmoji.csv', async (err, data) => {
            if (err){
                return done(err);
            }
            

                const rows = await csv(data);

                rows.forEach(obj => {
                    text = obj['0'];
                    html = showdownService.makeHtml(text) || '' ;

                    htmlConverted = turndownService.turndown(html); 

                    if (obj['1'].toLowerCase() === 'true') {
                        
                        if (!(':octocat:' === text))
                            expect(html).not.toContain(text);

                        expect(htmlConverted).toContain(text);
        
                    }else{
        
                        expect(html).toContain(text);
        
                    }
                
                });

                return done();
              
        })

    })

    it('Não deveria converter os emoji', ()=>{
        const   turndownService = new TurndownService().use(emoji);

        let html = '<p>🇾🇪</p>',
            text = turndownService.turndown(html);

        expect(text).not.toBe(':yemen:');
    })
});