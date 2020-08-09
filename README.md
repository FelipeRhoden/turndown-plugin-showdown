# Plugin Turndown para Showdown

Este plugin tem a finalidade de fazer com que a conversão de html, realizada pela biblioteca [Turndown][1], aceite algumas opções presente na biblioteca [Showdown][2].

[1]: https://github.com/domchristie/turndown "Turndown"
[2]: https://github.com/showdownjs/showdown "Showdown"

As opções presentes são estas:

- parseImgDimension
- strikethrough
- ghMentions
- emoji
- automaticLinks
- underline
- tables
- taskLists

## Get Start

Instale a biblioteca turndown e o plugin com o npm:
```bash
/* prompt */

$ npm install turndown
$ npm install turndown-plugin-showdown
```

Cole o seguinte código em um arquivo index.js:
```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { showdownPg } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(showdownPg);

        let html = '<p> Get Start Plugin 😄 </p>';

console.log(turndownService.turndown(html));
// Output Get Start Plugin :smile:
```


## Opções

Abaixo vou explicar e dar um exemplo de como utilizar cada opção.

### parseImgDimensions

Esta opção realização a converção de uma tag img com dimensionamento como específicado na funcionalidade da biblioteca Showdown.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { parseImgDimension } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(parseImgDimension);

        let html = '<img src="foo.jpg" alt="foo" width="100" height="80" />';

console.log(turndownService.turndown(html));
// Output ![foo](foo.jpg =100x80)
```

### strikethrough

Esta opção realiza a converção de tags 'del', 's' e 'strike' provenientes da sintaxe de taxado.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { strikethrough } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(strikethrough);

        let html = '<strike>Strikethrough</strike>';

console.log(turndownService.turndown(html));
// Output ~~Strikethrough~~
```

### tables

Esta opção realiza a conversão das tags de tabelas em sintaxe de tabela utilizada pela biblioteca Showdown.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { tables } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(tables);

        let html = `
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
        `;

console.log(turndownService.turndown(html));
// Output
// | Teste 1 | Teste 2 | Teste 3 |
// | --- | --- | --- |
// | Teste 1 | Teste 2 | Teste 3 |
// | Teste 1 | Teste 2 | Teste 3 |
```

_________________________
# Em construção

O resto do README.md está em construção, até dia 12/08/2020 estará completo. Obrigado por estar lendo.