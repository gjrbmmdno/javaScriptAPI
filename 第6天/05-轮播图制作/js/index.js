window.addEventListener('load', function(){
    //1 获取元素    
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;




    // 2. 鼠标经过focus 就显示隐藏左右按钮
    focus.addEventListener('mouseenter', function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;

    })
    focus.addEventListener('mouseleave', function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        }, 2000);
    })

    
    // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++){
        // 创建一个小li
        var li =  document.createElement('li');
        li.setAttribute('index', i);

        // 把小li插入到ol里面
        ol.appendChild(li);
        li.addEventListener('click', function() {
            //干掉所有人 
            for(var i = 0; i < ol.children.length; i++){
                ol.children[i].className = '';
            }
            //留下我自己
            this.className = 'current';

            //点击小圆圈， 移动图片 当然移动的是ul
            var index = this.getAttribute('index');
            circle = num = index;

            animate(ul, -index * focusWidth);

        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = 'current';

    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    var num = 0 ;
    // circle 控制小圆圈的变化
    var circle = 0;

    var flag = true;
    
    arrow_r.addEventListener('click', function(){
        if(flag){
            flag = false;
            //如果走到了最后一张图， 此时 ul 要快速复原left 改为 0
            if(num == ul.children.length - 1){
                ul.style.left = 0;
                num = 0;
            }    

            num++;
            animate(ul, -num * focusWidth, function(){
                flag = true;
            });        
            circle++;
            if(circle == ol.children.length){
                circle = 0;
            }
            
            circleChange();

        }
    })



    arrow_l.addEventListener('click', function(){
        if(flag){
            flag = false;
            //如果走到了最后一张图， 此时 ul 要快速复原left 改为 0
            if(num == 0){
                num = ul.children.length - 1;

                ul.style.left = -num * focusWidth + 'px';
            }    

            num--;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            });        
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();

        }
    })

    function circleChange() {
        //先清除其余小圆圈的current类名
        for(var i = 0; i < ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

})