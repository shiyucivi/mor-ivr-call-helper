import React from "react";
// import "./index.css";
import {Button, Toast, WhiteSpace, WingBlank} from 'antd-mobile';


class PhoneHelper extends React.Component {


    render() {
        return (
            <div>
                <center>
                    <img style={{width:'100px',height:'100px'}} src={require("../../assets/welcome/logo_login.png")} />
                    <h1>Mor电话助理</h1>
                    <h3> 关机时，拒接时，无人接听时，
                        <br/>Mor电话助理将为您接听电话
                    </h3>
                </center>
                <center>
                    <h3><img src={require("../../assets/welcome/ic_assistantset_hello_people_voice_play.png")}/>不再错过重要来电</h3>
                    <h3><img src={require("../../assets/welcome/ic_assistantset_hello_people_voice_play.png")}/>不再担心陌生电话骚扰</h3>
                    <h3><img src={require("../../assets/welcome/ic_assistantset_hello_people_voice_play.png")}/>开会上课不再分心接电话</h3>
                </center>
                <div style={{bottom: 10, position: "fixed", width: "100%"}}>
                    
                    <Button onClick={()=>{this.props.history.push("/phone_helper/register")}}>开通</Button>
                    
                    <WhiteSpace size="xl"/>
                    <center>
                         <span style={{color: "#328ccb"}} onClick={() => {
                             this.props.history.push("/phone_helper/service_help");
                         }}>帮助</span>
                        <WhiteSpace size="xl"/>
                        双卡用户
                    </center>
                </div>
            </div>
        );
    }
}

export default PhoneHelper;