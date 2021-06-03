$(document).ready(function(){   
    var base_url = window.location.origin; 
    var id =$("#user_id").val();
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
                "<div class='card-body text-info'>"+
                "<h4 class='card-title'>"+
                value['job_title']+ 
                "</h4>" + 
                "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'> Description: "+
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
                "<a href='"+ view_applicants_url+ "' id='applicants_btn' class='btn btn-success btn-sm' role='button'>"+
                "View Applicants"+
                "</a>"+  
                "</div>"+
                "</div>"+"</div>"+"</div>"+"</div>"+"</div>";                                                      
            console.log(value)            
            });   
            $("#div_posted").html(html_render);                  
            console.log(html_render);                 
        },
        error: function(e){
            console.log(e);
            html_render=""; 
            html_render +=
            "<div class='text-center'>"+
            "<h1>"+"You haven't posted any jobs yet"+"<h1>"
            +"</div>";
            $("#no_post").html(html_render);
            console.log(html_render);        

        }

        });    
        
    });