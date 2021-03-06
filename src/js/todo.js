
var db = new MySqlHelper("",uiUpdate);


function addListItem(item){
    let checkedStr = item.isDone ? ' checked' : '';
    let color      = checkedStr  ? 'lightgray' : 'white';
    // 위에 추가 : prepend
    // 아래로 추가 : append
    $('#todoList').append(`<li class="list-group-item todoLi" data-id="${item.id}">
            <div class="input-group">
                <div class="form-check form-switch">
                    <input class="form-check-input todoCheck" type="checkbox" ${checkedStr}>
                </div>
                <span class="todoText todo-flex">${item.text}</span>
                <input type="text" class="todoTextInput form-control form-control-sm d-none" />
                <button type="button" class="btn btn-outline-danger btn-sm todo-del-btn"><i class="fas fa-minus-circle"></i></button>
            </div>
        </li>`);
}

function uiUpdate(){
    $('#todoList').html(''); //ui에서 List clear
    db.get().forEach(item=>addListItem(item)); //db값으로 redraw
}

/**
 * 할 일 추가
 * @param {string} todoText 
 */
function addTodo(){
    let todoText = $("#todoInput").val();
    $("#todoInput").val('');
    let item = {
        'id'    : getTodoId(),
        'text'  : todoText,
        'isDone': false
    }
    // db에 추가 
    addListItem(item);
    db.addItem(item);
}

function getCurrentItemId(jElement){
    return jElement.closest('li.todoLi').data('id'); // data-id 
}

function updateAll(item){

}
$(document).ready(function(){

    $('#todoInput').keydown(e=>{if(e.keyCode==13) addTodo();});
    $('.add').click(addTodo);


    //CHECK
    $(this).on("change",".todoCheck",function(e){
        let itemId = getCurrentItemId($(this));
        // let itemId = $(this).closest('li.todoLi').data('id'); //속성이 data-id의 값을 가져옴 // 붙여서 써야함 
        let isChecked = $(this).prop("checked");  // $(this).is(":checked")도 가능 -> 이부분 바꾸기 closest 로 !! ☆
        let text = $(this).closest("li").find("span.todoText").text();
        let item = {
            id : itemId,
            text : text,
            isDone : isChecked
        };
        //배경 흰색으로
        if(isChecked) 
            $(this).parent().css("background-color","gray");
        else
            $(this).parent().css("background-color","white");
        // js변수에 해당 item isDone을 업데이트
        db.updateItem(item);

    });

    //DELETE
    $(this).on("click",".todo-del-btn",function(e){
        let itemId = $(this).closest('li').data('id'); //속성이 data-id의 값을 가져옴
        db.removeItem(itemId);
        //display delete
        $(this).parent().remove();
    });

    $(this).on("click",".todoText",function(e){
       // let input = $(this).parent().find('.todoTextInput'); parent 사이에 뭔가 생기면 못찾음 
       let input = $(this).closest('li.todoLi').find('.todoTextInput');
       input.val($(this).text());
       input.removeClass('d-none'); // show, hide 해도되고 
       $(this).addClass('d-none');
       input.focus();
    });

    //바깥으로 빠져나갔을때 저장되는 이벤트
    $(this).on('blur','.todoTextInput',function (e) {
        let itemId = getCurrentItemId($(this));
        
        console.log(itemId, editText);
        db.updateItem(itemId, editText);
    });

    // 저장돼있는 todoList를 UI 표시함 
    uiUpdate();
});