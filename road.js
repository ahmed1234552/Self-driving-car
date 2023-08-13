class Road{
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;

        const topLeft = { x: this.left,y: this.top };
        const topRight = { x: this.right, y: this.top };
        const bottomLeft = { x: this.left, y: this.bottom };
        const bottomRight = { x: this.right, y: this.bottom };
        this.borders = [
            [topLeft, bottomLeft],
            [topRight, bottomRight]
        ];
    }

    getLaneCenter(laneIndex) {
        if (laneIndex < 0 || laneIndex >= this.laneCount) {
            laneIndex = 0;
        }
        const laneWidth = this.width / this.laneCount;//this.width is the width of the road
        return this.left + laneWidth * (laneIndex + 0.5);//laneIndex+0.5 is the center of the lane
    }
        draw(ctx) {//context
        ctx.lineWidyh = 8;
        ctx.strokeStyle = "white";

        for (let i = 1; i <= this.laneCount-1; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );//linear interpolation

            ctx.setLineDash([20,20]);//dash line
            ctx.beginPath();
            ctx.moveTo(x, this.top);
            ctx.lineTo(x, this.bottom);
            ctx.stroke();
            }

            ctx.setLineDash([]);
            this.borders.forEach(border => {
                ctx.beginPath();
                ctx.moveTo(border[0].x, border[0].y);
                ctx.lineTo(border[1].x, border[1].y);
                ctx.stroke();
            });
    }
}

