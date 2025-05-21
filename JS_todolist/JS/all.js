//完成與未完成資料
let unfinish_data=[
    
]
let finish_data=[

]

//資料渲染
function renderData(type = 'unfinish'){
    let str="";
    let targetData = [];
    if (type === 'unfinish') {
        targetData = unfinish_data;
    } else if (type === 'finish') {
        targetData = finish_data;
    } else if (type === 'all') {
        targetData = [...unfinish_data, ...finish_data]; // 合併兩個陣列
    }
    targetData.forEach(function(item,index){
        str+=`<li><label class="checkbox"><input type="checkbox" ${finish_data.includes(item) ? 'checked' : ''} /><span>${item.content}</span></label><a href="#" class="delete" data-num=${index} data-type="${type}"></a></li>`
    })
    const list=document.querySelector('.list');
    list.innerHTML=str;
    const total=document.querySelector('.list_footer p');
    total.textContent = `${unfinish_data.length} 個待完成項目`;
}
renderData();

//新增代辦
const save = document.querySelector(".btn_add");
const input_text = document.querySelector(".input_text");
save.addEventListener('click',function(e){
    if(input_text.value==""){
        alert("請輸入內容");
        return;
    }
    let obj={};
    obj.content=input_text.value;
    unfinish_data.push(obj);
    renderData();
    input_text.value="";
})

//刪除代辦(從待完成清單刪除，加到已完成清單)
const list = document.querySelector(".list");
list.addEventListener('click',function(e){
    if(e.target.getAttribute('class')!=="delete"){
        return;
    }
    let num=e.target.getAttribute('data-num'); // 宣告num變數儲存該筆資料的索引
    const item=unfinish_data[num]; // 宣告item變數儲存該筆資料內容
    finish_data.push(item);
    unfinish_data.splice(num,1);
    renderData();
})

//顯示切換
const all=document.querySelector('.all');
const finish=document.querySelector('.finish');
const unfinish=document.querySelector('.unfinish');
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

//清除已完成項目
const all_delete=document.querySelector('.list_footer a');
all_delete.addEventListener('click',function(e){
    e.preventDefault();
    finish_data=[];
    // 根據當前選取的 tab 來渲染對應的內容
    if (all.classList.contains('active')) {
        renderData('all');
    } else if (finish.classList.contains('active')) {
        renderData('finish');
    } else {
        renderData('unfinish');
    }
})

