import * as React from 'react';
import { List, Datagrid, TextField, DateField, Show, SimpleShowLayout, Filter, TextInput } from 'react-admin';
import { Link } from 'react-router-dom';
import { truncateString } from './utils';
import Button from '@material-ui/core/Button';

const NodePublicKeyField = ({ record = {} }) => {
  return (
    <Button
      color="primary"
      component={Link}
      to={{
        pathname: '/nodes/' + record.NodePublicKey + '/show'
      }}
    >
      Node: {truncateString(record.NodePublicKey, 30)}
    </Button>
  );
};

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="ID" source="id" />
    <TextInput label="Type" source="Type" />
  </Filter>
);

NodePublicKeyField.defaultProps = { label: 'Node PublicKey' };

const postRowStyle = (record, index) => ({
  display: record.Ctime[record.Ctime.length - 1] === ' ' ? 'none' : ''
});

export const SensorList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick="show" rowStyle={postRowStyle}>
      <TextField source="id" />
      <TextField source="Type" />
      <DateField source="Ctime" label="Created At" showTime />
      <DateField source="Mtime" label="Update At" showTime />
    </Datagrid>
  </List>
);

export const SensorShow = (props) => {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="id" label="ID" />
        <NodePublicKeyField source="NodePublicKey" />
        <TextField source="Type" />
        <DateField source="Ctime" label="Created At" showTime />
        <DateField source="Mtime" label="Update At" showTime />
      </SimpleShowLayout>
    </Show>
  );
};
