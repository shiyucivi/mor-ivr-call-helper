//特定类型的应答
import React from 'react'
import {Flex,WingBlank,WhiteSpace,Button,InputItem,TextareaItem,Toast} from 'antd-mobile';
import MyButton from './Button.jsx'
import OrangeTag from './OrangeTag.jsx'

import axios from 'axios';


export default class SpecialGreetEdit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      special:this.props.match.params.type,   //特定的话术场景
      greetWords:"",    //输入的话术
      scene:"",   //场景的中文名
      id:props.match.params.id,
      defaultGreetWords:'',   //默认的话术
      recommendGreets:[],     //推荐的话术数组
      singnal:false   //是否开始渲染表单的信号（用于重渲染默认值）
    }
  }

  componentWillMount(){
    console.log(this.state);
    let key=window.localStorage.getItem("key");
    let moraccountid=window.localStorage.getItem("uid");
    let token=window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    console.log(key)
    console.log(moraccountid)
    console.log(token)
    axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/queryScenesReply?key=${key}&moraccountid=${moraccountid}&id=${this.state.id}&guid=${guid}`,{headers:{"Authorization":`Bearer ${token}`}})
    .then(res=>{
      console.log(res);
      this.setState({
        scene:res.data.data.typeText,
        defaultGreetWords:res.data.data.replyText,
        greetWords:res.data.data.replyText,
        recommendGreets:res.data.recommend_reply,
        singnal:true
      });
    })
    .then(()=>{console.log("recommendgreets↓");console.log(this.state.recommendGreets)})
    .catch(e=>{
      console.log(e);
      console.log('specialgreetedit请求错误');
    })

  }

  componentDidMount(){
    
  }

  onChange=(value)=>{
    this.setState({greetWords:value});
    console.log(this.state.greetWords)
  }
  
  saveGreetWord=()=>{

  }
  cancel=()=>{
    this.props.history.goBack();
  }
  save=()=>{
    let key=window.localStorage.getItem("key");
    let moraccountid=window.localStorage.getItem("uid");
    let token=window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    axios.defaults.headers.common['Authorization'] ="Bearer "+token
    axios.post(`https://apitest.xiaomor.com/api/webtest/ivr/updateScenesReply?key=${key}&moraccountid=${moraccountid}&reply=${encodeURIComponent(this.state.greetWords)}&id=${this.state.id}&guid=${guid}`)
    .then(res=>{
      console.log(res);
      if(res.data.code===0){
        Toast.info('保存成功')
      }
    })
    .catch(e=>{
      console.log(e);
      console.log('特殊场景话术保存失败');
    })
    this.props.history.goBack();
  }

  applyRecommendGreet=(content)=>{
    console.log(content);
    this.setState({greetWords:content});
  }
  

  render(){
    return(
      <div style={{fontSize:'16px'}}>

        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />

        <WingBlank>
          <span>当识别对方来电为<b>{this.state.scene}</b>时，电话助理会回复：</span>
        </WingBlank>
        <WhiteSpace/>
        {this.state.singnal?<WingBlank><InputItem clear  value={this.state.greetWords} defaultValue={this.state.defaultGreetWords} onChange={this.onChange}></InputItem></WingBlank>:<div></div>}

        <WhiteSpace size="xl" />

        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
          {this.state.recommendGreets.map((item,i)=><div key={i} onClick={()=>{this.applyRecommendGreet(item)}}><OrangeTag content={item}/></div>)}
        </div>
        
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        
        <div style={{width:'100%',textAlign:'center',display:'flex',justifyContent:'space-around'}}>
          <span onClick={this.cancel}>
            <MyButton type="cancel" content="取消" />
          </span>
          <span onClick={this.save}>
            <MyButton type="confirm" content="保存" />
          </span>
          
        </div>
      </div>
      
    )
  }
}