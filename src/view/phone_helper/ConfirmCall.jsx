import React from "react";
// import "./index.css";
import {Button, InputItem, Toast, WhiteSpace, WingBlank} from 'antd-mobile';
import {Link} from "react-router-dom";

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


    render() {
        return (
            <div>
                <center>
                    <h2 style={{marginTop: "200px"}}>是Mor电话助理接听的吗？</h2>

                    <WingBlank size="xl">
                        {this.state.phone}
                        <br/>即将完成开通
                    </WingBlank>


                    <div style={{bottom: 10, position: "fixed", width: "100%"}}>
                        <Link to={"/phone_helper/result"}>
                            <Button>是</Button>
                        </Link>
                        <WhiteSpace size="xl"/>
                        <Link to="/phone_helper/register">
                            <Button>不是，重新设置</Button>
                        </Link>
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