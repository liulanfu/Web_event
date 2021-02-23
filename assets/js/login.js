$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义表单验证
    const form = layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repass: function (value) {
            if ($(".reg-box [name=password]").val() !== value) {
                return "两次密码不一致";
            }
        }
    });

    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            type: "POST",
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功,亲登入");
                $('#form_reg input').val('');
                $('#link_login').click();

            }
        });

    });





})

// http://ajax.frontend.itheima.net