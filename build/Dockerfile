FROM postgres:14.2

COPY ./pgDump /tmp
RUN apt-get -y update && apt-get -y install procps && apt-get -y install vim
COPY ./setupPg.sh /tmp/

RUN chmod 755 /tmp/setupPg.sh