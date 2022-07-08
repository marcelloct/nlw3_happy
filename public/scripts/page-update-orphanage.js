// create map
const map = L.map('mapid').setView([-27.2153213, -49.6551177], 15);

// create and add  titleLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popupAnchor: [170, 2]
})



// create and add marker

let marker; 

map.on('click', (event) => {
    // console.log(event)
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat
    document.querySelector('[name=lng]').value = lng

    // remove icon 
    marker && map.removeLayer(marker)

    // add icon layer
    marker = L.marker([lat, lng], {icon}).addTo(map)
})


// adicionar o campo de fotos
function addPhotoField() {
    // console.log('its working')
    // pegar o container de fotos #images
    const containerImages = document.querySelector('#images')
    // pegar o container para duplicar .new-image
    const fieldsImage = document.querySelectorAll('.new-upload')
    //realizar o clone da ultima imagem adicionada
    const newFieldImage = fieldsImage[fieldsImage.length - 1].cloneNode(true)
    // verificar se o campo está vazio, se sim, não adicionar ao container de imagens
    const input = newFieldImage.children[0]
    // console.log(input.value == "")
    if(input.value == ""){
        return
    }
    // limpar o campo antes de adicionar ao container de imagens
    // console.log(newFieldImage.children)
   input.value = ""
    // adicionar o clone ao container de imagens
    containerImages.appendChild(newFieldImage)
}

function deleteField(event) {
    // console.log(event.currentTarget)
    const span = event.currentTarget

    const fieldsImage = document.querySelectorAll('.new-upload')

    if(fieldsImage.length < 2){
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // console.log('cheguei aqui')

    // deletar o campo
    // console.log(span.parentNode)
    span.parentNode.remove()
}


// select yes or no

function toggleSelect(event) {
    // console.log('cheguei?')
    // retirar a class .active (dos dois)
    document.querySelectorAll('.button-select button').forEach((button => {
        button.classList.remove('active')
    }))
    // colocar a class .active no botao clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o meu input hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')
    // console.log(input)

    input.value = button.dataset.value
}

function validate(event) {

    const lat = document.querySelector('[name=lat]').value
    const lng = document.querySelector('[name=lng]').value

    // validar se lat e lng estão preenchidos
    
    if(lat == "" && lng == ""){
        event.preventDefault()
        alert("Selecione um ponto no mapa")

        // let alertContainer = document.querySelector(".alert-message")
        // let alertMessage = document.createTextNode("Selecione um ponto no mapa")
        // alertContainer.appendChild(alertMessage)
        // alertContainer.style.display = "block";

        // setTimeout(()=>{
        //     alertMessage.remove()
        // }, 3000)

    }
}