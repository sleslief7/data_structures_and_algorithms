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

  insert(value) {
    let treeData = this.root.data;
    while (treeData) {
      if (value > treeData) {
        treeData = treeData.right;
      } else {
        treeData = treeData.left;
      }
    }
    treeData = new Node(value);
  }

  deleteItem(value) {}

  find(value) {}
}

let arr1 = [5, 7, 4, 3, 1, 2, 1, 3, 6, 2];
let test = new Tree(arr1);
console.log(prettyPrint(test.root));
test.insert(9);
console.log(prettyPrint(test.root));
