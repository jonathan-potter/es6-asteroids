const { cos, PI, random, sin } = Math

export default class Vec2 {
    constructor({ x, y }) {
        this.x = x
        this.y = y
    }

    add(otherVector) {
        this.x += otherVector.x
        this.y += otherVector.y
    }

    static createRandomInCircle(maxMagnitude = 1) {
        const angle     = random() * 2 * PI
        const magnitude = random() * maxMagnitude

        return new Vec2({
            x: magnitude * cos(angle),
            y: magnitude * sin(angle),
        })
    }

    static createRandomInRectangle({ width, height }) {
        return new Vec2({
            x: random() * width,
            y: random() * height,
        })
    }
}
