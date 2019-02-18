import Canvas from '/javascript/utility/Canvas.js'
import sample from '/node_modules/lodash-es/sample.js'

const { atan2, cos, hypot, PI, random, sin } = Math

export default class Vec2 {
    constructor({ x = 0, y = 0 } = {}) {
        this.x = x
        this.y = y
    }

    get direction() {
        return atan2(this.y, this.x)
    }

    get magnitude() {
        return hypot(this.x, this.y)
    }

    add(otherVector) {
        return new Vec2({
            x: this.x + otherVector.x,
            y: this.y + otherVector.y,
        })
    }

    normalize() {
        const { direction } = this

        return Vec2.fromMagnitudeAndDirection({
            direction,
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
        const direction = random() * 2 * PI
        const magnitude = random() * maxMagnitude

        return Vec2.fromMagnitudeAndDirection({
            magnitude,
            direction,
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

    static fromMagnitudeAndDirection({ magnitude = 1, direction = 0 }) {
        return new Vec2({
            x: magnitude * cos(direction),
            y: magnitude * sin(direction),
        })
    }
}

export const NullVector = new Vec2()
