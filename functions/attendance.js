const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  addAttendee(client, raidID, characterName, raidName, raidDate, channelID, guildID) {
    let promise = new Promise((resolve, reject) => {
      client.models.attendance.findOrCreate({
        where: {
          player: characterName, raidID: raidID, raid: raidName, date: raidDate, channelID: channelID, guildID: guildID
        }
      })
        .spread((user, created) => {
          resolve(true)
        })
    })
    return promise
  },
  addAll(client, raidID, raidName, raidDate, channelID, guildID) {
    let playerNames = []
    let promise = new Promise((resolve, reject) => {
      client.models.signup.findAll({ raw: true, where: { raidID: raidID }, attributes: ['player'] }).then((results) => {
        results.forEach(result => {
          let record = {
            player: result.player,
            raid: raidName,
            raidID: raidID,
            date: raidDate,
            channelID: channelID,
            guildID: guildID
          }
          playerNames.push(record)
        })
        return (playerNames)
      }).then((playerNames) => {
        client.models.attendance.bulkCreate(playerNames, { updateOnDuplicate: ["raidID"] })
        resolve(true)
      })
    })
    return promise
  },
  removeID(client, raidID, guildID) {
    console.log(`guildID: ${guildID}, raidID: ${raidID}`)
    let promise = new Promise((resolve, reject) => {
      // get a count of number removed
      return client.models.attendance.count({ where: { [Op.and]: [{ raidID: raidID }, { guildID: guildID }] } })
        .then((result) => {
          return client.models.attendance.destroy({ where: { [Op.and]: [{ raidID: raidID }, { guildID: guildID }] } })
            .then(() => { resolve(result) })
        })
    })
    return promise
  },
  removeAttendee(client, raidID, characterName) {
    let promise = new Promise((resolve, reject) => {
      client.models.attendance.destroy({
        where: {
          [Op.and]: [
            { player: characterName }, { raidID: raidID }
          ]
        }
      })
      resolve(true)
    })
    return promise
  },
  removeAll(client, raidID) {
    let playerNames = []
    let promise = new Promise((resolve, reject) => {
      client.models.attendance.findAll({ where: { raidID: raidID } }).then((results) => {
        results.forEach(result => {
          playerNames.push(result.player)
        })
        return playerNames
      }).then((playerNames) => {
        client.models.attendance.destroy({ where: { player: playerNames } })
      })
      resolve(true)
    })
    return promise
  },
  queryThis(client, id) {
    let promise = new Promise((resolve, reject) => {
      let raidList = {}
      client.models.attendance.findAll({ where: { raidID: id } }).then((results) => {
        let thisKey = results[0].raidID
        raidList[thisKey] = {
          'raid': results[0].raid,
          'date': results[0].date,
          'players': []
        }
        results.forEach(result => {
          let thisId = result.raidID
          raidList[thisId].players.push(result.player)
        })
        resolve(raidList)
      })
    })
    return promise
  },
  queryAll(client, guildID) {
    let promise = new Promise((resolve, reject) => {
      let raidList = {}
      client.models.attendance.findAll({
        raw: true,
        where: { guildID: guildID },
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('raidID')), 'raidID'],
          'raid',
          'date'
        ]
      }).then((results) => {
        let raids = []
        results.forEach(result => {
          raids.push(result.raidID)
        })
        for (i of results) {
          raidList[i.raidID] = {
            'raid': i.raid,
            'date': i.date,
            'players': []
          }
        }
        return raids
      }).then((raids) => {
        client.models.attendance.findAll({
          where: {
            raidID: {
              [Op.or]: raids
            }
          }
        }).then((players) => {
          players.forEach(player => {
            let thisId = player.raidID
            raidList[thisId].players.push(player.player)
          })
        }).then(() => {
          resolve(raidList)
        })
      })
    })
    return promise
  }
}