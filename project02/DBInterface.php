<?php  

//Call types
$GET_DEST_TABLE = "GET_DEST_TABLE";
$GET_SEATS_TABLE = "GET_SEATS_TABLE";
$ADD_OCCUPED_SEATS = "ADD_OCCUPED_SEATS";

$conn = NULL;

//Manages each ajax call
if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
	switch($action) {
		case $GET_DEST_TABLE : GetDestTable($conn); break;
		case $GET_SEATS_TABLE: GetOccSeats($_POST['city'],$conn); break;
		case $ADD_OCCUPED_SEATS: AddOccSeats($_POST['city'],$_POST['dni'],$_POST['dests'],$conn); break;
	}
}

/*Connects with the database*/
function Connect($conn)
{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$databasename = "busseatsmanager";

	$conn = new mysqli($servername, $username, $password, $databasename);

	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	} 
}
/*Gets the dest table and encoges the table into JSON formact*/
function GetDestTable($conn)
{
	Connect($conn);

	$sql = "SELECT * FROM destinations";
	$result = $conn->query($sql);
	$return_arr = array();

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($return_arr, $row);
	}

	echo json_encode($return_arr);

	CloseConn($conn);
}

//Takes as parameter
function GetOccSeats($cityname,$conn)
{
	Connect($conn);

	//SELECT SEATNO FROM `occupiedseats` WHERE CITY= 'Leon';
	$sql = "SELECT SEATNO FROM occupiedseats WHERE CITY = '".$cityname."'";
	$result = $conn->query($sql);
	$return_arr = array();

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($return_arr, $row);
	}
	echo json_encode($return_arr);

	CloseConn($conn);
}

//INSERT INTO `occupiedseats`(`CITY`, `SEATNO`, `NIF`) VALUES ('',0,'');
function AddOccSeats($cityname, $nif, $dest, $conn){
	
	Connect($conn);
	$destinations = json_decode(stripslashes($dest));
	foreach ($destinations as $d) {
		$sql = "INSERT INTO occupiedseats(CITY, SEATNO,NIF) VALUES ('".$cityname."',".$d.",'".$nif."')";

		if ($conn->query($sql) === TRUE) {
			echo "Added seat".$d;
		} else {
			echo "Error: " . $sql . " -- " . $conn->error;
		}
	}
	echo json_encode(1);
	CloseConn($conn);
}


//Close connection.
function CloseConn($conn)
{
	$conn->close();
}


?>
