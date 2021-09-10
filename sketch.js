var monkey
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
gamestate = "play"

function preload() {

  bg = loadImage("images/jungle.jpg")
  monkey_running = loadAnimation("images/Monkey_01.png",
"images/Monkey_02.png", "images/Monkey_03.png", "images/Monkey_04.png",
 "images/Monkey_05.png", "images/Monkey_06.png", "images/Monkey_07.png",
  "images/Monkey_08.png", "images/Monkey_09.png", "images/Monkey_10.png")
  
  bananaImage = loadImage("images/banana.png");
  obstaceImage = loadImage("images/obstacle.png");

}



function setup() {
  createCanvas(900, 500)
  monkey = createSprite(50, 400)
  monkey.addAnimation("running", monkey_running)
  monkey.scale = 0.15
monkey.debug= true
  ground = createSprite(450, 450, 1000, 20);
  ground.shapeColor = "black"
  score = 0
  FoodGroup = new Group()
  obstacleGroup = new Group()
}

 
function draw() {
  background("black")
  if (gamestate === "play") {
    if (frameCount % 90 === 0) {
      obstacle = createSprite(1110, 420)
      obstacle.addImage("obstacle", obstaceImage)
      obstacle.scale = 0.15
      obstacle.velocityX = -(5 + score / 10)
      obstacleGroup.add(obstacle)
    }
    if (frameCount % 60 === 0) {
      banana = createSprite(1110, 350)
      banana.addImage(bananaImage)
      banana.velocityX = -(5 + score / 10)
      banana.scale = 0.1
      FoodGroup.add(banana)
    }
    text("score:" + score, 50, 250)
    if (monkey.isTouching(FoodGroup) ) {
      score = score + 10
      monkey.scale=monkey.scale+0.01
      FoodGroup.destroyEach()
    }
    
    monkey.collide(ground)

    if (keyDown("space") && monkey.y > 390) {
      monkey.velocityY = -15;

    }
    monkey.velocityY = monkey.velocityY + 0.8

    if (obstacleGroup.isTouching(monkey)) {
      gamestate = "end"
    }

  }
    
    if (gamestate == "end"){
      obstacleGroup.setVelocityXEach (0)
      obstacleGroup.setLifetimeEach  (-1)
      FoodGroup.setVelocityXEach (0)
      FoodGroup.setLifetimeEach  (-1)
      monkey.collide(ground)
      text("Game Over", width/2,height/2)
    }

    if (keyDown("space")&&gamestate === "end"){
      FoodGroup.destroyEach()
      obstacleGroup.destroyEach()
      monkey.scale = 0.15
      gamestate = "play"
    }  
  
  
  drawSprites();
}