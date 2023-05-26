import './components/ExampleComponent';
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css'; // Importowanie pliku CSS
import Navigation from "./components/Navbar.jsx";
import ExampleComponent from './components/ExampleComponent.jsx';

ReactDOM.render(<ExampleComponent />, document.getElementById('example_component'));
ReactDOM.render(<Navigation />, document.getElementById('navbar'));
