$(function(){
    /*输入地址 此处不重载页面*/
    //test();
    load();
    var URL='';
    $("#url").on("keydown",function(){
        if((event.keyCode===13)&($(this).val()!=="")){
            URL=$(this).val();
            li=$("<li><input type='text' placeholder='输入收藏名' id='name'><a href='javascript:;' class='close' id='close'>-</a></li>");
            $("ul").prepend(li);
            $(this).val('');
        }
        
    })

    /*输入名字 动态绑定要绑定在非动态的父级上*/
    $("ul").on("blur","input[id='name']",function(){
        if(($(this).val()!=="")){
            var data=getData();
            data.push({name:$(this).val(),url:URL});
            saveData(data);
            $(this).parents("ul").empty();
            load();
        }else{
            var data=getData();
            data.push({name:"学习资料",url:URL});
            saveData(data);
            $(this).parents("ul").empty();
            load();
        }
            
        
        
    })
    /*删除收藏*/
    $("ul").on("click","a[class='close']",function(){
        var data=getData();
        var index=$(this).attr("id");
        data.splice(index,1);
        $(this).parents("ul").empty();
        saveData(data);
        load();
        
    })

    /*清空*/
    $("footer span").on("click",function(){
        var data=getData();
        length=data.length
        data.splice(0,length);
        saveData(data);
        $("ul").empty();
        load();
    })

    /**改名字 */

    $("ul").on("click","p",function(){
        var html="<input type='text' value="+$(this).html()+" id='change'>"
        $(this).hide().after(html);
    })
    $("ul").on("blur","input[id='change']",function(){
        
        var data=getData();
        var index=$(this).siblings(".close").attr("id");
        var val=$(this).val()
        $(data[index]).attr("name",val);
        
        saveData(data);
        $(this).siblings("p").show().html(val);
        $(this).remove();
    })

    /**改完名字 */

    function getData(){
        var data=localStorage.getItem("collections");
        if(data!=null){
            return JSON.parse(data);/**字符串转对象 */
        }else
            return[];
    }

    function saveData(data){
        localStorage.setItem("collections",JSON.stringify(data));
    }

    function load(){
        var data =getData();
        var ul=$("ul");
        $(data).each(function(i,ele){
            var li=$("<li><a href="+ele.url+" class='check' target ='_blank'></a><p>"+ele.name+"</p><a href='javascript:;' class='close' id="+i+">-</a></li>");
            ul.prepend(li);
        })
        $("section h2 span").text(data.length);
    }

    function test(){
        var data=getData();
        for(var i=0;i<10;i++){
            data.push({name:i,url:i})
        }
        saveData(data);
    }
    
})