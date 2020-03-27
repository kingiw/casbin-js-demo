package models

import (
	"fmt"

	"github.com/casbin/casbin"
)

var enforcer *casbin.Enforcer

func InitEnforcer() {
	var err error
	enforcer, err = casbin.NewEnforcer("./models/model.conf", "./models/policy.csv")
	if err != nil {
		panic(err)
	}
	fmt.Println("Casibin enforcer init")
}

func GetProfiles(subject string) map[string][]string {
	policies := enforcer.GetFilteredPolicy(0, subject) // [['alice', 'data1', 'read'], ...]

	profile := make(map[string][]string)
	for i := 0; i < len(policies); i++ {
		profile[policies[i][2]] = append(profile[policies[i][2]], policies[i][1])
	}
	return profile
}
