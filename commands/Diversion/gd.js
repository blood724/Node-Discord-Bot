const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/Commandos.js')

module.exports = class GD extends Command {
    constructor(client) {
        super(client, {
            name: 'gd',
            description: ['Shows an embed with the text input.', 'Muestra un embed con la entrada de texto.'],
            usage: ['<text>', '<texto>'],
            category: 'diversion',
            args: true
        })
    }
    async run(client, message, args, prefix, lang, webhookClient, ipc) {
        try {
            let args2 = args.join('%20')
            if (args2.length > 50) {
                const errorembed = new MessageEmbed()
                    .setColor('RED')
                    .setTitle(client.language.ERROREMBED)
                    .setDescription(client.language.GD[3])
                    .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
                return message.channel.send({ embeds: [errorembed] })
            }
            const exampleEmbed = new MessageEmbed()
                .setColor(process.env.EMBED_COLOR)
                .setImage(`https://gdcolon.com/tools/gdlogo/img/${args2}`)
            message.channel.send({ embeds: [exampleEmbed] })
        } catch (e) {
            console.error(e)
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('RED')
                        .setTitle(client.language.ERROREMBED)
                        .setDescription(client.language.fatal_error)
                        .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
                ]
            })
            webhookClient.send(
                `Ha habido un error en **${message.guild.name} [ID Server: ${message.guild.id}] [ID Usuario: ${message.author.id}] [Owner: ${message.guild.ownerId}]**. Numero de usuarios: **${message.guild.memberCount}**\nMensaje: ${message.content}\n\nError: ${e}\n\n**------------------------------------**`
            )
            try {
                message.author
                    .send(
                        'Oops... Ha ocurrido un eror con el comando ejecutado. Aunque ya he notificado a mis desarrolladores del problema, ¿te importaría ir a discord.gg/nodebot y dar más información?\n\nMuchísimas gracias rey <a:corazonmulticolor:836295982768586752>'
                    )
                    .catch(e)
            } catch (e) {}
        }
    }
}
