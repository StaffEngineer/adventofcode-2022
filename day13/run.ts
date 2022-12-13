import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const pairs = input.split('\n\n')

let rightOrderIdx: number[] = []
const parsed: any[] = []
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const [pair1Input, pair2Input] = pair.split('\n')
    const pair1 = JSON.parse(pair1Input)
    const pair2 = JSON.parse(pair2Input)
    parsed.push(pair1, pair2)

    if (compare(pair1, pair2) < 0) rightOrderIdx.push(i+1)
}

parsed.push(JSON.parse('[[2]]'))
parsed.push(JSON.parse('[[6]]'))

console.log(rightOrderIdx.reduce((a, b) => a + b, 0))

function compare(pair1: any[] | number, pair2: any[] | number): number {
    if (!Array.isArray(pair1) && !Array.isArray(pair2)) {
        if (pair1 < pair2) return -1
        if (pair1 > pair2) return 1
        return 0
    } else if (Array.isArray(pair1) && Array.isArray(pair2)) {
        let i = 0
        while (i < pair1.length && i < pair2.length) {
            const l = pair1[i]
            const r = pair2[i]
            const c = compare(l, r)
            if (c === -1) return -1
            if (c === 1) return 1
            i++
        }
        if (i === pair1.length && i < pair2.length){
            return -1
        } else if (i === pair2.length && i < pair1.length) {
            return 1
        }
        return 0
    } else if (Array.isArray(pair1) && !Array.isArray(pair2)) {
        return compare(pair1, [pair2])
    } else if (!Array.isArray(pair1) && Array.isArray(pair2)) {
        return compare([pair1], pair2)
    }
    return 0
}

const sorted = parsed.sort(compare)

let idx= 1

for (let i = 0; i < sorted.length; i++) {
    const packet = sorted[i]
    if (JSON.stringify(packet) === '[[2]]' || JSON.stringify(packet) === '[[6]]') {
        idx *= (i+1)
    }
}

console.log(idx)