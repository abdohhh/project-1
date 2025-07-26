document.addEventListener("DOMContentLoaded", function () {
  const fields = ["name", "email", "password", "confirmPassword"];

  fields.forEach((fieldId) => {
    const input = document.getElementById(fieldId);
    input.addEventListener("blur", () => validateField(fieldId));
  });
});

function validateField(fieldId) {
  const input = document.getElementById(fieldId);
  const value = input.value;
  const errorEl = document.getElementById(fieldId + "Error");

  errorEl.textContent = "";

  if (fieldId === "name") {
    if (value.trim() === "") {
      errorEl.textContent = "Name is required.";
    }
  }

  if (fieldId === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      errorEl.textContent = "Invalid email format.";
    }
  }

  if (fieldId === "password") {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(value)) {
      errorEl.textContent = "Password must be at least 6 characters and contain letters and numbers.";
    }
  }

  if (fieldId === "confirmPassword") {
    const passwordValue = document.getElementById("password").value;
    if (value !== passwordValue) {
      errorEl.textContent = "Passwords do not match.";
    }
  }
}

function validateForm() {
  const fields = ["name", "email", "password", "confirmPassword"];
  let isValid = true;

  fields.forEach((fieldId) => {
    validateField(fieldId);
    const errorEl = document.getElementById(fieldId + "Error");
    if (errorEl.textContent !== "") {
      isValid = false;
    }
  });

  if (isValid) {
    window.location.href = "view"; 
  }

  return isValid; 
}
