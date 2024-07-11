{
    const container = document.querySelector("#container");

    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++)
            {
                const div = document.createElement("div");
                div.classList.add("grid");
                container.append(div);
            }
    }

    let newSize = 16;

    function fill(event) {
        if (isRainbow){
            changeRainbow();
        }

        if (event.target.style.opacity == 0) {
            event.target.style.opacity = 0.1;
          } else if (event.target.style.opacity != 0 && event.target.style.opacity != 1) {
            let brushOpacity = event.target.style.opacity;
            event.target.style.opacity = parseFloat(brushOpacity) + 0.1;
          }
        
        event.target.style.backgroundColor = color; // Change this to your desired fill logic
    }
        

    function erase(element){
        element.target.style.backgroundColor = "white";
    }

    var block = document.querySelectorAll("div.grid");
    let color = "black"
    let mouseDown = false;

    block.forEach(function(div) {
        div.addEventListener("mousedown", (event) => {
            mouseDown = true;
            fill(event);
        });

        div.addEventListener("mouseover", (event) => {
            if (mouseDown) {
                fill(event);
            }
        });

        // Listen for mouseup and mouseleave events on the document
        document.addEventListener("mouseup", () => {
            mouseDown = false;
        });

        document.addEventListener("mouseleave", () => {
            mouseDown = false;
        });
    });
      

    function wasCancelled(input){
        return input == null;
    }

    // function makeGrid(){
    //     container.innerHTML = "";

    //     for(let i = 0; i < newSize; i++){
    //         for(let j = 0; j < newSize; j++)
    //             {
    //                 const div = document.createElement("div");
    //                 div.classList.add("grid");
    //                 container.append(div);
    //             }
    //     }
    // }
    function makeGrid() {
        container.innerHTML = "";
        container.style.cssText = `display:flex;
                                flex-wrap: wrap;
                                height: 500px;
                                width: 450px;
                                margin-left: auto;
                                margin-right: auto;
                                border: 1px solid black;
                                margin-bottom: 10px;`;

        for(let i = 0; i < newSize; i++){
            for(let j = 0; j < newSize; j++)
                {
                    const div = document.createElement("div");
                    const sizePercentage = 100 / newSize;
                    div.style.cssText = `height: ${sizePercentage}%; width: ${sizePercentage}%;`;
                    div.classList.add("grid");
                    container.append(div);
                }
        }


        // const elements = document.querySelectorAll('.grid');
        // elements.forEach(element => {
        //     element.style.height = '${100%/newSize}';
        //     element.style.width = calc(100%/newSize);
        //   });

        var block = document.querySelectorAll("div.grid");

        block.forEach(function(div) {
            div.addEventListener("mousedown", (event) => {
                mouseDown = true;
                fill(event);
            });
    
            div.addEventListener("mouseover", (event) => {
                if (mouseDown) {
                    fill(event);
                }
            });
    
            // Listen for mouseup and mouseleave events on the document
            document.addEventListener("mouseup", () => {
                mouseDown = false;
            });
    
            document.addEventListener("mouseleave", () => {
                mouseDown = false;
            });
        });

      }

    function sizeChange(){
        let input = prompt("Change size to (1-100):");
        if(wasCancelled(input)){
            return;
    }

    while(isNaN(parseInt(input))||
        parseInt(input) > 100|| 
        parseInt(input) < 1){
            input = prompt("Incorrect number, try again! Change size to:");
            if (wasCancelled(input)) {
                return;
            }
    }

        newSize = parseInt(input);
        makeGrid();
    }

    function clearPad(){
        makeGrid();
    }

    function changeBlack(){
        color = "black";
    }

    function generateRandomColor(){
        let maxVal = 0xFFFFFF; // 16777215
        let randomNumber = Math.random() * maxVal; 
        randomNumber = Math.floor(randomNumber);
        randomNumber = randomNumber.toString(16);
        let randColor = randomNumber.padStart(6, 0);   
        return `#${randColor.toUpperCase()}`
    }

    function changeRainbow(){
        color = generateRandomColor();
    }

    const clear = document.querySelectorAll("button.clearPad");

    clear.forEach((button) => {
        button.addEventListener("click", () => {
            clearPad();
        });
    });

    const changeSize = document.querySelectorAll("button.changeSize");

    changeSize.forEach((button) => {
        button.addEventListener("click", () => {
            sizeChange();
        });
    });

    const black = document.querySelectorAll("button.black");

    black.forEach((button) => {
        button.addEventListener("click", () => {
            changeBlack();
            isRainbow = false;
        });
    });

    const rainbow = document.querySelectorAll("button.rainbow");
    let isRainbow = false;

    rainbow.forEach((button) => {
        button.addEventListener("click", () => {
            changeRainbow();
            isRainbow = true;
        });
    });

}
