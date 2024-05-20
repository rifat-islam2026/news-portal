
// load Category
    const loadCategoryItem = async () => {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryItem(data.data.news_category);
    };
    // display Category
    const displayCategoryItem = (items) => {
        const categoryContainer = document.getElementById('category-container');
        items.forEach(categoryItem => {
            // console.log(categoryItem.category_name);
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('category-itmes');
            categoryDiv.innerHTML = `
                 <span class="hover-category" onclick="loadNews('${categoryItem.category_id}')">${categoryItem.category_name}</span>
            `
            categoryContainer.appendChild(categoryDiv)
        })
    };
    // load news 
const loadNews = async categoryId => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
};
// display news 
const displayNews = (news) => {
    // console.log(news);
    const newContainer = document.getElementById('news-container');
    
    for (const post of news) {
        // console.log(post);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card">
                    <img src="${post.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title">${post.author ? post.author.name:'No name...'}</h4>
                    <h5 class="card-title " >${post.title} </h5>
                    <p class="card-text" id="post-details">${post.details}</p>
                    
                    <div class="card-bottom-title">
                    <div class="news-info">
                       <img src="${post.author.img}" class="card-img-top" alt="">
                       <div> <p>${post.author.name}</p> <p>${post.author.published_date}</p> </div>
                      </div>

                         <div class="total-view"><div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg> <span class="ms-2">${post.total_view ? post.total_view:'No view!'}</span> </div></div>

                    <div class="star">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                    </svg>
                      </div>


                          </div>
                    
                    </div>
                    </div>
        
        `;
        newContainer.appendChild(newsDiv);
   }

}

loadCategoryItem(); 
    
