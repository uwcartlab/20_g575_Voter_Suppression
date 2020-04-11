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
        Gina first encounters the title to the website,    . There is also a provocative background image, video, or graphic, and a description of the websites' purpose to kickoff a longform overview.   
        Scrolling down, she reads through a story about how restrictive voter laws exist in some places of the United States. After this chunk, the  first part would present three different cities (Atlanta, Austin, and Dodge City,KS) to facilitate the fulfillment of comparison objectives.   
        While scrolling, the user would be introduced to some of the operators in the exploratory segment of the interface.   
        For example, while learning about the photo ID requirements of Atlanta, vibrant affordances would invite the user to toggle between overlays.   
        One could be a choropleth map depicting the outcome of a particular election while the other could be the basemap with city polling locations.   
        Several cities would be available for zooming into for more information.   
        The user would explore these after the scrolling portion of the site.   
        Zooming into these cities would provide context to the user such as the specific types of laws proposed and passed by our cities of interest.   
        Side panels with explanatory text and hyperlinks to further reading would be available in the event of the user becoming particularly interested with a specific city.   
        Some of the text contain supplementary images or videos.   
        Zooming out could assist the user in finding spatial clusters of cities with similar types of laws.   
        The three types of laws the user could explore would be voter ID laws, voter registration laws, and early/absentee voting laws.   
        Lastly, the overview map, which is at the national scale, would highlight states relevant to the narrative.   
        However, upon clicking a state, the map would not zoom in like in the case of clicking on a city, but a side panel would still appear.   
        After looking through some of these features, the user would toggle "No restrictive laws", click on Philadelphia, and read through the text to contrast it with the situation in Memphis.   
        The user would exit the site with a better understanding of how and why places institute and dismantle restrictive voter laws.


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
