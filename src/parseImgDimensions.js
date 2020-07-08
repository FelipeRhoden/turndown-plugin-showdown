function parseImgDimensions(turndownService){
    turndownService.addRule('parseImgDimensions', {
        filter: (node) =>{
            return node.nodeName === 'IMG' &&
                node.getAttribute('width') &&
                node.getAttribute('height') &&
                node.parentNode != 'CODE'; 
        },
        replacement: (content, node) => {
            return `![${node.getAttribute('alt')}](${node.getAttribute('src')} =`
            +`${node.getAttribute('width') === 'auto' ? '*' : node.getAttribute('width')}`
            +`x`
            +`${node.getAttribute('height') === 'auto' ? '*' : node.getAttribute('height')})`;
        }
    });
}

module.exports = parseImgDimensions;