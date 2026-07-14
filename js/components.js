// Shared UI Components

export function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  el.setAttribute("role", "alert");
  container.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.3s";
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

export function showModal({ title, bodyHtml, confirmText = "Confirm", onConfirm }) {
  const overlay = document.getElementById("modalOverlay");
  overlay.querySelector("h3").textContent = title;
  overlay.querySelector("#modalBody").innerHTML = bodyHtml;
  overlay.querySelector("#modalStatus").innerHTML = "";
  const confirmBtn = overlay.querySelector("#modalConfirmBtn");
  confirmBtn.textContent = confirmText;
  confirmBtn.disabled = false;
  confirmBtn.onclick = onConfirm;
  overlay.setAttribute("aria-hidden", "false");
  overlay.querySelector("input, select, textarea, button")?.focus();
}

export function closeModal() {
  document.getElementById("modalOverlay").setAttribute("aria-hidden", "true");
}

export function skeleton(count = 5) {
  return `<div class="skeleton-row" aria-label="Loading">${Array(count).fill('<div class="skeleton"></div>').join("")}</div>`;
}

export function badge(label, variant = "") {
  return `<span class="badge ${variant}">${label}</span>`;
}

export function debounce(fn, ms = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
