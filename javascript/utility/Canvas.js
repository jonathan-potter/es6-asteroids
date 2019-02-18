import BoundingBox from '/javascript/utility/BoundingBox.js'
import Vec2, { NullVector } from '/javascript/utility/Vec2.js'

const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const { PI } = Math

export default {
    clear() {
        context.clearRect(0, 0, 1e4, 1e4)
    },

    drawCircle({ x, y, radius, color = 'white', lineWidth = 2 }) {
        context.beginPath()

        context.lineWidth = lineWidth
        context.strokeStyle = color
        context.arc(x, y, radius, 0, 2 * PI)

        context.closePath()
        context.stroke()
    },

    getBoundingBox() {
        const { width, height } = canvas

        return new BoundingBox({
            min: NullVector,
            max: new Vec2({ x: width, y: height }),
        })
    }
}
