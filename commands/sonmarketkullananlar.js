const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'sonmarketkullananlar',
    aliases: ['smk'],
    run: async(client, message, args) => {
        const url = client.config.api_url + "/callbacks/api.php?api=magaza-kullanimi&limit=100"
        fetch(url)
            .then(response => response.json())
            .then(async(res) => {
                const geriBtn = new Discord.MessageButton({
                    style: 'SECONDARY',
                    emoji: '⬅️',
                    customId: 'ileri'
                })
                  const ileriBtn = new Discord.MessageButton({
                    style: 'SECONDARY',
                    emoji: '➡️',
                    customId: 'geri'
                })
                const embedOlstr = async start => {                    
                    const current = res.slice(start, start + 5);
                    return new Discord.MessageEmbed({
                        footer: {text: 'OASIS Bot v1.0, Site: ' + client.config.api_url},
                        color: 'ORANGE',
                        title: `Son marketi kullananlar`,
                        fields: await Promise.all(
                            current.map(async u => ({
                                name: u.username,
                                value: `${u.heading}`
                            }))
                        ),
                        thumbnail: 'https://mcapi.tc/?'+client.config.ip+'/favicon'
                    })
                  }
                  const canFitOnOnePage = res.length <= 5
                  const embedMessage = await message.channel.send({
                    embeds: [await embedOlstr(0)],
                    components: canFitOnOnePage
                      ? []
                      : [new Discord.MessageActionRow({components: [ileriBtn]})]
                  })
                  if (canFitOnOnePage) return
                  
                  const collector = embedMessage.createMessageComponentCollector({
                    filter: ({user}) => user.id === message.author.id
                  })
                  
                  let currentIndex = 0
                  collector.on('collect', async interaction => {
                    interaction.customId === 'ileri' ? (currentIndex -= 5) : (currentIndex += 5)
                    await interaction.update({
                      embeds: [await embedOlstr(currentIndex)],
                      components: [
                        new Discord.MessageActionRow({
                          components: [
                            ...(currentIndex ? [geriBtn] : []),
                            ...(currentIndex + 5 < res.length ? [ileriBtn] : [])
                          ]
                        })
                      ]
                    })
                  })
                
            })
            .catch((err) => {
              message.reply('Market daha önce kullanılmamış.')
            })

    }
}
