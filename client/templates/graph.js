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
            name: 'breadthfirst',

            fit: true, // whether to fit the viewport to the graph
            directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 30, // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            roots: undefined, // the roots of the trees
            maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled
            ready: undefined, // callback on layoutready
            stop: undefined // callback on layoutstop
        }
    });
});
