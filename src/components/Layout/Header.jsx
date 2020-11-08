import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './Header.module.scss';
import {getCDN} from 'utils';
import {FiLock, FiUser, FiSearch, FiBell, FiArrowUpLeft} from 'react-icons/fi';
import {withRouter, Link} from 'react-router-dom';
import {get} from 'lodash';
import {RiVipCrownLine} from 'react-icons/ri';
import Dropdown from 'components/Dropdown';

export class Header extends Component {
    state = {
        keyword: "",
        showSearchBox: false,
        hotKeywords: ["nhac tre hay nhat", "top 100 bai nhac viet nam", "nhac tru tinh hay nhat", "bai hat moi phat hanh", "cứ thế mong chờ"]
    }

    handleInputSearchBoxFocusBlur = () => {
        this.setState({
            showSearchBox: !this.state.showSearchBox
        });
    }

    handleChange = (e) => {
        this.setState({keyword: e.target.value});
        
    }

    handleKeydown = (e) => {
        if(e.keyCode === 13 && this.state.keyword.length){
            this.handleSubmit();
        }
    }

    handleRecommend = (keyword) => {
        this.setState({keyword});
        this.handleSubmit();
    }

    handleSubmit = () => {
        alert('Submit');
    }

    render() {
        const {auth, history} = this.props;
        const {keyword, showSearchBox, hotKeywords} = this.state;
        const returnUrl = get(history, 'location.pathname', "");
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <span>Mabo79</span>
                    </div>
                    <nav>
                        <div className={styles.searchBox}>
                            <div className={styles.searchBox_icon}>
                                <span>
                                    <FiSearch size={24}/>
                                </span>
                            </div>
                            <div className={styles.searchBox_input}>
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => this.handleChange(e)}
                                    onKeyDown={this.handleKeydown}
                                    placeholder="Nhập tên bài hát, ca sĩ..."
                                    onFocus={this.handleInputSearchBoxFocusBlur}
                                    onBlur={this.handleInputSearchBoxFocusBlur}/>
                            </div>
                            <div
                                className={styles.searchBox_content}
                                style={showSearchBox
                                    ? {
                                        visibility: 'visible',
                                        opacity: 1,
                                        top: 40
                                    }
                                    : {}}>
                                {
                                    hotKeywords.map((keyword, key) => (
                                        <div key={key} className={styles.searchBox_content__item}>
                                            <div className={styles.searchBox_content__item_title}>
                                                <span>{keyword}</span>
                                            </div>
                                            <div className={styles.searchBox_content__item_icon}>
                                                <span onClick={() => this.handleRecommend(keyword)}>
                                                    <FiArrowUpLeft size={24}/>
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </nav>
                    <div className={styles.menu}>
                        {
                            auth.isLoggedIn
                                ? <div className={styles.menu}>
                                        {
                                            !auth.userInfo.info.isVip
                                                ? <div className={styles.menuItem}>
                                                        <button className="btn btn-orange">
                                                            <span className="btn-icon"><RiVipCrownLine size={16}/></span>
                                                            <span>NÂNG CẤP VIP</span>
                                                        </button>
                                                    </div>
                                                : null
                                        }
                                        <div className={styles.menu_item}>
                                            <Dropdown content={<div>Không có thông báo</div>} placement="bottomright" style={{width: 200}}>
                                                <div
                                                    className={styles.avatar}
                                                    style={{
                                                        backgroundColor: '#ffffff'
                                                    }}>
                                                    <div className={styles.badge}>
                                                        <span>100</span>
                                                    </div>
                                                    <span>
                                                        <FiBell size={24}/>
                                                    </span>
                                                </div>
                                            </Dropdown>
                                        </div>
                                        <div className={styles.menu_item}>
                                            <Dropdown content={<div>Không có thông báo</div>} placement="bottomright" style={{width: 200}}>
                                                <div className={styles.avatar}>
                                                    {
                                                        auth.userInfo.info.avatar
                                                            ? <img src={getCDN(auth.userInfo.info.avatar)} alt="Avatar"/>
                                                            : <span>
                                                                    <FiUser size={24}/>
                                                                </span>
                                                    }
                                                </div>
                                            </Dropdown>
                                        </div>
                                    </div>
                                : <Link to={`/login?returnUrl=${returnUrl}`}>
                                        <button className="btn btn-primary">
                                            <span className="btn-icon"><FiLock size={16}/></span>
                                            <span>Đăng nhập</span>
                                        </button>
                                    </Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({auth: state.authReducer});
export default withRouter(connect(mapStateToProps)(Header));
