var dest_array;
var occ_seats;
var selected_dest;

var GET_DEST_TABLE = "GET_DEST_TABLE";
var GET_SEATS_TABLE = "GET_SEATS_TABLE";
var ADD_OCCUPED_SEATS = "ADD_OCCUPED_SEATS";

$(document).ready(function(){
	
	//Gets the dest table and //Conects with the DB
	$.ajax({
		type: "post",
		url: "DBInterface.php",
		data: {action: GET_DEST_TABLE},
		dataType: 'json',
		cache: "false",
		success: function(data) {

			var city, seats, availableseats;
			dest_array = new Array();

			for(var i = 0; i < data.length; i++)
			{
                // Parse through the JSON array which was returned.
                city = data[i].CITY;
                seats = data[i].TOTALSEATS;
                availableseats = data[i].AVAILABLESEATS;
                //Insert the data into an aray
                dest_array.push({CITY:city,SEATS:seats,AVAILABLESEATS:availableseats});
            }
            
            $.each(dest_array, function (i, item) {
            	$('#dest_selector').append($('<option>', { 
            		id: dest_array[i].CITY,
            		value: dest_array[i].CITY,
            		text : dest_array[i].CITY,
            		class : "option_class"
            	}));
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
        	alert("No se puedo conectar con la base de datos");
        }, 
    });

	$('#dest_selector').change(function() {
		selected_dest = $("#dest_selector option:selected").text();

		if(selected_dest=='----'){
			$('#chooseseats').hide(500);
			$('#clientdata').hide(500);
			return;
		}else{
			$('#chooseseats').show(500);
			$('#clientdata').show(500);

			
			//Ajax code for check how much seats are availables
			$.ajax({
				type: "post",
				url: "DBInterface.php",
				data: {action: GET_SEATS_TABLE, city: selected_dest},
				dataType: 'json',
				cache: "false",
				success: function(data) {
					occ_seats = new Array();
					for(var i = 0; i< data.length; i++){
						occ_seats.push(data[i]);
					}
					//Search in the table arary the seats in for the selected dest
					for (var i = dest_array.length - 1; i >= 0; i--) {
						if(dest_array[i].CITY == selected_dest){
							var size = dest_array[i]['SEATS'];
							printTable(size,occ_seats);
						}
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) { 
					alert("No se puedo conectar con la base de datos"); 
				},
			});
			
			
		}

	});
	$('#submit-button').click(function () {

		var selectedseats = $('input:checkbox:checked').length;
		var selectedseats_ids = [];

		if($('#NIFfield').val() != "" && $('#NAMEfield').val() != "" &&
			$('#MAILfield').val() != "" && selectedseats > 0){

			$('input:checkbox:checked').each(function() {
				selectedseats_ids.push(this.id);
			});
			var nif = $('#NIFfield').val();
			//Writes int the DB the new places booked
			$.ajax({
				type: "post",
				url: "DBInterface.php",
				data:{
					action: ADD_OCCUPED_SEATS,
					city: selected_dest,
					dni: nif,
					dests : JSON.stringify(selectedseats_ids),
				},
				success: function(data) {
					if(selectedseats == data){
						alert("Reservadas con exito " + data + "plazas.");
					}else{
						alert("Solo se han reservado " + data + " plazas.");
					}
				},
				error: function(){
					alert("Error de escritura");
				}
			});

		}else{
			alert("Completa el formulario y selecciona almenos una plaza");
			return;
		}
		

	});
});

function printTable(size) {
	
	var cell_id = 1;
	var rows = 4; 						 //Number of rows
	var columns = Math.ceil(size/rows);  //All columns, with the 
	var rest = size%rows; 				 //Remainng seats 

	deleteOldTable(rows);

	var div = document.getElementById('chooseseats_div');
	var table = document.createElement('table');
	table.id = "myTable";

	//table.style.width = "100%";
	for (var i= 0; i< rows; i++) {

		var row = table.insertRow(i);
		for(var j = 0; j< columns; j++){

			var cell = row.insertCell();
			setCellColor(cell,cell_id,occ_seats);

			var chkbox = document.createElement('input');;
			setCheckBox(chkbox,cell_id,occ_seats);

			if(j==columns-1){
				if(size%rows==0){
					cell.appendChild(chkbox);
					cell_id++;
				}else{
					if(rest>0){
						cell.appendChild(chkbox);
						rest--;
						cell_id++;
					}else{
						cell.bgColor = "#AAAAAA";
					}
				}
			}else{
				cell.appendChild(chkbox);
				cell_id++;
			}
			
		}
	}
	div.appendChild(table);
}

function deleteOldTable(rows){
	
	document.getElementById('chooseseats_div').innerHTML= ""
}

function setCellColor(cell,cell_id){

	var blue = "#3aaaff";
	var red = "#ff8742";

	cell.bgColor = blue;
	for (var i = 0; i < occ_seats.length; i++) {
		if(occ_seats[i].SEATNO == cell_id){
			cell.bgColor = red;
			return;
		}
	}
}
function setCheckBox(chkbox,cell_id){

	chkbox.type = "checkbox";
	chkbox.id = cell_id;
	chkbox.class = "seat";
	chkbox.style.opacity = 50;

	for (var i = 0; i < occ_seats.length; i++) {
		if(occ_seats[i].SEATNO == cell_id){
			chkbox.disabled = true;
		}
	}
}
