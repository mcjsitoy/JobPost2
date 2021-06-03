$(document).ready(function(){   
    var base_url = window.location.origin;
    var current_user = $("#user").val();
    var status=$("#status").val();
    $.ajax({                         
        type: "GET",
        url: base_url + '/jobs/api/job_list',
        success: function(data){
            console.log(data);
            console.log(current_user);       
            html_render="";
            $.each(data, function( index, value ) {
                details_url = base_url +'/jobs/job_details/'+value['id'];
                job_url = base_url + '/jobs/edit_job/'+value['id'];
                apply_url = base_url +'/jobs/apply_job/'+value['id'];                   
                html_render +="<div class='card-deck text-center'>"+
                "<div class='col-md-3'>"+
                "<div class='card  mb-2 mt-4' style='width: 20rem;'>"+
                "<img class='card-img-top'"+"src=" + value['img']+">"+
                "<div class='card-body text-info'>"+
                "<h4 class='card-title'>"+
                value['job_title']+ 
                "</h4>" + 
                "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'>Description: "+    
                "<p class='description'>"+value['job_description']+ "</p>"+
                "</li>"+
                "<li class='list-group-item'>Category: "+
                value['category']+ 
                "</li>"+
                "<li class='list-group-item'>Location: "+
                value['location']+ 
                "</li>"+
                "<li class='list-group-item'>Salary Range: "+
                value['salary_range']+
                "</li>"+
                "</ul>"+
                "<div class='card-body'>"+
                (value['job_poster'].id !=current_user ?"<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Apply"+"</a>":" ")+
                "<a href='" + details_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Details"+"</a>"+     
                (value['job_poster'].id == current_user ? "<a href='"+ job_url+"' id='edit_btn' class='btn btn-success btn-block' role='button'>"+"Edit"+"</a>"+"</div>":"<small>"+"Employer:"+"</small>"+"<button class='btn btn-info btn-block' disabled>"+value['job_poster'].first_name+"</button>")+           
                "</div>"+                      
                                 
                "</div>"+"</div>"+"</div>"+"</div>"+"</div>";                                     
             console.log(value)            
            });   
              $("#div_body").html(html_render);                  
              console.log(html_render);       
            
        },
        error: function(e){
            console.log(e);   
            html_render=""; 
            html_render +=
            "<div class='text-center'>"+
            "<h1>"+"No Jobs Available Right now"+"<h1>"
            +"</div>";
            $("#div_body").html(html_render);
            console.log(html_render);                   
        }
        });         


    var base_url = window.location.origin;    
    $('#login_btn').click(function(event){
        event.preventDefault();
        $.ajax({
        type: "POST",
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
            html_render=""; 
              html_render +=              
              "<div class='alert alert-danger'>"+
              "Login Failed Please Enter Correct Credentials"+
              "</div>";
              $("#succes_div").html("");
              $("#failed_div").html(html_render).fadeIn('slow');
              $("#failed_div").delay(2000).fadeOut('slow');
          
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
            window.location.href= base_url + '/home/';
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
        var current_user = $("#user").val();
        $.ajax({
            type: "GET",
            url: base_url + '/jobs/api/job_search',
            data:{
                "sj":$("#sj").val(),
                "jl":$("#jl").val(),
                "cat":$("#cat").val(),
                "sal_range":$("#sal_range").val(),
                "csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val(),

            },
            success: function(data){
                console.log(current_user);
                console.log(data)
                html_render="";
                $.each(data, function( index, value ) {
                    var current_user = $("#user").val();
                    job_url = base_url + '/jobs/edit_job/'+value['id'];
                    apply_url = base_url +'/jobs/apply_job/'+value['id'];
                    details_url = base_url +'/jobs/job_details/'+value['id'];
                    html_render +="<div class='card-deck text-center'>"+
                    "<div class='col-md-3'>"+
                    "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
                    "<img class='card-img-top'"+"src=" + value['img']+">"+
                    "<div class='card-body text-info'>"+
                    "<h4 class='card-title'>"+
                    value['job_title']+ 
                    "</h4>" + 
                    "<ul class='list-group list-group-flush'>"+
                    "<li class='list-group-item'>Description: "+
                    "<p class='description'>"+value['job_description']+"</p>"+
                    "</li>"+
                    "<li class='list-group-item'>Category: "+
                    value['category']+ 
                    "</li>"+
                    "<li class='list-group-item'>Location: "+
                    value['location']+ 
                    "</li>"+
                    "<li class='list-group-item'>Salary Range: "+
                    value['salary_range']+
                    "</li>"+
                    "</ul>"+
                    "<div class='card-body'>"+
                    (value['job_poster'].id !=current_user?"<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Apply"+"</a>":" ")+
                    "<a href='" + details_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Details"+"</a>"+    
                    (value['job_poster'].id == current_user ? "<a href='"+ job_url+"' id='edit_btn' class='btn btn-success btn-block' role='button'>"+"Edit"+"</a>"+"</div>":"")+                       
                    "</div>"+                                
                    "</div>"+"</div>"+"</div>"+"</div>"+"</div>";              
                    console.log(value);
                   
                });   
                  $("#div_body").html(html_render);                  
                  console.log(html_render);                       
            },
            error: function(e){
              html_render=""; 
              html_render +=              
              "<div class='alert alert-danger'>"+
              "There are no Jobs that match your search"+
              "</div>";
              $("#failed_div").html(html_render).fadeIn('slow');
              $("#failed_div").delay(3000).fadeOut('slow');
                      
            }
            });         
    });

    $('#view_posted_jobs_btn').click(function(event){ 
        var id = $("#user")
        $.ajax({ 
            type: "GET",
            url: base_url + '/jobs/api/posted_jobs/' + id,
            success: function(data){
                console.log(data)               
                html_render="";
                $.each(data, function( index, value ) {
                    view_applicants_url = base_url + '/jobs/view_applicants/'+value['id'];
                    html_render +="<div class='card-deck text-center'>"+
                    "<div class='col-md-3'>"+
                    "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
                    "<img class='card-img-top'"+"src=" + value['img']+">"+
                    "<div class='card-body'>"+
                    "<h4 class='card-title'>"+                  
                    value['job_title']+"</br>"+
                    "</h4>" +"<p class='description'>"+value['job_description']+"</p>"+"</br>"+ 
                    value['category']+ value['location']+"</br>"+
                    value['salary_range']+"</br>"+
                    "<a href='"+ view_applicants_url+
                    "' id='applicants_btn' class='btn btn-success btn-sm' role='button'>"+"View Applicants"+"</a>"+ "</div>"+"</div>"+"</div>"+"</div>";                                                      
                 console.log(value)            
                });   
                  $("#div_body").html(html_render);                  
                  console.log(html_render);                 
            },
            error: function(e){
                console.log(e);              
            }

            });           
        });
});



   

