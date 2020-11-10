import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Space,
    Card,
    Button,
    notification
} from 'antd';
import {FiPlus} from 'react-icons/fi';
import {getSkip} from 'utils';
import Ability from 'containers/Ability';
import {PERMISSION_CODE} from 'constants/global';
import {fetchListRoles, fetchListPermission, deleteRole} from 'services/auth';

const List = React.lazy(() => import ('components/Manager/Role/List'));
const Create = React.lazy(() => import ('components/Manager/Role/Create'));
const Edit = React.lazy(() => import ('components/Manager/Role/Edit'));

export class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showCreate: false,
            showEdit: false,
            editData: {},
            listPermissions: [],
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 100,
                total: 0
            }
        }
    }
    componentDidMount() {
        this.fetchListRoles();
        this.fetchListPermission();
    }

    fetchListRoles = async () => {
        const {pagination} = this.state;
        try {
            const result = await fetchListRoles(
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

    fetchListPermission = async () => {
        try{
            const result = await fetchListPermission();
            let listPermissions = result.data.map((obj) => {
                return {
                    label: obj.permissionCode,
                    value: obj.permissionCode
                }
            })
            this.setState({listPermissions});
        }catch(e){
            //
        }
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListRoles();
    }

    handleToggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        })
    }

    handleCreateSuccess = (item) => {
        let {data, pagination} = this.state;
        data.unshift({
            key: data.length,
            ...item
        });
        pagination.total = pagination.total + 1;
        this.setState({
            data: [...data],
            pagination: {...pagination}
        });
    }

    handleDelete = async (e, item) => {
        let {data} = this.state;
        try {
            await deleteRole(item.roleId);
            let index = data.findIndex((obj) => obj.roleId === item.roleId);
            if (index !== -1) {
                data.splice(index, 1);
                this.setState({
                    data: [...data]
                });
                notification.success({message: 'Xóa quyền thành công'});
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
        let index = data.findIndex((obj) => obj.roleId === item.roleId);
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
        const {data, pagination, showCreate, showEdit, editData, listPermissions} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card
                    title="Danh sách quyền"
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
                        onEdit={this.handleToggleEdit}/>
                    <Create
                        visible={showCreate}
                        listPermissions={listPermissions}
                        onSuccess={this.handleCreateSuccess}
                        onClose={this.handleToggleCreate}/>
                    <Edit
                        visible={showEdit}
                        listPermissions={listPermissions}
                        editData={editData}
                        onSuccess={this.handleEditSuccess}
                        onClose={this.handleToggleEdit}/>
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Role)
