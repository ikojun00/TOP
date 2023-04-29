// Knight minimum moves - BFS

const directions = [[-2, -1], [-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2]];

function Node(row = 0, col = 0, distanceFromStartPosition = 0)
{
    const getPositionString = () => `[${row}, ${col}]`;
    return {getPositionString, row, col, distanceFromStartPosition};
}

function getNeighbours(row, col)
{
    const neighbours = [];
    for(const direction of directions)
    {
        const [rowChange, colChange] = direction;
        const neighbourRow = rowChange + row;
        const neighbourCol = colChange + col;
        neighbours.push([neighbourRow, neighbourCol]);        
    }
    return neighbours;
}

function knightMoves([startRow, startCol], [targetRow, targetCol])
{
    const queue = [];
    const startNode = Node(startRow, startCol, 0);
    queue.push(startNode);

    const visited = new Set();

    while(queue.length > 0)
    {
        const node = queue.shift();
        const {row, col, distanceFromStartPosition} = node;

        if(row === targetRow && col === targetCol)
        {
            console.log(`You made it in ${distanceFromStartPosition} moves!`);
            return;
        } 
        visited.add(node.getPositionString());

        for(const neighbour of getNeighbours(row, col))
        {
            const [neighbourRow, neighbourCol] = neighbour;
            const neighbourNode = Node(neighbourRow, neighbourCol, distanceFromStartPosition + 1);
            
            if(visited.has(neighbourNode.getPositionString)) continue;

            queue.push(neighbourNode);
        }
    }
}

knightMoves([3,3],[4,3]);