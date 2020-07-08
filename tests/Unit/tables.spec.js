describe("Teste de converção de tabelas",function(){
    const   TurndownService = require("turndown"),
            ShowdownService = require("showdown"),
            tables = require("../../src/tables");

    it("Deveria converter uma table html criada por Showdown", ()=>{
        const   turndownService = new TurndownService({emDelimiter: "*"}).use(tables),
                showdownService = new ShowdownService.Converter({tables: true});

        let     text = `
| h1 | h2 | h3 |
| :-- | :--: | --: |
| 100 | [a](1) | ![b](2) |
| *foo* | **bar** | ~~baz~~ |
`,

                html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text.trim());
    });

    it("Deveria converter uma table em HTML normal", ()=>{
        const   turndownService = new TurndownService({emDelimiter: "*"}).use(tables),
        showdownService = new ShowdownService.Converter({tables: true});
        
        let html =
        `
        <table>
                <tr>
                        <th>Teste 1</th>
                        <th>Teste 2</th>
                        <th>Teste 3</th>
                </tr>
                <tr>
                        <td>Teste 1</td>
                        <td>Teste 2</td>
                        <td>Teste 3</td>
                </tr>
                <tr>
                        <td>Teste 1</td>
                        <td>Teste 2</td>
                        <td>Teste 3</td>
                </tr>
        </table>
        `,

        text = `
| Teste 1 | Teste 2 | Teste 3 |
| --- | --- | --- |
| Teste 1 | Teste 2 | Teste 3 |
| Teste 1 | Teste 2 | Teste 3 |
`

        expect(turndownService.turndown(html)).toBe(text.trim());
    })

})