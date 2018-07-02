// import axios from 'axios';
var  v = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    daa: true,
    testing: [
    {hidden_element : "Ankit"},
    {hidden_element : "Arun"},
    {hidden_element : "Kuta"},
    ]
  },
  methods:{
  	function_name:function(){
  		alert("Have a GoodDay");
  	},
     getProducts: function () {
      alert("Get")
      axios.get("http://localhost:3000/fetch")
      .then((response)  =>  {
      var d =JSON.stringify(response);
      alert(d);
        this.testing= [
    {hidden_element : "Ankit"},
    {hidden_element : "Arun"},
    {hidden_element : "Kuta"},
    {hidden_element : "Kutaaaaaa"},
    ];
      }, (error)  =>  {
        alert("Error");
      });
    }
  }
})