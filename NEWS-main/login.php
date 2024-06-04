<?php
session_start(); // Start the session
include("db.php");

// Check if the form has been submitted
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["email"]) && isset($_POST["password"])) {
    // Get the submitted email and password
    $submittedEmail = $_POST["email"];
    $submittedPassword = $_POST["password"];

    // Replace these with your actual email and password validation logic
    $sql = "SELECT password FROM users WHERE email = ?";

    // Prepare and bind the SQL statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $submittedEmail);

    // Execute the query
    $stmt->execute();

    // Bind the result to a variable
    $stmt->bind_result($hashedPassword);

    // Fetch the result
    $stmt->fetch();

    // Close the prepared statement
    $stmt->close();

    // Verify the submitted password against the stored hashed password
    if (password_verify($submittedPassword, $hashedPassword)) {
        // Password is correct, login successful
        $_SESSION['email'] = $submittedEmail; // Store the email in a session variable
        header("Location:work.html");
        exit;
    } else {
        // Login failed, display an error message
        echo "Login failed. Please try again.";
    }

    // Close the database connection
    $conn->close();
} else {
    // Handle cases where the form was not submitted properly
    echo "Invalid request.";
}
?>
