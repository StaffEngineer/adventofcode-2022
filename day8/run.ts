import { count } from 'console'
import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')

const trees: number[][] = []
for (const rowInput of input.split('\n')) {
    const row: number[] = []
    for (const cell of rowInput.split('')) {
        row.push(parseInt(cell))
    }
    trees.push(row)
}

const R = trees.length
const C = trees[0].length

const visible = new Set()
const maxTop = new Array(C).fill(-Infinity)
for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        const cell = trees[r][c]
        if (cell > maxTop[c]) {
            maxTop[c] = cell
            visible.add([r, c].toString())
        }
    }
}
const maxBottom = new Array(C).fill(-Infinity)
for (let r = R-1; r >= 0; r--) {
    for (let c = 0; c < C; c++) {
        const cell = trees[r][c]
        if (cell > maxBottom[c]) {
            maxBottom[c] = cell
            visible.add([r, c].toString())
        }
    }
}
const maxLeft = new Array(R).fill(-Infinity)
for (let c = 0; c < C; c++) {
    for (let r = 0; r < R; r++) {
        const cell = trees[r][c]
        if (cell > maxLeft[r]) {
            maxLeft[r] = cell
            visible.add([r, c].toString())
        }
    }
}
const maxRight = new Array(R).fill(-Infinity)
for (let c = C-1; c >= 0; c--) {
    for (let r = 0; r < R; r++) {
        const cell = trees[r][c]
        if (cell > maxRight[r]) {
            maxRight[r] = cell
            visible.add([r, c].toString())
        }
    }
}
console.log(visible.size)

let maxDistance = -Infinity

for (const cellInput of [...visible.values()]) {
    const [r, c] = (cellInput as string).split(',').map(Number)
    const cell = trees[r][c]
    //  0
    //. 1 .
    //  .
    let k = r - 1
    let upDistance = 0
    while (k >= 0) {
        upDistance++
        if (trees[k][c] >= cell) break
        k--
    }
    //  .
    //. 1 .
    //  0
    k = r + 1
    let downDistance = 0
    while (k < R) {
        downDistance++
        if (trees[k][c] >= cell) break
        k++
    }
    //  .
    //0 1 .
    //  .
    k = c - 1
    let leftDistance = 0
    while (k >=0) {
        leftDistance++
        if (trees[r][k] >= cell) break
        k--
    }
    //  .
    //. 1 0
    //  .
    k = c + 1
    let rightDistance = 0
    while (k < R) {
        rightDistance++
        if (trees[r][k] >= cell) break
        k++
    }
    const distance = rightDistance * leftDistance * upDistance * downDistance
    maxDistance = Math.max(maxDistance, distance)
}

console.log(maxDistance)