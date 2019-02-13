import MovingObject from '/javascript/MovingObject.js'
import Vec2 from '/javascript/Vec2.js'
import Canvas from '/javascript/Canvas.js'

const MAX_ASTEROIDS = 20;

const asteroids = []

requestAnimationFrame(function runLoop () {
    while (asteroids.length < MAX_ASTEROIDS) {
        asteroids.push(MovingObject.createRandom())
    }

    Canvas.clear()
    asteroids.forEach(asteroid => {
        asteroid.move()
        Canvas.drawCircle(asteroid)
    })

    requestAnimationFrame(runLoop)
})

window.Vec2 = Vec2
window.Canvas = Canvas
