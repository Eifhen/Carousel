
(function(){

    function Carousel(id, color, reset){
        const INDICATOR_COLOR = color;
        const carousel = document.querySelector(`#${id}`);
        const slides = GetCarouselItems("carousel-item");
        const indicators = GetCarouselItem("carousel-indicators");
        const btnPrev = GetCarouselItemChildren("carousel-actions","carousel-button-prev");
        const btnNext = GetCarouselItemChildren("carousel-actions","carousel-button-next");
        const total_slides = slides.length;
        let current_slide = 0;
        let indicator_list;

        btnPrev.addEventListener('click', PreviousSlide );
        btnNext.addEventListener('click', NextSlide );
        
        function GetCarouselItem(className){
            const items = carousel.querySelector(`.${className}`);
            return items;
        }

        function GetCarouselItems(className){
            const items =  carousel.querySelectorAll(`.${className}`);
            return items;
        }

        function GetCarouselItemChildren(parentClassName, childrenClassName){
            const item = carousel.querySelector(`.${parentClassName}`).querySelector(`.${childrenClassName}`);
            return item;
        }

        function GetCarouselItemChildrenList(parentClassName, childrenClassName){
            const items = carousel.querySelector(`.${parentClassName}`).querySelectorAll(`.${childrenClassName}`);
            return items;
        }

        function CreateIndicators(){
            let list = '';
            for(var i = 0; i < total_slides; i++){
                list += `<span data-slide="${i}" class="carousel-indicator"></span>`;
            }
            indicators.innerHTML = list;
            IndicatorNavegation();
        }

        function IndicatorNavegation(){
            indicator_list = GetCarouselItemChildrenList("carousel-indicators",'carousel-indicator');
            for(var i = 0; i < indicator_list.length; i++){
                indicator_list[i].addEventListener('click', function(event){
                    slides[current_slide].classList.remove('carousel-item-visible');
                    current_slide = parseInt(event.target.getAttribute('data-slide'));
                    slides[current_slide].classList.add('carousel-item-visible');
                    CurrentIndicator();
                });
            }
        }

        function CurrentIndicator(){
            for(var i = 0; i < indicator_list.length; i++){
                indicator_list[i].classList.remove(`${INDICATOR_COLOR}`);
                indicator_list[i].classList.add('bg-white');
            }

            indicator_list[current_slide].classList.remove('bg-white');
            indicator_list[current_slide].classList.add(`${INDICATOR_COLOR}`);
        }


        function DefaultSlide(){
            if(total_slides > 0){
                for(var i = 0; i < total_slides - 1; i++){
                    slides[i].classList.remove('carousel-item-visible')
                }
                slides[0].classList.add('carousel-item-visible')
            }
            CurrentIndicator();
        }

        function PreviousSlide(){
            slides[current_slide].classList.remove('carousel-item-visible');
            if(current_slide > 0){
                current_slide --;
            }else if(reset === true){
                current_slide = total_slides - 1;
            }
            slides[current_slide].classList.add('carousel-item-visible');
            CurrentIndicator();
        }

        function NextSlide(){
            slides[current_slide].classList.remove('carousel-item-visible');
            
            current_slide ++;
            if(current_slide === total_slides) { 
                if(reset === true){
                    current_slide = 0; 
                }
                else {
                    current_slide --;
                }
            }

            slides[current_slide].classList.add('carousel-item-visible');
            CurrentIndicator();    
        }


        CreateIndicators();
        DefaultSlide();
    
    }

    // Primer param carousel id y segundo string color de los indicators
    Carousel('carousel-1', 'bg-orange', false);

})();
   