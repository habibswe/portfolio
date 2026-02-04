'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Enable/disable submit button based on input validity
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// Show toast message
const successMessage = () => {
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  document.getElementById('close-toast').addEventListener('click', () => {
    toast.classList.remove('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
};

// Formspree submission
// EmailJS submission
const serviceID = "service_tqmnwma"; // Replace with your Service ID (e.g., "service_xxxx")
const templateID = "template_it1866q"; // Replace with your Template ID (e.g., "template_xxxx")

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Disable button and show loading state if desired
  formBtn.setAttribute("disabled", "");
  formBtn.innerHTML = "<span>Sending...</span>";

  const formData = new FormData(form);

  // Prepare the parameters that match your EmailJS Template
  const templateParams = {
    from_name: formData.get("fullname"), // This maps to {{from_name}} in your template (Subject source)
    reply_to: formData.get("email"),     // This maps to {{reply_to}} in your template
    message: formData.get("message")     // This maps to {{message}} in your template
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      form.reset();
      successMessage();
      formBtn.setAttribute("disabled", ""); // Keep disabled until new input
      formBtn.innerHTML = "<ion-icon name='paper-plane'></ion-icon><span>Send Message</span>";
    }, (err) => {
      formBtn.removeAttribute("disabled");
      formBtn.innerHTML = "<ion-icon name='paper-plane'></ion-icon><span>Send Message</span>";
      alert(JSON.stringify(err));
      alert("Failed to send message. Please check your internet connection.");
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Download CV button: show downloading text + loading dots, disable pointer briefly
const cvDownloadLink = document.querySelector(".cv-download");

if (cvDownloadLink) {
  cvDownloadLink.addEventListener("click", function () {
    if (cvDownloadLink.classList.contains("is-downloading")) return;

    const textNode = cvDownloadLink.querySelector(".cv-text");
    const originalText = textNode ? textNode.textContent.trim() : "Download CV";

    cvDownloadLink.dataset.originalText = originalText;
    if (textNode) textNode.textContent = "Downloading";

    cvDownloadLink.classList.add("is-downloading");
    cvDownloadLink.setAttribute("aria-busy", "true");

    // Re-enable after a short delay (download starts immediately)
    setTimeout(() => {
      if (textNode) {
        textNode.textContent = cvDownloadLink.dataset.originalText || "Download CV";
      }
      cvDownloadLink.classList.remove("is-downloading");
      cvDownloadLink.removeAttribute("aria-busy");
    }, 2000);
  });
}


// Pagination for Projects
const ITEMS_PER_PAGE = 6;
let currentPage = 1;
let currentFilter = 'all';

const updatePagination = () => {
  const filterBtns = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  
  // Get current active filter
  filterBtns.forEach(btn => {
    if (btn.classList.contains("active")) {
      currentFilter = btn.innerText.toLowerCase();
    }
  });

  // Filter items based on selected category
  let visibleItems = Array.from(filterItems).filter(item => {
    if (currentFilter === 'all') return true;
    return item.dataset.category === currentFilter;
  });

  const totalPages = Math.ceil(visibleItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Hide all items first
  filterItems.forEach(item => {
    item.classList.remove("active");
  });

  // Show only items for current page
  visibleItems.slice(startIndex, endIndex).forEach(item => {
    item.classList.add("active");
  });

  // Update pagination UI
  document.getElementById("current-page").textContent = currentPage;
  document.getElementById("total-pages").textContent = totalPages;
  
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  
  // Hide pagination if only one page
  const pagination = document.querySelector(".pagination");
  if (pagination) {
    pagination.style.display = totalPages <= 1 ? "none" : "flex";
  }
};

// Pagination button events
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  nextBtn.addEventListener("click", () => {
    const totalPages = parseInt(document.getElementById("total-pages").textContent);
    if (currentPage < totalPages) {
      currentPage++;
      updatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// Reset to page 1 when filter changes
const filterBtns = document.querySelectorAll("[data-filter-btn]");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentPage = 1;
    setTimeout(updatePagination, 100);
  });
});

// Initialize pagination on page load
updatePagination();


// Pagination for Certificates
const CERTIFICATES_PER_PAGE = 4;
let currentCertPage = 1;

const updateCertificatePagination = () => {
  const certificateItems = document.querySelectorAll("[data-certificate-item]");
  const totalCertPages = Math.ceil(certificateItems.length / CERTIFICATES_PER_PAGE);
  const startIndex = (currentCertPage - 1) * CERTIFICATES_PER_PAGE;
  const endIndex = startIndex + CERTIFICATES_PER_PAGE;

  // Hide all certificates first
  certificateItems.forEach(item => {
    item.classList.remove("active");
  });

  // Show only certificates for current page
  Array.from(certificateItems).slice(startIndex, endIndex).forEach(item => {
    item.classList.add("active");
  });

  // Update pagination UI
  const currentPageEl = document.getElementById("cert-current-page");
  const totalPagesEl = document.getElementById("cert-total-pages");
  
  if (currentPageEl && totalPagesEl) {
    currentPageEl.textContent = currentCertPage;
    totalPagesEl.textContent = totalCertPages;
  }
  
  const certPrevBtn = document.getElementById("cert-prev-btn");
  const certNextBtn = document.getElementById("cert-next-btn");
  
  if (certPrevBtn && certNextBtn) {
    certPrevBtn.disabled = currentCertPage === 1;
    certNextBtn.disabled = currentCertPage === totalCertPages;
  }
  
  // Hide pagination if only one page
  const certPagination = document.querySelector(".certificate-pagination");
  if (certPagination) {
    certPagination.style.display = totalCertPages <= 1 ? "none" : "flex";
  }
};

// Certificate pagination button events
const certPrevBtn = document.getElementById("cert-prev-btn");
const certNextBtn = document.getElementById("cert-next-btn");

if (certPrevBtn && certNextBtn) {
  certPrevBtn.addEventListener("click", () => {
    if (currentCertPage > 1) {
      currentCertPage--;
      updateCertificatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  certNextBtn.addEventListener("click", () => {
    const totalCertPages = parseInt(document.getElementById("cert-total-pages").textContent);
    if (currentCertPage < totalCertPages) {
      currentCertPage++;
      updateCertificatePagination();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

// Initialize certificate pagination on page load
updateCertificatePagination();

