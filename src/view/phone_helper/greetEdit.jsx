import React from 'react'
import {WingBlank,WhiteSpace,Tabs,Badge,Button,InputItem,Toast,TextareaItem} from 'antd-mobile';
import MyButton from './Button.jsx'
import axios from 'axios';
import { timingSafeEqual } from 'crypto';


let key=window.localStorage.getItem("key");
let moraccountid=window.localStorage.getItem("uid");
let token=window.localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] ="Bearer "+token
let data={"url":"xiaomor.com"}
axios.post(`https://openapi.xiaomor.com/api/user/base/getWeChatCameraInfo?key=${key}&moraccountid=${moraccountid}&ver=2.0`,JSON.stringify(data),{headers:{"Content-Type":"applicayion/json"}})
      .then(res=>{console.log("微信配置↓");console.log(res)})
      .catch(e=>{console.log("请求微信配置信息错误↓");console.log(e)})



export default class GreetEdit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      greetText:'',   //问候语
      singnal:false, //是否开始渲染表单的信号（用于重渲染默认值）
      localId:'',
      hasVoice:false    
    }
  }

  componentWillMount(){
    let greetText=window.localStorage.getItem('greetText');
    if(greetText){
      this.setState({greetText:greetText,singnal:true})
    }else{
      this.setState({greetText:"您好，有什么事吗",singnal:true})
    }
  }

  componentDidMount(){
    
  }

  onChange=(value)=>{
    this.setState({greetText:value});
  }
  

  /*
  //从后端获取录音
  getVoice=()=>{
    this.setState({hasVoice:true})
  }
  //开始录音
  startRecord=()=>{
    wx.startRecord();
  }
  //结束录音
  stopRecord=()=>{
    wx.stopRecord({
      sucess:function(res){
        this.setState({loaclId:res.localId,hasVoice:true})
      }
    })
    
  }
  //播放录音
  playAudio=()=>{
    wx.playVoice({loaclId:this.state.loaclId})
  }
  //暂停播放录音
  pauseAudio=()=>{
    wx.pauseVoice({loaclId:this.state.localId})
  }
  //保存并上传录音
  saveVoice=()=>{
    //首先要把录音上传到微信服务器，上传成功会返回一个serverId，然后再提交到mor服务器
    let serverId;
    wx.uploadVoice({
      localId:loaclId,
      isShowProgressTips:0,
      sucess:function(res){
        let serverId=res.serverId;
        console.log('上传成功'+res.serverId)
      }
    })
  }
  */
  
  
  //保存文本问候语
  saveGreetWord=()=>{
    let key=window.localStorage.getItem("key");
    let moraccountid=window.localStorage.getItem("uid");
    let token=window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    let data={"type":"0","text":this.state.greetText}
    axios.defaults.headers.common['Authorization'] ="Bearer "+token
    axios.post(`https://apitest.xiaomor.com/api/webtest/ivr/updateWelcome?key=${key}&moraccountid=${moraccountid}&guid=${guid}`,JSON.stringify(data),{headers:{'Content-Type':'application/json'}})
    .then((res)=>{
      console.log(res)
      if(res.data.code===0){
        Toast.info('保存成功');
        window.localStorage.setItem("greetText",this.state.greetText)
      }
      this.props.history.goBack();
    })
  }

  cancel=()=>{
    this.props.history.goBack();
  }


  render(){
    const tabs=[
      //{title:<Badge>录制真人问候语</Badge>},
      {title:<Badge>播报文本问候语</Badge>},
    ]
    return(
      <div>
        <Tabs tabs={tabs} initialPage={0}>
          {/*
          <div>
            <WhiteSpace/>
            <WingBlank>
              <span>
                <span style={{color:'#808080',fontSize:'16px'}}>您可以录制个性化的问候语，也可以参考以下文字进行录制：<br/></span>
                <span style={{fontSize:'16px',lineHeight:'26px'}}>
                  您好有什么事吗？<br/>
                  您好，您是哪位，有什么事？<br/>
                  您好，我现在有事正忙，请给我的电话助理留言<br/>
                </span>
              </span>
            </WingBlank>
            <WhiteSpace/>

            <WingBlank>
              <span style={{fontSize:'16px',lineHeight:'26px'}}>电话助理会在接到电话时播报问候语：</span>
            </WingBlank>
            
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />

            <WingBlank>
              <Button type="default" style={{borderColor:"#000",color:"#808080"}} >长按录音(10s以内)</Button>
            </WingBlank>
            <WhiteSpace />
            <div style={{display:"flex",justifyContent:"space-around",marginTop:"30px"}}>
              <span onClick={this.cancel}><MyButton type="cancel" content="取消" /></span>
              <span onClick={this.saveAudioReply}><MyButton type="confirm" content="保存"/></span>
            </div>

            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />

          </div>
          */}

          <div>
            <WhiteSpace/>
            <div>
              <WingBlank>
                <span style={{color:'#808080',fontSize:'16px'}}>智能电话助理会在接到电话时播报问候语：</span>
              </WingBlank>
              <WhiteSpace />
              
              {this.state.singnal?<InputItem clear defaultValue={this.state.greetText} onChange={this.onChange}>问候语</InputItem>:<InputItem clear onChange={this.onChange}>问候语</InputItem>}

            </div>

            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />


            <div style={{display:"flex",justifyContent:"space-around"}}>
              <span onClick={this.cancel}><MyButton type="cancel" content="取消" /></span>
              <span onClick={this.saveGreetWord}><MyButton type="confirm" content="保存"/></span>
            </div>
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />
            <WhiteSpace size="xl" />


          </div>
        </Tabs>
        
      </div>
      
    )
  }
}