// Get DOM elements
const addEmployeeBtn = document.getElementById("add-employee-btn");
const popupForm = document.getElementById("popup-employee-form");
const employeeForm = document.getElementById("employee-form");
const employeeListEl = document.getElementById("employee-list");

let employeeList = [];

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
  e.preventDefault()
  const data = new FormData(popupForm);
  
  const employee = {
    firstName: data.get("first-name"),
    secondName: data.get("second-name"),
    post: data.get("post"),
    salary: data.get("salary"),
    phone: data.get("phone"),
    address: data.get("address"),
    photo: data.get("photo"),
  }
  
  employeeList.push(employee);
  renderEmployees();
  
  employeeForm.reset();
  popupForm.classList.remove("show");

});

// Remove popup form when pressed "Escape"
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    popupForm.classList.remove("Show");
  }
});


