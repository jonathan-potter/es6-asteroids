import BoundingBox from '/javascript/utility/BoundingBox.js'
import Canvas from '/javascript/utility/Canvas.js'
import renderer from '/javascript/renderer.js'
import Vec2, { NullVector } from '/javascript/utility/Vec2.js'

const { hypot } = Math
export const DEFAULT_RADIUS = 20

export default class MovingObject {
    constructor({ position = NullVector, velocity = NullVector, color = 'white', radius = 20, generation = 1 } = {}) {
        this.position = position
        this.velocity = velocity
        this.color = color
        this.radius = radius
        this.generation = generation,
        this.hit = false
    }

    get x() {
        return this.position.x
    }

    get y() {
        return this.position.y
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

    destroy() {
        return
    }

    draw() {
        renderer.drawCircle(this)
    }

    isCollidedWith(otherObject) {
        const distance = this.position.subtract(otherObject.position).magnitude

        return distance < this.radius + otherObject.radius
    }

    move() {
        this.position = this.position.add(this.velocity)
        this.velocity = this.velocity.add(this.acceleration)
    }
}
