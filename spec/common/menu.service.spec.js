describe('The menu service - test if the favorite item exists in the menu or doesn\'t exist', function() {
  'use strict';

  var $httpBackend;
  var menuService;
  var ApiPath;

  // Sample data to mock http requests
  var validMenuItems = [
      { "id":130,
        "short_name":"DS1",
        "name":"Chocolate Truffle Cake",
        "description":"",
        "price_small":null,
        "price_large":4.25,
        "small_portion_name":null,
        "large_portion_name":"slice"
      },
      { "id":131,
        "short_name":"DS2",
        "name":"Cappuccino Apricot Cake",
        "description":"",
        "price_small":null,
        "price_large":4.25,
        "small_portion_name":null,
        "large_portion_name":"slice"
      }
    ];

  var invalidItemError = {"status":"500","error":"Internal Server Error"};

  /**
   * Gets called before each unit test it()
   */
  beforeEach(function() {
    // Load module
    module('common');

    // Load $httpBackend, MenuService and ApiPath
    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      menuService = $injector.get('MenuService');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should retrieve DS1.json when DS1 menu item requested.', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/DS1.json').respond(validMenuItems[0]);
    menuService.getMenuItem('DS1').then(function(item) {
      expect(item.data).toEqual(validMenuItems[0]);
    });
    $httpBackend.flush();
  });

  it('should return error when Z10 menu item requested.', function() {
    $httpBackend.expectGET(ApiPath + '/menu_items/Z10.json').respond(500, invalidItemError);
    menuService.getMenuItem('Z10').catch(function(error) {
      expect(error.status).toEqual(500);
    });
    $httpBackend.flush();
  });

});
