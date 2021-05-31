$(document).ready(function(){ 
    var base_url = window.location.origin;
     
      $("#update_profile_btn").click(function(event){       
        event.preventDefault();
        
        var userpk = $("#userID").val()
        console.log(userpk)
        $.ajax({
          type: "POST",
          url: base_url + '/accounts/api/edit_profile/' + userpk,
          data:{      
                  
            "first_name": $("#first_name").val(),
            "last_name": $("#last_name").val(),
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),            
          },      
          success: function(data){
            console.log(data);
            alert('Profile Successfully Updated');
            
              
          },
          error: function(e){
              console.log(e);
          }       
        });
      });       
      });