/*
 *      This is a javascript file used only for the main dashboard (index.html) for getting data from server side using Rest API.
 */

$(document).ready(function(){

setCntSps('--','--','--','--','--');

$.ajax({
  type: "GET",
  url: dashBoard,
  data: "",
  cache: false,
  dataType :"text",
  success: function(data){
      $("#connection_error_div").hide();
      var returnedData = JSON.parse(data);
         

      if(returnedData.status){
          
          var list = returnedData.response.shops_count;
          setCntSps('0','0','0','0','0');
          $.each(list, function (index, value) {
              
                if(value['shop_category'] == 'Mall'){
                    	$("#cnt_mal").html(value['total']);
                }
                 if(value['shop_category'] == 'General Store'){
                    	$("#cnt_gnl").html(value['total']);
                }
                 if(value['shop_category'] == 'Super Market'){
                    	$("#cnt_spr").html(value['total']);
                }
                 if(value['shop_category'] == 'Medical Store'){
                    	$("#cnt_mdl").html(value['total']);
                }
            
                
        });
         // alert(list);
          
          
      }else{
          swal("Some error occured !", "Please try again", "error");

      }
      
  },
    error: function (jqXHR, exception) {
        var msg = '';
        if (jqXHR.status === 0) {
            msg = 'Configuration error';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
	   $("#connection_error_div").show();
       $("#connection_error").html(msg+" (Please check, whether endpoints correctly configured.)");
	   setCntSps('--','--','--','--','--');
    }
});

});

function setCntSps(cnt_gnl,cnt_mal,cnt_spr,cnt_mdl) {
	
	$("#cnt_gnl").html(cnt_gnl);
	$("#cnt_mal").html(cnt_mal);
	$("#cnt_spr").html(cnt_spr);
	$("#cnt_mdl").html(cnt_mdl);
	
}
