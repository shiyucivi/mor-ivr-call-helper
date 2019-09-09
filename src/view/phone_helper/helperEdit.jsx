import React from 'react'
import {WingBlank,WhiteSpace,List,Radio,NavBar, Flex,Button} from 'antd-mobile'
import Tag from './Tag.jsx'
import MyButton from './Button.jsx'

import axios from 'axios'

import {withRouter} from 'react-router-dom'

import './suspension.css'


const Item=List.Item

const RadioItem=Radio.RadioItem;

class HelperEdit extends React.Component{
  constructor(props){
    super(props);
    this.state={
      morkey:props.morkey,
      token:props.token,
      uid:props.uid,
      value:0,
      //智能应答话术的数据
      gender:0,  //性别 0女 1男
      greetSkills:[{
        replyText:'a',
        type:'a',
        id:0,
        typeText:'a'
      }],   //用来存储服务器返回的所有话术
      visibleGreetSkills:[{
        replyText:'a',
        type:'a',
        id:0,
        typeText:'a'
      }],    //用来存储可以显示的话术
      greetTypes:[],  //用来存储已设置话术类型的ID
      visible:false    //悬浮窗是否可见
    }
  }

  componentWillMount(){
    this.getEditedTalkWords();
  }
  

  getEditedTalkWords=()=>{
    //http://apitest.xiaomor.com/api/webtest/ivr/preset?key=MTAS2A3E74452E38&moraccountid=613852149855551488
    let key = window.localStorage.getItem("key");
    let uid = window.localStorage.getItem("uid");
    let token = window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/preset?key=${key}&moraccountid=${uid}&guid=${guid}`, {headers: {"Authorization": `Bearer ${token}`}})
    .then(res=>{
      console.log('特定场景话术↓');
      console.log(res);
      this.setState({gender:res.data.data.gender,greetSkills:res.data.data.replies});
    })
    .then(()=>{
      let visibleGreetSkills=[];
      for(let i=0;i<this.state.greetSkills.length;i++){
        if(this.state.greetSkills[i].status===0){
          visibleGreetSkills.push(this.state.greetSkills[i])
        }
      }
      this.setState({visibleGreetSkills:visibleGreetSkills});
      console.log(this.state.greetSkills);

      let greetTypes=[];
      for(let i=0;i<this.state.greetSkills.length;i++){
        greetTypes.push({id:this.state.greetSkills[i].id,content:this.state.greetSkills[i].typeText,checked:this.state.greetSkills[i].status==0})
      }
      this.setState({greetTypes:greetTypes});

    })
    .catch(e=>{console.log('特定场景话术请求错误↓');console.log(e)})
  }
  
  editGreetReply=()=>{
    this.props.history.push("/phone_helper/greet_edit/");
  }

  onGenderChange=(value)=>{
    console.log("value"+value)
    this.setState({gender:value});
    let key = window.localStorage.getItem("key");
    let uid = window.localStorage.getItem("uid");
    let token = window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    axios.get(`https://apitest.xiaomor.com/api/webtest/ivr/updateIvrGender?key=${key}&moraccountid=${uid}&gender=${value}`,{headers:{"Authorization":`Bearer ${this.state.token}`}})
    .then(res=>{
      console.log(res)
    })
  }
  //进入设置页面
  editSpecialGreet=(type,id)=>{
    this.props.history.push("/phone_helper/special_greet_edit/"+type+"/"+id)
  }
  //

  //选择话术类型的悬浮窗
  addGreetType=()=>{
    this.setState({visible:true});
  }
  //取消显示悬浮窗
  removeSuspension=()=>{
    this.setState({visible:false});
  }

  //将要添加或移除的话术储存进数组并发送
  changeTypes=(checked,id)=>{
    let arr=[];
    for(let i=0;i<this.state.greetTypes.length;i++){
      if(this.state.greetTypes[i].checked===true){
        arr.push(this.state.greetTypes[i].id);
      }
    }
    console.log(arr);

    let key = window.localStorage.getItem("key");
    let moraccountid = window.localStorage.getItem("uid");
    let token = window.localStorage.getItem("token");
    let guid = window.localStorage.getItem("guid");
    axios.defaults.headers.common['Authorization'] ="Bearer "+token
    axios.post(`https://apitest.xiaomor.com/api/webtest/ivr/updatePreset?key=${key}&moraccountid=${moraccountid}&guid=${guid}`, JSON.stringify(arr), {headers: {'Content-Type': 'application/json'}})
    .then((res)=>{
      console.log(res);
      if(res.data.code===0){
        this.getEditedTalkWords();
      }
      this.removeSuspension();
    }).catch(e=>{
      console.log("保存失败"+e);
      this.removeSuspension();
    })
    
  }
  clickTag=(item)=>{
    console.log(item);
    let arr=this.state.greetTypes;
    for(let i=0;i<arr.length;i++){
      if(item.id===arr[i].id){
        arr[i].checked=!arr[i].checked;
        break;
      }
    }
    this.setState({greetTypes:arr});
    console.log(arr)
  }



  render(){
      const genders=[{value:0,label:'女性电话助理'},{value:1,label:'男性电话助理'}]
      //const value=this.state.value
      let gender=this.state.gender

      let height=document.documentElement.clientHeight
      let suspensionContainer={
        position: 'fixed',
        width:'100%',
        height:height,
        display: 'flex',
        justifyContent: 'center',
        zIndex: '998',
        backgroundColor: 'rgba(144,144,144,0.8)',
        overflow:'visible'
      }

      return (<div style={{height:height}}>

        <div style={this.state.visible?suspensionContainer:{display:'none'}}>
          <div className={this.state.visible?"suspension-visible":"suspension-unvisible"}>
            <div style={{display:'flex',justifyContent:'spaceAround',flexWrap:'wrap',height:'200px',marginTop:'40px'}}>
              {this.state.greetTypes.map((item,i)=>{
                return<div onClick={(e)=>this.clickTag(item)} key={i}>
                <Tag content={item.content} key={i} checked={item.checked} />
                </div>
              })}
            </div>

            <WhiteSpace size="xl" />
            
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',width:'100%'}}>
              <span onClick={this.removeSuspension}>
                <MyButton type="cancel" content="取消" />
              </span>
              <span onClick={this.changeTypes}>
                <MyButton  type="confirm" content="保存" />
              </span>
            </div>

            <WhiteSpace size="xl" />
            
          </div>
        </div>

        <div>
          
          <WhiteSpace/>
          <WingBlank>
          <span>问候语</span>
          </WingBlank>
          <WhiteSpace/>
          <Button  onClick={this.editGreetReply}>设置问候语</Button>
          <WhiteSpace/>

          
          <WingBlank>
            <WhiteSpace/>
            <span>助理性别</span>
            <WhiteSpace/>
          </WingBlank>
          <List>
            <WingBlank>
            {genders.map(i => (
              <RadioItem key={i.value} checked={this.state.gender===i.value} onChange={() => this.onGenderChange(i.value)}>
                {i.label}
              </RadioItem>
            ))}
            </WingBlank>
          </List>

          

          <WhiteSpace/>
          <NavBar mode='light' rightContent={<span onClick={this.addGreetType} style={{color:'#eeab00'}}>+添加话术</span>}>智能应答话术</NavBar>
          <WhiteSpace/>
        
          <List>
            <WingBlank>
            {this.state.visibleGreetSkills.map((item,i)=>
              (<Item arrow="horizontal" extra={item.replyText} key={i} onClick={()=>this.editSpecialGreet(item.type,item.id)}>
                {item.typeText}
              </Item>)
            )}
            </WingBlank>
          </List>
          
          </div>
        
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />

    </div>)   
  }
}

export default withRouter(HelperEdit)

