exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return false
  }
  // Make sure an argument was provided
  if (!args[0]) {
    return false
  }
  let raid = await client.raid.get(client, message.channel)
  let target = args.join().toLowerCase().split(/[\s,]+/)

  // Delete raidID from the attendance table
  let removed = await client.attendance.removeID(client, target, message.guild.id)
  message.author.send(`Deleted ${removed} entries from db`)
}