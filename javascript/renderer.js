import Canvas from '/javascript/utility/Canvas.js'
import DivStage from '/javascript/utility/DivStage.js'

export default {
    clear() {
        Canvas.clear()
        DivStage.clear()
    },

    drawCircle() {
        Canvas.drawCircle.apply(undefined, arguments)
        DivStage.drawCircle.apply(undefined, arguments)
    }
}
