import MovingObject from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'
// import Interaction from 'javascript/Interaction.js'

const { cos, sin } = Math

const ACCELERATION = .1

export default class Ship extends MovingObject {
    direction = 0

    get acceleration() {
        const { direction } = this

        return new Vec2({
            x: ACCELERATION * cos(direction),
            y: ACCELERATION * sin(direction),
        })
    }
}
