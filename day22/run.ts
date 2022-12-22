import { dir } from 'console'
import * as fs from 'fs'

let input = fs.readFileSync('./input.txt', 'utf-8').split('\n\n')
let boardInput = input[0].split('\n').map(r => r.split(''))
let maxC = -1
for (let r = 0; r < boardInput.length; r++) maxC = Math.max(maxC, boardInput[r].length)
const board = Array(boardInput.length).fill(42).map((_: number) => Array(maxC).fill(' '))
for (let r = 0; r < boardInput.length; r++) {
    for (let c = 0; c < boardInput[r].length; c++) board[r][c] = boardInput[r][c]
}

const R = board.length
const C = board[0].length
let moves: Array<[string, number]> = ('R' + input[1]).match(/\w{1}\d+/g)!.map(v => [v.substring(0,1), Number(v.substring(1))])

let c = 0
while (true) {
    if (board[0][c] === '.') break
    c++ 
}
let CUR: [number, number] = [0, c]
let DIR = 'U'
const boardCopy = JSON.parse(JSON.stringify(board))

const directions = new Map()
                     .set('R', [0,1])
                     .set('L', [0,-1])
                     .set('U', [-1,0])
                     .set('D', [1,0])

const values = new Map()
                     .set('R', 0)
                     .set('L', 2)
                     .set('U', 3)
                     .set('D', 1)

function getNextDotOrCur(x: number, y: number): [number, number] | undefined {
    if (board?.[x]?.[y] === ' ') {
        switch (DIR) {
            case 'R': {
                y = 0
                while (board[x][y] !== '.' && board[x][y] !== '#') {
                    y++
                }
                break
            }
            case 'L': {
                y = C-1
                while (board[x][y] !== '.' && board[x][y] !== '#') {
                    y--
                }
                break
            }
            case 'D': {
                x = 0
                while (board[x][y] !== '.' && board[x][y] !== '#') {
                    x++
                }
                break
            }
            case 'U': {
                x = R-1
                while (board[x][y] !== '.' && board[x][y] !== '#') {
                    x--
                }
                break
            }
        }
    } else {
        if (x >= R) {
            x = 0
            while (board[x][y] !== '.' && board[x][y] !== '#') {
                x++
            }
        }
        if (y >= C) {
            y = 0
            while (board[x][y] !== '.' && board[x][y] !== '#') {
                y++
            }
        }
        if (x < 0) {
            x = R-1
            while (board[x][y] !== '.'&& board[x][y] !== '#') {
                x--
            }
        }
        if (y < 0) {
            y = C-1
            while (board[x][y] !== '.' && board[x][y] !== '#') {
                y--
            }
        }
    }
    if (board[x][y] === '#') return undefined
    if (board[x][y] === '.') return [x, y]
}

function step(): [number, number] {
    const [i,j] = directions.get(DIR)
    const [x,y] = [CUR[0]+i, CUR[1]+j]
    
    if (board?.[x]?.[y] === '.') return [x,y] 
    if (board?.[x]?.[y] === '#') return CUR
    if (board?.[x]?.[y] === ' ') return getNextDotOrCur(x, y) ?? CUR
    if (board?.[x]?.[y] === undefined) return getNextDotOrCur(x, y) ?? CUR
    throw new Error('unexpected case')
}

function getDirection(direction: string): string {
    if (direction === 'R') {
        if (DIR === 'U') return 'R'
        if (DIR === 'R') return 'D'
        if (DIR === 'D') return 'L'
        if (DIR === 'L') return 'U'
    }
    if (direction === 'L') {
        if (DIR === 'U') return 'L'
        if (DIR === 'R') return 'U'
        if (DIR === 'D') return 'R'
        if (DIR === 'L') return 'D'        
    }
    throw new Error('unexpected case')
}

while (moves.length > 0) {
    const [direction, steps] = moves.shift()!
    DIR = getDirection(direction)
    let i = 0
    while (i < steps) {
        printGridCopy(false)
        CUR = step()
        i++
    }
}

// printGridCopy(true)

function printGridCopy(print: boolean = false) {
    const v = new Map()
    .set('R', '>')
    .set('L', '<')
    .set('U', '^')
    .set('D', 'v')
    boardCopy[CUR[0]][CUR[1]] = v.get(DIR)
    if (print) {
        console.log('----------------')
        console.log(boardCopy.map((r: string[]) => r.join('')).join('\n'))
        console.log('----------------')
    }
}

function calc() {
    return 1000*(CUR[0]+1)+4*(CUR[1]+1)+values.get(DIR)
}

console.log(calc())