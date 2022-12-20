
/* 載入就 fectch 判斷並渲染頁面 */
window.addEventListener("load" , function(){
    fetch(`/api/booking`,{
        method:"GET"
    })
    .then(function(response){      
        return response.json();
    })
    .then(function(data){
        console.log(data)
        // 有資料、沒資料各一版
        
        // 有資料
        if (data.data !== null){
            // console.log(data.data.attraction.name)

            const title = document.querySelector(".title")
            title.textContent = data.data.attraction.name

            const date = document.querySelector(".date")
            date.textContent = data.date

            const time = document.querySelector(".time")
            if(data.time === "morning"){
                data.time = "早上 9 點到下午 4 點"
            }else{
                data.time = "下午2點到晚上9點"
            }
            time.textContent = data.time

            const fee = document.querySelector(".fee")
            fee.textContent = data.price
            const confirmFee = document.querySelector(".confirm-fee")
            confirmFee.textContent = "總價 : 新台幣 " + data.price + " 元"

            const address = document.querySelector(".address")
            address.textContent = data.data.attraction.address

            const img = document.querySelector(".img")
            img.src = data.data.attraction.image

        }else{      

            document.querySelector(".section").style.display = "none";
            document.querySelector(".contact").style.display = "none";
            document.querySelector(".payment").style.display = "none";
            let hrs = document.querySelectorAll("hr");

            for (let i = 0; i < hrs.length; i++) {
                hrs[i].style.display = "none";
            }
            document.querySelector(".confirm").style.display = "none";
            const content = document.querySelector(".content")
            let emptyTxt = document.createTextNode("目前沒有任何待預訂的行程")
            content.appendChild(emptyTxt)
            const headline = document.querySelector(".headline")
            headline.classList.add("empty-buttom")

            const footer = document.querySelector(".footer")
            footer.style.height = "500px"
            footer.style.backgroundImage = "none";
            const footerTxt = document.createElement("txt")
            footerTxt.textContent = "COPYRIGHT © 2021 台北一日遊"
            footerTxt.className = "footerTxt"
            footer.appendChild(footerTxt)      
        }// else end
    })
});


/* 刪除行程 */
const deleteIcon = document.querySelector(".icon_delete")

deleteIcon.addEventListener("click" , async() =>{
    const response =  await fetch(`/api/booking` ,{
                        method : "DELETE"
                    })
    const data =  await response.json();
    
    location.reload(); 

});


/* the card payment */


TPDirect.card.setup({
    
    // Display ccv field
    fields : {
        number: {
            // css selector
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            // DOM object
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: 'ccv'
        }
    },  
    styles: {
        // Style all elements
        'input': {
            'color': 'gray'
        },
        // style focus state
        ':focus': {
            'color': 'black'
        },
        // style valid state
        '.valid': {
            'color': 'green'
        },
        // style invalid state
        '.invalid': {
            'color': 'red'
        },
        // Media queries
        // Note that these apply to the iframe, not the root window.
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 6,
        endIndex: 11
    }
    
});

const  submitButton = document.querySelector(".confirm-button")
submitButton.setAttribute('disabled', true)
submitButton.style.backgroundColor="lightgray";
submitButton.style.cursor = "default";

TPDirect.card.onUpdate(function (update) {   
    update.canGetPrime === true
    // --> you can call TPDirect.card.getPrime()
    if (update.canGetPrime) {
        // Enable submit Button to get prime.
        submitButton.removeAttribute('disabled', true);
        submitButton.style.backgroundColor= "#448899"
        submitButton.style.cursor = "pointer"
        
    } 
    else {
        // Disable submit Button to get prime.
        submitButton.setAttribute('disabled', true)
        submitButton.style.backgroundColor="lightgray";
        submitButton.style.cursor = "default";

    };

});


submitButton.addEventListener("click" , (event) => {
    console.log("付錢啊!!!")
    event.preventDefault()

} )

TPDirect.card.getTappayFieldsStatus()