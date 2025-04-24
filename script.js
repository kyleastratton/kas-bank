// DOM elements
const loginScreen = document.getElementById("loginScreen");
const bankingInterface = document.getElementById("bankingInterface");
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");
const currentAccount = document.getElementById("currentAccount");
const transactionsCard = document.getElementById("transactionsCard");
const backToAccounts = document.getElementById("backToAccounts");
const payBtn = document.getElementById("payBtn");
const paymentModal = document.getElementById("paymentModal");
const closePaymentModal = document.getElementById("closePaymentModal");
const cancelPayment = document.getElementById("cancelPayment");
const paymentForm = document.getElementById("paymentForm");
const notification = document.getElementById("notification");
const userName = document.getElementById("userName");

// Show the login screen by default
loginScreen.style.display = "flex";
bankingInterface.style.display = "none";

// Handle login
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Mock login - in a real app would validate credentials
  loginScreen.style.display = "none";
  bankingInterface.style.display = "block";

  // Set user name - would normally come from server
  const usernameInput = document.getElementById("username").value;
  if (usernameInput) {
    const capitalizedName =
      usernameInput.charAt(0).toUpperCase() + usernameInput.slice(1);
    userName.textContent = capitalizedName;
  }
});

// Handle logout
logoutBtn.addEventListener("click", function () {
  loginScreen.style.display = "flex";
  bankingInterface.style.display = "none";
  // Clear login fields
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

// Show transactions when clicking on current account
currentAccount.addEventListener("click", function () {
  document.querySelector(".main-content > .card").style.display = "none";
  transactionsCard.style.display = "block";
});

// Go back to accounts view
backToAccounts.addEventListener("click", function () {
  transactionsCard.style.display = "none";
  document.querySelector(".main-content > .card").style.display = "block";
});

// Open payment modal
payBtn.addEventListener("click", function () {
  paymentModal.style.display = "flex";
});

// Close payment modal
function closeModal() {
  paymentModal.style.display = "none";
}

closePaymentModal.addEventListener("click", closeModal);
cancelPayment.addEventListener("click", closeModal);

// Handle payment form submission
paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values - would normally be validated and processed
  const payeeName = document.getElementById("payeeName").value;
  const amount = document.getElementById("amount").value;

  if (!payeeName || !amount) {
    showNotification("Please fill all required fields.", "error");
    return;
  }

  // Close modal
  closeModal();

  // Show success notification
  showNotification(
    "Payment to " + payeeName + " has been sent successfully!",
    "success"
  );

  // Reset form
  paymentForm.reset();

  // In a real app, you would update account balances here
  setTimeout(updateBalances, 1000);
});

// Show notification
function showNotification(message, type = "success") {
  // Update notification content
  const notificationEl = document.getElementById("notification");
  const notificationIcon = notificationEl.querySelector(".notification-icon i");
  const notificationMessage = notificationEl.querySelector(
    ".notification-message"
  );

  // Set the message
  notificationMessage.textContent = message;

  // Update classes based on type
  notificationEl.className = "notification";
  if (type === "success") {
    notificationEl.classList.add("notification-success");
    notificationIcon.className = "fas fa-check-circle";
  } else {
    notificationEl.classList.add("notification-error");
    notificationIcon.className = "fas fa-exclamation-circle";
  }

  // Show notification
  notificationEl.classList.add("show");

  // Hide after 4 seconds
  setTimeout(function () {
    notificationEl.classList.remove("show");
  }, 4000);
}

// Mock function to update balances after a payment
function updateBalances() {
  // This would normally fetch updated balances from a server
  // For demo purposes, we'll just decrease the current account balance

  const currentAccountBalance = document.querySelector(
    "#currentAccount .account-balance"
  );
  const currentBalance = parseFloat(
    currentAccountBalance.textContent.replace("£", "").replace(",", "")
  );

  // Calculate a random amount between £10 and £100 to deduct
  const paymentAmount = parseFloat(
    document.getElementById("amount").value || "50"
  );

  const newBalance = (currentBalance - paymentAmount).toFixed(2);
  currentAccountBalance.textContent = "£" + formatNumber(newBalance);
}

// Format number with commas for thousands
function formatNumber(num) {
  return parseFloat(num).toLocaleString("en-UK", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Add tooltips to the chart bars to show exact values
const chartBars = document.querySelectorAll(".chart-bar");
chartBars.forEach((bar) => {
  const height = parseFloat(bar.style.height);
  const spending = Math.round(height * 10); // Just a mock calculation

  bar.setAttribute("title", `£${spending}`);

  // Animate chart bars on load
  setTimeout(() => {
    const originalHeight = bar.style.height;
    bar.style.height = "0%";

    setTimeout(() => {
      bar.style.height = originalHeight;
    }, 300);
  }, 200);
});

// Format all currency amounts on page load
document.addEventListener("DOMContentLoaded", function () {
  const allAmounts = document.querySelectorAll(
    ".account-balance, .transaction-amount, .standing-order-amount"
  );

  allAmounts.forEach((element) => {
    const value = element.textContent;
    if (value.startsWith("£")) {
      const numericValue = parseFloat(value.replace("£", "").replace(",", ""));
      element.textContent = "£" + formatNumber(numericValue);
    }
  });

  // Simulate network delay for demo purposes
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 500);
});

// Quick actions animation
const quickActions = document.querySelectorAll(".quick-action");
quickActions.forEach((action) => {
  action.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
      showNotification("This feature is not implemented in the demo.");
    }, 150);
  });
});

// Mock API call simulation - would be replaced with actual API calls
function mockApiCall(endpoint, data = null) {
  return new Promise((resolve, reject) => {
    console.log(`Mock API call to ${endpoint}`, data);

    // Simulate network delay
    setTimeout(() => {
      // 90% chance of success
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          data: {
            timestamp: new Date().toISOString(),
            message: "Operation completed successfully",
          },
        });
      } else {
        reject({
          success: false,
          error: "Network error. Please try again.",
        });
      }
    }, 1500);
  });
}

// Example usage of mock API
// Would be called in real implementations
async function performApiOperation(action, data) {
  try {
    const response = await mockApiCall(`/api/${action}`, data);
    console.log("API response:", response);
    return response;
  } catch (error) {
    console.error("API error:", error);
    showNotification(error.error || "An unexpected error occurred.", "error");
    throw error;
  }
}
