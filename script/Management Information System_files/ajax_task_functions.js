//Shows popup menu
function _jsddm_open(){
  jsddm_canceltimer();
  jsddm_close();
  ddmenuitem = $(this).find('ul');
  //Shows menu
  ddmenuitem.css('visibility', 'visible');
  
  //Get window height
  wh = $(window).height();
  //Get menu position
  offset = ddmenuitem.offset();
  //Get menu height
  mHeight = ddmenuitem.height();
  
  margin = "-" + mHeight + "px";
  if( (offset.top + mHeight) > wh ) ddmenuitem.css('margin-top',margin); 
} 

//Show task listing according to chosen date
function todayAjax(){
  $("#activities-list").html("<div id='loading'><img src='images/ajax-loader.gif'></div>");
 //	$.ajax({url:"index.php?action=add_ajax&hdnAction=getDate&q="+str+"&list_id="+list_id,success:function(html){
  $.ajax({
     url: "index.php?action=add_ajax&hdnAction=getDate",
     data: "date="+task_date +"&list_id="+list_id,
     success: function(taskList){ 
       $("#activities-list").html(taskList);

       //Hack for drop_down.js: UL elements are rendered after drop down script is executed
       $('.jsddm').bind('mouseover', _jsddm_open);
       $('.jsddm').bind('mouseout', jsddm_timer);
       
       //Make sure rollover script is executed when images from AJAX HTML are loaded
      // attachRollovers();
       
     }
   });
}

//Set tasks to show: "todo" tasks
function showTodo(){
  todo = "todo";
  todayAjax();
}

//Set tasks to show: "Done" tasks
function showDone(){
  todo = "done";
  todayAjax();
}

//Delete a task.
//Parameter: task id
function deleteAjax(tid,str){
  var content = $("#dialog-delete").html();
  $("#dialog-delete").html("<div id='loading'><img src='images/ui-anim_basic_16x16.gif'></div>");
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=deleteTask",
    data: "&tid=" + tid,
    success: function(){
      $("#dialog-delete").dialog("close");
      $("#dialog-delete").html(content);
      todayAjax();
    }
  });
}

//Delete a task with refer.
//Parameters: task id, refer id, flag to delete refer
function deleteReferAjax(tid, rid, del){
  var content = $("#dialog-delete-refer").html();
  $("#dialog-delete-refer").html("<div id='loading'><img src='images/ui-anim_basic_16x16.gif'></div>");
  if(del){
    $.ajax({
      url: "ajax/delete_task.php",
      data: "tid=" + rid
    });  
  }
  $.ajax({
    url: "ajax/delete_task.php",
    data: "tid=" + tid,
    success: function(){
      $("#dialog-delete-refer").dialog("close");
      $("#dialog-delete-refer").html(content);
      todayAjax();
    }
  });
}

//Add a new task (deprecated)
//Parameters: task date, what and notes
function addAjax(date, what, notes){
  var content = $("#dialog-add").html();
  $("#dialog-add").html("<div id='loading'><img src='images/ui-anim_basic_16x16.gif'></div>");
  $.ajax({
    type: "POST",
    url: "ajax/add_task.php",
    data: "date=" + date + "&what=" + what + "&notes=" + notes,
    success: function(){
      $( "#dialog-add" ).dialog("close");
      $("#dialog-add").html(content);
      todayAjax();
    }
  });
}

//Move a task to another day
//Parameters: task id, task new date
function redateAjax(tid, date){
  //var content = $("#dialog-redate").html();
  //$("#dialog-redate").html("<div id='loading'><img src='../images//ui-anim_basic_16x16.gif'></div>");
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=reDateTask",
    data: "tid=" + tid + "&date=" + date,
    success: function(){
      $("#dialog-redate").dialog("close");
      //$("#dialog-redate").html(content);
      todayAjax();
    }
  });
}

//Redate a task for Tomorrow or Today
//Parameter: task id, flag to set to Today (1) or Tomorrow (0)
function taskTodayTomorrowAjax(tid, isToday){
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=reDateTask",
    data: "tid=" + tid + "&is_today=" + isToday,
    success: function(){
      todayAjax();
    }
  });    
}

//Mark a task as done
//Parameter: task id
function doneTaskAjax(tid){
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=doneTask",
    data: "tid=" + tid,
    success: function(){
      todayAjax();
    }
  });
}

//Mark a task as ToDo
//Parameter: task id
function todoTaskAjax(tid){
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=todoTask",
    data: "tid=" + tid,

    success: function(){
      todayAjax();
    }
  });
}

//Mark a task as ToDo, from Task Details page
//Parameter: task id
function markAsTodo(tid){
   $.ajax({
    url: "ajax/todo_task.php",
    data: "tid=" + tid,
    success: function(){
      document.location.href ='today.php' ;
    }
  });
}

//Mark a task as Done, from Task Details page
//Parameter: task id
function markAsDone(tid){
  $.ajax({
    url: "ajax/complete_task.php",
    data: "tid=" + tid,
    success: function(){
      document.location.href = 'today.php';
    }
  });
}

//Choose another date for Task listing, using pop up window to choose new date
//Parameter: listing date
function chooseAjax(date){
//  var content = $("#dialog-choose-date").html();
//  $("#dialog-choose-date").html("<div id='loading'><img src='../images//ui-anim_basic_16x16.gif'></div>");
  $.ajax({
     url: "index.php?action=choose_date",
    data: "date=" + date,
    dataType: "xml",
    success: function(xml){
      newDate = $(xml).find('date_label').text();
      $("#dialog-choose-date").dialog("close");
//      $("#dialog-choose-date").html(content);
      $("#date-label").html(newDate);
      if(newDate == 'Today'){
         $('#switcher').css({display:'block'});
         $('#today-item').html('<a href="javascript: setDateAjax(\'0\');">Tomorrow</a>');
      }else{
         $('#switcher').css({display:'none'});
         $('#today-item').html('<a href="javascript: setDateAjax(\'1\');">Today</a>');
      }
      task_date = date;
     // updateAddTaskButton(date);
      todayAjax();
      
    }
  });
}

//Choose another date for Task listing, using task drop down menu (Today, Tomorrow)
//Parameter: flag to set to Today (1) or Tomorrow (0)
function setDateAjax(isToday){
  $.ajax({
    url: "index.php?action=choose_date",
    data: "is_today=" + isToday,
    dataType: "xml",
    success: function(xml){
      newDate = $(xml).find('date_label').text();
      tdate = $(xml).find('date').text();
      $("#date-label").html(newDate);
      if(newDate == 'Today'){
        
         $('#switcher').css({display:'block'});
         $('#today-item').html('<a href="javascript: setDateAjax(\'0\');">Tomorrow</a>');
      }else{
         $('#switcher').css({display:'none'});
         $('#today-item').html('<a href="javascript: setDateAjax(\'1\');">Today</a>');
      }
      task_date = tdate;
      //updateAddTaskButton(tdate);
      todayAjax();
    }
  });
}

//Reassign a Task to another user
//Parameters: Task id, another user's email, create followup task 
function reassignTaskAjax(tid, who){
  $("#dialog-reassign").dialog("close");
  $.ajax({
    url: "index.php?action=add_ajax&hdnAction=reassignTask",
    data: "tid=" + tid + "&who=" + who,
    success: function(){
      //Update task list only for Today page
      if($("#activities-list").attr('id')) todayAjax();
    }
  });
}

//Delete a Task
//Parameter: task id
function deleteTask(tid){
  $( "#dialog-delete" ).dialog({
    show: {effect: "fade"},
    hide: {effect: "fade"},
    modal: "true",
    buttons: { "Cancel": function() { $(this).dialog("close");}, "Delete": function() { $(".ui-button").addClass("hide-me"); deleteAjax(tid); } }
  }
  );  
}

//Delete a Task with Refer
//Parameter: task id, refer id
function deleteTaskRefer(tid,rid){
  $( "#dialog-delete-refer" ).dialog({
    hide: {effect: "fade"},
    modal: "true",
    buttons: { "Cancel": function() { $(this).dialog("close");}, "Delete": function() { $(".ui-button").addClass("hide-me"); deleteReferAjax(tid, rid, $('#refer:checked').val()); } }
  }
  );  
}

//Show Add Task dialog box (deprecated)
function addTask(){
  $( "#dialog-add" ).dialog({
    hide: {effect: "fade"},
    modal: "true",
    buttons: { "Cancel": function() { $(this).dialog("close");}, "Add": function() { $(".ui-button").addClass("hide-me"); addAjax( $('#datepicker').val(), $('#what-task').val(), $('#notes-task').val() ); } }
  }
  );  
}

//Shows Redate Task dialog box
function redateTask(tid){
    dateBox();
  $( "#dialog-redate" ).dialog({
    hide: {effect: "fade"},
    modal: "true",
    buttons: { "Cancel": function() { $(this).dialog("close");}, "Update": function() {
                                                                             
                                                                              $(".ui-button").addClass("hide-me");
                                                                              redateAjax(tid,  $('#txtRedate').val() );
                                                                            
                                                                           } }
  }
  );  
}

//Shows Choose date Dialog box
function chooseDate(){
  $( "#dialog-choose-date" ).dialog({
    hide: {effect: "fade"},
    modal: "true",
    buttons: { "Cancel": function() { $(this).dialog("close");}, "Submit": function() {
                                                                            /*if(isDate($('#txtTodo').val())){*/
                                                                              $(".ui-button").addClass("hide-me");
                                                                              chooseAjax($('#txtTodo').val());
                                                                          /*  }*/
                                                                           } }
  }
  );
}

//Shows Reassign Task Dialog box
function reassignTask(tid){
    $.ajax({
        url: "index.php?action=reassign_email",
        data: "&tid=" + tid,
        dataType: "xml",
        success: function(xml){
        email = $(xml).find('email').text();
            $('#reassign_emailId').val(email);
           
            $( "#dialog-reassign" ).dialog({
            show: {effect: "fade"},
            hide: {effect: "fade"},
            modal: "true",
            buttons: { "Cancel": function() { $(this).dialog("close");}, "Submit": function() { $(".ui-button").addClass("hide-me"); reassignTaskAjax(tid, $('#reassign_emailId').val()); } }
            });
        }
    });

  
}
   
//Check if email doesn't belong to current user, then enable/disable Followup check box
function checkOwnEmail(email){
  $.ajax({
    url: "ajax/is_user_email.php",
    data: "email=" + email,
    success: function(ownemail){
      if(ownemail == 1){
        $("#followup").attr('checked', false);
        $("#followup").attr('disabled', true);
      }else{
        $("#followup").removeAttr('disabled');
      }
    }
  });  
}

//Check if value is a date in format mm/dd/yyyy
function isDate(mydate) {
  myReg = new RegExp("^[0-9]{2}[/]{1}[0-9]{2}[/]{1}[0-9]{4}$");
  if (!myReg.test(mydate) || mydate.substr(0,2) > 12 || mydate.substr(3,2) > 31 || mydate.substr(6,4) < 1900){
    alert("Enter a valid date (mm/dd/yyyy)");
    return false;
  }

  return true;
}


//made by sudik
//show the task as per the list id selected in the dropdown
function show_list(listid){
   $("#activities-list").html("<div id='loading'><img src='images/ajax-loader.gif'></div>");
	  if(listid!=""){
	  list_id=listid;
	  todayAjax();
	  }
	  else{
	     $("#activities-list").html("<div id='loading'><img src='images/ajax-loader.gif'><br><b>Please select a list.</b></div>");
	  }
  }
  
