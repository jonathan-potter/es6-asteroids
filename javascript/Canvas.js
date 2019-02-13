const canvas = document.getElementById('canvas')
const context = canvas.getContext('2d')

const { PI } = Math

export default {
    clear() {
        context.clearRect(0, 0, 1e4, 1e4)
    },

    drawCircle({ x, y, radius, color }) {
        context.beginPath()

        context.strokeStyle = color
        context.arc(x, y, radius, 0, 2 * PI)

        context.closePath()
        context.stroke()
    },

    getProperties() {
        return {
            width: canvas.clientWidth,
            height: canvas.clientHeight,
        }
    }
}
