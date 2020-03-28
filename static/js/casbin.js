function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

class Enforcer {
    constructor(handlers, endPoint="") {
        this.endPoint = endPoint 
            || `${location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')}/api/get-profiles`;
        this.handlers = handlers;
        this.profiles = null;
    }

    // For communication with the server with a casbin api
    _getUserProfiles(user) {
        return fetch(`${this.endPoint}?sub=${user.toLowerCase()}`).then(res => res.json()).then(res => {
            // Call enforcer to update the profiles and page
            let profiles = res.data;
            this.updateProfiles(profiles);
        })
    }
    
    updateProfiles(profiles) {
        this.actObjProfiles = profiles; // Action-oriented: {act1:[obj1,obj2],act2:[obj2,obj3]}
        this.objActProfiles = {};  // Object-oriented: {obj1:[act1],obj2:[act1,act2],obj3:[act2]}
        for (let act in this.actObjProfiles) {
            this.actObjProfiles[act].forEach(obj => {
                if (!(obj in this.objActProfiles)) {
                    this.objActProfiles[obj] = [];
                } 
                this.objActProfiles[obj].push(act);
            })
        }
    }

    updatePage(user) {
        this._getUserProfiles(user).then(res => {
            for (let act in this.actObjProfiles) {
                this.actObjProfiles[act].forEach(obj => {
                    let elems = document.getElementsByClassName(obj);
                    for (let i = 0; i < elems.length; ++i) {
                        this.handlers[act](elems[i]);
                    }
                })
            }
        })
    }
}

