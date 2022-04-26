import * as React from 'react';
import {
    Datagrid,
    List,
    TextField,
} from 'react-admin';

export const ManagerContractList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="Address"/>
        </Datagrid>
    </List>
);
