$(function() {
    // 点击取注册账号的链接
    $('#link-reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show();
    })

    //点击去登陆 的链接
    $('#link-login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 从Layui 里面 获取 form 对象
    var form = layui.form
    var layer = layui.layer
        // 通过 form.verify()  函数自定义校验规则
    form.verify({
        // 自定义一个pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位,且不能出现空格'],

        // 校验两次密码是否一致的规则
        repwd: function(value) {

            // 如果不一致 return 一个提示消息即可

            // 利用属性选择器拿到第一次输入密码的内容
            var pwd = $('.reg-box [name=password]').val();

            if (pwd !== value) {
                return '两次密码不一致'
            }
        }


    })


    // 注册表单 绑定监听事件
    $('#form-reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        }
        $.post('http://ajax.frontend.itheima.net/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功!')

            // 模拟人的点击行为
            $('#link-login').click()
        })
    })


    // 登录表单 绑定监听事件
    $('#form-login').submit(function(e) {
        // 阻止默认行为
        e.preventDefault()

        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                console.log(res.token);
                // location.href = '/index.html'
            }
        })
    })
})