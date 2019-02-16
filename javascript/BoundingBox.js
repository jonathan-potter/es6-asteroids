export default class BoundingBox {
    constructor({ min, max }) {
        this.min = min
        this.max = max
    }

    get width() {
        return this.max.x - this.min.x
    }

    get height() {
        return this.max.y - this.min.y
    }

    intersects(boundingBox) {
        return !(
            this.isLeftOf(boundingBox) ||
            this.isRightOf(boundingBox) ||
            this.isBelow(boundingBox) ||
            this.isAbove(boundingBox)
        )
    }

    isLeftOf(boundingBox) {
        return this.max.x < boundingBox.min.x
    }

    isRightOf(boundingBox) {
        return this.min.x > boundingBox.max.x
    }

    isBelow(boundingBox) {
        return this.max.y < boundingBox.min.y
    }

    isAbove(boundingBox) {
        return this.min.y > boundingBox.max.y
    }
}
