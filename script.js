class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
            node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(value) {
        return this.searchNode(this.root, value);
    }

    searchNode(node, value) {
        if (!node) return false;
        if (value === node.value) return true;
        return value < node.value
            ? this.searchNode(node.left, value)
            : this.searchNode(node.right, value);
    }

    inOrder() {
        const result = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    inOrderTraversal(node, result) {
        if (node) {
            this.inOrderTraversal(node.left, result);
            result.push(node.value);
            this.inOrderTraversal(node.right, result);
        }
    }

    preOrder() {
        const result = [];
        this.preOrderTraversal(this.root, result);
        return result;
    }

    preOrderTraversal(node, result) {
        if (node) {
            result.push(node.value);
            this.preOrderTraversal(node.left, result);
            this.preOrderTraversal(node.right, result);
        }
    }

    postOrder() {
        const result = [];
        this.postOrderTraversal(this.root, result);
        return result;
    }

    postOrderTraversal(node, result) {
        if (node) {
            this.postOrderTraversal(node.left, result);
            this.postOrderTraversal(node.right, result);
            result.push(node.value);
        }
    }
}

let bst = new BinarySearchTree();

function startSearch() {
    document.getElementById('search-screen').classList.remove('active');
    document.getElementById('loading-screen').classList.add('active');

    let percentage = 0;
    const loadingInterval = setInterval(() => {
        percentage += 1;
        document.getElementById('loading-text').textContent = `${percentage}%`;

        if (percentage === 100) {
            clearInterval(loadingInterval);
            showResults();
        }
    }, 10);
}

function showResults() {
    const input = document.getElementById('searchInput').value;
    const result = bst.search(Number(input));
    document.getElementById('searchResult').textContent = result ? 'Encontrado' : 'No encontrado';

    document.getElementById('loading-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
}

function displayInOrder() {
    const result = bst.inOrder();
    document.getElementById('traversalResult').textContent = 'Inorden: ' + result.join(', ');
}

function displayPreOrder() {
    const result = bst.preOrder();
    document.getElementById('traversalResult').textContent = 'Preorden: ' + result.join(', ');
}

function displayPostOrder() {
    const result = bst.postOrder();
    document.getElementById('traversalResult').textContent = 'Postorden: ' + result.join(', ');
}

function goBack() {
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('search-screen').classList.add('active');
    
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResult').textContent = '';
    document.getElementById('traversalResult').textContent = '';
}

function showTreeModal() {
    document.getElementById('tree-modal').style.display = 'block';
}

function closeTreeModal() {
    document.getElementById('tree-modal').style.display = 'none';
    document.getElementById('error-message').textContent = '';
}

function validateBST(values) {
    return (
        values.root != null &&
        (values.left == null || values.left < values.root) &&
        (values.right == null || values.right > values.root) &&
        (values.leftLeft == null || values.leftLeft < values.left) &&
        (values.leftRight == null || values.leftRight > values.left) &&
        (values.rightLeft == null || values.rightLeft < values.right) &&
        (values.rightRight == null || values.rightRight > values.right)
    );
}

function saveTree() {
    const values = {
        root: parseInt(document.getElementById('node-root').value) || null,
        left: parseInt(document.getElementById('node-left').value) || null,
        right: parseInt(document.getElementById('node-right').value) || null,
        leftLeft: parseInt(document.getElementById('node-left-left').value) || null,
        leftRight: parseInt(document.getElementById('node-left-right').value) || null,
        rightLeft: parseInt(document.getElementById('node-right-left').value) || null,
        rightRight: parseInt(document.getElementById('node-right-right').value) || null,
    };

    if (!validateBST(values)) {
        document.getElementById('error-message').textContent = 'Requisitos no cumplidos: Lado izquierdo tiene que ser menor y el derecho mayor.';
        return;
    }

    bst = new BinarySearchTree();

    if (values.root != null) bst.insert(values.root);
    if (values.left != null) bst.insert(values.left);
    if (values.right != null) bst.insert(values.right);
    if (values.leftLeft != null) bst.insert(values.leftLeft);
    if (values.leftRight != null) bst.insert(values.leftRight);
    if (values.rightLeft != null) bst.insert(values.rightLeft);
    if (values.rightRight != null) bst.insert(values.rightRight);

    document.getElementById('error-message').textContent = '';
    drawTree();
}

function drawTree() {
    const canvas = document.getElementById('treeCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const rootX = canvas.width / 2;
    const rootY = 50;
    const nodeGap = 50;

    function drawNode(node, x, y, offset) {
        if (!node) return;

        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#676145';
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.value, x, y);

        if (node.left) {
            ctx.beginPath();
            ctx.moveTo(x, y + 20);
            ctx.lineTo(x - offset, y + nodeGap);
            ctx.stroke();
            drawNode(node.left, x - offset, y + nodeGap, offset / 2);
        }
        if (node.right) {
            ctx.beginPath();
            ctx.moveTo(x, y + 20);
            ctx.lineTo(x + offset, y + nodeGap);
            ctx.stroke();
            drawNode(node.right, x + offset, y + nodeGap, offset / 2);
        }
    }

    drawNode(bst.root, rootX, rootY, rootX / 2);
}
