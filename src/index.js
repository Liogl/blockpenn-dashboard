import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import package_json from './../package.json'

const version = package_json.version

ReactDOM.render(
  <React.StrictMode>
    <App />
    <div style={{
          position: 'fixed', right: 0, bottom: 0, left: 0, zIndex: 100, fontSize: "10px",
          padding: 3,
          backgroundColor: '#efefef',
          textAlign: 'center',
      }}><strong>version: {version}</strong></div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
