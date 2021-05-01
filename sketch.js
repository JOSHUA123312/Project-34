//Create variables here
var dog,happydog,dogImg
var database 
var foodS,foodStock

function preload()
{
	//load images here
  happydog=loadImage("images/dogImg.png")
  dogImg=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500,500);
  dog=createSprite(300,300,10,10)
  dog.addImage(happydog)
  dog.scale=0.4
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)
  foodStock.set(20)
}


function draw() {  
background(46,139,87)


  textSize(20)
  fill(255)
  text("Press Up Arrow to feed Drago milk",100,50)
  text("Press Down Arrow when you don't want to feed Drago",10,75)
  text("Food Remaining:"+foodS,150,100)


if(keyWentDown(UP_ARROW)){
writeStock(foodS)
dog.addImage(dogImg)
}

if(keyWentDown(DOWN_ARROW)){
  dog.addImage(happydog)
  }

if(foodS===0){
  foodS=20
}
  drawSprites();
  
}

function readStock(data){
  foodS=data.val()
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
database.ref( "/" ).update({
Food:x
})
}



