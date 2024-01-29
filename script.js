
var expression = "";

function init(){
    const spec_divs = document.querySelectorAll('.special_buttons');
    const reg_divs = document.querySelectorAll('.button_div');
    const oper_divs = document.querySelectorAll('.operators');

    const all_button_array = Array.from(spec_divs).concat(Array.from(reg_divs).concat(Array.from(oper_divs)));

    all_button_array.forEach(function(div) {
        div.addEventListener('click', function(event) {
            const content = event.target.innerHTML;
            console.log(content);
            what_to_do(content);
        });
    });
}


function what_to_do(input){
    switch (input){
        case "AC":
            document.getElementById("output_screen").value = "";
            expression = "";
            break;

        case String.fromCharCode(177):
            if (expression.match(/[-()]/g)){     // THIS IS BUGGY WITH MORE COMPLEX INPUT
                expression = expression.substring(2,expression.length -1);
            }
            else
                expression = "-(" + expression + ")"
            document.getElementById("output_screen").value = expression;
            break;


        case "%":
            expression = document.getElementById("output_screen").value *= 0.01;
            break;


        // case '\u00F7': // ÷ (Division)
        // case '&divide': // HTML entity for division
        //     expression = document.getElementById("output_screen").value += input;
        //     break;


        case "=":
            calculate_result();
            break;


        default:
            expression = document.getElementById("output_screen").value += input;
            console.log(expression)
    }

    expression = expression.replace(/\u00D7/g, "*").replace(/\u00F7/g, "/");
    console.log(expression)
}


function calculate_result() {
    try {
        expression = eval(expression);
        document.getElementById("output_screen").value = expression % 1 === 0 ? expression : expression.toFixed(10);
    } catch (error) {
        console.log(error);
        document.getElementById("output_screen").value = "Error";
        expression = ""; // Reset expression on error
    }
}





