import Canvas from '/javascript/Canvas.js'
import MovingObject, { DEFAULT_RADIUS } from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'

export default class Asteroid extends MovingObject {
    destroy() {
        return new Asteroid(Object.assign({}, this, {
            radius: this.radius / 2
        }))
    }

    static createRandom() {
        const canvasBB = Canvas.getBoundingBox()

        return new Asteroid({
            position: Vec2.createRandomJustOutsideBoundingBox({
                boundingBox: canvasBB,
                distance: DEFAULT_RADIUS,
            }),
            velocity: Vec2.createRandomInCircle(5),
        })
    }
}
