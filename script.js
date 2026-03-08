const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    formStatus.className = "form-status";
    formStatus.textContent = "Sending your message...";

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send message.");
      }

      formStatus.classList.add("success");
      formStatus.textContent = result.message;
      contactForm.reset();
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        error.message || "Something went wrong. Please try again later.";
    }
  });
}
