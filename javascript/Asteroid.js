import Canvas from '/javascript/Canvas.js'
import MovingObject, { DEFAULT_RADIUS } from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'

const { cos, PI, random, sin } = Math

const ASTEROID_GENERATIONS = 3
const MAX_SPEED = 2

export default class Asteroid extends MovingObject {
    destroy() {
        if (this.generation >= ASTEROID_GENERATIONS) { return }

        const offset = random()
        return [ 1/3, 2/3, 3/3 ].map(portion => {
            const direction = 2 * PI * (offset + portion)

            return (
                new Asteroid(Object.assign({}, this, {
                    velocity: new Vec2({
                        x: cos(direction),
                        y: sin(direction),
                    }),
                    radius: this.radius / 2,
                    generation: this.generation + 1
                }))
            )
        })
    }

    static createRandom() {
        const canvasBB = Canvas.getBoundingBox()

        return new Asteroid({
            position: Vec2.createRandomJustOutsideBoundingBox({
                boundingBox: canvasBB,
                distance: DEFAULT_RADIUS,
            }),
            velocity: Vec2.createRandomInCircle(MAX_SPEED),
        })
    }
}
