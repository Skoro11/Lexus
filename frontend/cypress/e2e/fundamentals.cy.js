// cypress/integration/visitLocalhost.spec.js
const baseUrl = Cypress.env('baseUrl'); 
/* 
describe('Visit Home page', () => {
    it('Should visit the base URL', () => {
       // Access the environment variable set in cypress.config.js
      cy.visit(baseUrl);  // Visit the base URL
      cy.url().should('eq', baseUrl);  // Verify the URL

      cy.get('.slick-current > :nth-child(1) > [tabindex="-1"]').should('be.visible');
    });
  
    
  }); */
  
  // cypress/integration/clickTest.spec.js

describe('Landing page tests', () => {
    beforeEach(() => {
         // Accessing base URL from environment variables
        cy.visit(baseUrl);  // Visiting the base URL before each test
      });

    it('Checking Carousel arrows', () => {
      // Visit the page where the element is located
       // Replace with the correct URL if needed
  
      // Wait for the page to load completely (optional, use it if necessary)
      cy.wait(1000);  // Wait for 2 seconds, adjust based on your page load time
  
     
      cy.get('.slick-current > :nth-child(1) > [tabindex="-1"]')
      .should('be.visible')
      .then(($el) => {
        
    
        // Click the next arrow to move to the next slide
        cy.get('.next-arrow')
        .should('be.visible')      // Ensure the button is visible
        .and('not.be.disabled')
        .click();
    
        // Check if the content has changed to the next slide
        cy.get('.slick-current > :nth-child(1) > [tabindex="-1"]')
          .should('be.visible')
          .and(($newSlide) => {
            const newContent = $newSlide.text();
            expect(newContent).not.to.eq($el.text()); // Assert that the content is different
          });
    
        // Wait for the slide change to complete
        cy.wait(1000);
    
        // Click the prev arrow to go back to the initial position
        cy.get('.prev-arrow')
        .should('be.visible')      // Ensure the button is visible
        .and('not.be.disabled')
        .click();
    
     
       });
    });


    /* Unfinished cart functionality */
    it('Checking Cart functionality', () => {

        cy.get('.slick-current > :nth-child(1) > [tabindex="-1"] > .relative > .addTo-cart')
            .click();
                 cy.get('.navbar__cart > .popup-item-number > span')
                    .should('have.text', '1'); 

        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="1"] > :nth-child(1) > [tabindex="-1"] > .relative > .addTo-cart')
            .click();
                cy.get('.navbar__cart > .popup-item-number > span')
                    .should('have.text', '2'); 

        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="3"] > :nth-child(1) > [tabindex="-1"] > .relative > .addTo-cart')
            .click()
                cy.get('.navbar__cart > .popup-item-number > span')
                    .should('have.text', '3'); 


       });


       it("Checking like functionality", () => {



        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="3"]> :nth-child(1) > [tabindex="-1"] > .relative > .like-icon')
            .click();
                cy.get('.popup-item-number')
                    .should('have.text', '1'); 
                       
        

        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="2"] > :nth-child(1) > [tabindex="-1"] > .relative > .like-icon')
            .click()
                cy.get('.popup-item-number')
                    .should('have.text', '2');




        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="3"] > :nth-child(1) > [tabindex="-1"] > .relative > .like-icon')
            .click()
                cy.get('.popup-item-number')
                    .should('have.text', '1');
        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="2"] > :nth-child(1) > [tabindex="-1"] > .relative > .like-icon')
            .click()
                cy.get('.popup-item-number')
                    .should('not.exist');
        
       });
  
  
       it("Checking watchlist functionality" , () =>{

        /* Goes to watchlist page and checks if the starting number is 0 */

        cy.visit(baseUrl+ "like");
        cy.get('.watchlist-items').should("contain","0")
        cy.visit(baseUrl);

        /* Goes to the main page and triggers the wishlist button and checks if the total is 3*/
        cy.get(':nth-child(3) > .slider-container > .slick-slider > .slick-list > .slick-track > [data-index="0"] > :nth-child(1) > [tabindex="-1"] > .relative > .watchlist-icon')
            .click()
        cy.get('[data-index="1"] > :nth-child(1) > [tabindex="-1"] > .relative > .watchlist-icon')
            .click()
        cy.get('[data-index="2"] > :nth-child(1) > [tabindex="-1"] > .relative > .watchlist-icon')
            .click()
        cy.get('[data-index="3"] > :nth-child(1) > [tabindex="-1"] > .relative > .watchlist-icon')
            .click()
                cy.visit(baseUrl+ "like");
                cy.get('.watchlist-items').should("contain","4")
        

        /* Removes one item, one adds to cart and the other two adds to cart using move all to bag */
        cy.get(":nth-child(1) > .relative > .remove")
            .click()
            cy.get('.watchlist-items').should("contain","3")

        cy.get(':nth-child(1) > .relative > .add-cart')
            .click()
            cy.get('.watchlist-items').should("contain","2")
            cy.get('.navbar__cart > .popup-item-number > span').should("contain","1")

        cy.get('.watchlist-header > .all-bag-btn')
            .click()
            cy.get('.watchlist-items').should("contain","0")
            cy.get('.navbar__cart > .popup-item-number > span').should("contain","3")
        
            
       });
    });
  