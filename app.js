// Add this after your calculator function
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Map keyboard keys to calculator functions
    const keyMap = {
        '0': '0', '1': '1', '2': '2', '3': '3', '4': '4',
        '5': '5', '6': '6', '7': '7', '8': '8', '9': '9',
        '+': '+', '-': '-', '*': '*', '/': '/', 
        '.': '.', '%': '%',
        '(': '()', ')': '()', // Both parentheses trigger the () function
        'Enter': '=',
        '=': '=',
        'Backspace': 'DEL',
        'Delete': 'c',
        'Escape': 'c'
    };

    // Check if pressed key is in our map
    if (key in keyMap) {
        event.preventDefault(); // Prevent default behavior for calculator keys
        calculator(keyMap[key]);
    }
    
    // Special handling for +/- which doesn't have a direct key
    if (key === '`' || key === '~') { // Using tilde key for +/-
        event.preventDefault();
        calculator('+/-');
    }
});

// Your existing calculator function (unchanged)
function calculator(para) {
    if(para !== 'c' && para !== '=' && para !== '()' && para !== '+/-' && para !=='DEL'){
        let displayArea = document.getElementById('display-area-h2');
        // Check if display already has 20 characters
        if (displayArea.innerHTML.length >= 20) {
            alert("Maximum 20 characters reached!");
            return;
        }
        displayArea.innerHTML += para;
    } else if(para === "="){
        let resultArea = document.getElementById('result-area-h1');
        let result = eval(document.getElementById('display-area-h2').innerHTML);
        // Check if result has more than 19 characters
        if (result.toString().length > 19) {
            alert("Result is too large to display properly!");
        }
        resultArea.innerHTML = result;
    } else if(para === "c"){
        document.getElementById('display-area-h2').innerHTML = "";
        document.getElementById('result-area-h1').innerHTML = "";
    } else if(para === "DEL"){
        document.getElementById('display-area-h2').innerHTML = document.getElementById('display-area-h2').innerHTML.slice(0, -1);
    } else if(para === "()"){
        let displayString = document.getElementById('display-area-h2').innerHTML;
        // Check if display already has 20 characters
        if (displayString.length >= 20) {
            alert("Maximum 20 characters reached!");
            return;
        }
        
        let openCount = (displayString.match(/\(/g) || []).length;
        let closeCount = (displayString.match(/\)/g) || []).length;

        if (openCount > closeCount) {
            document.getElementById('display-area-h2').innerHTML += ')';
        } else {
            document.getElementById('display-area-h2').innerHTML += '(';
        }
    } else if(para === "+/-"){
        let displayString = document.getElementById('display-area-h2').innerHTML;
        if (displayString.length > 0) {
            let lastChar = displayString[displayString.length - 1];
    
            if (/\d/.test(lastChar)) {
                let numberMatch = displayString.match(/-?\d+(\.\d+)?$/);
    
                if (numberMatch) {
                    let lastNumber = numberMatch[0];
                    // Check if adding sign would exceed 20 characters
                    if (lastNumber.startsWith('-')) {
                        document.getElementById('display-area-h2').innerHTML = displayString.slice(0, -lastNumber.length) + lastNumber.slice(1);
                    } else {
                        if (displayString.length + 1 > 20) {
                            alert("Maximum 20 characters reached!");
                            return;
                        }
                        document.getElementById('display-area-h2').innerHTML = displayString.slice(0, -lastNumber.length) + '-' + lastNumber;
                    }
                }
            }
        }
    }
}