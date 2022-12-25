globalState = {
    moves: [],
    grids: [],
    w: 10,
    i: 0
}

function setup() {
  myFunc()
  const grid = globalState.grids[0]
  const w = globalState.w
  createCanvas(grid[0].length * w, grid.length * w);
}

function draw() {
	background(220);
	const w = globalState.w
    let grid = globalState.grids[globalState.i]
    const [r,c] = globalState.moves[globalState.i]
    if (grid && grid[r] && grid[r][c]) grid[r][c] = 'K'
    globalState.i++
    globalState.i = globalState.i % (globalState.moves.length-4)
    for (var x = 0; x < width; x += w) {
		for (var y = 0; y < height; y += w) {
            if (grid[y/w][x/w] === '#') {
                stroke(0);
                const c = color(0, 0, 0);
                fill(c)
                rect(x, y, w, w);
            }
            if (['x','v','^','>','<'].includes(grid[y/w][x/w])) {
                stroke(0);
                const c = color(244, 200, 200);
                fill(c)
                rect(x, y, w, w);
            }
            if (grid[y/w][x/w] === 'K') {
                stroke(0);
                const c = color(255, 0, 0);
                fill(c)
                 rect(x, y, w, w);
            }
		}
	}
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(`Minutes: ${globalState.i}`, width/2, height/2);
}

function myFunc() {
const input = `#.####################################################################################################
#>>^<^v>v<>^>>v<<.<<<^<vv^<^>v><^<v>><^>.<><^^>v<^>v>^^>v><v.^<.^>>>^>v^^^<vv^<><vvv>v>^vv<<>v^^<v><>#
#>^>^><^v<>.v><><<<>><v><>vv^.><v^<^v^>v<<<v..<v.v^v.v<<v<>>^^<v^v.<^.^v><^v^.^^<v>..v<^>^<<^>.v.>v.>#
#.>^>v<v^><v<v^><>^v>><>v<>^><>v^<^v<>v<>^<v<><^^v.v.>^^.v<<^v<>>.v>>v<^^.v<v^<^>>..>><<v.^>.<<<^v.^>#
#<>^^^..v^^v^<<><<<^<>.>.vvv.v>^^.><.^>>>v^^>^^vv>v<^v>>^^<v>v^<<^>..^v^<>>>>>.>>><v^^^vv<>v^v<>^^.<>#
#>v^vvv><>>v^v.v><v<<^.>.>>^<.^<^<>><^<><^>v.>v<>v><<>>><^v<.>v<^v<v^..<vv><><.^^^^<^.<v<<^^>>v^>^<><#
#>^>^>^<<>^><<v^^^^^^^v^<<>>v^^>v>v<.><><^v^<v>>>>^<..>v<.^v><^<^v>v^^vvv^v^<v>>.^<<<.^^vv>vvv>^..<v>#
#><vv.vv^v.>^>>v<<<v^>>^^>><v<<.^>>v>v^.<v<vv<<<.vv^<>^.<v>vv<.>^^v><><^<v<^><.^vv^^<><<.vv^<v<<v.v^>#
#<^<v>.>^v^<v^^><vv.>>.<^>.^..><v^<<v^<^<<.<v<^v^v<^<.<<v<^v>^<<^v<>^<^v>vv^>vv>^<v.>^><v..>><v^<^^^>#
#>^><v><<<>><^v^>v<><>v^><.v>>.>^v<.^><vvv<.>v<v>^>>v><^^^v^.v>^.^^>^v>>v^v<^v>.^.<^>^^v<.<<v^..<<.v>#
#>vv>^.<<>><^>.<^><v<^<>>v><v>^.>v^<><.v.>^>>^><<v>^v..<^^^<vv^..^^<<<.v<<v<vv^v^<^><><v>.<<><^<v<^<<#
#>^>v<^v^.<<v<<^^>^<>vvv<v^>^<v<.^v^>><>vv<>v<.^^>^<>>><>v<<>.>^<<>vvv^v.v<><<>^.v.>^><^^>>^>>><>v.^<#
#>^<.^.<>v<.<^v>v<^^<>^>vvv..v.^><<^<.><...<.^>^>^vv<>v^^><<v>v^^<^^><<^>>vvv^<^^v>>vv<v<><v^<^v<^v^>#
#.>>^.v<>v>><<..vv>^.>>^>^^.v>v.<^><>v<v^^><<v<.>>^<v<<><>.^<<.>>^<v<>v^>><v>^>..v<^<^.vv<>^^>>>v^>v<#
#<>^^^<v><^v^vvv>^v^v><<>>^<vv^><<v.>>v>.v>^>>v<^vv.<><<>><<v<>>^.<<>v.v^^vv<.>^<^v.<^<vvv^v.vv><vv.>#
#>vv.vv^><v>v>.<v^><v<vv^v<.v<<>^<^>^><v^>v>^<v><>v>>v>>>>v^.<v<vv>^v<^.^.^>>><>^<^<^.<v<.><v.^<^.><.#
#>^vvv<>^v^^>^<^v<^>v<<^<vv.vvv<<<v<v^..^.<<v<<<>>^>v^v^>^><v.^<v<<v>^^v<v.>>>v^<v^<v>^<^^.>v<^<>^.v<#
#<>^<<<<v<>^v>v^<vv<^v>v^^<>.^>^^<.>>v>v<<^<<<>v<v^v><>>.<<.^<>><<<v>v^>v^^<v^^.><vv>^^<v.v>^<v<.vv><#
#<>vvv<^^.v^^.v.<^<^>.^^v>^v>>.vv.>.v<<^<^^>vvv^<<<vv^<vv<>>v^^<^.<^.>v.^>v><^^>>^>^<>.>.^<<<.v.<>^>>#
#><>v<>>>><.^v>v><v>^<<><>^vv.^.<.>>vvvv><>^^><>v>v.^^<^<^v>v<^<.<^<>^^^^vvv>.>>><^vv<^^^>.^<<v^>>><>#
#<<><^>>^>^^>><.v^^^.v^^^>.^v<vvv.^^<^^>^<>>><<>>><<.v<^>><<v<v^>vv^<>vv.<<>v<v^><<vv^^^>vvvv<<v<><<<#
#<^<><>><<>^^>v<<^v<v>^^^>^^vvvv<^^vv<>><.<^^.vv^>>.<>^.v<><^^vv>^^>>^<^^v>.v<>>^v.v^>.^v<.<v.<>>>>v<#
#<^<<^^^vv><^<>^^>^v<v^v^.<v.>v>><<^^>v^>v>><v<<><>^^.vv^><.^>vv^v<<>^><^>^>^v^<><>^.^<.^.^>>^<.>^><<#
#>^.<<v>^.<<<^>v>>>^<.^>>>.^^<<^.v^<<>v^<<<^<><>^vvvv^>vv^^>.>>^>><>^^^^>v<^^>^^<^vv.v.^<<^<<^>v><.>>#
#>vv^.^vv>^<>^v.^^<v>v>><^^^v<<>>^>>^^>^<^<<<^.v><^>v<<v^<^^^>vv><<v<.<v><^vv>^>^v^<^v>^<^vv<<^v<.^^>#
#<v>vv<^>v^^<<^^<<<v>v><<<.v^>^<><vvv^>.^.v>v<^^vvvv>>^v^^v^^^<>>>>v>>^>v^.<>.>.^vvv^<^<.<^>^<.v<><.>#
#.<.<^v<v><^>.^.v<>>^<>.<<^.vv^>v^v<..>^.^^vv^><.<>^<><^vv>^<.<>v..<^^<v^^v<<<v<><<>>vv<>^^<>^vvvvv><#
#<.^v^>vvv<.v<.vv><^vv^>>.^>><><<v>v<^<<vv.<>v<vv^v>^>^^<v>^>^<<>^<<^>.v^^^><>.^^v>^...^<^>>>.>v^^vv<#
#.<^v>^>^^<^v.v>.^<><<<>>vv>.^v<>.<<>>v^v<v>>^.^<^^<.v^<><vvv>><^.>.vv<.vv^>^><<.<.>><^>vv^^>>v^>^>.<#
#.>^<>><v<.>vv<>>^<v.>^.<v^v.v<><>^<v^<v.<<^v<>v<<v>v^>^>v.>>v^.><^^.>v<v.v^.>^^<>^<.^<v^^><<>^vvv>><#
#.^.^vv^..^>.v.<<v>^^^>^<^v<^>>v<>v>.<><>>.<v^<^>.<v.^^v^<v><>^>v.<^<<><>v.<<<^>.<<.^>^>^<^.>^v>>>.>>#
#.^v>><>v<<.<^>^^<<>^>v>vv<>>^>>^.v^>.>^<v^v>>v^^><.v.<v>.>vv<<^v<v<v^v>v<v<.^<.^<<v>^^v.^v.<^>.v>^>>#
#>^v>^<<>>vv>^<.<v^v<^>>^v>^v^<<><<^^^^v>^^^^^^^vv<^..<vvv><^.<..^>^^<^>v^>>>>vv>v<<<<>.>.>^.^<^.v<v>#
#.^v.^>><.><<v^>^^.>><^v<..>..><.><><<v>>>v<>^.>v<vv^^<<.^.^^v<v..^<v^>.<vvv>^>v>^<^><>>>>v<>^>>vv^.>#
#<v<vv^vvv><v^<^>>.v^v^>><.>><>>v^^<v>>>>.v^.^.<vv.>>>^v>^<>v^.^>v<vv.>>vvv^v^<vv<>v<^<^.<<^..v^.^v<<#
#<.<v>^>v<^<.<><>.v<<^v<^<>^.vv<v<<v>v<^<^v>v<v^^vv<><..v<<<<.^^v<>>^<v>.^>>v<^>v>^><vvv<^>>.^v>^<.><#
####################################################################################################.#`
    initialGrid = input.split('\n').map(r => r.split(''))
    let blizzards = []
for (let r = 0; r < initialGrid.length; r++) {
    for (let c = 0; c < initialGrid[r].length; c++) {
        if (initialGrid[r][c] !== '#' && initialGrid[r][c] !== '.') {
            blizzards.push([r,c,initialGrid[r][c]])
        }
    }
}
const start = [0,1]
const end = [initialGrid.length-1, initialGrid[0].length-2]
 
function getNewGrid(grid, blizzards) {
    const R = grid.length
    const C = grid[0].length
    const newGrid = JSON.parse(JSON.stringify(grid))
    const newBlizzards = []
    blizzards.forEach(([x,y,]) => { newGrid[x][y] = '.' })
    for (const [x,y,c] of blizzards) {
        let shift = [0,0]
        if (c === '>') shift = [0,1]
        if (c === '<') shift = [0,-1]
        if (c === '^') shift = [-1,0]
        if (c === 'v') shift = [1,0]
        let newX = x + shift[0]
        let newY = y + shift[1]
        if (newGrid[newX][newY] === '#') {
            if (c === '>') newY = 1
            if (c === '<') newY = C-2
            if (c === '^') newX = R-2
            if (c === 'v') newX = 1
        }
        newBlizzards.push([newX, newY, c])
    }
    newBlizzards.forEach(([x,y,c]) => { 
        if (newGrid[x][y] !== '.') {
            newGrid[x][y] = 'x'
        } else {
            newGrid[x][y] = c
        }
    })
    return [newGrid, newBlizzards]
}

function getPossibleMoves(grid, x, y) {
    const possibleMoves = []
    if (grid[x][y] === '.') possibleMoves.push([x, y])
    const neighbours = [[0,1],[1,0],[-1,0],[0,-1]]
    for (let [a,b] of neighbours) {
        const k = a + x
        const m = b + y
        if (grid?.[k]?.[m] === '.' || grid?.[k]?.[m] === 'Q') possibleMoves.push([k,m])
    }
    return possibleMoves
}

const visited = new Set()

const state = new Map().set(0, [initialGrid, blizzards])

function bfs(start, end, p, startTime) {
    const queue = [[start[0], start[1], startTime, p]]
    while (queue.length > 0) {
        const [x,y,l,path] = queue.shift()
        const [grid,] = state.get(l)
        if (x === end[0] && y === end[1]) { return [l, [...path, [x,y]]] }
        if (visited.has([x,y,l].toString())) continue
        visited.add([x,y,l].toString())
        let newG = grid
        if (state.has(l+1)) {
            newG = state.get(l+1)[0]
        } else {
            const [grid, blizzards] = state.get(l)
            let [newGrid, newB] = getNewGrid(grid, blizzards)
            state.set(l+1, [newGrid,newB])
            newG = newGrid
        }
        getPossibleMoves(newG, x,y).forEach(([k,m]) => queue.push([k,m,l+1,[...path, [k,m]]]))
    }
    return [Infinity, []]
}

const [minutes, moves] = bfs(start, end, [start], 0)
const [minutes2, moves2] = bfs(end, start, moves, minutes)
const [minutes3, moves3] = bfs(start, end, moves2, minutes2)
globalState.moves = moves3
globalState.grids = [...state.values()].map(v => v[0])
}