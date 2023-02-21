(function(){
    var hour = document.querySelector(".hour");
    var min = document.querySelector(".minute");
    var sec = document.querySelector(".sec");
    var startBtn = document.querySelector(".start");
    var stopBtn = document.querySelector(".stop");
    var resetBtn = document.querySelector(".reset");

    var countdownTimer = null;


    // Start Timer Button - Start
    startBtn.addEventListener("click", function() {
        if (hour.value == 0 && min.value == 0 && sec.value == 0) return;

        function startInterval(){
            startBtn.style.display = "none";
            stopBtn.style.display = "initial";

            countdownTimer = setInterval(function(){
                timer();
            }, 1000)
        }
        startInterval();
    });
    // Start Timer Button - End
    function timer(){
        // Formatting the Time - Start
        if(sec.value > 60){
            min.value++;
            sec.value = parseInt(sec.value) - 59;
        }
        if(min.value > 60){
            hour.value++;
            hour.value = parseInt(min.value) - 59; 
        }
        // Formatting the Time - End
        // Updating the Time - Start
        if(hour.value == 0 && min.value == 0 && sec.value ==0){
            hour.value = "";
            min.value = "";
            sec.value = "";
            stopInterval();
        } else if(sec.value != 0){
            sec.value = `${sec.value <= 10 ? "0" : ""}${sec.value-1}`;
        } else if(min.value != 0 && sec.value == 0){
            sec.value = 59;
            min.value = `${min.value <=10 ? "" : "" }${min.value-1}`
        } else if (hour.value != 0 && min.value == 0){
            min.value = 60;
            hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value-1}`
        }
        return;
        // Updating the Time - End
    }


    // Stop Interval Logic - Start
    function stopInterval(state){
        startBtn.innerHTML = state === "pause" ? " Continue" : "Start";
        stopBtn.style.display = "none";
        startBtn.style.display = "initial";
        clearInterval(countdownTimer);
    }
    // Stop Interval Logic - End

    // Stop Timer Button - Start
    stopBtn.addEventListener("click", function(){
        stopInterval("pause");
    })
    // Stop Timer Button - End

    // Reset Timer Button - Start
    resetBtn.addEventListener("click", function(){
        hour.value = "";
        min.value = "";
        sec.value = "";

        stopInterval();
    });
    // Reset Timer Button - End

})();;
