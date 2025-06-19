FROM rocker/rstudio:4.5.1

RUN apt-get update
# RUN apt-get remove libpq5 -y
RUN apt-get install -y \
    default-jre \
    default-jdk \
    libpq-dev \
    libxml2-dev \
    libudunits2-dev \
    libgeos-dev \
    libglu1-mesa-dev \
    r-cran-rgl \
    r-cran-rjava

RUN R CMD javareconf

RUN apt-get install -y \
    libcairo2-dev \
    libgdal-dev \
    libfontconfig1-dev \
    libgit2-dev \
    libglu1-mesa-dev \
    libproj-dev \
    r-cran-hmisc \
    r-cran-rodbc \
    r-cran-vegan \
    unixodbc \
    unixodbc-dev
# libiodbc2-dev \

RUN install2.r --error \
    dplyr \
    httr \
    jsonlite \
    sqldf \
    zip
    
RUN install2.r --error -r 'http://cran.r-project.org'  \
    data.table \
    desc \
    dplyr \
    DT \
    evaluate \
    Formula \
    ggExtra \
    gsubfn \
    Hmisc \
    jpeg \
    knitr \
    lattice \
    lazyeval \
    locfit \
    lmfor \
    markdown \
    nortest \
    outliers \
    png \
    random \
    rentrez \
    reshape \
    reshape2 \
    rlang \
    rmarkdown \
    RPostgreSQL \
    RSQLite \
    sampling \
    SamplingBigData \
    scales \
    sp \
    spatial \
    stringr \
    srvyr \
    survey \
    survival \
    vegan \
    whisker \
    XLConnect
#    BIOMASS \
#    DataCombine \
#    rgdal \
#    sf \

# RUN install2.r --error -r 'https://mac.R-project.org' mapview

RUN apt-get autoclean -y
RUN apt-get autoremove -y
