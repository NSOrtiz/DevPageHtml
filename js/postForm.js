const getPost = async () =>{
    let response = await fetch("https://reto-js-bd894-default-rtdb.firebaseio.com/.json")
    let Post = await response.json()
    console.log(Post)
    
    let keys = Object.keys(Post) //manda a llamar metodo object 
    //console.log(keys) 

    let postsArray = keys.map((key) => {
        return {...Post[key], key}
    })
    console.log(postsArray)
    return postsArray 
}


const updateLabels = () =>{
    let inputText = document.getElementById("textInput");
    let labelContainer = document.getElementById("labelContainer");
    
    inputText.addEventListener("keyup", (event) => {
        
        let text = inputText.value
        let parts = text.split(',')

        labelContainer.innerHTML = '' 

        parts.forEach((part)=>{
            let label = document.createElement("label")
            label.classList.add("label-style")
            label.textContent = "#" + part.trim()
            labelContainer.appendChild(label)
        })  
        if (parts.length >= 5) {
            inputText.style.display = 'none';
            labelContainer.removeChild(labelContainer.lastChild);
        } else {
            inputText.style.display = 'inline-block'; // Asegurarse de que el input esté visible si se eliminan etiquetas
        }
    });
}
updateLabels()


let infoPostArray = []
//creacion de array de objeetos perro
const createNewPostsArray = () => {
    let fields = document.querySelectorAll("#form-data input")
    let infoPost = {}
    fields.forEach((val)=>{
        infoPost[val.name] = val.value
    })
    infoPostArray.push({...infoPost})
    console.log(infoPost)
    return infoPost
}

let saveBtn = document.getElementById("publishBtn") 


saveBtn.addEventListener("click", (event)=>{
  event.preventDefault() 
  let newPosts = createNewPostsArray()
  sendPost(newPosts)
  console.log(newPosts)

  window.open('../index.html','_self')
})

const sendPost = async (postObject) =>{
    let sendData = await fetch(
        "https://reto-js-bd894-default-rtdb.firebaseio.com/.json",
    {
        method: "POST",
        body: JSON.stringify(postObject),
    })
    let data =await sendData.json() //desempaquetar info enviada 
    console.log(data)

}

const getProductData = async (postKey) => {

    //promesa --> await --> promesa cumplida --> muestra la info de la promesa
    let response = await fetch(`https://reto-js-bd894-default-rtdb.firebaseio.com/${postKey}.json`)

    //También es una promesa --> await --> promesa cumplida y brinda los datos por el método JSON 
    let data = await response.json()

    
    return data
}

let closeBtn = document.getElementById("btn-close") 


closeBtn.addEventListener("click", async(event)=>{
  event.preventDefault() 
  window.open('../index.html','_self')
})

