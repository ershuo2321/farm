$(function () {
    // 点击firstul显示secondul
    $('.firstul').click(function () {
        if($('.nav').hasClass('hidden')){
            // 点击宽度60px的导航栏
            if ($(this).next().height()===0) {
                var height = $(this).next().children().length
                height = height * 45
                $(this).next().css('height', `${height}px`)
            } else {
                $(this).next().css('height', '0px')
            }

        }else{
            // 点击完整的导航栏
            if (!$(this).children().children(':eq(2)').hasClass('hidden')) {
                var height = $(this).next().children().length
                height = height * 45
                $(this).next().css('height', `${height}px`)
                $(this).children().children(':eq(2)').addClass('hidden')
                $(this).children().children(':eq(3)').removeClass('hidden')
            } else {
                $(this).next().css('height', '0px')
                $(this).children().children(':eq(3)').addClass('hidden')
                $(this).children().children(':eq(2)').removeClass('hidden')
            }
        }
    })

    // 设置li的点击高亮效果
    $('.nav-item,.nav-item2').click(function () {
        $('.nav-item,.nav-item2').removeClass('liactive')
        var i
        // $(this).addClass('liactive')
        if($('.nav').hasClass('hidden')){
            i= $('.nav-item2').index($(this)) 
        }else{
            i= $('.nav-item').index($(this)) 

        }
        $('.nav-item2').eq(i).addClass('liactive')
        $('.nav-item').eq(i).addClass('liactive')
      
    })

    //   设置鼠标hover选择语言事件
    $('.selectlanguage').hover(function () {
        $(this).children(':eq(3)').removeClass('hidden')
        $(this).children(':eq(1)').addClass('hidden')
        $(this).children(':eq(2)').removeClass('hidden')
    }, function () {
        $(this).children(':eq(3)').addClass('hidden')
        $(this).children(':eq(2)').addClass('hidden')
        $(this).children(':eq(1)').removeClass('hidden')
        $('.selectlanguage-ul').hover(function () {
            $('.selectlanguage').children(':eq(1)').addClass('hidden')
            $('.selectlanguage').children(':eq(2)').removeClass('hidden')
            $(this).removeClass('hidden')
        }, function () {
            $('.selectlanguage').children(':eq(2)').addClass('hidden')
            $('.selectlanguage').children(':eq(1)').removeClass('hidden')
            $(this).addClass('hidden')

        })
    }
    )

    // 设置鼠标hover用户名事件
    $('.exit').hover(function () {
        $(this).children(':eq(3)').removeClass('hidden')
        $(this).children(':eq(1)').addClass('hidden')
        $(this).children(':eq(2)').removeClass('hidden')
    }, function () {
        $(this).children(':eq(3)').addClass('hidden')
        $(this).children(':eq(2)').addClass('hidden')
        $(this).children(':eq(1)').removeClass('hidden')
        $('.exit-ul').hover(function () {
            $('.exit').children(':eq(1)').addClass('hidden')
            $('.exit').children(':eq(2)').removeClass('hidden')
            $(this).removeClass('hidden')
        }, function () {
            $('.exit').children(':eq(2)').addClass('hidden')
            $('.exit').children(':eq(1)').removeClass('hidden')
            $(this).addClass('hidden')

        })
    }
    )

    // 点击折叠导航栏事件
    $('.foldnav').click(function () {
        if($('.nav').hasClass('hidden')){
            $('.nav').removeClass('hidden')
            $('.nav2').addClass('hidden')
            var width = $('.nav').width()+'px'
            $('.rightbox').css('width',`calc(100% - ${width})`)


        }else{
            $('.nav2').removeClass('hidden')
            $('.nav').addClass('hidden') 
            var width = $('.nav2').width()+'px'
            $('.rightbox').css('width',`calc(100% - ${width})`)

        }
      })


    //  设置标签页
      var window_name = ''
      var window_url = ''
      var that
      var uniqueindex = 0
      var unique = 0
      
       $('.page1').click(function () {
          window_name = '曲线分析'
          window_url = 'page1.html'
         })
       $('.page2').click(function () {
          window_name = '历史数据'
          window_url = 'page2.html'
         })
       $('.page3').click(function () {
          window_name = '列表显示'
          window_url = 'page3.html'
         })
       $('.page4').click(function () {
          window_name = '分组管理'
          window_url = 'page4.html'
         })
       $('.page5').click(function () {
          window_name = '指令管理'
          window_url = 'page5.html'
         })
       $('.page6').click(function () {
          window_name = '设备管理'
          window_url = 'page6.html'
         })
       $('.page7').click(function () {
          window_name = '组态列表'
          window_url = 'page7.html'
         })
       $('.page8').click(function () {
          window_name = '执行记录'
          window_url = 'page8.html'
         })
       $('.page9').click(function () {
          window_name = '摄像头管理'
          window_url = 'page9.html'
         })
       $('.page10').click(function () {
          window_name = '秘钥管理'
          window_url = 'page10.html'
         })
       $('.page11').click(function () {
          window_name = '报警设备列表'
          window_url = 'page11.html'
         })
       $('.page12').click(function () {
          window_name = '触发历史'
          window_url = 'page12.html'
         })
       $('.page13').click(function () {
          window_name = '添加触发器'
          window_url = 'page13.html'
         })
       $('.page14').click(function () {
          window_name = '改版设备列表'
          window_url = 'page14.html'
         })
       $('.page15').click(function () {
          window_name = '继电器分组'
          window_url = 'page15.html'
         })
       $('.page16').click(function () {
          window_name = '中性管理'
          window_url = 'page16.html'
         })
       $('.page17').click(function () {
          window_name = '用户管理'
          window_url = 'page17.html'
         })
       $('.page18').click(function () {
          window_name = '个人设置'
          window_url = 'page18.html'
         })

  
         class Tab {
            constructor(id) {
                // 获取元素
                that = this
                this.main = document.querySelector(id)
                this.adds = document.querySelectorAll('.tabclick')
                this.lis = this.main.querySelectorAll('li')
                // li的父元素
                this.ul = this.main.querySelector('.tablist ul:first-child')
                this.init()
            }
            init() {
                this.updateNode()
                // init 初始化操作让相关的元素绑定事件
    
                for (var i = 0 ;i < this.adds.length; i++) {
                    this.adds[i].addEventListener('click', this.addTab)
                }
    
                for (var i = 0 ;i < this.lis.length; i++) {
                    // console.log(this.lis[i].innerText)
                    this.lis[i].index = i
                    this.lis[i].onclick = this.toggleTab
                    this.remove[i].onclick = this.removeTab
                }
    
                // console.log(unique)
            }
    
            // 因为我们动态添加元素 需要重新获取对应的元素
            updateNode() {
                this.lis = this.main.querySelectorAll('li')
                this.remove = this.main.querySelectorAll('.tablist li>i')
                this.spans = this.main.querySelectorAll('.tablist li span:first-child')
                this.ahref = this.main.querySelectorAll('.tablist li a:first-child')
            }
            // 1. 切换功能
            toggleTab() {
                that.clearClass()
                this.className = 'liactive2'
            }
            // 清除所有li 和section 的类
            clearClass() {
                for (var i = 0 ;i < this.lis.length ;i++) {
                    this.lis[i].className = ''
                }
            }
            // 2. 添加功能
            addTab() {
                that.clearClass()
                // 创建li元素和section元素 
                var node = document.createElement('li')
                node.className = 'liactive2'
                var textnode = '<a target="view_iframe" href="' + window_url + '"><span class="firstspan">' + window_name + '</span></a><i class="iconfont">&#xe659;</i></i>'
                node.innerHTML = textnode
                for (var i = 0 ;i < that.lis.length ;i++) {
                    if (node.innerText == that.lis[i].innerText) {
                        unique = 0
                        uniqueindex = i
                        break
                    }
                    else {
                        unique = 1
    
                    }
    
                }
                if (unique == 1) {
                    //如果添加的li不存在
                    // console.log('11111111111111' + '不存在')
                    that.ul.appendChild(node)
    
                }
    
                if (unique == 0) {
                    //如果添加的li已存在
                    // console.log(11111111111111 + '该目标已存在，不能重复添加!')
                    that.lis[uniqueindex].className = 'liactive2'
                    that.ahref[uniqueindex].click()
    
                }
    
                if (that.lis.length == 10) {
                    // alert("选项卡过多(选项卡不允许超过10个)")
                    that.lis[1].remove()
                }
                that.init()
    
    
    
            }
            // 3. 删除功能
            removeTab(e) {
                e.stopPropagation() // 阻止冒泡 防止触发li的切换点击事件
                var index = this.parentNode.index
                // 根据索引号删除对应的li 和section   remove()方法可以直接删除指定的元素
                that.lis[index].remove()
                that.init()
                // 当我们删除的不是选中状态的li的时候,原来的选中状态li保持不变
                if (document.querySelector('.liactive2')) {
                    return
                } else {
                    // 当我们删除了选中状态的这个li 的时候, 让它的前一个li处于选定状态
                    index--
                }
                // 手动调用我们的点击事件  不需要鼠标触发    
                if (that.lis[index]) {
                    that.lis[index].click()
                    that.ahref[index].click()
                }
    
    
    
            }
    
        }
        new Tab('#tab')

        // 点击监控大屏跳转页面
        $('#bigscreen').click(function () {
            window.location.href = './backindex.html'
        })
})