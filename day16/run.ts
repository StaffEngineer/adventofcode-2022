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
    let previous = ['AA','AA']
    let current = ['AA','AA']
    let opened = new Set()
    let minutes = 26
    let pressure = 0
    while (minutes >= 0) {
        for (let move = 0; move < 2; move++) {
            let valve = state.get(current[move])
            if (valve.flow !== 0 && !opened.has(current[move]) && Math.random() > 0.15) {
                opened.add(current[move])
                pressure += (Math.max(0, minutes-1))*valve.flow
            } else {
                let choices = [...valve.adj]
                let idx = choices.findIndex(el => el === previous[move])
                if (Math.random() > 0.05 && idx !== -1 && choices.length > 1) {
                    choices[idx] = choices[choices.length-1]
                    choices.pop()
                }
                idx = choices.findIndex(el => el === current[0])
                if (move === 1 && Math.random() > 0.20 && idx !== -1 && choices.length > 1) {
                    choices[idx] = choices[choices.length-1]
                    choices.pop()
                }
                previous[move] = current[move]
                current[move] = choices[Math.floor(Math.random() * choices.length)]
            }
        }
        minutes -= 1
    }
    if (pressure >= maxPressure) {
        maxPressure = pressure
        console.log(maxPressure)
    }
}
