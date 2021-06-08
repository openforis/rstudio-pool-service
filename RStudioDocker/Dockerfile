FROM rocker/rstudio:3.6.2
RUN apt-get update
RUN apt-get remove libpq5 -y
RUN apt-get install libpq-dev r-cran-rgl -y

RUN install2.r --error dplyr
RUN install2.r --error \
    sqldf \
    jsonlite \
    httr \
    zip
    
RUN install2.r --error -r 'http://cran.r-project.org'  \
    data.table \
    desc \
    dismo \
    dplyr \
    RPostgreSQL \
    car \
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

RUN apt-get install -y r-cran-rjava default-jre default-jdk libxml2-dev libudunits2-dev libgeos-dev
RUN R CMD javareconf

RUN install2.r --error -r 'http://cran.r-project.org' XLConnect rentrez rgbif
RUN install2.r --error -r 'http://cran.r-project.org' lmfor tidyverse survey dismo stringi survival DT lattice png jpeg vegan sampling sp markdown nortest outliers raster SamplingBigData scales spatial whisker

RUN apt-get install -y libglu1-mesa-dev 
RUN apt-get install -y libiodbc2-dev
RUN apt-get install -y unixodbc unixodbc-dev r-cran-rodbc libgdal20 libgdal-dev libproj-dev
RUN apt-get install -y r-cran-hmisc libfontconfig1-dev libcairo2-dev 
RUN apt-get install -y libgit2-dev r-cran-vegan

RUN install2.r --error -r 'http://cran.r-project.org' sf rgdal
RUN install2.r --error -r 'http://cran.r-project.org' weights Hmisc
RUN install2.r --error -r 'https://mac.R-project.org' mapview
RUN install2.r --error -r 'http://cran.r-project.org' ggExtra BIOMASS
RUN install2.r --error -r 'http://cran.r-project.org' BiodiversityR

