import Canvas from '/javascript/Canvas.js'
import MovingObject from '/javascript/MovingObject.js'
import Ship from '/javascript/Ship.js'
import Vec2 from '/javascript/Vec2.js'

const canvasProperties = Canvas.getProperties()
const MAX_ASTEROIDS = 20;

const asteroids = []
const ship = new Ship({
    position: new Vec2({
        x: canvasProperties.width / 2,
        y: canvasProperties.height / 2
    })
});

requestAnimationFrame(function runLoop () {
    while (asteroids.length < MAX_ASTEROIDS) {
        asteroids.push(MovingObject.createRandom())
    }

    Canvas.clear()
    asteroids.forEach(asteroid => {
        asteroid.move()
        Canvas.drawCircle(asteroid)
    })

    ship.move()
    Canvas.drawCircle(ship)

    requestAnimationFrame(runLoop)
})

const left = new Vec2({ x: -1, y: 0 })
key('a', () => {
    ship.position.add(left)
})

window.Vec2 = Vec2
window.Canvas = Canvas
