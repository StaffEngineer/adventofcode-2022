import * as fs from 'fs'
import * as _ from 'lodash'

let input = fs.readFileSync('./input.txt', 'utf-8')

class Cube {
    x: number
    y: number
    z: number
    hash: number
    constructor(x:number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
        this.hash = hashCode([x,y,z].toString())
    }

    getOpenSides(hashes: Set<number>): number {
        function addCount([x,y,z]: number[]) {
            return !hashes.has(hashCode([x,y,z].toString())) ? 1 : 0
        }
        let count = 0
        count += addCount([this.x+1,this.y,this.z])
        count += addCount([this.x,this.y+1,this.z])
        count += addCount([this.x,this.y,this.z+1])
        count += addCount([this.x-1,this.y,this.z])
        count += addCount([this.x,this.y-1,this.z])
        count += addCount([this.x,this.y,this.z-1])
        return count
    }

    getWaterSides(waterHashes: Set<number>): number {
        function addCount([x,y,z]: number[]) {
            return waterHashes.has(hashCode([x,y,z].toString())) ? 1 : 0
        }
        let count = 0
        count += addCount([this.x+1,this.y,this.z])
        count += addCount([this.x,this.y+1,this.z])
        count += addCount([this.x,this.y,this.z+1])
        count += addCount([this.x-1,this.y,this.z])
        count += addCount([this.x,this.y-1,this.z])
        count += addCount([this.x,this.y,this.z-1])
        return count
    }

    getHashCode(): number {
        return this.hash
    }
}

const cubes: Cube[] = []
const cubesHashes: Set<number> = new Set()
for (const line of input.split('\n')) {
    const [x,y,z] = line.split(',').map(Number)
    const cube = new Cube(x, y, z)
    cubes.push(cube)
    cubesHashes.add(cube.getHashCode())
}

function hashCode(str: string) {
    let hash = 0
    let chr: number
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const neighbours = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];

let start = [30,30,30]
const queue = [start]
function inRange([x,y,z]: number[]) {
    return x >= -1 && y >= -1 && z >=-1 && x <= 30 && y <= 30 && z <= 30
}
const visited: Set<number> = new Set()
const waterHashes: Set<number> = new Set()
while (queue.length > 0) {
    const [x,y,z] = queue.shift()!
    const hash = new Cube(x, y, z).getHashCode()
    if (visited.has(hash)) continue
    visited.add(hash)
    waterHashes.add(hash)
    for (const [a,b,c] of neighbours) {
        const [i,j,k] = [x+a, y+b, z+c]

        if (inRange([i,j,k]) && !cubesHashes.has(new Cube(i, j, k).getHashCode())) {
            queue.push([i,j,k])
        }
    }
}

// let count = 0
// for (let cube of cubes) {
//     count += cube.getOpenSides(cubesHashes)
// }
// console.log(count)

let count = 0
for (let cube of cubes) {
    count += cube.getWaterSides(waterHashes)
}
console.log(count)