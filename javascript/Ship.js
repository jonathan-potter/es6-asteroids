import Canvas from '/javascript/Canvas.js'
import key from '/javascript/Keymaster.js'
import MovingObject from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'

const { cos, PI, sin } = Math

const ACCELERATION = .1
const BULLET_SPEED = 5

export default class Ship extends MovingObject {
    direction = -PI/2
    color = '#FFAAAA'
    lineWidth = 3

    get acceleration() {
        const { direction } = this

        if (key.isPressed('up')) {
            return new Vec2({
                x: ACCELERATION * cos(this.direction),
                y: ACCELERATION * sin(this.direction),
            })
        } else {
            return new Vec2()
        }
    }

    draw() {
        // body
        Canvas.drawCircle(this)
        // nose
        Canvas.drawCircle(Object.assign({}, this, {
            x: this.x + this.radius * cos(this.direction),
            y: this.y + this.radius * sin(this.direction),
            radius: 3,
        }))
    }

    move() {
        if (key.isPressed('left')) {
            this.direction -= 0.1
        }
        if (key.isPressed('right')) {
            this.direction += 0.1
        }
        MovingObject.prototype.move.call(this)
        this.wrap()
    }

    shoot() {
        const position = new Vec2({
            x: this.x + this.radius * cos(this.direction),
            y: this.y + this.radius * sin(this.direction),
        })
        const velocity = new Vec2({
            x: BULLET_SPEED * cos(this.direction),
            y: BULLET_SPEED * sin(this.direction),
        })

        return new MovingObject({
            position,
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
