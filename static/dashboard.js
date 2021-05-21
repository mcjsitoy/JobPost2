$(document).ready(function(){   
    var base_url = window.location.origin;    
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
            window.location.href=base_url + '/home/';
            localStorage.setItem('token', data.token);

        },
        error: function(e){
            console.log(e);
          
        }
        }); 
        
    });   
  
    $('#logout_button').click(function(event){
        event.preventDefault();
        $.ajax({
        type: "GET",
        url: base_url + '/accounts/logout',
        data:{          
        },  
        success: function(data){
            window.location.href=base_url + '/home/';
        },
        error: function(e){
            console.log(e);
          
        }
        }); 
        
    });


    $('#view_jobs_btn').click(function(event){       
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: base_url + '/jobs/api/job_list',
            success: function(data){
                console.log(data)
                html_render="";
                $.each(data, function( index, value ) {
                    html_render +="<div class='card-deck text-center'>"+"<div class='col-md-3'>"+"<div class='card mb-2 mt-4' style='width: 20rem;'>"+"<div class='card-body'>"+"<h4 class='card-title'>"+value['id']+value['job_title'] + "</h4>" + value['job_description'] + value['category']+ value['location']+ value['salary_range']+"<br>"+"<button id='apply_btn' class='btn btn-success btn-sm'>"+"Apply"+"</button>"+ " " + "<button id='edit_btn' class='btn btn-success btn-sm'>"+"Edit"+"</button>"+"</div>"+"</div>"+"</div>"+"</div>";                                     
                 console.log(value)                
                });   
                  $("#div_body").html(html_render);                  
                  console.log(html_render);       
                  
                  $('#edit_btn').click(data, function(event,value){
                    event.preventDefault();
                    $.each(data, function( index, value ) {
                    window.location.href= base_url + '/jobs/edit_job/'+value['id']
                    });
                  });
            },
            error: function(e){
                console.log(e);              
            }
            });         
    });
    
    $('#edit_btn').click(function(event){
        windows.location.href= base_url + 'jobs/edit_job/jobs.pk'
      });

    $('#search_btn').click(function(event){       
        event.preventDefault();
        $.ajax({
            type: "GET",
            url: base_url + '/jobs/api/job_search',
            data:{
                // "sj":$("#sj").val(),
                // "csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val(),

            },
            success: function(data){
                console.log(data)
                html_render="";
                $.each(data, function( index, value ) {
                    html_render +="<div class='card-deck text-center'>"+"<div class='col-md-3'>"+"<div class='card mb-2 mt-4' style='width: 20rem;'>"+"<div class='card-body'>"+"<h4 class='card-title'>"+value['job_title'] + "</h4>" + value['job_description'] + value['category']+ value['location']+ value['salary_range']+"<br>"+"<a href="+"{%url 'Jobs:apply_job' %}>"+"<button id='apply_btn' class='btn btn-success'>"+"Apply"+"</button>"+"</a>"+"</div>"+"</div>"+"</div>"+"</div>";                                     
                 console.log(value)
                });   
                  $("#div_body").html(html_render);                  
                  console.log(html_render);      
                  
                 
            },
            error: function(e){
                console.log(e);     
                console.log(data);       
            }
            });         
    });
      
});
