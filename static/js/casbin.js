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
        this.user = null;
    }

    // For communication with the server with a casbin api
    _getUserProfiles(user) {
        return fetch(`${this.endPoint}?sub=${user.toLowerCase()}`).then(res => res.json()).then(res => {
            // Call enforcer to update the profiles and page
            let profiles = res.data;
            this.updateProfiles(profiles);
        })
    }

    _updatePage() {
        let elems = document.getElementsByClassName("casbin");
        for (let i = 0; i < elems.length; ++i) {
            this.updateElement(elems[i]);
        }
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
        // User identity is changed
        if (user != this.user) {
            this.user = user;
            this._getUserProfiles(user).then(res => {
                this._updatePage();
            })
        } else {
            this._updatePage();
        }
    }

    updateElement(element) {
        let classes = element.className.split(' ');
        let updated = false;
        classes.forEach(className => {
            if (className in this.objActProfiles) {
                this.objActProfiles[className].forEach(act => {
                    handlers[act][0](element);
                });
                updated = true;
            }
        })
        if (!updated) {
            handlers['allow'][1](element);
        }
    }
}

