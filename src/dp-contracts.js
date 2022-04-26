import * as React from 'react';
import {
  List,
  Edit,
  Show,
  Datagrid,
  SimpleShowLayout,
  Filter,
  TextField,
  BooleanField,
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

export const DPContractList = (props) => (
  <List {...props} filters={<PostFilter />}>
    <Datagrid rowClick="show">
      <TextField source="id" label="Address" />
      <TextField source="PaymentContract" label="BLPToken" />
      <BooleanField source="Enabled" />
    </Datagrid>
  </List>
);

export const DPContractShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" label="Address" />
        <TextField source="PaymentContract" label="PaymentContract" />
      <BooleanField source="Enabled" />
    </SimpleShowLayout>
  </Show>
);


export const DPContractEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput disabled source="Address" label="Contract ETH address" validate={[required()]} fullWidth />
      <TextField disabled source="PaymentContract" label="PaymentContract" />
      <BooleanInput label="Enabled" source="Enabled" />
    </SimpleForm>
  </Edit>
);
