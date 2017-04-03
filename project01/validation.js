$(document).ready(function(){

	$('.tipo1:first').change(function(){//Clicks events for the items types
		$('.tipo1').prop('checked', $('.tipo1:first').is(':checked'));
	});
	$('.tipo2:first').change(function(){
		$('.tipo2').prop('checked', $('.tipo2:first').is(':checked'));
	});
	$('.tipo3:first').change(function(){
		$('.tipo3').prop('checked', $('.tipo3:first').is(':checked'));
	});
	$('.cb').click(function() {
    	var str = '[value="'+$(this).text()+'"]';
		$(str).prop('checked', !$(str).is(':checked'));
		$(str).trigger("change"); //forces the change event.
    });
    $('input:checkbox').change(function(){ //When any checkbox changes it Writes all the checked checkboxes
    	$('#textarea').val("");
    	$('#textarea').val(getNameAllChecked());
    	if(getNameAllChecked().length==0) 
    		$('#textarea').hide("fast") 
    	else 
    		$('#textarea').show("fast");
    });
    $("#submit-button").click(function(){ //Submits the form
    	if($('input.sb:checkbox:checked').length !=0)
    		event.preventDefault();
    	else
    		alert("Debe selecionar almenos un item."); 
    });
});
function getNameAllChecked() {
	var array = $('input.sb:checkbox:checked').map(function(){ 
		return $(this).val();
	}).get();
	return array.sort().join("\n");
}