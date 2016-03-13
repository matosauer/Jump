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
        
        this.clearPlatofrms();
        
        var topPos = this.basePlatformPos();
        this.addNextPlatform(topPos);
        
        for(var i=0; i<5; i++){
            topPos = this.nextPlatformPos(topPos);
            this.addNextPlatform(topPos);
        }
        
    },
    
    basePlatformPos: function(){
        
        var size = cc.director.getWinSize();
        
        var pos = 
            {
                x: size.width / 2,
                y: 100
            };
        
        return pos;
    },
    
    topPlatformPos: function(){
        
        var topPos = 
            {
                x: 0,
                y: 0
            };
    
        for(var i = 0; i < this.platforms.length; i++){
            if (this.platforms[i].getPosition().y > topPos.y){
                topPos = this.platforms[i].getPosition();
            }
        }
                                
        return topPos;
    },
    
    nextPlatformPos: function(prevPos){
        
        var size = cc.director.getWinSize();
        
        //var xPos = Math.floor(Math.random() * size.width) + min;
        //var xPos = Math.floor(Math.random() * (size.width - g_settings.platform_1.w)) + g_settings.platform_1.w/2;
        
        var maxVerDistance = 10;  //depends on level?
        var minVerOffset = 50; //depends on level?
        var verMargin = g_settings.platform_1.h / 2;
        var yPos = prevPos.y + minVerOffset + (maxVerDistance / 2 - Math.floor(Math.random() * maxVerDistance));
        
        var maxHorDistance = 100;  //depends on level?
        var minHorOffset = 0;
        var horMargin = g_settings.platform_1.w / 2;
        var xPos = prevPos.x + minHorOffset + (maxHorDistance / 2 - Math.floor(Math.random() * maxHorDistance));
        
		if (xPos < horMargin) {
            xPos = horMargin;
        } else if (xPos > size.width - horMargin) {
            xPos = size.width - horMargin;
        }
        
        var pos = 
            {
                x: xPos,
                y: yPos
            };
        
        return pos;
    },
    
    addNextPlatform: function(pos){
        
        var platform = new Platform(g_assets.IMG_PLATFORM);
        platform.setPosition(pos.x, pos.y);
        this.addChild(platform, g_settings.ZINDEX_PLATFORM);
        
        this.platforms.push(platform);
        
        return platform;
    },
    
    clearPlatofrms: function(){
        
        while(this.platforms.length > 0) {
            var platform = this.platforms.pop();
            platform.removeFromParent();
        }
        
    },
    
    removePlatform: function(platform){
        //A.splice(0,A.length)
    
    }
    
    
});