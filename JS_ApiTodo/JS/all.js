//該testAPI由五倍學院提供 https://todoo.5xcamp.us/api-docs/index.html
const apiUrl="https://todoo.5xcamp.us";

// axios 全域攔截器，處理 token 過期
axios.interceptors.response.use(
  res => res,
  error => {
    const { status } = error.response || {};
    if (status === 401) {
      Swal.fire({
        icon: 'warning',
        title: '登入已過期',
        text: '請重新登入'
      }).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('nickname');
        delete axios.defaults.headers.common['Authorization'];
        location.reload();
      });
    }
    return Promise.reject(error);
  }
);

//遠端API串接驗證
//使用者驗證
let userName = ''; // 儲存使用者名稱
function getUser() {
  const nickname = localStorage.getItem('nickname');
  if (nickname) {
    userName = nickname; 
    document.querySelector(".todolist_page span").textContent = `${nickname}的代辦`;
  }
}
//使用者註冊
function signUp(email,nickname,pwd){
  axios.post(`${apiUrl}/users`,{
    "user": {
      "email": email,
      "nickname": nickname,
      "password": pwd
    }
  })
  .then(res=>{
    console.log(res);
    Swal.fire({
        icon: 'success',
        title: '註冊成功',
        text: '請登入帳號使用代辦功能',
    });
    login_page.classList.remove("d-none");
    register_page.classList.add("d-none");
  })
  .catch(error => {
    Swal.fire({
        icon: 'error',
        title: '註冊失敗',
        text: '請稍後再試',
    });
  });
}
//使用者登入
function login(email,pwd){
  axios.post(`${apiUrl}/users/sign_in`,{
    "user": {
      "email": email,      
      "password": pwd
    }
  })
  .then(res=>{
    // 登入成功後，儲存使用者名稱
    userName=res.data.nickname; 
    localStorage.setItem('nickname', userName);
    // 登入成功後，儲存 token   
    const token = res.headers.authorization;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = token;
    login_page.classList.add("d-none");
    todolist_page.classList.remove("d-none");    
    getUser()
    getTodo();
  })
  .catch(error=>{
    Swal.fire({
        icon: 'error',
        title: '登入失敗',
        text: '請確認帳號與密碼是否正確',
    });
    console.log(error.response)
    })
}
//取得全部資料
function getTodo() {
  axios.get(`${apiUrl}/todos`)
    .then(res => {   
      document.querySelector(".todolist_page span").textContent=`${userName}的代辦`;   
      const todos = res.data.todos;
      data = todos.map(item => {
        return {
          id: item.id,
          content: item.content,
          checked: item.completed_at ? true : false
        };
      });
      renderTodoList(); // 將轉換後的資料渲染出來
    })
    .catch(error => {
      console.log(error.response);
    });
}
//新增資料
function addTodo(todo){
  axios.post(`${apiUrl}/todos`,{
    "todo": {
      "content": todo
    }
  })
  .then(res=>{    
    getTodo(); // 更新畫面
  })
  .catch(error=>console.log(error.response))
}
//編輯資料
function editTodo(todo,todoId){
  axios.put(`${apiUrl}/todos/${todoId}`,{
    "todo": {
      "content": todo
    }
  })
  .then(res=>{    
    getTodo(); // 更新畫面
  })
  .catch(error=>console.log(error.response))
}
//刪除資料
function delTodo(todoId){
  axios.delete(`${apiUrl}/todos/${todoId}`)
    .then(res => {      
      getTodo(); // 刪除後重新取得資料
    })
    .catch(error => console.log(error.response));
}
//更新狀態
function toggleTodo(todoId){
  axios.patch(`${apiUrl}/todos/${todoId}/toggle`, {})
    .then(res => {      
      getTodo(); // 重新取得並渲染資料
    })
    .catch(error => console.log(error.response));
}

// 綁定 DOM 元件
const login_page = document.querySelector(".login_page"); //登入頁面
const register_page = document.querySelector(".register_page"); //註冊頁面
const todolist_page = document.querySelector(".todolist_page"); //todo頁面
//登入頁面
const register01 = document.getElementById("register01");
const login01 = document.getElementById("login01");
const mail01=document.querySelector(".mail01");
const pwd01=document.querySelector(".pwd01");
//註冊頁面
const login02=document.getElementById("login02");
const register02=document.getElementById("register02");
const mail02=document.querySelector(".mail02");
const pwd02=document.querySelector(".pwd02");
const nickname=document.querySelector(".nickname");
const R_pwd=document.querySelector(".R-pwd");
//todolist頁面
const logout = document.getElementById("logout");
const btn_add=document.querySelector(".btn_add");
const input_text=document.querySelector(".input_text");
const list=document.querySelector(".list");
const all_delete=document.querySelector(".list_footer a");
const all=document.querySelector(".all");
const unfinish=document.querySelector(".unfinish");
const finish=document.querySelector(".finish");
let data = [];
let currentFilter = 'all'; // 追蹤目前篩選狀態

// 登入頁面
// 點擊「註冊帳號」按鈕，切換到註冊頁面
register01.addEventListener("click", function(e) {
    e.preventDefault();    
    login_page.classList.add("d-none");
    register_page.classList.remove("d-none");
});
// 登入串接API驗證
login01.addEventListener("click",(e)=>{
    e.preventDefault();
    if(mail01.value.trim()==="" || pwd01.value.trim()===""){
        Swal.fire({
            icon: 'error',
            title: '登入失敗',
            text: 'Email和密碼不得為空值',
        });
        return;
    }
    login(mail01.value,pwd01.value);
})

//註冊頁面
// 點擊「登入」按鈕，切換到登入頁面
login02.addEventListener("click",(e)=>{
    e.preventDefault();
    login_page.classList.remove("d-none");
    register_page.classList.add("d-none");
})
// 註冊串接API驗證
register02.addEventListener("click",(e)=>{
    e.preventDefault();
    if(mail02.value.trim()==="" || pwd02.value.trim()==="" || nickname.value.trim()==="" || R_pwd.value.trim()===""){        
        Swal.fire({
            icon: 'error',
            title: '註冊失敗',
            text: '所有欄位都必須填寫',
        });
        return;
    }
    if(pwd02.value.trim()!==R_pwd.value.trim()){        
        Swal.fire({
            icon: 'error',
            title: '註冊失敗',
            text: '密碼與確認密碼不一致',
        });
        return;
    }    
    signUp(mail02.value,nickname.value,pwd02.value);    
})

//todolist頁面
//資料渲染
function renderTodoList() {
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
        <div class="actions">
          <a href="#" class="edit" data-id="${item.id}"><i class="fa-solid fa-pen"></i></a>
          <a href="#" class="delete" data-id="${item.id}"></a>
        </div>
      </li>
    `;
  });
  list.innerHTML = str;
  updateTabActive();
  CheckedEvent();
  //更新未完成數量
  const total = document.querySelector('.list_footer p');
  const unfinishCount = data.filter(item => !item.checked).length;
  total.textContent = `${unfinishCount} 個待完成項目`;
}
//登出功能
logout.addEventListener("click",(e)=>{
    e.preventDefault();
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    todolist_page.classList.add("d-none");
    login_page.classList.remove("d-none");
})
//新增功能
btn_add.addEventListener("click",(e)=>{
    e.preventDefault();
    if(input_text.value.trim()===""){        
        Swal.fire({
            icon: 'error',
            title: '新增失敗',
            text: '輸入欄位不得為空值',
        });
        return;
    }
    addTodo(input_text.value);    
    Swal.fire({
        icon: 'success',
        title: '新增成功',
        text: '成功新增一筆資料!',
    });
    input_text.value = "";
})
// Enter 也能新增
input_text.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    btn_add.click();
  }
});
//刪除功能
list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    e.preventDefault();
    const id = e.target.getAttribute("data-id");
    Swal.fire({
        title: '確定要刪除這筆資料嗎？',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '刪除',
        cancelButtonText: '取消'
    }).then((result) => {
    if (result.isConfirmed) {
        delTodo(id);
    }
    });
  }
});
//編輯功能
list.addEventListener("click", function (e) {
  if (e.target.closest(".edit")) {
    e.preventDefault();
    const id = e.target.closest(".edit").dataset.id;
    const li = e.target.closest("li");
    const content = li.querySelector("span").textContent;
    const newContent = prompt("請輸入新的內容：", content);
    if (newContent === null) return; // 使用者按取消
    if (newContent.trim() === "") {
      Swal.fire({
        icon: 'error',
        title: '修改失敗',
        text: '內容不得為空值',
      });
      return;
    }
    if (newContent.trim() === content.trim()) return; // 沒變化就不送出
    editTodo(newContent.trim(), id); // 發送更新 API    
  }  
});
//勾選事件
function CheckedEvent(){
    const checkedMark=document.querySelectorAll(".checkedMark");
    checkedMark.forEach(function(mark){
        mark.addEventListener("change",(e)=>{
            const id=e.target.dataset.id;
            toggleTodo(id);
        })
    })
}
//刪除已完成項目
all_delete.addEventListener("click",(e)=>{
    const completedItems=data.filter(item => item.checked);    
    // 確認是否要刪除
    if (!confirm("確定要刪除所有已完成的項目嗎？")) return;
    // 計算資料總數
    let count=0;
    completedItems.forEach((item)=>{
        axios.delete(`${apiUrl}/todos/${item.id}`)
            .then(()=>{
                count++;
                // 等全部刪完再重新抓資料
                if (count===completedItems.length){
                    getTodo();
                }
            })
            .catch(error=>{
                console.log(`刪除失敗（ID: ${item.id}）`, error);
            })
    })
})
//篩選分類
all.addEventListener("click",(e)=>{
  e.preventDefault();
  currentFilter="all";
  getTodo();
})
finish.addEventListener("click",(e)=>{
  e.preventDefault();
  currentFilter="finish";
  getTodo();
})
unfinish.addEventListener("click",(e)=>{
  e.preventDefault();
  currentFilter="unfinish";
  getTodo();
})
//更新tab樣式
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

// 每次頁面載入就檢查 token
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
  login_page.classList.add("d-none");
  todolist_page.classList.remove("d-none");
  getUser(); // 顯示暱稱
  getTodo(); // 自動抓 todo 清單
}