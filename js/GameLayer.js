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
    
    topPosPlatform: function(){
        var top = 0;
    
        for(var i=0; i < this.platforms.length; i++){
            if (this.platforms[i].getPosition().y > top){
                top = this.platforms[i].getPosition().y;
            }
        }
                                
        return top;
    },
    
    addNextPlatform: function(){
        
        var yDistance = 100;
        
        var yPos = yDistance + this.topPosPlatform();
        
		var xPos = 100;
        
        var platform = new Platform(g_assets.IMG_PLATFORM);
        platform.setPosition(xPos, yPos);
        this.addChild(platform, g_settings.ZINDEX_PLATFORM);
        
        this.platforms.push(platform);
        
        
        var t = this.topPosPlatform();
        
        console.log(t);
        
    },
    
    removePlatform: function(platform){
    
    
    }
    
    
});