import {Template} from 'meteor/templating';
import './graph.html';

import cytoscape from 'cytoscape';

Template.Graph.onRendered(function () {
    const graph = this.data.deployment.graph;

    var elements = [];
    const nodes = Object.keys(graph);

    for (const node in nodes) {
        elements.push({data: {id: node}});
        for (const neighbor in graph[node]) {
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
            name: 'grid',
            rows: 1
        }

    });
});
