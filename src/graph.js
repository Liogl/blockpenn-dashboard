import {Show} from "react-admin";
import * as React from "react";
import ForceGraph2D from "react-force-graph-2d";

var data = {
    nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }],
    links: [
        { source: "B", target: "C", value: 8 },
        { source: "C", target: "D", value: 10 },
        { source: "D", target: "A", value: 6 },
        { source: "B", target: "A", value: 6 },
        { source: "B", target: "D", value: 6 },
        { source: "D", target: "D", value: 6, curvature: 0.3 }
    ]
};

export const Graph = (props) => (
    <ForceGraph2D
        graphData={data}
        nodeLabel="id"
        linkCurvature="curvature"
        enablePointerInteraction={true}
        linkDirectionalParticleWidth={1}
    />
);