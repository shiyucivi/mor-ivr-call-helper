import React from 'react'
import {withRouter} from 'react-router-dom'

import {Button, List, Modal, Toast, WingBlank,WhiteSpace} from 'antd-mobile';
import axios from 'axios';

const Item = List.Item
const alert = Modal.alert


class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPhone: '',
            phoneList: ['']   //可切换手机号列表
        }
    }

    componentWillMount() {
        console.log(this.state);
        this.accountList();
    }

    accountList = () => {
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let guid = window.localStorage.getItem('guid');
        let token = window.localStorage.getItem("token");
        axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/accountList?key=${key}&moraccountid=${uid}&guid=${guid}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log("手机号列表");
                console.log(res);
                let phoneList = [];
                let phone = "";
                for (let i = 0; i < res.data.data.length; i++) {
                    phoneList.push(res.data.data[i].phone);
                    if (res.data.data[i].status === 1) {
                        phone = res.data.data[i].phone;
                        uid=res.data.data[i].uid
                        window.localStorage.setItem("uid",uid)
                    }
                }
                this.setState({
                    currentPhone: phone,
                    phoneList: phoneList
                });
                return uid
            })
            .then(uid=>console.log('uid--'+uid+'--'+window.localStorage.uid))
            .catch(e=>{console.log(e)})
    }


    cancelHelper = () => {
        this.props.history.push("/phone_helper/cancelphonehelper/" + this.state.currentPhone)
    }

    confirmSwitchAccount = (phoneNumber) => {
        const showAlert = alert('确认切换账号', '', [
            {text: '取消', onPress: () => console.log('取消切换账号')},
            {text: '确认', onPress: () => this.switchAccount(phoneNumber)}
        ])
    }

    switchAccount = (phoneNumber) => {
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let guid = window.localStorage.getItem('guid');
        let token = window.localStorage.getItem("token");
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        axios.post(`https://apitest.xiaomor.com/api/webtest/ivr/switchAccount?key=${key}&moraccountid=${uid}&guid=${guid}&phone=${phoneNumber}`)
            .then(res => {
                console.log('切换账号信息')
                console.log(res);
                if (res.data.code === 0) {
                    this.setState({
                        currentPhone: phoneNumber
                    })
                    this.accountList();

                    //setTimeout(()=>console.log("切换账号时的uid"+window.localStorage.getItem('uid')),2000);
                    //console.log("切换账号时的uid"+window.localStorage.getItem('uid'));
                    setTimeout(()=>window.location.reload(),2000);
                    Toast.info('切换账号成功')
                } else {
                    Toast.info(res.data.msg)
                }
            })
    }

    createNewAccount=()=>{
        this.props.history.push("/phone_helper/register")
    }

    render() {
        return (<div style={{height:'650px'}}>
            <List renderHeader={() => '当前账号'}>
                <WingBlank>
                    <Item extra="取消电话助理" onClick={this.cancelHelper}>{this.state.currentPhone}</Item>
                    <Item arrow="horizontal" onClick={() => {
                    }}>地址</Item>
                </WingBlank>
            </List>
            <List renderHeader={() => '可切换账号'}>
                <WingBlank>
                    {this.state.phoneList.length > 1 ? this.state.phoneList.map((item, i) =>
                        item !== this.state.currentPhone &&
                        <Item arrow="horizontal"
                              onClick={() => this.confirmSwitchAccount(item)}
                              key={i}>{item}</Item>) : <Item>暂无可切换账号</Item>}
                </WingBlank>
            </List>

            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />

            <div>
                <WingBlank>
                    <Button style={{backgroundColor:'#eeab00',color:'#fff',borderRadius:'30px'}} onClick={this.createNewAccount}>新建账号</Button>
                </WingBlank>
            </div>
            
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />

        </div>)
    }
}

export default withRouter(UserEdit)