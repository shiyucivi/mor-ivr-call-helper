import React from "react";
import API from "../../components/api";
import Card from "../../components/common/card";
import {ListView, TextareaItem, Button, WhiteSpace, WingBlank, Toast} from 'antd-mobile';
import "./index.css";

// let index = 0;

class MorNliTalk extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource: dataSource.cloneWithRows({}),
            isLoading: true,
            dataArr: [],
            pageIndex: 1,
            page_size: 10,
            query: "",
            nli_domain: "",
            nli_type: "",
            flight_ticket: [{
                act_flight_company: "",
                act_flight_no: "",
                cheap_info: "",
                correct: "",
                dst_city: "",
                dst_city_code: "",
                duration: "",
                end_time1: "",
                is_ad: 0,
                is_cheap: false,
                is_direct: false,
                logo_url: "",
                org_city: "",
                org_city_code: "",
                remain_num: "0",
                share_flag: false,
                start_date: "",
                start_time1: "",
                start_week_day: "",
                stop_airport_code: "",
                stop_airport_name: "",
                stop_city_code: "",
                stop_city_name: "",
                stop_flag: false,
                stop_number: 0,
                sum_price: "",
            }],
            flight_seat_info: [{
                agent_domain: "",
                airport_tax: -1,
                bare_price: -1,
                base_price: -1,
                business_ext: "",
                cabin: "",
                carrier: "",
                company: "",
                correct: "",
                discount: "",
                dstAirport_ter: "",
                dst_city_code: "",
                dst_station: "",
                duration: "",
                end_date: "",
                end_time: "",
                extra_lvl2: "",
                flight_no: "",
                flight_type: "",
                fuel_tax: -1,
                insurance_fee: "",
                is_ad: -1,
                meal: false,
                orgAirport_ter: "",
                org_city_code: "",
                org_station: "",
                policy_id: "",
                policy_type: "",
                price: -1,
                product_tag: "",
                remain_num: -1,
                seat_name: "",
                start_date: "",
                start_time: "",
                start_week_day: "",
                ticket_price: -1,
                wrapper_id: "",
            }]
        };
    }

    airLineRenderItem = (res,item_index) => {
        return (
            <div className="container" onClick={() =>{
                Toast.loading();
                API.nliSelect("flight","flight_ticket",parseInt(item_index)+1,"").then(res => {
                    this.dispatchRes(res);
                },() => {
                    Toast.hide();
                })
            }}>
                <Card title={res.act_flight_no} t_r={res.act_flight_company} b_l={res.start_time1} b_r={res.end_time1}>
                    <span className="container">
                        <span className="airtitle"> {res.org_city}</span>
                        {/* <img
                        src={require("../../../../assets/ic_orders_airticket_arrow_right@2x.png")}
                        style={{
                            width: "150px",
                            height: "15px",
                            margin: "10px"
                        }}
                    /> */}
                        <span>    &lt;---------------&gt;    </span>
                        <span className="airtitle">{res.dst_city}</span>
                    </span>
                    <div className="grayText">{res.start_date}</div>
                </Card>
            </div>
        );
    };

    seatInfoRenderItem = res => {
        return (
            <div className="container">
                <Card title={res.flight_no} t_r={res.company} b_l={"历时：" + res.duration} b_r={res.correct}>
                    <span className="container">
                        <span className="airtitle"> {res.org_city_code}({res.org_station})</span>
                        {/* <img
                        src={require("../../../../assets/ic_orders_airticket_arrow_right@2x.png")}
                        style={{
                            width: "150px",
                            height: "15px",
                            margin: "10px"
                        }}
                    /> */}
                        <span>    &lt;---------------&gt;    </span>
                        <span className="airtitle">{res.dst_city_code}({res.dst_station})</span>
                    </span>
                    <div>{res.bare_price}</div>
                </Card>
            </div>
        );
    };

    dispatchRes = (res) =>{
        console.log(res);
        // alert("fetch"+JSON.stringify(res));
        // let dataArr = this.state.dataArr;
        this.setState({
            nli_domain: res.domain,
            nli_type: res.content.type
        });
        // this.dataArr = [];
        switch (res.domain) {
            case "flight":
                switch (res.content.type) {
                    case "flight_ticket":
                        if (res.content.reply.flight_ticket) {
                            let dataArr = [];
                            for (let i = 0; i < res.content.reply.flight_ticket.length; i++) {
                                //每一次读取的数据都进行保存一次
                                dataArr.push(`row - ${this.state.pageIndex * res.content.reply.flight_ticket.length + i}`);
                                // m.push(res[i]);
                            }
                            // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            this.setState({
                                flight_ticket: res.content.reply.flight_ticket,
                                dataSource: this.state.dataSource.cloneWithRows(dataArr),
                                isLoading: false,
                                dataArr: dataArr
                            }, () => {
                                Toast.hide();
                            })
                        }
                        break;
                    case "flight_seat_info":
                        if (res.content.reply.flight_seat_info) {
                            let dataArr = [];
                            for (let i = 0; i < res.content.reply.flight_seat_info.length; i++) {
                                //每一次读取的数据都进行保存一次
                                dataArr.push(`row - ${this.state.pageIndex * res.content.reply.flight_seat_info.length + i}`);
                                // m.push(res[i]);
                            }
                            // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
                            this.setState({
                                flight_seat_info: res.content.reply.flight_seat_info,
                                dataSource: this.state.dataSource.cloneWithRows(dataArr),
                                isLoading: false,
                                dataArr: dataArr
                            }, () => {
                                Toast.hide();
                            })
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    };

    morNliTalk = () => {
        API.nliTalk(this.state.query).then(res => {
            this.dispatchRes(res);
        }).catch(error => {
            console.log(error);
        });
    };

    componentDidMount() {
        // this.morNliTalk();
        // this.setState({
        // })
    }


    handleQuery = (event) => {
        Toast.loading();
        if (event) event.preventDefault();
        this.setState({
            query: this.state.inputValue.state.value,
        }, () => {
            this.morNliTalk();
        })
    };

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 3,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );

        let index = 0;
        if (this.state.nli_type === "flight_ticket") {
            index = this.state.flight_ticket.length - 1;
        } else if (this.state.nli_type === "flight_seat_info") {
            index = this.state.flight_seat_info.length - 1;
        }

        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                if (this.state.nli_type === "flight_ticket") {
                    index = this.state.flight_ticket.length - 1;
                } else if (this.state.nli_type === "flight_seat_info") {
                    index = this.state.flight_seat_info.length - 1;
                }
            }
            if (this.state.nli_type === "flight_ticket") {
                const flight = this.state.flight_ticket[index--];
                // index = index -1;
                return (
                    <div key={rowID} style={{padding: '0 15px'}}>
                        <WhiteSpace size="lg"/>
                        <WingBlank size="md">
                            {this.airLineRenderItem(flight,rowID)}
                        </WingBlank>
                    </div>
                );
            } else if (this.state.nli_type === "flight_seat_info") {
                const flight = this.state.flight_seat_info[index--];
                // index = index -1;
                return (
                    <div key={rowID} style={{padding: '0 15px'}}>
                        <WhiteSpace size="lg"/>
                        <WingBlank size="md">
                            {this.seatInfoRenderItem(flight)}
                        </WingBlank>
                    </div>
                );
            } else {
                alert("暂不支持此功能")
            }
        };

        return (
            <div>
                <span>
                    <WingBlank>
                        <TextareaItem
                            title="QUERY："
                            placeholder="在此输入您想问小蓦的！"
                            data-seed="logId"
                            ref={input => this.state.inputValue = input}
                        />
                        <Button type="primary" onClick={this.handleQuery}>
                            执行请求
                            </Button>
                    </WingBlank>
                    <WhiteSpace size="sm"/>
                </span>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderHeader={() =>
                        <div>
                            下面是小蓦为您找到的:{this.props.query}
                        </div>}
                    renderFooter={() => (
                        <div style={{padding: 30, textAlign: 'center'}}>
                            {this.state.isLoading ? '小蓦请求中' : '上面是您要找的！'}
                        </div>)}
                    renderRow={row}
                    horizontal = {true}
                    renderSeparator={separator}
                    className="am-list"
                    pageSize={10}
                    useBodyScroll
                    onScroll={() => {
                        console.log('scroll');
                    }}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={1000}
                />
            </div>
        );
    }
}

export default MorNliTalk;