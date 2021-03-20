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

    let players = await client.attendance.addAll(client, raid.id, raid.raid, raid.date, raid.channelID, raid.guildID)
    message.author.send('Added all players to attendance record:  **' + message.channel.name + '**.')
  } else {

    let attendingPlayers = []
    let notFound = []
    let players = args.join().toLowerCase().split(/[\s,]+/)

    for (key in players) {
      let player = client.general.ucfirst(players[key])
      let valid = await client.raid.getSignup(client, raid, player)
      if (valid) {
        let attendee = await client.attendance.addAttendee(client, raid.id, player, raid.raid, raid.date, raid.channelID, raid.guildID)
        attendingPlayers.push(player)
      } else {
        notFound.push(player)
      }
    }

    if (attendingPlayers.length) {
      message.author.send('Added attendance record for players: ' + attendingPlayers.join(', ') + ' for  **' + message.channel.name + '**.')
    }
    if (notFound.length) {
      message.author.send('Could not find players: ' + notFound.join(', ') + ' for **' + message.channel.name + '**.')
    }
  }
  // Update our embed
  client.embed.update(client, message.channel)
}
