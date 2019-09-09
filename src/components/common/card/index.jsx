import React from "react";

export default class Card extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <span className="titleLeft">{this.props.title}</span>
          <span className="titleRight">{this.props.t_r}</span>
        </div>
        {this.props.children}
        <div className="foot">
          <span className="titleLeft">{this.props.b_l}</span>
          <span className="titleRight">{this.props.b_r}</span>
        </div>
      </div>
    );
  }
}
