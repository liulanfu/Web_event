$(function () {
    const form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "用户名长度为1~6位";
            }
        }
    });
    inituserInfo();
    function inituserInfo() {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        inituserInfo();
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新用户信息成功');
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})