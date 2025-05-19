document.addEventListener('DOMContentLoaded', () => {
  const spaUser = localStorage.getItem("spaUser");
  if (!spaUser) {
    window.location.href = "index.html";
    return;
  }

  const currentUser = JSON.parse(spaUser);
  document.getElementById("userName").textContent = `Name: ${currentUser.name}`;
  document.getElementById("userEmail").textContent = `Email: ${currentUser.email}`;
  document.getElementById("name").value = currentUser.name;
  document.getElementById("email").value = currentUser.email;

  // Set minimum date to today
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split('T')[0];
  dateInput.min = today;

  const bookingForm = document.getElementById("bookingForm");
  const bookingTableBody = document.querySelector("#bookingTable tbody");

  const userKey = "bookings_" + currentUser.email;

  function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem(userKey)) || [];
    bookingTableBody.innerHTML = "";

    bookings.forEach((booking, index) => {
      const row = document.createElement("tr");

      const serviceCell = document.createElement("td");
      serviceCell.textContent = booking.service;
      row.appendChild(serviceCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = booking.date;
      row.appendChild(dateCell);

      const bookedOnCell = document.createElement("td");
      bookedOnCell.textContent = booking.bookedOn;
      row.appendChild(bookedOnCell);

      const actionCell = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => {
        bookings.splice(index, 1);
        localStorage.setItem(userKey, JSON.stringify(bookings));
        loadBookings();
      });
      actionCell.appendChild(deleteBtn);
      row.appendChild(actionCell);

      bookingTableBody.appendChild(row);
    });
  }

  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;

    if (!name || !email || !service || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const booking = {
      name,
      email,
      service,
      date,
      bookedOn: new Date().toLocaleString()
    };

    const bookings = JSON.parse(localStorage.getItem(userKey)) || [];
    bookings.unshift(booking);
    localStorage.setItem(userKey, JSON.stringify(bookings));

    loadBookings();
    bookingForm.reset();
    document.getElementById("name").value = currentUser.name;
    document.getElementById("email").value = currentUser.email;
    alert("Booking saved!");
  });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("spaUser");
    window.location.href = "index.html";
  });

  loadBookings();
});
