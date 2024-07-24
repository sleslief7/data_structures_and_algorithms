class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    if (!this.head) {
      this.head = new Node(value);
      this.size++;
      return;
    }
    let next = this.head;
    while (next.nextNode) {
      next = next.nextNode;
    }
    next.nextNode = new Node(value);
    this.size++;
  }

  prepend(value) {
    this.head = new Node(value, this.head);
    this.size++;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let last = this.head;
    while (last.nextNode) {
      last = last.nextNode;
    }
    return last;
  }

  at(index) {
    let currentIndex = 0;
    let next = this.head;
    while (index !== currentIndex && next) {
      currentIndex++;
      next = next.nextNode;
    }
    return next?.value ?? null;
  }

  pop() {}

  toString() {
    let str = '';
    let next = this.head;
    while (next) {
      const end = next.nextNode ? '' : 'null';
      str += `( ${next.value.toString()} ) -> ${end}`;
      next = next.nextNode;
    }
    return str;
  }
}

const myList = new LinkedList();
myList.append(24);
myList.append(1);
myList.append(25);
myList.prepend(0);
//console.log(myList.getSize());
console.log(myList.toString());
// console.log(myList.getHead());
// console.log(myList.getTail());
console.log(myList.at(4));
