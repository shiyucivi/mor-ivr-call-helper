import React from "react";
import {ListView, Toast} from 'antd-mobile';
import "./index.css";
import axios from "axios";

// function MyBody(props) {
//     return (
//
//
//             {props.children}
//
//             {/*<AWSSoundPlayer*/}
//             {/*    streamUrl={streamUrl}*/}
//             {/*    trackTitle={trackTitle}*/}
//             {/*    preloadType="auto" />*/}
//             {/*<audio*/}
//             {/*    style={{position: "fixed", bottom: 0, paddingBottom: "6%", margin: "auto", width: "80%"}}*/}
//             {/*    controls*/}
//             {/*    preload="metadata"*/}
//             {/*    id="musicBox"*/}
//             {/*    autoPlay="false"*/}
//             {/*    src={props.stream_url}>*/}
//             {/*    /!*<source type="audio/x-wav"/>*!/*/}
//             {/*    <code>audio</code> element.*/}
//             {/*</audio>*/}
//     );
// }


class Dialog extends React.Component {

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
            dataArr: [],
            pageIndex: 1,
            tranPhone: "",
            page_size: 10,
            call_phone: "",
            call_time: "",
            call_tag: "",
            call_from: "",
            stream_url: "",
            dialogList: [{
                text: "你好，我是小蓦!",
                flag: 0,
            }]
        };
    }

    fetchIvrInfo = id => {
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let token = window.localStorage.getItem("token");
        let guid = window.localStorage.getItem("guid");
        axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/info/${id}?key=${key}&moraccountid=${uid}&guid=${guid}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                let dataArr = [];
                for (let i = 0; i < res.data.ivrMsg.text.length; i++) {
                    //每一次读取的数据都进行保存一次
                    dataArr.push(`row - ${this.state.pageIndex * res.data.ivrMsg.text.length + i}`);
                }
                this.setState({
                    dialogList: res.data.ivrMsg.text,
                    dataSource: this.state.dataSource.cloneWithRows(dataArr),
                    isLoading: false,
                    stream_url: res.data.ivrMsg.voiceUrl,
                    dataArr: dataArr,
                    tranPhone: res.data.ivrMsg.tranPhone,
                    call_phone: res.data.ivrMsg.phone,
                    call_time: res.data.ivrMsg.createTime
                }, () => {
                    Toast.hide();
                })
            }).catch(error => {
            console.log(error);
        });
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchIvrInfo(id);
    }


    render() {
        let index = 0;

        const row = (rowData, sectionID, rowID) => {
            if (index > this.state.dialogList.length - 1) {
                index = 0;
            }
            const dialog = this.state.dialogList[index++];
            return (
                <div style={{display: 'inline-block', width: '100%'}}>
                    {this.DialogItem(dialog.text, dialog.flag)}
                </div>
            );
        };


        return (
            <div>
                <div className="header">
                    <div style={{padding: "8px", display: "flex"}}>
                        <img style={{height: "30px"}} src={require("../../assets/dianhua.png")}/>
                        <span style={{
                            fontSize: "18px",
                            marginLeft: "8px",
                            lineHeight: "30px"
                        }}>未接来电({this.state.call_phone})</span>
                        {/*<Tag style={{backgroundColor: "#ff795e", color: "#000", marginLeft: "8%"}}*/}
                        {/*     data-seed="logId">疑似骚扰</Tag>*/}
                        {/*<span style={{float: "right", fontSize: "16px", color: "#808080"}}>北京联通</span>*/}
                    </div>
                    <div style={{backgroundColor: "#edf0f1", padding: "6px 10px 6px 10px"}}><span>
                            <span style={{fontSize: "16px", color: "#1b1b1b"}}>通话记录</span>
                            <span style={{
                                float: "right",
                                fontSize: "16px",
                                color: "#808080"
                            }}>{this.state.call_time}</span>
                        </span>
                    </div>
                </div>
                <div className="content">
                    <ul style={{
                        listStyle: "none",
                        marginTop: "-0px",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        {this.state.dialogList.map((item, index) => (
                            <li key={index} style={{marginLeft: "-40px"}}>
                                <p style={{
                                    backgroundColor: item.flag === 0 ? "#eaeaea" : "#eeab00",
                                    padding: "10px",
                                    float: item.flag === 0 ? "right" : "left",
                                    maxWidth: "60%",
                                    minWidth: "10%",
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                    marginBottom: "-8px",
                                    display: "inline-block",
                                    color: item.flag === 0 ? "#000" : "#fff",
                                    wordWrap: "break-word",
                                    wordBreak: "break-all",
                                    overflow: "hidden",
                                    lineHeight: "150%",
                                    borderRadius: item.flag === 0 ? "12px 0px 12px 12px" : "0 12px 12px 12px",
                                    fontSize:"16px"
                                }}>
                                    {item.text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="footer">
                    <audio controls style={{margin: "0 auto 0 auto"}}
                           src={this.state.stream_url}>
                    </audio>
                </div>
            </div>
        );
    }
}

export default Dialog;