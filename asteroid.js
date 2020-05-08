let randomPos

class Asteroid{
    constructor(pos,size){
        this.velAndPosPicker = random()
        this.r = size || random(75,200)
        this.maxVel = map(this.r,50,200,3,2)
        // Choose randomly which direction the asteroid comes from
        if(this.velAndPosPicker <= 0.25){ // Start on TOP
            randomPos = createVector(random(width),-this.r)
            this.vel = createVector(random(-this.maxVel,this.maxVel),random(this.maxVel))
        }else if(this.velAndPosPicker > 0.25 && this.velAndPosPicker <= 0.5){// Start on LEFT
            randomPos = createVector(-this.r,random(height))
            this.vel = createVector(random(this.maxVel),random(-this.maxVel,this.maxVel))
        }else if(this.velAndPosPicker > 0.5 && this.velAndPosPicker <= 0.75){// Start on BOTTOM
            randomPos = createVector(-this.r,random(height))
            this.vel = createVector(random(this.maxVel),random(-this.maxVel,this.maxVel))
        }else if(this.velAndPosPicker > 0.75 && this.velAndPosPicker <= 1){// Start on RIGHT
            randomPos = createVector(width + this.r,random(height))
            this.vel = createVector(random(-this.maxVel),random(-this.maxVel,this.maxVel))
        }
        this.pos = pos || randomPos

        this.magnitudes = []
        this.spikyness = this.r / 7 // number of vertices that the asteroid has
        for(let i = 0; i < this.spikyness ; i++){
            this.magnitudes.push(random(this.r * (0.55),this.r))// Random distancrs away from the center of the asteroid
        }
        this.angle = (360/ this.spikyness)
        // Some random variation in the angle rotated by to create less polygonal looking asteroids
        this.randomAngles = []
        for(let i = 0; i < this.magnitudes.length; i ++){
            this.randomAngles.push(random(-this.spikyness * (1/this.r),this.spikyness * (1/this.r)))
        }
        this.active = true


    }
    destroy(){
        asteroidExplosion.play()
        if(this.r < 75){
            this.active = false
        }else{
            asteroids.push(new Asteroid(createVector(this.pos.x,this.pos.y),this.r/2))
            asteroids.push(new Asteroid(createVector(this.pos.x,this.pos.y),this.r/2))
            this.active = false
        }

    }
    update(){
        this.pos.add(this.vel)

        for(let i = ship.bullets.length -1; i >= 0; i--){
            let distance = dist(ship.bullets[i].pos.x,ship.bullets[i].pos.y,this.pos.x,this.pos.y)
            if(distance < this.r){
                this.destroy()
                ship.bullets.splice(i ,1)
            }
        }
    
    }
    show(){
        stroke(255,0,0,200)
        fill(255,0,0,100)
        beginShape()
        for(let i = 0; i < this.magnitudes.length; i++){
            let r = this.magnitudes[i]
            let x = r * cos((this.angle * i) + this.randomAngles[i])
            let y  = r * sin((this.angle * i) + this.randomAngles[i])
            vertex(this.pos.x + x,this.pos.y + y)
        }
        endShape(CLOSE)
    }
    offScreen(){
        if(this.pos.x > width + this.r){
            this.pos.x = -this.r
            this.vel.mult(random(0.95, 1.05))

        }
        
        if(this.pos.x < -this.r){
            this.pos.x = width + this.r
            this.vel.mult(random(0.95, 1.05))
        }
        
        if(this.pos.y > height + this.r){
            this.pos.y = -this.r
            this.vel.mult(random(0.95, 1.05))
        }
        
        if(this.pos.y < -this.r){
            this.pos.y = height+ this.r
            this.vel.mult(random(0.95, 1.05))
        }
    }

}