// 老師說要放，但不確定放哪裡，先擺著
let isLoading = false;


let page_num = 0
let listEnd = document.querySelector('.footer');


function get_data(){
    
    

    //api/attractions?page=${nextPage[0]}&keyword= 

    // const page = this.$route.params.page;
    // let  page = this.$route   



    fetch(`/api/attractions?page=${page_num}`) // + `${page_num}`
    .then(function (response){
        return response.json();
    })
    .then(function (data){

        isLoading = true ;

        let data_list = data.data
        // console.log(data_list[0].images[0])
        // console.log(data_list.length)
        // console.log(data.nextPage)
        let listEnd = document.querySelector('.footer');
           
    
        const append_view = () =>{

        

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




    }; // append_view end
    append_view();

    page_num ++ ; 
    console.log(page_num);


  
                    


        const load_view = () => {





            for (let k = 0 ; k <= data.nextPage ; ++k ) { //k < data_list.length
                // page_num ++
                // console.log(page_num)
                // console.log(k)



                append_view();

                
            };

        };





        // Interception Handler
        const callback = (entries, observer) => {

            for (const entry of entries) {
        

                console.log(entry);
                // Load more articles;
                if (entry.isIntersecting) {


                    if ( page_num <= data.nextPage ) {  //代判斷中

                        load_view();        
                    } else {
                    observer.unobserve(listEnd);
                    };
                }
            };
        };


        // Observe the end of the list
        const observer = new IntersectionObserver(callback, {

            threshold: 0,

        });
        observer.observe(listEnd);  
        
        
  

        
        
    }); ////////////function (data) end




    
};//function get_data() end




get_data();


//試試全域

// page_num ++ ; 
// console.log(page_num);


// const append_view = () =>{

        

//     for (i = 0 ; i < data_list.length  ; i ++ ){

//         // create container square

//             let square = document.createElement("div");
//             square.className = "square";
//             let content = document.querySelector(".content-1");
//             content.appendChild(square);

            

//             // attraction images

//             first_pic = data_list[i].images[0];              
//             let pic_box = document.createElement("img");
//             pic_box.id = "img-control";
//             pic_box.src = first_pic;
//             square.appendChild(pic_box);
    



//             // attraction name (title)

//             let title_text = document.createTextNode(data_list[i].name);
            
//             let title = document.createElement("div");
//             title.className = "title";
//             title.appendChild(title_text);
//             square.appendChild(title)

            
//             // attraction mrt
//             let mrt = document.createTextNode(data_list[i].mrt);
//             let mrt_box = document.createElement("div");
//             mrt_box.className = "mrt" ;               
//             mrt_box.appendChild(mrt);
            


//             // attraction category (tag)
//             let category = document.createTextNode(data_list[i].category);
//             let cat_box = document.createElement("div");
//             cat_box.className = "tag";
//             cat_box.appendChild(category);

//             // container detail
//             let detail = document.createElement("div");
//             detail.className = "detail";
//             detail.appendChild(mrt_box);
//             detail.appendChild(cat_box)
//             square.appendChild(detail)



            

//     }; //for end

//     // count_num ++
//     // console.log(count_num)



// }; // append_view end

// const load_view = () => {






//     for (let k = 0 ; k <= data.nextPage ; ++k ) { //k < data_list.length
//         // page_num ++
//         // console.log(page_num)
//         // console.log(k)



//         append_view();

        
//     };

// };





// // Interception Handler
// const callback = (entries, observer) => {

//     for (const entry of entries) {


//         console.log(entry);
//         // Load more articles;
//         if (entry.isIntersecting) {


//             if ( page_num <= data.nextPage ) {  //代判斷中

//                 load_view();        
//             } else {
//             observer.unobserve(listEnd);
//             };
//         }
//     };
// };


// // Observe the end of the list
// const observer = new IntersectionObserver(callback, {

//     threshold: 0,

// });
// observer.observe(listEnd);  





// 看我的scroll高度用的，
// window.addEventListener('scroll', () => {
// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
// 	console.log( { scrollTop, scrollHeight, clientHeight });
// });


// 