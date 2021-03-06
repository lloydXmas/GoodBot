# GoodBot

## Getting Started
* Invite GoodBot to your server using the following link: [Invite Link](https://discordapp.com/oauth2/authorize?client_id=525115228686516244&permissions=8&scope=bot)

### Set Up Class & Role Channels
* Use the +setup command -- this will do the following:
  * Create a 'Getting Started' category
  * Create a 'set-your-name' channel, where users can set their in-game nickname.
  * Create a 'set-your-class' channel, where users can set the class the bot will use for their sign-ups.
  * Create a 'set-your-role' channel, where users can set the role the bot will use for their sign-ups.
* Optionally use +setupfaction command -- This will add an additional set-up channel for 'set-your-faction'
* Set a completion role: +setoption completerole Setup // (This is optional, but will add this role to players who have completed the set-up channels)

### Set Up Spreadsheet Export
* Set your spreadsheet ID: +setoption sheet GoogleSheetID // This is covered further in the "Spreadsheet" section.

### Set Up Raid Creation
* Set your raid category: +setoption raidcategory Raid Signups // You can change this to be any category, but please be aware it is case sensitive.
* If you would like different raids to go to different categories:
  * +raidcategory raid categoryName
* Verify that the players that need to be able create raids have 'Manage Channels' permission within the Raid Category.

### Warcraft Logs Setup
* Set your guild's server: +setoption server Server Name
* Set your guild's region: +setoption server US // (or EU, etc)

### Misc
* If you create a channel called 'server-logs', the bot will automatically log all commands & sign-ups to this channel.
* If you create a channel called 'error-logs', the bot will automaticall log all command/signup errors to this channel.
* If you want GoodBot to be able to respond to bot commands, you need to use `+option ignoreBots 0`

## General Commands
```
+archive
  Move the channel to the 'Archives' category, and syncs the permissions with the category

+clean X
  Delete the previous X messages in chat (Note: this does not work on mesages older than 14 days)

+nick Newname
  Set your discord nickname, validated to be an allowed WoW name

+quote
  Display a random quote

+quote add Your quote goes here
  Add the specified quote

+quote list
  List all quotes

+quote remove ID
  Remove the quote with the specified ID

+removeallpins
  Unpin all current pins in the current channel.

+serverid
  The bot will DM you the server's ID

+setup
  Generate the 'Getting Started' channels as outlined above.

+setupfaction
  Generate a channel under 'Getting Started' for choosing faction

+joinmessage message
  Sets a message that will be sent to all new players when they join your discord server.

+archiveold
  Clones the current 'Archives' category (complete with all permissions), then renames the current 'Archives' to 'Archives-Old'

+deletecategory Category Name
  Deletes a channel category and all sub-channels.  **BE VERY CAREFUL WITH THIS, THERE IS NO UNDO BUTTON**

```

## Character Management Commands
```
+alt altName mainName
  Set a character as an alt of your main character.

+info character
  Returns the main and all alts attached to this character, along with signed up raid and resistances.

+resist character type amount
  Set a player's resistance of a type (fire, frost, shadow, nature) to a number for export on spreadsheet.

+resistlist
  Outputs the resistances for all players signed up for a raid.

+set Player class role
  Manually set a player's class and role.  Valid roles are DPS, Tank, Healer, Caster.

+reservehistory character
  Returns a complete history of all items this player has reserved.
```

## Raid Sign-up Commands
```
 
+lineup
  The bot will DM you a link to the page for managing your raid lineup.

+confirmation
  Toggle 'confirmation mode' for a raid.
  
+confirm Player
  Confirms player for the raid (Confirmation mode must be enabled!)

+lock
  Locks a raid, preventing all further signups & reserves.

+unlock
  Unlocks a raid, allowing additional signups & reserves.

+exportsheet
  Attempt to export your spreadsheet to Google Sheets  (Will only work if this has been set up, and bot has permissions)
  This will ping only confirmed players if confirmation mode is enabled.
  
+raid RaidName Mar-21 (title?) (faction?)
  Create a new raid channel under the raid category called mar-21-RaidName

+resistlist
  Sends a DM to the player with the resistances of all signed up players

+rules add RulesName Rules go here
  Add a rule to be displayed later with a name of "RulesName"

+rules RulesName
  Have the bot display rules with the name of "RulesName"

+setcolor #hexCode
  Set the color of the sidebar of the embed

+setdate Date
  Sets the date of the raid

+setdescription New description
  Alter the raid description in the embed

+setleader Leader
  Sets the raid leader of the raid

+addleader Leader
  Adds an additional leader to the raid sign-up

+removeleader Leader
  Removes an additional leader from the raid sign-up (there must always be one!)

+settime Time
  Set the time for the raid start

+settitle New title
  Alter the raid title in the embed

+unconfirm Player
  Unconfirms player for the raid (Confirmation mode must be enabled!)

+unsigned PreviousRaidChannel
  Compare the current lineup to the specified raid, and send a notification to all players not currently signed up.

+remove Player1 Player2 Player3 [...]
  Removes player(s) from sign-ups completely.
```

## Pings
```
+ping raid
  Pings every signed up for a raid

+ping confirmed
  Pings all players who are confirmed for this raid

+unsigned #channel-name
  Pings all players signed up for the original raid, but not this one

+ping class ClassName
  Pings all signed up players of that class

+ping role RoleName
  Pings all signed up players of that role

```

## Soft Reserves
```
  +softreserve
    Toggle a raid to have soft reserve as the loot system (reservable items are keyed off of the selected raid type)

  +reserve CharacterName Full Item Name
    Save a reserve for the specificed item for the specified character name

  +reservelist
    The bot will DM the user a list of all reserves that have been made for this raid, ordered by item name

  +reservelist channel
    The bot will list all reserves that have been made for this raid in the channel

  +reserveitems
    The bot will DM the user a list of all items that are available for reserve for this raid

```

## Configuration Options
```
  +setoption factionrequired 1
    Require a faction when creating a raid and setting a raid category

  +raidcategory raid (faction?) Category Name
    Set a category for a raid to be set up under (for a specific faction, if factionrequired is enabled)
```

## Nexushub Commands
```
+item Item
  Does a fuzzy search for the item string and returns the top result as an embed.

+price Item
  Does a fuzzy search for the item string and returns AH price information for it as an embed.
```


## Warcraft Logs Commands
```
+compare raid1id raid2id
  Generate a side by side comparison of two raids for boss kills, time between bosses, and overall time elasped after each boss.

+gear Player
  Retrieve a player's gear from the last attended raid.  Server defaults to Mankrik, region defaults to US.

+enchants Player
  Lists all enchantable gear a player was wearing during the last raid, and which pieces are enchanted with what.

+logs Guild Name
  Display a list of the last 10 raids uploaded to WarcraftLogs for the guild

+rankings Taunt ?role
  Display a player's best rankings for the specified role.  Roles is defaulted to DPS, Server is defaulted to Mankrik, and region is defaulted to US.  Other role options are HPS or Tank.

+report raidid
  Retrieve basic information about a Warcraft Logs Report  
```

## EPGP Commands
```
+history Player
  Pull a player's EPGP history as recorded by uploaded EPGP files
  
+standings Class
  Retrieve a list of all players of specified class with current EPGP standings

+uploads 
  Lists all EPGP uploads for your server

+uploads Date
  Outputs an EPGP upload as a Lua table
```

## Raid Signups
* All players need to have a class and role set up to be able to sign up for raids.  Once that's done, the player can use the :thumbsup: :thumbsdown: or :shrug: emojis directly under the sign-up list to sign up for the raid.
* A player's class and role can be manually set using the +set command:
  * `+set Taunt warrior tank`
* A player can sign up an alt, or another player by using +, - or m, followed by the player's name
```  
  + Tagalong
  m Tagalong
  - Tagalong
```

## Music Bot
```
+play youtubeURL
  Plays/Queues the song to be played

+skip
  Skips the current track

+stop
  Stops the bot from playing, and clears the queue

+volume 1-200
  Sets the volume to a percentage (1% -> 200%)

+np
  Displays the name of the song currently playing

+queue
  Displays the current queue
```

## Guild Listings
```
+guild guild add <faction> <guild name>
  Add a guild

+guild guild remove <faction> <guild name>
  Remove a guild

+guild gm add <guildID> <gm1> <gm2?> ...
  Add a guild master

+guild gm remove <guildID> <gm1> <gm2?> ...
  Remove a guild master

+guild officer add <guildID> <officer1> <officer2?> ...
  Add officer(s)

+guild officer remove <guildID> <officer1> <officer2?> ...
  Remove officer(s)

+guild info <guild name>
  Retrieve a guild's ID

+guild list <faction?> <serverID?>
  Display a guild listing, including both factions or a single one.  
  ServerID can be used to retrieve listings from another discord server.
```

## Spreadsheets
```
Spreadsheet export can be set up by providing the bot access to a Google Sheet.

An example sheet can be found here: https://docs.google.com/spreadsheets/d/1KJz86pYn7rHx1Aru9Uc2xcTwl-QZrxJb8_4BRRkapZs

All sign-ups are exported to the first page of the spreadsheet, by column.  Export begins on the third row.

Columns:
		warrior tank => 1
		warrior dps => 2
		hunter dps => 3
		rogue dps => 4
		mage caster => 5
		warlock caster => 6
		priest healer => 7
		paladin healer => 8
		druid healer => 9
		druid caster => 10
		druid dps => 11
		priest caster => 12
		paladin dps => 13
		paladin tank => 14
		shaman dps => 15
		shaman caster => 16
		shaman healer => 17
		dk dps => 18
		dk tank => 19
 		monk dps => 20
  	  	monk tank => 21
    		monk healer => 22
    		dh dps => 23
    		dh tank => 24
```
To set up your spreadsheet:
* The sheet must be shared with discord@api-project-483394155093.iam.gserviceaccount.com																								
* Set your server's sheet ID using: +setoption sheet SheetID // In the example above, sheetID would be 1mH9UD5luAV3YiSy4OCuzw1Lbd5xe0eF4VCYp013h7eo
* Export your sheet using `+exportsheet` within a raid channel.

## EPGP Import
```
The bot is set up to allow players to upload their EPGP standings from GoodEPGP for viewing & usage on their discord server.

GoodEPGP can be found here:
https://www.curseforge.com/wow/addons/goodepgp


```
To set up:
* Create a channel called "Standings".  The bot will automatically display your EPGP standings here when they're updated.

To upload your standings:
* /reload your game, or log out.  (This writes to your savedVariables file)
* Use +serverid to retrieve the ID of your discord server
* Go to http://upload.setback.me/
  * Enter your Server ID
  * Choose your GoodEPGP.lua file from inside your SavedVariables folder
  * Click Upload

## Attendance

The easiest way to manage attendance is by using `+att-addconf`. This records all confirmed players for a given raid as attending. The raid leader can manage confirmations and standbys as usual leading up to a raid, and *after* the raid is formed, use `+confirm` or `+unconfirm` to reflect those in attendance, and finalize with `+att-addconf`. 

When a player is recorded for attending, GoodBot adds a checkmark next to their name in the raid  channel's embed. Further modification to the attendance can be done with the following commands:

```
+att-add [player]
+att-remove [player]
```

These commands add or remove a player (or a comma separated list of players) to the database. If all players are removed from a given raid record, that raid's ID is no longer in the database and will not be counted when exporting players' overall attendance. 

Exporting results to Google spreadsheet is done with `+att-export`. The spreadsheet will lose all of its data when run. A raid leader may want to quickly check raid attendance without exporting a spreadsheet. Running `+att-query percent` will return a message with players and their attendance percentage.  



```
+att-addconf
  Add all confirmed players to the database
  
+att-add [player]
  Add player or list of players
  
+att-remove [player]
  Remove player or list of players
  
+setoption att-sheet SheetID
  Set Google Spreadsheet ID for attendance exports
  
+att-export 
  Export records to spreadsheet
  
+att-query percent
  Query players' attendance percentages
  
+att-query raid
  Query raid ID's
  
+att-removeid [id]
  Remove a raid ID (or ID's) from database
  
```

