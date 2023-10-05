Bike sharing system data were collected using an API provided by Vélib. These data are made available in realtime. Current versions of the API can be found here:

- Number of available bikes at stations : https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_status.json
- Location and characteristics of Velib' stations: https://velib-metropole-opendata.smovengo.cloud/opendata/Velib_Metropole/station_information.json

Historical bike counter data are available as Open Data and can be found here under an [Open Data Licence](https://opendatacommons.org/licenses/odbl/).
https://parisdata.opendatasoft.com/explore/dataset/comptage-velo-compteurs/information/?disjunctive.id_compteur&disjunctive.nom_compteur&disjunctive.id&disjunctive.name&disjunctive.channel_id&disjunctive.channel_name&disjunctive.channel_sens&disjunctive.counter

The following files are provided here, which were used to create visualizations and for the statistical modelling in the paper. 

ParisHourlyCount.csv
ParisHourlyCountCounters.csv
Global average hourly counts for bike sharing system and bike counters for 2020.

StationDailyTimeSeries.csv
StationDailyTimeSeriesCounters.csv
Daily counts of bicycle movements for bike sharing system and bike counters for 2020.

StationReference.csv
StationReferenceCounters.csv
Daily reference counts for Sunday to Saturday which are used to calculate daily anomalies. The periods over which these references are calculated are described in the paper.

StationLocations.csv
StationLocationsCounters.csv
Locations of bike sharing system and bike counter stations in Paris.

annotations.csv
Descriptions of Covid-19 relevant events used to annotate figures.
