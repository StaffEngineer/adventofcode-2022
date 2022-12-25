import * as fs from 'fs'
import * as _ from 'lodash'

const initialGrid = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(r => r.split(''))

let blizzards: [number, number, string][] = []
for (let r = 0; r < initialGrid.length; r++) {
    for (let c = 0; c < initialGrid[r].length; c++) {
        if (initialGrid[r][c] !== '#' && initialGrid[r][c] !== '.') {
            blizzards.push([r,c,initialGrid[r][c]])
        }
    }
}
initialGrid[initialGrid.length-1][initialGrid[0].length-2] = 'Q'
 
function getNewGrid(grid: string[][], blizzards: [number, number, string][]) {
    const R = grid.length
    const C = grid[0].length
    const newGrid: string[][] = JSON.parse(JSON.stringify(grid))
    const newBlizzards: [number,number,string][] = []
    blizzards.forEach(([x,y,]) => { newGrid[x][y] = '.' })
    for (const [x,y,c] of blizzards) {
        let shift = [0,0]
        if (c === '>') shift = [0,1]
        if (c === '<') shift = [0,-1]
        if (c === '^') shift = [-1,0]
        if (c === 'v') shift = [1,0]
        let newX = x + shift[0]
        let newY = y + shift[1]
        if (newGrid[newX][newY] === '#') {
            if (c === '>') newY = 1
            if (c === '<') newY = C-2
            if (c === '^') newX = R-2
            if (c === 'v') newX = 1
        }
        newBlizzards.push([newX, newY, c])
    }
    newBlizzards.forEach(([x,y,c]) => { 
        if (newGrid[x][y] !== '.') {
            newGrid[x][y] = 'x'
        } else {
            newGrid[x][y] = c
        }
    })
    return [newGrid, newBlizzards]
}

function printGrid(grid: string[][]) {
    console.log(grid.map(r => r.join('')).join('\n'))
}

function getPossibleMoves(grid: string[][], x: number, y: number): number[][] {
    const possibleMoves: number[][] = []
    if (grid[x][y] === '.') possibleMoves.push([x, y])
    const neighbours = [[0,1],[1,0],[-1,0],[0,-1]]
    for (let [a,b] of neighbours) {
        const k = a + x
        const m = b + y
        if (grid?.[k]?.[m] === '.' || grid?.[k]?.[m] === 'Q') possibleMoves.push([k,m])
    }
    return possibleMoves
}

const visited = new Set()

const state = new Map().set(0, [initialGrid, blizzards])

function bfs(start: [number,number,number,number[][]]): [number, number[][]] {
    const queue = [start]
    while (queue.length > 0) {
        const [x,y,l,path] = queue.shift()!
        const [grid,] = state.get(l)
        if (grid[x][y] === 'Q') { return [l, path] }
        if (visited.has([x,y,l].toString())) continue
        visited.add([x,y,l].toString())
        let newG = grid
        if (state.has(l+1)) {
            newG = state.get(l+1)[0]
        } else {
            const [grid, blizzards] = state.get(l)!
            let [newGrid, newB] = getNewGrid(grid, blizzards)
            state.set(l+1, [newGrid,newB])
            newG = newGrid
        }
        getPossibleMoves(newG, x,y).forEach(([k,m]) => queue.push([k,m,l+1,[...path, [k,m]]]))
    }
    return [Infinity, []]
}

const [minutes, moves] = (bfs([0,1,0,[]]))

moves.forEach(([x,y]) => initialGrid[x][y] = 'K')
// printGrid(initialGrid)
console.log('time:', minutes)

// TODO: p5.js visualize
// for (const [key,val] of state.entries()) {
//     console.log(`minute ${key}`)
//     printGrid(val[0])
// }
