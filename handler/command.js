const fs = require('fs');
module.exports = async(client) => {
    
    fs.readdir("./commands", function(err, files) {
        console.log(files)
        files.forEach(file => {
            if(String(file).endsWith(".js")) {

                let props = require("../commands/" + file);
                client.commands.set(props.name, props)
                if(props.aliases) {
                    props.aliases.forEach(alias => {
                        client.commands.set(alias, props)
                    })
                }
                let aliasesLength = props.aliases ? props.aliases.length : 0
                console.log(props.name + " yüklendi. " + aliasesLength + " aliases.")

            } else {
                console.log(file + " .js uzantısıyla bitmiyor.")
            }
        })
    })

}