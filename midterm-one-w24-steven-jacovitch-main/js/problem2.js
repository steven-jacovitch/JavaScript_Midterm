// @TODO: Get every element with `id` attribute on the page and output it in a list.
// @HINT: Use inspect tool to see what tags and attributes are used.
// Answer key solution is 4 lines.

// Get all elements with id attribute
// add them to the 'id-list' element
// each id should have class 'list-group-item'

const pageIds = document.querySelectorAll('[id]');
const idList = document.querySelector('#id-list');
pageIds.forEach((id) => {
  const idItem = document.createElement('li');
  idItem.classList.add('list-group-item');
  idItem.innerHTML = id.id;
  idList.appendChild(idItem);
});
