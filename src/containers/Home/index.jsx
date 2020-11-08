import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import Slider from 'components/Slider';
import SongSlider from 'components/SongSlider';
import List from 'components/List';
import ListItem from 'components/List/ListItem';
import Popover from 'components/Popover';
import {FiMoreHorizontal, FiPlay, FiPause, FiChevronRight} from 'react-icons/fi';
import {RiPlayListAddLine, RiHeartLine, RiShareLine, RiHeadphoneLine, RiChat1Line, RiBookReadLine, RiDownload2Line, RiClipboardLine, RiIndeterminateCircleLine, RiAddLine} from 'react-icons/ri';

export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slides: [
                {
                    title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                            "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                    artistName: "Huy Le",
                    link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    mvLink: "",
                    thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                            "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                    artistName: "Huy Le",
                    link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    mvLink: "",
                    thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                            "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                    artistName: "Huy Le",
                    link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    mvLink: "",
                    thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai, fhwehfq hfguwehfweiu wfwehfwehfiwehfiwe wfhweghfwe" +
                            "i whfgewfhewhf qwfwehfewhfwehfiwue qfqhfqh",
                    artistName: "Huy Le",
                    link: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    mvLink: "",
                    thumbnail: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc",
                    thumbnailMedium: "https://i.picsum.photos/id/443/1024/350.jpg?hmac=hD3g1T8M6frFTbbQv5s8IYsmpCBwB" +
                            "ZaV8B2f6oVbycc"
                }
            ],
            recentPublishSlides: [
                {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    thumbnail: "https://picsum.photos/200/200"
                }
            ],
            recentPublishList: [
                {
                    id: 1,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 2,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 3,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 4,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 5,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 6,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 7,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 8,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 9,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 10,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 11,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }
            ],
            categories: [
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
                {
                    title: "Nhạc Trẻ",
                    thumbnail: "https://picsum.photos/200/200"
                },
            ],
            artistList: [
                {
                    id: 1,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 2,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 3,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 4,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 5,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 6,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 7,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 8,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }, {
                    id: 9,
                    title: "Em Không Sai, Chúng Ta Sai",
                    artistName: "Huy Huy",
                    playing: false,
                    isToggle: false,
                    thumbnail: "https://picsum.photos/200/200"
                }
            ]
        }
    }

    ListSongPopup = (props) => {
        const {item} = props;
        return (
            <div>
                <div className="list-song_action-detail">
                    <div className="thumb">
                        <img src={item.thumbnail} alt={item.title}/>
                    </div>
                    <div className="title">
                        <b>{item.title}</b>
                        <div className="statistic">
                            <div>
                                <span className="menu-icon">
                                    <RiHeartLine/>
                                </span>
                                <span>20k</span>
                            </div>
                            <div>
                                <span className="menu-icon">
                                    <RiHeadphoneLine/>
                                </span>
                                <span>100k</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-song_action-block">
                    <a href="/" className="list-song_action-block__link">
                        <RiDownload2Line/>
                        <span>Tải xuống</span>
                    </a>
                    <a href="/" className="list-song_action-block__link">
                        <RiClipboardLine/>
                        <span>Sao chép link</span>
                    </a>
                    <a href="/" className="list-song_action-block__link">
                        <RiIndeterminateCircleLine/>
                        <span>Chặn</span>
                    </a>
                </div>
                <div>

                </div>
                <ul className="list-action">
                    <li className="list-action_item">
                        <span className="menu-icon">
                            <RiHeartLine/>
                        </span>
                        <span>
                            Yêu thích
                        </span>
                    </li>
                    <li className="list-action_item">
                        <span className="menu-icon">
                            <RiPlayListAddLine/>
                        </span>
                        <span>
                            Thêm vào danh sách phát
                        </span>
                    </li>
                    <li className="list-action_item">
                        <span className="menu-icon">
                            <RiBookReadLine/>
                        </span>
                        <span>
                            Đóng góp lời bài hát
                        </span>
                    </li>
                    <li className="list-action_item">
                        <span className="menu-icon">
                            <RiChat1Line/>
                        </span>
                        <span>
                            Bình luận
                        </span>
                    </li>
                    <li className="list-action_item">
                        <span className="menu-icon">
                            <RiShareLine/>
                        </span>
                        <span>
                            Chia sẻ
                        </span>
                    </li>
                </ul>
            </div>
        )
    }

    playThisSong = (item) => {
        const { recentPublishList } = this.state;
        let findItem = recentPublishList.find((obj) => obj.id === item.id);
        if(findItem){
            recentPublishList.map((obj) => obj.playing = false);
            findItem.playing = true;
            this.setState({recentPublishList});
        }
    }

    toggleSongPopup = (item, status) => {
        const { recentPublishList } = this.state;
        let findItem = recentPublishList.find((obj) => obj.id === item.id);
        if(findItem){
            findItem.isToggle = status;
            this.setState({recentPublishList});
        }
    }

    render() {
        const {slides, recentPublishList, recentPublishSlides, categories, artistList} = this.state;
        return (
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>Mabo79 | Admin Cpanel</title>
                </Helmet>
                <div style={{
                        width: '100%'
                    }}>
                    <Slider items={slides}/>
                    <SongSlider items={recentPublishSlides} title="MỚI PHÁT HÀNH"/>
                    <List items={recentPublishList} grid={3}>
                        <ListItem
                            render={(item) => {
                                return (
                                    <div onDoubleClick={() => this.playThisSong(item)} className={`list-song ${item.isToggle ? 'show_popup' : ''} ${item.playing ? 'show_play' : ''}`}>
                                        <div className="list-song_thumb">
                                            <img src={item.thumbnail} alt={item.title}/>
                                            <div className="list-song_thumb_hover"></div>
                                            {item.playing ? <FiPause className="list-song_thumb_icon" fill={'#fff'} stroke={0}/> : <FiPlay className="list-song_thumb_icon" fill={'#fff'} stroke={0}/> }
                                        </div>
                                        <div className="list-song_info">
                                            <div className="title">
                                                <a href="/" title={item.title}>{item.title}</a>
                                            </div>
                                            <div className="artist">
                                                <a href="/" title={item.artistName}>{item.artistName}</a>
                                            </div>
                                        </div>
                                        <div className="list-song_action">
                                            <Popover
                                                style={{
                                                    width: 280
                                                }}
                                                mouse="left"
                                                onShow={() => this.toggleSongPopup(item, true)}
                                                onHide={() => this.toggleSongPopup(item, false)}
                                                content={<this.ListSongPopup item = {
                                                    item
                                                } />}>
                                                <button className="info">
                                                    <FiMoreHorizontal/>
                                                </button>
                                            </Popover>
                                        </div>
                                    </div>
                                )
                            }}/>
                    </List>
                    <div className="text-right">
                        <a href="/">
                            <button className="d-iblock btn btn-sm btn-default">
                                <span>Xem tất cả</span>
                                <span className="btn-icon"><FiChevronRight/></span>
                            </button>
                        </a>
                    </div>
                    <div className="main-title">
                        <h1>THỂ LOẠI</h1>
                    </div>
                    <List items={categories} grid={5}>
                        <ListItem
                            render={(item) => {
                                return (
                                    <div className="list-category">
                                        <div className="thumb">
                                            <img src={item.thumbnail} alt={item.title}/>
                                        </div>
                                        <div className="title">
                                            <div className="over"></div>
                                            <h2>
                                                <a href="/" title={item.title}>{item.title}</a>
                                            </h2>
                                        </div>
                                    </div>
                                )
                            }}
                        />
                    </List>
                    <div className="text-right">
                        <a href="/">
                            <button className="d-iblock btn btn-sm btn-default">
                                <span>Xem tất cả</span>
                                <span className="btn-icon"><FiChevronRight/></span>
                            </button>
                        </a>
                    </div>
                    <div className="main-title">
                        <h1>NGHỆ SĨ</h1>
                    </div>
                    <List items={artistList} grid={5}>
                        <ListItem
                            render={(item) => {
                                return (
                                    <div className="list-artist">
                                        <div className="list-artist_thumb">
                                            <img src={item.thumbnail} alt={item.title}/>
                                        </div>
                                        <div className="list-artist_info">
                                            <div className="artist">
                                                <a href="/" title={item.artistName}>{item.artistName}</a>
                                            </div>
                                            <span className="follow">100k theo dõi</span>
                                            <button
                                                className="btn btn-sm"
                                                style={{
                                                    height: 25,
                                                    backgroundColor: "#f1f1f1",
                                                    lineHeight: "20px"
                                                }}>
                                                <span className="btn-icon">
                                                    <RiAddLine/>
                                                </span>
                                                <span>Theo dõi</span>
                                            </button>
                                        </div>
                                    </div>
                                )
                            }}/>
                    </List>
                    <div className="text-right">
                        <a href="/">
                            <button className="d-iblock btn btn-sm btn-default">
                                <span>Xem tất cả</span>
                                <span className="btn-icon"><FiChevronRight/></span>
                            </button>
                        </a>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(Home));