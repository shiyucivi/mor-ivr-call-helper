// import { StorageUtil } from "./index";
import util from "./JsonUtil";
import http from "./httpRequest";
import {Toast} from "antd-mobile";

/**
 * nli 服务的接口
 */

const NLI_API = "https://apitest.xiaomor.com/api";

// const NLI_API = "http://101.201.148.192:8000/api/";

const Restfulv2 = "https://apitest.xiaomor.com/api/sales/v2/";

//基础用户信息
let key = "3099B87833837758";
let deviceid = "4f571004-58d5-a5f3-bb17-6ace89ccc8b1";
let latitude = "";
let longitude = "";
let type = "";
let timestamp = "";
let queryid = "";
let moraccountid = "288524041767232000";
let sign = "";
let userMobile = "";

const token = "yCYIu0mrT1QEPjajnw60U4a652gsCLdH";
//临时的
const MOR_SECRET = "24b9133ffda7085bcc19bd40309ac18e4eadfa39";

var HEADERS_FORM = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: ""
};

var HEADERS_JSON = {
    "Content-Type": "content-type: application/json"
};
var iosCallback = null;

var BASE_USER_INFO;

function getorSetUserInfo(json) {
    if (json) {
        util.setLocalStorage("userBaseInfo", json);
        key = json.key;
        // 之后改变
        // moraccountid = json.moraccountid;
        // deviceid = json.deviceid;
        latitude = json.latitude;
        longitude = json.longitude;
        type = json.type;
        // timestamp = json.timestamp;
        // queryid = json.queryid;
        // sign = json.sign;
        userMobile = json.userMobile;
    }
}

/**
 * @param {*} paramas
 * 请求ios端数据
 * 基础信息
 * 酒店、机票详情
 * base_info
 * air_detail
 * hotel_detail
 * exit
 * @param {*} callback
 */
iosCallback = function (paramas, callback) {
    window.getDataCallback = res => {
        callback(res);
    };
    window.webkit.messageHandlers.getData.postMessage(paramas);
};

/**
 * *公共参数
 */
var commom = {
    accountid: "",
    // actionname: "",
    deviceid: deviceid,
    key: key,
    // actionname: "",
    latitude: "40.008496",
    longitude: "116.351879",
    query: "",
    // service: "",
    moraccountid: moraccountid,
    // type: "",
    // userid: "",
    ver: "3.0"
};

var commom_corefer = {
    accountid: "",
    // actionname: "",
    deviceid: deviceid,
    key: key,
    // actionname: "",
    latitude: "40.008496",
    longitude: "116.351879",
    query: "",
    // service: "",
    moraccountid: moraccountid,
    // type: "",
    // userid: "",
    ver: "3.0",
    index: 1,
    id: 1
};
/**
 * 闭环服务的请求参数（包含公共参数和业务参数）：
 * http://47.94.58.108:4000/sale/apiv1.0/public-params.html
 */
var requestParams = {
    key: key,
    service: "Sale.handler",
    deviceid: deviceid,
    longitude: 0.0,
    latitude: 0.0,
    // type: "system",
    queryid: "",
    timestamp: "",
    actionname: "",
    moraccountid: moraccountid,
    // ver: "1.0",
    json: "{}"
};

/**
 *axios请求
 *
 * @param {*} url
 * @param {*} [data=null]
 * @param {string} [method="get"]
 * @param {*} [headers=HEADERS_FORM]
 * @param {*} [baseurl=NLI_API]
 * @returns
 */
function realFetch(
    url,
    data = null,
    method = "get",
    headers = HEADERS_FORM,
    baseurl = NLI_API
) {
    console.log(
        "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );
    console.log("┃ url: ", baseurl + url);
    console.log("┃ method: ", method);
    console.log("┃ headers: ", JSON.stringify(headers));
    console.log("┃ data: ", data);
    console.log(
        "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    );

    return new Promise((resolve, reject) => {
        Toast.loading("加载中...", 5);

        http({
            url: baseurl + url,
            data: data,
            headers: headers,
            method: method
        }).then(responseJson => {
            Toast.hide();
            // alert(JSON.stringify(responseJson));
            console.log("====================================");
            console.log("responseJson", responseJson);
            console.log("====================================");
            //获取转化后的数据responseJson、responseText、responseHtml
            /*return responseJson.movies; */
            resolve(responseJson);
        }).catch(error => {
            Toast.hide();
            reject(error);
        });
    });
}

function post(
    url,
    data = null,
    config = {type: "form "},
    headers = HEADERS_FORM
) {
    return realFetch(
        url,
        http.adornData(data, false, config.type),
        "post",
        headers
    );
}


function get(
    url,
    data = null,
    config = {type: "form "},
    headers = HEADERS_FORM
) {
    return realFetch(
        url,
        http.adornData(data, false, config.type),
        "get",
        headers
    );
}

/**
 *签名
 */
let getAuth = function (obj) {
    obj.queryid = util.getQueryId();
    obj.timestamp = util.getTimestamp();
    obj.sign = util.calSign(obj, MOR_SECRET);
    return obj;
};

export {
    NLI_API,
    HEADERS_JSON,
    realFetch,
    commom,
    commom_corefer,
    getAuth,
    post,
    get,
    getorSetUserInfo,
    iosCallback
};
