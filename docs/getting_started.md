# Getting started

This document will layout the steps required to implement the tool created in this repository. The installation
proceeds in 3 main steps:

- [Install required software](#install-required-software)
    - [Install postgres](#install-postgres)
    - [Configure postgres](#postgresql-configuration-in-linux)
    - [Firewall exceptions](#firewall-exceptions)
    - [Install docker](#install-docker)
    - [Pull repo to computer](#pull-the-github-repository-to-your-machine)
- [Create and configure database](#configure-database)
    - [Modify password](#modify-password)
    - [Create database](#create-the-database-you-wish-to-use-for-the-project)
- [Setup environment file](#setup-environment-file)
- [Run migrations](#run-migrations)
    - [From your machine](#run-migrations-from-your-machine)
    - [From docker container](#run-migrations-from-docker-container)
- [Create admin user](#create-admin-user)
- [Import project data (optional)](#import-project-data)
- [Startup services](#startup-project)
- [Shutting down](#shutting-down)


## Install required software 

The following software is required in order to run this software. Versions used for development are listed
Users are free to use their own versions at their risk

- PostgreSQL 16.14
- PostGIS 3.4.2
- Docker:  
    - docker-ce 29.7.0.1
    - docker-ce-rootless-extras: 29.7.0.1
    - docker-ce-cli: 29.7.0.1
    - docker-buildx-plugin: 0.36.0
    - docker-compose-plugin: 5.3.1

For development, it's recommended you have nodejs installed to be able to run migrations and such. This project was developped with node 24.15

[Return to start](#getting-started)

### Install database 

#### Install postgres

You should install postgres using the instructions on their [website](https://www.postgresql.org/download/).

That being said, some modifications need to be made to the configuration to allow the software to access the data.

[Return to start](#getting-started)


#### PostgreSQL Configuration in Linux

You need to modify`/etc/postgresql/16/main/postgresql.conf`. Find the following lind `#listen_addresses = 'localhost'` et replace it with 
`listen_addresses = '*'`

Modify `/etc/postgresql/16/main/pg_hba.conf` by adding the following two lines
```
host    all             all             172.25.0.0/16           scram-sha-256
host    replication     all             172.25.0.0/16           scram-sha-256
```
[Return to start](#install-database)
#### Firewall exceptions

You may need to create an exception in your firewall to let docker access the database. In my case, I've exposed 172.25.0.0/16:5432 and 172.17.0.0/16:5432 to allow
access

[Return to start](#install-database)

### Install Docker 

You also need to install docker in order to run the application. The instructions can be found on their [website](https://docs.docker.com/get-started/get-docker/)

[Return to start](#getting-started)

### Pull the Github repository to your machine

Open the terminal and navigate to the folder you use for development. If you're using SSH to login to the github, run the following command:


```
git@github.com:EPMPaulPoly/public_accounts.git
```

If you're using https:

```
https://github.com/EPMPaulPoly/public_accounts.git
```

[Return to start](#getting-started)

## Configure database

Next up, you need to setup a user for the database, create the database and then run the migrations which create the data structure. 

### Modify password 

It's recommended you setup a secure password for your database user that you will use to access the database. This can be done in the pgadmin interface or using the following commands in the terminal (Windows nomenclature may be slightly different). Start by connecting to psql
```
sudo -u postgres psql
```
Run the following command to alter your password :

```
ALTER USER postgres WITH PASSWORD 'new_password_to_enter_here';
```

### Create the database you wish to use for the project

You now have to create the database format which you will use. This can be done in pgadmin (the postgres client) or using the following command in the terminal

```
sudo -u postgres createdb --template=template0 --lc-collate='C.UTF-8' --lc-ctype='C.UTF-8' financial_statements
```

## Setup environment file


The environment file is the location where you setup the parameters of the tool. It needs to be setup at the root of the development folder and be called .env . It should contain the following information:

```
DB_HOST=host.docker.internal
DB_USER=postgres
DB_NAME=the_database_you_just_created
DB_PASSWORD=thepassword_you_just_configured
DB_PORT=5432
BETTER_AUTH_SECRET=see_instructions
BETTER_AUTH_URL=http://localhost:5000
TRUSTED_FRONTEND=http://localhost:5173 
```
The website uses a third party library for all the authentification implementation. A secret needs to be specified which is used to hash passwords. We suggest you use the [tool](https://better-auth.com/docs/installation#set-environment-variables) provided by the auth package to do this. 

## Run migrations

Migrations are scripts used to create the required structure in the database. They can be run directly in the docker instance or from your desktop seeing as the database is hosted on your local machine (rather than a docker instance).

### Run migrations from your machine 
- Change your .env file DB_HOST to `DB_HOST=localhost`
- open a terminal and navigate to `*project_root*/apps/backend`. 
- Enter `npm run migrate`
- Revert your env file

### Run migrations from docker container
- open terminal and navigate to project root
- enter command `docker compose up --build`
- Once the containe is up and running open another terminal window and run `docker exec -it public_accounts-backend-1 bash`
- Once you're in the image terminal run `npm run migrate`
- Disconnect from the docker terminal 



## Create admin user

In order to manipulate report templates and manage access to the website, at least one person needs to be designated as administrator. This uses the better-auth admin plugin to manage roles and there are 2 roles: 
- admins that can manipulate the data and create the assignments of data codes to line items in financial reports 
- users which can create formulas in the indicators page of the website.

Some parts of the website(basically any of the financial reports and results) are open to the public. To create an admin in the command line, there are two methods
### Create admin user from your machine 
- Change your .env file DB_HOST to `DB_HOST=localhost`
- open a terminal and navigate to `*project_root*/apps/backend`. 
- Enter `npm run createUser.ts --email=user@test.com --password=securePass --name='John Doe' --username='Big Horn Tx' --role=[admin|user]` with the appropriate information 
- Revert your env file

### Create admin user from container 
- open terminal and navigate to project root
- enter command `docker compose up --build`
- Once the containe is up and running open another terminal window and run `docker exec -it public_accounts-backend-1 bash`
- Once you're in the image terminal run `npm run createUser.ts --email=user@test.com --password=securePass --name='John Doe' --username='Big Horn Tx' --role=[admin|user]` with the appropriate information 
- Exit container terminl

## Import project data

Project backups can be imported directly by the infrastructure administrator. Backups should be created with data only. Ideally, only save the municipal_qc schema as opposed to the whole database (which contains users and auth data in the public schema). This can be imported using the following command:

```
sudo -u postgres psql -d <db_name> -f <backup_file.sql>
```


## Startup project

In the root or any sub folder run `docker compose up --build`

## Shutting down

In the root or any subfolder run `docker compose down`