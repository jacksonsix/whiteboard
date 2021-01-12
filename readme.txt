nohup npm start 2>/dev/null 1>/dev/null&


ejabberdctl delete_old_mam_messages all 0

restart ejabberd as :    sudo systemctl restart ejabberd

add user as :  sudo ejabberdctl register <username> <server_hostname>  <user-password>

edit config file as : sudo vim /opt/ejabberd/conf/ejabberd.yml
