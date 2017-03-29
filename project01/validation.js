$(document).ready(function(){
	//Clicks events for the items types
	$('.tipo1:first').change(function(){
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

    //When any checkbox changes
    $('input:checkbox').change(function(){ //Writes all the checked checkboxes
    	$('#textarea').val("");
    	$('#textarea').val(getNameAllChecked());
    	if(getNameAllChecked().length==0) 
    		$('#textarea').hide("fast") 
    	else 
    		$('#textarea').show("fast");
    });
    //Submits the form
    $("#submit-button").click(function(){

    	if($('input.sb:checkbox:checked').length !=0)
    		$('#form').submit();
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
