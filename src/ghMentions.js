function ghMentions(turndownService){

    turndownService.options.ghMentionsLink = 'https://github.com/';

    turndownService.addRule('ghMentions',{
        filter:(node, options) => {
            if (node.nodeName === 'A' && node.getAttribute('href')){
                let href = node.getAttribute('href');
                return href.startsWith(options.ghMentionsLink);
            }

            return false;
        },
        replacement: (content)=>{
            return content;
        }
    })
}

module.exports = ghMentions;