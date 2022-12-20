import * as fs from 'fs'
import * as _ from 'lodash'

let input = fs.readFileSync('./input.txt', 'utf-8')

const items = input.split('\n').map(Number)

type Node = {
    val: number
    next: Node
    originNext: Node
    prev: Node
}

const decryptedKey = 811589153

let node = { val: decryptedKey * items[0], next: null as any as Node, prev: null as any as Node, originNext: null as any as Node }
node.next = node
node.originNext = node
node.prev = node

let i = 1
const root = node
while (i < items.length) {
    const newNode = { val: decryptedKey * items[i], next: null as any as Node, prev: null as any as Node, originNext: null as any as Node }
    newNode.prev = node
    node.next = newNode
    node.originNext = newNode
    node = node.next
    i++
}
node.next = root
node.originNext = root
root.prev = node

function connect(a: Node, b: Node) {
    a.next = b
    b.prev = a
}

i = 0
let cur = root
while (i < items.length * 10) {
    let val = cur.val % (items.length - 1)
    if (val > 0) {
        let tmp = cur
        let k = 0
        while (k < val) {
            tmp = tmp.next
            k++
        }
        connect(cur.prev, cur.next)
        connect(cur, tmp.next)
        connect(tmp, cur)
    } else if (val < 0) {
        let tmp = cur
        let k = val
        while (k < 0) {
            tmp = tmp.prev
            k++
        }
        connect(cur.prev, cur.next)
        connect(tmp.prev, cur)
        connect(cur, tmp)
    }
    cur = cur.originNext
    i++
}

// printHead()

cur = root
while (true) {
    cur = cur.next
    if (cur.val === 0) break
}

i = 0
let sum = 0
while (true) {
    if (i === 1000) {
        console.log('1000:', cur.val)
        sum += cur.val
    }
    if (i === 2000) {
        console.log('2000:', cur.val)
        sum += cur.val
    }
    if (i === 3000) {
        console.log('3000:', cur.val)
        sum += cur.val
        break
    }
    i++
    cur = cur.next
}

console.log(sum)

function printHead() {
    let i = 0
    let node = root
    const res: number[] = []
    while (i < items.length) {
        res.push(node.val)
        node = node.next
        i++
    }
    console.log(res.join(','))
}