const { onDatePickerPage } = require("../support/pageObjects/datePickerPage");
const { onFormLayoutspage } = require("../support/pageObjects/formLayoutsPage");
const { navigateTo } = require("../support/pageObjects/navigationPage");
const { onSmartTable, onSmartTablePage } = require("../support/pageObjects/smartTable");

describe('', () => {

    beforeEach('open application', () =>{
        cy.openHomePage()
    })
    it('Verify the navigation across the pages', () => {
        navigateTo.formlayoutspage()
        navigateTo.datePicker()
        navigateTo.smartTablepage()
        navigateTo.toolTipPage()
        navigateTo.toasterPage()
    });

    it('should submit inline and basic form and select tomorrow date in the calendar', ()=>{
        navigateTo.formlayoutspage()
        onFormLayoutspage.submitInlineFormWithNameAndEmail('CAW', 'sdet@cawstudios.com')
        onFormLayoutspage.submitBasicFormWithEmailAndPassword('test abc', 'test xyz')
        navigateTo.datePicker()
        onDatePickerPage.selectCommonDatePickerFromToday(1)
        navigateTo.datePicker()
       onDatePickerPage.selectDatePickerWithRangeFromtoday(7, 14)
       navigateTo.smartTablepage()
       onSmartTablePage.addNewRecordWithfirstAndLastName('testFirstName', 'testLastName')
       onSmartTablePage.updateAgeByFirstName('testFirstName', 25)
       onSmartTablePage.deleteRowByIndex(1)
    })
});
