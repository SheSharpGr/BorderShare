Parse.initialize('ka61YPSHXHZgsaVEUwIZpWeOvLoBD63sRgoBi85N', '7kKk2X1i2RKJVr19Dw7F2Gldq9tsf304GBP0thIe');

var TestObject = Parse.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({foo: 'bar'}, {
  success: function(object) {
    $('.success').show();
    console.log('object', object);
  },
  error: function(model, error) {
    $('.error').show();
    console.log('model', model);
    console.log('error', error);
  }
});
