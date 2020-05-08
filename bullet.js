class Bullet{
    constructor(pos,heading,size){
        this.pos = pos
        this.heading = heading
        this.size = size
        this.onScreen = true
        this.timer = 45
    }
    update(){
        this.timer --
        if(this.timer > 0){
            this.boost(20)
        }else{
            this.onScreen = false
        }
    }
    boost(force){
        let F = p5.Vector.fromAngle(radians(this.heading),force)
        this.pos.add(F)
    }
    show(){
        push()
        noStroke()
        fill(0,255,0)
        ellipse(this.pos.x,this.pos.y,this.size)
        pop()
    }
    offScreen(){
        if(this.pos.x > width){
            this.pos.x = 0
        }
        
        if(this.pos.x < 0){
            this.pos.x = width
        }
        
        if(this.pos.y > height){
            this.pos.y = 0
        }
        
        if(this.pos.y < 0){
            this.pos.y = height
        }
    }
}