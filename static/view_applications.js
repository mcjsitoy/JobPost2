$(document).ready(function(){ 
    

    var base_url = window.location.origin; 
    var id =$("#user_id").val();                                            
    $.ajax({           
        type: "GET",
        url: base_url + '/jobs/api/view_applications/' + id,
        success: function(data){                
            console.log(data)               
            html_render="";        
                $.each(data, function(index, value) {                                   
                    html_render +=                   
                    "<tr>"+
                    "<td>"+value['Job'].job_title+""+"</td>"+              
                    "<td>"+value['email']+"</td>"+
                    "<td>"+value['date_applied']+"</td>"+
                    (value['is_declined']==true?"<td>"+"<button class='btn btn-dark btn-sm' disabled>"+"Employer Declined"+"</button>"+"</td>":value['is_accepted']==true? value['ee_is_accepted']==false && value['ee_is_declined']==false? "<td>"+"<button onclick="+"'accept_job("+value['id']+")'" + "id='accept' class='btn btn-success btn-sm' >" +"Accept"+"</button>"+"</td>"+"<td>"+"<button onclick="+"'decline_job("+value['id']+")'"+ "id='decline'class='btn btn-danger btn-sm'>"+"Decline"+"</button>":value['ee_is_declined']==true?"<td>"+"<button class='btn btn-danger btn-sm' disabled>"+"Declined"+"</button>"+"</td>"+"<td>"+" "+"</td>":"<td>"+"<button class='btn btn-success btn-sm' disabled>"+"Accepted"+"</button>"+"</td>"+"<td>"+" "+"</td>":"<td>"+"<button class='btn btn-warning btn-sm' disabled>"+"Pending"+"</button>"+"</td>"+"<td>"+" "+"</td>")+                                                  
                    "</tr>";                
                console.log(value)                                
                });   
                $("#body_table").html(html_render);                  
                console.log(html_render);
                console.log($("tr").length-1);  
        },
        error: function(e){
            console.log(e);     
            $("#application_head").html("You didn't apply to any jobs")
           
        
        }
        });  
    });


    function decline_job(data){
        var base_url = window.location.origin;  
               
        $.ajax({
            type: "POST",
            url: base_url + '/jobs/api/employee_decline/'+data ,
            data:{                  
                "csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val(),
            },
            success: function(data){
                console.log(data); 
                window.location.reload();           
            },
            error: function(e){
                console.log(e)
            },
        }); 
    }
    
    function accept_job(data){       
        var base_url = window.location.origin;  
        
        $.ajax({
            type: "POST",
            url: base_url + '/jobs/api/employee_accept/'+data,
            data:{                                  
                "csrfmiddlewaretoken":$('input[name="csrfmiddlewaretoken"]').val(),
            },
            success: function(data){
                console.log(data);
                window.location.reload(); 
                
                       
            },
            error: function(e){
                console.log(e)
            },
        }); 
    }           

