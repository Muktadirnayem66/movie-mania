import { getMovieReviewData } from "./data.js";

let sortDesc = false
const init = ()=>{
    const movieRevewData = getMovieReviewData()
    registerHandlers(movieRevewData)
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
   let sorted =  flatReviewData.toSorted((a,b)=>b.on - a.on)
    const movieListEL = document.querySelector("#movieListId UL")
    addMovieRevewData(movieListEL, sorted)
    
}

const registerHandlers=(movieRevewData)=>{
    const sortBtn = document.getElementById("srtBtnId")
    const grpBtn = document.getElementById("grpBtnId")
    sortBtn.addEventListener("click", ()=>sortByReview(movieRevewData) )
    grpBtn.addEventListener("click", ()=>groupReviewsByTitle(movieRevewData) )
}

const sortByReview=(movieRevewData)=>{
    const flatReviewData = movieRevewData.flat()
    const movieListEL = document.querySelector("#movieListId UL")


    sortDesc = !sortDesc
    let sortReviewData = sortDesc ?
     flatReviewData.toSorted((a,b)=>b.rating - a.rating) :
    flatReviewData.toSorted((a,b)=>a.rating - b.rating)
    removeChildNodes(movieListEL)
    addMovieRevewData(movieListEL, sortReviewData)
}


const groupReviewsByTitle= (movieRevewData)=>{
    const flatReviewData = movieRevewData.flat()
    const groupedReviews = Object.groupBy(flatReviewData, ({title})=>title)
    const titlekeys = Reflect.ownKeys(groupedReviews)

    const movieListEL = document.querySelector("#movieListId UL")
    removeChildNodes(movieListEL)

    titlekeys.forEach((title)=>{
        const liEl = document.createElement("li")
        liEl.classList.add("card", "my-2")

        const hEl = document.createElement("h4")
        hEl.classList.add("text-3xl")
        hEl.innerText = title
        liEl.appendChild(hEl)

        const reviews = groupedReviews[title]

        reviews.forEach((review)=>{
            const pEl = document.createElement("p")
            pEl.classList.add("mx-2", "my-2")

            const message = ` <strong>${review.by}</strong> has given <strong>${review.rating}</strong> rating with a comment , <i>${review.content}</i>`

            pEl.innerHTML = message
            liEl.appendChild(pEl)

        })

        movieListEL.appendChild(liEl)
    })


}

const addMovieRevewData=(movieListEL, sorted)=>{

    sorted.map((movie)=>{
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

const removeChildNodes = (parent) =>{
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

init()