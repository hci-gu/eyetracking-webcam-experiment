import React from 'react'
import { RecoilRoot } from 'recoil'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import App from './App'
import Client from './Client'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/client/:id">
            <Client />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
)
