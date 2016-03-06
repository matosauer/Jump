var ___PlatformSprite = cc.Sprite.extend( {

	screenHeight: 0.0,
	pixelsPerSecond: 0,
	yOffset: 0,
    state: gs.kPlatformStateStopped,
    
	ctor: function(spriteFrameName) {
		this._super(spriteFrameName);
	},
	
	SetSpeedAndHeight: function(pps, screenHeight, spriteHeight) {
		this.pixelsPerSecond = pps;
		this.screenHeight = screenHeight;
        this.yOffset = spriteHeight / 2;
	},
	
    Start: function() {
        this.state = gs.kPlatformStateMoving;
    },
    
	Stop: function() {
		this.state = gs.kPlatformStateStopped;
	},
	
    SetSpeed: function(pps){
        this.pixelsPerSecond = pps;
    },
    
    update: function(dt){
        if (this.state == gs.kPlatformStateMoving){
            this.y -= this.pixelsPerSecond * dt;
            if (this.y <= -this.yOffset)
            {
                this.state = gs.kPlatformStateStopped;
                this.ReachedDestination(this);
            }
        }
    },
    
    /*
    move: function(delta){
        if (this.state == gs.kPlatformStateMoving){
            this.y -= delta;
            if (this.y <= -this.yOffset)
            {
                this.state = gs.kPlatformStateStopped;
                this.ReachedDestination(this);
            }
        }
    },
    */
    
	ReachedDestination: function(sender){
        
        //call parent to remove from array?
        
        //sender.y = sender.screenHeight + sender.yOffset;
        //sender.Start();
	}
    
                                      
    /*
    onEnter: function() {
		this._super();	
        this.schedule(this.update);
    },
    */
    
    /*
    update: function(dt){
        
        if (this.state == gs.kPlatformStateMoving){
            this.y -= this.pixelsPerSecond * dt;
            if (this.y <= -this.yOffset)
            {
                this.state = gs.kPlatformStateStopped;
                this.ReachedDestination(this);
            }
        }
    },
    */
    
    /*
    
	*/
	
});


















