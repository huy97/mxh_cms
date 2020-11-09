import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Space, Card, notification, Form, Select, Input, Button} from 'antd';
import {getSkip} from 'utils';
import { fetchListUser, toogleLockUser } from 'services/artist';

const List = React.lazy(() => import ('components/Manager/EndUser/List'));

export class Artist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 50,
                total: 0
            }
        }
    }
    componentDidMount() {
        this.fetchListEndUser();
    }

    fetchListEndUser = async () => {
        const {pagination} = this.state;
        try {
            const result = await fetchListUser('', '', pagination.skip, pagination.pageSize);
            let data = result.data.map((obj, index) => {
                return {
                    key: index,
                    ...obj,
                }
            })
            this.setState({data})
        } catch (e) {
            //
        }
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListArtist();
    }

    handleLock = async (e, item, lockStatus) => {
        let {data} = this.state;
        try {
            let msg = lockStatus? "Khóa tài khoản thành công" : "Mở khóa tài khoản thành công";
            let result = await toogleLockUser(item._id, lockStatus);
            let index = data.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                data[index] = {
                    key: index,
                    ...result.data
                }
                this.setState({data: [...data]});
            }
            notification.success({message: msg});
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
        if(index !== -1){
            data[index] = {
                key: index,
                ...item
            }
            this.setState({data: [...data]});
        }
    }

    handleSearch = async ({isLock, keyword}) => {
        let pagination = {
            skip: 0,
            current: 1,
            pageSize: 50,
            total: 0
        }
        this.setState(pagination);
        try {
            const result = await fetchListUser(keyword, isLock, pagination.skip, pagination.pageSize);
            let data = result.data.map((obj, index) => {
                return {
                    key: index,
                    ...obj,
                }
            })
            this.setState({data})
        } catch (e) {
            //
        }
    }

    render() {
        const {data, pagination} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card title="Danh sách người dùng cuối" bordered={false}>
                    <Form
                        initialValues={{
                            isLock: "",
                            keyword: ""
                        }}
                        onFinish={this.handleSearch}
                        layout="inline">
                        <Form.Item name="isLock" label="Trạng thái tài khoản">
                            <Select
                                style={{
                                    width: 100
                                }}>
                                <Select.Option value="">Tất cả</Select.Option>
                                <Select.Option value="0">Khóa</Select.Option>
                                <Select.Option value="1">Mở khóa</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="keyword" label="Từ khoá">
                            <Input style={{width: 250}} placeholder="Nhập tên đăng nhập, tên hiển thị"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" title="Tìm kiếm">Tìm kiếm</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card
                    title="Danh sách người dùng cuối"
                    bordered={false}>
                    <List data={data} pagination={pagination} onPaginate={this.handlePaginate} ocLock={this.handleLock} onEdit={this.handleToggleEdit} />
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Artist)
