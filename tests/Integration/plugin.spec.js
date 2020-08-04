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
    });

    it("Deveria converter uma tag 'A' com um link específicado em uma formatação ghMentions",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        turndownService.options['ghMentionsLink'] = 'https://github.com/{u}';

        let html = '<a href="https://github.com/feliperhoden">@feliperhoden</a>',
            text = turndownService.turndown(html);

        expect(text).toBe("@feliperhoden");

    });

    it("Deveria converter um emoji 'smile' em :smile:",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        let html = '😄',
            text = turndownService.turndown(html);

        expect(text).toBe(":smile:");

    });

    it("Deveria converter uma tag 'A' com href e conteudos iguais em um link no padrão automatico",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        let html = '<a href="http://github.com">http://github.com</a>',
            text = turndownService.turndown(html);

        expect(text).toBe("<http://github.com>");

    });

    it("Deveria transformar a tag 'U' em texto cercado por dois underscore",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        let html = '<u>underline</u>',
            text = turndownService.turndown(html);

        expect(text).toBe("__underline__");

    });

    it("Deveria transformar uma tabela em uma formatação de tabela simples",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        let html = 
`
<table>
    <tr>
        <th>Col 1</th>
        <th>Col 2</th>
        <th>Col 3</th>
    </tr>
    <tr>
        <td>Cont 1</td>
        <td>Cont 2</td>
        <td>Cont 3</td>
    </tr>
</table>
`,
            text = turndownService.turndown(html);

        expect(text).toBe(
`
| Col 1 | Col 2 | Col 3 |
| --- | --- | --- |
| Cont 1 | Cont 2 | Cont 3 |
`.trim());

    });

    it("Deveria transformar a tag 'input de checkbox' em formatação de task list",()=>{
        const turndownService = new TurndownService().use(showdownPg);

        let html = '<ul><li><input type="checkbox" checked> Checado</li><li><input type="checkbox"> Não Checado</li></ul>',
            text = turndownService.turndown(html);

        expect(text).toBe(
`
*   [x] Checado
*   [ ] Não Checado
`.trim());

    });

})