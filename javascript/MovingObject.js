import Canvas from '/javascript/Canvas.js'
import Vec2 from '/javascript/Vec2.js'

export default class MovingObject {
    radius = 20
    color = 'white'

    constructor({ position, velocity } = {}) {
        this.position = position || new Vec2()
        this.velocity = velocity || new Vec2()
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    get acceleration() {
        return new Vec2()
    }

    move() {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)
    }

    static createRandom() {
        const canvasProperties = Canvas.getProperties()

        return new MovingObject({
            position: Vec2.createRandomInRectangle(canvasProperties),
            velocity: Vec2.createRandomInCircle(5),
        })
    }
}
