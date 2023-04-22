function Node(element = null, next = null)
{
    return {element, next};
}

const LinkedList = () => {
    let head = null;
    let length = 0;
    const append = (element) => {
        const newNode = Node(element);
        if (head === null) {
            head = newNode;
        } 
        else {
            let currentNode = head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
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
    const toString = () => {
        let result = "";
        let current = head;
        while (current) {
            result += `${current.element}${current.next ? " -> " : ""}`;
            current = current.next;
        }
        return result;
    };
    return { append, size, toString, prepend };
}

const list = LinkedList();
list.append(2);
list.append(3);
list.prepend(4);
console.log(list.toString());
console.log(list.size());