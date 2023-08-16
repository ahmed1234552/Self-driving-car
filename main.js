const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;

const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;

const carCtx = carCanvas.getContext("2d");//drawing context
const networkCtx = carCanvas.getContext("2d");//drawing context

const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);

const N = 100;
const cars = generateCars(N);
let bestCar = cars[0];//changing
if (localStorage.getItem("bestBrain")) {//if there is a best brain
    bestCar.brain = JSON.parse(
        localStorage.getItem("bestBrain")
    );
}

const traffic = [
    new Car(road.getLaneCenter(1), -100, 30, 50,"DUMMY",2)
];

animate();

function save() {
    localStorage.setItem("bestBrain",
        JSON.stringify(bestCar.brain));//serialize it
}

function discard() {
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    const cars = [];
    for (let i = 0; i < N; i++) {
        cars.push(new Car(road.getLaneCenter(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders,[]);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(
      (car) =>
        car.y ==
        Math.min(
          ...cars.map((car) => car.y) //create an array of all the y values
          //...to spread the array into individual values for Math.min
        )
    );

    carCanvas.height = window.innerHeight;//resize canvas clear canvas too
    networkCanvas.height = window.innerHeight;//resize canvas clear canvas too

    carCtx.save();//save the current state of the context
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.7);

    road.draw(carCtx);
    for (let i = 0; i < traffic.length; i++){
        traffic[i].draw(carCtx,"green");
    }
    carCtx.globalAlpha = 0.2;//transparency
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue");
    }
    carCtx.globalAlpha = 1;
    bestCar.draw(carCtx, "blue", true);

    carCtx.restore();//restore the context to the saved state

    networkCtx.lineDashOffset = -time / 50;
    requestAnimationFrame(animate);//call animate again many times
}