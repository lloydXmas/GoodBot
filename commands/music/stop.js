exports.run = async function(client, message, args) {
    if (!client.queue[message.guild.id]) {
        return message.channel.send('There is currently no songs in the queue.');
    }
    client.queue[message.guild.id].vc.leave();
};