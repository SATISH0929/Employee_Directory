function renderEmployees() {
  const container = document.getElementById("employeeList");
  container.innerHTML = "";

  employees.forEach(emp => {
    const card = document.createElement("div");
    card.className = "employee-card";
    card.innerHTML = `
      <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
      <p>Email: ${emp.email}</p>
      <p>Department: ${emp.department}</p>
      <p>Role: ${emp.role}</p>
      <button onclick="editEmployee(${emp.id})">Edit</button>
      <button onclick="deleteEmployee(${emp.id})">Delete</button>
    `;
    container.appendChild(card);
  });
}

function editEmployee(id) {
  window.location.href = `add-edit.html?id=${id}`;
}

function deleteEmployee(id) {
  if (confirm("Are you sure?")) {
    employees = employees.filter(emp => emp.id !== id);
    renderEmployees();
  }
}

document.getElementById("searchInput").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll(".employee-card").forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(query) ? "" : "none";
  });
});

document.getElementById("sortSelect").addEventListener("change", function (e) {
  const key = e.target.value;
  if (!key) return;
  employees.sort((a, b) => a[key].localeCompare(b[key]));
  renderEmployees();
});

renderEmployees();
