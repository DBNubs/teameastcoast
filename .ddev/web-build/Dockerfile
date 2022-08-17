ARG BASE_IMAGE
FROM $BASE_IMAGE

RUN apt-get update \
  && apt-get --quiet install -y --no-install-recommends gnupg \
  && apt-get --quiet install -y --no-install-recommends parallel \
  && npm install -g grunt-cli \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
