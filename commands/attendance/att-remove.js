// Add player or players to a raid attendance record
exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return false
  }
  let raid = await client.raid.get(client, message.channel)

  // Make sure an argument was provided
  if (!args[0]) {
    return false
  } else if (args[0].toLowerCase() == 'all') {

    await client.attendance.removeAll(client, raid.id)
    message.author.send('Removed all players from attendance record:  **' + message.channel.name + '**.')

  } else {
    let removedPlayers = []
    let notFound = []
    let players = args.join().toLowerCase().split(/[\s,]+/)

    if (Object.keys(players).length > 0) {
      for (var i = 0; i < players.length; i++) {
        let removed = await client.attendance.removeAttendee(client, raid.id, players[i])

        if (removed) {
          removedPlayers.push(players[i])
        } else {
          notFound.push(players[i])
        }
      }
    }
    if (removedPlayers.length) {
      message.author.send('Remove attendance record for players: ' + removedPlayers.join(', ') + ' for  **' + message.channel.name + '**.')
    }
    if (notFound.length) {
      message.author.send('Could not find players: ' + notFound.join(', ') + ' for **' + message.channel.name + '**.')
    }
  }

  client.embed.update(client, message.channel)
}