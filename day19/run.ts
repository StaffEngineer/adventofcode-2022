import * as fs from 'fs'
import * as _ from 'lodash'

let input = fs.readFileSync('./input.txt', 'utf-8')

type Rule = {
    id: number
    ore: number
    clay: number
    obsidian: [number, number]
    geode: [number, number]
}

const rules: Rule[] = []
for (let line of input.split('\n')) {
    const [a,b,c,d,e,f,g] = line.match(/\d+/g)!.map(Number)
    rules.push({ id: a, ore: b, clay: c, obsidian: [d,e], geode: [f, g]})
}

function runOne(rule: Rule, minutes: number) {
    let ore = 0
    let clay = 0
    let obsidian = 0
    let geode = 0
    let oreRobots = 1
    let clayRobots = 0
    let obsidianRobots = 0
    let geodeRobots = 0
    let oreBuilding = false
    let clayBuilding = false
    let obsidianBuilding = false
    let geodeBuilding = false
    for (let i = 0; i < minutes; i++) {
        let rnd = Math.random()
        if (ore >= rule.geode[0] && obsidian >= rule.geode[1]) {
            ore -= rule.geode[0]
            obsidian -= rule.geode[1]
            geodeBuilding = true
        } else if (rnd <= 0.3 && ore >= rule.ore) {
            ore -= rule.ore
            oreBuilding = true
        } else if (rnd <= 0.7 && ore >= rule.obsidian[0] && clay >= rule.obsidian[1]) {
            ore -= rule.obsidian[0]
            clay -= rule.obsidian[1]
            obsidianBuilding = true
        } else if (rnd <= 0.9 && ore >= rule.clay) {
            ore -= rule.clay
            clayBuilding = true
        }

        ore += oreRobots
        clay += clayRobots
        obsidian += obsidianRobots
        geode += geodeRobots

        if (geodeBuilding) {
            geodeBuilding = false
            geodeRobots += 1
        } else if (obsidianBuilding) {
            obsidianBuilding = false
            obsidianRobots += 1
        } else if (clayBuilding) {
            clayBuilding = false
            clayRobots += 1
        } else if (oreBuilding) {
            oreBuilding = false
            oreRobots += 1
        }
    }
    return geode
}

// let results: number[] = []
// for (let r = 0; r < rules.length; r++) {
//     const rule = rules[r]
//     const runs: number[] = []
//     for (let i = 0; i < 500000; i++) {
//         let geodes = runOne(rule, 24)
//         runs.push(geodes)
//     }
//     let maxRun = -Infinity
//     for (let run of runs) {
//         maxRun = Math.max(run, maxRun)
//     }
//     results.push(rule.id * maxRun)
// }

// console.log(results.reduce((a, b) => a + b, 0))

const results: number[] = []
for (let r = 0; r < 3; r++) {
    const rule = rules[r]
    const runs: number[] = []
    for (let i = 0; i < 3000000; i++) {
        const geodes = runOne(rule, 32)
        runs.push(geodes)
    }
    let maxRun = -Infinity
    for (let run of runs) {
        maxRun = Math.max(run, maxRun)
    }
    results.push(maxRun)
}

console.log(results[0] * results[1] * results[2])