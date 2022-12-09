import * as fs from 'fs'
import * as _ from 'lodash'
import { head } from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')

const directions = new Map()
    .set('R', [0, 1])
    .set('U', [-1, 0])
    .set('L', [0, -1])
    .set('D', [1, 0])

const visited = new Set()
    .add([0, 0].toString())
const rope: [number, number][] = []
const N = 10
for (let i = 0; i < N; i++) rope.push([0, 0])

for (const command of input.split('\n')) {
    const [directionInput, stepsInput] = command.split(' ')
    const steps = parseInt(stepsInput)
    const [x, y] = directions.get(directionInput)
    let i = 0
    while (i < steps) {
        rope[N-1][0] += x
        rope[N-1][1] += y
        let j = N - 1
        while (j > 0) {
            const knotHead = rope[j]
            const knotTail = rope[j-1]
            const newTail = getNewPosition(knotHead, knotTail)
            if (newTail[0] === knotTail[0] && newTail[1] === knotTail[1]) break
            rope[j-1][0] = newTail[0]
            rope[j-1][1] = newTail[1]
            if (j === 1) visited.add(newTail.toString())
            j--
        }
        i++
    }
}

console.log(visited.size)

function getNewPosition(head: [number, number], tail: [number, number]): [number, number] {
    let [headX, headY] = head
    let [tailX, tailY] = tail
    if (headX === tailX && headY === tailY) return [tailX, tailY]
    // in the same row or column
    if (headX === tailX || headY === tailY) {
        if (Math.abs(headX - tailX) === 1 || Math.abs(headY - tailY) === 1) return [tailX, tailY]
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
        if (Math.abs(headX - tailX) === 1 && Math.abs(headY - tailY) === 1) return [tailX, tailY]
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
    return [tailX, tailY]
}