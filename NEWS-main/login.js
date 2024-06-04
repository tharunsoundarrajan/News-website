const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");
const signUpForm = document.querySelector(".sign-up-form");
const signUpButton = signUpForm.querySelector('input[type="submit"]');

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});
sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});
sign_up_btn2.addEventListener("click", () => {
   container.classList.add("sign-up-mode2");
});
sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});
signUpButton.addEventListener("click", (event) => {
    event.preventDefault(); 
    container.classList.add("sign-up-mode");

    // Submit the form programmatically
    signUpForm.submit();
});


    function checkDuplicate() {
        var username = document.getElementsByName("username")[0].value;
        var email = document.getElementsByName("email")[0].value;
        var password = document.getElementsByName("password")[0].value;

        // Perform an AJAX request to check for duplicate entries
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "check_duplicate.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (xhr.responseText === "duplicate") {
                    // Display a pop-up box or an alert here
                    alert("Duplicate entry! Please use a different username or email.");
                    return false; // Prevent form submission
                } else {
                    // Continue with form submission if no duplicate entry
                    return true;
                }
            }
        };

        // Send the data to the check_duplicate.php script
        xhr.send("username=" + username + "&email=" + email);

        // Prevent the form from submitting before AJAX response
        return false;
    }

