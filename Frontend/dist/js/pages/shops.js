$(document).ready(function(){
 


$('input[name=shpAdr]').change(function() { 
    
      $("#shpLat").val('');
      $("#shpLon").val('');
    
});





  //Contact
  $('form.addShopForm').submit(function(e) {
      e.preventDefault();
    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input,select').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }
       
        switch (rule) {
          case 'required':
            if (i.val() === '' || i.val() === '0') {
              ferror = ierror = true;
            }
            break;

            case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
           
           case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

           case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;
           case 'selected':
            if (i.val()=='0') {
              ferror = ierror = true;
            }
            break;
          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
           case 'latLon':
            exp = new RegExp(exp);
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;
           case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('div.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });

   //console.log(ferror);
    if (ferror){
        return false;
    } 
    else
    {
        
        if($("#shpLat").val() === "" || $("#shpLon").val() === ""){
            swal("Shop location not selected from list, Please select location again", "", "error");
            return false;
        }
        
        $("#connection_error_div").hide();
              
                var str = $(this).serialize();
    
                var action = $(this).attr('action');
                if( ! action ) {
                  action = insertShop;
                }
        
                
                $("#submit_btn").hide();
                
                
     
                
                $.ajax({
                  type: "POST",
                  url: action,
                  data: str,
                  dataType :"text",
                  success: function(data) {
                        $("#submit_btn").show();
                        var returnedData = JSON.parse(data);
                        if(returnedData.status){
                            swal(returnedData.message, "", "success");
                            $("form").trigger("reset");
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
    return false;
  });

});
