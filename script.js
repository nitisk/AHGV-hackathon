const video = document.getElementById("lectureVideo");

const timestamp = document.getElementById("timestamp");

const chatMessages = document.getElementById("chatMessages");

const userInput = document.getElementById("userInput");

const sendButton = document.getElementById("sendButton");


// -------------------------
// VIDEO TIMESTAMP
// -------------------------

video.addEventListener("timeupdate", () => {

    const seconds = Math.floor(video.currentTime);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    timestamp.textContent =
        `${minutes.toString().padStart(2, "0")}:` +
        `${remainingSeconds.toString().padStart(2, "0")}`;

});


// -------------------------
// ADD MESSAGE TO CHAT
// -------------------------

function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add("message");

    if (type === "user") {

        message.classList.add("user-message");

    } else {

        message.classList.add("ai-message");

    }

    message.innerHTML = `<p>${text}</p>`;

    chatMessages.appendChild(message);

    // Automatically scroll to latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


// -------------------------
// SEND MESSAGE
// -------------------------

function sendMessage() {

    const question = userInput.value.trim();

    // Don't send empty messages
    if (question === "") {
        return;
    }


    // Show user's message
    addMessage(question, "user");


    // Clear input
    userInput.value = "";


    // Get current video timestamp
    const currentTime = video.currentTime;


    console.log("Question:", question);

    console.log("Video timestamp:", currentTime);


    // Dummy AI response
    setTimeout(() => {

        addMessage(
            `This is a dummy AI response.<br><br>
             Later, I will use the lecture content around
             <strong>${formatTime(currentTime)}</strong>
             to answer your question.`,
            "ai"
        );

    }, 700);
}


// -------------------------
// FORMAT TIME
// -------------------------

function formatTime(seconds) {

    seconds = Math.floor(seconds);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:` +
           `${remainingSeconds.toString().padStart(2, "0")}`;
}


// -------------------------
// BUTTON
// -------------------------

sendButton.addEventListener("click", sendMessage);


// -------------------------
// ENTER KEY
// -------------------------

userInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        sendMessage();

    }

});