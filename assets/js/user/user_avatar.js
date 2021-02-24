// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#uploads').on('click', function () {
    $('#file').click();
});

$('#file').on('change', function (e) {
    // let filelist = e.target.files;
    // 这里的this === e.target
    // 获取用户选择的文件
    const filelist = this.files
    // console.log(this.files);
    if (filelist.length === 0) {
        return layui.msg('请选择照片');
    }
    // 1. 拿到用户选择的文件
    const file = filelist[0];
    // 2. 将文件，转化为路径
    const imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
        .cropper('destroy') // 销毁旧的裁剪区域
        .attr('src', imgURL) // 重新设置图片路径
        .cropper(options) // 重新初始化裁剪区域
})

$('#btn').on('click', function () {
    //获取图片地址
    const dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png');
    $.ajax({
        type: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('图片上传成功！');
            // 刷新父页面头像
            window.parent.getUserInfo();
        }
    })

})  