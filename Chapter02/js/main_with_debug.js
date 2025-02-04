/*******************************************
 *  Activity 3 - Cities Table and Debugging 1
 *  Dave Vanosdall 
 ******************************************/
// In this version of the script they were pretty liberal with the "var" keywords, where 
// they should have probably used let or const or sonarqube would have complained about it.

// Wait until the webpage is fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // List of cities with their populations
    var cityPop = [
        { city: 'Madison', population: 233209 },
        { city: 'Milwaukee', population: 594833 },
        { city: 'Green Bay', population: 104057 },
        { city: 'Superior', population: 27244 }
    ];

    // Create a table element and fill it with data about the cities
    var table = document.createElement('table'); 

    // Create the header row for the table with "City" and "Population" columns
    var headerRow = document.createElement('tr'); 
    headerRow.insertAdjacentHTML('beforeend', '<th>City</th><th>Population</th>');
    table.appendChild(headerRow);

    // Add a row for each city in the cityPop array
    cityPop.forEach(function(city) {
        var row = document.createElement('tr'); 
		// beforeend just makes sure that is inserted at the end right before the closing tag
        row.insertAdjacentHTML('beforeend', '<td>' + city.city + '</td><td>' + city.population + '</td>'); 
        table.appendChild(row);
    });

    // Attach the table to the mydiv div
    document.querySelector('#mydiv').appendChild(table);

    // Add the "City Size" column to the table
    addColumns(cityPop);

    // Add events for when the user interacts with the table
    addEvents();

    /**
     * Adds a "City Size" column to the table.
     * The city size depends on population:
     ** Small: less than 100,000 people * Medium: between 100,000 and 500,000 * Large: more than 500,000 people
     * @param {Array} cityPop - The list of cities and populations
     */
    function addColumns(cityPop) {
        // Go through each row in the table
        document.querySelectorAll('tr').forEach(function(row, i) {
            // For the header row, add a new column title for "City Size"
            if (i == 0) {
                row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
            } else {
                // Figure out the city size for the current city based on population
                var citySize;
                if (cityPop[i - 1].population < 100000) {
                    citySize = 'Small';
                } else if (cityPop[i - 1].population < 500000) {
                    citySize = 'Medium';
                } else {
                    citySize = 'Large';
                }

                // Add the city size info as a new cell in the row
                row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
            }
        });
    }

    /**
     * Adds mouseover and click events to the table:
     ** Mouseover: Changes the table's background to a random color
     ** Click: Shows an alert that says the table was clicked
     */
    function addEvents() {
        // When the mouse moves over the table, change its background to a random color
        document.querySelector('table').addEventListener('mouseover', function() {
            var color = 'rgb(';

            // Create three random numbers between 0 and 255 for RGB
            for (var i = 0; i < 3; i++) {
                var random = Math.round(Math.random() * 255); 
                color += random;

                if (i < 2) {
                    color += ','; 
                } else {
                    color += ')'; 
                }
            }

            // Set the table's background color to the random RGB value
            document.querySelector('table').style.color = color;
        });

        // Show a pop-up message when the table is clicked
        function clickme() {
            alert('Hey, you clicked me!');
        }

        // Add the click event to the table
        document.querySelector('table').addEventListener('click', clickme);
    }
});
