import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Client/Root';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);

// root.render(
//  <Root />,
//   document.getElementById('root')
// );

// const rootNode = document.getElementById('root');

// ReactDOM.createRoot(rootNode).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
