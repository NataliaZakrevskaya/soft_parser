import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import '../src/static/css/variables.scss'
import '../src/static/css/reset.scss'
import '../src/static/css/text.scss'

import {App} from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App/>);
