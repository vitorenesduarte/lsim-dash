import {Template} from 'meteor/templating';
import './graph.html';

import cytoscape from 'cytoscape';

Template.Graph.onRendered(function () {
    const graph = this.data.deployment.graph;

    var elements = [];
    const nodes = Object.keys(graph);

    for (var i = 0; i < nodes.length; i++) {

        const node = nodes[i];
        const neighbors = graph[node];

        elements.push({
            data: {
                id: node
            }
        });

        for (var j = 0; j < neighbors.length; j++) {

            const neighbor = neighbors[j];

            elements.push({
                data: {
                    id: node + neighbor,
                    source: node,
                    target: neighbor
                }
            });
        }
    }

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
            name: 'cose',

            // Called on `layoutready`
            ready: function () {
            },

            // Called on `layoutstop`
            stop: function () {
            },

            // Whether to animate while running the layout
            animate: true,

            // The layout animates only after this many milliseconds
            // (prevents flashing on fast runs)
            animationThreshold: 250,

            // Number of iterations between consecutive screen positions update
            // (0 -> only updated on the end)
            refresh: 20,

            // Whether to fit the network view after when done
            fit: true,

            // Padding on fit
            padding: 30,

            // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            boundingBox: undefined,

            // Randomize the initial positions of the nodes (true) or use existing positions (false)
            randomize: false,

            // Extra spacing between components in non-compound graphs
            componentSpacing: 100,

            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: function (node) {
                return 400000;
            },

            // Node repulsion (overlapping) multiplier
            nodeOverlap: 10,

            // Ideal edge (non nested) length
            idealEdgeLength: function (edge) {
                return 10;
            },

            // Divisor to compute edge forces
            edgeElasticity: function (edge) {
                return 100;
            },

            // Nesting factor (multiplier) to compute ideal edge length for nested edges
            nestingFactor: 5,

            // Gravity force (constant)
            gravity: 80,

            // Maximum number of iterations to perform
            numIter: 1000,

            // Initial temperature (maximum node displacement)
            initialTemp: 200,

            // Cooling factor (how the temperature is reduced between consecutive iterations
            coolingFactor: 0.95,

            // Lower temperature threshold (below this point the layout will end)
            minTemp: 1.0,

            // Whether to use threading to speed up the layout
            useMultitasking: true
        }
    });
});
