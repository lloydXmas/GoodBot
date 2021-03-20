// Query attendance record(s)
const Sequelize = require('sequelize')
const Op = Sequelize.Op

exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return false
  }

  let type = args.shift()
  let thisRaid = await client.raid.get(client, message.channel)
  let result

  if (!type) { // query only this channel's raid records
    result = await client.attendance.queryThis(client, thisRaid.id)
    message.author.send(JSON.stringify(result))

  } else if (type == 'raids') { // query raidID's and raid zone/date
    let reply = '```'
    result = await client.attendance.queryAll(client)
    for (i in result) {
      let newDate = result[i].date.replace(/(\d{4})\-(\d\d)\-(\d\d)/, "$2/$3/$1")
      newDate = newDate.replace(/^0+/, '')
      reply += `${i}: ${result[i].raid}, ${newDate}\n`
    }
    reply += '```'
    message.author.send("**RAID ID's**\n" + reply)

  } else if (type == 'percent') { // query all raid records
    result = await client.attendance.queryAll(client)
    let totalRaids = Object.keys(result).length
    let playerNames = []
    client.models.character.findAll({ where: { guildID: message.guild.id }, attributes: ['name'] }).then((players) => {
      players.forEach(player => { playerNames.push(player.name) })
      // return players
    }).then(() => {
      let sortedPlayers = []
      playerNames.forEach((player) => {
        let x = 0
        Object.keys(result).forEach((key) => { // get total num of raids per player
          x = x + countOccurrences(result[key].players, player)
        })
        let percent = percentage(x, totalRaids) // compare to the overall total 
        sortedPlayers.push({ player: player, total: percent })

      })
      sortedPlayers.sort((a, b) => { // sort results sort alphabetically
        let textA = a.player.toLowerCase()
        let textB = b.player.toLowerCase()
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
      })

      let reply = '```'
      Object.keys(sortedPlayers).forEach((key) => {
        reply += `${sortedPlayers[key].player} : ${sortedPlayers[key].total}% \n`
      })
      reply += '```'
      message.author.send("**Overall Player Attendance:**\n" + reply)
    })
  }
}

// Counts the occurrences
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

function percentage(num, total) { // calculate percentage
  let x = (num / total) * 100
  return Number(`${Math.round(`${x}e2`)}e-2`)

}

