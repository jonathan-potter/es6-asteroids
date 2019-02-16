import BoundingBox from '/javascript/BoundingBox.js'
import Vec2 from '/javascript/Vec2.js';

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

    getProperties() {
        const { width, height } = canvas

        return {
            width,
            height,
            boundingBox: new BoundingBox({
                min: new Vec2(),
                max: new Vec2({ x: width, y: height }),
            })
        }
    }
}
