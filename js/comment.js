$(document).ready(function() {
    var ref = new Wilddog("https://john.wilddogio.com/");
    H.comment = {
        init: function() {
            $(".move-box").css({
                "-webkit-animation": "mm 25s infinite",
                "animation-timing-function": "ease",
                "-webkit-animation-timing-function": "ease"
            });
            this.EventHander();
            // ref.onDisconnect().remove();
        },
        EventHander: function() {
            var nickname = localStorage.getItem("userName");
            $("#submit").click(function() {
                var name = localStorage.getItem("userName") ? localStorage.getItem("userName") : "匿名";
                var word = $("#world").val();
                if($("body").find(".noRecord"))
                {
                    $(".noRecord").remove();
                };
                ref.push({
                    "sayword": word,
                    "nicname": name
                });
            });
            ref.on('child_added', function(snapshot) {
                $(".commentDiv").append('<p class="' + snapshot.key() + ' fadeInRight" ><span>' + snapshot.child("nicname").val() + ':' + snapshot.child("sayword").val() + '</span></p>');
                $(".commentDiv").scrollTop(9999)
            });
            $("#selectbtn").click(function() {
                $(".selectinfor").removeClass("none");
            });
            $("#clearuser").click(function() {
                ref.on("value", function(snapshot) {
                    console.log(snapshot);
                    snapshot.forEach(function(item) {
                        if (item.child("nicname").val() == nickname) {
                            item.ref().remove();
                        }
                    })
                    ref.off("value");
                })
            });
            ref.on('child_removed', function(snapshot) {
                console.log("=============child_removed==========================");
                console.log(snapshot.child("sayword").val());
                $("p." + snapshot.key()).remove();
            });
            $("#selectRecord").click(function() {
                var userName = $("#whoName").val();
                if (userName == "") {
                    alert("请输入用户名");
                } else {
                    ref.on("value", function(snapshot) {
                        $(".commentDiv").empty();
                        var count = 0;
                        snapshot.forEach(function(item) {
                            if (item.child("nicname").val() == userName) {
                                count++;
                                $(".commentDiv").append('<p class="' + item.key() + '">' + item.child("nicname").val() + ':' + item.child("sayword").val() + '</p>');
                            }
                        })
                        if (count == 0) {
                            $(".commentDiv").append('<p style="margin-top:100px;width:100%;text-align:center" class="noRecord">' + '没有这个人的记录</p>')
                        }
                        ref.off("value");
                    });
                }
            });
        },

    }
    H.comment.init();
});