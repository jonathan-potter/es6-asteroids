import Canvas from '/javascript/Canvas.js'
import sample from '/node_modules/lodash-es/sample.js'

const { atan2, cos, hypot, PI, random, sin } = Math

export default class Vec2 {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x
        this.y = y
    }

    get argument() {
        return atan2(this.y, this.x)
    }

    add(otherVector) {
        return new Vec2({
            x: this.x + otherVector.x,
            y: this.y + otherVector.y,
        })
    }

    get magnitude() {
        return hypot(this.x, this.y)
    }

    normalize() {
        const { argument } = this

        return new Vec2({
            x: cos(argument),
            y: sin(argument),
        })
    }

    scale(scale) {
        return new Vec2({
            x: this.x * scale,
            y: this.y * scale,
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

    static createRandomJustOutsideBoundingBox({ boundingBox, distance = 0} ) {
        const canvasBB = Canvas.getBoundingBox()

        const position = Vec2.createRandomInBoundingBox(boundingBox)

        const edge = sample(['x', 'y'])
        const minMax = sample(['min', 'max'])

        if (minMax === 'min') {
            position[edge] = canvasBB[minMax][edge] - distance
        } else {
            position[edge] = canvasBB[minMax][edge] + distance
        }

        return position
    }
}
