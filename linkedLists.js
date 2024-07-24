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
    return next;
  }

  pop() {
    if (this.size <= 0) return undefined;
    if (this.size === 1) {
      this.head = null;
      this.size--;
      return;
    }
    let last = this.head;
    while (last.nextNode.nextNode) {
      last = last.nextNode;
    }
    this.size--;
    last.nextNode = null;
  }

  contains(value) {
    if (this.size <= 0) return false;
    let next = this.head;
    while (next.nextNode) {
      if (next.value === value) return true;
      next = next.nextNode;
    }
    return false;
  }

  find(value) {
    if (this.size <= 0) return null;
    let index = 0;
    let next = this.head;
    while (next.nextNode) {
      if (next.value === value) return index;
      next = next.nextNode;
      index++;
    }
    return null;
  }

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

  insertAt(value, index) {
    if (index === 0) {
      this.head = new Node(value, this.head);
      this.size++;
      return;
    }
    if (this.size < index) {
      index = this.size;
    }
    let next = this.head;
    for (let i = 0; i < index - 1; i++) {
      next = next.nextNode;
    }
    next.nextNode = new Node(value, next.nextNode);
    this.size++;
  }

  removeAt(index) {
    if (index > this.size) return null;
    let next = this.head;
    if (index === 0) {
      this.head = next.nextNode;
      this.size--;
      return;
    }
    for (let i = 0; i < index; i++) {
      next = next.nextNode;
    }
    let prev = this.at(index - 1);
    next = next.nextNode;
    prev.nextNode = next;
    this.size--;
  }
}
