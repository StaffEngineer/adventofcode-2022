import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
const [cratesInput, movesInput] = input.split('\n\n')

const crates = parseCrates(cratesInput)

function parseCrates(cratesInput: string) {
    const crates = new Map()
    const lines = cratesInput.split('\n').reverse()
    for (const line of lines) {
        for (const [idx, el] of Object.entries(line.split(' '))) {
            const i = parseInt(idx) + 1
            if (el === '[0]') continue
            crates.set(i, [...(crates.get(i)?.values() ?? []), el])
        }
    }
    return crates
}

function parseMoves(movesInput: string) {
    const moves: number[][] = []
    for (const line of movesInput.split('\n')) {
        const words = line.split(' ')
        moves.push([words[1], words[3], words[5]].map(Number))
    }
    return moves
}

const moves = parseMoves(movesInput)

for (const [amount, from, to] of moves) {
    const fromCrate = crates.get(from)
    const toCrate = crates.get(to)
    let i = 0
    const tempCrate: string[] = []
    while (i < amount) {
        tempCrate.push(fromCrate.pop())
        i++
    }
    i = 0
    while (i < amount) {
        toCrate.push(tempCrate.pop())
        i++
    }
}

let i = 1
const answer: string[] = []
while (i < 10) {
    const crate = crates.get(i)
    answer.push(crate.pop()[1])
    i++
}

console.log(answer.join(''))