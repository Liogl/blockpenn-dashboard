import * as React from 'react';
import {
  List,
  Edit,
  Show,
  Datagrid,
  SimpleShowLayout,
  Filter,
  TextField,
  DateField,
  BooleanField,
  Create,
  SimpleForm,
  TextInput,
  required,
  BooleanInput,
  NullableBooleanInput
} from 'react-admin';

const PostFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Address" source="id" />
    <NullableBooleanInput label="Enabled" source="Enabled" />
  </Filter>
);

const postRowStyle = (record, index) => ({
  display: record.Ctime[record.Ctime.length - 1] === ' ' ? 'none' : ''
});

export const SmartContractList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick="show" rowStyle={postRowStyle}>
      <TextField source="id" label="Address" />
      <BooleanField source="Enabled" />
      <DateField source="Ctime" label="Created At" showTime />
      <DateField source="Mtime" label="Update At" showTime />
    </Datagrid>
  </List>
);

export const SmartContractShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" label="Address" />
      <BooleanField source="Enabled" />
      <DateField source="Ctime" showTime />
      <DateField source="Mtime" showTime />
    </SimpleShowLayout>
  </Show>
);

export const SmartContractCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="Address" label="Contract ETH address" validate={[required()]} fullWidth />
      <BooleanInput label="Enabled" source="Enabled" />
    </SimpleForm>
  </Create>
);

export const SmartContractEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="Address" label="Contract ETH address" validate={[required()]} fullWidth />
      <BooleanInput label="Enabled" source="Enabled" />
    </SimpleForm>
  </Edit>
);
