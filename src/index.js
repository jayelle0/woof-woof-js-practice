const dogBar = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')

fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(dogArray => {
    renderAllDogs(dogArray)
    //   console.log(dogArray)
});

const renderAllDogs = dogArray => {
    dogArray.forEach(renderADog)
}

const renderADog = dogObj => {
    const dogSpan = document.createElement('span')
    dogSpan.dataset.id = dogObj.id 
    dogSpan.innerHTML = `${dogObj.name}`
    
    dogBar.append(dogSpan) 
}

dogBar.addEventListener('click', (event) => {
    if (event.target.matches("span")){
        const puppySpan = event.target 
        const puppyId = puppySpan.dataset.id
        const puppyIdNum = parseInt(puppyId)
        // console.log(typeof puppyIdNum)
        
        fetch(`http://localhost:3000/pups/${puppyIdNum}`)
        .then(response => response.json())
        .then(clickedDogInfo => {
            // console.log(clickedDogInfo)  
            dogInfoDiv.innerHTML = `
            <img src="${clickedDogInfo.image}">
            <h2 id = ${clickedDogInfo.id}> ${clickedDogInfo.name} </h2>
            <button type="button"> </button>
            `
            const dogButton = dogInfoDiv.querySelector('button')

            if (clickedDogInfo.isGoodDog === true) {
                dogButton.innerText= "Good Dog!"
            }
            else {
                dogButton.innerText= "Bad Dog!"
        }
        });
    }
})   


dogInfoDiv.addEventListener('click', (event) => {
    if (event.target.matches('button')){
        const button = event.target 
        const puppyDiv = button.closest('div')
        const puppyId = puppyDiv.querySelector('h2').id
        const puppyIdNum = parseInt(puppyId)
        let newDogStatus 
        
        if (button.innerText === "Good Dog!") {
            newDogStatus = false  } 
        else if (button.innerText  === "Bad Dog!") {
            newDogStatus = true
        }

        console.log(newDogStatus)
        

        fetch(`http://localhost:3000/pups/${puppyIdNum}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({isGoodDog: newDogStatus}),
        })
        .then(response => response.json())
        .then(newDogData => {
            if (newDogData.isGoodDog === true) {
                button.innerText= "Good Dog!"
            }
            else if (newDogData.isGoodDog === false) {
                button.innerText= "Bad Dog!"
            }
            console.log(newDogData)
        })
    }
})




