import React, {Component} from 'react'
import {
    Card,
    Button,
    notification,
    Space,
    Row, 
    Col, 
} from 'antd'
import {SONG_STATUS, PERMISSION_CODE} from 'constants/global';
import {fetchListVesion, deleteVersion} from 'services/version';
import {FiPlus} from 'react-icons/fi';
import {getSkip} from 'utils';
import Ability from 'containers/Ability';

const List = React.lazy(() => import('components/Manager/Version/List'));
const Create = React.lazy(() => import('components/Manager/Version/Create'));
const Edit = React.lazy(() => import('components/Manager/Version/Edit'));

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: SONG_STATUS.ACTIVE,
            isOfficial: "",
            keyword: "",
            showCreate: false,
            showEdit: false,
            editData: {},
            artists: [],
            categories: [],
            paginationAndroid: {
                skip: 0,
                current: 1,
                pageSize: 50,
                total: 0
            },
            paginationIos: {
                skip: 0,
                current: 1,
                pageSize: 50,
                total: 0
            },
            verAndroid: [],
            verIos: []
        }
    }

    componentDidMount() {
        this.fetchAndroid();
        this.fetchIos();
    }

    fetchAndroid = async () => {
        const {paginationAndroid} = this.state;
        try {
            const result = await fetchListVesion(
                1,
                paginationAndroid.skip,
                paginationAndroid.pageSize
            );
            let data = result.data.map((obj, index) => {
                    return {
                        key: index,
                        ...obj
                    }
                });
            paginationAndroid.total = result.total;
            this.setState({verAndroid: data, paginationAndroid});
        } catch (e) {
            //
        }
    }

    fetchIos = async () => {
        const {paginationIos} = this.state;
        try {
            const result = await fetchListVesion(
                2,
                paginationIos.skip,
                paginationIos.pageSize
            );
            let data = result.data.map((obj, index) => {
                    return {
                        key: index,
                        ...obj
                    }
                });
            paginationIos.total = result.total;
            this.setState({verIos: data, paginationIos});
        } catch (e) {
            //
        }
    }

    handleToggleCreate = () => {
        this.setState({
            showCreate: !this.state.showCreate
        });
    }

    handleCreateSuccess = (item) => {
        if(item.os === 1) {
            let {verAndroid} = this.state;
            verAndroid = [
                {
                    key: verAndroid.length,
                    ...item
                },
                ...verAndroid
            ];
            this.setState({verAndroid});
        } else {
            let {verIos} = this.state;

            verIos = [
                {
                    key: verIos.length,
                    ...item
                },
                ...verIos
            ];
            this.setState({verIos});
        }
    }

    handlePaginate = (e) => {
        const {pagination} = this.state;
        pagination.skip = getSkip(e, pagination.pageSize);
        pagination.current = e;
        this.setState({pagination});
        this.fetchListSong();
    }

    handleToggleEdit = async (e, item) => {
        try {
            let editData = item;
            if (item) {
                this.setState({
                    editData,
                    showEdit: !this.state.showEdit
                });
            } else {
                this.setState({
                    editData: {},
                    showEdit: !this.state.showEdit
                });
            }
        } catch (e) {
            this.setState({
                editData: {},
                showEdit: !this.state.showEdit
            });
        }
    }

    handleUpdateSuccess = (item) => {
        let {verIos, verAndroid} = this.state;
        if(item.os === 1) {
            let index = verAndroid.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                verAndroid[index] = {
                    key: verAndroid[index].key,
                    ...item
                };
                this.setState({
                    verAndroid: [...verAndroid]
                });
            }
        } else {
            let index = verIos.findIndex((obj) => obj._id === item._id);
            if (index !== -1) {
                verIos[index] = {
                    key: verIos[index].key,
                    ...item
                };
                this.setState({
                    verIos: [...verIos]
                });
            }
        }
        
    }

    handleDelete = async (e, item) => {
        let {verIos, verAndroid} = this.state;
        try {
            await deleteVersion(item._id);
            if(item.os === 1) {
                let index = verAndroid.findIndex((obj) => obj._id === item._id);
                if (index !== -1) {
                    verAndroid.splice(index, 1);
                    this.setState({
                        verAndroid: [...verAndroid]
                    });
                }
            } else {
                let index = verIos.findIndex((obj) => obj._id === item._id);
                if (index !== -1) {
                    verIos.splice(index, 1);
                    this.setState({
                        verIos: [...verIos]
                    });
                }
            }
           
            
        } catch (e) {
            notification.error({message: e.message});
        }
    }

    render() {
        const {
            verAndroid,
            showCreate,
            showEdit,
            editData,
            verIos,
            artists,
            categories,
            paginationAndroid,
            paginationIos
        } = this.state;
        return (
            <Space direction="vertical" style={{width: "100%", display: "flex"}}>
                <Card
                    title="Danh sách version"
                    bordered={false}
                    extra={
                        <Ability roles={[PERMISSION_CODE.CREATE]}>
                            <Button type="primary"
                                icon={<FiPlus className="menu-icon"/>}
                                onClick ={this.handleToggleCreate}>Thêm mới</Button>
                        </Ability>}>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={12}>
                                <Card
                                    title="Android"
                                    bordered={false}>
                                    <List
                                        data={verAndroid}
                                        pagination={paginationAndroid}
                                        onPaginate={this.handlePaginate}
                                        onEdit={this.handleToggleEdit}
                                        onDelete={this.handleDelete}/>
                                </Card>
                            </Col>
                            <Col className="gutter-row" span={12}>
                                <Card
                                    title="IOS"
                                    bordered={false}>
                                    <List
                                        data={verIos}
                                        pagination={paginationIos}
                                        onPaginate={this.handlePaginate}
                                        onEdit={this.handleToggleEdit}
                                        onDelete={this.handleDelete}/>
                                </Card>
                            </Col>
                        </Row>
                    
                    <Create
                        visible={showCreate}
                        onClose={this.handleToggleCreate}
                        onSuccess={this.handleCreateSuccess}
                        artists={artists}
                        categories={categories}/>
                    <Edit
                        visible={showEdit}
                        onClose={this.handleToggleEdit}
                        onSuccess={this.handleUpdateSuccess}
                        artists={artists}
                        categories={categories}
                        editData={editData}/>
                </Card>
            </Space>
        )
    }
}
