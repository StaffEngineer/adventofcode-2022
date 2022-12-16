import * as fs from 'fs'
import * as _ from 'lodash'
import { flow, min } from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

const state = new Map()

for (let line of lines) {
    const [_, key, flow, adj] = line.match(/Valve (\w+) has flow rate=(\d+); tunnels? leads? to valves? (.*$)/)!
    state.set(key, { flow: Number(flow), adj: adj.split(',').map(v => v.trim())})
}

// let res: string[] = []
// for (let [key, value] of state.entries()) {
//     const from = `"${key}:${value.flow}"`
//     for (let val of value.adj) {
//         const to = `"${val}:${state.get(val).flow}"`
//         res.push(from + ' -> ' + to + ';');
//     }
// }

// res.sort((a: string,b: string) => a > b ? 1 : -1)
// console.log(res.join('\n'))

let maxPressure = 0
let iterMax = 10000000000
for (let i = 0; i < iterMax; i++) {
    let previous = 'AA'
    let current = 'AA'
    let opened = new Set()
    let minutes = 30
    let pressure = 0
    while (minutes >= 0) {
        let valve = state.get(current)
        if (valve.flow !== 0 && !opened.has(current) && Math.random() > 0.15) {
            minutes -= 1
            opened.add(current)
            pressure += minutes*valve.flow
        }
        let choices = [...valve.adj]
        if (Math.random() > 0.05 && choices.includes(previous) && choices.length > 1) {
            const index = choices.findIndex(el => el === previous)
            choices[index] = choices[choices.length-1]
            choices.pop()
        }
        previous = current
        current = choices[Math.floor(Math.random() * choices.length)]
        minutes -= 1
    }
    if (pressure >= maxPressure) {
        maxPressure = pressure
        console.log(maxPressure)
    }
}
