

from sqlalchemy import create_engine
from sqlalchemy.dialects.mysql import VARCHAR, INTEGER, DOUBLE
import pandas as pd
from warnings import filterwarnings
#import pymysql
import sqlite3

#filterwarnings('ignore', category=sqlite3.Warning)
import os
import json
 
import numpy as np
from flask import (
    Flask,
    render_template,
    jsonify,
    request)

from flask_cors import CORS, cross_origin

# My routine to conceal root passwords
pass_file_name = "C:\KUBootCamp\\passw.json"
data = json.load(open(pass_file_name))

spassword = data['mysql_root']

#using sqlalchemy engine
seng = 'sqlite:///database.sqlite'

engine=create_engine(seng)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)
CORS(app)

#################################################
# Database Setup
#################################################

#from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.sqlite"
db = SQLAlchemy(app)

#################################################
# Routes
#################################################

@app.route("/")
def welcome():

    return "Welcome Komron and Mark!"


@app.route("/names", methods=['GET'])
#this route is a test route
def names():
    print("Server received request for 'names data' page...")
    #return the list of sample names
    fname = 'clean_bbMetadata'
    new_df = pd.read_sql_query('select [sampleid] from '+fname, engine)
    retData = new_df.to_json(orient='values')
    
    return (retData)

@app.route("/otu")
#this route is a test route
def otu():
    print("Server received request for 'otu data' page...")
    #return the list of sample names
    fname = 'clean_bellybuttondata'
    new_df = pd.read_sql_query('select [lowest_taxonomic_unit_found] from '+fname, engine)
    
    #retData = pd.DataFrame.to_json(new_df)
    retData = new_df.to_json(orient='values')
    
    return (retData)


@app.route("/metadata/<sample>", methods=['GET'])
# the above route takes the table name and delivers the entire table in json
def metadata(sample):
    print("Server received request for metadata for " + sample)
    sampleID = sample
    fname = 'clean_bbMetadata'
    new_df = pd.read_sql_query('select [AGE],[BBTYPE], [ETHNICITY], [GENDER],[LOCATION],[SAMPLEID]  from '+fname + ' where [sampleid] = ' + sampleID, engine)
    #retData = pd.DataFrame.to_json(new_df)
    
    #retData = new_df.to_json(orient='records')
    retData =  json.dumps(new_df.iloc[0,:].to_dict())
    return (retData)

@app.route("/wfreq/<sample>", methods=['GET'])
# the above route takes the table name and delivers the entire table in json
def wfreq(sample):
    print("Server received request for wash frequency for  " + sample)
    sampleID = sample
    fname = 'clean_bbMetadata'
    new_df = pd.read_sql_query('select [WFREQ]  from '+fname + ' where [sampleid] = ' + sampleID, engine)   
    #retData = pd.DataFrame.to_json(new_df)
    
    retData = new_df.to_json(orient='values')
    return (retData)

@app.route("/samples/<sample>", methods=['GET'])
# the above route takes the table name and delivers the entire table in json
def samples(sample):
    print("Server received request for samples for  " + sample)
    sampleID = 'BB_'+ sample
    
    fname = 'clean_bbSamples'
    new_df = pd.read_sql_query('select [otu_id], [' + sampleID + '] from '+fname+  ' order by  ['+sampleID+'] DESC' , engine)
    #retData = pd.DataFrame.to_json(new_df)
    
    retData = new_df.to_json(orient='records')
    return (retData)

if __name__ == "__main__":
    #app.run()
    app.run(debug=True)

