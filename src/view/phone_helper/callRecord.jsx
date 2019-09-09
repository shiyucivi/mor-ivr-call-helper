import React from 'react'
import {Card, PullToRefresh,ListView, Radio, WhiteSpace, WingBlank,SwipeAction} from 'antd-mobile'
import axios from 'axios'

import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'

const moment = require('moment')
const RadioItem = Radio.RadioItem;


class CallRecord extends React.Component {
    constructor(props) {
        super(props);
        var date=new Date()
        let height=document.documentElement.clientHeight-80
        this.state = {
            data: [{
                tranPhone: '',
                summary: '',
                updateTime: date,
                text: '',
                deleting:false
            }],
            hasCallRecord:true,
            refreshing: false,
            height: height,
            isDeleting: false,
            page:0
        }
    }

    componentWillMount() {
        this.getCallRecord();

    }

    componentDidMount() {
        const hei = this.state.height - ReactDOM.findDOMNode(this.ptr).offsetTop;
        setTimeout(() => this.setState({
            height: hei,
        }), 0);
        
    }

    getCallRecord = () => {
        //请求通话记录
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let token = window.localStorage.getItem("token");
        let guid = window.localStorage.getItem("guid");
        axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/list?key=${key}&moraccountid=${uid}&guid=${guid}&ver=3.0`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log("通话记录↓");
                console.log(res);
                this.setState({refreshing: false});
                if (res.data.page.list) {
                    let dataArr=res.data.page.list;
                    for(let i=0;i<dataArr.length;i++){
                        dataArr[i].deleting=false;
                    }
                    this.setState({data: dataArr})
                    if (res.data.page.list.length === 0) {
                        this.setState({hasCallRecord:false});
                    }
                } else {
                    this.setState({hasCallRecord:false});
                }
                console.log("已刷新通话记录")
            })
            .catch(e => {
                console.log(e);
                console.log("通话记录请求错误");
                this.setState({
                    hasCallRecord:false
                });
            })
        /*
        this.setState({
          data:[
            {tranPhone:13293939393,summary:'快递',updateTime:time,text:'你好，有你的快递'},
            {tranPhone:13293939393,summary:'快递',updateTime:time,text:'你好，有你的快递'},
            {tranPhone:13293939393,summary:'快递',updateTime:time,text:'你好，有你的快递'}
          ]
        },()=>{
          this.setState({refreshing:false})
        })
        */
    }

    goToDetail=(id)=>{
        this.props.history.push("/dialog/detail/"+id)
    }

    
    confirmDelete=(id,i)=>{
        let arr=this.state.data;
        arr.splice(i,1);
        this.setState({data:arr})
        let key = window.localStorage.getItem("key");
        let uid = window.localStorage.getItem("uid");
        let token = window.localStorage.getItem("token");
        axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/delete/${id}?key=${key}&moraccountid=${uid}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                console.log("删除通话记录结果↓");
                console.log(res);
            })
    }

    touchStart=(i)=>{
        this.pressTime  = setTimeout(()=>{
            let dataArr=this.state.data;
            dataArr[i].deleting=true;
            this.setState({
                isDeleting:true,
                data:dataArr
            });
        }, '1000');
        console.log("开始长按")
    }
    touchEnd=()=>{
        clearTimeout(this.pressTime)
        console.log("结束长按")
    }
    cancelDelete=()=>{
        let dataArr=this.state.data;
        for(let y=0;y<dataArr.length;y++){
            dataArr[y].deleting=false;
        }
        this.setState({data:dataArr,isDeleting:false})
    }


    render() {
        return (<div id="slap">
            <PullToRefresh
                damping={30}
                ref={el => this.ptr = el}
                style={{height: this.state.height, overflow: 'auto'}}
                direction="down"
                indicator={{deacrivate: '上拉刷新'}}
                refreshing={this.state.refreshing}
                onRefresh={() => {
                    this.setState({refreshing: true});
                    this.getCallRecord();
                    setTimeout(() => {
                        this.setState({refreshing: false})
                    }, 1000)
                }}
            >
                {this.state.hasCallRecord?
                this.state.data.map(
                    (item, i) =>
                    
                    <div key={i} onTouchStart={()=>{this.touchStart(i)}} onTouchEnd={this.touchEnd}>
                        <WingBlank>
                            <WhiteSpace/>
                            {/*<SwipeAction style={{backgroundColor:'red'}} autoClose left={[{text:'删除'}]}>*/}
                            <Card onClick={this.state.isDeleting?()=>this.cancelDelete():()=>this.goToDetail(item.id)} style={this.state.isDeleting?{borderRadius:'10px 0 0 10px'}:{borderRadius:'10px'}}>
                                <Card.Header title={<span style={{color:'#000',fontSize:'17px'}}>{item.phone}</span>}
                                             extra={<span style={this.state.isDeleting?{display:'inline-block',width:'100%',textAlign:'left'}:{textAlign:'right'}}>{moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss")}</span>} 
                                />
                                <Card.Body>
                                    <div style={{fontSize:'16px',color:'#808080'}}>{item.summary}{item.text}</div>
                                </Card.Body>
                            {item.deleting?<div style={{position:'absolute',height:'100%',width:'15%',right:'0',backgroundColor:'#f43a31',borderRadius:'0 10px 10px 0',display:'flex',justifyContent:'center',alignItems:'center',zIndex:'999'}} onClick={()=>this.confirmDelete(item.id,i)}><img style={{width:'30px',height:'30px'}} src={require("../../assets/callRecord/ic_list_delete.png")} /></div>:<span></span>}    
                            </Card>
                            {/*</SwipeAction>*/}
                            <WhiteSpace/>
                        </WingBlank>
                    </div>
                    
                ):
                <div style={{height:'100%',textAlign:'center',paddingTop:'50%',fontSize:'18px',color:"#333"}}>暂时没有通话记录哦</div>
                }
                
            </PullToRefresh>
            
        </div>)
    }
}

export default withRouter(CallRecord)