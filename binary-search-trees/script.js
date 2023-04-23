function Node(element = null, left = null, right = null)
{
    return {element, left, right};
}

function BuildTree(array, start = 0, end = array.length - 1) {
  // Base case
  if (start > end) return null;

  // Get root node
  const middle = Math.floor((start + end) / 2);
  const root = Node(array[middle]);

  // Recursion. Get left and right nodes
  root.left = BuildTree(array, start, middle - 1);
  root.right = BuildTree(array, middle + 1, end);

  return root;
}

const BinarySearchTree = (array) => {
    // Sort array numerically
    array = [...new Set(array.sort((a, b) => (a < b ? -1 : 1)))];
    console.log(array);

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
    return { root , prettyPrint };
}

let array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = BinarySearchTree(array);
const root = tree.root();
tree.prettyPrint(root);