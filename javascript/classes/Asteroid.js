import Canvas from '/javascript/utility/Canvas.js'
import MovingObject, { DEFAULT_RADIUS } from '/javascript/classes/MovingObject.js'
import Vec2 from '/javascript/utility/Vec2.js'

const { PI, random } = Math

const ASTEROID_GENERATIONS = 3
const MAX_SPEED = 2

export default class Asteroid extends MovingObject {
    destroy() {
        if (this.generation >= ASTEROID_GENERATIONS) { return }

        const offset = random()
        return [ 1/3, 2/3, 3/3 ].map(portion => {
            const direction = 2 * PI * (offset + portion)
            const velocity = Vec2.fromMagnitudeAndDirection({
                direction,
            })

            return (
                new Asteroid({
                    ...this,
                    velocity,
                    radius: this.radius / 2,
                    generation: this.generation + 1
                })
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
