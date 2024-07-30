var express = require("express");
var app = express();
var fs = require('fs')
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
        {
            "GeneralData": {
              "ID": "randomidlol",
              "Nickname": "user",
              "Country": "",
              "Region": "",
              "IsMigrated": false,
              "BoxRating": 0,
              "DuosRating": 0,
              "Elo": 1351,
              "OpenskillModel": {
                "Ranking": 50.85468753378335,
                "RatingData": {
                  "sigma": 3.55172646878418,
                  "mu": 61.509866940135886
                }
              },
              "SoftCurrency": 0,
              "CustomRating": 974,
              "HardCurrency": 11805,
              "LoLTokens": 51,
              "CreatedAt": "2023-08-28T14:11:35.913Z",
              "Logins": {
                "LastLoginTime": 1722355479468,
                "CurrentLoginTime": 1722355917178,
                "TotalLogins": 239,
                "DailyConsecutiveLogins": 1
              },
              "Stats": {
                "TotalGamesPlayed": 420,
                "TotalKills": 420,
                "TotalDeaths": 0,
                "Victories": {
                  "Showdown": 9999,
                  "Showdown_Duos": 9999,
                  "GrandBattleRoyale": 9999,
                  "GrandBattleRoyale_Duos": 9999,
                  "1v1_Competitive_Migration": 9999,
                  "1v1_Migration": 9999,
                  "1v1_Clash": 9999
                },
                "Defeats": {
                  "Showdown": 0,
                  "GrandBattleRoyale": 0,
                  "GrandBattleRoyale_Duos": 0,
                  "1v1_Competitive_Migration": 0,
                  "1v1_Migration": 0
                },
                "Ties": {
                  "1v1_Competitive_Migration": 0,
                  "1v1_Migration": 0
                },
                "ConsecutiveWins": 5
              },
              "PrivacySettings": {
                "HasSeenTailoredAdsPopup": false,
                "HasAcceptedTailoredAds": false
              },
              "Premium": {
                "AdsDisabled": false,
                "LTV": 0,
                "DidMigrateAdsDisabled": true
              },
              "NonconsumablePacks": [],
              "XP": 99999999,
              "RVData": {
                "Watched": 0,
                "CurrentSkin": "",
                "LastRvSkinTime": "1970-01-01T00:00:00.000Z"
              },
              "MatchHistory": {
                "MatchSampleTimestamp": 1722350646938,
                "MatchesSinceSample": 1,
                "Exceeds": 0
              },
              "FriendInviteLink": {},
              "AgeGate": {
                "IsUnderage": false,
                "GuardianPermissionGranted": [],
                "ShouldShowUpdatedPermissionsPopup": false
              }
            },
            "Settings": {
              "Controls": {
                "WebGL_MusicVolumeSlider": "0"
              },
              "SettingsVersion": 2
            },
            "Skins": {
              "EquippedChampionSkins": {},
              "CharacterSkins": [
                "lol.1v1.playerskins.pack.quick.default"
              ],
              "EquippedWeaponSkins": [
                "lol.1v1.weaponskins.melee.pickaxe.default",
              ],
              "EquippedCharacterSkin": "lol.1v1.playerskins.pack.quick.default",
              "OwnedEmotes": [
                "lol.1v1.playeremotes.pack.1",
                "lol.1v1.playeremotes.pack.2",
                "lol.1v1.playeremotes.pack.3",
                "lol.1v1.playeremotes.pack.4",
                "lol.1v1.playeremotes.pack.5",
                "lol.1v1.playeremotes.pack.6",
                "lol.1v1.playeremotes.pack.7",
                "lol.1v1.playeremotes.pack.8",
                "lol.1v1.playeremotes.pack.9",
                "lol.1v1.playeremotes.pack.10",
              ],
              "EquippedEmotes": [
                "lol.1v1.playeremotes.pack.1",
                "lol.1v1.playeremotes.pack.2",
                "lol.1v1.playeremotes.pack.3",
                "lol.1v1.playeremotes.pack.4",
                "lol.1v1.playeremotes.pack.5",
                "lol.1v1.playeremotes.pack.6",
                "lol.1v1.playeremotes.pack.7",
                "lol.1v1.playeremotes.pack.8",
                "lol.1v1.playeremotes.pack.9",
                "lol.1v1.playeremotes.pack.10",
                null,
                null
              ],
              "WeaponSkins": [
                "lol.1v1.weaponskins.melee.pickaxe.default",
                "lol.1v1.weaponskins.melee.pickaxe.candycane"
              ],
              "CompensationVersion": 1
            },
            "BattlePass": {
              "Seasons": {
                
              },
              "XPBankData": {
                "LastXPRefreshTimestamp": 1696783346662,
                "XPLeft": -480
              }
            },
            "TrophyRoad": {
              "Seasons": {}
            },
            "RankRoad": {
              "Seasons": {
              },
              "AccountRoad": {
                "XP": 0,
                "HighestXP": 0,
                "AvailableRewards": [],
                "ClaimedRewards": [
                  
                ]
              }
            },
            "DailyRewards": {
              "Rewards": [],
              "InfluencerCampaign": {
                "LastSkinClaimTimestamp": 0
              }
            },
            "Equipment": {
              "Equipment": {
                "lol.1v1.weapons.pump_shotgun": {
                  "Level": 1
                },
                "lol.1v1.weapons.scar": {
                  "Level": 1
                },
                "lol.1v1.armors.body.basic": {
                  "Level": 2
                },
                "lol.1v1.weapons.military_sniper": {
                  "Level": 5
                },
                "lol.1v1.armors.body.recovery": {
                  "Level": 1
                },
                "lol.1v1.armors.body.medic": {
                  "Level": 1
                },
                "lol.1v1.weapons.9mmpistol": {
                  "Level": 1
                }
              },
              "Loadouts": [
                {
                  "LoadoutName": "",
                  "EquippedArmor": [
                    ""
                  ],
                  "EquippedWeapons": [
                    "lol.1v1.weapons.scar",
                    "lol.1v1.weapons.pump_shotgun",
                    "lol.1v1.weapons.military_sniper"
                  ],
                  "EquippedBuildsMaterial": [
                    ""
                  ]
                }
              ],
              "EquippedLoadout": 0,
              "AvailableLoadouts": 2,
              "AvailableWeaponSlots": 3,
              "AvailableArmorSlots": 1,
              "UpgradeCards": {
                "lol.1v1.weapons.scar": 99,
                "lol.1v1.armors.body.basic": 222,
                "lol.1v1.armors.body.medic": 28,
                "lol.1v1.armors.body.recovery": 49,
                "lol.1v1.weapons.pump_shotgun": 205,
                "lol.1v1.weapons.9mmpistol": 38,
                "lol.1v1.weapons.military_sniper": 39
              }
            },
            "Inventory": {
              "LootBoxes": [
                {
                  "LootBoxId": "lol.1v1.lolbox.capsule_silver_plus",
                  "LootBoxLevel": 4,
                  "LootBoxGuid": "ba7023b8-3220-794d-6bc6-393b744b4103"
                },
                {
                  "LootBoxId": "lol.1v1.lolbox.capsule_silver_plus",
                  "LootBoxLevel": 2,
                  "LootBoxGuid": "d44bb123-f186-8d34-cb1d-18feeeaba3eb"
                },
                {
                  "LootBoxId": "lol.1v1.lolbox.capsule_silver_plus",
                  "LootBoxLevel": 4,
                  "LootBoxGuid": "79073865-d247-bfda-fd31-0fc0144ecae6"
                }
              ],
              "Spins": [],
              "LootBoxesQueue": [],
              "MaxLootBoxesQueues": 1,
              "CachedRewards": {}
            },
            "Challenges": {
              "CurrentFetchTime": 1722355200000,
              "LastFetchTime": 1722355200000,
              "LastDailyBonusClaimTime": 1697385600000,
              "CurrentStreak": 0,
              "DidClaimStreakBonus": false,
              "DidClaimDailyBonus": false,
              "DailyChallengesData": {
              },
              "SeasonalChallengesData": {
              }
            },
            "Offers": {
              "Tier": 0,
              "Timestamp": "2023-08-28T14:11:36.082Z",
              "Offers": {
              }
            },
            "Leaderboards": {
              "Nickname": "",
              "Leaderboards": {},
              "IsBlacklisted": false
            },
            "Subscriptions": {
              "Subscriptions": {}
            },
            "ProgressionEvents": {
              "Events": {}
            },
            "UserRV": {
              "BoxTimeCutter": {
                "LastRefreshTime": 1722355917571,
                "RVsLeft": 3
              },
              "HighValueRVOffer": {
                "LastRefreshTime": 1722355917571,
                "RVsLeft": 3
              }
            },
            "Champions": {
              "OwnedChampions": {
                "lol.1v1.champions.quick": {
                  "Level": 1
                },
                "lol.1v1.champions.tron": {
                  "Level": 0
                },
                "lol.1v1.champions.jade": {
                  "Level": 0
                },
                "lol.1v1.champions.frosty": {
                  "Level": 0
                }
              },
              "SelectedChampion": "lol.1v1.champions.frosty",
              "ChampionShards": {
                "lol.1v1.champions.quick": 120,
                "lol.1v1.champions.tron": 187,
                "lol.1v1.champions.jade": 146
              }
            },
            "DailyModes": {
              "DailyModes": {}
            },
            "UserAlbumsData": {
              "UserAlbums": {
                "lol.1v1.album.dragon_lab": {
                  "Occurences": {
                    "wowie2222": {
                      "ClaimedPrize": false,
                      "UserSets": {
                        
                      }
                    }
                  }
                }
              }
            },
            "PsfToken": "",
            "DevicePerformanceTier": 0
          }
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
app.listen(80);