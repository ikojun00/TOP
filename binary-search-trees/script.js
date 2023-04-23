function Node(element = null, left = null, right = null)
{
    return {element, left, right};
}

function BuildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const root = Node(array[middle]);
    root.left = BuildTree(array, start, middle - 1);
    root.right = BuildTree(array, middle + 1, end);
    return root;
}

const BinarySearchTree = (array) => {
    array = [...new Set(array.sort((a, b) => (a < b ? -1 : 1)))];

    const root = () =>  BuildTree(array);
    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.element}`);
        if (node.left !== null) {
          prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
    const insert = (value, position = root()) => {
        if (value === position.element) return;

        if (value < position.element) {
            if (position.left === null) {
                position.left = Node(value);
                return;
            }
            insert(value, position.left);
        }

        if (value > position.element) {
            if (position.right === null) {
                position.right = Node(value);
                return;
            }
            insert(value, position.right);
        }
        console.log(position);
        return position;
    };
    const remove = (value, position = root()) => {
        if (position === null) return position;

        if (value < position.element) position.left = remove(value, position.left);
        else if (value > position.element) position.right = remove(value, position.right);
        
        else 
        {
            if (position.left === null) return position.right;
            else if (position.right === null) return position.left;

            let key = position.right.element;
            let root = position.right;

            while (root.left !== null) {
                key = root.left.element;
                root = root.left;
            }

            position.element = key;
            position.right = remove(key, position.right);
        }
        return position;
    };
    return { root, prettyPrint, insert, remove };
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = BinarySearchTree(array);
const root = tree.root();
tree.prettyPrint(root);
tree.prettyPrint(tree.insert(2));
tree.prettyPrint(tree.remove(4));