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

let y = 2000000
let cells = new Set()
for (let { sensor, distance, beacon } of sensors) {
    const [r,c] = sensor
    if ((r-distance) < y && y < (r+distance)) {
        const diff = y-r
        const steps = distance - Math.abs(diff)
        cells.add([r+diff, c].toString())
        let i = 1
        while (i <= steps) {
            cells.add([r+diff, c+i].toString())
            cells.add([r+diff, c-i].toString())
            i++
        }
    }
    cells.delete(beacon.toString())
}

console.log(cells.size)