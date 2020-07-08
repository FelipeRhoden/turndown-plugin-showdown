describe('Tests of the parseImgDimensions option', function(){
    const TurndownService = require('turndown'),
          ShowdownService = require('showdown'),
          parseImgDimensions = require('../../src/parseImgDimensions');

    it('Deveria converter uma Tag IMG com Dimenções',()=>{
        const turndownService = new TurndownService().use(parseImgDimensions);
        let html = `<img src="foo.jpg" alt="foo" width="100" height="80" />`,
            text = turndownService.turndown(html);
            
            expect(text).toBe("![foo](foo.jpg =100x80)");
    })

    it('Deveria converter um Tag IMG com Dimenções iguais a auto',()=>{
        const turndownService = new TurndownService().use(parseImgDimensions);
        let html = `<img src="bar.jpg" alt="bar" width="100" height="auto" />`,
            text = turndownService.turndown(html);
            
            expect(text).toBe("![bar](bar.jpg =100x*)");
    });

    it('Deveria converter um Tag IMG com Dimenções com unidades de medidas',()=>{
        const turndownService = new TurndownService().use(parseImgDimensions);
        let html = `<img src="baz.jpg" alt="baz" width="80%" height="5em" />`,
            text = turndownService.turndown(html);
            
            expect(text).toBe("![baz](baz.jpg =80%x5em)");
    });

    it('Deveria converter um Tag IMG sem Dimenções',()=>{
        const turndownService = new TurndownService().use(parseImgDimensions);
        let html = `<img src="baz.jpg" alt="baz"/>`,
            text = turndownService.turndown(html);
            
            expect(text).toBe("![baz](baz.jpg)");
    });

    it('Deveria converter várias Tags IMG com Dimenções',()=>{
        const turndownService = new TurndownService().use(parseImgDimensions);
        let html = `<p><img src="foo.jpg" alt="foo" width="100" height="80" />
<img src="bar.jpg" alt="bar" width="100" height="auto" />
<img src="baz.jpg" alt="baz" width="80%" height="5em" /> </p>`,
            
        text = turndownService.turndown(html);
            
            expect(text).toBe("![foo](foo.jpg =100x80) ![bar](bar.jpg =100x*) ![baz](baz.jpg =80%x5em)");
    });

    it('Deveria converter tags IMG dimensionadas criadas pelo Showdown',()=>{
        const   turndownService = new TurndownService().use(parseImgDimensions),
                showdownService = new ShowdownService.Converter({parseImgDimensions: true});

        let     text = "![foo](foo.jpg =100x80) ![bar](bar.jpg =100x*) ![baz](baz.jpg =80%x5em)",
                html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });
})