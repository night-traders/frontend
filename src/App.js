import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';
import Layout from './hocs/Layout';
import ForgotPassword from './containers/ForgotPassword';
import SearchResult from './containers/SearchResult'

import { Provider } from 'react-redux';
import store from './store';


const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route path="/forgot-password" component={ForgotPassword} />
                    <Route exact path='/search-result' component={SearchResult} />
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
