function mongooseErrorHandler(mongooseErr) {
  console.log(mongooseErr)
  const error = new Error()
  error.statusCode = mongooseErr.statusCode
  error.message = mongooseErr.message
  error.errors = []
  
  for (var e in mongooseErr.errors) {
    error.errors.push(e + ' - ' + mongooseErr.errors[e])
  }
  return error
}

export default mongooseErrorHandler

// {
//     "statusCode": 500,
//     "message": "Internal Server Error",
//     "errors": {
//         "price": {
//             "stringValue": "\"[ '200.00', '100' ]\"",
//             "valueType": "Array",
//             "kind": "Number",
//             "value": [
//                 "200.00",
//                 "100"
//             ],
//             "path": "price",
//             "reason": {
//                 "generatedMessage": true,
//                 "code": "ERR_ASSERTION",
//                 "actual": false,
//                 "expected": true,
//                 "operator": "=="
//             },
//             "name": "CastError",
//             "message": "Cast to Number failed for value \"[ '200.00', '100' ]\" (type Array) at path \"price\""
//         },
//         "category": {
//             "stringValue": "\"[ 'Mobiles', 'Mobile' ]\"",
//             "valueType": "Array",
//             "kind": "string",
//             "value": [
//                 "Mobiles",
//                 "Mobile"
//             ],
//             "path": "category",
//             "reason": null,
//             "name": "CastError",
//             "message": "Cast to string failed for value \"[ 'Mobiles', 'Mobile' ]\" (type Array) at path \"category\""
//         }
//     }
// }

// Error: Products validation failed: category: Cast to string failed for value "[ 'Mobiles', 'Mobile' ]" (type Array) at path "category"
//     at ValidationError.inspect (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/error/validation.js:49:26)
//     at formatValue (node:internal/util/inspect:780:19)
//     at inspect (node:internal/util/inspect:345:10)
//     at formatWithOptionsInternal (node:internal/util/inspect:2165:40)
//     at formatWithOptions (node:internal/util/inspect:2027:10)
//     at console.value (node:internal/console/constructor:324:14)
//     at console.log (node:internal/console/constructor:360:61)
//     at errorResponse (file:///Users/eshannimesha/Documents/nodejs/dummy%20shop/utils/error_handlers/error_response.js:2:11)
//     at Layer.handle_error (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/express/lib/router/layer.js:71:5)
//     at trim_prefix (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/express/lib/router/index.js:326:13) {
//   errors: {
//     category: CastError: Cast to string failed for value "[ 'Mobiles', 'Mobile' ]" (type Array) at path "category"
//         at SchemaString.cast (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/schema/string.js:603:11)
//         at SchemaString.SchemaType.applySetters (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/schematype.js:1201:12)
//         at model.$set (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/document.js:1367:22)
//         at model.$set (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/document.js:1092:16)
//         at model.Document (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/document.js:166:12)
//         at model.Model (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/model.js:119:12)
//         at new model (/Users/eshannimesha/Documents/nodejs/dummy shop/node_modules/mongoose/lib/model.js:4999:15)
//         at createNewProduct (file:///Users/eshannimesha/Documents/nodejs/dummy%20shop/controllers/product_controllers/create_new_product.js:29:19) {
//       stringValue: `"[ 'Mobiles', 'Mobile' ]"`,
//       messageFormat: undefined,
//       kind: 'string',
//       value: [Array],
//       path: 'category',
//       reason: null,
//       valueType: 'Array'
//     }
//   },
//   _message: 'Products validation failed',
//   statusCode: 500
// }
