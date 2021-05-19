$(document).ready(function(){   
    
    $('#login_btn').click(function(event){
        event.preventDefault();
        $.ajax({
        type: "POST",
        // headers: {"Authorization": "Token"  },
        url: base_url + '/accounts/login/',
        data:{
            "email": $("#email").val(),
            "password": $("#password").val(),
            "csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val(),         
        },  
        success: function(data){
            console.log(data)
            // window.location.href=base_url + '/landpage/';
            localStorage.setItem('token', data.token);
        },
        error: function(e){
            console.log(e);
          
        }
        }); 
        
    });
    var base_url = window.location.origin;
});
