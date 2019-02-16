import Canvas from '/javascript/Canvas.js'
import MovingObject from '/javascript/MovingObject.js'
import Ship from '/javascript/Ship.js'
import Vec2 from '/javascript/Vec2.js'

const canvasBB = Canvas.getBoundingBox()
const MAX_ASTEROIDS = 20;

export default class Game {
    asteroids = []
    ship = new Ship({
        position: new Vec2({
            x: canvasBB.width / 2,
            y: canvasBB.height / 2
        })
    })

    addAsteroids() {
        while (this.asteroids.length < MAX_ASTEROIDS) {
            this.asteroids.push(MovingObject.createRandom())
        }
    }

    removeOutOfBounds() {
        this.asteroids = this.asteroids.filter(asteroid => {
            return canvasBB.intersects(asteroid.boundingBox)
        })
    }

    move() {
        this.asteroids.forEach(asteroid => {
            asteroid.move()
        })

        this.ship.move()
    }

    draw() {
        Canvas.clear()
        this.asteroids.forEach(Canvas.drawCircle)
        Canvas.drawCircle(this.ship)
    }

    tick() {
        this.addAsteroids()
        this.move()
        this.removeOutOfBounds()
        this.draw()
    }
}
