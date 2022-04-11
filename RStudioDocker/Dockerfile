FROM rocker/rstudio:latest

RUN apt update
# RUN apt remove libpq5 -y
RUN apt install libpq-dev r-cran-rgl -y

RUN install2.r --error dplyr
RUN install2.r --error \
    sqldf \
    jsonlite \
    httr \
    zip

RUN install2.r --error -r 'http://cran.r-project.org'  \
    data.table \
    desc \
    RPostgreSQL \
    reshape \
    reshape2 \
    random \
    gsubfn \
    evaluate \
    Formula \
    knitr \
    lazyeval \
    locfit \
    DataCombine \
    RSQLite \
    rmarkdown

RUN apt install -y r-cran-rjava default-jre default-jdk libxml2-dev libudunits2-dev libgeos-dev
RUN R CMD javareconf

RUN install2.r --error -r 'http://cran.r-project.org' XLConnect rentrez
RUN install2.r --error -r 'http://cran.r-project.org' \
    lmfor \
    survey \
    survival \
    DT \
    lattice \
    png \
    jpeg \
    vegan \
    sampling \
    sp \
    markdown \
    nortest \
    outliers \
    SamplingBigData \
    scales \
    spatial \
    whisker \
    srvyr \
    rlang

RUN apt install -y libglu1-mesa-dev 
RUN apt install -y libiodbc2-dev
RUN apt install -y unixodbc unixodbc-dev r-cran-rodbc libgdal-dev libproj-dev
RUN apt install -y r-cran-hmisc libfontconfig1-dev libcairo2-dev
RUN apt install -y libgit2-dev r-cran-vegan

RUN install2.r --error -r 'http://cran.r-project.org' sf rgdal
RUN install2.r --error -r 'http://cran.r-project.org' Hmisc
RUN install2.r --error -r 'https://mac.R-project.org' mapview
RUN install2.r --error -r 'http://cran.r-project.org' ggExtra BIOMASS

