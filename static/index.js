// 老師說要放的觀察全域用 api 是否載入
let isLoading = false;




/*====================*/
let page_num = 0 

let key_page_num = 0

// keyword = document.getElementById("input").value

let keyword = ""



/*====================*/


// 搜尋keyword結果的時候要清理原本的
content = document.querySelector(".content-1");
button_search = document.querySelector(".button_search")



// 點擊

button_search.addEventListener('click',() =>{

    while (content.hasChildNodes()) {

        content.removeChild(content.firstChild)  
    
    };
    key_page_num = 0
    page_num = 0

    keyword_view();


    
});

/*====================*/

// 點擊input 搜尋欄顯示

input = document.querySelector(".input")


input.addEventListener("click",function (Event)  {
    document.querySelector(".locate_card").style.display = "block";
    console.log("召喚!!");
    Event.stopPropagation(input)
    
  
    }   ,false

);


body = document.querySelector(".body")
// 點擊其他區域隱藏
body.addEventListener("click",() =>{
    document.querySelector(".locate_card").style.display = "none";
    console.log("點擊其他區域隱藏")  

    },false
);




/*====================*/


// 重寫測試全域區

// 關鍵字 page 頁

function keyword_view(data){
    
    
    
keyword = document.getElementById("input").value
console.log(keyword)

console.log(data.data)


let data_list = data.data



        

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
        console.log(data.nextPage)
        if (key_page_num <= data.nextPage ){ //&& isLoading === true
            console.log("繼續召喚")
       
        }else{    
            key_page_num = 0
            page_num = 0
            console.log("取消觀察，以免又觸發下一個 request")
            observer.unobserve(listEnd);
            // observer.disconnect();
 

            
        }




    
    
    // key_page_num++
    // console.log("關鍵字下面一位! " , key_page_num)


};


// 普通 page 頁

let append_view = (data) =>{
    
    
               
    let data_list = data.data
    
    
    // console.log(data_list)
       


         

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
        console.log("實際nextPage" , data.nextPage)
        if (page_num <= data.nextPage  ){ // && isLoading === true
            console.log("繼續召喚")
            console.log(isLoading)
       
        }else{
            key_page_num = 0
            page_num = 0   
            console.log(isLoading)
            console.log("取消觀察，以免又觸發下一個 request")
            observer.unobserve(listEnd);
            // observer.disconnect(); 
  

            
        } 

    // page_num++
    // console.log("普通下面一位! " , page_num)



            

    
    

}; // append_view end



// the options for observer
let options = {
    
    threshold: 0
};

let count_call = 0

const callback = (entries, observer) => {
    
    
    entries.forEach(entry => {
        console.log("call第幾次" + page_num)
        // Do something...
        if (keyword === ""){
            if (entry.isIntersecting && isLoading === false && page_num !== null ) { //&& keyword == undefined
                console.log("Loaded new items")
                
                isLoading = true
                
            
                fetch(`/api/attractions?page=${page_num}`) 
                .then(function (response){
                return response.json();
                })
                .then(res = (data)  => {
                        
                        // 普通召喚
                        console.log('普通頁載入中')
                        // console.log(data.data[0])
                        append_view(data);
                        page_num ++  
                                             
                    

                        isLoading = false; 
                }) .finally(function() { 
                        isLoading === false;}   );

            }   
                
                
                
                                     
        } else {  
            if (entry.isIntersecting && isLoading === false  && page_num !== null) { //&& keyword == undefined
           
            isLoading = true

                fetch(`/api/attractions?page=${key_page_num}&keyword=${keyword}`) 
                .then(function (response){
                    return response.json();
                })
                .then(res = (data) => {
                    
                    // 關鍵字召喚
                    console.log('關鍵字頁載入中')
                    // console.log("關鍵字的" , data.data)
                    
                    keyword_view(data);  
                    key_page_num++
               

      


                    isLoading = false; 
            
                })       
        
                     
            }   
        }

                
    


    
    })

    
    
};

let observer = new IntersectionObserver(callback, options);
console.log(new IntersectionObserver(callback))

let listEnd = document.querySelector(".footer");

observer.observe(listEnd)



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

// window.onclick = show_tag();


// document.getElementsByClassName(".search_card").style.display="none"; //隐藏
// document.getElementsByClassName(".search_card").style.display=""; //显示

//============================================================