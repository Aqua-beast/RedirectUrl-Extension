document.addEventListener("DOMContentLoaded", function () {
  // Set default theme color if not set
  if (localStorage.getItem("themeColor") === null) {
    localStorage.setItem("themeColor", "#007bff");
  }

  // Apply stored theme color
  applyThemeColor();

  // Event listener for color options
  var colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      var color = this.getAttribute("data-color");
      localStorage.setItem("themeColor", color);
      applyThemeColor();
      markActiveColorOption(color);
    });
  });

  // Function to apply stored theme color
  function applyThemeColor() {
    var themeColor = localStorage.getItem("themeColor");
    document.body.style.border = `2px solid ${themeColor}`;
    var buttons = document.querySelectorAll(
      ".redirect-btn, .home-btn, .changeUrl-btn, .reset-btn"
    );
    buttons.forEach(function (button) {
      button.style.backgroundColor = themeColor;
    });
    markActiveColorOption(themeColor);
  }

  // Function to mark active color option
  function markActiveColorOption(color) {
    var allOptions = document.querySelectorAll(".color-option");
    allOptions.forEach(function (option) {
      option.classList.remove("active");
      if (option.getAttribute("data-color") === color) {
        option.classList.add("active");
      }
    });
  }

  // Set default redirect and home URLs if not already set
  setDefaultUrls();

  // Function to set default URLs
  function setDefaultUrls() {
    if (
      localStorage.getItem("redirect") === null ||
      localStorage.getItem("home") === null
    ) {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var currentUrl = tabs[0].url;
        var defaultUrls = {
          redirect: {
            url1: { label: "Label 1", url: currentUrl },
            url2: { label: "Label 2", url: currentUrl },
            url3: { label: "Label 3", url: currentUrl },
            url4: { label: "Label 4", url: currentUrl },
          },
          home: { url: currentUrl },
        };
        localStorage.setItem("redirect", JSON.stringify(defaultUrls.redirect));
        localStorage.setItem("home", JSON.stringify(defaultUrls.home));
        populateRedirectInputs(defaultUrls.redirect);
      });
    } else {
      populateRedirectInputs(JSON.parse(localStorage.getItem("redirect")));
    }
  }

  // Function to populate redirect input fields
  function populateRedirectInputs(redirectUrls) {
    Object.keys(redirectUrls).forEach(function (key, index) {
      var labelInput = document.getElementById(`redirectLabel${index + 1}`);
      var urlInput = document.getElementById(`redirectURL${index + 1}`);
      if (labelInput && urlInput) {
        labelInput.value = redirectUrls[key].label;
        urlInput.value = redirectUrls[key].url;
        var button = document.getElementById(`redirectButton${index + 1}`);
        if (button) {
          button.textContent = redirectUrls[key].label || `Link ${index + 1}`;
        }
      }
    });
  }

  // Redirect button click event
  var redirectButtons = document.querySelectorAll(".redirect-btn");
  redirectButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      var redirectUrls = JSON.parse(localStorage.getItem("redirect"));
      var redirectUrl = redirectUrls[`url${index + 1}`];

      if (redirectUrl && redirectUrl.url) {
        chrome.tabs.update({ url: redirectUrl.url });
      } else {
        alert(
          `Redirect URL ${index + 1} is not defined. Please set a valid URL.`
        );
      }
    });
  });


  // Home button click event
  var homeButton = document.getElementById("homePage");
  homeButton.addEventListener("click", function () {
    var homeUrl = JSON.parse(localStorage.getItem("home")); // Retrieve home URL directly
    chrome.tabs.update({ url: homeUrl.url });
  });

  document.getElementById("submitHome").addEventListener("click", function () {
    var newHomeUrl = document.getElementById("homeUrlInput").value.trim();
    localStorage.setItem("home", JSON.stringify({url: newHomeUrl}));

    setHomeUrl();

    function setHomeUrl() {
      document.getElementById("homeUrlInput").value =
        JSON.parse(localStorage.getItem("home")).url;
        closeMainContainer();
    }
  });

  // Toggle main container visibility
  var changeUrlButton = document.getElementById("changeUrlButton");
  changeUrlButton.addEventListener("click", function () {
    var mainContainer = document.querySelector(".main-container");
    mainContainer.style.display =
      mainContainer.style.display === "none" ? "block" : "none";
  });

  // Submit redirect URL
  var submitRedirectButtons = document.querySelectorAll(".redirectSubmit-btn");
  submitRedirectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var storageKey = button.id.replace("submitRedirect", "url");
      updateUrl(storageKey);
    });
  });

  // Function to update URL in localStorage
  function updateUrl(storageKey) {
    var urlInput = document.getElementById(
      `redirectURL${storageKey.charAt(3)}`
    );
    var labelInput = document.getElementById(
      `redirectLabel${storageKey.charAt(3)}`
    );
    var url = urlInput.value.trim();
    var label = labelInput.value.trim();

    if (url !== "") {
      var urls = JSON.parse(localStorage.getItem("redirect")) || {};
      urls[storageKey] = { label: label, url: url }; // Store label and URL as object
      localStorage.setItem("redirect", JSON.stringify(urls));

      // Update button label
      updateButtonLabel(storageKey, label);

      // Close the container
      closeMainContainer();
    } else {
      alert("Please enter a valid URL.");
    }
  }

  // Function to update button label with saved link
  function updateButtonLabel(storageKey, label) {
    var buttonId = `redirectButton${storageKey.charAt(3)}`;
    var button = document.getElementById(buttonId);
    button.textContent = label;
  }

  // Function to close main container (if defined elsewhere)
  function closeMainContainer() {
    var mainContainer = document.querySelector(".main-container");
    mainContainer.style.display = "none";
  }

  // Reset settings button click event
  document
    .getElementById("resetSettings")
    .addEventListener("click", function () {
      if (confirm("Are you sure you want to reset all settings?")) {
        localStorage.setItem("themeColor", "#007bff");
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            var currentUrl = tabs[0].url;
            var defaultUrls = {
              redirect: {
                url1: currentUrl,
                url2: currentUrl,
                url3: currentUrl,
                url4: currentUrl,
              },
              home: { url: currentUrl },
            };
            localStorage.setItem(
              "redirect",
              JSON.stringify(defaultUrls.redirect)
            );
            localStorage.setItem("home", JSON.stringify(defaultUrls.home));
          }
        );
        location.reload();
      }
    });
});
