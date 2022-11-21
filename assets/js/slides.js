'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]')
const slideList = document.querySelector('[data-slide="list"]')
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]')
const navNextButton = document.querySelector('[data-slide="nav-next-button"]')
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]')
const slideItems =document.querySelectorAll('[data-slide="item"]')
const controlButtons = document.querySelectorAll('[data-slide="control-button"]')

function onMousedown (event) {
    const slideItem = event.currentTarget
    slideItem.addEventListener('mousemove', onMouseMove)
    console.log('pixel do mouse-down', event.clientX)
    console.log('apertei o botão do mouse')
}

function onMouseMove(event) {
    console.log('pixel do mousemove' ,event.clientX)
    console.log('movimentei o mouse emcima do elemento')
}


function onMouseUp(event) {
    const slideItem = event.currentTarget
    slideItem.removeEventListener('mousemove', onMouseMove)
    console.log(event)
    console.log('soltei o botão do mouse')
}

slideItems.forEach(function(slideItem, index) {
    slideItem.addEventListener('dragstart', function(event) {
        event.preventDefault()
    })


    slideItem.addEventListener('mousedown', onMousedown)
    slideItem.addEventListener('mouseup', onMouseUp)
    
})