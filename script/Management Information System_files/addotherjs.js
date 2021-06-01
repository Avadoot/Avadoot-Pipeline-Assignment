    function fn_Autofill(str)
    {
        document.getElementById("auto_fill_email").style.display="block";
            $.ajax({url:"index.php?action=add_Otherajax&sub_action=autofill&val="+str,
                success:function(html){
		          $("#auto_fill_email").html(html);
		}});
 
    }
    
    
    function fn_takeEmailInside(str)
    {
        $("#txtWho").val(str);
        document.getElementById("auto_fill_email").style.display="none";
    }