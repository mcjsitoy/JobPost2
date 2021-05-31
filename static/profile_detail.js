$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: base_url + '/jobs/api/profile_detail',
        success: function(data){
        },
        error: function(e){
            console.log(e)
        }
    });
});