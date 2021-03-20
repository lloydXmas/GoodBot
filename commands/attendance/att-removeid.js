exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return false
  }
  // Make sure an argument was provided
  if (!args[0]) {
    return false
  }
  let raid = await client.raid.get(client, message.channel)
  let type = args.shift()
  let target = args.join().toLowerCase().split(/[\s,]+/)

  // Delete raidID from the attendance table
  if (Object.keys(target).length > 1) {
    return false
  } else {
    let removed = await client.attendance.removeID(client, target)
    message.author.send(`Deleted ${removed} entries from db`)
  }
}