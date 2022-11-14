const input = document.getElementById('input-box');
var isShowingResult = false;
var isShowingTrig = false;

function reset() {
    input.value = null;
    isShowingResult = false;
}

function put(c) {
    if (isShowingResult)
        reset();
    let firstPart = input.value.slice(0, input.selectionStart);
    let lastPart = input.value.slice(input.selectionStart);
    let newCursor = (firstPart + c).length;
    if (c.includes('()') || c === '||')
        newCursor--;
    input.value = firstPart + c + lastPart;
    input.setSelectionRange(newCursor, newCursor);
    input.focus();
}

function swap(id) {
    let text = $(id).html();
    const match = {
        "x²":["sin", "put('sin()')"],
        "√":["cos", "put('cos()')"],
        "x<sup>y</sup>":["tan", "put('tan()')"],
        "sin":["x²", "put('²')"],
        "cos":["&radic;", "put('\u221a()')"],
        "tan":["x<sup>y</sup>", "put('^')"]
    };
    $(id).attr("onclick", match[text][1]);
    $(id).html(match[text][0]);
}

function swapTrig() {
    $("#swap1").addClass("swapped");
    setTimeout(() => {
        swap("#swap1");
        $("#swap2").addClass("swapped");
        setTimeout(() => {
            swap("#swap2");
            $("#swap3").addClass("swapped");
            setTimeout(() => {
                swap("#swap3");
            }, 100);
        }, 100);
    }, 100);
    setTimeout(() => {
        $("#swap1").removeClass("swapped");
        $("#swap2").removeClass("swapped");
        $("#swap3").removeClass("swapped");
    }, 700);
}

function backspace() {
    if (isShowingResult)
        reset();
    let firstPart = input.value.slice(0, input.selectionStart-1);
    let lastPart = input.value.slice(input.selectionStart);
    input.value = firstPart + lastPart;
    input.setSelectionRange(firstPart.length, firstPart.length);
    input.focus();
}

function translateExpr(string) {
    const transl = {
        '\u221a':'sqrt',
        '\u00d7':'*',
        '\u00b2':'^(2)',
        '\u03c0':'(pi)',
        'e': '(e)',
        'log':'log10',
        'ln':'log'
    };
    const re = new RegExp(Object.keys(transl).join('|'), 'g');
    const abs = /\|(.*)\|/g;
   return string.replace(re, key => transl[key]).replace(abs, 'abs($1)');
}

function eval_result() {
    if (!input.value)
        return;
    isShowingResult = true;
    expr = translateExpr(input.value);
    console.log(`Received: ${input.value}\nEvaluated: ${expr}`);
    try {
        input.value = math.eval(expr);
    } catch {
        isShowingResult = false;
        $('#input-box').addClass('invalid-input');
        setTimeout(() => {
            $('#input-box').removeClass('invalid-input');
        }, 500);
    }
    input.blur();
}

$('.buttons').click(event => {
    $(event.target).addClass('pressed');
    setTimeout(() => {
        $(event.target).removeClass('pressed');
    }, 200);
});

document.addEventListener('keyup', event => {
    if (event.key === 'Enter')
        eval_result();
    else if (input !== document.activeElement) {
        switch(event.key) {
            case '+':
            case '-':
            case '/':
            case '(':
            case ')':
            case '%':
            case 'e':
                put(event.key);
                break;
            case '*':
                put('\u00d7');
                break;
            case 's':
                put('\u221a');
                break;
            case 'p':
                put('\u03c0');
                break;
            case 'Backspace':
                backspace();
                break;
            case 'ArrowLeft':
                input.setSelectionRange(input.selectionStart-1, input.selectionStart-1);
                input.focus();
                break;
            case 'ArrowRight':
                input.setSelectionRange(input.selectionStart+1, input.selectionStart+1)
                input.focus();
                break;
            default:
                if (!isNaN(event.key))
                    put(event.key);
                break;
        }
    }
});