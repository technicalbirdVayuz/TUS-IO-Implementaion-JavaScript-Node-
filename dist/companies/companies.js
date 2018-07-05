
  
window.addEventListener('load', function() {
   const items = [
      { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
      { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
      { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
      { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
    ]
 var v = new Vue({
        el: "#template",
           data: {
            items:items
        },
        methods: {
            check_login: function(e) {
                e.preventDefault();

                var user_email = $("#user_email_login").val();
                var user_password = $("#user_password_login").val();
                if(user_email == ""){
                  alert("Email Could not be empty");
                  return false;
                }else if(user_password ==""){
                  alert("Email Could not be empty");
                  return false;
                }else if(user_password.length < 4 ){
                  alert("Password should be of minimum 4 characters");
                  return false;
                }else{
                  $("#loader_gif").removeClass("make_it_hidden");
                  axios.post("http://192.168.1.220:3000/check_login_crendentials", {
                    "user_email": user_email,
                    "user_password": user_password
                    }).then((response) => {
                      $("#loader_gif").addClass("make_it_hidden");
                        if (response.data.msg == "wrong credentails") {
                            alert("wrong credentials");
                        } else {
                           document.location.href = "http://192.168.1.220:3000/";

                        }
                    }, (error) => {
                        alert("Error");
                    });
                }
            },
            enter_capture:function(){
              alert("Etner");
            }
        }
    })
})
