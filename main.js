const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");//drawing context
const road = new Road(canvas.width / 2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
//car.draw(ctx);

animate();

function animate() {
    car.update(road.borders);

    canvas.height = window.innerHeight;//resize canvas clear canvas too

    ctx.save();//save the current state of the context
    ctx.translate(0, -car.y+canvas.height*0.7);

    road.draw(ctx);
    car.draw(ctx);
    ctx.restore();//restore the context to the saved state

    requestAnimationFrame(animate);//call animate again many times
}