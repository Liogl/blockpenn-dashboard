import * as React from 'react';
import {
  Show,
  List,
  Datagrid,
  Filter,
  TextField,
  DateField,
  TabbedShowLayout,
  Tab,
  ReferenceManyField,
  SimpleForm,
  TextInput,
  required,
  Edit
} from 'react-admin';
import { TimeText, truncateString } from './utils';

const PublicKeyField = ({ record = {} }) => <span>{truncateString(record.id, 10)}</span>;
PublicKeyField.defaultProps = { label: 'Public Key' };

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput resource="nodes" label="Address" source="Address" />
    <TextInput source="Type" label="Type" />
    <TextInput label="Tags" source="Tags" />
    <TextInput label="Version" source="AppVersion" />
  </Filter>
);

const postRowStyle = (record, index) => ({
  display: record.Ctime[record.Ctime.length - 1] === ' ' ? 'none' : ''
});

export const NodeList = (props) => (
  <List {...props} title="List of nodes" sort={{ field: 'LastActiveAt', order: 'DESC' }} ilters={<PostFilter />}>
    <Datagrid rowClick="show" rowStyle={postRowStyle}>
      <TextField source="Address" label="Address" />
      <TextField source="Type" label="Type" />
      <TextField source="Tags" label="Tags" />
      <TextField source="AppVersion" label="Version" />
      <TimeText source="LastActiveAt" label="Active At" />
      <TimeText source="Ctime" label="Created At" />
    </Datagrid>
  </List>
);

const NodeShowTitle = ({ record }) => {
  return <span>Node {record ? `${record.Address}` : ''}</span>;
};

export const NodeShow = (props) => (
  <Show title={<NodeShowTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="summary">
        <TextField source="id" label="Public Key" />
        <TextField source="Address" label="Address" />
        <TextField source="Type" label="Type" />
        <TextField source="Tags" label="Tags" />
        <TextField source="AppVersion" label="Version" />
        <DateField source="LastActiveAt" label="Active At" showTime />
        <DateField source="Ctime" label="Created At" showTime />
        <DateField source="Mtime" label="Update At" showTime />
      </Tab>
      <Tab label="sensors" path="sensors">
        <ReferenceManyField reference="sensors" target="NodePublicKey" addLabel={false}>
          <Datagrid>
            <TextField source="id" />
            <TextField source="Type" />
            <DateField source="Ctime" label="Created At" showTime />
            <DateField source="Mtime" label="Update At" showTime />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export const NodeEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="id" label="Public Key" validate={[required()]} fullWidth />
      <TextInput source="Tags" label="Tags" fullWidth />
    </SimpleForm>
  </Edit>
);
