function showError(message) {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.innerText = message;
      errorDiv.style.display = 'block';
    }

    function clearError() {
      const errorDiv = document.getElementById('errorMsg');
      errorDiv.innerText = '';
      errorDiv.style.display = 'none';
    }

    function getDaysOld(dateStr) {
      const purchaseDate = new Date(dateStr);
      const today = new Date();
      const diffTime = today - purchaseDate;
      return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    }

    function renderAlerts() {
      const inventory = JSON.parse(localStorage.getItem('coffeeInventory')) || [];
      const list = document.getElementById('alertList');
      list.innerHTML = '';

      if (inventory.length === 0) {
        showError("No coffees found in inventory.");
        return;
      }

      clearError();

      const sorted = inventory
        .map(item => ({ ...item, age: getDaysOld(item.date) }))
        .sort((a, b) => b.age - a.age)
        .slice(0, 3);

      sorted.forEach(item => {
        const div = document.createElement('div');
        div.className = 'coffee-alert' + (item.age >= 45 ? ' stale' : '');
        div.innerText = `${item.name} • ${item.roast} • ${item.qty}g • Purchased: ${item.date} • ${item.age} days old`;
        list.appendChild(div);
      });
    }

    renderAlerts();