describe('Testes de utilização do plugin',function(){

    const TurndownService = require("turndown"), 
        { showdownPg } = require("../../src/showdownPg");

    it('Deveria converter varias imagens com dimenções',()=>{
        const turndownService = new TurndownService().use(showdownPg);
        let html = `<p><img src="foo.jpg" alt="foo" width="100" height="80" />
<img src="bar.jpg" alt="bar" width="100" height="auto" />
<img src="baz.jpg" alt="baz" width="80%" height="5em" /> </p>`,
            
        text = turndownService.turndown(html);
            
        expect(text).toBe("![foo](foo.jpg =100x80) ![bar](bar.jpg =100x*) ![baz](baz.jpg =80%x5em)");
    })

    it('Deveria converter a tag strike, s e del',()=>{
        const turndownService = new TurndownService().use(showdownPg);
        let html = `<del>strike</del> <strike>s</strike> <s>del</s>`,

        text = turndownService.turndown(html);

        expect(text).toBe("~~strike~~ ~~s~~ ~~del~~");
    })

})