/*  全域變數區  */

let number = location.href.split("/")[4]

typeof(number) // string
// console.log(number)




// ===========================================
/*  普通用網址列載入 */

async function web_load() {
    const response = await fetch(`/api/attraction/${number}`);
    const parsedData = await response.json();
    
    data = parsedData.data;
    append_view(data);
    
}


// let addEvent to call this function
window.onload = web_load();
// ============== ATTN ===============





// ===========================================

/*  放入資料  */

function append_view(data){
    // console.log(data[0])

    //  name = data[0].name
    //  tag = data[0].category
    //  mrt = data[0].mrt
    //  imgs = data[0].imgs

    //  description = data[0].description
    //  address = data[0].address
    //  transport = data[0].transport       

    let info = document.querySelector(".info")    
    let description = document.createTextNode(data[0].description)
    info.appendChild(description)

    let address_div = document.querySelector(".address")
    let address = document.createTextNode(data[0].address)
    address_div.appendChild(address)

    let traffic = document.querySelector(".traffic")
    let transport = document.createTextNode(data[0].transport)
    traffic.appendChild(transport)

    let name_div = document.querySelector(".name")
    let name = document.createTextNode(data[0].name)
    name_div.appendChild(name)

    let tag_div = document.querySelector("#tag")
    let tag = document.createTextNode(data[0].category)
    tag_div.appendChild(tag)

    let mrt_div = document.querySelector("#mrt")
    let mrt = document.createTextNode(data[0].mrt)
    mrt_div.appendChild(mrt)

    //////////////////////////////


    let pic_box = document.querySelector(".pic_box")
    let imgs_first = document.createElement("img")
    imgs_first.className = "img-control"
    imgs_first.src = data[0].images[0]    
    // temp for the first one
    pic_box.appendChild(imgs_first)



    // the circle and its' box 
    let circle_box = document.querySelector(".circle-box")

    let small_black = document.createElement("div")
    small_black.className = "small-black"
    let big_white = document.createElement("div")
    big_white.className = "big-white" 
    big_white.appendChild(small_black)
    big_white.setAttribute("onclick" , "current")


    circle_box.appendChild(big_white)

    // the other white circle
    for (c = i+1 ; c < data[0].images.length  ; c++ ){
        let big_white = document.createElement("div")
        big_white.className = "big-white" 

        circle_box.appendChild(big_white)

    }

    

    // 如果有多的就創造其餘總數的白圓
    // 黑圓也要看他是不是當下的


    // 我每個景點有幾張圖?
    // console.log(data[0].images.length)

    //////////////////////////////
        
    let nextImg = 0

    
    right_A.addEventListener("click" , (e) =>{
        e.stopPropagation(right_A)     
        

            if (nextImg == 0 || nextImg < data[0].images.length - 1){
                nextImg ++
                console.log("下一張")
                console.log(data[0].images[nextImg])
                console.log("第幾張?", nextImg )   
            
                let pic_box = document.querySelector(".pic_box")
                let imgs = document.createElement("img")
                imgs.className = "img-control"        
                imgs.src = data[0].images[nextImg]
                while (pic_box.hasChildNodes()){
                    pic_box.removeChild(pic_box.firstChild)
                }
                pic_box.appendChild(imgs)

                while( big_white.hasChildNodes()){
                    big_white.removeChild(big_white.firstChild)
                }

                let small_black = document.createElement("div")
                small_black.className = "small-black"
                // big_white[i].appendChild(small_black)
                let dots = document.querySelectorAll(".big-white")
                
                // for (i = 0; i < data[0].images.length ; i++) {
                //     console.log(i)
                //     // dots[i].className = dots[i].className.replace(" active", "");
                // }
                // dots.className += " active";

                dots[nextImg].appendChild(small_black)

                pic_box.appendChild(circle_box)
                pic_box.appendChild(right_A)
                pic_box.appendChild(left_A)                    
 
                
            }else{                    
                nextImg = 0
                console.log("回到第一張")
                console.log("第幾張?", nextImg )                    
                let pic_box = document.querySelector(".pic_box")
                let imgs = document.createElement("img")
                imgs.className = "img-control"        
                imgs.src = data[0].images[nextImg]
                while (pic_box.hasChildNodes()){
                    pic_box.removeChild(pic_box.firstChild)
                }
                pic_box.appendChild(imgs)
                pic_box.appendChild(circle_box)
                pic_box.appendChild(right_A)
                pic_box.appendChild(left_A)
            
            }
        
        },false
    )

        
    // let preImg = nextImg 
    left_A.addEventListener("click", (e) =>{
        e.stopPropagation(left_A)
        
        if (nextImg > 0 ){                
            nextImg --
            console.log("前一張")
            console.log("第幾張?", nextImg )
            console.log(data[0].images[nextImg])
            let pic_box = document.querySelector(".pic_box")
            let imgs = document.createElement("img")
            imgs.className = "img-control"        
            imgs.src = data[0].images[nextImg]
            while (pic_box.hasChildNodes()){
                pic_box.removeChild(pic_box.firstChild)
            }
            pic_box.appendChild(imgs)

            while( big_white.hasChildNodes()){
                big_white.removeChild(big_white.firstChild)
            }
            
            // big_white[i].appendChild(small_black)
            

            pic_box.appendChild(circle_box)
            pic_box.appendChild(right_A)
            pic_box.appendChild(left_A)                    
            
            


            
        }else{
            nextImg = data[0].images.length - 1               
            console.log("跑去最後一張")
            console.log("第幾張?", nextImg)
            console.log(data[0].images[nextImg])

            let pic_box = document.querySelector(".pic_box")
            let imgs = document.createElement("img")
            imgs.className = "img-control"        
            imgs.src = data[0].images[nextImg]
            while (pic_box.hasChildNodes()){
                pic_box.removeChild(pic_box.firstChild)
            }
            pic_box.appendChild(imgs)
            pic_box.appendChild(circle_box)
            pic_box.appendChild(right_A)
            pic_box.appendChild(left_A)
        
        }






        }, false
    )
        



  
}; //append_view()  end
    


let right_A = document.querySelector(".right-A")
let left_A = document.querySelector(".left-A")

i = 0

// ===========================================




// ===========================================

/* slide imgs */


// function change_img(){
//     // choose img need to think
//     // imgs = data[0].images[i]
//     // 這應該是右鍵邏輯，左邊就減減
//     if (i < imgs.length){
//         i ++
//     }else{
//         i = 0
//     }

// }




// ===========================================

/*  switch day and night fee*/
let fee = document.querySelector(".fee")

let big_night = document.querySelector("#big-night")

let day = document.querySelector("#day")
let night = document.querySelector("#night")

big_night.addEventListener("click" , (event) =>{
    day.style.display = "none";
    night.style.display = "block";
    fee.textContent = "新台幣2500元"
    }
);

let big_day = document.querySelector("#big-day")
big_day.addEventListener("click" , (event) =>{
    day.style.display = "block";
    night.style.display = "none"
    fee.textContent = "新台幣2000元"
    }
);

// ===========================================