class Node {
  constructor(x, y, parent = null) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }

  toString() {
    return this.toPos().toString();
  }

  toPos() {
    return [this.x, this.y];
  }
}

class KnightTravails {
  constructor() {
    this.directions = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];
  }

  isValid(pos) {
    const [x, y] = pos;
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  buildPath(n) {
    let path = [];
    if (!n) return path;
    let cursor = n;
    while (cursor) {
      path.unshift(cursor.toPos());
      cursor = cursor.parent;
    }
    return path;
  }

  getMovesForNode(node, visited) {
    return this.directions
      .map((d) => [node.x + d[0], node.y + d[1]])
      .filter((move) => this.isValid(move) && !visited.has(move.toString()));
  }

  knightMoves(start, end) {
    const root = new Node(start[0], start[1]);
    const queue = [root];
    const visited = new Set();
    visited.add(root.toString());

    while (queue.length > 0) {
      const cursor = queue.shift();

      if (cursor.x === end[0] && cursor.y === end[1]) {
        return this.buildPath(cursor);
      }

      const moves = this.getMovesForNode(cursor, visited);
      moves.forEach((m) => {
        queue.push(new Node(m[0], m[1], cursor));
        visited.add(m.toString());
      });
    }
    return null;
  }
}

const knight = new KnightTravails();
console.log(knight.knightMoves([0, 0], [5, 4]));
