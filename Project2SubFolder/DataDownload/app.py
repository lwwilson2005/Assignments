
# This program delivers the alternate json style data to the visualization team.
# The program is based on the microframework Flask. We use pymysql as the MySQL
# database connector. The data is delivered on port 8001 with the
# appropriate URL. To execute this program in Visual Studio Code
# execute python app.py

# import necessary libraries

from sqlalchemy import create_engine
from sqlalchemy.dialects.mysql import VARCHAR, INTEGER, DOUBLE
import pandas as pd
from warnings import filterwarnings
import pymysql
filterwarnings('ignore', category=pymysql.Warning)
import os
import json
 
import numpy as np
from flask import (
    Flask,
    render_template,
    jsonify,
    request)


# My routine to conceal root passwords
pass_file_name = "C:\KUBootCamp\\passw.json"
data = json.load(open(pass_file_name))

spassword = data['mysql_root']


def RunSQL(sql_command):
    connection = pymysql.connect(host='localhost',
                             user='root',
                             password=spassword,
                             db='project2',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
           cursor.execute(sql_command)
           data = cursor.fetchone()
    except Exception as e: 
        print(e)
    finally:
        connection.close()


#using sqlalchemy engine
seng = 'mysql+pymysql://root:'+spassword+'@localhost/project2'

engine=create_engine(seng)
data = pd.read_sql_query('select * from clean_personal_inc', engine)
#data.head(2)


#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#pip install flask-mysql
#from flask.ext.mysql import MySQL
from flaskext.mysql import MySQL
mysql = MySQL()
 
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = spassword
app.config['MYSQL_DATABASE_DB'] = 'project2'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'
mysql.init_app(app)


#################################################
# Database Setup
#################################################

#from flask_sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql:///root:'+spassword+'@localhost/project2"

db = SQLAlchemy(app)


#test flask
fname = 'clean_personal_inc'
new_df = pd.read_sql_query('select * from '+fname, engine)


#################################################
# Routes
#################################################

@app.route("/")
def welcome():

    return "Welcome Komron and Mark!"

@app.route("/search/1/pw/ProJEct2/table/<tbl>/db/1", methods=['GET'])
# the above route takes the table name and delivers the entire table in json
def test1(tbl):
    print("Server received request for table " + tbl)
    fname = tbl
    new_df = pd.read_sql_query('select * from ' + fname, engine)
    #retData = pd.DataFrame.to_json(new_df)
    
    retData = new_df.to_json(orient='records')
    return (retData)

@app.route("/test2")
#this route is a test route
def test2():
    print("Server received request for 'test1 data' page...")
    new_df = pd.read_sql_query('select * from Clean_personal_inc', engine)
    
    #retData = pd.DataFrame.to_json(new_df)
    retData = new_df.to_json(orient='records')
    
    return (retData)

if __name__ == "__main__":
    #app.run()
    app.run(host='0.0.0.0', port=8001, debug=True)

