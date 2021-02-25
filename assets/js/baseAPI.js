$.ajaxPrefilter(function (option) {
    // option.url = "http://ajax.frontend.itheima.net" + option.url;
    option.url = "http://api-breakingnews-web.itheima.net" + option.url;

    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.token || '',
        }
    }
    option.complete = function (response) {
        // console.log(response);
        const { message, status } = response.responseJSON;
        if (message === "身份认证失败！" && status === 1) {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
});

