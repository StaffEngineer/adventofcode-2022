import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
const commands = input.split('\n')
const N = commands.length
let i = 0
let cycle = 1
const store = new Map().set(1, 1)
while (i < N) {
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
console.log(sum)