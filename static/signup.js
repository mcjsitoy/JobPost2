$(document).ready(function(){

  $("#employer_check").click(function(){
    $("#employee_check").prop("checked",false);
   if($(this).prop('checked')){
        $(this).val('True');
        $("#employee_check").val('False');
   }else{
        $(this).val('False');
      }
      console.log($(this).val())
  });
    
$("#employee_check").click(function(){
    $("#employer_check").prop("checked", false);
  if($(this).prop('checked')){
      $(this).val('True');
      $("#employer_check").val('False');
  }else{
      $(this).val('False');
    }
    console.log($(this).val())
});
var base_url = window.location.origin;
  $("#register_btn").click(function(event){
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: base_url + '/accounts/signup/',
      data:{
        "email": $("#email").val(),
        "first_name": $("#first_name").val(),
        "last_name": $("#last_name").val(),
        "password": $("#password").val(),
        "password2": $("#password2").val(),
        "is_employer":$('input[type=checkbox][name="employer_check"]').val(),
        "is_employee":$('input[type=checkbox][name="employee_check"]').val(),
        "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),
      },      
      success: function(data){
        console.log(data)
        html_render=""; 
        html_render +=  
        "<div class='alert alert-success' role='alert'>"+
        "Job Post Successful"+
        "</div>";
        $("#success_div").html(html_render).fadeIn('slow');
        $("#success_div").delay(1000).fadeOut('slow');
        window.setTimeout(function() {
        window.location.href = base_url+ '/accounts/api/login/';
      }, 1000);
       

      },
      error: function(e){
          console.log(e);
          html_render=""; 
          html_render +=              
          "<div class='alert alert-danger'>"+
          "Job Post Failed"+
          "</div>";
          $("#succes_div").html("");
          $("#failed_div").html(html_render).fadeIn('slow');
          $("#failed_div").delay(3000).fadeOut('slow');
      }
    });
  });   
  });
