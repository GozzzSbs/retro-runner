window.PokiSDK = {
    init: function() {
        return Promise.resolve();
    },

    gameLoadingStart: function() {
        return Promise.resolve();
    },

    gameLoadingProgress: function() {
        return Promise.resolve();
    },

    gameLoadingFinished: function() {
        return Promise.resolve();
    },

    gameplayStart: function() {
        return Promise.resolve();
    },

    gameplayStop: function() {
        return Promise.resolve();
    },

    commercialBreak: function() {
        return Promise.resolve();
    },

    rewardedBreak: function() {
        return Promise.resolve(true);
    },

    togglePlayerAdvertisingConsent: function() {
        return Promise.resolve();
    },

    setPlayerAge: function() {
        return Promise.resolve();
    },

    setDebug: function() {},

    customEvent: function() {},

    displayAd: function() {
        return Promise.resolve();
    },

    shareable: function() {
        return Promise.resolve(false);
    }
};
