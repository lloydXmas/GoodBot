exports.run = async function (client, message, args) {
  if (!client.permission.manageChannel(message.member, message.channel)) {
    return message.channel.send('Unable to complete command -- you do not have permission to manage this channel.')
  }

  let sheetID = await client.customOptions.get(client, message.guild, 'att-sheet')
  if (sheetID) {
    sheedID = sheetID.trim()
  }

  if (args[0]) {
    sheetID = args[0]
  }

  let { GoogleSpreadsheet } = require('google-spreadsheet')
  let doc = new GoogleSpreadsheet(sheetID)
  var creds = require("../../google.json")
  await doc.useServiceAccountAuth(creds)
  await doc.loadInfo()
  let raid = await client.raid.get(client, message.channel)

  cellData = {}
  sheetCounter = []

  // query all raid records
  result = await client.attendance.queryAll(client)

  let totalRaids = Object.keys(result).length
  for (sheetNum = 0; sheetNum < totalRaids; sheetNum++) {
    sheetCounter.push(sheetNum)
  }
  var keys = Object.keys(result)
  for (var i = 0; i < keys.length; i++) {
    let key = keys[i]
    let sorted = result[key].players.sort()
    let date = result[key].date.replace(/(\d{4})\-(\d\d)\-(\d\d)/, "$2/$3/$1")
    date = date.replace(/^0+/, '')
    let raid = result[key].raid
    let thisdata = []

    sorted.forEach((player, index) => {
      thisdata[index] = {
        date: date,
        raidname: raid,
        value: player
      }
    })
    cellData[i] = thisdata
  }
  deleteSheet().then(() => {
    setCells(cellData)
    summaryCells()

  })

  async function summaryCells() {
    var allData = []
    result = await client.attendance.queryAll(client)
    let totalRaids = Object.keys(result).length
    let playerNames = []
    client.models.character.findAll({ where: { guildID: message.guild.id }, attributes: ['name'] }).then((players) => {
      players.forEach(player => {
        playerNames.push(player.name)
      })
    }).then(() => {
      playerNames.forEach((player, i) => {
        let x = 0
        Object.keys(result).forEach((key) => {
          x = x + countOccurrences(result[key].players, player)
        })
        let percent = percentage(x, totalRaids)
        let thisdata = {
          player: player,
          percent: percent
        }
        allData.push(thisdata)
      })
      return allData
    }).then(async (players) => {
      let x = players.length + 1
      let cellRange = 'A1:C' + x.toString()
      var sheet
      sheet = doc.sheetsByIndex[0]
      await sheet.loadCells(cellRange)
      for (row = 0; row < x; row++) {
        for (col = 0; col < 3; col++) {
          sheet.getCell(row, col).value = ''
        }
      }

      let counterRow = 1
      players.forEach((player) => {

        let cell = sheet.getCell(counterRow, 0)
        cell.value = player.player
        cell = sheet.getCell(counterRow, 1)
        cell.value = player.percent
        counterRow++
      })

      sheet.getCellByA1('A1').value = 'PLAYER'
      sheet.getCellByA1('B1').value = 'PERCENT'
      sheet.getCellByA1('A1').textFormat = { bold: true }
      sheet.getCellByA1('B1').textFormat = { bold: true }
      sheet.getCellByA1('B1').horizontalAlignment = 'RIGHT'

      await sheet.saveUpdatedCells()
    })
  }

  async function setCells(cellData) {
    await doc.sheetsByIndex[0].updateProperties({ title: 'main' })

    Object.keys(cellData).forEach(async (key) => {
      let thisRaid = [...cellData[key]].shift()
      let sheeTitle = thisRaid.date + '-' + thisRaid.raidname
      let newSheet = await doc.addSheet({ title: sheeTitle })

      let x = cellData[key].length + 2
      let cellRange = 'A1:C' + x.toString()

      // await newSheet.loadCells('A1:C60')
      await newSheet.loadCells(cellRange)
      await newSheet.setHeaderRow([thisRaid.raidname, thisRaid.date])

      newSheet.getCellByA1('B1').numberFormat = { "type": "DATE" }
      newSheet.getCellByA1('A1').textFormat = { bold: true }
      newSheet.getCellByA1('B1').textFormat = { bold: true }
      newSheet.getCellByA1('A1').horizontalAlignment = 'CENTER'
      newSheet.getCellByA1('B1').horizontalAlignment = 'CENTER'


      for (row = 1; row < x; row++) {
        for (col = 1; col < 3; col++) {
          newSheet.getCell(row, col).value = ''
        }
      }

      let outputRow = 2
      cellData[key].forEach((entry) => {
        let cell = newSheet.getCell(outputRow, 0)
        cell.value = entry.value
        cell.horizontalAlignment = 'CENTER'
        outputRow++
      })
      await newSheet.saveUpdatedCells()
    })
    message.author.send(Attendance has been exported to https://docs.google.com/spreadsheets/d/' + sheetID)
  }

  function deleteSheet() {
    return new Promise(async (resolve, reject) => {
      for (key in doc.sheetsById) {
        if (doc.sheetsById[key].title != 'main') {
          await doc.deleteSheet(key)
        }
      }
      resolve(true)
    })
    return promise
  }

  // Counts the occurrences
  const countOccurrences = (arr, val) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0)

  // Calculate percentage
  function percentage(num, total) {
    let x = (num / total) * 100
    return Number(`${Math.round(`${x}e2`)}e-2`)
  }

}