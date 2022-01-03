const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'kredisorgu',
    aliases: ['ks', 'kredi-sorgu'],
    run: async(client, message, args) => {
        
        if(args[0] == null) return message.reply({content:'Lütfen bir oyuncu adı giriniz.'})
        const url = client.config.api_url + "/callbacks/api.php?api=oyuncu-kredi&username=" + args[0];
        fetch(url)
            .then(response => response.json())
            .then((res) => {
                const kredi = res;
                const embed = new Discord.MessageEmbed({
                    title: 'Kredi sorgu',
                    description: `${args[0]} adlı kişide \`${kredi}\` Kredi bulunuyor.`,
                    footer: {text: 'OASIS Bot v1.0, Site: ' + client.config.api_url},
                    color: 'ORANGE',
                    thumbnail: 'https://mcapi.tc/?'+client.config.ip+'/favicon'
                })
                message.reply({embeds: [embed]})
            })
            .catch((err) => {
                message.reply({content:`Veritabanında \`${args[0]}\` adlı kişiyi bulamıyorum.`})
            })
    }
}
