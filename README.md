<h1>Integrating Django and React.js</h1>
<h2><br />A simple recipe manager implementation with Django and React.</h2>
<p><strong>Requirements: Vagrant and VirtualBox</strong></p>
<ul>
<li>To install <strong>Vagrant</strong>,&nbsp;<a href="https://www.vagrantup.com/downloads.html">Click Here</a> and install the respective version for your operating system.</li>
</ul>
<ul>
<li>To install <strong>VirtualBox</strong>,&nbsp;<a href="https://www.virtualbox.org/wiki/Downloads">Click Here</a> and install the respective version for your operating system.</li>
</ul>
<p>After installing Vagrant, access the folder containing the Vagrantfile on /%DATA_DIR%<strong>/django-server/Vagrantfile</strong> and execute the command <strong>"vagrant up"</strong> to initialize the server for the project.</p>
<h1>Running the Back-End</h1>
<p>To run the Django Server, execute the following steps on your CLI:</p>
<ol>
<ol>
<li>Inside the project directory,<strong> /vagrant/src/django-server/,&nbsp;</strong>execute the command "<strong>vagrant ssh</strong>" to connect to the virtual machine containing the Django data.</li>
<li>Execute the command "<strong>mkvirtualenv recipes_api --python=python3</strong>" to create a virtual environment specific for the project, without system dependencies</li>
<li>Connect on your virtual environment through the command "<strong>workon recipes_api</strong>"</li>
<li>Inside the virtual environment, execute the command <strong>pip install django=1.11</strong> and&nbsp;<strong>pip install djangorestframework=3.6.2</strong></li>
<li>Run the command "<strong>python manage.py makemigrations</strong>" to create the initial setup for the database</li>
<li>Run the command "<strong>python manage.py migrate</strong>" to apply the setup for the database</li>
<li>
<p>To create a superuser, execute the command "<strong>python manage.py createsuperuser</strong>" (You can create a user through the front-end later)&nbsp;</p>
</li>
<li>
<p>Run the server locally through the command "<strong>python manage.py 0:8080</strong>" (You can create a user through the front-end later)&nbsp;</p>
</li>
</ol>
</ol>
<h1>Running the Front-End</h1>
<p>To run the React Client, execute the following steps on your CLI:</p>
<ol>
<ol>
<li>Inside the project directory, in your local magchine: <strong> /{WORKING_DIRECTORY}/src/recipe-manager-client/,&nbsp;</strong>execute the command "<strong>npm install</strong>" to update the project dependencies</li>
<li>Execute the command "<strong>npm start</strong>" to start the Client</li>
<li>To execute the application, please run your browser in "unsafe" mode, due to CORS policies. For Google Chrome on Windows this can be done through the command "<strong>chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security"</strong></li>
</ol>
</ol>
<h1>Known Limitations</h1>
<ol>
<li>
<p><strong>Authorization is disabled. You can login, but the token is not verified later if you change the request by hand</strong>&nbsp;</p>
</li>
<li>
<p><strong>Model for Recipe is not normalized (There isn't a Recipe and RecipeDetails table. It's all on "Recipe")</strong>&nbsp;</p>
</li>
<li>
<p><strong>Nested Routes for "{api_root}/users/{id}/recipes/" return only {"ingredient":{:id}}, not the Nested Object</strong>&nbsp;</p>
</li>
</ol>
