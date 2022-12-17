import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./test_input.txt', 'utf-8')

const grid = Array(7).fill(0).map(_ => Array(7).fill('.'))

function* jetPattern() {
    let index = 0
    const N = input.length

    while (true) {
        if (index === N) index = 0
        yield input[index++]
    }
}

function* figures() {
    let index = 0
    const first = [[0,0],[0,1],[0,2],[0,3]]
    const second = [[0,1],[-1,0],[-1,1],[-1,2],[-2,1]]
    const third = [[0,0],[0,1],[0,2],[-1,2],[-2,2]]
    const fourth = [[0,0],[-1,0],[-2,0],[-3,0]]
    const fifth = [[0,0],[0,1],[-1,1],[-1,0]]
    const figures = [first, second, third, fourth,fifth]
    const N = figures.length

    while (true) {
        if (index === N) index = 0
        yield figures[index++]
    }
}

const patternGen = jetPattern()
const figuresGen = figures()
const start = [3,2]

function putFigure(figure: number[][]) {
    let newFigure = [...figure]
    newFigure = getGridPosition(newFigure)
    let first = true
    while (canMove(newFigure)) {
        const jet = patternGen.next().value as string
        newFigure = moveDown(newFigure, jet, first)
        first = false
    }
    adjustGrid(newFigure)
}

function getGridPosition(newFigure: number[][]): number[][] {
    const parts: number[][] = []
    for (let [x,y] of newFigure) {
        parts.push([x+start[0], y+start[1]])
    }
    return parts
}

function canMove(figure: number[][]): boolean {
    for (let [x,y] of figure) {
        if (x+1 >= grid.length) return false
        if (grid[x+1][y] === '#') return false
    }
    return true
}

function moveJet(figure: number[][], jet: string): number[][] {
    const shift = jet === '<' ? -1 : 1
    const shiftedParts: number[][] = []
    for (const [x,y] of figure) {
        const shiftedY = y + shift
        if (shiftedY < 0 || shiftedY === grid[0].length) return figure
        if (grid[x][shiftedY] === '#') return figure
        shiftedParts.push([x, y+shift])
    }
    return shiftedParts
}

function moveDown(figure: number[][], jet: string, first: boolean): number[][] {
    if (first) {
        figure = moveJet(figure, jet)
        jet = patternGen.next().value as string
    }
    const parts: number[][] = []
    for (const [x, y] of figure) {
        parts.push([x+1, y])
    }
    return moveJet(parts, jet)
}

function adjustGrid(figure: number[][]): void {
    let minX = Infinity
    for (const [x,y] of figure) {
        minX = Math.min(minX, x)
        grid[x][y] = '#'
    }
    const N = 7 - minX
    for (let i = 0; i < N; i++) {
        grid.unshift(Array(7).fill('.'))
    }
}

let n = 0
const N = 1000000000000
while (n < N) {
    const figure = figuresGen.next().value as number[][]
    putFigure(figure)
    // console.log('-------')
    // printGrid()
    n++
}

console.log(grid.length - 7)

function printGrid() {
    console.log(grid.map(r => r.join('')).join('\n'))
}