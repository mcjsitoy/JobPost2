$(document).ready(function(){ 
    var base_url = window.location.origin;
     
      $("#post_job_btn").click(function(event){       
        event.preventDefault();
        var formData = new FormData();
        formData.append("job_title",$("#job_title").val());
        formData.append("job_description",$("#job_description").val());
        formData.append("location",$("#location").val());
        formData.append("salary_range",$("#salary_range").val());
        formData.append("category",$("#category").val());
        formData.append("img",$("#img").prop('files')[0]);
        $.ajax({
          type: "POST",
          processData: false,
          contentType: false,  
          url: base_url + '/jobs/post_job',
          beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRFToken', $('input[name=csrfmiddlewaretoken]').val());
          }, 
          data:formData,                 
          success: function(data){
            console.log(data)
              html_render=""; 
              html_render +=              
              "<div class='alert alert-success' role='alert'>"+
              "Job Post Successful"+
              "</div>";
              $("#success_div").html(html_render).fadeIn('slow');
              $("#success_div").delay(3000).fadeOut('slow');

    
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