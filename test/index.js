'use strict';

/* globals describe, it */

var chai = require('chai');
//var should = chai.should();
var expect = chai.expect;

var assign = require('../');


describe('#assign()', function() {


  it('expect assign() to copy own properties', function() {

    var obj1 = {
      prop1: 'prop1',
      prop2: 'prop2',
      prop3: {
        prop31: 'prop31'
      },
      prop5: {
        prop51: 'prop51',
        prop52: 'prop52'
      }
    };
    var obj2 = {
      prop2: 'prop2',
      prop4: {
        prop41: 'prop41'
      },
      prop5: {
        prop52: 'prop52',
        prop53: 'prop53'
      }
    };
    var res = {};

    assign(res, obj1);
    expect(res).eql(obj1);

    assign(res, obj2);
    expect(res).contains(obj2);

  });


  it('should assign() not copy prototype properties', function() {

    var Obj = function() {
      this.prop1 = 'prop1';
    };
    Obj.prototype.prop2 = 'prop2';
    var obj = new Obj();
    var res = {};

    assign(res, obj);
    expect(res).to.contain.all.keys('prop1');
    expect(res).to.not.contain.keys('prop2');

  });


  it('expect assign() to throw if target is null or undefined', function() {

    expect(function() {
      assign(null);
    }).throw(TypeError);

    expect(function() {
      assign(undefined);
    }).throw(TypeError);

  });

  it('expect assign() to accept null and undefined source', function() {

    var obj = {};
    var res;

    res = assign(obj, null);
    expect(res).to.deep.equals(obj);


    res = assign(obj, undefined);
    expect(res).to.deep.equals(obj);

  });


});
