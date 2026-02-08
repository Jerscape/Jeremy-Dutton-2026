//hamburger menu

const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-links");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburgerBtn.classList.toggle("active");

  const isOpen = navMenu.classList.contains("active");
  hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
  hamburgerBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

//form

// --- Formspree UX (safe + isolated) ---
const form = document.querySelector(".form-3col");
if (form) {
  const submitBtn = form.querySelector(".submit-btn");

  // Create a status element if you haven't added one in HTML
  let statusEl = form.querySelector(".form-status");
  if (!statusEl) {
    statusEl = document.createElement("p");
    statusEl.className = "form-status";
    statusEl.setAttribute("aria-live", "polite");
    // Put it right before the submit button if possible
    if (submitBtn) submitBtn.insertAdjacentElement("beforebegin", statusEl);
    else form.appendChild(statusEl);
  }

  // Helper: show/clear field-level errors + set ARIA attributes
  function setFieldError(field, message) {
    // Purpose:
    // - Show or clear an error message for a specific input/textarea.
    // - Also sets ARIA attributes so screen readers know the field is invalid.

    // field: the input/textarea element (ex: document.querySelector("#name"))
    // message: the error text to show (ex: "Please enter your name.")
    //          if message is "" (empty), that means "clear the error"
     if (!field) return;   // add this line
    const id = field.id; // I rely on the field having an id=""
    if (!id) return; // if there is no id, I can't create/link an error element

    // I look for an existing error paragraph with an id like "name-error"
    // If it doesn't exist yet, I create it and insert it right after the field.
    let errEl = form.querySelector(`#${id}-error`);
    if (!errEl) {
      errEl = document.createElement("p");
      errEl.id = `${id}-error`; // ex: "name-error"
      errEl.className = "field-error";

      // role="alert" means screen readers will announce this error immediately when it appears/changes
      errEl.setAttribute("role", "alert");

      // Put the error message directly after the field in the DOM
      field.insertAdjacentElement("afterend", errEl);
    }

    if (message) {
      // SET ERROR:
      // - mark field invalid
      // - connect the field to the error text
      // - display the error
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", errEl.id);

      errEl.textContent = message;
      errEl.hidden = false;
    } else {
      // CLEAR ERROR:
      // - remove invalid markers
      // - hide the error
      field.removeAttribute("aria-invalid");
      field.removeAttribute("aria-describedby");

      errEl.textContent = "";
      errEl.hidden = true;
    }
  }

  //form event listener
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    //blank name field error handler for screen readers
//clear previous error, then validate
const nameField = form.querySelector("#name");
setFieldError(nameField, ""); // clear any old error

//if namefield is null or has only spaces, trigger error message
if (!nameField || !nameField.value.trim()) {
  setFieldError(nameField, "Please enter your name.");
  nameField?.focus(); //this ensures it wont; focus when null which would break the flow
  return; // stop here (don't send)
  
}

//error display if email is blank
const emailField = form.querySelector("#email")
setFieldError(emailField, "") //clear previous errors

if (!emailField || !emailField.value.trim()){
  setFieldError(emailField, "Please enter an email")
  emailField?.focus(); //this ensures it wont; focus when null which would break the flow
  return //step here (don't send)
}

//error display if messagefield is blank etc 
const messageField = form.querySelector("#message")
setFieldError(messageField, "") //clear previous errors

if (!messageField || !messageField.value.trim()){
  setFieldError(messageField, "Please enter an message")
  messageField?.focus(); //this ensures it wont; focus when null which would break the flow
  return //step here (don't send)
}


    form.setAttribute("aria-busy", "true");

    // UI: show sending state immediately
    statusEl.textContent = "Sending…";
    statusEl.className = "form-status";

    const originalText = submitBtn ? submitBtn.textContent : "";
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add("is-loading");
      submitBtn.textContent = "Sending…";
    }

    try {
      const formData = new FormData(form);

      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "Thanks! Your message has been sent.";
        statusEl.classList.add("success");
      } else {
        statusEl.textContent = "Something went wrong. Please try again.";
        statusEl.classList.add("error");
      }
    } catch (err) {
      statusEl.textContent = "Network issue. Please try again.";
      statusEl.classList.add("error");
    } finally {
      form.removeAttribute("aria-busy");
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove("is-loading");
        submitBtn.textContent = originalText;
      }
    }
  });
}
