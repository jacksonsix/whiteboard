nohup npm start 2>/dev/null 1>/dev/null&


ejabberdctl delete_old_mam_messages all 0

restart ejabberd as :    sudo systemctl restart ejabberd

add user as :  sudo ejabberdctl register <username> <server_hostname>  <user-password>

edit config file as : sudo vim /opt/ejabberd/conf/ejabberd.yml


///////

service ejabberd stop
mv /etc/ejabberd/ejabberd.pem  /etc/ejabberd/ejabberd.pem.backup

cat /etc/letsencrypt/live/yourdomain.com/privkey.pem /etc/letsencrypt/live/chat.yourdomain.com/fullchain.pem > ejabberd.pem
mv ejabberd.pem  /opt/ejabberd

chown ejabberd /opt/ejabberd/ejabberd.pem
chgrp jabbed    /opt/ejabberd/ejabberd.pem
service ejabberd start

/////
