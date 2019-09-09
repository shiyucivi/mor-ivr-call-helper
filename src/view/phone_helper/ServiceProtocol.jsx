import React from "react";
// import "./index.css";
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import {Link} from "react-router-dom";

class ServiceProtocol extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    render() {
        return (
            <div>
                <center>
                    <h1 style={{marginTop: "100px"}}>用户协议</h1>

                    此服务由蓦然认知提供

                    <h1 style={{marginTop: "100px"}}>隐私协议</h1>

                    此服务由蓦然认知提供
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                </center>
            </div>
        );
    }
}

export default ServiceProtocol;