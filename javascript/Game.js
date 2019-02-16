import Canvas from '/javascript/Canvas.js'
import flatten from '/node_modules/lodash-es/flatten.js'
import identity from '/node_modules/lodash-es/identity.js'
import key from '/javascript/Keymaster.js'
import Asteroid from '/javascript/Asteroid.js'
import Ship from '/javascript/Ship.js'
import Vec2 from '/javascript/Vec2.js'

const canvasBB = Canvas.getBoundingBox()
const MIN_ASTEROIDS = 5;

export default class Game {
    asteroids = []
    bullets = []
    ship = new Ship({
        position: new Vec2({
            x: canvasBB.width / 2,
            y: canvasBB.height / 2
        })
    })

    addAsteroids() {
        while (this.asteroids.length < MIN_ASTEROIDS) {
            this.asteroids.push(Asteroid.createRandom())
        }
    }

    bindHandlers() {
        key('space', () => {
            this.bullets.push(this.ship.shoot())
        })
    }

    checkCollisions() {
        if (this.asteroids.some(asteroid => asteroid.isCollidedWith(this.ship))) {
            this.stop()
        }

        this.bullets.forEach(bullet => {
            this.asteroids.forEach(asteroid => {
                if (!bullet.isCollidedWith(asteroid)) { return }

                bullet.hit = true
                asteroid.hit = true
            })
        })
    }

    destroyHit() {
        const asteroids = this.asteroids.filter(asteroid => !asteroid.hit)
        const destroyedAsteroids = this.asteroids.filter(asteroid => asteroid.hit)

        this.asteroids = flatten(asteroids.concat(destroyedAsteroids.map(asteroid => asteroid.destroy()))).filter(identity)

        this.bullets = this.bullets.filter(bullet => !bullet.hit)
    }

    removeOutOfBounds() {
        this.asteroids = this.asteroids.filter(asteroid => {
            return canvasBB.intersects(asteroid.boundingBox)
        })
    }

    move() {
        this.asteroids.forEach(asteroid => asteroid.move())
        this.bullets.forEach(bullets => bullets.move())
        this.ship.move()
    }

    draw() {
        Canvas.clear()
        this.asteroids.forEach(asteroid => asteroid.draw())
        this.bullets.forEach(bullet => bullet.draw())
        this.ship.draw()
    }

    start() {
        var self = this
        this.running = true
        this.bindHandlers()
        requestAnimationFrame(function runLoop() {
            self.tick()

            if (self.running) {
                requestAnimationFrame(runLoop)
            }
        })
    }

    stop() {
        this.running = false
    }

    tick() {
        this.addAsteroids()
        this.move()
        this.removeOutOfBounds()
        this.checkCollisions()
        this.destroyHit()
        this.draw()
    }
}
