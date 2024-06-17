import { getMovieReviewData } from "./data.js";

const init = ()=>{
    const movieRevewData = getMovieReviewData()
    printReviewData(movieRevewData)
    printMovieData(movieRevewData)
}

const printReviewData = (movieRevewData)=>{
    const flatReviewData = movieRevewData.flat()

    const totalMovies = movieRevewData.length 
    const totalReviews = flatReviewData.length
    const totalRating = flatReviewData.reduce((acc, cur)=>{
        return acc + cur.rating
    }, 0)
    const averageRating = (totalRating/totalReviews).toFixed(2)

    const totalMovieEl = document.getElementById("tMoviesId")
    addStats(totalMovieEl, totalMovies )
    const totalAvgRatingEl = document.getElementById("tAvgRatingId")
    addStats(totalAvgRatingEl, averageRating)

    const totalReviewsEl = document.getElementById("tReviewsId")
    addStats(totalReviewsEl, totalReviews )


}

const addStats = (elem, value) =>{
    const spanEl = document.createElement("span")
    spanEl.classList.add("text-6xl")
    spanEl.innerText = value
    elem.appendChild(spanEl)
}


const printMovieData  =(movieRevewData)=>{
    const flatReviewData = movieRevewData.flat()
    flatReviewData.sort((a,b)=>a.on - b.on)
    const movieListEL = document.querySelector("#movieListId UL")

    flatReviewData.map((movie)=>{
        const liElem = document.createElement("li")
        liElem.classList.add("card", "p-2", "my-2")

        const titleElem = document.createElement("p")
        titleElem.classList.add("text-xl", "mb-2")
        titleElem.innerText = `${movie.title} - ${movie.rating}`
        liElem.appendChild(titleElem)


        const reviewElem = document.createElement("p")
        reviewElem.classList.add("mb-2" ,"mx-2")
        reviewElem.innerText = `${movie.content}`
        liElem.appendChild(reviewElem)


        const byElem = document.createElement("p")
        byElem.classList.add("mb-2" ,"mx-2")
        byElem.innerText = `By ${movie.by} on ${new Intl.DateTimeFormat("en-BD").format(movie.on)}`
        liElem.appendChild(byElem)

        movieListEL.appendChild(liElem)
        
            
        
    })
}

init()