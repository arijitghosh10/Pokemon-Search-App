const searchBtn = document.querySelector('#pokeSearch')
const inputTxt = document.querySelector('#pokemon')
const details = document.querySelector('#newSection')
const side1img = document.querySelector('#side1img')

searchBtn.addEventListener('submit', async function(e){
    e.preventDefault()
    const searchTerm = inputTxt.value.toLowerCase();
    if(searchTerm===""){
        alert('No data found')
        return
    }
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`).then(res =>{
        statistics(res.data)
        inputTxt.value=null;
    })
    .catch(err =>{
        console.log(err)
        errorNotification(err);
    })
})
const errorNotification = (er)=>{
    details.innerHTML=""
    const errorMessage = document.createElement('h2')
    errorMessage.innerText = `Sorry, We could not find the data you requested in our database 😞 ${er} `
    errorMessage.classList.add('errorMsg')
    details.appendChild(errorMessage)
    inputTxt.value = null
}
const statistics = (mon) =>{
    details.innerHTML = ""
    const heading = document.createElement('h2')
    heading.innerText = `You searched for ${inputTxt.value}`
    heading.classList.add('head')
    details.appendChild(heading)
    const {sprites:arr} = mon
    const imagesDiv = document.createElement('div')
    imagesDiv.classList.add('imagesDiv')
    details.appendChild(imagesDiv)
        for(let x in arr){
            if(arr[x]!=='null' && typeof arr[x]!=='object'){
                const images= document.createElement('img')
                images.src = arr[x]
                imagesDiv.appendChild(images)
            } 
        }
    let c=0
    const {abilities:ablty} = mon
    for(let abc of ablty){
        c++
        const content1 = document.createElement('h2')
        content1.innerText = `Ability ${c}: ${abc.ability.name}`
        content1.classList.add('ability')
        details.appendChild(content1)
    }
    const movesDiv = document.createElement('div')
    movesDiv.innerText=`MOVES: `
    movesDiv.classList.add('movesDiv')
    details.appendChild(movesDiv)
    const {moves} = mon
    for(let ab of moves){
        const content2 = document.createElement('span')
        content2.innerText = ab.move.name
        content2.classList.add('moves')
        movesDiv.appendChild(content2)
    } 
}
