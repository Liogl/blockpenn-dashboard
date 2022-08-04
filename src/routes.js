import * as React from 'react';
import { Route } from 'react-router-dom';
import { Graph } from './graph';

export default [
    <Route exact path="/graph" render={() => <Graph />} />,
];
