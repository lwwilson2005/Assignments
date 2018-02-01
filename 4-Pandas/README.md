
# PyCity School Analysis

## 1. The overall passing rate percentage for charter schools is higher. However the average math score for district schools is with .03% of the charter schools and the average reading score for district schools is .11% higher than charter schools. District schools are performing at or slightly higher measurements than charter schools but has a grater range of performance.

## 2. Medium size schools (1000 - 2000) have the highest overall percentage passing rate but had the lowest average math and reading scores.

## 3. Schools that spent the lowest per student in the four categories had the best overall passing percentage. However their average math and reading scores were less than the schools that ranked in the highest spending per student.



```python
import pandas as pd
import numpy as np
import os
```


```python
#students_complete.csv
#schools_complete.csv
#get schools info
csv_path = os.path.join("schools_complete.csv")
schools_df = pd.read_csv(csv_path)
schools_df.columns

```




    Index(['School ID', 'name', 'type', 'size', 'budget'], dtype='object')




```python
sch_temp = schools_df
sch_temp.rename(columns={'name':'school'}, inplace=True)
#above step was to rename column name to school
#schooldetail_df.rename(columns={'name_x':'School' , 'name_y':'Student Name'}, inplace=True)

sch_temp = sch_temp.set_index('school')
sch_temp['BudgetPerStudent'] = sch_temp['budget']/sch_temp['size']

```


```python
#add school summary total columns
schools_df['BudgetPerStudent'] = 0.00
schools_df['MathScoreAvg'] = 0.00
schools_df['MathPassingPct'] = 0.00
schools_df['ReadingScoreAvg'] = 0.00
schools_df['ReadingPassingPct'] = 0.00
schools_df['OverallPassingRate'] = 0.00
#Determine the amount spent per student by school
schools_df['BudgetPerStudent'] = schools_df['budget']/schools_df['size']

```


```python
#get student info
csv_path = os.path.join("students_complete.csv")
students_df = pd.read_csv(csv_path)

#students_df.columns
```


```python
#1/14/2018
std_temp = students_df

```


```python
std_temp = std_temp.set_index('school')
#std2 = std_temp.groupby(['school','math_score'])
#std_temp.mean()
#std2 = std2.set_index('school')
std_temp3 = std_temp.mean()
#std_temp3.head()


```


```python
std3 = students_df

```


```python
schools_summ = schools_df
schools_summ.info
schools_summ = schools_summ.set_index("school")
std_counts = std3["school"].value_counts()

math_sch_passing_df = students_df[students_df['math_score'] >= 70]

mth_count_df = math_sch_passing_df.groupby('school')[['math_score']].count()
reading_sch_passing_df = students_df[students_df['reading_score'] >= 70]
rd_count_df = reading_sch_passing_df.groupby('school')[['reading_score']].count()
mth_avg_df = math_sch_passing_df.groupby('school')[['math_score']].mean()
rd_avg_df = reading_sch_passing_df.groupby('school')[['reading_score']].mean()
mthavg_list = []
mthavg_list = mth_avg_df['math_score']
rdavg_list = []
rdavg_list = rd_avg_df['reading_score']

rdcount_list = []
rdcount_list = rd_count_df['reading_score']
#rdcount_list
schools_summ['ReadingPassCount'] = rd_count_df
mthcount_list = []
mthcount_list = mth_count_df['math_score']
#mthcount_list
schools_summ['MathPassCount'] = mth_count_df
schools_summ['MathPassingPct'] = schools_summ['MathPassCount']/schools_summ['size']
schools_summ['ReadingPassingPct'] = schools_summ['ReadingPassCount']/schools_summ['size']
schools_summ['OverallPassingRate'] = (schools_summ['MathPassingPct'] + schools_summ['ReadingPassingPct'])/2
schools_summ['MathScoreAvg'] = mthavg_list
schools_summ['ReadingScoreAvg'] = rdavg_list
#schools_summ
#schools_summ.info
schools_grade = pd.DataFrame(schools_summ)
```


```python
students_df['MathCount'] = 0
students_df['ReadingCount'] = 0
students_df['MathPassingCount'] = 0
students_df['ReadingPassingCount'] = 0
students_df.loc[students_df['math_score'] >= 70, 'MathPassingCount'] = 1
students_df.loc[students_df['reading_score'] >= 70, 'ReadingPassingCount'] = 1
#students_df.columns
```


```python
#district summary
distr_schools_tot = len(schools_df)
distr_students_tot = len(students_df)
distr_budget = schools_df['budget'].sum()
avg_distr_math = round(students_df['math_score'].mean(),2)
avg_distr_reading = round(students_df['reading_score'].mean(),2)
math_passing_df = students_df[students_df['math_score'] >= 70]

#print(distr_schools, distr_students, distr_budget,avg_distr_math,avg_distr_reading)

#print(len(students_df), len(math_passing_df))
reading_passing_df = students_df[students_df['reading_score'] >= 70]
#print(len(students_df), len(reading_passing_df))
math_passing_pct = round(len(math_passing_df)/distr_students_tot,4)*100
reading_passing_pct = round(len(reading_passing_df)/distr_students_tot,4)*100
#print(math_passing_pct, reading_passing_pct)
overall_passing_rate = (math_passing_pct + reading_passing_pct)/2
#print(overall_passing_rate)
#sd_temp_df = pd.DataFrame({'Math Avg':schoolMath, 'Reading Avg':schoolRead})
district_summary_df = pd.DataFrame({'Total Schools': [distr_schools_tot],
                                    'Total Students': [distr_students_tot],
                                    'Total Budget': [distr_budget],
                                    'Average Math Score': [avg_distr_math],
                                    'Average Reading Score': [avg_distr_reading],
                                    '% Passing Math': [math_passing_pct],
                                    '% Passing Reading' : [reading_passing_pct],
                                    'Overall Passing Rate': [overall_passing_rate]
                                   })
print('District Summary')
district_summary_df

```

    District Summary
    




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
      <th>% Passing Math</th>
      <th>% Passing Reading</th>
      <th>Average Math Score</th>
      <th>Average Reading Score</th>
      <th>Overall Passing Rate</th>
      <th>Total Budget</th>
      <th>Total Schools</th>
      <th>Total Students</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>74.98</td>
      <td>85.81</td>
      <td>78.99</td>
      <td>81.88</td>
      <td>80.395</td>
      <td>24649428</td>
      <td>15</td>
      <td>39170</td>
    </tr>
  </tbody>
</table>
</div>




```python
schools_summ
ssr = schools_summ.copy()




ssr.drop(['ReadingPassCount'], axis=1, inplace=True)
ssr.drop(['MathPassCount'], axis=1, inplace=True)
#ssr.drop(['m9'], axis=1, inplace=True)
#ssr.drop(['m10'], axis=1, inplace=True)
#ssr.drop(['m11'], axis=1, inplace=True)
#ssr.drop(['m12'], axis=1, inplace=True)
#ssr.drop(['r9'], axis=1, inplace=True)
#ssr.drop(['r10'], axis=1, inplace=True)
#ssr.drop(['r11'], axis=1, inplace=True)
#ssr.drop(['r12'], axis=1, inplace=True)
ssr.drop(['School ID'], axis=1, inplace=True)
# below is for next sections reports
ssr2 = ssr.copy()

ssr['School Name'] = ssr.index
ssr = ssr.set_index('School Name').reset_index()
ssr_rep = ssr.sort_values('School Name', ascending=True)
print('School Summary')
ssr_rep

         
```

    School Summary
    




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
      <th>School Name</th>
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>BudgetPerStudent</th>
      <th>MathScoreAvg</th>
      <th>MathPassingPct</th>
      <th>ReadingScoreAvg</th>
      <th>ReadingPassingPct</th>
      <th>OverallPassingRate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>Bailey High School</td>
      <td>District</td>
      <td>4976</td>
      <td>3124928</td>
      <td>628.0</td>
      <td>84.505124</td>
      <td>0.666801</td>
      <td>84.362521</td>
      <td>0.819333</td>
      <td>0.743067</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Cabrera High School</td>
      <td>Charter</td>
      <td>1858</td>
      <td>1081356</td>
      <td>582.0</td>
      <td>83.972556</td>
      <td>0.941335</td>
      <td>84.432612</td>
      <td>0.970398</td>
      <td>0.955867</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Figueroa High School</td>
      <td>District</td>
      <td>2949</td>
      <td>1884411</td>
      <td>639.0</td>
      <td>84.310894</td>
      <td>0.659885</td>
      <td>84.767745</td>
      <td>0.807392</td>
      <td>0.733639</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Ford High School</td>
      <td>District</td>
      <td>2739</td>
      <td>1763916</td>
      <td>644.0</td>
      <td>84.165687</td>
      <td>0.683096</td>
      <td>84.612799</td>
      <td>0.792990</td>
      <td>0.738043</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Griffin High School</td>
      <td>Charter</td>
      <td>1468</td>
      <td>917500</td>
      <td>625.0</td>
      <td>84.394602</td>
      <td>0.933924</td>
      <td>84.253156</td>
      <td>0.971390</td>
      <td>0.952657</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Hernandez High School</td>
      <td>District</td>
      <td>4635</td>
      <td>3022020</td>
      <td>652.0</td>
      <td>84.936975</td>
      <td>0.667530</td>
      <td>84.483725</td>
      <td>0.808630</td>
      <td>0.738080</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Holden High School</td>
      <td>Charter</td>
      <td>427</td>
      <td>248087</td>
      <td>581.0</td>
      <td>85.040506</td>
      <td>0.925059</td>
      <td>84.391727</td>
      <td>0.962529</td>
      <td>0.943794</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Huang High School</td>
      <td>District</td>
      <td>2917</td>
      <td>1910635</td>
      <td>655.0</td>
      <td>84.240084</td>
      <td>0.656839</td>
      <td>84.691400</td>
      <td>0.813164</td>
      <td>0.735002</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Johnson High School</td>
      <td>District</td>
      <td>4761</td>
      <td>3094650</td>
      <td>650.0</td>
      <td>84.742448</td>
      <td>0.660576</td>
      <td>84.430566</td>
      <td>0.812224</td>
      <td>0.736400</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Pena High School</td>
      <td>Charter</td>
      <td>962</td>
      <td>585858</td>
      <td>609.0</td>
      <td>84.719780</td>
      <td>0.945946</td>
      <td>84.680390</td>
      <td>0.959459</td>
      <td>0.952703</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Rodriguez High School</td>
      <td>District</td>
      <td>3999</td>
      <td>2547363</td>
      <td>637.0</td>
      <td>84.339111</td>
      <td>0.663666</td>
      <td>84.374377</td>
      <td>0.802201</td>
      <td>0.732933</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Shelton High School</td>
      <td>Charter</td>
      <td>1761</td>
      <td>1056600</td>
      <td>600.0</td>
      <td>84.326679</td>
      <td>0.938671</td>
      <td>84.362559</td>
      <td>0.958546</td>
      <td>0.948609</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Thomas High School</td>
      <td>Charter</td>
      <td>1635</td>
      <td>1043130</td>
      <td>638.0</td>
      <td>84.497705</td>
      <td>0.932722</td>
      <td>84.259585</td>
      <td>0.973089</td>
      <td>0.952905</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Wilson High School</td>
      <td>Charter</td>
      <td>2283</td>
      <td>1319574</td>
      <td>578.0</td>
      <td>84.244050</td>
      <td>0.938677</td>
      <td>84.526770</td>
      <td>0.965396</td>
      <td>0.952037</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Wright High School</td>
      <td>Charter</td>
      <td>1800</td>
      <td>1049400</td>
      <td>583.0</td>
      <td>84.758929</td>
      <td>0.933333</td>
      <td>84.479586</td>
      <td>0.966111</td>
      <td>0.949722</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Top 5 schools
top5_schools = ssr2.sort_values('OverallPassingRate', ascending=False)

#top5_schools.head(15)
print('Top Performing Schools (By Passing Rate)')
top5_schools.head(5)
```

    Top Performing Schools (By Passing Rate)
    




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
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>BudgetPerStudent</th>
      <th>MathScoreAvg</th>
      <th>MathPassingPct</th>
      <th>ReadingScoreAvg</th>
      <th>ReadingPassingPct</th>
      <th>OverallPassingRate</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Cabrera High School</th>
      <td>Charter</td>
      <td>1858</td>
      <td>1081356</td>
      <td>582.0</td>
      <td>83.972556</td>
      <td>0.941335</td>
      <td>84.432612</td>
      <td>0.970398</td>
      <td>0.955867</td>
    </tr>
    <tr>
      <th>Thomas High School</th>
      <td>Charter</td>
      <td>1635</td>
      <td>1043130</td>
      <td>638.0</td>
      <td>84.497705</td>
      <td>0.932722</td>
      <td>84.259585</td>
      <td>0.973089</td>
      <td>0.952905</td>
    </tr>
    <tr>
      <th>Pena High School</th>
      <td>Charter</td>
      <td>962</td>
      <td>585858</td>
      <td>609.0</td>
      <td>84.719780</td>
      <td>0.945946</td>
      <td>84.680390</td>
      <td>0.959459</td>
      <td>0.952703</td>
    </tr>
    <tr>
      <th>Griffin High School</th>
      <td>Charter</td>
      <td>1468</td>
      <td>917500</td>
      <td>625.0</td>
      <td>84.394602</td>
      <td>0.933924</td>
      <td>84.253156</td>
      <td>0.971390</td>
      <td>0.952657</td>
    </tr>
    <tr>
      <th>Wilson High School</th>
      <td>Charter</td>
      <td>2283</td>
      <td>1319574</td>
      <td>578.0</td>
      <td>84.244050</td>
      <td>0.938677</td>
      <td>84.526770</td>
      <td>0.965396</td>
      <td>0.952037</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Bottom 5 schools
bottom5_schools = ssr2.sort_values('OverallPassingRate', ascending=True)
print('Lowest Performing Schools (By Passing Rate)')
bottom5_schools.head(5)
```

    Lowest Performing Schools (By Passing Rate)
    




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
      <th>type</th>
      <th>size</th>
      <th>budget</th>
      <th>BudgetPerStudent</th>
      <th>MathScoreAvg</th>
      <th>MathPassingPct</th>
      <th>ReadingScoreAvg</th>
      <th>ReadingPassingPct</th>
      <th>OverallPassingRate</th>
    </tr>
    <tr>
      <th>school</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Rodriguez High School</th>
      <td>District</td>
      <td>3999</td>
      <td>2547363</td>
      <td>637.0</td>
      <td>84.339111</td>
      <td>0.663666</td>
      <td>84.374377</td>
      <td>0.802201</td>
      <td>0.732933</td>
    </tr>
    <tr>
      <th>Figueroa High School</th>
      <td>District</td>
      <td>2949</td>
      <td>1884411</td>
      <td>639.0</td>
      <td>84.310894</td>
      <td>0.659885</td>
      <td>84.767745</td>
      <td>0.807392</td>
      <td>0.733639</td>
    </tr>
    <tr>
      <th>Huang High School</th>
      <td>District</td>
      <td>2917</td>
      <td>1910635</td>
      <td>655.0</td>
      <td>84.240084</td>
      <td>0.656839</td>
      <td>84.691400</td>
      <td>0.813164</td>
      <td>0.735002</td>
    </tr>
    <tr>
      <th>Johnson High School</th>
      <td>District</td>
      <td>4761</td>
      <td>3094650</td>
      <td>650.0</td>
      <td>84.742448</td>
      <td>0.660576</td>
      <td>84.430566</td>
      <td>0.812224</td>
      <td>0.736400</td>
    </tr>
    <tr>
      <th>Ford High School</th>
      <td>District</td>
      <td>2739</td>
      <td>1763916</td>
      <td>644.0</td>
      <td>84.165687</td>
      <td>0.683096</td>
      <td>84.612799</td>
      <td>0.792990</td>
      <td>0.738043</td>
    </tr>
  </tbody>
</table>
</div>




```python
#TODO add format to print district report

```


```python
#math scores by grade
#mth_count_df = math_sch_passing_df.groupby('school')[['math_score']].count()
mth_by_gr = students_df.groupby(['school','grade'])[['math_score']].mean().unstack()
mth_9th = students_df[students_df['grade'] == '9th']
m9 = mth_9th.groupby('school')[['math_score']].mean()
mth_10th = students_df[students_df['grade'] == '10th']
m10 = mth_10th.groupby('school')[['math_score']].mean()
mth_11th = students_df[students_df['grade'] == '11th']
m11 = mth_11th.groupby('school')[['math_score']].mean()
mth_12th = students_df[students_df['grade'] == '12th']
m12 = mth_12th.groupby('school')[['math_score']].mean()
m9
schools_summ['m9'] = m9
schools_summ['m10'] = m10
schools_summ['m11'] = m11
schools_summ['m12'] = m12
#schools_summ


```


```python
#Reading scores by grade
rd_by_gr = students_df.groupby(['school','grade'])[['reading_score']].mean().unstack()
rd_9th = students_df[students_df['grade'] == '9th']
r9 = mth_9th.groupby('school')[['math_score']].mean()
rd_10th = students_df[students_df['grade'] == '10th']
r10 = mth_10th.groupby('school')[['math_score']].mean()
rd_11th = students_df[students_df['grade'] == '11th']
r11 = mth_11th.groupby('school')[['math_score']].mean()
rd_12th = students_df[students_df['grade'] == '12th']
r12 = mth_12th.groupby('school')[['math_score']].mean()
r9
schools_summ['r9'] = r9
schools_summ['r10'] = r10
schools_summ['r11'] = r11
schools_summ['r12'] = r12
#schools_summ
```





```python
#Scores by school spending
#print('Scores by School Spending')
#scores_by_spending = schools_summ.sort_values('BudgetPerStudent', ascending=False)
SchoolsSize = schools_summ.copy()
SchoolsType = schools_summ.copy()
SchoolsSpending = schools_summ.copy()
```


```python
#schools_grade.head(2)
```


```python
schools_grade.columns
schools_grade = schools_grade.reindex(columns=schools_grade.columns)
#schools_grade
```


```python
#Math Scores by Grade
mschools_rep = schools_grade.copy()
mschools_rep = mschools_rep.reindex(columns=mschools_rep.columns)
msrep_grade = mschools_rep

msrep_grade.drop(['ReadingPassCount'], axis=1, inplace=True)
msrep_grade.drop(['MathPassCount'], axis=1, inplace=True)
msrep_grade.drop(['MathPassingPct'], axis=1, inplace=True)
msrep_grade.drop(['ReadingPassingPct'], axis=1, inplace=True)
msrep_grade.drop(['School ID'], axis=1, inplace=True)
msrep_grade.drop(['type'], axis=1, inplace=True)
msrep_grade.drop(['size'], axis=1, inplace=True)
msrep_grade.drop(['budget'], axis=1, inplace=True)
msrep_grade.drop(['BudgetPerStudent'], axis=1, inplace=True)
msrep_grade.drop(['ReadingScoreAvg'], axis=1, inplace=True)
msrep_grade.drop(['MathScoreAvg'], axis=1, inplace=True)
msrep_grade.drop(['OverallPassingRate'], axis=1, inplace=True)
msrep_grade.drop(['r9'], axis=1, inplace=True)
msrep_grade.drop(['r10'], axis=1, inplace=True)
msrep_grade.drop(['r11'], axis=1, inplace=True)
msrep_grade.drop(['r12'], axis=1, inplace=True)
msrep_grade = msrep_grade.rename(columns={'m9':'9th'})
msrep_grade = msrep_grade.rename(columns={'m10':'10th'})
msrep_grade = msrep_grade.rename(columns={'m11':'11th'})
msrep_grade = msrep_grade.rename(columns={'m12':'12th'})

msrep_grade['School Name'] = msrep_grade.index
msrep_grade = msrep_grade.set_index('School Name').reset_index()
msgraderep = msrep_grade.sort_values('School Name', ascending=True)
print('Math Scores by Grade')
msgraderep

```

    Math Scores by Grade
    




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
      <th>School Name</th>
      <th>9th</th>
      <th>10th</th>
      <th>11th</th>
      <th>12th</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>Bailey High School</td>
      <td>77.083676</td>
      <td>76.996772</td>
      <td>77.515588</td>
      <td>76.492218</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Cabrera High School</td>
      <td>83.094697</td>
      <td>83.154506</td>
      <td>82.765560</td>
      <td>83.277487</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Figueroa High School</td>
      <td>76.403037</td>
      <td>76.539974</td>
      <td>76.884344</td>
      <td>77.151369</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Ford High School</td>
      <td>77.361345</td>
      <td>77.672316</td>
      <td>76.918058</td>
      <td>76.179963</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Griffin High School</td>
      <td>82.044010</td>
      <td>84.229064</td>
      <td>83.842105</td>
      <td>83.356164</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Hernandez High School</td>
      <td>77.438495</td>
      <td>77.337408</td>
      <td>77.136029</td>
      <td>77.186567</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Holden High School</td>
      <td>83.787402</td>
      <td>83.429825</td>
      <td>85.000000</td>
      <td>82.855422</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Huang High School</td>
      <td>77.027251</td>
      <td>75.908735</td>
      <td>76.446602</td>
      <td>77.225641</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Johnson High School</td>
      <td>77.187857</td>
      <td>76.691117</td>
      <td>77.491653</td>
      <td>76.863248</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Pena High School</td>
      <td>83.625455</td>
      <td>83.372000</td>
      <td>84.328125</td>
      <td>84.121547</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Rodriguez High School</td>
      <td>76.859966</td>
      <td>76.612500</td>
      <td>76.395626</td>
      <td>77.690748</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Shelton High School</td>
      <td>83.420755</td>
      <td>82.917411</td>
      <td>83.383495</td>
      <td>83.778976</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Thomas High School</td>
      <td>83.590022</td>
      <td>83.087886</td>
      <td>83.498795</td>
      <td>83.497041</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Wilson High School</td>
      <td>83.085578</td>
      <td>83.724422</td>
      <td>83.195326</td>
      <td>83.035794</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Wright High School</td>
      <td>83.264706</td>
      <td>84.010288</td>
      <td>83.836782</td>
      <td>83.644986</td>
    </tr>
  </tbody>
</table>
</div>




```python
#srep_grade

#schools_rep
```


```python
#Reading Scores by Grade
rschools_rep = schools_grade
rschools_rep = rschools_rep.reindex(columns=rschools_rep.columns)
rsrep_grade = rschools_rep
#rsrep_grade.columns
rsrep_grade.drop(['ReadingPassCount'], axis=1, inplace=True)
rsrep_grade.drop(['MathPassCount'], axis=1, inplace=True)
rsrep_grade.drop(['MathPassingPct'], axis=1, inplace=True)
rsrep_grade.drop(['ReadingPassingPct'], axis=1, inplace=True)
rsrep_grade.drop(['School ID'], axis=1, inplace=True)
rsrep_grade.drop(['type'], axis=1, inplace=True)
rsrep_grade.drop(['size'], axis=1, inplace=True)
rsrep_grade.drop(['budget'], axis=1, inplace=True)
rsrep_grade.drop(['BudgetPerStudent'], axis=1, inplace=True)
rsrep_grade.drop(['ReadingScoreAvg'], axis=1, inplace=True)
rsrep_grade.drop(['MathScoreAvg'], axis=1, inplace=True)
rsrep_grade.drop(['OverallPassingRate'], axis=1, inplace=True)
rsrep_grade.drop(['m9'], axis=1, inplace=True)
rsrep_grade.drop(['m10'], axis=1, inplace=True)
rsrep_grade.drop(['m11'], axis=1, inplace=True)
rsrep_grade.drop(['m12'], axis=1, inplace=True)
rsrep_grade = rsrep_grade.rename(columns={'r9':'9th'})
rsrep_grade = rsrep_grade.rename(columns={'r10':'10th'})
rsrep_grade = rsrep_grade.rename(columns={'r11':'11th'})
rsrep_grade = rsrep_grade.rename(columns={'r12':'12th'})

rsrep_grade['School Name'] = rsrep_grade.index
rsrep_grade = rsrep_grade.set_index('School Name').reset_index()
rsgraderep = msrep_grade.sort_values('School Name', ascending=True)

print('Reading Scores by Grade')
rsgraderep
```

    Reading Scores by Grade
    




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
      <th>School Name</th>
      <th>9th</th>
      <th>10th</th>
      <th>11th</th>
      <th>12th</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>7</th>
      <td>Bailey High School</td>
      <td>77.083676</td>
      <td>76.996772</td>
      <td>77.515588</td>
      <td>76.492218</td>
    </tr>
    <tr>
      <th>6</th>
      <td>Cabrera High School</td>
      <td>83.094697</td>
      <td>83.154506</td>
      <td>82.765560</td>
      <td>83.277487</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Figueroa High School</td>
      <td>76.403037</td>
      <td>76.539974</td>
      <td>76.884344</td>
      <td>77.151369</td>
    </tr>
    <tr>
      <th>13</th>
      <td>Ford High School</td>
      <td>77.361345</td>
      <td>77.672316</td>
      <td>76.918058</td>
      <td>76.179963</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Griffin High School</td>
      <td>82.044010</td>
      <td>84.229064</td>
      <td>83.842105</td>
      <td>83.356164</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Hernandez High School</td>
      <td>77.438495</td>
      <td>77.337408</td>
      <td>77.136029</td>
      <td>77.186567</td>
    </tr>
    <tr>
      <th>8</th>
      <td>Holden High School</td>
      <td>83.787402</td>
      <td>83.429825</td>
      <td>85.000000</td>
      <td>82.855422</td>
    </tr>
    <tr>
      <th>0</th>
      <td>Huang High School</td>
      <td>77.027251</td>
      <td>75.908735</td>
      <td>76.446602</td>
      <td>77.225641</td>
    </tr>
    <tr>
      <th>12</th>
      <td>Johnson High School</td>
      <td>77.187857</td>
      <td>76.691117</td>
      <td>77.491653</td>
      <td>76.863248</td>
    </tr>
    <tr>
      <th>9</th>
      <td>Pena High School</td>
      <td>83.625455</td>
      <td>83.372000</td>
      <td>84.328125</td>
      <td>84.121547</td>
    </tr>
    <tr>
      <th>11</th>
      <td>Rodriguez High School</td>
      <td>76.859966</td>
      <td>76.612500</td>
      <td>76.395626</td>
      <td>77.690748</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Shelton High School</td>
      <td>83.420755</td>
      <td>82.917411</td>
      <td>83.383495</td>
      <td>83.778976</td>
    </tr>
    <tr>
      <th>14</th>
      <td>Thomas High School</td>
      <td>83.590022</td>
      <td>83.087886</td>
      <td>83.498795</td>
      <td>83.497041</td>
    </tr>
    <tr>
      <th>5</th>
      <td>Wilson High School</td>
      <td>83.085578</td>
      <td>83.724422</td>
      <td>83.195326</td>
      <td>83.035794</td>
    </tr>
    <tr>
      <th>10</th>
      <td>Wright High School</td>
      <td>83.264706</td>
      <td>84.010288</td>
      <td>83.836782</td>
      <td>83.644986</td>
    </tr>
  </tbody>
</table>
</div>




```python
#Binning method
def Binning(col, bin_points, labels=None):
    #define col min and max values
    minval = col.min()
    maxval = col.max()
    
    #list created via bin_points
    breakPoints = [minval + bin_points + [maxval]]
    
    #handle labels if none provided
    labels = range(len(bin_points)+1)
    
    colBin = pd.cut(col, bins=breakPoints, labels=labels, include_lowest=True)
    return colBin
```


```python
#SchoolsSpending
z1 = SchoolsSpending.copy()
z2 = z1[['BudgetPerStudent','MathScoreAvg','ReadingScoreAvg','MathPassingPct','ReadingPassingPct','OverallPassingRate']]
zb = [550,590,630,645,660]
zn = ['<590','590-629','630-644','645-660']
z2['SpendingRange'] = pd.cut(z2['BudgetPerStudent'],zb,labels=zn)
sbs3ma = z2['MathScoreAvg'].groupby(z2['SpendingRange']).mean()
sbs3ra = z2['ReadingScoreAvg'].groupby(z2['SpendingRange']).mean()
sbs3mp = z2['MathPassingPct'].groupby(z2['SpendingRange']).mean()
sbs3rp = z2['ReadingPassingPct'].groupby(z2['SpendingRange']).mean()
sbs3op = z2['OverallPassingRate'].groupby(z2['SpendingRange']).mean()
sbs3 = pd.DataFrame({'Spending Range (per Student)':zn,
                    'Average Math Score':sbs3ma,
                    'Average Reading Score':sbs3ra,
                    '% Passing Math':sbs3mp,
                    '% Passing Reading':sbs3rp,
                    '% Overall Passing Rate':sbs3op
                    })
```

    C:\ProgramData\Anaconda3\lib\site-packages\ipykernel_launcher.py:6: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      
    


```python

print('Scores by School Spending')
sbs3
#bin_points = [550,590,630,645,660]
#binLabels = ['<590','590-629','630-644','645-660']

#data['SpendingRange'] = Binning(data['SpendingRange'], bin_pints, binLabels)
#data
```

    Scores by School Spending
    




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
      <th>% Overall Passing Rate</th>
      <th>% Passing Math</th>
      <th>% Passing Reading</th>
      <th>Average Math Score</th>
      <th>Average Reading Score</th>
      <th>Spending Range (per Student)</th>
    </tr>
    <tr>
      <th>SpendingRange</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>&lt;590</th>
      <td>0.950355</td>
      <td>0.934601</td>
      <td>0.966109</td>
      <td>84.504010</td>
      <td>84.457674</td>
      <td>&lt;590</td>
    </tr>
    <tr>
      <th>590-629</th>
      <td>0.899259</td>
      <td>0.871335</td>
      <td>0.927182</td>
      <td>84.486546</td>
      <td>84.414657</td>
      <td>590-629</td>
    </tr>
    <tr>
      <th>630-644</th>
      <td>0.789380</td>
      <td>0.734842</td>
      <td>0.843918</td>
      <td>84.328349</td>
      <td>84.503626</td>
      <td>630-644</td>
    </tr>
    <tr>
      <th>645-660</th>
      <td>0.736494</td>
      <td>0.661648</td>
      <td>0.811340</td>
      <td>84.639836</td>
      <td>84.535230</td>
      <td>645-660</td>
    </tr>
  </tbody>
</table>
</div>




```python
#SchoolsSize
```


```python
#scores by school size
#scores_by_size = SchoolsSize.sort_values('size', ascending=False)
y1 = SchoolsSize.copy()

y2 = y1[['size','MathScoreAvg','ReadingScoreAvg','MathPassingPct','ReadingPassingPct','OverallPassingRate']]
yb = [0,1000,2000,5000]
yn = ['Small (<1000)','Medium (1000-2000)','Large (2000-5000)']
y2['School Size'] = pd.cut(y2['size'],yb,labels=yn)

rssbs3ma = y2['MathScoreAvg'].groupby(y2['School Size']).mean()
rssbs3ra = y2['ReadingScoreAvg'].groupby(y2['School Size']).mean()
rssbs3mp = y2['MathPassingPct'].groupby(y2['School Size']).mean()
rssbs3rp = y2['ReadingPassingPct'].groupby(y2['School Size']).mean()
rssbs3op = y2['OverallPassingRate'].groupby(y2['School Size']).mean()
rcount = y2['OverallPassingRate'].groupby(y2['School Size']).count()
rssbs3 = pd.DataFrame({'School Size':yn,
                    'Average Math Score':rssbs3ma,
                    'Average Reading Score':rssbs3ra,
                    '% Passing Math':rssbs3mp,
                    '% Passing Reading':rssbs3rp,
                    '% Overall Passing Rate':rssbs3op
                    })
#sbs3

```

    C:\ProgramData\Anaconda3\lib\site-packages\ipykernel_launcher.py:8: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      
    


```python
print('Scores by School Size')
rssbs3
```

    Scores by School Size
    




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
      <th>% Overall Passing Rate</th>
      <th>% Passing Math</th>
      <th>% Passing Reading</th>
      <th>Average Math Score</th>
      <th>Average Reading Score</th>
      <th>School Size</th>
    </tr>
    <tr>
      <th>School Size</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Small (&lt;1000)</th>
      <td>0.948248</td>
      <td>0.935502</td>
      <td>0.960994</td>
      <td>84.880143</td>
      <td>84.536059</td>
      <td>Small (&lt;1000)</td>
    </tr>
    <tr>
      <th>Medium (1000-2000)</th>
      <td>0.951952</td>
      <td>0.935997</td>
      <td>0.967907</td>
      <td>84.390094</td>
      <td>84.357500</td>
      <td>Medium (1000-2000)</td>
    </tr>
    <tr>
      <th>Large (2000-5000)</th>
      <td>0.763650</td>
      <td>0.699634</td>
      <td>0.827666</td>
      <td>84.435547</td>
      <td>84.531238</td>
      <td>Large (2000-5000)</td>
    </tr>
  </tbody>
</table>
</div>




```python
#scores by school type

t1 = SchoolsType.copy()

t2 = t1[['type','MathScoreAvg','ReadingScoreAvg','MathPassingPct','ReadingPassingPct','OverallPassingRate']]
t2['schType'] = np.where(t2['type'] == 'District', 1,2)

tb = [0,1,2]
tn = ['District','Charter']
t2['School Type'] = pd.cut(t2['schType'],tb,labels=tn)

tssbs3ma = t2['MathScoreAvg'].groupby(t2['School Type']).mean()
tssbs3ra = t2['ReadingScoreAvg'].groupby(t2['School Type']).mean()
tssbs3mp = t2['MathPassingPct'].groupby(t2['School Type']).mean()
tssbs3rp = t2['ReadingPassingPct'].groupby(t2['School Type']).mean()
tssbs3op = t2['OverallPassingRate'].groupby(t2['School Type']).mean()
tcount = t2['OverallPassingRate'].groupby(t2['School Type']).count()
tssbs3 = pd.DataFrame({'School Size':tn,
                    'Average Math Score':tssbs3ma,
                    'Average Reading Score':tssbs3ra,
                    '% Passing Math':tssbs3mp,
                    '% Passing Reading':tssbs3rp,
                    '% Overall Passing Rate':tssbs3op,
                       'count':tcount
                    })
#sbs3

```

    C:\ProgramData\Anaconda3\lib\site-packages\ipykernel_launcher.py:6: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      
    C:\ProgramData\Anaconda3\lib\site-packages\ipykernel_launcher.py:10: SettingWithCopyWarning: 
    A value is trying to be set on a copy of a slice from a DataFrame.
    Try using .loc[row_indexer,col_indexer] = value instead
    
    See the caveats in the documentation: http://pandas.pydata.org/pandas-docs/stable/indexing.html#indexing-view-versus-copy
      # Remove the CWD from sys.path while we load stuff.
    


```python
print('Scores by School Type')
tssbs3
```

    Scores by School Type
    




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
      <th>% Overall Passing Rate</th>
      <th>% Passing Math</th>
      <th>% Passing Reading</th>
      <th>Average Math Score</th>
      <th>Average Reading Score</th>
      <th>School Size</th>
      <th>count</th>
    </tr>
    <tr>
      <th>School Type</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>District</th>
      <td>0.736738</td>
      <td>0.665485</td>
      <td>0.807991</td>
      <td>84.462903</td>
      <td>84.531876</td>
      <td>District</td>
      <td>7</td>
    </tr>
    <tr>
      <th>Charter</th>
      <td>0.951037</td>
      <td>0.936208</td>
      <td>0.965865</td>
      <td>84.494351</td>
      <td>84.423298</td>
      <td>Charter</td>
      <td>8</td>
    </tr>
  </tbody>
</table>
</div>


