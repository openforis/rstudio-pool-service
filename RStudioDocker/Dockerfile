FROM rocker/rstudio:3.6.2
RUN install2.r --error dplyr
RUN install2.r --error \
    sqldf \
    jsonlite \
    httr \
    zip
