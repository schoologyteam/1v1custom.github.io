const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Console } = require('console');
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
function calculateTrophies(placement, trophiesForFirstPlace, trophiesForFourteenthPlace, totalPlaces) {
    if (placement < 1 || placement > totalPlaces) {
        throw new Error("Placement is out of range.");
    }
    return trophiesForFirstPlace + Math.round((placement - 1) / (totalPlaces - 1) * (trophiesForFourteenthPlace - trophiesForFirstPlace));
}
app.get("/v4710_remoteConfig/fetch",(req,res)=>{
    fs.readFile('./RemoteConfig.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        const info = JSON.parse(data);
        res.json(info);
      });
});
app.post("/v4710_battePass/getActivePassConfig",(req,res)=>{
    res.json({"banner_image":{"image_data_type":"Url","image_data":{"url":"https://justplay-cdn.playtika.com/justbuild/1v1Images/Automations/Seasons/AquaRealm/logo512.png"}},"premium_popup_config":{"background_image":{"image_data_type":"Url","image_data":{"url":"https://justplay-cdn.playtika.com/justbuild/1v1Images/Automations/Seasons/AquaRealm/Web_ActivatePopup.jpg"}}},"is_timer_visible":true,"display_new_bp_popup":false,"BackgroundImage":{"image_data_type":"Url","image_data":{"url":"https://justplay-cdn.playtika.com/justbuild/1v1Images/Automations/Seasons/AquaRealm/BG.jpg"}},"LobbyButtonImage":{"image_data_type":"Url","image_data":{"url":"https://i.ibb.co/hf2k26T/image.png"}},"activate_button_action":{"Actions":[{"ActionName":"PopUp","ActionValues":{"popup_type":"subscription","product_id":"lol.1v1.subscription.basic"}}]},"battle_pass":{"placement_xp":[10,3],"tiers":[{"xp":0,"is_premium_unique":false,"free_rewards":["lol.1v1.lolbox.ultra"],"premium_rewards":["lol.1v1.lolbox.ultra"],"tier_up_price":420}],"currentSeason":"0","battlePassId":"0"},"current_season":"0","start_date":"2024-07-15T21:00:00.059Z","end_date":"2137-08-14T21:00:00.496Z"})
});
app.post("/v4710_albums/getActiveAlbumConfig",(req,res)=>{
    res.status(204);
})
app.get("/v4710_challenges/getChallengesData",(req,res)=>{
    res.json({});
})
app.get("/v4710_player/getRegionInfo",(req,res)=>{
    res.json({"Country":"US","Region":"CA","AgeGateLimit":13,"HasAgeGate":true,"IsBlocked":false});
})
app.get("/v4710_player/login",(req,res)=>{
    const info = JSON.parse(fs.readFileSync('db.json', 'utf-8'))
    let dat = fs.readFileSync("AccountRoad.json");
    const data2 = JSON.parse(dat);
    info.RankRoad.AccountRoad.AvailableRewards = data2
    res.json(
        info
    )
})
app.get("/v4710_userSettings/time",(req,res)=>{
    res.send("\"Tue, 30 Jul 2024, 19:50:25\"");
})
app.get("/v4710_leaderboards/getLeaderboardsData",(req,res)=>{
    res.json({});
})
app.get("/v4710_battlePass/refreshBattlePass",(req,res)=>{
    res.json({"Seasons":{},"XPBankData":{"LastXPRefreshTimestamp":1696783346662,"XPLeft":-480}});
})
app.get("/v4710_friends",(req,res)=>{
    res.json({"Friends": []});
})
app.get("/v4710_friends/friendData",(req,res)=>{
    res.json({});
})
app.post("/v4710_player/emotes/character/update", (req, res) => {
    try {
        let db = fs.readFileSync('db.json', 'utf-8');
        let dbJson = JSON.parse(db);
        const emotes = JSON.parse(req.body.emotes).data;
        if (!Array.isArray(emotes)) {
            return res.status(400).send({ error: 'Invalid emotes data' });
        }
        
        let newemotes = [...emotes.slice(0, 8), ...Array(8).fill(null)].slice(0, 8);
        dbJson.Skins.EquippedEmotes = newemotes;
        let dbJsonStr = JSON.stringify(dbJson, null, 2);
        fs.writeFileSync('db.json', dbJsonStr);
        res.status(200).send('true');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update emotes' });
    }
});
app.post("/v4710_player/skins/character/equip/weapon", (req, res) => {
    try {
        let db = fs.readFileSync('db.json', 'utf-8');
        let dbJson = JSON.parse(db);
        const pickaxe = JSON.parse(req.body.ids);
        if (!Array.isArray(pickaxe)) {
            return res.status(400).send({ error: 'Invalid pickaxe data' });
        }
        dbJson.Skins.EquippedWeaponSkins = pickaxe;
        let dbJsonStr = JSON.stringify(dbJson, null, 2);
        fs.writeFileSync('db.json', dbJsonStr);
        res.status(200).send(req.body.ids);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update pickaxe' });
    }
});
app.post("/v4710_champions/equip",(req,res)=>{
    let db = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(db);
    let champion = req.body.championId;
    dbJson.Champions.SelectedChampion = champion;
    let dbJsonStr = JSON.stringify(dbJson, null, 2);
    fs.writeFileSync('db.json', dbJsonStr);
    res.send("true");
})
app.get("/v4710_player/updateProgressAndStats",(req,res)=>{
    let db = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(db);
    const matchSummary = JSON.parse(req.query.matchSummary);
    let trophies = calculateTrophies(matchSummary.Placement,20,4,16);
    
    if(matchSummary.ModeName == "Showdown_Duos")
    {
        trophies = trophies + matchSummary.KillCount + matchSummary.TeamKills;
    }
    if(matchSummary.ModeName == "Showdown")
    {
        trophies = trophies + matchSummary.KillCount;
    }
    console.log("Given "+trophies+" trophies to player")
    if(matchSummary.MatchResult == "win")
    {
        if(matchSummary.ModeName == "Showdown_Duos")
        {
            dbJson.GeneralData.Stats.Victories.Showdown_Duos++;
        }
        if(matchSummary.ModeName == "Showdown")
        {
            dbJson.GeneralData.Stats.Victories.Showdown++;
        }
        if(matchSummary.ModeName == "1v1_Clash")
        {
            dbJson.GeneralData.Stats.Victories["1v1_Clash"]++;
        }
        
    }
    if(matchSummary.MatchResult != "win")
        {
            if(matchSummary.ModeName == "Showdown_Duos")
            {
                dbJson.GeneralData.Stats.Defeats.Showdown++;
            }
            if(matchSummary.ModeName == "Showdown")
            {
                dbJson.GeneralData.Stats.Defeats.Showdown++;
            }

        } 
    dbJson.GeneralData.Stats.TotalKills+=matchSummary.KillCount;
    dbJson.GeneralData.Stats.TotalDeaths+=matchSummary.DeathCount;
    dbJson.RankRoad.AccountRoad.XP+=trophies;
    if(dbJson.RankRoad.AccountRoad.XP > dbJson.RankRoad.AccountRoad.HighestXP)
        dbJson.RankRoad.AccountRoad.HighestXP = dbJson.RankRoad.AccountRoad.XP;
    let dbJsonStr = JSON.stringify(dbJson, null, 2);
    fs.writeFileSync('db.json', dbJsonStr);
    res.json(dbJson)
})
app.post("/v4710_rankRoad/claimRoadReward", (req, res) => {
    let db = fs.readFileSync('db.json', 'utf-8');
    let dbJson = JSON.parse(db);
    var rewardID = req.body.rewardID;
    const newReward = {"ProductID": rewardID};
    if (!dbJson.RankRoad.AccountRoad.ClaimedRewards) {
        dbJson.RankRoad.AccountRoad.ClaimedRewards = [];
    }
    
    const json2 = JSON.parse(fs.readFileSync("./Helpers/Champions.json","utf-8"))
    let claimedReward = {}
    if(rewardID.includes("lolbox"))
    {
        // handle box opening
        claimedReward = 
            [
                {
                    "Amount":  Math.floor(Math.random() * 3000),
                    "RewardType": "LOLCoins"
                },
            ]
        for(let i = 0; i < 4;i++)
        {
            let rand = Math.floor(Math.random() * json2.length);
            if(dbJson.Champions.OwnedChampions[json2[rand]] != null)
            {    
                let shards = Math.floor(Math.random() * 200);
                claimedReward.push({"ProductID":json2[rand],"RewardType":"Blueprints","Amount":shards})
                dbJson.Champions.ChampionShards[json2[rand]] += shards;
            } else {
                i--;
            }
        }
        if(Math.random() < 0.5)
        {
            if(dbJson.Champions.OwnedChampions.length === json2.length)
            {
                console.log("Skipping Champion drop because user already has every champion")
                
            } else {
                let rand = Math.floor(Math.random() * json2.length);
                while(dbJson.Champions.OwnedChampions[json2[rand]] != null)
                {
                    console.log("Wanted to give "+json2[rand]+" but user already has it")
                    rand = Math.floor(Math.random() * json2.length);
                }
                claimedReward.push({"ProductID":json2[rand],"RewardType":"Product","Amount":Math.floor(Math.random() * 200)})    
                let name = json2[rand];
                dbJson.Champions.OwnedChampions[name] = { "Level": 0 };
                dbJson.Champions.ChampionShards[name] = 0;
                
            }
        }
        
    } else {
        // handle normal response like gems
        claimedReward = [dbJson.RankRoad.AccountRoad.AvailableRewards.find(reward => reward.ProductID === rewardID)];

        if (dbJson.RankRoad.AccountRoad.AvailableRewards.find(reward => reward.RewardType === "LOLTokens")) {
            let lolTokensReward = dbJson.RankRoad.AccountRoad.AvailableRewards.find(reward => reward.RewardType === "LOLTokens");
            dbJson.GeneralData.LOLTokens += lolTokensReward.Amount;
        }

        if (dbJson.RankRoad.AccountRoad.AvailableRewards.find(reward => reward.RewardType === "LOLCoins")) {
            let lolCoinsReward = dbJson.RankRoad.AccountRoad.AvailableRewards.find(reward => reward.RewardType === "LOLCoins");
            dbJson.GeneralData.LOLCoins += lolCoinsReward.Amount;
        }

    }
    
    dbJson.RankRoad.AccountRoad.ClaimedRewards.push(newReward);
    let dbJsonStr = JSON.stringify(dbJson, null, 2);
    fs.writeFileSync('db.json', dbJsonStr);
    if (claimedReward) {
        res.json(claimedReward);
    } else {
        res.status(404).json({ error: "Reward not found" });
    }
});
app.listen(80);