import React from 'react';
import { Route, Switch } from 'react-router-dom';
import adminRoutes from 'routes/admin';

const Login = React.lazy(() => import('containers/Login'));
const Container = React.lazy(() => import('containers'));
const NotFound = React.lazy(() => import('containers/NotFound'));

const RouterManager = (props) => {
    return (
        <Switch>
            {
                [...adminRoutes].map(({component: Component, isPrivate, roles, path, isAdmin}, key) => {
                    return (
                        <Route key={key} exact path={path}>
                            <Container isPrivate={isPrivate} isAdmin={isAdmin} roles={roles}>
                                <Component/>
                            </Container>
                        </Route>
                    )
                })
            }
            <Route path="/login" component={Login} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default RouterManager;
