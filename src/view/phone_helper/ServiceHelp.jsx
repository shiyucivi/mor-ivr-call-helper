import React from "react";
// import "./index.css";
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import {Link} from "react-router-dom";

class ServiceHelp extends React.Component {

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
                    <h1 style={{marginTop: "100px"}}>帮助</h1>
                    此服务由蓦然认知提供

                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                    <a href={"tel:" + "##004#"}>
                        <Button>
                            解除开通
                        </Button>
                    </a>
                    <WhiteSpace size="xl"/>
                    <WhiteSpace size="xl"/>
                </center>
            </div>
        );
    }
}

export default ServiceHelp;