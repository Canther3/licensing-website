document.addEventListener("DOMContentLoaded", () => {
    const loginScreen = document.getElementById("loginScreen");
    const warningScreen = document.getElementById("warningScreen");
    const countdownScreen = document.getElementById("countdownScreen");
    const countdownText = document.getElementById("countdown");
    const videoPlayer = document.getElementById("videoPlayer");
    const submitButton = document.getElementById("submitButton");
    const codeInput = document.getElementById("codeInput");
    const startButton = document.getElementById("startButton");

    submitButton.addEventListener("click", async () => {
        const enteredCode = codeInput.value.trim().toUpperCase();

        try {
            const response = await fetch('/verify-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: enteredCode })
            });

            const result = await response.json();
            if (result.success) {
                loginScreen.classList.add("hidden");
                warningScreen.classList.remove("hidden");
            } else {
                alert(result.message);
            }
        } catch (error) {
            alert("Bir hata oluştu, lütfen tekrar deneyin!");
        }
    });

    startButton.addEventListener("click", () => {
        warningScreen.classList.add("hidden");
        countdownScreen.classList.remove("hidden");

        let countdown = 5;
        const interval = setInterval(() => {
            countdown -= 1;
            countdownText.textContent = countdown;

            if (countdown === 0) {
                clearInterval(interval);
                countdownScreen.classList.add("hidden");
                videoPlayer.classList.remove("hidden");
                videoPlayer.play();
            }
        }, 1000);
    });

    videoPlayer.addEventListener("timeupdate", () => {
        if (videoPlayer.currentTime > 0 && !videoPlayer.paused) {
            videoPlayer.controls = false;
        }
    });
});
