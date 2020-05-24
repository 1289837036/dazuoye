"use strict";
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("access-Control-Allow-Origin", "*");
    res.header("access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", '3.2.1')
    if (req.method == "OPTIONS") res.send(200);//跨域
    else next();

})

var USERS = [
    {id: '01', userName: 'admin', password:'123456'},
    {id: '02', userName: 'aaa', password:'456789'}
];

var GRADE = [
    {id: '01', Name: '张三', chengji:'90'},
    {id: '02', Name: '李四', chengji:'80'}
]

var yanzheng = [
    {userName: 'admin', password: 'admin'}
]


app.get('/hello',function(req,resp){
    resp.send('哈哈哈');
    resp.end();
});//没用

app.get('/users', function(req,resp){
    resp.send(USERS);
    resp.end();
});

app.get('/users/:id', function (req,resp){
    console.log(req.params);
    const id = req.params.id;
    for (let user of USERS){
        if(user.id ===id){
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//添加用户
app.post('/user', function (req,resp){
    //json
    USERS.push(req.body);
    resp.send({succ: true});
    resp.end();
});

//修改用户
app.put('/user', function (req,resp){
    //json
    let founded = false;
    for( let user of USERS ){
        if(user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }

    if(founded){
        resp.send({succ: true});
    }
    else{
        resp.send({succ: false,msg: '没有找到用户！'});
    }

    resp.end();
});

app.delete('/user/:id', function (req, resp) {  //删除用户
    let index = 0;
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
        document.write(USERS.slice("")); //待解决
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();

});



    
app.get('/grades', function(req,resp){
    resp.send(GRADE);
    resp.end();
});

app.get('/grades/:id', function (req,resp){
    console.log(req.params);
    const id = req.params.id;
    for (let grade of GRADE){
        if(grade.id ===id){
            resp.send([grade]);
            break;
        }
    }
    resp.end();
});

//添加用户
app.post('/grade', function (req,resp){
    //json
    GRADE.push(req.body);
    resp.send({succ: true});
    resp.end();
});

//修改用户
app.put('/grade', function (req,resp){
    //json
    let founded = false;
    for( let grade of GRADE ){
        if(grade.id === req.body.id) {
            grade.Name = req.body.Name;
           grade.chengji = req.body.chengji;
            founded = true;
            break;
        }
    }

    if(founded){
        resp.send({succ: true});
    }
    else{
        resp.send({succ: false,msg: '没有找到用户！'});
    }

    resp.end();
});

app.delete('/grade/:id', function (req, resp) {  //删除用户
    let index = 0;
    let founded = false;
    for (let grade of GRADE) {
        if (grade.id === req.params.id) {
            GRADE.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
        document.write(GRADE.slice("")); 
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();

});

    
app.post('/yanzheng', function (req, resp) {

    const userName = req.body.userName;
    const password = req.body.password;
    console.log(true)
    for (let user of yanzheng) {
        if (user.userName === userName && user.password === password) {
            resp.send({ succ: true });
        }
    }
    resp.end();

});


app.listen(8080,function(){
    console.log('服务器在8080端口启动');
});