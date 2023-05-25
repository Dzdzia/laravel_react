import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
const App = () => {
    return (
     <div className="container mx-auto bg-gray-200 rounded-xl shadow">
         <p className="text-3xl text-gray-700 font-bold mb-5">
             Welcome
         </p>
         <p className="text-gray-500 text-lg">
             React and Tailwind CSS in action
         </p>

     </div>
    );
};



ReactDOM.render(<App />, document.getElementById('app'));

