import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')

type Monkey = {
    id: number,
    startingItems: number[],
    inspectingItems: number
    operation: Function,
    divisibleBy: number,
    truthy: number,
    falthy: number
}

const state: Map<number, Monkey> = new Map()

let divProduct = 1

function parse(input: string) {
    function parseMonkey(input: string): Monkey {
        function parseOperation(input: string) {
            const exp = input.split('=')[1].trim()
            const parts = exp.split(' ')
            let val: number = Infinity
            if (parts[0] === 'old' && parts[2] === 'old') {
                if (parts[1] === '+') {
                    return (x: number) => x + x
                } else {
                    return (x: number) => x * x
                }
            } else if (parts[0] === 'old') {
                val = Number(parts[2])
            } else {
                val = Number(parts[0])
            }
            if (parts[1] === '+') {
                return (x: number) => x + val
            } else {
                return (x: number) => x * val
            }
        }
        const lines = input.split('\n')
        const monkeyId = lines[0].match(/\d+/g)!.map(Number)[0]
        const startingItems = lines[1].match(/\d+/g)!.map(Number)
        const operation = parseOperation(lines[2])
        const divisibleBy = lines[3].match(/\d+/g)!.map(Number)[0]
        divProduct *= divisibleBy
        const truthy = lines[4].match(/\d+/g)!.map(Number)[0]
        const falthy = lines[5].match(/\d+/g)!.map(Number)[0]
        return {
            id: monkeyId,
            startingItems,
            operation,
            divisibleBy,
            inspectingItems: 0,
            truthy,
            falthy
        }
    }
    for (const monkeyInput of input.split('\n\n')) {
        const monkey = parseMonkey(monkeyInput)
        state.set(monkey.id, monkey)
    }
}

parse(input)

function round() {
    for (let monkey of [...state.values()]) {
        while (monkey.startingItems.length > 0) {
            let el = monkey.startingItems.shift()!
            el = el % divProduct
            let newValue = monkey.operation(el)
            state.get(monkey.id)!.inspectingItems++
            if (newValue % monkey.divisibleBy === 0) {
                state.get(monkey.truthy)!.startingItems.push(newValue)
            } else {
                state.get(monkey.falthy)!.startingItems.push(newValue)
            }
        }
    }
}

let i = 0
while (i++ < 10000) round()

const [monkey1, monkey2] = [...state.values()].sort((a,b) => b.inspectingItems - a.inspectingItems)
console.log(monkey1.inspectingItems * monkey2.inspectingItems)