<?php
include("db.php"); // Include the database connection file

$error_message = ""; // Initialize the error message

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"]) && isset($_POST["email"]) && isset($_POST["password"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    
    // Validate the email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error_message = "Invalid email address.";
    } else {
        // Hash the password (You should use a stronger hashing mechanism)
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // SQL query to insert user data into the "users" table
        $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        
        // Prepare and bind the SQL statement to prevent SQL injection
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $username, $email, $hashedPassword);
        
        if ($stmt->execute()) {
            echo "User registration successful!";
        } else {
            // Check if the error message contains "Duplicate entry"
            if (strpos($stmt->error, "Duplicate entry") !== false) {
                $error_message = "Duplicate entry. This email or username is already registered.";
            } else {
                $error_message = "Error: " . $sql . "<br>" . $stmt->error;
            }
        }
        
        // Close the prepared statement and database connection
        $stmt->close();
    }
    
    // Close the database connection
    $conn->close();
}
?>
