const LinkedList = () => {
    let head = null;
    let length = 0;
    const append = (element) => {
        const node = {
            element,
            next: null,
        };
        if (head === null) {
            head = node;
        } 
        else {
            let currentNode = head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        length++;
    };
    const toString = () => {
        let result = "";
        let current = head;
        while (current) {
            result += `${current.element}${current.next ? " -> " : ""}`;
            current = current.next;
        }
        return result;
    };
    return { append, toString };
}

const list = LinkedList();
list.append(2);
list.append(3);
list.append(4);
console.log(list.toString());