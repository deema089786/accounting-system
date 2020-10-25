import React from 'react';
import Header from './Header';
import useStyles from './styles';

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
