$(document).ready(function(){
 
 
        var searching = "<tr><td colspan='5'><center><img src='dist/img/loading2.gif' style='width: 3%;margin-right:15px;'>Loading shops list please wait..</center></td></tr>";
 
       searchFun('','','');
 
      
function searchFun(shpName,shpLat,shpLon){
     $("#shopsList").html(searching);
 
        var str = "shpName="+shpName+"&shpLon="+shpLon+"&shplLat="+shpLat;

          $.ajax({
                  type: "GET",
                  url: searchShop,
                  data: str,
                  dataType :"text",
                  success: function(data) {
                       //alert(data);
                        var returnedData = JSON.parse(data);
                        if(returnedData.status){
                            var list = returnedData.response.shops;
                            var htmlCont = "";
                            var cnt = 1;
                                  $.each(list, function (index, value) {
                                      htmlCont = htmlCont + "<tr>";
                                      htmlCont = htmlCont + "<td>"+cnt+"</td>";
                                      htmlCont = htmlCont + "<td>"+value['shop_name']+"</td>";
                                      htmlCont = htmlCont + "<td>"+value['shop_category']+"</td>";
                                      htmlCont = htmlCont + "<td><a href='https://google.com/maps/search/"+value['shop_location']+"' target='_blank'>"+value['shop_location']+"</a></td>";
                                      htmlCont = htmlCont + "<td>"+value['shop_owner']+"</td>";
                                      htmlCont = htmlCont + "</tr>";
                                      cnt++;
                                        
                                });
                            
                            $("#shopsList").html(htmlCont);
                            
                            
                        }else{
                            swal("Some error occured !", returnedData.message, "error");
                        }
          
                             

                  },
                error: function (jqXHR, exception) {
                    $("#submit_btn").show();
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
                }
                });

}

$('input[name=shpAdr]').change(function() { 
    
      $("#shpLat").val('');
      $("#shpLon").val('');
    
});



$("#search").click(function(){
    
    if($("#shpAdr").val()!==''){
        if($("#shpLat").val() === "" || $("#shpLon").val() === ""){
            swal("Shop location not selected from list, Please select location again", "", "error");
            return false;
        }else{
            searchFun($("#shpName").val(),$("#shpLat").val(),$("#shpLon").val());
        }
    }else{
        searchFun($("#shpName").val(),$("#shpLat").val(),$("#shpLon").val());
    }
        
});

$("#searchAll").click(function(){
            $("#shpName").val('');
            $("#shpLat").val('');
            $("#shpLon").val('');
            $("#shpAdr").val('');
            searchFun('','','');
});


});
