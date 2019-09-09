import React from 'react'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        let queryObject = {};
        if (window.location.href.indexOf("?") !== -1) {
            let queryString = window.location.href.split("?")[1];
            let queryList = queryString.split("&");
            for (let i = 0; i < queryList.length; i++) {
                queryObject[queryList[i].split("=")[0]] = queryList[i].split("=")[1];
            }
            this.setState({phone: queryObject.phone})
        }
        console.log(queryObject);
        this.setState({queryObject: queryObject});
        window.localStorage.setItem("key", queryObject.key);
        window.localStorage.setItem("uid", queryObject.uid);
        window.localStorage.setItem("token", queryObject.token);
        window.localStorage.setItem("guid", queryObject.openId);
        window.localStorage.setItem("phone", queryObject.phone);
        if (queryObject.id === "1") {
            this.props.history.push("/phone_helper/call_mor");
        } else if (queryObject.id === "2") {
            this.props.history.push("/phone_helper/app_page");
        } else if (queryObject.id === "3") {
            this.props.history.push({
                pathname: "/transfer",
                query: {
                    to: "3",
                    id: queryObject.msgId
                }
            });
        } else if (queryObject.id === "4") {
            this.props.history.push("/dialog/detail/" + queryObject.msgId);
        }
    }

    componentDidMount() {

    }


    render() {

        return (
            <div>
            </div>

        )
    }
}