$(document).ready(function(){
  
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
        "csrfmiddlewaretoken":"window.CSRF_TOKEN",
      },      
      success: function(data){
        console.log(data)
      },
      error: function(e){
          console.log(e);
      }
    });
  });

//   $.ajax({
//     type: "GET",
//     url: base_url + '/accounts/signup/',
//     // data: data,
//     success: function(data){
//       console.log(data)
//        //do something here if success
//     },
//     error: function(e){
//         console.log(e);
//     }
// });
   
  });
