import Canvas from '/javascript/Canvas.js'
import key from '/javascript/Keymaster.js'
import MovingObject from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'

const { cos, PI, sin } = Math

const ACCELERATION = .1

export default class Ship extends MovingObject {
    direction = -PI/2
    color = '#FFAAAA'
    lineWidth = 3

    get acceleration() {
        const { direction } = this

        if (key.isPressed('up')) {
            return new Vec2({
                x: ACCELERATION * cos(direction),
                y: ACCELERATION * sin(direction),
            })
        } else {
            return new Vec2()
        }
    }

    draw() {
        Canvas.drawCircle(this)
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
    }
}
