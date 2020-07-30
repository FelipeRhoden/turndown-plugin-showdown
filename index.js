const   neat = require('neat-csv'),
        fs = require('fs'),
        ShowdownService = require('showdown'),
        showdownService = new ShowdownService.Converter({emoji: true});

let     file = '{\n';

fs.readFile(__dirname+'/listaEmoji.csv', async (err, data) => {
    if (err){
        return done(err);
    }
    
        const rows = await neat(data);

        rows.forEach(obj => {
            text = obj['0'];
            html = showdownService.makeHtml(text) || '' ; 

            if (obj['1'].toLowerCase() === 'true') 
                if (!RegExp(text, "g").test(file))
                    file += `"${html.replace(/<p>|<\/p>/g, '')}":"${text}",\n`;
        
        });

        file += '}';

        fs.writeFile(__dirname+"/src/emojiList.json",file, function(err){
            //Caro ocorra algum erro
            if(err){
                return console.log('erro')
            }
            //Caso não tenha erro, retornaremos a mensagem de sucesso
            console.log('Arquivo Criado');
        });

    });