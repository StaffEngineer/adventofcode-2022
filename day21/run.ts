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

function dfs(node: Node, isRoot: boolean = false): number {
    if (node.id === 'humn') return HUMAN
    if ('val' in node) return node.val
    const first = dfs(store.get(node.first))
    const second = dfs(store.get(node.second))
    if (isRoot) {
        if (first === second) return 0
        if (first > second) return -1
        if (first < second) return 1
    }
    if (node.op === '+') return first + second
    if (node.op === '*') return first * second
    if (node.op === '/') return first / second
    if (node.op === '-') return first - second
    return Infinity
}

let HUMAN = -1
function binarySearch(l: number, r: number) {
    while (l <= r) {
        const middle = Math.floor((r + l) / 2)
        HUMAN = middle
        const res = dfs(store.get('root'), true)
        if (res === -1) {
            l = middle
        }
        if (res === 1) {
            r = middle - 1
        }
        if (res === 0) {
            return HUMAN
        }
    }
}

console.log(binarySearch(0, Number.MAX_SAFE_INTEGER))