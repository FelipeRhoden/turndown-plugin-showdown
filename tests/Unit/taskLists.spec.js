describe("Testes de conversão de listas de tarefas", function(){

    const   TurndownService = require("turndown"),
            ShowdownService = require("showdown"),
            taskLists = require("../../src/taskLists");

    it('Deveria converte uma lista de tarefas não ordenada criada em Showdown', ()=>{
        const   turndownService = new TurndownService({bulletListMarker: "-"}).use(taskLists),
                showdownService = new ShowdownService.Converter({tasklists: true});

        let text = (`
-   [ ] Item 1
-   [x] Item 2
-   Item 3
        `).trim(),

        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    });

    it('Deveria converte uma lista de tarefas ordenada criada em Showdown', ()=>{
        const   turndownService = new TurndownService({bulletListMarker: "-"}).use(taskLists),
                showdownService = new ShowdownService.Converter({tasklists: true});

        let text = (`
1.  [ ] Item 1
2.  [x] Item 2
3.  Item 3
        `).trim(),

        html = showdownService.makeHtml(text);

        expect(turndownService.turndown(html)).toBe(text);
    })

})