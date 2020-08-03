import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// pages import
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Singin from './pages/Singin';
import FatalError from './pages/FatalError';
import PersonContext from './context/PersonContext';

const persons = [
  { id: 0, name: 'Mark', age: 38 },
  { id: 1, name: 'Hanna', age: 27 },
];

function App() {
  return (
    <ErrorBoundary FallbackComponent={FatalError}>
      <PersonContext.Provider value={persons}>
        <BrowserRouter>
          <Switch>
            <Route path="/signin" component={Singin} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </PersonContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
