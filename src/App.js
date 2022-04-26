import * as React from 'react';
import { Admin, Resource, fetchUtils } from 'react-admin';
import restDataProvider from 'ra-data-rest-client';
import Person from '@material-ui/icons/Person';
import Unarchive from '@material-ui/icons/Unarchive';
import Assignment from '@material-ui/icons/Assignment';
import moment from 'moment';
import { NodeEdit, NodeList, NodeShow } from './nodes';
import { SensorList, SensorShow } from './sensors';
import { DPContractEdit, DPContractList, DPContractShow } from './dp-contracts';
import { PaymentContractList } from './payment-contracts';
import { ManagerContractList } from './manager-contracts';
import { Dashboard } from './dashboard';
import authProvider from './authProvider';
import { apiURL } from './const';

moment.defaultFormat = 'YYYY-MM-DDTHH:mm:ss[Z]';

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const dataModifier = (row, property, filterTerm) => {
  if (row[property] && row[property].toLowerCase().includes(filterTerm.toLowerCase())) {
    return null;
  }
  return  row;
};

const filterData = (row, index, fullArray) => {
  let filtered = row;
  // const $address = document.getElementById('Address');
  // if ($address) {
  //   return dataModifier(row, 'Address', $address.value);
  //   if (filtered.Ctime[filtered.Ctime.length - 1] === ' ') return filtered;
  // }
  const $type = document.getElementById('Type');
  if ($type) {
    filtered = dataModifier(row, 'Type', $type.value);
    if (filtered.Ctime[filtered.Ctime.length - 1] === ' ') return filtered;
  }
  const $tags = document.getElementById('Tags');
  if ($tags) {
    filtered = dataModifier(row, 'Tags', $tags.value);
    if (filtered.Ctime[filtered.Ctime.length - 1] === ' ') return filtered;
  }
  const $id = document.getElementById('id');
  if ($id) {
    filtered = dataModifier(row, 'id', $id.value);
    if (filtered.Ctime[filtered.Ctime.length - 1] === ' ') return filtered;
  }
  const $enabled = document.getElementById('Enabled');
  if ($enabled) {
    filtered.Ctime += ' ';
    const text = $enabled.textContent;
    if ((text === 'Yes') === filtered.Enabled) {
      filtered.Ctime -= ' ';
    }
    if (text !== 'Yes' && text !== 'No') {
      filtered.Ctime -= ' ';
    }
  }
  const $version = document.getElementById('AppVersion');
  if ($version) {
    filtered = dataModifier(row, 'AppVersion', $version.value);
    if (filtered.Ctime[filtered.Ctime.length - 1] === ' ') return filtered;
  }

  return filtered;
};
/*
 - Need to find a way to return an empty entry (omit)
 - Need to find a way to pass in arguments from the frontend
 -
*/

const dataProvider = restDataProvider(
    apiURL(),
    {
      nodes: 'PublicKey',
      sensors: 'ID',
      'active-sensors': 'ID',
      'trx-rates': 'Time',
    },
    {},
    // { nodes: filterData, sensors: filterData, 'active-sensors': filterData },
    httpClient
);
// authProvider={authProvider}

const App = () => (
    <Admin
        disableTelemetry
        dataProvider={dataProvider}
        dashboard={Dashboard}
        title="BlockPenn - Dashboard"
        authProvider={authProvider}
    >
      <Resource name="nodes" list={NodeList} show={NodeShow} edit={NodeEdit} options={{ label: 'Nodes' }} icon={Person} />
      <Resource name="sensors" list={SensorList} show={SensorShow} options={{ label: 'All sensors' }} icon={Unarchive} />
      <Resource
          name="active-sensors"
          list={SensorList}
          show={SensorShow}
          options={{ label: 'Active sensors' }}
          icon={Unarchive}
      />
      <Resource
          name="manager-contracts"
          list={ManagerContractList}
          options={{ label: 'Manager Contracts' }}
          icon={Assignment}
      />
      <Resource
          name="dp-contracts"
          list={DPContractList}
          show={DPContractShow}
          edit={DPContractEdit}
          options={{ label: 'DP Contracts' }}
          icon={Assignment}
      />
      <Resource
          name="payment-contracts"
          list={PaymentContractList}
          options={{ label: 'Payment Contracts' }}
          icon={Assignment}
      />
    </Admin>
);

export default App;