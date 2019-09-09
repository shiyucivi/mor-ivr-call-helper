import util from "../util/JsonUtil";
import {commom, post} from "../util/fetch";
import {Toast} from "antd-mobile";

/**
 * 发起NLI query请求
 */
const ivrInfo = id => {
    let obj = util.deepClone(commom);
    return post("/webtest/ivr/info/" + id, obj).then(res => {
        if (res.status === 200 && res.data !== null && res.data.code === 0) {
            return res.data;
            // Toast.info(res, 2);
            // return null;
        } else {
            Toast.info("获取数据失败" + res.data !== null ? res.data.msg : "", 2);
            return null;
        }
    });
};

export {ivrInfo};