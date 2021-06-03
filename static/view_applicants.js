$(document).ready(function(){ 
        var base_url = window.location.origin;     
        var id = $("#job_id").val();  
        $.ajax({           
            type: "GET",
            url: base_url + '/jobs/api/view_applicants/' + id,
            success: function(data){                
                console.log(data)               
                html_render="";
                $.each(data, function( index, value ) {                      
                    var accept = base_url + '/jobs/api/employer_accept/'+value['id'];
                    var decline = base_url + '/jobs/api/employer_decline/'+value['id']; 
                    var resume = base_url+ value['resume'];  
                    html_render +=                   
                    "<tr>"+
                    "<td>"+value['email']+"</td>"+
                    "<input type='hidden' id='app_id' value=>"+
                    "<td>"+value['first_name']+"</td>"+
                    "<td>"+value['last_name']+"</td>"+
                    "<td>"+value['cover_letter']+"</td>"+
                    "<td>"+
                    "<a href="+resume+" "+"download"+">"+ "Download"+
                    "</a>"+
                    "</td>"+  
                    "<td>"+ "<p id='accepted'>"+"</p>"+                 
                    (value['is_accepted']==false && value['is_declined']==false ? "<td>"+"<button onclick="+"'accept_employee("+value['id']+")'" + "id='accept' class='btn btn-success btn-sm' >" +"Accept"+"</button>"+"</td>"+"<td>"+"<button onclick="+"'decline_employee("+value['id']+")'"+ "id='decline'class='btn btn-danger btn-sm'>"+"Decline"+"</button>":value['is_declined']==true?"<td>"+"<button class='btn btn-danger btn-sm' disabled>"+"Declined"+"</button>"+"</td>":"<td>"+"<button class='btn btn-success btn-sm' disabled>"+"Accepted"+"</button>")+                                 
                    "</tr>";                
                console.log(value)                                
                });   
                $("#body_table").html(html_render);                  
                console.log(html_render);                       
            },
            error: function(e){
                console.log(e);   
                $("#applicant_head").text("No Applicants Yet")     
            }
            });  
        });
        function decline_employee(data){
            var base_url = window.location.origin;  
            
            
            $.ajax({
                type: "POST",
                url: base_url + '/jobs/api/employer_decline/'+data ,
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
        
        function accept_employee(data){
            
            var base_url = window.location.origin;  
            
            $.ajax({
                type: "POST",
                url: base_url + '/jobs/api/employer_accept/'+data,
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

       

      
      
            
          

            
       
    