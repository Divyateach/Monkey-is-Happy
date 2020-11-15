
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
monkey_running =       loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey=createSprite(100,300,30,30);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  ground=createSprite(0,400,1000,10)
   ground.velocityX=-4;
  ground.x=ground.width/2;
  FoodGroup=new Group();
 obstacleGroup=new Group();
  score=0;
}


function draw() {
background("aqua");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  if(keyDown("space")){
    monkey.velocityY=-10;
  } 
  monkey.velocityY=monkey.velocityY+0.8
    monkey.collide(ground);
   spawnfood();
  obstacles();
  
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
  }
  drawSprites();
  textSize(20);
  
   survivalTime=Math.ceil(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 130,100);
}

function spawnfood()
{
  if(frameCount%100===0){
    banana=createSprite(500,Math.round(random(150,300)),10,10);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-6;
    banana.lifetime=300;
    FoodGroup.add(banana);
    banana.depth=monkey.depth;
    monkey.depth=monkey.depth+1;
  }
  
}

function obstacles(){
  if(frameCount%300===0){
  obstacle=createSprite(500,360,30,30)
  obstacle.addImage(obstacleImage);
   obstacle.velocityX=-6;
    obstacle.scale=0.2
     obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }

}

