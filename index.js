// Get DOM elements
const addEmployeeBtn = document.getElementById("add-employee-btn");
const popupForm = document.getElementById("popup-employee-form");
const employeeForm = document.getElementById("employee-form");
const employeeListEl = document.getElementById("employee-list");
const noEmployeeMsgEls = document.getElementsByClassName("no-employee-msg");
const clearEmployeesBtn = document.getElementById("clear-employees-btn");
const employeePreviewContainer = document.getElementById(
  "employee-preview-container"
);
const employeePreview = document.getElementById("employee-preview");
const deleteEmployeeBtn = document.getElementById("delete-employee-btn");

// Clear employees when Clear Employees button is clicked
clearEmployeesBtn.addEventListener("click", clearEmployees);

let employeeList = JSON.parse(localStorage.getItem("employees")) || [];
let selectedEmployeeIndex = null;

renderEmployees();
updatePreviewDisplay();

if (employeeList.length > 0) {
  for (let el of noEmployeeMsgEls) {
    el.style.display = "none";
  }
}

// Delete employee button click handler
deleteEmployeeBtn.addEventListener("click", deleteSelectedEmployee);

// Show popup form when Add Employee button is clicked
addEmployeeBtn.addEventListener("click", () => {
  popupForm.classList.add("show");
});

// Remove popup form when clicked outside of it.
popupForm.addEventListener("click", (e) => {
  if (e.target === popupForm) {
    popupForm.classList.remove("show");
  }
});

employeeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(employeeForm);
  const photoFile = data.get("photo");

  // Convert photo to data URL if provided
  if (photoFile && photoFile.size > 0) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const employee = {
        firstName: data.get("first-name"),
        secondName: data.get("second-name"),
        post: data.get("post"),
        salary: data.get("salary"),
        phone: data.get("phone"),
        address: data.get("address"),
        photo: event.target.result, // Store as data URL
      };

      employeeList.push(employee);
      localStorage.setItem("employees", JSON.stringify(employeeList));

      renderEmployees();

      employeeForm.reset();
      popupForm.classList.remove("show");

      // Hide "No employees yet" messages
      for (let el of noEmployeeMsgEls) {
        el.style.display = "none";
      }
    };
    reader.readAsDataURL(photoFile);
  } else {
    const employee = {
      firstName: data.get("first-name"),
      secondName: data.get("second-name"),
      post: data.get("post"),
      salary: data.get("salary"),
      phone: data.get("phone"),
      address: data.get("address"),
      photo: "", // No photo provided
    };

    employeeList.push(employee);
    localStorage.setItem("employees", JSON.stringify(employeeList));

    renderEmployees();

    employeeForm.reset();
    popupForm.classList.remove("show");

    // Hide "No employees yet" messages
    for (let el of noEmployeeMsgEls) {
      el.style.display = "none";
    }
  }
});

// Remove popup form when pressed "Escape"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popupForm.classList.remove("show");
  }
});

function displayEmployeePreview(index) {
  if (index < 0 || index >= employeeList.length) return;

  const employee = employeeList[index];

  // Populate preview fields
  document.getElementById(
    "employee-fullname"
  ).textContent = `${employee.firstName} ${employee.secondName}`;
  document.getElementById(
    "employee-post"
  ).textContent = `Position: ${employee.post}`;
  document.getElementById(
    "employee-address"
  ).textContent = `Address: ${employee.address}`;
  document.getElementById(
    "employee-phone"
  ).textContent = `Phone: ${employee.phone}`;
  document.getElementById(
    "employee-salary"
  ).textContent = `Salary: $${employee.salary}`;

  // Set photo
  const photoEl = document.getElementById("employee-photo");
  if (employee.photo) {
    photoEl.src = employee.photo;
    photoEl.style.display = "block";
  } else {
    photoEl.style.display = "none";
  }

  // Show preview section
  employeePreview.style.display = "block";
}

function updatePreviewDisplay() {
  const noEmployeeMsg =
    employeePreviewContainer.querySelector(".no-employee-msg");

  if (employeeList.length === 0) {
    // No employees at all
    employeePreview.style.display = "none";
    noEmployeeMsg.textContent = "No employees yet.";
    noEmployeeMsg.style.display = "block";
  } else if (selectedEmployeeIndex === null) {
    // Employees exist but none selected
    employeePreview.style.display = "none";
    noEmployeeMsg.textContent = "Select an employee for preview.";
    noEmployeeMsg.style.display = "block";
  } else {
    // Employee selected
    noEmployeeMsg.style.display = "none";
  }
}

function deleteSelectedEmployee() {
  if (
    selectedEmployeeIndex !== null &&
    selectedEmployeeIndex < employeeList.length
  ) {
    employeeList.splice(selectedEmployeeIndex, 1);
    localStorage.setItem("employees", JSON.stringify(employeeList));

    selectedEmployeeIndex = null;

    if (employeeList.length === 0) {
      for (let el of noEmployeeMsgEls) {
        el.style.display = "block";
      }
    }

    renderEmployees();
    updatePreviewDisplay();
  }
}

function renderEmployees() {
  employeeListEl.innerHTML = "";
  employeeList.forEach((employee, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${employee.firstName} ${employee.secondName} <br> ${employee.post}`;
    li.setAttribute("data-index", index);

    // Add active class if this employee is selected
    if (selectedEmployeeIndex === index) {
      li.classList.add("active");
    }

    // Add click handler to display preview
    li.addEventListener("click", () => {
      selectedEmployeeIndex = index;
      renderEmployees(); // Re-render to update active class
      displayEmployeePreview(index);
    });

    employeeListEl.appendChild(li);
  });
}

function clearEmployees() {
  employeeList = [];
  localStorage.removeItem("employees");
  selectedEmployeeIndex = null;
  renderEmployees();
  updatePreviewDisplay();
  for (let el of noEmployeeMsgEls) {
    el.style.display = "block";
  }
}
