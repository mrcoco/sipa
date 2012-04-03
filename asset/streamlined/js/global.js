(function(a){
    a.fn.placeholder=function(b){
        return this.each(function(){
            if(!("placeholder" in document.createElement(this.tagName.toLowerCase()))){
                var c=a(this);
                var d=c.attr("placeholder");
                c.val(d).data("color",c.css("color")).css("color","#aaa");
                c.focus(function(){
                    if(a.trim(c.val())===d){
                        c.val("").css("color",c.data("color"))
                    }
                }).blur(function(){
                    if(!a.trim(c.val())){
                        c.val(d).data("color",c.css("color")).css("color","#aaa")
                    }
                })
            }
        })
    }
}(jQuery));
var menuYloc=null;
var previewYloc=null;
$(document).ready(function(){
    $("ul.tabs").tabs("div.panes > section");
    $("input[placeholder]").placeholder();
    $(":date").dateinput({
        format:"mm/dd/yyyy",
        trigger:true
    });
    $(".message.closeable").prepend('<span class="message-close"></span>').find(".message-close").click(function(){
        $(this).parent().fadeOut(function(){
            $(this).remove()
        })
    });
    $(".has-popupballoon").click(function(){
        $(".popupballoon").fadeOut();
        $(this).next().fadeIn();
        return false
    });
    $(".popupballoon .close").click(function(){
        $(this).parents(".popupballoon").fadeOut()
    });
    $(".list-view .more").click(function(){
        var a=$(this).attr("href");
        if(!$(this).parents("li").hasClass("current")){
            $(".preview-pane .preview").animate({
                left:"-375px"
            },300,function(){
                $(this).animate({
                    left:"-22px"
                },500).html('<img src="images/ajax-loader.gif" />').load(a)
            })
        }else{
            $(".preview-pane .preview").animate({
                left:"-375px"
            },300)
        }
        $(this).parents("li").toggleClass("current").siblings().removeClass("current");
        return false
    });
    $(".preview-pane .preview .close").live("click",function(){
        $(".preview-pane .preview").animate({
            left:"-375px"
        },300);
        $(".list-view li").removeClass("current");
        return false
    });
    if($("#wrapper > header").length>0){
        menuYloc=parseInt($("#wrapper > header").css("top").substring(0,$("#wrapper > header").css("top").indexOf("px")),10)
    }
    if($(".preview-pane .preview").length>0){
        previewYloc=parseInt($(".preview-pane .preview").css("top").substring(0,$(".preview").css("top").indexOf("px")),10)
    }
    $(window).scroll(function(){
        var a=0;
//        if($("#wrapper > header").length>0){
//            a=menuYloc+$(document).scrollTop();
//            if(!$.browser.msie){
//                $("#wrapper > header").animate({
//                    opacity:($(document).scrollTop()<=10?1:0.8)
//                })
//            }
//        }
        if($(".preview-pane .preview").length>0){
            a=previewYloc+$(document).scrollTop()+400>=$(".main-section").height()?a=$(".main-section").height()-400:previewYloc+$(document).scrollTop();
            $(".preview-pane .preview").animate({
                top:a
            },{
                duration:500,
                queue:false
            })
        }
    });
    $("body").append('<div class="apple_overlay black" id="overlay"><iframe class="contentWrap" style="width: 100%; height: 500px"></iframe></div>');
    $("a.help[rel]").overlay({
        effect:"apple",
        onBeforeLoad:function(){
            var a=this.getOverlay().find(".contentWrap");
            a.attr("src",this.getTrigger().attr("href"))
        }
    });
    $(".recent .contact").tooltip({
        position:"center right",
        effect:"slide",
        offset:[-30,-19]
    });
    $("[title]").tooltip({
        effect:"slide",
        offset:[-14,0]
    });
    $.tools.validator.fn("[type=time]","Please supply a valid time",function(a,b){
        return(/^\d\d:\d\d$/).test(b)
    });
    $.tools.validator.fn("[data-equals]","Value not equal with the $1 field",function(a){
        var b=a.attr("data-equals"),c=this.getInputs().filter("[name="+b+"]");
        return a.val()===c.val()?true:[b]
    });
    $.tools.validator.fn("[minlength]",function(a,c){
        var b=a.attr("minlength");
        return c.length>=b?true:{
            en:"Please provide at least "+b+" character"+(b>1?"s":"")
        }
    });
    $.tools.validator.localizeFn("[type=time]",{
        en:"Please supply a valid time"
    });
    //dirubah taufik
    $("#form").validator({
        position:"left",
        offset:[25,10],
        messageClass:"form-error",
        message:"<div><em/></div>"
    }).bind("onSuccess", function(e, els)  {
        $('#form').hide();
        $('#pesan').show();
    });
    $(".main-content > header .view-switcher > h2 > a").click(function(){
        $(this).focus().parent().next().fadeIn();
        return false
    }).blur(function(){
        $(this).parent().next().fadeOut();
        return false
    });
    $("#promo .close").click(function(){
        $("#promo").slideUp();
        $("body").removeClass("has-promo")
    })
});