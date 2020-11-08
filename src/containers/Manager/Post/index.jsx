import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchListPost, deleteCategory} from 'services/category';
import {Space, Card, notification} from 'antd';
import {getSkip} from 'utils';

const List = React.lazy(() => import ('components/Manager/Post/List'));
const Create = React.lazy(() => import ('components/Manager/Post/Create'));
const Edit = React.lazy(() => import ('components/Manager/Post/Edit'));

export class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showCreate: false,
            showEdit: false,
            editData: {},
            pagination: {
                skip: 0,
                current: 1,
                pageSize: 20,
                total: 0
            }
        }
    }
    componentDidMount() {
        this.fetchListPost();
    }

    fetchListPost = async () => {
        try {
            const {pagination} = this.state;
            const result = await fetchListPost(pagination.skip, pagination.pageSize);
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
        this.fetchListCategory();
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
        this.setState({data: [...data]});
    }

    handleDelete = async (e, item) => {
        let {data} = this.state;
        try {
            await deleteCategory(item._id);
            let index = data.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                data.splice(index, 1);
                this.setState({
                    data: [...data]
                });
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
        if(index !== -1){
            data[index] = {
                key: index,
                ...item
            }
            this.setState({data: [...data]});
        }
    }

    render() {
        const {data, pagination, showCreate, showEdit, editData} = this.state;
        return (
            <Space
                direction={"vertical"}
                style={{
                    width: "100%",
                    display: "flex"
                }}>
                <Card
                    title="Danh sách bài viết"
                    bordered={false}>
                    <List data={data} pagination={pagination} onPaginate={this.handlePaginate} onDelete={this.handleDelete} onEdit={this.handleToggleEdit} />
                    <Create visible={showCreate} onSuccess={this.handleCreateSuccess} onClose={this.handleToggleCreate} />
                    <Edit visible={showEdit} editData={editData} onSuccess={this.handleEditSuccess} onClose={this.handleToggleEdit}/>
                </Card>
            </Space>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Category)
