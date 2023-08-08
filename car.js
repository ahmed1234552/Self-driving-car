class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.maxSpeed = 3;
    this.acceleration = 0.1;
    this.friction = 0.05;
    this.angle = 0;


    this.controls = new Controls();
  }


    update() {
        this.#move();
    }

    #move() {
        if (this.controls.forward) {
            //this.y -= 2;
            this.speed += this.acceleration;
        }
        if (this.controls.reverse) {
            //this.y += 2;
            this.speed -= this.acceleration;
        }
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        else if (this.speed < -this.maxSpeed / 2) {//in case of reverse max speed is 1/2
            this.speed = -this.maxSpeed / 2;//max reverse speed"-:reverse"
        }
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        else if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        if (this.speed != 0) {//if speed = 0 cant turn left or right
            const flip = this.speed > 0 ? 1 : -1;

            if (this.controls.left) {
                //this.x -= 2;
                this.angle += 0.03 * flip;
            }
            if (this.controls.right) {
                //this.x += 2;
                this.angle -= 0.03 * flip;
            }
        }
        this.x -= this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
  draw(ctx) {
    //0,0 is up left corner

    ctx.save(); //save current state of canvas
    ctx.translate(this.x, this.y);//move canvas to center of car
    ctx.rotate(-this.angle);//rotate canvas
    ctx.beginPath(); //x is center of car
    ctx.rect(
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
      ctx.fill();
      
      ctx.restore();//restore canvas to previous state
  }
}
