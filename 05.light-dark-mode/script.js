const toggleSwitch = document.querySelector('input[type="checkbox"]');

function switchTheme(event) {
  // Dark mode
  if (event.target.checked) {
    // Get root element
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme);
