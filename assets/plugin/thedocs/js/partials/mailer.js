
/**
 * Send a form details to the sendmail.php file.
 */

+function($){

  page.initMailer = function() {

    var validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    $('[data-form="mailer"]').each(function(){

      var form = $(this);
      var email = form.find('[name="email"]');
      var message = form.find('[name="message"]');

      form.on('submit', function(){

        form.children('.alert-danger').remove();

        if ( email.length ) {
          if ( email.val().length < 1 || ! validEmail.test( email.val() ) ) {
            email.addClass('is-invalid');
            return false;
          }
        }


        if ( message.length ) {
          if ( message.val().length < 1 ) {
            message.addClass('is-invalid');
            return false;
          }
        }


        $.ajax({
          type: "POST",
          url: form.attr('action'),
          data: form.serializeArray(),
        })
        .done( function( data ) {
          var response = $.parseJSON( data );
          if ( 'success' == response.status ) {
            form.find('.alert-success').fadeIn(1000);
            form.find(':input').val('');
          }
          else {
            form.prepend('<div class="alert alert-danger">'+ response.message +'</div>');
            console.log( response.reason )
          }
        });

        return false;
      });

      email.on('focus', function() {
        $(this).removeClass('is-invalid');
      });

      message.on('focus', function() {
        $(this).removeClass('is-invalid');
      });

    });

  }

}(jQuery);

