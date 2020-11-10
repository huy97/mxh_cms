import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Layout, Avatar, Row, Col, Menu, Dropdown, Space} from 'antd';
import 'antd/dist/antd.min.css';
import { Helmet } from 'react-helmet';
import {logout} from 'reducers/auth';
import ChangePassword from './ChangePassword';

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiblePassword: false,
        }
    }

    handleClick = (e) => {
        switch(e.key) {
            case "0":
                this.props.dispatch(logout())
                break;
            case "1":
                this.setState({visiblePassword: true});
                break;
            default:
                break;
        }
    }

    toggleChangePassword = () => {
        this.setState({visiblePassword: false});
    }

    notification = () => {
        return (
            <Menu onClick={this.handleClick} style={{minWidth: 200, padding: 5}}>
                <Menu.Item key="1">
                    Đổi mật khẩu
                </Menu.Item>
                <Menu.Item key="0">
                    Đăng xuất
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Mabo79 | Admin Cpanel</title>
                </Helmet>
                <Layout.Header
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: 64,
                        backgroundColor: "#ffffff",
                        boxShadow: "#ddd 0 0 5px",
                        zIndex: 9
                    }}>
                <Row>
                    <Col flex={1}>
                        <div className="manager-logo">
                            <span>Mabo79</span>
                        </div>
                    </Col>
                    <Col>
                        <Space direction="horizontal" size={30}>
                            <Dropdown overlay={this.notification} trigger={['click']} placement="bottomRight" overlayStyle={{position: "fixed"}}>
                                <Avatar
                                    size={35}
                                    style={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf'
                                    }} src={require('../../../assets/avatar_default.png')}/>
                            </Dropdown>
                        </Space>
                    </Col>
                </Row>
                </Layout.Header>
                <ChangePassword 
                    visible={this.state.visiblePassword}
                    onClose={this.toggleChangePassword}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({auth: state.authReducer});

export default connect(mapStateToProps)(Header);
