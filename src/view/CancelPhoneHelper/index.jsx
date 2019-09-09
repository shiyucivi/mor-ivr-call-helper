import React from "react";
import {Button, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import {withRouter} from 'react-router-dom'

import axios from 'axios'

class CancelPhoneHelper extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: props.match.params.phone
        }
    }

    componentWillMount() {
        console.log(this.state)

    }

    confirmCancle = () => {
        let phone = this.state.phone
        let key = window.localStorage.getItem("key");
        let moraccountid = window.localStorage.getItem("uid");
        let token = window.localStorage.getItem("token");
        let guid = window.localStorage.getItem("guid");
        axios.defaults.headers.common['Authorization'] = "Bearer " + token
        axios.post(`https://apitest.xiaomor.com/api/webtest/ivr/unBind?key=${key}&moraccountid=${moraccountid}&phone=${phone}&guid=${guid}`)
            .then(res => {
                console.log(res);
                if (res.data.code === 0) {
                    Toast.info("取消成功,请使用"+phone+"拨打【##004#】取消本地呼叫转移设置");
                    //this.props.history.goBack();
                    this.props.history.push("/phone_helper/register");
                }
            })
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <center>
                <img src={require("../../assets/welcome/logo_login.png")}
                         style={{marginTop: '80px', width: '100px', height: '100px'}}/>
                    <h3 style={{marginTop: "70px"}}>呼叫下方号码停用来电助理呼叫转移</h3>

                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                    ##004#

                    <div style={{bottom: 40, position: "fixed", width: "100%"}}>
                        请用【{this.state.phone}】呼叫##004#
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                        <a href={"tel:" + "##004#"}>
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
                                this.confirmCancle();
                            }}>
                                已呼叫
                            </Button>
                        </WingBlank>

                        <WingBlank>
                            <Button style={{
                                marginTop: "10px",
                                backgroundColor: '#eeab00',
                                color: '#fff',
                                borderRadius: '30px'
                            }} onClick={() => {
                                this.goBack();
                            }}>
                                取消
                            </Button>
                        </WingBlank>
                        
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                    </div>

                    
                </center>
            </div>
        );
    }
}

export default withRouter(CancelPhoneHelper);