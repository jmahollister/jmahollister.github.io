var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        var tree;
        var buildings = [];
        var moon;
        var planet;
        var comet;
        
        // Add any variables that will be used by render AND update here:
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth, groundY,'black');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            var circle;
            for(var i = 0; i < 80; i++) {
                circle = draw.circle(3, 'white', 'LightGray', 1);
                circle.x = canvasWidth * Math.random();
                circle.y = groundY * Math.random();
                background.addChild(circle);
            }
            
            planet = draw.bitmap('img/Beta_Team_Solar_System_Game_Over_Planet.png');
            planet.x = 100;
            planet.y = 100;
            planet.scaleX = 0.1;
            planet.scaleY = 0.1;
            background.addChild(planet);
            
            moon = draw.bitmap('img/moon.png');
            moon.x = 500;
            moon.y = 25;
            moon.scaleX = 1.0;
            moon.scaleY = 1.0;
            background.addChild(moon);
            
            
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var buildingHeight  = 300;
            var building;
            var buildingColor = ['LightGray', 'gray', 'DarkGray'];
            for (var i = 0; i< 20; ++i) {
                building = draw.rect(75,buildingHeight,buildingColor[Math.floor(Math.random() * buildingColor.length)],'Black',1);
                building.x = 200*i;
                building.y = groundY - buildingHeight;
                background.addChild(building);
                buildings.push(building);
                buildingHeight = buildingHeight + (30 * (Math.floor(Math.random() * 3 - 1)));
                if(buildingHeight > 300) {
                    buildingHeight = 270;
                }
                
            }
                
            
            // TODO 4: Part 1 - Add a tree
            tree = draw.bitmap('img/signpost1.png');
            tree.x = 120;
            tree.y = groundY - 235;
            background.addChild(tree);
            
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            tree.x = tree.x - 1;
            if(tree.x < -220) {
                tree.x = canvasWidth;
            }
            
            
            // TODO 5: Part 2 - Parallax
            for ( var i = 0; i < buildings.length; i++) {
            
                buildings[i].x = buildings[i].x - 0.5;
                if(buildings[i].x < -75) {
                    buildings[i].x = canvasWidth;
                }
            }
            
            moon.x -= 0.05;
            if(moon.x < -400) {
                moon.x = canvasWidth;
            }
            
            planet.x -= 0.03;
            if(planet.x < -115) {
                planet.x = canvasWidth;
            }
        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
