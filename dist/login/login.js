
  
window.addEventListener('load', function() {
    var v = new Vue({
        el: "#login_block",
     
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