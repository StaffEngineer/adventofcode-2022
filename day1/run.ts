import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const source = input.split('\n')
const elfsTotal: number[] = []
let elfTotal = 0
for (const data of source) {
    if (data === '') {
        elfsTotal.push(elfTotal)
        elfTotal = 0
    } else {
        elfTotal += parseInt(data)
    }
}
elfsTotal.sort((a, b) => b-a)
console.log(elfsTotal[0])
console.log(elfsTotal[0] + elfsTotal[1] + elfsTotal[2])
