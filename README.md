# Team Mystery Machine #

### Team Members:
    1. Michael Biehl
    2. Christopher Archuleta
    3. Regan Murray

### Draft Proposal
    I. Persona/Scenario
        1. Persona
        Gina is a college educated United States citizen. She works as a county clerk, so she is somewhat familiar with different types of voter suppression. She is also aware of the history of voter suppression in the US.
        Gina concerns herself with voting rights, being a county clerk. In order to learn about the current voting climate in the United States, she researches to answer some questions and find out how to advocate for voters. Some of these questions are about the accessibility of polling locations for different demographic groups in different location and the different laws and regulations that contribute or hinder accessibility. That is, Gina wishes to compare different places based on the laws that they have, identify where people can vote, and correlate voting locations and voting laws with where different people live.  
        She experienced a number of online interfaces before, including ones with maps. She knows what to look for and is expecting some level of interactivity to retrieve information on places she's concerned with most but is also looking for a succinct site that will situate her county within the current condition of voter suppression across the country.


        2. Scenario
        While on her laptop, Gina first encounters the title to the website,    . There is also a provocative background image, video, or graphic, and a description of the websites' purpose to kickoff a longform overview.   
        Scrolling down, she reads through a story about how restrictive voter laws exist in some places of the United States. After this chunk, a heading for Atlanta, GA appears. Gina notices a map below the city name and proceeds to interact. She sees that polling locations in Atlanta are displayed on the map as are the nonwhite population proportions based on the legend. Generally reading in a brief moment, she looks for correlations between the demographics and the polling locations. She notices that census tracts are higlighted as she scrolls over them and clicks on the ones she's interested in. The map responds by displaying a popup with details such as the census tract number and the exact demographic makeup.
        After identifying the locations of some of the polling places, she compares the relative distances of the census tracts relative to them. The legend has checkboxes showing which of the available overlays are visible. She toggles the 2016 election outcome to see the census tracts by the candidate with the most votes in that tract.
        She leaves the map and reads some explanatory text speaking to the specific voting situation of Atlanta, the types of restrictive and enabling laws that exist there, and the generalities of the country's voting restrictions that pertain to it.
        After skimming through the rest of the cities, such as Austin, she reaches a conclusion. There is text explaining that laws and policies play a major role in voter suppression. To illustrate the scale of this phenomenon, there is one last map that shows the whole country. It is a bivariate choropleth map, with one variable being the presence of various photo ID requirements and the other being affidavit requirements. She reads it and takes note of the status of a few states, associating the laws of a few of the states with the example cities shown prior.



    II. Requirements Doc
        1. Representation

          A. Census Tract: Colored choropleth depicting various demographic data.

          B. Basemap: Lightly colored mapbox/leaflet basemap, appropriate for overlaid choropleth.

          C. Cities: Each focus city will have a clear outline of its boundaries within the county it resides in.

          D. Polling Places: Stylized point symbols overlaying choropleth.

          E. Election results: Choropleth zoomable map covering the same extent as the basemap. Traditional red and blue colors will be used to signify party victories.

          H. Legend: Corresponding Legend for choropleth levels and icon definition of polling place. Wish to make the legend scented and highlight corresponding census tracts with legend levels.

          I. (Wish-List Exploratory Country Map): Basic exploratory map, choropleth of states depicting their respective voter ID law strictness.


        2. Interaction

          A. Scroll: Constrained Zoom - User can scroll zoom in and out of article's leaflet maps, however will be limited to just the metropolitan area.
                     Scroll for Text - User can scroll up and down for scrolly-telling if cursor is off map.

          B. Constrained Pan: User can directly manipulate the map via dragging, however panning will be limited to the metropolitan area.

          B. Tract/Polling-Place Selection: Retrieve - User selects a polling place or census tract. A popup will then display the polling place's name and address, and clicking on the census tract will trigger a popup with the tract's various non-white population percentage.

          C. (Wish-List Exploratory State Selection: Retrieve - Clicking a state will open a pop-up describing the state's Voter ID law)

    III. Wireframes
      ![wireframe_01](/wireframe_1-01.png)
      ![wireframe_02](/wireframe_2-01.png)
      ![wireframe_03](/wireframe_3-01.png)
      ![wireframe_04](/wireframe_4-01.png)
