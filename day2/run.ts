import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

const totalMap1: Record<string, number>  = {
    'B X': 1,
    'C Y': 2,
    'A Z': 3,
    'A X': 4,
    'B Y': 5,
    'C Z': 6,
    'C X': 7,
    'A Y': 8,
    'B Z': 9,
}

const totalMap2: Record<string, number>  = {
    'B X': 1,
    'C Y': 6,
    'A Z': 8,
    'A X': 3,
    'B Y': 5,
    'C Z': 7,
    'C X': 2,
    'A Y': 4,
    'B Z': 9,
}

let total1 = 0
let total2 = 0
for (const line of lines) {
    total1 += totalMap1[line]
    total2 += totalMap2[line]
}

console.log(total1)
console.log(total2)
