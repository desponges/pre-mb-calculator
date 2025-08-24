document.addEventListener("DOMContentLoaded", () => {

    function displayAlert(form, message) {
        let alert = form.querySelector(".alert");
        if (!alert) {
            alert = document.createElement("div");
            alert.className = "alert";
            alert.style.color = "red";
            alert.style.marginBottom = "10px";
            form.insertBefore(alert, form.querySelector("button"));
        }
        alert.textContent = message;
    }

    function clearAlert(form) {
        const alert = form.querySelector(".alert");
        if (alert) {
            alert.remove();
        }
    }

    function displayResult(form, score) {
        clearAlert(form); // Clear any existing alert
        let result = form.querySelector(".result");
        if (!result) {
            result = document.createElement("div");
            result.className = "result";
            result.style.marginTop = "10px";
            form.appendChild(result);
        }

        if (score > 70) {
            result.textContent = `Your Pre-MB Score is ${score.toFixed(2)}. Dear Scholar, you are in a safe zone but don't relax yet. You need ${100 - score.toFixed(2)} to pass.`;
            result.style.color = "purple";
        } else if (score >= 50) {
            result.textContent = `Your Pre-MB Score is ${score.toFixed(2)}. You are likely to pass. You need ${100 - score.toFixed(2)} to pass. Keep pushing!`;
            result.style.color = "green";
        } else {
            result.textContent = `Your Pre-MB Score is ${score.toFixed(2)}. You can still make it. Don't give up! You need ${100 - score.toFixed(2)} to pass. Work harder!`;
            result.style.color = "red";
        }
    }

    function validateInputs(form, inputs) {
        for (const input of inputs) {
            const value = parseFloat(input.value);
            if (isNaN(value)) {
                displayAlert(form, "Please fill in all fields with valid numbers.");
                return false;
            }
            if (value < 0 || value > 100) {
                displayAlert(form, "Scores must be between 0 and 100.");
                return false;
            }
        }
        clearAlert(form); // Clear alert if validation passes
        return true;
    }

    // Physiology/BCM Calculation
    const phybcmForm = document.querySelector(".phybcm form");
    phybcmForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = phybcmForm.querySelectorAll("input[type='text']");
        if (!validateInputs(phybcmForm, inputs)) return;

        const comprehensive = parseFloat(phybcmForm.querySelector("#phy-comprehensive").value);
        const gitUgsEndo = parseFloat(phybcmForm.querySelector("#phy-git-ugs-endo").value);
        const neuro = parseFloat(phybcmForm.querySelector("#phy-neuro").value);

        const prembScore = (0.5 * comprehensive) + (0.25 * gitUgsEndo) + (0.25 * neuro);

        displayResult(phybcmForm, prembScore);
    });

    // Anatomy Calculation
    const anatomyForm = document.querySelector(".anatomy form");
    anatomyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputs = anatomyForm.querySelectorAll("input[type='text']");
        if (!validateInputs(anatomyForm, inputs)) return;

        const comprehensive = parseFloat(anatomyForm.querySelector("#ana-comprehensive").value);
        const gitUgsEndo = parseFloat(anatomyForm.querySelector("#ana-git-ugs-endo").value);
        const extremities = parseFloat(anatomyForm.querySelector("#ana-extremities").value);
        const neuro = parseFloat(anatomyForm.querySelector("#ana-neuro").value);
        const headAndNeck = parseFloat(anatomyForm.querySelector("#ana-head-neck").value);

        const prembScore = (0.5 * comprehensive) + (0.1666 * gitUgsEndo) + (0.0833 * extremities) + (0.1666 * neuro) + (0.0833 * headAndNeck);

        displayResult(anatomyForm, prembScore);
    });
});