import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './Landing'
import ProjectContainer from '../Project/ProjectContainer'
import CouldDoContainer from '../CouldDo/CouldDoContainer'
import pg from 'pg'
import session from 'express-session'
import pgSession from 'connect-pg-simple' //({'session':session})

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={ Landing } />
      <Route path='/project' component={ ProjectContainer } />
      <Route path='/could-do' component={ CouldDoContainer } />
    </div>
  </Router>
)

export default App
