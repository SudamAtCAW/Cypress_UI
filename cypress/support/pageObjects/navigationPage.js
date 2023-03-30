
//creating a function which will take the element data as a parameter and will locate that element
//by changing the parameter we can locate other elements using the same method
function selectGroupItem(groupName) {
    cy.contains("a", groupName).then((menu) => {
      cy.wrap(menu)
        .find(".expand-state g g")
        .invoke("attr", "data-name")
        .then((attr) => {
          if (attr.includes("left")) {
            cy.wrap(menu).click;
          }
        });
    });
}

//creating a class which will contain the methods which will be reused 
export class navigationPage {
  formlayoutspage() {
   selectGroupItem('Form')
    cy.contains("Form Layouts").click({force:true});
  }

  datePicker() {
    selectGroupItem('Form')
    cy.contains("Datepicker").click({ force: true });
  }

  toasterPage(){
    selectGroupItem('Modal & Overlays')
    cy.contains('Toastr').click({ force: true })
  }

  smartTablepage(){
    selectGroupItem('Tables & Data')
    cy.contains('Smart Table').click({ force: true })
  }
  toolTipPage(){
    selectGroupItem('Modal & Overlays')
    cy.contains('Tooltip').click({ force: true })
  }
}


//Creating a object of the class , we can access the methods of the above class by using it's object.
export const navigateTo = new navigationPage();
