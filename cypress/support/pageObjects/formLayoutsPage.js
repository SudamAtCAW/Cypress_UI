
//creating a class which will contain the methods which will be reused 
export class formLayoutsPage {

    submitInlineFormWithNameAndEmail(name,email){
      cy.contains('nb-card','Inline form').find('form').then( form =>{
        cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[type="checkbox"]').check({force:true})
        //the submit method is only for form tags or else we can click on the submit button 
        cy.wrap(form).submit()
      })
    }
    
    submitBasicFormWithEmailAndPassword(email, password){
        cy.contains('nb-card','Basic form').find('form').then( form =>{
            cy.wrap(form).find('[placeholder="Email"]').type(email)
            cy.wrap(form).find('[placeholder="Password"]').type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force:true})
            //the submit method is only for form tags or else we can click on the submit button 
            cy.wrap(form).submit()
          })
    }
    
    }
    
    //Creating a object of the class , we can access the methods of the above class by using it's object.
    export const onFormLayoutspage = new formLayoutsPage()
    