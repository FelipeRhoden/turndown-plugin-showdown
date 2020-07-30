const   fs = require('fs'),
        emojiList = JSON.parse(fs.readFileSync(__dirname+"/emojiList.json", "utf-8"));

function emoji(turndownService){

    const escapes = [
        [/\\/g, '\\\\'],
        [/\*/g, '\\*'],
        [/^-/g, '\\-'],
        [/^\+ /g, '\\+ '],
        [/^(=+)/g, '\\$1'],
        [/^(#{1,6}) /g, '\\$1 '],
        [/`/g, '\\`'],
        [/^~~~/g, '\\~~~'],
        [/\[/g, '\\['],
        [/\]/g, '\\]'],
        [/^>/g, '\\>'],
        [/_/g, '\\_'],
        [/^(\d+)\. /g, '$1\\. '],
        [/\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*/gu, 
            (match) =>{
                
                let e = emojiList[match];
                
                return (e) ? e : match;
            }
        ],
        [/\bS\b/g, ':showdown:']
      ];

    turndownService.escape = (string) => 
        escapes.reduce((accumulator, escape) => 
            accumulator.replace(escape[0], escape[1]),
        string);

    turndownService.addRule('emoji',{
        filter: (node)=>{
            return  node.nodeName === 'IMG' &&
                    node.getAttribute('alt') === ':octocat:' &&
                    node.getAttribute('height') === '20' &&
                    node.getAttribute('width') === '20' &&
                    node.getAttribute('align') === 'absmiddle' &&
                    node.getAttribute('src') === 'https://assets-cdn.github.com/images/icons/emoji/octocat.png';
        },
        replacement: ()=>{
            return ':octocat:';
        }
    });

   
}

module.exports = emoji;