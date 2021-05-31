$(document).ready(function(){ 
  
    var base_url = window.location.origin;
      $("#submit_apply").click(function(event){  
        event.preventDefault();
        var formData = new FormData();
        formData.append("applicant",$("#applicant_id").val());
        formData.append("Job",$("#job_id").val());
        formData.append("email",$("#email").val());
        formData.append("first_name",$("#first_name").val());
        formData.append("last_name",$("#last_name").val());
        formData.append("resume",$("#resume").prop('files')[0]);
        formData.append("cover_letter",$("#cover_letter").val());
        var jobpk=$("#job_id").val()
        console.log(base_url + '/jobs/api/apply_job/' + jobpk)
        $.ajax({         
            type: "POST",          
            processData: false,
            contentType: false,                   
            url: base_url + '/jobs/api/apply_job/' +jobpk,
            beforeSend: function( xhr ) {
              xhr.setRequestHeader('X-CSRFToken', $('input[name=csrfmiddlewaretoken]').val());
            }, 
            data: formData,            
            success: function(data){
              console.log(data)
              alert('Application Successful');
            },
            error: function(e){
                console.log(e);
            }
          });
      });       
  });