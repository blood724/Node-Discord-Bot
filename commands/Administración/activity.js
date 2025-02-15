const { MessageEmbed } = require('discord.js')
const Command = require('../../structures/Commandos.js')

module.exports = class Activity extends Command {
    constructor(client) {
        super(client, {
            name: 'activity',
            description: ["Sets the bot's activity.", 'Establece la actividad del bot.'],
            subcommands: ['listening', 'watching', 'playing'],
            usage: ['<listening/watching/playing> <status>', '<listening/watching/playing> <estado>'],
            role: 'dev',
            args: true,
            category: 'administracion'
        })
    }
    async run(client, message, args, prefix, lang, webhookClient, ipc) {
        try {
            client.user
                .setActivity(args.slice(1).join(' '), {
                    type: args[0].toUpperCase()
                })
                .then((data) => {
                    const embed = new MessageEmbed()
                        .setColor(process.env.EMBED_COLOR)
                        .setTitle(client.language.SUCCESSEMBED)
                        .setDescription(client.language.ACTIVITY[1])
                        .setFooter({ text: message.author.username, iconURL: message.author.avatarURL() })
                    return message.channel.send({ embeds: [embed] })
                })
                .catch((err) => {
                    return console.error(err)
                })
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
                message.author.send(
                    'Oops... Ha ocurrido un eror con el comando ejecutado. Aunque ya he notificado a mis desarrolladores del problema, ¿te importaría ir a discord.gg/nodebot y dar más información?\n\nMuchísimas gracias rey <a:corazonmulticolor:836295982768586752>'
                )
            } catch (e) {}
        }
    }
}
