// Store the order in local storage
function storeOrder() {
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
	displayOrders();
}

// Display the orders by table
function displayOrders() {
	let orders = JSON.parse(localStorage.getItem('orders')) || {};
	let ordersHTML = '';
	for (let tableNum in orders) {
		ordersHTML += '<h3>Table ' + tableNum + '</h3>';
		for (let category in orders[tableNum]) {
			if (orders[tableNum][category].length > 0) {
				ordersHTML += '<h4>' + category.charAt(0).toUpperCase() + category.slice(1) + 's</h4>';
				ordersHTML += '<ul>';
				for (let i = 0; i < orders[tableNum][category].length; i++) {
					ordersHTML += '<li>' + orders[tableNum][category][i].dishName + ' - ' + orders[tableNum][category][i].quantity + '</li>';
				}
				ordersHTML += '</ul>';
			}
		}
	}
	document.getElementById('orders').innerHTML = ordersHTML;
}
