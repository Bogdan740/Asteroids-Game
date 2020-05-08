let ship;
let asteroids = [];
let startNumAsteroids;

let laserSound
let asteroidExplosion



function preload(){
    laserSound = loadSound('sounds/laserEffect.mp3');
    asteroidExplosion = loadSound('sounds/asteroidExplosion.mp3')
}
function setup(){   
    laserSound.setVolume(0.2)
    createCanvas(windowWidth,windowHeight);
    let start = windowWidth/200
    startNumAsteroids = floor(random(start,1.5*start))
    ship = new Ship()
    for(let i = 0; i < startNumAsteroids; i++){
        asteroids.push(new Asteroid())
    }
    frameRate(200)
    angleMode(DEGREES)
}

function draw(){
    background(25);


    for(let i = asteroids.length -1; i >= 0; i--){
        asteroids[i].update()
        asteroids[i].show()
        asteroids[i].offScreen()
        if(!asteroids[i].active){
            asteroids.splice(i,1)
        }

    }
    if(asteroids.length < startNumAsteroids){
        asteroids.push(new Asteroid())
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
    if(keyCode == 32 && ship.bullets.length < 4){
        ship.shoot()
    }
}
