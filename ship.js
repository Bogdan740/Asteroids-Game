let velDampening = 0.955

class Ship{
    constructor(){
        this.size = 30
        this.pos = createVector(width/2,height/2)
        this.vel = createVector(0,0)
        this.heading = 0
        this.bullets = []
    }
    update(){
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.vel.mult(velDampening)
        if(keyIsDown(87)){
            this.boost(0.7)   
        }
        if(keyIsDown(83)){
            this.boost(-0.7)   
        }
        for(let i = this.bullets.length-1; i >= 0; i--){
            let checker = this.bullets[i].onScreen
            if(!checker){
                this.bullets.splice(i,1)
            }
        }
    }
    boost(F){
        let k = p5.Vector.fromAngle(radians(this.heading) - HALF_PI,F);
        this.vel.add(k)
    }
    show(){
        push()
        translate(this.pos.x,this.pos.y)
        rotate(this.heading)
        fill(0,255,0,100)
        stroke(0,255,0)
        let b = createVector(-this.size,this.size)
        let c = createVector(this.size,this.size)
        triangle(0,-this.size,b.x,b.y,c.x,c.y)
        fill(255,0,0)
        stroke(0,255,0)
        strokeWeight(1)
        ellipse(0,- this.size/4,this.size/5)
        pop()
    }
    turn(){
        if(keyIsDown(65)){
            this.heading -= 7
        }
        
        if(keyIsDown(68)){
            this.heading += 7
        }
    }
    offScreen(){
        if(this.pos.x > width + this.size){
            this.pos.x = -this.size
        }
        if(this.pos.x < -this.size){
            this.pos.x = width+this.size
        }
        if(this.pos.y > height + this.size){
            this.pos.y = -this.size
        }
        if(this.pos.y < -this.size){
            this.pos.y = height+this.size
        }
    }
    shoot(){
        let newPos = createVector(this.pos.x,this.pos.y - this.size/4)
        this.bullets.push(new Bullet(newPos,this.heading-90,this.size/10))
    }


}