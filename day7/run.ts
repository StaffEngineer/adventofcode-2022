import * as fs from 'fs'
import * as _ from 'lodash'

const input = fs.readFileSync('./input.txt', 'utf-8')

type File = {
    name: string
    size: number
}

type Node = {
    parent: Node | null
    name: string
    dirs: Node[]
    files: File[]
}

function buildTree(input: string): Node {
    const lines = input.split('\n')
    const root: Node = { parent: null, name: '/', dirs: [], files: [] }
    let curDir: Node = root
    
    let i = 0
    while (i < lines.length) {
        const line = lines[i]
        const parts = line.split(' ')
        if (parts[0] === '$') {
            if (parts[1] === 'cd') {
                const path = parts[2]
                if (path === '/') {
                    curDir = root
                } else if (path === '..') {
                    curDir = curDir.parent!
                } else {
                    for (const dir of curDir.dirs) {
                        if (dir.name === path) {
                            curDir = dir
                            break
                        }
                    }
                }
            }
            if (parts[1] === 'ls') {
                let j = i + 1
                while (j < lines.length) {
                    const nextLine = lines[j]
                    if (nextLine.startsWith('$')) break
                    const parts = nextLine.split(' ')
                    if (parts[0] === 'dir') {
                        curDir.dirs.push({ parent: curDir, name: parts[1], dirs: [] , files: []})
                    } else {
                        curDir.files.push({ size: parseInt(parts[0]), name: parts[1] })
                    }
                    j++
                }
                i = j - 1
            }
        }
        i++
    }
    return root
}

const root = buildTree(input)

const sizes = new Map()
function getSize(node: Node, path: string): number {
    let size = 0
    const p = `${path}/${node.name}`
    for (const child of node.dirs) {
        size += getSize(child, p)
    }
    for (const file of node.files) {
        size += file.size
    }
    sizes.set(p, size)
    return size
}
const rootSize = getSize(root, '')

const totalSize = 70000000
const unusedSpaceNeeded = 30000000
const toDelete = unusedSpaceNeeded - (totalSize - rootSize)
const minToDelete = Math.min(...[...sizes.values()].filter(size => size >= toDelete))
console.log(minToDelete)
