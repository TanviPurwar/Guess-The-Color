//SELECTORS
const opt1 = document.querySelector('.o1')
const opt2 = document.querySelector('.o2')
const opt3 = document.querySelector('.o3')
const opt4 = document.querySelector('.o4')
const opt5 = document.querySelector('.o5')
const opt6 = document.querySelector('.o6')
const opts = document.querySelector('.color-options')
const opt_btn = document.querySelectorAll('.option')

const val = document.querySelector('#value')
const nxt = document.querySelector('.next-btn')
const disp_score = document.querySelector('.display-score')

const lvl = document.querySelector('.level-page')
const gme = document.querySelector('.main-game')
const scr = document.querySelector('.score')

//VARIABLES
let range = 255
let round_num = 10
let correct_option = 7
let score = 0
let red = 0
let blue = 0
let green = 0

//EVENT LISTENERS
nxt.addEventListener('click', actual_gameplay)
disp_score.addEventListener('click', display_score)

//FUNCTIONS

function display_score(){
    gme.style.display = 'none'
    scr.style.display = 'block'
    let message = ""
    if(score == 0){
        message = "oops! maybe try just clicking the first option everytime,</br>you will atleast get one right"
    }
    else if(score >= 1 && score <= 3){
        message = "You can do better"
    }
    else if(score >= 4 && score <= 6){
        message = "You have an average color perception"
    }
    else if(score >= 7 && score <= 9){
        message = "Your score is great!</br>definitely not colorblind"
    }
    else{
        message = "You are amazing!"
    }

    scr.children[0].innerHTML = "your score = " + score.toString()  
    scr.children[1].innerHTML = message 
}

function startGame(){
    lvl.style.display = 'none'
    gme.style.display = 'block'
}

function check_duplicates(generated_options, red0, green0, blue0){

    for(let i = 0; i < 6; i++){
        if(red0 == generated_options[i][0] && green0 == generated_options[i][1] && blue0 == generated_options[i][2]){
            return 1
        }
    }
    return 0
}

function generate_options(opt, llr, rlr, llb, rlb, llg, rlg, generated_options, n){

    let red1 = 300
    let blue1 = 300
    let green1 = 300

    while(check_duplicates(generated_options, red1, green1, blue1)){
        red1 = Math.floor(Math.random() * (rlr - llr)) + llr
        blue1 = Math.floor(Math.random() * (rlb - llb)) + llb
        green1 = Math.floor(Math.random() * (rlg - llg)) + llg
    }

    opt.style.backgroundColor = 'rgb(' + red1.toString() + ', ' + green1.toString() + ', ' + blue1.toString() + ')'
    generated_options[n][0] = red1
    generated_options[n][1] = green1
    generated_options[n][2] = blue1
}

function generate_random_color(){
    
    red = Math.floor(Math.random()*256)
    blue = Math.floor(Math.random()*256)
    green = Math.floor(Math.random()*256)

    val.innerText = 'rgb(' + red.toString() + ', ' + green.toString() + ', ' + blue.toString() + ')'
}

function set_correct_option(){

    correct_option = Math.floor(Math.random()*6) + 1
    console.log(correct_option)

    switch(correct_option){
        case 1: 
            opt1.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt1.classList.add('correct')
            break;
        case 2: 
            opt2.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt2.classList.add('correct')
            break;
        case 3: 
            opt3.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt3.classList.add('correct')
            break;
        case 4: 
            opt4.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt4.classList.add('correct')
            break;
        case 5: 
            opt5.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt5.classList.add('correct')
            break;
        case 6: 
            opt6.style.backgroundColor = 'rgb(' + red.toString() + ',' + green.toString() + ',' + blue.toString() + ')'
            opt6.classList.add('correct')
            break;
    }
}

function actual_gameplay(){

    for(let i = 0; i < opt_btn.length; i++){
        opt_btn[i].parentElement.style.backgroundColor = 'white'
        opt_btn[i].disabled = false
    }

    round_num = round_num - 1
    let leftlim = Math.round(range/2)
    let rightlim = range - leftlim

    console.log(leftlim + "-" + rightlim)
    generate_random_color()

    console.log(red)
    console.log(blue)
    console.log(green)

    let options = [opt1, opt2, opt3, opt4, opt5, opt6]

    let generated_options = [[300, 300, 300], 
                            [300, 300, 300],
                            [300, 300, 300], 
                            [300, 500, 300],
                            [300, 300, 300],
                            [300, 300, 300]]

    let leftlimred = 0
    let rightlimred = 225
    let leftlimblue = 0
    let rightlimblue = 225
    let leftlimgreen = 0
    let rightlimgreen = 225

    if(range != 255){
        leftlimred = (red - leftlim) < 0 ? 0 : (red - leftlim) - Math.max(0, (red+rightlim-255))
        //console.log("red left limit: " + leftlimred)
        rightlimred = (red + rightlim) > 255 ? 255 : (red + rightlim) + Math.max(0, (0-red+leftlim))
        //console.log("red right limit: " + rightlimred)
        leftlimblue = (blue - leftlim) < 0 ? 0 : (blue - leftlim) - Math.max(0, (blue+rightlim-255))
        //console.log("blue left limit: " + leftlimblue)
        rightlimblue = (blue + rightlim) > 255 ? 255 : (blue + rightlim) + Math.max(0, (0-blue+leftlim))
        //console.log("blue right limit: " + rightlimblue)
        leftlimgreen = (green - leftlim) < 0 ? 0 : (green - leftlim) - Math.max(0, (green+rightlim-255))
        //console.log("green left limit: " + leftlimgreen)
        rightlimgreen = (green + rightlim) > 255 ? 255 : (green + rightlim) + Math.max(0, (0-green+leftlim))
        //console.log("green right limit: " + rightlimgreen)
    }

    for(let i = 0; i < 6; i++){
        generate_options(options[i], leftlimred, rightlimred, leftlimblue, rightlimblue, leftlimgreen, rightlimgreen, generated_options, i)
    }

    set_correct_option()

    if(round_num == 0){
        nxt.disabled = true
        nxt.style.backgroundColor = 'grey'
        disp_score.style.display = 'inline-block'
        console.log("your score = " + score.toString())
    }
}

function isCorrect(event){
    
    if(event.target.classList[0] != 'option'){
        return;
    }

    let l = event.target.classList
    console.log(l[2])

    if(l[2] == 'correct'){
        event.target.parentElement.style.backgroundColor = 'rgba(125, 240, 108, 0.5)'
        score = score + 1
        event.target.classList.remove('correct')
    }
    else{
        event.target.parentElement.style.backgroundColor = 'rgba(245, 140, 108, 0.5)'
        let corr = document.querySelector('.correct')
        corr.parentElement.style.backgroundColor = 'rgba(125, 240, 108, 0.5)'
        corr.classList.remove('correct')
    }

    for(let i = 0; i < opt_btn.length; i++){
        opt_btn[i].disabled = true
    }
}

function selectLevel(event){

    console.log(event.target)

    if(event.target.classList[0] != 'level'){
        return;
    }

    let l = event.target.classList
    console.log(l[1])

    if(l[1] == 'easy'){
        range = 255
    }
    else if(l[1] == 'normal'){
        range = 178
    }
    else if(l[1] == 'medium'){
        range = 127
    }
    else if(l[1] == 'hard'){
        range = 76
    }
    else if(l[1] == 'god-mode'){
        range = 26
    }

    startGame()
    actual_gameplay()
}