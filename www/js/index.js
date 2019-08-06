var conf,data
function getConfig(){
    $.ajax({
        type:"get",
        async:false,
        url:"conf/conf.json",
        dataType:"json",
        success:function(res){
            conf=res;
        }
    });
}

function getData(){
    $.ajax({
        type:"get",
        async:false,
        url:"conf/data.json",
        dataType:"json",
        success:function(res){
            data=res;
        }
    });
}

function init(data){
    var li="";
    for(var d in data){
        li+='<li><a href="'+(data[d].url||"javascript:;")+'" target="_blank">'+data[d].title+'</a></li>';
    }
    $("#products").empty();
    $("#products").html(li);

    setLogin($.cookie('LiSA.login'))
}

var loadBg= function(reFresh){
    var n = $.cookie('LiSA.nav')
    if(conf.bgImg.length == 0)
    {
        $(".bg").css("background-image",'url("img//LiSA.jpg")');
        return
    }
    if(reFresh){
        n =  Math.floor(Math.random()*(conf.bgImg.length)+0) 
        $.cookie('LiSA.nav',n, {expires: 7,path:'/'});
    }
    //$(".bg").css("background-image",'url("img//LiSA.jpg")');
    $(".bg").css("background-image",'url("img//'+conf.bgImg[n]+'")');
}


var setLogin = function(setValue){
    var value = setValue || $(".login").text()
    value = value.replace(/[^\a-\z\A-\Z0-9]/g,'')
    if(value.length>6){
        value= value.substr(0,8)
    }
    if(!value){
        $(".login").text("login")
        $.cookie('LiSA.login',"", {expires: 7,path:'/'});
    }else{
        $(".login").text(value)
        $.cookie('LiSA.login',value, {expires: 7,path:'/'});
    }

}
$(function () {
    getConfig();
    getData();
    $(".refresh").click(function () {
        $(this).attr("disabled",true);
        loadBg(true)
        $(this).attr("disabled",false);
    });
    $(".login").focus(function(){
        var name = $.trim($(".login").text())
        if(name && name == "login"){
            $(".login").text("")
        }
    })
    $(".login").blur(function(){
        setLogin()        
    })
    $(".login").keydown(function(event){
        if (event.keyCode == 13) {
            $(".login").blur()
        }
    })
    init(data);
    loadBg()
});