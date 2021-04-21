var db = new DBHelper("todoList");
/**
 * loadTodoList
 * 페이지 로드 다된다음에 localStorage의 데이터를 리스트로 뿌려줌 
 * @param {String} todoText 
 */
  function  loadTodoList(){ 
    db.get();
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

  db.get().forEach(item=>{
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
    addListItem(item); // UI 표시 
    db.addItem(item); 
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
        if(e.keyCode === 13){
            addTodo($(this).val());
            $(this).val('');
        }
    });

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
       
    });
    
    $(this).on('click','.todo-list-add-btn',function(e){
        
        addTodo($('#todoInput').val());
    });

    // loadTodoList();    
    listUp();
});