'use strict'

const slideWrapper = document.querySelector('[data-slide="wrapper"]')
const slideList = document.querySelector('[data-slide="list"]')
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]')
const navNextButton = document.querySelector('[data-slide="nav-next-button"]')
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]')
const slideItems =document.querySelectorAll('[data-slide="item"]')
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

    function getCenterPosition({ index }) {
    const slideItem = slideItems[index]
    const slideWidth = slideItem.clientWidth
    const windowWidth = document.body.clientWidth
    const margin = (windowWidth - slideWidth) / 2 
    const position = margin - (index * slideWidth)
    return position
    }

function setVisibleSlide({ index }) {   
    const position = getCenterPosition({ index })   
    state.currentSlideIndex = index
    activeControlButton({ index })
    translateSlide({ position })
}

function nextSlide() {
    setVisibleSlide({ index: state.currentSlideIndex + 1 })
}

function previousSlide(){
    setVisibleSlide({ index: state.currentSlideIndex - 1 })
}


function createControlButton() {
    slideItems.forEach(function() {
        const controlButton = document.createElement('button')
        controlButton.classList.add('slide-control-button')
        controlButton.classList.add('fas')
        controlButton.classList.add('fa-circle')
        controlButton.dataset.slide = 'control-button'
        controlsWrapper.append(controlButton)
    })
}

function activeControlButton({ index }) {
    const controlButton = controlButtons[index]
    controlButtons.forEach(function(controlButtonItem) {
        controlButtonItem.classList.remove('active')
    })

    controlButton.classList.add('active')
}

function onMousedown (event, index) {
    const slideItem = event.currentTarget
    state.startingPoint = event.clientX
    state.currentPoint = event.clientX - state.savedPosition
    state.currentSlideIndex = index
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
    //const slideWidth = slideItem.clientWidth
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
}

function onControlButtonClick(index) {
    setVisibleSlide({ index })
}


function setListeners() {
    controlButtons = document.querySelectorAll('[data-slide="control-button"]')

    controlButtons.forEach(function(controlButton, index){
        controlButton.addEventListener('click', function(event){
            onControlButtonClick(index)
        })
    })
    slideItems.forEach(function(slideItem, index) {
        slideItem.addEventListener('dragstart', function(event) {
            event.preventDefault()
        })
        slideItem.addEventListener('mousedown', function(){
            onMousedown(index)
        })
        slideItem.addEventListener('mouseup', onMouseUp) 
    }) 

    navNextButton.addEventListener('click', nextSlide)
    navPreviousButton.addEventListener('click', previousSlide)
}

function initSlider() {
    createControlButton()
    setListeners()
    setVisibleSlide({ index: 0 })
}

initSlider()