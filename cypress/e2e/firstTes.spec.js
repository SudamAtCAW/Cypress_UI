/// <reference types="cypress" />

describe("Test Suite 1", () => {
  it("Test case 1", () => {
    cy.visit("/")
      .contains("Forms")
      .click()
      .get(".menu-title")
      .contains("Form Layouts")
      .click()

      //By Tag Name
      .get("input")

      //By Id
      .get("#inputEmail")

      //By Class name
      .get(".input-full-width")

      //By Attribute name
      .get("[placeholder]")

      //By Attributr name and value
      .get('[placeholder="Email"]')

      //By Class value
      .get('[class="input-full-width size-medium shape-rectangle"]')

      //By Tag name and Attribute with value
      .get('input[placeholder="Email"]')

      //By two different attributes
      .get('[placeholder="Email"][type="email"]')

      //By tag name, Attribute with value, ID and class name
      .get('input[placeholder="Email"]#inputEmail.input-full-width')

      //The most recomended way
      .get('[data-cy="imputEmail1"]');
  });
  it("second test", () => {
    cy.visit("/")
      .contains("Forms")
      .click()
      .get(".menu-title")
      .contains("Form Layouts")
      .click()
      .get('[data-cy="signInButton"]')
      .click();
    cy.contains('[status="warning"]', "Sign in").click(); //if there are two buttons of same attribute, then we can also use other attributes to match our required element.
    cy.get(".form-inline").children('[placeholder="Jane Doe"]').type("Anthony");
    cy.get(".form-inline")
      .children('[placeholder="Email"]')
      .type("The Silence of the Lambs");
    cy.get(".form-inline").children('[status="primary"]').click();

    cy.get(".form-inline").find('[placeholder="Jane Doe"]').type("Anthony");
    cy.get(".form-inline")
      .find('[placeholder="Email"]')
      .type("The Silence of the Lambs");
    cy.get(".form-inline").find('[status="primary"]').click();

    cy.get(".menu-items").find('[title="Forms"]').click();
    //Getting an element from a parent element
    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form")
      .find('[type="email"]')
      .type("AnthonyHopkins");

    //cy.getBySel("#inputEmail3").type('anthonyHopkins');
    //cy.getBySel("sign").click();
  });

  it("Third Test", () => {
    cy.visit("/").contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.formLayOuts();
    cy.getDataCy("signInButton").click().get('[title="Layout"]').click();
    cy.get(
      'li[class="menu-item ng-tns-c7-5 ng-tns-c7-4 ng-star-inserted"]'
    ).click();
    //.contains('Datepicker').click()
    cy.get('a[title="Layout"]').click();
    cy.contains("Layout").click();
    cy.get('a[title="Forms"]').click();
    cy.contains("Forms").click();
    cy.get('a[title="Form Layouts"]').click();
    cy.contains("Form Layouts").click();
    cy.get('a[title="Datepicker"]').click();
    cy.contains("Datepicker").click();
    cy.get('a[title="Modal & Overlays"]').click();
    cy.contains("Modal & Overlays").click();
    cy.get('a[title="Extra Components"]').click();
    cy.contains("Extra Components").click();
    cy.get('a[title="Tables & Data"]').click();
    cy.contains("Tables & Data").click();
    cy.get('a[title="Auth"]').click();
    cy.contains("Auth").click();
  });

  it('"Then and Wrap methods"', () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    // cy.contains('nb-card','Using the Grid').find('[for="inputEmail1"]').should('contain','Email')
    // cy.contains('nb-card','Using the Grid').find('[for="inputPassword2"]').should('contain','Password')
    // cy.contains('nb-card','Basic form').find('[for="exampleInputEmail1"]').should('contain','Email address')
    // cy.contains('nb-card','Basic form').find('[for="exampleInputPassword1"]').should('contain','Password')

    //selenium style
    // firstForm.find('[for="inputEmail1"]').should('contain','Email')
    // firstForm.find('[for="inputPassword2"]').should('contain','Password')
    // secondForm.find('[for="exampleInputEmail1"]').should('contain','Email address')

    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      //this is a jquery method
      const firstEmail = firstForm.find('[for="inputEmail1"]').text();
      const firstPassword = firstForm.find('[for="inputPassword2"]').text();
      //expect is a chai assertion command
      expect(firstEmail).to.equal("Email");
      //cy.get(firstEmail).click()
      expect(firstPassword).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const secondEmail = secondForm
          .find('[for="exampleInputEmail1"]')
          .text();
        const secondPassword = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(secondEmail).to.equal("Email address");
        expect(secondPassword).to.equal("Password");
        expect(firstPassword).to.equal(secondPassword);
        //to convert the jquery method into cypress we have to use the wrap command
        //should is a cypress command
        cy.wrap(secondForm)
          .find('[for="exampleInputEmail1"]')
          .should("contain", "Email address");
      });
    });

    //   cy.contains('nb-card','Basic form').then(secondForm =>{
    //     const secondEmail=secondForm.find('[for="exampleInputEmail1"]').text()
    //     const secondPassword=secondForm.find('[for="exampleInputPassword1"]').text()
    //     expect(secondEmail).to.equal('Email address')
    //     expect(secondPassword).to.equal('Password')
    //     // expect(firstPassword).to.equal(secondPassword)
    //     //to convert the jquery method into cypress we have to use the wrap command
    //     //should is a cypress command
    //     cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain','Email address')
    //  })
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      //here we have to call an text method
      expect(label.text()).to.equal("Email address");
    });

    //3
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    //4
    cy.contains("nb-card", "Basic form")
      .find(".custom-checkbox")
      .click()
      .invoke("attr", "class")
      // .should('contain', 'checked')
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
  });

  it("Assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        //we have to perform a click function on the jquery method
        //so we have to wrap it to convert it into cypress format
        cy.wrap(input).click();
        cy.get("nb-calendar-day-picker").contains("14").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Dec 14, 2022");
      });
  });

  it("Radio Buttons and Check Boxes", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons)
          .first() // we can also use the index number to access the elements
          //to force check on elements
          .check({ force: true })
          .should("be.checked");

        cy.wrap(radioButtons)
          .eq(1) //accessing the second element by using the index number
          .check({ force: true });

        cy.wrap(radioButtons)
          .eq(0) //accessing the second element by using the index number
          .should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });

  it("check Boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    // cy.get('[type="checkbox"]').check({force: true})
    cy.get('[type="checkbox"]').eq(0).click({ force: true });
    cy.get('[type="checkbox"]').eq(1).check({ force: true });
  });

  it("Lists and Dropdowns", () => {
    cy.visit("/");

    //1: The below code can be repetative if it contains too many options
    //we haave to make it dynamic so that we don't have to hard code it again
    // cy.get('nav nb-select').click()
    // cy.get('.options-list').contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    cy.get("nav nb-select").then((dropdown) => {
      cy.wrap(dropdown).click();
      //the below line of code will get the all the elements which are inside the dropdown
      //.options-list is the class which contains the dropdown elements
      //nb-otion tag is inside the options-list class and there are 4 of them
      //we will get all 4 of them
      cy.get(".options-list nb-option").each((listItem, index) => {
        //in the html code the texts may contain spaces in them , using trim() command will solve them
        const itemText = listItem.text().trim();

        //creating an object which contains the rgb values that we will assert with that of the elements
        const colors = {
          Light: "rgb(255, 255, 255)",
          Dark: "rgb(34, 43, 69)",
          Cosmic: "rgb(50, 50, 89)",
          Corporate: "rgb(255, 255, 255)",
        };

        cy.wrap(listItem).click();

        //asserting that after clicking whether the drop down contains the text option or not
        cy.wrap(dropdown).should("contain", itemText);

        //checking whether the selected element have the respective css property or not
        cy.get("nb-layout-header nav").should(
          "have.css",
          "background-color",
          colors[itemText]
        );
        //as it is a loop, it will click once again after clicking on the all 4 options
        //by this condition, it won't click on the dropdown once it clicks on all 4 of them once
        if (index < 3) {
          cy.wrap(dropdown).click();
        }
      });
    });
  });

  it("Web Tables", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
    //1
    //changing the age value of a table
    //yielding the result of the row where Larry is a text in the table
    //tnody is the table tag and tr is the row tag
    cy.get("tbody")
      .contains("tr", "Larry")
      .then((tableRow) => {
        //clicking on the edit button of the row
        cy.wrap(tableRow).find(".nb-edit").click();
        //clearing out the age field and typing a new vale
        cy.wrap(tableRow).find('[placeholder="Age"]').clear().type("25");
        //again clicking on the check mark to save the entered data
        cy.wrap(tableRow).find(".nb-checkmark").click();
        //asserting whether the row contains the entered data or not
        //while locating there were no unique properties for the age column
        //here we used the index number of the column to assert our desired value
        cy.wrap(tableRow).find("td").eq(6).should("contain", "25");
      });

    //2
    //adding first name and last name in a table and asserting them

    //clicking on the button which will enable us to insert data
    cy.get("thead").find(".nb-plus").click();
    //finding the row and yielding the the result into a variable
    cy.get("thead")
      .find("tr")
      .eq(2)
      .then((tablerow) => {
        //adding first name
        cy.wrap(tablerow).find('[placeholder="First Name"]').type("Workaholic");
        //adding last name
        cy.wrap(tablerow).find('[placeholder="Last Name"]').type("Chimp");
        //clicking on the check box after adding the values
        cy.wrap(tablerow).find(".nb-checkmark").click();
      });

    cy.get("tbody tr")
      .first()
      .find("td")
      .then((tableColumn) => {
        //locating the columns by the help of their respective index numbers
        cy.wrap(tableColumn).eq(2).should("contain", "Workaholic");
        cy.wrap(tableColumn).eq(3).should("contain", "Chimp");
      });

    //3
    //Adding values into the filter age field and checking whether the filteres
    //results are correct or not
    //Creating an object which will pass one by one elements into the age field
    const age = [20, 25, 35, 200];
    //pasing each element of the object as parameter
    cy.wrap(age).each((age) => {
      //adding one by one elements from the object into age field
      cy.get('thead [placeholder="Age"]').clear().type(age);
      cy.wait(500);
      //asserting each row that contains the desired value or not
      cy.get("tbody tr").each((tableRow) => {
        if (age == 200) {
          cy.wrap(tableRow).should("contain", "No data found");
        } else {
          //accessing the age column by it's index position
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        }
      });
    });
  });

  it.only("Web Date Picker", () => {
    // it('Assert property', ()=>{
    //   cy.visit("/")
    //   cy.contains("Forms").click()
    //   cy.contains("Datepicker").click()

    //   cy.contains('nb-card','Common Datepicker').find('input').then(input =>{
    //     //we have to perform a click function on the jquery method
    //     //so we have to wrap it to convert it into cypress format
    //     cy.wrap(input).click()
    //       cy.get('nb-calendar-day-picker').contains('14').click()
    //       cy.wrap(input).invoke('prop','value').should('contain','Dec 14, 2022')
    //   })
    // })

    //The problem with above code is , it is hard coded, we have to change the value again
    //when we want to assert other dates or it won't work when the date changes

    function selectDayFromCurrent(day) {
      //creating a date object which will contain our desired day's value
      let date = new Date();
      //getting our desired date by adding some days that we received from the day parameter from the
      //selectDayFromCurrent methid
      date.setDate(date.getDate() + day);
      //getting future day value
      let futureDay = date.getDate();
      //getting future month value
      let futureMonth = date.toLocaleString("default", { month: "short" });
      //creating a variable which will store day, month, and year of our date
      //it will be useful while asserting
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();
      //getting the calendar element and using it's ng-reflect-date attribute to gwt it
      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          //in this condition we check that if the current month doesn't contain the future month
          //then it will click on the next month arrow icon until
          //it finds the desired month
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            //if we don't paas the day parameter in the recusion method as a prameter , the method will just keep on executing
            selectDayFromCurrent(day);
            //in this condition  we check that if the current month contains the future month
            //it will select the date from the current month
          } else {
            cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]')
              .contains(futureDay)
              .click();
          }
        });
      //returning the dateAssert which can be used in asserting, if we don't return it it can
      //not be used out side
      return dateAssert;
    }
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    //getting the calendar field
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        //clicking on the calendar
        cy.wrap(input).click();
        //selecting our desired date
        let dateAssert = selectDayFromCurrent(255);
        //asserting the selected date
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);
      });
  });

  it("Tool Tips and Pop Ups", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();
    //Cypress doesn't have any commands to assert on hover messages
    //how ever while executing it saves the snapshot of the screen , so we can inspect on that element
    // and assert it
    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("dilog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();
     
    // //1
    // //alerts and confirms are part of window object 
    // //while asserting them we  have to use the cy.on command
    // cy.get('tbody tr').first().find('.nb-trash').click()
    // cy.on('window:confirm', confirm =>{
    //   //if the window confirm doesn't fire the below lines of code won't work
    //   expect(confirm).to.equal('Are you sure you want to delete?')
    // })

    //2
      //Creating stubs for mocking our function

      const stub = cy.stub()
      cy.on('window:confirm', stub)
      cy.get('tbody tr').first().find('.nb-trash').click().then(() =>{
        //the stub will be helpful if the window confirm event doesn't fire
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      })

      cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)

  });
});
