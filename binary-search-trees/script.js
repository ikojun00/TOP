function Node(element = null, left = null, right = null)
{
    return {element, left, right};
}

function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;

    const middle = Math.floor((start + end) / 2);
    const root = Node(array[middle]);
    root.left = buildTree(array, start, middle - 1);
    root.right = buildTree(array, middle + 1, end);
    return root;
}

const BinarySearchTree = (array) => {
    array = [...new Set(array.sort((a, b) => (a < b ? -1 : 1)))];

    const root = () =>  buildTree(array);
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
    const find = (value, position = root()) => {
        if (position === null) return -1;
        if (value === position.element) return position;

        if (value < position.element) return find(value, position.left);
        else if (value > position.element) return find(value, position.right);
    
    };
    const levelOrder = (arr = [], queue = [], position = root()) => {
        if (position === null) return;
        arr.push(position.element);
        queue.push(position.left);
        queue.push(position.right);

        while (queue.length) {
            const level = queue[0];
            queue.shift();
            levelOrder(arr, queue, level)
        }

        return arr;
    };
    const inorder = (arr = [], position = root()) => {
        if (position === null) return;
      
        if (position.left) inorder(arr, position.left);
        arr.push(position.element);
        if (position.right) inorder(arr, position.right);
        
        return arr;
    };
    const preorder = (arr = [], position = root()) => {
        if (position === null) return;
      
        arr.push(position.element);
        if (position.left) inorder(arr, position.left);
        if (position.right) inorder(arr, position.right);
        
        return arr;
    };
    const postorder = (arr = [], position = root()) => {
        if (position === null) return;
      
        if (position.left) inorder(arr, position.left);
        if (position.right) inorder(arr, position.right);
        arr.push(position.element);
        
        return arr;
    };
    const height = (position = root()) => {
        if (position === null) return 0;

        let lHeight = height(position.left);
        let rHeight = height(position.right);

        if (lHeight > rHeight) return lHeight + 1;
        else return rHeight + 1;
    };
    const depth = (node, position = root(), depthValue = 0) => {
        if (position === null || node === null) return;
        if (node === position) return depthValue;
        
        if (node.element < position.element) return depth(node, position.left, depthValue += 1);
        else return depth(node, position.right, depthValue += 1);
    };
    const isBalanced = (position = root()) => {
        const lHeight = height(position.left);
        const rHeight = height(position.right);
        const diff = Math.abs(lHeight - rHeight);
        return diff < 2 ? 'true' : 'false';
    };
    const rebalance = (position = root()) => {
        let arr = levelOrder([], [], root);
        arr.sort((a, b) => a - b);
        return position = buildTree(arr);
    };
    
    return { root, prettyPrint, insert, remove, find, levelOrder, inorder, preorder, postorder, height, depth, isBalanced, rebalance};
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = BinarySearchTree(array);
const root = tree.root();
tree.prettyPrint(root);