import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import store from './store';
import BasicTable from './components/BasicTable';
import PoolTable from './components/PoolTable';
import NavBar from './components/NavBar';
import { HashRouter as Router, Route, BrowserRouter } from 'react-router-dom';

// so I don't think is where I should load that data but nt sure how to do it with UseEffect
class _App extends Component{
  constructor(){
    super();
    this.state = {};
  }


  //this works fine now need to figure out how to put my data into Material UI table and add search
  render(){
    return (
        <Router>
          {/* <NavBar /> */}
          <div>
            {/* <Route component={ CurrentMonth } path = '/current'  /> */}
            <Route component={ BasicTable } path = '/' exact/>        
            <Route component={ PoolTable } path = '/pools' exact/>          
          </div>
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const App = connect(mapStateToProps, null)(_App);

render(<Provider store = {store}><App /></Provider>, document.querySelector('#root'));
