import * as fs from 'fs'
import * as _ from 'lodash'

let input = fs.readFileSync('./input.txt', 'utf-8')

type Node = { id: string, val: number } | { id: string, op: string, first: string, second: string }

const store = new Map()

for (let line of input.split('\n')) {
    const regex = new RegExp(/(\w{4}): ((\w{4}) ([\+\-\*\/]) (\w{4})|(\d+))/)
    const parts = line.match(regex)!
    if (parts[4]) {
        store.set(parts[1], { id: parts[1], first: parts[3], second: parts[5], op: parts[4] } as Node)
    } else {
        store.set(parts[1], { id: parts[1], val: Number(parts[2]) } as Node)
    }
}

function dfs(node: Node): number {
    if ('val' in node) return node.val
    const first = dfs(store.get(node.first))
    const second = dfs(store.get(node.second))
    if (node.op === '+') return first + second
    if (node.op === '*') return first * second
    if (node.op === '/') return first / second
    if (node.op === '-') return first - second
    return Infinity
}
console.log(dfs(store.get('root')))