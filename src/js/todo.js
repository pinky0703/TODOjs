var db = new DBHelper("todoList");
/**
 * loadTodoList
 * 페이지 로드 다된다음에 localStorage의 데이터를 리스트로 뿌려줌 
 * @param {String} todoText 
 */
  function  loadTodoList(){ 
    db.get();
  }


  
  function addListItem(item, uiUpdate){

    let checkedStr = item.isDone ? ' checked ' : '';

    $('#todoList').append(`<li class="list-group-item" data-id="${item.id}">
    <div class="input-group">
        <div>
            <input class="form-check form-switch" type="checkbox" value="" ${checkedStr}>
        </div>
        <span class="todoText">${item.text}</span>
        <input type="text" class="form-control form-control-sm" />
        <button type="button" class="btn btn-outline-danger btn-sm todo-del-btn"><i class="fas fa-minus-circle"></i></button>
    </div>
    </li>`); 
    

}
function addEvent(){

    addTodo($('#todoInput').val());
    $('#todoInput').val('');

}
function listUp(){

  db.get().forEach(item=>{
      console.log(item.text);
      addListItem(item);
  });

}

/**
 * 할일 추가
 * @param {String} todoText 
 */
function addTodo(){
    // 위에부터 추가 prepend
    // 아래에 추가 append
    // json item 
    todoText = $('#todoInput').val();
    if( todoText != ''){
        todoText.val(''); 
        let item = {
            'id': getTodoId(),
            'text' : todoText,
            'isDone' : false //  완료 됐는지 안됐는지 ? 
        }
        db.addItem(item);
    }

    // 이거추가 
  
}
var isDigit = function(str){
    try{
        parseInt(str);
        return true;
    }catch(e){
        return false;
    }
   
}
var uiUpdate = function () { // 가상 벌츄어 돔 
    $('#todoList').html('');
    db.get().forEach(item=>addListItem(item));
}
$(document).ready(function(){
    $('#todoInput').keydown(function(e){
        if(e.keyCode === 13){
            addTodo();
        }
    });
    // $('#todoInput').keydown(e => if(e === 13){ addTodo()}});
    $('.todo-list-add-btn').click(addTodo);

    $(this).on('change','.todoCheck',function(e){
        // data-id 갖고오는 법 ? 
        let itemId = $(this).parent().data('id'); // 속성이 data-id 의 값을 가져옴 //  콘솔로 문법 확인가능함 
        let isChecked = $(this).prop('checked');
        db.updateIsDone(itemId, isChecked);

        // 색도 새로 고침해도 저장되게! 
    });

    $(this).on('click','.todo-del-btn',function(e){
        let itemId = $(this).parent().data('id');
        db.removeItem(itemId);
        $(this).parent().remove(); 
       
    });
    
    $(this).on('click','.todo-list-add-btn',function(e){
        addTodo();
    });

    // loadTodoList();    
    // listUp();
    uiUpdate();
});