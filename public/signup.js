const API_URL = "http://localhost:5000/api/auth/register";

document.getElementById("signupBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Sign up failed");
    }

    alert("Sign up successful, please log in.");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error signing up:", error);
    alert(error.message);
  }
});
