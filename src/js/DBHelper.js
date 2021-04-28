class DBHelper{
    #dataList = [];
    #KEY = '';
    constructor(KEY, uiCallback){
        this.#KEY = KEY;
        let strTodo = localStorage.getItem(this.#KEY); 
        this.#dataList = (strTodo === null) ? []:  JSON.parse(strTodo);
        this.uiCallback = uiCallback;
    }
    
    /**
     * #dataList 리턴 
     */
    get(){
        return this.#dataList;
    }

    /**
     * localStorage 에 KEY 값으로 #dataList 를 문자열로 저장
     */
    save(){
        localStorage.setItem(this.#KEY, JSON.stringify(this.#dataList));
    }

    /**
     * #dataList 에 item 추가 후 save()
     * @param {json} item 
     */
    addItem(item){
        this.#dataList.push(item);
        this.save();
    }

    /**
     * itemId 에 해당하는 item 의 완료체크 업데이트 
     * @param {string} itemId 
     * @param {boolean} isChecked 
     */
    updateIsDone(itemId, isChecked){
        this.#dataList.filter(f=>f.id==itemId).forEach(it => it.isDone = isChecked);
        this.save();
        // 회색으로 바꿔주는거 
        // this.#dataList.filter(f=>f.id==itemId).forEach(it => it.isDone = isChecked);
    }

    /**
     * itemId 에 해당하는 item 삭제 
     * @param {string} itemId 
     */
    removeItem(itemId){
        this.#dataList = this.#dataList.filter(f=>f.id !== itemId); 
        this.save();
    }
}

