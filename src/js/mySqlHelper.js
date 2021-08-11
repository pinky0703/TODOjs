class MySqlHelper{
    //TODO : 생성자 (파라미터)
    // 변수이름 앞에 #붙이면 private변수 선언

    constructor(KEY, uiCallback){
        this.apiUrl = 'http://localhost:8989';
        this.uiCallback = uiCallback;
    }
    //JAVASCRIPT, PYTHON 은 class 내부에 변수선언을 하지 않아도 접근 가능
    // testClass = new DBHelper("HI");
    // testClass.KEY : public변수 사용 //HI

    /**
     * #dataList 리턴
     */
    get(){
        let dataList = [];
        // ajax로 해도 되고 $.post로 써도돼 
        $.ajax({
            url: this.apiUrl + '/api/get',
            async: false, // 일단 동기로 하기 
            type:'GET', // GET, PUT
            data:{},
            dataType:'json', // string으로 넘어온다 -> text로 바꿨다가 다시
            success: function(data) {
                // 성공시 데이터 갖고오고 
                console.log(data); 
                dataList = data;
            },
            error: function(jqXHR) {
                alert(jqXHR); // 
            },
    

        });
        return dataList;
    }

    /**
     * localStorage에서 KEY값으로 #dataList를 문자열로 저장 
     */
    save(){
       
        this.uiCallback();
    }

    /**
     * #dataList 에 item 추가 후 save()
     * @param {json} item 
     */
    addItem(item){
        // insert 
        var parent = this; // ***
        $.ajax({
            url: this.apiUrl + '/api/add',
            async: true, // 리턴하는게 없으니까 비동기 
            type:'POST', // GET, PUT
            data: item,
            dataType:'text', // string으로 넘어온다 -> text로 바꿨다가 다시
            success: function(data) {
                // 성공시 데이터 갖고오고 
                console.log(data); 
                parent.uiCallback(); // 바로 업데이트 
            },
            error: function(jqXHR) {
                alert(jqXHR); // 
            },
    

        });
       
    }

    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     * @param {string} itemId 
     * @param {boolean} isDone
     */
    updateIsDone(itemId, isDone){
        var parent = this;
        var parent = this;
        var settings = { // 호출하는것만 쓴다
            url: 'http://localhost:8989/api/update/' + itemId,
            type: "POST",
            timeout: 0
        };

        // 위에께 다 실행되면 아래께 실행 
        $.ajax(settings).done(function(response){
            console.log();       
            if('SUCCESS' == response){
                parent.uiCallback();
            }else{
                alert(response);
            }
        });
    }
    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     */
    updateText(itemId, editText){
        var parent = this;
        var settings = { // 호출하는것만 쓴다
            url: 'http://localhost:8989/api/update/' + itemId,
            type: "POST",
            timeout: 0,
            data: {
                id : itemId,
                text : editText
            }
        };

        // 위에께 다 실행되면 아래께 실행 
        $.ajax(settings).done(function(response){
            console.log();       
            if('SUCCESS' == response){
                parent.uiCallback();
            }else{
                alert(response);
            }
        });
    }
    
    /**
     * itemId 에 해당하는 item 삭제 
     * @param {string} itemId 
     */
    removeItem(itemId){
        var parent = this; // ***
        var settings = { // 호출하는것만 쓴다
            url: 'http://localhost:8989/api/delete/' + itemId,
            type: "POST",
            timeout: 0
        };

        // 위에께 다 실행되면 아래께 실행 
        $.ajax(settings).done(function(response){
            console.log();       
            if('SUCCESS' == response){
                parent.uiCallback();
            }else{
                alert(response);
            }
        });
    }

}