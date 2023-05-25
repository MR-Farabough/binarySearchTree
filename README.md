# binarySearchTree

Binary Search Tree of Nodes
> Uses mergeSort Algorithm to build tree

## Features

- `Tree` Class for tree obj
- `isBalanced` Returns boolean based on if the tree is balanced
- `rebalance` Rebalances tree starting from tree.root
- `insert(value)` Creates new Node & attaches to tree (could unbalance tree)
- `remove(value)` Removes node from tree & redirects adjacent nodes. Returns `RUN ERROR` if node is not in tree
- `height` Returns height of tree
- `depth(value)` Returns height of value
- `find(value)` If node is in tree returns node else returns `RUN ERROR`
- `levelOrder(cb)` Accepts callback returns breadth-first travseral intArray
- `inorder(cb)` Accepts callback returns sorted node intArray
- `preorder(cb)` Accepts callback returns preorder traversal intArray
- `postorder(cb)` Accepts callback returns postorder traversal intArray