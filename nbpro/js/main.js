var showGrid = function(clients) {
		$("#jsGrid").jsGrid({
			  // Geometry
				width: "400px",
				height: "300px",
				// Accessibilities
				inserting: true,
				editing: true,
				sorting: true,
				paging: true,
				// Body of data
				data: clients,
				// Definitions of Columns
				fields: [
						{ name: "Name", type: "text", width: '40%' },
						{ name: "Score", type: "number", width: '30%' },
						{ name: "Gender", type: "text", width: '30%' }
				]
		});
};

var getTableData = function(callbackFunc) {
		$.ajax({
				type: 'GET',
				url: "http://localhost:3000/getData",
				data: {
					fileName: 'input.csv'
				},
				dataType: 'text',
				async: 'false'
		}).done(function(data) {
				callbackFunc(jQuery.parseJSON(data));
		});
};

getTableData(showGrid);
