const dropDownBtn = document.getElementById("drop-drown-btn");
const dropDownNavBarContainer = document.getElementById(
  "drop-down-nav-bar-container"
);
const dropDownIcon = document.getElementById("drop-down-icon");
const closeIcon = document.getElementById("close-icon");
let navBarContainerIsVisible = false;

const setDropDownActivated = (newState: boolean) => {
  navBarContainerIsVisible = newState;
  if (navBarContainerIsVisible) {
    // Toggle icon
    dropDownIcon?.classList.add("hidden");
    dropDownIcon?.classList.remove("block");
    closeIcon?.classList.add("block");
    closeIcon?.classList.remove("hidden");
    // Toggle nav-bar container
    dropDownNavBarContainer?.classList.add("block");
    dropDownNavBarContainer?.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  } else {
    // Toggle icon
    dropDownIcon?.classList.add("block");
    dropDownIcon?.classList.remove("hidden");
    closeIcon?.classList.add("hidden");
    closeIcon?.classList.remove("block");
    // Toggle nav-bar container
    dropDownNavBarContainer?.classList.remove("block");
    dropDownNavBarContainer?.classList.add("hidden");
    document.body.style.overflow = "";
  }
};

dropDownBtn?.addEventListener("click", () => {
  setDropDownActivated(!navBarContainerIsVisible);
});

// Close mobile overlay when clicking a nav link
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setDropDownActivated(false);
  });
});
