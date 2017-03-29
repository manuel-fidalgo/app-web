$(document).ready(function(){

	//Also could we use .changed() instead of
    $('.tipo1:first').click(function(){
    	if($('.tipo1:first').is(":checked")){
    		$('.tipo1').prop('checked', true);
    	}else{
    		$('.tipo1').prop('checked', false);
    	}
    });

    $('.tipo2:first').click(function(){
    	if($('.tipo2:first').is(":checked")){
    		$('.tipo2').prop('checked', true);
    	}else{
    		$('.tipo2').prop('checked', false);
    	}
    });

    $('.tipo3:first').click(function(){
        if($('.tipo3:first').is(":checked")){
    		$('.tipo3').prop('checked', true);
    	}else{
    		$('.tipo3').prop('checked', false);
    	}
    });
    //When any checkbox changes
    $('input:checkbox').change(function(){ //Writes all the cheked checkboxes
    	$('#textarea').val("");
    	var names = getNameAllChecked();
    	$('#textarea').val(names.join("\n"));
    });
});

function getNameAllChecked() {
	return ["just","for","testing"];
}