let ship;
let asteroids = [];
let startNumAsteroids;
function setup(){    
    createCanvas(windowWidth,windowHeight);
    startNumAsteroids = floor(random(3,8))
    ship = new Ship()
    for(let i = 0; i < startNumAsteroids; i++){
        asteroids.push(new Asteroid())
    }
    frameRate(200)
    angleMode(DEGREES)
}

function draw(){
    background(0);

    for(let i = 0; i < asteroids.length; i++){
        asteroids[i].update()
        asteroids[i].show()
        asteroids[i].offScreen()
    }

    ship.update()
    ship.turn()
    ship.offScreen()
    ship.show()
    for(let i = ship.bullets.length -1; i >= 0; i--){
        ship.bullets[i].update()
        ship.bullets[i].show()
        ship.bullets[i].offScreen()
    }

}

function keyPressed(){
    if(keyCode == 32){
        ship.shoot()
    }
}
