$(document).ready(function(){ 
    var base_url = window.location.origin;
     
      $("#update_job_btn").click(function(event){       
        event.preventDefault();
        var this_ = $(this)
        var test = $("#userjID").val()
        console.log(test)
        $.ajax({
          type: "POST",
          url: base_url + '/jobs/api/edit_job/1',
          data:{            
            "job_title": $("#job_title").val(),
            "job_description": $("#job_description").val(),
            "location": $("#location").val(),
            "salary_range": $("#salary_range").val(),
            "category":$("#category").val(),
            "job_poster":$("#userID").val(),
            "csrfmiddlewaretoken": $('input[name="csrfmiddlewaretoken"]').val(),            
          },      
          success: function(data){
            console.log(data)
              
          },
          error: function(e){
              console.log(e);
          }       
        });
      });       
      });