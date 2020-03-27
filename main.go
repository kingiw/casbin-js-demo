package main

import (
	"github.com/astaxie/beego"
	_ "github.com/kingiw/casbin-js-demo/routers"
)

func main() {
	beego.Run()
}

