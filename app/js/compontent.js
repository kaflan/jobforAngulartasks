function DetailController($http) {
 var self = this;
 var user_login = "demoIikoCheckList@demo.net"
 var user_secret ="demo357123";
 var url = 'http://iikochecklist.iiko.ru:8096' +"/api/0/auth/access_token?user_login="+user_login+"&"+"user_secret="+user_secret;
 $http.get(url).then(function(res){
  //  console.log(res.data);
   var access_token = res.data.accessToken
   var org_id = res.data.organizationInfo.id;
   var url2 = 'http://iikochecklist.iiko.ru:8096' + '/api/0/check_list/get_nomenclature?access_token='+access_token+'&org_id='+org_id;
   $http.get(url2).then(function(res2){
     console.log('res2',res2.data.taskPatterns);
     self.tasks = res2.data.taskPatterns;
   });
 });
}
angular.module('App', [])
.controller('mainCtrl', DetailController);
