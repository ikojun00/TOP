function Node(element = null, next = null)
{
    return {element, next};
}

const LinkedList = () => {
    let head = null;
    let length = 0;
    const iterateToEnd = () => {
        let currentNode = head;
        while (currentNode.next !== null) {
            currentNode = currentNode.next;
        }
        return currentNode;
    };
    const append = (element) => {
        const newNode = Node(element);
        if (head === null) {
            head = newNode;
        } 
        else {
            const currentNode = iterateToEnd();
            currentNode.next = newNode;
        }
        length++;
    };
    const prepend = (element) => {
        const newNode = Node(element, head);
        head = newNode;
        length++;
    };
    const size = () => length;
    const firstElement = () => head.element;
    const lastElement = () => {
        const currentNode = iterateToEnd();
        return currentNode.element;
    }
    const indexOf = (index) => {
        let i = 0;
        let currentNode = head;
        if (index < 0) return;
        while (i < index) {
            i += 1;
            if (currentNode.next) {
                currentNode = currentNode.next;
            } 
            else {
                return null;
            }
        }
        return currentNode.element;
    }
    const pop = () => {
        let currentNode = head;
        while (currentNode.next.next !== null) {
            currentNode = currentNode.next;
        }
        currentNode.next = null;
    }
    const find = (element) => {
        let nodeIndex = 0;
        let currentNode = head;
        while (currentNode) {
            if (element === currentNode.element) {
                return nodeIndex;
            }
            nodeIndex++;
            currentNode = currentNode.next;
        }
        return null;
    }
    const toString = () => {
        let result = "";
        let current = head;
        while (current) {
            result += `${current.element}${current.next ? " -> " : ""}`;
            current = current.next;
        }
        return result;
    };
    return { append, prepend, size, firstElement, lastElement, indexOf, pop, find, toString };
}

const list = LinkedList();
list.append(8);
list.append(12);
list.prepend(9);
list.prepend(4);
list.append(16);
console.log(list.toString());
list.pop();
console.log(list.toString());
console.log(list.size());
console.log(list.firstElement());
console.log(list.lastElement());
console.log(list.indexOf(1));
console.log(list.find(8));