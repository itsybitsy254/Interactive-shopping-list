// Initialize the shopping list array
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

// DOM elements
const itemInput = document.getElementById('item');
const addBtn = document.getElementById('addBtn');
const markBtn = document.getElementById('markBtn');
const clearBtn = document.getElementById('clearBtn');
const shoppingListUl = document.getElementById('shoppingList');

// Function to render the shopping list
function renderList() {
  shoppingListUl.innerHTML = '';

  // Render each item in the shopping list array
  shoppingList.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.name;
    if (item.completed) {
      li.classList.add('purchased');
      const tickIcon = document.createElement('span');
      tickIcon.textContent = ' ✓'; // Unicode checkmark character
      tickIcon.style.marginLeft = '5px';
      li.appendChild(tickIcon);
    }
    li.addEventListener('click', () => {
      // Toggle the completed status
      item.completed = !item.completed;
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
      renderList(); 
    });
    shoppingListUl.appendChild(li);
  });
}

// Event listeners
addBtn.addEventListener('click', () => {
  const newItem = itemInput.value.trim();
  if (newItem !== '') {
    shoppingList.push({ name: newItem, completed: false });
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    itemInput.value = '';
    renderList();
  }
});

markBtn.addEventListener('click', () => {
  // Marks all items as purchased
  shoppingList.forEach(item => {
    item.completed = true;
  });
  localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
  renderList();
});

clearBtn.addEventListener('click', () => {
  // Clear the shopping list
  shoppingList = [];
  localStorage.removeItem('shoppingList');
  renderList();
});

renderList();