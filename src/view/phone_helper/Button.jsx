import React from 'react'

export default class MyButton extends React.Component{
  constructor(props){
    super(props)
    this.state={
      content:props.content,
      type:props.type
    }
  }
  render(){
    if(this.state.type=="cancel"){
      return <span style={{padding:'20px 50px',backgroundColor:'#e6e6e6',fontSize:'18px',borderRadius:'30px',color:'#808080'}}>{this.state.content}</span>
    }
    else if(this.state.type=="confirm"){
      return <span style={{padding:'20px 50px',backgroundColor:'#F5AB00',fontSize:'18px',borderRadius:'30px',color:'#fff'}}>{this.state.content}</span>
    }
  }
} 