function mergeSort(arr) {
if(arr.length < 2) return arr;

  let mid= Math.floor(arr.length / 2); 
  let izq = arr.slice(0,mid);// With the slice() method we make a copy of a part of the array indicating the beginning and the end
  let der = array.slice(mid);// if it receives a single parameter, it cuts from there to the end
  arr = [];  // we reuse the original array as temporary storage space
  
  left = mergeSort(left);  // Within the variable "left" we call the function recursively
  right= mergeSort(right); // Within the variable "right" we call the function recursively
  
  while(left.length && right.length){ // As long as there are elements in the arrays we make the comparisons                                
    if(left[0] < right[0]){           
      arr.push(left.shift())
    }
    else{
      arr.push(right.shift());
    }
  }
  
  return arr.concat(left,right);  // We return the two arrays ordered and concatenated
   
}

function mergeSortRemoveDups(arr) {
    arr = mergeSort(arr)
    let index = 0
    while (index < arr.length-1) { // We correct the limits of the index
        if (arr[index] === arr[index + 1]) { //We modify the if block so that it does not make comparisons outside the range of the array
            arr.splice(index + 1, 1);
        } else {
            index++;
        }
    }
    return arr;
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
        return value == node.data ? node : console.log('RUN ERROR: NO NODE FOUND')
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
            if (arrayQue[0] != null) traverseLeft(arrayQue[0])
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

    rebalance() {
        const array = this.levelOrder()
        this.root = buildTree(array)
    }

    isBalanced() {
        let heights = []
        function traverse(node) {
            if (node.leftSide != null) traverse(node.leftSide)
            if (node.rightSide != null) traverse(node.rightSide)
            node.rightSide == null && node.leftSide == null ? heights.push(tree.depth(node.data)) : null
        }
        traverse(this.root)
        let count = 0
        let smallArray = []
        while (count < heights.length) {
            if (!smallArray.includes(heights[count])) smallArray.push(heights[count])
            count++
        }
        if (smallArray[0] + 1 == smallArray[1]) {
            return true
        } else if (smallArray[0] == smallArray[1] + 1) {
            return true
        } else if (smallArray[0] == smallArray[1]) {
            return true
        } else if (smallArray.length == 1) {
            return true
        } else {
            return false
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

let intArray = []
function generateIntArray() {
    let count = 0
    while (count < 10) {
        intArray.push(Math.floor(Math.random() * 100))
        count++
    }
}
generateIntArray()

const tree = new Tree(intArray)
tree.prettyPrint(tree.root)
console.log(tree.isBalanced())
console.log('LEVEL ORDER',tree.levelOrder(x => x * 1))
console.log('PREORDER', tree.preorder(x => x * 1))
console.log('INORDER', tree.inorder(x => x * 1))
console.log('POSTORDER', tree.postorder(x => x * 1))
tree.insert(6.5)
tree.insert(12)
console.log(tree.isBalanced())
tree.rebalance()
console.log(tree.isBalanced())
tree.prettyPrint(tree.root)
