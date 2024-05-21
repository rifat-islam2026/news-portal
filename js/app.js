// load Category
    const loadCategoryItem = async () => {
        try {
            const url = `https://openapi.programming-hero.com/api/news/categories`;
            const res = await fetch(url);
            const data = await res.json();
            displayCategoryItem(data.data.news_category);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };
    // display Category
    const categoryContainer = document.getElementById('category-container');
    const displayCategoryItem = (items) => {
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
    try {
        const url = ` https://openapi.programming-hero.com/api/news/category/${categoryId}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }
     catch (error) {
        console.error("Failed to load categories", error);
    }
};
// display news 
const newContainer = document.getElementById('news-container');
const displayNews = (news) => {
    // spinner start 
    toggleSpinner(true);
    newContainer.textContent = '';
    for (const post of news) {
        // console.log(post.length = [0]);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
            <div class="card shadow ">
                    <img src="${post.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h4 class="card-title">${post.author ? post.author.name : 'No data found!'}</h4>
                    <p class="card-title fw-midium" >${post.title} </p> <br>
                    <small class="card-text" id="post-details">${post.details.slice(0, 120)}...</small>
                    
                    <div class="card-bottom-title">
                    <div class="news-info">
                       <img src="${post.author.img}" class="card-img-top" alt="">
                       <div class="ms-2"> <h6>${post.author.name}</h6> <small class="text-secondary">${post.author.published_date}</small> </div>
                      </div>

                         <div class="total-view text-secondary"><div class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg> <span class="ms-2">${post.total_view ? post.total_view : 'No data found!'}</span> </div></div>

                    <div onclick="loadNewsDetails('${post._id}')" class="star text-primary" id="news-details" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">
                    <svg  xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                    </svg>
                      </div>
                          </div>
                    
                    </div>
                    </div>
        
        `;
        newContainer.appendChild(newsDiv);
        // spinner stop 
        toggleSpinner(false);
    }

};
// loader/spinner 
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
};
// load news details 
const loadNewsDetails = async (news_id) => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    }
    catch (error) {
        console.error("Failed to load categories", error);
    }
};

// display news details 
const displayNewsDetails = (post) => {
    const postName = document.getElementById('post-name');
    postName.innerText = `${post.author ? post.author.name : 'No data found!'}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <h6>Title: ${post.title}</h6>
    <p>Published Date: ${post.author.published_date}</p>
    `;

};
// Blog / Question
document.getElementById('blog').addEventListener('click', function () {
    categoryContainer.innerHTML = '';
    newContainer.innerHTML = '';
    toggleBlog(true);
});
document.getElementById('news').addEventListener('click', function () {
    loadCategoryItem();
    toggleBlog(false);
    categoryContainer.innerHTML = '';
    
});
const toggleBlog = isLoading => {
    const questions = document.getElementById('questions');
    if (isLoading) {
        questions.classList.remove('d-none');
    }
    else {
        questions.classList.add('d-none');
    }
};

loadCategoryItem();

    
