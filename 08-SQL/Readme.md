

```python
from sqlalchemy import create_engine
import pandas as pd
from warnings import filterwarnings
import pymysql
filterwarnings('ignore', category=pymysql.Warning)
import os
import json
```


```python
#My routine to conceal root passwords
pass_file_name = "C:\KUBootCamp\\passw.json"
data = json.load(open(pass_file_name))

spassword = data['mysql_root']
```


```python
def RunSQL(sql_command):
    connection = pymysql.connect(host='localhost',
                             user='root',
                             password=spassword,
                             db='sakila',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            commands = sql_command.split(';')
            for command in commands:
                if command == '\n': continue
                cursor.execute(command + ';')
                connection.commit()
    except Exception as e: 
        print(e)
    finally:
        connection.close()
```


```python
#using sqlalchemy engine
seng = 'mysql+pymysql://root:'+spassword+'@localhost/sakila'
#print(seng)
#engine = create_engine('mysql+pymysql://root:'+spassword+''@localhost/animals_db')
engine=create_engine(seng)
data = pd.read_sql_query('select * from actor', engine)


```


```python
#todo 1a. Display the first and last names of all actors from the table actor
print(data.first_name + " " +data.last_name)
```

    0         PENELOPE GUINESS
    1            NICK WAHLBERG
    2                 ED CHASE
    3           JENNIFER DAVIS
    4      JOHNNY LOLLOBRIGIDA
    5          BETTE NICHOLSON
    6             GRACE MOSTEL
    7        MATTHEW JOHANSSON
    8                JOE SWANK
    9          CHRISTIAN GABLE
    10               ZERO CAGE
    11              KARL BERRY
    12                UMA WOOD
    13           VIVIEN BERGEN
    14            CUBA OLIVIER
    15            FRED COSTNER
    16            HELEN VOIGHT
    17                DAN TORN
    18             BOB FAWCETT
    19           LUCILLE TRACY
    20         KIRSTEN PALTROW
    21              ELVIS MARX
    22           SANDRA KILMER
    23          CAMERON STREEP
    24             KEVIN BLOOM
    25            RIP CRAWFORD
    26           JULIA MCQUEEN
    27           WOODY HOFFMAN
    28              ALEC WAYNE
    29             SANDRA PECK
                  ...         
    170       OLYMPIA PFEIFFER
    171       GROUCHO WILLIAMS
    172          ALAN DREYFUSS
    173         MICHAEL BENING
    174        WILLIAM HACKMAN
    175              JON CHASE
    176          GENE MCKELLEN
    177            LISA MONROE
    178             ED GUINESS
    179       JEFF SILVERSTONE
    180         MATTHEW CARREY
    181          DEBBIE AKROYD
    182          RUSSELL CLOSE
    183       HUMPHREY GARLAND
    184         MICHAEL BOLGER
    185        JULIA ZELLWEGER
    186             RENEE BALL
    187           ROCK DUKAKIS
    188             CUBA BIRCH
    189          AUDREY BAILEY
    190        GREGORY GOODING
    191            JOHN SUVARI
    192            BURT TEMPLE
    193            MERYL ALLEN
    194      JAYNE SILVERSTONE
    195            BELA WALKEN
    196             REESE WEST
    197            MARY KEITEL
    198          JULIA FAWCETT
    199           THORA TEMPLE
    Length: 200, dtype: object
    


```python
#1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name
engine=create_engine(seng)
data['Actor Name'] = pd.read_sql_query('select UPPER(concat(first_name," ", last_name))  from actor', engine)
data
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
      <th>Actor Name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
      <td>PENELOPE GUINESS</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>NICK</td>
      <td>WAHLBERG</td>
      <td>2006-02-15 04:34:33</td>
      <td>NICK WAHLBERG</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ED</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
      <td>ED CHASE</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>JENNIFER</td>
      <td>DAVIS</td>
      <td>2006-02-15 04:34:33</td>
      <td>JENNIFER DAVIS</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>JOHNNY</td>
      <td>LOLLOBRIGIDA</td>
      <td>2006-02-15 04:34:33</td>
      <td>JOHNNY LOLLOBRIGIDA</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>BETTE</td>
      <td>NICHOLSON</td>
      <td>2006-02-15 04:34:33</td>
      <td>BETTE NICHOLSON</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>GRACE</td>
      <td>MOSTEL</td>
      <td>2006-02-15 04:34:33</td>
      <td>GRACE MOSTEL</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>MATTHEW</td>
      <td>JOHANSSON</td>
      <td>2006-02-15 04:34:33</td>
      <td>MATTHEW JOHANSSON</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>JOE</td>
      <td>SWANK</td>
      <td>2006-02-15 04:34:33</td>
      <td>JOE SWANK</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>CHRISTIAN</td>
      <td>GABLE</td>
      <td>2006-02-15 04:34:33</td>
      <td>CHRISTIAN GABLE</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ZERO</td>
      <td>CAGE</td>
      <td>2006-02-15 04:34:33</td>
      <td>ZERO CAGE</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>KARL</td>
      <td>BERRY</td>
      <td>2006-02-15 04:34:33</td>
      <td>KARL BERRY</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>UMA</td>
      <td>WOOD</td>
      <td>2006-02-15 04:34:33</td>
      <td>UMA WOOD</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VIVIEN</td>
      <td>BERGEN</td>
      <td>2006-02-15 04:34:33</td>
      <td>VIVIEN BERGEN</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>CUBA</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
      <td>CUBA OLIVIER</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>FRED</td>
      <td>COSTNER</td>
      <td>2006-02-15 04:34:33</td>
      <td>FRED COSTNER</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>HELEN</td>
      <td>VOIGHT</td>
      <td>2006-02-15 04:34:33</td>
      <td>HELEN VOIGHT</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>DAN</td>
      <td>TORN</td>
      <td>2006-02-15 04:34:33</td>
      <td>DAN TORN</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>BOB</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
      <td>BOB FAWCETT</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>LUCILLE</td>
      <td>TRACY</td>
      <td>2006-02-15 04:34:33</td>
      <td>LUCILLE TRACY</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>KIRSTEN</td>
      <td>PALTROW</td>
      <td>2006-02-15 04:34:33</td>
      <td>KIRSTEN PALTROW</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>ELVIS</td>
      <td>MARX</td>
      <td>2006-02-15 04:34:33</td>
      <td>ELVIS MARX</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>SANDRA</td>
      <td>KILMER</td>
      <td>2006-02-15 04:34:33</td>
      <td>SANDRA KILMER</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>CAMERON</td>
      <td>STREEP</td>
      <td>2006-02-15 04:34:33</td>
      <td>CAMERON STREEP</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>KEVIN</td>
      <td>BLOOM</td>
      <td>2006-02-15 04:34:33</td>
      <td>KEVIN BLOOM</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>RIP</td>
      <td>CRAWFORD</td>
      <td>2006-02-15 04:34:33</td>
      <td>RIP CRAWFORD</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>JULIA</td>
      <td>MCQUEEN</td>
      <td>2006-02-15 04:34:33</td>
      <td>JULIA MCQUEEN</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>WOODY</td>
      <td>HOFFMAN</td>
      <td>2006-02-15 04:34:33</td>
      <td>WOODY HOFFMAN</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>ALEC</td>
      <td>WAYNE</td>
      <td>2006-02-15 04:34:33</td>
      <td>ALEC WAYNE</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>SANDRA</td>
      <td>PECK</td>
      <td>2006-02-15 04:34:33</td>
      <td>SANDRA PECK</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>170</th>
      <td>171</td>
      <td>OLYMPIA</td>
      <td>PFEIFFER</td>
      <td>2006-02-15 04:34:33</td>
      <td>OLYMPIA PFEIFFER</td>
    </tr>
    <tr>
      <th>171</th>
      <td>172</td>
      <td>GROUCHO</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 16:45:51</td>
      <td>GROUCHO WILLIAMS</td>
    </tr>
    <tr>
      <th>172</th>
      <td>173</td>
      <td>ALAN</td>
      <td>DREYFUSS</td>
      <td>2006-02-15 04:34:33</td>
      <td>ALAN DREYFUSS</td>
    </tr>
    <tr>
      <th>173</th>
      <td>174</td>
      <td>MICHAEL</td>
      <td>BENING</td>
      <td>2006-02-15 04:34:33</td>
      <td>MICHAEL BENING</td>
    </tr>
    <tr>
      <th>174</th>
      <td>175</td>
      <td>WILLIAM</td>
      <td>HACKMAN</td>
      <td>2006-02-15 04:34:33</td>
      <td>WILLIAM HACKMAN</td>
    </tr>
    <tr>
      <th>175</th>
      <td>176</td>
      <td>JON</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
      <td>JON CHASE</td>
    </tr>
    <tr>
      <th>176</th>
      <td>177</td>
      <td>GENE</td>
      <td>MCKELLEN</td>
      <td>2006-02-15 04:34:33</td>
      <td>GENE MCKELLEN</td>
    </tr>
    <tr>
      <th>177</th>
      <td>178</td>
      <td>LISA</td>
      <td>MONROE</td>
      <td>2006-02-15 04:34:33</td>
      <td>LISA MONROE</td>
    </tr>
    <tr>
      <th>178</th>
      <td>179</td>
      <td>ED</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
      <td>ED GUINESS</td>
    </tr>
    <tr>
      <th>179</th>
      <td>180</td>
      <td>JEFF</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
      <td>JEFF SILVERSTONE</td>
    </tr>
    <tr>
      <th>180</th>
      <td>181</td>
      <td>MATTHEW</td>
      <td>CARREY</td>
      <td>2006-02-15 04:34:33</td>
      <td>MATTHEW CARREY</td>
    </tr>
    <tr>
      <th>181</th>
      <td>182</td>
      <td>DEBBIE</td>
      <td>AKROYD</td>
      <td>2006-02-15 04:34:33</td>
      <td>DEBBIE AKROYD</td>
    </tr>
    <tr>
      <th>182</th>
      <td>183</td>
      <td>RUSSELL</td>
      <td>CLOSE</td>
      <td>2006-02-15 04:34:33</td>
      <td>RUSSELL CLOSE</td>
    </tr>
    <tr>
      <th>183</th>
      <td>184</td>
      <td>HUMPHREY</td>
      <td>GARLAND</td>
      <td>2006-02-15 04:34:33</td>
      <td>HUMPHREY GARLAND</td>
    </tr>
    <tr>
      <th>184</th>
      <td>185</td>
      <td>MICHAEL</td>
      <td>BOLGER</td>
      <td>2006-02-15 04:34:33</td>
      <td>MICHAEL BOLGER</td>
    </tr>
    <tr>
      <th>185</th>
      <td>186</td>
      <td>JULIA</td>
      <td>ZELLWEGER</td>
      <td>2006-02-15 04:34:33</td>
      <td>JULIA ZELLWEGER</td>
    </tr>
    <tr>
      <th>186</th>
      <td>187</td>
      <td>RENEE</td>
      <td>BALL</td>
      <td>2006-02-15 04:34:33</td>
      <td>RENEE BALL</td>
    </tr>
    <tr>
      <th>187</th>
      <td>188</td>
      <td>ROCK</td>
      <td>DUKAKIS</td>
      <td>2006-02-15 04:34:33</td>
      <td>ROCK DUKAKIS</td>
    </tr>
    <tr>
      <th>188</th>
      <td>189</td>
      <td>CUBA</td>
      <td>BIRCH</td>
      <td>2006-02-15 04:34:33</td>
      <td>CUBA BIRCH</td>
    </tr>
    <tr>
      <th>189</th>
      <td>190</td>
      <td>AUDREY</td>
      <td>BAILEY</td>
      <td>2006-02-15 04:34:33</td>
      <td>AUDREY BAILEY</td>
    </tr>
    <tr>
      <th>190</th>
      <td>191</td>
      <td>GREGORY</td>
      <td>GOODING</td>
      <td>2006-02-15 04:34:33</td>
      <td>GREGORY GOODING</td>
    </tr>
    <tr>
      <th>191</th>
      <td>192</td>
      <td>JOHN</td>
      <td>SUVARI</td>
      <td>2006-02-15 04:34:33</td>
      <td>JOHN SUVARI</td>
    </tr>
    <tr>
      <th>192</th>
      <td>193</td>
      <td>BURT</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
      <td>BURT TEMPLE</td>
    </tr>
    <tr>
      <th>193</th>
      <td>194</td>
      <td>MERYL</td>
      <td>ALLEN</td>
      <td>2006-02-15 04:34:33</td>
      <td>MERYL ALLEN</td>
    </tr>
    <tr>
      <th>194</th>
      <td>195</td>
      <td>JAYNE</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
      <td>JAYNE SILVERSTONE</td>
    </tr>
    <tr>
      <th>195</th>
      <td>196</td>
      <td>BELA</td>
      <td>WALKEN</td>
      <td>2006-02-15 04:34:33</td>
      <td>BELA WALKEN</td>
    </tr>
    <tr>
      <th>196</th>
      <td>197</td>
      <td>REESE</td>
      <td>WEST</td>
      <td>2006-02-15 04:34:33</td>
      <td>REESE WEST</td>
    </tr>
    <tr>
      <th>197</th>
      <td>198</td>
      <td>MARY</td>
      <td>KEITEL</td>
      <td>2006-02-15 04:34:33</td>
      <td>MARY KEITEL</td>
    </tr>
    <tr>
      <th>198</th>
      <td>199</td>
      <td>JULIA</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
      <td>JULIA FAWCETT</td>
    </tr>
    <tr>
      <th>199</th>
      <td>200</td>
      <td>THORA</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
      <td>THORA TEMPLE</td>
    </tr>
  </tbody>
</table>
<p>200 rows × 5 columns</p>
</div>




```python
#2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
engine=create_engine(seng)
Joe = pd.read_sql_query('select actor_id, first_name, last_name  from actor where first_name = "Joe"', engine)
Joe
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>9</td>
      <td>JOE</td>
      <td>SWANK</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2b. Find all actors whose last name contain the letters GEN:
sql_query = """
select *
from actor
where last_name LIKE '%%GEN%%'
;
"""
engine=create_engine(seng)
gen = pd.read_sql_query(sql_query, engine)
gen
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>14</td>
      <td>VIVIEN</td>
      <td>BERGEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>41</td>
      <td>JODIE</td>
      <td>DEGENERES</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>107</td>
      <td>GINA</td>
      <td>DEGENERES</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>3</th>
      <td>166</td>
      <td>NICK</td>
      <td>DEGENERES</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
sql_query = """
select *
from actor
where last_name LIKE '%%LI%%'
order by last_name, first_name
;
"""
engine=create_engine(seng)
data2 = pd.read_sql_query(sql_query, engine)
data2
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>86</td>
      <td>GREG</td>
      <td>CHAPLIN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>82</td>
      <td>WOODY</td>
      <td>JOLIE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>34</td>
      <td>AUDREY</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>3</th>
      <td>15</td>
      <td>CUBA</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>172</td>
      <td>GROUCHO</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 16:45:51</td>
    </tr>
    <tr>
      <th>5</th>
      <td>137</td>
      <td>MORGAN</td>
      <td>WILLIAMS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>6</th>
      <td>72</td>
      <td>SEAN</td>
      <td>WILLIAMS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>7</th>
      <td>83</td>
      <td>BEN</td>
      <td>WILLIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>8</th>
      <td>96</td>
      <td>GENE</td>
      <td>WILLIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>9</th>
      <td>164</td>
      <td>HUMPHREY</td>
      <td>WILLIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
</div>




```python
#2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:

sql_query = """
select country_id, country
from country
where country IN ('Afghanistan', 'Bangladesh', 'China')
;
"""
engine=create_engine(seng)
data2 = pd.read_sql_query(sql_query, engine)
data2
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>country_id</th>
      <th>country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Afghanistan</td>
    </tr>
    <tr>
      <th>1</th>
      <td>12</td>
      <td>Bangladesh</td>
    </tr>
    <tr>
      <th>2</th>
      <td>23</td>
      <td>China</td>
    </tr>
  </tbody>
</table>
</div>




```python
#3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.


sql_query = """
ALTER TABLE Actor
ADD Column middle_name varchar(15) AFTER first_name

;
"""
RunSQL(sql_query)
engine=create_engine(seng)

data3 = pd.read_sql_query('select * from actor', engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>middle_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>NICK</td>
      <td>None</td>
      <td>WAHLBERG</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ED</td>
      <td>None</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>JENNIFER</td>
      <td>None</td>
      <td>DAVIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>JOHNNY</td>
      <td>None</td>
      <td>LOLLOBRIGIDA</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>BETTE</td>
      <td>None</td>
      <td>NICHOLSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>GRACE</td>
      <td>None</td>
      <td>MOSTEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>MATTHEW</td>
      <td>None</td>
      <td>JOHANSSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>JOE</td>
      <td>None</td>
      <td>SWANK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>CHRISTIAN</td>
      <td>None</td>
      <td>GABLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ZERO</td>
      <td>None</td>
      <td>CAGE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>KARL</td>
      <td>None</td>
      <td>BERRY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>UMA</td>
      <td>None</td>
      <td>WOOD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VIVIEN</td>
      <td>None</td>
      <td>BERGEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>CUBA</td>
      <td>None</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>FRED</td>
      <td>None</td>
      <td>COSTNER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>HELEN</td>
      <td>None</td>
      <td>VOIGHT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>DAN</td>
      <td>None</td>
      <td>TORN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>BOB</td>
      <td>None</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>LUCILLE</td>
      <td>None</td>
      <td>TRACY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>KIRSTEN</td>
      <td>None</td>
      <td>PALTROW</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>ELVIS</td>
      <td>None</td>
      <td>MARX</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>SANDRA</td>
      <td>None</td>
      <td>KILMER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>CAMERON</td>
      <td>None</td>
      <td>STREEP</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>KEVIN</td>
      <td>None</td>
      <td>BLOOM</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>RIP</td>
      <td>None</td>
      <td>CRAWFORD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>JULIA</td>
      <td>None</td>
      <td>MCQUEEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>WOODY</td>
      <td>None</td>
      <td>HOFFMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>ALEC</td>
      <td>None</td>
      <td>WAYNE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>SANDRA</td>
      <td>None</td>
      <td>PECK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>170</th>
      <td>171</td>
      <td>OLYMPIA</td>
      <td>None</td>
      <td>PFEIFFER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>171</th>
      <td>172</td>
      <td>GROUCHO</td>
      <td>None</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 16:45:51</td>
    </tr>
    <tr>
      <th>172</th>
      <td>173</td>
      <td>ALAN</td>
      <td>None</td>
      <td>DREYFUSS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>173</th>
      <td>174</td>
      <td>MICHAEL</td>
      <td>None</td>
      <td>BENING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>174</th>
      <td>175</td>
      <td>WILLIAM</td>
      <td>None</td>
      <td>HACKMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>175</th>
      <td>176</td>
      <td>JON</td>
      <td>None</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>176</th>
      <td>177</td>
      <td>GENE</td>
      <td>None</td>
      <td>MCKELLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>177</th>
      <td>178</td>
      <td>LISA</td>
      <td>None</td>
      <td>MONROE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>178</th>
      <td>179</td>
      <td>ED</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>179</th>
      <td>180</td>
      <td>JEFF</td>
      <td>None</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>180</th>
      <td>181</td>
      <td>MATTHEW</td>
      <td>None</td>
      <td>CARREY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>181</th>
      <td>182</td>
      <td>DEBBIE</td>
      <td>None</td>
      <td>AKROYD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>182</th>
      <td>183</td>
      <td>RUSSELL</td>
      <td>None</td>
      <td>CLOSE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>183</th>
      <td>184</td>
      <td>HUMPHREY</td>
      <td>None</td>
      <td>GARLAND</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>184</th>
      <td>185</td>
      <td>MICHAEL</td>
      <td>None</td>
      <td>BOLGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>185</th>
      <td>186</td>
      <td>JULIA</td>
      <td>None</td>
      <td>ZELLWEGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>186</th>
      <td>187</td>
      <td>RENEE</td>
      <td>None</td>
      <td>BALL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>187</th>
      <td>188</td>
      <td>ROCK</td>
      <td>None</td>
      <td>DUKAKIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>188</th>
      <td>189</td>
      <td>CUBA</td>
      <td>None</td>
      <td>BIRCH</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>189</th>
      <td>190</td>
      <td>AUDREY</td>
      <td>None</td>
      <td>BAILEY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>190</th>
      <td>191</td>
      <td>GREGORY</td>
      <td>None</td>
      <td>GOODING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>191</th>
      <td>192</td>
      <td>JOHN</td>
      <td>None</td>
      <td>SUVARI</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>192</th>
      <td>193</td>
      <td>BURT</td>
      <td>None</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>193</th>
      <td>194</td>
      <td>MERYL</td>
      <td>None</td>
      <td>ALLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>194</th>
      <td>195</td>
      <td>JAYNE</td>
      <td>None</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>195</th>
      <td>196</td>
      <td>BELA</td>
      <td>None</td>
      <td>WALKEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>196</th>
      <td>197</td>
      <td>REESE</td>
      <td>None</td>
      <td>WEST</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>197</th>
      <td>198</td>
      <td>MARY</td>
      <td>None</td>
      <td>KEITEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>198</th>
      <td>199</td>
      <td>JULIA</td>
      <td>None</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>199</th>
      <td>200</td>
      <td>THORA</td>
      <td>None</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
<p>200 rows × 5 columns</p>
</div>




```python
#3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs.
sql_query = """
ALTER TABLE Actor
DROP Column middle_name

;
"""
RunSQL(sql_query)

sql_query = """
ALTER TABLE Actor
ADD Column middle_name BLOB AFTER first_name

;
"""
RunSQL(sql_query)
engine=create_engine(seng)

data3 = pd.read_sql_query('select * from actor', engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>middle_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>NICK</td>
      <td>None</td>
      <td>WAHLBERG</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ED</td>
      <td>None</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>JENNIFER</td>
      <td>None</td>
      <td>DAVIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>JOHNNY</td>
      <td>None</td>
      <td>LOLLOBRIGIDA</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>BETTE</td>
      <td>None</td>
      <td>NICHOLSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>GRACE</td>
      <td>None</td>
      <td>MOSTEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>MATTHEW</td>
      <td>None</td>
      <td>JOHANSSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>JOE</td>
      <td>None</td>
      <td>SWANK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>CHRISTIAN</td>
      <td>None</td>
      <td>GABLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ZERO</td>
      <td>None</td>
      <td>CAGE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>KARL</td>
      <td>None</td>
      <td>BERRY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>UMA</td>
      <td>None</td>
      <td>WOOD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VIVIEN</td>
      <td>None</td>
      <td>BERGEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>CUBA</td>
      <td>None</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>FRED</td>
      <td>None</td>
      <td>COSTNER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>HELEN</td>
      <td>None</td>
      <td>VOIGHT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>DAN</td>
      <td>None</td>
      <td>TORN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>BOB</td>
      <td>None</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>LUCILLE</td>
      <td>None</td>
      <td>TRACY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>KIRSTEN</td>
      <td>None</td>
      <td>PALTROW</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>ELVIS</td>
      <td>None</td>
      <td>MARX</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>SANDRA</td>
      <td>None</td>
      <td>KILMER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>CAMERON</td>
      <td>None</td>
      <td>STREEP</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>KEVIN</td>
      <td>None</td>
      <td>BLOOM</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>RIP</td>
      <td>None</td>
      <td>CRAWFORD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>JULIA</td>
      <td>None</td>
      <td>MCQUEEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>WOODY</td>
      <td>None</td>
      <td>HOFFMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>ALEC</td>
      <td>None</td>
      <td>WAYNE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>SANDRA</td>
      <td>None</td>
      <td>PECK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>170</th>
      <td>171</td>
      <td>OLYMPIA</td>
      <td>None</td>
      <td>PFEIFFER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>171</th>
      <td>172</td>
      <td>GROUCHO</td>
      <td>None</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 16:45:51</td>
    </tr>
    <tr>
      <th>172</th>
      <td>173</td>
      <td>ALAN</td>
      <td>None</td>
      <td>DREYFUSS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>173</th>
      <td>174</td>
      <td>MICHAEL</td>
      <td>None</td>
      <td>BENING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>174</th>
      <td>175</td>
      <td>WILLIAM</td>
      <td>None</td>
      <td>HACKMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>175</th>
      <td>176</td>
      <td>JON</td>
      <td>None</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>176</th>
      <td>177</td>
      <td>GENE</td>
      <td>None</td>
      <td>MCKELLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>177</th>
      <td>178</td>
      <td>LISA</td>
      <td>None</td>
      <td>MONROE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>178</th>
      <td>179</td>
      <td>ED</td>
      <td>None</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>179</th>
      <td>180</td>
      <td>JEFF</td>
      <td>None</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>180</th>
      <td>181</td>
      <td>MATTHEW</td>
      <td>None</td>
      <td>CARREY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>181</th>
      <td>182</td>
      <td>DEBBIE</td>
      <td>None</td>
      <td>AKROYD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>182</th>
      <td>183</td>
      <td>RUSSELL</td>
      <td>None</td>
      <td>CLOSE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>183</th>
      <td>184</td>
      <td>HUMPHREY</td>
      <td>None</td>
      <td>GARLAND</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>184</th>
      <td>185</td>
      <td>MICHAEL</td>
      <td>None</td>
      <td>BOLGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>185</th>
      <td>186</td>
      <td>JULIA</td>
      <td>None</td>
      <td>ZELLWEGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>186</th>
      <td>187</td>
      <td>RENEE</td>
      <td>None</td>
      <td>BALL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>187</th>
      <td>188</td>
      <td>ROCK</td>
      <td>None</td>
      <td>DUKAKIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>188</th>
      <td>189</td>
      <td>CUBA</td>
      <td>None</td>
      <td>BIRCH</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>189</th>
      <td>190</td>
      <td>AUDREY</td>
      <td>None</td>
      <td>BAILEY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>190</th>
      <td>191</td>
      <td>GREGORY</td>
      <td>None</td>
      <td>GOODING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>191</th>
      <td>192</td>
      <td>JOHN</td>
      <td>None</td>
      <td>SUVARI</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>192</th>
      <td>193</td>
      <td>BURT</td>
      <td>None</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>193</th>
      <td>194</td>
      <td>MERYL</td>
      <td>None</td>
      <td>ALLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>194</th>
      <td>195</td>
      <td>JAYNE</td>
      <td>None</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>195</th>
      <td>196</td>
      <td>BELA</td>
      <td>None</td>
      <td>WALKEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>196</th>
      <td>197</td>
      <td>REESE</td>
      <td>None</td>
      <td>WEST</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>197</th>
      <td>198</td>
      <td>MARY</td>
      <td>None</td>
      <td>KEITEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>198</th>
      <td>199</td>
      <td>JULIA</td>
      <td>None</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>199</th>
      <td>200</td>
      <td>THORA</td>
      <td>None</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
<p>200 rows × 5 columns</p>
</div>




```python
#3c. Now delete the middle_name column.
sql_query = """
ALTER TABLE Actor
DROP Column middle_name

;
"""
RunSQL(sql_query)


engine=create_engine(seng)

data3 = pd.read_sql_query('select * from actor', engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>PENELOPE</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>NICK</td>
      <td>WAHLBERG</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ED</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>JENNIFER</td>
      <td>DAVIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>JOHNNY</td>
      <td>LOLLOBRIGIDA</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>BETTE</td>
      <td>NICHOLSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>GRACE</td>
      <td>MOSTEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>MATTHEW</td>
      <td>JOHANSSON</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>JOE</td>
      <td>SWANK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>CHRISTIAN</td>
      <td>GABLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ZERO</td>
      <td>CAGE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>KARL</td>
      <td>BERRY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>UMA</td>
      <td>WOOD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>VIVIEN</td>
      <td>BERGEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>CUBA</td>
      <td>OLIVIER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>FRED</td>
      <td>COSTNER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>HELEN</td>
      <td>VOIGHT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>DAN</td>
      <td>TORN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>BOB</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>LUCILLE</td>
      <td>TRACY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>KIRSTEN</td>
      <td>PALTROW</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>ELVIS</td>
      <td>MARX</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>SANDRA</td>
      <td>KILMER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>CAMERON</td>
      <td>STREEP</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>KEVIN</td>
      <td>BLOOM</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>RIP</td>
      <td>CRAWFORD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>JULIA</td>
      <td>MCQUEEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>WOODY</td>
      <td>HOFFMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>ALEC</td>
      <td>WAYNE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>SANDRA</td>
      <td>PECK</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>170</th>
      <td>171</td>
      <td>OLYMPIA</td>
      <td>PFEIFFER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>171</th>
      <td>172</td>
      <td>GROUCHO</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 16:45:51</td>
    </tr>
    <tr>
      <th>172</th>
      <td>173</td>
      <td>ALAN</td>
      <td>DREYFUSS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>173</th>
      <td>174</td>
      <td>MICHAEL</td>
      <td>BENING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>174</th>
      <td>175</td>
      <td>WILLIAM</td>
      <td>HACKMAN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>175</th>
      <td>176</td>
      <td>JON</td>
      <td>CHASE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>176</th>
      <td>177</td>
      <td>GENE</td>
      <td>MCKELLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>177</th>
      <td>178</td>
      <td>LISA</td>
      <td>MONROE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>178</th>
      <td>179</td>
      <td>ED</td>
      <td>GUINESS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>179</th>
      <td>180</td>
      <td>JEFF</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>180</th>
      <td>181</td>
      <td>MATTHEW</td>
      <td>CARREY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>181</th>
      <td>182</td>
      <td>DEBBIE</td>
      <td>AKROYD</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>182</th>
      <td>183</td>
      <td>RUSSELL</td>
      <td>CLOSE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>183</th>
      <td>184</td>
      <td>HUMPHREY</td>
      <td>GARLAND</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>184</th>
      <td>185</td>
      <td>MICHAEL</td>
      <td>BOLGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>185</th>
      <td>186</td>
      <td>JULIA</td>
      <td>ZELLWEGER</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>186</th>
      <td>187</td>
      <td>RENEE</td>
      <td>BALL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>187</th>
      <td>188</td>
      <td>ROCK</td>
      <td>DUKAKIS</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>188</th>
      <td>189</td>
      <td>CUBA</td>
      <td>BIRCH</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>189</th>
      <td>190</td>
      <td>AUDREY</td>
      <td>BAILEY</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>190</th>
      <td>191</td>
      <td>GREGORY</td>
      <td>GOODING</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>191</th>
      <td>192</td>
      <td>JOHN</td>
      <td>SUVARI</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>192</th>
      <td>193</td>
      <td>BURT</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>193</th>
      <td>194</td>
      <td>MERYL</td>
      <td>ALLEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>194</th>
      <td>195</td>
      <td>JAYNE</td>
      <td>SILVERSTONE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>195</th>
      <td>196</td>
      <td>BELA</td>
      <td>WALKEN</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>196</th>
      <td>197</td>
      <td>REESE</td>
      <td>WEST</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>197</th>
      <td>198</td>
      <td>MARY</td>
      <td>KEITEL</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>198</th>
      <td>199</td>
      <td>JULIA</td>
      <td>FAWCETT</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
    <tr>
      <th>199</th>
      <td>200</td>
      <td>THORA</td>
      <td>TEMPLE</td>
      <td>2006-02-15 04:34:33</td>
    </tr>
  </tbody>
</table>
<p>200 rows × 4 columns</p>
</div>




```python
#4a. List the last names of actors, as well as how many actors have that last name.
#SELECT name,COUNT(*) as count FROM tablename GROUP BY name ORDER BY count DESC;
sql_query = """
SELECT last_name, COUNT(*) as count
FROM actor
GROUP BY last_name
;
"""
#RunSQL(sql_query)
engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AKROYD</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ALLEN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ASTAIRE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BACALL</td>
      <td>1</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BAILEY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>5</th>
      <td>BALE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>6</th>
      <td>BALL</td>
      <td>1</td>
    </tr>
    <tr>
      <th>7</th>
      <td>BARRYMORE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>8</th>
      <td>BASINGER</td>
      <td>1</td>
    </tr>
    <tr>
      <th>9</th>
      <td>BENING</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>BERGEN</td>
      <td>1</td>
    </tr>
    <tr>
      <th>11</th>
      <td>BERGMAN</td>
      <td>1</td>
    </tr>
    <tr>
      <th>12</th>
      <td>BERRY</td>
      <td>3</td>
    </tr>
    <tr>
      <th>13</th>
      <td>BIRCH</td>
      <td>1</td>
    </tr>
    <tr>
      <th>14</th>
      <td>BLOOM</td>
      <td>1</td>
    </tr>
    <tr>
      <th>15</th>
      <td>BOLGER</td>
      <td>2</td>
    </tr>
    <tr>
      <th>16</th>
      <td>BRIDGES</td>
      <td>1</td>
    </tr>
    <tr>
      <th>17</th>
      <td>BRODY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>18</th>
      <td>BULLOCK</td>
      <td>1</td>
    </tr>
    <tr>
      <th>19</th>
      <td>CAGE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>20</th>
      <td>CARREY</td>
      <td>1</td>
    </tr>
    <tr>
      <th>21</th>
      <td>CHAPLIN</td>
      <td>1</td>
    </tr>
    <tr>
      <th>22</th>
      <td>CHASE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>23</th>
      <td>CLOSE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>24</th>
      <td>COSTNER</td>
      <td>1</td>
    </tr>
    <tr>
      <th>25</th>
      <td>CRAWFORD</td>
      <td>2</td>
    </tr>
    <tr>
      <th>26</th>
      <td>CRONYN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>27</th>
      <td>CROWE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>28</th>
      <td>CRUISE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>29</th>
      <td>CRUZ</td>
      <td>1</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>91</th>
      <td>POSEY</td>
      <td>1</td>
    </tr>
    <tr>
      <th>92</th>
      <td>PRESLEY</td>
      <td>1</td>
    </tr>
    <tr>
      <th>93</th>
      <td>REYNOLDS</td>
      <td>1</td>
    </tr>
    <tr>
      <th>94</th>
      <td>RYDER</td>
      <td>1</td>
    </tr>
    <tr>
      <th>95</th>
      <td>SILVERSTONE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>96</th>
      <td>SINATRA</td>
      <td>1</td>
    </tr>
    <tr>
      <th>97</th>
      <td>SOBIESKI</td>
      <td>1</td>
    </tr>
    <tr>
      <th>98</th>
      <td>STALLONE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>99</th>
      <td>STREEP</td>
      <td>2</td>
    </tr>
    <tr>
      <th>100</th>
      <td>SUVARI</td>
      <td>1</td>
    </tr>
    <tr>
      <th>101</th>
      <td>SWANK</td>
      <td>1</td>
    </tr>
    <tr>
      <th>102</th>
      <td>TANDY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>103</th>
      <td>TAUTOU</td>
      <td>1</td>
    </tr>
    <tr>
      <th>104</th>
      <td>TEMPLE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>105</th>
      <td>TOMEI</td>
      <td>1</td>
    </tr>
    <tr>
      <th>106</th>
      <td>TORN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>107</th>
      <td>TRACY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>108</th>
      <td>VOIGHT</td>
      <td>1</td>
    </tr>
    <tr>
      <th>109</th>
      <td>WAHLBERG</td>
      <td>2</td>
    </tr>
    <tr>
      <th>110</th>
      <td>WALKEN</td>
      <td>1</td>
    </tr>
    <tr>
      <th>111</th>
      <td>WAYNE</td>
      <td>1</td>
    </tr>
    <tr>
      <th>112</th>
      <td>WEST</td>
      <td>2</td>
    </tr>
    <tr>
      <th>113</th>
      <td>WILLIAMS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>114</th>
      <td>WILLIS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>115</th>
      <td>WILSON</td>
      <td>1</td>
    </tr>
    <tr>
      <th>116</th>
      <td>WINSLET</td>
      <td>2</td>
    </tr>
    <tr>
      <th>117</th>
      <td>WITHERSPOON</td>
      <td>1</td>
    </tr>
    <tr>
      <th>118</th>
      <td>WOOD</td>
      <td>2</td>
    </tr>
    <tr>
      <th>119</th>
      <td>WRAY</td>
      <td>1</td>
    </tr>
    <tr>
      <th>120</th>
      <td>ZELLWEGER</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<p>121 rows × 2 columns</p>
</div>




```python
#4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
sql_query = """
SELECT last_name, COUNT(*) as count
FROM actor

GROUP BY last_name
HAVING Count(*)>=2
;
"""
#RunSQL(sql_query)
engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>last_name</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>AKROYD</td>
      <td>3</td>
    </tr>
    <tr>
      <th>1</th>
      <td>ALLEN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>2</th>
      <td>BAILEY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>3</th>
      <td>BENING</td>
      <td>2</td>
    </tr>
    <tr>
      <th>4</th>
      <td>BERRY</td>
      <td>3</td>
    </tr>
    <tr>
      <th>5</th>
      <td>BOLGER</td>
      <td>2</td>
    </tr>
    <tr>
      <th>6</th>
      <td>BRODY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>7</th>
      <td>CAGE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>8</th>
      <td>CHASE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>9</th>
      <td>CRAWFORD</td>
      <td>2</td>
    </tr>
    <tr>
      <th>10</th>
      <td>CRONYN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>11</th>
      <td>DAVIS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>12</th>
      <td>DEAN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>13</th>
      <td>DEE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>14</th>
      <td>DEGENERES</td>
      <td>3</td>
    </tr>
    <tr>
      <th>15</th>
      <td>DENCH</td>
      <td>2</td>
    </tr>
    <tr>
      <th>16</th>
      <td>DEPP</td>
      <td>2</td>
    </tr>
    <tr>
      <th>17</th>
      <td>DUKAKIS</td>
      <td>2</td>
    </tr>
    <tr>
      <th>18</th>
      <td>FAWCETT</td>
      <td>2</td>
    </tr>
    <tr>
      <th>19</th>
      <td>GARLAND</td>
      <td>3</td>
    </tr>
    <tr>
      <th>20</th>
      <td>GOODING</td>
      <td>2</td>
    </tr>
    <tr>
      <th>21</th>
      <td>GUINESS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>22</th>
      <td>HACKMAN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>23</th>
      <td>HARRIS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>24</th>
      <td>HOFFMAN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>25</th>
      <td>HOPKINS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>26</th>
      <td>HOPPER</td>
      <td>2</td>
    </tr>
    <tr>
      <th>27</th>
      <td>JACKMAN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>28</th>
      <td>JOHANSSON</td>
      <td>3</td>
    </tr>
    <tr>
      <th>29</th>
      <td>KEITEL</td>
      <td>3</td>
    </tr>
    <tr>
      <th>30</th>
      <td>KILMER</td>
      <td>5</td>
    </tr>
    <tr>
      <th>31</th>
      <td>MCCONAUGHEY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>32</th>
      <td>MCKELLEN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>33</th>
      <td>MCQUEEN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>34</th>
      <td>MONROE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>35</th>
      <td>MOSTEL</td>
      <td>2</td>
    </tr>
    <tr>
      <th>36</th>
      <td>NEESON</td>
      <td>2</td>
    </tr>
    <tr>
      <th>37</th>
      <td>NOLTE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>38</th>
      <td>OLIVIER</td>
      <td>2</td>
    </tr>
    <tr>
      <th>39</th>
      <td>PALTROW</td>
      <td>2</td>
    </tr>
    <tr>
      <th>40</th>
      <td>PECK</td>
      <td>3</td>
    </tr>
    <tr>
      <th>41</th>
      <td>PENN</td>
      <td>2</td>
    </tr>
    <tr>
      <th>42</th>
      <td>SILVERSTONE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>43</th>
      <td>STREEP</td>
      <td>2</td>
    </tr>
    <tr>
      <th>44</th>
      <td>TANDY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>45</th>
      <td>TEMPLE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>46</th>
      <td>TORN</td>
      <td>3</td>
    </tr>
    <tr>
      <th>47</th>
      <td>TRACY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>48</th>
      <td>WAHLBERG</td>
      <td>2</td>
    </tr>
    <tr>
      <th>49</th>
      <td>WEST</td>
      <td>2</td>
    </tr>
    <tr>
      <th>50</th>
      <td>WILLIAMS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>51</th>
      <td>WILLIS</td>
      <td>3</td>
    </tr>
    <tr>
      <th>52</th>
      <td>WINSLET</td>
      <td>2</td>
    </tr>
    <tr>
      <th>53</th>
      <td>WOOD</td>
      <td>2</td>
    </tr>
    <tr>
      <th>54</th>
      <td>ZELLWEGER</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
sql_query = """
UPDATE actor
SET first_name = "HARPO"

where first_name='groucho' and last_name='williams'

;
"""
RunSQL(sql_query)

sql_query = """
SELECT *
FROM actor

where first_name='harpo' and last_name='williams'

;
"""
#RunSQL(sql_query)
engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>172</td>
      <td>HARPO</td>
      <td>WILLIAMS</td>
      <td>2018-02-27 17:57:18</td>
    </tr>
  </tbody>
</table>
</div>




```python
#4d! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error. 
#DID NOT understand the question. Do you want all first names changed to mucho groucho
#COMPLETE per TA response
sql_query = """
SELECT *
FROM actor

where first_name='harpo'

;
"""
#RunSQL(sql_query)
engine=create_engine(seng)

RunSQL('update actor set first_name="GROUCHO" where first_name="harpo"')
data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>last_update</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>
</div>




```python
#5a. You cannot locate the schema of the address table. Which query would you use to re-create it? 

engine=create_engine(seng)

data3 = pd.read_sql_query('describe actor;', engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Field</th>
      <th>Type</th>
      <th>Null</th>
      <th>Key</th>
      <th>Default</th>
      <th>Extra</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>actor_id</td>
      <td>smallint(5) unsigned</td>
      <td>NO</td>
      <td>PRI</td>
      <td>None</td>
      <td>auto_increment</td>
    </tr>
    <tr>
      <th>1</th>
      <td>first_name</td>
      <td>varchar(45)</td>
      <td>NO</td>
      <td></td>
      <td>None</td>
      <td></td>
    </tr>
    <tr>
      <th>2</th>
      <td>last_name</td>
      <td>varchar(45)</td>
      <td>NO</td>
      <td>MUL</td>
      <td>None</td>
      <td></td>
    </tr>
    <tr>
      <th>3</th>
      <td>last_update</td>
      <td>timestamp</td>
      <td>NO</td>
      <td></td>
      <td>CURRENT_TIMESTAMP</td>
      <td>on update CURRENT_TIMESTAMP</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:

sql_query = """
SELECT first_name, last_name, address
FROM staff, address

where staff.address_id = address.address_id
;
"""
engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first_name</th>
      <th>last_name</th>
      <th>address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>23 Workhaven Lane</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Jon</td>
      <td>Stephens</td>
      <td>1411 Lillydale Drive</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment. 
#COMPLETE
engine=create_engine(seng)

data3 = pd.read_sql_query('describe payment;', engine)
data3
sql_query = """

SELECT staff.staff_id, first_name, last_name, payment_date, sum(amount)

FROM staff, payment
GROUP BY Year(payment_date), Month(payment_date), staff_id
having Year(payment_date) = '2005' and Month(Payment_date)='08'



;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>staff_id</th>
      <th>first_name</th>
      <th>last_name</th>
      <th>payment_date</th>
      <th>sum(amount)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>Mike</td>
      <td>Hillyer</td>
      <td>2005-08-01 08:51:04</td>
      <td>24072.13</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>Jon</td>
      <td>Stephens</td>
      <td>2005-08-01 08:51:04</td>
      <td>24072.13</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.

sql_query = """

SELECT film.film_id, title, count(actor_id)

FROM film
INNER Join film_actor
ON film.film_id = film_actor.film_id
Group By film_id

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>count(actor_id)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>ACADEMY DINOSAUR</td>
      <td>10</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>ACE GOLDFINGER</td>
      <td>4</td>
    </tr>
    <tr>
      <th>2</th>
      <td>3</td>
      <td>ADAPTATION HOLES</td>
      <td>5</td>
    </tr>
    <tr>
      <th>3</th>
      <td>4</td>
      <td>AFFAIR PREJUDICE</td>
      <td>5</td>
    </tr>
    <tr>
      <th>4</th>
      <td>5</td>
      <td>AFRICAN EGG</td>
      <td>5</td>
    </tr>
    <tr>
      <th>5</th>
      <td>6</td>
      <td>AGENT TRUMAN</td>
      <td>7</td>
    </tr>
    <tr>
      <th>6</th>
      <td>7</td>
      <td>AIRPLANE SIERRA</td>
      <td>5</td>
    </tr>
    <tr>
      <th>7</th>
      <td>8</td>
      <td>AIRPORT POLLOCK</td>
      <td>4</td>
    </tr>
    <tr>
      <th>8</th>
      <td>9</td>
      <td>ALABAMA DEVIL</td>
      <td>9</td>
    </tr>
    <tr>
      <th>9</th>
      <td>10</td>
      <td>ALADDIN CALENDAR</td>
      <td>8</td>
    </tr>
    <tr>
      <th>10</th>
      <td>11</td>
      <td>ALAMO VIDEOTAPE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>11</th>
      <td>12</td>
      <td>ALASKA PHANTOM</td>
      <td>7</td>
    </tr>
    <tr>
      <th>12</th>
      <td>13</td>
      <td>ALI FOREVER</td>
      <td>5</td>
    </tr>
    <tr>
      <th>13</th>
      <td>14</td>
      <td>ALICE FANTASIA</td>
      <td>4</td>
    </tr>
    <tr>
      <th>14</th>
      <td>15</td>
      <td>ALIEN CENTER</td>
      <td>6</td>
    </tr>
    <tr>
      <th>15</th>
      <td>16</td>
      <td>ALLEY EVOLUTION</td>
      <td>5</td>
    </tr>
    <tr>
      <th>16</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>8</td>
    </tr>
    <tr>
      <th>17</th>
      <td>18</td>
      <td>ALTER VICTORY</td>
      <td>4</td>
    </tr>
    <tr>
      <th>18</th>
      <td>19</td>
      <td>AMADEUS HOLY</td>
      <td>6</td>
    </tr>
    <tr>
      <th>19</th>
      <td>20</td>
      <td>AMELIE HELLFIGHTERS</td>
      <td>6</td>
    </tr>
    <tr>
      <th>20</th>
      <td>21</td>
      <td>AMERICAN CIRCUS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>21</th>
      <td>22</td>
      <td>AMISTAD MIDSUMMER</td>
      <td>4</td>
    </tr>
    <tr>
      <th>22</th>
      <td>23</td>
      <td>ANACONDA CONFESSIONS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>23</th>
      <td>24</td>
      <td>ANALYZE HOOSIERS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>24</th>
      <td>25</td>
      <td>ANGELS LIFE</td>
      <td>9</td>
    </tr>
    <tr>
      <th>25</th>
      <td>26</td>
      <td>ANNIE IDENTITY</td>
      <td>3</td>
    </tr>
    <tr>
      <th>26</th>
      <td>27</td>
      <td>ANONYMOUS HUMAN</td>
      <td>9</td>
    </tr>
    <tr>
      <th>27</th>
      <td>28</td>
      <td>ANTHEM LUKE</td>
      <td>2</td>
    </tr>
    <tr>
      <th>28</th>
      <td>29</td>
      <td>ANTITRUST TOMATOES</td>
      <td>7</td>
    </tr>
    <tr>
      <th>29</th>
      <td>30</td>
      <td>ANYTHING SAVANNAH</td>
      <td>3</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>967</th>
      <td>971</td>
      <td>WHALE BIKINI</td>
      <td>5</td>
    </tr>
    <tr>
      <th>968</th>
      <td>972</td>
      <td>WHISPERER GIANT</td>
      <td>3</td>
    </tr>
    <tr>
      <th>969</th>
      <td>973</td>
      <td>WIFE TURN</td>
      <td>6</td>
    </tr>
    <tr>
      <th>970</th>
      <td>974</td>
      <td>WILD APOLLO</td>
      <td>4</td>
    </tr>
    <tr>
      <th>971</th>
      <td>975</td>
      <td>WILLOW TRACY</td>
      <td>2</td>
    </tr>
    <tr>
      <th>972</th>
      <td>976</td>
      <td>WIND PHANTOM</td>
      <td>3</td>
    </tr>
    <tr>
      <th>973</th>
      <td>977</td>
      <td>WINDOW SIDE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>974</th>
      <td>978</td>
      <td>WISDOM WORKER</td>
      <td>7</td>
    </tr>
    <tr>
      <th>975</th>
      <td>979</td>
      <td>WITCHES PANIC</td>
      <td>4</td>
    </tr>
    <tr>
      <th>976</th>
      <td>980</td>
      <td>WIZARD COLDBLOODED</td>
      <td>9</td>
    </tr>
    <tr>
      <th>977</th>
      <td>981</td>
      <td>WOLVES DESIRE</td>
      <td>6</td>
    </tr>
    <tr>
      <th>978</th>
      <td>982</td>
      <td>WOMEN DORADO</td>
      <td>5</td>
    </tr>
    <tr>
      <th>979</th>
      <td>983</td>
      <td>WON DARES</td>
      <td>5</td>
    </tr>
    <tr>
      <th>980</th>
      <td>984</td>
      <td>WONDERFUL DROP</td>
      <td>4</td>
    </tr>
    <tr>
      <th>981</th>
      <td>985</td>
      <td>WONDERLAND CHRISTMAS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>982</th>
      <td>986</td>
      <td>WONKA SEA</td>
      <td>2</td>
    </tr>
    <tr>
      <th>983</th>
      <td>987</td>
      <td>WORDS HUNTER</td>
      <td>6</td>
    </tr>
    <tr>
      <th>984</th>
      <td>988</td>
      <td>WORKER TARZAN</td>
      <td>9</td>
    </tr>
    <tr>
      <th>985</th>
      <td>989</td>
      <td>WORKING MICROCOSMOS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>986</th>
      <td>990</td>
      <td>WORLD LEATHERNECKS</td>
      <td>8</td>
    </tr>
    <tr>
      <th>987</th>
      <td>991</td>
      <td>WORST BANGER</td>
      <td>4</td>
    </tr>
    <tr>
      <th>988</th>
      <td>992</td>
      <td>WRATH MILE</td>
      <td>4</td>
    </tr>
    <tr>
      <th>989</th>
      <td>993</td>
      <td>WRONG BEHAVIOR</td>
      <td>9</td>
    </tr>
    <tr>
      <th>990</th>
      <td>994</td>
      <td>WYOMING STORM</td>
      <td>6</td>
    </tr>
    <tr>
      <th>991</th>
      <td>995</td>
      <td>YENTL IDAHO</td>
      <td>1</td>
    </tr>
    <tr>
      <th>992</th>
      <td>996</td>
      <td>YOUNG LANGUAGE</td>
      <td>5</td>
    </tr>
    <tr>
      <th>993</th>
      <td>997</td>
      <td>YOUTH KICK</td>
      <td>5</td>
    </tr>
    <tr>
      <th>994</th>
      <td>998</td>
      <td>ZHIVAGO CORE</td>
      <td>6</td>
    </tr>
    <tr>
      <th>995</th>
      <td>999</td>
      <td>ZOOLANDER FICTION</td>
      <td>5</td>
    </tr>
    <tr>
      <th>996</th>
      <td>1000</td>
      <td>ZORRO ARK</td>
      <td>3</td>
    </tr>
  </tbody>
</table>
<p>997 rows × 3 columns</p>
</div>




```python
#6d. How many copies of the film Hunchback Impossible exist in the inventory system?
sql_query = """

select film.film_id, title, count(inventory_id) as inventory_count
from film 
inner join inventory
on film.film_id = inventory.film_id
where title = 'Hunchback Impossible'
group by film_id


;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>inventory_count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>439</td>
      <td>HUNCHBACK IMPOSSIBLE</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>




```python
#6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name:
sql_query = """

select customer.customer_id, last_name, first_name, sum(amount)
from customer
inner join payment
on customer.customer_id = payment.customer_id
group by customer.last_name

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>customer_id</th>
      <th>last_name</th>
      <th>first_name</th>
      <th>sum(amount)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>505</td>
      <td>ABNEY</td>
      <td>RAFAEL</td>
      <td>97.79</td>
    </tr>
    <tr>
      <th>1</th>
      <td>504</td>
      <td>ADAM</td>
      <td>NATHANIEL</td>
      <td>133.72</td>
    </tr>
    <tr>
      <th>2</th>
      <td>36</td>
      <td>ADAMS</td>
      <td>KATHLEEN</td>
      <td>92.73</td>
    </tr>
    <tr>
      <th>3</th>
      <td>96</td>
      <td>ALEXANDER</td>
      <td>DIANA</td>
      <td>105.73</td>
    </tr>
    <tr>
      <th>4</th>
      <td>470</td>
      <td>ALLARD</td>
      <td>GORDON</td>
      <td>160.68</td>
    </tr>
    <tr>
      <th>5</th>
      <td>27</td>
      <td>ALLEN</td>
      <td>SHIRLEY</td>
      <td>126.69</td>
    </tr>
    <tr>
      <th>6</th>
      <td>220</td>
      <td>ALVAREZ</td>
      <td>CHARLENE</td>
      <td>114.73</td>
    </tr>
    <tr>
      <th>7</th>
      <td>11</td>
      <td>ANDERSON</td>
      <td>LISA</td>
      <td>106.76</td>
    </tr>
    <tr>
      <th>8</th>
      <td>326</td>
      <td>ANDREW</td>
      <td>JOSE</td>
      <td>96.75</td>
    </tr>
    <tr>
      <th>9</th>
      <td>183</td>
      <td>ANDREWS</td>
      <td>IDA</td>
      <td>76.77</td>
    </tr>
    <tr>
      <th>10</th>
      <td>449</td>
      <td>AQUINO</td>
      <td>OSCAR</td>
      <td>99.80</td>
    </tr>
    <tr>
      <th>11</th>
      <td>368</td>
      <td>ARCE</td>
      <td>HARRY</td>
      <td>157.65</td>
    </tr>
    <tr>
      <th>12</th>
      <td>560</td>
      <td>ARCHULETA</td>
      <td>JORDAN</td>
      <td>132.70</td>
    </tr>
    <tr>
      <th>13</th>
      <td>188</td>
      <td>ARMSTRONG</td>
      <td>MELANIE</td>
      <td>92.75</td>
    </tr>
    <tr>
      <th>14</th>
      <td>170</td>
      <td>ARNOLD</td>
      <td>BEATRICE</td>
      <td>119.74</td>
    </tr>
    <tr>
      <th>15</th>
      <td>591</td>
      <td>ARSENAULT</td>
      <td>KENT</td>
      <td>134.73</td>
    </tr>
    <tr>
      <th>16</th>
      <td>345</td>
      <td>ARTIS</td>
      <td>CARL</td>
      <td>106.77</td>
    </tr>
    <tr>
      <th>17</th>
      <td>530</td>
      <td>ASHCRAFT</td>
      <td>DARRYL</td>
      <td>76.77</td>
    </tr>
    <tr>
      <th>18</th>
      <td>540</td>
      <td>ASHER</td>
      <td>TYRONE</td>
      <td>112.76</td>
    </tr>
    <tr>
      <th>19</th>
      <td>196</td>
      <td>AUSTIN</td>
      <td>ALMA</td>
      <td>151.65</td>
    </tr>
    <tr>
      <th>20</th>
      <td>60</td>
      <td>BAILEY</td>
      <td>MILDRED</td>
      <td>98.75</td>
    </tr>
    <tr>
      <th>21</th>
      <td>37</td>
      <td>BAKER</td>
      <td>PAMELA</td>
      <td>95.77</td>
    </tr>
    <tr>
      <th>22</th>
      <td>383</td>
      <td>BALES</td>
      <td>MARTIN</td>
      <td>103.73</td>
    </tr>
    <tr>
      <th>23</th>
      <td>559</td>
      <td>BANDA</td>
      <td>EVERETT</td>
      <td>110.72</td>
    </tr>
    <tr>
      <th>24</th>
      <td>215</td>
      <td>BANKS</td>
      <td>JESSIE</td>
      <td>91.74</td>
    </tr>
    <tr>
      <th>25</th>
      <td>551</td>
      <td>BARBEE</td>
      <td>CLAYTON</td>
      <td>96.74</td>
    </tr>
    <tr>
      <th>26</th>
      <td>503</td>
      <td>BARCLAY</td>
      <td>ANGEL</td>
      <td>115.68</td>
    </tr>
    <tr>
      <th>27</th>
      <td>362</td>
      <td>BARFIELD</td>
      <td>NICHOLAS</td>
      <td>145.68</td>
    </tr>
    <tr>
      <th>28</th>
      <td>382</td>
      <td>BARKLEY</td>
      <td>VICTOR</td>
      <td>91.76</td>
    </tr>
    <tr>
      <th>29</th>
      <td>79</td>
      <td>BARNES</td>
      <td>RACHEL</td>
      <td>84.78</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>569</th>
      <td>72</td>
      <td>WATSON</td>
      <td>THERESA</td>
      <td>99.70</td>
    </tr>
    <tr>
      <th>570</th>
      <td>294</td>
      <td>WATTS</td>
      <td>SHELLY</td>
      <td>113.74</td>
    </tr>
    <tr>
      <th>571</th>
      <td>531</td>
      <td>WAUGH</td>
      <td>JAMIE</td>
      <td>118.75</td>
    </tr>
    <tr>
      <th>572</th>
      <td>403</td>
      <td>WAY</td>
      <td>MIKE</td>
      <td>166.65</td>
    </tr>
    <tr>
      <th>573</th>
      <td>190</td>
      <td>WEAVER</td>
      <td>YOLANDA</td>
      <td>110.73</td>
    </tr>
    <tr>
      <th>574</th>
      <td>125</td>
      <td>WEBB</td>
      <td>ETHEL</td>
      <td>135.68</td>
    </tr>
    <tr>
      <th>575</th>
      <td>319</td>
      <td>WEINER</td>
      <td>RONALD</td>
      <td>132.70</td>
    </tr>
    <tr>
      <th>576</th>
      <td>240</td>
      <td>WELCH</td>
      <td>MARLENE</td>
      <td>117.74</td>
    </tr>
    <tr>
      <th>577</th>
      <td>124</td>
      <td>WELLS</td>
      <td>SHEILA</td>
      <td>73.82</td>
    </tr>
    <tr>
      <th>578</th>
      <td>109</td>
      <td>WEST</td>
      <td>EDNA</td>
      <td>107.74</td>
    </tr>
    <tr>
      <th>579</th>
      <td>520</td>
      <td>WESTMORELAND</td>
      <td>MITCHELL</td>
      <td>134.68</td>
    </tr>
    <tr>
      <th>580</th>
      <td>369</td>
      <td>WHEAT</td>
      <td>FRED</td>
      <td>88.75</td>
    </tr>
    <tr>
      <th>581</th>
      <td>208</td>
      <td>WHEELER</td>
      <td>LUCY</td>
      <td>91.74</td>
    </tr>
    <tr>
      <th>582</th>
      <td>14</td>
      <td>WHITE</td>
      <td>BETTY</td>
      <td>117.72</td>
    </tr>
    <tr>
      <th>583</th>
      <td>363</td>
      <td>WHITING</td>
      <td>ROY</td>
      <td>143.71</td>
    </tr>
    <tr>
      <th>584</th>
      <td>455</td>
      <td>WILES</td>
      <td>JON</td>
      <td>87.76</td>
    </tr>
    <tr>
      <th>585</th>
      <td>3</td>
      <td>WILLIAMS</td>
      <td>LINDA</td>
      <td>135.74</td>
    </tr>
    <tr>
      <th>586</th>
      <td>213</td>
      <td>WILLIAMSON</td>
      <td>GINA</td>
      <td>111.72</td>
    </tr>
    <tr>
      <th>587</th>
      <td>172</td>
      <td>WILLIS</td>
      <td>BERNICE</td>
      <td>145.67</td>
    </tr>
    <tr>
      <th>588</th>
      <td>8</td>
      <td>WILSON</td>
      <td>SUSAN</td>
      <td>92.76</td>
    </tr>
    <tr>
      <th>589</th>
      <td>541</td>
      <td>WINDHAM</td>
      <td>DARREN</td>
      <td>108.76</td>
    </tr>
    <tr>
      <th>590</th>
      <td>581</td>
      <td>WOFFORD</td>
      <td>VIRGIL</td>
      <td>107.73</td>
    </tr>
    <tr>
      <th>591</th>
      <td>78</td>
      <td>WOOD</td>
      <td>LORI</td>
      <td>141.69</td>
    </tr>
    <tr>
      <th>592</th>
      <td>107</td>
      <td>WOODS</td>
      <td>FLORENCE</td>
      <td>126.70</td>
    </tr>
    <tr>
      <th>593</th>
      <td>496</td>
      <td>WREN</td>
      <td>TYLER</td>
      <td>88.79</td>
    </tr>
    <tr>
      <th>594</th>
      <td>31</td>
      <td>WRIGHT</td>
      <td>BRENDA</td>
      <td>104.74</td>
    </tr>
    <tr>
      <th>595</th>
      <td>318</td>
      <td>WYMAN</td>
      <td>BRIAN</td>
      <td>52.88</td>
    </tr>
    <tr>
      <th>596</th>
      <td>402</td>
      <td>YANEZ</td>
      <td>LUIS</td>
      <td>79.80</td>
    </tr>
    <tr>
      <th>597</th>
      <td>413</td>
      <td>YEE</td>
      <td>MARVIN</td>
      <td>75.79</td>
    </tr>
    <tr>
      <th>598</th>
      <td>28</td>
      <td>YOUNG</td>
      <td>CYNTHIA</td>
      <td>111.68</td>
    </tr>
  </tbody>
</table>
<p>599 rows × 4 columns</p>
</div>




```python
#7aUse subqueries to display the titles of movies starting with the letters K and Q whose language is English. 
#Not working
sql_query = """

select film_id, title, film.language_id,name
from film
inner join language
on film.language_id=language.language_id
where title = (select title where title like "k%%") or
title = (select title where title like "q%%")

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>language_id</th>
      <th>name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>493</td>
      <td>KANE EXORCIST</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>1</th>
      <td>494</td>
      <td>KARATE MOON</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>2</th>
      <td>495</td>
      <td>KENTUCKIAN GIANT</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>3</th>
      <td>496</td>
      <td>KICK SAVANNAH</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>4</th>
      <td>497</td>
      <td>KILL BROTHERHOOD</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>5</th>
      <td>498</td>
      <td>KILLER INNOCENT</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>6</th>
      <td>499</td>
      <td>KING EVOLUTION</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>7</th>
      <td>500</td>
      <td>KISS GLORY</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>8</th>
      <td>501</td>
      <td>KISSING DOLLS</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>9</th>
      <td>502</td>
      <td>KNOCK WARLOCK</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>10</th>
      <td>503</td>
      <td>KRAMER CHOCOLATE</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>11</th>
      <td>504</td>
      <td>KWAI HOMEWARD</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>12</th>
      <td>706</td>
      <td>QUEEN LUKE</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>13</th>
      <td>707</td>
      <td>QUEST MUSSOLINI</td>
      <td>1</td>
      <td>English</td>
    </tr>
    <tr>
      <th>14</th>
      <td>708</td>
      <td>QUILLS BULL</td>
      <td>1</td>
      <td>English</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7b. Use subqueries to display all actors who appear in the film Alone Trip
sql_query = """

select film.film_id, title, film_actor.actor_id, first_name, last_name
from film
inner join film_actor on film.film_id=film_actor.film_id
inner join actor on film_actor.actor_id=actor.actor_id
where title = (select title where title ="Alone Trip")

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>actor_id</th>
      <th>first_name</th>
      <th>last_name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>3</td>
      <td>ED</td>
      <td>CHASE</td>
    </tr>
    <tr>
      <th>1</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>12</td>
      <td>KARL</td>
      <td>BERRY</td>
    </tr>
    <tr>
      <th>2</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>13</td>
      <td>UMA</td>
      <td>WOOD</td>
    </tr>
    <tr>
      <th>3</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>82</td>
      <td>WOODY</td>
      <td>JOLIE</td>
    </tr>
    <tr>
      <th>4</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>100</td>
      <td>SPENCER</td>
      <td>DEPP</td>
    </tr>
    <tr>
      <th>5</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>160</td>
      <td>CHRIS</td>
      <td>DEPP</td>
    </tr>
    <tr>
      <th>6</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>167</td>
      <td>LAURENCE</td>
      <td>BULLOCK</td>
    </tr>
    <tr>
      <th>7</th>
      <td>17</td>
      <td>ALONE TRIP</td>
      <td>187</td>
      <td>RENEE</td>
      <td>BALL</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
sql_query = """

select customer.first_name, customer.last_name, customer.email, address.address, city.city, country.country 
from customer
inner join address on customer.address_id=address.address_id
inner join city on address.city_id=city.city_id
inner join country on city.country_id=country.country_id
where country.country="canada"

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>first_name</th>
      <th>last_name</th>
      <th>email</th>
      <th>address</th>
      <th>city</th>
      <th>country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>DERRICK</td>
      <td>BOURQUE</td>
      <td>DERRICK.BOURQUE@sakilacustomer.org</td>
      <td>1153 Allende Way</td>
      <td>Gatineau</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>1</th>
      <td>DARRELL</td>
      <td>POWER</td>
      <td>DARRELL.POWER@sakilacustomer.org</td>
      <td>1844 Usak Avenue</td>
      <td>Halifax</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>2</th>
      <td>LORETTA</td>
      <td>CARPENTER</td>
      <td>LORETTA.CARPENTER@sakilacustomer.org</td>
      <td>891 Novi Sad Manor</td>
      <td>Oshawa</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>3</th>
      <td>CURTIS</td>
      <td>IRBY</td>
      <td>CURTIS.IRBY@sakilacustomer.org</td>
      <td>432 Garden Grove Street</td>
      <td>Richmond Hill</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>4</th>
      <td>TROY</td>
      <td>QUIGLEY</td>
      <td>TROY.QUIGLEY@sakilacustomer.org</td>
      <td>983 Santa F Way</td>
      <td>Vancouver</td>
      <td>Canada</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7d Identify all movies categorized as famiy films.
sql_query = """

select film.film_id, title, film_category.category_id, name
from film
inner join film_category
on film.film_id = film_category.film_id
inner join category on film_category.category_id=category.category_id
where category.name='family'

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>film_id</th>
      <th>title</th>
      <th>category_id</th>
      <th>name</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>5</td>
      <td>AFRICAN EGG</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>1</th>
      <td>31</td>
      <td>APACHE DIVINE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>2</th>
      <td>43</td>
      <td>ATLANTIS CAUSE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>3</th>
      <td>50</td>
      <td>BAKED CLEOPATRA</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>4</th>
      <td>53</td>
      <td>BANG KWAI</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>5</th>
      <td>63</td>
      <td>BEDAZZLED MARRIED</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>6</th>
      <td>71</td>
      <td>BILKO ANONYMOUS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>7</th>
      <td>80</td>
      <td>BLANKET BEVERLY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>8</th>
      <td>82</td>
      <td>BLOOD ARGONAUTS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>9</th>
      <td>83</td>
      <td>BLUES INSTINCT</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>10</th>
      <td>94</td>
      <td>BRAVEHEART HUMAN</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>11</th>
      <td>139</td>
      <td>CHASING FIGHT</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>12</th>
      <td>145</td>
      <td>CHISUM BEHAVIOR</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>13</th>
      <td>147</td>
      <td>CHOCOLAT HARRY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>14</th>
      <td>175</td>
      <td>CONFUSED CANDLES</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>15</th>
      <td>183</td>
      <td>CONVERSATION DOWNHILL</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>16</th>
      <td>213</td>
      <td>DATE SPEED</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>17</th>
      <td>231</td>
      <td>DINOSAUR SECRETARY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>18</th>
      <td>262</td>
      <td>DUMBO LUST</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>19</th>
      <td>269</td>
      <td>EARRING INSTINCT</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>20</th>
      <td>273</td>
      <td>EFFECT GLADIATOR</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>21</th>
      <td>309</td>
      <td>FEUD FROGMEN</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>22</th>
      <td>315</td>
      <td>FINDING ANACONDA</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>23</th>
      <td>345</td>
      <td>GABLES METROPOLIS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>24</th>
      <td>348</td>
      <td>GANDHI KWAI</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>25</th>
      <td>359</td>
      <td>GLADIATOR WESTWARD</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>26</th>
      <td>377</td>
      <td>GREASE YOUTH</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>27</th>
      <td>391</td>
      <td>HALF OUTFIELD</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>28</th>
      <td>419</td>
      <td>HOCUS FRIDA</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>29</th>
      <td>428</td>
      <td>HOMICIDE PEACH</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>39</th>
      <td>550</td>
      <td>MAGUIRE APACHE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>40</th>
      <td>557</td>
      <td>MANCHURIAN CURTAIN</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>41</th>
      <td>603</td>
      <td>MOVIE SHAKESPEARE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>42</th>
      <td>610</td>
      <td>MUSIC BOONDOCK</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>43</th>
      <td>617</td>
      <td>NATURAL STOCK</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>44</th>
      <td>621</td>
      <td>NETWORK PEAK</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>45</th>
      <td>634</td>
      <td>ODDS BOOGIE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>46</th>
      <td>639</td>
      <td>OPPOSITE NECKLACE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>47</th>
      <td>679</td>
      <td>PILOT HOOSIERS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>48</th>
      <td>682</td>
      <td>PITTSBURGH HUNCHBACK</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>49</th>
      <td>695</td>
      <td>PRESIDENT BANG</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>50</th>
      <td>700</td>
      <td>PRIX UNDEFEATED</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>51</th>
      <td>710</td>
      <td>RAGE GAMES</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>52</th>
      <td>715</td>
      <td>RANGE MOONWALKER</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>53</th>
      <td>724</td>
      <td>REMEMBER DIARY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>54</th>
      <td>727</td>
      <td>RESURRECTION SILVERADO</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>55</th>
      <td>736</td>
      <td>ROBBERY BRIGHT</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>56</th>
      <td>753</td>
      <td>RUSH GOODFELLAS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>57</th>
      <td>778</td>
      <td>SECRETS PARADISE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>58</th>
      <td>780</td>
      <td>SENSIBILITY REAR</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>59</th>
      <td>795</td>
      <td>SIEGE MADRE</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>60</th>
      <td>810</td>
      <td>SLUMS DUCK</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>61</th>
      <td>822</td>
      <td>SOUP WISDOM</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>62</th>
      <td>824</td>
      <td>SPARTACUS CHEAPER</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>63</th>
      <td>829</td>
      <td>SPINAL ROCKY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>64</th>
      <td>832</td>
      <td>SPLASH GUMP</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>65</th>
      <td>866</td>
      <td>SUNSET RACER</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>66</th>
      <td>867</td>
      <td>SUPER WYOMING</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>67</th>
      <td>946</td>
      <td>VIRTUAL SPOILERS</td>
      <td>8</td>
      <td>Family</td>
    </tr>
    <tr>
      <th>68</th>
      <td>975</td>
      <td>WILLOW TRACY</td>
      <td>8</td>
      <td>Family</td>
    </tr>
  </tbody>
</table>
<p>69 rows × 4 columns</p>
</div>




```python
#7e. Display the most frequently rented movies in descending order.
sql_query = """

select rental_id, rental.inventory_id, inventory.film_id, title, count(title) as tcount
from rental
inner join inventory on rental.inventory_id = inventory.inventory_id
join film on inventory.film_id = film.film_id
group by title
order by tcount desc


;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>rental_id</th>
      <th>inventory_id</th>
      <th>film_id</th>
      <th>title</th>
      <th>tcount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>6193</td>
      <td>465</td>
      <td>103</td>
      <td>BUCKET BROTHERHOOD</td>
      <td>34</td>
    </tr>
    <tr>
      <th>1</th>
      <td>434</td>
      <td>3360</td>
      <td>738</td>
      <td>ROCKETEER MOTHER</td>
      <td>33</td>
    </tr>
    <tr>
      <th>2</th>
      <td>6600</td>
      <td>3315</td>
      <td>730</td>
      <td>RIDGEMONT SUBMARINE</td>
      <td>32</td>
    </tr>
    <tr>
      <th>3</th>
      <td>72</td>
      <td>2260</td>
      <td>489</td>
      <td>JUGGLER HARDLY</td>
      <td>32</td>
    </tr>
    <tr>
      <th>4</th>
      <td>445</td>
      <td>1757</td>
      <td>382</td>
      <td>GRIT CLOCKWORK</td>
      <td>32</td>
    </tr>
    <tr>
      <th>5</th>
      <td>454</td>
      <td>3499</td>
      <td>767</td>
      <td>SCALAWAG DUCK</td>
      <td>32</td>
    </tr>
    <tr>
      <th>6</th>
      <td>902</td>
      <td>1514</td>
      <td>331</td>
      <td>FORWARD TEMPLE</td>
      <td>32</td>
    </tr>
    <tr>
      <th>7</th>
      <td>575</td>
      <td>4451</td>
      <td>973</td>
      <td>WIFE TURN</td>
      <td>31</td>
    </tr>
    <tr>
      <th>8</th>
      <td>7205</td>
      <td>2828</td>
      <td>621</td>
      <td>NETWORK PEAK</td>
      <td>31</td>
    </tr>
    <tr>
      <th>9</th>
      <td>2644</td>
      <td>1923</td>
      <td>418</td>
      <td>HOBBIT ALIEN</td>
      <td>31</td>
    </tr>
    <tr>
      <th>10</th>
      <td>518</td>
      <td>4087</td>
      <td>891</td>
      <td>TIMBERLAND SKY</td>
      <td>31</td>
    </tr>
    <tr>
      <th>11</th>
      <td>1161</td>
      <td>1690</td>
      <td>369</td>
      <td>GOODFELLAS SALUTE</td>
      <td>31</td>
    </tr>
    <tr>
      <th>12</th>
      <td>2762</td>
      <td>3431</td>
      <td>753</td>
      <td>RUSH GOODFELLAS</td>
      <td>31</td>
    </tr>
    <tr>
      <th>13</th>
      <td>21</td>
      <td>146</td>
      <td>31</td>
      <td>APACHE DIVINE</td>
      <td>31</td>
    </tr>
    <tr>
      <th>14</th>
      <td>103</td>
      <td>3343</td>
      <td>735</td>
      <td>ROBBERS JOON</td>
      <td>31</td>
    </tr>
    <tr>
      <th>15</th>
      <td>6901</td>
      <td>4574</td>
      <td>1000</td>
      <td>ZORRO ARK</td>
      <td>31</td>
    </tr>
    <tr>
      <th>16</th>
      <td>799</td>
      <td>1713</td>
      <td>374</td>
      <td>GRAFFITI LOVE</td>
      <td>30</td>
    </tr>
    <tr>
      <th>17</th>
      <td>1040</td>
      <td>2546</td>
      <td>559</td>
      <td>MARRIED GO</td>
      <td>30</td>
    </tr>
    <tr>
      <th>18</th>
      <td>6699</td>
      <td>3411</td>
      <td>748</td>
      <td>RUGRATS SHAKESPEARE</td>
      <td>30</td>
    </tr>
    <tr>
      <th>19</th>
      <td>5166</td>
      <td>2771</td>
      <td>609</td>
      <td>MUSCLE BRIGHT</td>
      <td>30</td>
    </tr>
    <tr>
      <th>20</th>
      <td>8692</td>
      <td>3192</td>
      <td>702</td>
      <td>PULP BEVERLY</td>
      <td>30</td>
    </tr>
    <tr>
      <th>21</th>
      <td>3353</td>
      <td>3984</td>
      <td>869</td>
      <td>SUSPECTS QUILLS</td>
      <td>30</td>
    </tr>
    <tr>
      <th>22</th>
      <td>764</td>
      <td>1069</td>
      <td>239</td>
      <td>DOGMA FAMILY</td>
      <td>30</td>
    </tr>
    <tr>
      <th>23</th>
      <td>1312</td>
      <td>3608</td>
      <td>789</td>
      <td>SHOCK CABIN</td>
      <td>30</td>
    </tr>
    <tr>
      <th>24</th>
      <td>291</td>
      <td>485</td>
      <td>109</td>
      <td>BUTTERFLY CHOCOLAT</td>
      <td>30</td>
    </tr>
    <tr>
      <th>25</th>
      <td>947</td>
      <td>4478</td>
      <td>979</td>
      <td>WITCHES PANIC</td>
      <td>30</td>
    </tr>
    <tr>
      <th>26</th>
      <td>7069</td>
      <td>2073</td>
      <td>450</td>
      <td>IDOLS SNATCHERS</td>
      <td>30</td>
    </tr>
    <tr>
      <th>27</th>
      <td>2924</td>
      <td>580</td>
      <td>127</td>
      <td>CAT CONEHEADS</td>
      <td>30</td>
    </tr>
    <tr>
      <th>28</th>
      <td>1815</td>
      <td>1551</td>
      <td>341</td>
      <td>FROST HEAD</td>
      <td>30</td>
    </tr>
    <tr>
      <th>29</th>
      <td>857</td>
      <td>2569</td>
      <td>563</td>
      <td>MASSACRE USUAL</td>
      <td>30</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>928</th>
      <td>4101</td>
      <td>2891</td>
      <td>635</td>
      <td>OKLAHOMA JUMANJI</td>
      <td>6</td>
    </tr>
    <tr>
      <th>929</th>
      <td>6981</td>
      <td>154</td>
      <td>32</td>
      <td>APOCALYPSE FLAMINGOS</td>
      <td>6</td>
    </tr>
    <tr>
      <th>930</th>
      <td>7959</td>
      <td>1549</td>
      <td>340</td>
      <td>FRONTIER CABIN</td>
      <td>6</td>
    </tr>
    <tr>
      <th>931</th>
      <td>9742</td>
      <td>4058</td>
      <td>884</td>
      <td>TERMINATOR CLUB</td>
      <td>6</td>
    </tr>
    <tr>
      <th>932</th>
      <td>8944</td>
      <td>3513</td>
      <td>769</td>
      <td>SCHOOL JACKET</td>
      <td>6</td>
    </tr>
    <tr>
      <th>933</th>
      <td>5889</td>
      <td>1706</td>
      <td>372</td>
      <td>GRACELAND DYNAMITE</td>
      <td>6</td>
    </tr>
    <tr>
      <th>934</th>
      <td>4545</td>
      <td>3658</td>
      <td>799</td>
      <td>SIMON NORTH</td>
      <td>6</td>
    </tr>
    <tr>
      <th>935</th>
      <td>6646</td>
      <td>4061</td>
      <td>885</td>
      <td>TEXAS WATCH</td>
      <td>6</td>
    </tr>
    <tr>
      <th>936</th>
      <td>6203</td>
      <td>1001</td>
      <td>224</td>
      <td>DESPERATE TRAINSPOTTING</td>
      <td>6</td>
    </tr>
    <tr>
      <th>937</th>
      <td>2795</td>
      <td>3694</td>
      <td>808</td>
      <td>SLING LUKE</td>
      <td>6</td>
    </tr>
    <tr>
      <th>938</th>
      <td>4153</td>
      <td>2185</td>
      <td>472</td>
      <td>ITALIAN AFRICAN</td>
      <td>6</td>
    </tr>
    <tr>
      <th>939</th>
      <td>8599</td>
      <td>1169</td>
      <td>259</td>
      <td>DUCK RACER</td>
      <td>6</td>
    </tr>
    <tr>
      <th>940</th>
      <td>2464</td>
      <td>463</td>
      <td>102</td>
      <td>BUBBLE GROSSE</td>
      <td>6</td>
    </tr>
    <tr>
      <th>941</th>
      <td>4808</td>
      <td>2544</td>
      <td>558</td>
      <td>MANNEQUIN WORST</td>
      <td>5</td>
    </tr>
    <tr>
      <th>942</th>
      <td>8333</td>
      <td>823</td>
      <td>180</td>
      <td>CONSPIRACY SPIRIT</td>
      <td>5</td>
    </tr>
    <tr>
      <th>943</th>
      <td>9714</td>
      <td>1532</td>
      <td>335</td>
      <td>FREEDOM CLEOPATRA</td>
      <td>5</td>
    </tr>
    <tr>
      <th>944</th>
      <td>10930</td>
      <td>2027</td>
      <td>441</td>
      <td>HUNTER ALTER</td>
      <td>5</td>
    </tr>
    <tr>
      <th>945</th>
      <td>8554</td>
      <td>1563</td>
      <td>343</td>
      <td>FULL FLATLINERS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>946</th>
      <td>3934</td>
      <td>3187</td>
      <td>699</td>
      <td>PRIVATE DROP</td>
      <td>5</td>
    </tr>
    <tr>
      <th>947</th>
      <td>7065</td>
      <td>3570</td>
      <td>781</td>
      <td>SEVEN SWARM</td>
      <td>5</td>
    </tr>
    <tr>
      <th>948</th>
      <td>10522</td>
      <td>4159</td>
      <td>903</td>
      <td>TRAFFIC HOBBIT</td>
      <td>5</td>
    </tr>
    <tr>
      <th>949</th>
      <td>10961</td>
      <td>1416</td>
      <td>310</td>
      <td>FEVER EMPIRE</td>
      <td>5</td>
    </tr>
    <tr>
      <th>950</th>
      <td>4002</td>
      <td>2790</td>
      <td>612</td>
      <td>MUSSOLINI SPOILERS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>951</th>
      <td>9760</td>
      <td>426</td>
      <td>94</td>
      <td>BRAVEHEART HUMAN</td>
      <td>5</td>
    </tr>
    <tr>
      <th>952</th>
      <td>8437</td>
      <td>2118</td>
      <td>459</td>
      <td>INFORMER DOUBLE</td>
      <td>5</td>
    </tr>
    <tr>
      <th>953</th>
      <td>5286</td>
      <td>483</td>
      <td>107</td>
      <td>BUNCH MINDS</td>
      <td>5</td>
    </tr>
    <tr>
      <th>954</th>
      <td>11091</td>
      <td>1659</td>
      <td>362</td>
      <td>GLORY TRACY</td>
      <td>5</td>
    </tr>
    <tr>
      <th>955</th>
      <td>4829</td>
      <td>2661</td>
      <td>584</td>
      <td>MIXED DOORS</td>
      <td>4</td>
    </tr>
    <tr>
      <th>956</th>
      <td>11480</td>
      <td>4161</td>
      <td>904</td>
      <td>TRAIN BUNCH</td>
      <td>4</td>
    </tr>
    <tr>
      <th>957</th>
      <td>10142</td>
      <td>1839</td>
      <td>400</td>
      <td>HARDLY ROBBERS</td>
      <td>4</td>
    </tr>
  </tbody>
</table>
<p>958 rows × 5 columns</p>
</div>




```python
#7f. Write a query to display how much business, in dollars, each store brought in.
sql_query = """

select store.store_id, staff.staff_id, sum(payment.amount) as sTotal
from store
inner join staff on store.store_id=staff.store_id
inner join payment on staff.staff_id=payment.staff_id
group by store_id


;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>store_id</th>
      <th>staff_id</th>
      <th>sTotal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>1</td>
      <td>33489.47</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>2</td>
      <td>33927.04</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7g. Write a query to display for each store its store ID, city, and country.
sql_query = """

select store.store_id, address.address, city.city, country.country 
from store
inner join address on store.address_id=address.address_id
inner join city on address.city_id=city.city_id
inner join country on city.country_id=country.country_id


;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>store_id</th>
      <th>address</th>
      <th>city</th>
      <th>country</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>1</td>
      <td>47 MySakila Drive</td>
      <td>Lethbridge</td>
      <td>Canada</td>
    </tr>
    <tr>
      <th>1</th>
      <td>2</td>
      <td>28 MySQL Boulevard</td>
      <td>Woodridge</td>
      <td>Australia</td>
    </tr>
  </tbody>
</table>
</div>




```python
#7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
sql_query = """

select category.name, sum(payment.amount) as revenue
from category
inner join film_category on category.category_id=film_category.category_id
inner join inventory on film_category.film_id = inventory.film_id
inner join rental on inventory.inventory_id = rental.inventory_id
inner join payment on rental.customer_id=payment.customer_id
group by name
order by revenue desc

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>name</th>
      <th>revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sports</td>
      <td>138295.47</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Animation</td>
      <td>137116.48</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Action</td>
      <td>130684.74</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Family</td>
      <td>129048.71</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Sci-Fi</td>
      <td>127768.37</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Drama</td>
      <td>122052.28</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Documentary</td>
      <td>122046.18</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Foreign</td>
      <td>120780.50</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Games</td>
      <td>114451.03</td>
    </tr>
    <tr>
      <th>9</th>
      <td>New</td>
      <td>110441.67</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Comedy</td>
      <td>110384.27</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Children</td>
      <td>109727.41</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Classics</td>
      <td>108921.82</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Horror</td>
      <td>98382.66</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Travel</td>
      <td>97279.09</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Music</td>
      <td>95838.49</td>
    </tr>
  </tbody>
</table>
</div>




```python
#8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. 
#Use the solution from the problem above to create a view. 
#If you haven't solved 7h, you can substitute another query to create a view.
sql_query = """
create view top5_Genre as
select category.name, sum(payment.amount) as revenue
from category
inner join film_category on category.category_id=film_category.category_id
inner join inventory on film_category.film_id = inventory.film_id
inner join rental on inventory.inventory_id = rental.inventory_id
inner join payment on rental.customer_id=payment.customer_id
group by name
order by revenue desc

;
"""
RunSQL(sql_query)
#engine=create_engine(seng)

#data3 = pd.read_sql_query(sql_query, engine)
#data3
```


```python
#8b. How would you display the view that you created in 8a?
sql_query = """
select * from top5_genre

;
"""

engine=create_engine(seng)

data3 = pd.read_sql_query(sql_query, engine)
data3
```




<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>name</th>
      <th>revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Sports</td>
      <td>138295.47</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Animation</td>
      <td>137116.48</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Action</td>
      <td>130684.74</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Family</td>
      <td>129048.71</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Sci-Fi</td>
      <td>127768.37</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Drama</td>
      <td>122052.28</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Documentary</td>
      <td>122046.18</td>
    </tr>
    <tr>
      <th>7</th>
      <td>Foreign</td>
      <td>120780.50</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Games</td>
      <td>114451.03</td>
    </tr>
    <tr>
      <th>9</th>
      <td>New</td>
      <td>110441.67</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Comedy</td>
      <td>110384.27</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Children</td>
      <td>109727.41</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Classics</td>
      <td>108921.82</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Horror</td>
      <td>98382.66</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Travel</td>
      <td>97279.09</td>
    </tr>
    <tr>
      <th>15</th>
      <td>Music</td>
      <td>95838.49</td>
    </tr>
  </tbody>
</table>
</div>




```python
#8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
sql_query = """
drop view top5_genre

;
"""
RunSQL(sql_query)

```
