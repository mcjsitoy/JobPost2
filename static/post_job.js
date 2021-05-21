$(document).ready(function(){ 
    var base_url = window.location.origin;
     
      $("#post_job_btn").click(function(event){       
        event.preventDefault();
        $.ajax({
          type: "POST",
          url: base_url + '/jobs/post_job',
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
            window.location.href=base_url + '/home/';
    
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