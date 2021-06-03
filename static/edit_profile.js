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
            html_render=""; 
            html_render +=
            "<div class='alert alert-success' role='alert'>"+
              "Job Post Successful"+
              "</div>";
            $("#success_div").html(html_render).fadeIn('slow');
            $("#success_div").delay(2000).fadeOut('slow');
              
          },
          error: function(e){
            console.log(e);
            html_render=""; 
            html_render +=  
            "<div class='alert alert-danger'>"+
              "Job Post Failed"+
              "</div>";
            $("#failed_div").html(html_render).fadeIn('slow');
            $("#failed_div").delay(2000).fadeOut('slow');
          }       
        });
      });       
      });