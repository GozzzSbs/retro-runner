window.PokiSDK = {
init:()=>Promise.resolve(),
gameLoadingStart:()=>Promise.resolve(),
gameLoadingProgress:()=>Promise.resolve(),
gameLoadingFinished:()=>Promise.resolve(),

gameplayStart:()=>Promise.resolve(),
gameplayStop:()=>Promise.resolve(),

commercialBreak:()=>Promise.resolve(),
rewardedBreak:()=>Promise.resolve(true),

togglePlayerAdvertisingConsent:()=>Promise.resolve(),
setPlayerAge:()=>Promise.resolve(),

displayAd:()=>Promise.resolve(),
destroyAd:()=>Promise.resolve(),

isAdBlocked:()=>false,

getLeaderboard:()=>Promise.resolve([]),
shareable:()=>Promise.resolve(false),

setDebug:()=>{},
customEvent:()=>{}
};
