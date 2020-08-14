# Plugin Turndown para Showdown

Este plugin tem a finalidade de fazer com que a conversão de html, realizada pela biblioteca [Turndown][1], aceite algumas opções presente na biblioteca [Showdown][2].

[1]: https://github.com/domchristie/turndown "Turndown"
[2]: https://github.com/showdownjs/showdown "Showdown"

As opções presentes são:

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

### taskLists

Esta funcionalidade realiza a conversão de tags "inputs" com "type" igual "checkbox" dentro listas na sintaxe de taskslists definida pela biblioteca Showdown.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { taskLists } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(taskLists);

        let html = `
        <ul>
                <li><input type="checkbox" checked> Checado</li>
                <li><input type="checkbox"> Não Checado</li>
        </ul>
        `;

console.log(turndownService.turndown(html));
//Output 
//*   [x] Checado
//*   [ ] Não Checado
```

### ghMentions

Esta opção faz a converção de tags "A" com "href" definido na opção "ghMentionsLink" em sintaxe padrão ghMentions específicada na biblioteca Showdown. Por padrão o "ghMentionsLink" é "https://github.com/{u}" quando utilizada a funcionalidade "ghMentions", mas pode ser alterado.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { ghMentions } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(ghMentions);

        turndownService.options.ghMentionsLink = 'https://github.com/{u}';

        let html = '<a href="https://github.com/FelipeRhoden">@FelipeRhoden</a>';

console.log(turndownService.turndown(html));
// Output @FelipeRhoden
```

### automaticLinks

Esta opção faz a converção de tags "A" com o "href" igual do seu conteudo, converte também quando o "href" inicia com a palavara "mailto:" e o restante é igual ao conteudo da tag. Isso garante que a reconverção do códiog gerado de markdown para html mantenha o encode de e-mails, caso contrario os links de e-mail seriam convertidos para sintaxe de link normal que não realiza o enconde na reconverção.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { automaticLinks } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(automaticLinks);

        let html = '<a href="https://github.com/FelipeRhoden">https://github.com/FelipeRhoden</a>';

console.log(turndownService.turndown(html));
// Output <https://github.com/FelipeRhoden>
```

### emoji

Esta opção faz a converção de unicode de emojis em sintaxe de emoji especificada na biblioteca Showdown. A lista suportada de emojis pode ser encontrada no seguinte link: <https://github.com/showdownjs/showdown/wiki/Emojis>

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { emoji } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(emoji);

        let html = '💃🤳';

console.log(turndownService.turndown(html));
//Output :dancer::selfie:
```

### underline

Esta opção faz a converção da tag "U" em sintaxe underline definida pela biblioteca Showdown. Quando utiliza a upção underline as opçãos da biblioteca Turndown "emDelimiter" e "strongDelimiter" ficarão respectivamente travadas na utilização de "\*"  "\*\*" por conta da incoerencia que poderia ser gerada na reconverção do conteudo utilizando a biblioteca Showdown.

```javascript
/* index.js */

const   TurndownService = require('turndown'),
        { underline } = require('turndown-plugin-showdown'),
        turndownService = new TurndownService().use(underline);

        let html = '<u>underline</u>';

console.log(turndownService.turndown(html));
//Output __underline__
```

### showdownPg

Esta opção faz a utilização de todas as outras opções juntas.

## Lincença

Este plugin é liberado sob a linceça MIT

________________________________

Copyright &copy; 2020 Felipe Rhoden