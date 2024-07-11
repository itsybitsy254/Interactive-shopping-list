// Initialize the shopping list array
let shoppingList = [];

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
      tickIcon.textContent = ' ✓'; // Unicode checkmark character or any other icon
      tickIcon.style.marginLeft = '5px';
      li.appendChild(tickIcon);
    }
    li.addEventListener('click', () => {
      // Toggle the completed status
      item.completed = !item.completed;
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
    itemInput.value = '';
    renderList();
  }
});

markBtn.addEventListener('click', () => {
  // Marks all items as purchased
  shoppingList.forEach(item => {
    item.completed = true;
  });
  renderList();
});

clearBtn.addEventListener('click', () => {
  // Clear the shopping list
  shoppingList = [];
  renderList();
});

renderList();
