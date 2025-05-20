 function enhanceLogins(){
 $('p.eLogin').remove(); 
 $('p.eLogin2').remove(); 
// $('div.modal-body input[type=text]').attr("placeholder", "8-digit University ID number (on your ID card)");
// $('b.bbb').remove();
// $('div.modal-body input[type=text]').before('<b class="bbb">Username:</b>');
// $('div.modal-body input[type=password]').attr("placeholder", "Last name, properly capitalized"); 
// $('div.modal-body input[type=password]').before('<b class="bbb">Default password:</b>');
 $('div#login-modal div.modal-body').append('<p class="eLogin">Username: 8-digit University ID number (on your ID card)</p>');
 $('div#login-modal div.modal-body').append('<p class="eLogin">Default password: Last name, properly capitalized</p>'); 	
 $('div#login-modal div.modal-body').append('<p class="eLogin2">We strongly urge you to change your password after the first time you log in. If you can\'t log in, stop by or call the Circulation Desk at Mortensen (860.768.4264) or Allen Library (860.768.4491).</p>'); //eLogin is enhanced Login
}