//宣告全域變數
const all=document.querySelector('.all');
const finish=document.querySelector('.finish');
const unfinish=document.querySelector('.unfinish');
const list=document.querySelector('.list');

//初始資料
let data=[
    
]

//資料渲染
function renderData(filter = 'all'){
    let filterData=data;
    // 過濾資料
    if (filter === "unfinish") {
        filterData = filterData.filter(item => !item.checked);
    }else if(filter === "finish"){
        filterData = filterData.filter(item => item.checked);
    }
    // 渲染列表
    let str="";
    filterData.forEach(function(item,index){
        // ${finish_data.includes(item) ? 'checked' : ''}代表若在已完成清單，就打勾
        str+=`
        <li>
            <label class="checkbox">
                <input type="checkbox" class="checkedMark" data-index="${index}" ${item.checked ? 'checked' : ''} />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
        </li>
        `
    })
    list.innerHTML=str;
    CheckedEvent();
    //更新待完成項目統計
    const total=document.querySelector('.list_footer p');
    const unfinishCount = data.filter(item => !item.checked).length;
    total.textContent = `${unfinishCount} 個待完成項目`;
}

//顯示切換
all.addEventListener('click',function(e){
    e.preventDefault();
    renderData('all');
    all.classList.add('active');
    finish.classList.remove('active');
    unfinish.classList.remove('active');
});
finish.addEventListener('click', function(e) {
    e.preventDefault();
    renderData('finish');
    all.classList.remove('active');
    finish.classList.add('active');
    unfinish.classList.remove('active');
});
unfinish.addEventListener('click', function(e) {
    e.preventDefault();
    renderData('unfinish');
    all.classList.remove('active');
    finish.classList.remove('active');
    unfinish.classList.add('active');
});

//checkedEvent事件渲染
function CheckedEvent(){
    const checkedMark = document.querySelectorAll('.checkedMark');
    checkedMark.forEach(function(mark){
        mark.addEventListener('change',function(e){
            const index = e.target.dataset.index; // 獲取資料索引
            data[index].checked = e.target.checked; // 更新資料狀態
            renderData(); // 重新渲染
        })
    })
}

//新增代辦
const save = document.querySelector(".btn_add");
const input_text = document.querySelector(".input_text");
function handleSave(){
    if(input_text.value.trim()==""){
        alert("請輸入內容");
        return;
    }
    let obj={};
    obj.content=input_text.value;
    data.push(obj);
    renderData();
    input_text.value="";
}
//點擊監聽
save.addEventListener('click',function(e){
    handleSave();
})
//鍵盤enter監聽
input_text.addEventListener('keydown',function(e){
    if(e.key==="Enter"){ //e.key代表
        handleSave();
    }
})

//刪除項目
list.addEventListener('click',function(e){
    if(e.target.getAttribute('class')!=="delete"){
        return;
    }
    let num=e.target.getAttribute('data-num'); // 宣告num變數儲存該筆資料的索引
    data.splice(num,1);    
    renderData();
})

//清除已完成項目
const all_delete=document.querySelector('.list_footer a');
all_delete.addEventListener('click',function(e){
    data = data.filter(item => !item.checked);
    renderData();
})

renderData();
