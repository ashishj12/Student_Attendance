const API_URL = "http://localhost:5000/api/attendance";
let currentPage = 1;
let totalPages = 1;

// Fetch attendance records with pagination
async function fetchAttendance(page = 1) {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=3`);
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
  const name = document.getElementById("name").value;
  const roll = document.getElementById("roll").value;
  const date = document.getElementById("date").value;
  const attendance = document.getElementById("attendance").value === "true";

  if (!name || !roll || !date) {
    alert("Please fill all fields");
    return;
  }

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  const data = { name, roll, date: formattedDate, attendance };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save attendance record");
    }

    // Clear form fields
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("date").value = "";
    document.getElementById("attendance").value = "true";

    // Refresh the attendance list
    await fetchAttendance(currentPage);

    alert("Attendance record saved successfully");
  } catch (error) {
    console.error("Error submitting attendance:", error);
    alert(error.message);
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.getElementById("submitBtn");
  const prevPageButton = document.getElementById("prevPage");
  const nextPageButton = document.getElementById("nextPage");

  submitButton.addEventListener("click", submitAttendance);
  prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
      fetchAttendance(currentPage - 1);
    }
  });
  nextPageButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      fetchAttendance(currentPage + 1);
    }
  });

  // Initial load of attendance records
  fetchAttendance();
});
