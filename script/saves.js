// Function to save a value
function saveValue(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Function to read a value
function getValue(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}
