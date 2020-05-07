class Bullet{
    constructor(pos,heading,size){
        this.pos = pos
        this.heading = heading
        this.size = size
        this.onScreen = true
    }
    update(){
        if(this.onScreen){
            this.boost(25)
        }
    }
    boost(force){
        let F = p5.Vector.fromAngle(radians(this.heading),force)
        this.pos.add(F)
    }
    show(){
        push()
        noStroke()
        fill(255,0,0)
        ellipse(this.pos.x,this.pos.y,this.size)
        pop()
    }
    offScreen(){
        if(this.pos.x > width + this.size || this.pos.x < -this.size || this.pos.y > height + this.size || this.pos.y < -this.size){
            this.onScreen = false

        }
    }
}