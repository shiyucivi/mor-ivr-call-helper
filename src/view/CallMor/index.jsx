import React from "react";
import {Button, Modal, WhiteSpace, WingBlank} from 'antd-mobile';

import axios from "axios";

const alert = Modal.alert;

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: ''
        }
    }

    componentWillMount() {
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
                    <img src={require("../../assets/welcome/logo_login.png")}
                         style={{marginTop: '80px', width: '100px', height: '100px'}}/>
                    <h3 style={{marginTop: "70px"}}>呼叫下方号码启用来电助理</h3>

                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                    **004*02161014111#
                    <div style={{bottom: 40, position: "fixed", width: "100%"}}>
                        请用【{this.state.phone}】呼叫
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                        <a href={"tel:" + "**004*02161014111#"}>
                            <WingBlank>
                                <Button
                                    style={{backgroundColor: '#eeab00', color: '#fff', borderRadius: '30px'}}
                                >
                                    {"呼叫"}
                                </Button>
                            </WingBlank>
                        </a>
                        <WingBlank>
                            <Button style={{
                                marginTop: "10px",
                                backgroundColor: '#eeab00',
                                color: '#fff',
                                borderRadius: '30px'
                            }} onClick={() => {
                                this.props.history.push("/phone_helper/call_self");
                            }}>
                                已呼叫
                            </Button>
                        </WingBlank>

                        <WhiteSpace size="xl"/>
                        <span style={{color: "#328ccb"}} onClick={() => {
                            this.props.history.push("/phone_helper/service_help");
                        }}>设置不成功</span>
                        <span style={{color: "#328ccb", marginLeft: "20px"}} onClick={() => {
                            this.confirmSuccess();
                        }}>我已开通</span>
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                    </div>

                </center>
            </div>
        );
    }
}

export default Index;