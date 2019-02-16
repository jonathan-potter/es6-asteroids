import Canvas from '/javascript/Canvas.js'
import Vec2 from '/javascript/Vec2.js'

const { hypot } = Math

export default class MovingObject {
    radius = 20

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

        return {
            min: this.position.subtract(half),
            max: this.position.add(half),
        }
    }

    move() {
        this.position = this.position.add(this.velocity)
        this.velocity = this.velocity.add(this.acceleration)
    }

    static createRandom() {
        const canvasProperties = Canvas.getProperties()

        return new MovingObject({
            position: Vec2.createRandomJustOutsideBoundingBox(canvasProperties.boundingBox),
            velocity: Vec2.createRandomInCircle(5),
        })
    }
}
