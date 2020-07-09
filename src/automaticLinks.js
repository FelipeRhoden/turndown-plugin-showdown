function automaticLinks(turndownService){
    turndownService.addRule('automaticLinks',{
        filter: (node)=>{
            return node.nodeName === 'A'
            && node.getAttribute('href')
            && (
                node.textContent === node.getAttribute('href')
                || `mailto:${node.textContent}` === node.getAttribute('href')
            );
        },
        replacement: (content) =>{
            return `<${content}>`;
        }
    })
}

module.exports = automaticLinks;