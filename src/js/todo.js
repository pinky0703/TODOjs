// json 형식을 전역변수로 만든다
var todoList = [];
// todo list 에 있는 key 값을 여기다 넣어주고, value값을 리스트에 뿌려줄거임 
const DB_KEY = 'todoList';
/**
 * loadTodoList 내용 불러와서 리스트에 표시
 * @param {String} todoText 
 */
  function  loadTodoList(){ // 페이지 로드 다된다음에 localStorage의 데이터를 리스트로 뿌려줌 
    let strTodo = localStorage.getItem(DB_KEY); // 하드코딩X 기위해 
    // 얘가 null 이면 뒤에있는걸 쓴다 ! ?? 인경우 
    // null 이 아닐때는 string 으로 바꿔주기? key도 string, value 도 스트링  
    if(strToDo === null){
        
        strTodo = [];
    }
    else
        todoList = JSON.parse(strToDo); // parse 했을때 json 배열일수도 있고 그냥 배열일수도 있대 

    // for(let i=0;i<localStorage.length;i++){
    //     let item = localStorage.getItem(localStorage.key(i)); // key 값을 모르니까 이렇게 가져옴 
    // }
  }
  function saveTodoList(){
      localStorage.setItem(DB_KEY, JSON.stringify(todoList));
  }

  
  function addListItem(item){

    let checkedStr = item.isDone ? ' checked="checked" ' : '';

    $('#todoInput').prepend('<li class="list-group-item" data-id="' + item.id + '">' +
    '<input class="form-check-input me-1" type="checkbox" value="" aria-label="">'+
    todoText +
    '</li>'); // 랜덤으로 가져온 id를 여기다 넣어준다  

    $('#todoInput').prepend(`<li class="list-group-item" data-id=" ${item.id}">
    '<input class="form-check-input me-1 todoCheck" type="checkbox" value="" ${checkedStr}>
    ${item.text}</li>`); 
}

function listUp(){
    /*
    for(let i in todoList){ // 이렇게 쓰는거는 그 인덱스를 가져오는거 
        console.log(todoList[i].text);
    } */ 

  todoList.forEach(item=>{
      console.log(item.text);
      addListItem(item);
  });
  /* 화살표 함수의 다른 방식 
  todoList.forEach(function(item){
      console.log(item.id);
  });*/
}


/**
 * 할일 추가
 * @param {String} todoText 
 */
function addTodo(todoText){
    // 위에부터 추가 prepend
    // 아래에 추가 append
   

    // json item 
    let item = {
        'id': getTodoId(),
        'text' : todoText,
        'isDone' : false //  완료 됐는지 안됐는지 ? 
    }
    // list에 추가 
    addListItem(item);
    
    todoList.push(item); // js 에다가 푸시하고ㅡ, 로컬스토리지에 save 해야돼 
    saveTodoList(); // 정합성에 어긋날수도 있으니까 이거 두개 같이 세트로 들고 다녀야돼 
}
var isDigit = function(str){
    try{
        parseInt(str);
        return true;
    }catch(e){
        return false;
    }
   
}

$(document).ready(function(){
    $('#todoInput').keydown(function(e){
        if(e.keycode === 13){
            addTodo($(this).val());
            $(this).val('');
        }
    });

    $(this).on('change','.todoCheck',function(e){
        // data-id 갖고오는 법 ? 
        let itemId = $(this).parent().data('id'); // 속성이 data-id 의 값을 가져옴 //  콘솔로 문법 확인가능함 
        // js 변수에 해당 item isDone을 업데이트
        // let filtered = todoList.filter(f=>f.id==itemId);
                                    // 같은거만 가져와서
        let isChecked = $(this).prop('checked');
        // let isChecked2 = $(this).is(":checked"); 둘다가능 

        todoList.filter(f=>f.id==itemId).forEach(it => it.isDone = isChecked);

       /* let filtered = todoList.filter(f=>f.id==itemId);
        todoList.forEach(item=>{
            if(item.id == itemId){
                item.isDone = true;
                return false;
            }
        });*/ 
        // localStorage에 동기화(저장)
        saveTodoList();
    });
   //  $(this).on('change','.todoCheck',addTodo); -> 함수이런식으로 써여함
    /*
    $('#btnAdd').on('click')(function(e){
        addTodo($(this).val());
    });
    */

    // js 오류는 콘솔로 확인 
    // 콘솔로 테스트 해봐도됨(코드로)
    
    loadTodoList();    
    listUp();
});