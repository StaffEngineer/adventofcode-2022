import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8').split('\n')

let res = 0
for (let i = 0; i < input.length; i++) {
    const num = input[i]
    res += fromSnafu(num)
}

console.log(toSnafu(res))

function toSnafu(num: number) {
    const digits: number[] = []
    while (num > 0) {
        num += 2
        digits.unshift(num % 5)
        num = Math.floor(num / 5)
    }
    return digits.map(digit => '=-012'.charAt(digit)).join('')
}

function fromSnafu(snafu: string) {
    const snafuMap = new Map().set('2', 2)
                              .set('1', 1)
                              .set('0', 0)
                              .set('-', -1)
                              .set('=', -2)

    let place = 1
    const mult = 5
    let res = 0

    const snafuDigs = snafu.split('')
    while (snafuDigs.length > 0) {
        const snafuDig = snafuDigs.pop()
        res += place * snafuMap.get(snafuDig)
        place *= mult
    }
    return res
}



