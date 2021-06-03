$(document).ready(function(){ 
    var base_url = window.location.origin;
     
      $("#update_job_btn").click(function(event){       
        event.preventDefault();
        
        var jobpk = $("#userID").val()
        console.log(jobpk)
        $.ajax({
          type: "POST",
          url: base_url + '/jobs/api/edit_job/' + jobpk,
          data:{            
            "job_title": $("#job_title").val(),
            "job_description": $("#job_description").val(),
            "location": $("#location").val(),
            "salary_range": $("#salary_range").val(),
            "category":$("#category").val(),
            "job_poster":$("#userjID").val(),
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),            
          },      
          success: function(data){
            console.log(data)
            html_render=""; 
            html_render +=              
            "<div class='alert alert-success'>"+
            "Update Successful"+
            "</div>";
            $("#success_div").html(html_render).fadeIn('slow');
            $("#success_div").delay(2000).fadeOut('slow');
              
          },
          error: function(e){
            console.log(e);
            html_render=""; 
            html_render +=              
            "<div class='alert alert-danger'>"+
            "Update Failed"+
            "</div>";
            $("#failed_div").html(html_render).fadeIn('slow');
            $("#failed_div").delay(2000).fadeOut('slow');
          }       
        });
      });       
      });