<?php  

//Call types
$GET_DEST_TABLE = "GET_DEST_TABLE";
$GET_SEATS_TABLE = "GET_SEATS_TABLE";
$ADD_OCCUPED_SEATS = "ADD_OCCUPED_SEATS";

//Global varabiable
$GLOBALS['conn'] = NULL;

//Manages each ajax call
if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST['action'];
	switch($action) {
		case $GET_DEST_TABLE : GetDestTable(); break;
		case $GET_SEATS_TABLE: GetOcupiedSeats($_POST['city']); break;
		case $ADD_OCCUPED_SEATS: AddOcupuesSeats($_POST['city'],$_POST['dni'],$_POST['dests']); break;
	}
}

/*Connects with the DB*/
function Connect()
{
	$servername = "localhost";
	$username = "root";
	$password = "";
	$databasename = "busseatsmanager";

	$GLOBALS['conn'] = new mysqli($servername, $username, $password, $databasename);

	// Check connection
	if ($GLOBALS['conn']->connect_error) {
		die("Connection failed: " . $GLOBALS['conn']->connect_error);
	} 
}
/*Gets and JSon with all the dest table*/
function GetDestTable()
{
	Connect();

	$sql = "SELECT * FROM destinations";
	$result = $GLOBALS['conn']->query($sql);
	$return_arr = array();

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($return_arr, $row);
	}

	echo json_encode($return_arr);

	CloseConn();
}

//Takes as parameter
function GetOcupiedSeats($cityname)
{
	Connect();

	//SELECT SEATNO FROM `occupiedseats` WHERE CITY= 'Leon';
	$sql = "SELECT SEATNO FROM occupiedseats WHERE CITY = '".$cityname."'";
	$result = $GLOBALS['conn']->query($sql);
	$return_arr = array();

	while ($row = mysqli_fetch_assoc($result)) {
		array_push($return_arr, $row);
	}
	echo json_encode($return_arr);

	CloseConn();
}

//INSERT INTO `occupiedseats`(`CITY`, `SEATNO`, `NIF`) VALUES ('',0,'');
function AddOcupuesSeats($cityname, $nif, $dest){
	
	Connect();
	$destinations = json_decode(stripslashes($dest));
	foreach ($destinations as $d) {
		$sql = "INSERT INTO occupiedseats(CITY, SEATNO,NIF) VALUES ('".$cityname."',".$d.",'".$nif."')";

		if ($GLOBALS['conn']->query($sql) === TRUE) {
			echo "Added seat".$d;
		} else {
			echo "Error: " . $sql . " -- " . $conn->error;
		}
	}
	echo json_encode(1);
	CloseConn();
}


//Closes connection.
function CloseConn()
{
	$GLOBALS['conn']->close();
}


?>
