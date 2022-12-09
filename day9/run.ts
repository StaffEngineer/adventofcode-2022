import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')

const directions = new Map()
    .set('R', [0, 1])
    .set('U', [-1, 0])
    .set('L', [0, -1])
    .set('D', [1, 0])

const visited = new Set()
    .add([0, 0].toString())
let [headX, headY] = [0, 0]
let [tailX, tailY] = [0, 0]

for (const command of input.split('\n')) {
    const [directionInput, stepsInput] = command.split(' ')
    const steps = parseInt(stepsInput)
    const [x, y] = directions.get(directionInput)
    let i = 0
    while (i < steps) {
        i++
        headX += x
        headY += y
        // the same position
        if (headX === tailX && headY === tailY) continue
        // in the same row or column
        if (headX === tailX || headY === tailY) {
            if (Math.abs(headX - tailX) === 1 || Math.abs(headY - tailY) === 1) continue
            const directionX = headX - tailX
            const directionY = headY - tailY
            if (directionX < 0) {
                tailX -= 1
            } else if (directionX > 0) {
                tailX += 1
            }
            if (directionY < 0) {
                tailY -= 1
            } else if (directionY > 0) {
                tailY += 1
            }
        } 
        // diagonal
        if (headX !== tailX && headY !== tailY) {
            // close enough - do nothing
            if (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) === 1) continue
            const directionX = headX - tailX
            const directionY = headY - tailY
            if (directionX < 0) {
                tailX -= 1
            } else {
                tailX += 1
            }
            if (directionY < 0) {
                tailY -= 1
            } else {
                tailY += 1
            }
        }
        visited.add([tailX, tailY].toString())
    }
}

console.log(visited.size)