const axios = require('axios')

function getTime() {
    let todayFull = new Date()
    let todayTime = `${todayFull.toLocaleTimeString()}`
    return todayTime
}

function hangOut() {
    goToBarClub()
    .then (() => {
        return getMenu()
    })
    .then ((listCocktails) => {
        return giveMenu(listCocktails)
    })
    .then((listCocktails) => {
        return chooseFirstCocktail(listCocktails)
    })
    .then(({firstCocktail,listCocktails}) => {
        return drinkFirstCocktail(firstCocktail,listCocktails)
    })
    .then(({firstCocktail,listCocktails}) => {
        return chooseNextCocktail(firstCocktail,listCocktails)
    })
    .then(({firstCocktail,nextCocktail}) => {
        return drinkNextCocktail(firstCocktail,nextCocktail)
    })
    .then(({firstCocktail,nextCocktail}) => {
        return billingCocktail(firstCocktail,nextCocktail)
    })
}

function goToBarClub() {
    console.log(`1. Khách đi chơi lúc ${getTime()}`)
    return new Promise(function(resolve){
        setTimeout(function(){
            console.log(`2. Khách tới quán lúc ${getTime()}`)
            resolve()
        },2000)
    })
}

function getMenu() {
    console.log(`3. Phục vụ thấy khách liền đi lấy menu lúc ${getTime()}`);
    return new Promise((resolve) => {
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
            .then(function (menu) {
                resolve(menu.data.drinks);
            })
            .catch(function (error) {
                console.log(error);
            })
    })
}

function giveMenu (listCocktails) {
    return new Promise ((resolve) => {
        setTimeout(function () {
            console.log(`4. Phục vụ đưa menu cho khách lúc ${getTime()}`)
            console.log(`5. Danh sách món bên em gồm có ${listCocktails.length} món`);
            resolve(listCocktails)
        })
    })
    
}

function chooseFirstCocktail(listCocktails) {
    return new Promise ((resolve) => {
        setTimeout(function () {
            let firstCocktail = listCocktails[Math.floor(Math.random() * listCocktails.length)].strDrink;
            console.log(`6. Khách chọn ${firstCocktail} lúc ${getTime()}`);
            resolve({firstCocktail,listCocktails})
        },2000)
    })
}

function drinkFirstCocktail(firstCocktail,listCocktails) {
    return new Promise ((resolve) => {
        setTimeout(function () {
            console.log(`7. Khách uống xong ${firstCocktail} lúc ${getTime()}`);
            resolve({firstCocktail,listCocktails})
        },2000)
    })
}

function chooseNextCocktail(firstCocktail,listCocktails) {
    return new Promise ((resolve) => {
        setTimeout(function () {
            let nextCocktail = listCocktails[Math.floor(Math.random() * listCocktails.length)].strDrink;
            console.log(`8. Khách order thêm ${nextCocktail} lúc ${getTime()}`);
            resolve({firstCocktail,nextCocktail})
        })
    })
}

function drinkNextCocktail(firstCocktail,nextCocktail) {
    return new Promise ((resolve) => {
        setTimeout(function () {
            console.log(`9. Khách uống xong ${nextCocktail} lúc ${getTime()}`);
            resolve({firstCocktail,nextCocktail})
        },4000)
    })
}

function billingCocktail(firstCocktail,nextCocktail) {
    console.log(`10. Khách kêu tính tiền \n11. Phục vụ ra báo với khách anh đã dùng món ${firstCocktail} và ${nextCocktail}, do anh quen với ông chủ nên free`)
    setTimeout(function () {
        console.log(`12. Khách ra khỏi quán lúc ${getTime()}`)
    },1000)
}

hangOut()





