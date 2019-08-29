$(".loginWrapper>.back>span").on('click', function () {
    $(".loginWrapper").toggleClass("animate");
    $(".registerWrapper").toggleClass("animate");
});
$(".registerWrapper>.back>span.login-back").on('click', function () {
    $(".loginWrapper").toggleClass("animate");
    $(".registerWrapper").toggleClass("animate");
});
$(".registerWrapper>.back>span.switch-register").on('click', function () {
    $(".registerWrapper>.emailreg").toggleClass("hide").siblings(".telreg").toggleClass("hide")
    $(".registerWrapper>.email").toggleClass("hide").siblings(".tel").toggleClass("hide")
    this.innerText = this.innerText === "使用手机号注册?" ? "使用邮箱注册?" : "使用手机号注册?"
});

var bt01 = document.getElementById("send");
bt01.onclick = function () {
    bt01.disabled = true;  //当点击后倒计时时候不能点击此按钮 
    var time = 60;  //倒计时60秒 
    var timer = setInterval(fun1, 1000);  //设置定时器 
    function fun1() {
        time--;
        if (time >= 0) {//若是想提前结束，可以直接设置time = 0
            bt01.innerHTML = time + "s后重新发送";
        } else {
            bt01.innerHTML = "重新发送验证码";
            bt01.disabled = false;  //倒计时结束能够重新点击发送的按钮 
            clearTimeout(timer);  //清除定时器 
            time = 60;  //设置循环重新开始条件 
        }
    }
}
$(document).ready(function () {
    let verCode = null;
    //手机号登陆
    $("#login").on("click", () => {
        // let obj = { name: "18851898877", password: "qwe123" }
        let obj = {}
        obj.name = $("#login-tel")[0].value
        obj.password = $("#login-password")[0].value
        $.ajax({
            url: "http://223.3.88.110:8761/user/password",
            method: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
        }).then((responseText, textStatus, xhr) => {
            console.log(responseText)//这里jQuery直接把返回的json parse成对象了
            if (responseText.msg === "号码不存在" || responseText.msg === "密码错误") {
                $("#login-alert").show()
            } else if (responseText.msg === "登录成功") {
                alert("登陆成功")
                console.log(xhr.getResponseHeader("Authorization"))
                //res.setHeader("Access-Control-Expose-Headers", TOKEN_NAME); 
                //是获取不到的，后端要加一句才可以
                // window.history.back()
                console.log(document.referrer)
                if(document.referrer === ""){
                    window.location.href = "../../grid重构文章列表页/article_ls.html"
                }else{
                    window.location.href = document.referrer + `?Authorization=${xhr.getResponseHeader("Authorization")}`
                }
                
            }
        }, (request) => {
            alert("AJAX发送失败!")
        })
    })
    //发送验证码
    $("#send").on("click", () => {
        $.ajax({
            url: "http://223.3.88.110:8761/sendVerCodeByPhone?phone=" + $("#register-tel")[0].value,
            method: "post",
            dataType: "json",
        }).then((responseText) => {
            console.log(responseText.data)
            verCode = responseText.data;
        }, () => {
            alert("AJAX发送失败")
        })
    })
    //手机号注册
    $("button#register").on("click", () => {
        // let {phone, password, verCode} = 
        let obj = {}
        obj.phone = $("#register-tel")[0].value
        obj.verCode = $("#register-verify")[0].value
        obj.password = $("#register-password-again")[0].value
        if (verCode !== obj.verCode) {
            alert("验证码错误,请重新输入")
            return
        }
        if ($("#register-password-again")[0].value !== $("#register-password")[0].value) {
            $("#password-diff").show()
            // $("#password-diff").css("display", "block")
            return
        }
        $.ajax({
            url: "http://223.3.88.110:8761/user/phone",
            method: "post",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            data: JSON.stringify(obj),
        }).then((responseText, textStatus, xhr) => {
            console.log(responseText)
            if (responseText.msg === "邮箱或手机号已被注册") {
                $("#register-alert").show()
            } else if (responseText.msg === "注册成功") {
                alert("注册成功")
                console.log()
                if(document.referrer === ""){
                    window.location.href = "../../grid重构文章列表页/article_ls.html"
                }else{
                    window.location.href = document.referrer
                    //注册的话后台没返回Authorization
                }
            }
        }, () => {
            alert("验证码错误,请重新输入")
        })
    })
});

// $("#forgetPassword>span").on("click",()=>{
//     $.ajax({
//         url:
//     })
// })

//点击input的时候,即foucs状态的时候，把"手机号或密码错误那行红字隐藏"
$("input").bind("input propertychange", function (event) {
    $(".loginWrapper .alert").css("display", "none")
    $(".registerWrapper .alert").css("display", "none")
    $("#password-diff").css("display", "none")
});



// button.onclick = () => {
//     let obj = {name:"fan",idol:"Nadal"};
//     let string = $.param(obj);
//     $.ajax({
//         url: "/xxx?" + string,
//         method: "post",
//         contentType:"application/json;charset=utf-8",//请求的格式
//         dataType:"json",//响应的格式
//         data: JSON.stringify({
//             school: "seu",
//             sport: "tennis",
//         }),
//     }).then((responseText)=>{
//         console.log(responseText)
//         console.log("success")
//     },
//         (request)=>{
//             console.log(request)
//             console.log("fail")
//         }
//     )
// }
// button.onclick = () => {
//     $.ajax({
//         url: "/xxx",
//         method: "get",
//         contentType: "application/x-www-form-urlencoded;charset=utf-8",//请求的格式
//         dataType: "json",//响应的格式
//         data: "hello world=nadal",
//         // data:{
//         //     school:"seu",
//         //     idol:"Nadal",
//         // }
//     }).then((responseText) => {
//         console.log(responseText)
//         console.log("success")
//     },
//         (request) => {
//             console.log(request)
//             console.log("fail")
//         }
//     )
// }
