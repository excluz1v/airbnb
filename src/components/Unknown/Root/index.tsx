import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useUser } from 'reactfire';
import AuthenticatedLayout from '../AuthenticatedLayout';
import GuestLayout from '../GuestLayout';
import HomeMenu from '../HomeMenu';
import NotFoundScreen from '../NotFoundScreen';
import Flats from '../../Flats';
import Login from '../../Auth/Login';
import SignUp from '../../Auth/SignUp';

const Root: React.FC = () => {
  const {
    data: user,
    // hasEmitted,
    firstValuePromise,
  } = useUser();
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const isLogged = !!user;
  useEffect(() => {
    firstValuePromise.then(() => setIsUserLoaded(true));
  }, [firstValuePromise, setIsUserLoaded]);

  // doesn't always work, but suddenly works when subscribing to `firstValuePromise`
  // thus we use `isUserLoaded` below
  // if (!hasEmitted) {
  //   return null;
  // }
  if (!isUserLoaded) {
    return null;
  }

  if (isLogged) {
    return (
      <AuthenticatedLayout>
        <Switch>
          <Route exact path="/" component={HomeMenu} />
          <Route exact path="/flats" component={Flats} />
          <Route path="/flats/:id" component={Flats} />
          <Route exact path="/login" component={() => <Redirect to="/" />} />
          <Route exact path="/register" component={() => <Redirect to="/" />} />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </AuthenticatedLayout>
    );
  }

  return (
    <GuestLayout>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
        <Redirect from="*" to="/login" />
      </Switch>
    </GuestLayout>
  );
};

export default Root;
