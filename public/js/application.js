$(document).ready(function() {
  // This is called after the document has loaded in its entirety
  // This guarantees that any elements we bind to will exist on the page
  // when we try to bind to them

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

  $('#tweet_form').on('submit',function(e){
    e.preventDefault();
    var data = $(this).serialize();


    $('#tweet_form input').attr('disabled','disabled');
    $('#loader').fadeIn();

    console.log(data);
    $.ajax({
      url: '/tweet',
      type: 'post',
      data: data
    }).done(function(data){
      console.log('jobid:',data);

      var intervalId = setInterval(function(){
        $.ajax({
          url: '/status/' + data,
          type: 'get'
        }).done(function(complete){
          console.log(complete);
          if (complete == "Complete") {
            clearInterval(intervalId);
            $('#loader').fadeOut();
            $('#tweet_form input').removeAttr('disabled');
            $('#tweet_form textarea').val("");
          }
        });

      },3000);

    });
  });

});
