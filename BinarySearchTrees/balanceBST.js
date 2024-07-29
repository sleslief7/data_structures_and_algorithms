const { prettyPrint } = require('./prettyPrint.js');

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(arr) {
    let sortedArr = [...new Set(arr)].sort((a, b) => a - b);
    let midIndex = Math.floor(sortedArr.length / 2);
    if (sortedArr.length === 0) return null;

    let node = new Node(sortedArr[midIndex]);
    node.left = this.buildTree(sortedArr.slice(0, midIndex));
    node.right = this.buildTree(sortedArr.slice(midIndex + 1));
    return node;
  }

  findMin(rootNode) {
    while (rootNode.left !== null) rootNode = rootNode.left;
    return rootNode;
  }

  deleteItem(value, rootNode = this.root) {
    if (rootNode === null) return rootNode;

    if (value < rootNode.data) {
      rootNode.left = this.deleteItem(value, rootNode.left);
    } else if (value > rootNode.data) {
      rootNode.right = this.deleteItem(value, rootNode.right);
    } else {
      if (rootNode.left === null && rootNode.right === null) {
        rootNode = null;
      } else if (rootNode.left === null) {
        rootNode = rootNode.right;
      } else if (rootNode.right === null) {
        rootNode = rootNode.left;
      } else {
        let min = this.findMin(rootNode.right);
        rootNode.data = min.data;
        rootNode.right = this.deleteItem(min.data, rootNode.right);
      }
    }
    return rootNode;
  }

  insert(value) {
    let cursor = this.root;
    while (cursor) {
      if (value === cursor.data) return;
      if (value > cursor.data) {
        if (cursor.right === null) {
          cursor.right = new Node(value);
          return;
        }
        cursor = cursor.right;
      } else {
        if (cursor.left === null) {
          cursor.left = new Node(value);
          return;
        }
        cursor = cursor.left;
      }
    }
  }

  find(value) {
    let cursor = this.root;
    while (cursor) {
      if (value > cursor.data) {
        cursor = cursor.right;
      } else if (value < cursor.data) {
        cursor = cursor.left;
      } else {
        return cursor;
      }
    }
    return null;
  }

  insertRecursive(value, current = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    if (current == null) return new Node(value);

    if (value > current.data) {
      current.right = this.insertRecursive(value, current.right);
    } else if (value < current.data) {
      current.left = this.insertRecursive(value, current.left);
    } else {
      return;
    }
    return current;
  }

  levelOrder(cb) {
    if (!cb) throw new Error('Must provide a callback function.');
    if (!this.root) return;
    let queue = [this.root];

    while (queue.length) {
      let node = queue.shift();
      cb(node);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  inOrder(cb, current = this.root) {
    if (!cb) throw new Error('Must provide a callback function.');
    if (current === null) return;

    this.inOrder(cb, current.left);
    cb(current);
    this.inOrder(cb, current.right);
  }

  preOrder(cb, current = this.root) {
    if (!cb) throw new Error('Must provide a callback function.');
    if (current === null) return;

    cb(current);
    this.inOrder(cb, current.left);
    this.inOrder(cb, current.right);
  }

  postOrder(cb, current = this.root) {
    if (!cb) throw new Error('Must provide a callback function.');
    if (current === null) return;

    this.inOrder(cb, current.left);
    this.inOrder(cb, current.right);
    cb(current);
  }

  depth(node) {
    if (!node) return -1;
    let depth = -1;
    let cursor = this.root;
    if (!cursor) return depth;
    while (cursor) {
      depth++;
      if (node.data > cursor.data) {
        cursor = cursor.right;
      } else if (node.data < cursor.data) {
        cursor = cursor.left;
      } else {
        return depth;
      }
    }
    return -1;
  }

  height(node) {
    if (!node) return -1;

    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  isBalanced() {
    let leftHeight = this.height(this.root.left);
    let rightHeight = this.height(this.root.right);
    return Math.abs(rightHeight - leftHeight) <= 1;
  }

  rebalance() {
    let arr = [];
    this.inOrder((c) => arr.push(c.data));
    this.root = this.buildTree(arr);
  }
}

let arr1 = [5, 7, 4, 3, 1, 2, 1, 3, 6, 2, 9, 10];
let test = new Tree(arr1);
prettyPrint(test.root);
