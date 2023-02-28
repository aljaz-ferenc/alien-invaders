import { levelOne, levelTwo, levelThree, levelFour } from "./levels.js"

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const alienGreen = document.querySelector('.alien-green')
const alienBlue = document.querySelector('.alien-blue')
const alienRed = document.querySelector('.alien-red')
const bulletImg = document.querySelector('.bullet')
const upgradeImg = document.querySelector('.upgrade')
const displayLevel = document.querySelector('.display-level')
const winModal = document.querySelector('.win')
const loseModal = document.querySelector('.lose')
const completeModal = document.querySelector('.complete')
const winModalBtn = document.querySelector('.win button')
const loseModalBtn = document.querySelector('.lose button')
const completeModalBtn = document.querySelector('.complete button')
const characters = document.querySelector('.characters')
const charactersContainer = document.querySelector('.choose-character')


let shipImg
characters.addEventListener('click', (e) => {
    shipImg = e.target.closest('.character').querySelector('img')
    charactersContainer.style.display = 'none'
    init()
}
)

canvas.width = 1000
canvas.height = 500


class Shooter {
    constructor(x, y, width, height, speed) {
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.speed = speed
    }
    draw() {
        ctx.beginPath()
        ctx.drawImage(shipImg, this.x, this.y - this.height, this.width, this.height)
        ctx.stroke()
        ctx.closePath()
    }
    update() {
        this.draw()
        if (this.x - this.width > 0) {
            pressedLeft ? this.x -= this.speed : null
        }
        if (this.x + this.width < canvas.width) {
            pressedRight ? this.x += this.speed : null
        }

        //collision detection shooter-alien or aliens touch bottom
        aliens.forEach(alien => {
            if (alien.lives >= 0 & alien.y + alien.height > this.y - this.height & alien.x + alien.width > this.x & alien.x < this.x + this.width) {
                gameStatus = 'over'
            }
            if ((alien.lives >= 0 & alien.y + alien.height > canvas.height)) {
                gameStatus = 'over'
            }
        })
    }
}

class Bullet {
    constructor(x, y, width, height, speed, id) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.id = id
    }
    draw() {
        ctx.drawImage(bulletImg, this.x, this.y, this.width, this.height)

    }
    update() {
        this.y -= this.speed
        this.draw()


        //collision detection bullet-alien
        aliens.forEach(alien => {
            if (this.y < alien.y + alien.height & this.y + this.height > alien.y & this.x + this.width > alien.x & this.x < alien.x + alien.width) {
                this.width = null
                this.height = null
                removeBullet(this.id)

                //kill
                if (alien.lives === 0) {
                    alien.width = null
                    alien.height = null
                    kills++

                    if (kills === aliens.length) {
                        gameStatus = 'win'
                    }
                    if (kills === aliens.length & level === 4) {
                        gameStatus = 'completed'
                    }

                    //drop upgrade
                    if (alien.upgrade) {
                        if (upgrade === 2) return
                        createUpgrade(this.x, this.y)
                    }
                }
                alien.lives -= 1
            }



        })
    }
}

class Alien {
    constructor(x, y, width, height, id, rowNum, dx, color) {
        this.x = x
        this.y = y + 20 + height * rowNum * 2
        this.width = width
        this.height = height
        this.id = id
        this.rowNum = rowNum
        this.dx = dx
        this.color = color
        this.lives = color
    }
    draw() {
        ctx.beginPath()
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
    update() {
        this.x += this.dx
        this.alienColor()
        this.draw()
    }
    alienColor() {
        switch (this.lives) {
            case 0:
                this.image = alienGreen
                break
            case 1:
                this.image = alienBlue
                break
            case 2:
                this.image = alienRed
                break
        }
    }
}

class Upgrade {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.width = 25
        this.height = 35
        this.dy = 1
    }
    draw() {
        ctx.drawImage(upgradeImg, this.x, this.y, this.width, this.height)
    }
    update() {
        this.y += this.dy

        //collision with shooter
        if (!this.width) return
        if (this.y < shooter.y + shooter.height & this.y + this.height > shooter.y - shooter.height & this.x + this.width > shooter.x & this.x < shooter.x + shooter.width & this.width) {
            upgrade < 3 ? upgrade++ : null
            this.width = null
            this.height = null
        }
        this.draw()
    }

}

let shooter
let aliens = []
let aliensInARow
let level = 1
let gameStatus = 'playing'
let kills = 0
let upgradeDrops = []
let bullets = []
let upgrade = 0
let moved = 0
let aliensWidth

function createAliens() {
    let rows

    switch (level) {
        case 1:
            rows = levelOne()
            break
        case 2:
            rows = levelTwo()
            break
        case 3:
            rows = levelThree()
            break
        case 4:
            rows = levelFour()
            break
    }

    rows.forEach((row, i) => {
        const x = 10
        const y = 10
        const width = 36
        const height = 20
        const gap = 10
        const dx = 1

        row.forEach((alien, j) => {
            alien === 0 && aliens.push(new Alien((j * width) + gap, y, width - gap, height, Math.random(), i, dx, 0))
            alien === 1 && aliens.push(new Alien((j * width) + gap, y, width - gap, height, Math.random(), i, dx, 1))
            alien === 2 && aliens.push(new Alien((j * width) + gap, y, width - gap, height, Math.random(), i, dx, 2))
        })
    })

    aliensInARow = rows[0].length

    let upgradeCount = 0

    while (upgradeCount < 2) {
        const randomNum = Math.floor(Math.random() * aliens.length)
        if (aliens[randomNum].upgrade || !aliens[randomNum].width) continue

        aliens[randomNum].upgrade = true
        upgradeCount++
    }

}
createAliens()

let pressedRight = false
let pressedLeft = false

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            pressedRight = true
            pressedLeft = false
            break
        case 'ArrowLeft':
            pressedLeft = true
            pressedRight = false
            break
    }
})

//shooting
window.addEventListener('keyup', (e) => {
    const height = 10
    const width = 5
    const y = shooter.y
    const x = shooter.x + shooter.width / 2 - width / 2
    const speed = 10
    if (e.key === ' ' & upgrade === 0) {
        const bullet = new Bullet(x, y - shooter.height, width, height, speed, Math.random())
        bullets.push(bullet)
    } else if (e.key === ' ' & upgrade === 1) {
        const bullet1 = new Bullet(x - shooter.width / 2 + width / 2, y, width, height, speed, Math.random())
        const bullet2 = new Bullet(x + shooter.width / 2 - width / 2, y, width, height, speed, Math.random())
        bullets.push(bullet1, bullet2)
    } else if (e.key === ' ' & upgrade === 2) {
        const bullet = new Bullet(x, y - shooter.height / 2, width, height, speed, Math.random())
        const bullet1 = new Bullet(x - shooter.width / 2 + width / 2, y, width, height, speed, Math.random())
        const bullet2 = new Bullet(x + shooter.width / 2 - width / 2, y, width, height, speed, Math.random())
        bullets.push(bullet, bullet1, bullet2)
    }
})

loseModalBtn.addEventListener('click', () => {
    level = 1
    init()
})

completeModalBtn.addEventListener('click', () => {
    level = 1
    init()
})

winModalBtn.addEventListener('click', () => {
    level++
    init()
})

window.addEventListener('keyup', (e) => {
    e.key === 'ArrowRight' ? pressedRight = false : null
    e.key === 'ArrowLeft' ? pressedLeft = false : null
})

function removeBullet(id) {
    bullets = bullets.filter(bullet => bullet.id !== id)
}

function createUpgrade(x, y) {
    upgradeDrops.push(new Upgrade(x, y))
}

function gameOver() {
    gameStatus = 'over'
    loseModal.style.display = 'flex'
    setTimeout(() => {
        loseModalBtn.focus()
    }, 300);
}

function win() {
    gameStatus = 'win'
    winModal.style.display = 'flex'

    setTimeout(() => {
        winModalBtn.focus()
    }, 300);
}

function gameComplete() {
    gameStatus = 'completed'
    completeModal.style.display = 'flex'
    setTimeout(() => {
        completeModalBtn.focus()
    }, 300);
}


function animate() {
    if (gameStatus === 'over') {
        gameOver()
        return
    }
    if (gameStatus === 'win') {
        win()
        return
    }
    if (gameStatus === 'completed') {
        gameComplete()
        return
    }
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    requestAnimationFrame(animate)
    shooter.update()

    if (upgradeDrops.length > 0) {
        upgradeDrops.forEach(drop => {
            drop.update()
        })
    }

    bullets.length > 0 && bullets.forEach(bullet => bullet.update())
    aliens.forEach(alien => alien.update())

    moved += 1
    if (moved >= canvas.width - aliensWidth) {
        aliens.forEach(alien => {
            alien.dx = -alien.dx
            alien.y += 20
        })
        moved = 0
    }
}

//start game
function init() {
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    upgrade = 0
    kills = 0
    moved = 0
    bullets = []
    upgradeDrops = []
    gameStatus = 'playing'
    aliens = []
    shooter = new Shooter(canvas.width / 2, canvas.height - 20, 50, 40, 5)
    winModal.style.display = 'none'
    loseModal.style.display = 'none'
    completeModal.style.display = 'none'
    displayLevel.textContent = 'Level: ' + level
    setTimeout(() => {
        createAliens()
        aliensWidth = (aliens[0].width * aliensInARow) + aliensInARow * 10 + 10 //10 * gap between aliens + 10 margin
        animate()
    }, 0);
}

