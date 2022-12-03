import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

let sum = 0
for (const line of lines) {
    const n = line.length
    const left = line.substring(0, n/2)
    const right = line.substring(n/2, n+1)
    const char = _.intersection(left.split(''), right.split(''))[0]
    if (char.charCodeAt(0) < 97) {
        sum += char.charCodeAt(0) - 65 + 27
    } else {
        sum += char.charCodeAt(0) - 96
    }
}
console.log(sum)
let sum2 = 0
for (let i = 0; i < lines.length; i += 3) {
    const one = lines[i]
    const two = lines[i+1]
    const three = lines[i+2]
    const char = _.intersection(one.split(''), two.split(''), three.split(''))[0]
    if (char.charCodeAt(0) < 97) {
        sum2+= char.charCodeAt(0) - 65 + 27
    } else {
        sum2 += char.charCodeAt(0) - 96
    }
}
console.log(sum2)