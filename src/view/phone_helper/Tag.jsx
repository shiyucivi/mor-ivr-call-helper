import React from 'react'

export default class Tag extends React.Component{
  constructor(props){
    super(props);
    this.state={
      content:props.content,
    }
  }

  // onClick=(f)=>{
  //   let checked=!this.state.checked
  //   this.setState({checked})
  //   f();
  // }


  render(){
    return (
    <div 
      style={this.props.checked?{margin:'10px 10px',width:'80px',height:'40px',textAlign:'center',lineHeight:'40px',border:'1px solid #a3a3a3',borderRadius:'5px',fontSize:'18px',color:'#333333',backgroundColor:'rgb(230,230,230'}:
        {margin:'10px 10px',width:'80px',height:'40px',textAlign:'center',border:'1px solid #a3a3a3',lineHeight:'40px',borderRadius:'5px',fontSize:'18px',color:'#808080',backgroundColor:'rgb(255,255,255'}}
      >
      {this.state.content}
    </div>
    )
  }
}