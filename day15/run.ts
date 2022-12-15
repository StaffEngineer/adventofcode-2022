import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')

type Sensor = {
    sensor: number[]
    beacon: number[]
    distance: number
}
let sensors: Sensor[] = []
for (let line of lines) {
    const [ys, xs, yb, xb] = line.match(/-?\d+/g)!.map(Number)
    sensors.push({ sensor: [xs,ys], beacon: [xb,yb], distance: 0 })
}

function setDistance(sensor: Sensor) {
    const [r, c] = sensor.sensor
    const [rb, cb] = sensor.beacon
    sensor.distance = Math.abs(rb-r) + Math.abs(cb-c)
}

sensors.forEach(setDistance)

let state = new Map()

const l = 0
const h = 4000000
const N = 4000000

function merge(intervals: number[][]): number[][] {
    intervals.sort((a,b)=> a[0] - b[0])
    const res: number[][] = []
    for (const interval of intervals) {
        if (res.length > 0 && res[res.length-1][1]+1 >= interval[0]) {
            res[res.length-1][1] = Math.max(interval[1], res[res.length-1][1])
        } else {
            res.push(interval)
        }
    }
    return res
};

function run() {
    for (let { sensor, distance } of sensors) {
        const [r,c] = sensor
        let i = -distance
        let l = 0
        while (i <= 0) {
            state.set(r+i, merge([...(state.get(r+i) ?? []), [c-l, c+l]]))
            l++
            i++
        }
        l-=2
        while (i <= distance) {
            state.set(r+i, merge([...(state.get(r+i) ?? []), [c-l, c+l]]))
            l--
            i++
        }
    }
}

run()

for (let i = l; i <= h; i++) {
    const interval = state.get(i)
    if (interval.length === 2) {
        console.log((interval[0][1]+1)*N+i)
    }
}
