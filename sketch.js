
var PLAY = 2;
var END = 0;

var gameState = PLAY;

//Variáveis de personagem e cenário
var comeco,comecoImg
var candyBoy
var candyBoyImg,candyBoymImg
var monstro,monstroImg
var fundo,fundoImg
var chaoInv
var reiniciar,reiniciarImg
var comecar,comecarImg
var gameOver,gameOverImg
var ground,groundImg;
var jumpSound, dieSound;
function preload(){
//imagen e animações
candyBoyImg = loadAnimation("cdbF1.png","cdbF2.png");
candyBoymImg = loadAnimation("cdbM.png");
monstroImg = loadImage("monstro.png");
reiniciarImg = loadImage("reiniciar.png");
fundoImg = loadImage("cenariofinal.png");
comecoImg = loadImage("começo.png");
comecarImg = loadImage("começar.png")
gameOverImg = loadImage("gameover.png")
groundImg = loadImage("chão.png")
//
jumpSound = loadSound("jump.mp3");
dieSound = loadSound("die.mp3");
}

function setup() {
createCanvas(windowWidth,windowHeight);

monsterGroup = new Group();
//

//
fundo = createSprite(windowWidth/2,windowHeight-800);
fundo.addImage(fundoImg);
//
candyBoy = createSprite(900,height-390.,20,50);
candyBoy.addAnimation("correndo",candyBoyImg);
candyBoy.addAnimation("morto",candyBoymImg);
candyBoy.scale = 0.3;
ground = createSprite(windowWidth-150,windowHeight-240)
ground.addImage(groundImg);
//
reiniciar  = createSprite(width/2,height-400);
reiniciar.addImage(reiniciarImg)
reiniciar.scale = 0.5
//
gameOver = createSprite(width/2,height/3)
gameOver.addImage(gameOverImg)
gameOver.scale=0.1


}

function draw() {
  candyBoy.collide(ground);


if(gameState === PLAY){
 
  candyBoy.changeAnimation("correndo",candyBoyImg)
 if((touches.length>0 || keyDown("SPACE")) && candyBoy.y >= height/2 - 50) {
candyBoy.velocityY = -25;
jumpSound.play();
touches = [];
}
candyBoy.velocityY = candyBoy.velocityY + 0.9

ground.velocityX = -10
if (ground.x < width/4+200){
  ground.x = fundo.width/2;

}



gameOver.visible=false;
reiniciar.visible=false;
spawnMonstros();
if(monsterGroup.isTouching(candyBoy)){
  dieSound.play();
  gameState = END;
}

}

if(gameState === END){
  candyBoy.velocityY = candyBoy.velocityY + 100

  if(touches.length>0 ||mousePressedOver(reiniciar)) {
    
    reset();
  }
  candyBoy.changeAnimation("morto",candyBoymImg);
  candyBoy.scale=0.3
  reiniciar.visible=true;
  gameOver.visible=true;
  ground.velocityX=0;
  monsterGroup.destroyEach();
}

drawSprites();
}

function reset(){

  gameOver.visible = false;
  reiniciar.visible = false;
  
  monsterGroup.destroyEach();
  gameState = PLAY
}


function spawnMonstros() {
  if(frameCount % 140 === 0) {
    monstro = createSprite(width+30,height-450,10,40);
    monstro.scale=0.35
    monstro.addImage(monstroImg)
    monstro.velocityX=-9
    var rand = Math.round(random(1,6));
    monsterGroup.add(monstro);
    }
    
  }
