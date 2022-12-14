import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

const rocks: number[][][] = []
let Rmax = -Infinity
let Cmin = Infinity
let Cmax = -Infinity
for (let line of lines) {
    const rocksPath = line.split('->').map(v => v.trim().split(',').map(Number))
    rocks.push(rocksPath)
    Rmax = Math.max(Rmax, ...rocksPath.map(v => v[1]))
    Cmax = Math.max(Cmax, ...rocksPath.map(v => v[0]))
    Cmin = Math.min(Cmin, ...rocksPath.map(v => v[0]))
}
Cmax -= Cmin
Cmax += 3*Rmax

const grid: string[][] = []
for (let r = 0; r <= Rmax+2; r++) {
    const row: string[] = []
    for (let c = 0; c <= Cmax; c++) {
        if (r === Rmax+2) {
            row.push('#')
        } else {
            row.push('.')
        }
    }
    grid.push(row)
}

function printGrid() {
    console.log(grid.map(r => r.join('')).join('\n'))
}

function setOnGrid(x: number, y: number, val: string) {
    grid[y][x-Cmin+Rmax] = val
}

for (const lineOfRocks of rocks) {
    let start = lineOfRocks.shift()!
    for (const [x, y] of lineOfRocks) {
        if (start[0] === x) {
            let from = Math.min(y, start[1])
            const to = Math.max(y, start[1])
            while (from <= to) {
                setOnGrid(x, from, '#')
                from++
            }
        } else if (start[1] === y) {
            let from = Math.min(x, start[0])
            const to = Math.max(x, start[0])
            while (from <= to) {
                setOnGrid(from, y, '#')
                from++
            }
        }
        start = [x,y]
    }
}

const start = [0, 500-Cmin+Rmax]

grid[start[0]][start[1]] = '+'

const R = grid.length
const C = grid[0].length

function step(x: number, y: number): number[] {
    let madeStep = false
    if (x >= R-1) return [-1, -1]
    if (grid[x+1][y] === '.') {
        madeStep = true
        x+=1
    }
    if (madeStep) return step(x, y)
    if (y <= 0) return [-1, -1]
    if (grid[x+1][y-1] === '.') {
        madeStep = true
        y-=1
        x+=1
    }
    if (madeStep) return step(x, y)
    if (y >= C) return [-1, -1]
    if (grid[x+1][y+1] === '.') {
        madeStep = true
        y+=1
        x+=1
    }
    if (madeStep) return step(x, y)
    return [x, y]
}
 
function sandDrop(start: number[]) {
    const sandPos: number[][] = []
    while (true) {
        // printGrid()
        let [x, y] = start
        const [stopX, stopY] = step(x, y)
        if (stopX === -1 && stopY === -1) break
        if (grid[stopX][stopY] === 'o') break
        grid[stopX][stopY] = 'o'
        sandPos.push([stopX, stopY])
    }
    // console.log(sandPos.length)
}

sandDrop(start)
printGrid()