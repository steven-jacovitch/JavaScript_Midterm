// Answer key solution is 10 lines (including lines to make the formatting nicer)

// @TODO: The input field values should stay the same when refreshing the page
// @TODO: For full credit, it must use only one localStorage item for all three inputs
// @HINT: Use inspect tool to check the local storage in completed example
// @HINT: Save the values when there is input
// @HINT: If you can't complete, you will get partial credits if you write down your attempts in comment

// items need to be set in local storage under 'stored.values'
// input boxes have class 'form-control'
// input boxes have id 'text-1', 'text-2', 'text-3'
// items in local storage are stored as a dictionary with keys 'text-1', 'text-2', 'text-3' and values as the input values
// items in local storage are set when the input value changes

const inputs = ['text-1', 'text-2', 'text-3']
inputs.forEach((id) => {
  const input = document.querySelector(`#${id}`);
  input.addEventListener('input', () => {
    const values = JSON.parse(localStorage.getItem('stored.values')) || {};
    if (input.value) values[id] = input.value;
    localStorage.setItem('stored.values', JSON.stringify(values));
  });
  const storedValues = JSON.parse(localStorage.getItem('stored.values'));
  if (storedValues && storedValues[id]) input.value = storedValues[id];
});









