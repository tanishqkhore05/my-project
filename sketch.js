var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgroundImage,ground;
var doremon,doremon_running,doremon_collided;
var  obstacle1, obstacle2, obstacle3, obstacle4;
var dorime,dorimeImg;
var dieSound;
var checkPointSound;
var cloud,cloudImg;
var backgroundImage1;
var backgroundImage2;

function preload(){
   doremon_running = loadAnimation("Images/doremon1.png","Images/doremon2.png","Images/doremon3.png","Images/doremon4.png","Images/doremon5.png","Images/doremon6.png");
 doremon_collided = loadAnimation("Images/doremon1.png");
  
 backgroundImage = loadImage("Images/bg.jpg");
 backgroundImage1 = loadImage("Images/bg1.jpg");
 backgroundImage2 = loadImage("Images/bg2.jpg");
  
  
  obstacle1 = loadImage("Images/gian.png");
   obstacle2 = loadImage("Images/nobita.png");
   obstacle3 = loadImage("Images/shizuka.png");
   obstacle4 = loadImage("Images/suneo.png");
   
   dorimeImg = loadImage("Images/dorime.png")
  
  // restartImg = loadImage("restart.png")
  // gameOverImg = loadImage("gameOver.png")
  
  // jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3");
 checkPointSound = loadSound("checkPoint.mp3");

 cloudImg=loadImage("Images/cloud.png");
}

function setup() {
  createCanvas(760,300);

  var message = "This is a message";
 console.log(message)
  

  

  
   ground = createSprite(100,230,2000,500);
   ground.addImage("ground",backgroundImage);
   ground.addImage("ground1",backgroundImage1);
   ground.addImage("ground2",backgroundImage2);
   ground.x = ground.width /2;
   ground.scale=5;
   
   //fill("black")
   ground2 = createSprite(100,280,2000,20);
   ground2.shapeColor="red"


  

   doremon = createSprite(45,230,20,50);
   doremon.addAnimation("running", doremon_running);
   doremon.addAnimation("collided", doremon_collided);
   doremon.scale=1.5;
   doremon.debug=false;
   doremon.setCollider("circle",0,10,40);

  
  // //create Obstacle and Cloud Groups
   obstaclesGroup = createGroup();
   dorimeGroup = createGroup();
   cloudsGroup = createGroup();

  
 
  score = 0;
  
}

function draw() {
  
  background("#91E6F8");
  //displaying score


  if(gameState === PLAY)
  {  

        // gameOver.visible = false;
        // restart.visible = false;
        
        ground.velocityX = -4 ;
   
      
        if(keyDown("UP_ARROW"))
        {
          doremon.velocityY = -9;
          checkPointSound.play();
        
        }
        doremon.velocityY=doremon.velocityY+0.5;
        
        if (frameRate() % 600 === 0)
        {
           score=score+(Math.round(0.0000000000001));
        }
        
        if(score % 10000===0 && score>=10000 && score<=70000)
        {
          ground.changeImage("ground1",backgroundImage1);
        }

        if(score % 20000===0 && score>=20000 && score<=70000)
        {
          ground.changeImage("ground2",backgroundImage2);
        }

        //scoring
    
        
        // if(score>0 && score%100 === 0){
        //    checkPointSound.play() 
        // }
        
        if (ground.x < 0){
          ground.x = ground.width/2;
        }
        doremon.collide(ground2);

        if(obstaclesGroup.isTouching(doremon))
        {
          gameState = END;
          dieSound.play();
          
        }


        if(dorimeGroup.isTouching(doremon));
        {
          score=score+100;
        }

     spawnObstacles();
     spawnDorime();
     spawnClouds();
     drawSprites();

     text("Score: "+ score, 500,50);

     
  
    
  }

  else if(gameState===END)
  {
    doremon.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    fill("red");
    strokeWeight(10);
    textSize(30);
    text("PRESS R TO RESTART THE GAME",50,100);
    


    if(keyDown("r"))
    {
      gameState = PLAY;
      score=0;
      obstaclesGroup.destroyEach();
      ground.changeImage("ground",backgroundImage)
    }

  }

  
}


function spawnObstacles()
{
 if (frameCount % 120 === 0)
 {
      var obstacle = createSprite(400,200,10,40);
      obstacle.velocityX = -6 
      
      
        //generate random obstacles
        var rand = Math.round(random(1,4));
        switch(rand) 
        {
          case 1: obstacle.addImage(obstacle1);
                  break;
          case 2: obstacle.addImage(obstacle2);
                
                  break;
          case 3: obstacle.addImage(obstacle3);
                  break;
          case 4: obstacle.addImage(obstacle4);
                  break;
          default: break;
        }
      
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    obstacle.collide(ground2);
     obstacle.debug=false;
     obstacle.setCollider("circle",0,0,40);
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
 }

function spawnDorime()
{
  var random1 = Math.round(random(200,500));
  if (frameCount % random1 === 0)
 {
  var dorime = createSprite(400,200,10,40);
  dorime.addImage(dorimeImg);
  dorime.velocityX = -6;


  dorime.scale = 0.7;
  dorime.lifetime = 300;
  dorime.collide(ground2);
 
 //add each obstacle to the group
  dorimeGroup.add(dorime);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,180,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage("cloud",cloudImg);
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = doremon.depth;
    doremon.depth = doremon.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}