import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Contact from './pages/contact';

const useStyles = makeStyles({
  app: {
    display: 'flex',
    margin: '0px auto',
    backgroundColor: '#E5E5E5',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Contact />
    </div>
  );
}

export default App;
