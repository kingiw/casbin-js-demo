package models

import (
	"github.com/casbin/casbin"
)

var enforcer *casbin.Enforcer

func InitEnforcer() {
	var err error
	enforcer, err = casbin.NewEnforcer("./models/model.conf", "./models/policy.csv")
	if err != nil {
		panic(err)
	}
}

func GetProfiles(subject string) map[string][]string {
	policies, err := enforcer.GetImplicitPermissionsForUser(subject)
	if err != nil {
		panic(err)
	}
	// Refactor the structure of the policies
	// Arrays of policies => User profiles
	profile := make(map[string][]string)
	for i := 0; i < len(policies); i++ {
		profile[policies[i][2]] = append(profile[policies[i][2]], policies[i][1])
	}
	return profile
}
