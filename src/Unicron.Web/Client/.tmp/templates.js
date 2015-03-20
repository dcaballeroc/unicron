angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("app/users/users.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section id=Users><h1>Simple Sum</h1><div>1st Number : <input type=number ng-model=vm.firstNumber><br>2nd Number : <input type=number ng-model=vm.secondNumber> <input type=button ng-click=vm.sum() value=ADD><br>Sum : {{vm.result}}</div></section></body></html>");
$templateCache.put("app/users/admin/404.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><div class=container><div class=\"hero-unit center\"><h1>Page Not Found <small><font face=Tahoma color=red>Error 404</font></small></h1><br><p>The page you requested could not be found, either contact your webmaster or try again. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p><p><b>Or you could just press this neat little button:</b></p><a href=/#/home style=\"margin-top: 0; width:auto;\" class=\"btn btn-large btn-info\"><i class=\"icon-home icon-white\"></i> Take Me Home</a></div><br></div></body></html>");
$templateCache.put("app/users/admin/activate-deactivateUsers.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><h1 id=pageTitle>Users</h1><ul class=pager><li class=previous><a ng-click=back()>&larr; Back</a></li><li class=next><a ng-click=next()>Next &rarr;</a></li></ul><table class=\"table table-striped\"><thead><th ng-click=\"sort(\'Name\')\">Name <i ng-if=\"sortCriteria == \'Name\'\" class=\"glyphicon glyphicon-chevron-up\"></i></th><th ng-click=\"sort(\'Email\')\">Email <i ng-if=\"sortCriteria == \'Email\'\" class=\"glyphicon glyphicon-chevron-up\"></i></th><th>Status</th><th></th><th></th></thead><tbody><tr ng-repeat=\"user in users\"><td>{{user.name}}</td><td>{{user.email}}</td><td ng-if=\"user.isActive == true\">Active</td><td ng-if=\"user.isActive == false\">Not Active</td><td><a href=/#/profile/{{user.id}} class=\"btn btn-success btn-sm\">See Profile</a></td><td><button type=button class=\"btn btn-info btn-sm\" ng-click=\"EnableUser({Id: user.id, Enable: !user.isActive})\">Activate / Deactivate</button></td></tr></tbody></table></body></html>");
$templateCache.put("app/users/profile/forgot-password.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section><h4>Forgot Your Password?</h4><form ng-hide=success class=login-form ng-submit=resetPassword()><div class=container><div class=row><div class=col-lg-4><input type=email class=\"form-control col-5\" ng-model=user.email placeholder=\"Enter your Email Address\" required></div><div class=col-lg-2><button type=submit class=btn>Reset Password</button></div></div></div></form><div ng-show=success class=\"alert alert-info\"><strong>Please check your email.</strong> An email has been sent to \"{{user.email}}\" with instructions on how to reset your password and regain access to your account.</div></section></body></html>");
$templateCache.put("app/users/profile/home.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><h1 id=pageTitle>Welcome to Starscream</h1></body></html>");
$templateCache.put("app/users/profile/login.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section><form class=login-form ng-submit=login()><h4>Log In</h4><div class=inputStyle id=input>Email Address<br><input type=email ng-model=user.email required><br></div><div class=inputStyle id=Div1>Password<br><input type=password ng-model=user.password required><br></div><p><input type=checkbox ng-model=rememberMe>Remember Me</p><div id=submit><button type=submit class=btn>Log In</button> &nbsp;<a href=/#/register>Register</a></div><div><a id=forgot-password href=/#/forgot-password>Forgot Password</a></div><div ng-show=error class=\"alert alert-danger alert-dismissible\" role=alert style=\"margin-top: 20px;\"><button type=button class=close data-dismiss=alert>×</button> <strong>Invalid Login</strong> {{error}}</div></form><div><button type=button ng-click=loginFacebook() class=\"btn btn-info\">Login using Facebook</button> <button type=button ng-click=loginGoogle() class=\"btn btn-danger\">Login using Google+</button></div></section></body></html>");
$templateCache.put("app/users/profile/profile.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><h1>{{user.name}}\'s Profile</h1><div ng-show=success class=\"alert alert-dismissible alert-info\"><button type=button class=close data-dismiss=alert>×</button> <strong>Profile updated!</strong></div><div class=\"panel panel-info\"><div class=panel-heading>Details</div><div class=panel-body><form role=form><div class=form-group><label>Name</label> <input type=text ng-change=\"saveChanges = true\" class=form-control ng-model=name></div><div class=form-group><label>Email</label> <input type=email ng-change=\"saveChanges = true\" class=form-control ng-model=email></div><div class=form-group><label>Status</label> <input type=text class=form-control disabled placeholder=Active ng-if=user.isActive> <input type=text class=form-control disabled placeholder=\"No Active\" ng-if=!user.isActive></div><button type=submit ng-show=saveChanges class=\"btn btn-success\" ng-click=updateProfile()>Update</button></form></div></div></body></html>");
$templateCache.put("app/users/profile/registration.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section><form role=form ng-hide=registered class=form-horizontal ng-submit=register()><fieldset><legend>Register a New User Account</legend><div class=form-group><label for=name class=\"col-lg-2 control-label\">Name</label><div class=col-lg-10><input type=text class=form-control ng-model=user.name id=name required placeholder=\"John Doe\"><br></div></div><div class=form-group><label for=name class=\"col-lg-2 control-label\">Phone Number</label><div class=col-lg-10><input type=text class=form-control ng-model=user.phoneNumber id=phoneNumber required placeholder=\"(615) 555-1212\"><br></div></div><div class=form-group><label for=email class=\"col-lg-2 control-label\">Email address</label><div class=col-lg-10><input type=email class=form-control ng-model=user.email id=email required placeholder=johnd@gmail.com><br></div></div><div class=form-group><label for=password1 class=\"col-lg-2 control-label\">Password</label><div class=col-lg-10><input type=password class=form-control ng-model=user.password id=password1 required maxlength=30><br></div></div><div class=form-group><label for=password2 class=\"col-lg-2 control-label\">Confirm Password</label><div class=col-lg-10><input type=password class=form-control ng-model=user.passwordConfirm id=password2 required maxlength><br></div></div><div class=form-group><label for=abilities class=\"col-lg-2 control-label\">Abilities</label><div class=col-lg-4><select id=abilities class=multiselect ng-model=myAbilities ng-options=\"item as item.description for item in abilities\" multiple multiselect-dropdown=\"\"></select></div></div><div class=form-group><div class=\"col-lg-10 col-lg-offset-2\"><button type=submit class=\"btn btn-primary\">Register</button> <button type=button ng-click=cancel() class=\"btn btn-default\" formnovalidate=\"\">Cancel</button></div></div></fieldset></form><div id=confirmation ng-show=registered class=\"alert alert-info\"><strong>Thanks!</strong> Your user account has been registered. You can now <a href=/#/login>log in</a> with the email address and password you just created.</div></section></body></html>");
$templateCache.put("app/users/profile/reset-password.html","<!DOCTYPE HTML><html><head><meta name=viewport content=\"width=device-width, initial-scale=1.0\"><meta http-equiv=X-UA-Compatible content=\"IE=edge\"></head><body><section><h4>Reset Your Password?</h4><form ng-hide=success class=login-form ng-submit=resetPassword()><div class=container><div class=row><div class=col-lg-4><input type=password class=\"form-control col-4\" ng-model=password1 placeholder=\"Enter your new password\" required> <span ng-show=\"password1 && password1.length < 8\" class=\"label label-warning\">Please choose a password that is at least 8 characters long.</span></div><div class=col-lg-4><input type=password class=\"form-control col-4\" ng-model=password2 placeholder=\"Confirm your new password\" required> <span ng-show=\"password1 && !password2\" class=\"label label-info\">Please confirm your password.</span> <span ng-show=\"password1 && password2 && password2!==password1\" class=\"label label-warning\">Not matching</span></div><div class=col-lg-2><button type=submit class=btn ng-disabled=\"!password1 || password1!==password2\">Reset Password</button></div></div></div></form><div class=container><div ng-show=success class=\"alert alert-info\"><strong>Password Reset Complete!</strong> You may now use your new password to <a href=/#/login>log in</a>.</div></div></section></body></html>");}]);