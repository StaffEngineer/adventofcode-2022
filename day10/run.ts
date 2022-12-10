import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const commands = input.split('\n')
const N = commands.length
let i = 0
let cycle = 1
const store = new Map().set(1, 1)
while (i < N-1) {
    const command = commands[i]
    if (command === 'noop') {
        store.set(cycle+1, store.get(cycle))
        cycle++
    } else {
        const k = parseInt(command.split(' ')[1])
        store.set(cycle, store.get(cycle))
        store.set(cycle+1, store.get(cycle))
        store.set(cycle+2, store.get(cycle)+k)
        cycle+=2
    }
    i++
}
let sum = 0
for (let cycle of [20, 60, 100, 140, 180, 220]) {
    sum += store.get(cycle) * cycle
}
if (sum !== 14760) throw new Error('First part is wrong')
const pixels: string[] = ['\n']
const rowLength = 40
for (const [cycle, pos] of store.entries()) {
    let curChar
    const cyclePosition = cycle - 1 - (Math.floor(cycle/rowLength)*rowLength)
    if (cyclePosition === pos-1 || cyclePosition === pos || cyclePosition === pos + 1) {
        curChar = '#'
    } else {
        curChar = '.'
    }
    pixels.push(curChar)
    if (cycle % 40 === 0) pixels.push('\n')
}
console.log(pixels.join(''))