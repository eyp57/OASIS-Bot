const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'durum',
    aliases: ['status', 'ping'],
    run: async(client, message, args) => {
        
        const url = client.config.api_url;
        var fetching = await fetch(url);
        
        
        const embed = new Discord.MessageEmbed({
            footer: {text: 'OASIS Bot v1.0'},
            color: 'ORANGE',
            fields: [
                    {
                        name: '💓 OASIS API Durum',
                        value: `${fetching.statusText}`
                    },
                    {
                        name: '❤ WebSocket Gecikme',
                        value: `${client.ws.ping}ms`
                    }
                ],
            thumbnail: 'https://mcapi.tc/?'+client.config.ip+'/favicon'
        })
        message.reply({embeds: [embed]})
            
    }
}
