// Initialize users array
let users = [];

// Load users from localStorage if available
if (localStorage.getItem("users")) {
  users = JSON.parse(localStorage.getItem("users"));
}

// Save users to localStorage
function saveUsers() {
  localStorage.setItem("users", JSON.stringify(users));
}

// ✅ FIXED: Correct email validation regex
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate password strength (minimum 6 characters)
function isValidPassword(password) {
  return password.length >= 6;
}

// Register a new user
function register() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPassword").value;

  const message = document.getElementById("registerMessage");
  message.style.color = "red";

  // Check for empty fields
  if (!name || !email || !password) {
    message.innerText = "Please fill out all fields.";
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    message.innerText = "Please enter a valid email address.";
    return;
  }

  // Validate password strength
  if (!isValidPassword(password)) {
    message.innerText = "Password must be at least 6 characters long.";
    return;
  }

  // Check if email already exists
  if (users.find((user) => user.email === email)) {
    message.innerText = "Email already exists.";
    return;
  }

  // Add new user and save
  users.push({ name, email, password });
  saveUsers();

  message.style.color = "green";
  message.innerText = "Account created! You can now log in.";
}

// Log in an existing user
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  const message = document.getElementById("loginMessage");
  message.style.color = "red";

  // Check for empty fields
  if (!email || !password) {
    message.innerText = "Please enter both email and password.";
    return;
  }

  // ✅ Reload users from localStorage in case it was updated elsewhere
  const currentUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = currentUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    localStorage.setItem("spaUser", JSON.stringify(user));
    message.style.color = "green";
    message.innerText = "Login successful. Redirecting...";

    setTimeout(() => {
      window.location.href = "booking.html";
    }, 1000);
  } else {
    message.innerText = "Invalid email or password.";
  }
}

// Retrieve forgotten password
function forgotPassword() {
  const email = document.getElementById("forgotEmail").value.trim();
  const message = document.getElementById("forgotMessage");
  message.style.color = "red";

  if (!email) {
    message.innerText = "Please enter your email address.";
    return;
  }

  if (!isValidEmail(email)) {
    message.innerText = "Please enter a valid email address.";
    return;
  }

  const currentUsers = JSON.parse(localStorage.getItem("users")) || [];

  const user = currentUsers.find((u) => u.email === email);

  if (user) {
    message.style.color = "green";
    message.innerText = `Your password is: ${user.password}`;
  } else {
    message.innerText = "Email not found.";
  }
}
