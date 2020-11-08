import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Space, Card, notification} from 'antd';
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
                pageSize: 100,
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
            const result = await fetchListUser('', pagination.skip, pagination.pageSize);
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

    render() {
        const {data, pagination} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card
                    title="Danh sách người dùng cuối"
                    bordered={false}>
                    <List data={data} pagination={pagination} onPaginate={this.handlePaginate} ocLock={this.handleLock} onEdit={this.handleToggleEdit} />
                    {/* <Create visible={showCreate} onSuccess={this.handleCreateSuccess} onClose={this.handleToggleCreate} /> */}
                    {/* <Edit visible={showEdit} editData={editData} onSuccess={this.handleEditSuccess} onClose={this.handleToggleEdit}/> */}
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Artist)
