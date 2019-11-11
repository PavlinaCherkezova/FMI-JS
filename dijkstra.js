const __INF__ = 9999999;

class Pair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }

    printMe() {
        console.log('(', this.first, this.second, ')');
    }
}

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjList.has(vertex)) {
            this.adjList.set(vertex, []);
        }
    }

    addEdge(vertex, myPair) {
        if (this.adjList.has(vertex)) {
            let arr = this.adjList.get(vertex);
            arr.push(myPair);

            if (this.adjList.has(myPair.node)) {
                let arr = this.adjList.get(myPair.first);
                let oppPair = new Pair(vertex, myPair.second);
                arr.push(oppPair);
            }
        }
    }

    setStartDistances(startNode) {
        let distances = [];
        let keys = Array.from(this.adjList.keys());
        for (let crr of keys) {
            if (crr === startNode) {
                distances.push(new Pair(crr, 0));
            }
            distances.push(new Pair(crr, __INF__));
        }
        return distances;
    }

    getPairByNode(arr, node) {
        for (let crr of arr) {
            if (crr.first === node) {
                return crr;
            }
        }
    }
    dijkstraAlgorithm(startNode) {
        let distance = this.setStartDistances(startNode);
        let visited = [];
        let path = [];

        let queue = [];
        let crr = startNode;
        let mapIterator = this.adjList.entries();
        while (this.adjList.size > visited.length) {
            queue = this.adjList.get(crr); 
            visited.push(crr.first);

            while (queue.length >= 0) {
                let crrChild = queue[0];
                queue.splice(0, 1);

                if (visited.includes(crrChild.first)) {
                    continue;
                }

                let crrPairDistanceArray = this.getPairByNode(distance, crrChild.first)
                if (crrPairDistanceArray.second > crr.second + crrChild.second) {
                    crrPairDistanceArray.second = crr.second + crrChild.second;
                    path[crrChild.first] = crr.first;
                }
            }
            crr = mapIterator.next();
        }
        return distance;
    }


    print() {
        for (let [key,] of this.adjList) {
            var get_values = this.adjList.get(key);
            console.log(key, '->');
            for (let pair of get_values) {
                pair.printMe();
            }
        }
    }
}


let g = new Graph();
let arr = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < arr.length; i++) {
    g.addVertex(arr[i]);
}
g.addEdge('A', new Pair('B', 2));
g.addEdge('A', new Pair('C', 4));
g.addEdge('B', new Pair('D', 4));
g.addEdge('B', new Pair('E', 2));
g.addEdge('B', new Pair('C', 1));
g.addEdge('D', new Pair('F', 2));
g.addEdge('D', new Pair('E', 3));
g.addEdge('E', new Pair('F', 2));
g.addEdge('C', new Pair('E', 3));

