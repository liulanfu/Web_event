$(function () {
    const form = layui.form;
    initArtCreaList();

    function initArtCreaList() {
        $.ajax({
            type: "GET",
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    // 为添加类别按钮绑定点击事件
    let indexAdd = null;
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('添加成功！');
                initArtCreaList();
                // 根据索引，关闭对应的弹出层
                layer.close(indexAdd)

            }
        })
    })
    let indexedit = null;
    $('tbody').on('click', '#edit', function () {
        indexedit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '编辑类别',
            content: $('#dialog-edit').html()
        })
        const id = $(this).attr('data-id');
        // console.log(id);
        $.ajax({
            type: 'GET',
            url: "/my/article/cates/" + id,
            success: function (res) {
                // console.log(res)
                form.val('form-edit', res.data)
            }
        })

    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexedit)
                initArtCreaList()
            }
        })
    })

    $('tbody').on('click', '#del', function () {
        const Id = $(this).attr('data-id');
        // console.log(Id);
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg('删除成功！');
                    layer.close(index)
                    initArtCreaList()
                }
            })
        })
    })

})