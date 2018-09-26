import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'react-gh-like-diff/lib/diff2html.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
