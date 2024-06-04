<?php
include("db.php"); // Include the database connection file

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["username"]) && isset($_POST["email"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];

    // Check for duplicate entries
    $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
    
    // Prepare and bind the SQL statement to prevent SQL injection
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $email);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "duplicate"; // Return "duplicate" if duplicate entries are found
    } else {
        echo "not_duplicate"; // Return "not_duplicate" if no duplicates are found
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
}
?>
