var GameLayer = cc.Layer.extend({
    
	ctor:function() {
		this._super();
		this.init();
	},
    
	init:function() {
		//this._super();
	
        this.AddBackground();	
        this.CreatePlatforms();
        
	},
    
    
    AddBackground: function(){
    	var size = cc.director.getWinSize();
		var bgsprite = cc.Sprite.create(res.BG_IMAGE);
		bgsprite.setPosition(size.width / 2, size.height / 2);
		this.addChild(bgsprite, gs.kZindexBG);    
    },
    
    CreatePlatforms: function(){
        
        this.AddPlatform(gs.kPlatformSpeedSlow, cc.p(150,150), gs.kPlatformScale, gs.kZindexPlatform, res.CLOUD_IMAGE, gs.kPlatformhalfSize);
        this.AddPlatform(gs.kPlatformSpeedSlow, cc.p(250,350), gs.kPlatformScale, gs.kZindexPlatform, res.CLOUD_IMAGE, gs.kPlatformhalfSize);
        this.AddPlatform(gs.kPlatformSpeedSlow, cc.p(450,500), gs.kPlatformScale, gs.kZindexPlatform, res.CLOUD_IMAGE, gs.kPlatformhalfSize);
        
    },
    
    AddPlatform: function(speed, position, scale, zIndex, name, yOffset) {
		var sprite = new PlatformSprite(name);
        var size = cc.director.getWinSize();
        
        //var b = sprite.boundingBox();
        //var yOffset = b.height / 2;
        
		sprite.SetSpeedAndHeight(speed, size.width, yOffset);
		sprite.x = position.x;
		sprite.y = position.y;
		sprite.setScale(scale);
		this.addChild(sprite, zIndex);
		
        go.platformArray.push(sprite);
	},
    
	onEnter: function() {
		this._super();	
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: this.onTouchBegan,
			onTouchMoved: this.onTouchMoved,
			onTouchEnded: this.onTouchEnded
		}, this);
		
		this.schedule(this.onTick);
	},
	
	onTick:function(dt) {
		
	},
	
	onTouchBegan:function(touch, event) {
		var tp = touch.getLocation();
		var tar = event.getCurrentTarget();
		console.log('onTouchBegan:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
		
        if (go.sceneState == gs.kSceneStateStopped){
            go.sceneState = gs.kSceneStateMovingSlow;
            tar.StartPlatforms();
            
        } else if (go.sceneState == gs.kSceneStateMovingSlow){
            go.sceneState = gs.kSceneStateMovingFast;
            tar.SetSpeed(gs.kPlatformSpeedFast);
            
        } else if (go.sceneState == gs.kSceneStateMovingFast){
            go.sceneState = gs.kSceneStateMovingSlow;
            tar.SetSpeed(gs.kPlatformSpeedSlow);
        }  
        
		return false;
	},
	
	onTouchMoved:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchMoved:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},
	
	onTouchEnded:function(touch, event) {
		var tp = touch.getLocation();
		console.log('onTouchEnded:' + tp.x.toFixed(2) + ','  + tp.y.toFixed(2));
	},
    
    StartPlatforms: function() {
		for (var i = 0,  len = go.platformArray.length; i < len; i++) {
			go.platformArray[i].Start();
		}
	},
	
	StopPlatforms: function() {
		for (var i = 0,  len = go.platformArray.length; i < len; i++) {
			go.platformArray[i].Stop();
		}
	},
    
    SetSpeed: function(speed){
        for (var i = 0,  len = go.platformArray.length; i < len; i++) {
			go.platformArray[i].SetSpeed(speed);
		}
    }
	
});


GameLayer.scene = function() {
	var scene = new cc.Scene();
	var layer = new GameLayer();
	scene.addChild(layer);
	return scene;
}