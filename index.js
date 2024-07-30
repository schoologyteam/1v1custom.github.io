const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
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
    res.json(
        JSON.parse(fs.readFileSync('db.json', 'utf-8'))
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
        dbJson.Skins.EquippedEmotes = emotes;
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
        if (!Array.isArray(emotes)) {
            return res.status(400).send({ error: 'Invalid pickaxe data' });
        }
        dbJson.Skins.EquippedWeaponSkins = pickaxe;
        let dbJsonStr = JSON.stringify(dbJson, null, 2);
        fs.writeFileSync('db.json', dbJsonStr);
        res.status(200).send('true');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to update pickaxe' });
    }
});
app.listen(80);