import Canvas from '/javascript/Canvas.js'
import sample from '/node_modules/lodash-es/sample.js'

const { cos, PI, random, sin } = Math

export default class Vec2 {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x
        this.y = y
    }

    add(otherVector) {
        return new Vec2({
            x: this.x + otherVector.x,
            y: this.y + otherVector.y,
        })
    }

    subtract(otherVector) {
        return new Vec2({
            x: this.x - otherVector.x,
            y: this.y - otherVector.y,
        })
    }

    static createRandomInCircle(maxMagnitude = 1) {
        const angle     = random() * 2 * PI
        const magnitude = random() * maxMagnitude

        return new Vec2({
            x: magnitude * cos(angle),
            y: magnitude * sin(angle),
        })
    }

    static createRandomInBoundingBox({ min, width, height }) {
        return new Vec2({
            x: min.x + random() * width,
            y: min.y + random() * height,
        })
    }

    static createRandomJustOutsideBoundingBox(boundingBox) {
        const canvasBB = Canvas.getBoundingBox()

        const position = Vec2.createRandomInBoundingBox(boundingBox)

        const edge = sample(['x', 'y'])
        const minMax = sample(['min', 'max'])

        position[edge] = canvasBB[minMax][edge]

        return position
    }
}
