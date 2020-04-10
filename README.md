# Team Mystery Machine #

### Team Members:
    1. Michael Biehl
    2. Christopher Archuleta
    3. Regan Murray

### Draft Proposal
    I. Persona/Scenario
        1. Persona
        The prototypical user of our interactive tool about voter suppression would be from the general public.
        Such a hypothetical user would not usually be concerned with the politics of voter accessibility, but would be concerned with them after learning about various restrictive laws.  
        Being of the general U.S. public, the user would encounter our tool online, as in a case of reading an online news article or scrolling on a social media site.  
        Familiar interfaces, like common social media websites and desktop applications, constitute the bulk of the user's technology exposure.   
        After being presented with important background overview knowledge about voting restrictions, the main goal would be to learn about the current state of voting restriction in the U.S.   
        Certain objectives pertaining to this goal include identifying which places have restrictive laws and policies, comparing places (e.g. user's home state vs. neighboring state) by number and type of restrictive laws, and delineating spikes of restrictive laws through time, simultaneously comparing time periods (e.g. 2020 vs. 2000) with each other.   
        Our persona would preferably have more questions after evaluating this information, like how to act against voter suppression.


        2. Scenario
        The user experience begins with an enticing landing page showing a descriptive title, a provocative background image, video, or graphic, and a description of the websites' purpose to kickoff a longform overview.   
        This first part would present three different cities (Atlanta, Austin, and Dodge City,KS) to facilitate the fulfillment of comparison objectives.   
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

          A. Census Tract: Colored choropleth depicting various demographics

          B. Basemap: lightly colored mapbox/leaflet basemap, appropriate for overlaid choropleth

          C. Cities: Each focus city will have a clear outline of its boundaries within the county it resides in

          D. Polling Places: stylized point symbols overlaying choropleth

          E. Election results: static image of the last election which will be a choropleth map of census tracts made in arc, covering the same extent as the leaflet map. Traditional red/blue will be used to signify party victories

          H. Legend: Corresponding Legend for choropleth levels and icon definition of polling place

          I. (Wish-List Exploratory Country Map): Basic exploratory map, choropleth of states depicting their respective voter ID law strictness


        2. Interaction

          A. Scroll: Constrained Zoom - User can scroll zoom in and out of article's leaflet maps, however will be limited to just the metropolitan area
                     Scroll for Text - User can scroll up and down for scrolly-telling if cursor is off map

          B. Constrained Pan: User can directly manipulate the map via dragging, however panning will be limited to metropolitan area

          B. Tract/Polling-Place Selection: Retrieve - User selects a polling place or census tract which will then identify the polling place's name/address, and the census tract will identify the tract's various non-white population percentage

          C. (Wish-List Exploratory State Selection: Retrieve - Clicking a state will open a pop-up describing the state's Voter ID law)

    III. Wireframes
      ![wireframe_01](/wireframe_1-01.png)
      ![wireframe_02](/wireframe_2-01.png)
      ![wireframe_03](/wireframe_3-01.png)
      ![wireframe_04](/wireframe_4-01.png)
