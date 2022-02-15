// get displays
let displays = Array.from(document.getElementsByClassName("display"));

let d1 = displays[0];
let d2 = displays[1];
let d3 = displays[2];

// set selected display
let selected = d1;

// when a display is clicked, it is now the selected display
displays.map(display =>
    display.addEventListener("mouseup", e => {
        selected.classList.remove('clicked');
        selected = e.target;
        selected.classList.add('clicked')
    }));

// operators
const operators = ['/', 'x', '+', '-'];

// get all buttons
let buttons = Array.from(document.getElementsByClassName("button"));
let equals = document.getElementById("equals");
buttons.push(equals);

// if a D1, D2, D3 is pressed, add their value to the current display if possible
let dfunc = (d) => {
    if(d.innerHTML && d.innerHTML !== selected.innerHTML) {
        try {
            d.innerHTML = eval(d.innerHTML);
            if(operators.includes(selected.innerHTML.charAt(selected.innerHTML.length-1))) {
                selected.innerHTML += d.innerHTML;
            }
        } catch {
            d.innerHTML = "??"
        }
    }
}

// if a button is clicked, perform actions accordingly
buttons.map(button =>
    button.addEventListener("mouseup", (e => {
        let targetText = e.target.innerText;
        switch (targetText) {
            case 'D1':
                dfunc(d1);
                break;
            case 'D2':
                dfunc(d2);
                break;
            case 'D3':
                dfunc(d3);
                break;
            case '0':
                if(selected.innerHTML && !operators.includes(selected.innerHTML.charAt(selected.innerHTML.length-1)) ) {
                    selected.innerHTML += targetText;
                }
            break;
            case '←':
                if(selected.innerHTML) {
                    selected.innerHTML = selected.innerHTML.slice(0, -1);
                }
                break;
            case '±':
                if(selected.innerHTML) {
                    if(selected.innerHTML.charAt(0) !== '-') {
                        selected.innerHTML = '-'.concat(selected.innerHTML);
                    } else {
                        selected.innerHTML = selected.innerHTML.substring(1);
                    }
                }
                break;
            case 'C':
                if(selected.innerHTML){
                    selected.innerHTML = '';
                }
                break;
            case '=':
                if(selected.innerHTML){
                    try {
                        selected.innerHTML = eval(selected.innerHTML);
                    } catch {
                        selected.innerHTML = "??"
                    }
                }
                break;
            default:
                if(selected.innerHTML === '??') {
                    selected.innerHTML = '';
                }
                if(!(operators.includes(selected.innerHTML.charAt(selected.innerHTML.length-1)) && operators.includes(e.target.innerText))) {
                    selected.innerHTML += targetText;
                }
                break;
        }
    })));