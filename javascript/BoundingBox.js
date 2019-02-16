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
            this.max.x < boundingBox.min.x ||
            this.min.x > boundingBox.max.x ||
            this.max.y < boundingBox.min.y ||
            this.min.y > boundingBox.max.y
        )
    }
}
