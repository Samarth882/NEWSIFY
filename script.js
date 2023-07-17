const API_KEY="47977af187cf41f899e6bf27a4598292";
const URL="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchNews("USA"));

async function fetchNews(query){
    const res=await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    bindData(data.articles);
}

function reload(){
    window.location.reload();    
}

function bindData(articles) {
    const cardContainer = document.getElementById('card-container');
    const newCardTemplate = document.getElementById('template-news-card');
  
    cardContainer.innerHTML = "";
  
    if (!articles) {
      // Handle the case where articles are undefined or empty
      return;
    }
  
    articles.forEach((article) => {
      if (!article.urlToImage) return;
      const cardClone = newCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardContainer.appendChild(cardClone);
    });
  }

// function bindData(articles){
//     const cardContainer=document.getElementById('card-container');
//     const newCardTemplate=document.getElementById('template-news-card');

//     cardContainer.innerHTML = "";

//     articles.forEach((article)    => {
//         if(!article.urlToImage) return;
//         const cardClone=newCardTemplate.content.cloneNode(true);
//         fillDataInCard(cardClone,article);
//         cardContainer.appendChild(cardClone);
//     });
// }

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name}.${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

let curr=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curr?.classList.remove('active');
    curr=navItem;
    curr.classList.add('active');
}

const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);
    curr.classList.remove('active');
    curr=null;
})