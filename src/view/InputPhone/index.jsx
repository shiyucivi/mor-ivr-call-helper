import React from "react";
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile';

import axios from 'axios'

import './index.css'


class Index extends React.Component {
    state = {
        hasError: false,
        value: '',
        sendMessageSuccess: false,     //是否发送验证码成功，如果成功则发送按钮变成不可用状态，直到倒计时结束
        testCode: '',    //验证码
        time: 60   //倒计时
    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }

    genId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toUpperCase();
    }

    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value: value.replace(/\s/g, '')
        });
    }

    testCodeChange = (testCode) => {
        this.setState({testCode});
    }

    /*获取短信验证码*/
    getMessageTestCode = () => {
        console.log(this.state.value);
        this.coundDownTime();
        let data = {"sysUserMobile": this.state.value};
        if (this.state.sendMessageSuccess === false) {
            axios.post('https://api.xiaomor.com/api/user/login/sendLoginSMSFromWeb?key=web_browser', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}})
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e);
                    Toast.info('验证码错误')
                });
        }

    }

    /*点击下一步，提交手机号和验证码进行验证*/
    login = () => {
        const deviceId = "f41af8637308f82c95a6dfacc6c53934";
        let data = {
            "code": this.state.testCode,
            "phone": this.state.value,
            "deviceId": deviceId,
            "isIvr": 1,
        };

        let json = {
            "key": "MTAS2A3E74452E38",
            "data": data
        };

        if (!this.state.hasError && this.state.value.length > 0) {
            axios.post('https://api.xiaomor.com/api/webtest/user/registerFromWeb?key=web_browser&deviceid=' + deviceId, JSON.stringify(json), {headers: {'Content-Type': 'application/json'}})
                .then((res) => {
                    console.log(res);
                    /*if(res.data.data.status===1){
                        Toast.info("验证失败")
                    }
                    else if(res.data.data.status===0){
                        Toast.info("登录成功")
                        this.props.history.push("/phone_helper/call_mor/" + this.state.value);
                    }*/
                    //this.props.history.push("/phone_helper/call_mor/" + this.state.value);
                    const data = res.data.data;
                    if (this.isWXorBrowser() === true) {
                        this.props.history.push({
                            pathname: "/transfer",
                            query: {
                                to: "1",
                                id: this.state.value
                            }
                        });
                    } else {
                        window.localStorage.setItem("key", "MTAS2A3E74452E38");
                        window.localStorage.setItem("uid", data.userInfo.uid);
                        window.localStorage.setItem("token", data.token);
                        window.localStorage.setItem("guid", data.guid);
                        this.props.history.push("/phone_helper/app_page");
                    }
                }).catch(() => {
                Toast.info("验证失败");
            })
        } else {
            Toast.info("请输入正确的手机号或验证码");
            return
        }
    }

    coundDownTime = () => {
        let timer = setInterval(
            () => {
                this.setState({time: this.state.time - 1, sendMessageSuccess: true}, () => {
                    console.log(this.state.sendMessageSuccess);
                    if (this.state.time === 0) {
                        clearInterval(timer);
                        this.setState({time: 60, sendMessageSuccess: false})
                    }
                })
            }
            , 1000)
    }


    render() {
        return (
            <div>
                <center>
                    <img src={require("../../assets/welcome/logo_login.png")}
                         style={{marginTop: '60px', width: '100px', height: '100px'}}/>
                    <h2 style={{marginTop: "40px"}}>请输入您的手机号</h2>

                    <InputItem
                        type="phone"
                        placeholder="输入手机号"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.value}
                        clear
                    >手机号码</InputItem>


                    <InputItem className="test-code" type="number" placeholder="输入验证码" clear
                               style={{display: "inline-block"}} onChange={this.testCodeChange}>验证码</InputItem>
                    <input type="button" className="send-button"
                           style={this.state.sendMessageSuccess ? {
                               backgroundColor: "white", float: "right",
                               marginRight: "20px",
                               marginTop: "10px"
                           } : {
                               float: "right",
                               marginRight: "20px",
                               marginTop: "10px"
                           }}
                           value={this.state.sendMessageSuccess ? "已发送" + '(请' + this.state.time + 's后重试)' : "发送验证码"}
                           onClick={this.getMessageTestCode}/>


                    <div style={{width: "100%", marginTop: "100px"}}>
                        已阅读并同意<span style={{color: "#328ccb"}} onClick={() => {
                        this.props.history.push("/phone_helper/service_protocol");
                    }}>用户协议</span>和<span style={{color: "#328ccb"}} onClick={() => {
                        this.props.history.push("/phone_helper/service_protocol");
                    }}>隐私协议</span>
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                        <WingBlank>
                            <Button style={{backgroundColor: '#eeab00', color: '#fff', borderRadius: '20px'}}
                                    onClick={this.login}>登录</Button>
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

    isWXorBrowser() {
        var rst = true
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            var ua = navigator.userAgent.toLowerCase();
            if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
                rst = false;
            }
        } else {
            rst = false;
        }
        return rst;
    }
}

export default Index;