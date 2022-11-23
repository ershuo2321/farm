$(function () {
    // 点击设备分类
    $('.devicelist>div').click(function () {
        $(this).addClass('devicelistclick')
        var index = $(this).index()
        $('.operdevicebox').addClass('hidden')
        // 如果点击1号设备
        if (index === 0) {
            $('.operdevicebox-all1').removeClass('hidden')
        } else {
            // 如果点击2号设备
            $('.operdevicebox-all2').removeClass('hidden')
        }
        $(this).siblings().removeClass('devicelistclick')
    })

    var controlindex
    // 点击(icon-control)显示页面
    $('.icon-control').click(function () {
        controlindex = $(this).parents().eq(3).attr('id')
        controlindex = Number(controlindex.replace('devicebox-all', ''))
        $('.coverbox').removeClass('hidden')
        $('.setdevice').removeClass('hidden')
        // 如果点击2号设备
        if (controlindex === 2) {
            $('.equipmentext>div').eq(0).children().text('2号')
            $('.equipmentext>div').eq(1).children().text('编号：0821B3EFBC57')
            $('.setdeviceboxbottom').addClass('hidden')
            $('.setdeviceboxbottom2').removeClass('hidden')

        } else {
            // 如果点击1号设备
            $('.equipmentext>div').eq(0).children().text('1号')
            $('.equipmentext>div').eq(1).children().text('编号：084EEB861760')
            $('.setdeviceboxbottom').addClass('hidden')
            $('.setdeviceboxbottom1').removeClass('hidden')
        }
        getdevicemessage(controlindex)
    })
    // 点击(setdevice-close)关闭页面
    $('.setdevice-close').click(function () {
        $('.coverbox').addClass('hidden')
        $('.setdevice').addClass('hidden')
    })

    // 设置时间每秒动态显示
    window.setInterval(function () {
        var time = new Date()
        setTimeout(function () {
            time = time.Format('yyyy-MM-dd hh:mm:ss')
            $('.equipmentime').children().text(time)
        }, 0)
    }, 1000)

    // 点击分离设备成每个节点
    $('.leftright-all1').click(function () {
        $('.operdevicebox-all1').addClass('hidden')
        $('.operdevicebox-item1').removeClass('hidden')
        if (!$('.operdevicebox-item2').hasClass('hidden')) {
            showpageoper()
        }
    })
    $('.leftright-all2').click(function () {
        $('.operdevicebox-all2').addClass('hidden')
        $('.operdevicebox-item2').removeClass('hidden')
        if (!$('.operdevicebox-item1').hasClass('hidden')) {
            showpageoper()
        }
    })
    // 点击聚合节点成设备
    $('.operdevicelist').on('click', '.leftright-item1', function () {
        $('.operdevicebox-all1').removeClass('hidden')
        $('.operdevicebox-item1').addClass('hidden')
        //   实现第二页隐藏
        if (!$('.devicelist>div').hasClass('devicelistclick')) {
            hidesexondpage()
            if ($('.operdevicebox-all2').hasClass('hidden')) {
                $('.operdevicebox-item2').removeClass('hidden')
            }
        }
    })
    $('.operdevicelist').on('click', ' .leftright-item2', function () {
        $('.operdevicebox-all2').removeClass('hidden')
        $('.operdevicebox-item2').addClass('hidden')
        //   实现第二页隐藏
        var index = $('.pagenumberactive').children().text()
        // alert(typeof index)
        if (index === '1') {
            hidesexondpage()
        } else {
            $('.operdevicebox-item1').removeClass('hidden')
            $('.operdevicebox-item2').addClass('hidden')
            $(".pagenumber").removeClass('pagenumberactive')
            $(".pagenumber").children().css('color', 'black')
            $(".pagenumber").eq(0).addClass('pagenumberactive')
            $(".pagenumber").eq(0).children().css('color', 'white')
            hidesexondpage()



        }
    })

    // 分页按钮触摸事件
    $(".behind,.front").hover(
        function () {
            if ($(this).hasClass('fballow')) {
                $(this).children().css('color', '#009486')
            }
        },
        function () {
            if ($(this).hasClass('fballow')) {
                $(this).children().css('color', '#000000')
            }
        }
    )
    $(".pagenumber").hover(
        function () {
            if (!$(this).hasClass('pagenumberactive')) {
                $(this).children().css('color', '#009486')
            }
        },
        function () {
            if (!$(this).hasClass('pagenumberactive')) {
                $(this).children().css('color', '#000000')
            }
        }
    )

    // 点击分页切换按钮
    $(".pagenumber").click(function () {
        //    样式设置
        $(".pagenumber").removeClass('pagenumberactive')
        $(".pagenumber").children().css('color', 'black')
        $(this).addClass('pagenumberactive')
        $(this).children().css('color', 'white')
        //  翻页
        if ($('.operdevicebox-all1').hasClass('hidden') && $('.operdevicebox-all2').hasClass('hidden')) {
            var index = $(this).children().text()
            // console.log(typeof index)
            if (index === '1') {
                clickprevpage()
            } else {
                clicknextpage()
            }
        }
    })

    // 点击下一页上一页
    $('.behind').click(function () {
        if ($(this).hasClass('fballow')) {
            $(".pagenumber").removeClass('pagenumberactive')
            $(".pagenumber").children().css('color', 'black')
            $(".pagenumber").eq(1).addClass('pagenumberactive')
            $(".pagenumber").eq(1).children().css('color', 'white')
            clicknextpage()
        }
    })

    $('.front').click(function () {
        if ($(this).hasClass('fballow')) {
            $(".pagenumber").removeClass('pagenumberactive')
            $(".pagenumber").children().css('color', 'black')
            $(".pagenumber").eq(0).addClass('pagenumberactive')
            $(".pagenumber").eq(0).children().css('color', 'white')
            clickprevpage()
        }
    })


    var controlbianjiwenjian_that
    var control_equipid
    // 点击显示修改节点名称窗口
    $('.editequipname .icon-bianjiwenjian').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.rename').removeClass('hidden')
        $('#rename-input').val('')
        controlbianjiwenjian_that = $(this).parent()
        control_equipid = Number($(this).parents().eq(2).attr('id'))
        $('.rename-btn1').click(function () {
            var inputext = $('#rename-input').val()
            if (inputext.length > 0) {
                $('.coverbox2').addClass('hidden')
                $('.rename').addClass('hidden')
                setcodename(control_equipid, inputext, controlbianjiwenjian_that)
            } else {
                alert('请输入节点名称')
            }
        })
    })

    // 点击控制开关状态
    $('.editequiostate img').click(function () {
        // 获取其在兄弟元素中的位置
        var index = $(this).parents().eq(1).index()
        index++
        if ($(this).index() === 0) {
            // 将进行关的操作
            setdeviceopen(index, 0, controlindex, isclickone)
            closeoperation($(this))
        } else {
            // 将进行开的操作 
            setdeviceopen(index, 1, controlindex, isclickone)
            openoperation($(this))
        }
    })

    // 初始化各节点,只有设备1有数据，所以只初始化设备1
    codemessage(1)


    // 点击关闭修改节点名称窗口
    $('.rename-close,.rename-btn2').click(function () {
        $('.coverbox2').addClass('hidden')
        $('.rename').addClass('hidden')
    })
    // 点击关闭确认重置窗口
    $('.setrelation-close,.setrelation-btn2').click(function () {
        $('.coverbox2').addClass('hidden')
        $('.setrelation').addClass('hidden')
    })
    // 点击关闭联动、互斥关系表的配置
    $('.updaterelation-fourthbox>button,.updaterelation-title .icon-guanbi').click(function () {
        $('.coverbox2').addClass('hidden')
        $('.updaterelation').addClass('hidden')
    })
    // 点击重置联动关系
    $('#togerelation').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.setrelation').removeClass('hidden')
        $('.relation-rename').text('联动关系')
    })
    // 点击重置互斥关系
    $('#haterelation').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.setrelation').removeClass('hidden')
        $('.relation-rename').text('互斥关系')
    })
    // 点击显示联动关系配置表
    $('#togetable').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.updaterelation').removeClass('hidden')
        $('.updaterelation-rename1').text('联动关系表')
        $('.updaterelation-rename2').text('2')
        $('.updaterelation-rename3').text('6')
        $('.updaterelation-rename4').text('联动关系')
        $('.togeul').removeClass('hidden')
        $('.hateul').addClass('hidden')
        control_mode = 1
        getrelationlist(1)
    })
    // 点击显示互斥关系配置表
    $('#hatetable').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.updaterelation').removeClass('hidden')
        $('.updaterelation-rename1').text('互斥关系表')
        $('.updaterelation-rename2').text('1')
        $('.updaterelation-rename3').text('12')
        $('.updaterelation-rename4').text('互斥关系')
        $('.togeul').addClass('hidden')
        $('.hateul').removeClass('hidden')
        control_mode = 2
        getrelationlist(2)

    })
    // 点击添加关系配置
    $('.updaterelation-thirdbox>span').click(function () {
        $('.coverbox3').removeClass('hidden')
        $('.addrelationbox').removeClass('hidden')
        if (control_mode===1) {
            $('.addrelationbox-rename').text('配置联动')
        } else {
            $('.addrelationbox-rename').text('配置互斥')
        }
        if (isupdate === false) {
            setrelaoptionfun(controlindex)
        } else {

        }
    })
    // 点击关闭关系配置
    $('.addrelationbox-title .icon-guanbi,.addrelationbox-btn2').click(function () {
        $('.coverbox3').addClass('hidden')
        $('.addrelationbox').addClass('hidden')
        if (isupdate === true) {
            isupdate = false
        } else {

        }
    })
    // 点击设置option切换
    $('#select1').on('click', function () {
        var index = $(this).val()
        index = Number(index)
        setrelaoptionfun2(controlindex, index)
    })
    // 确认设置关系配置
    $('.addrelationbox-btn1').click(function () {
        if (isupdate === false) {
            nid1 = Number($('#select1').val())
            nid2 = Number($('#select2').val())
            var mode = getrelation()
            setrelation(controlindex, nid1, nid2, mode)
        } else {

        }
        $('.coverbox3').addClass('hidden')
        $('.addrelationbox').addClass('hidden')
    })

    var isupdate = false
    var control_updateindex
    var control_updateid
    var control_mode
    var nid1
    var nid2

    // 编辑关系
    $('.updaterelation-secondbox').on('click', '.icon-edit', function () {
        isupdate = true
        if (control_mode===1) {
            $('.addrelationbox-rename').text('配置联动')
        } else {
            $('.addrelationbox-rename').text('配置互斥')
        }
        $('.coverbox3').removeClass('hidden')
        $('.addrelationbox').removeClass('hidden')
        control_updateindex = $(this).parents().eq(1).index()
        var data = {}
        var data2 = {}

        setrelaoptionfun(controlindex)

        data = {
            did: controlindex,
            mode: control_mode
        }
        $.ajax({
            url: 'http://192.168.0.155:3700/api/FindRelationship',
            type: 'post',
            data: JSON.stringify(data),
            contentType: 'application/json;charset=UTF-8',
            success: function (res) {
                control_updateid = res[control_updateindex].id
                data2 = {
                    id: control_updateid
                }
                $.ajax({
                    url: 'http://192.168.0.155:3700/api/EditRelationship',
                    type: 'post',
                    data: JSON.stringify(data2),
                    contentType: 'application/json;charset=UTF-8',
                    success: function (res) {
                        $('#select1').val(res.nid1)
                        $('#select2').val(res.nid2)
                        $('.addrelationbox-btn1').click(function () {
                            if (isupdate === true) {
                                nid1 = Number($('#select1').val())
                                nid2 = Number($('#select2').val())
                                updaterelation(control_updateid, nid1, nid2, controlindex, control_mode)
                                $('.coverbox3').addClass('hidden')
                                $('.addrelationbox').addClass('hidden')
                                isupdate = false
                            } else {

                            }
                        })
                    }
                })
            }

        })

    })
    // 删除关系
    $('.setrelation-btn1').click(function () {
        if ($('.setrelation-span .relation-rename').text() === '联动关系') {
            var mode = 1
        } else {
            var mode = 2
        }
        resetrelation(mode)
        $('.coverbox2').addClass('hidden')
        $('.setrelation').addClass('hidden')
    })

    var isclickone = false
    // 点击单个节点的开关
    $('.operdevicelist').on('click', '.showdevicestate', function () {
        isclickone = true
        var next = $(this).next()
        var id = $(this).parents().eq(1).index()
        var did = Number($(this).parent().parent().attr('id').replace('devicebox-item', ''))
        var start
        // 设置start
        if (next.children().eq(1).hasClass('controlequipooff')) {
            start = 1
        } else {
            start = 0
        }
        setdeviceopen(id, start, did, isclickone)
        isclickone = false
    })

    // 添加设备
    $('#addequip').click(function () {
        $('.addequipbox').removeClass('hidden')
        $('.coverbox').removeClass('hidden')
    })

    // 取消添加设备
    $('.addequipbox .icon-guanbi').click(function () {
        $('.addequipbox').addClass('hidden')
        $('.coverbox').addClass('hidden')
    })

    // 选择头像
    $('.addequipbox-updateimg').click(function () {
        $('.coverbox2').removeClass('hidden')
        $('.selectimagebox').removeClass('hidden')
        $('.selectimagebox-center img').click(function () {
            var src = $(this).attr('src')
            $('.addquipbox-center1 img').attr('src', src)
            $('.coverbox2').addClass('hidden')
            $('.selectimagebox').addClass('hidden')
        })
    })
    // 取消选择头像
    $('.selectimagebox-title .icon-guanbi').click(function () {
        $('.coverbox2').addClass('hidden')
        $('.selectimagebox').addClass('hidden')
    })
    var wenjianindex
    //点击icon-wenjian
    $('.icon-wenjian').click(function () {
        wenjianindex = $(this).parents().eq(3).attr('id')
        wenjianindex = Number(wenjianindex.replace('devicebox-all', ''))
        $('.coverbox').removeClass('hidden')
        $('.assignmentbox').removeClass('hidden')
        getassignlist(wenjianindex)
    })
    // 取消点击icon-wenjian
    $('.assignmentbox-close').click(function () {
        $('.coverbox').addClass('hidden')
        $('.assignmentbox').addClass('hidden')
    })

    // 添加设备
    $('.addequipbox-btn').click(function () {
        var name = $('#addequip-input1').val()
        var code = $('#addequip-input2').val()
        var dtype = Number($('#select4').val())
        console.log(name)
        console.log(code)
        console.log(dtype)
        if (name.length > 0 && code.length > 0 && dtype.length > 0) {
            savequip(name, code, dtype)
        } else {
            setip('请输入内容')
        }

    })

    //  添加任务
    $('.assignmentcentertop-btn').click(function () {
        $('#editassigntitle').html('添加任务')
        getcodeid(wenjianindex)
        $('#delaytime').val(100000)
        $('#startime').val('')
        $('#endtime').val('')
        $('#runtime1').val('')
        $('#runtime2').val('')
        $('#getassigname').val('')
        $('#getimetype').val(1)
        $('#codeid').val(1)
        $('#getopertype').val(0)
        $('.assigndetailbox-checkbox').addClass('hidden')
        var weekboxout = $('input[name="week"]')
        for (let i = 0; i < weekboxout.length; i++) {
            weekboxout[i].checked = false
        }
        $('.assigndetailbox').removeClass('hidden')
        $('.assignmentbox').addClass('hidden')
    })

    // 保存任务
    $('.assigndetailbox-sure').click(function () {
        if (isassignedit === false) {
            var did = wenjianindex
            var tname = $('#getassigname').val()
            var nid = Number($('#codeid').val())
            var control = Number($('#getopertype').val())
            var start = $('#startime').val()
            var end = $('#endtime').val()
            var delayed = Number($('#delaytime').val())
            var execution = $('#runtime1').val() === '' ? $('#runtime2').val() : $('#runtime1').val()
            var weekbox = $('input[name="week"]')
            var week = []
            for (let i = 0; i < weekbox.length; i++) {
                if (weekbox[i].checked === true) {
                    week.push(weekbox[i].value)
                }
            }
            week = week.toString()
            var exetype = Number($('#getimetype').val())
            if (did.length <= 0 || tname.length <= 0 || nid.length <= 0 || control.length <= 0 || delayed.length <= 0 || execution.length <= 0 || exetype.length <= 0) {
                setip('请填写内容')
            } else {
                saveassign(did, tname, nid, control, start, end, delayed, execution, week, exetype)
            }
            $('.assigndetailbox').addClass('hidden')
            $('.assignmentbox').removeClass('hidden')
        } else {

        }
    })

    // 切换预约类型
    $('#getimetype').on('change', function () {
        var getimetype = Number($('#getimetype').val())
        var weekbox = $('input[name="week"]')
        if (getimetype === 1) {
            $('.assigndetailbox-checkbox').addClass('hidden')
            $('.assigndetailbox-startendtime').addClass('hidden')
            $('#runtime2').val('')
            $('#runtime2').removeClass('hidden')
            $('#runtime1').addClass('hidden')
        } else if (getimetype === 2) {
            for (let i = 0; i < weekbox.length; i++) {
                weekbox[i].checked = false

            }
            $('#startime').val('')
            $('#endtime').val('')
            $('#runtime1').val('')
            $('.assigndetailbox-checkbox').removeClass('hidden')
            $('.assigndetailbox-startendtime').removeClass('hidden')
            $('#runtime1').removeClass('hidden')
            $('#runtime2').addClass('hidden')
        } else {
            for (let i = 0; i < weekbox.length; i++) {
                weekbox[i].checked = false

            }
            $('#runtime1').val('')
            $('.assigndetailbox-checkbox').removeClass('hidden')
            $('.assigndetailbox-startendtime').addClass('hidden')
            $('#runtime1').removeClass('hidden')
            $('#runtime2').addClass('hidden')
        }

    })

    //  切换操作类型
    $('#getopertype').on('change', function () {
        var getopertype = Number($('#getopertype').val())
        if (getopertype === 0 || getopertype === 1) {
            $('#delaytime').attr('disabled', 'disabled')
            $('#delaytime').val(100000)
        } else {
            $('#delaytime').removeAttr('disabled')
        }

    })

    //  取消任务添加
    $('.assigndetailbox-title .icon-guanbi').click(function () {
        $('.assigndetailbox').addClass('hidden')
        $('.assignmentbox').removeClass('hidden')
    })

    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //日期时间选择器
        laydate.render({
            elem: '#startime'
            , type: 'datetime'
        });

        //日期时间选择器
        laydate.render({
            elem: '#endtime'
            , type: 'datetime'
        });

        //时间选择器
        laydate.render({
            elem: '#runtime1'
            , type: 'time'
        });
        //时间选择器
        laydate.render({
            elem: '#runtime2'
            , type: 'datetime'
        });
    })

    // 删除任务
    $('.assignmentcenterbox').on('click', '.icon-shanchu', function () {
        var deleteindex = Number($(this).parents(':eq(2)').children(':eq(0)').html())
        deleteassign(deleteindex, wenjianindex)
    })

    var isassignedit = false
    // 编辑任务
    $('.assignmentcenterbox').on('click', '.icon-edit', function () {
        isassignedit = true
        $('#editassigntitle').html('修改任务')
        $('.assigndetailbox').removeClass('hidden')
        $('.assignmentbox').addClass('hidden')
        setTimeout(function () {
            getcodeid(wenjianindex)
        }, 0)
        var editassignindex = Number($(this).parents(':eq(2)').children(':eq(0)').html())
        setTimeout(function () {
            getassignmessage(editassignindex)
        }, 50)

        $('.assigndetailbox-sure').click(function () {
            if (isassignedit === true) {
                var tname = $('#getassigname').val()
                var nid = Number($('#codeid').val())
                var control = Number($('#getopertype').val())
                var start = $('#startime').val()
                var end = $('#endtime').val()
                var delayed = Number($('#delaytime').val())
                var execution = $('#runtime1').val() === '' ? $('#runtime2').val() : $('#runtime1').val()
                var weekbox = $('input[name="week"]')
                var week = []
                for (let i = 0; i < weekbox.length; i++) {
                    if (weekbox[i].checked === true) {
                        week.push(weekbox[i].value)
                    }
                }
                week = week.toString()
                var exetype = Number($('#getimetype').val())
                if (editassignindex.length <= 0 || tname.length <= 0 || nid.length <= 0 || control.length <= 0 || delayed.length <= 0 || execution.length <= 0 || exetype.length <= 0) {
                    setip('请填写内容')
                } else {
                    updateassign(wenjianindex, editassignindex, tname, nid, control, start, end, delayed, execution, week, exetype)
                }
                isassignedit = false
            } else {

            }
            $('.assigndetailbox').addClass('hidden')
            $('.assignmentbox').removeClass('hidden')

        })


    })

    // 查询任务
    $('#searchassgin').click(function () {
        var id = Number($('#searchassginval').val())
        if (id.length <= 0) {
            setip('请输入任务id')
        } else {
            searchassign(id,wenjianindex)
        }
    })
})

// 查询并显示任务
function searchassign(id,wenjianindex) {
    var data = {}
    data = {
        id: id
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/EditTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            $('.assignmentcenterbottom').remove()
            if (!res) {
                setip('不存在该任务')
                getassignlist(wenjianindex)
            } else {
                var str = `
                <div class="assignmentcenterbottom">
                <div class="assignmentitle1">${res.id}</div>
                <div class="assignmentitle2">${res.tname}</div>
                <div class="assignmentitle2">${res.name}</div>
                <div class="assignmentitle3">${res.control}</div>
                <div class="assignmentitle4">${res.execution}</div>
                <div class="assignmentitle4">${res.start}</div>
                <div class="assignmentitle4">${res.end}</div>
                <div class="assignmentitle5">${res.delayed}</div>
                <div class="assignmentitle6">${res.exetype}</div>
                <div class="assignmentitle7">
                    <span class="${res.week.indexOf('1') >= 0 ? 'highspan' : ''}">1</span>
                    <span class="${res.week.indexOf('2') >= 0 ? 'highspan' : ''}">2</span>
                    <span class="${res.week.indexOf('3') >= 0 ? 'highspan' : ''}">3</span>
                    <span class="${res.week.indexOf('4') >= 0 ? 'highspan' : ''}">4</span>
                    <span class="${res.week.indexOf('5') >= 0 ? 'highspan' : ''}">5</span>
                    <span class="${res.week.indexOf('6') >= 0 ? 'highspan' : ''}">6</span>
                    <span class="${res.week.indexOf('7') >= 0 ? 'highspan' : ''}">7</span>
                </div>
                <div class="assignmentitle8">
                    <span><i class="iconfont icon-edit cursor"></i></span>
                    <span><i class="iconfont icon-shanchu cursor"></i></span>
                </div>
            </div>
                `
                $(str).insertAfter($('.assignmentcentermiddle'))
            }
        }
    })
}
// 更新任务
function updateassign(wenjianindex, id, tname, nid, control, start, end, delayed, execution, week, exetype) {
    var data = {}
    data = {
        id,
        tname,
        nid,
        control,
        start,
        end,
        delayed,
        execution,
        week,
        exetype
    }
    console.log('更新任务传递的数据')
    console.log(data)
    $.ajax({
        url: 'http://192.168.0.155:3700/api/UpdateTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getassignlist(wenjianindex)
        }

    })
}
// 编辑任务窗口
function getassignmessage(id) {
    var data = {}
    data = {
        id: id
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/EditTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var weekbox = $('input[name="week"]')
            for (let i = 0; i < weekbox.length; i++) {
                weekbox[i].checked = false
            }
            var array = res.week.split(',')
            $('#codeid').val(res.nid)
            $('#getassigname').val(res.tname)
            $('#getopertype').val(res.control)
            $('#getimetype').val(res.exetype)
            $('#delaytime').val(res.delayed)
            if (res.exetype === 1) {
                $('.assigndetailbox-checkbox').addClass('hidden')
                $('.assigndetailbox-startendtime').addClass('hidden')
                $('#runtime2').val('')
                $('#runtime2').removeClass('hidden')
                $('#runtime2').val(res.execution)
                $('#runtime1').addClass('hidden')
            } else if (res.exetype === 2) {
                $('.assigndetailbox-checkbox').removeClass('hidden')
                $('.assigndetailbox-startendtime').removeClass('hidden')
                $('#runtime1').removeClass('hidden')
                $('.assigndetailbox-checkbox').removeClass('hidden')
                $('.assigndetailbox-startendtime').removeClass('hidden')
                $('#runtime1').removeClass('hidden')
                $('#runtime2').addClass('hidden')
                $('#startime').val(res.start)
                $('#endtime').val(res.end)
                $('#runtime1').val(res.execution)
                for (let i = 0; i < array.length; i++) {
                    var index = Number(array[i])
                    index--
                    weekbox[index].checked = true
                }
            } else {
                $('.assigndetailbox-checkbox').removeClass('hidden')
                $('.assigndetailbox-startendtime').addClass('hidden')
                $('#runtime1').removeClass('hidden')
                $('#runtime2').addClass('hidden')
                $('#runtime1').val(res.execution)
                for (let i = 0; i < array.length; i++) {
                    var index = Number(array[i])
                    index--
                    weekbox[index].checked = true
                }

            }
            var getopertype = Number($('#getopertype').val())
            if (getopertype === 0 || getopertype === 1) {
                $('#delaytime').attr('disabled', 'disabled')
            } else {
                $('#delaytime').removeAttr('disabled')
            }
        }

    })
}
// 删除任务
function deleteassign(id, wenjianindex) {
    var data = {}
    data = {
        id
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/DeleteTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getassignlist(wenjianindex)
        }

    })
}
// 保存任务
function saveassign(did, tname, nid, control, start, end, delayed, execution, week, exetype) {
    var data = {}
    data = {
        did,
        tname,
        nid,
        control,
        start,
        end,
        delayed,
        execution,
        week,
        exetype
    }
    console.log('保存任务传递的数据')
    console.log(data)
    $.ajax({
        url: 'http://192.168.0.155:3700/api/SaveTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getassignlist(did)
        }

    })
}

//节点id的option添加
function getcodeid(did) {
    var data = {}
    data = {
        did
    }
    $('#codeid').empty()
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindNode',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var str = ''
            for (let i = 0; i < res.length; i++) {
                if (i === 0) {
                    str += `
                        <option value="${res[i].code}"  selected>${res[i].code}</option>
                        `
                } else {
                    str += `
                    <option value="${res[i].code}">${res[i].code}</option>
                    `
                }
            }
            $('#codeid').html(str)

        }

    })
}

// 获取任务
function getassignlist(did) {
    var data = {}
    data = {
        did
    }
    $('.assignmentcenterbottom').remove()
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindTask',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var str = ''
            for (let i = 0; i < res.length; i++) {
                str += `
                <div class="assignmentcenterbottom">
                <div class="assignmentitle1">${res[i].id}</div>
                <div class="assignmentitle2">${res[i].tname}</div>
                <div class="assignmentitle2">${res[i].name}</div>
                <div class="assignmentitle3">${res[i].control}</div>
                <div class="assignmentitle4">${res[i].execution}</div>
                <div class="assignmentitle4">${res[i].start}</div>
                <div class="assignmentitle4">${res[i].end}</div>
                <div class="assignmentitle5">${res[i].delayed}</div>
                <div class="assignmentitle6">${res[i].exetype}</div>
                <div class="assignmentitle7">
                    <span class="${res[i].week.indexOf('1') >= 0 ? 'highspan' : ''}">1</span>
                    <span class="${res[i].week.indexOf('2') >= 0 ? 'highspan' : ''}">2</span>
                    <span class="${res[i].week.indexOf('3') >= 0 ? 'highspan' : ''}">3</span>
                    <span class="${res[i].week.indexOf('4') >= 0 ? 'highspan' : ''}">4</span>
                    <span class="${res[i].week.indexOf('5') >= 0 ? 'highspan' : ''}">5</span>
                    <span class="${res[i].week.indexOf('6') >= 0 ? 'highspan' : ''}">6</span>
                    <span class="${res[i].week.indexOf('7') >= 0 ? 'highspan' : ''}">7</span>
                </div>
                <div class="assignmentitle8">
                    <span><i class="iconfont icon-edit cursor"></i></span>
                    <span><i class="iconfont icon-shanchu cursor"></i></span>
                </div>
            </div>
                `

            }
            $(str).insertAfter($('.assignmentcentermiddle'))
        }

    })
}

// 添加设备
function savequip(name, code, dtype) {
    var data = {}
    data = {
        name,
        code,
        dtype
    }
    $('#addequip-input1').val('')
    $('#addequip-input2').val('')
    $.ajax({
        url: 'http://192.168.0.155:3700/api/AddDevice',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            console.log(res)
        }

    })
}

// 开启关闭设备节点
function setdeviceopen(code, start, did, isclickone) {
    var data = {}
    data = {
        code: code,
        start: start,
        did: did
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/OpenCloseOut',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getdevicemessage(did)
            codemessage(did)

            if (isclickone === true) {
                location.reload()
            } else {

            }
        }

    })
}

//节点单个信息获取
function codemessage(equipid) {
    var data = {}
    var equipid
    data = {
        did: equipid,
    }
    // 将设备1的信息清空
    $(`.operdevicebox-item${equipid}`).remove()
    $(`.operdevicebox-all${equipid} .devicenumber`).html('')
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindNode',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var str = ''
            var circlestr = ''
            // 设备1
            for (let i = 0; i < res.length; i++) {
                str += `
                    <div class="operdevicebox operdevicebox-item${equipid} hidden " id="devicebox-item${equipid}">
                        <div class="opercenter">
                            <div class="online"><span>在线</span></div>
                            <div class="leftright cursor leftright-item${equipid}"><span><i
                                        class="iconfont icon-sanjiaoright"></i></span><span><i
                                        class="iconfont icon-sanjiaoleft"></i></span></div>
                            <div class="deletedevice cursor"><span><i class="iconfont icon-shanchu"></i></span></div>
                            <div class="operimg2"><img src="../image/equipment.png"></div>
                            <div class="opertitle2">
                                <div class="firstspan"><span>设备：${equipid}号</span></div>
                                <div class="secondspan"><span>节点：${res[i].name}</span></div>
                                <div class="thirdspan"><span>编号：084EEB861760</span></div>
                            </div>
                            <div class="showdevicestate">
                                <img src="../image/opendevice.png" class="cursor ${res[i].start === 0 ? 'hidden' : ''}">
                                <img src="../image/closedevice.png" class="cursor ${res[i].start === 0 ? '' : 'hidden'}">
                            </div>
                            <div class="editequiostate2"><span class="${res[i].start === 0 ? '' : 'controlequipon'}">开</span><span class="${res[i].start === 0 ? 'controlequipooff' : ''}">关</span></div>
                        </div>
                        <div class="operbottom">
                            <div class="cursor"><span><i class="iconfont icon-control"></i></span></div>
                            <div class="cursor"><span><i class="iconfont icon-wenjian"></i></span></div>
                            <div class="cursor"><span><i class="iconfont icon-dengdaiwenjian"></i></span></div>
                            <div class="cursor"><span><i class="iconfont icon-bianjiwenjian"></i></span></div>
                            <div class="cursor"><span><i class="iconfont icon-shituxianshiquanbujiedian"></i></span>
                            </div>
                        </div>
                    </div>                                                                 
                    `
                circlestr += `
                        <div class="${res[i].start === 0 ? 'nornumber' : 'exnumber'}"><span>${i + 1}</span></div>
                    `
            }

            $(str).insertAfter($(`.operdevicebox-all${equipid}`))
            $(`.operdevicebox-all${equipid} .devicenumber`).append(circlestr)
        }

    })
}

// 初始化设备各节点的name & 初始化各节点的开关状态
function getdevicemessage(equipid) {
    var data = {}
    data = {
        did: equipid,
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindNode',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            for (let i = 0; i < res.length; i++) {
                $('.editequipname1').eq(`${i}`).children().eq(1).text(res[i].name)
                if (res[i].start === 1) {
                    // 开
                    $('.editequiostate1').eq(`${i}`).children().eq(0).removeClass('hidden')
                    $('.editequiostate1').eq(`${i}`).children().eq(1).addClass('hidden')
                    $('.controlequip1').eq(`${i}`).children().eq(0).addClass('controlequipon')
                    $('.controlequip1').eq(`${i}`).children().eq(1).removeClass('controlequipooff')
                } else {
                    // 关
                    $('.editequiostate1').eq(`${i}`).children().eq(1).removeClass('hidden')
                    $('.editequiostate1').eq(`${i}`).children().eq(0).addClass('hidden')
                    $('.controlequip1').eq(`${i}`).children().eq(0).removeClass('controlequipon')
                    $('.controlequip1').eq(`${i}`).children().eq(1).addClass('controlequipooff')
                }
            }
        }

    })
}

// 保存关系
function setrelation(did, nid1, nid2, mode) {
    var data = {}
    data = {
        did: did,
        nid1: nid1,
        nid2: nid2,
        mode: mode
    }
    console.log('保存关系传递的数据')
    console.log(data)
    $.ajax({
        url: 'http://192.168.0.155:3700/api/SaveRelationship',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getrelationlist(mode)
        }
    })
}

// 获取option信息模板
function setrelaoptionfun(equipid) {
    var data = {}
    data = {
        did: equipid,
    }
    $('#select1').html('');
    $('#select2').html('');
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindNode',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            var str = ''
            for (let i = 0; i < res.length; i++) {
                str += `<option value = '${res[i].id}'>名称：${res[i].name}</option> `
            }
            $('#select1').append(str);
            $('#select2').append(str);
            $('#select1 option').eq(0).attr('selected', 'selected')
            $('#select2 option').eq(1).attr('selected', 'selected')
            $('#select2 option').eq(0).addClass('hidden')
        }

    })
}

// 切换option
function setrelaoptionfun2(did, index) {
    var data = {}
    data = {
        did: did,
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindNode',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            index--
            $('#select2 option').removeClass('hidden')
            $('#select2 option').eq(`${index}`).addClass('hidden')
            $('#select2 option').removeAttr('selected', 'selected')
            var id = res[0].id
            index++
            if (index === id) {
                $('#select2 option').eq(1).attr('selected', 'selected')
            } else {
                $('#select2 option').eq(0).attr('selected', 'selected')
            }

        }

    })
}

// 获取已配置关系
function getrelationlist(mode) {
    var data = {}
    var did = getdevice()
    data = {
        did: did,
        mode: mode
    }
    $('#select1').html('');
    $('#select2').html('');
    $.ajax({
        url: 'http://192.168.0.155:3700/api/FindRelationship',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            $('.togeul').html('')
            $('.hateul').html('')
            var str = ''
            if (res) {
                for (let i = 0; i < res.length; i++) {
                    str += `<li><span class="firli">${res[i].createtime}</span> <span class="secli"><i>${res[i].name1}</i>-<i>${res[i].name2}</i></span><span class="thirli cursor"><i class="iconfont icon-edit relation-edit"></i></span></li>`
                }
            }
            if (mode === 1) {
                $('.togeul').append(str)
            } else {
                $('.hateul').append(str)
            }
        }

    })

}

// 更新关系
function updaterelation(id, nid1, nid2, did, mode) {
    data = {
        id: id,
        nid1: nid1,
        nid2: nid2,
        did: did
    }
    console.log('更新关系传递的数据')
    console.log(data)
    $.ajax({
        url: 'http://192.168.0.155:3700/api/UpdateRelationship',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
            getrelationlist(mode)
        }

    })
}

// 修改节点名称
function setcodename(equipid, inputext, _that) {
    var data = {}
    data = {
        id: equipid,
        name: inputext
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/UpdateNodeName',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            _that.next().text(inputext)
            setip(res)
        }

    })
}

// 开启设备节点
function openoperation(_this) {
    $(_this).addClass('hidden')
    $(_this).prev().removeClass('hidden')
    $(_this).parent().next().children().eq(0).addClass('controlequipon')
    $(_this).parent().next().children().eq(1).removeClass('controlequipooff')
}

// 关闭设备节点
function closeoperation(_this) {
    $(_this).addClass('hidden')
    $(_this).next().removeClass('hidden')
    $(_this).parent().next().children().eq(0).removeClass('controlequipon')
    $(_this).parent().next().children().eq(1).addClass('controlequipooff')
}


//获取正在显示的设备
function getdevice() {
    if (!$('.setdeviceboxbottom1').hasClass('hidden')) {
        return 1
    } else {
        return 2
    }
}

// 获取正在编辑的关系
function getrelation() {
    if ($('.addrelationbox-rename').text() === '配置联动') {
        return 1
    } else {
        return 2
    }
}


// 重置已配置关系
function resetrelation(mode) {
    var data = {}
    var did = getdevice()
    data = {
        did: did,
        mode: mode
    }
    $.ajax({
        url: 'http://192.168.0.155:3700/api/DeleteRelationship',
        type: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (res) {
            setip(res)
        }

    })
}

// 提示信息
function setip(message) {
    $('.retooltip').text(message)
    $('.tooltip').removeClass('hidden')
    setTimeout(() => {
        $('.tooltip').addClass('hidden')
    }, 1000);
}

function showpageoper() {
    // 第一页只显示12个节点
    // 第二页显示剩余的
    $('.operdevicebox-item1').removeClass('hidden')
    $('.operdevicebox-item2:lt(3)').removeClass('hidden')
    $('.operdevicebox-item2:gt(3)').addClass('hidden')
    $('.pagenumber').eq(1).removeClass('hidden')
    $('.behind').removeClass('fbnoallow')
    $('.behind').addClass('fballow')
}

// 点击下一页
function clicknextpage() {
    $('.operdevicebox-item1').addClass('hidden')
    $('.operdevicebox-item2:lt(4)').addClass('hidden')
    $('.operdevicebox-item2:gt(3)').removeClass('hidden')
    $('.behind').addClass('fbnoallow')
    $('.behind').removeClass('fballow')
    $('.behind').children().css('color', '#d4cdce')
    $('.front').removeClass('fbnoallow')
    $('.front').addClass('fballow')
    $('.front').children().css('color', 'black')
}

// 点击上一页
function clickprevpage() {
    $('.operdevicebox-item1').removeClass('hidden')
    $('.operdevicebox-item2:lt(4)').removeClass('hidden')
    $('.operdevicebox-item2:gt(3)').addClass('hidden')
    $('.front').addClass('fbnoallow')
    $('.front').removeClass('fballow')
    $('.front').children().css('color', '#d4cdce')
    $('.behind').removeClass('fbnoallow')
    $('.behind').addClass('fballow')
    $('.behind').children().css('color', 'black')
}

// 点击隐藏第二页
function hidesexondpage() {
    $('.pagenumber').eq(1).addClass('hidden')
    $('.behind').addClass('fbnoallow')
    $('.behind').removeClass('fballow')
    $('.front').addClass('fbnoallow')
    $('.front').removeClass('fballow')
    $('.behind').children().css('color', '#d4cdce')
    $('.front').children().css('color', '#d4cdce')
}




