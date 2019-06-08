let list=[];
let id;
let parms;
let revId;
let pagelist=5;
let pageCount;
let star=0;
let pageNum=5;
displayPageBtn();
// displayList();
$("body").on("click",".btnClose",function(){
    id=$(this).attr("data-id");
    displayDel(id);
    // displayList();
    if(pageCount<star){
        star=(pageCount-2)*5;
    }
    displayPage();
    displayPageBtn();
});
$("#btnQueMod").click(function () {
    parms=$(".formQue").serialize();
   displayQue(parms);
});
$(".box").on("click",".btnRev",function(){
    revId=$(this).attr("data-id");
    $(".input-sm").val("");
    displayPage();
    displayPageBtn();
});
$("#myModalRev").on("click","#btnRevClose",function(){
    parms=$("#formRev").serialize()+"&id="+revId;
    displayRev(parms);
    // displayList();
    displayPage();
    displayPageBtn();
})
$("#myModalAdd").on("click","#modAddClose",function(){
    parms=$("#formAdd").serialize();
    displayAdd(parms);
    // displayList();
    displayPage();
    displayPageBtn();
});
// 结果赋值
function displayList(){
    ajaxFn(null,"post","/user/loading.do",function(data){
        list=JSON.parse(data);
        displayPlay();
    },true)
}
//显示
function displayPlay() {
    $("tbody").html("");
    for(let i=0;i<list.length;i++){
        if(list[i].jobId==1){
            list[i].jobId='总经理';
        } else if(list[i].jobId==2){
            list[i].jobId='经理';
        }else{
            list[i].jobId='职员';
        }
        if(list[i].state==1){
            list[i].state='启用';
        }else{
            list[i].state='禁用';
        }
        if(list[i].createUser==1){
            list[i].createUser='小天使';
        }else{
            list[i].createUser='小仙女';
        }
        $("tbody").append(`
            <tr>
                <td><span class="text-warning">${list[i].staffId}</span></td>
                <td><span class="text-warning">${list[i].staffName}</span></td>
                <td><span class="text-warning">${list[i].jobId}</span></td>
           
                <td><span class="text-danger">${list[i].hiredate}</span></td>
                <td><span class="text-success">${list[i].state}</span></td>
                <td><span class="text-info">${list[i].createUser}</span></td>
                <td><span class="text-danger">${list[i].createDate}</span></td>
                <td> <button data-id=${list[i].staffId} class="btnClose btn btn-warning">删除</button>
                 <button data-target="#myModalRev" data-toggle="modal" data-id=${list[i].staffId} class="btnRev btn btn-info">修改</button></td>
            </tr>
        `);
    }

}
//删除
function displayDel(id){
    id="id="+id;
    ajaxFn(id,"post","/user/del.do",function(data){
    },true)
}
//添加
function displayAdd(parms){
    ajaxFn(parms,"post","/user/add.do",function(data){
    },true);
}
//修改
function displayRev(parms){
    ajaxFn(parms,"post","/user/rev.do",function(data){
    },true);
}
// 查询
function displayQue(parms){
    ajaxFn(parms,"post","/user/que.do",function(data){
       list=JSON.parse(data);
        displayPlay();
    },true);
}
//分页个数
function displayPage(){
    $(".pageCover").html("");
    ajaxFn(null,"post","/user/page.do",function(data){
        list=JSON.parse(data)[0].num;
        //插入页码
        pageCount=Math.ceil(list/pagelist);
        for(let i=1;i<=pageCount;i++){
            $(".pageCover").append(
                ` <button class="btn btn-success btnPage">${i}</button>
                `
            )
        }
    });
}
displayPage();
// 分页实现
function displayPageBtn(){
    parms="star="+star+"&pageNum="+pageNum;
    ajaxFn(parms,"post","/user/pageBtn.do",function(data){
        list=JSON.parse(data);
        displayPlay();

    });
}
$(".pageCover").on("click",".btnPage",function(data){
    star=Number($(this).text()-1)*5;
    pageNum=Number(pagelist);
    displayPageBtn();
});