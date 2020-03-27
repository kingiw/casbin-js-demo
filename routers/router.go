package routers

import (
	"github.com/astaxie/beego"
	"github.com/kingiw/casbin-js-demo/controllers"
)

func init() {
    beego.Router("/", &controllers.MainController{})
}
