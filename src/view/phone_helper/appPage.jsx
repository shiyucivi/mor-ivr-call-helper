import React from 'react'
import {Badge, Tabs} from 'antd-mobile';
import './homePage.css'

import HelperEdit from './helperEdit.jsx'
import CallRecord from './callRecord.jsx';
import UserEdit from './UserEdit.jsx'


export default class AppPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queryObject: {},
        }
    }

    componentWillMount() {
    }

    componentDidMount() {

    }


    render() {
        const tabs = [
            {title: <Badge>接听记录</Badge>},
            {title: <Badge>助理设置</Badge>},
            {title: <Badge>账号管理</Badge>}
        ]
        return (
            <div>
                <Tabs tabs={tabs} initialPage={0} tabBarActiveTextColor='#eeab00' tabBarUnderlineStyle={{borderColor:'#eeab00'}}>
                    <div>
                        <CallRecord guid = {this.state.queryObject.openId} uid={this.state.queryObject.uid}
                                    morkey={this.state.queryObject.key} token={this.state.queryObject.token}/>
                    </div>
                    <div>
                        <HelperEdit guid = {this.state.queryObject.openId} uid={this.state.queryObject.uid}
                                    morkey={this.state.queryObject.key} token={this.state.queryObject.token}/>
                    </div>
                    <div>
                        <UserEdit></UserEdit>
                    </div>
                </Tabs>

            </div>

        )
    }
}