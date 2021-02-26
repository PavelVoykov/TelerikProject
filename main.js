const Game = new Phaser.Game(1800, 1100, Phaser.AUTO, 'game-canvas', { preload, create , update})

function preload() {
Game.load.spritesheet("d", "dude-org.288x40.9x1.png", 288/9, 48)
Game.load.spritesheet("m", "dude-red.288x40.9x1.png", 288/9, 40)
Game.load.spritesheet("ball", "ball.512x512.4x4.png", 512/4, 512/4)
Game.load.image('bg', "space2.png")
Game.load.audio("Space", "INFINITY - Epic Futuristic Music Mix Atmospheric Sci-Fi Music.mp3")
Game.load.audio("Hit", "HIT.mp3");
}
let platform
let platform2
let ball
let score0 = 0
let score1 = 0
let textS
let textS0
let textWIN0
let textWIN1
let ballyV
let platformwidth = 60
let num = 0.5
let bgmusic
function create() {
    bgmusic = Game.add.audio("Space")
    bgmusic.volume = 0.1
    //console.log(bgmusic.volume)
    bgmusic.onDecoded.add(start, this)

    hitsound = Game.add.audio("Hit");
    

    bg = Game.add.sprite(0, 0, 'bg')
    textS = Game.add.text(Game.width-Game.width/8, 120, "Red Team\nScore: 0", { font: "65px Arial", fill: "#ff0000"})
    textS0 = Game.add.text(Game.width/8, 120, "Beige Team\nScore: 0", { font: "65px Arial", fill: "#ffdd99"})
    textS.anchor.setTo(0.5)
    textS0.anchor.setTo(0.5)
    
    ball = Game.add.sprite(Game.width/2, Game.height/2, "ball")
    ball.anchor.setTo(0.5)
    ball.animations.add("ball", [], 15, true);
    ball.animations.play("ball")
    
    platform = Game.add.sprite(288/5, 120, "d")
    platform.scale.setTo(-3, 3)
    platform.anchor.setTo(0.5)
    
    platform2 = Game.add.sprite(Game.width - 288/5, 120, "m")
    platform2.scale.setTo(3, 3)
    platform2.anchor.setTo(0.5)
    
    Game.physics.startSystem(Phaser.Physics.ARCADE);
    Game.physics.enable([platform2, platform,ball], Phaser.Physics.ARCADE);
    
    ball.body.bounce.set(1);
    ball.body.collideWorldBounds = true;
    
    platform.body.collideWorldBounds = true;
    platform.body.bounce.set(0.3);
    platform.body.gravity.set(0, 300);
    platform.animations.add("f", [0,1,2,3], 15, true)
    
    platform2.body.collideWorldBounds = true;
    platform2.body.bounce.set(0.3);
    platform2.body.gravity.set(0, 300);
    platform2.animations.add("m", [0,1,2,3], 15, true)
    
    platform.body.immovable = true;
    platform2.body.immovable = true;


    
}
let count = 1
let dead = 1
function update(){
    
    Game.physics.arcade.collide(ball, platform, onHit);
    Game.physics.arcade.collide(ball, platform2, onHit);
    textS.text = "Red Team\nScore: " + score0
    textS0.text = "Beige Team\nScore: " + score1
    if(ball.x < 512/8+1){
        SCORERED();
    }else if(ball.x > Game.width - 512/8-1){
        SCOREBAGE();
    }
    if(!(count%400) && dead == 1){
        num = Game.rnd.integerInRange(0, 1)
        dead = 0
    }
    count++
    if(num > 0.5){
        onStartRight();
    }else if(num < 0.5){
        onStartLeft();
    }

    if (Game.input.keyboard.isDown(Phaser.KeyCode.W))
    {
        platform.body.velocity.y = -550;
        platform.animations.play("f")
        console.log("Push")
    }else if(!(Game.input.keyboard.isDown(Phaser.KeyCode.S))){
        platform.animations.stop()
    }
    if (Game.input.keyboard.isDown(Phaser.KeyCode.S))
    {
        platform.body.velocity.y = 550;
        platform.animations.play("f")
        console.log("Push")
    }else if(!(Game.input.keyboard.isDown(Phaser.KeyCode.W))){
        platform.animations.stop()
    }



    if (Game.input.keyboard.isDown(Phaser.KeyCode.UP))
    {
        platform2.body.velocity.y = -550;
        platform2.animations.play("m")
    }else if(!(Game.input.keyboard.isDown(Phaser.KeyCode.DOWN))){
        platform2.animations.stop()
    }
    if (Game.input.keyboard.isDown(Phaser.KeyCode.DOWN))
    {
        platform2.body.velocity.y = 550;
        platform2.animations.play("m")
    }else if(!(Game.input.keyboard.isDown(Phaser.KeyCode.UP))){
        platform2.animations.stop()
    }
   if(score0==10){
    textWIN0 = Game.add.text(Game.width/2, Game.height/2,"Red Team\n    WINS",{font:"65px Arial",fill:"rgb(220,20,60)"})
        textWIN0.anchor.setTo(0.5)
        ball.x = Game.width/2
        ball.y = Game.height/2
        platform.y = Game.height/2
        platform2.y = Game.height/2
        ball.body.velocity.x = 0
   }
   if(score1==10){
    textWIN1 = Game.add.text(Game.width/2, Game.height/2,"Beige Team\n    WINS",{font:"65px Arial",fill:"rgb(225,198,153)"})
        textWIN1.anchor.setTo(0.5) 
        ball.x = Game.width/2
        ball.y = Game.height/2
        platform.y = Game.height/2
        platform2.y = Game.height/2
        ball.body.velocity.x = 0
   }
   bgmusic.volume = 0.1

}
function onHit(){
    ball.body.velocity.y = Game.rnd.integerInRange(-500, 500);
    hitsound.play();
}
function start() {

    bgmusic.fadeIn(0);
    console.log("1");
    
}
function start2() {
    bgmusic.fadeIn(0);
    console.log("1");
}
function SCOREBAGE(){
    score1++
    ball.x = Game.width/2
    ball.y = Game.height/2
    platform.y = Game.height/2
    platform2.y = Game.height/2
    ball.body.velocity.x = 0
    ball.body.velocity.y = 0
    dead = 1
}
function SCORERED(){
    score0++
    ball.x = Game.width/2
    ball.y = Game.height/2
    platform.y = Game.height/2
    platform2.y = Game.height/2
    ball.body.velocity.x = 0
    ball.body.velocity.y = 0
    dead = 1
}

function onStartLeft(){
    ball.body.velocity.x = -700
    num = 0.5
}
function onStartRight(){
    ball.body.velocity.x = 700
    num = 0.5
}
