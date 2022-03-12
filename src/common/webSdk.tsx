import React from "react";
import { getCookie, setCookie } from './utils';
import { OPENIDKEY } from './constant';
import {Modal, Input, Toast, Tooltip, Button} from "@douyinfe/semi-ui";
import "./websdk.less";
import {IconHelpCircle} from "@douyinfe/semi-icons";

const myCloud:any = new window.cloud.Cloud({
    appid: 'wx56f18e2958172116',
    // 必填，表示是未登录模式
    identityless: true,
    // 资源方 AppID
    resourceAppid: 'wx027c26a5366185b9',
    // 资源方环境 ID
    resourceEnv: 'diablo-ugsbd',
})

// 跨账号调用，必须等待 init 完成
// init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、访问时长以及可自定义安全规则
myCloud.init().then(() => {
    window.myCloud = myCloud;
});

function checkAuth() {
    if (getCookie(OPENIDKEY)) {
        return true
    }
    let verifyCode = '';
    Modal.info({
        title: '关注公众号',
        width: 370,
        content: <div>
            <div className="gzh">
            </div>
            <div>
                <div>在公众号内回复<span style={{ fontWeight: 'bold'}}>验证码</span>获取
                    <Tooltip content="仅用于获取用户唯一openId，不能获取微信号，不会造成隐私泄露">
                        <IconHelpCircle size="small" />
                    </Tooltip>
                </div>
                <Input onChange={(value) => verifyCode = value } placeholder="请输入验证码" />
            </div>
        </div>,
        onOk: () => {
            return new Promise(async (resolve, reject) => {
                if (!verifyCode) {
                    Toast.error('验证码不能为空！');
                    reject();
                    return
                }
                myCloud.callFunction({
                    name: 'web-login',
                    data: {
                        verifyCode
                    }
                }).then((res:any) => {
                    if (res?.result?.openId) {
                        setCookie(OPENIDKEY, res.result.openId, 30);
                        resolve(res.result.openId);
                    } else {
                        Toast.error('验证码无效，请重新获取！');
                        reject();
                    }
                }).catch((err:any) => {
                    Toast.error('接口调用异常！');
                    reject();
                })
            })

        }
    });
    return false;
}

async function getGroups() {
    const openId = getCookie(OPENIDKEY);
    if (!openId) {
        return null
    }
    const res = await myCloud.callFunction({
        name: 'getGroups',
        data: {
            openId
        }
    }).catch((err:any) => {
        Toast.error('接口调用异常！');
    })
    if (res?.result?.group) {
        return res.result.group
    }
    return null;
}

async function saveGroups(groups: Array<any>) {
    const openId = getCookie(OPENIDKEY);
    if (!openId) {
        return null
    }
    const res = await myCloud.callFunction({
        name: 'saveGroups',
        data: {
            openId,
            groups
        }
    }).catch((err:any) => {
        Toast.error('接口调用异常！');
    })
    if (res?.result?.flag) {
        return true
    }
    return null;
}

export default {
    checkAuth,
    getGroups,
    saveGroups
}



