# TODOjs
Toy project javascript

## using 
### ver.1
  - bootstrap 5.*
  - jQuery 3.5.1
  - DB : localStorage 

```html
<html>
    <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <!-- content here -->
                <input class="form-control form-control-lg" type="text" placeholder="input todo text">
        </div>
    </body>
</html>
```

## feature list : 필요한 기능들 나열 
  - display list [#3](https://github.com/pinky0703/TODOjs/issues/1#issue-852282652)
  - add [#1](https://github.com/pinky0703/TODOjs/issues/7)
  - remove [#2]()
  - edit
  - check/uncheck for done [#4]()
 
# TODOjs ver.2
### ver.2 [2021.08]
  - FE : Apache
  - BE : Spring boot 
  - DB : MySql
  - 테스트 : Postman 
  
## Using File list 
### [ JS ] todo.js 
주로 JS 이벤트 처리 
- [ ] addListItem
- [ ] uiUpdate
- [ ] getCurrentId 
- [ ] 기타 이벤트들(click, blur, change, ...)

### [ JS ] mySqlHelper.js
DB에 직접 접근하여 처리 / ajax로 데이터 보냄 
- [ ] get() : get 방식으로 데이터 전송 
- [ ] addItem()
- [ ] updateItem()
- [ ] removeItem()
- [ ] save()
 
