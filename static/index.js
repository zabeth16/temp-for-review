// 老師說要放，但不確定放哪裡，先擺著
let isLoading = false;

function get_data(){
    

    //api/attractions?page=${nextPage[0]}&keyword= 

    // const page = this.$route.params.page;
    let  page = this.$route
    // for (page_num = 0 ; page_num < 4 ; page_num ++ ){
    //     console.log(page_num)
    // }
    let page_num = 0

    fetch("/api/attractions?page=" + `${page_num}`) // + `${page_num}`
    .then(function (response){
        return response.json();
    })
    .then(function (data){

        isLoading = true ;

        let data_list = data.data
        // console.log(data_list[0].images[0])
        // console.log(data_list.length)
        const listEnd = document.querySelector('.footer');
        
        
        const append_view = () =>{

            let count_i = 0;

            for (i = 0 ; i < data_list.length  ; i ++ ){

                // record the counting for i

                
    
                // attraction images
                first_pic = data_list[i].images[0]              
                let div_box = document.querySelectorAll("#img-control")            
                div_box[i].src = first_pic
         
    
    
    
                // attraction name (title)
                let main_title = document.createTextNode(data_list[i].name);
                
                let title_text = document.querySelectorAll(".title");
                title_text[i].appendChild(main_title);
                
                // attraction mrt
                let mrt = document.createTextNode(data_list[i].mrt);
                let mrt_box = document.querySelectorAll(".mrt");
                mrt_box[i].appendChild(mrt);
    
                // attraction category (tag)
                let category = document.createTextNode(data_list[i].category);
                let cat_box = document.querySelectorAll(".tag")
                cat_box[i].appendChild(category)


                count_i++
                console.log(count_i)

                



                
    
            };
            
            page_num ++
            
        };
        append_view();

        const load_view = () => {
            for (let i = 0 ; i < data_list.length ; ++i ) {
            append_view();
            };
        };

        // Interception Handler
        const callback = (entries, observer) => {
            for (const entry of entries) {
            console.log(entry);
                // Load more articles;
                if (entry.isIntersecting) {
                    if (i < 10) {
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

    }); 
    
};




get_data();


// function run() {
//     window.scroll(1000);
// }

// 看我的scroll高度用的，
// window.addEventListener('scroll', () => {
// 	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
// 	console.log( { scrollTop, scrollHeight, clientHeight });
// });