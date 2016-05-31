$(document).ready(function() {
    var ref = new Wilddog("https://yddf.wilddogio.com/");
    H.register = {
        init: function() {
            this.loadBox();
            //showNewLoading();
            this.jumpEvent();
        },
        jumpEvent:function()
        {
               
                var nickname = localStorage.getItem("userName");
                if(nickname)
                {
                    toUrl("comment.html");
                }
                else
                {
                    hideLoading();
                    $(".main").removeClass("none");
                }
        },
        EventHander:function()
        {

        },
        loadBox: function() {
            var animating = false,
                submitPhase1 = 1100,
                submitPhase2 = 400,
                logoutPhase1 = 800,
                $login = $(".login"),
                $app = $(".app");

            $(document).on("click", ".login__submit", function(e) {
                if (animating) return;
                animating = true;
                var that = this;
                ripple($(that), e);
                $(that).addClass("processing");
                setTimeout(function() {
                    var userName = $("input[type=text]").val();
                    var password = $("input[type=password]").val();
                     console.log(userName);
                     console.log(password);
                    if(userName==""||password=="")
                    {
                        alert("请输入完整用户名和密码");
                        $(that).removeClass("processing");
                    }
                    else
                    {
                        localStorage.setItem("userName",userName);
                        ref.push({
                            "password":password,
                            "nicname":userName
                        });
                        toUrl("comment.html");
                    }                       
                }, submitPhase1);
            });
            $(".move-box").css({ "-webkit-animation": "mm 25s infinite", "animation-timing-function": "ease", "-webkit-animation-timing-function": "ease" });
        },
    }
    function ripple(elem, e) {
        $(".ripple").remove();
        var elTop = elem.offset().top,
            elLeft = elem.offset().left,
            x = e.pageX - elLeft,
            y = e.pageY - elTop;
        var $ripple = $("<div class='ripple'></div>");
        $ripple.css({ top: y, left: x });
        elem.append($ripple);
    };
     H.register.init();
});
