function storeOrder() {
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
		orders[tableNum][category].push({
			'dishName': dishName,
			'quantity': quantity
		});
		localStorage.setItem('orders', JSON.stringify(orders));
		// Make HTTP POST request to API endpoint
		fetch('https://crudcrud.com/api/0d0ed4f85d044931abe7b50df64c928b/orders', {
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
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error));

		displayOrders();
	} catch (error) {
		console.error(error);
	}
}
// Display the orders by table
function displayOrders() {
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
						ordersHTML += '<li>' + orders[tableNum][category][i].dishName + ' - ' + orders[tableNum][category][i].quantity + ' <button onclick="deleteOrder(' + tableNum + ', \'' + category + '\', ' + i + ')">Delete</button></li>';
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
function deleteOrder(tableNum, category, index, orderId) {
	try {
		let orders = JSON.parse(localStorage.getItem('orders')) || {};
		orders[tableNum][category].splice(index, 1);
		localStorage.setItem('orders', JSON.stringify(orders));

		// Make HTTP DELETE request to API endpoint
		fetch('https://crudcrud.com/api/0d0ed4f85d044931abe7b50df64c928b/orders/' + orderId, {
			method: 'DELETE'
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error));

		displayOrders();
	} catch (error) {
		console.error(error);
	}
}
