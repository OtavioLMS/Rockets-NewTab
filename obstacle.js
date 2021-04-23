function Obstacle(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    
    this.show = function(){
        fill(200, 90, 90);
//        stroke(230, 100, 100, 50);
        rect(this.x, this.y, this.width, this.height);
//        rect(this.x, this.y, this.width - this.x, this.height - this.y);
        noStroke();
    }
    
    this.complete = function(mx, my){
        if(this.x <= mx){
            this.width = mx - this.x;
        } else {
            this.width = this.x - mx;
            this.x = mx;
        }
        
        if(this.y <= my){
            this.height = my - this.y;
        } else {
            this.height = this.y - my;
            this.y = my;
        }
    }
}