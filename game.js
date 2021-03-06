var shark,
    cursors,
    Bug,
    bullet;
var bugs = [];

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
    game.load.image('shark', 'shark.png');
    game.load.image('bug', 'bug.png');
    game.load.image('bullet', 'bullet.png');
}

//Bug = function(){
        //this.x = game.world.randomX;
        //this.y = game.world.randomY;
        // this.minSpeed = -75;
        // this.maxSpeed = 75;
        // this.vx = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
        // this.vy = Math.random()*(this.maxSpeed - this.minSpeed+1)-this.minSpeed;
        // alert(vx);

        //this.bugSprite = game.add.sprite(this.x,this.y,"bug");
        //this.bugSprite.anchor.setTo(0.5, 0.5);
        // this.bugSprite.body.collideWorldBounds = true;
        // this.bugSprite.body.bounce.setTo(1, 1);
        // this.bugSprite.body.velocity.x = this.vx;
        // this.bugSprite.body.velocity.y = this.vy;
        // this.bugSprite.body.immovable = true;
//    }



function create(){
    game.stage.backgroundColor = '#c0d6e4';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    //shark
    shark = game.add.sprite(game.world.centerX, 0 , 'shark');
    game.physics.arcade.enable(shark);
    shark.inputEnabled = true;
    shark.body.acceleration.y = 200;
    shark.body.collideWorldBounds = true;
    shark.body.drag.x = 100;
    shark.anchor.setTo(0.5, 1);
    
    //bug   
    bugs = game.add.group();
    createbugs(bugs);
    game.physics.arcade.enable(bugs);
    
    
    //bullet
    bullet = this.add.sprite(this.world.randomX, this.world.randomY, 'bullet');
    game.physics.arcade.enable(bullet);
    bullet.enableBody = true;
    bullet.body.bounce.y = 0.2;
    //bullet.body.gravity.y = 500;
    bullet.body.collideWorldBounds = true;
    game.time.events.repeat(Phaser.Timer.SECOND, 10, randomMovement, game);
    
    cursors = game.input.keyboard.createCursorKeys();

    // for (var i=0; i<7; i++) {
    //     bugs.push( new Bug() );
    // }
}

function update(){
    
    moveshark(shark);
    game.physics.arcade.collide(shark, bugs, killbug, null, this);
}


function killbug(){
    alert("detected collision, not able to destroy object (known bug)");
    //there is a reported bug in phaser, not able to destroy sprite created in group
    bugs.kill();
}


function createbugs(obj){
    for (var i = 0; i < 5; i++)
    {
        obj.create(500 + Math.random() * 200, 200 + Math.random() * 200, 'bug');
    }
}


function randomMovement() {
    //randomise the movement        
    var bulletmover = game.rnd.integerInRange(1, 4);
    if (bulletmover == 1) {
        bullet.body.velocity.x = 50;       
    } else if(bulletmover == 2) {   
        bullet.body.velocity.x = -50;    
    } else if(bulletmover == 3) {   
        bullet.body.velocity.y = -50;    
    } else if(bulletmover == 4) {   
        bullet.body.velocity.y = 50;    
    } 
}


function moveshark(shark)
{
    if(cursors.up.isDown) {   
        shark.body.velocity.y = -100;
    }
    else if(cursors.right.isDown) {
        shark.body.velocity.x = 50;
        shark.scale.x = 1;
    }
    else if (cursors.left.isDown){
        shark.body.velocity.x = -50;
        shark.scale.x = -1;  
    }    
}