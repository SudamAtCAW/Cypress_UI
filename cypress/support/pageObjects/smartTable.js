

export class smartTable {

    updateAgeByFirstName(name, age){
        cy.get("tbody")
        .contains("tr", name)
        .then((tableRow) => {
          cy.wrap(tableRow).find(".nb-edit").click();
          cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
          cy.wrap(tableRow).find(".nb-checkmark").click();
          cy.wrap(tableRow).find("td").eq(6).should("contain", age);
        });
    }
addNewRecordWithfirstAndLastName(firstName, lastName){
        cy.get("thead").find(".nb-plus").click();
cy.get("thead")
.find("tr")
.eq(2)
.then((tablerow) => {
  cy.wrap(tablerow).find('[placeholder="First Name"]').type(firstName);
  cy.wrap(tablerow).find('[placeholder="Last Name"]').type(lastName);
  cy.wrap(tablerow).find(".nb-checkmark").click();
});

cy.get("tbody tr")
.first()
.find("td")
.then((tableColumn) => {
  cy.wrap(tableColumn).eq(2).should("contain", firstName);
  cy.wrap(tableColumn).eq(3).should("contain", lastName);
    });
}

deleteRowByIndex(index){
    const stub = cy.stub()
      cy.on('window:confirm', stub)
      //instead of the index of the row we are using the variable which is passed in the parameter
      cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() =>{
        expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?')
      })

      cy.get('tbody tr').first().find('.nb-trash').click()
    cy.on('window:confirm', () => false)
}

}

export const onSmartTablePage = new smartTable() 