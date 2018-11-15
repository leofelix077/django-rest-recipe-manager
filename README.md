<h1>Integrating Django and React.js</h1>
<h2><br />A simple recipe manager implementation with Django and React.</h2>
<p>&nbsp;</p>
<li>The initial software description and architecture can be found <a href="https://drive.google.com/open?id=1hOcDWcIVbYaNhZ4ijZLJgVTqnYZlb_wN">Clicking Here</a></li>
<p>&nbsp;</p>
<p><strong>Requirements: <span style="color: #0000ff;">Vagrant and VirtualBox</span></strong></p>
<ul>
<li>To install <strong>Vagrant</strong>,&nbsp;<a href="https://www.vagrantup.com/downloads.html">Click Here</a> and install the respective version for your operating system.</li>
</ul>
<p>&nbsp;</p>
<ul>
<li>To install <strong>VirtualBox</strong>,&nbsp;<a href="https://www.virtualbox.org/wiki/Downloads">Click Here</a> and install the respective version for your operating system.</li>
</ul>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>After installing Vagrant, access the folder containing the Vagrantfile on /<span style="color: #ff0000;">%DATA_DIR%</span><strong>/django-server/Vagrantfile</strong> and execute the command <strong>"vagrant up"</strong> to initialize the server for the project.</p>
<p>&nbsp;</p>
<h1>Running the Back-End</h1>
<p>To run the Django Server, execute the following steps on your CLI:</p>
<p>&nbsp;</p>
<ol>
<li>Inside the project directory,<strong> /vagrant/src/django-server/,&nbsp;</strong>execute the command "<strong>vagrant ssh</strong>" to connect to the virtual machine containing the Django data.
<p>&nbsp;</p>
</li>
<li>Execute the command "<strong>mkvirtualenv recipes_api --python=python3</strong>" to create a virtual environment specific for the project, without system dependencies
<p>&nbsp;</p>
</li>
<li>Connect on your virtual environment through the command "<strong>workon recipes_api</strong>"
<p>&nbsp;</p>
</li>
<li>Inside the virtual environment, execute the command <strong>pip install django=1.11</strong> and&nbsp;<strong>pip install djangorestframework=3.6.2</strong>
<p>&nbsp;</p>
</li>
<li>Run the command "<strong>python manage.py makemigrations</strong>" to create the initial setup for the database
<p>&nbsp;</p>
</li>
<li>Run the command "<strong>python manage.py migrate</strong>" to apply the setup for the database
<p>&nbsp;</p>
</li>
<li>
<p>To create a superuser, execute the command "<strong>python manage.py createsuperuser</strong>"&nbsp;</p>
</li>
</ol>
