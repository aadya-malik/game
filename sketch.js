var bird
var birdImg
var bgImage
var bg;
var pipe, pipeImg1,  pipeImg2;
var PLAY=1;
var END = 0;
var score = 0;
var gameState = PLAY;
var birdCollide
var topGrp;
var bottomGrp;
var gameOverImg, gameOver, reset, resetImg;
var life , lifeImg;
var lifeGrp;
var livess = 5;
var gameSound
function preload(){

birdImg = loadAnimation("tile000.png","tile001.png","tile002.png","tile003.png","tile004.png","tile006.png","tile007.png","tile008.png","tile009.png","tile010.png",
"tile012.png","tile013.png","tile014.png","tile015.png");
bgImage = loadImage('ground_inscene.png');
pipeImg1= loadImage('pipe1.0.png');
pipeImg2= loadImage('pipe2.0.png');
gameOverImg = loadImage('gameOver1.png');
resetImg = loadImage('reset.png');
birdCollide = loadAnimation("tile001.png");
gameSound   = loadSound("sound.mp3");

lifeImg =  loadImage ('life.png');
}
function setup(){

createCanvas(windowWidth,windowHeight);

topGrp = new Group()
bottomGrp = new Group()
lifeGrp = new Group()

  bird = createSprite(50,height/2-200,10,10);
  bird.addAnimation("birdFlying",birdImg)
  bird.addAnimation('collided',birdCollide)

 bird.scale= 1.5
 bird.setCollider("rectangle",0,0,50,50);
gameOver = createSprite(width/2,height/2,50,70)
gameOver.addImage(gameOverImg);
gameOver.scale = 0.1
gameOver.visible = false;
reset = createSprite(width/2,height/2 + 50,10,10);
reset.addImage(resetImg);
reset.visible = false;
reset.scale = 0.3

}
function lives(){
  if(frameCount%1000===0){
    
  life = createSprite(width,height/2-100);
  life.addImage(lifeImg);

  life.velocityX = -2;
  life.lifetime = width/2;
  lifeGrp.add(life);
}
}
function spawnTopPipes(){
  if(frameCount%250===0){
     pipe = createSprite(width,Math.round(random(10,height/2-100)),10,1000)
     pipe.velocityX  =  -2;
    pipe.scale = 2
  pipe.addImage(pipeImg1);
    
  pipe.lifetime = width/2;

pipe.setCollider("rectangle",0,0,50,155);
bird.depth = pipe.depth
bird.depth = bird.depth+1

  topGrp.add(pipe)
  }
}
function spawnBottomPipes(){
  if(frameCount%270===0){
     pipe = createSprite(width,Math.round(random(height - 100,height-50)),10,10)
     pipe.velocityX  =  -2;
    
  pipe.addImage(pipeImg2);
  pipe.lifetime = width/2;
  pipe.scale = 2
  
    
pipe.setCollider("rectangle",0,0,50,150);

bottomGrp.add(pipe)
reset.depth = pipe.depth 
reset.depth = reset.depth+1;

  
  }
}

function draw(){

background(bgImage)
text("score:"+score,750,50);
text("lives:"+livess,50,50);
if(gameState===PLAY){
score  = score+ Math.round(random(getFrameRate()/60));  
if(keyDown("space")){
  bird.velocityY = -5;
}
if(lifeGrp.isTouching(bird)){
  lifeGrp.destroyEach()
    livess = livess+1
}
gameSound.loop()
bird.velocityY = bird.velocityY + 0.8;
spawnTopPipes();
spawnBottomPipes();
if(bottomGrp.isTouching(bird)|| topGrp.isTouching(bird)||bird.y > height){
  livess = livess - 1;
 gameState = END;
  
  
}

}else if(gameState === END){
  gameOver.visible = true;
textSize(30);

reset.visible = true;
topGrp.setVelocityXEach(0);
bottomGrp.setVelocityXEach(0);
bird.velocityY =  0;
topGrp.setLifetimeEach(-1);
bottomGrp.setLifetimeEach(-1);
bird.changeAnimation('collided',birdCollide);

if(touches.length > 0 || mousePressedOver(reset)){
  if(livess > 0){
    reset1()
  }
 

}
if(livess === 0){
  textSize(50)
    text("the end",width/2,height/2);
reset.visible = false;
gameOver . visible = false;
}  
}

drawSprites()


}
function reset1(){
  gameState = PLAY;
  gameOver.visible = false;
  reset.visible = false;
  topGrp.destroyEach();
  bottomGrp.destroyEach();
  bird.changeAnimation("birdFlying", birdImg);
  bird.y = 100;
}