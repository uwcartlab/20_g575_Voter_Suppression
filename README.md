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

          A. Overview: Formatted descriptive text with embedded images, hyperlinks, and minimally interactive maps.

          B. Basemap: Low opacity continental United States state boundaries. States and cities of interest bold and saturated.

          C. Cities: Point symbols with labels, highlighted as affordance to click.

          D. Polling Wards: Stylized lines with complementarily stylized labels for before and after laws were enacted

          E. Election results: Fill color of enumerated areas corresponding to winning political party.
          ???Voter turnout as transparency (four or five classes)???
          ???Proportional symbols???
          ???Dot density since user cannot zoom in (avoid ecological fallacy)???

          F. Timeline: Horizontal accordion or mosaic of thumbnails to click on.
          Timeline title situated above timeline and scale of years situated below.

          G. Demographic Information: Choropleth layer of counties depicting black population per capita of district in Atlanta

          H. Legend: On map??? Regardless of location, user should not have to look for it. Will depict definition of symbols and color ramps used on maps

          I. Side Panel: Collapsible block with text and hyperlinks with details and context.


        2. Interaction

          A. Information panel: User must acknowledge an info panel which provides guidance for website use. They "acknowledge" the panel by exiting out of it.

          B. Scroll: Zoom - As user scrolls down webpage past the first map, a national-scale map zooms into 1 of 3 case study cities from story to provide geographic context for the user.

          C. Historical image grid: Retrieve - User clicks on a historical image to learn more about the city's history of voting. An information panel will appear and the photo will be enlarged.

          D. Map Slider: Sequence - User can move a slider overlaid onto the map to spatially view how voting wards were changed between two years.

          E. Timeline: Sequence - User can sequence through a timeline using buttons or direct manipulation to see voter turnout at different points in time.

          F. State Selection: Retrieve - User selects a state and is presented with data on voter turnout from that state.

    III. Wireframes
      ![wireframe_01](/wireframe_1-01.png)
      ![wireframe_02](/wireframe_2-01.png)
      ![wireframe_03](/wireframe_3-01.png)
      ![wireframe_04](/wireframe_4-01.png)
