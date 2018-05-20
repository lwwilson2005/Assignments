

from sqlalchemy import create_engine
from sqlalchemy.dialects.mysql import VARCHAR, INTEGER, DOUBLE
import pandas as pd
from warnings import filterwarnings
#import pymysql
import sqlite3

#filterwarnings('ignore', category=sqlite3.Warning)
import os
import json
from datetime import datetime
from dateutil.parser import parse
 
import numpy as np
from flask import (
    Flask,
    render_template,
    jsonify,
    request)



#using sqlalchemy engine
seng = 'sqlite:///database/hawaii.sqlite'

engine=create_engine(seng)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Database Setup
#################################################

#from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database/hawaii.sqlite"
db = SQLAlchemy(app)

#################################################
# Routes
#################################################

@app.route("/")
def welcome():
    # test route to ensure connectivity
    return "Welcome Komron and Mark!"


@app.route("/api/v1.0/precipitation")
#this route is delivers the tob data for the last year although this is a precipitation route
#verified with ta's this is requested data
def names():
    print("Server received request for 'precipitation data' page...")
    #return the list of sample names
    #new_df = pd.read_sql_query('select [date], [tobs] from w_measurement where date >= "2017-01-01" and "2018-01-01" order by date  ', engine)
    new_df = pd.read_sql_query('select [date], [tobs] from w_measurement order by date  ', engine)
    #
    tobs_df = pd.DataFrame(new_df, columns=['date', 'tobs'])
    tobs_df['date'] = pd.to_datetime(tobs_df['date'], format='%Y/%m/%d')
    tobs_df.set_index(tobs_df['date'])
    tobs_df.reset_index()
    tobs_df.tobs = tobs_df.tobs.astype(float)
    #
    #
    retData = tobs_df.to_json(orient='columns')
    
    return (retData)

@app.route("/api/v1.0/stations")
#this route is a delivers the station data
def stations():
    print("Server received request for 'station data' page...")
    #return the list of sample names
    new_df = pd.read_sql_query('select [station], [name] from w_station', engine)
    
    #retData = pd.DataFrame.to_json(new_df)
    retData = new_df.to_json(orient='values')
    
    return (retData)

@app.route("/api/v1.0/tobs", methods=['GET'])
# the above route delivers the temperature observation table in json
def metadata():
    print("Server received request for Temperature Observations")
    new_df = pd.read_sql_query('select date, tobs from w_measurement where date >= "2017-01-01" and "2018-01-01"', engine)
    
    retData = new_df.to_json(orient='columns')
    return (retData)

@app.route("/api/v1.0/<string:start>", methods=['GET'])
# the above route takes the delivers the avg, max and min temps for all dates > start date
def wfreq(start):
    print("Server received request for start data for  " + start)
    new_df = pd.read_sql_query('select date, tobs from w_measurement', engine)
    #
    new_df['tobs'] = new_df['tobs'].astype('float64')
    new_df['date'] = pd.to_datetime(new_df['date'])
    #
    temp_df = new_df[(new_df['date'] >= start)]
    min_temp = temp_df['tobs'].min()    
    avg_temp = temp_df['tobs'].mean()
    max_temp = temp_df['tobs'].max()
    temps = {
        'min temp': min_temp,
        'avg temp': avg_temp,
        'max temp': max_temp
    }
    #
    print(temps)
    temps_df = pd.DataFrame(temps, index=[1])
    #
    retData = temps_df.to_json(orient='records')
    return (retData)

@app.route("/api/v1.0/<string:start1>/<string:end1>", methods=['GET'])
# the above route takes the delivers the avg, max and min temps for all dates between the start and end date
def stime(start1,end1):
    print("Server received request for period  " + start1 + ' to ' + end1)
    new_df = pd.read_sql_query('select date, tobs from w_measurement', engine)
    #
    new_df['tobs'] = new_df['tobs'].astype('float64')
    new_df['date'] = pd.to_datetime(new_df['date'])
    #
    #mask = (new_df['date'] > start1) & (new_df['date'] < end1)
    #temp_df = new_df.loc[mask]  
    temp_df = new_df[(new_df['date'] >= start1) & (new_df['date'] <= end1)]
    min_temp = temp_df['tobs'].min()    
    avg_temp = temp_df['tobs'].mean()
    max_temp = temp_df['tobs'].max()
    temps = {
        'min temp': min_temp,
        'avg temp': avg_temp,
        'max temp': max_temp
    }
    #
    print(temps)
    temps_df = pd.DataFrame(temps, index=[1])
    #
    retData = temps_df.to_json(orient='records')
    return (retData)



if __name__ == "__main__":
    #app.run()
    app.run(debug=True)

