document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const questionSection = document.getElementById('question-section');
    const successSection = document.getElementById('success-section');


    // "No" button evades the user
    let scale = 1;
    function growYesButton() {
        scale += 0.1;
        yesBtn.style.transform = `scale(${scale})`;
    }
    
    // Using mouseover for desktop
    noBtn.addEventListener('mouseover', moveButton);
    noBtn.addEventListener('mouseover', growYesButton);
    
    // Using click/touchstart for mobile or persistent users
    noBtn.addEventListener('click', moveButton);
    noBtn.addEventListener('click', growYesButton);
    
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent click
        moveButton();
        growYesButton();
    });

    // Background Music
    const music = document.getElementById('bg-music');
    // Function to play music on first interaction
    const playMusic = () => {
        music.play().catch(error => {
            console.log("Autoplay prevented needs interaction", error);
        });
        // Remove listeners after first interaction
        document.removeEventListener('click', playMusic);
        document.removeEventListener('mousemove', playMusic);
        document.removeEventListener('touchstart', playMusic);
    };

    document.addEventListener('click', playMusic);
    document.removeEventListener('mousemove', playMusic); // Removed as mousemove often triggers before user intent
    document.addEventListener('click', playMusic);
    document.addEventListener('touchstart', playMusic);

    function moveButton() {
        const containerRect = questionSection.getBoundingClientRect();
        const btnWidth = noBtn.offsetWidth;
        const btnHeight = noBtn.offsetHeight;

        const margin = 20;

        const maxLeft = containerRect.width - btnWidth - margin;
        const maxTop = containerRect.height - btnHeight - margin;

        const randomLeft = Math.random() * maxLeft;
        const randomTop = Math.random() * maxTop;

        noBtn.style.position = "absolute";
        noBtn.style.left = randomLeft + "px";
        noBtn.style.top = randomTop + "px";
    }

    // "Yes" button triggers success
    yesBtn.addEventListener('click', () => {
        // Option 1: Hide question, show success (Simulating "Open other page")
        questionSection.classList.add('hidden');
        successSection.classList.remove('hidden');
        
        // Launch confetti or hearts
        createHearts();
    });

    // Background floating hearts effect
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 2 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 20 + 'px';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, 300);
    }
});
