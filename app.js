async function storeOrder() {
	try {
		const tableNum = document.getElementById('tableNum').value;
		const category = document.getElementById('category').value;
		const dishName = document.getElementById('dishName').value;
		const quantity = document.getElementById('quantity').value;
		let orders = JSON.parse(localStorage.getItem('orders')) || {};
		if (!orders[tableNum]) {
			orders[tableNum] = {
				'appetizer': [],
				'entree': [],
				'dessert': [],
				'drink': []
			};
		}
		const response = await fetch('https://crudcrud.com/api/cf2926fe0e734c7fba458e192eae2c56/orders', {
			method: 'POST',	
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				'tableNum': tableNum,
				'category': category,
				'dishName': dishName,
				'quantity': quantity
			})
		});
		const data = await response.json();
		console.log(data);
		
		// Add the order ID to the orders object
		orders[tableNum][category].push({
			'dishName': dishName,
			'quantity': quantity,
			'_id': data._id
		});
		localStorage.setItem('orders', JSON.stringify(orders));
		
		displayOrders();
	} catch (error) {
		console.error(error);
	}
}


// Display the orders by table
async function displayOrders() {
	try {
		let orders = JSON.parse(localStorage.getItem('orders')) || {};
		let ordersHTML = '';
		for (let tableNum in orders) {
			ordersHTML += '<h3>Table ' + tableNum + '</h3>';
			for (let category in orders[tableNum]) {
				if (orders[tableNum][category].length > 0) {
					ordersHTML += '<h4>' + category.charAt(0).toUpperCase() + category.slice(1) + 's</h4>';
					ordersHTML += '<ul>';
					for (let i = 0; i < orders[tableNum][category].length; i++) {
						ordersHTML += '<li>' + orders[tableNum][category][i].dishName + ' - ' + orders[tableNum][category][i].quantity + ' <button onclick="deleteOrder(' + tableNum + ', \'' + category + '\', ' + i + ', \'' + orders[tableNum][category][i]._id + '\')">Delete</button></li>';
					}
					ordersHTML += '</ul>';
				}
			}
		}
		document.getElementById('orders').innerHTML = ordersHTML;
	} catch (error) {
		console.error(error);
	}
}

// Delete an order
async function deleteOrder(tableNum, category, index, orderId) {
	try {
	  let orders = JSON.parse(localStorage.getItem('orders')) || {};
	  orders[tableNum][category].splice(index, 1);
	  localStorage.setItem('orders', JSON.stringify(orders));
  
	  // Making HTTP DELETE request to API
	  const response = await fetch('https://crudcrud.com/api/cf2926fe0e734c7fba458e192eae2c56/orders/' + orderId, {
		method: 'DELETE'
	  });
	  const data = await response.json();
	  console.log(data);
  
	  displayOrders();
	} catch (error) {
	  console.error(error);
	}
  }
  

	