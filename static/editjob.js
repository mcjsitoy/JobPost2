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
            alert('Job Updated Succesfully')
              
          },
          error: function(e){
              console.log(e);
          }       
        });
      });       
      });