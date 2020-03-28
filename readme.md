This is the demo project for Casbin organization in GSoC 2020.

### Build
```
go get github.com/kingiw/casbin-js-demo
// cd to the project directory
go install
go run main.go
```
Then visit `localhost:8080` at your browser. 

You can also test the RESTFul API by access to `localhost:8080/api/get-profiles?sub=[subject]`, in which `subject` can be alice, bob, admin or guest.