import BoundingBox from '/javascript/BoundingBox.js'
import Canvas from '/javascript/Canvas.js'
import Vec2, { NullVector } from '/javascript/Vec2.js'

const { hypot } = Math
const DEFAULT_RADIUS = 20

export default class MovingObject {
    constructor({ position = NullVector, velocity = NullVector, color = 'white', radius = 20 } = {}) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.radius = radius
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    get acceleration() {
        return NullVector
    }

    get boundingBox() {
        const hypotonuse = hypot(this.radius, this.radius)
        const half = new Vec2({
            x: hypotonuse,
            y: hypotonuse,
        })

        return new BoundingBox({
            min: this.position.subtract(half),
            max: this.position.add(half),
        })
    }

    draw() {
        Canvas.drawCircle(this)
    }

    isCollidedWith(otherObject) {
        const distance = this.position.subtract(otherObject.position).magnitude

        return distance < this.radius + otherObject.radius
    }

    move() {
        this.position = this.position.add(this.velocity)
        this.velocity = this.velocity.add(this.acceleration)
    }

    static createRandom() {
        const canvasBB = Canvas.getBoundingBox()

        return new MovingObject({
            position: Vec2.createRandomJustOutsideBoundingBox({
                boundingBox: canvasBB,
                distance: DEFAULT_RADIUS,
            }),
            velocity: Vec2.createRandomInCircle(5),
        })
    }
}
