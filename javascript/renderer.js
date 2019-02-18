import Canvas from '/javascript/utility/Canvas.js'

export default {
    clear() {
        Canvas.clear()
    },

    drawCircle() {
        Canvas.drawCircle.apply(undefined, arguments)
    }
}
