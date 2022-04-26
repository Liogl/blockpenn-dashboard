import * as React from 'react';
import {
    Datagrid,
    List,
    TextField,
} from 'react-admin';

export const PaymentContractList = (props) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" label="Address"/>
            <TextField source="TokenName" label="Token Name"/>
        </Datagrid>
    </List>
);
