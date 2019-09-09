import React from 'react'

export default class OrangeTag extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <div style={{width:'320px',height:'60px',marginTop:'20px',paddingTop:'20px',paddingLeft:'10px',paddingRight:'10px',backgroundColor:'#FFF2E5',borderRadius:'0 20px 20px 20px',fontSize:"16px",color:'#D48B46'}}>
      {this.props.content}
    </div>
  }
} 