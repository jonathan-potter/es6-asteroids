import Canvas from '/javascript/utility/Canvas.js'
import { key } from '/javascript/globals.js'
import MovingObject from '/javascript/classes/MovingObject.js'
import Vec2, { NullVector } from '/javascript/utility/Vec2.js'

const { cos, min, PI, sin } = Math

const MAX_SPEED = 6
const ACCELERATION = .1
const BULLET_SPEED = 8

export default class Ship extends MovingObject {
    direction = -PI/2
    color = '#FFAAAA'
    lineWidth = 3

    get acceleration() {
        const { direction } = this

        if (key.isPressed('up')) {
            return Vec2.fromMagnitudeAndDirection({
                magnitude: ACCELERATION,
                direction,
            })
        } else {
            return NullVector
        }
    }

    get frontPosition() {
        const { direction, radius } = this

        const offset = Vec2.fromMagnitudeAndDirection({
            magnitude: radius,
            direction,
        })

        return this.position.add(offset)
    }

    draw() {
        // body
        Canvas.drawCircle(this)
        // nose
        Canvas.drawCircle({
            ...this,
            ...this.frontPosition,
            radius: 3,
        })
    }

    limitSpeed() {
        if (this.velocity.magnitude < MAX_SPEED) { return }

        this.velocity = this.velocity.normalize().scale(MAX_SPEED)
    }

    move() {
        if (key.isPressed('left')) {
            this.direction -= 0.1
        }
        if (key.isPressed('right')) {
            this.direction += 0.1
        }
        MovingObject.prototype.move.call(this)
        this.limitSpeed()
        this.wrap()
    }

    shoot() {
        const { direction, frontPosition } = this

        const velocity = Vec2.fromMagnitudeAndDirection({
            magnitude: BULLET_SPEED,
            direction,
        })

        return new MovingObject({
            position: frontPosition,
            velocity,
            color: 'red',
            radius: 4,
        })
    }

    wrap() {
        const canvasBB = Canvas.getBoundingBox()

        if (this.boundingBox.isLeftOf(canvasBB)) {
            this.position = this.position.add(new Vec2({
                x: canvasBB.width + 2 * (this.radius + this.lineWidth) + 2
            }))
        } else if (this.boundingBox.isRightOf(canvasBB)) {
            this.position = this.position.subtract(new Vec2({
                x: canvasBB.width + 2 * (this.radius + this.lineWidth) + 2
            }))
        } else if (this.boundingBox.isBelow(canvasBB)) {
            this.position = this.position.add(new Vec2({
                y: canvasBB.height + 2 * (this.radius + this.lineWidth) + 2
            }))
        } else if (this.boundingBox.isAbove(canvasBB)) {
            this.position = this.position.subtract(new Vec2({
                y: canvasBB.height + 2 * (this.radius + this.lineWidth) + 2
            }))
        }
    }
}
