var PlatformSprite = cc.Sprite.extend( {

	screenHeight: 0.0,
	pixelsPerSecond: 0,
	yOffset: 0,
	actionMove: null,
    
	ctor: function(spriteFrameName) {
		this._super(spriteFrameName);
	},
	
	SetSpeedAndHeight: function(pps, height, yOffset) {
		
		this.pixelsPerSecond = pps;
		this.screenHeight = height;
        this.yOffset = yOffset;
	},
	
	Stop: function() {
		this.stopAllActions();
	},
	
	ReachedDestination: function(sender) {
		// reset to right of screen
		//sender.x = sender.xOffset + sender.screenWidth;
		
        sender.y = sender.screenHeight + sender.yOffset;
        sender.Start();
	},
	
	Start: function() {
		this.stopAllActions();
        
		var distance = this.y + this.yOffset;
		var time = distance / this.pixelsPerSecond;
		var destination = cc.p(this.x, -this.yOffset);
        
        
		this.actionMove = cc.moveTo(time, destination).speed(2.0);
		var actionMoveDone = cc.callFunc(this.ReachedDestination, this);
		
		this.runAction(cc.sequence(this.actionMove, actionMoveDone));
	},
    
    SetSpeed: function(speedY){
        
        cc.log(speedY);
        
        if (this.actionMove != null){
            this.actionMove.speed(speedY);
        }
        
    }
	
	
});


















