const API_URL = "http://localhost:5000/api/attendance";
let currentPage = 1;
let totalPages = 1;

// Fetch attendance records with pagination
async function fetchAttendance(page = 1) {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("User not authenticated");

    const response = await fetch(`${API_URL}?page=${page}&limit=3`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch attendance records");
    }

    const data = await response.json();
    displayAttendance(data.attendances);
    updatePagination(data.currentPage, data.totalPages);
    currentPage = data.currentPage;
    totalPages = data.totalPages;
  } catch (error) {
    console.error("Error fetching attendance:", error);
    alert(error.message);
  }
}

// Display attendance records
function displayAttendance(records) {
  const list = document.getElementById("records");
  list.innerHTML = "";
  records.forEach((record) => {
    const li = document.createElement("li");
    li.textContent = `${record.name} (Roll: ${record.roll}) - ${new Date(
      record.date
    ).toLocaleDateString()} - ${record.attendance ? "Present" : "Absent"}`;
    list.appendChild(li);
  });
}

// Update pagination controls
function updatePagination(currentPage, totalPages) {
  document.getElementById(
    "pageInfo"
  ).textContent = `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prevPage").disabled = currentPage <= 1;
  document.getElementById("nextPage").disabled = currentPage >= totalPages;
}

// Submit new attendance record
async function submitAttendance() {
  try {
    const token = localStorage.getItem("authToken");
    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const dateInput = document.getElementById("date").value;
    const attendance = document.getElementById("attendance").value === "true";

    // Validate date format
    const date = new Date(dateInput);
    if (!name || !roll || isNaN(date.getTime())) {
      alert("Please fill all fields with valid data");
      return;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        roll,
        date: date.toISOString(), // Convert date to ISO string
        attendance,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit attendance");
    }

    const data = await response.json();
    alert("Attendance submitted successfully");
    fetchAttendance(currentPage); // Refresh attendance list
  } catch (error) {
    console.error("Error submitting attendance:", error);
    alert(error.message);
  }
}

// Handle page navigation
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    fetchAttendance(currentPage - 1);
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage < totalPages) {
    fetchAttendance(currentPage + 1);
  }
});

document
  .getElementById("submitBtn")
  .addEventListener("click", submitAttendance);

// Check if user is authenticated and show/hide login/logout buttons
function checkAuthentication() {
  const token = localStorage.getItem("authToken");
  const loginLink = document.getElementById("loginLink");
  const signupLink = document.getElementById("signupLink");
  const logoutBtn = document.getElementById("logoutBtn");
  const attendanceForm = document.getElementById("attendance-form");
  const attendanceList = document.getElementById("attendance-list");

  if (token) {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutBtn.style.display = "block";
    attendanceForm.style.display = "block";
    attendanceList.style.display = "block";
    fetchAttendance(currentPage); // Fetch attendance records
  } else {
    loginLink.style.display = "block";
    signupLink.style.display = "block";
    logoutBtn.style.display = "none";
    attendanceForm.style.display = "none";
    attendanceList.style.display = "none";
  }
}

// Handle logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("authToken");
  checkAuthentication();
  window.location.href = "login.html";
});

// Initial authentication check
checkAuthentication();
