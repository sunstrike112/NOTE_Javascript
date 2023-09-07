1. Task Queue --> chứa bất đồng bộ task 
    Event-loop + waiter ("phục vụ" đưa yêu cầu từ client vào task queue)
    const myFunc = () => {
        setTimeout(() => { 
            console.log("hunter"); --> (1) push console.log() vào task queue, chạy sau 2s
        },2000) 
    }
    myFunc()
    console.log('Kiet'); --> console.log() này được chạy trước, ưu tiên main flow 

    const myFunc1 = () => {
        setTimeout(() => {
            console.log("kiet22");
        },1000) --> thời gian nhỏ chạy trc
    }
    myFunc1() --> cùng thời gian trigger trc chạy trước
    =================================
    for (var i = 0; i < 10 ; i++){ --> sau 1s ra 10 dòng i = 10
        setTimeout(() => {          
            console.log("i =", i); --> setTimeout 1s chạy cùng lúc, không có tuần tự từ 1 -> 10 --> i lên 10 
        },1000)
    }

2. Callback
    Là 1 hàm được trigger trong 1 hàm khác (đóng vai trò là tham số đầu vào)
    function con_tho_an_co(callback007) {
        setTimeout(function() {
            console.log('co tho an co');
            callback007();
        }, 3000);
    }

    function hotel() {
        console.log('chui hotel');
    }

    var callback = function() { --> hàm callback() trigger hàm hotel()
        hotel();
    }

    con_tho_an_co(callback); --> trigger hàm con_tho_an_co() với tham số là hàm callback()
    =====================================

    function muc_gao(vo_gao) {
        setTimeout(function() {
            console.log('muc gao');
            vo_gao(lau_noi)
        }, 2000);
    }
    function vo_gao(lau_noi) {
        setTimeout(function() {
            console.log('vo gao');
            lau_noi(bat_nut)
        }, 3000);
    }
    function lau_noi(bat_nut) {
        setTimeout(function() {
            console.log('lau noi');
            bat_nut()
        }, 1000);
    }
    function bat_nut() {
        setTimeout(function() {
            console.log('bat nut');
        }, 1000);
    }
    function nau_com() {
        muc_gao(() => {
            vo_gao(() => {
                lau_noi (() => {
                    bat_nut()
                })
            })
        })
    }
    
    nau_com()

3. Promise
    pending, fulfilled, rejected
    function tra_tien_em_anh_oi() {
        return new Promise(function(resolve, reject){
            var isHappy =  Math.random() >= 0.5;
            if (isHappy) {
                var tien = 1000;
                return resolve(tien); --> fulfilled
            }
    
            var reason = 'Ket tien'
            reject(reason) --> rejected
        });
    }
    console.log(tra_tien_em_anh_oi())--> Promise { 1000 } OR Promise { <rejected> 'Ket tien' }
        ====================================================
        function nau_com() {
            muc_gao()
            .then (() => { --> promise trả về resolve()
                return vo_gao()
            })
            .then (() => {
                return  lau_noi()
            })
            .then (() => {
                return bat_nut()
            })
            .catch(err => { --> khi promise ở các then trả về reject()
                console.log('com hu');
            })
        }
        
        function muc_gao() {
            
            return new Promise(function(resolve){
                
                setTimeout(function() {
                    console.log('muc gao');
                    resolve()
                }, 2000)
            })
        }
        function vo_gao() {
            return new Promise(function(resolve){
                
                setTimeout(function() {
                    console.log('vo gao');
                    resolve()
                }, 3000)
            })
        }
        function lau_noi() {
            return new Promise(function(resolve){
                
                setTimeout(function() {
                    console.log('lau noi');
                    resolve()
                }, 1000)
            })
        }
        function bat_nut() {
            setTimeout(function() {
                console.log('bat nut');
            }, 1000);
            
        }
        console.log(nau_com())
        =================================
        Promise.all([promise1(), promise2()]) --> nhiều promise chạy song song với nhau 

        const promise1 = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("in ra sau 2s")
                    resolve(1)
                }, 2000)
            })
        }
        
        const promise2 = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log("in ra sau 4s")
                    resolve(2)
                }, 4000)
            })
        }
        
    --> promise1 và promise2 chạy song song trong 4s xong
        console.log("Start: ", new Date())
        Promise.all([promise1(), promise2()])
        .then((result) => {
            console.log("result: ", result)
            console.log("in xong")
            console.log("end : ", new Date);
        }) --> Sau 4s hiển thị ra 2 dòng console.log() ở promise1 và promise2

    --> promise 1 chạy trước 2s, sau đó promise2 chạy 4s tổng cộng 6s
        promise1()
        .then((result) => {
            console.log(result);
            return promise2()

        })
        .then((result) => {
            console.log(result);
            console.log("End: ", new Date())
        })
    ====================================
    Promise.race 
    const promise1 = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("in ra sau 2s")
                resolve(1)
            }, 2000)
        })
    }
    
    const promise2 = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("in ra sau 4s")
                resolve(2)
                
            }, 4000)
        })
    }
    
    console.log("Start: ", new Date())
    Promise.race([promise1(), promise2()]) --> xem promise nào chạy nhanh hơn thì thực hiện khối lệnh trong 
    .then((result) => {                        .then sau đó mới thực hiện promise còn lại
        console.log("result : ", result)       ở đây promise1 in trc  
        console.log("in xong")
        console.log("end : ", new Date);
    })

4. Asyn/Await 
    await phải nằm trong 1 asyn function
    const doiTienA = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let isNum = Math.random() > 0.5
                if (isNum) {
                    resolve(2000)
                } else {
                    reject('Khong doi duoc tien')
                }
            }, 2000)
        })
    }

    const bTraNo = async () => {
        const tienATra = await doiTienA()
        console.log("Tien a tra = : ", tienATra)
        console.log("Done")
    }

    try {
        bTraNo()
    } catch (error) {
        console.log(error);
    }
    ==========================
5. API (Application Interface)
    GET --> method
    POST --> create 
    PUT --> edit
    NPM init
    NPM install axios

6. JSON package
    ^ A.B.C --> breaking change 1.0.0 --> 2.0.0
            --> fix bug 1.0.1 
            --> thêm feature 1.1.0
        --> cài phiên bản mới nhất 1.0.0 --> 2.0.1 (ver mới nhất)
    ~ A.B.C --> cài phiên bản mới nhất của version vd từ 1.0.0 --> 1.0.9 (ver mới nhất của 1.)
        
        
