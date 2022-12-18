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
        this.hash = this.hashCode([x, y, z].toString())
    }

    hashCode(str: string) {
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

    getOpenSideCount(hashes: Set<number>): number {
        let count = 6
        if (hashes.has(this.hashCode([this.x+1,this.y,this.z].toString()))) count--
        if (hashes.has(this.hashCode([this.x,this.y+1,this.z].toString()))) count--
        if (hashes.has(this.hashCode([this.x,this.y,this.z+1].toString()))) count--
        if (hashes.has(this.hashCode([this.x-1,this.y,this.z].toString()))) count--
        if (hashes.has(this.hashCode([this.x,this.y-1,this.z].toString()))) count--
        if (hashes.has(this.hashCode([this.x,this.y,this.z-1].toString()))) count--
        return count
    }

    getHashCode(): number {
        return this.hash
    }
}

const cubes: Cube[] = []
const hashes: Set<number> = new Set()
for (const line of input.split('\n')) {
    const [x,y,z] = line.split(',').map(Number)
    const cube = new Cube(x, y, z)
    cubes.push(cube)
    hashes.add(cube.getHashCode())
}

let count = 0
for (const cube of cubes) {
    count += cube.getOpenSideCount(hashes)
}
console.log(count)
