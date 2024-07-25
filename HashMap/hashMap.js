class Node {
  constructor(key, value, next = null) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}
class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.entries = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    let index = this.hash(key);
    let node = new Node(key, value);

    if (!this.buckets[index]) {
      this.buckets[index] = node;
    } else {
      let nextNode = this.buckets[index];
      while (nextNode.next && nextNode.key !== key) {
        nextNode = nextNode.next;
      }
      if (nextNode.key === key) {
        nextNode.value = value;
        return;
      }
      nextNode.next = node;
    }
    this.entries++;
  }

  get(key) {
    let index = this.hash(key);

    let node = this.buckets[index];
    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return null;
  }

  has(key) {
    let index = this.hash(key);
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) return true;
      node = node.next;
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key);
    let cursor = this.buckets[index];
    if (cursor === null) return false;
    if (cursor.key === key) {
      this.buckets[index] = cursor.next;
      this.entries--;
      return true;
    }

    let prev = null;
    while (cursor) {
      if (cursor.key === key) {
        prev.next = cursor.next;
        this.entries--;
        return true;
      }
      prev = cursor;
      cursor = cursor.next;
    }
    return false;
  }

  length() {
    return this.entries;
  }

  clear() {
    this.capacity = 16;
    this.loadFactor = 0.8;
    this.entries = 0;
    this.buckets = new Array(this.capacity).fill(null);
  }

  keys() {
    let keysArr = [];

    for (let i = 0; i < this.capacity; i++) {
      let cursor = this.buckets[i];
      while (cursor) {
        keysArr.push(cursor.key);
        cursor = cursor.next;
      }
    }
    return keysArr;
  }
  values() {
    let valuesArr = [];

    for (let i = 0; i < this.capacity; i++) {
      let cursor = this.buckets[i];
      while (cursor) {
        valuesArr.push(cursor.value);
        cursor = cursor.next;
      }
    }
    return valuesArr;
  }

  getEntries() {
    let pairs = [];

    for (let i = 0; i < this.capacity; i++) {
      let cursor = this.buckets[i];
      while (cursor) {
        pairs.push([cursor.key, cursor.value]);
        cursor = cursor.next;
      }
    }
    return pairs;
  }

  getStringifiedObj() {
    const pairs = this.getEntries();
    if (pairs.length === 0) return '{ }';
    let res = '{\n';
    res += pairs.map((x) => `    ${x[0]}: ${x[1]}`).join(',\n');
    res += '\n}';
    return res;
  }
}

const test = new HashMap();
test.set('banana', 'yellow');
test.set('apple', 'green');
test.set('Carlos', 'red');
test.set('Carla', 'yellow');
test.set('apple', 'red');
test.remove('banana');
console.log(test.getEntries());
