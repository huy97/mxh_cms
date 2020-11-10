import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Space,
    Form,
    Card,
    Button,
    notification,
    Input
} from 'antd';
import {FiPlus} from 'react-icons/fi';
import {getSkip} from 'utils';
import Ability from 'containers/Ability';
import {PERMISSION_CODE} from 'constants/global';
import {fetchListUser, deleteUser, fetchListRoles} from 'services/auth';

const List = React.lazy(() => import ('components/Manager/User/List'));
const Create = React.lazy(() => import ('components/Manager/User/Create'));
const Edit = React.lazy(() => import ('components/Manager/User/Edit'));
const UpdateRole = React.lazy(() => import ('components/Manager/User/UpdateRole'));

export class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVip: "",
            keyword: "",
            data: [],
            showCreate: false,
            showEdit: false,
            showUpdateRole: false,
            editData: {},
            listRoles: [],
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 100,
                total: 0
            }
        }
    }
    componentDidMount() {
        this.fetchListUser();
        this.fetchRole();
    }

    fetchListUser = async () => {
        const {keyword, pagination} = this.state;
        try {
            const result = await fetchListUser(
                keyword,
                pagination.skip,
                pagination.pageSize
            );
            let data = result
                .data
                .map((obj, index) => {
                    return {
                        key: index,
                        ...obj
                    }
                });
            pagination.total = result.total;
            this.setState({data, pagination});
        } catch (e) {
            //
        }
    }

    fetchRole = async () => {
        try{
            const result = await fetchListRoles();
            let listRoles = result.data.map((obj) => {
                return {
                    label: obj.description,
                    value: obj.roleId
                }
            })
            this.setState({listRoles: listRoles});
        }catch(e){
            //
        }
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListUser();
    }

    handleToggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleCreateSuccess = (item) => {
        let {data} = this.state;
        data.unshift({
            key: data.length,
            ...item
        });
        this.setState({
            data: [...data]
        });
    }

    handleDelete = async (e, item) => {
        let {data} = this.state;
        try {
            await deleteUser(item._id);
            let index = data.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                data.splice(index, 1);
                this.setState({
                    data: [...data]
                });
                notification.success({message: 'Xóa tài khoản thành công'});
            }
        } catch (e) {
            notification.error({message: e.message});
        }
    }

    handleToggleEdit = (e, item) => {
        this.setState({
            showEdit: !this.state.showEdit,
            editData: item || {}
        });
    }

    handleEditSuccess = (item) => {
        let {data} = this.state;
        let index = data.findIndex((obj) => obj._id === item._id);
        if (index !== -1) {
            data[index] = {
                key: index,
                ...item
            }
            this.setState({
                data: [...data]
            });
        }
    }

    handleSearch = ({keyword, isVip}) => {
        const {pagination} = this.state;
        pagination.skip = 0;
        pagination.current = 1;
        this.setState({keyword, isVip, pagination});
        this.fetchListUser();
    }

    handleToggleUpdateRole = (e, item) => {
        this.setState({showUpdateRole: !this.state.showUpdateRole, editData: item || {}});
    }

    handleUpdateRoleOk = async (item) => {
        let {data} = this.state;
        let index = data.findIndex((obj) => obj._id === item._id);
        if (index !== -1) {
            data[index] = {
                key: index,
                ...item
            }
            this.setState({
                data: [...data]
            });
        }
    }

    render() {
        const {data, pagination, showCreate, showEdit, showUpdateRole, editData, listRoles} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card title="Danh sách tài khoản hệ thống" bordered={false}>
                    <Form
                        initialValues={{
                            isVip: "",
                            keyword: ""
                        }}
                        onFinish={this.handleSearch}
                        layout="inline">
                        {/* <Form.Item name="isVip" label="Loại tài khoản">
                            <Select
                                style={{
                                    width: 100
                                }}>
                                <Select.Option value="">Tất cả</Select.Option>
                                <Select.Option value="0">Thường</Select.Option>
                                <Select.Option value="1">VIP</Select.Option>
                            </Select>
                        </Form.Item> */}
                        <Form.Item name="keyword" label="Từ khoá">
                            <Input placeholder="Nhập tên đăng nhập, tên hiển thị"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" title="Tìm kiếm">Tìm kiếm</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card
                    title="Danh sách tài khoản hệ thống"
                    bordered={false}
                    extra={<Ability roles = {
                        [PERMISSION_CODE.MANAGER]
                    } > <Button
                        type="primary"
                        icon={<FiPlus className = "menu-icon" />}
                        onClick={this.handleToggleCreate}>Thêm mới</Button>
                </Ability>}>
                    <List
                        data={data}
                        pagination={pagination}
                        onPaginate={this.handlePaginate}
                        onDelete={this.handleDelete}
                        onEdit={this.handleToggleEdit}
                        onUpdateRole={this.handleToggleUpdateRole}
                        />
                    <Create
                        visible={showCreate}
                        onSuccess={this.handleCreateSuccess}
                        onClose={this.handleToggleCreate}
                    />
                    <Edit
                        visible={showEdit}
                        editData={editData}
                        onSuccess={this.handleEditSuccess}
                        onClose={this.handleToggleEdit}/>
                    <UpdateRole
                        visible={showUpdateRole}
                        listRoles={listRoles}
                        editData={editData}
                        onOk={this.handleUpdateRoleOk}
                        onCancel={this.handleToggleUpdateRole}
                    />
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(User)
