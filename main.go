package main

import (
	"github.com/astaxie/beego"
	"github.com/kingiw/casbin-js-demo/models"
	_ "github.com/kingiw/casbin-js-demo/routers"
)

func main() {
	models.InitEnforcer()
	beego.Run()
}
