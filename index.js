function mergeSort(arr) {
    if (arr.length == 1) {
        return arr
    }
    const mid = Math.floor(arr.length / 2)
    let leftArr = []
    let rightArr = []
    let count = 0
    while (count < mid) {
        leftArr.push(arr[count])
        count++
    }
    count = mid
    while (count < arr.length) {
        rightArr.push(arr[count])
        count++
    }
    leftArr = mergeSort(leftArr)
    rightArr = mergeSort(rightArr)
    return merge(leftArr, rightArr)
    function merge(left, right) {
        let li = 0
        let ri = 0
        let mergedArr = []
        while (mergedArr.length < right.length + left.length) {
            if (left[li] == null) {
                while (ri < right.length) {
                    mergedArr.push(right[ri])
                    ri++
                }
            } else if (right[ri] == null) {
                while (li < left.length) {
                    mergedArr.push(left[li])
                    li++
                }
            } else {
                if (left[li] < right[ri]) {
                    mergedArr.push(left[li])
                    li++
                } else {
                    mergedArr.push(right[ri])
                    ri++
                }
            }
        }
        return mergedArr
    }
}

function mergeSortRemoveDups(arr) {
    arr = mergeSort(arr)
    let index = 0
    while (index < arr.length) {
        if (arr[index + 1] == null) {
            return arr
        } else {
            if (arr[index] == arr[index + 1]) {
                arr.splice(index + 1, 1)
            } else {
                index++
            }
        }
    }
}

function buildTree(intArray) {
    if (intArray.length < 1) return null
    const sortedArray = mergeSortRemoveDups(intArray)
    const midOfArray = Math.floor(sortedArray.length / 2)
    const leftSide = sortedArray.slice(0, midOfArray)
    const rightSide = sortedArray.slice(midOfArray + 1)
    const root = new Node(sortedArray[midOfArray], leftSide, rightSide)
    root.leftSide = buildTree(leftSide)
    root.rightSide = buildTree(rightSide)
    return root
}

class Node {
    constructor(data, leftSide, rightSide) {
        this.data = data
        this.leftSide = leftSide
        this.rightSide = rightSide
    }
}

class Tree {
    constructor(intArray) {
        this.root = buildTree(intArray)
    }

    remove(value, parent = this.root, curNode = this.root) {
        const emptyLeafs = curNode.rightSide == null && curNode.leftSide == null
        // No Node Found
        if (value != curNode.data && emptyLeafs) return console.log('RUN ERROR: NO NODE FOUND')
        // Recusive calls
        if (value > curNode.data) {
            this.remove(value, curNode, curNode.rightSide)
        } else if (value < curNode.data) {
            this.remove(value, curNode, curNode.leftSide)
        }
        // Case #1 curNode is leaf
        if (value == curNode.data && parent.leftSide == curNode && emptyLeafs) return parent.leftSide = null
        if (value == curNode.data && parent.rightSide == curNode && emptyLeafs) return parent.rightSide = null
        // Case #2 curNode has one branch
        if (value == curNode.data && curNode.rightSide == null && parent.rightSide == curNode) {
            return parent.rightSide = curNode.leftSide
        } else if (value == curNode.data && curNode.rightSide == null && parent.leftSide == curNode) {
            return parent.leftSide = curNode.leftSide
        } else if (value == curNode.data && curNode.leftSide == null && parent.leftSide == curNode) {
            return parent.leftSide = curNode.rightSide
        } else if (value == curNode.data && curNode.leftSide == null && parent.rightSide == curNode) {
            return parent.rightSide = curNode.rightSide
        }
        // Case #3 A node w/ multiple children
        if (value == curNode.data && curNode.rightSide != null && curNode.leftSide != null) {
            function findNextBiggest(node) {
                if (node.leftSide == null) return node
                return findNextBiggest(node.leftSide)
            }
            function parentOfNextBiggest(node) {
                if (node.leftSide == null || node.leftSide.leftSide == null) return node
                return parentOfNextBiggest(node.leftSide)
            }
            const nextNode = findNextBiggest(curNode.rightSide)
            const parentNode = parentOfNextBiggest(curNode.rightSide)
            curNode.data = nextNode.data
            curNode.data == curNode.rightSide.data ? curNode.rightSide = null : null
            parentNode.leftSide == nextNode ? parentNode.leftSide = null : null
        }
    }

    insert(value, root = this.root) {
        const array = this.levelOrder()
        array.push(value)
        this.root = buildTree(array)
        if (root == undefined) return 
        if (root.data < value && root.rightSide == null) {
            return root.rightSide = new Node(value)
        } else if (root.data > value && root.leftSide == null) {
            return root.leftSide = new Node(value)
        }
        root.data < value ? this.insert(value, root.rightSide) : this.insert(value, root.leftSide)
    }

    find(value, node = tree.root) {
        if (node == null) return null 
        if (value > node.data) {
            return this.find(value, node.rightSide)
        } else if (value < node.data) {
            return this.find(value, node.leftSide)
        }
        return value == node.data ? node : null
    }

    levelOrder(cb) {
        let arrayQue = [this.root]
        let breadthOrder = []
        function traversal(currentNode) {
            if (arrayQue.length == 0) return breadthOrder
            if (currentNode.leftSide != null) arrayQue.push(currentNode.leftSide)
            if (currentNode.rightSide != null) arrayQue.push(currentNode.rightSide)
            breadthOrder.push(arrayQue[0].data)
            arrayQue.shift()
            currentNode = arrayQue[0]
            traversal(currentNode)
        }
        traversal(arrayQue[0])
        if (typeof cb == typeof Function) {
            let count = 0
            let results = []
            while (count < breadthOrder.length) {
                results.push(cb(breadthOrder[count]))
                count++
            }
            return results
        } else {
            return breadthOrder
        }
    }

    height() {
        return this.depth(this.levelOrder().pop())
    }

    depth(seekingNode) {
        let depth = 1
        function traversal(traversingNode) {
            if (traversingNode == null || traversingNode.rightSide == null && traversingNode.leftSide == null && traversingNode.data != seekingNode) return depth = null 
            if (traversingNode.data == seekingNode) return
            if (traversingNode.data > seekingNode) {
                depth++
                traversal(traversingNode.leftSide)
            }
            if (traversingNode.data < seekingNode) {
                depth++
                traversal(traversingNode.rightSide)
            }
        }
        traversal(this.root)
        return depth
    }

    inorder(cb) {
        const nodeArray = mergeSortRemoveDups(this.levelOrder())
        if (typeof cb == typeof Function) {
            let count = 0
            let results = []
            while (count < nodeArray.length) {
                results.push(cb(nodeArray[count]))
                count++
            }
            return results
        } else {
            return nodeArray
        }
    }

    preorder(cb) {
        let arrayQue = [this.root]
        let preorder = []
        function traverse(node) {
            if (arrayQue.length == 0) return
            preorder.push(node.data)
            arrayQue.pop()
            if (node.leftSide != null) {
                arrayQue.push(node.leftSide)
                traverse(node.leftSide)
            }
            if (node.rightSide != null) {
                arrayQue.push(node.rightSide)
                traverse(node.rightSide)
            } 
        }
        traverse(arrayQue[0])
        if (typeof cb == typeof Function) {
            let count = 0
            let results = []
            while (count < preorder.length) {
                results.push(cb(preorder[count]))
                count++
            }
            return results
        } else {
            return preorder
        }
    }

    postorder(cb) {
        let postorder = []
        let pathQue = []
        let arrayQue = [this.root]
        function traverseLeft(node) {
            node.rightSide != null ? pathQue.push(node.rightSide) : arrayQue.push(node.rightSide)
            if (node.leftSide != null) traverseLeft(node.leftSide)
            arrayQue.shift()
            if (arrayQue[0] != null) {
                traverseLeft(arrayQue[0])
            }
            postorder.push(node.data)
            if (pathQue.length != 0) {
                arrayQue.push(pathQue[0])
                pathQue.pop()
            }
        }
        traverseLeft(arrayQue[0].leftSide)
        arrayQue = [this.root]
        function traverseRight(node) {
            node.rightSide != null ? pathQue.push(node.rightSide) : arrayQue.push(node.rightSide)
            if (node.leftSide != null) traverseRight(node.leftSide)
            arrayQue.shift()
            if (arrayQue[0] != null) {
                traverseRight(arrayQue[0])
            }
            postorder.push(node.data)
            if (pathQue.length != 0) {
                arrayQue.push(pathQue[0])
                pathQue.pop()
            }
        }
        traverseRight(arrayQue[0].rightSide)
        if (typeof cb == typeof Function) {
            let count = 0
            let results = []
            while (count < postorder.length) {
                results.push(cb(postorder[count]))
                count++
            }
            results.push(this.root.data)
            return results
        } else {
            postorder.push(this.root.data)
            return postorder
        }
    }

    prettyPrint(root, prefix = "", isLeft = true) {
        if (root === undefined) {
            return;
        }
        if (root.rightSide !== null) {
            this.prettyPrint(root.rightSide, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.data}`);
        if (root.leftSide !== null) {
            this.prettyPrint(root.leftSide, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

}

const tree = new Tree([205, 344, 939, 252, 87, 254, 553, 737])
tree.insert(6.5)
tree.insert(12)
tree.remove(10)
tree.remove(344)
tree.prettyPrint(tree.root)
console.log('FIND',tree.find(12))
console.log('LEVEL ORDER',tree.levelOrder(x => x * 1))
console.log('DEPTH',tree.depth(12))
console.log('HEIGHT', tree.height())
console.log('INORDER', tree.inorder(x => x * 1))
console.log('PREORDER', tree.preorder(x => x * 1))
console.log('POSTORDER', tree.postorder(x => x * 1))

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