import Slider from './Slider';

export default class MiniSlider extends Slider {
    constructor({container, prevButton = null, nextButton = null, activeClass = '', elementsToIgnore = '', fadeIn = {} } = {}) {
        super({container, prevButton, nextButton, elementsToIgnore, fadeIn});
        this.activeClass = activeClass;
        if(elementsToIgnore.length) this.elementsToIgnore = this.container.querySelectorAll(elementsToIgnore);
    }   

    showNextSlide() {
        const {elementsToIgnore, slides, container, fadeIn, activeClass} = this;

        if(elementsToIgnore) elementsToIgnore.forEach(item => {
            if(slides[1] === item) {
                container.appendChild(item);
            }
        })

        container.appendChild(slides[0]);
        if(fadeIn) {
            slides.forEach(item => {
                item.classList.remove(activeClass, fadeIn.fadeInNext, fadeIn.fadeInPrev)
            })
            slides[0].classList.add(activeClass, fadeIn.fadeInNext)
        } else {
            slides.forEach(item => {
                item.classList.remove(activeClass)
            })
            slides[0].classList.add(activeClass)
        }
    }

    showPrevSlide() {
        const {elementsToIgnore, slides, container, fadeIn, activeClass} = this;

        if(elementsToIgnore) for(let i = elementsToIgnore.length - 1; i >= 0; i--) {
            if(slides[slides.length - 1] === elementsToIgnore[i]) {
                container.insertBefore(elementsToIgnore[i], slides[0]);
            }
        }
        
        if(fadeIn) {
            container.insertBefore(slides[slides.length - 1], slides[0]);
            slides.forEach(item => {
                item.classList.remove(activeClass, fadeIn.fadeInPrev, fadeIn.fadeInNext)
            })
            slides[0].classList.add(activeClass, fadeIn.fadeInPrev)
        } else {
            container.insertBefore(slides[slides.length - 1], slides[0]);
            slides.forEach(item => {
                item.classList.remove(activeClass)
            })
            slides[0].classList.add(activeClass)
        }
    }

    render() {
        this.container.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            overflow: hidden;
        `;
        this.bindAction(this.nextButton, 'click', () => this.showNextSlide());
        this.bindAction(this.prevButton, 'click', () => this.showPrevSlide());
        console.log(this.slides)
    }
}