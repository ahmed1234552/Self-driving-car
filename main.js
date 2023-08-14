const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");//drawing context
const networkCtx = carCanvas.getContext("2d");//drawing context
const road = new Road(carCanvas.width / 2, carCanvas.width*0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50,"AI");
const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"DUMMY",2)
];

animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    }
    car.update(road.borders,traffic);

    carCanvas.height = window.innerHeight;//resize canvas clear canvas too
    networkCanvas.height = window.innerHeight;//resize canvas clear canvas too

    carCtx.save();//save the current state of the context
    carCtx.translate(0, -car.y+carCanvas.height*0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++){
        traffic[i].draw(carCtx,"green");
    }
    car.draw(carCtx,"blue");
    carCtx.restore();//restore the context to the saved state

    requestAnimationFrame(animate);//call animate again many times
}