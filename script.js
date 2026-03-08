const year = document.querySelector("#year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

const parseJsonSafe = (rawText) => {
  if (!rawText || !rawText.trim()) {
    return null;
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return null;
  }
};

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

      const rawResponse = await response.text();
      const result = parseJsonSafe(rawResponse);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Unable to send your message right now. Please try again later."
        );
      }

      if (!result?.success) {
        throw new Error(
          result?.message ||
            "Message service is currently unavailable. Please email me directly at shresthabibek2022@gmail.com."
        );
      }

      formStatus.classList.add("success");
      formStatus.textContent =
        result.message || "Thanks! Your message was sent successfully.";
      contactForm.reset();
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        error.message ||
        "Something went wrong. Please email me directly at shresthabibek2022@gmail.com.";
    }
  });
}
