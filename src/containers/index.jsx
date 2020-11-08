import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect, withRouter} from 'react-router-dom';
import {getUserToken, checkRole} from 'utils';
import NotFound from 'containers/NotFound';
import Layout from 'antd/lib/layout';
import { get } from 'lodash';
import LoadingCircle from 'components/LoadingCircle';
import styles from './Container.module.scss';

//Admin component
const ManagerHeader = React.lazy(
    () => import ('components/Manager/Layout/Header')
);
const ManagerSidebar = React.lazy(
    () => import ('components/Manager/Layout/Sidebar')
);
const ManagerBreadcrumb = React.lazy(
    () => import ('components/Manager/Layout/Breadcrumb')
);
//End
//User component
const Sidebar = React.lazy(
    () => import ('components/Layout/Sidebar')
);
const Header = React.lazy(
    () => import ('components/Layout/Header')
);
//End

export class Container extends Component {
    render() {
        const token = getUserToken();
        const {
            children,
            isPrivate,
            isAdmin,
            roles,
            auth: {
                userInfo
            },
            history
        } = this.props;
        const returnUrl = get(history, 'location.pathname', "");
        if (isPrivate && !token) {
            return <Redirect to={`/login?returnUrl=${returnUrl}`}/>;
        }
        if (roles && !checkRole(roles, userInfo.permissions)) {
            return <NotFound/>;
        }
        if (isAdmin) {
            console.log('admin');
            return (
                <div>
                    <Layout>
                        <ManagerSidebar history={history}/>
                        <Layout>
                            <ManagerHeader/>
                            <LoadingCircle/>
                            <Layout
                                style={{
                                    backgroundColor: '#f8f8f8',
                                    padding: 10,
                                    marginLeft: 250,
                                    paddingTop: 64,
                                    minHeight: '100vh'
                                }}>
                                <ManagerBreadcrumb history={history}/>
                                <Layout.Content
                                    style={{
                                        padding: 10
                                    }}>
                                    {children}
                                </Layout.Content>
                            </Layout>
                        </Layout>
                    </Layout>
                </div>
            )
        }
        return (
            <div>
                <Header/>
                <LoadingCircle style={{top: 90}}/>
                <Sidebar history={history}/>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({auth: state.authReducer});

export default withRouter(connect(mapStateToProps)(Container));
