var res = {
    BG_IMAGE: "res/BG-HD.png",
    CLOUD_IMAGE: "res/Cloud-HD.png",
    ROBIN_IMAGE: "res/Robin-HD.png"
};

var g_gamescene = [
    res.BG_IMAGE,
    res.CLOUD_IMAGE,
    res.ROBIN_IMAGE
];

var gs = {
    resolutionWidth: 600,
    resolutionHeight: 600,
    
    kZindexBG: 0,
    kZindexPlatform: 10,
    
    kPlatformSpeedSlow: 35,
    kPlatformSpeedFast: 75,
    
    kPlatformScale: 1,
    
    kPlatformhalfSize: 34,
    
    kSceneStateStopped: 0,
    kSceneStateMovingSlow: 1,
    kSceneStateMovingFast: 2
    
    
}; 

var go = {
    plyer: null,
    platformArray: [],
    sceneState: gs.kSceneStateStopped
}