const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// create map
const map = L.map('mapid', options).setView([-27.2153213, -49.6551177], 15);

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
L.marker([-27.2153213, -49.6551177], {icon}).addTo(map)

// image gallery

function selectImage(event) {
    
    const button = event.currentTarget
    // console.log(button)

    // remover todas as classes .active

    const buttons = document.querySelectorAll(".images button")
    // console.log(buttons)

    buttons.forEach(removeActiveClass)

    function removeActiveClass(buttonActive) {
        buttonActive.classList.remove("active")
    }

    // selecionar a imagem clicada

    // console.log(button.children)
    const image = button.children[0]
    const imageContainer = document.querySelector(".orphanage-details > img")
    

    // atualizar o container de imagem
    imageContainer.src = image.src

    //adicionar a classe .active para este botao que foi clicado
    button.classList.add('active')
}
