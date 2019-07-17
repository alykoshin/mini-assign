'use strict';

/* globals describe, it */

const chai = require('chai');
//var should = chai.should();
const expect = chai.expect;

const assign = require('../');


describe('#assign()', () => {


  it('expect assign() is function',  () => {
      expect(assign).to.be.a('function');
    }
  );


  it('expect assign() to copy own properties', () => {

    const obj1 = {
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
    const obj2 = {
      prop2: 'prop2',
      prop4: {
        prop41: 'prop41'
      },
      prop5: {
        prop52: 'prop52',
        prop53: 'prop53'
      }
    };
    let res = {};

    assign(res, obj1);
    expect(res).eql(obj1);

    assign(res, obj2);
    expect(res).contains(obj2);

  });


  it('should assign() not copy prototype properties', () => {

    const Obj = function()  {
      this.prop1 = 'prop1';
    };
    Obj.prototype.prop2 = 'prop2';

    const obj = new Obj();
    const res = {};

    assign(res, obj);
    expect(res).to.contain.all.keys('prop1');
    expect(res).to.not.contain.keys('prop2');

  });


  it('expect assign() to throw if target is null or undefined', () => {

    expect(() => {
      assign(null);
    }).throw(TypeError);

    expect(() => {
      assign(undefined);
    }).throw(TypeError);
  });


  it('expect assign() to accept null and undefined source', () => {

    const obj = {};
    let res;

    res = assign(obj, null);
    expect(res).to.deep.equals(obj);


    res = assign(obj, undefined);
    expect(res).to.deep.equals(obj);

  });


  it('should assing() not copy properties for prototype obj ', () => {

    const parent = {
      parentProtoProp: 'parentProtoProp-value',
    };

    function Child() {
      this.childProp = 'childProp-value';
    }
    Child.prototype = parent;

    const obj = new Child();
    obj.ownProp = 'ownProp-value';

    const res = assign({}, obj);  //, res);

    expect(res).to.not.deep.equals(obj);
  });


});

