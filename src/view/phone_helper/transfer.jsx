//用来决定是跳转到微信还是普通浏览器的页面
import React from 'react'
//import {} from 'antd-mobile'

export default class Transfer extends React.Component {
    isWXorBrowser() {
        var rst = true
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            var ua = navigator.userAgent.toLowerCase();
            if (!(ua.match(/MicroMessenger/i) == "micromessenger")) {
                rst = false;
            }
        } else {
            rst = false;
        }
        return rst;
    }

    componentWillMount() {
        let data = this.props.location.query;
        if (this.isWXorBrowser() === true) {
            console.log(this.props.match.params.to);
            console.log("--->1");
            if (data && data.to && data.to === "3") {
                console.log("--->2");
                //跳转消息详情
                let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39e8a7332491a46d&redirect_uri=https%3A%2F%2Fapi.xiaomor.com%2Fapi%2Fweb%2Fwxpayh5%2F&response_type=code&scope=snsapi_base&state=IVR_Subscribe_Auto_Login_Msg-${data.id}#wechat_redirect`;
                window.location.href = url;
            } else {
                console.log("--->3");
                //跳转自动登录
                if (data && data.id) {
                    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39e8a7332491a46d&redirect_uri=https%3A%2F%2Fapi.xiaomor.com%2Fapi%2Fweb%2Fwxpayh5%2F&response_type=code&scope=snsapi_base&state=IVR_Subscribe_${data.id}#wechat_redirect`;
                    window.location.href = url;
                } else {
                    let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39e8a7332491a46d&redirect_uri=https%3A%2F%2Fapi.xiaomor.com%2Fapi%2Fweb%2Fwxpayh5%2F&response_type=code&scope=snsapi_base&state=IVR_Subscribe_Auto_Login#wechat_redirect";
                    window.location.href = url;
                }
            }
        } else {
            console.log("--->4");
            this.props.history.push('/phone_helper/register')
        }
    }

    render() {
        return <div></div>
    }
}