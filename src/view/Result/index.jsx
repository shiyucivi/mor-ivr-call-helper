import React from "react";
// import "./index.css";
import {Button, InputItem, Modal, Toast, WhiteSpace, WingBlank} from 'antd-mobile';

import logo_login from '../../assets/welcome/logo_login.png'
import axios from "axios";
const alert = Modal.alert;

class ConfirmCall extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            phone:''
        }
    }

    componentWillMount(){
        this.setState({
            phone: window.localStorage.getItem("phone")
        })
    }

    confirmSuccess = () => {
        const showAlert = alert('确认已开通', '', [
            {text: '取消', onPress: () => console.log('取消')},
            {text: '确认', onPress: () => this.ConfirmSubSuccess()}
        ])
    };
    ConfirmSubSuccess = () => {
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let token = window.localStorage.getItem("token");
        let guid = window.localStorage.getItem("guid");
        axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/subSuccess?key=${key}&moraccountid=${uid}&guid=${guid}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log(res);
                this.props.history.push('/phone_helper/app_page');
            })
    };

    render() {
        return (
            <div>
                <center>
                    <img src={require("../../assets/welcome/logo_login.png")} style={{marginTop:'80px',width:'100px',height:'100px'}}/>
                    <h3  style={{marginTop: "70px"}}> 关机时，拒接时，无人接听时，
                        <br/>Mor电话助理将为您接听电话
                    </h3>
                    <WhiteSpace size="xl"/>
                    <WingBlank size="xl">
                        {this.state.phone}
                        <br/>已完成开通
                    </WingBlank>

                    <div style={{bottom: 40, position: "fixed", width: "100%"}}>
                        <WingBlank>
                            <Button onClick={() => {
                                Toast.info("恭喜！设置已完成");
                                this.confirmSuccess()}}
                                style={{backgroundColor:'#eeab00',color:'#fff',borderRadius:'20px'}}
                            >好的，进入主页</Button>
                        </WingBlank>

                        <WhiteSpace/>
                        <span style={{color: "#328ccb"}} onClick={() => {
                            this.props.history.push("/phone_helper/service_help");
                        }}>设置不成功</span>
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                    </div>

                </center>
            </div>
        );
    }
}

export default ConfirmCall;