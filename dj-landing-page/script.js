(function () {
  "use strict";

  var WHATSAPP_NUMBER = "972549774827"; // 054-977-4827 in international format, no leading 0
  var WHATSAPP_MESSAGE =
    "היי DJ LAVI! ראיתי את דף הנחיתה שלך ואשמח לשמוע פרטים על הזמנה לאירוע 🎧";
  var CONTACT_EMAIL = "amzion24@gmail.com";
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/" + CONTACT_EMAIL;

  function whatsappUrl() {
    return (
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(WHATSAPP_MESSAGE)
    );
  }

  function wireWhatsappLinks() {
    var url = whatsappUrl();
    var ids = ["nav-whatsapp", "hero-whatsapp", "contact-whatsapp", "floating-whatsapp"];
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.setAttribute("href", url);
      }
    });
  }

  function setYear() {
    var el = document.getElementById("year");
    if (el) {
      el.textContent = String(new Date().getFullYear());
    }
  }

  function wireContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;

    var messageField = document.getElementById("message");
    var messageRow = messageField.closest(".form-row");
    var messageError = document.getElementById("message-error");
    var statusEl = document.getElementById("form-status");
    var submitBtn = document.getElementById("submit-btn");
    var submitLabel = submitBtn.querySelector(".btn-label");

    function setStatus(text, kind) {
      statusEl.textContent = text;
      statusEl.className = "form-status" + (kind ? " " + kind : "");
    }

    function showFieldError(show) {
      messageError.hidden = !show;
      if (messageRow) {
        messageRow.classList.toggle("has-error", show);
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var honeypot = form.querySelector('[name="_honey"]');
      if (honeypot && honeypot.value) {
        // Bot filled the hidden field — silently drop.
        return;
      }

      var messageValue = messageField.value.trim();
      if (!messageValue) {
        showFieldError(true);
        messageField.focus();
        setStatus("", "");
        return;
      }
      showFieldError(false);

      submitBtn.disabled = true;
      submitLabel.textContent = "שולח...";
      setStatus("", "");

      var formData = new FormData(form);

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("form endpoint returned " + response.status);
          }
          return response.json();
        })
        .then(function () {
          form.reset();
          setStatus(
            "הפנייה נשלחה! אחזור אליך בהקדם. אפשר גם לכתוב לי ישירות בוואטסאפ.",
            "success"
          );
        })
        .catch(function (err) {
          setStatus(
            "השליחה נכשלה. אפשר לנסות שוב, או לכתוב ישירות ל-" +
              CONTACT_EMAIL +
              " / בוואטסאפ.",
            "error"
          );
          if (window.console && console.error) {
            console.error("[contact-form] submit failed:", err);
          }
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitLabel.textContent = "שליחת פנייה";
        });
    });

    messageField.addEventListener("input", function () {
      if (messageField.value.trim()) {
        showFieldError(false);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireWhatsappLinks();
    setYear();
    wireContactForm();
  });
})();
