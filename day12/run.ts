import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')
const lines = input.split('\n')
const grid: number[][] = []
let start = [-1,-1]
let end = [-1,-1]
for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const row: number[] = []
    for (let j = 0; j < line.length; j++) {
        const char = line[j]
        row.push(char.charCodeAt(0))
        if (char === 'S'.charAt(0)) start = [i, j]
        if (char === 'E'.charAt(0)) end = [i, j]
    }
    grid.push(row)
}

const R = grid.length
const C = grid[0].length
const queue = [[start[0], start[1], 0]]
grid[start[0]][start[1]] = 'a'.charCodeAt(0)
grid[end[0]][end[1]] = 'z'.charCodeAt(0)
const neighbours = [[1,0],[0,1],[-1,0],[0,-1]]
const visited = new Set().add([start[0], start[0]].toString())
while (queue.length > 0) {
    const [r, c, s] = queue.shift()!
    if (r === end[0] && c === end[1]) console.log(s)
    for (let [i, j] of neighbours) {
        const x = r + i
        const y = c + j
        // out of grid
        if (x < 0 || x >= R || y < 0 || y >= C) continue
        // too high
        if (grid[x][y] - grid[r][c] > 1) continue
        // already visited
        if (visited.has([x, y].toString())) continue
        visited.add([x,y].toString())
        queue.push([x, y, s+1])
    }
}