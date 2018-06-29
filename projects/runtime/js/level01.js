var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;
        
        var targetReached = false;
        var direction = -1;
        setInterval(function() {
            direction *= -1;
            for (var i = 0; i < levelData.gameItems.length; i++) {
                if (levelData.gameItems[i].type === 'enemyFly') {
                    levelData.gameItems[i].gameObject.velocityY = direction;
                }
            }
        }, 3000);
        
        var gameInterval = setInterval(function(){
            
            if (game.getScore() > 3000) {
                // end game
                game.changeIntegrity(-100);
                confirm("Game Over!");
                clearInterval(gameInterval);
            }
            
        }, 50);

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY},
                {type: 'enemyFly', x: 700, y: groundY - 190},
                {type: 'sawblade',x:800,y:groundY},
                {type: 'enemy', x: 900, y: groundY - 50},
                {type: 'sawblade',x:1200,y:groundY},
                {type: 'enemy', x: 1200, y: groundY - 50},
                {type: 'sawblade',x:1500,y:groundY - 30},
                {type: 'enemy', x: 1700, y: groundY - 50},
                {type: 'box', x:1700, y:groundY},
                {type: 'heal', x: 1800, y: groundY - 140},
                {type: 'sawblade',x:2000,y:groundY - 110},
                {type: 'box', x:2200, y:groundY},
                {type: 'reward', x: 2200, y: groundY - 170},
                {type: 'box', x:2500, y:groundY},
                {type: 'box', x:2800, y:groundY},
                {type: 'enemy', x: 3000, y: groundY - 50},
                {type: 'sawblade',x:3000,y:groundY - 30},
                {type: 'box', x:3000, y:groundY},
                {type: 'box', x:3100, y:groundY},
                {type: 'sawblade',x:3300,y:groundY - 30},
                {type: 'enemy', x: 3500, y: groundY - 50},
                {type: 'reward', x: 3600, y: groundY - 130},
                {type: 'sawblade',x:3800,y:groundY - 30},
                {type: 'enemy', x: 4000, y: groundY - 50},
                {type: 'heal', x: 4000, y: groundY - 140},
                {type: 'heal', x: 5500, y: groundY - 150}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
       
        function createSawBlade (x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.rotationalVelocity = 10;
            
        }
       
        function createBox(x, y) {
            var hitZoneSize = 15;
            var damageFromObstacle = 5;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.scaleX = .75;
            myObstacle.scaleY = .75;
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/spikes.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -70;
            obstacleImage.y = -50;
        }
        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/Robot.png');
            redSquare.scaleX = 0.25;
            redSquare.scaleY = 0.25;
            redSquare.x = -50;
            redSquare.y = -50;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.onPlayerCollision = function () {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
    
            };
            enemy.onProjectileCollision = function () {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.shrink();
                
            };
        }
        
        function createEnemyFly(x,y) {
            var enemy = game.createGameItem('enemy', 25);
            var redSquare = draw.bitmap('img/ufo.png');
            redSquare.scaleX = 0.4;
            redSquare.scaleY = 0.4;
            redSquare.x = -50;
            redSquare.y = -50;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityY = direction;
            enemy.onProjectileCollision = function() {
                console.log('enemy hit');
                game.increaseScore(250);
                enemy.flyTo(x, 0);
            };
            return enemy;
        }
        
        function createReward(x, y) {
            var reward = game.createGameItem('enemy', 25);
            var greenSquare = draw.bitmap('img/Reward.png');
            greenSquare.x = -25;
            greenSquare.y = -25;
            reward.addChild(greenSquare);
            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);
            reward.velocityX = -1;
            reward.onPlayerCollision = function() {
                console.log('Halle got reward');
                game.increaseScore(1000);
                reward.shrink();
            };
        }
        
        function createHeal(x, y) {
            var heal = game.createGameItem('enemy', 25);
            var blueSquare = draw.bitmap('img/health.png');
            blueSquare.scaleX = 0.2;
            blueSquare.scaleY = 0.2;
            blueSquare.x = -45;
            blueSquare.y = -45;
            heal.addChild(blueSquare);
            heal.x = x;
            heal.y = y;
            game.addGameItem(heal);
            heal.velocityX = -1;
            heal.onPlayerCollision = function() {
                console.log('Halle healed');
                game.increaseScore(100);
                game.changeIntegrity(20);
                heal.shrink();
            };
            heal.onProjectileCollision = function() {
                heal.fadeOut();
            };
        }
        
        for (var i = 0; i < levelData.gameItems.length; i++) {
            if(levelData.gameItems[i].type === 'sawblade') {
                createSawBlade(levelData.gameItems[i].x , levelData.gameItems[i].y);
            } else if(levelData.gameItems[i].type === 'box') {
                createBox(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if(levelData.gameItems[i].type === 'enemy') {
                createEnemy(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if(levelData.gameItems[i].type === 'reward'){
                createReward(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else if(levelData.gameItems[i].type === 'heal') {
                createHeal(levelData.gameItems[i].x, levelData.gameItems[i].y);
            } else {
                var gameObject = createEnemyFly(levelData.gameItems[i].x, levelData.gameItems[i].y);
                levelData.gameItems[i].gameObject = gameObject;
            }
        }
        
    };
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}