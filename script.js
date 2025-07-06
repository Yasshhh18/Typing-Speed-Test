document.addEventListener("DOMContentLoaded", () => {
    const typingTest = document.querySelector('.typing-text p');
    const input = document.querySelector('.wrapper .input-field');
    const time = document.querySelector('.time span b');
    const mistakes = document.querySelector('.mistakes span');
    const wpm = document.querySelector('.wpm span');
    const cpm = document.querySelector('.cpm span');
    const btn = document.querySelector('button');

    //set value
    let timer;
    let maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let  mistake = 0;
    let isTyping = false;

    function loadParagraph() {
        const paragraph = [
            "The sun set behind the hills, casting a golden glow on the trees.",
            "A cat slept peacefully on the windowsill, dreaming of birds.",
            "Raindrops tapped gently on the glass, filling the room with calm.",
            "She opened the book and got lost in a world of magic and dragons.",
            "A warm breeze carried the scent of blooming jasmine through the air.",
            "The street was quiet, except for the distant sound of a train horn.",
            "He took a deep breath and stepped onto the stage with confidence.",
            "The old clock ticked steadily, marking the passage of time.",
            "A paper plane soared across the classroom, landing near the board.",
            "Stars twinkled above as the campfire crackled and popped."
        ];

        const randomIndex = Math.floor(Math.random() * paragraph.length);
        typingTest.innerHTML = '';

        for (const char of paragraph[randomIndex]) {
            console.log(char); // You can later add span logic here
            typingTest.innerHTML += `<span>${char}</span>`;
        }
        typingTest.querySelectorAll('span')[0].
        classList.add('active');
        document.addEventListener('keydown',()=>input.focus());
        typingTest.addEventListener('click',()=>{
            input.focus()})
    }
     
    //handle user input 
    function initTyping(){
      const char = typingTest.querySelectorAll('span');
      const typedChar = input.value.charAt(charIndex);
      if (charIndex < char.length  && timeLeft > 0) {


        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping=true;
        }
    if (char[charIndex].innerText === typedChar) {
        char[charIndex].classList.add('correct');
        console.log('correct');
    } else {
      mistake++;
        char[charIndex].classList.add('incorrect');
        console.log('incorrect');
    }
    charIndex++;
    char[charIndex].classList.add('active');
        
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
}
    else{
        clearInterval(timer);
        input.value ='';
    }
}

// Move initTime outside of initTyping
function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerHTML = timeLeft;
        // Fix WPM calculation: add division operator
        const wpmval = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60) || 0;
        wpm.innerText = wpmval;
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}

    function reset(){
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        time.innerText = timeLeft;
        input.value = '';
        charIndex = 0;
        mistake = 0 ;
        isTyping = false;
        wpm.innerText = 0;
        cpm.innerText = 0 ;
        mistake.innerText = 0;
    }
input.addEventListener("input",initTyping);
btn.addEventListener('click',reset);
loadParagraph();
});
