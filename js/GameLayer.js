var GameLayer = cc.Layer.extend({
    
    sceneState: g_settings.SCENE_STATE_STOPPED,
    platformsSpeed: g_settings.SPEED_1,
    
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
    
    onEnter:function() {
		this._super();
        
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan
			//onTouchMoved: this.onTouchMoved,
			//onTouchEnded: this.onTouchEnded
		}, this);
		
		//this.schedule(this.onTick);
        this.schedule(this.update);
        //this.scheduleUpdate();
    },
    
    onTouchBegan:function(touch, event) {
		var tp = touch.getLocation();
		var tar = event.getCurrentTarget();
        
        if (tar.sceneState == g_settings.SCENE_STATE_STOPPED){
            tar.sceneState = g_settings.SCENE_STATE_RUNNING;
            tar.setSpeed(g_settings.SPEED_1);
            
        } else if (tar.sceneState == g_settings.SCENE_STATE_RUNNING){
            tar.sceneState = g_settings.SCENE_STATE_RUNNING_FAST;
            tar.setSpeed(g_settings.SPEED_2);
            
        } else if (tar.sceneState == g_settings.SCENE_STATE_RUNNING_FAST){
            tar.sceneState = g_settings.SCENE_STATE_RUNNING_FLASH;
            tar.setSpeed(g_settings.SPEED_3);
                
        } else{
            tar.sceneState = g_settings.SCENE_STATE_STOPPED;
        }
        
		//console.log('onTouchBegan:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
        //console.log(this.sceneState);
		
		return false;
	},
    
    addBackground: function(){
    	var size = cc.director.getWinSize();
		var bgSprite = cc.Sprite.create(g_assets.IMG_BG);
		bgSprite.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgSprite, g_settings.ZINDEX_BG);
    },
    
    update: function(dt){
        //console.log(dt);
        
        if (this.sceneState == g_settings.SCENE_STATE_RUNNING ||
            this.sceneState == g_settings.SCENE_STATE_RUNNING_FAST ||
            this.sceneState == g_settings.SCENE_STATE_RUNNING_FLASH
           )
        {
            this.updatePlatforms(dt);        
        }
    },
    
    updatePlatforms: function(dt){
        
        //Move existed
        for(var i = this.platforms.length - 1; i >= 0; i--){
            var platform = this.platforms[i];
            platform.y -= platform.pixelsPerSecond * dt;
            
            if (platform.y < 0){
                this.removePlatformAt(i);
                //console.log("remove, total " + this.platforms.length);
            }
        }
        
        //Add new platform when neccessary
        var nextMinOffset = 50; //Depend on level
        
        var size = cc.director.getWinSize();
        var topRect = this.topPlatformRect();
        
        if (size.height - topRect.origin.y + topRect.height / 2 > nextMinOffset){
            
            //Depend on level
            var nextPos = this.nextPlatformPos(topRect.origin, g_settings.platform_1);
            this.addNextPlatform(nextPos, g_settings.PLATFORM_TYPE_1, this.platformsSpeed, g_settings.platform_1);
        
            //console.log("add, total " + this.platforms.length);
            //console.log(this.platformsSpeed);
        }
    },
    
    setSpeed: function(speed){
        
        this.platformsSpeed = speed;
        
        for(var i = 0; i < this.platforms.length; i++){
            this.platforms[i].setSpeed(speed);
        }
        
        //console.log("set speed " + speed);
    },
    
    initPlatforms: function(){
        
        var size = cc.director.getWinSize();
        
        this.clearPlatforms();
        
        var topPos = this.basePlatformPos();
        this.addNextPlatform(topPos, g_settings.PLATFORM_TYPE_1, g_settings.SPEED_1, g_settings.platform_1);
        
        topPos = this.nextPlatformPos(topPos, g_settings.platform_1);
        
        var i = 0;
        while(topPos.y + g_settings.platform_1.height / 2 < size.height && i < 20){
            this.addNextPlatform(topPos, g_settings.PLATFORM_TYPE_1, g_settings.SPEED_1, g_settings.platform_1);
            topPos = this.nextPlatformPos(topPos, g_settings.platform_1);
            i++;
        }
    },
    
    basePlatformPos: function(){
        var size = cc.director.getWinSize();
        
        var pos = 
            {
                x: size.width / 2,
                y: 50
            };
        
        return pos;
    },
    
    /*
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
    */
    
    topPlatformRect: function(){
        var topRect = 
            {
                origin:
                {
                    x: 0,
                    y: 0
                },
                width: 0,
                height: 0
            };
    
        for(var i = 0; i < this.platforms.length; i++){
            if (this.platforms[i].getPosition().y > topRect.origin.y){
                topRect.origin = this.platforms[i].getPosition();
                topRect.width = this.platforms[i].rectWidth;
                topRect.height = this.platforms[i].rectHeight;
            }
        }
                                
        return topRect;
    },
    
    nextPlatformPos: function(prevPos, rect){
        
        var size = cc.director.getWinSize();
        
        //var xPos = Math.floor(Math.random() * size.width) + min;
        //var xPos = Math.floor(Math.random() * (size.width - g_settings.platform_1.w)) + g_settings.platform_1.w/2;
        
        var maxVerDistance = 10;  //depends on level?
        var minVerOffset = 50; //depends on level?
        var verMargin = rect.height / 2;
        var yPos = prevPos.y + minVerOffset + (maxVerDistance / 2 - Math.floor(Math.random() * maxVerDistance));
        
        var maxHorDistance = 100;  //depends on level?
        var minHorOffset = 0;
        var horMargin = rect.width / 2;
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
    
    addNextPlatform: function(pos, platformType, speed, rect){
        
        var platform = new Platform(g_assets.IMG_PLATFORM);
        
        platform.platformType = platformType;
        platform.setPosition(pos.x, pos.y);
        platform.setSpeed(speed);
        platform.rectWidth = rect.width;
        platform.rectHeight = rect.height;
        
        this.addChild(platform, g_settings.ZINDEX_PLATFORM);
        
        this.platforms.push(platform);
        
        return platform;
    },
    
    clearPlatforms: function(){
        while(this.platforms.length > 0) {
            var platform = this.platforms.pop();
            platform.removeFromParent();
        }
    },
    
    removePlatformAt: function(idx){
        var platform = this.platforms[idx];
        platform.removeFromParent();
        this.platforms.splice(idx, 1);
    }
    
    
});