import { assert } from 'console'
import * as fs from 'fs'

let input = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const EXTEND = 10

const R = input.length + 2 * EXTEND
const C = input[0].length + 2 * EXTEND

const grid: string[][] = Array(R).fill('.').map((_) => Array(C).fill('.'))

let elfs: Set<number[]> = new Set()

for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
        if (input?.[r-EXTEND]?.[c-EXTEND] === "#") {
            grid[r][c] = '#'
            elfs.add([r,c])
        }
    }
}

function* directionOrder() {
    while (true) {
        yield ['N', 'S', 'W', 'E']
        yield ['S', 'W', 'E', 'N']
        yield ['W', 'E', 'N', 'S']
        yield ['E', 'N', 'S', 'W']
    }
}

const dirValues = new Map()
              .set('N', [-1,0])
              .set('S', [1,0])
              .set('W', [0,-1])
              .set('E', [0,1])
              .set('NE', [-1,1])
              .set('NW', [-1,-1])
              .set('SE', [1,1])
              .set('SW', [1,-1])

const adj = new Map()
             .set('N', ['N', 'NE', 'NW'])
             .set('S', ['S', 'SE', 'SW'])
             .set('W', ['W', 'NW', 'SW'])
             .set('E', ['E', 'NE', 'SE'])

function printGrid() {
    console.log(grid.map(r => r.join('')).join('\n'))
}

// printGrid()

const Rounds = 10
let r = 0

const order = directionOrder()

function getNextPos(dirs: string[], [x,y]: number[]): number[] {
    let noOtherElfs = true
    for (const [a,b] of dirValues.values()) {
        if (grid[x+a][y+b] === '#') {
            noOtherElfs = false
            break
        }
    }
    if (noOtherElfs) return [x,y]
    for (const dir of dirs) {
        let valid = true
        for (let neigbour of adj.get(dir)) {
            const [k, m] = dirValues.get(neigbour)
            if (grid[x+k][y+m] === '#') {
                valid = false
                break
            }
        }
        if (valid) {
            const [k,m] = dirValues.get(dir)
            return [x+k, y+m]
        }
    }
    return [x,y]
}


function getNewElfs(newPos: Map<string, number[][]>): Set<number[]> {
    let newElf: Set<number[]> = new Set()
    for (let [k,v] of newPos.entries()) {
        const kk = k.split(',').map(Number)
        if (v.length === 1) {
            newElf.add(kk)
        } else {
            v.forEach(e => newElf.add(e))
        }
    }

    return newElf
}

function updateGrid(newElfs: Set<number[]>): void {
    elfs.forEach(([x,y]) => { grid[x][y] = '.' })
    newElfs.forEach(([x,y]) => { grid[x][y] = '#' })
}

// printGrid()
while (r < Rounds) {
    const newPos = new Map()
    const dirs = order.next().value!
    for (const [x,y] of elfs) {
        const nextElf = getNextPos(dirs, [x, y])
        newPos.set(nextElf.toString(), [...(newPos.get(nextElf.toString()) ?? []), [x, y]])
    }
    const newElfs = getNewElfs(newPos)
    updateGrid(newElfs)
    elfs = newElfs
    r++
    // console.log(`Round ${r}`)
    // printGrid()
}

function calcEmpty() {
    let minRow = Infinity
    let maxRow = -Infinity
    let minCol = Infinity
    let maxCol = -Infinity

    elfs.forEach(([x,y]) => {
        minRow = Math.min(x, minRow)
        maxRow = Math.max(x, maxRow)
        minCol = Math.min(y, minCol)
        maxCol = Math.max(y, maxCol)
    })

    return (maxRow - minRow + 1) * (maxCol - minCol + 1) - elfs.size
}

console.log(calcEmpty())