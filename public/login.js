const API_URL = "http://localhost:5000/api/auth/login";

document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const { token } = await response.json();
    localStorage.setItem("authToken", token);

    // Redirect to main page
    window.location.href = "index.html";
  } catch (error) {
    console.error("Error logging in:", error);
    alert(error.message);
  }
});
