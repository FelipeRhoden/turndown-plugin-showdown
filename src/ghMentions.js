function ghMentions(turndownService){

    turndownService.options.ghMentionsLink = 'https://github.com/{u}';

    turndownService.addRule('ghMentions',{
        filter:(node, options) => {
            if (node.nodeName === 'A' && node.getAttribute('href')){
                const href = node.getAttribute('href'),
                      content = node.textContent;
                      
                return content[0] === '@' 
                    && options.ghMentionsLink.replace(/\{u\}/g, content.substring(1)) === href;
            }

            return false;
        },
        replacement: (content)=>{
            return content;
        }
    })
}

module.exports = ghMentions;