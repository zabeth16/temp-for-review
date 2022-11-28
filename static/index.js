// 老師說要放的觀察全域用 api 是否載入
let isLoading = false;




/*====================*/
// let page_num = 0 

// let key_page_num = 0

let keyword = ""

let nextPage = 0



/*====================*/



/*====================*/

// 點擊input 搜尋欄顯示

input = document.querySelector(".input")
search_text = document.querySelector(".search_text")


input.addEventListener("click",function (Event)  {
    document.querySelector(".locate_card").style.display = "block";
    console.log("召喚!!覆蓋的搜尋卡!");
    // console.log(search_text.textContent);
    Event.stopPropagation(input)  
    
    document.querySelector(".input").textContent = "9487"
 
  
    },false

);





body = document.querySelector(".body")
// 點擊其他區域隱藏
body.addEventListener("click",() =>{
    document.querySelector(".locate_card").style.display = "none";
    // console.log("點擊其他區域隱藏")  

    },false
);

// 點擊分類景點懶人傳去input欄位
// 還沒查到QQ



/*====================*/
// keyword 搜尋結果專區

content = document.querySelector(".content-1");
button_search = document.querySelector(".button_search")


async function keyword_load(){
    keyword = document.querySelector(".input").value
    console.log(keyword)
    const response = await fetch(`/api/attractions?page=0&keyword=${keyword}`);
    const data = await response.json();
    // 產生 nextPage 數字
    nextPage = data.nextPage ;
    data_list = data.data;
    keyword_view(data_list);

}





// 點擊 serach keyword page
button_search.addEventListener('click',() =>{

    // 搜尋keyword結果的時候要清理原本的
    while (content.hasChildNodes()) {

        content.removeChild(content.firstChild)  
    
    };

    keyword_load();
    nextPage = 0
    
});




/*====================*/


// 重寫測試全域區

// 關鍵字 page 頁

function keyword_view(data_list){
    

    isLoading = true ;
     

        for (i = 0 ; i < data_list.length  ; i ++ ){
                


            // create container square

                let square = document.createElement("div");
                square.className = "square";
                let content = document.querySelector(".content-1");
                content.appendChild(square);


                // attraction images

                first_pic = data_list[i].images[0];              
                let pic_box = document.createElement("img");
                pic_box.id = "img-control";
                pic_box.src = first_pic;
                square.appendChild(pic_box);
        



                // attraction name (title)

                let title_text = document.createTextNode(data_list[i].name);
                
                let title = document.createElement("div");
                title.className = "title";
                title.appendChild(title_text);
                square.appendChild(title)

                
                // attraction mrt
                let mrt = document.createTextNode(data_list[i].mrt);
                let mrt_box = document.createElement("div");
                mrt_box.className = "mrt" ;               
                mrt_box.appendChild(mrt);
                


                // attraction category (tag)
                let category = document.createTextNode(data_list[i].category);
                let cat_box = document.createElement("div");
                cat_box.className = "tag";
                cat_box.appendChild(category);

                // container detail
                let detail = document.createElement("div");
                detail.className = "detail";
                detail.appendChild(mrt_box);
                detail.appendChild(cat_box)
                square.appendChild(detail)

               

        }; //for end
        
        if ( nextPage !== null ){ 
            console.log("繼續召喚");
            isLoading = false ;
            console.log("關鍵字載入", isLoading);
       
        }else{    
            
            console.log("取消觀察，以免又觸發下一個 request");
            console.log("關鍵字載入" , isLoading)
            observer.unobserve(listEnd);
            observer.disconnect();
            nextPage = 0
 

            
        };

    
    
    // key_page_num++
    // console.log("關鍵字下面一位! " , key_page_num)


};


// 普通 page 頁

let append_view = (data_list) =>{

    
    // isLoading = true
                
    // 你fetch，記得最上面(data)要拿掉
    // fetch(`/api/attractions?page=${nextPage}`) 
    // .then(function (response){
    // return response.json();
    // }).then(function (data){ })

         

        for (i = 0 ; i < data_list.length  ; i ++ ){
                


            // create container square

                let square = document.createElement("div");
                square.className = "square";
                let content = document.querySelector(".content-1");
                content.appendChild(square);


                // attraction images

                first_pic = data_list[i].images[0];              
                let pic_box = document.createElement("img");
                pic_box.id = "img-control";
                pic_box.src = first_pic;
                square.appendChild(pic_box);
        



                // attraction name (title)

                let title_text = document.createTextNode(data_list[i].name);
                
                let title = document.createElement("div");
                title.className = "title";
                title.appendChild(title_text);
                square.appendChild(title)

                
                // attraction mrt
                let mrt = document.createTextNode(data_list[i].mrt);
                let mrt_box = document.createElement("div");
                mrt_box.className = "mrt" ;               
                mrt_box.appendChild(mrt);
                


                // attraction category (tag)
                let category = document.createTextNode(data_list[i].category);
                let cat_box = document.createElement("div");
                cat_box.className = "tag";
                cat_box.appendChild(category);

                // container detail
                let detail = document.createElement("div");
                detail.className = "detail";
                detail.appendChild(mrt_box);
                detail.appendChild(cat_box)
                square.appendChild(detail)

               

        }; 



        //for end
        console.log("實際nextPage" , nextPage);
        if (nextPage !== null ){ // && isLoading === true
            console.log("繼續召喚");
            isLoading = false ;
            console.log(isLoading);
       
        }else{
            
            console.log(isLoading);
            console.log("取消觀察，以免又觸發下一個 request");
            observer.unobserve(listEnd);
            observer.disconnect(); 
            nextPage = 0
  

            
        } ;



            

    
    

}; // append_view end




/*====================*/

// 無限卷軸載入、叫產生資料函式
// 配合早上說的async、await

async function load_view(){
    if (nextPage === null | isLoading === true){
        return console.log("不要動!");
    };

    if (keyword !== ""){ 
        url = `/api/attractions?page=${nextPage}&keyword=${keyword}`
    }
    else{
        url = `/api/attractions?page=${nextPage}`
    }
    const response = await fetch(url);
    const data = await response.json();
    
    
    // 產生 nextPage 數字
    nextPage = data.nextPage;
    data_list = data.data;

    append_view(data_list);
   

}




// the options for observer
let options = {
    root: null,
    rootMargin: "10px  " ,
    threshold: 0.2 
};

const observer = new IntersectionObserver(load_view, options);
console.log(new IntersectionObserver(load_view));


const listEnd = document.querySelector(".footer");

observer.observe(listEnd);





// 看我的scroll高度用的，
// window.addEventListener('scroll', () => {
// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
// 	console.log( { scrollTop, scrollHeight, clientHeight });
// });


// 



/* search card 區 */

function show_tag(){
    fetch("/api/categories")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        // console.log(data.data);

        let search_card = document.createElement("div");
        search_card.className = "search_card";
        let locate = document.querySelector(".locate_card");

        while (locate.hasChildNodes()) {
            locate.removeChild(locate.firstChild)    ;                
        };


        locate.appendChild(search_card)
        for (s = 0 ; s <data.data.length ; s++ ){
            let search_text = document.createElement("button");
            search_text.className = "search_text";
            let text = document.createTextNode(data.data[s]);
            search_text.appendChild(text);
            search_card.appendChild(search_text);
            
        };


                
    });


    /*還要做點擊其他區域隱藏、傳送點擊文字至input內，傳送完也要隱藏*/
};

show_tag();

//============================================================
/* 暫時查到的一些資料*/

// $(document).mouseup(function (e) {
//     var container =$(".suggest"); // 這邊放你想要排除的區塊
//     if (!container.is(e.target) && container.has(e.target).length === 0) {
//        container.hide(); 
//     }
// });




// document.getElementsByClassName(".search_card").style.display="none"; //隱藏
// document.getElementsByClassName(".search_card").style.display=""; //顯示

//============================================================