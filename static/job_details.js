$(document).ready(function(){   
    var base_url = window.location.origin;
    var id = $("#job_id").val();
    var current_user =$("#user").val();
    $.ajax({                         
        type: "GET",
        url: base_url + '/jobs/api/job_details/' + id,
        success: function(data){
            var current_user =$("#user").val();
            apply_url = base_url +'/jobs/apply_job/'+data['id'];
            console.log(data);
            html_render="";                   
                html_render +=
                "<div class='text-center'>"+
                "<h4>"+
                data['job_title']+ 
                "</h4>" + 
                "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'>Description: "+    
                data['job_description']+ 
                "</li>"+
                "<li class='list-group-item'>Category: "+
                data['category']+ 
                "</li>"+
                "<li class='list-group-item'>Location: "+
                data['location']+ 
                "</li>"+
                "<li class='list-group-item'>Salary Range: "+
                data['salary_range']+
                "</li>"+
                "</ul>"+ "<br>"+
                (data['job_poster'].id !=current_user?"<a href='" + apply_url + "'id='apply_btn' class='btn btn-success btn-block'>"+"Apply"+"</a>":" ")+
                "</div>";                                     
             console.log(data)            
  
              $("#details").html(html_render);                  
              console.log(html_render);       
            
        },
        error: function(e){
            console.log(e);   
            html_render=""; 
            html_render +=
            "<div class='text-center'>"+
            "<h1>"+"No Jobs Available Right now"+"<h1>"
            +"</div>";
            $("#details").html(html_render);
            console.log(html_render);                   
        }
    });           
});