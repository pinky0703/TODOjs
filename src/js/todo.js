// json 형식을 전역변수로 만든다
var todoList = [];
// todo list 에 있는 key 값을 여기다 넣어주고, value값을 리스트에 뿌려줄거임 
const DB_KEY = 'todoList';
/**
 * loadTodoList
 * 페이지 로드 다된다음에 localStorage의 데이터를 리스트로 뿌려줌 
 * @param {String} todoText 
 */
  function  loadTodoList(){ // 
    let strTodo = localStorage.getItem(DB_KEY); 
    if(strTodo === null){
        strTodo = [];
    }
    else
        todoList = JSON.parse(strTodo);
         // parse 했을때 json 배열일수도 있고 그냥 배열일수도 있대 

  }
  function saveTodoList(){
      localStorage.setItem(DB_KEY, JSON.stringify(todoList));
      localStorage.getItem(DB_KEY, JSON.stringify(todoList));
  }

  
  function addListItem(item){

    let checkedStr = item.isDone ? ' checked="checked"' : '';

    // $('#todoInput').prepend('<li class="list-group-item" data-id="' + item.id + '">' +
    // '<input class="form-check-input me-1" type="checkbox" value="" aria-label="">'+
    // todoText +
    // '</li>'); // 랜덤으로 가져온 id를 여기다 넣어준다  

    $('#todoList').append(`<li class="list-group-item" data-id="${item.id}">
    <input class="form-check-input me-1 todoCheck" type="checkbox" value="" ${checkedStr}>
    <button type="button" class="btn btn-outline-danger btn-sm todo-del-btn">X</button>
    ${item.text}</li>`); 


}

function listUp(){

  todoList.forEach(item=>{
      console.log(item.text);
      addListItem(item);
  });

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
function deleteItem(item){

    arr = arr.filter(item => item !== value);
    saveTodoList();
}

$(document).ready(function(){
    $('#todoInput').keydown(function(e){
        if(e.keyCode === 13){
            addTodo($(this).val());
            $(this).val('');
        }
    });

    $(this).on('change','.todoCheck',function(e){
        // data-id 갖고오는 법 ? 
        let itemId = $(this).parent().data('id'); // 속성이 data-id 의 값을 가져옴 //  콘솔로 문법 확인가능함 
        
        let isChecked = $(this).prop('checked');
        
        todoList.filter(f=>f.id==itemId).forEach(it => it.isDone = isChecked);

        // 체크된 항목 그레이로 색 변경 
        if(isChecked)
            $(this).parent().css('color','gray');
        else
            $(this).parent().css('color','black');
        // localStorage에 동기화(저장)
        localStorage.setItem()
        saveTodoList(); 

        // 색도 새로 고침해도 저장되게! 
    });

    $(this).on('click','.todo-del-btn',function(e){
        let itemId = $(this).parent().data('id');

        todoList.filter(itemId => itemId !== itemId); 
        $(this).parent().remove('li'); 
        //todoList.splice(todoList.value == itemId);
        // button의 parent를 remove  
        
        console.log( $(this).parent().data('id')+"삭제? ");
        // todoList = todoList.filter(item => item !== value);
        // 2. filter를 사용하는 방법 ?? 


        // 로컬스토리지에 저장하는거까지 
        saveTodoList(itemId);
       
    });
    
    $(this).on('click','.todo-list-add-btn',function(e){
        addTodo($('input[id=todoInput]').val());
        $('input[id=todoInput]').val('');
    });


    loadTodoList();    
    listUp();
});