function taskLists (turndownService) {
    turndownService.addRule('taskLists', {
      filter: function (node) {
        return node.type === 'checkbox' && node.parentNode.nodeName === 'LI'
      },
      replacement: function (content, node) {
        return (node.checked ? '[x]' : '[ ]');
      }
    });
}

module.exports = taskLists;