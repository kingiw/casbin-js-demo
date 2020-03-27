package routers

import (
	"github.com/astaxie/beego"
	"github.com/kingiw/casbin-js-demo/controllers"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/api/get-policies", &controllers.APIController{})
}
