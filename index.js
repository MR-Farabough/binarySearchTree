//TODO Build a Node class
// Attribute for data (node), left, and right children

//TODO Build a Tree class
// Accepts an array when initialized
// Attribute for root, which uses the return value of buildTree

//TODO Write a buildTree function which takes an array of data
// (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) 
// Turn it into a balanced binary tree full of Node objects appropriately placed 
// Must sort and remove duplicates
// Return the level-0 root node

// Visualize your binary search tree
// Expects to receive the root of your tree as the value for the node parameter
// const prettyPrint = (node, prefix = "", isLeft = true) => {
//   if (node === null) {
//     return;
//   }
//   if (node.right !== null) {
//     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
//   }
//   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
//   if (node.left !== null) {
//     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
//   }
// };

//TODO Write an insert and delete functions
// Accepts a value to insert/delete
// Deal with cases for delete such as when a node has children or not

// DO NOT USE the original input array used to build the tree
// It’s important for the efficiency of these operations that you don’t do this
// Binary search trees can insert/delete in O(log n) time 
// These methods should traverse the tree and manipulate the nodes and their connections

//TODO Write a find function
// Accepts a value and returns the node with the given value

//TODO Write a levelOrder function
// Accepts another function as a parameter
// levelOrder should traverse the tree in breadth-first level order
// Provide each node as the argument to the provided function
// This function can be implemented using either iteration or recursion 
// Return an array of values if no function is given
// Tip: Use an array as a queue to keep track of all the child nodes...
// .. that have yet to traverse and to add new ones to the list (as you saw in the video)

//TODO Write inorder, preorder, and postorder functions
// Accepts a function parameter
// Should traverse the tree in their respective depth-first order 
// yield each node to the provided function given as an argument
// Return an array of values if no function is given

//TODO Write a height function
// Accepts a node and returns its height
// Height is defined as the number of edges in longest path from a given node to a leaf node

//TODO Write a depth function
// Accepts a node and returns its depth
// Depth is defined as the number of edges in path from a given node to the tree’s root node

//TODO Write a isBalanced function
// Checks if the tree is balanced
// A balanced tree is when the difference between heights...
// .. of left subtree and right subtree of every node is not more than 1

//TODO Write a rebalance function
// Rebalances an unbalanced tree
// Tip: You’ll want to use a traversal method to provide a new array to the buildTree function

//TODO Tie it all together
// Write a simple driver script that does the following:
// Create a binary search tree from an array of random numbers
// You can create a function that returns an array of random numbers every time you call it, if you wish
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order
// Unbalance the tree by adding several numbers > 100
// Confirm that the tree is unbalanced by calling isBalanced
// Balance the tree by calling rebalance
// Confirm that the tree is balanced by calling isBalanced
// Print out all elements in level, pre, post, and in order