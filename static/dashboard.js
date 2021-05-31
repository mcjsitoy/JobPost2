$(document).ready(function(){   
    var base_url = window.location.origin;
    var current_user = $("#user").val();
    $.ajax({                         
        type: "GET",
        url: base_url + '/jobs/api/job_list',
        success: function(data){
            console.log(data);
            console.log(current_user);       
            html_render="";
            $.each(data, function( index, value ) {
                job_url = base_url + '/jobs/edit_job/'+value['id'];
                apply_url = base_url +'/jobs/apply_job/'+value['id'];                   
                html_render +="<div class='card-deck text-center'>"+
                "<div class='col-md-3'>"+
                "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
                "<div class='card-body'>"+
                "<h4 class='card-title'>"+
                value['job_title']+ 
                "</h4>" + 
                "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'>Description: "+    
                value['job_description']+ 
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
                (value['job_poster'].id !=current_user?"<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Apply"+"</a>":"")+            
                "</div>"+                      
                "<div class='card-body'>"+(value['job_poster'].id == current_user ? "<a href='"+ job_url+"' id='edit_btn' class='btn btn-success btn-block' role='button'>"+"Edit"+"</a>"+"</div>":"<small>"+"Employer:"+"</small>"+"<button class='btn btn-info btn-block' disabled>"+value['job_poster'].first_name+"</button>")+                    
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
        var current_user = $("#user").val();
        $.ajax({           
            type: "GET",
            url: base_url + '/jobs/api/job_list',
            success: function(data){
                console.log(data);
                console.log(current_user);       
                html_render="";
                $.each(data, function( index, value ) {
                    job_url = base_url + '/jobs/edit_job/'+value['id'];
                    apply_url = base_url +'/jobs/apply_job/'+value['id'];                   
                    html_render +="<div class='card-deck text-center'>"+
                    "<div class='col-md-3'>"+
                    "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
                    "<div class='card-body'>"+
                    "<h4 class='card-title'>"+
                     value['job_title']+ 
                    "</h4>" + value['job_description']+ 
                    value['category']+ value['location']+ 
                    value['salary_range']+
                    "<br>"+
                    "<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-sm'>"+
                    "Apply"+
                    "</a>"+
                    " "+        
                    (value['job_poster'] == current_user ? "<a href='"+ job_url+"' id='edit_btn' class='btn btn-success btn-sm' role='button'>"+"Edit"+"</a>"+"</div>"+"</div>"+"</div>"+"</div>" :"<button class='btn btn-info btn-block' disabled>"+value['job_poster']+"</button>")+                    
                   "</div>"+"</div>"+"</div>"+"</div>";                                     
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
    
    $('#edit_btn').click(function(event){
        windows.location.href= base_url + 'jobs/edit_job/jobs.pk'
      });

    //   jQuery.expr[':'].contains = function(a, i, m) {
    //     return jQuery(a).text().toUpperCase()
    //         .indexOf(m[3].toUpperCase()) >= 0;
    //   };

    //   $('#sj').keyup(function(){
    //     $('.card').removeClass('d-none');
    //     var filter = $(this).val();
    //     $('.card-deck').find('.card .card-body h4:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
    // })
    // $('#jl').keyup(function(){
    //     $('.card').removeClass('d-none');
    //     var filter = $(this).val(); 
    //     $('.card-deck').find('.card .card-body h4:not(:contains("'+filter+'"))').parent().parent().addClass('d-none');
    // })

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
                    job_url = base_url + '/jobs/edit_job/'+value['id'];
                    apply_url = base_url +'/jobs/apply_job/'+value['id'];
                    html_render +="<div class='card-deck text-center'>"+
                    "<div class='col-md-3'>"+
                    "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
                    "<div class='card-body'>"+
                    "<h4 class='card-title'>"+
                    value['job_title']+ 
                    "</h4>" + 
                    "<ul class='list-group list-group-flush'>"+
                    "<li class='list-group-item'>"+
                    value['job_description']+ 
                    "</li>"+
                    "<li class='list-group-item'>"+
                    value['category']+ 
                    "</li>"+
                    "<li class='list-group-item'>"+
                    value['location']+ 
                    "</li>"+
                    "<li class='list-group-item'>"+
                    value['salary_range']+
                    "</li>"+
                    "</ul>"+
                    "<div class='card-body'>"+
                    "<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-block'>"+
                    "Apply"+
                    "</a>"+
                    "</div>"+
                    " "+        
                    "<div class='card-body'>"+(value['job_poster'] == current_user ? "<a href='"+ job_url+"' id='edit_btn' class='btn btn-success btn-block' role='button'>"+"Edit"+"</a>"+"</div>":"")+                    
                    "</div>"+"</div>"+"</div>"+"</div>"+"</div>";              
                    console.log(value);
                   
                });   
                  $("#div_body").html(html_render);                  
                  console.log(html_render);                       
            },
            error: function(e){
                console.log(e); 
                alert('No Jobs with those specifications');
                      
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
                    "<div class='card-body'>"+
                    "<h4 class='card-title'>"+                  
                    value['job_title']+"</br>"+
                    "</h4>" + value['job_description']+"</br>"+ 
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

    




//     $("#applicants_btn").click(function(event){
//         $.ajax({ 
//         type: "GET",
//         url: base_url + '/jobs/view_applicants/',
//         success: function(data){
//             console.log(data)               
//             html_render="";
//             $.each(data, function( index, value ) {
//                 view_applicants_url = base_url + '/jobs/view_applicants/'+value['id'];
//                 html_render +="<div class='card-deck text-center'>"+
//                 "<div class='col-md-3'>"+
//                 "<div class='card mb-2 mt-4' style='width: 20rem;'>"+
//                 "<div class='card-body'>"+
//                 "<h4 class='card-title'>"+                  
//                 value['job_title']+"</br>"+
//                 "</h4>" + value['job_description']+"</br>"+ 
//                 value['category']+ value['location']+"</br>"+
//                 value['salary_range']+"</br>"+
//                 "<a href='"+ view_applicants_url+
//                 "' id='applicants_btn' class='btn btn-success btn-sm' role='button'>"+"View Applicants"+"</a>"+ "</div>"+"</div>"+"</div>"+"</div>";                                                      
//              console.log(value)            
//             });   
//               $("#div_body").html(html_render);                  
//               console.log(html_render);                 
//         },
//         error: function(e){
//             console.log(e);              
//         }
                    
//     });      
// });
});
