
var  PLAY = 1;
  
var  END = 0;
  
 var gameState = PLAY;


//create a  monkey sprite
var monkey,monkeyImage
var jungle,jungleImage;

//create Obstacle and Banana Groups 
var ObstaclesGroup;
var BananaGroup ;

//score
var count;

//to create a banana 
var Banana

//create obstacle
var obstacle 

var monkey_running

var banana_Image

var obstacle_Image

function preload(){
  monkeyImage=loadImage("Monkey_01.png");
  banana_Image=loadImage("banana.png")
  jungleImage=loadImage("jungle.jpg")
  
  obstacle_Image=loadImage("stone.png")
 
  
  monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
}
function setup() {
jungle= createSprite(200,340,20,50);
jungle.addImage("background",jungleImage );
jungle.x = jungle.width /2;
  
  monkey= createSprite(200,340,20,50);
monkey.addAnimation("running", monkey_running );
  monkey.setCollider("circle",0,0,40);
monkey.scale = 0.1;
monkey.x = 50;

  ObstaclesGroup = new Group();
  
  BananaGroup = new Group();
  
 
   count = 0;
  createCanvas(400, 400);
}

function draw() {
  
 jungle.velocityX = -6;

    count = Math.round(World.frameCount/4);
    
    if (jungle.x < 0){
     jungle.x = jungle.width/2;
    }
  textSize(18);
textFont("Roboto");
fill("black")
textStyle(BOLD);

  //set background to white
 edges= createEdgeSprites();
monkey.collide(edges[3]);
monkey.setCollider("rectangle",0,0,550,550);
  background("white");

  text("Survival time: "+ count, 200, 100);
  console.log(gameState);
  
  if(gameState === PLAY){
    count = Math.round(World.frameCount/4);
     
     //jump when the space key is pressed
    if(keyDown("space")){
      monkey.velocityY = -15 ;
    }
  
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
  
    //spawn obstacles
    spawnObstacles();
  
    
    if(BananaGroup.isTouching( monkey)){
     BananaGroup.destroyEach();
    } 
       if(ObstaclesGroup.isTouching( monkey)){
gameState = END;
    }
    }
  
  
  else if(gameState === END) {
        ObstaclesGroup.setLifetimeEach(-1) ;    
        BananaGroup.setLifetimeEach(-1);
    monkey.velocityY=0;
    ObstaclesGroup.setVelocityXEach(0);
    BananaGroup.setVelocityXEach(0);
 monkey.scale=0;
   jungle.velocityX=0;
  }
  
  spawnBanana();
  drawSprites();
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
  obstacle = createSprite(400,385,10,40);
    obstacle.velocityX = -6;
     obstacle.scale=0.2
    obstacle.addAnimation("Stone",obstacle_Image);
    obstacle.setCollider("rectangle",0,0,300,300);
    
    //assign scale and lifetime to the obstacle         
    obstacle.lifetime = 70;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}

function spawnBanana() {
  if(World.frameCount % 200 === 0) {
    Banana= createSprite(200,250,10,40);
  Banana.velocityX = -6;
    Banana.scale=0.1
    ;
     Banana.setCollider("rectangle",0,0,200,200);
   Banana.addAnimation("Banana",banana_Image);
    
    //assign scale and lifetime to the Banana        
    Banana.lifetime = 70;
    //add each obstacle to the group
    BananaGroup.add(Banana);
  }
}