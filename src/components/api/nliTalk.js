import util from "../util/JsonUtil";
import {commom, post,commom_corefer} from "../util/fetch";
// import JsonUtil from "../util/JsonUtil";

/**
 * 发起NLI query请求
 */
const nliTalk = req => {
    let obj = util.deepClone(commom);
    obj.query = req;
    return post("/nli",obj).then(res => {
        if(res.status === 200) {
            // Toast.info(_res.content.display,2);
            return res.data.data;
        }else {
            return null;
        }
    });

};

const nliSelect = (domain,type,index,id) => {
    let obj = util.deepClone(commom_corefer);
    const url = "/"+ domain + "/" + type + "/corefer";
    obj.id = id;
    obj.index = index;
    return post(url,obj).then(res => {
        if(res.status === 200) {
            // Toast.info(_res.content.display,2);
            return res.data.data;
        }else {
            return null;
        }
    });

};

export {nliTalk,nliSelect};