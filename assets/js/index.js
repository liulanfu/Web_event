$(function () {
    getUserInfo();

    $('#Go_out').on('click', function () {
        layer.confirm('确定退出?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token');  //删除本地存储的token
            location.href = '/login.html';

            layer.close(index);
        });
    })

})

function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        // headers: {
        //     Authorization: localStorage.token || '',
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            renderAvatar(res.data);
        },
        // complete: function (response) {
        //     // console.log(response);
        //     const { message, status } = response.responseJSON;
        //     if (message === "身份认证失败！" && status === 1) {
        //         localStorage.removeItem('token');
        //         location.href = '/login.html';
        //     }
        // }
    })
}

function renderAvatar(user) {
    const username = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;' + username);

    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        const firstName = username[0].toUpperCase();
        $('.text-avatar').html(firstName).show();
    }
}


