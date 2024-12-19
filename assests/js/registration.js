document
  .getElementById("studentRegistrationForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const registrationNo = document.getElementById("registrationNo").value;
    const name = document.getElementById("name").value;
    const contact = document.getElementById("contact").value;
    const hostel = document.getElementById("hostel").value;
    const room = document.getElementById("roomNo").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const medicalCondition = document.getElementById("medicalCondition").value;
    const bloodGroup = document.getElementById("blood-group").value;
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value; // Capture gender

    // Debugging logs
    console.log("Registration No:", registrationNo);
    console.log("Name:", name);
    console.log("Gender:", gender);
    console.log("Password:", password);
    console.log("Hostel:", hostel);
    console.log("Room No:", room);
    console.log("Medical Condition:", medicalCondition);
    console.log("Blood Group:", bloodGroup);
    console.log("Contact:", contact);

    const errorMessageDiv = document.getElementById("error-message");

    // Validate password confirmation
    if (password !== confirmPassword) {
        errorMessageDiv.textContent = 'Passwords do not match.';
        return;
    }

    // Prepare data to be sent to the backend
    const registrationData = {
      registrationNo,
      name,
      gender,
      password,
      hostel,
      roomNo,
      medicalCondition,
      bloodGroup,
      contact, // Include contact in the data
    };

    // Send the data to the Node.js server
    try {
      const response = await fetch("/api/student_register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      // Handle response
      const result = await response.json();
      if (result.success) {
        // Registration successful
        alert("Registration successful!");
      } else {
        // Display error message from server
        errorMessageDiv.textContent =
          result.message || "Registration failed. Please try again.";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      errorMessageDiv.textContent =
        "An error occurred. Please try again later.";
    }
  });