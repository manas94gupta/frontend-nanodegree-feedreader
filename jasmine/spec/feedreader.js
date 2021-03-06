/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a URL defined for all objects', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a name defined for all objects', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* Test suite named "The menu" */
    describe('The Menu', function() {
        var menu = $('body');
        // Button to open/close menu
        var menuBtn = $('.menu-icon-link');
        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            expect(menu.hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('should change visibility when menu icon is clicked', function() {
             // Open Menu
             menuBtn.trigger('click');
             expect(menu.hasClass('menu-hidden')).toBeFalsy();

             // Close Menu
             menuBtn.trigger('click');
             expect(menu.hasClass('menu-hidden')).toBeTruthy();
         });
    });


    /* Test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have atleast a single entry after loading', function() {
            // Entry element within the feed container
            var feedEntries = $('.feed .entry');
            expect(feedEntries.length).toBeGreaterThan(0);
        });
    });


    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var feed = $('.feed');
        var firstFeed;

        beforeEach(function(done) {
            // Load first feed
            loadFeed(0, function() {
                firstFeed = feed.html();
                // Load a different feed
                loadFeed(1, done);
            });
        });
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should have new content after loading a new feed', function() {
            expect(feed.html()).not.toBe(firstFeed);
        });
    });

}());
