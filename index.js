// Get DOM elements
const addEmployeeBtn = document.getElementById("add-employee-btn");
const popupForm = document.getElementById("popup-employee-form");
const employeeForm = document.getElementById("employee-form");

// Show popup form when Add Employee button is clicked
addEmployeeBtn.addEventListener("click", () => {
  popupForm.classList.add("show");
});

// Close popup form when clicking outside the form
popupForm.addEventListener("click", (e) => {
  if (e.target === popupForm) {
    popupForm.classList.remove("show");
  }
});

// Close popup form when form is submitted
employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add your form submission logic here
  popupForm.classList.remove("show");
  employeeForm.reset();
});

// Optional: Close popup with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popupForm.classList.remove("show");
  }
});
