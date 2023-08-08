const canvas = document.getElementById("myCanvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");//drawing context
const road = new Road(canvas.width / 2, canvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;//resize canvas clear canvas too
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);//call animate again many times
}