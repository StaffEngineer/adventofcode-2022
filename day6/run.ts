import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
let l = 0
let r = 14

const store = new Map()
let i = 0
while (i < r) {
    store.set(input[i], 1 + (store.get(input[i]) ?? 0))
    i++
}
while (r < input.length) {
    if (store.size === 14) break
    store.set(input[r], 1 + (store.get(input[r]) ?? 0))
    const left = store.get(input[l])
    if (left === 1) {
        store.delete(input[l])
    } else {
        store.set(input[l], left - 1)
    }
    l++
    r++
}
console.log(r)