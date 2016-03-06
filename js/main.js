window.onload = function(){

  
    cc.game.onStart = function(){
		
        
		cc.view.adjustViewPort(true);
		cc.view.setDesignResolutionSize(400, 600, cc.ResolutionPolicy.SHOW_ALL);
		cc.view.resizeWithBrowserSize(true);
       
		cc.LoaderScene.preload(g_resources, function () {   
            
            cc.director.runScene(new GameScene());
            
        }, this);
        
        
    };
    
    cc.game.run("gameCanvas");
};