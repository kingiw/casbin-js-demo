package controllers

import (
	"github.com/astaxie/beego"
	"github.com/kingiw/casbin-js-demo/models"
)

type MainController struct {
	beego.Controller
}

type APIController struct {
	beego.Controller
}

type response struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

func (c *MainController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "index.tpl"
}

func (c *APIController) Get() {
	var resp response
	resp.Satus = "ok"
	resp.Data = models.GetProfiles("alice")
	c.Data["json"] = resp
	c.ServeJSON()
}
