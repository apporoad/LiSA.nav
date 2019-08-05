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

function initMenu(data){
    var li="";
    for(var d in data){
        li+='<li><a href="'+(data[d].url||"javascript:;")+'" target="_blank">'+data[d].title+'</a></li>';
    }
    $("#products").empty();
    $("#products").html(li);
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

$(function () {
    getConfig();
    getData();
    initMenu(data);
    loadBg()
    $(".refresh").click(function () {
        $(this).attr("disabled",true);
        loadBg(true)
        $(this).attr("disabled",false);
    });
});