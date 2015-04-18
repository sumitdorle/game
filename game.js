var shark;
var cursors;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
    game.load.image('shark', 'shark.png');
    
}

function create(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    shark = game.add.sprite(game.world.centerX, 0 , 'shark');
    game.physics.arcade.enable(shark);
    shark.inputEnabled = true;
    shark.body.acceleration.y = 200;
    shark.body.collideWorldBounds = true;
    shark.body.drag.x = 100;
    
    
cursors = game.input.keyboard.createCursorKeys();
      
}

function update(){
    moveshark(shark);
}


function moveshark(shark)
{
    if(cursors.left.isDown) {
      shark.body.velocity.x = -50;
      shark.scale.x = -1;
    }
    else if(cursors.right.isDown) {
      shark.body.velocity.x = 50;
      shark.scale.x = 1;
    }
}