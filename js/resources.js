
var g_assets = {
    IMG_BG: "assets/bgr400x600.png",
    IMG_PLATFORM: "assets/platform1.png",
    IMG_ACTOR: "assets/actor.png"
};

var g_settings = {
    ZINDEX_BG: 0,
    ZINDEX_PLATFORM: 10,
    ZINDEX_ACOT: 20
};

g_settings.platform_1 =
{
    w: 80,
    h: 20
}


var g_resources = [];
for (var i in g_assets) {
    g_resources.push(g_assets[i]);
};
