var http = require('http');
var fs = require('fs');
var url = require('url');
var dt = require('./timemodule.js');
var path = require('path');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
http.createServer(function (req, res) {
  var counter = 0;
  if (!req.url.includes('.js') && !req.url.includes('.css') && !req.url.includes('.jpg') && !req.url.includes('.png')) {
    console.log(req.url + "this is the req.url");
    if (req.url == '/') {
      fs.readFile('htmlout.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<p>Please Enter Your credentials. </p>');
        res.write('<form name="login" method="post" action="/User" >');
        res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
        res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
        res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
        res.write('</form>');
        res.write('<form action="/Register" method="post">')
        res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
        res.write('</form>');
        res.write('</div>')
        printFooter(res);
        //footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }    
    else if (req.url =='/Register') {
      fs.readFile('htmlout.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<br>Please Enter Your credentials. </br>');
        res.write('<form name="makeuser" method="post" action="/createduser" >');
        res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
        res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
        res.write('Reenter Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum"  name = "Re-Password" id="Re-Password" placeholder="" required="required">');
        res.write('Email: <input type="text" class="form-control" name = "Email" id="Email" placeholder="" required="required">');
        res.write('Phonenumber: <input type="text" class="form-control" name = "Phonenumber" id="Username" placeholder="" required="required">');
        res.write('Are you USC affiliated? ');
        res.write('<input type="radio" name="Affiliated?" required="required" value="yes";/>Yes ');
        res.write('<input type="radio" name="Affiliated?" required="required" value="no";/>No');
        res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
        res.write('</form>');
        res.write('<form action="/" method="post">')
        res.write('</br><button type="submit" id="newuser" class="btn btn-danger">Go Back to Log in</button>');
        res.write('</form>');
        res.write('</div>')
        res.write('<p class="ex1"> </p>');
        printFooter(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url =='/createduser') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        if (body == '' || body == 'undefined') {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> An ERROR OCCURED Please relog in. Sorry about the inconvience... ');
            res.write('</div>');
            res.write('<p>Please Enter Your credentials. </p>');
            res.write('<form name="login" method="post" action="/User" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
            res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('<form action="/Register" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
            res.write('</form>');
            res.write('</div>')
            res.write('<p class="ex1"> </p>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        var username = body.split('Username=')[1].split('&')[0];
        var password = body.split('Password=')[1].split('&')[0];
        var password2 = body.split('Re-Password=')[1].split('&')[0];
        var email = body.split('Email=')[1].split('&')[0];
        var phonenumber = body.split('Phonenumber=')[1].split('&')[0];
        var affiliated = body.split('&Affiliated%3F=')[1];
        if (password.trim() != password2.trim()) {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> Passwords Do Not Match');
            res.write('</div>');
            res.write('</br>Please Enter Your credentials. </br>');
            res.write('<form name="makeuser" method="post" action="/createduser" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
            res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
            res.write('Reenter Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum"  name = "Re-Password" id="Re-Password" placeholder="" required="required">');
            res.write('Email: <input type="text" class="form-control" name = "Email" id="Email" placeholder="" required="required">');
            res.write('Phonenumber: <input type="text" class="form-control" name = "Phonenumber" id="Username" placeholder="" required="required">');
            res.write('Are you USC affiliated? ');
            res.write('<input type="radio" name="Affiliated?" value="yes";/>Yes ');
            res.write('<input type="radio" name="Affiliated?" value="no";/>No');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('</form>');
            res.write('<form action="/" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">Go Back to Log in</button>');
            res.write('</form>');
            res.write('</div>')
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        else {
        var spawn = require("child_process").spawn;
        var pyFile = 'insert.py';
        const pyspawn = spawn('python', [pyFile, username, password, email, phonenumber, affiliated]);
        pyspawn.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          var str = String.fromCharCode.apply(null, data);
          if (str.trim() === "True".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('</div>')
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          else {
            console.log(String.fromCharCode.apply(null, data))
            fs.readFile('htmlout.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> Username Already Taken');
              res.write('</div>');
              res.write('<form name="makeuser" method="post" action="/createduser" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
              res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
              res.write('Reenter Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum"  name = "Re-Password" id="Re-Password" placeholder="" required="required">');
              res.write('Email: <input type="text" class="form-control" name = "Email" id="Email" placeholder="" required="required">');
              res.write('Phonenumber: <input type="text" class="form-control" name = "Phonenumber" id="Username" placeholder="" required="required">');
              res.write('Are you USC affiliated? ');
              res.write('<input type="radio" name="Affiliated?" value="yes";/>Yes ');
              res.write('<input type="radio" name="Affiliated?" value="no";/>No');
              res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('</form>');
              res.write('<form action="/" method="post">')
              res.write('</br><button type="submit" id="newuser" class="btn btn-danger">Go Back to Log in</button>');
              res.write('</form>');
              res.write('</div>')
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
        });
        pyspawn.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        pyspawn.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
        }
      });
    }
    else if (req.url == '/User') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        if (body == '' || body == 'undefined') {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> An ERROR OCCURED Please relog in. Sorry about the inconvience... ');
            res.write('</div>');
            res.write('<p>Please Enter Your credentials. </p>');
            res.write('<form name="login" method="post" action="/User" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
            res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('<form action="/Register" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
            res.write('</form>');
            res.write('</div>')
            res.write('<p class="ex1"> </p>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        else {
          var username = body.split('Username=')[1].split('&')[0];
          var password = body.split('Password=')[1];
          var spawn = require("child_process").spawn;
          var pyFile = 'finduser.py';
          const pyspawn = spawn('python', [pyFile, username, password]);
          pyspawn.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            var str = String.fromCharCode.apply(null, data);
            console.log('The type is: ' + Object.prototype.toString.call(str) + " for data: " + str) ;
            console.log('The str is : ' + str);
            console.log('The type is: ' + Object.prototype.toString.call("True") + " for data: " + "True") ;
            if (str.trim() === "True".trim()) {
              console.log('logged in');
              fs.readFile('interface.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.write("<div class='alert alert-success'>");
                res.write('<strong>Log in Success!</strong>');
                res.write('</div>');
                res.write('</br>');
                res.write('<div class="row">');
                res.write('<div class="col-xs-10 col-sm-3">');
        
                res.write('<nav class="navbar navbar-inverse navbar-fixed-left" style="background-color:#F8F8F8;">');
                res.write('  <div class="navbar-header">');
                res.write('    <a class="navbar-brand" href="/research"><span style = "color:#000099">Our Reserach</span></a>');
                res.write('  </div>');
                res.write('  <div id="navbar" class="navbar-collapse collapse">');
                res.write('    <ul class="nav navbar-nav">');
                res.write('      <li><a href="/home"><span style = "color:#900">Home</span></a></li>');
                res.write('         <li role="separator" class="divider"></li>');
                res.write('     <li class="dropdown">');
                res.write('        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span style = "color:#900">Research</span></a>');
                res.write('      <ul class="dropdown-menu">');
                res.write('         <li><a href="/DevAssessmentsAIG">Developing Assessments using</br>Automatic Item Generation</a></li>');
                res.write('           <li role="separator" class="divider"></li>');
                res.write('         <li><a href="/compbaseirtgen">Component-based Item</br>Response Theory using</br>Generalized Component</br>Structured Analysis</a></li>');
                res.write('           <li role="separator" class="divider"></li>');
                res.write('         <li><a href="/nonlingrowth">Nonlinear Growth Mixture</br>Modeling utilizing Fractional</br>Polynomials, Spline Models, </br>Accelerated Longitudinal Modeling, </br>Parametric Truncated</br>Logistic Models, etc.</a></li>');
                res.write('           <li role="separator" class="divider"></li>');
                res.write('         <li><a href="/mathphysmed">Mathematics Physiology in Medicine</a></li>');
                res.write('     </ul>');
                res.write('   </li>');
                res.write('      <li><a href="/Training"><span style = "color:#900">Training</span></a></li>');
                res.write('  </ul>');
                res.write(' </div>');
                res.write(' </nav>');
                res.write('</div>');
                
                res.write('<div class="col-xs-10 col-sm-9">');
                res.write('<h2 style = "color:#900; margin-bottom:0px;">Biostatics Core</span></h2>');
                res.write('<hr style = "height:1px;border-color:#ffcc00; " >');

                res.write("<p><strong><span style = 'color:#000000'>Mission</span></strong>: Biostatistics Core team generates interdisciplinary collaborations between CHLA, HSC, and USC investigators for cutting-edge human science research. Our team provides (1) consultations on grant development, study design, statistical analysis, reporting the results, and manuscript preparation, (2) workshops on foundational and advanced quantitative methods, and (3) state-of-art biostatistical methods. In addition, our team generates our own research agenda in the area of biostatistics, which bolsters and boosts the research activities in CHLA, HSC, and USC.</p>");
                res.write("<p><strong><span style = 'color:#000000'>Biostatistics Research Collaboration</span></strong>: Our team consists of three members: a full-time faculty in the Saban Research Institute (TSRI) of the CHLA with a joint appointment in the Keck School of Medicine of the USC, and two full-time biostatisticians in TSRI. Our areas of expertise include but are not limited to:</p>");
                res.write('<ul>');
                res.write('<li>Generalized Linear Models</li>');
                res.write('<li>Latent Variable Models</li>');
                res.write('<li>Multilevel Modeling</li>');
                res.write('<li>Longitudinal Data Analysis</li>');
                res.write('<li>Psychometrics</li>');
                res.write('<li>Structural Equation Modeling</li>');
                res.write('<li>Survival Analysis</li>');
                res.write('<li>Meta-Analysis</li>');
                res.write('<li>Preventive Science</li>');
                res.write('<li>Clinical Trials</li>');
                res.write('<li>Neuroscience</li>');
                res.write('<li>Big Data Analysis</li>');
                res.write('</ul>');
                res.write("<p><strong><span style = 'color:#000000'>Grant Development</span></strong>: Pre-award grant support is provided with the intention of developing a collaborative environment that will lead to funding success. Our team assists in grant development with the expectation in the principal investigator who will invite our team to be a co-investigator or biostatistician on the project. Our team provides consultations in the study design, power analysis, and analytic plan. The level of funding support needed will vary by project.</p>");
                res.write("<p><strong><span style = 'color:#000000'>How the Biostatistics Core works</span></strong>: Investigators interested in our service in your grant applications or writing manuscripts can make a request by completing the online meeting request form. This form only needs to be completed once per project. Once submitted with relevant study background materials, you will be contacted to schedule a meeting. Most funding applications take extensive planning and forethought and adequate lead time on grant development efforts is needed and appreciated.</p>");
                res.write("<p><strong><span style = 'color:#000000'>Biostatistics Core Projects</span> </strong>: Our team leads the following projects:</p>");
                res.write('<ul>');
                res.write('<li><span style = "color:#000000">Developing Assessments using Automatic Item Generation</span></li>');
                res.write('<li><span style = "color:#000000">Component-based Item Response Theory using Generalized Component Structured Analysis</span></li>');
                res.write('<li><span style = "color:#000000">Nonlinear Growth Mixture Modeling utilizing Fractional Polynomials, Spline Models, Accelerated Longitudinal Modeling, Parametric Truncated Logistic Models, etc. </span></li>');
                res.write('<li><span style = "color:#000000">Mathematics Physiology in Medicine</span></li>');
                res.write('</ul>');
                res.write("<p><strong><span style = 'color:#000000'>Contact Information</span></strong>: If you have questions or would like to discuss your needs, contact Dr. Ji Hoon Ryoo at jr3gv@virginia.edu </span></p>");
                res.write('</div>');
                res.write('</div>');
                res.write('</div>');
                footbot(res);
                res.write('</div>');
                res.write('</body>');
                res.write('</html>');  
                res.end();
              });
            }
            else {
              fs.readFile('htmlout.html', function(err, data) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.write('<div class="alert alert-danger">');
                res.write('<strong>ERROR!</strong> Incorrect Username or Password ');
                res.write('</div>');
                res.write('<p>Please Enter Your credentials. </p>');
                res.write('<form name="login" method="post" action="/User" >');
                res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
                res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
                res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
                res.write('</form>');
                res.write('<form action="/Register" method="post">')
                res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
                res.write('</form>');
                res.write('</div>')
                res.write('<p class="ex1"> </p>');
                printFooter(res);
                res.write('</div>');
                res.write('</body>');
                res.write('</html>');  
                res.end();
              });
            }
          });
          pyspawn.stderr.on('data', (data) => {
            console.log(`stderr: ${data}`);
          });
          pyspawn.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          });
        }
      });
    }
    else if (req.url == '/home') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('</br>');
        res.write('<div class="row">');
        res.write('<div class="col-xs-10 col-sm-3">');

        res.write('<nav class="navbar navbar-inverse navbar-fixed-left" style="background-color:#F8F8F8;">');
        res.write('  <div class="navbar-header">');
        res.write('    <a class="navbar-brand" href="/research"><span style = "color:#000099">Our Reserach</span></a>');
        res.write('  </div>');
        res.write('  <div id="navbar" class="navbar-collapse collapse">');
        res.write('    <ul class="nav navbar-nav">');
        res.write('      <li><a href="/home"><span style = "color:#900">Home</span></a></li>');
        res.write('         <li role="separator" class="divider"></li>');
        res.write('     <li class="dropdown">');
        res.write('        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span style = "color:#900">Research</span></a>');
        res.write('      <ul class="dropdown-menu">');
        res.write('         <li><a href="/DevAssessmentsAIG">Developing Assessments using</br>Automatic Item Generation</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/compbaseirtgen">Component-based Item</br>Response Theory using</br>Generalized Component</br>Structured Analysis</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/nonlingrowth">Nonlinear Growth Mixture</br>Modeling utilizing Fractional</br>Polynomials, Spline Models, </br>Accelerated Longitudinal Modeling, </br>Parametric Truncated</br>Logistic Models, etc.</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/mathphysmed">Mathematics Physiology in Medicine</a></li>');
        res.write('     </ul>');
        res.write('   </li>');
        res.write('      <li><a href="/Training"><span style = "color:#900">Training</span></a></li>');


        res.write('  </ul>');
        res.write(' </div>');
        res.write(' </nav>');
        
        res.write('</div>');
        res.write('<div class="col-xs-10 col-sm-9">');
        res.write('<h2 style = "color:#900; margin-bottom:0px;">Biostatics Core</span></h2>');
        res.write('<hr style = "height:1px;border-color:#ffcc00; " >');
        res.write("<p><strong><span style = 'color:#000000'>Mission</span></strong>: Biostatistics Core team generates interdisciplinary collaborations between CHLA, HSC, and USC investigators for cutting-edge human science research. Our team provides (1) consultations on grant development, study design, statistical analysis, reporting the results, and manuscript preparation, (2) workshops on foundational and advanced quantitative methods, and (3) state-of-art biostatistical methods. In addition, our team generates our own research agenda in the area of biostatistics, which bolsters and boosts the research activities in CHLA, HSC, and USC.</p>");
        res.write("<p><strong><span style = 'color:#000000'>Biostatistics Research Collaboration</span></strong>: Our team consists of three members: a full-time faculty in the Saban Research Institute (TSRI) of the CHLA with a joint appointment in the Keck School of Medicine of the USC, and two full-time biostatisticians in TSRI. Our areas of expertise include but are not limited to:</p>");
        res.write('<ul>');
        res.write('<li>Generalized Linear Models</li>');
        res.write('<li>Latent Variable Models</li>');
        res.write('<li>Multilevel Modeling</li>');
        res.write('<li>Longitudinal Data Analysis</li>');
        res.write('<li>Psychometrics</li>');
        res.write('<li>Structural Equation Modeling</li>');
        res.write('<li>Survival Analysis</li>');
        res.write('<li>Meta-Analysis</li>');
        res.write('<li>Preventive Science</li>');
        res.write('<li>Clinical Trials</li>');
        res.write('<li>Neuroscience</li>');
        res.write('<li>Big Data Analysis</li>');
        res.write('</ul>');
        res.write("<p><strong><span style = 'color:#000000'>Grant Development</span></strong>: Pre-award grant support is provided with the intention of developing a collaborative environment that will lead to funding success. Our team assists in grant development with the expectation in the principal investigator who will invite our team to be a co-investigator or biostatistician on the project. Our team provides consultations in the study design, power analysis, and analytic plan. The level of funding support needed will vary by project.</p>");
        res.write("<p><strong><span style = 'color:#000000'>How the Biostatistics Core works</span></strong>: Investigators interested in our service in your grant applications or writing manuscripts can make a request by completing the online meeting request form. This form only needs to be completed once per project. Once submitted with relevant study background materials, you will be contacted to schedule a meeting. Most funding applications take extensive planning and forethought and adequate lead time on grant development efforts is needed and appreciated.</p>");
        res.write("<p><strong><span style = 'color:#000000'>Biostatistics Core Projects</span> </strong>: Our team leads the following projects:</p>");
        res.write('<ul>');
        res.write('<li><span style = "color:#000000">Developing Assessments using Automatic Item Generation</span></li>');
        res.write('<li><span style = "color:#000000">Component-based Item Response Theory using Generalized Component Structured Analysis</span></li>');
        res.write('<li><span style = "color:#000000">Nonlinear Growth Mixture Modeling utilizing Fractional Polynomials, Spline Models, Accelerated Longitudinal Modeling, Parametric Truncated Logistic Models, etc. </span></li>');
        res.write('<li><span style = "color:#000000">Mathematics Physiology in Medicine</span></li>');
        res.write('</ul>');
        res.write("<p><strong><span style = 'color:#000000'>Contact Information</span></strong>: If you have questions or would like to discuss your needs, contact Dr. Ji Hoon Ryoo at jr3gv@virginia.edu </span></p>");
        res.write('</div>');
        res.write('</div>');
        res.write('</div>');
        footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url == '/DevAssessmentsAIG') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/research') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/compbaseirtgen') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/nonlingrowth') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/mathphysmed') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/Training') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.end();
      });
    }
    else if (req.url == '/myappointments') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<form name="viewappt" method="post" action="/viewappt" >');
        res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
        res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
        res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
        res.write('</form>');
        res.write('</div>')
        printFooter(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');
        res.end();
      });
    }
    else if (req.url =='/viewappt') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        if (body == '' || body == 'undefined') {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> An ERROR OCCURED Please relog in. Sorry about the inconvience... ');
            res.write('</div>');
            res.write("</br> The date and time are currently: " + dt.myDateTime()+"</br>");
            res.write('<p>Please Enter Your credentials. </p>');
            res.write('<form name="login" method="post" action="/User" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
            res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('<form action="/Register" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
            res.write('</form>');
            res.write('</div>')
            res.write('<p class="ex1"> </p>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        var username = body.split('Username=')[1].split('&')[0];
        var password = body.split('Password=')[1]
        var spawn = require("child_process").spawn;
        var pyFile = 'viewappt.py';
        const pyspawn = spawn('python', [pyFile, username, password]);
        pyspawn.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          var str = String.fromCharCode.apply(null, data);
          if (str.trim() === "False".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> Incorrect Username or Password');
              res.write('</div>');
              res.write('<form name="viewappt" method="post" action="/viewappt" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
              res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
              res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('</div>')
              res.write('<p style = "padding-bottom:500px;"> </p>');
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          else {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write("<div class='alert alert-success'>");
              res.write('<strong>Log in Success!</strong>');
              res.write('</div>');
              res.write('<table class="table table-hover">');
              res.write('<thead><tr><th scope="col">#</th>');
              res.write('<th scope="col">Date</th><th scope="col">Time</th><th scope="col">Team Name</th>');
              res.write('</thead><tbody>');
              var times = str.split("', '");
              for (var i = 0; i < times.length; i++) {
                var date = times[i].split(' ')[0];
                var fake = times[i].split(' ')[1];
                var time = fake.split('TEAMNAMEISTHIS!@#$%')[0];
                var name = times[i].split('TEAMNAMEISTHIS!@#$%:')[1];
                if (i == 0) {
                  date = date.split("['")[1];
                }
                if (i == times.length -1) {
                  name = name.split("']")[0];
                }
                res.write('<tr><th scope="row">' + (i + 1) + '</th>');
                res.write("<td>" + date + "</td>");
                res.write("<td>" + time + "</td>");
                res.write("<td>" + name + "</td></tr>");
                console.log(name);
              }
              res.write('</tbody></table></br>');
              res.write('<form action="/deleteappt" method="post">')
              res.write('</br><button type="submit" id="newuser" class="btn btn-danger">Cancel Appt?</button>');
              res.write('</form>');
              res.write('</div>')
              res.write('<p style = "padding-bottom:250px;"> </p>');
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
        });
        pyspawn.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        pyspawn.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      });
    }
    else if (req.url == '/deleteappt') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<form name="delete" method="post" action="/deleteconfirm" >');
        res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
        res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
        res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
        res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
        res.write('</br>Please find the date you want to cancel </br>');
        res.write('<input type="date" required = "required" name = "date" id="date">');
        res.write('</br></br>What time slot was your app? </br>');
        res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
        res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
        res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
        res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
        res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
        res.write('</form>');
        res.write('<p style = "padding-bottom:500px;"> </p>');
        res.write('<p class="ex1"> </p>');
        res.write('</div>')
        printFooter(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url == '/deleteconfirm') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        if (body == '' || body == 'undefined') {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> An ERROR OCCURED Please relog in. Sorry about the inconvience... ');
            res.write('</div>');
            res.write("</br> The date and time are currently: " + dt.myDateTime()+"</br>");
            res.write('<p>Please Enter Your credentials. </p>');
            res.write('<form name="login" method="post" action="/User" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
            res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('<form action="/Register" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
            res.write('</form>');
            res.write('</div>')
            res.write('<p class="ex1"> </p>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        var username = body.split('Username=')[1].split('&')[0];
        var password = body.split('Password=')[1].split('&')[0];
        var email = body.split('emailpref=')[1].split('&')[0];
        var teamname = body.split('Teamname=')[1].split('&')[0];
        var time = body.split('time=')[1];
        var date = body.split('date=')[1].split('&')[0];
        time = time.replace("%3A", ':');
        time = time.replace("%3A", ':');
        var spawn = require("child_process").spawn;
        var pyFile = 'delete.py';
        const pyspawn = spawn('python', [pyFile, username, password, date, time, teamname]);
        pyspawn.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          var str = String.fromCharCode.apply(null, data);
          if (str.trim() === "False".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> Incorrect Username or Password');
              res.write('</div>');
              res.write('<form name="delete" method="post" action="/deleteconfirm" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
              res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
              res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
              res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
              res.write('</br>Please find the date you want to cancel </br>');
              res.write('<input type="date" required = "required" name = "date" id="date">');
              res.write('</br></br>What time slot was your app? </br>');
              res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
              res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('<p style = "padding-bottom:500px;"> </p>');
              res.write('<p class="ex1"> </p>');
              res.write('</div>')
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          if (str.trim() === "Loggedin".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> The time slot you entered could not be found please try again after checking the date');
              res.write('</div>');
              res.write('<form name="delete" method="post" action="/deleteconfirm" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
              res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
              res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
              res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
              res.write('</br>Please find the date you want to cancel </br>');
              res.write('<input type="date" required = "required" name = "date" id="date">');
              res.write('</br></br>What time slot was your app? </br>');
              res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
              res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('<p style = "padding-bottom:500px;"> </p>');
              res.write('<p class="ex1"> </p>');
              res.write('</div>')
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          else if (str.trim() === "deleted".trim()) {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'hyunsukr@gmail.com',
                pass: 'Q7!@audi'
              }
            });
            email = email.replace("%40", '@');
            var mailOptions = {
              from: 'hyunsukr@gmail.com',
              to: "ryoo.family@gmail.com," + email + ' ',
              subject: 'Sending Schedule Cancellation',
              text: 'You have cancelled a meeting on ' + date + ' ' + time + ' for the team ' + teamname + 'email to ' + email
            };
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write("<div class='alert alert-success'>");
              res.write('<strong>Success!</strong> You have successfully cancelled an appointment.');
              res.write('</div>');
              res.write('</div>')
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            });
          }
        });
        pyspawn.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        pyspawn.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      });
        
    }
    else if (req.url == '/contact') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<div class="row">');
        res.write('<div class="col-xs-10 col-sm-3">');

        res.write('<nav class="navbar navbar-inverse navbar-fixed-left" style="background-color:#F8F8F8;">');
        res.write('  <div class="navbar-header">');
        res.write('    <a class="navbar-brand" href="/research"><span style = "color:#000099">Our Reserach</span></a>');
        res.write('  </div>');
        res.write('  <div id="navbar" class="navbar-collapse collapse">');
        res.write('    <ul class="nav navbar-nav">');
        res.write('      <li><a href="/home"><span style = "color:#900">Home</span></a></li>');
        res.write('         <li role="separator" class="divider"></li>');
        res.write('     <li class="dropdown">');
        res.write('        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span style = "color:#900">Research</span></a>');
        res.write('      <ul class="dropdown-menu">');
        res.write('         <li><a href="/DevAssessmentsAIG">Developing Assessments using</br>Automatic Item Generation</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/compbaseirtgen">Component-based Item</br>Response Theory using</br>Generalized Component</br>Structured Analysis</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/nonlingrowth">Nonlinear Growth Mixture</br>Modeling utilizing Fractional</br>Polynomials, Spline Models, </br>Accelerated Longitudinal Modeling, </br>Parametric Truncated</br>Logistic Models, etc.</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/mathphysmed">Mathematics Physiology in Medicine</a></li>');
        res.write('     </ul>');
        res.write('   </li>');
        res.write('      <li><a href="/Training"><span style = "color:#900">Training</span></a></li>');
        res.write('  </ul>');
        res.write(' </div>');
        res.write(' </nav>');
        res.write('</div>');

        res.write('<div class="col-xs-10 col-sm-9">');
        res.write('<table class="table table-hover">');
        res.write('<thead><tr>');
        res.write('<th scope="col">Profiles (click picture for more details)</th><th scope="col"></th></tr></thead>');
        res.write('<tbody>')
        res.write('<td>Ji Hoon Ryoo</br> Founder </br> Director of Biostatistics at USC </br> Phonenumber: 612-839-8590 </br> Email: jihoonr@hotmail.com </td>');
        res.write('<td><a href="/jihoonryoo"><img src="jihoon.png" class="rounded float-right" style="width:200px;height:200px;"alt=""></td></a></tr>');
        res.write('<tr><td>Hyun Suk Ryoo </br> Software/Database Developer </br> Phonenumber: 612-963-1218 </br> Email: hr2ee@virginia.edu </td>');
        res.write('<td><a href="/hyunsukryoo"><img src="hyunsuk.jpg" class="rounded float-right" style="width:200px;height:200px;"alt=""></td></tr></tr>');
        res.write('</tr></tbody></table>');
        res.write('<p style="padding-bottom:100px"> </p>');
        res.write('</div>')
        res.write('<p style = "padding-bottom:150px"></p>');
        res.write('<p class="ex1"> </p>');

        res.write('</div>');
        res.write('</div>');
        res.write('<p class="ex1"> </p>');

        footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url == '/jihoonryoo') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); 
        res.write("</br>");
        res.write('<div class="row">');
        res.write('<div class="col-xs-12 col-sm-5">');
        res.write('<div class="card text-white bg-dark mb-3" style="max-width: 22rem;">');
        res.write('<img class="card-img-top" src="jihoon.png" alt="Card image cap">');
        res.write('<div class="card-body">');
        res.write("<p class='card-text'>");
        res.write('Contact </br>');
        res.write('Ji Hoon Ryoo </br>');
        res.write('Biostatistics Core </br>');
        res.write('Phone: 612-839-8590 </br>');
        res.write('Keck School of Medicine, </br>');
        res.write('University of Southern California </br>');
        res.write("Children's Center for Cancer and Blood Diseases</br>");
        res.write("</p>");
        res.write('</div>');
        res.write('</div>');
        res.write('</div>');
        res.write('<div class="col-xs-12 col-sm-7">');
        res.write('<h2 style = "color:#900; margin-bottom:0px;">Ji Hoon Ryoo</span></h2>');
        res.write('<h3 style = "color:#000099;"> Director of Biostatistics Core </h3>');
        res.write('<hr style = "height:1px;border-color:#ffcc00; " >');
        res.write('<span style = "color:#000099;font-style: italic">Ph.D., (Quantitative Methods in Education, Educational Psychology) University of Minnesota, Twin Cities, 2010 </span></br>');
        res.write('<span style = "color:#000099;font-style: italic">M.S. (Statistics), University of Minnesota, Twin Cities, 2010 </span></br>');
        res.write('<span style = "color:#000099;font-style: italic">M.S. (Mathematics), University of Minnesota, Twin Cities, 2006 </span></br>');
        res.write('<span style = "color:#000099;font-style: italic">M.A. (Mathematics), University of Maine, 2001</span></br>');
        res.write('<span style = "color:#000099;font-style: italic">B.S. (Mathematics), Kyungpook National University, 1999</span></br></br>');
        res.write("As a quantitative methodologist in education and psychology, I am primarily interested in improving current quantitative methods and implementing new applications to facilitate the answering of substantive research questions in social and behavior sciences. Specifically, my main area of expertise lies in statistical modeling in longitudinal and multilevel data analyses and latent variable modeling. Content-specific areas I have worked on include mathematics/science education, school climate/partnerships, and school bullying/victimization in middle and high school settings.</br>")
        res.write('<a href="/jihoonryoo_resume.pdf"> C.V </a>');
        res.write('</div>');
        res.write('</div>');
        res.write('</div>');
        res.write('<p style = "padding-bottom:150px"></p>');
        footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url == '/hyunsukryoo') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data); 
        res.write("</br>");
        res.write('<div class="row">');
        res.write('<div class="col-xs-12 col-sm-5">');
        res.write('<div class="card text-white bg-dark mb-3" style="max-width: 18rem;">');
        res.write('<img class="card-img-top" src="hyunsuk.jpg" alt="Card image cap">');
        res.write('<div class="card-body">');
        res.write("<p class='card-text'>");
        res.write('Contact </br>');
        res.write('Hyun Suk Ryoo </br>');
        res.write('deptname </br>');
        res.write('Phonenumber </br>');
        res.write('office </br>');
        res.write('</br>');
        res.write("</p>");
        res.write('</div>');
        res.write('</div>');
        res.write('</div>');
        res.write('<div class="col-xs-12 col-sm-7">');
        res.write("<p>");
        res.write('<h2 style = "color:#900; margin-bottom:0px;">Hyun Suk Ryoo</span></h2>');
        res.write('<h3 style = "color:#000099;"> Software/Database Developer </h3>');
        res.write('<hr style = "height:1px;border-color:#ffcc00; " >');
        res.write('<span style = "color:#000099">B.A (Computer Science), University of Virginia, 2020 </span></br>');
        res.write('<span style = "color:#000099">B.A (Statistics (Biostatics Concentration)), University of Virginia, 2020 </span></br>');
        res.write("As a software/database developer my interest is to connect the fields of autmoation, research, and medicine more tightly. blah blah blah. </br>")
        res.write('<a href="/hyunsukryoo_resume.pdf"> C.V </a>');
        res.write('</div>');
        res.write("</p>");
        res.write('</div>');
        res.write('</div>');
        res.write('<p style = "padding-bottom:150px"></p>');
        footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url == '/hyunsukryoo_resume.pdf') {
      fs.readFile('hyunsukryoo_resume.pdf', function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/pdf'});
        res.write(data);
        res.end();
      })
    }
    else if (req.url == '/jihoonryoo_resume.pdf') {
      fs.readFile('CV_JiHoonRyoo_Official.pdf', function (err, data) {
        res.writeHead(200, {'Content-Type': 'application/pdf'});
        res.write(data);
        res.end();
      })
    }
    else if (req.url == '/schedule') {
      fs.readFile('interface.html', function(err, data) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        res.write('<div class="row">');
        res.write('<div class="col-xs-10 col-sm-3">');

        res.write('<nav class="navbar navbar-inverse navbar-fixed-left" style="background-color:#F8F8F8;">');
        res.write('  <div class="navbar-header">');
        res.write('    <a class="navbar-brand" href="/research"><span style = "color:#000099">Our Reserach</span></a>');
        res.write('  </div>');
        res.write('  <div id="navbar" class="navbar-collapse collapse">');
        res.write('    <ul class="nav navbar-nav">');
        res.write('      <li><a href="/home"><span style = "color:#900">Home</span></a></li>');
        res.write('         <li role="separator" class="divider"></li>');
        res.write('     <li class="dropdown">');
        res.write('        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span style = "color:#900">Research</span></a>');
        res.write('      <ul class="dropdown-menu">');
        res.write('         <li><a href="/DevAssessmentsAIG">Developing Assessments using</br>Automatic Item Generation</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/compbaseirtgen">Component-based Item</br>Response Theory using</br>Generalized Component</br>Structured Analysis</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/nonlingrowth">Nonlinear Growth Mixture</br>Modeling utilizing Fractional</br>Polynomials, Spline Models, </br>Accelerated Longitudinal Modeling, </br>Parametric Truncated</br>Logistic Models, etc.</a></li>');
        res.write('           <li role="separator" class="divider"></li>');
        res.write('         <li><a href="/mathphysmed">Mathematics Physiology in Medicine</a></li>');
        res.write('     </ul>');
        res.write('   </li>');
        res.write('      <li><a href="/training"><span style = "color:#900">Training</span></a></li>');
        res.write('  </ul>');
        res.write(' </div>');
        res.write(' </nav>');
        res.write('</div>');

        res.write('<div class="col-xs-10 col-sm-9">');
        res.write('<form name="schedule" method="post" action="/confirm" >');
        res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
        res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
        res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
        res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
        res.write('What day would you like to meet? </br> ');
        res.write('<input type="radio" name="day" required="required" value="Tuesday";/>Tuesday </br>');
        res.write('<input type="radio" name="day" required="required" value="Wednesday";/>Wednesday </br>');
        res.write('<input type="radio" name="day" required="required" value="Thursday";/>Thursday </br>');
        res.write('</br>Please find the date you wish </br>');
        res.write('<input type="date" required = "required" name = "date" id="date">');
        res.write('</br></br>What time slot would you like?</br>');
        res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
        res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
        res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
        res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
        res.write("</br> How many people are in your team? </br>");
        res.write('<input type="text" class="form-control" name = "Members" id="Members" placeholder="Number of members" required="required">');
        res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
        res.write('</form>');
        res.write('<p class="ex1"> </p>');

        res.write('</div>')
        res.write('<p></p>');
        res.write('</div>');
        res.write('</div>');
        footbot(res);
        res.write('</div>');
        res.write('</body>');
        res.write('</html>');  
        res.end();
      });
    }
    else if (req.url =='/confirm') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        if (body == '' || body == 'undefined') {
          fs.readFile('htmlout.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.write('<div class="alert alert-danger">');
            res.write('<strong>ERROR!</strong> An ERROR OCCURED Please relog in. Sorry about the inconvience... ');
            res.write('</div>');
            res.write("</br> The date and time are currently: " + dt.myDateTime()+"</br>");
            res.write('<p>Please Enter Your credentials. </p>');
            res.write('<form name="login" method="post" action="/User" >');
            res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="Username" required="required">');
            res.write('Password: <input type="password" class="form-control" pattern=".{8,}"   required title="8 characters minimum" name = "Password" id="Password" placeholder="Password" required="required">');
            res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
            res.write('</form>');
            res.write('<form action="/Register" method="post">')
            res.write('</br><button type="submit" id="newuser" class="btn btn-danger">New User?</button>');
            res.write('</form>');
            res.write('</div>')
            res.write('<p class="ex1"> </p>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
        }
        var username = body.split('Username=')[1].split('&')[0];
        var password = body.split('Password=')[1].split('&')[0];
        var email = body.split('emailpref=')[1].split('&')[0];
        var teamname = body.split('Teamname=')[1].split('&')[0];
        var time = body.split('time=')[1].split('&')[0];
        time = time.replace("%3A", ':');
        time = time.replace("%3A", ':');
        var date = body.split('date=')[1].split('&')[0];
        var spawn = require("child_process").spawn;
        var pyFile = 'datechecking.py';
        const pyspawn = spawn('python', [pyFile, username, password, date, time, teamname]);
        pyspawn.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          var str = String.fromCharCode.apply(null, data);
          if (str.trim() === "False".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> Incorrect Username or Password');
              res.write('</div>');
              res.write('<form name="schedule" method="post" action="/confirm" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
              res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
              res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
              res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
              res.write('What day would you like to meet? </br> ');
              res.write('<input type="radio" name="day" required="required" value="Tuesday";/>Tuesday </br>');
              res.write('<input type="radio" name="day" required="required" value="Wednesday";/>Wednesday </br>');
              res.write('<input type="radio" name="day" required="required" value="Thursday";/>Thursday </br>');
              res.write('</br>Please find the date you wish </br>');
              res.write('<input type="date" required = "required" name = "date" id="date">');
              res.write('</br></br>What time slot would you like?</br>');
              res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
              res.write("</br> How many people are in your team? </br>");
              res.write('<input type="text" class="form-control" name = "Members" id="Members" placeholder="Number of members" required="required">');
              res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('</div>')
              res.write('<p></p>');
              footbot(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          if (str.trim() === "taken".trim()) {
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write('<div class="alert alert-danger">');
              res.write('<strong>ERROR!</strong> The timeslot is already occupied please try another timeslot');
              res.write('</div>');
              res.write('<form name="schedule" method="post" action="/confirm" >');
              res.write('Username: <input type="text" class="form-control" name = "Username" id="Username" placeholder="" required="required">');
              res.write('Password: <input type="password" class="form-control" name="Password" id="password" placeholder="" pattern=".{8,}"   required title="8 characters minimum" required="required">');
              res.write('Team Name: <input type="text" class="form-control" name = "Teamname" id="Teamname" placeholder="" required="required">');
              res.write('Email: <input type="text" class="form-control" name = "emailpref" id="emailpref" placeholder="" required="required">');
              res.write('What day would you like to meet? </br> ');
              res.write('<input type="radio" name="day" required="required" value="Tuesday";/>Tuesday </br>');
              res.write('<input type="radio" name="day" required="required" value="Wednesday";/>Wednesday </br>');
              res.write('<input type="radio" name="day" required="required" value="Thursday";/>Thursday </br>');
              res.write('</br>Please find the date you wish </br>');
              res.write('<input type="date" required = "required" name = "date" id="date">');
              res.write('</br></br>What time slot would you like?</br>');
              res.write('<input type="radio" name="time" required="required" value="1:00-1:30";/>1:00-1:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="1:30-2:00";/>1:30-2:00 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:00-2:30";/>2:00-2:30 </br>');
              res.write('<input type="radio" name="time" required="required" value="2:30-3:00";/>2:30-3:00 </br>');
              res.write("</br> How many people are in your team? </br>");
              res.write('<input type="text" class="form-control" name = "Members" id="Members" placeholder="Number of members" required="required">');
              res.write('</br><button type="submit" required="required"  value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('</div>')
              res.write('<p></p>');
              footbot(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
            });
          }
          else if (str.trim() === "Madeappt".trim()) {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'hyunsukr@gmail.com',
                pass: 'Q7!@audi'
              }
            });
            email = email.replace("%40", '@');
            var mailOptions = {
              from: 'hyunsukr@gmail.com',
              to: "ryoo.family@gmail.com," + email + ' ',
              subject: 'Sending Schedule Confirmation',
              text: 'Congradulations!  You have scheduled a meeting on ' + date + '. Please show up 5min before the appt time of : ' + time + ' with all the members of ' + teamname
            };
            fs.readFile('interface.html', function(err, data) {
              res.writeHead(200, {'Content-Type': 'text/html'});
              res.write(data);
              res.write("<div class='alert alert-success'>");
              res.write('<strong>Success!</strong> You have made a successful appointment.');
              res.write('</div>');
              res.write('<div class="alert alert-warning" role="alert">');
              res.write('You must submit a sample of your consulting paper to the email _____ 48hours prior to the meeting.');
              res.write('</div>');
              res.write('Or send it now (needs to be 48 hours prior to the meeting)');
              res.write('Please label it sampleout_teamname.doc or something including your teamname');
              res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
              res.write('<input type="file" name="filetoupload"><br>');
              res.write('</br><button type="submit" value="Submit" class="btn btn-primary">Submit</button>');
              res.write('</form>');
              res.write('</div>')
              res.write('<p class="ex1"> </p>');
              printFooter(res);
              res.write('</div>');
              res.write('</body>');
              res.write('</html>');  
              res.end();
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            });
          }
        });
        pyspawn.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        pyspawn.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      });
    }
    else if (req.url == '/fileupload') {
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = '/Users/maxryoo/Desktop/USC_ryoo/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
          fs.readFile('interface.html', function(err, data) {
        		res.writeHead(200, {'Content-Type': 'text/html'});
        		res.write(data);
            res.write("<div class='alert alert-success'>");
            res.write('<strong>Success!</strong> You have successfully uploaded the document.');
            res.write('</div>');
            res.write('</div>');
            printFooter(res);
            res.write('</div>');
            res.write('</body>');
            res.write('</html>');  
            res.end();
          });
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'hyunsukr@gmail.com',
              pass: 'Q7!@audi'
            }
          });
          var mailOptions = {
            from: 'hyunsukr@gmail.com',
            to: "ryoo.family@gmail.com,",
            subject: 'Sending Consulting File',
            text: 'sending consulting file',
            attachments:[{path: '/Users/maxryoo/Desktop/USC_ryoo/' + files.filetoupload.name }]
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
      });
    });
    }
    else {
      res.write('nopage');
      res.end();
    }
  } 
  else {
      var filePath = '.' + req.url;
      if (filePath == './')
          filePath = './index.html';
      var extname = path.extname(filePath);
      var contentType = 'text/html';
      switch (extname) {
          case '.js':
              contentType = 'text/javascript';
              break;
          case '.css':
              contentType = 'text/css';
              break;
          case '.json':
              contentType = 'application/json';
              break;
          case '.png':
              contentType = 'image/png';
              break;
          case '.jpg':
              contentType = 'image/jpg';
              break;
          case '.wav':
              contentType = 'audio/wav';
              break;
      }
  
      fs.readFile(filePath, function(error, content) {
          if (error) {
              if(error.code == 'ENOENT'){
                  fs.readFile('./404.html', function(error, content) {
                      res.writeHead(200, { 'Content-Type': contentType });
                      res.end(content, 'utf-8');
                  });
              }
              else {
                  res.writeHead(500);
                  res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                  res.end();
              }
          }
          else {
              res.writeHead(200, { 'Content-Type': contentType });
              res.end(content, 'utf-8');
          }
      });
    }
 // }).listen(3000, '0.0.0.0');
}).listen(3000);
  
function printFooter(res) {
  res.write('<div class="page-footer font-small blue  small text-light bg-dark" role = "contentinfo" style="position: fixed;width:100%; bottom: 0; padding-top: 1em; padding-bottom: 1em">');
  res.write('  <div class="container">');
  res.write('  <div class="row">');
  res.write('    <div class="col-sm-3">');
  res.write('      <p> Division of Biostatistics<br>');
  res.write('       Department of Preventive Medicine<br>');
  res.write('       Keck School of Medicine<br>');
  res.write('      University of Southern California');
  res.write('    </p>');
  res.write('  </div>');
  res.write('    <div class="col-sm-3">');
  res.write('      Graduate Programs in Biostatistics and Epidemiology<br>');
  res.write('        Department of Preventive Medicine<br>');
  res.write('         Keck School of Medicine<br>');
  res.write('         Soto Street Building<br>');
  res.write('         2001 N Soto Street,<br>');
  res.write('         Suite 201-A<br>');
  res.write('       Los Angeles, CA 90032-3628');
  res.write('    </div>');
  res.write('    <div class="col-sm-3">');
  res.write('      <p>Campus Mail:<u></u><br>');
  res.write('        Division of Biostatistics<br>');
  res.write('      2001 N Soto Street<br>');
  res.write('      SSB 201A, M/C 9234<br>');
  res.write('      Los Angeles, CA 90089-9237</p>');
  res.write('    </div>');
  res.write('    <div class="col-sm-3">');
  res.write('        <p>Phone: 323.442.1810<br>');
  res.write('          Fax: 323.442.2993<br>');
  res.write('          Email: <a href="mailto:mtrujill@usc.edu">mtrujill@usc.edu</a></p>');
  res.write('    </div>');
  res.write('  </div>');
  res.write('  </div>');
  res.write('</div>');
}
function footbot (res) {
  res.write('<div class="page-footer font-small blue  small text-light bg-dark" role = "contentinfo" style="width:100%; bottom: 0; padding-top: 1em; padding-bottom: 1em">');
  res.write('  <div class="container">');
  res.write('  <div class="row">');
  res.write('    <div class="col-sm-3">');
  res.write('      <p> Division of Biostatistics<br>');
  res.write('       Department of Preventive Medicine<br>');
  res.write('       Keck School of Medicine<br>');
  res.write('      University of Southern California');
  res.write('    </p>');
  res.write('  </div>');
  res.write('    <div class="col-sm-3">');
  res.write('      Graduate Programs in Biostatistics and Epidemiology<br>');
  res.write('        Department of Preventive Medicine<br>');
  res.write('         Keck School of Medicine<br>');
  res.write('         Soto Street Building<br>');
  res.write('         2001 N Soto Street,<br>');
  res.write('         Suite 201-A<br>');
  res.write('       Los Angeles, CA 90032-3628');
  res.write('    </div>');
  res.write('    <div class="col-sm-3">');
  res.write('      <p>Campus Mail:<u></u><br>');
  res.write('        Division of Biostatistics<br>');
  res.write('      2001 N Soto Street<br>');
  res.write('      SSB 201A, M/C 9234<br>');
  res.write('      Los Angeles, CA 90089-9237</p>');
  res.write('    </div>');
  res.write('    <div class="col-sm-3">');
  res.write('        <p>Phone: 323.442.1810<br>');
  res.write('          Fax: 323.442.2993<br>');
  res.write('          Email: <a href="mailto:mtrujill@usc.edu">mtrujill@usc.edu</a></p>');
  res.write('    </div>');
  res.write('  </div>');
  res.write('  </div>');
  res.write('</div>');
}