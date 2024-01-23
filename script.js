document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementById("start-btn");
    let text = document.getElementById("text");
    let message = document.getElementById("message");
    let result = document.getElementById("result");
    let timerValue = document.querySelector(".timer-value");
    let startTime, endTime, timerInterval;
    let isTimerRunning = false;
  
    text.disabled = true;
  
    const SetofWords = [
      "Katoen Natie is an international logistics service provider and port operator. The company is present in 36 countries in five continents and employs about 13000 people worldwide. In 2009 the company had 154 logistics platforms. Its headquarters are located in Antwerp, Belgium. Katoen Natie offers integrated logistics solutions, including warehousing and storage, packing and repackaging, transport and distribution, value-added services, cleaning and repair, projects & process engineering and port operations. Each business unit has its own set of services.",
    ];
  
    const start = () => {
      if (isTimerRunning) return;
      isTimerRunning = true;
  
      let index = Math.floor(Math.random() * SetofWords.length);
      message.innerHTML = SetofWords[index];
      let date = new Date();
      startTime = date.getTime();
      text.focus();
  
      timerInterval = setInterval(() => {
        let currentDate = new Date();
        let elapsedTime = (currentDate.getTime() - startTime) / 1000;
        let remainingTime = 60 - elapsedTime;
  
        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          end();
        } else {
          timerValue.textContent = Math.ceil(remainingTime) + " seconds";
        }
      }, 1000);
    };
  
    const end = () => {
      clearInterval(timerInterval);
      isTimerRunning = false;
  
      let date = new Date();
      let endTime = date.getTime();
      let timeTaken = (endTime - startTime - 800) / 1000;
  
      let totalWords = message.innerText.split(" ").length;
      if (text.value.trim().length > 0) {
        var wordsCount = text.value.split(" ").length;
      } else {
        var wordsCount = 0;
      }
  
      let speed = Math.round((60 / timeTaken) * wordsCount);
      let correctWords = accuracy(text.value, message.innerText);
  
      localStorage.setItem("WordsPerMinute", speed);
      localStorage.setItem("WordsTyped", wordsCount);
      localStorage.setItem("CorrectWords", correctWords);
      localStorage.setItem("Accuracy", Math.round((correctWords / wordsCount) * 100));
  
      window.location.href = "https://impanda9.github.io/results/";
    };
  
    const accuracy = (str1, str2) => {
      str1 = str1.trim();
      str2 = str2.trim();
      let count = 0;
      let words1 = str1.split(" ");
      let words2 = str2.split(" ");
  
      words1.forEach((word, index) => {
        if (word === words2[index]) {
          count++;
        }
      });
  
      return count;
    };
  
    button.onclick = function () {
      if (!isTimerRunning) {
        text.value = "";
        text.disabled = false;
        button.style.display = "none";
        start();
      } else {
        clearInterval(timerInterval);
        isTimerRunning = false;
        text.value = "";
        button.innerHTML = "Start";
      }
    };
  
    text.addEventListener("keyup", function (event) {
      if (event.keyCode === 32 && !isTimerRunning) {
        start();
      }
    });
  });
  
