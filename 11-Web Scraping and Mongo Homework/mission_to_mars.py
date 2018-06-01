import time
from splinter import Browser
from bs4 import BeautifulSoup
from selenium import webdriver
from sys import platform
import pandas as pd



def init_browser():
    if platform == "darwin":
        executable_path = {"executable_path": "/usr/local/bin/chromedriver"}
    else:
        executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser("chrome", **executable_path, headless=False)

def scrape():
    browser = init_browser()
    # create mars_data dict that we can insert into mongo
    mars_data = {}



    # Grab featured image from jpl.nasa---------------------------------------------------------------------------------------
    url = "https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars"
    browser.visit(url)
    html = browser.html
    full_image_button = browser.find_by_xpath('//*[@id="full_image"]')
    full_image_button.click()
    time.sleep(2)
    more_info_button = browser.find_by_xpath('//*[@id="fancybox-lock"]/div/div[2]/div/div[1]/a[2]')
    more_info_button.click()
    time.sleep(2)
    full_res_jpg = browser.find_by_xpath('/html/body/div[1]/div/div[3]/section[1]/div/article/div[2]/aside[1]/ul/li[5]/div/p')
    browser.click_link_by_partial_text('jpg')
    time.sleep(2)
    browser.find_by_tag('img').click()
    html = browser.html
    try:
        # create a soup object from the html
        img_soup = BeautifulSoup(html, "html.parser")
        featured_image_url = img_soup.find("img")["src"]
    except:
        featured_image_url = ""
    # Add image to mars_data with a key of nasa_jpl
    mars_data["nasa_jpl"] = featured_image_url



    # Grab Latest Mars News-------------------------------------------------------------------------------------------------------
    url = "https://mars.nasa.gov/news"
    browser.visit(url)
    html = browser.html
    article_soup = BeautifulSoup(html, "html.parser")
    # Isolate latest article title
    time.sleep(2)
    try:
        latest_article = article_soup.find(class_ = "content_title").get_string
    except:
        latest_article = article_soup.find(class_ = "content_title").get_text
        

    # Add result to mars_data
    mars_data['article_title'] = latest_article
    time.sleep(2)
    # Isolate teaser text for latest article
    try:
        article_teaser = article_soup.find(class_ = "article_teaser_body").get_string
    except:
        article_teaser = article_soup.find(class_ = "article_teaser_body").get_text


    # Add resuslt to mars_data
    mars_data['article_teaser'] = article_teaser
    


    # Grab weather from Mars Weather's twitter page---------------------------------------------------------------------
    url = "https://twitter.com/marswxreport?lang=en"
    browser.visit(url)
    html = browser.html
    weather_soup = BeautifulSoup(html, "html.parser")
    # Isolate latest weather tweet
    mars_weather = weather_soup.find(class_ = "TweetTextSize TweetTextSize--normal js-tweet-text tweet-text").text
    # Add resuslts to mars_data dictionary
    mars_data['weather'] = mars_weather



    # Grab pictures of Hemispheres------------------------------------------------------------------------------------------
    # create a list for dictionaries of hemispheres and images
    hemisphere_image_urls = []
    cerberus_dict = {}
    schiaparelli_dict = {}
    syrtis_major_dict = {}
    valles_marineris_dict = {}

    # Point browser to Cerberus
    url = "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/cerberus_enhanced.tif/full.jpg"
    browser.visit(url)
    time.sleep(2)
    html = browser.html
    try:
        cerberus_soup = BeautifulSoup(html, "html.parser")
        cerberus_hemi = cerberus_soup.find("img")["src"]
    except:
        cerberus_hemi = ""
    cerberus_dict["img_url"] = cerberus_hemi
    cerberus_dict["title"] = "Cerberus"
    hemisphere_image_urls.append(cerberus_dict)

    # Point browser to Schiaparelli
    url = "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/schiaparelli_enhanced.tif/full.jpg"
    browser.visit(url)
    time.sleep(2)
    html = browser.html
    try:
        schiaparelli_soup = BeautifulSoup(html, "html.parser")
        schiaparelli_hemi = schiaparelli_soup.find("img")["src"]
    except:
        schiaparelli_hemi = ""
    schiaparelli_dict["img_url"] = schiaparelli_hemi
    schiaparelli_dict["title"] = "Schiaparelli"
    hemisphere_image_urls.append(schiaparelli_dict)

    # Point browser to Syrtis Major
    url = "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/syrtis_major_enhanced.tif/full.jpg"
    browser.visit(url)
    time.sleep(2)
    html = browser.html
    try:
        syrtis_major_soup = BeautifulSoup(html, "html.parser")
        syrtis_major_hemi = syrtis_major_soup.find("img")["src"]
    except:
        syrtis_major_hemi = ""
    syrtis_major_dict["img_url"] = syrtis_major_hemi
    syrtis_major_dict["title"] = "Syrtis_Major"
    hemisphere_image_urls.append(syrtis_major_dict)
  
    # Point browser to Valles Marineris
    url = "https://astropedia.astrogeology.usgs.gov/download/Mars/Viking/valles_marineris_enhanced.tif/full.jpg"
    browser.visit(url)
    time.sleep(2)
    html = browser.html
    try:
        valles_marineris_soup = BeautifulSoup(html, "html.parser")
        valles_marineris_hemi = valles_marineris_soup.find("img")["src"]
    except:
        valles_marineris_hemi = ""
    valles_marineris_dict["img_url"] = valles_marineris_hemi
    valles_marineris_dict["title"] = "Valles_Marineris"
    hemisphere_image_urls.append(valles_marineris_dict)
   
    mars_data["mars_hemispheres"] = hemisphere_image_urls


    mars_table = pd.read_html('https://space-facts.com/mars/#facts')[0]
    mars_table.columns = ["Fact" , "Value"]


    mars_facts = mars_table.to_html(classes=["table-bordered", "table-striped", "table-hover"], index=False)
    # Add result to mars_data
    mars_data["mars_facts"] = mars_facts


    browser.quit()
    return mars_data


