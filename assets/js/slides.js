'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]')
const slideList = document.querySelector('[data-slide="list"]')
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]')
const navNextButton = document.querySelector('[data-slide="nav-next-button"]')
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]')
const slideItems =document.querySelectorAll('[data-slide="item"]')
const controlButtons = document.querySelectorAll('[data-slide="control-button"]')

const state = {
    startingPoint: 0, 
    savedPosition: 0,
    currentPoint: 0,
    movement: 0,
    currentSlideIndex: 0
}

function translateSlide({ position }){
    state.savedPosition = position
    slideList.style.transform = `translateX(${position}px)`
}

    function getCenterPositio({ index }) {
    const slideItem = slideItems[index]
    const slideWidth = slideItem.clientWidth
    const windowWidth = document.body.clientWidth
    const margin = (windowWidth - slideWidth) / 2 
    const position = margin - (index * slideWidth)
    return position
    }

function setVisibleSlide({ index }) {
    
    const position = getCenterPositio({ index })
    
    state.currentSlideIndex = index
    translateSlide({ position })
}

function nextSlide() {
    setVisibleSlide({ index: state.currentSlideIndex + 1 })
}

function previousSlide(){
    setVisibleSlide({ index: state.currentSlideIndex - 1 })
}

function createControlButton() {
    
}

function onMousedown (event, index) {
    const slideItem = event.currentTarget
    state.startingPoint = event.clientX
    state.currentPoint = event.clientX - state.savedPosition
    state.currentSlideIndex = index
    slideItem.addEventListener('mousemove', onMouseMove)
    console.log(state.currentSlideIndex)
    //console.log('ponto de partida', startingPoint)
    //console.log('apertei o botão do mouse')
}
function onMouseMove(event) {
    state.movement = event.clientX - state.startingPoint
    const position = event.clientX - state.currentPoint
    translateSlide({ position })
    state.savedPosition = position
}
function onMouseUp(event) {
    const slideItem = event.currentTarget
    const slideWidth = slideItem.clientWidth
    console.log(slideWidth)
    if(state.movement < -150) {
        nextSlide()
    }
    else if(state.movement > 150) {
        previousSlide()
    }
    else {
        setVisibleSlide({ index: state.currentSlideIndex })
    }
    slideItem.removeEventListener('mousemove', onMouseMove)
    //console.log(event)
    //console.log('soltei o botão do mouse')
}
slideItems.forEach(function(slideItem, index) {
    slideItem.addEventListener('dragstart', function(event) {
        event.preventDefault()
    })
    slideItem.addEventListener('mousedown', function(event){
        onMousedown(event, index)
    })
    slideItem.addEventListener('mouseup', onMouseUp) 
}) 

navNextButton.addEventListener('click', nextSlide)
navPreviousButton.addEventListener('click', previousSlide)

setVisibleSlide({ index: 0 })