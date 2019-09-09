import React from 'react';
import './App.css';
import InputPhone from "./view/InputPhone";
import CallMor from "./view/CallMor";
import CallSelf from "./view/CallSelf";
import ConfirmCall from "./view/phone_helper/ConfirmCall";
import Result from "./view/Result";
import ServiceProtocol from "./view/phone_helper/ServiceProtocol"
import ServiceHelp from "./view/phone_helper/ServiceHelp"
import Dialog from "./view/dialog/"
//主页
import HomePage from './view/phone_helper/homePage'
//中转页
import TransferPage from './view/phone_helper/transfer'

import AppPage from './view/phone_helper/appPage'
//进入录音或文本播报设置
import GreetEdit from './view/phone_helper/greetEdit'
//进入特定场景类型的话术设置
import SpecialGreetEdit from './view/phone_helper/SpecialGreetEdit';
//取消电话助手界面
import CancelPhoneHelper from './view/CancelPhoneHelper'
import {HashRouter, Route, Switch} from "react-router-dom";
import CacheRoute,{CacheSwitch} from 'react-router-cache-route'

// import TestList from "./components/view/search/test";

class App extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <CacheSwitch>
                        <Route path="/" exact component={TransferPage}/>
                        <Route path="/transfer" component={TransferPage}/>

                        <Route path="/dialog/detail/:id" exact component={Dialog}/>
                        <Route path="/phone_helper/register" exact component={InputPhone}/>
                        <Route path="/phone_helper/call_mor" exact component={CallMor}/>
                        <Route path="/phone_helper/call_self" exact component={CallSelf}/>
                        <Route path="/phone_helper/confirm_call" exact component={ConfirmCall}/>
                        <Route path="/phone_helper/result" exact component={Result}/>
                        <Route path="/phone_helper/service_help" exact component={ServiceHelp}/>
                        <Route path="/phone_helper/service_protocol" exact component={ServiceProtocol}/>

                        <Route path="/phone_helper/home_page" exact component={HomePage}/>
                        <CacheRoute path="/phone_helper/app_page" exact component={AppPage}/>
                        <Route path="/phone_helper/greet_edit/" component={GreetEdit}/>
                        <Route path="/phone_helper/special_greet_edit/:type/:id" component={SpecialGreetEdit}/>
                        <Route path="/phone_helper/cancelphonehelper/:phone" component={CancelPhoneHelper}/>
                    </CacheSwitch>
                </HashRouter>
            </div>
            // <TestList></TestList>
        );
    }
}

export default App;
