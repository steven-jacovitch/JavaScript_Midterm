// Monitor console warnings, errors, and logs
let consoleError;
let consoleWarning;
let consoleLog;

Cypress.on("window:before:load", (win) => {
  consoleError = cy.spy(win.console, "error").log(false);
  consoleWarning = cy.spy(win.console, "warn").log(false);
  consoleLog = cy.spy(win.console, "log").log(false);
});
const DELAY = 1000;

describe("Basic Tests", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test.
    cy.visit(`http://localhost:${Cypress.env("theport") || 8080}`);
  });
  it("passes a very basic test to confirm tests are running", () => {
    cy.get("h1").should("include.text", "Midterm 1 W24");
    cy.get("main").should("have.class", "container");
  });
});

describe("Midterm Problems", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:${Cypress.env("theport") || 8080}`);
  });

  describe("Problem 1 tests", () => {
    it("problem1.js is successfully imported into index.html", () => {
      cy.get('head script[src*="js/problem1.js"]').should("exist");
    });
    it("Problem 1 message reflects the fact that problem1.js is loaded", () => {
      cy.get("h2#problem-1-message").should(
        "have.text",
        "This page is now successfully loading problem1.js"
      );
    });
  });

  describe("Problem 2 tests", () => {
    it("'id-list' contains the right number of list items", () => {
      cy.get("ul#id-list")
        .children()
        .then(($children) => {
          expect(
            $children.length,
            `Expected 13 list items within id list`
          ).to.equal(13);
        });
    });
    it("Each list item (li) in '#id-list' has the `list-group-item` class", () => {
      cy.get("ul#id-list")
        .children()
        .each(($child) => {
          expect($child.get(0).tagName.toLowerCase()).to.equal("li", 'Each child of #id-list is an `<li>` tag');
          expect($child.hasClass('list-group-item')).to.equal(true,'each <li> has the class `list-group-item`')
        });
    });
    // Attempted to make the test dynamic by fetching all ids and then comparing the printing list
    // with said ids
    it("All ids are fetched", () => {
      let fetched_id_list = [];
      let output_id_list = [];
      cy.get("*").each(($element) => {
        cy.wrap($element)
          .invoke("attr", "id")
          .then(($id) => {
            if ($id) {
              fetched_id_list.push($id);
            }
          });
      });

      cy.get("ul#id-list")
        .children()
        .each(($child) => {
          output_id_list.push($child.text());
        });

      cy.wrap(fetched_id_list).should("deep.equal", output_id_list);
    });
  });


  describe("Problem 3 tests", () => {
    it("Current date and time are fetched and displayed during initial page load", () => {
      // Start the clock at Epoch, override the Date() object
      cy.clock(0, ["Date"]);

      // Reload to propagate the overriden Date() 
      cy.reload();

      const expectedDateTime = new Date(0).toISOString();

      cy.get("div#time-output")
        .invoke("text")
        .then((innerHTML) => {
          // Convert the innerHTML to GMT/UTC format
          const formattedDateUTC = new Date(innerHTML).toISOString();

          // Assert that the GMT/UTC formatted date matches the local formatted date
          expect(formattedDateUTC).to.equal(expectedDateTime);
        });
    });
    it("The 'time-output' div has the 'from-a-button-click' class after the 'Check DateTime' button is clicked, giving it a solid blue border", () => {
      cy.get("button#check-time").click();
      cy.get("div#time-output").should("have.class", "from-a-button-click");
    });
    it("The 'time-output' div text is updated with the new current datetime after the 'Check DateTime' button is clicked", () => {
      // Start the clock at Epoch, override the Date() object
      cy.clock(0, ["Date"]);
      // Simulate waiting for 1000 milliseconds
      cy.tick(1000);
      cy.get("button#check-time").click();
      const expectedDateTime = new Date(1000).toISOString();

      cy.get("div#time-output")
        .invoke("text")
        .then((innerHTML) => {
          // Convert the innerHTML to GMT/UTC format
          const formattedDateUTC = new Date(innerHTML).toISOString();

          // Assert that the GMT/UTC formatted date matches the local formatted date
          expect(formattedDateUTC).to.equal(expectedDateTime);
        });
    });
  });

  describe("Problem 4 tests", () => {
    beforeEach(() => {
      cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon-species", {
        fixture: "pokemon.json",
      }).as("getPokemonSpecies");
      cy.visit(`http://localhost:${Cypress.env("theport") || 8080}`);
    });

    it("Expects a fetch call to retrieve pokemon species", () => {
      cy.wait("@getPokemonSpecies", { timeout: 2000 });
    });

    it("Displays pokemon species correctly", () => {
      cy.wait("@getPokemonSpecies");

      cy.get("#pokemon-name-list div")
        .should("have.length", 20)
        .then((listItems) => {
          const expectedNames = [
            "bulbasaur",
            "ivysaur",
            "venusaur",
            "charmander",
            "charmeleon",
            "charizard",
            "squirtle",
            "wartortle",
            "blastoise",
            "caterpie",
            "metapod",
            "butterfree",
            "weedle",
            "kakuna",
            "beedrill",
            "pidgey",
            "pidgeotto",
            "pidgeot",
            "rattata",
            "raticate",
          ].sort();
          listItems.each((index, item) => {
            expect(
              item.innerText.trim(),
              `Should sort names alphabetically`
            ).to.equal(expectedNames[index]);
          });

          const classNames = listItems[0].className.split(" ");
          expect(
            classNames,
            "Should have the correct classnames"
          ).to.include.members([
            "col",
            "col-sm-2",
            "text-center",
            "border",
            "border-success",
            "p-2",
          ]);
        });
    });
  });

  describe("Problem 5 tests", () => {
    const storedValues = {
      "text-1": "Value 1",
      "text-2": "Value 2",
      "text-3": "Value 3",
    };

    beforeEach(() => {
      localStorage.clear();
      localStorage.setItem("stored.values", JSON.stringify(storedValues));
      cy.visit(`http://localhost:${Cypress.env("theport") || 8080}`);
    });

    it("Correctly populates inputs with values from localStorage on page load", () => {
      cy.window().then((win) => {
        const storedValues = JSON.parse(
          win.localStorage.getItem("stored.values")
        );
        Object.entries(storedValues).forEach(([key, value]) => {
          cy.get(`#${key}`)
            .invoke("val")
            .then((val) => {
              expect(
                val,
                `Input #${key} should be populated with its corresponding value from localStorage`
              ).to.eq(storedValues[key]);
            });
        });
      });
    });

    it("Saves changes to input values in localStorage", () => {
      const newValues = {
        "text-1": "newValue1",
        "text-2": "newValue2",
        "text-3": "newValue3",
      };
      cy.get("#text-1").clear().type(newValues["text-1"]);
      cy.get("#text-2").clear().type(newValues["text-2"]);
      cy.get("#text-3").clear().type(newValues["text-3"]);
      cy.get("#text-1").trigger("input");
      cy.get("#text-2").trigger("input");
      cy.get("#text-3").trigger("input");

      cy.window().then((win) => {
        const updatedValues = JSON.parse(
          win.localStorage.getItem("stored.values")
        );
        expect(
          updatedValues["text-1"],
          "Should store value in Field One to local storage"
        ).to.eq(newValues["text-1"]);
        expect(
          updatedValues["text-2"],
          "Should store value in Field Two to local storage"
        ).to.eq(newValues["text-2"]);
        expect(
          updatedValues["text-3"],
          "Should store value in Field Three to local storage"
        ).to.eq(newValues["text-3"]);
      });
    });
  });

  afterEach(() => {
    // Confirm there are no console log/warning/errors after every test iteration.
    cy.wait(DELAY).then(() => {
      if (consoleLog.callCount > 0) {
        throw new Error(
          "YOU SHOULD NOT HAVE console.log() IN YOUR SUBMITTED CODE"
        );
      }
      if (consoleError.callCount > 0) {
        throw new Error(
          "ERRORS FOUND IN YOUR CODE! You need to fix them. Check the JS console in your application."
        );
      }
      if (consoleWarning.callCount > 0) {
        throw new Error(
          "WARNINGS FOUND IN YOUR CODE! You need to address them. Check the JS console in your application."
        );
      }
    });
  });
});
