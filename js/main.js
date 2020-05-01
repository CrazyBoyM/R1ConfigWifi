    let str;
    function setWifi(){
        $.ajax({
                type: "POST",
                dataType: "json",
                url: 'http://192.168.43.1:8989/api/configwifi',
                data:str
            });
    }
    function scanWifi(){
        $.ajax({
                type: "POST",
                dataType: "json",
                url: 'http://192.168.43.1:8989/api/getwifilist',
                data:{"page_size":30,"page_number":1}
            });
    }
    function json2str(){
        let ssid=$("#ssid").val();
        let passwd=$("#passwd").val();
        let secure=$("#secure").val();
        let info={
                    "ssid": ssid,
                    "mac":"",
                    "level":"",
                    "secure": secure,
                    "password": passwd
                    };
        let getinfo={
                    "page_size":30,
                    "page_number":1
                    };
        return JSON.stringify(info);
    }
    function loopx(){
        str=json2str();
        setWifi();
        $("#wifilist").val(str+"\n正在配网请等待7秒...");
        console.log("try post to http://192.168.48.1:8989/api/configwifi");
        //若7s后仍未成功配网，则多次触发post请求配网
        setTimeout(function(){
                    var i=1;
                    console.log("#############");
                    while(i<=6){
                        setWifi();
                        console.log("###"+i+"###");
                        i++;
                    }
                    $("#wifilist").val("配网已完成\n\n如音箱提示未绑定请访问https://fx.ip3x.com 查看解决方案\n(如不幸配网失败，请检查所填信息并刷新网页重试三到五次)");
                 },7000);
    }
