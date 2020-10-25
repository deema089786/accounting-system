import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import { ModalsProvider } from './providers/modals';

import MainPageContainer from './containers/MainPageContainer';
import modals from './components/modals';
import theme from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ModalsProvider initialModals={modals}>
          <Switch>
            <Route path="/" exact>
              <MainPageContainer />
            </Route>
          </Switch>
        </ModalsProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
