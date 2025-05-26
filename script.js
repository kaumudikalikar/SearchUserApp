const loading = document.getElementById('loading');
const error = document.getElementById('error');
const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');

let Users = [];

// set time to reload data delay
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');

    await sleep(3000); // delay
    const users = await response.json();
    Users = users;

    loading.style.display = 'none';
    displayUsers(users);
  } catch (err) {
    loading.style.display = 'none';
    error.textContent = 'Failed to load users.';
    console.error('Error:', err);
  }
}

// Render users in the list

function displayUsers(users) {
  userList.innerHTML = '';
  if (users.length === 0) {
    userList.innerHTML = '<li>No matching users found.</li>';
    return;
  }

  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `${user.name} `;
    userList.appendChild(li);
  });
}

// Search functionality
function searchUsers() {
  const searchText = searchInput.value.trim().toLowerCase();
  error.textContent = '';

  if (searchText === '') {
    displayUsers(Users);
    return;
  }

  const filtered = Users.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );

  displayUsers(filtered);
}

// Fetch users on page load
fetchUsers();
