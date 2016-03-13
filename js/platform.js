var Platform = cc.Sprite.extend({
  
    pixelsPerSecond: g_settings.SPEED_0,
    platformType: g_settings.PLATFORM_TYPE_1,
    
    rectWidth: 0,
    rectHeight: 0,
    
    setSpeed: function(pps){
        this.pixelsPerSecond = pps;
    },
                                
    ctor: function(spriteName) {
		this._super(spriteName);
	}
    
    
})