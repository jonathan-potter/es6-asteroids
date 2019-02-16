import BoundingBox from '/javascript/BoundingBox.js'
import Canvas from '/javascript/Canvas.js'
import Vec2 from '/javascript/Vec2.js'

const { hypot } = Math
const DEFAULT_RADIUS = 20

export default class MovingObject {
    radius = DEFAULT_RADIUS

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
