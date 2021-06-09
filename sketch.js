var knife;
var position;
var rand;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  knifeImg = loadImage("knife.png")
  alienImg = loadAnimation("alien1.png", "alien2.png")
  fruit1Img = loadImage("fruit1.png")
  fruit2Img = loadImage("fruit2.png")
  fruit3Img = loadImage("fruit3.png")
  fruit4Img = loadImage("fruit4.png")
  gameOver = loadImage("gameover.png")
  knifeSwooshSound = loadSound("knifeSwoosh.mp3")
  gameOverSound = loadSound("gameover.mp3")

}

function setup() {
  createCanvas(600, 600);

  knife = createSprite(100, 200, 20, 20);
  knife.addImage(knifeImg);
  knife.debug = true
  fruitsGroup = new Group();
  alienGroup = new Group();

}
function draw() {
  background("pink");

  if (gameState === PLAY) {
    knife.x = mouseX;
    knife.y = mouseY;

    if (fruitsGroup.isTouching(knife)) {
      fruitsGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }

    spawnfruit();
    spawnalien();

    if (alienGroup.isTouching(knife)) {
      alienGroup.destroyEach();
      gameOverSound.play();
      gameState = END;
    }
  }

  else if(gameState === END){
    knife.addImage(gameOver);
    fruitsGroup.destroyEach();
    alienGroup.destroyEach();
    fruitsGroup.setVelocityXEach(0);
    alienGroup.setVelocityXEach(0);
    knife.x = 300;
    knife.y = 300;
  }

  textSize(25);
  text("Score: " + score, 250, 50);



  drawSprites();
}
function spawnfruit() {
  if (frameCount % 100 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    position = Math.round(random(1, 2));
    if (position === 1) {
      fruit.x = 600;
      fruit.velocityX = -4
    }
    if (position === 2) {
      fruit.x = 0;
      fruit.velocityX = 4;
    }
    rand = Math.round(random(1, 4))
    if (rand == 1) {
      fruit.addImage(fruit1Img);
    }
    else if (rand == 2) {
      fruit.addImage(fruit2Img);
    }
    else if (rand == 3) {
      fruit.addImage(fruit3Img);
    }
    else {
      fruit.addImage(fruit4Img);
    }
    fruit.y = Math.round(random(50, 550));
    fruit.setLifetime = 200;
    fruitsGroup.add(fruit);
  }
}
function spawnalien() {
  if (frameCount % 120 === 0) {
    alien = createSprite(600, 200, 40, 40);
    position = Math.round(random(1, 2));
    if (position === 1) {
      alien.x = 600;
      alien.velocityX = -5;
    }
    if (position === 2) {
      alien.x = 0;
      alien.velocityX = 5;
    }
    alien.addAnimation("moving", alienImg);
    alien.y = Math.round(random(50, 550));
    alien.setLifetime = 200;
    alienGroup.add(alien);
  }
}