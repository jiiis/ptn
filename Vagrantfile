# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "ptn"
  config.vm.network "private_network", ip: "192.168.55.55"
  config.vm.synced_folder "./", "/var/www/ptn.local", type: "nfs"

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = 2
    vb.memory = 2048
  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/playbook.yml"
    ansible.extra_vars = { ansible_ssh_user: "vagrant" }
    ansible.verbose = "vvvv"
  end
end
