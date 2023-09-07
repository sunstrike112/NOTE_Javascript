1. Kiểu dữ liệu nguyên thủy (primitive) : number, string, boolean, null, undefined, symbol(ES6) 
   trừ object (array có typeof là object) là kiểu non-primitive

2. var a (a kiểu undefined) - khai báo biến mà không gán giá trị, typeof a == undefined
   var a = null (a kiểu null) - khai báo và gán giá trị của biến đó là "null", typeof a == object

3. undeclared là biến chưa khai báo, undefined là biến có khai báo nhưng chưa gán giá trị

4. Kiểu biến boolean :
   Boolean(100) or Boolean("hello") : TRUE --> biến có giá trị (value kiểu đúng đắn kiểu number, string, ...)
   Boolean(0)                       : FALSE --> biến có giá trị là 0, string rỗng, null, undefined, false, NaN
   Boolean("")                      : FALSE
   Boolean(null)                    : FALSE
   Boolean(undefined)               : FALSE
   Boolean(false)                   : FALSE
   Boolean(NaN)                     : FALSE

5. Coersion (Ép kiểu dữ liệu trước khi thực hiện phép tính)
   JS ưu tiên convert kiểu dữ liệu sang kiểu number trước khi tính toán
   phép cộng ưu tiên chuyển về kiểu chuỗi trước khi thực hiện
   console.log(1 * 'a'); --> NaN
   console.log(1 * 2); --> 2
   console.log('a' * 1); --> NaN 
   console.log('a' + 1); --> 'a1' --> phép tính cộng ưu tiên chuyển về kiểu dữ liệu string sau đó tính toán 
   console.log(1 + true); --> 2 --> biến true chuyển thành 1 sau đó cộng
   console.log(1 + null); --> 1 --> null chuyển về 0
   console.log('1'+ null); --> 1null

   console.log('2' - 2) --> 0
   console.log('2' - '3'); --> -1 --> các phép toán ngoài phép cộng sẽ chuyển dữ liệu sang number
   console.log('2' * '4') --> 8
   console.log('8' / '2') --> 4
   console.log('8' % '3') --> 2

6. Equalty (== và === shallow and deep equal)
   Kiểu dữ liệu nguyên thủy primitive so sánh giá trị (tham trị) + kiểu dữ liệu
   Kiểu dữ liệu không nguyên thủy non-primitive (object, array có typeof là object) so sánh địa chỉ vùng nhớ (tham chiếu)
   var a = {};
   var b = {};
   console.log(typeof a); -->object
   console.log(typeof b); -->object
   console.log(a == b); -->false --> do 2 object lưu ở 2 địa chỉ vùng nhớ khác nhau
   console.log(a === b); -->false

   var a = [1];
   var c = a;
   a = [1,2]; --> biến a được tạo giá trị mới --> thay đổi vùng nhớ
   console.log(c); [1]
   console.log(c == a); --> false
   
   var a = [1];
   var c = a;
   a.push(2); --> thêm phần tử vào cuối mảng a và không thay đổi vùng nhớ của a
   console.log(a == c);-->true 

   var a = null;
   var b = null;
   console.log(a === b);-->true

   console.log(null == undefined);-->true
   console.log(null === undefined);-->false

7. Scope 
   Biến local sẽ được ưu tiên lấy giá trị trong scope mà nó được khai báo.
   Biến local nếu được gọi ở global sẽ ra lỗi undeclared (is not defined).
   Block là khối lệnh định nghĩa trong 2 dấu {} tạo bởi if, for, while.

   var one = 1;
   function doSomething() {
      var two = 2;
      if (true){
         var three = 3;
      }
   }

   if(true){
      var four = 4; --> nằm trong 1 block của global scope nên global truy xuất đến được.
                        biến var không bị ảnh hưởng bởi block scope                 
   }

   if(1==2){
      var four = 4; --> undefined vì chỉ thực hiện đến var four;
      let four = 4; --> lỗi undeclared 
   }

   console.log(one);--> 1
   // console.log(two);-->Lỗi undeclared
   // console.log(three);-->Lỗi undeclared
   console.log(four);--> 4

   =======================
   Lexical scope : fucntion con nằm trong 1 function sẽ lấy được các biến của function cha
   Closure là fuction nhận input từ 1 function khác và output trả về 1 funtion
   var myFunction = function () {
      var name ='Duy';
      var myOtherFunction = function(){
         console.log('INSIDE myOtherFunction name = ',name); --> Truy xuất biến name = 'Duy' ở scope cha
         var age = 20;
      };
      myOtherFunction();
      console.log(age);-->Biến age chỉ nằm trong scope con nến khi console.log() ở hàm cha sẽ lỗi undeclared
      -->Scope con lấy biến từ scope cha được, không có đường ngược lại
   };
   myFunction();
   ==============================
   var one = 1;
   function doSomething(){
      var two = 2;
      console.log(three); -->truy xuất biến được khai báo three nhưng chưa có gán giá trị
      if (true){
         var three = 3;
      }
   }

   if (true){
      var four = 4;--> khai báo trong 1 block scope với var nên có thể gọi được ở global (var hoisting ra ngoài)
   }

   console.log(four); -->4
   doSomething();--> undefined
   ==========================
   Chain scope 
   function b(){
      console.log(text);-->biến text chỉ được khai báo ở function a() và scope cha của b() là global
                           biến text ở a() không được b() sử dụng, biến text ở global gọi được a() nhưng do 
                           khai báo sau khi gọi hàm a() nên có giá trị undefined

   }
   
   function a(){
      var text = "in a";
      b();
   }
   
   a();-->undefined
   var text = "in global";
   ================================
   var sayHello = function(name){
      var text = 'Hello, ' + name;
      return function(){
         console.log(text);
      };
   };

   sayHello('Kiet');-->trả về 1 function có tham số đầu vào là 'Kiet' và chưa được trigger 
   sayHello('Kiet')();-->trigger(gọi) function có tham số đầu vào là 'Kiet'
                        in ra kết quả 'Hello, Kiet'
   ================================
   var sayHello = function(name){
      var text = 'Hello, ' + name;
      return function(){
         return function(){
            console.log(text);
         };
      };
   };

   sayHello('Kiet')()();-->'Hello, Kiet'
   ================================

   function callName(){
      return 'Kiet';
   }
   console.log(callName());-->Kiet
   console.log(callName);-->[Function: callName]
   console.log(typeof callName);-->function
   
8. Hoisting
   Phần khai báo biến được dời lên đầu với var(thêm vào bộ nhớ (lexical environment) trước trong quá trình biên dịch code).
   Với var giá trị trong lexical environment là undefined
   Với let giá trị trong lexical environment nằm trong Temporal Dead Zone (không truy cập được) nên khi console.log sẽ không
   truy cập được

   console.log(a);-->undefined
   var a = 'Kiet';--> Chuyển phàn khai báo lên đầu tiên khi sử dụng var
   tương đương với đoạn code
   var a ; 
   console.log(a);
   a = 'Kiet';
9. Var, let, const
   let a = 2;
   let a = 3; --> lỗi vì let không cho khai báo chồng

   var a = 2;
   var a = 3;--> không lỗi 

   let a = [1];
      a = [1,2]-->reassign, không lỗi 
   =======================================
   const a = [];-->Vùng nhớ được xác định
   a = [];-->thay đổi vùng nhớ cho const --> lỗi Assignment to constant variable.
   ============================
   const a = [];
   a.push(1);--> Không thay đổi vùng nhớ --> OK
   console.log(a); --> [1]
   ===========================
   var a = 5;
   if(a){
      console.log(a);-->Cannot access 'a' before initialization, lấy biến let a = 10 trong scope
      let a = 10;
   }
   =========================
   
   if (1==1/2){
      var a = 1;
      let b = 2;
   }

   console.log(a);-->1/undefined
   console.log(b);--> lỗi b is not defined 
   =========================
   var a = 5;
   if(a){
      let b = 10; --> b được khai báo trong 1 block scope theo kiểu let nên bên ngoài không truy cập được
   }
   console.log(b);--> b is not defined
   
   Biến let có hoising nhưng khác với var khi khởi tạo sẽ có giá trị undefined còn let thì sẽ là Temporal Dead Zone
   sẽ tạo ra lỗi thay vì undefined như var.

10. Hoisting function
   3 cách khai báo function 
   Declaration function 
   function sayHello() { --> khai báo với keyword function nên js coi là 1 function đúng nghĩa
      console.log('Hello');
   }
   sayHello();
   ===================
   Expression function
   sayHello(); --> lỗi vì biến const chưa khai báo Cannot access 'sayHello' before initialization
   const sayHello = function(){
      console.log('Hello');
   }
   sayHello();
   ===========================
   Arrow function
   sayHello(); --> lỗi vì biến const chưa khai báo Cannot access 'sayHello' before initialization
   const sayHello = () => {
      console.log('Helloaa');
   }
   sayHello();
   ===================

   say_something('YOLO'); --> kết quả 'YOLO', gọi 1 function chưa khai báo vẫn chạy --> hoisting
   function say_something(a){
      console.log(a);
   }

11. HOF (High order function)
   Là 1 function nhận input từ function khác
   let divideTwoNumbers = (number1,number2) => number1 / number2; --> tính toán
   let displayResult = (calFunc) => { --> in kết quả, tách ra 1 hàm riêng cho 1 chức năng dùng nhiều lần
      const result = calFunc();
      console.log(`Ket qua tinh toan = ${result.toFixed(4)*100} %`);
   }

   displayResult(() => divideTwoNumbers(5,12));
   displayResult(() => divideTwoNumbers(5,13));
   ===========================
   const isBiggerThanFive = (number) => number > 5;
   const arrayNumbers = [1,3,5,7,9,11];
   const arrayResult = [];
   --> Vòng for bình thường
   for (let i = 0; i < arrayOfNumbers.length ; i++){
      if(isBiggerThanFive(arrayOfNumbers[i])) arrayResult.push(arrayOfNumbers[i]);
   }
   --> Sử dụng foreach
   arrayNumbers.forEach(number => {
      if(isBiggerThanFive(number)){
         arrayResult.push(number);
      }
   });
   console.log(arrayResult);
   ===========================
   Các hàm bình thường
   const welcome = (name) => `Hi ${name}. Thanks for coming`;
   console.log(welcome('abcxyz'));

   const plus2 = (number) => number + 2;
   console.log(plus2(4));

   const loadVipmember = (isVipmenber) => isVipmenber ? `VIP` : null;
   console.log(loadVipmember(3));

   const getUserEmail = (user) => user.email;
   const demoUser = {
      name : 'Khoi Pro',
      email : 'admin@khoi.pro'
   }
   console.log(getUserEmail(demoUser)); 
   ====================================
   const largeThan5 = (number) => number > 5;
   console.log(largeThan5(6));
   const numbers = [1,3,5,7,9,11];
   console.log(numbers.filter(largeThan5));
   ======================================
   const calulateTax = (number1,number2) => (number1 - number2)/(number1 * number2);
   console.log(calComplex(5,4));

   Hàm trên chia ra làm 4 hàm sau :

   const substractTwoNumbers = (number1,number2) => number1 - number2;
   const multiTwoNumbers = (number1,number2) => number1 * number2;
   const devideTwoNumbers = (number1,number2) => number1 / number2;
   const calculateTax = (taxLastYear,taxCurrentYear) => {
      return devideTwoNumbers(substractTwoNumbers(taxLastYear,taxCurrentYear),multiTwoNumbers(taxLastYear,taxCurrentYear));
   }

   Tên biến : danh từ or cụm danh từ 
   Tên hàm : động từ or cụm động từ

12. Filter ()
   Nhận mảng và trả về mảng đã được lọc các phần tử theo điều kiện
   const animals = [
   {
      "name" : "cat",
      "size" : "small",
      "weight" : 5
   },
   {
      "name" : "dog",
      "size" : "small",
      "weight" : 10
   },
   {
      "name" : "lion",
      "size" : "small",
      "weight" : 150
   },
   {
      "name" : "elephant",
      "size" : "big",
      "weight" : 5000
   }
   ]
   const isOverWeight = (animal) => animal.weight > 100;

   const getOverWeightAnimals = (listAnimals) =>{
   return listAnimals.filter(isOverWeight)
   }

   console.log(getOverWeightAnimals(animals));

13. Map ()
   Nhận 1 array --> trả về mảng đã chỉnh sửa
   newAnimal = animals.map(animal => {
      return {...animal,height: animal.weight/2,width: animal.weight/3} //...Spread operator
   })
   console.log(newAnimal);

14. Reduce ()
   Nhận 1 array --> trả vể 1 giá trị
   const myArray = [1,2,3,4];
   const sum = myArray.reduce((acc, currValue, currIndex, array) => {
      return acc + currValue;
   },0);
   console.log(sum);

   ===============
   const myArray = [1,2,3,4];
   const sum = myArray.reduce((acc, currValue, currIndex, array) => {
      if (currValue % 2 == 0) {
         acc += currValue;
      }
      return acc;
   },0);
   console.log(sum);

14. OOP 
   var name = "aa";
   console.log(name.__proto__); --> Xem các prototype của biến name / biến được tạo ra bởi object khác
   ==================================
   function Student (name, age, school) { --> tạo object khuôn với 3 thuộc tính
      this.name = name;
      this.age = age;
      this.school = school;
   }

   --> khởi tạo s1, s2 theo khuôn mẫu Student
   const s1 = new Student("Kiet", 10, "Tran Huynh");
   const s2 = new Student("Hunter", 10, "Le Quy Don");
   console.log(s1);
   console.log(s1.name + '-' + s1.age + '-' + s1.school);

   --> Add method sayHello cho khuôn Student
   Student.sayHello = function() { 
      console.log("Hello");
   }
   console.log(s1.sayHello()); --> Lỗi vì không áp dụng cho các clone của Student

   Student.prototype.showName = function() {
      console.log("My name : ", this.name);
   }
   console.log(s1.showName()); --> Khai báo kiểu prototype sẽ áp dụng method cho cả các clone của Student

   s1.__proto__.showName = function () { --> thêm method showName cho clone s1
      console.log("NAMEMEM");
   }

   console.log(s1.__proto__.showName);
   console.log(s2.__proto__); --> s2 cũng bao gồm method showName đã khai báo cho s1
   =====================================
   Kiểu class ES6
   --> Tạo class cha Human
   class Human {
      constructor(name) {
         this.name =  name; --> this là biến ngữ cảnh đại diện cho class chứa this
      }

      sleep() {
         console.log(`${this.name} is sleeping`);
      }
   }
   --> Tạo class Student extend từ Human
   class Student extends Human {
      constructor (name, grade) {
         super(name) --> Khởi tạo phần Human với biến name được truyền vào
         this.name = name
         this.grade = grade
      }

      study() {
         console.log(`${this.name}  is doing homework of ${this.grade} grade`);
      }
   }
   const hs1 = new Student('Kiet', 6)
   hs1.sleep()
   hs1.study()
   =============================
   Biến this
   var person = {
      firstName : "Kiet",
      lastName : "Nguyen",
      showName : function() {
         console.log(`${this.firstName} ${this.lastName}`); --> this được sử dụng trong class person
      }                                                     --> và nó đại diện cho person
   }
   person.showName()
   console.log("==============");
   console.log(this.firstName); --> undefined
   
   Lưu ý : Khi khai báo global, this sẽ đại diện cho object window trên trình duyệt
   =======================
   var person = {
      firstName : "Kiet",
      lastName : "Nguyen",
      friends : ["Van", "Hang", "Hien", "Vinh"],
      showFriend: function() {
         for (var i = 0; i < this.friends.length; i++){
            console.log(this.firstName + ' have a friend named ' + this.friends[i]);
         }
      },

      showFriendThis: function() {
         this.friends.forEach(function(fr){ --> anonymous function
            console.log(this.firstName + ' have a friend named ' + fr); --> biến this lúc này sẽ global
         });
      }

      showFriendThis: function() {
         const _self = this; --> đặt lại giá trị biến this
         this.friends.forEach(function(fr){
            console.log(_self.firstName + ' have a friend named ' + fr);
         });
      }
   };
   person.showFriend()
   -->Kiet have a friend named Van
   -->Kiet have a friend named Hang
   -->Kiet have a friend named Hien
   -->Kiet have a friend named Vinh

   person.showFriendThis()
   -->undefined have a friend named Van
   -->undefined have a friend named Hang
   -->undefined have a friend named Hien
   -->undefined have a friend named Vinh
   ========================================
   Object destructuring
   var person = {
      name : 'end',
      age : 10,
      company : "fpt"
   }
   console.log(person.name);
   console.log(person.age);
   console.log(person.company);

   --> Viết lại như sau
   const {name, age, company} = person
   console.log(name);
   console.log(age);
   console.log(company);
   =============================
   Rest operator 
   var person1 = {
      name : 'end',
      age : 10,
      company : "fpt"
   }

   var person2 = {...person1} --> lấy toàn bộ thuộc tính person1 đưa vào person2
