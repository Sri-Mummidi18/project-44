var bg,alien,coin,donut,plum,rock;
var bgImg,alienImg,coinImg,donutImg,plumImg,rockImg;
var treasureCollection = 0;
var coinG,donutG,plumG,rockGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  bgImg = loadImage("Background.jpeg");
  alienImg = loadImage("alien.png");
  coinImg = loadImage("coin.png");
  donutImg = loadImage("Donut.png");
  plumImg = loadImage("plums.png");
  rockImg = loadImage("rock.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth, windowHeight);
// Moving background
bg=createSprite(width/2,200);
bg.addImage(bgImg);
bg.scale=4;
bg.velocityY = 4;


//creating boy running
alien = createSprite(width/2, height-20,20,20);
alien.addAnimation("SahilRunning",alienImg);
alien.scale=0.5;
  
coinG=new Group();
donutG=new Group();
plumG=new Group();
rockGroup=new Group();
  
  


}

function draw() {

  if(gameState===PLAY){
  background(0);
  alien.x = World.mouseX;
  
  edges= createEdgeSprites();
  alien.collide(edges);
  
  //code to reset the background
  if(bg.y > height ){
    bg.y = height/2;
  }
  
    createCoin();
    createDonut();
    createPlum();
    createRock();

    if (coinG.isTouching(alien)) {
      coinG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (donutG.isTouching(alien)) {
      donutG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(plumG.isTouching(alien)) {
      plumG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(rockGroup.isTouching(alien)) {
        gameState=END;
        
        alien.addAnimation("SahilRunning",endImg);
        alien.x=200;
        alien.y=300;
        alien.scale=0.6;
        
        coinG.destroyEach();
        donutG.destroyEach();
        plumG.destroyEach();
        rockGroup.destroyEach();
        
        coinG.setVelocityYEach(0);
        donutG.setVelocityYEach(0);
        plumG.setVelocityYEach(0);
        rockGroup.setVelocityYEach(0);
     
    }
  }
  if (gameState === END){
    text("Game Over")
  }
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: " + treasureCollection,150,30);
  }

}

function createCoin() {
  if (World.frameCount % 200 == 0) {
  var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.3;
  coin.velocityY = 3;
  coin.lifetime = 150;
  coinG.add(coin);
  }
}

function createDonut() {
  if (World.frameCount % 320 == 0) {
  var donut = createSprite(Math.round(random(50, 350),40, 10, 10));
  donut.addImage(donutImg);
  donut.scale=0.3;
  donut.velocityY = 3;
  donut.lifetime = 150;
  donutG.add(donut);
}
}

function createPlum() {
  if (World.frameCount % 410 == 0) {
  var plum = createSprite(Math.round(random(50, 350),40, 10, 10));
  plum.addImage(plumImg);
  plum.scale=0.3;
  plum.velocityY = 3;
  plum.lifetime = 150;
  plumG.add(plum);
  }
}

function createRock(){
  if (World.frameCount % 530 == 0) {
  var rock = createSprite(Math.round(random(50, 350),40, 10, 10));
  rock.addImage(rockImg);
  rock.scale=0.4;
  rock.velocityY = 3;
  rock.lifetime = 150;
  rockGroup.add(rock);
  }
}
  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}