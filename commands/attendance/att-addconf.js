// Record confirmed players to attendance record
exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return false
  }

  let raid = await client.raid.get(client, message.channel)
  if (!raid) {
    return client.messages.errorMessage(message.channel, 'This command can only be used in a raid channel.', 240)
  }
  let list = raid.signups.filter(signup => signup.confirmed == 1)
  let confPlayers = []
  for (key in list) {
    let dblist = {
      player: list[key].character.name,
      raid: raid.raid,
      raidID: raid.id,
      date: raid.date,
      channelID: raid.channelID,
      guildID: raid.guildID
    }
    confPlayers.push(dblist)
  }
  // Look for existing entries with same raidID
  client.models.attendance.findOne({ where: { raidID: raid.id } }).then((results) => {
    if (results) {
      // An entry exists for this raid, abort
      client.messages.errorMessage(message.channel, "Entries already exist for this raid, aborting!", 60)
      throw new Error('+addconfirmed failed - existing data')
    }
  }).then(() => {
    // Insert all confirmed players 
    client.models.attendance.bulkCreate(confPlayers, { updateOnDuplicate: ["raidID"] })
    message.author.send(`Recorded confirmed players for ${raid.raid} ${raid.date}`)
  }).catch(error => {
    console.log(error.message)
  })

  client.embed.update(client, message.channel)
}