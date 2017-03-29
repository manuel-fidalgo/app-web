$(document).ready(function(){
	//instead of .changed() 
	$('.tipo1:first').click(function(){
		$('.tipo1').prop('checked', $('.tipo1:first').is(':checked'));
	});

	$('.tipo2:first').click(function(){
		$('.tipo2').prop('checked', $('.tipo2:first').is(':checked'));
	});

	$('.tipo3:first').click(function(){
		$('.tipo3').prop('checked', $('.tipo3:first').is(':checked'));
	});
    //When any checkbox changes
    $('input:checkbox').change(function(){ //Writes all the checked checkboxes
    	$('#textarea').val("");
    	$('#textarea').val(getNameAllChecked());
    	if(getNameAllChecked().length==0) 
    		$('#textarea').hide("fast") 
    	else 
    		$('#textarea').show("fast");
    });

    $("#submit-button").click(function(){

    	if($("input.sb:checkbox").prop("checked")) //BUG HERE
    		submitForm();
    	else
    		alert("Debe selecionar almenos un item."); 
    });
});
function submitForm() {

	// body...
}
function getNameAllChecked() {
	var array = $('input.sb:checkbox:checked').map(function(){
		return $(this).val();
	}).get();
	return array.sort().join("\n");
}

/*
if($('.tipo1:first').is(":checked")){
	$('.tipo1').prop('checked', true);
}else{
	$('.tipo1').prop('checked', false);
}
*/