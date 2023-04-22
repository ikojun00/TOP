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
    const insertAt = (element, position) => {
        let currentNode = head;
        let i = 0;
        while (currentNode) {
            if (i === position - 1) {
                const newNode = Node(element, currentNode.next);
                currentNode.next = newNode;
            }
            currentNode = currentNode.next;
            i += 1;
        }
        
        length++;
    }
    const removeAt = (position) => {
        const isPositionInTheRange = position > -1 && position < length;
  
        if(!isPositionInTheRange){
            return null;
        }
        
        let currentNode = head;
        
        if(position === 0){
            head = currentNode.next;
        } 
        else {
            let index = 0;
            let previousNode = null;
            
            while(index++ < position){
                previousNode = currentNode;
                currentNode = currentNode.next
            }
            
            previousNode.next = currentNode.next;
        }
        
        length--;
        return currentNode.element;
    }
    return { append, prepend, size, firstElement, lastElement, indexOf, pop, find, toString, insertAt, removeAt };
}