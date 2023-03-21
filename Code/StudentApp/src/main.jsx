import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';

// import App from './App'
import StudentsApp from '@/components/StudentsApp'
import './index.css'
import App from '@/App'
import { StudentProvider } from '@/context/StudentContext'
import SimpleApp from '@/components/SimpleApp'

/*
const students = [
  { notes: [12, 11, 10], name: "Alan" },
  { notes: [18, 10, 19], name: "Alice" },
  { notes: [10, 9, 11], name: "Bernard" },
  { notes: [11, 17, 19], name: "Sophie" },
];
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
        <StudentProvider>
            <SimpleApp />
        </StudentProvider>
    </Router>
  </React.StrictMode>,
)
