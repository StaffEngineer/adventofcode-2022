import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

let n = 0
for (const line of lines) {
    const [pair1, pair2] = line.split(',')
    const [l1, r1] = pair1.split('-').map(el => parseInt(el))
    const [l2, r2] = pair2.split('-').map(el => parseInt(el))
    const minL = Math.min(l1, l2)
    const maxR = Math.max(r1, r2)
    if ((minL === l1 && maxR === r1) ||
        (minL === l2 && maxR === r2)) {
             n++
    }
}
console.log(n)

let k = 0
for (const line of lines) {
    const [pair1, pair2] = line.split(',')
    const [l1, r1] = pair1.split('-').map(el => parseInt(el))
    const [l2, r2] = pair2.split('-').map(el => parseInt(el))
    const intervals: Array<[number, number]> = []
    if (l1 < l2) {
        intervals.push([l1, r1])
        intervals.push([l2, r2])
    } else {
        intervals.push([l2, r2])
        intervals.push([l1, r1])
    }
    if (intervals[1][0] <= intervals[0][1]) k++
}
console.log(k)
