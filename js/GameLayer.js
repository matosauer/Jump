var GameLayer = cc.Layer.extend({
    
    platforms: [],
    
	ctor: function() {
		this._super();
		this.init();
	},
    
	init: function() {
        this.addBackground();
    
        this.initPlatforms();
        
        //this.scheduleUpdate();
    },
    
    addBackground: function(){
    	var size = cc.director.getWinSize();
		var bgSprite = cc.Sprite.create(g_assets.IMG_BG);
		bgSprite.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgSprite, g_settings.ZINDEX_BG);
    },
    
    update: function(dt){
        //console.log(dt);
    },
    
    initPlatforms: function(){
        
        for(var i=0; i<1; i++){
            this.addNextPlatform();        
        }

    },
    
    addTopPlatform: function(){
        
        var platform = cc.Sprite.create(g_assets.IMG_PLATFORM);
		platform.setPosition(100, 100);
		this.addChild(platform, g_settings.ZINDEX_PLATFORM);
        
    },
    
    removePlatform: function(platform){
    
    
    }
    
    
});