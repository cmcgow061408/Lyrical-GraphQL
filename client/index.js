import './style/style.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,Switch} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import ApolloClient from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import SongList from './components/SongList';
import SongCreate from "./components/SongCreate";
import SongDetail from './components/SongDetail';
import AuthApp from './components/AuthApp';
import Auth from './auth/Auth';

const history = createHashHistory();

const client = new ApolloClient({
    dataIdFromObject: o => o.id
});

const auth = new Auth();

const handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
        auth.handleAuthentication();
    }
}

const Root = () => {
  return (
      <ApolloProvider client={client}>
          <div className="container">
              <Router history={history}>
                  <Switch>
                      <Route exact path="/songs" component={SongList}/>
                      <Route exact path="/songs/new" component={SongCreate}/>
                      <Route exact path="/songs/:id" component={SongDetail}/>
                      <Route exact path="/" render={(props) => <AuthApp auth={auth} {...props} />} />
                  </Switch>
              </Router>
          </div>
      </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
