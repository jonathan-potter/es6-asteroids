import Canvas from '/javascript/Canvas.js'
import Vec2 from '/javascript/Vec2.js'

export default class MovingObject {
    radius = 20
    color = 'white'

    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    move() {
        this.position.add(this.velocity)
    }

    static createRandom() {
        const canvasProperties = Canvas.getProperties()

        return new MovingObject({
            position: Vec2.createRandomInRectangle(canvasProperties),
            velocity: Vec2.createRandomInCircle(5),
        })
    }
}
