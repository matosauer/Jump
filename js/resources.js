
var g_assets = {
    IMG_BG: "assets/bgr400x600.png",
    IMG_PLATFORM: "assets/platform1.png",
    IMG_ACTOR: "assets/actor.png"
};

var g_settings = {
    ZINDEX_BG: 0,
    ZINDEX_PLATFORM: 10,
    ZINDEX_ACOT: 20,
    
    SCENE_STATE_STOPPED: 0,
    SCENE_STATE_RUNNING: 1,
    SCENE_STATE_RUNNING_FAST: 2,
    SCENE_STATE_RUNNING_FLASH: 3,
    
    SPEED_0: 0,
    SPEED_1: 150,
    SPEED_2: 250,
    SPEED_3: 400,
    
    PLATFORM_TYPE_1: 1
};

g_settings.platform_1 =
{
    width: 80,
    height: 20
}

var g_resources = [];
for (var i in g_assets) {
    g_resources.push(g_assets[i]);
};
