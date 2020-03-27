package controllers

import (
	"encoding/json"
	"fmt"

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
	// c.Data["Website"] = "beego.me"
	// c.Data["Email"] = "astaxie@gmail.com"
	// c.TplName = "index.tpl"
	subject := c.Ctx.GetCookie("CasbinUser")
	fmt.Println("Subject: ", subject)
	var profiles interface{}
	if subject != "" {
		profiles = models.GetProfiles(subject)
	}
	s, err := json.Marshal(profiles)
	if err != nil {
		panic(err)
	}
	c.Ctx.SetCookie("CasbinProfiles", string(s))
	c.TplName = "main.tpl"
}

func (c *APIController) Get() {
	var resp response
	subject := c.Input().Get("sub")
	if subject != "" {
		resp.Data = models.GetProfiles(subject)
	}
	resp.Status = "ok"
	c.Data["json"] = resp
	c.ServeJSON()
}
