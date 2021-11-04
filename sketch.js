//variables or game states
var PLAY = 1;
var END = 0;
var gameState = 1;

//variable for knife, fruits and microbes;
var knife, fruit, monster;

//variables for images
var knifeImage, gameOverImage, fruit1Image, fruit2Image, fruit3Image, fruit4Image, monsterImage;

//variables for groups
var fruitGroup, enemiesGroup;

//variables for score and game over
var score, gameOver;

//variables for sound
var gameOverSound , cutSound ;


function preload(){
  
  //loading images
  knifeImage = loadImage("sword.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  monsterImage = loadImage("alien1.png");
  
  gameOverImage = loadImage("gameover.png");
  
  //loading sounds
  gameOverSound = loadSound("gameover.mp3");

  cutSound=loadSound("Cut Sound.mp3");
 
}

function setup(){
     createCanvas(400,400);
  
  //created sprite for knife
  knife = createSprite(200, 200, 20, 10);
  knife.addImage(knifeImage);
  knife.scale = 0.7;
  
  
  //adding group 
  fruitGroup = createGroup();
  enemiesGroup = createGroup();
  
  //score
  score = 0;
  
}

function draw(){
  background('lightblue');
  
  if(gameState === PLAY){
    
    //calling fruits and enemies
  fruits();
  enemy();
    
    //moving the knife
    knife.y = mouseY;
    knife.x = mouseX;
    
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      cutSound.play();
      score = score +2;
    }
    else if(enemiesGroup.isTouching(knife)){
      gameState = END;
         fruitGroup.destroyEach();
         enemiesGroup.destroyEach();
         fruitGroup.velocityX = 0;
         enemiesGroup.velocityX = 0;
         knife.addImage(gameOverImage);
         knife.x = 200;
         knife.y = 200;
         gameOverSound.play();
    }
  }
  
  //adding text
  text("Score :"+score, 300,20); 
  
  drawSprites();
}

function fruits(){
  
  if(World.frameCount % 80 === 0){
    position = Math.round(random(1,2));
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    
    //fruit.debug = true;
    
    r = Math.round(random(1, 4));
    if(r == 1){
      fruit.addImage(fruit1Image);
    } else if (r == 1){
      fruit.addImage(fruit2Image);
    } else if (r == 2 ){
      fruit.addImage(fruit3Image);
    } else if(r == 3){
      fruit.addImage(fruit4Image);
    }
  if(position == 1){
    fruit.x = 400;
    fruit.velocityX = -(7+(score/4))
  }
   else
   {
     if(position == 2){
   fruit.x = 0;
     
     fruit.velocityX = -(7+(score/4));
   }
  }
  fruit.y=Math.round(random(50, 340));

  fruit.setLifetime = 100;
  
  fruitGroup.add(fruit);
 }
}

function enemy(){
  if(World.frameCount % 200 === 0){
    monster = createSprite(400, 200, 20, 20);
    monster.addImage("moving",monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemiesGroup.add(monster);
  }
}