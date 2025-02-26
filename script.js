
document.addEventListener("DOMContentLoaded", function () {
    const inputBox = document.getElementById("inputBox");
    const buttons = document.querySelectorAll(".button");

    buttons.forEach(button =>
        button.addEventListener("click", () =>
            button.textContent.trim() === "=" ? calculateResult() : handleInput(button.textContent.trim())
        )
    );

    document.addEventListener("keydown", (event) => {
        const keyMap = { Enter: "=", Backspace: "DEL", Escape: "AC", "*": "X" };
        const key = keyMap[event.key] || event.key;

        if (key === "=") {
            if (inputBox.value.trim() !== "") calculateResult();
        } else {
            handleInput(key);
        }
    });

    function handleInput(input) {
        if (input === "AC") {
            inputBox.value = "";
        } else if (input === "DEL") {
            inputBox.value = inputBox.value.slice(0, -1);
        } else if (input === "%") {
            inputBox.value = inputBox.value ? parseFloat(inputBox.value) / 100 : "";
        } else if (/[\d+\-*/X.]/.test(input)) {
            inputBox.value += input === "X" ? "*" : input;
        }
    }

    function calculateResult() {
        try {
            const expression = inputBox.value.replace(/X/g, "*"); 

            if (/\/0(?!\d)/.test(expression)) {
                alert("Tidak bisa membagi dengan 0!");
                inputBox.value = "Error";
                return;
            }

            const result = new Function(`return ${expression}`)();
            inputBox.value = isFinite(result) ? result : "Error";
        } catch {
            inputBox.value = "Error";
        }
    }
});
