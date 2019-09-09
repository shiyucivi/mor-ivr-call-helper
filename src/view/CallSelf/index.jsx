import React from "react";
import {Button, WhiteSpace} from 'antd-mobile';

import logo_login from '../../assets/welcome/logo_login.png'  

class Index extends React.Component {

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

    render() {
        return (
            <div>
                <center>
                    <img src={require("../../assets/welcome/logo_login.png")}
                         style={{marginTop:'80px',width:'100px',height:'100px'}}/>
                    <h2 style={{marginTop: "70px"}}>呼叫自己完成设置</h2>
                    <WhiteSpace size="xl"/>

                    {this.state.phone}
                    <WhiteSpace/>
                    <br/>即将完成开通
                    <WhiteSpace size="xl"/>


                    <div style={{bottom: 40, position: "fixed", width: "100%"}}>
                        请用【{this.state.phone}】呼叫【{this.state.phone}】
                        <WhiteSpace size="xl"/>
                        <WhiteSpace size="xl"/>
                        <a href={"tel:" + this.state.phone}>
                            <Button
                                style={{backgroundColor:'#eeab00',color:'#fff',borderRadius:'20px'}}
                            >呼叫</Button>
                        </a>
                        <Button style={{marginTop:"10px",backgroundColor:'#eeab00',color:'#fff',borderRadius:'20px'}} onClick={() => {this.props.history.push("/phone_helper/result");}}>
                            已呼叫
                        </Button>
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

export default Index;