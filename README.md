ptn
===

## Requirements for building and running the application

#### Install `Vagrant`
* Check [Vagrant](https://www.vagrantup.com/downloads.html) for more information

#### Install `Ansible`
* Check [Ansible](http://docs.ansible.com/ansible/intro_installation.html) for more information

#### Install `VirtualBox`
* Check [VirtualBox](https://www.virtualbox.org/wiki/Downloads) for more information

#### Install `Node.js` & `NPM` globally
* Check [Node.js](http://nodejs.org) for more information

#### Install `Bower` globally
* Run ___`npm install -g bower`___

===

## Set up a hostname

#### Create an entry in `/etc/hosts`
* Associate the IP address of the VM (`192.168.55.55`) with a hostname of the app (e.g. `ptn.local`)

===

## Build the application

#### Boot the `Vagrant` environment
* Under the project root, run ___`vagrant up`___
    * This command creates and configures a guest machine according to the `Vagrantfile`
        * It creates a fully running virtual machine in the provider (`VirtualBox`) running `ubuntu/trusty64` (an official `Ubuntu Server 14.04 LTS (Trusty Tahr)` build)
        * It sets up the networking
        * It sets up the synced folders
        * It installs those environmental dependencies that the application needs
        * It runs the provisioning

#### Check the guest machine
* Under the project root, run ___`vagrant ssh`___
    * This command drops you into a full-fledged SSH session

#### Install Composer dependencies
* Under the project root of the guest machine, run ___`composer self-update && composer install`___

#### Run migrations to build up database tables
* Under the project root of the guest machine, run ___`php artisan october:up`___

#### About running the `front-end` related commands
* All `NPM` commands should be run under the project root
* Commands can be run in either the host or the guest machine

#### Install `NPM` packages
* Under the project root, run ___`npm install`___
    * This command installs `NPM` dependencies according to `package.json`
    * `Bower` dependencies are automatically run after `npm install` because of the `NPM script` entry `postinstall`

#### Install `Bower` packages
* Under `./themes/ptn/assets/`, run ___`bower install`___

#### Build the development application
* Under `./themes/ptn/assets/`, run ___`gulp`___
    * Shorthand
        * Under the project root, run ___`npm run dev`___

#### Build the production application
* Under `./themes/ptn/assets/`, run ___`gulp --env=prod`___
    * Shorthand
        * Under the project root, run ___`npm run prod`___

#### Watch the application changes
* Under `./themes/ptn/assets/`, run ___`gulp watch`___
    * Shorthand
        * Under the project root, run ___`npm run watch`___

===

## Code quality

#### JavaScript
* JSCS
    * Configuration file: ___`config.jscs.json`___
    * Check [JSCS friendly packages](http://jscs.info/overview) for information about enabling JSCS for your IDE/Editor
