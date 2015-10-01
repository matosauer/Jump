window.onload = function(){

    cc.game.onStart = function(){
		
		cc.view.adjustViewPort(false);
		cc.view.setDesignResolutionSize(gs.resolutionWidth, gs.resolutionHeight, cc.ResolutionPolicy.SHOW_ALL);
		cc.view.resizeWithBrowserSize(true);
        
		cc.LoaderScene.preload(g_gamescene, function () {                  
            cc.director.runScene(GameLayer.scene());
        }, this);
    };
    
    cc.game.run("gameCanvas");
};