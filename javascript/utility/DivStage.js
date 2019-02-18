const { hypot } = Math

const stage = document.getElementById('div-stage')

export default {
    clear () {
        stage.innerHTML = ''
    },

    drawCircle({ x, y, radius, color = 'white', lineWidth = 2 }) {
        const diag = hypot(radius, radius)

        const div = document.createElement('div')

        div.classList.add('moving-object')
        div.style.top = y + 'px'
        div.style.left = x + 'px'
        div.style.width = 2 + radius * 2 + 'px'
        div.style.height = 2 + radius * 2 + 'px'
        div.style.border = `${lineWidth}px solid ${color}`

        stage.append(div)
    }
}
