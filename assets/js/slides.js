'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]')
const slideList = document.querySelector('[data-slide="list"]')
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]')
const navNextButton = document.querySelector('[data-slide="nav-next-button"]')
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]')
let slideItems = document.querySelectorAll('[data-slide="item"]')
let controlButtons

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
function onMousedown (event, index) {
    const slideItem = event.currentTarget
    state.startingPoint = event.clientX
    state.currentPoint = event.clientX - state.savedPosition
    state.currentSlideIndex = index
    slideList.style.transition = 'none'
    slideItem.addEventListener('mousemove', onMouseMove)
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
        const position = (state.currentSlideIndex - 1) * slideWidth
        translateSlide(-position)
    }
    else {
        setVisibleSlide({ index: state.currentSlideIndex })
    }
    slideItem.removeEventListener('mousemove', onMouseMove)
}

function onControlButtonClick(index) {
    setVisibleSlide({ index })
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