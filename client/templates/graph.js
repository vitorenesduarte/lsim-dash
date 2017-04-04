import {Template} from 'meteor/templating';
import './graph.html';

import cytoscape from 'cytoscape';

Template.Graph.onRendered(function () {
    const graph = this.data.deployment.graph;

    console.log(graph);

    var elements = [];
    const nodes = Object.keys(graph);

    for (var i = 0; i < nodes.length; i++) {

        const node = nodes[i];
        const neighbors = graph[node];

        console.log(node, neighbors);

        for (var j = 0; j < neighbors.length; j++){

            const neighbor = neighbors[i];

            console.log(neighbor);

            elements.push({
                data: {
                    id: node + neighbor,
                    source: node,
                    target: neighbor
                }
            });
        }
    }

    console.log(elements);

    var cy = cytoscape({

        container: document.getElementById('cy'), // container to render in

        elements: elements,

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],

        layout: {
            name: 'grid',
            rows: 1
        }

    });
});
