// 宣告全域變數
const all = document.querySelector('.all');
const finish = document.querySelector('.finish');
const unfinish = document.querySelector('.unfinish');
const list = document.querySelector('.list');
const save = document.querySelector(".btn_add");
const input_text = document.querySelector(".input_text");
const all_delete = document.querySelector('.list_footer a');

// 初始資料與狀態
let data = [];
let currentFilter = 'all'; // 追蹤目前篩選狀態

// 渲染資料
function renderData() {
    let filterData = data;
    if (currentFilter === "unfinish") {
        filterData = data.filter(item => !item.checked);
    } else if (currentFilter === "finish") {
        filterData = data.filter(item => item.checked);
    }
    let str = "";
    filterData.forEach(function (item) {
        str += `
        <li>
            <label class="checkbox">
                <input type="checkbox" class="checkedMark" data-id="${item.id}" ${item.checked ? 'checked' : ''} />
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-id="${item.id}"></a>
        </li>
        `;
    });
    list.innerHTML = str;
    updateTabActive(); // 更新 tab 樣式
    CheckedEvent();
    // 更新未完成數量
    const total = document.querySelector('.list_footer p');
    const unfinishCount = data.filter(item => !item.checked).length;
    total.textContent = `${unfinishCount} 個待完成項目`;
}

// 勾選事件綁定
function CheckedEvent() {
    const checkedMark = document.querySelectorAll('.checkedMark');
    checkedMark.forEach(function (mark) {
        mark.addEventListener('change', function (e) {
            const id = e.target.dataset.id;
            const item = data.find(item => item.id === id);
            if (item) {
                item.checked = e.target.checked;
            }
            renderData(); // 不變更 currentFilter，只重渲染
        });
    });
}

// 新增任務
function handleSave() {
    const value = input_text.value.trim();
    if (value === "") {
        alert("請輸入內容");
        return;
    }
    let obj = {
        id: Date.now().toString(), // 用 timestamp 當唯一 ID
        content: value,
        checked: false
    };
    data.push(obj);
    input_text.value = "";
    renderData();
}

// 篩選分類
all.addEventListener('click', function (e) {
    e.preventDefault();
    currentFilter = 'all';
    renderData();
});
finish.addEventListener('click', function (e) {
    e.preventDefault();
    currentFilter = 'finish';
    renderData();
});
unfinish.addEventListener('click', function (e) {
    e.preventDefault();
    currentFilter = 'unfinish';
    renderData();
});

// 更新 tab 樣式
function updateTabActive() {
    all.classList.remove('active');
    finish.classList.remove('active');
    unfinish.classList.remove('active');
    if (currentFilter === 'all') {
        all.classList.add('active');
    } else if (currentFilter === 'finish') {
        finish.classList.add('active');
    } else {
        unfinish.classList.add('active');
    }
}

// 監聽新增按鈕 & Enter 鍵
save.addEventListener('click', handleSave);
input_text.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        handleSave();
    }
});

// 刪除項目
list.addEventListener('click', function (e) {
    if (e.target.classList.contains("delete")) {
        const id = e.target.dataset.id;
        data = data.filter(item => item.id !== id);
        renderData();
    }
});

// 清除已完成
all_delete.addEventListener('click', function (e) {
    e.preventDefault();
    data = data.filter(item => !item.checked);
    renderData();
});

renderData(); // 初次渲染