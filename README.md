# Code and data accompanying the paper: "Evaluation of Bicycle Sharing Scheme Data as a Proxy for Cycling Mobility - How COVID-19 Measures Influenced Cycling in Paris" by Stefan S. Ivanovic, Jo Wood & Ross. S. Purves

## Visualizations

The visualizations encompass dynamic heatmaps displaying traffic counts for an individual day. The heatmap is linked to a geographic map displaying the counter locations as well as to a line graph showing anomalies (the so-called Chi values) in traffic volume over time. We wouldn't have been able to implement our visualisations without the Open Data. Many thanks to administrative bodies for providing data and documentation and to [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) for mapping data.

The visualizations were originally developed in the [Mobv project](https://jwolondon.github.io/mobv/) and this repository contains all the code relevant to the paper.

![Urban Mobility Viewer Zurich](https://raw.githubusercontent.com/jwoLondon/mobv/master/assets/gifs/mobv-Zurich2.gif)

## Data, code and visualizations

This repository contains:

- [data specifications](https://github.com/jwoLondon/tripParisVis/tree/main/dataSpecifications)
- [data](https://github.com/jwoLondon/tripParisVis/tree/main/data/paris)) as well as
- [visualization and front-end code](https://github.com/jwoLondon/tripParisVis/tree/main/docs)
- [R output from negative binomial regression]()
  ...related to the paper. All code is open under the GNU General Public License v3.0. Data sources are listed in each directory. Zurich, Basel, New York and London data are all available as Open Data. German data are available from [hyStreet](hystreet.com) using their API.

## Team

Conceived and implemented by

- _[Ross Purves](https://twitter.com/GCUZH) – [Department of Geography, University of Zurich](https://www.geo.uzh.ch/~rsp/)_
- _[Ralph Straumann](https://twitter.com/rastrau) – [EBP, Data Science Team, Zurich](https://www.ebp.ch)_
- _[Jo Wood](https://twitter.com/jwolondon) – [giCentre, City University London](https://www.gicentre.net/jwo)_
